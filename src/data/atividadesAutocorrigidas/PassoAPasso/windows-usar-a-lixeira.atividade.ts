import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Usar a Lixeira",
  introducao: "Você vai criar uma pasta, mandar a pasta para a Lixeira e depois trazer a pasta de volta.",
  itens: [
    {
      id: "criar-pasta",
      titulo: "Criar uma pasta para treinar",
      passosGuiados: [
        { texto: "Olhe a tela com o fundo e os ícones. Essa tela se chama área de trabalho." },
        { texto: "Clique com o botão direito do mouse em um lugar vazio da área de trabalho." },
        { texto: "Um menu apareceu. Coloque a seta do mouse em cima da palavra Novo." },
        { texto: "Clique na palavra Pasta." },
        { texto: "Digite o nome TREINO no teclado.", textoNarrado: "Digite a palavra treino no teclado." },
        { texto: "Aperte a tecla Enter." },
      ],
    },
    {
      id: "mandar-para-lixeira",
      titulo: "Mandar a pasta para a Lixeira",
      passosGuiados: [
        { texto: "Clique uma vez na pasta TREINO.", textoNarrado: "Clique uma vez na pasta treino." },
        {
          texto: "Aperte a tecla Delete. Em alguns teclados ela tem o nome Del.",
          textoNarrado: "Aperte a tecla Delete. Em alguns teclados ela tem o nome Dél.",
        },
        { texto: "A pasta sumiu da área de trabalho. Ela foi para a Lixeira." },
        { texto: "Procure na área de trabalho o ícone da Lixeira. É o desenho de um cesto de lixo." },
        { texto: "Clique duas vezes na Lixeira para abrir." },
        { texto: "Veja: a pasta TREINO está aqui dentro.", textoNarrado: "Veja: a pasta treino está aqui dentro." },
      ],
    },
    {
      id: "trazer-de-volta",
      titulo: "Trazer a pasta de volta",
      passosGuiados: [
        { texto: "Clique com o botão direito do mouse na pasta TREINO.", textoNarrado: "Clique com o botão direito do mouse na pasta treino." },
        { texto: "Clique na palavra Restaurar." },
        { texto: "A pasta voltou para a área de trabalho. Pronto!" },
      ],
    },
  ],
};

export default atividade;
