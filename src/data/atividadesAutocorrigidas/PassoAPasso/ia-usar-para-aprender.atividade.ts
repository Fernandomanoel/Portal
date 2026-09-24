import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Usar a IA para aprender",
  introducao: "Você vai aprender a usar a IA para entender a lição, e não para fazer a lição por você.",
  itens: [
    {
      id: "entender",
      titulo: "Pedir ajuda para entender",
      passosGuiados: [
        {
          texto: "Use a IA para entender uma coisa que você não sabe. Por exemplo: O que é fração?",
          textoNarrado: "Use a i-á para entender uma coisa que você não sabe. Por exemplo: O que é fração?",
          imagem: figura("ia-ap-entender", "Conversa com a pergunta O que é fração e a resposta explicando"),
        },
        {
          texto: "Depois, faça a lição você mesmo, no seu caderno.",
          imagem: figura("ia-ap-voce-faz", "Criança ao lado de um caderno, com um sinal verde de certo"),
        },
      ],
    },
    {
      id: "nao-copiar",
      titulo: "Não copiar",
      passosGuiados: [
        {
          texto: "Não copie a resposta da IA e entregue como se fosse sua.",
          textoNarrado: "Não copie a resposta da i-á e entregue como se fosse sua.",
          imagem: figura("ia-ap-nao-copie", "Resposta da IA copiada para uma folha, com um sinal vermelho de não"),
        },
        {
          texto: "Escreva com as suas palavras o que você aprendeu.",
          imagem: figura("ia-ap-suas-palavras", "Criança escrevendo no caderno, com o robô ao lado e um sinal verde de certo"),
        },
        {
          texto: "Agora você sabe usar a IA para aprender. Pronto!",
          textoNarrado: "Agora você sabe usar a i-á para aprender. Pronto!",
          imagem: figura("ia-pronto", "Robô com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
