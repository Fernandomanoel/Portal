import { useEffect, useRef, useState } from "react";

import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { MapaNiveis } from "../arcade/MapaNiveis";
import {
  comNivelConcluido,
  embaralhar,
  estrelasPorPrecisao,
  lerProgresso,
  ppm,
  precisao,
  salvarProgresso,
  useLaco,
  type Progresso,
} from "../arcade/motor";
import { PalcoDigitacao, type PalcoRef } from "../arcade/PalcoDigitacao";
import { QuadroJogo } from "../arcade/QuadroJogo";
import { TopoJogo } from "../arcade/TopoJogo";
import { NIVEIS, VIDAS } from "./dados";
import estilos from "./ConstelacaoPage.module.css";

const JOGO_ID = "digitacao-constelacao";
const CHAVE_PROGRESSO = "digitacao-constelacao-progresso-v1";
const TEMPO_BRILHO = 0.6;
const TEMPO_QUEDA = 0.9;

interface Estrela {
  id: number;
  palavra: string;
  x: number;
  y: number;
  restante: number;
  total: number;
  estado: "viva" | "acesa" | "caindo";
  /** Segundos desde que acendeu ou começou a cair. */
  desde: number;
}

type Etapa = "inicio" | "jogando" | "concluido" | "fim" | "vitoria";

interface Jogo {
  nivel: number;
  etapa: Etapa;
  estrelas: Estrela[];
  /** Pontos da constelação, na ordem em que acenderam. */
  pontosCeu: { x: number; y: number }[];
  alvo: number | null;
  digitado: string;
  fila: string[];
  proximoEm: number;
  tempo: number;
  vidas: number;
  pontos: number;
  acesas: number;
  acertosNivel: number;
  errosNivel: number;
  acertos: number;
  erros: number;
  msJogados: number;
  motivoFim: "tempo" | "vidas" | null;
  tremor: number;
}

function novoNivel(nivel: number, anterior?: Jogo): Jogo {
  return {
    nivel,
    etapa: "inicio",
    estrelas: [],
    pontosCeu: [],
    alvo: null,
    digitado: "",
    fila: embaralhar(NIVEIS[nivel].palavras),
    proximoEm: 0.3,
    tempo: NIVEIS[nivel].tempo,
    vidas: VIDAS,
    pontos: anterior?.pontos ?? 0,
    acesas: 0,
    acertosNivel: 0,
    errosNivel: 0,
    acertos: anterior?.acertos ?? 0,
    erros: anterior?.erros ?? 0,
    msJogados: anterior?.msJogados ?? 0,
    motivoFim: null,
    tremor: 0,
  };
}

let proximoId = 0;

// Pontinhos do fundo: sorteados uma vez, só enfeite.
const FUNDO = Array.from({ length: 70 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, r: Math.random() < 0.15 ? 2 : 1, atraso: Math.random() * 4 }));

/** Céu dividido em casas: a estrela nova vai para uma casa longe das que estão vivas. */
const CASAS = Array.from({ length: 4 }, (_, linha) => Array.from({ length: 5 }, (_, coluna) => ({ x: 12 + coluna * 19, y: 16 + linha * 19 }))).flat();

function casaLivre(estrelas: Estrela[]) {
  const vivas = estrelas.filter((e) => e.estado === "viva");
  const livres = CASAS.filter((c) => vivas.every((e) => Math.abs(e.x - c.x) > 12 || Math.abs(e.y - c.y) > 12));
  const casa = livres.length ? livres[Math.floor(Math.random() * livres.length)] : CASAS[Math.floor(Math.random() * CASAS.length)];
  return { x: casa.x + (Math.random() * 6 - 3), y: casa.y + (Math.random() * 6 - 3) };
}

function fimDoNivel(j: Jogo): Etapa {
  return j.nivel === NIVEIS.length - 1 ? "vitoria" : "concluido";
}

export function ConstelacaoPage() {
  useEntrarEmTelaImersiva();

  const [progresso, definirProgresso] = useState<Progresso>(() => lerProgresso(CHAVE_PROGRESSO));
  const [jogo, definirJogo] = useState<Jogo>(() => novoNivel(lerProgresso(CHAVE_PROGRESSO).liberado));
  const [focado, definirFocado] = useState(true);
  const palcoRef = useRef<PalcoRef>(null);

  const dados = NIVEIS[jogo.nivel];
  const rodando = jogo.etapa === "jogando" && focado;


  useLaco(rodando, (dt) => {
    definirJogo((j) => {
      if (j.etapa !== "jogando") return j;
      const nivel = NIVEIS[j.nivel];
      let { vidas, alvo, digitado, proximoEm, fila } = j;
      const estrelas: Estrela[] = [];

      for (const estrela of j.estrelas) {
        if (estrela.estado === "acesa") {
          if (estrela.desde + dt < TEMPO_BRILHO) estrelas.push({ ...estrela, desde: estrela.desde + dt });
          continue;
        }
        if (estrela.estado === "caindo") {
          if (estrela.desde + dt < TEMPO_QUEDA) estrelas.push({ ...estrela, desde: estrela.desde + dt });
          continue;
        }
        const restante = estrela.restante - dt;
        if (restante <= 0) {
          vidas -= 1;
          if (alvo === estrela.id) {
            alvo = null;
            digitado = "";
          }
          estrelas.push({ ...estrela, restante: 0, estado: "caindo", desde: 0 });
          continue;
        }
        estrelas.push({ ...estrela, restante });
      }

      proximoEm -= dt;
      const vivas = estrelas.filter((e) => e.estado === "viva");
      if (proximoEm <= 0 && vivas.length < nivel.maximo && j.acesas + vivas.length < nivel.meta) {
        // Duas estrelas vivas nunca começam com a mesma letra: a primeira tecla já diz qual é o alvo.
        const iniciais = new Set(vivas.map((e) => e.palavra[0].toLowerCase()));
        if (fila.length === 0) fila = embaralhar(nivel.palavras);
        const indice = fila.findIndex((p) => !iniciais.has(p[0].toLowerCase()) && !vivas.some((e) => e.palavra === p));
        if (indice !== -1) {
          const palavra = fila[indice];
          fila = [...fila.slice(0, indice), ...fila.slice(indice + 1)];
          estrelas.push({ id: proximoId++, palavra, ...casaLivre(estrelas), restante: nivel.vidaEstrela, total: nivel.vidaEstrela, estado: "viva", desde: 0 });
        }
        proximoEm = nivel.intervalo * (0.8 + Math.random() * 0.4);
      }

      const tempo = j.tempo - dt;
      const msJogados = j.msJogados + dt * 1000;
      const base = { ...j, estrelas, vidas: Math.max(0, vidas), alvo, digitado, proximoEm, fila, tempo: Math.max(0, tempo), msJogados };
      if (vidas <= 0) return { ...base, etapa: "fim", motivoFim: "vidas" };
      if (tempo <= 0) return { ...base, etapa: "fim", motivoFim: "tempo" };
      return base;
    });
  });

  function errar(j: Jogo): Jogo {
    return { ...j, errosNivel: j.errosNivel + 1, erros: j.erros + 1, tremor: j.tremor + 1 };
  }

  function aoCaractere(caractere: string) {
    definirJogo((j) => {
      if (j.etapa !== "jogando") return j;
      let alvo = j.estrelas.find((e) => e.id === j.alvo && e.estado === "viva");
      if (!alvo) {
        alvo = j.estrelas
          .filter((e) => e.estado === "viva" && e.palavra[0] === caractere)
          .sort((a, b) => a.restante - b.restante)[0];
        if (!alvo) return errar(j);
      } else if (alvo.palavra[j.digitado.length] !== caractere) {
        return errar(j);
      }

      const digitado = (j.alvo === alvo.id ? j.digitado : "") + caractere;
      const base = { ...j, acertosNivel: j.acertosNivel + 1, acertos: j.acertos + 1 };
      if (digitado !== alvo.palavra) return { ...base, alvo: alvo.id, digitado };

      // Palavra completa: a estrela acende e entra na constelação.
      const bonus = Math.round((alvo.restante / alvo.total) * 10);
      const acesas = j.acesas + 1;
      const atualizado: Jogo = {
        ...base,
        alvo: null,
        digitado: "",
        acesas,
        pontos: j.pontos + alvo.palavra.length * 10 + bonus,
        estrelas: j.estrelas.map((e) => (e.id === alvo.id ? { ...e, estado: "acesa", desde: 0 } : e)),
        pontosCeu: [...j.pontosCeu, { x: alvo.x, y: alvo.y }],
      };
      return acesas >= NIVEIS[j.nivel].meta ? { ...atualizado, etapa: fimDoNivel(j) } : atualizado;
    });
  }

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
    if (tecla === "Escape" || tecla === "Backspace") {
      // Desistir da palavra começada: sem castigo, a estrela continua no céu.
      definirJogo((j) => (j.etapa === "jogando" ? { ...j, alvo: null, digitado: "" } : j));
      return;
    }
    if (jogo.etapa === "inicio") comecar();
    else if (jogo.etapa === "concluido") irPara(jogo.nivel + 1, true);
    else if (jogo.etapa === "fim") irPara(jogo.nivel);
    else if (jogo.etapa === "vitoria") irPara(0);
  }

  const precisaoNivel = precisao(jogo.acertosNivel, jogo.errosNivel);
  const precisaoTotal = precisao(jogo.acertos, jogo.erros);
  const ppmTotal = ppm(jogo.acertos, jogo.msJogados);
  const minutos = Math.floor(jogo.tempo / 60);
  const segundos = Math.floor(jogo.tempo % 60).toString().padStart(2, "0");

  return (
    <div className={estilos.pagina}>
      <TopoJogo
        chaveProgresso={CHAVE_PROGRESSO}
        titulo="Constelação"
        icone="estrela"
        medidas={[
          { rotulo: "Pontos", valor: jogo.pontos },
          { rotulo: "Acesas", valor: `${jogo.acesas}/${dados.meta}` },
          { rotulo: "Tempo", valor: `${minutos}:${segundos}` },
          { rotulo: "Precisão", valor: `${precisaoNivel}%` },
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
        className={estilos.ceu}
        rotulo="Digite a palavra da estrela"
        aoCaractere={aoCaractere}
        aoComando={aoComando}
        aoMudarFoco={definirFocado}
        semAviso={jogo.etapa !== "jogando"}
      >
        <div className={estilos.relogio} aria-hidden="true">
          <span style={{ width: `${(jogo.tempo / dados.tempo) * 100}%` }} />
        </div>

        {FUNDO.map((ponto) => (
          <i
            key={ponto.id}
            className={estilos.pontinho}
            style={{ left: `${ponto.x}%`, top: `${ponto.y}%`, width: ponto.r * 2, height: ponto.r * 2, animationDelay: `${ponto.atraso}s` }}
            aria-hidden="true"
          />
        ))}

        <svg className={estilos.linhas} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {jogo.pontosCeu.slice(1).map((ponto, i) => (
            <line key={i} x1={jogo.pontosCeu[i].x} y1={jogo.pontosCeu[i].y} x2={ponto.x} y2={ponto.y} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {jogo.pontosCeu.map((ponto, i) => (
          <i key={i} className={estilos.noCeu} style={{ left: `${ponto.x}%`, top: `${ponto.y}%` }} aria-hidden="true" />
        ))}

        {jogo.tremor > 0 && <span key={jogo.tremor} className={estilos.erro} aria-hidden="true" />}

        {jogo.estrelas.map((estrela) => {
          const ehAlvo = estrela.id === jogo.alvo;
          const feito = ehAlvo ? jogo.digitado.length : 0;
          const fracao = estrela.restante / estrela.total;
          return (
            <div
              key={estrela.id}
              className={[estilos.estrela, estrela.estado === "viva" ? "" : estilos[estrela.estado], ehAlvo ? estilos.alvo : "", fracao < 0.3 && estrela.estado === "viva" ? estilos.pouco : ""].join(" ")}
              style={{ left: `${estrela.x}%`, top: `${estrela.y}%`, ["--fracao" as string]: fracao }}
            >
              <span className={estilos.anel} aria-hidden="true" />
              <span className={estilos.forma} aria-hidden="true" />
              <span className={estilos.palavra}>
                <b>{estrela.palavra.slice(0, feito)}</b>
                {estrela.palavra.slice(feito)}
              </span>
            </div>
          );
        })}

        {jogo.etapa === "inicio" && (
          <QuadroJogo
            icone="estrela"
            titulo={`Nível ${jogo.nivel + 1}: ${dados.nome}`}
            texto={`${dados.dica} Acenda ${dados.meta} estrelas antes do tempo acabar. Cada estrela tem o seu relógio: se ele zerar, ela cai e você perde uma das ${VIDAS} vidas. Esc desiste da palavra começada.`}
            botoes={[{ rotulo: "Começar", icone: "seta-direita", acao: comecar, principal: true }]}
            atalho="ou aperte Enter"
          />
        )}
        {jogo.etapa === "concluido" && (
          <QuadroJogo
            icone="estrela"
            titulo={`Constelação ${jogo.nivel + 1} completa!`}
            estrelas={estrelasNivel}
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
            icone={jogo.etapa === "vitoria" ? "trofeu" : "estrela"}
            titulo={jogo.etapa === "vitoria" ? "O céu inteiro aceso!" : jogo.motivoFim === "tempo" ? "O tempo acabou!" : "As estrelas caíram!"}
            texto={
              jogo.etapa === "vitoria"
                ? "Você completou as 10 constelações."
                : "Comece pela estrela com o anel mais curto: é a que vai cair primeiro."
            }
            medidas={[
              { rotulo: "Pontos", valor: jogo.pontos },
              { rotulo: "Precisão", valor: `${precisaoTotal}%` },
              { rotulo: "Palavras/min", valor: ppmTotal },
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
    </div>
  );
}
