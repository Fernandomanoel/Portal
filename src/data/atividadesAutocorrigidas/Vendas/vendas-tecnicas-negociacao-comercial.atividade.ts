import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_GATILHOS = [
  { valor: "escassez", texto: "Escassez" },
  { valor: "autoridade", texto: "Autoridade" },
  { valor: "prova", texto: "Prova Social" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Técnicas de Vendas e Negociação Comercial",
  introducao:
    "Explore novas abordagens nas vendas: estratégias de prospecção B2B (Spin Selling), técnicas de fechamento avançado, manuseio de objeções complexas, cálculo prático de margens de desconto e construção de ferramentas digitais de apoio comercial. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "spin-implicacao",
      titulo: "Perguntas do Método SPIN Selling",
      cenario:
        "O método SPIN Selling categoriza perguntas para conduzir o cliente ao fechamento. Marque a alternativa que descreve corretamente o objetivo das Perguntas de Implicação (I):",
      campos: [
        {
          id: "spin-implicacao",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Perguntar dados demográficos básicos da empresa, como número de funcionários e faturamento anual geral.",
              "Fazer o cliente compreender as consequências, a gravidade e o impacto financeiro negativo que o problema atual está causando em seu negócio.",
              "Perguntar diretamente se ele deseja assinar o contrato e fechar a compra imediatamente.",
            ],
            correta: 1,
          },
          mensagemCerta:
            "Correto! As perguntas de Implicação (I) mostram a gravidade e o custo do problema, aumentando a urgência de compra.",
          mensagemErrada:
            "Incorreto. As perguntas de implicação focam em evidenciar as consequências e custos negativos do problema atual do cliente.",
        },
      ],
    },
    {
      id: "gatilhos-mentais",
      titulo: "Gatilhos Mentais Aplicados à Venda",
      cenario:
        "Os gatilhos mentais aceleram a decisão de compra ativando atalhos no cérebro humano. Associe a frase de abordagem comercial ao seu respectivo gatilho mental:",
      campos: [
        {
          id: "gatilho-escassez",
          rotulo:
            "\"Restam apenas 2 unidades com este valor promocional para fechamento nesta turma, pois a procura está altíssima.\"",
          regra: { tipo: "selecao", esperado: "escassez", opcoes: OPCOES_GATILHOS },
          mensagemCerta: "Poucas unidades = Escassez.",
          mensagemErrada: "POUCAS unidades acionam a Escassez.",
        },
        {
          id: "gatilho-prova-social",
          rotulo:
            "\"Mais de 5.000 empresários já implementaram nosso sistema de gestão fiscal e aprovaram os resultados no primeiro mês.\"",
          regra: { tipo: "selecao", esperado: "prova", opcoes: OPCOES_GATILHOS },
          mensagemCerta: "Milhares de clientes = Prova Social.",
          mensagemErrada: "MUITOS clientes geram Prova Social.",
        },
        {
          id: "gatilho-autoridade",
          rotulo:
            "\"Sou especialista certificado em arquitetura financeira empresarial com mais de 15 anos de mercado orientando grandes marcas.\"",
          regra: { tipo: "selecao", esperado: "autoridade", opcoes: OPCOES_GATILHOS },
          mensagemCerta: "Especialista certificado = Autoridade.",
          mensagemErrada: "ESPECIALISTA transmite Autoridade.",
        },
      ],
    },
    {
      id: "desconto-b2b",
      titulo: "Limite Máximo de Desconto Concedido",
      cenario:
        "Para fechar uma venda B2B de grande porte, o gerente autorizou conceder um desconto equivalente a 15% sobre o valor de tabela do produto.",
      instrucao: "Calcule e digite o VALOR FINAL do produto após a aplicação do desconto (apenas o número em Reais, ex: 1700):",
      tabelaReferencia: {
        colunas: ["Indicador", "Valor"],
        linhas: [
          ["Valor Original de Tabela", "R$ 2.000,00"],
          ["Percentual de Desconto Autorizado", "15%"],
        ],
      },
      campos: [
        {
          id: "desconto-b2b",
          placeholder: "Digite o valor final...",
          regra: { tipo: "numero", esperado: 1700 },
          mensagemCerta: "Cálculo exato! 15% de R$ 2.000 = R$ 300 de desconto. R$ 2.000 - R$ 300 = R$ 1.700,00 valor final.",
          mensagemErrada: "Incorreto. Calcule 15% de 2000 (que dá 300) e subtraia do valor original de tabela.",
        },
      ],
    },
    {
      id: "objecao-concorrente",
      titulo: "Contorno de Objeção: \"O concorrente faz mais barato\"",
      cenario:
        "Cenário: O cliente potencial ouviu sua proposta de consultoria em vendas, gostou muito da metodologia, mas soltou a objeção clássica: \"Achei excelente, mas a empresa X faz exatamente a mesma consultoria cobrando 30% a menos.\"",
      instrucao:
        "Descreva sua estratégia argumentativa para contornar essa objeção sem entrar em guerra de preços (mínimo de 10 palavras). Você deve mencionar a importância de destacar o diferencial, a qualidade, o retorno (ROI) ou a experiência/suporte.",
      campos: [
        {
          id: "objecao-concorrente",
          placeholder:
            "Ex: Devo demonstrar que nosso diferencial competitivo foca na qualidade superior, no suporte especializado e no retorno sobre o investimento gerado...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /diferencial|qualidade|roi|retorno|suporte|experiência|valor|benefício|especializado/i,
          },
          mensagemCerta:
            "Diagnóstico comercial perfeito! Valorizar o diferencial competitivo e o retorno sobre o investimento impede a desvalorização do seu serviço.",
          mensagemErrada:
            "Sua argumentação deve citar elementos como 'diferencial', 'qualidade', 'suporte' ou 'retorno (ROI)' para justificar o investimento.",
        },
      ],
    },
    {
      id: "proposta-comercial-link",
      titulo: "Desenvolvimento de Proposta Comercial Digital",
      cenario:
        "Uma proposta visualmente atrativa aumenta drasticamente a taxa de conversão de vendas. Utilize o Canva para montar um modelo visual de proposta comercial ou o Google Docs para criar um template de orçamento estruturado.",
      instrucao: "Cole abaixo o link público da sua proposta ou apresentação comercial criada:",
      campos: [
        {
          id: "proposta-comercial-link",
          placeholder: "https://www.canva.com/... ou https://docs.google.com/document/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(canva\.com|docs\.google\.com)\/.+/i },
          mensagemCerta: "Link validado com sucesso! Uma proposta profissional bem desenhada eleva a percepção de valor da sua oferta.",
          mensagemErrada: "URL inválida. Certifique-se de colar o link público de compartilhamento do Canva ou Google Docs.",
        },
      ],
    },
  ],
};

export default atividade;
