import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_REMUNERACAO = [
  { valor: "plr", texto: "Alinhar o esforço do colaborador com as metas de curto/médio prazo e desempenho financeiro da empresa" },
  { valor: "equity", texto: "Reter executivos e talentos-chave no longo prazo oferecendo sociedade/participação acionária (Stock Options)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Pessoas III — Segurança Psicológica, People Analytics e DEI",
  introducao:
    "Aprenda a construir ambientes de alta performance baseados em Segurança Psicológica, tomar decisões orientadas a dados com People Analytics, estruturar planos de remuneração, promover Diversidade (DEI) e prevenir o Burnout. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "seguranca-psicologica",
      titulo: "Segurança Psicológica e Alta Performance (Estudo Amy Edmondson)",
      cenario:
        "Segundo as pesquisas sobre equipes de alta performance (como o Projeto Aristóteles do Google), o fator individual mais determinante para a inovação e o sucesso de um time é a Segurança Psicológica. O que define a presença desse conceito no ambiente de trabalho?",
      campos: [
        {
          id: "seguranca-psicologica",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Um ambiente rígido onde os membros nunca erram, pois evitam assumir qualquer tipo de risco.",
              "A crença compartilhada de que a equipe é segura para tomar riscos interpessoais, admitir erros e expor ideias sem medo de punição, rejeição ou ridicularização.",
              "A obrigatoriedade de todos concordarem sempre com o líder para evitar debates ou discordâncias.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Segurança psicológica envolve sentir-se seguro para errar, aprender e expor pontos de vista.",
          mensagemErrada: "Incorreto. A Segurança Psicológica diz respeito ao acolhimento e liberdade para assumir riscos sem medo.",
        },
      ],
    },
    {
      id: "people-analytics",
      titulo: "People Analytics e RH Estratégico (Data-Driven HR)",
      cenario:
        "O uso do People Analytics transforma a gestão do RH de um modelo intuitivo para um modelo fundamentado em dados. Explique o papel da Análise Preditiva na retenção de talentos e como cruzar dados pode evitar o desligamento voluntário.",
      campos: [
        {
          id: "people-analytics-objetivo",
          rotulo: "Objetivo do People Analytics",
          placeholder: "Ex: Coletar e analisar dados de colaboradores para tomar decisões estratégicas embasadas em evidências...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "people-analytics-preditiva",
          rotulo: "Aplicação Preditiva na Retenção",
          placeholder: "Ex: Identificar padrões de insatisfação, estagnação ou queda de engajamento antes que o colaborador peça demissão...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "remuneracao-plr-equity",
      titulo: "Arquitetura de Cargos, Salários e Remuneração Flexível",
      instrucao: "Associe o modelo de recompensa corporativa ao seu principal objetivo estratégico na gestão de talentos:",
      campos: [
        {
          id: "remuneracao-plr",
          rotulo: "Participação nos Lucros e Resultados (PLR / Bônus por Metas)",
          regra: { tipo: "selecao", esperado: "plr", opcoes: OPCOES_REMUNERACAO },
          mensagemCerta: "Perfeito! PLR estimula metas de curto/médio prazo e Equity alinha retenção de longo prazo.",
          mensagemErrada: "Incorreto. Verifique a correspondência entre os modelos de recompensa e seus objetivos.",
        },
        {
          id: "remuneracao-equity",
          rotulo: "Remuneração baseada em Equity (Stock Options / Ações)",
          regra: { tipo: "selecao", esperado: "equity", opcoes: OPCOES_REMUNERACAO },
          mensagemCerta: "Perfeito! PLR estimula metas de curto/médio prazo e Equity alinha retenção de longo prazo.",
          mensagemErrada: "Incorreto. Verifique a correspondência entre os modelos de recompensa e seus objetivos.",
        },
      ],
    },
    {
      id: "diversidade-inclusao",
      titulo: "Diversidade, Equidade e Inclusão (DEI) nas Organizações",
      cenario:
        "Apenas contratar grupos minoritários não garante a permanência desses profissionais na empresa se não houver um ambiente inclusivo. Descreva a diferença essencial entre Diversidade (representatividade) e Inclusão (pertencimento) no ambiente corporativo.",
      campos: [
        {
          id: "diversidade-inclusao",
          placeholder:
            "Explique que diversidade é a presença de diferentes perfis/backgrounds, enquanto inclusão garante que essas pessoas tenham voz, equidade de oportunidades e sentimento real de pertencimento...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15, palavrasChave: /diversid|inclus|pertenc|equidad|voz|respeit|perfil|representa/i },
          mensagemErrada: "Mencione termos como diversidade (representatividade de perfis) e inclusão (pertencimento e equidade de voz).",
        },
      ],
    },
    {
      id: "burnout-qualidade-de-vida",
      titulo: "Qualidade de Vida no Trabalho e Mitigação do Burnout",
      cenario:
        "A Síndrome de Burnout (esgotamento profissional) foi reconhecida como fenômeno ocupacional. Quais estratégias de liderança e gestão de carga de trabalho podem ser implementadas para prevenir a exaustão física e mental dos liderados?",
      campos: [
        {
          id: "burnout-qualidade-de-vida",
          placeholder:
            "Discorra sobre equilíbrio de demandas, alinhamento de prazos realistas, incentivo a pausas, respeito aos horários de descanso e abertura para diálogos sobre saúde mental...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15, palavrasChave: /carg|praz|saúd|paus|descans|demand|equilíbr|líder|diálog/i },
          mensagemErrada: "Mencione controle de carga de trabalho, prazos realistas, incentivo ao descanso ou apoio à saúde mental.",
        },
      ],
    },
  ],
};

export default atividade;
