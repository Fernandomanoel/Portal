import type { ReactNode } from "react";

/**
 * Formatação leve dos textos do conteúdo, como numa wiki: **negrito**, *itálico* e `código`.
 * Vira elementos React (nunca HTML solto), então o texto digitado não executa nada.
 */
export function formatar(texto: string): ReactNode[] {
  const partes: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    if (m[1] !== undefined) partes.push(<strong key={m.index}>{m[1]}</strong>);
    else if (m[2] !== undefined) partes.push(<em key={m.index}>{m[2]}</em>);
    else partes.push(<code key={m.index}>{m[3]}</code>);
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

/** Texto sem a marcação, para comparar e pesquisar. */
export const semFormatacao = (texto: string) => texto.replace(/\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g, (_, a, b, c) => a ?? b ?? c);
