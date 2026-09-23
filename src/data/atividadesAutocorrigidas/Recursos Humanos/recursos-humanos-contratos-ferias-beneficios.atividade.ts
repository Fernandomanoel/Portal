import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_BENEFICIO = [
  { valor: "obrigatorio", texto: "Benefício Obrigatório (Lei)" },
  { valor: "espontaneo", texto: "Benefício Espontâneo" },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Contratos, Férias e Benefícios",
  introducao: "Pacote de benefícios, regras de férias e abono pecuniário, e contrato de experiência.",
  itens: [
    {
      id: "pacote-beneficios-legais-espontaneos",
      titulo: "Pacote de Benefícios: Legais vs. Espontâneos",
      cenario:
        "O RH está estruturando um novo pacote de benefícios. É fundamental separar o que é exigência da lei do que é oferecido por estratégia de atração e retenção. Associe corretamente:",
      campos: [
        {
          id: "beneficio-vale-transporte",
          rotulo: "Vale-Transporte (custeio do deslocamento residência-trabalho).",
          regra: { tipo: "selecao", esperado: "obrigatorio", opcoes: OPCOES_BENEFICIO },
          mensagemCerta:
            "Correto! O Vale-Transporte é exigido por lei. Já Plano de Saúde e Gympass são estratégias voluntárias da empresa.",
          mensagemErrada:
            "Incorreto. Lembre-se que, no Brasil, o Vale-Transporte é benefício legal obrigatório, enquanto Plano de Saúde é espontâneo (salvo convenção coletiva).",
        },
        {
          id: "beneficio-plano-saude-gympass-cultura",
          rotulo: "Plano de Saúde, Gympass (auxílio academia) e Vale-Cultura.",
          regra: { tipo: "selecao", esperado: "espontaneo", opcoes: OPCOES_BENEFICIO },
          mensagemCerta:
            "Correto! O Vale-Transporte é exigido por lei. Já Plano de Saúde e Gympass são estratégias voluntárias da empresa.",
          mensagemErrada:
            "Incorreto. Lembre-se que, no Brasil, o Vale-Transporte é benefício legal obrigatório, enquanto Plano de Saúde é espontâneo (salvo convenção coletiva).",
        },
      ],
    },
    {
      id: "regras-ferias-abono-vf",
      titulo: "Regras de Férias e Abono Pecuniário",
      cenario:
        "Com a Reforma Trabalhista, as regras para o gozo de férias sofreram alterações importantes. Julgue as afirmações abaixo como Verdadeira (V) ou Falsa (F):",
      campos: [
        {
          id: "vf-fracionamento-ferias-3-periodos",
          rotulo:
            "1. Desde que haja concordância do empregado, as férias podem ser divididas (fracionadas) em até 3 períodos, sendo que um deles não pode ser inferior a 14 dias corridos.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta:
            "Excelente! O fracionamento de 3 vezes (com uma parcela >= 14) está previsto (V). Mas a venda (abono) é limitada a 1/3 das férias, ou seja, 10 dias (F).",
          mensagemErrada:
            "Atenção: a divisão em até 3 períodos é legalmente permitida (Afirmativa 1 é Verdadeira). A venda total (100%) das férias é estritamente PROIBIDA pela CLT (Afirmativa 2 é Falsa).",
        },
        {
          id: "vf-venda-100-ferias",
          rotulo:
            "2. O empregado pode optar por \"vender\" (converter em abono pecuniário) 100% dos seus 30 dias de férias para receber um salário extra, não tirando dias de descanso.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta:
            "Excelente! O fracionamento de 3 vezes (com uma parcela >= 14) está previsto (V). Mas a venda (abono) é limitada a 1/3 das férias, ou seja, 10 dias (F).",
          mensagemErrada:
            "Atenção: a divisão em até 3 períodos é legalmente permitida (Afirmativa 1 é Verdadeira). A venda total (100%) das férias é estritamente PROIBIDA pela CLT (Afirmativa 2 é Falsa).",
        },
      ],
    },
    {
      id: "prazo-contrato-experiencia",
      titulo: "Prazo do Contrato de Experiência",
      cenario:
        "O Contrato de Experiência é uma modalidade de contrato por prazo determinado, que visa testar a aptidão do funcionário para o cargo e a adaptação do mesmo à cultura da empresa.",
      instrucao: "Segundo a CLT (Art. 445), qual é a duração MÁXIMA (em dias) permitida para o Contrato de Experiência, somando-se prorrogações?",
      campos: [
        {
          id: "prazo-contrato-experiencia",
          placeholder: "Digite apenas o número de dias...",
          regra: { tipo: "padrao", padrao: /^(90( dias)?|noventa)$/i },
          mensagemCerta: "Exato! O Contrato de Experiência não pode ultrapassar 90 dias no total (ex: 45 + 45, ou 30 + 60).",
          mensagemErrada: "Incorreto. O prazo máximo permitido para o contrato de experiência, segundo a CLT, é de 90 dias.",
        },
      ],
    },
    {
      id: "inicio-periodo-ferias-regra",
      titulo: "Regra de Início do Período de Férias",
      cenario:
        "Um gestor enviou ao RH uma programação solicitando que as férias de um membro da sua equipe comecem em uma quinta-feira. Sabendo que no calendário da empresa, a sexta-feira seguinte será feriado nacional, o analista de DP precisou barrar a solicitação.",
      instrucao:
        "Por que essa programação foi barrada? Fundamente sua resposta nas diretrizes da CLT para o início do gozo de férias (cite o prazo em dias exigido antes de feriados ou DSR).",
      campos: [
        {
          id: "inicio-periodo-ferias-regra",
          placeholder:
            "Ex: A solicitação foi barrada porque a CLT proíbe que o início das férias ocorra no período de dois dias que antecede feriados ou repouso semanal remunerado...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /dois dias|2 dias|feriado|repouso|domingo|quinta|sexta/i,
          },
          mensagemCerta:
            "Fundamentação perfeita! O art. 134, § 3º da CLT, incluído pela Reforma, proíbe o início das férias no período de dois dias que antecede feriado ou o dia de repouso semanal (DSR).",
          mensagemErrada:
            "O bloqueio ocorreu devido à regra dos \"dois dias\". Você precisa citar a proibição de iniciar as férias nos dois dias que antecedem um \"feriado\" ou \"repouso semanal\".",
        },
      ],
    },
    {
      id: "checklist-experiencia-link",
      titulo: "Checklist de Avaliação de Experiência",
      cenario:
        "O acompanhamento do recém-contratado previne demissões precoces. Utilize o Trello (para criar um quadro Kanban) ou o Google Sheets / Docs (para criar uma planilha/documento) contendo o cronograma de feedbacks de experiência (ex: marcos de 30, 45 ou 90 dias).",
      instrucao: "Cole abaixo o link público do seu quadro/documento de acompanhamento:",
      campos: [
        {
          id: "checklist-experiencia-link",
          placeholder: "https://trello.com/b/... ou https://docs.google.com/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(trello\.com|docs\.google\.com)\/.+/i },
          mensagemCerta:
            "Link validado! Ter um fluxo estruturado e documentado é vital para garantir o sucesso do Onboarding e Período de Experiência.",
          mensagemErrada: "URL inválida. Por favor, insira o link público do Trello (trello.com) ou Google Docs/Sheets (docs.google.com).",
        },
      ],
    },
  ],
};

export default atividade;
