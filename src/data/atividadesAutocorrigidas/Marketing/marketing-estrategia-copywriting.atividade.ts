import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Estratégia de Marketing, Copywriting e Mídia",
  introducao:
    "Esta atividade prática desenvolve o lançamento de uma marca regional de café: diagnóstico com a Matriz FOFA, redação de anúncio, marketing de conteúdo por etapa do funil, escolha de parcerias com influenciadores e análise de métricas de mídias sociais. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "matriz-fofa",
      titulo: "Análise Estratégica: Diagnóstico de Marca (Matriz FOFA)",
      cenario:
        "Uma cafeteria artesanal chamada \"Café Aroma & Grão\" deseja lançar uma linha de cafés especiais em grãos embalados para consumo doméstico. Classifique o seguinte fator do ambiente: \"O aumento significativo no interesse das pessoas por cafés especiais e métodos de preparo artesanais em casa.\"",
      campos: [
        {
          id: "fofa",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Força (Fator interno positivo da empresa)",
              "Oportunidade (Tendência externa positiva do mercado)",
              "Ameaça (Risco externo vindo dos concorrentes)",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O aumento do interesse de mercado é uma Oportunidade (fator externo positivo).",
          mensagemErrada: "Incorreto. Tendências externas positivas do mercado são Oportunidades na Matriz FOFA.",
        },
      ],
    },
    {
      id: "anuncio-lancamento",
      titulo: "Redação Publicitária: Anúncio de Lançamento",
      cenario:
        "Desafio de Redação: Escreva a legenda de um anúncio patrocinado para o Instagram apresentando o Café Aroma & Grão. A legenda deve convidar o público a conhecer os grãos selecionados e oferecer um desconto de boas-vindas na primeira compra.",
      instrucao: "Escreva a legenda do anúncio no campo abaixo.",
      campos: [
        {
          id: "legenda-anuncio",
          placeholder:
            "Ex: Cansado de tomar café comum? Leve a experiência da cafeteria para a sua casa! Grãos 100% arábica selecionados. Use o cupom AROMA10 e ganhe 10% OFF na primeira compra...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /café|grão|lançam|sabor|desconto|cupom|compre|oferta|qualidad|experiênc/i,
          },
          mensagemErrada: "O texto é legível, mas falta incluir termos do produto (café, grão, desconto, cupom, etc.).",
        },
      ],
    },
    {
      id: "marketing-conteudo",
      titulo: "Marketing de Conteúdo: Estratégia de Atrair e Reter",
      cenario:
        "Para educar o público e gerar autoridade sobre café artesanal, proponha um tema de conteúdo de Topo de Funil (Atração) e um de Fundo de Funil (Conversão).",
      campos: [
        {
          id: "conteudo-topo",
          rotulo: "Conteúdo para Topo de Funil (Atrair curiosos/iniciantes)",
          placeholder: "Ex: 3 erros comuns ao passar café em casa que alteram o sabor",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "conteudo-fundo",
          rotulo: "Conteúdo para Fundo de Funil (Convencer a comprar os grãos da marca)",
          placeholder: "Ex: Comparativo: Veja por que nossos grãos selecionados rendem mais e são mais saborosos",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "influenciadores",
      titulo: "Marketing de Influência: Escolha de Parcerias",
      cenario: "Associe o perfil de influenciador ao objetivo de campanha mais adequado.",
      campos: [
        {
          id: "influenciador-1",
          rotulo: "Aumentar o reconhecimento da marca para um grande público geral na cidade.",
          regra: {
            tipo: "selecao",
            esperado: "macro",
            opcoes: [
              { valor: "macro", texto: "Macro-influenciador regional com grande alcance nas redes" },
              { valor: "micro", texto: "Micro-influenciador especialista em gastronomia e café" },
            ],
          },
          mensagemCerta: "Alcance amplo pede um Macro-influenciador regional.",
          mensagemErrada: "Incorreto — reconhecimento amplo junto ao público geral é papel do Macro-influenciador.",
        },
        {
          id: "influenciador-2",
          rotulo: "Gerar credibilidade técnica e alta taxa de recomendação entre entusiastas de café.",
          regra: {
            tipo: "selecao",
            esperado: "micro",
            opcoes: [
              { valor: "macro", texto: "Macro-influenciador regional com grande alcance nas redes" },
              { valor: "micro", texto: "Micro-influenciador especialista em gastronomia e café" },
            ],
          },
          mensagemCerta: "Credibilidade técnica com um nicho é o forte do Micro-influenciador especialista.",
          mensagemErrada: "Incorreto — credibilidade técnica entre entusiastas é papel do Micro-influenciador especialista.",
        },
      ],
    },
    {
      id: "metricas-performance",
      titulo: "Métricas e Avaliação de Performance",
      cenario: "Estudo de Caso: A campanha de lançamento nas redes sociais teve os seguintes resultados.",
      tabelaReferencia: {
        colunas: ["Métrica", "Valor"],
        linhas: [
          ["Visualizações", "50.000"],
          ["Cliques no link do site", "1.200"],
          ["Vendas", "120"],
        ],
      },
      instrucao:
        "Explique por que monitorar o CTR (Taxa de Clique) e a Taxa de Conversão é mais importante do que olhar apenas o número isolado de visualizações (métrica de vaidade).",
      campos: [
        {
          id: "analise-metricas",
          placeholder: "Explique a importância das métricas de ação em relação às visualizações puras...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /venda|clique|conversã|vaidad|resultado|ação|interesse|compra|eficiênc/i,
          },
          mensagemErrada: "A resposta está legível, mas deve mencionar termos como conversão, vendas, cliques ou resultado real.",
        },
      ],
    },
  ],
};

export default atividade;
