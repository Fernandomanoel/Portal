import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Auto-Corretiva de Marketing, Branding e Mídia",
  introducao:
    "Esta atividade aprofunda marketing, branding e mídia: os 4 Ps do composto de marketing, copywriting no método PAS, criação de slogan e diferencial de marca, adequação de formato por rede social e gestão de reputação em uma crise de atendimento. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "4-ps-marketing",
      titulo: "Composto de Marketing (Os 4 Ps)",
      cenario:
        "Uma empresa decidiu criar um programa de descontos progressivos para clientes recorrentes e divulgar essa ação através de anúncios patrocinados no Instagram. A quais elementos dos 4 Ps do Marketing essas duas ações pertencem, respectivamente?",
      campos: [
        {
          id: "m1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: ["Produto e Praça.", "Preço e Promoção.", "Praça e Preço."],
            correta: 1,
          },
          mensagemCerta: "Correto! Descontos referem-se ao Preço e anúncios referem-se à Promoção.",
          mensagemErrada: "Incorreto. A resposta correta é: Preço e Promoção.",
        },
      ],
    },
    {
      id: "copywriting-pas",
      titulo: "Redação Publicitária: Copywriting no Método PAS",
      cenario:
        "Desafio de Copywriting: Escreva um texto de anúncio curto para um aplicativo de marmitas saudáveis por assinatura utilizando a estrutura PAS (Apresente o Problema, Agite a frustração do cliente e apresente a Solução).",
      instrucao: "Digite o texto do anúncio no campo abaixo (o sistema valida a presença de estrutura textual coerente e vocabulário relevante).",
      campos: [
        {
          id: "copy-pas",
          placeholder:
            "Ex: Sem tempo para cozinhar durante a semana? Comer mal na rua prejudica sua saúde e pesa no bolso. O NutriBox entrega refeições saudáveis, saborosas e prontas em 3 minutos na sua porta...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /saúde|prátic|tempo|marmita|saudáv|refeiç|entreg|sabor|rotina|peso/i,
          },
          mensagemErrada: "A estrutura está coerente, mas faltam palavras-chave relacionadas ao tema de alimentação/marmitas saudáveis.",
        },
      ],
    },
    {
      id: "branding-slogan",
      titulo: "Branding: Criação de Slogan e Proposta de Valor",
      cenario: "Crie a identidade verbal de uma nova marca de tênis de corrida sustentável feitos de plástico reciclado do oceano.",
      campos: [
        {
          id: "branding-slogan",
          rotulo: "Slogan da Marca (Frase marcante e curta)",
          placeholder: "Ex: A cada passo, um oceano mais limpo.",
          regra: { tipo: "texto", minPalavras: 2, minCaracteres: 8 },
        },
        {
          id: "branding-diferencial",
          rotulo: "Diferencial Competitivo (Proposta de Valor)",
          placeholder: "Ex: Alta performance esportiva aliada à retirada de 1kg de plástico por par vendido.",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "formato-midia",
      titulo: "Planejamento de Mídia: Formato de Conteúdo vs. Objetivo",
      cenario: "Associe o tipo de formato de mídia ao objetivo estratégico mais adequado.",
      campos: [
        {
          id: "formato-f1",
          rotulo: "Explicar um passo a passo educativo com 5 dicas detalhadas.",
          regra: {
            tipo: "selecao",
            esperado: "carrossel",
            opcoes: [
              { valor: "carrossel", texto: "Carrossel de Imagens (Instagram)" },
              { valor: "stories", texto: "Stories Interativos com Enquete" },
              { valor: "artigo", texto: "Artigo de Opinião no LinkedIn" },
            ],
          },
          mensagemCerta: "Carrossel é ótimo para conteúdo educativo passo a passo.",
          mensagemErrada: "Incorreto — um passo a passo com várias dicas funciona melhor como Carrossel de Imagens.",
        },
        {
          id: "formato-f2",
          rotulo: "Interagir rapidamente com os seguidores tirando dúvidas em tempo real.",
          regra: {
            tipo: "selecao",
            esperado: "stories",
            opcoes: [
              { valor: "carrossel", texto: "Carrossel de Imagens (Instagram)" },
              { valor: "stories", texto: "Stories Interativos com Caixinha de Perguntas" },
              { valor: "artigo", texto: "Artigo de Opinião no LinkedIn" },
            ],
          },
          mensagemCerta: "Stories com caixinha de perguntas são ideais para interação rápida e em tempo real.",
          mensagemErrada: "Incorreto — interação rápida e direta com os seguidores é o ponto forte dos Stories.",
        },
      ],
    },
    {
      id: "gestao-crise",
      titulo: "Gestão de Reputação: Atendimento e Retenção de Clientes",
      cenario:
        "Estudo de Caso: Um cliente insatisfeito postou uma reclamação pública alegando que o produto atrasou 5 dias e chegou com a embalagem amassada. Escreva uma resposta pública profissional em nome da empresa, demonstrando agilidade, empatia e solução do problema.",
      campos: [
        {
          id: "resposta-crise",
          placeholder: "Escreva a resposta pública da marca...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /desculp|lament|resolver|soluç|atravé|suporte|contato|reembols|troca|experiênc/i,
          },
          mensagemErrada: "O texto é legível, mas deve conter termos de empatia e solução (ex: desculpas, resolver, suporte, troca).",
        },
      ],
    },
  ],
};

export default atividade;
