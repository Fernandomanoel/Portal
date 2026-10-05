import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, associar, resposta, planilha, dissertativa } from "../ajudantes";

const PLANOS = [
  ["Fibra Alfa", 500, 99.9],
  ["Fibra Beta", 300, 79.9],
  ["Rádio Gama", 100, 89.9],
  ["Satélite Delta", 50, 199.9],
  ["4G fixo Épsilon", 80, 129.9],
];
const POR_MBPS = PLANOS.map((l) => (l[2] as number) / (l[1] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — A Evolução da Internet e os Tipos de Acesso",
  introducao:
    "De onde a internet veio, qual a diferença entre internet e web e como cada tipo de conexão chega até você. Responda e use \"Corrigir atividade\" para conferir. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "origem",
      titulo: "O começo de tudo",
      cenario: "A ARPANET, criada nos Estados Unidos em 1969, ligou os primeiros computadores de universidades e centros de pesquisa.",
      instrucao: "O que a ARPANET foi para a internet de hoje?",
      opcoes: [
        "Foi o primeiro navegador de internet.",
        "Foi a rede precursora, que mostrou que computadores distantes podiam trocar dados.",
        "Foi o primeiro site de compras.",
        "Foi uma rede social.",
      ],
      correta: 1,
      explicacao: "A ARPANET é a base histórica da internet: uma rede de pesquisa que provou a troca de dados entre máquinas distantes.",
    }),
    associar({
      id: "tipos-acesso",
      titulo: "Tipos de acesso à internet",
      instrucao: "Associe cada descrição ao tipo de conexão.",
      opcoes: ["Fibra óptica", "Rede móvel (4G/5G)", "Satélite"],
      linhas: [
        { id: "luz", rotulo: "Transmite dados por pulsos de luz em fios de vidro; muito rápida e estável.", correta: 0 },
        { id: "celular", rotulo: "Chega por antenas de telefonia ao celular ou ao roteador móvel.", correta: 1 },
        { id: "rural", rotulo: "Atende regiões remotas, sem cabo nem antena por perto, mas com maior atraso (latência).", correta: 2 },
      ],
      explicacao: "Cada tecnologia atende uma situação: fibra para velocidade e estabilidade, móvel para mobilidade, satélite para lugares isolados.",
    }),
    calculo({
      id: "tempo-download",
      titulo: "Quanto demora um download",
      cenario: "Um arquivo de 600 MB (megabytes) será baixado em uma conexão de 100 Mbps (megabits por segundo). Lembre: 1 byte tem 8 bits.",
      instrucao: "Em quantos segundos o download termina, em condições ideais?",
      rotulo: "Tempo (segundos)",
      esperado: 48,
      explicacao: "600 MB × 8 = 4.800 megabits; 4.800 ÷ 100 = 48 segundos.",
    }),
    resposta({
      id: "impacto",
      titulo: "A internet no trabalho",
      instrucao: "Explique com suas palavras uma mudança que a internet trouxe para o trabalho em escritório.",
      rotulo: "Sua resposta",
      placeholder: "Ex.: Reuniões por vídeo, e-mail e arquivos na nuvem permitem trabalhar de qualquer lugar...",
    }),
    planilha({
      id: "planos",
      titulo: "Planilha: comparando planos de internet",
      cenario: "Uma loja precisa contratar internet e recebeu cinco ofertas de tipos de acesso diferentes. Cole a planilha no Excel e crie uma coluna R$ por Mbps (=C2/B2).",
      colunas: ["Plano", "Velocidade (Mbps)", "Mensalidade (R$)"],
      linhas: PLANOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "mbps-alfa", rotulo: "Custo por Mbps da Fibra Alfa (R$)", valor: POR_MBPS[0], explicacao: "99,90 ÷ 500 ≈ 0,20 por Mbps." },
        { id: "menor", rotulo: "Menor custo por Mbps entre os cinco planos (R$)", valor: Math.min(...POR_MBPS), explicacao: "O menor valor da coluna R$ por Mbps." },
        { id: "download", rotulo: "Segundos para baixar um arquivo de 2 GB (2.000 MB) na Fibra Beta", valor: (2000 * 8) / 300, explicacao: "2.000 MB × 8 = 16.000 megabits ÷ 300 Mbps ≈ 53,3 s." },
        { id: "diferenca-anual", rotulo: "Diferença anual entre o Satélite Delta e a Fibra Alfa (R$)", valor: (199.9 - 99.9) * 12, explicacao: "(199,90 − 99,90) × 12 = 1.200." },
      ],
    }),
    dissertativa({
      id: "qual-contratar",
      titulo: "Qual plano contratar",
      instrucao: "Escreva a recomendação de contratação para a loja, a partir da planilha.",
      deve: [
        "Compare preço e velocidade usando o custo por Mbps.",
        "Explique por que velocidade não é o único critério (estabilidade, latência, disponibilidade na região).",
        "Diga em que situação um plano de satélite ou 4G fixo seria a melhor escolha.",
      ],
      chave: /(mbps|velocidade|pre[cç]o|est[aá]vel|latência|lat[eê]ncia|fibra|sat[eé]lite|regi[aã]o)/i,
    }),
    dissertativa({
      id: "internet-no-trabalho",
      titulo: "A internet mudou o trabalho",
      instrucao: "Explique como a evolução da internet (da ARPANET à web e ao celular) mudou uma profissão ou rotina de escritório que você conhece.",
      deve: [
        "Cite dois marcos da evolução da internet.",
        "Descreva uma mudança concreta no dia a dia do trabalho.",
        "Aponte uma vantagem e um risco dessa mudança.",
      ],
      chave: /(arpanet|web|www|celular|m[oó]vel|nuvem|e-?mail|remot|risco|vantagem)/i,
    }),
  ],
};

export default atividade;
