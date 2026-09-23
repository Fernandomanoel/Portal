import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Desafio de Growth Marketing, Unit Economics & CRO",
  introducao:
    "Este desafio avançado exige cálculos e diagnósticos de growth marketing: unit economics (CAC, LTV e a relação entre eles), otimização de taxa de conversão (CRO) e hipótese de teste A/B, modelos de atribuição de mídia e copywriting no framework BAB. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "unit-economics",
      titulo: "Unit Economics & Análise de Eficiência Financeira",
      cenario: "Dados da Operação (Último Trimestre):",
      tabelaReferencia: {
        colunas: ["Indicador", "Valor"],
        linhas: [
          ["Investimento total em Mídia Paga (Google + Meta Ads)", "R$ 120.000,00"],
          ["Novos Clientes Adquiridos", "400 clientes"],
          ["Ticket Médio Mensal (MRR por cliente)", "R$ 150,00"],
          ["Taxa de Churn Mensal (Cancelamento)", "5% ao mês"],
        ],
      },
      instrucao:
        "Calcule o CAC, o LTV e a relação LTV/CAC. Em seguida, analise se esta operação é saudável e escalável (payback e referência de mercado SaaS).",
      campos: [
        {
          id: "cac",
          rotulo: "CAC (Custo de Aquisição em R$)",
          placeholder: "Ex: 300",
          regra: { tipo: "numero", esperado: 300 },
          mensagemCerta: "Correto! CAC = R$ 120.000 / 400 clientes = R$ 300,00.",
          mensagemErrada: "Incorreto. O CAC é o Investimento Total dividido pelo número de clientes (R$ 120.000 / 400 = 300).",
        },
        {
          id: "ltv",
          rotulo: "LTV (Lifetime Value em R$)",
          placeholder: "Ex: 3000",
          regra: { tipo: "numero", esperado: 3000 },
          mensagemCerta: "Correto! LTV = Ticket Mensal R$ 150 / 0,05 (Churn) = R$ 3.000,00 (vida útil de 20 meses).",
          mensagemErrada: "Incorreto. LTV em SaaS = MRR / Taxa de Churn (150 / 0,05 = 3000).",
        },
        {
          id: "ltv-cac",
          rotulo: "Relação LTV / CAC (Ex: 10 para 10:1)",
          placeholder: "Ex: 10",
          regra: { tipo: "numero", esperado: 10 },
          mensagemCerta: "Correto! LTV/CAC = 3000 / 300 = 10x (excelente eficiência!).",
          mensagemErrada: "Incorreto. A razão LTV/CAC é 3000 / 300 = 10.",
        },
        {
          id: "analise-viabilidade",
          rotulo: "Análise de Viabilidade Econômica",
          placeholder: "Avalie o Payback (em quantos meses se paga) e se a relação LTV/CAC atinge os padrões do mercado SaaS...",
          regra: {
            tipo: "texto",
            minPalavras: 6,
            minCaracteres: 25,
            palavrasChave: /payback|meses|saudáv|excelent|escalá|retorno|lucro|churn|2 meses|tempo/i,
          },
          mensagemErrada: "Texto coerente, mas falta mencionar o tempo de Payback (2 meses) ou a escalabilidade da relação 10x.",
        },
      ],
    },
    {
      id: "cro-funil",
      titulo: "Diagnóstico de Gargalos no Funil & Hipótese de Teste A/B",
      cenario: "Dados do Funil de E-commerce:",
      tabelaReferencia: {
        colunas: ["Etapa", "Usuários", "Conversão"],
        linhas: [
          ["1. Visitantes da Landing Page", "100.000 usuários", "—"],
          ["2. Adicionaram ao Carrinho", "10.000 usuários", "10% de conversão"],
          ["3. Iniciaram o Checkout", "2.000 usuários", "20% dos que adicionaram"],
          ["4. Finalizaram a Compra", "300 usuários", "Apenas 15% dos que iniciaram o checkout"],
        ],
      },
      campos: [
        {
          id: "gargalo-funil",
          rotulo: "Qual a etapa crítica com MAIOR perda/gargalo do funil?",
          regra: {
            tipo: "selecao",
            esperado: "checkout_compra",
            opcoes: [
              { valor: "visita_carrinho", texto: "Visitante -> Adicionar ao Carrinho (10%)" },
              { valor: "carrinho_checkout", texto: "Carrinho -> Iniciar Checkout (20%)" },
              { valor: "checkout_compra", texto: "Checkout -> Finalizar Compra (15% - Maior abandono proporcional)" },
            ],
          },
          mensagemCerta: "Correto! Apenas 15% dos que chegam ao checkout finalizam (perda de 85%).",
          mensagemErrada: "Incorreto. A maior queda proporcional ocorre do Checkout para a Compra (85% de abandono).",
        },
        {
          id: "gatilho-abandono",
          rotulo: "Gatilho principal associado a esse abandono",
          regra: {
            tipo: "selecao",
            esperado: "friccao",
            opcoes: [
              { valor: "friccao", texto: "Alta fricção no checkout (frete surpresa, cadastro longo, ausência de PIX)" },
              { valor: "copy", texto: "Falta de botão de compra na home" },
              { valor: "cor", texto: "A cor do botão não tem contraste suficiente" },
            ],
          },
          mensagemCerta: "Correto! Fricção e surpresas no frete/cadastro são as maiores causas de abandono de checkout.",
          mensagemErrada: "Incorreto. Selecione a opção relacionada à alta fricção e surpresas no checkout.",
        },
        {
          id: "hipotese-ab",
          rotulo: "Formulação de Hipótese de Teste A/B para solucionar o gargalo",
          placeholder:
            "Estrutura esperada: 'Se implementarmos [X - ex: Checkout transparente em 1 etapa com calculadora de frete], então aumentaremos [Y - taxa de finalização de compra], porque [Z - reduzirá a fricção e ansiedade do cliente]'...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /se|então|porque|checkout|conversão|fricção|frete|pix|passos|reduz/i,
          },
          mensagemErrada: "Formule no padrão de hipótese de Teste A/B: 'Se [Ação], então [Métrica], porque [Razão]'.",
        },
      ],
    },
    {
      id: "modelo-atribuicao",
      titulo: "Modelos de Atribuição (Attribution Modeling)",
      cenario: "Jornada Multi-Touch do Consumidor (Venda de R$ 1.000,00):",
      tabelaReferencia: {
        colunas: ["Touchpoint", "Canal", "Etapa"],
        linhas: [
          ["1", "Anúncio de Vídeo no Meta Ads", "Conscientização / Topo"],
          ["2", "Clique em Blog Post via Busca Orgânica", "Pesquisa / Meio"],
          ["3", "Clique em E-mail de Remarketing de Abandono de Carrinho", "Conversão / Fundo"],
        ],
      },
      campos: [
        {
          id: "last-touch",
          rotulo: "No Modelo 'Last Touch' (Último Clique), qual canal recebe 100% da atribuição?",
          regra: {
            tipo: "selecao",
            esperado: "email",
            opcoes: [
              { valor: "meta", texto: "Meta Ads (Vídeo)" },
              { valor: "seo", texto: "Busca Orgânica (Blog)" },
              { valor: "email", texto: "E-mail de Remarketing" },
            ],
          },
          mensagemCerta: "Correto! O E-mail de Remarketing foi o último ponto de contato antes da compra.",
          mensagemErrada: "Incorreto. No modelo Last Touch, o E-mail de Remarketing (último clique) leva 100% do crédito.",
        },
        {
          id: "risco-last-touch",
          rotulo: "Qual o risco de otimizar a mídia baseado APENAS no 'Last Touch'?",
          placeholder: "Ex: Cortar verba do topo do funil (Meta Ads) e zerar a entrada de novos clientes futuros",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /topo|conscient|meta|anúncio|atração|novos|funil|verba|cortar|zerar/i,
          },
          mensagemErrada: "Explique o risco de desinvestir no Topo de Funil (Meta Ads) ao olhar apenas o último clique.",
        },
      ],
    },
    {
      id: "copywriting-bab",
      titulo: "Copywriting de Alta Conversão no Framework BAB",
      cenario:
        "Desafio de Redação Publicitária: Escreva uma copy para um Software B2B de Inteligência Financeira e Gestão de Fluxo de Caixa utilizando obrigatoriamente a estrutura BAB (Before / After / Bridge).",
      instrucao: "Redija a Copy Completa (o sistema exige presença de Before, After e Bridge com sentido).",
      campos: [
        {
          id: "copy-bab",
          placeholder:
            "• BEFORE: Descreva o caos financeiro atual do gestor (planilhas travadas, falta de previsibilidade)...\n• AFTER: Descreva o estado ideal desejado (clareza total, decisões em 1 clique, lucro sob controle)...\n• BRIDGE: Apresente o seu software como a ponte exata para alcançar essa transformação...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 45,
            palavrasChave: /planilha|caos|lucro|gestão|previsib|automaç|sistema|controle|financeir|decis/i,
          },
          mensagemErrada: "A copy precisa incluir a dor do caos financeiro (Before), o resultado desejado (After) e a solução (Bridge).",
        },
      ],
    },
  ],
};

export default atividade;
