import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Assistente de Logística/
 * Avaliação - Assistente de Logística.prova.js): mesmas 10 perguntas e o
 * mesmo gabarito do arquivo original. Metade virou dissertativa
 * autocorrigida, usando a resposta certa original como base das
 * `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Assistente de Logística",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que é logística?",
      respostasAceitas: ["planejamento, controle e execução do fluxo", "fluxo de produtos"],
    },
    {
      pergunta: "O que é \"estoque\"?",
      opcoes: [
        "O dinheiro em caixa da empresa",
        "O conjunto de mercadorias armazenadas disponíveis para uso ou venda",
        "Um tipo de transporte",
        "Um documento fiscal",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que significa \"inventário\" no contexto de logística?",
      respostasAceitas: ["contagem e conferência física dos produtos", "contagem física do estoque"],
    },
    {
      pergunta: "O que é \"supply chain\" (cadeia de suprimentos)?",
      opcoes: [
        "Um único fornecedor da empresa",
        "Toda a rede envolvida na produção e entrega de um produto, do fornecedor ao cliente final",
        "Apenas o setor de vendas",
        "Um tipo de imposto sobre transporte",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é o método de estoque \"PEPS\" (ou FIFO)?",
      respostasAceitas: ["primeiro que entra é o primeiro a sair", "peps", "fifo"],
    },
    {
      pergunta: "O que é um \"romaneio de carga\"?",
      opcoes: [
        "Um tipo de caminhão",
        "Um documento que lista os itens e quantidades de uma carga transportada",
        "Um imposto sobre transporte",
        "Um sistema de rastreamento via satélite",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Qual é a função de um Centro de Distribuição (CD)?",
      respostasAceitas: ["armazenar e distribuir produtos", "distribuir produtos para lojas ou clientes"],
    },
    {
      pergunta: "O que é \"lead time\" na logística?",
      opcoes: [
        "O tempo entre o pedido e a entrega do produto",
        "O tempo de vida útil do produto",
        "O peso máximo de uma carga",
        "Um tipo de embalagem",
      ],
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta: "Por que o controle de estoque é importante para uma empresa?",
      respostasAceitas: ["evita falta ou excesso de produtos", "reduz custos e perdas"],
    },
    {
      pergunta: "O que é \"modal de transporte\"?",
      opcoes: [
        "O nome da transportadora",
        "O meio utilizado para transportar mercadorias (rodoviário, aéreo, marítimo, ferroviário)",
        "Um tipo de embalagem",
        "Um documento fiscal",
      ],
      correta: 1,
    },
  ],
};

export default prova;
