import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Posso clicar nesse link?",
  introducao: "Você vai aprender a reconhecer uma mensagem estranha e o que fazer quando ela chegar.",
  itens: [
    {
      id: "mensagem-estranha",
      titulo: "Mensagem estranha",
      passosGuiados: [
        {
          texto: "Às vezes chega uma mensagem de uma pessoa que você não conhece.",
          imagem: figura("seg-desconhecido", "Celular com uma mensagem de um número desconhecido"),
        },
        {
          texto: "A mensagem pode dizer que você ganhou um prêmio.",
          imagem: figura("seg-premio", "Celular com a mensagem parabéns, você ganhou um prêmio"),
        },
        {
          texto: "A mensagem pode ter um link. Link é um texto azul. Quando você clica nele, abre outra página.",
          imagem: figura("seg-link", "Mensagem com um texto azul sublinhado e o nome link embaixo dele"),
        },
        {
          texto: "Não clique no link quando você não conhece a pessoa que mandou.",
          imagem: figura("seg-nao-conhece", "Mensagem de número desconhecido com um sinal vermelho de não ao lado do link"),
        },
        {
          texto: "Não clique no link quando a mensagem diz que você ganhou um prêmio e você não participou de nada.",
          imagem: figura("seg-premio-falso", "Mensagem dizendo que você ganhou um celular novo, com um sinal vermelho de não ao lado do link"),
        },
        {
          texto: "Não clique no link quando a mensagem pede para você fazer alguma coisa rápido.",
          imagem: figura("seg-pressa", "Mensagem dizendo corra, só hoje, com um relógio e um sinal vermelho de não ao lado do link"),
        },
      ],
    },
    {
      id: "o-que-fazer",
      titulo: "O que fazer",
      passosGuiados: [
        {
          texto: "Não responda a mensagem.",
          imagem: figura("seg-nao-responda", "Celular com um sinal vermelho de não em cima do botão de enviar"),
        },
        {
          texto: "Chame um adulto ou o professor. Mostre a mensagem para ele.",
          imagem: figura("seg-chame-adulto", "Uma criança mostrando o celular para um adulto"),
        },
        {
          texto: "O adulto vai ajudar você a apagar a mensagem.",
          imagem: figura("seg-apagar", "Menu aberto sobre a mensagem com a palavra Apagar marcada"),
        },
        {
          texto: "Agora você sabe o que fazer com uma mensagem estranha. Pronto!",
          imagem: figura("seg-pronto", "Escudo amarelo com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
