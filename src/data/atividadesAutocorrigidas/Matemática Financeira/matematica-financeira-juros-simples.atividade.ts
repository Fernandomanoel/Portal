import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculo, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Juros Simples",
  introducao:
    "No regime de juros simples, a taxa incide sempre sobre o capital inicial. Calcule juros, montantes, taxas e prazos e converta taxas em dias.",
  itens: [
    escolha({
      id: "formula",
      titulo: "A fórmula dos juros simples",
      instrucao: "Qual conjunto de fórmulas está correto?",
      opcoes: [
        "J = C · i · n  e  M = C + J",
        "J = C · (1 + i)ⁿ  e  M = C − J",
        "J = C ÷ i  e  M = J ÷ n",
        "J = C + i  e  M = n · i",
      ],
      correta: 0,
      explicacao: "J = C·i·n; o montante M = C + J = C·(1 + i·n). A taxa e o prazo devem estar na mesma unidade de tempo.",
    }),
    calculos({
      id: "calculo-basico",
      titulo: "Juros e montante",
      cenario: "Um capital de R$ 4.000,00 foi aplicado a 1,5% ao mês, juros simples, por 8 meses.",
      instrucao: "Calcule os juros e o montante.",
      campos: [
        { id: "juros", rotulo: "Juros (R$)", esperado: 480, explicacao: "4.000 × 0,015 × 8 = 480." },
        { id: "montante", rotulo: "Montante (R$)", esperado: 4480, explicacao: "4.000 + 480 = 4.480." },
      ],
    }),
    calculo({
      id: "em-dias",
      titulo: "Prazo em dias (ano comercial)",
      cenario: "Um capital de R$ 8.000,00 foi aplicado a 18% ao ano, juros simples, por 150 dias. Use o ano comercial de 360 dias.",
      instrucao: "Qual é o valor dos juros?",
      rotulo: "Juros (R$)",
      esperado: 600,
      explicacao: "8.000 × 0,18 × 150 ÷ 360 = 600.",
    }),
    calculo({
      id: "descobrir-taxa",
      titulo: "Descobrindo a taxa",
      cenario: "Um capital de R$ 2.000,00 rendeu R$ 240,00 de juros simples em 6 meses.",
      instrucao: "Qual foi a taxa mensal, em %?",
      rotulo: "Taxa ao mês (%)",
      esperado: 2,
      explicacao: "i = J ÷ (C · n) = 240 ÷ (2.000 × 6) = 0,02, ou 2% ao mês.",
    }),
    calculo({
      id: "descobrir-prazo",
      titulo: "Descobrindo o prazo",
      cenario: "Um capital de R$ 5.000,00 aplicado a 2% ao mês, juros simples, rendeu R$ 800,00.",
      instrucao: "Por quantos meses o dinheiro ficou aplicado?",
      rotulo: "Prazo (meses)",
      esperado: 8,
      tolerancia: 0,
      explicacao: "n = J ÷ (C · i) = 800 ÷ (5.000 × 0,02) = 8.",
    }),
    calculo({
      id: "taxa-proporcional",
      titulo: "Taxa proporcional",
      cenario: "Em juros simples, taxas de períodos diferentes são proporcionais. A taxa é de 24% ao ano.",
      instrucao: "Qual é a taxa proporcional ao mês, em %?",
      rotulo: "Taxa ao mês (%)",
      esperado: 2,
      explicacao: "24% ÷ 12 meses = 2% ao mês.",
    }),
  ],
};

export default atividade;
