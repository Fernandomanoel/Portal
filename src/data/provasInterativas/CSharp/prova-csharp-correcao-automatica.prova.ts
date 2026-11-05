import type { ProvaInterativa, VerificacaoCodigo } from "@/types/quiz";

/**
 * Prova de C# feita inteira no portal: o aluno escreve o código no próprio
 * campo da questão e usa «Testar resposta» (3 tentativas por questão). Não
 * precisa do Visual Studio nem de nenhum outro programa. O código não é
 * executado: o servidor confere, por expressão regular, os requisitos de cada
 * questão (sobre o código sem comentários), aceitando as variações comuns de
 * espaçamento e de escrita. As questões de resultado (valor de uma expressão,
 * saída de um laço) são de resposta objetiva.
 * Cada questão vale 1 ponto; a nota é acertos ÷ questões × 10.
 */
const v = (descricao: string, padrao: string): VerificacaoCodigo => ({ descricao, padrao });
const ESCREVER = String.raw`Console\s*\.\s*Write(?:Line)?\s*\(`;
const LER = String.raw`Console\s*\.\s*ReadLine\s*\(\s*\)`;

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Prova de C#",
  introducao:
    "Prova de C# feita aqui mesmo, sem abrir nenhum outro programa. Escreva o código no campo de cada questão e use «Testar resposta»: os testes mostram o que ainda falta. Cada questão vale 1 ponto e você tem 3 testes por questão.",
  itens: [
    {
      titulo: "Questão 1: Nomes de variáveis (1 pt)",
      enunciado: "Marque TODOS os nomes que são válidos como nome de variável em C#.",
      campos: [
        {
          id: "nomes",
          rotulo: "Nomes válidos:",
          regra: { tipo: "marcar", opcoes: ["idade", "2nota", "_total", "nome completo", "valor1", "class"], corretas: [0, 2, 4] },
        },
      ],
      mensagemCerta: "Isso mesmo! O nome começa com letra ou _, não tem espaço e não pode ser palavra reservada.",
      mensagemErrada: "Lembre: o nome começa com letra ou _ (nunca número), não tem espaço e não pode ser uma palavra reservada como class.",
    },
    {
      titulo: "Questão 2: Operadores e precedência (1 pt)",
      enunciado: "Considere o código abaixo. Qual é o valor final de r?",
      exemplo: { rotulo: "Código", conteudo: "int r = 17 % 5 + 3 * 2;" },
      campos: [{ id: "r", rotulo: "Valor de r:", regra: { tipo: "numero", esperado: 8, tolerancia: 0 } }],
      mensagemCerta: "Correto! 17 % 5 = 2 (o resto) e 3 * 2 = 6; 2 + 6 = 8.",
      mensagemErrada: "Resolva primeiro o % e o * (têm precedência sobre o +): 17 % 5 é o resto da divisão e 3 * 2 é a multiplicação.",
    },
    {
      titulo: "Questão 3: Variáveis e tipos (1 pt)",
      enunciado:
        'Declare quatro variáveis com o tipo certo: nome = "Ana" (texto), idade = 20 (inteiro), altura = 1.65 (número com casas decimais) e ativo = true (verdadeiro ou falso). Depois exiba a idade com Console.WriteLine.',
      exemplo: { rotulo: "Saída esperada", conteudo: "20" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v('string nome = "Ana";', String.raw`\bstring\s+nome\s*=\s*"Ana"\s*;`),
              v("int idade = 20;", String.raw`\bint\s+idade\s*=\s*20\s*;`),
              v("double altura = 1.65;", String.raw`\b(?:double|float|decimal)\s+altura\s*=\s*1\.65\s*[dDfFmM]?\s*;`),
              v("bool ativo = true;", String.raw`\bbool\s+ativo\s*=\s*true\s*;`),
              v("Console.WriteLine exibindo a idade", String.raw`Console\s*\.\s*WriteLine\s*\(\s*idade\s*\)`),
            ],
          },
        },
      ],
      mensagemCerta: "Parabéns! Você declarou as variáveis com os tipos certos e exibiu a idade.",
      mensagemErrada: "Revise: string para texto (entre aspas duplas), int para inteiro, double para decimal (com ponto), bool para true/false, e cada linha termina com ponto e vírgula.",
    },
    {
      titulo: "Questão 4: Entrada e saída (1 pt)",
      enunciado: "Peça o nome do usuário, leia com Console.ReadLine() e mostre a mensagem «Olá, » seguida do nome digitado.",
      exemplo: { rotulo: "Exemplo de entrada/saída", conteudo: "Digite seu nome: Carlos\nOlá, Carlos" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Pede o nome com Console.Write ou Console.WriteLine", ESCREVER),
              v("Lê o nome com Console.ReadLine()", LER),
              v("Guarda o texto lido numa variável", String.raw`\bstring\s+\w+\s*=\s*${LER}|\bvar\s+\w+\s*=\s*${LER}|\b\w+\s*=\s*${LER}`),
              v("Exibe «Olá, » e o nome (concatenação com + ou interpolação com $)", String.raw`"Olá,\s*"\s*\+|\$"Olá,\s*\{|Write(?:Line)?\s*\(\s*"Olá,\s*\{0\}"\s*,`),
            ],
          },
        },
      ],
      mensagemCerta: "Muito bem! Você leu o nome e montou a saudação.",
      mensagemErrada: "Use Console.ReadLine() para ler, guarde numa variável string e junte com a saudação: \"Olá, \" + nome ou $\"Olá, {nome}\".",
    },
    {
      titulo: "Questão 5: Decisão com if / else if / else (1 pt)",
      enunciado:
        "Dada a variável double nota, exiba «Aprovado» se a nota for maior ou igual a 7, «Recuperação» se for maior ou igual a 5 (e menor que 7) e «Reprovado» nos outros casos. Use if, else if e else.",
      exemplo: { rotulo: "Exemplos", conteudo: "nota = 8   → Aprovado\nnota = 6   → Recuperação\nnota = 3   → Reprovado" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("if (...) com a nota >= 7", String.raw`\bif\s*\(\s*nota\s*>=\s*7(?:\.0)?\s*\)`),
              v("else if (...) com a nota >= 5", String.raw`\belse\s+if\s*\(\s*nota\s*>=\s*5(?:\.0)?\s*\)`),
              v("else final", String.raw`\belse\s*(?:\{|Console)`),
              v("Exibe «Aprovado»", String.raw`${ESCREVER}\s*"Aprovado"`),
              v("Exibe «Recuperação»", String.raw`${ESCREVER}\s*"Recupera[cç][aã]o"`),
              v("Exibe «Reprovado»", String.raw`${ESCREVER}\s*"Reprovado"`),
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! A decisão cobre os três casos.",
      mensagemErrada: "Confira: if (nota >= 7), else if (nota >= 5), else, cada um com o seu Console.WriteLine.",
    },
    {
      titulo: "Questão 6: Condição em C# (1 pt)",
      enunciado: "Em C#, sendo x uma variável int, o que acontece com o comando if (x = 5) { ... }?",
      campos: [
        {
          id: "resposta",
          rotulo: "Escolha a alternativa certa:",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Compara x com 5, como em qualquer outra linguagem",
              "Dá erro de compilação: a condição precisa ser bool, e x = 5 é uma atribuição que dá int",
              "Executa sempre o bloco e não altera o x",
              "Troca o valor de x por 5 e executa o bloco só quando x era 5",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Isso mesmo! Em C# a condição do if precisa ser bool: para comparar, use ==.",
      mensagemErrada: "Lembre: = atribui e == compara. Em C#, a condição do if só aceita bool, e uma atribuição de int não é bool.",
    },
    {
      titulo: "Questão 7: Laço for (1 pt)",
      enunciado: "Use um laço for para somar os números de 1 a 10 e exiba o total (55).",
      exemplo: { rotulo: "Saída esperada", conteudo: "55" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Variável acumuladora começando em zero", String.raw`\bint\s+\w+\s*=\s*0\s*;`),
              v("for de 1 até 10", String.raw`\bfor\s*\(\s*int\s+\w+\s*=\s*1\s*;\s*\w+\s*(?:<=\s*10|<\s*11)\s*;\s*(?:\w+\s*\+\+|\+\+\s*\w+|\w+\s*\+=\s*1)\s*\)`),
              v("Soma dentro do laço (+= ou x = x + i)", String.raw`\w+\s*\+=\s*\w+\s*;|\b(\w+)\s*=\s*\1\s*\+\s*\w+\s*;`),
              v("Exibe o total com Console.WriteLine", String.raw`Console\s*\.\s*WriteLine\s*\(\s*\w+\s*\)|Console\s*\.\s*WriteLine\s*\(\s*\$?"[^"]*\{?\w*\}?[^"]*"\s*\+?\s*\w*`),
            ],
          },
        },
      ],
      mensagemCerta: "Ótimo! O laço soma de 1 a 10.",
      mensagemErrada: "Use: int soma = 0; for (int i = 1; i <= 10; i++) { soma += i; } e depois Console.WriteLine(soma);",
    },
    {
      titulo: "Questão 8: Acompanhando um laço (1 pt)",
      enunciado: "Considere o código abaixo. Qual é o valor de s ao final?",
      exemplo: { rotulo: "Código", conteudo: "int s = 0;\nfor (int i = 1; i <= 4; i++)\n{\n    s += i * i;\n}" },
      campos: [{ id: "s", rotulo: "Valor de s:", regra: { tipo: "numero", esperado: 30, tolerancia: 0 } }],
      mensagemCerta: "Correto! 1 + 4 + 9 + 16 = 30.",
      mensagemErrada: "Acompanhe volta por volta: a cada i, soma-se i * i (1, 4, 9 e 16).",
    },
    {
      titulo: "Questão 9: Método com retorno (1 pt)",
      enunciado:
        "Crie um método estático chamado Dobro que receba um int e retorne o dobro dele. Depois chame o método com o valor 7 e exiba o resultado (14).",
      exemplo: { rotulo: "Saída esperada", conteudo: "14" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Declaração: static int Dobro(int n)", String.raw`\bstatic\s+int\s+Dobro\s*\(\s*int\s+\w+\s*\)`),
              v("return com o dobro do parâmetro", String.raw`\breturn\s+(?:\w+\s*\*\s*2|2\s*\*\s*\w+|\w+\s*\+\s*\w+)\s*;`),
              v("Chamada Dobro(7)", String.raw`\bDobro\s*\(\s*7\s*\)`),
              v("Exibe o resultado com Console.WriteLine", String.raw`Console\s*\.\s*WriteLine\s*\(`),
            ],
          },
        },
      ],
      mensagemCerta: "Muito bem! O método retorna o dobro e foi chamado com 7.",
      mensagemErrada: "Escreva: static int Dobro(int n) { return n * 2; } e depois Console.WriteLine(Dobro(7));",
    },
    {
      titulo: "Questão 10: Classe e objeto (1 pt)",
      enunciado:
        "Crie a classe Pessoa com as propriedades Nome (string) e Idade (int), e um método público Apresentar() que não retorna nada e exibe o nome e a idade. Depois crie um objeto da classe, preencha as propriedades e chame o método.",
      exemplo: { rotulo: "Exemplo de uso", conteudo: 'var p = new Pessoa();\np.Nome = "Lia";\np.Idade = 30;\np.Apresentar();   // Lia, 30 anos' },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("class Pessoa", String.raw`\bclass\s+Pessoa\b`),
              v("Propriedade public string Nome { get; set; }", String.raw`\bpublic\s+string\s+Nome\s*\{\s*get\s*;\s*set\s*;\s*\}`),
              v("Propriedade public int Idade { get; set; }", String.raw`\bpublic\s+int\s+Idade\s*\{\s*get\s*;\s*set\s*;\s*\}`),
              v("Método public void Apresentar()", String.raw`\bpublic\s+void\s+Apresentar\s*\(\s*\)`),
              v("Método exibe com Console.WriteLine", String.raw`Console\s*\.\s*WriteLine\s*\(`),
              v("Cria o objeto com new Pessoa()", String.raw`\bnew\s+Pessoa\s*\(\s*\)`),
              v("Chama o método Apresentar()", String.raw`\w+\s*\.\s*Apresentar\s*\(\s*\)\s*;`),
            ],
          },
        },
      ],
      mensagemCerta: "Parabéns! Você criou a classe, instanciou o objeto e chamou o método.",
      mensagemErrada: "Confira: class Pessoa com public string Nome { get; set; }, public int Idade { get; set; }, public void Apresentar(), e depois new Pessoa() e a chamada p.Apresentar();",
    },
  ],
};

export default prova;
