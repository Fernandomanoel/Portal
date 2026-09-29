import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Atendimento ao Cliente/
 * Avaliação - Atendimento ao Cliente (Múltipla Escolha).prova.js): mesmas 8
 * perguntas e o mesmo gabarito do arquivo original. Metade virou dissertativa
 * autocorrigida, usando a resposta certa original como base das
 * `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Atendimento ao Cliente",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que é fundamental para um bom atendimento ao cliente?",
      respostasAceitas: ["escutar atentamente", "empatia com as necessidades do cliente"],
    },
    {
      pergunta: "Como lidar com um cliente insatisfeito?",
      opcoes: [
        "Discutir e provar que ele está errado",
        "Ouvir com calma, entender o problema e buscar uma solução",
        "Ignorar a reclamação",
        "Transferir a culpa para outro setor sem explicação",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que significa \"empatia\" no atendimento?",
      respostasAceitas: ["se colocar no lugar do cliente", "entender a necessidade do cliente"],
    },
    {
      pergunta: "Qual a importância da comunicação clara no atendimento?",
      opcoes: [
        "Não é importante",
        "Evita mal-entendidos e transmite confiança ao cliente",
        "Serve só para impressionar",
        "Só é necessária em atendimento por telefone",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é \"pós-venda\"?",
      respostasAceitas: ["acompanhamento e suporte ao cliente após a compra", "suporte após a compra"],
    },
    {
      pergunta: "Como deve ser o tom de voz num atendimento telefônico?",
      opcoes: ["Irritado e apressado", "Calmo, educado e profissional", "Indiferente", "Muito baixo, quase inaudível"],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que fazer quando não se sabe a resposta para a dúvida de um cliente?",
      respostasAceitas: ["ser honesto, buscar a informação correta", "buscar a informação correta e retornar"],
    },
    {
      pergunta: "Por que a paciência é importante no atendimento ao cliente?",
      opcoes: [
        "Não é uma qualidade necessária",
        "Ajuda a lidar com situações difíceis sem prejudicar a experiência do cliente",
        "Serve apenas para atendimentos longos",
        "É importante só para o cliente, não para o atendente",
      ],
      correta: 1,
    },
  ],
};

export default prova;
