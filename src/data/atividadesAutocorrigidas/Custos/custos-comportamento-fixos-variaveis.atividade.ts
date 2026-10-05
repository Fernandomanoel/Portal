import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Comportamento dos Custos de Produção",
  introducao:
    "Alguns custos não mudam quando a produção cresce; outros crescem junto. Entender esse comportamento é a base para decidir preços e metas.",
  itens: [
    associar({
      id: "classificar",
      titulo: "Fixo ou variável",
      instrucao: "Classifique cada custo da fábrica de camisetas em relação ao volume produzido.",
      opcoes: ["Custo fixo", "Custo variável"],
      linhas: [
        { id: "aluguel", rotulo: "Aluguel do galpão.", correta: 0 },
        { id: "tecido", rotulo: "Tecido consumido por camiseta.", correta: 1 },
        { id: "supervisor", rotulo: "Salário mensal do supervisor.", correta: 0 },
        { id: "embalagem", rotulo: "Embalagem de cada camiseta.", correta: 1 },
      ],
      explicacao: "Fixo é o valor total que não muda com o volume (dentro de certo limite); variável muda na proporção da produção.",
    }),
    calculos({
      id: "custo-total",
      titulo: "Custo total e unitário",
      cenario: "Uma fábrica tem custos fixos de R$ 12.000,00 por mês e custo variável de R$ 8,00 por unidade. Produziu 1.500 unidades.",
      instrucao: "Calcule o custo total, o custo fixo por unidade e o custo total por unidade.",
      campos: [
        { id: "total", rotulo: "Custo total (R$)", esperado: 24000, explicacao: "12.000 + 8 × 1.500 = 24.000." },
        { id: "fixo-unit", rotulo: "Custo fixo por unidade (R$)", esperado: 8, explicacao: "12.000 ÷ 1.500 = 8." },
        { id: "total-unit", rotulo: "Custo total por unidade (R$)", esperado: 16, explicacao: "8 (fixo) + 8 (variável) = 16, ou 24.000 ÷ 1.500." },
      ],
    }),
    calculos({
      id: "diluicao",
      titulo: "Diluindo o custo fixo",
      cenario: "No mês seguinte, a fábrica produziu 2.000 unidades, com os mesmos custos fixos (R$ 12.000,00) e o mesmo custo variável (R$ 8,00 por unidade).",
      instrucao: "Qual é o novo custo fixo por unidade e o novo custo total por unidade?",
      campos: [
        { id: "fixo-unit", rotulo: "Custo fixo por unidade (R$)", esperado: 6, explicacao: "12.000 ÷ 2.000 = 6." },
        { id: "total-unit", rotulo: "Custo total por unidade (R$)", esperado: 14, explicacao: "6 + 8 = 14." },
      ],
    }),
    escolha({
      id: "conclusao",
      titulo: "O que a diluição ensina",
      instrucao: "Quando a produção aumenta e os custos fixos permanecem os mesmos, o que acontece com o custo fixo por unidade?",
      opcoes: ["Aumenta.", "Diminui, porque é dividido por mais unidades.", "Fica igual.", "Desaparece."],
      correta: 1,
      explicacao: "É o ganho de escala: mais unidades dividem o mesmo custo fixo, e o custo unitário cai.",
    }),
    escolha({
      id: "semivariavel",
      titulo: "Custo semivariável",
      cenario: "A conta de energia tem um valor mínimo mensal fixo e um valor que cresce com o consumo.",
      instrucao: "Esse custo é chamado de...",
      opcoes: ["Semivariável (misto).", "Direto.", "Perda.", "Investimento."],
      correta: 0,
      explicacao: "Custos mistos têm uma parte fixa e uma parte variável, e podem ser separados na análise.",
    }),
  ],
};

export default atividade;
