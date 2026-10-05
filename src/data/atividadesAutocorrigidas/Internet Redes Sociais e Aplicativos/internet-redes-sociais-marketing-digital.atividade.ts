import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const POSTS = [
  ["Bastidores da padaria", 4200, 310, 42, 18, 95],
  ["Promoção do pão de queijo", 9800, 520, 88, 140, 410],
  ["Dica de receita", 6100, 480, 73, 66, 150],
  ["Enquete: qual sabor?", 3300, 150, 190, 12, 60],
];
const INTERACOES = POSTS.map((l) => (l[2] as number) + (l[3] as number) + (l[4] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Redes Sociais, Marketing Social Digital e Estratégia",
  introducao:
    "Redes sociais são canais de relacionamento e vendas. Entenda a diferença entre rede e mídia social, monte uma estratégia e meça resultados com números. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "rede-midia",
      titulo: "Rede social e mídia social",
      instrucao: "Qual afirmação descreve melhor a diferença?",
      opcoes: [
        "São palavras idênticas e sem diferença nenhuma.",
        "A rede social enfatiza a relação entre pessoas; a mídia social enfatiza a produção e o compartilhamento de conteúdo.",
        "Mídia social é só televisão.",
        "Rede social só existe no celular.",
      ],
      correta: 1,
      explicacao: "Na prática, os termos se misturam, mas o foco muda: relacionamento (rede) x conteúdo (mídia).",
    }),
    associar({
      id: "plataformas",
      titulo: "Plataforma e uso principal",
      instrucao: "Associe cada plataforma ao seu uso profissional mais comum.",
      opcoes: ["Rede profissional e networking", "Vídeos curtos e tendências", "Atendimento e divulgação por mensagens"],
      linhas: [
        { id: "linkedin", rotulo: "LinkedIn", correta: 0 },
        { id: "tiktok", rotulo: "TikTok", correta: 1 },
        { id: "whatsapp", rotulo: "WhatsApp Business", correta: 2 },
      ],
      explicacao: "Cada plataforma tem público e formato próprios: a estratégia deve se adaptar a eles.",
    }),
    calculos({
      id: "metricas",
      titulo: "Medindo resultados",
      cenario:
        "Um post alcançou 12.000 pessoas e recebeu 360 interações (curtidas, comentários e compartilhamentos). Um anúncio teve 5.000 impressões e 150 cliques.",
      instrucao: "Calcule a taxa de engajamento (interações ÷ alcance) e a taxa de cliques, o CTR (cliques ÷ impressões).",
      campos: [
        { id: "engajamento", rotulo: "Engajamento (%)", esperado: 3, explicacao: "360 ÷ 12.000 = 0,03, ou 3%." },
        { id: "ctr", rotulo: "CTR (%)", esperado: 3, explicacao: "150 ÷ 5.000 = 0,03, ou 3%." },
      ],
    }),
    resposta({
      id: "plano",
      titulo: "Plano de publicações",
      cenario: "Uma padaria de bairro quer atrair mais clientes pelas redes sociais.",
      instrucao: "Proponha o objetivo, o público e três tipos de publicação para a primeira semana.",
      rotulo: "Seu plano",
      placeholder: "Objetivo: ... Público: ... Posts: 1) ... 2) ... 3) ...",
      chave: /(objetivo|p[uú]blico|post|foto|v[ií]deo|promo)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "desempenho-posts",
      titulo: "Planilha: desempenho de quatro publicações",
      cenario: "Uma padaria acompanha as publicações da semana. Interações = curtidas + comentários + compartilhamentos; engajamento = interações ÷ alcance. Cole a planilha no Excel e resolva.",
      colunas: ["Publicação", "Alcance", "Curtidas", "Comentários", "Compartilhamentos", "Cliques no link"],
      linhas: POSTS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "interacoes-promo", rotulo: "Interações da publicação de promoção", valor: INTERACOES[1], explicacao: "520 + 88 + 140 = 748.", tolerancia: 0 },
        { id: "engajamento-enquete", rotulo: "Engajamento da enquete (%)", valor: (INTERACOES[3] / 3300) * 100, explicacao: "(150 + 190 + 12) ÷ 3.300 × 100." },
        { id: "engajamento-geral", rotulo: "Engajamento geral das quatro publicações (%)", valor: (somar(INTERACOES) / somar(POSTS.map((l) => l[1] as number))) * 100, explicacao: "Total de interações ÷ alcance total × 100." },
        { id: "ctr-promo", rotulo: "Cliques ÷ alcance da promoção (%)", valor: (410 / 9800) * 100, explicacao: "410 ÷ 9.800 × 100 ≈ 4,18%." },
      ],
    }),
    dissertativa({
      id: "calendario-semana",
      titulo: "Plano de conteúdo da próxima semana",
      instrucao: "Com base nos números, escreva o plano de publicações da próxima semana para a padaria.",
      deve: [
        "Diga qual tipo de publicação rendeu mais alcance, mais engajamento e mais cliques, e por quê.",
        "Proponha três publicações para a semana, com objetivo e público de cada uma.",
        "Defina duas métricas que acompanharia para saber se o plano funcionou.",
      ],
      chave: /(alcance|engaj|clique|objetivo|p[uú]blico|m[eé]trica|promo|conte[uú]do)/i,
    }),
  ],
};

export default atividade;
