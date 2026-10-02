import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Escrita Fiscal e Contabilidade/
 * Avaliação - Escrita Fiscal e Contabilidade.prova.js): mesmas 10 perguntas e
 * o mesmo gabarito do arquivo original. Metade virou dissertativa
 * autocorrigida, usando a resposta certa original como base das
 * `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Escrita Fiscal e Contabilidade",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que é uma \"nota fiscal\"?",
      respostasAceitas: ["documento fiscal que comprova", "comprova uma operação de venda"],
    },
    {
      pergunta: "O que significa \"escrituração fiscal\"?",
      opcoes: [
        "O registro organizado das operações fiscais e tributárias de uma empresa",
        "A contratação de novos funcionários",
        "A elaboração do organograma da empresa",
        "O controle de estoque físico",
      ],
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é ICMS?",
      respostasAceitas: ["imposto sobre circulação de mercadorias e serviços", "icms"],
    },
    {
      pergunta: "O que é o Simples Nacional?",
      opcoes: [
        "Um tipo de nota fiscal",
        "Um regime tributário simplificado para micro e pequenas empresas",
        "Um imposto federal único",
        "Um sistema de estoque",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é um \"balanço patrimonial\"?",
      respostasAceitas: ["bens, direitos e obrigações", "demonstrativo contábil"],
    },
    {
      pergunta: "O que significam \"débito\" e \"crédito\" na contabilidade?",
      opcoes: [
        "Débito é sempre dinheiro que entra, crédito é dinheiro que sai",
        "São lançamentos contábeis que representam a movimentação de contas, podendo indicar entradas ou saídas dependendo da natureza da conta",
        "São sinônimos, não há diferença",
        "Débito é usado só em bancos",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é a \"DIRF\"?",
      respostasAceitas: ["declaração do imposto de renda retido na fonte", "dirf"],
    },
    {
      pergunta: "Qual a finalidade do livro-caixa em uma empresa?",
      opcoes: [
        "Registrar apenas as compras de material de escritório",
        "Registrar todas as entradas e saídas financeiras da empresa",
        "Listar os funcionários contratados",
        "Armazenar contratos de fornecedores",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é o CNPJ?",
      respostasAceitas: ["cadastro nacional da pessoa jurídica", "cnpj"],
    },
    {
      pergunta: "Por que a organização fiscal e contábil é importante para uma empresa?",
      opcoes: [
        "Não tem nenhuma importância prática",
        "Garante conformidade com a lei, evita multas e ajuda na tomada de decisões financeiras",
        "Serve apenas para fins estéticos",
        "É opcional para todas as empresas",
      ],
      correta: 1,
    },
  ],
};

export default prova;
