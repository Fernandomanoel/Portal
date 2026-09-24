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

## 4. Desenho de cada passo

Todo passo tem um desenho da tela (nunca só texto), no mesmo estilo das
atividades de Windows 11. Os desenhos são gerados pelo kit de ilustração:

1. Em `scripts/ilustracoes/telas/passo-a-passo.mjs`, copie a tela mais
   parecida, troque o nome da chave, os textos e as posições.
2. Rode `npm run ilustracoes -- <nome>` e abra o SVG gerado em
   `src/assets/atividades/passo-a-passo/` no navegador. Ajuste e rode de novo.
3. No `.atividade.ts`, ligue o desenho ao passo com `figura`:

```ts
import { figura } from "./figuras";

{ texto: "Clique no botão Iniciar.", imagem: figura("iniciar-botao", "Botão Iniciar marcado na barra de tarefas") },
```

`alt` descreve o que o desenho mostra, para quem usa leitor de tela. Nome de
desenho errado quebra na hora (a atividade não abre), para ninguém publicar
um passo sem imagem sem perceber.

Regras dos desenhos desta seção — iguais em todas as telas:

- **Anel laranja = clique aqui.** Só onde a pessoa clica. Nunca em volta de
  algo que é só para olhar — e nunca em link estranho (Segurança).
- **Rótulo amarelo = o nome desta parte** ("Barra de tarefas", "célula").
- **Selo verde** = deu certo; **selo vermelho** = não faça.
- **Mouse pequeno** com o botão pintado de laranja mostra qual botão usar.
- Quase nenhum texto dentro do desenho: a instrução já está escrita, grande,
  e narrada ao lado.

Um print de tela real ou um GIF curto também serve: salve em
`src/assets/atividades/passo-a-passo/` e importe direto
(`import passo1 from "@/assets/atividades/passo-a-passo/passo-1.gif"`,
`imagem: { url: passo1, alt: "..." }`).

A capa do card na vitrine é o campo `capa` da linha em `TUTORIAIS`
(importar a imagem e passar o valor); sem ela, o card mostra a cor e o
ícone do assunto.
