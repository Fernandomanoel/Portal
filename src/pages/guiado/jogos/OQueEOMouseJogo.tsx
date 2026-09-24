import { JogoDescobrir, type InfoParte } from "./JogoDescobrir";
import { MouseDesenho, type ParteMouse } from "./MouseDesenho";

/** Linguagem literal: o que a parte é e o que acontece quando se usa — sem comparação. */
const PARTES: Record<ParteMouse, InfoParte> = {
  esquerdo: {
    nome: "Botão esquerdo",
    comArtigo: "o botão esquerdo",
    funcao: "Você aperta esse botão para escolher e para abrir as coisas na tela. É o botão que você mais usa.",
  },
  direito: {
    nome: "Botão direito",
    comArtigo: "o botão direito",
    funcao: "Você aperta esse botão para abrir um menu com mais opções.",
  },
  rodinha: {
    nome: "Rodinha",
    comArtigo: "a rodinha",
    funcao: "Você gira a rodinha com o dedo para subir e descer a tela.",
  },
};

export function OQueEOMouseJogo() {
  return (
    <JogoDescobrir
      titulo="O que é o Mouse?"
      acento="#3d5bd9"
      abertura="O mouse é a peça que você segura com a mão para mexer a seta na tela. Vamos conhecer as partes dele."
      partes={PARTES}
      palavra={{ singular: "parte", plural: "partes" }}
      perguntas={[
        { pergunta: "Clique no botão que você usa para abrir as coisas na tela.", resposta: "esquerdo" },
        { pergunta: "Clique na parte que você gira para descer a tela.", resposta: "rodinha" },
        { pergunta: "Clique no botão que abre um menu com mais opções.", resposta: "direito" },
      ]}
      fim="Muito bem! Você conhece o mouse."
      desenho={(estado) => <MouseDesenho {...estado} />}
    />
  );
}
