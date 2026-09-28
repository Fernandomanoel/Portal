import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";

/** Ponte entre o http do Node e as rotas no formato Request → Response. */
export function paraRequest(entrada: IncomingMessage, hostPadrao: string): Request {
  const url = `http://${entrada.headers.host ?? hostPadrao}${entrada.url ?? "/"}`;
  const cabecalhos = new Headers();
  for (const [chave, valor] of Object.entries(entrada.headers)) {
    if (Array.isArray(valor)) valor.forEach((v) => cabecalhos.append(chave, v));
    else if (valor !== undefined) cabecalhos.set(chave, valor);
  }
  const temCorpo = entrada.method !== "GET" && entrada.method !== "HEAD";
  return new Request(url, {
    method: entrada.method,
    headers: cabecalhos,
    body: temCorpo ? (Readable.toWeb(entrada) as ReadableStream) : undefined,
    // Exigido pelo Node para enviar um corpo em stream.
    ...(temCorpo ? { duplex: "half" } : {}),
  } as RequestInit);
}

export async function responder(resposta: Response, saida: ServerResponse) {
  const cabecalhos: Record<string, string | string[]> = {};
  resposta.headers.forEach((valor, chave) => {
    cabecalhos[chave] = chave === "set-cookie" ? resposta.headers.getSetCookie() : valor;
  });
  saida.writeHead(resposta.status, cabecalhos);
  if (resposta.body) Readable.fromWeb(resposta.body as import("node:stream/web").ReadableStream).pipe(saida);
  else saida.end();
}

