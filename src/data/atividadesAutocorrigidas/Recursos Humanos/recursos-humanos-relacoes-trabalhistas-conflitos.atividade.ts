import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_RESCISAO = [
  { valor: "justa_causa", texto: "Demissão por Justa Causa" },
  { valor: "rescisao_indireta", texto: "Rescisão Indireta" },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Relações Trabalhistas e Resolução de Conflitos",
  introducao: "Rescisão por quebra de confiança, assédio moral, gestão de jornada e abandono de emprego.",
  itens: [
    {
      id: "rescisao-quebra-confianca",
      titulo: "Rescisão Contratual por Quebra de Confiança",
      cenario:
        "No Direito do Trabalho, atitudes graves podem levar ao encerramento imediato do contrato. Associe a situação prática ao tipo de rescisão correspondente segundo a CLT:",
      campos: [
        {
          id: "situacao-atraso-salarial-fgts",
          rotulo:
            "A empresa atrasa salários consecutivamente por meses e não recolhe o FGTS, descumprindo gravemente o contrato. O empregado entra na justiça para sair com todos os direitos.",
          regra: { tipo: "selecao", esperado: "rescisao_indireta", opcoes: OPCOES_RESCISAO },
          mensagemCerta: "Perfeito! A falta grave do empregador gera Rescisão Indireta; a falta grave do empregado gera Justa Causa.",
          mensagemErrada:
            "Incorreto. Atraso de salários é culpa da empresa (Rescisão Indireta). Atestado falso é culpa do funcionário (Justa Causa).",
        },
        {
          id: "situacao-atestado-falso",
          rotulo: "O empregado apresenta um atestado médico falso ao RH para abonar dias de falta, configurando ato de improbidade e fraude.",
          regra: { tipo: "selecao", esperado: "justa_causa", opcoes: OPCOES_RESCISAO },
          mensagemCerta: "Perfeito! A falta grave do empregador gera Rescisão Indireta; a falta grave do empregado gera Justa Causa.",
          mensagemErrada:
            "Incorreto. Atraso de salários é culpa da empresa (Rescisão Indireta). Atestado falso é culpa do funcionário (Justa Causa).",
        },
      ],
    },
    {
      id: "assedio-moral-vf",
      titulo: "Assédio Moral x Gestão de Pessoas",
      cenario:
        "O RH frequentemente lida com denúncias de comportamento abusivo. Julgue as condutas abaixo como Verdadeira (V) ou Falsa (F) em relação à caracterização de Assédio Moral:",
      campos: [
        {
          id: "vf-humilhacao-publica-metas",
          rotulo:
            "1. Exigir o cumprimento de metas de forma ríspida, humilhando o funcionário na frente dos colegas e ameaçando-o constantemente de demissão configura Assédio Moral.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta:
            "Correto! Humilhação é Assédio Moral (V). Cobrar resultados e horários é apenas o exercício legal do poder de direção da empresa (F).",
          mensagemErrada:
            "Atenção: humilhação pública é assédio (Afirmação 1 é Verdadeira). Contudo, cobranças profissionais normais NÃO são assédio (Afirmação 2 é Falsa).",
        },
        {
          id: "vf-cobranca-horarios-relatorios",
          rotulo:
            "2. Cobrar relatórios atrasados, realizar reuniões de feedback apontando pontos de melhoria e controlar os horários de entrada/saída do funcionário configuram Assédio Moral.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta:
            "Correto! Humilhação é Assédio Moral (V). Cobrar resultados e horários é apenas o exercício legal do poder de direção da empresa (F).",
          mensagemErrada:
            "Atenção: humilhação pública é assédio (Afirmação 1 é Verdadeira). Contudo, cobranças profissionais normais NÃO são assédio (Afirmação 2 é Falsa).",
        },
      ],
    },
    {
      id: "limite-horas-extras",
      titulo: "Gestão de Jornada e Horas Extras",
      cenario:
        "A gestão de horas trabalhadas é um dos maiores causadores de passivos trabalhistas. Segundo o Art. 59 da CLT, a duração normal do trabalho pode ser acrescida de horas suplementares (horas extras) mediante acordo individual ou convenção coletiva.",
      instrucao: "Qual é o limite máximo legal de horas extras diárias permitidas para um trabalhador em condições normais?",
      campos: [
        {
          id: "limite-horas-extras",
          placeholder: "Digite apenas o número (ex: 4)...",
          regra: { tipo: "padrao", padrao: /^(2|duas)$/i },
          mensagemCerta: "Exato! A CLT estabelece que a jornada normal de trabalho não pode exceder o limite de 2 (duas) horas extras diárias.",
          mensagemErrada: "Incorreto. De acordo com o Art. 59 da CLT, o limite diário é de apenas 2 horas extras.",
        },
      ],
    },
    {
      id: "abandono-emprego-procedimento",
      titulo: "Procedimento para Abandono de Emprego",
      cenario:
        "Um colaborador da área de vendas não comparece à empresa e não atende o telefone há exatos 35 dias consecutivos, sem apresentar qualquer justificativa ou atestado médico.",
      instrucao:
        "Como Analista de Departamento Pessoal, descreva qual deve ser a conduta legal e administrativa da empresa para oficializar o desligamento deste funcionário (Dica: cite a modalidade de rescisão, o prazo característico e a necessidade de notificação formal).",
      campos: [
        {
          id: "abandono-emprego-procedimento",
          placeholder:
            "Ex: O funcionário deve ser demitido por Justa Causa devido ao abandono de emprego, que se caracteriza após 30 dias. A empresa deve enviar uma notificação (telegrama/AR) convocando-o...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /justa causa|abandono|30 dias|trinta dias|notifica|telegrama|aviso|convoca/i,
          },
          mensagemCerta:
            "Excelente parecer! Passados 30 dias consecutivos (Súmula 32 TST), a empresa deve notificar formalmente o funcionário e, não havendo retorno, aplicar a Justa Causa por Abandono de Emprego.",
          mensagemErrada:
            "O caso configura abandono (após 30 dias). Cite que a demissão será por \"Justa Causa\" e que é necessário enviar \"Notificação/Telegrama\" convocando-o.",
        },
      ],
    },
    {
      id: "documento-disciplinar-link",
      titulo: "Redação de Documento Disciplinar",
      cenario:
        "Para que uma penalidade seja válida em um processo trabalhista, ela deve ser formalizada. Utilize o Google Docs para criar um rascunho de um \"Termo de Advertência Escrita\" por atrasos constantes. O documento deve conter espaço para assinatura do empregado e de duas testemunhas.",
      instrucao: "Cole abaixo o link público do seu documento no Google Docs:",
      campos: [
        {
          id: "documento-disciplinar-link",
          placeholder: "https://docs.google.com/document/d/exemplo...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?docs\.google\.com\/.+/i },
          mensagemCerta: "Link validado! Ter um modelo padrão de advertência é essencial para a documentação no DP.",
          mensagemErrada: "URL inválida. Por favor, insira um link de compartilhamento válido do Google Docs (docs.google.com).",
        },
      ],
    },
  ],
};

export default atividade;
