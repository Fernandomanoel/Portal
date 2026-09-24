import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/python-logica-e-variaveis.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Lógica de Programação em Python",
  introducao: "Entender variáveis, aprender a receber dados digitados pelo usuário com input(), saber por que quase sempre é preciso converter o que o usuário digita, e conhecer as f-strings — um jeito mais legível de montar mensagens.",
  itens: [
    {
      id: "como-todo-programa-pensa",
      titulo: "Como todo programa \"pensa\"",
      blocos: [
        {
          tipo: "texto",
          texto: "Quase todo programa de computador segue a mesma lógica básica, em três etapas:",
        },
        {
          tipo: "texto",
          texto: "1. Receber informações",
        },
        {
          tipo: "texto",
          texto: "→",
        },
        {
          tipo: "texto",
          texto: "2. Processar essas informações",
        },
        {
          tipo: "texto",
          texto: "→",
        },
        {
          tipo: "texto",
          texto: "3. Mostrar o resultado",
        },
        {
          tipo: "texto",
          texto: "Nesta atividade você vai praticar exatamente essas três etapas: receber dados com input(), processá-los guardando e (quando precisar) convertendo em variáveis, e mostrar o resultado com print().",
        },
      ],
    },
    {
      id: "o-que-e-uma-variavel",
      titulo: "O que é uma variável?",
      blocos: [
        {
          tipo: "texto",
          texto: "Pense numa variável como uma caixa com um nome escrito nela. Você guarda um valor dentro da caixa, e sempre que quiser usar aquele valor de novo, basta chamar a caixa pelo nome — sem precisar digitar o valor de novo.",
        },
        {
          tipo: "texto",
          texto: "caixa \"nome\"",
        },
        {
          tipo: "texto",
          texto: "\"Ana\"",
        },
        {
          tipo: "texto",
          texto: "caixa \"idade\"",
        },
        {
          tipo: "texto",
          texto: "17",
        },
        {
          tipo: "codigo",
          conteudo: `nome = "Ana"
idade = 17`,
          rotulo: "exemplo",
        },
        {
          tipo: "lista",
          itens: [
            "nome e idade são os nomes das caixas (as variáveis);",
            "o sinal = não significa \"igual\" como na matemática — significa \"guarde este valor dentro desta caixa\";",
            "depois disso, sempre que você escrever nome no código, o Python vai usar \"Ana\" no lugar.",
          ],
        },
        {
          tipo: "texto",
          texto: "Uma coisa importante: o conteúdo da caixa pode trocar a qualquer momento — daí o nome \"variável\". Se você escrever idade = 18 mais adiante, a caixa passa a guardar 18 no lugar de 17.",
        },
      ],
    },
    {
      id: "input-pedindo-informacao-ao-usuario",
      titulo: "input() — pedindo informação ao usuário",
      blocos: [
        {
          tipo: "texto",
          texto: "O input() é usado quando o programa precisa fazer uma pergunta e esperar o usuário digitar uma resposta no teclado. O programa \"pausa\" até a pessoa digitar algo e apertar Enter.",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Digite seu nome: ")
print("Olá,", nome)`,
          rotulo: "exemplo",
        },
        {
          tipo: "lista",
          itens: [
            "input() → mostra o texto entre aspas na tela e espera o usuário digitar algo;",
            "\"Digite seu nome: \" → a mensagem/pergunta que aparece no terminal (repare no espaço antes do fim das aspas — deixa a digitação mais confortável);",
            "nome = → guarda o que o usuário digitou dentro da variável nome;",
            "a vírgula dentro do print() → separa texto fixo e variáveis, exatamente como você já viu na atividade anterior.",
          ],
        },
      ],
    },
    {
      id: "input-sempre-devolve-texto-cuidado-com-numeros",
      titulo: "input() sempre devolve texto — cuidado com números!",
      blocos: [
        {
          tipo: "texto",
          texto: "Aqui está o ponto mais importante desta atividade, e é um erro muito comum de quem está começando: tudo que o usuário digita com input() chega ao programa como texto (tipo str) — mesmo que a pessoa digite só números.",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Por que isso importa? input() colar os textos um no outro 5 3 \"5\" + \"3\" \"53\" 8",
        },
        {
          tipo: "texto",
          texto: "Para transformar o texto digitado em um número de verdade, você precisa converter o valor usando uma destas funções:",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Funções de conversão",
          texto: "",
          itens: [
            "int() → transforma o texto em número inteiro (sem casas decimais). Ex.: idade, quantidade de itens;",
            "float() → transforma o texto em número decimal (com vírgula/ponto). Ex.: altura, preço, nota.",
          ],
        },
        {
          tipo: "codigo",
          conteudo: `idade = int(input("Digite sua idade: "))
print("Você tem", idade, "anos")`,
          rotulo: "exemplo — convertendo idade",
        },
        {
          tipo: "lista",
          itens: [
            "primeiro o Python executa o input(...) mais interno, que pega o texto digitado;",
            "esse texto entra dentro de int( ), que o transforma em número inteiro;",
            "só depois disso o resultado (já número) é guardado na variável idade.",
          ],
        },
        {
          tipo: "texto",
          texto: "É como embrulhar uma função dentro da outra: de dentro para fora, primeiro pergunta (input), depois converte (int ou float), e só então guarda na variável.",
        },
      ],
    },
    {
      id: "f-strings-um-jeito-mais-legivel-de-montar-texto",
      titulo: "f-strings — um jeito mais legível de montar texto",
      blocos: [
        {
          tipo: "texto",
          texto: "Até agora você separou textos e variáveis no print() usando vírgulas. Existe um jeito mais moderno e legível: as f-strings. Você coloca um f antes das aspas, e pode escrever as variáveis direto dentro do texto, entre chaves { }.",
        },
        {
          tipo: "codigo",
          conteudo: `# Com vírgula (como você já viu):
print("Olá,", nome, "! Você tem", idade, "anos.")

# Com f-string (mais legível):
print(f"Olá, {nome}! Você tem {idade} anos.")`,
          rotulo: "comparação",
        },
        {
          tipo: "lista",
          itens: [
            "o f logo antes das aspas avisa o Python: \"esta string tem variáveis dentro dela\";",
            "cada {variavel} é substituído pelo valor daquela variável na hora de mostrar o texto;",
            "o resultado final é exatamente igual ao da versão com vírgulas — só que mais fácil de ler, principalmente quando a frase é grande.",
          ],
        },
        {
          tipo: "texto",
          texto: "Dica:",
        },
      ],
    },
    {
      id: "exercicios-praticos",
      titulo: "Exercícios práticos",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie um arquivo .py novo para cada exercício, e teste rodando (botão direito > Run Python File in Terminal). A dificuldade sobe aos poucos — não pule etapas.",
        },
        {
          tipo: "texto",
          texto: "Exercício 1 · Nome do usuário",
        },
        {
          tipo: "texto",
          texto: "Crie ola_nome.py que pergunte o nome da pessoa e mostre Olá, [nome]! usando f-string.",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Digite seu nome: ")
print(f"Olá, {nome}!")`,
        },
        {
          tipo: "texto",
          texto: "Exercício 2 · Cidade onde mora",
        },
        {
          tipo: "texto",
          texto: "Crie minha_cidade.py que pergunte a cidade onde o aluno mora e mostre Você mora em [cidade].",
        },
        {
          tipo: "codigo",
          conteudo: `cidade = input("Em que cidade você mora? ")
print(f"Você mora em {cidade}.")`,
        },
        {
          tipo: "texto",
          texto: "Exercício 3 · Em que ano você fará 100 anos?",
        },
        {
          tipo: "texto",
          texto: "Crie cem_anos.py que pergunte o nome e a idade da pessoa, converta a idade para número com int(), calcule em quantos anos ela completa 100 anos, e mostre uma frase final com f-string.",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Qual é o seu nome? ")
idade = int(input("Quantos anos você tem? "))

faltam = 100 - idade

print(f"{nome}, faltam {faltam} anos para você completar 100 anos!")`,
        },
        {
          tipo: "texto",
          texto: "Esse exercício só funciona porque a idade foi convertida com int() — sem a conversão, a linha 100 - idade daria erro, pois o Python não sabe subtrair um número de um texto.",
        },
        {
          tipo: "texto",
          texto: "Exercício 4 · Mini formulário de cadastro",
        },
        {
          tipo: "texto",
          texto: "Crie mini_formulario.py que faça pelo menos 3 perguntas diferentes — misturando texto e número — e no final mostre um resumo com todas as respostas usando f-string. Use int() ou float() em toda pergunta numérica.",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Nome completo: ")
idade = int(input("Idade: "))
cidade = input("Cidade: ")
altura = float(input("Altura (em metros, ex: 1.70): "))

print("----- RESUMO DO CADASTRO -----")
print(f"Nome: {nome}")
print(f"Idade: {idade} anos")
print(f"Cidade: {cidade}")
print(f"Altura: {altura} m")`,
        },
        {
          tipo: "texto",
          texto: "Repare que altura usa float(), não int() — porque uma altura como 1,70 tem casas decimais. Se você usar int() nesse caso, o Python dá erro ao tentar converter um texto com vírgula/ponto para inteiro.",
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
            "Sei explicar o que é uma variável usando a analogia da caixa com nome;",
            "Sei que input() sempre devolve texto, mesmo quando a pessoa digita números;",
            "Sei converter o retorno do input() com int() (números inteiros) e float() (números decimais);",
            "Sei montar mensagens com f-string usando f\"texto {variavel}\";",
            "Fiz os 4 exercícios acima, incluindo a conta dos 100 anos e o mini formulário.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
