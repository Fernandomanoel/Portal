import { useEffect, useRef } from "react";

import { CONFIG } from "./dados";
import estilos from "./CenaSonic.module.css";

const svg = (largura: number, altura: number, conteudo: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}" viewBox="0 0 ${largura} ${altura}">${conteudo}</svg>`,
  )}")`;

const NUVENS = svg(
  640,
  140,
  `<g fill="#ffffff" opacity="0.95">
    <ellipse cx="90" cy="60" rx="46" ry="18"/><ellipse cx="120" cy="48" rx="30" ry="20"/><ellipse cx="70" cy="50" rx="22" ry="14"/>
    <ellipse cx="400" cy="34" rx="38" ry="14"/><ellipse cx="424" cy="24" rx="24" ry="16"/>
    <ellipse cx="560" cy="90" rx="30" ry="11"/><ellipse cx="578" cy="82" rx="18" ry="12"/>
  </g>`,
);

const MONTANHAS = svg(
  800,
  220,
  `<path d="M0 220 L0 150 L90 70 L170 130 L260 40 L360 140 L450 80 L540 150 L640 60 L730 130 L800 90 L800 220 Z" fill="#7fb6e8"/>
   <path d="M0 220 L0 180 L120 120 L210 170 L330 110 L430 175 L560 115 L680 170 L800 130 L800 220 Z" fill="#5f9fd8"/>`,
);

// Colinas com o xadrez marrom e as palmeiras do cenário clássico do Sonic.
const COLINAS = svg(
  720,
  200,
  `<defs><pattern id="x" width="24" height="24" patternUnits="userSpaceOnUse">
     <rect width="24" height="24" fill="#b0642a"/><rect width="12" height="12" fill="#8a4a1c"/><rect x="12" y="12" width="12" height="12" fill="#8a4a1c"/>
   </pattern></defs>
   <path d="M0 200 L0 110 Q90 60 180 100 T360 95 T540 90 T720 110 L720 200 Z" fill="url(#x)"/>
   <path d="M0 116 Q90 66 180 106 T360 101 T540 96 T720 116 L720 100 Q630 70 540 76 T360 81 T180 86 T0 96 Z" fill="#3fae3a"/>
   <g>
     <rect x="250" y="40" width="7" height="60" fill="#8a5a2b"/>
     <path d="M253 42 q-30 -6 -44 12 q24 -8 44 -4 q-20 10 -26 30 q18 -20 26 -26 q8 6 26 26 q-6 -20 -26 -30 q20 -4 44 4 q-14 -18 -44 -12 z" fill="#2f8f2b"/>
     <rect x="600" y="52" width="6" height="46" fill="#8a5a2b"/>
     <path d="M603 54 q-24 -5 -36 10 q20 -6 36 -3 q-16 8 -21 24 q14 -16 21 -21 q7 5 21 21 q-5 -16 -21 -24 q16 -3 36 3 q-12 -15 -36 -10 z" fill="#2f8f2b"/>
   </g>`,
);

const CHAO = svg(
  96,
  120,
  `<defs><pattern id="c" width="32" height="32" patternUnits="userSpaceOnUse">
     <rect width="32" height="32" fill="#c4742e"/><rect width="16" height="16" fill="#9a5520"/><rect x="16" y="16" width="16" height="16" fill="#9a5520"/>
   </pattern></defs>
   <rect y="22" width="96" height="98" fill="url(#c)"/>
   <rect width="96" height="24" fill="#4cc043"/>
   <path d="M0 24 L8 16 L16 24 L24 14 L32 24 L40 17 L48 24 L56 15 L64 24 L72 16 L80 24 L88 14 L96 24 Z" fill="#6fd865"/>
   <rect y="22" width="96" height="4" fill="#2e8a2a"/>`,
);

/** Camadas do fundo: quanto mais longe, mais devagar passam. */
const CAMADAS = [
  { classe: "nuvens", imagem: NUVENS, fator: 0.08 },
  { classe: "montanhas", imagem: MONTANHAS, fator: 0.18 },
  { classe: "colinas", imagem: COLINAS, fator: 0.45 },
  { classe: "chao", imagem: CHAO, fator: 1 },
] as const;

/** Pixels por segundo do chão em cada nível de velocidade. */
const VELOCIDADE_NIVEL = [0, 110, 260, 430, 640];

export type PoseSonic = "parado" | "correndo" | "bola" | "tonto";

interface Props {
  nivel: number;
  rotuloVelocidade: string;
  pose: PoseSonic;
  /** Muda a cada erro: reinicia a animação de tropeço. */
  tropeco: number;
  aneis: number;
  /** Muda a cada anel ganho: faz o contador pulsar. */
  pulsoAneis: number;
  aneisVoando: { id: number; x: number; y: number }[];
  chegada: boolean;
  saindo: boolean;
  aviso?: string | null;
}

/** Cena do jogo. O fundo anda por requestAnimationFrame, fora do React, para não travar a digitação. */
export function CenaSonic({ nivel, rotuloVelocidade, pose, tropeco, aneis, pulsoAneis, aneisVoando, chegada, saindo, aviso }: Props) {
  const camadasRef = useRef<(HTMLDivElement | null)[]>([]);
  const alvoRef = useRef(0);

  useEffect(() => {
    alvoRef.current = saindo ? VELOCIDADE_NIVEL[4] : (VELOCIDADE_NIVEL[nivel] ?? 0);
  }, [nivel, saindo]);

  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let atual = 0;
    let deslocamento = 0;
    let anterior = performance.now();
    let quadro = 0;
    const passo = (agora: number) => {
      const dt = Math.min(0.05, (agora - anterior) / 1000);
      anterior = agora;
      // Acelera e freia aos poucos, como um corredor de verdade.
      atual += (alvoRef.current - atual) * Math.min(1, dt * 2.5);
      deslocamento += (semMovimento ? atual * 0.25 : atual) * dt;
      CAMADAS.forEach((camada, i) => {
        const el = camadasRef.current[i];
        if (el) el.style.backgroundPositionX = `${-(deslocamento * camada.fator).toFixed(1)}px`;
      });
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, []);

  const classesSonic = [estilos.sonic, estilos[`pose-${pose}`], saindo ? estilos.saindo : ""].join(" ");

  return (
    <div className={estilos.cena} data-nivel={nivel}>
      <div className={estilos.sol} />
      {CAMADAS.map((camada, i) => (
        <div
          key={camada.classe}
          ref={(el) => {
            camadasRef.current[i] = el;
          }}
          className={`${estilos.camada} ${estilos[camada.classe]}`}
          style={{ backgroundImage: camada.imagem }}
        />
      ))}

      {nivel >= 3 && !saindo && <div className={estilos.linhasVelocidade} />}

      {chegada && (
        <div className={estilos.placa} aria-hidden="true">
          <div className={estilos.placaGiro}>
            <img src={CONFIG.anel} alt="" />
          </div>
          <span className={estilos.placaPoste} />
        </div>
      )}

      <div key={tropeco} className={`${classesSonic} ${tropeco > 0 ? estilos.tropeco : ""}`}>
        {pose === "bola" ? (
          <svg viewBox="0 0 100 100" className={estilos.bola} aria-label="Sonic girando como uma bola">
            <circle cx="50" cy="50" r="44" fill="#1d4ed8" />
            <path d="M50 6 A44 44 0 0 1 94 50 L70 50 A20 20 0 0 0 50 30 Z" fill="#3b82f6" />
            <path d="M50 94 A44 44 0 0 1 6 50 L30 50 A20 20 0 0 0 50 70 Z" fill="#3b82f6" />
            <circle cx="50" cy="50" r="16" fill="#1e3a8a" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#0b1f5c" strokeWidth="4" />
          </svg>
        ) : (
          <img src={CONFIG.sprite} alt="Sonic" className={estilos.sprite} draggable={false} />
        )}
        {pose === "correndo" && <span className={estilos.poeira} />}
        {pose === "tonto" && <span className={estilos.tontura} />}
      </div>

      {aneisVoando.map((anel) => (
        <img key={anel.id} className={estilos.anelVoando} src={CONFIG.anel} alt="" style={{ left: `${anel.x}%`, bottom: `${anel.y}%` }} />
      ))}

      <div className={estilos.hud}>
        <div key={pulsoAneis} className={`${estilos.contador} ${pulsoAneis > 0 ? estilos.pulsa : ""}`}>
          <img src={CONFIG.anel} alt="Anéis" />
          <span>{aneis}</span>
        </div>
        <div className={estilos.velocimetro} data-nivel={nivel}>
          <span className={estilos.rotulo}>{rotuloVelocidade}</span>
          <span className={estilos.barras}>
            {[1, 2, 3, 4].map((n) => (
              <i key={n} className={n <= nivel ? estilos.barraAcesa : ""} />
            ))}
          </span>
        </div>
      </div>

      {aviso && <p className={estilos.aviso}>{aviso}</p>}
    </div>
  );
}
