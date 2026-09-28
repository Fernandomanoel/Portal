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
      tipo: "pratica", 
      rotulo: "avaliacao A", 
      caminho: "Word/avaliacao-peso2", 
      tamanho: "10 tarefas",
    },
    {
      tipo: "pratica", 
      rotulo: "avaliacao B", 
      caminho: "Word/avaliacao-word-peso1", 
      tamanho: "10 tarefas",
    },
  ],

  "Excel": [
  // ... outras provas existentes ...
  { 
    tipo: "pratica", 
    rotulo: "Prova Básica - Boletim Escolar", 
    caminho: "av-excel-1" ,
    tamanho: "11 tarefas",
  },
  { 
    tipo: "pratica", 
    rotulo: "Prova Básica - Compras do mês", 
    caminho: "av-excel-2" ,
    tamanho: "8 tarefas",
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