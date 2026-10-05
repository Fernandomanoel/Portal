import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const BORDERO = [
  ["Duplicata 101", 12000, 30],
  ["Duplicata 102", 8500, 45],
  ["Duplicata 103", 15000, 60],
  ["Duplicata 104", 6200, 90],
  ["Duplicata 105", 9800, 20],
];
const TAXA_MES = 0.025;
const DESCONTO = (l: (string | number)[]) => (l[1] as number) * TAXA_MES * ((l[2] as number) / 30);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Antecipação de Recebíveis, Factoring e Banco",
  introducao:
    "Antecipar recebíveis transforma uma venda a prazo em dinheiro hoje, mas com um custo. Calcule o desconto, descubra a taxa real do período e compare as duas fontes de antecipação. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "conceito",
      titulo: "O que é antecipar recebíveis",
      instrucao: "O que a empresa faz ao antecipar um recebível?",
      opcoes: [
        "Cobra o cliente antes da data, sem custo.",
        "Recebe hoje, com desconto, um valor que só seria pago no vencimento.",
        "Perdoa a dívida do cliente.",
        "Aumenta o prazo de pagamento do cliente.",
      ],
      correta: 1,
      explicacao: "A empresa troca prazo por caixa: recebe antes e paga por isso, na forma de desconto.",
    }),
    calculos({
      id: "desconto",
      titulo: "Desconto de duplicata",
      cenario: "Uma duplicata de R$ 10.000,00 vence em 60 dias. A empresa a antecipa com desconto simples de 3% ao mês.",
      instrucao: "Calcule o desconto e o valor líquido recebido hoje.",
      campos: [
        { id: "desconto", rotulo: "Desconto (R$)", esperado: 600, explicacao: "10.000 × 0,03 × 2 meses = 600." },
        { id: "liquido", rotulo: "Valor líquido (R$)", esperado: 9400, explicacao: "10.000 − 600 = 9.400." },
      ],
    }),
    calculos({
      id: "taxa-real",
      titulo: "A taxa real da operação",
      cenario: "Na operação anterior, a empresa recebeu R$ 9.400,00 hoje para pagar R$ 10.000,00 em 60 dias, em um custo de R$ 600,00.",
      instrucao: "Qual foi a taxa efetiva do período, em % (custo ÷ valor recebido)?",
      campos: [{ id: "taxa", rotulo: "Taxa efetiva em 60 dias (%)", esperado: 6.38, explicacao: "600 ÷ 9.400 = 0,0638, ou 6,38% em dois meses, maior que os 6% da taxa «de desconto» nominal." }],
    }),
    resposta({
      id: "quando-vale",
      titulo: "Quando vale a pena antecipar",
      instrucao: "Explique em que situação a antecipação de recebíveis vale a pena para uma empresa.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: Quando a taxa é menor que a das alternativas, como cheque especial, e o caixa faltaria...",
      chave: /(taxa|custo|caixa|alternativ|juros|empr[eé]stimo|cheque)/i,
    }),
    planilha({
      id: "bordero",
      titulo: "Planilha: borderô de duplicatas para antecipar",
      cenario: "A empresa quer antecipar cinco duplicatas com o banco, que cobra desconto simples de 2,5% ao mês, proporcional aos dias até o vencimento (desconto = valor × 2,5% × dias ÷ 30). Cole a planilha no Excel e crie as colunas Desconto e Líquido.",
      colunas: ["Título", "Valor (R$)", "Dias até o vencimento"],
      linhas: BORDERO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "desconto-103", rotulo: "Desconto da Duplicata 103 (R$)", valor: DESCONTO(BORDERO[2]), explicacao: "15.000 × 2,5% × 60 ÷ 30 = 750." },
        { id: "desconto-total", rotulo: "Desconto total do borderô (R$)", valor: somar(BORDERO.map(DESCONTO)), explicacao: "Soma do desconto de cada título." },
        { id: "liquido", rotulo: "Valor líquido que entra no caixa hoje (R$)", valor: somar(BORDERO.map((l) => l[1] as number)) - somar(BORDERO.map(DESCONTO)), explicacao: "Valor de face total menos o desconto total." },
        { id: "custo-medio", rotulo: "Desconto total como % do valor de face", valor: (somar(BORDERO.map(DESCONTO)) / somar(BORDERO.map((l) => l[1] as number))) * 100, explicacao: "Desconto total ÷ valor de face total × 100." },
      ],
    }),
    dissertativa({
      id: "antecipar-ou-nao",
      titulo: "Antecipar ou esperar?",
      instrucao: "Escreva uma recomendação sobre antecipar o borderô, usando o custo calculado.",
      deve: [
        "Diga quanto custa antecipar e o que a empresa ganha em troca (caixa imediato).",
        "Compare com outra fonte de dinheiro (cheque especial, empréstimo, esperar o vencimento).",
        "Indique quais títulos você anteciparia primeiro e quais deixaria para vencer, e por quê.",
      ],
      chave: /(custo|taxa|caixa|compar|empr[eé]stimo|cheque|vencimento|anteci)/i,
    }),
  ],
};

export default atividade;
