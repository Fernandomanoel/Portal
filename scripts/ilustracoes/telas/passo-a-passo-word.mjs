// Passo a Passo — Word básico: tamanho, N I S, cor, tipo de letra, alinhar, lista, salvar, abrir, imprimir.
import {
  FAIXA, POS_IMPRIMIR, POS_PROCURAR, POS_SALVAR, alvo, bastidoresOffice, certo, conteudoAbrir, conteudoImprimir,
  conteudoSalvarComo, cursor, dialogoSalvar, etiqueta, faixaFonte, inicioOffice, menu, mouseBotao, paginaWord,
  posicaoAba, posicaoBastidores, posicaoRecente, svg, texto,
} from '../pecas.mjs';
import { ABAS_WORD, WORD, alvoItem, alvoPos, atalho, telaOffice } from '../passo-a-passo-comum.mjs';

export const destino = 'passo-a-passo';
export const telas = {};

const NOME = 'Ana Souza';
/** Janela do Word com a folha. `faixa`: opções de faixaFonte; `linhas`: como em paginaWord. */
const word = ({ faixa = {}, linhas = [NOME], titulo = 'Documento1 - Word', risco = null } = {}, ...trechos) => svg([
  telaOffice(WORD, titulo, ABAS_WORD, { faixa: faixaFonte(faixa) }),
  paginaWord({ linhas, riscoEm: risco }),
  ...trechos,
]);
const cliqueVazio = (opcoes) => word(opcoes, alvo(320, 320, 22), cursor(320, 320), mouseBotao(522, 250, 'esquerdo'));
const pronto = (opcoes) => word(opcoes, certo(540, 250));

telas['atalho-ctrl-a'] = atalho('A', 'Marcar tudo');
telas['word-nome-selecionado'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, etiqueta(300, 210, 'marcado de azul'));

// ---------------- Letra maior ----------------

const TAMANHOS = ['8', '10', '11', '12', '14', '18', '24', '28', '36'].map((t) => [t, '', t === '28']);
const nome28 = (extra = {}) => ({ faixa: { tamanho: '28' }, linhas: [{ texto: NOME, tamanho: 28, ...extra }] });
telas['word-clique-tamanho'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, alvoPos(FAIXA.tamanho));
telas['word-lista-28'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, menu(152, 104, TAMANHOS, 60), alvoItem(152, 104, TAMANHOS, '28', 60));
telas['word-nome-28'] = word(nome28({ selecionado: true }));
telas['word-28-clique-vazio'] = cliqueVazio(nome28());
telas['word-28-pronto'] = pronto(nome28());

// ---------------- Negrito, itálico e sublinhado ----------------

const nis = (ativos, extra = {}) => ({
  faixa: { ativos },
  linhas: [{
    texto: NOME, negrito: ativos.includes('negrito'), italico: ativos.includes('italico'),
    sublinhado: ativos.includes('sublinhado'), ...extra,
  }],
});
telas['word-clique-n'] = word(nis([], { selecionado: true }), alvoPos(FAIXA.negrito));
telas['word-negrito'] = word(nis(['negrito'], { selecionado: true }), etiqueta(290, 214, 'letra grossa'));
telas['word-clique-i'] = word(nis(['negrito'], { selecionado: true }), alvoPos(FAIXA.italico));
telas['word-italico'] = word(nis(['negrito', 'italico'], { selecionado: true }), etiqueta(290, 214, 'letra deitada'));
telas['word-clique-s'] = word(nis(['negrito', 'italico'], { selecionado: true }), alvoPos(FAIXA.sublinhado));
telas['word-sublinhado'] = word(nis(['negrito', 'italico', 'sublinhado'], { selecionado: true }), etiqueta(290, 214, 'risco embaixo'));
telas['word-nis-clique-vazio'] = cliqueVazio(nis(['negrito', 'italico', 'sublinhado']));
telas['word-nis-pronto'] = pronto(nis(['negrito', 'italico', 'sublinhado']));

// ---------------- Cor da letra ----------------

const CORES = ['#7f1d1d', '#dc2626', '#f97316', '#facc15', '#84cc16', '#16a34a', '#38bdf8', '#1d4ed8', '#1e3a8a', '#7c3aed'];
const AZUL = 7;
const paleta = () => [
  '  <g filter="url(#sombra)"><rect x="270" y="104" width="196" height="64" rx="6" fill="#ffffff" stroke="#d4d4d8"/></g>',
  texto(280, 122, 'Cores Padrão', { tamanho: 11, negrito: true }),
  ...CORES.map((cor, i) => `  <rect x="${280 + i * 18}" y="132" width="16" height="16" fill="${cor}" stroke="#ffffff"/>`),
].join('\n');
const azul = (extra = {}) => ({ faixa: { corLetra: CORES[AZUL] }, linhas: [{ texto: NOME, cor: CORES[AZUL], ...extra }] });
telas['word-clique-cor'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, alvoPos(FAIXA.cor));
telas['word-paleta-azul'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, paleta(), alvo(288 + AZUL * 18, 140, 14));
telas['word-azul'] = word(azul({ selecionado: true }));
telas['word-azul-clique-vazio'] = cliqueVazio(azul());
telas['word-azul-pronto'] = pronto(azul());

// ---------------- Tipo de letra ----------------

const FONTES = [['Arial', '', false], ['Calibri', '', false], ['Comic Sans MS', '', true], ['Times New Roman', '', false], ['Verdana', '', false]];
const COMIC = 'Comic Sans MS, Comic Neue, cursive';
const comic = (extra = {}) => ({ faixa: { fonte: 'Comic Sans MS' }, linhas: [{ texto: NOME, fonte: COMIC, ...extra }] });
telas['word-clique-fonte'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, alvoPos(FAIXA.fonte));
telas['word-lista-fontes'] = word({ linhas: [{ texto: NOME, selecionado: true }] }, menu(34, 104, FONTES, 180), alvoItem(34, 104, FONTES, 'Comic Sans MS', 180));
telas['word-comic'] = word(comic({ selecionado: true }), etiqueta(290, 214, 'outro jeito de letra'));
telas['word-comic-clique-vazio'] = cliqueVazio(comic());
telas['word-comic-pronto'] = pronto(comic());

// ---------------- Centralizar ----------------

const alinhado = (alinhar, ativo) => ({ faixa: { ativos: [ativo] }, linhas: [{ texto: NOME, alinhar }] });
telas['word-nome-esquerda'] = word({}, etiqueta(196, 200, 'lado esquerdo'));
telas['word-clique-nome'] = word({}, alvo(240, 174, 20), cursor(240, 174), mouseBotao(522, 250, 'esquerdo'));
telas['word-clique-centro'] = word({ faixa: { ativos: ['esquerda'] } }, alvoPos(FAIXA.centro));
telas['word-centro'] = word(alinhado('centro', 'centro'), etiqueta(320, 200, 'no meio', { centro: true }));
telas['word-clique-direita'] = word(alinhado('centro', 'centro'), alvoPos(FAIXA.direita));
telas['word-direita'] = word(alinhado('direita', 'direita'), etiqueta(444, 200, 'lado direito', { centro: true }));
telas['word-clique-centro-2'] = word(alinhado('direita', 'direita'), alvoPos(FAIXA.centro));
telas['word-centro-pronto'] = pronto(alinhado('centro', 'centro'));

// ---------------- Lista com marcadores ----------------

const FIM_NOME = { x: 196 + NOME.length * 18 * 0.55 + 2, y: 180 };
telas['word-clique-fim-nome'] = word({}, alvo(FIM_NOME.x, 174, 16), cursor(FIM_NOME.x, 174));
telas['word-clique-marcadores'] = word({ risco: { x: 198, y: 208 } }, alvoPos(FAIXA.marcadores));
const lista = (itens, extra = {}) => ({ faixa: { ativos: ['marcadores'] }, linhas: [NOME, ...itens.map((t) => ({ texto: t, marcador: true }))], ...extra });
telas['word-lista-bolinha'] = word(lista(['']), etiqueta(236, 196, 'bolinha'));
telas['word-lista-1'] = word(lista(['Arroz']));
telas['word-lista-nova-bolinha'] = word(lista(['Arroz', '']));
telas['word-lista-2'] = word(lista(['Arroz', 'Feijão']));
telas['word-lista-pronto'] = pronto(lista(['Arroz', 'Feijão']));

// ---------------- Salvar ----------------

const ABA_ARQUIVO = posicaoAba('Arquivo', ABAS_WORD);
telas['word-clique-arquivo'] = word({}, alvoPos(ABA_ARQUIVO, 4));
telas['word-bastidores-salvar-como'] = svg([bastidoresOffice(WORD, 'Início'), alvoPos(posicaoBastidores('Salvar como'), 3)]);
telas['word-clique-procurar'] = svg([bastidoresOffice(WORD, 'Salvar como', conteudoSalvarComo()), alvoPos(POS_PROCURAR)]);
telas['word-salvar-nome'] = word({}, dialogoSalvar('meu-nome'), alvoPos(POS_SALVAR.nome));
telas['word-salvar-botao'] = word({}, dialogoSalvar('meu-nome', { editando: false }), alvoPos(POS_SALVAR.salvar));
telas['word-salvo'] = word({ titulo: 'meu-nome - Word' }, etiqueta(252, 48, 'nome do arquivo'), certo(540, 250));

// ---------------- Abrir um documento salvo ----------------

telas['word-inicio-abrir'] = svg([inicioOffice(WORD, ['Documento', 'em branco']), alvoPos({ x: 28, y: 138, largura: 82, altura: 22 }, 4)]);
telas['word-abrir-arquivo'] = svg([
  bastidoresOffice(WORD, 'Abrir', conteudoAbrir(WORD, ['meu-nome', 'trabalho-da-escola'])), alvoPos(posicaoRecente(0), 4),
]);

// ---------------- Imprimir ----------------

const impressora = (folhaSaindo) => `  <rect x="220" y="150" width="200" height="100" rx="14" fill="#e5e7eb" stroke="#64748b" stroke-width="3"/>
  <rect x="256" y="96" width="128" height="60" fill="#ffffff" stroke="#64748b" stroke-width="3"/>
  <rect x="240" y="226" width="160" height="10" rx="4" fill="#94a3b8"/>
  <circle cx="392" cy="176" r="7" fill="#16a34a"/>
  ${folhaSaindo ? `<rect x="258" y="236" width="124" height="96" fill="#ffffff" stroke="#64748b" stroke-width="3"/>
  ${texto(274, 266, NOME, { tamanho: 14 })}` : ''}`;
telas['word-impressora'] = svg([impressora(false), etiqueta(320, 290, 'impressora', { centro: true })], '#eef2f7');
telas['word-bastidores-imprimir'] = svg([bastidoresOffice(WORD, 'Início'), alvoPos(posicaoBastidores('Imprimir'), 3)]);
telas['word-previa'] = svg([bastidoresOffice(WORD, 'Imprimir', conteudoImprimir([NOME])), etiqueta(420, 350, 'a folha')]);
telas['word-clique-imprimir'] = svg([bastidoresOffice(WORD, 'Imprimir', conteudoImprimir([NOME])), alvoPos(POS_IMPRIMIR)]);
telas['word-impresso'] = svg([impressora(true), certo(470, 150, 32)], '#eef2f7');
