import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { CLIENTES, dataBR, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(2303);
const NOTAS = Array.from({ length: 26 }, (_, i) => {
  const valor = inteiro(r, 8, 90) * 100;
  const aliquota = sortear(r, [2, 3, 5] as const);
  const retido = r() < 0.4 ? "Sim" : "Não";
  return [`NFS-e ${301 + i}`, dataBR(inteiro(r, 1, 30), 4), sortear(r, CLIENTES), valor, aliquota, retido];
});
const iss = (l: (string | number)[]) => ((l[3] as number) * (l[4] as number)) / 100;
const TOTAL_ISS = somar(NOTAS.map(iss));
const RETIDO = somar(NOTAS.filter((l) => l[5] === "Sim").map(iss));
const FATURADO = somar(NOTAS.map((l) => l[3] as number));

const IMOVEIS = [
  ["Sede — Rua das Acácias, 410", 480000],
  ["Depósito — Av. Industrial, 2.200", 760000],
  ["Filial — Rua do Comércio, 85", 295000],
];
const IPTU_ALIQUOTA = 1.2;
const IPTU = IMOVEIS.map((l) => ((l[1] as number) * IPTU_ALIQUOTA) / 100);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Impostos Municipais (ISS e IPTU)",
  introducao:
    "Um dia de trabalho com a rotina municipal: conferir as notas fiscais de serviço emitidas no mês, separar o ISS retido pelos clientes do ISS que a empresa recolhe e calcular o IPTU dos imóveis. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O fechamento municipal de abril",
      remetente: "Luciana Prado, coordenadora fiscal",
      assunto: "ISS de abril e IPTU do exercício — Prestadora Alvorada Serviços",
      paragrafos: [
        "A Alvorada Serviços emitiu 26 notas fiscais de serviço eletrônicas em abril, com alíquotas de ISS diferentes conforme o serviço. Alguns clientes são retentores e já recolheram o ISS na fonte; esse valor não pode ser pago de novo pela empresa. Além disso, a empresa precisa programar o IPTU dos três imóveis que usa.",
        "Os valores desta atividade são fictícios e a alíquota do IPTU (1,2% do valor venal) foi escolhida só para o treino: cada município tem a sua própria legislação, e no trabalho real você consulta a lei do município do cliente.",
      ],
      entregas: [
        "A apuração do ISS do mês e a separação entre ISS retido e ISS a recolher (etapa 2).",
        "O cálculo do IPTU dos imóveis e da economia com o pagamento à vista (etapa 3).",
        "Um aviso por escrito ao financeiro com os valores e as datas a cuidar (etapa 4).",
      ],
    }),
    planilha({
      id: "nfse-de-abril",
      titulo: "Etapa 2 — Planilha: 26 notas fiscais de serviço de abril",
      cenario: "Cole a planilha no Excel e crie a coluna ISS (=valor × alíquota ÷ 100). O ISS retido é o das linhas com «Sim» na coluna Retido pelo tomador.",
      colunas: ["Nota", "Data", "Tomador", "Valor do serviço (R$)", "Alíquota ISS (%)", "Retido pelo tomador"],
      linhas: NOTAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "faturado", rotulo: "Total faturado em serviços (R$)", valor: FATURADO, explicacao: "Soma da coluna Valor do serviço." },
        { id: "iss-total", rotulo: "ISS total gerado no mês (R$)", valor: TOTAL_ISS, explicacao: "Soma de valor × alíquota de cada nota." },
        { id: "iss-retido", rotulo: "ISS já retido pelos tomadores (R$)", valor: RETIDO, explicacao: "Soma do ISS das notas com retenção." },
        { id: "iss-recolher", rotulo: "ISS que a empresa ainda precisa recolher (R$)", valor: TOTAL_ISS - RETIDO, explicacao: "ISS total menos o ISS retido." },
        { id: "notas-retidas", rotulo: "Quantidade de notas com retenção", valor: NOTAS.filter((l) => l[5] === "Sim").length, explicacao: "Conte as linhas com Sim.", tolerancia: 0 },
        { id: "aliquota-media", rotulo: "Alíquota efetiva média do mês (ISS total ÷ faturado, %)", valor: (TOTAL_ISS / FATURADO) * 100, explicacao: "ISS total ÷ total faturado × 100." },
      ],
    }),
    calculos({
      id: "iptu",
      titulo: "Etapa 3 — IPTU dos imóveis da empresa",
      cenario: "O IPTU é calculado sobre o valor venal do imóvel. Alíquota deste exercício de treino: 1,2%. O município dá 5% de desconto para pagamento à vista da cota única.",
      tabela: { colunas: ["Imóvel", "Valor venal (R$)"], linhas: IMOVEIS.map((l) => [String(l[0]), (l[1] as number).toLocaleString("pt-BR")]) },
      instrucao: "Calcule:",
      campos: [
        { id: "sede", rotulo: "IPTU anual da Sede (R$)", esperado: IPTU[0], explicacao: "480.000 × 1,2% = 5.760." },
        { id: "total", rotulo: "IPTU anual dos três imóveis (R$)", esperado: somar(IPTU), explicacao: "Soma dos três: valor venal total × 1,2%." },
        { id: "a-vista", rotulo: "Valor total à vista, com 5% de desconto (R$)", esperado: somar(IPTU) * 0.95, explicacao: "Total anual × 0,95." },
        { id: "economia", rotulo: "Economia com o pagamento à vista (R$)", esperado: somar(IPTU) * 0.05, explicacao: "5% do total anual." },
      ],
    }),
    dissertativa({
      id: "aviso-ao-financeiro",
      titulo: "Etapa 4 — Aviso ao financeiro",
      instrucao: "Escreva o e-mail que a coordenadora enviaria ao financeiro da Alvorada com os valores a pagar.",
      deve: [
        "Informe o ISS a recolher no mês e explique por que ele é menor que o ISS total gerado.",
        "Oriente o financeiro a guardar o comprovante de retenção e a conferir se os tomadores recolheram o ISS retido.",
        "Compare pagar o IPTU à vista ou parcelado e recomende uma opção, citando a economia calculada.",
        "Diga qual seria o risco de pagar de novo um ISS que já foi retido.",
      ],
      chave: /(iss|reten|recolh|iptu|[aà] vista|desconto|comprovante|economia)/i,
      minPalavras: 50,
    }),
    dissertativa({
      id: "conferencia-das-notas",
      titulo: "Etapa 5 — Conferência antes de transmitir",
      instrucao: "Descreva, em passos, a conferência que você faria nas 26 notas antes de fechar a apuração do ISS.",
      deve: [
        "Cite ao menos três itens a conferir em cada nota (tomador, código do serviço, alíquota, retenção, data).",
        "Explique o que fazer ao achar uma nota com a alíquota diferente da esperada para o serviço.",
        "Diga como você registraria e comunicaria uma nota cancelada ou substituída.",
      ],
      chave: /(confer|nota|al[ií]quota|reten|tomador|serviço|cancel|substitu)/i,
    }),
  ],
};

export default atividade;
