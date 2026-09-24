// Passo a Passo — Inteligência Artificial e Segurança na Era Digital (situações, não cliques em programa).
import {
  POS_PONTINHOS, alvo, alvoRet, celular, certo, etiqueta, janelaApp, janelaConversa, pessoa, proibido, robo, svg, texto,
} from '../pecas.mjs';

export const destino = 'passo-a-passo';
export const telas = {};

const FUNDO_IA = '#f5f3ff';
const FUNDO_SEG = '#eef2f7';

// ---------------- IA: boa pergunta ----------------

telas['ia-bp-clara'] = svg([janelaConversa([
  { de: 'pessoa', linhas: ['Qual é a capital do Brasil?'], marca: 'certo' },
  { de: 'ia', linhas: ['A capital do Brasil é Brasília.'] },
])]);
telas['ia-bp-uma-coisa'] = svg([janelaConversa([
  { de: 'pessoa', linhas: ['Qual é a capital do Brasil, quantos', 'estados tem e qual é o maior rio?'], marca: 'erro' },
  { de: 'pessoa', linhas: ['Qual é a capital do Brasil?'], marca: 'certo' },
])]);
telas['ia-bp-palavras-faceis'] = svg([janelaConversa([
  { de: 'pessoa', linhas: ['Me explique o que é chuva', 'com palavras fáceis.'] },
  { de: 'ia', linhas: ['Chuva é a água que cai das nuvens.'] },
])]);
telas['ia-bp-de-novo'] = svg([janelaConversa([
  { de: 'ia', linhas: ['A precipitação ocorre quando o vapor', 'se condensa na atmosfera...'] },
  { de: 'pessoa', linhas: ['Explique de outro jeito.'], marca: 'certo' },
])]);

// ---------------- IA: imagens feitas pelo computador ----------------

function gato(cx, cy, { pernas = 4 } = {}) {
  const patas = Array.from({ length: pernas }, (_, i) => {
    const x = cx - 30 + (i * 60) / Math.max(1, pernas - 1);
    return `<rect x="${x - 5}" y="${cy + 30}" width="10" height="26" rx="4" fill="#f59e0b" stroke="#1f2937" stroke-width="2"/>`;
  }).join('');
  return `  <g>${patas}
    <ellipse cx="${cx}" cy="${cy + 16}" rx="48" ry="30" fill="#fbbf24" stroke="#1f2937" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy - 30}" r="30" fill="#fbbf24" stroke="#1f2937" stroke-width="2.5"/>
    <path d="M${cx - 26} ${cy - 44} l6 -26 l16 16 z M${cx + 26} ${cy - 44} l-6 -26 l-16 16 z" fill="#fbbf24" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="${cx - 30}" y="${cy - 82}" width="60" height="12" rx="3" fill="#2563eb"/><rect x="${cx - 18}" y="${cy - 110}" width="36" height="30" rx="4" fill="#2563eb"/>
    <circle cx="${cx - 10}" cy="${cy - 32}" r="4" fill="#1f2937"/><circle cx="${cx + 10}" cy="${cy - 32}" r="4" fill="#1f2937"/>
    <path d="M${cx - 6} ${cy - 20} q6 6 12 0" fill="none" stroke="#1f2937" stroke-width="2"/>
  </g>`;
}
const janelaImagem = (...trechos) => svg([
  janelaApp('Criador de imagens com IA', '#7c4dd6', { fundo: '#fafafa' }),
  '  <rect x="40" y="62" width="560" height="40" rx="20" fill="#ffffff" stroke="#cbd5e1"/>',
  texto(60, 88, 'Um gato de chapéu azul', { tamanho: 15 }),
  '  <rect x="200" y="118" width="240" height="250" rx="10" fill="#e0f2fe" stroke="#94a3b8"/>',
  ...trechos,
]);
telas['ia-im-gato'] = janelaImagem(gato(320, 270));
telas['ia-im-nao-real'] = janelaImagem(gato(320, 270), etiqueta(436, 160, 'não é foto'));
telas['ia-im-erro'] = janelaImagem(gato(320, 270, { pernas: 5 }), etiqueta(450, 300, '5 pernas: erro'));
telas['ia-im-foto-pessoa'] = svg([
  '  <rect x="210" y="70" width="220" height="260" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>',
  '  <rect x="226" y="86" width="188" height="200" fill="#dbeafe"/>',
  pessoa(320, 286, 170, '#f472b6'),
  texto(320, 312, 'foto de outra pessoa', { tamanho: 14, centro: true }),
  proibido(430, 80, 30),
], FUNDO_IA);

// ---------------- IA: fotos e vídeos falsos ----------------

const cachorroVoando = `  <rect x="170" y="60" width="300" height="240" rx="10" fill="#bae6fd" stroke="#94a3b8" stroke-width="3"/>
  <ellipse cx="250" cy="250" rx="60" ry="18" fill="#ffffff"/><ellipse cx="400" cy="240" rx="50" ry="16" fill="#ffffff"/>
  <path d="M290 150 q-40 -40 -60 -10 q30 0 50 30 z M350 150 q40 -40 60 -10 q-30 0 -50 30 z" fill="#ffffff" stroke="#1f2937" stroke-width="2"/>
  <ellipse cx="320" cy="170" rx="44" ry="26" fill="#a16207" stroke="#1f2937" stroke-width="2.5"/>
  <circle cx="366" cy="150" r="20" fill="#a16207" stroke="#1f2937" stroke-width="2.5"/><circle cx="372" cy="146" r="3" fill="#1f2937"/>`;
telas['ia-fs-cachorro'] = svg([cachorroVoando, texto(320, 330, 'cachorro voando', { tamanho: 18, negrito: true, centro: true })], FUNDO_IA);
telas['ia-fs-desconfie'] = svg([cachorroVoando, etiqueta(320, 316, 'isso aconteceu mesmo?', { centro: true })], FUNDO_IA);
telas['ia-fs-nao-compartilhe'] = svg([celular('Grupo da turma', '12 pessoas', [['Olha isso:', 'cachorro voando!']], { respostaProibida: true })], FUNDO_IA);

// ---------------- IA: aprender, não copiar ----------------

const caderno = (x, y, { escrito = true } = {}) => `  <rect x="${x}" y="${y}" width="150" height="110" rx="6" fill="#ffffff" stroke="#1f2937" stroke-width="2.5"/>
  <g stroke="#93c5fd" stroke-width="2">${[24, 44, 64, 84].map((d) => `<line x1="${x + 12}" y1="${y + d}" x2="${x + 138}" y2="${y + d}"/>`).join('')}</g>
  ${escrito ? `<path d="M${x + 16} ${y + 20} q10 -8 20 0 t20 0 t20 0 M${x + 16} ${y + 40} q10 -8 20 0 t20 0" fill="none" stroke="#1f2937" stroke-width="2"/>` : ''}`;
telas['ia-ap-entender'] = svg([janelaConversa([
  { de: 'pessoa', linhas: ['O que é fração?'] },
  { de: 'ia', linhas: ['Fração é um número que mostra partes.', '1/2 quer dizer uma parte de duas.'] },
])]);
telas['ia-ap-voce-faz'] = svg([pessoa(210, 340, 170, '#60a5fa'), caderno(320, 200), certo(500, 190, 30)], FUNDO_IA);
telas['ia-ap-nao-copie'] = svg([
  '  <rect x="60" y="90" width="230" height="130" rx="12" fill="#ffffff" stroke="#d4d4d8"/>',
  texto(76, 124, 'Resposta da IA:', { tamanho: 14, negrito: true, cor: '#5b21b6' }),
  texto(76, 152, 'Fração é um número', { tamanho: 14 }), texto(76, 174, 'que mostra partes...', { tamanho: 14 }),
  '  <path d="M300 160 H 360" stroke="#ea580c" stroke-width="4" stroke-dasharray="8 6"/><path d="M360 150 l16 10 l-16 10 z" fill="#ea580c"/>',
  caderno(390, 110), texto(465, 250, 'copiado', { tamanho: 16, negrito: true, centro: true }),
  proibido(330, 110, 26),
], FUNDO_IA);
telas['ia-ap-suas-palavras'] = svg([pessoa(180, 340, 170, '#60a5fa'), caderno(270, 200), robo(500, 180, 0.8), certo(420, 150, 26)], FUNDO_IA);

// ---------------- Segurança: senha ----------------

const login = (senha, ...trechos) => svg([
  '  <g filter="url(#sombra)"><rect x="170" y="60" width="300" height="280" rx="14" fill="#ffffff" stroke="#cbd5e1"/></g>',
  '  <path d="M300 104 v-14 a20 20 0 0 1 40 0 v14" fill="none" stroke="#1f2937" stroke-width="6"/><rect x="288" y="104" width="64" height="46" rx="8" fill="#fbbf24" stroke="#1f2937" stroke-width="2.5"/>',
  texto(196, 184, 'Usuário', { tamanho: 13, negrito: true }),
  '  <rect x="196" y="192" width="248" height="30" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>', texto(206, 213, 'aluno.ana', { tamanho: 14 }),
  texto(196, 244, 'Senha', { tamanho: 13, negrito: true }),
  '  <rect x="196" y="252" width="248" height="30" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>', texto(206, 273, senha, { tamanho: 16 }),
  '  <rect x="196" y="298" width="248" height="30" rx="6" fill="#0067c0"/>', texto(320, 318, 'Entrar', { tamanho: 14, negrito: true, cor: '#ffffff', centro: true }),
  ...trechos,
], FUNDO_SEG);
telas['seg-sh-login'] = login('••••••••', etiqueta(454, 254, 'senha'));
telas['seg-sh-nao-conte'] = svg([
  pessoa(120, 330, 150, '#60a5fa'), pessoa(230, 330, 150, '#f472b6'), proibido(175, 110, 26),
  pessoa(430, 330, 230, '#34d399'), pessoa(530, 330, 150, '#60a5fa'), certo(480, 90, 26),
  '  <line x1="320" y1="60" x2="320" y2="340" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 8"/>',
], FUNDO_SEG);
telas['seg-sh-boa'] = svg([
  '  <rect x="120" y="110" width="300" height="50" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="3"/>', texto(140, 143, 'Gato7Azul3', { tamanho: 22 }), certo(470, 135, 26),
  '  <rect x="120" y="220" width="300" height="50" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="3"/>', texto(140, 253, '123456', { tamanho: 22 }), proibido(470, 245, 26),
], FUNDO_SEG);
telas['seg-sh-nao-nome'] = svg([
  '  <rect x="120" y="110" width="300" height="50" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="3"/>', texto(140, 143, 'Ana', { tamanho: 22 }), proibido(470, 135, 26),
  '  <rect x="120" y="220" width="300" height="50" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="3"/>', texto(140, 253, '15032016', { tamanho: 22 }), proibido(470, 245, 26),
  texto(270, 196, 'nome', { tamanho: 15, cor: '#6b7280', centro: true }), texto(270, 306, 'aniversário', { tamanho: 15, cor: '#6b7280', centro: true }),
], FUNDO_SEG);
telas['seg-sh-sair'] = svg([
  janelaApp('Portal da escola', '#0067c0', { fundo: '#ffffff' }),
  texto(60, 110, 'Olá, Ana!', { tamanho: 22, negrito: true }),
  '  <rect x="500" y="60" width="90" height="32" rx="6" fill="#ffffff" stroke="#cbd5e1"/>', texto(545, 81, 'Sair', { tamanho: 14, negrito: true, centro: true }),
  alvoRet(494, 54, 102, 44, 8),
]);

// ---------------- Segurança: informações pessoais ----------------

const aviso = (desenho, rotulo) => svg([desenho, texto(320, 330, rotulo, { tamanho: 24, negrito: true, centro: true }), proibido(430, 110, 32)], FUNDO_SEG);
telas['seg-ip-endereco'] = aviso('  <path d="M230 190 l90 -80 l90 80 v110 h-180 z" fill="#fde68a" stroke="#1f2937" stroke-width="4"/><rect x="298" y="230" width="44" height="70" fill="#92400e"/><rect x="250" y="210" width="30" height="30" fill="#bfdbfe" stroke="#1f2937" stroke-width="2"/>', 'endereço');
telas['seg-ip-telefone'] = aviso('  <rect x="270" y="80" width="100" height="200" rx="18" fill="#1f2937"/><rect x="282" y="100" width="76" height="150" rx="6" fill="#93c5fd"/><circle cx="320" cy="264" r="7" fill="#ffffff"/>', 'telefone');
telas['seg-ip-escola'] = aviso('  <rect x="200" y="150" width="240" height="150" fill="#fecaca" stroke="#1f2937" stroke-width="4"/><path d="M190 150 l130 -60 l130 60 z" fill="#dc2626" stroke="#1f2937" stroke-width="4"/><rect x="298" y="230" width="44" height="70" fill="#7f1d1d"/><rect x="224" y="180" width="40" height="34" fill="#bfdbfe" stroke="#1f2937" stroke-width="2"/><rect x="376" y="180" width="40" height="34" fill="#bfdbfe" stroke="#1f2937" stroke-width="2"/>', 'nome da escola');
telas['seg-ip-foto'] = aviso(`  <rect x="220" y="80" width="200" height="220" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/><rect x="234" y="94" width="172" height="176" fill="#dbeafe"/>
${pessoa(320, 270, 150, '#2563eb')}
  <text x="320" y="252" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">ESCOLA</text>`, 'foto com uniforme');

// ---------------- Segurança: desconhecidos em jogos ----------------

const jogo = (...trechos) => svg([
  janelaApp('Jogo de corrida', '#16a34a', { fundo: '#0f172a' }),
  '  <rect x="20" y="50" width="380" height="334" fill="#1e3a8a"/><path d="M60 380 L180 120 H240 L360 380 Z" fill="#4b5563"/><path d="M210 140 v230" stroke="#fde047" stroke-width="5" stroke-dasharray="18 14"/>',
  '  <rect x="400" y="50" width="220" height="334" fill="#f8fafc"/>', texto(414, 76, 'Conversa do jogo', { tamanho: 13, negrito: true }),
  ...trechos,
]);
telas['seg-jg-mensagem'] = jogo(
  '  <rect x="412" y="92" width="196" height="64" rx="10" fill="#e5e7eb"/>',
  texto(424, 114, 'Jogador123:', { tamanho: 13, negrito: true }), texto(424, 134, 'oi! quantos anos', { tamanho: 13 }), texto(424, 150, 'você tem?', { tamanho: 13 }),
  etiqueta(430, 172, 'não conheço'),
);
telas['seg-jg-recusar'] = jogo(
  '  <g filter="url(#sombra)"><rect x="120" y="130" width="400" height="150" rx="12" fill="#ffffff" stroke="#cbd5e1"/></g>',
  texto(320, 180, 'Jogador123 quer ser seu amigo', { tamanho: 17, negrito: true, centro: true }),
  '  <rect x="170" y="210" width="130" height="40" rx="8" fill="#e5e7eb"/>', texto(235, 236, 'Aceitar', { tamanho: 15, centro: true }),
  '  <rect x="340" y="210" width="130" height="40" rx="8" fill="#e5e7eb"/>', texto(405, 236, 'Recusar', { tamanho: 15, negrito: true, centro: true }),
  alvoRet(333, 203, 144, 54, 10),
);
telas['seg-jg-encontro'] = svg([
  '  <rect x="150" y="70" width="340" height="240" rx="12" fill="#dcfce7" stroke="#94a3b8" stroke-width="3"/>',
  '  <path d="M150 190 H490 M320 70 V310" stroke="#ffffff" stroke-width="14"/>',
  '  <path d="M320 120 a34 34 0 0 1 34 34 c0 30 -34 66 -34 66 s-34 -36 -34 -66 a34 34 0 0 1 34 -34 z" fill="#dc2626" stroke="#1f2937" stroke-width="3"/><circle cx="320" cy="154" r="12" fill="#ffffff"/>',
  texto(320, 342, 'encontro com desconhecido', { tamanho: 20, negrito: true, centro: true }),
  proibido(470, 90, 30),
], FUNDO_SEG);

// ---------------- Segurança: quando alguém te trata mal ----------------

const XINGAMENTO = [['Você é muito chato!', 'Ninguém gosta de você.']];
telas['seg-tm-nao-responda'] = svg([celular('Colega', 'Online', XINGAMENTO, { respostaProibida: true })], FUNDO_SEG);
telas['seg-tm-pontinhos'] = svg([celular('Colega', 'Online', XINGAMENTO), alvo(POS_PONTINHOS.cx, POS_PONTINHOS.cy, 15)], FUNDO_SEG);
telas['seg-tm-bloquear'] = svg([celular('Colega', 'Online', XINGAMENTO, { menuOpcoes: { itens: ['Ver contato', 'Silenciar', 'Bloquear'], alvo: 'Bloquear' } })], FUNDO_SEG);
telas['seg-tm-respeito'] = svg([
  pessoa(250, 340, 170, '#60a5fa'), pessoa(390, 340, 170, '#f472b6'),
  '  <path d="M320 110 c-10 -18 -40 -14 -40 8 c0 22 40 44 40 44 s40 -22 40 -44 c0 -22 -30 -26 -40 -8 z" fill="#f43f5e"/>',
  certo(440, 110, 26),
], FUNDO_SEG);
