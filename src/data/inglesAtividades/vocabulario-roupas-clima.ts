import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "vocabulario-roupas-clima",
  titulo: "Roupas e Tempo",
  descricao: "Sol, chuva, neve e o que vestir em cada tempo: 10 palavras em desenho, com frases do dia a dia sobre o clima.",
  nivel: "Básico",
  trilha: "vocabulario",
  cor: "#c2410c",
  abertura: {
    titulo: "Como está o tempo hoje?",
    texto: "Vou te mostrar cinco palavras do tempo e cinco roupas. Depois você ouve frases como “It's raining” e escolhe o desenho certo. Tem uma pegadinha no meio, fique de olho!",
  },
  conteudo: {
    tipo: "exercicios",
    vocabulario: [
      { figura: "sun", palavra: "sun", traducao: "sol" },
      { figura: "cloud", palavra: "cloud", traducao: "nuvem" },
      { figura: "rain", palavra: "rain", traducao: "chuva" },
      { figura: "snow", palavra: "snow", traducao: "neve" },
      { figura: "umbrella", palavra: "umbrella", traducao: "guarda-chuva" },
      { figura: "t-shirt", palavra: "T-shirt", traducao: "camiseta" },
      { figura: "jacket", palavra: "jacket", traducao: "jaqueta" },
      { figura: "hat", palavra: "hat", traducao: "chapéu" },
      { figura: "shoes", palavra: "shoes", traducao: "sapatos" },
      { figura: "glasses", palavra: "glasses", traducao: "óculos" },
    ],
    exercicios: [
      { tipo: "imagem-multipla", figura: "sun", opcoes: ["moon", "sun", "star"], resposta: 1 },
      { tipo: "ouvir-imagem", frase: "It's raining.", figuras: ["sun", "cloud", "rain", "snow"], resposta: 2 },
      { tipo: "imagem-escrever", figura: "umbrella", respostas: ["umbrella", "an umbrella", "the umbrella"] },
      { tipo: "imagem-multipla", figura: "t-shirt", opcoes: ["T-shirt", "dress", "jacket"], resposta: 0 },
      { tipo: "ouvir-imagem", frase: "Put on your jacket.", figuras: ["t-shirt", "jacket", "hat", "shoes"], resposta: 1 },
      { tipo: "imagem-escrever", figura: "hat", respostas: ["hat", "a hat", "the hat"] },
      { tipo: "ouvir-multipla", frase: "It's cold and snowing today.", opcoes: ["Está frio e nevando hoje.", "Está quente e ensolarado hoje.", "Está chovendo muito hoje."], resposta: 0 },
      {
        tipo: "imagem-multipla",
        figura: "glasses",
        opcoes: ["glasses", "glass", "gloves"],
        resposta: 0,
        explicacao: "Pegadinha: glass é copo (ou vidro) e gloves são luvas. Óculos é sempre glasses, no plural.",
      },
      { tipo: "ouvir-imagem", frase: "It's cloudy.", figuras: ["cloud", "sun", "umbrella", "snow"], resposta: 0 },
      { tipo: "imagem-escrever", figura: "shoes", respostas: ["shoes", "the shoes", "sneakers"] },
      { tipo: "ler-multipla", frase: "Take an umbrella. It's going to rain.", opcoes: ["Leve um guarda-chuva. Vai chover.", "Tire o guarda-chuva. Parou de chover.", "Compre um guarda-chuva novo."], resposta: 0 },
      { tipo: "imagem-escrever", figura: "snow", respostas: ["snow", "the snow"] },
      { tipo: "imagem-multipla", figura: "cloud", opcoes: ["cloud", "rain", "wind"], resposta: 0 },
      { tipo: "traduzir", prompt: "Está ensolarado", respostas: ["it's sunny", "it is sunny", "its sunny"] },
    ],
  },
};

export default atividade;
