import type { AtividadeIngles } from "@/types/ingles";
import { DialogosIngles } from "./DialogosIngles";
import { ExerciciosIngles } from "./ExerciciosIngles";

/** Escolhe a tela pelo tipo de conteúdo da atividade. */
export function PraticaIngles({ atividade }: { atividade: AtividadeIngles }) {
  const { conteudo } = atividade;
  return conteudo.tipo === "exercicios" ? (
    <ExerciciosIngles key={atividade.slug} atividade={atividade} exercicios={conteudo.exercicios} />
  ) : (
    <DialogosIngles key={atividade.slug} atividade={atividade} dialogos={conteudo.dialogos} />
  );
}
