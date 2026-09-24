import { ComputadorDesenho, type PecaComputador } from "./ComputadorDesenho";
import { JogoDescobrir, type InfoParte } from "./JogoDescobrir";

const PECAS: Record<PecaComputador, InfoParte> = {
  monitor: {
    nome: "Monitor",
    comArtigo: "o monitor",
    funcao: "O monitor é a tela. Ele mostra as imagens e as letras. Ele não guarda nada.",
  },
  gabinete: {
    nome: "Gabinete",
    comArtigo: "o gabinete",
    funcao: "O gabinete é a caixa do computador. Dentro dele ficam a CPU e o HD. O botão de ligar fica nele.",
  },
  teclado: {
    nome: "Teclado",
    comArtigo: "o teclado",
    funcao: "Você aperta as teclas do teclado para escrever letras e números.",
  },
  mouse: {
    nome: "Mouse",
    comArtigo: "o mouse",
    funcao: "Você mexe o mouse com a mão para mover a seta na tela e clicar.",
  },
};

export function PecasDoComputadorJogo() {
  return (
    <JogoDescobrir
      titulo="Peças do Computador"
      acento="#2f6fdb"
      abertura="O computador tem quatro peças que você vê em cima da mesa. Vamos descobrir o nome de cada uma."
      partes={PECAS}
      palavra={{ singular: "peça", plural: "peças" }}
      perguntas={[
        { pergunta: "Clique na peça que mostra as imagens.", resposta: "monitor" },
        { pergunta: "Clique na peça que você usa para escrever.", resposta: "teclado" },
        { pergunta: "Clique na caixa onde ficam a CPU e o HD.", resposta: "gabinete" },
        { pergunta: "Clique na peça que move a seta na tela.", resposta: "mouse" },
      ]}
      fim="Muito bem! Você conhece as peças do computador."
      desenho={(estado) => <ComputadorDesenho {...estado} />}
    />
  );
}
