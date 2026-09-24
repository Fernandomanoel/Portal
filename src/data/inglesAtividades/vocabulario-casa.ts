import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "vocabulario-casa",
  titulo: "Coisas da Casa",
  descricao: "10 objetos da casa em desenho: veja, ouça como se fala e depois reconheça pela imagem, pelo som e escrevendo.",
  nivel: "Básico",
  trilha: "vocabulario",
  cor: "#c2410c",
  abertura: {
    titulo: "Vamos arrumar a casa em inglês?",
    texto: "Primeiro eu mostro dez coisas da casa, com desenho e som. Depois você reconhece cada uma: escolhendo o nome, tocando no desenho certo e escrevendo.",
  },
  conteudo: {
    tipo: "exercicios",
    vocabulario: [
      { figura: "bed", palavra: "bed", traducao: "cama" },
      { figura: "chair", palavra: "chair", traducao: "cadeira" },
      { figura: "table", palavra: "table", traducao: "mesa" },
      { figura: "sofa", palavra: "sofa", traducao: "sofá" },
      { figura: "lamp", palavra: "lamp", traducao: "luminária" },
      { figura: "door", palavra: "door", traducao: "porta" },
      { figura: "window", palavra: "window", traducao: "janela" },
      { figura: "clock", palavra: "clock", traducao: "relógio" },
      { figura: "key", palavra: "key", traducao: "chave" },
      { figura: "book", palavra: "book", traducao: "livro" },
    ],
    exercicios: [
      { tipo: "imagem-multipla", figura: "bed", opcoes: ["bed", "chair", "door"], resposta: 0 },
      { tipo: "imagem-multipla", figura: "lamp", opcoes: ["table", "lamp", "clock"], resposta: 1 },
      { tipo: "ouvir-imagem", frase: "the chair", figuras: ["sofa", "chair", "table", "bed"], resposta: 1 },
      { tipo: "imagem-escrever", figura: "door", respostas: ["door", "a door", "the door"] },
      { tipo: "imagem-multipla", figura: "window", opcoes: ["key", "window", "book"], resposta: 1 },
      { tipo: "ouvir-imagem", frase: "the clock", figuras: ["clock", "lamp", "window", "key"], resposta: 0 },
      { tipo: "imagem-escrever", figura: "book", respostas: ["book", "a book", "the book"] },
      { tipo: "imagem-multipla", figura: "sofa", opcoes: ["bed", "sofa", "chair"], resposta: 1 },
      { tipo: "ouvir-multipla", frase: "The key is on the table.", opcoes: ["A chave está na mesa.", "O livro está na cadeira.", "A porta está aberta."], resposta: 0 },
      { tipo: "imagem-escrever", figura: "table", respostas: ["table", "a table", "the table"] },
      { tipo: "ouvir-imagem", frase: "Open the window, please.", figuras: ["door", "window", "book", "lamp"], resposta: 1 },
      { tipo: "ler-multipla", frase: "Turn on the lamp.", opcoes: ["Acenda a luminária.", "Feche a porta.", "Arrume a cama."], resposta: 0 },
      { tipo: "imagem-escrever", figura: "key", respostas: ["key", "a key", "the key"] },
      { tipo: "traduzir", prompt: "O relógio", respostas: ["the clock", "clock"] },
    ],
  },
};

export default atividade;
