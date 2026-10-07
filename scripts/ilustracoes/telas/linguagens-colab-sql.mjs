// Ilustrações dos guias de Python e SQL (src/assets/atividades/analise-de-dados/): onde clicar e
// configurar no Google Colab, no XAMPP e no MySQL Workbench. São desenhos do portal, não prints:
// a tela real pode ter cores e posições um pouco diferentes (o texto de cada passo avisa).
import { alvo, alvoRet, esc, etiqueta, selo, svg, tecla, texto } from '../pecas.mjs';

export const destino = 'analise-de-dados';
export const telas = {};

const MONO = 'font-family="Consolas, Menlo, monospace"';
const LARANJA = '#ea580c';
const COLAB = '#f9ab00';
const CINZA = '#6b7280';

const rect = (x, y, w, h, fill, stroke = null, rx = 0, sw = 1) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}/>`;
const mono = (x, y, conteudo, { tamanho = 12, cor = '#1f2937', negrito = false } = {}) =>
  `  <text x="${x}" y="${y}" font-size="${tamanho}" fill="${cor}" ${MONO}${negrito ? ' font-weight="700"' : ''} xml:space="preserve">${esc(conteudo)}</text>`;
const pastaMini = (x, y) => `  <path d="M${x} ${y + 4} h8 l2 3 h10 v11 h-20 z" fill="#f59e0b"/>`;
const legenda = (itens) => {
  const linhas = Math.ceil(itens.length / 2);
  const altura = 14 + linhas * 18;
  const y = 388 - altura;
  return [
    rect(20, y, 600, altura, '#fffbeb', '#fcd34d', 8),
    ...itens.map(([n, rotulo], i) => {
      const x = 34 + (i % 2) * 300;
      const yy = y + 15 + Math.floor(i / 2) * 18;
      return `${selo(x, yy, n, '#b45309')}\n${texto(x + 16, yy + 4, rotulo, { tamanho: 10.5 })}`;
    }),
  ].join('\n');
};

/** Janela de navegador com o endereço. */
const navegador = (url, corpo, { aba = 'Google Colab' } = {}) => [
  rect(10, 8, 620, 384, '#ffffff', '#94a3b8', 10),
  rect(10, 8, 620, 30, '#e2e8f0', null, 10),
  rect(24, 14, 150, 24, '#ffffff', null, 8),
  texto(36, 30, aba, { tamanho: 10.5 }),
  rect(10, 38, 620, 30, '#f1f5f9'),
  rect(56, 43, 460, 20, '#ffffff', '#cbd5e1', 10),
  texto(70, 57, url, { tamanho: 11 }),
  `  <circle cx="30" cy="53" r="5" fill="#cbd5e1"/><circle cx="46" cy="53" r="5" fill="#cbd5e1"/>`,
  `  <circle cx="596" cy="53" r="11" fill="#7c3aed"/>` + texto(596, 57, 'A', { tamanho: 12, cor: '#ffffff', negrito: true, centro: true }),
  ...corpo,
].join('\n');

const logoColab = (x, y) => `  <g><rect x="${x}" y="${y}" width="26" height="22" rx="6" fill="${COLAB}"/>${texto(x + 13, y + 16, 'CO', { tamanho: 11, cor: '#ffffff', negrito: true, centro: true })}</g>`;
const playBtn = (cx, cy, r = 14) => `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#475569"/><path d="M${cx - r * 0.3} ${cy - r * 0.45} L${cx + r * 0.5} ${cy} L${cx - r * 0.3} ${cy + r * 0.45} Z" fill="#ffffff"/>`;
const menus = (y) => ['Arquivo', 'Editar', 'Ver', 'Inserir', 'Ambiente de execução', 'Ferramentas', 'Ajuda']
  .reduce((acc, m) => { acc.html.push(texto(acc.x, y, m, { tamanho: 10.5 })); acc.x += m.length * 6.1 + 16; return acc; }, { x: 76, html: [] }).html.join('\n');

// ----------------------------------------------------------------- Colab: abrir
telas['colab-abrir'] = svg([
  navegador('colab.research.google.com', [
    rect(10, 68, 620, 280, '#f8fafc'),
    logoColab(26, 80), texto(58, 96, 'Colaboratory', { tamanho: 13, negrito: true }),
    rect(110, 114, 420, 214, '#ffffff', '#cbd5e1', 10, 1.5),
    texto(130, 142, 'Abrir notebook', { tamanho: 14, negrito: true }),
    ...['Exemplos', 'Recentes', 'Google Drive', 'GitHub', 'Upload'].map((a, i) => texto(130 + i * 84, 168, a, { tamanho: 10.5, cor: i === 0 ? '#1d4ed8' : CINZA, negrito: i === 0 })),
    rect(124, 176, 392, 1.5, '#e2e8f0'),
    texto(130, 202, 'Ainda não tem um notebook? Crie um agora e comece a escrever código.', { tamanho: 10.5, cor: CINZA }),
    rect(130, 282, 108, 28, '#ffffff', '#94a3b8', 6), texto(184, 301, 'Cancelar', { tamanho: 11, centro: true }),
    rect(366, 282, 140, 28, '#1d4ed8', null, 6), texto(436, 301, '+ Novo notebook', { tamanho: 11.5, cor: '#ffffff', negrito: true, centro: true }),
    alvoRet(358, 274, 156, 44, 9),
    alvoRet(54, 40, 468, 26, 13),
    alvo(596, 53, 18),
  ]),
  selo(40, 74, 1, '#b45309'), selo(572, 76, 2, '#b45309'), selo(528, 270, 3, '#b45309'),
  legenda([[1, 'Digite o endereço no navegador'], [2, 'Entre com sua conta Google'], [3, 'Clique em Novo notebook']]),
], '#cbd5e1');

// ----------------------------------------------------------------- Colab: a tela
telas['colab-tela'] = svg([
  navegador('colab.research.google.com/drive/…', [
    logoColab(22, 74), texto(56, 90, 'Sem título0.ipynb', { tamanho: 12, negrito: true }),
    rect(48, 76, 134, 20, 'none', '#f59e0b', 4, 1.5),
    rect(540, 76, 78, 22, '#1d4ed8', null, 11), texto(579, 91, 'Compartilhar', { tamanho: 10, cor: '#ffffff', negrito: true, centro: true }),
    menus(116),
    rect(10, 124, 620, 1, '#e2e8f0'),
    rect(62, 130, 74, 22, '#f1f5f9', '#cbd5e1', 6), texto(99, 145, '+ Código', { tamanho: 10.5, negrito: true, centro: true }),
    rect(142, 130, 74, 22, '#f1f5f9', '#cbd5e1', 6), texto(179, 145, '+ Texto', { tamanho: 10.5, centro: true }),
    rect(10, 124, 40, 224, '#f8fafc'),
    texto(30, 150, '{x}', { tamanho: 10, cor: CINZA, centro: true }),
    rect(18, 168, 24, 22, '#fde68a', null, 4), `  <path d="M22 176 h7 l2 3 h9 v10 h-18 z" fill="#f59e0b"/>`,
    playBtn(80, 190), rect(100, 164, 512, 52, '#f8fafc', '#cbd5e1', 6),
    mono(112, 195, 'print("Olá, mundo!")', { tamanho: 13 }),
    rect(100, 228, 512, 44, '#ffffff', '#e2e8f0', 6), mono(112, 255, 'Olá, mundo!', { tamanho: 13, cor: '#047857' }),
    selo(190, 90, 1, '#b45309'), selo(99, 126, 2, '#b45309'),
    selo(80, 164, 3, '#b45309'), selo(612, 160, 4, '#b45309'), selo(612, 224, 5, '#b45309'), selo(30, 160, 6, '#b45309'),
  ]),
  legenda([[1, 'Nome do notebook (clique para trocar)'], [2, 'Adiciona uma célula de código'], [3, 'Botão executar a célula'], [4, 'Célula: onde você escreve'], [5, 'Saída: o resultado aparece aqui'], [6, 'Painel Arquivos (pasta)']]),
], '#cbd5e1');

// ----------------------------------------------------------------- Colab: executar
telas['colab-executar'] = svg([
  navegador('colab.research.google.com/drive/…', [
    rect(10, 68, 620, 280, '#ffffff'),
    texto(34, 96, 'Escreva o código na célula e execute:', { tamanho: 13, negrito: true }),
    playBtn(64, 160, 20), alvo(64, 160, 30),
    rect(100, 130, 500, 60, '#f8fafc', '#cbd5e1', 6),
    mono(114, 166, 'print("Olá, mundo!")', { tamanho: 15 }),
    rect(100, 202, 500, 44, '#ffffff', '#e2e8f0', 6),
    mono(114, 230, 'Olá, mundo!', { tamanho: 15, cor: '#047857' }),
    texto(560, 236, '0 s', { tamanho: 11, cor: '#047857', negrito: true, centro: true }),
    texto(34, 276, 'Ou use o teclado:', { tamanho: 12, negrito: true }),
    tecla(160, 262, 'Shift', 58), texto(226, 281, '+', { tamanho: 14, negrito: true, centro: true }), tecla(238, 262, 'Enter', 58),
    rect(330, 258, 280, 66, '#fffbeb', '#fcd34d', 8),
    texto(342, 278, 'Pode aparecer «Conectando…»:', { tamanho: 10.5, negrito: true }),
    texto(342, 296, 'o Google está ligando um computador para você.', { tamanho: 10.5 }),
    texto(342, 312, 'Espere uns segundos: é normal.', { tamanho: 10.5 }),
  ]),
  legenda([[1, 'Clique no botão de play ou aperte Shift + Enter'], [2, 'O resultado aparece logo abaixo da célula'], [3, 'Só digite no código; não precisa salvar']]),
], '#cbd5e1');

// ----------------------------------------------------------------- Colab: enviar arquivo
telas['colab-upload'] = svg([
  navegador('colab.research.google.com/drive/…', [
    rect(10, 68, 250, 280, '#f8fafc', '#e2e8f0'),
    texto(24, 92, 'Arquivos', { tamanho: 12, negrito: true }),
    rect(24, 102, 24, 22, '#ffffff', '#94a3b8', 4), `  <path d="M36 120 v-12 M31 113 l5 -5 l5 5" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    alvoRet(20, 98, 32, 30, 6),
    rect(56, 102, 24, 22, '#ffffff', '#cbd5e1', 4), `  <path d="M74 110 a6 6 0 1 0 2 5" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/>`,
    pastaMini(24, 136) + texto(52, 150, '..', { tamanho: 11 }) + pastaMini(24, 164) + texto(52, 175, 'sample_data', { tamanho: 11 }),
    rect(18, 182, 232, 22, '#e0f2fe', null, 4), `  <rect x="26" y="187" width="11" height="13" rx="2" fill="#ffffff" stroke="#64748b"/>` + texto(44, 197, 'faturamento.csv', { tamanho: 11, negrito: true }),
    rect(24, 238, 222, 76, '#fffbeb', '#fcd34d', 8),
    texto(32, 258, 'O arquivo fica guardado só', { tamanho: 10.5 }), texto(32, 274, 'enquanto a sessão estiver aberta.', { tamanho: 10.5 }),
    texto(32, 292, 'Fechou? Envie de novo.', { tamanho: 10.5, negrito: true }),
    rect(276, 100, 340, 70, '#f8fafc', '#cbd5e1', 6),
    mono(288, 128, 'import pandas as pd', { tamanho: 12 }),
    mono(288, 148, 'df = pd.read_csv("faturamento.csv")', { tamanho: 12 }),
    rect(276, 182, 340, 46, '#ffffff', '#e2e8f0', 6), mono(288, 210, 'df.shape   →   (24, 4)', { tamanho: 12, cor: '#047857' }),
    texto(276, 262, 'O nome entre aspas precisa ser IGUAL ao do arquivo', { tamanho: 10.5, negrito: true }),
    texto(276, 278, '(maiúsculas, acentos e .csv no fim).', { tamanho: 10.5 }),
  ]),
  legenda([[1, 'No painel Arquivos, clique no ícone de enviar'], [2, 'Escolha o arquivo .csv no seu computador'], [3, 'Use o mesmo nome no código']]),
], '#cbd5e1');

// ----------------------------------------------------------------- Colab: erro
telas['colab-erro'] = svg([
  navegador('colab.research.google.com/drive/…', [
    rect(10, 68, 620, 280, '#ffffff'),
    playBtn(48, 112), rect(70, 92, 540, 40, '#f8fafc', '#cbd5e1', 6), mono(84, 118, 'print(totl)', { tamanho: 14 }),
    rect(70, 142, 540, 128, '#fef2f2', '#fca5a5', 6),
    mono(84, 164, '---------------------------------------------------', { tamanho: 10, cor: '#b91c1c' }),
    mono(84, 182, 'NameError            Traceback (most recent call last)', { tamanho: 11, cor: '#b91c1c' }),
    mono(84, 202, '----> 1 print(totl)', { tamanho: 11, cor: '#b91c1c' }),
    rect(80, 224, 520, 26, '#fecaca', '#dc2626', 4, 1.5),
    mono(88, 242, "NameError: name 'totl' is not defined", { tamanho: 12, cor: '#7f1d1d', negrito: true }),
    texto(34, 296, 'Erro não é falha sua: é o computador explicando o que não entendeu.', { tamanho: 12, negrito: true }),
    texto(34, 316, 'Leia sempre a ÚLTIMA linha: ela diz o tipo do erro e o nome que causou o problema.', { tamanho: 11 }),
    texto(34, 334, 'Aqui: «totl» está escrito errado ou a célula que cria «total» não foi executada.', { tamanho: 11 }),
    selo(612, 138, 1, '#b45309'), selo(606, 220, 2, '#b45309'),
  ]),
  legenda([[1, 'Erro em vermelho abaixo da célula'], [2, 'A última linha diz o que houve'], [3, 'Corrija e execute a célula de novo']]),
], '#cbd5e1');

// ----------------------------------------------------------------- SQL no Colab: resultado
telas['sql-colab-resultado'] = svg([
  navegador('colab.research.google.com/drive/…', [
    rect(10, 68, 620, 280, '#ffffff'),
    playBtn(48, 112), rect(70, 88, 548, 56, '#f8fafc', '#cbd5e1', 6),
    mono(82, 110, 'sql("""', { tamanho: 12 }),
    mono(82, 128, 'SELECT COUNT(*) AS sem_email FROM clientes_brutos WHERE email IS NULL', { tamanho: 10.5 }),
    mono(82, 140, '""")', { tamanho: 12 }),
    rect(70, 158, 548, 78, '#ffffff', '#e2e8f0', 6),
    rect(80, 166, 200, 22, '#e2e8f0'), mono(130, 181, 'sem_email', { tamanho: 11, negrito: true }),
    rect(80, 188, 200, 24, '#ffffff', '#e2e8f0'), mono(96, 205, '0', { tamanho: 11 }), mono(176, 205, '5', { tamanho: 12, negrito: true, cor: '#047857' }),
    alvoRet(168, 188, 60, 24, 4),
    texto(300, 188, '1 linha × 1 coluna', { tamanho: 10.5, cor: CINZA }),
    texto(300, 206, '← é este valor que você digita no portal', { tamanho: 11, cor: LARANJA, negrito: true }),
    texto(34, 266, 'sql("...") é a função criada no código de preparação: ela envia o seu comando', { tamanho: 11 }),
    texto(34, 284, 'ao banco e mostra o resultado como tabela. Os três pares de aspas permitem', { tamanho: 11 }),
    texto(34, 302, 'escrever o comando em várias linhas.', { tamanho: 11 }),
    selo(626, 90, 1, '#b45309'), selo(626, 160, 2, '#b45309'),
  ]),
  legenda([[1, 'Seu comando SQL vai dentro de sql(""" ... """)'], [2, 'O banco devolve uma tabela'], [3, 'Copie o número para o portal']]),
], '#cbd5e1');

// ----------------------------------------------------------------- XAMPP
telas['xampp-mysql'] = svg([
  rect(24, 20, 592, 360, '#ffffff', '#94a3b8', 8),
  rect(24, 20, 592, 28, '#ea580c', null, 8), texto(40, 39, 'XAMPP Control Panel v3', { tamanho: 12, cor: '#ffffff', negrito: true }),
  texto(40, 76, 'Modules', { tamanho: 11, negrito: true, cor: CINZA }), texto(120, 76, 'Module', { tamanho: 11, negrito: true, cor: CINZA }), texto(204, 76, 'PID(s)', { tamanho: 11, negrito: true, cor: CINZA }), texto(266, 76, 'Port(s)', { tamanho: 11, negrito: true, cor: CINZA }), texto(366, 76, 'Actions', { tamanho: 11, negrito: true, cor: CINZA }),
  ...['Apache', 'MySQL', 'FileZilla', 'Mercury', 'Tomcat'].map((m, i) => {
    const y = 90 + i * 40;
    const ativo = m === 'MySQL';
    return [
      rect(34, y, 572, 34, ativo ? '#ecfdf5' : '#f8fafc', '#e2e8f0', 4),
      ativo ? rect(122, y + 6, 70, 22, '#86efac', null, 4) : '',
      texto(128, y + 22, m, { tamanho: 12, negrito: ativo }),
      ativo ? texto(204, y + 22, '4528', { tamanho: 11 }) + texto(266, y + 22, '3306', { tamanho: 11 }) : '',
      rect(366, y + 5, 54, 24, ativo ? '#fde68a' : '#ffffff', '#94a3b8', 4), texto(393, y + 21, ativo ? 'Stop' : 'Start', { tamanho: 11, centro: true, negrito: ativo }),
      ...['Admin', 'Config', 'Logs'].map((b, k) => rect(428 + k * 58, y + 5, 52, 24, '#ffffff', '#cbd5e1', 4) + texto(454 + k * 58, y + 21, b, { tamanho: 10.5, centro: true })),
    ].join('\n');
  }),
  alvoRet(361, 130, 64, 34, 6),
  rect(34, 296, 572, 62, '#fffbeb', '#fcd34d', 8),
  texto(46, 316, 'Clique em Start na linha do MySQL (não precisa do Apache). Quando o nome do módulo', { tamanho: 10.5 }),
  texto(46, 332, 'ficar verde e aparecer a porta 3306, o banco está ligado: o botão passa a ser «Stop».', { tamanho: 10.5 }),
  texto(46, 348, 'Ao terminar o trabalho, clique em Stop para desligar.', { tamanho: 10.5 }),
], '#cbd5e1');

// ----------------------------------------------------------------- Workbench: conexão
telas['workbench-conexao'] = svg([
  rect(24, 20, 592, 360, '#ffffff', '#94a3b8', 8),
  rect(24, 20, 592, 28, '#e2e8f0', null, 8), texto(40, 39, 'MySQL Workbench', { tamanho: 12, negrito: true }),
  texto(48, 84, 'Welcome to MySQL Workbench', { tamanho: 16, negrito: true }),
  texto(48, 116, 'MySQL Connections', { tamanho: 12, negrito: true, cor: '#00758f' }),
  rect(48, 130, 200, 96, '#f1f5f9', '#94a3b8', 8),
  texto(60, 156, 'Local instance MySQL', { tamanho: 12, negrito: true }),
  texto(60, 176, 'root', { tamanho: 10.5, cor: CINZA }), texto(60, 192, 'localhost:3306', { tamanho: 10.5, cor: CINZA }),
  alvoRet(44, 126, 208, 104, 10),
  rect(270, 130, 200, 96, '#f8fafc', '#e2e8f0', 8, 1), texto(370, 184, '+  Nova conexão', { tamanho: 11, cor: CINZA, centro: true }),
  rect(48, 252, 540, 100, '#fffbeb', '#fcd34d', 8),
  texto(60, 274, '1.  Antes, ligue o MySQL no XAMPP (Start na linha do MySQL).', { tamanho: 10.5 }),
  texto(60, 294, '2.  Dê dois cliques no cartão «Local instance MySQL». Se pedir senha e você', { tamanho: 10.5 }),
  texto(60, 310, '     não criou nenhuma, deixe em branco ou pergunte ao instrutor.', { tamanho: 10.5 }),
  texto(60, 330, '3.  Se aparecer «Cannot connect», volte ao XAMPP: o MySQL provavelmente está parado.', { tamanho: 10.5 }),
], '#cbd5e1');

// ----------------------------------------------------------------- Workbench: editor
telas['workbench-editor'] = svg([
  rect(10, 10, 620, 380, '#ffffff', '#94a3b8', 8),
  rect(10, 10, 620, 24, '#e2e8f0', null, 8), texto(24, 27, 'MySQL Workbench   —   Local instance MySQL', { tamanho: 11, negrito: true }),
  rect(10, 34, 620, 28, '#f1f5f9'),
  rect(18, 38, 22, 20, '#ffffff', '#94a3b8', 4), texto(29, 52, 'SQL+', { tamanho: 7.5, centro: true, negrito: true }),
  rect(74, 38, 22, 20, '#fef9c3', '#ca8a04', 4), `  <path d="M87 41 l-6 10 h5 l-2 8 l8 -11 h-5 z" fill="#ca8a04"/>`,
  alvoRet(70, 35, 30, 26, 6),
  rect(10, 62, 130, 240, '#f8fafc', '#e2e8f0'), texto(20, 80, 'SCHEMAS', { tamanho: 10.5, negrito: true, cor: CINZA }),
  texto(20, 100, '▸ atividade', { tamanho: 11, negrito: true }), texto(32, 118, '▸ Tables', { tamanho: 10.5, cor: CINZA }),
  rect(148, 70, 474, 104, '#ffffff', '#cbd5e1', 4),
  ['USE atividade;', '', 'SELECT COUNT(*)', 'FROM clientes_brutos', "WHERE email IS NULL;"].map((l, i) => mono(180, 90 + i * 18, l, { tamanho: 11 })).join('\n'),
  ...[1, 2, 3, 4, 5].map((n, i) => texto(160, 90 + i * 18, String(n), { tamanho: 9.5, cor: CINZA })),
  rect(148, 184, 474, 80, '#ffffff', '#cbd5e1', 4),
  rect(148, 184, 474, 20, '#e2e8f0'), mono(170, 198, 'COUNT(*)', { tamanho: 10.5, negrito: true }),
  mono(170, 222, '5', { tamanho: 12, negrito: true, cor: '#047857' }),
  texto(252, 222, '← o número que você digita no portal', { tamanho: 10.5, cor: LARANJA, negrito: true }),
  rect(148, 270, 474, 30, '#f8fafc', '#e2e8f0', 4), texto(160, 290, '✓ 1 row(s) returned   0,0004 sec   (Action Output)', { tamanho: 10.5, cor: '#047857' }),
  selo(160, 74, 1, '#b45309'), selo(112, 38, 2, '#b45309'), selo(26, 82, 3, '#b45309'), selo(612, 188, 4, '#b45309'), selo(612, 274, 5, '#b45309'),
  rect(20, 316, 600, 62, '#fffbeb', '#fcd34d', 8),
  texto(32, 335, '1 Editor: escreva o script   2 Raio: executa (Ctrl + Enter executa só o comando onde está o cursor)', { tamanho: 9.8 }),
  texto(32, 351, '3 Painel SCHEMAS: confira o banco e as tabelas (clique no ícone de atualizar)   4 Resultado   5 Mensagem do banco', { tamanho: 9.8 }),
  texto(32, 367, 'Para executar o script inteiro (vários comandos), use Ctrl + Shift + Enter.', { tamanho: 9.8 }),
], '#cbd5e1');

// ----------------------------------------------------------------- copiar a planilha do portal
telas['copiar-planilha'] = svg([
  rect(14, 14, 612, 372, '#ffffff', '#cbd5e1', 10),
  texto(34, 44, 'Na atividade, abaixo da tabela de dados:', { tamanho: 13, negrito: true }),
  rect(34, 60, 572, 24, '#0b2a6b'),
  ...['mes', 'filial', 'faturamento', 'dias_uteis_com_promocao'].map((c, i) => texto(46 + i * 130, 77, c, { tamanho: 10.5, cor: '#ffffff', negrito: true })),
  ...[['jan/2025', 'Centro', '43120.5', '6'], ['jan/2025', 'Shopping', '51480', '5'], ['fev/2025', 'Centro', '(vazio)', '8']].map((l, r) =>
    rect(34, 84 + r * 24, 572, 24, '#ffffff', '#e2e8f0') + l.map((c, i) => texto(46 + i * 130, 100 + r * 24, c, { tamanho: 10.5 })).join('\n')),
  rect(34, 164, 250, 28, '#ffffff', '#94a3b8', 6), texto(46, 182, 'Copiar planilha para colar no Excel', { tamanho: 10.5, negrito: true }),
  alvoRet(30, 160, 258, 36, 8),
  texto(34, 228, 'Depois do clique:', { tamanho: 12, negrito: true }),
  texto(34, 252, '1.  O portal copia a tabela inteira (cada coluna separada por tabulação).', { tamanho: 11 }),
  texto(34, 272, '2.  Abra o Excel (ou os Planilhas Google), clique na célula A1 e aperte Ctrl + V.', { tamanho: 11 }),
  texto(34, 292, '3.  Para o Python/SQL: Arquivo > Salvar como > «CSV UTF-8 (delimitado por vírgulas)».', { tamanho: 11 }),
  texto(34, 320, 'Mais simples: use o «código pronto» do guia, que já cria a tabela sozinho.', { tamanho: 11, cor: '#047857', negrito: true }),
  etiqueta(34, 336, 'Ctrl + V cola na A1'),
], '#cbd5e1');
