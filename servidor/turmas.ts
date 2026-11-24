import { LIMITES_TURMA, type AlunoTurma, type Turma } from "../src/types/faga.js";
import type { Armazenamento } from "./armazenamento.js";

/** Turmas moram em `turmas/<id>.json`, fora das pastas que a limpeza de 3 dias percorre. */
export const caminhoTurma = (id: string) => `turmas/${id}.json`;
export const idTurmaValido = (id: string) => /^[a-z0-9-]{6,50}$/.test(id);

export const lerTurma = (armazenamento: Armazenamento, id: string) => armazenamento.lerJson<Turma>(caminhoTurma(id));

export async function listarTurmas(armazenamento: Armazenamento): Promise<Turma[]> {
  const itens = (await armazenamento.listar("turmas/")).filter((i) => i.caminho.endsWith(".json"));
  const lidas = await Promise.all(itens.map((i) => armazenamento.lerJson<Turma>(i.caminho)));
  return lidas.filter((t): t is Turma => t !== null).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const idItem = (v: unknown) => (typeof v === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : "");

export type DadosTurma = Pick<Turma, "nome" | "livro" | "dias" | "horario" | "alunos">;

export function sanearTurma(corpo: Record<string, unknown>): DadosTurma | string {
  const nome = texto(corpo.nome, LIMITES_TURMA.texto);
  if (nome.length < 2) return "Informe o nome da turma.";
  if (!Array.isArray(corpo.alunos) || corpo.alunos.length > LIMITES_TURMA.alunos) return `A turma aceita até ${LIMITES_TURMA.alunos} alunos.`;
  const vistos = new Set<string>();
  const alunos: AlunoTurma[] = [];
  for (const bruto of corpo.alunos) {
    const a = (bruto ?? {}) as Record<string, unknown>;
    const id = idItem(a.id);
    const nomeAluno = texto(a.nome, LIMITES_TURMA.texto);
    if (!id || vistos.has(id)) return "Aluno com identificador inválido ou repetido.";
    if (nomeAluno.length < 2) return "Todo aluno precisa de um nome.";
    vistos.add(id);
    alunos.push({ id, nome: nomeAluno });
  }
  const dias = [...new Set((Array.isArray(corpo.dias) ? corpo.dias : []).map(Number).filter((d) => Number.isInteger(d) && d >= 0 && d <= 6))].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  return { nome, livro: texto(corpo.livro, 20), dias, horario: texto(corpo.horario, 20), alunos };
}
