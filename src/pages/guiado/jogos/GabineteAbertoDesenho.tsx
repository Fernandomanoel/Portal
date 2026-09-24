import { DesenhoInterativo, type ParteDesenho } from "./DesenhoInterativo";

export type PecaGabinete = "cpu" | "hd";

const PINOS = Array.from({ length: 5 }, (_, i) => 118 + i * 14);

const PARTES: ParteDesenho<PecaGabinete>[] = [
  {
    id: "cpu",
    rotulo: "CPU",
    desenho: (
      <>
        {PINOS.map((p) => (
          <g key={p}>
            <line data-linha x1={p} y1={62} x2={p} y2={72} />
            <line data-linha x1={p} y1={142} x2={p} y2={152} />
            <line data-linha x1={98} y1={p - 10} x2={108} y2={p - 10} />
            <line data-linha x1={188} y1={p - 10} x2={198} y2={p - 10} />
          </g>
        ))}
        <rect data-forma x={106} y={70} width={84} height={74} rx={6} />
        <rect data-linha x={126} y={90} width={44} height={34} rx={3} />
      </>
    ),
  },
  {
    id: "hd",
    rotulo: "HD",
    desenho: (
      <>
        <rect data-forma x={96} y={196} width={124} height={80} rx={8} />
        <circle data-linha cx={146} cy={236} r={26} />
        <circle data-ponto cx={146} cy={236} r={5} />
        <line data-linha x1={194} y1={212} x2={160} y2={232} />
      </>
    ),
  },
];

const FUNDO = (
  <>
    <rect data-fundo x={60} y={20} width={200} height={290} rx={12} />
    <rect data-linha x={78} y={38} width={164} height={254} rx={6} />
  </>
);

interface Props {
  interativo: boolean;
  destacada?: PecaGabinete | null;
  encontradas?: Set<PecaGabinete>;
  aoEscolher?: (peca: PecaGabinete) => void;
}

/** Gabinete aberto, visto de lado: a CPU em cima e o HD embaixo. */
export function GabineteAbertoDesenho(props: Props) {
  return (
    <DesenhoInterativo
      viewBox="0 0 320 330"
      descricao="Desenho do gabinete aberto com a CPU em cima e o HD embaixo"
      fundo={FUNDO}
      partes={PARTES}
      {...props}
    />
  );
}
