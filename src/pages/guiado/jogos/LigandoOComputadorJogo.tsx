import { useEffect, useRef, useState, type ReactNode } from "react";

import { CartaoGuiado } from "@/components/guiado/CartaoGuiado";
import { MolduraGuiado, type AcaoGuiado } from "@/components/guiado/MolduraGuiado";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { rotas } from "@/lib/rotas";
import estilos from "./LigandoOComputadorJogo.module.css";

const monitor = (conteudo: ReactNode) => (
  <>
    <rect data-fundo x={50} y={68} width={20} height={6} rx={2} />
    <rect data-fundo x={56} y={60} width={8} height={9} />
    <rect data-fundo x={22} y={6} width={76} height={54} rx={5} />
    {conteudo}
  </>
);

/** Na ordem certa. A tela mostra numa ordem misturada (ORDEM_NA_TELA). */
const PASSOS: { rotulo: string; desenho: ReactNode }[] = [
  {
    rotulo: "Ligar o cabo na tomada",
    desenho: (
      <>
        <rect data-fundo x={14} y={14} width={46} height={52} rx={6} />
        <circle data-ponto cx={30} cy={40} r={4} />
        <circle data-ponto cx={44} cy={40} r={4} />
        <rect data-fundo x={66} y={30} width={22} height={20} rx={4} />
        <line data-linha x1={58} y1={36} x2={66} y2={36} />
        <line data-linha x1={58} y1={44} x2={66} y2={44} />
        <path data-linha d="M88 40 H110" />
      </>
    ),
  },
  {
    rotulo: "Apertar o botão do gabinete",
    desenho: (
      <>
        <rect data-fundo x={38} y={4} width={44} height={72} rx={5} />
        <circle data-linha cx={60} cy={50} r={10} />
        <path data-linha d="M55 46 a6 6 0 1 0 10 0" />
        <line data-linha x1={60} y1={41} x2={60} y2={49} />
      </>
    ),
  },
  {
    rotulo: "Esperar a tela acender",
    desenho: monitor(
      <>
        <circle data-ponto cx={48} cy={33} r={4} />
        <circle data-ponto cx={60} cy={33} r={4} />
        <circle data-ponto cx={72} cy={33} r={4} />
      </>,
    ),
  },
  {
    rotulo: "Entrar com o seu usuário",
    desenho: monitor(
      <>
        <circle data-linha cx={60} cy={22} r={7} />
        <rect data-linha x={40} y={36} width={40} height={10} rx={3} />
      </>,
    ),
  },
];

// Ordem fixa, e não sorteada: quem joga de novo encontra a tela igual.
const ORDEM_NA_TELA = [2, 0, 3, 1];
const TOTAL = PASSOS.length;
const INTRODUCAO =
  "Para ligar o computador, as coisas acontecem numa ordem. Você vai clicar nos quatro passos, do primeiro até o último.";

type Tela = { tipo: "inicio" } | { tipo: "ordenar" } | { tipo: "fim" };

export function LigandoOComputadorJogo() {
  useEntrarEmTelaImersiva();

  const [tela, definirTela] = useState<Tela>({ tipo: "inicio" });
  const [feitos, definirFeitos] = useState(0);
  const [errado, definirErrado] = useState<number | null>(null);
  const [aviso, definirAviso] = useState<string | null>(null);
  const [recompensa, definirRecompensa] = useState(0);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, [tela]);

  function irPara(proxima: Tela) {
    definirErrado(null);
    definirAviso(null);
    definirRecompensa(0);
    definirTela(proxima);
  }

  function recomecar() {
    definirFeitos(0);
    irPara({ tipo: "ordenar" });
  }

  function clicar(passo: number) {
    definirAviso(null);
    if (passo === feitos) {
      definirErrado(null);
      definirFeitos(feitos + 1);
      definirRecompensa((atual) => atual + 1);
    } else {
      definirErrado(passo);
    }
  }

  const grade = (interativo: boolean) => (
    <div className={estilos.grade}>
      {ORDEM_NA_TELA.map((passo) => {
        const feito = passo < feitos;
        return (
          <button
            key={passo}
            type="button"
            className={[estilos.passo, feito ? estilos.feito : "", errado === passo ? estilos.errado : ""].join(" ")}
            disabled={!interativo || feito}
            onClick={() => clicar(passo)}
          >
            {feito && <span className={estilos.ordem}>{passo + 1}º</span>}
            <svg viewBox="0 0 120 80" className={estilos.desenho} aria-hidden="true">
              {PASSOS[passo].desenho}
            </svg>
            <span className={estilos.rotulo}>{PASSOS[passo].rotulo}</span>
          </button>
        );
      })}
    </div>
  );

  let titulo: string;
  let texto: string | undefined;
  let voltar: AcaoGuiado | undefined;
  let avancar: AcaoGuiado;

  if (tela.tipo === "inicio") {
    titulo = "Ligando o Computador";
    texto = INTRODUCAO;
    avancar = { rotulo: "Começar", icone: "seta-direita", aoClicar: () => irPara({ tipo: "ordenar" }) };
  } else if (tela.tipo === "ordenar") {
    const acabou = feitos === TOTAL;
    titulo = acabou
      ? "Você colocou os quatro passos na ordem certa."
      : feitos === 0
        ? "Clique no passo que vem primeiro."
        : "Clique no passo que vem depois.";
    texto = aviso
      ? aviso
      : errado !== null
        ? `Quase! ${PASSOS[errado].rotulo} vem depois. Tente de novo.`
        : feitos > 0 && !acabou
          ? `Isso! ${feitos}º passo: ${PASSOS[feitos - 1].rotulo}.`
          : acabou
            ? "Clique em Terminar."
            : undefined;
    voltar = { rotulo: "Voltar", icone: "seta-esquerda", aoClicar: () => irPara({ tipo: "inicio" }) };
    avancar = {
      rotulo: "Terminar",
      icone: "seta-direita",
      aoClicar: () =>
        acabou ? irPara({ tipo: "fim" }) : definirAviso(`Ainda falta ${TOTAL - feitos === 1 ? "1 passo" : `${TOTAL - feitos} passos`}.`),
    };
  } else {
    titulo = "Muito bem! Você sabe ligar o computador.";
    texto = PASSOS.map((passo, i) => `${i + 1}º: ${passo.rotulo}.`).join(" ");
    voltar = { rotulo: "Jogar de novo", icone: "recomecar", aoClicar: recomecar };
    avancar = { rotulo: "Escolher outra", icone: "seta-direita", para: rotas.guiado() };
  }

  const progressoAtual = tela.tipo === "inicio" ? 0 : tela.tipo === "fim" ? TOTAL : feitos;

  return (
    <MolduraGuiado
      titulo="Ligando o Computador"
      sairPara={rotas.guiado()}
      acento="#c4532a"
      progresso={{
        texto: tela.tipo === "fim" ? "Terminou" : tela.tipo === "inicio" ? `${TOTAL} passos` : `${progressoAtual} de ${TOTAL}`,
        atual: progressoAtual,
        total: TOTAL,
      }}
      recompensa={tela.tipo === "fim" ? 0 : recompensa}
      voltar={voltar}
      avancar={avancar}
    >
      <CartaoGuiado visual={grade(tela.tipo === "ordenar")} titulo={titulo} tituloRef={tituloRef} texto={texto} visualAlto />
    </MolduraGuiado>
  );
}
