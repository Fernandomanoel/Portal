import type { AulaIngles, ResumoAulaIngles } from "../src/types/aulaIngles.js";
import { REGISTRO_AULAS_INGLES } from "./aulas.gerado.js";

const ID_VALIDO = /^[a-z0-9][a-z0-9-]{0,80}$/;

export async function acharAulaIngles(id: string): Promise<AulaIngles | null> {
  if (!ID_VALIDO.test(id)) return null;
  const carregar = REGISTRO_AULAS_INGLES[id];
  if (!carregar) return null;
  return (await carregar()).default;
}

export async function listarAulasIngles(): Promise<ResumoAulaIngles[]> {
  const aulas = await Promise.all(Object.keys(REGISTRO_AULAS_INGLES).map(async (id) => ({ id, aula: await acharAulaIngles(id) })));
  return aulas
    .filter((item): item is { id: string; aula: AulaIngles } => item.aula !== null)
    .map(({ id, aula }) => ({ id, codigo: aula.codigo, titulo: aula.titulo, passos: aula.passos.length }));
}
