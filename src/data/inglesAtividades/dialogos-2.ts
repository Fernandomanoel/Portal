import type { AtividadeIngles } from "@/types/ingles";

// Conteúdo de Portal-Atividades/atividades/paginas/ingles-dialogos-2-beta.html, sem cortes.
const atividade: AtividadeIngles = {
  slug: "dialogos-2",
  titulo: "Diálogos em Inglês 2 — Complete a Frase",
  descricao: "Mais 5 conversas (hotel, escola, aeroporto, loja de roupas, cinema) com um exercício novo: completar o espaço em branco escolhendo a palavra certa.",
  nivel: "Básico",
  trilha: "gabi",
  cor: "#9d174d",
  abertura: {
    titulo: "Mais conversas com a Gabi!",
    texto: "Essa é a segunda rodada de diálogos, com uma dinâmica nova: em algumas falas você vai completar o espaço em branco escolhendo a palavra certa. A Gabi fica do seu lado o tempo todo, reagindo a cada resposta.",
  },
  conteudo: {
    tipo: "dialogos",
    dialogos: [
      {
        titulo: "No hotel",
        falas: [
            { gabi: "Welcome! Do you have a reservation?", traducao: "Bem-vindo! Você tem uma reserva?", tipo: "multipla", opcoes: ["Yes, under my name.","It's five dollars.","I like to swim."], resposta: 0 },
            { gabi: "How many nights will you stay?", traducao: "Quantas noites você vai ficar?", tipo: "completar", antes: "I ", depois: " two nights.", opcoes: ["need","have","am"], resposta: 0 },
            { gabi: "Here is your key. Room 204.", traducao: "Aqui está sua chave. Quarto 204.", tipo: "escrever", respostas: ["thank you very much","thanks a lot"] },
            { gabi: "Enjoy your stay!", traducao: "Aproveite sua estadia!", tipo: "multipla", opcoes: ["Thank you! I will.","It's two blocks away.","I need some help."], resposta: 0 },
        ],
      },
      {
        titulo: "Na escola",
        falas: [
            { gabi: "Good morning! Are you ready for the test?", traducao: "Bom dia! Você está pronto(a) para a prova?", tipo: "multipla", opcoes: ["Yes, I studied a lot.","It's five dollars.","I live near here."], resposta: 0 },
            { gabi: "Great! Do you have a pen?", traducao: "Ótimo! Você tem uma caneta?", tipo: "completar", antes: "Yes, I ", depois: " one.", opcoes: ["have","need","like"], resposta: 0 },
            { gabi: "Good luck on your test!", traducao: "Boa sorte na sua prova!", tipo: "escrever", respostas: ["thank you","thanks"] },
            { gabi: "You can start now.", traducao: "Você pode começar agora.", tipo: "multipla", opcoes: ["Okay, thank you.","See you at the market.","It's raining today."], resposta: 0 },
        ],
      },
      {
        titulo: "No aeroporto",
        falas: [
            { gabi: "Can I see your passport, please?", traducao: "Posso ver seu passaporte, por favor?", tipo: "multipla", opcoes: ["Sure, here it is.","I am hungry.","It's very close."], resposta: 0 },
            { gabi: "What is the purpose of your trip?", traducao: "Qual é o motivo da sua viagem?", tipo: "completar", antes: "I am here on ", depois: ".", opcoes: ["vacation","Monday","hospital"], resposta: 0 },
            { gabi: "Enjoy your flight!", traducao: "Tenha um bom voo!", tipo: "escrever", respostas: ["thank you","thanks"] },
            { gabi: "Have a safe trip!", traducao: "Tenha uma viagem segura!", tipo: "multipla", opcoes: ["Thank you, you too!","It's two dollars.","I have two sisters."], resposta: 0 },
        ],
      },
      {
        titulo: "Na loja de roupas",
        falas: [
            { gabi: "Can I help you find something?", traducao: "Posso te ajudar a achar alguma coisa?", tipo: "multipla", opcoes: ["Yes, I'm looking for a jacket.","I live in Brazil.","It's raining today."], resposta: 0 },
            { gabi: "What size do you wear?", traducao: "Qual tamanho você usa?", tipo: "completar", antes: "I ", depois: " medium.", opcoes: ["wear","have","need"], resposta: 0 },
            { gabi: "This one is on sale today.", traducao: "Esse está em promoção hoje.", tipo: "escrever", respostas: ["thats great","that's great"] },
            { gabi: "You can pay at the counter.", traducao: "Você pode pagar no caixa.", tipo: "multipla", opcoes: ["Okay, thank you.","See you tomorrow.","I need some help."], resposta: 0 },
        ],
      },
      {
        titulo: "Convite para o cinema",
        falas: [
            { gabi: "Do you want to watch a movie tonight?", traducao: "Você quer ver um filme hoje à noite?", tipo: "multipla", opcoes: ["Sure, I'd love to!","It's five dollars.","I have a headache."], resposta: 0 },
            { gabi: "What time does the movie start?", traducao: "Que horas o filme começa?", tipo: "completar", antes: "It ", depois: " at eight.", opcoes: ["starts","start","started"], resposta: 0 },
            { gabi: "Should we get some popcorn?", traducao: "Devemos pegar pipoca?", tipo: "escrever", respostas: ["yes lets do it","yes let's do it"] },
            { gabi: "See you at the movies!", traducao: "Te vejo no cinema!", tipo: "multipla", opcoes: ["See you there!","It's near the supermarket.","I need some help."], resposta: 0 },
        ],
      },
    ],
  },
};

export default atividade;
