import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Atendimento ao Cliente/
 * Avaliação - Atendimento ao Cliente (Descritiva).prova.js): mesmas 2
 * perguntas abertas do arquivo original, sem gabarito — o professor corrige,
 * como já era no repositório antigo.
 */
const prova: ProvaInterativa = {
  tipo: "descritiva",
  titulo: "Avaliação Descritiva — Atendimento ao Cliente",
  perguntas: [
    "Descreva como você agiria ao atender um cliente muito irritado que reclama de um produto com defeito.",
    "Na sua opinião, o que diferencia um bom atendimento de um atendimento excelente? Dê um exemplo.",
  ],
};

export default prova;
