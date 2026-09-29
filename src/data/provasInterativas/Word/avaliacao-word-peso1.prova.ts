import type { ProvaInterativa } from "@/types/quiz";

const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Word — Prova Prática",
  instrucoes: [
    "Passo 1: Abra o Microsoft Word, crie um novo documento em branco e guarde-o com o nome 'Prova_Word_SeuNome' (ex: Prova_Word_AnaSilva).",
    "Passo 2: Insira o título 'Meu Documento no Word' (centralizado e em negrito).",
    "Passo 3: Escreva um parágrafo sobre o que gosta de fazer no seu tempo livre.",
    "Passo 4: Crie uma lista com marcadores com 3 tópicos sobre os seus objetivos (ex: Aprender informática, Melhorar minhas habilidades no Word).",
    "Passo 5: Insira uma imagem (da internet ou do computador) abaixo da lista, ajuste o tamanho para ficar proporcional e insira uma legenda (ex: 'Essa imagem representa meus objetivos.').",
    "Passo 6: Altere a fonte de todo o documento para Arial. O tamanho do título deve ser 18 e o texto 12. O espaçamento entre linhas deve ser de 1,5.",
    "Passo 7: Insira um rodapé na página com o texto: 'Prova de Word – [Seu Nome]'.",
    "Passo 8: Insira um gráfico de colunas e preencha com os dados: Produto A (50), Produto B (80) e Produto C (30).",
    "Passo 9: Altere o título do gráfico para 'Vendas do Trimestre' e mude a cor das barras para um tom de verde.",
    "Passo 10: Guarde todas as alterações e envie o ficheiro final aqui."
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc"],
    rotulo: "Envie o seu documento do Word finalizado"
  }
};

export default prova;