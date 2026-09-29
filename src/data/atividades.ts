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
    materiais: [
      {
        titulo: "Atividade interativa (Genially)",
        descricao: "Atividade extra interativa, aberta direto no navegador.",
        tipo: "link",
        url: "https://view.genially.com/6939df52cb698f4dbb4d8e35",
      },
    ],
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
  },
  {
    slug: "internet-outlook",
    titulo: "Internet e Outlook",
    descricao: "Navegação segura na internet e organização de e-mail no Outlook.",
    categoria: "informatica",
    sigla: "IO",
    cor: "#1a73e8",
    materiais: [],
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
  },
  {
    slug: "contabilidade",
    titulo: "Contabilidade",
    descricao: "Lançamentos, balanços e rotina contábil básica.",
    categoria: "administrativa",
    sigla: "CT",
    cor: "#166534",
    materiais: [],
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
  },
  {
    slug: "assistente-administracao-financeira",
    titulo: "Assistente de Administração Financeira",
    descricao: "Contas a pagar e receber, fluxo de caixa e conciliação.",
    categoria: "administrativa",
    sigla: "AF",
    cor: "#15803d",
    materiais: [],
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
  },
];

export function acharCurso(slug: string): Curso | undefined {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
