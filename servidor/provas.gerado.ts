// Gerado por scripts/gerar-registro-provas.mjs no build. Não edite à mão.
import type { ProvaInterativa } from "../src/types/quiz.js";

export const REGISTRO_PROVAS: Record<string, () => Promise<{ default: ProvaInterativa }>> = {
  "Windows 11/avaliacao-completa": () => import("../src/data/provasInterativas/Windows 11/avaliacao-completa.prova.js"),
  "Windows 11/ferramentas-e-sistema": () => import("../src/data/provasInterativas/Windows 11/ferramentas-e-sistema.prova.js"),
};
