import type { AtividadeIngles } from "@/types/ingles";

// Conteúdo de Portal-Atividades/atividades/paginas/ingles-listening-reading-beta-2.html, sem cortes.
const atividade: AtividadeIngles = {
  slug: "ouca-e-leia-2",
  titulo: "Ouça e Leia em Inglês 2 — Comida, Compras e Rotina",
  descricao: "Mais 20 exercícios com a Gabi sobre restaurante, compras e preços, direções, família, trabalho e hobbies.",
  nivel: "Básico",
  trilha: "ouvir-ler",
  cor: "#0e7490",
  abertura: {
    titulo: "Oi de novo!",
    texto: "Dessa vez vamos praticar inglês do dia a dia com assuntos diferentes: pedir comida, perguntar preços, pedir direções, falar da família, do trabalho e dos hobbies. Bora começar?",
  },
  conteudo: {
    tipo: "exercicios",
    exercicios: [
      { tipo: "ouvir-multipla", frase: "I would like a coffee, please.", opcoes: ["Eu gostaria de um café, por favor.","Eu quero um copo de água.","Eu preciso de ajuda agora."], resposta: 0 },
      { tipo: "ler-multipla", frase: "The bill, please.", opcoes: ["A conta, por favor.","O prato, por favor.","A mesa, por favor."], resposta: 0 },
      { tipo: "traduzir", prompt: "Quanto custa isso?", respostas: ["how much is this","how much does this cost"] },
      { tipo: "ouvir-escrever", frase: "I am hungry", respostas: ["i am hungry","im hungry"] },
      { tipo: "ler-multipla", frase: "Where is the bathroom?", opcoes: ["Onde fica o banheiro?","Onde fica o banco?","Onde fica a escola?"], resposta: 0 },
      { tipo: "ouvir-multipla", frase: "Turn left at the corner.", opcoes: ["Vire à esquerda na esquina.","Vire à direita na esquina.","Siga em frente na esquina."], resposta: 0 },
      { tipo: "traduzir", prompt: "Vire à direita", respostas: ["turn right"] },
      { tipo: "ler-multipla", frase: "My brother is a doctor.", opcoes: ["Meu irmão é médico.","Minha irmã é médica.","Meu pai é professor."], resposta: 0 },
      { tipo: "ouvir-escrever", frase: "I have two sisters", respostas: ["i have two sisters"] },
      { tipo: "ouvir-multipla", frase: "What do you do for a living?", opcoes: ["Onde você mora?","Quantos anos você tem?","O que você faz da vida?"], resposta: 2 },
      { tipo: "ler-multipla", frase: "I like to read books.", opcoes: ["Eu gosto de ler livros.","Eu gosto de nadar.","Eu gosto de cozinhar."], resposta: 0 },
      { tipo: "traduzir", prompt: "Eu gosto de dançar", respostas: ["i like to dance","i like dancing"] },
      { tipo: "ouvir-multipla", frase: "It's near the supermarket.", opcoes: ["É longe da escola.","É perto do hospital.","É perto do supermercado."], resposta: 2 },
      { tipo: "ler-multipla", frase: "I feel tired today.", opcoes: ["Eu me sinto cansado(a) hoje.","Eu me sinto feliz hoje.","Eu me sinto com fome hoje."], resposta: 0 },
      { tipo: "ouvir-escrever", frase: "I need some help", respostas: ["i need some help"] },
      { tipo: "traduzir", prompt: "Eu trabalho de segunda a sexta", respostas: ["i work from monday to friday"] },
      { tipo: "ouvir-multipla", frase: "How much does this cost?", opcoes: ["Onde isso fica?","De quem é isso?","Quanto isso custa?"], resposta: 2 },
      { tipo: "ler-multipla", frase: "The train leaves at nine.", opcoes: ["O trem sai às nove.","O ônibus chega às nove.","O avião pousa às nove."], resposta: 0 },
      { tipo: "ouvir-escrever", frase: "See you at the market", respostas: ["see you at the market"] },
      { tipo: "traduzir", prompt: "Eu adoro viajar", respostas: ["i love to travel","i love traveling","i love travelling"] },
    ],
  },
};

export default atividade;
