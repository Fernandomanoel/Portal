import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, planilha, dissertativa, somar } from "../ajudantes";

const VENDAS = [
  ["Ana", 18000, 3],
  ["Bruno", 24500, 4],
  ["Carla", 12800, 3],
  ["Diego", 30200, 5],
  ["Elisa", 9500, 2],
];
const TOTAL_VENDIDO = somar(VENDAS.map((l) => l[1] as number));
const COMISSOES = VENDAS.map((l) => ((l[1] as number) * (l[2] as number)) / 100);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Calculando Porcentagem",
  introducao:
    "A porcentagem aparece em descontos, comissões, impostos e margens. Resolva os cálculos da rotina financeira sem calculadora de atalho: monte a conta e confira. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    calculo({
      id: "porcentagem-de",
      titulo: "Porcentagem de um valor",
      cenario: "Uma venda de R$ 2.400,00 paga 15% de comissão ao vendedor.",
      instrucao: "Qual é o valor da comissão?",
      rotulo: "Comissão (R$)",
      esperado: 360,
      explicacao: "15% de 2.400 = 2.400 × 0,15 = 360.",
    }),
    calculo({
      id: "desconto",
      titulo: "Desconto à vista",
      cenario: "Um fornecedor dá 12% de desconto para pagamento à vista em uma compra de R$ 850,00.",
      instrucao: "Quanto a empresa vai pagar?",
      rotulo: "Valor a pagar (R$)",
      esperado: 748,
      explicacao: "850 × (1 − 0,12) = 850 × 0,88 = 748.",
    }),
    calculo({
      id: "acrescimo",
      titulo: "Reajuste de aluguel",
      cenario: "O aluguel de R$ 1.250,00 recebeu reajuste de 8%.",
      instrucao: "Qual é o novo valor do aluguel?",
      rotulo: "Novo aluguel (R$)",
      esperado: 1350,
      explicacao: "1.250 × 1,08 = 1.350.",
    }),
    calculo({
      id: "variacao",
      titulo: "Variação percentual",
      cenario: "As vendas passaram de R$ 800,00 em março para R$ 1.000,00 em abril.",
      instrucao: "De quantos por cento foi o crescimento?",
      rotulo: "Crescimento (%)",
      esperado: 25,
      explicacao: "(1.000 − 800) ÷ 800 = 0,25, ou 25%.",
    }),
    calculo({
      id: "qual-percentual",
      titulo: "Quanto por cento é",
      cenario: "De um total de R$ 180,00 em despesas, R$ 45,00 foram com transporte.",
      instrucao: "Quantos por cento das despesas foram de transporte?",
      rotulo: "Percentual (%)",
      esperado: 25,
      explicacao: "45 ÷ 180 = 0,25, ou 25%.",
    }),
    calculo({
      id: "aumento-e-desconto",
      titulo: "Aumentar 20% e depois descontar 20%",
      cenario: "Um produto custa R$ 500,00. O preço sobe 20% e, na semana seguinte, recebe 20% de desconto.",
      instrucao: "Qual é o preço final?",
      rotulo: "Preço final (R$)",
      esperado: 480,
      explicacao: "500 × 1,20 = 600 e 600 × 0,80 = 480. Os 20% do desconto incidem sobre um valor maior, por isso não voltam ao preço original.",
    }),
    escolha({
      id: "porcentagem-planilha",
      titulo: "Porcentagem na planilha",
      cenario: "Na célula B2 está o valor 2400 e você quer 15% dele na célula C2.",
      instrucao: "Qual fórmula está correta?",
      opcoes: ["=B2+15", "=B2*15%", "=B2/15", "=15%-B2"],
      correta: 1,
      explicacao: "Na planilha, 15% equivale a 0,15: =B2*15% devolve 360.",
    }),
    planilha({
      id: "comissoes",
      titulo: "Planilha: vendas e comissões do mês",
      cenario: "A equipe comercial fechou o mês com as vendas abaixo, cada vendedor com um percentual de comissão. Cole a planilha no Excel e crie uma coluna Comissão (=B2*C2/100).",
      colunas: ["Vendedor", "Vendas (R$)", "Comissão (%)"],
      linhas: VENDAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "comissao-diego", rotulo: "Comissão do Diego (R$)", valor: COMISSOES[3], explicacao: "30.200 × 5% = 1.510." },
        { id: "total-comissoes", rotulo: "Total de comissões pagas (R$)", valor: somar(COMISSOES), explicacao: "Soma da comissão de cada vendedor." },
        { id: "peso-bruno", rotulo: "Participação do Bruno nas vendas totais (%)", valor: (24500 / TOTAL_VENDIDO) * 100, explicacao: "Vendas do Bruno ÷ total vendido × 100." },
        { id: "custo-comissao", rotulo: "Comissões como % do total vendido", valor: (somar(COMISSOES) / TOTAL_VENDIDO) * 100, explicacao: "Total de comissões ÷ total vendido × 100." },
      ],
    }),
    dissertativa({
      id: "politica-comissao",
      titulo: "Avaliando a política de comissões",
      instrucao: "Com os resultados da planilha, escreva uma avaliação para o gestor sobre a política de comissões.",
      deve: [
        "Diga quanto as comissões custam em relação ao total vendido.",
        "Compare dois vendedores usando a venda e a comissão deles.",
        "Dê uma opinião fundamentada: manter, mudar ou escalonar os percentuais.",
      ],
      chave: /(comiss|percent|%|vend|custo|manter|escalon|meta)/i,
    }),
  ],
};

export default atividade;
