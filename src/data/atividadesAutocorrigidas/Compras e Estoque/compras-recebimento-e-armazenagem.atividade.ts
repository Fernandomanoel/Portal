import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const NOMES = ["Chapa de aço 2 mm", "Tubo galvanizado 1\"", "Barra roscada M12", "Cantoneira 2\"", "Perfil U 100", "Parafuso autoperfurante (cx)", "Tinta anticorrosiva 18 L", "Eletrodo E6013 (kg)", "Disco de desbaste", "Luva nitrílica (cx)", "Capacete", "Botina de segurança", "Cabo de aço 8 mm", "Corrente 3/8", "Gancho giratório", "Manta de borracha", "Fita zebrada (rolo)", "Cone de sinalização"];
const r = sorteio(3707);
const RECEBIMENTO = NOMES.map((nome, i) => {
  const pedido = inteiro(r, 10, 200);
  const nf = r() < 0.15 ? pedido + inteiro(r, 1, 10) : pedido;
  const fisico = r() < 0.25 ? Math.max(0, nf - inteiro(r, 1, 12)) : nf;
  return [`PED-${700 + i}`, nome, pedido, nf, fisico, decimal(r, 4, 180)];
});
const aceito = (l: (string | number)[]) => Math.min(l[2] as number, l[3] as number, l[4] as number);
const VALOR_NF = somar(RECEBIMENTO.map((l) => (l[3] as number) * (l[5] as number)));
const VALOR_ACEITO = somar(RECEBIMENTO.map((l) => aceito(l) * (l[5] as number)));
const COM_DIVERGENCIA = RECEBIMENTO.filter((l) => !(l[2] === l[3] && l[3] === l[4]));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Movimentação de Materiais, Armazenagem e Recebimento",
  introducao:
    "Um dia de trabalho na doca de recebimento: conferir a nota fiscal, o pedido e a contagem física de 18 itens, calcular o que pode ser aceito e planejar a ocupação das posições de armazenagem. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O caminhão chegou à doca 2",
      remetente: "Sandra Bittencourt, chefe do almoxarifado da Metalúrgica Cruzeiro",
      assunto: "Conferência do recebimento da Distribuidora Aço Forte",
      paragrafos: [
        "A conferência de recebimento compara três documentos: o pedido de compra (o que foi comprado), a nota fiscal (o que o fornecedor diz ter enviado) e a contagem física (o que realmente chegou). Só se aceita o que está de acordo com os três. Quantidade acima do pedido não deve ser aceita sem autorização; quantidade menor que a da nota deve gerar registro de divergência e reclamação ao fornecedor.",
        "Para este treino, considere aceita a menor quantidade entre pedido, nota e contagem física de cada item. Depois do recebimento, é preciso endereçar o material no armazém e cuidar para não faltar posição de palete.",
      ],
      entregas: [
        "A conferência dos 18 itens, com o valor da nota, o valor aceito e as divergências (etapa 2).",
        "A ocupação das posições de armazenagem (etapa 3).",
        "Um registro por escrito do que fazer com cada tipo de divergência e do que dizer ao fornecedor (etapa 4).",
      ],
    }),
    planilha({
      id: "conferencia-de-recebimento",
      titulo: "Etapa 2 — Planilha: pedido x nota fiscal x contagem física",
      cenario: "Cole a planilha no Excel e crie as colunas Quantidade aceita (=MÍNIMO(pedido; NF; físico)) e Valor aceito (=aceita × custo).",
      colunas: ["Pedido", "Item", "Qtd pedida", "Qtd na NF", "Qtd contada", "Custo unitário (R$)"],
      linhas: RECEBIMENTO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "valor-nf", rotulo: "Valor total da nota fiscal (R$)", valor: VALOR_NF, explicacao: "Soma de quantidade na NF × custo unitário." },
        { id: "valor-aceito", rotulo: "Valor total que pode ser aceito (R$)", valor: VALOR_ACEITO, explicacao: "Soma da menor quantidade entre as três fontes × custo." },
        { id: "diferenca", rotulo: "Valor da nota que não pode ser aceito (R$)", valor: VALOR_NF - VALOR_ACEITO, explicacao: "Valor da NF menos o valor aceito." },
        { id: "itens-divergentes", rotulo: "Quantidade de itens com algum tipo de divergência", valor: COM_DIVERGENCIA.length, explicacao: "Itens em que pedido, nota e contagem não são iguais.", tolerancia: 0 },
        { id: "acima-pedido", rotulo: "Quantidade de itens em que a NF trouxe mais do que o pedido", valor: RECEBIMENTO.filter((l) => (l[3] as number) > (l[2] as number)).length, explicacao: "Itens com Qtd na NF maior que Qtd pedida.", tolerancia: 0 },
        { id: "falta-fisica", rotulo: "Quantidade de itens em que faltou material na contagem física em relação à NF", valor: RECEBIMENTO.filter((l) => (l[4] as number) < (l[3] as number)).length, explicacao: "Itens com Qtd contada menor que Qtd na NF.", tolerancia: 0 },
      ],
    }),
    calculos({
      id: "armazenagem",
      titulo: "Etapa 3 — Capacidade de armazenagem em porta-paletes",
      cenario: "O armazém tem 3 ruas de porta-paletes. Cada rua tem 5 módulos, cada módulo tem 4 níveis e cada nível comporta 2 paletes. Hoje há 87 posições ocupadas. O recebimento de hoje traz 22 paletes.",
      instrucao: "Calcule:",
      campos: [
        { id: "capacidade", rotulo: "Capacidade total (posições de palete)", esperado: 120, tolerancia: 0, explicacao: "3 ruas × 5 módulos × 4 níveis × 2 posições = 120." },
        { id: "ocupacao", rotulo: "Taxa de ocupação atual (%)", esperado: 72.5, tolerancia: 0.05, explicacao: "87 ÷ 120 × 100 = 72,5%." },
        { id: "livres", rotulo: "Posições livres", esperado: 33, tolerancia: 0, explicacao: "120 − 87 = 33." },
        { id: "apos", rotulo: "Taxa de ocupação depois de guardar os 22 paletes (%)", esperado: (109 / 120) * 100, tolerancia: 0.05, explicacao: "(87 + 22) ÷ 120 × 100 = 90,8%." },
      ],
    }),
    dissertativa({
      id: "registro-de-divergencias",
      titulo: "Etapa 4 — Registro das divergências e contato com o fornecedor",
      instrucao: "Escreva o procedimento e o texto de comunicação ao fornecedor.",
      deve: [
        "Diga o que fazer com cada tipo de divergência: quantidade acima do pedido, quantidade abaixo da nota, produto avariado ou diferente do pedido.",
        "Explique o que anotar no verso ou na observação da nota fiscal na hora do recebimento e quem assina.",
        "Escreva, em poucas linhas, a mensagem ao fornecedor reportando a divergência de um item, com número da nota, quantidades e o que se espera dele.",
        "Explique por que uma ocupação de armazém acima de 90% já exige atenção para o fluxo de entradas e saídas.",
      ],
      chave: /(diverg[eê]ncia|nota fiscal|pedido|contagem|devolu[cç][aã]o|fornecedor|avaria|assin|recebimento|ocupa[cç][aã]o)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
