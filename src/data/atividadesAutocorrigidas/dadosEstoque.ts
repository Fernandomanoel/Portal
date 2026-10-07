import { dataBR, decimal, inteiro, sortear, sorteio } from "./dadosFicticios";

/**
 * Dados do almoxarifado fictício das atividades de planilha de estoque: o cadastro de 60 itens e
 * os lançamentos do mês, com os problemas que aparecem de verdade (código digitado errado,
 * documento lançado duas vezes, venda sem saldo, desconto acima da alçada).
 */

export const MINIMO_APROVACAO = 10; // desconto acima disso (em %) precisa de aprovação do gerente

const GRUPOS: Record<string, string[]> = {
  Papelaria: ["Papel A4 (resma)", "Caneta azul (cx 50)", "Grampeador de mesa", "Clips 2/0 (cx)", "Pasta suspensa (cx)", "Caderno 96 fls", "Marcador de texto (cx)", "Fita adesiva larga", "Envelope A4 (cx)", "Bloco de recado"],
  Limpeza: ["Detergente 5 L", "Desinfetante 2 L", "Água sanitária 5 L", "Saco de lixo 100 L (pct)", "Papel toalha (pct)", "Papel higiênico (fardo)", "Sabonete líquido 5 L", "Esponja multiuso (pct)", "Pano de chão", "Álcool 70% 1 L"],
  Copa: ["Café 500 g", "Açúcar 5 kg", "Copo descartável 200 ml (cx)", "Copo descartável 50 ml (cx)", "Filtro de papel (cx)", "Adoçante 100 ml", "Água mineral 20 L", "Chá de ervas (cx)", "Guardanapo (pct)", "Palito de dente (cx)"],
  Informática: ["Toner preto", "Cartucho colorido", "Mouse óptico", "Teclado USB", "Pen drive 32 GB", "Cabo de rede 2 m", "Filtro de linha", "Fone com microfone", "Mouse pad", "Cabo HDMI 2 m"],
  EPI: ["Luva de proteção (par)", "Máscara PFF2 (cx)", "Óculos de proteção", "Protetor auricular", "Capacete", "Bota de segurança (par)", "Colete refletivo", "Avental de PVC", "Luva nitrílica (cx)", "Touca descartável (pct)"],
  Manutenção: ["Lâmpada LED 9 W", "Fita isolante", "Disjuntor 20 A", "Fio 2,5 mm (rolo)", "Parafuso 6 mm (cx)", "Chave de fenda", "Alicate universal", "Trena 5 m", "Cola de contato", "Fechadura de gaveta"],
};

export interface ItemCadastro {
  codigo: string;
  descricao: string;
  grupo: string;
  unidade: string;
  saldoInicial: number;
  minimo: number;
  custo: number;
  preco: number;
}

const rc = sorteio(7101);
export const CADASTRO: ItemCadastro[] = Object.entries(GRUPOS).flatMap(([grupo, nomes], g) =>
  nomes.map((descricao, i) => {
    const custo = decimal(rc, grupo === "Informática" ? 18 : grupo === "EPI" ? 6 : 2.5, grupo === "Informática" ? 260 : grupo === "EPI" ? 95 : 48);
    return {
      codigo: `EST-${String(g * 10 + i + 1).padStart(3, "0")}`,
      descricao,
      grupo,
      unidade: sortear(rc, ["UN", "CX", "PCT", "UN"] as const),
      saldoInicial: inteiro(rc, 6, 140),
      minimo: inteiro(rc, 8, 45),
      custo,
      preco: Math.round(custo * decimal(rc, 1.3, 1.8, 3) * 100) / 100,
    };
  }),
);

export const porCodigo = (codigo: string) => CADASTRO.find((c) => c.codigo === codigo);

export type TipoMovimento = "Entrada" | "Saída" | "Baixa" | "Devolução";
export interface Movimento {
  data: string;
  documento: string;
  codigo: string;
  tipo: TipoMovimento;
  quantidade: number;
  desconto: number;
  custoNf: number | "";
  obs: string;
}

const dia = (m: Movimento) => Number(m.data.slice(0, 2));

/** Os 90 lançamentos de setembro, na ordem em que os documentos chegaram, com os erros de digitação e de processo. */
const rm = sorteio(7202);
const base: Movimento[] = [];
const novoDoc = (prefixo: string, n: number) => `${prefixo}-${n}`;
for (let i = 0; i < 82; i++) {
  const r = rm();
  const item = sortear(rm, CADASTRO);
  const d = inteiro(rm, 1, 29);
  if (r < 0.2) {
    base.push({ data: dataBR(d, 9), documento: novoDoc("NF", 4100 + i), codigo: item.codigo, tipo: "Entrada", quantidade: inteiro(rm, 10, 90), desconto: 0, custoNf: Math.round(item.custo * decimal(rm, 0.96, 1.12, 3) * 100) / 100, obs: "Recebimento" });
  } else if (r < 0.82) {
    base.push({ data: dataBR(d, 9), documento: novoDoc("REQ", 900 + i), codigo: item.codigo, tipo: "Saída", quantidade: inteiro(rm, 2, 24), desconto: sortear(rm, [0, 0, 0, 2, 3, 5, 5, 8, 12, 15, 18] as const), custoNf: "", obs: "Venda" });
  } else if (r < 0.93) {
    base.push({ data: dataBR(d, 9), documento: novoDoc("BX", 30 + i), codigo: item.codigo, tipo: "Baixa", quantidade: inteiro(rm, 1, 9), desconto: 0, custoNf: "", obs: sortear(rm, ["Avaria no transporte", "Vencido", "Perda na contagem"] as const) });
  } else {
    base.push({ data: dataBR(d, 9), documento: novoDoc("DV", 70 + i), codigo: item.codigo, tipo: "Devolução", quantidade: inteiro(rm, 1, 8), desconto: sortear(rm, [0, 5, 8] as const), custoNf: "", obs: "Devolução de cliente" });
  }
}
// Erros do dia a dia injetados de propósito: letra «O» no lugar do zero, código inexistente, documento lançado duas vezes.
const invalidos: Movimento[] = [
  { data: dataBR(6, 9), documento: "REQ-1201", codigo: "EST-O17", tipo: "Saída", quantidade: 5, desconto: 0, custoNf: "", obs: "Venda" },
  { data: dataBR(13, 9), documento: "NF-4260", codigo: "EST-1O5", tipo: "Entrada", quantidade: 30, desconto: 0, custoNf: 12.4, obs: "Recebimento" },
  { data: dataBR(21, 9), documento: "REQ-1218", codigo: "EST-071", tipo: "Saída", quantidade: 3, desconto: 0, custoNf: "", obs: "Venda" },
  { data: dataBR(27, 9), documento: "BX-118", codigo: "EST-0 44", tipo: "Baixa", quantidade: 2, desconto: 0, custoNf: "", obs: "Avaria no transporte" },
];
const duplicados: Movimento[] = [base[11], base[37], base[58]].map((m) => ({ ...m }));
export const MOVIMENTOS: Movimento[] = [...base, ...invalidos, ...duplicados]
  .map((m, i) => ({ m, i }))
  .sort((a, b) => dia(a.m) - dia(b.m) || a.i - b.i)
  .map(({ m }) => m);

export type Situacao = "OK" | "CÓDIGO INVÁLIDO" | "DUPLICADO" | "SEM SALDO";

export interface Lancamento extends Movimento {
  situacao: Situacao;
  aprovar: boolean;
  valor: number; // + receita líquida de venda, − estorno de devolução; entradas e baixas ficam em 0
  descontoReais: number;
  perda: number;
  compra: number;
}

export interface Resultado {
  lancamentos: Lancamento[];
  saldoFinal: Map<string, number>;
}

/** Processa os lançamentos em ordem, com as regras do almoxarifado (briefing da atividade). */
export function processar(movimentos: Movimento[]): Resultado {
  const saldo = new Map(CADASTRO.map((c) => [c.codigo, c.saldoInicial]));
  const vistos = new Set<string>();
  const lancamentos: Lancamento[] = [];
  for (const m of movimentos) {
    const item = porCodigo(m.codigo);
    const base: Lancamento = { ...m, situacao: "OK", aprovar: false, valor: 0, descontoReais: 0, perda: 0, compra: 0 };
    const chave = `${m.documento}|${m.codigo}|${m.tipo}`;
    if (!item) base.situacao = "CÓDIGO INVÁLIDO";
    else if (vistos.has(chave)) base.situacao = "DUPLICADO";
    else {
      vistos.add(chave);
      const atual = saldo.get(item.codigo) ?? 0;
      if (m.tipo === "Entrada") {
        saldo.set(item.codigo, atual + m.quantidade);
        base.compra = m.quantidade * (m.custoNf === "" ? item.custo : m.custoNf);
      } else if (m.tipo === "Devolução") {
        saldo.set(item.codigo, atual + m.quantidade);
        base.valor = -(m.quantidade * item.preco * (1 - m.desconto / 100));
      } else if (m.quantidade > atual) base.situacao = "SEM SALDO";
      else {
        saldo.set(item.codigo, atual - m.quantidade);
        if (m.tipo === "Saída") {
          const bruto = m.quantidade * item.preco;
          base.descontoReais = (bruto * m.desconto) / 100;
          base.valor = bruto - base.descontoReais;
          base.aprovar = m.desconto > MINIMO_APROVACAO;
        } else base.perda = m.quantidade * item.custo;
      }
    }
    lancamentos.push(base);
  }
  return { lancamentos, saldoFinal: saldo };
}

export const RESULTADO = processar(MOVIMENTOS);
