import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";
import { PREPARAR_SLIDE } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever o subtítulo",
  introducao: "Você vai escrever o seu nome embaixo do título do slide.",
  itens: [
    { id: "preparar", titulo: "O slide com título", passosGuiados: PREPARAR_SLIDE },
    {
      id: "subtitulo",
      titulo: "Escrever o seu nome",
      passosGuiados: [
        {
          texto: "Olhe a caixa embaixo do título. Nela está escrito: Clique para adicionar um subtítulo.",
          imagem: figura("ppt-sub-olhe", "Caixa do subtítulo indicada embaixo do título"),
        },
        {
          texto: "Clique uma vez dentro dessa caixa.",
          imagem: figura("ppt-sub-clique", "Caixa do subtítulo marcada e o mouse com o botão esquerdo pintado"),
        },
        { texto: "Digite o seu nome.", imagem: figura("ppt-sub-nome", "Nome Ana Souza escrito na caixa do subtítulo") },
        {
          texto: "Clique num lugar vazio, fora do slide.",
          imagem: figura("ppt-sub-clique-fora", "Lugar vazio fora da caixa marcado"),
        },
        {
          texto: "Pronto! O slide tem o título e o seu nome.",
          imagem: figura("ppt-sub-pronto", "Slide com título, o nome Ana Souza e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
