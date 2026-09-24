import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-lista-de-atividades.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Lista de Atividades Excel",
  introducao: "Excel Básico",
  itens: [
    {
      id: "algumas-mensagens-de-erro-comuns",
      titulo: "Algumas Mensagens de Erro Comuns",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Erro","O que significa"],
          linhas: [
            ["#DIV/0!","Você está tentando dividir por zero e isto não é possível!!"],
            [
              "#NOME?",
              "Não, o Excel não quer saber qual é o seu nome. O valor de erro #NOME? ocorre quando o Microsoft Excel não reconhece o texto em uma fórmula, ou seja, esta mensagem está dizendo que você cometeu um erro de grafia no nome da função ou digitou uma fórmula que contém um nome (endereço) de célula que o Excel não reconhece.",
            ],
            ["#NOME?","Ocorre quando existe um problema com um número em uma fórmula ou função."],
            [
              "#####",
              "Ocorre quando o tipo de operando ou argumento errado é usado, como por exemplo, inserir texto quando a fórmula requer número.",
            ],
            [
              "#VALOR!",
              "Ocorre quando o tipo de operando ou argumento errado é usado, como por exemplo, inserir texto quando a fórmula requer número.",
            ],
            [
              "#VALOR!",
              "Ocorre quando um valor não se encontra disponível para uma função ou fórmula.",
            ],
            [
              "#REF! e #NULO!",
              "Ocorre quando uma referência (endereço) de uma célula ou de um intervalo de células não é válida.",
            ],
          ],
        },
      ],
    },
    {
      id: "relacao-de-algumas-funcoes",
      titulo: "Relação de Algumas Funções",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Função","O que faz","Exemplo"],
          linhas: [
            ["=SOMA( )","Soma um intervalo de células","=SOMA(A1:B5)"],
            ["=MÉDIA( )","Calcula a média aritmética de um intervalo de células","=MÉDIA(A1:B5)"],
            ["=MÁXIMO( )","Retorna o valor máximo do intervalo","=MÁXIMO(A1:B5)"],
            ["=MÍNIMO( )","Retorna o valor mínimo do intervalo","=MÍNIMO(A1:B5)"],
            [
              "=SE(teste;\"valor_se_V\";\"valor_se_F\")",
              "Retorna um valor se o teste for falso e outro valor se o teste for verdadeiro",
              "=SE(A1>=6,0;\"Parabéns!!!\";\"Está em Recuperação\")",
            ],
          ],
        },
      ],
    },
    {
      id: "01-empresa-nacional-s-a",
      titulo: "01) Empresa Nacional S/A",
      blocos: [
        {
          tipo: "texto",
          texto: "Elaborar a planilha abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "texto",
          texto: "1ª Tabela — 1º Trimestre",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F","G","H","I"],
          linhas: [
            ["1","Código","Produto","Jan","Fev","Mar","Total 1º Trim.","Máximo","Mínimo","Média"],
            ["2","1","Porca","4.500,00","5.040,00","5.696,00","","","",""],
            ["3","2","Parafuso","6.250,00","7.000,00","7.910,00","","","",""],
            ["4","3","Arruela","3.300,00","3.696,00","4.176,00","","","",""],
            ["5","4","Prego","8.000,00","8.690,00","10.125,00","","","",""],
            ["6","5","Alicate","4.557,00","5.104,00","5.676,00","","","",""],
            ["7","6","Martelo","3.260,00","3.640,00","4.113,00","","","",""],
            ["8","Totais","","","","","","","",""],
          ],
        },
        {
          tipo: "texto",
          texto: "2ª Tabela — 2º Trimestre",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F","G","H","I"],
          linhas: [
            ["10","Código","Produto","Abr","Mai","Jun","Total 2º Trim.","Máximo","Mínimo","Média"],
            ["11","1","Porca","6.265,00","6.954,00","7.858,00","","","",""],
            ["12","2","Parafuso","8.701,00","9.658,00","10.197,00","","","",""],
            ["13","3","Arruela","4.569,00","5.099,00","5.769,00","","","",""],
            ["14","4","Prego","12.341,00","12.365,00","13.969,00","","","",""],
            ["15","5","Alicate","6.344,00","7.042,00","7.957,00","","","",""],
            ["16","6","Martelo","4.525,00","5.022,00","5.671,00","","","",""],
            ["17","Totais","","","","","","","",""],
            ["19","Total do Semestre","","","","","","","",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Fórmulas",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "1ª Tabela",
          texto: "",
          itens: [
            "Total 1º Trimestre: soma das vendas dos meses de Jan / Fev / Mar.",
            "Máximo: calcular o maior valor entre os meses de Jan / Fev / Mar.",
            "Mínimo: calcular o menor valor entre os meses de Jan / Fev / Mar.",
            "Média: calcular a média dos valores entre os meses de Jan / Fev / Mar.",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "2ª Tabela",
          texto: "Totais: soma das colunas de cada mês (1ª e 2ª tabela).",
          itens: [
            "Total 2º Trimestre: soma das vendas dos meses de Abr / Mai / Jun.",
            "Máximo: calcular o maior valor entre os meses de Abr / Mai / Jun.",
            "Mínimo: calcular o menor valor entre os meses de Abr / Mai / Jun.",
            "Média: calcular a média dos valores entre os meses de Abr / Mai / Jun.",
          ],
        },
      ],
    },
    {
      id: "02-filmes-total-e-media-por-mes",
      titulo: "02) Filmes — Total e Média por mês",
      blocos: [
        {
          tipo: "texto",
          texto: "Elaborar a planilha abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "subtitulo",
          texto: "Fórmulas",
        },
        {
          tipo: "texto",
          texto: "Você vai trabalhar com os meses:",
        },
        {
          tipo: "lista",
          itens: ["Jan (Janeiro)","Fev (Fevereiro)","Mar (Março)"],
        },
        {
          tipo: "texto",
          texto: "E fazer 4 cálculos:",
        },
        {
          tipo: "lista",
          itens: ["Total","Média"],
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F"],
          linhas: [
            ["1","FILMES","Comédia","Suspense","Terror","Romance","Totais"],
            ["2","Jan","10","29","33","25",""],
            ["3","Fev","14","30","12","29",""],
            ["4","Mar","23","11","17","12",""],
            ["5","Abr","31","42","21","36",""],
            ["6","Mai","21","33","28","43",""],
            ["7","Jun","32","23","20","23",""],
            ["8","Jul","24","41","22","11",""],
            ["9","Ago","41","32","5","19",""],
            ["10","Set","15","21","13","10",""],
            ["11","Out","44","14","36","9",""],
            ["12","Nov","34","12","31","21",""],
            ["13","Dez","22","43","34","25",""],
            ["14","Totais","","","","",""],
          ],
        },
        {
          tipo: "texto",
          texto: "Esses cálculos podem ser feitos por tipo de filme (Comédia, Suspense, etc.) ou com os valores que o professor pedir.",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Coloque o gráfico ao finalizar.",
        },
      ],
    },
  ],
};

export default atividade;
