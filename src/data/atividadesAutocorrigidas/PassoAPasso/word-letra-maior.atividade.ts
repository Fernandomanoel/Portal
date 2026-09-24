import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";
import { PREPARAR_NOME_NO_WORD } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Deixar a letra maior",
  introducao: "Você vai deixar o seu nome com a letra bem grande.",
  itens: [
    { id: "marcar-nome", titulo: "Marcar o seu nome", passosGuiados: PREPARAR_NOME_NO_WORD },
    {
      id: "tamanho",
      titulo: "Mudar o tamanho",
      passosGuiados: [
        {
          texto: "Clique na caixa com o número 11. Esse número é o tamanho da letra.",
          textoNarrado: "Clique na caixa com o número onze. Esse número é o tamanho da letra.",
          imagem: figura("word-clique-tamanho", "Caixa do tamanho da letra marcada em cima, na faixa do Word"),
        },
        {
          texto: "Abriu uma lista de números. Clique no número 28.",
          textoNarrado: "Abriu uma lista de números. Clique no número vinte e oito.",
          imagem: figura("word-lista-28", "Lista de tamanhos aberta com o número 28 marcado"),
        },
        {
          texto: "O seu nome ficou com a letra grande.",
          imagem: figura("word-nome-28", "Nome Ana Souza com a letra grande, ainda marcado de azul"),
        },
        {
          texto: "Clique num lugar vazio da folha para tirar o azul.",
          imagem: figura("word-28-clique-vazio", "Lugar vazio da folha marcado e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Pronto! O seu nome está com a letra grande.",
          imagem: figura("word-28-pronto", "Nome Ana Souza com a letra grande e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
