import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Custos é a área que descobre quanto custa produzir e vender e, a partir daí, decide o preço e o que vale a pena fazer. O curso começa pelo vocabulário (gasto, custo, despesa), passa pelo comportamento dos custos, rateio, custeio padrão e ABC, ponto de equilíbrio, alavancagem e formação de preço.",
  topicos: [
    {
      titulo: "Gasto, custo, despesa, investimento e perda",
      texto: [
        "Gasto é todo sacrifício de recursos para obter algo. Quando o gasto vira parte do produto, é custo (matéria-prima, mão de obra da fábrica). Quando serve para vender e administrar, é despesa (comissão, aluguel do escritório). Investimento é gasto que dará retorno por vários períodos (uma máquina). Perda é gasto anormal e involuntário (incêndio, desperdício).",
        "A distinção importa porque o custo entra no valor do estoque e só vira resultado quando o produto é vendido; a despesa vai direto ao resultado do período.",
      ],
      pontos: ["Classificar um gasto como custo, despesa, investimento ou perda."],
      exemplo: "O salário do operador da fábrica é custo; o do vendedor é despesa; a compra de uma máquina nova é investimento.",
      erros: ["Chamar tudo de «custo»."],
      atividades: ["custos-nocoes-contabilidade"],
    },
    {
      titulo: "Custos fixos, variáveis, diretos e indiretos",
      texto: [
        "Custo fixo não muda com o volume produzido no período (aluguel da fábrica). Custo variável cresce junto com a produção (matéria-prima). Por outro lado, custo direto se apropria diretamente a um produto (a madeira do móvel); custo indireto serve a vários produtos e precisa ser dividido, ou rateado (a energia da fábrica).",
        "Atenção: o custo fixo total não muda, mas o custo fixo por unidade diminui quando o volume aumenta. É o que torna a produção em escala mais barata por unidade.",
      ],
      pontos: ["Separar custos fixos e variáveis em uma lista.", "Explicar por que o custo fixo por unidade cai com o volume."],
      exemplo: "Aluguel de R$ 6.000: com 1.000 unidades, R$ 6,00 por unidade; com 3.000, R$ 2,00.",
      atividades: ["custos-comportamento-fixos-variaveis"],
    },
    {
      titulo: "Rateio, custeio padrão e ideal",
      texto: [
        "Rateio é dividir o custo indireto entre produtos ou departamentos por um critério (horas de máquina, área ocupada, quantidade produzida). O critério deve refletir o que realmente causa o custo.",
        "O custo padrão é a meta de quanto cada unidade deveria custar; compara-se com o custo real e a diferença (variação) mostra onde houve desperdício ou ganho. O padrão ideal supõe condições perfeitas; o padrão corrente considera perdas normais e é mais realista.",
      ],
      pontos: ["Ratear um custo por um critério dado.", "Calcular uma variação entre custo padrão e real."],
      atividades: ["custos-rateio-custos-de-producao", "custos-padrao-e-ideal"],
    },
    {
      titulo: "Centros de custos e custeio ABC",
      texto: [
        "Centro de custos é um setor para o qual se acumulam gastos (produção, manutenção, administração). O custeio ABC (por atividades) parte da ideia de que os produtos consomem atividades e as atividades consomem recursos: cada atividade tem um direcionador (número de pedidos, de inspeções, de preparações de máquina), e o custo da atividade é dividido pelo uso de cada produto.",
        "O ABC costuma mostrar que produtos de baixo volume custam mais do que o rateio simples indicava.",
      ],
      pontos: ["Calcular o custo por unidade do direcionador.", "Explicar por que o ABC é mais preciso que o rateio por volume."],
      atividades: ["custos-centros-e-abc"],
    },
    {
      titulo: "Ponto de equilíbrio e margem de contribuição",
      texto: [
        "Margem de contribuição unitária = preço de venda − custos e despesas variáveis. É o que cada unidade vendida contribui para pagar os custos fixos. O ponto de equilíbrio é a quantidade em que o lucro é zero: ponto de equilíbrio = custos fixos ÷ margem de contribuição unitária.",
        "Acima do ponto de equilíbrio há lucro; abaixo, prejuízo. A análise Custo, Volume e Lucro responde a perguntas como «quantas unidades preciso vender para lucrar R$ 10.000?».",
      ],
      pontos: ["Calcular a margem de contribuição e o ponto de equilíbrio."],
      exemplo: "Preço R$ 50, variáveis R$ 30, fixos R$ 20.000: margem de R$ 20; ponto de equilíbrio = 20.000 ÷ 20 = 1.000 unidades.",
      atividades: ["custos-volume-lucro-e-estoques"],
    },
    {
      titulo: "Alavancagem, preço de venda e markup",
      texto: [
        "Alavancagem operacional mostra o quanto uma variação nas vendas é ampliada no lucro quando há custos fixos altos. Alavancagem financeira faz o mesmo com o uso de dívida. Alavancar aumenta o ganho nos bons tempos e o risco nos ruins.",
        "Markup é o índice aplicado ao custo para formar o preço. Preço de venda = custo ÷ (1 − soma dos percentuais de tributos, comissões, despesas e lucro). Exemplo: custo de R$ 60, tributos de 10%, comissão de 5%, lucro de 15%: preço = 60 ÷ (1 − 0,30) = R$ 85,71.",
      ],
      pontos: ["Calcular um preço de venda pelo markup.", "Explicar o risco de alta alavancagem."],
      erros: ["Somar o percentual ao custo em vez de dividir por (1 − percentuais)."],
      atividades: ["custos-alavancagem-operacional-financeira", "custos-preco-de-venda-markup-resultados"],
    },
  ],
  glossario: [
    { termo: "Custo direto", definicao: "Custo que se apropria diretamente a um produto." },
    { termo: "Custo indireto", definicao: "Custo comum a vários produtos, dividido por rateio." },
    { termo: "Margem de contribuição", definicao: "Preço menos custos e despesas variáveis, por unidade." },
    { termo: "Ponto de equilíbrio", definicao: "Quantidade vendida em que o lucro é zero." },
    { termo: "Markup", definicao: "Índice aplicado ao custo para chegar ao preço de venda." },
    { termo: "Custeio ABC", definicao: "Custeio por atividades, com direcionadores de custo." },
  ],
  dicas: [
    "Use um produto simples (um bolo, uma camiseta) e vá acrescentando conceitos sobre os mesmos números.",
    "Peça que o aluno diga em palavras o que cada resultado significa («preciso vender 1.000 para empatar»).",
    "Dê tempo ao vocabulário: custo, despesa e gasto confundem até gente experiente.",
  ],
};

export default conteudo;
