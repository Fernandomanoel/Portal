import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";

const INICIATIVAS = [
  ["Assistente de atendimento no WhatsApp", 5, 2, 18000],
  ["Resumo automático de reuniões", 4, 1, 6000],
  ["Previsão de demanda de estoque", 5, 4, 45000],
  ["Triagem de currículos", 3, 3, 14000],
  ["Geração de textos de marketing", 3, 1, 5000],
  ["Detecção de fraude em pagamentos", 5, 5, 80000],
  ["Tradução de manuais técnicos", 2, 2, 9000],
  ["Chatbot interno de RH", 3, 2, 12000],
  ["Análise automática de contratos", 4, 4, 38000],
  ["Visão computacional na linha de produção", 5, 5, 95000],
  ["Transcrição de chamadas", 3, 1, 7000],
  ["Recomendação de produtos no site", 4, 3, 28000],
];
const score = (l: (string | number)[]) => (l[1] as number) * 2 - (l[2] as number);
const ORDENADAS = [...INICIATIVAS].sort((a, b) => score(b) - score(a) || (a[3] as number) - (b[3] as number));
const ORCAMENTO = 60000;
let acumulado = 0;
const SELECIONADAS: typeof INICIATIVAS = [];
for (const i of ORDENADAS) {
  if (acumulado + (i[3] as number) <= ORCAMENTO) {
    SELECIONADAS.push(i);
    acumulado += i[3] as number;
  }
}

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Tendências e Inovações",
  introducao:
    "Um dia de trabalho de planejamento de inovação: priorizar 12 ideias de uso de IA por impacto, esforço e custo, escolher as que cabem no orçamento e escrever uma visão de tendências para a diretoria. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O comitê de inovação",
      remetente: "Mariana Sampaio, diretora de tecnologia da Rede Saúde & Vida",
      assunto: "Quais iniciativas de IA entram no orçamento do próximo semestre?",
      paragrafos: [
        "A rede levantou 12 ideias de uso de IA. Cada uma foi avaliada pelo comitê com nota de impacto no negócio (de 1 a 5), nota de esforço de implantação (de 1 a 5, onde 5 é o mais difícil) e custo estimado do semestre. O critério de priorização é a pontuação = impacto × 2 − esforço, e, em caso de empate, vence a iniciativa mais barata.",
        "O orçamento do semestre é de R$ 60.000,00. Selecione as iniciativas em ordem de pontuação, incluindo cada uma que ainda caiba no orçamento restante. Os valores são fictícios, para treino.",
      ],
      entregas: [
        "A pontuação de cada ideia e o ranking (etapa 2).",
        "As iniciativas selecionadas dentro do orçamento e o saldo restante (etapa 2).",
        "Um texto de tendências e de riscos para o comitê (etapa 4).",
      ],
    }),
    planilha({
      id: "matriz-de-priorizacao",
      titulo: "Etapa 2 — Planilha: 12 iniciativas de IA avaliadas pelo comitê",
      cenario: "Cole a planilha no Excel e crie a coluna Pontuação (=impacto × 2 − esforço). Ordene por pontuação decrescente (desempate pelo menor custo) e some o custo acumulado até o orçamento de R$ 60.000,00.",
      colunas: ["Iniciativa", "Impacto (1-5)", "Esforço (1-5)", "Custo no semestre (R$)"],
      linhas: INICIATIVAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "maior-score", rotulo: "Maior pontuação entre as 12 iniciativas", valor: Math.max(...INICIATIVAS.map(score)), explicacao: "Impacto × 2 − esforço, o maior valor da lista.", tolerancia: 0 },
        { id: "score-fraude", rotulo: "Pontuação da iniciativa «Detecção de fraude em pagamentos»", valor: score(INICIATIVAS[5]), explicacao: "5 × 2 − 5 = 5.", tolerancia: 0 },
        { id: "custo-total", rotulo: "Custo total das 12 iniciativas (R$)", valor: somar(INICIATIVAS.map((l) => l[3] as number)), explicacao: "Soma da coluna Custo." },
        { id: "qtd-selecionadas", rotulo: "Quantidade de iniciativas que cabem no orçamento seguindo o ranking", valor: SELECIONADAS.length, explicacao: "Percorra o ranking e inclua cada item cujo custo ainda caiba no saldo.", tolerancia: 0 },
        { id: "gasto", rotulo: "Custo total das iniciativas selecionadas (R$)", valor: acumulado, explicacao: "Soma do custo das iniciativas selecionadas." },
        { id: "saldo", rotulo: "Saldo restante do orçamento (R$)", valor: ORCAMENTO - acumulado, explicacao: "60.000 menos o custo selecionado." },
        { id: "score-medio", rotulo: "Pontuação média das iniciativas selecionadas", valor: somar(SELECIONADAS.map(score)) / SELECIONADAS.length, explicacao: "Soma das pontuações ÷ quantidade de selecionadas.", tolerancia: 0.05 },
      ],
    }),
    associar({
      id: "tendencias",
      titulo: "Etapa 3 — Conceitos de tendências em IA",
      instrucao: "Associe cada descrição ao conceito.",
      opcoes: ["IA multimodal", "Agentes de IA", "IA no dispositivo (on-device)", "Regulação e governança de IA"],
      linhas: [
        { id: "multimodal", rotulo: "Modelos que entendem e geram mais de um tipo de dado ao mesmo tempo, como texto, imagem e áudio.", correta: 0 },
        { id: "agentes", rotulo: "Sistemas que recebem um objetivo, planejam passos e usam ferramentas (buscar, calcular, enviar e-mail) para cumpri-lo.", correta: 1 },
        { id: "dispositivo", rotulo: "Modelos executados no próprio celular ou computador, sem enviar os dados para um servidor.", correta: 2 },
        { id: "regulacao", rotulo: "Leis, normas e políticas internas sobre transparência, responsabilidade e uso seguro da IA.", correta: 3 },
      ],
      explicacao: "Acompanhar tendências ajuda a decidir quando uma tecnologia está madura para o negócio e que cuidados ela exige.",
    }),
    dissertativa({
      id: "visao-de-tendencias",
      titulo: "Etapa 4 — Visão de tendências para o comitê",
      instrucao: "Escreva o texto que a diretora levaria à reunião.",
      deve: [
        "Justifique a seleção de iniciativas com os números da matriz (pontuação, custo, saldo) e diga o que ficou de fora e por quê.",
        "Escolha duas tendências da etapa 3 e explique como cada uma poderia mudar o trabalho da rede nos próximos anos.",
        "Aponte riscos (dependência de fornecedor, qualidade dos dados, privacidade, resistência da equipe) e uma medida contra cada um.",
        "Diga que indicador você acompanharia para decidir se uma iniciativa continua, é ajustada ou é encerrada.",
      ],
      chave: /(pontua[cç][aã]o|or[cç]amento|custo|tend[eê]ncia|multimodal|agente|dispositivo|regula|risco|privacidade|indicador)/i,
      minPalavras: 80,
    }),
  ],
};

export default atividade;
