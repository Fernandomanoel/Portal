export type CategoriaAtividade =
  | "informatica"
  | "administrativa"
  | "programacao"
  | "design"
  | "marketing"
  | "saude"
  | "comportamental";

export type TipoMaterial = "pdf" | "doc" | "planilha" | "slides" | "video" | "imagem" | "link";

export interface Material {
  titulo: string;
  descricao?: string;
  tipo: TipoMaterial;
  /**
   * Caminho do arquivo em `public/`, para tudo que não é `link`. A tela
   * sempre baixa esse arquivo na hora — nunca navega para fora do portal.
   * Ver `src/data/COMO-FORNECER-MATERIAL.md`.
   */
  arquivo?: string;
  /** Endereço externo ou página HTML autocontida, para `tipo: "link"` — abre em nova aba. */
  url?: string;
}

export interface AtividadeResumo {
  titulo: string;
  descricao: string;
  /** Caminho do módulo em `src/data/atividadesAutocorrigidas/`, sem a extensão `.atividade.ts`. */
  caminho: string;
}

export interface Curso {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaAtividade;
  /** Uma ou duas letras usadas na capa gerada. */
  sigla?: string;
  cor: string;
  materiais: Material[];
  /** Simulações autocorrigidas, renderizadas dentro do próprio portal — ver AtividadeAutocorrigida. */
  atividades?: AtividadeResumo[];
  /** Só quando a capa não segue o padrão `img/<slug>.jpg`. */
  imagem?: string;
}

export interface Categoria {
  id: CategoriaAtividade;
  nome: string;
  descricao: string;
}

export const CATEGORIAS: Categoria[] = [
  {
    id: "informatica",
    nome: "Informática",
    descricao: "Windows, pacote Office e fundamentos de computador.",
  },
  {
    id: "administrativa",
    nome: "Administrativa e Gestão",
    descricao: "Rotinas de escritório, documentos e processos.",
  },
  {
    id: "programacao",
    nome: "Programação",
    descricao: "Lógica, linguagens e desenvolvimento.",
  },
  {
    id: "design",
    nome: "Design",
    descricao: "Imagem, layout e ferramentas de criação.",
  },
  {
    id: "marketing",
    nome: "Marketing",
    descricao: "Propaganda, marca pessoal e divulgação.",
  },
  {
    id: "saude",
    nome: "Saúde",
    descricao: "Atendimento e rotinas de clínicas e farmácias.",
  },
  {
    id: "comportamental",
    nome: "Comportamental",
    descricao: "Habilidades pessoais e de gestão para o trabalho.",
  },
];
