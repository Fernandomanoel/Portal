import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Vendas/): reúne em uma só prova as
 * duas avaliações do arquivo original — as 8 perguntas objetivas e as 2
 * perguntas abertas, que antes eram uma prova descritiva à parte. As abertas
 * agora também são conferidas por palavras-chave (`respostasAceitas`); quando
 * a resposta não bate com nenhuma, ela fica a revisar para o professor.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Vendas (Completa)",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que é fundamental para o sucesso em vendas?",
      respostasAceitas: ["entender as necessidades do cliente", "oferecer a solução adequada"],
    },
    {
      pergunta: "O que é \"prospecção de clientes\"?",
      opcoes: [
        "O fechamento da venda",
        "O processo de buscar e identificar potenciais clientes",
        "A entrega do produto",
        "O pós-venda",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que significa \"objeção\" em uma venda?",
      respostasAceitas: ["dúvida, resistência ou preocupação", "resistência do cliente"],
    },
    {
      pergunta: "Qual a importância de conhecer bem o produto que se vende?",
      opcoes: [
        "Não é importante",
        "Permite responder dúvidas com segurança e transmitir confiança ao cliente",
        "Serve apenas para impressionar colegas de trabalho",
        "É importante só para produtos caros",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é \"fechamento de venda\"?",
      respostasAceitas: ["cliente decide efetivamente comprar", "momento em que o cliente decide comprar"],
    },
    {
      pergunta: "O que é \"pós-venda\" e por que é importante?",
      opcoes: [
        "Não tem importância nenhuma",
        "É o acompanhamento após a venda, que fortalece o relacionamento e fideliza o cliente",
        "É apenas a entrega do produto",
        "É uma etapa opcional sem impacto nos resultados",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Como lidar com um cliente indeciso?",
      respostasAceitas: ["esclarecer dúvidas com paciência", "destacar os benefícios"],
    },
    {
      pergunta: "O que é \"up-sell\"?",
      opcoes: [
        "Vender um produto de valor menor",
        "Oferecer ao cliente uma versão superior ou mais completa do produto que ele já pretende comprar",
        "Cancelar uma venda",
        "Devolver um produto",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Descreva as etapas que você seguiria para atender e fechar uma venda com um novo cliente.",
      respostasAceitas: ["prospec", "abordagem", "necessidade", "apresentacao do produto", "objec", "fechamento", "pos-venda", "pos venda", "negociacao"],
    },
    {
      tipo: "dissertativa",
      pergunta: "Na sua opinião, por que a ética é importante no processo de vendas? Dê um exemplo de atitude antiética que deve ser evitada.",
      respostasAceitas: ["confianca", "honestidade", "mentir", "enganar", "propaganda enganosa", "omitir", "manipular", "credibilidade", "fidelizar", "reputacao"],
    },
  ],
};

export default prova;
