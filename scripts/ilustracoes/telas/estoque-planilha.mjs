// Ilustrações das atividades de planilha de estoque (src/assets/atividades/compras-estoque/):
// planilha configurada, validação de dados, formatação condicional, PROCV e linha com erro.
import { alvoRet, botao, caixaSelecao, esc, janelaOffice, selo, svg, texto } from '../pecas.mjs';
import { ABAS_EXCEL, EXCEL } from '../passo-a-passo-comum.mjs';

export const destino = 'compras-estoque';
export const telas = {};

const VERDE = '#217346';
const CINZA = '#6b7280';
const rect = (x, y, w, h, fill, stroke = null, rx = 0) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`;

/** Planilha com colunas de largura livre. `fundos`: { 'coluna,linha': cor } ; `negritos`: linhas em negrito. */
function folha({ colunas, linhas, selecionada = null, fundos = {}, cores = {}, barra = '', y0 = 126 }) {
  const partes = [rect(20, y0, 600, 258, '#ffffff'),
    rect(26, y0 + 2, 62, 18, '#ffffff', '#cbd5e1', 2), texto(34, y0 + 15, selecionada ? selecionada.ref : '', { tamanho: 11 }),
    texto(100, y0 + 15, 'fx', { tamanho: 11, cor: CINZA }), texto(124, y0 + 15, barra, { tamanho: 11.5 }),
    rect(20, y0 + 22, 600, 20, '#f3f4f6'), rect(20, y0 + 42, 26, 216, '#f3f4f6'),
  ];
  let x = 46;
  const xs = [];
  colunas.forEach((c, i) => {
    xs.push(x);
    const sel = selecionada && selecionada.col === i;
    partes.push(rect(x, y0 + 22, c.largura, 20, sel ? '#d1fae5' : '#f3f4f6', '#e5e7eb'));
    partes.push(texto(x + c.largura / 2, y0 + 36, String.fromCharCode(65 + i), { tamanho: 10.5, centro: true, cor: sel ? VERDE : CINZA, negrito: sel }));
    x += c.largura;
  });
  const fim = x;
  const cab = y0 + 42;
  partes.push(rect(46, cab, fim - 46, 22, '#e2efe6'));
  colunas.forEach((c, i) => partes.push(texto(xs[i] + 6, cab + 15, c.titulo, { tamanho: 10.5, negrito: true })));
  linhas.forEach((l, r) => {
    const y = cab + 22 + r * 22;
    partes.push(texto(33, y + 15, String(r + 2), { tamanho: 10, centro: true, cor: CINZA }));
    l.forEach((v, i) => {
      const f = fundos[`${i},${r}`];
      if (f) partes.push(rect(xs[i], y, colunas[i].largura, 22, f));
      const numero = typeof v === 'number' || /^[\d.,]+$/.test(String(v));
      const cor = cores[`${i},${r}`] ?? '#1f2937';
      partes.push(numero
        ? `  <text x="${xs[i] + colunas[i].largura - 6}" y="${y + 15}" font-size="11" fill="${cor}" text-anchor="end">${esc(v)}</text>`
        : `  <text x="${xs[i] + 6}" y="${y + 15}" font-size="11" fill="${cor}">${esc(v)}</text>`);
    });
  });
  partes.push('  <g stroke="#e5e7eb">');
  for (let i = 0; i <= linhas.length + 1; i++) partes.push(`    <line x1="46" y1="${cab + i * 22}" x2="${fim}" y2="${cab + i * 22}"/>`);
  xs.concat([fim]).forEach((x1) => partes.push(`    <line x1="${x1}" y1="${y0 + 22}" x2="${x1}" y2="${cab + (linhas.length + 1) * 22}"/>`));
  partes.push('  </g>');
  if (selecionada) {
    const x1 = xs[selecionada.col];
    const y1 = cab + 22 + selecionada.linha * 22;
    partes.push(`  <rect x="${x1}" y="${y1}" width="${colunas[selecionada.col].largura}" height="22" fill="none" stroke="${VERDE}" stroke-width="3"/>`);
  }
  return { html: partes.join('\n'), xs, cab, fim };
}

const legenda = (itens) => {
  const altura = 12 + itens.length * 18;
  const y = 384 - altura;
  return [
    rect(20, y, 600, altura, '#fffbeb', '#fcd34d', 8),
    ...itens.map(([n, rotulo], i) => `${selo(34, y + 15 + i * 18, n, '#b45309')}\n${texto(50, y + 19 + i * 18, rotulo, { tamanho: 10.5 })}`),
  ].join('\n');
};

const COLS = [{ titulo: 'Código', largura: 66 }, { titulo: 'Descrição', largura: 128 }, { titulo: 'Saldo', largura: 46 }, { titulo: 'Mínimo', largura: 54 }, { titulo: 'Custo (R$)', largura: 70 }, { titulo: 'Valor em estoque', largura: 112 }, { titulo: 'Situação', largura: 66 }];
const LINHAS = [
  ['EST-001', 'Papel A4 (resma)', 84, 40, '21,50', '1.806,00', 'OK'],
  ['EST-002', 'Caneta azul (cx 50)', 22, 25, '38,90', '855,80', 'REPOR'],
  ['EST-003', 'Grampeador de mesa', 31, 12, '17,20', '533,20', 'OK'],
  ['EST-004', 'Clips 2/0 (cx)', 9, 15, '4,80', '43,20', 'REPOR'],
  ['EST-005', 'Pasta suspensa (cx)', 47, 20, '29,00', '1.363,00', 'OK'],
];

// ------------------------------------------------------------ planilha pronta
{
  const f = folha({
    colunas: COLS, linhas: LINHAS, selecionada: { ref: 'G2', col: 6, linha: 0 },
    barra: '=SE(C2<=D2;"REPOR";"OK")',
    fundos: Object.fromEntries([...LINHAS.map((_, r) => [`5,${r}`, '#eaf2fb']), ...LINHAS.map((l, r) => [`6,${r}`, l[6] === 'REPOR' ? '#fecaca' : '#eaf2fb'])]),
    cores: Object.fromEntries(LINHAS.map((l, r) => [`6,${r}`, l[6] === 'REPOR' ? '#991b1b' : '#1f2937'])),
  });
  telas['estoque-planilha-pronta'] = svg([
    janelaOffice(EXCEL, 'Controle de Estoque.xlsx — Cadastro', { abas: ABAS_EXCEL, aba: 'Página Inicial' }),
    f.html,
    alvoRet(46, f.cab - 2, f.fim - 46, 24, 4),
    selo(54, f.cab - 8, 1, '#b45309'), selo(f.xs[5] + 8, f.cab - 8, 2, '#b45309'), selo(f.xs[6] + 56, f.cab + 28, 3, '#b45309'),
    legenda([[1, 'Linha de títulos congelada (Exibir > Congelar Painéis)'], [2, 'Colunas azuis são fórmulas: não se digita nada'], [3, 'REPOR em vermelho: formatação condicional']]),
  ], '#cbd5e1');
}

// ------------------------------------------------------------ validação de dados
{
  const f = folha({
    colunas: [{ titulo: 'Data', largura: 76 }, { titulo: 'Documento', largura: 90 }, { titulo: 'Código', largura: 76 }, { titulo: 'Tipo', largura: 96 }, { titulo: 'Qtd', largura: 56 }],
    linhas: [['02/09/2025', 'NF-4101', 'EST-014', 'Entrada', 40], ['02/09/2025', 'REQ-900', 'EST-031', 'Saída', 6], ['03/09/2025', 'BX-31', 'EST-048', '', ''], ['', '', '', '', ''], ['', '', '', '', '']],
    selecionada: { ref: 'D4', col: 3, linha: 2 }, barra: '',
  });
  telas['estoque-validacao'] = svg([
    janelaOffice(EXCEL, 'Controle de Estoque.xlsx — Movimentos', { abas: ABAS_EXCEL, aba: 'Dados' }),
    f.html,
    `  <g filter="url(#sombra)"><rect x="340" y="150" width="270" height="150" rx="8" fill="#f9fafb" stroke="#cbd5e1"/></g>`,
    texto(354, 170, 'Validação de dados', { tamanho: 11.5 }),
    rect(350, 178, 250, 1, '#d1d5db'),
    texto(356, 198, 'Configurações', { tamanho: 10.5, negrito: true, cor: '#0b4a9e' }),
    texto(356, 220, 'Permitir:', { tamanho: 10.5 }), rect(404, 206, 120, 20, '#ffffff', '#6b7280', 2), texto(412, 220, 'Lista', { tamanho: 10.5 }), alvoRet(400, 203, 128, 26, 5),
    texto(356, 248, 'Fonte:', { tamanho: 10.5 }), rect(398, 234, 196, 20, '#ffffff', '#6b7280', 2), texto(404, 248, 'Entrada;Saída;Baixa;Devolução', { tamanho: 9.8 }), alvoRet(394, 231, 204, 26, 5),
    caixaSelecao(356, 272, 'Ignorar em branco', { marcada: true }), caixaSelecao(470, 272, 'Menu suspenso', { marcada: true }),
    botao(468, 276, 'OK', { primario: true, largura: 50 }), botao(526, 276, 'Cancelar', { largura: 70 }),
    selo(f.xs[3] + 30, f.cab - 8, 1, '#b45309'), selo(536, 216, 2, '#b45309'), selo(606, 238, 3, '#b45309'),
    legenda([[1, 'Selecione as células da coluna Tipo e abra Dados > Validação de Dados'], [2, 'Em Permitir, escolha Lista'], [3, 'Em Fonte, digite as opções separadas por ponto e vírgula']]),
  ], '#cbd5e1');
}

// ------------------------------------------------------------ formatação condicional
{
  const f = folha({
    colunas: COLS, linhas: LINHAS.slice(0, 4), selecionada: { ref: 'G2', col: 6, linha: 0 }, barra: '=SE(C2<=D2;"REPOR";"OK")',
  });
  telas['estoque-formatacao'] = svg([
    janelaOffice(EXCEL, 'Controle de Estoque.xlsx — Cadastro', { abas: ABAS_EXCEL, aba: 'Página Inicial' }),
    f.html,
    `  <g filter="url(#sombra)"><rect x="130" y="160" width="380" height="150" rx="8" fill="#f9fafb" stroke="#cbd5e1"/></g>`,
    texto(144, 180, 'Texto que Contém', { tamanho: 11.5 }),
    texto(144, 202, 'Formatar células que contêm o texto:', { tamanho: 10.5 }),
    rect(144, 210, 150, 22, '#ffffff', '#6b7280', 2), texto(152, 226, 'REPOR', { tamanho: 11, negrito: true }), alvoRet(140, 207, 158, 28, 5),
    texto(144, 254, 'com', { tamanho: 10.5 }), rect(170, 241, 328, 22, '#ffffff', '#6b7280', 2), rect(174, 245, 14, 14, '#fecaca', '#991b1b'),
    texto(194, 256, 'Preenchimento vermelho claro e texto vermelho escuro', { tamanho: 9.5 }), alvoRet(166, 238, 336, 28, 5),
    botao(364, 276, 'OK', { primario: true, largura: 60 }), botao(432, 276, 'Cancelar', { largura: 70 }),
    selo(306, 220, 1, '#b45309'), selo(506, 250, 2, '#b45309'),
    legenda([[1, 'Página Inicial > Formatação Condicional > Realçar Regras das Células > Texto que Contém'], [2, 'Escolha a cor do alerta: ela muda sozinha quando o saldo muda']]),
  ], '#cbd5e1');
}

// ------------------------------------------------------------ PROCV
{
  const f = folha({
    colunas: [{ titulo: 'Consulta', largura: 130 }, { titulo: 'Resultado', largura: 190 }, { titulo: 'Fórmula usada', largura: 220 }],
    linhas: [
      ['Código digitado', 'EST-002', 'o código vem da digitação'],
      ['Descrição', 'Caneta azul (cx 50)', '=PROCV($B$2;Cadastro!$A:$G;2;FALSO)'],
      ['Saldo', '22', '=PROCV($B$2;Cadastro!$A:$G;3;FALSO)'],
      ['Custo (R$)', '38,90', '=PROCV($B$2;Cadastro!$A:$G;5;FALSO)'],
    ],
    selecionada: { ref: 'B3', col: 1, linha: 1 }, barra: '=PROCV($B$2;Cadastro!$A:$G;2;FALSO)',
  });
  telas['estoque-procv'] = svg([
    janelaOffice(EXCEL, 'Controle de Estoque.xlsx — Consulta', { abas: ABAS_EXCEL, aba: 'Página Inicial' }),
    f.html,
    rect(20, 258, 600, 46, '#ecfdf5', '#86efac', 8),
    texto(32, 276, 'PROCV(o que procurar; onde procurar; número da coluna; FALSO)', { tamanho: 11, negrito: true }),
    texto(32, 294, 'FALSO pede o código EXATO: sem ele, o Excel pode devolver o item errado.', { tamanho: 10.5 }),
    selo(f.xs[1] + 100, f.cab + 28 + 22, 1, '#b45309'),
    legenda([[1, 'O que você digita é só o código (B2)'], [2, 'As demais células são fórmulas e buscam na aba Cadastro']]),
  ], '#cbd5e1');
}

// ------------------------------------------------------------ linha com código errado
{
  const f = folha({
    colunas: [{ titulo: 'Data', largura: 74 }, { titulo: 'Documento', largura: 82 }, { titulo: 'Código', largura: 72 }, { titulo: 'Descrição', largura: 170 }, { titulo: 'Tipo', largura: 62 }, { titulo: 'Qtd', largura: 40 }, { titulo: 'Alerta', largura: 100 }],
    linhas: [
      ['05/09/2025', 'REQ-1198', 'EST-014', 'Lâmpada LED 9 W', 'Saída', 6, 'OK'],
      ['06/09/2025', 'REQ-1201', 'EST-O17', 'CÓDIGO NÃO ENCONTRADO', 'Saída', 5, 'CORRIGIR'],
      ['06/09/2025', 'REQ-1202', 'EST-052', 'Luva nitrílica (cx)', 'Saída', 3, 'OK'],
      ['07/09/2025', 'NF-4237', 'EST-031', 'Papel toalha (pct)', 'Entrada', 40, 'OK'],
    ],
    selecionada: { ref: 'C3', col: 2, linha: 1 }, barra: 'EST-O17',
    fundos: { '3,1': '#fecaca', '6,1': '#fecaca' }, cores: { '3,1': '#991b1b', '6,1': '#991b1b' },
  });
  telas['estoque-erro-codigo'] = svg([
    janelaOffice(EXCEL, 'Controle de Estoque.xlsx — Movimentos', { abas: ABAS_EXCEL, aba: 'Página Inicial' }),
    f.html,
    alvoRet(f.xs[2] - 2, f.cab + 22 + 22 - 2, 76, 26, 4),
    rect(20, 258, 600, 66, '#fffbeb', '#fcd34d', 8),
    texto(32, 276, 'EST-O17: a letra O foi digitada no lugar do zero (EST-017).', { tamanho: 11, negrito: true }),
    texto(32, 294, 'O PROCV não acha o código e a descrição mostra «CÓDIGO NÃO ENCONTRADO».', { tamanho: 10.5 }),
    texto(32, 312, 'Corrija o código conferindo o documento de papel; nunca apague a linha sem registrar o motivo.', { tamanho: 10.5 }),
    selo(f.xs[2] + 14, f.cab + 14, 1, '#b45309'), selo(f.xs[6] + 90, f.cab + 14, 2, '#b45309'),
    legenda([[1, 'Código com erro de digitação'], [2, 'O alerta avisa na hora']]),
  ], '#cbd5e1');
}
