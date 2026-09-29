import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Operador de Telemarketing/
 * prova-operador-de-telemarketing.prova.html): mesmas 10 questões e o
 * mesmo gabarito do HTML original (`const gabarito`/`PRATICAS`). As três
 * questões práticas (8, 9, 10) já eram diálogos/simulações com várias
 * escolhas por natureza no original — viraram uma dissertativa
 * autocorrigida cada aqui, com a ideia central de cada etapa como resposta
 * aceita; o professor confere o restante se a questão cair "a revisar".
 * Mais duas das perguntas objetivas também viraram dissertativa, para
 * fechar a metade.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Operador de Telemarketing",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "Qual atitude melhor representa a empatia no atendimento por telefone?",
      respostasAceitas: [
        "demonstrar compreensão e interesse genuíno pela necessidade e preocupação do cliente",
        "compreensão e interesse genuíno",
      ],
    },
    {
      pergunta: "Sobre a comunicação com o cliente, é correto afirmar que o operador deve:",
      opcoes: [
        "Usar o máximo de termos técnicos possível para parecer mais especializado.",
        "Falar apenas o necessário, mesmo que o cliente fique com dúvidas.",
        "Manter uma comunicação clara e respeitosa, evitando jargões técnicos desnecessários.",
        "Repetir a mesma frase várias vezes até o cliente concordar.",
      ],
      correta: 2,
    },
    {
      pergunta: "Marketing pessoal, no contexto do trabalho do operador de telemarketing, está relacionado a:",
      opcoes: [
        "Fazer propaganda de produtos da empresa nas redes sociais pessoais.",
        "Construir e cuidar da própria imagem e reputação profissional, valorizando suas competências.",
        "Vender produtos pessoais para os colegas de trabalho.",
        "Criar um currículo chamativo, mesmo sem experiência real.",
      ],
      correta: 1,
    },
    {
      pergunta: "Fazer perguntas abertas, escutar atentamente e mostrar que entende o cliente é uma técnica de vendas conhecida como:",
      opcoes: ["Construir Confiança.", "Identificar Necessidades.", "Fechamento Agressivo.", "Quebra de Objeção."],
      correta: 1,
    },
    {
      pergunta: "Explicar como o produto resolve o problema do cliente, usando exemplos e casos de sucesso, é a técnica de:",
      opcoes: ["Construir Confiança.", "Identificar Necessidades.", "Destacar os Benefícios.", "Ignorar Objeções."],
      correta: 2,
    },
    {
      pergunta: "Ser transparente sobre o produto, mostrar conhecimento e oferecer garantias são atitudes que ajudam a:",
      opcoes: [
        "Encerrar a ligação mais rápido.",
        "Construir confiança com o cliente.",
        "Aumentar o valor da venda, independente do interesse do cliente.",
        "Evitar que o cliente faça perguntas.",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Quando o cliente diz \"não sei se preciso disso agora\", qual é a atitude mais adequada?",
      respostasAceitas: [
        "fazer perguntas abertas para entender melhor a real necessidade do cliente antes de continuar",
        "perguntas abertas para entender a necessidade",
      ],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Diálogo de persuasão — você liga oferecendo uma promoção de um kit de beleza. A cliente responde: \"Ah, eu não uso muita maquiagem não...\". " +
        "a) Qual é a melhor forma de continuar a ligação nesse momento? b) A cliente comenta que se interessa por produtos de cuidados com a pele (skincare). Qual a melhor atitude agora?",
      respostasAceitas: [
        "pergunta aberta para entender o que ela realmente usa e valoriza",
        "apresentar produtos de skincare que se encaixem no que ela comentou",
        "skincare",
      ],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Técnicas de vendas aplicadas — numa mesma ligação: a) no início você pergunta sobre a rotina do cliente para entender o que ele precisa; " +
        "b) depois você explica como o produto resolveria o problema dele, citando um caso de outro cliente satisfeito; c) por fim, você garante o " +
        "prazo de troca e devolução caso ele não goste do produto. Identifique a técnica usada em cada etapa (a, b e c).",
      respostasAceitas: [
        "identificar necessidades, destacar os benefícios e construir confiança",
        "identificar necessidades",
        "destacar os benefícios",
        "construir confiança",
      ],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Simulação de atendimento estruturado — o cliente liga: \"comprei um produto pelo site há 5 dias e ainda não recebi atualização sobre a entrega\". " +
        "a) Qual é a atitude correta no início do atendimento? b) Ao consultar o sistema, você vê que o pedido está \"Em transporte\", com previsão de chegada " +
        "em 2 dias — qual a melhor forma de informar isso? c) Como encerrar corretamente o atendimento?",
      respostasAceitas: [
        "solicitar dados do pedido",
        "previsão de chegada em até 2 dias",
        "perguntar se o cliente precisa de mais alguma ajuda, agradecer e registrar o atendimento",
      ],
    },
  ],
};

export default prova;
