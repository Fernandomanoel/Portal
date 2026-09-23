import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Crédito e Cobrança III — Open Finance, Prevenção a Fraudes e Recebíveis",
  introducao:
    "Open Finance, prevenção a fraudes e gestão de recebíveis. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "open-finance-vantagem",
      titulo: "Open Finance e Análise de Crédito Baseada em Dados Abertos",
      cenario:
        "Com o avanço do Open Finance e do Cadastro Positivo, os analistas de crédito ganharam acesso a um histórico financeiro completo e consentido pelos clientes.",
      instrucao: "Qual a principal vantagem dessa abordagem em relação aos métodos tradicionais de consulta de restrições?",
      campos: [
        {
          id: "open-finance-vantagem",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Avaliar apenas as contas que já foram negativadas nos órgãos de proteção ao crédito.",
              "Enxergar o fluxo de caixa real, hábitos de pagamento pontuais e capacidade financeira atualizada do tomador, permitindo taxas personalizadas e redução do risco.",
              "Aprovar o crédito automaticamente sem necessidade de qualquer análise ou comprovação de renda.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O Open Finance permite visualizar a capacidade financeira real e o histórico positivo do cliente.",
          mensagemErrada: "Incorreto. A maior vantagem do Open Finance é permitir análise de comportamento de caixa em tempo real.",
        },
      ],
    },
    {
      id: "kyc-antifraude",
      titulo: "Prevenção a Fraudes e Processo KYC (Know Your Customer)",
      cenario: "Na concessão de crédito digital, a falsificação de documentos e o roubo de identidade são grandes riscos de perda imediata.",
      instrucao: "Explique o papel da Biometria Facial (Liveness Detection) e do Bureau de Proteção Antifraude na validação de proposta.",
      campos: [
        {
          id: "kyc-biometria",
          rotulo: "Função da Biometria Facial e Liveness",
          placeholder: "Ex: Garantir a presença real do titular no momento da proposta contra fotos ou identidades falsas...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "kyc-cheque-dados",
          rotulo: "Função do Cheque de Dados (KYC / Antifraude)",
          placeholder: "Ex: Confirmar a consistência do CPF, renda presumida, endereço e histórico do solicitante...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "trava-recebiveis",
      titulo: "Garantias Financeiras Modernas: Trava de Recebíveis de Cartão",
      instrucao: "Associe o instrumento de garantia de crédito ao seu mecanismo de funcionamento comercial:",
      campos: [
        {
          id: "trava-cessao-fiduciaria",
          rotulo: "Cessão Fiduciária de Recebíveis de Cartão (Trava de Cartão)",
          regra: {
            tipo: "selecao",
            esperado: "trava",
            opcoes: [
              { valor: "trava", texto: "O credor retém diretamente a agenda de pagamentos das maquininhas do lojista para quitação das parcelas" },
              { valor: "fianca", texto: "Exigência de declaração patrimonial simples assinada pelo proprietário sem retenção de recebíveis" },
            ],
          },
          mensagemCerta: "Perfeito! A Trava de Cartão retém a agenda financeira do lojista como garantia automatizada.",
          mensagemErrada: "Incorreto. Verifique a associação da trava de recebíveis.",
        },
        {
          id: "trava-fianca-pessoal",
          rotulo: "Fiança Pessoal do Sócio",
          regra: {
            tipo: "selecao",
            esperado: "fianca",
            opcoes: [
              { valor: "trava", texto: "O credor retém diretamente a agenda de pagamentos das maquininhas do lojista para quitação das parcelas" },
              { valor: "fianca", texto: "Exigência de declaração patrimonial simples assinada pelo proprietário sem retenção de recebíveis" },
            ],
          },
          mensagemCerta: "Perfeito! A Trava de Cartão retém a agenda financeira do lojista como garantia automatizada.",
          mensagemErrada: "Incorreto. Verifique a associação da trava de recebíveis.",
        },
      ],
    },
    {
      id: "pix-cobranca",
      titulo: "Cobrança Digital Omnichannel e Agilidade via Pix Cobrança",
      cenario:
        "A modernização da cobrança substituiu boletos bancários tradicionais e ligações frias por canais integrados (WhatsApp, e-mail, SMS) com Pix Cobrança (QR Code dinâmico com juros e multa pré-calculados).",
      instrucao: "Explique como a redução da fricção no pagamento aumenta a taxa de recuperação em atrasos recentes.",
      campos: [
        {
          id: "pix-cobranca",
          placeholder:
            "Explique que a praticidade do Pix permite quitação instantânea no canal de atendimento, sem necessidade de digitação de linha digitável ou espera de compensação, facilitando acordos rápidos...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /pix|praticidad|instantân|fricção|quitaç|acordo|facilita|pagament/i,
          },
          mensagemErrada: "Mencione a redução de fricção, pagamento instantâneo via Pix ou agilidade no acordo.",
        },
      ],
    },
    {
      id: "stress-testing-carteira",
      titulo: "Gestão de Riscos de Carteira: Stress Testing e Cenários de Crise",
      cenario: "Diante de um cenário de alta da inflação ou desaceleração econômica, o risco de inadimplência generalizada aumenta.",
      instrucao:
        "O que é um Teste de Estresse (Stress Testing) na Carteira de Crédito e quais decisões estratégicas a diretoria de crédito deve tomar ao simular alta da inadimplência?",
      campos: [
        {
          id: "stress-testing-carteira",
          placeholder:
            "Discorra sobre a simulação de cenários adversos para medir perdas potenciais, o ajuste preventivo na régua de concessão (restringindo perfis de alto risco) e o reforço da provisão (PDD)...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /estresse|simula|cenário|inadimplênc|perda|provis|pdd|restriç|risco/i,
          },
          mensagemErrada: "Mencione a simulação de cenários de crise, ajuste no risco da carteira ou reforço na provisão (PDD).",
        },
      ],
    },
  ],
};

export default atividade;
