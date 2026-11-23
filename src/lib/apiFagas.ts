import type { Faga } from "@/types/faga";
import { chamar, comJson } from "./apiProvas";
import { comUnidade } from "./unidade";

export type DadosFagaEnvio = Pick<Faga, "aluno" | "livro" | "etapaInicio" | "etapaFim" | "horas" | "faixas" | "config" | "autoavaliacao">;

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
});
