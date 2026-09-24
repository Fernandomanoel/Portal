import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-aprendendo-fazendo-basico.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Aprendendo e Fazendo na Prática — Básico",
  introducao: "Excel Básico",
  itens: [
    {
      id: "atividade-extra-de-excel-2021",
      titulo: "Atividade Extra de Excel 2021",
      blocos: [
        {
          tipo: "texto",
          texto: "Atividades Aprendendo e Fazendo Prática",
        },
        {
          tipo: "subtitulo",
          texto: "01) Bolsa de Valores",
        },
        {
          tipo: "texto",
          texto: "Elaborar a planilha abaixo, e depois, elaborar um gráfico de colunas, como mostrado abaixo:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E"],
          linhas: [
            ["1","BOLSA DE VALORES","","","",""],
            ["2","","","","",""],
            ["3","RELAÇÃO DE MOVIMENTO FINANCEIRA DA SEMANA","","","",""],
            ["4","","","","",""],
            ["5","DIAS DA SEMANA","","","",""],
            ["7","","VALOR MÁXIMO","VALOR MÍNIMO","FECHAMENTO","ABERTURA DO PREGÃO"],
            ["8","Segunda-feira","24000,00","22980","23900,8","23000"],
            ["9","Terça-Feira","24120,00","23014","24019","23115"],
            ["10","Quarta-feira","24240,00","23129,57","24139,6","23230,58"],
            ["11","Quinta-feira","24361,00","23254","24260","23346,73"],
            ["12","Sexta-feira","24483,61","23361,45","24381,6","23463,46"],
          ],
        },
        {
          tipo: "texto",
          texto: "Obs: Adicione o Gráfico de Barras, como o exemplo abaixo, comparando os quatro valores (Valor Máximo, Valor Mínimo, Fechamento, Abertura do Pregão) de cada dia da semana:",
        },
        {
          tipo: "texto",
          texto: "Segunda-feira",
        },
        {
          tipo: "texto",
          texto: "Terça-Feira",
        },
        {
          tipo: "texto",
          texto: "Quarta-feira",
        },
        {
          tipo: "texto",
          texto: "Quinta-feira",
        },
        {
          tipo: "texto",
          texto: "Sexta-feira",
        },
        {
          tipo: "subtitulo",
          texto: "02) Lista de Preço de Automóveis — usando =CONT.SE",
        },
        {
          tipo: "texto",
          texto: "Elaborar a tabela abaixo escrevendo os dados abaixo, usando a fórmula =CONT.SE.",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D"],
          linhas: [
            ["1","LISTA DE PREÇO DE AUTOMÓVEIS","","",""],
            ["2","","","",""],
            ["3","CLASSE","TIPO","MARCA","VALOR TABELA"],
            ["4","1","Monza","GM","R$ 23.000,00"],
            ["5","2","Gol","WV","R$ 15.000,00"],
            ["6","1","Corsa","GM","R$ 13.000,00"],
            ["7","3","Fiesta","FORD","R$ 14.000,00"],
            ["8","2","Palio","FIAT","R$ 23.000,00"],
            ["9","1","Parati","WV","R$ 23.000,00"],
            ["10","4","Ka","FORD","R$ 25.000,00"],
            ["11","5","Escort","FORD","R$ 20.000,00"],
            ["12","","","",""],
            ["13","QUANTIDADE VEÍCULOS GM","","",""],
            ["14","QUANTIDADE VEÍCULOS WV","","",""],
            ["15","QUANTIDADE VEÍCULOS FORD","","",""],
            ["16","QUANTIDADE VEÍCULOS FIAT","","",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Estrutura da Fórmula",
        },
        {
          tipo: "codigo",
          conteudo: "=CONT.SE(intervalo;critério)",
        },
        {
          tipo: "texto",
          texto: "Para contar quantos carros são da marca GM, o intervalo é a coluna Marca (C4:C11) e o critério é \"GM\":",
        },
        {
          tipo: "codigo",
          conteudo: "=CONT.SE(C4:C11;\"GM\")",
        },
        {
          tipo: "texto",
          texto: "Repita a mesma lógica trocando o critério para \"WV\", \"FORD\" e \"FIAT\" nas linhas seguintes.",
        },
      ],
    },
  ],
};

export default atividade;
