// Ilustrações das atividades de Windows 11 (src/assets/atividades/windows-11/).
// Cada chave vira <chave>.svg. Para uma tela nova: copie a mais parecida, troque
// textos e posições e rode `npm run ilustracoes -- <chave>`.
import {
  AZUL_ESCURO, CINZA, areaDeTrabalho, arquivo, arvore, botao, caixaSelecao, chamada, configuracoes, cursor,
  dialogo, disco, janela, janelaApp, menu, pasta, svg, tecla, texto, unidade,
} from '../pecas.mjs';

export const destino = 'windows-11';

const MENU_GERENCIAMENTO = { menus: ['Arquivo', 'Ação', 'Exibir', 'Ajuda'] };
const DISCO_COM_NAO_ALOCADO = [
  { nome: '', linhas: ['100 MB', 'EFI'], fracao: 0.1 },
  { nome: '(C:)', linhas: ['236 GB NTFS'], fracao: 0.62 },
  { nome: '', linhas: ['1,00 GB', 'Não alocado'], fracao: 0.14, cor: '#111827', destaque: true },
  { nome: '', linhas: ['750 MB', 'Recuperação'], fracao: 0.14 },
];

export const telas = {};

// ---------------- Copiar, recortar e colar ----------------

telas['area-de-trabalho-nova-pasta'] = svg([
  areaDeTrabalho(),
  `  <g transform="translate(40 96)">
    <path d="M0 14 h22 l6 6 h32 v40 h-60 z" fill="#f6c343"/>
    <path d="M0 26 h60 v34 h-60 z" fill="#fbd35f"/>
    <rect x="-18" y="66" width="96" height="18" fill="#ffffff" stroke="#0067c0" stroke-width="1.5"/>
    <text x="30" y="79" font-size="10.5" text-anchor="middle" fill="#1f2937">AULA WINDOWS</text>
  </g>`,
  cursor(236, 70),
  menu(250, 78, [['Exibir', '›', false], ['Classificar por', '›', false], ['Atualizar', '', false], ['', '', false],
    ['Novo', '›', true], ['', '', false], ['Personalizar', '', false]], 180),
  menu(436, 164, [['Pasta', '', true], ['Atalho', '', false], ['', '', false], ['Documento de Texto', '', false]], 180),
  chamada(24, 210, 196, '1. Botão direito → Novo', ['em um espaço vazio da', 'área de trabalho'], { escura: false }),
  chamada(24, 286, 196, '2. Pasta → digite o nome', ['AULA WINDOWS e pressione', 'Enter'], { escura: false }),
], '#1d4ed8');

telas['novo-documento-de-texto'] = svg([
  janela('AULA WINDOWS', 'Área de Trabalho   ›   AULA WINDOWS', 'Área de Trabalho'),
  pasta(250, 140, 'ARQUIVOS'),
  arquivo(370, 140, 'teste.txt', { editando: true }),
  cursor(440, 150),
  menu(454, 156, [['Novo', '›', true], ['', '', false], ['Propriedades', '', false]], 150),
  menu(430, 234, [['Pasta', '', false], ['Documento de Texto', '', true]], 178),
  chamada(196, 262, 222, 'Novo documento', ['Botão direito em área vazia', '→ Novo → Documento de Texto']),
]);

telas['copiar-arquivo'] = svg([
  janela('AULA WINDOWS', 'Área de Trabalho   ›   AULA WINDOWS', 'Área de Trabalho', { comandoDestacado: 'Copiar' }),
  pasta(250, 140, 'ARQUIVOS'),
  arquivo(370, 140, 'teste.txt', { selecionado: true }),
  menu(398, 212, [['Recortar', 'Ctrl + X', false], ['Copiar', 'Ctrl + C', true], ['Renomear', 'F2', false],
    ['Excluir', 'Delete', false]], 196),
  chamada(196, 262, 190, 'Copiar = duplicar', ['O original continua aqui;', 'a cópia vai para ARQUIVOS'], { escura: false }),
]);

telas['recortar-e-colar'] = svg([
  janela('ARQUIVOS', 'Área de Trabalho   ›   AULA WINDOWS   ›   ARQUIVOS', 'Área de Trabalho', { comandoDestacado: 'Colar' }),
  arquivo(250, 140, 'teste.txt', { selecionado: true }),
  cursor(330, 200),
  menu(344, 206, [['Colar', 'Ctrl + V', true]], 176),
  chamada(196, 276, 408, 'Recortar = mover', ['1. Em AULA WINDOWS: selecione teste.txt e pressione Ctrl + X',
    '2. Em ARQUIVOS: pressione Ctrl + V — o arquivo sai do local antigo']),
]);

telas['renomear-arquivo'] = svg([
  janela('ARQUIVOS', 'Área de Trabalho   ›   AULA WINDOWS   ›   ARQUIVOS', 'Área de Trabalho', { comandoDestacado: 'Renomear' }),
  arquivo(262, 140, 'atividade-concluida.txt', { selecionado: true, editando: true }),
  tecla(430, 150, 'F2'),
  chamada(430, 196, 176, 'Renomear', ['Selecione o arquivo,', 'pressione F2, digite o', 'novo nome e Enter'], { escura: false }),
]);

telas['lixeira-restaurar'] = svg([
  janela('Lixeira', 'Lixeira', 'Lixeira', {
    comandoDestacado: 'Restaurar os itens selecionados',
    comandos: ['Esvaziar Lixeira', 'Restaurar os itens selecionados'],
    mostrarNovo: false,
  }),
  arquivo(262, 140, 'atividade-concluida.txt', { selecionado: true }),
  menu(340, 200, [['Restaurar', '', true], ['Recortar', '', false], ['', '', false], ['Excluir permanentemente', '', false]], 196),
  chamada(196, 300, 408, 'Delete não apaga de vez', ['O arquivo vai para a Lixeira e pode ser restaurado até a Lixeira',
    'ser esvaziada.'], { escura: false }),
]);

telas['desfazer-ctrl-z'] = svg([
  texto(320, 56, 'Errou? Desfaça a última ação', { tamanho: 16, negrito: true, centro: true }),
  '  <g filter="url(#sombra)"><rect x="60" y="92" width="170" height="150" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
  arquivo(145, 104, 'nome-errado.txt', { selecionado: true }),
  texto(145, 230, 'nome digitado errado', { tamanho: 10.5, cor: '#dc2626', centro: true }),
  '  <g filter="url(#sombra)"><rect x="410" y="92" width="170" height="150" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
  arquivo(495, 104, 'atividade-concluida.txt', { selecionado: true }),
  texto(495, 230, 'nome anterior de volta', { tamanho: 10.5, cor: '#16a34a', centro: true }),
  '  <path d="M246 167 H 394" stroke="#0067c0" stroke-width="2.5"/><path d="M394 167 l-10 -6 v12 z" fill="#0067c0"/>',
  tecla(262, 128, 'Ctrl', 50),
  texto(320, 148, '+', { tamanho: 14, negrito: true, centro: true }),
  tecla(332, 128, 'Z', 44),
  chamada(120, 280, 400, 'Ctrl + Z funciona para', ['renomear, excluir, copiar e recortar no Explorador de Arquivos.']),
]);

{
  const atalhos = [['Ctrl', 'C', 'Copiar', 'cria uma cópia'], ['Ctrl', 'X', 'Recortar', 'prepara para mover'],
    ['Ctrl', 'V', 'Colar', 'coloca no novo local'], [null, 'F2', 'Renomear', 'muda o nome'],
    [null, 'Delete', 'Excluir', 'envia para a Lixeira'], ['Ctrl', 'Z', 'Desfazer', 'volta a última ação']];
  const cartoes = [texto(320, 46, 'Atalhos do Explorador de Arquivos', { tamanho: 16, negrito: true, centro: true })];
  atalhos.forEach(([modificador, nomeTecla, acao, descricao], i) => {
    const cx = 40 + (i % 3) * 196;
    const cy = 74 + Math.floor(i / 3) * 150;
    cartoes.push(`  <g filter="url(#sombra)"><rect x="${cx}" y="${cy}" width="176" height="130" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>`);
    if (modificador) {
      cartoes.push(tecla(cx + 30, cy + 20, modificador, 50));
      cartoes.push(texto(cx + 92, cy + 40, '+', { tamanho: 14, negrito: true, centro: true }));
      cartoes.push(tecla(cx + 104, cy + 20, nomeTecla, 42));
    } else {
      const largura = Math.max(44, nomeTecla.length * 9 + 16);
      cartoes.push(tecla(cx + 88 - Math.floor(largura / 2), cy + 20, nomeTecla, largura));
    }
    cartoes.push(texto(cx + 88, cy + 86, acao, { tamanho: 13, cor: AZUL_ESCURO, negrito: true, centro: true }));
    cartoes.push(texto(cx + 88, cy + 106, descricao, { cor: '#4b5563', centro: true }));
  });
  telas['atalhos-do-teclado'] = svg(cartoes);
}

// ---------------- Pastas, arquivos e print ----------------

telas['pasta-atividade-windows-subpastas'] = svg([
  janela('Atividade Windows', 'Área de Trabalho   ›   Atividade Windows', 'Área de Trabalho'),
  pasta(250, 140, 'Textos'),
  pasta(370, 140, 'Imagens'),
  pasta(490, 140, 'Print', { editando: true }),
  chamada(196, 262, 410, '3 subpastas dentro de Atividade Windows', [
    'Botão direito em área vazia → Novo → Pasta, digite o nome e Enter.',
    'Repita para Textos, Imagens e Print.'], { escura: false }),
]);

telas['bloco-de-notas-salvar'] = svg([
  janelaApp('texto1.txt - Bloco de Notas', '#60a5fa', { menus: ['Arquivo', 'Editar', 'Exibir'], menuAberto: 'Arquivo' }),
  texto(42, 272, 'Esta é uma atividade de Windows.', { tamanho: 12 }),
  texto(42, 292, 'Estou aprendendo a criar pastas e organizar arquivos.', { tamanho: 12 }),
  '  <rect x="357" y="280" width="1.5" height="15" fill="#1f2937"/>',
  menu(28, 78, [['Nova guia', 'Ctrl + N', false], ['Abrir', 'Ctrl + O', false], ['Salvar', 'Ctrl + S', true],
    ['Salvar como', 'Ctrl + Shift + S', false], ['', '', false], ['Sair', '', false]], 236),
  chamada(300, 96, 300, 'Salvar e fechar', ['Arquivo → Salvar (ou Ctrl + S)', 'e depois feche o Bloco de Notas.']),
]);

telas['organizacao-pastas'] = svg([
  janela('Textos', 'Área de Trabalho   ›   Atividade Windows   ›   Textos', 'Área de Trabalho'),
  arquivo(250, 140, 'texto1.txt', { selecionado: true }),
  arvore(350, 140, 256, 'Confira a organização', [
    [0, 'pasta', 'Atividade Windows'], [1, 'pasta', 'Textos'], [2, 'arquivo', 'texto1.txt'],
    [1, 'pasta', 'Imagens'], [1, 'pasta', 'Print']]),
]);

{
  const corpo = [
    janelaApp('Sem título - Paint', '#ef4444', { fundo: '#f3f4f6', menus: ['Arquivo', 'Editar', 'Exibir'], menuAberto: 'Arquivo' }),
    '  <rect x="210" y="96" width="390" height="250" fill="#ffffff" stroke="#d1d5db"/>',
    '  <rect x="224" y="110" width="362" height="220" fill="#e5edf8"/>',
    '  <rect x="236" y="122" width="338" height="196" rx="4" fill="#ffffff" stroke="#cbd5e1"/>',
    '  <rect x="236" y="122" width="338" height="16" rx="4" fill="#eef1f5"/>',
  ];
  ['Textos', 'Imagens', 'Print'].forEach((nome, i) => {
    const cx = 290 + i * 100;
    corpo.push(`  <path d="M${cx - 20} 170 h14 l4 4 h22 v28 h-40 z" fill="#f6c343"/>`);
    corpo.push(texto(cx, 222, nome, { tamanho: 9.5, centro: true }));
  });
  corpo.push(
    texto(405, 300, 'print colado com Ctrl + V', { tamanho: 10, cor: CINZA, centro: true }),
    menu(28, 78, [['Novo', 'Ctrl + N', false], ['Abrir', 'Ctrl + O', false], ['Salvar', 'Ctrl + S', false],
      ['Salvar como', '›', true]], 164),
    menu(196, 176, [['Imagem PNG', '', false], ['Imagem JPEG', '', false], ['Imagem BMP', '', true],
      ['Imagem GIF', '', false]], 150),
    tecla(28, 290, 'PrtSc', 64),
    texto(104, 310, 'copia a tela', { tamanho: 10.5 }),
    tecla(28, 334, 'Ctrl', 46), texto(82, 354, '+', { tamanho: 13, negrito: true }), tecla(94, 334, 'V', 34),
    texto(138, 354, 'cola', { tamanho: 10.5 }),
  );
  telas['paint-salvar-bmp'] = svg(corpo);
}

// ---------------- Personalização ----------------

{
  const estilos = [];
  [['#ffffff', false], ['#111827', false], ['#9ca3af', false], ['#ec4899', true]].forEach(([corSeta, destaque], i) => {
    const x = 226 + i * 60;
    const borda = destaque ? 'stroke="#0067c0" stroke-width="2"' : 'stroke="#d1d5db"';
    estilos.push(`  <rect x="${x}" y="116" width="50" height="40" rx="6" fill="#ffffff" ${borda}/>`);
    estilos.push(`  <g transform="translate(${x + 19} 118)"><path d="M0 0 L0 22 L6 17 L10 26 L14 24 L10 15 L17 15 Z" fill="${corSeta}" stroke="#111827" stroke-width="1.2"/></g>`);
  });
  ['#ec4899', '#22c55e', '#eab308', '#06b6d4', '#8b5cf6', '#ef4444'].forEach((cor, i) => {
    const borda = i === 0 ? ' stroke="#111827" stroke-width="2"' : '';
    estilos.push(`  <circle cx="${476 + i * 22}" cy="132" r="8" fill="${cor}"${borda}/>`);
  });
  telas['ponteiro-do-mouse'] = svg([
    configuracoes('Acessibilidade', ['Acessibilidade', 'Ponteiro do mouse e toque'], [
      { rotulo: 'Estilo do ponteiro do mouse', altura: 84, destaque: true },
      { rotulo: 'Tamanho', sub: 'Tamanho do ponteiro do mouse', controle: ['slider', 0.55] },
      { rotulo: 'Cursor de texto', sub: 'Indicador do cursor de texto e espessura', controle: ['seta'] },
    ], { tamanhoTrilha: 15 }),
    estilos.join('\n'),
    chamada(210, 300, 396, 'Onde fica', ['Windows + I → Acessibilidade → Ponteiro do mouse e toque.',
      'Escolha o estilo personalizado e uma cor vibrante.']),
  ]);
}

telas['cores-destaque'] = svg([
  configuracoes('Personalização', ['Personalização', 'Cores'], [
    { rotulo: 'Escolher seu modo', controle: ['lista', 'Personalizado'], destaque: true },
    { rotulo: 'Modo padrão do Windows', controle: ['lista', 'Escuro'], filho: true },
    { rotulo: 'Modo de aplicativo padrão', controle: ['lista', 'Claro'], filho: true },
    { rotulo: 'Cor de destaque', controle: ['lista', 'Automático'] },
    { rotulo: 'Mostrar cor de destaque no Iniciar e na barra de tarefas', controle: ['toggle', true, false],
      destaque: true, altura: 46, tamanho: 10.5 },
  ]),
  chamada(210, 332, 396, 'Exemplo: Windows escuro e aplicativos claros', []),
]);

telas['plano-de-fundo-slides'] = svg([
  configuracoes('Personalização', ['Personalização', 'Plano de fundo'], [
    { rotulo: 'Personalizar a tela de fundo', controle: ['lista', 'Apresentação de slides'], destaque: true },
    { rotulo: 'Escolher um álbum de imagens', sub: 'Imagens › Meus Papéis de Parede', controle: ['botao', 'Procurar'] },
    { rotulo: 'Alterar a imagem a cada', controle: ['lista', '1 minuto'], destaque: true },
    { rotulo: 'Embaralhar a ordem das imagens', controle: ['toggle', true], destaque: true },
  ]),
  chamada(210, 318, 396, 'Dica: Windows + Shift + S tira uma captura de tela',
    ['para usar como imagem na pasta Meus Papéis de Parede.']),
]);

{
  const temas = [];
  [['#1d4ed8', '#93c5fd'], ['#0f172a', '#334155'], ['#be185d', '#f9a8d4'], ['#047857', '#6ee7b7']].forEach(([c1, c2], i) => {
    const x = 226 + i * 92;
    temas.push(`  <rect x="${x}" y="210" width="82" height="52" rx="6" fill="${c1}"/>`);
    temas.push(`  <circle cx="${x + 58}" cy="232" r="14" fill="${c2}" opacity="0.8"/>`);
  });
  ['Brilho', 'Fluxo', 'Florescer', 'Nascer do Sol'].forEach((nome, i) => {
    temas.push(texto(226 + i * 92 + 41, 278, nome, { tamanho: 9.5, cor: CINZA, centro: true }));
  });
  telas['salvar-tema'] = svg([
    configuracoes('Personalização', ['Personalização', 'Temas'], [
      { rotulo: 'Tema atual: Personalizado', sub: 'Plano de fundo, cor, sons e cursor', controle: ['botao', 'Salvar'], destaque: true },
      { rotulo: 'Tela de bloqueio', sub: 'Imagem diferente da área de trabalho', controle: ['seta'] },
    ]),
    texto(226, 200, 'Temas prontos', { tamanho: 11.5, negrito: true }),
    temas.join('\n'),
    dialogo(330, 292, 276, 80, 'Salvar tema'),
    '  <rect x="344" y="320" width="248" height="22" rx="4" fill="#ffffff" stroke="#0067c0" stroke-width="1.5"/>',
    texto(352, 335, 'Tema Ana'),
    botao(526, 346, 'Salvar', { primario: true, largura: 66 }),
  ]);
}

{
  const corpo = [
    '  <rect width="640" height="400" fill="#dfe8f5"/>',
    dialogo(120, 16, 400, 368, 'Som', { abas: ['Reprodução', 'Gravação', 'Sons', 'Comunicações'], abaSelecionada: 'Sons' }),
    texto(136, 84, 'Esquema de som:', { tamanho: 10.5 }),
    '  <rect x="136" y="92" width="220" height="22" rx="4" fill="#ffffff" stroke="#d1d5db"/>',
    texto(144, 107, 'Esquema da Ana (modificado)', { tamanho: 10.5 }),
    botao(366, 91, 'Salvar como...', { destaque: true, largura: 96 }),
    botao(466, 91, 'Excluir', { largura: 44 }),
    texto(136, 138, 'Eventos de programa:', { tamanho: 10.5 }),
    '  <rect x="136" y="146" width="368" height="130" fill="#ffffff" stroke="#d1d5db"/>',
  ];
  ['Iniciar o Windows', 'Lembrete de calendário', 'Notificação', 'Parada crítica', 'Sair do Windows'].forEach((evento, i) => {
    const y = 166 + i * 22;
    if (evento === 'Notificação' || evento === 'Parada crítica') {
      const corFundo = evento === 'Notificação' ? '#dbeafe' : '#eef4fd';
      corpo.push(`  <rect x="140" y="${y - 14}" width="360" height="20" fill="${corFundo}"/>`);
    }
    corpo.push(`  <circle cx="156" cy="${y - 4}" r="5" fill="none" stroke="#6b7280"/>`);
    corpo.push(texto(170, y, evento, { tamanho: 10.5, negrito: evento === 'Notificação' }));
  });
  corpo.push(
    texto(136, 300, 'Sons:', { tamanho: 10.5 }),
    '  <rect x="136" y="308" width="220" height="22" rx="4" fill="#ffffff" stroke="#60a5fa"/>',
    texto(144, 323, 'Windows Ding.wav', { tamanho: 10.5 }),
    botao(366, 307, 'Testar', { destaque: true, largura: 66 }),
    botao(360, 348, 'OK', { primario: true, largura: 66 }),
    botao(434, 348, 'Cancelar', { largura: 70 }),
    chamada(8, 150, 104, 'Troque', ['Notificação', 'e Parada', 'crítica']),
  );
  telas['sons-do-sistema'] = svg(corpo);
}

telas['barra-de-tarefas-comportamentos'] = svg([
  configuracoes('Personalização', ['Personalização', 'Barra de tarefas'], [
    { rotulo: 'Outros ícones da bandeja do sistema', controle: ['seta'] },
    { rotulo: 'Comportamentos da barra de tarefas', controle: ['expandido'] },
    { rotulo: 'Alinhamento da barra de tarefas', controle: ['lista', 'Esquerda'], destaque: true, filho: true },
    { rotulo: 'Ocultar automaticamente a barra de tarefas', controle: ['caixa', true], destaque: true, filho: true },
  ]),
  chamada(210, 318, 396, 'Teste: afaste o mouse da barra e ela some;', ['leve o mouse até a borda de baixo e ela volta.']),
]);

// ---------------- Projeto, compactação e proteção ----------------

telas['projeto-final-estrutura'] = svg([
  janela('Projeto Final', 'Documentos   ›   Projeto Final', 'Documentos'),
  pasta(250, 140, 'Textos'),
  pasta(370, 140, 'Imagens'),
  pasta(490, 140, 'Backup'),
  arvore(196, 250, 410, 'Estrutura do projeto', [
    [0, 'pasta', 'Projeto Final'], [1, 'pasta', 'Textos  (2 arquivos .txt)'],
    [1, 'pasta', 'Imagens  (1 captura de tela)'], [1, 'pasta', 'Backup']]),
]);

telas['renomear-em-lote'] = svg([
  janela('Textos', 'Documentos   ›   Projeto Final   ›   Textos', 'Documentos', { comandoDestacado: 'Renomear' }),
  arquivo(250, 140, 'anotacao (1).txt', { selecionado: true }),
  arquivo(376, 140, 'anotacao (2).txt', { selecionado: true }),
  tecla(470, 146, 'Ctrl', 50), texto(528, 166, '+ clique', { negrito: true }),
  tecla(470, 190, 'F2', 44), texto(522, 210, 'renomeia', { negrito: true }),
  chamada(196, 262, 410, 'Renomeação em lote', ['Com os 2 selecionados, F2 → digite anotacao → Enter.',
    'O Windows numera sozinho: (1), (2)...'], { escura: false }),
]);

telas['compactar-zip'] = svg([
  janela('Documentos', 'Este Computador   ›   Documentos', 'Documentos'),
  pasta(250, 140, 'Projeto Final', { selecionada: true }),
  pasta(250, 250, 'Projeto Final.zip', { zip: true }),
  cursor(300, 186),
  menu(314, 192, [['Abrir', '', false], ['Compactar para arquivo ZIP', '', true], ['Copiar como caminho', '', false],
    ['Propriedades', 'Alt + Enter', false], ['', '', false], ['Mostrar mais opções', '', false]], 264),
  chamada(410, 138, 196, 'Para descompactar', ['botão direito no .zip', '→ Extrair tudo']),
]);

telas['compactacao-ntfs'] = svg([
  '  <rect width="640" height="400" fill="#dfe8f5"/>',
  dialogo(90, 30, 460, 340, 'Atributos Avançados'),
  texto(106, 70, 'Escolha as configurações desejada para esta pasta.', { tamanho: 10.5 }),
  texto(106, 100, 'Atributos de arquivo e índice', { cor: AZUL_ESCURO, negrito: true }),
  caixaSelecao(112, 126, 'Os arquivos desta pasta estão prontos para arquivamento', { marcada: true }),
  caixaSelecao(112, 150, 'Permitir que o conteúdo dos arquivos seja indexado', { marcada: true }),
  texto(106, 190, 'Atributos de compactação ou criptografia', { cor: AZUL_ESCURO, negrito: true }),
  caixaSelecao(112, 218, 'Compactar conteúdo para economizar espaço em disco', { marcada: true, destaque: true, largura: 350 }),
  caixaSelecao(112, 244, 'Criptografar o conteúdo para proteger os dados'),
  botao(380, 330, 'OK', { primario: true, largura: 74 }),
  botao(462, 330, 'Cancelar', { largura: 76 }),
  chamada(106, 270, 262, 'Caminho', ['Botão direito em Textos → Propriedades → Avançados'], { escura: false }),
]);

telas['ocultar-pasta'] = svg([
  janela('Projeto Final', 'Documentos   ›   Projeto Final', 'Documentos', {
    comandoDestacado: 'Exibir', comandos: ['Recortar', 'Copiar', 'Colar', 'Exibir'],
  }),
  pasta(230, 140, 'Textos'),
  pasta(310, 140, 'Particular', { esmaecida: true }),
  texto(310, 250, 'pasta oculta', { tamanho: 10, cor: CINZA, centro: true }),
  menu(360, 122, [['Ícones grandes', '', false], ['Detalhes', '', false], ['', '', false], ['Mostrar', '›', true]], 170),
  menu(390, 222, [['Painel de navegação', '', false], ['Extensões de nomes de arquivos', '', false],
    ['✓ Itens ocultos', '', true]], 222),
  chamada(196, 320, 410, 'Ocultar não é senha', ['Quem ativar Exibir → Mostrar → Itens ocultos consegue ver a pasta.'],
    { escura: false }),
]);

{
  const corpo = [
    '  <rect width="640" height="400" fill="#dfe8f5"/>',
    dialogo(110, 12, 420, 376, 'Propriedades de Projeto Final', {
      abas: ['Geral', 'Compartilhamento', 'Segurança', 'Personalizar'], abaSelecionada: 'Segurança',
    }),
    texto(126, 80, 'Nomes de grupo ou de usuário:', { tamanho: 10.5 }),
    '  <rect x="126" y="88" width="388" height="70" fill="#ffffff" stroke="#d1d5db"/>',
    '  <rect x="130" y="110" width="380" height="20" fill="#dbeafe"/>',
    texto(140, 104, 'SYSTEM', { tamanho: 10.5 }),
    texto(140, 124, 'Usuário (PC\\Usuário)', { tamanho: 10.5, negrito: true }),
    texto(140, 144, 'Administradores (PC\\Administradores)', { tamanho: 10.5 }),
    botao(430, 164, 'Editar...', { largura: 84 }),
    texto(126, 206, 'Permissões para Usuário', { tamanho: 10.5, negrito: true }),
    texto(400, 206, 'Permitir', { tamanho: 10.5 }), texto(462, 206, 'Negar', { tamanho: 10.5 }),
    '  <rect x="126" y="212" width="388" height="126" fill="#ffffff" stroke="#d1d5db"/>',
  ];
  ['Controle total', 'Modificar', 'Leitura e execução', 'Listar conteúdo da pasta', 'Leitura', 'Gravação'].forEach((permissao, i) => {
    const y = 230 + i * 19;
    corpo.push(texto(136, y, permissao, { tamanho: 10.5, negrito: permissao === 'Controle total' }));
    corpo.push(`  <path d="M414 ${y - 5} l4 4 l7 -8" fill="none" stroke="#6b7280" stroke-width="1.8"/>`);
  });
  corpo.push(
    '  <rect x="130" y="216" width="380" height="20" fill="none" stroke="#60a5fa" stroke-width="1.5"/>',
    botao(372, 350, 'OK', { primario: true, largura: 70 }),
    botao(448, 350, 'Cancelar', { largura: 70 }),
    chamada(8, 200, 96, 'Só observe', ['não altere', 'nada nesta', 'aba']),
  );
  telas['permissoes-seguranca'] = svg(corpo);
}

// ---------------- Partição de disco e memória ----------------

function tabelaVolumes(volumes, destaque) {
  const partes = ['  <rect x="30" y="90" width="580" height="22" fill="#eef1f5"/>'];
  for (const [x, cabecalho] of [[40, 'Volume'], [200, 'Layout'], [270, 'Tipo'], [330, 'Sistema de Arquivos'], [470, 'Status']]) {
    partes.push(texto(x, 105, cabecalho, { tamanho: 10, cor: CINZA }));
  }
  volumes.forEach(([volume, sistema, status], i) => {
    const y = 128 + i * 20;
    if (volume === destaque) partes.push(`  <rect x="30" y="${y - 14}" width="580" height="20" fill="#dbeafe"/>`);
    partes.push(texto(40, y, volume, { tamanho: 10.5, negrito: volume === destaque }));
    partes.push(texto(200, y, 'Simples', { tamanho: 10.5 }));
    partes.push(texto(270, y, 'Básico', { tamanho: 10.5 }));
    partes.push(texto(330, y, sistema, { tamanho: 10.5 }));
    partes.push(texto(470, y, status, { tamanho: 10.5 }));
  });
  return partes.join('\n');
}

telas['gerenciamento-de-disco'] = svg([
  janelaApp('Gerenciamento de Disco', '#0ea5e9', MENU_GERENCIAMENTO),
  tabelaVolumes([['(C:)', 'NTFS', 'Íntegro (Inicialização)'], ['Partição de Sistema EFI', '', 'Íntegro (EFI)'],
    ['Recuperação', 'NTFS', 'Íntegro']], '(C:)'),
  disco(30, 210, 580, [
    { nome: '', linhas: ['100 MB', 'EFI'], fracao: 0.11 },
    { nome: '(C:)', linhas: ['237 GB NTFS', 'Íntegro (Inicialização)'], fracao: 0.72 },
    { nome: '', linhas: ['750 MB', 'Recuperação'], fracao: 0.17 },
  ]),
  tecla(30, 300, 'Windows', 80), texto(120, 320, '+', { tamanho: 13, negrito: true }), tecla(134, 300, 'X', 34),
  texto(178, 320, '→ Gerenciamento de Disco', { negrito: true }),
  chamada(360, 290, 250, 'Anote', ['o espaço total da unidade C:'], { escura: false }),
]);

telas['diminuir-volume'] = svg([
  janelaApp('Gerenciamento de Disco', '#0ea5e9', MENU_GERENCIAMENTO),
  disco(30, 300, 580, DISCO_COM_NAO_ALOCADO),
  dialogo(110, 90, 420, 196, 'Diminuir C:'),
  texto(126, 128, 'Tamanho total antes da diminuição em MB:', { tamanho: 10.5 }), texto(506, 128, '242688', { tamanho: 10.5 }),
  texto(126, 152, 'Espaço disponível para diminuição em MB:', { tamanho: 10.5 }), texto(506, 152, '98304', { tamanho: 10.5 }),
  '  <rect x="120" y="162" width="400" height="26" rx="4" fill="#dbeafe" stroke="#60a5fa"/>',
  texto(126, 180, 'Digite o espaço a ser diminuído em MB:', { tamanho: 10.5, cor: AZUL_ESCURO, negrito: true }),
  '  <rect x="446" y="166" width="68" height="18" fill="#ffffff" stroke="#0067c0"/>',
  texto(452, 179, '1024', { tamanho: 10.5, negrito: true }),
  texto(126, 208, 'Tamanho total após a diminuição em MB:', { tamanho: 10.5 }), texto(506, 208, '241664', { tamanho: 10.5 }),
  botao(360, 246, 'Diminuir', { destaque: true, largura: 76 }),
  botao(444, 246, 'Cancelar', { largura: 76 }),
]);

telas['novo-volume-simples'] = svg([
  janelaApp('Gerenciamento de Disco', '#0ea5e9', MENU_GERENCIAMENTO),
  disco(30, 96, 580, DISCO_COM_NAO_ALOCADO),
  cursor(468, 132),
  menu(300, 150, [['Novo Volume Simples...', '', true], ['Novo Volume Estendido...', '', false], ['Propriedades', '', false]], 196),
  chamada(30, 250, 580, 'Assistente para Novo Volume Simples', [
    'Tamanho: aceite o máximo sugerido (até 1 GB)   ·   Letra da unidade: Z:',
    'Sistema de arquivos: NTFS   ·   Rótulo do volume: TESTE   ·   Concluir']),
]);

telas['unidade-teste-z'] = svg([
  janela('Este Computador', 'Este Computador', 'Este Computador'),
  texto(196, 150, 'Dispositivos e unidades', { tamanho: 11.5, negrito: true }),
  unidade(200, 170, 'Disco Local (C:)', '180 GB livres de 236 GB', 0.24),
  unidade(410, 170, 'TESTE (Z:)', '0,98 GB livres de 1,00 GB', 0.03, { destaque: true }),
  chamada(196, 260, 410, 'Nova unidade funcionando', ['Crie uma pasta e um arquivo em TESTE (Z:) e veja o espaço',
    'total em Propriedades: igual ou menor que 1 GB.'], { escura: false }),
]);

telas['excluir-volume-estender'] = svg([
  janelaApp('Gerenciamento de Disco', '#0ea5e9', MENU_GERENCIAMENTO),
  disco(30, 96, 580, [
    { nome: '', linhas: ['100 MB', 'EFI'], fracao: 0.1 },
    { nome: '(C:)', linhas: ['236 GB NTFS'], fracao: 0.62 },
    { nome: 'TESTE (Z:)', linhas: ['1,00 GB NTFS'], fracao: 0.14, cor: '#1d4ed8', destaque: true },
    { nome: '', linhas: ['750 MB', 'Recuperação'], fracao: 0.14 },
  ]),
  cursor(470, 132),
  menu(300, 150, [['Abrir', '', false], ['Formatar...', '', false], ['', '', false], ['Excluir Volume...', '', true]], 184),
  chamada(30, 270, 280, '1. Excluir Volume', ['em TESTE (Z:) — o espaço volta', 'a ficar Não alocado']),
  chamada(330, 270, 280, '2. Estender Volume', ['em (C:) — aceite o tamanho', 'máximo e o espaço volta para C:']),
]);

{
  const pontos = Array.from({ length: 26 }, (_, i) => `${46 + i * 10},${250 - (40 + ((i * 37) % 23))}`).join(' ');
  telas['memoria-ram-virtual'] = svg([
    janelaApp('Gerenciador de Tarefas', '#0ea5e9', { fundo: '#f3f4f6' }),
    texto(40, 76, 'Desempenho', { tamanho: 15, negrito: true }),
    texto(40, 104, 'Memória', { tamanho: 13, negrito: true }), texto(250, 104, '8,0 GB', { tamanho: 13, negrito: true }),
    '  <rect x="40" y="116" width="264" height="140" fill="#ffffff" stroke="#c4b5fd"/>',
    `  <polyline points="${pontos}" fill="none" stroke="#8b5cf6" stroke-width="1.8"/>`,
    texto(40, 280, 'Em uso: 5,1 GB      Disponível: 2,9 GB'),
    dialogo(318, 96, 296, 272, 'Memória Virtual'),
    caixaSelecao(334, 136, 'Gerenciar automaticamente o tamanho', { marcada: true, destaque: true, largura: 268 }),
    texto(354, 152, 'do arquivo de paginação', { tamanho: 10.5, cor: AZUL_ESCURO, negrito: true }),
    texto(344, 186, 'Tamanho total do arquivo de paginação', { tamanho: 10.5, cor: CINZA }),
    texto(344, 214, 'Mínimo permitido:', { tamanho: 10.5 }), texto(560, 214, '16 MB', { tamanho: 10.5 }),
    texto(344, 236, 'Recomendado:', { tamanho: 10.5 }), texto(560, 236, '1919 MB', { tamanho: 10.5 }),
    '  <rect x="338" y="246" width="264" height="22" fill="#dbeafe"/>',
    texto(344, 262, 'Tamanho alocado atualmente:', { tamanho: 10.5, cor: AZUL_ESCURO, negrito: true }),
    texto(546, 262, '4096 MB', { tamanho: 10.5, cor: AZUL_ESCURO, negrito: true }),
    botao(430, 330, 'OK', { largura: 70 }),
    botao(506, 330, 'Cancelar', { destaque: true, largura: 78 }),
    chamada(40, 300, 264, 'Só observe', ['Não desmarque o gerenciamento', 'automático. Saia com Cancelar.']),
  ]);
}

