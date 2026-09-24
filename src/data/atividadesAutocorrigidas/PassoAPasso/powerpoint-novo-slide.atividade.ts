import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Criar um slide novo",
  introducao: "Você vai criar o segundo slide da apresentação e escrever o título dele.",
  itens: [
    {
      id: "criar",
      titulo: "Criar o slide",
      passosGuiados: [
        {
          texto: "Abra o PowerPoint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          textoNarrado: "Abra o Páuer-póint e escreva o título e o seu nome. Você aprendeu isso no tutorial Escrever o subtítulo.",
          imagem: figura("ppt-sub-pronto", "Slide com o título Meu primeiro slide e o nome Ana Souza embaixo"),
        },
        {
          texto: "Clique no botão Novo Slide. Ele fica em cima, do lado esquerdo.",
          imagem: figura("ppt-ns-botao", "Botão Novo Slide marcado na faixa do PowerPoint"),
        },
        {
          texto: "Apareceu o slide 2. Ele aparece pequeno do lado esquerdo e grande no meio.",
          textoNarrado: "Apareceu o slide dois. Ele aparece pequeno do lado esquerdo e grande no meio.",
          imagem: figura("ppt-ns-slide2", "Slide 2 novo e vazio, com a miniatura indicada do lado esquerdo"),
        },
      ],
    },
    {
      id: "titulo",
      titulo: "Escrever o título",
      passosGuiados: [
        {
          texto: "Clique na caixa de cima, onde está escrito: Clique para adicionar um título.",
          imagem: figura("ppt-ns-clique-titulo", "Caixa do título do slide 2 marcada"),
        },
        { texto: "Digite: Minhas comidas.", imagem: figura("ppt-ns-titulo", "Título Minhas comidas escrito no slide 2") },
        {
          texto: "Pronto! A apresentação tem dois slides.",
          imagem: figura("ppt-ns-pronto", "Slide 2 com o título Minhas comidas e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
