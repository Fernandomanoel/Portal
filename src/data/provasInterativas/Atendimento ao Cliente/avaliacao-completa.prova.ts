import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Atendimento ao Cliente/): reúne em uma só prova as
 * duas avaliações do arquivo original — as 8 perguntas objetivas e as 2
 * perguntas abertas, que antes eram uma prova descritiva à parte. As abertas
 * agora também são conferidas por palavras-chave (`respostasAceitas`); quando
 * a resposta não bate com nenhuma, ela fica a revisar para o professor.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Atendimento ao Cliente (Completa)",
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
    {
      tipo: "dissertativa",
      pergunta: "Descreva como você agiria ao atender um cliente muito irritado que reclama de um produto com defeito.",
      respostasAceitas: ["ouvir com calma", "escutar", "empatia", "pedir desculpa", "pedir desculpas", "buscar uma solucao", "oferecer uma solucao", "troca", "conserto", "reparo"],
    },
    {
      tipo: "dissertativa",
      pergunta: "Na sua opinião, o que diferencia um bom atendimento de um atendimento excelente? Dê um exemplo.",
      respostasAceitas: ["superar as expectativas", "superar a expectativa", "alem do esperado", "antecipar", "surpreender", "encantar", "encantamento"],
    },
  ],
};

export default prova;
