import type { ProvaInterativa, VerificacaoCodigo } from "@/types/quiz";

/**
 * Prova de CSS no mesmo formato da de HTML: cada questão pede uma regra de
 * estilo para um trecho de HTML dado, o aluno escreve o CSS e o servidor
 * confere o que o código tem (ele não executa nada). Até 3 testes por questão.
 * Escrita para o portal, sem um PDF de origem; os temas seguem o que se ensina
 * num curso de CSS básico (seletores, cor, texto, caixa, flexbox, responsivo).
 */
const v = (descricao: string, padrao: string): VerificacaoCodigo => ({ descricao, padrao, flags: "i" });
const VERMELHO = String.raw`(?:red|#f00|#ff0000|rgb\(\s*255\s*,\s*0\s*,\s*0\s*\))`;
const AZUL = String.raw`(?:blue|#00f|#0000ff|rgb\(\s*0\s*,\s*0\s*,\s*255\s*\))`;
const AMARELO = String.raw`(?:yellow|#ff0|#ffff00|rgb\(\s*255\s*,\s*255\s*,\s*0\s*\))`;
const VERDE = String.raw`(?:green|#008000|rgb\(\s*0\s*,\s*128\s*,\s*0\s*\))`;
const VERDE_ESCURO = String.raw`(?:darkgreen|#006400|rgb\(\s*0\s*,\s*100\s*,\s*0\s*\))`;
const CINZA_CLARO = String.raw`(?:lightgr[ae]y|#d3d3d3|rgb\(\s*211\s*,\s*211\s*,\s*211\s*\))`;
const PRETO = String.raw`(?:black|#000|#000000|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\))`;
/** Regra de um seletor: `seletor { ... propriedade: valor ... }`. */
const regra = (seletor: string, propriedade: string) => String.raw`${seletor}\s*\{[^}]*\b${propriedade}\s*:\s*`;

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Avaliação Prática: Desenvolvimento Web — CSS",
  introducao:
    "Cada questão mostra um trecho de HTML e pede uma regra de estilo. Escreva só o CSS pedido (com seletor, chaves e propriedades) e use “Testar resposta” para ver o que ainda falta.",
  itens: [
    {
      titulo: "Questão 1: Seletor de elemento",
      enunciado: "Faça o texto de todos os parágrafos da página ficar azul.",
      exemplo: { rotulo: "HTML da página", conteudo: "<p>Primeiro parágrafo.</p>\n<p>Segundo parágrafo.</p>" },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Regra com o seletor p { ... }", String.raw`(?:^|[}\s,])p\s*\{`),
              v("Propriedade color com o valor azul (blue)", regra(String.raw`(?:^|[}\s,])p`, "color") + AZUL),
            ],
          },
        },
      ],
      mensagemCerta: "Regra de elemento aplicada a todos os parágrafos.",
      mensagemErrada: "Use p { color: blue; }.",
    },
    {
      titulo: "Questão 2: Seletor de classe",
      enunciado: "Dê fundo amarelo apenas aos elementos que têm a classe destaque.",
      exemplo: { rotulo: "HTML da página", conteudo: '<p>Texto comum.</p>\n<p class="destaque">Texto importante.</p>' },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Seletor de classe .destaque { ... }", String.raw`\.destaque\s*\{`),
              v("background-color (ou background) amarelo", regra(String.raw`\.destaque`, "background(?:-color)?") + AMARELO),
            ],
          },
        },
      ],
      mensagemCerta: "A classe usa ponto na frente — e só ela ficou amarela.",
      mensagemErrada: "Use .destaque { background-color: yellow; }.",
    },
    {
      titulo: "Questão 3: Seletor de id",
      enunciado: "Centralize o texto do elemento com id titulo e deixe a cor dele vermelha.",
      exemplo: { rotulo: "HTML da página", conteudo: '<h1 id="titulo">Minha Página</h1>' },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Seletor de id #titulo { ... }", String.raw`#titulo\s*\{`),
              v("text-align: center", regra("#titulo", "text-align") + "center"),
              v("color vermelha (red)", regra("#titulo", "color") + VERMELHO),
            ],
          },
        },
      ],
      mensagemCerta: "O id usa # na frente e serve para um elemento só.",
      mensagemErrada: "Use #titulo { text-align: center; color: red; }.",
    },
    {
      titulo: "Questão 4: Texto e fonte",
      enunciado: "Estilize o título h1: fonte Arial (com sans-serif de reserva), tamanho 32px e negrito.",
      exemplo: { rotulo: "HTML da página", conteudo: "<h1>Meu Tema Favorito</h1>" },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Regra com o seletor h1 { ... }", String.raw`(?:^|[}\s,])h1\s*\{`),
              v("font-family: Arial", regra(String.raw`(?:^|[}\s,])h1`, "font-family") + String.raw`[^;}]*arial`),
              v("font-size de 32px (ou 2rem / 2em)", regra(String.raw`(?:^|[}\s,])h1`, "font-size") + String.raw`(?:32px|2rem|2em)`),
              v("font-weight: bold (ou 700)", regra(String.raw`(?:^|[}\s,])h1`, "font-weight") + String.raw`(?:bold|700)`),
            ],
          },
        },
      ],
      mensagemCerta: "Fonte, tamanho e peso definidos.",
      mensagemErrada: "Use font-family, font-size e font-weight dentro de h1 { ... }.",
    },
    {
      titulo: "Questão 5: Caixa (box model)",
      enunciado:
        "A classe caixa deve ter largura de 300px, espaçamento interno (padding) de 20px, borda de 2px sólida preta e margem externa de 15px.",
      exemplo: { rotulo: "HTML da página", conteudo: '<div class="caixa">Conteúdo da caixa</div>' },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Seletor de classe .caixa { ... }", String.raw`\.caixa\s*\{`),
              v("width: 300px", regra(String.raw`\.caixa`, "width") + "300px"),
              v("padding: 20px", regra(String.raw`\.caixa`, "padding") + "20px"),
              v("border de 2px solid preta", regra(String.raw`\.caixa`, "border") + String.raw`2px\s+solid\s+${PRETO}`),
              v("margin: 15px", regra(String.raw`\.caixa`, "margin") + "15px"),
            ],
          },
        },
      ],
      mensagemCerta: "Largura, padding, borda e margem aplicados.",
      mensagemErrada: "Use width, padding, border (2px solid black) e margin dentro de .caixa { ... }.",
    },
    {
      titulo: "Questão 6: Botão arredondado",
      enunciado: "A classe botao deve ter fundo verde (green), texto branco e cantos arredondados de 8px.",
      exemplo: { rotulo: "HTML da página", conteudo: '<button class="botao">Enviar</button>' },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Seletor de classe .botao { ... }", String.raw`\.botao\s*\{`),
              v("background-color (ou background) verde", regra(String.raw`\.botao`, "background(?:-color)?") + VERDE),
              v("color branca (white)", regra(String.raw`\.botao`, "color") + String.raw`(?:white|#fff|#ffffff)`),
              v("border-radius de 8px", regra(String.raw`\.botao`, "border-radius") + "8px"),
            ],
          },
        },
      ],
      mensagemCerta: "Botão estilizado.",
      mensagemErrada: "Use background-color: green; color: white; border-radius: 8px; dentro de .botao { ... }.",
    },
    {
      titulo: "Questão 7: Efeito ao passar o mouse",
      enunciado: "Quando o mouse passar por cima do botão com a classe botao, o fundo dele deve mudar para verde escuro (darkgreen).",
      exemplo: { rotulo: "HTML da página", conteudo: '<button class="botao">Enviar</button>' },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Pseudo-classe .botao:hover { ... }", String.raw`\.botao\s*:\s*hover\s*\{`),
              v("background-color (ou background) verde escuro", regra(String.raw`\.botao\s*:\s*hover`, "background(?:-color)?") + VERDE_ESCURO),
            ],
          },
        },
      ],
      mensagemCerta: "O :hover muda o estilo só enquanto o mouse está em cima.",
      mensagemErrada: "Use .botao:hover { background-color: darkgreen; }.",
    },
    {
      titulo: "Questão 8: Flexbox",
      enunciado: "Centralize o conteúdo da classe container na horizontal e na vertical usando flexbox, com 10px de espaço entre os itens.",
      exemplo: { rotulo: "HTML da página", conteudo: '<div class="container">\n    <p>Um</p>\n    <p>Dois</p>\n</div>' },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Seletor de classe .container { ... }", String.raw`\.container\s*\{`),
              v("display: flex", regra(String.raw`\.container`, "display") + "flex"),
              v("justify-content: center", regra(String.raw`\.container`, "justify-content") + "center"),
              v("align-items: center", regra(String.raw`\.container`, "align-items") + "center"),
              v("gap: 10px", regra(String.raw`\.container`, "gap") + "10px"),
            ],
          },
        },
      ],
      mensagemCerta: "Flexbox no container: o resto vem de justify-content e align-items.",
      mensagemErrada: "Use display: flex; justify-content: center; align-items: center; gap: 10px; em .container { ... }.",
    },
    {
      titulo: "Questão 9: Que seletor é esse?",
      enunciado: "Associe cada seletor ao que ele escolhe na página:",
      campos: [
        { id: "sel-p", rotulo: "p { ... }", regra: { tipo: "selecao", opcoes: SELETORES(), esperado: "elemento" } },
        { id: "sel-classe", rotulo: ".aviso { ... }", regra: { tipo: "selecao", opcoes: SELETORES(), esperado: "classe" } },
        { id: "sel-id", rotulo: "#topo { ... }", regra: { tipo: "selecao", opcoes: SELETORES(), esperado: "id" } },
        { id: "sel-hover", rotulo: "a:hover { ... }", regra: { tipo: "selecao", opcoes: SELETORES(), esperado: "hover" } },
      ],
      mensagemCerta: "Isso mesmo! Elemento sem símbolo, classe com ponto, id com cerquilha.",
      mensagemErrada: "Alguma associação está trocada. Lembre: ponto é classe, cerquilha é id.",
    },
    {
      titulo: "Questão 10: Página responsiva",
      enunciado: "Em telas de até 600px de largura, o fundo do body deve ficar cinza claro (lightgray). Use uma media query.",
      exemplo: { rotulo: "HTML da página", conteudo: "<body>\n    <p>Conteúdo da página</p>\n</body>" },
      campos: [
        {
          id: "css",
          rotulo: "Escreva seu CSS:",
          regra: {
            tipo: "codigo",
            verificacoes: [
              v("Media query com max-width: 600px", String.raw`@media\s*(?:only\s+screen\s+and\s*)?(?:screen\s+and\s*)?\(\s*max-width\s*:\s*600px\s*\)\s*\{`),
              v(
                "Regra body { ... } com fundo cinza claro dentro da media query",
                String.raw`@media[^{]*\{[\s\S]*\bbody\s*\{[^}]*\bbackground(?:-color)?\s*:\s*${CINZA_CLARO}`,
              ),
            ],
          },
        },
      ],
      mensagemCerta: "Media query aplicada: o estilo só vale em telas pequenas.",
      mensagemErrada: "Use @media (max-width: 600px) { body { background-color: lightgray; } }.",
    },
  ],
};

function SELETORES() {
  return [
    { valor: "elemento", texto: "Seleciona todas as tags desse tipo" },
    { valor: "classe", texto: "Seleciona os elementos com essa classe" },
    { valor: "id", texto: "Seleciona o único elemento com esse id" },
    { valor: "hover", texto: "Seleciona o link enquanto o mouse está sobre ele" },
  ];
}

export default prova;
