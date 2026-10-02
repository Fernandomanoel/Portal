import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Google Adwords/
 * avaliacao-google-ads-marketing-busca.prova.html), sem mudar nada: os mesmos
 * 10 módulos, na mesma ordem, com os mesmos formatos, o mesmo gabarito, as
 * mesmas mensagens e as mesmas palavras-chave. Só o suporte mudou: em vez de
 * página solta, é dado tipado, e o servidor é quem corrige.
 */
const CORRESPONDENCIA = [
  { valor: "ctr", texto: "CTR (Click-Through Rate)" },
  { valor: "cpc", texto: "CPC (Custo por Clique)" },
  { valor: "cpa", texto: "CPA (Custo por Aquisição)" },
];
const LANCES = [
  { valor: "tcpa", texto: "CPA Desejado (Target CPA)" },
  { valor: "troas", texto: "ROAS Desejado (Target ROAS)" },
];
const V_F = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];
const NIVEIS = [
  { valor: "1", texto: "1º Nível (Topo da Hierarquia)" },
  { valor: "2", texto: "2º Nível (Intermediário)" },
  { valor: "3", texto: "3º Nível (Específico)" },
];
const REDES = [
  { valor: "pesquisa", texto: "Rede de Pesquisa (Search)" },
  { valor: "display", texto: "Rede de Display (Banners em portais parceiros)" },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Avaliação Teórica e Estratégica: Google Ads & Marketing de Busca",
  introducao:
    "Teste seus conhecimentos em estratégias de anúncios, correspondência de palavras-chave, lances inteligentes, métricas de tráfego pago, cópias de anúncios e otimização de conversão. Use “Testar resposta” em cada módulo e, no fim, envie a prova.",
  itens: [
    {
      titulo: "[Múltipla Escolha] Tipos de Correspondência de Palavras-Chave",
      enunciado:
        "No Google Ads, a escolha do tipo de correspondência controla o quão próxima a pesquisa do usuário precisa ser da sua palavra-chave. Qual das opções descreve corretamente o comportamento da Correspondência Exata [palavra-chave]?",
      campos: [
        {
          id: "gads1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "a) Exibe o anúncio para qualquer pesquisa que tenha relação vaga com o tema, incluindo sinônimos e variações distantes.",
              "b) Exibe o anúncio apenas quando a pesquisa tem a mesma intenção exata ou significado idêntico do termo entre colchetes.",
              "c) Exibe o anúncio apenas se a pesquisa contiver a frase exata entre aspas com palavras extras obrigatoriamente antes ou depois.",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Correto! Correspondência exata busca a intenção e significado idênticos do termo.",
      mensagemErrada: "Incorreto. A correspondência exata [termo] é acionada para pesquisas com o mesmo significado/intenção.",
    },
    {
      titulo: "[Preenchimento de Lacunas] Indicadores Chave de Desempenho (KPIs)",
      enunciado: "Associe os conceitos das métricas essenciais de campanhas de tráfego pago selecionando o termo correto:",
      campos: [
        {
          id: "gads2-l1",
          rotulo: "A porcentagem de usuários que viram o anúncio e clicaram nele é chamada de ______.",
          regra: { tipo: "selecao", opcoes: CORRESPONDENCIA, esperado: "ctr" },
        },
        {
          id: "gads2-l2",
          rotulo: "O valor médio pago pelo anunciante a cada clique recebido na campanha é o ______,",
          regra: { tipo: "selecao", opcoes: CORRESPONDENCIA, esperado: "cpc" },
        },
        {
          id: "gads2-l3",
          rotulo: "enquanto o custo médio para gerar uma conversão ou venda final é representado pelo ______.",
          regra: { tipo: "selecao", opcoes: CORRESPONDENCIA, esperado: "cpa" },
        },
      ],
      mensagemCerta: "Perfeito! CTR mede taxa de clique, CPC o custo do clique e CPA o custo por conversão.",
      mensagemErrada: "Incorreto. A ordem correta das métricas é: 1º CTR, 2º CPC e 3º CPA.",
    },
    {
      titulo: "[Associação em Tabela] Estratégias de Lances Inteligentes (Smart Bidding)",
      enunciado: "Conecte o objetivo de negócio do anunciante à estratégia automatizada de lances mais apropriada no Google Ads:",
      campos: [
        {
          id: "gads3-t1",
          rotulo: "Obter o máximo volume de conversões dentro de um custo médio meta por ação pré-definido.",
          regra: { tipo: "selecao", opcoes: LANCES, esperado: "tcpa" },
        },
        {
          id: "gads3-t2",
          rotulo: "Maximizar o valor total de receita gerado com base no retorno percentual sobre o investimento publicitário.",
          regra: { tipo: "selecao", opcoes: LANCES, esperado: "troas" },
        },
      ],
      mensagemCerta: "Excelente! Para custo por ação fixo usa-se tCPA; para faturamento percentual usa-se tROAS.",
      mensagemErrada: "Incorreto. Verifique a associação de CPA Desejado e ROAS Desejado.",
    },
    {
      titulo: "[Cálculo Numérico] Cálculo de Métrica de Desempenho (CTR e CPC)",
      enunciado:
        "Cenário da campanha: uma campanha na Rede de Pesquisa registrou 10.000 impressões e gerou 500 cliques. O investimento total no período foi de R$ 1.000,00.",
      referencia: "Fórmulas úteis: • CTR (%) = (Total de Cliques ÷ Total de Impressões) × 100 • CPC Médio (R$) = Investimento Total ÷ Total de Cliques",
      campos: [
        {
          id: "gads4-ctr",
          rotulo: "Informe a Taxa de Clique / CTR em % [Ex: 5]:",
          placeholder: "Digite apenas o número (Ex: 5)",
          regra: { tipo: "numero", esperado: 5 },
          mensagemCerta: "CTR correto: (500 / 10.000) × 100 = 5%.",
          mensagemErrada: "Incorreto. Calcule (500 ÷ 10.000) × 100 (Resultado: 5).",
        },
        {
          id: "gads4-cpc",
          rotulo: "Informe o CPC Médio em R$ [Ex: 2.00]:",
          placeholder: "Digite o valor numérico em R$",
          regra: { tipo: "numero", esperado: 2 },
          mensagemCerta: "CPC correto: R$ 1.000 / 500 cliques = R$ 2,00.",
          mensagemErrada: "Incorreto. Divida R$ 1.000 por 500 cliques (Resultado: 2).",
        },
      ],
    },
    {
      titulo: "[Matriz Verdadeiro ou Falso] Palavras-Chave Negativas e Índice de Qualidade",
      enunciado: "Julgue as afirmações sobre o funcionamento técnico de leilão e otimização no Google Ads:",
      campos: [
        {
          id: "gads5-vf1",
          rotulo:
            "1. Adicionar palavras-chave negativas (ex: \"grátis\", \"download\", \"pdf\") impede que o anúncio seja exibido para buscas irrelevantes, evitando cliques desqualificados.",
          regra: { tipo: "selecao", opcoes: V_F, esperado: "V" },
        },
        {
          id: "gads5-vf2",
          rotulo: "2. O Índice de Qualidade (Quality Score) depende unicamente do valor do lance financeiro oferecido pelo anunciante, ignorando a relevância da Landing Page.",
          regra: { tipo: "selecao", opcoes: V_F, esperado: "F" },
        },
      ],
      mensagemCerta: "Correto! Negativas reduzem tráfego irrelevante (V); Índice de Qualidade considera CTR e Landing Page além do lance (F).",
      mensagemErrada: "Incorreto. Palavras negativas são essenciais (V) e o Índice de Qualidade engloba mais que o lance (F).",
    },
    {
      titulo: "[Seleção Múltipla] Recursos e Extensões de Anúncios de Pesquisa",
      enunciado: "Marque APENAS as afirmativas VERDADEIRAS sobre a utilização de Recursos/Extensões de Anúncios no Google Ads:",
      campos: [
        {
          id: "gads6",
          regra: {
            tipo: "marcar",
            opcoes: [
              "a) Extensões de Sitelink adicionam links extras abaixo do anúncio, direcionando o usuário para páginas específicas do site (ex: \"Fale Conosco\", \"Preços\").",
              "b) Ativar extensões de anúncio garante que o seu anúncio apareça sempre na 1ª posição absoluta do Google sem cobrar pelos cliques.",
              "c) Frases de Destaque (Callout Extensions) permitem incluir textos curtos de diferenciais competitivos como \"Atendimento 24h\" e \"Frete Grátis\".",
            ],
            corretas: [0, 2],
          },
        },
      ],
      mensagemCerta: "Excelente! Sitelinks e Frases de Destaque ampliam o anúncio e aumentam a taxa de clique.",
      mensagemErrada: "Atenção: apenas (a) e (c) são verdadeiras. Extensões não garantem 1ª posição grátis.",
    },
    {
      titulo: "[Redação Estratégica] Copywriting para Anúncio de Pesquisa Responsivo",
      enunciado:
        "Desafio de copywriting: elabore a proposta de texto para um anúncio de pesquisa do produto fictício \"Curso Prático de Gestão Financeira\". O texto deve obrigatoriamente conter: • Um título persuasivo com a palavra-chave principal. • Uma descrição com benefício claro e uma Chamada para Ação (CTA) (ex: \"Inscreva-se\", \"Garanta sua vaga\", \"Confira agora\").",
      campos: [
        {
          id: "gads7-copy",
          placeholder:
            "Exemplo de anúncio:\nTítulo: Curso Prático de Gestão Financeira | Vagas Abertas\nDescrição: Domine o controle de caixa da sua empresa com aulas práticas e planilhas prontas. Garanta sua vaga hoje mesmo!",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: "inscreva|garanta|confira|compre|clique|vagas|curso|finance|agora|hoje|saiba",
            mensagemSemPalavraChave: "Inclua uma Chamada para Ação (CTA) clara (ex: Inscreva-se, Garanta sua vaga, Confira).",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
    {
      titulo: "[Sequenciamento Estrutural] Hierarquia de Organização do Google Ads",
      enunciado: "Ordene do nível mais abrangente (1º Nível) ao nível mais específico (3º Nível) a estrutura de organização de uma conta no Google Ads:",
      campos: [
        {
          id: "gads8-ord1",
          rotulo: "Nível de Conta: configuração de faturamento, acessos de usuários e fuso horário.",
          regra: { tipo: "selecao", opcoes: NIVEIS, esperado: "1" },
        },
        {
          id: "gads8-ord2",
          rotulo: "Nível de Campanha: definição do orçamento diário, segmento de rede, metas e local geográfico.",
          regra: { tipo: "selecao", opcoes: NIVEIS, esperado: "2" },
        },
        {
          id: "gads8-ord3",
          rotulo: "Nível de Grupo de Anúncios: organização temática de palavras-chave e redação de anúncios correspondentes.",
          regra: { tipo: "selecao", opcoes: NIVEIS, esperado: "3" },
        },
      ],
      mensagemCerta: "Correto! A ordem de topo a fundo é: 1º Conta → 2º Campanha → 3º Grupo de Anúncios.",
      mensagemErrada: "Incorreto. A sequência hierárquica é: 1º Conta, 2º Campanha e 3º Grupo de Anúncios.",
    },
    {
      titulo: "[Estratégia de Canais] Rede de Pesquisa vs. Rede de Display",
      enunciado: "Associe o objetivo de marketing à Rede do Google mais adequada para a estratégia:",
      campos: [
        {
          id: "gads9-t1",
          rotulo: "Capturar demanda consciente de usuários ativamente buscando por soluções específicas no buscador (Fundo de Funil).",
          regra: { tipo: "selecao", opcoes: REDES, esperado: "pesquisa" },
        },
        {
          id: "gads9-t2",
          rotulo: "Gerar reconhecimento de marca (Awareness) e impacto visual em potenciais clientes navegando em sites parceiros.",
          regra: { tipo: "selecao", opcoes: REDES, esperado: "display" },
        },
      ],
      mensagemCerta: "Perfeito! Busca ativa pertence à Rede de Pesquisa e visibilidade/awareness à Rede de Display.",
      mensagemErrada: "Incorreto. Intenção ativa = Rede de Pesquisa; Atração visual = Rede de Display.",
    },
    {
      titulo: "[Diagnóstico de Campanha] Resolução de Problemas de Baixa Conversão",
      enunciado:
        "Estudo de caso prático: uma campanha no Google Ads está recebendo muitos cliques (alto CTR), gastando todo o orçamento diário, porém a Taxa de Conversão está próxima de zero. Descreva pelo menos duas ações de otimização imediata que o gestor de tráfego deve realizar para corrigir este problema na Landing Page ou na campanha.",
      campos: [
        {
          id: "gads10-diag",
          placeholder:
            "Explique medidas como: verificar o alinhamento da promessa do anúncio com a Landing Page, negativar palavras-chave irrelevantes que trazem tráfego curioso, melhorar a velocidade de carregamento da página e testar formulários/CTAs...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: "landing|página|destino|negativ|palavra|convers|oferta|alinh|velocid|carreg|form",
            mensagemSemPalavraChave: "Mencione fatores como otimização da Landing Page, alinhamento do anúncio com a oferta ou palavras-chave negativas.",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
  ],
};

export default prova;
