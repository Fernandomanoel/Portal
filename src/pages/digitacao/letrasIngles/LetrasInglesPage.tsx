import { useEffect, useMemo, useRef, useState } from "react";

import { PainelRanking } from "@/components/digitacao/PainelRanking";
import {
  ENSAIOS,
  FACES_CORRETO,
  TRILHA_SONORA,
  faceDeAcerto,
  faceDeErro,
} from "./dados";
import estilos from "./LetrasInglesPage.module.css";

type Tela = "mapa" | "jogo" | "resultado";

interface EstadoJogo {
  ensaioAtual: number;
  versoAtual: number;
  digitado: string;
  acertosEnsaio: number;
  errosEnsaio: number;
  combo: number;
  erroStreak: number;
  melhorCombo: number;
  inicioEnsaio: number | null;
}

interface EstadoReacao {
  imagem: string | null;
  texto: string;
  classe: "" | "correto" | "erro" | "recompensa";
  flash: "" | "flashCorreto" | "flashErro" | "flashRecompensa";
}

const ESTADO_INICIAL: EstadoJogo = {
  ensaioAtual: 0,
  versoAtual: 0,
  digitado: "",
  acertosEnsaio: 0,
  errosEnsaio: 0,
  combo: 0,
  erroStreak: 0,
  melhorCombo: 0,
  inicioEnsaio: null,
};

const REACAO_INICIAL: EstadoReacao = { imagem: null, texto: "Comece a digitar…", classe: "", flash: "" };
const CHAVE_SOM = "ingles-musica-som";

function lerPreferenciaSom(): { ligado: boolean; volume: number; aleatorio?: boolean; faixaAtual?: number } | null {
  try {
    return JSON.parse(window.localStorage.getItem(CHAVE_SOM) || "null");
  } catch {
    return null;
  }
}

function salvarPreferenciaSom(dados: { ligado: boolean; volume: number; aleatorio: boolean; faixaAtual: number | null }) {
  try {
    window.localStorage.setItem(CHAVE_SOM, JSON.stringify(dados));
  } catch {
    // sem localStorage: só não lembra a preferência
  }
}

function testarAudio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const a = new Audio();
    a.preload = "metadata";
    let terminou = false;
    const finalizar = (ok: boolean) => {
      if (terminou) return;
      terminou = true;
      a.src = "";
      a.load();
      resolve(ok);
    };
    a.addEventListener("loadedmetadata", () => finalizar(true));
    a.addEventListener("error", () => finalizar(false));
    a.src = src;
    setTimeout(() => finalizar(false), 9000);
  });
}

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

export function LetrasInglesPage() {
  const [tela, definirTela] = useState<Tela>("mapa");
  const [estado, definirEstado] = useState<EstadoJogo>(ESTADO_INICIAL);
  const [concluidos, definirConcluidos] = useState<Set<number>>(new Set());
  const [reacao, definirReacao] = useState<EstadoReacao>(REACAO_INICIAL);
  const [tremerChave, definirTremerChave] = useState(0);
  const [agora, definirAgora] = useState(() => Date.now());
  const [mensagem, definirMensagem] = useState("");

  const [musicaLigada, definirMusicaLigada] = useState(false);
  const [musicaVolume, definirMusicaVolume] = useState(0.55);
  const [musicaDisponivel, definirMusicaDisponivel] = useState<Record<number, boolean>>({});
  const [faixaAtual, definirFaixaAtual] = useState<number | null>(null);
  const [aleatorio, definirAleatorio] = useState(true);
  const [dicaSom, definirDicaSom] = useState("");

  const campoRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const disponivel: Record<number, boolean> = {};
      for (let i = 0; i < TRILHA_SONORA.length; i++) {
        disponivel[i] = await testarAudio(TRILHA_SONORA[i].audio);
      }
      if (cancelado) return;
      definirMusicaDisponivel(disponivel);
      const salvo = lerPreferenciaSom();
      if (salvo) {
        definirMusicaLigada(!!salvo.ligado);
        if (typeof salvo.volume === "number") definirMusicaVolume(salvo.volume);
        if (typeof salvo.aleatorio === "boolean") definirAleatorio(salvo.aleatorio);
        if (typeof salvo.faixaAtual === "number") definirFaixaAtual(salvo.faixaAtual);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (tela !== "jogo") return;
    const id = window.setInterval(() => definirAgora(Date.now()), 900);
    return () => window.clearInterval(id);
  }, [tela]);

  function faixasDisponiveis(disponivel: Record<number, boolean>): number[] {
    return TRILHA_SONORA.map((_, i) => i).filter((i) => disponivel[i]);
  }

  function sortearFaixa(disponivel: Record<number, boolean>, atual: number | null): number | null {
    const opcoes = faixasDisponiveis(disponivel);
    if (!opcoes.length) return null;
    const candidatos = atual !== null && opcoes.length > 1 ? opcoes.filter((i) => i !== atual) : opcoes;
    return candidatos[Math.floor(Math.random() * candidatos.length)];
  }

  function transicaoVolume(audio: HTMLAudioElement, alvo: number, ms: number, aoFim?: () => void) {
    const inicio = audio.volume;
    const t0 = performance.now();
    function passo(agoraMs: number) {
      const p = Math.min(1, (agoraMs - t0) / ms);
      audio.volume = Math.max(0, Math.min(1, inicio + (alvo - inicio) * p));
      if (p < 1) requestAnimationFrame(passo);
      else aoFim?.();
    }
    requestAnimationFrame(passo);
  }

  function pararAudio() {
    if (audioRef.current) {
      const antigo = audioRef.current;
      transicaoVolume(antigo, 0, 400, () => antigo.pause());
      audioRef.current = null;
    }
  }

  function iniciarFaixa(indice: number | null) {
    if (indice === null || !musicaDisponivel[indice]) return;
    pararAudio();
    const novo = new Audio(TRILHA_SONORA[indice].audio);
    novo.loop = true;
    novo.volume = 0;
    audioRef.current = novo;
    novo.play().then(() => transicaoVolume(novo, musicaVolume, 700)).catch(() => definirDicaSom("clique em 🔊 para liberar o som"));
  }

  function prepararAudioEnsaio() {
    const semAudio = faixasDisponiveis(musicaDisponivel).length === 0;
    if (semAudio) {
      definirDicaSom("áudio ainda não instalado");
      pararAudio();
      return;
    }
    let indice = faixaAtual;
    if (indice === null || !musicaDisponivel[indice]) {
      indice = sortearFaixa(musicaDisponivel, faixaAtual);
      definirFaixaAtual(indice);
    }
    if (musicaLigada) iniciarFaixa(indice);
  }

  useEffect(() => {
    if (musicaLigada && faixaAtual !== null) {
      definirDicaSom(`tocando: ${TRILHA_SONORA[faixaAtual].titulo}`);
    } else if (!musicaLigada) {
      definirDicaSom("música desligada");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicaLigada, faixaAtual]);

  function alternarSom() {
    const ligado = !musicaLigada;
    definirMusicaLigada(ligado);
    salvarPreferenciaSom({ ligado, volume: musicaVolume, aleatorio, faixaAtual });
    if (ligado) iniciarFaixa(faixaAtual);
    else pararAudio();
  }

  function mudarFaixa(valor: string) {
    if (valor === "aleatorio") {
      definirAleatorio(true);
      const nova = sortearFaixa(musicaDisponivel, faixaAtual);
      definirFaixaAtual(nova);
      salvarPreferenciaSom({ ligado: musicaLigada, volume: musicaVolume, aleatorio: true, faixaAtual: nova });
      if (musicaLigada) iniciarFaixa(nova);
    } else {
      const indice = Number(valor);
      definirAleatorio(false);
      definirFaixaAtual(indice);
      salvarPreferenciaSom({ ligado: musicaLigada, volume: musicaVolume, aleatorio: false, faixaAtual: indice });
      if (musicaLigada) iniciarFaixa(indice);
    }
  }

  function mudarVolume(valor: number) {
    definirMusicaVolume(valor);
    if (audioRef.current) audioRef.current.volume = valor;
    salvarPreferenciaSom({ ligado: musicaLigada, volume: valor, aleatorio, faixaAtual });
  }

  function dispararReacao(tipo: "correto" | "erro", combo: number, erroStreak: number) {
    let src: string;
    let chave: "correto" | "erro" | "bateman" | "sabrina";
    let ehRecompensa = false;
    if (tipo === "correto") {
      const r = faceDeAcerto(combo);
      src = r.src;
      chave = r.nivel;
      ehRecompensa = r.nivel !== "correto";
    } else {
      src = faceDeErro(erroStreak);
      chave = "erro";
    }
    const frasesDoTipo = {
      correto: ["Boa!", "Isso aí!", "Mandou bem!", "Sequência!"],
      erro: ["Ops!", "Quase…", "Tenta de novo!", "Foi por pouco!", "Presta atenção!"],
      bateman: ["Em chamas!", "Combo alto!", "Tá voando!"],
      sabrina: ["PERFEITO!", "Recompensa máxima!", "Lendário!"],
    }[chave];
    const classe = tipo === "erro" ? "erro" : ehRecompensa ? "recompensa" : "correto";
    const flash = tipo === "erro" ? "flashErro" : ehRecompensa ? "flashRecompensa" : "flashCorreto";
    definirReacao({ imagem: src, texto: frasesDoTipo[Math.floor(Math.random() * frasesDoTipo.length)], classe, flash });
    definirTremerChave((n) => n + 1);
  }

  function iniciarEnsaio(indice: number) {
    definirEstado({ ...ESTADO_INICIAL, ensaioAtual: indice });
    definirReacao(REACAO_INICIAL);
    definirMensagem("");
    definirTela("jogo");
    prepararAudioEnsaio();
    window.setTimeout(() => campoRef.current?.focus(), 0);
  }

  const ensaio = ENSAIOS[estado.ensaioAtual];
  const alvo = ensaio.versos[estado.versoAtual] || "";
  const ppm = useMemo(() => calcularPPM(estado.inicioEnsaio, estado.acertosEnsaio, agora), [estado.inicioEnsaio, estado.acertosEnsaio, agora]);
  const precisao = calcularPrecisao(estado.acertosEnsaio, estado.errosEnsaio);

  function concluirEnsaio(acertosEnsaio: number, errosEnsaio: number, melhorCombo: number, inicioEnsaio: number | null) {
    definirConcluidos((c) => new Set(c).add(estado.ensaioAtual));
    pararAudio();
    definirTela("resultado");
    void acertosEnsaio;
    void errosEnsaio;
    void melhorCombo;
    void inicioEnsaio;
  }

  function aoDigitar(valor: string) {
    let { acertosEnsaio, errosEnsaio, combo, erroStreak, melhorCombo, inicioEnsaio } = estado;
    if (!inicioEnsaio) inicioEnsaio = Date.now();

    if (valor.length > estado.digitado.length) {
      const posicao = valor.length - 1;
      const acertou = valor[posicao] === alvo[posicao];
      if (acertou) {
        acertosEnsaio++;
        combo++;
        erroStreak = 0;
        melhorCombo = Math.max(melhorCombo, combo);
        dispararReacao("correto", combo, erroStreak);
      } else {
        errosEnsaio++;
        combo = 0;
        erroStreak++;
        dispararReacao("erro", combo, erroStreak);
      }
    }

    if (valor === alvo) {
      let versoAtual = estado.versoAtual + 1;
      if (versoAtual >= ensaio.versos.length) {
        definirEstado({ ...estado, versoAtual, digitado: valor, acertosEnsaio, errosEnsaio, combo, erroStreak, melhorCombo, inicioEnsaio });
        concluirEnsaio(acertosEnsaio, errosEnsaio, melhorCombo, inicioEnsaio);
        return;
      }
      definirMensagem("✅ Boa! Próxima linha…");
      window.setTimeout(() => definirMensagem(""), 900);
      definirEstado({ ...estado, versoAtual, digitado: "", acertosEnsaio, errosEnsaio, combo, erroStreak, melhorCombo, inicioEnsaio });
      return;
    }

    definirEstado({ ...estado, digitado: valor, acertosEnsaio, errosEnsaio, combo, erroStreak, melhorCombo, inicioEnsaio });
  }

  const temErro = [...estado.digitado].some((c, i) => c !== alvo[i]);

  let medalha = "🎧";
  let tituloResultado = "Ensaio concluído!";
  let elogio = "Você digitou a letra inteira. Bom treino!";
  if (precisao >= 97 && ppm >= 30) {
    medalha = "🏆";
    tituloResultado = "PERFEITO!";
    elogio = "Precisão e velocidade de quem já manja de inglês e de teclado.";
  } else if (precisao >= 90 && ppm >= 20) {
    medalha = "🥈";
    tituloResultado = "MUITO BEM!";
    elogio = "Ótima digitação — continue treinando para ficar ainda mais rápido.";
  } else if (precisao >= 80) {
    medalha = "🥉";
    tituloResultado = "BOA!";
    elogio = "Você terminou o ensaio. Repita para melhorar a precisão.";
  }

  return (
    <div
      className={estilos.pagina}
      style={{
        ["--tema-a" as string]: ensaio.cores.a,
        ["--tema-b" as string]: ensaio.cores.b,
        ["--tema-acento" as string]: ensaio.cores.acento,
      }}
    >
      <header className={estilos.header}>
        <h1>🎤 Inglês em Letras de Música</h1>
        <p>Digite a letra em inglês enquanto ela toca — cada acerto e cada erro tem reação.</p>
        <div className={estilos.badge}>{concluidos.size} de {ENSAIOS.length} ensaios concluídos</div>
      </header>

      {tela === "mapa" && (
        <section className={estilos.tela}>
          <div className={estilos.ensaiosGrid}>
            {ENSAIOS.map((e, indice) => (
              <div
                key={e.tema}
                className={estilos.ensaioCard}
                style={{ ["--cor-a" as string]: e.cores.a, ["--cor-b" as string]: e.cores.b, ["--cor-acento" as string]: e.cores.acento }}
                onClick={() => iniciarEnsaio(indice)}
              >
                <div className={estilos.num}>{indice + 1}</div>
                <div className={estilos.temaNome}>{e.tema}</div>
                <h3>Ensaio {indice + 1}</h3>
                <div className={estilos.info}>{e.versos.length} linhas para digitar</div>
                {concluidos.has(indice) && <div className={estilos.concluido}>✓</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {tela === "jogo" && (
        <section className={estilos.tela}>
          <div className={estilos.jogoTopo}>
            <button type="button" className={estilos.voltarBtn} onClick={() => { pararAudio(); definirTela("mapa"); }}>
              ← Escolher outro ensaio
            </button>
            <div className={estilos.tituloEnsaio}>
              <span>Ensaio {estado.ensaioAtual + 1}</span>
              <span className={estilos.temaTag}>{ensaio.tema}</span>
            </div>
            <div className={estilos.musicaControles}>
              <button type="button" className={estilos.somBtn} title="Ligar/desligar música" disabled={Object.values(musicaDisponivel).every((v) => !v)} onClick={alternarSom}>
                {musicaLigada ? "🔊" : "🔇"}
              </button>
              <select
                className={estilos.seletorFaixa}
                title="Escolher música"
                disabled={Object.values(musicaDisponivel).every((v) => !v)}
                value={aleatorio ? "aleatorio" : String(faixaAtual)}
                onChange={(e) => mudarFaixa(e.target.value)}
              >
                <option value="aleatorio">🔀 Aleatório</option>
                {TRILHA_SONORA.map((faixa, i) => (
                  <option key={faixa.titulo} value={i} disabled={!musicaDisponivel[i]}>
                    {faixa.titulo}
                  </option>
                ))}
              </select>
              <input type="range" min={0} max={100} value={Math.round(musicaVolume * 100)} disabled={!musicaLigada} onChange={(e) => mudarVolume(Number(e.target.value) / 100)} />
              <span className={estilos.dicaSom}>{dicaSom}</span>
            </div>
          </div>

          <div className={estilos.jogoLayout}>
            <div className={estilos.jogoEsquerda}>
              <div className={estilos.hudReacao}>
                <div key={tremerChave} className={`${estilos.hudRostoCaixa} ${reacao.flash ? estilos[reacao.flash] : ""} ${estilos.tremer}`}>
                  <img
                    className={reacao.imagem ? "" : estilos.vazio}
                    src={reacao.imagem ?? undefined}
                    alt="Reação"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FACES_CORRETO[FACES_CORRETO.length - 1];
                    }}
                  />
                </div>
                <div className={estilos.hudRostoLegenda}>
                  <div className={estilos.hudRostoTitulo}>Reação</div>
                  <div className={reacao.classe ? `${estilos.hudRostoStatus} ${estilos[reacao.classe]}` : estilos.hudRostoStatus}>{reacao.texto}</div>
                </div>
              </div>

              <div className={estilos.statsGrid}>
                <div className={estilos.stat}><div className={estilos.valor}>{estado.versoAtual + 1}/{ensaio.versos.length}</div><div className={estilos.nome}>Linha</div></div>
                <div className={estilos.stat}><div className={estilos.valor}>{precisao}%</div><div className={estilos.nome}>Precisão</div></div>
                <div className={estilos.stat}><div className={estilos.valor}>{ppm}</div><div className={estilos.nome}>Palavras/min</div></div>
                <div className={estilos.stat}><div className={estilos.valor}>{estado.combo}</div><div className={estilos.nome}>Combo</div></div>
              </div>
            </div>

            <div className={estilos.jogoDireita}>
              <div className={estilos.progressoLinha}>
                <div className={estilos.progressoPreenchido} style={{ width: `${(estado.versoAtual / ensaio.versos.length) * 100}%` }} />
              </div>

              <div className={estilos.versoBox}>
                <div className={estilos.versoTexto}>
                  {alvo.split("").map((ch, i) => {
                    let classe = "";
                    if (i < estado.digitado.length) classe = estado.digitado[i] === ch ? estilos.ok : estilos.erroCh;
                    else if (i === estado.digitado.length) classe = estilos.atualCh;
                    return (
                      <span key={i} className={classe}>
                        {ch}
                      </span>
                    );
                  })}
                </div>
              </div>

              <input
                ref={campoRef}
                className={temErro ? `${estilos.campo} ${estilos.errando}` : estilos.campo}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="Digite a linha acima…"
                value={estado.digitado}
                onChange={(e) => aoDigitar(e.target.value)}
              />

              {mensagem && <div className={`${estilos.mensagem} ${estilos.mostrar} ${estilos.sucesso}`}>{mensagem}</div>}
            </div>
          </div>
        </section>
      )}

      {tela === "resultado" && (
        <section className={estilos.tela}>
          <div className={estilos.resultadoBox}>
            <div className={estilos.resultadoMedalha}>{medalha}</div>
            <div className={estilos.resultadoTitulo}>{tituloResultado}</div>
            <div className={estilos.resultadoElogio}>{elogio}</div>

            <div className={estilos.resultadoStats}>
              <div className={estilos.stat}><div className={estilos.valor}>{precisao}%</div><div className={estilos.nome}>Precisão</div></div>
              <div className={estilos.stat}><div className={estilos.valor}>{ppm}</div><div className={estilos.nome}>Palavras/min</div></div>
              <div className={estilos.stat}><div className={estilos.valor}>{estado.melhorCombo}</div><div className={estilos.nome}>Melhor combo</div></div>
            </div>

            <PainelRanking jogoId={`digitacao-letras-ingles-${estado.ensaioAtual}`} resultadoPendente={{ ppm, precisao }} />

            <div className={estilos.botoesFinal}>
              <button type="button" className={`${estilos.btn} ${estilos.btnSecundario}`} onClick={() => iniciarEnsaio(estado.ensaioAtual)}>🔁 Repetir este ensaio</button>
              <button type="button" className={`${estilos.btn} ${estilos.btnPrimario}`} onClick={() => definirTela("mapa")}>🎤 Escolher outro ensaio</button>
            </div>
          </div>
        </section>
      )}

      <footer className={estilos.footer}>
        <p><strong>Portal Educacional Interativo</strong> · Inglês — treino de digitação com letras de música</p>
      </footer>
    </div>
  );
}
