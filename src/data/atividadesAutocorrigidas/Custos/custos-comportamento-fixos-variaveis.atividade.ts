import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, planilha, dissertativa } from "../ajudantes";

const HISTORICO = [
  ["Janeiro", 800, 14400],
  ["Fevereiro", 1000, 16000],
  ["Março", 1200, 17600],
  ["Abril", 1500, 20000],
  ["Maio", 900, 15200],
];
const CV_UNIT = (20000 - 14400) / (1500 - 800);
const CF = 14400 - CV_UNIT * 800;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Comportamento dos Custos de Produção",
  introducao:
    "Alguns custos não mudam quando a produção cresce; outros crescem junto. Entender esse comportamento é a base para decidir preços e metas. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    planilha({
      id: "separar-custos",
      titulo: "Planilha: histórico de produção e custo total",
      cenario: "A fábrica de camisetas registrou a produção e o custo total de cinco meses. Pelo método do ponto alto-ponto baixo, o custo variável unitário é (custo do maior volume − custo do menor volume) ÷ (maior volume − menor volume), e o custo fixo é o que sobra. Cole a planilha no Excel e resolva.",
      colunas: ["Mês", "Produção (unidades)", "Custo total (R$)"],
      linhas: HISTORICO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "cv", rotulo: "Custo variável por unidade (R$)", valor: CV_UNIT, explicacao: "(20.000 − 14.400) ÷ (1.500 − 800) = 8." },
        { id: "cf", rotulo: "Custo fixo mensal (R$)", valor: CF, explicacao: "14.400 − 8 × 800 = 8.000." },
        { id: "previsto", rotulo: "Custo total previsto para 1.800 unidades (R$)", valor: CF + CV_UNIT * 1800, explicacao: "8.000 + 8 × 1.800 = 22.400." },
        { id: "unitario", rotulo: "Custo total por unidade em 1.800 unidades (R$)", valor: (CF + CV_UNIT * 1800) / 1800, explicacao: "22.400 ÷ 1.800 ≈ 12,44." },
      ],
    }),
    dissertativa({
      id: "escala-e-risco",
      titulo: "Escala, diluição e risco",
      instrucao: "Usando os números da planilha, explique o que acontece com o custo por unidade quando a produção cresce e quais riscos existem em ter muitos custos fixos.",
      deve: [
        "Compare o custo por unidade de janeiro com o de abril e explique a diluição do custo fixo.",
        "Diga o que acontece se a produção cair abaixo do volume atual.",
        "Cite uma forma de transformar parte dos custos fixos em variáveis e quando isso compensa.",
      ],
      chave: /(dilu|fixo|vari[aá]vel|escala|unidade|produ[cç][aã]o|risco|queda)/i,
    }),
  ],
};

export default atividade;
