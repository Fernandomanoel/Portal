import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";

const TAREFAS = [
  ["Digitar dados de notas fiscais no sistema", 14, 85, "Médio"],
  ["Responder perguntas frequentes de clientes", 18, 70, "Baixo"],
  ["Redigir e-mails de cobrança padrão", 6, 80, "Baixo"],
  ["Resumir atas de reunião", 5, 90, "Baixo"],
  ["Conferir contratos com cláusulas especiais", 8, 25, "Alto"],
  ["Classificar currículos recebidos", 7, 60, "Alto"],
  ["Preparar relatório mensal de vendas", 10, 65, "Médio"],
  ["Agendar reuniões e confirmar presença", 9, 75, "Baixo"],
  ["Traduzir documentos técnicos", 4, 70, "Médio"],
  ["Criar posts para redes sociais", 8, 70, "Baixo"],
  ["Analisar planilhas de despesas", 6, 55, "Médio"],
  ["Atender chamados simples de TI", 12, 65, "Médio"],
  ["Negociar prazos com fornecedores", 7, 15, "Alto"],
  ["Elaborar propostas comerciais", 9, 50, "Médio"],
  ["Revisar ortografia e gramática de textos", 5, 90, "Baixo"],
  ["Transcrever áudios de entrevistas", 6, 92, "Baixo"],
  ["Decidir demissão ou promoção", 3, 5, "Alto"],
  ["Gerar relatórios de ponto dos funcionários", 5, 80, "Médio"],
  ["Pesquisar preços de concorrentes", 6, 60, "Médio"],
  ["Organizar arquivos e pastas do servidor", 4, 70, "Baixo"],
];
const horas = (l: (string | number)[]) => l[1] as number;
const auto = (l: (string | number)[]) => (horas(l) * (l[2] as number)) / 100;
const TOTAL_H = somar(TAREFAS.map(horas));
const AUTOMATIZAVEIS = somar(TAREFAS.map(auto));
const VALOR_HORA = 38;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Fundamentos e Aplicações Práticas da IA",
  introducao:
    "Um dia de trabalho de consultor interno: mapear 20 tarefas de um escritório, estimar quanto tempo a IA poderia liberar e decidir por onde começar um piloto, sem esquecer o risco de cada tarefa. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O mapa de tarefas do escritório",
      remetente: "Dra. Helena Marques, sócia do Escritório Marques & Associados",
      assunto: "Onde a IA pode ajudar de verdade na nossa equipe?",
      paragrafos: [
        "Nosso escritório tem uma equipe administrativa de seis pessoas e todo mundo comenta sobre IA, mas ninguém sabe por onde começar. Levantamos as 20 tarefas que mais consomem horas na semana, com uma estimativa de quanto de cada uma poderia ser feito (ou muito ajudado) por ferramentas de IA, e com o risco de um erro da IA causar problema.",
        "Estimativas são estimativas: elas vêm de entrevistas com a equipe, não de medição. Considere o custo da hora de trabalho administrativo em R$ 38,00 e 48 semanas de trabalho por ano. Quero um piloto pequeno e seguro, não uma revolução.",
      ],
      entregas: [
        "As horas totais, as horas automatizáveis e o valor estimado de tempo liberado (etapa 2).",
        "As tarefas de risco alto que NÃO devem ser delegadas a uma IA sem supervisão (etapa 2).",
        "Uma proposta de piloto por escrito, com critérios de sucesso e de parada (etapa 4).",
      ],
    }),
    planilha({
      id: "mapa-de-tarefas",
      titulo: "Etapa 2 — Planilha: 20 tarefas da equipe administrativa",
      cenario: "Cole a planilha no Excel e crie a coluna Horas automatizáveis (=horas × potencial ÷ 100). Depois some e filtre por risco.",
      colunas: ["Tarefa", "Horas por semana (equipe)", "Potencial de automação com IA (%)", "Risco de erro com impacto"],
      linhas: TAREFAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "total-horas", rotulo: "Total de horas por semana nas 20 tarefas", valor: TOTAL_H, explicacao: "Soma da coluna Horas por semana.", tolerancia: 0 },
        { id: "automatizaveis", rotulo: "Horas por semana que a IA poderia liberar (soma de horas × potencial)", valor: AUTOMATIZAVEIS, explicacao: "Soma, linha a linha, de horas × percentual de potencial." },
        { id: "percentual", rotulo: "Percentual das horas totais que poderia ser liberado (%)", valor: (AUTOMATIZAVEIS / TOTAL_H) * 100, explicacao: "Horas automatizáveis ÷ horas totais × 100." },
        { id: "valor-ano", rotulo: "Valor anual do tempo liberado, a R$ 38,00 a hora e 48 semanas (R$)", valor: AUTOMATIZAVEIS * VALOR_HORA * 48, explicacao: "Horas automatizáveis × 38 × 48." },
        { id: "risco-alto", rotulo: "Quantidade de tarefas de risco ALTO", valor: TAREFAS.filter((l) => l[3] === "Alto").length, explicacao: "Conte as linhas com risco Alto.", tolerancia: 0 },
        { id: "horas-risco-baixo", rotulo: "Horas automatizáveis em tarefas de risco BAIXO", valor: somar(TAREFAS.filter((l) => l[3] === "Baixo").map(auto)), explicacao: "Soma das horas automatizáveis das tarefas de risco baixo: a melhor região para um piloto." },
        { id: "maior", rotulo: "Maior volume de horas automatizáveis em uma única tarefa", valor: Math.max(...TAREFAS.map(auto)), explicacao: "O maior valor da coluna de horas automatizáveis." },
      ],
    }),
    associar({
      id: "tipos-de-ia",
      titulo: "Etapa 3 — Que tipo de IA resolve que tipo de tarefa",
      instrucao: "Associe cada tarefa ao tipo de IA mais adequado.",
      opcoes: ["IA generativa de texto", "Visão computacional", "Aprendizado de máquina para previsão", "Reconhecimento e transcrição de voz"],
      linhas: [
        { id: "resumo", rotulo: "Resumir uma ata de reunião e redigir o e-mail de encaminhamento.", correta: 0 },
        { id: "nota", rotulo: "Ler os campos de uma foto de nota fiscal para lançar no sistema.", correta: 1 },
        { id: "previsao", rotulo: "Prever quantas vendas a empresa terá no próximo mês com base no histórico.", correta: 2 },
        { id: "audio", rotulo: "Transformar a gravação de uma entrevista em texto.", correta: 3 },
      ],
      explicacao: "Escolher a técnica pelo tipo de dado e de tarefa evita comprar uma ferramenta sofisticada para um problema simples.",
    }),
    dissertativa({
      id: "proposta-de-piloto",
      titulo: "Etapa 4 — Proposta de piloto",
      instrucao: "Escreva a proposta de piloto para a sócia.",
      deve: [
        "Escolha de duas a três tarefas para começar, justificando com horas automatizáveis e risco baixo, e deixando de fora as de risco alto.",
        "Descreva como a equipe usaria a IA nessas tarefas e quem revisaria o resultado antes de ele sair do escritório.",
        "Defina critérios de sucesso medidos com números (horas liberadas, erros encontrados na revisão) e um critério de parada.",
        "Cite uma preocupação com dados do escritório e dos clientes e a regra que você criaria para o piloto.",
      ],
      chave: /(piloto|risco|revis|horas|crit[eé]rio|sucesso|parada|dados|supervis|tarefa)/i,
      minPalavras: 75,
    }),
  ],
};

export default atividade;
