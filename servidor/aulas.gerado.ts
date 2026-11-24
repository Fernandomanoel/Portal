// Gerado por scripts/gerar-registro-aulas.mjs no dev e no build. Não edite à mão.
import type { AulaIngles } from "../src/types/aulaIngles.js";

export const REGISTRO_AULAS_INGLES: Record<string, () => Promise<{ default: AulaIngles }>> = {
  "fb11-ache-should-which": () => import("../src/data/cursoIngles/fb11-ache-should-which.aula.js"),
};
