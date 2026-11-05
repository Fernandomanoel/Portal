import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O assistente financeiro cuida do dinheiro que entra e sai da empresa: contas a pagar e a receber, fluxo de caixa, conciliação bancária, orçamento, juros e crédito. O curso ensina o vocabulário, os cálculos (porcentagem e juros) e as rotinas, com planilhas.",
  topicos: [
    {
      titulo: "O papel da área financeira",
      texto: [
        "A administração financeira garante que a empresa tenha dinheiro para operar (liquidez), gere lucro (rentabilidade) e use bem seus recursos. O assistente executa a rotina: confere documentos, paga, recebe, concilia, lança e informa saldos.",
        "Três decisões se repetem: onde captar recursos (financiamento), onde aplicar (investimento) e como usar o caixa no dia a dia.",
      ],
      pontos: ["Explicar liquidez e rentabilidade.", "Descrever as tarefas do assistente financeiro."],
      atividades: ["assistente-financeiro-papel-e-evolucao"],
    },
    {
      titulo: "Orçamento e porcentagem",
      texto: [
        "O orçamento é a previsão de receitas e despesas de um período; depois compara-se com o realizado para ver as diferenças. Porcentagem é o cálculo mais usado: desconto, acréscimo, comissão, imposto e margem. Para achar uma parte: valor × porcentagem ÷ 100. Para um acréscimo: valor × (1 + taxa). Para um desconto: valor × (1 − taxa).",
      ],
      pontos: ["Calcular desconto, acréscimo e comissão.", "Comparar orçado e realizado."],
      exemplo: "Conta de R$ 800 com 5% de desconto: 800 × 0,95 = R$ 760. Multa de 2% sobre R$ 800: R$ 16.",
      erros: ["Aplicar 10% de desconto e depois 10% de acréscimo e esperar voltar ao valor inicial."],
      atividades: ["assistente-financeiro-planilhas-orcamentarias", "assistente-financeiro-porcentagem"],
    },
    {
      titulo: "Juros e capitalização",
      texto: [
        "Juros são o preço do dinheiro no tempo. Nos juros simples a taxa incide sempre sobre o valor inicial: J = C × i × n. Nos juros compostos os juros de cada período entram na base do seguinte: M = C × (1 + i)^n. O comércio e os bancos usam, em geral, juros compostos.",
        "Taxa nominal é a anunciada; a efetiva é a que realmente se paga, considerando a capitalização.",
      ],
      pontos: ["Calcular juros simples e montante em juros compostos.", "Dizer por que juros compostos pesam mais no longo prazo."],
      exemplo: "R$ 1.000 a 2% ao mês por 3 meses: simples = R$ 1.060; compostos = 1.000 × 1,02³ ≈ R$ 1.061,21.",
      atividades: ["assistente-financeiro-juros-capitalizacao"],
    },
    {
      titulo: "Contas a pagar e a receber",
      texto: [
        "Contas a pagar são as obrigações (fornecedores, impostos, salários); contas a receber, os valores que clientes devem à empresa. A rotina confere o documento, a autorização e o vencimento, programa o pagamento e dá baixa. Pagar com atraso gera multa e juros, e receber com atraso exige cobrança.",
        "O fluxo de caixa projeta as entradas e saídas em um período e mostra o saldo final de cada dia, para evitar ficar sem dinheiro.",
      ],
      pontos: ["Programar pagamentos por vencimento.", "Montar um fluxo de caixa simples."],
      atividades: ["assistente-financeiro-contas-pagar-receber", "assistente-financeiro-planilha-fluxo-caixa-configurar"],
    },
    {
      titulo: "Conciliação bancária e cartão",
      texto: [
        "Conciliar é conferir se o controle interno da empresa (razão ou sistema) bate com o extrato do banco. Diferenças comuns: cheques emitidos e ainda não compensados, depósitos em trânsito, tarifas debitadas pelo banco e erros de lançamento. Após conciliar, o saldo ajustado do banco e o da empresa devem ser iguais.",
        "Na fatura de cartão, confere-se compra por compra, parcelas e encargos, para identificar lançamentos indevidos.",
      ],
      pontos: ["Listar causas de diferença entre extrato e sistema.", "Chegar ao saldo ajustado."],
      atividades: ["assistente-financeiro-conciliacao-bancaria-cartao", "assistente-financeiro-planilha-conciliacao-preencher"],
    },
    {
      titulo: "Antecipação de recebíveis, empréstimos e segurança",
      texto: [
        "Antecipar recebíveis transforma uma venda a prazo em dinheiro agora, com um desconto (o custo). Pode ser feito em banco ou factoring. Empréstimo costuma ser livre; financiamento é destinado a um bem ou projeto específico, muitas vezes com garantia. Comparar propostas exige olhar o custo efetivo total, e não só a taxa.",
        "Segurança da informação: senhas fortes, desconfiar de e-mails e boletos suspeitos, conferir dados bancários por canal oficial e limitar acessos.",
      ],
      pontos: ["Calcular o custo de uma antecipação.", "Reconhecer sinais de golpe em boleto ou e-mail."],
      atividades: ["assistente-financeiro-antecipacao-recebiveis", "assistente-financeiro-emprestimos-seguranca"],
    },
  ],
  glossario: [
    { termo: "Fluxo de caixa", definicao: "Registro e projeção das entradas e saídas de dinheiro." },
    { termo: "Conciliação", definicao: "Conferência entre os registros internos e o extrato do banco." },
    { termo: "Liquidez", definicao: "Facilidade de transformar bens em dinheiro e pagar as contas." },
    { termo: "Montante", definicao: "Capital mais juros." },
    { termo: "Factoring", definicao: "Empresa que compra créditos a receber mediante desconto." },
    { termo: "CET", definicao: "Custo efetivo total de um empréstimo, com todos os encargos." },
  ],
  dicas: [
    "Peça que o aluno confira sempre o valor, o vencimento e o beneficiário antes de «pagar» na simulação.",
    "Use contas do dia a dia (cartão, financiamento de celular) para falar de juros: o aluno se interessa.",
    "Revise a regra de porcentagem várias vezes; é a base de quase tudo no curso.",
  ],
};

export default conteudo;
