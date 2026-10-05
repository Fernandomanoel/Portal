import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Redes Sociais, Marketing Social Digital e Estratégia",
  introducao:
    "Redes sociais são canais de relacionamento e vendas. Entenda a diferença entre rede e mídia social, monte uma estratégia e meça resultados com números.",
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
    escolha({
      id: "publico",
      titulo: "O primeiro passo da estratégia",
      instrucao: "Antes de publicar, o que a empresa deve definir primeiro?",
      opcoes: [
        "O horário do café da equipe.",
        "O objetivo e o público-alvo.",
        "A cor do logotipo do concorrente.",
        "O número de hashtags por post.",
      ],
      correta: 1,
      explicacao: "Sem objetivo e público definidos, o conteúdo fica solto e os resultados não podem ser medidos.",
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
    escolha({
      id: "conteudo",
      titulo: "Conteúdo que gera relacionamento",
      instrucao: "Qual prática ajuda mais a construir uma relação com o público?",
      opcoes: [
        "Publicar só ofertas de venda, todos os dias.",
        "Misturar conteúdo útil, bastidores e ofertas, respondendo comentários e mensagens.",
        "Nunca responder ninguém.",
        "Copiar publicações de concorrentes.",
      ],
      correta: 1,
      explicacao: "Quem só vende cansa o público. Valor, constância e conversa constroem confiança.",
    }),
    resposta({
      id: "plano",
      titulo: "Plano de publicações",
      cenario: "Uma padaria de bairro quer atrair mais clientes pelas redes sociais.",
      instrucao: "Proponha o objetivo, o público e três tipos de publicação para a primeira semana.",
      rotulo: "Seu plano",
      placeholder: "Objetivo: ... Público: ... Posts: 1) ... 2) ... 3) ...",
      chave: /(objetivo|p[uú]blico|post|foto|v[ií]deo|promo)/i,
      minPalavras: 12,
    }),
  ],
};

export default atividade;
