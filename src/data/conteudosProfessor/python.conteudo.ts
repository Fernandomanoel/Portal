import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Python é uma linguagem de programação de leitura fácil, muito usada em análise de dados, automação e inteligência artificial. O curso começa pelo ambiente (Google Colab) e passa por saída e entrada de dados, tipos, operadores e condições.",
  topicos: [
    {
      titulo: "Preparando o ambiente e o primeiro código",
      texto: [
        "Programar é dar instruções ao computador. O Google Colab executa Python no navegador, sem instalar nada: cada célula de código é executada separadamente. O comando print() mostra uma mensagem na tela. Comentários, que começam com #, são ignorados pelo computador e explicam o código.",
        "Os erros fazem parte do aprendizado: a mensagem de erro indica a linha e o tipo do problema (por exemplo, SyntaxError é erro de escrita; NameError, uso de um nome que não existe).",
      ],
      pontos: ["Executar uma célula no Colab.", "Usar print() e comentários.", "Ler uma mensagem de erro simples."],
      atividades: ["python-guia-para-iniciantes", "python-primeiro-codigo"],
    },
    {
      titulo: "Variáveis e tipos de dados",
      texto: [
        "Variável é um nome que guarda um valor: nome = 'Ana'. Os tipos básicos: str (texto, entre aspas), int (inteiro), float (decimal, com ponto) e bool (True ou False). O tipo de um valor decide o que se pode fazer com ele: somar textos junta (concatena), somar números calcula.",
        "Nomes de variáveis começam com letra ou _, não têm espaço e diferenciam maiúscula de minúscula (idade e Idade são diferentes).",
      ],
      pontos: ["Criar variáveis de cada tipo.", "Usar type() para ver o tipo."],
      erros: ["Esquecer as aspas em um texto.", "Usar vírgula no lugar do ponto nos decimais."],
      atividades: ["python-primeiro-codigo", "python-logica-e-variaveis"],
    },
    {
      titulo: "Entrada de dados e conversão de tipos",
      texto: [
        "input() lê o que o usuário digita e sempre devolve texto (str). Para fazer cálculos é preciso converter: int() para inteiro e float() para decimal. As f-strings juntam texto e variáveis com facilidade: f'Olá, {nome}!'.",
      ],
      pontos: ["Ler um número do usuário e calculá-lo.", "Usar f-strings."],
      exemplo: "idade = int(input('Idade: '))\nprint(f'Ano que vem você terá {idade + 1} anos.')",
      erros: ["Somar sem converter: '2' + '3' resulta em '23', e não em 5."],
      atividades: ["python-entrada-de-dados", "python-logica-e-variaveis"],
    },
    {
      titulo: "Operadores matemáticos e de comparação",
      texto: [
        "Operadores aritméticos: + soma, - subtração, * multiplicação, / divisão (sempre decimal), // divisão inteira, % resto e ** potência. Respeitam a precedência (primeiro potência, depois multiplicação e divisão, depois soma e subtração) e se pode usar parênteses. Os operadores de comparação (==, !=, >, <, >=, <=) devolvem True ou False. Atenção: = atribui e == compara.",
      ],
      pontos: ["Usar // e % em exemplos.", "Distinguir = de =="],
      exemplo: "17 // 5 = 3 e 17 % 5 = 2.",
      atividades: ["python-operadores-matematicos"],
    },
    {
      titulo: "Decisões com if, elif e else",
      texto: [
        "A estrutura if executa um bloco quando a condição é verdadeira; elif tenta outra condição; else cobre o restante. Em Python, o que pertence ao bloco fica recuado (indentação) depois dos dois-pontos. Os operadores lógicos and, or e not combinam condições.",
      ],
      pontos: ["Escrever um if/elif/else com indentação correta."],
      erros: ["Erros de indentação.", "Esquecer os dois-pontos."],
      atividades: ["python-atividade-complementar", "python-logica-e-variaveis"],
    },
  ],
  glossario: [
    { termo: "Variável", definicao: "Nome que guarda um valor na memória." },
    { termo: "String (str)", definicao: "Texto." },
    { termo: "Indentação", definicao: "Recuo que define o bloco de código em Python." },
    { termo: "Função", definicao: "Bloco de código com nome, como print() e input()." },
    { termo: "Colab", definicao: "Ambiente do Google para rodar Python no navegador." },
  ],
  dicas: [
    "Peça que o aluno digite o código, em vez de copiar: os erros de digitação ensinam.",
    "Faça previsões antes de executar: «o que você acha que vai aparecer?».",
    "Incentive a leitura em voz alta do erro: «linha 3, nome não definido».",
  ],
};

export default conteudo;
