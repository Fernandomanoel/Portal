import { CONFIG_POR_TIPO, LIMITES_FAGA, LIMITES_TURMA, type AlunoTurma, type Turma } from "../src/types/faga.js";
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
const data = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) ? v : "");
const idItem = (v: unknown) => (typeof v === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : "");

export type DadosTurma = Pick<Turma, "nome" | "tipo" | "config" | "dias" | "horario" | "alunos">;

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
    alunos.push({ id, nome: nomeAluno, livro: texto(a.livro, 20), nivel: texto(a.nivel, 60), proximoNivel: texto(a.proximoNivel, 60), inicio: data(a.inicio), fim: data(a.fim) });
  }
  const dias = [...new Set((Array.isArray(corpo.dias) ? corpo.dias : []).map(Number).filter((d) => Number.isInteger(d) && d >= 0 && d <= 6))].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  const tipo = corpo.tipo === "speed" ? "speed" : "regular";
  const c = (corpo.config ?? {}) as Record<string, unknown>;
  const inteiro = (v: unknown, max: number, padrao: number) => (Number.isFinite(Number(v)) ? Math.min(max, Math.max(1, Math.round(Number(v)))) : padrao);
  const config = {
    aulasPorBloco: inteiro(c.aulasPorBloco, LIMITES_FAGA.aulasPorBlocoMax, CONFIG_POR_TIPO[tipo].aulasPorBloco),
    mesesPorLivro: inteiro(c.mesesPorLivro, LIMITES_FAGA.mesesMax, CONFIG_POR_TIPO[tipo].mesesPorLivro),
  };
  return { nome, tipo, config, dias, horario: texto(corpo.horario, 20), alunos };
}

/** FAGA em branco de um aluno da turma (para a importação): nível como livro e datas do nível como etapa. */
export function corpoDeFagaDoAluno(turma: Pick<Turma, "id" | "config">, aluno: AlunoTurma): Record<string, unknown> {
  return {
    aluno: aluno.nome,
    livro: aluno.livro || aluno.nivel || "",
    etapaInicio: aluno.inicio ?? "",
    etapaFim: aluno.fim ?? "",
    horas: "",
    faixas: [],
    config: { blocosDoLivro: 8, aulasPorBloco: turma.config.aulasPorBloco, mesesPorLivro: turma.config.mesesPorLivro },
    autoavaliacao: true,
    topicos: [],
    turmaId: turma.id,
    alunoId: aluno.id,
  };
}
