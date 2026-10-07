import imagemEstrutura from "@/assets/atividades/html/estrutura-documento.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
// Projeto final de HTML: junta tudo o que foi visto nas atividades anteriores.
const atividade: AtividadeAutocorrigida = {
  titulo: "Projeto Final: Minha Página Completa em HTML Semântico",
  introducao:
    "HTML semântico usa tags com significado (header, nav, main, section, article, footer) em vez de blocos sem nome. Isso ajuda os leitores de tela, os buscadores e quem for mexer no código depois. Neste projeto você junta tudo em uma página só.",
  itens: [
    {
      id: "tags-semanticas",
      titulo: "Tags semânticas",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Tag", "O que marca"],
          linhas: [
            ["<header>", "Cabeçalho da página (ou de uma seção): título, logo, menu."],
            ["<nav>", "Menu de navegação, com links para as partes ou páginas do site."],
            ["<main>", "O conteúdo principal da página. Só um por página."],
            ["<section>", "Uma parte do conteúdo, com um tema, normalmente com um título (h2)."],
            ["<article>", "Conteúdo que faz sentido sozinho: uma notícia, um post, um cartão."],
            ["<aside>", "Conteúdo lateral ou complementar: dicas, anúncios."],
            ["<footer>", "Rodapé: contato, direitos, links finais."],
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Evite colocar tudo dentro de <div>. Use <div> só quando nenhuma tag semântica servir (por exemplo, para agrupar elementos e estilizar depois com CSS).",
        },
      ],
      imagem: {
        url: imagemEstrutura,
        alt: "Esquema da estrutura de uma página HTML: html com head (meta, title, link) e body (header, main com section e article, footer).",
        legenda: "A estrutura de uma página HTML com tags semânticas.",
      },
    },
    {
      id: "projeto",
      titulo: "Projeto: página de apresentação",
      cenario:
        "Você vai criar uma página de apresentação pessoal ou de um assunto de que goste (um time, uma banda, uma profissão, um país). Pode ser real ou fictícia; o importante é usar cada recurso estudado.",
      passos: [
        "Crie a pasta Projeto Final HTML com a subpasta imagens e o arquivo index.html. Escolha o tema e baixe 2 imagens para a subpasta.",
        "Estrutura: DOCTYPE, html com lang=\"pt-BR\", head (meta charset, meta viewport e title com o nome do tema) e body.",
        "Cabeçalho: <header> com um <h1> e um <nav> com 3 links âncora para as seções da página (#sobre, #detalhes, #contato).",
        "Dentro de <main>, crie uma <section id=\"sobre\"> com <h2>, dois parágrafos (com <strong> e <em>) e uma imagem com alt e width.",
        "Crie uma <section id=\"detalhes\"> com <h2>, uma lista com marcadores de pelo menos 4 itens e uma tabela (cabeçalho com th e pelo menos 3 linhas de dados).",
        "Dentro dessa seção, acrescente dois <article> (cartões independentes), cada um com um <h3> e um parágrafo.",
        "No <footer id=\"contato\">, coloque um formulário de contato com nome, e-mail e mensagem (labels ligados por for/id e botão de envio) e um link externo com target=\"_blank\".",
        "Abra no navegador, clique nos links do menu e confira se levam às seções. Valide as tags sem fechar: toda tag de abertura precisa do seu fechamento.",
      ],
      aviso: "Salve com frequência e atualize o navegador (F5) a cada trecho novo. Se algo sumir, o problema costuma ser uma tag sem fechar.",
      objetivo: "Montar uma página completa e organizada, usando tags semânticas, listas, tabela, imagem, links e formulário.",
      desafio: "Peça para um colega abrir a sua página e dizer, só pelo menu e pelos títulos, sobre o que ela é. Se ele errar, melhore os títulos.",
    },
    {
      id: "checklist",
      titulo: "Checklist antes de entregar",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "☐ Estrutura completa: DOCTYPE, html lang, head (meta charset, title) e body",
            "☐ Um único <h1> e títulos h2/h3 em ordem",
            "☐ header, nav, main, section, article e footer usados no lugar certo",
            "☐ Imagens com src, alt e width",
            "☐ Lista com marcadores e tabela com cabeçalho (th)",
            "☐ Links âncora funcionando e um link externo com target=\"_blank\"",
            "☐ Formulário com labels ligados por for/id e botão de envio",
            "☐ Todas as tags fechadas e o arquivo salvo como index.html",
          ],
        },
      ],
    },
    {
      id: "qual-tag-semantica",
      titulo: "Qual tag semântica?",
      instrucao: "Escolha a tag mais adequada para cada trecho da página:",
      campos: [
        {
          id: "menu",
          rotulo: "O menu com os links para as partes da página.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "nav", texto: "<nav>" },
              { valor: "footer", texto: "<footer>" },
              { valor: "article", texto: "<article>" },
              { valor: "main", texto: "<main>" },
            ],
            esperado: "nav",
          },
          mensagemCerta: "nav é o menu de navegação.",
          mensagemErrada: "Navegação em inglês é navigation.",
        },
        {
          id: "contato",
          rotulo: "O final da página, com e-mail e telefone para contato.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "nav", texto: "<nav>" },
              { valor: "footer", texto: "<footer>" },
              { valor: "article", texto: "<article>" },
              { valor: "main", texto: "<main>" },
            ],
            esperado: "footer",
          },
          mensagemCerta: "footer é o rodapé.",
          mensagemErrada: "Rodapé em inglês é footer.",
        },
        {
          id: "noticia",
          rotulo: "Uma notícia que faz sentido sozinha, mesmo fora da página.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "nav", texto: "<nav>" },
              { valor: "footer", texto: "<footer>" },
              { valor: "article", texto: "<article>" },
              { valor: "main", texto: "<main>" },
            ],
            esperado: "article",
          },
          mensagemCerta: "article é conteúdo independente.",
          mensagemErrada: "Conteúdo independente, que se sustenta sozinho: article.",
        },
        {
          id: "principal",
          rotulo: "O conteúdo principal da página (só existe um).",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "nav", texto: "<nav>" },
              { valor: "footer", texto: "<footer>" },
              { valor: "article", texto: "<article>" },
              { valor: "main", texto: "<main>" },
            ],
            esperado: "main",
          },
          mensagemCerta: "main é o conteúdo principal.",
          mensagemErrada: "Principal em inglês é main.",
        },
      ],
    },
    {
      id: "h1-unico",
      titulo: "Quantos h1?",
      instrucao: "Quantas vezes, em geral, se usa a tag <h1> em uma página?",
      campos: [
        {
          id: "h1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: ["Em todo parágrafo importante.", "Uma vez só, para o assunto principal da página.", "Nunca: usa-se só h2.", "Quantas vezes quiser."],
            correta: 1,
          },
          mensagemCerta: "Um h1 por página, para o assunto principal; as partes usam h2, h3…",
          mensagemErrada: "O h1 é o título principal da página: um só.",
        },
      ],
    },
    {
      id: "escreva-estrutura",
      titulo: "Escreva a estrutura",
      instrucao: "Escreva a primeira linha de todo documento HTML moderno, que avisa ao navegador o tipo de arquivo.",
      campos: [
        {
          id: "doctype",
          placeholder: "<!…>",
          regra: {
            tipo: "padrao",
            padrao: /^\s*<!DOCTYPE\s+html>\s*$/i,
          },
          mensagemCerta: "É a primeira linha de toda página HTML.",
          mensagemErrada: "Escreva <!DOCTYPE html>.",
        },
      ],
    },
  ],
};

export default atividade;
