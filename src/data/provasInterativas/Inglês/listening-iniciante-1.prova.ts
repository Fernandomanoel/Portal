import type { ProvaInterativa } from "@/types/quiz";

/**
 * Listening do nível iniciante. Cada pergunta tem um áudio curto (frases e
 * diálogos de até 2 min) escrito aqui, na criação da prova: o aluno só ouve,
 * não vê nem muda o texto. Nos diálogos, o nome antes dos dois-pontos é lido
 * pela voz e marca quem está falando.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Inglês Iniciante — Listening 1",
  perguntas: [
    {
      pergunta: "Ouça a apresentação. De onde a Anna é?",
      audio: { texto: "Hi! My name is Anna. I am from Canada. I am twenty years old. Nice to meet you!" },
      opcoes: ["Brasil", "Canadá", "Inglaterra", "Estados Unidos"],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Ouça e escreva o nome que a pessoa soletra.",
      audio: { texto: "Hello, I am Peter. P. E. T. E. R. Peter." },
      respostasAceitas: ["peter"],
    },
    {
      pergunta: "Qual é o número de telefone do homem?",
      audio: {
        texto: "Woman: What is your phone number? Man: It is nine, eight, four, two. Seven, one, five, three. Woman: Thank you!",
      },
      opcoes: ["9842-7153", "9824-7135", "8942-7153", "9842-1753"],
      correta: 0,
    },
    {
      pergunta: "Quantos anos tem a irmã do Lucas?",
      audio: {
        texto: "Teacher: How old are you, Lucas? Lucas: I am fifteen years old. Teacher: And your sister? Lucas: She is twelve.",
      },
      opcoes: ["10 anos", "12 anos", "15 anos", "20 anos"],
      correta: 1,
    },
    {
      pergunta: "Que horas começa a aula do menino?",
      audio: {
        texto: "Mom: What time is it? Boy: It is seven thirty. Mom: Oh no! Your class is at eight o'clock. Hurry up!",
      },
      opcoes: ["7h", "7h30", "8h", "8h30"],
      correta: 2,
    },
    {
      pergunta: "O que a mulher pede no café?",
      audio: {
        texto: "Waiter: Good morning! What would you like? Woman: A coffee and an orange juice, please. Waiter: Anything else? Woman: No, thank you.",
      },
      opcoes: ["Um café e um suco de laranja", "Um chá e um suco de maçã", "Um café e um sanduíche", "Uma água e um suco de laranja"],
      correta: 0,
    },
    {
      pergunta: "Quantos irmãos e irmãs a pessoa tem, ao todo?",
      audio: {
        texto: "This is my family. My father is a doctor. My mother is a teacher. I have one brother and two sisters. We have a dog. His name is Max.",
      },
      opcoes: ["Um", "Dois", "Três", "Quatro"],
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta: "Escreva em inglês a cor favorita do menino.",
      audio: {
        texto: "Girl: I love your T-shirt! Boy: Thank you. Girl: What color is it? Boy: It is green. Green is my favorite color.",
      },
      respostasAceitas: ["green"],
    },
    {
      pergunta: "O que a pessoa faz no sábado?",
      audio: {
        texto: "Every day I wake up at six. I have breakfast and I go to work by bus. On Saturday, I play soccer with my friends. On Sunday, I stay at home.",
      },
      opcoes: ["Vai trabalhar de ônibus", "Joga futebol com os amigos", "Fica em casa", "Vai à escola"],
      correta: 1,
    },
    {
      pergunta: "Onde fica o banco?",
      audio: {
        texto: "Man: Excuse me, where is the bank? Woman: It is on Main Street, next to the supermarket. Man: Is it far? Woman: No. It is five minutes from here.",
      },
      opcoes: ["Ao lado do supermercado", "Em frente à escola", "Atrás do hospital", "Ao lado da farmácia"],
      correta: 0,
    },
  ],
};

export default prova;
