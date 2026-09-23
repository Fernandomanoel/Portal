# Como criar uma atividade (molde)

Criar uma atividade nova é preencher **um arquivo de dados** e **uma linha no
catálogo**. Nenhuma tela ou componente precisa ser alterado.

## 1. Crie o arquivo da atividade

Caminho: `src/data/atividadesAutocorrigidas/<Curso>/<nome-da-atividade>.atividade.ts`
(o nome precisa terminar em `.atividade.ts`).

Copie o molde abaixo e troque só o conteúdo:

```ts
import imagemPasso1 from "@/assets/atividades/<curso>/<imagem>.svg"; // opcional
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: <Curso> — <Tema>",
  introducao: "Objetivo geral da atividade, em uma ou duas frases.",
  itens: [
    // Exercício prático: o aluno faz no próprio computador (sem correção).
    {
      id: "primeiro-exercicio",
      titulo: "Nome do exercício",
      passos: [
        "Primeiro passo da tarefa.",
        "Segundo passo da tarefa.",
      ],
      imagem: {
        url: imagemPasso1,
        alt: "Descrição do que aparece na imagem (para leitores de tela).",
        legenda: "Frase curta que aparece embaixo da imagem.",
      },
      objetivo: "O que o aluno aprende com este exercício.",
    },

    // Pergunta corrigida automaticamente (opcional).
    {
      id: "pergunta-final",
      titulo: "Pergunta rápida",
      instrucao: "Texto da pergunta.",
      campos: [
        {
          id: "pergunta-1",
          regra: { tipo: "multipla_escolha", correta: 1, opcoes: ["Errada", "Certa", "Errada"] },
          mensagemCerta: "Explicação quando o aluno acerta.",
          mensagemErrada: "Dica quando o aluno erra.",
        },
      ],
    },
  ],
};

export default atividade;
```

## 2. Registre no catálogo

Em `src/data/atividades.ts`, dentro do curso, acrescente ao array `atividades`:

```ts
{
  titulo: "Atividade Prática: <Curso> — <Tema>",
  descricao: "Resumo de uma linha que aparece na página do curso.",
  caminho: "<Curso>/<nome-da-atividade>",
},
```

## O que cada campo faz

| Campo | Para quê |
| --- | --- |
| `passos` | Lista numerada da tarefa ("Tarefa"), na ordem de execução. |
| `objetivo` | Caixa "Objetivo:" no fim do exercício. |
| `desafio` | Caixa "Desafio extra:" com uma tarefa a mais, para quem terminar antes. |
| `aviso` | Caixa amarela "Atenção:" com um cuidado que o aluno precisa ter. |
| `imagem` | Imagem de demonstração. `url` recebe um `import` de `src/assets/` ou um link externo. |
| `cenario` / `instrucao` | Texto de contexto e enunciado. |
| `tabelaReferencia` | Tabela de dados para exercícios de cálculo. |
| `campos` | Perguntas corrigidas automaticamente (`selecao`, `multipla_escolha`, `numero`, `texto`, `padrao`). |
| `regras` (na atividade) | Caixa amarela no topo com regras lidas antes de começar (ex.: segurança ao mexer no disco). |
| `fonte` (na atividade) | Nota de crédito quando as imagens vêm de terceiros. |

O botão "Corrigir atividade" só aparece quando a atividade tem pelo menos uma
pergunta em `campos` — atividade só com exercícios práticos não mostra o botão.

## Imagens

- Guarde em `src/assets/atividades/<curso>/` e importe no arquivo da atividade.
- Use ilustrações próprias (como os SVGs de `src/assets/atividades/windows-11/`)
  ou capturas de tela feitas por você. Não use prints de filmes, séries ou memes.
- Sem emoji no texto: ícones do portal vêm de `src/components/Icone.tsx`.
