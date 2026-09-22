import type { Curso } from "@/types/curso";

/**
 * Catálogo de atividades.
 *
 * Para adicionar um curso, acrescente um objeto aqui — nenhuma tela nova é
 * necessária, a rota /atividades/<slug> passa a existir sozinha. As 10
 * trilhas de Administrativa e Gestão abaixo vêm de `js/data/atividades.js`
 * no repositório antigo (Portal-Atividades) — cada material é uma simulação
 * prática autocorrigida, uma página HTML autocontida copiada para
 * `public/atividades/<slug>/`.
 */
export const ATIVIDADES: Curso[] = [
  {
    slug: "administracao",
    titulo: "Administração",
    descricao:
      "Rotinas administrativas de escritório em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "AD",
    cor: "#1e3a8a",
    materiais: [],
    atividades: [
      {
        titulo: "Simulação Prática de Rotinas Administrativas",
        descricao:
          "6 módulos: gestão documental (GED) e nomenclatura de arquivos, comunicação corporativa, reembolso de viagens (RDV), cotação de fornecedores, organização de eventos e criação de um POP.",
        caminho: "Administração/administracao-assistente-simulacao-integrada",
      },
      {
        titulo: "Simulação de Operações Administrativas e Suporte de Gestão",
        descricao:
          "6 módulos: ata de reunião a partir de notas soltas, auditoria de ponto e escala, controle patrimonial, análise de minuta contratual e vencimentos de licenças, KPIs com plano 5W2H e triagem de ligações.",
        caminho: "Administração/administracao-rotinas-avancadas",
      },
      {
        titulo: "Simulação de Rotinas de Escritório e Suporte Operacional",
        descricao:
          "6 módulos: contas a pagar e receber, itinerário de viagem corporativa, controle de estoque de almoxarifado, priorização com Matriz GUT, e-mail de pós-venda e relatório gerencial.",
        caminho: "Administração/administracao-rotinas-suporte-operacional",
      },
      {
        titulo: "Simulação de Eficiência Operacional e Gestão de Rotinas",
        descricao:
          "6 módulos: avaliação de SLA de fornecedores, onboarding de novo colaborador, quadro Kanban, auditoria de caixa pequeno, ergonomia/segurança do escritório e etiqueta digital.",
        caminho: "Administração/administracao-eficiencia-operacional",
      },
    ],
  },
  {
    slug: "marketing",
    titulo: "Marketing",
    descricao:
      "Marketing, propaganda, branding e mídia em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "MK",
    cor: "#ff6b35",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Auto-Corretiva de Marketing e Propaganda",
        descricao:
          "Diferença entre Marketing e Propaganda, criação de headline, mapeamento de persona, funil de vendas e resposta a um caso de atendimento.",
        caminho: "Marketing/marketing-propaganda",
      },
      {
        titulo: "Atividade Auto-Corretiva de Marketing, Branding e Mídia",
        descricao:
          "Segunda versão da atividade de marketing e propaganda, com questões e casos práticos de branding e mídia.",
        caminho: "Marketing/marketing-branding-midia",
      },
      {
        titulo: "Atividade Prática: Estratégia de Marketing, Copywriting e Mídia",
        descricao:
          "Estratégia de marketing, escrita persuasiva (copywriting) e planejamento de mídia em exercícios práticos corrigidos automaticamente.",
        caminho: "Marketing/marketing-estrategia-copywriting",
      },
      {
        titulo: "Atividade Prática: Criação de Campanha e Plano de Divulgação",
        descricao:
          "Criação de uma campanha completa e de um plano de divulgação para uma empresa, do conceito à execução.",
        caminho: "Marketing/marketing-campanha-empresa",
      },
      {
        titulo: "Desafio de Growth Marketing, Unit Economics & CRO",
        descricao:
          "Desafio avançado sobre crescimento (growth), métricas de unit economics e otimização de conversão (CRO).",
        caminho: "Marketing/marketing-growth-avancado",
      },
      {
        titulo: "Simulação Prática de Marketing, Publicidade e Modelagem de Mídia",
        descricao: "Simulação prática de marketing, publicidade e modelagem de investimento em mídia.",
        caminho: "Marketing/marketing-campanhas-modelagem-midia",
      },
      {
        titulo: "Simulação de Growth Marketing, Estratégia de Mídia e Lançamentos",
        descricao: "Simulação de estratégias de growth marketing, planejamento de mídia e lançamento de produtos.",
        caminho: "Marketing/marketing-growth-midia-lancamentos",
      },
      {
        titulo: "Simulação Prática de Branding, Publicidade e Ativação de Marca",
        descricao: "Simulação prática de construção de marca (branding), publicidade e ações de ativação de marca.",
        caminho: "Marketing/marketing-branding-publicidade-avancada",
      },
    ],
  },
  {
    slug: "departamento-pessoal",
    titulo: "Departamento Pessoal",
    descricao:
      "Rotinas de departamento pessoal (DP) em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "DP",
    cor: "#0d9488",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Assistente de Departamento Pessoal (DP)",
        descricao: "Rotinas básicas de um assistente de DP: admissão, documentação e cálculos do dia a dia.",
        caminho: "Departamento Pessoal/departamento-pessoal-basico",
      },
      {
        titulo: "Atividade Prática: Departamento Pessoal II — Férias, Adicionais e Rescisão Contratual",
        descricao: "Cálculo de férias, adicionais (noturno, insalubridade) e rescisão contratual.",
        caminho: "Departamento Pessoal/departamento-pessoal-ferias-adicionais-rescisao",
      },
      {
        titulo: "Atividade Prática: Departamento Pessoal III — Jornada Noturna, Horas Extras, Licenças e CAT",
        descricao: "Jornada noturna, horas extras, licenças e Comunicação de Acidente de Trabalho (CAT).",
        caminho: "Departamento Pessoal/departamento-pessoal-jornada-horas-extras-licencas",
      },
      {
        titulo: "Atividade Prática: Departamento Pessoal IV — Novos Formatos de Interação",
        descricao: "Novos cenários e formatos de interação para praticar rotinas de departamento pessoal.",
        caminho: "Departamento Pessoal/departamento-pessoal-novos-formatos-interacao",
      },
    ],
  },
  {
    slug: "credito-cobranca",
    titulo: "Crédito e Cobrança",
    descricao:
      "Análise de crédito, cobrança e gestão financeira em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "CC",
    cor: "#16a34a",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Análise de Crédito, Gestão de Risco e Régua de Cobrança",
        descricao: "Análise de crédito, gestão de risco e a régua de cobrança usada para recuperar valores em atraso.",
        caminho: "Crédito e Cobrança/credito-cobranca-analise-risco",
      },
      {
        titulo: "Atividade Prática: Crédito e Cobrança II — Credit Scoring, Garantias e Títulos Executivos",
        descricao: "Credit scoring, tipos de garantia e títulos executivos usados na cobrança.",
        caminho: "Crédito e Cobrança/credito-cobranca-scoring-garantias-titulos",
      },
      {
        titulo: "Atividade Prática: Crédito e Cobrança III — Open Finance, Prevenção a Fraudes e Recebíveis",
        descricao: "Open Finance, prevenção a fraudes e gestão de recebíveis.",
        caminho: "Crédito e Cobrança/credito-cobranca-open-finance-fraudes-recebiveis",
      },
      {
        titulo: "Atividade Prática: Gestão Financeira, Fluxo de Caixa e Controladoria",
        descricao: "Gestão financeira, controle de fluxo de caixa e rotinas de controladoria.",
        caminho: "Crédito e Cobrança/credito-cobranca-gestao-financeira-fluxo-caixa",
      },
    ],
  },
  {
    slug: "gestao-pessoas",
    titulo: "Gestão de Pessoas",
    descricao:
      "Recrutamento, desenvolvimento e gestão de pessoas em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "GP",
    cor: "#8b5cf6",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Gestão de Pessoas I — Recrutamento, Seleção e Onboarding",
        descricao:
          "Descrição de cargo, recrutamento interno x externo, etapas do processo seletivo, documentação admissional e onboarding.",
        caminho: "Gestão de Pessoas/gestao-pessoas-recrutamento-selecao-onboarding",
      },
      {
        titulo: "Atividade Prática: Gestão de Pessoas II — Seleção STAR, Métricas e PDI",
        descricao: "Método de seleção STAR, métricas de RH e Plano de Desenvolvimento Individual (PDI).",
        caminho: "Gestão de Pessoas/gestao-pessoas-selecao-star-metricas-pdi",
      },
      {
        titulo: "Atividade Prática: Gestão de Pessoas III — Segurança Psicológica, People Analytics e DEI",
        descricao: "Segurança psicológica no trabalho, People Analytics e Diversidade, Equidade e Inclusão (DEI).",
        caminho: "Gestão de Pessoas/gestao-pessoas-seguranca-psicologica-people-analytics",
      },
      {
        titulo: "Atividade Prática: Gestão de Pessoas IV — Carreira em Y, Modelo CHA e Offboarding",
        descricao: "Plano de carreira em Y, modelo CHA (Conhecimento, Habilidade e Atitude) e processo de offboarding.",
        caminho: "Gestão de Pessoas/gestao-pessoas-carreira-y-cha-offboarding",
      },
    ],
  },
  {
    slug: "recursos-humanos",
    titulo: "Recursos Humanos",
    descricao:
      "Rotinas de RH, relações trabalhistas e benefícios em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "RH",
    cor: "#ec4899",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Assistente de Recursos Humanos",
        descricao: "Divisões do subsistema de RH, cargos e salários, classificação de cargos e divulgação de vaga.",
        caminho: "Recursos Humanos/recursos-humanos-assistente-rh",
      },
      {
        titulo: "Atividade Prática: Gestão de Talentos e Comunicação",
        descricao: "Métodos de avaliação de desempenho, treinamento e desenvolvimento, comunicação interna e feedback.",
        caminho: "Recursos Humanos/recursos-humanos-gestao-talentos-comunicacao",
      },
      {
        titulo: "Atividade Prática: Relações Trabalhistas e Resolução de Conflitos",
        descricao: "Rescisão por quebra de confiança, assédio moral, gestão de jornada e abandono de emprego.",
        caminho: "Recursos Humanos/recursos-humanos-relacoes-trabalhistas-conflitos",
      },
      {
        titulo: "Atividade Prática: Relações Trabalhistas e Conflitos II",
        descricao: "Atos faltosos (Art. 482 da CLT), acordos coletivos, teletrabalho e direito à desconexão.",
        caminho: "Recursos Humanos/recursos-humanos-relacoes-trabalhistas-conflitos-2",
      },
      {
        titulo: "Atividade Prática: Gestão de Contratos, Férias e Benefícios",
        descricao: "Pacote de benefícios, regras de férias e abono pecuniário, e contrato de experiência.",
        caminho: "Recursos Humanos/recursos-humanos-contratos-ferias-beneficios",
      },
    ],
  },
  {
    slug: "seguranca-do-trabalho",
    titulo: "Segurança do Trabalho",
    descricao:
      "Normas regulamentadoras, gestão de riscos e prevenção de acidentes em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "ST",
    cor: "#eab308",
    materiais: [
      {
        titulo: "Segurança do Trabalho: Análise de Acidente em Altura",
        descricao:
          "Relato de irregularidades, normas regulamentadoras aplicáveis, responsabilidades e protocolo de emergência pós-acidente.",
        tipo: "link",
        url: "/atividades/seguranca-do-trabalho/seguranca-trabalho-acidente-em-altura.html",
      },
      {
        titulo: "Práticas em Segurança do Trabalho",
        descricao: "EPI x EPC, higiene ocupacional, primeiros socorros, combate a incêndio, CAT, SESMT x CIPA e mapeamento de riscos.",
        tipo: "link",
        url: "/atividades/seguranca-do-trabalho/seguranca-trabalho-laboratorios-praticos.html",
      },
      {
        titulo: "Atividade Prática: Gestão de Riscos e Segurança do Trabalho",
        descricao: "Hierarquia de controle, equipamentos e sinalização, matriz de riscos e protocolo de primeiros socorros.",
        tipo: "link",
        url: "/atividades/seguranca-do-trabalho/seguranca-trabalho-gestao-riscos.html",
      },
      {
        titulo: "Atividade Prática: Gestão de Riscos e Segurança Ocupacional",
        descricao: "Classificação de agentes ambientais, hierarquia de controles e EPIs, e Programa de Gerenciamento de Riscos (PGR).",
        tipo: "link",
        url: "/atividades/seguranca-do-trabalho/seguranca-trabalho-higiene-ocupacional-pgr.html",
      },
      {
        titulo: "Atividade Prática: NRs de Alto Risco na Segurança do Trabalho",
        descricao: "Combate a incêndio (NR-23), trabalho em altura (NR-35), ergonomia (NR-17) e espaço confinado (NR-33).",
        tipo: "link",
        url: "/atividades/seguranca-do-trabalho/seguranca-trabalho-nrs-alto-risco.html",
      },
      {
        titulo: "Atividade Prática: Elaboração e Interpretação do Mapa de Riscos",
        descricao: "Conceito e elaboração do mapa de riscos (NR-5), padronização de cores e regras de representação.",
        tipo: "link",
        url: "/atividades/seguranca-do-trabalho/seguranca-trabalho-mapa-de-riscos.html",
      },
    ],
  },
  {
    slug: "assistente-gestao",
    titulo: "Assistente de Gestão",
    descricao: "Gestão empresarial, vendas e logística em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "AG",
    cor: "#0891b2",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Gestão Empresarial e Estratégica",
        descricao:
          "Análise SWOT (matriz FOFA), Ciclo PDCA, cálculo de Retorno sobre Investimento (ROI) e liderança na resolução de conflitos de equipe.",
        caminho: "Assistente de Gestão/assistente-gestao-empresarial-estrategica",
      },
      {
        titulo: "Atividade Prática: Técnicas e Gestão de Vendas",
        descricao: "Perfil do profissional de vendas moderno, procedimento de atendimento consultivo e cálculo de metas e comissões.",
        caminho: "Assistente de Gestão/assistente-gestao-tecnicas-vendas",
      },
      {
        titulo: "Atividade Prática: Desafios Logísticos e Operações Situacionais",
        descricao: "Cenários de Analista de Supply Chain: crises de abastecimento, custos de frete e decisões operacionais em tempo real.",
        caminho: "Assistente de Gestão/assistente-gestao-desafios-logisticos",
      },
      {
        titulo: "Atividade Prática: Gestão Logística e Operações II",
        descricao: "Modais de transporte, indicador OTIF, cálculo de cubagem e estratégia de Cross-Docking na Cadeia de Suprimentos.",
        caminho: "Assistente de Gestão/assistente-gestao-logistica-operacoes-2",
      },
      {
        titulo: "Atividade Prática: Gestão de Logística e Supply Chain",
        descricao: "Logística Inbound/Outbound, gestão de estoques, cálculo de reposição e logística reversa.",
        caminho: "Assistente de Gestão/assistente-gestao-logistica-supply-chain",
      },
    ],
  },
  {
    slug: "secretariado",
    titulo: "Secretariado",
    descricao: "Rotinas de secretariado executivo em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "S",
    cor: "#9333ea",
    materiais: [
      {
        titulo: "Atividade Prática: Rotinas de Secretariado e Assessoria Administrativa",
        descricao:
          "Rotinas administrativas, redação oficial, gestão de agenda, etiqueta corporativa e controle de fundo fixo (pequeno caixa).",
        tipo: "link",
        url: "/atividades/secretariado/secretariado-rotinas-assessoria-administrativa.html",
      },
      {
        titulo: "Atividade Prática: Secretariado Executivo — Viagens, Eventos e Arquivo",
        descricao:
          "Planejamento de viagens, relatório de despesas, organização de eventos (RSVP), métodos de arquivamento e conflitos de agenda.",
        tipo: "link",
        url: "/atividades/secretariado/secretariado-executivo-viagens-eventos-arquivo.html",
      },
      {
        titulo: "Atividade Prática: Secretariado Executivo — Gestão da Informação e 5S",
        descricao:
          "Metodologia 5S, rotinas de protocolo, orçamento de suprimentos, triagem telefônica avançada e LGPD na proteção de dados.",
        tipo: "link",
        url: "/atividades/secretariado/secretariado-executivo-gestao-informacao-5s.html",
      },
      {
        titulo: "Atividade Prática: Secretariado — Gestão de Tempo, Comunicação e Ferramentas",
        descricao:
          "Matriz de Eisenhower, organização de reuniões virtuais (netiqueta), orçamentos, comunicação assertiva por e-mail e controles em nuvem.",
        tipo: "link",
        url: "/atividades/secretariado/secretariado-gestao-tempo-comunicacao-ferramentas.html",
      },
    ],
  },
  {
    slug: "vendas",
    titulo: "Vendas",
    descricao: "Técnicas de vendas, negociação e gestão comercial em simulações práticas, com correção automática das respostas.",
    categoria: "administrativa",
    sigla: "V",
    cor: "#f97316",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Técnicas e Gestão de Vendas",
        descricao: "Perfil do profissional de vendas moderno, procedimento de atendimento consultivo e cálculo de metas e comissões.",
        caminho: "Vendas/vendas-tecnicas-gestao-vendas",
      },
      {
        titulo: "Atividade Prática: Técnicas de Vendas e Negociação Comercial",
        descricao: "Prospecção B2B (Spin Selling), técnicas de fechamento avançado, objeções complexas e cálculo de margens de desconto.",
        caminho: "Vendas/vendas-tecnicas-negociacao-comercial",
      },
      {
        titulo: "Atividade Prática: Vendas — Gestão de Funil, CRM e Retenção",
        descricao: "Etapas do funil de vendas, estratégias Inbound/Outbound, Up-selling/Cross-selling, uso de CRM e cálculo de ticket médio.",
        caminho: "Vendas/vendas-funil-crm-retencao",
      },
      {
        titulo: "Atividade Prática: Técnicas de Vendas na Linha de Frente",
        descricao:
          "Qualificação de leads pelo método BANT, técnicas persuasivas de fechamento, ligações frias (cold call) e cálculo de comissionamento.",
        caminho: "Vendas/vendas-tecnicas-linha-de-frente",
      },
      {
        titulo: "Atividade Prática: Vendas — Social Selling, Inside Sales e Qualificação Avançada",
        descricao:
          "Qualificação de leads entre Marketing e Vendas, prospecção via redes sociais, cadência de follow-up e cálculo de Win Rate.",
        caminho: "Vendas/vendas-social-selling-inside-sales",
      },
    ],
  },
];

export function acharCurso(slug: string): Curso | undefined {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
