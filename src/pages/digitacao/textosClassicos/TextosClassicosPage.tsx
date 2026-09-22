import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { PainelRanking } from "@/components/digitacao/PainelRanking";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import {
  ACENTOS,
  COM_SHIFT,
  EQUIVALENTES,
  faceDeAcerto,
  faceDeErro,
  FACES_CORRETO,
  LINHAS_TECLADO,
  NIVEIS,
  TECLAS_ESQUERDA,
  type TextoDigitacao,
} from "./dados";
import estilos from "./TextosClassicosPage.module.css";

interface EstadoJogo {
  pos: number;
  marcas: Array<"ok" | "erro" | undefined>;
  acertos: number;
  erros: number;
  combo: number;
  erroStreak: number;
  pontos: number;
  inicio: number | null;
  pausado: boolean;
  terminado: boolean;
}

interface EstadoReacao {
  imagem: string | null;
  texto: string;
  classe: "" | "ok" | "erro" | "premio";
  flash: "" | "flashOk" | "flashErro" | "flashPremio";
}

const ESTADO_INICIAL: EstadoJogo = {
  pos: 0,
  marcas: [],
  acertos: 0,
  erros: 0,
  combo: 0,
  erroStreak: 0,
  pontos: 0,
  inicio: null,
  pausado: false,
  terminado: false,
};

const REACAO_INICIAL: EstadoReacao = { imagem: null, texto: "comece a digitar…", classe: "", flash: "" };

function pontosDoAcerto(combo: number): number {
  return 10 + Math.min(combo, 20);
}

function precisaoDe(acertos: number, erros: number): number | null {
  const tentativas = acertos + erros;
  if (!tentativas) return null;
  return Math.round((acertos / tentativas) * 100);
}

function ppmDe(acertos: number, inicio: number | null, agora: number): number {
  if (!inicio) return 0;
  const segundos = (agora - inicio) / 1000;
  if (segundos < 2) return 0;
  return Math.max(0, Math.round(acertos / 5 / (segundos / 60)));
}

interface AlvoTecla {
  chave: string;
  classe: "alvo" | "alvoPasso1";
  ordem?: number;
}

function chaveDaTecla(t: { id?: string; base?: string }): string {
  return t.id ?? `base:${t.base}`;
}

/** Cada passo é uma tecla a apertar, na ordem — acento vira dois passos.
 *  Acende também o Shift correspondente, com a mão contrária à da tecla. */
function calcularAlvos(bruto: string | undefined): AlvoTecla[] {
  if (bruto === undefined) return [];
  const alvo = EQUIVALENTES[bruto] || bruto;
  const minuscula = alvo.toLowerCase();

  const passos: { base?: string; id?: string; shift?: boolean }[] = [];
  if (alvo === "\n") {
    passos.push({ id: "enter" });
  } else if (ACENTOS[minuscula]) {
    const [acento, letra] = ACENTOS[minuscula];
    if (COM_SHIFT[acento]) passos.push({ base: COM_SHIFT[acento], shift: true });
    else passos.push({ base: acento });
    passos.push({ base: letra, shift: alvo !== minuscula });
  } else if (COM_SHIFT[alvo]) {
    passos.push({ base: COM_SHIFT[alvo], shift: true });
  } else if (alvo !== minuscula) {
    passos.push({ base: minuscula, shift: true });
  } else {
    passos.push({ base: alvo });
  }

  const resultado: AlvoTecla[] = passos.map((passo, i) => ({
    chave: chaveDaTecla(passo),
    classe: passos.length > 1 && i === 0 ? "alvoPasso1" : "alvo",
    ordem: passos.length > 1 ? i + 1 : undefined,
  }));

  const passoComShift = passos.find((p) => p.shift);
  if (passoComShift) {
    const idShift = TECLAS_ESQUERDA.has(passoComShift.base ?? "") ? "shift-dir" : "shift-esq";
    resultado.push({ chave: idShift, classe: "alvoPasso1" });
  }

  return resultado;
}

export function TextosClassicosPage() {
  useEntrarEmTelaImersiva();

  const [nivelIndice, definirNivelIndice] = useState(0);
  const [textoIndice, definirTextoIndice] = useState(0);
  const textoAtual: TextoDigitacao = NIVEIS[nivelIndice].textos[textoIndice];

  const [estado, definirEstado] = useState<EstadoJogo>(ESTADO_INICIAL);
  const [reacao, definirReacao] = useState<EstadoReacao>(REACAO_INICIAL);
  const [tremerChave, definirTremerChave] = useState(0);
  const [agora, definirAgora] = useState(() => Date.now());

  const [modalTextosAberto, definirModalTextosAberto] = useState(false);
  const [modalAjudaAberto, definirModalAjudaAberto] = useState(false);
  const [opcoes, definirOpcoes] = useState({ teclado: true, maos: true, reacao: true });
  const [painelOpcoesAberto, definirPainelOpcoesAberto] = useState(false);
  const [painelCompletoAberto, definirPainelCompletoAberto] = useState(false);

  const capturaRef = useRef<HTMLInputElement>(null);

  // Cronômetro: recalcula PPM a cada segundo enquanto o jogo está rolando.
  useEffect(() => {
    if (estado.terminado || estado.pausado || estado.inicio === null) return;
    const id = window.setInterval(() => definirAgora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [estado.terminado, estado.pausado, estado.inicio]);

  const precisao = useMemo(() => precisaoDe(estado.acertos, estado.erros), [estado.acertos, estado.erros]);
  const ppm = useMemo(() => ppmDe(estado.acertos, estado.inicio, agora), [estado.acertos, estado.inicio, agora]);

  function focarCaptura() {
    if (!estado.terminado) capturaRef.current?.focus({ preventScroll: true });
  }

  function dispararReacao(tipo: "ok" | "erro", combo: number, erroStreak: number) {
    if (!opcoes.reacao) return;
    let src: string;
    let chave: "correto" | "erro" | "bateman" | "sabrina";
    let premio = false;
    if (tipo === "ok") {
      const r = faceDeAcerto(combo);
      src = r.src;
      chave = r.nivel;
      premio = r.nivel !== "correto";
    } else {
      src = faceDeErro(erroStreak);
      chave = "erro";
    }
    const frasesDoTipo = {
      correto: ["boa!", "isso aí!", "mandou bem!", "no ritmo!"],
      erro: ["ops!", "quase…", "atenção!", "de novo!"],
      bateman: ["em chamas!", "combo alto!", "tá voando!"],
      sabrina: ["PERFEITO!", "lendário!", "imparável!"],
    }[chave];
    const classe = tipo === "erro" ? "erro" : premio ? "premio" : "ok";
    const flash = tipo === "erro" ? "flashErro" : premio ? "flashPremio" : "flashOk";
    definirReacao({
      imagem: src,
      texto: frasesDoTipo[Math.floor(Math.random() * frasesDoTipo.length)],
      classe,
      flash,
    });
    definirTremerChave((n) => n + 1);
  }

  function digitarCaractere(caractere: string) {
    if (estado.pausado || estado.terminado) return;
    const inicio = estado.inicio ?? Date.now();

    const esperado = textoAtual.corpo[estado.pos];
    const bateu = caractere === esperado || caractere === EQUIVALENTES[esperado];
    const marcas = [...estado.marcas];
    let { acertos, erros, combo, erroStreak, pontos } = estado;

    if (bateu) {
      marcas[estado.pos] = "ok";
      acertos += 1;
      combo += 1;
      erroStreak = 0;
      pontos += pontosDoAcerto(combo);
    } else {
      marcas[estado.pos] = "erro";
      erros += 1;
      erroStreak += 1;
      combo = 0;
      pontos = Math.max(0, pontos - 5);
    }
    dispararReacao(bateu ? "ok" : "erro", combo, erroStreak);

    const pos = estado.pos + 1;
    const terminado = pos >= textoAtual.corpo.length;
    definirEstado({ ...estado, pos, marcas, acertos, erros, combo, erroStreak, pontos, inicio, terminado });
    if (terminado) definirAgora(Date.now());
  }

  function apagarCaractere() {
    if (estado.pausado || estado.terminado || estado.pos === 0) return;
    const marcas = [...estado.marcas];
    marcas[estado.pos - 1] = undefined;
    definirEstado({ ...estado, pos: estado.pos - 1, marcas });
  }

  function reiniciar() {
    definirEstado(ESTADO_INICIAL);
    definirReacao(REACAO_INICIAL);
    focarCaptura();
  }

  function escolherTexto(iNivel: number, iTexto: number) {
    definirNivelIndice(iNivel);
    definirTextoIndice(iTexto);
    definirModalTextosAberto(false);
    reiniciar();
  }

  function alternarPausa() {
    if (estado.terminado) return;
    definirEstado({ ...estado, pausado: !estado.pausado });
  }

  // Campo de captura: só ele entrega acentos já montados (´ + e = é) — é por
  // isso que a digitação não é lida por keydown.
  function aoDigitarNoCampo(valor: string) {
    if (capturaRef.current) capturaRef.current.value = "";
    for (const ch of valor) digitarCaractere(ch);
  }

  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (modalAjudaAberto || modalTextosAberto) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        apagarCaractere();
        return;
      }
      if (e.key === "Enter" && document.activeElement === capturaRef.current) {
        e.preventDefault();
        digitarCaractere("\n");
      }
    }
    function aoClicar(e: MouseEvent) {
      const alvo = e.target as HTMLElement;
      if (!alvo.closest("button, input, label, a, [data-modal]")) focarCaptura();
    }
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("click", aoClicar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("click", aoClicar);
    };
    // Sem lista de dependências de propósito: re-liga a cada render para que
    // os handlers sempre vejam o `estado` mais recente (evita fechos velhos).
  });

  const alvos =
    !estado.terminado && !estado.pausado ? calcularAlvos(textoAtual.corpo[estado.pos]) : [];

  return (
    <div className={estilos.pagina}>
      <nav className={estilos.migalha}>
        <Link to="/digitacao">digitação</Link>
        <span className={estilos.sep}>&gt;</span>
        <button type="button" className={estilos.linkTexto} onClick={() => definirModalTextosAberto(true)}>
          textos
        </button>
        <span className={estilos.sep}>&gt;</span>
        <span className={estilos.atualMigalha}>{NIVEIS[nivelIndice].nome}</span>
        <span className={estilos.sep}>&gt;</span>
        <span className={estilos.atualMigalha}>
          <em>{textoAtual.titulo}</em>
          {textoAtual.autor ? `, ${textoAtual.autor}` : ""}
        </span>
      </nav>

      <div className={estilos.palco}>
        <main className={estado.pausado ? `${estilos.cartao} ${estilos.pausado}` : estilos.cartao}>
          <div className={estilos.barraTopo}>
            <button type="button" className={estilos.btnTexto} onClick={() => definirModalTextosAberto(true)}>
              📚 <span>{textoAtual.titulo}</span> <span className={estilos.seta}>▾</span>
            </button>
            <div className={estilos.precisaoTopo}>
              precisão: <b>{precisao === null ? "—" : `${precisao}%`}</b>
            </div>
            <div className={estilos.contagem}>
              {estado.pos} de {textoAtual.corpo.length}
            </div>
            <div className={estilos.barraProgresso}>
              <span style={{ width: `${(estado.pos / textoAtual.corpo.length) * 100}%` }} />
            </div>
            <button type="button" className={estilos.iconeBtn} title="Reiniciar" aria-label="Reiniciar" onClick={reiniciar}>
              ↺
            </button>
            <button
              type="button"
              className={estilos.iconeBtn}
              title={estado.pausado ? "Continuar" : "Pausar"}
              aria-label={estado.pausado ? "Continuar" : "Pausar"}
              onClick={alternarPausa}
            >
              {estado.pausado ? "▶" : "⏸"}
            </button>
          </div>

          <div className={estilos.texto} aria-live="off">
            {textoAtual.corpo.split("").map((ch, i) => {
              const classes = [estilos.ch];
              if (ch === "\n") classes.push(estilos.quebra);
              if (i < estado.pos) classes.push(estado.marcas[i] === "erro" ? estilos.erro : estilos.ok);
              else if (i === estado.pos) classes.push(estilos.atual);
              else classes.push(estilos.pendente);
              return (
                <span key={i} className={classes.join(" ")}>
                  {ch}
                </span>
              );
            })}
          </div>

          <input
            ref={capturaRef}
            className={estilos.captura}
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Digite o texto mostrado acima"
            onChange={(e) => aoDigitarNoCampo(e.target.value)}
            onPaste={(e) => e.preventDefault()}
          />

          {estado.terminado && (
            <div className={estilos.fimAviso} role="status">
              🎉 Texto concluído! {estado.pontos} pontos · precisão de{" "}
              {precisao === null ? "—" : `${precisao}%`} · {ppm} palavras por minuto.
            </div>
          )}

          <div className={estilos.rodapeCartao}>
            <button
              type="button"
              className={painelOpcoesAberto ? `${estilos.linkToggle} ${estilos.aberto}` : estilos.linkToggle}
              onClick={() => definirPainelOpcoesAberto((v) => !v)}
            >
              <span className={estilos.seta}>▾</span> opções
            </button>
            <button type="button" className={estilos.btnAjuda} aria-label="Como funciona" onClick={() => definirModalAjudaAberto(true)}>
              ?
            </button>
            <button
              type="button"
              className={painelCompletoAberto ? `${estilos.linkToggle} ${estilos.empurra} ${estilos.aberto}` : `${estilos.linkToggle} ${estilos.empurra}`}
              onClick={() => definirPainelCompletoAberto((v) => !v)}
            >
              <span className={estilos.seta}>▾</span> texto completo para praticar
            </button>
          </div>

          {painelOpcoesAberto && (
            <div className={estilos.painel}>
              <div className={estilos.opcaoLinha}>
                <input
                  type="checkbox"
                  id="op-teclado"
                  checked={opcoes.teclado}
                  onChange={(e) => definirOpcoes({ ...opcoes, teclado: e.target.checked })}
                />
                <label htmlFor="op-teclado">Mostrar o teclado na tela</label>
              </div>
              <div className={estilos.opcaoLinha}>
                <input
                  type="checkbox"
                  id="op-maos"
                  checked={opcoes.maos}
                  onChange={(e) => definirOpcoes({ ...opcoes, maos: e.target.checked })}
                />
                <label htmlFor="op-maos">Mostrar as mãos em cima do teclado</label>
              </div>
              <div className={estilos.opcaoLinha}>
                <input
                  type="checkbox"
                  id="op-reacao"
                  checked={opcoes.reacao}
                  onChange={(e) => definirOpcoes({ ...opcoes, reacao: e.target.checked })}
                />
                <label htmlFor="op-reacao">Mostrar as reações a cada tecla</label>
              </div>
            </div>
          )}

          {painelCompletoAberto && (
            <div className={`${estilos.painel} ${estilos.textoCompletoBloco}`}>{textoAtual.corpo}</div>
          )}
        </main>

        <aside className={estilos.lateral}>
          {opcoes.reacao && (
            <div className={estilos.caixaRosto}>
              <div
                key={tremerChave}
                className={`${estilos.molduraRosto} ${reacao.flash ? estilos[reacao.flash] : ""} ${estilos.tremer}`}
              >
                {reacao.imagem ? (
                  <img
                    src={reacao.imagem}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FACES_CORRETO[FACES_CORRETO.length - 1];
                    }}
                  />
                ) : (
                  <span className={estilos.espera}>⌨️</span>
                )}
              </div>
              <div className={reacao.classe ? `${estilos.rostoStatus} ${estilos[reacao.classe]}` : estilos.rostoStatus}>
                {reacao.texto}
              </div>
            </div>
          )}

          <div className={estilos.placar}>
            <div className={estilos.placarItem}>
              <span className={estilos.rotulo}>pontos</span>
              <span className={`${estilos.valor} ${estilos.pontosValor}`}>{estado.pontos}</span>
            </div>
            <div className={estilos.placarItem}>
              <span className={estilos.rotulo}>combo</span>
              <span className={estado.combo >= 25 ? `${estilos.valor} ${estilos.comboQuente}` : estilos.valor}>
                {estado.combo}
              </span>
            </div>
            <div className={estilos.placarItem}>
              <span className={estilos.rotulo}>precisão</span>
              <span className={estilos.valor}>{precisao === null ? "—" : `${precisao}%`}</span>
            </div>
            <div className={estilos.placarItem}>
              <span className={estilos.rotulo}>palavras/min</span>
              <span className={estilos.valor}>{ppm}</span>
            </div>
          </div>
        </aside>
      </div>

      {opcoes.teclado && (
        <div className={estilos.tecladoArea}>
          <div className={estilos.tecladoMoldura}>
            <div className={estilos.teclado}>
              {LINHAS_TECLADO.map((linha, iLinha) => (
                <div key={iLinha} className={estilos.tecladoLinha}>
                  {linha.map((t, iTecla) => {
                    let classe = estilos.tecla;
                    if (t.largura) classe += ` ${estilos["larga" + t.largura]}`;
                    if (t.espaco) classe += ` ${estilos.espacoTecla}`;

                    const alvoDaTecla = alvos.find((a) => a.chave === chaveDaTecla(t));
                    if (alvoDaTecla) classe += ` ${estilos[alvoDaTecla.classe]}`;

                    return (
                      <div key={iTecla} className={classe} data-base={t.base} data-id={t.id}>
                        {t.cima && <span className={estilos.cima}>{t.cima}</span>}
                        <span>{t.rotulo !== undefined ? t.rotulo : t.base}</span>
                        {alvoDaTecla?.ordem !== undefined && (
                          <span className={estilos.ordem}>{alvoDaTecla.ordem}º</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {opcoes.maos && (
              <div className={estilos.maos}>
                <div className={`${estilos.mao} ${estilos.esquerda}`}>
                  <svg viewBox="0 0 200 230" fill="#f8d3bd" stroke="#3a3128" strokeWidth={4} strokeLinejoin="round">
                    <rect x="16" y="118" width="34" height="78" rx="17" transform="rotate(-32 33 157)" />
                    <rect x="47" y="78" width="26" height="118" rx="13" transform="rotate(-7 60 137)" />
                    <rect x="78" y="54" width="27" height="142" rx="13.5" />
                    <rect x="110" y="46" width="27" height="150" rx="13.5" />
                    <rect x="142" y="66" width="26" height="130" rx="13" transform="rotate(7 155 131)" />
                    <ellipse cx="98" cy="190" rx="62" ry="38" />
                  </svg>
                </div>
                <div className={`${estilos.mao} ${estilos.direita}`}>
                  <svg viewBox="0 0 200 230" fill="#f8d3bd" stroke="#3a3128" strokeWidth={4} strokeLinejoin="round">
                    <rect x="16" y="118" width="34" height="78" rx="17" transform="rotate(-32 33 157)" />
                    <rect x="47" y="78" width="26" height="118" rx="13" transform="rotate(-7 60 137)" />
                    <rect x="78" y="54" width="27" height="142" rx="13.5" />
                    <rect x="110" y="46" width="27" height="150" rx="13.5" />
                    <rect x="142" y="66" width="26" height="130" rx="13" transform="rotate(7 155 131)" />
                    <ellipse cx="98" cy="190" rx="62" ry="38" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <PainelRanking
        jogoId="digitacao-textos-classicos"
        resultadoPendente={estado.terminado ? { ppm, precisao: precisao ?? 100 } : null}
        somenteFormulario
      />

      {modalTextosAberto && (
        <div className={estilos.modalFundo} data-modal onClick={() => { definirModalTextosAberto(false); focarCaptura(); }}>
          <div className={`${estilos.modal} ${estilos.modalLargo}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className={estilos.modalTopo}>
              <h2>Escolha o texto</h2>
              <button type="button" className={estilos.fecharX} aria-label="Fechar" onClick={() => { definirModalTextosAberto(false); focarCaptura(); }}>
                ✕
              </button>
            </div>
            <p className={estilos.modalSub}>
              Os níveis vão do mais simples ao mais puxado. Dá para trocar de texto a qualquer momento.
            </p>
            {NIVEIS.map((nivel, iNivel) => (
              <section key={nivel.nome} className={estilos.nivel} style={{ ["--cor-nivel" as string]: nivel.cor }}>
                <div className={estilos.nivelCabecalho}>
                  <h3>{nivel.nome}</h3>
                  <p>{nivel.resumo}</p>
                </div>
                <div className={estilos.nivelGrade}>
                  {nivel.textos.map((texto, iTexto) => {
                    const palavras = texto.corpo.trim().split(/\s+/).length;
                    const escolhido = iNivel === nivelIndice && iTexto === textoIndice;
                    return (
                      <button
                        key={texto.titulo}
                        type="button"
                        className={escolhido ? `${estilos.cartaTexto} ${estilos.escolhido}` : estilos.cartaTexto}
                        onClick={() => escolherTexto(iNivel, iTexto)}
                      >
                        <span className={estilos.cartaTitulo}>{texto.titulo}</span>
                        {texto.autor && <span className={estilos.cartaAutor}>{texto.autor}</span>}
                        <span className={estilos.cartaMedida}>
                          {texto.corpo.length} caracteres · {palavras} palavras
                        </span>
                        <span className={estilos.cartaPrevia}>{texto.corpo.slice(0, 74).replace(/\n/g, " ")}…</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {modalAjudaAberto && (
        <div className={estilos.modalFundo} data-modal onClick={() => definirModalAjudaAberto(false)}>
          <div className={estilos.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h2>Como funciona</h2>
            <p>É só começar a digitar o texto que está na tela — não precisa clicar em nada antes.</p>
            <ul>
              <li>
                A tecla que você tem que apertar agora fica <b>acesa no teclado</b> de baixo.
              </li>
              <li>
                Letras com acento (á, ê, ã…) usam <b>duas teclas</b>: primeiro o acento, depois a letra.
              </li>
              <li>
                <b>Backspace</b> apaga e volta uma casa, caso queira corrigir.
              </li>
              <li>
                Cada acerto vale pontos, e acertos seguidos (o <b>combo</b>) valem cada vez mais.
              </li>
            </ul>
            <button type="button" onClick={() => definirModalAjudaAberto(false)}>
              Entendi
            </button>
          </div>
        </div>
      )}

      <footer className={estilos.rodapePagina}>
        <Link to="/digitacao" className={estilos.botaoVoltar}>
          ← Voltar para Digitação
        </Link>
      </footer>
    </div>
  );
}
