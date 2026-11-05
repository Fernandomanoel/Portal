/**
 * Teoria de um curso para quem ensina: o que o professor precisa dominar para
 * conduzir as atividades, mesmo vindo de outra área. Um arquivo por curso em
 * `src/data/conteudosProfessor/<slug>.conteudo.ts` (o `slug` é o do curso em
 * `src/data/atividades.ts`). Ver COMO-CRIAR-CONTEUDO.md na mesma pasta.
 */
export interface TopicoTeoria {
  titulo: string;
  /** Explicação em parágrafos curtos, em linguagem de quem está aprendendo o assunto agora. */
  texto: string[];
  /** «O que o aluno precisa sair sabendo»: pontos de checagem. */
  pontos?: string[];
  /** Um exemplo resolvido ou uma situação do dia a dia. */
  exemplo?: string;
  /** Erros e confusões comuns dos alunos, para o professor antecipar. */
  erros?: string[];
  /** Atividades do curso que usam este assunto: o final do `caminho` (sem a pasta). */
  atividades?: string[];
}

export interface ConteudoCurso {
  /** O que o curso é e aonde leva o aluno, em duas ou três frases. */
  resumo: string;
  topicos: TopicoTeoria[];
  glossario: { termo: string; definicao: string }[];
  /** Como conduzir a aula: sugestões práticas para o professor. */
  dicas: string[];
}

/** Limites do que se pode escrever num conteúdo (conferidos no servidor e no editor). */
export const LIMITES_CONTEUDO = {
  resumo: 1500,
  topicos: 40,
  tituloTopico: 140,
  paragrafos: 20,
  paragrafo: 3000,
  itens: 20,
  item: 500,
  exemplo: 1500,
  atividades: 20,
  glossario: 60,
  termo: 80,
  definicao: 700,
  dicas: 30,
  dica: 600,
  comentario: 200,
  revisoes: 200,
} as const;

/**
 * Uma versão do conteúdo de um curso, como numa wiki: cada edição guarda o
 * texto inteiro, quem fez, quando e o que mudou (o servidor não calcula a
 * diferença: ela é feita na tela, entre duas versões quaisquer). A versão
 * «original» (número 0) é o arquivo `.conteudo.ts`, que não vai para o servidor.
 */
export interface RevisaoConteudo {
  numero: number;
  autor: string;
  unidade?: string;
  em: string;
  /** O que a pessoa disse ter mudado, em uma frase. */
  comentario: string;
  tipo: "edicao" | "restauracao";
  conteudo: ConteudoCurso;
}

export type ResumoRevisao = Omit<RevisaoConteudo, "conteudo">;

/** Histórico de um curso: só existe depois da primeira edição. */
export interface HistoricoConteudo {
  slug: string;
  revisoes: RevisaoConteudo[];
}
