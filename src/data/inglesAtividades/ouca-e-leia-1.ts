import type { AtividadeIngles } from "@/types/ingles";

// Conteúdo de Portal-Atividades/atividades/paginas/ingles-listening-reading-beta.html, sem cortes.
const atividade: AtividadeIngles = {
  slug: "ouca-e-leia-1",
  titulo: "Ouça e Leia em Inglês",
  descricao: "20 exercícios com a Gabi: ouvir e escolher, ler e escolher, ouvir e escrever e traduzir, com áudio normal e devagar.",
  nivel: "Básico",
  trilha: "ouvir-ler",
  cor: "#0369a1",
  abertura: {
    titulo: "Oi! Eu sou a Gabi.",
    texto: "Vamos praticar inglês ouvindo e lendo frases do dia a dia. Alguns exercícios eu falo em voz alta, outros você lê — e em alguns você escreve a resposta. Bora começar?",
  },
  conteudo: {
    tipo: "exercicios",
    exercicios: [
      { tipo: "ouvir-multipla", frase: "Good morning!", opcoes: ["Bom dia!","Boa noite!","Tchau, até mais!"], resposta: 0 },
      { tipo: "ler-multipla", frase: "My name is Ana.", opcoes: ["Meu nome é Ana.","Eu moro com a Ana.","A Ana é minha amiga."], resposta: 0 },
      { tipo: "ouvir-multipla", frase: "How are you?", opcoes: ["Onde você mora?","Como você está?","Qual é o seu nome?"], resposta: 1 },
      { tipo: "traduzir", prompt: "Bom dia", respostas: ["good morning"] },
      { tipo: "ler-multipla", frase: "Nice to meet you.", opcoes: ["Prazer em te conhecer.","Te vejo mais tarde.","Eu gosto de você."], resposta: 0 },
      { tipo: "ouvir-escrever", frase: "Thank you very much", respostas: ["thank you very much"] },
      { tipo: "ouvir-multipla", frase: "Where are you from?", opcoes: ["De onde você é?","Quantos anos você tem?","Você gosta de música?"], resposta: 0 },
      { tipo: "ler-multipla", frase: "I am fine, thank you.", opcoes: ["Eu estou bem, obrigado(a).","Eu sou seu amigo.","Eu quero comer agora."], resposta: 0 },
      { tipo: "traduzir", prompt: "Como você está?", respostas: ["how are you"] },
      { tipo: "ouvir-escrever", frase: "See you tomorrow", respostas: ["see you tomorrow"] },
      { tipo: "ouvir-multipla", frase: "What is your name?", opcoes: ["Qual é o seu nome?","Onde você mora?","De onde você é?"], resposta: 0 },
      { tipo: "ler-multipla", frase: "I live in Brazil.", opcoes: ["Eu moro no Brasil.","Eu gosto do Brasil.","Eu vou ao Brasil."], resposta: 0 },
      { tipo: "ouvir-multipla", frase: "How old are you?", opcoes: ["Como você está?","Onde você está?","Quantos anos você tem?"], resposta: 2 },
      { tipo: "traduzir", prompt: "Por favor", respostas: ["please"] },
      { tipo: "ler-multipla", frase: "Can you help me, please?", opcoes: ["Você pode me ajudar, por favor?","Você pode me ver, por favor?","Você pode me ouvir agora?"], resposta: 0 },
      { tipo: "ouvir-escrever", frase: "I don't understand", respostas: ["i don't understand","i dont understand"] },
      { tipo: "ouvir-multipla", frase: "What time is it?", opcoes: ["Onde você está?","Que horas são?","O que você quer?"], resposta: 1 },
      { tipo: "ler-multipla", frase: "It is sunny today.", opcoes: ["Está chovendo hoje.","Está frio hoje.","Está ensolarado hoje."], resposta: 2 },
      { tipo: "traduzir", prompt: "Com licença", respostas: ["excuse me"] },
      { tipo: "ouvir-escrever", frase: "Have a nice day", respostas: ["have a nice day"] },
    ],
  },
};

export default atividade;
