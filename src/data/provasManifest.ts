import type { CategoriaProva, ManifestoProvas } from "@/types/prova";

/**
 * Índice das provas. As categorias e os cursos já refletem a grade real de
 * provas do instrutor; os arquivos de cada curso ainda não foram portados
 * (manifesto vazio) — o curso aparece na lista com "Em breve" até o arquivo
 * chegar.
 *
 * Quando houver conteúdo, este arquivo volta a ser gerado por
 * `scripts/generate-provas-manifest.py` a partir da pasta `provas/` — o gerador
 * passa a emitir TypeScript em vez do JS antigo. Não edite à mão a partir daí.
 */
export const PROVAS_MANIFEST: ManifestoProvas = {};

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
