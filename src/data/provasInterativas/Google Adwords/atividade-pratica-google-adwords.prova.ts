import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Google Adwords/ATIVIDADE PRÁTICA –
 * GOOGLE ADWORDS.pdf): as mesmas perguntas abertas, respondidas no próprio
 * portal; o professor corrige. A questão 4 do PDF remetia a uma figura que não
 * veio no arquivo, então ficou de fora. A 7 pedia um documento do Word para
 * mostrar ao educador: agora a resposta é escrita aqui.
 */
const prova: ProvaInterativa = {
  tipo: "descritiva",
  titulo: "Atividade Prática — Google Adwords",
  perguntas: [
    "Quais os 3 passos para planejar uma campanha?",
    "Um anunciante no Google AdWords está buscando aumentar a visibilidade de seus anúncios para usuários que realizam pesquisas específicas relacionadas ao seu negócio. Qual estratégia de segmentação o anunciante deve utilizar para atingir esse objetivo e como ela pode ser otimizada para melhorar o desempenho dos anúncios?",
    "Descreva quais são os tipos de campanha.",
    "Cite uma forma de melhorar o desempenho de uma campanha.",
    "O que significa PALAVRA-CHAVE no Google AdWords?",
    "Um anunciante solicitou seus serviços para melhorar os negócios de sua empresa de calçados. Crie uma campanha para essa marca de calçados: faça uma busca de valores de anúncios e diga quanto ele vai gastar com marketing, publicidade e posts. Escreva aqui a campanha e os valores pesquisados.",
  ],
};

export default prova;
