// Ilustrações das atividades de Inteligência Emocional (src/assets/atividades/inteligencia-emocional/).
// Esquemas simples (emoções, perfis, técnicas), não fotos. Cada chave vira <chave>.svg.
import { pessoa, svg, texto } from '../pecas.mjs';

export const destino = 'inteligencia-emocional';

const ROXO = '#7c3aed';
const ROXO_CLARO = '#ede9fe';
const CINZA = '#6b7280';
const LINHA = '#cbd5e1';
const FUNDO = '#eef2f7';

const ret = (x, y, w, h, fill, { rx = 0, stroke = null, sw = 1, extra = '' } = {}) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${extra}/>`;
const circ = (cx, cy, r, fill, stroke = null, sw = 1) => `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}/>`;
const lin = (x1, y1, x2, y2, cor = LINHA, sw = 1) => `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="${sw}"/>`;
const t = (x, y, s, o = {}) => texto(x, y, s, { tamanho: 11, ...o });
const titulo = (s) => texto(320, 32, s, { tamanho: 15, negrito: true, centro: true });
const cartao = (x, y, w, h, fill = '#ffffff', stroke = LINHA) => ret(x, y, w, h, fill, { rx: 12, stroke });
const seta = (x1, y1, x2, y2, cor = '#94a3b8', sw = 2) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (d) => `${(x2 - 8 * Math.cos(a - d)).toFixed(1)},${(y2 - 8 * Math.sin(a - d)).toFixed(1)}`;
  return `${lin(x1, y1, x2, y2, cor, sw)}\n  <polygon points="${x2},${y2} ${p(0.45)} ${p(-0.45)}" fill="${cor}"/>`;
};
/** Rosto simples: `humor` muda boca e sobrancelhas. */
function rosto(cx, cy, r, cor, humor) {
  const p = [circ(cx, cy, r, cor, '#1f2937', 2)];
  const olho = (dx) => circ(cx + dx, cy - r * 0.18, r * 0.09, '#1f2937');
  p.push(olho(-r * 0.35), olho(r * 0.35));
  const b = (d) => `  <path d="${d}" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round"/>`;
  const y = cy + r * 0.35;
  const w = r * 0.42;
  if (humor === 'alegria') p.push(b(`M${cx - w} ${y - 4} Q${cx} ${y + 12} ${cx + w} ${y - 4}`));
  if (humor === 'tristeza') p.push(b(`M${cx - w} ${y + 6} Q${cx} ${y - 8} ${cx + w} ${y + 6}`));
  if (humor === 'raiva') p.push(b(`M${cx - w} ${y + 3} H${cx + w}`), b(`M${cx - r * 0.55} ${cy - r * 0.5} L${cx - r * 0.15} ${cy - r * 0.32} M${cx + r * 0.55} ${cy - r * 0.5} L${cx + r * 0.15} ${cy - r * 0.32}`));
  if (humor === 'medo') p.push(`  <ellipse cx="${cx}" cy="${y + 2}" rx="${r * 0.18}" ry="${r * 0.22}" fill="#1f2937"/>`, b(`M${cx - r * 0.55} ${cy - r * 0.4} Q${cx - r * 0.35} ${cy - r * 0.6} ${cx - r * 0.15} ${cy - r * 0.45} M${cx + r * 0.55} ${cy - r * 0.4} Q${cx + r * 0.35} ${cy - r * 0.6} ${cx + r * 0.15} ${cy - r * 0.45}`));
  if (humor === 'nojo') p.push(b(`M${cx - w} ${y + 2} Q${cx - w / 2} ${y - 6} ${cx} ${y + 2} Q${cx + w / 2} ${y + 8} ${cx + w} ${y}`));
  if (humor === 'surpresa') p.push(circ(cx, y + 2, r * 0.2, '#1f2937'));
  if (humor === 'neutro') p.push(b(`M${cx - w} ${y + 2} H${cx + w}`));
  return p.join('\n');
}
/** Bateria de energia social: `nivel` de 0 a 1. */
function bateria(x, y, nivel, cor) {
  return [ret(x, y, 54, 24, '#ffffff', { rx: 5, stroke: '#1f2937', sw: 2 }), ret(x + 54, y + 7, 5, 10, '#1f2937', { rx: 1 }), ret(x + 4, y + 4, 46 * nivel, 16, cor, { rx: 3 })].join('\n');
}
/** Etapas numeradas lado a lado, com o texto encolhendo para caber. */
function etapas(lista, { y = 70, h = 150, larg = 104, cor = ROXO } = {}) {
  const p = [];
  const passo = (640 - 2 * 26 - larg) / (lista.length - 1);
  lista.forEach(([nome, ...linhas], i) => {
    const x = 26 + i * passo;
    const cabe = (s, max, peso) => Math.min(max, (larg - 12) / (s.length * peso));
    p.push(cartao(x, y, larg, h), circ(x + larg / 2, y + 30, 16, cor), texto(x + larg / 2, y + 36, String(i + 1), { tamanho: 15, cor: '#ffffff', negrito: true, centro: true }));
    p.push(texto(x + larg / 2, y + 68, nome, { tamanho: cabe(nome, 12.5, 0.62), negrito: true, centro: true }));
    linhas.forEach((l, k) => p.push(texto(x + larg / 2, y + 90 + k * 15, l, { tamanho: cabe(l, 10, 0.54), cor: CINZA, centro: true })));
    if (i < lista.length - 1) p.push(seta(x + larg + 2, y + h / 2, x + passo - 2, y + h / 2));
  });
  return p;
}

export const telas = {};

// ===== 1. Conhecendo as emoções =====

const EMOCOES = [
  ['alegria', 'Alegria', '#fde68a', 'aproxima e', 'reforça o bom'],
  ['tristeza', 'Tristeza', '#bfdbfe', 'pede pausa,', 'cuidado e apoio'],
  ['raiva', 'Raiva', '#fecaca', 'avisa que algo', 'foi injusto'],
  ['medo', 'Medo', '#ddd6fe', 'protege de', 'um perigo'],
  ['nojo', 'Nojo', '#bbf7d0', 'afasta do que', 'faz mal'],
  ['surpresa', 'Surpresa', '#fed7aa', 'chama a atenção', 'para o novo'],
];

telas['emocoes-basicas'] = (() => {
  const p = [titulo('Seis emoções básicas e para que cada uma serve')];
  EMOCOES.forEach(([h, nome, cor, l1, l2], i) => {
    const x = 26 + (i % 3) * 200;
    const y = 52 + Math.floor(i / 3) * 160;
    p.push(cartao(x, y, 188, 148), rosto(x + 48, y + 74, 32, cor, h));
    p.push(t(x + 92, y + 56, nome, { tamanho: 14, negrito: true }), t(x + 92, y + 82, l1, { tamanho: 10.5, cor: CINZA }), t(x + 92, y + 98, l2, { tamanho: 10.5, cor: CINZA }));
  });
  p.push(texto(320, 384, 'Nenhuma emoção é "ruim": todas trazem uma informação. O problema é a reação sem pensar.', { tamanho: 11, negrito: true, centro: true, cor: '#4c1d95' }));
  return svg(p, FUNDO);
})();

telas['emocao-no-corpo'] = (() => {
  const p = [titulo('As emoções aparecem primeiro no corpo')];
  p.push(cartao(26, 48, 588, 330));
  p.push(pessoa(320, 360, 280, '#c4b5fd'));
  const marcas = [
    [320, 112, 'Raiva', 'rosto quente, mandíbula travada', 60, 92, 'fim'],
    [304, 180, 'Medo e ansiedade', 'coração acelerado, respiração curta', 60, 172, 'fim'],
    [336, 196, 'Tristeza', 'peito pesado, nó na garganta', 400, 150, 'ini'],
    [320, 240, 'Ansiedade', '"frio na barriga", estômago apertado', 400, 230, 'ini'],
    [282, 300, 'Raiva e estresse', 'mãos fechadas, ombros tensos', 60, 296, 'fim'],
  ];
  marcas.forEach(([cx, cy, nome, sinal, x, y, lado]) => {
    p.push(circ(cx, cy, 7, '#f97316', '#ffffff', 2));
    const xl = lado === 'fim' ? x + 196 : x;
    p.push(lin(cx, cy, xl, y - 4, '#f97316', 1.5));
    p.push(t(x, y - 6, nome, { negrito: true, tamanho: 11.5 }), t(x, y + 10, sinal, { tamanho: 10, cor: CINZA }));
  });
  return svg(p, FUNDO);
})();

telas['escala-de-intensidade'] = (() => {
  const linhas = [
    ['Raiva', ['incômodo', 'irritação', 'raiva', 'fúria'], ['#fee2e2', '#fecaca', '#f87171', '#dc2626']],
    ['Medo', ['receio', 'preocupação', 'medo', 'pânico'], ['#ede9fe', '#ddd6fe', '#a78bfa', '#6d28d9']],
    ['Tristeza', ['chateação', 'desânimo', 'tristeza', 'desespero'], ['#dbeafe', '#bfdbfe', '#60a5fa', '#1d4ed8']],
    ['Alegria', ['tranquilidade', 'contentamento', 'alegria', 'euforia'], ['#fef9c3', '#fde68a', '#fbbf24', '#d97706']],
  ];
  const p = [titulo('Cada emoção tem intensidades diferentes')];
  p.push(texto(380, 60, 'fraca', { tamanho: 10.5, cor: CINZA }), seta(420, 56, 560, 56, '#94a3b8', 2), texto(568, 60, 'forte', { tamanho: 10.5, cor: CINZA }));
  linhas.forEach(([nome, niveis, cores], i) => {
    const y = 76 + i * 66;
    p.push(t(30, y + 32, nome, { negrito: true, tamanho: 13 }));
    niveis.forEach((n, k) => {
      const x = 120 + k * 126;
      p.push(ret(x, y + 10, 118, 40, cores[k], { rx: 8 }), texto(x + 59, y + 35, n, { tamanho: 11.5, negrito: true, centro: true, cor: k >= 2 ? '#ffffff' : '#1f2937' }));
    });
  });
  p.push(ret(26, 344, 588, 40, ROXO_CLARO, { rx: 10, stroke: '#c4b5fd' }), texto(320, 369, 'Dar o nome certo ("estou irritado", e não "estou com ódio") já baixa a intensidade.', { tamanho: 11.5, negrito: true, centro: true, cor: '#4c1d95' }));
  return svg(p, FUNDO);
})();

// ===== 2. Autoconhecimento: perfis =====

const PERFIS = [
  ['Extrovertido', '#fb923c', 1, 'recarrega com', 'pessoas e movimento', ['pensa falando', 'gosta de grupo', 'reage na hora']],
  ['Ambivertido', '#a78bfa', 0.6, 'alterna: depende', 'do dia e do lugar', ['adapta o ritmo', 'ouve e fala', 'mistura os dois']],
  ['Introvertido', '#38bdf8', 0.3, 'recarrega com', 'silêncio e tempo só', ['pensa antes', 'prefere poucos', 'reage depois']],
];
telas['perfis-de-energia'] = (() => {
  const p = [titulo('Três jeitos de lidar com a energia social')];
  PERFIS.forEach(([nome, cor, nivel, l1, l2, traços], i) => {
    const x = 26 + i * 200;
    p.push(cartao(x, 48, 188, 330));
    p.push(pessoa(x + 94, 196, 120, cor));
    p.push(texto(x + 94, 222, nome, { tamanho: 14, negrito: true, centro: true }));
    p.push(bateria(x + 64, 234, nivel, cor));
    p.push(texto(x + 94, 280, l1, { tamanho: 10, cor: CINZA, centro: true }), texto(x + 94, 294, l2, { tamanho: 10, cor: CINZA, centro: true }));
    traços.forEach((tr, k) => p.push(texto(x + 94, 320 + k * 16, tr, { tamanho: 10.5, centro: true })));
  });
  return svg(p, FUNDO);
})();

telas['diario-emocional'] = (() => {
  const cols = ['Situação', 'Emoção', '0 a 10', 'O que pensei', 'O que fiz', 'Faria diferente'];
  const larg = [118, 80, 54, 116, 104, 116];
  const linhas = [
    ['Chefe criticou na reunião', 'Raiva', '7', '"Ele quer me expor"', 'Fiquei calado', 'Pedir conversa a sós'],
    ['Apresentação amanhã', 'Medo', '6', '"Vou travar"', 'Ensaiei 2 vezes', 'Ensaiar com alguém'],
    ['Amiga não respondeu', 'Tristeza', '4', '"Ela se afastou"', 'Mandei outra msg', 'Perguntar se está bem'],
  ];
  const p = [titulo('Diário emocional: um registro por situação')];
  p.push(cartao(26, 48, 588, 250));
  let x = 36;
  cols.forEach((c, i) => {
    p.push(ret(x, 60, larg[i] - 2, 30, ROXO, { rx: 4 }), texto(x + (larg[i] - 2) / 2, 80, c, { tamanho: 10.5, negrito: true, centro: true, cor: '#ffffff' }));
    linhas.forEach((l, k) => {
      p.push(ret(x, 96 + k * 64, larg[i] - 2, 58, k % 2 ? '#f8fafc' : '#ffffff', { rx: 4, stroke: LINHA }));
      const palavras = l[i].split(' ');
      const meio = Math.ceil(palavras.length / 2);
      const quebra = l[i].length * 5.4 > larg[i] - 10 ? [palavras.slice(0, meio).join(' '), palavras.slice(meio).join(' ')] : [l[i]];
      quebra.forEach((q, j) => p.push(texto(x + (larg[i] - 2) / 2, 120 + k * 64 + j * 14 - (quebra.length - 1) * 7, q, { tamanho: 10, centro: true, negrito: i === 2 })));
    });
    x += larg[i];
  });
  p.push(ret(26, 312, 588, 66, ROXO_CLARO, { rx: 12, stroke: '#c4b5fd' }));
  p.push(texto(320, 338, 'Depois de uma ou duas semanas, procure o padrão: que situações se repetem?', { tamanho: 11.5, negrito: true, centro: true, cor: '#4c1d95' }), texto(320, 358, 'Esses são os seus gatilhos — e é neles que vale preparar uma reação melhor.', { tamanho: 11, centro: true, cor: '#4c1d95' }));
  return svg(p, FUNDO);
})();

// ===== 3. Lidando com cada emoção =====

telas['tecnica-pare'] = (() => {
  const p = [titulo('PARE: quatro segundos entre sentir e reagir')];
  p.push(...etapas([['Pare', 'interrompa o que', 'ia dizer ou fazer'], ['Respire', 'devagar, soltando', 'mais longo do que puxou'], ['Observe', 'o que sinto?', 'o que pensei?'], ['Escolha', 'a reação que', 'ajuda, e não a do impulso']], { y: 56, h: 160, larg: 132 }));
  p.push(cartao(26, 236, 288, 140, '#fee2e2', '#fca5a5'), cartao(326, 236, 288, 140, '#dcfce7', '#86efac'));
  p.push(t(42, 262, 'Reação no impulso', { negrito: true, tamanho: 12.5, cor: '#7f1d1d' }), t(42, 286, 'Colega: "Você errou de novo."', { tamanho: 10.5, cor: '#7f1d1d' }), t(42, 306, 'Você: "Errei nada, você que não', { tamanho: 10.5, cor: '#7f1d1d' }), t(42, 322, 'sabe explicar!"', { tamanho: 10.5, cor: '#7f1d1d' }), t(42, 350, 'Resultado: briga e nada resolvido.', { tamanho: 10.5, negrito: true, cor: '#7f1d1d' }));
  p.push(t(342, 262, 'Reação escolhida', { negrito: true, tamanho: 12.5, cor: '#14532d' }), t(342, 286, 'Colega: "Você errou de novo."', { tamanho: 10.5, cor: '#14532d' }), t(342, 306, 'Você: "Me mostra onde foi? Quero', { tamanho: 10.5, cor: '#14532d' }), t(342, 322, 'entender para não repetir."', { tamanho: 10.5, cor: '#14532d' }), t(342, 350, 'Resultado: o problema é resolvido.', { tamanho: 10.5, negrito: true, cor: '#14532d' }));
  return svg(p, FUNDO);
})();

telas['respiracao-quadrada'] = (() => {
  const p = [titulo('Respiração quadrada: 4 tempos em cada lado')];
  p.push(cartao(26, 48, 588, 330));
  p.push(ret(140, 100, 220, 220, ROXO_CLARO, { rx: 10, stroke: ROXO, sw: 3 }));
  p.push(seta(150, 96, 350, 96, ROXO, 3), seta(364, 110, 364, 310, ROXO, 3), seta(350, 324, 150, 324, ROXO, 3), seta(136, 310, 136, 110, ROXO, 3));
  p.push(texto(250, 86, 'Puxe o ar — 4', { tamanho: 12.5, negrito: true, centro: true }));
  p.push(`  <text x="384" y="214" font-size="12.5" font-weight="700" fill="#1f2937" transform="rotate(90 384 214)" text-anchor="middle">Segure — 4</text>`);
  p.push(texto(250, 346, 'Solte o ar — 4', { tamanho: 12.5, negrito: true, centro: true }));
  p.push(`  <text x="116" y="214" font-size="12.5" font-weight="700" fill="#1f2937" transform="rotate(-90 116 214)" text-anchor="middle">Segure — 4</text>`);
  p.push(texto(250, 206, 'Repita', { tamanho: 16, negrito: true, centro: true, cor: '#4c1d95' }), texto(250, 228, '4 vezes', { tamanho: 16, negrito: true, centro: true, cor: '#4c1d95' }));
  p.push(t(420, 120, 'Quando usar', { negrito: true, tamanho: 12.5 }));
  ['antes de uma prova', 'antes de falar em público', 'depois de uma discussão', 'quando o coração acelera'].forEach((s, i) => p.push(circ(426, 146 + i * 26, 4, ROXO), t(438, 150 + i * 26, s, { tamanho: 10.5 })));
  p.push(t(420, 278, 'Conte devagar, por dentro.', { tamanho: 10.5, cor: CINZA }), t(420, 296, 'Se ficar tonto, encurte para 3.', { tamanho: 10.5, cor: CINZA }));
  return svg(p, FUNDO);
})();

// ===== 4. Situações com outras pessoas =====

telas['comunicacao-nao-violenta'] = (() => {
  const p = [titulo('Falar sem atacar: os quatro passos da CNV')];
  p.push(...etapas([['Observação', 'o fato, sem', 'julgar: "Você chegou', 'às 9h30 três vezes"'], ['Sentimento', 'o que sinto:', '"fico preocupado"'], ['Necessidade', 'o que preciso:', '"preciso abrir a loja', 'no horário"'], ['Pedido', 'claro e possível:', '"pode me avisar', 'quando atrasar?"']], { y: 56, h: 180, larg: 132 }));
  p.push(cartao(26, 256, 588, 120, '#fff7ed', '#fdba74'));
  p.push(t(44, 282, 'Troque o rótulo pelo fato', { negrito: true, tamanho: 12.5, cor: '#7c2d12' }));
  p.push(t(44, 308, 'Em vez de: "Você é irresponsável."', { tamanho: 11, cor: '#7c2d12' }), t(44, 330, 'Diga: "Você chegou depois das 9h três vezes esta semana e eu fiquei', { tamanho: 11, cor: '#7c2d12' }), t(44, 348, 'preocupado com a abertura. Pode me avisar quando for atrasar?"', { tamanho: 11, cor: '#7c2d12' }));
  return svg(p, FUNDO);
})();

telas['mesma-situacao-tres-perfis'] = (() => {
  const p = [titulo('Mesma situação, três reações: crítica em público')];
  const dados = [
    ['Extrovertido', '#fb923c', 'tende a', 'responder na hora,', 'em voz alta', 'Ajuda: contar até 4', 'e falar depois'],
    ['Ambivertido', '#a78bfa', 'tende a', 'oscilar: às vezes', 'fala, às vezes cala', 'Ajuda: escolher', 'antes como agir'],
    ['Introvertido', '#38bdf8', 'tende a', 'calar e remoer', 'a crítica por dias', 'Ajuda: pedir conversa', 'a sós, por escrito'],
  ];
  dados.forEach(([nome, cor, a, b, c, d, e], i) => {
    const x = 26 + i * 200;
    p.push(cartao(x, 48, 188, 330));
    p.push(pessoa(x + 94, 170, 100, cor), texto(x + 94, 194, nome, { tamanho: 13.5, negrito: true, centro: true }));
    p.push(texto(x + 94, 222, a, { tamanho: 10, cor: CINZA, centro: true }), texto(x + 94, 240, b, { tamanho: 11, centro: true }), texto(x + 94, 256, c, { tamanho: 11, centro: true }));
    p.push(ret(x + 12, 280, 164, 70, '#dcfce7', { rx: 8, stroke: '#86efac' }), texto(x + 94, 308, d, { tamanho: 10.5, negrito: true, centro: true, cor: '#14532d' }), texto(x + 94, 326, e, { tamanho: 10.5, negrito: true, centro: true, cor: '#14532d' }));
  });
  return svg(p, FUNDO);
})();

// ===== 5. Simulado =====

telas['semaforo-da-reacao'] = (() => {
  const p = [titulo('O semáforo da reação')];
  p.push(ret(70, 50, 120, 320, '#1f2937', { rx: 20 }));
  [['#ef4444', 110], ['#f59e0b', 210], ['#22c55e', 310]].forEach(([c, y]) => p.push(circ(130, y, 38, c)));
  const linhas = [
    ['Vermelho: pare', 'Percebeu o corpo esquentar? Não responda ainda.', 'Respire, conte até 4, afaste-se se precisar.'],
    ['Amarelo: pense', 'O que estou sentindo? O que a outra pessoa sente?', 'O que eu quero que aconteça depois desta conversa?'],
    ['Verde: aja', 'Fale com fatos, em primeira pessoa, com um pedido claro.', '"Eu fiquei... Preciso de... Você pode...?"'],
  ];
  linhas.forEach(([n, a, b], i) => {
    const y = 72 + i * 100;
    p.push(cartao(220, y, 394, 78), t(236, y + 26, n, { negrito: true, tamanho: 13 }), t(236, y + 46, a, { tamanho: 10.5, cor: CINZA }), t(236, y + 62, b, { tamanho: 10.5, cor: CINZA }));
  });
  return svg(p, FUNDO);
})();

// ===== 6. Locais e ambientes =====

telas['ambientes-e-tom'] = (() => {
  const amb = [
    ['Trabalho', 'cordial e objetivo', 'críticas a sós; fatos, não pessoas', 0.35],
    ['Sala de aula', 'respeitoso', 'dúvida é bem-vinda; ninguém é exposto', 0.45],
    ['Família', 'afetivo e franco', 'velhas mágoas voltam: escolha o momento', 0.75],
    ['Atendimento ao público', 'calmo e acolhedor', 'o cliente irritado não é inimigo', 0.25],
    ['Redes sociais', 'como se fosse ao vivo', 'o texto não tem tom: releia antes', 0.55],
  ];
  const p = [titulo('Cada lugar pede um tom')];
  p.push(cartao(26, 48, 588, 330));
  p.push(t(44, 74, 'Ambiente', { negrito: true, tamanho: 11, cor: CINZA }), t(214, 74, 'Tom esperado', { negrito: true, tamanho: 11, cor: CINZA }), t(364, 74, 'Cuidado principal', { negrito: true, tamanho: 11, cor: CINZA }));
  amb.forEach(([n, tom, cuidado], i) => {
    const y = 88 + i * 56;
    p.push(ret(38, y, 564, 48, i % 2 ? '#f8fafc' : '#ffffff', { rx: 8, stroke: LINHA }));
    p.push(t(50, y + 29, n, { negrito: true, tamanho: 12 }), t(214, y + 29, tom, { tamanho: 11 }), t(364, y + 29, cuidado, { tamanho: 10, cor: CINZA }));
  });
  return svg(p, FUNDO);
})();

telas['mediar-conflito'] = (() => {
  const p = [titulo('Mediar um conflito entre duas pessoas')];
  p.push(pessoa(110, 190, 110, '#fb923c'), pessoa(530, 190, 110, '#38bdf8'), pessoa(320, 200, 120, '#a78bfa'));
  p.push(texto(320, 214, 'mediador', { tamanho: 10.5, negrito: true, centro: true, cor: '#4c1d95' }));
  p.push(seta(260, 130, 170, 130, '#94a3b8', 2), seta(380, 130, 470, 130, '#94a3b8', 2));
  p.push(texto(110, 214, 'Parte A', { tamanho: 10.5, negrito: true, centro: true }), texto(530, 214, 'Parte B', { tamanho: 10.5, negrito: true, centro: true }));
  p.push(...etapas([['Separe e acalme', 'local reservado,', 'sem plateia'], ['Ouça cada um', 'sem interromper', 'nem tomar partido'], ['Resuma os fatos', 'sem culpados:', '"o que aconteceu foi..."'], ['Busquem juntos', 'o que cada um', 'pode fazer'], ['Combine e volte', 'o acordo e quando', 'vão conversar de novo']], { y: 232, h: 146, larg: 108 }));
  return svg(p, FUNDO);
})();
