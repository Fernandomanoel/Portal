import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { CLIENTES, dataBR, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(2707);
const SAIDAS = Array.from({ length: 28 }, (_, i) => {
  const interestadual = r() < 0.3;
  const cfop = interestadual ? 6102 : 5102;
  const valor = inteiro(r, 15, 240) * 100;
  const aliquota = interestadual ? 12 : 18;
  return [dataBR(inteiro(r, 1, 30), 8), `NF-e ${1201 + i}`, sortear(r, CLIENTES), cfop, valor, aliquota, (valor * aliquota) / 100];
});
const por = (cfop: number, col: number) => somar(SAIDAS.filter((l) => l[3] === cfop).map((l) => l[col] as number));
const TOTAL = somar(SAIDAS.map((l) => l[4] as number));

const ITENS = [
  ["Cadeira de escritório", 12, 389.9, 5],
  ["Mesa em L", 6, 799, 8],
  ["Gaveteiro", 10, 245.5, 0],
  ["Armário alto", 4, 1120, 10],
  ["Suporte para monitor", 25, 89.9, 0],
];
const linhaTotal = (l: (string | number)[]) => (l[1] as number) * (l[2] as number) * (1 - (l[3] as number) / 100);
const PRODUTOS = somar(ITENS.map(linhaTotal));
const FRETE = 480;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Habilitando e Emitindo NF-e e Escrituração dos Livros Fiscais",
  introducao:
    "Um dia de trabalho com a nota fiscal eletrônica: montar o total de uma NF-e de venda com descontos e frete e escriturar o Livro de Registro de Saídas, conferindo os totais por CFOP. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O primeiro mês de uma loja que passou a emitir NF-e",
      remetente: "Ana Beatriz Cunha, contadora",
      assunto: "Habilitação, emissão e escrituração — Móveis Planalto",
      paragrafos: [
        "A Móveis Planalto acaba de ser habilitada para emitir NF-e. Em agosto ela emitiu 28 notas de venda, e agora é preciso escriturar o Livro de Registro de Saídas, que reúne data, documento, CFOP, valor contábil, base de cálculo e ICMS de cada nota. O CFOP identifica a natureza da operação: 5.102 é venda de mercadoria adquirida de terceiros dentro do estado, e 6.102 é a mesma venda para outro estado.",
        "Também há uma nota ainda sendo preparada: um pedido de cinco itens, com desconto por item e frete, que o vendedor pediu para emitir hoje. Você precisa fechar o total antes de a nota ir ao ambiente de autorização.",
      ],
      entregas: [
        "O total da NF-e do pedido, item a item (etapa 2).",
        "O Livro de Registro de Saídas resumido por CFOP, com ICMS (etapa 3).",
        "O roteiro por escrito do que conferir antes de emitir e do que fazer em caso de erro (etapa 4).",
      ],
    }),
    planilha({
      id: "pedido-nfe",
      titulo: "Etapa 2 — Planilha: os itens do pedido a faturar",
      cenario: "Cole a planilha no Excel. Total do item = quantidade × valor unitário × (1 − desconto). O frete de R$ 480,00 é destacado em campo próprio da NF-e e entra no total da nota.",
      colunas: ["Produto", "Quantidade", "Valor unitário (R$)", "Desconto (%)"],
      linhas: ITENS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "cadeiras", rotulo: "Total do item «Cadeira de escritório» (R$)", valor: linhaTotal(ITENS[0]), explicacao: "12 × 389,90 × (1 − 5%)." },
        { id: "mesas", rotulo: "Total do item «Mesa em L» (R$)", valor: linhaTotal(ITENS[1]), explicacao: "6 × 799 × (1 − 8%)." },
        { id: "produtos", rotulo: "Valor total dos produtos (R$)", valor: PRODUTOS, explicacao: "Soma dos cinco itens, já com desconto." },
        { id: "nota", rotulo: "Valor total da nota com frete (R$)", valor: PRODUTOS + FRETE, explicacao: "Total dos produtos + R$ 480,00 de frete." },
        { id: "icms", rotulo: "ICMS destacado se a alíquota for 18% sobre os produtos (R$)", valor: (PRODUTOS * 18) / 100, explicacao: "Total dos produtos × 18%." },
        { id: "descontos", rotulo: "Total de descontos concedidos (R$)", valor: somar(ITENS.map((l) => (l[1] as number) * (l[2] as number))) - PRODUTOS, explicacao: "Valor sem desconto menos valor com desconto." },
      ],
    }),
    planilha({
      id: "livro-de-saidas",
      titulo: "Etapa 3 — Planilha: Livro de Registro de Saídas de agosto",
      cenario: "Cole a planilha no Excel e use SOMASE por CFOP para resumir o livro.",
      colunas: ["Data", "Documento", "Destinatário", "CFOP", "Valor contábil (R$)", "Alíquota ICMS (%)", "ICMS (R$)"],
      linhas: SAIDAS,
      instrucao: "Resuma o livro:",
      tarefas: [
        { id: "total", rotulo: "Valor contábil total das saídas (R$)", valor: TOTAL, explicacao: "Soma da coluna Valor contábil." },
        { id: "interno", rotulo: "Valor das saídas dentro do estado, CFOP 5.102 (R$)", valor: por(5102, 4), explicacao: "Soma das linhas com CFOP 5102." },
        { id: "inter", rotulo: "Valor das saídas para outro estado, CFOP 6.102 (R$)", valor: por(6102, 4), explicacao: "Soma das linhas com CFOP 6102." },
        { id: "icms-interno", rotulo: "ICMS das saídas internas (R$)", valor: por(5102, 6), explicacao: "ICMS das linhas 5102 (18%)." },
        { id: "icms-inter", rotulo: "ICMS das saídas interestaduais (R$)", valor: por(6102, 6), explicacao: "ICMS das linhas 6102 (12%)." },
        { id: "icms-total", rotulo: "ICMS total debitado no mês (R$)", valor: por(5102, 6) + por(6102, 6), explicacao: "Soma do ICMS das duas operações." },
        { id: "qtd-inter", rotulo: "Quantidade de notas interestaduais", valor: SAIDAS.filter((l) => l[3] === 6102).length, explicacao: "Conte as linhas com CFOP 6102.", tolerancia: 0 },
      ],
    }),
    calculos({
      id: "conferencia-final",
      titulo: "Etapa 4 — Conferência cruzada",
      cenario: "Antes de assinar o livro, a contadora pede uma conferência cruzada dos números.",
      instrucao: "Calcule:",
      campos: [
        { id: "participacao", rotulo: "Participação das saídas interestaduais no valor total (%)", esperado: (por(6102, 4) / TOTAL) * 100, explicacao: "Valor 6102 ÷ valor total × 100." },
        { id: "aliquota-efetiva", rotulo: "Alíquota efetiva de ICMS sobre o total das saídas (%)", esperado: ((por(5102, 6) + por(6102, 6)) / TOTAL) * 100, explicacao: "ICMS total ÷ valor contábil total × 100." },
      ],
    }),
    dissertativa({
      id: "roteiro-de-emissao",
      titulo: "Etapa 5 — Roteiro de emissão e escrituração",
      instrucao: "Escreva o procedimento que o setor fiscal da Móveis Planalto deve seguir.",
      deve: [
        "Liste o que conferir na NF-e antes de transmitir (destinatário, CFOP, alíquotas, descontos, frete, totais).",
        "Explique o que fazer se a nota for rejeitada pela SEFAZ e quando é possível cancelar ou emitir carta de correção.",
        "Diga por que cada nota deve ser escriturada no livro com o CFOP correto e qual o risco de errar o CFOP.",
        "Descreva como você guardaria os XML das notas e por quanto tempo.",
      ],
      chave: /(cfop|sefaz|rejei|cancel|corre[cç][aã]o|escritur|livro|xml|guarda|al[ií]quota)/i,
      minPalavras: 60,
    }),
  ],
};

export default atividade;
