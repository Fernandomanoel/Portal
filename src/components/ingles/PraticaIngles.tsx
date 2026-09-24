import type { AtividadeIngles } from "@/types/ingles";
import { ConversasReaisIngles } from "./ConversasReaisIngles";
import { DialogosIngles } from "./DialogosIngles";
import { ExerciciosIngles } from "./ExerciciosIngles";
import { TextosFaladosIngles } from "./TextosFaladosIngles";

/** Escolhe a tela pelo tipo de conteúdo da atividade. */
export function PraticaIngles({ atividade }: { atividade: AtividadeIngles }) {
  const { conteudo } = atividade;
  switch (conteudo.tipo) {
    case "exercicios":
      return <ExerciciosIngles key={atividade.slug} atividade={atividade} exercicios={conteudo.exercicios} vocabulario={conteudo.vocabulario} />;
    case "dialogos":
      return <DialogosIngles key={atividade.slug} atividade={atividade} dialogos={conteudo.dialogos} />;
    case "textos":
      return <TextosFaladosIngles key={atividade.slug} atividade={atividade} textos={conteudo.textos} />;
    case "conversas":
      return <ConversasReaisIngles key={atividade.slug} atividade={atividade} conversas={conteudo.conversas} />;
  }
}
