import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];
const PASSOS = [
  { valor: "1", texto: "1º Passo" },
  { valor: "2", texto: "2º Passo" },
  { valor: "3", texto: "3º Passo" },
  { valor: "4", texto: "4º Passo" },
];

const M1_OK = "Perfeito! O fluxo de viagem corporativa inicia no Itinerário, segue para as Diárias e encerra na Prestação de Contas.";
const M1_ERRO =
  "Incorreto. A ordem lógica é: elaborar o Itinerário, usar as Diárias durante a viagem e fazer a Prestação de Contas na volta.";
const M2_OK =
  "Correto! O método Alfabético é direto (V). O método Ideográfico organiza por assunto/tema, e não aleatoriamente por cores (F).";
const M2_ERRO =
  "Atenção: A primeira afirmação é Verdadeira. A segunda é Falsa, pois o método Ideográfico foca estritamente no ASSUNTO principal do documento.";
const M4_OK =
  "Excelente organização! A cronologia é: 1º Briefing, 2º Infraestrutura/Fornecedores, 3º RSVP (Convites) e 4º Pós-evento.";
const M4_ERRO = "Incorreto. A ordem lógica é: 1. Briefing -> 2. Contratação -> 3. RSVP (Convites) -> 4. Pós-evento.";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Secretariado Executivo — Viagens, Eventos e Arquivo",
  introducao:
    "Planejamento de viagens, relatórios de despesas, organização de eventos (RSVP), métodos de arquivamento e resolução analítica de conflitos de agenda.",
  itens: [
    {
      id: "viagens",
      titulo: "Gestão de Viagens Corporativas",
      cenario:
        "Na preparação de uma viagem corporativa, o primeiro passo da secretária é elaborar o ___(1)___, contendo horários de voos, hotéis e reuniões. Durante a viagem, o executivo utiliza as ___(2)___ para cobrir despesas de alimentação e transporte local. Ao retornar à base, o profissional tem a obrigação legal e corporativa de realizar a ___(3)___, apresentando todas as notas fiscais e recibos comprobatórios ao setor financeiro.",
      instrucao: "Complete as lacunas com os termos técnicos corretos da rotina de viagens.",
      campos: [
        {
          id: "sec2-l1",
          rotulo: "Lacuna 1",
          regra: {
            tipo: "selecao",
            esperado: "itinerario",
            opcoes: [
              { valor: "itinerario", texto: "Itinerário (Roteiro)" },
              { valor: "balanco", texto: "Balanço Patrimonial" },
            ],
          },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec2-l2",
          rotulo: "Lacuna 2",
          regra: {
            tipo: "selecao",
            esperado: "diarias",
            opcoes: [
              { valor: "ferias", texto: "Férias proporcionais" },
              { valor: "diarias", texto: "Diárias / Adiantamentos" },
            ],
          },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec2-l3",
          rotulo: "Lacuna 3",
          regra: {
            tipo: "selecao",
            esperado: "prestacao",
            opcoes: [
              { valor: "prestacao", texto: "Prestação de Contas" },
              { valor: "auditoria", texto: "Auditoria Externa" },
            ],
          },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
      ],
    },
    {
      id: "arquivamento",
      titulo: "Métodos de Arquivamento",
      cenario:
        "A gestão documental eficiente previne a perda de informações críticas. Julgue as afirmações sobre métodos de arquivamento como Verdadeira (V) ou Falsa (F).",
      campos: [
        {
          id: "sec2-vf1",
          rotulo:
            "O método de arquivamento Alfabético é considerado um método \"direto\", pois a busca pelo documento é feita diretamente pelo nome, não exigindo a consulta prévia a um índice numérico.",
          regra: { tipo: "selecao", esperado: "V", opcoes: VF },
          mensagemCerta: M2_OK,
          mensagemErrada: M2_ERRO,
        },
        {
          id: "sec2-vf2",
          rotulo:
            "No método Ideográfico (ou por assunto), os documentos são arquivados aleatoriamente com base na cor da pasta, ignorando completamente o tema central do documento.",
          regra: { tipo: "selecao", esperado: "F", opcoes: VF },
          mensagemCerta: M2_OK,
          mensagemErrada: M2_ERRO,
        },
      ],
    },
    {
      id: "rdv",
      titulo: "Relatório de Despesas de Viagem (RDV)",
      cenario:
        "O Diretor Comercial retornou de São Paulo e entregou seus comprovantes. Você precisa fechar o Relatório de Despesas. Ele recebeu um adiantamento, mas não gastou tudo.",
      tabelaReferencia: {
        colunas: ["Movimentação", "Valor (R$)"],
        linhas: [
          ["(+) Adiantamento fornecido pela empresa", "R$ 1.500,00"],
          ["(−) Hotel (3 diárias)", "R$ 750,00"],
          ["(−) Alimentação (almoço/jantar)", "R$ 320,00"],
          ["(−) Táxi / aplicativo", "R$ 130,00"],
          ["Total gasto comprovado", "R$ 1.200,00"],
        ],
      },
      instrucao: "Fórmula: adiantamento − gasto total. Digite o valor que o diretor deve DEVOLVER ao caixa da empresa (R$).",
      campos: [
        {
          id: "sec2-m3-input",
          placeholder: "Digite apenas o número (Ex: 150)...",
          regra: { tipo: "numero", esperado: 300 },
          mensagemCerta: "Cálculo exato! R$ 1.500,00 (Adiantamento) - R$ 1.200,00 (Total Gasto) = R$ 300,00 de devolução ao caixa.",
          mensagemErrada: "Incorreto. Subtraia o Total Gasto Comprovado (1200) do Adiantamento Recebido (1500).",
        },
      ],
    },
    {
      id: "eventos",
      titulo: "Organização de Eventos Corporativos",
      instrucao: "Ordene corretamente as etapas lógicas de planejamento de um evento (do 1º ao 4º passo).",
      campos: [
        {
          id: "sec2-ord1",
          rotulo: "Briefing inicial: definição do objetivo, público-alvo, data e orçamento disponível.",
          regra: { tipo: "selecao", esperado: "1", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
        {
          id: "sec2-ord2",
          rotulo: "Contratação da infraestrutura: escolha do local, fornecedores de A/V (Áudio e Vídeo) e Buffet (Catering).",
          regra: { tipo: "selecao", esperado: "2", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
        {
          id: "sec2-ord3",
          rotulo: "RSVP: envio de convites e gestão do controle de confirmação de presença dos convidados.",
          regra: { tipo: "selecao", esperado: "3", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
        {
          id: "sec2-ord4",
          rotulo:
            "Pós-evento: envio de cartas de agradecimento, pesquisa de satisfação e fechamento financeiro (relatório de custos).",
          regra: { tipo: "selecao", esperado: "4", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
      ],
    },
    {
      id: "conflito-agenda",
      titulo: "Conflito de Agendas (Double Booking)",
      cenario:
        "Por uma falha no sistema de agendamento, o Diretor de Marketing e o Diretor Financeiro reservaram a Sala de Reuniões Premium (a única com equipamento de videoconferência internacional) para as 14:00 de hoje. Ambos estão irritados e alegam que suas reuniões são inadiáveis.",
      instrucao:
        "Descreva qual seria sua atitude imediata para gerenciar e resolver diplomaticamente este conflito. Utilize palavras como \"negociar\", \"prioridade\", \"remanejar\", \"alternativa\" ou \"outra sala\".",
      campos: [
        {
          id: "sec2-m5-dissertativa",
          placeholder: "Ex: Devo tentar negociar com ambos, verificando a real prioridade de cada reunião...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /negociar|negociação|prioridade|remanejar|alternativa|outra sala|virtual|transferir|diplomacia/i,
          },
          mensagemCerta:
            "Diagnóstico perfeito! A postura executiva exige inteligência emocional para investigar qual reunião exige a sala premium (ex: vídeoconferência) e negociar opções com o outro diretor.",
          mensagemErrada:
            "Aja como conciliadora. Mencione que iria 'negociar' analisando a 'prioridade', tentar 'remanejar' um dos diretores ou buscar uma sala 'alternativa'.",
        },
      ],
    },
  ],
};

export default atividade;
