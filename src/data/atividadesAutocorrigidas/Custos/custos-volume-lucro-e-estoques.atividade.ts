import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Análise Custo, Volume e Lucro e Avaliação de Estoques com Inflação",
  introducao:
    "Descubra quantas unidades é preciso vender para não ter prejuízo e veja como o método de avaliar estoques muda o custo e o lucro quando os preços sobem.",
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
    escolha({
      id: "efeito",
      titulo: "O efeito no lucro",
      instrucao: "Com os preços de compra subindo, qual método dá o maior lucro bruto e por quê?",
      opcoes: [
        "O PEPS, porque baixa para o CMV as compras mais antigas, mais baratas.",
        "O custo médio, porque ignora os preços.",
        "Nenhum: sempre dá o mesmo.",
        "O PEPS dá o menor lucro sempre.",
      ],
      correta: 0,
      explicacao: "Com inflação, o PEPS leva ao CMV os custos mais antigos e baixos, mostrando lucro maior, mas estoques valorizados a preços recentes.",
    }),
    resposta({
      id: "reposicao",
      titulo: "Cuidado com o lucro aparente",
      instrucao: "Explique por que, em tempos de inflação, o lucro do PEPS pode ser enganoso para a decisão de reposição do estoque.",
      rotulo: "Sua explicação",
      placeholder: "Repor o estoque custa mais caro que o custo usado no CMV, então parte do lucro...",
      chave: /(repor|reposi|mais caro|atual|infla|lucro|custo)/i,
    }),
  ],
};

export default atividade;
