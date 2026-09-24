import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-relatorio-vendas-mensais.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática — Relatório de Vendas Mensais",
  introducao: "Aprender a: Digitar e organizar dados; Formatar células; Usar fórmulas básicas; Calcular total, média, maior e menor valor; Trabalhar com planilhas empresariais simples",
  itens: [
    {
      id: "situacao-problema",
      titulo: "Situação-Problema",
      blocos: [
        {
          tipo: "texto",
          texto: "A empresa EOBRA S/A precisa organizar um relatório simples de vendas mensais para controle interno.",
        },
        {
          tipo: "subtitulo",
          texto: "Criando a Planilha",
        },
        {
          tipo: "lista",
          itens: ["Abra o Microsoft Excel.","Crie uma planilha em branco.","Preencha conforme abaixo:"],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Cabeçalho",
        },
        {
          tipo: "lista",
          itens: ["A1: EOBRA S/A","A2: RELATÓRIO DE VENDAS – MÊS ATUAL"],
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["1","EOBRA S/A","",""],
            ["2","RELATÓRIO DE VENDAS – MÊS ATUAL","",""],
          ],
        },
        {
          tipo: "texto",
          texto: "A tabela de dados você fará desta forma:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["1","EOBRA S/A","",""],
            ["2","RELATÓRIO DE VENDAS – MÊS ATUAL","",""],
            ["3","","",""],
            ["4","FUNCIONARIO","SETOR","VENDAS (R$)"],
          ],
        },
        {
          tipo: "texto",
          texto: "Os dados dos Funcionários:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["4","FUNCIONARIO","SETOR","VENDAS (R$)"],
            ["5","Ana Souza","Comercial","127000"],
            ["6","Carlos Lima","Comercial","82000"],
            ["7","João Pereira","Comercial","103000"],
            ["8","Maria Santos","Comercial","106500"],
            ["9","Pedro Alves","Comercial","57000"],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Formatação Básica (Manual)",
        },
        {
          tipo: "lista",
          itens: [
            "Selecione o cabeçalho da tabela.",
            "Aplique:",
            "— Fonte Arial",
            "— Tamanho 12",
            "— Negrito",
            "— Bordas na tabela",
            "Formate a coluna VENDAS como Moeda (R$).",
          ],
          numerada: true,
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["1","EOBRA S/A","",""],
            ["2","RELATÓRIO DE VENDAS – MÊS ATUAL","",""],
            ["3","","",""],
            ["4","FUNCIONARIO","SETOR","VENDAS (R$)"],
            ["5","Ana Souza","Comercial","R$ 127.000,00"],
            ["6","Carlos Lima","Comercial","R$ 82.000,00"],
            ["7","João Pereira","Comercial","R$ 103.000,00"],
            ["8","Maria Santos","Comercial","R$ 106.500,00"],
            ["9","Pedro Alves","Comercial","R$ 57.000,00"],
          ],
        },
      ],
    },
    {
      id: "calculos-basicos",
      titulo: "Cálculos Básicos",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Atividade — Total de Vendas",
          texto: "Na célula C10, digite:",
        },
        {
          tipo: "codigo",
          conteudo: "=SOMA(C5:C9)",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["4","FUNCIONARIO","SETOR","VENDAS (R$)"],
            ["5","Ana Souza","Comercial","R$ 127.000,00"],
            ["6","Carlos Lima","Comercial","R$ 82.000,00"],
            ["7","João Pereira","Comercial","R$ 103.000,00"],
            ["8","Maria Santos","Comercial","R$ 106.500,00"],
            ["9","Pedro Alves","Comercial","R$ 57.000,00"],
            ["10","","TOTAL DE VENDAS","=SOMA(C5:C9)"],
          ],
        },
        {
          tipo: "texto",
          texto: "Logo após você fará a outra parte:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C"],
          linhas: [
            ["4","FUNCIONARIO","SETOR","VENDAS (R$)"],
            ["5","Ana Souza","Comercial","R$ 127.000,00"],
            ["6","Carlos Lima","Comercial","R$ 82.000,00"],
            ["7","João Pereira","Comercial","R$ 103.000,00"],
            ["8","Maria Santos","Comercial","R$ 106.500,00"],
            ["9","Pedro Alves","Comercial","R$ 57.000,00"],
            ["10","","TOTAL DE VENDAS","R$ 475.500,00"],
            ["11","","MÉDIA DE VENDAS","=MÉDIA(C5:C9)"],
          ],
        },
        {
          tipo: "texto",
          texto: "E FIM.",
        },
      ],
    },
  ],
};

export default atividade;
