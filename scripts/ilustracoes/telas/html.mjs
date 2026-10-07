// Ilustrações das atividades de HTML (src/assets/atividades/html/): anatomia de
// uma tag, estrutura de um documento e a relação entre o código e o navegador.
import { esc, svg, texto } from '../pecas.mjs';

export const destino = 'html';

const AZUL = '#1d4ed8';
const LARANJA = '#e34c26';
const VERDE = '#15803d';
const ROXO = '#7c3aed';
const CINZA = '#6b7280';
const MONO = 'font-family="Consolas, Menlo, monospace"';

const mono = (x, y, conteudo, { tamanho = 12, cor = '#1f2937', negrito = false } = {}) =>
  `  <text x="${x}" y="${y}" font-size="${tamanho}" fill="${cor}" ${MONO}${negrito ? ' font-weight="700"' : ''} xml:space="preserve">${esc(conteudo)}</text>`;

const rect = (x, y, w, h, fill, stroke = null, rx = 0) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`;

/** Chave horizontal embaixo de um trecho de código, com rótulo. */
const chave = (x1, x2, y, rotulo, cor) => [
  `  <path d="M${x1} ${y} v6 h${x2 - x1} v-6" fill="none" stroke="${cor}" stroke-width="2"/>`,
  texto((x1 + x2) / 2, y + 22, rotulo, { tamanho: 11.5, cor, negrito: true, centro: true }),
].join('\n');

export const telas = {};

// ------------------------------------------------------------ anatomia de uma tag
const CH = 12.04; // largura de um caractere monoespaçado a 20px
const X0 = 60;
const px = (i) => X0 + i * CH;
const trecho = (cor, conteudo) => `<tspan fill="${cor}">${esc(conteudo)}</tspan>`;

/** Chave sob os caracteres [de, ate) do código, com rótulo em uma ou duas linhas. */
const chaveCh = (de, ate, y, linhas, cor) => {
  const x1 = px(de) + 2;
  const x2 = px(ate) - 2;
  return [
    `  <path d="M${x1} ${y} v6 h${x2 - x1} v-6" fill="none" stroke="${cor}" stroke-width="2"/>`,
    ...linhas.map((l, i) => texto((x1 + x2) / 2, y + 22 + i * 14, l, { tamanho: 11.5, cor, negrito: true, centro: true })),
  ].join('\n');
};

telas['anatomia-tag'] = svg([
  rect(20, 20, 600, 360, '#ffffff', '#cbd5e1', 12),
  texto(320, 52, 'Anatomia de um elemento HTML', { tamanho: 16, negrito: true, centro: true }),
  rect(40, 78, 560, 56, '#0f172a', null, 8),
  `  <text x="${X0}" y="114" font-size="20" ${MONO} xml:space="preserve">${trecho('#fca5a5', '<p')} ${trecho('#fcd34d', 'class')}${trecho('#e5e7eb', '=')}${trecho('#86efac', '"aviso"')}${trecho('#fca5a5', '>')}${trecho('#ffffff', 'Atenção ao prazo!')}${trecho('#fca5a5', '</p>')}</text>`,
  chaveCh(0, 17, 142, ['tag de abertura'], LARANJA),
  chaveCh(17, 34, 142, ['conteúdo', '(aparece na tela)'], AZUL),
  chaveCh(34, 38, 142, ['tag de', 'fechamento'], LARANJA),
  chaveCh(3, 8, 190, ['nome do', 'atributo'], '#b45309'),
  chaveCh(9, 16, 190, ['valor do', 'atributo'], VERDE),
  rect(40, 244, 560, 124, '#f8fafc', '#e2e8f0', 8),
  texto(56, 266, 'Como ler:', { tamanho: 12.5, negrito: true }),
  texto(56, 288, '•  A tag abre com < > e fecha com </ >: o navegador sabe onde o elemento começa e termina.', { tamanho: 10.5 }),
  texto(56, 308, '•  O atributo dá uma informação extra à tag (aqui, a classe "aviso") e fica na tag de abertura.', { tamanho: 10.5 }),
  texto(56, 328, '•  O conteúdo é o texto, a imagem ou outros elementos que ficam dentro da tag.', { tamanho: 10.5 }),
  texto(56, 348, '•  Algumas tags não fecham, como <img> e <br>: são as tags vazias.', { tamanho: 10.5 }),
], '#e5e7eb');

// ------------------------------------------------------------ estrutura do documento
/** Caixa folha (sem filhos): rótulo centralizado. */
const caixa = (x, y, w, h, rotulo, fundo, borda, sub = null) => [
  rect(x, y, w, h, fundo, borda, 6),
  mono(x + w / 2, y + (sub ? h / 2 - 2 : h / 2 + 4), rotulo, { tamanho: 12, negrito: true, cor: borda }).replace('<text', '<text text-anchor="middle"'),
  sub ? texto(x + w / 2, y + h / 2 + 13, sub, { tamanho: 9.5, cor: CINZA, centro: true }) : '',
].join('\n');

/** Caixa que contém outras: rótulo no topo. */
const contenedor = (x, y, w, h, rotulo, fundo, borda, sub = null) => [
  rect(x, y, w, h, fundo, borda, 6),
  mono(x + w / 2, y + 18, rotulo, { tamanho: 12, negrito: true, cor: borda }).replace('<text', '<text text-anchor="middle"'),
  sub ? texto(x + w / 2, y + 32, sub, { tamanho: 9.5, cor: CINZA, centro: true }) : '',
].join('\n');

telas['estrutura-documento'] = svg([
  rect(14, 10, 612, 380, '#ffffff', '#cbd5e1', 12),
  texto(320, 36, 'A estrutura de uma página HTML', { tamanho: 15, negrito: true, centro: true }),
  caixa(40, 50, 560, 34, '<html lang="pt-BR">', '#fff7ed', LARANJA),
  contenedor(56, 96, 150, 270, '<head>', '#eff6ff', AZUL, 'não aparece na página'),
  caixa(70, 150, 122, 28, '<meta charset>', '#ffffff', AZUL),
  caixa(70, 188, 122, 28, '<title>', '#ffffff', AZUL),
  caixa(70, 226, 122, 28, '<link css>', '#ffffff', AZUL),
  texto(131, 290, 'Informações para o', { tamanho: 10, cor: CINZA, centro: true }),
  texto(131, 304, 'navegador: acentos,', { tamanho: 10, cor: CINZA, centro: true }),
  texto(131, 318, 'título da aba, estilos.', { tamanho: 10, cor: CINZA, centro: true }),
  contenedor(220, 96, 366, 270, '<body>', '#f0fdf4', VERDE, 'tudo o que aparece na página'),
  caixa(236, 146, 334, 32, '<header>  cabeçalho com <h1> e <nav>', '#ffffff', VERDE),
  contenedor(236, 188, 334, 84, '<main>', '#ffffff', VERDE),
  caixa(250, 214, 150, 44, '<section>', '#f0fdf4', VERDE, 'h2 + p'),
  caixa(408, 214, 150, 44, '<article>', '#f0fdf4', VERDE, 'conteúdo independente'),
  caixa(236, 282, 334, 32, '<footer>  rodapé com contato', '#ffffff', VERDE),
  texto(403, 340, 'Cada bloco tem uma tag de abertura e outra de fechamento.', { tamanho: 10.5, cor: CINZA, centro: true }),
], '#e5e7eb');

// ------------------------------------------------------------ código x navegador
telas['codigo-e-navegador'] = svg([
  rect(14, 10, 612, 380, '#ffffff', '#cbd5e1', 12),
  texto(167, 36, 'Você escreve (index.html)', { tamanho: 12.5, negrito: true, cor: LARANJA, centro: true }),
  texto(468, 36, 'O navegador mostra', { tamanho: 12.5, negrito: true, cor: AZUL, centro: true }),
  rect(26, 48, 282, 326, '#0f172a', null, 8),
  mono(38, 72, '<h1>Meu Time</h1>', { cor: '#fca5a5' }),
  mono(38, 96, '<p>O Fluminense joga', { cor: '#ffffff' }),
  mono(38, 112, '   no Maracanã.</p>', { cor: '#ffffff' }),
  mono(38, 136, '<img src="time.png"', { cor: '#fcd34d' }),
  mono(38, 152, '     alt="Escudo">', { cor: '#fcd34d' }),
  mono(38, 176, '<h2>Títulos</h2>', { cor: '#fca5a5' }),
  mono(38, 200, '<ul>', { cor: '#86efac' }),
  mono(38, 216, '  <li>Carioca</li>', { cor: '#86efac' }),
  mono(38, 232, '  <li>Brasileiro</li>', { cor: '#86efac' }),
  mono(38, 248, '</ul>', { cor: '#86efac' }),
  mono(38, 272, '<a href="https://ge.globo.com">', { cor: '#93c5fd', tamanho: 11 }),
  mono(38, 288, '  Notícias</a>', { cor: '#93c5fd', tamanho: 11 }),
  `  <path d="M316 200 h26 l-8 -8 m8 8 l-8 8" fill="none" stroke="${CINZA}" stroke-width="2.4"/>`,
  rect(350, 48, 264, 326, '#ffffff', '#94a3b8', 8),
  rect(350, 48, 264, 26, '#e2e8f0', null, 8),
  rect(358, 56, 120, 12, '#ffffff', '#cbd5e1', 6),
  texto(374, 66, 'index.html', { tamanho: 8.5, cor: CINZA }),
  texto(364, 104, 'Meu Time', { tamanho: 24, negrito: true }),
  texto(364, 128, 'O Fluminense joga no Maracanã.', { tamanho: 11.5 }),
  rect(364, 138, 74, 56, '#ecfdf5', '#86efac', 4),
  texto(401, 170, 'Escudo', { tamanho: 10, cor: VERDE, centro: true }),
  texto(364, 222, 'Títulos', { tamanho: 17, negrito: true }),
  texto(380, 244, '•  Carioca', { tamanho: 12 }),
  texto(380, 262, '•  Brasileiro', { tamanho: 12 }),
  texto(364, 296, 'Notícias', { tamanho: 12, cor: AZUL }),
  `  <line x1="364" y1="299" x2="410" y2="299" stroke="${AZUL}"/>`,
  texto(482, 350, 'O HTML diz O QUE é cada coisa;', { tamanho: 10.5, cor: CINZA, centro: true }),
  texto(482, 364, 'o navegador decide como mostrar.', { tamanho: 10.5, cor: CINZA, centro: true }),
], '#e5e7eb');
