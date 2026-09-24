import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Conversar em jogos online",
  introducao: "Nos jogos pela internet, pessoas que você não conhece podem mandar mensagem. Você vai aprender o que fazer.",
  itens: [
    {
      id: "mensagem",
      titulo: "Mensagem de quem você não conhece",
      passosGuiados: [
        {
          texto: "Olhe: uma pessoa que você não conhece perguntou quantos anos você tem.",
          imagem: figura("seg-jg-mensagem", "Jogo de corrida com a mensagem de Jogador123 perguntando a idade, com as palavras não conheço"),
        },
        {
          texto: "Não responda. Se ela pedir para ser sua amiga no jogo, clique em Recusar.",
          imagem: figura("seg-jg-recusar", "Pedido de amizade no jogo com o botão Recusar marcado"),
        },
        {
          texto: "Nunca combine de encontrar uma pessoa que você conheceu na internet.",
          imagem: figura("seg-jg-encontro", "Mapa com um ponto de encontro e um sinal vermelho de não"),
        },
      ],
    },
    {
      id: "adulto",
      titulo: "Contar para um adulto",
      passosGuiados: [
        {
          texto: "Conte para um adulto quando alguém estranho mandar mensagem.",
          imagem: figura("seg-chame-adulto", "Criança com o celular indo mostrar para um adulto"),
        },
        {
          texto: "Agora você sabe se cuidar nos jogos online. Pronto!",
          imagem: figura("seg-pronto", "Escudo amarelo com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
