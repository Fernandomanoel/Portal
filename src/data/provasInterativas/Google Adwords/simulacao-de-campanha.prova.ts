import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Google Adwords/Avaliação Prática -
 * Google Ads.docx): os mesmos 5 passos (2,0 pontos cada), preenchidos no
 * próprio portal em vez de num documento do Word. O professor corrige.
 */
const prova: ProvaInterativa = {
  tipo: "descritiva",
  titulo: "Simulação de Campanha no Google Ads",
  perguntas: [
    "Passo 1 (2,0 pontos) — Escolha do objetivo. Escolha um objetivo para a sua campanha (tráfego para o site, geração de leads, vendas ou notoriedade da marca) e escreva a justificativa da escolha.",
    "Passo 2 (2,0 pontos) — Público-alvo. Informe a idade, a localização e os interesses ou palavras-chave do seu público.",
    "Passo 3 (2,0 pontos) — Anúncio simulado. Escreva como o anúncio apareceria na busca do Google: título (máx. 30 caracteres), descrição (máx. 90 caracteres) e link de destino (simulado).",
    "Passo 4 (2,0 pontos) — Orçamento diário. Informe o orçamento diário (fictício) e justifique o valor.",
    "Passo 5 (2,0 pontos) — Análise final. Por que é importante segmentar bem o público no Google Ads?",
  ],
};

export default prova;
