import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const DOCUMENTOS = [
  { valor: "ata", texto: "Ata" },
  { valor: "memorando", texto: "Memorando (Comunicação Interna)" },
  { valor: "oficio", texto: "Ofício" },
];
const VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];
const REUNIAO = [
  { valor: "pauta", texto: "Pauta (Ordem do Dia)" },
  { valor: "ata", texto: "Ata Final" },
];

const M1_OK = "Perfeito! Ofício para fora, Memorando (CI) para comunicação interna e Ata para registrar decisões de reuniões.";
const M1_ERRO = "Incorreto. Lembre-se: Ofício = Externo (Autoridades), Memorando = Interno (Breve), Ata = Registro de Reunião.";
const M2_OK =
  "Correto! O atendimento deve ser padronizado e profissional (V). A confidencialidade é a regra de ouro do secretariado, não se vaza informações da diretoria (F).";
const M2_ERRO =
  "Atenção: O protocolo de telefone está correto (Verdadeiro). Mas a quebra de sigilo por 'amizade' é uma infração gravíssima no trabalho (Falso).";
const M3_OK = "Excelente! A Pauta orienta o pré-reunião, a Ata documenta o pós-reunião e a Agenda organiza o tempo.";
const M3_ERRO = "Incorreto. A ordem é: envia-se a PAUTA antes, escreve-se a ATA depois e gerencia-se a AGENDA.";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Rotinas de Secretariado e Assessoria Administrativa",
  introducao:
    "Desenvolva suas competências em rotinas administrativas, redação oficial, gestão de agenda, etiqueta corporativa e controle de pequenos fluxos de caixa (fundo fixo).",
  itens: [
    {
      id: "documentos",
      titulo: "Documentos e Redação Oficial",
      instrucao: "Relacione a finalidade descrita ao tipo correto de documento corporativo/oficial.",
      campos: [
        {
          id: "sec-m1-a1",
          rotulo: "Comunicação oficial e formal, geralmente externa, direcionada a autoridades públicas, órgãos governamentais ou outras empresas.",
          regra: { tipo: "selecao", esperado: "oficio", opcoes: DOCUMENTOS },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec-m1-a2",
          rotulo: "Correspondência interna, breve e direta, utilizada para comunicação entre setores, departamentos ou filiais da mesma instituição.",
          regra: { tipo: "selecao", esperado: "memorando", opcoes: DOCUMENTOS },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec-m1-a3",
          rotulo: "Registro formal e escrito de todos os fatos, discussões e decisões tomadas durante uma reunião, congresso ou assembleia.",
          regra: { tipo: "selecao", esperado: "ata", opcoes: DOCUMENTOS },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
      ],
    },
    {
      id: "etica",
      titulo: "Postura, Ética e Atendimento",
      cenario:
        "A secretária(o) é frequentemente o primeiro ponto de contato e lida com informações sensíveis. Avalie as atitudes abaixo como verdadeiras ou falsas.",
      campos: [
        {
          id: "sec-m2-vf1",
          rotulo:
            "Ao realizar um atendimento telefônico profissional, a secretária deve iniciar a ligação identificando o nome da empresa, o próprio nome, o setor e utilizando uma saudação cordial (ex: \"Empresa X, Maria da Diretoria, bom dia!\").",
          regra: { tipo: "selecao", esperado: "V", opcoes: VF },
          mensagemCerta: M2_OK,
          mensagemErrada: M2_ERRO,
        },
        {
          id: "sec-m2-vf2",
          rotulo:
            "Em prol da \"transparência\", é dever do profissional de secretariado compartilhar informações sigilosas da diretoria (como demissões futuras ou fusões) com os colegas que perguntarem amigavelmente.",
          regra: { tipo: "selecao", esperado: "F", opcoes: VF },
          mensagemCerta: M2_OK,
          mensagemErrada: M2_ERRO,
        },
      ],
    },
    {
      id: "reunioes",
      titulo: "Planejamento de Reuniões e Agenda",
      cenario:
        "Para garantir que todos cheguem preparados e o assunto não desvie, o profissional de secretariado deve elaborar e enviar a ___(1)___ previamente aos participantes. Durante o encontro, faz-se as anotações necessárias para que, posteriormente, seja redigida a ___(2)___ com as deliberações. Tudo isso exige uma rigorosa gestão da ___(3)___, lembrando sempre de prever tempo hábil para deslocamentos entre compromissos externos.",
      instrucao: "Complete as lacunas com os termos corretos do fluxo de uma reunião.",
      campos: [
        {
          id: "sec-m3-l1",
          rotulo: "Lacuna 1",
          regra: { tipo: "selecao", esperado: "pauta", opcoes: REUNIAO },
          mensagemCerta: M3_OK,
          mensagemErrada: M3_ERRO,
        },
        {
          id: "sec-m3-l2",
          rotulo: "Lacuna 2",
          regra: { tipo: "selecao", esperado: "ata", opcoes: REUNIAO },
          mensagemCerta: M3_OK,
          mensagemErrada: M3_ERRO,
        },
        {
          id: "sec-m3-l3",
          rotulo: "Lacuna 3",
          regra: {
            tipo: "selecao",
            esperado: "agenda",
            opcoes: [
              { valor: "agenda", texto: "Agenda" },
              { valor: "contabilidade", texto: "Contabilidade" },
            ],
          },
          mensagemCerta: M3_OK,
          mensagemErrada: M3_ERRO,
        },
      ],
    },
    {
      id: "fundo-fixo",
      titulo: "Controle de Fundo Fixo (Caixinha)",
      cenario:
        "O \"Fundo Fixo\" ou \"Caixinha\" é um adiantamento em dinheiro confiado à secretária para pagar pequenas despesas emergenciais (correios, táxi, café) sem precisar passar pela burocracia do financeiro a cada gasto.",
      tabelaReferencia: {
        colunas: ["Movimentação", "Valor (R$)"],
        linhas: [
          ["Saldo inicial do fundo no mês", "R$ 800,00"],
          ["Gasto 1: Despesas com Correios (SEDEX)", "R$ 250,00"],
          ["Gasto 2: Pagamento de Táxi/Aplicativo", "R$ 150,00"],
          ["Gasto 3: Compra de insumos (Coffee Break)", "R$ 100,00"],
        ],
      },
      instrucao: "Saldo = Inicial − (soma dos gastos). Digite o saldo restante em dinheiro que deve estar no cofre/gaveta.",
      campos: [
        {
          id: "sec-m4-input",
          placeholder: "Exemplo: 200",
          regra: { tipo: "numero", esperado: 300 },
          mensagemCerta: "Cálculo exato! R$ 800 (Inicial) - R$ 500 (Total de despesas) resulta em R$ 300,00 restantes em caixa.",
          mensagemErrada: "Incorreto. Some todos os gastos (250 + 150 + 100) e subtraia do valor inicial de 800.",
        },
      ],
    },
    {
      id: "gestao-crise",
      titulo: "Contorno de Imprevistos e Gestão de Crise",
      cenario:
        "Sua diretora foi realizar uma visita em outro estado. O voo de volta dela atrasou devido ao mau tempo, e ela se atrasará pelo menos 2 horas para chegar ao escritório. O problema é que um cliente importantíssimo (VIP) já está na recepção esperando para a reunião presencial.",
      instrucao:
        "Qual deve ser a sua postura imediata com o cliente na recepção? Descreva sua ação usando palavras como \"acomodar\", \"avisar\", \"desculpas\", \"café/água\", \"remarcar\" ou \"online\".",
      campos: [
        {
          id: "sec-m5-dissertativa",
          placeholder: "Ex: Eu iria até a recepção, ofereceria minhas desculpas e um café...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /acomodar|recepção|espera|avisar|informar|desculpa|desculpas|café|água|remarcar|online|virtual/i,
          },
          mensagemCerta:
            "Ótima conduta profissional! A transparência sobre o imprevisto, aliada à hospitalidade e oferecimento de alternativas, preserva a imagem da empresa.",
          mensagemErrada:
            "Faltou agir de forma hospitaleira e resolutiva. Mencione que vai 'acomodar' com 'café/água', 'avisar' o cliente e 'remarcar' ou sugerir via 'online'.",
        },
      ],
    },
  ],
};

export default atividade;
