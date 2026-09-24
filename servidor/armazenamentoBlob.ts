import { del, get, list, put } from "@vercel/blob";

import type { Armazenamento, ItemArmazenado } from "./armazenamento.js";

/**
 * Ao ligar o Blob a um projeto, a Vercel deixa escolher um prefixo para as
 * variáveis de ambiente (ex.: "provas" gera `provas_READ_WRITE_TOKEN` em vez
 * de `BLOB_READ_WRITE_TOKEN`). Em vez de exigir o prefixo padrão, achamos a
 * variável sozinhos: `BLOB_READ_WRITE_TOKEN` se existir, senão a primeira
 * variável terminada em `_READ_WRITE_TOKEN`.
 */
function tokenDoBlob(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const chave = Object.keys(process.env).find((nome) => /_READ_WRITE_TOKEN$/i.test(nome));
  return chave ? process.env[chave] : undefined;
}

/**
 * Vercel Blob em modo privado: nenhum envio ou arquivo de aluno tem URL
 * pública; tudo passa pelas rotas do professor.
 */
export function armazenamentoBlob(): Armazenamento {
  const token = tokenDoBlob();
  const base = { access: "private" as const, token };

  return {
    async salvarJson(caminho, dado) {
      await put(caminho, JSON.stringify(dado), {
        ...base,
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    },

    async lerJson<T>(caminho: string) {
      const resultado = await get(caminho, { ...base, useCache: false });
      if (!resultado || resultado.statusCode !== 200) return null;
      const texto = await new Response(resultado.stream).text();
      return JSON.parse(texto) as T;
    },

    async salvarArquivo(caminho, bytes, tipo) {
      await put(caminho, Buffer.from(bytes), {
        ...base,
        contentType: tipo,
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    },

    async lerArquivo(caminho) {
      const resultado = await get(caminho, base);
      if (!resultado || resultado.statusCode !== 200) return null;
      return {
        corpo: resultado.stream,
        tipo: resultado.blob.contentType ?? "application/octet-stream",
        tamanho: resultado.blob.size,
      };
    },

    async listar(prefixo) {
      const itens: ItemArmazenado[] = [];
      let cursor: string | undefined;
      do {
        const pagina = await list({ prefix: prefixo, cursor, limit: 1000, token });
        for (const blob of pagina.blobs) itens.push({ caminho: blob.pathname, criadoEm: new Date(blob.uploadedAt) });
        cursor = pagina.hasMore ? pagina.cursor : undefined;
      } while (cursor);
      return itens;
    },

    async apagar(caminhos) {
      if (caminhos.length) await del(caminhos, { token });
    },
  };
}
