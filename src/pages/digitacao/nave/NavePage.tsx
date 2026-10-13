import { useRef, useState, type PointerEvent } from "react";

import { Icone } from "@/components/Icone";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { MapaNiveis } from "../arcade/MapaNiveis";
import {
  comNivelConcluido,
  estrelasPorPrecisao,
  lerProgresso,
  ppm,
  precisao,
  salvarProgresso,
  useLaco,
  type Progresso,
} from "../arcade/motor";
import { PalcoDigitacao, type PalcoRef, type Seta } from "../arcade/PalcoDigitacao";
import { QuadroJogo } from "../arcade/QuadroJogo";
import { TopoJogo } from "../arcade/TopoJogo";
import { FASES, VIDAS } from "./dados";
import { ALTURA, LARGURA, criarEstado, desenhar, digitar, passo, type Entrada, type Estado, type Evento } from "./motor";
import estilos from "./NavePage.module.css";

const JOGO_ID = "digitacao-nave";
const CHAVE_PROGRESSO = "digitacao-nave-progresso-v1";

type Etapa = "inicio" | "jogando" | "concluida" | "fim" | "vitoria";

/** O que a tela do React mostra; o resto do estado fica só no motor. */
interface Resumo {
  vidas: number;
  pontos: number;
  evento: Evento | null;
  chefe: { nome: string; fracao: number } | null;
  abatidos: number;
  especiais: number;
  perdidos: number;
  acertos: number;
  erros: number;
  msDigitando: number;
}

const RESUMO_VAZIO: Resumo = { vidas: VIDAS, pontos: 0, evento: null, chefe: null, abatidos: 0, especiais: 0, perdidos: 0, acertos: 0, erros: 0, msDigitando: 0 };

function resumir(e: Estado): Resumo {
  return {
    vidas: e.vidas,
    pontos: e.pontos,
    evento: e.evento ? { ...e.evento } : null,
    chefe: e.chefe ? { nome: FASES[e.fase].chefe, fracao: e.chefe.vida / e.chefe.vidaTotal } : null,
    abatidos: e.abatidos,
    especiais: e.especiais,
    perdidos: e.perdidos,
    acertos: e.acertos,
    erros: e.erros,
    msDigitando: e.msDigitando,
  };
}

const MAPA_SETAS: Record<Seta, keyof Omit<Entrada, "alvo">> = { ArrowLeft: "esquerda", ArrowRight: "direita", ArrowUp: "cima", ArrowDown: "baixo" };

export function NavePage() {
  useEntrarEmTelaImersiva();

  const [progresso, definirProgresso] = useState<Progresso>(() => lerProgresso(CHAVE_PROGRESSO));
  const [fase, definirFase] = useState(() => lerProgresso(CHAVE_PROGRESSO).liberado);
  const [etapa, definirEtapa] = useState<Etapa>("inicio");
  const [resumo, definirResumo] = useState<Resumo>(RESUMO_VAZIO);
  const [focado, definirFocado] = useState(true);
  const [errou, definirErrou] = useState(0);
  /** Pontos e números do jogo inteiro, somando as fases já vencidas (para o ranking). */
  const [acumulado, definirAcumulado] = useState({ pontos: 0, acertos: 0, erros: 0, msDigitando: 0 });

  const estadoRef = useRef<Estado | null>(null);
  const entradaRef = useRef<Entrada>({ esquerda: false, direita: false, cima: false, baixo: false, alvo: null });
  const telaRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<PalcoRef>(null);

  useLaco(etapa === "jogando" && focado, (dt) => {
    const e = estadoRef.current;
    const ctx = telaRef.current?.getContext("2d");
    if (!e || !ctx) return;
    passo(e, dt, entradaRef.current);
    desenhar(ctx, e);
    definirResumo(resumir(e));
    if (e.situacao === "derrota") definirEtapa("fim");
    if (e.situacao === "vitoria") {
      const estrelas = estrelasPorPrecisao(precisao(e.acertos, e.erros));
      const novo = comNivelConcluido(progresso, fase, estrelas, FASES.length);
      salvarProgresso(CHAVE_PROGRESSO, novo);
      definirProgresso(novo);
      definirEtapa(fase === FASES.length - 1 ? "vitoria" : "concluida");
    }
  });

  function comecar(qual = fase, manterPontos = false) {
    if (manterPontos) {
      definirAcumulado((a) => ({
        pontos: a.pontos + resumo.pontos,
        acertos: a.acertos + resumo.acertos,
        erros: a.erros + resumo.erros,
        msDigitando: a.msDigitando + resumo.msDigitando,
      }));
    } else {
      definirAcumulado({ pontos: 0, acertos: 0, erros: 0, msDigitando: 0 });
    }
    estadoRef.current = criarEstado(qual, VIDAS, 0);
    definirFase(qual);
    definirResumo({ ...RESUMO_VAZIO, pontos: 0 });
    definirEtapa("jogando");
    entradaRef.current = { esquerda: false, direita: false, cima: false, baixo: false, alvo: null };
    palcoRef.current?.focar();
  }

  function escolherFase(qual: number) {
    estadoRef.current = null;
    definirFase(qual);
    definirEtapa("inicio");
    definirResumo(RESUMO_VAZIO);
    definirAcumulado({ pontos: 0, acertos: 0, erros: 0, msDigitando: 0 });
    palcoRef.current?.focar();
  }

  function aoCaractere(caractere: string) {
    const e = estadoRef.current;
    if (!e || etapa !== "jogando" || !e.evento) return;
    if (!digitar(e, caractere)) definirErrou((n) => n + 1);
    definirResumo(resumir(e));
  }

  function aoComando(tecla: "Enter" | "Escape" | "Backspace") {
    if (tecla !== "Enter") return;
    if (etapa === "inicio") comecar();
    else if (etapa === "concluida") comecar(fase + 1, true);
    else if (etapa === "fim") comecar(fase);
    else if (etapa === "vitoria") comecar(0);
  }

  function aoSeta(seta: Seta, apertada: boolean) {
    entradaRef.current[MAPA_SETAS[seta]] = apertada;
  }

  function aoMudarFoco(valor: boolean) {
    definirFocado(valor);
    if (!valor) entradaRef.current = { esquerda: false, direita: false, cima: false, baixo: false, alvo: null };
  }

  // Mouse ou dedo: arrastando sobre a tela, a nave vai atrás.
  function apontar(evento: PointerEvent<HTMLCanvasElement>) {
    if (evento.buttons === 0 && evento.pointerType === "mouse") return;
    const caixa = evento.currentTarget.getBoundingClientRect();
    entradaRef.current.alvo = { x: ((evento.clientX - caixa.left) / caixa.width) * LARGURA, y: ((evento.clientY - caixa.top) / caixa.height) * ALTURA - 40 };
  }

  const dados = FASES[fase];
  const total = {
    pontos: acumulado.pontos + resumo.pontos,
    acertos: acumulado.acertos + resumo.acertos,
    erros: acumulado.erros + resumo.erros,
    msDigitando: acumulado.msDigitando + resumo.msDigitando,
  };
  const precisaoFase = precisao(resumo.acertos, resumo.erros);
  const precisaoTotal = precisao(total.acertos, total.erros);
  const ppmTotal = ppm(total.acertos, total.msDigitando);
  const evento = resumo.evento;

  return (
    <div className={estilos.pagina}>
      <TopoJogo
        titulo="Esquadrão Hiper"
        icone="raio"
        medidas={[
          { rotulo: "Pontos", valor: total.pontos.toLocaleString("pt-BR") },
          { rotulo: "Fase", valor: `${fase + 1}/${FASES.length}` },
          { rotulo: "Especiais", valor: resumo.especiais },
          { rotulo: "Precisão", valor: `${precisaoFase}%` },
        ]}
      />

      <div className={estilos.barra}>
        <MapaNiveis niveis={FASES} atual={fase} progresso={progresso} aoEscolher={escolherFase} />
        <p className={estilos.vidas} aria-label={`${resumo.vidas} de ${VIDAS} vidas`}>
          {Array.from({ length: VIDAS }, (_, i) => (
            <span key={i} className={i < resumo.vidas ? estilos.vida : `${estilos.vida} ${estilos.vidaPerdida}`} />
          ))}
        </p>
      </div>

      <div className={estilos.area}>
        <aside className={estilos.lado}>
          <h2>{dados.nome}</h2>
          <p>{dados.dica}</p>
          <ul className={estilos.controles}>
            <li>
              <kbd>←</kbd>
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <kbd>→</kbd> movem a nave (ou arraste com o mouse)
            </li>
            <li>A nave atira sozinha</li>
            <li>Apareceu uma palavra? Digite antes do tempo acabar para soltar o especial</li>
            <li>Se o tempo acabar, você perde uma vida</li>
          </ul>
        </aside>

        <PalcoDigitacao
          ref={palcoRef}
          className={estilos.palco}
          rotulo="Mova a nave com as setas e digite a palavra do especial"
          aoCaractere={aoCaractere}
          aoComando={aoComando}
          aoSeta={aoSeta}
          aoMudarFoco={aoMudarFoco}
          semAviso={etapa !== "jogando"}
        >
          <canvas
            ref={telaRef}
            className={estilos.tela}
            width={LARGURA}
            height={ALTURA}
            onPointerDown={(evento) => {
              evento.currentTarget.setPointerCapture(evento.pointerId);
              apontar(evento);
            }}
            onPointerMove={apontar}
            onPointerUp={() => {
              entradaRef.current.alvo = null;
            }}
          />

          {resumo.chefe && (
            <div className={estilos.chefe}>
              <span>{resumo.chefe.nome}</span>
              <div className={estilos.vidaChefe}>
                <i style={{ transform: `scaleX(${resumo.chefe.fracao})` }} />
              </div>
            </div>
          )}

          {errou > 0 && <span key={errou} className={estilos.erro} aria-hidden="true" />}

          {evento && etapa === "jogando" && (
            <div className={estilos.evento} role="status">
              <span className={estilos.chamada}>
                <Icone nome="raio" tamanho={16} />
                Especial! Digite:
              </span>
              <span className={estilos.palavra}>
                {evento.palavra.split("").map((letra, i) => (
                  <span key={i} className={i < evento.digitado.length ? estilos.feita : i === evento.digitado.length ? estilos.proxima : ""}>
                    {letra === " " ? " " : letra}
                  </span>
                ))}
              </span>
              <span className={estilos.relogio}>
                <i style={{ width: `${(evento.restante / evento.total) * 100}%` }} className={evento.restante / evento.total < 0.3 ? estilos.acabando : ""} />
              </span>
            </div>
          )}

          {etapa === "inicio" && (
            <QuadroJogo
              icone="raio"
              titulo={`Fase ${fase + 1}: ${dados.nome}`}
              texto={`${dados.dica} No fim da fase, o chefe ${dados.chefe} pede palavras mais longas e mais seguidas.`}
              botoes={[{ rotulo: "Decolar", icone: "seta-direita", acao: () => comecar(), principal: true }]}
              atalho="ou aperte Enter. Setas movem a nave; letras soltam o especial."
            />
          )}
          {etapa === "concluida" && (
            <QuadroJogo
              icone="trofeu"
              titulo={`${dados.chefe} derrotado!`}
              estrelas={estrelasPorPrecisao(precisaoFase)}
              texto="3 estrelas: 97% de precisão nos especiais. 2 estrelas: 90% ou mais."
              medidas={[
                { rotulo: "Pontos", valor: total.pontos.toLocaleString("pt-BR") },
                { rotulo: "Especiais", valor: resumo.especiais },
                { rotulo: "Perdidos", valor: resumo.perdidos },
                { rotulo: "Abatidos", valor: resumo.abatidos },
              ]}
              botoes={[
                { rotulo: "Repetir fase", icone: "recomecar", acao: () => comecar(fase) },
                { rotulo: "Próxima fase", icone: "seta-direita", acao: () => comecar(fase + 1, true), principal: true },
              ]}
              atalho="ou aperte Enter"
            />
          )}
          {(etapa === "fim" || etapa === "vitoria") && (
            <QuadroJogo
              icone={etapa === "vitoria" ? "trofeu" : "raio"}
              titulo={etapa === "vitoria" ? "O Esquadrão venceu as 5 fases!" : "Nave abatida!"}
              texto={
                etapa === "vitoria"
                  ? "Você derrotou o Núcleo Mestre. Pilotagem e digitação de campeão!"
                  : "Assim que a palavra aparecer, tire os olhos dos tiros e digite: a câmera lenta é para isso."
              }
              medidas={[
                { rotulo: "Pontos", valor: total.pontos.toLocaleString("pt-BR") },
                { rotulo: "Precisão", valor: `${precisaoTotal}%` },
                { rotulo: "Palavras/min", valor: ppmTotal },
                { rotulo: "Especiais", valor: resumo.especiais },
              ]}
              ranking={total.acertos > 0 ? { jogoId: JOGO_ID, ppm: ppmTotal, precisao: precisaoTotal } : undefined}
              botoes={[
                {
                  rotulo: etapa === "vitoria" ? "Jogar do começo" : "Tentar de novo",
                  icone: "recomecar",
                  acao: () => comecar(etapa === "vitoria" ? 0 : fase),
                  principal: true,
                },
              ]}
            />
          )}
        </PalcoDigitacao>
      </div>
    </div>
  );
}
