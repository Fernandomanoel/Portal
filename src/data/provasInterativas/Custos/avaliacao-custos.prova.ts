import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Custos/prova-custos.prova.html):
 * mesmas 10 questões e o mesmo gabarito do HTML original (`const
 * gabarito`/`PRATICAS`). As duas questões práticas (9, 10) já eram
 * dissertativas por natureza no original — viraram dissertativa
 * autocorrigida aqui, com a decisão final (a parte expressável como frase
 * curta) como resposta aceita; o cálculo em si o professor confere se a
 * questão cair "a revisar". Mais três das perguntas objetivas também
 * viraram dissertativa, para fechar a metade.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Custos",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "O que caracteriza um custo fixo?",
      respostasAceitas: [
        "permanecem praticamente os mesmos independentemente do volume",
        "não variam com o volume de produção ou vendas",
      ],
    },
    {
      pergunta: "Qual das opções abaixo é um exemplo de custo variável em uma lanchonete?",
      opcoes: [
        "O aluguel do ponto comercial",
        "O salário fixo do gerente",
        "A matéria-prima usada para preparar os lanches vendidos",
        "O seguro do estabelecimento",
      ],
      correta: 2,
    },
    {
      pergunta: "Qual a diferença entre custo direto e custo indireto?",
      opcoes: [
        "O custo direto pode ser identificado e apropriado diretamente a um produto específico; o indireto precisa de um critério de rateio entre produtos.",
        "O custo direto é sempre variável e o indireto é sempre fixo.",
        "Não existe diferença prática entre os dois, são sinônimos.",
        "O custo indireto é o que aparece na nota fiscal do fornecedor.",
      ],
      correta: 0,
    },
    {
      pergunta: "Uma empresa tem custo fixo total de R$ 1.800,00 e custo variável de R$ 3,00 por unidade. Produzindo 200 unidades, qual é o custo total?",
      opcoes: ["R$ 1.800,00", "R$ 2.000,00", "R$ 2.200,00", "R$ 2.400,00"],
      correta: 3,
    },
    {
      tipo: "dissertativa",
      pergunta: "Como se calcula a margem de contribuição unitária de um produto?",
      respostasAceitas: [
        "preço de venda menos o custo variável unitário",
        "preço de venda - custo variável unitário",
      ],
    },
    {
      pergunta: "Um produto é vendido por R$ 50,00 e tem custo variável de R$ 35,00. Qual a margem de contribuição percentual?",
      opcoes: ["15%", "20%", "30%", "70%"],
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que representa o ponto de equilíbrio (break-even point) de uma empresa?",
      respostasAceitas: [
        "quantidade mínima que a empresa precisa vender para que a receita cubra todos os custos",
        "receita cobre os custos, sem lucro nem prejuízo",
      ],
    },
    {
      pergunta: "Na formação de preço de venda, o que deve ser considerado além do custo do produto?",
      opcoes: [
        "Apenas o custo de produção, o resto é lucro",
        "Considerar o custo do produto, a margem de contribuição desejada e as despesas, além do preço praticado no mercado",
        "Somente o preço que a concorrência cobra, sem olhar o próprio custo",
        "Apenas a opinião do dono sobre quanto o produto \"vale\"",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Custo total da operação — Lanchonete da Ana tem aluguel de R$ 800,00 (fixo) e salário de R$ 1.200,00 (fixo), além de ingredientes de R$ 600,00 (variável) e embalagens de R$ 150,00 (variável) no mês. Calcule o total de custos fixos, o total de custos variáveis, e diga o que acontece com os custos fixos se as vendas dobrarem no mês seguinte.",
      respostasAceitas: [
        "permanecem praticamente os mesmos, pois não dependem diretamente do volume vendido",
        "não dependem diretamente do volume vendido",
      ],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Margem de contribuição e precificação — um combo é vendido por R$ 50,00 com custo variável de R$ 30,00. Calcule a margem de contribuição unitária e a margem percentual. Se o custo variável subir para R$ 38,00 e o preço continuar R$ 50,00, qual ação NÃO ajuda a recuperar a margem?",
      respostasAceitas: [
        "manter o preço de venda igual e ignorar o aumento do custo",
        "ignorar o aumento do custo",
      ],
    },
  ],
};

export default prova;
