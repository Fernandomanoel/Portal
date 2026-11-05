import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O Google Ads (antigo AdWords) coloca anúncios diante de quem está procurando, ou navegando, por algo. O curso explica como o leilão funciona, como montar a primeira campanha, escolher palavras-chave e locais, organizar grupos de anúncios, usar extensões e a Rede de Display e ler as métricas para melhorar o retorno.",
  topicos: [
    {
      titulo: "Como o Google Ads funciona",
      texto: [
        "O Google Ads é uma plataforma de anúncios por leilão. Quando alguém pesquisa, o Google decide quais anúncios mostrar e em que posição, combinando o lance do anunciante com a qualidade do anúncio (relevância do anúncio, experiência na página de destino e taxa de cliques esperada). Por isso o maior lance nem sempre vence.",
        "Existem duas grandes redes: a Rede de Pesquisa (anúncios de texto nos resultados de busca, para quem já está procurando) e a Rede de Display (anúncios visuais em sites e aplicativos parceiros, para despertar interesse). O anunciante normalmente paga por clique (CPC).",
      ],
      pontos: ["Explicar por que a qualidade do anúncio influencia o custo.", "Diferenciar Rede de Pesquisa e Rede de Display.", "Dizer o que significa pagar por clique."],
      erros: ["Achar que quem paga mais sempre aparece em primeiro.", "Esperar vendas imediatas sem uma página de destino adequada."],
      atividades: ["adwords-estrutura-e-planejamento"],
    },
    {
      titulo: "Criando a primeira campanha",
      texto: [
        "Para criar uma campanha decide-se: o objetivo (vendas, contatos, visitas), a rede, o local onde os anúncios aparecem, o orçamento diário e a estratégia de lance (por exemplo, maximizar cliques ou conversões). Uma campanha contém grupos de anúncios, e cada grupo reúne anúncios e palavras-chave de um mesmo tema.",
        "Um bom anúncio de pesquisa tem títulos que repetem o que a pessoa procurou, um benefício claro e uma chamada para ação, e leva a uma página que cumpre a promessa do anúncio.",
      ],
      pontos: ["Listar as decisões da primeira campanha.", "Explicar orçamento diário e lance.", "Escrever um anúncio de pesquisa coerente com a palavra-chave."],
      atividades: ["adwords-primeira-campanha"],
    },
    {
      titulo: "Palavras-chave, correspondência e locais",
      texto: [
        "Palavra-chave é o termo que o anunciante quer associar ao anúncio. O tipo de correspondência controla o quanto o termo digitado pode variar: ampla (alcança variações e assuntos relacionados), de frase (mantém a ordem e o sentido da frase) e exata (aproxima-se do termo exato). Quanto mais ampla, mais alcance e mais risco de cliques irrelevantes.",
        "Palavras-chave negativas impedem que o anúncio apareça para buscas indesejadas (quem procura «grátis» ou «emprego», por exemplo). A segmentação por local mostra o anúncio só onde o negócio atende, o que economiza verba.",
      ],
      pontos: ["Escolher o tipo de correspondência para um caso.", "Criar palavras-chave negativas.", "Segmentar por local."],
      erros: ["Usar só correspondência ampla e gastar verba com cliques que não compram."],
      atividades: ["adwords-locais-palavras-chave-investimento", "adwords-grupos-anuncios-correspondencia"],
    },
    {
      titulo: "Extensões de anúncio e Rede de Display",
      texto: [
        "Extensões acrescentam informações ao anúncio: ligação (telefone), local (endereço), sitelinks (links extras para páginas do site) e frases de destaque. Em geral aumentam o espaço do anúncio e a taxa de cliques, sem custo adicional por si só (o clique continua pago).",
        "Na Rede de Display o anúncio é visual e trabalha o público por interesses, intenções e remarketing (mostrar para quem já visitou o site). É mais barata por clique, mas o público ainda não está buscando: serve mais para lembrança de marca e retomada de visitantes.",
      ],
      pontos: ["Dar exemplos de extensões úteis para um negócio local.", "Explicar remarketing.", "Dizer quando usar Display e quando usar Pesquisa."],
      atividades: ["adwords-extensoes-de-anuncio", "adwords-rede-de-display-e-intencoes"],
    },
    {
      titulo: "Métricas e cliques qualificados",
      texto: [
        "Impressões são as vezes que o anúncio apareceu; CTR (taxa de cliques) é cliques ÷ impressões; CPC é o custo por clique; conversão é a ação desejada (compra, formulário, ligação); CPA é o custo por conversão. Clique qualificado é o de quem realmente pode comprar: de nada adianta muito clique sem conversão.",
        "O ciclo de melhoria é: olhar os termos de pesquisa, adicionar negativas, ajustar lances e locais, melhorar anúncios e páginas, e comparar o custo por conversão com o lucro da venda para saber se a campanha dá retorno.",
      ],
      pontos: ["Calcular CTR e CPA.", "Explicar clique qualificado.", "Decidir uma ação de melhoria a partir de uma métrica."],
      exemplo: "1.000 impressões e 50 cliques: CTR de 5%. Gastos de R$ 100 com 5 vendas: CPA de R$ 20.",
      erros: ["Comemorar muitos cliques sem olhar as conversões."],
      atividades: ["adwords-metricas-e-cliques-qualificados", "adwords-campanha-de-sucesso-resultados"],
    },
  ],
  glossario: [
    { termo: "CPC", definicao: "Custo por clique: o que se paga cada vez que alguém clica no anúncio." },
    { termo: "CTR", definicao: "Taxa de cliques: cliques divididos por impressões." },
    { termo: "Conversão", definicao: "A ação que o anunciante quer (compra, contato, cadastro)." },
    { termo: "Palavra-chave negativa", definicao: "Termo que impede o anúncio de aparecer para certas buscas." },
    { termo: "Remarketing", definicao: "Mostrar anúncios para pessoas que já visitaram o site ou aplicativo." },
    { termo: "Rede de Pesquisa", definicao: "Anúncios de texto exibidos nos resultados de busca do Google." },
    { termo: "Sitelink", definicao: "Link extra no anúncio, que leva a uma página específica do site." },
  ],
  dicas: [
    "O Google Ads muda de aparência com frequência: ensine o conceito e peça que o aluno encontre a função no painel do momento.",
    "Use um negócio local conhecido (uma pizzaria, uma clínica) para treinar palavras-chave, locais e extensões.",
    "Peça sempre a conta do retorno: quanto custou cada venda e quanto a venda dá de lucro.",
    "Se não houver conta real de anúncios, trabalhe com o planejador e com capturas de tela, sem gastar verba.",
  ],
};

export default conteudo;
