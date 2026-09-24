import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Fotos e notícias falsas",
  introducao: "Você vai aprender o que fazer quando receber uma imagem ou notícia estranha.",
  itens: [
    {
      id: "desconfiar",
      titulo: "Desconfiar",
      passosGuiados: [
        {
          texto: "Olhe esta imagem: um cachorro voando.",
          imagem: figura("ia-fs-cachorro", "Imagem de um cachorro com asas voando no céu"),
        },
        {
          texto: "Cachorro não voa. Pergunte: isso aconteceu mesmo? A IA pode fazer imagens de coisas que não aconteceram.",
          textoNarrado: "Cachorro não voa. Pergunte: isso aconteceu mesmo? A i-á pode fazer imagens de coisas que não aconteceram.",
          imagem: figura("ia-fs-desconfie", "Imagem do cachorro voando com a pergunta isso aconteceu mesmo"),
        },
      ],
    },
    {
      id: "o-que-fazer",
      titulo: "O que fazer",
      passosGuiados: [
        {
          texto: "Não mande a imagem para os seus amigos. Se não é verdade, não passe para a frente.",
          imagem: figura("ia-fs-nao-compartilhe", "Celular com o grupo da turma e um sinal vermelho no botão de enviar"),
        },
        {
          texto: "Na dúvida, mostre para um adulto ou para o professor.",
          imagem: figura("ia-pergunte-adulto", "Uma criança com um balão de pergunta ao lado de um adulto"),
        },
        {
          texto: "Agora você sabe o que fazer com uma imagem estranha. Pronto!",
          imagem: figura("ia-pronto", "Robô com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
