import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Salvar o documento",
  introducao: "Você vai guardar o documento do Word num arquivo com o nome meu-nome.",
  itens: [
    {
      id: "arquivo",
      titulo: "Abrir Salvar como",
      passosGuiados: [
        {
          texto: "Abra o Word e escreva o seu nome. Você aprendeu isso no tutorial Abrir o Word e escrever seu nome.",
          imagem: figura("word-nome-pronto", "Folha do Word com o nome Ana Souza escrito"),
        },
        {
          texto: "Clique em Arquivo. Fica em cima, do lado esquerdo.",
          imagem: figura("word-clique-arquivo", "Aba Arquivo marcada no canto de cima do Word"),
        },
        {
          texto: "Clique em Salvar como.",
          imagem: figura("word-bastidores-salvar-como", "Lista azul do lado esquerdo com Salvar como marcado"),
        },
        {
          texto: "Clique em Procurar.",
          imagem: figura("word-clique-procurar", "Botão Procurar marcado"),
        },
      ],
    },
    {
      id: "nome",
      titulo: "Dar o nome e salvar",
      passosGuiados: [
        {
          texto: "No Nome do arquivo, digite meu-nome.",
          textoNarrado: "No nome do arquivo, digite meu nome.",
          imagem: figura("word-salvar-nome", "Janela Salvar como com meu-nome escrito no nome do arquivo"),
        },
        {
          texto: "Clique no botão azul Salvar.",
          imagem: figura("word-salvar-botao", "Botão Salvar marcado na janela"),
        },
        {
          texto: "Olhe em cima: o nome agora é meu-nome. O documento foi salvo. Pronto!",
          textoNarrado: "Olhe em cima: o nome agora é meu nome. O documento foi salvo. Pronto!",
          imagem: figura("word-salvo", "Word com o nome meu-nome em cima e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
