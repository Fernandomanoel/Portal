import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Cliques Qualificados e Análise das Métricas",
  introducao:
    "Não basta ter cliques: é preciso ter cliques de quem realmente pode comprar. Aprenda as métricas principais e calcule indicadores a partir de um relatório.",
  itens: [
    escolha({
      id: "qualificado",
      titulo: "O que é um clique qualificado",
      instrucao: "Qual é a melhor definição de clique qualificado?",
      opcoes: [
        "Qualquer clique no anúncio.",
        "O clique de alguém que tem interesse real e perfil para comprar o que se oferece.",
        "O clique feito pelo próprio dono do site.",
        "O clique mais barato.",
      ],
      correta: 1,
      explicacao: "Cliques sem interesse gastam orçamento sem trazer resultado. Palavras-chave e segmentação bem feitas atraem quem importa.",
    }),
    associar({
      id: "metricas",
      titulo: "Siglas e métricas",
      instrucao: "Associe cada métrica ao significado.",
      opcoes: [
        "Quantas vezes o anúncio foi exibido",
        "Percentual de quem viu e clicou",
        "Quanto se paga, em média, por clique",
        "Percentual de cliques que viraram ação (venda, contato)",
      ],
      linhas: [
        { id: "impressoes", rotulo: "Impressões", correta: 0 },
        { id: "ctr", rotulo: "CTR (taxa de cliques)", correta: 1 },
        { id: "cpc", rotulo: "CPC médio", correta: 2 },
        { id: "conversao", rotulo: "Taxa de conversão", correta: 3 },
      ],
      explicacao: "Impressão mostra alcance, CTR mostra atratividade, CPC mostra custo e conversão mostra resultado.",
    }),
    calculos({
      id: "relatorio",
      titulo: "Lendo o relatório da campanha",
      cenario: "No mês, uma campanha teve 20.000 impressões, 600 cliques, custo total de R$ 540,00 e 30 conversões (vendas).",
      instrucao: "Calcule o CTR, o CPC médio, a taxa de conversão e o custo por conversão (CPA).",
      campos: [
        { id: "ctr", rotulo: "CTR (%)", esperado: 3, explicacao: "600 ÷ 20.000 = 3%." },
        { id: "cpc", rotulo: "CPC médio (R$)", esperado: 0.9, explicacao: "540 ÷ 600 = 0,90." },
        { id: "conversao", rotulo: "Taxa de conversão (%)", esperado: 5, explicacao: "30 ÷ 600 = 5%." },
        { id: "cpa", rotulo: "Custo por conversão (R$)", esperado: 18, explicacao: "540 ÷ 30 = 18." },
      ],
    }),
    escolha({
      id: "diagnostico",
      titulo: "Diagnosticando o problema",
      cenario: "Uma campanha tem CTR alto (6%), mas quase nenhuma conversão.",
      instrucao: "Qual é a hipótese mais provável?",
      opcoes: [
        "O anúncio atrai cliques, mas a página de destino ou a oferta não convence quem chega.",
        "O anúncio não aparece para ninguém.",
        "O orçamento é infinito.",
        "O Google bloqueou a conta.",
      ],
      correta: 0,
      explicacao: "Quando o anúncio atrai, mas não converte, o problema costuma estar depois do clique: página, preço, formulário ou oferta.",
    }),
    resposta({
      id: "acao",
      titulo: "Qual decisão tomar",
      instrucao: "Com base no relatório da atividade (CPA de R$ 18,00), explique como você decidiria se a campanha está boa ou ruim. O que mais precisaria saber?",
      rotulo: "Sua análise",
      placeholder: "Preciso comparar o CPA com a margem de lucro do produto...",
      chave: /(lucro|margem|valor|pre[cç]o|venda|retorno|custo)/i,
      minPalavras: 10,
    }),
  ],
};

export default atividade;
