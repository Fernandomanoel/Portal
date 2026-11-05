import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Educação financeira é aprender a lidar bem com o dinheiro no dia a dia: orçamento, consumo consciente, dívidas, crédito, poupança e investimentos, com objetivos e segurança. Valores e taxas mudam, então use sempre referências atuais.",
  topicos: [
    {
      titulo: "Orçamento pessoal e familiar",
      texto: [
        "Orçamento é o registro do que entra (renda) e do que sai (despesas). Separe despesas fixas (aluguel, escola), variáveis (alimentação, lazer) e eventuais (conserto, presente). Uma divisão popular é a regra 50-30-20: cerca de 50% para necessidades, 30% para desejos e 20% para poupança e dívidas, que é só um ponto de partida. O saldo do mês é renda menos despesas.",
      ],
      pontos: ["Montar um orçamento com renda e despesas.", "Distinguir necessidade de desejo."],
      exemplo: "Renda de R$ 3.000: R$ 1.500 para necessidades, R$ 900 para desejos e R$ 600 para poupança.",
    },
    {
      titulo: "Consumo consciente e planejamento de metas",
      texto: [
        "Antes de comprar, pergunte: preciso? cabe no orçamento? comparei preços? Compras por impulso e parcelamentos sem conta pesam. Metas financeiras têm valor, prazo e um plano: para juntar R$ 6.000 em 12 meses, guardam-se R$ 500 por mês.",
      ],
      pontos: ["Transformar um sonho em meta com valor e prazo.", "Aplicar a regra de esperar antes de comprar por impulso."],
    },
    {
      titulo: "Crédito, juros e dívidas",
      texto: [
        "Juros são o preço do dinheiro no tempo. Cartão de crédito rotativo e cheque especial têm juros muito altos. Antes de contrair crédito, compare o custo efetivo total (CET), que inclui todas as tarifas. Se já está endividado: liste as dívidas, priorize as de maior juro, procure renegociar e evite novas dívidas para pagar as antigas.",
      ],
      pontos: ["Explicar por que pagar só o mínimo do cartão é caro.", "Organizar um plano de quitação."],
      erros: ["Comparar parcelas e esquecer o total pago.", "Pagar o mínimo da fatura sem entender o custo."],
    },
    {
      titulo: "Reserva de emergência, poupança e investimentos",
      texto: [
        "A reserva de emergência cobre imprevistos (de 3 a 6 meses de despesas essenciais, como referência) e deve ficar em aplicação segura e de fácil resgate. Investir é colocar o dinheiro para render: renda fixa (títulos públicos, CDB) tem rendimento mais previsível; renda variável (ações, fundos) pode render mais ou perder. Prazo, risco e liquidez devem combinar com o objetivo. Desconfie de promessas de ganho alto e fácil.",
        "Rentabilidades, impostos e produtos mudam: o aluno deve consultar fontes atualizadas.",
      ],
      pontos: ["Explicar reserva de emergência.", "Dar exemplos de risco, prazo e liquidez."],
    },
    {
      titulo: "Golpes e segurança financeira",
      texto: [
        "Golpes comuns: falso atendente de banco, links por mensagem, Pix para falso parente, promessa de lucro fácil (pirâmides). Regras de segurança: nunca informar senha ou código, conferir o destinatário, desconfiar de pressa e usar canais oficiais.",
      ],
      pontos: ["Reconhecer sinais de golpe.", "Dizer o que fazer após cair em golpe (avisar o banco e registrar ocorrência)."],
    },
  ],
  glossario: [
    { termo: "Orçamento", definicao: "Plano das receitas e despesas de um período." },
    { termo: "Reserva de emergência", definicao: "Dinheiro guardado para imprevistos." },
    { termo: "CET", definicao: "Custo efetivo total de um crédito." },
    { termo: "Liquidez", definicao: "Facilidade de transformar o investimento em dinheiro." },
    { termo: "Inflação", definicao: "Aumento geral dos preços." },
    { termo: "Rotativo do cartão", definicao: "Crédito automático quando se paga menos que a fatura." },
  ],
  dicas: [
    "Peça que o aluno monte o próprio orçamento de forma anônima (pode usar valores fictícios).",
    "Evite recomendar produtos de investimento específicos: ensine critérios.",
    "Respeite as diferenças de renda da turma: cuide para nenhum exemplo constranger.",
  ],
};

export default conteudo;
