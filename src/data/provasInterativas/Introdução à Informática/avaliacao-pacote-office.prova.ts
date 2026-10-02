import type { ProvaInterativa } from "@/types/quiz";

/**
 * Refeita a partir de "Avaliação Prática - Introdução à Informática" (PDF do
 * portal antigo): mantém os cinco passos originais (pasta, imagem, arquivo
 * compactado, print, Word, OneDrive) e os amarra com Excel e PowerPoint, no
 * mesmo formato de lista de passos das provas de Windows e Word. Cada passo é
 * fácil sozinho; o que o aluno produz em um alimenta o seguinte.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Introdução à Informática — Avaliação Prática: Pacote Office",
  instrucoes: [
    "Nesta avaliação você vai usar o Windows, o navegador, o Word, o Excel, o PowerPoint e o OneDrive juntos. Tudo o que você fizer fica numa única pasta com o seu nome, e o que você produz em um passo é usado no seguinte. Vale 10 pontos.",
    "Passo 1 (Windows — pasta e imagem · 1,0 ponto): Vá até a Área de Trabalho, clique com o botão direito, escolha Novo → Pasta e dê a ela o seu nome completo (ex.: Maria Silva).",
    "Abra o navegador, pesquise no Google por uma imagem sobre tecnologia, clique com o botão direito nela, escolha \"Salvar imagem como...\" e salve na pasta que você criou com o nome imagem-tecnologia.jpg.",
    "Passo 2 (Windows — compactar e extrair · 1,0 ponto): Dentro da sua pasta, clique com o botão direito em imagem-tecnologia.jpg e escolha \"Compactar para arquivo ZIP\".",
    "Depois, clique com o botão direito no arquivo ZIP criado, escolha \"Extrair tudo...\" e extraia para uma subpasta chamada Extraido, dentro da sua pasta. Confira que a imagem aparece dentro de Extraido.",
    "Passo 3 (Word — texto, imagem e print · 2,0 pontos): Abra o Word e crie um documento em branco. Escreva o título \"Minha experiência com a tecnologia até agora\" (centralizado e em negrito) e, abaixo, um texto de pelo menos 4 linhas sobre o tema.",
    "Insira no documento a imagem imagem-tecnologia.jpg (Inserir → Imagens). Tire um print da sua pasta mostrando a imagem, o arquivo ZIP e a subpasta Extraido (Windows + Shift + S) e cole no Word (Ctrl + V), abaixo da imagem.",
    "Salve o documento dentro da sua pasta com o nome Pratica_MariaSilva.docx, trocando pelo seu nome (exemplo: Pratica_JoaoSilva.docx).",
    "Passo 4 (Excel — tabela simples · 2,0 pontos): Abra o Excel e monte a tabela \"Meu material de estudo\" com as colunas Item, Quantidade, Valor unitário e Total, e três itens de sua escolha (veja o exemplo abaixo). Na coluna Total, use a fórmula Quantidade × Valor unitário (=B2*C2) e arraste para as demais linhas.",
    "Ao final da coluna Total, some tudo com AutoSoma (Σ). Salve na sua pasta como Planilha_MariaSilva.xlsx. Depois, copie a tabela pronta (Ctrl + C) e cole no Word (Ctrl + V), no final do documento, e salve o Word de novo.",
    "Passo 5 (PowerPoint — três slides · 2,0 pontos): Abra o PowerPoint e crie uma apresentação com 3 slides. Slide 1: título \"Minha experiência com a tecnologia\" e, no subtítulo, o seu nome. Slide 2: título \"Meu material de estudo\", com a imagem imagem-tecnologia.jpg e os três itens da sua tabela do Excel. Slide 3: título \"Obrigado(a)!\".",
    "Escolha um tema na aba Design para a apresentação. Salve na sua pasta como Apresentacao_MariaSilva.pptx.",
    "Passo 6 (Internet — OneDrive · 1,0 ponto): No navegador, acesse onedrive.com e entre com o seu e-mail de estudante e a sua senha. Quando o OneDrive abrir, tire um print da tela mostrando que você entrou com sucesso.",
    "Cole esse print no final do documento do Word (Passo 3) e salve o Word novamente.",
    "Passo 7 (Entrega · 1,0 ponto): Feche os programas. Na Área de Trabalho, clique com o botão direito na pasta com o seu nome e escolha \"Compactar para arquivo ZIP\". Confira, abrindo o ZIP, que ele contém: a imagem, o Word, o Excel, o PowerPoint e a subpasta Extraido.",
    "Envie o arquivo .zip da sua pasta no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Exemplo do Passo 4 — os itens e valores são livres, a estrutura é esta",
    colunas: ["Item", "Quantidade", "Valor unitário (R$)", "Total (R$)"],
    linhas: [
      ["Caderno", "2", "15,00", "30,00"],
      ["Caneta", "5", "3,00", "15,00"],
      ["Pen drive", "1", "40,00", "40,00"],
      ["Total geral", "", "", "85,00"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip"],
    rotulo: "Envie o .zip da sua pasta (imagem, Word, Excel e PowerPoint)",
  },
};

export default prova;
