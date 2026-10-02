import type { ProvaInterativa, VerificacaoCodigo } from "@/types/quiz";

/**
 * Baseada em "Avaliação Prática - Desenvolvimento Web HTML" (PDF do portal
 * antigo, atividade complementar de HTML): os 7 passos do PDF (estrutura
 * básica, cabeçalho, duas seções, lista, imagem, rodapé e o link do desafio
 * extra) viram as questões 1 a 7, e as questões 8 a 10 (tabela, formulário e
 * tags) completam a prova. Cada questão se testa até 3 vezes e o servidor
 * confere o que o código tem — ele não executa nada.
 */
const v = (descricao: string, padrao: string): VerificacaoCodigo => ({ descricao, padrao, flags: "i" });
const TEXTO = String.raw`[^<]*\S[^<]*`;

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Avaliação Prática: Desenvolvimento Web — HTML",
  introducao:
    "Objetivo: criar uma página web simples sobre um tema de interesse seu, uma parte por questão. Escreva só o trecho pedido em cada campo e use “Testar resposta” para ver o que ainda falta.",
  itens: [
    {
      titulo: "Questão 1: Estrutura básica",
      enunciado: "Escreva a estrutura básica de um documento HTML: tipo do documento, idioma, cabeçalho técnico com codificação e título, e o corpo da página (vazio).",
      campos: [
        {
          id: "estrutura",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("<!DOCTYPE html> na primeira linha", String.raw`<!DOCTYPE\s+html\s*>`),
              v("<html> com o atributo lang (ex.: lang=\"pt-BR\")", String.raw`<html\b[^>]*\blang\s*=\s*["']?[\w-]+`),
              v("<head> com <meta charset>", String.raw`<head\b[^>]*>[\s\S]*<meta\b[^>]*\bcharset\s*=[\s\S]*</head>`),
              v("<title> com um texto", String.raw`<title>${TEXTO}</title>`),
              v("<body> aberto e fechado", String.raw`<body\b[^>]*>[\s\S]*</body>`),
              v("</html> fechando o documento", String.raw`</html\s*>`),
            ],
          },
        },
      ],
      mensagemCerta: "Estrutura completa! É o esqueleto de toda página HTML.",
      mensagemErrada: "Revise: DOCTYPE, html com lang, head (meta charset e title) e body.",
    },
    {
      titulo: "Questão 2: Cabeçalho",
      enunciado: "Dentro do <body>, crie um cabeçalho (<header>) com um título principal (<h1>) que descreva o tema da página.",
      exemplo: { rotulo: "Exemplo", conteudo: "<header>\n    <h1>Meu Tema Favorito</h1>\n</header>" },
      campos: [
        {
          id: "cabecalho",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Tag <header> aberta e fechada", String.raw`<header\b[^>]*>[\s\S]*</header>`),
              v("<h1> com texto dentro do <header>", String.raw`<header\b[^>]*>[\s\S]*<h1\b[^>]*>${TEXTO}</h1>[\s\S]*</header>`),
            ],
          },
        },
      ],
      mensagemCerta: "Cabeçalho criado com o título principal.",
      mensagemErrada: "Use <header> e coloque um <h1> com texto dentro dele.",
    },
    {
      titulo: "Questão 3: Seções de conteúdo",
      enunciado: "Crie duas seções (<section>), cada uma com um subtítulo (<h2>) e um parágrafo (<p>) com informações sobre o tema.",
      exemplo: { rotulo: "Exemplo (uma seção)", conteudo: "<section>\n    <h2>Introdução</h2>\n    <p>Escreva um parágrafo introdutório sobre o tema.</p>\n</section>" },
      campos: [
        {
          id: "secoes",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v(
                "Duas seções <section> fechadas",
                String.raw`<section\b[^>]*>[\s\S]*?</section>[\s\S]*<section\b[^>]*>[\s\S]*?</section>`,
              ),
              v(
                "Cada seção com <h2> e <p> com texto",
                String.raw`(?:<section\b[^>]*>(?:(?!</section>)[\s\S])*?<h2\b[^>]*>${TEXTO}</h2>(?:(?!</section>)[\s\S])*?<p\b[^>]*>${TEXTO}</p>(?:(?!</section>)[\s\S])*?</section>[\s\S]*?){2}`,
              ),
            ],
          },
        },
      ],
      mensagemCerta: "Duas seções com subtítulo e parágrafo.",
      mensagemErrada: "Cada <section> precisa de um <h2> e de um <p> com texto.",
    },
    {
      titulo: "Questão 4: Lista",
      enunciado: "Adicione uma lista não ordenada (<ul>) com pelo menos três itens (<li>) relacionados ao tema.",
      exemplo: { rotulo: "Exemplo", conteudo: "<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n</ul>" },
      campos: [
        {
          id: "lista",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Lista <ul> aberta e fechada", String.raw`<ul\b[^>]*>[\s\S]*</ul>`),
              v("Pelo menos 3 itens <li> com texto dentro da lista", String.raw`<ul\b[^>]*>(?:\s*<li\b[^>]*>${TEXTO}</li>\s*){3,}</ul>`),
            ],
          },
        },
      ],
      mensagemCerta: "Lista com três itens ou mais.",
      mensagemErrada: "Use <ul> com pelo menos três <li>, cada um com texto.",
    },
    {
      titulo: "Questão 5: Imagem",
      enunciado: "Insira uma imagem (<img>) relevante ao tema. Você pode usar a URL de uma imagem online. Lembre da descrição da imagem (alt).",
      exemplo: { rotulo: "Exemplo", conteudo: '<img src="URL_DA_IMAGEM" alt="Descrição da imagem">' },
      campos: [
        {
          id: "imagem",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Tag <img> com o endereço da imagem em src", String.raw`<img\b[^>]*\bsrc\s*=\s*["'][^"']+["']`),
              v("Atributo alt com a descrição da imagem", String.raw`<img\b[^>]*\balt\s*=\s*["'][^"']+["']`),
            ],
          },
        },
      ],
      mensagemCerta: "Imagem inserida com src e alt.",
      mensagemErrada: "A <img> precisa de src (endereço) e alt (descrição), os dois com texto.",
    },
    {
      titulo: "Questão 6: Rodapé",
      enunciado: "Adicione um rodapé (<footer>) com informações de contato ou uma mensagem de encerramento.",
      exemplo: { rotulo: "Exemplo", conteudo: "<footer>\n    <p>Obrigado por visitar minha página!</p>\n</footer>" },
      campos: [
        {
          id: "rodape",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Tag <footer> aberta e fechada", String.raw`<footer\b[^>]*>[\s\S]*</footer>`),
              v("Texto dentro do rodapé", String.raw`<footer\b[^>]*>(?:\s*<[^>]+>)*\s*[^<\s][\s\S]*</footer>`),
            ],
          },
        },
      ],
      mensagemCerta: "Rodapé criado.",
      mensagemErrada: "Use <footer> com um texto dentro (um <p> com a mensagem).",
    },
    {
      titulo: "Questão 7: Desafio extra — link",
      enunciado: "Adicione um link (<a>) para uma página externa que forneça mais informações sobre o tema, dentro de um parágrafo.",
      exemplo: { rotulo: "Exemplo", conteudo: '<p>Para mais informações, visite <a href="URL_DA_PAGINA">este link</a>.</p>' },
      campos: [
        {
          id: "link",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Link <a> com endereço em href", String.raw`<a\b[^>]*\bhref\s*=\s*["'][^"']+["']`),
              v("Texto clicável dentro do link", String.raw`<a\b[^>]*>${TEXTO}</a>`),
              v("Link dentro de um parágrafo <p>", String.raw`<p\b[^>]*>[\s\S]*<a\b[\s\S]*</a>[\s\S]*</p>`),
            ],
          },
        },
      ],
      mensagemCerta: "Link criado.",
      mensagemErrada: "Use <a href=\"endereço\">texto</a> dentro de um <p>.",
    },
    {
      titulo: "Questão 8: Tabela",
      enunciado: "Crie uma tabela de preços com duas colunas (Produto e Preço): uma linha de cabeçalho com <th> e pelo menos duas linhas de dados com <td>.",
      campos: [
        {
          id: "tabela",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Tag <table> aberta e fechada", String.raw`<table\b[^>]*>[\s\S]*</table>`),
              v("Cabeçalho com <th> (Produto e Preço)", String.raw`<th\b[^>]*>${TEXTO}</th>[\s\S]*<th\b[^>]*>${TEXTO}</th>`),
              v("Pelo menos 3 linhas <tr> (cabeçalho + 2 de dados)", String.raw`(?:<tr\b[^>]*>[\s\S]*?</tr>[\s\S]*?){3}`),
              v("Células de dados <td> com texto", String.raw`<td\b[^>]*>${TEXTO}</td>[\s\S]*<td\b[^>]*>${TEXTO}</td>`),
            ],
          },
        },
      ],
      mensagemCerta: "Tabela montada com cabeçalho e dados.",
      mensagemErrada: "Use <table>, <tr> para cada linha, <th> no cabeçalho e <td> nos dados.",
    },
    {
      titulo: "Questão 9: Formulário",
      enunciado:
        "Crie um formulário (<form>) de contato com um campo de texto para o nome, um campo de e-mail, cada um com seu <label> ligado ao campo (for = id), e um botão de envio.",
      exemplo: { rotulo: "Dica de ligação label/campo", conteudo: '<label for="nome">Nome</label>\n<input type="text" id="nome" name="nome">' },
      campos: [
        {
          id: "formulario",
          rotulo: "Escreva seu código:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Tag <form> aberta e fechada", String.raw`<form\b[^>]*>[\s\S]*</form>`),
              v("Campo de texto (type=\"text\")", String.raw`<input\b[^>]*\btype\s*=\s*["']text["']`),
              v("Campo de e-mail (type=\"email\")", String.raw`<input\b[^>]*\btype\s*=\s*["']email["']`),
              v("Pelo menos 2 <label> com texto", String.raw`<label\b[^>]*>${TEXTO}</label>[\s\S]*<label\b[^>]*>${TEXTO}</label>`),
              v("<label> ligado ao campo (for e id)", String.raw`<label\b[^>]*\bfor\s*=\s*["'][\w-]+["'][\s\S]*<input\b[^>]*\bid\s*=\s*["'][\w-]+["']`),
              v("Botão de envio (<button> ou input submit)", String.raw`<button\b[^>]*>${TEXTO}</button>|<input\b[^>]*\btype\s*=\s*["']submit["']`),
            ],
          },
        },
      ],
      mensagemCerta: "Formulário completo e acessível.",
      mensagemErrada: "Faltou algum campo, label ligado por for/id ou o botão de envio.",
    },
    {
      titulo: "Questão 10: Para que serve cada tag",
      enunciado: "Associe cada tag à sua função na página:",
      campos: [
        {
          id: "tag-a",
          rotulo: "<a href=\"...\">",
          regra: { tipo: "selecao", opcoes: FUNCOES(), esperado: "link" },
        },
        {
          id: "tag-ul",
          rotulo: "<ul>",
          regra: { tipo: "selecao", opcoes: FUNCOES(), esperado: "lista" },
        },
        {
          id: "tag-footer",
          rotulo: "<footer>",
          regra: { tipo: "selecao", opcoes: FUNCOES(), esperado: "rodape" },
        },
        {
          id: "tag-img",
          rotulo: "<img>",
          regra: { tipo: "selecao", opcoes: FUNCOES(), esperado: "imagem" },
        },
      ],
      mensagemCerta: "Isso mesmo! Você sabe o papel de cada tag.",
      mensagemErrada: "Alguma associação está trocada. Releia o que cada tag faz.",
    },
  ],
};

function FUNCOES() {
  return [
    { valor: "link", texto: "Cria um link para outra página" },
    { valor: "lista", texto: "Cria uma lista com marcadores" },
    { valor: "rodape", texto: "Marca o rodapé da página" },
    { valor: "imagem", texto: "Exibe uma imagem" },
  ];
}

export default prova;
