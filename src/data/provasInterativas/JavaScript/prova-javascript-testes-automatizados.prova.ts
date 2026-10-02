import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/JavaScript/
 * prova-javascript-testes-automatizados.prova.html): as mesmas 8 questões,
 * cada uma com o botão "Testar resposta" que mostra quais requisitos o código
 * cumpriu e quais faltam, quantas vezes o aluno quiser. A página antiga
 * conferia o texto digitado com `includes`; aqui são verificações por
 * expressão regular, aplicadas pelo servidor sobre o código sem comentários.
 * Aceita as variações comuns (const/let/var, function/arrow, if/ternário).
 * A prova é travada: ao entrar, o aluno não sai da tela.
 */
const DECL = String.raw`\b(?:const|let|var)\s+`;
const LOG = String.raw`console\.log\s*\(`;

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Prova de JavaScript",
  introducao: "Escreva o código e use “Testar resposta”: os testes rodam automaticamente e mostram o que ainda falta. Cada questão vale 1,5 ponto.",
  itens: [
    {
      titulo: "Questão 1: Variáveis e console.log (1,5 pts)",
      enunciado: "Crie as variáveis nome = \"Maria\" (string), idade = 28 (number) e ativo = true (boolean). Use console.log() para exibir: \"Maria tem 28 anos\".",
      exemplo: { rotulo: "Exemplo de saída esperada", conteudo: "Maria tem 28 anos" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: 'Variável nome com o valor "Maria"', padrao: `${DECL}nome\\s*=\\s*["'\\x60]Maria["'\\x60]` },
              { descricao: "Variável idade com o valor 28", padrao: `${DECL}idade\\s*=\\s*28\\b` },
              { descricao: "Variável ativo com o valor true", padrao: `${DECL}ativo\\s*=\\s*true\\b` },
              { descricao: 'console.log() exibindo a frase com "anos"', padrao: `${LOG}[^;]*\\banos\\b` },
            ],
          },
        },
      ],
      mensagemCerta: "Parabéns! Você usou variáveis corretamente.",
      mensagemErrada: "Revise: declare as 3 variáveis e use console.log()",
    },
    {
      titulo: "Questão 2: Operações matemáticas (1,5 pts)",
      enunciado: "Crie uma função chamada calcular que receba 2 números como parâmetros e retorne a soma dos números.",
      exemplo: { rotulo: "Exemplo de chamada", conteudo: "const resultado = calcular(5, 3);\nconsole.log(resultado); // Saída: 8" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              {
                descricao: "Função calcular com 2 parâmetros",
                padrao: String.raw`(?:function\s+calcular\s*\(\s*\w+\s*,\s*\w+\s*\)|\b(?:const|let|var)\s+calcular\s*=\s*(?:function\s*)?\(\s*\w+\s*,\s*\w+\s*\))`,
              },
              { descricao: "Retorna a soma dos dois parâmetros", padrao: String.raw`(?:return\s+\(?\s*\w+\s*\+\s*\w+|=>\s*\(?\s*\w+\s*\+\s*\w+)` },
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! Sua função funciona corretamente.",
      mensagemErrada: "Use function/const com return e +",
    },
    {
      titulo: "Questão 3: Condicionais (1,5 pts)",
      enunciado: "Crie uma função chamada verificarIdade que receba a idade como parâmetro e retorne \"Maior de idade\" se idade >= 18 e \"Menor de idade\" se idade < 18.",
      exemplo: { rotulo: "Exemplo de chamada", conteudo: "console.log(verificarIdade(20)); // Saída: Maior de idade\nconsole.log(verificarIdade(15)); // Saída: Menor de idade" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: "Função verificarIdade", padrao: String.raw`(?:function\s+verificarIdade\s*\(|\b(?:const|let|var)\s+verificarIdade\s*=)` },
              { descricao: 'Retorna "Maior de idade"', padrao: String.raw`return\s*["'\x60]Maior de idade["'\x60]|=>\s*\(?\s*["'\x60]Maior de idade["'\x60]|\?\s*["'\x60]Maior de idade["'\x60]` },
              { descricao: 'Retorna "Menor de idade"', padrao: String.raw`return\s*["'\x60]Menor de idade["'\x60]|:\s*["'\x60]Menor de idade["'\x60]` },
              { descricao: "Compara a idade com 18", padrao: String.raw`(?:>=\s*18|<\s*18|>\s*17|<=\s*17|18\s*<=|18\s*>)` },
              { descricao: "Usa if/else ou operador ternário", padrao: String.raw`\bif\s*\(|\?[^:]+:` },
            ],
          },
        },
      ],
      mensagemCerta: "Perfeito! Sua lógica condicional está correta.",
      mensagemErrada: "Use if/else com >= 18",
    },
    {
      titulo: "Questão 4: Arrays (1,5 pts)",
      enunciado: "Crie um array chamado numeros com os números 10, 20, 30, 40, 50. Exiba o primeiro elemento (10), o último elemento (50) e o tamanho do array (5).",
      exemplo: { rotulo: "Exemplo de saída", conteudo: "10\n50\n5" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: "Array numeros com 10, 20, 30, 40, 50", padrao: `${DECL}numeros\\s*=\\s*\\[\\s*10\\s*,\\s*20\\s*,\\s*30\\s*,\\s*40\\s*,\\s*50\\s*,?\\s*\\]` },
              { descricao: "Acessa o primeiro elemento (numeros[0])", padrao: String.raw`numeros\s*\[\s*0\s*\]|numeros\.at\(\s*0\s*\)` },
              { descricao: "Acessa o último elemento", padrao: String.raw`numeros\s*\[\s*(?:4|numeros\.length\s*-\s*1)\s*\]|numeros\.at\(\s*-1\s*\)` },
              { descricao: "Usa numeros.length", padrao: String.raw`numeros\.length` },
              { descricao: "Exibe com console.log()", padrao: LOG },
            ],
          },
        },
      ],
      mensagemCerta: "Ótimo! Você trabalhou com arrays corretamente.",
      mensagemErrada: "Use [] para criar array, [0] para primeiro, .length para tamanho",
    },
    {
      titulo: "Questão 5: Loops - FOR (1,5 pts)",
      enunciado: "Use um loop for para percorrer um array [1, 2, 3, 4, 5] e exibir cada número multiplicado por 2.",
      exemplo: { rotulo: "Exemplo de saída", conteudo: "2\n4\n6\n8\n10" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: "Array [1, 2, 3, 4, 5]", padrao: String.raw`\[\s*1\s*,\s*2\s*,\s*3\s*,\s*4\s*,\s*5\s*,?\s*\]` },
              { descricao: "Loop for", padrao: String.raw`\bfor\s*\(` },
              { descricao: "Multiplica por 2", padrao: String.raw`\*\s*2\b|\b2\s*\*` },
              { descricao: "Exibe com console.log()", padrao: LOG },
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! Seu loop for funciona corretamente.",
      mensagemErrada: "Use for para iterar e multiplicar por 2",
    },
    {
      titulo: "Questão 6: Objetos (1,5 pts)",
      enunciado: "Crie um objeto chamado pessoa com as propriedades nome: \"João\", idade: 30 e profissao: \"Desenvolvedor\". Exiba os dados: \"João, 30 anos, Desenvolvedor\".",
      exemplo: { rotulo: "Exemplo de saída", conteudo: "João, 30 anos, Desenvolvedor" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: "Objeto pessoa", padrao: `${DECL}pessoa\\s*=\\s*\\{` },
              { descricao: 'Propriedade nome: "João"', padrao: String.raw`nome\s*:\s*["'\x60]João["'\x60]` },
              { descricao: "Propriedade idade: 30", padrao: String.raw`idade\s*:\s*30\b` },
              { descricao: 'Propriedade profissao: "Desenvolvedor"', padrao: String.raw`profissao\s*:\s*["'\x60]Desenvolvedor["'\x60]` },
              { descricao: "Exibe as propriedades do objeto com console.log()", padrao: `${LOG}[\\s\\S]*pessoa\\.nome[\\s\\S]*pessoa\\.idade[\\s\\S]*pessoa\\.profissao` },
            ],
          },
        },
      ],
      mensagemCerta: "Perfeito! Você criou um objeto corretamente.",
      mensagemErrada: "Use const pessoa = { nome, idade, profissao }",
    },
    {
      titulo: "Questão 7: forEach (1,5 pts)",
      enunciado: "Use forEach para iterar um array [\"maçã\", \"banana\", \"laranja\"] e exibir cada fruta com número: \"1. maçã\", \"2. banana\", etc.",
      exemplo: { rotulo: "Exemplo de saída", conteudo: "1. maçã\n2. banana\n3. laranja" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: "Array com maçã, banana e laranja", padrao: String.raw`ma[çc][ãa]["'\x60][\s\S]*banana[\s\S]*laranja` },
              { descricao: "Usa forEach com item e índice", padrao: String.raw`\.forEach\s*\(\s*(?:\(\s*\w+\s*,\s*\w+\s*\)|function\s*\(\s*\w+\s*,\s*\w+\s*\))` },
              { descricao: "Numera começando em 1 (índice + 1)", padrao: String.raw`\b\w+\s*\+\s*1\b|\$\{\s*\w+\s*\+\s*1\s*\}` },
              { descricao: "Exibe com console.log()", padrao: LOG },
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! forEach funcionando perfeitamente.",
      mensagemErrada: "Use forEach(item, index) para numerar",
    },
    {
      titulo: "Questão 8: Arrow Functions (1,5 pts)",
      enunciado: "Crie uma arrow function chamada quadrado que receba um número como parâmetro e retorne o número elevado ao quadrado.",
      exemplo: { rotulo: "Exemplo de chamada", conteudo: "console.log(quadrado(5)); // Saída: 25\nconsole.log(quadrado(7)); // Saída: 49" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              { descricao: "Arrow function quadrado com 1 parâmetro", padrao: `${DECL}quadrado\\s*=\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>` },
              { descricao: "Eleva ao quadrado (n ** 2, n * n ou Math.pow)", padrao: String.raw`\w+\s*\*\*\s*2\b|\b(\w+)\s*\*\s*\1\b|Math\.pow\s*\(\s*\w+\s*,\s*2\s*\)` },
            ],
          },
        },
      ],
      mensagemCerta: "Perfeito! Arrow function implementada corretamente.",
      mensagemErrada: "Use const quadrado = n => n ** 2",
    },
  ],
};

export default prova;
