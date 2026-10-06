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
| `codigo` | Comando de terminal ou trecho de código, em fonte monoespaçada. `terminal: true` prefixa cada linha com `$` (ex.: cursos de programação como Cordova). |
| `cenario` / `instrucao` | Texto de contexto e enunciado. |
| `tabelaReferencia` | Tabela de dados para exercícios de cálculo. |
| `blocos` | Conteúdo livre na ordem de leitura, depois de `cenario`/`instrucao`: `texto`, `subtitulo`, `lista`, `codigo`, `tabela` e `nota` (`objetivo`/`desafio`/`aviso`/`dica`). Use quando a página original intercala explicação, tabelas e código — é assim que as páginas do portal antigo foram portadas sem perder conteúdo. |
| `campos` | Perguntas corrigidas automaticamente (`selecao`, `multipla_escolha`, `numero`, `texto`, `padrao`). |
| `regras` (na atividade) | Caixa amarela no topo com regras lidas antes de começar (ex.: segurança ao mexer no disco). |
| `fonte` (na atividade) | Nota de crédito quando as imagens vêm de terceiros. |

O botão "Corrigir atividade" só aparece quando a atividade tem pelo menos uma
pergunta em `campos` — atividade só com exercícios práticos não mostra o botão.

## Imagens

- Guarde em `src/assets/atividades/<curso>/` e importe no arquivo da atividade.
- **Padrão: print de tela** feito por você (Windows + Shift + S) — é o mais
  rápido. Recorte só a parte da tela que importa para o passo.
- **Casos especiais: ilustração pelo kit** (`npm run ilustracoes`), quando
  precisar destacar um ponto ou quando a tela for difícil/arriscada de
  capturar. Veja `scripts/ilustracoes/README.md`. Para um app criativo
  (Photoshop, CorelDraw, Illustrator...), o kit já tem peças genéricas —
  `janelaCriativa`, `caixaFerramentas`, `painelCriativo` — usadas em
  `scripts/ilustracoes/telas/photoshop.mjs`; copie esse arquivo em vez de
  partir do zero.
- Não use prints de filmes, séries ou memes, nem imagens de sites de terceiros.
- Sem emoji no texto: ícones do portal vêm de `src/components/Icone.tsx`.

## Campo em que o aluno escreve código (HTML, CSS...)

Para conferir um trecho de código de uma linha (`<img src="…" alt="…">`, `<!DOCTYPE html>`), use a
regra `padrao` com uma expressão regular que aceite as variações (ordem dos atributos, aspas simples
ou duplas). **Não use a regra `texto`**: o filtro de "digitação aleatória" dela reprova código
(`html` não tem vogais, um link não tem espaços). Exemplo: `HTML/html-pagina-completa-semantica`.

## Atalho para questões repetidas (`ajudantes.ts`)

Para atividades feitas de várias perguntas do mesmo tipo (apostilas de Custos,
Matemática Financeira, Google Ads...), `src/data/atividadesAutocorrigidas/ajudantes.ts`
tem montadores que devolvem o mesmo `ItemAtividade`, sem repetir `campos`/`regra`/mensagens:
`escolha` (múltipla escolha), `calculo` e `calculos` (resposta numérica; vírgula decimal aceita),
`associar` (um seletor por linha) e `resposta` (texto livre, com `chave` opcional para exigir os
pontos principais). Exemplo em `Custos/custos-centros-e-abc.atividade.ts`.

### Planilha e dissertativa dentro da atividade

`planilha(...)` põe a tabela de dados **dentro do item** (com o botão «Copiar planilha para colar no
Excel») e pede os resultados em campos numéricos; os valores esperados são calculados no próprio arquivo
a partir das mesmas `linhas` (use `somar`/`arredondar`), então a conferência nunca destoa da tabela.
`dissertativa(...)` lista o que a resposta precisa trazer e exige texto de verdade com os pontos-chave
(`chave`). Modelo completo: `Custos/custos-centros-e-abc.atividade.ts`. O material nunca fica fora da
atividade: nada de planilha em `public/` com link para baixar.

### «Dia de trabalho»: imersão com dados grandes e trabalho em outro sistema

Para atividades em que o aluno executa a tarefa fora do portal (Excel, SQL, Python, Power BI, portal de
notas), a atividade é uma sequência: `briefing(...)` (o e-mail do gestor, com o que entregar), uma ou mais
`planilha(...)` ou `consulta(...)` com os dados e os resultados, e `dissertativa(...)` de entrega. O material
vem sempre dentro da página: `dadosFicticios.ts` gera tabelas grandes de forma determinística (mesma semente,
mesma tabela) e o gabarito é calculado no arquivo a partir delas. `consulta` mostra as tabelas com o botão de
copiar (números sem separador de milhar, para importar em SQL/Python), confere o comando por `padrao` e o
resultado por número. Modelos: `Escrita Fiscal/`, `Análise de Dados/` e `Inteligência Artificial II/`.
