import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const RELATORIO = [
  ["Pesquisa — Serviços", 18000, 720, 648, 36],
  ["Pesquisa — Marca", 6000, 540, 108, 54],
  ["Display — Remarketing", 95000, 380, 190, 12],
  ["Vídeo — Institucional", 120000, 240, 96, 2],
];
const col = (i: number) => somar(RELATORIO.map((l) => l[i] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Cliques Qualificados e Análise das Métricas",
  introducao:
    "Não basta ter cliques: é preciso ter cliques de quem realmente pode comprar. Aprenda as métricas principais e calcule indicadores a partir de um relatório. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    resposta({
      id: "acao",
      titulo: "Qual decisão tomar",
      instrucao: "Com base no relatório da atividade (CPA de R$ 18,00), explique como você decidiria se a campanha está boa ou ruim. O que mais precisaria saber?",
      rotulo: "Sua análise",
      placeholder: "Preciso comparar o CPA com a margem de lucro do produto...",
      chave: /(lucro|margem|valor|pre[cç]o|venda|retorno|custo)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "relatorio-mensal",
      titulo: "Planilha: relatório mensal das campanhas",
      cenario: "O relatório do mês traz as quatro campanhas da conta. Cole a planilha no Excel e crie as colunas CTR, CPC, taxa de conversão e CPA.",
      colunas: ["Campanha", "Impressões", "Cliques", "Custo (R$)", "Conversões"],
      linhas: RELATORIO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "ctr-geral", rotulo: "CTR geral da conta (%)", valor: (col(2) / col(1)) * 100, explicacao: "Cliques totais ÷ impressões totais × 100." },
        { id: "cpc-geral", rotulo: "CPC médio da conta (R$)", valor: col(3) / col(2), explicacao: "Custo total ÷ cliques totais." },
        { id: "cpa-marca", rotulo: "CPA da campanha Pesquisa — Marca (R$)", valor: 108 / 54, explicacao: "Custo ÷ conversões = 108 ÷ 54 = 2,00." },
        { id: "conversao-servicos", rotulo: "Taxa de conversão da Pesquisa — Serviços (%)", valor: (36 / 720) * 100, explicacao: "36 ÷ 720 × 100 = 5%." },
      ],
    }),
    dissertativa({
      id: "diagnostico-campanhas",
      titulo: "Diagnóstico das campanhas",
      instrucao: "Escreva o diagnóstico do mês para o gestor da loja.",
      deve: [
        "Diga qual campanha tem melhor e pior custo por conversão e comente por que a de marca costuma ser tão barata.",
        "Explique por que display e vídeo têm CTR baixo e se isso é um problema.",
        "Proponha uma realocação de verba e uma ação para melhorar a conversão da pior campanha.",
      ],
      chave: /(cpa|convers|ctr|marca|display|v[ií]deo|verba|realoca|melhor|pior)/i,
    }),
  ],
};

export default atividade;
