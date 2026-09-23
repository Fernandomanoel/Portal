import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_SUBSISTEMA_RH = [
  { valor: "RS", texto: "Recrutamento e Seleção" },
  { valor: "TD", texto: "Treinamento e Desenvolvimento" },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Assistente de Recursos Humanos",
  introducao: "Divisões do subsistema de RH, cargos e salários, classificação de cargos e divulgação de vaga.",
  itens: [
    {
      id: "divisoes-subsistema-rh",
      titulo: "Divisões do Subsistema de RH",
      cenario:
        "O setor de Recursos Humanos é dividido em vários subsistemas. Relacione a atividade descrita ao seu respectivo processo no RH:",
      campos: [
        {
          id: "subsistema-vagas-entrevistas",
          rotulo: "Divulgação de vagas, triagem de currículos e condução de entrevistas para preencher posições em aberto.",
          regra: { tipo: "selecao", esperado: "RS", opcoes: OPCOES_SUBSISTEMA_RH },
          mensagemCerta:
            "Correto! Recrutamento & Seleção (R&S) traz talentos externos; Treinamento & Desenvolvimento (T&D) foca em capacitar o talento interno.",
          mensagemErrada: "Incorreto. Atrair candidatos é função de Recrutamento & Seleção. Capacitar funcionários é função de T&D.",
        },
        {
          id: "subsistema-trilhas-onboarding",
          rotulo: "Criação de trilhas de aprendizagem, onboarding de novos funcionários e capacitação técnica das equipes.",
          regra: { tipo: "selecao", esperado: "TD", opcoes: OPCOES_SUBSISTEMA_RH },
          mensagemCerta:
            "Correto! Recrutamento & Seleção (R&S) traz talentos externos; Treinamento & Desenvolvimento (T&D) foca em capacitar o talento interno.",
          mensagemErrada: "Incorreto. Atrair candidatos é função de Recrutamento & Seleção. Capacitar funcionários é função de T&D.",
        },
      ],
    },
    {
      id: "cargos-remuneracao-vf",
      titulo: "Cargos e Salários / Remuneração",
      cenario:
        "Julgue as afirmações normativas sobre estruturação de cargos e políticas de remuneração da empresa como Verdadeira (V) ou Falsa (F):",
      campos: [
        {
          id: "vf-descricao-cargos",
          rotulo:
            "1. A Descrição de Cargos é essencial pois define as responsabilidades, requisitos e serve de base para justificar a hierarquia salarial da empresa.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta:
            "Excelente! O cargo orienta a gestão (V). Remuneração é um pacote total (salário + benefícios + bônus), diferente do simples \"Salário\" (F).",
          mensagemErrada:
            "Atenção: a descrição de cargos é base para salários (Afirmação 1 é Verdadeira). Remuneração engloba salário e benefícios em conjunto (Afirmação 2 é Falsa).",
        },
        {
          id: "vf-remuneracao-sinonimo-salario",
          rotulo:
            "2. O termo \"Remuneração\" é sinônimo restrito de \"Salário\", englobando exclusivamente o valor fixo mensal, não fazendo parte dela os benefícios sociais e comissões.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta:
            "Excelente! O cargo orienta a gestão (V). Remuneração é um pacote total (salário + benefícios + bônus), diferente do simples \"Salário\" (F).",
          mensagemErrada:
            "Atenção: a descrição de cargos é base para salários (Afirmação 1 é Verdadeira). Remuneração engloba salário e benefícios em conjunto (Afirmação 2 é Falsa).",
        },
      ],
    },
    {
      id: "classificacao-cbo",
      titulo: "Classificação de Cargos",
      cenario:
        "Ao estruturar o plano de cargos e salários ou realizar registros no Departamento Pessoal, o profissional de RH precisa consultar o documento oficial do governo brasileiro que reconhece, nomeia e codifica as ocupações do mercado de trabalho.",
      instrucao: "Qual é a sigla de 3 letras utilizada para nomear essa Classificação Brasileira de Ocupações?",
      campos: [
        {
          id: "classificacao-cbo",
          placeholder: "Digite a sigla (Ex: CLT)...",
          regra: { tipo: "padrao", padrao: /^cbo$/i },
          mensagemCerta: "Exato! A CBO (Classificação Brasileira de Ocupações) é o documento padrão nacional para nomenclatura de cargos.",
          mensagemErrada: "Incorreto. A sigla correta composta por 3 letras é CBO (Classificação Brasileira de Ocupações).",
        },
      ],
    },
    {
      id: "conflito-marketing-mediacao",
      titulo: "Relações Interpessoais e Conflitos",
      cenario:
        "Dois analistas do setor de marketing entraram em um atrito severo devido a uma falha de comunicação, afetando o clima organizacional e a entrega do projeto. A gestão solicitou a intervenção do RH.",
      instrucao:
        "Como profissional de Recursos Humanos, descreva sua conduta inicial para resolver o impasse. Sua resposta deve demonstrar postura ética e técnica, mencionando a importância de ouvir, promover o diálogo ou atuar como mediador/dar feedback.",
      campos: [
        {
          id: "conflito-marketing-mediacao",
          placeholder:
            "Ex: O RH deve atuar como mediador, chamando os colaboradores para uma reunião privada. O objetivo é ouvir ativamente ambas as partes, promover o diálogo pacífico e fornecer um feedback construtivo...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /ouvir|escuta|diálogo|mediador|mediação|reunião|feedback|empatia|ética/i,
          },
          mensagemCerta:
            "Ótimo posicionamento! O profissional de RH atua com ética sendo um facilitador neutro, promovendo o diálogo e reestabelecendo o clima organizacional.",
          mensagemErrada:
            "A conduta exige intervenção interpessoal. Utilize palavras que mostrem o papel do RH, como \"mediar\", \"ouvir\" as partes, dar \"feedback\" ou promover o \"diálogo\".",
        },
      ],
    },
    {
      id: "divulgacao-vaga-link",
      titulo: "Divulgação de Vaga",
      cenario:
        "O alinhamento da comunicação visual da empresa e o uso correto das mídias sociais são vitais na Atração de Talentos. Utilize a ferramenta Canva para criar um layout simples de um \"Anúncio de Vaga\" ou o Google Docs para montar o roteiro de Descrição do Cargo para postar no LinkedIn.",
      instrucao: "Cole abaixo o link público do seu arquivo (Canva ou Google Docs):",
      campos: [
        {
          id: "divulgacao-vaga-link",
          placeholder: "https://www.canva.com/design/... ou docs.google.com",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(canva\.com|docs\.google\.com)\/.+/i },
          mensagemCerta: "Link validado! Ótima aplicação prática da teoria de comunicação visual e de cargos.",
          mensagemErrada: "URL inválida. Cole o link público válido do Canva (canva.com) ou Google Docs (docs.google.com).",
        },
      ],
    },
  ],
};

export default atividade;
