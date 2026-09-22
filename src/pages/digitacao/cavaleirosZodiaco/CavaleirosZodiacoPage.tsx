import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { PainelRanking } from "@/components/digitacao/PainelRanking";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import {
  CASAS,
  CENARIOS,
  IDIOMAS,
  LETRAS,
  POSES,
  caminhoSprite,
  proporcaoVidaVilao,
  versosDaCasa,
  type LetrasSalvas,
  type Pose,
} from "./dados";
import estilos from "./CavaleirosZodiacoPage.module.css";

type Tela = "inicio" | "batalha" | "casa" | "final";

interface ResultadoCasa {
  precisao: number;
  ppm: number;
  combo: number;
  erros: number;
}

interface EstadoJogo {
  casaAtual: number;
  versos: string[];
  versoAtual: number;
  digitado: string;
  errosNoVerso: number;
  vidaHeroi: number;
  vidaMaximaHeroi: number;
  vidaVilao: number;
  vidaMaximaVilao: number;
  combo: number;
  melhorCombo: number;
  acertosCasa: number;
  errosCasa: number;
  acertosTotais: number;
  errosTotais: number;
  melhorPPM: number;
  inicioCasa: number | null;
  resultados: Record<number, ResultadoCasa>;
  travado: boolean;
}

const ESTADO_INICIAL: EstadoJogo = {
  casaAtual: 0,
  versos: [],
  versoAtual: 0,
  digitado: "",
  errosNoVerso: 0,
  vidaHeroi: 3,
  vidaMaximaHeroi: 3,
  vidaVilao: 100,
  vidaMaximaVilao: 100,
  combo: 0,
  melhorCombo: 0,
  acertosCasa: 0,
  errosCasa: 0,
  acertosTotais: 0,
  errosTotais: 0,
  melhorPPM: 0,
  inicioCasa: null,
  resultados: {},
  travado: false,
};

const CHAVE_LETRAS = "zodiaco-letras";
const CHAVE_SOM = "zodiaco-som";
const CAMPOS_LETRA: Array<"PT" | "EN" | "JP"> = ["PT", "EN", "JP"];

function lerLetrasSalvas(): LetrasSalvas {
  try {
    return JSON.parse(window.localStorage.getItem(CHAVE_LETRAS) || "{}") || {};
  } catch {
    return {};
  }
}

function salvarLetras(dados: LetrasSalvas): boolean {
  try {
    window.localStorage.setItem(CHAVE_LETRAS, JSON.stringify(dados));
    return true;
  } catch {
    return false;
  }
}

function lerPreferenciaSom(): { ligado: boolean; volume: number } | null {
  try {
    return JSON.parse(window.localStorage.getItem(CHAVE_SOM) || "null");
  } catch {
    return null;
  }
}

function salvarPreferenciaSom(ligado: boolean, volume: number) {
  try {
    window.localStorage.setItem(CHAVE_SOM, JSON.stringify({ ligado, volume }));
  } catch {
    // navegador sem localStorage: só não lembra a preferência
  }
}

function testarImagem(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function testarAudio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const a = new Audio();
    a.preload = "metadata";
    let feito = false;
    const finalizar = (valor: boolean) => {
      if (feito) return;
      feito = true;
      resolve(valor);
    };
    a.addEventListener("loadedmetadata", () => finalizar(true));
    a.addEventListener("error", () => finalizar(false));
    a.src = src;
    setTimeout(() => finalizar(false), 4000);
  });
}

export function CavaleirosZodiacoPage() {
  useEntrarEmTelaImersiva();

  const [tela, definirTela] = useState<Tela>("inicio");
  const [estado, definirEstado] = useState<EstadoJogo>(ESTADO_INICIAL);
  const [letrasSalvas, definirLetrasSalvas] = useState<LetrasSalvas>({});
  const [spritesDisponiveis, definirSpritesDisponiveis] = useState<Record<string, boolean>>({});
  const [agora, definirAgora] = useState(() => Date.now());

  const [poseHeroi, definirPoseHeroi] = useState<Pose>("neutro");
  const [poseVilao, definirPoseVilao] = useState<Pose>("neutro");
  const [classeHeroi, definirClasseHeroi] = useState<"" | "golpeando" | "apanhando">("");
  const [classeVilao, definirClasseVilao] = useState<"" | "golpeando" | "apanhando">("");
  const [derrotadoHeroi, definirDerrotadoHeroi] = useState(false);
  const [derrotadoVilao, definirDerrotadoVilao] = useState(false);
  const [flutuantes, definirFlutuantes] = useState<{ id: number; texto: string }[]>([]);
  const [recadoTexto, definirRecadoTexto] = useState("");
  const [campoErrou, definirCampoErrou] = useState(false);

  const [musicaLigada, definirMusicaLigada] = useState(false);
  const [musicaVolume, definirMusicaVolume] = useState(0.55);
  const [musicaDisponivel, definirMusicaDisponivel] = useState<Record<string, boolean>>({});
  const [musicaIdiomaAtual, definirMusicaIdiomaAtual] = useState<string | null>(null);
  const [dicaSom, definirDicaSom] = useState("música desligada");

  const [editorAberto, definirEditorAberto] = useState(false);
  const [letraPT, definirLetraPT] = useState("");
  const [letraEN, definirLetraEN] = useState("");
  const [letraJP, definirLetraJP] = useState("");
  const [avisoSalvo, definirAvisoSalvo] = useState<{ texto: string; cor: string }>({ texto: "", cor: "" });

  const campoRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recadoTimerRef = useRef<number | undefined>(undefined);
  const poseHeroiTimerRef = useRef<number | undefined>(undefined);
  const poseVilaoTimerRef = useRef<number | undefined>(undefined);
  const proximoFlutuanteId = useRef(0);

  // Descobre quais sprites existem (não quebra quando faltam) e carrega os
  // versos salvos pelo instrutor, uma vez ao montar.
  useEffect(() => {
    definirLetrasSalvas(lerLetrasSalvas());

    let cancelado = false;
    (async () => {
      const bases = ["seiya", ...CASAS.map((c) => c.base)];
      const resultado: Record<string, boolean> = {};
      await Promise.all(
        bases.flatMap((base) =>
          (Object.keys(POSES) as Pose[]).map(async (pose) => {
            const chave = base + POSES[pose];
            resultado[chave] = await testarImagem(caminhoSprite(base, pose));
          }),
        ),
      );
      if (!cancelado) definirSpritesDisponiveis(resultado);
    })();

    (async () => {
      const disponiveis: Record<string, boolean> = {};
      for (const [codigo, dados] of Object.entries(IDIOMAS)) {
        disponiveis[codigo] = await testarAudio(dados.audio);
      }
      if (cancelado) return;
      definirMusicaDisponivel(disponiveis);
      const algum = Object.values(disponiveis).some(Boolean);
      const salvo = lerPreferenciaSom();
      const ligado = algum && !!salvo?.ligado;
      const volume = typeof salvo?.volume === "number" ? salvo.volume : 0.55;
      definirMusicaLigada(ligado);
      definirMusicaVolume(volume);
      definirDicaSom(algum ? (ligado ? "música ligada" : "música desligada") : "áudio ainda não instalado");
    })();

    return () => {
      cancelado = true;
    };
  }, []);

  // Cronômetro da casa: PPM recalculado ao vivo.
  useEffect(() => {
    if (tela !== "batalha" || estado.travado) return;
    const id = window.setInterval(() => definirAgora(Date.now()), 900);
    return () => window.clearInterval(id);
  }, [tela, estado.travado]);

  function melhorSprite(base: string, pose: Pose): string | null {
    if (spritesDisponiveis[base + POSES[pose]]) return caminhoSprite(base, pose);
    if (spritesDisponiveis[base]) return caminhoSprite(base, "neutro");
    return null;
  }

  function poseTemporaria(lado: "heroi" | "vilao", classe: "golpeando" | "apanhando", pose: Pose, ms: number) {
    if (lado === "heroi") {
      window.clearTimeout(poseHeroiTimerRef.current);
      definirPoseHeroi(pose);
      definirClasseHeroi(classe);
      poseHeroiTimerRef.current = window.setTimeout(() => {
        definirClasseHeroi("");
        definirPoseHeroi("neutro");
      }, ms);
    } else {
      window.clearTimeout(poseVilaoTimerRef.current);
      definirPoseVilao(pose);
      definirClasseVilao(classe);
      poseVilaoTimerRef.current = window.setTimeout(() => {
        definirClasseVilao("");
        definirPoseVilao("neutro");
      }, ms);
    }
  }

  function mostrarRecado(texto: string) {
    definirRecadoTexto(texto);
    window.clearTimeout(recadoTimerRef.current);
    recadoTimerRef.current = window.setTimeout(() => definirRecadoTexto(""), 2600);
  }

  function flutuar(texto: string) {
    const id = proximoFlutuanteId.current++;
    definirFlutuantes((f) => [...f, { id, texto }]);
    window.setTimeout(() => definirFlutuantes((f) => f.filter((x) => x.id !== id)), 700);
  }

  function trocarMusica(codigoIdioma: string) {
    if (musicaIdiomaAtual === codigoIdioma) return;
    definirMusicaIdiomaAtual(codigoIdioma);
    if (!musicaLigada) return;
    iniciarFaixa(codigoIdioma);
  }

  function iniciarFaixa(codigoIdioma: string) {
    const dados = IDIOMAS[codigoIdioma as keyof typeof IDIOMAS];
    if (!dados || !musicaDisponivel[codigoIdioma]) {
      pararFaixa();
      return;
    }
    const anterior = audioRef.current;
    const novo = new Audio(dados.audio);
    novo.loop = true;
    novo.volume = 0;
    audioRef.current = novo;
    novo
      .play()
      .then(() => {
        transicao(novo, musicaVolume, 800);
        if (anterior) transicao(anterior, 0, 800, () => anterior.pause());
      })
      .catch(() => {
        audioRef.current = anterior;
        definirDicaSom("clique em 🔊 para liberar o som");
      });
  }

  function pararFaixa() {
    if (audioRef.current) {
      const audio = audioRef.current;
      transicao(audio, 0, 500, () => audio.pause());
      audioRef.current = null;
    }
  }

  function transicao(audio: HTMLAudioElement, alvo: number, ms: number, aoFim?: () => void) {
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

  function alternarSom() {
    const ligado = !musicaLigada;
    definirMusicaLigada(ligado);
    salvarPreferenciaSom(ligado, musicaVolume);
    definirDicaSom(ligado ? "música ligada" : "música desligada");
    if (ligado) iniciarFaixa(musicaIdiomaAtual || CASAS[estado.casaAtual].idioma);
    else pararFaixa();
  }

  function mudarVolume(valor: number) {
    definirMusicaVolume(valor);
    if (audioRef.current) audioRef.current.volume = valor;
    salvarPreferenciaSom(musicaLigada, valor);
  }

  function calcularPPM(inicioCasa: number | null, acertosCasa: number, agoraMs: number): number {
    if (!inicioCasa) return 0;
    const minutos = (agoraMs - inicioCasa) / 60000;
    if (minutos <= 0) return 0;
    return Math.max(0, Math.min(Math.round(acertosCasa / 5 / minutos), 999));
  }

  function calcularPrecisao(acertosCasa: number, errosCasa: number): number {
    const total = acertosCasa + errosCasa;
    return total ? Math.round((acertosCasa / total) * 100) : 100;
  }

  function multiplicadorCosmo(combo: number, ppm: number): number {
    const porCombo = combo >= 60 ? 2 : combo >= 35 ? 1.7 : combo >= 20 ? 1.4 : combo >= 10 ? 1.2 : 1;
    const porVelocidade = ppm >= 60 ? 2 : ppm >= 40 ? 1.6 : ppm >= 25 ? 1.3 : 1;
    return Math.min(4, Math.round(porCombo * porVelocidade * 100) / 100);
  }

  const ppmCasa = useMemo(
    () => calcularPPM(estado.inicioCasa, estado.acertosCasa, agora),
    [estado.inicioCasa, estado.acertosCasa, agora],
  );
  const precisaoCasa = calcularPrecisao(estado.acertosCasa, estado.errosCasa);
  const multiplicador = multiplicadorCosmo(estado.combo, ppmCasa);

  function iniciarCasa(indice: number) {
    const casa = CASAS[indice];
    const idioma = IDIOMAS[casa.idioma];
    const versos = versosDaCasa(letrasSalvas, indice);
    const caracteres = versos.reduce((s, v) => s + v.length, 0);
    const vidaMaximaVilao = Math.max(10, Math.round(caracteres * proporcaoVidaVilao(indice)));

    definirEstado((prevGlobal) => ({
      ...prevGlobal,
      casaAtual: indice,
      versos,
      versoAtual: 0,
      digitado: "",
      errosNoVerso: 0,
      combo: 0,
      acertosCasa: 0,
      errosCasa: 0,
      inicioCasa: null,
      travado: false,
      vidaMaximaHeroi: idioma.vidaMaxima,
      vidaHeroi: idioma.vidaMaxima,
      vidaMaximaVilao,
      vidaVilao: vidaMaximaVilao,
    }));
    definirRecadoTexto("");
    definirPoseHeroi("neutro");
    definirPoseVilao("neutro");
    definirClasseHeroi("");
    definirClasseVilao("");
    definirDerrotadoHeroi(false);
    definirDerrotadoVilao(false);
    trocarMusica(casa.idioma);
    definirTela("batalha");
    window.setTimeout(() => campoRef.current?.focus(), 0);
  }

  function zerarJogo() {
    definirEstado((prev) => ({
      ...prev,
      resultados: {},
      acertosTotais: 0,
      errosTotais: 0,
      melhorCombo: 0,
      melhorPPM: 0,
    }));
  }

  function aoInputVerso(valor: string) {
    if (estado.travado) return;
    const alvo = estado.versos[estado.versoAtual] || "";
    if (valor.length <= estado.digitado.length) return; // backspace: cursor só anda para a frente

    const inicioCasa = estado.inicioCasa ?? Date.now();
    let digitado = estado.digitado;
    let combo = estado.combo;
    let melhorCombo = estado.melhorCombo;
    let acertosCasa = estado.acertosCasa;
    let errosCasa = estado.errosCasa;
    let acertosTotais = estado.acertosTotais;
    let errosTotais = estado.errosTotais;
    let errosNoVerso = estado.errosNoVerso;
    let vidaVilao = estado.vidaVilao;
    let vidaHeroi = estado.vidaHeroi;
    let travado = false;
    let venceu = false;
    let perdeu = false;

    const novos = valor.slice(estado.digitado.length);
    for (const ch of novos) {
      const esperado = alvo[digitado.length];
      if (esperado === undefined) break;
      if (ch === esperado) {
        digitado += ch;
        acertosCasa++;
        acertosTotais++;
        combo++;
        melhorCombo = Math.max(melhorCombo, combo);
        const ppmAgora = calcularPPM(inicioCasa, acertosCasa, Date.now());
        const dano = multiplicadorCosmo(combo, ppmAgora);
        vidaVilao = Math.max(0, vidaVilao - dano);
        if (combo % 6 === 1) {
          poseTemporaria("heroi", "golpeando", "ataque", 200);
          poseTemporaria("vilao", "apanhando", "dano", 260);
          flutuar(`-${dano.toFixed(1)}`);
        }
        if (vidaVilao <= 0) {
          venceu = true;
          travado = true;
          break;
        }
      } else {
        errosCasa++;
        errosTotais++;
        errosNoVerso++;
        combo = 0;
        vidaHeroi = Math.max(0, vidaHeroi - 1);
        poseTemporaria("heroi", "apanhando", "dano", 320);
        poseTemporaria("vilao", "golpeando", "ataque", 220);
        definirCampoErrou(true);
        window.setTimeout(() => definirCampoErrou(false), 320);
        if (vidaHeroi <= 0) {
          perdeu = true;
          travado = true;
        } else {
          mostrarRecado(`Cuidado! Restam ${vidaHeroi} de vida.`);
        }
        break;
      }
    }

    let versoAtual = estado.versoAtual;
    if (!travado && digitado.length === alvo.length) {
      if (errosNoVerso === 0 && vidaHeroi < estado.vidaMaximaHeroi) {
        vidaHeroi++;
        mostrarRecado("Verso perfeito! +1 de vida 💚");
      }
      errosNoVerso = 0;
      digitado = "";
      versoAtual++;
      if (versoAtual >= estado.versos.length) versoAtual = 0;
    }

    const proximoEstado: EstadoJogo = {
      ...estado,
      digitado,
      versoAtual,
      combo,
      melhorCombo,
      acertosCasa,
      errosCasa,
      acertosTotais,
      errosTotais,
      errosNoVerso,
      vidaVilao,
      vidaHeroi,
      inicioCasa,
      travado,
    };

    if (venceu) {
      proximoEstado.resultados = {
        ...estado.resultados,
        [estado.casaAtual]: {
          precisao: calcularPrecisao(acertosCasa, errosCasa),
          ppm: calcularPPM(inicioCasa, acertosCasa, Date.now()),
          combo: melhorCombo,
          erros: errosCasa,
        },
      };
      definirDerrotadoVilao(true);
      poseTemporaria("heroi", "golpeando", "ataque", 700);
      window.setTimeout(() => definirTela("casa"), 900);
    } else if (perdeu) {
      definirDerrotadoHeroi(true);
      poseTemporaria("vilao", "golpeando", "ataque", 700);
      window.setTimeout(() => definirTela("casa"), 900);
    }

    definirEstado(proximoEstado);
  }

  const casaAtualObj = CASAS[estado.casaAtual];
  const cenario = CENARIOS[casaAtualObj.base] || CENARIOS.gemeos;
  const alvo = estado.versos[estado.versoAtual] || "";

  function abrirEditor() {
    const salvas = lerLetrasSalvas();
    definirLetraPT((salvas.PT || []).join("\n"));
    definirLetraEN((salvas.EN || []).join("\n"));
    definirLetraJP((salvas.JP || []).join("\n"));
    definirAvisoSalvo({ texto: "", cor: "" });
    definirEditorAberto(true);
  }

  function contarTexto(codigo: "PT" | "EN" | "JP", valor: string): string {
    const escritos = valor.split("\n").map((l) => l.trim()).filter(Boolean).length;
    const emUso = escritos || LETRAS[codigo].length;
    return escritos ? `${escritos} versos seus` : `${emUso} versos do jogo`;
  }

  function aplicarLetras() {
    const campos: Record<"PT" | "EN" | "JP", string> = { PT: letraPT, EN: letraEN, JP: letraJP };
    const dados: LetrasSalvas = {};
    let total = 0;
    for (const codigo of CAMPOS_LETRA) {
      const linhas = campos[codigo].split("\n").map((l) => l.trim()).filter(Boolean);
      if (linhas.length) {
        dados[codigo] = linhas;
        total += linhas.length;
      }
    }
    if (!salvarLetras(dados)) {
      definirAvisoSalvo({ texto: "Este navegador não deixou salvar. Os versos valem só até fechar a página.", cor: estilos.corPerigo });
    } else if (total) {
      definirAvisoSalvo({ texto: `Salvo! ${total} versos seus vão para as casas.`, cor: estilos.corVida });
    } else {
      definirAvisoSalvo({ texto: "Nada preenchido — o jogo segue com as frases dele.", cor: "" });
    }
    definirLetrasSalvas(dados);
    if (tela === "batalha") iniciarCasa(estado.casaAtual);
  }

  function limparLetras() {
    definirLetraPT("");
    definirLetraEN("");
    definirLetraJP("");
    salvarLetras({});
    definirLetrasSalvas({});
    definirAvisoSalvo({ texto: "Voltou para as frases que vêm no jogo.", cor: "" });
    if (tela === "batalha") iniciarCasa(estado.casaAtual);
  }

  const vencidas = Object.keys(estado.resultados).length;
  const totalTeclas = estado.acertosTotais + estado.errosTotais;
  const precisaoFinal = totalTeclas ? Math.round((estado.acertosTotais / totalTeclas) * 100) : 100;

  return (
    <div className={estilos.pagina}>
      <div className={estilos.ceu} />

      {editorAberto && (
        <div className={`${estilos.fundoEditor} ${estilos.aberto}`} onClick={(e) => e.target === e.currentTarget && definirEditorAberto(false)}>
          <div className={estilos.editor}>
            <h2>✏️ Versos para digitar</h2>
            <p className={estilos.explica}>
              Cole aqui os versos de cada idioma, <strong>um por linha</strong>. O jogo reparte sozinho entre as
              quatro casas daquele idioma. Fica salvo neste navegador. No japonês, escreva em <strong>romaji</strong>.
            </p>
            <div className={estilos.campoLetra}>
              <label htmlFor="letraPT">
                Português — casas 1 a 4 <span className={estilos.conta}>{contarTexto("PT", letraPT)}</span>
              </label>
              <textarea id="letraPT" spellCheck={false} placeholder="um verso por linha…" value={letraPT} onChange={(e) => definirLetraPT(e.target.value)} />
            </div>
            <div className={estilos.campoLetra}>
              <label htmlFor="letraEN">
                Inglês — casas 5 a 8 <span className={estilos.conta}>{contarTexto("EN", letraEN)}</span>
              </label>
              <textarea id="letraEN" spellCheck={false} placeholder="one line per verse…" value={letraEN} onChange={(e) => definirLetraEN(e.target.value)} />
            </div>
            <div className={estilos.campoLetra}>
              <label htmlFor="letraJP">
                Japonês em romaji — casas 9 a 12 <span className={estilos.conta}>{contarTexto("JP", letraJP)}</span>
              </label>
              <textarea id="letraJP" spellCheck={false} placeholder="ichi gyou ni hitotsu…" value={letraJP} onChange={(e) => definirLetraJP(e.target.value)} />
            </div>
            <div className={avisoSalvo.cor ? `${estilos.avisoSalvo} ${avisoSalvo.cor}` : estilos.avisoSalvo}>{avisoSalvo.texto}</div>
            <div className={estilos.botoes}>
              <button type="button" onClick={aplicarLetras}>💾 Salvar e usar</button>
              <button type="button" className={estilos.discreto} onClick={limparLetras}>Voltar às frases do jogo</button>
              <button type="button" className={estilos.discreto} onClick={() => definirEditorAberto(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      <div className={estilos.som}>
        <button type="button" title="Escrever os versos que os alunos vão digitar" onClick={abrirEditor}>✏️</button>
        <button type="button" title="Ligar ou desligar a música" disabled={!Object.values(musicaDisponivel).some(Boolean)} onClick={alternarSom}>
          {musicaLigada ? "🔊" : "🔇"}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(musicaVolume * 100)}
          disabled={!musicaLigada}
          onChange={(e) => mudarVolume(Number(e.target.value) / 100)}
          title="Volume"
        />
        <span className={estilos.dica}>{dicaSom}</span>
      </div>

      <div className={estilos.conteudo}>
        <header>
          <h1>⭐ Batalha das 12 Casas</h1>
          <p>Digite rápido e sem errar: cada acerto queima o cosmo, cada erro tira a vida do Seiya.</p>
        </header>

        {tela === "inicio" && (
          <section className={estilos.tela}>
            <div className={estilos.cartao}>
              <h2>O relógio das 12 Casas começou a queimar</h2>
              <p>
                Você é o <span className={estilos.destaque}>Seiya de Pégaso</span>. Para chegar ao topo do
                Santuário, precisa atravessar as doze casas — e em cada uma há um Cavaleiro de Ouro esperando.
              </p>
              <ul>
                <li>⌨️ <b>Cada letra certa</b> é um golpe no Cavaleiro.</li>
                <li>💔 <b>Cada letra errada</b> tira um ponto da sua vida.</li>
                <li>🔥 <b>Quanto mais rápido e mais seguido você acerta</b>, mais o cosmo queima.</li>
                <li>💚 <b>Terminar um verso sem nenhum erro</b> devolve um ponto de vida.</li>
                <li>🌐 As casas mudam de idioma: <b>português</b> → <b>inglês</b> → <b>japonês em romaji</b>.</li>
              </ul>
              <p className={estilos.textoApagado}>
                Nas casas em português você aguenta <b>3 erros</b>. Em inglês e em japonês, <b>5</b>.
              </p>
              <div className={estilos.botoes}>
                <button type="button" onClick={() => { zerarJogo(); iniciarCasa(0); }}>⚔️ Entrar na primeira casa</button>
              </div>
            </div>
          </section>
        )}

        {tela === "batalha" && (
          <section className={estilos.tela}>
            <div className={estilos.relogio}>
              {CASAS.map((c, i) => (
                <div
                  key={c.base}
                  className={`${estilos.hora} ${estado.resultados[i] ? estilos.vencida : i === estado.casaAtual ? estilos.atualHora : ""}`}
                  title={`Casa de ${c.casa}`}
                >
                  {c.signo}
                </div>
              ))}
            </div>

            <div
              className={estilos.arena}
              style={{ ["--ceu1" as string]: cenario.ceu1, ["--ceu2" as string]: cenario.ceu2, ["--pedra" as string]: cenario.pedra }}
            >
              <svg className={estilos.cenario} viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g opacity={0.16}>
                  <rect className={estilos.pedraSvg} x={6} y={26} width={13} height={82} rx={2} />
                  <rect className={estilos.pedraSvg} x={2} y={22} width={21} height={6} rx={2} />
                  <rect className={estilos.pedraSvg} x={181} y={26} width={13} height={82} rx={2} />
                  <rect className={estilos.pedraSvg} x={177} y={22} width={21} height={6} rx={2} />
                </g>
                <rect className={estilos.pedraSvg} x={0} y={106} width={200} height={14} opacity={0.1} />
                {cenario.tracos.map(([a, b], i) => (
                  <line key={i} className={estilos.tracoSvg} x1={cenario.estrelas[a][0]} y1={cenario.estrelas[a][1]} x2={cenario.estrelas[b][0]} y2={cenario.estrelas[b][1]} />
                ))}
                {cenario.estrelas.map(([x, y], i) => (
                  <g key={i}>
                    <circle className={`${estilos.estrelaSvg} ${estilos.brilho}`} cx={x} cy={y} r={1.05} style={{ animationDelay: `${(i * 0.27).toFixed(2)}s` }} />
                    <circle className={estilos.estrelaSvg} cx={x} cy={y} r={2.3} opacity={0.1} />
                  </g>
                ))}
              </svg>

              <div className={`${estilos.lutador} ${estilos.heroi}`}>
                <div className={estilos.nome}>Seiya de Pégaso</div>
                <div className={estilos.barra}>
                  <i
                    className={estado.vidaHeroi / estado.vidaMaximaHeroi <= 0.34 ? estilos.critica : estado.vidaHeroi / estado.vidaMaximaHeroi <= 0.67 ? estilos.baixa : ""}
                    style={{ width: `${(estado.vidaHeroi / estado.vidaMaximaHeroi) * 100}%` }}
                  />
                </div>
                <div className={estilos.vidasTexto}>{estado.vidaHeroi} de {estado.vidaMaximaHeroi} de vida</div>
                <div className={estilos.palco}>
                  <div className={`${estilos.aura} ${estado.combo >= 35 ? estilos.n3 : estado.combo >= 20 ? estilos.n2 : estado.combo >= 10 ? estilos.n1 : ""}`} />
                  {melhorSprite("seiya", poseHeroi) ? (
                    <img
                      className={`${estilos.sprite} ${classeHeroi ? estilos[classeHeroi] : ""} ${derrotadoHeroi ? estilos.derrotado : ""}`}
                      src={melhorSprite("seiya", poseHeroi) ?? undefined}
                      alt="Seiya"
                    />
                  ) : (
                    <div className={estilos.silhueta}>
                      <span className={estilos.signo}>🐴</span>
                      <span className={estilos.aviso}>sprite não instalado</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`${estilos.lutador} ${estilos.vilao}`}>
                <div className={estilos.nome}>{casaAtualObj.cavaleiro}</div>
                <div className={estilos.barra}>
                  <i
                    className={estado.vidaVilao / estado.vidaMaximaVilao <= 0.34 ? estilos.critica : estado.vidaVilao / estado.vidaMaximaVilao <= 0.67 ? estilos.baixa : ""}
                    style={{ width: `${(estado.vidaVilao / estado.vidaMaximaVilao) * 100}%` }}
                  />
                </div>
                <div className={estilos.vidasTexto}>{Math.ceil((estado.vidaVilao / estado.vidaMaximaVilao) * 100)}% de cosmo</div>
                <div className={estilos.palco}>
                  {flutuantes.map((f) => (
                    <span key={f.id} className={estilos.danoFlutuante}>{f.texto}</span>
                  ))}
                  <div className={estilos.aura} />
                  {melhorSprite(casaAtualObj.base, poseVilao) ? (
                    <img
                      className={`${estilos.sprite} ${estilos.espelhado} ${classeVilao ? estilos[classeVilao] : ""} ${derrotadoVilao ? estilos.derrotado : ""}`}
                      src={melhorSprite(casaAtualObj.base, poseVilao) ?? undefined}
                      alt="Cavaleiro de Ouro"
                    />
                  ) : (
                    <div className={estilos.silhueta}>
                      <span className={estilos.signo}>{casaAtualObj.signo}</span>
                      <span className={estilos.aviso}>sprite não instalado</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={estilos.digitacao}>
              <div className={estilos.faixaCasa}>
                <h2>Casa de {casaAtualObj.casa}</h2>
                <span className={estilos.etiquetaIdioma}>{IDIOMAS[casaAtualObj.idioma].rotulo}</span>
              </div>

              <div className={estilos.verso} onClick={() => campoRef.current?.focus()}>
                {alvo.split("").map((ch, i) => {
                  const classe = i < estado.digitado.length ? estilos.ok : i === estado.digitado.length ? estilos.atualVerso : estilos.falta;
                  return (
                    <span key={i} className={classe}>
                      {ch === " " ? " " : ch}
                    </span>
                  );
                })}
              </div>

              <input
                ref={campoRef}
                className={campoErrou ? `${estilos.campo} ${estilos.errou}` : estilos.campo}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="Digite aqui…"
                disabled={estado.travado}
                value={estado.digitado}
                onChange={(e) => aoInputVerso(e.target.value)}
                onPaste={(e) => { e.preventDefault(); mostrarRecado("Nada de colar — aqui se digita! ⌨️"); }}
              />

              <div className={estilos.numeros}>
                <div className={estilos.numero}><span className={estilos.rot}>Verso</span><span className={estilos.val}>{estado.versoAtual + 1}/{estado.versos.length}</span></div>
                <div className={estilos.numero}><span className={estilos.rot}>Precisão</span><span className={estilos.val}>{precisaoCasa}%</span></div>
                <div className={estilos.numero}><span className={estilos.rot}>PPM</span><span className={estilos.val}>{ppmCasa}</span></div>
                <div className={estilos.numero}><span className={estilos.rot}>Combo</span><span className={estilos.val}>{estado.combo}</span></div>
                <div className={estilos.numero}>
                  <span className={estilos.rot}>Cosmo</span>
                  <span className={multiplicador >= 2 ? `${estilos.val} ${estilos.cosmoAlto}` : estilos.val}>
                    ×{Number.isInteger(multiplicador) ? multiplicador : multiplicador.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className={estilos.recado}>{recadoTexto}</div>

              <div className={estilos.botoes}>
                <button type="button" className={estilos.discreto} onClick={() => iniciarCasa(estado.casaAtual)}>↻ Recomeçar a casa</button>
                <button type="button" className={estilos.discreto} onClick={() => { pararFaixa(); definirTela("inicio"); }}>Voltar ao início</button>
              </div>
            </div>
          </section>
        )}

        {tela === "casa" && (
          <section className={estilos.tela}>
            <div className={estilos.cartao}>
              <h2>{derrotadoVilao ? `⚡ ${casaAtualObj.cavaleiro} foi derrotado!` : `💔 O Seiya caiu na Casa de ${casaAtualObj.casa}`}</h2>
              <p>
                {derrotadoVilao
                  ? "O relógio avançou uma hora. A próxima casa já está aberta."
                  : "A armadura não aguentou. Respire fundo, digite com calma e tente de novo — acertar sem pressa machuca menos do que correr errando."}
              </p>
              <div className={estilos.placar}>
                <div><b>{estado.resultados[estado.casaAtual]?.precisao ?? precisaoCasa}%</b><span>Precisão</span></div>
                <div><b>{estado.resultados[estado.casaAtual]?.ppm ?? ppmCasa}</b><span>PPM</span></div>
                <div><b>{estado.melhorCombo}</b><span>Maior combo</span></div>
                <div><b>{estado.errosCasa}</b><span>Erros</span></div>
              </div>
              <div className={estilos.botoes}>
                {derrotadoVilao ? (
                  <button type="button" onClick={() => (estado.casaAtual >= CASAS.length - 1 ? definirTela("final") : iniciarCasa(estado.casaAtual + 1))}>
                    {estado.casaAtual >= CASAS.length - 1 ? "🏆 Ver o resultado final" : "➡️ Avançar para a próxima casa"}
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={() => iniciarCasa(estado.casaAtual)}>↻ Enfrentar de novo</button>
                    <button type="button" className={estilos.discreto} onClick={() => { pararFaixa(); definirTela("final"); }}>Ver o resultado até aqui</button>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {tela === "final" && (
          <section className={estilos.tela}>
            <div className={estilos.cartao}>
              <h2>{vencidas === CASAS.length ? "🏆 Você atravessou as 12 Casas!" : `⭐ Você chegou até a ${vencidas + 1}ª Casa`}</h2>
              <p>
                {vencidas === CASAS.length
                  ? "O Santuário está aberto. Sua digitação venceu os doze Cavaleiros de Ouro."
                  : "Cada casa vencida é um pedaço de caminho. Volte e siga de onde parou."}
              </p>
              <div className={estilos.placar}>
                <div><b>{vencidas}/{CASAS.length}</b><span>Casas vencidas</span></div>
                <div><b>{precisaoFinal}%</b><span>Precisão geral</span></div>
                <div><b>{estado.melhorPPM}</b><span>Melhor PPM</span></div>
                <div><b>{estado.melhorCombo}</b><span>Maior combo</span></div>
              </div>
              <div className={estilos.mapa}>
                {CASAS.map((c, i) => {
                  const r = estado.resultados[i];
                  return (
                    <div key={c.base} className={r ? `${estilos.casaMapa} ${estilos.ok}` : estilos.casaMapa}>
                      <b>{c.signo} {c.casa}</b>
                      {r ? `${r.precisao}% · ${r.ppm} PPM` : "não vencida"}
                    </div>
                  );
                })}
              </div>
              <PainelRanking
                jogoId="digitacao-cavaleiros-zodiaco"
                resultadoPendente={{ ppm: estado.melhorPPM, precisao: precisaoFinal }}
              />
              <div className={estilos.botoes}>
                <button type="button" onClick={() => { zerarJogo(); iniciarCasa(0); }}>↻ Enfrentar tudo de novo</button>
              </div>
            </div>
          </section>
        )}

        <footer className={estilos.footer}>
          <Link to="/digitacao" className={estilos.botaoVoltar}>
            ← Voltar para Digitação
          </Link>
          <p><strong>Portal Educacional Interativo</strong> · Treino de digitação — velocidade e precisão</p>
        </footer>
      </div>
    </div>
  );
}
