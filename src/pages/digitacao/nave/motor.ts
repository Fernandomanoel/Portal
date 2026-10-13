import { FASES, VIDAS, tempoDoEvento, type TipoInimigo } from "./dados";

/**
 * Motor do Esquadrão Hiper. O estado é um objeto mutável guardado numa ref
 * (dezenas de tiros por quadro não cabem num setState por objeto); a tela do
 * React só lê um resumo dele (vidas, pontos, evento de tempo).
 * Coordenadas lógicas: 480 × 720, origem no canto de cima à esquerda.
 */

export const LARGURA = 480;
export const ALTURA = 720;

interface Tiro {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Inimigo {
  tipo: TipoInimigo;
  x: number;
  y: number;
  x0: number;
  vida: number;
  t: number;
  tiroEm: number;
  parado: number;
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

export interface Evento {
  palavra: string;
  digitado: string;
  restante: number;
  total: number;
}

export type Situacao = "jogando" | "vitoria" | "derrota";

export interface Estado {
  fase: number;
  t: number;
  situacao: Situacao;
  jogador: { x: number; y: number; invencivel: number; tiroEm: number };
  tirosJogador: Tiro[];
  tirosInimigos: Tiro[];
  inimigos: Inimigo[];
  particulas: Particula[];
  estrelas: { x: number; y: number; v: number }[];
  chefe: Chefe | null;
  grupoEm: number;
  evento: Evento | null;
  eventoEm: number;
  /** Segundos de clarão do especial. */
  especial: number;
  tremor: number;
  vidas: number;
  pontos: number;
  abatidos: number;
  especiais: number;
  perdidos: number;
  /** Teclas certas e erradas nos eventos (precisão e palavras por minuto). */
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

const VIDA_INIMIGO: Record<TipoInimigo, number> = { drone: 2, zigue: 3, atirador: 7, rocha: 6 };
const PONTOS_INIMIGO: Record<TipoInimigo, number> = { drone: 100, zigue: 150, atirador: 300, rocha: 200 };
const RAIO_INIMIGO: Record<TipoInimigo, number> = { drone: 16, zigue: 15, atirador: 22, rocha: 24 };

const sortear = <T>(lista: readonly T[]) => lista[Math.floor(Math.random() * lista.length)];
const embaralhar = <T>(lista: readonly T[]) => [...lista].sort(() => Math.random() - 0.5);

export function criarEstado(fase: number, vidas = VIDAS, pontos = 0): Estado {
  return {
    fase,
    t: 0,
    situacao: "jogando",
    jogador: { x: LARGURA / 2, y: ALTURA - 90, invencivel: 2, tiroEm: 0 },
    tirosJogador: [],
    tirosInimigos: [],
    inimigos: [],
    particulas: [],
    estrelas: Array.from({ length: 70 }, () => ({ x: Math.random() * LARGURA, y: Math.random() * ALTURA, v: 30 + Math.random() * 170 })),
    chefe: null,
    grupoEm: 1.2,
    evento: null,
    eventoEm: FASES[fase].eventoOndas * 0.6,
    especial: 0,
    tremor: 0,
    vidas,
    pontos,
    abatidos: 0,
    especiais: 0,
    perdidos: 0,
    acertos: 0,
    erros: 0,
    msDigitando: 0,
    fila: [],
  };
}

function explodir(e: Estado, x: number, y: number, cor: string, quantidade = 14) {
  for (let i = 0; i < quantidade; i++) {
    const angulo = Math.random() * Math.PI * 2;
    const v = 60 + Math.random() * 220;
    e.particulas.push({ x, y, vx: Math.cos(angulo) * v, vy: Math.sin(angulo) * v, vida: 0.4 + Math.random() * 0.5, cor });
  }
}

function tiroMirado(e: Estado, x: number, y: number, velocidade: number, desvio = 0): Tiro {
  const angulo = Math.atan2(e.jogador.y - y, e.jogador.x - x) + desvio;
  return { x, y, vx: Math.cos(angulo) * velocidade, vy: Math.sin(angulo) * velocidade, r: 5 };
}

function soltarGrupo(e: Estado) {
  const fase = FASES[e.fase];
  const tipo = sortear(fase.inimigos);
  const quantos = tipo === "drone" ? 3 + Math.floor(Math.random() * 3) : tipo === "zigue" ? 3 : tipo === "rocha" ? 2 : 1;
  const meio = 70 + Math.random() * (LARGURA - 140);
  for (let i = 0; i < quantos; i++) {
    const x = tipo === "rocha" ? 50 + Math.random() * (LARGURA - 100) : Math.max(30, Math.min(LARGURA - 30, meio + (i - (quantos - 1) / 2) * 52));
    e.inimigos.push({
      tipo,
      x,
      x0: x,
      y: -30 - (tipo === "zigue" ? i * 46 : tipo === "drone" ? Math.abs(i - (quantos - 1) / 2) * 26 : i * 80),
      vida: VIDA_INIMIGO[tipo],
      t: Math.random() * 3,
      tiroEm: 0.8 + Math.random() * 1.4,
      parado: 0,
      pisca: 0,
    });
  }
}

function proximaPalavra(e: Estado, chefe: boolean) {
  if (e.fila.length === 0) e.fila = embaralhar(chefe ? FASES[e.fase].palavrasChefe : FASES[e.fase].palavras);
  return e.fila.pop()!;
}

function abrirEvento(e: Estado) {
  const chefe = e.chefe !== null;
  const palavra = proximaPalavra(e, chefe);
  const total = tempoDoEvento(palavra, chefe);
  e.evento = { palavra, digitado: "", restante: total, total };
}

function perderVida(e: Estado) {
  if (e.jogador.invencivel > 0) return;
  e.vidas -= 1;
  e.jogador.invencivel = 2;
  e.tremor = 0.4;
  explodir(e, e.jogador.x, e.jogador.y, "#7ad7ff", 22);
  // Limpa os tiros em volta: renascer dentro de uma chuva de balas não é justo.
  e.tirosInimigos = e.tirosInimigos.filter((t) => Math.hypot(t.x - e.jogador.x, t.y - e.jogador.y) > 140);
  if (e.vidas <= 0) e.situacao = "derrota";
}

/** O especial: limpa os tiros inimigos, acerta todo mundo na tela e uma parte da vida do chefe. */
function soltarEspecial(e: Estado) {
  e.especial = 0.7;
  e.tremor = 0.35;
  e.especiais += 1;
  for (const tiro of e.tirosInimigos) explodir(e, tiro.x, tiro.y, "#ffe066", 2);
  e.tirosInimigos = [];
  for (const inimigo of e.inimigos) inimigo.vida -= 12;
  if (e.chefe && e.chefe.morrendo === 0) {
    e.chefe.vida -= e.chefe.vidaTotal * 0.12;
    e.chefe.pisca = 0.3;
  }
  e.pontos += 500;
}

/** Uma tecla digitada no evento. Devolve false quando errou. */
export function digitar(e: Estado, caractere: string): boolean {
  const ev = e.evento;
  if (!ev || e.situacao !== "jogando") return true;
  const esperado = ev.palavra[ev.digitado.length];
  // Maiúscula ou minúscula valem igual: no meio do tiroteio ninguém confere o Caps Lock.
  if (esperado.toLowerCase() !== caractere.toLowerCase()) {
    e.erros += 1;
    return false;
  }
  e.acertos += 1;
  ev.digitado += esperado;
  if (ev.digitado === ev.palavra) {
    e.evento = null;
    e.eventoEm = (e.chefe ? FASES[e.fase].eventoChefe : FASES[e.fase].eventoOndas) * (0.8 + Math.random() * 0.4);
    soltarEspecial(e);
  }
  return true;
}

function atacar(e: Estado, chefe: Chefe, dt: number) {
  const fase = FASES[e.fase];
  const v = 170 * fase.velocidadeTiro;
  const ataque = fase.ataques[chefe.ataque % fase.ataques.length];
  chefe.tiroEm -= dt;
  if (chefe.tiroEm > 0) return;
  const boca = { x: chefe.x, y: chefe.y + 40 };
  if (ataque === "leque") {
    const n = 9 + e.fase * 2;
    for (let i = 0; i < n; i++) e.tirosInimigos.push(tiroMirado(e, boca.x, boca.y, v, (i - (n - 1) / 2) * 0.13));
    chefe.tiroEm = 1.1;
  } else if (ataque === "espiral") {
    for (let braco = 0; braco < 3; braco++) {
      const a = chefe.angulo + (braco * Math.PI * 2) / 3;
      e.tirosInimigos.push({ x: boca.x, y: boca.y - 20, vx: Math.cos(a) * v * 0.9, vy: Math.sin(a) * v * 0.9, r: 5 });
    }
    chefe.angulo += 0.32;
    chefe.tiroEm = 0.09;
  } else if (ataque === "rajada") {
    e.tirosInimigos.push(tiroMirado(e, boca.x - 30, boca.y, v * 1.5), tiroMirado(e, boca.x + 30, boca.y, v * 1.5));
    chefe.tiroEm = 0.16;
  } else {
    for (let i = 0; i < 3; i++) {
      e.tirosInimigos.push({ x: 20 + Math.random() * (LARGURA - 40), y: -10, vx: 0, vy: v * (0.8 + Math.random() * 0.6), r: 6 });
    }
    chefe.tiroEm = 0.22;
  }
}

export function passo(e: Estado, dt: number, entrada: Entrada) {
  if (e.situacao !== "jogando") return;
  const fase = FASES[e.fase];
  // Durante o evento o tempo do jogo corre em câmera lenta: é o momento de digitar.
  const lento = e.evento ? 0.45 : 1;
  const d = dt * lento;
  e.t += d;

  // ----- jogador
  const j = e.jogador;
  const velocidade = 330;
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
  j.x = Math.max(18, Math.min(LARGURA - 18, j.x + (dx / norma) * velocidade * dt));
  j.y = Math.max(60, Math.min(ALTURA - 30, j.y + (dy / norma) * velocidade * dt));
  j.invencivel = Math.max(0, j.invencivel - dt);
  j.tiroEm -= d;
  if (j.tiroEm <= 0) {
    e.tirosJogador.push({ x: j.x - 9, y: j.y - 16, vx: 0, vy: -720, r: 3 }, { x: j.x + 9, y: j.y - 16, vx: 0, vy: -720, r: 3 });
    j.tiroEm = 0.11;
  }

  // ----- fundo
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
      e.grupoEm = fase.ritmo * (0.7 + Math.random() * 0.6);
    }
    if (e.t >= fase.duracao && e.inimigos.length === 0) {
      e.chefe = { x: LARGURA / 2, y: -90, vida: fase.vidaChefe, vidaTotal: fase.vidaChefe, t: 0, ataque: 0, tiroEm: 2, angulo: 0, pisca: 0, morrendo: 0 };
      e.evento = null;
      e.eventoEm = 3.5;
    }
  }

  const chefe = e.chefe;
  if (chefe) {
    chefe.t += d;
    chefe.pisca = Math.max(0, chefe.pisca - dt);
    if (chefe.morrendo > 0) {
      chefe.morrendo += dt;
      if (Math.random() < 0.5) explodir(e, chefe.x + (Math.random() - 0.5) * 140, chefe.y + (Math.random() - 0.5) * 70, sortear(["#ffd166", "#ff6b6b", "#ffffff"]), 6);
      if (chefe.morrendo > 2.2) e.situacao = "vitoria";
    } else {
      chefe.y = Math.min(130, chefe.y + 60 * d);
      chefe.x = LARGURA / 2 + Math.sin(chefe.t * 0.7) * (LARGURA / 2 - 110);
      if (chefe.y >= 130) {
        atacar(e, chefe, d);
        // Troca de ataque a cada 4 segundos.
        const ataque = Math.floor(chefe.t / 4);
        if (ataque !== chefe.ataque) {
          chefe.ataque = ataque;
          chefe.tiroEm = 0.6;
        }
      }
      if (chefe.vida <= 0) {
        chefe.vida = 0;
        chefe.morrendo = 0.01;
        e.evento = null;
        e.tirosInimigos = [];
        e.pontos += 5000 + e.vidas * 1000;
      }
    }
  }

  // ----- inimigos
  for (const inimigo of e.inimigos) {
    inimigo.t += d;
    inimigo.pisca = Math.max(0, inimigo.pisca - dt);
    if (inimigo.tipo === "drone") {
      inimigo.y += 130 * d;
    } else if (inimigo.tipo === "zigue") {
      inimigo.y += 110 * d;
      inimigo.x = inimigo.x0 + Math.sin(inimigo.t * 2.4) * 70;
    } else if (inimigo.tipo === "rocha") {
      inimigo.y += 85 * d;
    } else if (inimigo.y < 150 && inimigo.parado === 0) {
      inimigo.y += 110 * d;
    } else if (inimigo.parado < 4.5) {
      inimigo.parado += d;
    } else {
      inimigo.y += 150 * d;
    }

    if (inimigo.tipo !== "rocha" && inimigo.y > 0 && inimigo.y < ALTURA * 0.7) {
      inimigo.tiroEm -= d;
      if (inimigo.tiroEm <= 0) {
        const v = 190 * fase.velocidadeTiro;
        if (inimigo.tipo === "atirador") {
          for (let i = -2; i <= 2; i++) e.tirosInimigos.push(tiroMirado(e, inimigo.x, inimigo.y + 16, v, i * 0.22));
          inimigo.tiroEm = 1.1;
        } else {
          e.tirosInimigos.push(tiroMirado(e, inimigo.x, inimigo.y + 12, v));
          // Na primeira fase os drones atiram pouco; a cadência sobe fase a fase.
          inimigo.tiroEm = 2.8 - e.fase * 0.25 + Math.random() * 1.5;
        }
      }
    }
  }

  // ----- tiros
  for (const tiro of e.tirosJogador) tiro.y += tiro.vy * dt;
  for (const tiro of e.tirosInimigos) {
    tiro.x += tiro.vx * d;
    tiro.y += tiro.vy * d;
  }

  // ----- colisões: tiros do jogador
  for (const tiro of e.tirosJogador) {
    for (const inimigo of e.inimigos) {
      if (inimigo.vida > 0 && Math.hypot(tiro.x - inimigo.x, tiro.y - inimigo.y) < RAIO_INIMIGO[inimigo.tipo]) {
        inimigo.vida -= 1;
        inimigo.pisca = 0.06;
        tiro.y = -100;
        break;
      }
    }
    if (chefe && chefe.morrendo === 0 && chefe.y > 40 && Math.abs(tiro.x - chefe.x) < 80 && Math.abs(tiro.y - chefe.y) < 44) {
      chefe.vida -= 1;
      chefe.pisca = 0.05;
      tiro.y = -100;
    }
  }

  for (const inimigo of e.inimigos) {
    if (inimigo.vida <= 0) {
      e.pontos += PONTOS_INIMIGO[inimigo.tipo];
      e.abatidos += 1;
      explodir(e, inimigo.x, inimigo.y, inimigo.tipo === "rocha" ? "#c9a27a" : "#ff8a5c");
    }
  }
  e.inimigos = e.inimigos.filter((i) => i.vida > 0 && i.y < ALTURA + 40);
  e.tirosJogador = e.tirosJogador.filter((t) => t.y > -20);
  e.tirosInimigos = e.tirosInimigos.filter((t) => t.y < ALTURA + 20 && t.y > -40 && t.x > -20 && t.x < LARGURA + 20);

  // ----- colisões: jogador
  if (j.invencivel <= 0) {
    const atingido =
      e.tirosInimigos.some((t) => Math.hypot(t.x - j.x, t.y - j.y) < t.r + 5) ||
      e.inimigos.some((i) => Math.hypot(i.x - j.x, i.y - j.y) < RAIO_INIMIGO[i.tipo] + 8) ||
      (chefe !== null && chefe.morrendo === 0 && Math.abs(chefe.x - j.x) < 90 && Math.abs(chefe.y - j.y) < 50);
    if (atingido) perderVida(e);
  }

  // ----- evento de tempo
  if (e.evento) {
    e.evento.restante -= dt;
    e.msDigitando += dt * 1000;
    if (e.evento.restante <= 0) {
      e.evento = null;
      e.perdidos += 1;
      e.eventoEm = (chefe ? fase.eventoChefe : fase.eventoOndas) * (0.8 + Math.random() * 0.4);
      e.jogador.invencivel = 0;
      perderVida(e);
    }
  } else if (!chefe || chefe.morrendo === 0) {
    e.eventoEm -= dt;
    if (e.eventoEm <= 0 && (chefe ? chefe.y >= 130 : e.t < fase.duracao)) abrirEvento(e);
  }

  // ----- efeitos
  for (const p of e.particulas) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vida -= dt;
  }
  e.particulas = e.particulas.filter((p) => p.vida > 0).slice(-400);
  e.especial = Math.max(0, e.especial - dt);
  e.tremor = Math.max(0, e.tremor - dt);
}

// ------------------------------------------------------------------ desenho

function nave(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(122, 215, 255, 0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 22, 6, 12 + Math.random() * 6, 0, 0, Math.PI * 2);
  ctx.fill();
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

function inimigoForma(ctx: CanvasRenderingContext2D, inimigo: Inimigo) {
  ctx.save();
  ctx.translate(inimigo.x, inimigo.y);
  const branco = inimigo.pisca > 0;
  if (inimigo.tipo === "rocha") {
    ctx.rotate(inimigo.t * 0.8);
    ctx.fillStyle = branco ? "#ffffff" : "#8a6a4c";
    ctx.beginPath();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const r = 20 + ((i * 7) % 5) * 1.6;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
  } else {
    const cor = inimigo.tipo === "drone" ? "#ff6b6b" : inimigo.tipo === "zigue" ? "#ffb703" : "#c77dff";
    const tamanho = inimigo.tipo === "atirador" ? 1.4 : 1;
    ctx.scale(tamanho, tamanho);
    ctx.fillStyle = branco ? "#ffffff" : cor;
    ctx.beginPath();
    ctx.moveTo(0, 16);
    ctx.lineTo(16, -6);
    ctx.lineTo(8, -14);
    ctx.lineTo(0, -6);
    ctx.lineTo(-8, -14);
    ctx.lineTo(-16, -6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#10162b";
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function chefeForma(ctx: CanvasRenderingContext2D, chefe: Chefe, fase: number) {
  const cores = ["#ff6b6b", "#c9a27a", "#ff4d8d", "#3fd0e0", "#b26bff"];
  ctx.save();
  ctx.translate(chefe.x, chefe.y);
  ctx.fillStyle = chefe.pisca > 0 ? "#ffffff" : cores[fase];
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.lineTo(40, 30);
  ctx.lineTo(95, 10);
  ctx.lineTo(80, -30);
  ctx.lineTo(30, -20);
  ctx.lineTo(0, -45);
  ctx.lineTo(-30, -20);
  ctx.lineTo(-80, -30);
  ctx.lineTo(-95, 10);
  ctx.lineTo(-40, 30);
  ctx.closePath();
  ctx.fill();
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

export function desenhar(ctx: CanvasRenderingContext2D, e: Estado) {
  const [alto, baixo, brilho] = FASES[e.fase].ceu;
  ctx.save();
  if (e.tremor > 0) ctx.translate((Math.random() - 0.5) * 12 * e.tremor * 2, (Math.random() - 0.5) * 12 * e.tremor * 2);

  const fundo = ctx.createLinearGradient(0, 0, 0, ALTURA);
  fundo.addColorStop(0, alto);
  fundo.addColorStop(1, baixo);
  ctx.fillStyle = fundo;
  ctx.fillRect(-20, -20, LARGURA + 40, ALTURA + 40);

  ctx.fillStyle = brilho;
  for (const s of e.estrelas) {
    ctx.globalAlpha = s.v / 220;
    ctx.fillRect(s.x, s.y, 2, s.v > 150 ? 6 : 2);
  }
  ctx.globalAlpha = 1;

  for (const inimigo of e.inimigos) inimigoForma(ctx, inimigo);
  if (e.chefe) chefeForma(ctx, e.chefe, e.fase);

  ctx.fillStyle = "#7ad7ff";
  for (const tiro of e.tirosJogador) ctx.fillRect(tiro.x - 1.5, tiro.y - 8, 3, 14);

  if (e.situacao !== "derrota" && (e.jogador.invencivel === 0 || Math.floor(e.jogador.invencivel * 12) % 2 === 0)) nave(ctx, e.jogador.x, e.jogador.y);

  for (const tiro of e.tirosInimigos) {
    ctx.fillStyle = "#ff5c78";
    ctx.beginPath();
    ctx.arc(tiro.x, tiro.y, tiro.r + 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffe0e6";
    ctx.beginPath();
    ctx.arc(tiro.x, tiro.y, tiro.r - 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of e.particulas) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.vida * 2));
    ctx.fillStyle = p.cor;
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
  }
  ctx.globalAlpha = 1;

  // Especial: anel que cresce a partir da nave e clarão na tela toda.
  if (e.especial > 0) {
    const progresso = 1 - e.especial / 0.7;
    ctx.strokeStyle = `rgba(255, 230, 102, ${1 - progresso})`;
    ctx.lineWidth = 18 * (1 - progresso) + 2;
    ctx.beginPath();
    ctx.arc(e.jogador.x, e.jogador.y, progresso * 900, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, 0.5 - progresso)})`;
    ctx.fillRect(-20, -20, LARGURA + 40, ALTURA + 40);
  }

  // Câmera lenta do evento: tela um pouco mais escura.
  if (e.evento) {
    ctx.fillStyle = "rgba(10, 6, 30, 0.25)";
    ctx.fillRect(-20, -20, LARGURA + 40, ALTURA + 40);
  }
  ctx.restore();
}
