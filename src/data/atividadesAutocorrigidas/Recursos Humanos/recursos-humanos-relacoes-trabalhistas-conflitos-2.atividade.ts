import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_ATO_FALTOSO = [
  { valor: "insubordinacao", texto: "Ato de Insubordinação" },
  { valor: "indisciplina", texto: "Ato de Indisciplina" },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Relações Trabalhistas e Conflitos II",
  introducao: "Atos faltosos (Art. 482 da CLT), acordos coletivos, teletrabalho e direito à desconexão.",
  itens: [
    {
      id: "atos-faltosos-clt",
      titulo: "Diferenciação de Atos Faltosos (Art. 482 CLT)",
      cenario:
        "O RH foi acionado para aplicar sanções. Diferenciar \"Insubordinação\" de \"Indisciplina\" é crucial para a correta notificação legal. Associe a atitude do empregado ao seu respectivo conceito jurídico:",
      campos: [
        {
          id: "situacao-recusa-ordem-direta",
          rotulo:
            "O empregado descumpre uma ordem direta e pessoal dada pelo seu gestor imediato (ex: recusa-se a executar uma tarefa específica que faz parte de seu cargo).",
          regra: { tipo: "selecao", esperado: "insubordinacao", opcoes: OPCOES_ATO_FALTOSO },
          mensagemCerta: "Perfeito! Recusar ordem direta é INSUBORDINAÇÃO. Violar norma geral (regra da empresa) é INDISCIPLINA.",
          mensagemErrada:
            "Incorreto. A ordem direta ao funcionário afeta a Subordinação (Insubordinação). A regra impessoal afeta a Disciplina da empresa (Indisciplina).",
        },
        {
          id: "situacao-violacao-norma-geral",
          rotulo:
            "O empregado viola uma norma geral da empresa, aplicável a todos os funcionários (ex: fuma em local proibido por regulamento interno, não usa crachá).",
          regra: { tipo: "selecao", esperado: "indisciplina", opcoes: OPCOES_ATO_FALTOSO },
          mensagemCerta: "Perfeito! Recusar ordem direta é INSUBORDINAÇÃO. Violar norma geral (regra da empresa) é INDISCIPLINA.",
          mensagemErrada:
            "Incorreto. A ordem direta ao funcionário afeta a Subordinação (Insubordinação). A regra impessoal afeta a Disciplina da empresa (Indisciplina).",
        },
      ],
    },
    {
      id: "acordos-convencoes-coletivas-vf",
      titulo: "Acordos e Convenções Coletivas",
      cenario:
        "O Direito Coletivo do Trabalho regula as relações entre empresas e sindicatos. Julgue as afirmações abaixo como Verdadeira (V) ou Falsa (F):",
      campos: [
        {
          id: "vf-cct-sindicato-x-sindicato",
          rotulo:
            "1. A Convenção Coletiva de Trabalho (CCT) é um pacto firmado entre o Sindicato dos Empregados (laboral) e o Sindicato das Empresas (patronal), aplicando-se a toda a categoria na região.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta:
            "Correto! CCT é acordo Sindicato x Sindicato (V). A Reforma na verdade criou o princípio do \"Negociado sobre o Legislado\" (F).",
          mensagemErrada:
            "Atenção: a Reforma Trabalhista (Art. 611-A) PREVÊ a prevalência do acordo sobre a lei em diversos casos (Afirmação 2 é Falsa).",
        },
        {
          id: "vf-reforma-proibe-acordo-coletivo",
          rotulo:
            "2. Com a Reforma Trabalhista, as negociações sindicais perderam sua validade, sendo totalmente proibido que um Acordo Coletivo prevaleça sobre a legislação (CLT).",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta:
            "Correto! CCT é acordo Sindicato x Sindicato (V). A Reforma na verdade criou o princípio do \"Negociado sobre o Legislado\" (F).",
          mensagemErrada:
            "Atenção: a Reforma Trabalhista (Art. 611-A) PREVÊ a prevalência do acordo sobre a lei em diversos casos (Afirmação 2 é Falsa).",
        },
      ],
    },
    {
      id: "licenca-gala-dias",
      titulo: "Resolução de Conflito de Ponto (Licença Casamento)",
      cenario:
        "Um empregado teve seu contracheque descontado por ter faltado ao trabalho devido ao seu próprio casamento, gerando uma grande discussão com o DP. Para resolver o conflito, o RH consultou o Art. 473 da CLT (Licença Gala).",
      instrucao:
        "Segundo a CLT, por quantos dias consecutivos (número) o empregado pode deixar de comparecer ao serviço em virtude de casamento, sem prejuízo do salário?",
      campos: [
        {
          id: "licenca-gala-dias",
          placeholder: "Digite o número exato...",
          regra: { tipo: "padrao", padrao: /^(3|tr[êe]s)$/i },
          mensagemCerta: "Exato! O Art. 473 garante 3 (três) dias consecutivos de folga remunerada pelo casamento.",
          mensagemErrada: "Incorreto. A resposta exata (segundo a CLT) para licença casamento é de 3 dias.",
        },
      ],
    },
    {
      id: "teletrabalho-direito-desconexao",
      titulo: "Teletrabalho e Direito à Desconexão",
      cenario:
        "O analista de sistemas (que trabalha em regime híbrido) formalizou uma queixa ao RH afirmando que seu gerente envia mensagens via WhatsApp cobrando relatórios todos os dias às 23h30 e exige respostas imediatas. O colaborador relata forte esgotamento mental.",
      instrucao:
        "Atuando como Consultor de RH, como você orientará este gerente? Descreva os riscos legais (ex: horas extras, sobreaviso, dano moral) e a importância de respeitar os limites de jornada (Direito à Desconexão).",
      campos: [
        {
          id: "teletrabalho-direito-desconexao",
          placeholder:
            "Ex: O gerente deve ser orientado a cessar as cobranças fora do horário de trabalho. O desrespeito ao direito à desconexão pode gerar passivos trabalhistas como horas extras e sobreaviso...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 35,
            palavrasChave: /hora extra|sobreaviso|passivo|dano|desconexão|assédio|limite|jornada|expediente/i,
          },
          mensagemCerta:
            "Excelente mediação gerencial! Limitar contatos fora do expediente protege a saúde do colaborador e blinda a empresa contra riscos de Horas Extras e Dano Existencial.",
          mensagemErrada:
            "Você deve citar os riscos atrelados a essa conduta, como \"horas extras\", \"sobreaviso\", \"dano moral\" ou o desrespeito ao \"limite de jornada / desconexão\".",
        },
      ],
    },
    {
      id: "comunicacao-preventiva-link",
      titulo: "Comunicação Oficial Preventiva",
      cenario:
        "Para prevenir o assédio e processos por horas extras invisíveis, a empresa decidiu criar uma regra formal sobre o uso de aplicativos de mensagens fora do expediente. Utilize o Google Docs para redigir o \"Comunicado de Política de Uso de WhatsApp Corporativo\", ou o Canva para criar um aviso interno (cartaz digital) sobre o assunto.",
      instrucao: "Cole abaixo o link público do seu documento (Google Docs ou Canva):",
      campos: [
        {
          id: "comunicacao-preventiva-link",
          placeholder: "https://docs.google.com/... ou https://canva.com/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(docs\.google\.com|canva\.com)\/.+/i },
          mensagemCerta: "Link validado! Formalizar políticas de comunicação é a melhor prevenção contra litígios trabalhistas.",
          mensagemErrada: "URL inválida. Por favor, cole um link público válido gerado pelo Google Docs ou Canva.",
        },
      ],
    },
  ],
};

export default atividade;
