import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/python-primeiro-codigo.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Fazendo o Primeiro Código",
  introducao: "Dar os primeiros passos em Python: entender o que essa linguagem é, preparar o Visual Studio Code para escrever e rodar código, aprender o comando print(), os comentários, e conhecer os tipos de dados básicos — a base de tudo que vem depois.",
  itens: [
    {
      id: "o-que-e-python-e-por-que-aprender",
      titulo: "O que é Python e por que aprender?",
      blocos: [
        {
          tipo: "texto",
          texto: "Python é uma linguagem de programação criada para ser fácil de ler e de escrever — o código se parece bastante com frases em inglês simples, o que faz dela uma ótima porta de entrada para quem está começando a programar.",
        },
        {
          tipo: "texto",
          texto: "Apesar de simples, Python é usada em áreas bem sérias do mercado: criação de sites (com frameworks como o Flask, que você vai ver mais pra frente), análise de dados, inteligência artificial, automação de tarefas repetitivas, jogos e muito mais. Aprender Python agora é abrir a porta para todas essas áreas.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Por que Python é uma boa primeira linguagem?",
          texto: "",
          itens: [
            "Não exige ; no fim das linhas nem chaves { } para marcar blocos de código — usa apenas a indentação (os espaços no início da linha);",
            "Os comandos têm nomes que fazem sentido: print (imprimir), input (entrada);",
            "É a linguagem mais usada no mundo para iniciantes, segundo praticamente todo ranking de popularidade dos últimos anos.",
          ],
        },
      ],
    },
    {
      id: "preparando-o-visual-studio-code",
      titulo: "Preparando o Visual Studio Code",
      blocos: [
        {
          tipo: "texto",
          texto: "Todo o curso vai usar o VS Code (Visual Studio Code) como editor. Ele é gratuito e é onde você vai escrever e rodar seus programas Python.",
        },
        {
          tipo: "lista",
          itens: [
            "Abra o Visual Studio Code no computador do laboratório;",
            "Confirme que o Python está instalado: abra o terminal (menu Terminal > Novo Terminal) e digite python --version. Se aparecer algo como Python 3.12.0, está tudo certo;",
            "Clique em Arquivo > Novo Arquivo e salve como primeiro_programa.py. A extensão .py é o que diz ao computador \"isto é um programa Python\" — sem ela, o VS Code não sabe como rodar o arquivo.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "o-comando-print",
      titulo: "O comando print()",
      blocos: [
        {
          tipo: "texto",
          texto: "Todo programa Python pode começar com algo simples: mostrar uma mensagem na tela. Isso é feito com o comando print() — o texto que você quer mostrar fica dentro dos parênteses, entre aspas.",
        },
        {
          tipo: "codigo",
          conteudo: "print(\"Olá, mundo!\")",
          rotulo: "primeiro_programa.py",
        },
        {
          tipo: "lista",
          itens: [
            "print → o comando que manda o Python mostrar algo na tela;",
            "os parênteses ( ) → é onde você coloca o que quer mostrar;",
            "as aspas \" \" → indicam que o conteúdo dentro delas é texto (chamado de string).",
          ],
        },
        {
          tipo: "texto",
          texto: "Para executar: clique com o botão direito no arquivo dentro do VS Code e escolha Run Python File in Terminal. O texto vai aparecer no painel de terminal, na parte de baixo da tela.",
        },
        {
          tipo: "texto",
          texto: "Aspas simples ou duplas?",
        },
        {
          tipo: "texto",
          texto: "\"texto\"",
        },
        {
          tipo: "texto",
          texto: "'texto'",
        },
      ],
    },
    {
      id: "comentarios-no-codigo",
      titulo: "Comentários no código",
      blocos: [
        {
          tipo: "texto",
          texto: "Comentários são anotações que o Python ignora ao rodar o programa — eles existem só para explicar o código para quem está lendo (inclusive você mesmo, no futuro). Em Python, um comentário começa com o símbolo #.",
        },
        {
          tipo: "codigo",
          conteudo: `# Este é um comentário — o Python não executa esta linha
print("Aprendendo Python")  # também pode vir depois de um código`,
          rotulo: "exemplo",
        },
        {
          tipo: "texto",
          texto: "Use comentários para explicar por que uma parte do código existe, não para repetir o óbvio. É um hábito que todo programador profissional mantém.",
        },
      ],
    },
    {
      id: "tipos-de-dados-basicos",
      titulo: "Tipos de dados básicos",
      blocos: [
        {
          tipo: "texto",
          texto: "Nem toda informação em um programa é do mesmo \"tipo\". Um nome é diferente de uma idade, que é diferente de um preço com centavos. Python organiza isso em tipos de dados — os três primeiros que você precisa conhecer são:",
        },
        {
          tipo: "subtitulo",
          texto: "str (string)",
        },
        {
          tipo: "texto",
          texto: "Texto, sempre entre aspas.",
        },
        {
          tipo: "texto",
          texto: "nome = \"Ana\"",
        },
        {
          tipo: "subtitulo",
          texto: "int (inteiro)",
        },
        {
          tipo: "texto",
          texto: "Número inteiro, sem casas decimais.",
        },
        {
          tipo: "texto",
          texto: "idade = 17",
        },
        {
          tipo: "subtitulo",
          texto: "float (decimal)",
        },
        {
          tipo: "texto",
          texto: "Número com casas decimais, usando ponto.",
        },
        {
          tipo: "texto",
          texto: "altura = 1.68",
        },
        {
          tipo: "texto",
          texto: "Repare que str sempre fica entre aspas, enquanto int e float nunca ficam — se você colocar um número entre aspas, ele deixa de ser número e vira texto para o Python.",
        },
        {
          tipo: "codigo",
          conteudo: `nome = "Ana"          # str — texto
idade = 17              # int — número inteiro
altura = 1.68          # float — número com casas decimais

print(nome, idade, altura)`,
          rotulo: "tipos.py",
        },
        {
          tipo: "subtitulo",
          texto: "Como descobrir o tipo de um valor",
        },
        {
          tipo: "texto",
          texto: "Se você não tiver certeza do tipo de algo, pode perguntar ao próprio Python com a função type():",
        },
        {
          tipo: "codigo",
          conteudo: `print(type("Ana"))    # mostra: <class 'str'>
print(type(17))       # mostra: <class 'int'>
print(type(1.68))     # mostra: <class 'float'>`,
        },
      ],
    },
    {
      id: "misturando-texto-e-numeros-no-print",
      titulo: "Misturando texto e números no print()",
      blocos: [
        {
          tipo: "texto",
          texto: "O print() pode mostrar vários valores de uma vez, separando cada um por vírgula. Ele mesmo coloca um espaço entre eles automaticamente:",
        },
        {
          tipo: "codigo",
          conteudo: `nome = "Ana"
idade = 17
print("Nome:", nome, "| Idade:", idade)`,
          rotulo: "exemplo",
        },
        {
          tipo: "lista",
          itens: [
            "o print() recebeu 4 \"pedaços\" separados por vírgula;",
            "cada pedaço pode ser texto entre aspas ou uma variável (você vai estudar variáveis com mais calma na próxima atividade);",
            "o Python junta tudo numa linha só, com um espaço entre cada pedaço.",
          ],
        },
      ],
    },
    {
      id: "exercicios-praticos",
      titulo: "Exercícios práticos",
      blocos: [
        {
          tipo: "texto",
          texto: "Faça os exercícios em ordem — cada um usa um pouco do que veio antes. Crie um arquivo .py novo para cada um.",
        },
        {
          tipo: "texto",
          texto: "Exercício 1 · Mostrar mensagens na tela",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo chamado mensagens.py e escreva um programa que mostre, em linhas separadas:",
        },
        {
          tipo: "lista",
          itens: ["Bem-vindo ao curso de Python","Estou aprendendo programação","Python é legal"],
        },
        {
          tipo: "texto",
          texto: "Exemplo de solução:",
        },
        {
          tipo: "codigo",
          conteudo: `print("Bem-vindo ao curso de Python")
print("Estou aprendendo programação")
print("Python é legal")`,
        },
        {
          tipo: "texto",
          texto: "Cada print() gera uma linha nova automaticamente — você não precisa fazer nada especial para \"pular linha\" entre um e outro.",
        },
        {
          tipo: "texto",
          texto: "Exercício 2 · Seus dados pessoais",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo dados_pessoais.py e mostre seu nome, idade e cidade — um em cada linha, usando um print() só que mistura texto fixo com o valor.",
        },
        {
          tipo: "codigo",
          conteudo: `print("Nome:", "João")
print("Idade:", 15, "anos")
print("Cidade:", "Manaus")`,
        },
        {
          tipo: "texto",
          texto: "Troque \"João\", 15 e \"Manaus\" pelos seus dados de verdade. Repare que 15 não tem aspas — é um número (int), enquanto \"João\" e \"Manaus\" têm aspas — são texto (str).",
        },
        {
          tipo: "texto",
          texto: "Exercício 3 · Mistura de tipos",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo meus_dados_tipos.py que declare três valores — um str, um int e um float — e depois use um único print() para mostrar os três juntos numa frase.",
        },
        {
          tipo: "codigo",
          conteudo: `nome = "Marcos"            # str
idade = 16                  # int
altura = 1.72              # float

print("Eu me chamo", nome, ", tenho", idade, "anos e", altura, "de altura.")`,
        },
        {
          tipo: "texto",
          texto: "Perceba como print() não se importa em misturar texto, número inteiro e número decimal na mesma chamada — ele converte tudo para texto na hora de mostrar.",
        },
        {
          tipo: "texto",
          texto: "Exercício 4 · Cartão de apresentação",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo cartao_apresentacao.py que imprima um \"cartão de visitas\" seu, linha por linha, usando pelo menos um valor de cada tipo (str, int, float) e alguns comentários explicando cada bloco.",
        },
        {
          tipo: "codigo",
          conteudo: `# --- Meus dados ---
nome = "Beatriz Souza"
idade = 17
altura = 1.65
curso = "Desenvolvimento de Sistemas"

# --- Cartão impresso linha por linha ---
print("========================")
print("     CARTÃO DE VISITAS")
print("========================")
print("Nome:", nome)
print("Idade:", idade, "anos")
print("Altura:", altura, "m")
print("Curso:", curso)
print("========================")`,
        },
        {
          tipo: "texto",
          texto: "Repare que as linhas com só \"========================\" e \"CARTÃO DE VISITAS\" servem apenas para desenhar uma \"moldura\" em torno das informações — um truque simples para deixar a saída mais organizada, mesmo sem nenhum recurso visual além do texto.",
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
            "Sei abrir o VS Code, criar um arquivo .py e rodá-lo com \"Run Python File in Terminal\";",
            "Entendo que print() mostra texto na tela e que o texto fica entre aspas;",
            "Sei escrever comentários com # e sei por que eles são úteis;",
            "Sei diferenciar str, int e float só de olhar o valor;",
            "Fiz os 4 exercícios acima e rodei cada um pelo menos uma vez.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
