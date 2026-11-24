import { useState } from "react";

import type { BlocoDoTipo } from "@/types/aulaIngles";
import { useNarracaoAula } from "./contextoAula";
import { FormaSvgEl } from "./FormaSvgEl";
import estilos from "./Flashcards.module.css";

export function Flashcards({ bloco }: { bloco: BlocoDoTipo<"flashcards"> }) {
  const [viradas, definirViradas] = useState<boolean[]>(() => bloco.cartas.map(() => false));
  const { falar } = useNarracaoAula();

  function virar(indice: number) {
    // Ao virar para o português a palavra é falada em inglês; ao voltar, não fala de novo.
    if (!viradas[indice]) falar(`flashcard-${indice}`, bloco.cartas[indice].en, 0.9);
    definirViradas((antes) => antes.map((v, i) => (i === indice ? !v : v)));
  }

  return (
    <div className={estilos.grade}>
      {bloco.cartas.map((carta, i) => (
        <button key={carta.en} type="button" className={estilos.carta} data-virada={viradas[i] ? "sim" : "nao"} aria-label={`Flashcard ${carta.en}`} aria-pressed={viradas[i]} onClick={() => virar(i)}>
          <span className={estilos.interno}>
            <span className={`${estilos.face} ${estilos.frente}`}>
              <span className={estilos.icone}>
                <svg viewBox="0 0 24 24" width={44} height={44} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false">
                  {carta.icone.map((forma, k) => (
                    <FormaSvgEl key={k} forma={forma} />
                  ))}
                </svg>
              </span>
              <span className={estilos.palavra}>{carta.en}</span>
              <span className={estilos.dica}>{bloco.rotuloVirar}</span>
            </span>
            <span className={`${estilos.face} ${estilos.verso}`}>
              <span className={estilos.idioma}>{bloco.rotuloPortugues}</span>
              <span className={estilos.traducao}>{carta.pt}</span>
              <span className={estilos.origem}>{carta.en}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
