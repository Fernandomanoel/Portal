import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Lógica de programação é a forma de pensar e escrever passos claros para resolver um problema. É a base de qualquer linguagem. O curso usa algoritmos em português estruturado (Portugol): variáveis, entrada e saída, decisões, repetições, vetores, matrizes e funções.",
  topicos: [
    {
      titulo: "Algoritmos: receitas de passos",
      texto: [
        "Algoritmo é uma sequência finita e ordenada de instruções para resolver um problema, como uma receita. Pode ser descrito em português, em fluxograma ou em pseudocódigo (Portugol). Um bom algoritmo é claro, tem começo e fim e não deixa dúvida sobre cada passo. O computador só executa o que está escrito, exatamente na ordem.",
      ],
      pontos: ["Escrever um algoritmo do dia a dia (trocar um pneu, fazer um café).", "Explicar por que a ordem dos passos importa."],
      atividades: ["logica-programacao-fundamentos"],
    },
    {
      titulo: "Variáveis, tipos, entrada e saída",
      texto: [
        "Variável é um espaço da memória com nome, que guarda um valor. Tipos: inteiro, real (decimal), caractere (texto) e lógico (verdadeiro ou falso). Entrada de dados é receber do usuário (leia); saída é mostrar um resultado (escreva). Em geral: declarar, ler, calcular e mostrar.",
      ],
      pontos: ["Declarar variáveis de tipos diferentes.", "Fazer um programa que leia dois números e mostre a soma."],
      exemplo: "leia(a, b)\nsoma <- a + b\nescreva(soma)",
      atividades: ["logica-programacao-fundamentos"],
    },
    {
      titulo: "Estruturas de decisão: SE / SENÃO",
      texto: [
        "A decisão executa um bloco só quando uma condição for verdadeira. Em Portugol: SE condição ENTÃO ... SENÃO ... FIMSE. As condições usam operadores relacionais (>, <, =, <>) e lógicos (E, OU, NÃO). Exemplos clássicos: verificar maioridade, par ou ímpar, aprovação pela média.",
        "Par ou ímpar: se o resto da divisão por 2 for 0, é par.",
      ],
      pontos: ["Escrever uma decisão simples e uma com SENÃO.", "Usar E e OU."],
      erros: ["Confundir atribuição (<-) com comparação (=)."],
      atividades: ["logica-programacao-fundamentos"],
    },
    {
      titulo: "Estruturas de repetição",
      texto: [
        "Repetição executa um bloco várias vezes. PARA conta um número conhecido de voltas; ENQUANTO repete enquanto uma condição for verdadeira (o número de voltas pode não ser conhecido). Cuidado com o laço infinito, quando a condição nunca muda para falsa. Contadores (somam 1) e acumuladores (somam valores) são padrões frequentes.",
      ],
      pontos: ["Usar PARA e ENQUANTO.", "Fazer uma soma acumulada."],
      exemplo: "soma <- 0\nPARA i DE 1 ATÉ 10 FAÇA\n  soma <- soma + i\nFIMPARA",
      atividades: ["logica-programacao-avancada"],
    },
    {
      titulo: "Vetores, matrizes e funções",
      texto: [
        "Vetor é uma lista de valores do mesmo tipo, acessados por posição (índice). Matriz é uma tabela com linhas e colunas. Função é um bloco com nome, que recebe valores (parâmetros) e devolve um resultado, e permite reaproveitar o código. Validação é verificar se a entrada faz sentido (por exemplo, uma nota entre 0 e 10).",
      ],
      pontos: ["Percorrer um vetor para achar o maior valor.", "Criar uma função simples com retorno."],
      atividades: ["logica-programacao-avancada"],
    },
  ],
  glossario: [
    { termo: "Algoritmo", definicao: "Sequência finita de passos para resolver um problema." },
    { termo: "Portugol", definicao: "Pseudocódigo em português usado para ensinar lógica." },
    { termo: "Variável", definicao: "Espaço de memória com nome que guarda um valor." },
    { termo: "Laço (loop)", definicao: "Estrutura que repete um bloco de instruções." },
    { termo: "Vetor", definicao: "Lista de valores acessados por índice." },
    { termo: "Função", definicao: "Bloco de código reutilizável com nome." },
  ],
  dicas: [
    "Comece com atividades sem computador: escrever o algoritmo de um café, e a turma executa como se fosse o computador.",
    "Faça o «teste de mesa»: acompanhar a execução linha a linha numa tabela de valores das variáveis.",
    "Valorize quem acha o erro no algoritmo do colega.",
  ],
};

export default conteudo;
