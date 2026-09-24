// Passo a Passo — Excel básico: tabela, negrito, + − * /, AutoSoma, MÉDIA e SE.
import { FAIXA, certo, etiqueta, faixaFonte, gradeExcel, svg, teclaGrande, texto } from '../pecas.mjs';
import {
  ABAS_EXCEL, EXCEL, FUNDO_TECLA, alvoCelula, alvoPos, intervaloCelulas, mouseCanto, telaOffice,
} from '../passo-a-passo-comum.mjs';

export const destino = 'passo-a-passo';
export const telas = {};

const excel = (grade, { faixa = {} } = {}, ...trechos) => svg([
  telaOffice(EXCEL, 'Pasta1 - Excel', ABAS_EXCEL, { faixa: faixaFonte({ autoSoma: true, ...faixa }) }),
  gradeExcel(grade),
  ...trechos,
]);
const OK = certo(540, 290);

telas['tecla-tab'] = svg([teclaGrande(320, 170, 'Tab ⇥', 220), texto(320, 280, 'do lado esquerdo do teclado', { tamanho: 20, centro: true })], FUNDO_TECLA);
telas['tecla-igual'] = svg([teclaGrande(320, 170, '=', 130), texto(320, 280, 'perto da tecla Backspace', { tamanho: 20, centro: true })], FUNDO_TECLA);

// ---------------- Tabela pequena ----------------

const T1 = { A1: 'Fruta' };
const T2 = { ...T1, B1: 'Quantidade' };
const T3 = { ...T2, A2: 'Maçã' };
const T4 = { ...T3, B2: '5' };
const T5 = { ...T4, A3: 'Banana' };
const T6 = { ...T5, B3: '8' };
telas['excel-t-fruta'] = excel({ valores: T1, selecionada: 'A1', editando: true });
telas['excel-t-quantidade'] = excel({ valores: T2, selecionada: 'B1', editando: true });
telas['excel-t-a2'] = excel({ valores: T2, selecionada: 'A2' }, {}, etiqueta(140, 204, 'linha de baixo'));
telas['excel-t-maca'] = excel({ valores: T3, selecionada: 'A2', editando: true });
telas['excel-t-5'] = excel({ valores: T4, selecionada: 'B2', editando: true });
telas['excel-t-banana'] = excel({ valores: T5, selecionada: 'A3', editando: true });
telas['excel-t-8'] = excel({ valores: T6, selecionada: 'B3', editando: true });
telas['excel-t-pronto'] = excel({ valores: T6, selecionada: 'A4' }, {}, OK);

// ---------------- Negrito no título ----------------

telas['excel-n-clique-a1'] = excel({ valores: T6 }, {}, alvoCelula('A1'), mouseCanto());
telas['excel-n-botao'] = excel({ valores: T6, selecionada: 'A1' }, {}, alvoPos(FAIXA.negrito));
telas['excel-n-fruta'] = excel({ valores: T6, selecionada: 'A1', negritos: ['A1'] }, { faixa: { ativos: ['negrito'] } }, etiqueta(300, 164, 'letra grossa'));
telas['excel-n-clique-b1'] = excel({ valores: T6, negritos: ['A1'] }, {}, alvoCelula('B1'), mouseCanto());
telas['excel-n-botao-2'] = excel({ valores: T6, selecionada: 'B1', negritos: ['A1'] }, {}, alvoPos(FAIXA.negrito));
telas['excel-n-pronto'] = excel({ valores: T6, negritos: ['A1', 'B1'] }, {}, OK);

// ---------------- Contas: + − * / ----------------
// Mesma sequência nas quatro: dois números, = , clicar no primeiro, sinal, clicar no segundo, Enter.

function conta(prefixo, a, b, sinal, resultado) {
  const base = { A1: a, B1: b };
  const f = (formula) => ({ valores: base, formulas: { C1: formula }, selecionada: 'C1', editando: true });
  telas[`${prefixo}-a1`] = excel({ valores: { A1: a }, selecionada: 'B1' });
  telas[`${prefixo}-b1`] = excel({ valores: base, selecionada: 'C1' });
  telas[`${prefixo}-igual`] = excel(f('='));
  telas[`${prefixo}-clique-a1`] = excel(f('=A1'), {}, alvoCelula('A1'));
  telas[`${prefixo}-sinal`] = excel(f(`=A1${sinal}`));
  telas[`${prefixo}-clique-b1`] = excel(f(`=A1${sinal}B1`), {}, alvoCelula('B1'));
  telas[`${prefixo}-resultado`] = excel(
    { valores: { ...base, C1: resultado }, formulas: { C1: `=A1${sinal}B1` }, selecionada: 'C1' }, {}, etiqueta(300, 196, 'resultado'), OK,
  );
}
conta('excel-soma', '7', '5', '+', '12');
conta('excel-sub', '10', '3', '-', '7');
conta('excel-mult', '4', '3', '*', '12');
conta('excel-div', '20', '4', '/', '5');

telas['tecla-mais'] = svg([
  teclaGrande(215, 170, 'Shift', 190), texto(335, 184, '+', { tamanho: 40, negrito: true, centro: true }), teclaGrande(440, 170, '= +', 130),
  texto(320, 300, 'dá o sinal de mais', { tamanho: 26, negrito: true, centro: true }),
], FUNDO_TECLA);
telas['tecla-menos'] = svg([teclaGrande(320, 170, '−', 130), texto(320, 280, 'do lado direito do número 0', { tamanho: 20, centro: true })], FUNDO_TECLA);
telas['tecla-vezes'] = svg([
  teclaGrande(215, 170, 'Shift', 190), texto(335, 184, '+', { tamanho: 40, negrito: true, centro: true }), teclaGrande(440, 170, '8 *', 130),
  texto(320, 300, 'dá o asterisco *', { tamanho: 26, negrito: true, centro: true }),
], FUNDO_TECLA);
telas['tecla-dividir'] = svg([teclaGrande(320, 170, '/', 130), texto(320, 280, 'do lado esquerdo do Shift da direita', { tamanho: 20, centro: true })], FUNDO_TECLA);

// ---------------- AutoSoma (SOMA) ----------------

const COLUNA = { A1: '2', A2: '4', A3: '6', A4: '8' };
telas['excel-as-valores'] = excel({ valores: COLUNA, selecionada: 'A5' });
telas['excel-as-clique-a5'] = excel({ valores: COLUNA }, {}, alvoCelula('A5'), mouseCanto());
telas['excel-as-botao'] = excel({ valores: COLUNA, selecionada: 'A5' }, {}, alvoPos(FAIXA.autoSoma));
telas['excel-as-formula'] = excel(
  { valores: COLUNA, formulas: { A5: '=SOMA(A1:A4)' }, selecionada: 'A5', editando: true }, {},
  intervaloCelulas('A1', 'A4'), etiqueta(140, 200, 'do A1 até o A4'),
);
telas['excel-as-resultado'] = excel({ valores: { ...COLUNA, A5: '20' }, formulas: { A5: '=SOMA(A1:A4)' }, selecionada: 'A5' }, {}, OK);

// ---------------- MÉDIA ----------------

const NOTAS = { A1: '6', A2: '8', A3: '10' };
const media = (formula, ...extra) => excel({ valores: NOTAS, formulas: { A4: formula }, selecionada: 'A4', editando: true }, {}, ...extra);
telas['excel-md-valores'] = excel({ valores: NOTAS, selecionada: 'A4' });
telas['excel-md-clique-a4'] = excel({ valores: NOTAS }, {}, alvoCelula('A4'), mouseCanto());
telas['excel-md-inicio'] = media('=MÉDIA(');
telas['excel-md-intervalo'] = media('=MÉDIA(A1:A3', intervaloCelulas('A1', 'A3'), etiqueta(140, 180, 'do A1 até o A3'));
telas['excel-md-fechar'] = media('=MÉDIA(A1:A3)');
telas['excel-md-resultado'] = excel({ valores: { ...NOTAS, A4: '8' }, formulas: { A4: '=MÉDIA(A1:A3)' }, selecionada: 'A4' }, {}, OK);

// ---------------- SE ----------------

const FORMULA_SE = '=SE(A1>=6;"Passou";"Estudar mais")';
const se = (formula, nota = '7') => excel({ valores: { A1: nota }, formulas: { B1: formula }, selecionada: 'B1', editando: true });
telas['excel-se-nota'] = excel({ valores: { A1: '7' }, selecionada: 'A2' }, {}, etiqueta(140, 164, 'nota'));
telas['excel-se-clique-b1'] = excel({ valores: { A1: '7' } }, {}, alvoCelula('B1'), mouseCanto());
telas['excel-se-pergunta'] = se('=SE(A1>=6;');
telas['excel-se-passou'] = se('=SE(A1>=6;"Passou";');
telas['excel-se-estudar'] = se(FORMULA_SE);
telas['excel-se-resultado'] = excel({ valores: { A1: '7', B1: 'Passou' }, formulas: { B1: FORMULA_SE }, selecionada: 'B1' }, {}, OK);
telas['excel-se-nota-4'] = excel({ valores: { A1: '4', B1: 'Estudar mais' }, selecionada: 'A2' }, {}, etiqueta(300, 164, 'mudou sozinho'));
telas['excel-se-pronto'] = excel({ valores: { A1: '4', B1: 'Estudar mais' }, formulas: { B1: FORMULA_SE }, selecionada: 'B1' }, {}, OK);
