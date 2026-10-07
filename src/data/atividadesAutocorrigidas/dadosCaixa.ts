import { CLIENTES, FORNECEDORES, decimal, inteiro, sortear, sorteio } from "./dadosFicticios";
import { diaDoAno, paraData } from "./dadosCobranca";

/**
 * Dados do financeiro fictício das atividades de planilha do Assistente de Administração
 * Financeira: o fluxo de caixa projetado de outubro/2025 (para configurar) e a conciliação
 * bancária de setembro/2025 (para preencher), com o que aparece de verdade: cheque que ainda
 * não compensou, depósito em trânsito, tarifa que ninguém lançou, valor digitado com os
 * números trocados e lançamento feito duas vezes no sistema.
 */

export { paraData };

export const CATEGORIAS = ["Recebimento de clientes", "Fornecedores", "Folha de pagamento", "Impostos", "Aluguel", "Energia, água e telefone", "Tarifas bancárias", "Empréstimo"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export interface Previsto {
  data: number;
  descricao: string;
  categoria: Categoria;
  tipo: "Entrada" | "Saída";
  valor: number;
}

export const SALDO_INICIAL_OUTUBRO = 18500;

const rf = sorteio(9301);
const fixos: Previsto[] = [
  { data: diaDoAno(1, 10), descricao: "Tarifa do pacote de serviços", categoria: "Tarifas bancárias", tipo: "Saída", valor: 89.9 },
  { data: diaDoAno(7, 10), descricao: "Salários de setembro", categoria: "Folha de pagamento", tipo: "Saída", valor: 58420 },
  { data: diaDoAno(7, 10), descricao: "FGTS de setembro", categoria: "Impostos", tipo: "Saída", valor: 4673.6 },
  { data: diaDoAno(10, 10), descricao: "Aluguel do galpão", categoria: "Aluguel", tipo: "Saída", valor: 7800 },
  { data: diaDoAno(10, 10), descricao: "ISS de setembro", categoria: "Impostos", tipo: "Saída", valor: 2140.35 },
  { data: diaDoAno(14, 10), descricao: "Energia elétrica", categoria: "Energia, água e telefone", tipo: "Saída", valor: 3284.17 },
  { data: diaDoAno(15, 10), descricao: "Parcela 8/24 do capital de giro", categoria: "Empréstimo", tipo: "Saída", valor: 4380.5 },
  { data: diaDoAno(17, 10), descricao: "Água e esgoto", categoria: "Energia, água e telefone", tipo: "Saída", valor: 612.4 },
  { data: diaDoAno(20, 10), descricao: "INSS e IRRF de setembro (DCTFWeb)", categoria: "Impostos", tipo: "Saída", valor: 9852.88 },
  { data: diaDoAno(20, 10), descricao: "Simples Nacional (DAS)", categoria: "Impostos", tipo: "Saída", valor: 11240.66 },
  { data: diaDoAno(20, 10), descricao: "Adiantamento salarial", categoria: "Folha de pagamento", tipo: "Saída", valor: 23368 },
  { data: diaDoAno(22, 10), descricao: "Telefone e internet", categoria: "Energia, água e telefone", tipo: "Saída", valor: 489.9 },
];
const variaveis: Previsto[] = [
  ...Array.from({ length: 34 }, (): Previsto => ({ data: inteiro(rf, diaDoAno(1, 10), diaDoAno(31, 10)), descricao: `Recebimento — ${sortear(rf, CLIENTES)}`, categoria: "Recebimento de clientes", tipo: "Entrada", valor: decimal(rf, 2500, 11500) })),
  ...Array.from({ length: 14 }, (): Previsto => ({ data: inteiro(rf, diaDoAno(1, 10), diaDoAno(31, 10)), descricao: `Boleto — ${sortear(rf, FORNECEDORES)}`, categoria: "Fornecedores", tipo: "Saída", valor: decimal(rf, 1200, 6800) })),
];
// Dentro do mesmo dia, as entradas vêm antes das saídas: é a ordem em que o banco credita e debita.
export const FLUXO_OUTUBRO: Previsto[] = [...fixos, ...variaveis]
  .map((p, i) => ({ p, i }))
  .sort((a, b) => a.p.data - b.p.data || (a.p.tipo === b.p.tipo ? a.i - b.i : a.p.tipo === "Entrada" ? -1 : 1))
  .map(({ p }) => p);

export const SALDOS_OUTUBRO = FLUXO_OUTUBRO.reduce<number[]>((acc, p) => {
  const anterior = acc.length ? acc[acc.length - 1] : SALDO_INICIAL_OUTUBRO;
  acc.push(anterior + (p.tipo === "Entrada" ? p.valor : -p.valor));
  return acc;
}, []);

// ------------------------------------------------------------------ conciliação de setembro

export const SALDO_INICIAL_SETEMBRO = 22340;

export interface LancamentoBanco {
  data: number;
  documento: string;
  historico: string;
  valor: number; // + crédito, − débito
}

const rc = sorteio(9402);
const reais: LancamentoBanco[] = [];
let pix = 88120;
let bol = 4410;
let chq = 451;
for (let i = 0; i < 26; i++) reais.push({ data: inteiro(rc, diaDoAno(1, 9), diaDoAno(29, 9)), documento: `PIX-${pix++}`, historico: `PIX recebido — ${sortear(rc, CLIENTES)}`, valor: decimal(rc, 650, 7400) });
for (let i = 0; i < 14; i++) reais.push({ data: inteiro(rc, diaDoAno(1, 9), diaDoAno(29, 9)), documento: `BOL-${bol++}`, historico: `Pagamento de boleto — ${sortear(rc, FORNECEDORES)}`, valor: -decimal(rc, 480, 6900) });
for (let i = 0; i < 4; i++) reais.push({ data: inteiro(rc, diaDoAno(2, 9), diaDoAno(26, 9)), documento: `DEP-${310 + i}`, historico: "Depósito em dinheiro — caixa da loja", valor: decimal(rc, 900, 4800) });
for (let i = 0; i < 8; i++) reais.push({ data: inteiro(rc, diaDoAno(1, 9), diaDoAno(24, 9)), documento: `CHQ-000${chq++}`, historico: `Cheque — ${sortear(rc, FORNECEDORES)}`, valor: -decimal(rc, 350, 3900) });
reais.push(
  { data: diaDoAno(5, 9), documento: "TED-1180", historico: "TED — salários de agosto", valor: -48760 },
  { data: diaDoAno(19, 9), documento: "TED-1181", historico: "TED — adiantamento salarial", valor: -19504 },
  { data: diaDoAno(22, 9), documento: "DARF-0922", historico: "Pagamento de DARF — IRRF", valor: -3418.27 },
);
// O que o sistema tem e o banco ainda não: cheques emitidos no fim do mês e o depósito da última sexta.
const pendentes: LancamentoBanco[] = [
  { data: diaDoAno(26, 9), documento: `CHQ-000${chq++}`, historico: "Cheque — Kappa Materiais", valor: -2875.4 },
  { data: diaDoAno(29, 9), documento: `CHQ-000${chq++}`, historico: "Cheque — Sigma Logística", valor: -1190 },
  { data: diaDoAno(30, 9), documento: `CHQ-000${chq++}`, historico: "Cheque — Gama Papéis", valor: -648.35 },
  { data: diaDoAno(30, 9), documento: "DEP-314", historico: "Depósito em dinheiro — caixa da loja", valor: 3260 },
];
// O que o banco tem e ninguém lançou no sistema.
export const SO_NO_EXTRATO: LancamentoBanco[] = [
  { data: diaDoAno(1, 9), documento: "TAR-0901", historico: "Tarifa do pacote de serviços", valor: -89.9 },
  { data: diaDoAno(12, 9), documento: "DEB-7731", historico: "Débito automático — energia elétrica", valor: -3102.58 },
  { data: diaDoAno(18, 9), documento: `PIX-${pix++}`, historico: "PIX recebido — remetente não identificado", valor: 650 },
  { data: diaDoAno(25, 9), documento: "TAR-0925", historico: "Tarifa de emissão de boletos", valor: -46.8 },
  { data: diaDoAno(30, 9), documento: "IOF-0930", historico: "IOF sobre saldo devedor", valor: -12.47 },
  { data: diaDoAno(30, 9), documento: "REN-0930", historico: "Rendimento da aplicação automática", valor: 23.18 },
];
/** Troca dois algarismos vizinhos da parte inteira: o erro de digitação mais comum no lançamento manual. */
function trocarAlgarismos(v: number) {
  const s = Math.abs(v).toFixed(2);
  const [inteira, centavos] = s.split(".");
  const i = inteira.length >= 3 ? 1 : 0;
  const trocada = inteira.slice(0, i) + inteira[i + 1] + inteira[i] + inteira.slice(i + 2);
  return Math.sign(v) * Number(`${trocada}.${centavos}`);
}

const ordem = (a: LancamentoBanco, b: LancamentoBanco) => a.data - b.data;
const reaisOrdenados = reais.sort(ordem);
const comDiferenca = new Set([reaisOrdenados[9].documento, reaisOrdenados[27].documento, reaisOrdenados[44].documento]);
const duplicados = [reaisOrdenados[15], reaisOrdenados[38]];

/** Razão do banco no sistema (o que a empresa lançou). */
export const RAZAO: LancamentoBanco[] = [
  ...reaisOrdenados.map((l) => (comDiferenca.has(l.documento) ? { ...l, valor: trocarAlgarismos(l.valor) } : l)),
  ...pendentes,
  ...duplicados.map((l) => ({ ...l, data: l.data + 1 })),
].sort(ordem);

/** Extrato do banco (o que de fato passou na conta). Cheque aparece no dia em que compensou. */
export const EXTRATO: LancamentoBanco[] = [
  ...reaisOrdenados.map((l) => (l.documento.startsWith("CHQ") ? { ...l, data: Math.min(l.data + inteiro(rc, 1, 3), diaDoAno(30, 9)) } : l)),
  ...SO_NO_EXTRATO,
].sort(ordem);

const somar = (l: LancamentoBanco[]) => l.reduce((s, x) => s + x.valor, 0);

export const CONCILIACAO = (() => {
  const vistos = new Set<string>();
  const razao = RAZAO.map((l) => {
    const repetido = vistos.has(l.documento);
    vistos.add(l.documento);
    const noBanco = EXTRATO.find((e) => e.documento === l.documento);
    const situacao = repetido ? "DUPLICADO NO SISTEMA" : !noBanco ? "PENDENTE" : Math.abs(noBanco.valor - l.valor) > 0.005 ? "DIFERENÇA DE VALOR" : "CONCILIADO";
    return { ...l, situacao };
  });
  const primeiro = (doc: string) => RAZAO.find((l) => l.documento === doc);
  const extrato = EXTRATO.map((l) => {
    const r = primeiro(l.documento);
    const situacao = !r ? "NÃO LANÇADO NO SISTEMA" : Math.abs(r.valor - l.valor) > 0.005 ? "DIFERENÇA DE VALOR" : "CONCILIADO";
    return { ...l, situacao, valorSistema: r?.valor ?? 0 };
  });
  const saldoExtrato = SALDO_INICIAL_SETEMBRO + somar(EXTRATO);
  const saldoSistema = SALDO_INICIAL_SETEMBRO + somar(RAZAO);
  const pend = razao.filter((l) => l.situacao === "PENDENTE");
  const dup = razao.filter((l) => l.situacao === "DUPLICADO NO SISTEMA");
  const naoLancados = extrato.filter((l) => l.situacao === "NÃO LANÇADO NO SISTEMA");
  const diferencas = extrato.filter((l) => l.situacao === "DIFERENÇA DE VALOR");
  const saldoAjustado = saldoExtrato + somar(pend);
  const ajustadoSistema = saldoSistema + somar(naoLancados) + diferencas.reduce((s, l) => s + l.valor - l.valorSistema, 0) - somar(dup);
  if (Math.abs(saldoAjustado - ajustadoSistema) > 0.005) throw new Error("conciliação de setembro não fecha");
  return { razao, extrato, saldoExtrato, saldoSistema, pend, dup, naoLancados, diferencas, saldoAjustado };
})();
