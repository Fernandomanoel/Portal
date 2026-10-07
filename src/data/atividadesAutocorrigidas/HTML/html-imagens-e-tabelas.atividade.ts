import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
const atividade: AtividadeAutocorrigida = {
  titulo: "Imagens e Tabelas em HTML",
  introducao:
    "Páginas sem imagens são monótonas, e dados soltos no texto são difíceis de ler. Aprenda a colocar imagens com o cuidado certo e a organizar informações em tabelas.",
  itens: [
    {
      id: "imagens",
      titulo: "Imagens",
      blocos: [
        {
          tipo: "codigo",
          rotulo: "A tag <img>",
          conteudo: '<img src="imagens/escudo.png" alt="Escudo do Fluminense" width="200">',
        },
        {
          tipo: "tabela",
          colunas: ["Atributo", "O que faz"],
          linhas: [
            ["src", "Caminho ou endereço do arquivo da imagem (obrigatório)."],
            ["alt", "Descrição em texto. Aparece se a imagem não carregar e é lida por leitores de tela. Obrigatório."],
            ["width / height", "Largura e altura em pixels. Informe só uma para manter a proporção."],
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Guarde as imagens numa pasta do projeto (por exemplo, imagens/) e use o caminho relativo: src=\"imagens/foto.jpg\". Se o caminho estiver errado, a imagem não aparece e você só vê o texto do alt.",
        },
      ],
    },
    {
      id: "tabelas",
      titulo: "Tabelas",
      blocos: [
        {
          tipo: "texto",
          texto: "A tabela é montada por linhas (tr). Dentro de cada linha ficam células: th para cabeçalho (negrito e centralizado) e td para dado comum.",
        },
        {
          tipo: "codigo",
          rotulo: "Tabela de preços",
          conteudo:
            "<table border=\"1\">\n    <caption>Preços da cantina</caption>\n    <tr>\n        <th>Produto</th>\n        <th>Preço</th>\n    </tr>\n    <tr>\n        <td>Suco</td>\n        <td>R$ 5,00</td>\n    </tr>\n    <tr>\n        <td>Salgado</td>\n        <td>R$ 7,00</td>\n    </tr>\n</table>",
        },
        {
          tipo: "tabela",
          colunas: ["Tag", "Significado"],
          linhas: [
            ["<table>", "A tabela inteira."],
            ["<caption>", "Título da tabela."],
            ["<tr>", "Table row: uma linha."],
            ["<th>", "Table header: célula de cabeçalho."],
            ["<td>", "Table data: célula de dado."],
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Use tabela só para dados organizados em linhas e colunas, nunca para montar o visual da página. Para o visual, use CSS.",
        },
      ],
    },
    {
      id: "exercicio-tabela",
      titulo: "Exercício: ficha do meu time com imagem e tabela",
      passos: [
        "Crie a pasta Imagens e Tabelas com uma subpasta imagens. Baixe uma imagem (um escudo, uma foto) e salve na subpasta.",
        "Crie o arquivo time.html com a estrutura básica e um <h1> com o nome do seu time ou da sua banda favorita.",
        "Insira a imagem com <img>, informando src (com o caminho imagens/…), alt com uma descrição e width de 200.",
        "Crie uma tabela com <caption> Títulos conquistados, com cabeçalho (th) Competição, Ano e Local.",
        "Preencha pelo menos 4 linhas de dados (td), com datas e locais reais.",
        "Abra no navegador. Se a imagem não aparecer, confira o caminho e o nome do arquivo (inclusive maiúsculas e a extensão).",
        "Coloque border=\"1\" na tag <table> para ver as linhas da tabela.",
      ],
      aviso: "Cada <tr> deve ter o mesmo número de células das outras linhas. Se alguma linha tiver a mais ou a menos, a tabela fica torta.",
      objetivo: "Inserir imagens com src e alt e organizar dados em uma tabela com cabeçalho.",
      desafio: "Faça a primeira coluna ocupar duas linhas com rowspan=\"2\" e veja o que acontece.",
    },
    {
      id: "pergunta-th-td",
      titulo: "th ou td?",
      instrucao: "Escolha a tag certa para cada célula:",
      campos: [
        {
          id: "celula-produto",
          rotulo: "A palavra \"Produto\", que é o nome da coluna.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "th", texto: "<th>" },
              { valor: "td", texto: "<td>" },
              { valor: "tr", texto: "<tr>" },
            ],
            esperado: "th",
          },
          mensagemCerta: "th é a célula de cabeçalho.",
          mensagemErrada: "Nome de coluna é cabeçalho: th (table header).",
        },
        {
          id: "celula-suco",
          rotulo: "A palavra \"Suco\", que é um dado da tabela.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "th", texto: "<th>" },
              { valor: "td", texto: "<td>" },
              { valor: "tr", texto: "<tr>" },
            ],
            esperado: "td",
          },
          mensagemCerta: "td é a célula de dado comum.",
          mensagemErrada: "Dado comum fica em td (table data).",
        },
        {
          id: "linha",
          rotulo: "Cada linha inteira da tabela.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "th", texto: "<th>" },
              { valor: "td", texto: "<td>" },
              { valor: "tr", texto: "<tr>" },
            ],
            esperado: "tr",
          },
          mensagemCerta: "tr é a linha (table row).",
          mensagemErrada: "A linha é a tag tr, e as células ficam dentro dela.",
        },
      ],
    },
    {
      id: "pergunta-alt",
      titulo: "Para que serve o alt?",
      instrucao: "Qual é a função do atributo alt na tag <img>?",
      campos: [
        {
          id: "alt",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Aumentar a imagem na tela.",
              "Descrever a imagem em texto, para quando ela não carregar e para leitores de tela.",
              "Dizer onde o arquivo da imagem está salvo.",
              "Mudar a cor da imagem.",
            ],
            correta: 1,
          },
          mensagemCerta: "O alt dá acessibilidade e ajuda quando a imagem não carrega.",
          mensagemErrada: "Quem diz onde está o arquivo é o src; o alt descreve a imagem.",
        },
      ],
    },
    {
      id: "escreva-img",
      titulo: "Escreva uma imagem",
      instrucao: "Escreva a tag de uma imagem que está em imagens/gato.jpg, com a descrição \"Gato dormindo\" e largura de 300 pixels.",
      campos: [
        {
          id: "minha-img",
          placeholder: "<img …>",
          regra: {
            tipo: "padrao",
            padrao: /^(?=.*<img\s)(?=.*src\s*=\s*["']imagens\/gato\.jpg["'])(?=.*alt\s*=\s*["']Gato dormindo["'])(?=.*width\s*=\s*["']?300(px)?["']?).*$/is,
          },
          mensagemCerta: "Imagem completa: src, alt e width.",
          mensagemErrada: "Faltou algo: <img src=\"imagens/gato.jpg\" alt=\"Gato dormindo\" width=\"300\">.",
        },
      ],
    },
  ],
};

export default atividade;
