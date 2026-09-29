import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Vendas/
 * Avaliação - Vendas (Descritiva).prova.js): mesmas 2 perguntas abertas do
 * arquivo original, sem gabarito — o professor corrige, como já era no
 * repositório antigo.
 */
const prova: ProvaInterativa = {
  tipo: "descritiva",
  titulo: "Avaliação Descritiva — Vendas",
  perguntas: [
    "Descreva as etapas que você seguiria para atender e fechar uma venda com um novo cliente.",
    "Na sua opinião, por que a ética é importante no processo de vendas? Dê um exemplo de atitude antiética que deve ser evitada.",
  ],
};

export default prova;
