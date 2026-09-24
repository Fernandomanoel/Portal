import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever o título do slide",
  introducao: "Você vai abrir o PowerPoint e escrever o título do primeiro slide.",
  itens: [
    {
      id: "abrir-powerpoint",
      titulo: "Abrir o PowerPoint",
      passosGuiados: [
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        {
          texto: "Digite a palavra PowerPoint no teclado.",
          textoNarrado: "Digite a palavra Páuer-póint no teclado.",
          imagem: figura("ppt-busca", "Menu Iniciar aberto com a palavra PowerPoint escrita na busca"),
        },
        {
          texto: "Clique no ícone laranja com a letra P.",
          imagem: figura("ppt-resultado", "Resultado da busca com o ícone laranja do PowerPoint marcado"),
        },
        {
          texto: "Espere o PowerPoint abrir. Isso pode demorar um pouco.",
          textoNarrado: "Espere o Páuer-póint abrir. Isso pode demorar um pouco.",
          imagem: figura("ppt-abrindo", "Tela laranja do PowerPoint abrindo"),
        },
        {
          texto: "Clique em Apresentação em branco.",
          imagem: figura("ppt-em-branco", "Tela inicial do PowerPoint com Apresentação em branco marcada"),
        },
      ],
    },
    {
      id: "escrever-titulo",
      titulo: "Escrever o título",
      passosGuiados: [
        {
          texto: "Veja o retângulo branco grande no meio da tela. Ele se chama slide.",
          imagem: figura("ppt-slide", "PowerPoint aberto com o slide branco e o nome slide ao lado"),
        },
        {
          texto: "Dentro do slide tem uma caixa com a frase: Clique para adicionar um título.",
          imagem: figura("ppt-caixa-titulo", "Slide com a caixa do título e o nome caixa do título em cima"),
        },
        {
          texto: "Clique uma vez dentro dessa caixa.",
          imagem: figura("ppt-clique-caixa", "Caixa do título com um lugar marcado dentro"),
        },
        {
          texto: "Digite: Meu primeiro slide.",
          imagem: figura("ppt-titulo-digitado", "Caixa do título com a frase Meu primeiro slide escrita"),
        },
        {
          texto: "Clique em um lugar vazio, fora da caixa.",
          imagem: figura("ppt-clique-fora", "Lugar vazio do slide marcado, fora da caixa do título"),
        },
        {
          texto: "O título está no slide. Pronto!",
          imagem: figura("ppt-pronto", "Slide com o título Meu primeiro slide e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
