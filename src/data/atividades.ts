import type { Curso } from "@/types/curso";

/**
 * Catálogo de atividades.
 *
 * Para adicionar um curso, acrescente um objeto aqui — nenhuma tela nova é
 * necessária, a rota /atividades/<slug> passa a existir sozinha. Cada item
 * de `atividades` aponta para um arquivo em
 * `src/data/atividadesAutocorrigidas/` — ver o molde em
 * `src/data/atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md`.
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
      {
        titulo: "Atividade Prática: Departamento Pessoal — Configurando a Planilha da Folha de Pagamento",
        descricao: "Você baixa o cadastro de 40 funcionários e monta a folha: INSS progressivo, IRRF com desconto simplificado (PROCV aproximado), vale-transporte limitado a 6%, líquido, FGTS, validação, holerite por matrícula e proteção.",
        caminho: "Departamento Pessoal/departamento-pessoal-planilha-folha-configurar",
      },
      {
        titulo: "Atividade Prática: Departamento Pessoal — Fechando a Folha na Planilha Já Configurada",
        descricao: "Você baixa a folha pronta e lança as ocorrências de setembro (horas extras, domingo, faltas, atrasos e vales), com matrícula errada, repetição, atestado e hora extra acima do limite, e fecha os totais com DSR, INSS, IRRF e FGTS.",
        caminho: "Departamento Pessoal/departamento-pessoal-planilha-folha-preencher",
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
      {
        titulo: "Atividade Prática: Crédito e Cobrança — Configurando a Planilha de Contas a Receber",
        descricao: "Você baixa a carteira de títulos e configura dias de atraso, faixas de vencimento (aging), multa e juros pro rata, resumo por faixa com SOMASES, alerta de cobrança e consulta por cliente.",
        caminho: "Crédito e Cobrança/credito-cobranca-planilha-receber-configurar",
      },
      {
        titulo: "Atividade Prática: Crédito e Cobrança — Dando Baixa nos Recebimentos na Planilha Já Configurada",
        descricao: "Você baixa a planilha pronta e lança o retorno do banco de setembro, com nota errada, crédito repetido, cliente que pagou duas vezes e pagamento sem juros, e fecha a carteira com o que vai para negativação.",
        caminho: "Crédito e Cobrança/credito-cobranca-planilha-receber-preencher",
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
    materiais: [],
    atividades: [
      {
        titulo: "Segurança do Trabalho: Análise de Acidente em Altura",
        descricao:
          "Relato de irregularidades, normas regulamentadoras aplicáveis, responsabilidades e protocolo de emergência pós-acidente.",
        caminho: "Segurança do Trabalho/seguranca-trabalho-acidente-em-altura",
      },
      {
        titulo: "Práticas em Segurança do Trabalho",
        descricao: "EPI x EPC, higiene ocupacional, primeiros socorros, combate a incêndio, CAT, SESMT x CIPA e mapeamento de riscos.",
        caminho: "Segurança do Trabalho/seguranca-trabalho-laboratorios-praticos",
      },
      {
        titulo: "Atividade Prática: Gestão de Riscos e Segurança do Trabalho",
        descricao: "Hierarquia de controle, equipamentos e sinalização, matriz de riscos e protocolo de primeiros socorros.",
        caminho: "Segurança do Trabalho/seguranca-trabalho-gestao-riscos",
      },
      {
        titulo: "Atividade Prática: Gestão de Riscos e Segurança Ocupacional",
        descricao: "Classificação de agentes ambientais, hierarquia de controles e EPIs, e Programa de Gerenciamento de Riscos (PGR).",
        caminho: "Segurança do Trabalho/seguranca-trabalho-higiene-ocupacional-pgr",
      },
      {
        titulo: "Atividade Prática: NRs de Alto Risco na Segurança do Trabalho",
        descricao: "Combate a incêndio (NR-23), trabalho em altura (NR-35), ergonomia (NR-17) e espaço confinado (NR-33).",
        caminho: "Segurança do Trabalho/seguranca-trabalho-nrs-alto-risco",
      },
      {
        titulo: "Atividade Prática: Elaboração e Interpretação do Mapa de Riscos",
        descricao: "Conceito e elaboração do mapa de riscos (NR-5), padronização de cores e regras de representação.",
        caminho: "Segurança do Trabalho/seguranca-trabalho-mapa-de-riscos",
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
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Rotinas de Secretariado e Assessoria Administrativa",
        descricao:
          "Rotinas administrativas, redação oficial, gestão de agenda, etiqueta corporativa e controle de fundo fixo (pequeno caixa).",
        caminho: "Secretariado/secretariado-rotinas-assessoria-administrativa",
      },
      {
        titulo: "Atividade Prática: Secretariado Executivo — Viagens, Eventos e Arquivo",
        descricao:
          "Planejamento de viagens, relatório de despesas, organização de eventos (RSVP), métodos de arquivamento e conflitos de agenda.",
        caminho: "Secretariado/secretariado-executivo-viagens-eventos-arquivo",
      },
      {
        titulo: "Atividade Prática: Secretariado Executivo — Gestão da Informação e 5S",
        descricao:
          "Metodologia 5S, rotinas de protocolo, orçamento de suprimentos, triagem telefônica avançada e LGPD na proteção de dados.",
        caminho: "Secretariado/secretariado-executivo-gestao-informacao-5s",
      },
      {
        titulo: "Atividade Prática: Secretariado — Gestão de Tempo, Comunicação e Ferramentas",
        descricao:
          "Matriz de Eisenhower, organização de reuniões virtuais (netiqueta), orçamentos, comunicação assertiva por e-mail e controles em nuvem.",
        caminho: "Secretariado/secretariado-gestao-tempo-comunicacao-ferramentas",
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
      {
        titulo: "Atividade Prática: Vendas — Configurando a Planilha de Pedidos e Comissões",
        descricao: "Você baixa a tabela de preços, as metas e os pedidos de agosto e configura preço por código, valor líquido, alerta de alçada de desconto, faturamento por vendedor, comissão escalonada e ranking.",
        caminho: "Vendas/vendas-planilha-comissoes-configurar",
      },
      {
        titulo: "Atividade Prática: Vendas — Lançando os Pedidos na Planilha de Comissões Já Configurada",
        descricao: "Você baixa a planilha pronta e lança os pedidos de setembro, com código errado, item repetido, pedido cancelado e desconto com e sem aprovação, e fecha faturamento e comissões do time.",
        caminho: "Vendas/vendas-planilha-comissoes-preencher",
      },
    ],
  },
  {
    slug: "windows-11",
    titulo: "Windows 11",
    descricao: "Uso do Windows 11 em atividades práticas: área de trabalho, Explorador de Arquivos, Configurações e aplicativos.",
    categoria: "informatica",
    sigla: "W11",
    cor: "#0078d4",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Windows 11 — Pastas, Arquivos e Print da Tela",
        descricao:
          "Criar pastas e subpastas, escrever e salvar um arquivo de texto, organizar os arquivos e salvar um print da tela em .bmp pelo Paint.",
        caminho: "Windows 11/windows11-pastas-arquivos-print",
      },
      {
        titulo: "Atividade Prática: Windows 11 — Copiar, Recortar e Colar Arquivos",
        descricao:
          "Criar pastas e arquivos, copiar, recortar, renomear, excluir/restaurar da Lixeira e desfazer ações no Explorador de Arquivos.",
        caminho: "Windows 11/windows11-copiar-recortar-colar",
      },
      {
        titulo: "Atividade Prática: Windows 11 — Explorando o Sistema",
        descricao:
          "Personalizar a área de trabalho, usar o Explorador de Arquivos, a barra de tarefas e o Menu Iniciar, ajustar as Configurações e gerenciar aplicativos.",
        caminho: "Windows 11/windows11-explorando-o-sistema",
      },
      {
        titulo: "Atividade Prática: Windows 11 — Personalização Avançada",
        descricao:
          "Ponteiro do mouse, cores de destaque, plano de fundo em apresentação de slides, temas, sons do sistema e comportamento da barra de tarefas.",
        caminho: "Windows 11/windows11-personalizacao-avancada",
      },
      {
        titulo: "Atividade Prática: Windows 11 — Projeto, Compactação e Proteção de Pastas",
        descricao:
          "Estrutura de pastas de um projeto, renomeação em lote, arquivos ZIP, compactação NTFS, pastas ocultas e permissões.",
        caminho: "Windows 11/windows11-projeto-compactacao-protecao",
      },
      {
        titulo: "Atividade Prática: Windows 11 — Partição de Disco e Memória",
        descricao:
          "Criar, usar e apagar uma partição de até 1 GB no Gerenciamento de Disco e entender a diferença entre RAM e memória virtual.",
        caminho: "Windows 11/windows11-particao-disco-memoria",
      },
      {
        titulo: "Atalhos de Teclado e Acessibilidade",
        descricao: "6 atividades: atalhos essenciais, organizar janelas sem mouse, um desafio 'sem mouse', teclas de aderência/filtragem, Acesso por Voz, Narrador, alto contraste e Lupa.",
        caminho: "Windows 11/windows11-atalhos-acessibilidade",
      },
    ],
  },
  {
    slug: "photoshop",
    titulo: "Adobe Photoshop",
    descricao: "Do primeiro clique a composições avançadas — curso completo em 8 graus.",
    categoria: "design",
    sigla: "PS",
    cor: "#001e36",
    materiais: [
      {
        titulo: "Foto de apoio — esfera lisa",
        descricao:
          "Fundo neutro e sem texturas complicadas — boa para praticar recorte e remoção de fundo (Graus 1 e 3) se você não tiver uma foto sua à mão.",
        tipo: "imagem",
        arquivo: "/atividades/photoshop/material-esfera.jpg",
      },
    ],
    atividades: [
      {
        titulo: "Adobe Photoshop — Grau 1: Conhecendo a Ferramenta",
        descricao:
          "Reconhecer a tela do Photoshop, inserir uma imagem, recortar e remover o fundo de uma foto por dois caminhos diferentes.",
        caminho: "Photoshop/photoshop-grau1-conhecendo-a-ferramenta",
      },
      {
        titulo: "Adobe Photoshop — Grau 2: Seleções e Camadas Avançadas",
        descricao:
          "Seleção por cor, Laço Poligonal/Magnético, máscaras de camada e modos de mesclagem, com prática de montagem por máscara.",
        caminho: "Photoshop/photoshop-grau2-selecoes-e-camadas",
      },
      {
        titulo: "Adobe Photoshop — Grau 3: Ajustes de Cor e Retoque",
        descricao:
          "Níveis, Curvas, Balanço de Cor e as ferramentas de retoque (Carimbo, Pincel de Recuperação, Correção Pontual) em camadas de ajuste não destrutivas.",
        caminho: "Photoshop/photoshop-grau3-cor-e-retoque",
      },
      {
        titulo: "Adobe Photoshop — Grau 4: Texto, Formas e Composição",
        descricao:
          "Ferramenta Texto, estilos de camada, formas vetoriais, Regra dos Terços e a montagem de um post pronto para redes sociais.",
        caminho: "Photoshop/photoshop-grau4-texto-formas-e-composicao",
      },
      {
        titulo: "Adobe Photoshop — Grau 5: Efeitos e Filtros Criativos",
        descricao: "Objetos Inteligentes, Filtros Inteligentes e a montagem de um efeito de dupla exposição.",
        caminho: "Photoshop/photoshop-grau5-efeitos-e-filtros",
      },
      {
        titulo: "Adobe Photoshop — Grau 6: Composição Avançada",
        descricao:
          "Perspectiva, refinamento de seleção, harmonização de cor e luz entre elementos de fontes diferentes — a técnica por trás de qualquer montagem que engana o olho.",
        caminho: "Photoshop/photoshop-grau6-composicao-avancada",
      },
      {
        titulo: "Adobe Photoshop — Grau 7: Projeto Final Integrador",
        descricao:
          "Um briefing de verdade, do planejamento à entrega organizada: peça principal, adaptação para Stories e exportação para diferentes usos.",
        caminho: "Photoshop/photoshop-grau7-projeto-final",
      },
      {
        titulo: "Adobe Photoshop — Grau 8 (Bônus): Auras e Efeitos de Invocação",
        descricao:
          "Luz de contorno, auras coloridas e texto de efeito — o estilo por trás dos memes de personagem com elemento fantástico atrás dele.",
        caminho: "Photoshop/photoshop-grau8-auras-e-invocacao",
      },
    ],
  },
  {
    slug: "cordova",
    titulo: "Apps Mobile com Ionic e Cordova",
    descricao: "Construa um aplicativo de celular de verdade, do primeiro componente ao emulador Android.",
    categoria: "programacao",
    sigla: "ION",
    cor: "#3880ff",
    materiais: [],
    atividades: [
      {
        titulo: "Ionic e Cordova — Primeiros Passos",
        descricao:
          "O que são Ionic e Cordova, criando o projeto pelo terminal, primeiro componente (cabeçalho e cartão), cores do tema e o Console como ferramenta de investigação de erros.",
        caminho: "Cordova/cordova-primeiros-passos",
      },
      {
        titulo: "Ionic — Prática de Componentes",
        descricao:
          "14 componentes visuais do Ionic (input, botões, lista, badge, chip, toggle, busca, FAB, avatar, grid, progress bar, spinner, footer), um a um, até montar a tela completa do app.",
        caminho: "Cordova/cordova-componentes-visuais",
      },
      {
        titulo: "Ionic — Prática de JavaScript",
        descricao:
          "Eventos, arrays e listas dinâmicas: adicionar, excluir, marcar como concluída, buscar em tempo real, ordenar e o modo escuro ganhando lógica de verdade.",
        caminho: "Cordova/cordova-javascript-e-listas",
      },
      {
        titulo: "Ionic — LocalStorage e Emulador",
        descricao:
          "Fazendo o app lembrar das missões com localStorage e rodando pela primeira vez dentro de um celular Android simulado no Android Studio.",
        caminho: "Cordova/cordova-localstorage-e-emulador",
      },
      {
        titulo: "Ionic — Projeto Final",
        descricao:
          "Desafios práticos (fáceis, médios e difíceis), um código de referência completo e o fechamento do projeto \"Minhas Missões\".",
        caminho: "Cordova/cordova-projeto-final",
      },
      {
        titulo: "Ionic — Projeto Livre: Rede Social",
        descricao:
          "Projeto final aberto: uma mini rede social (ConectaTurma) com perfil, posts, curtidas, comentários, seguir colegas e busca — com gabarito comentado completo.",
        caminho: "Cordova/cordova-projeto-livre-rede-social",
      },
    ],
  },
  {
    slug: "canva",
    titulo: "Canva",
    descricao: "Criação e edição de posts para redes sociais.",
    categoria: "design",
    sigla: "C",
    cor: "#6a2c91",
    materiais: [],
    atividades: [
      {
        titulo: "Avaliação Prática: Post Carrossel com IA",
        descricao: "Apresentação interativa guiando o aluno a criar um carrossel para Instagram: edição de imagem, geração de vídeo com IA, edição de vídeo e montagem final.",
        caminho: "Canva/canva-avaliacao-carrossel",
      },
    ],
  },
  {
    slug: "excel",
    titulo: "Excel Básico",
    descricao: "Planilhas e fórmulas simples.",
    categoria: "informatica",
    sigla: "X",
    cor: "#1d6f42",
    materiais: [
      {
        titulo: "Planilha da Atividade de Estoque",
        descricao: "Planilha base para a atividade de controle de estoque.",
        tipo: "planilha",
        arquivo: "/atividades/excel/planilha-da-atividade-de-estoque.xlsx",
      },
    ],
    atividades: [
      {
        titulo: "Tabela INSS",
        descricao: "Atividade prática para aprender a criar tabelas no Excel e calcular o desconto do INSS utilizando fórmulas simples e porcentagem.",
        caminho: "Excel/excel-tabela-inss",
      },
      {
        titulo: "Cálculo de Empréstimo",
        descricao: "Exercício voltado ao cálculo de juros simples usando Excel.",
        caminho: "Excel/excel-calculo-emprestimo",
      },
      {
        titulo: "Formatação Básica",
        descricao: "Primeiros passos no Excel: formatar células, ajustar colunas e deixar a planilha organizada.",
        caminho: "Excel/excel-formatacao-basica",
      },
      {
        titulo: "Tabela de Receitas de Bolo",
        descricao: "Atividade prática montando uma tabela de receitas, trabalhando organização de dados e cálculo de quantidades.",
        caminho: "Excel/excel-tabela-receitas-bolo",
      },
      {
        titulo: "Tabela de Impostos",
        descricao: "Atividade para criar uma tabela de impostos utilizando fórmulas básicas.",
        caminho: "Excel/excel-tabela-impostos",
      },
      {
        titulo: "Planilha Empresarial (EOBRA S/A)",
        descricao: "Atividade prática que simula um relatório de vendas de uma empresa, trabalhando organização de dados e cálculos como total, média, maior e menor valor.",
        caminho: "Excel/excel-relatorio-vendas-mensais",
      },
      {
        titulo: "Fórmulas e Funções",
        descricao: "Atividade introdutória para compreender o uso de fórmulas e funções no Excel aplicadas em situações do dia a dia.",
        caminho: "Excel/excel-formulas-e-funcoes",
      },
      {
        titulo: "Contas a Pagar usando o Excel",
        descricao: "Atividade prática para criar uma planilha de contas a pagar utilizando Excel no dia a dia.",
        caminho: "Excel/excel-contas-a-pagar",
      },
      {
        titulo: "Convertendo em Dólar e usando o SE",
        descricao: "Exercício para aprender a função SE no Excel convertendo valores em dólar.",
        caminho: "Excel/excel-conversao-dolar-se",
      },
      {
        titulo: "Planilha com Máximo, Mínimo e Soma",
        descricao: "Exercício para aprender a fazer uma planilha com as funções Máximo, Mínimo e Soma.",
        caminho: "Excel/excel-maximo-minimo-soma",
      },
      {
        titulo: "Departamento de Vendas e Filtro de Dados",
        descricao: "Atividade prática de organização de dados, filtro de dados e gráfico dinâmico.",
        caminho: "Excel/excel-filtro-de-dados",
      },
      {
        titulo: "Aprendendo e Fazendo na Prática — Básico",
        descricao: "Atividade prática de organização de dados, filtro de dados e gráfico dinâmico.",
        caminho: "Excel/excel-aprendendo-fazendo-basico",
      },
      {
        titulo: "Lista de Atividades Excel",
        descricao: "Uma lista de atividades práticas para o Excel.",
        caminho: "Excel/excel-lista-de-atividades",
      },
      {
        titulo: "Função SE — Bônus por Faltas",
        descricao: "Exercício para aprender a função SE no Excel calculando bônus de funcionários conforme faltas.",
        caminho: "Excel/excel-funcao-se-bonus-faltas",
      },
      {
        titulo: "Função SE — Multa por Atraso",
        descricao: "Atividade para aplicar a função SE no cálculo automático de multa de 2% em pagamentos atrasados.",
        caminho: "Excel/excel-funcao-se-multa-atraso",
      },
    ],
  },
  {
    slug: "excel-avancado",
    titulo: "Excel Avançado",
    descricao: "PROCV, macros e automações de planilha.",
    categoria: "informatica",
    sigla: "X+",
    cor: "#0f5132",
    materiais: [
      {
        titulo: "Controle de Vendas e Comissões (Cálculo Avançado)",
        descricao: "Planilha extensa com 40 vendas para praticar fórmulas SE aninhadas, SOMASE, CONT.SE, MÁXIMO e ÍNDICE/CORRESP no cálculo de descontos, comissões e resumo por vendedor.",
        tipo: "planilha",
        arquivo: "/atividades/excel-avancado/excel-avancado-controle-de-vendas-e-comissoes.xlsx",
      },
      {
        titulo: "Catálogo de Produtos: Busca e Gráficos",
        descricao: "Planilha extensa com catálogo de 35 produtos e 70 vendas para praticar PROCV, ÍNDICE+CORRESP em um painel de busca, e montar gráficos de barras, pizza e linha num dashboard.",
        tipo: "planilha",
        arquivo: "/atividades/excel-avancado/excel-avancado-catalogo-de-produtos-com-busca-e-graficos.xlsx",
      },
      {
        titulo: "Notas da Turma e Otimização com Solver",
        descricao: "Planilha extensa com as notas de 25 alunos (médias ponderadas e situação) e um problema de otimização pronto para resolver com a ferramenta Solver: distribuir horas de estudo para maximizar a média final.",
        tipo: "planilha",
        arquivo: "/atividades/excel-avancado/excel-avancado-notas-da-turma-e-otimizacao-com-solver.xlsx",
      },
    ],
    atividades: [
      {
        titulo: "Iniciando com o PROCV",
        descricao: "Primeira atividade do Excel Avançado: buscar informações em outra tabela com a função PROCV.",
        caminho: "Excel Avançado/excel-procv",
      },
    ],
  },
  {
    slug: "power-bi",
    titulo: "Power BI",
    descricao: "Dashboards e análise de dados.",
    categoria: "informatica",
    sigla: "BI",
    cor: "#c9a227",
    materiais: [],
    atividades: [
      {
        titulo: "Criando o seu primeiro Dashboard",
        descricao: "Conectar o Excel ao Power BI e tratar os dados.",
        caminho: "Power BI/powerbi-primeiro-dashboard",
      },
      {
        titulo: "Fazendo Análise de Funcionários de RH",
        descricao: "Criar gráficos a partir de uma base de RH.",
        caminho: "Power BI/powerbi-analise-rh",
      },
      {
        titulo: "Análise de Vendas",
        descricao: "Criar o primeiro dashboard de vendas com os recursos básicos.",
        caminho: "Power BI/powerbi-analise-de-vendas",
      },
      {
        titulo: "Dashboard de Vendas do Atacadão",
        descricao: "Criar um dashboard de vendas completo.",
        caminho: "Power BI/powerbi-dashboard-atacadao",
      },
    ],
  },
  {
    slug: "word",
    titulo: "Word",
    descricao: "Documentos, Normas ABNT e Automações.",
    categoria: "informatica",
    sigla: "W",
    cor: "#2b579a",
    materiais: [],
    atividades: [
      {
        titulo: "A Importância do Celular na Vida Escolar",
        descricao: "Atividade prática para aprender a criar e formatar um documento no Word, utilizando título, fonte adequada e texto reflexivo sobre o uso do celular nos estudos.",
        caminho: "Word/word-importancia-celular-vida-escolar",
      },
      {
        titulo: "Coisas da Vida",
        descricao: "Atividade introdutória para praticar digitação, organização de texto e uso básico do Word 2021.",
        caminho: "Word/word-coisas-da-vida",
      },
      {
        titulo: "Criando e Formatando um Documento",
        descricao: "Atividade prática para aprender a criar, formatar e organizar documentos no Word 2021, utilizando fontes, alinhamento e estilos.",
        caminho: "Word/word-criando-formatando-documento",
      },
      {
        titulo: "Lista de Atividades",
        descricao: "Lista de atividades para o Word 2021.",
        caminho: "Word/word-lista-de-atividades",
      },
      {
        titulo: "Mala Direta",
        descricao: "Atividade voltada à criação de documentos com Mala Direta no Word 2021, automatizando o preenchimento de informações a partir de uma lista de dados.",
        caminho: "Word/word-mala-direta",
      },
      {
        titulo: "Normas ABNT",
        descricao: "Atividade prática de formatação de trabalho acadêmico no Word seguindo as normas ABNT.",
        caminho: "Word/word-normas-abnt",
      },
    ],
  },
  {
    slug: "powerpoint",
    titulo: "PowerPoint",
    descricao: "Apresentações Visuais e Profissionais.",
    categoria: "informatica",
    sigla: "P",
    cor: "#d24726",
    materiais: [
      {
        titulo: "Vídeo de prática — tartaruga no computador",
        descricao: "Vídeo curto usado na Avaliação Prática: Vídeo, Edição e Transições. Baixe e insira no slide.",
        tipo: "video",
        arquivo: "/atividades/powerpoint/tartaruga-no-computador.mp4",
      },
    ],
    atividades: [
      {
        titulo: "Lista de Atividades",
        descricao: "Criação de slides básicos com título, texto e organização.",
        caminho: "PowerPoint/powerpoint-lista-atividades-basico",
      },
      {
        titulo: "Avaliação Prática: Criação e Design de Apresentação",
        descricao: "Atividade guiada (tema livre) para criar uma apresentação com no mínimo 6 slides, aplicando boas práticas de design: estrutura, regra 60/30/10 de cores e consistência visual.",
        caminho: "PowerPoint/powerpoint-criacao-e-design",
      },
      {
        titulo: "Avaliação Prática: Tabelas e Gráficos",
        descricao: "Atividade guiada (tema livre) para criar uma apresentação com no mínimo 5 slides, incluindo pelo menos uma tabela e um gráfico com dados formatados.",
        caminho: "PowerPoint/powerpoint-tabelas-e-graficos",
      },
      {
        titulo: "Avaliação Prática: Vídeo, Edição e Transições",
        descricao: "Atividade guiada para inserir um vídeo em um slide, aplicar recursos de edição de vídeo (cortar, fade) e efeitos de transição entre slides. Inclui vídeo de prática para download.",
        caminho: "PowerPoint/powerpoint-video-e-transicoes",
      },
      {
        titulo: "Avaliação Prática: Slide Mestre e Consistência Visual",
        descricao: "Atividade guiada para editar o Slide Mestre e aplicar um estilo consistente (fonte, cores, logotipo) a toda a apresentação de uma vez, em vez de formatar slide por slide.",
        caminho: "PowerPoint/powerpoint-slide-mestre",
      },
      {
        titulo: "Avaliação Prática: Apresentando com Confiança",
        descricao: "Atividade guiada sobre o momento de apresentar ao vivo: atalhos de teclado, anotações do orador, ensaiar a apresentação com cronômetro e usar o Modo de Exibição do Apresentador.",
        caminho: "PowerPoint/powerpoint-apresentando-com-confianca",
      },
    ],
  },
  {
    slug: "seguranca-era-digital",
    titulo: "Segurança na Era Digital",
    descricao: "Golpes, e-mails suspeitos e proteção de dados.",
    categoria: "informatica",
    sigla: "SD",
    cor: "#b91c1c",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade de Segurança",
        descricao: "Atividade prática sobre os cuidados básicos de segurança no uso do computador e da internet.",
        caminho: "Segurança na Era Digital/seguranca-atividade-basica",
      },
      {
        titulo: "Identificando E-mails Suspeitos",
        descricao: "Exercício para reconhecer tentativas de golpe e phishing antes de clicar em qualquer link.",
        caminho: "Segurança na Era Digital/seguranca-emails-suspeitos",
      },
      {
        titulo: "Atividade Prática: Segurança na Era Digital e Cibersegurança",
        descricao: "Fundamentos de cibersegurança: senhas, autenticação, redes e boas práticas para se proteger online.",
        caminho: "Segurança na Era Digital/seguranca-ciberseguranca-fundamentos",
      },
      {
        titulo: "Atividade Prática: Segurança na Era Digital e Defesa Cibernética",
        descricao: "Cenários práticos de defesa cibernética: identificar ataques, reagir a incidentes e reduzir riscos digitais.",
        caminho: "Segurança na Era Digital/seguranca-defesa-cibernetica",
      },
      {
        titulo: "Atividade Prática: Privacidade Avançada, Anonimato e Navegação Tor",
        descricao: "Privacidade digital avançada, anonimato online e como funciona a navegação pela rede Tor.",
        caminho: "Segurança na Era Digital/seguranca-privacidade-avancada-tor",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial e Produtividade Digital",
        descricao: "Uso responsável e produtivo de ferramentas de Inteligência Artificial no dia a dia digital.",
        caminho: "Segurança na Era Digital/seguranca-ia-produtividade-digital",
      },
      {
        titulo: "Atividade Prática: Defesa Pessoal, Consciência Situacional e Proteção Urbana",
        descricao: "Consciência situacional e proteção pessoal no dia a dia, além da segurança digital.",
        caminho: "Segurança na Era Digital/seguranca-defesa-pessoal-consciencia-situacional",
      },
    ],
  },
  {
    slug: "criar-seu-site",
    titulo: "Criando seu Site",
    descricao: "Projetos reais de HTML, CSS e JavaScript, do primeiro repositório no Git a sites completos.",
    categoria: "programacao",
    sigla: "GIT",
    cor: "#f05033",
    materiais: [],
    atividades: [
      {
        titulo: "Git e GitHub — Criando seu Repositório",
        descricao: "Guia completo, passo a passo: instalar o Git, criar sua conta e seu repositório no GitHub, e aprender os comandos que você vai usar em toda atividade (init, add, commit, push e mais). Comece por aqui.",
        caminho: "Criando seu Site/site-git-repositorio",
      },
      {
        titulo: "Atividade 1 — Site SaaS",
        descricao: "Construa a landing page de um produto SaaS fictício: cabeçalho, seção de destaque, recursos, planos e contato. Tema livre, imagens que você mesmo busca, sem prazo de entrega — salve o progresso no seu repositório.",
        caminho: "Criando seu Site/site-atividade1-saas",
      },
      {
        titulo: "Atividade 2 — Site Pessoal com Python",
        descricao: "Monte o seu portfólio (um site sobre você) com um back-end em Python usando Flask: servir páginas, gerar a lista de projetos com Jinja, receber o formulário de contato e contar visitas. Introdução ao Python aplicada a um site real.",
        caminho: "Criando seu Site/site-atividade2-portfolio-python",
      },
    ],
  },
  {
    slug: "python",
    titulo: "Python",
    descricao: "Atividades de Python",
    categoria: "programacao",
    sigla: "PY",
    cor: "#ff9f43",
    materiais: [],
    atividades: [
      {
        titulo: "Guia para iniciantes: preparando o ambiente do Python",
        descricao: "Passo a passo ilustrado: abrir o Google Colab, executar o primeiro código, carregar dados e entender os erros, com o porquê de cada passo.",
        caminho: "Python/python-guia-para-iniciantes",
      },
      {
        titulo: "Fazendo o Primeiro Código",
        descricao: "Primeiro contato com Python: print(), comentários e tipos de dados básicos (texto, inteiro, decimal), com exercícios progressivos.",
        caminho: "Python/python-primeiro-codigo",
      },
      {
        titulo: "Lógica de Programação em Python",
        descricao: "Variáveis, input() e conversão de tipos (int/float), f-strings, e um mini formulário com várias perguntas.",
        caminho: "Python/python-logica-e-variaveis",
      },
      {
        titulo: "Entrada de Dados em Python",
        descricao: "Atividade introdutória para aprender os primeiros comandos e conceitos básicos da linguagem Python.",
        caminho: "Python/python-entrada-de-dados",
      },
      {
        titulo: "Usando e aprendendo Operadores Matemáticos",
        descricao: "Os 5 operadores aritméticos, a diferença entre / e //, operadores de comparação (==, >, <...) e uma calculadora completa.",
        caminho: "Python/python-operadores-matematicos",
      },
      {
        titulo: "Lista de Atividades",
        descricao: "Lista de atividades com o foco de reforçar as aulas de Python.",
        caminho: "Python/python-atividade-complementar",
      },
    ],
  },
  {
    slug: "logica-programacao",
    titulo: "Lógica de Programação",
    descricao: "Exercícios práticos",
    categoria: "programacao",
    sigla: "LP",
    cor: "#4a69bd",
    materiais: [],
    atividades: [
      {
        titulo: "Desvendando a Lógica de Programação!",
        descricao: "O que é um algoritmo, variáveis e tipos, estrutura SE/SENÃO, com exercícios em Portugol (Olá Mundo, soma, maioridade, par/ímpar, média de notas).",
        caminho: "Lógica de Programação/logica-programacao-fundamentos",
      },
      {
        titulo: "Além do Básico — Lógica Avançada",
        descricao: "Vetores e matrizes, funções com retorno, laço enquanto x para, com 5 desafios em Portugol (média, busca, matriz 3x3, função e validação).",
        caminho: "Lógica de Programação/logica-programacao-avancada",
      },
    ],
  },
  {
    slug: "javascript",
    titulo: "Javascript",
    descricao: "Atividades de Javascript",
    categoria: "programacao",
    sigla: "JS",
    cor: "#9b59b6",
    materiais: [
      {
        titulo: "Slides — Javascript, Parte 1",
        descricao: "Apresentação da aula: o que é JavaScript, variáveis e primeiros comandos.",
        tipo: "slides",
        arquivo: "/atividades/javascript/javascript-parte-1.pptx",
      },
      {
        titulo: "Slides — Javascript, Parte 2",
        descricao: "Continuação da aula: condições, repetição e interação com o usuário.",
        tipo: "slides",
        arquivo: "/atividades/javascript/javascript-parte-2.pptx",
      },
    ],
    atividades: [
      {
        titulo: "Sistema de Análise de Números",
        descricao: "O aluno cria um programa em JavaScript que solicita um número inicial e um número final, exibe os valores do intervalo e identifica números pares e ímpares.",
        caminho: "Javascript/javascript-analise-numeros",
      },
      {
        titulo: "Simulador de Tabuada Inteligente",
        descricao: "O aluno cria um programa em JavaScript que gera a tabuada de um número informado pelo usuário.",
        caminho: "Javascript/javascript-tabuada-inteligente",
      },
      {
        titulo: "Guia: Criando sua Primeira API REST",
        descricao: "Guia completo com índice navegável para criar uma API REST do zero com Node.js e Express, do básico até deploy em produção.",
        caminho: "Javascript/javascript-guia-api-rest",
      },
      {
        titulo: "Simulador de Caixa Eletrônico",
        descricao: "O aluno desenvolve um simulador de caixa eletrônico com saldo inicial, menu de opções (ver saldo, depositar, sacar e sair), validação de saldo e execução contínua até encerrar.",
        caminho: "Javascript/javascript-caixa-eletronico",
      },
      {
        titulo: "Jogo de Adivinhação com Tentativas Limitadas",
        descricao: "O aluno cria um jogo em JavaScript que gera um número aleatório entre 1 e 50 e permite até 5 tentativas para adivinhar.",
        caminho: "Javascript/javascript-jogo-adivinhacao",
      },
    ],
  },
  {
    slug: "inteligencia-artificial",
    titulo: "Inteligência Artificial",
    descricao: "Atividades de Inteligência Artificial",
    categoria: "informatica",
    sigla: "IA",
    cor: "#ff4d4d",
    materiais: [],
    atividades: [
      {
        titulo: "Introdução à IA e Engenharia de Prompt",
        descricao: "O que é IA/IA generativa/LLM na prática, como escrever bons prompts (com exemplos ruim x bom), atividade guiada numa IA de conversação gratuita, e uso responsável.",
        caminho: "Inteligência Artificial/ia-introducao-e-prompts",
      },
      {
        titulo: "Atividade Prática: IA Generativa, Engenharia de Prompt e Aplicações",
        descricao: "Aprofunda engenharia de prompt e explora aplicações práticas de IA generativa no dia a dia e no trabalho, com correção automática das respostas.",
        caminho: "Inteligência Artificial/ia-generativa-engenharia-prompt-aplicacoes",
      },
    ],
  },
  {
    slug: "inteligencia-artificial-2",
    titulo: "Inteligência Artificial II",
    descricao: "IA aplicada ao trabalho: automação, análise de dados, prompts, segurança, vídeos, Canva e relatórios.",
    categoria: "informatica",
    sigla: "I2",
    cor: "#4d9f3a",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Fundamentos e Aplicações Práticas da IA",
        descricao: "Um dia de trabalho de consultor interno: mapear 20 tarefas de um escritório, estimar quanto tempo a IA poderia liberar e decidir por onde começar um piloto, sem esquecer o risco de cada tarefa.",
        caminho: "Inteligência Artificial II/ia2-fundamentos-e-aplicacoes-praticas",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Automatizando Tarefas Repetitivas com IA e Realizando Tarefas Inéditas",
        descricao: "Um dia de trabalho de projeto de automação: medir quanto uma IA acerta ao classificar e-mails de atendimento, calcular o tempo e o custo economizados, e desenhar o fluxo de automação com revisão humana.",
        caminho: "Inteligência Artificial II/ia2-automatizando-tarefas-repetitivas",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Análise de Dados Potencializada com IA",
        descricao: "Um dia de trabalho com o assistente de IA: pedir uma análise de dados, conferir cada afirmação dele contra os números reais e descobrir onde ele errou.",
        caminho: "Inteligência Artificial II/ia2-analise-de-dados-potencializada-com-ia",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Tendências e Inovações",
        descricao: "Um dia de trabalho de planejamento de inovação: priorizar 12 ideias de uso de IA por impacto, esforço e custo, escolher as que cabem no orçamento e escrever uma visão de tendências para a diretoria.",
        caminho: "Inteligência Artificial II/ia2-tendencias-e-inovacoes",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Dominando a Técnica de Prompt",
        descricao: "Um dia de trabalho de treinamento de equipe: avaliar 8 prompts com uma rubrica, entender o que separa um pedido vago de um bom prompt, e escrever e melhorar o seu próprio.",
        caminho: "Inteligência Artificial II/ia2-tecnica-de-prompt",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Otimizando sua Rotina com IA: Segurança e Ética no Uso da IA",
        descricao: "Um dia de trabalho de proteção de dados: classificar 20 informações do dia a dia pela sensibilidade, decidir o que pode e o que não pode ser colado em uma IA pública e escrever a política de uso responsável da empresa.",
        caminho: "Inteligência Artificial II/ia2-seguranca-e-etica-no-uso-da-ia",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Vídeos com IA Generativa e Apresentações Interativas no Canva",
        descricao: "Um dia de trabalho de comunicação: planejar um vídeo curto com cenas geradas por IA, calcular duração e uso de créditos, montar uma apresentação no Canva com hiperlinks, botões e animações e conferir o que ficou pronto.",
        caminho: "Inteligência Artificial II/ia2-videos-e-apresentacoes-no-canva",
      },
      {
        titulo: "Atividade Prática: Inteligência Artificial II — Relatórios com Auxílio de IA no Power BI e no Excel e Tabelas Vinculadas",
        descricao: "Um dia de trabalho de analista de BI: ligar uma tabela de vendas a uma tabela de produtos pela chave, calcular receita, margem e categorias com PROCV/PROCX e medidas DAX e usar o assistente de IA para acelerar o relatório, sempre conferindo os números.",
        caminho: "Inteligência Artificial II/ia2-relatorios-e-tabelas-vinculadas",
      },
    ],
  },
  {
    slug: "banco-dados-sql",
    titulo: "Banco de Dados | SQL",
    descricao: "Atividades de Banco de Dados",
    categoria: "programacao",
    sigla: "SQL",
    cor: "#00758f",
    materiais: [
      {
        titulo: "Baixar MySQL Workbench",
        descricao: "Programa usado nas atividades de SQL.",
        tipo: "link",
        url: "https://dev.mysql.com/downloads/workbench/",
      },
      {
        titulo: "Baixar XAMPP",
        descricao: "Servidor local usado para rodar o banco de dados.",
        tipo: "link",
        url: "https://sourceforge.net/projects/xampp/",
      },
    ],
    atividades: [
      {
        titulo: "Guia para iniciantes: preparando o ambiente de SQL",
        descricao: "Passo a passo ilustrado: criar o banco e as tabelas (Google Colab com SQLite ou XAMPP e MySQL Workbench), fazer a primeira consulta e entender os erros.",
        caminho: "Banco de Dados SQL/sql-guia-para-iniciantes",
      },
      {
        titulo: "Apostila — Banco de Dados SQL",
        descricao: "Introdução ao banco de dados.",
        caminho: "Banco de Dados SQL/sql-apostila",
      },
      {
        titulo: "Meu Primeiro Banco de Dados",
        descricao: "Exercícios de atividade básica de SQL.",
        caminho: "Banco de Dados SQL/sql-primeiro-banco-de-dados",
      },
      {
        titulo: "Cadastrando Dados no SQL",
        descricao: "Crie a tabela de produtos de uma loja, cadastre os dados e pratique SELECT, WHERE, ORDER BY, UPDATE e DELETE.",
        caminho: "Banco de Dados SQL/sql-cadastro-de-produtos",
      },
    ],
  },
  {
    slug: "corel-draw",
    titulo: "CorelDraw",
    descricao: "Ilustração vetorial e diagramação com o CorelDRAW.",
    categoria: "design",
    sigla: "CD",
    cor: "#c8931a",
    materiais: [],
  },
  {
    slug: "figma",
    titulo: "Figma",
    descricao: "Design de telas e protótipos colaborativos no navegador.",
    categoria: "design",
    sigla: "FG",
    cor: "#e8492b",
    materiais: [],
    atividades: [
      {
        titulo: "Figma — Grau 1: Conhecendo o Figma e o Processo de Design",
        descricao: "UX e UI, as partes da tela do Figma, atalhos e o primeiro wireframe.",
        caminho: "Figma/figma-grau1-conhecendo-o-figma",
      },
      {
        titulo: "Figma — Grau 2: Quadros, Formas e Camadas",
        descricao: "Quadros por aparelho, formas e texto, camadas com nome e alinhamento.",
        caminho: "Figma/figma-grau2-quadros-formas-e-camadas",
      },
      {
        titulo: "Figma — Grau 3: Auto Layout, Grades e Espaçamento",
        descricao: "Botão e lista que se ajustam sozinhos, grade de colunas e a régua dos 8.",
        caminho: "Figma/figma-grau3-auto-layout-e-grades",
      },
      {
        titulo: "Figma — Grau 4: Componentes, Variantes e Estilos",
        descricao: "Componente principal e instâncias, variantes de estado e estilos de cor e texto.",
        caminho: "Figma/figma-grau4-componentes-e-estilos",
      },
      {
        titulo: "Figma — Grau 5: Protótipo, Teste e Colaboração",
        descricao: "Ligar telas, animar, apresentar, testar com um colega e compartilhar.",
        caminho: "Figma/figma-grau5-prototipo-e-colaboracao",
      },
    ],
  },
  {
    slug: "after-effects",
    titulo: "After Effects",
    descricao: "Motion graphics e efeitos visuais para vídeo.",
    categoria: "design",
    sigla: "AE",
    cor: "#7b68ee",
    materiais: [],
  },
  {
    slug: "premiere",
    titulo: "Premiere",
    descricao: "Edição de vídeo, cortes e trilha sonora.",
    categoria: "design",
    sigla: "PR",
    cor: "#4b0082",
    materiais: [],
  },
  {
    slug: "adobe-premiere",
    titulo: "Adobe Premiere",
    descricao: "Edição de vídeo profissional com o Adobe Premiere Pro.",
    categoria: "design",
    sigla: "APR",
    cor: "#2e1a5e",
    materiais: [],
  },
  {
    slug: "analise-dados",
    titulo: "Análise de Dados",
    descricao: "Organização, leitura e apresentação de dados para decisão.",
    categoria: "programacao",
    sigla: "AN",
    cor: "#059669",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Análise de Dados — Introdução, Estrutura e Ciclo de Vida da Análise de Dados",
        descricao: "Um dia de trabalho de analista júnior: receber uma base de pesquisa «suja», limpar, conferir e só então calcular.",
        caminho: "Análise de Dados/dados-introducao-e-ciclo-de-vida",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Fundamentos Estatísticos para Análise de Dados",
        descricao: "Um dia de trabalho de analista: descrever 30 dias de vendas com média, mediana, desvio padrão, quartis e valores atípicos, e explicar o que cada medida diz ao gestor.",
        caminho: "Análise de Dados/dados-fundamentos-estatisticos",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Análise de Dados em SQL",
        descricao: "Um dia de trabalho com banco de dados: responder perguntas do negócio com SELECT, WHERE, GROUP BY, JOIN e ORDER BY em duas tabelas, e informar o resultado que o banco devolveu.",
        caminho: "Análise de Dados/dados-sql-analise-de-dados",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Limpeza de Dados em SQL",
        descricao: "Um dia de trabalho de saneamento de base: usar SQL para contar nulos, achar duplicados e padronizar texto em uma tabela de cadastro de clientes bagunçada.",
        caminho: "Análise de Dados/dados-sql-limpeza-de-dados",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Manipulação e Transformação de Dados em SQL",
        descricao: "Um dia de trabalho de transformação de dados: juntar tabelas, criar colunas calculadas, classificar com CASE WHEN, agregar por período e comparar com a média usando subconsulta.",
        caminho: "Análise de Dados/dados-sql-manipulacao-e-transformacao",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Clusterização de Dados e Métodos de Clusterização",
        descricao: "Um dia de trabalho de segmentação de clientes: executar à mão uma rodada do algoritmo k-means em 14 clientes, calcular distâncias, atribuir grupos e recalcular centroides.",
        caminho: "Análise de Dados/dados-clusterizacao-e-metodos",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Big Data e Análise Descritiva com Python",
        descricao: "Um dia de trabalho com Python: entender os 5 Vs do Big Data e usar pandas para descrever uma base de vendas, com média, mediana, desvio padrão, receita total e agrupamento por região.",
        caminho: "Análise de Dados/dados-big-data-e-python-descritiva",
      },
      {
        titulo: "Atividade Prática: Análise de Dados — Extração e Tratamento de Dados em Python e Gráficos com Matplotlib e Seaborn",
        descricao: "Um dia de trabalho com Python: ler um arquivo CSV, tratar valores vazios, agrupar por filial e montar gráficos que contem a história dos dados.",
        caminho: "Análise de Dados/dados-python-extracao-tratamento-e-graficos",
      },
    ],
  },
  {
    slug: "wordpress",
    titulo: "WordPress",
    descricao: "Criação e manutenção de sites com WordPress.",
    categoria: "programacao",
    sigla: "WP",
    cor: "#21759b",
    materiais: [],
  },
  {
    slug: "html",
    titulo: "HTML",
    descricao: "Estrutura de páginas web com HTML.",
    categoria: "programacao",
    sigla: "HT",
    cor: "#e34c26",
    materiais: [],
    atividades: [
      {
        titulo: "Meu Primeiro HTML",
        descricao: "O que é HTML, a estrutura básica de uma página, as tags h1, p e img, e como abrir o arquivo no navegador.",
        caminho: "HTML/html-meu-primeiro-html",
      },
      {
        titulo: "Textos, Listas e Links em HTML",
        descricao: "Títulos, parágrafos, ênfase, listas com marcadores e numeradas, e links para sites, páginas e e-mail.",
        caminho: "HTML/html-textos-listas-e-links",
      },
      {
        titulo: "Imagens e Tabelas em HTML",
        descricao: "Imagens com src, alt e tamanho, e tabelas com cabeçalho, linhas e células.",
        caminho: "HTML/html-imagens-e-tabelas",
      },
      {
        titulo: "Formulários em HTML",
        descricao: "Campos de texto, e-mail, lista, escolha e envio, com labels ligados corretamente e validação básica.",
        caminho: "HTML/html-formularios",
      },
      {
        titulo: "Projeto Final: Minha Página Completa em HTML Semântico",
        descricao: "Junte tudo em uma página com header, nav, main, section, article e footer, com lista, tabela, imagem, links e formulário.",
        caminho: "HTML/html-pagina-completa-semantica",
      },
    ],
  },
  {
    slug: "css",
    titulo: "CSS",
    descricao: "Estilo e layout de páginas web com CSS.",
    categoria: "programacao",
    sigla: "CSS",
    cor: "#264de4",
    materiais: [],
  },
  {
    slug: "angular",
    titulo: "Criando com Angular",
    descricao: "Aplicações web com o framework Angular.",
    categoria: "programacao",
    sigla: "AG",
    cor: "#c3002f",
    materiais: [],
  },
  {
    slug: "csharp",
    titulo: "C#",
    descricao: "Lógica e programação orientada a objetos com C#.",
    categoria: "programacao",
    sigla: "C#",
    cor: "#68217a",
    materiais: [],
  },
  {
    slug: "redes",
    titulo: "Redes",
    descricao: "Fundamentos de redes de computadores e cabeamento.",
    categoria: "informatica",
    sigla: "RD",
    cor: "#2563eb",
    materiais: [],
  },
  {
    slug: "internet-redes-sociais-apps",
    titulo: "Internet, Redes Sociais e Aplicativos",
    descricao: "Uso do navegador, redes sociais e aplicativos do dia a dia.",
    categoria: "informatica",
    sigla: "IR",
    cor: "#0ea5e9",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Internet — A Evolução da Internet e os Tipos de Acesso",
        descricao: "De onde a internet veio, qual a diferença entre internet e web e como cada tipo de conexão chega até você.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-evolucao-e-acesso",
      },
      {
        titulo: "Atividade Prática: Internet — A Internet e a Segurança da Informação",
        descricao: "Golpes, senhas fracas e links falsos são as principais portas de entrada de problemas.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-seguranca-da-informacao",
      },
      {
        titulo: "Atividade Prática: Internet — O Poder do seu E-mail",
        descricao: "O e-mail é a ferramenta de comunicação formal do trabalho.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-email-profissional",
      },
      {
        titulo: "Atividade Prática: Internet — Criando Formulários e Gerenciando Dados",
        descricao: "Formulários on-line coletam informações de muita gente de uma vez e as organizam em planilha.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-formularios-e-dados",
      },
      {
        titulo: "Atividade Prática: Internet — Tarefas, Reuniões e Videoconferências",
        descricao: "Organizar tarefas e conduzir reuniões on-line são rotinas do trabalho moderno.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-tarefas-reunioes-videoconferencia",
      },
      {
        titulo: "Atividade Prática: Internet — Ferramentas na Nuvem e Compartilhamento de Arquivos",
        descricao: "Documentos, planilhas e apresentações podem viver na nuvem e ser editados por várias pessoas ao mesmo tempo.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-nuvem-produtividade-e-arquivos",
      },
      {
        titulo: "Atividade Prática: Internet — Aplicativos para Dispositivos Móveis",
        descricao: "O celular virou ferramenta de trabalho.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-aplicativos-moveis",
      },
      {
        titulo: "Atividade Prática: Internet — Redes Sociais, Marketing Social Digital e Estratégia",
        descricao: "Redes sociais são canais de relacionamento e vendas.",
        caminho: "Internet Redes Sociais e Aplicativos/internet-redes-sociais-marketing-digital",
      },
    ],
  },
  {
    slug: "internet-outlook",
    titulo: "Internet e Outlook",
    descricao: "Navegação segura na internet e organização de e-mail no Outlook.",
    categoria: "informatica",
    sigla: "IO",
    cor: "#1a73e8",
    materiais: [],
    atividades: [
      {
        titulo: "Conhecendo o Outlook: Explorando a Ferramenta",
        descricao: "Reconheça as áreas da tela do Outlook, as pastas e a pesquisa, e aprenda a achar qualquer mensagem.",
        caminho: "Internet e Outlook/outlook-conhecendo-a-ferramenta",
      },
      {
        titulo: "Escrevendo e Enviando um E-mail Corporativo",
        descricao: "As partes de um e-mail profissional (Para, Cc, Cco, assunto, assinatura, anexo), o tom certo e o envio do primeiro e-mail.",
        caminho: "Internet e Outlook/outlook-escrevendo-email-corporativo",
      },
      {
        titulo: "Moldes de E-mails Administrativos",
        descricao: "Estrutura de 7 blocos e 6 moldes prontos: orçamento, documentos, cobrança cordial, comunicado, confirmação e esclarecimento.",
        caminho: "Internet e Outlook/outlook-moldes-emails-administrativos",
      },
      {
        titulo: "Assinatura, Resposta Automática e Regras no Outlook",
        descricao: "Crie a assinatura profissional, configure respostas automáticas de ausência e organize a caixa com pastas e regras.",
        caminho: "Internet e Outlook/outlook-assinatura-resposta-automatica-regras",
      },
      {
        titulo: "Convites de Reunião e Segurança no E-mail",
        descricao: "Envie convites de reunião com pauta e aprenda a reconhecer e-mails falsos (phishing).",
        caminho: "Internet e Outlook/outlook-convites-e-seguranca",
      },
    ],
  },
  {
    slug: "hardware-manutencao",
    titulo: "Hardware — Montagens e Manutenção",
    descricao: "Montagem, identificação de peças e manutenção de computadores.",
    categoria: "informatica",
    sigla: "HW",
    cor: "#52525b",
    materiais: [],
  },
  {
    slug: "manutencao-notebooks",
    titulo: "Manutenção de Notebooks",
    descricao: "Diagnóstico e manutenção básica de notebooks.",
    categoria: "informatica",
    sigla: "MN",
    cor: "#71717a",
    materiais: [],
  },
  {
    slug: "montagem-dispositivos-moveis",
    titulo: "Montagem de Dispositivos Móveis",
    descricao: "Peças, montagem e reparo básico de celulares e tablets.",
    categoria: "informatica",
    sigla: "MD",
    cor: "#78716c",
    materiais: [],
  },
  {
    slug: "escrita-fiscal",
    titulo: "Assistente de Escrita Fiscal",
    descricao: "Rotinas de documentos e obrigações fiscais da empresa.",
    categoria: "administrativa",
    sigla: "EF",
    cor: "#0f766e",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Escrita Fiscal — Sistema Tributário Brasileiro e o Código Tributário Nacional",
        descricao: "Um dia de trabalho no escritório de contabilidade: entender a natureza de cada tributo, localizar fato gerador, base de cálculo e alíquota e apurar o imposto de um mês inteiro de lançamentos.",
        caminho: "Escrita Fiscal/escrita-fiscal-sistema-tributario-e-cnt",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Regimes Opcionais de Tributação",
        descricao: "Um dia de trabalho de planejamento tributário: com o faturamento de 12 meses de uma empresa de serviços, comparar o Simples Nacional com o Lucro Presumido e recomendar o regime.",
        caminho: "Escrita Fiscal/escrita-fiscal-regimes-de-tributacao",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Impostos Municipais (ISS e IPTU)",
        descricao: "Um dia de trabalho com a rotina municipal: conferir as notas fiscais de serviço emitidas no mês, separar o ISS retido pelos clientes do ISS que a empresa recolhe e calcular o IPTU dos imóveis.",
        caminho: "Escrita Fiscal/escrita-fiscal-impostos-municipais",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Impostos Estaduais (ICMS e IPVA)",
        descricao: "Um dia de trabalho com o imposto estadual mais importante do comércio: apurar o ICMS do mês pela conta gráfica (débitos das vendas menos créditos das compras) e calcular o IPVA da frota.",
        caminho: "Escrita Fiscal/escrita-fiscal-impostos-estaduais",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Impostos Federais (PIS, COFINS, IRPJ e CSLL)",
        descricao: "Um dia de trabalho com a apuração federal de uma empresa no Lucro Real: PIS e COFINS não cumulativos do mês, com débito e crédito, e o IRPJ e a CSLL do ano.",
        caminho: "Escrita Fiscal/escrita-fiscal-impostos-federais",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Nota Fiscal Eletrônica de Serviço e Conhecimento de Transporte Eletrônico (CT-e)",
        descricao: "Um dia de trabalho com dois documentos eletrônicos: o CT-e de uma transportadora, com frete e ICMS por conhecimento, e a NFS-e de um prestador de serviços com retenções na fonte.",
        caminho: "Escrita Fiscal/escrita-fiscal-nfse-e-cte",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Habilitando e Emitindo NF-e e Escrituração dos Livros Fiscais",
        descricao: "Um dia de trabalho com a nota fiscal eletrônica: montar o total de uma NF-e de venda com descontos e frete e escriturar o Livro de Registro de Saídas, conferindo os totais por CFOP.",
        caminho: "Escrita Fiscal/escrita-fiscal-nfe-e-livros-fiscais",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Fundamentos de Contabilidade, Escrituração, Obrigações Tributárias e Parcelamento de Débitos",
        descricao: "Um dia de trabalho de fechamento: conferir um balancete de verificação, achar uma diferença de lançamento e simular o parcelamento de um débito tributário.",
        caminho: "Escrita Fiscal/escrita-fiscal-contabilidade-e-parcelamento",
      },
      {
        titulo: "Atividade Prática: Escrita Fiscal — Simples Nacional: Alíquota Efetiva e Imposto do Mês na Planilha",
        descricao: "Monte numa planilha a consulta do Simples Nacional: ache a faixa pela receita de 12 meses, calcule a alíquota efetiva e o imposto do mês nos Anexos I, II e III, com passo a passo ilustrado.",
        caminho: "Escrita Fiscal/escrita-fiscal-simples-nacional-aliquota-efetiva",
      },
    ],
  },
  {
    slug: "contabilidade",
    titulo: "Contabilidade",
    descricao: "Lançamentos, balanços e rotina contábil básica.",
    categoria: "administrativa",
    sigla: "CT",
    cor: "#166534",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Contabilidade — Plano de Contas: Conta Sintética ou Analítica",
        descricao: "Na planilha, classifique as 108 contas de um plano de contas como sintéticas ou analíticas e confira o placar. Passo a passo ilustrado.",
        caminho: "Contabilidade/contabilidade-plano-de-contas",
      },
      {
        titulo: "Atividade Prática: Contabilidade — Lançamentos na Planilha: Compra e Venda da Walking Pet",
        descricao: "Débito e crédito na prática: sete lançamentos de uma compra e duas vendas, com saldos calculados pela própria planilha. Passo a passo ilustrado.",
        caminho: "Contabilidade/contabilidade-lancamentos-compra-e-venda",
      },
      {
        titulo: "Atividade Prática: Contabilidade — Lançamentos na Planilha: Imposto, Fornecedor e Cheque Especial",
        descricao: "ICMS a pagar, pagamento ao fornecedor, cheque especial, venda de 80 kits e juros: nove lançamentos novos sobre os da aula anterior. Passo a passo ilustrado.",
        caminho: "Contabilidade/contabilidade-lancamentos-impostos-e-emprestimo",
      },
      {
        titulo: "Atividade Prática: Contabilidade — Montando o Balanço Patrimonial e a DRE da Walking Pet",
        descricao: "Ligue os saldos dos lançamentos ao modelo de Balanço e DRE com fórmulas entre abas e confira se Ativo e Passivo fecham. Passo a passo ilustrado.",
        caminho: "Contabilidade/contabilidade-balanco-e-dre",
      },
      {
        titulo: "Atividade Prática: Contabilidade — Contabilidade Completa de uma Empresa Nova (Banho e Tosa)",
        descricao: "Prática livre: 13 fatos do primeiro mês de uma empresa nova, do capital dos sócios ao pagamento do fornecedor, lançados na planilha por você. Passo a passo ilustrado.",
        caminho: "Contabilidade/contabilidade-pratica-livre-banho-e-tosa",
      },
    ],
  },
  {
    slug: "gestao-projetos",
    titulo: "Ferramentas para Gestão de Projetos",
    descricao: "Planejamento, cronograma e acompanhamento de projetos.",
    categoria: "administrativa",
    sigla: "GP",
    cor: "#1d4ed8",
    materiais: [],
  },
  {
    slug: "atendimento-cliente",
    titulo: "Atendimento ao Cliente",
    descricao: "Comunicação, postura e resolução de problemas no atendimento.",
    categoria: "administrativa",
    sigla: "AC",
    cor: "#f59e0b",
    materiais: [],
  },
  {
    slug: "telemarketing",
    titulo: "Operador de Telemarketing",
    descricao: "Técnicas de abordagem e atendimento por telefone.",
    categoria: "administrativa",
    sigla: "TM",
    cor: "#ea580c",
    materiais: [],
  },
  {
    slug: "compras-estoque",
    titulo: "Compras e Estoque",
    descricao: "Cotação, requisição de compras e controle de estoque.",
    categoria: "administrativa",
    sigla: "CE",
    cor: "#0369a1",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Compras e Estoque — Conceitos de Estoque",
        descricao: "Um dia de trabalho no almoxarifado: avaliar o estoque de 30 itens, achar quais já passaram do ponto de pedido e calcular quanto custa repô-los.",
        caminho: "Compras e Estoque/compras-conceitos-de-estoque",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Gestão de Compras no Setor Privado",
        descricao: "Um dia de trabalho no setor de compras de uma empresa privada: organizar as requisições do mês pela política de alçadas e entender como o ciclo de compras funciona.",
        caminho: "Compras e Estoque/compras-gestao-setor-privado",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Gestão de Compras no Setor Público",
        descricao: "Um dia de trabalho na área de licitações de um órgão público: conferir o resultado de um pregão com 12 itens, calcular a economia obtida e identificar lances acima do valor estimado.",
        caminho: "Compras e Estoque/compras-gestao-setor-publico",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Cotação Profissional",
        descricao: "Um dia de trabalho do comprador: montar o mapa de cotação de 12 itens com 4 fornecedores, somar o frete e decidir entre comprar tudo de um só fornecedor ou dividir o pedido.",
        caminho: "Compras e Estoque/compras-cotacao-profissional",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Controle de Estoque",
        descricao: "Um dia de trabalho de inventário: comparar o saldo do sistema com a contagem física de 28 itens, medir a acuracidade e valorizar as sobras e faltas.",
        caminho: "Compras e Estoque/compras-controle-de-estoque",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Classificação ABC dos Materiais",
        descricao: "Um dia de trabalho de priorização: classificar 30 materiais pela curva ABC, descobrir quais poucos itens concentram a maior parte do dinheiro e decidir onde colocar o esforço de controle.",
        caminho: "Compras e Estoque/compras-curva-abc",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Movimentação de Materiais, Armazenagem e Recebimento",
        descricao: "Um dia de trabalho na doca de recebimento: conferir a nota fiscal, o pedido e a contagem física de 18 itens, calcular o que pode ser aceito e planejar a ocupação das posições de armazenagem.",
        caminho: "Compras e Estoque/compras-recebimento-e-armazenagem",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Separação de Materiais, Informática no Estoque e Introdução à Gestão da Qualidade",
        descricao: "Um dia de trabalho de expedição: medir a produtividade da separação de 24 pedidos, calcular o indicador OTIF e a taxa de erro e propor melhorias com apoio do sistema de gestão de estoque.",
        caminho: "Compras e Estoque/compras-separacao-informatica-e-qualidade",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Configurando a Planilha de Controle de Estoque",
        descricao: "Você monta a planilha que o almoxarifado vai usar: baixa o arquivo com 60 itens e configura valor em estoque, alerta de reposição, lista de tipos, formatação condicional, busca por código (PROCV), saldo com SOMASES e proteção.",
        caminho: "Compras e Estoque/compras-planilha-estoque-configurar",
      },
      {
        titulo: "Atividade Prática: Compras e Estoque — Preenchendo a Planilha de Estoque Já Configurada",
        descricao: "Você baixa a planilha pronta e lança 89 documentos de setembro, com código errado, documento repetido, venda sem saldo e desconto acima da alçada, e fecha o mês: receita, descontos, perdas e estoque final.",
        caminho: "Compras e Estoque/compras-planilha-estoque-preencher",
      },
    ],
  },
  {
    slug: "assistente-administracao-financeira",
    titulo: "Assistente de Administração Financeira",
    descricao: "Contas a pagar e receber, fluxo de caixa e conciliação.",
    categoria: "administrativa",
    sigla: "AF",
    cor: "#15803d",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Administração Financeira — História e o Papel do Assistente Financeiro",
        descricao: "Como a administração financeira nasceu e mudou, o que ela faz dentro de uma empresa e onde o assistente financeiro se encaixa.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-papel-e-evolucao",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Construindo Planilhas Orçamentárias",
        descricao: "O orçamento é a previsão de receitas e despesas de um período.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-planilhas-orcamentarias",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Calculando Porcentagem",
        descricao: "A porcentagem aparece em descontos, comissões, impostos e margens.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-porcentagem",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Juros e Sistemas de Capitalização",
        descricao: "Juros são o preço do dinheiro no tempo.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-juros-capitalizacao",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Contas a Pagar e a Receber",
        descricao: "O dia a dia do assistente financeiro gira em torno do que a empresa deve pagar e do que tem a receber.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-contas-pagar-receber",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Conciliação Bancária e Fatura de Cartão",
        descricao: "Conciliar é conferir se o controle interno da empresa bate com o extrato do banco e com a fatura do cartão.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-conciliacao-bancaria-cartao",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Antecipação de Recebíveis, Factoring e Banco",
        descricao: "Antecipar recebíveis transforma uma venda a prazo em dinheiro hoje, mas com um custo.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-antecipacao-recebiveis",
      },
      {
        titulo: "Atividade Prática: Administração Financeira — Empréstimos, Financiamentos e Segurança da Informação",
        descricao: "Entenda a diferença entre empréstimo e financiamento, calcule as primeiras parcelas de um financiamento pelo sistema SAC e veja os cuidados de segurança em operações financeiras.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-emprestimos-seguranca",
      },
      {
        titulo: "Atividade Prática: Assistente Financeiro — Configurando a Planilha de Fluxo de Caixa",
        descricao: "Você baixa os recebimentos e pagamentos previstos para outubro e monta o saldo acumulado, o alerta de saldo negativo, a lista de categorias, os totais por categoria e os indicadores do pior momento do mês.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-planilha-fluxo-caixa-configurar",
      },
      {
        titulo: "Atividade Prática: Assistente Financeiro — Conciliação Bancária na Planilha Já Configurada",
        descricao: "Você baixa a planilha pronta, lança o extrato de setembro e encontra tarifa não lançada, cheque não compensado, depósito em trânsito, valor digitado errado e lançamento em duplicidade até a conciliação fechar.",
        caminho: "Assistente de Administração Financeira/assistente-financeiro-planilha-conciliacao-preencher",
      },
    ],
  },
  {
    slug: "comunicacao-oratoria",
    titulo: "Comunicação e Oratória",
    descricao: "Fala em público, clareza e postura na comunicação.",
    categoria: "administrativa",
    sigla: "CO",
    cor: "#be185d",
    materiais: [],
  },
  {
    slug: "custos",
    titulo: "Custos",
    descricao: "Custo fixo, variável, margem e formação de preço.",
    categoria: "administrativa",
    sigla: "CU",
    cor: "#92400e",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Custos — Noções sobre a Contabilidade de Custos",
        descricao: "Antes de calcular, é preciso falar a mesma língua: gasto, custo, despesa, investimento e perda não são sinônimos.",
        caminho: "Custos/custos-nocoes-contabilidade",
      },
      {
        titulo: "Atividade Prática: Custos — Comportamento dos Custos de Produção",
        descricao: "Alguns custos não mudam quando a produção cresce; outros crescem junto.",
        caminho: "Custos/custos-comportamento-fixos-variaveis",
      },
      {
        titulo: "Atividade Prática: Custos — Rateio dos Custos de Produção",
        descricao: "Custos indiretos servem a vários produtos ao mesmo tempo.",
        caminho: "Custos/custos-rateio-custos-de-producao",
      },
      {
        titulo: "Atividade Prática: Custos — Sistemas de Custeio Padrão e Ideal",
        descricao: "O custo padrão é a meta de quanto cada unidade deveria custar.",
        caminho: "Custos/custos-padrao-e-ideal",
      },
      {
        titulo: "Atividade Prática: Custos — Sistemas por Centros de Custos e Custeio ABC",
        descricao: "Os centros de custos agrupam gastos por departamento.",
        caminho: "Custos/custos-centros-e-abc",
      },
      {
        titulo: "Atividade Prática: Custos — Alavancagem Operacional e Financeira",
        descricao: "Alavancagem mostra o quanto uma variação nas vendas é ampliada no lucro.",
        caminho: "Custos/custos-alavancagem-operacional-financeira",
      },
      {
        titulo: "Atividade Prática: Custos — Análise Custo, Volume e Lucro e Avaliação de Estoques com Inflação",
        descricao: "Descubra quantas unidades é preciso vender para não ter prejuízo e veja como o método de avaliar estoques muda o custo e o lucro quando os preços sobem.",
        caminho: "Custos/custos-volume-lucro-e-estoques",
      },
      {
        titulo: "Atividade Prática: Custos — Preço de Venda por Markup e Demonstração de Resultados",
        descricao: "Formar o preço de venda é cobrir o custo, os tributos, as comissões e ainda deixar o lucro desejado.",
        caminho: "Custos/custos-preco-de-venda-markup-resultados",
      },
    ],
  },
  {
    slug: "marketing-pessoal",
    titulo: "Marketing Pessoal",
    descricao: "Construção de imagem e reputação profissional.",
    categoria: "marketing",
    sigla: "MP",
    cor: "#fb923c",
    materiais: [],
  },
  {
    slug: "propaganda-marketing",
    titulo: "Assistente de Propaganda e Marketing",
    descricao: "Campanhas, peças publicitárias e divulgação de marca.",
    categoria: "marketing",
    sigla: "PM",
    cor: "#fb7185",
    materiais: [],
  },
  {
    slug: "farmacia",
    titulo: "Atendente de Farmácia",
    descricao: "Atendimento, organização e rotinas de uma farmácia.",
    categoria: "saude",
    sigla: "FA",
    cor: "#dc2626",
    materiais: [],
  },
  {
    slug: "saude-bucal",
    titulo: "Assistente de Saúde Bucal",
    descricao: "Apoio à rotina de um consultório odontológico.",
    categoria: "saude",
    sigla: "SB",
    cor: "#0891b2",
    materiais: [],
  },
  {
    slug: "auxiliar-medico",
    titulo: "Auxiliar Médico",
    descricao: "Apoio a consultas, prontuários e rotina de consultório.",
    categoria: "saude",
    sigla: "AM",
    cor: "#0d9488",
    materiais: [],
  },
  {
    slug: "recepcionista-saude",
    titulo: "Recepcionista de Serviços de Saúde",
    descricao: "Agendamento, recepção e atendimento em serviços de saúde.",
    categoria: "saude",
    sigla: "RS",
    cor: "#e11d48",
    materiais: [],
  },
  {
    slug: "educacao-financeira",
    titulo: "Educação Financeira",
    descricao: "Organização do orçamento pessoal e planejamento financeiro.",
    categoria: "comportamental",
    sigla: "EDF",
    cor: "#0e7490",
    materiais: [],
  },
  {
    slug: "inteligencia-emocional",
    titulo: "Inteligência Emocional",
    descricao: "Autoconhecimento e gestão de emoções no trabalho.",
    categoria: "comportamental",
    sigla: "IE",
    cor: "#7c3aed",
    materiais: [],
  },
  {
    slug: "lideranca",
    titulo: "Liderança",
    descricao: "Fundamentos de liderança e gestão de equipes.",
    categoria: "comportamental",
    sigla: "LD",
    cor: "#b45309",
    materiais: [],
  },
  {
    slug: "matematica-financeira",
    titulo: "Matemática Financeira",
    descricao: "Juros, porcentagem e cálculos financeiros do dia a dia.",
    categoria: "comportamental",
    sigla: "MF",
    cor: "#4338ca",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Matemática Financeira — Proporcionalidade e Grandezas Proporcionais",
        descricao: "Regra de três e divisão proporcional estão por trás de preços, cotações e rateio de lucros.",
        caminho: "Matemática Financeira/matematica-financeira-proporcionalidade",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Porcentagem e Potenciação",
        descricao: "Porcentagens sucessivas e potências são a ponte para os juros compostos.",
        caminho: "Matemática Financeira/matematica-financeira-porcentagem-potenciacao",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Operações Mercantis",
        descricao: "Comprar e vender gera lucro ou prejuízo.",
        caminho: "Matemática Financeira/matematica-financeira-operacoes-mercantis",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Juros Simples",
        descricao: "No regime de juros simples, a taxa incide sempre sobre o capital inicial.",
        caminho: "Matemática Financeira/matematica-financeira-juros-simples",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Juros Compostos",
        descricao: "Nos juros compostos, os juros de cada período entram na base do período seguinte.",
        caminho: "Matemática Financeira/matematica-financeira-juros-compostos",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Taxas de Juros Efetivas e Equivalentes",
        descricao: "Taxas anunciadas em um período podem não ser as taxas reais de outro.",
        caminho: "Matemática Financeira/matematica-financeira-taxas-efetivas-equivalentes",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Taxas de Inflação e Correção Monetária",
        descricao: "A inflação reduz o poder de compra do dinheiro.",
        caminho: "Matemática Financeira/matematica-financeira-inflacao-correcao-monetaria",
      },
      {
        titulo: "Atividade Prática: Matemática Financeira — Investimentos, Fluxo de Caixa, VPL, TIR e Payback",
        descricao: "Para decidir se um investimento vale a pena, a empresa projeta o fluxo de caixa e o traz a valor presente.",
        caminho: "Matemática Financeira/matematica-financeira-investimentos-fluxo-de-caixa",
      },
    ],
  },
  {
    slug: "empreendedorismo",
    titulo: "Empreendedorismo",
    descricao: "Plano de negócio e primeiros passos para empreender.",
    categoria: "comportamental",
    sigla: "EM",
    cor: "#a16207",
    materiais: [],
  },
  {
    slug: "google-adwords",
    titulo: "Google Adwords",
    descricao: "Campanhas de anúncios e links patrocinados no Google Ads.",
    categoria: "marketing",
    sigla: "GA",
    cor: "#34a853",
    materiais: [],
    atividades: [
      {
        titulo: "Atividade Prática: Google Ads — Entrando no Mundo do AdWords: Estrutura e Planejamento",
        descricao: "O Google Ads (antigo AdWords) coloca anúncios diante de quem está procurando o que você vende.",
        caminho: "Google Adwords/adwords-estrutura-e-planejamento",
      },
      {
        titulo: "Atividade Prática: Google Ads — Iniciando a Primeira Campanha",
        descricao: "Criar a primeira campanha é decidir o objetivo, a rede, o local, o orçamento e como o lance será feito.",
        caminho: "Google Adwords/adwords-primeira-campanha",
      },
      {
        titulo: "Atividade Prática: Google Ads — Cliques Qualificados e Análise das Métricas",
        descricao: "Não basta ter cliques: é preciso ter cliques de quem realmente pode comprar.",
        caminho: "Google Adwords/adwords-metricas-e-cliques-qualificados",
      },
      {
        titulo: "Atividade Prática: Google Ads — Locais, Palavras-chave e Investimento",
        descricao: "Melhorar o desempenho é mostrar o anúncio ao público certo, com as palavras certas, ajustando o dinheiro para onde ele dá mais resultado.",
        caminho: "Google Adwords/adwords-locais-palavras-chave-investimento",
      },
      {
        titulo: "Atividade Prática: Google Ads — Grupos de Anúncios, Status e Tipos de Correspondência",
        descricao: "Grupos de anúncios bem organizados, anúncios aprovados e o tipo de correspondência certo definem quem vê o seu anúncio e quanto isso custa.",
        caminho: "Google Adwords/adwords-grupos-anuncios-correspondencia",
      },
      {
        titulo: "Atividade Prática: Google Ads — Extensões de Anúncio e Sitelinks",
        descricao: "Extensões acrescentam informação ao anúncio — telefone, endereço, links extras — sem custo adicional por si só.",
        caminho: "Google Adwords/adwords-extensoes-de-anuncio",
      },
      {
        titulo: "Atividade Prática: Google Ads — Trabalhando com a Rede de Display e as Intenções",
        descricao: "A Rede de Display mostra anúncios visuais em milhões de sites e aplicativos.",
        caminho: "Google Adwords/adwords-rede-de-display-e-intencoes",
      },
      {
        titulo: "Atividade Prática: Google Ads — Criando uma Campanha de Sucesso e Analisando os Resultados",
        descricao: "Uma campanha de sucesso é a que traz retorno acima do investimento.",
        caminho: "Google Adwords/adwords-campanha-de-sucesso-resultados",
      },
    ],
  },
];

export function acharCurso(slug: string): Curso | undefined {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
