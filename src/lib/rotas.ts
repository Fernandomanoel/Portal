import type { CategoriaAtividade } from "@/types/curso";

export const rotas = {
  inicio: () => "/",
  atividades: (categoria?: CategoriaAtividade) =>
    categoria ? `/atividades?categoria=${categoria}` : "/atividades",
  curso: (slug: string) => `/atividades/${slug}`,
  atividadeAutocorrigida: (curso: string, caminho: string) =>
    `/atividades/${curso}/atividade/${encodeURIComponent(caminho)}`,
  ingles: () => "/ingles",
  inglesAtividades: () => "/ingles/atividades",
  inglesAtividade: (slug: string) => `/ingles/atividades/${slug}`,
  inglesProvas: () => "/ingles/provas",
  digitacao: () => "/digitacao",
  digitacaoLivre: () => "/digitacao/livre",
  digitacaoTextosClassicos: () => "/digitacao/textos-classicos",
  digitacaoCavaleirosZodiaco: () => "/digitacao/cavaleiros-zodiaco",
  digitacaoLetrasIngles: () => "/digitacao/letras-ingles",
  digitacaoSonic: () => "/digitacao/sonic",
  digitacaoRanking: () => "/digitacao/ranking",
  provas: () => "/provas",
  quiz: (categoria: string, prova: string) =>
    `/provas/quiz/${encodeURIComponent(categoria)}/${encodeURIComponent(prova)}`,
} as const;
