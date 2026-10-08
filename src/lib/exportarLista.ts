import type { CorLinha, ListaAcompanhamento, ValorCelula } from "@/types/lista";

/**
 * Exporta a lista em .xlsx direto no navegador. O .xlsx é um zip de XMLs; aqui
 * o zip vai «guardado» (sem compressão), o que dispensa biblioteca e o Excel
 * abre igual. Cabeçalho em negrito, primeira linha e primeira coluna
 * congeladas, cor e negrito das linhas e largura das colunas preservados.
 */

// Mesmos tons claros das linhas na tela, legíveis com texto preto.
const FUNDOS: Record<CorLinha, string> = { azul: "DBE6FF", verde: "D7F2E0", amarelo: "FDF1B0", vermelho: "FBDADA" };
const CORES: (CorLinha | null)[] = [null, "azul", "verde", "amarelo", "vermelho"];

// Caracteres de controle (colados de outro programa) deixam o XML inválido: saem antes de escapar.
const semControle = (texto: string) => [...texto].filter((c) => c >= " " || c === "\t" || c === "\n" || c === "\r").join("");
const escapar = (texto: string) => semControle(texto).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function letraColuna(indice: number) {
  let n = indice + 1;
  let letra = "";
  while (n > 0) {
    const resto = (n - 1) % 26;
    letra = String.fromCharCode(65 + resto) + letra;
    n = Math.floor((n - 1) / 26);
  }
  return letra;
}

/** Estilo de célula: 1 é o cabeçalho; os demais combinam cor da linha × negrito × centralizado. */
function estilo(cor: CorLinha | undefined, negrito: boolean, centro: boolean) {
  return 2 + CORES.indexOf(cor ?? null) * 4 + (negrito ? 2 : 0) + (centro ? 1 : 0);
}

function stylesXml() {
  const fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>', '<fill><patternFill patternType="solid"><fgColor rgb="FFE5E7EB"/></patternFill></fill>'];
  for (const cor of CORES.slice(1)) fills.push(`<fill><patternFill patternType="solid"><fgColor rgb="FF${FUNDOS[cor!]}"/></patternFill></fill>`);
  const borda = '<border><left style="thin"><color rgb="FFD1D5DB"/></left><right style="thin"><color rgb="FFD1D5DB"/></right><top style="thin"><color rgb="FFD1D5DB"/></top><bottom style="thin"><color rgb="FFD1D5DB"/></bottom><diagonal/></border>';
  const xfs = ['<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>', '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>'];
  CORES.forEach((_, i) => {
    const fillId = i === 0 ? 0 : i + 2;
    for (const negrito of [false, true])
      for (const centro of [false, true])
        xfs.push(`<xf numFmtId="0" fontId="${negrito ? 1 : 0}" fillId="${fillId}" borderId="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"${centro ? ' horizontal="center"' : ""}/></xf>`);
  });
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="${fills.length}">${fills.join("")}</fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>${borda}</borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${xfs.length}">${xfs.join("")}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
}

function textoDaCelula(valor: ValorCelula | undefined, tipo: string) {
  if (valor === undefined) return "";
  if (tipo === "marca") return valor === true ? "✓" : "";
  if (tipo === "simnao") return valor === "sim" ? "Sim" : valor === "nao" ? "Não" : "";
  return String(valor);
}

function planilhaXml(lista: ListaAcompanhamento) {
  const { colunas, linhas } = lista;
  const cols = colunas.map((c, i) => `<col min="${i + 1}" max="${i + 1}" width="${Math.max(6, Math.round(c.largura / 7))}" customWidth="1"/>`).join("");
  const cabecalho = colunas.map((c, i) => `<c r="${letraColuna(i)}1" s="1" t="inlineStr"><is><t xml:space="preserve">${escapar(c.titulo)}</t></is></c>`).join("");
  const corpo = linhas
    .map((linha, l) => {
      const r = l + 2;
      const celulas = colunas
        .map((c, i) => {
          const s = estilo(linha.cor, !!linha.negrito, c.tipo === "marca" || c.tipo === "simnao");
          const texto = textoDaCelula(linha.valores[c.id], c.tipo);
          const ref = `${letraColuna(i)}${r}`;
          return texto ? `<c r="${ref}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${escapar(texto)}</t></is></c>` : `<c r="${ref}" s="${s}"/>`;
        })
        .join("");
      return `<row r="${r}">${celulas}</row>`;
    })
    .join("");
  const congelar = colunas.length > 1
    ? '<pane xSplit="1" ySplit="1" topLeftCell="B2" activePane="bottomRight" state="frozen"/><selection pane="bottomRight" activeCell="B2" sqref="B2"/>'
    : '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0">${congelar}</sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/>${cols ? `<cols>${cols}</cols>` : ""}<sheetData><row r="1" ht="22" customHeight="1">${cabecalho}</row>${corpo}</sheetData></worksheet>`;
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

function zipGuardado(arquivos: { nome: string; conteudo: string }[]) {
  const codificador = new TextEncoder();
  const partes: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let deslocamento = 0;
  for (const arquivo of arquivos) {
    const nome = codificador.encode(arquivo.nome);
    const dados = codificador.encode(arquivo.conteudo);
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

export function listaParaXlsx(lista: ListaAcompanhamento) {
  return zipGuardado([
    {
      nome: "[Content_Types].xml",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
    },
    {
      nome: "_rels/.rels",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    },
    {
      nome: "xl/workbook.xml",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${escapar(nomeDaAba(lista.titulo))}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    },
    {
      nome: "xl/_rels/workbook.xml.rels",
      conteudo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    },
    { nome: "xl/styles.xml", conteudo: stylesXml() },
    { nome: "xl/worksheets/sheet1.xml", conteudo: planilhaXml(lista) },
  ]);
}

export function baixarXlsx(lista: ListaAcompanhamento) {
  const data = new Date().toISOString().slice(0, 10);
  const nome = `${lista.titulo.replace(/[\\/:*?"<>|]/g, "").trim() || "lista"}-${data}.xlsx`;
  const url = URL.createObjectURL(listaParaXlsx(lista));
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
