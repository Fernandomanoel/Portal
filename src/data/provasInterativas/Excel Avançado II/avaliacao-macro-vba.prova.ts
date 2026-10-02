import type { ProvaInterativa } from "@/types/quiz";

/**
 * Formatada a partir de "Avaliação Prática - Excel Avançado II - Criação de
 * Macro VBA" (PDF do portal antigo). O código da macro ficou num arquivo de
 * apoio (`material`) para o aluno copiar e colar sem perder a indentação.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Excel Avançado II — Avaliação Prática: Criação de Macro VBA",
  instrucoes: [
    "Objetivos: aprender a usar InputBox para entrada de dados; manipular células e tabelas no Excel; trabalhar com condições (If...Then) e cálculos simples; organizar dados automaticamente no Excel.",
    "O exercício é criar uma macro que solicite ao usuário o nome de um aluno e as notas 1, 2 e 3; calcule a média; classifique o aluno como \"Aprovado\" (média >= 7) ou \"Reprovado\" (média < 7); e insira essas informações em uma tabela formatada no Excel.",
    "Passo 1 (Abrir o Editor VBA · 2,0 pontos): No Excel, pressione Alt + F11. Clique em Inserir → Módulo para adicionar um novo módulo.",
    "Passo 2 (Inserir o código VBA · 2,0 pontos): Abra o arquivo de apoio com o código da macro (link abaixo), copie todo o texto e cole no módulo criado. O código começa em Sub CadastroDeAlunos() e termina em End Sub.",
    "Passo 3 (Executar a macro · 2,0 pontos): Volte ao Excel e pressione Alt + F8. Selecione CadastroDeAlunos e clique em Executar. Preencha as caixas com o nome de um aluno e as 3 notas. Repita para cadastrar mais dois alunos, um deles com média menor que 7, para ver o status Reprovado.",
    "Passo 4 (Verificar a tabela · 2,0 pontos): Confirme se os dados foram registrados corretamente na planilha \"Alunos\" e se a formatação está aplicada corretamente.",
    "Passo 5 (Salvar e enviar o arquivo · 2,0 pontos): Salve o arquivo como Pasta de Trabalho Habilitada para Macro do Excel (.xlsm) e envie no campo abaixo.",
  ],
  material: {
    rotulo: "Código da macro (copie e cole no módulo do VBA)",
    url: "/provas/excel-avancado-ii/macro-cadastro-de-alunos.txt",
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".xlsm"],
    rotulo: "Envie o arquivo Excel habilitado para macro (.xlsm)",
  },
};

export default prova;
