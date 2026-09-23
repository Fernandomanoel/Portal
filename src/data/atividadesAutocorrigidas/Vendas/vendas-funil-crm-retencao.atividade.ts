import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const OPCOES_FUNIL = [
  { valor: "topo", texto: "Topo do Funil (ToFu)" },
  { valor: "fundo", texto: "Fundo do Funil (BoFu)" },
];

const OPCOES_CONTATO = [
  { valor: "suspeitos", texto: "Suspeitos (Suspects)" },
  { valor: "leads", texto: "Leads (Potenciais)" },
];

const OPCOES_CAPTACAO = [
  { valor: "inbound", texto: "Inbound Sales (Receptivo)" },
  { valor: "outbound", texto: "Outbound Sales (Ativo)" },
  { valor: "crm", texto: "Sistema CRM" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Vendas — Gestão de Funil, CRM e Retenção",
  introducao:
    "Desenvolva sua visão estratégica dominando as etapas do Funil de Vendas, estratégias Inbound/Outbound, técnicas de Up-selling/Cross-selling, uso de CRM e cálculo de Ticket Médio. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "funil-jornada",
      titulo: "A Jornada no Funil de Vendas",
      cenario:
        "O Funil de Vendas mapeia a jornada do cliente desde o primeiro contato até a compra. Complete o texto com as etapas corretas:",
      instrucao:
        "Na estratégia comercial, a atração de visitantes desconhecidos ocorre na etapa mais larga, chamada de ___(1)___. Quando esses visitantes demonstram interesse e fornecem seus contatos (como e-mail), eles se tornam ___(2)___ e avançam para o Meio do Funil. Por fim, na etapa de decisão, onde a equipe de vendas apresenta a proposta para fechamento, o cliente encontra-se no ___(3)___.",
      campos: [
        {
          id: "funil-lacuna-1",
          rotulo: "Lacuna 1",
          regra: { tipo: "selecao", esperado: "topo", opcoes: OPCOES_FUNIL },
          mensagemCerta: "O funil inicia no Topo (atração).",
          mensagemErrada: "A atração é no TOPO.",
        },
        {
          id: "funil-lacuna-2",
          rotulo: "Lacuna 2",
          regra: { tipo: "selecao", esperado: "leads", opcoes: OPCOES_CONTATO },
          mensagemCerta: "O visitante que fornece contato transforma-se em Lead (meio do funil).",
          mensagemErrada: "Contatos capturados são LEADS.",
        },
        {
          id: "funil-lacuna-3",
          rotulo: "Lacuna 3",
          regra: { tipo: "selecao", esperado: "fundo", opcoes: OPCOES_FUNIL },
          mensagemCerta: "A venda fecha no Fundo do funil.",
          mensagemErrada: "A conversão ocorre no FUNDO do funil.",
        },
      ],
    },
    {
      id: "upsell-crosssell",
      titulo: "Técnicas de Aumento de Faturamento",
      cenario:
        "Vender mais para quem já está comprando é vital para o lucro. Avalie as afirmações sobre Cross-selling (Venda Cruzada) e Up-selling:",
      campos: [
        {
          id: "cross-selling",
          rotulo:
            "1. Cross-selling (Venda Cruzada) é a técnica de oferecer produtos ou serviços complementares ao que o cliente está comprando (Ex: oferecer batata frita e refrigerante para quem compra um hambúrguer).",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Cross-sell é a venda complementar (V).",
          mensagemErrada: "A primeira afirmação (Cross-sell) é Verdadeira.",
        },
        {
          id: "up-selling",
          rotulo:
            "2. Up-selling ocorre quando o vendedor convence o cliente a cancelar a compra atual para procurar um produto mais barato na concorrência.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta:
            "Up-selling é oferecer uma versão superior/Premium do produto para o cliente, e não mandá-lo para o concorrente (F).",
          mensagemErrada:
            "A segunda é Falsa, pois Up-selling visa fazer o cliente gastar mais levando um produto melhor, não mais barato na concorrência.",
        },
      ],
    },
    {
      id: "ticket-medio",
      titulo: "Apuração do Ticket Médio",
      cenario:
        "O Ticket Médio representa o valor médio que cada cliente gasta na sua empresa. É um dos KPIs (Indicadores-chave) mais importantes em vendas.",
      instrucao: "Fórmula: Faturamento Total ÷ Número de Vendas. Calcule e digite o Ticket Médio das vendas de Carlos (apenas o número em Reais, ex: 150):",
      tabelaReferencia: {
        colunas: ["Indicador de Desempenho", "Resultado"],
        linhas: [
          ["Faturamento Total do Dia", "R$ 2.500,00"],
          ["Número Total de Vendas (Pedidos Fechados)", "5 vendas"],
        ],
      },
      campos: [
        {
          id: "ticket-medio",
          placeholder: "Exemplo: 200",
          regra: { tipo: "numero", esperado: 500 },
          mensagemCerta:
            "Cálculo exato! Dividindo o faturamento de R$ 2.500,00 por 5 vendas, chegamos ao Ticket Médio de R$ 500,00 por cliente.",
          mensagemErrada: "Incorreto. Para achar o Ticket Médio, divida o Faturamento Total (2500) pelo Número de Vendas (5).",
        },
      ],
    },
    {
      id: "captacao-crm",
      titulo: "Captação de Clientes e Ferramentas",
      cenario:
        "A forma como a empresa busca clientes e organiza essas informações define seu modelo comercial. Associe o conceito à sua respectiva estratégia/ferramenta:",
      campos: [
        {
          id: "captacao-outbound",
          rotulo:
            "Estratégia onde o vendedor vai ativamente atrás do cliente, através de ligações frias (cold calls), e-mails de prospecção e visitas porta a porta.",
          regra: { tipo: "selecao", esperado: "outbound", opcoes: OPCOES_CAPTACAO },
          mensagemCerta: "Prospecção ativa é Outbound.",
          mensagemErrada: "Ir atrás do cliente = Outbound.",
        },
        {
          id: "captacao-inbound",
          rotulo:
            "Estratégia onde o cliente chega até a empresa atraído por marketing de conteúdo, redes sociais, anúncios ou indicações. O vendedor atua de forma receptiva.",
          regra: { tipo: "selecao", esperado: "inbound", opcoes: OPCOES_CAPTACAO },
          mensagemCerta: "Atração receptiva é Inbound.",
          mensagemErrada: "Cliente vir até a empresa = Inbound.",
        },
        {
          id: "captacao-crm-software",
          rotulo:
            "Software utilizado pela equipe para registrar todo o histórico de conversas, negociações, dados e preferências dos clientes em um único lugar.",
          regra: { tipo: "selecao", esperado: "crm", opcoes: OPCOES_CAPTACAO },
          mensagemCerta: "A gestão de relacionamento é feita no CRM.",
          mensagemErrada: "Software de registro = CRM.",
        },
      ],
    },
    {
      id: "follow-up-ghosting",
      titulo: "Estratégia de Follow-up (Acompanhamento)",
      cenario:
        "Cenário: Você teve uma ótima reunião com um cliente B2B e enviou a proposta comercial na segunda-feira. Hoje é quinta-feira e o cliente não respondeu mais às suas mensagens (o famoso \"sumiço\" ou ghosting).",
      instrucao:
        "Como você deve realizar o Follow-up (acompanhamento) hoje, sem ser inconveniente ou implorar pela venda? (Mínimo de 10 palavras). Dica: utilize palavras como \"dúvida\", \"ajuda\", \"valor\", \"retorno\" ou \"feedback\".",
      campos: [
        {
          id: "follow-up-ghosting",
          placeholder:
            "Ex: Devo fazer um contato focado em gerar valor, perguntando se ele teve alguma dúvida sobre a proposta enviada e me colocando à disposição para ajudar...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /dúvida|dúvidas|ajuda|ajudar|valor|retorno|feedback|contato|acompanhamento/i,
          },
          mensagemCerta:
            "Estratégia perfeita! O bom follow-up não cobra a venda, ele se coloca à disposição para ajudar e tirar dúvidas, reativando a conversa naturalmente.",
          mensagemErrada:
            "Seu follow-up deve usar abordagens consultivas. Mencione oferecer 'ajuda', tirar uma 'dúvida' ou pedir um 'feedback' em vez de apenas cobrar.",
        },
      ],
    },
  ],
};

export default atividade;
