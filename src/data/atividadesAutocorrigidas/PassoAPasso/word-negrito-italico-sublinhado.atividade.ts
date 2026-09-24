import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";
import { PREPARAR_NOME_NO_WORD } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Letra grossa, deitada e com risco",
  introducao: "Você vai usar os botões N, I e S para mudar o jeito da letra do seu nome.",
  itens: [
    { id: "marcar-nome", titulo: "Marcar o seu nome", passosGuiados: PREPARAR_NOME_NO_WORD },
    {
      id: "n",
      titulo: "Botão N: letra grossa",
      passosGuiados: [
        {
          texto: "Clique no botão N. Ele fica em cima, na faixa do Word.",
          textoNarrado: "Clique no botão ene. Ele fica em cima, na faixa do Word.",
          imagem: figura("word-clique-n", "Botão N marcado na faixa do Word"),
        },
        {
          texto: "A letra ficou grossa. O nome disso é negrito.",
          imagem: figura("word-negrito", "Nome Ana Souza com letra grossa e a palavra letra grossa ao lado"),
        },
      ],
    },
    {
      id: "i",
      titulo: "Botão I: letra deitada",
      passosGuiados: [
        {
          texto: "Clique no botão I. Ele fica do lado do botão N.",
          textoNarrado: "Clique no botão i. Ele fica do lado do botão ene.",
          imagem: figura("word-clique-i", "Botão I marcado na faixa do Word"),
        },
        {
          texto: "A letra ficou deitada. O nome disso é itálico.",
          imagem: figura("word-italico", "Nome Ana Souza com letra deitada e a palavra letra deitada ao lado"),
        },
      ],
    },
    {
      id: "s",
      titulo: "Botão S: risco embaixo",
      passosGuiados: [
        {
          texto: "Clique no botão S. Ele fica do lado do botão I.",
          textoNarrado: "Clique no botão ésse. Ele fica do lado do botão i.",
          imagem: figura("word-clique-s", "Botão S marcado na faixa do Word"),
        },
        {
          texto: "Apareceu um risco embaixo do nome. O nome disso é sublinhado.",
          imagem: figura("word-sublinhado", "Nome Ana Souza com um risco embaixo e as palavras risco embaixo ao lado"),
        },
        {
          texto: "Clique num lugar vazio da folha para tirar o azul.",
          imagem: figura("word-nis-clique-vazio", "Lugar vazio da folha marcado e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Pronto! O seu nome está grosso, deitado e com risco embaixo.",
          imagem: figura("word-nis-pronto", "Nome Ana Souza em negrito, itálico e sublinhado, com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
