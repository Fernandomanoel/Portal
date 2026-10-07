import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, planilha, dissertativa } from "../ajudantes";

const PRODUTOS = [
  ["Notebook", 4000, 5, 8, 10],
  ["Monitor", 1200, 4, 6, 15],
  ["Teclado", 150, 3, 5, 20],
];
const final = (l: (string | number)[]) => {
  const [, p, a, b, d] = l as [string, number, number, number, number];
  return p * (1 + a / 100) * (1 + b / 100) * (1 - d / 100);
};

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Porcentagem e Potenciação",
  introducao:
    "Porcentagens sucessivas e potências são a ponte para os juros compostos. Calcule acréscimos, descontos e variações acumuladas. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    calculos({
      id: "fator",
      titulo: "Fator de acréscimo e de desconto",
      cenario: "Um produto de R$ 200,00 sofre um aumento de 15%. Em outra situação, um produto de R$ 200,00 recebe um desconto de 15%.",
      instrucao: "Calcule o valor com o aumento e o valor com o desconto.",
      campos: [
        { id: "aumento", rotulo: "Valor com aumento de 15% (R$)", esperado: 230, explicacao: "Fator 1,15: 200 × 1,15 = 230." },
        { id: "desconto", rotulo: "Valor com desconto de 15% (R$)", esperado: 170, explicacao: "Fator 0,85: 200 × 0,85 = 170." },
      ],
    }),
    calculo({
      id: "aumentos-sucessivos",
      titulo: "Aumentos sucessivos",
      cenario: "Um preço sobe 10% em janeiro e mais 20% em fevereiro.",
      instrucao: "Qual é o aumento acumulado, em %?",
      rotulo: "Aumento acumulado (%)",
      esperado: 32,
      explicacao: "1,10 × 1,20 = 1,32: aumento de 32%, não de 30%, porque os 20% incidem sobre o valor já aumentado.",
    }),
    calculo({
      id: "descontos-sucessivos",
      titulo: "Descontos sucessivos",
      cenario: "Uma loja dá 10% de desconto na vitrine e mais 10% no caixa, sobre o preço já descontado.",
      instrucao: "Qual é o desconto total, em %?",
      rotulo: "Desconto total (%)",
      esperado: 19,
      explicacao: "0,90 × 0,90 = 0,81: o preço final é 81% do original, ou seja, 19% de desconto.",
    }),
    escolha({
      id: "potencia",
      titulo: "Potenciação nos juros",
      cenario: "Um valor cresce 2% ao mês, ou seja, é multiplicado por 1,02 a cada mês.",
      instrucao: "Por qual fator o valor é multiplicado ao fim de 3 meses?",
      opcoes: ["1,02 × 3 = 3,06", "1,02³ ≈ 1,0612", "1 + 0,02 × 3 = 1,06", "1,02 + 3 = 4,02"],
      correta: 1,
      explicacao: "Em juros compostos o fator se multiplica a cada período: 1,02 × 1,02 × 1,02 = 1,02³ ≈ 1,0612.",
    }),
    calculo({
      id: "variacao",
      titulo: "Calculando uma variação",
      cenario: "Uma ação valia R$ 40,00 e passou a valer R$ 46,00.",
      instrucao: "Qual foi a valorização, em %?",
      rotulo: "Valorização (%)",
      esperado: 15,
      explicacao: "(46 − 40) ÷ 40 = 0,15, ou 15%.",
    }),
    calculo({
      id: "volta-ao-original",
      titulo: "Quanto precisa cair",
      cenario: "O preço de um produto subiu 25%.",
      instrucao: "De quantos por cento ele precisa cair para voltar ao preço original?",
      rotulo: "Queda necessária (%)",
      esperado: 20,
      explicacao: "O fator de ida é 1,25; para voltar: 1 ÷ 1,25 = 0,80, uma queda de 20%.",
    }),
    planilha({
      id: "reajustes-sucessivos",
      titulo: "Planilha: reajustes e desconto promocional",
      cenario: "O preço de cada produto sofreu dois reajustes (janeiro e julho) e, depois, uma promoção. Os percentuais incidem um sobre o resultado do outro: preço final = preço inicial × (1 + reajuste 1) × (1 + reajuste 2) × (1 − desconto). Cole a planilha no Excel e resolva.",
      colunas: ["Produto", "Preço inicial (R$)", "Reajuste de janeiro (%)", "Reajuste de julho (%)", "Desconto da promoção (%)"],
      linhas: PRODUTOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "final-notebook", rotulo: "Preço final do Notebook (R$)", valor: final(PRODUTOS[0]), explicacao: "4.000 × 1,05 × 1,08 × 0,90." },
        { id: "final-monitor", rotulo: "Preço final do Monitor (R$)", valor: final(PRODUTOS[1]), explicacao: "1.200 × 1,04 × 1,06 × 0,85." },
        { id: "variacao-teclado", rotulo: "Variação total do preço do Teclado, do inicial ao final (%)", valor: (final(PRODUTOS[2]) / 150 - 1) * 100, explicacao: "1,03 × 1,05 × 0,80 = 0,8652: queda de 13,48%." },
        { id: "reajuste-acumulado", rotulo: "Reajuste acumulado do Notebook antes da promoção (%)", valor: (1.05 * 1.08 - 1) * 100, explicacao: "1,05 × 1,08 = 1,134: 13,4%, e não 13%." },
      ],
    }),
    dissertativa({
      id: "sucessivos-armadilha",
      titulo: "A armadilha das porcentagens sucessivas",
      instrucao: "Explique, com exemplos da planilha, por que não se somam percentuais sucessivos e como isso afeta o preço pago pelo cliente.",
      deve: [
        "Mostre que dois reajustes (5% e 8%) não equivalem a 13%.",
        "Explique por que um aumento seguido de desconto do mesmo percentual não volta ao preço inicial.",
        "Dê um conselho a um vendedor sobre como apresentar promoções sem confundir o cliente.",
      ],
      chave: /(sucessiv|acumul|somar|incide|fator|desconto|aumento|pre[cç]o)/i,
    }),
  ],
};

export default atividade;
