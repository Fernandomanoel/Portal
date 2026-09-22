import type { Curso } from "@/types/curso";

/**
 * Catálogo de atividades.
 *
 * Para adicionar um curso, acrescente um objeto aqui — nenhuma tela nova é
 * necessária, a rota /atividades/<slug> passa a existir sozinha. Os arquivos
 * dos materiais (pdf/doc) ficam em `public/atividades/<slug>/`; formulários
 * prontos viram material do tipo `link`, sejam eles internos (uma página
 * autocontida em `public/atividades/<slug>/`) ou externos (Google Forms).
 */
export const ATIVIDADES: Curso[] = [
  {
    slug: "administracao",
    titulo: "Administração",
    descricao: "Fundamentos de gestão, planejamento e rotinas administrativas.",
    categoria: "administrativa",
    sigla: "AD",
    cor: "#2563eb",
    materiais: [
      {
        titulo: "Avaliação Geral e Estratégica",
        descricao: "Formulário interativo com questões sobre fundamentos de administração.",
        tipo: "link",
        url: "/atividades/administracao/avaliacao-geral-estrategica.html",
      },
      {
        titulo: "Prova de Administração",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/administracao/prova-administracao.html",
      },
      {
        titulo: "Avaliação I",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdepwuWAiATj7oJBxtIyvGpBTudVR_1feUF5A5eRdrO8Liyng/viewform",
      },
      {
        titulo: "Avaliação II",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfBe3D8EMVT1su_bxa7hDZ3x2g7vrO4SyZ8yND9gmkrgIKnFw/viewform",
      },
    ],
  },
  {
    slug: "marketing",
    titulo: "Marketing",
    descricao: "Estratégias de divulgação, marca e relacionamento com o cliente.",
    categoria: "administrativa",
    sigla: "MK",
    cor: "#db2777",
    materiais: [
      {
        titulo: "Avaliação Prática - Marketing Digital I",
        tipo: "pdf",
        arquivo: "/atividades/marketing/avaliacao-pratica-marketing-digital-i.pdf",
      },
      {
        titulo: "Avaliação Prática - Marketing Digital II",
        tipo: "pdf",
        arquivo: "/atividades/marketing/avaliacao-pratica-marketing-digital-ii.pdf",
      },
      {
        titulo: "Avaliação Prática - Marketing Digital II (resumida)",
        tipo: "pdf",
        arquivo: "/atividades/marketing/avaliacao-pratica-marketing-digital-ii-curta.pdf",
      },
    ],
  },
  {
    slug: "departamento-pessoal",
    titulo: "Departamento Pessoal",
    descricao: "Rotinas trabalhistas, folha de pagamento e admissão/demissão.",
    categoria: "administrativa",
    sigla: "DP",
    cor: "#0f766e",
    materiais: [
      {
        titulo: "Avaliação Prática - Assistente de Departamento Pessoal",
        tipo: "pdf",
        arquivo: "/atividades/departamento-pessoal/avaliacao-pratica.pdf",
      },
      {
        titulo: "Avaliação Prática (resumida)",
        tipo: "pdf",
        arquivo: "/atividades/departamento-pessoal/avaliacao-pratica-curta.pdf",
      },
      {
        titulo: "Prova de Assistente de Departamento Pessoal",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/departamento-pessoal/prova-assistente-dp.html",
      },
    ],
  },
  {
    slug: "credito-cobranca",
    titulo: "Crédito e Cobrança",
    descricao: "Análise de crédito, negociação e recuperação de inadimplência.",
    categoria: "administrativa",
    sigla: "CC",
    cor: "#b45309",
    materiais: [
      {
        titulo: "Prova de Crédito e Cobrança",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/credito-cobranca/prova-credito-e-cobranca.html",
      },
      {
        titulo: "Avaliação",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://docs.google.com/forms/d/e/1FAIpQLScXQfgSz8c2zO_O5VeHvOy3HVQ9l5PANsagCdOM5bXMSb7t2Q/viewform",
      },
    ],
  },
  {
    slug: "gestao-pessoas",
    titulo: "Gestão de Pessoas",
    descricao: "Liderança, desenvolvimento de equipes e clima organizacional.",
    categoria: "administrativa",
    sigla: "GP",
    cor: "#7c3aed",
    materiais: [
      {
        titulo: "Avaliação - Gestão de Pessoas",
        tipo: "doc",
        arquivo: "/atividades/gestao-pessoas/avaliacao.docx",
      },
      {
        titulo: "Prova de Gestão de Pessoas",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/gestao-pessoas/prova-gestao-de-pessoas.html",
      },
    ],
  },
  {
    slug: "recursos-humanos",
    titulo: "Recursos Humanos",
    descricao: "Recrutamento, seleção e processos estratégicos de RH.",
    categoria: "administrativa",
    sigla: "RH",
    cor: "#1d4ed8",
    materiais: [
      {
        titulo: "Prova de Recursos Humanos",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/recursos-humanos/prova-recursos-humanos.html",
      },
    ],
  },
  {
    slug: "seguranca-trabalho",
    titulo: "Segurança do Trabalho",
    descricao: "Prevenção de acidentes, normas regulamentadoras e uso de EPIs.",
    categoria: "administrativa",
    sigla: "ST",
    cor: "#ca8a04",
    materiais: [
      {
        titulo: "Prova de Segurança no Trabalho",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/seguranca-trabalho/prova-seguranca-no-trabalho.html",
      },
      {
        titulo: "Avaliação",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://forms.gle/ACJ1wXtDZua8JjBWA",
      },
    ],
  },
  {
    slug: "assistente-gestao",
    titulo: "Assistente de Gestão",
    descricao: "Suporte administrativo e apoio à tomada de decisão.",
    categoria: "administrativa",
    sigla: "AG",
    cor: "#0891b2",
    materiais: [
      {
        titulo: "Avaliação - Assistente ADM I",
        tipo: "pdf",
        arquivo: "/atividades/assistente-gestao/avaliacao-assistente-adm-i.pdf",
      },
      {
        titulo: "Avaliação - Assistente ADM II",
        tipo: "pdf",
        arquivo: "/atividades/assistente-gestao/avaliacao-assistente-adm-ii.pdf",
      },
      {
        titulo: "Avaliação - Assistente ADM II (Word)",
        tipo: "doc",
        arquivo: "/atividades/assistente-gestao/avaliacao-assistente-adm-ii.docx",
      },
      {
        titulo: "Avaliação I",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdepwuWAiATj7oJBxtIyvGpBTudVR_1feUF5A5eRdrO8Liyng/viewform",
      },
      {
        titulo: "Avaliação II",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfBe3D8EMVT1su_bxa7hDZ3x2g7vrO4SyZ8yND9gmkrgIKnFw/viewform",
      },
    ],
  },
  {
    slug: "secretariado",
    titulo: "Secretariado",
    descricao: "Organização de agendas, documentos e atendimento executivo.",
    categoria: "administrativa",
    sigla: "SC",
    cor: "#be123c",
    materiais: [
      {
        titulo: "Prova de Secretariado",
        descricao: "Formulário interativo de avaliação prática.",
        tipo: "link",
        url: "/atividades/secretariado/prova-secretariado.html",
      },
      {
        titulo: "Avaliação",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://forms.gle/EvQuFJNxru8kwxZk8",
      },
    ],
  },
  {
    slug: "vendas",
    titulo: "Vendas",
    descricao: "Técnicas de negociação, prospecção e fechamento de vendas.",
    categoria: "administrativa",
    sigla: "VD",
    cor: "#15803d",
    materiais: [
      {
        titulo: "Avaliação - Vendas",
        tipo: "pdf",
        arquivo: "/atividades/vendas/avaliacao-vendas.pdf",
      },
      {
        titulo: "Avaliação",
        descricao: "Formulário externo (Google Forms).",
        tipo: "link",
        url: "https://docs.google.com/forms/d/e/1FAIpQLScSjkqOfHUT5xHxc0ecaf4Tau5Q4Ig3kLmXdT8hKRHvlcfXIA/viewform",
      },
    ],
  },
];

export function acharCurso(slug: string): Curso | undefined {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
