import imagemTag from "@/assets/atividades/html/anatomia-tag.svg";
import imagemNavegador from "@/assets/atividades/html/codigo-e-navegador.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal, a partir da parte de HTML de
// Portal-Atividades/atividades/paginas/html-css-usando-css.html (o que é HTML,
// estrutura básica, h1, p e img).
const atividade: AtividadeAutocorrigida = {
  titulo: "Meu Primeiro HTML",
  introducao:
    "HTML é a linguagem que dá estrutura às páginas da internet. Nesta atividade você vai entender como uma página é montada, escrever o seu primeiro arquivo .html e abri-lo no navegador.",
  itens: [
    {
      id: "o-que-e-html",
      titulo: "O que é HTML?",
      blocos: [
        {
          tipo: "texto",
          texto:
            "HTML (HyperText Markup Language) é a estrutura da página: ele diz o que é cada pedaço do conteúdo (um título, um parágrafo, uma imagem, um link). Pense numa casa: o HTML é o esqueleto, as paredes e as portas; depois, o CSS é a pintura e a decoração.",
        },
        {
          tipo: "texto",
          texto: "O HTML é escrito com tags, que ficam entre os sinais < e >. A maioria delas abre e fecha, e o conteúdo fica no meio.",
        },
        {
          tipo: "tabela",
          colunas: ["Tag", "O que cria"],
          linhas: [
            ["<h1>…</h1>", "Título principal (o maior)"],
            ["<p>…</p>", "Parágrafo de texto"],
            ["<img>", "Imagem (tag vazia: não fecha)"],
            ["<a href=\"…\">…</a>", "Link para outra página"],
          ],
        },
      ],
      imagem: {
        url: imagemTag,
        alt: "Elemento HTML p com atributo class e conteúdo, com legendas para a tag de abertura, o atributo, o valor do atributo, o conteúdo e a tag de fechamento.",
        legenda: "As partes de um elemento HTML.",
      },
    },
    {
      id: "estrutura-basica",
      titulo: "A estrutura básica de uma página",
      blocos: [
        { tipo: "texto", texto: "Toda página HTML começa com o mesmo esqueleto. Decore a ordem:" },
        {
          tipo: "codigo",
          rotulo: "index.html",
          conteudo:
            '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Minha Página</title>\n</head>\n<body>\n    <h1>Minha Página</h1>\n    <p>Estou aprendendo programação!</p>\n</body>\n</html>',
        },
        {
          tipo: "tabela",
          colunas: ["Parte", "Função"],
          linhas: [
            ["<!DOCTYPE html>", "Avisa ao navegador que o arquivo é uma página HTML moderna."],
            ["<html lang=\"pt-BR\">", "Abre a página e informa o idioma (português do Brasil)."],
            ["<head>", "Informações da página que não aparecem nela."],
            ["<meta charset=\"UTF-8\">", "Faz os acentos e o ç aparecerem certinhos."],
            ["<title>", "O nome que aparece na aba do navegador."],
            ["<body>", "Tudo o que aparece na tela: textos, títulos, imagens."],
          ],
        },
      ],
    },
    {
      id: "exercicio-primeira-pagina",
      titulo: "Exercício: crie e abra a sua primeira página",
      passos: [
        "No computador, crie uma pasta chamada Meu Primeiro HTML (na Área de Trabalho ou em Documentos).",
        "Abra o Bloco de Notas ou, de preferência, o editor indicado pelo professor (por exemplo, o Visual Studio Code).",
        "Digite (sem copiar e colar, para treinar) a estrutura básica da página: DOCTYPE, html, head com meta charset e title, e body.",
        "Dentro do <body>, escreva um título com <h1> com o seu nome e dois parágrafos <p>: um sobre quem você é e outro sobre o que você está aprendendo.",
        "Salve o arquivo na pasta como index.html (em Tipo, escolha Todos os arquivos, para não ficar index.html.txt).",
        "Dê dois cliques no arquivo para abrir no navegador. Confira o título na aba e os textos na página.",
        "Altere um texto no editor, salve e aperte F5 no navegador para ver a mudança.",
      ],
      aviso: "O nome do arquivo precisa terminar em .html. Se o navegador mostrar o código em vez da página, o arquivo foi salvo como .txt.",
      objetivo: "Escrever a estrutura básica de uma página, salvá-la como .html e vê-la no navegador.",
      desafio: "Acrescente uma segunda página (sobre.html) e volte aqui quando aprender a criar links na próxima atividade.",
    },
    {
      id: "como-o-navegador-le",
      titulo: "O que o navegador faz com o seu código",
      blocos: [
        {
          tipo: "texto",
          texto:
            "Você escreve o código; o navegador lê o arquivo de cima para baixo e mostra cada elemento do jeito padrão dele. Repare, na imagem, que cada tag virou uma parte da página.",
        },
      ],
      imagem: {
        url: imagemNavegador,
        alt: "Código HTML com título, parágrafo, imagem, subtítulo, lista e link à esquerda e, à direita, a página como o navegador mostra.",
        legenda: "O código à esquerda e o que o navegador mostra à direita.",
      },
    },
    {
      id: "pergunta-tags",
      titulo: "Para que serve cada tag?",
      instrucao: "Escolha a função de cada tag:",
      campos: [
        {
          id: "tag-h1",
          rotulo: "<h1>Meu Time</h1>",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "titulo", texto: "Título principal da página" },
              { valor: "paragrafo", texto: "Parágrafo de texto" },
              { valor: "imagem", texto: "Imagem" },
              { valor: "link", texto: "Link" },
            ],
            esperado: "titulo",
          },
          mensagemCerta: "h1 é o título maior, de nível 1.",
          mensagemErrada: "h vem de heading (título); o 1 indica o maior nível.",
        },
        {
          id: "tag-p",
          rotulo: "<p>Estou aprendendo HTML.</p>",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "titulo", texto: "Título principal da página" },
              { valor: "paragrafo", texto: "Parágrafo de texto" },
              { valor: "imagem", texto: "Imagem" },
              { valor: "link", texto: "Link" },
            ],
            esperado: "paragrafo",
          },
          mensagemCerta: "p vem de paragraph, parágrafo.",
          mensagemErrada: "A letra p lembra a palavra paragraph.",
        },
        {
          id: "tag-img",
          rotulo: "<img src=\"foto.jpg\" alt=\"Minha foto\">",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "titulo", texto: "Título principal da página" },
              { valor: "paragrafo", texto: "Parágrafo de texto" },
              { valor: "imagem", texto: "Imagem" },
              { valor: "link", texto: "Link" },
            ],
            esperado: "imagem",
          },
          mensagemCerta: "img vem de image, imagem; src diz onde está o arquivo.",
          mensagemErrada: "img é a abreviação de image.",
        },
      ],
    },
    {
      id: "onde-aparece",
      titulo: "O que aparece onde?",
      instrucao: "O texto da tag <title> aparece:",
      campos: [
        {
          id: "title-onde",
          regra: {
            tipo: "multipla_escolha",
            opcoes: ["No meio da página, em letras grandes.", "Na aba do navegador.", "No rodapé da página.", "Em lugar nenhum."],
            correta: 1,
          },
          mensagemCerta: "O title fica no head e aparece na aba (e nos favoritos e resultados de busca).",
          mensagemErrada: "O title fica dentro do head, que não aparece na página; ele aparece na aba.",
        },
      ],
    },
    {
      id: "escreva-codigo",
      titulo: "Escreva a sua própria tag",
      instrucao: "Escreva um parágrafo (com a tag certa) que diga: Eu estou aprendendo HTML!",
      campos: [
        {
          id: "meu-paragrafo",
          placeholder: "<p>…</p>",
          regra: {
            tipo: "padrao",
            padrao: /^\s*<p>\s*Eu estou aprendendo HTML!?\s*<\/p>\s*$/i,
          },
          mensagemCerta: "Isso mesmo: abriu, escreveu e fechou a tag.",
          mensagemErrada: "Use <p> para abrir, escreva o texto e feche com </p>.",
        },
      ],
    },
  ],
};

export default atividade;
