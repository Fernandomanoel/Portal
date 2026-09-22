import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Crédito, Gestão de Risco e Régua de Cobrança",
  introducao:
    "Análise de crédito, gestão de risco e a régua de cobrança usada para recuperar valores em atraso. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "cinco-cs-credito",
      titulo: "Análise de Risco de Crédito: Metodologia dos 5 Cs",
      cenario: "Um analista de crédito está avaliando uma proposta de empréstimo empresarial.",
      instrucao:
        "Ao analisar o histórico de pontualidade de pagamentos anteriores, restrições financeiras em órgãos de proteção (SPC/Serasa) e a idoneidade do tomador, qual dos 5 Cs do Crédito está sendo avaliado?",
      campos: [
        {
          id: "cinco-cs-resposta",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Capacidade (Avaliação do fluxo de caixa e geração de receita para quitar a dívida).",
              "Caráter (Histórico de honra aos compromissos assumidos, reputação e histórico financeiro).",
              "Colateral (Bens oferecidos como garantia real em caso de inadimplência).",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O Caráter avalia o histórico de pagamentos, idoneidade e honra aos compromissos do tomador.",
          mensagemErrada: "Incorreto. A análise do histórico financeiro e pontualidade refere-se ao 'Caráter' nos 5 Cs.",
        },
      ],
    },
    {
      id: "dso-pdd",
      titulo: "Métricas de Inadimplência: DSO e Provisão de Devedores Duvidosos (PDD)",
      instrucao:
        "Explique a importância do indicador DSO (Days Sales Outstanding / Prazo Médio de Recebimento) e a função contábil da PDD (Provisão para Devedores Duvidosos / Perdas Estimadas com Crédito).",
      campos: [
        {
          id: "dso-funcao",
          rotulo: "Função do indicador DSO (Prazo de Recebimento)",
          placeholder: "Ex: Mede o tempo médio em dias que a empresa leva para receber suas vendas a prazo...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "pdd-objetivo",
          rotulo: "Objetivo da reserva de PDD / PECLD",
          placeholder: "Ex: Proteger o balanço patrimonial reservando valor estimado de possíveis calotes ou inadimplências...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "regua-cobranca",
      titulo: "Estruturação da Régua de Cobrança por Dias de Atraso",
      instrucao: "Associe o tempo de atraso do título vencido à fase correta do processo de cobrança:",
      campos: [
        {
          id: "regua-ate-15-dias",
          rotulo: "1 a 15 dias de atraso (Atraso recente/pontual).",
          regra: {
            tipo: "selecao",
            esperado: "amigavel",
            opcoes: [
              { valor: "amigavel", texto: "Cobrança Amigável / Lembrete preventivo via e-mail ou WhatsApp sem encargos abusivos" },
              { valor: "judicial", texto: "Ação Judicial de Execução e Negativação em órgãos de proteção ao crédito" },
            ],
          },
          mensagemCerta: "Perfeito! Atrasos recentes requerem cobrança amigável; atrasos prolongados acionam vias judiciais/negativação.",
          mensagemErrada: "Incorreto. Verifique a proporcionalidade do tempo de atraso na régua de cobrança.",
        },
        {
          id: "regua-acima-90-dias",
          rotulo: "Acima de 90 dias de atraso sem acordo prévio.",
          regra: {
            tipo: "selecao",
            esperado: "judicial",
            opcoes: [
              { valor: "amigavel", texto: "Cobrança Amigável / Lembrete preventivo via e-mail ou WhatsApp sem encargos abusivos" },
              { valor: "judicial", texto: "Ação Judicial de Execução e Negativação em órgãos de proteção ao crédito" },
            ],
          },
          mensagemCerta: "Perfeito! Atrasos recentes requerem cobrança amigável; atrasos prolongados acionam vias judiciais/negativação.",
          mensagemErrada: "Incorreto. Verifique a proporcionalidade do tempo de atraso na régua de cobrança.",
        },
      ],
    },
    {
      id: "cdc-artigo-42",
      titulo: "Aspectos Legais na Cobrança: Artigo 42 do CDC e Prazos de Proteção",
      cenario: "O artigo 42 do Código de Defesa do Consumidor (CDC) estabelece limites rígidos para a cobrança de débitos.",
      instrucao:
        "Descreva quais condutas são expressamente proibidas na abordagem ao devedor e qual é o prazo máximo de permanência do nome do devedor nos cadastros de restrição (SPC/Serasa).",
      campos: [
        {
          id: "cdc-artigo-42",
          placeholder:
            "Discorra sobre a proibição de expor o devedor ao ridículo, constrangimento, ligações em horários inadequados ou contato no ambiente de trabalho, e cite o limite máximo de 5 anos de negativação...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /constrangiment|ridículo|exposiç|5 anos|trabalho|horário|ameaça|cdc/i,
          },
          mensagemErrada: "Mencione a proibição de constrangimento/exposição do devedor e o prazo limite de 5 anos para negativação.",
        },
      ],
    },
    {
      id: "negociacao-repactuacao",
      titulo: "Técnicas de Negociação e Repactuação de Dívidas",
      cenario: "Um cliente inadimplente demonstra interesse genuíno em quitar o débito, mas não possui saldo para pagamento à vista.",
      instrucao:
        "Quais estratégias de repactuação (ex: renegociação, desconto de juros moratórios, parcelamento via confissão de dívida) o cobrador deve adotar para garantir a recuperação sem perder o cliente?",
      campos: [
        {
          id: "negociacao-repactuacao",
          placeholder:
            "Explique sobre simulação de parcelamento viável para a renda do cliente, retirada/desconto pontual em juros de mora e formalização via Termo de Confissão de Dívida...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /parcela|desconto|juros|acordo|confissão|dívida|renegocia|proposta/i,
          },
          mensagemErrada: "Mencione táticas como parcelamento, desconto em juros ou formalização por termo de confissão de dívida.",
        },
      ],
    },
  ],
};

export default atividade;
