import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Noções sobre a Contabilidade de Custos",
  introducao:
    "Antes de calcular, é preciso falar a mesma língua: gasto, custo, despesa, investimento e perda não são sinônimos. Classifique os termos e calcule o custo de produção de um lote.",
  itens: [
    associar({
      id: "termos",
      titulo: "Gasto, custo, despesa, investimento ou perda",
      instrucao: "Classifique cada situação de uma indústria de móveis.",
      opcoes: ["Custo (ligado à produção)", "Despesa (ligada à venda e à administração)", "Investimento (benefício por vários períodos)", "Perda (evento anormal e involuntário)"],
      linhas: [
        { id: "madeira", rotulo: "Compra e consumo de madeira usada para fabricar os móveis.", correta: 0 },
        { id: "comissao", rotulo: "Comissão paga ao vendedor pela venda dos móveis.", correta: 1 },
        { id: "maquina", rotulo: "Compra de uma nova serra industrial, que será usada por vários anos.", correta: 2 },
        { id: "incendio", rotulo: "Madeira destruída em um incêndio acidental no depósito.", correta: 3 },
      ],
      explicacao: "Custo é o gasto com a produção; despesa é o que sustenta vender e administrar; investimento rende por vários períodos; perda é anormal e involuntária.",
    }),
    associar({
      id: "diretos-indiretos",
      titulo: "Custos diretos e indiretos",
      instrucao: "Classifique cada custo em relação a um produto específico, a cadeira.",
      opcoes: ["Direto (identificável no produto)", "Indireto (precisa de rateio)"],
      linhas: [
        { id: "estofado", rotulo: "Tecido usado no estofado da cadeira.", correta: 0 },
        { id: "aluguel-fabrica", rotulo: "Aluguel do galpão onde são feitos todos os móveis.", correta: 1 },
        { id: "marceneiro", rotulo: "Salário do marceneiro que só produz cadeiras.", correta: 0 },
        { id: "energia-geral", rotulo: "Energia elétrica da fábrica inteira.", correta: 1 },
      ],
      explicacao: "Direto se mede no produto; indireto serve a vários produtos e precisa ser distribuído por um critério (rateio).",
    }),
    calculos({
      id: "custo-producao",
      titulo: "Custo de produção do lote",
      cenario: "No mês foram produzidas 500 cadeiras. Matéria-prima: R$ 5.000,00. Mão de obra direta: R$ 3.200,00. Custos indiretos de fabricação: R$ 1.800,00.",
      instrucao: "Calcule o custo total de produção e o custo unitário.",
      campos: [
        { id: "total", rotulo: "Custo total de produção (R$)", esperado: 10000, explicacao: "5.000 + 3.200 + 1.800 = 10.000." },
        { id: "unitario", rotulo: "Custo unitário (R$)", esperado: 20, explicacao: "10.000 ÷ 500 = 20 por cadeira." },
      ],
    }),
    escolha({
      id: "para-que-serve",
      titulo: "Para que serve a contabilidade de custos",
      instrucao: "Qual é a função da contabilidade de custos para a gestão?",
      opcoes: [
        "Apenas atender ao fisco.",
        "Apurar o custo dos produtos e fornecer informações para decidir preço, controlar gastos e avaliar resultados.",
        "Calcular o salário dos sócios.",
        "Substituir a contabilidade financeira.",
      ],
      correta: 1,
      explicacao: "Além de valorizar estoques para a contabilidade, os custos orientam decisões de preço, compra e produção.",
    }),
    resposta({
      id: "exemplo",
      titulo: "Dê exemplos do seu mundo",
      instrucao: "Pense em uma empresa que você conhece e dê um exemplo de custo direto, um de custo indireto e um de despesa.",
      rotulo: "Seus exemplos",
      placeholder: "Em uma padaria: custo direto: farinha; custo indireto: energia do forno; despesa: ...",
      minPalavras: 10,
    }),
  ],
};

export default atividade;
