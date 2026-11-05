import type { CategoriaProva, ManifestoProvas } from "@/types/prova";

/**
 * Índice das provas. As categorias e os cursos já refletem a grade real de
 * provas do instrutor; curso sem entrada aqui aparece na lista com "Em
 * breve" até a prova chegar. Cada entrada aponta para um `.prova.ts` em
 * `src/data/provasInterativas/` — ver COMO-CRIAR-PROVA.md lá dentro.
 *
 * Os nomes de curso aqui (chaves deste objeto e itens de
 * `PROVAS_CATEGORIAS`) são mantidos iguais ao `titulo` do curso
 * correspondente em `src/data/atividades.ts`, para as duas telas falarem
 * do mesmo curso com o mesmo nome. Cursos sem equivalente em Atividades
 * (ex.: grade antiga do instrutor) continuam como estavam.
 */
export const PROVAS_MANIFEST: ManifestoProvas = {
  "Windows 11": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Ferramentas e Sistema",
      caminho: "Windows 11/ferramentas-e-sistema",
      tamanho: "6 tarefas",
    },
    {
      tipo: "quiz",
      rotulo: "Avaliação Completa",
      caminho: "Windows 11/avaliacao-completa",
      tamanho: "7 tarefas",
    },
  ],
  "Word": [
    {
      tipo: "quiz",
      rotulo: "avaliacao A",
      caminho: "Word/avaliacao-peso2",
      tamanho: "10 tarefas",
    },
    {
      tipo: "quiz",
      rotulo: "avaliacao B",
      caminho: "Word/avaliacao-word-peso1",
      tamanho: "10 tarefas",
    },
  ],

  "Excel Básico": [
    {
      tipo: "quiz",
      rotulo: "Prova Básica - Boletim Escolar",
      caminho: "Excel/av-excel-1",
      tamanho: "11 tarefas",
    },
    {
      tipo: "quiz",
      rotulo: "Prova Básica - Compras do mês",
      caminho: "Excel/av-excel-2",
      tamanho: "8 tarefas",
    },
  ],
  "Excel Avançado I": [
    {
      tipo: "quiz",
      rotulo: "Tabela Dinâmica e Dashboard",
      caminho: "Excel Avançado I/avaliacao-tabela-dinamica-dashboard",
      tamanho: "5 passos",
    },
    {
      tipo: "quiz",
      rotulo: "Excel Essencial",
      caminho: "Excel Avançado I/avaliacao-excel-essencial",
      tamanho: "5 questões",
    },
  ],
  "Excel Avançado II": [
    {
      tipo: "quiz",
      rotulo: "Criação de Macro VBA",
      caminho: "Excel Avançado II/avaliacao-macro-vba",
      tamanho: "5 passos",
    },
  ],
  "Internet e Outlook": [
    {
      tipo: "quiz",
      rotulo: "Pesquisa, Word e E-mail com Assinatura",
      caminho: "Internet e Outlook/avaliacao-internet-e-outlook",
      tamanho: "8 passos",
    },
  ],
  "Internet, Redes Sociais e Aplicativos": [
    {
      tipo: "quiz",
      rotulo: "Linha do Tempo das Redes Sociais",
      caminho: "Internet, Redes Sociais e Aplicativos/avaliacao-historiador-digital",
      tamanho: "7 passos",
    },
    {
      tipo: "quiz",
      rotulo: "Guia de Uso Consciente",
      caminho: "Internet, Redes Sociais e Aplicativos/avaliacao-cotidiano-digital",
      tamanho: "5 passos",
    },
  ],
  "Introdução à Informática": [
    {
      tipo: "quiz",
      rotulo: "Pacote Office",
      caminho: "Introdução à Informática/avaliacao-pacote-office",
      tamanho: "7 passos",
    },
  ],
  "Power BI": [
    {
      tipo: "quiz",
      rotulo: "Relatório de Vendas",
      caminho: "Power BI/avaliacao-vendas",
      tamanho: "5 passos",
    },
    {
      tipo: "quiz",
      rotulo: "Dados de Funcionários",
      caminho: "Power BI/avaliacao-funcionarios",
      tamanho: "4 passos",
    },
  ],
  "Segurança na Era Digital": [
    {
      tipo: "quiz",
      rotulo: "LGPD",
      caminho: "Segurança na Era Digital/atividade-lgpd",
      tamanho: "4 passos",
    },
  ],
  "Google Adwords": [
    {
      tipo: "quiz",
      rotulo: "Google Ads e Marketing de Busca",
      caminho: "Google Adwords/avaliacao-google-ads-marketing-busca",
      tamanho: "10 módulos",
    },
    {
      tipo: "quiz",
      rotulo: "Atividade Prática — Google Adwords",
      caminho: "Google Adwords/atividade-pratica-google-adwords",
      tamanho: "6 questões",
    },
    {
      tipo: "quiz",
      rotulo: "Simulação de Campanha",
      caminho: "Google Adwords/simulacao-de-campanha",
      tamanho: "5 passos",
    },
  ],
  "Inteligência Artificial": [
    {
      tipo: "quiz",
      rotulo: "Engenharia de Prompts e LLMs",
      caminho: "Inteligência Artificial/avaliacao-ia-engenharia-prompts-llms",
      tamanho: "10 módulos",
    },
  ],
  "Javascript": [
    {
      tipo: "quiz",
      rotulo: "Prova de JavaScript — correção automática",
      caminho: "JavaScript/prova-javascript-testes-automatizados",
      tamanho: "8 questões de código",
    },
  ],
  "Auxiliar Médico": [
    {
      tipo: "quiz",
      rotulo: "Um Dia na Clínica",
      caminho: "Auxiliar Médico/prova-auxiliar-medico",
      tamanho: "10 questões",
    },
  ],
  "HTML": [
    {
      tipo: "quiz",
      rotulo: "Avaliação Prática de HTML",
      caminho: "HTML/avaliacao-pratica-html",
      tamanho: "10 questões de código",
    },
  ],
  "CSS": [
    {
      tipo: "quiz",
      rotulo: "Avaliação Prática de CSS",
      caminho: "CSS/avaliacao-pratica-css",
      tamanho: "10 questões de código",
    },
  ],
  "Banco de Dados | SQL": [
    {
      tipo: "quiz",
      rotulo: "Controle de Biblioteca",
      caminho: "Banco de Dados/avaliacao-controle-de-biblioteca",
      tamanho: "5 passos de SQL",
    },
  ],
  "Lógica de Programação": [
    {
      tipo: "quiz",
      rotulo: "Avaliação Prática de Lógica",
      caminho: "Lógica de Programação/avaliacao-pratica-logica",
      tamanho: "9 questões",
    },
  ],
  "C#": [
    {
      tipo: "quiz",
      rotulo: "Prova de C# — correção automática",
      caminho: "CSharp/prova-csharp-correcao-automatica",
      tamanho: "10 questões",
    },
  ],
  "Python": [
    {
      tipo: "quiz",
      rotulo: "Prova de Python — correção automática",
      caminho: "Python/prova-python-testes-automatizados",
      tamanho: "8 questões de código",
    },
  ],
  "Marketing Digital": [
    {
      tipo: "quiz",
      rotulo: "Prova de Marketing Digital — post e campanha",
      caminho: "Marketing Digital/prova-marketing-digital-post-e-campanha",
      tamanho: "9 questões + prática com post no Canva",
    },
  ],
  "Matemática Financeira": [
    {
      tipo: "quiz",
      rotulo: "Avaliação A — nível normal",
      caminho: "Matemática Financeira/avaliacao-a",
      tamanho: "10 questões",
    },
    {
      tipo: "quiz",
      rotulo: "Avaliação B — nível básico",
      caminho: "Matemática Financeira/avaliacao-b",
      tamanho: "10 questões",
    },
  ],
  "Educação Financeira": [
    {
      tipo: "quiz",
      rotulo: "Meu Orçamento — prática",
      caminho: "Educação Financeira/avaliacao-pratica-meu-orcamento",
      tamanho: "6 passos",
    },
  ],
  "Assistente de Administração Financeira": [
    {
      tipo: "quiz",
      rotulo: "Rotinas do Setor Financeiro",
      caminho: "Assistente de Administração Financeira/avaliacao-rotinas-financeiras",
      tamanho: "10 situações",
    },
  ],
  "Contabilidade": [
    {
      tipo: "quiz",
      rotulo: "Notas Fiscais e Lançamentos",
      caminho: "Contabilidade/avaliacao-notas-fiscais",
      tamanho: "10 questões",
    },
  ],
  "Segurança do Trabalho": [
    {
      tipo: "quiz",
      rotulo: "Situações do Dia a Dia",
      caminho: "Segurança do Trabalho/avaliacao-pratica-situacoes",
      tamanho: "10 situações",
    },
  ],
  "PowerPoint": [
    {
      tipo: "quiz",
      rotulo: "Avaliação A — tema livre",
      caminho: "PowerPoint/avaliacao-a",
      tamanho: "10 passos",
    },
    {
      tipo: "quiz",
      rotulo: "Avaliação B — apresentação simples",
      caminho: "PowerPoint/avaliacao-b",
      tamanho: "6 passos",
    },
  ],
  "Administração": [
    {
      tipo: "quiz",
      rotulo: "Prova de Administração",
      caminho: "ADM/prova-administracao",
      tamanho: "10 questões",
    },
  ],
  "Departamento Pessoal": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Departamento Pessoal",
      caminho: "Assistente de Departamento Pessoal/avaliacao-dp",
      tamanho: "10 questões",
    },
  ],
  "Assistente de Gestão": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Logística",
      caminho: "Assistente de Logística/avaliacao-logistica",
      tamanho: "10 questões",
    },
  ],
  "Atendimento ao Cliente": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Atendimento ao Cliente",
      caminho: "Atendimento ao Cliente/avaliacao-completa",
      tamanho: "12 questões",
    },
  ],
  "Compras e Estoque": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Compras e Estoque",
      caminho: "Compras e Estoque/avaliacao-compras-e-estoque",
      tamanho: "10 questões",
    },
  ],
  "Crédito e Cobrança": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Crédito e Cobrança",
      caminho: "Crédito e Cobrança/avaliacao-credito-e-cobranca",
      tamanho: "10 questões",
    },
  ],
  "Custos": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Custos",
      caminho: "Custos/avaliacao-custos",
      tamanho: "10 questões",
    },
  ],
  "Assistente de Escrita Fiscal": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Escrita Fiscal e Contabilidade",
      caminho: "Escrita Fiscal e Contabilidade/avaliacao-escrita-fiscal",
      tamanho: "10 questões",
    },
  ],
  "Gestão de Pessoas": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Gestão de Pessoas",
      caminho: "Gestão de Pessoas/avaliacao-completa",
      tamanho: "12 questões",
    },
  ],
  "Operador de Telemarketing": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Operador de Telemarketing",
      caminho: "Operador de Telemarketing/avaliacao-operador-de-telemarketing",
      tamanho: "10 questões",
    },
  ],
  "Recursos Humanos": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Recursos Humanos",
      caminho: "RH/avaliacao-recursos-humanos",
      tamanho: "10 questões",
    },
  ],
  "Secretariado": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Secretariado",
      caminho: "Secretariado/avaliacao-secretariado",
      tamanho: "10 questões",
    },
  ],
  "Vendas": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Vendas",
      caminho: "Vendas/avaliacao-completa",
      tamanho: "12 questões",
    },
  ],
}; // <-- O objeto PROVAS_MANIFEST é fechado aqui.

export const PROVAS_CATEGORIAS: CategoriaProva[] = [
  {
    nome: "Informática",
    cursos: [
      "Excel Básico",
      "Excel Avançado I",
      "Excel Avançado II",
      "Hardware — Montagens e Manutenção",
      "Internet e Outlook",
      "Internet, Redes Sociais e Aplicativos",
      "Introdução à Informática",
      "KIDS",
      "Manutenção de Computadores",
      "Manutenção de Notebooks",
      "Montagem de Dispositivos Móveis",
      "Power BI",
      "PowerPoint",
      "Redes",
      "Segurança na Era Digital",
      "Windows 11",
      "Word",
    ],
  },
  {
    nome: "Administrativo e Gestão",
    cursos: [
      "Administração",
      "Assistente de Administração Financeira",
      "Assistente de Escrita Fiscal",
      "Assistente de Gestão",
      "Atendimento ao Cliente",
      "Comunicação e Oratória",
      "Compras e Estoque",
      "Contabilidade",
      "Crédito e Cobrança",
      "Custos",
      "Departamento Pessoal",
      "Ferramentas para Gestão de Projetos",
      "Gestão de Pessoas",
      "Marketing",
      "Operador de Caixa",
      "Operador de Telemarketing",
      "Recursos Humanos",
      "Secretariado",
      "Segurança do Trabalho",
      "Vendas",
    ],
  },
  {
    nome: "Design Gráfico",
    cursos: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe Premiere",
      "After Effects",
      "Canva",
      "CorelDraw",
      "Design Gráfico",
      "Figma",
      "Premiere",
    ],
  },
  {
    nome: "Desenvolvimento Web e Mobile",
    cursos: [
      "Apps Mobile com Ionic e Cordova",
      "Cordova",
      "Criando Aplicativos Mobile Ionic",
      "Criando com Angular",
      "Criando seu Site",
      "CSS",
      "Desenvolvimento WEB - Html, CSS e JavaScript",
      "Fundamentos Web",
      "HTML",
      "Javascript",
      "WordPress",
    ],
  },
  {
    nome: "Programação e Dados",
    cursos: ["Análise de Dados", "Banco de Dados | SQL", "C#", "Inteligência Artificial", "Lógica de Programação", "Python"],
  },
  {
    nome: "Marketing",
    cursos: ["Assistente de Propaganda e Marketing", "Google Adwords", "Marketing Digital", "Marketing Pessoal"],
  },
  {
    nome: "Saúde",
    cursos: ["Assistente de Saúde Bucal", "Atendente de Farmácia", "Auxiliar Médico", "Recepcionista de Serviços de Saúde"],
  },
  {
    nome: "Comportamental",
    cursos: [
      "Educação Financeira",
      "Empreendedorismo",
      "Inteligência Emocional",
      "Liderança",
      "Matemática Financeira",
    ],
  },
  {
    nome: "Games",
    cursos: ["Desenvolvimento de Games"],
  },
];
