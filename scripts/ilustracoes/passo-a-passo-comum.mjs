// Ajudantes compartilhados pelas telas da seção "Passo a Passo" (telas/passo-a-passo*.mjs).
// Fica fora de telas/ porque não é um conjunto de telas: só funções de montagem.
import {
  alvoRet, areaDeTrabalho, janelaOffice, mouseBotao, posicaoCelula, svg, teclaGrande, texto,
} from './pecas.mjs';

export const WORD = { nome: 'Word', cor: '#2b579a', letra: 'W' };
export const EXCEL = { nome: 'Excel', cor: '#217346', letra: 'X' };
export const POWERPOINT = { nome: 'PowerPoint', cor: '#b7472a', letra: 'P' };
export const BLOCO_DE_NOTAS = { nome: 'Bloco de Notas', cor: '#2563eb', letra: 'B' };
export const FIXADOS = [
  WORD, EXCEL, POWERPOINT, BLOCO_DE_NOTAS,
  { nome: 'Edge', cor: '#0e7490', letra: 'e' }, { nome: 'Paint', cor: '#be185d', letra: 'P' },
  { nome: 'Fotos', cor: '#1d4ed8', letra: 'F' }, { nome: 'Relógio', cor: '#4b5563', letra: 'R' },
];

export const ABAS_WORD = ['Arquivo', 'Página Inicial', 'Inserir', 'Layout', 'Revisão', 'Exibir'];
export const ABAS_EXCEL = ['Arquivo', 'Página Inicial', 'Inserir', 'Fórmulas', 'Dados', 'Exibir'];
export const ABAS_PPT = ['Arquivo', 'Página Inicial', 'Inserir', 'Design', 'Transições', 'Apresentação'];

export const FUNDO_TECLA = '#eef2f7';

export const desktop = (...trechos) => svg([areaDeTrabalho(), ...trechos], '#1d4ed8');

/** Moldura "clique aqui" em volta de um retângulo { x, y, largura, altura } das peças. */
export const alvoPos = (p, folga = 5) => alvoRet(p.x - folga, p.y - folga, p.largura + folga * 2, p.altura + folga * 2, 7);

/** Moldura "clique aqui" em volta de um item de `menu(x, y, itens, largura)`. */
export function alvoItem(x, y, itens, rotulo, largura) {
  let topo = y + 6;
  for (const [nome] of itens) {
    if (nome === rotulo) return alvoRet(x + 2, topo - 2, largura - 4, 30, 7);
    topo += nome ? 26 : 10;
  }
  throw new Error(`Item "${rotulo}" não está no menu`);
}

// Folga só vertical: de lado, a moldura cobriria o número da célula vizinha.
export const alvoCelula = (ref) => {
  const c = posicaoCelula(ref);
  return alvoRet(c.x - 1, c.y - 5, c.largura + 2, c.altura + 10, 6);
};

/** Tracejado em volta de um intervalo de células (ex.: A1 até A4), como o Excel mostra na fórmula. */
export function intervaloCelulas(de, ate) {
  const a = posicaoCelula(de);
  const b = posicaoCelula(ate);
  return `  <rect x="${a.x + 2}" y="${a.y + 2}" width="${b.x + b.largura - a.x - 4}" height="${b.y + b.altura - a.y - 4}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6 4"/>`;
}

/** Mouse com o botão certo pintado, sempre no mesmo canto das janelas. */
export const mouseCanto = (lado = 'esquerdo') => mouseBotao(548, 250, lado);

/** Teclas Ctrl + letra, com o nome da ação embaixo. */
export const atalho = (letra, rotulo) => svg([
  teclaGrande(215, 170, 'Ctrl', 190),
  texto(335, 184, '+', { tamanho: 40, negrito: true, centro: true }),
  teclaGrande(440, 170, letra, 130),
  texto(320, 300, rotulo, { tamanho: 32, negrito: true, centro: true }),
], FUNDO_TECLA);

/** Fileira de cima do teclado com uma tecla marcada (Esc, F1...F5). */
export function fileiraDeCima(marcada, rotulo) {
  const teclas = ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5'];
  const i = teclas.indexOf(marcada);
  return svg([
    ...teclas.map((nome, n) => teclaGrande(60 + n * 104, 170, nome, 88)),
    alvoRet(60 + i * 104 - 52, 120, 104, 108, 16),
    texto(320, 290, rotulo, { tamanho: 24, negrito: true, centro: true }),
  ], FUNDO_TECLA);
}

/** Janela do Office com as abas do programa. */
export const telaOffice = (app, titulo, abas, opcoes = {}) => janelaOffice(app, titulo, { abas, ...opcoes });
