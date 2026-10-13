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
  /** Moedas no ar entre este chip e o próximo. */
  moedas: number;
}

type Etapa = "inicio" | "jogando" | "concluido" | "fim" | "vitoria";

interface Jogo {
  nivel: number;
  etapa: Etapa;
  chips: Chip[];
  atual: number;
  digitado: string;
  /** Folga, em segundos, entre o Bit e a onda de erros. */
  margem: number;
  vidas: number;
  quedas: number;
  pontos: number;
  combo: number;
  moedas: number;
  /** Último ganho, para o aviso flutuante. */
  ganho: { id: number; texto: string } | null;
  acertosNivel: number;
  errosNivel: number;
  acertos: number;
  erros: number;
  msJogados: number;
  tremor: number;
  /** Última coisa que aconteceu com o Bit: decide a animação dele. */
  evento: "pulo" | "queda" | null;
  /** Altura relativa do último pulo: decide se o Bit dá cambalhota. */
  salto: "sobe" | "desce" | "plano";
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
    const moedas = i < dados.chips && Math.random() < 0.7 ? 2 + Math.floor(Math.random() * 3) : 0;
    return { x: i * DISTANCIA, andar, palavra, virus: temVirus ? sortear(VIRUS) : null, moedas };
  });
}

function novoNivel(nivel: number, anterior?: Jogo): Jogo {
  return {
    nivel,
    etapa: "inicio",
    chips: montarCaminho(nivel),
    atual: 0,
    digitado: "",
    margem: NIVEIS[nivel].margem,
    vidas: VIDAS,
    quedas: 0,
    pontos: anterior?.pontos ?? 0,
    combo: 0,
    moedas: anterior?.moedas ?? 0,
    ganho: null,
    acertosNivel: 0,
    errosNivel: 0,
    acertos: anterior?.acertos ?? 0,
    erros: anterior?.erros ?? 0,
    msJogados: anterior?.msJogados ?? 0,
    tremor: 0,
    evento: null,
    salto: "plano",
  };
}

const multiplicador = (combo: number) => Math.min(5, 1 + Math.floor(combo / 3));

/** Folga que uma palavra devolve: palavras maiores dão mais fôlego. */
const folgaDaPalavra = (palavra: string, virus: boolean) => (virus ? 0 : 1.2) + palavra.length * 0.45;

/** O que digitar agora: o vírus do próximo chip, se houver, senão a palavra dele. */
function alvoDe(j: Jogo) {
  const proximo = j.chips[j.atual + 1];
  if (!proximo) return null;
  return proximo.virus ? { tipo: "virus" as const, palavra: proximo.virus } : { tipo: "chip" as const, palavra: proximo.palavra };
}

const baseChip = (andar: number) => `${14 + andar * 13}%`;

/** Moedas em arco entre um chip e o seguinte. */
function Moedas({ de, para, quantas }: { de: Chip; para: Chip; quantas: number }) {
  return (
    <>
      {Array.from({ length: quantas }, (_, k) => {
        const t = (k + 1) / (quantas + 1);
        const x = de.x + LARGURA_CHIP / 2 + (para.x - de.x) * t;
        const base = 14 + (de.andar + (para.andar - de.andar) * t) * 13;
        const arco = Math.sin(t * Math.PI) * 9;
        return <span key={k} className={estilos.moeda} style={{ left: x - 9, bottom: `${base + 16 + arco}%`, animationDelay: `${k * 120}ms` }} aria-hidden="true" />;
      })}
    </>
  );
}

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
      const margem = j.margem - dt * NIVEIS[j.nivel].onda;
      const msJogados = j.msJogados + dt * 1000;
      if (margem > 0) return { ...j, margem, msJogados };
      // A onda alcançou o Bit: ele escapa no mesmo chip, com folga parcial, e perde uma vida.
      const vidas = j.vidas - 1;
      const base = { ...j, margem: NIVEIS[j.nivel].margem * 0.6, vidas: Math.max(0, vidas), quedas: j.quedas + 1, combo: 0, digitado: "", msJogados, evento: "queda" as const };
      return vidas <= 0 ? { ...base, etapa: "fim" } : base;
    });
  });

  function aoCaractere(caractere: string) {
    definirJogo((j) => {
      if (j.etapa !== "jogando") return j;
      const alvo = alvoDe(j);
      if (!alvo) return j;
      if (alvo.palavra[j.digitado.length] !== caractere) {
        return { ...j, errosNivel: j.errosNivel + 1, erros: j.erros + 1, tremor: j.tremor + 1, combo: 0 };
      }
      const digitado = j.digitado + caractere;
      const base = { ...j, acertosNivel: j.acertosNivel + 1, acertos: j.acertos + 1, digitado };
      if (digitado !== alvo.palavra) return base;

      const mult = multiplicador(j.combo);
      const margem = Math.min(NIVEIS[j.nivel].margem, j.margem + folgaDaPalavra(alvo.palavra, alvo.tipo === "virus"));
      if (alvo.tipo === "virus") {
        const chips = j.chips.map((chip, i) => (i === j.atual + 1 ? { ...chip, virus: null } : chip));
        return { ...base, chips, margem, digitado: "", pontos: j.pontos + 25 * mult, ganho: { id: (j.ganho?.id ?? 0) + 1, texto: `+${25 * mult} vírus` } };
      }
      const atual = j.atual + 1;
      const moedas = j.chips[j.atual].moedas;
      const combo = j.combo + 1;
      const ganho = (alvo.palavra.length * 10 + moedas * 5) * multiplicador(combo);
      const andarDe = j.chips[j.atual].andar;
      const andarPara = j.chips[atual].andar;
      const pulou = {
        ...base,
        atual,
        combo,
        margem,
        moedas: j.moedas + moedas,
        evento: "pulo" as const,
        salto: andarPara > andarDe ? ("sobe" as const) : andarPara < andarDe ? ("desce" as const) : ("plano" as const),
        digitado: "",
        pontos: j.pontos + ganho,
        ganho: { id: (j.ganho?.id ?? 0) + 1, texto: `+${ganho}${multiplicador(combo) > 1 ? ` ×${multiplicador(combo)}` : ""}` },
      };
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
    definirJogo((j) => ({ ...j, etapa: "jogando", margem: NIVEIS[j.nivel].margem }));
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
  const perigo = 1 - Math.max(0, jogo.margem) / dados.margem;
  const assustado = jogo.etapa === "jogando" && perigo > 0.65;
  const mult = multiplicador(jogo.combo);
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
          { rotulo: "Moedas", valor: jogo.moedas },
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
        {jogo.etapa === "jogando" && <div className={estilos.velocidade} aria-hidden="true" />}
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
              ehChegada ? estilos.chegada : "",
            ].join(" ");
            const feito = proximo && alvo?.tipo === "chip" ? jogo.digitado.length : 0;
            return (
              <div key={i} className={classes} style={{ left: chip.x, bottom: baseChip(chip.andar), width: LARGURA_CHIP }}>
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

          {jogo.chips.map((chip, i) =>
            i >= jogo.atual && chip.moedas > 0 && jogo.chips[i + 1] ? <Moedas key={`m${i}`} de={chip} para={jogo.chips[i + 1]} quantas={chip.moedas} /> : null,
          )}

          <div
            className={estilos.bit}
            style={{ left: chipAtual.x + LARGURA_CHIP / 2 - 24, bottom: `calc(${baseChip(chipAtual.andar)} + 26px)` }}
            aria-hidden="true"
          >
            <div
              key={`${jogo.atual}-${jogo.quedas}`}
              className={jogo.evento === "queda" ? estilos.volta : jogo.evento === "pulo" ? `${estilos.salto} ${estilos[`salto-${jogo.salto}`]}` : ""}
            >
              <div className={[estilos.figura, jogo.etapa === "jogando" ? estilos.correndo : "", assustado ? estilos.assustado : ""].join(" ")}>
                <svg viewBox="0 0 56 64" width="56" height="64" overflow="visible">
                  <g className={estilos.bracoTras}>
                    <rect x="35" y="40" width="6" height="13" rx="3" className={estilos.braco} />
                  </g>
                  <g className={estilos.pernaTras}>
                    <rect x="27" y="50" width="8" height="12" rx="3.5" className={estilos.pe} />
                  </g>
                  <g className={estilos.pernaFrente}>
                    <rect x="17" y="50" width="8" height="12" rx="3.5" className={estilos.pe} />
                  </g>
                  <rect x="15" y="38" width="26" height="15" rx="5" className={estilos.corpo} />
                  <g className={estilos.bracoFrente}>
                    <rect x="13" y="40" width="6" height="13" rx="3" className={estilos.braco} />
                  </g>
                  <g className={estilos.cabecaGrupo}>
                    <line x1="28" y1="2" x2="28" y2="10" className={estilos.antena} />
                    <circle cx="28" cy="3" r="3" className={estilos.luz} />
                    <rect x="9" y="10" width="38" height="29" rx="10" className={estilos.cabeca} />
                    <rect x="14" y="15" width="28" height="18" rx="6" className={estilos.visor} />
                    <circle cx="23" cy="24" r={assustado ? 3.6 : 3} className={estilos.olho} />
                    <circle cx="35" cy="24" r={assustado ? 3.6 : 3} className={estilos.olho} />
                  </g>
                </svg>
              </div>
              {jogo.evento === "pulo" && (
                <span className={estilos.poeira} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>
          </div>
        </div>
        </div>

        <div
          className={estilos.onda}
          aria-hidden="true"
          style={{ transform: `translateX(${-100 + (jogo.etapa === "jogando" || jogo.etapa === "fim" ? 5 + perigo * 24 : 3)}%)` }}
        />
        {jogo.etapa === "jogando" && perigo > 0.6 && <span className={estilos.alarme} aria-hidden="true" />}

        {jogo.etapa === "jogando" && jogo.combo >= 2 && (
          <p className={estilos.combo} aria-live="off">
            Combo {jogo.combo}
            {mult > 1 && <b> ×{mult}</b>}
          </p>
        )}
        {jogo.ganho && <span key={jogo.ganho.id} className={estilos.ganho} aria-hidden="true">{jogo.ganho.texto}</span>}

        {jogo.evento === "queda" && <p key={`q-${jogo.quedas}`} className={estilos.avisoQueda}>A onda alcançou o Bit! Menos uma vida.</p>}

        {jogo.etapa === "inicio" && (
          <QuadroJogo
            icone="pulo"
            titulo={`Nível ${jogo.nivel + 1}: ${dados.nome}`}
            texto={`${dados.dica} Digite a palavra do próximo chip para o Bit pular. Uma onda de erros corre atrás dele: quanto mais rápido e certo você digita, mais ela fica para trás. Pegue as moedas e mantenha o combo!${dados.chanceVirus ? " Se um vírus aparecer, digite o nome dele primeiro." : ""}`}
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
            titulo={jogo.etapa === "vitoria" ? "O Bit atravessou a placa inteira!" : "A onda de erros pegou o Bit!"}
            texto={jogo.etapa === "vitoria" ? "Você venceu os 8 níveis." : "Não pare de digitar: palavras longas dão mais folga, e errar quebra o combo."}
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
