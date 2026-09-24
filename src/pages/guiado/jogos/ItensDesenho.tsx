import type { ReactNode } from "react";

import { DesenhoInterativo } from "./DesenhoInterativo";

/** Tela de monitor com um programa aberto dentro — o jeito de mostrar que o programa só existe na tela. */
function naTela(conteudo: ReactNode) {
  return (
    <>
      <rect data-fundo x={100} y={126} width={40} height={10} rx={3} />
      <rect data-fundo x={112} y={110} width={16} height={18} />
      <rect data-fundo x={30} y={10} width={180} height={104} rx={8} />
      {conteudo}
    </>
  );
}

const DESENHOS = {
  mouse: (
    <>
      <path data-linha d="M120 26 C120 12 138 8 142 0" />
      <rect data-fundo x={88} y={26} width={64} height={104} rx={32} />
      <line data-linha x1={120} y1={30} x2={120} y2={64} />
      <line data-linha x1={90} y1={64} x2={150} y2={64} />
    </>
  ),
  teclado: (
    <>
      <rect data-fundo x={20} y={40} width={200} height={70} rx={8} />
      {[0, 1, 2].flatMap((linha) =>
        Array.from({ length: 9 }, (_, coluna) => (
          <rect key={`${linha}-${coluna}`} data-ponto x={34 + coluna * 20 + (linha % 2) * 6} y={54 + linha * 16} width={13} height={9} rx={2} />
        )),
      )}
    </>
  ),
  impressora: (
    <>
      <rect data-fundo x={78} y={14} width={84} height={40} />
      <rect data-fundo x={40} y={50} width={160} height={62} rx={10} />
      <rect data-fundo x={78} y={100} width={84} height={36} />
      <line data-linha x1={92} y1={114} x2={148} y2={114} />
      <line data-linha x1={92} y1={124} x2={132} y2={124} />
      <circle data-ponto cx={180} cy={70} r={5} />
    </>
  ),
  caixaDeSom: (
    <>
      <rect data-fundo x={84} y={8} width={72} height={126} rx={8} />
      <circle data-linha cx={120} cy={36} r={12} />
      <circle data-linha cx={120} cy={92} r={26} />
      <circle data-ponto cx={120} cy={92} r={6} />
    </>
  ),
  jogo: naTela(
    <>
      <path data-ponto d="M60 90 L72 66 L84 90 Z" />
      <circle data-ponto cx={150} cy={40} r={8} />
      <circle data-ponto cx={176} cy={58} r={6} />
      <line data-linha x1={44} y1={100} x2={196} y2={100} />
    </>,
  ),
  word: naTela(
    <>
      <rect data-fundo x={82} y={20} width={76} height={86} rx={2} />
      <line data-linha x1={94} y1={38} x2={146} y2={38} />
      <line data-linha x1={94} y1={54} x2={146} y2={54} />
      <line data-linha x1={94} y1={70} x2={130} y2={70} />
    </>,
  ),
  calculadora: naTela(
    <>
      <rect data-fundo x={88} y={18} width={64} height={88} rx={4} />
      <rect data-linha x={96} y={26} width={48} height={16} rx={2} />
      {[0, 1, 2].flatMap((linha) =>
        [0, 1, 2].map((coluna) => (
          <rect key={`${linha}-${coluna}`} data-ponto x={98 + coluna * 16} y={50 + linha * 18} width={12} height={12} rx={2} />
        )),
      )}
    </>,
  ),
  navegador: naTela(
    <>
      <circle data-linha cx={120} cy={62} r={34} />
      <ellipse data-linha cx={120} cy={62} rx={14} ry={34} />
      <line data-linha x1={86} y1={62} x2={154} y2={62} />
    </>,
  ),
} satisfies Record<string, ReactNode>;

export type NomeItem = keyof typeof DESENHOS;

export function ItemDesenho({ item, descricao }: { item: NomeItem; descricao: string }) {
  return <DesenhoInterativo viewBox="0 0 240 150" descricao={descricao} fundo={DESENHOS[item]} partes={[]} interativo={false} />;
}
