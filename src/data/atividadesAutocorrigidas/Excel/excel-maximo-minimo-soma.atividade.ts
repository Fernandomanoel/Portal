import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-maximo-minimo-soma.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Planilha com Máximo, Mínimo e Soma",
  introducao: "Excel Básico",
  itens: [
    {
      id: "lista-de-exercicios-de-excel",
      titulo: "Lista de Exercícios de Excel",
      blocos: [
        {
          tipo: "texto",
          texto: "01) Elaborar a planilha abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "subtitulo",
          texto: "Empresa Nacional S/A",
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
          texto: "Totais: soma das colunas de cada mês (1ª e 2ª tabela). Total do Semestre: soma dos totais de cada trimestre.",
          itens: [
            "Total 2º Trimestre: soma das vendas dos meses de Abr / Mai / Jun.",
            "Máximo: calcular o maior valor entre os meses de Abr / Mai / Jun.",
            "Mínimo: calcular o menor valor entre os meses de Abr / Mai / Jun.",
            "Média: calcular a média dos valores entre os meses de Abr / Mai / Jun.",
          ],
        },
        {
          tipo: "texto",
          texto: "Usando a linha da Porca (linha 2) como exemplo, as fórmulas ficam assim:",
        },
        {
          tipo: "codigo",
          conteudo: `Total 1º Trim. (F2):  =SOMA(C2:E2)
Máximo (G2):        =MÁXIMO(C2:E2)
Mínimo (H2):        =MÍNIMO(C2:E2)
Média (I2):         =MÉDIA(C2:E2)`,
        },
        {
          tipo: "texto",
          texto: "O mesmo padrão vale para a segunda tabela, trocando o intervalo Jan/Fev/Mar (colunas C:E) pelo intervalo Abr/Mai/Jun. Para os Totais de cada coluna, some as 6 linhas de produtos (ex.: =SOMA(C2:C7)). Para o Total do Semestre, some o Total 1º Trim. com o Total 2º Trim. de cada produto.",
        },
      ],
    },
  ],
};

export default atividade;
