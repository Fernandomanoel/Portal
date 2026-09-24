import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Quando alguém trata você mal",
  introducao: "Às vezes alguém manda uma mensagem feia na internet. Você vai aprender o que fazer.",
  itens: [
    {
      id: "nao-responda",
      titulo: "Não responda",
      passosGuiados: [
        {
          texto: "Se alguém mandar uma mensagem feia, não responda.",
          imagem: figura("seg-tm-nao-responda", "Celular com uma mensagem feia e um sinal vermelho no botão de enviar"),
        },
        {
          texto: "Mostre a mensagem para um adulto.",
          imagem: figura("seg-chame-adulto", "Criança com o celular indo mostrar para um adulto"),
        },
      ],
    },
    {
      id: "bloquear",
      titulo: "Bloquear",
      passosGuiados: [
        {
          texto: "Com o adulto, clique nos três pontinhos, no canto de cima da conversa.",
          imagem: figura("seg-tm-pontinhos", "Três pontinhos marcados no canto de cima da conversa"),
        },
        {
          texto: "Clique em Bloquear. A pessoa não consegue mais mandar mensagem para você.",
          imagem: figura("seg-tm-bloquear", "Lista aberta com Bloquear marcado"),
        },
      ],
    },
    {
      id: "respeito",
      titulo: "Respeito",
      passosGuiados: [
        {
          texto: "Na internet, trate as pessoas com respeito, do mesmo jeito que você quer ser tratado.",
          imagem: figura("seg-tm-respeito", "Duas crianças com um coração entre elas e um sinal verde de certo"),
        },
        {
          texto: "Agora você sabe o que fazer quando alguém trata você mal. Pronto!",
          imagem: figura("seg-pronto", "Escudo amarelo com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
