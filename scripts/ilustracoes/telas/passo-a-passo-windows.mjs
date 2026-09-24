// Passo a Passo — Windows: janela, pesquisa, Bloco de Notas, som, tela de fundo, desligar.
import {
  POS_ENERGIA, POS_SALVAR, POS_SOM, alvo, alvoRet, areaDeTrabalho, certo, configuracoes, cursor, dialogoSalvar,
  etiqueta, iconeSomBarra, janela, janelaApp, menu, menuIniciar, mouseBotao, painelSom, proibido, svg, texto,
} from '../pecas.mjs';
import { BLOCO_DE_NOTAS, FIXADOS, alvoItem, alvoPos, atalho, desktop } from '../passo-a-passo-comum.mjs';
import { MENU_DESKTOP } from './passo-a-passo.mjs';

export const destino = 'passo-a-passo';
export const telas = {};

// ---------------- Abrir e fechar uma janela ----------------

const PASTA_BARRA = { cx: 325, cy: 383 };
const marcaAberta = '  <rect x="319" y="394" width="12" height="3" rx="1.5" fill="#2563eb"/>';
const explorador = (...trechos) => svg([janela('Início', 'Início', 'Início'), ...trechos]);

telas['win-barra-pasta-amarela'] = desktop(etiqueta(PASTA_BARRA.cx, 318, 'pasta amarela', { centro: true }));
telas['win-clique-pasta-amarela'] = desktop(alvo(PASTA_BARRA.cx, PASTA_BARRA.cy, 18), mouseBotao(548, 150, 'esquerdo'));
telas['win-explorador-aberto'] = explorador(etiqueta(398, 236, 'Explorador de Arquivos', { centro: true }));
telas['win-tres-botoes'] = explorador(
  '  <g filter="url(#sombra)"><rect x="236" y="150" width="330" height="120" rx="12" fill="#ffffff" stroke="#cbd5e1"/></g>',
  texto(290, 212, '—', { tamanho: 38, centro: true }),
  '  <rect x="386" y="186" width="30" height="30" fill="none" stroke="#1f2937" stroke-width="3"/>',
  texto(512, 216, '×', { tamanho: 44, centro: true }),
  texto(290, 252, 'Minimizar', { tamanho: 14, negrito: true, centro: true }),
  texto(401, 252, 'Maximizar', { tamanho: 14, negrito: true, centro: true }),
  texto(512, 252, 'Fechar', { tamanho: 14, negrito: true, centro: true }),
  '  <path d="M560 44 L 470 150" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>',
);
telas['win-clique-minimizar'] = explorador(alvo(560, 33, 14));
telas['win-janela-na-barra'] = desktop(marcaAberta, etiqueta(PASTA_BARRA.cx, 318, 'a janela está aqui', { centro: true }));
telas['win-clique-pasta-amarela-2'] = desktop(marcaAberta, alvo(PASTA_BARRA.cx, PASTA_BARRA.cy, 18), mouseBotao(548, 150, 'esquerdo'));
telas['win-clique-fechar'] = explorador(alvo(603, 34, 14));
telas['win-desktop-certo'] = desktop(certo(320, 190, 36));

// ---------------- Achar um arquivo com a pesquisa ----------------

const ARQUIVO_TESTE = { nome: 'teste', cor: '#475569', letra: '≡' };
const buscaTeste = () => menuIniciar({ busca: 'teste', resultado: ARQUIVO_TESTE, tipoResultado: 'Documento de texto' });
const RESULTADO = { x: 176, y: 126, largura: 288, altura: 60 };

telas['win-busca-teste'] = desktop(buscaTeste());
telas['win-busca-teste-olhe'] = desktop(buscaTeste(), etiqueta(486, 140, 'o arquivo'));
telas['win-busca-teste-clique'] = desktop(buscaTeste(), alvoPos(RESULTADO));
const bloco = (titulo, linhas = [], ...trechos) => svg([
  janelaApp(`${titulo} - Bloco de Notas`, '#60a5fa', { menus: ['Arquivo', 'Editar', 'Exibir'] }),
  ...linhas.map((linha, i) => texto(42, 112 + i * 26, linha, { tamanho: 17 })),
  ...trechos,
]);
telas['win-teste-aberto'] = bloco('teste', ['Atividade de Windows 11'], certo(540, 250));
telas['win-bloco-fechar'] = bloco('teste', ['Atividade de Windows 11'], alvo(603, 34, 14));

// ---------------- Escrever e salvar no Bloco de Notas ----------------

const buscaBloco = () => menuIniciar({ busca: 'bloco de notas', resultado: BLOCO_DE_NOTAS });
telas['win-busca-bloco'] = desktop(buscaBloco());
telas['win-busca-bloco-clique'] = desktop(buscaBloco(), alvoPos(RESULTADO));
telas['win-bloco-vazio-clique'] = bloco('Sem título', [], alvo(300, 170), cursor(300, 170), mouseBotao(548, 250, 'esquerdo'));
telas['win-bloco-texto'] = bloco('Sem título', ['Eu gosto de aprender.'], '  <rect x="222" y="96" width="1.8" height="20" fill="#1f2937"/>');
telas['atalho-ctrl-s'] = atalho('S', 'Salvar');
telas['win-salvar-nome'] = bloco('Sem título', ['Eu gosto de aprender.'], dialogoSalvar('meu-texto'), alvoPos(POS_SALVAR.nome));
telas['win-salvar-botao'] = bloco('Sem título', ['Eu gosto de aprender.'], dialogoSalvar('meu-texto', { editando: false }), alvoPos(POS_SALVAR.salvar));
telas['win-bloco-salvo'] = bloco('meu-texto', ['Eu gosto de aprender.'], etiqueta(210, 48, 'nome do arquivo'), certo(540, 250));

// ---------------- Aumentar e diminuir o som ----------------

const desktopSom = (...trechos) => desktop(iconeSomBarra(), ...trechos);
const seta = (x1, x2) => `  <path d="M${x1} 290 H ${x2}" stroke="#ea580c" stroke-width="4" stroke-dasharray="8 6"/>
  <path d="M${x2} 280 l${x2 > x1 ? 14 : -14} 10 l${x2 > x1 ? -14 : 14} 10 z" fill="#ea580c"/>`;
telas['win-som-icone'] = desktopSom(etiqueta(POS_SOM.cx, 318, 'som', { centro: true }));
telas['win-som-clique'] = desktopSom(alvo(POS_SOM.cx, POS_SOM.cy, 16), mouseBotao(548, 150, 'esquerdo'));
telas['win-som-painel'] = desktopSom(painelSom(0.5), etiqueta(488, 166, 'barra do som', { centro: true }));
telas['win-som-aumentar'] = desktopSom(painelSom(0.5), alvo(496, 318, 15), seta(500, 570));
telas['win-som-alto'] = desktopSom(painelSom(0.9), certo(200, 200, 34));
telas['win-som-diminuir'] = desktopSom(painelSom(0.9), alvo(568, 318, 15), seta(560, 450));
telas['win-som-fechar'] = desktopSom(painelSom(0.3), alvo(200, 200), cursor(200, 200));

// ---------------- Trocar a tela de fundo ----------------

const FOTOS = [
  { ceu: '#93c5fd', morro: '#16a34a', sol: '#fde047' },
  { ceu: '#fdba74', morro: '#15803d', sol: '#f97316' },
  { ceu: '#4c1d95', morro: '#1e1b4b', sol: '#e9d5ff' },
  { ceu: '#67e8f9', morro: '#0369a1', sol: '#fef9c3' },
];
const miniFoto = (x, y, w, h, f) => `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${f.ceu}"/>
  <circle cx="${x + w * 0.75}" cy="${y + h * 0.32}" r="${h * 0.14}" fill="${f.sol}"/>
  <path d="M${x} ${y + h} V${y + h * 0.7} Q${x + w * 0.35} ${y + h * 0.42} ${x + w * 0.7} ${y + h * 0.66} T${x + w} ${y + h * 0.6} V${y + h} Z" fill="${f.morro}"/>`;

telas['win-menu-personalizar'] = desktop(
  menu(250, 78, MENU_DESKTOP(false, true), 180), alvoItem(250, 78, MENU_DESKTOP(false, true), 'Personalizar', 180), cursor(236, 70),
);
telas['win-config-personalizacao'] = svg([
  configuracoes('Personalização', ['Personalização'], [
    { rotulo: 'Tela de fundo', sub: 'Imagem, cor sólida, apresentação de slides', controle: ['seta'] },
    { rotulo: 'Cores', sub: 'Cor de destaque, modo claro e escuro', controle: ['seta'] },
    { rotulo: 'Temas', sub: 'Instalar, criar, gerenciar', controle: ['seta'] },
    { rotulo: 'Tela de bloqueio', sub: 'Imagens, aplicativos, animações', controle: ['seta'] },
  ]),
  alvoRet(205, 83, 406, 60, 10),
]);
telas['win-config-fotos'] = svg([
  configuracoes('Personalização', ['Personalização', 'Tela de fundo'], [
    { rotulo: 'Personalizar a tela de fundo', controle: ['lista', 'Imagem'] },
    { rotulo: 'Imagens recentes', altura: 120 },
  ]),
  ...FOTOS.map((f, i) => miniFoto(226 + i * 94, 166, 84, 60, f)),
  alvoRet(315, 161, 94, 70, 8),
]);
telas['win-fundo-novo'] = svg([
  areaDeTrabalho().replace('fill="url(#fundoDesktop)"', `fill="${FOTOS[1].ceu}"`),
  `  <circle cx="480" cy="110" r="44" fill="${FOTOS[1].sol}"/>`,
  `  <path d="M0 366 V250 Q220 150 440 240 T640 220 V366 Z" fill="${FOTOS[1].morro}"/>`,
  certo(320, 190, 36),
], '#1d4ed8');

// ---------------- Desligar o computador do jeito certo ----------------

const ENERGIA = [['Suspender', '', false], ['Desligar', '', true], ['Reiniciar', '', false]];
telas['win-menu-energia-botao'] = desktop(menuIniciar({ fixados: FIXADOS }), alvo(POS_ENERGIA.cx, POS_ENERGIA.cy, 16));
telas['win-menu-desligar'] = desktop(menuIniciar({ fixados: FIXADOS, menuEnergia: 'Desligar' }), alvoItem(360, 222, ENERGIA, 'Desligar', 140));
telas['win-desligando'] = svg([
  texto(320, 210, 'Desligando', { tamanho: 24, cor: '#ffffff', centro: true }),
  '  <g fill="#ffffff"><circle cx="302" cy="246" r="5"/><circle cx="320" cy="246" r="5" opacity="0.7"/><circle cx="338" cy="246" r="5" opacity="0.4"/></g>',
], '#0b1f4d');
telas['win-nao-botao-fisico'] = svg([
  '  <rect x="250" y="70" width="140" height="260" rx="14" fill="#1f2937"/>',
  '  <circle cx="320" cy="120" r="20" fill="#374151" stroke="#9ca3af" stroke-width="3"/>',
  '  <path d="M313 114 a10 10 0 1 0 14 0" fill="none" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/><line x1="320" y1="106" x2="320" y2="120" stroke="#e5e7eb" stroke-width="2.5" stroke-linecap="round"/>',
  '  <g stroke="#4b5563" stroke-width="3">' + [180, 200, 220, 240].map((y) => `<line x1="276" y1="${y}" x2="364" y2="${y}"/>`).join('') + '</g>',
  proibido(372, 96, 26),
], '#eef2f7');
