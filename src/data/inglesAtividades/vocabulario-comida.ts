import type { AtividadeIngles } from "@/types/ingles";

const atividade: AtividadeIngles = {
  slug: "vocabulario-comida",
  titulo: "Comida e Bebida",
  descricao: "10 comidas e bebidas em desenho, do café da manhã à pizza: aprenda o nome, ouça e reconheça em frases de pedido.",
  nivel: "Básico",
  trilha: "vocabulario",
  cor: "#c2410c",
  abertura: {
    titulo: "Bateu a fome?",
    texto: "Hoje o assunto é comida. Eu mostro dez comidas e bebidas com desenho e som, e depois a gente treina reconhecendo, ouvindo pedidos e escrevendo.",
  },
  conteudo: {
    tipo: "exercicios",
    vocabulario: [
      { figura: "apple", palavra: "apple", traducao: "maçã" },
      { figura: "banana", palavra: "banana", traducao: "banana" },
      { figura: "bread", palavra: "bread", traducao: "pão" },
      { figura: "egg", palavra: "egg", traducao: "ovo" },
      { figura: "milk", palavra: "milk", traducao: "leite" },
      { figura: "coffee", palavra: "coffee", traducao: "café" },
      { figura: "cheese", palavra: "cheese", traducao: "queijo" },
      { figura: "pizza", palavra: "pizza", traducao: "pizza" },
      { figura: "carrot", palavra: "carrot", traducao: "cenoura" },
      { figura: "cake", palavra: "cake", traducao: "bolo" },
    ],
    exercicios: [
      { tipo: "imagem-multipla", figura: "apple", opcoes: ["orange", "apple", "banana"], resposta: 1 },
      { tipo: "ouvir-imagem", frase: "bread", figuras: ["cake", "bread", "cheese", "egg"], resposta: 1 },
      { tipo: "imagem-escrever", figura: "banana", respostas: ["banana", "a banana", "the banana"] },
      { tipo: "imagem-multipla", figura: "milk", opcoes: ["water", "juice", "milk"], resposta: 2 },
      { tipo: "ouvir-imagem", frase: "a cup of coffee", figuras: ["milk", "coffee", "cake", "pizza"], resposta: 1 },
      { tipo: "imagem-escrever", figura: "egg", respostas: ["egg", "an egg", "the egg"] },
      { tipo: "imagem-multipla", figura: "cheese", opcoes: ["cheese", "butter", "bread"], resposta: 0 },
      { tipo: "ouvir-imagem", frase: "I love pizza!", figuras: ["pizza", "apple", "carrot", "cheese"], resposta: 0 },
      { tipo: "imagem-escrever", figura: "carrot", respostas: ["carrot", "a carrot", "the carrot"] },
      { tipo: "ler-multipla", frase: "Can I have some cake, please?", opcoes: ["Posso comer um pedaço de bolo, por favor?", "Você quer um café?", "O bolo está no forno."], resposta: 0 },
      { tipo: "imagem-multipla", figura: "coffee", opcoes: ["tea", "coffee", "milk"], resposta: 1 },
      { tipo: "ouvir-multipla", frase: "I'd like two eggs and some bread.", opcoes: ["Eu queria dois ovos e um pouco de pão.", "Eu tenho dois ovos na geladeira.", "Eu não como ovo nem pão."], resposta: 0 },
      { tipo: "imagem-escrever", figura: "cake", respostas: ["cake", "a cake", "the cake"] },
      {
        tipo: "traduzir",
        prompt: "Eu gosto de maçãs",
        respostas: ["i like apples"],
        explicacao: "Para falar de gosto em geral, o inglês usa o plural e não usa “the”: I like apples, I like dogs.",
      },
    ],
  },
};

export default atividade;
