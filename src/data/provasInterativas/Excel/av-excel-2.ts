import type { ProvaInterativa } from "@/types/quiz";

const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Excel — Avaliação Prática: Compras do Mês",
  instrucoes: [
    "Passo 1 (Criação): Crie uma nova planilha chamada 'Minhas Compras do Mês'. Faça uma tabela com as colunas: Produto, Quantidade, Preço Unitário e Total.",
    "Passo 2 (Dados): Preencha a tabela com 10 produtos de supermercado (ex: Arroz, Feijão, Leite), inserindo valores fictícios para a Quantidade e o Preço Unitário.",
    "Passo 3 (Cálculo): Na coluna 'Total', calcule o valor multiplicando a Quantidade pelo Preço Unitário (ex: =B2*C2). Use a alça de preenchimento para aplicar a fórmula nas restantes linhas.",
    "Passo 4 (Formatação e Comentário): Formate as colunas 'Preço Unitário' e 'Total' como Moeda (R$). Insira um comentário numa das células de Total a explicar como o valor foi calculado (ex: 'Multiplicado pela quantidade').",
    "Passo 5 (Visual): Adicione um título à planilha com uma fonte maior e em negrito. Aplique cor de fundo nos títulos das colunas, alinhamento central e bordas em toda a tabela.",
    "Passo 6 (Funções): Abaixo da tabela, crie uma célula para calcular o total geral das compras, utilizando a função =SOMA() na coluna 'Total'.",
    "Passo 7 (Gráfico): Selecione os dados das colunas 'Produto' e 'Total'. Insira um Gráfico de Colunas e altere o título do gráfico para 'Gastos por Produto'.",
    "Passo 8 (Envio): Guarde o ficheiro no seu computador e envie-o no campo abaixo."
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".xlsx"],
    rotulo: "Envie a sua planilha finalizada (.xlsx)"
  }
};

export default prova;