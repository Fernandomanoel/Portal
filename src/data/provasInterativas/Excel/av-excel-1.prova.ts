import type { ProvaInterativa } from "@/types/quiz";

const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Excel Básico — Boletim Escolar e Gráfico",
  instrucoes: [
    "Passo 1: Abra o Microsoft Excel e crie uma nova pasta de trabalho em branco.",
    "Passo 2: Crie uma tabela com 5 linhas e 7 colunas.",
    "Passo 3: Na primeira linha, crie os seguintes cabeçalhos: Nome do Aluno, Nota 1, Nota 2, Nota 3, Soma Total, Média, e Situação.",
    "Passo 4: Na coluna 'Nome do Aluno', preencha as 4 linhas seguintes com nomes à sua escolha (ex: Ana, Carlos, João, Maria).",
    "Passo 5: Preencha as colunas de Nota 1, 2 e 3 com valores numéricos (de 0 a 10) para cada aluno.",
    "Passo 6: Na coluna 'Soma Total', utilize a fórmula matemática (ex: SOMA) para calcular o total das três notas de cada aluno.",
    "Passo 7: Na coluna 'Média', utilize a fórmula de MÉDIA para encontrar a nota final de cada aluno.",
    "Passo 8: Na coluna 'Situação', utilize a fórmula SE para classificar o aluno como 'Aprovado' (se a média for maior ou igual a 7) ou 'Reprovado' (se for menor).",
    "Passo 9: Formate a sua tabela. Aplique cores de preenchimento nos cabeçalhos, coloque os títulos em negrito e adicione bordas em todas as células.",
    "Passo 10: Selecione a coluna dos Nomes e a coluna das Médias, e crie um Gráfico de Pizza demonstrando o desempenho da turma.",
    "Passo 11: Guarde a planilha no seu computador e envie o ficheiro final no campo abaixo."
  ],
  exemploTabela: {
    colunas: ["Nome do Aluno", "Nota 1", "Nota 2", "Nota 3", "Soma Total", "Média", "Situação"],
    linhas: [
      ["Ana", "8", "7", "9", "24", "8,0", "Aprovado"],
      ["Carlos", "5", "6", "6", "17", "5,7", "Reprovado"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".xlsx"],
    rotulo: "Envie a sua planilha finalizada (.xlsx)"
  }
};

export default prova;