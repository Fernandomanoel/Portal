import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/javascript-caixa-eletronico.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade 3 — Simulador de Caixa Eletrônico",
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
            "Tenha um saldo inicial",
            "Mostre um menu com opções:",
            "— Ver saldo",
            "— Depositar",
            "— Sacar",
            "— Sair",
            "Não permita sacar mais do que tem no saldo",
            "Continue rodando até o usuário escolher sair",
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
            "Funções",
            "while",
            "if / else",
            "Operadores matemáticos",
            "Controle de fluxo",
            "Validação de saldo",
          ],
        },
      ],
    },
    {
      id: "parte-1-criando-a-funcao",
      titulo: "Parte 1 — Criando a função",
      blocos: [
        {
          tipo: "codigo",
          conteudo: "function caixaEletronico() {",
        },
        {
          tipo: "texto",
          texto: "Criamos uma função chamada caixaEletronico.",
        },
        {
          tipo: "subtitulo",
          texto: "Parte 2 — Criando o saldo",
        },
        {
          tipo: "codigo",
          conteudo: "let saldo = 1000;",
        },
        {
          tipo: "texto",
          texto: "Aqui criamos a variável saldo com valor inicial de 1000.",
        },
        {
          tipo: "subtitulo",
          texto: "Parte 3 — Criando controle do programa",
        },
        {
          tipo: "codigo",
          conteudo: "let continuar = true;",
        },
        {
          tipo: "texto",
          texto: "Essa variável vai controlar o while.",
        },
        {
          tipo: "subtitulo",
          texto: "Parte 4 — Criando o menu com WHILE",
        },
        {
          tipo: "codigo",
          conteudo: "while (continuar) {",
        },
        {
          tipo: "texto",
          texto: "Enquanto continuar for true, o menu aparece novamente.",
        },
        {
          tipo: "subtitulo",
          texto: "Parte 5 — Mostrando opções",
        },
        {
          tipo: "codigo",
          conteudo: `let opcao = prompt(
    "Escolha uma opção:\\n" +
    "1 - Ver saldo\\n" +
    "2 - Depositar\\n" +
    "3 - Sacar\\n" +
    "4 - Sair"
);`,
        },
        {
          tipo: "texto",
          texto: "Aqui mostramos um menu usando \\n para quebrar linha.",
        },
      ],
    },
    {
      id: "parte-6-usando-if-else",
      titulo: "Parte 6 — Usando IF / ELSE",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Opção 1 — Ver saldo",
        },
        {
          tipo: "codigo",
          conteudo: `if (opcao === "1") {
    console.log("Seu saldo é: R$ " + saldo);`,
        },
        {
          tipo: "texto",
          texto: "Se escolher 1, mostramos o saldo.",
        },
        {
          tipo: "subtitulo",
          texto: "Opção 2 — Depositar",
        },
        {
          tipo: "codigo",
          conteudo: `} else if (opcao === "2") {
    let deposito = parseFloat(prompt("Digite o valor para depositar:"));
    saldo = saldo + deposito;
    console.log("Depósito realizado. Novo saldo: R$ " + saldo);`,
        },
        {
          tipo: "lista",
          itens: ["Pedimos valor","Somamos ao saldo","Mostramos novo saldo"],
        },
        {
          tipo: "subtitulo",
          texto: "Opção 3 — Sacar",
        },
        {
          tipo: "codigo",
          conteudo: `} else if (opcao === "3") {
    let saque = parseFloat(prompt("Digite o valor para sacar:"));`,
        },
        {
          tipo: "texto",
          texto: "Pedimos valor do saque.",
        },
        {
          tipo: "texto",
          texto: "Agora validamos:",
        },
        {
          tipo: "codigo",
          conteudo: `if (saque <= saldo) {
    saldo = saldo - saque;
    console.log("Saque realizado. Novo saldo: R$ " + saldo);
} else {
    console.log("Saldo insuficiente!");
}`,
        },
        {
          tipo: "texto",
          texto: "Se tiver saldo suficiente, subtrai. Se não, mostra erro.",
        },
        {
          tipo: "subtitulo",
          texto: "Opção 4 — Sair",
        },
        {
          tipo: "codigo",
          conteudo: `} else if (opcao === "4") {
    continuar = false;
    console.log("Obrigado por usar o caixa eletrônico.");`,
        },
        {
          tipo: "texto",
          texto: "Muda continuar para false e encerra o loop.",
        },
        {
          tipo: "subtitulo",
          texto: "Opção inválida",
        },
        {
          tipo: "codigo",
          conteudo: `} else {
    console.log("Opção inválida!");
}`,
        },
        {
          tipo: "texto",
          texto: "Se digitar algo diferente de 1, 2, 3 ou 4.",
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
          conteudo: "caixaEletronico();",
        },
      ],
    },
    {
      id: "codigo-completo",
      titulo: "Código Completo",
      blocos: [
        {
          tipo: "codigo",
          conteudo: `function caixaEletronico() {
    let saldo = 1000;
    let continuar = true;

    while (continuar) {
        let opcao = prompt(
            "Escolha uma opção:\\n" +
            "1 - Ver saldo\\n" +
            "2 - Depositar\\n" +
            "3 - Sacar\\n" +
            "4 - Sair"
        );

        if (opcao === "1") {
            console.log("Seu saldo é: R$ " + saldo);

        } else if (opcao === "2") {
            let deposito = parseFloat(prompt("Digite o valor para depositar:"));
            saldo = saldo + deposito;
            console.log("Depósito realizado. Novo saldo: R$ " + saldo);

        } else if (opcao === "3") {
            let saque = parseFloat(prompt("Digite o valor para sacar:"));

            if (saque <= saldo) {
                saldo = saldo - saque;
                console.log("Saque realizado. Novo saldo: R$ " + saldo);
            } else {
                console.log("Saldo insuficiente!");
            }

        } else if (opcao === "4") {
            continuar = false;
            console.log("Obrigado por usar o caixa eletrônico.");

        } else {
            console.log("Opção inválida!");
        }
    }
}

caixaEletronico();`,
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
