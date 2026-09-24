import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/javascript-analise-numeros.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade — Sistema de Análise de Números",
  introducao: "Atividade Complementar — JavaScript",
  itens: [
    {
      id: "objetivo",
      titulo: "Objetivo",
      blocos: [
        {
          tipo: "texto",
          texto: "Você vai criar um programa que:",
        },
        {
          tipo: "lista",
          itens: [
            "Peça um número inicial",
            "Peça um número final",
            "Mostre:",
            "— Todos os números do intervalo",
            "— Quais são pares",
            "— Quais são ímpares",
            "— A soma total dos números",
            "No final, diga se a soma é maior que 100 ou não",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Com isso você vai treinar",
          texto: "",
          itens: ["Variáveis","if / else","for","while","Funções","Operações matemáticas"],
        },
      ],
    },
    {
      id: "parte-1-criando-a-funcao-principal",
      titulo: "Parte 1 – Criando a função principal",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "function analisarNumeros() {",
        },
        {
          tipo: "texto",
          texto: "Aqui criamos uma função chamada analisarNumeros. Tudo que estiver dentro dela será executado quando chamarmos essa função.",
        },
      ],
    },
    {
      id: "parte-2-criando-variaveis-e-recebendo-dados",
      titulo: "Parte 2 – Criando variáveis e recebendo dados",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "let inicio = parseInt(prompt(\"Digite o número inicial:\"));",
        },
        {
          tipo: "lista",
          itens: [
            "let cria uma variável.",
            "inicio guarda o valor digitado.",
            "prompt() pede um valor ao usuário.",
            "parseInt() converte o texto para número inteiro.",
          ],
        },
        {
          tipo: "codigo",
          conteudo: "let fim = parseInt(prompt(\"Digite o número final:\"));",
        },
        {
          tipo: "texto",
          texto: "Mesma lógica, mas agora guardando o número final.",
        },
        {
          tipo: "codigo",
          conteudo: "let soma = 0;",
        },
        {
          tipo: "texto",
          texto: "Criamos uma variável chamada soma. Ela começa com valor 0 porque vamos acumular valores nela.",
        },
      ],
    },
    {
      id: "parte-3-usando-for-laco-de-repeticao",
      titulo: "Parte 3 – Usando FOR (laço de repetição)",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "for (let i = inicio; i <= fim; i++) {",
        },
        {
          tipo: "texto",
          texto: "Vamos entender isso com calma:",
        },
        {
          tipo: "lista",
          itens: [
            "let i = inicio → começa pelo número inicial",
            "i <= fim → continua enquanto i for menor ou igual ao final",
            "i++ → aumenta 1 a cada repetição",
          ],
        },
        {
          tipo: "texto",
          texto: "Isso faz o programa repetir várias vezes automaticamente.",
        },
        {
          tipo: "codigo",
          conteudo: "console.log(\"Número:\", i);",
        },
        {
          tipo: "texto",
          texto: "Mostra cada número no console.",
        },
      ],
    },
    {
      id: "parte-4-usando-if-else",
      titulo: "Parte 4 – Usando IF / ELSE",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "if (i % 2 === 0) {",
        },
        {
          tipo: "lista",
          itens: [
            "% é o operador de resto da divisão.",
            "Se o resto da divisão por 2 for 0 → número é par.",
          ],
        },
        {
          tipo: "codigo",
          conteudo: "console.log(\"É par\");",
        },
        {
          tipo: "texto",
          texto: "Se for par, mostra essa mensagem.",
        },
        {
          tipo: "codigo",
          conteudo: `} else {
    console.log("É ímpar");
}`,
        },
        {
          tipo: "texto",
          texto: "Se não for par, é ímpar.",
        },
      ],
    },
    {
      id: "parte-5-somando-os-numeros",
      titulo: "Parte 5 – Somando os números",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "soma = soma + i;",
        },
        {
          tipo: "texto",
          texto: "A cada repetição, adicionamos o número atual à variável soma.",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "lista",
          itens: [
            "soma começa em 0",
            "depois vira 0 + 1",
            "depois 1 + 2",
            "depois 3 + 3",
            "e assim por diante...",
          ],
        },
        {
          tipo: "texto",
          texto: "Fechamos o for:",
        },
        {
          tipo: "codigo",
          conteudo: "}",
        },
      ],
    },
    {
      id: "parte-6-usando-while",
      titulo: "Parte 6 – Usando WHILE",
      blocos: [
        {
          tipo: "texto",
          texto: "Agora vamos usar um while só para treinar outro tipo de repetição.",
        },
        {
          tipo: "codigo",
          conteudo: "let contador = inicio;",
        },
        {
          tipo: "texto",
          texto: "Criamos uma variável auxiliar.",
        },
        {
          tipo: "codigo",
          conteudo: `while (contador <= fim) {
    contador++;
}`,
        },
        {
          tipo: "texto",
          texto: "Esse while só percorre os números novamente. Ele repete enquanto a condição for verdadeira.",
        },
      ],
    },
    {
      id: "parte-7-verificando-a-soma",
      titulo: "Parte 7 – Verificando a soma",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `if (soma > 100) {
    console.log("A soma é maior que 100");
} else {
    console.log("A soma é menor ou igual a 100");
}`,
        },
        {
          tipo: "texto",
          texto: "Aqui usamos if novamente para comparar o valor final da soma.",
        },
      ],
    },
    {
      id: "parte-8-mostrando-resultado-final",
      titulo: "Parte 8 – Mostrando resultado final",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `    console.log("Soma total:", soma);
}`,
        },
        {
          tipo: "texto",
          texto: "Mostramos o valor total e fechamos a função.",
        },
      ],
    },
    {
      id: "codigo-completo",
      titulo: "Código Completo",
      blocos: [
        {
          tipo: "texto",
          texto: "Agora tudo junto:",
        },
        {
          tipo: "codigo",
          conteudo: `function analisarNumeros() {
    let inicio = parseInt(prompt("Digite o número inicial:"));
    let fim = parseInt(prompt("Digite o número final:"));

    let soma = 0;

    for (let i = inicio; i <= fim; i++) {
        console.log("Número:", i);

        if (i % 2 === 0) {
            console.log("É par");
        } else {
            console.log("É ímpar");
        }

        soma = soma + i;
    }

    let contador = inicio;
    while (contador <= fim) {
        contador++;
    }

    if (soma > 100) {
        console.log("A soma é maior que 100");
    } else {
        console.log("A soma é menor ou igual a 100");
    }

    console.log("Soma total:", soma);
}

analisarNumeros();`,
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
