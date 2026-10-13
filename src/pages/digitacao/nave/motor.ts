import {
  ENERGIA_MAXIMA,
  ESPECIAIS,
  FASES,
  VIDAS,
  tempoDoAlerta,
  tempoDoTerminal,
  type AtaqueChefe,
  type Especial,
  type TipoInimigo,
} from "./dados";

/**
 * Motor do Esquadrão Hiper. O estado é um objeto mutável guardado numa ref
 * (centenas de tiros por quadro não cabem num setState por objeto); a tela do
 * React só lê um resumo dele. Coordenadas lógicas: 480 × 720, origem no canto
 * de cima à esquerda.
 */

export const LARGURA = 480;
export const ALTURA = 720;

type TipoTiro = "normal" | "mina" | "divisor" | "perseguidor" | "onda";

interface Tiro {
  tipo: TipoTiro;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  t: number;
  x0: number;
}

interface TiroJogador {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dano: number;
  missil: boolean;
}

/** Raio vertical: primeiro só a linha de aviso, depois o raio que machuca. */
interface Feixe {
  x: number;
  topo: number;
  aviso: number;
  ativo: number;
  largura: number;
}

interface Inimigo {
  tipo: TipoInimigo;
  x: number;
  y: number;
  x0: number;
  vx: number;
  vy: number;
  vida: number;
  t: number;
  tiroEm: number;
  fase: number;
  pisca: number;
}

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  cor: string;
}

interface PowerUp {
  tipo: "arma" | "energia" | "vida";
  x: number;
  y: number;
  t: number;
}

interface Texto {
  x: number;
  y: number;
  texto: string;
  vida: number;
  cor: string;
}

export interface Chefe {
  x: number;
  y: number;
  vida: number;
  vidaTotal: number;
  t: number;
  ataque: number;
  tiroEm: number;
  angulo: number;
  pisca: number;
  morrendo: number;
}

export interface Alerta {
  palavra: string;
  digitado: string;
  restante: number;
  total: number;
}

export interface Terminal {
  digitado: string;
  restante: number;
  total: number;
}

export type Situacao = "jogando" | "vitoria" | "derrota";

export interface Estado {
  fase: number;
  t: number;
  situacao: Situacao;
  jogador: { x: number; y: number; invencivel: number; tiroEm: number; arma: number };
  tirosJogador: TiroJogador[];
  tirosInimigos: Tiro[];
  feixes: Feixe[];
  inimigos: Inimigo[];
  particulas: Particula[];
  powerups: PowerUp[];
  textos: Texto[];
  estrelas: { x: number; y: number; v: number }[];
  chefe: Chefe | null;
  grupoEm: number;
  energia: number;
  terminal: Terminal | null;
  alerta: Alerta | null;
  alertaEm: number;
  efeitos: Record<"turbo" | "escudo" | "laser" | "bomba", number>;
  /** Aviso curto embaixo do terminal ("Falta energia", "TURBO!"). */
  aviso: { texto: string; vida: number } | null;
  tremor: number;
  vidas: number;
  pontos: number;
  combo: number;
  comboTempo: number;
  abatidos: number;
  especiais: number;
  alertasPerdidos: number;
  /** Teclas certas e erradas em códigos e alertas (precisão e palavras por minuto). */
  acertos: number;
  erros: number;
  msDigitando: number;
  fila: string[];
}

export interface Entrada {
  esquerda: boolean;
  direita: boolean;
  cima: boolean;
  baixo: boolean;
  /** Mouse ou dedo: a nave persegue este ponto. */
  alvo: { x: number; y: number } | null;
}

const VIDA_INIMIGO: Record<TipoInimigo, number> = {
  drone: 2, zigue: 3, atirador: 7, rocha: 7, kamikaze: 2, torreta: 12, minador: 5, enxame: 1, lanca: 7, blindado: 34,
};
const PONTOS_INIMIGO: Record<TipoInimigo, number> = {
  drone: 100, zigue: 150, atirador: 300, rocha: 200, kamikaze: 150, torreta: 500, minador: 350, enxame: 50, lanca: 400, blindado: 900,
};
const ENERGIA_INIMIGO: Record<TipoInimigo, number> = {
  drone: 4, zigue: 5, atirador: 8, rocha: 6, kamikaze: 5, torreta: 10, minador: 8, enxame: 2, lanca: 9, blindado: 16,
};
const RAIO_INIMIGO: Record<TipoInimigo, number> = {
  drone: 16, zigue: 15, atirador: 22, rocha: 24, kamikaze: 14, torreta: 24, minador: 20, enxame: 10, lanca: 18, blindado: 34,
};

const sortear = <T>(lista: readonly T[]) => lista[Math.floor(Math.random() * lista.length)];
const embaralhar = <T>(lista: readonly T[]) => [...lista].sort(() => Math.random() - 0.5);
const custo = (especial: Especial) => ESPECIAIS.find((s) => s.id === especial)!.custo;
/** Códigos sem diferença de maiúscula: no meio do tiroteio ninguém confere o Caps Lock. Acento conta. */
const igual = (a: string, b: string) => a.toLocaleLowerCase("pt-BR") === b.toLocaleLowerCase("pt-BR");

export function criarEstado(fase: number): Estado {
  return {
    fase,
    t: 0,
    situacao: "jogando",
    jogador: { x: LARGURA / 2, y: ALTURA - 90, invencivel: 2, tiroEm: 0, arma: 1 },
    tirosJogador: [],
    tirosInimigos: [],
    feixes: [],
    inimigos: [],
    particulas: [],
    powerups: [],
    textos: [],
    estrelas: Array.from({ length: 80 }, () => ({ x: Math.random() * LARGURA, y: Math.random() * ALTURA, v: 40 + Math.random() * 220 })),
    chefe: null,
    grupoEm: 0.8,
    energia: 30,
    terminal: null,
    alerta: null,
    alertaEm: FASES[fase].alertaOndas,
    efeitos: { turbo: 0, escudo: 0, laser: 0, bomba: 0 },
    aviso: null,
    tremor: 0,
    vidas: VIDAS,
    pontos: 0,
    combo: 0,
    comboTempo: 0,
    abatidos: 0,
    especiais: 0,
    alertasPerdidos: 0,
    acertos: 0,
    erros: 0,
    msDigitando: 0,
    fila: [],
  };
}

export const multiplicador = (e: Estado) => Math.min(8, 1 + Math.floor(e.combo / 6));
export const codigosDaFase = (fase: number) => ESPECIAIS.map((s) => ({ ...s, codigo: FASES[fase].codigos[s.id] }));

// ------------------------------------------------------------------ ajudantes

function explodir(e: Estado, x: number, y: number, cor: string, quantidade = 14) {
  for (let i = 0; i < quantidade; i++) {
    const angulo = Math.random() * Math.PI * 2;
    const v = 60 + Math.random() * 240;
    e.particulas.push({ x, y, vx: Math.cos(angulo) * v, vy: Math.sin(angulo) * v, vida: 0.35 + Math.random() * 0.5, cor });
  }
}

function texto(e: Estado, x: number, y: number, conteudo: string, cor = "#ffe066") {
  e.textos.push({ x, y, texto: conteudo, vida: 0.9, cor });
}

function avisar(e: Estado, conteudo: string) {
  e.aviso = { texto: conteudo, vida: 1.6 };
}

function tiro(tipo: TipoTiro, x: number, y: number, vx: number, vy: number, r = 5): Tiro {
  return { tipo, x, y, vx, vy, r, t: 0, x0: x };
}

function mirado(e: Estado, x: number, y: number, v: number, desvio = 0, tipo: TipoTiro = "normal", r = 5): Tiro {
  const a = Math.atan2(e.jogador.y - y, e.jogador.x - x) + desvio;
  return tiro(tipo, x, y, Math.cos(a) * v, Math.sin(a) * v, r);
}

function circulo(e: Estado, x: number, y: number, n: number, v: number, giro = 0) {
  for (let i = 0; i < n; i++) {
    const a = giro + (i / n) * Math.PI * 2;
    e.tirosInimigos.push(tiro("normal", x, y, Math.cos(a) * v, Math.sin(a) * v, 4));
  }
}

function novoInimigo(tipo: TipoInimigo, x: number, y: number, extra: Partial<Inimigo> = {}): Inimigo {
  return { tipo, x, y, x0: x, vx: 0, vy: 0, vida: VIDA_INIMIGO[tipo], t: Math.random() * 2, tiroEm: 0.8 + Math.random() * 1.2, fase: 0, pisca: 0, ...extra };
}

function soltarGrupo(e: Estado) {
  const fase = FASES[e.fase];
  const tipo = sortear(fase.inimigos);
  const meio = 70 + Math.random() * (LARGURA - 140);
  const lista = e.inimigos;
  switch (tipo) {
    case "drone": {
      const n = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) lista.push(novoInimigo(tipo, Math.max(30, Math.min(LARGURA - 30, meio + (i - (n - 1) / 2) * 50)), -30 - Math.abs(i - (n - 1) / 2) * 26));
      break;
    }
    case "zigue":
      for (let i = 0; i < 4; i++) lista.push(novoInimigo(tipo, meio, -30 - i * 44));
      break;
    case "enxame": {
      // Formação em V, rápida.
      for (let i = 0; i < 9; i++) {
        const lado = i === 0 ? 0 : (i % 2 ? 1 : -1) * Math.ceil(i / 2);
        lista.push(novoInimigo(tipo, Math.max(20, Math.min(LARGURA - 20, meio + lado * 22)), -20 - Math.abs(lado) * 20));
      }
      break;
    }
    case "kamikaze":
      for (let i = 0; i < 3; i++) lista.push(novoInimigo(tipo, 40 + Math.random() * (LARGURA - 80), -20 - i * 60));
      break;
    case "rocha":
      for (let i = 0; i < 2; i++) lista.push(novoInimigo(tipo, 50 + Math.random() * (LARGURA - 100), -30 - i * 90));
      break;
    case "minador": {
      const daEsquerda = Math.random() < 0.5;
      lista.push(novoInimigo(tipo, daEsquerda ? -30 : LARGURA + 30, 90 + Math.random() * 160, { vx: daEsquerda ? 120 : -120 }));
      break;
    }
    default:
      lista.push(novoInimigo(tipo, meio, -40));
  }
}

function proximaPalavra(e: Estado, chefe: boolean) {
  if (e.fila.length === 0) e.fila = embaralhar(chefe ? FASES[e.fase].palavrasChefe : FASES[e.fase].palavras);
  return e.fila.pop()!;
}

function perderVida(e: Estado, ignorarProtecao = false) {
  if (!ignorarProtecao && (e.jogador.invencivel > 0 || e.efeitos.escudo > 0)) return;
  e.vidas -= 1;
  e.jogador.invencivel = 2;
  e.jogador.arma = Math.max(1, e.jogador.arma - 1);
  e.combo = 0;
  e.tremor = 0.45;
  explodir(e, e.jogador.x, e.jogador.y, "#7ad7ff", 26);
  // Renascer dentro de uma chuva de balas não é justo: limpa em volta.
  e.tirosInimigos = e.tirosInimigos.filter((t) => Math.hypot(t.x - e.jogador.x, t.y - e.jogador.y) > 150);
  if (e.vidas <= 0) e.situacao = "derrota";
}

function abater(e: Estado, inimigo: Inimigo) {
  e.combo += 1;
  e.comboTempo = 2;
  const mult = multiplicador(e);
  const pontos = PONTOS_INIMIGO[inimigo.tipo] * mult;
  e.pontos += pontos;
  e.abatidos += 1;
  e.energia = Math.min(ENERGIA_MAXIMA, e.energia + ENERGIA_INIMIGO[inimigo.tipo]);
  explodir(e, inimigo.x, inimigo.y, inimigo.tipo === "rocha" ? "#c9a27a" : sortear(["#ff8a5c", "#ffd166", "#ff5c78"]), inimigo.tipo === "blindado" ? 40 : 14);
  if (mult > 1 || pontos >= 500) texto(e, inimigo.x, inimigo.y, mult > 1 ? `${pontos} ×${mult}` : String(pontos));
  const sorte = Math.random();
  if (sorte < 0.05 && e.jogador.arma < 4) e.powerups.push({ tipo: "arma", x: inimigo.x, y: inimigo.y, t: 0 });
  else if (sorte < 0.13) e.powerups.push({ tipo: "energia", x: inimigo.x, y: inimigo.y, t: 0 });
  else if (sorte < 0.145 && e.vidas < VIDAS) e.powerups.push({ tipo: "vida", x: inimigo.x, y: inimigo.y, t: 0 });
  // O blindado se despede com um anel de estilhaços: abater perto dele tem preço.
  if (inimigo.tipo === "blindado") {
    e.tremor = 0.3;
    circulo(e, inimigo.x, inimigo.y, 12, 150, Math.random());
  }
}

// ------------------------------------------------------------------ digitação

/** Enter: abre o terminal de códigos (se não houver alerta na tela). */
export function abrirTerminal(e: Estado) {
  if (e.situacao !== "jogando" || e.alerta || e.terminal) return;
  const maior = Math.max(...ESPECIAIS.map((s) => FASES[e.fase].codigos[s.id].length));
  const total = tempoDoTerminal("x".repeat(maior));
  e.terminal = { digitado: "", restante: total, total };
}

export function fecharTerminal(e: Estado) {
  e.terminal = null;
}

/** Desfaz a última letra do terminal (o alerta não tem volta: é corrida). */
export function apagar(e: Estado) {
  if (e.terminal) e.terminal.digitado = e.terminal.digitado.slice(0, -1);
}

function soltarEspecial(e: Estado, especial: Especial) {
  e.energia -= custo(especial);
  e.especiais += 1;
  const nome = ESPECIAIS.find((s) => s.id === especial)!.nome.toUpperCase();
  avisar(e, `${nome}!`);
  e.tremor = 0.25;
  if (especial === "turbo") e.efeitos.turbo = 8;
  else if (especial === "escudo") e.efeitos.escudo = 6;
  else if (especial === "laser") e.efeitos.laser = 4;
  else if (especial === "misseis") {
    for (let i = 0; i < 12; i++) {
      const a = -Math.PI / 2 + (i - 5.5) * 0.22;
      e.tirosJogador.push({ x: e.jogador.x, y: e.jogador.y, vx: Math.cos(a) * 320, vy: Math.sin(a) * 320, dano: 4, missil: true });
    }
  } else {
    e.efeitos.bomba = 0.8;
    e.tremor = 0.5;
    for (const t of e.tirosInimigos) explodir(e, t.x, t.y, "#ffe066", 1);
    e.tirosInimigos = [];
    e.feixes = [];
    for (const inimigo of e.inimigos) inimigo.vida -= 20;
    if (e.chefe && e.chefe.morrendo === 0) {
      e.chefe.vida -= e.chefe.vidaTotal * 0.12;
      e.chefe.pisca = 0.3;
    }
  }
}

/**
 * Uma tecla de texto. Vai para o alerta, se houver; senão para o terminal, se
 * aberto. Devolve false quando errou.
 */
export function digitar(e: Estado, caractere: string): boolean {
  if (e.situacao !== "jogando") return true;
  const alerta = e.alerta;
  if (alerta) {
    const esperado = alerta.palavra[alerta.digitado.length];
    if (!igual(esperado, caractere)) {
      e.erros += 1;
      return false;
    }
    e.acertos += 1;
    alerta.digitado += esperado;
    if (alerta.digitado === alerta.palavra) {
      e.alerta = null;
      e.alertaEm = (e.chefe ? FASES[e.fase].alertaChefe : FASES[e.fase].alertaOndas) * (0.85 + Math.random() * 0.3);
      e.energia = Math.min(ENERGIA_MAXIMA, e.energia + 30);
      e.pontos += 300;
      avisar(e, "Pane resolvida! +30 de energia");
    }
    return true;
  }

  const terminal = e.terminal;
  if (!terminal) return true;
  const tentativa = terminal.digitado + caractere;
  const codigos = codigosDaFase(e.fase);
  const possiveis = codigos.filter((c) => igual(c.codigo.slice(0, tentativa.length), tentativa));
  if (possiveis.length === 0) {
    e.erros += 1;
    return false;
  }
  e.acertos += 1;
  terminal.digitado = possiveis[0].codigo.slice(0, tentativa.length);
  const completo = possiveis.find((c) => c.codigo.length === tentativa.length);
  if (completo) {
    e.terminal = null;
    if (e.energia >= completo.custo) soltarEspecial(e, completo.id);
    else avisar(e, `Falta energia: ${completo.nome} custa ${completo.custo}`);
  }
  return true;
}

// ------------------------------------------------------------------ chefe

function atacar(e: Estado, chefe: Chefe, d: number) {
  const fase = FASES[e.fase];
  const v = 170 * fase.velocidadeTiro;
  const ataque: AtaqueChefe = fase.ataques[chefe.ataque % fase.ataques.length];
  chefe.tiroEm -= d;
  if (chefe.tiroEm > 0) return;
  const bx = chefe.x;
  const by = chefe.y + 40;
  switch (ataque) {
    case "leque": {
      const n = 9 + e.fase * 2;
      for (let i = 0; i < n; i++) e.tirosInimigos.push(mirado(e, bx, by, v, (i - (n - 1) / 2) * 0.13));
      chefe.tiroEm = 1;
      break;
    }
    case "espiral":
      for (let braco = 0; braco < 3; braco++) {
        const a = chefe.angulo + (braco * Math.PI * 2) / 3;
        e.tirosInimigos.push(tiro("normal", bx, by - 20, Math.cos(a) * v * 0.9, Math.sin(a) * v * 0.9));
      }
      chefe.angulo += 0.3;
      chefe.tiroEm = 0.085;
      break;
    case "rajada":
      e.tirosInimigos.push(mirado(e, bx - 34, by, v * 1.55), mirado(e, bx + 34, by, v * 1.55));
      chefe.tiroEm = 0.15;
      break;
    case "chuva":
      for (let i = 0; i < 3; i++) e.tirosInimigos.push(tiro("normal", 20 + Math.random() * (LARGURA - 40), -10, 0, v * (0.8 + Math.random() * 0.6), 6));
      chefe.tiroEm = 0.2;
      break;
    case "divisor":
      for (const desvio of [-0.35, 0, 0.35]) e.tirosInimigos.push(mirado(e, bx, by, v * 0.55, desvio, "divisor", 11));
      chefe.tiroEm = 1.4;
      break;
    case "laser":
      e.feixes.push({ x: e.jogador.x, topo: by, aviso: 0.9, ativo: 0.7, largura: 34 });
      e.feixes.push({ x: 30 + Math.random() * (LARGURA - 60), topo: by, aviso: 0.9, ativo: 0.7, largura: 34 });
      chefe.tiroEm = 1.6;
      break;
    case "ondas":
      for (let i = 0; i < 7; i++) e.tirosInimigos.push(tiro("onda", 40 + i * ((LARGURA - 80) / 6), by, 0, v * 0.75, 5));
      chefe.tiroEm = 0.7;
      break;
    case "perseguidor":
      for (const desvio of [-0.8, 0.8]) e.tirosInimigos.push(mirado(e, bx, by, v * 0.7, desvio, "perseguidor", 7));
      chefe.tiroEm = 0.55;
      break;
  }
}

// ------------------------------------------------------------------ passo

function moverInimigo(e: Estado, inimigo: Inimigo, d: number) {
  const fase = FASES[e.fase];
  const v = 190 * fase.velocidadeTiro;
  const j = e.jogador;
  inimigo.t += d;
  switch (inimigo.tipo) {
    case "drone":
      inimigo.y += 135 * d;
      break;
    case "zigue":
      inimigo.y += 115 * d;
      inimigo.x = inimigo.x0 + Math.sin(inimigo.t * 2.6) * 75;
      break;
    case "enxame":
      inimigo.y += 230 * d;
      inimigo.x += Math.sin(inimigo.t * 5) * 40 * d;
      break;
    case "rocha":
      inimigo.y += 80 * d;
      break;
    case "kamikaze":
      // Entra devagar, mira e mergulha em linha reta.
      if (inimigo.fase === 0) {
        inimigo.y += 90 * d;
        if (inimigo.t > 0.9 && inimigo.y > 40) {
          const a = Math.atan2(j.y - inimigo.y, j.x - inimigo.x);
          inimigo.vx = Math.cos(a) * 400;
          inimigo.vy = Math.sin(a) * 400;
          inimigo.fase = 1;
        }
      } else {
        inimigo.x += inimigo.vx * d;
        inimigo.y += inimigo.vy * d;
      }
      break;
    case "atirador":
    case "torreta":
    case "lanca": {
      const parada = inimigo.tipo === "atirador" ? 150 : inimigo.tipo === "torreta" ? 110 : 80;
      const tempo = inimigo.tipo === "torreta" ? 7 : 5;
      if (inimigo.fase === 0) {
        inimigo.y += 110 * d;
        if (inimigo.y >= parada) {
          inimigo.fase = 1;
          inimigo.t = 0;
        }
      } else if (inimigo.fase === 1) {
        if (inimigo.tipo === "lanca") inimigo.x += Math.sign(j.x - inimigo.x) * Math.min(Math.abs(j.x - inimigo.x), 90 * d);
        if (inimigo.t > tempo) inimigo.fase = 2;
      } else {
        inimigo.y += 160 * d;
      }
      break;
    }
    case "minador":
      inimigo.x += inimigo.vx * d;
      break;
    case "blindado":
      inimigo.y += 45 * d;
      break;
  }

  if (inimigo.y < 0 || inimigo.y > ALTURA * 0.75) return;
  inimigo.tiroEm -= d;
  if (inimigo.tiroEm > 0) return;
  switch (inimigo.tipo) {
    case "drone":
    case "zigue":
      e.tirosInimigos.push(mirado(e, inimigo.x, inimigo.y + 12, v));
      inimigo.tiroEm = 2.8 - e.fase * 0.25 + Math.random() * 1.5;
      break;
    case "atirador":
      if (inimigo.fase !== 1) break;
      for (let i = -2; i <= 2; i++) e.tirosInimigos.push(mirado(e, inimigo.x, inimigo.y + 16, v, i * 0.22));
      inimigo.tiroEm = 1.1;
      break;
    case "torreta":
      if (inimigo.fase !== 1) break;
      for (let braco = 0; braco < 2; braco++) {
        const a = inimigo.t * 2.2 + braco * Math.PI;
        e.tirosInimigos.push(tiro("normal", inimigo.x, inimigo.y, Math.cos(a) * v * 0.8, Math.sin(a) * v * 0.8, 4));
      }
      inimigo.tiroEm = 0.13;
      break;
    case "minador":
      e.tirosInimigos.push(tiro("mina", inimigo.x, inimigo.y + 10, 0, 30, 8));
      inimigo.tiroEm = 0.9;
      break;
    case "lanca":
      if (inimigo.fase !== 1) break;
      e.feixes.push({ x: inimigo.x, topo: inimigo.y + 16, aviso: 1, ativo: 0.6, largura: 26 });
      inimigo.tiroEm = 2.3;
      break;
    case "blindado":
      e.tirosInimigos.push(mirado(e, inimigo.x, inimigo.y + 30, v * 0.55, 0, "divisor", 11));
      inimigo.tiroEm = 2.2;
      break;
    default:
      inimigo.tiroEm = 99;
  }
}

function moverTiro(e: Estado, t: Tiro, d: number, novos: Tiro[]): boolean {
  t.t += d;
  switch (t.tipo) {
    case "mina":
      t.y += t.vy * d;
      if (t.t > 1.6) {
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          novos.push(tiro("normal", t.x, t.y, Math.cos(a) * 150, Math.sin(a) * 150, 4));
        }
        explodir(e, t.x, t.y, "#ff9f1c", 6);
        return false;
      }
      return true;
    case "divisor":
      t.x += t.vx * d;
      t.y += t.vy * d;
      if (t.t > 0.95) {
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + 0.2;
          novos.push(tiro("normal", t.x, t.y, Math.cos(a) * 140, Math.sin(a) * 140, 4));
        }
        return false;
      }
      return true;
    case "perseguidor": {
      if (t.t < 3.2) {
        const desejado = Math.atan2(e.jogador.y - t.y, e.jogador.x - t.x);
        const atual = Math.atan2(t.vy, t.vx);
        let diferenca = desejado - atual;
        while (diferenca > Math.PI) diferenca -= Math.PI * 2;
        while (diferenca < -Math.PI) diferenca += Math.PI * 2;
        const novo = atual + Math.max(-1.7 * d, Math.min(1.7 * d, diferenca));
        const v = Math.hypot(t.vx, t.vy);
        t.vx = Math.cos(novo) * v;
        t.vy = Math.sin(novo) * v;
      }
      t.x += t.vx * d;
      t.y += t.vy * d;
      return true;
    }
    case "onda":
      t.y += t.vy * d;
      t.x = t.x0 + Math.sin(t.t * 4) * 42;
      return true;
    default:
      t.x += t.vx * d;
      t.y += t.vy * d;
      return true;
  }
}

function alvoMaisPerto(e: Estado, x: number, y: number) {
  let melhor: { x: number; y: number } | null = null;
  let distancia = Infinity;
  for (const i of e.inimigos) {
    const dist = Math.hypot(i.x - x, i.y - y);
    if (i.y > 0 && dist < distancia) {
      distancia = dist;
      melhor = i;
    }
  }
  if (e.chefe && e.chefe.morrendo === 0 && Math.hypot(e.chefe.x - x, e.chefe.y - y) < distancia) melhor = e.chefe;
  return melhor;
}

export function passo(e: Estado, dt: number, entrada: Entrada) {
  if (e.situacao !== "jogando") return;
  const fase = FASES[e.fase];
  // Alerta e terminal deixam o jogo em câmera lenta: é a hora de digitar.
  const lento = e.terminal ? 0.3 : e.alerta ? 0.45 : 1;
  const d = dt * lento;
  e.t += d;

  // ----- jogador
  const j = e.jogador;
  let dx = (entrada.direita ? 1 : 0) - (entrada.esquerda ? 1 : 0);
  let dy = (entrada.baixo ? 1 : 0) - (entrada.cima ? 1 : 0);
  if (entrada.alvo && dx === 0 && dy === 0) {
    const ax = entrada.alvo.x - j.x;
    const ay = entrada.alvo.y - j.y;
    const dist = Math.hypot(ax, ay);
    if (dist > 4) {
      dx = ax / dist;
      dy = ay / dist;
    }
  }
  const norma = Math.hypot(dx, dy) || 1;
  // A nave anda em velocidade normal mesmo na câmera lenta: dá para fugir enquanto digita.
  j.x = Math.max(18, Math.min(LARGURA - 18, j.x + (dx / norma) * 340 * dt));
  j.y = Math.max(60, Math.min(ALTURA - 30, j.y + (dy / norma) * 340 * dt));
  j.invencivel = Math.max(0, j.invencivel - dt);

  j.tiroEm -= d;
  if (j.tiroEm <= 0 && e.efeitos.laser <= 0) {
    const nivel = Math.min(5, j.arma + (e.efeitos.turbo > 0 ? 1 : 0));
    const angulos = [[0], [-0.06, 0.06], [-0.18, 0, 0.18], [-0.28, -0.1, 0.1, 0.28], [-0.36, -0.18, 0, 0.18, 0.36]][nivel - 1];
    for (const a of angulos) {
      e.tirosJogador.push({ x: j.x + a * 40, y: j.y - 16, vx: Math.sin(a) * 760, vy: -Math.cos(a) * 760, dano: 1, missil: false });
    }
    j.tiroEm = e.efeitos.turbo > 0 ? 0.06 : 0.11;
  }

  for (const s of e.estrelas) {
    s.y += s.v * d;
    if (s.y > ALTURA) {
      s.y = -2;
      s.x = Math.random() * LARGURA;
    }
  }

  // ----- ondas e chefe
  if (!e.chefe) {
    e.grupoEm -= d;
    if (e.t < fase.duracao && e.grupoEm <= 0) {
      soltarGrupo(e);
      e.grupoEm = fase.ritmo * (0.65 + Math.random() * 0.6);
    }
    if (e.t >= fase.duracao && (e.inimigos.length === 0 || e.t > fase.duracao + 7)) {
      e.chefe = { x: LARGURA / 2, y: -90, vida: fase.vidaChefe, vidaTotal: fase.vidaChefe, t: 0, ataque: 0, tiroEm: 2, angulo: 0, pisca: 0, morrendo: 0 };
      e.alerta = null;
      e.alertaEm = 4;
      avisar(e, `Alerta: ${fase.chefe}!`);
    }
  }

  const chefe = e.chefe;
  if (chefe) {
    chefe.t += d;
    chefe.pisca = Math.max(0, chefe.pisca - dt);
    if (chefe.morrendo > 0) {
      chefe.morrendo += dt;
      if (Math.random() < 0.6) explodir(e, chefe.x + (Math.random() - 0.5) * 160, chefe.y + (Math.random() - 0.5) * 80, sortear(["#ffd166", "#ff6b6b", "#ffffff"]), 6);
      e.tremor = 0.2;
      if (chefe.morrendo > 2.4) e.situacao = "vitoria";
    } else {
      chefe.y = Math.min(130, chefe.y + 60 * d);
      chefe.x = LARGURA / 2 + Math.sin(chefe.t * 0.7) * (LARGURA / 2 - 110);
      if (chefe.y >= 130) {
        atacar(e, chefe, d);
        const ataque = Math.floor(chefe.t / 4);
        if (ataque !== chefe.ataque) {
          chefe.ataque = ataque;
          chefe.tiroEm = 0.6;
        }
      }
      if (chefe.vida <= 0) {
        chefe.vida = 0;
        chefe.morrendo = 0.01;
        e.alerta = null;
        e.terminal = null;
        e.tirosInimigos = [];
        e.feixes = [];
        e.pontos += 5000 + e.vidas * 1000;
      }
    }
  }

  // ----- inimigos e tiros
  for (const inimigo of e.inimigos) {
    inimigo.pisca = Math.max(0, inimigo.pisca - dt);
    moverInimigo(e, inimigo, d);
  }

  for (const t of e.tirosJogador) {
    if (t.missil) {
      const alvo = alvoMaisPerto(e, t.x, t.y);
      if (alvo) {
        const a = Math.atan2(alvo.y - t.y, alvo.x - t.x);
        t.vx += Math.cos(a) * 1600 * dt;
        t.vy += Math.sin(a) * 1600 * dt;
        const v = Math.hypot(t.vx, t.vy);
        if (v > 560) {
          t.vx = (t.vx / v) * 560;
          t.vy = (t.vy / v) * 560;
        }
      }
      if (Math.random() < 0.5) e.particulas.push({ x: t.x, y: t.y, vx: 0, vy: 0, vida: 0.25, cor: "#ffb703" });
    }
    t.x += t.vx * dt;
    t.y += t.vy * dt;
  }

  const novos: Tiro[] = [];
  e.tirosInimigos = e.tirosInimigos.filter((t) => moverTiro(e, t, d, novos));
  e.tirosInimigos.push(...novos);

  for (const f of e.feixes) {
    if (f.aviso > 0) f.aviso -= d;
    else f.ativo -= d;
  }
  e.feixes = e.feixes.filter((f) => f.aviso > 0 || f.ativo > 0);

  // ----- laser do jogador: coluna acima da nave
  if (e.efeitos.laser > 0) {
    for (const inimigo of e.inimigos) {
      if (Math.abs(inimigo.x - j.x) < 16 + RAIO_INIMIGO[inimigo.tipo] && inimigo.y < j.y) {
        inimigo.vida -= 45 * dt;
        inimigo.pisca = 0.05;
      }
    }
    if (chefe && chefe.morrendo === 0 && Math.abs(chefe.x - j.x) < 95) {
      chefe.vida -= 30 * dt;
      chefe.pisca = 0.05;
    }
    e.tirosInimigos = e.tirosInimigos.filter((t) => !(Math.abs(t.x - j.x) < 16 && t.y < j.y));
  }

  // ----- colisões: tiros do jogador
  for (const t of e.tirosJogador) {
    for (const inimigo of e.inimigos) {
      if (inimigo.vida > 0 && Math.hypot(t.x - inimigo.x, t.y - inimigo.y) < RAIO_INIMIGO[inimigo.tipo] + (t.missil ? 6 : 0)) {
        inimigo.vida -= t.dano;
        inimigo.pisca = 0.06;
        if (t.missil) explodir(e, t.x, t.y, "#ffb703", 5);
        t.y = -999;
        break;
      }
    }
    if (chefe && chefe.morrendo === 0 && chefe.y > 40 && Math.abs(t.x - chefe.x) < 90 && Math.abs(t.y - chefe.y) < 46) {
      chefe.vida -= t.dano;
      chefe.pisca = 0.05;
      e.energia = Math.min(ENERGIA_MAXIMA, e.energia + 0.08);
      t.y = -999;
    }
  }

  for (const inimigo of e.inimigos) if (inimigo.vida <= 0) abater(e, inimigo);
  e.inimigos = e.inimigos.filter((i) => i.vida > 0 && i.y < ALTURA + 50 && i.y > -200 && i.x > -60 && i.x < LARGURA + 60);
  e.tirosJogador = e.tirosJogador.filter((t) => t.y > -30 && t.y < ALTURA + 30 && t.x > -30 && t.x < LARGURA + 30);
  e.tirosInimigos = e.tirosInimigos.filter((t) => t.y < ALTURA + 30 && t.y > -60 && t.x > -30 && t.x < LARGURA + 30).slice(-500);

  // ----- escudo desfaz tiros encostados
  if (e.efeitos.escudo > 0) {
    e.tirosInimigos = e.tirosInimigos.filter((t) => {
      const perto = Math.hypot(t.x - j.x, t.y - j.y) < 44;
      if (perto) explodir(e, t.x, t.y, "#7ad7ff", 2);
      return !perto;
    });
  }

  // ----- colisões: jogador
  const atingido =
    e.tirosInimigos.some((t) => Math.hypot(t.x - j.x, t.y - j.y) < t.r + 5) ||
    e.inimigos.some((i) => Math.hypot(i.x - j.x, i.y - j.y) < RAIO_INIMIGO[i.tipo] + 8) ||
    e.feixes.some((f) => f.aviso <= 0 && Math.abs(f.x - j.x) < f.largura / 2 + 4 && j.y > f.topo) ||
    (chefe !== null && chefe.morrendo === 0 && Math.abs(chefe.x - j.x) < 90 && Math.abs(chefe.y - j.y) < 50);
  if (atingido) perderVida(e);

  // ----- power-ups
  for (const p of e.powerups) {
    p.t += d;
    p.y += 90 * d;
    if (Math.hypot(p.x - j.x, p.y - j.y) < 26) {
      if (p.tipo === "arma") {
        j.arma = Math.min(4, j.arma + 1);
        avisar(e, `Arma nível ${j.arma}!`);
      } else if (p.tipo === "energia") {
        e.energia = Math.min(ENERGIA_MAXIMA, e.energia + 20);
        texto(e, p.x, p.y, "+20 energia", "#7dffb2");
      } else {
        e.vidas = Math.min(VIDAS, e.vidas + 1);
        texto(e, p.x, p.y, "+1 vida", "#ff8fab");
      }
      p.y = ALTURA + 100;
    }
  }
  e.powerups = e.powerups.filter((p) => p.y < ALTURA + 20);

  // ----- alerta (pane): digitar a tempo ou perder uma vida
  if (e.alerta) {
    e.alerta.restante -= dt;
    e.msDigitando += dt * 1000;
    if (e.alerta.restante <= 0) {
      e.alerta = null;
      e.alertasPerdidos += 1;
      e.alertaEm = (chefe ? fase.alertaChefe : fase.alertaOndas) * (0.85 + Math.random() * 0.3);
      avisar(e, "A pane derrubou o casco!");
      perderVida(e, true);
    }
  } else if (!e.terminal && (!chefe || chefe.morrendo === 0)) {
    e.alertaEm -= dt;
    if (e.alertaEm <= 0) {
      const palavra = proximaPalavra(e, chefe !== null);
      const total = tempoDoAlerta(palavra, chefe !== null);
      e.alerta = { palavra, digitado: "", restante: total, total };
    }
  }

  // ----- terminal: fecha sozinho se o tempo acabar
  if (e.terminal) {
    e.terminal.restante -= dt;
    e.msDigitando += dt * 1000;
    if (e.terminal.restante <= 0) {
      e.terminal = null;
      avisar(e, "O terminal fechou: tente de novo com Enter");
    }
  }

  // ----- efeitos e combo
  for (const chave of ["turbo", "escudo", "laser", "bomba"] as const) e.efeitos[chave] = Math.max(0, e.efeitos[chave] - dt);
  e.comboTempo -= d;
  if (e.comboTempo <= 0) e.combo = 0;
  for (const p of e.particulas) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vida -= dt;
  }
  e.particulas = e.particulas.filter((p) => p.vida > 0).slice(-500);
  for (const t of e.textos) {
    t.y -= 40 * dt;
    t.vida -= dt;
  }
  e.textos = e.textos.filter((t) => t.vida > 0);
  if (e.aviso) {
    e.aviso.vida -= dt;
    if (e.aviso.vida <= 0) e.aviso = null;
  }
  e.tremor = Math.max(0, e.tremor - dt);
}

// ------------------------------------------------------------------ desenho

function nave(ctx: CanvasRenderingContext2D, x: number, y: number, inclinacao: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(122, 215, 255, 0.4)";
  ctx.beginPath();
  ctx.ellipse(0, 22, 6, 12 + Math.random() * 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.scale(1 - Math.abs(inclinacao) * 0.25, 1);
  ctx.fillStyle = "#e8eeff";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(7, -4);
  ctx.lineTo(20, 10);
  ctx.lineTo(20, 16);
  ctx.lineTo(6, 12);
  ctx.lineTo(4, 18);
  ctx.lineTo(-4, 18);
  ctx.lineTo(-6, 12);
  ctx.lineTo(-20, 16);
  ctx.lineTo(-20, 10);
  ctx.lineTo(-7, -4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#3a86ff";
  ctx.beginPath();
  ctx.ellipse(0, -2, 3.5, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const COR_INIMIGO: Record<TipoInimigo, string> = {
  drone: "#ff6b6b", zigue: "#ffb703", atirador: "#c77dff", rocha: "#8a6a4c", kamikaze: "#ff4d6d",
  torreta: "#4cc9f0", minador: "#f4a261", enxame: "#90be6d", lanca: "#ff006e", blindado: "#6c757d",
};

function poligono(ctx: CanvasRenderingContext2D, pontos: number[][]) {
  ctx.beginPath();
  pontos.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fill();
}

function inimigoForma(ctx: CanvasRenderingContext2D, inimigo: Inimigo) {
  ctx.save();
  ctx.translate(inimigo.x, inimigo.y);
  ctx.fillStyle = inimigo.pisca > 0 ? "#ffffff" : COR_INIMIGO[inimigo.tipo];
  switch (inimigo.tipo) {
    case "rocha":
      ctx.rotate(inimigo.t * 0.8);
      poligono(ctx, Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const r = 21 + ((i * 7) % 5) * 1.6;
        return [Math.cos(a) * r, Math.sin(a) * r];
      }));
      break;
    case "kamikaze":
      if (inimigo.fase === 1) ctx.rotate(Math.atan2(inimigo.vy, inimigo.vx) - Math.PI / 2);
      poligono(ctx, [[0, 16], [10, -10], [0, -4], [-10, -10]]);
      break;
    case "torreta":
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.rotate(inimigo.t * 2.2);
      ctx.fillStyle = "#10162b";
      ctx.fillRect(-4, -26, 8, 52);
      break;
    case "minador":
      poligono(ctx, [[-22, -6], [22, -6], [14, 10], [-14, 10]]);
      ctx.fillStyle = "#10162b";
      ctx.fillRect(-4, 6, 8, 8);
      break;
    case "enxame":
      poligono(ctx, [[0, 9], [8, -6], [-8, -6]]);
      break;
    case "lanca":
      poligono(ctx, [[0, 22], [12, -2], [6, -16], [-6, -16], [-12, -2]]);
      ctx.fillStyle = inimigo.fase === 1 && inimigo.tiroEm < 0.5 ? "#ffffff" : "#10162b";
      ctx.beginPath();
      ctx.arc(0, 4, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "blindado":
      poligono(ctx, [[-34, -18], [34, -18], [40, 4], [20, 26], [-20, 26], [-40, 4]]);
      ctx.fillStyle = "#adb5bd";
      ctx.fillRect(-26, -10, 52, 8);
      ctx.fillStyle = "#ff4d6d";
      ctx.beginPath();
      ctx.arc(0, 12, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    default: {
      const escala = inimigo.tipo === "atirador" ? 1.4 : 1;
      ctx.scale(escala, escala);
      poligono(ctx, [[0, 16], [16, -6], [8, -14], [0, -6], [-8, -14], [-16, -6]]);
      ctx.fillStyle = "#10162b";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function chefeForma(ctx: CanvasRenderingContext2D, chefe: Chefe, fase: number) {
  const cores = ["#ff6b6b", "#c9a27a", "#ff4d8d", "#3fd0e0", "#b26bff"];
  ctx.save();
  ctx.translate(chefe.x, chefe.y);
  ctx.fillStyle = chefe.pisca > 0 ? "#ffffff" : cores[fase];
  poligono(ctx, [[0, 50], [40, 30], [95, 10], [80, -30], [30, -20], [0, -45], [-30, -20], [-80, -30], [-95, 10], [-40, 30]]);
  ctx.fillStyle = "#10162b";
  ctx.fillRect(-46, 4, 16, 18);
  ctx.fillRect(30, 4, 16, 18);
  const brilho = 0.6 + Math.sin(chefe.t * 6) * 0.4;
  ctx.fillStyle = `rgba(255, 230, 102, ${brilho})`;
  ctx.beginPath();
  ctx.arc(0, 4, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const COR_TIRO: Record<TipoTiro, [string, string]> = {
  normal: ["#ff5c78", "#ffe0e6"],
  mina: ["#ff9f1c", "#fff3d6"],
  divisor: ["#9d4edd", "#e9d5ff"],
  perseguidor: ["#06d6a0", "#d8fff2"],
  onda: ["#4cc9f0", "#e0f7ff"],
};

export function desenhar(ctx: CanvasRenderingContext2D, e: Estado, entrada: Entrada) {
  const [alto, baixo, brilho] = FASES[e.fase].ceu;
  ctx.save();
  if (e.tremor > 0) ctx.translate((Math.random() - 0.5) * 24 * e.tremor, (Math.random() - 0.5) * 24 * e.tremor);

  const fundo = ctx.createLinearGradient(0, 0, 0, ALTURA);
  fundo.addColorStop(0, alto);
  fundo.addColorStop(1, baixo);
  ctx.fillStyle = fundo;
  ctx.fillRect(-20, -20, LARGURA + 40, ALTURA + 40);

  ctx.fillStyle = brilho;
  for (const s of e.estrelas) {
    ctx.globalAlpha = s.v / 260;
    ctx.fillRect(s.x, s.y, 2, s.v > 170 ? 8 : 2);
  }
  ctx.globalAlpha = 1;

  // Feixes: linha fina de aviso, depois o raio.
  for (const f of e.feixes) {
    if (f.aviso > 0) {
      ctx.fillStyle = `rgba(255, 60, 90, ${0.25 + Math.sin(f.aviso * 30) * 0.15})`;
      ctx.fillRect(f.x - 2, f.topo, 4, ALTURA);
    } else {
      ctx.fillStyle = "rgba(255, 60, 120, 0.55)";
      ctx.fillRect(f.x - f.largura / 2, f.topo, f.largura, ALTURA);
      ctx.fillStyle = "rgba(255, 230, 240, 0.9)";
      ctx.fillRect(f.x - f.largura / 6, f.topo, f.largura / 3, ALTURA);
    }
  }

  for (const p of e.powerups) {
    const cor = p.tipo === "arma" ? "#ffb703" : p.tipo === "energia" ? "#7dffb2" : "#ff8fab";
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 13 + Math.sin(p.t * 8) * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#10162b";
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(p.tipo === "arma" ? "P" : p.tipo === "energia" ? "E" : "+", p.x, p.y + 1);
  }

  for (const inimigo of e.inimigos) inimigoForma(ctx, inimigo);
  if (e.chefe) chefeForma(ctx, e.chefe, e.fase);

  for (const t of e.tirosJogador) {
    ctx.fillStyle = t.missil ? "#ffb703" : e.efeitos.turbo > 0 ? "#ffe066" : "#7ad7ff";
    if (t.missil) {
      ctx.beginPath();
      ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
      ctx.fill();
    } else ctx.fillRect(t.x - 1.5, t.y - 8, 3, 14);
  }

  const j = e.jogador;
  if (e.efeitos.laser > 0) {
    const pulso = 0.75 + Math.sin(e.t * 60) * 0.25;
    ctx.fillStyle = `rgba(122, 215, 255, ${0.45 * pulso})`;
    ctx.fillRect(j.x - 18, 0, 36, j.y - 18);
    ctx.fillStyle = "rgba(240, 250, 255, 0.95)";
    ctx.fillRect(j.x - 6, 0, 12, j.y - 18);
  }

  const inclinacao = (entrada.direita ? 1 : 0) - (entrada.esquerda ? 1 : 0);
  if (e.situacao !== "derrota" && (j.invencivel === 0 || Math.floor(j.invencivel * 12) % 2 === 0)) nave(ctx, j.x, j.y, inclinacao);
  if (e.efeitos.escudo > 0) {
    ctx.strokeStyle = `rgba(122, 215, 255, ${e.efeitos.escudo < 1.5 ? 0.4 + Math.sin(e.t * 40) * 0.3 : 0.8})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(j.x, j.y, 36, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (const t of e.tirosInimigos) {
    const [fora, dentro] = COR_TIRO[t.tipo];
    const piscando = t.tipo === "mina" && Math.floor(t.t * 10) % 2 === 0;
    ctx.fillStyle = piscando ? "#ffffff" : fora;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r + 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = dentro;
    ctx.beginPath();
    ctx.arc(t.x, t.y, Math.max(1.5, t.r - 1.5), 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of e.particulas) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.vida * 2));
    ctx.fillStyle = p.cor;
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
  }
  ctx.globalAlpha = 1;

  ctx.font = "bold 14px system-ui, sans-serif";
  ctx.textAlign = "center";
  for (const t of e.textos) {
    ctx.globalAlpha = Math.min(1, t.vida * 2);
    ctx.fillStyle = t.cor;
    ctx.fillText(t.texto, t.x, t.y);
  }
  ctx.globalAlpha = 1;

  if (e.efeitos.bomba > 0) {
    const progresso = 1 - e.efeitos.bomba / 0.8;
    ctx.strokeStyle = `rgba(255, 230, 102, ${1 - progresso})`;
    ctx.lineWidth = 22 * (1 - progresso) + 2;
    ctx.beginPath();
    ctx.arc(j.x, j.y, progresso * 950, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, 0.55 - progresso)})`;
    ctx.fillRect(-20, -20, LARGURA + 40, ALTURA + 40);
  }

  // Câmera lenta: tela um pouco mais escura.
  if (e.terminal || e.alerta) {
    ctx.fillStyle = e.alerta ? "rgba(60, 0, 10, 0.25)" : "rgba(10, 6, 30, 0.3)";
    ctx.fillRect(-20, -20, LARGURA + 40, ALTURA + 40);
  }
  ctx.restore();
}
