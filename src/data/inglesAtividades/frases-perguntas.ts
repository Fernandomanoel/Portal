import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "frases-perguntas",
  titulo: "Monte a Frase — Perguntas",
  descricao: "12 perguntas que você vai usar de verdade (onde fica, quanto custa, que horas são) para montar na ordem do inglês.",
  nivel: "Básico",
  trilha: "frases",
  cor: "#15803d",
  abertura: {
    titulo: "Pergunta em inglês tem ordem própria",
    texto: "Em português a gente muda só a entonação. Em inglês a ordem das palavras muda: o verbo vem antes de quem faz a ação. Monte as perguntas tocando nas palavras — e cuidado com a palavra que sobra.",
  },
  conteudo: {
    tipo: "exercicios",
    exercicios: [
      { tipo: "ordenar", traducao: "Onde você mora?", palavras: ["Where", "do", "you", "live"], extras: ["are"] },
      { tipo: "ordenar", traducao: "Qual é o seu nome?", palavras: ["What", "is", "your", "name"], extras: ["you"] },
      {
        tipo: "ordenar",
        traducao: "Quantos anos você tem?",
        palavras: ["How", "old", "are", "you"],
        extras: ["have"],
        explicacao: "Em inglês idade é com o verbo to be, não com have: How old are you? — I'm 20.",
      },
      { tipo: "ordenar", traducao: "Você pode me ajudar?", palavras: ["Can", "you", "help", "me"], extras: ["I"] },
      { tipo: "ordenar", traducao: "Onde fica o banheiro?", palavras: ["Where", "is", "the", "bathroom"], extras: ["are"] },
      {
        tipo: "ordenar",
        traducao: "Que horas são?",
        palavras: ["What", "time", "is", "it"],
        extras: ["are"],
        explicacao: "Hora é sempre com it: What time is it? — It's three o'clock.",
      },
      {
        tipo: "ordenar",
        traducao: "Quanto custa isso?",
        palavras: ["How", "much", "is", "this"],
        extras: ["many"],
        dica: "Much para preço e coisas que não se contam; many para coisas que se contam.",
      },
      { tipo: "ordenar", traducao: "Você fala português?", palavras: ["Do", "you", "speak", "Portuguese"], extras: ["talk"] },
      { tipo: "ordenar", traducao: "Por que você está triste?", palavras: ["Why", "are", "you", "sad"], extras: ["do"] },
      { tipo: "ordenar", traducao: "O que você está fazendo?", palavras: ["What", "are", "you", "doing"], extras: ["do"] },
      {
        tipo: "ordenar",
        traducao: "Posso pagar com cartão?",
        palavras: ["Can", "I", "pay", "by", "card"],
        extras: ["with"],
        explicacao: "O inglês diz pay by card (e pay in cash para dinheiro).",
      },
      { tipo: "ordenar", traducao: "Como foi o seu fim de semana?", palavras: ["How", "was", "your", "weekend"], extras: ["is"] },
    ],
  },
};

export default atividade;
