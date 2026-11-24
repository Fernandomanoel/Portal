import type { Faga, Turma } from "@/types/faga";
import { chamar, comJson } from "./apiProvas";
import { comUnidade } from "./unidade";

export type DadosFagaEnvio = Pick<Faga, "aluno" | "livro" | "etapaInicio" | "etapaFim" | "horas" | "faixas" | "config" | "autoavaliacao" | "topicos" | "turmaId" | "alunoId">;

const caminho = (id: string) => `fagas/${encodeURIComponent(id)}`;

export const listarFagas = () => chamar<{ dados: Faga[] }>(comUnidade("fagas"));
export const criarFaga = (dados: DadosFagaEnvio) => chamar<Faga>(comUnidade("fagas"), comJson("POST", dados));
export const salvarFaga = (id: string, dados: DadosFagaEnvio) => chamar<Faga>(caminho(id), comJson("PUT", dados));
export const apagarFaga = (id: string) => chamar<void>(caminho(id), { method: "DELETE" });

export const dadosDaFaga = (f: Faga): DadosFagaEnvio => ({
  aluno: f.aluno,
  livro: f.livro,
  etapaInicio: f.etapaInicio,
  etapaFim: f.etapaFim,
  horas: f.horas,
  faixas: f.faixas,
  config: f.config,
  autoavaliacao: f.autoavaliacao,
  topicos: f.topicos ?? [],
  turmaId: f.turmaId,
  alunoId: f.alunoId,
});

// ------------------------------------------------------------------ turmas e transferência

export type DadosTurmaEnvio = Pick<Turma, "nome" | "livro" | "dias" | "horario" | "alunos">;

const caminhoTurma = (id: string) => `turmas/${encodeURIComponent(id)}`;

export const listarTurmas = () => chamar<{ dados: Turma[] }>(comUnidade("turmas"));
export const criarTurma = (dados: DadosTurmaEnvio) => chamar<Turma>(comUnidade("turmas"), comJson("POST", dados));
export const salvarTurma = (id: string, dados: DadosTurmaEnvio) => chamar<Turma>(caminhoTurma(id), comJson("PUT", dados));
export const apagarTurma = (id: string) => chamar<void>(caminhoTurma(id), { method: "DELETE" });
export const transferirTurma = (id: string, unidade: string) => chamar<{ turma: Turma; fagas: number }>(`${caminhoTurma(id)}/transferir`, comJson("POST", { unidade }));
export const transferirFaga = (id: string, unidade: string) => chamar<Faga>(`${caminho(id)}/transferir`, comJson("POST", { unidade }));
