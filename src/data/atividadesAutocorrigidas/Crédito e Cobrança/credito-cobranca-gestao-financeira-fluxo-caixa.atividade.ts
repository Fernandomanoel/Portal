import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão Financeira, Fluxo de Caixa e Controladoria",
  introducao:
    "Gestão financeira, controle de fluxo de caixa e rotinas de controladoria. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "ciclo-financeiro",
      titulo: "Gestão do Capital de Giro: Ciclo Operacional vs. Ciclo Financeiro",
      cenario:
        "Uma empresa comprou matéria-prima a prazo (pagamento em 30 dias), manteve os produtos em estoque por 20 dias até a venda e concedeu 40 dias de prazo para o cliente pagar.",
      instrucao: "Qual é o valor do Ciclo Financeiro (Ciclo de Caixa) dessa empresa?",
      campos: [
        {
          id: "ciclo-financeiro-resposta",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "60 dias (Soma do prazo de estocagem de 20 dias com o prazo de recebimento de 40 dias).",
              "30 dias (Ciclo Operacional de 60 dias menos o Prazo Médio de Pagamento aos Fornecedores de 30 dias).",
              "90 dias (Soma de todos os prazos das etapas comerciais e de compras).",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Ciclo Financeiro = Ciclo Operacional (20+40 = 60 dias) - Prazo de Pagamento (30 dias) = 30 dias.",
          mensagemErrada: "Incorreto. O Ciclo Financeiro é calculado diminuindo o prazo de pagamento do fornecedor do ciclo operacional total.",
        },
      ],
    },
    {
      id: "regime-caixa-competencia",
      titulo: "Regime de Caixa vs. Regime de Competência (DRE vs. DFC)",
      cenario: "Um equívoco comum na gestão empresarial é confundir Lucro Contábil com Saldo de Caixa Disponível.",
      instrucao: "Explique a diferença entre reconhecer uma receita pelo Regime de Competência e pelo Regime de Caixa.",
      campos: [
        {
          id: "regime-competencia",
          rotulo: "Reconhecimento no Regime de Competência (DRE)",
          placeholder: "Ex: Registra a receita/despesa no momento do fato gerador (venda/emissão da NF), independentemente do pagamento...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "regime-caixa",
          rotulo: "Reconhecimento no Regime de Caixa (DFC)",
          placeholder: "Ex: Registra a movimentação apenas quando o dinheiro efetivamente entra ou sai da conta bancária...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "indicadores-liquidez",
      titulo: "Análise de Balanço: Indicadores Financeiros de Liquidez",
      instrucao: "Associe o indicador financeiro de liquidez à sua respectiva fórmula/conceito analítico:",
      campos: [
        {
          id: "liquidez-corrente",
          rotulo: "Liquidez Corrente",
          regra: {
            tipo: "selecao",
            esperado: "corrente",
            opcoes: [
              { valor: "corrente", texto: "Ativo Circulante / Passivo Circulante (Capacidade geral de quitar obrigações de curto prazo)" },
              { valor: "seca", texto: "(Ativo Circulante - Estoques) / Passivo Circulante (Capacidade imediata sem depender das vendas de estoque)" },
            ],
          },
          mensagemCerta: "Perfeito! Liquidez Corrente inclui estoques; Liquidez Seca exclui estoques da avaliação de curto prazo.",
          mensagemErrada: "Incorreto. Verifique qual indicador desconsidera os estoques no cálculo.",
        },
        {
          id: "liquidez-seca",
          rotulo: "Liquidez Seca",
          regra: {
            tipo: "selecao",
            esperado: "seca",
            opcoes: [
              { valor: "corrente", texto: "Ativo Circulante / Passivo Circulante (Capacidade geral de quitar obrigações de curto prazo)" },
              { valor: "seca", texto: "(Ativo Circulante - Estoques) / Passivo Circulante (Capacidade imediata sem depender das vendas de estoque)" },
            ],
          },
          mensagemCerta: "Perfeito! Liquidez Corrente inclui estoques; Liquidez Seca exclui estoques da avaliação de curto prazo.",
          mensagemErrada: "Incorreto. Verifique qual indicador desconsidera os estoques no cálculo.",
        },
      ],
    },
    {
      id: "margem-contribuicao-breakeven",
      titulo: "Análise de Custos: Margem de Contribuição e Ponto de Equilíbrio (Break-Even)",
      cenario:
        "O Ponto de Equilíbrio Operacional (Break-Even Point) indica o volume mínimo de vendas necessário para cobrir todos os custos e despesas fixas da empresa, sem gerar lucro nem prejuízo.",
      instrucao:
        "Explique o conceito de Margem de Contribuição Unitaria (Preço de Venda - Custos/Despesas Variáveis) e como ela ajuda a calcular o ponto de equilíbrio.",
      campos: [
        {
          id: "margem-contribuicao-breakeven",
          placeholder:
            "Explique que a margem de contribuição é o valor que sobra da venda de cada unidade para pagar os custos fixos da empresa. Dividindo os custos fixos totais por essa margem, encontra-se a quantidade de vendas do ponto de equilíbrio...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /margem|contribuiç|custo|fix|venda|cobrir|equilíbr|receit|variáv/i,
          },
          mensagemErrada: "Mencione a margem de contribuição (preço - custos variáveis) e a cobertura dos custos fixos totais.",
        },
      ],
    },
    {
      id: "orcamento-base-zero",
      titulo: "Controladoria e Orçamento Empresarial: Orçamento Base Zero (OBZ)",
      cenario:
        "Diferente do orçamento histórico tradicional (que apenas reajusta os gastos do ano anterior pela inflação), o Orçamento Base Zero (OBZ) exige que os gestores justifiquem cada custo do zero a cada novo ciclo.",
      instrucao: "Quais são as principais vantagens do OBZ para a eliminação de desperdícios e eficiência operacional?",
      campos: [
        {
          id: "orcamento-base-zero",
          placeholder:
            "Discorra sobre o questionamento contínuo da necessidade de cada gasto, eliminação de ineficiências históricas, alocação inteligente de recursos prioritários e maior disciplina financeira das lideranças...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /zero|desperdíci|justifica|gast|cust|eficiênci|históric|recurs|priorida/i,
          },
          mensagemErrada: "Mencione a justificativa do zero de cada gasto, eliminação de desperdícios históricos e otimização de custos.",
        },
      ],
    },
  ],
};

export default atividade;
