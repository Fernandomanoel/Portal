import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const FLUXO = [
  [0, -50000, -50000],
  [1, 15000, 28000],
  [2, 18000, 22000],
  [3, 20000, 12000],
  [4, 22000, 8000],
];
const TMA = 0.12;
const vpl = (col: number) => somar(FLUXO.map((l) => (l[col] as number) / (1 + TMA) ** (l[0] as number)));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Matemática Financeira — Investimentos, Fluxo de Caixa, VPL, TIR e Payback",
  introducao:
    "Para decidir se um investimento vale a pena, a empresa projeta o fluxo de caixa e o traz a valor presente. Calcule o saldo de caixa, o VPL e o payback e interprete a TIR. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    calculos({
      id: "fluxo-caixa",
      titulo: "Fluxo de caixa do mês",
      cenario: "Uma loja iniciou o mês com R$ 1.200,00 em caixa. Teve entradas de R$ 8.000,00 e saídas de R$ 5.500,00.",
      instrucao: "Calcule o saldo do período (entradas − saídas) e o saldo final de caixa.",
      campos: [
        { id: "saldo-periodo", rotulo: "Saldo do período (R$)", esperado: 2500, explicacao: "8.000 − 5.500 = 2.500." },
        { id: "saldo-final", rotulo: "Saldo final de caixa (R$)", esperado: 3700, explicacao: "1.200 + 2.500 = 3.700." },
      ],
    }),
    calculos({
      id: "vpl",
      titulo: "Valor presente líquido (VPL)",
      cenario:
        "Um projeto exige investimento de R$ 10.000,00 hoje e traz R$ 6.000,00 ao fim do ano 1 e R$ 6.000,00 ao fim do ano 2. A taxa mínima de atratividade é 10% ao ano. (Use 6.000 ÷ 1,10 ≈ 5.454,55 e 6.000 ÷ 1,21 ≈ 4.958,68.)",
      instrucao: "Calcule o valor presente das entradas e o VPL.",
      campos: [
        { id: "vp-entradas", rotulo: "Valor presente das entradas (R$)", esperado: 10413.23, tolerancia: 0.05, explicacao: "5.454,55 + 4.958,68 = 10.413,23." },
        { id: "vpl", rotulo: "VPL (R$)", esperado: 413.23, tolerancia: 0.05, explicacao: "10.413,23 − 10.000 = 413,23. VPL positivo: o projeto remunera acima da taxa mínima." },
      ],
    }),
    escolha({
      id: "decisao-vpl",
      titulo: "Decidindo pelo VPL",
      instrucao: "Com VPL positivo, qual é a decisão em geral recomendada?",
      opcoes: ["Aceitar o projeto, pois ele cria valor acima do exigido.", "Rejeitar o projeto.", "Esperar sem fazer nada.", "O VPL não serve para decidir."],
      correta: 0,
      explicacao: "VPL positivo: o projeto rende mais do que a taxa mínima exigida; VPL negativo: rende menos.",
    }),
    calculos({
      id: "payback",
      titulo: "Payback simples",
      cenario: "O mesmo projeto investiu R$ 10.000,00 e devolve R$ 6.000,00 por ano.",
      instrucao: "Em quanto tempo o investimento se paga (payback)? Calcule o saldo a recuperar após o ano 1 e o payback em anos.",
      campos: [
        { id: "saldo", rotulo: "Falta recuperar após o ano 1 (R$)", esperado: 4000, explicacao: "10.000 − 6.000 = 4.000." },
        { id: "payback", rotulo: "Payback (anos)", esperado: 1.67, tolerancia: 0.02, explicacao: "1 ano + 4.000 ÷ 6.000 ≈ 1,67 ano (cerca de 1 ano e 8 meses)." },
      ],
    }),
    associar({
      id: "indicadores",
      titulo: "O que cada indicador responde",
      instrucao: "Associe cada indicador à pergunta que ele responde.",
      opcoes: [
        "Quanto valor o projeto cria, em reais de hoje?",
        "Qual taxa de retorno o projeto entrega?",
        "Em quanto tempo recupero o investimento?",
      ],
      linhas: [
        { id: "vpl", rotulo: "VPL", correta: 0 },
        { id: "tir", rotulo: "TIR", correta: 1 },
        { id: "payback", rotulo: "Payback", correta: 2 },
      ],
      explicacao: "Os três se complementam: VPL (valor), TIR (taxa) e payback (tempo e risco de liquidez).",
    }),
    resposta({
      id: "limite-payback",
      titulo: "Limite do payback",
      instrucao: "Explique uma limitação do payback simples como único critério para decidir um investimento.",
      rotulo: "Sua explicação",
      placeholder: "O payback simples ignora o valor do dinheiro no tempo e o que acontece depois de recuperado...",
      chave: /(tempo|valor|ignora|depois|taxa|lucro|futuro|desconta)/i,
    }),
    planilha({
      id: "dois-projetos",
      titulo: "Planilha: fluxo de caixa de dois projetos",
      cenario: "Uma empresa tem dinheiro para um só dos dois projetos. O investimento inicial (ano 0) é o mesmo e a taxa mínima de atratividade é 12% ao ano. VPL = soma de cada fluxo ÷ (1,12)^ano. Cole a planilha no Excel e use a função VPL ou divida cada fluxo pelo fator do ano.",
      colunas: ["Ano", "Projeto A (R$)", "Projeto B (R$)"],
      linhas: FLUXO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "vpl-a", rotulo: "VPL do projeto A (R$)", valor: vpl(1), explicacao: "Soma dos fluxos do projeto A trazidos a valor presente a 12% ao ano.", tolerancia: 1 },
        { id: "vpl-b", rotulo: "VPL do projeto B (R$)", valor: vpl(2), explicacao: "Soma dos fluxos do projeto B trazidos a valor presente a 12% ao ano.", tolerancia: 1 },
        { id: "payback-a", rotulo: "Payback simples do projeto A (anos, com decimais)", valor: 2 + (50000 - 33000) / 20000, explicacao: "Acumulado: 15.000, 33.000, 53.000. Falta 17.000 no ano 3: 2 + 17.000 ÷ 20.000 = 2,85.", tolerancia: 0.02 },
        { id: "payback-b", rotulo: "Payback simples do projeto B (anos)", valor: 2, explicacao: "28.000 + 22.000 = 50.000 já no fim do ano 2.", tolerancia: 0.02 },
      ],
    }),
    dissertativa({
      id: "escolha-do-projeto",
      titulo: "Qual projeto escolher",
      instrucao: "Escreva o parecer que recomenda um dos projetos à diretoria.",
      deve: [
        "Compare o VPL e o payback dos dois projetos e diga se os indicadores apontam para o mesmo projeto.",
        "Explique o que o payback não mostra (valor do dinheiro no tempo e o que vem depois da recuperação).",
        "Cite um risco ou fator qualitativo que poderia mudar a decisão (incerteza das entradas, necessidade de caixa rápido).",
      ],
      chave: /(vpl|payback|tir|projeto|valor presente|risco|caixa|taxa|decis)/i,
      minPalavras: 35,
    }),
  ],
};

export default atividade;
