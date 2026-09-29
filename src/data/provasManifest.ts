import type { CategoriaProva, ManifestoProvas } from "@/types/prova";

/**
 * Índice das provas. As categorias e os cursos já refletem a grade real de
 * provas do instrutor; curso sem entrada aqui aparece na lista com "Em
 * breve" até a prova chegar. Cada entrada aponta para um `.prova.ts` em
 * `src/data/provasInterativas/` — ver COMO-CRIAR-PROVA.md lá dentro.
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

  "Excel": [
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
  "ADM": [
    {
      tipo: "quiz",
      rotulo: "Prova de Administração",
      caminho: "ADM/prova-administracao",
      tamanho: "10 questões",
    },
  ],
  "Assistente de Departamento Pessoal": [
    {
      tipo: "quiz",
      rotulo: "Avaliação de Departamento Pessoal",
      caminho: "Assistente de Departamento Pessoal/avaliacao-dp",
      tamanho: "10 questões",
    },
  ],
  "Assistente de Logística": [
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
  "Escrita Fiscal e Contabilidade": [
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
  "RH": [
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
      "Excel",
      "Excel Avançado I",
      "Excel Avançado II",
      "Internet e Outlook",
      "Internet, Redes Sociais e Aplicativos",
      "Introdução à Informática",
      "KIDS",
      "Manutenção de Computadores",
      "Power BI",
      "Power Point",
      "Redes",
      "Segurança da Era Digital",
      "Windows 11",
      "Word",
    ],
  },
  {
    nome: "Administrativo e Gestão",
    cursos: [
      "ADM",
      "Assistente ADM",
      "Assistente de Departamento Pessoal",
      "Assistente de Logística",
      "Atendimento ao Cliente",
      "Compras e Estoque",
      "Crédito e Cobrança",
      "Custos",
      "Escrita Fiscal e Contabilidade",
      "Gestão de Pessoas",
      "Operador de Caixa",
      "Operador de Telemarketing",
      "RH",
      "Secretariado",
      "Vendas",
    ],
  },
  {
    nome: "Design Gráfico",
    cursos: [
      "Adobe Illustrator",
      "Adobe Photoshop I",
      "Adobe Photoshop II",
      "Adobe Photoshop III",
      "Adobe Premiere",
      "Canva",
      "CorelDraw I",
      "CorelDraw II",
      "Design Gráfico",
    ],
  },
  {
    nome: "Desenvolvimento Web e Mobile",
    cursos: [
      "Cordova",
      "Criando Aplicativo com Angular",
      "Criando Aplicativos Mobile Ionic",
      "CSS",
      "Desenvolvimento WEB - Html, CSS e JavaScript",
      "Fundamentos Web",
      "HTML",
      "JavaScript",
      "WordPress",
    ],
  },
  {
    nome: "Programação e Dados",
    cursos: ["Banco de Dados", "C#", "Inteligência Artificial", "Lógica de Programação", "Python"],
  },
  {
    nome: "Marketing",
    cursos: ["Google Adwords", "Marketing Digital I", "Marketing Digital II"],
  },
  {
    nome: "Saúde",
    cursos: ["Auxiliar Médico", "Farmácia", "Recepcionista de Saúde"],
  },
  {
    nome: "Comportamental",
    cursos: [
      "Educação Financeira",
      "Empreendedorismo",
      "Inteligência Emocional",
      "Liderança",
      "Matemática Financeira",
      "Segurança no Trabalho",
    ],
  },
  {
    nome: "Games",
    cursos: ["Desenvolvimento de Games"],
  },
];