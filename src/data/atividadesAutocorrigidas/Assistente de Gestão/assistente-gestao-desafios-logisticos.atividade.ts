import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Desafios Logísticos e Operações Situacionais",
  introducao:
    "Cenários de Analista de Supply Chain: crises de abastecimento, custos de frete e decisões operacionais em tempo real.",
  itens: [
    {
      id: "selecao-modal",
      titulo: "Seleção Emergencial de Modal",
      cenario:
        "O setor de Logística Outbound recebeu três demandas simultâneas. Cada uma possui uma restrição diferente de prazo e custo.",
      instrucao: "Associe o cenário ao Modal de Transporte mais adequado para resolver o problema.",
      campos: [
        {
          id: "selecao-modal-row1",
          rotulo:
            "Uma peça vital da linha de montagem de um cliente a 2.500 km de distância quebrou. A fábrica dele está parada custando milhares de reais por hora. O frete não importa, apenas a urgência máxima.",
          regra: {
            tipo: "selecao",
            esperado: "aereo",
            opcoes: [
              { valor: "rodoviario", texto: "Modal Rodoviário" },
              { valor: "ferroviario", texto: "Modal Ferroviário/Aquaviário" },
              { valor: "aereo", texto: "Modal Aéreo" },
            ],
          },
          mensagemCerta:
            "Decisões corretas! Urgência máxima/Fábrica parada exige Modal Aéreo; Fracionamento/Porta a porta exige Rodoviário; Alto volume/Baixo custo exige Ferroviário/Aquaviário.",
          mensagemErrada: "Atenção às escolhas: Máquina parada (Aéreo), Entrega de supermercados (Rodoviário) e Milhares de toneladas (Ferroviário).",
        },
        {
          id: "selecao-modal-row2",
          rotulo:
            "Sua empresa precisa abastecer 15 supermercados diferentes espalhados pelo mesmo estado em uma rota fracionada. Requer alta capilaridade e entrega \"porta a porta\".",
          regra: {
            tipo: "selecao",
            esperado: "rodoviario",
            opcoes: [
              { valor: "rodoviario", texto: "Modal Rodoviário" },
              { valor: "ferroviario", texto: "Modal Ferroviário/Aquaviário" },
              { valor: "aereo", texto: "Modal Aéreo" },
            ],
          },
          mensagemCerta:
            "Decisões corretas! Urgência máxima/Fábrica parada exige Modal Aéreo; Fracionamento/Porta a porta exige Rodoviário; Alto volume/Baixo custo exige Ferroviário/Aquaviário.",
          mensagemErrada: "Atenção às escolhas: Máquina parada (Aéreo), Entrega de supermercados (Rodoviário) e Milhares de toneladas (Ferroviário).",
        },
        {
          id: "selecao-modal-row3",
          rotulo:
            "Exportação de 10.000 toneladas de minério de ferro. O prazo não é apertado, mas a prioridade absoluta é o menor custo possível por tonelada transportada ao longo de grandes distâncias.",
          regra: {
            tipo: "selecao",
            esperado: "ferroviario",
            opcoes: [
              { valor: "rodoviario", texto: "Modal Rodoviário" },
              { valor: "ferroviario", texto: "Modal Ferroviário/Aquaviário" },
              { valor: "aereo", texto: "Modal Aéreo" },
            ],
          },
          mensagemCerta:
            "Decisões corretas! Urgência máxima/Fábrica parada exige Modal Aéreo; Fracionamento/Porta a porta exige Rodoviário; Alto volume/Baixo custo exige Ferroviário/Aquaviário.",
          mensagemErrada: "Atenção às escolhas: Máquina parada (Aéreo), Entrega de supermercados (Rodoviário) e Milhares de toneladas (Ferroviário).",
        },
      ],
    },
    {
      id: "falhas-abastecimento",
      titulo: "Falhas no Abastecimento",
      instrucao: "Avalie as práticas e consequências descritas durante o gerenciamento de variações de demanda no varejo.",
      campos: [
        {
          id: "falhas-abastecimento-row1",
          rotulo:
            "1. Quando o varejo vende um pouco mais e faz pedidos exagerados aos centros de distribuição, gerando compras gigantescas nas fábricas (distorção da demanda), ocorre um fenômeno nocivo chamado \"Efeito Chicote\" (Bullwhip Effect).",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Excelente leitura! O Efeito Chicote (Bullwhip) causa superprodução na fábrica (V). E a Ruptura de Estoque é grave, pois irrita o cliente e o faz procurar a concorrência (F).",
          mensagemErrada:
            "Incorreto. A ampliação exagerada dos pedidos define perfeitamente o Efeito Chicote (Afirmação 1 Verdadeira). A falta de produtos (Ruptura) sempre afeta a fidelização e a marca (Afirmação 2 Falsa).",
        },
        {
          id: "falhas-abastecimento-row2",
          rotulo:
            "2. A Ruptura de Estoque (quando o cliente procura um produto na gôndola e ele está em falta) gera apenas a perda daquela venda momentânea, sem afetar a fidelização ou a imagem da marca.",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Excelente leitura! O Efeito Chicote (Bullwhip) causa superprodução na fábrica (V). E a Ruptura de Estoque é grave, pois irrita o cliente e o faz procurar a concorrência (F).",
          mensagemErrada:
            "Incorreto. A ampliação exagerada dos pedidos define perfeitamente o Efeito Chicote (Afirmação 1 Verdadeira). A falta de produtos (Ruptura) sempre afeta a fidelização e a marca (Afirmação 2 Falsa).",
        },
      ],
    },
    {
      id: "orcamento-frete",
      titulo: "Orçamento de Frete Fracionado",
      cenario:
        "Você está analisando a tabela de uma transportadora parceira para aprovar a entrega de um pallet para um novo cliente. A cobrança é composta por uma taxa fixa de despacho e uma taxa variável pela quilometragem rodada.",
      instrucao:
        "Tabela de Cálculo de Frete Rodoviário. Calcule e digite o Custo Total do Frete (em Reais). Fórmula: Taxa Fixa + (Distância × Taxa Variável).",
      tabelaReferencia: {
        colunas: ["Parâmetro", "Valor Acordado"],
        linhas: [
          ["Taxa Fixa (Despacho / Ad Valorem)", "R$ 150,00"],
          ["Taxa Variável (Custo por KM rodado)", "R$ 3,00 por Km"],
          ["Distância até o Cliente", "50 Km"],
        ],
      },
      campos: [
        {
          id: "frete-total",
          placeholder: "Ex: 100",
          regra: { tipo: "numero", esperado: 300 },
          mensagemCerta: "Cálculo exato! O custo variável é 50 Km × R$ 3 = R$ 150. Somando a Taxa Fixa de R$ 150, o total é R$ 300,00.",
          mensagemErrada: "Incorreto. Multiplique a distância (50) pela taxa do Km (3) e depois SOME a taxa fixa (150).",
        },
      ],
    },
    {
      id: "jit-crise",
      titulo: "Falha no Just-In-Time (JIT)",
      cenario:
        "Sua montadora opera sob o sistema rigoroso de Just-in-Time (estoque praticamente zero). Às 07h00 da manhã, o fornecedor principal liga avisando que o caminhão tombou na rodovia e a carga de autopeças foi perdida. A linha de produção vai parar às 10h00.",
      instrucao:
        "Como Gestor de Supply Chain, descreva seu plano de contingência imediato para tentar salvar o turno de produção (mínimo de 10 palavras). Você deve mencionar termos voltados à crise como acionar 'fornecedor reserva/alternativo', usar frete 'aéreo/urgente' ou 'realocar' a produção.",
      campos: [
        {
          id: "jit-contingencia",
          placeholder:
            "Ex: Para evitar a parada total da linha, devemos acionar um fornecedor alternativo emergencial e solicitar o envio das peças por frete aéreo urgente...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /reserva|urgência|urgente|aéreo|realocar|paralisação|contingência|alternativo|alternativa/i,
          },
          mensagemCerta:
            "Contingência perfeitamente delineada! O grande risco do JIT é a vulnerabilidade; acionar a redundância (fornecedor B) e frete expresso é a conduta esperada.",
          mensagemErrada:
            "Em uma crise JIT, a velocidade é essencial. Cite a utilização de um 'fornecedor reserva/alternativo', mudança para frete 'aéreo/urgente' ou a necessidade de 'realocar' a produção.",
        },
      ],
    },
    {
      id: "pop-recebimento-avarias",
      titulo: "Procedimento Operacional Padrão (POP)",
      cenario:
        "O armazém tem sofrido com mercadorias aceitas mesmo com a embalagem danificada. Para padronizar a operação Inbound, crie um roteiro básico (Procedimento de Recebimento de Avarias) no Google Docs ou desenhe um fluxograma no Canva.",
      instrucao: "Cole abaixo o link público do seu documento ou fluxograma.",
      campos: [
        {
          id: "pop-avarias-link",
          placeholder: "https://docs.google.com/document/... ou https://canva.com/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(docs\.google\.com\/document|canva\.com)\/.+/i },
          mensagemCerta: "Procedimento validado! A padronização da entrada (Inbound) evita a aceitação cega de produtos avariados e prejuízos no inventário.",
          mensagemErrada: "URL inválida. Certifique-se de colar o link público de um documento (Google Docs) ou design (Canva).",
        },
      ],
    },
  ],
};

export default atividade;
