import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Escrever tópicos no slide",
  introducao: "Você vai escrever três comidas no slide 2. Cada comida fica numa linha com uma bolinha.",
  itens: [
    {
      id: "caixa",
      titulo: "Achar a caixa",
      passosGuiados: [
        {
          texto: "Abra a apresentação com o slide Minhas comidas. Você aprendeu isso no tutorial Criar um slide novo.",
          imagem: figura("ppt-ns-pronto", "Slide 2 com o título Minhas comidas"),
        },
        {
          texto: "Clique na caixa grande, onde está escrito: Clique para adicionar texto.",
          imagem: figura("ppt-tp-clique", "Caixa grande do slide marcada e o mouse com o botão esquerdo pintado"),
        },
      ],
    },
    {
      id: "topicos",
      titulo: "Escrever as comidas",
      passosGuiados: [
        { texto: "Digite a palavra Arroz.", imagem: figura("ppt-tp-1", "Palavra Arroz com uma bolinha na frente") },
        {
          texto: "Aperte a tecla Enter. Apareceu outra bolinha embaixo.",
          imagem: figura("ppt-tp-enter", "Bolinha nova embaixo de Arroz, com as palavras outra bolinha"),
        },
        { texto: "Digite a palavra Feijão e aperte Enter.", imagem: figura("ppt-tp-2", "Arroz e Feijão, cada um com uma bolinha") },
        { texto: "Digite a palavra Frutas.", imagem: figura("ppt-tp-3", "Arroz, Feijão e Frutas, cada um com uma bolinha") },
        {
          texto: "Clique num lugar vazio, fora da caixa.",
          imagem: figura("ppt-tp-fora", "Lugar vazio fora da caixa marcado"),
        },
        {
          texto: "Pronto! O slide tem três comidas.",
          imagem: figura("ppt-tp-pronto", "Slide com Arroz, Feijão e Frutas e um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
