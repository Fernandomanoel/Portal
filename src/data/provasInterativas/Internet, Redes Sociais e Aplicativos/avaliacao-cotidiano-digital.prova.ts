import type { ProvaInterativa } from "@/types/quiz";

/**
 * Reorganizada a partir de "Avaliação Prática – Internet, Redes Sociais e
 * Aplicativos" (PDF do portal antigo, versão 2). Mantém os 5 passos e os 2,0
 * pontos de cada um (pesquisa, YouTube, Canva, aplicativos, segurança), mas
 * agora ligados por uma única situação: montar o guia de uso consciente.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Internet, Redes Sociais e Aplicativos — Avaliação Prática: Guia de Uso Consciente",
  instrucoes: [
    "Situação: você é o(a) monitor(a) digital da escola e vai montar o \"Guia de Uso Consciente da Internet\" para novos alunos. Cada passo vira uma página do guia, no mesmo documento do Word, chamado Guia_SeuNome.docx. Cada passo vale 2,0 pontos. A prova pode ser feita em outras abas e programas.",
    "Passo 1 (Página 1 — Por que a internet importa · 2,0 pontos): Pesquise no Google \"Benefícios da Internet no cotidiano\", leia pelo menos 2 resultados e escreva um parágrafo de 4 a 5 linhas com suas palavras. Termine citando o endereço (URL) da página que mais ajudou.",
    "Passo 2 (Página 2 — Aprendendo com vídeo · 2,0 pontos): No YouTube, pesquise \"Dicas para usar o WhatsApp com segurança\" e assista a um vídeo. Na página 2, escreva o título do vídeo, o nome do canal e o link. Depois escreva 2 dicas que você aprendeu com ele, cada uma com uma frase explicando por que ela funciona.",
    "Passo 3 (Página 3 — Cartaz · 2,0 pontos): No Canva, crie um cartaz motivacional que passe a mensagem de uma das dicas do Passo 2, com frase curta, cores combinando e uma imagem. Baixe como PNG e insira o cartaz na página 3 do guia.",
    "Passo 4 (Página 4 — Meus aplicativos · 2,0 pontos): Liste 3 aplicativos do seu celular numa tabela com as colunas Aplicativo, Para que serve e Cuidado ao usar. Escreva uma frase em cada célula, seguindo o exemplo da tabela abaixo.",
    "Passo 5 (Página 5 — Segurança digital · 2,0 pontos): Escreva um texto curto respondendo às duas perguntas: por que usar senhas seguras? Quais cuidados ter com links recebidos no WhatsApp? Termine com uma lista de 3 regras que você seguiria a partir de hoje. Salve o documento como Guia_SeuNome.docx e envie no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Exemplo do Passo 4 — os aplicativos e as frases são livres, a estrutura é esta",
    colunas: ["Aplicativo", "Para que serve", "Cuidado ao usar"],
    linhas: [
      ["Aplicativo de mensagens", "Conversar com família e amigos por texto, áudio e vídeo", "Desconfiar de links e pedidos de dinheiro de números desconhecidos"],
      ["Aplicativo de banco", "Consultar saldo e pagar contas sem ir à agência", "Usar senha forte e nunca emprestar o celular desbloqueado"],
      ["Aplicativo de mapas", "Descobrir o caminho e o horário do transporte", "Não deixar a localização compartilhada com desconhecidos"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc"],
    rotulo: "Envie o guia do Word (Guia_SeuNome.docx)",
  },
};

export default prova;
