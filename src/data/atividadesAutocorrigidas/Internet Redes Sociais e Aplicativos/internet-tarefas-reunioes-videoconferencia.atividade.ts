import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Tarefas, Reuniões e Videoconferências",
  introducao:
    "Organizar tarefas e conduzir reuniões on-line são rotinas do trabalho moderno. Veja como agendar, preparar e se portar em uma videoconferência.",
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
    escolha({
      id: "ata",
      titulo: "Ata e encaminhamentos",
      instrucao: "O que a ata da reunião deve registrar de mais importante?",
      opcoes: [
        "Cada piada contada.",
        "As decisões tomadas, os responsáveis e os prazos.",
        "O nome de quem chegou atrasado.",
        "A cor da camisa dos participantes.",
      ],
      correta: 1,
      explicacao: "Decisão, responsável e prazo transformam a conversa em ação e permitem cobrar o combinado.",
    }),
    resposta({
      id: "convite",
      titulo: "Escreva o convite",
      cenario: "Você precisa marcar uma reunião de 30 minutos, na terça às 14h, com a equipe para definir a escala de férias.",
      instrucao: "Escreva o texto do convite: tema, data, horário, duração e objetivo.",
      rotulo: "Texto do convite",
      placeholder: "Reunião: escala de férias. Terça, às 14h, duração de 30 minutos. Objetivo: ...",
      chave: /(f[eé]rias|escala)/i,
      minPalavras: 10,
    }),
  ],
};

export default atividade;
