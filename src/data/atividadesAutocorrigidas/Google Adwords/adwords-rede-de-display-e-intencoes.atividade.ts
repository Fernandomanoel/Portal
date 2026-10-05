import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Trabalhando com a Rede de Display e as Intenções",
  introducao:
    "A Rede de Display mostra anúncios visuais em milhões de sites e aplicativos. Aprenda a segmentar por público e intenção e a calcular o custo por mil impressões.",
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
    escolha({
      id: "bom-banner",
      titulo: "Um bom anúncio visual",
      instrucao: "Qual característica ajuda um banner de display a funcionar melhor?",
      opcoes: [
        "Imagem nítida, mensagem curta e um botão claro de ação.",
        "Muito texto pequeno.",
        "Cores que dificultam a leitura.",
        "Nenhum botão de ação.",
      ],
      correta: 0,
      explicacao: "O usuário passa os olhos rápido: uma ideia, uma imagem e uma ação clara.",
    }),
    resposta({
      id: "remarketing",
      titulo: "Use o remarketing",
      cenario: "Uma loja virtual percebe que muitos visitantes colocam produtos no carrinho e saem sem comprar.",
      instrucao: "Explique como o remarketing pode ajudar e que mensagem o anúncio poderia trazer.",
      rotulo: "Sua estratégia",
      placeholder: "O remarketing mostraria um anúncio do produto do carrinho com um incentivo, como frete grátis...",
      chave: /(carrinho|visit|volt|lembr|remarketing|incentivo|desconto|frete)/i,
      minPalavras: 10,
    }),
  ],
};

export default atividade;
