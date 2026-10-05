import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculo, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Porcentagem e Potenciação",
  introducao:
    "Porcentagens sucessivas e potências são a ponte para os juros compostos. Calcule acréscimos, descontos e variações acumuladas.",
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
  ],
};

export default atividade;
