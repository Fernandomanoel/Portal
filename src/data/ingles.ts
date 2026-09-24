import { rotas } from "@/lib/rotas";
import type { AtalhoIngles, AtividadeIngles, ProvaIngles } from "@/types/ingles";
import dialogos1 from "./inglesAtividades/dialogos-1";
import dialogos2 from "./inglesAtividades/dialogos-2";
import oucaELeia1 from "./inglesAtividades/ouca-e-leia-1";
import oucaELeia2 from "./inglesAtividades/ouca-e-leia-2";

/**
 * Trilha de Inglês. Cada atividade é um arquivo em `inglesAtividades/`
 * com os exercícios ou diálogos como dado — a tela (`PraticaIngles`) é uma
 * só para todas.
 */
export const ATIVIDADES_INGLES: AtividadeIngles[] = [oucaELeia1, oucaELeia2, dialogos1, dialogos2];

/** Atividades de inglês que moram em outra seção e aparecem na trilha como atalho. */
export const ATALHOS_INGLES: AtalhoIngles[] = [
  {
    titulo: "Inglês em Letras de Música",
    descricao: "Treino de digitação com 8 letras de música em inglês, com precisão, velocidade e combo.",
    cor: "#be123c",
    para: rotas.digitacaoLetrasIngles(),
  },
];

export const PROVAS_INGLES: ProvaIngles[] = [];

export function acharAtividadeIngles(slug: string): AtividadeIngles | undefined {
  return ATIVIDADES_INGLES.find((atividade) => atividade.slug === slug);
}

export function totalDeTarefas(atividade: AtividadeIngles): number {
  return atividade.conteudo.tipo === "exercicios"
    ? atividade.conteudo.exercicios.length
    : atividade.conteudo.dialogos.reduce((soma, dialogo) => soma + dialogo.falas.length, 0);
}
