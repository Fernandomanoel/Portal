import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-contas-a-pagar.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Contas a Pagar usando o Excel",
  introducao: "Excel Básico",
  itens: [
    {
      id: "contas-a-pagar",
      titulo: "Contas a Pagar",
      blocos: [
        {
          tipo: "texto",
          texto: "Elaborar a planilha abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F","G"],
          linhas: [
            ["1","CONTAS A PAGAR","","","","","",""],
            ["2","","","","","","",""],
            ["3","","JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO"],
            ["4","SALÁRIO","R$ 500,00","R$ 750,00","R$ 800,00","R$ 700,00","R$ 654,00","R$ 700,00"],
            ["5","","","","","","",""],
            ["6","CONTAS","","","","","",""],
            ["7","ÁGUA","R$ 10,00","R$ 15,00","R$ 15,00","R$ 12,00","R$ 12,00","R$ 11,00"],
            ["8","LUZ","R$ 50,00","R$ 60,00","R$ 54,00","R$ 55,00","R$ 54,00","R$ 56,00"],
            ["9","ESCOLA","R$ 300,00","R$ 250,00","R$ 300,00","R$ 300,00","R$ 200,00","R$ 200,00"],
            ["10","IPTU","R$ 40,00","R$ 40,00","R$ 40,00","R$ 40,00","R$ 40,00","R$ 40,00"],
            ["11","IPVA","R$ 10,00","R$ 15,00","R$ 14,00","R$ 15,00","R$ 20,00","R$ 31,00"],
            ["12","SHOPPING","R$ 120,00","R$ 150,00","R$ 130,00","R$ 200,00","R$ 150,00","R$ 190,00"],
            ["13","COMBUSTÍVEL","R$ 50,00","R$ 60,00","R$ 65,00","R$ 70,00","R$ 65,00","R$ 85,00"],
            ["14","ACADEMIA","R$ 145,00","R$ 145,00","R$ 145,00","R$ 145,00","R$ 100,00","R$ 145,00"],
            ["15","","","","","","",""],
            ["16","TOTAL DE CONTAS","","","","","",""],
            ["17","","","","","","",""],
            ["18","SALDO","","","","","",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Fórmulas:",
        },
        {
          tipo: "lista",
          itens: ["Total de Contas: soma das contas de cada mês.","Saldo: Salário menos Total de Contas."],
        },
      ],
    },
    {
      id: "folha-da-araras-informatica",
      titulo: "Folha da Araras Informática",
      blocos: [
        {
          tipo: "texto",
          texto: "Elaborar as planilhas abaixo, fazendo-se o que se pede:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D","E","F","G","H"],
          linhas: [
            ["1","Araras Informática - Hardware e Software","","","","","","",""],
            ["2","Rua São Francisco de Assis, 123 - Araras SP","","","","","","",""],
            ["3","","","","","","","",""],
            [
              "4",
              "Nº",
              "NOME",
              "Salário Bruto",
              "INSS",
              "Gratificação",
              "INSS R$",
              "Gratificação R$",
              "Salário Líquido",
            ],
            ["5","1","Eduardo","R$ 853,00","10,00%","9,00%","","",""],
            ["6","2","Maria","R$ 951,00","9,99%","8,00%","","",""],
            ["7","3","Helena","R$ 456,00","8,64%","6,00%","","",""],
            ["8","4","Gabriela","R$ 500,00","8,50%","6,00%","","",""],
            ["9","5","Edson","R$ 850,00","8,99%","7,00%","","",""],
            ["10","6","Elisangela","R$ 459,00","6,25%","5,00%","","",""],
            ["11","7","Regina","R$ 478,00","7,12%","5,00%","","",""],
            ["12","8","Paulo","R$ 658,00","5,99%","4,00%","","",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Fórmulas",
        },
        {
          tipo: "lista",
          itens: [
            "INSS R$: multiplicar Salário Bruto por INSS.",
            "Gratificação R$: multiplicar Salário Bruto por Gratificação.",
            "Salário Líquido: Salário Bruto mais Gratificação R$ menos INSS R$.",
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "",
        },
      ],
    },
  ],
};

export default atividade;
