import type { AtividadeIngles } from "@/types/ingles";

// Conteúdo de Portal-Atividades/atividades/paginas/ingles-dialogos-beta.html, sem cortes.
const atividade: AtividadeIngles = {
  slug: "dialogos-1",
  titulo: "Diálogos em Inglês — Converse com a Gabi",
  descricao: "5 conversas com a Gabi (café, trabalho, rua, fim de semana, médico): escolha ou escreva a resposta certa para continuar cada diálogo.",
  nivel: "Básico",
  cor: "#6d28d9",
  abertura: {
    titulo: "Vamos conversar?",
    texto: "Dessa vez a dinâmica é outra: você entra em conversas de verdade com a Gabi — no café, no trabalho, na rua — e escolhe (ou escreve) a resposta certa pra continuar cada diálogo. Em cada fala você ainda pode ouvir de novo, inclusive devagar.",
  },
  conteudo: {
    tipo: "dialogos",
    dialogos: [
      {
        titulo: "No café",
        falas: [
            { gabi: "Hi! What can I get for you today?", traducao: "Oi! O que você vai querer hoje?", tipo: "multipla", opcoes: ["I'd like a coffee, please.","I am from Brazil.","See you tomorrow."], resposta: 0 },
            { gabi: "Would you like anything else?", traducao: "Você gostaria de mais alguma coisa?", tipo: "multipla", opcoes: ["No, thank you. Just the coffee.","It's raining outside.","I live near here."], resposta: 0 },
            { gabi: "That will be five dollars.", traducao: "Vai dar cinco dólares.", tipo: "escrever", respostas: ["here you go","here you are"] },
            { gabi: "Thank you! Have a nice day!", traducao: "Obrigada! Tenha um bom dia!", tipo: "multipla", opcoes: ["You too! Bye!","I don't understand.","Where is the bathroom?"], resposta: 0 },
        ],
      },
      {
        titulo: "Novo colega de trabalho",
        falas: [
            { gabi: "Hi, I'm Gabi. I'm new here.", traducao: "Oi, eu sou a Gabi. Sou nova aqui.", tipo: "multipla", opcoes: ["Nice to meet you! Welcome!","I need some help.","The train leaves at nine."], resposta: 0 },
            { gabi: "Thank you! What do you do here?", traducao: "Obrigada! O que você faz aqui?", tipo: "multipla", opcoes: ["I work in the marketing team.","I live in Brazil.","I am hungry."], resposta: 0 },
            { gabi: "That sounds interesting!", traducao: "Isso parece interessante!", tipo: "multipla", opcoes: ["Thanks! I really enjoy it.","I need some help.","It's near the supermarket."], resposta: 0 },
            { gabi: "Let's have lunch together sometime.", traducao: "Vamos almoçar juntos algum dia.", tipo: "escrever", respostas: ["sounds great","that sounds great"] },
        ],
      },
      {
        titulo: "Pedindo direções",
        falas: [
            { gabi: "Excuse me, can you help me?", traducao: "Com licença, você pode me ajudar?", tipo: "multipla", opcoes: ["Of course! What do you need?","I am fine, thank you.","Nice to meet you."], resposta: 0 },
            { gabi: "Where is the nearest bank?", traducao: "Onde fica o banco mais próximo?", tipo: "multipla", opcoes: ["It's two blocks from here.","It's five dollars.","I have two sisters."], resposta: 0 },
            { gabi: "Is it far from here?", traducao: "É longe daqui?", tipo: "multipla", opcoes: ["No, it's very close.","Yes, I live there.","It's five dollars."], resposta: 0 },
            { gabi: "Thank you so much!", traducao: "Muito obrigada!", tipo: "escrever", respostas: ["you are welcome","youre welcome","you're welcome"] },
        ],
      },
      {
        titulo: "Planos para o fim de semana",
        falas: [
            { gabi: "What are your plans for the weekend?", traducao: "Quais são seus planos para o fim de semana?", tipo: "multipla", opcoes: ["I don't have any plans yet.","I have two brothers.","It's sunny today."], resposta: 0 },
            { gabi: "Do you want to go to the beach?", traducao: "Você quer ir à praia?", tipo: "multipla", opcoes: ["Yes, that sounds great!","I need some help.","Turn left at the corner."], resposta: 0 },
            { gabi: "What time should we meet?", traducao: "Que horas devemos nos encontrar?", tipo: "escrever", respostas: ["lets meet at ten","let's meet at ten"] },
            { gabi: "Perfect! See you then!", traducao: "Perfeito! Até lá!", tipo: "multipla", opcoes: ["See you then! Bye!","I am tired today.","Where is the bathroom?"], resposta: 0 },
        ],
      },
      {
        titulo: "No consultório médico",
        falas: [
            { gabi: "How are you feeling today?", traducao: "Como você está se sentindo hoje?", tipo: "multipla", opcoes: ["I have a headache.","I live in Brazil.","I like to read books."], resposta: 0 },
            { gabi: "I'm sorry to hear that. Since when?", traducao: "Sinto muito. Desde quando?", tipo: "multipla", opcoes: ["Since this morning.","Two blocks from here.","Five dollars."], resposta: 0 },
            { gabi: "You should rest and drink water.", traducao: "Você deveria descansar e beber água.", tipo: "escrever", respostas: ["thank you doctor","thanks doctor"] },
            { gabi: "Take care! Get well soon.", traducao: "Se cuida! Melhoras!", tipo: "multipla", opcoes: ["Thank you very much!","See you at the market.","It's near the supermarket."], resposta: 0 },
        ],
      },
    ],
  },
};

export default atividade;
