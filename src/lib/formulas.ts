import type { ListaAcompanhamento } from "../types/lista.js";

/**
 * Fórmulas das listas, no jeito das planilhas em português: `=SOMA(B1:B9)`, `=MÉDIA(C1:C5)`,
 * `=SE(B2>10; "alto"; "baixo")`. Argumentos separados por `;` e vírgula como decimal (12,5);
 * os nomes em inglês (SUM, IF…) também valem. É um analisador próprio, sem `eval`: um texto
 * digitado numa célula nunca vira código.
 *
 * Endereços: letra da coluna + número da linha, como na grade (A1 é a primeira coluna, primeira
 * linha; linhas de título de bloco contam como linha e valem vazio). Intervalos: B1:B9.
 */

export type Valor = number | string | boolean | null;
export type Erro = "#REF!" | "#DIV/0!" | "#NOME?" | "#VALOR!" | "#CICLO!" | "#ERRO!";
export type Resultado = Valor | { erro: Erro };
export const ehErro = (r: Resultado): r is { erro: Erro } => typeof r === "object" && r !== null && "erro" in r;

// ------------------------------------------------------------------ sintaxe

type No =
  | { t: "num"; v: number }
  | { t: "txt"; v: string }
  | { t: "bool"; v: boolean }
  | { t: "ref"; c: number; l: number }
  | { t: "faixa"; c1: number; l1: number; c2: number; l2: number }
  | { t: "un"; op: "-" | "+" | "%"; a: No }
  | { t: "bin"; op: string; a: No; b: No }
  | { t: "fn"; nome: string; args: No[] };

class ErroDeSintaxe extends Error {}

/** Nome de função sem acento e em maiúsculas; `MÉDIA` e `media` viram `MEDIA`. */
const normalizar = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();

/** Português → nome interno (o inglês do Excel). */
const NOMES: Record<string, string> = {
  SOMA: "SUM", SUM: "SUM", MEDIA: "AVERAGE", AVERAGE: "AVERAGE", MIN: "MIN", MINIMO: "MIN", MAX: "MAX", MAXIMO: "MAX", MED: "MEDIAN", MEDIAN: "MEDIAN",
  "CONT.NUM": "COUNT", COUNT: "COUNT", "CONT.VALORES": "COUNTA", COUNTA: "COUNTA", "CONT.VAZIO": "COUNTBLANK", COUNTBLANK: "COUNTBLANK",
  "CONT.SE": "COUNTIF", COUNTIF: "COUNTIF", SOMASE: "SUMIF", SUMIF: "SUMIF", MEDIASE: "AVERAGEIF", AVERAGEIF: "AVERAGEIF",
  SE: "IF", IF: "IF", SEERRO: "IFERROR", IFERROR: "IFERROR", E: "AND", AND: "AND", OU: "OR", OR: "OR", NAO: "NOT", NOT: "NOT",
  ARRED: "ROUND", ROUND: "ROUND", ABS: "ABS", HOJE: "TODAY", TODAY: "TODAY", CONCATENAR: "CONCAT", CONCAT: "CONCAT", MULT: "PRODUCT", PRODUCT: "PRODUCT",
};

function letrasParaColuna(letras: string) {
  let n = 0;
  for (const ch of letras) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function tokenizar(texto: string) {
  const fichas: { k: "num" | "txt" | "id" | "op"; v: string }[] = [];
  let i = 0;
  while (i < texto.length) {
    const c = texto[i];
    if (/\s/.test(c)) {
      i++;
    } else if (c === '"') {
      let j = i + 1;
      let v = "";
      while (j < texto.length && !(texto[j] === '"' && texto[j + 1] !== '"')) {
        if (texto[j] === '"') j++; // aspas duplas dentro do texto: "diz ""oi"""
        v += texto[j];
        j++;
      }
      if (j >= texto.length) throw new ErroDeSintaxe("texto sem fechar");
      fichas.push({ k: "txt", v });
      i = j + 1;
    } else if (/[0-9]/.test(c) || (c === "," && /[0-9]/.test(texto[i + 1] ?? ""))) {
      const m = /^(\d+(,\d+)?|,\d+)(e[+-]?\d+)?/i.exec(texto.slice(i))!;
      fichas.push({ k: "num", v: m[0].replace(",", ".") });
      i += m[0].length;
    } else if (/[A-Za-zÀ-ÿ_$]/.test(c)) {
      const m = /^[$A-Za-zÀ-ÿ_][$A-Za-zÀ-ÿ0-9_.]*/.exec(texto.slice(i))!;
      fichas.push({ k: "id", v: m[0] });
      i += m[0].length;
    } else if ("<>=".includes(c)) {
      const dois = texto.slice(i, i + 2);
      if (dois === "<=" || dois === ">=" || dois === "<>") {
        fichas.push({ k: "op", v: dois });
        i += 2;
      } else {
        fichas.push({ k: "op", v: c });
        i++;
      }
    } else if ("+-*/^&():;%".includes(c)) {
      fichas.push({ k: "op", v: c });
      i++;
    } else {
      throw new ErroDeSintaxe(`caractere inesperado: ${c}`);
    }
  }
  return fichas;
}

export function analisar(formula: string): No {
  const fichas = tokenizar(formula.replace(/^=/, ""));
  let p = 0;
  const olhar = () => fichas[p];
  const ehOp = (v: string) => olhar()?.k === "op" && olhar().v === v;
  const consumir = (v: string) => {
    if (!ehOp(v)) throw new ErroDeSintaxe(`esperava ${v}`);
    p++;
  };

  const comparacao = (): No => {
    let a = concatenacao();
    while (olhar()?.k === "op" && ["=", "<>", "<", ">", "<=", ">="].includes(olhar().v)) {
      const op = fichas[p++].v;
      a = { t: "bin", op, a, b: concatenacao() };
    }
    return a;
  };
  const concatenacao = (): No => {
    let a = soma();
    while (ehOp("&")) {
      p++;
      a = { t: "bin", op: "&", a, b: soma() };
    }
    return a;
  };
  const soma = (): No => {
    let a = produto();
    while (ehOp("+") || ehOp("-")) {
      const op = fichas[p++].v;
      a = { t: "bin", op, a, b: produto() };
    }
    return a;
  };
  const produto = (): No => {
    let a = potencia();
    while (ehOp("*") || ehOp("/")) {
      const op = fichas[p++].v;
      a = { t: "bin", op, a, b: potencia() };
    }
    return a;
  };
  const potencia = (): No => {
    const a = unario();
    if (ehOp("^")) {
      p++;
      return { t: "bin", op: "^", a, b: potencia() };
    }
    return a;
  };
  const unario = (): No => {
    if (ehOp("-") || ehOp("+")) {
      const op = fichas[p++].v as "-" | "+";
      return { t: "un", op, a: unario() };
    }
    let a = primario();
    while (ehOp("%")) {
      p++;
      a = { t: "un", op: "%", a };
    }
    return a;
  };
  const primario = (): No => {
    const f = fichas[p++];
    if (!f) throw new ErroDeSintaxe("fórmula incompleta");
    if (f.k === "num") return { t: "num", v: Number(f.v) };
    if (f.k === "txt") return { t: "txt", v: f.v };
    if (f.k === "op" && f.v === "(") {
      const dentro = comparacao();
      consumir(")");
      return dentro;
    }
    if (f.k === "id") {
      if (ehOp("(")) {
        p++;
        const args: No[] = [];
        if (!ehOp(")")) {
          args.push(comparacao());
          while (ehOp(";")) {
            p++;
            args.push(comparacao());
          }
        }
        consumir(")");
        return { t: "fn", nome: f.v, args };
      }
      const maiusculo = f.v.toUpperCase();
      if (maiusculo === "VERDADEIRO" || maiusculo === "TRUE") return { t: "bool", v: true };
      if (maiusculo === "FALSO" || maiusculo === "FALSE") return { t: "bool", v: false };
      const ref = /^\$?([A-Za-z]{1,2})\$?(\d+)$/.exec(f.v);
      if (!ref) throw new ErroDeSintaxe(`nome desconhecido: ${f.v}`);
      const c = letrasParaColuna(ref[1].toUpperCase());
      const l = Number(ref[2]) - 1;
      if (ehOp(":")) {
        p++;
        const f2 = fichas[p++];
        const ref2 = f2?.k === "id" ? /^\$?([A-Za-z]{1,2})\$?(\d+)$/.exec(f2.v) : null;
        if (!ref2) throw new ErroDeSintaxe("intervalo inválido");
        const c2 = letrasParaColuna(ref2[1].toUpperCase());
        const l2 = Number(ref2[2]) - 1;
        return { t: "faixa", c1: Math.min(c, c2), l1: Math.min(l, l2), c2: Math.max(c, c2), l2: Math.max(l, l2) };
      }
      return { t: "ref", c, l };
    }
    throw new ErroDeSintaxe(`inesperado: ${f.v}`);
  };

  const raiz = comparacao();
  if (p < fichas.length) throw new ErroDeSintaxe("sobrou texto no fim da fórmula");
  return raiz;
}

// ------------------------------------------------------------------ valores

/** Lê um número digitado: «1.234,56», «12,5», «12.5», «R$ 10», «5%». `null` se não for número. */
export function lerNumero(texto: string): number | null {
  let t = texto.trim().replace(/^R\$\s*/, "");
  if (!t) return null;
  const pct = t.endsWith("%");
  if (pct) t = t.slice(0, -1).trim();
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d+,\d+$/.test(t)) t = t.replace(",", ".");
  else if (!/^-?\d+(\.\d+)?(e[+-]?\d+)?$/i.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? (pct ? n / 100 : n) : null;
}

const paraNumero = (v: Valor): number | null => {
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (v === null || v === "") return 0;
  return lerNumero(v);
};
const paraTexto = (v: Valor) => (v === null ? "" : typeof v === "boolean" ? (v ? "VERDADEIRO" : "FALSO") : typeof v === "number" ? String(Number(v.toPrecision(12))).replace(".", ",") : v);
const paraBool = (v: Valor) => (typeof v === "boolean" ? v : typeof v === "number" ? v !== 0 : typeof v === "string" ? v.toUpperCase() === "VERDADEIRO" || v.toUpperCase() === "TRUE" : false);

class Falha extends Error {
  erro: Erro;
  constructor(erro: Erro) {
    super(erro);
    this.erro = erro;
  }
}

function comparar(op: string, a: Valor, b: Valor) {
  const ambosNumeros = typeof a === "number" && typeof b === "number";
  const na = ambosNumeros ? a : typeof a === "string" ? lerNumero(a) : null;
  const nb = ambosNumeros ? b : typeof b === "string" ? lerNumero(b) : null;
  let c: number;
  if (na !== null && nb !== null && (typeof a !== "string" || typeof b !== "string" || (lerNumero(a) !== null && lerNumero(b) !== null))) c = na - nb;
  else c = paraTexto(a).localeCompare(paraTexto(b), "pt-BR", { sensitivity: "base" });
  return op === "=" ? c === 0 : op === "<>" ? c !== 0 : op === "<" ? c < 0 : op === ">" ? c > 0 : op === "<=" ? c <= 0 : c >= 0;
}

/** Critério de CONT.SE/SOMASE: ">5", "<>Sim", "=10", "texto" ou um número. */
function criterio(c: Valor): (v: Valor) => boolean {
  if (typeof c !== "string") return (v) => comparar("=", v, c);
  const m = /^(<=|>=|<>|=|<|>)?(.*)$/.exec(c)!;
  const op = m[1] || "=";
  const alvo = lerNumero(m[2]) ?? m[2];
  return (v) => (v === null || v === "" ? alvo === "" && op === "=" : comparar(op, v, alvo));
}

// ------------------------------------------------------------------ avaliação

export interface Contexto {
  /** Valor bruto da célula (já sem fórmula resolvida): `l` e `c` começam em 0. */
  resolver: (l: number, c: number) => Resultado;
  limite: { linhas: number; colunas: number };
}

type Entrada = Valor | Valor[];

export function avaliarNo(no: No, ctx: Contexto): Entrada {
  switch (no.t) {
    case "num":
    case "txt":
    case "bool":
      return no.v;
    case "ref": {
      if (no.l < 0 || no.c < 0 || no.l >= ctx.limite.linhas || no.c >= ctx.limite.colunas) throw new Falha("#REF!");
      const r = ctx.resolver(no.l, no.c);
      if (ehErro(r)) throw new Falha(r.erro);
      return r;
    }
    case "faixa": {
      const valores: Valor[] = [];
      for (let l = no.l1; l <= no.l2; l++) {
        for (let c = no.c1; c <= no.c2; c++) {
          if (l < 0 || c < 0 || l >= ctx.limite.linhas || c >= ctx.limite.colunas) throw new Falha("#REF!");
          const r = ctx.resolver(l, c);
          if (ehErro(r)) throw new Falha(r.erro);
          valores.push(r);
        }
      }
      return valores;
    }
    case "un": {
      const v = escalar(avaliarNo(no.a, ctx));
      const n = paraNumero(v);
      if (n === null) throw new Falha("#VALOR!");
      return no.op === "-" ? -n : no.op === "%" ? n / 100 : n;
    }
    case "bin": {
      const a = escalar(avaliarNo(no.a, ctx));
      const b = escalar(avaliarNo(no.b, ctx));
      if (no.op === "&") return paraTexto(a) + paraTexto(b);
      if (["=", "<>", "<", ">", "<=", ">="].includes(no.op)) return comparar(no.op, a, b);
      const x = paraNumero(a);
      const y = paraNumero(b);
      if (x === null || y === null) throw new Falha("#VALOR!");
      if (no.op === "+") return x + y;
      if (no.op === "-") return x - y;
      if (no.op === "*") return x * y;
      if (no.op === "^") return x ** y;
      if (y === 0) throw new Falha("#DIV/0!");
      return x / y;
    }
    case "fn":
      return chamar(no, ctx);
  }
}

const escalar = (e: Entrada): Valor => (Array.isArray(e) ? (e[0] ?? null) : e);
const achatar = (entradas: Entrada[]) => entradas.flatMap((e) => (Array.isArray(e) ? e : [e]));
/** Em intervalos só contam os números de verdade; texto e vazio são ignorados, como nas planilhas. */
const numerosDe = (entradas: Entrada[]) =>
  entradas.flatMap((e) => {
    if (Array.isArray(e)) return e.filter((v): v is number => typeof v === "number" || (typeof v === "string" && lerNumero(v) !== null)).map((v) => (typeof v === "number" ? v : lerNumero(v)!));
    const n = paraNumero(e);
    if (n === null) throw new Falha("#VALOR!");
    return [n];
  });

function chamar(no: Extract<No, { t: "fn" }>, ctx: Contexto): Entrada {
  const nome = NOMES[normalizar(no.nome)];
  if (!nome) throw new Falha("#NOME?");
  // SE e SEERRO avaliam só o ramo que importa.
  if (nome === "IF") {
    const teste = escalar(avaliarNo(no.args[0] ?? { t: "bool", v: false }, ctx));
    const ramo = paraBool(teste) ? no.args[1] : no.args[2];
    return ramo ? escalar(avaliarNo(ramo, ctx)) : paraBool(teste) ? true : false;
  }
  if (nome === "IFERROR") {
    try {
      return escalar(avaliarNo(no.args[0], ctx));
    } catch (falha) {
      if (falha instanceof Falha) return no.args[1] ? escalar(avaliarNo(no.args[1], ctx)) : "";
      throw falha;
    }
  }
  const args = no.args.map((a) => avaliarNo(a, ctx));
  switch (nome) {
    case "SUM":
      return numerosDe(args).reduce((s, n) => s + n, 0);
    case "PRODUCT":
      return numerosDe(args).reduce((s, n) => s * n, 1);
    case "AVERAGE": {
      const n = numerosDe(args);
      if (!n.length) throw new Falha("#DIV/0!");
      return n.reduce((s, x) => s + x, 0) / n.length;
    }
    case "MEDIAN": {
      const n = numerosDe(args).sort((a, b) => a - b);
      if (!n.length) throw new Falha("#VALOR!");
      const m = Math.floor(n.length / 2);
      return n.length % 2 ? n[m] : (n[m - 1] + n[m]) / 2;
    }
    case "MIN":
    case "MAX": {
      const n = numerosDe(args);
      return n.length ? (nome === "MIN" ? Math.min(...n) : Math.max(...n)) : 0;
    }
    case "COUNT":
      return achatar(args).filter((v) => typeof v === "number" || (typeof v === "string" && lerNumero(v) !== null)).length;
    case "COUNTA":
      return achatar(args).filter((v) => v !== null && v !== "").length;
    case "COUNTBLANK":
      return achatar(args).filter((v) => v === null || v === "").length;
    case "COUNTIF": {
      const faixa = Array.isArray(args[0]) ? args[0] : [args[0]];
      const quer = criterio(escalar(args[1] ?? null));
      return faixa.filter(quer).length;
    }
    case "SUMIF":
    case "AVERAGEIF": {
      const faixa = Array.isArray(args[0]) ? args[0] : [args[0]];
      const soma = Array.isArray(args[2]) ? args[2] : args[2] !== undefined ? [args[2]] : faixa;
      const quer = criterio(escalar(args[1] ?? null));
      const alvos = faixa.flatMap((v, i) => (quer(v) ? [paraNumero(soma[i] ?? null)] : [])).filter((n): n is number => n !== null);
      if (nome === "SUMIF") return alvos.reduce((s, n) => s + n, 0);
      if (!alvos.length) throw new Falha("#DIV/0!");
      return alvos.reduce((s, n) => s + n, 0) / alvos.length;
    }
    case "ROUND": {
      const n = paraNumero(escalar(args[0] ?? null));
      const d = paraNumero(escalar(args[1] ?? 0)) ?? 0;
      if (n === null) throw new Falha("#VALOR!");
      const f = 10 ** d;
      return Math.round((n + Number.EPSILON * Math.sign(n)) * f) / f;
    }
    case "ABS": {
      const n = paraNumero(escalar(args[0] ?? null));
      if (n === null) throw new Falha("#VALOR!");
      return Math.abs(n);
    }
    case "TODAY":
      return Math.floor((Date.now() - Date.UTC(1899, 11, 30)) / 86400000);
    case "AND":
      return achatar(args).every(paraBool);
    case "OR":
      return achatar(args).some(paraBool);
    case "NOT":
      return !paraBool(escalar(args[0] ?? null));
    case "CONCAT":
      return achatar(args).map(paraTexto).join("");
  }
  throw new Falha("#NOME?");
}

/** Avalia uma fórmula isolada. Erros de sintaxe viram `#ERRO!`. */
export function avaliarFormula(formula: string, ctx: Contexto): Resultado {
  try {
    const r = escalar(avaliarNo(analisar(formula), ctx));
    return typeof r === "number" && !Number.isFinite(r) ? { erro: "#VALOR!" } : r;
  } catch (falha) {
    if (falha instanceof Falha) return { erro: falha.erro };
    if (falha instanceof ErroDeSintaxe) return { erro: "#ERRO!" };
    throw falha;
  }
}

// ------------------------------------------------------------------ a lista

export const ehFormula = (valor: unknown): valor is string => typeof valor === "string" && valor.startsWith("=") && valor.length > 1;

/** Calcula todas as células de uma lista sob demanda, com cache e detecção de ciclo. */
export function calculadora(lista: ListaAcompanhamento) {
  const cache = new Map<string, Resultado>();
  const emCalculo = new Set<string>();
  const limite = { linhas: lista.linhas.length, colunas: lista.colunas.length };

  const bruto = (l: number, c: number): Valor => {
    const linha = lista.linhas[l];
    const coluna = lista.colunas[c];
    if (!linha || !coluna || linha.titulo !== undefined) return null;
    const v = linha.valores[coluna.id];
    if (v === undefined) return null;
    if (typeof v === "boolean") return coluna.tipo === "marca" ? (v ? 1 : 0) : v;
    if (coluna.tipo === "simnao") return v === "sim" ? "Sim" : v === "nao" ? "Não" : null;
    if (coluna.tipo === "numero") return lerNumero(v) ?? v;
    return v;
  };

  const resolver = (l: number, c: number): Resultado => {
    const chave = `${l}:${c}`;
    const guardado = cache.get(chave);
    if (guardado !== undefined) return guardado;
    const b = bruto(l, c);
    let r: Resultado = b;
    if (ehFormula(b) && lista.colunas[c]?.tipo !== "marca") {
      if (emCalculo.has(chave)) return { erro: "#CICLO!" };
      emCalculo.add(chave);
      r = avaliarFormula(b, { resolver, limite });
      emCalculo.delete(chave);
    }
    cache.set(chave, r);
    return r;
  };
  return { resolver, bruto };
}

// ------------------------------------------------------------------ para o Excel

const NOME_EXCEL: Record<string, string> = { SUM: "SUM", AVERAGE: "AVERAGE", MIN: "MIN", MAX: "MAX", MEDIAN: "MEDIAN", COUNT: "COUNT", COUNTA: "COUNTA", COUNTBLANK: "COUNTBLANK", COUNTIF: "COUNTIF", SUMIF: "SUMIF", AVERAGEIF: "AVERAGEIF", IF: "IF", IFERROR: "IFERROR", AND: "AND", OR: "OR", NOT: "NOT", ROUND: "ROUND", ABS: "ABS", TODAY: "TODAY", CONCAT: "CONCATENATE", PRODUCT: "PRODUCT" };

export function letraDaColuna(i: number) {
  let n = i + 1;
  let letra = "";
  while (n > 0) {
    letra = String.fromCharCode(65 + ((n - 1) % 26)) + letra;
    n = Math.floor((n - 1) / 26);
  }
  return letra;
}

/**
 * A mesma fórmula na sintaxe do arquivo .xlsx (nomes em inglês, vírgula como separador). `deslocamento`
 * é quantas linhas a grade tem acima da primeira linha da lista (o cabeçalho). `null` se não der para converter.
 */
export function formulaParaExcel(formula: string, deslocamento = 1): string | null {
  const ref = (c: number, l: number) => `${letraDaColuna(c)}${l + 1 + deslocamento}`;
  const texto = (no: No): string => {
    switch (no.t) {
      case "num":
        return String(no.v);
      case "txt":
        return `"${no.v.replace(/"/g, '""')}"`;
      case "bool":
        return no.v ? "TRUE" : "FALSE";
      case "ref":
        return ref(no.c, no.l);
      case "faixa":
        return `${ref(no.c1, no.l1)}:${ref(no.c2, no.l2)}`;
      case "un":
        return no.op === "%" ? `${texto(no.a)}%` : `${no.op}${texto(no.a)}`;
      case "bin":
        return `(${texto(no.a)}${no.op}${texto(no.b)})`;
      case "fn": {
        const interno = NOMES[normalizar(no.nome)];
        if (!interno || !NOME_EXCEL[interno]) throw new ErroDeSintaxe("sem equivalente");
        return `${NOME_EXCEL[interno]}(${no.args.map(texto).join(",")})`;
      }
    }
  };
  try {
    return texto(analisar(formula));
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------ exibição

/** Número no formato da coluna: 1.234,50 · R$ 1.234,50 · 12,5%. */
export function formatarNumero(n: number, formato: "numero" | "moeda" | "percentual" = "numero", casas?: number) {
  const padrao = formato === "moeda" ? 2 : formato === "percentual" ? 1 : undefined;
  const d = casas ?? padrao;
  const opcoes: Intl.NumberFormatOptions = d === undefined ? { maximumFractionDigits: 6 } : { minimumFractionDigits: d, maximumFractionDigits: d };
  if (formato === "moeda") return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", ...opcoes });
  if (formato === "percentual") return `${(n * 100).toLocaleString("pt-BR", opcoes)}%`;
  return n.toLocaleString("pt-BR", opcoes);
}

/** O texto que aparece numa célula calculada (número formatado, texto, verdadeiro/falso ou o código do erro). */
export function mostrarResultado(r: Resultado, formato?: "numero" | "moeda" | "percentual", casas?: number): string {
  if (ehErro(r)) return r.erro;
  if (r === null) return "";
  if (typeof r === "number") return formatarNumero(r, formato, casas);
  if (typeof r === "boolean") return r ? "VERDADEIRO" : "FALSO";
  return r;
}
