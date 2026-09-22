import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Crédito e Cobrança II — Credit Scoring, Garantias e Títulos Executivos",
  introducao:
    "Credit scoring, tipos de garantia e títulos executivos usados na cobrança. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "credit-scoring",
      titulo: "Modelagem de Crédito: Credit Scoring e Probabilidade de Default",
      cenario: "Os modelos modernos de Credit Scoring utilizam inteligência estatística para atribuir uma pontuação aos tomadores.",
      instrucao: "Qual é a principal função do Score de Crédito na mesa de aprovação?",
      campos: [
        {
          id: "credit-scoring-resposta",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Garantir 100% de isenção de risco, eliminando totalmente a chance de inadimplência futura.",
              "Estimar estatisticamente a probabilidade de inadimplência (default) do cliente em um determinado período, automatizando decisões de concessão.",
              "Avaliar unicamente a quantidade de imóveis e veículos registrados em nome do cliente.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O Credit Scoring estima a probabilidade estatística de inadimplência (default).",
          mensagemErrada: "Incorreto. O Score calcula estatisticamente a probabilidade de inadimplência do cliente.",
        },
      ],
    },
    {
      id: "garantias-reais-fidejussorias",
      titulo: "Mitigação de Risco: Garantias Reais vs. Garantias Fidejussórias",
      instrucao: "Associe o tipo de garantia exigida na concessão de crédito à sua respectiva categoria jurídica:",
      campos: [
        {
          id: "garantia-alienacao-fiduciaria",
          rotulo: "Alienação Fiduciária (vínculo do próprio bem móvel ou imóvel ao contrato para execução rápida).",
          regra: {
            tipo: "selecao",
            esperado: "real",
            opcoes: [
              { valor: "real", texto: "Garantia Real (Incide diretamente sobre um bem específico)" },
              { valor: "fidejussoria", texto: "Garantia Fidejussória/Pessoal (Compromisso patrimonial de um terceiro - Aval/Fiança)" },
            ],
          },
          mensagemCerta: "Perfeito! Alienação Fiduciária é Garantia Real; Aval/Fiança é Garantia Fidejussória (Pessoal).",
          mensagemErrada: "Incorreto. Verifique a diferença entre Garantia Real (bem) e Fidejussória (pessoa/avalist).",
        },
        {
          id: "garantia-aval-fianca",
          rotulo: "Aval / Fiança (compromisso assinado por um terceiro garantidor que responde com seu patrimônio genérico).",
          regra: {
            tipo: "selecao",
            esperado: "fidejussoria",
            opcoes: [
              { valor: "real", texto: "Garantia Real (Incide diretamente sobre um bem específico)" },
              { valor: "fidejussoria", texto: "Garantia Fidejussória/Pessoal (Compromisso patrimonial de um terceiro - Aval/Fiança)" },
            ],
          },
          mensagemCerta: "Perfeito! Alienação Fiduciária é Garantia Real; Aval/Fiança é Garantia Fidejussória (Pessoal).",
          mensagemErrada: "Incorreto. Verifique a diferença entre Garantia Real (bem) e Fidejussória (pessoa/avalist).",
        },
      ],
    },
    {
      id: "limite-credito-dinamico",
      titulo: "Política de Limites de Crédito Dinâmicos e Reciprocidade",
      cenario: "Em vendas B2B (entre empresas), o limite de crédito concedido a um comprador não deve ser estático.",
      instrucao:
        "Explique como funciona a revisão periódica do limite de crédito e o papel da pontualidade e pontuação de reciprocidade nesse processo.",
      campos: [
        {
          id: "limite-dinamico-objetivo",
          rotulo: "Objetivo do Limite Dinâmico de Crédito",
          placeholder: "Ex: Ajustar o limite de compras conforme o crescimento do cliente e seu histórico de pagamentos...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "limite-dinamico-atrasos",
          rotulo: "Impacto da Inadimplência ou Atrasos",
          placeholder: "Ex: Bloqueio automático de novos pedidos, redução de limite e exigência de pagamentos à vista...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "titulos-executivos",
      titulo: "Títulos Executivos Extrajudiciais (Duplicata, Promissória e Cheque)",
      cenario: "Para acelerar a cobrança judicial caso ocorra inadimplência, as operações B2B devem ser lastreadas por Títulos Executivos Extrajudiciais.",
      instrucao:
        "Explique a importância da Duplicata Mercantil com comprovante de entrega de mercadoria (aceite) no processo de cobrança judicial via Ação de Execução.",
      campos: [
        {
          id: "titulos-executivos",
          placeholder:
            "Explique que a duplicata acompanhada do comprovante de entrega (canhoto da nota) comprova a dívida líquida, certa e exigível, permitindo execução judicial direta sem necessidade de processo lento de conhecimento...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /duplicat|execuç|líquid|certa|exigível|comprovant|entreg|canhot|judicial/i,
          },
          mensagemErrada: "Mencione a duplicata, comprovante de entrega (canhoto) ou execução judicial líquida e certa.",
        },
      ],
    },
    {
      id: "cobranca-terceirizada",
      titulo: "Estratégia de Cobrança: Operação Própria (In-House) vs. Assessoria Terceirizada",
      instrucao:
        "A partir de quantos dias de atraso costuma-se transferir a cobrança interna (In-House) para uma Assessoria Externa de Cobrança? Compare os fatores de custo de comissionamento (success fee) e preservação do relacionamento corporativo.",
      campos: [
        {
          id: "cobranca-terceirizada",
          placeholder:
            "Discorra sobre a transição (ex: após 60-90 dias), onde a cobrança interna preserva a relação comercial em atrasos recentes e a assessoria externa foca na recuperação ostensiva com remuneração por taxa de sucesso...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /terceiriz|assessori|dias|atras|comiss|sucess|relacionament|in-house/i,
          },
          mensagemErrada: "Mencione o período de transição (ex: 60 a 90 dias), comissionamento por sucesso ou relacionamento.",
        },
      ],
    },
  ],
};

export default atividade;
