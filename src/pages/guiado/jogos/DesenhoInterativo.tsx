import type { KeyboardEvent, ReactNode } from "react";

import estilos from "./DesenhoInterativo.module.css";

export interface ParteDesenho<T extends string> {
  id: T;
  rotulo: string;
  /** Elementos SVG da parte: `data-forma` pinta ao escolher, `data-linha`/`data-ponto` são detalhe. */
  desenho: ReactNode;
}

interface Props<T extends string> {
  viewBox: string;
  descricao: string;
  /** O que aparece no desenho mas não é clicável (fio, mesa, corpo). */
  fundo?: ReactNode;
  partes: ParteDesenho<T>[];
  interativo: boolean;
  destacada?: T | null;
  encontradas?: Set<T>;
  aoEscolher?: (parte: T) => void;
}

/** Desenho com partes clicáveis. Cada parte é um alvo grande e alcançável pelo teclado. */
export function DesenhoInterativo<T extends string>({
  viewBox,
  descricao,
  fundo,
  partes,
  interativo,
  destacada,
  encontradas,
  aoEscolher,
}: Props<T>) {
  function teclado(evento: KeyboardEvent, parte: T) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      aoEscolher?.(parte);
    }
  }

  return (
    <svg viewBox={viewBox} className={estilos.desenho} role={interativo ? "group" : "img"} aria-label={descricao}>
      {fundo}
      {partes.map(({ id, rotulo, desenho }) => {
        const classes = [
          interativo ? estilos.parteInterativa : "",
          encontradas?.has(id) ? estilos.parteEncontrada : "",
          destacada === id ? estilos.parteDestacada : "",
        ].join(" ");
        return interativo ? (
          <g
            key={id}
            className={classes}
            role="button"
            tabIndex={0}
            aria-label={rotulo}
            onClick={() => aoEscolher?.(id)}
            onKeyDown={(evento) => teclado(evento, id)}
          >
            {desenho}
          </g>
        ) : (
          <g key={id} className={classes}>
            {desenho}
          </g>
        );
      })}
    </svg>
  );
}
