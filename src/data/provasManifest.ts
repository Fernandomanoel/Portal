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
      rotulo: "Avaliação — Múltipla Escolha",
      caminho: "Atendimento ao Cliente/avaliacao-multipla-escolha",
      tamanho: "8 questões",
    },
    {
      tipo: "quiz",
      rotulo: "Avaliação — Descritiva",
      caminho: "Atendimento ao Cliente/avaliacao-descritiva",
      tamanho: "2 questões",
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
      rotulo: "Avaliação — Múltipla Escolha",
      caminho: "Gestão de Pessoas/avaliacao-multipla-escolha",
      tamanho: "8 questões",
    },
    {
      tipo: "quiz",
      rotulo: "Avaliação — Descritiva",
      caminho: "Gestão de Pessoas/avaliacao-descritiva",
      tamanho: "2 questões",
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
      rotulo: "Avaliação — Múltipla Escolha",
      caminho: "Vendas/avaliacao-multipla-escolha",
      tamanho: "8 questões",
    },
    {
      tipo: "quiz",
      rotulo: "Avaliação — Descritiva",
      caminho: "Vendas/avaliacao-descritiva",
      tamanho: "2 questões",
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
      "Assistente ADM",
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
