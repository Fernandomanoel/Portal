import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/javascript-tabuada-inteligente.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade 2 — Simulador de Tabuada Inteligente",
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
            "Peça um número ao usuário",
            "Mostre a tabuada desse número (de 1 a 10)",
            "Conte quantos resultados são pares",
            "Some todos os resultados",
            "No final:",
            "— Diga se a soma é maior que 100",
            "— Pergunte se o usuário quer repetir o programa",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "O que você vai treinar",
          texto: "",
          itens: [
            "Variáveis",
            "Funções",
            "if / else",
            "for",
            "while",
            "Operações matemáticas",
            "Acumuladores",
            "Estrutura de repetição com controle",
          ],
        },
      ],
    },
    {
      id: "parte-1-criando-a-funcao-principal",
      titulo: "Parte 1 – Criando a função principal",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "function tabuadaInteligente() {",
        },
        {
          tipo: "texto",
          texto: "Aqui criamos uma função chamada tabuadaInteligente. Tudo ficará dentro dela.",
        },
      ],
    },
    {
      id: "parte-2-criando-variavel-de-controle-while",
      titulo: "Parte 2 – Criando variável de controle (while)",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "let continuar = true;",
        },
        {
          tipo: "texto",
          texto: "Criamos uma variável booleana. Ela vai controlar se o programa continua rodando ou não.",
        },
      ],
    },
    {
      id: "parte-3-criando-o-while-principal",
      titulo: "Parte 3 – Criando o while principal",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "while (continuar) {",
        },
        {
          tipo: "texto",
          texto: "Isso significa:",
        },
        {
          tipo: "texto",
          texto: "Enquanto continuar for true, o programa repete.",
        },
      ],
    },
    {
      id: "parte-4-pedindo-o-numero",
      titulo: "Parte 4 – Pedindo o número",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "let numero = parseInt(prompt(\"Digite um número para ver a tabuada:\"));",
        },
        {
          tipo: "lista",
          itens: ["prompt() pede o número","parseInt() transforma texto em número"],
        },
      ],
    },
    {
      id: "parte-5-criando-acumuladores",
      titulo: "Parte 5 – Criando acumuladores",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `let soma = 0;
let quantidadePares = 0;`,
        },
        {
          tipo: "lista",
          itens: [
            "soma vai guardar a soma dos resultados",
            "quantidadePares vai contar quantos resultados são pares",
          ],
        },
      ],
    },
    {
      id: "parte-6-usando-for-para-fazer-a-tabuada",
      titulo: "Parte 6 – Usando FOR para fazer a tabuada",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "for (let i = 1; i <= 10; i++) {",
        },
        {
          tipo: "lista",
          itens: ["Começa em 1","Vai até 10","Incrementa 1 por vez"],
        },
        {
          tipo: "codigo",
          conteudo: "let resultado = numero * i;",
        },
        {
          tipo: "texto",
          texto: "Multiplica o número pelo contador.",
        },
        {
          tipo: "codigo",
          conteudo: "console.log(numero + \" x \" + i + \" = \" + resultado);",
        },
        {
          tipo: "texto",
          texto: "Mostra a conta no console.",
        },
      ],
    },
    {
      id: "parte-7-somando-resultados",
      titulo: "Parte 7 – Somando resultados",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "soma = soma + resultado;",
        },
        {
          tipo: "texto",
          texto: "Acumula os resultados.",
        },
      ],
    },
    {
      id: "parte-8-verificando-se-e-par",
      titulo: "Parte 8 – Verificando se é par",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `if (resultado % 2 === 0) {
    quantidadePares++;
}`,
        },
        {
          tipo: "texto",
          texto: "Se o resto da divisão por 2 for 0 → é par. Então aumentamos o contador.",
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
      id: "parte-9-verificando-a-soma",
      titulo: "Parte 9 – Verificando a soma",
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
          texto: "Comparação usando if e else.",
        },
      ],
    },
    {
      id: "parte-10-mostrando-estatisticas",
      titulo: "Parte 10 – Mostrando estatísticas",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `console.log("Soma total:", soma);
console.log("Quantidade de resultados pares:", quantidadePares);`,
        },
        {
          tipo: "texto",
          texto: "Mostramos os dados finais.",
        },
      ],
    },
    {
      id: "parte-11-perguntar-se-quer-repetir",
      titulo: "Parte 11 – Perguntar se quer repetir",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "let resposta = prompt(\"Quer calcular outra tabuada? (s/n)\");",
        },
        {
          tipo: "texto",
          texto: "Pedimos uma resposta.",
        },
        {
          tipo: "codigo",
          conteudo: `if (resposta.toLowerCase() !== "s") {
    continuar = false;
}`,
        },
        {
          tipo: "lista",
          itens: [
            "toLowerCase() transforma em minúscula",
            "Se não for \"s\", paramos o programa",
            "Mudamos continuar para false",
          ],
        },
        {
          tipo: "texto",
          texto: "Fechamos tudo:",
        },
        {
          tipo: "codigo",
          conteudo: `    }
}`,
        },
        {
          tipo: "texto",
          texto: "E chamamos a função:",
        },
        {
          tipo: "codigo",
          conteudo: "tabuadaInteligente();",
        },
      ],
    },
    {
      id: "codigo-completo",
      titulo: "Código Completo",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `function tabuadaInteligente() {
    let continuar = true;

    while (continuar) {
        let numero = parseInt(prompt("Digite um número para ver a tabuada:"));

        let soma = 0;
        let quantidadePares = 0;

        for (let i = 1; i <= 10; i++) {
            let resultado = numero * i;

            console.log(numero + " x " + i + " = " + resultado);

            soma = soma + resultado;

            if (resultado % 2 === 0) {
                quantidadePares++;
            }
        }

        if (soma > 100) {
            console.log("A soma é maior que 100");
        } else {
            console.log("A soma é menor ou igual a 100");
        }

        console.log("Soma total:", soma);
        console.log("Quantidade de resultados pares:", quantidadePares);

        let resposta = prompt("Quer calcular outra tabuada? (s/n)");

        if (resposta.toLowerCase() !== "s") {
            continuar = false;
        }
    }
}

tabuadaInteligente();`,
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
