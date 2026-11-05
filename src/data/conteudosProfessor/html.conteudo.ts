import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "HTML é a linguagem que dá estrutura às páginas da web: títulos, textos, listas, imagens, links, tabelas e formulários. O curso vai da primeira página até uma página completa com HTML semântico.",
  topicos: [
    {
      titulo: "Estrutura básica de uma página",
      texto: [
        "Um documento HTML tem a declaração <!DOCTYPE html>, o elemento <html>, o <head> (informações da página, como o <title> e a codificação charset UTF-8) e o <body> (o conteúdo visível). As tags aparecem em pares (abre e fecha), com alguns elementos que não fecham, como <img> e <br>. Atributos, como src e href, dão detalhes à tag. Salva-se o arquivo com a extensão .html e abre-se no navegador.",
      ],
      pontos: ["Montar a estrutura mínima de uma página.", "Abrir o arquivo no navegador."],
      erros: ["Esquecer de fechar tags.", "Salvar o arquivo como .txt."],
      atividades: ["html-meu-primeiro-html"],
    },
    {
      titulo: "Textos, listas e links",
      texto: [
        "Títulos de <h1> a <h6> (um <h1> por página, por convenção de boas práticas), parágrafos <p>, ênfase <strong> e <em>. Listas com marcadores (<ul>) e numeradas (<ol>) têm itens <li>. Links usam <a href='endereço'>: para um site, uma página do projeto ou e-mail (mailto:).",
      ],
      pontos: ["Criar uma hierarquia de títulos.", "Fazer uma lista e links."],
      atividades: ["html-textos-listas-e-links"],
    },
    {
      titulo: "Imagens e tabelas",
      texto: [
        "A imagem usa <img src='arquivo' alt='descrição'>. O atributo alt descreve a imagem para quem usa leitor de tela e aparece se a imagem não carregar: é essencial para acessibilidade. Tabelas: <table> com <tr> (linha), <th> (cabeçalho) e <td> (célula). Tabela serve para dados, não para organizar a página.",
      ],
      pontos: ["Inserir uma imagem com texto alternativo.", "Montar uma tabela com cabeçalho."],
      erros: ["Esquecer o alt.", "Usar tabela para o layout da página."],
      atividades: ["html-imagens-e-tabelas"],
    },
    {
      titulo: "Formulários",
      texto: [
        "O formulário (<form>) coleta dados. Campos: <input> (tipos text, email, password, number, checkbox, radio), <select> com <option>, <textarea> e o botão de envio. Cada campo tem name e um <label> ligado pelo atributo for/id, o que melhora a acessibilidade e o clique. Atributos como required e type='email' fazem validação básica no navegador.",
      ],
      pontos: ["Criar um formulário com labels ligados.", "Usar required e o tipo certo de input."],
      atividades: ["html-formularios"],
    },
    {
      titulo: "HTML semântico",
      texto: [
        "Tags semânticas dizem o significado do trecho: <header> (cabeçalho), <nav> (menu), <main> (conteúdo principal), <section>, <article> e <footer>. Ajudam leitores de tela, buscadores e a organização do código, mais do que várias <div> sem significado.",
      ],
      pontos: ["Organizar uma página com as tags semânticas."],
      atividades: ["html-pagina-completa-semantica"],
    },
  ],
  glossario: [
    { termo: "Tag", definicao: "Marcação entre < > que define um elemento." },
    { termo: "Atributo", definicao: "Informação extra dentro da tag, como src e href." },
    { termo: "alt", definicao: "Texto alternativo que descreve a imagem." },
    { termo: "Semântica", definicao: "Uso de tags com significado (header, nav, main)." },
    { termo: "Hiperlink", definicao: "Ligação para outra página ou recurso." },
  ],
  dicas: [
    "Use o editor com pré-visualização e peça que o aluno atualize o navegador a cada mudança.",
    "Ensine a inspecionar páginas reais (F12): o aluno vê o HTML de sites conhecidos.",
    "Reforce a acessibilidade desde o começo: alt e labels.",
  ],
};

export default conteudo;
