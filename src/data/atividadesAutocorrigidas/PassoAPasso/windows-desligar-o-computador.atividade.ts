import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Desligar o computador do jeito certo",
  introducao: "Você vai desligar o computador pelo menu Iniciar. Esse é o jeito certo de desligar.",
  itens: [
    {
      id: "fechar",
      titulo: "Fechar os programas",
      passosGuiados: [
        {
          texto: "Feche as janelas abertas. Clique no X de cada janela.",
          imagem: figura("win-clique-fechar", "Botão Fechar, com o X, marcado no canto da janela"),
        },
      ],
    },
    {
      id: "desligar",
      titulo: "Desligar",
      passosGuiados: [
        {
          texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis.",
          imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas"),
        },
        {
          texto: "Clique no botão de energia. Ele fica embaixo, do lado direito do menu.",
          imagem: figura("win-menu-energia-botao", "Menu Iniciar aberto com o botão de energia marcado"),
        },
        {
          texto: "Clique em Desligar.",
          imagem: figura("win-menu-desligar", "Lista de energia com Desligar marcado"),
        },
        {
          texto: "Espere. A tela mostra Desligando e depois fica preta.",
          imagem: figura("win-desligando", "Tela azul escura com a palavra Desligando"),
        },
        {
          texto: "Não aperte o botão do computador para desligar. Use sempre o menu Iniciar. Pronto!",
          imagem: figura("win-nao-botao-fisico", "Gabinete do computador com o botão de ligar e um sinal vermelho de não"),
        },
      ],
    },
  ],
};

export default atividade;
