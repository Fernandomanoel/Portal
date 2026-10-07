import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, planilha, dissertativa } from "../ajudantes";

const OPERACOES = [
  ["Aplicação em CDB", 12000, 14.4, 90],
  ["Empréstimo ao fornecedor", 8000, 24, 150],
  ["Desconto de duplicata", 15000, 30, 60],
  ["Aplicação de curto prazo", 5000, 12, 45],
];
const J = (l: (string | number)[]) => ((l[1] as number) * (l[2] as number) * (l[3] as number)) / 36000;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Juros Simples",
  introducao:
    "No regime de juros simples, a taxa incide sempre sobre o capital inicial. Calcule juros, montantes, taxas e prazos e converta taxas em dias. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    planilha({
      id: "operacoes-juros-simples",
      titulo: "Planilha: quatro operações em juros simples",
      cenario: "Uma empresa tem quatro operações financeiras em juros simples, com taxa ao ano e prazo em dias (ano comercial de 360 dias). Juros = capital × taxa × dias ÷ 360. Cole a planilha no Excel e resolva.",
      colunas: ["Operação", "Capital (R$)", "Taxa ao ano (%)", "Prazo (dias)"],
      linhas: OPERACOES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "juros-cdb", rotulo: "Juros da aplicação em CDB (R$)", valor: J(OPERACOES[0]), explicacao: "12.000 × 14,4% × 90 ÷ 360 = 432." },
        { id: "juros-fornecedor", rotulo: "Juros do empréstimo ao fornecedor (R$)", valor: J(OPERACOES[1]), explicacao: "8.000 × 24% × 150 ÷ 360 = 800." },
        { id: "montante-duplicata", rotulo: "Montante da operação de desconto de duplicata (R$)", valor: 15000 + J(OPERACOES[2]), explicacao: "15.000 + 15.000 × 30% × 60 ÷ 360 = 15.750." },
        { id: "taxa-mensal", rotulo: "Taxa mensal proporcional do empréstimo ao fornecedor (%)", valor: 24 / 12, explicacao: "24% ao ano ÷ 12 = 2% ao mês." },
      ],
    }),
    dissertativa({
      id: "juros-simples-na-pratica",
      titulo: "Onde os juros simples aparecem",
      instrucao: "Explique em que situações do dia a dia de uma empresa os juros simples são usados e quais são seus limites.",
      deve: [
        "Dê dois exemplos de uso de juros simples (como desconto de duplicatas e juros de mora proporcionais).",
        "Explique a conversão entre taxa ao ano, ao mês e ao dia, e a diferença entre ano comercial e ano civil.",
        "Diga por que, em prazos longos, os juros simples deixam de representar bem o que acontece com o dinheiro.",
      ],
      chave: /(simples|desconto|mora|proporcional|ano comercial|360|prazo|composto|dias)/i,
    }),
  ],
};

export default atividade;
