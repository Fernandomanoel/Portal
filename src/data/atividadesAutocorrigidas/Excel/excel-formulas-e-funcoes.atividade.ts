import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-formulas-e-funcoes.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividades Extras — Trabalhando com Fórmulas e Funções",
  introducao: "Excel Básico",
  itens: [
    {
      id: "introducao-leitura-obrigatoria",
      titulo: "Introdução (leitura obrigatória)",
      blocos: [
        {
          tipo: "texto",
          texto: "Antes de aprender a usar fórmulas no Excel, é importante entender que o Excel não pensa sozinho.",
        },
        {
          tipo: "texto",
          texto: "Quem decide o que será calculado é o usuário. O Excel apenas executa os cálculos seguindo regras da matemática.",
        },
        {
          tipo: "texto",
          texto: "A matemática está presente em várias situações do nosso dia a dia, como:",
        },
        {
          tipo: "lista",
          itens: ["Compras no mercado","Cálculo de salário","Parcelas de um produto","Controle de gastos"],
        },
        {
          tipo: "texto",
          texto: "Por isso, entender matemática ajuda muito a usar corretamente o Excel e outros programas.",
        },
      ],
    },
    {
      id: "o-que-sao-formulas-e-funcoes",
      titulo: "O que são Fórmulas e Funções?",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Fórmulas",
        },
        {
          tipo: "texto",
          texto: "Fórmulas são cálculos criados pelo próprio usuário, utilizando números e operadores matemáticos.",
        },
        {
          tipo: "codigo",
          conteudo: "10 + 5",
        },
        {
          tipo: "texto",
          texto: "No Excel, toda fórmula começa com o sinal de igual (=).",
        },
        {
          tipo: "codigo",
          conteudo: "=10+5",
        },
        {
          tipo: "subtitulo",
          texto: "Funções",
        },
        {
          tipo: "texto",
          texto: "Funções são fórmulas prontas, que já existem dentro do Excel.",
        },
        {
          tipo: "texto",
          texto: "Elas facilitam os cálculos e evitam erros.",
        },
        {
          tipo: "texto",
          texto: "Exemplo de função:",
        },
        {
          tipo: "codigo",
          conteudo: "=SOMA(5;10;15)",
        },
      ],
    },
    {
      id: "operadores-matematicos",
      titulo: "Operadores Matemáticos",
      blocos: [
        {
          tipo: "texto",
          texto: "Os operadores indicam qual cálculo será feito com os números.",
        },
        {
          tipo: "tabela",
          colunas: ["Operador","Significado"],
          linhas: [
            ["+","Adição"],
            ["-","Subtração"],
            ["*","Multiplicação"],
            ["/","Divisão"],
          ],
        },
      ],
    },
    {
      id: "atividade-criando-formulas-simples",
      titulo: "Atividade — Criando fórmulas simples",
      blocos: [
        {
          tipo: "lista",
          itens: ["Abra o Microsoft Excel.","Em uma planilha em branco, preencha os dados abaixo:"],
        },
        {
          tipo: "tabela",
          colunas: ["","A"],
          linhas: [
            ["1","10"],
            ["2","5"],
          ],
        },
        {
          tipo: "texto",
          texto: "Agora, faça os cálculos:",
        },
        {
          tipo: "subtitulo",
          texto: "a) Na célula A3, some os valores de A1 e A2",
        },
        {
          tipo: "codigo",
          conteudo: "=A1+A2",
        },
        {
          tipo: "subtitulo",
          texto: "b) Na célula A4, subtraia A2 de A1",
        },
        {
          tipo: "codigo",
          conteudo: "=A1-A2",
        },
        {
          tipo: "subtitulo",
          texto: "c) Na célula A5, multiplique A1 por A2",
        },
        {
          tipo: "codigo",
          conteudo: "=A1*A2",
        },
        {
          tipo: "subtitulo",
          texto: "d) Na célula A6, divida A1 por A2",
        },
        {
          tipo: "codigo",
          conteudo: "=A1/A2",
        },
      ],
    },
  ],
};

export default atividade;
