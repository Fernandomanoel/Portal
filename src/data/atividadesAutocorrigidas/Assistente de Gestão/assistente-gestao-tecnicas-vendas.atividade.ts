import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Técnicas e Gestão de Vendas",
  introducao:
    "Perfil do profissional de vendas moderno, procedimento de atendimento consultivo e cálculo de metas e comissões.",
  itens: [
    {
      id: "atendimento-consultivo",
      titulo: "O Procedimento de Atendimento ao Cliente",
      cenario: "Um atendimento de excelência segue etapas lógicas para guiar o cliente até o fechamento.",
      instrucao: "Associe a atitude do vendedor à etapa correspondente do processo de vendas.",
      campos: [
        {
          id: "atendimento-row1",
          rotulo:
            "Fazer perguntas abertas e ouvir ativamente para descobrir quais são as reais \"dores\" e necessidades do cliente antes de oferecer qualquer produto.",
          regra: {
            tipo: "selecao",
            esperado: "sondagem",
            opcoes: [
              { valor: "prospeccao", texto: "Prospecção" },
              { valor: "sondagem", texto: "Sondagem / Diagnóstico" },
              { valor: "contorno", texto: "Contorno de Objeções" },
            ],
          },
          mensagemCerta: "Perfeito! Ouvir o cliente é Sondagem; Argumentar sobre preço é Contorno de Objeções; Buscar na internet é Prospecção.",
          mensagemErrada: "Incorreto. Revise as etapas: Pesquisar clientes = Prospecção; Fazer perguntas = Sondagem; Tratar recusas = Contorno de Objeções.",
        },
        {
          id: "atendimento-row2",
          rotulo:
            "Ouvir o cliente dizer \"está muito caro\" e responder demonstrando o custo-benefício e o valor agregado que o produto trará a longo prazo.",
          regra: {
            tipo: "selecao",
            esperado: "contorno",
            opcoes: [
              { valor: "prospeccao", texto: "Prospecção" },
              { valor: "sondagem", texto: "Sondagem / Diagnóstico" },
              { valor: "contorno", texto: "Contorno de Objeções" },
            ],
          },
          mensagemCerta: "Perfeito! Ouvir o cliente é Sondagem; Argumentar sobre preço é Contorno de Objeções; Buscar na internet é Prospecção.",
          mensagemErrada: "Incorreto. Revise as etapas: Pesquisar clientes = Prospecção; Fazer perguntas = Sondagem; Tratar recusas = Contorno de Objeções.",
        },
        {
          id: "atendimento-row3",
          rotulo:
            "Pesquisar na internet, no LinkedIn ou em listas de contatos potenciais clientes (leads) que tenham o perfil ideal para comprar a solução da empresa.",
          regra: {
            tipo: "selecao",
            esperado: "prospeccao",
            opcoes: [
              { valor: "prospeccao", texto: "Prospecção" },
              { valor: "sondagem", texto: "Sondagem / Diagnóstico" },
              { valor: "contorno", texto: "Contorno de Objeções" },
            ],
          },
          mensagemCerta: "Perfeito! Ouvir o cliente é Sondagem; Argumentar sobre preço é Contorno de Objeções; Buscar na internet é Prospecção.",
          mensagemErrada: "Incorreto. Revise as etapas: Pesquisar clientes = Prospecção; Fazer perguntas = Sondagem; Tratar recusas = Contorno de Objeções.",
        },
      ],
    },
    {
      id: "perfil-vendedor",
      titulo: "O Perfil do Profissional de Vendas",
      cenario: "O mercado mudou e o perfil do \"vendedor tirador de pedidos\" ficou no passado.",
      instrucao: "Avalie as afirmações sobre o perfil do vendedor moderno como Verdadeira (V) ou Falsa (F).",
      campos: [
        {
          id: "perfil-vendedor-row1",
          rotulo:
            "1. Um excelente profissional de vendas precisa focar apenas em falar muito e ser altamente extrovertido, sendo a habilidade de \"ouvir o cliente\" uma competência secundária.",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Excelente leitura! Saber ouvir ativamente é MAIS importante do que apenas falar (Falso). A resiliência blinda o vendedor contra frustrações (Verdadeiro).",
          mensagemErrada:
            "Atenção: O bom vendedor ouve mais do que fala, a época do falastrão acabou (A primeira é Falsa). Resiliência e Empatia são habilidades reais de vendas (A segunda é Verdadeira).",
        },
        {
          id: "perfil-vendedor-row2",
          rotulo:
            "2. A resiliência (capacidade de lidar com constantes \"nãos\") e a empatia (colocar-se no lugar do cliente) são soft skills indispensáveis para o sucesso nas vendas consultivas.",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Excelente leitura! Saber ouvir ativamente é MAIS importante do que apenas falar (Falso). A resiliência blinda o vendedor contra frustrações (Verdadeiro).",
          mensagemErrada:
            "Atenção: O bom vendedor ouve mais do que fala, a época do falastrão acabou (A primeira é Falsa). Resiliência e Empatia são habilidades reais de vendas (A segunda é Verdadeira).",
        },
      ],
    },
    {
      id: "metas-comissoes",
      titulo: "Apuração de Metas e Comissões",
      cenario: "Saber calcular seus próprios ganhos é essencial para gerenciar suas metas. Ajude o vendedor Carlos a calcular sua comissão do mês.",
      instrucao:
        "Espelho de Vendas - Carlos (mês atual). Calcule e digite o valor financeiro exato da comissão de Carlos em Reais (apenas números, sem \"R$\").",
      tabelaReferencia: {
        colunas: ["Indicador", "Valor"],
        linhas: [
          ["Total Faturado no Mês", "R$ 45.000,00"],
          ["Percentual de Comissão Base", "4% (0,04)"],
          ["Fórmula aplicada", "45.000 × 0,04"],
        ],
      },
      campos: [
        {
          id: "comissao-carlos",
          placeholder: "Exemplo: 1200",
          regra: { tipo: "numero", esperado: 1800 },
          mensagemCerta: "Cálculo exato! 4% de R$ 45.000,00 resulta exatamente em R$ 1.800,00 de comissão.",
          mensagemErrada: "Incorreto. Multiplique o faturamento (45000) por 0,04 (ou divida por 100 e multiplique por 4).",
        },
      ],
    },
    {
      id: "objecao-preco",
      titulo: "Tratativa da Objeção de Preço",
      cenario:
        "Após você apresentar sua proposta, o cliente cruza os braços e diz: \"Gostei do atendimento, mas o orçamento do seu concorrente está 20% mais barato. Não consigo fechar com você por esse preço.\"",
      instrucao:
        "Como um vendedor consultivo, descreva sua argumentação para não perder a venda, sem simplesmente dar desconto imediato (mínimo de 10 palavras). Dica: utilize palavras como \"valor\", \"benefício\", \"diferencial\" ou \"qualidade\".",
      campos: [
        {
          id: "objecao-preco-resposta",
          placeholder:
            "Ex: Entendo sua preocupação com o preço, mas gostaria de ressaltar o valor agregado do nosso produto, focando nos benefícios exclusivos e no nosso diferencial de suporte técnico...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /valor|benefício|benefícios|diferencial|qualidade|roi|retorno|solução|garantia/i,
          },
          mensagemCerta:
            "Excelente técnica! Deslocar o foco do PREÇO para o VALOR agregado e os benefícios exclusivos é a base da venda consultiva bem-sucedida.",
          mensagemErrada:
            "Você deve ancorar a venda não apenas no preço, mas mencionar o 'valor', o 'diferencial', a 'qualidade' ou os 'benefícios' da sua solução.",
        },
      ],
    },
    {
      id: "pitch-vendas",
      titulo: "Roteiro de Abordagem (Pitch de Vendas)",
      cenario:
        "O \"Elevator Pitch\" é um discurso de apresentação curto e persuasivo sobre sua solução. Utilize o Google Docs para escrever um breve roteiro de vendas ou o Canva para criar um slide de apresentação visual do seu produto/serviço.",
      instrucao: "Cole abaixo o link público de compartilhamento do seu material (Google Docs ou Canva).",
      campos: [
        {
          id: "pitch-link",
          placeholder: "https://docs.google.com/document/... ou https://canva.com/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(docs\.google\.com\/document|canva\.com)\/.+/i },
          mensagemCerta: "Link validado! Ter um pitch (roteiro) bem estruturado transmite profissionalismo e segurança na abordagem.",
          mensagemErrada: "URL inválida. Certifique-se de colar o link público de um documento (Google Docs) ou design (Canva).",
        },
      ],
    },
  ],
};

export default atividade;
