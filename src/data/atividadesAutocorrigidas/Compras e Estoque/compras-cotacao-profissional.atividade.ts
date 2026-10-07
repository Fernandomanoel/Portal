import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const ITENS = ["Papel A4 (resma)", "Toner preto", "Caneta azul (cx 50)", "Pasta suspensa (cx)", "Grampeador", "Clips (cx)", "Etiqueta adesiva", "Caderno 96 fls", "Marcador de texto (cx)", "Fita adesiva", "Envelope A4 (cx)", "Cartucho colorido"];
const r = sorteio(3404);
const MAPA = ITENS.map((nome) => {
  const base = decimal(r, 6, 210);
  return [nome, inteiro(r, 5, 60), ...[0, 1, 2, 3].map(() => Math.round(base * decimal(r, 0.9, 1.15, 3) * 100) / 100)];
});
const FRETES = [380, 0, 220, 150];
const totalFornecedor = (f: number) => somar(MAPA.map((l) => (l[1] as number) * (l[2 + f] as number)));
const TOTAIS = [0, 1, 2, 3].map(totalFornecedor);
const COM_FRETE = TOTAIS.map((t, i) => t + FRETES[i]);
const MELHOR_POR_ITEM = somar(MAPA.map((l) => (l[1] as number) * Math.min(...(l.slice(2) as number[]))));
const MENOR_UNICO = Math.min(...COM_FRETE);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Cotação Profissional",
  introducao:
    "Um dia de trabalho do comprador: montar o mapa de cotação de 12 itens com 4 fornecedores, somar o frete e decidir entre comprar tudo de um só fornecedor ou dividir o pedido. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A reposição de material de escritório",
      remetente: "Vanessa Lopes, coordenadora administrativa",
      assunto: "Cotação trimestral — Instituto Educar Mais",
      paragrafos: [
        "O Instituto precisa repor o material de escritório do trimestre. Você pediu cotação a quatro fornecedores para os mesmos 12 itens e quantidades. Cada fornecedor cobra um frete diferente: o Fornecedor A, R$ 380,00; o B, frete grátis; o C, R$ 220,00; o D, R$ 150,00.",
        "A cotação profissional compara preço, frete, prazo e condições, e não apenas o menor valor de cada linha. Mas, antes de decidir, quero saber quanto o Instituto economizaria se pudesse comprar cada item do fornecedor mais barato, e quanto sairia comprando tudo de um só.",
      ],
      entregas: [
        "O total de cada fornecedor, com e sem frete (etapa 2).",
        "O valor da compra «picotada» (menor preço de cada item) e a comparação com o melhor fornecedor único (etapa 2).",
        "Uma recomendação por escrito, com os critérios além do preço (etapa 3).",
      ],
    }),
    planilha({
      id: "mapa-de-cotacao",
      titulo: "Etapa 2 — Planilha: mapa de cotação (12 itens × 4 fornecedores)",
      cenario: "Cole a planilha no Excel. Total do fornecedor = SOMARPRODUTO(quantidade; preço do fornecedor). O menor preço de cada item é o MÍNIMO da linha.",
      colunas: ["Item", "Quantidade", "Fornecedor A (R$ un.)", "Fornecedor B (R$ un.)", "Fornecedor C (R$ un.)", "Fornecedor D (R$ un.)"],
      linhas: MAPA,
      instrucao: "Calcule:",
      tarefas: [
        { id: "total-a", rotulo: "Total do Fornecedor A sem frete (R$)", valor: TOTAIS[0], explicacao: "SOMARPRODUTO da quantidade pelo preço do Fornecedor A." },
        { id: "total-b", rotulo: "Total do Fornecedor B sem frete (R$)", valor: TOTAIS[1], explicacao: "SOMARPRODUTO da quantidade pelo preço do Fornecedor B." },
        { id: "total-d-frete", rotulo: "Total do Fornecedor D com frete de R$ 150,00 (R$)", valor: COM_FRETE[3], explicacao: "Total do D + frete de 150." },
        { id: "menor-unico", rotulo: "Menor total com frete entre os quatro fornecedores (R$)", valor: MENOR_UNICO, explicacao: "O menor valor da linha de totais com frete." },
        { id: "picotada", rotulo: "Total comprando cada item do fornecedor mais barato (R$, sem frete)", valor: MELHOR_POR_ITEM, explicacao: "Soma de quantidade × menor preço de cada linha." },
        { id: "economia", rotulo: "Diferença entre o melhor fornecedor único e a compra «picotada» (R$)", valor: MENOR_UNICO - MELHOR_POR_ITEM, explicacao: "Menor total com frete menos o total picotado, sem frete: é o máximo que se teria de economia, antes de somar fretes de mais de um pedido." },
      ],
    }),
    calculos({
      id: "frete-vale-a-pena",
      titulo: "Etapa 3 — O frete muda a decisão?",
      cenario: "Um fornecedor E oferece total de R$ 4.980,00 sem frete, mas cobra frete de R$ 120,00 e pede pagamento à vista. O Fornecedor F oferece total de R$ 5.010,00 com frete grátis e pagamento em 30 dias.",
      instrucao: "Calcule:",
      campos: [
        { id: "total-e", rotulo: "Custo total do Fornecedor E (R$)", esperado: 5100, explicacao: "4.980 + 120 = 5.100." },
        { id: "diferenca", rotulo: "Diferença de custo entre E e F (R$; positivo se E for mais caro)", esperado: 90, explicacao: "5.100 − 5.010 = 90: o F é mais barato, mesmo com preço de lista maior." },
        { id: "juros-implicitos", rotulo: "Ganho financeiro dos 30 dias de prazo do Fornecedor F, se o dinheiro rende 1,2% ao mês (R$)", esperado: 60.12, explicacao: "5.010 × 1,2% = 60,12: o prazo ainda traz um ganho financeiro." },
      ],
    }),
    dissertativa({
      id: "recomendacao-de-compra",
      titulo: "Etapa 4 — Recomendação de compra",
      cenario: "A coordenadora não quer só o menor preço: ela quer saber qual decisão defender.",
      instrucao: "Escreva a recomendação.",
      deve: [
        "Diga qual fornecedor você escolheria para um pedido único e justifique com o custo total, incluindo o frete.",
        "Explique quando valeria dividir o pedido entre fornecedores e que custos isso gera (mais pedidos, mais fretes, mais conferências).",
        "Cite pelo menos três critérios além do preço (prazo de entrega, prazo de pagamento, qualidade, histórico, garantia).",
        "Descreva como guardaria a cotação para justificar a escolha em uma auditoria.",
      ],
      chave: /(frete|pre[cç]o|prazo|qualidade|hist[oó]rico|garantia|cota[cç][aã]o|fornecedor|auditoria|pagamento)/i,
      minPalavras: 65,
    }),
  ],
};

export default atividade;
