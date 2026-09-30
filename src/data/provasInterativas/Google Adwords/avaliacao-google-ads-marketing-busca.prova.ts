import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Google Adwords/
 * avaliacao-google-ads-marketing-busca.prova.html): os mesmos 10 módulos e o
 * mesmo gabarito. Os módulos com várias lacunas/linhas (2, 3, 4, 5, 6, 8 e 9)
 * viraram uma pergunta por lacuna/linha; o 4 (cálculo digitado) virou escolha,
 * porque a dissertativa aceita por "contém" e "5" casaria com "500". Os
 * módulos 7 e 10 seguem abertos, com os mesmos termos-chave da página antiga.
 */
const V_F = ["Verdadeiro", "Falso"];

const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Google Ads e Marketing de Busca — Avaliação",
  perguntas: [
    {
      pergunta:
        "Módulo 1 — Tipos de correspondência. Qual opção descreve corretamente a Correspondência Exata [palavra-chave]?",
      opcoes: [
        "Exibe o anúncio para qualquer pesquisa que tenha relação vaga com o tema, incluindo sinônimos e variações distantes.",
        "Exibe o anúncio apenas quando a pesquisa tem a mesma intenção ou significado idêntico do termo entre colchetes.",
        "Exibe o anúncio apenas se a pesquisa contiver a frase entre aspas, com palavras extras obrigatoriamente antes ou depois.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 2 — KPIs. A porcentagem de usuários que viram o anúncio e clicaram nele é chamada de:",
      opcoes: ["CTR (Click-Through Rate)", "CPC (Custo por Clique)", "CPA (Custo por Aquisição)"],
      correta: 0,
    },
    {
      pergunta: "Módulo 2 — KPIs. O valor médio pago pelo anunciante a cada clique recebido na campanha é o:",
      opcoes: ["CTR (Click-Through Rate)", "CPC (Custo por Clique)", "CPA (Custo por Aquisição)"],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 2 — KPIs. O custo médio para gerar uma conversão ou venda final é representado pelo:",
      opcoes: ["CTR (Click-Through Rate)", "CPC (Custo por Clique)", "CPA (Custo por Aquisição)"],
      correta: 2,
    },
    {
      pergunta:
        "Módulo 3 — Lances inteligentes. Objetivo: obter o máximo volume de conversões dentro de um custo médio meta por ação pré-definido. Qual estratégia de lances é adequada?",
      opcoes: ["CPA Desejado (Target CPA)", "ROAS Desejado (Target ROAS)"],
      correta: 0,
    },
    {
      pergunta:
        "Módulo 3 — Lances inteligentes. Objetivo: maximizar o valor total de receita gerado, com base no retorno percentual sobre o investimento publicitário. Qual estratégia de lances é adequada?",
      opcoes: ["CPA Desejado (Target CPA)", "ROAS Desejado (Target ROAS)"],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 4 — Cálculo. Uma campanha na Rede de Pesquisa registrou 10.000 impressões e 500 cliques. Fórmula: CTR (%) = (cliques ÷ impressões) × 100. Qual é o CTR?",
      opcoes: ["0,5%", "2%", "5%", "50%"],
      correta: 2,
    },
    {
      pergunta:
        "Módulo 4 — Cálculo. Na mesma campanha (500 cliques), o investimento total foi de R$ 1.000,00. Fórmula: CPC médio = investimento ÷ cliques. Qual é o CPC médio?",
      opcoes: ["R$ 0,50", "R$ 2,00", "R$ 5,00", "R$ 20,00"],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 5 — Negativas e Índice de Qualidade. \"Adicionar palavras-chave negativas (ex.: grátis, download, pdf) impede que o anúncio seja exibido para buscas irrelevantes, evitando cliques desqualificados.\"",
      opcoes: V_F,
      correta: 0,
    },
    {
      pergunta:
        "Módulo 5 — Negativas e Índice de Qualidade. \"O Índice de Qualidade (Quality Score) depende unicamente do valor do lance oferecido pelo anunciante, ignorando a relevância da página de destino.\"",
      opcoes: V_F,
      correta: 1,
    },
    {
      pergunta:
        "Módulo 6 — Extensões de anúncio. \"Extensões de Sitelink adicionam links extras abaixo do anúncio, direcionando o usuário para páginas específicas do site (ex.: Fale Conosco, Preços).\"",
      opcoes: V_F,
      correta: 0,
    },
    {
      pergunta:
        "Módulo 6 — Extensões de anúncio. \"Ativar extensões de anúncio garante que o seu anúncio apareça sempre na 1ª posição do Google, sem cobrar pelos cliques.\"",
      opcoes: V_F,
      correta: 1,
    },
    {
      pergunta:
        "Módulo 6 — Extensões de anúncio. \"Frases de Destaque (Callout) permitem incluir textos curtos de diferenciais competitivos, como Atendimento 24h e Frete Grátis.\"",
      opcoes: V_F,
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Módulo 7 — Copywriting. Escreva um anúncio de pesquisa para o produto fictício \"Curso Prático de Gestão Financeira\". Ele deve ter um título persuasivo com a palavra-chave principal e uma descrição com benefício claro e uma chamada para ação (ex.: Inscreva-se, Garanta sua vaga, Confira agora).",
      respostasAceitas: ["inscreva", "garanta", "confira", "compre", "clique", "vagas", "saiba mais", "agora", "hoje"],
    },
    {
      pergunta:
        "Módulo 8 — Hierarquia da conta. Configuração de faturamento, acessos de usuários e fuso horário pertencem a qual nível da estrutura?",
      opcoes: ["1º nível (topo da hierarquia)", "2º nível (intermediário)", "3º nível (específico)"],
      correta: 0,
    },
    {
      pergunta:
        "Módulo 8 — Hierarquia da conta. Definição do orçamento diário, segmento de rede, metas e local geográfico pertencem a qual nível?",
      opcoes: ["1º nível (topo da hierarquia)", "2º nível (intermediário)", "3º nível (específico)"],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 8 — Hierarquia da conta. Organização temática de palavras-chave e redação dos anúncios correspondentes pertencem a qual nível?",
      opcoes: ["1º nível (topo da hierarquia)", "2º nível (intermediário)", "3º nível (específico)"],
      correta: 2,
    },
    {
      pergunta:
        "Módulo 9 — Redes do Google. Capturar demanda de usuários que estão ativamente buscando soluções específicas no buscador (fundo de funil). Qual rede é a mais indicada?",
      opcoes: ["Rede de Pesquisa (Search)", "Rede de Display (banners em sites parceiros)"],
      correta: 0,
    },
    {
      pergunta:
        "Módulo 9 — Redes do Google. Gerar reconhecimento de marca (awareness) e impacto visual em potenciais clientes que navegam em sites parceiros. Qual rede é a mais indicada?",
      opcoes: ["Rede de Pesquisa (Search)", "Rede de Display (banners em sites parceiros)"],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Módulo 10 — Diagnóstico. Uma campanha recebe muitos cliques (CTR alto) e gasta todo o orçamento diário, mas a taxa de conversão está perto de zero. Descreva pelo menos duas ações de otimização imediata que o gestor de tráfego deve fazer.",
      respostasAceitas: ["landing", "pagina", "destino", "negativ", "palavra", "convers", "oferta", "alinh", "velocidade", "carreg", "formulario"],
    },
  ],
};

export default prova;
