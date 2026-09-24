import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "O que é um programa que conversa",
  introducao: "Você vai aprender o que é um programa que responde perguntas, e como usar esse programa com cuidado.",
  itens: [
    {
      id: "o-que-e",
      titulo: "O que é",
      passosGuiados: [
        {
          texto: "Existem programas de computador que respondem quando você escreve uma pergunta.",
          imagem: figura("ia-conversa", "Janela de conversa: a pergunta quantas pernas tem uma aranha e a resposta uma aranha tem 8 pernas"),
        },
        {
          texto: "Esses programas se chamam inteligência artificial. O nome curto é IA.",
          textoNarrado: "Esses programas se chamam inteligência artificial. O nome curto é i-á.",
          imagem: figura("ia-nome", "Desenho de um robô ao lado das letras IA e das palavras inteligência artificial"),
        },
        {
          texto: "Quem responde é um programa de computador. Não é uma pessoa.",
          imagem: figura("ia-programa-nao-pessoa", "Robô dentro de um computador com sinal verde e uma pessoa com sinal vermelho"),
        },
        {
          texto: "O programa leu muitos textos antes. Por isso ele consegue escrever frases.",
          imagem: figura("ia-leu-textos", "Várias folhas de texto com uma seta até o robô"),
        },
      ],
    },
    {
      id: "cuidados",
      titulo: "Cuidados",
      passosGuiados: [
        {
          texto: "O programa pode errar. Às vezes ele escreve uma coisa que não é verdade.",
          imagem: figura("ia-pode-errar", "Janela de conversa com a resposta errada uma aranha tem 6 pernas e um sinal vermelho"),
        },
        {
          texto: "Quando a resposta for importante, pergunte também para um adulto ou para o professor.",
          imagem: figura("ia-pergunte-adulto", "Uma criança com um balão de pergunta ao lado de um adulto"),
        },
        {
          texto: "Nunca escreva para o programa o seu endereço, o seu telefone ou a sua senha.",
          imagem: figura("ia-nao-escreva", "Desenhos de uma casa, um telefone e um cadeado, cada um com um sinal vermelho de não"),
        },
        {
          texto: "Agora você sabe o que é um programa que conversa. Pronto!",
          imagem: figura("ia-pronto", "Robô com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
