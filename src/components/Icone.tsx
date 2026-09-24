import type { ReactElement, SVGProps } from "react";

export type NomeIcone =
  | "busca"
  | "sol"
  | "lua"
  | "seta-direita"
  | "seta-esquerda"
  | "cadeado"
  | "pdf"
  | "doc"
  | "planilha"
  | "slides"
  | "link"
  | "informatica"
  | "administrativa"
  | "programacao"
  | "design"
  | "ingles"
  | "prova"
  | "check"
  | "x"
  | "digitacao"
  | "recomecar"
  | "livro"
  | "escudo"
  | "musica"
  | "raio"
  | "trofeu"
  | "alvo"
  | "alerta"
  | "som"
  | "estrela"
  | "mouse"
  | "robo";

/** Traçados em grade de 24, traço 1.6, pontas arredondadas. Um só sistema. */
const CAMINHOS: Record<NomeIcone, ReactElement> = {
  busca: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" />
    </>
  ),
  lua: <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />,
  "seta-direita": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "seta-esquerda": <path d="M20 12H5m6 6-6-6 6-6" />,
  cadeado: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </>
  ),
  pdf: (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M9 14.5h2m-2 3h5" />
    </>
  ),
  doc: (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M9 13h6m-6 3.5h4" />
    </>
  ),
  planilha: (
    <>
      <rect x="4" y="4.5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M9.5 9.5v10M4 14.5h16" />
    </>
  ),
  slides: (
    <>
      <rect x="3.5" y="4" width="17" height="12" rx="2" />
      <path d="M8 12.5v-3m4 3V8m4 4.5v-1.8" />
      <path d="M12 16v4m-3 0h6" />
    </>
  ),
  link: (
    <>
      <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  informatica: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M8 20.5h8m-4-4v4" />
    </>
  ),
  administrativa: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7" />
      <path d="M3 12.5h18" />
    </>
  ),
  programacao: <path d="m8.5 8.5-4 3.5 4 3.5m7-7 4 3.5-4 3.5M13.8 5l-3.6 14" />,
  design: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ingles: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.4 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.4-3.4-8.5S9.8 5.8 12 3.5Z" />
    </>
  ),
  prova: (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="m8.8 15 1.8 1.8 3.6-3.8" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  digitacao: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6 9.5h.01M9.5 9.5h.01M13 9.5h.01M16.5 9.5h.01M6 12.8h.01M9.5 12.8h.01M13 12.8h.01M16.5 12.8h.01M8 15.6h8" />
    </>
  ),
  recomecar: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3.5 4.5V10H9" />
    </>
  ),
  livro: (
    <>
      <path d="M4 5.3c2.4-1 5-1 8 .5v13.2c-3-1.5-5.6-1.5-8-.5Z" />
      <path d="M20 5.3c-2.4-1-5-1-8 .5v13.2c3-1.5 5.6-1.5 8-.5Z" />
    </>
  ),
  escudo: <path d="M12 3.3 5.5 5.8v5.6c0 4.4 2.9 7.5 6.5 8.3 3.6-.8 6.5-3.9 6.5-8.3V5.8Z" />,
  musica: (
    <>
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
      <path d="M10 17.5V6l9-1.8v11.3" />
    </>
  ),
  raio: <path d="M13 3 5.5 13.2h5l-1.5 7.8 8-11.5h-5.2Z" />,
  trofeu: (
    <>
      <path d="M8 4.5h8V8a4 4 0 0 1-8 0Z" />
      <path d="M6 5.8H4.7A2.2 2.2 0 0 0 3.9 10l2 1.6M18 5.8h1.3a2.2 2.2 0 0 1 .8 4.2l-2 1.6" />
      <path d="M10 19.5h4M12 15.5v4" />
    </>
  ),
  alvo: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  alerta: (
    <>
      <path d="M10.3 4.2 2.9 17.5A1.9 1.9 0 0 0 4.6 20.3h14.8a1.9 1.9 0 0 0 1.7-2.8L13.7 4.2a1.9 1.9 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4.2M12 16.8h.01" />
    </>
  ),
  som: (
    <>
      <path d="M4 9.5h3l4.5-4v13L7 14.5H4Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  estrela: (
    <path d="m12 3.8 2.5 5.1 5.6.8-4.05 3.95.95 5.6L12 16.6l-5 2.65.95-5.6L3.9 9.7l5.6-.8Z" />
  ),
  mouse: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="5.5" />
      <path d="M6.5 10.5h11M12 3v7.5" />
    </>
  ),
  robo: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4.5M12 4.5h.01M9.5 13h.01M14.5 13h.01M10 16h4M3 12.5v2.5M21 12.5v2.5" />
    </>
  ),
};

interface Props extends SVGProps<SVGSVGElement> {
  nome: NomeIcone;
  tamanho?: number;
}

export function Icone({ nome, tamanho = 20, ...resto }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...resto}
    >
      {CAMINHOS[nome]}
    </svg>
  );
}
