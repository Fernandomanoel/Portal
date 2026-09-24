import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { figura } from "./figuras";

const atividade: AtividadeAutocorrigida = {
  titulo: "Aumentar e diminuir o som",
  introducao: "Você vai deixar o som do computador mais alto e depois mais baixo.",
  itens: [
    {
      id: "abrir",
      titulo: "Abrir o som",
      passosGuiados: [
        {
          texto: "Olhe a barra de baixo, do lado direito. Ache o desenho de um alto-falante.",
          imagem: figura("win-som-icone", "Área de trabalho com o ícone do som indicado na barra de tarefas"),
        },
        {
          texto: "Clique uma vez no alto-falante.",
          imagem: figura("win-som-clique", "Ícone do som marcado e o mouse com o botão esquerdo pintado"),
        },
        {
          texto: "Abriu um quadro com a barra do som.",
          imagem: figura("win-som-painel", "Quadro do som aberto com a barra do som indicada"),
        },
      ],
    },
    {
      id: "mudar",
      titulo: "Mudar o som",
      passosGuiados: [
        {
          texto: "Segure a bolinha da barra com o botão esquerdo do mouse. Arraste para a direita.",
          imagem: figura("win-som-aumentar", "Bolinha da barra do som marcada e uma seta para a direita"),
        },
        {
          texto: "O som ficou mais alto.",
          imagem: figura("win-som-alto", "Barra do som quase cheia e um sinal verde de certo"),
        },
        {
          texto: "Agora segure a bolinha e arraste para a esquerda.",
          imagem: figura("win-som-diminuir", "Bolinha da barra do som marcada e uma seta para a esquerda"),
        },
        {
          texto: "O som ficou mais baixo. Clique fora do quadro para fechar. Pronto!",
          imagem: figura("win-som-fechar", "Barra do som mais baixa e um clique na área de trabalho, fora do quadro"),
        },
      ],
    },
  ],
};

export default atividade;
