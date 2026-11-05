# Como escrever o conteúdo de um curso

A aba «Conteúdos» da área do professor mostra a teoria de cada curso, para quem
ensina um assunto que não é da sua área. Um curso tem conteúdo quando existe o
arquivo `src/data/conteudosProfessor/<slug>.conteudo.ts`, com o `slug` do curso
em `src/data/atividades.ts`. Nenhuma tela nova é preciso: a lista e a página do
curso leem o arquivo sozinhas, e só carregam o conteúdo quando abrem.

```ts
import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo: "O que é o curso e aonde leva o aluno, em 2 ou 3 frases.",
  topicos: [
    {
      titulo: "Marketing e propaganda",
      texto: ["Explicação em parágrafos curtos."],
      pontos: ["O que o aluno precisa sair sabendo."],
      exemplo: "Uma situação do dia a dia.",
      erros: ["Confusão comum dos alunos."],
      atividades: ["marketing-propaganda"], // final do `caminho` das atividades
    },
  ],
  glossario: [{ termo: "Persona", definicao: "Retrato do cliente ideal." }],
  dicas: ["Como conduzir a aula."],
};

export default conteudo;
```

Regras de escrita:

- Os tópicos seguem a ordem das atividades do curso; `atividades` liga cada
  tópico às atividades que o usam (o professor clica e vai para elas).
- Linguagem simples, de quem está aprendendo o assunto agora: o professor pode
  nunca ter trabalhado com isso. Defina o termo na primeira vez que ele aparece.
- Números e regras de lei (alíquotas, prazos, limites) mudam: diga «confira a
  tabela vigente» em vez de afirmar um valor sem data.
- Não vale copiar gabarito das atividades nem das provas.
- Os cursos do pacote Office (Windows, Excel, Word, PowerPoint, Internet e
  redes sociais, Outlook, Introdução à Informática) ficam de fora desta aba.
