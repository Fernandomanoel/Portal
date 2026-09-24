import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/logica-programacao-avancada.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Além do Básico — Lógica Avançada",
  introducao: "Lógica de Programação",
  itens: [
    {
      id: "preparando-para-o-nivel-programador-pro",
      titulo: "Preparando para o nível \"Programador Pro\"",
      blocos: [
        {
          tipo: "texto",
          texto: "Na primeira atividade, você aprendeu os alicerces: algoritmos, variáveis e decisões com se / senao. Agora é hora de dar um passo além, trabalhando com estruturas de dados (que guardam várias informações de uma vez) e modularização (que organiza o código em blocos reutilizáveis). São exatamente esses conceitos que separam quem só resolve exercícios simples de quem consegue montar programas maiores e mais organizados.",
        },
      ],
    },
    {
      id: "listas-inteligentes-os-vetores",
      titulo: "Listas inteligentes: os vetores",
      blocos: [
        {
          tipo: "texto",
          texto: "Imagine que você precisa guardar as notas de 50 alunos. Criar 50 variáveis (nota1, nota2, nota3... nota50) seria péssimo: o código ficaria enorme e repetitivo, e ainda seria quase impossível percorrer todas elas automaticamente. É exatamente para isso que existem os vetores (também chamados de arrays).",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "A analogia dos armários numerados",
          texto: "Pense em um vetor como uma fileira de armários pequenos, todos com o mesmo nome na porta principal, mas numerados por dentro: armário 0, armário 1, armário 2... Cada número é chamado de índice. Para guardar ou consultar um valor, você não precisa de um nome novo — só precisa dizer o número do armário que quer abrir.",
        },
        {
          tipo: "texto",
          texto: "Em Portugol, um vetor de 5 números reais é declarado assim:",
        },
        {
          tipo: "codigo",
          conteudo: "real notas[5]",
        },
        {
          tipo: "texto",
          texto: "Isso cria 5 \"armários\" numerados de 0 a 4 — repare que a contagem começa em 0, não em 1. Essa é uma regra praticamente universal em programação.",
        },
        {
          tipo: "texto",
          texto: "notas[0]",
        },
        {
          tipo: "texto",
          texto: "7.5",
        },
        {
          tipo: "texto",
          texto: "notas[1]",
        },
        {
          tipo: "texto",
          texto: "8.0",
        },
        {
          tipo: "texto",
          texto: "notas[2]",
        },
        {
          tipo: "texto",
          texto: "6.0",
        },
        {
          tipo: "texto",
          texto: "notas[3]",
        },
        {
          tipo: "texto",
          texto: "9.5",
        },
        {
          tipo: "texto",
          texto: "notas[4]",
        },
        {
          tipo: "texto",
          texto: "10.0",
        },
        {
          tipo: "texto",
          texto: "Para acessar o valor guardado na terceira posição, por exemplo, usamos notas[2] (lembrando que a posição \"terceira\" corresponde ao índice 2, já que começamos do 0). Isso permite usar um laço de repetição para preencher ou ler todas as posições automaticamente, em vez de escrever uma linha para cada aluno.",
        },
      ],
    },
    {
      id: "vetor-x-matriz-de-uma-dimensao-para-duas",
      titulo: "Vetor x matriz: de uma dimensão para duas",
      blocos: [
        {
          tipo: "texto",
          texto: "Um vetor tem apenas uma dimensão — é uma única fileira de armários, um atrás do outro. Já uma matriz tem duas dimensões: é como um armário dentro de outro armário, organizado em linhas e colunas, parecido com um tabuleiro de jogo da velha ou uma planilha do Excel.",
        },
        {
          tipo: "texto",
          texto: "Para acessar uma posição de uma matriz, você precisa de dois índices: um para a linha e outro para a coluna. Uma matriz 3x3 declarada como inteiro mat[3][3] se organiza assim:",
        },
        {
          tipo: "tabela",
          colunas: ["mat[0][0]","mat[0][1]","mat[0][2]"],
          linhas: [
            ["mat[1][0]","mat[1][1]","mat[1][2]"],
            ["mat[2][0]","mat[2][1]","mat[2][2]"],
          ],
        },
        {
          tipo: "texto",
          texto: "Para percorrer uma matriz inteira, usamos um laço dentro de outro laço — chamado de laços aninhados: o laço de fora anda pelas linhas, e para cada linha, o laço de dentro anda por todas as colunas daquela linha. Vamos ver isso em ação no Desafio 3.",
        },
      ],
    },
    {
      id: "funcoes-reutilizando-codigo",
      titulo: "Funções: reutilizando código",
      blocos: [
        {
          tipo: "texto",
          texto: "Conforme um programa cresce, é comum precisar repetir o mesmo cálculo em vários lugares — por exemplo, calcular a área de um retângulo várias vezes, em pontos diferentes do programa. Copiar e colar o mesmo código várias vezes é uma péssima prática: se um dia você precisar corrigir um erro nesse cálculo, vai ter que lembrar de corrigir em todos os lugares onde ele foi copiado.",
        },
        {
          tipo: "texto",
          texto: "A solução é criar uma função: um bloco de código com nome próprio, que recebe alguns valores de entrada (chamados de parâmetros), faz um processamento, e devolve um resultado através de um retorno. Depois de criada, a função pode ser chamada (usada) quantas vezes forem necessárias, em qualquer parte do programa, sem repetir o código.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "O que é \"retorno\"?",
          texto: "Retornar um valor é a função \"devolver\" um resultado para quem a chamou, assim como uma calculadora devolve o resultado de uma conta quando você aperta \"=\". A palavra-chave retorne em Portugol indica exatamente qual valor a função vai devolver.",
        },
        {
          tipo: "texto",
          texto: "Essa prática de evitar repetir código tem até um nome conhecido no mundo da programação profissional: DRY (do inglês Don't Repeat Yourself, \"não se repita\").",
        },
      ],
    },
    {
      id: "laco-enquanto-x-laco-para",
      titulo: "Laço enquanto x laço para",
      blocos: [
        {
          tipo: "texto",
          texto: "Na primeira atividade de lógica você trabalhou com decisões (se/senao). Aqui, os desafios usam bastante os laços de repetição (também chamados de loops), que fazem o programa repetir um bloco de instruções várias vezes sem precisar copiar e colar o código.",
        },
        {
          tipo: "tabela",
          colunas: ["Laço","Quando usar","Como funciona"],
          linhas: [
            [
              "para",
              "Quando você já sabe quantas vezes quer repetir.",
              "Repete um número fixo de vezes, controlado por um contador (ex: de 0 até 4, 5 vezes).",
            ],
            [
              "enquanto",
              "Quando você não sabe de antemão quantas vezes vai repetir — depende de uma condição.",
              "Repete enquanto uma condição continuar verdadeira. Pode repetir 0, 1 ou 100 vezes — depende do que o usuário digitar.",
            ],
          ],
        },
        {
          tipo: "texto",
          texto: "Um bom exemplo: se você quer pedir 5 notas, sabe exatamente que vai repetir 5 vezes — use para. Mas se você quer insistir até o usuário digitar um valor válido, você não sabe quantas tentativas ele vai precisar — use enquanto.",
        },
        {
          tipo: "codigo",
          conteudo: `para (inteiro i = 0; i < 5; i++) {
    // repete exatamente 5 vezes, com i valendo 0, 1, 2, 3 e 4
}

enquanto (condição) {
    // repete enquanto a condição continuar verdadeira
}`,
        },
      ],
    },
    {
      id: "os-5-desafios-programador-pro",
      titulo: "Os 5 desafios \"Programador Pro\"",
      blocos: [
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Desafio 1 · Média com vetores Digite 5 notas e calcule a média, usando um vetor para guardar todas as notas em vez de 5 variáveis separadas. real notas[5], soma = 0.0, media para (inteiro i = 0; i < 5; i++) { escreva(\"Nota aluno \", i + 1, \": \") leia(notas[i]) soma = soma + notas[i] } media = soma / 5 escreva(\"Média da turma: \", media) O laço para roda 5 vezes, com i indo de 0 a 4. A cada volta, lemos uma nota e guardamos direto na posição notas[i] do vetor, já somando o valor em soma. Ao final, dividimos a soma total por 5 para obter a média.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Desafio 2 · Busca em vetor Preencha um vetor com 5 valores e depois procure um número específico dentro dele — é assim que, por exemplo, um sistema procura um produto pelo código. inteiro nums[5], busca, i logico encontrado = falso para (i = 0; i < 5; i++) { escreva(\"Digite valor \", i+1, \": \") leia(nums[i]) } escreva(\"Qual valor buscar? \") leia(busca) para (i = 0; i < 5; i++) { se (nums[i] == busca) { escreva(\"Encontrado na posição \", i) encontrado = verdadeiro } } se (nao encontrado) { escreva(\"Valor não encontrado!\") } Primeiro laço: preenche as 5 posições do vetor. Segundo laço: percorre o vetor de novo, comparando cada posição com o valor buscado (nums[i] == busca). Quando encontra, marca a variável lógica encontrado como verdadeiro. No final, se nenhuma posição bateu, nao encontrado continua verdadeiro e a mensagem de \"não encontrado\" é exibida.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Desafio 3 · Matriz 3x3 Preencha e exiba uma matriz 3x3 (3 linhas por 3 colunas) usando laços aninhados — um laço para dentro de outro laço para. inteiro mat[3][3], i, j para (i = 0; i < 3; i++) { para (j = 0; j < 3; j++) { escreva(\"mat[\", i, \"][\", j, \"]: \") leia(mat[i][j]) } } escreva(\"--- Matriz ---\") para (i = 0; i < 3; i++) { para (j = 0; j < 3; j++) { escreva(mat[i][j], \" \") } escreva(\"\\n\") } No primeiro par de laços, i controla a linha e j controla a coluna — para cada linha (0, 1, 2), o laço interno percorre todas as 3 colunas, lendo um valor por vez em mat[i][j]. No segundo par de laços, a mesma lógica é usada para exibir a matriz: ao terminar de imprimir uma linha inteira, o comando escreva(\"\\n\") pula para a linha seguinte na tela.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Desafio 4 · Funções e retorno Crie uma função que calcula a área de um retângulo e chame-a a partir do programa principal. funcao real calcularArea(real base, real altura) { retorne base * altura } real b, h, area escreva(\"Base: \") leia(b) escreva(\"Altura: \") leia(h) area = calcularArea(b, h) escreva(\"Área = \", area) A função calcularArea recebe dois parâmetros (base e altura, ambos do tipo real) e devolve, com retorne, o resultado da multiplicação entre eles. No programa principal, lemos a base e a altura digitadas pelo usuário e chamamos a função passando esses dois valores: calcularArea(b, h). O valor retornado é guardado na variável area e depois exibido na tela. Se amanhã você precisar calcular a área de um retângulo em outro ponto do programa, basta chamar calcularArea(...) de novo — sem reescrever a conta.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Desafio 5 · Validação de dados Faça o programa rejeitar notas inválidas até o usuário digitar um valor entre 0 e 10 — um uso clássico do laço enquanto, já que não sabemos de antemão quantas tentativas o usuário vai precisar. real nota escreva(\"Digite uma nota (0 a 10): \") leia(nota) enquanto (nota < 0 ou nota > 10) { escreva(\"Nota inválida! Digite novamente: \") leia(nota) } escreva(\"Nota válida: \", nota) O programa lê a primeira nota e entra no laço enquanto, que testa a condição nota < 0 ou nota > 10. Enquanto essa condição continuar verdadeira (ou seja, enquanto a nota continuar fora do intervalo permitido), o programa pede um novo valor repetidamente. Assim que o usuário digitar uma nota válida, a condição vira falsa, o laço para automaticamente, e o programa segue em frente exibindo a nota aceita.",
        },
      ],
    },
    {
      id: "conclusao-rumo-ao-programador-pro",
      titulo: "Conclusão: rumo ao \"Programador Pro\"",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Conceito","Função profissional"],
          linhas: [
            ["Vetores / Matrizes","Organização de dados em massa"],
            ["Funções","Reutilização de código e código limpo (princípio DRY)"],
            ["Validação (enquanto)","Segurança e robustez do software"],
          ],
        },
        {
          tipo: "texto",
          texto: "Próximo passo:",
        },
      ],
    },
  ],
};

export default atividade;
