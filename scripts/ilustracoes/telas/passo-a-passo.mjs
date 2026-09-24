// Desenhos dos passos da seção "Passo a Passo" (src/assets/atividades/passo-a-passo/).
// Um desenho por passo, no estilo das telas de Windows 11. Regras desta seção:
// - o anel laranja (alvo/alvoRet) marca SEMPRE onde clicar — e só isso;
// - "olhe isto" usa etiqueta (rótulo amarelo), nunca o anel;
// - quase nenhum texto na imagem: a instrução está escrita e narrada ao lado.
import {
  alvo, alvoRet, arquivo, carregandoApp, celular, certo, cursor, etiqueta, gradeExcel,
  inicioOffice, janela, janelaConversa, janelaOffice, menu, menuIniciar, mouseBotao, paginaWord, pasta,
  pastaTela, pessoa, posicaoCelula, proibido, robo, slidePowerPoint, svg, teclaGrande, texto,
} from '../pecas.mjs';
import {
  EXCEL, FUNDO_TECLA, POWERPOINT, WORD, alvoCelula, alvoItem, atalho, desktop, mouseCanto as dupla,
} from '../passo-a-passo-comum.mjs';

export const destino = 'passo-a-passo';
export const telas = {};

/** Moldura "clique aqui" em volta de uma pasta/arquivo inteiro (ícone e nome) no Explorador. */
const alvoIcone = (cx, y) => alvoRet(cx - 60, y - 4, 120, 100, 10);
/** O mesmo, para uma pasta na área de trabalho azul. */
const alvoIconeTela = (cx, y, rotulo) => {
  const largura = Math.max(112, rotulo.length * 9 + 26);
  return alvoRet(cx - largura / 2, y + 2, largura, 106, 10);
};

// ---------------- Windows: área de trabalho e menus ----------------

export const MENU_DESKTOP = (novo, personalizar = false) => [['Exibir', '›', false], ['Classificar por', '›', false], ['Atualizar', '', false],
  ['', '', false], ['Novo', '›', novo], ['', '', false], ['Personalizar', '', personalizar]];
const SUBMENU_NOVO = (item) => [['Pasta', '', item === 'Pasta'], ['Atalho', '', false], ['', '', false],
  ['Documento de Texto', '', item === 'Documento de Texto']];

telas['win-area-de-trabalho'] = desktop(etiqueta(320, 180, 'Área de trabalho', { centro: true }));
telas['win-botao-direito-desktop'] = desktop(alvo(330, 200), cursor(330, 200), mouseBotao(548, 150, 'direito'));
telas['win-menu-novo'] = desktop(
  menu(250, 78, MENU_DESKTOP(true), 180), alvoItem(250, 78, MENU_DESKTOP(true), 'Novo', 180), cursor(236, 70),
);
telas['win-menu-pasta'] = desktop(
  menu(250, 78, MENU_DESKTOP(true), 180),
  menu(436, 164, SUBMENU_NOVO('Pasta'), 180), alvoItem(436, 164, SUBMENU_NOVO('Pasta'), 'Pasta', 180),
);

const nomeNaTela = (cx, y) => alvoRet(cx - 60, y + 66, 120, 34, 6);
telas['win-pasta-treino-nome'] = desktop(pastaTela(160, 110, 'TREINO', { editando: true }), nomeNaTela(160, 110));
telas['win-pasta-aula-nome'] = desktop(pastaTela(160, 110, 'AULA WINDOWS', { editando: true }), nomeNaTela(160, 110));

telas['win-pasta-treino-clique'] = desktop(
  pastaTela(160, 110, 'TREINO', { selecionada: true }), alvoIconeTela(160, 110, 'TREINO'), cursor(166, 150), mouseBotao(548, 150, 'esquerdo'),
);
telas['win-aula-dois-cliques'] = desktop(
  pastaTela(160, 110, 'AULA WINDOWS', { selecionada: true }), alvoIconeTela(160, 110, 'AULA WINDOWS'), cursor(166, 150),
  etiqueta(244, 136, '2 cliques'), mouseBotao(548, 150, 'esquerdo'),
);
telas['win-pasta-sumiu'] = desktop(
  pastaTela(160, 110, '', { fantasma: true }),
  '  <path d="M150 150 C 120 110, 100 90, 78 62" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="9 7"/>',
  '  <path d="M72 54 l14 4 l-8 10 z" fill="#ffffff"/>',
);
telas['win-lixeira-icone'] = desktop(etiqueta(92, 28, 'Lixeira'));
telas['win-lixeira-dois-cliques'] = desktop(alvoRet(30, 12, 52, 66, 8), cursor(58, 40), etiqueta(98, 28, '2 cliques'), mouseBotao(548, 150, 'esquerdo'));

const LIXEIRA = () => janela('Lixeira', 'Lixeira', 'Lixeira', {
  comandos: ['Esvaziar Lixeira', 'Restaurar os itens selecionados'], mostrarNovo: false,
});
const MENU_LIXEIRA = [['Restaurar', '', true], ['Recortar', '', false], ['', '', false], ['Excluir permanentemente', '', false]];
telas['win-lixeira-com-treino'] = svg([LIXEIRA(), pasta(262, 140, 'TREINO'), certo(350, 170)]);
telas['win-lixeira-botao-direito'] = svg([
  LIXEIRA(), pasta(262, 140, 'TREINO', { selecionada: true }), alvoIcone(262, 140), cursor(268, 180), dupla('direito'),
]);
telas['win-lixeira-restaurar'] = svg([
  LIXEIRA(), pasta(262, 140, 'TREINO', { selecionada: true }),
  menu(290, 200, MENU_LIXEIRA, 196), alvoItem(290, 200, MENU_LIXEIRA, 'Restaurar', 196),
]);
telas['win-treino-de-volta'] = desktop(pastaTela(160, 110, 'TREINO'), certo(250, 132));

// ---------------- Windows: pastas, arquivo, copiar, recortar ----------------

const CAMINHO_AULA = 'Área de Trabalho   ›   AULA WINDOWS';
const CAMINHO_ARQUIVOS = 'Área de Trabalho   ›   AULA WINDOWS   ›   ARQUIVOS';
const aula = (...trechos) => svg([janela('AULA WINDOWS', CAMINHO_AULA, 'Área de Trabalho'), ...trechos]);
const arquivos = (...trechos) => svg([janela('ARQUIVOS', CAMINHO_ARQUIVOS, 'Área de Trabalho'), ...trechos]);
const MENU_PASTA = (novo) => [['Exibir', '›', false], ['Classificar por', '›', false], ['', '', false],
  ['Novo', '›', novo], ['', '', false], ['Propriedades', '', false]];
const nomeNoExplorador = (cx) => alvoRet(cx - 51, 204, 102, 30, 6);

telas['win-aula-vazia'] = aula(etiqueta(398, 236, 'Pasta vazia', { centro: true }));
telas['win-aula-botao-direito'] = aula(alvo(400, 170), cursor(400, 170), dupla('direito'));
telas['win-aula-menu-novo'] = aula(menu(408, 164, MENU_PASTA(true), 180), alvoItem(408, 164, MENU_PASTA(true), 'Novo', 180), cursor(400, 160));
telas['win-aula-menu-pasta'] = aula(
  menu(408, 164, MENU_PASTA(true), 180), menu(212, 226, SUBMENU_NOVO('Pasta'), 190), alvoItem(212, 226, SUBMENU_NOVO('Pasta'), 'Pasta', 190),
);
telas['win-arquivos-nome'] = aula(pasta(250, 140, 'ARQUIVOS', { editando: true }), nomeNoExplorador(250));

telas['win-aula-botao-direito-2'] = aula(pasta(250, 140, 'ARQUIVOS'), alvo(430, 170), cursor(430, 170), dupla('direito'));
telas['win-aula-menu-novo-2'] = aula(
  pasta(250, 140, 'ARQUIVOS'), menu(408, 164, MENU_PASTA(true), 180), alvoItem(408, 164, MENU_PASTA(true), 'Novo', 180), cursor(400, 160),
);
telas['win-aula-menu-documento'] = aula(
  pasta(250, 140, 'ARQUIVOS'), menu(408, 164, MENU_PASTA(true), 180),
  menu(212, 226, SUBMENU_NOVO('Documento de Texto'), 190),
  alvoItem(212, 226, SUBMENU_NOVO('Documento de Texto'), 'Documento de Texto', 190),
);
telas['win-teste-nome'] = aula(pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste', { editando: true }), nomeNoExplorador(370));
telas['win-pastas-prontas'] = aula(pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste'), certo(470, 172));

telas['win-aula-conteudo'] = aula(
  pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste'),
  etiqueta(250, 246, 'pasta', { centro: true }), etiqueta(370, 246, 'arquivo', { centro: true }),
);
telas['win-teste-clique'] = aula(
  pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste', { selecionado: true }), alvoIcone(370, 140), cursor(376, 180), dupla(),
);
telas['win-arquivos-dois-cliques'] = aula(
  pasta(250, 140, 'ARQUIVOS', { selecionada: true }), arquivo(370, 140, 'teste'), alvoIcone(250, 140), cursor(256, 180),
  etiqueta(196, 250, '2 cliques'), dupla(),
);
telas['win-arquivos-com-copia'] = arquivos(arquivo(250, 140, 'teste'), certo(330, 172));
telas['win-voltar-seta'] = arquivos(
  arquivo(250, 140, 'teste'), '  <text x="36" y="72" font-size="11" fill="#1f2937">←</text>', alvo(40, 68, 17),
);
telas['win-aula-teste-continua'] = aula(pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste'), certo(450, 172));
telas['win-teste-recortado'] = aula(
  pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste', { selecionado: true, esmaecido: true }),
  etiqueta(370, 246, 'mais claro', { centro: true }),
);
telas['win-nav-area-de-trabalho'] = aula(
  pasta(250, 140, 'ARQUIVOS'), arquivo(370, 140, 'teste', { esmaecido: true }), alvoRet(26, 181, 144, 30, 6),
);
telas['win-area-com-teste'] = svg([
  janela('Área de Trabalho', 'Área de Trabalho', 'Área de Trabalho'),
  pasta(250, 140, 'AULA WINDOWS'), arquivo(370, 140, 'teste'), certo(450, 172),
]);
telas['win-area-aula-dois-cliques'] = svg([
  janela('Área de Trabalho', 'Área de Trabalho', 'Área de Trabalho'),
  pasta(250, 140, 'AULA WINDOWS', { selecionada: true }), arquivo(370, 140, 'teste'), alvoIcone(250, 140), cursor(256, 180),
  etiqueta(196, 250, '2 cliques'), dupla(),
]);
telas['win-aula-sem-teste'] = aula(
  pasta(250, 140, 'ARQUIVOS'),
  '  <rect x="334" y="146" width="72" height="92" rx="8" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>',
  certo(460, 172),
);

// ---------------- Windows: mudar o nome e desfazer ----------------

telas['win-aula-so-arquivos-dois-cliques'] = aula(
  pasta(250, 140, 'ARQUIVOS', { selecionada: true }), alvoIcone(250, 140), cursor(256, 180), etiqueta(196, 250, '2 cliques'), dupla(),
);
telas['win-copia-clique'] = arquivos(arquivo(250, 140, 'teste', { selecionado: true }), alvoIcone(250, 140), cursor(256, 180), dupla());
telas['win-copia-caixa-nome'] = arquivos(arquivo(250, 140, 'teste', { selecionado: true, editando: true }), nomeNoExplorador(250));
telas['win-copia-atividade-nome'] = arquivos(arquivo(250, 140, 'atividade', { selecionado: true, editando: true }), nomeNoExplorador(250));
telas['win-copia-atividade'] = arquivos(arquivo(250, 140, 'atividade'), certo(330, 172));
telas['win-copia-teste-de-volta'] = arquivos(arquivo(250, 140, 'teste'), certo(330, 172));

telas['tecla-f2'] = svg([
  ...['Esc', 'F1', 'F2', 'F3', 'F4'].map((nome, i) => teclaGrande(90 + i * 115, 170, nome, 96)),
  alvoRet(262, 120, 116, 108, 16),
  etiqueta(320, 272, 'fileira de cima do teclado', { centro: true }),
], FUNDO_TECLA);

{
  const tecla60 = (cx, cy, nome, largura) => `  <g transform="translate(${cx} ${cy}) scale(0.62)">${teclaGrande(0, 0, nome, largura)}</g>`;
  const linha = (cy, teclas, rotulo) => {
    const partes = [];
    let x = 80;
    teclas.forEach((nome, i) => {
      if (i > 0) {
        partes.push(texto(x + 14, cy + 9, '+', { tamanho: 26, negrito: true, centro: true }));
        x += 28;
      }
      const largura = nome.length > 2 ? 170 : 110;
      partes.push(tecla60(x + largura * 0.31, cy, nome, largura));
      x += largura * 0.62;
    });
    partes.push(texto(330, cy + 10, rotulo, { tamanho: 28, negrito: true }));
    return partes.join('\n');
  };
  telas['atalhos-copiar-recortar-colar'] = svg([
    linha(100, ['Ctrl', 'C'], 'Copiar'), linha(200, ['Ctrl', 'X'], 'Recortar'), linha(300, ['Ctrl', 'V'], 'Colar'),
  ], FUNDO_TECLA);
  telas['atalhos-f2-desfazer'] = svg([linha(150, ['F2'], 'Mudar o nome'), linha(250, ['Ctrl', 'Z'], 'Desfazer')], FUNDO_TECLA);
}

// ---------------- Teclas e atalhos ----------------

telas['tecla-enter'] = svg([teclaGrande(320, 190, 'Enter', 240)], FUNDO_TECLA);
telas['tecla-delete'] = svg([teclaGrande(320, 170, 'Delete', 240), texto(320, 280, 'Em alguns teclados: Del', { tamanho: 20, centro: true })], FUNDO_TECLA);
telas['tecla-backspace'] = svg([teclaGrande(320, 190, '← Backspace', 320)], FUNDO_TECLA);
telas['atalho-ctrl-c'] = atalho('C', 'Copiar');
telas['atalho-ctrl-x'] = atalho('X', 'Recortar');
telas['atalho-ctrl-v'] = atalho('V', 'Colar');
telas['atalho-ctrl-z'] = atalho('Z', 'Desfazer');

// ---------------- Abrir um programa (Word, Excel, PowerPoint) ----------------

telas['barra-de-tarefas'] = desktop(etiqueta(320, 316, 'Barra de tarefas', { centro: true }));
telas['iniciar-botao'] = desktop(alvo(266, 383, 22), etiqueta(266, 304, 'Iniciar', { centro: true }));

for (const [prefixo, app, linhasNovo] of [
  ['word', WORD, ['Documento', 'em branco']],
  ['excel', EXCEL, ['Pasta de trabalho', 'em branco']],
  ['ppt', POWERPOINT, ['Apresentação', 'em branco']],
]) {
  telas[`${prefixo}-busca`] = desktop(menuIniciar({ busca: app.nome, resultado: app }));
  telas[`${prefixo}-resultado`] = desktop(menuIniciar({ busca: app.nome, resultado: app }), alvoRet(172, 122, 296, 68, 10));
  telas[`${prefixo}-abrindo`] = svg([carregandoApp(app)], app.cor);
  telas[`${prefixo}-em-branco`] = svg([inicioOffice(app, linhasNovo), alvoRet(134, 104, 142, 162, 10)]);
}

// ---------------- Word ----------------

const word = (...trechos) => svg([janelaOffice(WORD, 'Documento1 - Word'), ...trechos]);
telas['word-folha'] = word(paginaWord(), certo(540, 250));
telas['word-clique-folha'] = word(paginaWord(), alvo(320, 210), cursor(320, 210), mouseBotao(522, 250, 'esquerdo'));
telas['word-risco'] = word(paginaWord({ riscoEm: { x: 200, y: 180 } }), etiqueta(222, 196, 'risco que pisca'));
telas['word-nome'] = word(paginaWord({ linhas: ['Ana Souza'], riscoEm: { x: 292, y: 180 } }));
telas['word-nome-pronto'] = word(paginaWord({ linhas: ['Ana Souza'] }), certo(540, 250));

// ---------------- Excel ----------------

const excel = (...trechos) => svg([janelaOffice(EXCEL, 'Pasta1 - Excel'), ...trechos]);
{
  const c = posicaoCelula('C3');
  telas['excel-celulas'] = excel(
    gradeExcel(), `  <rect x="${c.x}" y="${c.y}" width="${c.largura}" height="${c.altura}" fill="#fde68a" fill-opacity="0.7"/>`,
    etiqueta(304, 202, 'célula'),
  );
}
telas['excel-clique-a1'] = excel(gradeExcel(), alvoCelula('A1'), cursor(96, 176), mouseBotao(522, 250, 'esquerdo'));
telas['excel-a1-verde'] = excel(gradeExcel({ selecionada: 'A1' }), etiqueta(140, 164, 'borda verde'));
telas['excel-a1-10'] = excel(gradeExcel({ selecionada: 'A1', valores: { A1: '10' }, editando: true }));
telas['excel-a2-pronto'] = excel(gradeExcel({ selecionada: 'A2', valores: { A1: '10' } }), certo(540, 250));

// ---------------- PowerPoint ----------------

const ppt = (...trechos) => svg([janelaOffice(POWERPOINT, 'Apresentação1 - PowerPoint'), ...trechos]);
telas['ppt-slide'] = ppt(slidePowerPoint(POWERPOINT), etiqueta(24, 300, 'slide'));
telas['ppt-caixa-titulo'] = ppt(slidePowerPoint(POWERPOINT), etiqueta(370, 146, 'caixa do título', { centro: true }));
telas['ppt-clique-caixa'] = ppt(slidePowerPoint(POWERPOINT), alvo(300, 216, 24), cursor(300, 216), mouseBotao(36, 250, 'esquerdo'));
telas['ppt-titulo-digitado'] = ppt(slidePowerPoint(POWERPOINT, { titulo: 'Meu primeiro slide', estado: 'editando' }));
telas['ppt-clique-fora'] = ppt(
  slidePowerPoint(POWERPOINT, { titulo: 'Meu primeiro slide', estado: 'editando' }), alvo(560, 342, 20), cursor(560, 342),
);
telas['ppt-pronto'] = ppt(slidePowerPoint(POWERPOINT, { titulo: 'Meu primeiro slide', estado: 'pronto' }), certo(572, 164));


// ---------------- Inteligência artificial ----------------

const FUNDO_IA = '#f5f3ff';
const PERGUNTA = { de: 'pessoa', linhas: ['Quantas pernas tem uma aranha?'] };
telas['ia-conversa'] = svg([janelaConversa([PERGUNTA, { de: 'ia', linhas: ['Uma aranha tem 8 pernas.'] }])]);
telas['ia-nome'] = svg([
  robo(190, 210, 1.4),
  texto(430, 206, 'IA', { tamanho: 84, negrito: true, cor: '#5b21b6', centro: true }),
  texto(430, 252, 'inteligência artificial', { tamanho: 22, centro: true }),
], FUNDO_IA);
telas['ia-programa-nao-pessoa'] = svg([
  '  <rect x="70" y="58" width="220" height="168" rx="12" fill="#1f2937"/><rect x="82" y="70" width="196" height="144" rx="6" fill="#ede9fe"/>',
  '  <rect x="164" y="226" width="32" height="26" fill="#1f2937"/><rect x="130" y="250" width="100" height="10" rx="5" fill="#1f2937"/>',
  robo(180, 150, 0.85),
  texto(180, 306, 'Programa', { tamanho: 22, negrito: true, centro: true }), certo(180, 348, 24),
  pessoa(460, 262, 200, '#fb923c'),
  texto(460, 306, 'Pessoa', { tamanho: 22, negrito: true, centro: true }), proibido(460, 348, 24),
], FUNDO_IA);
{
  const folhas = [0, 1, 2, 3].map((i) => `  <g transform="translate(${70 + i * 26} ${80 + i * 22}) rotate(${-8 + i * 5})">
    <rect width="120" height="150" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <g stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">${[28, 48, 68, 88, 108].map((y) => `<line x1="18" y1="${y}" x2="${y === 108 ? 70 : 102}" y2="${y}"/>`).join('')}</g>
  </g>`);
  telas['ia-leu-textos'] = svg([
    ...folhas,
    '  <path d="M290 200 H 350" stroke="#7c4dd6" stroke-width="5" stroke-linecap="round"/><path d="M350 186 l20 14 l-20 14 z" fill="#7c4dd6"/>',
    robo(470, 210, 1.3),
  ], FUNDO_IA);
}
telas['ia-pode-errar'] = svg([janelaConversa([PERGUNTA, { de: 'ia', linhas: ['Uma aranha tem 6 pernas.'], marca: 'erro' }])]);
telas['ia-pergunte-adulto'] = svg([
  pessoa(250, 360, 250, '#34d399'),
  pessoa(410, 360, 160, '#60a5fa'),
  '  <path d="M466 150 h96 a18 18 0 0 1 18 18 v40 a18 18 0 0 1 -18 18 h-60 l-26 22 v-22 h-10 a18 18 0 0 1 -18 -18 v-40 a18 18 0 0 1 18 -18 z" fill="#ffffff" stroke="#1f2937" stroke-width="2.5"/>',
  texto(514, 206, '?', { tamanho: 44, negrito: true, cor: '#5b21b6', centro: true }),
], FUNDO_IA);
{
  const casa = '  <path d="M130 170 l50 -44 l50 44 v58 h-100 z" fill="#fde68a" stroke="#1f2937" stroke-width="3"/><rect x="166" y="190" width="28" height="38" fill="#92400e"/>';
  const telefone = '  <rect x="290" y="112" width="60" height="116" rx="12" fill="#1f2937"/><rect x="298" y="124" width="44" height="84" rx="4" fill="#93c5fd"/><circle cx="320" cy="218" r="4" fill="#ffffff"/>';
  const cadeado = '  <path d="M440 158 v-18 a30 30 0 0 1 60 0 v18" fill="none" stroke="#1f2937" stroke-width="8"/><rect x="424" y="158" width="92" height="70" rx="12" fill="#fbbf24" stroke="#1f2937" stroke-width="3"/><circle cx="470" cy="190" r="8" fill="#1f2937"/>';
  telas['ia-nao-escreva'] = svg([
    casa, telefone, cadeado,
    texto(180, 270, 'endereço', { tamanho: 20, negrito: true, centro: true }),
    texto(320, 270, 'telefone', { tamanho: 20, negrito: true, centro: true }),
    texto(470, 270, 'senha', { tamanho: 20, negrito: true, centro: true }),
    proibido(222, 120, 22), proibido(356, 108, 22), proibido(512, 112, 22),
  ], FUNDO_IA);
}
telas['ia-pronto'] = svg([robo(320, 214, 1.4), certo(430, 110, 34)], FUNDO_IA);

// ---------------- Segurança na era digital ----------------

const DESCONHECIDO = ['Desconhecido', '+55 11 90000-0000'];
const PREMIO = ['Parabéns!', 'Você ganhou', 'um prêmio!'];
const LINK_PREMIO = ['Clique aqui:', { link: 'premio-gratis.xyz' }];
const tela = (...trechos) => svg(trechos, '#eef2f7');

telas['seg-desconhecido'] = tela(celular(...DESCONHECIDO, [['Oi! Tudo bem?']]), etiqueta(470, 40, 'não conheço'));
telas['seg-premio'] = tela(celular(...DESCONHECIDO, [PREMIO]));
telas['seg-link'] = tela(celular(...DESCONHECIDO, [PREMIO, LINK_PREMIO], { marcaLink: 'etiqueta' }));
telas['seg-nao-conhece'] = tela(celular(...DESCONHECIDO, [PREMIO, LINK_PREMIO], { marcaLink: 'proibido' }), etiqueta(470, 40, 'não conheço'));
telas['seg-premio-falso'] = tela(celular(...DESCONHECIDO, [['Você ganhou', 'um celular novo!'], ['Pegue aqui:', { link: 'celular-gratis.xyz' }]], { marcaLink: 'proibido' }));
telas['seg-pressa'] = tela(
  celular(...DESCONHECIDO, [['Corra! Só hoje!', 'Você tem', '5 minutos!'], [{ link: 'oferta-rapida.xyz' }]], { marcaLink: 'proibido' }),
  '  <circle cx="540" cy="140" r="52" fill="#ffffff" stroke="#1f2937" stroke-width="5"/><path d="M540 140 v-32 M540 140 l22 14" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/>',
);
telas['seg-nao-responda'] = tela(celular(...DESCONHECIDO, [PREMIO, LINK_PREMIO], { respostaProibida: true }));
telas['seg-chame-adulto'] = tela(
  pessoa(250, 370, 250, '#34d399'),
  pessoa(410, 370, 160, '#60a5fa'),
  '  <rect x="352" y="262" width="30" height="50" rx="6" fill="#1f2937"/><rect x="356" y="268" width="22" height="36" rx="3" fill="#93c5fd"/>',
);
telas['seg-apagar'] = tela(celular(...DESCONHECIDO, [PREMIO, LINK_PREMIO], { menuApagar: true }));
telas['seg-pronto'] = tela(
  '  <path d="M320 70 L220 108 V190 C220 262 262 312 320 330 C378 312 420 262 420 190 V108 Z" fill="#fde68a" stroke="#a0680f" stroke-width="6" stroke-linejoin="round"/>',
  certo(320, 200, 46),
);
