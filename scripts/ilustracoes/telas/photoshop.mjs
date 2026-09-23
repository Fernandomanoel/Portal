// Ilustrações da atividade de Photoshop (src/assets/atividades/photoshop/).
// Diagramas ilustrativos — não são capturas reais do programa (o layout e os
// ícones variam por versão). Cada chave vira <chave>.svg. Para uma tela nova,
// copie a mais parecida e rode `npm run ilustracoes -- <chave>`.
import {
  caixaFerramentas, chamada, fotoPlaceholder, painelCriativo, janelaCriativa, quadriculado, selo, svg, texto,
} from '../pecas.mjs';

export const destino = 'photoshop';

const MENUS = ['Arquivo', 'Editar', 'Imagem', 'Camada', 'Selecionar', 'Janela'];
const FERRAMENTAS = ['V', 'M', 'L', 'W', 'C', 'B', 'E', 'Z'];
const CAMADAS_PADRAO = [{ rotulo: 'Minha Foto' }, { rotulo: 'Fundo' }];

export const telas = {};

telas['panorama-da-tela'] = svg([
  janelaCriativa('Sem título-1.psd', '#31a8ff', { menus: MENUS, opcoes: ['Modo: Normal', 'Opacidade: 100%'] }),
  caixaFerramentas(FERRAMENTAS, { destaque: 'W' }),
  fotoPlaceholder(56, 92, 448, 282),
  painelCriativo('Camadas', CAMADAS_PADRAO, {}),
  selo(562, 50, 1),
  selo(562, 71, 2),
  selo(33, 90, 3),
  selo(280, 110, 4),
  selo(610, 92, 5),
], '#1f2937');

telas['caixa-de-ferramentas'] = svg([
  janelaCriativa('Sem título-1.psd', '#31a8ff', { menus: MENUS, opcoes: ['Modo de seleção', 'Suavizar: 0 px'] }),
  caixaFerramentas(FERRAMENTAS, { destaque: 'W' }),
  fotoPlaceholder(56, 92, 448, 282),
  painelCriativo('Camadas', CAMADAS_PADRAO, {}),
  `  <rect x="24" y="356" width="16" height="16" fill="#1f2937" stroke="#e5e7eb"/>
  <rect x="30" y="362" width="16" height="16" fill="#ffffff" stroke="#1f2937"/>`,
  texto(20, 380, 'X troca', { tamanho: 7.5, cor: '#94a3b8' }),
  chamada(330, 20, 260, 'Seleção Rápida (W) em destaque', ['clique e arraste sobre o objeto —', 'o Photoshop gruda na borda dele'], { escura: false }),
], '#1f2937');

telas['painel-de-camadas'] = svg([
  janelaCriativa('Sem título-1.psd', '#31a8ff', { menus: MENUS }),
  caixaFerramentas(FERRAMENTAS),
  fotoPlaceholder(56, 92, 448, 282),
  painelCriativo('Camadas', [{ rotulo: 'Minha Foto', ativa: true }, { rotulo: 'Fundo' }], {}),
  texto(522, 358, '+ nova', { tamanho: 9, cor: '#cbd5e1' }),
  texto(586, 358, 'lixeira', { tamanho: 8, cor: '#cbd5e1' }),
  chamada(150, 300, 250, 'O círculo ao lado da camada', ['mostra/esconde; "+ nova" cria uma', 'camada; lixeira apaga a selecionada'], { escura: false }),
], '#1f2937');

telas['inserir-e-ajustar-imagem'] = svg([
  janelaCriativa('Sem título-1.psd', '#31a8ff', { menus: MENUS, opcoes: ['Transformação Livre — Ctrl+T'] }),
  caixaFerramentas(FERRAMENTAS, { destaque: 'V' }),
  fotoPlaceholder(96, 122, 368, 222),
  `  <g fill="#ffffff" stroke="#0ea5e9" stroke-width="1.5">
    <rect x="91" y="117" width="10" height="10"/><rect x="459" y="117" width="10" height="10"/>
    <rect x="91" y="339" width="10" height="10"/><rect x="459" y="339" width="10" height="10"/>
    <rect x="270" y="117" width="10" height="10"/><rect x="270" y="339" width="10" height="10"/>
  </g>`,
  painelCriativo('Camadas', CAMADAS_PADRAO, {}),
  chamada(160, 40, 260, 'Segure Shift e arraste um canto', ['mantém a proporção da imagem —', 'Enter confirma'], { escura: false }),
], '#1f2937');

telas['recortando-a-imagem'] = svg([
  janelaCriativa('Sem título-1.psd', '#31a8ff', { menus: MENUS, opcoes: ['Proporção: 1:1', 'Sobrepor: Terços'] }),
  caixaFerramentas(FERRAMENTAS, { destaque: 'C' }),
  fotoPlaceholder(56, 92, 448, 282),
  `  <g fill="#000000" opacity="0.55">
    <rect x="56" y="92" width="448" height="48"/>
    <rect x="56" y="330" width="448" height="44"/>
    <rect x="56" y="140" width="84" height="190"/>
    <rect x="360" y="140" width="144" height="190"/>
  </g>`,
  '  <rect x="140" y="140" width="220" height="190" fill="none" stroke="#ffffff" stroke-width="1.5"/>',
  `  <g fill="#ffffff"><rect x="135" y="135" width="10" height="10"/><rect x="355" y="135" width="10" height="10"/>
    <rect x="135" y="325" width="10" height="10"/><rect x="355" y="325" width="10" height="10"/></g>`,
  painelCriativo('Camadas', CAMADAS_PADRAO, {}),
  chamada(330, 40, 250, 'A área escura some do resultado', ['a área clara dentro das alças', 'é o que fica depois do Enter'], { escura: false }),
], '#1f2937');

telas['remover-fundo-antes-depois'] = svg([
  texto(160, 40, 'Antes', { tamanho: 14, cor: '#1f2937', negrito: true, centro: true }),
  texto(480, 40, 'Depois', { tamanho: 14, cor: '#1f2937', negrito: true, centro: true }),
  '  <g filter="url(#sombra)"><rect x="30" y="56" width="260" height="300" rx="8" fill="#ffffff" stroke="#cbd5e1"/></g>',
  fotoPlaceholder(46, 72, 228, 268),
  '  <g filter="url(#sombra)"><rect x="350" y="56" width="260" height="300" rx="8" fill="#ffffff" stroke="#cbd5e1"/></g>',
  quadriculado(366, 72, 228, 268),
  fotoPlaceholder(366, 72, 228, 268, { comFundo: false }),
  texto(320, 214, '→', { tamanho: 26, cor: '#0ea5e9', centro: true }),
], '#eef2f7');
