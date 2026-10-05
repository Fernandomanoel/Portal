import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa } from "../ajudantes";

const ANTES_DEPOIS = [
  ["Antes das extensões", 40000, 800, 960, 40],
  ["Depois das extensões", 40000, 1080, 1188, 63],
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Extensões de Anúncio e Sitelinks",
  introducao:
    "Extensões acrescentam informação ao anúncio — telefone, endereço, links extras — sem custo adicional por si só. Veja quais usar e como medir o ganho. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "por-que",
      titulo: "Por que usar extensões",
      instrucao: "Qual é a principal vantagem das extensões de anúncio?",
      opcoes: [
        "Deixam o anúncio maior e mais útil, o que costuma aumentar a taxa de cliques.",
        "Substituem o título do anúncio.",
        "Impedem que o concorrente anuncie.",
        "Eliminam o custo por clique.",
      ],
      correta: 0,
      explicacao: "Mais informação e mais espaço na página de resultados atraem mais cliques qualificados.",
    }),
    associar({
      id: "tipos",
      titulo: "Qual extensão usar",
      instrucao: "Escolha a extensão mais adequada para cada objetivo.",
      opcoes: ["Sitelink (links adicionais)", "Chamada (telefone)", "Local (endereço)", "Frase de destaque"],
      linhas: [
        { id: "paginas", rotulo: "Levar o cliente direto às páginas «Preços», «Contato» e «Promoções».", correta: 0 },
        { id: "ligar", rotulo: "Permitir que o cliente ligue com um toque no celular.", correta: 1 },
        { id: "loja", rotulo: "Mostrar o endereço da loja física no mapa.", correta: 2 },
        { id: "beneficio", rotulo: "Destacar «Entrega grátis» e «Atendimento 24h».", correta: 3 },
      ],
      explicacao: "Cada extensão resolve uma necessidade: navegar, ligar, ir à loja ou destacar um diferencial.",
    }),
    calculos({
      id: "ganho-ctr",
      titulo: "O efeito de uma extensão",
      cenario: "Antes, um anúncio teve 200 cliques em 10.000 impressões. Depois de acrescentar sitelinks, teve 260 cliques em 10.000 impressões.",
      instrucao: "Calcule o CTR antes e depois e o aumento relativo do CTR.",
      campos: [
        { id: "antes", rotulo: "CTR antes (%)", esperado: 2, explicacao: "200 ÷ 10.000 = 2%." },
        { id: "depois", rotulo: "CTR depois (%)", esperado: 2.6, explicacao: "260 ÷ 10.000 = 2,6%." },
        { id: "aumento", rotulo: "Aumento relativo (%)", esperado: 30, explicacao: "(2,6 − 2,0) ÷ 2,0 = 0,30, ou 30% a mais." },
      ],
    }),
    resposta({
      id: "escolher-extensoes",
      titulo: "Escolha as extensões",
      cenario: "Um restaurante com entrega quer mais pedidos pelo celular e mais visitas ao salão.",
      instrucao: "Quais extensões você usaria e que informação colocaria em cada uma?",
      rotulo: "Sua escolha",
      placeholder: "Chamada: telefone de pedidos. Local: endereço do salão. Sitelinks: cardápio, promoções...",
      chave: /(chamada|telefone|local|endere[cç]o|sitelink|cardápio|card[aá]pio|frase)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "antes-depois",
      titulo: "Planilha: o efeito das extensões de anúncio",
      cenario: "Uma loja comparou o mês anterior, sem extensões, com o mês seguinte, depois de acrescentar sitelinks, chamada e local. Cole a planilha no Excel e resolva.",
      colunas: ["Período", "Impressões", "Cliques", "Custo (R$)", "Conversões"],
      linhas: ANTES_DEPOIS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "ctr-antes", rotulo: "CTR antes (%)", valor: (800 / 40000) * 100, explicacao: "800 ÷ 40.000 × 100 = 2%." },
        { id: "ctr-depois", rotulo: "CTR depois (%)", valor: (1080 / 40000) * 100, explicacao: "1.080 ÷ 40.000 × 100 = 2,7%." },
        { id: "ganho-ctr", rotulo: "Aumento relativo do CTR (%)", valor: ((1080 / 40000 - 800 / 40000) / (800 / 40000)) * 100, explicacao: "(2,7 − 2,0) ÷ 2,0 × 100 = 35%." },
        { id: "cpa-antes-depois", rotulo: "Redução do CPA (R$, antes menos depois)", valor: 960 / 40 - 1188 / 63, explicacao: "CPA antes = 960 ÷ 40 = 24; depois = 1.188 ÷ 63 ≈ 18,86." },
      ],
    }),
    dissertativa({
      id: "extensoes-loja",
      titulo: "Planeje as extensões",
      cenario: "Uma loja de eletrodomésticos com entrega rápida e retirada na loja quer melhorar os anúncios de pesquisa.",
      instrucao: "Escreva o plano de extensões para essa loja.",
      deve: [
        "Escolha ao menos quatro extensões e diga o que colocaria em cada uma (links, telefone, endereço, destaques).",
        "Explique como cada extensão ajuda o cliente a decidir.",
        "Diga como compararia o antes e o depois, usando CTR e CPA.",
      ],
      chave: /(sitelink|chamada|telefone|local|endere[cç]o|destaque|ctr|cpa|extens)/i,
    }),
  ],
};

export default atividade;
