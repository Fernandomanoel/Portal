import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "CSS é a linguagem que dá aparência às páginas: cores, fontes, espaçamentos e layout. O curso mostra como ligar o CSS ao HTML, escolher elementos com seletores, entender o modelo de caixas e montar layouts com Flexbox e Grid, inclusive em telas de celular.",
  topicos: [
    {
      titulo: "Ligando o CSS ao HTML e a sintaxe",
      texto: [
        "O CSS pode ficar no mesmo arquivo (tag <style>), em linha (atributo style) ou, preferencialmente, em um arquivo próprio ligado com <link rel='stylesheet' href='estilo.css'>. Uma regra tem seletor e declarações: p { color: navy; font-size: 18px; }. Cada declaração tem propriedade e valor e termina com ponto e vírgula.",
      ],
      pontos: ["Ligar um arquivo CSS a uma página.", "Escrever uma regra com seletor e declarações."],
    },
    {
      titulo: "Seletores, herança e especificidade",
      texto: [
        "Seletores escolhem quem recebe o estilo: por elemento (p), por classe (.destaque), por id (#topo) e combinados (nav a). Muitas propriedades são herdadas pelos elementos internos. Quando duas regras entram em conflito, vence a mais específica (id > classe > elemento) e, em caso de empate, a que vem por último. Prefira classes a ids para estilizar.",
      ],
      pontos: ["Escolher um elemento por classe.", "Explicar por que uma regra não está valendo (conflito)."],
    },
    {
      titulo: "Cores, fontes e texto",
      texto: [
        "Cores se escrevem por nome, hexadecimal (#1a73e8), rgb() e hsl(). Para a leitura, é importante haver contraste entre o texto e o fundo. As propriedades de texto incluem font-family, font-size, font-weight, line-height, text-align. Unidades: px (fixa) e rem ou em (relativas, melhor para acessibilidade).",
      ],
      pontos: ["Definir cores e fontes.", "Escolher unidades relativas."],
      erros: ["Texto cinza-claro sobre fundo branco, de difícil leitura."],
    },
    {
      titulo: "Modelo de caixas",
      texto: [
        "Todo elemento é uma caixa: conteúdo, padding (espaço interno), border (borda) e margin (espaço externo). Com box-sizing: border-box, a largura inclui o padding e a borda, o que facilita o cálculo. Entender o modelo de caixas resolve a maioria dos problemas de espaçamento.",
      ],
      pontos: ["Distinguir margin e padding.", "Usar box-sizing: border-box."],
    },
    {
      titulo: "Layout com Flexbox e Grid, e responsividade",
      texto: [
        "Flexbox organiza itens em uma direção (linha ou coluna), com display: flex, justify-content (eixo principal), align-items (eixo transversal), gap e flex-wrap. Grid organiza em linhas e colunas (display: grid; grid-template-columns). Responsividade é adaptar a página a telas diferentes: a meta viewport, unidades relativas e media queries (@media (max-width: 600px) { ... }).",
      ],
      pontos: ["Centralizar elementos com Flexbox.", "Criar uma grade de três colunas.", "Escrever uma media query."],
      erros: ["Esquecer a tag meta viewport e a página ficar minúscula no celular."],
    },
  ],
  glossario: [
    { termo: "Seletor", definicao: "Parte da regra que escolhe os elementos que serão estilizados." },
    { termo: "Especificidade", definicao: "Peso que decide qual regra vence em um conflito." },
    { termo: "Padding / margin", definicao: "Espaço interno / espaço externo de um elemento." },
    { termo: "Flexbox", definicao: "Modelo de layout em uma dimensão." },
    { termo: "Grid", definicao: "Modelo de layout em linhas e colunas." },
    { termo: "Media query", definicao: "Regra que aplica estilos conforme o tamanho da tela." },
  ],
  dicas: [
    "Use as ferramentas do navegador (F12) para mostrar o CSS dos sites e experimentar valores ao vivo.",
    "Faça o aluno redimensionar a janela a cada passo, para enxergar a responsividade.",
    "Há jogos online de Flexbox e Grid que reforçam os conceitos de forma divertida.",
  ],
};

export default conteudo;
