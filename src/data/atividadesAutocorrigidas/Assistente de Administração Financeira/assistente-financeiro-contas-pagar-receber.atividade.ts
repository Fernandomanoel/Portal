import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculo, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Administração Financeira — Contas a Pagar e a Receber",
  introducao:
    "O dia a dia do assistente financeiro gira em torno do que a empresa deve pagar e do que tem a receber. Pratique o fluxo de pagamento, o cálculo de atraso e a leitura de uma carteira de recebíveis.",
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
    escolha({
      id: "prioridade-cobranca",
      titulo: "Quem cobrar primeiro",
      instrucao: "Na tabela anterior, qual cliente merece a ação de cobrança mais urgente?",
      opcoes: ["Cliente A, por ter o maior valor.", "Cliente B.", "Cliente C, pelo valor alto e pelo maior atraso.", "Cliente D."],
      correta: 2,
      explicacao: "Valor alto e 40 dias de atraso combinam risco e impacto no caixa: é o primeiro a ser contatado.",
    }),
    escolha({
      id: "baixa",
      titulo: "O que é dar baixa",
      instrucao: "O que significa dar baixa em um título de contas a receber?",
      opcoes: [
        "Cancelar a venda.",
        "Registrar que o título foi liquidado, retirando-o da lista de valores em aberto.",
        "Reduzir o preço para o cliente.",
        "Enviar o título para cobrança judicial.",
      ],
      correta: 1,
      explicacao: "A baixa registra o recebimento e mantém o saldo de contas a receber correto.",
    }),
    resposta({
      id: "conferir-antes",
      titulo: "Conferir antes de pagar",
      instrucao: "Explique por que nunca se deve pagar uma nota sem conferir o pedido ou contrato.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: Para não pagar algo que não foi entregue, valor diferente ou duplicado...",
      chave: /(confer|pedido|contrato|duplic|valor|entreg|fraude|erro)/i,
    }),
  ],
};

export default atividade;
