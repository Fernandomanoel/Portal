import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/site-atividade1-saas.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade 1 — Site SaaS",
  introducao: "Seu primeiro projeto completo: a página de um produto SaaS (Software as a Serviço) fictício",
  itens: [
    {
      id: "o-que-voce-vai-construir",
      titulo: "O que você vai construir",
      blocos: [
        {
          tipo: "texto",
          texto: "Você vai criar, do zero, o site de apresentação (a \"landing page\") de uma empresa SaaS — ou seja, uma empresa que vende um software por assinatura (pense em ferramentas como Spotify, Netflix, Canva: você não compra o programa, paga uma mensalidade para usar).",
        },
        {
          tipo: "texto",
          texto: "A empresa e o produto são inventados por você — pode ser um app de estudos, uma ferramenta de organização de tarefas, um editor de imagens, o que você quiser.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Tema totalmente livre",
          texto: "Escolha a ideia do produto, o nome da empresa, as cores e o estilo visual. As imagens você mesmo vai buscar (bancos de imagem gratuitos, como Unsplash ou Pexels, ou ícones de sites como Flaticon) — este é um exercício de montar um site real, então a pesquisa de material faz parte do processo.",
        },
      ],
    },
    {
      id: "planejamento-de-pastas",
      titulo: "Planejamento de pastas",
      blocos: [
        {
          tipo: "texto",
          texto: "Antes de codar, organize os arquivos. Para este projeto, mantenha simples — no máximo 3 páginas HTML:",
        },
        {
          tipo: "codigo",
          conteudo: `meu-site-saas/
├── index.html      # sua página principal — obrigatória
├── style.css        # todo o CSS num arquivo só
├── script.js         # todo o JavaScript num arquivo só
└── imagens/
    ├── logo.png
    ├── icone-1.svg
    └── foto-hero.jpg`,
          rotulo: "estrutura simples (recomendada)",
        },
        {
          tipo: "texto",
          texto: "Tudo cabe numa index.html só, com seções (hero, recursos, preços...) uma embaixo da outra — é o jeito mais simples de começar, e totalmente válido para esta atividade.",
        },
        {
          tipo: "texto",
          texto: "Se preferir separar em mais de uma página, pode — só não passe de 3 páginas HTML no total:",
        },
        {
          tipo: "codigo",
          conteudo: `meu-site-saas/
├── index.html      # página inicial (hero + recursos)
├── precos.html      # página de planos
├── contato.html      # página de contato
├── style.css         # o mesmo CSS vale para as 3 páginas
├── script.js
└── imagens/`,
          rotulo: "variação com 3 páginas",
        },
        {
          tipo: "texto",
          texto: "style.css",
        },
        {
          tipo: "texto",
          texto: "script.js",
        },
        {
          tipo: "texto",
          texto: "<link rel=\"stylesheet\" href=\"style.css\">",
        },
        {
          tipo: "texto",
          texto: "<script src=\"script.js\"></script>",
        },
      ],
    },
    {
      id: "secoes-do-site",
      titulo: "Seções do site",
      blocos: [
        {
          tipo: "texto",
          texto: "Um site SaaS costuma ter: cabeçalho, um destaque inicial (hero), recursos do produto, planos e preços, e contato/rodapé. A ordem, as cores, os espaçamentos e quantos itens cada seção tem são decisão sua — abaixo tem um exemplo de código pra cada parte, pra você usar como ponto de partida e modificar à vontade.",
        },
        {
          tipo: "subtitulo",
          texto: "Estrutura base da página",
        },
        {
          tipo: "codigo",
          conteudo: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NomeDoSeuProduto</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>...</header>
  <section id="inicio">...</section>
  <section id="recursos">...</section>
  <section id="precos">...</section>
  <footer id="contato">...</footer>
  <script src="script.js"></script>
</body>
</html>`,
          rotulo: "index.html",
        },
        {
          tipo: "texto",
          texto: "O <nav>, o conteúdo do hero, etc. entram dentro de cada tag — o esqueleto acima é só o ponto de partida. Agora vamos seção por seção: cada bloco abaixo traz o HTML e o CSS completo, pronto pra você copiar, colar e modificar.",
        },
        {
          tipo: "subtitulo",
          texto: "Modelo — Cabeçalho com navegação",
        },
        {
          tipo: "texto",
          texto: "O <header> fica no topo de todas as páginas. Dentro dele, um <nav> alinha o logo à esquerda e os links à direita, usando Flexbox.",
        },
        {
          tipo: "texto",
          texto: "Modelo · adapte cores, links e logo",
        },
        {
          tipo: "codigo",
          conteudo: `<header>
  <nav class="navbar">
    <a href="index.html" class="logo">SeuProduto</a>

    <ul class="menu">
      <li><a href="#inicio">Início</a></li>
      <li><a href="#recursos">Recursos</a></li>
      <li><a href="#precos">Preços</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>

    <button class="botao-menu">☰</button>
  </nav>
</header>`,
          rotulo: "html",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Cabeçalho ── */
header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: sticky;   /* gruda no topo ao rolar */
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5em;
  font-weight: 800;
  color: #7c3aed;     /* troque pela cor do seu produto */
  text-decoration: none;
}

.menu {
  display: flex;
  list-style: none;
  gap: 28px;
}

.menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}
.menu a:hover {
  color: #7c3aed;
}

/* O botão ☰ começa escondido — só aparece no celular */
.botao-menu {
  display: none;
  background: none;
  border: none;
  font-size: 1.6em;
  cursor: pointer;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "texto",
          texto: "O position: sticky faz o cabeçalho grudar no topo quando o usuário rola — isso é bem comum em sites SaaS. Se preferir que ele não grude, é só remover as linhas position, top e z-index.",
        },
        {
          tipo: "subtitulo",
          texto: "Modelo — Seção Hero (destaque inicial)",
        },
        {
          tipo: "texto",
          texto: "O hero é o primeiro bloco que o visitante vê — geralmente uma frase de impacto, um subtítulo e um botão chamativo. Aqui usamos background: linear-gradient(...) para criar um fundo degradê sem precisar de imagem.",
        },
        {
          tipo: "texto",
          texto: "Modelo · mude textos, cores e fundo",
        },
        {
          tipo: "codigo",
          conteudo: `<section id="inicio" class="hero">
  <div class="hero-conteudo">
    <h1>Organize sua vida com o <span>SeuProduto</span></h1>
    <p>A ferramenta que simplifica o que parece complicado.</p>
    <a href="#precos" class="botao-cta">Comece grátis</a>
  </div>
</section>`,
          rotulo: "html",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Hero ── */
.hero {
  background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%);
  color: #fff;
  padding: 100px 40px;
  text-align: center;
}

.hero-conteudo {
  max-width: 700px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.8em;
  margin-bottom: 18px;
  line-height: 1.2;
}

/* Destaque no nome do produto */
.hero h1 span {
  color: #a78bfa;
}

.hero p {
  font-size: 1.2em;
  opacity: 0.9;
  margin-bottom: 30px;
}

/* Botão de ação (CTA = Call To Action) */
.botao-cta {
  display: inline-block;
  background: #fff;
  color: #4c1d95;
  padding: 14px 36px;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.botao-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}`,
          rotulo: "style.css",
        },
        {
          tipo: "texto",
          texto: "O linear-gradient mistura duas cores — troque pelos tons do seu produto. Se preferir uma imagem de fundo em vez do degradê, use background: url('imagens/foto-hero.jpg') center/cover; no lugar.",
        },
        {
          tipo: "subtitulo",
          texto: "Modelo — Cards de recursos (com grid em Flex)",
        },
        {
          tipo: "texto",
          texto: "A seção de recursos mostra o que o produto faz. Cada recurso fica dentro de um \"card\" — e os cards ficam lado a lado usando Flexbox com flex-wrap, que automaticamente quebra a linha quando não cabe mais.",
        },
        {
          tipo: "texto",
          texto: "Modelo · duplique o card quantas vezes quiser",
        },
        {
          tipo: "codigo",
          conteudo: `<section id="recursos" class="secao-recursos">
  <h2>O que o SeuProduto faz por você</h2>

  <div class="grade-recursos">
    <!-- Copie este card quantas vezes quiser -->
    <div class="card-recurso">
      <img src="imagens/icone-1.svg" alt="">
      <h3>Nome do recurso</h3>
      <p>Uma frase curta explicando o que esse recurso faz.</p>
    </div>
  </div>
</section>`,
          rotulo: "html",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Seção de recursos ── */
.secao-recursos {
  padding: 80px 40px;
  text-align: center;
}

.secao-recursos h2 {
  font-size: 2em;
  margin-bottom: 40px;
  color: #1a1a2e;
}

/* O container flexível: itens lado a lado, quebrando
   linha automaticamente quando não cabem mais */
.grade-recursos {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
}

.card-recurso {
  background: #fff;
  border-radius: 12px;
  padding: 30px 24px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  flex: 1 1 280px;     /* cresce, encolhe, base de 280px */
  max-width: 340px;     /* não fica largo demais */
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-recurso:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.card-recurso img {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
}

.card-recurso h3 {
  font-size: 1.15em;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.card-recurso p {
  color: #666;
  font-size: 0.95em;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "texto",
          texto: "O segredo é flex: 1 1 280px — cada card tenta ter pelo menos 280px, mas cresce pra preencher o espaço. Com 3 cards, ficam lado a lado; com 6, ficam em duas linhas; no celular, cada um ocupa a tela inteira. Copie o <div class=\"card-recurso\"> quantas vezes quiser — 2, 5, 8, o número é seu.",
        },
        {
          tipo: "subtitulo",
          texto: "Modelo — Planos e preços",
        },
        {
          tipo: "texto",
          texto: "A tabela de preços é uma das seções mais importantes de um site SaaS. Aqui vai o HTML com os planos e o CSS que faz o plano \"popular\" se destacar dos outros.",
        },
        {
          tipo: "texto",
          texto: "Modelo · duplique o .plano quantas vezes quiser",
        },
        {
          tipo: "codigo",
          conteudo: `<section id="precos" class="secao-precos">
  <h2>Escolha seu plano</h2>

  <div class="grade-planos">

    <div class="plano">
      <h3>Gratuito</h3>
      <p class="preco">R$ 0<span>/mês</span></p>
      <ul>
        <li>Funcionalidade básica</li>
        <li>1 projeto</li>
        <li>Suporte por e-mail</li>
      </ul>
      <a href="#" class="botao-plano">Começar</a>
    </div>

    <!-- Adicione class="destaque" no plano que quer destacar -->
    <div class="plano destaque">
      <span class="selo-popular">Mais popular</span>
      <h3>Profissional</h3>
      <p class="preco">R$ 29<span>/mês</span></p>
      <ul>
        <li>Tudo do Gratuito</li>
        <li>Projetos ilimitados</li>
        <li>Suporte prioritário</li>
      </ul>
      <a href="#" class="botao-plano">Assinar</a>
    </div>

  </div>
</section>`,
          rotulo: "html",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Planos e preços ── */
.secao-precos {
  padding: 80px 40px;
  background: #f8f5ff;
  text-align: center;
}

.secao-precos h2 {
  font-size: 2em;
  margin-bottom: 40px;
}

.grade-planos {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}

.plano {
  background: #fff;
  border-radius: 12px;
  padding: 36px 28px;
  flex: 1 1 260px;
  max-width: 320px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  border: 2px solid transparent;
  transition: transform 0.2s, border-color 0.2s;
  position: relative;
}

.plano:hover {
  transform: translateY(-4px);
  border-color: #7c3aed;
}

/* Plano em destaque: borda roxa e um pouco maior */
.plano.destaque {
  border-color: #7c3aed;
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(124,58,237,0.15);
}

/* Selo "Mais popular" */
.selo-popular {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #7c3aed;
  color: #fff;
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 0.8em;
  font-weight: 700;
}

.preco {
  font-size: 2.5em;
  font-weight: 800;
  color: #1a1a2e;
  margin: 16px 0;
}
.preco span {
  font-size: 0.4em;
  font-weight: 400;
  color: #999;
}

.plano ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}
.plano li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  color: #555;
}
.plano li::before {
  content: "✓ ";
  color: #7c3aed;
  font-weight: 700;
}

.botao-plano {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 28px;
  border-radius: 8px;
  background: #7c3aed;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}
.botao-plano:hover {
  background: #6d28d9;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "texto",
          texto: "Duplique o <div class=\"plano\"> quantas vezes quiser. Adicione class=\"plano destaque\" no que quiser destacar — pode ser nenhum, pode ser um. Os itens da <ul> também são livres — bote quantas vantagens fizerem sentido.",
        },
        {
          tipo: "subtitulo",
          texto: "Modelo — Formulário de contato",
        },
        {
          tipo: "texto",
          texto: "Um formulário simples de contato, com os campos estilizados. Ele não vai enviar dados de verdade (isso precisa de back-end), mas serve para praticar HTML de formulário e CSS de inputs — e mais adiante a gente faz a validação com JavaScript.",
        },
        {
          tipo: "texto",
          texto: "Modelo · adicione ou remova campos",
        },
        {
          tipo: "codigo",
          conteudo: `<section id="contato" class="secao-contato">
  <h2>Fale com a gente</h2>

  <form class="formulario" id="form-contato">
    <div class="campo">
      <label for="nome">Seu nome</label>
      <input type="text" id="nome" placeholder="Fulano de Tal" required>
    </div>

    <div class="campo">
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="fulano@email.com" required>
    </div>

    <div class="campo">
      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" rows="5" placeholder="Escreva sua mensagem..." required></textarea>
    </div>

    <button type="submit" class="botao-enviar">Enviar mensagem</button>
  </form>
</section>`,
          rotulo: "html",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Formulário de contato ── */
.secao-contato {
  padding: 80px 40px;
  text-align: center;
}

.formulario {
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}

.campo {
  margin-bottom: 20px;
}

.campo label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.campo input,
.campo textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  font-family: inherit;
  transition: border-color 0.2s;
}

/* Muda a borda quando o campo está selecionado */
.campo input:focus,
.campo textarea:focus {
  outline: none;
  border-color: #7c3aed;
}

.botao-enviar {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}
.botao-enviar:hover {
  background: #6d28d9;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "texto",
          texto: "Adicione mais campos se fizer sentido (telefone, assunto, etc.) ou remova o que não precisar. O :focus é o estado de quando o usuário clica no campo — a borda muda de cor pra indicar onde ele está digitando.",
        },
        {
          tipo: "subtitulo",
          texto: "Modelo — Rodapé",
        },
        {
          tipo: "texto",
          texto: "O rodapé fecha o site. Aqui um modelo com colunas usando Flexbox — uma pro logo/texto, outra pra links rápidos, outra pra informações.",
        },
        {
          tipo: "texto",
          texto: "Modelo · adapte as colunas",
        },
        {
          tipo: "codigo",
          conteudo: `<footer class="rodape">
  <div class="rodape-conteudo">
    <div class="rodape-col">
      <h3>SeuProduto</h3>
      <p>Simplificando a vida desde 2026.</p>
    </div>
    <div class="rodape-col">
      <h4>Links</h4>
      <a href="#inicio">Início</a>
      <a href="#recursos">Recursos</a>
      <a href="#precos">Preços</a>
    </div>
    <div class="rodape-col">
      <h4>Contato</h4>
      <p>contato@seuproduto.com</p>
    </div>
  </div>
  <p class="rodape-copy">&copy; 2026 SeuProduto. Todos os direitos reservados.</p>
</footer>`,
          rotulo: "html",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Rodapé ── */
.rodape {
  background: #1a1a2e;
  color: #ccc;
  padding: 50px 40px 24px;
}

.rodape-conteudo {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.rodape-col {
  flex: 1 1 200px;
}

.rodape-col h3 {
  color: #fff;
  margin-bottom: 12px;
}
.rodape-col h4 {
  color: #fff;
  margin-bottom: 12px;
}

.rodape-col a {
  display: block;
  color: #aaa;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.2s;
}
.rodape-col a:hover {
  color: #fff;
}

.rodape-copy {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #333;
  font-size: 0.85em;
  color: #888;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "texto",
          texto: "Cada .rodape-col é uma coluna. Adicione ou remova quantas quiser. No celular, por causa do flex-wrap, elas empilham automaticamente.",
        },
      ],
    },
    {
      id: "css-estilos-globais-e-reset",
      titulo: "CSS — Estilos globais e reset",
      blocos: [
        {
          tipo: "texto",
          texto: "No começo do style.css, coloque um reset e as configurações gerais do site. Isso garante que todos os navegadores exibam igual e define a fonte, as cores e o comportamento de rolagem do site inteiro.",
        },
        {
          tipo: "codigo",
          conteudo: `/* ── Reset e base ──
   Tira margens e paddings padrão de todos os elementos
   e faz box-sizing funcionar de forma intuitiva. */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;  /* rolagem suave ao clicar nos links #ancora */
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
  background: #fff;
}

img {
  max-width: 100%;   /* imagens nunca furam o container */
  display: block;
}

a {
  color: #7c3aed;
}

h1, h2, h3 {
  line-height: 1.2;
}`,
          rotulo: "style.css (começo do arquivo)",
        },
        {
          tipo: "texto",
          texto: "box-sizing: border-box",
        },
        {
          tipo: "texto",
          texto: "padding",
        },
        {
          tipo: "texto",
          texto: "border",
        },
        {
          tipo: "texto",
          texto: "width: 100%",
        },
        {
          tipo: "texto",
          texto: "padding: 20px",
        },
        {
          tipo: "texto",
          texto: "maior",
        },
        {
          tipo: "texto",
          texto: "border-box",
        },
      ],
    },
    {
      id: "css-botoes-cores-e-efeitos-hover",
      titulo: "CSS — Botões, cores e efeitos hover",
      blocos: [
        {
          tipo: "texto",
          texto: "Efeitos visuais fazem o site parecer profissional. A propriedade transition cria animações suaves entre estados (normal → hover, por exemplo), e transform move/escala o elemento sem mexer no layout.",
        },
        {
          tipo: "subtitulo",
          texto: "Transition — o segredo dos efeitos suaves",
        },
        {
          tipo: "texto",
          texto: "Quando você define transition, qualquer mudança naquela propriedade acontece suavemente, em vez de trocar de repente:",
        },
        {
          tipo: "codigo",
          conteudo: `/* Sem transition: ao passar o mouse, a cor muda instantaneamente.
   Com transition: a cor muda em 0.3 segundos, suavemente. */

.botao {
  background: #7c3aed;
  color: #fff;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;

  /* Quais propriedades animar e por quanto tempo */
  transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
}

.botao:hover {
  background: #6d28d9;        /* cor mais escura */
  transform: translateY(-2px); /* sobe 2px */
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}`,
          rotulo: "style.css",
        },
        {
          tipo: "subtitulo",
          texto: "Variações de botão",
        },
        {
          tipo: "texto",
          texto: "Um site normalmente tem mais de um estilo de botão — por exemplo, um primário (preenchido) e um secundário (só contorno):",
        },
        {
          tipo: "codigo",
          conteudo: `/* Botão secundário — fundo transparente, só a borda */
.botao-secundario {
  background: transparent;
  color: #7c3aed;
  border: 2px solid #7c3aed;
  padding: 12px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}

.botao-secundario:hover {
  background: #7c3aed;
  color: #fff;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "subtitulo",
          texto: "Efeitos em cards (hover + sombra)",
        },
        {
          tipo: "texto",
          texto: "Cards que \"levantam\" ao passar o mouse dão sensação de interatividade. Basta combinar transform com box-shadow:",
        },
        {
          tipo: "codigo",
          conteudo: `.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.25s, box-shadow 0.25s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
}`,
          rotulo: "style.css",
        },
      ],
    },
    {
      id: "css-tornando-responsivo-com-media",
      titulo: "CSS — Tornando responsivo com @media",
      blocos: [
        {
          tipo: "texto",
          texto: "O site precisa funcionar bem no computador e no celular. Para isso, usamos @media queries — blocos de CSS que só valem quando a tela tem um certo tamanho. Coloque estes blocos no final do style.css, depois de todos os outros estilos.",
        },
        {
          tipo: "texto",
          texto: "Regra de ouro:",
        },
        {
          tipo: "texto",
          texto: "@media",
        },
        {
          tipo: "texto",
          texto: "@media",
        },
        {
          tipo: "texto",
          texto: "\"desktop first\"",
        },
        {
          tipo: "codigo",
          conteudo: `/* ════════════════════════════════════════════════
   TABLET — telas de até 900px
   ════════════════════════════════════════════════ */
@media (max-width: 900px) {

  /* Navbar empilha: logo em cima, menu embaixo */
  .navbar {
    flex-direction: column;
    gap: 12px;
  }

  /* Hero com menos espaço */
  .hero {
    padding: 60px 24px;
  }
  .hero h1 {
    font-size: 2em;
  }

  /* Cards: 2 por linha em vez de 3 */
  .card-recurso {
    flex: 1 1 45%;
    max-width: none;
  }

  /* Planos empilham verticalmente */
  .plano.destaque {
    transform: none;  /* tira o scale(1.05) */
  }
}

/* ════════════════════════════════════════════════
   CELULAR — telas de até 600px
   ════════════════════════════════════════════════ */
@media (max-width: 600px) {

  /* Menu escondido por padrão — aparece quando o JS
     adiciona a classe "aberto" */
  .menu {
    display: none;
    flex-direction: column;
    gap: 0;
    width: 100%;
    text-align: center;
  }
  .menu.aberto {
    display: flex;
  }
  .menu a {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
  }

  /* Mostra o botão ☰ */
  .botao-menu {
    display: block;
  }

  /* Hero mais compacto */
  .hero {
    padding: 50px 20px;
  }
  .hero h1 {
    font-size: 1.6em;
  }

  /* Cards: 1 por linha */
  .card-recurso {
    flex: 1 1 100%;
  }

  /* Seções com menos padding lateral */
  .secao-recursos,
  .secao-precos,
  .secao-contato {
    padding: 50px 20px;
  }

  /* Rodapé empilhado */
  .rodape-conteudo {
    flex-direction: column;
    text-align: center;
  }
}`,
          rotulo: "style.css (final do arquivo)",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Como testar no celular sem ter celular?",
          texto: "No navegador (Chrome, Edge, Firefox), aperte F12 para abrir as Ferramentas do Desenvolvedor. Clique no ícone de celular/tablet no canto superior — isso simula a tela de diferentes dispositivos. Arraste a largura para ver seu site se adaptar.",
        },
      ],
    },
    {
      id: "javascript-interatividade",
      titulo: "JavaScript — Interatividade",
      blocos: [
        {
          tipo: "texto",
          texto: "A atividade pede pelo menos uma interação real em JavaScript. Abaixo tem quatro exemplos prontos — escolha uma ou mais, ou invente a sua. Tudo vai no script.js.",
        },
        {
          tipo: "subtitulo",
          texto: "JS 1 — Menu mobile (abre/fecha)",
        },
        {
          tipo: "texto",
          texto: "O botão ☰ que você colocou no <header> precisa de JavaScript para funcionar. Ao clicar, ele adiciona/remove a classe aberto no menu — e o CSS que você escreveu no @media (max-width: 600px) cuida do resto:",
        },
        {
          tipo: "codigo",
          conteudo: `// ── Menu mobile ──
const botaoMenu = document.querySelector('.botao-menu');
const menu = document.querySelector('.menu');

botaoMenu.addEventListener('click', () => {
  menu.classList.toggle('aberto');
});

// Fecha o menu quando um link é clicado
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
  });
});`,
          rotulo: "script.js",
        },
        {
          tipo: "texto",
          texto: "O classList.toggle funciona assim: se a classe aberto existe, ele tira; se não existe, ele coloca. É um interruptor.",
        },
        {
          tipo: "subtitulo",
          texto: "JS 2 — Scroll suave ao clicar nos links",
        },
        {
          tipo: "texto",
          texto: "Se você já colocou scroll-behavior: smooth no CSS, o scroll suave já funciona para links com #ancora. Mas se quiser controlar pelo JavaScript (por exemplo, para fechar o menu mobile ao mesmo tempo), use isto:",
        },
        {
          tipo: "codigo",
          conteudo: `// ── Scroll suave nos links de navegação ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});`,
          rotulo: "script.js",
        },
        {
          tipo: "texto",
          texto: "O querySelectorAll('a[href^=\"#\"]') pega todos os links que começam com # — ou seja, links internos da página. Ao clicar, rola suavemente até o elemento com aquele id.",
        },
        {
          tipo: "subtitulo",
          texto: "JS 3 — Botão \"Voltar ao topo\"",
        },
        {
          tipo: "texto",
          texto: "Um botão flutuante que aparece quando o usuário rola para baixo, e leva de volta ao topo ao clicar:",
        },
        {
          tipo: "codigo",
          conteudo: "<button class=\"btn-topo\" id=\"btn-topo\">↑</button>",
          rotulo: "html (antes de fechar o </body>)",
        },
        {
          tipo: "codigo",
          conteudo: `.btn-topo {
  position: fixed;     /* fica fixo na tela, não rola junto */
  bottom: 30px;
  right: 30px;
  background: #7c3aed;
  color: #fff;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.4em;
  cursor: pointer;
  opacity: 0;         /* começa invisível */
  transition: opacity 0.3s;
  pointer-events: none; /* não clicável enquanto invisível */
}

.btn-topo.visivel {
  opacity: 1;
  pointer-events: auto;
}`,
          rotulo: "style.css",
        },
        {
          tipo: "codigo",
          conteudo: `// ── Botão voltar ao topo ──
const btnTopo = document.getElementById('btn-topo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btnTopo.classList.add('visivel');
  } else {
    btnTopo.classList.remove('visivel');
  }
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});`,
          rotulo: "script.js",
        },
        {
          tipo: "texto",
          texto: "O window.scrollY retorna quantos pixels a página já rolou. Se rolou mais de 400px, mostra o botão; se rolou menos, esconde. O position: fixed no CSS garante que ele fica no canto da tela mesmo enquanto rola.",
        },
        {
          tipo: "subtitulo",
          texto: "JS 4 — Validação do formulário de contato",
        },
        {
          tipo: "texto",
          texto: "Quando o usuário clicar em \"Enviar\", conferimos se os campos foram preenchidos corretamente antes de \"enviar\" (neste caso, mostrar uma mensagem de sucesso):",
        },
        {
          tipo: "codigo",
          conteudo: `// ── Validação do formulário ──
const form = document.getElementById('form-contato');

form.addEventListener('submit', (e) => {
  e.preventDefault();  // impede o envio real (não temos back-end)

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Verifica se algum campo ficou vazio
  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Verifica se o e-mail tem formato válido
  if (!email.includes('@') || !email.includes('.')) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  // Tudo certo — mostra mensagem de sucesso
  alert('Mensagem enviada com sucesso! (simulação)');
  form.reset();  // limpa os campos
});`,
          rotulo: "script.js",
        },
        {
          tipo: "texto",
          texto: "O e.preventDefault() impede o formulário de recarregar a página. O .trim() remove espaços em branco no início e fim do texto — sem ele, alguém que digitasse só espaços passaria na validação. O form.reset() limpa todos os campos do formulário.",
        },
        {
          tipo: "texto",
          texto: "Não precisa usar estes quatro.",
        },
        {
          tipo: "texto",
          texto: "pelo menos uma",
        },
        {
          tipo: "texto",
          texto: "algo funcional",
        },
      ],
    },
    {
      id: "dicas-extras-de-css",
      titulo: "Dicas extras de CSS",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Centralizar qualquer coisa com Flexbox",
        },
        {
          tipo: "texto",
          texto: "Se precisar centralizar algo (horizontal e verticalmente), use:",
        },
        {
          tipo: "codigo",
          conteudo: `.centralizado {
  display: flex;
  justify-content: center;  /* centraliza no eixo horizontal */
  align-items: center;      /* centraliza no eixo vertical */
}`,
          rotulo: "style.css",
        },
        {
          tipo: "subtitulo",
          texto: "Espaçamento com gap (em vez de margin)",
        },
        {
          tipo: "texto",
          texto: "Dentro de um container flex, use gap em vez de margin nos filhos — é mais limpo:",
        },
        {
          tipo: "codigo",
          conteudo: `/* Em vez de dar margin-right em cada card... */
.container-cards {
  display: flex;
  gap: 24px;   /* espaço entre os itens, sem margin */
}`,
          rotulo: "style.css",
        },
        {
          tipo: "subtitulo",
          texto: "Limitar a largura do conteúdo sem perder o fundo",
        },
        {
          tipo: "texto",
          texto: "Quando uma seção tem fundo colorido de ponta a ponta, mas o texto precisa ficar centralizado e limitado:",
        },
        {
          tipo: "codigo",
          conteudo: `/* A section ocupa toda a largura (fundo colorido).
   O conteúdo dentro fica limitado a 1100px e centralizado. */
.secao {
  background: #f8f5ff;
  padding: 80px 40px;
}

.secao .conteudo {
  max-width: 1100px;
  margin: 0 auto;  /* auto nas laterais = centralizado */
}`,
          rotulo: "style.css",
        },
        {
          tipo: "subtitulo",
          texto: "Sombra de texto para legibilidade em imagens",
        },
        {
          tipo: "texto",
          texto: "Se colocar texto sobre uma imagem de fundo, uma sombra sutil ajuda a ler:",
        },
        {
          tipo: "codigo",
          conteudo: `.hero-com-foto {
  background: url('imagens/foto-hero.jpg') center/cover;
  color: #fff;
}

.hero-com-foto h1 {
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}`,
          rotulo: "style.css",
        },
      ],
    },
    {
      id: "requisitos-tecnicos",
      titulo: "Requisitos técnicos",
      blocos: [
        {
          tipo: "texto",
          texto: "A criatividade é livre — mas estes pontos valem para qualquer versão do seu site:",
        },
        {
          tipo: "lista",
          itens: [
            "HTML semântico — use as tags certas para cada parte (<header>, <section>, <footer>, <nav>), não tudo em <div>;",
            "CSS todo seu — sem frameworks prontos tipo Bootstrap; o objetivo é praticar CSS de verdade;",
            "Responsivo — o site precisa funcionar bem tanto no computador quanto no celular (use @media);",
            "Pelo menos 1 interação em JavaScript — menu mobile, validação de formulário, efeito de scroll, etc.;",
            "Imagens leves — comprima as imagens antes de usar, para o site carregar rápido.",
          ],
        },
      ],
    },
    {
      id: "entrega-como-salvar-seu-progresso",
      titulo: "Entrega — como salvar seu progresso",
      blocos: [
        {
          tipo: "texto",
          texto: "Esta atividade não tem data de entrega marcada — ela é grande de propósito, para você desenvolver com calma ao longo de várias aulas. A forma de \"entregar\" é simples:",
        },
        {
          tipo: "texto",
          texto: "git push",
        },
        {
          tipo: "texto",
          texto: "Git e GitHub — Criando seu Repositório",
        },
        {
          tipo: "subtitulo",
          texto: "Sugestão de commits ao longo do projeto",
        },
        {
          tipo: "texto",
          texto: "Não espere o site ficar pronto para commitar. Cada etapa merece um commit separado:",
        },
        {
          tipo: "codigo",
          conteudo: `# Primeiro commit — só a estrutura HTML
git add .
git commit -m "Criar estrutura HTML com header, hero e sections"
git push

# Segundo commit — CSS do cabeçalho e hero
git add .
git commit -m "Estilizar header com navbar sticky e hero com gradiente"
git push

# Terceiro commit — seção de recursos
git add .
git commit -m "Adicionar cards de recursos com hover e flex grid"
git push

# E assim por diante...`,
          rotulo: "terminal",
        },
        {
          tipo: "texto",
          texto: "Seu instrutor vai acompanhar o histórico de commits do seu repositório no GitHub — múltiplos commits ao longo do tempo mostram seu processo de trabalho e sua evolução.",
        },
      ],
    },
    {
      id: "checklist-antes-de-considerar-concluido",
      titulo: "Checklist antes de considerar concluído",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Cabeçalho com navegação (logo + links), hero, recursos, preços e contato/rodapé estão presentes;",
            "O CSS tem estilos para todas as seções: header, hero, cards, planos, formulário e rodapé;",
            "Os botões e cards têm efeito hover com transition;",
            "O site fica legível e utilizável tanto no celular quanto no computador (@media funcionando);",
            "Existe pelo menos uma interação em JavaScript funcionando (menu mobile, validação, scroll, etc.);",
            "As imagens usadas têm crédito/fonte anotado (mesmo que num comentário no HTML);",
            "O repositório no GitHub tem vários commits, não só um único commit final;",
            "Os arquivos estão organizados: index.html, style.css, script.js (e no máximo mais 2 páginas HTML, se dividiu).",
          ],
        },
      ],
    },
  ],
};

export default atividade;
