import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/javascript-jogo-adivinhacao.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade 4 — Jogo de Adivinhação com Tentativas Limitadas",
  introducao: "Atividade Complementar — JavaScript",
  itens: [
    {
      id: "objetivo",
      titulo: "Objetivo",
      blocos: [
        {
          tipo: "texto",
          texto: "Criar um programa que:",
        },
        {
          tipo: "lista",
          itens: [
            "Gere um número aleatório de 1 a 50",
            "Dê no máximo 5 tentativas para o usuário acertar",
            "Informe se o número digitado é:",
            "— Maior",
            "— Menor",
            "Se acertar → mostrar vitória",
            "Se acabar as tentativas → mostrar derrota",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Você vai treinar",
          texto: "",
          itens: [
            "Variáveis",
            "Math.random()",
            "parseInt",
            "while",
            "if / else",
            "Contador de tentativas",
            "Comparações matemáticas",
          ],
        },
      ],
    },
    {
      id: "parte-1-criando-a-funcao",
      titulo: "Parte 1 – Criando a função",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "function jogoAdivinhacao() {",
        },
        {
          tipo: "texto",
          texto: "Criamos a função principal.",
        },
      ],
    },
    {
      id: "parte-2-gerando-numero-aleatorio",
      titulo: "Parte 2 – Gerando número aleatório",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "let numeroSecreto = Math.floor(Math.random() * 50) + 1;",
        },
        {
          tipo: "texto",
          texto: "Vamos entender:",
        },
        {
          tipo: "lista",
          itens: [
            "Math.random() → gera número entre 0 e 1",
            "* 50 → transforma em 0 a 49",
            "Math.floor() → arredonda para baixo",
            "+ 1 → faz ficar entre 1 e 50",
          ],
        },
      ],
    },
    {
      id: "parte-3-criando-controle-de-tentativas",
      titulo: "Parte 3 – Criando controle de tentativas",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `let tentativas = 5;
let acertou = false;`,
        },
        {
          tipo: "lista",
          itens: ["tentativas controla quantas chances restam","acertou controla se o jogador venceu"],
        },
      ],
    },
    {
      id: "parte-4-criando-o-while",
      titulo: "Parte 4 – Criando o WHILE",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "while (tentativas > 0 && !acertou) {",
        },
        {
          tipo: "texto",
          texto: "O loop continua enquanto:",
        },
        {
          tipo: "lista",
          itens: ["Ainda houver tentativas","E o jogador não tiver acertado"],
        },
      ],
    },
    {
      id: "parte-5-pedindo-numero",
      titulo: "Parte 5 – Pedindo número",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "let chute = parseInt(prompt(\"Digite um número entre 1 e 50:\"));",
        },
        {
          tipo: "texto",
          texto: "Usuário tenta adivinhar.",
        },
      ],
    },
    {
      id: "parte-6-verificando",
      titulo: "Parte 6 – Verificando",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `if (chute === numeroSecreto) {
    console.log("Parabéns! Você acertou!");
    acertou = true;`,
        },
        {
          tipo: "texto",
          texto: "Se acertar:",
        },
        {
          tipo: "lista",
          itens: ["Mostra mensagem","Muda acertou para true"],
        },
        {
          tipo: "codigo",
          conteudo: `} else if (chute < numeroSecreto) {
    console.log("O número secreto é MAIOR.");`,
        },
        {
          tipo: "texto",
          texto: "Se o chute for menor → damos dica.",
        },
        {
          tipo: "codigo",
          conteudo: `} else {
    console.log("O número secreto é MENOR.");
}`,
        },
        {
          tipo: "texto",
          texto: "Se não for menor nem igual → é maior.",
        },
      ],
    },
    {
      id: "parte-7-diminuindo-tentativas",
      titulo: "Parte 7 – Diminuindo tentativas",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `tentativas--;
console.log("Tentativas restantes:", tentativas);`,
        },
        {
          tipo: "texto",
          texto: "Reduzimos 1 tentativa.",
        },
        {
          tipo: "texto",
          texto: "Fechamos o while:",
        },
        {
          tipo: "codigo",
          conteudo: "}",
        },
      ],
    },
    {
      id: "parte-8-se-perder",
      titulo: "Parte 8 – Se perder",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `if (!acertou) {
    console.log("Você perdeu! O número era:", numeroSecreto);
}`,
        },
        {
          tipo: "texto",
          texto: "Se saiu do loop sem acertar → perdeu.",
        },
        {
          tipo: "texto",
          texto: "Fechamos função e chamamos:",
        },
        {
          tipo: "codigo",
          conteudo: `}

jogoAdivinhacao();`,
        },
      ],
    },
    {
      id: "codigo-completo",
      titulo: "Código Completo",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `function jogoAdivinhacao() {
    let numeroSecreto = Math.floor(Math.random() * 50) + 1;

    let tentativas = 5;
    let acertou = false;

    while (tentativas > 0 && !acertou) {
        let chute = parseInt(prompt("Digite um número entre 1 e 50:"));

        if (chute === numeroSecreto) {
            console.log("Parabéns! Você acertou!");
            acertou = true;

        } else if (chute < numeroSecreto) {
            console.log("O número secreto é MAIOR.");

        } else {
            console.log("O número secreto é MENOR.");
        }

        tentativas--;
        console.log("Tentativas restantes:", tentativas);
    }

    if (!acertou) {
        console.log("Você perdeu! O número era:", numeroSecreto);
    }
}

jogoAdivinhacao();`,
        },
        {
          tipo: "texto",
          texto: "Execute o código",
        },
        {
          tipo: "lista",
          itens: ["Abra o Google Chrome","Aperte F12","Vá na aba Console","Cole o código","Aperte Enter"],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Vai aparecer o prompt() pedindo os números.",
        },
      ],
    },
  ],
};

export default atividade;
