import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-calculo-emprestimo.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Excel Básico — Cálculo de Empréstimo",
  introducao: "Você recebeu uma lista de pessoas que possuem dívidas com diferentes taxas de juros e prazos de pagamento. Seu objetivo é calcular os juros simples e descobrir o valor total que cada pessoa deverá pagar, usando Excel. Para isso, você deverá: Calcular o valor dos juros usando a fórmula: Juros = Dívida × Taxa × Meses; Calcular o valor total, somando a dívida inicial com os juros calculados. Preencha a tabela no Excel usando fórmulas e obtenha o valor final para cada pessoa.",
  itens: [
    {
      id: "crie-esta-tabela-abaixo",
      titulo: "Crie esta tabela abaixo",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F"],
          linhas: [
            ["1","CALCULO DE DÍVIDA","","","","",""],
            ["2","","","","","",""],
            [
              "3",
              "NOME",
              "DÍVIDA INICIAL (R$)",
              "JUROS AO MÊS (%)",
              "MESES",
              "JUROS CALCULADOS",
              "VALOR TOTAL",
            ],
            ["4","Davi de Paula","500","7,96%","4","",""],
            ["5","Vanessa Garcia","750","8,16%","2","",""],
            ["6","Marco de Sousa","1900","7,96%","1","",""],
            ["7","Laura Maria","650","8,16%","3","",""],
            ["8","Laura Maria","600","7,96%","8","",""],
            ["9","Paulo Mota","1200","8,16%","5","",""],
            ["10","Priscila Morais","2122","7,96%","2","",""],
          ],
        },
      ],
    },
    {
      id: "deixe-a-tabela-bonita",
      titulo: "Deixe a tabela bonita",
      blocos: [
        {
          tipo: "texto",
          texto: "Ao terminar a tabela inteira, primeiro escreva e logo após faça o design desta tabela, colocando as suas bordas da coluna \"NOME\", até o \"VALOR TOTAL\". Para colocar as bordas aperte em:",
        },
        {
          tipo: "lista",
          itens: [
            "Aperte em Página Inicial",
            "Logo após aperte em Fonte",
            "Procure o ícone de bordas",
            "Aperte na setinha para baixo e selecione Todas as bordas",
          ],
        },
      ],
    },
    {
      id: "fazendo-as-formulas",
      titulo: "Fazendo as fórmulas",
      blocos: [
        {
          tipo: "texto",
          texto: "A primeira parte que você colocará as fórmulas é em JUROS CALCULADOS, por conta que será feito o cálculo do Valor do Juros:",
        },
        {
          tipo: "texto",
          texto: "A fórmula é:",
        },
        {
          tipo: "codigo",
          conteudo: "=B2 (DIVIDA INICIAL OU VALOR EMPRESTADO) * (MULTIPLICADO) PELO C2 (TAXA DE JUROS) * (MULTIPLICADO) PELOS MESES",
        },
        {
          tipo: "texto",
          texto: "Ou seja:",
        },
        {
          tipo: "codigo",
          conteudo: "=B2*C2*D2",
        },
        {
          tipo: "texto",
          texto: "Desta forma, na linha 4 do exemplo:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["3","NOME","DÍVIDA INICIAL (R$)","JUROS AO MÊS (%)","MESES","JUROS CALCULADOS"],
            ["4","Davi de Paula","500","7,96%","4","=B4*C4*D4"],
          ],
        },
        {
          tipo: "texto",
          texto: "Logo após terminar de fazer a fórmula na coluna JUROS CALCULADOS, você fará na coluna VALOR TOTAL, a soma da DIVIDA INICIAL com o JUROS CALCULADOS, ou seja:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F"],
          linhas: [
            [
              "3",
              "NOME",
              "DÍVIDA INICIAL (R$)",
              "JUROS AO MÊS (%)",
              "MESES",
              "JUROS CALCULADOS",
              "VALOR TOTAL",
            ],
            ["4","Davi de Paula","500","7,96%","4","R$ 159,20","=B4+E4"],
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Número Contábil",
        },
      ],
    },
  ],
};

export default atividade;
