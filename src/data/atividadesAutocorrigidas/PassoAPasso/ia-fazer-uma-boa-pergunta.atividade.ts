import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Fazer uma boa pergunta para a IA",
  introducao: "Você vai aprender a escrever perguntas que a IA entende melhor.",
  itens: [
    {
      id: "perguntar",
      titulo: "Como perguntar",
      passosGuiados: [
        {
          texto: "Escreva a pergunta com palavras certas e completas. Por exemplo: Qual é a capital do Brasil?",
          imagem: figura("ia-bp-clara", "Conversa com a pergunta Qual é a capital do Brasil, com sinal verde, e a resposta Brasília"),
        },
        {
          texto: "Pergunte uma coisa de cada vez. Muitas perguntas juntas deixam a resposta confusa.",
          imagem: figura("ia-bp-uma-coisa", "Três perguntas juntas com sinal vermelho e uma pergunta só com sinal verde"),
        },
        {
          texto: "Você pode pedir: me explique com palavras fáceis.",
          imagem: figura("ia-bp-palavras-faceis", "Pedido para explicar o que é chuva com palavras fáceis e a resposta simples"),
        },
        {
          texto: "Não entendeu a resposta? Escreva: explique de outro jeito.",
          imagem: figura("ia-bp-de-novo", "Resposta difícil e o pedido Explique de outro jeito, com sinal verde"),
        },
      ],
    },
    {
      id: "cuidado",
      titulo: "Cuidado",
      passosGuiados: [
        {
          texto: "A IA pode errar. Quando a resposta for importante, pergunte também para um adulto ou para o professor.",
          textoNarrado: "A i-á pode errar. Quando a resposta for importante, pergunte também para um adulto ou para o professor.",
          imagem: figura("ia-pergunte-adulto", "Uma criança com um balão de pergunta ao lado de um adulto"),
        },
        {
          texto: "Agora você sabe fazer uma boa pergunta. Pronto!",
          imagem: figura("ia-pronto", "Robô com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
