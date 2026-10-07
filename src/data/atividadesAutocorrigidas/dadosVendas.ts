import { CLIENTES, dataBR, decimal, inteiro, sortear, sorteio } from "./dadosFicticios";

/**
 * Dados comerciais fictícios das atividades de planilha de Vendas: tabela de preços com alçada de
 * desconto por categoria, seis vendedores com meta, os pedidos de agosto (para configurar a planilha)
 * e os de setembro (para lançar), com o que aparece de verdade: código de produto digitado errado,
 * item lançado duas vezes, pedido cancelado e desconto acima da alçada com e sem aprovação do gerente.
 */

export const DESCONTO_MAXIMO: Record<string, number> = { Papelaria: 10, Limpeza: 8, Informática: 5, "Móveis de escritório": 12 };

const NOMES: Record<string, string[]> = {
  Papelaria: ["Papel A4 (caixa 10 resmas)", "Caneta esferográfica (cx 50)", "Pasta suspensa (cx 50)", "Caderno universitário (pct 10)", "Marcador de texto (cx 12)", "Envelope A4 (cx 250)", "Etiqueta adesiva (cx 100 fls)", "Grampeador de mesa", "Clips 2/0 (cx 10)", "Bloco de recado (pct 12)"],
  Limpeza: ["Detergente 5 L", "Desinfetante 5 L", "Papel toalha (fardo)", "Papel higiênico (fardo 64)", "Saco de lixo 100 L (pct 100)", "Sabonete líquido 5 L", "Álcool 70% (cx 12 L)", "Luva de limpeza (cx 12 pares)", "Pano multiuso (rolo)", "Dispenser de papel toalha"],
  Informática: ["Monitor 24 pol.", "Teclado e mouse sem fio", "Webcam Full HD", "Headset USB", "SSD 480 GB", "Nobreak 1200 VA", "Roteador Wi-Fi", "Toner preto", "Cartucho colorido", "Hub USB 7 portas"],
  "Móveis de escritório": ["Cadeira giratória", "Mesa em L", "Armário 2 portas", "Gaveteiro volante", "Estante de aço", "Cadeira de visitante", "Mesa de reunião", "Apoio para os pés", "Quadro branco 120 cm", "Arquivo de aço 4 gavetas"],
};

const FAIXA_PRECO: Record<string, [number, number]> = { Papelaria: [18, 260], Limpeza: [22, 190], Informática: [85, 1450], "Móveis de escritório": [160, 1900] };

export interface Produto {
  codigo: string;
  descricao: string;
  categoria: string;
  preco: number;
  descontoMaximo: number;
}

const rp = sorteio(9501);
export const PRODUTOS: Produto[] = Object.entries(NOMES).flatMap(([categoria, nomes], c) =>
  nomes.map((descricao, i) => ({
    codigo: `PRD-${101 + c * 10 + i}`,
    descricao,
    categoria,
    preco: Math.round(decimal(rp, ...FAIXA_PRECO[categoria]) * 10) / 10,
    descontoMaximo: DESCONTO_MAXIMO[categoria],
  })),
);
export const porCodigoProduto = (c: string) => PRODUTOS.find((p) => p.codigo === c);

export interface Vendedor {
  codigo: string;
  nome: string;
  meta: number;
}

export const VENDEDORES: Vendedor[] = [
  { codigo: "V01", nome: "Aline Prado", meta: 40000 },
  { codigo: "V02", nome: "Bruno Teles", meta: 45000 },
  { codigo: "V03", nome: "Cíntia Moraes", meta: 60000 },
  { codigo: "V04", nome: "Douglas Leme", meta: 65000 },
  { codigo: "V05", nome: "Érica Sampaio", meta: 50000 },
  { codigo: "V06", nome: "Fábio Nogueira", meta: 70000 },
];

/** Comissão sobre o faturamento líquido, pela faixa de atingimento da meta. */
export function percentualComissao(atingimento: number) {
  if (atingimento >= 1) return 5;
  if (atingimento >= 0.8) return 3;
  return 2;
}

export interface ItemPedido {
  pedido: string;
  data: string;
  vendedor: string;
  cliente: string;
  codigo: string;
  quantidade: number;
  desconto: number;
  status: "Aprovado" | "Cancelado";
  obs: string;
}

function gerarPedidos(semente: number, mes: number, primeiro: number, quantidade: number): ItemPedido[] {
  const r = sorteio(semente);
  const itens: ItemPedido[] = [];
  for (let n = 0; n < quantidade; n++) {
    const pedido = `PV-${primeiro + n}`;
    const data = dataBR(inteiro(r, 1, 30), mes);
    const vendedor = sortear(r, VENDEDORES).codigo;
    const cliente = sortear(r, CLIENTES);
    const usados = new Set<string>();
    for (let k = inteiro(r, 1, 4); k > 0; k--) {
      const p = sortear(r, PRODUTOS);
      if (usados.has(p.codigo)) continue;
      usados.add(p.codigo);
      const desconto = sortear(r, [0, 0, 0, 0, 2, 3, 5, 5, 5, 8, 10, 12, 15] as const);
      const acima = desconto > p.descontoMaximo;
      itens.push({
        pedido, data, vendedor, cliente, codigo: p.codigo,
        quantidade: p.categoria === "Informática" || p.categoria === "Móveis de escritório" ? inteiro(r, 1, 8) : inteiro(r, 4, 40),
        desconto, status: "Aprovado",
        obs: acima && r() < 0.35 ? "Desconto aprovado pelo gerente" : "",
      });
    }
  }
  const dia = (i: ItemPedido) => Number(i.data.slice(0, 2));
  return itens.map((i, k) => ({ i, k })).sort((a, b) => dia(a.i) - dia(b.i) || a.k - b.k).map(({ i }) => i);
}

/** Agosto: pedidos limpos, para configurar a planilha (sem os erros de lançamento). */
export const PEDIDOS_AGOSTO = gerarPedidos(9602, 8, 2101, 46).map((i) => ({ ...i, obs: "" }));

const base = gerarPedidos(9703, 9, 2301, 48);
const cancelados = new Set([base[8].pedido, base[40].pedido, base[77].pedido]);
const comStatus = base.map((i) => (cancelados.has(i.pedido) ? { ...i, status: "Cancelado" as const, obs: "Cliente cancelou o pedido" } : i));
const validos = comStatus.filter((i) => i.status === "Aprovado");
const invalidos: ItemPedido[] = [
  { ...validos[5], codigo: "PRD-1O4", obs: "" },
  { ...validos[33], codigo: "PRD-150", obs: "" },
  { ...validos[61], codigo: "PRD 122", obs: "" },
];
const repetidos = [validos[18], validos[52]].map((i) => ({ ...i }));
const dia = (i: ItemPedido) => Number(i.data.slice(0, 2));

/** Setembro: o que veio do CRM e dos pedidos em papel, na ordem de chegada. */
export const PEDIDOS_SETEMBRO: ItemPedido[] = [...comStatus, ...invalidos, ...repetidos]
  .map((i, k) => ({ i, k }))
  .sort((a, b) => dia(a.i) - dia(b.i) || a.k - b.k)
  .map(({ i }) => i);

export type SituacaoItem = "OK" | "CÓDIGO INVÁLIDO" | "DUPLICADO" | "CANCELADO" | "BLOQUEADO";

export interface ItemProcessado extends ItemPedido {
  situacao: SituacaoItem;
  excecao: boolean; // acima da alçada, mas aprovado pelo gerente
  bruto: number;
  liquido: number;
}

export function processarPedidos(itens: ItemPedido[], regras = true) {
  const vistos = new Set<string>();
  const processados: ItemProcessado[] = itens.map((i) => {
    const p = porCodigoProduto(i.codigo);
    const bruto = p ? i.quantidade * p.preco : 0;
    const liquido = bruto * (1 - i.desconto / 100);
    const acima = !!p && i.desconto > p.descontoMaximo;
    const aprovado = /aprovado pelo gerente/i.test(i.obs);
    let situacao: SituacaoItem = "OK";
    const chave = `${i.pedido}|${i.codigo}`;
    if (!p) situacao = "CÓDIGO INVÁLIDO";
    else if (regras && vistos.has(chave)) situacao = "DUPLICADO";
    else {
      vistos.add(chave);
      if (i.status === "Cancelado") situacao = "CANCELADO";
      else if (acima && !aprovado) situacao = "BLOQUEADO";
    }
    return { ...i, situacao, excecao: situacao === "OK" && acima && aprovado, bruto, liquido };
  });
  const ok = processados.filter((i) => i.situacao === "OK");
  const resumo = VENDEDORES.map((v) => {
    const meus = ok.filter((i) => i.vendedor === v.codigo);
    const faturamento = meus.reduce((s, i) => s + i.liquido, 0);
    const atingimento = faturamento / v.meta;
    const percentual = percentualComissao(atingimento);
    return { vendedor: v, faturamento, atingimento, percentual, comissao: (faturamento * percentual) / 100, pedidos: new Set(meus.map((i) => i.pedido)).size };
  });
  return { processados, resumo };
}

export const VENDAS_AGOSTO = processarPedidos(PEDIDOS_AGOSTO);
export const VENDAS_SETEMBRO = processarPedidos(PEDIDOS_SETEMBRO);
