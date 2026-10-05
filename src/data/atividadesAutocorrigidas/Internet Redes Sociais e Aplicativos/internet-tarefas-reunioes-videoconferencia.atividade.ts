import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const REUNIOES = [
  ["Alinhamento semanal", 60, 8],
  ["Revisão de orçamento", 90, 5],
  ["Treinamento do sistema", 120, 12],
  ["Reunião com fornecedor", 45, 3],
  ["Planejamento de campanha", 75, 6],
];
const HORAS_PESSOA = REUNIOES.map((l) => ((l[1] as number) / 60) * (l[2] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Tarefas, Reuniões e Videoconferências",
  introducao:
    "Organizar tarefas e conduzir reuniões on-line são rotinas do trabalho moderno. Veja como agendar, preparar e se portar em uma videoconferência. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "pauta",
      titulo: "A pauta da reunião",
      instrucao: "Por que enviar a pauta junto com o convite?",
      opcoes: [
        "Para a reunião durar mais tempo.",
        "Para os participantes saberem os assuntos e o objetivo e chegarem preparados.",
        "Para não precisar de ata.",
        "Para impedir que alguém fale.",
      ],
      correta: 1,
      explicacao: "Pauta clara com objetivo e tempo por assunto evita reuniões longas e sem resultado.",
    }),
    calculos({
      id: "custo-reuniao",
      titulo: "O custo do tempo",
      cenario: "Uma reunião começa às 09:30 e termina às 10:45, com 8 participantes.",
      instrucao: "Calcule a duração em minutos e o total de horas de trabalho gastas por todos os participantes.",
      campos: [
        { id: "duracao", rotulo: "Duração (minutos)", esperado: 75, tolerancia: 0, explicacao: "De 09:30 a 10:45 são 1 h 15 min = 75 minutos." },
        { id: "horas-pessoa", rotulo: "Horas de trabalho somadas (h)", esperado: 10, explicacao: "8 pessoas × 75 min = 600 min = 10 horas." },
      ],
    }),
    associar({
      id: "etiqueta",
      titulo: "Etiqueta em videoconferência",
      instrucao: "Classifique cada atitude.",
      opcoes: ["Boa prática", "Evitar"],
      linhas: [
        { id: "mutar", rotulo: "Manter o microfone desligado quando não está falando.", correta: 0 },
        { id: "fundo", rotulo: "Participar de um lugar com som alto e muita movimentação ao fundo.", correta: 1 },
        { id: "teste", rotulo: "Testar câmera, microfone e conexão antes de começar.", correta: 0 },
        { id: "outra-tarefa", rotulo: "Responder mensagens e fazer outras tarefas sem olhar para a reunião.", correta: 1 },
      ],
      explicacao: "Postura profissional on-line é a mesma da reunião presencial: atenção, pontualidade e respeito ao tempo de todos.",
    }),
    resposta({
      id: "convite",
      titulo: "Escreva o convite",
      cenario: "Você precisa marcar uma reunião de 30 minutos, na terça às 14h, com a equipe para definir a escala de férias.",
      instrucao: "Escreva o texto do convite: tema, data, horário, duração e objetivo.",
      rotulo: "Texto do convite",
      placeholder: "Reunião: escala de férias. Terça, às 14h, duração de 30 minutos. Objetivo: ...",
      chave: /(f[eé]rias|escala)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "agenda-semana",
      titulo: "Planilha: reuniões da semana",
      cenario: "A agenda da equipe tem cinco reuniões. Cole a planilha no Excel e crie a coluna horas-pessoa (=duração ÷ 60 × participantes).",
      colunas: ["Reunião", "Duração (min)", "Participantes"],
      linhas: REUNIOES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "total-horas", rotulo: "Tempo total de reuniões na semana (horas)", valor: somar(REUNIOES.map((l) => l[1] as number)) / 60, explicacao: "390 minutos ÷ 60 = 6,5 horas." },
        { id: "horas-pessoa", rotulo: "Total de horas-pessoa gastas (h)", valor: somar(HORAS_PESSOA), explicacao: "Soma de duração × participantes de cada reunião." },
        { id: "mais-cara", rotulo: "Horas-pessoa da reunião mais cara (h)", valor: Math.max(...HORAS_PESSOA), explicacao: "O treinamento: 2 h × 12 pessoas = 24 h-pessoa." },
        { id: "media", rotulo: "Duração média das reuniões (min)", valor: somar(REUNIOES.map((l) => l[1] as number)) / REUNIOES.length, explicacao: "390 ÷ 5 = 78 minutos." },
      ],
    }),
    dissertativa({
      id: "reduzir-reunioes",
      titulo: "Reuniões mais eficientes",
      instrucao: "Escreva uma proposta para reduzir o tempo gasto em reuniões sem perder resultado.",
      deve: [
        "Use os números da planilha para mostrar onde há mais custo de tempo.",
        "Proponha mudanças: pauta, tempo-limite, quem precisa participar, ata com responsáveis e prazos.",
        "Explique quando uma reunião pode virar um e-mail ou uma tarefa.",
      ],
      chave: /(pauta|ata|hora|tempo|particip|prazo|respons[aá]vel|e-?mail|tarefa)/i,
    }),
  ],
};

export default atividade;
