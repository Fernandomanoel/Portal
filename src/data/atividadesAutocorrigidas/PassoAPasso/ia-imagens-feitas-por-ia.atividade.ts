import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Imagens feitas pela IA",
  introducao: "Você vai aprender que a IA também faz desenhos e imagens, e que essas imagens não são fotos de verdade.",
  itens: [
    {
      id: "fazer",
      titulo: "A IA faz imagens",
      passosGuiados: [
        {
          texto: "Alguns programas de IA fazem imagens. Você escreve o que quer ver, e o programa faz a imagem.",
          textoNarrado: "Alguns programas de i-á fazem imagens. Você escreve o que quer ver, e o programa faz a imagem.",
          imagem: figura("ia-im-gato", "Programa de imagens com o pedido um gato de chapéu azul e a imagem do gato"),
        },
        {
          texto: "Essa imagem não é uma foto. Esse gato não existe. Foi o computador que fez.",
          imagem: figura("ia-im-nao-real", "Imagem do gato de chapéu com as palavras não é foto"),
        },
        {
          texto: "A IA também erra nas imagens. Olhe: este gato tem 5 pernas.",
          textoNarrado: "A i-á também erra nas imagens. Olhe: este gato tem cinco pernas.",
          imagem: figura("ia-im-erro", "Imagem do gato com cinco pernas e as palavras 5 pernas: erro"),
        },
      ],
    },
    {
      id: "respeito",
      titulo: "Respeitar as pessoas",
      passosGuiados: [
        {
          texto: "Não use a foto de outra pessoa para fazer imagens com IA. Primeiro, a pessoa precisa deixar.",
          textoNarrado: "Não use a foto de outra pessoa para fazer imagens com i-á. Primeiro, a pessoa precisa deixar.",
          imagem: figura("ia-im-foto-pessoa", "Foto de outra pessoa com um sinal vermelho de não"),
        },
        {
          texto: "Agora você sabe que imagens feitas pela IA não são fotos de verdade. Pronto!",
          textoNarrado: "Agora você sabe que imagens feitas pela i-á não são fotos de verdade. Pronto!",
          imagem: figura("ia-pronto", "Robô com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
