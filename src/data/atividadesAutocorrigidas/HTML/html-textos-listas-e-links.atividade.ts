import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
const atividade: AtividadeAutocorrigida = {
  titulo: "Textos, Listas e Links em HTML",
  introducao:
    "Quase toda página é feita de textos organizados, listas e links para outras páginas. Aprenda as tags que dão forma ao texto e crie uma página sobre um assunto de que você gosta.",
  itens: [
    {
      id: "titulos-e-textos",
      titulo: "Títulos e formatação do texto",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Tag", "Para que serve", "Exemplo"],
          linhas: [
            ["<h1> a <h6>", "Títulos, do maior (h1) ao menor (h6). Use um h1 só por página.", "<h2>Meu time</h2>"],
            ["<p>", "Parágrafo.", "<p>Texto aqui.</p>"],
            ["<strong>", "Texto importante (negrito).", "<strong>Atenção</strong>"],
            ["<em>", "Ênfase (itálico).", "<em>muito</em>"],
            ["<br>", "Quebra de linha (tag vazia).", "Rua A<br>Bairro B"],
            ["<hr>", "Linha horizontal para separar partes.", "<hr>"],
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Escolha o título pelo significado, não pelo tamanho: o h1 é o assunto da página; os h2 são as partes principais; os h3 são subpartes. O tamanho se muda depois, com CSS.",
        },
      ],
    },
    {
      id: "listas",
      titulo: "Listas",
      blocos: [
        {
          tipo: "texto",
          texto: "Para listas usamos ul (lista com marcadores) ou ol (lista numerada). Cada item fica dentro de um li.",
        },
        {
          tipo: "codigo",
          rotulo: "Lista com marcadores e lista numerada",
          conteudo:
            "<h3>Ingredientes</h3>\n<ul>\n    <li>2 xícaras de farinha</li>\n    <li>1 xícara de açúcar</li>\n    <li>3 ovos</li>\n</ul>\n\n<h3>Modo de preparo</h3>\n<ol>\n    <li>Misture os ingredientes secos.</li>\n    <li>Acrescente os ovos.</li>\n    <li>Leve ao forno por 40 minutos.</li>\n</ol>",
        },
      ],
    },
    {
      id: "links",
      titulo: "Links",
      blocos: [
        {
          tipo: "texto",
          texto: "O link usa a tag a (de anchor, âncora). O atributo href diz para onde ele leva; o texto entre as tags é o que a pessoa clica.",
        },
        {
          tipo: "codigo",
          rotulo: "Três tipos de link",
          conteudo:
            '<!-- para outro site -->\n<a href="https://www.wikipedia.org" target="_blank">Wikipédia</a>\n\n<!-- para outra página do seu projeto -->\n<a href="sobre.html">Sobre mim</a>\n\n<!-- para um e-mail -->\n<a href="mailto:contato@exemplo.com">Envie um e-mail</a>',
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "target=\"_blank\" abre o link em outra aba, sem fechar a sua página. Use para sites de fora; para páginas do seu projeto, o normal é abrir na mesma aba.",
        },
      ],
    },
    {
      id: "exercicio-receita",
      titulo: "Exercício: página \"Minha receita favorita\" (ou \"Meu time\")",
      passos: [
        "Crie a pasta Textos e Listas e, dentro dela, o arquivo receita.html com a estrutura básica (DOCTYPE, html lang, head com meta charset e title, e body).",
        "No body, coloque um <h1> com o nome da receita (ou do seu time).",
        "Escreva um parágrafo de apresentação e use <strong> em uma palavra importante e <em> em outra.",
        "Crie um <h2> Ingredientes (ou Jogadores) e uma lista com marcadores com pelo menos 4 itens.",
        "Crie um <h2> Modo de preparo (ou Títulos) e uma lista numerada com pelo menos 3 passos.",
        "Acrescente um <hr> e, abaixo, um link para um site de fora, com target=\"_blank\", e um segundo link de e-mail (mailto).",
        "Abra no navegador, teste os dois links e confira se as listas aparecem com marcadores e números.",
      ],
      aviso: "Cada <li> precisa estar dentro de <ul> ou <ol>, nunca solto no body.",
      objetivo: "Praticar títulos, parágrafos, ênfase, listas e links numa página organizada.",
      desafio: "Acrescente um link \"Voltar ao topo\" que leve ao início da página: dê id=\"topo\" ao <h1> e use <a href=\"#topo\">.",
    },
    {
      id: "qual-tag",
      titulo: "Qual tag usar?",
      instrucao: "Escolha a tag correta para cada situação:",
      campos: [
        {
          id: "numerada",
          rotulo: "Mostrar os passos de uma receita, na ordem 1, 2, 3…",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "ul", texto: "<ul>" },
              { valor: "ol", texto: "<ol>" },
              { valor: "p", texto: "<p>" },
              { valor: "br", texto: "<br>" },
            ],
            esperado: "ol",
          },
          mensagemCerta: "ol é lista ordenada (numerada).",
          mensagemErrada: "ol = ordered list; ul = unordered list (com marcadores).",
        },
        {
          id: "link",
          rotulo: "Levar quem clicar para outra página.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "a", texto: "<a href=\"…\">" },
              { valor: "link", texto: "<link>" },
              { valor: "img", texto: "<img>" },
              { valor: "li", texto: "<li>" },
            ],
            esperado: "a",
          },
          mensagemCerta: "a, de anchor, com o atributo href.",
          mensagemErrada: "O link usa a tag a e o atributo href.",
        },
        {
          id: "importante",
          rotulo: "Destacar uma palavra importante, em negrito, com significado.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "strong", texto: "<strong>" },
              { valor: "em", texto: "<em>" },
              { valor: "hr", texto: "<hr>" },
              { valor: "h1", texto: "<h1>" },
            ],
            esperado: "strong",
          },
          mensagemCerta: "strong marca importância e aparece em negrito.",
          mensagemErrada: "Negrito com significado de importância: strong.",
        },
      ],
    },
    {
      id: "escreva-link",
      titulo: "Escreva um link",
      instrucao: "Escreva o código de um link com o texto Wikipédia que leve a https://www.wikipedia.org e abra em outra aba.",
      campos: [
        {
          id: "meu-link",
          placeholder: "<a …>Wikipédia</a>",
          regra: {
            tipo: "padrao",
            padrao: /^(?=.*<a\s)(?=.*href\s*=\s*["']https:\/\/www\.wikipedia\.org\/?["'])(?=.*target\s*=\s*["']_blank["'])(?=.*>\s*Wikip[ée]dia\s*<\/a>).*$/is,
          },
          mensagemCerta: "Link completo: href, target e texto clicável.",
          mensagemErrada: "Faltou algo: <a href=\"https://www.wikipedia.org\" target=\"_blank\">Wikipédia</a>.",
        },
      ],
    },
  ],
};

export default atividade;
