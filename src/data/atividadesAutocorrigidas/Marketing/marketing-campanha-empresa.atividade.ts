import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Criação de Campanha e Plano de Divulgação",
  introducao:
    "Esta atividade prática cria do zero uma campanha de lançamento para uma empresa de tecnologia B2B: briefing e objetivo da campanha, conceito criativo e slogan, escolha de canais de mídia, cronograma de divulgação em fases e métricas de sucesso (KPIs). Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "briefing-objetivo",
      titulo: "Briefing e Objetivo Principal da Campanha",
      cenario:
        "Uma empresa de soluções em tecnologia e softwares corporativos chamada \"TechSoluções\" deseja lançar uma nova campanha nacional para atrair pequenas e médias empresas. Qual deve ser o objetivo primário dessa campanha se a meta principal da empresa no trimestre for gerar novas reuniões comerciais diretamente com gerentes e diretores?",
      campos: [
        {
          id: "objetivo-campanha",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Institucional / Brand Awareness (Apenas tornar a marca mais conhecida do público geral)",
              "Geração de Leads Qualificados / Conversão (Captação de contatos decisores para o time de vendas)",
              "Endomarketing (Motivação interna dos funcionários da própria empresa)",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Para gerar reuniões comerciais B2B, o foco do objetivo é Geração de Leads e Conversão.",
          mensagemErrada: "Incorreto. A resposta correta é: Geração de Leads Qualificados / Conversão.",
        },
      ],
    },
    {
      id: "conceito-slogan",
      titulo: "Conceito Criativo, Chamada de Impacto e Slogan",
      cenario:
        "Desafio de Criação: Defina o Slogan da Campanha e o Conceito Central que será usado em todas as peças publicitárias para convencer as empresas de que a \"TechSoluções\" vai otimizar o tempo e reduzir custos operacionais.",
      campos: [
        {
          id: "slogan-campanha",
          rotulo: "Slogan da Campanha (Frase curta e impactante)",
          placeholder: "Ex: TechSoluções: A tecnologia que faz seu negócio crescer sem complicações.",
          regra: { tipo: "texto", minPalavras: 2, minCaracteres: 8 },
        },
        {
          id: "proposta-valor",
          rotulo: "Proposta Central de Valor (Mensagem da Campanha)",
          placeholder: "Ex: Automatize processos manuais, reduza custos em até 30% e foque no que realmente importa.",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "canais-divulgacao",
      titulo: "Plano de Mídia: Onde e Como Será a Divulgação?",
      cenario: "Associe os canais de divulgação B2B ao formato de mídia mais adequado para alcançar os diretores e empresários.",
      campos: [
        {
          id: "canal-linkedin",
          rotulo: "LinkedIn Ads (Foco em diretores e gestores de empresas)",
          regra: {
            tipo: "selecao",
            esperado: "sponsored",
            opcoes: [
              { valor: "sponsored", texto: "Anúncios de Vídeo e Carrossel com Estudo de Caso B2B" },
              { valor: "dancinha", texto: "Vídeos curtos de entretenimento sem foco profissional" },
            ],
          },
          mensagemCerta: "Estudos de caso B2B em vídeo/carrossel são o formato certo para diretores no LinkedIn.",
          mensagemErrada: "Incorreto — no LinkedIn, o formato adequado para diretores é anúncio de vídeo/carrossel com estudo de caso B2B.",
        },
        {
          id: "canal-google",
          rotulo: "Google Search (Anúncios de Pesquisa)",
          regra: {
            tipo: "selecao",
            esperado: "search_ads",
            opcoes: [
              { valor: "search_ads", texto: "Anúncios no topo da busca para palavras-chave como 'software de gestão'" },
              { valor: "panfletos", texto: "Distribuição de panfletos em semáforos" },
            ],
          },
          mensagemCerta: "Anúncios de busca por palavras-chave relevantes é o uso correto do Google Search Ads.",
          mensagemErrada: "Incorreto — no Google Search, o formato adequado é anúncio de busca por palavras-chave do setor.",
        },
      ],
    },
    {
      id: "cronograma-fases",
      titulo: "Cronograma e Fases da Divulgação",
      cenario: "Descreva como será dividida a divulgação nas 2 fases principais da campanha.",
      campos: [
        {
          id: "fase-teaser",
          rotulo: "Fase 1: Teaser / Aquecimento (O que divulgar antes do lançamento?)",
          placeholder: "Descreva os conteúdos para gerar curiosidade e expectativa no mercado...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 15 },
        },
        {
          id: "fase-lancamento",
          rotulo: "Fase 2: Lançamento Oficial e Oferta (O que divulgar no dia do lançamento?)",
          placeholder: "Descreva o anúncio principal, demonstração gratuita e chamada de vendas...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 15 },
        },
      ],
    },
    {
      id: "kpis-campanha",
      titulo: "Indicadores de Sucesso (KPIs da Campanha)",
      cenario:
        "Estudo de Caso Final: Para comprovar à diretoria da empresa que a divulgação funcionou, quais métricas principais devem ser apresentadas no relatório final de resultados e por quê?",
      campos: [
        {
          id: "kpis",
          placeholder:
            "Explique quais indicadores (ex: custo por lead, reuniões agendadas, número de cadastros, retorno sobre investimento) provam o sucesso da campanha...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /lead|custo|roi|conversão|venda|reunião|retorno|cadast|resultado|cliente/i,
          },
          mensagemErrada: "A resposta está legível, mas inclua termos de métricas comerciais (leads, ROI, conversão, reuniões, etc.).",
        },
      ],
    },
  ],
};

export default atividade;
