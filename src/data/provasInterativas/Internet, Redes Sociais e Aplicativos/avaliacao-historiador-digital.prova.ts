import type { ProvaInterativa } from "@/types/quiz";

/**
 * Reorganizada a partir de "Avaliação Prática – Internet, Redes Sociais e
 * Aplicativos" (PDF do portal antigo, versão 1). Mantém o tema (pesquisa
 * sobre o início das redes sociais, Word com 2 páginas, 2 imagens, título,
 * texto justificado e envio por e-mail com o assunto pedido), mas agora em
 * etapas encadeadas e com o roteiro do relatório.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Internet, Redes Sociais e Aplicativos — Avaliação Prática: Linha do Tempo das Redes Sociais",
  instrucoes: [
    "Situação: você trabalha como historiador(a) digital em um museu da internet. A coordenação pediu um relatório curto, de 2 páginas ou mais, que conte como as redes sociais começaram. Tudo o que você fizer em um passo entra no relatório do passo seguinte. A prova vale 10 pontos e pode ser feita em outras abas e programas.",
    "Passo 1 (Montar o roteiro · 1,0 ponto): Crie na Área de Trabalho uma pasta chamada Avaliacao_Redes e dentro dela abra um documento do Word em branco. Antes de pesquisar, copie para o documento as 5 perguntas que o relatório precisa responder: Como surgiram as redes sociais? Quem as criou (nomes e pessoas envolvidas)? Quais redes não existem mais? Quais são as mais usadas hoje? O que mudou na vida das pessoas?",
    "Passo 2 (Pesquisar com cuidado · 2,0 pontos): Pesquise cada pergunta no Google e use aspas (\"rede social\" história) em pelo menos uma busca. Escolha 3 fontes confiáveis (enciclopédia, jornal, revista ou site de universidade ou órgão público). Confirme cada nome e cada ano em pelo menos 2 fontes diferentes. Anote o endereço (URL) das 3 fontes.",
    "Passo 3 (Escrever o relatório · 2,0 pontos): Escreva o texto respondendo cada pergunta do Passo 1 com suas palavras, sem copiar e colar. Siga a estrutura da tabela abaixo. O relatório deve ter no mínimo 2 páginas.",
    "Passo 4 (Tabela comparativa · 1,5 ponto): Dentro do relatório, insira uma tabela (Inserir → Tabela) com as colunas Rede social, Ano de criação, Quem criou e Ainda existe?. Preencha pelo menos 5 redes: 2 que já acabaram e 3 das mais usadas hoje.",
    "Passo 5 (Imagens · 1,0 ponto): Insira 2 imagens que ilustrem o assunto (pesquise no Google Imagens ou crie uma). Coloque uma legenda embaixo de cada uma, com a fonte. Ajuste o tamanho para que não passem das margens.",
    "Passo 6 (Formatação profissional · 1,5 ponto): Título em destaque, centralizado e em negrito. Texto em Arial ou Calibri 12, alinhamento justificado e espaçamento entre linhas 1,5. Subtítulos em negrito para cada parte. Numere as páginas (Inserir → Número de Página). No final, crie o título \"Fontes\" e liste as 3 URLs do Passo 2. Salve como Redes_SeuNome.docx na pasta Avaliacao_Redes.",
    "Passo 7 (Enviar por e-mail · 1,0 ponto): Seu educador vai informar um e-mail. Escreva uma mensagem com saudação, uma frase dizendo o que está anexado e despedida. No campo Assunto escreva exatamente: AVALIAÇÃO REDES SOCIAIS - SEU NOME (com o seu nome). Anexe o Redes_SeuNome.docx e envie. Depois, envie o mesmo arquivo no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Roteiro do relatório — o que escrever em cada parte",
    colunas: ["Parte", "O que escrever", "Tamanho mínimo"],
    linhas: [
      ["1. Introdução", "O que são redes sociais e por que elas importam hoje", "4 linhas"],
      ["2. Como surgiram", "Como começaram as primeiras redes e o que as tornou populares", "1 parágrafo"],
      ["3. Quem criou", "Nomes das redes, anos e pessoas envolvidas", "1 parágrafo"],
      ["4. Redes que acabaram", "2 redes que não existem mais e o que aconteceu com elas", "4 linhas"],
      ["5. Mais usadas hoje", "3 redes atuais e para que cada uma é usada", "4 linhas"],
      ["6. Conclusão e fontes", "O que mudou na vida das pessoas e as 3 URLs pesquisadas", "3 linhas"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc"],
    rotulo: "Envie o relatório do Word (Redes_SeuNome.docx)",
  },
};

export default prova;
