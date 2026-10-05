import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const MOVIMENTOS = [
  ["02/05", "Compra", 100, 10],
  ["10/05", "Compra", 150, 11],
  ["18/05", "Venda", 120, ""],
  ["25/05", "Compra", 100, 13],
  ["28/05", "Venda", 200, ""],
];
const estoque = () => {
  const camadas: { q: number; c: number }[] = [];
  let cmvPeps = 0;
  let q = 0;
  let valor = 0;
  let cmvMedio = 0;
  for (const [, op, qtd, custo] of MOVIMENTOS as [string, string, number, number][]) {
    if (op === "Compra") {
      camadas.push({ q: qtd, c: custo });
      q += qtd;
      valor += qtd * custo;
    } else {
      let falta = qtd;
      while (falta > 0) {
        const camada = camadas[0];
        const usa = Math.min(falta, camada.q);
        cmvPeps += usa * camada.c;
        camada.q -= usa;
        falta -= usa;
        if (camada.q === 0) camadas.shift();
      }
      const medio = valor / q;
      cmvMedio += qtd * medio;
      q -= qtd;
      valor -= qtd * medio;
    }
  }
  return { cmvPeps, cmvMedio, estoquePeps: somar(camadas.map((k) => k.q * k.c)), quantidade: q };
};
const RESULTADO_ESTOQUE = estoque();

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Análise Custo, Volume e Lucro e Avaliação de Estoques com Inflação",
  introducao:
    "Descubra quantas unidades é preciso vender para não ter prejuízo e veja como o método de avaliar estoques muda o custo e o lucro quando os preços sobem. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    calculos({
      id: "ponto-equilibrio",
      titulo: "Ponto de equilíbrio contábil",
      cenario: "Uma empresa vende cada unidade por R$ 20,00, tem custo variável de R$ 8,00 por unidade e custos fixos de R$ 12.000,00 por mês.",
      instrucao: "Calcule a margem de contribuição por unidade, o ponto de equilíbrio em unidades e a receita nesse ponto.",
      campos: [
        { id: "mcu", rotulo: "Margem de contribuição por unidade (R$)", esperado: 12, explicacao: "20 − 8 = 12." },
        { id: "pe-unidades", rotulo: "Ponto de equilíbrio (unidades)", esperado: 1000, tolerancia: 0, explicacao: "12.000 ÷ 12 = 1.000 unidades." },
        { id: "pe-receita", rotulo: "Receita no equilíbrio (R$)", esperado: 20000, explicacao: "1.000 × 20 = 20.000." },
      ],
    }),
    calculos({
      id: "lucro-seguranca",
      titulo: "Lucro e margem de segurança",
      cenario: "Com os mesmos dados, a empresa vendeu 1.400 unidades no mês.",
      instrucao: "Calcule o lucro e a margem de segurança (quanto as vendas podem cair, em %, antes de chegar ao ponto de equilíbrio).",
      campos: [
        { id: "lucro", rotulo: "Lucro do mês (R$)", esperado: 4800, explicacao: "(1.400 − 1.000) × 12 = 4.800." },
        { id: "margem-seguranca", rotulo: "Margem de segurança (%)", esperado: 28.57, explicacao: "(1.400 − 1.000) ÷ 1.400 = 0,2857, ou 28,57%." },
      ],
    }),
    escolha({
      id: "meta-lucro",
      titulo: "Atingindo uma meta de lucro",
      instrucao: "Para lucrar R$ 6.000,00 por mês nos mesmos dados, quantas unidades são necessárias? (Fórmula: (custos fixos + lucro desejado) ÷ margem de contribuição unitária.)",
      opcoes: ["1.000", "1.250", "1.500", "1.800"],
      correta: 2,
      explicacao: "(12.000 + 6.000) ÷ 12 = 1.500 unidades.",
    }),
    calculos({
      id: "estoque-inflacao",
      titulo: "Estoques em tempos de inflação",
      cenario:
        "Uma loja comprou 100 unidades a R$ 10,00 e depois mais 100 unidades a R$ 12,00 (o preço subiu). Vendeu 120 unidades no período.",
      instrucao: "Calcule o custo das mercadorias vendidas (CMV) pelo método PEPS (primeiro a entrar, primeiro a sair) e pelo custo médio ponderado.",
      campos: [
        { id: "peps", rotulo: "CMV pelo PEPS (R$)", esperado: 1240, explicacao: "Saem primeiro as 100 unidades de R$ 10 (1.000) e depois 20 de R$ 12 (240): 1.240." },
        { id: "medio", rotulo: "CMV pelo custo médio (R$)", esperado: 1320, explicacao: "Custo médio = (1.000 + 1.200) ÷ 200 = 11; 120 × 11 = 1.320." },
      ],
    }),
    resposta({
      id: "reposicao",
      titulo: "Cuidado com o lucro aparente",
      instrucao: "Explique por que, em tempos de inflação, o lucro do PEPS pode ser enganoso para a decisão de reposição do estoque.",
      rotulo: "Sua explicação",
      placeholder: "Repor o estoque custa mais caro que o custo usado no CMV, então parte do lucro...",
      chave: /(repor|reposi|mais caro|atual|infla|lucro|custo)/i,
    }),
    planilha({
      id: "movimento-de-estoque",
      titulo: "Planilha: movimentação de estoque em tempo de preços em alta",
      cenario: "Uma loja registrou as compras e vendas de um produto em maio. O preço de compra subiu a cada reposição. Cole a planilha no Excel e apure o custo das mercadorias vendidas (CMV) pelos dois métodos. No custo médio móvel, o custo médio é recalculado a cada compra.",
      colunas: ["Data", "Operação", "Quantidade", "Custo unitário de compra (R$)"],
      linhas: MOVIMENTOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "cmv-peps", rotulo: "CMV total pelo PEPS (R$)", valor: RESULTADO_ESTOQUE.cmvPeps, explicacao: "Venda de 120: 100×10 + 20×11 = 1.220. Venda de 200: 130×11 + 70×13 = 2.340. Total 3.560." },
        { id: "cmv-medio", rotulo: "CMV total pelo custo médio móvel (R$)", valor: RESULTADO_ESTOQUE.cmvMedio, explicacao: "A cada venda usa-se o custo médio vigente naquele momento." },
        { id: "estoque-final", rotulo: "Valor do estoque final pelo PEPS (R$)", valor: RESULTADO_ESTOQUE.estoquePeps, explicacao: "Restam 30 unidades compradas a R$ 13: 390." },
        { id: "diferenca", rotulo: "Diferença de CMV entre os métodos (R$, médio menos PEPS)", valor: RESULTADO_ESTOQUE.cmvMedio - RESULTADO_ESTOQUE.cmvPeps, explicacao: "Com preços em alta, o PEPS leva ao CMV os custos mais antigos e mais baixos." },
      ],
    }),
    dissertativa({
      id: "analise-do-estoque",
      titulo: "Estoque, inflação e decisão de reposição",
      instrucao: "Escreva uma análise sobre os efeitos do método de avaliação do estoque no resultado da loja, em um cenário de preços em alta.",
      deve: [
        "Compare o lucro bruto que cada método mostraria, dado o mesmo preço de venda.",
        "Explique por que o lucro maior do PEPS pode ser enganoso para quem precisa repor o estoque a preços mais altos.",
        "Diga qual método você usaria para decidir preço de venda e justifique.",
      ],
      chave: /(peps|m[eé]dio|cmv|lucro|reposi|infla|pre[cç]o|estoque)/i,
    }),
  ],
};

export default atividade;
