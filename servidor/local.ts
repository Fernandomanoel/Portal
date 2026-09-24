import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer, type ServerResponse } from "node:http";
import { extname, join, resolve, sep } from "node:path";

import { armazenamentoDisco } from "./armazenamentoDisco.js";
import { paraRequest, responder } from "./node.js";
import { atender, limpar } from "./rotas.js";

/**
 * Servidor para a máquina física da escola: entrega o portal (pasta dist/) e
 * a API, com os envios gravados em disco. Uso: `npm run build && npm run servidor`.
 *
 * Variáveis: PORTA (padrão 8080), DADOS_DIR (padrão ./dados), PROFESSORES,
 * SEGREDO_SESSAO, LIMITE_ARQUIVO_MB. Veja docs/SERVIDOR.md.
 */

const PORTA = Number(process.env.PORTA) || 8080;
const PASTA_SITE = resolve(process.env.SITE_DIR ?? "dist");
const armazenamento = armazenamentoDisco(process.env.DADOS_DIR ?? "dados");

const TIPOS: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

async function servirArquivo(caminhoUrl: string, saida: ServerResponse) {
  const caminho = decodeURIComponent(caminhoUrl.split("?")[0]);
  let alvo = resolve(join(PASTA_SITE, caminho));
  if (alvo !== PASTA_SITE && !alvo.startsWith(PASTA_SITE + sep)) alvo = join(PASTA_SITE, "index.html");

  let info = await stat(alvo).catch(() => null);
  // Rota do app (/provas, /professor...): quem resolve é o React, no index.html.
  if (!info?.isFile()) {
    alvo = join(PASTA_SITE, "index.html");
    info = await stat(alvo).catch(() => null);
  }
  if (!info) {
    saida.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    saida.end("Portal não compilado: rode npm run build antes de npm run servidor.");
    return;
  }

  const extensao = extname(alvo).toLowerCase();
  const imutavel = alvo.includes(`${sep}assets${sep}`);
  saida.writeHead(200, {
    "Content-Type": TIPOS[extensao] ?? "application/octet-stream",
    "Content-Length": info.size,
    "Cache-Control": imutavel ? "public, max-age=31536000, immutable" : "no-cache",
  });
  createReadStream(alvo).pipe(saida);
}

const servidor = createServer(async (entrada, saida) => {
  try {
    if ((entrada.url ?? "").startsWith("/api")) {
      await responder(await atender(paraRequest(entrada, `localhost:${PORTA}`), armazenamento), saida);
      return;
    }
    await servirArquivo(entrada.url ?? "/", saida);
  } catch (falha) {
    console.error(falha);
    if (!saida.headersSent) saida.writeHead(500);
    saida.end();
  }
});

async function limpezaDiaria() {
  try {
    const apagados = await limpar(armazenamento);
    if (apagados) console.log(`limpeza: ${apagados} envio(s) com mais de 7 dias apagado(s)`);
  } catch (falha) {
    console.error("limpeza falhou", falha);
  }
}

servidor.listen(PORTA, () => {
  console.log(`Portal no ar em http://localhost:${PORTA}`);
  void limpezaDiaria();
  setInterval(limpezaDiaria, 6 * 60 * 60 * 1000);
});
