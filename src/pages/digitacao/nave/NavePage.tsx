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
import { ENERGIA_MAXIMA, FASES, VIDAS } from "./dados";
import {
  ALTURA,
  LARGURA,
  abrirTerminal,
  apagar,
  codigosDaFase,
  criarEstado,
  desenhar,
  digitar,
  fecharTerminal,
  multiplicador,
  passo,
  type Alerta,
  type Entrada,
  type Estado,
  type Terminal,
} from "./motor";
import estilos from "./NavePage.module.css";

const JOGO_ID = "digitacao-nave";
const CHAVE_PROGRESSO = "digitacao-nave-progresso-v1";

type Etapa = "inicio" | "jogando" | "concluida" | "fim" | "vitoria";

/** O que a tela do React mostra; o resto do estado fica só no motor. */
interface Resumo {
  vidas: number;
  pontos: number;
  energia: number;
  multiplicador: number;
  arma: number;
  alerta: Alerta | null;
  terminal: Terminal | null;
  aviso: string | null;
  efeitos: Estado["efeitos"];
  chefe: { nome: string; fracao: number } | null;
  abatidos: number;
  especiais: number;
  alertasPerdidos: number;
  acertos: number;
  erros: number;
  msDigitando: number;
}

const RESUMO_VAZIO: Resumo = {
  vidas: VIDAS,
  pontos: 0,
  energia: 30,
  multiplicador: 1,
  arma: 1,
  alerta: null,
  terminal: null,
  aviso: null,
  efeitos: { turbo: 0, escudo: 0, laser: 0, bomba: 0 },
  chefe: null,
  abatidos: 0,
  especiais: 0,
  alertasPerdidos: 0,
  acertos: 0,
  erros: 0,
  msDigitando: 0,
};

function resumir(e: Estado): Resumo {
  return {
    vidas: e.vidas,
    pontos: e.pontos,
    energia: e.energia,
    multiplicador: multiplicador(e),
    arma: e.jogador.arma,
    alerta: e.alerta ? { ...e.alerta } : null,
    terminal: e.terminal ? { ...e.terminal } : null,
    aviso: e.aviso?.texto ?? null,
    efeitos: { ...e.efeitos },
    chefe: e.chefe ? { nome: FASES[e.fase].chefe, fracao: e.chefe.vida / e.chefe.vidaTotal } : null,
    abatidos: e.abatidos,
    especiais: e.especiais,
    alertasPerdidos: e.alertasPerdidos,
    acertos: e.acertos,
    erros: e.erros,
    msDigitando: e.msDigitando,
  };
}

const MAPA_SETAS: Record<Seta, keyof Omit<Entrada, "alvo">> = { ArrowLeft: "esquerda", ArrowRight: "direita", ArrowUp: "cima", ArrowDown: "baixo" };
const SEM_ENTRADA = (): Entrada => ({ esquerda: false, direita: false, cima: false, baixo: false, alvo: null });

export function NavePage() {
  useEntrarEmTelaImersiva();

  const [progresso, definirProgresso] = useState<Progresso>(() => lerProgresso(CHAVE_PROGRESSO));
  const [fase, definirFase] = useState(() => lerProgresso(CHAVE_PROGRESSO).liberado);
  const [etapa, definirEtapa] = useState<Etapa>("inicio");
  const [resumo, definirResumo] = useState<Resumo>(RESUMO_VAZIO);
  const [focado, definirFocado] = useState(true);
  const [errou, definirErrou] = useState(0);
  /** Números das fases já vencidas nesta partida (para o ranking somar o jogo inteiro). */
  const [acumulado, definirAcumulado] = useState({ pontos: 0, acertos: 0, erros: 0, msDigitando: 0 });

  const estadoRef = useRef<Estado | null>(null);
  const entradaRef = useRef<Entrada>(SEM_ENTRADA());
  const telaRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<PalcoRef>(null);

  useLaco(etapa === "jogando" && focado, (dt) => {
    const e = estadoRef.current;
    const ctx = telaRef.current?.getContext("2d");
    if (!e || !ctx) return;
    passo(e, dt, entradaRef.current);
    desenhar(ctx, e, entradaRef.current);
    definirResumo(resumir(e));
    if (e.situacao === "derrota") definirEtapa("fim");
    if (e.situacao === "vitoria") {
      const novo = comNivelConcluido(progresso, fase, estrelasPorPrecisao(precisao(e.acertos, e.erros)), FASES.length);
      salvarProgresso(CHAVE_PROGRESSO, novo);
      definirProgresso(novo);
      definirEtapa(fase === FASES.length - 1 ? "vitoria" : "concluida");
    }
  });

  function comecar(qual = fase, somar = false) {
    definirAcumulado((a) =>
      somar
        ? { pontos: a.pontos + resumo.pontos, acertos: a.acertos + resumo.acertos, erros: a.erros + resumo.erros, msDigitando: a.msDigitando + resumo.msDigitando }
        : { pontos: 0, acertos: 0, erros: 0, msDigitando: 0 },
    );
    estadoRef.current = criarEstado(qual);
    entradaRef.current = SEM_ENTRADA();
    definirFase(qual);
    definirResumo(RESUMO_VAZIO);
    definirEtapa("jogando");
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
    if (!e || etapa !== "jogando") return;
    if (!digitar(e, caractere)) definirErrou((n) => n + 1);
    definirResumo(resumir(e));
  }

  function aoComando(tecla: "Enter" | "Escape" | "Backspace") {
    const e = estadoRef.current;
    if (etapa === "jogando" && e) {
      if (tecla === "Enter") {
        if (e.terminal) fecharTerminal(e);
        else abrirTerminal(e);
      }
      else if (tecla === "Escape") fecharTerminal(e);
      else apagar(e);
      definirResumo(resumir(e));
      return;
    }
    if (tecla !== "Enter") return;
    if (etapa === "inicio") comecar();
    else if (etapa === "concluida") comecar(fase + 1, true);
    else if (etapa === "fim") comecar(fase);
    else if (etapa === "vitoria") comecar(0);
  }

  function abrirPeloBotao() {
    const e = estadoRef.current;
    if (!e || etapa !== "jogando") return;
    abrirTerminal(e);
    definirResumo(resumir(e));
    palcoRef.current?.focar();
  }

  function aoMudarFoco(valor: boolean) {
    definirFocado(valor);
    if (!valor) entradaRef.current = SEM_ENTRADA();
  }

  // Mouse ou dedo: arrastando sobre a tela, a nave vai atrás.
  function apontar(evento: PointerEvent<HTMLCanvasElement>) {
    if (evento.buttons === 0 && evento.pointerType === "mouse") return;
    const caixa = evento.currentTarget.getBoundingClientRect();
    entradaRef.current.alvo = { x: ((evento.clientX - caixa.left) / caixa.width) * LARGURA, y: ((evento.clientY - caixa.top) / caixa.height) * ALTURA - 40 };
  }

  const dados = FASES[fase];
  const codigos = codigosDaFase(fase);
  const total = {
    pontos: acumulado.pontos + resumo.pontos,
    acertos: acumulado.acertos + resumo.acertos,
    erros: acumulado.erros + resumo.erros,
    msDigitando: acumulado.msDigitando + resumo.msDigitando,
  };
  const precisaoFase = precisao(resumo.acertos, resumo.erros);
  const precisaoTotal = precisao(total.acertos, total.erros);
  const ppmTotal = ppm(total.acertos, total.msDigitando);
  const { alerta, terminal } = resumo;
  const minuscula = (texto: string) => texto.toLocaleLowerCase("pt-BR");
  const candidatos = terminal ? codigos.filter((c) => minuscula(c.codigo).startsWith(minuscula(terminal.digitado))) : [];
  const ativos = (["turbo", "escudo", "laser"] as const).filter((chave) => resumo.efeitos[chave] > 0);

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

          <div className={estilos.energia}>
            <span>
              Energia <strong>{Math.floor(resumo.energia)}</strong>
            </span>
            <div className={estilos.barraEnergia}>
              <i style={{ transform: `scaleX(${resumo.energia / ENERGIA_MAXIMA})` }} />
            </div>
          </div>

          <h3 className={estilos.subtitulo}>Códigos de trapaça</h3>
          <ul className={estilos.codigos}>
            {codigos.map((c) => (
              <li key={c.id} className={resumo.energia >= c.custo ? estilos.pronto : ""}>
                <span className={estilos.nomeCodigo}>
                  {c.nome}
                  <small>{c.custo}</small>
                </span>
                <kbd>{c.codigo}</kbd>
                <span className={estilos.descricao}>{c.descricao}</span>
              </li>
            ))}
          </ul>

          <ul className={estilos.controles}>
            <li>
              <kbd>←</kbd>
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <kbd>→</kbd> pilotam (ou arraste com o mouse)
            </li>
            <li>
              <kbd>Enter</kbd> abre o terminal; digite o código; <kbd>Esc</kbd> fecha
            </li>
            <li>Alerta vermelho: digite a palavra antes do tempo acabar ou perde uma vida</li>
          </ul>
        </aside>

        <div className={estilos.coluna}>
          <PalcoDigitacao
            ref={palcoRef}
            className={estilos.palco}
            rotulo="Pilote com as setas; Enter abre o terminal de códigos"
            aoCaractere={aoCaractere}
            aoComando={aoComando}
            aoSeta={(seta, apertada) => {
              entradaRef.current[MAPA_SETAS[seta]] = apertada;
            }}
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

            {etapa === "jogando" && (
              <div className={estilos.hud} aria-hidden="true">
                <span className={estilos.mini}>
                  <i style={{ transform: `scaleX(${resumo.energia / ENERGIA_MAXIMA})` }} />
                </span>
                <span>Arma {resumo.arma}</span>
                {resumo.multiplicador > 1 && <b className={estilos.combo}>×{resumo.multiplicador}</b>}
                {ativos.map((chave) => (
                  <span key={chave} className={estilos.efeito}>
                    {chave} {Math.ceil(resumo.efeitos[chave])}s
                  </span>
                ))}
              </div>
            )}

            {resumo.chefe && (
              <div className={estilos.chefe}>
                <span>{resumo.chefe.nome}</span>
                <div className={estilos.vidaChefe}>
                  <i style={{ transform: `scaleX(${resumo.chefe.fracao})` }} />
                </div>
              </div>
            )}

            {errou > 0 && <span key={errou} className={estilos.erro} aria-hidden="true" />}

            {resumo.aviso && etapa === "jogando" && (
              <p key={resumo.aviso} className={estilos.aviso}>
                {resumo.aviso}
              </p>
            )}

            {alerta && etapa === "jogando" && (
              <div className={estilos.alerta} role="status">
                <span className={estilos.chamada}>
                  <Icone nome="alerta" tamanho={16} />
                  Pane! Digite:
                </span>
                <span className={estilos.palavra}>
                  {alerta.palavra.split("").map((letra, i) => (
                    <span key={i} className={i < alerta.digitado.length ? estilos.feita : i === alerta.digitado.length ? estilos.proxima : ""}>
                      {letra}
                    </span>
                  ))}
                </span>
                <span className={estilos.relogio}>
                  <i style={{ transform: `scaleX(${alerta.restante / alerta.total})` }} className={alerta.restante / alerta.total < 0.3 ? estilos.acabando : ""} />
                </span>
              </div>
            )}

            {terminal && etapa === "jogando" && (
              <div className={estilos.terminal} role="status">
                <p className={estilos.linha}>
                  <span className={estilos.prompt}>&gt;</span>
                  {terminal.digitado}
                  <span className={estilos.cursor} />
                </p>
                <ul className={estilos.sugestoes}>
                  {candidatos.map((c) => (
                    <li key={c.id} className={resumo.energia >= c.custo ? "" : estilos.semEnergia}>
                      <span>
                        <b>{c.codigo.slice(0, terminal.digitado.length)}</b>
                        {c.codigo.slice(terminal.digitado.length)}
                      </span>
                      <small>
                        {c.nome} · {c.custo}
                      </small>
                    </li>
                  ))}
                </ul>
                <span className={estilos.relogio}>
                  <i style={{ transform: `scaleX(${terminal.restante / terminal.total})` }} />
                </span>
              </div>
            )}

            {etapa === "inicio" && (
              <QuadroJogo
                icone="raio"
                titulo={`Fase ${fase + 1}: ${dados.nome}`}
                texto={`${dados.dica} No fim, o chefe ${dados.chefe}.`}
                botoes={[{ rotulo: "Decolar", icone: "seta-direita", acao: () => comecar(), principal: true }]}
                atalho="ou aperte Enter. Setas pilotam; Enter abre o terminal de códigos."
              />
            )}
            {etapa === "concluida" && (
              <QuadroJogo
                icone="trofeu"
                titulo={`${dados.chefe} derrotado!`}
                estrelas={estrelasPorPrecisao(precisaoFase)}
                texto="3 estrelas: 97% de precisão nos códigos e alertas. 2 estrelas: 90% ou mais."
                medidas={[
                  { rotulo: "Pontos", valor: total.pontos.toLocaleString("pt-BR") },
                  { rotulo: "Especiais", valor: resumo.especiais },
                  { rotulo: "Abatidos", valor: resumo.abatidos },
                  { rotulo: "Panes perdidas", valor: resumo.alertasPerdidos },
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
                    : "Encha a energia abatendo inimigos e use os códigos: o terminal deixa o jogo em câmera lenta."
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

          {etapa === "jogando" && (
            <button type="button" className={estilos.botaoTerminal} onClick={abrirPeloBotao}>
              <Icone nome="digitacao" tamanho={18} />
              Terminal de códigos (Enter)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
