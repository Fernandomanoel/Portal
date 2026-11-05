import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Marketing é o conjunto de decisões que levam um produto até quem precisa dele e fazem essa pessoa preferir a marca. O curso percorre os fundamentos (marketing x propaganda, 4 Ps, persona, funil), a escrita publicitária (copywriting), a construção de marca (branding), o planejamento de campanhas e mídia e as métricas de crescimento (growth).",
  topicos: [
    {
      titulo: "Marketing, propaganda e os 4 Ps",
      texto: [
        "Marketing é a área inteira: pesquisar o cliente, decidir o que vender, a que preço, onde e como comunicar. Propaganda é só uma ferramenta dentro dele, a comunicação paga e persuasiva (anúncio, comercial, patrocinado). Quem confunde os dois acha que fazer marketing é «postar anúncio».",
        "O composto de marketing, os 4 Ps, organiza as decisões: Produto (o que se vende e seus atributos), Preço (quanto custa e como se paga), Praça (onde e como chega ao cliente) e Promoção (como se comunica). Uma decisão num P afeta os outros: baixar o preço (Preço) exige comunicar a oferta (Promoção).",
      ],
      pontos: ["Distinguir marketing (o todo) de propaganda (uma ferramenta).", "Classificar uma ação de uma empresa em um dos 4 Ps.", "Explicar que os 4 Ps trabalham juntos."],
      exemplo: "Uma padaria cria um combo de café da manhã (Produto), por R$ 19,90 (Preço), vendido no balcão e por aplicativo de entrega (Praça), e anuncia no Instagram (Promoção).",
      erros: ["Achar que promoção é só desconto: Promoção é toda a comunicação.", "Misturar Praça com «lugar da loja»: inclui canais de venda e logística."],
      atividades: ["marketing-propaganda", "marketing-branding-midia"],
    },
    {
      titulo: "Público-alvo, persona e funil de vendas",
      texto: [
        "Público-alvo é o grupo de pessoas que a empresa quer atingir (por exemplo, mulheres de 25 a 45 anos de uma cidade). Persona é um personagem fictício, construído com dados reais, que representa o cliente ideal: nome, idade, rotina, dores, desejos, onde se informa. A persona orienta o tom, o canal e a oferta.",
        "O funil de vendas descreve a jornada: topo (descoberta, a pessoa nem conhece a marca), meio (consideração, compara opções) e fundo (decisão, está pronta para comprar). Cada ação de comunicação atua numa etapa: um artigo educativo está no topo; um depoimento, no meio; uma oferta com prazo, no fundo.",
      ],
      pontos: ["Montar uma persona com dados e dores.", "Classificar conteúdos nas etapas do funil.", "Escolher o canal pela persona."],
      erros: ["Tentar vender no topo do funil (oferta para quem acabou de conhecer a marca).", "Fazer persona com adjetivos vagos («pessoas que gostam de qualidade»)."],
      atividades: ["marketing-propaganda", "marketing-estrategia-copywriting", "marketing-campanhas-modelagem-midia"],
    },
    {
      titulo: "Copywriting: escrever para vender",
      texto: [
        "Copywriting é a escrita persuasiva de anúncios, páginas e posts. Uma boa copy começa por um título forte (a headline), fala do benefício e não só da característica, usa linguagem do cliente e termina com uma chamada para ação (CTA) clara.",
        "Três fórmulas aparecem nas atividades. PAS: Problema, Agitação (mostrar o custo de não resolver) e Solução. AIDA: Atenção, Interesse, Desejo e Ação. BAB: Before (antes, a situação difícil), After (depois, a vida resolvida) e Bridge (a ponte: o produto).",
      ],
      pontos: ["Reescrever uma característica como benefício.", "Aplicar PAS, AIDA e BAB num texto curto.", "Escrever uma CTA com verbo de ação."],
      exemplo: "Característica: «colchão de espuma D33». Benefício: «acorde sem dor nas costas». CTA: «Experimente por 30 dias».",
      erros: ["Texto longo falando da empresa em vez do cliente.", "CTA fraca (“saiba mais” em tudo) ou várias CTAs competindo."],
      atividades: ["marketing-estrategia-copywriting", "marketing-branding-publicidade-avancada", "marketing-growth-avancado"],
    },
    {
      titulo: "Branding: marca, posicionamento e reputação",
      texto: [
        "Marca é o que as pessoas pensam e sentem sobre a empresa, não só o logotipo. Branding é o trabalho de construir isso: propósito, valores, personalidade, posicionamento (o lugar que a marca quer ocupar na cabeça do cliente) e identidade visual coerente.",
        "Os arquétipos de marca (como o Herói, o Sábio, o Cuidador, o Rebelde) ajudam a definir a personalidade e o tom de voz. Reputação é construída com o que a marca faz, e ameaçada em crises: a resposta pede rapidez, empatia, transparência e levar o caso para um canal privado, sem apagar nem ignorar o cliente.",
      ],
      pontos: ["Explicar posicionamento com um exemplo.", "Escolher um arquétipo coerente com o público.", "Descrever os passos de uma resposta de crise."],
      erros: ["Confundir marca com logotipo.", "Responder reclamação com ironia ou apagando o comentário."],
      atividades: ["marketing-branding-midia", "marketing-branding-publicidade-avancada"],
    },
    {
      titulo: "Campanha e planejamento de mídia",
      texto: [
        "Uma campanha parte de um briefing (empresa, produto, público, objetivo, verba e prazo), tem um conceito criativo (a ideia central), um slogan, canais escolhidos pela persona e um cronograma em fases: pré-lançamento (expectativa), lançamento (oferta) e pós-lançamento (depoimentos, recompra).",
        "Mídia paga (anúncios), mídia própria (site, perfis, e-mail) e mídia conquistada (menções, imprensa, indicações) se somam. O objetivo precisa ser mensurável (número e prazo) e ligado a KPIs: pedidos, custo por pedido, taxa de conversão, alcance.",
      ],
      pontos: ["Escrever um objetivo com número e prazo.", "Montar o cronograma em três fases.", "Escolher KPIs coerentes com o objetivo."],
      erros: ["Objetivo vago («aumentar vendas»).", "Medir só curtidas quando o objetivo é vender."],
      atividades: ["marketing-campanha-empresa", "marketing-campanhas-modelagem-midia", "marketing-growth-midia-lancamentos"],
    },
    {
      titulo: "Growth: CAC, LTV, conversão e teste A/B",
      texto: [
        "Growth marketing trata o crescimento como experimento medido. CAC é o custo para conquistar um cliente (investimento em marketing ÷ clientes novos). LTV é o lucro que o cliente deixa durante todo o relacionamento. A relação LTV/CAC mostra se vale investir: perto de 3 costuma ser considerada saudável.",
        "A taxa de conversão é a parte dos visitantes que realiza a ação desejada (compras ÷ visitas × 100). Para melhorá-la usa-se o teste A/B: duas versões mostradas ao mesmo tempo a públicos parecidos, mudando um elemento por vez. Modelos de atribuição dizem a qual canal dar o crédito da venda.",
      ],
      pontos: ["Calcular CAC, LTV/CAC e taxa de conversão.", "Explicar por que o teste A/B muda uma variável por vez.", "Interpretar uma métrica de mídia."],
      exemplo: "R$ 6.000 em marketing e 120 clientes novos: CAC = R$ 50. Se cada cliente deixa R$ 150, LTV/CAC = 3.",
      erros: ["Mudar vários elementos no teste e não saber o que funcionou.", "Comparar o CAC sem considerar o LTV."],
      atividades: ["marketing-growth-avancado", "marketing-growth-midia-lancamentos"],
    },
  ],
  glossario: [
    { termo: "Briefing", definicao: "Documento com as informações que orientam uma campanha: empresa, público, objetivo, verba e prazo." },
    { termo: "CTA", definicao: "Chamada para ação: a frase que diz o que a pessoa deve fazer agora (comprar, chamar, baixar)." },
    { termo: "CAC", definicao: "Custo de aquisição de cliente: investimento em marketing dividido pelos clientes novos." },
    { termo: "LTV", definicao: "Lucro (ou receita) total que um cliente gera durante o relacionamento com a empresa." },
    { termo: "KPI", definicao: "Indicador-chave de desempenho: a métrica que mostra se o objetivo foi atingido." },
    { termo: "Teste A/B", definicao: "Comparação de duas versões mudando um único elemento, para ver qual converte mais." },
    { termo: "Persona", definicao: "Personagem fictício, feito com dados reais, que representa o cliente ideal." },
  ],
  dicas: [
    "Comece cada tópico por uma marca que o aluno conhece (um mercado, uma loja da região) e peça que identifique os 4 Ps ou o funil nela.",
    "Nas atividades de copy, peça que o aluno leia o texto em voz alta: frase que trava na fala está confusa.",
    "Nos cálculos (CAC, LTV, conversão) deixe a fórmula escrita no quadro e insista em dizer a unidade: reais ou porcentagem.",
    "Em campanha, exija sempre objetivo com número e prazo antes de deixar o aluno escolher canais.",
  ],
};

export default conteudo;
