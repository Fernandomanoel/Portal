import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const OPCOES_FECHAMENTO = [
  { valor: "assuncao", texto: "Fechamento por Assunção (Assumptivo)" },
  { valor: "alternativo", texto: "Fechamento Alternativo (Ou/Ou)" },
  { valor: "urgencia", texto: "Fechamento por Urgência (Escassez)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Técnicas de Vendas na Linha de Frente",
  introducao:
    "Aprimore suas habilidades de \"chão de loja\" e vendas corporativas. Pratique a qualificação de leads com o método BANT, técnicas persuasivas de fechamento, ligações frias (Cold Call) e cálculo de comissionamento. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "bant-qualificacao",
      titulo: "Qualificação de Leads: Método BANT",
      cenario:
        "O vendedor corporativo não pode perder tempo com quem não tem perfil de compra. O método BANT é mundialmente usado para qualificar potenciais clientes (Leads). Complete as lacunas com o significado de cada letra:",
      instrucao:
        "A letra B (Budget) serve para descobrir se o cliente possui ___(1)___ para a compra. A letra A (Authority) mapeia se a pessoa com quem você fala tem ___(2)___. O N (Need) verifica a real ___(3)___ do negócio dele, e o T (Timeline) define qual é o ___(4)___ a solução.",
      campos: [
        {
          id: "bant-budget",
          rotulo: "Lacuna 1 — Budget (B)",
          regra: {
            tipo: "selecao",
            esperado: "orcamento",
            opcoes: [
              { valor: "orcamento", texto: "Orçamento / Verba" },
              { valor: "tempo", texto: "Tempo disponível" },
            ],
          },
          mensagemCerta: "Budget = Orçamento.",
        },
        {
          id: "bant-authority",
          rotulo: "Lacuna 2 — Authority (A)",
          regra: {
            tipo: "selecao",
            esperado: "poder",
            opcoes: [
              { valor: "interesse", texto: "Interesse no produto" },
              { valor: "poder", texto: "Poder de decisão" },
            ],
          },
          mensagemCerta: "Authority = Poder de Decisão.",
        },
        {
          id: "bant-need",
          rotulo: "Lacuna 3 — Need (N)",
          regra: {
            tipo: "selecao",
            esperado: "necessidade",
            opcoes: [
              { valor: "necessidade", texto: "Necessidade / Dor" },
              { valor: "nobreza", texto: "Nobreza do cargo" },
            ],
          },
          mensagemCerta: "Need = Necessidade.",
        },
        {
          id: "bant-timeline",
          rotulo: "Lacuna 4 — Timeline (T)",
          regra: {
            tipo: "selecao",
            esperado: "prazo",
            opcoes: [
              { valor: "prazo", texto: "Prazo para implementar" },
              { valor: "telefone", texto: "Telefone de contato" },
            ],
          },
          mensagemCerta: "Timeline = Prazo.",
        },
      ],
    },
    {
      id: "b2b-vs-b2c",
      titulo: "Modelos de Venda: B2B vs B2C",
      cenario:
        "A abordagem do vendedor muda completamente dependendo de quem está comprando. Avalie as afirmações sobre os modelos comerciais:",
      campos: [
        {
          id: "b2b-caracteristicas",
          rotulo:
            "1. Nas vendas B2B (Empresa vende para Empresa), o ciclo de decisão costuma ser mais longo, mais racional e envolve múltiplos decisores (Diretor, Compras, Financeiro).",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Vendas B2B são racionais, longas e complexas (V).",
          mensagemErrada: "A primeira é Verdadeira (B2B é complexo).",
        },
        {
          id: "b2c-caracteristicas",
          rotulo:
            "2. Nas vendas B2C (Empresa vende para o Consumidor Final), a compra é estritamente burocrática, sem apelo emocional, exigindo sempre a assinatura de contratos com 3 meses de negociação.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta: "Vendas B2C (para o consumidor final) costumam ser emocionais, curtas e menos burocráticas (F).",
          mensagemErrada: "A segunda é Falsa (B2C geralmente não exige contratos mensais ou 3 meses de negociação).",
        },
      ],
    },
    {
      id: "gatilhos-fechamento",
      titulo: "Gatilhos e Técnicas de Fechamento",
      cenario:
        "O fechamento da venda (\"closing\") exige atitude. Relacione a fala do vendedor com a técnica de fechamento que ele está utilizando:",
      campos: [
        {
          id: "fechamento-assuncao",
          rotulo: "\"Vou preparar a papelada então. Qual será o CNPJ que devo colocar no contrato?\"",
          regra: { tipo: "selecao", esperado: "assuncao", opcoes: OPCOES_FECHAMENTO },
          mensagemCerta: "CNPJ = Assume que vendeu.",
          mensagemErrada: "Já pedir o CNPJ = Assunção.",
        },
        {
          id: "fechamento-alternativo",
          rotulo:
            "\"Para a entrega dos produtos na sua casa, você prefere que seja agendado na terça de manhã ou na quarta à tarde?\"",
          regra: { tipo: "selecao", esperado: "alternativo", opcoes: OPCOES_FECHAMENTO },
          mensagemCerta: "Terça ou Quarta = Dá alternativas ilusórias.",
          mensagemErrada: "Oferecer opções de dia = Alternativo.",
        },
        {
          id: "fechamento-urgencia",
          rotulo:
            "\"Consigo segurar esse desconto de 20% somente até o final do dia, amanhã o sistema roda a nova tabela de preços do mês.\"",
          regra: { tipo: "selecao", esperado: "urgencia", opcoes: OPCOES_FECHAMENTO },
          mensagemCerta: "Último dia = Gera urgência.",
          mensagemErrada: "Dizer que o desconto expira amanhã = Urgência.",
        },
      ],
    },
    {
      id: "comissao-julia",
      titulo: "Comissão com Bônus Acelerador",
      cenario:
        "O bom vendedor sabe exatamente quanto vai receber no fim do mês. Calcule o ganho total do vendedor de acordo com o plano de incentivo da empresa.",
      instrucao:
        "Fórmula: (Vendas × 3%) + Bônus. Calcule e digite o valor TOTAL (Comissão + Bônus) que Julia vai receber (apenas números em Reais, ex: 1500):",
      tabelaReferencia: {
        colunas: ["Parâmetro do Mês", "Valor Alcançado"],
        linhas: [
          ["Total de Vendas Faturadas", "R$ 50.000,00"],
          ["Percentual de Comissão Base", "3% sobre as vendas"],
          ["Bônus Fixo por Bater a Meta do Mês", "R$ 500,00 extras"],
        ],
      },
      campos: [
        {
          id: "comissao-julia",
          placeholder: "Exemplo: 1200",
          regra: { tipo: "numero", esperado: 2000 },
          mensagemCerta:
            "Cálculo exato! 3% de R$ 50.000 = R$ 1.500. Somando ao Bônus de R$ 500, Julia recebe um total de R$ 2.000,00.",
          mensagemErrada: "Incorreto. Calcule 3% de 50.000 (que resulta em 1500) e adicione o bônus fixo de 500.",
        },
      ],
    },
    {
      id: "cold-call-abertura",
      titulo: "Abordagem em Cold Call (Ligação Fria)",
      cenario:
        "Cenário: Você conseguiu o telefone direto do Diretor de uma grande empresa que nunca ouviu falar de você. Você tem cerca de 10 segundos para não deixá-lo desligar o telefone.",
      instrucao:
        "Escreva qual seria a sua frase de abertura para quebrar o gelo e prender a atenção dele (Mínimo de 10 palavras). Dica: Utilize palavras como \"motivo\", \"tempo\", \"ajudar\", \"atenção\", \"rápido\" ou \"desafio\".",
      campos: [
        {
          id: "cold-call-abertura",
          placeholder: "Ex: Olá [Nome], sei que seu tempo é corrido, o motivo desta ligação rápida é ajudar vocês a resolverem o desafio de...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /motivo|tempo|ajudar|ajuda|atenção|rápido|rápida|desafio|solução|problema|interesse/i,
          },
          mensagemCerta:
            "Script comercial promissor! Ser transparente com o motivo da ligação, respeitar o tempo do cliente e focar em ajudá-lo evita que o telefone seja desligado na sua cara.",
          mensagemErrada:
            "Em uma ligação fria, é crucial respeitar o 'tempo', dar o 'motivo' rápido ou citar que veio 'ajudar' em um 'desafio'.",
        },
      ],
    },
  ],
};

export default atividade;
