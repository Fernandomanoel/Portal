import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Lógica de Programação/Avaliação
 * Prática - Lógica de Programação 02.pdf): as mesmas 9 questões, na mesma
 * ordem. O PDF não trazia gabarito: as respostas foram deduzidas dos
 * pseudocódigos e dos comandos do Small Basic. O fluxograma da questão 9 foi
 * redesenhado em SVG com os mesmos passos. Na questão 8 as alternativas não
 * vieram no PDF (só o enunciado), então foram escritas aqui, sobre a
 * Tartaruguinha do Small Basic.
 */
const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Avaliação Prática: Lógica de Programação",
  introducao: "Leia cada questão, responda e use “Testar resposta” para conferir.",
  itens: [
    {
      titulo: "Questão 1",
      enunciado: "Analise o seguinte trecho de código em pseudocódigo. Qual das alternativas está correta em relação ao código?",
      exemplo: {
        rotulo: "Pseudocódigo",
        conteudo: 'inicio\n   inteiro x\n   x ← 5\n   se x = 5 entao\n      escreva("O valor de x é 5")\n   fimse\nfim',
      },
      campos: [
        {
          id: "q1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "a) O código está incorreto porque a estrutura se está sem o senao.",
              "b) O código está correto e exibirá a mensagem “O valor de x é 5”.",
              "c) O código está incorreto porque a variável não foi atribuída corretamente.",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Isso mesmo: o senao é opcional, e a atribuição está certa.",
      mensagemErrada: "Releia: x recebe 5, e o se testa se x é 5. O senao não é obrigatório.",
    },
    {
      titulo: "Questão 2",
      enunciado: "Observe o código abaixo. Qual das alternativas está correta?",
      exemplo: { rotulo: "Pseudocódigo", conteudo: 'inicio\n   inteiro i\n   para i de 1 até 3 faça\n      escreva("Valor de i: ", i)\nfim' },
      campos: [
        {
          id: "q2",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "a) O código está correto e imprimirá os valores de i de 1 até 3.",
              "b) O código está incorreto porque falta o comando fimpara.",
              "c) O código imprimirá apenas o valor 3.",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Isso mesmo: todo para precisa ser fechado com fimpara.",
      mensagemErrada: "Olhe o fim da repetição: falta fechar o para.",
    },
    {
      titulo: "Questão 3",
      enunciado: "O que é uma variável em lógica de programação?",
      campos: [
        {
          id: "q3",
          placeholder: "Explique com suas palavras",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: "armazen|guard|valor|mem[óo]ria|dado|informa",
            mensagemSemPalavraChave: "Fale do que a variável faz: guarda/armazena um valor (um dado) na memória.",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
    {
      titulo: "Questão 4",
      enunciado: "O que faz a estrutura condicional se ... entao ... senao?",
      campos: [
        {
          id: "q4",
          placeholder: "Explique com suas palavras",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: "condi|decis|verdade|falso|caso contr[áa]rio|senao|senão|execut|escolh",
            mensagemSemPalavraChave: "Fale da condição: se for verdadeira, executa um bloco; senão, executa outro.",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
    {
      titulo: "Questão 5",
      enunciado: "Qual estrutura de repetição garante que o bloco de código será executado pelo menos uma vez, independentemente da condição?",
      campos: [
        {
          id: "q5",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "A) Estrutura de repetição \"para\" (for)",
              "B) Estrutura de decisão \"se-então\" (if-then)",
              "C) Estrutura de repetição \"enquanto\" (while)",
              "D) Estrutura de repetição \"faça-enquanto\" (do-while)",
            ],
            correta: 3,
          },
        },
      ],
      mensagemCerta: "Certo: o faça-enquanto testa a condição só no fim, depois de executar o bloco.",
      mensagemErrada: "Pense em qual estrutura testa a condição depois de executar o bloco.",
    },
    {
      titulo: "Questão 6",
      enunciado: "Qual comando em Small Basic é usado para exibir uma mensagem na tela?",
      campos: [
        {
          id: "q6",
          regra: { tipo: "multipla_escolha", opcoes: ["A) Print", "B) Show", "C) TextWindow.WriteLine"], correta: 2 },
        },
      ],
      mensagemCerta: "Certo: TextWindow.WriteLine escreve na janela de texto.",
      mensagemErrada: "No Small Basic, quem escreve na tela é um comando da TextWindow.",
    },
    {
      titulo: "Questão 7",
      enunciado: "Qual comando em Small Basic é usado para ler a entrada do usuário?",
      campos: [
        {
          id: "q7",
          regra: { tipo: "multipla_escolha", opcoes: ["A) TextWindow.Read", "B) Input", "C) GetInput"], correta: 0 },
        },
      ],
      mensagemCerta: "Certo: TextWindow.Read lê o que o usuário digita.",
      mensagemErrada: "A leitura também é um comando da TextWindow.",
    },
    {
      titulo: "Questão 8",
      enunciado: "De acordo com o que você aprendeu sobre a Tartaruguinha do Small Basic, é correto afirmar que:",
      campos: [
        {
          id: "q8",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "a) Ela só funciona na janela de texto (TextWindow).",
              "b) Ela desenha na janela gráfica seguindo comandos como Turtle.Move (andar) e Turtle.Turn (girar).",
              "c) Turtle.Turn(90) faz a tartaruga andar 90 passos para frente.",
              "d) Ela nunca deixa rastro, porque a caneta fica sempre levantada.",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Certo: Move anda, Turn gira, e o rastro desenha na janela gráfica.",
      mensagemErrada: "Lembre: Turn gira (em graus), Move anda, e a caneta começa abaixada.",
    },
    {
      titulo: "Questão 9 (2,0)",
      enunciado: "Observe o fluxograma abaixo e responda: qual é o objetivo principal deste diagrama de fluxo?",
      imagem: {
        url: "/provas/logica-de-programacao/fluxograma-domingo.svg",
        alt: "Fluxograma: Início, Acordar, Tomar café, pergunta Dia de Sol? (Sim: Vou à praia; Não: Ler jornal), depois Ir ao cinema, Fazer refeição, Ir dormir e Fim do domingo.",
        legenda: "Fluxograma da questão 9",
      },
      campos: [
        {
          id: "q9",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "a) Controlar a rotina de trabalho em um dia útil.",
              "b) Representar uma rotina de domingo baseada na condição do tempo.",
              "c) Mostrar um plano alimentar completo para o final de semana.",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Certo: o losango “Dia de Sol?” desvia a rotina do domingo.",
      mensagemErrada: "Olhe o início, o fim e a decisão no meio do fluxograma.",
    },
  ],
};

export default prova;
