import { CLIENTES, decimal, inteiro, sortear, sorteio } from "./dadosFicticios";

/**
 * Dados da carteira de contas a receber fictícia das atividades de planilha de Crédito e Cobrança:
 * 70 títulos (notas fiscais a prazo) e o arquivo de retorno do banco de setembro/2025, com os
 * problemas que aparecem de verdade (número de nota digitado errado, crédito repetido no arquivo,
 * cliente que paga duas vezes, cliente que paga só o valor de face depois do vencimento).
 */

export const MULTA = 2; // % sobre o valor, uma vez, se pagar depois do vencimento
export const JUROS_MES = 1; // % ao mês, proporcional aos dias (1% ÷ 30 por dia)
export const TOLERANCIA = 1; // diferença de até R$ 1,00 a menos é abonada
export const DIAS_NEGATIVAR = 90;

const INICIO_MES = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
/** Dia do ano de 2025 (1 = 01/01): é o «número de série» que o Excel usa por baixo, só que contado a partir de janeiro. */
export const diaDoAno = (d: number, m: number) => INICIO_MES[m - 1] + d;
export const paraData = (n: number) => {
  const m = INICIO_MES.findLastIndex((i) => n > i);
  return `${String(n - INICIO_MES[m]).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}/2025`;
};

export const DATA_CONFIGURAR = diaDoAno(1, 9); // carteira da atividade de configurar: posição de 01/09
export const DATA_FECHAMENTO = diaDoAno(30, 9); // fechamento de setembro, na atividade de preencher

export const CARTEIRA_CLIENTES = [...CLIENTES, "Auto Peças Rodovia", "Academia Corpo em Forma", "Pet Shop Amigo Fiel", "Gráfica Rápida Central"];

export interface Titulo {
  nf: string;
  cliente: string;
  emissao: number;
  vencimento: number;
  valor: number;
}

const rt = sorteio(9101);
export const TITULOS: Titulo[] = Array.from({ length: 70 }, (_, i) => {
  const emissao = inteiro(rt, diaDoAno(2, 5), diaDoAno(12, 9));
  return {
    nf: `NF-${5001 + i}`,
    cliente: sortear(rt, CARTEIRA_CLIENTES),
    emissao,
    vencimento: emissao + sortear(rt, [28, 30, 30, 45, 60] as const),
    valor: decimal(rt, 420, 9800),
  };
}).sort((a, b) => a.emissao - b.emissao).map((t, i) => ({ ...t, nf: `NF-${5001 + i}` }));

export const porNf = (nf: string) => TITULOS.find((t) => t.nf === nf);

export const diasAtraso = (t: Titulo, data: number) => Math.max(0, data - t.vencimento);
/** Valor devido numa data: o valor, mais multa e juros pro rata se passou do vencimento. */
export function devido(t: Titulo, data: number) {
  const dias = diasAtraso(t, data);
  return dias === 0 ? t.valor : t.valor * (1 + MULTA / 100) + ((t.valor * JUROS_MES) / 100 / 30) * dias;
}

export type Faixa = "A vencer" | "1 a 30" | "31 a 60" | "61 a 90" | "Acima de 90";
export const FAIXAS: Faixa[] = ["A vencer", "1 a 30", "31 a 60", "61 a 90", "Acima de 90"];
export function faixa(dias: number): Faixa {
  if (dias === 0) return "A vencer";
  if (dias <= 30) return "1 a 30";
  if (dias <= 60) return "31 a 60";
  if (dias <= 90) return "61 a 90";
  return "Acima de 90";
}

/** Carteira que a atividade de configurar usa: os títulos já emitidos em 01/09. */
export const CARTEIRA_CONFIGURAR = TITULOS.filter((t) => t.emissao <= DATA_CONFIGURAR);

export interface Pagamento {
  data: number;
  documento: string; // número do crédito no arquivo do banco
  nf: string;
  valor: number;
}

const arred = (v: number) => Math.round(v * 100) / 100;
const rp = sorteio(9202);
const base: Pagamento[] = [];
let doc = 70310;
for (const t of TITULOS) {
  if (t.vencimento < diaDoAno(1, 7) || t.vencimento > diaDoAno(3, 10) || rp() < 0.2) continue;
  let data: number;
  let valor: number;
  if (t.vencimento >= diaDoAno(1, 9) && rp() < 0.8) {
    data = Math.max(diaDoAno(1, 9), t.vencimento - inteiro(rp, 0, 4));
    valor = t.valor;
  } else {
    data = Math.max(t.vencimento + 1, inteiro(rp, diaDoAno(1, 9), DATA_FECHAMENTO));
    const modo = rp();
    valor = modo < 0.55 ? arred(devido(t, data)) : modo < 0.85 ? t.valor : arred(t.valor * 0.5);
  }
  if (data > DATA_FECHAMENTO) continue;
  base.push({ data, documento: `CRD-${doc++}`, nf: t.nf, valor });
}

// Erros do dia a dia injetados de propósito: letra «O» no lugar do zero, nota que não existe, espaço no lugar do hífen,
// crédito repetido no arquivo do banco e cliente que pagou de novo uma nota já quitada.
const invalidos: Pagamento[] = [
  { data: diaDoAno(5, 9), documento: `CRD-${doc++}`, nf: "NF-5O12", valor: 1830.4 },
  { data: diaDoAno(16, 9), documento: `CRD-${doc++}`, nf: "NF-5099", valor: 2410 },
  { data: diaDoAno(24, 9), documento: `CRD-${doc++}`, nf: "NF 5031", valor: 975.6 },
];
const ordenados = [...base].sort((a, b) => a.data - b.data);
const quitadosNoPrazo = ordenados.filter((p) => p.valor === porNf(p.nf)!.valor && p.data <= diaDoAno(20, 9));
const repetidos = [ordenados[6], ordenados[21]].map((p) => ({ ...p }));
const pagosDeNovo = [quitadosNoPrazo[2], quitadosNoPrazo[quitadosNoPrazo.length - 2]].map((p) => ({ ...p, data: p.data + 4, documento: `CRD-${doc++}` }));

export const PAGAMENTOS: Pagamento[] = [...base, ...invalidos, ...repetidos, ...pagosDeNovo]
  .map((p, i) => ({ p, i }))
  .sort((a, b) => a.p.data - b.p.data || a.i - b.i)
  .map(({ p }) => p);

export type SituacaoBaixa = "QUITADO" | "PARCIAL" | "NF NÃO ENCONTRADA" | "DUPLICADO" | "JÁ QUITADO";

export interface Baixa extends Pagamento {
  situacao: SituacaoBaixa;
  devido: number;
  saldo: number; // o que falta, na baixa parcial
}

export function processarPagamentos(pagamentos: Pagamento[]) {
  const docs = new Set<string>();
  const quitados = new Set<string>();
  const baixas: Baixa[] = pagamentos.map((p) => {
    const t = porNf(p.nf);
    const b: Baixa = { ...p, situacao: "QUITADO", devido: 0, saldo: 0 };
    if (!t) b.situacao = "NF NÃO ENCONTRADA";
    else if (docs.has(p.documento)) b.situacao = "DUPLICADO";
    else {
      docs.add(p.documento);
      b.devido = devido(t, p.data);
      if (quitados.has(t.nf)) b.situacao = "JÁ QUITADO";
      else if (p.valor >= b.devido - TOLERANCIA) quitados.add(t.nf);
      else {
        b.situacao = "PARCIAL";
        b.saldo = b.devido - p.valor;
      }
    }
    return b;
  });
  const carteira = TITULOS.map((t) => {
    const minhas = baixas.filter((b) => b.nf === t.nf);
    const quitado = minhas.some((b) => b.situacao === "QUITADO");
    const parcial = minhas.find((b) => b.situacao === "PARCIAL");
    const dias = diasAtraso(t, DATA_FECHAMENTO);
    const situacao = quitado ? "QUITADO" : parcial ? "PARCIAL" : dias > 0 ? "VENCIDO" : "A VENCER";
    const emAberto = situacao === "QUITADO" ? 0 : parcial ? parcial.saldo : devido(t, DATA_FECHAMENTO);
    return { titulo: t, situacao, dias, emAberto, negativar: situacao === "VENCIDO" && dias > DIAS_NEGATIVAR };
  });
  return { baixas, carteira };
}

export const COBRANCA_SETEMBRO = processarPagamentos(PAGAMENTOS);
