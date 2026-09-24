import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "textos-discursos",
  titulo: "Discursos — Formatura e Boas-vindas",
  descricao: "2 discursos curtos para ouvir e ler parágrafo a parágrafo: uma aluna na formatura e um gerente recebendo funcionários novos.",
  nivel: "Intermediário",
  trilha: "textos",
  cor: "#4338ca",
  abertura: {
    titulo: "Ouça quem está no palco",
    texto: "Discurso tem jeito próprio: agradece, conta uma história e fecha com uma mensagem. Ouça o discurso inteiro ou parágrafo por parágrafo, mostre a tradução se precisar e depois responda o que entendeu.",
  },
  conteudo: {
    tipo: "textos",
    textos: [
      {
        titulo: "Discurso de formatura",
        quem: "Laura, aluna escolhida pela turma, fala na cerimônia de formatura de um curso profissionalizante.",
        tipo: "discurso",
        paragrafos: [
          {
            en: "Good evening, teachers, families, and friends. Thank you all for being here tonight. My name is Laura, and I have the honor of speaking for our class.",
            pt: "Boa noite, professores, famílias e amigos. Obrigada a todos por estarem aqui esta noite. Meu nome é Laura e tenho a honra de falar pela nossa turma.",
          },
          {
            en: "A year ago, many of us didn't know how to make a spreadsheet or write a professional email. Some of us were afraid of computers. Today, we are leaving with new skills and a lot more confidence.",
            pt: "Um ano atrás, muitos de nós não sabíamos fazer uma planilha nem escrever um e-mail profissional. Alguns tinham medo de computador. Hoje, saímos com novas habilidades e muito mais confiança.",
          },
          {
            en: "None of this happened alone. We want to thank our teachers for their patience, and our families for their support, especially on the nights we came home tired after work and class.",
            pt: "Nada disso aconteceu sozinho. Queremos agradecer aos professores pela paciência e às nossas famílias pelo apoio, principalmente nas noites em que chegávamos cansados depois do trabalho e da aula.",
          },
          {
            en: "To my classmates: this is not the end. It's the beginning. Keep learning, keep asking questions, and never be afraid to start again. Congratulations to all of us!",
            pt: "Aos meus colegas: isto não é o fim. É o começo. Continuem aprendendo, continuem perguntando e nunca tenham medo de recomeçar. Parabéns a todos nós!",
          },
        ],
        vocabulario: [
          { en: "honor", pt: "honra" },
          { en: "class", pt: "turma" },
          { en: "skills", pt: "habilidades" },
          { en: "confidence", pt: "confiança" },
          { en: "patience", pt: "paciência" },
          { en: "support", pt: "apoio" },
          { en: "classmates", pt: "colegas de turma" },
          { en: "congratulations", pt: "parabéns" },
        ],
        perguntas: [
          {
            pergunta: "Quem a Laura representa no discurso?",
            opcoes: ["A turma de alunos.", "Os professores.", "A direção da escola."],
            resposta: 0,
            explicacao: "“I have the honor of speaking for our class” — ela fala pela turma.",
          },
          {
            pergunta: "Segundo a Laura, o que mudou em um ano?",
            opcoes: ["Os alunos ganharam habilidades e confiança.", "A escola mudou de endereço.", "Os professores ficaram mais rígidos."],
            resposta: 0,
            explicacao: "“Today, we are leaving with new skills and a lot more confidence.”",
          },
          {
            pergunta: "A quem ela agradece pela paciência?",
            opcoes: ["Aos professores.", "Às famílias.", "Aos colegas."],
            resposta: 0,
            explicacao: "“thank our teachers for their patience, and our families for their support” — paciência é dos professores; apoio, das famílias.",
          },
          {
            pergunta: "“This is not the end. It's the beginning.” quer dizer:",
            opcoes: ["A formatura é um começo, não um fim.", "O curso vai ser repetido.", "A festa ainda vai começar."],
            resposta: 0,
            explicacao: "Ela incentiva os colegas a continuar aprendendo depois do curso.",
          },
        ],
      },
      {
        titulo: "Boas-vindas aos funcionários novos",
        quem: "Mark, gerente de RH, dá as boas-vindas a um grupo de funcionários novos no primeiro dia na empresa.",
        tipo: "discurso",
        paragrafos: [
          {
            en: "Good morning, everyone, and welcome to BrightPath! I'm Mark, the HR manager. We're really happy to have you on the team.",
            pt: "Bom dia a todos e bem-vindos à BrightPath! Eu sou o Mark, gerente de RH. Estamos muito felizes de ter vocês na equipe.",
          },
          {
            en: "Today is all about getting to know the company. This morning you'll have a tour of the office and meet your managers. After lunch, the IT team will set up your laptops and email accounts.",
            pt: "Hoje é para conhecer a empresa. De manhã, vocês vão fazer um tour pelo escritório e conhecer seus gestores. Depois do almoço, a equipe de TI vai configurar os notebooks e as contas de e-mail de vocês.",
          },
          {
            en: "A few quick tips: lunch is from twelve to one, the coffee is free, and nobody expects you to know everything in your first week. If you're not sure about something, just ask.",
            pt: "Algumas dicas rápidas: o almoço é do meio-dia à uma, o café é de graça e ninguém espera que vocês saibam tudo na primeira semana. Se estiverem em dúvida sobre algo, é só perguntar.",
          },
          {
            en: "Once again, welcome aboard. We can't wait to see what you'll bring to BrightPath.",
            pt: "Mais uma vez, bem-vindos a bordo. Mal podemos esperar para ver o que vocês vão trazer para a BrightPath.",
          },
        ],
        vocabulario: [
          { en: "HR (human resources)", pt: "RH" },
          { en: "team", pt: "equipe" },
          { en: "tour", pt: "visita guiada" },
          { en: "set up", pt: "configurar" },
          { en: "tips", pt: "dicas" },
          { en: "free", pt: "de graça" },
          { en: "welcome aboard", pt: "bem-vindo à equipe" },
          { en: "can't wait", pt: "mal posso esperar" },
        ],
        perguntas: [
          {
            pergunta: "O que acontece depois do almoço?",
            opcoes: ["A equipe de TI configura os notebooks e e-mails.", "Um tour pelo escritório.", "Uma reunião com o presidente."],
            resposta: 0,
            explicacao: "“After lunch, the IT team will set up your laptops and email accounts.” O tour é de manhã.",
          },
          {
            pergunta: "Qual é o horário de almoço?",
            opcoes: ["Do meio-dia à uma.", "Das 11h às 12h.", "Das 13h às 14h."],
            resposta: 0,
            explicacao: "“lunch is from twelve to one”.",
          },
          {
            pergunta: "O que o Mark diz sobre a primeira semana?",
            opcoes: ["Ninguém espera que eles saibam tudo.", "Eles vão trabalhar até tarde.", "Eles vão fazer uma prova."],
            resposta: 0,
            explicacao: "“nobody expects you to know everything in your first week. If you're not sure about something, just ask.”",
          },
          {
            pergunta: "No trabalho, “welcome aboard” quer dizer:",
            opcoes: ["Bem-vindos à equipe.", "Bem-vindos ao navio.", "Boa viagem."],
            resposta: 0,
            explicacao: "Ao pé da letra é “bem-vindo a bordo”, mas no trabalho significa bem-vindo à equipe.",
          },
        ],
      },
    ],
  },
};

export default atividade;
