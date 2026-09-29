// Gerado por scripts/gerar-registro-provas.mjs no build. Não edite à mão.
import type { ProvaInterativa } from "../src/types/quiz.js";

export const REGISTRO_PROVAS: Record<string, () => Promise<{ default: ProvaInterativa }>> = {
  "ADM/prova-administracao": () => import("../src/data/provasInterativas/ADM/prova-administracao.prova.js"),
  "Excel/av-excel-1": () => import("../src/data/provasInterativas/Excel/av-excel-1.prova.js"),
  "Excel/av-excel-2": () => import("../src/data/provasInterativas/Excel/av-excel-2.prova.js"),
  "Windows 11/avaliacao-completa": () => import("../src/data/provasInterativas/Windows 11/avaliacao-completa.prova.js"),
  "Windows 11/ferramentas-e-sistema": () => import("../src/data/provasInterativas/Windows 11/ferramentas-e-sistema.prova.js"),
  "Word/avaliacao-peso2": () => import("../src/data/provasInterativas/Word/avaliacao-peso2.prova.js"),
  "Word/avaliacao-word-peso1": () => import("../src/data/provasInterativas/Word/avaliacao-word-peso1.prova.js"),
};
