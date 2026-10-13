import { useEffect, useMemo, useRef, useState } from "react";

import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { MapaNiveis } from "../arcade/MapaNiveis";
import {
  comNivelConcluido,
  estrelasPorPrecisao,
  lerProgresso,
  ppm,
  precisao,
  salvarProgresso,
  sortear,
  useLaco,
  type Progresso,
} from "../arcade/motor";
import { PalcoDigitacao, type PalcoRef } from "../arcade/PalcoDigitacao";
import { QuadroJogo } from "../arcade/QuadroJogo";
import { TopoJogo } from "../arcade/TopoJogo";
import { comoDigitar } from "../sonic/teclado";
import { TecladoVirtual } from "../sonic/TecladoVirtual";
import { CORES_BALAO, NIVEIS, NOME_PERIODO, VIDAS, periodoDoNivel } from "./dados";
import estilos from "./BaloesPage.module.css";

const JOGO_ID = "digitacao-baloes";
const CHAVE_PROGRESSO = "digitacao-baloes-progresso-v1";
const TEMPO_ESTOURO = 0.35;

interface Balao {
  id: number;
  letra: string;
  /** Posição em % da cena: x da esquerda, y do alto (começa abaixo de 100 e sobe). */
  x: number;
  y: number;
  cor: string;
  balanco: number;
  /** Segundos desde o estouro; ausente enquanto inteiro. */
  estouro?: number;
}

type Etapa = "inicio" | "jogando" | "concluido" | "fim" | "vitoria";

interface Jogo {
  nivel: number;
  etapa: Etapa;
  baloes: Balao[];
  proximoEm: number;
  estourados: number;
  vidas: number;
  pontos: number;
  combo: number;
  melhorCombo: number;
  /** Do nível atual (estrelas) e do jogo todo (ranking). */
  acertosNivel: number;
  errosNivel: number;
  acertos: number;
  erros: number;
  msJogados: number;
  tremor: number;
}

function novoNivel(nivel: number, anterior?: Jogo): Jogo {
  return {
    nivel,
    etapa: "inicio",
    baloes: [],
    proximoEm: 0.4,
    estourados: 0,
    vidas: VIDAS,
    pontos: anterior?.pontos ?? 0,
    combo: 0,
    melhorCombo: anterior?.melhorCombo ?? 0,
    acertosNivel: 0,
    errosNivel: 0,
    acertos: anterior?.acertos ?? 0,
    erros: anterior?.erros ?? 0,
    msJogados: anterior?.msJogados ?? 0,
    tremor: 0,
  };
}

let proximoId = 0;

/** Faixas de largura para o balão novo não nascer em cima do anterior. */
function posicaoLivre(baloes: Balao[]) {
  for (let tentativa = 0; tentativa < 8; tentativa++) {
    const x = 8 + Math.random() * 84;
    if (baloes.every((b) => Math.abs(b.x - x) > 11 || b.y < 70)) return x;
  }
  return 8 + Math.random() * 84;
}

export function BaloesPage() {
  useEntrarEmTelaImersiva();

  const [progresso, definirProgresso] = useState<Progresso>(() => lerProgresso(CHAVE_PROGRESSO));
  const [jogo, definirJogo] = useState<Jogo>(() => novoNivel(lerProgresso(CHAVE_PROGRESSO).liberado));
  const [focado, definirFocado] = useState(true);
  const [teclado, definirTeclado] = useState(true);
  const palcoRef = useRef<PalcoRef>(null);

  const dados = NIVEIS[jogo.nivel];
  const periodo = periodoDoNivel(jogo.nivel);
  const rodando = jogo.etapa === "jogando" && focado;

  useLaco(rodando, (dt) => {
    definirJogo((j) => {
      if (j.etapa !== "jogando") return j;
      const nivel = NIVEIS[j.nivel];
      let { vidas, combo, proximoEm } = j;
      const baloes: Balao[] = [];

      for (const balao of j.baloes) {
        if (balao.estouro !== undefined) {
          if (balao.estouro + dt < TEMPO_ESTOURO) baloes.push({ ...balao, estouro: balao.estouro + dt });
          continue;
        }
        const y = balao.y - nivel.velocidade * dt;
        if (y < -18) {
          vidas -= 1;
          combo = 0;
          continue;
        }
        baloes.push({ ...balao, y, balanco: balao.balanco + dt });
      }

      proximoEm -= dt;
      const inteiros = baloes.filter((b) => b.estouro === undefined).length;
      if (proximoEm <= 0 && inteiros < nivel.maximo && j.estourados + inteiros < nivel.meta) {
        baloes.push({
          id: proximoId++,
          letra: sortear(nivel.letras.split("")),
          x: posicaoLivre(baloes),
          y: 108,
          cor: sortear(CORES_BALAO),
          balanco: Math.random() * 6,
        });
        proximoEm = nivel.intervalo * (0.75 + Math.random() * 0.5);
      }

      const msJogados = j.msJogados + dt * 1000;
      if (vidas <= 0) return { ...j, baloes, vidas: 0, combo: 0, msJogados, etapa: "fim" };
      return { ...j, baloes, vidas, combo, proximoEm, msJogados };
    });
  });

  // Balão mais alto (o próximo a escapar): é o que o teclado na tela ensina.
  const urgente = useMemo(
    () => jogo.baloes.filter((b) => b.estouro === undefined).sort((a, b) => a.y - b.y)[0],
    [jogo.baloes],
  );
  const proximo = useMemo(() => (urgente ? comoDigitar(urgente.letra) : []), [urgente]);

  function aoCaractere(caractere: string) {
    definirJogo((j) => {
      if (j.etapa !== "jogando") return j;
      const alvo = j.baloes
        .filter((b) => b.estouro === undefined && b.letra === caractere)
        .sort((a, b) => a.y - b.y)[0];
      if (!alvo) {
        return {
          ...j,
          pontos: Math.max(0, j.pontos - 1),
          combo: 0,
          errosNivel: j.errosNivel + 1,
          erros: j.erros + 1,
          tremor: j.tremor + 1,
        };
      }
      const combo = j.combo + 1;
      const estourados = j.estourados + 1;
      const atualizado: Jogo = {
        ...j,
        baloes: j.baloes.map((b) => (b.id === alvo.id ? { ...b, estouro: 0 } : b)),
        estourados,
        pontos: j.pontos + 10 + Math.min(combo, 10),
        combo,
        melhorCombo: Math.max(j.melhorCombo, combo),
        acertosNivel: j.acertosNivel + 1,
        acertos: j.acertos + 1,
      };
      if (estourados < NIVEIS[j.nivel].meta) return atualizado;
      const final = j.nivel === NIVEIS.length - 1;
      return { ...atualizado, etapa: final ? "vitoria" : "concluido" };
    });
  }

  // Fechar o nível fica fora do setState do jogo: grava o progresso uma vez só.
  const fechou = jogo.etapa === "concluido" || jogo.etapa === "vitoria";
  const estrelasNivel = estrelasPorPrecisao(precisao(jogo.acertosNivel, jogo.errosNivel));
  // Com o nível fechado, o mapa já mostra o resultado; a gravação no navegador fica no efeito.
  const progressoVisivel = fechou ? comNivelConcluido(progresso, jogo.nivel, estrelasNivel, NIVEIS.length) : progresso;
  useEffect(() => {
    if (fechou) salvarProgresso(CHAVE_PROGRESSO, comNivelConcluido(progresso, jogo.nivel, estrelasNivel, NIVEIS.length));
  }, [fechou, progresso, jogo.nivel, estrelasNivel]);

  function comecar() {
    definirJogo((j) => ({ ...j, etapa: "jogando" }));
    palcoRef.current?.focar();
  }

  function irPara(nivel: number, manterPlacar = false) {
    definirProgresso(progressoVisivel);
    definirJogo((j) => novoNivel(nivel, manterPlacar ? j : undefined));
    palcoRef.current?.focar();
  }

  function aoComando(tecla: "Enter" | "Escape" | "Backspace") {
    if (tecla !== "Enter") return;
    if (jogo.etapa === "inicio") comecar();
    else if (jogo.etapa === "concluido") irPara(jogo.nivel + 1, true);
    else if (jogo.etapa === "fim" || jogo.etapa === "vitoria") irPara(jogo.nivel === NIVEIS.length - 1 && jogo.etapa === "vitoria" ? 0 : jogo.nivel);
  }

  const precisaoNivel = precisao(jogo.acertosNivel, jogo.errosNivel);
  const precisaoTotal = precisao(jogo.acertos, jogo.erros);
  const ppmTotal = ppm(jogo.acertos, jogo.msJogados);

  return (
    <div className={`${estilos.pagina} ${estilos[periodo]}`}>
      <TopoJogo
        titulo="Balões de Letras"
        icone="balao"
        medidas={[
          { rotulo: "Pontos", valor: jogo.pontos },
          { rotulo: "Estourados", valor: `${jogo.estourados}/${dados.meta}` },
          { rotulo: "Precisão", valor: `${precisaoNivel}%` },
          { rotulo: "Sequência", valor: jogo.combo },
        ]}
      />

      <div className={estilos.barra}>
        <MapaNiveis niveis={NIVEIS} atual={jogo.nivel} progresso={progressoVisivel} aoEscolher={(n) => irPara(n)} />
        <p className={estilos.vidas} aria-label={`${jogo.vidas} de ${VIDAS} vidas`}>
          {Array.from({ length: VIDAS }, (_, i) => (
            <span key={i} className={i < jogo.vidas ? estilos.vida : `${estilos.vida} ${estilos.vidaPerdida}`} />
          ))}
        </p>
      </div>

      <PalcoDigitacao
        ref={palcoRef}
        className={estilos.cena}
        rotulo="Digite a letra do balão"
        aoCaractere={aoCaractere}
        aoComando={aoComando}
        aoMudarFoco={definirFocado}
        semAviso={jogo.etapa !== "jogando"}
      >
        <div className={estilos.astro} aria-hidden="true" />
        <div className={estilos.nuvens} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={estilos.morros} aria-hidden="true" />
        <p className={estilos.periodo}>{NOME_PERIODO[periodo]}</p>
        {jogo.tremor > 0 && <span key={jogo.tremor} className={estilos.erro} aria-hidden="true" />}

        {jogo.baloes.map((balao) => (
          <div
            key={balao.id}
            className={[estilos.balao, balao.estouro !== undefined ? estilos.estourando : "", balao === urgente ? estilos.urgente : ""].join(" ")}
            style={{
              left: `${balao.x}%`,
              top: `${balao.y}%`,
              ["--cor" as string]: balao.cor,
              ["--balanco" as string]: `${Math.sin(balao.balanco * 1.6) * 6}deg`,
            }}
          >
            <span className={estilos.letra}>{balao.letra}</span>
          </div>
        ))}

        {jogo.etapa === "inicio" && (
          <QuadroJogo
            icone="balao"
            titulo={`Nível ${jogo.nivel + 1}: ${dados.nome}`}
            texto={`${dados.dica} Estoure ${dados.meta} balões antes que ${VIDAS} escapem. Tecla errada tira 1 ponto.`}
            botoes={[{ rotulo: "Começar", icone: "seta-direita", acao: comecar, principal: true }]}
            atalho="ou aperte Enter"
          />
        )}
        {jogo.etapa === "concluido" && (
          <QuadroJogo
            icone="trofeu"
            titulo={`Nível ${jogo.nivel + 1} concluído!`}
            estrelas={estrelasPorPrecisao(precisaoNivel)}
            texto="3 estrelas: 97% de precisão ou mais. 2 estrelas: 90% ou mais."
            medidas={[
              { rotulo: "Precisão", valor: `${precisaoNivel}%` },
              { rotulo: "Pontos", valor: jogo.pontos },
              { rotulo: "Palavras/min", valor: ppmTotal },
            ]}
            botoes={[
              { rotulo: "Repetir nível", icone: "recomecar", acao: () => irPara(jogo.nivel) },
              { rotulo: "Próximo nível", icone: "seta-direita", acao: () => irPara(jogo.nivel + 1, true), principal: true },
            ]}
            atalho="ou aperte Enter"
          />
        )}
        {(jogo.etapa === "fim" || jogo.etapa === "vitoria") && (
          <QuadroJogo
            icone={jogo.etapa === "vitoria" ? "trofeu" : "balao"}
            titulo={jogo.etapa === "vitoria" ? "Você terminou os 16 níveis!" : "Os balões escaparam!"}
            texto={
              jogo.etapa === "vitoria"
                ? "Todas as fileiras do teclado, números e pontuação. Mãos de digitador!"
                : "Olhe sempre o balão mais alto e volte os dedos para a fileira do meio."
            }
            medidas={[
              { rotulo: "Pontos", valor: jogo.pontos },
              { rotulo: "Precisão", valor: `${precisaoTotal}%` },
              { rotulo: "Palavras/min", valor: ppmTotal },
              { rotulo: "Melhor sequência", valor: jogo.melhorCombo },
            ]}
            ranking={jogo.acertos > 0 ? { jogoId: JOGO_ID, ppm: ppmTotal, precisao: precisaoTotal } : undefined}
            botoes={[
              {
                rotulo: jogo.etapa === "vitoria" ? "Jogar do começo" : "Tentar de novo",
                icone: "recomecar",
                acao: () => irPara(jogo.etapa === "vitoria" ? 0 : jogo.nivel),
                principal: true,
              },
            ]}
          />
        )}
      </PalcoDigitacao>

      <div className={estilos.rodape}>
        <button type="button" className={estilos.alternar} aria-pressed={teclado} onClick={() => definirTeclado((v) => !v)}>
          {teclado ? "Esconder teclado" : "Mostrar teclado"}
        </button>
        {teclado && <TecladoVirtual proximo={proximo} errou={false} />}
      </div>
    </div>
  );
}
