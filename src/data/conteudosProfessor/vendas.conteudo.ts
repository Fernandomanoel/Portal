import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Vender é ajudar uma pessoa a resolver um problema com o que a empresa oferece. O curso trata do perfil do vendedor, do atendimento consultivo, da negociação e das objeções, do funil e do CRM e dos números da área comercial: metas, comissões, margem e ticket médio.",
  topicos: [
    {
      titulo: "O vendedor e o atendimento consultivo",
      texto: [
        "O vendedor moderno é um consultor: pergunta, escuta e só depois recomenda. A venda por empurrão perde para a venda que entende o cliente. O atendimento segue etapas: abordagem (criar conexão), sondagem (perguntas para entender a necessidade), apresentação (ligar o produto à necessidade), tratamento de objeções, fechamento e pós-venda.",
        "Características valorizadas: empatia, conhecimento do produto, comunicação clara, persistência educada e ética. Prometer o que não pode cumprir derruba a confiança e gera cancelamento.",
      ],
      pontos: ["Citar as etapas do atendimento.", "Fazer perguntas de sondagem abertas.", "Explicar por que o pós-venda faz parte da venda."],
      erros: ["Falar do produto antes de entender a necessidade.", "Responder objeção discutindo com o cliente."],
      atividades: ["vendas-tecnicas-gestao-vendas", "vendas-tecnicas-linha-de-frente"],
    },
    {
      titulo: "Prospecção, negociação e objeções",
      texto: [
        "Prospectar é buscar clientes potenciais. Na venda para empresas (B2B) o método SPIN Selling organiza as perguntas: Situação (como é hoje), Problema (o que incomoda), Implicação (o que isso custa) e Necessidade de solução (o que mudaria se resolvesse).",
        "Objeção é uma dúvida ou resistência do cliente («está caro», «vou pensar»). Ela costuma esconder uma necessidade de segurança. A resposta passa por ouvir até o fim, reconhecer, esclarecer com fatos e confirmar. Negociar é buscar um acordo bom para as duas partes, sem entregar margem de graça: desconto deve ser trocado por algo (volume maior, pagamento à vista, contrato mais longo).",
      ],
      pontos: ["Aplicar as quatro perguntas do SPIN.", "Responder uma objeção de preço sem baixar o preço de imediato.", "Calcular a margem depois de um desconto."],
      exemplo: "Produto de R$ 1.000 com margem de 30% (R$ 300). Com 10% de desconto o preço cai para R$ 900 e a margem para R$ 200, uma perda de um terço do lucro.",
      erros: ["Dar desconto na primeira objeção.", "Esquecer que o desconto sai do lucro, não do preço de custo."],
      atividades: ["vendas-tecnicas-negociacao-comercial"],
    },
    {
      titulo: "Funil de vendas, CRM e retenção",
      texto: [
        "O funil de vendas organiza os clientes por etapa: contato, qualificação, proposta, negociação e fechamento. Estratégias Inbound atraem o cliente com conteúdo e relacionamento; Outbound busca o cliente com ligação, e-mail e visita.",
        "CRM é o sistema que guarda o histórico do relacionamento (quem é o cliente, o que comprou, quando conversou, o que falta fazer). Ele evita esquecer retornos. Up-selling é oferecer uma versão melhor do mesmo produto; cross-selling, um produto complementar. Reter um cliente costuma custar menos do que conquistar um novo.",
      ],
      pontos: ["Classificar uma oferta como up-selling ou cross-selling.", "Calcular o ticket médio.", "Explicar o que o CRM resolve."],
      exemplo: "Faturamento de R$ 30.000 em 150 vendas: ticket médio de R$ 200.",
      atividades: ["vendas-funil-crm-retencao", "vendas-social-selling-inside-sales"],
    },
    {
      titulo: "Planilha de pedidos e comissões",
      texto: [
        "As atividades de planilha usam a tabela de preços, as metas e os pedidos do mês. Preço por código se busca com PROCV (ou PROCX); o valor do pedido é quantidade × preço; a comissão depende da meta e do percentual de cada vendedor.",
        "Na hora de lançar, os erros comuns são código digitado errado, pedido cancelado que não deve contar e linha repetida. Planilhas boas avisam o erro (validação de dados e formatação condicional) em vez de esconder.",
      ],
      pontos: ["Explicar para que serve o PROCV.", "Conferir um pedido com código inexistente.", "Calcular comissão por faixa de meta."],
      erros: ["Contar pedido cancelado como venda.", "Digitar valores à mão em vez de buscar da tabela de preços."],
      atividades: ["vendas-planilha-comissoes-configurar", "vendas-planilha-comissoes-preencher"],
    },
  ],
  glossario: [
    { termo: "Objeção", definicao: "Dúvida ou resistência do cliente durante a venda." },
    { termo: "Ticket médio", definicao: "Valor médio de cada venda: faturamento ÷ número de vendas." },
    { termo: "Margem", definicao: "Parte do preço que sobra como lucro depois dos custos." },
    { termo: "SPIN Selling", definicao: "Método de perguntas: Situação, Problema, Implicação, Necessidade." },
    { termo: "Cross-selling", definicao: "Venda de um produto complementar ao que o cliente já compra." },
    { termo: "CRM", definicao: "Sistema de gestão do relacionamento com o cliente." },
  ],
  dicas: [
    "Faça role-play: um aluno vende, outro é o cliente com uma objeção sorteada; a turma dá feedback.",
    "Mostre que todo desconto tem conta: peça para calcular a margem antes e depois.",
    "Trabalhe sempre com produtos que o aluno conhece, para ele focar na técnica e não no produto.",
  ],
};

export default conteudo;
