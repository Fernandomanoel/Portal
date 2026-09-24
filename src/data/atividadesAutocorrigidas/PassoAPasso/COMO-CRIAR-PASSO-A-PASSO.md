# Como criar um tutorial do "Passo a Passo"

A seção "Passo a Passo" (`/passo-a-passo`) é para crianças e para pessoas com
dificuldade de leitura. Cada tela mostra **um passo só**, com imagem, botão
"Ouvir" e recompensa ("Muito bem!") ao avançar. A tela é sempre a mesma —
quem escreve o tutorial só escreve o dado.

## 1. Criar o arquivo

`src/data/atividadesAutocorrigidas/PassoAPasso/<assunto>-<nome>.atividade.ts`

```ts
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Abrir o Word e escrever seu nome",
  introducao: "Você vai abrir o Word e escrever o seu nome.",
  itens: [
    {
      id: "abrir-word",
      titulo: "Abrir o Word",          // vira a "Parte 1 de 2" em cima do passo
      passosGuiados: [
        { texto: "Clique no botão Iniciar. É o ícone com quatro quadradinhos azuis." },
        { texto: "Digite a palavra Word no teclado." },
      ],
    },
  ],
};

export default atividade;
```

Use sempre `passosGuiados` (nunca `passos`) — é o que a tela desta seção lê.

## 2. Pôr na vitrine

Acrescentar uma linha em `TUTORIAIS`, em `src/data/guiado.ts`, com o mesmo
`caminho` (sem `.atividade.ts`) e o `assunto` (`windows`, `word`, `excel`,
`powerpoint`, `ia` ou `seguranca`). A prateleira do assunto aparece sozinha.

## 3. Regras de escrita

- **Um passo = uma ação.** Em vez de "Abra o Word e digite um texto":
  "Ache o ícone" → "Clique duas vezes" → "Clique na folha em branco".
- **Linguagem literal, sem comparação.** "Clique no ícone verde com a letra
  X", nunca "navegue", "explore" ou "é como um armário".
- Frases curtas, na segunda pessoa ("você").
- Nome em inglês que a voz lê errado: escreva normal em `texto` e do jeito
  que se fala em `textoNarrado` (ex.: `"Aperte a tecla Béqui-spêice."`).

## 4. Imagens (fornecidas pela equipe)

Cada passo aceita uma imagem, print ou GIF curto. Enquanto ela não existir, a
tela mostra o ícone do assunto no lugar — nada quebra.

1. Salvar o arquivo em `src/assets/guiado/<nome-do-tutorial>/passo-<n>.png`
   (ou `.gif`, `.jpg`, `.webp`).
2. Importar no `.atividade.ts` e ligar ao passo:

```ts
import passo1 from "@/assets/guiado/word-abrir-e-escrever-seu-nome/passo-1.png";

{ texto: "Clique no botão Iniciar.", imagem: { url: passo1, alt: "Barra de tarefas com o botão Iniciar marcado" } },
```

`alt` descreve o que a imagem mostra, para quem usa leitor de tela.

A capa do card na vitrine é o campo `capa` da linha em `TUTORIAIS` (mesmo
jeito: importar a imagem e passar o valor).
