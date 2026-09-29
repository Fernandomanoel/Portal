// Ilustrações das atividades de PowerPoint (src/assets/atividades/powerpoint/).
// Diagrama ilustrativo do gráfico ligado à mini planilha de dados — a parte
// que mais surpreende quem nunca inseriu um gráfico no PowerPoint.
import { janelaOffice, svg, texto } from '../pecas.mjs';
import { POWERPOINT } from '../passo-a-passo-comum.mjs';

export const destino = 'powerpoint';

export const telas = {};

const CATEGORIAS = ['Jan', 'Fev', 'Mar', 'Abr'];
const VALORES = [3, 5, 4, 7];
const ALTURA_MAX = 90;

function barra(i, valor) {
  const x = 190 + i * 60;
  const altura = (valor / 8) * ALTURA_MAX;
  const y = 330 - altura;
  return `  <rect x="${x}" y="${y}" width="36" height="${altura}" rx="2" fill="#2563eb"/>
  ${texto(x + 18, 344, CATEGORIAS[i], { tamanho: 10.5, centro: true, cor: '#374151' })}`;
}

telas['grafico-inserido'] = svg([
  janelaOffice(POWERPOINT, 'Apresentação1 - PowerPoint'),
  '  <path d="M20 122 h600 v252 a10 10 0 0 1 -10 10 h-580 a10 10 0 0 1 -10 -10 z" fill="#e5e7eb"/>',
  '  <g filter="url(#sombra)"><rect x="140" y="134" width="360" height="240" fill="#ffffff"/></g>',
  texto(160, 158, 'Vendas do 1º trimestre', { tamanho: 16, negrito: true }),
  '  <line x1="176" y1="330" x2="176" y2="180" stroke="#9ca3af" stroke-width="1.2"/>',
  '  <line x1="176" y1="330" x2="450" y2="330" stroke="#9ca3af" stroke-width="1.2"/>',
  ...CATEGORIAS.map((_, i) => barra(i, VALORES[i])),
  '  <g filter="url(#sombra)"><rect x="330" y="60" width="270" height="200" rx="6" fill="#ffffff" stroke="#cbd5e1"/></g>',
  '  <path d="M330 66 a6 6 0 0 1 6 -6 h258 a6 6 0 0 1 6 6 v24 h-270 z" fill="#217346"/>',
  texto(465, 82, 'Editar Dados no Excel', { tamanho: 10.5, cor: '#ffffff', centro: true }),
  '  <g stroke="#e5e7eb"><line x1="330" y1="110" x2="600" y2="110"/><line x1="330" y1="138" x2="600" y2="138"/><line x1="330" y1="166" x2="600" y2="166"/><line x1="330" y1="194" x2="600" y2="194"/>'
    + '<line x1="410" y1="90" x2="410" y2="222"/><line x1="500" y1="90" x2="500" y2="222"/></g>',
  texto(370, 104, 'Mês', { tamanho: 10.5, negrito: true, centro: true }),
  texto(455, 104, 'Vendas', { tamanho: 10.5, negrito: true, centro: true }),
  ...CATEGORIAS.map((mes, i) => `  ${texto(370, 132 + i * 28, mes, { tamanho: 10.5, centro: true })}
  ${texto(455, 132 + i * 28, String(VALORES[i]), { tamanho: 10.5, centro: true })}`),
  texto(465, 240, 'Mude um número aqui e o gráfico muda sozinho', { tamanho: 9, cor: '#6b7280', centro: true }),
], '#dfe8f5');
