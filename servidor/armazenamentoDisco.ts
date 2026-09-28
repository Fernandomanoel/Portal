import { createReadStream } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { Readable } from "node:stream";

import type { Armazenamento, ItemArmazenado } from "./armazenamento.js";

const TIPOS: Record<string, string> = {
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xls": "application/vnd.ms-excel",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".zip": "application/zip",
  ".txt": "text/plain",
};

/** Pasta no disco do servidor físico (DADOS_DIR, padrão ./dados). */
export function armazenamentoDisco(pastaBase: string): Armazenamento {
  const raiz = resolve(pastaBase);

  // Todo caminho vem das rotas, mas a checagem impede que um id malformado
  // escape da pasta de dados ("../").
  function absoluto(caminho: string) {
    const final = resolve(raiz, caminho);
    if (final !== raiz && !final.startsWith(raiz + sep)) throw new Error("Caminho fora da pasta de dados");
    return final;
  }

  async function gravar(caminho: string, conteudo: string | Uint8Array) {
    const alvo = absoluto(caminho);
    await mkdir(dirname(alvo), { recursive: true });
    await writeFile(alvo, conteudo);
  }

  async function percorrer(pasta: string): Promise<string[]> {
    const entradas = await readdir(pasta, { withFileTypes: true }).catch(() => []);
    const arquivos: string[] = [];
    for (const entrada of entradas) {
      const completo = join(pasta, entrada.name);
      if (entrada.isDirectory()) arquivos.push(...(await percorrer(completo)));
      else arquivos.push(completo);
    }
    return arquivos;
  }

  return {
    salvarJson: (caminho, dado) => gravar(caminho, JSON.stringify(dado)),

    async lerJson<T>(caminho: string) {
      try {
        return JSON.parse(await readFile(absoluto(caminho), "utf8")) as T;
      } catch {
        return null;
      }
    },

    salvarArquivo: (caminho, bytes) => gravar(caminho, bytes),

    async lerArquivo(caminho) {
      const alvo = absoluto(caminho);
      const info = await stat(alvo).catch(() => null);
      if (!info?.isFile()) return null;
      const extensao = alvo.slice(alvo.lastIndexOf(".")).toLowerCase();
      return {
        corpo: Readable.toWeb(createReadStream(alvo)) as ReadableStream<Uint8Array>,
        tipo: TIPOS[extensao] ?? "application/octet-stream",
        tamanho: info.size,
      };
    },

    async listar(prefixo) {
      const pasta = absoluto(prefixo.endsWith("/") ? prefixo : dirname(prefixo));
      const itens: ItemArmazenado[] = [];
      for (const arquivo of await percorrer(pasta)) {
        const caminho = relative(raiz, arquivo).split(sep).join("/");
        if (!caminho.startsWith(prefixo)) continue;
        const info = await stat(arquivo);
        itens.push({ caminho, criadoEm: info.mtime });
      }
      return itens;
    },

    async apagar(caminhos) {
      await Promise.all(caminhos.map((caminho) => rm(absoluto(caminho), { force: true })));
    },
  };
}
