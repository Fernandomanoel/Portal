import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Crédito e cobrança tratam de vender a prazo com segurança e de receber o que é devido. O curso cobre a análise de crédito, o risco, a régua de cobrança, garantias e títulos, Open Finance e fraudes, fluxo de caixa e a rotina de contas a receber na planilha.",
  topicos: [
    {
      titulo: "Crédito e análise de crédito",
      texto: [
        "Conceder crédito é vender agora e receber depois. A análise de crédito avalia a chance de o cliente pagar. A tradição usa os 5 Cs: Caráter (histórico de pagamento e reputação), Capacidade (renda ou faturamento versus compromissos), Capital (patrimônio), Colateral (garantias) e Condições (cenário econômico e do negócio).",
        "A empresa define uma política de crédito (limite, prazo, documentos) e a aplica igual para todos. Risco é a probabilidade de não receber; ele nunca vai a zero, mas se gerencia.",
      ],
      pontos: ["Citar e aplicar os 5 Cs.", "Explicar para que serve a política de crédito."],
      atividades: ["credito-cobranca-analise-risco"],
    },
    {
      titulo: "Credit scoring, garantias e títulos executivos",
      texto: [
        "O credit scoring transforma dados do cliente em uma nota (score) de risco, com base no histórico de pagamentos e em outros fatores. Quanto maior o score, menor o risco. Garantias reduzem a perda se o cliente não pagar: reais (um bem como imóvel ou veículo) e fidejussórias (um fiador ou aval).",
        "Título executivo é o documento que permite cobrar judicialmente de forma mais rápida (como cheque, duplicata, nota promissória, contrato assinado por duas testemunhas). Cada título tem requisitos e prazos de prescrição.",
      ],
      pontos: ["Diferenciar garantia real e fidejussória.", "Citar exemplos de títulos executivos."],
      atividades: ["credito-cobranca-scoring-garantias-titulos"],
    },
    {
      titulo: "Régua de cobrança",
      texto: [
        "A régua de cobrança é a sequência planejada de contatos conforme o atraso: um lembrete antes do vencimento, aviso no dia, contato cordial nos primeiros dias de atraso, negociação, e só depois medidas mais duras (negativação, cobrança judicial). O tom começa amigável e vai ficando firme, sempre respeitando a lei: o Código de Defesa do Consumidor proíbe expor o devedor a constrangimento e ameaça.",
        "Aging é o relatório que agrupa os títulos por faixa de atraso (a vencer, 1 a 30 dias, 31 a 60...), para priorizar a cobrança.",
      ],
      pontos: ["Montar uma régua de cobrança simples.", "Ler um relatório de aging."],
      erros: ["Cobrar de forma agressiva ou expor o devedor."],
      atividades: ["credito-cobranca-analise-risco", "credito-cobranca-planilha-receber-configurar"],
    },
    {
      titulo: "Multa, juros e baixa de recebimentos",
      texto: [
        "O atraso gera multa (valor fixo percentual, por exemplo 2%) e juros por dia ou mês (por exemplo 1% ao mês, calculado pro rata, ou seja, proporcional aos dias). Valor atualizado = valor + multa + juros. A baixa registra o pagamento no título, e o retorno bancário traz os pagamentos para conferência: nota errada, pagamento repetido e pagamento duplo são comuns.",
      ],
      pontos: ["Calcular multa e juros pro rata.", "Tratar um pagamento duplicado."],
      exemplo: "Título de R$ 1.000 pago com 10 dias de atraso, multa de 2% e juros de 1% ao mês: multa R$ 20; juros = 1.000 × 1% ÷ 30 × 10 ≈ R$ 3,33.",
      atividades: ["credito-cobranca-planilha-receber-configurar", "credito-cobranca-planilha-receber-preencher"],
    },
    {
      titulo: "Open Finance, fraudes e recebíveis",
      texto: [
        "Open Finance é o compartilhamento de dados financeiros entre instituições, com autorização do cliente, para oferecer crédito e serviços melhores. Fraudes comuns: documentos falsos, identidade roubada, boleto adulterado e golpes de engenharia social. Prevenção: conferir dados por canal oficial, validar documentos e desconfiar de pressa e de ofertas boas demais.",
        "Recebíveis (duplicatas, cartões, boletos) podem ser antecipados ou vendidos para dar liquidez à empresa.",
      ],
      pontos: ["Dar exemplos de fraudes no crédito.", "Explicar o que é Open Finance."],
      atividades: ["credito-cobranca-open-finance-fraudes-recebiveis"],
    },
    {
      titulo: "Gestão financeira, fluxo de caixa e controladoria",
      texto: [
        "Fluxo de caixa mostra as entradas e saídas e o saldo projetado. A inadimplência (percentual de títulos em atraso) pressiona o caixa, e a controladoria acompanha indicadores como prazo médio de recebimento e inadimplência para corrigir o rumo.",
      ],
      pontos: ["Calcular a inadimplência.", "Explicar como o atraso afeta o caixa."],
      exemplo: "R$ 20.000 em atraso em uma carteira de R$ 250.000: inadimplência de 8%.",
      atividades: ["credito-cobranca-gestao-financeira-fluxo-caixa"],
    },
  ],
  glossario: [
    { termo: "Score", definicao: "Nota que estima o risco de não pagamento." },
    { termo: "Aging", definicao: "Relatório dos títulos por faixa de atraso." },
    { termo: "Pro rata", definicao: "Cálculo proporcional ao número de dias." },
    { termo: "Inadimplência", definicao: "Percentual de valores não pagos no prazo." },
    { termo: "Título executivo", definicao: "Documento que permite a cobrança judicial mais rápida." },
    { termo: "Negativação", definicao: "Registro do devedor em cadastro de proteção ao crédito." },
  ],
  dicas: [
    "Faça role-play de ligação de cobrança cordial: o tom é metade do trabalho.",
    "Reforce os limites legais da cobrança antes de qualquer simulação.",
    "Use a planilha para mostrar como o juros pro rata cresce dia a dia.",
  ],
};

export default conteudo;
