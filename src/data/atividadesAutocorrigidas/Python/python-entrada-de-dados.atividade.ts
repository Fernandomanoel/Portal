import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/python-entrada-de-dados.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Entrada de Dados em Python (Input)",
  introducao: "Aprender a receber dados digitados pelo usuário usando o comando input().",
  itens: [
    {
      id: "o-que-e-o-input",
      titulo: "O que é o input()?",
      blocos: [
        {
          tipo: "texto",
          texto: "O input() é usado quando o programa faz uma pergunta e espera o usuário digitar uma resposta no teclado.",
        },
        {
          tipo: "texto",
          texto: "Tudo que o usuário digita com input() entra como texto (string).",
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: "nome = input(\"Digite seu nome: \")",
        },
        {
          tipo: "subtitulo",
          texto: "Preparando o arquivo no Visual Studio Code",
        },
        {
          tipo: "lista",
          itens: [
            "Abra o Visual Studio Code",
            "Clique em Arquivo > Novo Arquivo",
            "Salve como: entrada_dados.py",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Primeiro programa com input()",
        },
        {
          tipo: "texto",
          texto: "Digite o código abaixo:",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Digite seu nome: ")
print("Olá,", nome)`,
        },
        {
          tipo: "subtitulo",
          texto: "Executando",
        },
        {
          tipo: "lista",
          itens: [
            "Clique com o botão direito no arquivo",
            "Escolha Run Python File in Terminal",
            "Digite seu nome no terminal e pressione Enter",
          ],
        },
      ],
    },
    {
      id: "input-com-numeros",
      titulo: "input() com números",
      blocos: [
        {
          tipo: "nota",
          variante: "aviso",
          rotulo: "Importante",
          texto: "O input() sempre recebe texto. Para usar números, precisamos converter:",
          itens: ["int() → números inteiros","float() → números com vírgula"],
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: `idade = int(input("Digite sua idade: "))
print("Você tem", idade, "anos")`,
        },
        {
          tipo: "subtitulo",
          texto: "Comentários no código",
        },
        {
          tipo: "codigo",
          conteudo: `# Programa que pergunta o nome do usuário
nome = input("Digite seu nome: ")
print("Bem-vindo,", nome)`,
        },
      ],
    },
    {
      id: "exercicios-praticos",
      titulo: "Exercícios Práticos",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Exercício 1 – Nome do usuário",
        },
        {
          tipo: "texto",
          texto: "Crie um programa que:",
        },
        {
          tipo: "lista",
          itens: ["Pergunte o nome do usuário","Mostre a mensagem: Bem-vindo, [nome]!"],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Exemplo de solução:",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Digite seu nome: ")
print("Bem-vindo,", nome)`,
        },
        {
          tipo: "subtitulo",
          texto: "Exercício 2 – Idade",
        },
        {
          tipo: "texto",
          texto: "Crie um programa que:",
        },
        {
          tipo: "lista",
          itens: ["Pergunte a idade do usuário","Mostre quantos anos ele tem"],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Exemplo de solução:",
        },
        {
          tipo: "codigo",
          conteudo: `idade = int(input("Digite sua idade: "))
print("Você tem", idade, "anos")`,
        },
      ],
    },
  ],
};

export default atividade;
