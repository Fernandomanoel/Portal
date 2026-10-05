import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const ORCAMENTO = [
  ["Aluguel", 3500, 3500],
  ["Salários e encargos", 7200, 7480],
  ["Energia e água", 650, 790],
  ["Marketing", 1200, 1450],
  ["Material de escritório", 300, 260],
  ["Manutenção", 450, 980],
  ["Outras despesas", 500, 440],
];
const ORCADO = somar(ORCAMENTO.map((l) => l[1] as number));
const REALIZADO = somar(ORCAMENTO.map((l) => l[2] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Construindo Planilhas Orçamentárias",
  introducao:
    "O orçamento é a previsão de receitas e despesas de um período. Monte e leia um orçamento mensal, use as fórmulas de planilha e compare o previsto com o realizado.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "Para que serve o orçamento",
      instrucao: "Qual é a função principal de uma planilha orçamentária?",
      opcoes: [
        "Registrar o que já aconteceu, sem olhar para o futuro.",
        "Prever receitas e despesas de um período para planejar e depois comparar com o que realmente ocorreu.",
        "Substituir o extrato bancário.",
        "Calcular apenas os impostos da empresa.",
      ],
      correta: 1,
      explicacao: "O orçamento é um plano em números: ele orienta as decisões e vira régua para medir o resultado.",
    }),
    calculos({
      id: "orcamento-mensal",
      titulo: "Orçamento de janeiro",
      cenario: "Uma pequena loja prevê, para janeiro, a receita e as despesas da tabela abaixo.",
      tabela: {
        colunas: ["Conta", "Valor previsto (R$)"],
        linhas: [
          ["Receita de vendas", "18.000,00"],
          ["Aluguel", "3.500,00"],
          ["Salários", "7.200,00"],
          ["Energia e água", "650,00"],
          ["Marketing", "1.200,00"],
          ["Outras despesas", "950,00"],
        ],
      },
      instrucao: "Calcule o total das despesas, o resultado previsto (receita menos despesas) e a margem do resultado sobre a receita (em %).",
      campos: [
        { id: "despesas", rotulo: "Total das despesas (R$)", esperado: 13500, explicacao: "3.500 + 7.200 + 650 + 1.200 + 950 = 13.500." },
        { id: "resultado", rotulo: "Resultado previsto (R$)", esperado: 4500, explicacao: "18.000 − 13.500 = 4.500." },
        { id: "margem", rotulo: "Margem sobre a receita (%)", esperado: 25, explicacao: "4.500 ÷ 18.000 = 0,25, ou seja, 25%." },
      ],
    }),
    calculo({
      id: "variacao",
      titulo: "Orçado x realizado",
      cenario: "O total de despesas orçado era R$ 13.500,00, mas as despesas realizadas no mês foram R$ 14.175,00.",
      instrucao: "De quantos por cento foi a variação das despesas em relação ao orçado?",
      rotulo: "Variação (%)",
      esperado: 5,
      explicacao: "A diferença é 675 (14.175 − 13.500) e 675 ÷ 13.500 = 0,05, ou 5% acima do orçado.",
    }),
    resposta({
      id: "por-que-comparar",
      titulo: "Por que comparar orçado e realizado",
      instrucao: "Explique por que o assistente financeiro precisa comparar todo mês o valor orçado com o realizado.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: Para descobrir desvios cedo, entender a causa e corrigir o rumo...",
      chave: /(desvio|diferen|varia|corrig|ajust|control|planej)/i,
    }),
    planilha({
      id: "orcado-realizado",
      titulo: "Planilha: orçado x realizado de janeiro",
      cenario: "O controle do mês traz o valor previsto e o valor gasto de cada despesa. Cole a planilha no Excel e use as fórmulas SOMA e a variação percentual.",
      colunas: ["Despesa", "Orçado (R$)", "Realizado (R$)"],
      linhas: ORCAMENTO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "orcado", rotulo: "Total orçado (R$)", valor: ORCADO, explicacao: "Soma da coluna Orçado." },
        { id: "realizado", rotulo: "Total realizado (R$)", valor: REALIZADO, explicacao: "Soma da coluna Realizado." },
        { id: "variacao-total", rotulo: "Variação do total (%, positivo se gastou mais)", valor: ((REALIZADO - ORCADO) / ORCADO) * 100, explicacao: "(Realizado − Orçado) ÷ Orçado × 100." },
        { id: "variacao-manutencao", rotulo: "Variação da Manutenção (%)", valor: ((980 - 450) / 450) * 100, explicacao: "(980 − 450) ÷ 450 × 100: o maior estouro percentual da tabela." },
      ],
    }),
    dissertativa({
      id: "analise-desvios",
      titulo: "Análise dos desvios",
      instrucao: "Com base na planilha, escreva a análise que o assistente financeiro entregaria sobre o mês.",
      deve: [
        "Diga se o mês fechou acima ou abaixo do orçado e de quanto.",
        "Aponte as duas despesas que mais pesaram no desvio e levante uma causa provável para cada uma.",
        "Sugira uma providência para o mês seguinte.",
      ],
      chave: /(acima|abaixo|desvio|manuten|energia|causa|provid|orç)/i,
    }),
    dissertativa({
      id: "montar-orcamento",
      titulo: "Planeje o orçamento de uma empresa",
      instrucao: "Escolha uma empresa que você conhece (padaria, loja, escritório) e descreva como montaria a planilha orçamentária do ano.",
      deve: [
        "Liste as principais receitas e despesas que entrariam na planilha.",
        "Explique de onde tiraria os valores previstos (histórico, contratos, estimativas).",
        "Diga com que frequência compararia o previsto com o realizado.",
      ],
      chave: /(receita|despesa|hist[oó]rico|previs|mensal|compar|estim)/i,
    }),
  ],
};

export default atividade;
