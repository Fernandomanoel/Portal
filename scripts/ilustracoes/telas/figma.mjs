// Ilustrações das atividades de Figma (src/assets/atividades/figma/).
// Diagramas ilustrativos no estilo do Figma — não são capturas reais (o layout
// e os ícones mudam a cada versão). Cada chave vira <chave>.svg.
// Para uma tela nova, copie a mais parecida e rode `npm run ilustracoes -- <chave>`.
import { alvoRet, chamada, selo, svg, texto } from '../pecas.mjs';

export const destino = 'figma';

const AZ = '#0d99ff';
const ROXO = '#7c3aed';
const ESCURO = '#2c2c2c';
const LINHA = '#e5e5e5';
const CINZA = '#6b7280';

const ret = (x, y, w, h, fill, { rx = 0, stroke = null, sw = 1, extra = '' } = {}) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${extra}/>`;
const circ = (cx, cy, r, fill, stroke = null) => `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`;
const lin = (x1, y1, x2, y2, cor = '#9ca3af', sw = 1, extra = '') => `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="${sw}"${extra}/>`;
const seta = (x1, y1, x2, y2, cor = AZ, sw = 2) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (d) => `${(x2 - 8 * Math.cos(a - d)).toFixed(1)},${(y2 - 8 * Math.sin(a - d)).toFixed(1)}`;
  return `${lin(x1, y1, x2, y2, cor, sw)}\n  <polygon points="${x2},${y2} ${p(0.45)} ${p(-0.45)}" fill="${cor}"/>`;
};
const t = (x, y, s, o = {}) => texto(x, y, s, { tamanho: 9.5, ...o });

// ---------- Interface do Figma ----------

const FERRAMENTAS = ['mover', 'quadro', 'forma', 'caneta', 'texto', 'mao'];
function icone(nome, cx, cy) {
  const b = 'fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
  switch (nome) {
    case 'mover': return `  <path d="M${cx - 5} ${cy - 6} L${cx - 5} ${cy + 6} L${cx - 2} ${cy + 3} L${cx + 1} ${cy + 8} L${cx + 3} ${cy + 7} L${cx} ${cy + 2} L${cx + 5} ${cy + 2} Z" ${b}/>`;
    case 'quadro': return `  <path d="M${cx - 3} ${cy - 7} V${cy + 7} M${cx + 3} ${cy - 7} V${cy + 7} M${cx - 7} ${cy - 3} H${cx + 7} M${cx - 7} ${cy + 3} H${cx + 7}" ${b}/>`;
    case 'forma': return `  <rect x="${cx - 6}" y="${cy - 6}" width="12" height="12" rx="1" ${b}/>`;
    case 'caneta': return `  <path d="M${cx - 6} ${cy + 6} L${cx - 4} ${cy - 1} L${cx + 3} ${cy - 8} L${cx + 7} ${cy - 4} L${cx} ${cy + 3} Z" ${b}/>`;
    case 'texto': return `  <text x="${cx}" y="${cy + 5}" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">T</text>`;
    default: return `  <circle cx="${cx}" cy="${cy}" r="6" ${b}/><path d="M${cx - 2} ${cy + 1} L${cx} ${cy - 3} L${cx + 2} ${cy + 1}" ${b}/>`;
  }
}

function barra(ativa, { zoom = '100%' } = {}) {
  const p = [ret(20, 16, 600, 34, ESCURO, { rx: 10 }), ret(20, 34, 600, 16, ESCURO)];
  FERRAMENTAS.forEach((f, i) => {
    const cx = 44 + i * 30;
    if (f === ativa) p.push(ret(cx - 13, 21, 26, 24, AZ, { rx: 5 }));
    p.push(icone(f, cx, 33));
  });
  p.push(t(470, 37, zoom, { cor: '#d1d5db', tamanho: 10 }));
  p.push(ret(540, 23, 66, 20, AZ, { rx: 5 }), t(573, 37, 'Compartilhar', { cor: '#ffffff', tamanho: 9, negrito: true, centro: true }));
  return p.join('\n');
}

function iconeCamada(tipo, x, y) {
  const c = '#6b7280';
  if (tipo === 'quadro') return `  <path d="M${x + 3} ${y} V${y + 9} M${x + 6} ${y} V${y + 9} M${x} ${y + 3} H${x + 9} M${x} ${y + 6} H${x + 9}" stroke="${c}" stroke-width="1" fill="none"/>`;
  if (tipo === 'texto') return `  <text x="${x + 4.5}" y="${y + 9}" font-size="11" font-weight="700" fill="${c}" text-anchor="middle">T</text>`;
  if (tipo === 'componente') return `  <path d="M${x + 4.5} ${y - 1} L${x + 9.5} ${y + 4.5} L${x + 4.5} ${y + 10} L${x - 0.5} ${y + 4.5} Z" fill="${ROXO}"/>`;
  if (tipo === 'grupo') return `  <rect x="${x}" y="${y + 1}" width="10" height="8" rx="1.5" fill="none" stroke="${c}"/>`;
  if (tipo === 'auto') return `  <path d="M${x} ${y + 1} H${x + 9} M${x} ${y + 4.5} H${x + 9} M${x} ${y + 8} H${x + 9}" stroke="${c}" stroke-width="1.3"/>`;
  if (tipo === 'circulo') return `  <circle cx="${x + 5}" cy="${y + 4.5}" r="4.5" fill="none" stroke="${c}"/>`;
  return `  <rect x="${x}" y="${y}" width="9" height="9" fill="none" stroke="${c}"/>`;
}

function camadas(linhas, { titulo = 'Camadas', destaque = null } = {}) {
  const p = [ret(20, 50, 140, 334, '#ffffff'), lin(160, 50, 160, 384, LINHA), t(32, 66, 'Páginas', { cor: CINZA, tamanho: 9 }), t(78, 66, titulo, { negrito: true, tamanho: 10 }), lin(20, 74, 160, 74, LINHA)];
  linhas.forEach((l, i) => {
    const y = 80 + i * 20;
    const nivel = l.nivel ?? 0;
    if (l.ativa) p.push(ret(21, y, 138, 19, '#daebf7'));
    p.push(iconeCamada(l.tipo ?? 'forma', 30 + nivel * 12, y + 5));
    p.push(t(45 + nivel * 12, y + 13.5, l.rotulo, { tamanho: 9.5, cor: l.erro ? '#b91c1c' : '#1f2937', negrito: !!l.ativa }));
    if (l.destaque) p.push(alvoRet(21, y - 1, 138, 21, 5));
  });
  if (destaque) p.push(alvoRet(...destaque));
  return p.join('\n');
}

// secoes: [{ titulo, linhas: [ [rotulo, valor] | { cor, texto } | { chip } | { texto } , ... ] }]
function propriedades(secoes, { aba = 'Design', abas = ['Design', 'Protótipo'] } = {}) {
  const p = [ret(480, 50, 140, 334, '#ffffff'), lin(480, 50, 480, 384, LINHA)];
  abas.forEach((nome, i) => {
    const x = 492 + i * 56;
    p.push(t(x, 67, nome, { negrito: nome === aba, cor: nome === aba ? '#1f2937' : CINZA, tamanho: 9.5 }));
    if (nome === aba) p.push(lin(x, 72, x + nome.length * 5.6, 72, AZ, 2));
  });
  p.push(lin(480, 74, 620, 74, LINHA));
  let y = 86;
  for (const s of secoes) {
    p.push(t(492, y + 4, s.titulo, { negrito: true, tamanho: 9.5 }));
    y += 14;
    for (const l of s.linhas) {
      const alt = 24;
      if (Array.isArray(l)) {
        p.push(ret(492, y, 54, 16, '#f3f4f6', { rx: 3 }), t(498, y + 11.5, l[0], { cor: CINZA, tamanho: 8.5 }), t(516, y + 11.5, l[1], { tamanho: 9 }));
        if (l[2]) p.push(ret(552, y, 56, 16, '#f3f4f6', { rx: 3 }), t(558, y + 11.5, l[2][0], { cor: CINZA, tamanho: 8.5 }), t(574, y + 11.5, l[2][1], { tamanho: 9 }));
      } else if (l.cor) {
        p.push(ret(492, y, 14, 14, l.cor, { rx: 2, stroke: '#d1d5db' }), t(512, y + 11, l.texto ?? l.cor, { tamanho: 9 }));
      } else if (l.chip) {
        p.push(ret(492, y, 116, 16, l.ativo ? '#daebf7' : '#f3f4f6', { rx: 3, stroke: l.ativo ? AZ : null }), t(500, y + 11.5, l.chip, { tamanho: 9, negrito: !!l.ativo }));
      } else {
        p.push(t(492, y + 11, l.texto, { tamanho: 9, cor: CINZA }));
      }
      if (l.destaque) p.push(alvoRet(488, y - 3, 126, 22, 5));
      y += alt;
    }
    y += 8;
    p.push(lin(480, y - 6, 620, y - 6, LINHA));
  }
  return p.join('\n');
}

const TELA_CLIP = `  <defs><clipPath id="tela"><rect x="161" y="50" width="318" height="334"/></clipPath></defs>`;

function figma({ ferramenta = 'mover', itens = [], props = [], canvas = [], propsOpcoes = {}, camadasOpcoes = {}, zoom } = {}) {
  return [
    ret(20, 16, 600, 368, '#ffffff', { rx: 10, stroke: '#cbd5e1', extra: ' filter="url(#sombra)"' }),
    TELA_CLIP,
    ret(161, 50, 318, 334, LINHA),
    `  <g clip-path="url(#tela)">\n${canvas.join('\n')}\n  </g>`,
    camadas(itens, camadasOpcoes),
    propriedades(props, propsOpcoes),
    barra(ferramenta, { zoom }),
  ];
}

// ---------- Elementos de desenho ----------

function quadro(x, y, w, h, { nome = null, fundo = '#ffffff', sel = false, filhos = [] } = {}) {
  const p = [];
  if (nome) p.push(t(x, y - 5, nome, { tamanho: 8.5, cor: sel ? AZ : CINZA }));
  p.push(ret(x, y, w, h, fundo, { stroke: sel ? AZ : '#d1d5db', sw: sel ? 1.5 : 1 }));
  p.push(...filhos);
  if (sel) for (const [hx, hy] of [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]) p.push(ret(hx - 3, hy - 3, 6, 6, '#ffffff', { stroke: AZ }));
  return p.join('\n');
}

function botaoUI(x, y, w, h, rotulo, { cor = ROXO, corTexto = '#ffffff', rx = 8, borda = null, tamanho = 10 } = {}) {
  return `${ret(x, y, w, h, cor, { rx, stroke: borda })}\n${t(x + w / 2, y + h / 2 + tamanho * 0.36, rotulo, { cor: corTexto, tamanho, negrito: true, centro: true })}`;
}

/** Tela de aplicativo simples; `nivel` controla o quanto já está desenhado (wireframe usa cinza). */
function telaApp(x, y, w, h, { wire = false, titulo = 'Olá, Ana', botao = 'Continuar', cards = 2 } = {}) {
  const c = wire ? '#d1d5db' : ROXO;
  const p = [ret(x, y, w, h, '#ffffff', { stroke: '#d1d5db' })];
  p.push(ret(x, y, w, 30, wire ? '#e5e7eb' : c));
  if (wire) p.push(lin(x + 8, y + 8, x + w - 8, y + 22, '#9ca3af'), lin(x + 8, y + 22, x + w - 8, y + 8, '#9ca3af'));
  else p.push(t(x + 10, y + 19, titulo, { cor: '#ffffff', negrito: true, tamanho: 10 }));
  for (let i = 0; i < cards; i++) {
    const cy = y + 40 + i * 52;
    p.push(ret(x + 8, cy, w - 16, 44, wire ? '#f3f4f6' : '#f5f3ff', { rx: wire ? 0 : 8, stroke: wire ? '#d1d5db' : '#ddd6fe' }));
    p.push(wire ? ret(x + 14, cy + 8, 28, 28, '#d1d5db') : circ(x + 28, cy + 22, 14, '#c4b5fd'));
    p.push(ret(x + 50, cy + 12, w - 80, 6, wire ? '#d1d5db' : '#a78bfa', { rx: 3 }), ret(x + 50, cy + 25, (w - 80) * 0.6, 6, wire ? '#e5e7eb' : '#ddd6fe', { rx: 3 }));
  }
  p.push(wire ? ret(x + 8, y + h - 38, w - 16, 28, '#e5e7eb', { stroke: '#9ca3af' }) : botaoUI(x + 8, y + h - 38, w - 16, 28, botao));
  if (wire) p.push(t(x + w / 2, y + h - 20, botao, { cor: CINZA, centro: true, tamanho: 9 }));
  return p.join('\n');
}

export const telas = {};

// =================== Atividade 1 — Conhecendo o Figma ===================

telas['interface-panorama'] = svg([
  ...figma({
    ferramenta: 'mover',
    itens: [
      { rotulo: 'Tela inicial', tipo: 'quadro' },
      { rotulo: 'Cabeçalho', nivel: 1 },
      { rotulo: 'Título', nivel: 1, tipo: 'texto' },
      { rotulo: 'Botão', nivel: 1, tipo: 'componente', ativa: true },
    ],
    props: [
      { titulo: 'Posição', linhas: [['X', '24', ['Y', '312']]] },
      { titulo: 'Tamanho', linhas: [['L', '342', ['A', '48']]] },
      { titulo: 'Preenchimento', linhas: [{ cor: ROXO, texto: '7C3AED' }] },
    ],
    canvas: [quadro(255, 80, 130, 280, { nome: 'Tela inicial', filhos: [telaApp(255, 80, 130, 280)] }), ret(262, 321, 116, 28, 'none', { stroke: AZ, sw: 1.5 })],
  }),
  selo(250, 33, 1), selo(152, 100, 2), selo(178, 66, 3), selo(472, 100, 4), selo(528, 33, 5),
], '#eef2f7');

telas['ux-ui-processo'] = (() => {
  const etapas = [
    ['1', 'Entender', 'quem usa e', 'o problema'],
    ['2', 'Esboçar', 'wireframes', 'em preto e branco'],
    ['3', 'Desenhar', 'cores, textos', 'e componentes (UI)'],
    ['4', 'Prototipar', 'ligar as telas', 'e simular o uso'],
    ['5', 'Testar', 'observar e', 'melhorar (UX)'],
  ];
  const p = [texto(320, 34, 'O processo de design de interface', { tamanho: 15, negrito: true, centro: true })];
  etapas.forEach(([n, nome, l1, l2], i) => {
    const x = 26 + i * 120;
    p.push(ret(x, 90, 104, 150, '#ffffff', { rx: 12, stroke: '#cbd5e1', extra: ' filter="url(#sombra)"' }));
    p.push(circ(x + 52, 120, 18, i === 2 ? ROXO : AZ), texto(x + 52, 126, n, { tamanho: 16, cor: '#ffffff', negrito: true, centro: true }));
    p.push(texto(x + 52, 164, nome, { tamanho: 13, negrito: true, centro: true }), texto(x + 52, 188, l1, { tamanho: 10.5, cor: CINZA, centro: true }), texto(x + 52, 204, l2, { tamanho: 10.5, cor: CINZA, centro: true }));
    if (i < 4) p.push(seta(x + 106, 165, x + 118, 165, '#94a3b8', 2));
  });
  p.push(`  <path d="M570 252 V290 H78 V252" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>`, seta(78, 262, 78, 250, '#94a3b8', 2));
  p.push(texto(320, 312, 'O resultado do teste volta para o começo: design é um ciclo, não uma linha reta.', { tamanho: 11.5, cor: CINZA, centro: true }));
  p.push(ret(40, 338, 250, 36, '#dbeafe', { rx: 8 }), texto(165, 360, 'UX = como é usar (facilidade)', { tamanho: 11.5, negrito: true, cor: '#1e3a8a', centro: true }));
  p.push(ret(350, 338, 250, 36, '#ede9fe', { rx: 8 }), texto(475, 360, 'UI = como parece (visual)', { tamanho: 11.5, negrito: true, cor: '#4c1d95', centro: true }));
  return svg(p, '#eef2f7');
})();

telas['wireframe-vs-design'] = svg([
  texto(160, 36, 'Wireframe', { tamanho: 14, negrito: true, centro: true }),
  texto(480, 36, 'Design final (alta fidelidade)', { tamanho: 14, negrito: true, centro: true }),
  texto(160, 54, 'estrutura: o que fica onde', { tamanho: 10.5, cor: CINZA, centro: true }),
  texto(480, 54, 'cor, tipografia e imagem', { tamanho: 10.5, cor: CINZA, centro: true }),
  telaApp(90, 70, 140, 290, { wire: true, titulo: '', botao: 'Botão' }),
  telaApp(410, 70, 140, 290, { titulo: 'Olá, Ana', botao: 'Continuar' }),
  texto(320, 220, '→', { tamanho: 32, cor: AZ, centro: true }),
  texto(320, 244, 'mesma', { tamanho: 10.5, cor: CINZA, centro: true }),
  texto(320, 258, 'estrutura', { tamanho: 10.5, cor: CINZA, centro: true }),
], '#eef2f7');

telas['atalhos-teclado'] = (() => {
  const atalhos = [['V', 'Mover', 'mover'], ['F', 'Quadro', 'quadro'], ['R', 'Retângulo', 'forma'], ['T', 'Texto', 'texto'], ['P', 'Caneta', 'caneta'], ['H', 'Mão', 'mao']];
  const p = [texto(320, 34, 'Atalhos de uma letra: ferramentas', { tamanho: 15, negrito: true, centro: true })];
  atalhos.forEach(([k, nome, ic], i) => {
    const x = 40 + (i % 3) * 195;
    const y = 62 + Math.floor(i / 3) * 112;
    p.push(ret(x, y, 175, 96, '#ffffff', { rx: 12, stroke: '#cbd5e1' }));
    p.push(ret(x + 14, y + 16, 44, 44, '#f3f4f6', { rx: 8, stroke: '#9ca3af', sw: 2 }), texto(x + 36, y + 47, k, { tamanho: 24, negrito: true, centro: true }));
    p.push(ret(x + 100, y + 18, 44, 40, ESCURO, { rx: 8 }), icone(ic, x + 122, y + 38).replace('stroke-width="1.5"', 'stroke-width="2"'));
    p.push(texto(x + 87, y + 84, nome, { tamanho: 12, negrito: true, centro: true }));
  });
  p.push(ret(40, 292, 560, 80, '#fff7ed', { rx: 12, stroke: '#fdba74' }));
  p.push(texto(60, 318, 'Também vale decorar', { tamanho: 12, negrito: true, cor: '#7c2d12' }));
  p.push(texto(60, 340, 'Ctrl + D  duplica a seleção     Ctrl + G  agrupa     Ctrl + Alt + K  cria componente', { tamanho: 11, cor: '#7c2d12' }));
  p.push(texto(60, 358, 'Shift + 1  mostra tudo na tela     Espaço + arrastar  move a área de trabalho', { tamanho: 11, cor: '#7c2d12' }));
  return svg(p, '#eef2f7');
})();

// =================== Atividade 2 — Quadros, formas e camadas ===================

telas['escolher-tamanho-quadro'] = svg([
  ...figma({
    ferramenta: 'quadro',
    itens: [],
    props: [
      {
        titulo: 'Quadro',
        linhas: [
          { texto: 'Celular' },
          { chip: 'iPhone 14      390 × 844', ativo: true, destaque: true },
          { chip: 'Android Large  360 × 800' },
          { texto: 'Tablet' },
          { chip: 'iPad mini      744 × 1133' },
          { texto: 'Área de trabalho' },
          { chip: 'Desktop        1440 × 1024' },
        ],
      },
    ],
    canvas: [quadro(270, 90, 100, 216, { nome: 'iPhone 14', sel: true }), t(320, 328, '390 × 844', { centro: true, cor: AZ, tamanho: 10, negrito: true })],
  }),
  chamada(176, 330, 292, 'Antes de arrastar no canvas', ['com a ferramenta Quadro (F) ativa, escolha o', 'tamanho na lista à direita'], { escura: false }),
], '#eef2f7');

telas['formas-no-quadro'] = svg([
  ...figma({
    ferramenta: 'forma',
    itens: [
      { rotulo: 'iPhone 14', tipo: 'quadro' },
      { rotulo: 'Rectangle 1', nivel: 1, ativa: true },
      { rotulo: 'Ellipse 1', nivel: 1, tipo: 'circulo' },
      { rotulo: 'Texto', nivel: 1, tipo: 'texto' },
    ],
    props: [
      { titulo: 'Tamanho', linhas: [['L', '390', ['A', '120']]] },
      { titulo: 'Raio do canto', linhas: [['R', '0']] },
      { titulo: 'Preenchimento', linhas: [{ cor: ROXO, texto: '7C3AED' }] },
    ],
    canvas: [
      quadro(250, 80, 140, 280, { nome: 'iPhone 14', filhos: [ret(250, 80, 140, 60, ROXO), circ(280, 110, 14, '#ffffff'), t(304, 114, 'Meu perfil', { cor: '#ffffff', negrito: true, tamanho: 10 })] }),
      ret(250, 80, 140, 60, 'none', { stroke: AZ, sw: 1.5 }),
    ],
  }),
  chamada(176, 330, 292, 'R = retângulo · O = elipse · T = texto', ['clique e arraste dentro do quadro: a forma', 'nasce já dentro dele (na camada do quadro)'], { escura: false }),
], '#eef2f7');

telas['camadas-nomeadas'] = svg([
  texto(160, 34, 'Antes: nomes padrão', { tamanho: 13, negrito: true, centro: true }),
  texto(480, 34, 'Depois: nomes que explicam', { tamanho: 13, negrito: true, centro: true }),
  ret(30, 50, 260, 250, '#ffffff', { rx: 10, stroke: '#cbd5e1' }),
  ...['Frame 1', 'Rectangle 12', 'Rectangle 13', 'Ellipse 4', 'Text', 'Text'].map((n, i) => `${iconeCamada(i === 0 ? 'quadro' : i === 3 ? 'circulo' : i > 3 ? 'texto' : 'forma', 48 + (i ? 14 : 0), 70 + i * 34)}\n${texto(66 + (i ? 14 : 0), 80 + i * 34, n, { tamanho: 12, cor: '#b91c1c' })}`),
  ret(350, 50, 260, 250, '#ffffff', { rx: 10, stroke: '#cbd5e1' }),
  ...['Tela de perfil', 'Cabeçalho', 'Fundo do cartão', 'Foto do usuário', 'Nome', 'Cargo'].map((n, i) => `${iconeCamada(i === 0 ? 'quadro' : i === 3 ? 'circulo' : i > 3 ? 'texto' : 'forma', 368 + (i ? 14 : 0), 70 + i * 34)}\n${texto(386 + (i ? 14 : 0), 80 + i * 34, n, { tamanho: 12, cor: '#15803d', negrito: true })}`),
  texto(320, 176, '→', { tamanho: 30, cor: AZ, centro: true }),
  ret(30, 320, 580, 54, '#fff7ed', { rx: 10, stroke: '#fdba74' }),
  texto(320, 343, 'Dê dois cliques no nome da camada (ou Ctrl + R) e digite.', { tamanho: 12.5, negrito: true, cor: '#7c2d12', centro: true }),
  texto(320, 362, 'Quem abrir o arquivo depois — inclusive você — entende tudo sem abrir camada por camada.', { tamanho: 11, cor: '#7c2d12', centro: true }),
], '#eef2f7');

telas['alinhar-e-distribuir'] = (() => {
  const barraAlinha = (x, y, destaque = -1) => {
    const p = [ret(x, y, 150, 24, '#ffffff', { rx: 6, stroke: '#cbd5e1' })];
    for (let i = 0; i < 6; i++) {
      const cx = x + 14 + i * 24;
      if (i === destaque) p.push(ret(cx - 10, y + 2, 20, 20, '#daebf7', { rx: 4, stroke: AZ }));
      if (i < 3) p.push(lin(cx - (i === 0 ? 5 : 0), y + 5, cx - (i === 0 ? 5 : 0), y + 19, CINZA, 1.5), ret(cx - 4 + (i === 2 ? 4 : 0), y + 8 + i * 2, 8, 4, CINZA));
      else p.push(lin(cx - 6, y + 12, cx + 6, y + 12, CINZA, 1.5), ret(cx - 3, y + 6 + (i - 3) * 2, 6, 5, CINZA));
    }
    return p.join('\n');
  };
  return svg([
    texto(160, 34, 'Desalinhados', { tamanho: 13, negrito: true, centro: true }),
    texto(480, 34, 'Alinhados e distribuídos', { tamanho: 13, negrito: true, centro: true }),
    ret(30, 50, 260, 230, '#e5e5e5', { rx: 10 }),
    ret(60, 70, 90, 40, ROXO, { rx: 6 }), ret(86, 130, 90, 40, ROXO, { rx: 6 }), ret(48, 200, 90, 40, ROXO, { rx: 6 }),
    ret(350, 50, 260, 230, '#e5e5e5', { rx: 10 }),
    ret(405, 70, 150, 40, ROXO, { rx: 6 }), ret(405, 130, 150, 40, ROXO, { rx: 6 }), ret(405, 190, 150, 40, ROXO, { rx: 6 }),
    ret(401, 66, 158, 168, 'none', { stroke: AZ, sw: 1.2, extra: ' stroke-dasharray="4 3"' }),
    barraAlinha(245, 296, 0),
    texto(320, 346, 'Selecione os 3 objetos e clique em «Alinhar à esquerda» (destacado) e depois em', { tamanho: 11.5, centro: true }),
    texto(320, 364, '«Distribuir espaçamento vertical»: a barra fica no alto do painel Design.', { tamanho: 11.5, centro: true }),
  ], '#eef2f7');
})();

// =================== Atividade 3 — Auto Layout e grades ===================

telas['botao-auto-layout'] = (() => {
  const botoes = [['OK', 70], ['Entrar', 94], ['Criar minha conta', 170]];
  const p = [texto(320, 34, 'Um botão com Auto Layout cresce com o texto', { tamanho: 14, negrito: true, centro: true })];
  let y = 66;
  botoes.forEach(([rotulo, w]) => {
    const x = 60;
    p.push(ret(x, y, w, 40, ROXO, { rx: 8 }), texto(x + w / 2, y + 25, rotulo, { tamanho: 12.5, cor: '#ffffff', negrito: true, centro: true }));
    p.push(ret(x, y, 16, 40, 'none', { stroke: '#ec4899', extra: ' stroke-dasharray="3 2"' }), ret(x + w - 16, y, 16, 40, 'none', { stroke: '#ec4899', extra: ' stroke-dasharray="3 2"' }));
    p.push(texto(x + w + 14, y + 25, `${w - 32 >= 0 ? w : 0} px de largura`, { tamanho: 10.5, cor: CINZA }));
    y += 64;
  });
  p.push(ret(380, 66, 230, 168, '#ffffff', { rx: 10, stroke: '#cbd5e1' }));
  p.push(texto(396, 90, 'Painel Auto Layout', { tamanho: 11.5, negrito: true }));
  p.push(texto(396, 114, 'Direção        →  horizontal', { tamanho: 10.5, cor: CINZA }));
  p.push(texto(396, 134, 'Preenchimento  16  (lados)', { tamanho: 10.5, cor: '#be185d', negrito: true }));
  p.push(texto(396, 154, 'Preenchimento  10  (cima/baixo)', { tamanho: 10.5, cor: '#be185d', negrito: true }));
  p.push(texto(396, 174, 'Espaçamento   8   (entre itens)', { tamanho: 10.5, cor: CINZA }));
  p.push(texto(396, 194, 'Tamanho  Hug contents', { tamanho: 10.5, cor: CINZA }));
  p.push(texto(396, 216, 'Atalho: Shift + A', { tamanho: 9, cor: CINZA }));
  p.push(ret(30, 270, 580, 100, '#fff7ed', { rx: 10, stroke: '#fdba74' }));
  p.push(texto(320, 296, 'As linhas rosa tracejadas são o preenchimento (padding): 16 px nos lados.', { tamanho: 12, cor: '#7c2d12', negrito: true, centro: true }));
  p.push(texto(320, 318, 'Mudou o texto? O botão se ajusta sozinho — sem arrastar alça, sem recalcular.', { tamanho: 11.5, cor: '#7c2d12', centro: true }));
  p.push(texto(320, 340, 'Hug contents = "abraçar o conteúdo".  Fill container = "preencher o espaço do pai".', { tamanho: 11.5, cor: '#7c2d12', centro: true }));
  return svg(p, '#eef2f7');
})();

telas['auto-layout-painel'] = svg([
  ...figma({
    ferramenta: 'mover',
    itens: [
      { rotulo: 'Lista de tarefas', tipo: 'auto', ativa: true },
      { rotulo: 'Tarefa 1', nivel: 1, tipo: 'auto' },
      { rotulo: 'Tarefa 2', nivel: 1, tipo: 'auto' },
      { rotulo: 'Tarefa 3', nivel: 1, tipo: 'auto' },
    ],
    props: [
      { titulo: 'Auto Layout', linhas: [{ chip: 'Direção:  ↓ vertical', ativo: true, destaque: true }, ['Gap', '12', ['Pad', '16']], { chip: 'Largura: Hug contents' }] },
      { titulo: 'Preenchimento', linhas: [{ cor: '#ffffff', texto: 'FFFFFF' }] },
    ],
    canvas: [
      quadro(235, 90, 170, 200, { nome: 'Lista de tarefas', sel: true, filhos: [0, 1, 2].map((i) => ret(251, 106 + i * 56, 138, 44, '#f5f3ff', { rx: 8, stroke: '#ddd6fe' })).concat([0, 1, 2].map((i) => t(265, 132 + i * 56, `Tarefa ${i + 1}`, { negrito: true }))) }),
      ...[0, 1].map((i) => ret(251, 150 + i * 56, 138, 12, '#fce7f3', { extra: ' opacity="0.9"' })),
      t(320, 318, 'espaço de 12 entre os itens', { centro: true, cor: '#be185d', negrito: true }),
    ],
  }),
], '#eef2f7');

telas['lista-auto-layout'] = (() => {
  const lista = (x, qtd, titulo, novo = false) => {
    const p = [texto(x + 95, 34, titulo, { tamanho: 12.5, negrito: true, centro: true })];
    const h = 20 + qtd * 50;
    p.push(ret(x, 50, 190, h, '#ffffff', { rx: 10, stroke: '#cbd5e1' }));
    for (let i = 0; i < qtd; i++) {
      const eNovo = novo && i === qtd - 1;
      p.push(ret(x + 12, 62 + i * 50, 166, 40, eNovo ? '#dcfce7' : '#f5f3ff', { rx: 8, stroke: eNovo ? '#16a34a' : '#ddd6fe' }), circ(x + 30, 82 + i * 50, 8, eNovo ? '#16a34a' : '#c4b5fd'), texto(x + 46, 86 + i * 50, eNovo ? 'Nova tarefa' : `Tarefa ${i + 1}`, { tamanho: 11, negrito: true }));
    }
    return p.join('\n');
  };
  return svg([
    lista(60, 3, 'Com 3 itens'),
    lista(390, 4, 'Com 4 itens: o quadro cresce', true),
    texto(320, 130, '+ 1 item', { tamanho: 12, cor: '#16a34a', negrito: true, centro: true }),
    seta(270, 150, 370, 150, '#16a34a', 3),
    ret(30, 290, 580, 84, '#fff7ed', { rx: 10, stroke: '#fdba74' }),
    texto(320, 316, 'Ctrl + D duplica um item e o Auto Layout acomoda o novo no lugar certo.', { tamanho: 12, negrito: true, cor: '#7c2d12', centro: true }),
    texto(320, 338, 'Sem Auto Layout, você arrastaria cada item de baixo para abrir espaço.', { tamanho: 11.5, cor: '#7c2d12', centro: true }),
    texto(320, 358, 'Com ele, apagar ou acrescentar item nunca bagunça o desenho.', { tamanho: 11.5, cor: '#7c2d12', centro: true }),
  ], '#eef2f7');
})();

telas['grade-de-colunas'] = (() => {
  const x0 = 235;
  const colunas = [0, 1, 2, 3].map((i) => ret(x0 + 12 + i * 37, 95, 25, 265, '#fecaca', { extra: ' opacity="0.55"' }));
  return svg([
    ...figma({
      ferramenta: 'quadro',
      itens: [{ rotulo: 'Catálogo', tipo: 'quadro', ativa: true }, { rotulo: 'Cartão 1', nivel: 1 }, { rotulo: 'Cartão 2', nivel: 1 }],
      props: [
        { titulo: 'Grades de layout', linhas: [{ chip: '▦  Colunas', ativo: true, destaque: true }, ['Qtd', '4', ['Mrg', '16']], ['Gap', '16']] },
        { titulo: 'Tamanho', linhas: [['L', '180', ['A', '300']]] },
      ],
      canvas: [
        quadro(x0, 80, 180, 290, { nome: 'Catálogo', sel: true, filhos: [ret(x0, 80, 180, 24, ROXO), t(x0 + 10, 96, 'Loja', { cor: '#fff', negrito: true })] }),
        ...colunas,
        ret(x0 + 12, 115, 62, 70, '#ddd6fe', { rx: 6 }), ret(x0 + 86, 115, 62, 70, '#ddd6fe', { rx: 6 }),
        ret(x0 + 12, 197, 62, 70, '#ddd6fe', { rx: 6 }), ret(x0 + 86, 197, 62, 70, '#ddd6fe', { rx: 6 }),
        t(x0 + 90, 345, 'Ctrl + Shift + 4 liga/desliga a grade', { centro: true, tamanho: 8.5, cor: CINZA }),
      ],
    }),
  ], '#eef2f7');
})();

// =================== Atividade 4 — Componentes e estilos ===================

telas['criar-componente'] = svg([
  ...figma({
    ferramenta: 'mover',
    itens: [
      { rotulo: 'Botão primário', tipo: 'componente', ativa: true },
      { rotulo: 'Rótulo', nivel: 1, tipo: 'texto' },
    ],
    props: [
      { titulo: 'Componente', linhas: [{ texto: 'Principal (main component)' }, { chip: 'Botão primário', ativo: true }] },
      { titulo: 'Preenchimento', linhas: [{ cor: ROXO, texto: '7C3AED' }] },
    ],
    canvas: [
      botaoUI(255, 190, 130, 40, 'Entrar'),
      ret(251, 186, 138, 48, 'none', { stroke: ROXO, sw: 2 }),
      `  <path d="M251 186 v-13 h96 v13" fill="${ROXO}"/>`,
      t(256, 183, '◆ Botão primário', { cor: '#ffffff', tamanho: 8.5, negrito: true }),
    ],
  }),
  chamada(176, 330, 292, 'Selecione o botão e tecle Ctrl + Alt + K', ['a camada ganha o losango roxo e a moldura roxa:', 'é o componente principal'], { escura: false }),
], '#eef2f7');

telas['instancias'] = (() => {
  const p = [texto(320, 32, 'Mudou o principal? As cópias acompanham', { tamanho: 14, negrito: true, centro: true })];
  p.push(texto(160, 66, 'Antes: tudo roxo', { tamanho: 11.5, cor: CINZA, centro: true }), texto(480, 66, 'Depois: principal ficou verde', { tamanho: 11.5, cor: CINZA, centro: true }));
  for (const [x, cor] of [[40, ROXO], [360, '#16a34a']]) {
    p.push(ret(x, 80, 240, 190, '#e5e5e5', { rx: 10 }));
    p.push(ret(x + 20, 96, 120, 34, 'none', { stroke: ROXO, sw: 2 }), `  <path d="M${x + 20} 96 l-3 -8 h50 v8" fill="${ROXO}"/>`);
    p.push(botaoUI(x + 22, 98, 116, 30, 'Principal', { cor }), texto(x + 156, 118, '◆ componente', { tamanho: 10, cor: ROXO, negrito: true }));
    ['Cópia 1', 'Cópia 2', 'Cópia 3'].forEach((n, i) => {
      p.push(botaoUI(x + 22, 150 + i * 36, 116, 28, n, { cor: cor === ROXO ? ROXO : '#16a34a' }), texto(x + 156, 168 + i * 36, '◇ instância', { tamanho: 10, cor: CINZA }));
    });
  }
  p.push(texto(320, 176, '→', { tamanho: 32, cor: AZ, centro: true }));
  p.push(ret(30, 290, 580, 84, '#fff7ed', { rx: 10, stroke: '#fdba74' }));
  p.push(texto(320, 316, 'Instância = cópia ligada ao principal (losango vazado ◇). Principal = losango cheio ◆.', { tamanho: 11.5, negrito: true, cor: '#7c2d12', centro: true }));
  p.push(texto(320, 338, 'Alterações no principal valem para todas as instâncias.', { tamanho: 11.5, cor: '#7c2d12', centro: true }));
  p.push(texto(320, 358, 'Na instância você ainda pode trocar só o texto — sem quebrar o vínculo.', { tamanho: 11.5, cor: '#7c2d12', centro: true }));
  return svg(p, '#eef2f7');
})();

telas['variantes'] = (() => {
  const estados = ['Padrão', 'Hover (mouse em cima)', 'Desabilitado'];
  const tams = [['Pequeno', 28, 90], ['Grande', 40, 130]];
  const p = [texto(320, 32, 'Variantes: um componente, várias versões', { tamanho: 14, negrito: true, centro: true })];
  p.push(ret(40, 50, 560, 210, '#ffffff', { rx: 10, stroke: ROXO, sw: 2, extra: ' stroke-dasharray="6 4"' }));
  estados.forEach((e, i) => p.push(texto(175 + i * 175, 78, e, { tamanho: 11, negrito: true, centro: true, cor: CINZA })));
  tams.forEach(([n, h, w], r) => {
    const y = 110 + r * 70;
    p.push(texto(54, y + 24, n, { tamanho: 11, negrito: true, cor: CINZA }));
    [ROXO, '#5b21b6', '#d1d5db'].forEach((cor, i) => {
      const cx = 175 + i * 175 - w / 2 + 20;
      p.push(botaoUI(cx - 20 + (i === 0 ? 0 : 0), y, w, h, 'Entrar', { cor, corTexto: i === 2 ? '#9ca3af' : '#ffffff', tamanho: r ? 12 : 10 }));
    });
  });
  p.push(ret(40, 280, 270, 92, '#eff6ff', { rx: 10, stroke: '#93c5fd' }));
  p.push(texto(54, 304, 'Propriedades da variante', { tamanho: 11.5, negrito: true, cor: '#1e3a8a' }));
  p.push(texto(54, 324, 'Estado   = Padrão | Hover | Desabilitado', { tamanho: 10.5, cor: '#1e3a8a' }));
  p.push(texto(54, 342, 'Tamanho  = Pequeno | Grande', { tamanho: 10.5, cor: '#1e3a8a' }));
  p.push(ret(330, 280, 270, 92, '#fff7ed', { rx: 10, stroke: '#fdba74' }));
  p.push(texto(344, 304, 'Para usar', { tamanho: 11.5, negrito: true, cor: '#7c2d12' }));
  p.push(texto(344, 324, 'Arraste uma instância e escolha', { tamanho: 10.5, cor: '#7c2d12' }));
  p.push(texto(344, 342, 'Estado e Tamanho no painel Design.', { tamanho: 10.5, cor: '#7c2d12' }));
  return svg(p, '#eef2f7');
})();

telas['estilos-cor-texto'] = svg([
  ...figma({
    ferramenta: 'mover',
    itens: [{ rotulo: 'Cartão de curso', tipo: 'quadro' }, { rotulo: 'Título do curso', nivel: 1, tipo: 'texto', ativa: true }, { rotulo: 'Descrição', nivel: 1, tipo: 'texto' }],
    props: [
      { titulo: 'Estilos de cor', linhas: [{ cor: ROXO, texto: 'Marca / Primária' }, { cor: '#16a34a', texto: 'Marca / Sucesso' }, { cor: '#111827', texto: 'Texto / Principal' }] },
      { titulo: 'Estilos de texto', linhas: [{ chip: 'Título / Grande   24 Bold', ativo: true, destaque: true }, { chip: 'Corpo / Normal   14 Regular' }] },
    ],
    canvas: [
      quadro(240, 100, 160, 210, { nome: 'Cartão de curso', filhos: [ret(240, 100, 160, 80, ROXO)] }),
      `  <text x="256" y="214" font-size="19" font-weight="700" fill="#111827">Figma básico</text>`,
      t(256, 236, 'Aprenda interfaces do zero', { cor: CINZA }),
      t(256, 252, 'em 5 aulas práticas.', { cor: CINZA }),
      botaoUI(256, 270, 128, 28, 'Começar'),
    ],
  }),
], '#eef2f7');

// =================== Atividade 5 — Protótipo e colaboração ===================

telas['prototipo-ligacao'] = (() => {
  const telasMini = [['Login', 'Entrar'], ['Início', 'Ver curso'], ['Curso', 'Voltar']];
  const p = [texto(320, 30, 'Três telas ligadas por setas azuis (fluxo)', { tamanho: 14, negrito: true, centro: true })];
  telasMini.forEach(([nome, bt], i) => {
    const x = 40 + i * 205;
    p.push(texto(x + 60, 68, nome, { tamanho: 11.5, negrito: true, cor: CINZA, centro: true }));
    p.push(telaApp(x, 76, 120, 250, { titulo: nome, botao: bt, cards: 2 }));
    p.push(circ(x + 128, 76 + 250 - 24, 6, AZ, '#ffffff'));
  });
  p.push(seta(170, 302, 238, 302, AZ, 3), seta(375, 302, 443, 302, AZ, 3));
  p.push(texto(205, 296, 'ao clicar', { tamanho: 9, cor: AZ, negrito: true, centro: true }), texto(410, 296, 'ao clicar', { tamanho: 9, cor: AZ, negrito: true, centro: true }));
  p.push(ret(30, 344, 580, 34, '#eff6ff', { rx: 8, stroke: '#93c5fd' }), texto(320, 366, 'No modo Protótipo, arraste a bolinha do botão até a tela de destino.', { tamanho: 11.5, negrito: true, cor: '#1e3a8a', centro: true }));
  return svg(p, '#eef2f7');
})();

telas['prototipo-interacao'] = svg([
  ...figma({
    ferramenta: 'mover',
    itens: [{ rotulo: 'Login', tipo: 'quadro' }, { rotulo: 'Botão Entrar', nivel: 1, tipo: 'componente', ativa: true }, { rotulo: 'Início', tipo: 'quadro' }],
    props: [
      {
        titulo: 'Interação',
        linhas: [
          { chip: 'Gatilho:     Ao clicar', ativo: true },
          { chip: 'Ação:        Navegar para', ativo: true },
          { chip: 'Destino:     Início', ativo: true, destaque: true },
          { chip: 'Animação:    Smart animate' },
          { chip: 'Curva:       Ease out  ·  300 ms' },
        ],
      },
    ],
    propsOpcoes: { aba: 'Protótipo' },
    canvas: [
      quadro(190, 90, 110, 250, { nome: 'Login', filhos: [telaApp(190, 90, 110, 250, { titulo: 'Login', botao: 'Entrar', cards: 1 })] }),
      quadro(350, 90, 110, 250, { nome: 'Início', filhos: [telaApp(350, 90, 110, 250, { titulo: 'Início', botao: 'Ver curso', cards: 2 })] }),
      seta(292, 298, 350, 298, AZ, 3), circ(292, 298, 5, AZ, '#ffffff'),
    ],
  }),
], '#eef2f7');

telas['modo-apresentacao'] = (() => {
  const p = [ret(0, 0, 640, 400, '#1f2937')];
  p.push(ret(220, 28, 200, 344, '#111827', { rx: 28, stroke: '#4b5563', sw: 3 }));
  p.push(telaApp(236, 52, 168, 296, { titulo: 'Início', botao: 'Ver curso', cards: 3 }));
  p.push(ret(300, 36, 40, 6, '#374151', { rx: 3 }));
  p.push(ret(30, 30, 160, 70, '#374151', { rx: 10 }), texto(110, 56, 'Fluxo 1', { tamanho: 12, negrito: true, cor: '#f9fafb', centro: true }), texto(110, 76, 'Login → Início → Curso', { tamanho: 10, cor: '#d1d5db', centro: true }));
  p.push(ret(450, 30, 160, 40, AZ, { rx: 10 }), `  <polygon points="470,42 470,58 484,50" fill="#ffffff"/>`, texto(536, 55, 'Apresentar', { tamanho: 12, negrito: true, cor: '#ffffff', centro: true }));
  p.push(ret(450, 90, 160, 120, '#374151', { rx: 10 }));
  p.push(texto(530, 114, 'Durante o teste', { tamanho: 11.5, negrito: true, cor: '#f9fafb', centro: true }));
  p.push(texto(530, 136, 'Clique nos botões', { tamanho: 10.5, cor: '#d1d5db', centro: true }), texto(530, 154, 'como um usuário faria', { tamanho: 10.5, cor: '#d1d5db', centro: true }));
  p.push(texto(530, 180, 'R  reinicia o fluxo', { tamanho: 10.5, cor: '#fbbf24', centro: true }), texto(530, 198, 'Esc  volta ao arquivo', { tamanho: 10.5, cor: '#fbbf24', centro: true }));
  p.push(texto(110, 360, 'Atalho: Ctrl + Alt + Enter', { tamanho: 10.5, cor: '#d1d5db', centro: true }));
  return svg(p, '#1f2937');
})();

telas['comentarios-e-compartilhar'] = (() => {
  const pin = (x, y, n, cor = '#f97316') => `  <path d="M${x} ${y} a11 11 0 1 1 0 0.01 M${x - 8} ${y + 8} L${x - 10} ${y + 17} L${x - 2} ${y + 11}" fill="${cor}"/>\n  <text x="${x}" y="${y + 4}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${n}</text>`;
  return svg([
    ...figma({
      ferramenta: 'mover',
      itens: [{ rotulo: 'Tela inicial', tipo: 'quadro' }, { rotulo: 'Botão', nivel: 1, tipo: 'componente' }],
      props: [{ titulo: 'Comentários', linhas: [{ texto: 'Ana: o botão está pequeno' }, { texto: 'Bia: trocar a cor do título?' }] }],
      canvas: [quadro(220, 80, 130, 280, { nome: 'Tela inicial', filhos: [telaApp(220, 80, 130, 280)] }), pin(360, 318, 1), pin(240, 112, 2, '#16a34a'),
        ret(366, 200, 104, 52, '#ffffff', { rx: 8, stroke: '#cbd5e1' }), t(374, 218, 'Ana', { negrito: true }), t(374, 232, 'Aumentar o botão', { tamanho: 8.5 }), t(374, 244, 'e a cor.', { tamanho: 8.5 })],
    }),
    ret(150, 84, 340, 214, '#ffffff', { rx: 12, stroke: '#cbd5e1', extra: ' filter="url(#sombra)"' }),
    texto(170, 112, 'Compartilhar "App de cursos"', { tamanho: 13, negrito: true }),
    ret(170, 126, 220, 26, '#f3f4f6', { rx: 5 }), t(180, 143, 'figma.com/design/…  (link)', { cor: CINZA }),
    botaoUI(400, 126, 70, 26, 'Copiar link', { cor: AZ, tamanho: 9 }),
    texto(170, 180, 'Quem tem o link pode', { tamanho: 10.5, cor: CINZA }),
    ret(170, 188, 150, 26, '#ffffff', { rx: 5, stroke: '#cbd5e1' }), t(180, 205, 'Ver (somente leitura)  ▾', { negrito: true }),
    ret(330, 188, 140, 26, '#ffffff', { rx: 5, stroke: '#cbd5e1' }), t(340, 205, 'Editar  ▾', { cor: CINZA }),
    texto(170, 240, 'Convide por e-mail: ana@escola.com — Pode editar', { tamanho: 10.5, cor: '#1f2937' }),
    texto(170, 260, 'Dica: use "Ver" para o cliente e "Editar" só para a equipe.', { tamanho: 10, cor: CINZA }),
    alvoRet(166, 184, 308, 34, 6),
  ], '#eef2f7');
})();
