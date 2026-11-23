import { Fragment, type ReactNode } from "react";

import type { TextoAula } from "@/types/aulaIngles";
import { useExplicacaoPt } from "./contextoAula";
import estilos from "./Rico.module.css";

const MARCACAO = /\{([a-z]+):([^{}|]*)(?:\|([^{}]*))?\}/g;

function envolver(tag: string, texto: string, extra: string | undefined, chave: number): ReactNode {
  switch (tag) {
    case "b":
      return <strong key={chave}>{texto}</strong>;
    case "i":
      return <em key={chave}>{texto}</em>;
    case "u":
      return (
        <strong key={chave} className={estilos.sublinhado}>
          {texto}
        </strong>
      );
    case "dest":
      return (
        <span key={chave} className={estilos.dest}>
          {texto}
        </span>
      );
    case "pos":
    case "neg":
    case "wh":
    case "sim":
    case "alerta":
      return (
        <strong key={chave} className={estilos[tag]}>
          {texto}
        </strong>
      );
    case "chip":
      return (
        <span key={chave} className={estilos.chip}>
          {texto}
        </span>
      );
    case "dica":
      return (
        <span key={chave} tabIndex={0} className={estilos.dica}>
          {texto}
          <span className={estilos.balao}>{extra}</span>
        </span>
      );
    case "link":
      return (
        <a key={chave} href={extra} target="_blank" rel="noopener noreferrer" className={estilos.link}>
          {texto}
        </a>
      );
    default:
      return texto;
  }
}

/** Escreve um texto da aula, com a marcação em linha descrita em `TextoAula` (e o idioma do passo, se houver `{ en, pt }`). */
export function Rico({ texto }: { texto: TextoAula }) {
  const { pt } = useExplicacaoPt();
  const bruto = typeof texto === "string" ? texto : pt ? texto.pt : texto.en;
  const nos: ReactNode[] = [];
  let fim = 0;
  let contador = 0;
  for (const achado of bruto.matchAll(MARCACAO)) {
    if (achado.index > fim) nos.push(bruto.slice(fim, achado.index));
    nos.push(envolver(achado[1], achado[2], achado[3], contador));
    contador += 1;
    fim = achado.index + achado[0].length;
  }
  if (fim < bruto.length) nos.push(bruto.slice(fim));
  return (
    <>
      {nos.map((no, i) => (
        <Fragment key={i}>{no}</Fragment>
      ))}
    </>
  );
}
