import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, resposta, planilha, dissertativa, somar } from "../ajudantes";

const PALAVRAS = [
  ["revisão de bicicleta", 4000, 5, 1.2],
  ["conserto de bicicleta", 2500, 4, 0.9],
  ["bicicleta elétrica preço", 6000, 2, 2.4],
  ["oficina de bike perto de mim", 1800, 8, 0.8],
];
const CLIQUES = PALAVRAS.map((l) => ((l[1] as number) * (l[2] as number)) / 100);
const CUSTOS = PALAVRAS.map((l, i) => CLIQUES[i] * (l[3] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Iniciando a Primeira Campanha",
  introducao:
    "Criar a primeira campanha é decidir o objetivo, a rede, o local, o orçamento e como o lance será feito. Pratique o raciocínio da criação e estime o resultado em números. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "passos",
      titulo: "O que se define ao criar a campanha",
      instrucao: "Qual conjunto de itens é definido na criação de uma campanha de pesquisa?",
      opcoes: [
        "Objetivo, rede, locais e idiomas, orçamento e estratégia de lances.",
        "Apenas o nome do dono da empresa.",
        "Somente a cor do anúncio.",
        "Nada: o Google decide tudo.",
      ],
      correta: 0,
      explicacao: "Esses cinco pontos determinam onde, para quem e a que custo o anúncio será exibido.",
    }),
    calculos({
      id: "estimativa",
      titulo: "Estimando resultados",
      cenario: "O planejamento prevê 5.000 impressões na semana, uma taxa de cliques (CTR) de 3% e custo médio de R$ 1,20 por clique.",
      instrucao: "Calcule os cliques esperados e o custo total da semana.",
      campos: [
        { id: "cliques", rotulo: "Cliques esperados", esperado: 150, tolerancia: 0, explicacao: "5.000 × 0,03 = 150 cliques." },
        { id: "custo", rotulo: "Custo da semana (R$)", esperado: 180, explicacao: "150 × 1,20 = 180." },
      ],
    }),
    resposta({
      id: "titulo-anuncio",
      titulo: "Escreva um anúncio de pesquisa",
      cenario: "Uma loja de bicicletas quer anunciar revisão completa com preço fixo.",
      instrucao: "Escreva um título curto (até 30 caracteres) e uma descrição que chamem o cliente para a ação.",
      rotulo: "Título e descrição",
      placeholder: "Título: Revisão de Bicicleta | Descrição: Agende hoje a revisão completa por preço fixo...",
      chave: /(revis[aã]o|bicicleta|agende|ligue|or[cç]amento|compre)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "simulacao-palavras",
      titulo: "Planilha: simulação da primeira campanha",
      cenario: "Antes de lançar, o gestor simulou o resultado de quatro palavras-chave: a quantidade de buscas por mês, a taxa de cliques (CTR) esperada e o custo por clique (CPC). Supondo que o anúncio apareça em todas as buscas, cole a planilha no Excel e resolva (cliques = buscas × CTR).",
      colunas: ["Palavra-chave", "Buscas por mês", "CTR esperado (%)", "CPC (R$)"],
      linhas: PALAVRAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "cliques-revisao", rotulo: "Cliques esperados para «revisão de bicicleta»", valor: CLIQUES[0], explicacao: "4.000 × 5% = 200.", tolerancia: 0 },
        { id: "custo-oficina", rotulo: "Custo de «oficina de bike perto de mim» (R$)", valor: CUSTOS[3], explicacao: "144 cliques × R$ 0,80 = 115,20." },
        { id: "cliques-total", rotulo: "Total de cliques esperados nas quatro palavras", valor: somar(CLIQUES), explicacao: "Soma dos cliques de cada palavra.", tolerancia: 0 },
        { id: "custo-total", rotulo: "Custo total do mês (R$)", valor: somar(CUSTOS), explicacao: "Soma de cliques × CPC de cada palavra." },
      ],
    }),
    dissertativa({
      id: "escolher-palavras",
      titulo: "Quais palavras manter",
      instrucao: "Com base na simulação, escreva sua decisão sobre quais palavras-chave manteria na primeira campanha e por quê.",
      deve: [
        "Compare o custo por clique e a taxa de cliques das palavras.",
        "Explique qual palavra mostra mais intenção de compra e qual é mais cara para o que entrega.",
        "Diga o que você testaria nas duas primeiras semanas antes de aumentar o orçamento.",
      ],
      chave: /(cpc|ctr|custo|clique|inten[cç][aã]o|compra|testar|orçamento|or[cç]amento)/i,
    }),
  ],
};

export default atividade;
