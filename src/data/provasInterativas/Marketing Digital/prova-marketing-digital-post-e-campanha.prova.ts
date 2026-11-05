import type { CampoProva, ProvaInterativa } from "@/types/quiz";

/**
 * Prova de Marketing Digital feita inteira no portal, sem outro programa.
 * Parte A: nove questões sobre os assuntos das atividades de Marketing
 * (marketing e propaganda, 4 Ps, persona, funil, copywriting, Matriz FOFA,
 * CAC e LTV, conversão e teste A/B, gestão de crise).
 * Parte B: uma prática dividida em seis questões, cuja demanda é criar um
 * POST e uma CAMPANHA para uma empresa fictícia. Os textos são conferidos
 * pelos elementos que um bom post e uma boa campanha precisam ter (objetivo
 * com número e prazo, chamada para ação, hashtag, slogan curto, fases da
 * campanha...), aceitando redações diferentes. Cada questão vale 1 ponto e
 * tem 3 testes; a nota é acertos ÷ questões × 10.
 */
const opcoes = (...textos: string[]) => textos.map((texto, i) => ({ valor: String(i), texto }));
const FUNIL = opcoes("Topo do funil (descoberta)", "Meio do funil (consideração)", "Fundo do funil (decisão)");
const funil = (id: string, rotulo: string, certo: 0 | 1 | 2, porque: string): CampoProva => ({
  id,
  rotulo,
  regra: { tipo: "selecao", opcoes: FUNIL, esperado: String(certo) },
  mensagemCerta: porque,
  mensagemErrada: "Pense em quem está vendo: ainda não conhece a marca (topo), compara opções (meio) ou está pronto para comprar (fundo)?",
});

const BRIEFING = [
  "EMPRESA (fictícia): Doce Raiz, padaria artesanal de Campinas (SP) que faz pães, bolos e salgados com ingredientes naturais e entrega na região.",
  "PRODUTO NOVO: o Box Café da Manhã, com 2 pães, 1 bolo pequeno, geleia e suco natural, para 2 pessoas, a R$ 59,90 com entrega.",
  "DEMANDA: criar 1 POST e 1 CAMPANHA para lançar o box. A empresa tem Instagram (3.500 seguidores), WhatsApp para pedidos e R$ 1.500 de verba para anúncios.",
  "Nas seis etapas abaixo você define o objetivo e o público, escolhe o formato, escreve o post, cria o conceito da campanha, a coloca no funil e planeja a meta e o cronograma.",
].join("\n");

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Prova de Marketing Digital — post e campanha",
  introducao:
    "Prova de Marketing Digital feita aqui mesmo, sem abrir nenhum outro programa. A Parte A tem nove questões sobre os assuntos das atividades. A Parte B é uma prática dividida em seis questões: você cria um post e uma campanha para uma empresa. Use «Testar resposta» em cada questão (3 testes). Cada questão vale 1 ponto.",
  itens: [
    // ---------------------------------------------------------------- Parte A
    {
      titulo: "Parte A, questão 1: Marketing e propaganda (1 pt)",
      enunciado: "Qual alternativa diferencia corretamente marketing de propaganda?",
      campos: [
        {
          id: "resposta",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Propaganda é o conjunto de estratégias de mercado; marketing é só o anúncio pago",
              "Marketing é o conjunto de estratégias para entender o cliente e levar valor a ele; propaganda é uma das ferramentas, a comunicação paga e persuasiva",
              "Marketing e propaganda são sinônimos",
              "Marketing só existe na internet; propaganda só existe na TV",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Isso mesmo! A propaganda é uma peça dentro do marketing.",
      mensagemErrada: "Marketing é o todo (pesquisa, produto, preço, praça, comunicação). Propaganda é a comunicação paga dentro dele.",
    },
    {
      titulo: "Parte A, questão 2: Os 4 Ps (1 pt)",
      enunciado: "Uma loja decide baixar o valor do produto por 20% na Black Friday. Em qual dos 4 Ps do composto de marketing essa decisão se encaixa?",
      campos: [{ id: "resposta", regra: { tipo: "multipla_escolha", opcoes: ["Produto", "Preço", "Praça (distribuição)", "Promoção (comunicação)"], correta: 1 } }],
      mensagemCerta: "Correto! Definir o valor cobrado é decisão de Preço.",
      mensagemErrada: "Os 4 Ps são Produto, Preço, Praça e Promoção. O valor cobrado pelo produto é o Preço.",
    },
    {
      titulo: "Parte A, questão 3: Persona (1 pt)",
      enunciado: "O que é uma persona em marketing?",
      campos: [
        {
          id: "resposta",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Um funcionário que representa a empresa nas redes",
              "Um personagem fictício, criado a partir de dados reais, que representa o cliente ideal (idade, rotina, dores e desejos)",
              "O logotipo da marca",
              "A lista com todos os clientes que já compraram",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Isso mesmo! A persona orienta o tom, o canal e a oferta.",
      mensagemErrada: "Persona é o retrato semi-fictício do cliente ideal, feito com dados reais, para guiar as decisões de comunicação.",
    },
    {
      titulo: "Parte A, questão 4: Funil de vendas (1 pt)",
      enunciado: "Em qual etapa do funil entra um artigo de blog que ensina a escolher um bom café, para quem ainda nem conhece a marca?",
      campos: [funil("etapa", "Etapa do funil:", 0, "Isso mesmo! Conteúdo educativo atrai quem ainda está descobrindo o assunto: topo do funil.")],
      mensagemCerta: "Correto!",
      mensagemErrada: "Conteúdo educativo, para quem ainda não conhece a marca, atua no topo do funil.",
    },
    {
      titulo: "Parte A, questão 5: Fórmulas de copywriting (1 pt)",
      enunciado: "Complete o significado de cada fórmula de texto publicitário.",
      campos: [
        {
          id: "pas",
          rotulo: "PAS significa:",
          regra: { tipo: "selecao", opcoes: opcoes("Problema, Agitação, Solução", "Produto, Anúncio, Site", "Preço, Atenção, Satisfação"), esperado: "0" },
          mensagemCerta: "PAS: mostra o problema, o agita e apresenta a solução.",
          mensagemErrada: "PAS é Problema, Agitação, Solução.",
        },
        {
          id: "aida",
          rotulo: "AIDA significa:",
          regra: { tipo: "selecao", opcoes: opcoes("Atenção, Interesse, Desejo, Ação", "Anúncio, Imagem, Dados, Alcance", "Atração, Informação, Desconto, Aviso"), esperado: "0" },
          mensagemCerta: "AIDA: Atenção, Interesse, Desejo e Ação.",
          mensagemErrada: "AIDA é Atenção, Interesse, Desejo, Ação.",
        },
      ],
      mensagemCerta: "Muito bem! Você conhece as duas fórmulas.",
      mensagemErrada: "Revise: PAS = Problema, Agitação, Solução. AIDA = Atenção, Interesse, Desejo, Ação.",
    },
    {
      titulo: "Parte A, questão 6: Matriz FOFA (1 pt)",
      enunciado: "Uma padaria descobre que um concorrente grande vai abrir uma loja no mesmo bairro. Na Matriz FOFA (SWOT), isso é...",
      campos: [{ id: "resposta", regra: { tipo: "multipla_escolha", opcoes: ["Força", "Oportunidade", "Fraqueza", "Ameaça"], correta: 3 } }],
      mensagemCerta: "Correto! Fatores externos que podem prejudicar são Ameaças.",
      mensagemErrada: "Forças e Fraquezas são internas; Oportunidades e Ameaças vêm de fora. Um concorrente novo é externo e prejudica: Ameaça.",
    },
    {
      titulo: "Parte A, questão 7: CAC e LTV (1 pt)",
      enunciado: "Uma loja gastou R$ 6.000,00 em marketing e conquistou 120 clientes novos. Cada cliente gera, em média, R$ 150,00 de lucro durante todo o relacionamento (LTV).",
      referencia: "CAC = investimento em marketing ÷ clientes novos\nRelação LTV/CAC = LTV ÷ CAC",
      campos: [
        { id: "cac", rotulo: "CAC (R$):", regra: { tipo: "numero", esperado: 50, tolerancia: 0.01 }, mensagemCerta: "R$ 6.000 ÷ 120 = R$ 50,00.", mensagemErrada: "Divida o investimento pelo número de clientes novos." },
        { id: "relacao", rotulo: "Relação LTV/CAC:", regra: { tipo: "numero", esperado: 3, tolerancia: 0.01 }, mensagemCerta: "R$ 150 ÷ R$ 50 = 3: cada real investido volta três vezes.", mensagemErrada: "Divida o LTV pelo CAC." },
      ],
      mensagemCerta: "Excelente! Relação LTV/CAC de 3 costuma ser considerada saudável.",
      mensagemErrada: "Calcule primeiro o CAC (investimento ÷ clientes novos) e depois divida o LTV pelo CAC.",
    },
    {
      titulo: "Parte A, questão 8: Conversão e teste A/B (1 pt)",
      enunciado: "Uma página de vendas recebeu 2.000 visitas e gerou 60 compras. Depois, a equipe fez um teste A/B para melhorar a página.",
      campos: [
        { id: "taxa", rotulo: "Taxa de conversão (%):", regra: { tipo: "numero", esperado: 3, tolerancia: 0.01 }, mensagemCerta: "60 ÷ 2.000 = 3%.", mensagemErrada: "Taxa de conversão = compras ÷ visitas × 100." },
        {
          id: "ab",
          rotulo: "Como fazer um teste A/B correto?",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Mudar vários elementos de uma vez para ganhar tempo",
              "Mostrar duas versões a públicos parecidos ao mesmo tempo, mudando um elemento por vez",
              "Mostrar a versão nova só aos clientes mais antigos",
            ],
            correta: 1,
          },
          mensagemCerta: "Isso mesmo: uma variável por vez, no mesmo período.",
          mensagemErrada: "Para saber o que causou a diferença, mude um elemento por vez e compare públicos parecidos ao mesmo tempo.",
        },
      ],
      mensagemCerta: "Muito bem!",
      mensagemErrada: "Confira a conta da conversão e a regra do teste A/B (um elemento por vez).",
    },
    {
      titulo: "Parte A, questão 9: Reputação e crise (1 pt)",
      enunciado: "Um cliente publica uma reclamação com foto no perfil da empresa e o post começa a ser compartilhado. Qual é a melhor primeira atitude?",
      campos: [
        {
          id: "resposta",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Apagar o comentário e bloquear o cliente",
              "Ignorar até a polêmica passar",
              "Responder rápido, com empatia e transparência, e levar a solução para o canal privado",
              "Responder com ironia, para mostrar bom humor",
            ],
            correta: 2,
          },
        },
      ],
      mensagemCerta: "Correto! Resposta rápida, empática e transparente protege a reputação.",
      mensagemErrada: "Apagar ou ignorar piora a crise. O melhor é responder com rapidez, empatia e transparência, e resolver no privado.",
    },

    // ---------------------------------------------------------------- Parte B
    {
      titulo: "Parte B, prática 1: Objetivo e público (1 pt)",
      enunciado: "Leia o briefing e defina o objetivo da campanha e o público do post.",
      referencia: BRIEFING,
      campos: [
        {
          id: "objetivo",
          rotulo: "Objetivo da campanha (com um número e um prazo):",
          placeholder: "Ex.: Vender 100 boxes em 30 dias...",
          regra: {
            tipo: "texto",
            minPalavras: 6,
            minCaracteres: 20,
            palavrasChave: String.raw`(?=[\s\S]*\d)(?=[\s\S]*(dia|semana|m[eê]s|prazo|at[eé]|trimestre))`,
            mensagemSemPalavraChave: "Um bom objetivo é mensurável: inclua um número (quantos pedidos, quantos reais) e um prazo (em quantos dias ou semanas).",
          },
          mensagemCerta: "Objetivo mensurável, com número e prazo.",
        },
        {
          id: "publico",
          rotulo: "Público-alvo (descreva a persona):",
          placeholder: "Ex.: Mulheres de 28 a 45 anos, que moram em Campinas...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: String.raw`\b(anos|jovem|jovens|adult\w*|m[aã]e|m[aã]es|pais|casal|casais|fam[ií]lia\w*|estudante\w*|profission\w*|trabalh\w*|mulher\w*|homem|homens|morador\w*|bairro|campinas|rotina|renda|classe)\b`,
            mensagemSemPalavraChave: "Descreva quem é a pessoa: idade, onde mora, o que faz e o que ela valoriza (rotina, renda, desejos).",
          },
          mensagemCerta: "Persona bem descrita.",
        },
      ],
      mensagemCerta: "Briefing definido: objetivo com número e prazo e um público claro.",
      mensagemErrada: "Revise os dois campos: o objetivo precisa de número e prazo e o público, de características reais da persona.",
    },
    {
      titulo: "Parte B, prática 2: Formato e canal do post (1 pt)",
      enunciado: "Para o post de lançamento do Box Café da Manhã, com o objetivo de gerar pedidos, qual escolha é a mais adequada?",
      referencia: "Doce Raiz — Box Café da Manhã (R$ 59,90). Pedidos pelo WhatsApp. Instagram com 3.500 seguidores.",
      campos: [
        {
          id: "formato",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Texto longo no LinkedIn, sem imagem, explicando a história da padaria",
              "Reels ou carrossel no Instagram, com foto ou vídeo do box na mesa, legenda curta e chamada para pedir pelo WhatsApp",
              "Post só com o logotipo e a palavra «novidade», sem link nem preço",
              "Banner em um site de notícias nacional, com 30 linhas de texto",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Isso mesmo! O produto é visual, o público está no Instagram e o caminho do pedido (WhatsApp) fica claro.",
      mensagemErrada: "Pense onde está o público, o que vende o produto (imagem do box) e como a pessoa faz o pedido (um caminho claro, como o WhatsApp).",
    },
    {
      titulo: "Parte B, prática 3: Crie o post (1 pt)",
      enunciado: "Escreva a legenda do post e descreva a arte (a foto ou o vídeo) que vai com ela.",
      referencia: "Box Café da Manhã: 2 pães, 1 bolo pequeno, geleia e suco natural, para 2 pessoas, R$ 59,90 com entrega. Pedidos pelo WhatsApp.",
      campos: [
        {
          id: "legenda",
          rotulo: "Legenda do post (com um convite para pedir e pelo menos uma hashtag):",
          placeholder: "Ex.: Café da manhã de domingo sem sair de casa... Peça o seu pelo WhatsApp! #DoceRaiz",
          regra: {
            tipo: "texto",
            minPalavras: 15,
            minCaracteres: 60,
            palavrasChave: String.raw`(?=[\s\S]*#\w)(?=[\s\S]*\b(pe[çc]a|pe[çc]a j[aá]|encomende|encomendar|compre|garanta|reserve|clique|acesse|chame|saiba mais|toque|visite|fa[çc]a seu pedido|link|whatsapp|zap|direct|dm)\b)`,
            mensagemSemPalavraChave: "A legenda precisa de uma chamada para ação (peça, encomende, garanta, chame no WhatsApp...) e pelo menos uma hashtag (#).",
          },
          mensagemCerta: "Legenda com convite para agir e hashtag.",
        },
        {
          id: "arte",
          rotulo: "Descreva a arte do post (imagem ou vídeo):",
          placeholder: "Ex.: Foto do box aberto sobre uma mesa de madeira, com luz natural...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: String.raw`\b(foto\w*|imagem|imagens|v[ií]deo\w*|cor\w*|box|mesa|cesta|luz|fundo|layout|texto|logo\w*|carrossel|reels|slide\w*|cena)\b`,
            mensagemSemPalavraChave: "Descreva o que aparece: foto ou vídeo do box, cenário, cores, texto na imagem.",
          },
          mensagemCerta: "Arte descrita com clareza.",
        },
      ],
      mensagemCerta: "Post completo: legenda com chamada para ação e hashtag, e uma arte descrita.",
      mensagemErrada: "Confira a legenda (convite para pedir e hashtag) e se a descrição da arte diz o que aparece na imagem ou no vídeo.",
    },
    {
      titulo: "Parte B, prática 4: Conceito e slogan da campanha (1 pt)",
      enunciado: "Crie o conceito criativo e o slogan da campanha de lançamento do box.",
      referencia: "Doce Raiz: ingredientes naturais, feito à mão, entrega em Campinas. Box para 2 pessoas.",
      campos: [
        {
          id: "slogan",
          rotulo: "Slogan (de 3 a 10 palavras):",
          placeholder: "Ex.: Comece o dia com sabor de casa.",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
            palavrasChave: String.raw`^\s*(?:\S+\s+){2,9}\S+[\s.!?]*$`,
            mensagemSemPalavraChave: "Um slogan é curto e fácil de lembrar: use de 3 a 10 palavras.",
          },
          mensagemCerta: "Slogan curto e memorável.",
        },
        {
          id: "conceito",
          rotulo: "Conceito da campanha (a ideia central e por que ela funciona com o público):",
          placeholder: "Ex.: A ideia é ... porque o público valoriza...",
          regra: {
            tipo: "texto",
            minPalavras: 12,
            minCaracteres: 60,
            palavrasChave: String.raw`\b(porque|pois|para|com isso|j[aá] que|assim|ideia|conceito|tema|mensagem|objetivo)\b`,
            mensagemSemPalavraChave: "Explique a ideia central e por que ela conversa com o público (use «porque», «para», «a ideia é»...).",
          },
          mensagemCerta: "Conceito explicado com a justificativa.",
        },
      ],
      mensagemCerta: "Campanha com conceito e slogan.",
      mensagemErrada: "O slogan deve ter de 3 a 10 palavras, e o conceito, a ideia central com o motivo de funcionar.",
    },
    {
      titulo: "Parte B, prática 5: A campanha no funil (1 pt)",
      enunciado: "Classifique as ações da campanha na etapa do funil em que cada uma atua.",
      campos: [
        funil("reels", "Reels mostrando os bastidores da cozinha para quem ainda não conhece a Doce Raiz:", 0, "Bastidores atraem quem ainda está conhecendo: topo."),
        funil("newsletter", "E-mail com o cardápio completo e depoimentos para quem já segue a padaria:", 1, "Quem já conhece compara opções e se convence: meio."),
        funil("remarketing", "Anúncio de remarketing, com o preço e o botão «Pedir no WhatsApp», para quem visitou o perfil ontem:", 2, "Quem já demonstrou interesse e está perto de comprar: fundo."),
        {
          id: "metricas",
          rotulo: "Marque as métricas que mostram se a campanha atingiu o objetivo de vender:",
          regra: { tipo: "marcar", opcoes: ["Pedidos gerados", "CAC (custo por pedido)", "Taxa de conversão", "Número de curtidas apenas"], corretas: [0, 1, 2] },
          mensagemCerta: "Pedidos, CAC e conversão medem venda; curtidas sozinhas não pagam a conta.",
          mensagemErrada: "Se o objetivo é vender, meça pedidos, custo por pedido (CAC) e conversão. Curtidas sozinhas são métrica de vaidade.",
        },
      ],
      mensagemCerta: "Funil e métricas bem alinhados à campanha.",
      mensagemErrada: "Revise as três etapas do funil e escolha as métricas ligadas ao objetivo de vender.",
    },
    {
      titulo: "Parte B, prática 6: Meta e cronograma (1 pt)",
      enunciado: "Planeje a meta financeira e o cronograma da campanha.",
      referencia: "Verba de anúncios: R$ 1.500,00. Meta de custo por pedido (CAC): R$ 15,00. Box: R$ 59,90.",
      campos: [
        {
          id: "pedidos",
          rotulo: "Com R$ 1.500,00 e CAC de R$ 15,00, quantos pedidos a campanha pode gerar?",
          regra: { tipo: "numero", esperado: 100, tolerancia: 0 },
          mensagemCerta: "R$ 1.500 ÷ R$ 15 = 100 pedidos.",
          mensagemErrada: "Divida a verba pelo CAC alvo.",
        },
        {
          id: "cronograma",
          rotulo: "Cronograma em fases (pré-lançamento, lançamento e pós-lançamento, com a ação de cada uma):",
          placeholder: "Ex.: Semana 1, pré-lançamento: teasers... Semana 2, lançamento: ... Semana 3, pós: ...",
          regra: {
            tipo: "texto",
            minPalavras: 20,
            minCaracteres: 100,
            palavrasChave: String.raw`(?=[\s\S]*(pr[eé]|teaser|expectativa|aquec\w*|antes))(?=[\s\S]*(lan[cç]amento|abertura|oferta|inaugura\w*))(?=[\s\S]*(p[oó]s|depoimento\w*|reten[cç][aã]o|recompra|avalia\w*|ap[oó]s|depois))`,
            mensagemSemPalavraChave: "O cronograma precisa mostrar as três fases: pré-lançamento (expectativa), lançamento (oferta) e pós-lançamento (depoimentos, recompra).",
          },
          mensagemCerta: "Cronograma com as três fases e ações.",
        },
      ],
      mensagemCerta: "Meta calculada e cronograma em fases: a campanha está planejada de ponta a ponta.",
      mensagemErrada: "Revise: a conta da meta (verba ÷ CAC) e as três fases do cronograma (pré, lançamento e pós).",
    },
  ],
};

export default prova;
