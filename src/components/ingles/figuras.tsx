import type { ReactNode } from "react";

/*
 * Desenhos do vocabulário de inglês, no traço dos jogos do Passo a Passo:
 * contorno escuro grosso, miolo em cor chapada. Grade 120×120.
 * `data-fundo` = miolo claro; `data-cor` = miolo colorido (a cor vem do CSS,
 * para funcionar nos dois temas); `data-linha` = detalhe só de traço;
 * `data-ponto` = detalhe cheio; `data-risco` = traço grosso colorido (raios,
 * pingos). Nenhum desenho tem texto: a palavra é a resposta.
 */
export const FIGURAS = {
  bed: (
    <>
      <rect data-cor="marrom" x={14} y={30} width={12} height={66} rx={3} />
      <rect data-cor="azul" x={26} y={60} width={82} height={20} rx={4} />
      <rect data-fundo x={32} y={47} width={28} height={15} rx={7} />
      <rect data-cor="marrom" x={26} y={80} width={82} height={9} rx={2} />
      <line data-linha x1={103} y1={89} x2={103} y2={97} />
    </>
  ),
  chair: (
    <>
      <rect data-cor="marrom" x={36} y={14} width={12} height={58} rx={3} />
      <rect data-cor="marrom" x={36} y={62} width={50} height={12} rx={3} />
      <rect data-cor="marrom" x={39} y={74} width={7} height={32} rx={2} />
      <rect data-cor="marrom" x={76} y={74} width={7} height={32} rx={2} />
      <line data-linha x1={42} y1={28} x2={42} y2={56} />
    </>
  ),
  table: (
    <>
      <rect data-cor="marrom" x={20} y={54} width={8} height={48} rx={2} />
      <rect data-cor="marrom" x={92} y={54} width={8} height={48} rx={2} />
      <rect data-cor="marrom" x={10} y={42} width={100} height={13} rx={3} />
      <path data-cor="verde" d="M52 42 V30 C52 22 68 22 68 30 V42 Z" />
    </>
  ),
  lamp: (
    <>
      <rect data-cor="cinza" x={57} y={56} width={6} height={40} />
      <rect data-cor="cinza" x={36} y={94} width={48} height={10} rx={5} />
      <path data-cor="amarelo" d="M42 16 H78 L94 58 H26 Z" />
      <line data-linha x1={50} y1={28} x2={46} y2={46} />
    </>
  ),
  door: (
    <>
      <rect data-cor="marrom" x={32} y={10} width={56} height={100} rx={3} />
      <rect data-linha x={41} y={20} width={38} height={30} rx={2} />
      <rect data-linha x={41} y={58} width={38} height={42} rx={2} />
      <circle data-ponto cx={78} cy={64} r={4.5} />
    </>
  ),
  window: (
    <>
      <rect data-fundo x={16} y={16} width={88} height={88} rx={4} />
      <rect data-cor="ceu" x={24} y={24} width={72} height={72} />
      <path data-cor="nuvem" d="M34 58 C28 58 28 48 36 48 C38 40 50 40 52 48 C58 46 62 58 54 58 Z" />
      <line data-moldura x1={60} y1={24} x2={60} y2={96} />
      <line data-moldura x1={24} y1={60} x2={96} y2={60} />
    </>
  ),
  sofa: (
    <>
      <rect data-cor="vermelho" x={20} y={34} width={80} height={38} rx={10} />
      <rect data-cor="vermelho" x={24} y={64} width={72} height={24} rx={5} />
      <rect data-cor="vermelho" x={8} y={52} width={20} height={40} rx={7} />
      <rect data-cor="vermelho" x={92} y={52} width={20} height={40} rx={7} />
      <line data-linha x1={60} y1={68} x2={60} y2={86} />
      <line data-linha x1={16} y1={92} x2={16} y2={102} />
      <line data-linha x1={104} y1={92} x2={104} y2={102} />
    </>
  ),
  clock: (
    <>
      <circle data-cor="azul" cx={60} cy={60} r={46} />
      <circle data-fundo cx={60} cy={60} r={36} />
      <line data-linha x1={60} y1={28} x2={60} y2={34} />
      <line data-linha x1={60} y1={86} x2={60} y2={92} />
      <line data-linha x1={28} y1={60} x2={34} y2={60} />
      <line data-linha x1={86} y1={60} x2={92} y2={60} />
      <line data-ponteiro x1={60} y1={60} x2={60} y2={38} />
      <line data-ponteiro x1={60} y1={60} x2={76} y2={68} />
      <circle data-ponto cx={60} cy={60} r={4} />
    </>
  ),
  key: (
    <>
      <path data-cor="amarelo" d="M54 55 H108 V65 H102 V80 H92 V65 H86 V76 H76 V65 H54 Z" />
      <circle data-cor="amarelo" cx={36} cy={60} r={22} />
      <circle data-fundo cx={30} cy={60} r={7} />
    </>
  ),
  book: (
    <>
      <rect data-fundo x={34} y={20} width={62} height={86} rx={3} />
      <rect data-cor="verde" x={26} y={14} width={64} height={88} rx={4} />
      <line data-linha x1={38} y1={14} x2={38} y2={102} />
      <rect data-fundo x={48} y={32} width={32} height={14} rx={2} />
    </>
  ),

  apple: (
    <>
      <path data-cor="vermelho" d="M60 38 C44 26 18 34 20 62 C22 90 42 106 60 97 C78 106 98 90 100 62 C102 34 76 26 60 38 Z" />
      <path data-cor="verde" d="M64 26 C72 14 88 14 88 22 C82 32 70 32 64 26 Z" />
      <path data-traco d="M60 38 C60 30 62 22 66 16" />
      <path data-linha d="M34 56 C34 48 40 44 46 44" />
    </>
  ),
  banana: (
    <>
      <path data-cor="amarelo" d="M24 30 C24 84 70 108 106 82 L100 72 C70 90 40 70 36 28 Z" />
      <path data-cor="marrom" d="M22 20 L36 18 L36 30 L24 30 Z" />
      <path data-linha d="M36 48 C42 70 58 84 80 86" />
    </>
  ),
  bread: (
    <>
      <path data-cor="bege" d="M16 64 C16 40 34 28 60 28 C86 28 104 40 104 64 V92 C104 97 100 100 95 100 H25 C20 100 16 97 16 92 Z" />
      <path data-linha d="M38 44 L46 56" />
      <path data-linha d="M56 40 L64 52" />
      <path data-linha d="M74 44 L82 56" />
    </>
  ),
  egg: (
    <>
      <path data-cor="bege" d="M60 14 C82 14 96 50 96 70 C96 92 80 106 60 106 C40 106 24 92 24 70 C24 50 38 14 60 14 Z" />
      <path data-linha d="M40 58 C42 44 48 34 54 30" />
    </>
  ),
  milk: (
    <>
      <rect data-fundo x={34} y={42} width={52} height={66} rx={3} />
      <path data-cor="azul" d="M34 42 L46 22 H74 L86 42 Z" />
      <rect data-cor="azul" x={48} y={12} width={24} height={10} rx={2} />
      <path data-cor="azul" d="M60 58 C66 68 72 74 72 82 C72 90 66 94 60 94 C54 94 48 90 48 82 C48 74 54 68 60 58 Z" />
    </>
  ),
  coffee: (
    <>
      <path data-cor="vermelho" d="M84 50 C106 50 106 88 84 88 V78 C94 78 94 60 84 60 Z" />
      <rect data-cor="vermelho" x={24} y={42} width={62} height={60} rx={10} />
      <ellipse data-cor="marrom" cx={55} cy={46} rx={25} ry={5} />
      <path data-linha d="M42 32 C38 24 46 20 42 10" />
      <path data-linha d="M60 32 C56 24 64 20 60 10" />
    </>
  ),
  cheese: (
    <>
      <path data-cor="amarelo" d="M12 72 L106 54 V88 L12 104 Z" />
      <path data-cor="amarelo" d="M12 72 L90 28 L106 54 Z" />
      <circle data-cor="amarelo-escuro" cx={38} cy={88} r={6} />
      <circle data-cor="amarelo-escuro" cx={70} cy={78} r={5} />
      <circle data-cor="amarelo-escuro" cx={92} cy={74} r={4} />
      <circle data-cor="amarelo-escuro" cx={70} cy={48} r={4} />
    </>
  ),
  pizza: (
    <>
      <path data-cor="amarelo" d="M60 108 L20 30 C44 18 76 18 100 30 Z" />
      <path data-cor="bege" d="M16 26 C44 12 76 12 104 26 L98 38 C74 26 46 26 22 38 Z" />
      <circle data-cor="vermelho" cx={60} cy={50} r={8} />
      <circle data-cor="vermelho" cx={46} cy={70} r={6} />
      <circle data-cor="vermelho" cx={72} cy={72} r={6} />
      <circle data-cor="vermelho" cx={60} cy={92} r={4.5} />
    </>
  ),
  carrot: (
    <>
      <path data-cor="verde" d="M58 40 C48 20 54 8 62 34 Z" />
      <path data-cor="verde" d="M62 40 C66 14 80 14 68 40 Z" />
      <path data-cor="verde" d="M56 42 C38 30 36 20 54 34 Z" />
      <path data-cor="laranja" d="M60 110 L38 46 C44 36 76 36 82 46 Z" />
      <path data-linha d="M48 62 L58 64" />
      <path data-linha d="M54 80 L64 81" />
      <path data-linha d="M58 96 L64 96" />
    </>
  ),
  cake: (
    <>
      <rect data-cor="cinza" x={10} y={96} width={100} height={8} rx={4} />
      <rect data-cor="rosa" x={20} y={56} width={80} height={40} rx={4} />
      <path data-fundo d="M20 58 C20 50 24 46 30 46 H90 C96 46 100 50 100 58 V62 C94 70 88 62 84 66 C80 72 74 62 70 66 C64 72 58 62 52 66 C46 72 40 62 36 66 C30 72 26 62 20 64 Z" />
      <rect data-cor="azul" x={56} y={24} width={8} height={22} rx={2} />
      <path data-cor="amarelo" d="M60 8 C67 16 67 22 60 24 C53 22 53 16 60 8 Z" />
    </>
  ),

  sun: (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angulo) => {
        const rad = (angulo * Math.PI) / 180;
        return (
          <line
            key={angulo}
            data-risco="amarelo"
            x1={60 + Math.cos(rad) * 34}
            y1={60 + Math.sin(rad) * 34}
            x2={60 + Math.cos(rad) * 50}
            y2={60 + Math.sin(rad) * 50}
          />
        );
      })}
      <circle data-cor="amarelo" cx={60} cy={60} r={25} />
    </>
  ),
  cloud: (
    <path data-cor="nuvem" d="M30 88 C12 88 10 62 28 60 C28 40 52 34 60 48 C66 30 94 32 94 54 C112 54 114 88 94 88 Z" />
  ),
  rain: (
    <>
      <path data-cor="cinza" d="M30 70 C14 70 12 46 30 44 C30 26 52 20 60 34 C66 18 92 20 92 40 C108 40 110 70 92 70 Z" />
      <line data-risco="azul" x1={40} y1={82} x2={34} y2={98} />
      <line data-risco="azul" x1={60} y1={82} x2={54} y2={98} />
      <line data-risco="azul" x1={80} y1={82} x2={74} y2={98} />
      <line data-risco="azul" x1={50} y1={102} x2={47} y2={110} />
      <line data-risco="azul" x1={70} y1={102} x2={67} y2={110} />
    </>
  ),
  snow: (
    <>
      {[90, 30, 150].map((angulo) => {
        const rad = (angulo * Math.PI) / 180;
        const dx = Math.cos(rad) * 46;
        const dy = Math.sin(rad) * 46;
        return <line key={angulo} data-risco="azul" x1={60 - dx} y1={60 - dy} x2={60 + dx} y2={60 + dy} />;
      })}
      {[0, 60, 120, 180, 240, 300].map((angulo) => {
        const rad = ((angulo - 90) * Math.PI) / 180;
        const x = 60 + Math.cos(rad) * 26;
        const y = 60 + Math.sin(rad) * 26;
        const esquerda = rad - 0.75;
        const direita = rad + 0.75;
        return (
          <path
            key={angulo}
            data-risco="azul"
            d={`M${x + Math.cos(esquerda) * 12} ${y + Math.sin(esquerda) * 12} L${x} ${y} L${x + Math.cos(direita) * 12} ${y + Math.sin(direita) * 12}`}
          />
        );
      })}
    </>
  ),
  umbrella: (
    <>
      <path data-traco d="M60 60 V96 C60 108 46 108 46 98" />
      <line data-traco x1={60} y1={30} x2={60} y2={20} />
      <path data-cor="roxo" d="M12 62 C12 28 108 28 108 62 C100 55 92 55 84 62 C76 55 68 55 60 62 C52 55 44 55 36 62 C28 55 20 55 12 62 Z" />
      <path data-linha d="M60 34 C50 42 44 52 36 60" />
      <path data-linha d="M60 34 C70 42 76 52 84 60" />
    </>
  ),
  "t-shirt": (
    <>
      <path data-cor="azul" d="M40 18 L20 28 L8 52 L28 60 L34 50 V106 H86 V50 L92 60 L112 52 L100 28 L80 18 C76 30 44 30 40 18 Z" />
      <path data-linha d="M44 20 C50 30 70 30 76 20" />
    </>
  ),
  shoes: (
    <>
      <g transform="translate(-4 -18)">
        <path data-cor="vermelho" d="M16 84 V62 C16 56 22 52 28 54 L46 60 C54 62 58 68 66 70 L96 76 C104 78 108 82 108 88 V92 H16 Z" />
        <rect data-fundo x={14} y={88} width={96} height={9} rx={4} />
      </g>
      <g transform="translate(8 10)">
        <path data-cor="vermelho" d="M16 84 V62 C16 56 22 52 28 54 L46 60 C54 62 58 68 66 70 L96 76 C104 78 108 82 108 88 V92 H16 Z" />
        <rect data-fundo x={14} y={88} width={96} height={9} rx={4} />
        <path data-linha d="M36 62 L44 56" />
        <path data-linha d="M44 68 L52 62" />
      </g>
    </>
  ),
  hat: (
    <>
      <ellipse data-cor="marrom" cx={60} cy={78} rx={52} ry={12} />
      <path data-cor="marrom" d="M32 76 C32 34 88 34 88 76 Z" />
      <rect data-cor="vermelho" x={33} y={62} width={54} height={10} />
    </>
  ),
  jacket: (
    <>
      <path data-cor="verde" d="M42 14 L24 22 L12 96 H30 L36 52 V108 H84 V52 L90 96 H108 L96 22 L78 14 L60 34 Z" />
      <path data-cor="verde-escuro" d="M42 14 L60 34 L78 14 L70 10 L60 22 L50 10 Z" />
      <line data-linha x1={60} y1={36} x2={60} y2={106} />
      <rect data-linha x={42} y={74} width={10} height={4} rx={1} />
      <rect data-linha x={68} y={74} width={10} height={4} rx={1} />
    </>
  ),
  glasses: (
    <>
      <line data-traco x1={14} y1={54} x2={4} y2={44} />
      <line data-traco x1={106} y1={54} x2={116} y2={44} />
      <path data-traco d="M52 58 C56 51 64 51 68 58" />
      <rect data-cor="ceu" x={12} y={46} width={40} height={30} rx={11} />
      <rect data-cor="ceu" x={68} y={46} width={40} height={30} rx={11} />
      <path data-linha d="M20 56 L28 50" />
      <path data-linha d="M76 56 L84 50" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type NomeFigura = keyof typeof FIGURAS;
