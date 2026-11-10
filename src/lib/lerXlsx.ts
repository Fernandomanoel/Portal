// Lê a primeira aba de um .xlsx dentro do navegador: o arquivo nunca sai do computador de quem abriu.
// shortcut: só .xlsx (zip + XML). O .xls antigo é binário e pediria uma biblioteca; hoje a tela manda salvar como .xlsx.

export type Celula = string | number | null;

export class ErroPlanilha extends Error {}

const INVALIDA = "Não foi possível ler a planilha. Confira se o arquivo é um Excel .xlsx válido.";

interface Entrada {
  metodo: number;
  tamanho: number;
  posicao: number;
}

function indiceDoZip(bytes: Uint8Array): Map<string, Entrada> {
  const vista = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let fim = bytes.length - 22;
  while (fim >= 0 && vista.getUint32(fim, true) !== 0x06054b50) fim--;
  if (fim < 0) throw new ErroPlanilha(INVALIDA);

  const total = vista.getUint16(fim + 10, true);
  let cursor = vista.getUint32(fim + 16, true);
  const entradas = new Map<string, Entrada>();
  const texto = new TextDecoder();
  for (let i = 0; i < total; i++) {
    if (vista.getUint32(cursor, true) !== 0x02014b50) throw new ErroPlanilha(INVALIDA);
    const tamanhoNome = vista.getUint16(cursor + 28, true);
    const nome = texto.decode(bytes.subarray(cursor + 46, cursor + 46 + tamanhoNome));
    entradas.set(nome, {
      metodo: vista.getUint16(cursor + 10, true),
      tamanho: vista.getUint32(cursor + 20, true),
      posicao: vista.getUint32(cursor + 42, true),
    });
    cursor += 46 + tamanhoNome + vista.getUint16(cursor + 30, true) + vista.getUint16(cursor + 32, true);
  }
  return entradas;
}

async function extrair(bytes: Uint8Array, entrada: Entrada | undefined): Promise<string | null> {
  if (!entrada) return null;
  const vista = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const inicio = entrada.posicao + 30 + vista.getUint16(entrada.posicao + 26, true) + vista.getUint16(entrada.posicao + 28, true);
  const dados = bytes.slice(inicio, inicio + entrada.tamanho);
  if (entrada.metodo === 0) return new TextDecoder().decode(dados);
  if (entrada.metodo !== 8) throw new ErroPlanilha(INVALIDA);
  const fluxo = new Blob([dados]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Response(fluxo).text();
}

function xml(texto: string): Document {
  return new DOMParser().parseFromString(texto, "application/xml");
}

function filhos(no: Element | Document, nome: string): Element[] {
  return Array.from(no.getElementsByTagNameNS("*", nome));
}

function textoDe(no: Element): string {
  // Texto fonético (rPh) acompanha nomes em japonês e não faz parte do valor.
  return filhos(no, "t")
    .filter((t) => !t.closest("rPh"))
    .map((t) => t.textContent ?? "")
    .join("");
}

function indiceDaColuna(referencia: string): number {
  let indice = 0;
  for (const letra of referencia) {
    const codigo = letra.charCodeAt(0);
    if (codigo < 65 || codigo > 90) break;
    indice = indice * 26 + (codigo - 64);
  }
  return indice - 1;
}

function caminhoDaPrimeiraAba(pasta: string | null, relacoes: string | null): string {
  if (!pasta || !relacoes) return "xl/worksheets/sheet1.xml";
  const idDaAba = filhos(xml(pasta), "sheet")[0]?.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
  const alvo = filhos(xml(relacoes), "Relationship")
    .find((r) => r.getAttribute("Id") === idDaAba)
    ?.getAttribute("Target");
  if (!alvo) return "xl/worksheets/sheet1.xml";
  return alvo.startsWith("/") ? alvo.slice(1) : `xl/${alvo}`;
}

export async function lerXlsx(arquivo: Blob): Promise<Celula[][]> {
  const bytes = new Uint8Array(await arquivo.arrayBuffer());
  let aba: string | null;
  let compartilhados: string[];
  try {
    const zip = indiceDoZip(bytes);
    const caminho = caminhoDaPrimeiraAba(await extrair(bytes, zip.get("xl/workbook.xml")), await extrair(bytes, zip.get("xl/_rels/workbook.xml.rels")));
    aba = await extrair(bytes, zip.get(caminho));
    const textos = await extrair(bytes, zip.get("xl/sharedStrings.xml"));
    compartilhados = textos ? filhos(xml(textos), "si").map(textoDe) : [];
  } catch (falha) {
    throw falha instanceof ErroPlanilha ? falha : new ErroPlanilha(INVALIDA);
  }
  if (!aba) throw new ErroPlanilha(INVALIDA);

  const linhas: Celula[][] = [];
  for (const linha of filhos(xml(aba), "row")) {
    const numero = Number(linha.getAttribute("r")) || linhas.length + 1;
    while (linhas.length < numero) linhas.push([]);
    const celulas = linhas[numero - 1];
    for (const celula of filhos(linha, "c")) {
      const referencia = celula.getAttribute("r");
      const coluna = referencia ? indiceDaColuna(referencia) : celulas.length;
      const tipo = celula.getAttribute("t");
      const bruto = filhos(celula, "v")[0]?.textContent ?? null;
      let valor: Celula = null;
      if (tipo === "inlineStr") valor = textoDe(celula);
      else if (bruto === null) valor = null;
      else if (tipo === "s") valor = compartilhados[Number(bruto)] ?? null;
      else if (tipo === "str" || tipo === "e") valor = bruto;
      else if (tipo === "b") valor = bruto === "1" ? "VERDADEIRO" : "FALSO";
      else valor = Number.isFinite(Number(bruto)) ? Number(bruto) : bruto;
      while (celulas.length < coluna) celulas.push(null);
      celulas[coluna] = valor;
    }
  }
  return linhas;
}
