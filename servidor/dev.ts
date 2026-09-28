import type { IncomingMessage, ServerResponse } from "node:http";

import { armazenamentoDisco } from "./armazenamentoDisco.js";
import { paraRequest, responder } from "./node.js";
import { atender } from "./rotas.js";

/** API dentro do `npm run dev` (plugin no vite.config.ts), com os dados em ./dados. */
const armazenamento = armazenamentoDisco(process.env.DADOS_DIR ?? "dados");

export async function atenderDev(entrada: IncomingMessage, saida: ServerResponse) {
  await responder(await atender(paraRequest(entrada, "localhost:5173"), armazenamento), saida);
}
