/**
 * Lê a primeira aba de uma planilha no próprio navegador (.xlsx, .xls, .csv ou a
 * tabela HTML que alguns sistemas exportam com extensão .xls) e devolve as
 * células como texto. Nada é enviado ao servidor: os dados dos alunos ficam na
 * máquina de quem abriu o arquivo.
 */

export type Tabela = string[][];

const ERRO_LEITURA = "Não foi possível ler a planilha. Use o arquivo exportado pelo sistema da escola (.xlsx, .xls ou .csv).";

const numeroComoTexto = (n: number) => (Number.isFinite(n) ? String(Number(n.toPrecision(15))) : "");

// ------------------------------------------------------------------- .xlsx

async function inflar(dados: Uint8Array): Promise<Uint8Array> {
  const fluxo = new Blob([dados as BlobPart]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(fluxo).arrayBuffer());
}

async function arquivosDoZip(bytes: Uint8Array, nomes: (nome: string) => boolean): Promise<Map<string, string>> {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let fim = bytes.length - 22;
  while (fim >= 0 && v.getUint32(fim, true) !== 0x06054b50) fim -= 1;
  if (fim < 0) throw new Error(ERRO_LEITURA);
  const total = v.getUint16(fim + 10, true);
  let p = v.getUint32(fim + 16, true);
  const saida = new Map<string, string>();
  const texto = new TextDecoder("utf-8");
  for (let i = 0; i < total && p + 46 <= bytes.length; i += 1) {
    if (v.getUint32(p, true) !== 0x02014b50) break;
    const metodo = v.getUint16(p + 10, true);
    const comprimido = v.getUint32(p + 20, true);
    const nNome = v.getUint16(p + 28, true);
    const nExtra = v.getUint16(p + 30, true);
    const nComentario = v.getUint16(p + 32, true);
    const local = v.getUint32(p + 42, true);
    const nome = texto.decode(bytes.subarray(p + 46, p + 46 + nNome));
    p += 46 + nNome + nExtra + nComentario;
    if (!nomes(nome)) continue;
    const inicio = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
    const bruto = bytes.subarray(inicio, inicio + comprimido);
    saida.set(nome, texto.decode(metodo === 0 ? bruto : await inflar(bruto)));
  }
  return saida;
}

function colunaDaReferencia(ref: string): number {
  let n = 0;
  for (const letra of ref) {
    const codigo = letra.charCodeAt(0);
    if (codigo < 65 || codigo > 90) break;
    n = n * 26 + (codigo - 64);
  }
  return n - 1;
}

async function lerXlsx(bytes: Uint8Array): Promise<Tabela> {
  const arquivos = await arquivosDoZip(bytes, (n) => n === "xl/sharedStrings.xml" || /^xl\/worksheets\/sheet\d+\.xml$/.test(n));
  const abas = [...arquivos.keys()].filter((n) => n.startsWith("xl/worksheets/")).sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));
  if (!abas.length) throw new Error(ERRO_LEITURA);
  const xml = (t: string) => new DOMParser().parseFromString(t, "application/xml");
  const textoDe = (no: Element) =>
    [...no.getElementsByTagName("t")]
      .filter((t) => t.parentElement?.localName !== "rPh")
      .map((t) => t.textContent ?? "")
      .join("");
  const compartilhadas = arquivos.has("xl/sharedStrings.xml") ? [...xml(arquivos.get("xl/sharedStrings.xml")!).getElementsByTagName("si")].map(textoDe) : [];
  const tabela: Tabela = [];
  for (const linha of xml(arquivos.get(abas[0])!).getElementsByTagName("row")) {
    const indice = Number(linha.getAttribute("r")) - 1;
    const celulas: string[] = [];
    let proxima = 0;
    for (const c of linha.getElementsByTagName("c")) {
      const ref = c.getAttribute("r");
      const coluna = ref ? colunaDaReferencia(ref) : proxima;
      proxima = coluna + 1;
      const tipo = c.getAttribute("t");
      const valor = c.getElementsByTagName("v")[0]?.textContent ?? "";
      let texto = valor;
      if (tipo === "s") texto = compartilhadas[Number(valor)] ?? "";
      else if (tipo === "inlineStr") texto = textoDe(c);
      else if (tipo === "b") texto = valor === "1" ? "VERDADEIRO" : "FALSO";
      else if (!tipo || tipo === "n") texto = valor === "" ? "" : numeroComoTexto(Number(valor));
      celulas[coluna] = texto;
    }
    tabela[Number.isInteger(indice) && indice >= 0 ? indice : tabela.length] = celulas;
  }
  return tabela;
}

// -------------------------------------------------------------------- .xls

/** Fluxo «Workbook» de dentro do arquivo composto (o envelope do .xls antigo). */
function fluxoDoXls(bytes: Uint8Array): Uint8Array {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tamSetor = 1 << v.getUint16(30, true);
  const tamMini = 1 << v.getUint16(32, true);
  const corte = v.getUint32(56, true);
  const posSetor = (n: number) => (n + 1) * tamSetor;
  const FIM = 0xfffffffe;

  const difat: number[] = [];
  for (let i = 0; i < 109; i += 1) difat.push(v.getUint32(76 + i * 4, true));
  let extra = v.getUint32(68, true);
  for (let guarda = 0; extra < FIM && guarda < 1000; guarda += 1) {
    const base = posSetor(extra);
    for (let i = 0; i < tamSetor / 4 - 1; i += 1) difat.push(v.getUint32(base + i * 4, true));
    extra = v.getUint32(base + tamSetor - 4, true);
  }
  const fat: number[] = [];
  for (const setor of difat) {
    if (setor >= FIM) continue;
    const base = posSetor(setor);
    for (let i = 0; i < tamSetor / 4; i += 1) fat.push(v.getUint32(base + i * 4, true));
  }
  const cadeia = (inicio: number, tabela: number[]) => {
    const setores: number[] = [];
    for (let s = inicio; s < FIM && s < tabela.length && setores.length < tabela.length + 1; s = tabela[s]) setores.push(s);
    return setores;
  };
  const juntar = (inicio: number, tamanho?: number) => {
    const setores = cadeia(inicio, fat);
    const saida = new Uint8Array(setores.length * tamSetor);
    setores.forEach((s, i) => saida.set(bytes.subarray(posSetor(s), posSetor(s) + tamSetor), i * tamSetor));
    return tamanho === undefined ? saida : saida.subarray(0, tamanho);
  };

  const diretorio = juntar(v.getUint32(48, true));
  const d = new DataView(diretorio.buffer, diretorio.byteOffset, diretorio.byteLength);
  const utf16 = new TextDecoder("utf-16le");
  let raiz: { inicio: number; tamanho: number } | null = null;
  let livro: { inicio: number; tamanho: number } | null = null;
  for (let p = 0; p + 128 <= diretorio.length; p += 128) {
    const nNome = d.getUint16(p + 64, true);
    if (nNome < 2) continue;
    const nome = utf16.decode(diretorio.subarray(p, p + nNome - 2));
    const entrada = { inicio: d.getUint32(p + 116, true), tamanho: d.getUint32(p + 120, true) };
    if (d.getUint8(p + 66) === 5) raiz = entrada;
    else if (nome === "Workbook" || (nome === "Book" && !livro)) livro = entrada;
  }
  if (!livro) throw new Error(ERRO_LEITURA);
  if (livro.tamanho >= corte || !raiz) return juntar(livro.inicio, livro.tamanho);

  const miniFat: number[] = [];
  const miniFatBruta = juntar(v.getUint32(60, true));
  const m = new DataView(miniFatBruta.buffer, miniFatBruta.byteOffset, miniFatBruta.byteLength);
  for (let i = 0; i + 4 <= miniFatBruta.length; i += 4) miniFat.push(m.getUint32(i, true));
  const miniFluxo = juntar(raiz.inicio, raiz.tamanho);
  const setores = cadeia(livro.inicio, miniFat);
  const saida = new Uint8Array(setores.length * tamMini);
  setores.forEach((s, i) => saida.set(miniFluxo.subarray(s * tamMini, (s + 1) * tamMini), i * tamMini));
  return saida.subarray(0, livro.tamanho);
}

function lerXls(bytes: Uint8Array): Tabela {
  const fluxo = fluxoDoXls(bytes);
  const v = new DataView(fluxo.buffer, fluxo.byteOffset, fluxo.byteLength);
  const latin = new TextDecoder("windows-1252");
  const utf16 = new TextDecoder("utf-16le");
  const textos: string[] = [];
  const tabela: Tabela = [];
  let primeiraAba = -1;

  const rk = (valor: number) => {
    let n: number;
    if (valor & 2) n = valor >> 2;
    else {
      const b = new DataView(new ArrayBuffer(8));
      b.setUint32(4, valor & 0xfffffffc, true);
      n = b.getFloat64(0, true);
    }
    return valor & 1 ? n / 100 : n;
  };
  const por = (linha: number, coluna: number, texto: string) => {
    (tabela[linha] ??= [])[coluna] = texto;
  };
  /** Texto curto de um registro só (LABEL, STRING): tamanho, opções, caracteres. */
  const textoSimples = (p: number) => {
    const n = v.getUint16(p, true);
    const largo = (v.getUint8(p + 2) & 1) === 1;
    const inicio = p + 3;
    return largo ? utf16.decode(fluxo.subarray(inicio, inicio + n * 2)) : latin.decode(fluxo.subarray(inicio, inicio + n));
  };

  /** A tabela de textos pode continuar em registros CONTINUE; no meio de um texto, a continuação repete o byte de opções. */
  const lerTextosCompartilhados = (inicio: number, tamanho: number, proximo: number) => {
    const blocos: [number, number][] = [[inicio, inicio + tamanho]];
    for (let p = proximo; p + 4 <= fluxo.length && v.getUint16(p, true) === 0x3c; ) {
      const n = v.getUint16(p + 2, true);
      blocos.push([p + 4, p + 4 + n]);
      p += 4 + n;
    }
    let bloco = 0;
    let pos = blocos[0][0];
    const acabou = () => bloco >= blocos.length;
    const avancar = () => {
      while (!acabou() && pos >= blocos[bloco][1]) {
        bloco += 1;
        if (!acabou()) pos = blocos[bloco][0];
      }
    };
    const byte = () => {
      avancar();
      if (acabou()) return 0;
      const b = fluxo[pos];
      pos += 1;
      return b;
    };
    const u16 = () => byte() | (byte() << 8);
    const u32 = () => (u16() | (u16() << 16)) >>> 0;
    const pular = (n: number) => {
      for (let resta = n; resta > 0 && !acabou(); ) {
        avancar();
        if (acabou()) break;
        const passo = Math.min(resta, blocos[bloco][1] - pos);
        pos += passo;
        resta -= passo;
      }
    };
    u32();
    const unicos = u32();
    for (let i = 0; i < unicos && !acabou(); i += 1) {
      let caracteres = u16();
      let opcoes = byte();
      const formatos = opcoes & 8 ? u16() : 0;
      const extensao = opcoes & 4 ? u32() : 0;
      let texto = "";
      while (caracteres > 0 && !acabou()) {
        avancar();
        if (acabou()) break;
        const largo = (opcoes & 1) === 1;
        const cabem = Math.floor((blocos[bloco][1] - pos) / (largo ? 2 : 1));
        const n = Math.min(caracteres, cabem);
        const fatia = fluxo.subarray(pos, pos + n * (largo ? 2 : 1));
        texto += largo ? utf16.decode(fatia) : latin.decode(fatia);
        pos += n * (largo ? 2 : 1);
        caracteres -= n;
        if (caracteres > 0) {
          pos = blocos[bloco][1];
          opcoes = (opcoes & ~1) | (byte() & 1);
        }
      }
      pular(formatos * 4 + extensao);
      textos.push(texto);
    }
  };

  let naAba = false;
  let formulaPendente: [number, number] | null = null;
  for (let p = 0; p + 4 <= fluxo.length; ) {
    const tipo = v.getUint16(p, true);
    const tamanho = v.getUint16(p + 2, true);
    const dado = p + 4;
    const proximo = dado + tamanho;
    if (tipo === 0x85 && primeiraAba < 0) primeiraAba = v.getUint32(dado, true);
    else if (tipo === 0xfc) lerTextosCompartilhados(dado, tamanho, proximo);
    else if (tipo === 0x809 && dado - 4 === primeiraAba) naAba = true;
    else if (naAba) {
      const linha = tamanho >= 4 ? v.getUint16(dado, true) : 0;
      const coluna = tamanho >= 4 ? v.getUint16(dado + 2, true) : 0;
      if (tipo === 0x0a) break;
      if (tipo === 0xfd) por(linha, coluna, textos[v.getUint32(dado + 6, true)] ?? "");
      else if (tipo === 0x203) por(linha, coluna, numeroComoTexto(v.getFloat64(dado + 6, true)));
      else if (tipo === 0x27e) por(linha, coluna, numeroComoTexto(rk(v.getUint32(dado + 6, true))));
      else if (tipo === 0xbd) {
        for (let q = dado + 4, c = coluna; q + 6 <= proximo - 2; q += 6, c += 1) por(linha, c, numeroComoTexto(rk(v.getUint32(q + 2, true))));
      } else if (tipo === 0x204) por(linha, coluna, textoSimples(dado + 6));
      else if (tipo === 0x06) {
        if (v.getUint16(dado + 12, true) === 0xffff) formulaPendente = v.getUint8(dado + 6) === 0 ? [linha, coluna] : null;
        else por(linha, coluna, numeroComoTexto(v.getFloat64(dado + 6, true)));
      } else if (tipo === 0x207 && formulaPendente) {
        por(formulaPendente[0], formulaPendente[1], textoSimples(dado));
        formulaPendente = null;
      }
    }
    p = proximo;
  }
  if (primeiraAba < 0) throw new Error(ERRO_LEITURA);
  return tabela;
}

// ------------------------------------------------------------- texto e HTML

function lerHtml(texto: string): Tabela {
  const tabela = new DOMParser().parseFromString(texto, "text/html").querySelector("table");
  if (!tabela) throw new Error(ERRO_LEITURA);
  return [...tabela.querySelectorAll("tr")].map((tr) => [...tr.querySelectorAll("th,td")].map((c) => (c.textContent ?? "").trim()));
}

function lerTextoSeparado(texto: string): Tabela {
  const primeira = texto.slice(0, texto.indexOf("\n") < 0 ? undefined : texto.indexOf("\n"));
  const conta = (s: string) => primeira.split(s).length;
  const separador = conta("\t") > 1 ? "\t" : conta(";") >= conta(",") ? ";" : ",";
  const linhas: Tabela = [];
  let linha: string[] = [];
  let campo = "";
  let entreAspas = false;
  for (let i = 0; i < texto.length; i += 1) {
    const c = texto[i];
    if (entreAspas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i += 1;
      } else if (c === '"') entreAspas = false;
      else campo += c;
    } else if (c === '"' && campo === "") entreAspas = true;
    else if (c === separador) {
      linha.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i += 1;
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = "";
    } else campo += c;
  }
  if (campo !== "" || linha.length) {
    linha.push(campo);
    linhas.push(linha);
  }
  return linhas;
}

function decodificarTexto(bytes: Uint8Array): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^﻿/, "");
  } catch {
    return new TextDecoder("windows-1252").decode(bytes);
  }
}

// ---------------------------------------------------------------- pública

export const LIMITE_PLANILHA_MB = 10;

export async function lerPlanilha(arquivo: File): Promise<Tabela> {
  if (arquivo.size > LIMITE_PLANILHA_MB * 1024 * 1024) throw new Error(`A planilha passa de ${LIMITE_PLANILHA_MB} MB.`);
  const bytes = new Uint8Array(await arquivo.arrayBuffer());
  let tabela: Tabela;
  try {
    if (bytes[0] === 0x50 && bytes[1] === 0x4b) tabela = await lerXlsx(bytes);
    else if (bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) tabela = lerXls(bytes);
    else {
      const texto = decodificarTexto(bytes);
      tabela = /^\s*</.test(texto) ? lerHtml(texto) : lerTextoSeparado(texto);
    }
  } catch {
    throw new Error(ERRO_LEITURA);
  }
  const limpa = Array.from(tabela, (linha) => Array.from(linha ?? [], (c) => (c ?? "").trim())).filter((linha) => linha.some((c) => c !== ""));
  if (!limpa.length) throw new Error("A planilha está vazia.");
  return limpa;
}

const semAcento = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/** Planilha com cabeçalho na primeira linha: acha colunas pelo nome, sem ligar para maiúsculas e acentos. */
export function comCabecalho(tabela: Tabela) {
  const cabecalho = (tabela[0] ?? []).map((c) => semAcento(c.replace(/﻿/g, "")));
  const coluna = (candidatos: string[], trecho?: string): number => {
    for (const nome of candidatos) {
      const i = cabecalho.indexOf(semAcento(nome));
      if (i >= 0) return i;
    }
    return trecho ? cabecalho.findIndex((c) => c.includes(semAcento(trecho))) : -1;
  };
  return { coluna, linhas: tabela.slice(1), celula: (linha: string[], i: number) => (i >= 0 ? (linha[i] ?? "").trim() : "") };
}

export function inteiroDaCelula(texto: string, padrao = 0): number {
  const n = Number(texto.replace(",", "."));
  return texto.trim() !== "" && Number.isFinite(n) ? Math.trunc(n) : padrao;
}

export { semAcento };
