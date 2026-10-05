import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Antecipação de Recebíveis, Factoring e Banco",
  introducao:
    "Antecipar recebíveis transforma uma venda a prazo em dinheiro hoje, mas com um custo. Calcule o desconto, descubra a taxa real do período e compare as duas fontes de antecipação.",
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
    escolha({
      id: "factoring-banco",
      titulo: "Factoring e banco",
      instrucao: "Qual afirmação descreve corretamente a diferença entre as duas opções?",
      opcoes: [
        "O factoring é um banco regulado pelo Banco Central.",
        "O banco é uma instituição financeira regulada pelo Banco Central; a empresa de factoring faz fomento mercantil comprando créditos e não é instituição financeira.",
        "Só o banco compra duplicatas.",
        "Não há diferença nenhuma entre elas.",
      ],
      correta: 1,
      explicacao: "Os dois antecipam recebíveis, mas o banco é instituição financeira; o factoring atua como fomento mercantil e presta serviços além do crédito.",
    }),
    escolha({
      id: "comparar-taxa",
      titulo: "Comparando propostas",
      cenario: "A empresa recebeu duas propostas: uma cobra 3,0% ao mês e a outra 3,5% ao mês, mesma operação e prazo.",
      instrucao: "Qual é a melhor escolha, considerando só o custo?",
      opcoes: ["A de 3,5%, pois a taxa maior é mais segura.", "A de 3,0%, pois custa menos para o mesmo prazo.", "Tanto faz.", "Nenhuma das duas."],
      correta: 1,
      explicacao: "Com o mesmo prazo e as mesmas condições, a menor taxa significa menor custo para a empresa.",
    }),
    resposta({
      id: "quando-vale",
      titulo: "Quando vale a pena antecipar",
      instrucao: "Explique em que situação a antecipação de recebíveis vale a pena para uma empresa.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: Quando a taxa é menor que a das alternativas, como cheque especial, e o caixa faltaria...",
      chave: /(taxa|custo|caixa|alternativ|juros|empr[eé]stimo|cheque)/i,
    }),
  ],
};

export default atividade;
