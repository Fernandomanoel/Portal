import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "textos-apresentacoes",
  titulo: "Apresentações — Falar de Si e do Trabalho",
  descricao: "3 apresentações para ouvir e ler: o primeiro dia numa turma nova, o “fale sobre você” da entrevista de emprego e um colega novo chegando ao time.",
  nivel: "Básico",
  trilha: "textos",
  cor: "#4338ca",
  abertura: {
    titulo: "Prazer, eu sou...",
    texto: "Se apresentar em inglês é das primeiras coisas que você vai precisar. Ouça três pessoas se apresentando em situações diferentes e repare no que cada uma conta: de onde é, o que faz, do que gosta. Depois eu pergunto o que você entendeu.",
  },
  conteudo: {
    tipo: "textos",
    textos: [
      {
        titulo: "Primeiro dia na turma",
        quem: "A Julia se apresenta para a turma no primeiro dia de um curso de inglês.",
        tipo: "apresentacao",
        paragrafos: [
          {
            en: "Hi everyone! My name is Julia, and I'm twenty-two years old. I'm from Campinas, in Brazil, but now I live in São Paulo.",
            pt: "Oi, pessoal! Meu nome é Julia e tenho vinte e dois anos. Sou de Campinas, no Brasil, mas agora moro em São Paulo.",
          },
          {
            en: "I work as a receptionist at a hotel, so I talk to tourists every day. That's why I want to improve my English.",
            pt: "Trabalho como recepcionista num hotel, então falo com turistas todos os dias. É por isso que quero melhorar meu inglês.",
          },
          {
            en: "In my free time, I like cooking, watching series, and going to the park with my dog, Thor. Nice to meet you all!",
            pt: "No tempo livre, gosto de cozinhar, assistir a séries e ir ao parque com meu cachorro, o Thor. Prazer em conhecer vocês!",
          },
        ],
        vocabulario: [
          { en: "years old", pt: "anos (de idade)" },
          { en: "I'm from", pt: "sou de" },
          { en: "receptionist", pt: "recepcionista" },
          { en: "improve", pt: "melhorar" },
          { en: "free time", pt: "tempo livre" },
          { en: "nice to meet you", pt: "prazer em conhecer" },
        ],
        perguntas: [
          {
            pergunta: "Onde a Julia mora agora?",
            opcoes: ["Em São Paulo.", "Em Campinas.", "Num hotel."],
            resposta: 0,
            explicacao: "“I'm from Campinas... but now I live in São Paulo.” Ela é de Campinas e mora em São Paulo.",
          },
          {
            pergunta: "Por que ela quer melhorar o inglês?",
            opcoes: ["Porque fala com turistas no trabalho.", "Porque vai morar fora.", "Porque vai fazer uma prova."],
            resposta: 0,
            explicacao: "“I talk to tourists every day. That's why I want to improve my English.”",
          },
          {
            pergunta: "Quem é o Thor?",
            opcoes: ["O cachorro dela.", "O irmão dela.", "O chefe dela."],
            resposta: 0,
            explicacao: "“going to the park with my dog, Thor”.",
          },
        ],
      },
      {
        titulo: "Entrevista de emprego",
        quem: "O Diego responde à pergunta “Tell me about yourself” numa entrevista para uma vaga de suporte técnico.",
        tipo: "apresentacao",
        paragrafos: [
          {
            en: "Sure. I'm Diego, and I've been working in IT support for three years. Right now, I work at a small company where I help about fifty employees with their computers and printers.",
            pt: "Claro. Sou o Diego e trabalho com suporte de TI há três anos. Hoje trabalho numa empresa pequena, onde ajudo uns cinquenta funcionários com computadores e impressoras.",
          },
          {
            en: "I'm good at solving problems and explaining technical things in a simple way. Last year, I created a step-by-step guide that reduced the number of help requests by thirty percent.",
            pt: "Sou bom em resolver problemas e em explicar coisas técnicas de um jeito simples. No ano passado, criei um guia passo a passo que diminuiu os pedidos de ajuda em trinta por cento.",
          },
          {
            en: "I'm looking for a bigger company where I can keep learning, especially about networks and security. I think this position is a great fit for me.",
            pt: "Estou procurando uma empresa maior, onde eu possa continuar aprendendo, principalmente sobre redes e segurança. Acho que esta vaga combina muito comigo.",
          },
        ],
        vocabulario: [
          { en: "IT support", pt: "suporte de TI" },
          { en: "employees", pt: "funcionários" },
          { en: "solving problems", pt: "resolver problemas" },
          { en: "step-by-step guide", pt: "guia passo a passo" },
          { en: "help requests", pt: "pedidos de ajuda" },
          { en: "position", pt: "vaga" },
          { en: "a great fit", pt: "combina muito" },
        ],
        perguntas: [
          {
            pergunta: "Há quanto tempo o Diego trabalha com suporte de TI?",
            opcoes: ["Três anos.", "Cinquenta anos.", "Um ano."],
            resposta: 0,
            explicacao: "“I've been working in IT support for three years”. Cinquenta é o número de funcionários que ele atende.",
          },
          {
            pergunta: "Que resultado ele dá como exemplo?",
            opcoes: ["Um guia que reduziu os pedidos de ajuda em 30%.", "Ele consertou cinquenta impressoras.", "Ele virou gerente da empresa."],
            resposta: 0,
            explicacao: "“a step-by-step guide that reduced the number of help requests by thirty percent”.",
          },
          {
            pergunta: "Por que ele quer mudar de empresa?",
            opcoes: ["Quer uma empresa maior para continuar aprendendo.", "Quer trabalhar menos.", "Não gosta de computadores."],
            resposta: 0,
            explicacao: "“I'm looking for a bigger company where I can keep learning”.",
          },
        ],
      },
      {
        titulo: "Um colega novo no time",
        quem: "Numa reunião, a Priya apresenta um colega novo para o time.",
        tipo: "apresentacao",
        paragrafos: [
          {
            en: "Hey team, before we start, I'd like you to meet Kenji. He's joining us from the Tokyo office and will be working with us on the new app.",
            pt: "Oi, time, antes de começar, quero apresentar o Kenji. Ele está vindo do escritório de Tóquio e vai trabalhar com a gente no aplicativo novo.",
          },
          {
            en: "Kenji is a designer, and he's amazing at making screens easy to use. He speaks Japanese and English, and he's learning Portuguese too.",
            pt: "O Kenji é designer e é ótimo em deixar as telas fáceis de usar. Ele fala japonês e inglês, e está aprendendo português também.",
          },
          {
            en: "He'll sit next to Carlos for the first few weeks, so please make him feel at home. Welcome, Kenji!",
            pt: "Ele vai sentar ao lado do Carlos nas primeiras semanas, então, por favor, façam ele se sentir em casa. Bem-vindo, Kenji!",
          },
        ],
        vocabulario: [
          { en: "I'd like you to meet", pt: "quero apresentar" },
          { en: "joining us", pt: "vindo trabalhar com a gente" },
          { en: "easy to use", pt: "fácil de usar" },
          { en: "next to", pt: "ao lado de" },
          { en: "feel at home", pt: "sentir-se em casa" },
        ],
        perguntas: [
          {
            pergunta: "De onde o Kenji está vindo?",
            opcoes: ["Do escritório de Tóquio.", "De uma universidade.", "Do time do Carlos."],
            resposta: 0,
            explicacao: "“He's joining us from the Tokyo office”.",
          },
          {
            pergunta: "Qual é o trabalho do Kenji?",
            opcoes: ["Designer.", "Programador.", "Gerente."],
            resposta: 0,
            explicacao: "“Kenji is a designer”.",
          },
          {
            pergunta: "“Make him feel at home” pede para o time:",
            opcoes: ["Receber bem o Kenji.", "Levar o Kenji para casa.", "Deixar o Kenji trabalhar de casa."],
            resposta: 0,
            explicacao: "feel at home = sentir-se à vontade, bem recebido.",
          },
        ],
      },
    ],
  },
};

export default atividade;
