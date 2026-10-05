import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Taxas de Inflação e Correção Monetária",
  introducao:
    "A inflação reduz o poder de compra do dinheiro. Calcule a inflação acumulada, corrija valores e descubra o ganho real de um investimento.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "O que é inflação",
      instrucao: "O que significa uma inflação de 5% ao ano?",
      opcoes: [
        "Os preços, em média, subiram 5% em um ano, e o dinheiro compra menos.",
        "Os salários subiram 5%.",
        "O dólar caiu 5%.",
        "Os juros do banco subiram 5%.",
      ],
      correta: 0,
      explicacao: "Inflação é o aumento generalizado e contínuo dos preços, medido por índices como o IPCA.",
    }),
    calculo({
      id: "acumulada",
      titulo: "Inflação acumulada",
      cenario: "A inflação foi de 0,5% em janeiro, 0,4% em fevereiro e 0,3% em março.",
      instrucao: "Qual é a inflação acumulada no trimestre, em %? (Multiplique os fatores 1,005 × 1,004 × 1,003.)",
      rotulo: "Inflação acumulada (%)",
      esperado: 1.2,
      tolerancia: 0.02,
      explicacao: "1,005 × 1,004 × 1,003 ≈ 1,01205: cerca de 1,20%, um pouco acima da soma simples de 1,2%.",
    }),
    calculos({
      id: "correcao",
      titulo: "Correção monetária",
      cenario: "Um aluguel de R$ 2.000,00 será corrigido pela inflação de 12 meses, que foi de 4,5%.",
      instrucao: "Calcule o novo aluguel e o aumento em reais.",
      campos: [
        { id: "novo", rotulo: "Novo aluguel (R$)", esperado: 2090, explicacao: "2.000 × 1,045 = 2.090." },
        { id: "aumento", rotulo: "Aumento (R$)", esperado: 90, explicacao: "2.090 − 2.000 = 90." },
      ],
    }),
    calculo({
      id: "poder-de-compra",
      titulo: "Poder de compra",
      cenario: "Com inflação de 5% ao ano, R$ 100,00 guardados sem render nada perdem poder de compra.",
      instrucao: "Daqui a um ano, o poder de compra de R$ 100,00 equivale a quantos reais de hoje?",
      rotulo: "Valor em reais de hoje (R$)",
      esperado: 95.24,
      tolerancia: 0.02,
      explicacao: "100 ÷ 1,05 ≈ 95,24: o mesmo dinheiro compra cerca de 4,8% menos.",
    }),
    calculo({
      id: "taxa-real",
      titulo: "Ganho real",
      cenario: "Um investimento rendeu 12% no ano (taxa nominal), e a inflação do período foi 5%.",
      instrucao: "Qual foi o ganho real, em %? (Taxa real = (1 + nominal) ÷ (1 + inflação) − 1.)",
      rotulo: "Taxa real (%)",
      esperado: 6.67,
      tolerancia: 0.02,
      explicacao: "1,12 ÷ 1,05 − 1 ≈ 0,0667: 6,67% de ganho real, e não 7%.",
    }),
    associar({
      id: "indices",
      titulo: "Índices e taxas",
      instrucao: "Associe cada termo ao que ele representa.",
      opcoes: ["Taxa nominal", "Taxa real", "Taxa de inflação"],
      linhas: [
        { id: "nominal", rotulo: "O rendimento anunciado, sem descontar a inflação.", correta: 0 },
        { id: "real", rotulo: "O rendimento depois de descontada a inflação.", correta: 1 },
        { id: "inflacao", rotulo: "A variação média dos preços no período.", correta: 2 },
      ],
      explicacao: "Um investimento só aumenta o seu poder de compra se a taxa real for positiva.",
    }),
  ],
};

export default atividade;
