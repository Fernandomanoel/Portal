import type { Agregacao, Grafico, ListaAcompanhamento } from "../types/lista.js";
import { agregar, numerosDaColuna, ROTULO_AGREGACAO, textoVisivel, type Calculo } from "./dadosLista.js";
import { formatarNumero } from "./formulas.js";

/**
 * Dados e desenho dos gráficos das listas. O desenho é uma função que devolve o texto de um SVG
 * (sem React e sem DOM): a tela o mostra e a exportação o transforma em PNG, com a mesma imagem.
 * Escolhas de desenho: poucas cores fixas em ordem, barras finas com ponta arredondada, linha de 2 px,
 * pontos de 8 px com anel da cor do fundo, grade discreta e legenda sempre que há mais de uma série.
 */

export interface DadosGrafico {
  categorias: string[];
  series: { nome: string; valores: (number | null)[]; formato: "numero" | "moeda" | "percentual"; casas?: number; agregacao: Agregacao }[];
  /** Linhas da lista sem categoria preenchida ficam de fora: quantas foram. */
  semCategoria: number;
}

const MAX_CATEGORIAS = 60;

export function dadosDoGrafico(lista: ListaAcompanhamento, calc: Calculo, g: Grafico): DadosGrafico {
  const c = lista.colunas.findIndex((col) => col.id === g.categoria);
  const coluna = lista.colunas[c];
  if (!coluna) return { categorias: [], series: [], semCategoria: 0 };

  const rotuloDe = (l: number): string => {
    const linha = lista.linhas[l];
    if (coluna.tipo === "marca") return linha.valores[coluna.id] === true ? "Marcado" : "Não marcado";
    if (coluna.tipo === "simnao") return linha.valores[coluna.id] === "sim" ? "Sim" : linha.valores[coluna.id] === "nao" ? "Não" : "";
    if (coluna.tipo === "data") return typeof linha.valores[coluna.id] === "string" ? (linha.valores[coluna.id] as string) : "";
    return textoVisivel(lista, calc, l, c).trim();
  };

  const grupos = new Map<string, number[]>();
  let semCategoria = 0;
  lista.linhas.forEach((linha, l) => {
    if (linha.titulo !== undefined) return;
    const rotulo = rotuloDe(l);
    if (!rotulo) {
      semCategoria++;
      return;
    }
    grupos.set(rotulo, [...(grupos.get(rotulo) ?? []), l]);
  });

  let chaves = [...grupos.keys()];
  if (coluna.tipo === "data") chaves.sort();
  else if (coluna.tipo === "opcoes" && coluna.opcoes) chaves.sort((a, b) => (coluna.opcoes!.indexOf(a) + 1 || 999) - (coluna.opcoes!.indexOf(b) + 1 || 999));
  chaves = chaves.slice(0, MAX_CATEGORIAS);
  const categorias = chaves.map((k) => (coluna.tipo === "data" ? k.split("-").reverse().join("/") : k));

  const series = g.series.map((s) => {
    const col = s.coluna ? lista.colunas.findIndex((x) => x.id === s.coluna) : -1;
    const alvo = col >= 0 ? lista.colunas[col] : undefined;
    const valores = chaves.map((k) => {
      const linhas = grupos.get(k) ?? [];
      if (!alvo) return linhas.length;
      const numeros = linhas.flatMap((l) => numerosDaColuna(lista, calc, col, l, l + 1));
      return agregar(numeros, s.agregacao);
    });
    const nome = alvo ? `${ROTULO_AGREGACAO[s.agregacao]} de ${alvo.titulo}` : "Quantidade de linhas";
    return { nome, valores, formato: alvo?.tipo === "numero" ? (alvo.formato ?? "numero") : "numero", casas: alvo?.casas, agregacao: s.agregacao };
  });
  return { categorias, series, semCategoria };
}

// ------------------------------------------------------------------ cores

export interface Tema {
  series: string[];
  texto: string;
  suave: string;
  grade: string;
  superficie: string;
}

/** Oito matizes na ordem fixa, validados para daltonismo; os mesmos nomes em claro e escuro. */
export const PALETA_CLARA = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#6250d6", "#e34948"];
export const TEMA_CLARO: Tema = { series: PALETA_CLARA, texto: "#0b0b0b", suave: "#52514e", grade: "#e4e3de", superficie: "#fcfcfb" };
/** Na tela, as cores vêm de variáveis CSS (e acompanham o tema claro/escuro do portal). */
export const TEMA_VARIAVEIS: Tema = {
  series: PALETA_CLARA.map((_, i) => `var(--g${i + 1})`),
  texto: "var(--g-texto)",
  suave: "var(--g-suave)",
  grade: "var(--g-grade)",
  superficie: "var(--g-superficie)",
};

// ------------------------------------------------------------------ desenho

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const FONTE = 'font-family="Segoe UI, system-ui, -apple-system, sans-serif"';
const corte = (s: string, max: number) => (s.length > max ? `${s.slice(0, Math.max(1, max - 1))}…` : s);
const compacto = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Escala «redonda» para o eixo: de `min` a `max` em passos de 1, 2, 2,5 ou 5 vezes uma potência de 10. */
export function escala(minimo: number, maximo: number, alvo = 5) {
  const min = Math.min(0, minimo);
  const max = Math.max(0, maximo);
  if (max === min) return { min: 0, max: 1, passo: 0.2, ticks: [0, 0.2, 0.4, 0.6, 0.8, 1] };
  const bruto = (max - min) / alvo;
  const potencia = 10 ** Math.floor(Math.log10(bruto));
  const f = bruto / potencia;
  const passo = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * potencia;
  const inicio = Math.floor(min / passo) * passo;
  const fim = Math.ceil(max / passo) * passo;
  const ticks: number[] = [];
  for (let v = inicio; v <= fim + passo / 2; v += passo) ticks.push(Math.round(v / passo) * passo);
  return { min: inicio, max: fim, passo, ticks };
}

export interface OpcoesSvg {
  largura?: number;
  altura?: number;
  tema?: Tema;
}

const rotuloTipo: Record<Grafico["tipo"], string> = { coluna: "colunas", barra: "barras", linha: "linhas", area: "área", pizza: "pizza", rosca: "rosca", empilhada: "colunas empilhadas" };

/** Resumo em texto, para leitores de tela e para a tabela de dados. */
export function descricaoDoGrafico(g: Grafico, d: DadosGrafico): string {
  if (!d.categorias.length) return `Gráfico de ${rotuloTipo[g.tipo]} sem dados.`;
  const partes = d.series.map((s) => `${s.nome}: ${d.categorias.map((c, i) => `${c} ${s.valores[i] === null ? "sem valor" : formatarNumero(s.valores[i]!, s.formato, s.casas)}`).join("; ")}`);
  return `Gráfico de ${rotuloTipo[g.tipo]} «${g.titulo}». ${partes.join(". ")}.`;
}

function arco(cx: number, cy: number, r: number, ri: number, a0: number, a1: number) {
  const p = (raio: number, a: number) => `${r2(cx + raio * Math.cos(a))} ${r2(cy + raio * Math.sin(a))}`;
  const grande = a1 - a0 > Math.PI ? 1 : 0;
  if (a1 - a0 >= Math.PI * 2 - 1e-6) {
    const miolo = ri > 0 ? ` M ${cx + ri} ${cy} A ${ri} ${ri} 0 1 0 ${cx - ri} ${cy} A ${ri} ${ri} 0 1 0 ${cx + ri} ${cy}` : "";
    return `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}${miolo}`;
  }
  return ri > 0
    ? `M ${p(r, a0)} A ${r} ${r} 0 ${grande} 1 ${p(r, a1)} L ${p(ri, a1)} A ${ri} ${ri} 0 ${grande} 0 ${p(ri, a0)} Z`
    : `M ${cx} ${cy} L ${p(r, a0)} A ${r} ${r} 0 ${grande} 1 ${p(r, a1)} Z`;
}

/** Barra com a ponta de dados arredondada (4 px) e a base reta, crescendo de uma linha de base única. */
function barraVertical(x: number, base: number, topo: number, w: number) {
  const h = base - topo;
  if (h <= 0) return "";
  const r = Math.min(4, w / 2, h);
  return `M ${r2(x)} ${r2(base)} V ${r2(topo + r)} Q ${r2(x)} ${r2(topo)} ${r2(x + r)} ${r2(topo)} H ${r2(x + w - r)} Q ${r2(x + w)} ${r2(topo)} ${r2(x + w)} ${r2(topo + r)} V ${r2(base)} Z`;
}
function barraHorizontal(base: number, y: number, fim: number, h: number) {
  const w = fim - base;
  if (w <= 0) return "";
  const r = Math.min(4, h / 2, w);
  return `M ${r2(base)} ${r2(y)} H ${r2(fim - r)} Q ${r2(fim)} ${r2(y)} ${r2(fim)} ${r2(y + r)} V ${r2(y + h - r)} Q ${r2(fim)} ${r2(y + h)} ${r2(fim - r)} ${r2(y + h)} H ${r2(base)} Z`;
}

export function svgDoGrafico(g: Grafico, d: DadosGrafico, opcoes: OpcoesSvg = {}): string {
  const W = opcoes.largura ?? 640;
  const H = opcoes.altura ?? 360;
  const t = opcoes.tema ?? TEMA_VARIAVEIS;
  const partes: string[] = [];
  const descricao = descricaoDoGrafico(g, d);
  const cabeca = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(`Gráfico de ${rotuloTipo[g.tipo]}: ${g.titulo}`)}" ${FONTE}><title>${esc(g.titulo)}</title><desc>${esc(descricao)}</desc><rect width="${W}" height="${H}" fill="${t.superficie}"/>`;
  const texto = (x: number, y: number, s: string, o: { tamanho?: number; cor?: string; ancora?: "start" | "middle" | "end"; peso?: number; rotacao?: number } = {}) =>
    `<text x="${r2(x)}" y="${r2(y)}" font-size="${o.tamanho ?? 11}" fill="${o.cor ?? t.suave}" text-anchor="${o.ancora ?? "start"}"${o.peso ? ` font-weight="${o.peso}"` : ""}${o.rotacao ? ` transform="rotate(${o.rotacao} ${r2(x)} ${r2(y)})"` : ""}>${esc(s)}</text>`;

  partes.push(texto(16, 24, corte(g.titulo, 70), { tamanho: 15, cor: t.texto, peso: 700 }));
  if (!d.categorias.length || !d.series.length) {
    partes.push(texto(W / 2, H / 2, "Sem dados para mostrar: escolha as colunas e preencha a lista.", { ancora: "middle", tamanho: 13 }));
    return `${cabeca}${partes.join("")}</svg>`;
  }

  const sFmt = d.series[0];
  const fmt = (v: number, s = sFmt) => formatarNumero(v, s.formato, s.casas);
  const cor = (i: number) => t.series[i % t.series.length];
  const pizza = g.tipo === "pizza" || g.tipo === "rosca";
  const legenda = d.series.length > 1 && !pizza;

  // Legenda: sempre que há mais de uma série, com o nome em tinta de texto e um quadradinho da cor.
  let topo = 40;
  if (legenda) {
    let x = 16;
    d.series.forEach((s, i) => {
      const nome = corte(s.nome, 28);
      partes.push(`<rect x="${x}" y="40" width="10" height="10" rx="2" fill="${cor(i)}"/>`, texto(x + 15, 49, nome, { tamanho: 11 }));
      x += 15 + nome.length * 6 + 18;
    });
    topo = 62;
  }

  if (pizza) {
    // Uma série só; passando de 8 fatias, o que sobra vira «Outros».
    const valores = d.categorias.map((c, i) => ({ c, v: Math.max(0, d.series[0].valores[i] ?? 0) })).filter((x) => x.v > 0);
    valores.sort((a, b) => b.v - a.v);
    const fatias = valores.length > 8 ? [...valores.slice(0, 7), { c: "Outros", v: valores.slice(7).reduce((s, x) => s + x.v, 0) }] : valores;
    const total = fatias.reduce((s, x) => s + x.v, 0);
    if (!total) {
      partes.push(texto(W / 2, H / 2, "Os valores são zero: não há o que mostrar na pizza.", { ancora: "middle", tamanho: 13 }));
      return `${cabeca}${partes.join("")}</svg>`;
    }
    const cx = 180;
    const cy = (topo + H - 16) / 2 + 6;
    const R = Math.min((H - topo - 28) / 2, 140);
    const ri = g.tipo === "rosca" ? R * 0.58 : 0;
    let a = -Math.PI / 2;
    fatias.forEach((f, i) => {
      const ang = (f.v / total) * Math.PI * 2;
      const pct = (f.v / total) * 100;
      partes.push(`<path d="${arco(cx, cy, R, ri, a, a + ang)}" fill="${cor(i)}" stroke="${t.superficie}" stroke-width="2" fill-rule="evenodd"><title>${esc(`${f.c}: ${fmt(f.v)} (${pct.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%)`)}</title></path>`);
      if (pct >= 7 || g.valores) {
        const m = a + ang / 2;
        const rr = ri ? (R + ri) / 2 : R * 0.66;
        // Branco sobre azul, laranja, verde-escuro, violeta e vermelho; tinta escura sobre aqua, amarelo e magenta (mais claros).
        const claroNaFatia = [2, 3, 4].includes(i % 8);
        if (pct >= 4) partes.push(texto(cx + rr * Math.cos(m), cy + rr * Math.sin(m) + 4, `${pct.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%`, { ancora: "middle", tamanho: 11, cor: claroNaFatia ? "#0b0b0b" : "#ffffff", peso: 700 }));
      }
      a += ang;
    });
    if (ri) {
      partes.push(texto(cx, cy - 2, fmt(total), { ancora: "middle", tamanho: 18, cor: t.texto, peso: 700 }), texto(cx, cy + 16, "total", { ancora: "middle", tamanho: 11 }));
    }
    // Legenda ao lado: nome, valor e porcentagem.
    fatias.forEach((f, i) => {
      const y = topo + 6 + i * 28;
      partes.push(`<rect x="360" y="${y}" width="12" height="12" rx="2" fill="${cor(i)}"/>`, texto(380, y + 10, corte(f.c, 22), { tamanho: 12, cor: t.texto }), texto(W - 16, y + 10, `${fmt(f.v)} · ${((f.v / total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`, { ancora: "end", tamanho: 12 }));
    });
    return `${cabeca}${partes.join("")}</svg>`;
  }

  const n = d.categorias.length;
  const horizontal = g.tipo === "barra";
  const empilhada = g.tipo === "empilhada";
  const todos = d.series.flatMap((s) => s.valores.filter((v): v is number => v !== null));
  const somas = d.categorias.map((_, i) => d.series.reduce((s, x) => s + Math.max(0, x.valores[i] ?? 0), 0));
  const esc_ = empilhada ? escala(0, Math.max(0, ...somas)) : escala(Math.min(0, ...todos, 0), Math.max(0, ...todos, 0));
  const rotulosCat = d.categorias.map((c) => corte(c, horizontal ? 18 : 14));

  const margemE = horizontal ? 16 + Math.min(120, Math.max(...rotulosCat.map((c) => c.length)) * 6.2) : 16 + Math.max(...esc_.ticks.map((v) => compacto.format(v).length)) * 6.6 + 8;
  const girar = !horizontal && (n > 8 || Math.max(...rotulosCat.map((c) => c.length)) * 6.2 > ((W - margemE - 16) / n) * 0.95);
  const margemB = horizontal ? 28 : girar ? 70 : 34;
  const x0 = margemE;
  const x1 = W - 20;
  const y0 = topo + 6;
  const y1 = H - margemB;
  const pw = x1 - x0;
  const ph = y1 - y0;
  const valX = (v: number) => x0 + ((v - esc_.min) / (esc_.max - esc_.min)) * pw;
  const valY = (v: number) => y1 - ((v - esc_.min) / (esc_.max - esc_.min)) * ph;

  // Grade recessiva e eixo de valores.
  for (const v of esc_.ticks) {
    if (horizontal) {
      partes.push(`<line x1="${r2(valX(v))}" y1="${y0}" x2="${r2(valX(v))}" y2="${y1}" stroke="${t.grade}" stroke-width="1"/>`, texto(valX(v), y1 + 16, compacto.format(v), { ancora: "middle", tamanho: 10.5 }));
    } else {
      partes.push(`<line x1="${x0}" y1="${r2(valY(v))}" x2="${x1}" y2="${r2(valY(v))}" stroke="${t.grade}" stroke-width="1"/>`, texto(x0 - 8, valY(v) + 4, compacto.format(v), { ancora: "end", tamanho: 10.5 }));
    }
  }
  const eixoZero = horizontal ? valX(0) : valY(0);
  partes.push(horizontal ? `<line x1="${r2(eixoZero)}" y1="${y0}" x2="${r2(eixoZero)}" y2="${y1}" stroke="${t.suave}" stroke-width="1"/>` : `<line x1="${x0}" y1="${r2(eixoZero)}" x2="${x1}" y2="${r2(eixoZero)}" stroke="${t.suave}" stroke-width="1"/>`);

  const banda = (horizontal ? ph : pw) / n;
  const s = d.series.length;
  const largMax = 24;
  const aglomerado = empilhada ? Math.min(banda * 0.6, largMax + 8) : Math.min(banda * 0.72, s * largMax + (s - 1) * 2);
  const largBarra = empilhada ? aglomerado : Math.min(largMax, (aglomerado - (s - 1) * 2) / s);

  d.categorias.forEach((_c, i) => {
    const centro = (horizontal ? y0 : x0) + banda * (i + 0.5);
    if (horizontal) partes.push(texto(x0 - 8, centro + 4, rotulosCat[i], { ancora: "end", tamanho: 11, cor: t.texto }));
    else if (girar) partes.push(texto(centro, y1 + 14, rotulosCat[i], { ancora: "end", tamanho: 10.5, rotacao: -40 }));
    else partes.push(texto(centro, y1 + 18, rotulosCat[i], { ancora: "middle", tamanho: 11 }));
  });

  if (g.tipo === "linha" || g.tipo === "area") {
    d.series.forEach((sr, si) => {
      const pontos = sr.valores.map((v, i) => (v === null ? null : { x: x0 + banda * (i + 0.5), y: valY(v), v, i }));
      const caminho = pontos.filter((p): p is NonNullable<typeof p> => p !== null);
      if (!caminho.length) return;
      if (g.tipo === "area") partes.push(`<path d="M ${r2(caminho[0].x)} ${r2(valY(0))} ${caminho.map((p) => `L ${r2(p.x)} ${r2(p.y)}`).join(" ")} L ${r2(caminho.at(-1)!.x)} ${r2(valY(0))} Z" fill="${cor(si)}" fill-opacity="0.16"/>`);
      partes.push(`<path d="${caminho.map((p, k) => `${k ? "L" : "M"} ${r2(p.x)} ${r2(p.y)}`).join(" ")}" fill="none" stroke="${cor(si)}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`);
      if (caminho.length <= 40) {
        for (const p of caminho) {
          partes.push(`<circle cx="${r2(p.x)}" cy="${r2(p.y)}" r="4" fill="${cor(si)}" stroke="${t.superficie}" stroke-width="2"><title>${esc(`${d.categorias[p.i]} · ${sr.nome}: ${fmt(p.v, sr)}`)}</title></circle>`);
          if (g.valores && caminho.length <= 14) partes.push(texto(p.x, p.y - 10, fmt(p.v, sr), { ancora: "middle", tamanho: 10.5, cor: t.texto }));
        }
      }
    });
    return `${cabeca}${partes.join("")}</svg>`;
  }

  d.categorias.forEach((c, i) => {
    const centro = (horizontal ? y0 : x0) + banda * (i + 0.5);
    let acumulado = 0;
    d.series.forEach((sr, si) => {
      const v = sr.valores[i];
      if (v === null || v === 0) return;
      const dica = `<title>${esc(`${c} · ${sr.nome}: ${fmt(v, sr)}`)}</title>`;
      if (empilhada) {
        if (v < 0) return;
        const de = acumulado;
        acumulado += v;
        // 2 px da cor do fundo entre os segmentos: cada um encolhe 1 px de cada lado.
        const a = valY(de) - (de > 0 ? 1 : 0);
        const b = valY(acumulado) + 1;
        const ultimo = si === d.series.length - 1 || d.series.slice(si + 1).every((x) => !(x.valores[i] ?? 0));
        const x = centro - aglomerado / 2;
        partes.push(ultimo ? `<path d="${barraVertical(x, a, b, aglomerado)}" fill="${cor(si)}">${dica}</path>` : `<rect x="${r2(x)}" y="${r2(b)}" width="${r2(aglomerado)}" height="${r2(Math.max(0, a - b))}" fill="${cor(si)}">${dica}</rect>`);
        return;
      }
      const deslocamento = -aglomerado / 2 + si * (largBarra + 2);
      if (horizontal) {
        const y = centro + deslocamento;
        const fim = valX(v);
        partes.push(v >= 0 ? `<path d="${barraHorizontal(valX(0), y, fim, largBarra)}" fill="${cor(si)}">${dica}</path>` : `<rect x="${r2(fim)}" y="${r2(y)}" width="${r2(valX(0) - fim)}" height="${r2(largBarra)}" fill="${cor(si)}">${dica}</rect>`);
        if (g.valores && n * s <= 24) partes.push(texto(Math.max(valX(0), fim) + 6, y + largBarra / 2 + 4, fmt(v, sr), { tamanho: 10.5, cor: t.texto }));
      } else {
        const x = centro + deslocamento;
        const topoBarra = valY(Math.max(v, 0));
        partes.push(v >= 0 ? `<path d="${barraVertical(x, valY(0), topoBarra, largBarra)}" fill="${cor(si)}">${dica}</path>` : `<rect x="${r2(x)}" y="${r2(valY(0))}" width="${r2(largBarra)}" height="${r2(valY(v) - valY(0))}" fill="${cor(si)}">${dica}</rect>`);
        if (g.valores && n * s <= 24) partes.push(texto(x + largBarra / 2, (v >= 0 ? topoBarra - 6 : valY(v) + 14), fmt(v, sr), { ancora: "middle", tamanho: 10.5, cor: t.texto }));
      }
    });
    if (empilhada && g.valores && somas[i] > 0 && n <= 24) partes.push(texto(centro, valY(somas[i]) - 6, fmt(somas[i]), { ancora: "middle", tamanho: 10.5, cor: t.texto }));
  });

  return `${cabeca}${partes.join("")}</svg>`;
}

/** Gráfico inicial para uma lista: categorias na primeira coluna que serve e soma da primeira coluna de números (ou contagem). */
export function graficoPadrao(lista: ListaAcompanhamento, id: string): Grafico {
  const categoria = lista.colunas.find((c) => c.tipo === "opcoes") ?? lista.colunas.find((c) => c.tipo === "simnao") ?? lista.colunas.find((c) => c.tipo === "texto") ?? lista.colunas.find((c) => c.tipo === "data") ?? lista.colunas[0];
  const numero = lista.colunas.find((c) => c.tipo === "numero" && c.id !== categoria?.id);
  return {
    id,
    titulo: numero ? `${numero.titulo} por ${categoria?.titulo ?? "categoria"}` : `Quantidade por ${categoria?.titulo ?? "categoria"}`,
    tipo: numero ? "coluna" : "pizza",
    categoria: categoria?.id ?? "",
    series: [numero ? { coluna: numero.id, agregacao: "soma" } : { agregacao: "contagem" }],
    valores: true,
  };
}

export const TIPOS_DE_GRAFICO: { tipo: Grafico["tipo"]; rotulo: string; dica: string }[] = [
  { tipo: "coluna", rotulo: "Colunas", dica: "Comparar valores entre categorias" },
  { tipo: "barra", rotulo: "Barras", dica: "Comparar, com nomes longos" },
  { tipo: "empilhada", rotulo: "Empilhadas", dica: "Comparar o total e as partes" },
  { tipo: "linha", rotulo: "Linhas", dica: "Evolução ao longo do tempo" },
  { tipo: "area", rotulo: "Área", dica: "Evolução, destacando o volume" },
  { tipo: "pizza", rotulo: "Pizza", dica: "Proporção do todo (até 8 partes)" },
  { tipo: "rosca", rotulo: "Rosca", dica: "Proporção, com o total no centro" },
];
