import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-tabela-impostos.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Extra Excel — Tabela de Impostos",
  introducao: "Excel Básico",
  itens: [
    {
      id: "o-que-voce-ira-fazer",
      titulo: "O que você irá fazer",
      blocos: [
        {
          tipo: "texto",
          texto: "Monte uma tabela de impostos, sendo esta simples e não muito trabalhosa!",
        },
        {
          tipo: "texto",
          texto: "Faça no Excel esta tabela abaixo:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["1","TABELA DE IMPOSTOS - OBJETOS DE CONSUMOS","","","",""],
            ["2","","","","",""],
            ["3","PRODUTO","PREÇO (R$)","IMPOSTO (%)","VALOR DO IMPOSTO","PREÇO FINAL"],
            ["4","CAMISA","50","10%","",""],
            ["5","CALÇA","120","8%","",""],
            ["6","TÊNIS","250","12%","",""],
            ["7","BONÉ","40","5%","",""],
            ["8","JAQUETA","300","15%","",""],
          ],
        },
      ],
    },
    {
      id: "calcule-o-valor-do-imposto",
      titulo: "Calcule o valor do imposto",
      blocos: [
        {
          tipo: "texto",
          texto: "Na coluna Valor do Imposto, o aluno deverá usar a fórmula:",
        },
        {
          tipo: "codigo",
          conteudo: "= Preço * Imposto",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exemplo explicado",
          texto: "",
          itens: ["Se o preço é R$ 10,00","E o imposto é 5%","Então: 10 * 5% = 0,50"],
        },
        {
          tipo: "texto",
          texto: "No Excel, se os valores estiverem nas linhas assim:",
        },
        {
          tipo: "lista",
          itens: ["Preço em B4","Imposto em C4"],
        },
        {
          tipo: "texto",
          texto: "A fórmula a ser escrita em D4 é:",
        },
        {
          tipo: "codigo",
          conteudo: "= B4 * C4",
        },
      ],
    },
    {
      id: "calculo-do-preco-final",
      titulo: "Cálculo do Preço Final",
      blocos: [
        {
          tipo: "texto",
          texto: "Usaremos a soma, por quê? Estaremos fazendo a soma do Preço do Produto + o Valor do Imposto, ou seja:",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exemplo",
          texto: "",
          itens: ["Se o preço é R$ 10,00","E o Valor do Imposto é 0,50","Então: 10 + 0,50 = 10,50"],
        },
        {
          tipo: "texto",
          texto: "No Excel, os valores estiverem nas linhas assim:",
        },
        {
          tipo: "lista",
          itens: ["Preço em B4","E o Valor do Imposto é D4"],
        },
        {
          tipo: "texto",
          texto: "A fórmula que será escrita em E4 é:",
        },
        {
          tipo: "codigo",
          conteudo: "=B4+D4",
        },
      ],
    },
  ],
};

export default atividade;
