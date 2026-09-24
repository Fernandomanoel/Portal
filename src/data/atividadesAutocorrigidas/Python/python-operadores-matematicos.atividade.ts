import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/python-operadores-matematicos.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Usando e aprendendo Operadores Matemáticos",
  introducao: "Aprender a usar os operadores matemáticos básicos do Python para fazer cálculos, entender a diferença entre divisão real e divisão inteira, e conhecer os operadores de comparação — que devolvem True ou False e são a base de toda decisão que um programa toma.",
  itens: [
    {
      id: "o-que-sao-operadores-matematicos",
      titulo: "O que são operadores matemáticos?",
      blocos: [
        {
          tipo: "texto",
          texto: "Operadores matemáticos são símbolos usados para realizar cálculos, como soma, subtração, multiplicação e divisão — exatamente como na matemática que você já conhece, só que escritos do jeito que o Python entende.",
        },
        {
          tipo: "tabela",
          colunas: ["Operador","Significado","Exemplo","Resultado"],
          linhas: [
            ["+","Soma","10 + 5","15"],
            ["-","Subtração","10 - 5","5"],
            ["*","Multiplicação","10 * 5","50"],
            ["/","Divisão (real, com decimais)","10 / 5","2.0"],
            ["%","Resto da divisão","10 % 3","1"],
          ],
        },
        {
          tipo: "texto",
          texto: "Vamos ver cada um em código, um de cada vez.",
        },
        {
          tipo: "subtitulo",
          texto: "Soma (+)",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = 10
num2 = 5

soma = num1 + num2
print("Soma:", soma)  # Soma: 15`,
          rotulo: "exemplo",
        },
        {
          tipo: "subtitulo",
          texto: "Subtração (-)",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = 10
num2 = 5

subtracao = num1 - num2
print("Subtração:", subtracao)  # Subtração: 5`,
          rotulo: "exemplo",
        },
        {
          tipo: "subtitulo",
          texto: "Multiplicação (*)",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = 10
num2 = 5

multiplicacao = num1 * num2
print("Multiplicação:", multiplicacao)  # Multiplicação: 50`,
          rotulo: "exemplo",
        },
        {
          tipo: "subtitulo",
          texto: "Resto da divisão (%)",
        },
        {
          tipo: "texto",
          texto: "O operador % (chamado de \"módulo\") mostra o que sobra de uma divisão, não o resultado da divisão em si. É muito usado, por exemplo, para descobrir se um número é par (resto da divisão por 2 igual a zero).",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = 10
num2 = 3

resto = num1 % num2
print("Resto da divisão:", resto)  # Resto da divisão: 1 (pois 10 ÷ 3 = 3, e sobra 1)`,
          rotulo: "exemplo",
        },
      ],
    },
    {
      id: "vs-a-divisao-tem-dois-modos-em-python",
      titulo: "/ vs // — a divisão tem dois modos em Python",
      blocos: [
        {
          tipo: "texto",
          texto: "Aqui vai um detalhe que muita gente não vê logo de cara: o Python tem dois operadores de divisão, e eles se comportam de jeitos bem diferentes.",
        },
        {
          tipo: "subtitulo",
          texto: "/ — divisão real",
        },
        {
          tipo: "texto",
          texto: "Faz a divisão exata, com casas decimais, igual você faria numa calculadora.",
        },
        {
          tipo: "texto",
          texto: "10 / 3 = 3.333333...",
        },
        {
          tipo: "subtitulo",
          texto: "// — divisão inteira",
        },
        {
          tipo: "texto",
          texto: "Faz a divisão e descarta a parte decimal, devolvendo só a parte inteira.",
        },
        {
          tipo: "texto",
          texto: "10 // 3 = 3",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = 10
num2 = 3

print("Divisão real:", num1 / num2)     # Divisão real: 3.3333333333333335
print("Divisão inteira:", num1 // num2)  # Divisão inteira: 3`,
          rotulo: "comparando / e //",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Quando usar cada uma?",
          texto: "",
          itens: [
            "Use / quando o resultado pode ter casas decimais — por exemplo, dividir uma conta de restaurante entre amigos;",
            "Use // quando você só quer a parte inteira — por exemplo, \"quantas caixas de 6 ovos eu preciso comprar para ter pelo menos 20 ovos\" (aí você combinaria com % para saber quantos ovos sobram).",
          ],
        },
      ],
    },
    {
      id: "operadores-de-comparacao",
      titulo: "Operadores de comparação",
      blocos: [
        {
          tipo: "texto",
          texto: "Além de calcular, o Python também compara valores. Um operador de comparação sempre devolve um destes dois valores especiais: True (verdadeiro) ou False (falso) — esse tipo de dado se chama bool (booleano), e é a base de toda decisão que um programa toma (o famoso if, que você vai estudar mais à frente).",
        },
        {
          tipo: "tabela",
          colunas: ["Operador","Significado","Exemplo","Resultado"],
          linhas: [
            ["==","Igual a","5 == 5","True"],
            ["!=","Diferente de","5 != 3","True"],
            [">","Maior que","7 > 10","False"],
            ["<","Menor que","7 < 10","True"],
            [">=","Maior ou igual a","10 >= 10","True"],
            ["<=","Menor ou igual a","9 <= 8","False"],
          ],
        },
        {
          tipo: "codigo",
          conteudo: `idade = 17

print(idade == 18)   # False — 17 não é igual a 18
print(idade != 18)   # True  — 17 é diferente de 18
print(idade >= 18)   # False — 17 não é maior nem igual a 18
print(idade < 18)    # True  — 17 é menor que 18`,
          rotulo: "exemplo",
        },
        {
          tipo: "lista",
          itens: [
            "== (dois sinais de igual) compara se dois valores são iguais — nunca confunda com =, que serve para guardar um valor numa variável;",
            "o resultado de uma comparação nunca é um número — é sempre True ou False;",
            "essas comparações são exatamente o que, mais pra frente, você vai colocar dentro de um if para o programa tomar decisões sozinho.",
          ],
        },
        {
          tipo: "texto",
          texto: "Erro clássico de iniciante:",
        },
        {
          tipo: "texto",
          texto: "if idade = 18:",
        },
        {
          tipo: "texto",
          texto: "if idade == 18:",
        },
        {
          tipo: "texto",
          texto: "guarda",
        },
        {
          tipo: "texto",
          texto: "comparam",
        },
      ],
    },
    {
      id: "exercicios-praticos",
      titulo: "Exercícios práticos",
      blocos: [
        {
          tipo: "texto",
          texto: "Exercício 1 · Soma de dois números",
        },
        {
          tipo: "texto",
          texto: "Peça dois números ao usuário (use input() convertendo com int()) e mostre a soma.",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = int(input("Digite o primeiro número: "))
num2 = int(input("Digite o segundo número: "))

soma = num1 + num2
print(f"A soma é {soma}")`,
        },
        {
          tipo: "texto",
          texto: "Exercício 2 · Par ou ímpar",
        },
        {
          tipo: "texto",
          texto: "Peça um número ao usuário e mostre o resultado de numero % 2. Depois responda no comentário do próprio código: quando esse resultado é 0, o número é par ou ímpar?",
        },
        {
          tipo: "codigo",
          conteudo: `numero = int(input("Digite um número: "))

resto = numero % 2
print(f"O resto da divisão de {numero} por 2 é {resto}")
# Se o resto for 0, o número é par. Se for 1, é ímpar.`,
        },
        {
          tipo: "texto",
          texto: "Exercício 3 · Calculadora simples completa",
        },
        {
          tipo: "texto",
          texto: "Crie um programa que peça dois números ao usuário e mostre todas as operações aprendidas: soma, subtração, multiplicação, divisão real, divisão inteira e resto — e ainda diga se o primeiro número é maior, menor ou igual ao segundo, usando operadores de comparação.",
        },
        {
          tipo: "codigo",
          conteudo: `num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))

print("----- RESULTADOS -----")
print(f"Soma: {num1 + num2}")
print(f"Subtração: {num1 - num2}")
print(f"Multiplicação: {num1 * num2}")
print(f"Divisão real: {num1 / num2}")
print(f"Divisão inteira: {num1 // num2}")
print(f"Resto da divisão: {num1 % num2}")

print("----- COMPARAÇÕES -----")
print(f"{num1} == {num2}? ", num1 == num2)
print(f"{num1} > {num2}? ", num1 > num2)
print(f"{num1} < {num2}? ", num1 < num2)`,
        },
        {
          tipo: "texto",
          texto: "Usamos float() em vez de int() aqui de propósito — assim a calculadora funciona também com números decimais, como 7.5 ou 2.25, deixando o programa mais completo.",
        },
      ],
    },
    {
      id: "checklist-antes-de-seguir-para-a-proxima-ativida",
      titulo: "Checklist antes de seguir para a próxima atividade",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Sei usar os 5 operadores aritméticos: +, -, *, /, %;",
            "Sei explicar a diferença entre / (divisão real) e // (divisão inteira);",
            "Sei usar os operadores de comparação (==, !=, >, <, >=, <=) e sei que eles devolvem True ou False;",
            "Sei diferenciar = (guardar valor) de == (comparar valores);",
            "Fiz os 3 exercícios acima, incluindo a calculadora simples completa.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
