import type { Curso } from "@/types/curso";

/**
 * Catálogo de atividades.
 *
 * Para adicionar um curso, acrescente um objeto aqui — nenhuma tela nova é
 * necessária, a rota /atividades/<slug> passa a existir sozinha. Os materiais
 * de cada curso abaixo chegam depois; por ora ficam com `materiais: []`, o que
 * a tela já trata como "sem materiais ainda" sem exigir nenhuma mudança.
 */
export const ATIVIDADES: Curso[] = [
  {
    slug: "administracao",
    titulo: "Administração",
    descricao: "Fundamentos de gestão, planejamento e rotinas administrativas.",
    categoria: "administrativa",
    sigla: "AD",
    cor: "#2563eb",
    materiais: [],
  },
  {
    slug: "marketing",
    titulo: "Marketing",
    descricao: "Estratégias de divulgação, marca e relacionamento com o cliente.",
    categoria: "administrativa",
    sigla: "MK",
    cor: "#db2777",
    materiais: [],
  },
  {
    slug: "departamento-pessoal",
    titulo: "Departamento Pessoal",
    descricao: "Rotinas trabalhistas, folha de pagamento e admissão/demissão.",
    categoria: "administrativa",
    sigla: "DP",
    cor: "#0f766e",
    materiais: [],
  },
  {
    slug: "credito-cobranca",
    titulo: "Crédito e Cobrança",
    descricao: "Análise de crédito, negociação e recuperação de inadimplência.",
    categoria: "administrativa",
    sigla: "CC",
    cor: "#b45309",
    materiais: [],
  },
  {
    slug: "gestao-pessoas",
    titulo: "Gestão de Pessoas",
    descricao: "Liderança, desenvolvimento de equipes e clima organizacional.",
    categoria: "administrativa",
    sigla: "GP",
    cor: "#7c3aed",
    materiais: [],
  },
  {
    slug: "recursos-humanos",
    titulo: "Recursos Humanos",
    descricao: "Recrutamento, seleção e processos estratégicos de RH.",
    categoria: "administrativa",
    sigla: "RH",
    cor: "#1d4ed8",
    materiais: [],
  },
  {
    slug: "seguranca-trabalho",
    titulo: "Segurança do Trabalho",
    descricao: "Prevenção de acidentes, normas regulamentadoras e uso de EPIs.",
    categoria: "administrativa",
    sigla: "ST",
    cor: "#ca8a04",
    materiais: [],
  },
  {
    slug: "assistente-gestao",
    titulo: "Assistente de Gestão",
    descricao: "Suporte administrativo e apoio à tomada de decisão.",
    categoria: "administrativa",
    sigla: "AG",
    cor: "#0891b2",
    materiais: [],
  },
  {
    slug: "secretariado",
    titulo: "Secretariado",
    descricao: "Organização de agendas, documentos e atendimento executivo.",
    categoria: "administrativa",
    sigla: "SC",
    cor: "#be123c",
    materiais: [],
  },
  {
    slug: "vendas",
    titulo: "Vendas",
    descricao: "Técnicas de negociação, prospecção e fechamento de vendas.",
    categoria: "administrativa",
    sigla: "VD",
    cor: "#15803d",
    materiais: [],
  },
];

export function acharCurso(slug: string): Curso | undefined {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
