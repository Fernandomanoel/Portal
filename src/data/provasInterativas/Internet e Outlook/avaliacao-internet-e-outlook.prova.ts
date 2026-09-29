import type { ProvaInterativa } from "@/types/quiz";

/**
 * Junta e reforça as duas versões do PDF do portal antigo (pesquisa sobre a
 * internet no Brasil + envio do arquivo de uma conta para outra; e a imagem
 * tecnologia.jpg enviada pelo Outlook). Mais difícil que os originais:
 * pesquisa com fontes, Favoritos, assinatura automática, cópia, resposta,
 * pasta e print de conferência.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Internet e Outlook — Avaliação Prática",
  instrucoes: [
    "Nesta avaliação você vai pesquisar, montar um documento profissional e enviá-lo por e-mail entre duas contas, como numa situação de trabalho. Leia tudo antes de começar. Use as contas de e-mail fornecidas pelo seu educador (a conta Hotmail/Outlook envia e a conta Gmail recebe). Vale 10 pontos.",
    "Passo 1 (Pesquisa e Favoritos · 1,0 ponto): Abra o navegador e deixe abertas três abas: o Google (google.com), o Google Imagens (google.com/imghp) e o Outlook Web (outlook.live.com).",
    "Pesquise \"história da internet no Brasil\": use aspas em pelo menos uma busca e o filtro Ferramentas para deixar só resultados em Português. Escolha 3 fontes confiáveis diferentes (universidade, órgão do governo, jornal ou revista) e anote o endereço (URL) de cada uma.",
    "Salve a página mais útil nos Favoritos (Ctrl + D), numa pasta chamada Avaliação.",
    "Passo 2 (Word — documento com a pesquisa · 2,0 pontos): No Word, escreva um texto de pelo menos uma página explicando como começou a internet no Brasil, quais os principais colaboradores e instituições e como ela foi estruturada.",
    "Formate o documento: título centralizado e em negrito, fonte Arial 12, texto justificado. No final, crie o título \"Fontes\" e liste as 3 URLs que você anotou. Salve com o nome Internet_SeuNome.docx (ex.: Internet_MariaSilva.docx).",
    "Passo 3 (Imagem · 0,5 ponto): Na aba do Google Imagens, pesquise o tema \"Tecnologia\", escolha uma imagem simples, clique com o botão direito, \"Salvar imagem como...\" e salve na Área de Trabalho com o nome tecnologia.jpg.",
    "Passo 4 (Outlook — assinatura · 1,5 ponto): No Outlook Web, entre com a conta Hotmail/Outlook. Clique na engrenagem (Configurações) → Email → Redigir e responder → Assinatura de email.",
    "Crie uma assinatura com o seu nome completo (em negrito), \"Aluno(a) do curso de Informática\", o seu telefone e o seu e-mail. Marque as opções para incluir a assinatura automaticamente em novas mensagens e em respostas/encaminhamentos, e clique em Salvar. O exemplo abaixo mostra como ela deve ficar.",
    "Passo 5 (Outlook — mensagem profissional · 2,0 pontos): Clique em Novo e-mail. No campo Para, digite o e-mail da conta Gmail fornecida pelo educador. No campo Cc, coloque o seu próprio e-mail. No campo Assunto, escreva: Avaliação Internet e Outlook – Seu Nome.",
    "No corpo, escreva uma saudação (\"Olá,\" ou \"Prezado(a),\"), uma frase dizendo o que está anexado (por exemplo: \"Segue a pesquisa e a imagem conforme solicitado na prova prática.\") e a despedida \"Atenciosamente,\". Não digite o seu nome: a assinatura do Passo 4 deve aparecer sozinha.",
    "Anexe os dois arquivos (ícone de clipe de papel): Internet_SeuNome.docx e tecnologia.jpg. Confira se os dois aparecem como anexo, marque a mensagem como Importante e clique em Enviar.",
    "Passo 6 (Gmail — receber e responder · 1,0 ponto): Abra a conta Gmail em outra aba e confira se a mensagem chegou com os dois anexos e com a assinatura. Clique em Responder e escreva uma resposta curta confirmando o recebimento, mantendo o assunto (Re: ...). Envie a resposta.",
    "Passo 7 (Organização da caixa · 1,0 ponto): Volte ao Outlook. Quando a resposta chegar, crie na Caixa de Entrada uma pasta chamada Avaliação (botão direito em Caixa de Entrada → Criar nova subpasta) e mova a resposta para ela.",
    "Tire dois prints: um da mensagem enviada aberta em Itens Enviados, mostrando os dois anexos (salve como Print1_Enviado.png), e outro da pasta Avaliação com a resposta dentro (salve como Print2_Resposta.png).",
    "Passo 8 (Entrega · 1,0 ponto): Coloque numa mesma pasta os quatro arquivos: Internet_SeuNome.docx, tecnologia.jpg, Print1_Enviado.png e Print2_Resposta.png. Compacte a pasta (botão direito → Compactar para arquivo ZIP) e envie o arquivo .zip no campo abaixo. Ao terminar, mostre o resultado ao seu educador.",
  ],
  exemploImagem: {
    url: "/provas/internet-e-outlook/exemplo-mensagem-assinatura.svg",
    alt: "Janela de nova mensagem do Outlook com Para, Cc e Assunto preenchidos, corpo em três partes (saudação, o que está anexado e despedida), assinatura com nome, curso e contato, e dois anexos: um documento do Word e uma imagem.",
    legenda: "Assunto claro, corpo formal, assinatura automática (área tracejada) e os dois arquivos anexados.",
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip"],
    rotulo: "Envie o .zip com o documento do Word, a imagem e os dois prints",
  },
};

export default prova;
