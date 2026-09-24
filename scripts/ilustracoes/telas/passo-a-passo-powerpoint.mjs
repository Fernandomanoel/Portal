// Passo a Passo — PowerPoint básico: subtítulo, novo slide, tópicos, design, forma, transição, ordem, apresentar, salvar.
import {
  POS_NOVO_SLIDE, POS_PROCURAR, POS_SALVAR, TEMAS_PPT, alvo, bastidoresOffice, certo, conteudoSalvarComo, cursor,
  dialogoSalvar, etiqueta, faixaBotoes, faixaSlides, faixaTemas, mouseBotao, posicaoAba, posicaoBastidores,
  posicaoBotaoFaixa, posicaoTema, slidePowerPoint, svg, teclaGrande, telaCheiaPowerPoint, texto,
} from '../pecas.mjs';
import { ABAS_PPT, FUNDO_TECLA, POWERPOINT, alvoPos, fileiraDeCima, telaOffice } from '../passo-a-passo-comum.mjs';

export const destino = 'passo-a-passo';
export const telas = {};

const TITULO = 'Meu primeiro slide';
const NOME = 'Ana Souza';
/** Janela do PowerPoint. `aba` e `faixa` escolhem a faixa de opções; `slide`: opções de slidePowerPoint. */
const ppt = ({ aba = 'Página Inicial', faixa = faixaSlides(), slide = {}, titulo = 'Apresentação1 - PowerPoint' } = {}, ...trechos) => svg([
  telaOffice(POWERPOINT, titulo, ABAS_PPT, { aba, faixa }),
  slidePowerPoint(POWERPOINT, { titulo: TITULO, estado: 'pronto', ...slide }),
  ...trechos,
]);
const OK = certo(572, 164);
const FORA = [alvo(560, 342, 20), cursor(560, 342)];

// ---------------- Subtítulo ----------------

telas['ppt-sub-olhe'] = ppt({}, etiqueta(370, 318, 'caixa do subtítulo', { centro: true }));
telas['ppt-sub-clique'] = ppt({}, alvo(300, 288, 20), cursor(300, 288), mouseBotao(36, 280, 'esquerdo'));
telas['ppt-sub-nome'] = ppt({ slide: { subtitulo: NOME, editandoSubtitulo: true } });
telas['ppt-sub-clique-fora'] = ppt({ slide: { subtitulo: NOME, editandoSubtitulo: true } }, ...FORA);
telas['ppt-sub-pronto'] = ppt({ slide: { subtitulo: NOME } }, OK);

// ---------------- Novo slide ----------------

const slide2 = (extra = {}) => ({ layout: 'conteudo', titulo: null, estado: 'vazio', miniaturas: 2, atual: 2, ...extra });
telas['ppt-ns-botao'] = ppt({ faixa: faixaSlides({ destaque: true }), slide: { subtitulo: NOME } }, alvoPos(POS_NOVO_SLIDE));
telas['ppt-ns-slide2'] = ppt({ slide: slide2() }, etiqueta(108, 190, 'slide 2'));
telas['ppt-ns-clique-titulo'] = ppt({ slide: slide2() }, alvo(300, 170, 20), cursor(300, 170));
telas['ppt-ns-titulo'] = ppt({ slide: slide2({ titulo: 'Minhas comidas' }) });
telas['ppt-ns-pronto'] = ppt({ slide: slide2({ titulo: 'Minhas comidas' }) }, OK);

// ---------------- Tópicos ----------------

const topicos = (itens, editando = true) => ({ slide: slide2({ titulo: 'Minhas comidas', topicos: itens, editandoTopicos: editando }) });
telas['ppt-tp-clique'] = ppt(topicos(null, false), alvo(300, 236, 20), cursor(300, 236), mouseBotao(36, 280, 'esquerdo'));
telas['ppt-tp-1'] = ppt(topicos(['Arroz']));
telas['ppt-tp-enter'] = ppt(topicos(['Arroz', '']), etiqueta(210, 300, 'outra bolinha'));
telas['ppt-tp-2'] = ppt(topicos(['Arroz', 'Feijão']));
telas['ppt-tp-3'] = ppt(topicos(['Arroz', 'Feijão', 'Frutas']));
telas['ppt-tp-fora'] = ppt(topicos(['Arroz', 'Feijão', 'Frutas']), ...FORA);
telas['ppt-tp-pronto'] = ppt(topicos(['Arroz', 'Feijão', 'Frutas'], false), OK);

// ---------------- Design ----------------

const AZUL = 1;
telas['ppt-ds-aba'] = ppt({ slide: { subtitulo: NOME } }, alvoPos(posicaoAba('Design', ABAS_PPT), 4));
telas['ppt-ds-modelos'] = ppt({ aba: 'Design', faixa: faixaTemas(), slide: { subtitulo: NOME } }, etiqueta(240, 136, 'modelos de cores'));
telas['ppt-ds-clique-azul'] = ppt({ aba: 'Design', faixa: faixaTemas(), slide: { subtitulo: NOME } }, alvoPos(posicaoTema(AZUL), 4));
telas['ppt-ds-pronto'] = ppt({ aba: 'Design', faixa: faixaTemas(AZUL), slide: { subtitulo: NOME, tema: TEMAS_PPT[AZUL], miniaturas: 2 } }, OK);

// ---------------- Forma ----------------

const INSERIR = ['Imagens', 'Formas', 'Caixa de Texto', 'Ícones'];
const formas = () => `  <g filter="url(#sombra)"><rect x="118" y="124" width="172" height="74" rx="6" fill="#ffffff" stroke="#d4d4d8"/></g>
  ${texto(128, 142, 'Formas Básicas', { tamanho: 11, negrito: true })}
  <rect x="130" y="154" width="30" height="22" fill="none" stroke="#1f2937" stroke-width="2"/>
  <circle cx="190" cy="165" r="12" fill="none" stroke="#1f2937" stroke-width="2"/>
  <path d="M222 177 l14 -24 l14 24 z" fill="none" stroke="#1f2937" stroke-width="2"/>
  <path d="M258 160 h14 v-6 l12 11 l-12 11 v-6 h-14 z" fill="none" stroke="#1f2937" stroke-width="2"/>`;
const RETANGULO = { x: 330, y: 250, largura: 180, altura: 90, cor: '#3b82f6' };
telas['ppt-fm-aba'] = ppt({ slide: { subtitulo: NOME } }, alvoPos(posicaoAba('Inserir', ABAS_PPT), 4));
telas['ppt-fm-formas'] = ppt({ aba: 'Inserir', faixa: faixaBotoes(INSERIR), slide: { subtitulo: NOME } }, alvoPos(posicaoBotaoFaixa(1), 4));
telas['ppt-fm-retangulo'] = ppt({ aba: 'Inserir', faixa: faixaBotoes(INSERIR, { destaque: 'Formas' }), slide: { subtitulo: NOME } }, formas(), alvo(145, 165, 20));
telas['ppt-fm-arrastar'] = ppt({ aba: 'Inserir', faixa: faixaBotoes(INSERIR), slide: { subtitulo: null } },
  `  <rect x="${RETANGULO.x}" y="${RETANGULO.y}" width="${RETANGULO.largura}" height="${RETANGULO.altura}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="7 5"/>`,
  alvo(RETANGULO.x, RETANGULO.y, 14), cursor(RETANGULO.x + RETANGULO.largura, RETANGULO.y + RETANGULO.altura),
  `  <path d="M${RETANGULO.x + 18} ${RETANGULO.y + 12} L ${RETANGULO.x + RETANGULO.largura - 10} ${RETANGULO.y + RETANGULO.altura - 8}" stroke="#ea580c" stroke-width="3.5" stroke-dasharray="8 6"/>`,
  mouseBotao(36, 280, 'esquerdo'));
telas['ppt-fm-pronto'] = ppt({ aba: 'Inserir', faixa: faixaBotoes(INSERIR), slide: { subtitulo: null, forma: RETANGULO } }, OK);

// ---------------- Transição ----------------

const TRANSICOES = ['Nenhuma', 'Esmaecer', 'Empurrar', 'Revelar', 'Cortar'];
const faixaTransicoes = (destaque = null) => faixaBotoes(TRANSICOES, { destaque });
telas['ppt-tr-aba'] = ppt({ slide: { subtitulo: NOME } }, alvoPos(posicaoAba('Transições', ABAS_PPT), 4));
telas['ppt-tr-olhe'] = ppt({ aba: 'Transições', faixa: faixaTransicoes('Nenhuma'), slide: { subtitulo: NOME } }, etiqueta(300, 136, 'jeitos de trocar'));
telas['ppt-tr-esmaecer'] = ppt({ aba: 'Transições', faixa: faixaTransicoes('Nenhuma'), slide: { subtitulo: NOME } }, alvoPos(posicaoBotaoFaixa(1), 4));
telas['ppt-tr-pronto'] = ppt({ aba: 'Transições', faixa: faixaTransicoes('Esmaecer'), slide: { subtitulo: NOME } },
  texto(28, 170, '★', { tamanho: 14, cor: '#b7472a' }), etiqueta(40, 250, 'marca da transição'), OK);

// ---------------- Mudar a ordem dos slides ----------------

const CORES_SLIDES = ['#f87171', '#4ade80', '#60a5fa'];
const marcasSlides = (ordem) => ordem.map((cor, i) => `  <rect x="52" y="${146 + i * 50}" width="34" height="18" rx="3" fill="${cor}"/>`).join('\n');
const tres = { slide: { subtitulo: NOME, miniaturas: 3, atual: 3 } };
telas['ppt-or-olhe'] = ppt(tres, marcasSlides(CORES_SLIDES), etiqueta(112, 340, 'slides 1, 2 e 3'));
telas['ppt-or-segure'] = ppt(tres, marcasSlides(CORES_SLIDES), alvo(69, 255, 26), cursor(72, 258), mouseBotao(540, 250, 'esquerdo'));
telas['ppt-or-arraste'] = ppt(tres, marcasSlides(CORES_SLIDES),
  '  <path d="M112 248 C 140 220, 140 180, 112 152" fill="none" stroke="#ea580c" stroke-width="4" stroke-dasharray="8 6"/><path d="M104 146 l16 2 l-8 12 z" fill="#ea580c"/>',
  '  <rect x="40" y="126" width="66" height="38" rx="2" fill="#ffffff" fill-opacity="0.8" stroke="#2563eb" stroke-width="2" stroke-dasharray="4 3"/>',
  cursor(72, 150), mouseBotao(540, 250, 'esquerdo'));
telas['ppt-or-pronto'] = ppt({ slide: { subtitulo: NOME, miniaturas: 3, atual: 1 } }, marcasSlides([CORES_SLIDES[2], CORES_SLIDES[0], CORES_SLIDES[1]]), OK);

// ---------------- Apresentar ----------------

telas['tecla-f5'] = fileiraDeCima('F5', 'fileira de cima do teclado');
telas['tecla-esc'] = fileiraDeCima('Esc', 'canto de cima, do lado esquerdo');
telas['ppt-ap-tela-cheia'] = svg([telaCheiaPowerPoint({ titulo: TITULO, subtitulo: NOME })], '#000000');
telas['ppt-ap-proximo'] = svg([
  teclaGrande(230, 170, '→', 130), texto(340, 184, 'ou', { tamanho: 26, negrito: true, centro: true }), mouseBotao(420, 125, 'esquerdo'),
  texto(320, 300, 'próximo slide', { tamanho: 26, negrito: true, centro: true }),
], FUNDO_TECLA);
telas['ppt-ap-pronto'] = ppt({ slide: { subtitulo: NOME } }, OK);

// ---------------- Salvar ----------------

const salvar = (extra) => ppt({ slide: { subtitulo: NOME }, ...extra.opcoes }, ...extra.trechos);
telas['ppt-sv-arquivo'] = salvar({ opcoes: {}, trechos: [alvoPos(posicaoAba('Arquivo', ABAS_PPT), 4)] });
telas['ppt-sv-salvar-como'] = svg([bastidoresOffice(POWERPOINT, 'Início'), alvoPos(posicaoBastidores('Salvar como'), 3)]);
telas['ppt-sv-procurar'] = svg([bastidoresOffice(POWERPOINT, 'Salvar como', conteudoSalvarComo()), alvoPos(POS_PROCURAR)]);
telas['ppt-sv-nome'] = salvar({ opcoes: {}, trechos: [dialogoSalvar('minha-apresentacao'), alvoPos(POS_SALVAR.nome)] });
telas['ppt-sv-botao'] = salvar({ opcoes: {}, trechos: [dialogoSalvar('minha-apresentacao', { editando: false }), alvoPos(POS_SALVAR.salvar)] });
telas['ppt-sv-pronto'] = salvar({ opcoes: { titulo: 'minha-apresentacao - PowerPoint' }, trechos: [etiqueta(214, 48, 'nome do arquivo'), OK] });
