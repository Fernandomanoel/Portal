import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Gestão de Pessoas/
 * Avaliação - Gestão de Pessoas (Descritiva).prova.js): mesmas 2 perguntas
 * abertas do arquivo original, sem gabarito — o professor corrige, como já
 * era no repositório antigo.
 */
const prova: ProvaInterativa = {
  tipo: "descritiva",
  titulo: "Avaliação Descritiva — Gestão de Pessoas",
  perguntas: [
    "Explique, com suas palavras, por que reter talentos é importante para uma empresa.",
    "Descreva uma ação que um gestor pode tomar para melhorar o clima organizacional de sua equipe.",
  ],
};

export default prova;
