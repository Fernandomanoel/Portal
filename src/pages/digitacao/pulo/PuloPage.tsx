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
  sortear,
  useLaco,
  type Progresso,
} from "../arcade/motor";
import { PalcoDigitacao, type PalcoRef } from "../arcade/PalcoDigitacao";
import { QuadroJogo } from "../arcade/QuadroJogo";
import { TopoJogo } from "../arcade/TopoJogo";
import { NIVEIS, VIDAS, VIRUS } from "./dados";
import estilos from "./PuloPage.module.css";

const JOGO_ID = "digitacao-pulo";
const CHAVE_PROGRESSO = "digitacao-pulo-progresso-v1";
const DISTANCIA = 220;
const LARGURA_CHIP = 124;

interface Chip {
  x: number;
  /** Andar de 0 (chão) a 3. */
  andar: number;
  palavra: string;
  virus: string | null;
}

type Etapa = "inicio" | "jogando" | "concluido" | "fim" | "vitoria";

interface Jogo {
  nivel: number;
  etapa: Etapa;
  chips: Chip[];
  atual: number;
  digitado: string;
  /** Segundos até o chip de baixo do Bit cair. */
  falha: number;
  vidas: number;
  quedas: number;
  pontos: number;
  acertosNivel: number;
  errosNivel: number;
  acertos: number;
  erros: number;
  msJogados: number;
  tremor: number;
  /** Última coisa que aconteceu com o Bit: decide a animação dele. */
  evento: "pulo" | "queda" | null;
}

/** Caminho novo a cada partida: palavras embaralhadas, andares sobem e descem no máximo um degrau. */
function montarCaminho(nivel: number): Chip[] {
  const dados = NIVEIS[nivel];
  let fila = embaralhar(dados.palavras);
  let andar = 1;
  return Array.from({ length: dados.chips + 1 }, (_, i) => {
    if (i > 0) andar = Math.max(0, Math.min(3, andar + Math.floor(Math.random() * 3) - 1));
    if (fila.length === 0) fila = embaralhar(dados.palavras);
    const palavra = i === 0 ? "" : fila.pop()!;
    const temVirus = i > 1 && i < dados.chips && Math.random() < dados.chanceVirus;
    return { x: i * DISTANCIA, andar, palavra, virus: temVirus ? sortear(VIRUS) : null };
  });
}

function novoNivel(nivel: number, anterior?: Jogo): Jogo {
  return {
    nivel,
    etapa: "inicio",
    chips: montarCaminho(nivel),
    atual: 0,
    digitado: "",
    falha: NIVEIS[nivel].falha,
    vidas: VIDAS,
    quedas: 0,
    pontos: anterior?.pontos ?? 0,
    acertosNivel: 0,
    errosNivel: 0,
    acertos: anterior?.acertos ?? 0,
    erros: anterior?.erros ?? 0,
    msJogados: anterior?.msJogados ?? 0,
    tremor: 0,
    evento: null,
  };
}

/** O que digitar agora: o vírus do próximo chip, se houver, senão a palavra dele. */
function alvoDe(j: Jogo) {
  const proximo = j.chips[j.atual + 1];
  if (!proximo) return null;
  return proximo.virus ? { tipo: "virus" as const, palavra: proximo.virus } : { tipo: "chip" as const, palavra: proximo.palavra };
}

const baseChip = (andar: number) => `${14 + andar * 13}%`;

export function PuloPage() {
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
      const falha = j.falha - dt;
      const msJogados = j.msJogados + dt * 1000;
      if (falha > 0) return { ...j, falha, msJogados };
      // O chip caiu: o Bit volta para o mesmo lugar num chip novo e perde uma vida.
      const vidas = j.vidas - 1;
      const base = { ...j, falha: NIVEIS[j.nivel].falha, vidas: Math.max(0, vidas), quedas: j.quedas + 1, digitado: "", msJogados, evento: "queda" as const };
      return vidas <= 0 ? { ...base, etapa: "fim" } : base;
    });
  });

  function aoCaractere(caractere: string) {
    definirJogo((j) => {
      if (j.etapa !== "jogando") return j;
      const alvo = alvoDe(j);
      if (!alvo) return j;
      if (alvo.palavra[j.digitado.length] !== caractere) {
        return { ...j, errosNivel: j.errosNivel + 1, erros: j.erros + 1, tremor: j.tremor + 1 };
      }
      const digitado = j.digitado + caractere;
      const base = { ...j, acertosNivel: j.acertosNivel + 1, acertos: j.acertos + 1, digitado };
      if (digitado !== alvo.palavra) return base;

      if (alvo.tipo === "virus") {
        const chips = j.chips.map((chip, i) => (i === j.atual + 1 ? { ...chip, virus: null } : chip));
        return { ...base, chips, digitado: "", pontos: j.pontos + 25 };
      }
      const atual = j.atual + 1;
      const pulou = { ...base, atual, evento: "pulo" as const, digitado: "", falha: NIVEIS[j.nivel].falha, pontos: j.pontos + alvo.palavra.length * 10 + Math.round(j.falha) };
      if (atual < j.chips.length - 1) return pulou;
      return { ...pulou, etapa: j.nivel === NIVEIS.length - 1 ? "vitoria" : "concluido" };
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
    definirJogo((j) => ({ ...j, etapa: "jogando", falha: NIVEIS[j.nivel].falha }));
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
    else if (jogo.etapa === "fim") irPara(jogo.nivel);
    else if (jogo.etapa === "vitoria") irPara(0);
  }

  const alvo = alvoDe(jogo);
  const chipAtual = jogo.chips[jogo.atual];
  const fracaoFalha = jogo.falha / dados.falha;
  const precisaoNivel = precisao(jogo.acertosNivel, jogo.errosNivel);
  const precisaoTotal = precisao(jogo.acertos, jogo.erros);
  const ppmTotal = ppm(jogo.acertos, jogo.msJogados);
  const chegada = jogo.chips.length - 1;

  return (
    <div className={estilos.pagina}>
      <TopoJogo
        titulo="Pulo das Palavras"
        icone="pulo"
        medidas={[
          { rotulo: "Pontos", valor: jogo.pontos },
          { rotulo: "Chip", valor: `${jogo.atual}/${chegada}` },
          { rotulo: "Precisão", valor: `${precisaoNivel}%` },
          { rotulo: "Palavras/min", valor: ppmTotal },
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
        className={estilos.placa}
        rotulo="Digite a palavra do próximo chip"
        aoCaractere={aoCaractere}
        aoComando={aoComando}
        aoMudarFoco={definirFocado}
        semAviso={jogo.etapa !== "jogando"}
      >
        <div className={estilos.trilhas} aria-hidden="true" style={{ backgroundPositionX: `${-chipAtual.x * 0.4}px` }} />
        {jogo.tremor > 0 && <span key={jogo.tremor} className={estilos.erro} aria-hidden="true" />}

        <div className={estilos.zoom}>
        <div className={estilos.mundo} style={{ transform: `translateX(${-chipAtual.x + 90}px)` }}>
          {jogo.chips.map((chip, i) => {
            const proximo = i === jogo.atual + 1;
            const ehChegada = i === chegada;
            const classes = [
              estilos.chip,
              i < jogo.atual ? estilos.passado : "",
              i === jogo.atual ? estilos.atual : "",
              i === jogo.atual && fracaoFalha < 0.35 && jogo.etapa === "jogando" ? estilos.falhando : "",
              ehChegada ? estilos.chegada : "",
            ].join(" ");
            const feito = proximo && alvo?.tipo === "chip" ? jogo.digitado.length : 0;
            return (
              <div key={i} className={classes} style={{ left: chip.x, bottom: baseChip(chip.andar), width: LARGURA_CHIP }}>
                {i === jogo.atual && jogo.etapa === "jogando" && (
                  <span className={estilos.carga} aria-hidden="true">
                    <span style={{ width: `${fracaoFalha * 100}%` }} />
                  </span>
                )}
                {i > jogo.atual && chip.palavra && (
                  <span className={[estilos.palavra, proximo && !chip.virus ? estilos.palavraAlvo : ""].join(" ")}>
                    <b>{chip.palavra.slice(0, feito)}</b>
                    {chip.palavra.slice(feito)}
                  </span>
                )}
                {chip.virus && i > jogo.atual && (
                  <div className={[estilos.virus, proximo ? estilos.virusAlvo : ""].join(" ")}>
                    <span className={estilos.palavraVirus}>
                      <b>{proximo ? chip.virus.slice(0, jogo.digitado.length) : ""}</b>
                      {proximo ? chip.virus.slice(jogo.digitado.length) : chip.virus}
                    </span>
                    <span className={estilos.corpoVirus} aria-hidden="true" />
                  </div>
                )}
                {ehChegada && <span className={estilos.bandeira} aria-hidden="true" />}
              </div>
            );
          })}

          <div
            className={estilos.bit}
            style={{ left: chipAtual.x + LARGURA_CHIP / 2 - 24, bottom: `calc(${baseChip(chipAtual.andar)} + 26px)` }}
            aria-hidden="true"
          >
            <div key={`${jogo.atual}-${jogo.quedas}`} className={jogo.evento === "queda" ? estilos.volta : jogo.evento === "pulo" ? estilos.salto : ""}>
              <svg viewBox="0 0 48 56" width="48" height="56">
                <line x1="24" y1="2" x2="24" y2="10" className={estilos.antena} />
                <circle cx="24" cy="3" r="3" className={estilos.luz} />
                <rect x="6" y="10" width="36" height="28" rx="9" className={estilos.cabeca} />
                <rect x="11" y="15" width="26" height="17" rx="5" className={estilos.visor} />
                <circle cx="19" cy="23.5" r="3" className={estilos.olho} />
                <circle cx="29" cy="23.5" r="3" className={estilos.olho} />
                <rect x="13" y="40" width="22" height="10" rx="4" className={estilos.corpo} />
                <rect x="13" y="50" width="7" height="5" rx="2" className={estilos.pe} />
                <rect x="28" y="50" width="7" height="5" rx="2" className={estilos.pe} />
              </svg>
            </div>
          </div>
        </div>
        </div>

        {jogo.evento === "queda" && <p key={`q-${jogo.quedas}`} className={estilos.avisoQueda}>O chip caiu! Menos uma vida.</p>}

        {jogo.etapa === "inicio" && (
          <QuadroJogo
            icone="pulo"
            titulo={`Nível ${jogo.nivel + 1}: ${dados.nome}`}
            texto={`${dados.dica} Digite a palavra do próximo chip para o Bit pular. O chip onde ele está cai em ${dados.falha} segundos: não demore!${dados.chanceVirus ? " Se um vírus aparecer, digite o nome dele primeiro." : ""}`}
            botoes={[{ rotulo: "Começar", icone: "seta-direita", acao: comecar, principal: true }]}
            atalho="ou aperte Enter"
          />
        )}
        {jogo.etapa === "concluido" && (
          <QuadroJogo
            icone="trofeu"
            titulo="O Bit chegou!"
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
            icone={jogo.etapa === "vitoria" ? "trofeu" : "pulo"}
            titulo={jogo.etapa === "vitoria" ? "O Bit atravessou a placa inteira!" : "Os chips caíram!"}
            texto={jogo.etapa === "vitoria" ? "Você venceu os 8 níveis." : "Comece a digitar assim que o Bit pousar: o tempo do chip já está correndo."}
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
