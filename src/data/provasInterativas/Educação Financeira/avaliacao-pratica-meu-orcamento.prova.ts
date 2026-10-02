import type { ProvaInterativa } from "@/types/quiz";

/**
 * Educação Financeira — avaliação prática e subjetiva. O aluno monta o
 * próprio orçamento numa planilha e escreve uma reflexão pessoal num
 * documento; o professor corrige (não há resposta certa, só critérios).
 * Prova escrita para o portal. Todos os números são do próprio aluno ou
 * fictícios: nada de dados reais precisa ser entregue.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Educação Financeira — Avaliação Prática: Meu Orçamento",
  instrucoes: [
    "Situação: você vai montar o orçamento de um mês e escrever o que aprendeu sobre o seu jeito de lidar com dinheiro. Pode usar os seus números reais ou os de uma pessoa fictícia (invente os valores, mas faça-os fazerem sentido). Ninguém precisa saber o que é real. A prova vale 10 pontos; não existe resposta única, vale o seu raciocínio. Pode usar outras abas e programas.",
    "Passo 1 (Receitas e despesas do mês · 2,0 pontos): No Excel, crie uma planilha com a aba Orçamento. Liste todas as receitas do mês (salário, mesada, bicos…) e, pelo menos, 8 despesas (moradia, alimentação, transporte, lazer, celular, saúde, estudos, outras). Use a tabela de exemplo abaixo como modelo: Categoria, Descrição e Valor.",
    "Passo 2 (Fórmulas · 1,5 ponto): Use SOMA para o total de receitas e para o total de despesas, e uma fórmula de subtração para o saldo do mês (receitas − despesas). Destaque o saldo em verde se for positivo e em vermelho se for negativo (Formatação Condicional).",
    "Passo 3 (Necessidade ou desejo · 1,5 ponto): Acrescente uma coluna Tipo e classifique cada despesa como Necessidade, Desejo ou Poupança. Em uma célula abaixo, calcule quanto por cento da renda foi para cada tipo. Salve como Orcamento_SeuNome.xlsx.",
    "Passo 4 (Meta de poupança · 1,5 ponto): No Word, escreva uma meta: o que você quer conseguir (um celular, uma viagem, uma reserva de emergência), quanto custa, em quantos meses e quanto precisa guardar por mês. Mostre a conta e diga de qual despesa do Passo 3 você poderia tirar esse valor.",
    "Passo 5 (Reflexão pessoal · 2,5 pontos): No mesmo documento, em 15 a 25 linhas e com suas palavras, responda: (a) O que mais surpreendeu você no seu orçamento? (b) Qual foi a última compra que você fez por impulso e como se sentiu depois? (c) Quais três hábitos você vai mudar nos próximos 3 meses e por quê? (d) Como as dívidas e os juros podem atrapalhar o orçamento de uma pessoa? Salve como Reflexao_SeuNome.docx.",
    "Passo 6 (Entrega · 1,0 ponto): Coloque Orcamento_SeuNome.xlsx e Reflexao_SeuNome.docx numa pasta com o seu nome, compacte em .zip e envie no campo abaixo. Confira antes se os dois arquivos abrem.",
  ],
  exemploTabela: {
    rotulo: "Modelo do Passo 1 — os valores e as categorias são livres, a estrutura é esta",
    colunas: ["Categoria", "Descrição", "Valor (R$)"],
    linhas: [
      ["Receita", "Salário", "1.800,00"],
      ["Moradia", "Aluguel", "600,00"],
      ["Alimentação", "Mercado", "450,00"],
      ["Lazer", "Cinema e lanche", "80,00"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip"],
    rotulo: "Envie o .zip com a planilha e o documento",
  },
};

export default prova;
