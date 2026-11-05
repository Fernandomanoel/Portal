import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "C# é uma linguagem de programação moderna da plataforma .NET, usada em sistemas, sites, jogos (Unity) e aplicativos. O curso cobre lógica básica (variáveis, decisões, laços), métodos e programação orientada a objetos (classes e objetos).",
  topicos: [
    {
      titulo: "Estrutura de um programa e saída/entrada",
      texto: [
        "Um programa C# executa a partir do método Main. Para exibir usa-se Console.WriteLine() (com quebra de linha) ou Console.Write(); para ler, Console.ReadLine(), que devolve sempre texto (string). Cada instrução termina com ponto e vírgula, e blocos ficam entre chaves. C# diferencia maiúsculas de minúsculas (Console, e não console).",
      ],
      pontos: ["Escrever e executar um programa que lê e mostra um texto.", "Explicar por que ReadLine devolve texto."],
      erros: ["Esquecer o ponto e vírgula.", "Escrever console em minúscula."],
    },
    {
      titulo: "Variáveis, tipos e operadores",
      texto: [
        "C# é fortemente tipado: toda variável tem um tipo declarado. Tipos básicos: int (inteiro), double (decimal), decimal (valores monetários), bool, char e string. Para converter texto em número usa-se int.Parse(), double.Parse() ou Convert.ToInt32(). Operadores: + - * / % (a divisão de dois int é inteira). Precedência: multiplicação e divisão antes de soma e subtração.",
      ],
      pontos: ["Escolher o tipo adequado para cada valor.", "Converter uma string em número."],
      exemplo: "int r = 17 % 5 + 3 * 2; // r vale 8",
      erros: ["Dividir inteiros e esperar casas decimais (7 / 2 é 3)."],
    },
    {
      titulo: "Decisões e repetições",
      texto: [
        "if / else if / else decide. A condição precisa ser um bool: em C# if (x = 5) não compila, o certo é if (x == 5). switch trata muitas opções. Laços: for (contagem), while e do...while (repete ao menos uma vez) e foreach (percorre coleções). Operadores lógicos: && (e), || (ou), ! (não).",
      ],
      pontos: ["Escrever if/else com &&.", "Somar de 1 a 10 com um laço for."],
      exemplo: "int soma = 0;\nfor (int i = 1; i <= 10; i++) { soma += i; }",
    },
    {
      titulo: "Métodos",
      texto: [
        "Método é um bloco de código com nome, que pode receber parâmetros e devolver um valor (o tipo de retorno; void quando não devolve). Evita repetição e deixa o programa organizado. Exemplo: static int Dobro(int n) { return n * 2; }.",
      ],
      pontos: ["Criar um método com parâmetro e retorno.", "Chamar um método e usar o valor devolvido."],
    },
    {
      titulo: "Classes e objetos (orientação a objetos)",
      texto: [
        "Classe é o molde; objeto é uma instância criada a partir dele, com new. A classe tem propriedades (dados, como Nome e Idade, escritas como public string Nome { get; set; }) e métodos (comportamentos, como Apresentar()). A orientação a objetos organiza o programa em objetos que combinam dados e comportamentos. Pilares: encapsulamento, herança e polimorfismo.",
      ],
      pontos: ["Criar uma classe com propriedades e um método.", "Instanciar um objeto e usá-lo.", "Diferenciar classe de objeto."],
      exemplo: "var p = new Pessoa();\np.Nome = \"Lia\";\np.Apresentar();",
      erros: ["Chamar o método sem criar o objeto antes."],
    },
    {
      titulo: "Coleções básicas",
      texto: [
        "Arrays têm tamanho fixo: int[] notas = new int[5]. List<T> cresce dinamicamente: var nomes = new List<string>(); nomes.Add(\"Ana\"). Percorre-se com foreach e conta-se com .Count (lista) ou .Length (array).",
      ],
      pontos: ["Usar uma List e percorrê-la."],
    },
  ],
  glossario: [
    { termo: ".NET", definicao: "Plataforma da Microsoft para criar aplicações em C# e outras linguagens." },
    { termo: "Classe", definicao: "Molde que define dados e comportamentos de um tipo de objeto." },
    { termo: "Objeto", definicao: "Instância de uma classe." },
    { termo: "Propriedade", definicao: "Dado de uma classe, acessado com get e set." },
    { termo: "Método", definicao: "Bloco de código com nome que executa uma ação." },
    { termo: "Tipagem forte", definicao: "Cada variável tem um tipo definido, e o compilador confere." },
  ],
  dicas: [
    "Use o Visual Studio Community ou o VS Code com .NET: o editor aponta os erros antes de rodar.",
    "Explique orientação a objetos com exemplos reais (Pessoa, Produto, Conta bancária).",
    "Peça que o aluno leia os erros do compilador: costumam indicar linha e causa.",
  ],
};

export default conteudo;
