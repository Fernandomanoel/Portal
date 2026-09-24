import { DesenhoInterativo, type ParteDesenho } from "./DesenhoInterativo";

export type PecaComputador = "monitor" | "gabinete" | "teclado" | "mouse";

const TECLAS = [0, 1, 2].flatMap((linha) =>
  Array.from({ length: 9 }, (_, coluna) => ({ x: 58 + coluna * 17 + (linha % 2) * 6, y: 214 + linha * 12 })),
);

const PARTES: ParteDesenho<PecaComputador>[] = [
  {
    id: "monitor",
    rotulo: "Monitor",
    desenho: (
      <>
        <rect data-forma x={120} y={176} width={60} height={12} rx={4} />
        <rect data-forma x={140} y={150} width={20} height={30} />
        <rect data-forma x={40} y={24} width={220} height={130} rx={10} />
        <rect data-linha x={54} y={38} width={192} height={102} rx={4} />
      </>
    ),
  },
  {
    id: "gabinete",
    rotulo: "Gabinete",
    desenho: (
      <>
        <rect data-forma x={290} y={36} width={80} height={152} rx={8} />
        <line data-linha x1={306} y1={60} x2={354} y2={60} />
        <line data-linha x1={306} y1={74} x2={354} y2={74} />
        <circle data-linha cx={330} cy={150} r={11} />
      </>
    ),
  },
  {
    id: "teclado",
    rotulo: "Teclado",
    desenho: (
      <>
        <rect data-forma x={44} y={204} width={186} height={48} rx={8} />
        {TECLAS.map(({ x, y }) => (
          <rect key={`${x}-${y}`} data-ponto x={x} y={y} width={10} height={6} rx={1.5} />
        ))}
      </>
    ),
  },
  {
    id: "mouse",
    rotulo: "Mouse",
    desenho: (
      <>
        <rect data-forma x={262} y={206} width={34} height={48} rx={17} />
        <line data-linha x1={279} y1={210} x2={279} y2={226} />
      </>
    ),
  },
];

const FUNDO = (
  <>
    <line data-linha x1={10} y1={196} x2={390} y2={196} />
    <path data-linha d="M279 206 C279 196 290 196 300 190" />
  </>
);

interface Props {
  interativo: boolean;
  destacada?: PecaComputador | null;
  encontradas?: Set<PecaComputador>;
  aoEscolher?: (peca: PecaComputador) => void;
}

/** Computador de mesa: monitor, gabinete ao lado, teclado e mouse na frente. */
export function ComputadorDesenho(props: Props) {
  return (
    <DesenhoInterativo
      viewBox="0 0 400 270"
      descricao="Desenho de um computador com monitor, gabinete, teclado e mouse"
      fundo={FUNDO}
      partes={PARTES}
      {...props}
    />
  );
}
