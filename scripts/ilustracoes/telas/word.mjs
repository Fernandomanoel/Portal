// Ilustrações das atividades de Word (src/assets/atividades/word/).
// Diagramas ilustrativos — o foco é a atividade de Normas ABNT: o aluno não
// costuma ter visto um trabalho acadêmico pronto, então as imagens mostram o
// resultado esperado (capa, margens, folha de rosto), não a interface do
// Word passo a passo (isso já está escrito nos passos de texto).
import { chamada, esc, menu, svg, texto } from '../pecas.mjs';
import { WORD } from '../passo-a-passo-comum.mjs';

export const destino = 'word';

const PAGINA = { x: 190, y: 20, largura: 260, altura: 360 };

/** Folha de papel (proporção A4) centralizada no canvas, com sombra leve. */
function folha({ margens = null } = {}) {
  const { x, y, largura, altura } = PAGINA;
  const partes = [
    `  <g filter="url(#sombra)"><rect x="${x}" y="${y}" width="${largura}" height="${altura}" fill="#ffffff"/></g>`,
  ];
  if (margens) {
    const { superior, inferior, esquerda, direita } = margens;
    partes.push(
      `  <rect x="${x + esquerda}" y="${y + superior}" width="${largura - esquerda - direita}" height="${altura - superior - inferior}" fill="none" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="4 3"/>`,
    );
  }
  return partes.join('\n');
}

/** Linha de texto centralizada dentro da folha. */
function linha(y, conteudo, { tamanho = 10.5, negrito = false } = {}) {
  return texto(PAGINA.x + PAGINA.largura / 2, y, conteudo, { tamanho, negrito, centro: true });
}

/** Seta dupla com medida em cm, para o diagrama de margens. */
function medida(x1, y1, x2, y2, rotulo) {
  const vertical = x1 === x2;
  const meioX = vertical ? x1 : (x1 + x2) / 2;
  const meioY = vertical ? (y1 + y2) / 2 : y1;
  const fundo = vertical
    ? `  <rect x="${meioX - 15}" y="${meioY - 8}" width="30" height="16" fill="#fff7ed"/>`
    : `  <rect x="${meioX - 15}" y="${meioY - 8}" width="30" height="16" fill="#fff7ed"/>`;
  return `  <g stroke="#ea580c" stroke-width="1.4">
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
    <path d="M${x1} ${y1} l${vertical ? '-3 4M' + x1 + ' ' + y1 + ' l3 4' : '4 -3M' + x1 + ' ' + y1 + ' l4 3'}"/>
    <path d="M${x2} ${y2} l${vertical ? '-3 -4M' + x2 + ' ' + y2 + ' l3 -4' : '4 3M' + x2 + ' ' + y2 + ' l4 -3'}"/>
  </g>
${fundo}
  <text x="${meioX}" y="${meioY + 4}" font-size="10.5" font-weight="700" fill="#c2410c" text-anchor="middle">${esc(rotulo)}</text>`;
}

export const telas = {};

// 1. Capa — o que o aluno está tentando produzir. Espaçamento vertical bem
// aberto, igual a uma capa ABNT real (nada de texto grudado).
telas['abnt-capa'] = svg([
  folha(),
  linha(PAGINA.y + 42, 'UNIVERSIDADE EXEMPLO DE ENSINO', { negrito: true }),
  linha(PAGINA.y + 60, 'CURSO TÉCNICO EM INFORMÁTICA'),
  linha(PAGINA.y + 195, 'MARIA DA SILVA SANTOS'),
  linha(PAGINA.y + 245, 'ANÁLISE DO COMPORTAMENTO', { negrito: true }),
  linha(PAGINA.y + 261, 'HUMANO E PERSUASÃO', { negrito: true }),
  linha(PAGINA.y + 279, 'Uma perspectiva baseada no manual do FBI', { tamanho: 9.5 }),
  linha(PAGINA.y + 335, 'CIDADE - ESTADO'),
  linha(PAGINA.y + 350, '2026'),
], '#eef2fb');

// 2. Margens — a régua de medidas que o passo pede (3/3/2/2 cm), com a área
// de texto tracejada para o aluno ver onde a margem "corta" a página.
telas['abnt-margens'] = svg([
  folha({ margens: { superior: 44, inferior: 29, esquerda: 40, direita: 27 } }),
  medida(PAGINA.x + 130, PAGINA.y - 12, PAGINA.x + 130, PAGINA.y + 44, '3 cm'),
  medida(20, PAGINA.y + 130, PAGINA.x - 12, PAGINA.y + 130, '3 cm'),
  medida(PAGINA.x + 130, PAGINA.y + 380, PAGINA.x + 130, PAGINA.y + 351, '2 cm'),
  medida(PAGINA.x + 288, PAGINA.y + 130, 620, PAGINA.y + 130, '2 cm'),
  texto(PAGINA.x + PAGINA.largura / 2, PAGINA.y + 200, 'Layout → Margens →', { tamanho: 10, centro: true, cor: '#6b7280' }),
  texto(PAGINA.x + PAGINA.largura / 2, PAGINA.y + 214, 'Margens Personalizadas', { tamanho: 10, centro: true, cor: '#6b7280' }),
], '#eef2fb');

// 3. Folha de rosto — a segunda página, com o parágrafo da natureza do
// trabalho recuado à direita (a parte que mais confunde: não é a página
// inteira que muda de alinhamento, só esse bloco).
telas['abnt-folha-rosto'] = svg([
  folha(),
  linha(PAGINA.y + 42, 'MARIA DA SILVA SANTOS'),
  linha(PAGINA.y + 85, 'ANÁLISE DO COMPORTAMENTO', { negrito: true }),
  linha(PAGINA.y + 101, 'HUMANO E PERSUASÃO', { negrito: true }),
  `  <g font-size="8" fill="#374151">
    <text x="${PAGINA.x + 148}" y="${PAGINA.y + 175}">Trabalho acadêmico apresentado</text>
    <text x="${PAGINA.x + 148}" y="${PAGINA.y + 186}">como requisito parcial para a</text>
    <text x="${PAGINA.x + 148}" y="${PAGINA.y + 197}">disciplina de Comportamento</text>
    <text x="${PAGINA.x + 148}" y="${PAGINA.y + 208}">Humano, sob orientação do</text>
    <text x="${PAGINA.x + 148}" y="${PAGINA.y + 219}">Prof. Dr. Manoel.</text>
  </g>`,
  `  <line x1="${PAGINA.x + 144}" y1="${PAGINA.y + 160}" x2="${PAGINA.x + 144}" y2="${PAGINA.y + 224}" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3 3"/>`,
  chamada(PAGINA.x - 168, PAGINA.y + 150, 138, 'Recuo até 8 cm', ['só este parágrafo,', 'fonte 10, sem negrito'], { escura: false }),
  linha(PAGINA.y + 335, 'CIDADE - ESTADO'),
  linha(PAGINA.y + 350, '2026'),
], '#eef2fb');

// 4. Mala direta — o menu que os alunos não acham sozinhos: onde inserir
// cada campo de mesclagem (nome, endereço...) dentro da carta.
telas['mala-direta-campos'] = svg([
  `  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>`,
  `  <path d="M20 26 a10 10 0 0 1 10 -10 h580 a10 10 0 0 1 10 10 v44 h-600 z" fill="${WORD.cor}"/>`,
  texto(320, 37, 'Carta1 - Word', { tamanho: 12, cor: '#ffffff', centro: true }),
  '  <g fill="#ffffff" font-size="12"><text x="556" y="37">—</text><rect x="578" y="29" width="9" height="9" fill="none" stroke="#ffffff"/><text x="600" y="38">×</text></g>',
  texto(46, 65, 'Correspondências', { tamanho: 11.5, cor: '#ffffff', negrito: true }),
  '  <rect x="20" y="70" width="600" height="52" fill="#f3f4f6"/>',
  '  <rect x="34" y="80" width="150" height="30" rx="5" fill="#ffffff" stroke="#cbd5e1"/>',
  texto(48, 99, 'Iniciar Mala Direta', { tamanho: 11 }),
  '  <rect x="196" y="80" width="188" height="30" rx="5" fill="#dbeafe" stroke="#60a5fa" stroke-width="1.5"/>',
  texto(210, 99, 'Inserir Campo de Mesclagem', { tamanho: 10.5, negrito: true, cor: '#1e3a8a' }),
  '  <line x1="20" y1="122" x2="620" y2="122" stroke="#e5e7eb"/>',
  '  <path d="M20 122 h600 v252 a10 10 0 0 1 -10 10 h-580 a10 10 0 0 1 -10 -10 z" fill="#e5e7eb"/>',
  '  <rect x="170" y="136" width="300" height="248" fill="#ffffff" stroke="#d4d4d8"/>',
  texto(196, 275, 'Prezado(a)', { tamanho: 13 }),
  `  <rect x="266" y="263" width="48" height="16" rx="3" fill="#e5e7eb"/>${texto(290, 275, '«Nome»', { tamanho: 11, centro: true, cor: '#374151' })}`,
  texto(196, 305, 'Endereço:', { tamanho: 13 }),
  `  <rect x="196" y="315" width="70" height="16" rx="3" fill="#e5e7eb"/>${texto(231, 327, '«Endereço»', { tamanho: 10.5, centro: true, cor: '#374151' })}`,
  `  <rect x="196" y="343" width="52" height="16" rx="3" fill="#e5e7eb"/>${texto(222, 355, '«Cidade»', { tamanho: 10.5, centro: true, cor: '#374151' })}`,
  `  <rect x="253" y="343" width="46" height="16" rx="3" fill="#e5e7eb"/>${texto(276, 355, '«Estado»', { tamanho: 10.5, centro: true, cor: '#374151' })}`,
  `  <rect x="196" y="365" width="46" height="14" rx="3" fill="#e5e7eb"/>${texto(219, 376, '«CEP»', { tamanho: 9.5, centro: true, cor: '#374151' })}`,
  menu(196, 116, [
    ['Nome', null, true],
    ['Endereço', null],
    ['Cidade', null],
    ['Estado', null],
    ['CEP', null],
  ], 150),
  chamada(400, 190, 200, 'Campo cinza = dado da planilha', ['cada carta impressa troca', 'pelo valor daquela linha'], { escura: false }),
], '#dfe8f5');
