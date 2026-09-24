import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/python-atividade-complementar.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Lista de Atividades — Python",
  introducao: "Atividade Complementar — Python",
  itens: [
    {
      id: "atividade-1-soma-de-numeros",
      titulo: "Atividade 1 — Soma de Números",
      blocos: [
        {
          tipo: "texto",
          texto: "Objetivo: Aprender print, input, variáveis, conversão de tipos e cálculo simples.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 1 – Criar o arquivo",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo chamado:",
        },
        {
          tipo: "codigo",
          conteudo: "atividade_python.py",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 2 – Mostrar uma mensagem na tela",
        },
        {
          tipo: "codigo",
          conteudo: "print(\"Olá, seja bem-vindo ao Python!\")",
        },
        {
          tipo: "texto",
          texto: "Esse comando serve para mostrar mensagens na tela.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 3 – Pedir o nome do usuário",
        },
        {
          tipo: "codigo",
          conteudo: "nome = input(\"Digite seu nome: \")",
        },
        {
          tipo: "texto",
          texto: "Aqui o programa:",
        },
        {
          tipo: "lista",
          itens: ["Pede uma informação","Guarda o valor digitado na variável nome"],
        },
        {
          tipo: "subtitulo",
          texto: "Passo 4 – Pedir dois números e fazer a soma",
        },
        {
          tipo: "codigo",
          conteudo: `numero1 = int(input("Digite o primeiro número: "))
numero2 = int(input("Digite o segundo número: "))

soma = numero1 + numero2`,
        },
        {
          tipo: "texto",
          texto: "O int() é usado para transformar o texto digitado em número.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 5 – Mostrar o resultado final",
        },
        {
          tipo: "codigo",
          conteudo: `print("Olá,", nome)
print("A soma dos números é:", soma)`,
        },
        {
          tipo: "subtitulo",
          texto: "Código completo (para o aluno copiar e rodar)",
        },
        {
          tipo: "codigo",
          conteudo: `print("Olá, seja bem-vindo ao Python!")

nome = input("Digite seu nome: ")

numero1 = int(input("Digite o primeiro número: "))
numero2 = int(input("Digite o segundo número: "))

soma = numero1 + numero2

print("Olá,", nome)
print("A soma dos números é:", soma)`,
        },
        {
          tipo: "subtitulo",
          texto: "Desafio opcional (iniciante)",
        },
        {
          tipo: "texto",
          texto: "Peça para o aluno:",
        },
        {
          tipo: "lista",
          itens: ["Trocar a soma por multiplicação"],
        },
        {
          tipo: "codigo",
          conteudo: `multiplicacao = numero1 * numero2
print("A multiplicação é:", multiplicacao)`,
        },
      ],
    },
    {
      id: "atividade-2-maior-de-idade",
      titulo: "Atividade 2 — Maior de Idade",
      blocos: [
        {
          tipo: "texto",
          texto: "Objetivo: Ensinar variáveis, input, conversão de tipos e estrutura condicional (if / else).",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 1 – Criar o arquivo",
        },
        {
          tipo: "codigo",
          conteudo: "atividade_python_idade.py",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 2 – Pedir o nome do usuário",
        },
        {
          tipo: "codigo",
          conteudo: "nome = input(\"Digite seu nome: \")",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 3 – Pedir a idade",
        },
        {
          tipo: "codigo",
          conteudo: "idade = int(input(\"Digite sua idade: \"))",
        },
        {
          tipo: "texto",
          texto: "O int() transforma o valor digitado em número.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 4 – Criar a condição",
        },
        {
          tipo: "codigo",
          conteudo: `if idade >= 18:
    mensagem = "Você é maior de idade."
else:
    mensagem = "Você é menor de idade."`,
        },
        {
          tipo: "texto",
          texto: "Aqui o programa toma uma decisão.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 5 – Mostrar o resultado",
        },
        {
          tipo: "codigo",
          conteudo: `print("Olá,", nome)
print(mensagem)`,
        },
        {
          tipo: "subtitulo",
          texto: "Código completo (para copiar e executar)",
        },
        {
          tipo: "codigo",
          conteudo: `nome = input("Digite seu nome: ")

idade = int(input("Digite sua idade: "))

if idade >= 18:
    mensagem = "Você é maior de idade."
else:
    mensagem = "Você é menor de idade."

print("Olá,", nome)
print(mensagem)`,
        },
        {
          tipo: "subtitulo",
          texto: "Desafio opcional",
        },
        {
          tipo: "lista",
          itens: [
            "Mude a idade mínima para 16 anos",
            "Acrescente uma mensagem de boas-vindas personalizada",
          ],
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "codigo",
          conteudo: "print(\"Seja bem-vindo ao sistema!\")",
        },
      ],
    },
  ],
};

export default atividade;
