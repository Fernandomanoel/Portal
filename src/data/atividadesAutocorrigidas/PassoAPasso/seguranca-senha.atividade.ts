import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Cuidar da sua senha",
  introducao: "Você vai aprender o que é senha, como fazer uma senha boa e para quem você pode contar.",
  itens: [
    {
      id: "o-que-e",
      titulo: "O que é senha",
      passosGuiados: [
        {
          texto: "A senha é uma palavra secreta. Ela abre a sua conta no computador, no jogo ou no celular.",
          imagem: figura("seg-sh-login", "Tela de entrar com usuário e senha, com a palavra senha indicada"),
        },
        {
          texto: "Não conte a sua senha para os amigos. Só o seu pai, a sua mãe ou o adulto que cuida de você pode saber.",
          imagem: figura("seg-sh-nao-conte", "Duas crianças com sinal vermelho e uma criança com um adulto com sinal verde"),
        },
      ],
    },
    {
      id: "senha-boa",
      titulo: "Senha boa",
      passosGuiados: [
        {
          texto: "Uma senha boa mistura letras e números, como Gato7Azul3. A senha 123456 é fácil de adivinhar.",
          textoNarrado: "Uma senha boa mistura letras e números, como gato sete azul três. A senha um dois três quatro cinco seis é fácil de adivinhar.",
          imagem: figura("seg-sh-boa", "Senha Gato7Azul3 com sinal verde e senha 123456 com sinal vermelho"),
        },
        {
          texto: "Não use o seu nome nem o seu aniversário na senha.",
          imagem: figura("seg-sh-nao-nome", "Senha Ana e senha com a data de aniversário, as duas com sinal vermelho"),
        },
        {
          texto: "Quando terminar de usar um computador da escola, clique em Sair.",
          imagem: figura("seg-sh-sair", "Botão Sair marcado no canto da tela"),
        },
        {
          texto: "Agora você sabe cuidar da sua senha. Pronto!",
          imagem: figura("seg-pronto", "Escudo amarelo com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
