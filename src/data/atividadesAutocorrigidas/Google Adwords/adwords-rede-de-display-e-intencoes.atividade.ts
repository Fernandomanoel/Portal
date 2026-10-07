import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const POSICIONAMENTOS = [
  ["Portal de notícias locais", 120000, 3.5, 540],
  ["Blog de receitas", 60000, 5, 420],
  ["Aplicativo de clima", 200000, 2.2, 300],
  ["Site de decoração", 45000, 6.5, 405],
];
const CUSTO_POS = POSICIONAMENTOS.map((l) => ((l[1] as number) / 1000) * (l[2] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Trabalhando com a Rede de Display e as Intenções",
  introducao:
    "A Rede de Display mostra anúncios visuais em milhões de sites e aplicativos. Aprenda a segmentar por público e intenção e a calcular o custo por mil impressões. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "diferenca",
      titulo: "Pesquisa x Display",
      instrucao: "Qual é a principal diferença entre as duas redes?",
      opcoes: [
        "Na Pesquisa, o anúncio aparece quando a pessoa procura ativamente; no Display, ele aparece enquanto a pessoa navega, de forma mais visual e de descoberta.",
        "A Pesquisa só tem imagens e o Display só tem texto.",
        "Não há diferença.",
        "O Display só funciona no computador.",
      ],
      correta: 0,
      explicacao: "A Pesquisa captura demanda existente; o Display cria lembrança e gera interesse.",
    }),
    associar({
      id: "segmentacao",
      titulo: "Segmentação do público",
      instrucao: "Associe cada tipo de segmentação à descrição.",
      opcoes: ["Afinidade", "Intenção de compra (no mercado)", "Remarketing"],
      linhas: [
        { id: "afinidade", rotulo: "Pessoas com interesses de longo prazo, como fãs de culinária.", correta: 0 },
        { id: "mercado", rotulo: "Pessoas que pesquisaram e estão prestes a comprar um produto.", correta: 1 },
        { id: "remarketing", rotulo: "Pessoas que já visitaram o seu site e voltam a ver o seu anúncio.", correta: 2 },
      ],
      explicacao: "Quanto mais próximo da compra, maior a chance de conversão; remarketing reencontra quem já demonstrou interesse.",
    }),
    calculos({
      id: "cpm",
      titulo: "Custo por mil impressões (CPM)",
      cenario:
        "Uma campanha de display tem CPM de R$ 4,00 e teve 80.000 impressões, com um CTR de 0,5%.",
      instrucao: "Calcule o custo total, os cliques e o custo por clique efetivo.",
      campos: [
        { id: "custo", rotulo: "Custo total (R$)", esperado: 320, explicacao: "80.000 ÷ 1.000 × 4 = 320." },
        { id: "cliques", rotulo: "Cliques", esperado: 400, tolerancia: 0, explicacao: "80.000 × 0,005 = 400." },
        { id: "cpc", rotulo: "CPC efetivo (R$)", esperado: 0.8, explicacao: "320 ÷ 400 = 0,80." },
      ],
    }),
    resposta({
      id: "remarketing",
      titulo: "Use o remarketing",
      cenario: "Uma loja virtual percebe que muitos visitantes colocam produtos no carrinho e saem sem comprar.",
      instrucao: "Explique como o remarketing pode ajudar e que mensagem o anúncio poderia trazer.",
      rotulo: "Sua estratégia",
      placeholder: "O remarketing mostraria um anúncio do produto do carrinho com um incentivo, como frete grátis...",
      chave: /(carrinho|visit|volt|lembr|remarketing|incentivo|desconto|frete)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "posicionamentos-display",
      titulo: "Planilha: onde os anúncios de display apareceram",
      cenario: "Uma campanha de display de uma loja de móveis foi exibida em quatro posicionamentos. O custo é por mil impressões (CPM). Cole a planilha no Excel e crie as colunas Custo (=impressões ÷ 1000 × CPM) e CPC.",
      colunas: ["Posicionamento", "Impressões", "CPM (R$)", "Cliques"],
      linhas: POSICIONAMENTOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "custo-blog", rotulo: "Custo no Blog de receitas (R$)", valor: CUSTO_POS[1], explicacao: "60.000 ÷ 1.000 × 5 = 300." },
        { id: "custo-total", rotulo: "Custo total da campanha (R$)", valor: somar(CUSTO_POS), explicacao: "Soma do custo dos quatro posicionamentos." },
        { id: "cpc-decoracao", rotulo: "CPC do Site de decoração (R$)", valor: CUSTO_POS[3] / 405, explicacao: "292,50 ÷ 405 ≈ 0,72." },
        { id: "ctr-clima", rotulo: "CTR do Aplicativo de clima (%)", valor: (300 / 200000) * 100, explicacao: "300 ÷ 200.000 × 100 = 0,15%." },
      ],
    }),
    dissertativa({
      id: "estrategia-display",
      titulo: "Estratégia de display com público e intenção",
      instrucao: "Com os dados da planilha, escreva a estratégia de display para a loja de móveis.",
      deve: [
        "Diga em que posicionamentos manteria o anúncio e quais excluiria, usando o CPC e o CTR.",
        "Explique como usaria afinidade, intenção de compra (no mercado) e remarketing.",
        "Descreva como seria o banner (imagem, mensagem curta, botão de ação) para quem já visitou o site.",
      ],
      chave: /(cpc|ctr|afinidade|inten[cç][aã]o|mercado|remarketing|banner|excluir|posicionamento)/i,
    }),
  ],
};

export default atividade;
