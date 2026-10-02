import type { ProvaInterativa, VerificacaoCodigo } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Python/
 * prova-python-testes-automatizados.prova.html): as mesmas 8 questões, os
 * mesmos exemplos de entrada/saída, a mesma pontuação (1,5 cada) e as mesmas
 * mensagens. A página antiga conferia o texto digitado com `includes`; aqui
 * são verificações por expressão regular que o servidor aplica sobre o código
 * (sem comentários), aceitando as variações comuns. O código não é executado.
 * Cada questão pode ser testada até 3 vezes.
 */
const v = (descricao: string, padrao: string): VerificacaoCodigo => ({ descricao, padrao });
const PRINT = String.raw`\bprint\s*\(`;
const INPUT = String.raw`\binput\s*\(`;

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Prova de Python",
  introducao: "Escreva o código e use “Testar resposta”: os testes mostram o que ainda falta. Cada questão vale 1,5 ponto.",
  itens: [
    {
      titulo: "Questão 1: Variáveis e Tipos (1,5 pts)",
      enunciado:
        'Crie variáveis para armazenar nome = "João" (string), idade = 25 (inteiro), altura = 1.75 (float) e ativo = True (booleano). Depois exiba uma mensagem usando print().',
      exemplo: { rotulo: "Exemplo de saída esperada", conteudo: "João tem 25 anos, mede 1.75m e está ativo" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v('Variável nome = "João"', String.raw`\bnome\s*=\s*["']João["']`),
              v("Variável idade = 25 (inteiro)", String.raw`\bidade\s*=\s*25\b(?!\.)`),
              v("Variável altura = 1.75 (float)", String.raw`\baltura\s*=\s*1\.75\b`),
              v("Variável ativo = True (booleano)", String.raw`\bativo\s*=\s*True\b`),
              v("print() exibindo a mensagem", String.raw`${PRINT}[\s\S]*?\banos\b`),
            ],
          },
        },
      ],
      mensagemCerta: "Parabéns! Você usou variáveis e tipos corretamente.",
      mensagemErrada: "Revise seu código. Verifique as variáveis e print().",
    },
    {
      titulo: "Questão 2: Operações Matemáticas (1,5 pts)",
      enunciado: "Crie um programa que receba dois números do usuário e calcule e mostre: soma, subtração, multiplicação, divisão e resto.",
      exemplo: {
        rotulo: "Exemplo de entrada/saída",
        conteudo: "Digite o primeiro número: 10\nDigite o segundo número: 3\nSoma: 13\nSubtração: 7\nMultiplicação: 30\nDivisão: 3.33\nResto: 1",
      },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("input() usado duas vezes (os dois números)", String.raw`${INPUT}[\s\S]*${INPUT}`),
              v("Conversão com int() ou float()", String.raw`\b(?:int|float)\s*\(`),
              v("Soma (+)", String.raw`\w\s*\+\s*\w`),
              v("Subtração (-)", String.raw`\w\s*-\s*\w`),
              v("Multiplicação (*)", String.raw`\w\s*\*\s*\w`),
              v("Divisão (/)", String.raw`\w\s*/\s*\w`),
              v("Resto (%)", String.raw`\w\s*%\s*\w`),
              v("print() exibindo os resultados", PRINT),
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! Você implementou todas as operações matemáticas.",
      mensagemErrada: "Revise: use input(), int/float e as 5 operações.",
    },
    {
      titulo: "Questão 3: Condicionais (1,5 pts)",
      enunciado: 'Crie um programa que receba uma nota (0-10) e mostre se foi "Aprovado" (≥7), "Recuperação" (5-6) ou "Reprovado" (<5).',
      exemplo: {
        rotulo: "Exemplo de entrada/saída",
        conteudo: "Digite a nota: 7.5\nResultado: Aprovado\nDigite a nota: 5.5\nResultado: Recuperação\nDigite a nota: 3\nResultado: Reprovado",
      },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("input() com float() para ler a nota", String.raw`\bfloat\s*\([\s\S]*?${INPUT}|${INPUT}[\s\S]*?\bfloat\s*\(`),
              v("Estrutura if / elif / else", String.raw`\bif\b[\s\S]*\belif\b[\s\S]*\belse\b`),
              v("Limite de aprovação (>= 7)", String.raw`>=?\s*7|>\s*6(?:\.\d+)?\b`),
              v("Limite de recuperação (5)", String.raw`>=\s*5|>\s*4(?:\.\d+)?\b|<\s*5\b`),
              v('Mensagem "Aprovado"', "Aprovado"),
              v('Mensagem "Recuperação"', "Recuperação"),
              v('Mensagem "Reprovado"', "Reprovado"),
            ],
          },
        },
      ],
      mensagemCerta: "Perfeito! Sua lógica condicional está correta.",
      mensagemErrada: "Use if/elif/else com os valores 7, 5 e 0 como limites.",
    },
    {
      titulo: "Questão 4: Loops - FOR (1,5 pts)",
      enunciado: "Crie um programa que mostre a tabuada de um número usando for.",
      exemplo: {
        rotulo: "Exemplo de entrada/saída (tabuada do 5)",
        conteudo: "Digite um número: 5\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
      },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("input() com int() para ler o número", String.raw`\bint\s*\([\s\S]*?${INPUT}|${INPUT}[\s\S]*?\bint\s*\(`),
              v("Loop for com range(1, 11)", String.raw`\bfor\s+\w+\s+in\s+range\s*\(\s*1\s*,\s*11\s*\)`),
              v("Multiplicação (*)", String.raw`\w\s*\*\s*\w`),
              v("print() no formato \"5 x 1 = 5\" (com x e =)", String.raw`${PRINT}[\s\S]*?\bx\b[\s\S]*?=`),
            ],
          },
        },
      ],
      mensagemCerta: "Ótimo! Seu loop for está funcionando corretamente.",
      mensagemErrada: "Use for com range(1, 11) para a tabuada.",
    },
    {
      titulo: "Questão 5: Listas (1,5 pts)",
      enunciado: "Crie um programa que crie uma lista com 5 nomes, mostre cada nome numerado e mostre quantos nomes tem.",
      exemplo: { rotulo: "Exemplo de saída", conteudo: "1. João\n2. Maria\n3. Pedro\n4. Ana\n5. Carlos\nTotal de nomes: 5" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Lista com 5 nomes", String.raw`\[\s*(?:["'][^"']+["']\s*,\s*){4}["'][^"']+["']\s*,?\s*\]`),
              v("Loop for para percorrer a lista", String.raw`\bfor\s+[\w, ()]+\s+in\b`),
              v("Numeração dos nomes (enumerate ou contador + 1)", String.raw`\benumerate\s*\(|\+\s*1\b|\brange\s*\(\s*1`),
              v("len() para contar os nomes", String.raw`\blen\s*\(`),
              v("print() exibindo", PRINT),
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! Você manipulou listas corretamente.",
      mensagemErrada: "Use uma lista, loop for e len() para contar elementos.",
    },
    {
      titulo: "Questão 6: Funções (1,5 pts)",
      enunciado: "Crie uma função chamada calcular_imc que receba peso (kg) e altura (m) como parâmetros, calcule IMC = peso / (altura²) e retorne o resultado arredondado a 2 casas decimais.",
      exemplo: { rotulo: "Exemplo de chamada", conteudo: 'resultado = calcular_imc(70, 1.75)\nprint(f"IMC: {resultado}")\n# Saída: IMC: 22.86' },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("def calcular_imc(peso, altura)", String.raw`\bdef\s+calcular_imc\s*\(\s*peso\s*,\s*altura\s*\)\s*:`),
              v("Calcula a altura ao quadrado (** 2, altura * altura ou pow)", String.raw`\baltura\s*\*\*\s*2|\baltura\s*\*\s*altura\b|\bpow\s*\(\s*altura\s*,\s*2\s*\)`),
              v("Divide o peso pela altura ao quadrado", String.raw`\bpeso\s*/`),
              v("round() com 2 casas decimais", String.raw`\bround\s*\([\s\S]*,\s*2\s*\)`),
              v("return devolvendo o resultado", String.raw`\breturn\b`),
            ],
          },
        },
      ],
      mensagemCerta: "Perfeito! Sua função está bem estruturada.",
      mensagemErrada: "Use def com return e ** para potência.",
    },
    {
      titulo: "Questão 7: Dicionários (1,5 pts)",
      enunciado: "Crie um programa que crie um dicionário com dados de uma pessoa (nome, idade, email) e mostre todas as informações de forma legível.",
      exemplo: { rotulo: "Exemplo de saída", conteudo: "Nome: João\nIdade: 25\nEmail: joao@example.com" },
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Dicionário com as chaves nome, idade e email", String.raw`\{[\s\S]*["']nome["']\s*:[\s\S]*["']idade["']\s*:[\s\S]*["']email["']\s*:[\s\S]*\}`),
              v("Acesso às chaves (dados['nome'], .get() ou .items())", String.raw`\[\s*["'](?:nome|idade|email)["']\s*\]|\.get\s*\(|\.items\s*\(`),
              v("print() exibindo os valores", PRINT),
            ],
          },
        },
      ],
      mensagemCerta: "Ótimo! Você usou dicionários corretamente.",
      mensagemErrada: "Use {} com chaves e print() para exibir valores.",
    },
    {
      titulo: "Questão 8: Tratamento de Erros (1,5 pts)",
      enunciado:
        'Crie um programa que receba um número do usuário e tente converter para inteiro. Se der erro, mostre "Entrada inválida. Digite um número!"; se funcionar, mostre "Número recebido: X". Use try/except.',
      campos: [
        {
          id: "codigo",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Bloco try:", String.raw`\btry\s*:`),
              v("Bloco except (de preferência except ValueError:)", String.raw`\bexcept\b[^:\n]*:`),
              v("Conversão com int() lendo com input()", String.raw`\bint\s*\([\s\S]*?${INPUT}|${INPUT}[\s\S]*?\bint\s*\(`),
              v('Mensagem de erro "Entrada inválida. Digite um número!"', String.raw`Entrada inválida\. Digite um número!`),
              v('Mensagem "Número recebido"', String.raw`Número recebido`),
            ],
          },
        },
      ],
      mensagemCerta: "Excelente! Seu tratamento de erros está correto.",
      mensagemErrada: "Use try/except com ValueError e int().",
    },
  ],
};

export default prova;
