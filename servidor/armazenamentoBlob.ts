import { del, get, list, put } from "@vercel/blob";

import type { Armazenamento, ItemArmazenado } from "./armazenamento.js";

/**
 * Vercel Blob em modo privado: nenhum envio ou arquivo de aluno tem URL
 * pública; tudo passa pelas rotas do professor. O token vem da variável
 * BLOB_READ_WRITE_TOKEN, que a Vercel cria ao ligar o Blob ao projeto.
 */
export function armazenamentoBlob(): Armazenamento {
  const base = { access: "private" as const };

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
        const pagina = await list({ prefix: prefixo, cursor, limit: 1000 });
        for (const blob of pagina.blobs) itens.push({ caminho: blob.pathname, criadoEm: new Date(blob.uploadedAt) });
        cursor = pagina.hasMore ? pagina.cursor : undefined;
      } while (cursor);
      return itens;
    },

    async apagar(caminhos) {
      if (caminhos.length) await del(caminhos);
    },
  };
}
