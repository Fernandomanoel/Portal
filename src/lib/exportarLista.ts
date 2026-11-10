import { ehErro, ehFormula, formulaParaExcel, letraDaColuna, lerNumero, calculadora, mostrarResultado } from "@/lib/formulas";
import { indiceMesclagens } from "@/lib/gradeLista";
import type { ColunaLista, CorLinha, ListaAcompanhamento, ValorCelula } from "@/types/lista";

/**
 * Exporta a lista em .xlsx direto no navegador. O .xlsx é um zip de XMLs; aqui
 * o zip vai «guardado» (sem compressão), o que dispensa biblioteca e o Excel
 * abre igual. Cabeçalho em negrito, primeira linha e primeira coluna
 * congeladas, cor e negrito das linhas e largura das colunas preservados.
 */

// Mesmos tons claros das linhas na tela, legíveis com texto preto.
const FUNDOS: Record<CorLinha, string> = { azul: "DBE6FF", verde: "D7F2E0", amarelo: "FDF1B0", vermelho: "FBDADA", cinza: "E5E7EB" };

// Caracteres de controle (colados de outro programa) deixam o XML inválido: saem antes de escapar.
const semControle = (texto: string) => [...texto].filter((c) => c >= " " || c === "\t" || c === "\n" || c === "\r").join("");
const escapar = (texto: string) => semControle(texto).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function letraColuna(indice: number) {
  return letraDaColuna(indice);
}

// ------------------------------------------------------------------ estilos

interface EspecEstilo {
  fundo?: CorLinha | "cabecalho" | "titulo";
  negrito?: boolean;
  italico?: boolean;
  alinhar?: "left" | "center" | "right";
  borda?: "padrao" | "forte" | "nenhuma";
  /** Código de formato de número do Excel (ex.: `"R$" #,##0.00`). */
  formato?: string;
  fonteTitulo?: boolean;
}

/** Junta as combinações de estilo usadas e devolve o índice de cada uma em `cellXfs`. */
class RegistroDeEstilos {
  private fills: string[] = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'];
  private fillIds = new Map<string, number>();
  private fontes = new Map<string, number>([["normal", 0]]);
  private formatos = new Map<string, number>();
  private xfs: string[] = ['<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>'];
  private chaves = new Map<string, number>();

  private fill(cor: string | undefined) {
    if (!cor) return 0;
    let id = this.fillIds.get(cor);
    if (id === undefined) {
      id = this.fills.length;
      this.fills.push(`<fill><patternFill patternType="solid"><fgColor rgb="FF${cor}"/></patternFill></fill>`);
      this.fillIds.set(cor, id);
    }
    return id;
  }

  private fonte(e: EspecEstilo) {
    const chave = `${e.negrito ? "b" : ""}${e.italico ? "i" : ""}${e.fonteTitulo ? "t" : ""}` || "normal";
    let id = this.fontes.get(chave);
    if (id === undefined) {
      id = this.fontes.size;
      this.fontes.set(chave, id);
    }
    return id;
  }

  indice(e: EspecEstilo): number {
    const chave = JSON.stringify(e);
    const existente = this.chaves.get(chave);
    if (existente !== undefined) return existente;
    const cor = e.fundo === "cabecalho" ? "E5E7EB" : e.fundo === "titulo" ? "DBE6FF" : e.fundo ? FUNDOS[e.fundo] : undefined;
    let numFmt = 0;
    if (e.formato) {
      numFmt = this.formatos.get(e.formato) ?? 164 + this.formatos.size;
      this.formatos.set(e.formato, numFmt);
    }
    const alinhamento = `<alignment vertical="center"${e.alinhar ? ` horizontal="${e.alinhar}"` : ""}${e.fundo === "cabecalho" ? ' wrapText="1"' : ""}/>`;
    const xf = `<xf numFmtId="${numFmt}" fontId="${this.fonte(e)}" fillId="${this.fill(cor)}" borderId="${e.borda === "forte" ? 2 : e.borda === "nenhuma" ? 0 : 1}" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">${alinhamento}</xf>`;
    this.xfs.push(xf);
    this.chaves.set(chave, this.xfs.length - 1);
    return this.xfs.length - 1;
  }

  xml() {
    const fonte = (b: boolean, i: boolean, t: boolean) => `<font>${b ? "<b/>" : ""}${i ? "<i/>" : ""}<sz val="${t ? 12 : 11}"/>${t ? '<color rgb="FF1E3A8A"/>' : ""}<name val="Calibri"/></font>`;
    const fontes = [...this.fontes.keys()].map((k) => (k === "normal" ? fonte(false, false, false) : fonte(k.includes("b"), k.includes("i"), k.includes("t"))));
    const fino = (c: string) => `<left style="thin"><color rgb="${c}"/></left><right style="thin"><color rgb="${c}"/></right><top style="thin"><color rgb="${c}"/></top><bottom style="thin"><color rgb="${c}"/></bottom><diagonal/>`;
    const forte = '<left style="medium"><color rgb="FF374151"/></left><right style="medium"><color rgb="FF374151"/></right><top style="medium"><color rgb="FF374151"/></top><bottom style="medium"><color rgb="FF374151"/></bottom><diagonal/>';
    const numFmts = [...this.formatos].map(([codigo, id]) => `<numFmt numFmtId="${id}" formatCode="${escapar(codigo)}"/>`).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${numFmts ? `<numFmts count="${this.formatos.size}">${numFmts}</numFmts>` : ""}<fonts count="${fontes.length}">${fontes.join("")}</fonts><fills count="${this.fills.length}">${this.fills.join("")}</fills><borders count="3"><border><left/><right/><top/><bottom/><diagonal/></border><border>${fino("FFD1D5DB")}</border><border>${forte}</border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${this.xfs.length}">${this.xfs.join("")}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
  }
}

/** Formato de número do Excel para a coluna: moeda, porcentagem ou número com as casas escolhidas. */
function formatoExcel(coluna: ColunaLista): string | undefined {
  if (coluna.tipo === "data") return "dd/mm/yyyy";
  if (coluna.tipo !== "numero") return undefined;
  const casas = coluna.casas ?? (coluna.formato === "moeda" ? 2 : coluna.formato === "percentual" ? 1 : undefined);
  const decimais = casas === undefined ? "0.######" : casas === 0 ? "0" : `0.${"0".repeat(casas)}`;
  const milhar = decimais.startsWith("0") ? `#,##${decimais}` : decimais;
  if (coluna.formato === "moeda") return `"R$" ${milhar}`;
  if (coluna.formato === "percentual") return `${decimais}%`;
  return milhar;
}

/** Dias desde 30/12/1899, como o Excel guarda datas. */
const serialDaData = (iso: string) => Math.round((Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) - Date.UTC(1899, 11, 30)) / 86400000);

function textoDaCelula(valor: ValorCelula | undefined, tipo: string) {
  if (valor === undefined) return "";
  if (tipo === "marca") return valor === true ? "✓" : "";
  if (tipo === "simnao") return valor === "sim" ? "Sim" : valor === "nao" ? "Não" : "";
  return String(valor);
}

const celulaTexto = (ref: string, s: number, t: string) => `<c r="${ref}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${escapar(t)}</t></is></c>`;

function planilhaXml(lista: ListaAcompanhamento, estilos: RegistroDeEstilos) {
  const { colunas, linhas } = lista;
  const calc = calculadora(lista);
  const indiceM = indiceMesclagens(lista);
  const cols = colunas.map((c, i) => `<col min="${i + 1}" max="${i + 1}" width="${Math.max(6, Math.round(c.largura / 7))}" customWidth="1"/>`).join("");
  const sCab = estilos.indice({ fundo: "cabecalho", negrito: true });
  const cabecalho = colunas.map((c, i) => celulaTexto(`${letraColuna(i)}1`, sCab, c.titulo)).join("");
  const mescladas: string[] = [];
  const ultima = letraColuna(Math.max(0, colunas.length - 1));
  const corpo = linhas
    .map((linha, l) => {
      const r = l + 2;
      if (linha.titulo !== undefined) {
        const s = estilos.indice({ fundo: linha.cor ?? "titulo", negrito: true, fonteTitulo: true });
        if (colunas.length > 1) mescladas.push(`A${r}:${ultima}${r}`);
        const resto = colunas.slice(1).map((_, i) => `<c r="${letraColuna(i + 1)}${r}" s="${s}"/>`).join("");
        return `<row r="${r}" ht="24" customHeight="1">${celulaTexto(`A${r}`, s, linha.titulo)}${resto}</row>`;
      }
      const celulas = colunas
        .map((c, i) => {
          const ref = `${letraColuna(i)}${r}`;
          const e = linha.estilos?.[c.id];
          const centro = c.tipo === "marca" || c.tipo === "simnao";
          const s = estilos.indice({
            fundo: e?.fundo ?? linha.cor,
            negrito: !!(e?.negrito ?? linha.negrito),
            italico: !!e?.italico,
            alinhar: e?.alinhar ? ({ esquerda: "left", centro: "center", direita: "right" } as const)[e.alinhar] : centro ? "center" : c.tipo === "numero" ? "right" : undefined,
            borda: e?.bordas === "todas" ? "forte" : e?.bordas === "nenhuma" ? "nenhuma" : "padrao",
            formato: formatoExcel(c),
          });
          const merge = indiceM.get(`${linha.id}:${c.id}`);
          if (merge && !merge.ancora) return `<c r="${ref}" s="${s}"/>`;
          if (merge && (merge.colunas > 1 || merge.linhas > 1)) mescladas.push(`${ref}:${letraColuna(i + merge.colunas - 1)}${r + merge.linhas - 1}`);
          const valor = linha.valores[c.id];
          if (valor === undefined) return `<c r="${ref}" s="${s}"/>`;
          if (ehFormula(valor) && c.tipo !== "marca") {
            const excel = formulaParaExcel(valor);
            const resultado = calc.resolver(l, i);
            if (excel) {
              const f = `<f>${escapar(excel)}</f>`;
              if (ehErro(resultado)) return `<c r="${ref}" s="${s}" t="e">${f}<v>${escapar(resultado.erro)}</v></c>`;
              if (typeof resultado === "number") return `<c r="${ref}" s="${s}">${f}<v>${resultado}</v></c>`;
              if (typeof resultado === "boolean") return `<c r="${ref}" s="${s}" t="b">${f}<v>${resultado ? 1 : 0}</v></c>`;
              return `<c r="${ref}" s="${s}" t="str">${f}<v>${escapar(String(resultado ?? ""))}</v></c>`;
            }
            // Fórmula sem equivalente no Excel: vai só o resultado.
            return celulaTexto(ref, s, mostrarResultado(resultado));
          }
          if (c.tipo === "numero" && typeof valor === "string") {
            const n = lerNumero(valor);
            if (n !== null) return `<c r="${ref}" s="${s}"><v>${n}</v></c>`;
          }
          if (c.tipo === "data" && typeof valor === "string") return `<c r="${ref}" s="${s}"><v>${serialDaData(valor)}</v></c>`;
          const texto = textoDaCelula(valor, c.tipo);
          return texto ? celulaTexto(ref, s, texto) : `<c r="${ref}" s="${s}"/>`;
        })
        .join("");
      return `<row r="${r}">${celulas}</row>`;
    })
    .join("");
  const fixasColunas = Math.min(lista.congelar?.colunas ?? 1, Math.max(0, colunas.length - 1) + 1);
  const fixasLinhas = lista.congelar?.linhas ?? 0;
  const x = fixasColunas;
  const y = 1 + fixasLinhas;
  const celulaSuperior = `${letraColuna(x)}${y + 1}`;
  const painel = x > 0 ? `<pane xSplit="${x}" ySplit="${y}" topLeftCell="${celulaSuperior}" activePane="bottomRight" state="frozen"/><selection pane="bottomRight" activeCell="${celulaSuperior}" sqref="${celulaSuperior}"/>` : `<pane ySplit="${y}" topLeftCell="A${y + 1}" activePane="bottomLeft" state="frozen"/>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetViews><sheetView workbookViewId="0">${painel}</sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/>${cols ? `<cols>${cols}</cols>` : ""}<sheetData><row r="1" ht="22" customHeight="1">${cabecalho}</row>${corpo}</sheetData>${mescladas.length ? `<mergeCells count="${mescladas.length}">${mescladas.map((m) => `<mergeCell ref="${m}"/>`).join("")}</mergeCells>` : ""}</worksheet>`;
}

const nomeDaAba = (titulo: string) => titulo.replace(/[[\]:*?/\\]/g, " ").trim().slice(0, 31) || "Lista";

// ------------------------------------------------------------------ zip

const TABELA_CRC = (() => {
  const tabela = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    tabela[n] = c >>> 0;
  }
  return tabela;
})();

function crc32(bytes: Uint8Array) {
  let c = 0xffffffff;
  for (const b of bytes) c = TABELA_CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zipGuardado(arquivos: { nome: string; conteudo: string | Uint8Array }[]) {
  const codificador = new TextEncoder();
  const partes: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let deslocamento = 0;
  for (const arquivo of arquivos) {
    const nome = codificador.encode(arquivo.nome);
    const dados = typeof arquivo.conteudo === "string" ? codificador.encode(arquivo.conteudo) : arquivo.conteudo;
    const crc = crc32(dados);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // nomes em UTF-8
    local.setUint32(14, crc, true);
    local.setUint32(18, dados.length, true);
    local.setUint32(22, dados.length, true);
    local.setUint16(26, nome.length, true);
    partes.push(new Uint8Array(local.buffer), nome, dados);

    const dir = new DataView(new ArrayBuffer(46));
    dir.setUint32(0, 0x02014b50, true);
    dir.setUint16(4, 20, true);
    dir.setUint16(6, 20, true);
    dir.setUint16(8, 0x0800, true);
    dir.setUint32(16, crc, true);
    dir.setUint32(20, dados.length, true);
    dir.setUint32(24, dados.length, true);
    dir.setUint16(28, nome.length, true);
    dir.setUint32(42, deslocamento, true);
    central.push(new Uint8Array(dir.buffer), nome);
    deslocamento += 30 + nome.length + dados.length;
  }
  const tamanhoCentral = central.reduce((s, p) => s + p.length, 0);
  const fim = new DataView(new ArrayBuffer(22));
  fim.setUint32(0, 0x06054b50, true);
  fim.setUint16(8, arquivos.length, true);
  fim.setUint16(10, arquivos.length, true);
  fim.setUint32(12, tamanhoCentral, true);
  fim.setUint32(16, deslocamento, true);
  return new Blob([...partes, ...central, new Uint8Array(fim.buffer)] as BlobPart[], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

export interface ImagemGrafico {
  titulo: string;
  /** PNG já gerado, em 2× (1280 × 720). */
  png: Uint8Array;
}

const EMU = 9525;

/** Segunda aba, «Gráficos», com cada gráfico como imagem (a mesma do botão «Baixar PNG»). */
function abaDeGraficos(imagens: ImagemGrafico[]) {
  const ancoras = imagens
    .map((img, i) => {
      const linha = i * 17;
      return `<xdr:oneCellAnchor><xdr:from><xdr:col>0</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${linha}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from><xdr:ext cx="${640 * EMU}" cy="${360 * EMU}"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="${i + 2}" name="Gráfico ${i + 1}" descr="${escapar(img.titulo)}"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId${i + 1}"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${640 * EMU}" cy="${360 * EMU}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor>`;
    })
    .join("");
  return [
    { nome: "xl/worksheets/sheet2.xml", conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetData/><drawing r:id="rId1"/></worksheet>` },
    { nome: "xl/worksheets/_rels/sheet2.xml.rels", conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/></Relationships>` },
    { nome: "xl/drawings/drawing1.xml", conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">${ancoras}</xdr:wsDr>` },
    { nome: "xl/drawings/_rels/drawing1.xml.rels", conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${imagens.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/grafico${i + 1}.png"/>`).join("")}</Relationships>` },
    ...imagens.map((img, i) => ({ nome: `xl/media/grafico${i + 1}.png`, conteudo: img.png })),
  ];
}

export function listaParaXlsx(lista: ListaAcompanhamento, imagens: ImagemGrafico[] = []) {
  const estilos = new RegistroDeEstilos();
  const sheet = planilhaXml(lista, estilos);
  const comGraficos = imagens.length > 0;
  return zipGuardado([
    {
      nome: "[Content_Types].xml",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${comGraficos ? '<Default Extension="png" ContentType="image/png"/>' : ""}<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>${comGraficos ? '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>' : ""}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
    },
    {
      nome: "_rels/.rels",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    },
    {
      nome: "xl/workbook.xml",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${escapar(nomeDaAba(lista.titulo))}" sheetId="1" r:id="rId1"/>${comGraficos ? '<sheet name="Gráficos" sheetId="2" r:id="rId3"/>' : ""}</sheets></workbook>`,
    },
    {
      nome: "xl/_rels/workbook.xml.rels",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${comGraficos ? '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>' : ""}</Relationships>`,
    },
    { nome: "xl/styles.xml", conteudo: estilos.xml() },
    { nome: "xl/worksheets/sheet1.xml", conteudo: sheet },
    ...(comGraficos ? abaDeGraficos(imagens) : []),
  ]);
}

export async function baixarXlsx(lista: ListaAcompanhamento) {
  const data = new Date().toISOString().slice(0, 10);
  const nome = `${lista.titulo.replace(/[\\/:*?"<>|]/g, "").trim() || "lista"}-${data}.xlsx`;
  // Os gráficos vão junto como imagens, numa aba «Gráficos» (mesma imagem do botão «Baixar PNG»).
  const [{ svgParaPng }, { dadosDoGrafico, svgDoGrafico, TEMA_CLARO }, { calculadora }] = await Promise.all([import("./exportarGrafico"), import("./graficoLista"), import("./formulas")]);
  const calc = calculadora(lista);
  const imagens: ImagemGrafico[] = [];
  for (const g of lista.graficos ?? []) {
    const png = await svgParaPng(svgDoGrafico(g, dadosDoGrafico(lista, calc, g), { tema: TEMA_CLARO }));
    imagens.push({ titulo: g.titulo, png: new Uint8Array(await png.arrayBuffer()) });
  }
  const url = URL.createObjectURL(listaParaXlsx(lista, imagens));
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
