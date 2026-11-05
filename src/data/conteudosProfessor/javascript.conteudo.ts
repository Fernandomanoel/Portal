import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "JavaScript é a linguagem que dá comportamento às páginas web e também roda em servidores (Node.js). O curso trabalha a lógica por meio de pequenos programas (análise de números, tabuada, caixa eletrônico, jogo de adivinhação) e termina em uma API REST.",
  topicos: [
    {
      titulo: "Variáveis, tipos e operadores",
      texto: [
        "Variáveis guardam valores: usa-se const para o que não será reatribuído e let para o que muda (evite var). Tipos: number, string, boolean, null, undefined, array e object. Operadores aritméticos (+, -, *, /, %) e de comparação (=== igualdade estrita, !==, >, <). Prefira === a ==, porque não faz conversões inesperadas.",
        "Console.log() mostra valores para conferir o programa.",
      ],
      pontos: ["Declarar variáveis com const e let.", "Usar === para comparar."],
      erros: ["Somar um número com texto e receber concatenação ('2' + 3 = '23')."],
      atividades: ["javascript-analise-numeros"],
    },
    {
      titulo: "Decisões e repetições",
      texto: [
        "if, else if e else tomam decisões. Os laços repetem: for (com contador), while (enquanto a condição valer) e for...of (percorrer listas). Em programas de intervalo (de um número inicial a um final), o laço percorre os valores e o operador % identifica pares (n % 2 === 0) e ímpares.",
      ],
      pontos: ["Escrever um laço for com início, condição e passo.", "Identificar par e ímpar com %."],
      exemplo: "for (let n = inicio; n <= fim; n++) { console.log(n, n % 2 === 0 ? 'par' : 'ímpar'); }",
      erros: ["Laço infinito por esquecer de atualizar o contador."],
      atividades: ["javascript-analise-numeros", "javascript-tabuada-inteligente"],
    },
    {
      titulo: "Funções, entrada do usuário e números aleatórios",
      texto: [
        "Funções agrupam um trecho reutilizável: function somar(a, b) { return a + b; }. Para ler dados no navegador usa-se prompt(); o resultado vem como texto e deve ser convertido com Number() ou parseInt(). Math.random() devolve um decimal entre 0 e 1: para um inteiro de 1 a 50, Math.floor(Math.random() * 50) + 1.",
      ],
      pontos: ["Criar uma função com parâmetros e retorno.", "Gerar um número aleatório em uma faixa."],
      atividades: ["javascript-jogo-adivinhacao", "javascript-caixa-eletronico"],
    },
    {
      titulo: "Programando um fluxo com menu e validação",
      texto: [
        "O simulador de caixa eletrônico une o que já se viu: um saldo (variável), um menu repetido até o usuário sair (laço com while e switch ou if), validações (não sacar mais do que o saldo, valores positivos) e mensagens claras. A validação de entradas é o que separa um programa de treino de um programa utilizável.",
      ],
      pontos: ["Montar um menu com repetição.", "Validar entrada antes de calcular."],
      atividades: ["javascript-caixa-eletronico", "javascript-jogo-adivinhacao"],
    },
    {
      titulo: "API REST com Node.js e Express",
      texto: [
        "API é um conjunto de endereços (rotas) que um programa oferece a outros programas. Em uma API REST, cada rota usa um método HTTP: GET (ler), POST (criar), PUT (alterar) e DELETE (apagar), e responde, em geral, com JSON. Node.js executa JavaScript fora do navegador; o Express simplifica a criação das rotas. Códigos de status comuns: 200 (ok), 201 (criado), 400 (pedido inválido), 404 (não encontrado) e 500 (erro do servidor).",
      ],
      pontos: ["Citar os quatro métodos HTTP principais.", "Explicar o que é JSON e para que serve um código de status."],
      atividades: ["javascript-guia-api-rest"],
    },
  ],
  glossario: [
    { termo: "const / let", definicao: "Formas de declarar variáveis: const não é reatribuída, let pode mudar." },
    { termo: "Função", definicao: "Bloco de código reutilizável com nome." },
    { termo: "Array", definicao: "Lista de valores acessados por índice." },
    { termo: "JSON", definicao: "Formato de texto para troca de dados entre sistemas." },
    { termo: "API REST", definicao: "Interface com rotas e métodos HTTP para acessar dados." },
    { termo: "Node.js", definicao: "Ambiente que executa JavaScript fora do navegador." },
  ],
  dicas: [
    "Peça que o aluno use o console do navegador (F12) para testar trechos pequenos.",
    "Faça o teste de mesa em programas com laços e condições antes de rodar.",
    "Ensine a ler o erro do console: informa o arquivo e a linha.",
  ],
};

export default conteudo;
