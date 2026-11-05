import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Contabilidade é o registro organizado do que acontece no patrimônio da empresa, para que dê para saber quanto ela tem, quanto deve e se teve lucro. O curso ensina o plano de contas, o método das partidas dobradas (débito e crédito) e a montagem do Balanço Patrimonial e da DRE.",
  topicos: [
    {
      titulo: "Patrimônio e a equação contábil",
      texto: [
        "Patrimônio é o conjunto de bens, direitos e obrigações. Ativo é o que a empresa tem ou tem a receber (dinheiro, estoque, clientes, máquinas). Passivo é o que ela deve a terceiros (fornecedores, impostos, empréstimos). Patrimônio Líquido é o que pertence aos sócios (capital e lucros acumulados).",
        "A equação fundamental: Ativo = Passivo + Patrimônio Líquido. Quando há lucro ou prejuízo no período, o resultado altera o patrimônio dos sócios: Ativo = Passivo + PL + Resultado, antes de o resultado ser levado ao PL.",
      ],
      pontos: ["Classificar uma conta em Ativo, Passivo ou PL.", "Explicar a equação contábil."],
      atividades: ["contabilidade-plano-de-contas"],
    },
    {
      titulo: "Plano de contas: sintética e analítica",
      texto: [
        "O plano de contas é a lista organizada de todas as contas, com número e nome. Conta sintética agrupa e soma as contas de baixo (1.1 Ativo Circulante). Conta analítica é a que recebe lançamentos (1.1.1.02 Contas bancárias). Só se lança em conta analítica.",
        "Os grupos principais: 1 Ativo, 2 Passivo e Patrimônio Líquido e 3 Resultado (receitas, custos e despesas). Circulante é o que vence ou se realiza em até um ano; não circulante, o que vai além.",
      ],
      pontos: ["Aplicar a regra «tem conta embaixo? então é sintética».", "Explicar a diferença entre circulante e não circulante."],
      atividades: ["contabilidade-plano-de-contas"],
    },
    {
      titulo: "Débito, crédito e partidas dobradas",
      texto: [
        "Cada fato contábil mexe em pelo menos duas contas, uma a débito e outra a crédito, pelo mesmo valor. Isso se chama partidas dobradas. Ativo e despesas aumentam a débito e diminuem a crédito; Passivo, Patrimônio Líquido e receitas aumentam a crédito e diminuem a débito. Débito e crédito não significam bom ou ruim, só lados.",
        "Pergunta prática: o que aumentou ou entrou (débito) e o que deu ou passou a dever (crédito)?",
      ],
      pontos: ["Lançar uma compra a prazo, uma venda à vista e um pagamento.", "Dizer em que lado cada tipo de conta aumenta."],
      exemplo: "Compra de mercadoria a prazo por R$ 3.000: débito em Estoque (Ativo aumentou) e crédito em Fornecedores (dívida nova).",
      erros: ["Inverter débito e crédito.", "Esquecer a baixa do estoque (custo) quando há venda."],
      atividades: ["contabilidade-lancamentos-compra-e-venda", "contabilidade-lancamentos-impostos-e-emprestimo", "contabilidade-pratica-livre-banho-e-tosa"],
    },
    {
      titulo: "Receita, custo, despesa e o resultado",
      texto: [
        "Receita é o que a empresa ganha com a atividade; custo é o gasto ligado ao produto vendido (CMV, custo da mercadoria vendida); despesa, os demais gastos do período (aluguel, tarifas, juros). Receita menos custos e despesas dá o resultado: lucro (positivo) ou prejuízo.",
        "Impostos sobre a venda (como o ICMS) são deduções da receita e viram dívida enquanto não são pagos. Pagar o imposto só baixa a dívida, não gera nova despesa.",
      ],
      pontos: ["Calcular o resultado do período.", "Explicar por que o imposto sobre a venda reduz a receita."],
      atividades: ["contabilidade-lancamentos-impostos-e-emprestimo"],
    },
    {
      titulo: "Balanço Patrimonial e DRE",
      texto: [
        "O Balanço Patrimonial é a foto do patrimônio em uma data: Ativo de um lado, Passivo e PL do outro, sempre iguais. A Demonstração do Resultado do Exercício (DRE) é o filme do período: receita bruta, deduções, receita líquida, custos, lucro bruto, despesas e lucro líquido.",
        "O lucro líquido da DRE aparece no Balanço dentro do Patrimônio Líquido. É a ligação entre os dois relatórios.",
      ],
      pontos: ["Montar um balanço simples.", "Calcular lucro bruto e lucro líquido na DRE."],
      atividades: ["contabilidade-balanco-e-dre"],
    },
  ],
  glossario: [
    { termo: "Ativo", definicao: "Bens e direitos da empresa." },
    { termo: "Passivo", definicao: "Obrigações da empresa com terceiros." },
    { termo: "Patrimônio Líquido", definicao: "Parte do ativo que pertence aos sócios." },
    { termo: "Partidas dobradas", definicao: "Todo lançamento tem débito e crédito de mesmo valor." },
    { termo: "CMV", definicao: "Custo da mercadoria vendida." },
    { termo: "DRE", definicao: "Demonstração do Resultado do Exercício." },
  ],
  dicas: [
    "Comece com a ideia, não com as regras: «para onde foi o dinheiro e de onde veio?».",
    "Use sempre a pergunta «o que aumentou? o que deu?» antes de escolher débito e crédito.",
    "Aproveite os OK e Errado da planilha: o erro corrigido na hora ensina mais do que a explicação.",
    "Reforce que Ativo = Passivo + PL + Resultado: é a prova de que o lançamento está certo.",
  ],
};

export default conteudo;
