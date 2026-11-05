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
