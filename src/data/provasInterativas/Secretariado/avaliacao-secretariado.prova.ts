import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Secretariado/
 * Avaliação - Secretariado.prova.js): mesmas 10 perguntas e o mesmo gabarito
 * do arquivo original. Metade virou dissertativa autocorrigida, usando a
 * resposta certa original como base das `respostasAceitas`.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Secretariado",
  perguntas: [
    {
      tipo: "dissertativa",
      pergunta: "Qual é uma das principais funções de um(a) secretário(a)?",
      respostasAceitas: ["organizar agendas, documentos", "apoiar a gestão administrativa"],
    },
    {
      pergunta: "O que é fundamental na organização de uma agenda executiva?",
      opcoes: [
        "Marcar compromissos sem verificar conflitos de horário",
        "Priorizar compromissos, evitar conflitos de horário e confirmar reuniões",
        "Ignorar prazos",
        "Delegar toda a agenda para outra pessoa sem acompanhamento",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que é \"protocolo\" no contexto de secretariado?",
      respostasAceitas: ["registro e controle da tramitação de documentos", "tramitação de documentos"],
    },
    {
      pergunta: "Qual a importância da redação correta de e-mails e documentos empresariais?",
      opcoes: [
        "Não é importante",
        "Transmite profissionalismo e evita mal-entendidos na comunicação",
        "Serve apenas para impressionar",
        "É importante só em cartas físicas",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "O que caracteriza uma boa recepção a visitantes numa empresa?",
      respostasAceitas: ["cordialidade, atenção e encaminhamento", "atenção e encaminhamento correto"],
    },
    {
      pergunta: "O que é \"arquivamento de documentos\"?",
      opcoes: [
        "Descartar documentos antigos",
        "Organizar e guardar documentos de forma sistemática para fácil localização futura",
        "Enviar documentos por e-mail apenas",
        "Um tipo de assinatura digital",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Por que a discrição é uma qualidade importante para quem atua no secretariado?",
      respostasAceitas: ["informações confidenciais da empresa", "sigilo"],
    },
    {
      pergunta: "O que é etiqueta profissional?",
      opcoes: [
        "Um tipo de documento fiscal",
        "O conjunto de normas de comportamento e conduta adequadas ao ambiente de trabalho",
        "Uma regra exclusiva para reuniões formais",
        "Um sistema de arquivamento",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta: "Qual ferramenta é comumente usada para organizar reuniões e compromissos?",
      respostasAceitas: ["agendas e calendários eletrônicos", "agenda eletrônica"],
    },
    {
      pergunta: "O que é fundamental ao realizar a ata de uma reunião?",
      opcoes: [
        "Registrar opiniões pessoais sobre os participantes",
        "Registrar de forma clara e objetiva os principais pontos discutidos e decisões tomadas",
        "Ignorar os assuntos tratados",
        "Escrever apenas o horário de início e fim",
      ],
      correta: 1,
    },
  ],
};

export default prova;
