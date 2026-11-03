/**
 * Dados das atividades de contabilidade (plano de contas, lançamentos e Simples Nacional).
 * Uma fonte só: as planilhas de public/atividades/contabilidade/ são geradas daqui por
 * `npm run planilhas` e as atividades corrigem exatamente estes números.
 *
 * O plano de contas e a história da Walking Pet vêm da planilha das aulas 13 a 16
 * (Escrita Fiscal e Contabilidade).
 */

export type TipoConta = "S" | "A";

/** [código, nome, S = sintética (agrupa) | A = analítica (recebe lançamento)]. */
export const PLANO: [string, string, TipoConta][] = [
  ["1", "ATIVO", "S"],
  ["1.1", "ATIVO CIRCULANTE", "S"],
  ["1.1.1", "Caixa, bancos e equivalentes", "S"],
  ["1.1.1.01", "Caixa", "A"],
  ["1.1.1.02", "Contas bancárias", "A"],
  ["1.1.1.03", "Contas de movimento", "A"],
  ["1.1.2", "Contas a receber", "S"],
  ["1.1.2.01", "Clientes", "A"],
  ["1.1.2.02", "(–) Duplicatas descontadas", "A"],
  ["1.1.2.03", "(–) Perdas previstas com créditos de liquidação incerta", "A"],
  ["1.1.3", "Estoques", "S"],
  ["1.1.3.01", "Insumos", "A"],
  ["1.1.3.02", "Produtos acabados", "A"],
  ["1.1.4", "Outros créditos", "S"],
  ["1.1.4.01", "Títulos a receber", "A"],
  ["1.1.4.02", "Impostos a recuperar", "A"],
  ["1.1.4.03", "Outros valores a receber", "A"],
  ["1.2", "ATIVO NÃO CIRCULANTE", "S"],
  ["1.2.1", "Realizável a longo prazo", "S"],
  ["1.2.1.01", "Contas a receber a longo prazo", "A"],
  ["1.2.1.02", "(–) Perdas previstas com créditos de liquidação incerta", "A"],
  ["1.2.2", "Investimentos", "S"],
  ["1.2.2.01", "Participações societárias", "A"],
  ["1.2.2.02", "Outros investimentos", "A"],
  ["1.2.3", "Imobilizado", "S"],
  ["1.2.3.01", "Imóveis urbanos", "A"],
  ["1.2.3.02", "Imóveis territoriais", "A"],
  ["1.2.3.03", "Máquinas e equipamentos", "A"],
  ["1.2.3.04", "Veículos automotivos", "A"],
  ["1.2.3.05", "Móveis e utensílios", "A"],
  ["1.2.3.06", "(–) Depreciação acumulada", "A"],
  ["1.2.4", "Intangível", "S"],
  ["1.2.4.01", "Softwares", "A"],
  ["1.2.4.02", "(–) Amortização acumulada", "A"],
  ["2", "PASSIVO E PATRIMÔNIO LÍQUIDO", "S"],
  ["2.1", "PASSIVO CIRCULANTE", "S"],
  ["2.1.1", "Fornecedores", "S"],
  ["2.1.1.01", "Fornecedores nacionais", "A"],
  ["2.1.1.02", "Fornecedores estrangeiros", "A"],
  ["2.1.1.03", "Outros tipos de fornecedores", "A"],
  ["2.1.2", "Financiamentos e empréstimos", "S"],
  ["2.1.2.01", "Financiamentos", "A"],
  ["2.1.2.02", "Empréstimos", "A"],
  ["2.1.3", "Obrigações fiscais", "S"],
  ["2.1.3.01", "Impostos federais", "A"],
  ["2.1.3.02", "ICMS", "A"],
  ["2.1.3.03", "ISS", "A"],
  ["2.1.4", "Obrigações trabalhistas, sociais e previdenciárias", "S"],
  ["2.1.4.01", "Salários a pagar", "A"],
  ["2.1.4.02", "FGTS a recolher", "A"],
  ["2.1.4.03", "INSS a recolher", "A"],
  ["2.1.4.04", "Benefícios a pagar", "A"],
  ["2.1.5", "Contas a pagar", "S"],
  ["2.1.5.01", "Telefonia e Internet", "A"],
  ["2.1.5.02", "Energia elétrica", "A"],
  ["2.1.5.03", "Aluguéis", "A"],
  ["2.1.5.04", "Taxas condominiais", "A"],
  ["2.1.5.05", "Combustíveis", "A"],
  ["2.1.5.06", "Alimentação e hospedagens", "A"],
  ["2.1.5.07", "Outras contas a pagar", "A"],
  ["2.1.6", "Provisionamentos", "S"],
  ["2.1.6.01", "Provisão de férias", "A"],
  ["2.1.6.02", "Provisão de décimos terceiros salários", "A"],
  ["2.1.6.03", "Provisão de encargos sobre férias e décimos terceiros salários", "A"],
  ["2.2", "PASSIVO NÃO CIRCULANTE", "S"],
  ["2.2.1", "Financiamentos e empréstimos", "S"],
  ["2.2.1.01", "Financiamentos", "A"],
  ["2.2.1.02", "Empréstimos bancários", "A"],
  ["2.2.2", "Outros tipos de financiamentos e empréstimos", "S"],
  ["2.2.2.01", "Empréstimos de sócios", "A"],
  ["2.3", "PATRIMÔNIO LÍQUIDO", "S"],
  ["2.3.1", "Capital social", "S"],
  ["2.3.1.01", "Capital social integralizado", "A"],
  ["2.3.1.02", "(–) Capital social a integralizar", "A"],
  ["2.3.2", "Reservas", "S"],
  ["2.3.2.01", "Reservas de capital", "A"],
  ["2.3.3", "Reservas de lucros", "S"],
  ["2.3.3.01", "Lucros acumulados", "A"],
  ["2.3.3.02", "(–) Prejuízos acumulados", "A"],
  ["3", "RESULTADO DAS RECEITAS, CUSTOS E DESPESAS", "S"],
  ["3.1", "RECEITAS", "S"],
  ["3.1.1", "Receitas operacionais", "S"],
  ["3.1.1.01", "Venda de mercadorias", "A"],
  ["3.1.1.02", "Venda de prestações de serviços", "A"],
  ["3.1.1.03", "(–) Deduções de tributos, descontos e devoluções", "A"],
  ["3.1.2", "Receitas financeiras", "S"],
  ["3.1.2.01", "Receitas com aplicações financeiras", "A"],
  ["3.1.2.02", "Receitas com juros ativos", "A"],
  ["3.1.3", "Outras receitas", "S"],
  ["3.1.3.01", "Receitas com venda de ativos imobilizados", "A"],
  ["3.1.3.02", "Receitas com venda de investimentos", "A"],
  ["3.1.3.03", "Receitas com outros tipos de transação", "A"],
  ["3.2", "CUSTOS E DESPESAS", "S"],
  ["3.2.1", "Custos dos produtos e serviços vendidos", "S"],
  ["3.2.1.01", "Custos dos insumos/produtos", "A"],
  ["3.2.1.02", "Custos da mão de obra", "A"],
  ["3.2.1.03", "Outros custos", "A"],
  ["3.2.2", "Despesas operacionais", "S"],
  ["3.2.2.01", "Despesas administrativas", "A"],
  ["3.2.2.02", "Despesas com vendas", "A"],
  ["3.2.2.03", "Despesas com impostos e encargos", "A"],
  ["3.2.3", "Despesas financeiras", "S"],
  ["3.2.3.01", "Despesas com juros passivos", "A"],
  ["3.2.3.02", "Outros tipos de despesa financeira (tarifas, etc)", "A"],
  ["3.2.4", "Outras despesas operacionais e não-operacionais", "S"],
  ["3.2.4.01", "Despesas com baixa de ativos imobilizados", "A"],
  ["3.2.4.02", "Despesas com baixa de investimentos", "A"],
  ["3.2.4.03", "Outros tipos de despesa não-operacional", "A"],
];

export const nomeDaConta = (codigo: string) => PLANO.find(([c]) => c === codigo)?.[1] ?? codigo;

/** Natureza do saldo: Ativo e despesas crescem a débito; Passivo, PL e receitas, a crédito. */
export const saldoDevedor = (codigo: string) => codigo.startsWith("1") || codigo.startsWith("3.2");

export interface Lancamento {
  texto: string;
  valor: number;
  debito: string;
  credito: string;
}

const arredondar = (n: number) => Math.round(n * 100) / 100;

/** Saldo de cada conta analítica depois dos lançamentos, no sinal da natureza da conta. */
export function saldos(lancamentos: Lancamento[]): Record<string, number> {
  const s: Record<string, number> = {};
  for (const [cod, , tipo] of PLANO) if (tipo === "A") s[cod] = 0;
  for (const l of lancamentos) {
    s[l.debito] += saldoDevedor(l.debito) ? l.valor : -l.valor;
    s[l.credito] += saldoDevedor(l.credito) ? -l.valor : l.valor;
  }
  for (const c of Object.keys(s)) s[c] = arredondar(s[c]);
  return s;
}

/** Soma das contas analíticas sob um código (ex.: "1" = Ativo, "3.1" = Receitas). */
export function total(lancamentos: Lancamento[], prefixo: string): number {
  const s = saldos(lancamentos);
  return arredondar(Object.entries(s).filter(([c]) => c === prefixo || c.startsWith(prefixo + ".")).reduce((a, [, v]) => a + v, 0));
}

export interface Fechamento {
  ativo: number;
  passivo: number;
  patrimonio: number;
  resultado: number;
}

/** Os três totais que a planilha mostra e a equação contábil: Ativo = Passivo + PL + Resultado. */
export function fechamento(lancamentos: Lancamento[]): Fechamento {
  return {
    ativo: total(lancamentos, "1"),
    passivo: total(lancamentos, "2.1") + total(lancamentos, "2.2"),
    patrimonio: total(lancamentos, "2.3"),
    resultado: arredondar(total(lancamentos, "3.1") - total(lancamentos, "3.2")),
  };
}

/** Saldo de toda conta do plano (sintética ou analítica), mais a chave `resultado` (receitas − custos e despesas). */
export function totaisPorConta(lancamentos: Lancamento[]): Record<string, number> {
  const t: Record<string, number> = {};
  for (const [cod] of PLANO) t[cod] = total(lancamentos, cod);
  t.resultado = fechamento(lancamentos).resultado;
  return t;
}

/* ---------- Aula 14: compra e venda dos kits beleza ---------- */

export const AULA_14: Lancamento[] = [
  { texto: "A Walking Pet adquiriu 100 kits beleza por R$ 30,00 cada um, a pagar este valor no próximo mês", valor: 3000, debito: "1.1.3.02", credito: "2.1.1.01" },
  { texto: "Foi efetuada a venda de um kit beleza por R$ 50,00 com recebimento à vista em depósito na conta bancária da Walking Pet", valor: 50, debito: "1.1.1.02", credito: "3.1.1.01" },
  { texto: "O kit beleza vendido foi entregue ao cliente, reduzindo o estoque da Walking Pet em um kit que havia custado R$ 30,00", valor: 30, debito: "3.2.1.01", credito: "1.1.3.02" },
  { texto: "Outro kit beleza foi vendido pelo mesmo preço, porém com recebimento futuro, pois o cliente pagou em cartão de crédito", valor: 50, debito: "1.1.2.01", credito: "3.1.1.01" },
  { texto: "O kit beleza vendido foi entregue ao cliente, reduzindo o estoque da Walking Pet em um kit que havia custado R$ 30,00", valor: 30, debito: "3.2.1.01", credito: "1.1.3.02" },
  { texto: "Uma tarifa de 1% sobre o valor desta última venda foi debitada automaticamente da conta bancária da Walking Pet", valor: 0.5, debito: "3.2.3.02", credito: "1.1.1.02" },
  { texto: "Chegou o dia em que, finalmente, o valor dessa última venda foi \"creditado\" na conta bancária da Walking Pet", valor: 50, debito: "1.1.1.02", credito: "1.1.2.01" },
];

/* ---------- Aula 15: imposto, fornecedor, cheque especial e a venda grande ---------- */

export const AULA_15: Lancamento[] = [
  { texto: "Lembra da venda dos dois kits beleza? No dia seguinte o sistema gerou o ICMS a pagar, à alíquota de 18%, sobre os R$ 100,00 vendidos", valor: 18, debito: "3.1.1.03", credito: "2.1.3.02" },
  { texto: "Chegou o dia de pagar o fornecedor dos kits beleza. Baixe essa dívida da conta Fornecedores nacionais e registre a saída na conta bancária", valor: 3000, debito: "2.1.1.01", credito: "1.1.1.02" },
  { texto: "Como ficou o saldo da conta bancária? Negativo! Sorte que a Walking Pet tem cheque especial. Registre o valor usado como empréstimo bancário", valor: 2900.5, debito: "1.1.1.02", credito: "2.1.2.02" },
  { texto: "Alguns dias mais tarde, a Walking Pet vendeu 80 kits de uma só vez, à vista, por R$ 45,00 cada, depositados na conta bancária", valor: 3600, debito: "1.1.1.02", credito: "3.1.1.01" },
  { texto: "Contabilize a baixa dos 80 kits vendidos no estoque. Lembra do custo de cada um? Consulte a Aula 14", valor: 2400, debito: "3.2.1.01", credito: "1.1.3.02" },
  { texto: "Os 80 kits geraram um ICMS a pagar de 7%, pois o comprador era de outro estado. Lance esse imposto a pagar", valor: 252, debito: "3.1.1.03", credito: "2.1.3.02" },
  { texto: "A venda tirou a Walking Pet do cheque especial? Então liquide o empréstimo, saindo da conta bancária", valor: 2900.5, debito: "2.1.2.02", credito: "1.1.1.02" },
  { texto: "Mas a permanência no cheque especial gerou juros de R$ 25,60. Contabilize este pagamento", valor: 25.6, debito: "3.2.3.01", credito: "1.1.1.02" },
  { texto: "Vamos pagar o ICMS acumulado (18 + 252)? Baixe a dívida do Passivo e movimente a conta bancária", valor: 270, debito: "2.1.3.02", credito: "1.1.1.02" },
];

export const AULA_15_COMPLETA = [...AULA_14, ...AULA_15];

/* ---------- Aula 16: uma empresa nova, do zero ---------- */

export const AULA_16: Lancamento[] = [
  { texto: "Os sócios da nova unidade de banho e tosa integralizaram R$ 20.000,00 de capital, depositados na conta bancária", valor: 20000, debito: "1.1.1.02", credito: "2.3.1.01" },
  { texto: "Compra de máquinas e equipamentos (banheira e secador) por R$ 6.500,00, pagos da conta bancária", valor: 6500, debito: "1.2.3.03", credito: "1.1.1.02" },
  { texto: "Compra de insumos (shampoos e condicionadores) por R$ 1.200,00, a pagar a um fornecedor nacional", valor: 1200, debito: "1.1.3.01", credito: "2.1.1.01" },
  { texto: "Prestação de serviços do mês: R$ 6.000,00 recebidos à vista, em depósito bancário", valor: 6000, debito: "1.1.1.02", credito: "3.1.1.02" },
  { texto: "Prestação de serviços do mês: R$ 3.800,00 pagos em cartão de crédito, para receber depois", valor: 3800, debito: "1.1.2.01", credito: "3.1.1.02" },
  { texto: "Consumo de insumos no mês: R$ 900,00 saíram do estoque para os banhos realizados", valor: 900, debito: "3.2.1.01", credito: "1.1.3.01" },
  { texto: "Pagamento do aluguel do mês, R$ 1.800,00, debitado da conta bancária", valor: 1800, debito: "3.2.2.01", credito: "1.1.1.02" },
  { texto: "Salários do mês, R$ 3.000,00, apropriados como custo e ainda a pagar", valor: 3000, debito: "3.2.1.02", credito: "2.1.4.01" },
  { texto: "ISS de 5% sobre os R$ 9.800,00 de serviços, a recolher à prefeitura", valor: 490, debito: "3.1.1.03", credito: "2.1.3.03" },
  { texto: "Pagamento dos salários da folha, saindo da conta bancária", valor: 3000, debito: "2.1.4.01", credito: "1.1.1.02" },
  { texto: "O cartão de crédito pagou: os R$ 3.800,00 foram creditados na conta bancária", valor: 3800, debito: "1.1.1.02", credito: "1.1.2.01" },
  { texto: "A operadora do cartão debitou R$ 76,00 de tarifa (2% de R$ 3.800,00) da conta bancária", valor: 76, debito: "3.2.3.02", credito: "1.1.1.02" },
  { texto: "Pagamento do fornecedor dos insumos, R$ 1.200,00, pela conta bancária", valor: 1200, debito: "2.1.1.01", credito: "1.1.1.02" },
];

/* ---------- Simples Nacional: alíquota efetiva (Anexos I, II e III da LC 123/2006) ---------- */

export interface FaixaSimples {
  ate: number;
  aliquota: number;
  deduzir: number;
}

export const ANEXOS_SIMPLES: { id: "I" | "II" | "III"; nome: string; faixas: FaixaSimples[] }[] = [
  {
    id: "I",
    nome: "Comércio",
    faixas: [
      { ate: 180000, aliquota: 4, deduzir: 0 },
      { ate: 360000, aliquota: 7.3, deduzir: 5940 },
      { ate: 720000, aliquota: 9.5, deduzir: 13860 },
      { ate: 1800000, aliquota: 10.7, deduzir: 22500 },
      { ate: 3600000, aliquota: 14.3, deduzir: 87300 },
      { ate: 4800000, aliquota: 19, deduzir: 378000 },
    ],
  },
  {
    id: "II",
    nome: "Indústria",
    faixas: [
      { ate: 180000, aliquota: 4.5, deduzir: 0 },
      { ate: 360000, aliquota: 7.8, deduzir: 5940 },
      { ate: 720000, aliquota: 10, deduzir: 13860 },
      { ate: 1800000, aliquota: 11.2, deduzir: 22500 },
      { ate: 3600000, aliquota: 14.7, deduzir: 85500 },
      { ate: 4800000, aliquota: 30, deduzir: 720000 },
    ],
  },
  {
    id: "III",
    nome: "Serviços",
    faixas: [
      { ate: 180000, aliquota: 6, deduzir: 0 },
      { ate: 360000, aliquota: 11.2, deduzir: 9360 },
      { ate: 720000, aliquota: 13.5, deduzir: 17640 },
      { ate: 1800000, aliquota: 16, deduzir: 35640 },
      { ate: 3600000, aliquota: 21, deduzir: 125640 },
      { ate: 4800000, aliquota: 33, deduzir: 648000 },
    ],
  },
];

/** Receita bruta dos últimos 12 meses (RBT12) e do mês (RBM) da Walking Pet. */
export const SIMPLES_RBT12 = 540000;
export const SIMPLES_RBM = 52000;

export function aliquotaEfetiva(anexo: "I" | "II" | "III", rbt12: number) {
  const faixas = ANEXOS_SIMPLES.find((a) => a.id === anexo)!.faixas;
  const faixa = faixas.find((f) => rbt12 <= f.ate) ?? faixas[faixas.length - 1];
  return { faixa: faixas.indexOf(faixa) + 1, nominal: faixa.aliquota, deduzir: faixa.deduzir, efetiva: (rbt12 * (faixa.aliquota / 100) - faixa.deduzir) / rbt12 };
}

export const IMPOSTO_SIMPLES = (anexo: "I" | "II" | "III", rbt12 = SIMPLES_RBT12, rbm = SIMPLES_RBM) =>
  arredondar(rbm * aliquotaEfetiva(anexo, rbt12).efetiva);

/** Respostas das três linhas da planilha de Simples, na forma que as fórmulas conferem. */
export const ESPERADO_SIMPLES = (() => {
  const por = Object.fromEntries(
    (["I", "II", "III"] as const).map((id) => {
      const a = aliquotaEfetiva(id, SIMPLES_RBT12);
      return [id, { faixa: a.faixa, nominal: a.nominal / 100, deduzir: a.deduzir, efetiva: Math.round(a.efetiva * 1e6) / 1e6, imposto: IMPOSTO_SIMPLES(id) }];
    }),
  );
  const menor = (["I", "II", "III"] as const).reduce((m, id) => (por[id].imposto < por[m].imposto ? id : m), "I" as "I" | "II" | "III");
  return { ...por, menor: por[menor].imposto, menorAnexo: menor };
})();
