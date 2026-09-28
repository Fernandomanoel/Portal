import { armazenamentoBlob } from "../servidor/armazenamentoBlob.js";
import { atender } from "../servidor/rotas.js";

/** Função única da Vercel: vercel.json reescreve /api/* para cá com ?rota=. */
const armazenamento = armazenamentoBlob();

export default {
  fetch: (requisicao: Request) => atender(requisicao, armazenamento),
};
