import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Extensões de Anúncio e Sitelinks",
  introducao:
    "Extensões acrescentam informação ao anúncio — telefone, endereço, links extras — sem custo adicional por si só. Veja quais usar e como medir o ganho.",
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
    escolha({
      id: "sitelink-boa-pratica",
      titulo: "Boa prática com sitelinks",
      instrucao: "Qual é a melhor prática ao criar sitelinks?",
      opcoes: [
        "Usar textos curtos e claros, levando a páginas diferentes e relevantes.",
        "Repetir o mesmo link quatro vezes.",
        "Levar todos os links para a página inicial.",
        "Usar textos longos e vagos, como «clique aqui».",
      ],
      correta: 0,
      explicacao: "Cada sitelink deve oferecer um caminho útil e específico.",
    }),
    resposta({
      id: "escolher-extensoes",
      titulo: "Escolha as extensões",
      cenario: "Um restaurante com entrega quer mais pedidos pelo celular e mais visitas ao salão.",
      instrucao: "Quais extensões você usaria e que informação colocaria em cada uma?",
      rotulo: "Sua escolha",
      placeholder: "Chamada: telefone de pedidos. Local: endereço do salão. Sitelinks: cardápio, promoções...",
      chave: /(chamada|telefone|local|endere[cç]o|sitelink|cardápio|card[aá]pio|frase)/i,
      minPalavras: 8,
    }),
  ],
};

export default atividade;
