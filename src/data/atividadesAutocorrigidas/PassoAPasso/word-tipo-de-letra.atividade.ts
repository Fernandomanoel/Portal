import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";
import { PREPARAR_NOME_NO_WORD } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Trocar o tipo de letra",
  introducao: "Você vai escrever o seu nome com outro jeito de letra.",
  itens: [
    { id: "marcar-nome", titulo: "Marcar o seu nome", passosGuiados: PREPARAR_NOME_NO_WORD },
    {
      id: "fonte",
      titulo: "Escolher o tipo de letra",
      passosGuiados: [
        {
          texto: "Clique na caixa com a palavra Calibri. Calibri é o nome do tipo de letra.",
          textoNarrado: "Clique na caixa com a palavra calibri. Calibri é o nome do tipo de letra.",
          imagem: figura("word-clique-fonte", "Caixa do tipo de letra marcada na faixa do Word"),
        },
        {
          texto: "Abriu uma lista com nomes de letras. Clique em Comic Sans MS.",
          textoNarrado: "Abriu uma lista com nomes de letras. Clique em cômic sans.",
          imagem: figura("word-lista-fontes", "Lista de tipos de letra aberta com Comic Sans MS marcado"),
        },
        {
          texto: "O seu nome ficou com outro jeito de letra.",
          imagem: figura("word-comic", "Nome Ana Souza com a letra Comic Sans MS, ainda marcado"),
        },
        {
          texto: "Clique num lugar vazio da folha para tirar a marcação.",
          imagem: figura("word-comic-clique-vazio", "Lugar vazio da folha marcado e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Pronto! O seu nome está com a letra nova.",
          imagem: figura("word-comic-pronto", "Nome Ana Souza com a letra Comic Sans MS e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
