// Fluxograma da questão 9 da prova de Lógica de Programação (rotina de domingo
// com um desvio: dia de sol ou não). Sai em public/provas/ porque o .prova.ts é
// carregado pelo servidor e só pode apontar imagem por caminho.
import { svg, texto } from '../pecas.mjs';

export const destino = 'logica-fluxograma';
export const saida = 'public/provas/logica-de-programacao';

const TRACO = '#1f2937';
const FUNDO = '#ffffff';
const CX = 320;

function caixa(y, rotulo, { x = CX, largura = 150 } = {}) {
  return [
    `  <rect x="${x - largura / 2}" y="${y}" width="${largura}" height="24" fill="${FUNDO}" stroke="${TRACO}" stroke-width="1.4"/>`,
    texto(x, y + 16, rotulo, { tamanho: 11.5, centro: true }),
  ].join('\n');
}

function terminal(y, rotulo) {
  return [
    `  <rect x="${CX - 60}" y="${y}" width="120" height="24" rx="12" fill="${FUNDO}" stroke="${TRACO}" stroke-width="1.4"/>`,
    texto(CX, y + 16, rotulo, { tamanho: 11.5, centro: true }),
  ].join('\n');
}

const seta = (x1, y1, x2, y2) => `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${TRACO}" stroke-width="1.4" marker-end="url(#ponta)"/>`;
const linha = (x1, y1, x2, y2) => `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${TRACO}" stroke-width="1.4"/>`;

export const telas = {};

telas['fluxograma-domingo'] = svg([
  '  <defs><marker id="ponta" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#1f2937"/></marker></defs>',
  terminal(10, 'Início'),
  seta(CX, 34, CX, 46),
  caixa(46, 'Acordar'),
  seta(CX, 70, CX, 82),
  caixa(82, 'Tomar café'),
  seta(CX, 106, CX, 118),
  `  <polygon points="${CX},118 ${CX + 70},148 ${CX},178 ${CX - 70},148" fill="${FUNDO}" stroke="${TRACO}" stroke-width="1.4"/>`,
  texto(CX, 152, 'Dia de Sol?', { tamanho: 11.5, centro: true }),
  // desvio: esquerda (Não) e direita (Sim)
  linha(CX - 70, 148, 160, 148),
  seta(160, 148, 160, 196),
  linha(CX + 70, 148, 480, 148),
  seta(480, 148, 480, 196),
  texto(CX + 82, 142, 'Sim', { tamanho: 11 }),
  texto(CX - 106, 142, 'Não', { tamanho: 11 }),
  caixa(196, 'Ler jornal.', { x: 160, largura: 130 }),
  caixa(196, 'Vou à praia.', { x: 480, largura: 130 }),
  // volta ao fluxo principal
  linha(160, 220, 160, 236),
  linha(480, 220, 480, 236),
  linha(160, 236, 480, 236),
  seta(CX, 236, CX, 252),
  caixa(252, 'Ir ao cinema.'),
  seta(CX, 276, CX, 288),
  caixa(288, 'Fazer refeição.'),
  seta(CX, 312, CX, 324),
  caixa(324, 'Ir dormir.'),
  seta(CX, 348, CX, 360),
  terminal(360, 'Fim do domingo.'),
], '#ffffff');
