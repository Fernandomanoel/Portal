import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { BotaoRecomecar } from "@/components/digitacao/BotaoRecomecar";
import { Icone } from "@/components/Icone";
import { PainelRanking } from "@/components/digitacao/PainelRanking";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { rotas } from "@/lib/rotas";
import { CenaSonic, type PoseSonic } from "./CenaSonic";
import { CONFIG, FASES, aneisDeOuro, podeAcessar, sortear } from "./dados";
import { comoDigitar } from "./teclado";
import { TecladoVirtual } from "./TecladoVirtual";
import estilos from "./SonicPage.module.css";

interface Resultado {
  precisao: number;
  ppm: number;
  aneisOuro: number;
}

interface Estado {
  fase: number;
  itens: string[];
  item: number;
  digitado: string;
  acertosFase: number;
  errosFase: number;
  inicioFase: number | null;
  fimFase: number | null;
  aneis: number;
  combo: number;
  melhorCombo: number;
  errosSeguidos: number;
  acertosTotais: number;
  errosTotais: number;
  conclusoes: Record<number, Resultado>;
}

const CHAVE_PROGRESSO = "digitacao-sonic-progresso-v1";

// Progresso fica só neste navegador: é conveniência de quem joga (voltar de
// onde parou), não registro oficial — o ranking é que guarda resultado.
function lerProgresso(): Pick<Estado, "conclusoes" | "aneis"> {
  try {
    const bruto = localStorage.getItem(CHAVE_PROGRESSO);
    if (bruto) {
      const salvo = JSON.parse(bruto) as Partial<Pick<Estado, "conclusoes" | "aneis">>;
      return { conclusoes: salvo.conclusoes ?? {}, aneis: salvo.aneis ?? 0 };
    }
  } catch {
    // sem acesso ao armazenamento: começa do zero
  }
  return { conclusoes: {}, aneis: 0 };
}

function salvarProgresso(estado: Pick<Estado, "conclusoes" | "aneis">) {
  try {
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify({ conclusoes: estado.conclusoes, aneis: estado.aneis }));
  } catch {
    // sem acesso ao armazenamento: o jogo continua, só não lembra depois
  }
}

function prepararFase(fase: number): Pick<Estado, "fase" | "itens" | "item" | "digitado" | "acertosFase" | "errosFase" | "inicioFase" | "fimFase"> {
  const { itens } = FASES[fase];
  return {
    fase,
    itens: sortear(itens, Math.min(CONFIG.itensPorFase, itens.length)),
    item: 0,
    digitado: "",
    acertosFase: 0,
    errosFase: 0,
    inicioFase: null,
    fimFase: null,
  };
}

function estadoInicial(): Estado {
  const progresso = lerProgresso();
  const primeiraAberta = FASES.findIndex((_, i) => !progresso.conclusoes[i]);
  return {
    ...prepararFase(primeiraAberta === -1 ? FASES.length - 1 : primeiraAberta),
    ...progresso,
    combo: 0,
    melhorCombo: 0,
    errosSeguidos: 0,
    acertosTotais: 0,
    errosTotais: 0,
  };
}

function precisao(acertos: number, erros: number) {
  const total = acertos + erros;
  return total === 0 ? 100 : Math.round((acertos / total) * 100);
}

/** Palavras por minuto (5 teclas = 1 palavra). Antes de 4 segundos o número não diz nada. */
function ppm(acertos: number, inicio: number | null, fim: number) {
  if (!inicio || fim - inicio < 4000) return null;
  return Math.min(999, Math.round(acertos / 5 / ((fim - inicio) / 60000)));
}

type Final = { precisao: number; ppm: number; teclas: number; aneis: number; melhorCombo: number; titulo: string; elogio: string };

export function SonicPage() {
  useEntrarEmTelaImersiva();

  const [estado, definirEstado] = useState<Estado>(estadoInicial);
  const [nivel, definirNivel] = useState(0);
  const [tropeco, definirTropeco] = useState(0);
  const [pulsoAneis, definirPulsoAneis] = useState(0);
  const [aneisVoando, definirAneisVoando] = useState<{ id: number; x: number; y: number }[]>([]);
  const [aviso, definirAviso] = useState<string | null>(null);
  const [focado, definirFocado] = useState(false);
  const [final, definirFinal] = useState<Final | null>(null);
  const [saindo, definirSaindo] = useState(false);
  const [agora, definirAgora] = useState(() => Date.now());

  const campoRef = useRef<HTMLInputElement>(null);
  const toquesRef = useRef<number[]>([]);
  const anelIdRef = useRef(0);
  const avisoRef = useRef<number | undefined>(undefined);

  const dadosFase = FASES[estado.fase];
  const alvo = estado.itens[estado.item] ?? "";
  const concluida = estado.fimFase !== null;
  const tonto = estado.errosSeguidos >= CONFIG.errosParaTonto;

  // Ritmo = teclas certas nos últimos segundos. É ele que dá a velocidade do Sonic.
  useEffect(() => {
    const id = window.setInterval(() => {
      const instante = Date.now();
      toquesRef.current = toquesRef.current.filter((t) => instante - t < CONFIG.janelaRitmoMs);
      const porSegundo = toquesRef.current.length / (CONFIG.janelaRitmoMs / 1000);
      let novo = 0;
      for (const faixa of CONFIG.faixasVelocidade) if (porSegundo >= faixa.min) novo = faixa.nivel;
      definirNivel(novo);
      definirAgora(instante);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  const focar = useCallback(() => campoRef.current?.focus(), []);

  useEffect(() => {
    focar();
  }, [estado.fase, focar]);

  function mostrarAviso(texto: string, duracao = 1600) {
    window.clearTimeout(avisoRef.current);
    definirAviso(texto);
    avisoRef.current = window.setTimeout(() => definirAviso(null), duracao);
  }

  function soltarAnel() {
    const id = anelIdRef.current++;
    definirAneisVoando((lista) => [...lista.slice(-12), { id, x: 20 + Math.random() * 8, y: 30 + Math.random() * 14 }]);
    window.setTimeout(() => definirAneisVoando((lista) => lista.filter((anel) => anel.id !== id)), 720);
    definirPulsoAneis((n) => n + 1);
  }

  function terminarJogo(e: Estado) {
    const resultados = Object.values(e.conclusoes);
    const precisaoGeral = precisao(e.acertosTotais, e.errosTotais);
    const melhorPpm = resultados.length ? Math.max(...resultados.map((r) => r.ppm)) : 0;
    let titulo = "Você chegou até o fim!";
    let elogio = "Repita as fases para ganhar mais anéis de ouro.";
    if (precisaoGeral >= 97 && melhorPpm >= 35) {
      titulo = "Lendário!";
      elogio = "Velocidade e precisão de campeão. O Sonic ficou para trás!";
    } else if (precisaoGeral >= 92 && melhorPpm >= 25) {
      titulo = "Excelente!";
      elogio = "Você digita rápido e quase sem erros.";
    } else if (precisaoGeral >= 85) {
      titulo = "Muito bem!";
      elogio = "Ótima precisão. Agora é só ganhar velocidade.";
    }
    definirSaindo(true);
    window.setTimeout(() => {
      definirFinal({
        precisao: precisaoGeral,
        ppm: melhorPpm,
        teclas: e.acertosTotais + e.errosTotais,
        aneis: e.aneis,
        melhorCombo: e.melhorCombo,
        titulo,
        elogio,
      });
    }, 1300);
  }

  /**
   * O campo fica sempre vazio: cada letra que chega é conferida e some. Letra
   * errada não entra no texto — a pessoa só tenta de novo, sem precisar apagar.
   */
  function receber(texto: string, instante: number) {
    if (!texto || concluida || final) return;
    let e = { ...estado, inicioFase: estado.inicioFase ?? instante };
    let ganhou = 0;
    let errou = false;

    for (const caractere of texto) {
      const esperado = alvo[e.digitado.length];
      if (esperado === undefined) break;
      if (caractere === esperado) {
        e = {
          ...e,
          digitado: e.digitado + caractere,
          acertosFase: e.acertosFase + 1,
          acertosTotais: e.acertosTotais + 1,
          combo: e.combo + 1,
          melhorCombo: Math.max(e.melhorCombo, e.combo + 1),
          errosSeguidos: 0,
          aneis: e.aneis + 1,
        };
        ganhou++;
        toquesRef.current.push(instante);
      } else {
        e = { ...e, errosFase: e.errosFase + 1, errosTotais: e.errosTotais + 1, combo: 0, errosSeguidos: e.errosSeguidos + 1 };
        errou = true;
        // Errar freia: metade do embalo vai embora.
        toquesRef.current = toquesRef.current.slice(Math.ceil(toquesRef.current.length / 2));
        break;
      }
    }

    if (e.digitado === alvo) {
      e = { ...e, aneis: e.aneis + 10 };
      if (e.item + 1 < e.itens.length) {
        e = { ...e, item: e.item + 1, digitado: "" };
        mostrarAviso("Boa! +10 anéis");
      } else {
        const resultado: Resultado = {
          precisao: precisao(e.acertosFase, e.errosFase),
          ppm: ppm(e.acertosFase, e.inicioFase, instante) ?? 0,
          aneisOuro: aneisDeOuro(precisao(e.acertosFase, e.errosFase)),
        };
        const anterior = e.conclusoes[e.fase];
        const melhor = anterior && anterior.aneisOuro > resultado.aneisOuro ? anterior : resultado;
        e = { ...e, fimFase: instante, conclusoes: { ...e.conclusoes, [e.fase]: melhor } };
        salvarProgresso(e);
        if (e.fase === FASES.length - 1) terminarJogo(e);
      }
    } else if (ganhou) {
      salvarProgresso(e);
    }

    definirEstado(e);
    if (ganhou) soltarAnel();
    if (errou) definirTropeco((n) => n + 1);
  }

  function irParaFase(indice: number) {
    if (!podeAcessar(estado.conclusoes, indice)) {
      mostrarAviso(`Termine a fase ${indice} primeiro.`, 2200);
      focar();
      return;
    }
    toquesRef.current = [];
    definirSaindo(false);
    definirEstado((e) => ({ ...e, ...prepararFase(indice), combo: 0, errosSeguidos: 0 }));
    focar();
  }

  function proximaFase() {
    if (!concluida) return;
    if (estado.fase === FASES.length - 1) {
      terminarJogo(estado);
      return;
    }
    irParaFase(estado.fase + 1);
  }

  function jogarDeNovo() {
    definirFinal(null);
    irParaFase(0);
  }

  const proximoCaractere = alvo[estado.digitado.length];
  const proximo = useMemo(() => (proximoCaractere ? comoDigitar(proximoCaractere) : []), [proximoCaractere]);

  let pose: PoseSonic = "parado";
  if (tonto) pose = "tonto";
  else if (nivel >= 3) pose = "bola";
  else if (nivel >= 1) pose = "correndo";

  const rotuloVelocidade = CONFIG.faixasVelocidade[nivel].rotulo;
  const ppmAtual = ppm(estado.acertosFase, estado.inicioFase, estado.fimFase ?? agora);
  const precisaoAtual = precisao(estado.acertosFase, estado.errosFase);
  const resultadoFase = estado.conclusoes[estado.fase];
  const feitas = Object.keys(estado.conclusoes).length;

  return (
    <div className={estilos.pagina}>
      <header className={estilos.topo}>
        <Link to={rotas.digitacao()} className={estilos.voltar}>
          <Icone nome="seta-esquerda" tamanho={18} />
          Voltar
        </Link>
        <h1 className={estilos.titulo}>
          <Icone nome="raio" tamanho={22} />
          Sonic Digital Pro
        </h1>
        <BotaoRecomecar chave={CHAVE_PROGRESSO} />
        <nav className={estilos.mapa} aria-label={`Fases: ${feitas} de ${FASES.length} concluídas`}>
          {FASES.map((f, i) => {
            const aberta = podeAcessar(estado.conclusoes, i);
            const classes = [
              estilos.fase,
              estado.conclusoes[i] ? estilos.faseFeita : "",
              i === estado.fase ? estilos.faseAtual : "",
              aberta ? "" : estilos.faseTrancada,
            ].join(" ");
            return (
              <button
                key={f.nome}
                type="button"
                className={classes}
                title={`Fase ${i + 1}: ${f.nome}${aberta ? "" : " (trancada)"}`}
                aria-current={i === estado.fase ? "step" : undefined}
                onClick={() => irParaFase(i)}
              >
                {aberta ? i + 1 : <Icone nome="cadeado" tamanho={14} />}
                {estado.conclusoes[i] && (
                  <span className={estilos.faseAneis} aria-label={`${estado.conclusoes[i].aneisOuro} de 3 anéis de ouro`}>
                    {[1, 2, 3].map((n) => (
                      <i key={n} className={n <= estado.conclusoes[i].aneisOuro ? estilos.pontoOuro : ""} />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>


      <CenaSonic
        nivel={saindo ? 4 : nivel}
        rotuloVelocidade={rotuloVelocidade}
        pose={saindo ? "bola" : pose}
        tropeco={tropeco}
        aneis={estado.aneis}
        pulsoAneis={pulsoAneis}
        aneisVoando={aneisVoando}
        chegada={concluida}
        saindo={saindo}
        aviso={tonto && !concluida ? "Calma! Olhe a tecla acesa no teclado." : aviso}
      />

      <main className={estilos.painel} onClick={focar}>
        <div className={estilos.cabecalhoFase}>
          <div>
            <h2>
              Fase {estado.fase + 1}: {dadosFase.nome}
              <span className={estilos.nivel}>{dadosFase.nivel}</span>
            </h2>
            <p>{dadosFase.dica}</p>
          </div>
        <div className={estilos.estatisticas}>
          <div>
            <strong>
              {estado.item + 1}/{estado.itens.length}
            </strong>
            <span>Frase</span>
          </div>
          <div>
            <strong>{precisaoAtual}%</strong>
            <span>Precisão</span>
          </div>
          <div>
            <strong>{ppmAtual ?? "—"}</strong>
            <span>Palavras/min</span>
          </div>
          <div>
            <strong>{estado.combo}</strong>
            <span>Sequência</span>
          </div>
        </div>
        </div>

        {concluida && resultadoFase ? (
          <section className={estilos.resultado} aria-live="polite">
            <h3>Fase {estado.fase + 1} concluída!</h3>
            <div className={estilos.aneisOuro} aria-label={`${aneisDeOuro(precisaoAtual)} de 3 anéis de ouro`}>
              {[1, 2, 3].map((n) => (
                <img key={n} src={CONFIG.anel} alt="" className={n <= aneisDeOuro(precisaoAtual) ? "" : estilos.anelApagado} />
              ))}
            </div>
            <p>
              Precisão <strong>{precisaoAtual}%</strong> · <strong>{ppmAtual ?? 0}</strong> palavras por minuto
            </p>
            <p className={estilos.dicaAneis}>3 anéis de ouro: 97% de precisão ou mais. 2 anéis: 90% ou mais.</p>
            <div className={estilos.botoes}>
              <button type="button" className={estilos.secundario} onClick={() => irParaFase(estado.fase)}>
                <Icone nome="recomecar" tamanho={18} />
                Repetir fase
              </button>
              <button type="button" className={estilos.primario} onClick={proximaFase}>
                {estado.fase === FASES.length - 1 ? "Ver resultado final" : "Próxima fase"}
                <Icone nome="seta-direita" tamanho={18} />
              </button>
            </div>
            <p className={estilos.atalho}>ou aperte Enter</p>
          </section>
        ) : (
          <>
            <div className={estilos.alvo} aria-label={`Digite: ${alvo}`}>
              {alvo.split("").map((ch, i) => {
                const classes = [estilos.ch];
                if (ch === " ") classes.push(estilos.espaco);
                if (i < estado.digitado.length) classes.push(estilos.feito);
                else if (i === estado.digitado.length) classes.push(estilos.atual, tropeco > 0 ? estilos.atualErro : "");
                return (
                  <span key={i === estado.digitado.length ? `atual-${tropeco}` : i} className={classes.join(" ")}>
                    {ch === " " ? " " : ch}
                  </span>
                );
              })}
              {!focado && !final && <span className={estilos.cliqueAqui}>Clique aqui para digitar</span>}
            </div>

            <TecladoVirtual proximo={proximo} errou={tropeco > 0} key={tropeco} />
          </>
        )}

        <input
          ref={campoRef}
          className={estilos.campo}
          aria-label="Campo de digitação"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onFocus={() => definirFocado(true)}
          onBlur={() => definirFocado(false)}
          onPaste={(evento) => evento.preventDefault()}
          onChange={(evento) => {
            const campo = evento.currentTarget;
            // Acento no Linux/Mac chega em composição: espera a letra final.
            if ((evento.nativeEvent as InputEvent).isComposing) return;
            receber(campo.value, Date.now());
            campo.value = "";
          }}
          onCompositionEnd={(evento) => {
            receber(evento.currentTarget.value, Date.now());
            evento.currentTarget.value = "";
          }}
          onKeyDown={(evento) => {
            if (evento.key === "Enter" && concluida) {
              evento.preventDefault();
              proximaFase();
            }
            if (evento.key === "Tab") evento.preventDefault();
          }}
        />
      </main>

      {final && (
        <div className={estilos.modal} role="dialog" aria-modal="true" aria-labelledby="titulo-final">
          <div className={estilos.modalCaixa}>
            <Icone nome="trofeu" tamanho={48} />
            <h2 id="titulo-final">{final.titulo} Você completou as {FASES.length} fases.</h2>
            <p>{final.elogio}</p>
            <div className={estilos.placar}>
              <div>
                <strong>{final.aneis}</strong>
                <span>Anéis</span>
              </div>
              <div>
                <strong>{final.precisao}%</strong>
                <span>Precisão</span>
              </div>
              <div>
                <strong>{final.ppm}</strong>
                <span>Melhor palavras/min</span>
              </div>
              <div>
                <strong>{final.melhorCombo}</strong>
                <span>Melhor sequência</span>
              </div>
              <div>
                <strong>{final.teclas}</strong>
                <span>Teclas digitadas</span>
              </div>
            </div>
            <p className={estilos.dicaFinal}>Treinar de 10 a 15 minutos por dia deixa a digitação muito mais rápida em poucas semanas.</p>
            <PainelRanking jogoId="digitacao-sonic" resultadoPendente={{ ppm: final.ppm, precisao: final.precisao }} somenteFormulario />
            <div className={estilos.botoes}>
              <button type="button" className={estilos.primario} onClick={jogarDeNovo}>
                <Icone nome="recomecar" tamanho={18} />
                Jogar de novo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
