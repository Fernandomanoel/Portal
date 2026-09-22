import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { PainelRanking } from "@/components/digitacao/PainelRanking";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { CONFIG, FASES, podeAcessar, sortear, type ModoSonic } from "./dados";
import estilos from "./SonicPage.module.css";

interface Conclusao {
  precisao: number;
  ppm: number;
  aneis: number;
}

interface EstadoJogo {
  faseAtual: number;
  itemAtual: number;
  digitado: string;
  aneis: number;
  combo: number;
  melhorCombo: number;
  errosSeguidos: number;
  acertosTotais: number;
  errosTotais: number;
  acertosFase: number;
  errosFase: number;
  inicioItem: number | null;
  inicioFase: number | null;
  conclusoes: Record<number, Conclusao>;
  itensDaFase: string[];
}

type Modal =
  | { tipo: "bloqueada"; indiceTentado: number }
  | { tipo: "final"; precisao: number; ppm: number; totalCaracteres: number; medalha: string; titulo: string; elogio: string; aneis: number; melhorCombo: number };

function novoEstadoFase(indice: number): Pick<EstadoJogo, "faseAtual" | "itensDaFase" | "itemAtual" | "inicioFase" | "acertosFase" | "errosFase" | "digitado" | "inicioItem"> {
  const fase = FASES[indice];
  return {
    faseAtual: indice,
    itensDaFase: sortear(fase.itens, Math.min(CONFIG.itensPorFase, fase.itens.length)),
    itemAtual: 0,
    inicioFase: null,
    acertosFase: 0,
    errosFase: 0,
    digitado: "",
    inicioItem: null,
  };
}

const ESTADO_INICIAL: EstadoJogo = {
  ...novoEstadoFase(0),
  aneis: 0,
  combo: 0,
  melhorCombo: 0,
  errosSeguidos: 0,
  acertosTotais: 0,
  errosTotais: 0,
  conclusoes: {},
};

function calcularPrecisao(acertos: number, erros: number): number {
  const total = acertos + erros;
  return total === 0 ? 100 : Math.round((acertos / total) * 100);
}

function calcularPPM(inicio: number | null, acertos: number, agoraMs: number): number {
  if (!inicio) return 0;
  const minutos = (agoraMs - inicio) / 60000;
  if (minutos <= 0) return 0;
  return Math.max(0, Math.min(Math.round(acertos / 5 / minutos), 999));
}

export function SonicPage() {
  useEntrarEmTelaImersiva();

  const [estado, definirEstado] = useState<EstadoJogo>(ESTADO_INICIAL);
  const [modoSonic, definirModoSonicState] = useState<ModoSonic>("normal");
  const [imagensQuebradas, definirImagensQuebradas] = useState<Record<string, boolean>>({});
  const [aneisVoando, definirAneisVoando] = useState<{ id: number; left: number; bottom: number }[]>([]);
  const [pulsaChave, definirPulsaChave] = useState(0);
  const [mensagem, definirMensagem] = useState<{ tipo: "sucesso" | "erro" | "aviso"; texto: string } | null>(null);
  const [modal, definirModal] = useState<Modal | null>(null);
  const [sumindo, definirSumindo] = useState(false);
  const [agora, definirAgora] = useState(() => Date.now());

  const campoRef = useRef<HTMLInputElement>(null);
  const proximoAnelId = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => definirAgora(Date.now()), 900);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    campoRef.current?.focus();
  }, [estado.faseAtual]);

  const fase = FASES[estado.faseAtual];
  const alvo = estado.itensDaFase[estado.itemAtual] || "";
  const precisaoFase = calcularPrecisao(estado.acertosFase, estado.errosFase);
  const ppmFase = useMemo(() => calcularPPM(estado.inicioFase, estado.acertosFase, agora), [estado.inicioFase, estado.acertosFase, agora]);

  let faixaVelocidade = CONFIG.faixasVelocidade[0];
  for (const f of CONFIG.faixasVelocidade) {
    if (estado.combo >= f.min) faixaVelocidade = f;
  }
  const maximoVelocidade = CONFIG.faixasVelocidade[CONFIG.faixasVelocidade.length - 1].min;
  const larguraBarraVelocidade = Math.min(100, (estado.combo / maximoVelocidade) * 100);

  function definirModoSonic(modo: ModoSonic) {
    definirModoSonicState((atual) => (atual === modo ? atual : modo));
  }

  useEffect(() => {
    if (estado.errosSeguidos >= CONFIG.errosParaSonicRealista) {
      definirModoSonic("realista");
    } else if (modoSonic === "realista" && estado.errosSeguidos === 0) {
      definirModoSonic("normal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.errosSeguidos]);

  function ganharAnel(quantidade = 1) {
    definirEstado((e) => ({ ...e, aneis: e.aneis + quantidade }));
    definirPulsaChave((n) => n + 1);
    const id = proximoAnelId.current++;
    const left = 35 + Math.random() * 30;
    const bottom = 28 + Math.random() * 18;
    definirAneisVoando((a) => [...a, { id, left, bottom }]);
    window.setTimeout(() => definirAneisVoando((a) => a.filter((x) => x.id !== id)), 950);
  }

  function carregarFase(indice: number, reiniciarProgresso = true) {
    definirEstado((e) => ({
      ...e,
      ...(reiniciarProgresso ? novoEstadoFase(indice) : { faseAtual: indice, digitado: "", inicioItem: null }),
    }));
    definirMensagem(null);
  }

  function concluirFase(estadoAtual: EstadoJogo): EstadoJogo {
    const precisao = calcularPrecisao(estadoAtual.acertosFase, estadoAtual.errosFase);
    const ppm = calcularPPM(estadoAtual.inicioFase, estadoAtual.acertosFase, Date.now());
    const conclusoes = { ...estadoAtual.conclusoes, [estadoAtual.faseAtual]: { precisao, ppm, aneis: estadoAtual.aneis } };

    if (estadoAtual.faseAtual === FASES.length - 1) {
      mostrarTelaFinal(estadoAtual, conclusoes, precisao, ppm);
    } else {
      definirMensagem({
        tipo: "sucesso",
        texto: `🏆 Fase ${estadoAtual.faseAtual + 1} concluída! Precisão ${precisao}% · ${ppm} palavras/min. Clique em "Próxima fase" para continuar.`,
      });
    }
    return { ...estadoAtual, conclusoes };
  }

  function mostrarTelaFinal(estadoAtual: EstadoJogo, conclusoes: Record<number, Conclusao>, precisaoUltima: number, ppmUltima: number) {
    void precisaoUltima;
    void ppmUltima;
    definirSumindo(true);
    const totalTeclas = estadoAtual.acertosTotais + estadoAtual.errosTotais;
    const precisao = calcularPrecisao(estadoAtual.acertosTotais, estadoAtual.errosTotais);
    const ppms = Object.values(conclusoes).map((c) => c.ppm);
    const ppm = ppms.length ? Math.max(...ppms) : 0;

    let medalha = "⭐";
    let titulo = "PARABÉNS!";
    let elogio = "Você chegou até o fim! Repita as fases para melhorar ainda mais.";
    if (precisao >= 97 && ppm >= 35) {
      medalha = "🥇";
      titulo = "LENDÁRIO!";
      elogio = "Velocidade e precisão de campeão. O Sonic ficou para trás!";
    } else if (precisao >= 92 && ppm >= 25) {
      medalha = "🥈";
      titulo = "EXCELENTE!";
      elogio = "Você digita rápido e com muita precisão. Impressionante!";
    } else if (precisao >= 85) {
      medalha = "🥉";
      titulo = "MUITO BEM!";
      elogio = "Ótima precisão! Agora é só ganhar mais velocidade.";
    }

    window.setTimeout(() => {
      definirModal({ tipo: "final", precisao, ppm, totalCaracteres: totalTeclas, medalha, titulo, elogio, aneis: estadoAtual.aneis, melhorCombo: estadoAtual.melhorCombo });
    }, 1500);
  }

  function aoDigitar(valor: string) {
    let { acertosTotais, errosTotais, acertosFase, errosFase, combo, errosSeguidos, melhorCombo, inicioItem, inicioFase } = estado;
    if (!inicioItem) inicioItem = Date.now();
    if (!inicioFase) inicioFase = Date.now();

    if (valor.length > estado.digitado.length) {
      const posicao = valor.length - 1;
      const acertou = valor[posicao] === alvo[posicao];
      if (acertou) {
        acertosTotais++;
        acertosFase++;
        combo++;
        errosSeguidos = 0;
        melhorCombo = Math.max(melhorCombo, combo);
        ganharAnel(1);
      } else {
        errosTotais++;
        errosFase++;
        combo = 0;
        errosSeguidos++;
      }
    }

    let novoEstado: EstadoJogo = {
      ...estado,
      digitado: valor,
      acertosTotais,
      errosTotais,
      acertosFase,
      errosFase,
      combo,
      errosSeguidos,
      melhorCombo,
      inicioItem,
      inicioFase,
    };

    if (valor === alvo) {
      ganharAnel(10);
      const itemAtual = estado.itemAtual + 1;
      if (itemAtual >= estado.itensDaFase.length) {
        novoEstado = concluirFase(novoEstado);
      } else {
        novoEstado = { ...novoEstado, itemAtual, digitado: "", inicioItem: null };
        definirMensagem({ tipo: "sucesso", texto: "✅ Boa! Próxima frase…" });
        window.setTimeout(() => definirMensagem(null), 1200);
      }
    }

    definirEstado(novoEstado);
  }

  function tentarIrParaFase(indice: number) {
    if (indice === estado.faseAtual) return;
    if (!podeAcessar(estado.conclusoes, indice)) {
      definirModoSonic("feio");
      definirModal({ tipo: "bloqueada", indiceTentado: indice });
      return;
    }
    carregarFase(indice);
  }

  function fecharModalBloqueada() {
    definirModal(null);
    definirModoSonic("normal");
    campoRef.current?.focus();
  }

  function proximaFase() {
    const proxima = estado.faseAtual + 1;
    if (proxima >= FASES.length) {
      if (estado.conclusoes[estado.faseAtual]) mostrarTelaFinal(estado, estado.conclusoes, precisaoFase, ppmFase);
      else definirMensagem({ tipo: "aviso", texto: "⏳ Termine todas as frases desta fase para ver o resultado final." });
      return;
    }
    if (!estado.conclusoes[estado.faseAtual]) {
      definirModoSonic("feio");
      definirModal({ tipo: "bloqueada", indiceTentado: proxima });
      return;
    }
    carregarFase(proxima);
  }

  function repetirFase() {
    definirEstado((e) => ({ ...e, combo: 0, errosSeguidos: 0 }));
    definirModoSonic("normal");
    carregarFase(estado.faseAtual);
  }

  function reiniciarJogo() {
    definirEstado(ESTADO_INICIAL);
    definirModoSonic("normal");
    definirSumindo(false);
    definirModal(null);
    definirMensagem(null);
  }

  const temErro = [...estado.digitado].some((c, i) => c !== alvo[i]);
  const totalCaracteresFases = FASES.reduce((t, f) => t + f.itens.length, 0);
  const feitas = Object.keys(estado.conclusoes).length;
  const spriteSrc = imagensQuebradas[modoSonic] ? null : CONFIG.imagens[modoSonic];

  return (
    <div className={estilos.pagina}>
      <header className={estilos.header}>
        <h1>💨 Sonic Digital Pro</h1>
        <p>Treino de digitação — quanto mais você acerta, mais anéis o Sonic ganha e mais rápido ele corre!</p>
      </header>

      <div className={estilos.progressoGeral}>
        <span style={{ width: `${(feitas / FASES.length) * 100}%` }} />
      </div>

      <div className={estilos.palco}>
        <div className={estilos.cena} data-velocidade={faixaVelocidade.nivel}>
          <div className={estilos.nuvens} />
          <div className={estilos.chao} />

          <div className={estilos.velocimetro}>
            <span className={estilos.rotulo}>{faixaVelocidade.rotulo}</span>
            <div className={estilos.barraVelocidade}>
              <span style={{ width: `${larguraBarraVelocidade}%` }} />
            </div>
          </div>

          <div className={`${estilos.sonicBox} ${imagensQuebradas[modoSonic] ? estilos.usarFallback : ""} ${sumindo ? estilos.sumindo : ""}`}>
            <span className={estilos.rastro} />
            <span className={estilos.rastro} />
            <span className={estilos.rastro} />
            {spriteSrc && (
              <img
                className={estilos.sonicSprite}
                src={spriteSrc}
                alt="Sonic correndo"
                onError={() => definirImagensQuebradas((i) => ({ ...i, [modoSonic]: true }))}
              />
            )}
            <div className={estilos.sonicFallback}>
              <span>{CONFIG.emojiFallback[modoSonic] || "🦔"}</span>
              <small>{modoSonic === "realista" ? "Devagar!" : modoSonic === "feio" ? "Ops!" : "Sonic"}</small>
            </div>
          </div>

          {aneisVoando.map((a) => (
            <img key={a.id} className={estilos.anelVoando} src={CONFIG.anel} alt="" style={{ left: `${a.left}%`, bottom: `${a.bottom}%` }} />
          ))}

          <div key={pulsaChave} className={`${estilos.contadorAneis} ${estilos.pulsa}`}>
            <img src={CONFIG.anel} alt="Anel" />
            <span>{estado.aneis}</span>
          </div>
        </div>

        <div className={estilos.painel}>
          <div className={estilos.cabecalhoFase}>
            <h2>
              <span>Fase {estado.faseAtual + 1} — {fase.nome}</span>
              <span className={estilos.etiquetaNivel}>{fase.nivel}</span>
            </h2>
            <p>{fase.dica}</p>
          </div>

          <div className={estilos.alvo}>
            {alvo.split("").map((ch, i) => {
              const classes = [estilos.ch];
              if (ch === " ") classes.push(estilos.espaco);
              if (i < estado.digitado.length) classes.push(estado.digitado[i] === ch ? estilos.ok : estilos.erroCh);
              else if (i === estado.digitado.length) classes.push(estilos.atualCh);
              return (
                <span key={i} className={classes.join(" ")}>
                  {ch}
                </span>
              );
            })}
          </div>

          <input
            ref={campoRef}
            className={temErro ? `${estilos.campo} ${estilos.errando}` : estilos.campo}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Digite aqui o texto acima…"
            disabled={!!modal}
            value={estado.digitado}
            onChange={(e) => aoDigitar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && estado.conclusoes[estado.faseAtual]) {
                e.preventDefault();
                proximaFase();
              }
              if (e.key === "Tab") e.preventDefault();
            }}
          />

          <div className={estilos.estatisticas}>
            <div className={estilos.estat}><div className={estilos.valor}>{Math.min(estado.itemAtual + 1, estado.itensDaFase.length)}/{estado.itensDaFase.length}</div><div className={estilos.nome}>Frase</div></div>
            <div className={estilos.estat}><div className={estilos.valor}>{precisaoFase}%</div><div className={estilos.nome}>Precisão</div></div>
            <div className={estilos.estat}><div className={estilos.valor}>{ppmFase}</div><div className={estilos.nome}>Palavras/min</div></div>
            <div className={estilos.estat}><div className={estilos.valor}>{estado.combo}</div><div className={estilos.nome}>Sequência</div></div>
          </div>

          {mensagem && <div className={`${estilos.mensagem} ${estilos.mostrar} ${estilos[mensagem.tipo]}`}>{mensagem.texto}</div>}

          <div className={estilos.botoes}>
            <button type="button" className={estilos.secundario} disabled={estado.faseAtual === 0} onClick={() => carregarFase(estado.faseAtual - 1)}>← Fase anterior</button>
            <button type="button" className={estilos.secundario} onClick={repetirFase}>↻ Repetir fase</button>
            <button type="button" onClick={proximaFase}>{estado.faseAtual === FASES.length - 1 ? "Ver resultado 🏁" : "Próxima fase →"}</button>
          </div>
        </div>
      </div>

      <div className={estilos.mapa}>
        <h3>🗺️ Mapa de fases <small>— {feitas} de {FASES.length} concluídas</small></h3>
        <div className={estilos.listaFases}>
          {FASES.map((f, i) => (
            <button
              key={f.nome}
              type="button"
              className={`${estilos.btnFase} ${estado.conclusoes[i] ? estilos.concluida : ""} ${i === estado.faseAtual ? estilos.atualFase : ""} ${!podeAcessar(estado.conclusoes, i) ? estilos.bloqueada : ""}`}
              title={f.nome}
              onClick={() => tentarIrParaFase(i)}
            >
              {i + 1}
              <small>{estado.conclusoes[i] ? "✔" : "•"}</small>
            </button>
          ))}
        </div>
      </div>

      <footer className={estilos.footer}>
        <Link to="/digitacao" className={estilos.botaoVoltar}>
          ← Voltar para Digitação
        </Link>
        <p>
          <strong>Sonic Digital Pro</strong> — treino de digitação · {FASES.length} fases · {totalCaracteresFases} palavras e frases no total
        </p>
      </footer>

      {modal && (
        <div className={`${estilos.modal} ${estilos.aberto}`}>
          <div className={estilos.modalCaixa}>
            {modal.tipo === "bloqueada" ? (
              <>
                <div className={estilos.emojiGigante}>😬</div>
                <h2>Opa! Essa fase ainda está trancada 🔒</h2>
                <p>
                  Você tentou pular para a <strong>fase {modal.indiceTentado + 1}</strong>, mas ainda não terminou a{" "}
                  <strong>fase {modal.indiceTentado}</strong>.
                </p>
                <p>Termine as fases em ordem — assim o treino funciona de verdade e o Sonic continua bonito! 😅</p>
                <div className={estilos.botoes}>
                  <button type="button" onClick={fecharModalBloqueada}>Ok, vou terminar a anterior!</button>
                </div>
              </>
            ) : (
              <>
                <div className={estilos.emojiGigante}>🏁</div>
                <h2>{modal.titulo} Você completou todas as fases!</h2>
                <div className={estilos.medalha}>{modal.medalha}</div>
                <p>{modal.elogio}</p>
                <p className={estilos.fraseFinal}>
                  "O Sonic correu tão rápido que sumiu no horizonte — e levou seus {modal.aneis} anéis com ele!" 💨
                </p>
                <div className={estilos.placarFinal}>
                  <div className={estilos.estat}><div className={estilos.valor}>{modal.aneis}</div><div className={estilos.nome}>Anéis</div></div>
                  <div className={estilos.estat}><div className={estilos.valor}>{modal.precisao}%</div><div className={estilos.nome}>Precisão</div></div>
                  <div className={estilos.estat}><div className={estilos.valor}>{modal.ppm}</div><div className={estilos.nome}>Melhor vel. (ppm)</div></div>
                  <div className={estilos.estat}><div className={estilos.valor}>{modal.melhorCombo}</div><div className={estilos.nome}>Melhor sequência</div></div>
                  <div className={estilos.estat}><div className={estilos.valor}>{FASES.length}</div><div className={estilos.nome}>Fases</div></div>
                  <div className={estilos.estat}><div className={estilos.valor}>{modal.totalCaracteres}</div><div className={estilos.nome}>Teclas digitadas</div></div>
                </div>
                <p><strong>Dica do Sonic:</strong> treinar 10 a 15 minutos por dia deixa a digitação muito mais rápida em poucas semanas!</p>
                <PainelRanking
                  jogoId="digitacao-sonic"
                  resultadoPendente={{ ppm: modal.ppm, precisao: modal.precisao }}
                  somenteFormulario
                />
                <div className={estilos.botoes}>
                  <button type="button" onClick={reiniciarJogo}>Jogar de novo 🔄</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
