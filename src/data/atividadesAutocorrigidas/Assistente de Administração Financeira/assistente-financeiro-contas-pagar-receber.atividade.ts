import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const TITULOS = [
  ["Cliente Alfa", 4200, 12],
  ["Cliente Beta", 1800, 35],
  ["Cliente Gama", 950, 5],
  ["Cliente Delta", 6400, 48],
  ["Cliente Épsilon", 2300, 22],
  ["Cliente Zeta", 3100, 70],
];
const ATRASO = (l: (string | number)[]) => l[2] as number;
const MULTA_JUROS = (l: (string | number)[]) => (l[1] as number) * (0.02 + (0.01 / 30) * ATRASO(l));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Contas a Pagar e a Receber",
  introducao:
    "O dia a dia do assistente financeiro gira em torno do que a empresa deve pagar e do que tem a receber. Pratique o fluxo de pagamento, o cálculo de atraso e a leitura de uma carteira de recebíveis. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "fluxo-pagar",
      titulo: "Fluxo de contas a pagar",
      cenario: "O fluxo normal é: receber a nota ou boleto → conferir → aprovar → agendar → pagar → dar baixa e arquivar.",
      instrucao: "O que deve acontecer imediatamente antes de agendar o pagamento?",
      opcoes: [
        "Pagar e depois conferir se estava certo.",
        "A conferência da nota com o pedido e a aprovação do responsável.",
        "Arquivar o comprovante.",
        "Enviar o boleto para o fornecedor.",
      ],
      correta: 1,
      explicacao: "Pagar só depois de conferir o documento com o pedido ou contrato e de ter a aprovação evita pagamentos indevidos e fraudes.",
    }),
    calculos({
      id: "pagamento-atrasado",
      titulo: "Pagamento em atraso",
      cenario:
        "Um boleto de R$ 1.800,00 venceu no dia 10 e foi pago no dia 18. O contrato prevê multa de 2% e juros de mora de 1% ao mês, proporcionais aos dias de atraso (considere o mês de 30 dias).",
      instrucao: "Calcule a multa, os juros e o total pago.",
      campos: [
        { id: "multa", rotulo: "Multa (R$)", esperado: 36, explicacao: "2% de 1.800 = 36." },
        { id: "juros", rotulo: "Juros de mora (R$)", esperado: 4.8, explicacao: "1% ao mês = 1% ÷ 30 por dia; em 8 dias: 1.800 × 0,01 ÷ 30 × 8 = 4,80." },
        { id: "total", rotulo: "Total pago (R$)", esperado: 1840.8, explicacao: "1.800 + 36 + 4,80 = 1.840,80." },
      ],
    }),
    calculo({
      id: "carteira-vencida",
      titulo: "Carteira de contas a receber",
      cenario: "Veja a situação dos clientes na data de hoje.",
      tabela: {
        colunas: ["Cliente", "Valor (R$)", "Situação"],
        linhas: [
          ["Cliente A", "2.500,00", "A vencer"],
          ["Cliente B", "1.200,00", "Vencido há 10 dias"],
          ["Cliente C", "3.800,00", "Vencido há 40 dias"],
          ["Cliente D", "900,00", "Vencido há 5 dias"],
        ],
      },
      instrucao: "Qual é o total vencido?",
      rotulo: "Total vencido (R$)",
      esperado: 5900,
      explicacao: "1.200 + 3.800 + 900 = 5.900. O Cliente A ainda está dentro do prazo.",
    }),
    resposta({
      id: "conferir-antes",
      titulo: "Conferir antes de pagar",
      instrucao: "Explique por que nunca se deve pagar uma nota sem conferir o pedido ou contrato.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: Para não pagar algo que não foi entregue, valor diferente ou duplicado...",
      chave: /(confer|pedido|contrato|duplic|valor|entreg|fraude|erro)/i,
    }),
    planilha({
      id: "aging",
      titulo: "Planilha: títulos vencidos por cliente (aging)",
      cenario: "O contas a receber lista os títulos já vencidos, com os dias de atraso. A política cobra multa de 2% e juros de 1% ao mês, proporcionais aos dias. Cole a planilha no Excel e resolva.",
      colunas: ["Cliente", "Valor (R$)", "Dias de atraso"],
      linhas: TITULOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "total-vencido", rotulo: "Total vencido (R$)", valor: somar(TITULOS.map((l) => l[1] as number)), explicacao: "Soma da coluna Valor." },
        { id: "mais-de-30", rotulo: "Total com mais de 30 dias de atraso (R$)", valor: somar(TITULOS.filter((l) => ATRASO(l) > 30).map((l) => l[1] as number)), explicacao: "Beta, Delta e Zeta passam de 30 dias." },
        { id: "encargos-delta", rotulo: "Multa + juros devidos pelo Cliente Delta (R$)", valor: MULTA_JUROS(TITULOS[3]), explicacao: "6.400 × (2% + 1% ÷ 30 × 48 dias) = 6.400 × 0,036 = 230,40." },
        { id: "percentual-critico", rotulo: "Percentual do total vencido que está há mais de 30 dias (%)", valor: (somar(TITULOS.filter((l) => ATRASO(l) > 30).map((l) => l[1] as number)) / somar(TITULOS.map((l) => l[1] as number))) * 100, explicacao: "Total acima de 30 dias ÷ total vencido × 100." },
      ],
    }),
    dissertativa({
      id: "plano-cobranca",
      titulo: "Plano de cobrança",
      instrucao: "Escreva o plano de cobrança da semana a partir da planilha.",
      deve: [
        "Diga a ordem em que contataria os clientes e justifique (valor e tempo de atraso).",
        "Descreva o tom e o canal de cada contato (lembrete amigável, telefone, notificação).",
        "Explique como registraria o combinado para dar baixa ou renegociar.",
      ],
      chave: /(ordem|prioridade|contato|cobran[cç]a|negoci|prazo|registr|cliente)/i,
    }),
    dissertativa({
      id: "controle-pagamentos",
      titulo: "Evitando pagamento indevido",
      instrucao: "Descreva o passo a passo que você seguiria para pagar um fornecedor com segurança, da chegada do documento à baixa.",
      deve: [
        "Cite a conferência do documento com o pedido ou contrato.",
        "Explique quem aprova e como o pagamento é agendado.",
        "Diga como a baixa e o arquivo do comprovante evitam pagamento em duplicidade.",
      ],
      chave: /(confer|pedido|contrato|aprova|agend|baixa|comprovante|duplic)/i,
    }),
  ],
};

export default atividade;
