import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "O que é um programa que conversa",
  introducao: "Você vai aprender o que é um programa que responde perguntas, e como usar esse programa com cuidado.",
  itens: [
    {
      id: "o-que-e",
      titulo: "O que é",
      passosGuiados: [
        { texto: "Existem programas de computador que respondem quando você escreve uma pergunta." },
        { texto: "Esses programas se chamam inteligência artificial. O nome curto é IA.", textoNarrado: "Esses programas se chamam inteligência artificial. O nome curto é i-á." },
        { texto: "Quem responde é um programa de computador. Não é uma pessoa." },
        { texto: "O programa leu muitos textos antes. Por isso ele consegue escrever frases." },
      ],
    },
    {
      id: "cuidados",
      titulo: "Cuidados",
      passosGuiados: [
        { texto: "O programa pode errar. Às vezes ele escreve uma coisa que não é verdade." },
        { texto: "Quando a resposta for importante, pergunte também para um adulto ou para o professor." },
        { texto: "Nunca escreva para o programa o seu endereço, o seu telefone ou a sua senha." },
        { texto: "Agora você sabe o que é um programa que conversa. Pronto!" },
      ],
    },
  ],
};

export default atividade;
