import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "O que não contar na internet",
  introducao: "Algumas informações são só suas. Você vai aprender quais são e o que fazer se alguém perguntar.",
  itens: [
    {
      id: "nao-contar",
      titulo: "Não conte",
      passosGuiados: [
        {
          texto: "Não conte na internet onde você mora.",
          imagem: figura("seg-ip-endereco", "Casa com a palavra endereço e um sinal vermelho de não"),
        },
        {
          texto: "Não conte o número do seu telefone.",
          imagem: figura("seg-ip-telefone", "Celular com a palavra telefone e um sinal vermelho de não"),
        },
        {
          texto: "Não conte o nome da sua escola.",
          imagem: figura("seg-ip-escola", "Escola com as palavras nome da escola e um sinal vermelho de não"),
        },
        {
          texto: "Não mande foto com o uniforme da escola.",
          imagem: figura("seg-ip-foto", "Foto de uma criança com uniforme da escola e um sinal vermelho de não"),
        },
      ],
    },
    {
      id: "perguntaram",
      titulo: "Se alguém perguntar",
      passosGuiados: [
        {
          texto: "Se alguém perguntar essas coisas, não responda. Mostre a mensagem para um adulto.",
          imagem: figura("seg-chame-adulto", "Criança com o celular indo mostrar para um adulto"),
        },
        {
          texto: "Agora você sabe o que não contar na internet. Pronto!",
          imagem: figura("seg-pronto", "Escudo amarelo com um sinal verde de certo"),
        },
      ],
    },
  ],
};

export default atividade;
