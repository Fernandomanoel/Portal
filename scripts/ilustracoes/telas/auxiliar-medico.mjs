// Ilustrações das atividades de Auxiliar Médico (src/assets/atividades/auxiliar-medico/).
// Diagramas ilustrativos, não fotos: situações e esquemas do dia a dia do consultório.
// Cada chave vira <chave>.svg. Para uma tela nova, copie a mais parecida e rode
// `npm run ilustracoes -- <chave>`.
import { pessoa, svg, texto } from '../pecas.mjs';

export const destino = 'auxiliar-medico';

const TEAL = '#0d9488';
const TEAL_CLARO = '#ccfbf1';
const AZUL = '#2563eb';
const AZUL_CLARO = '#dbeafe';
const VERDE = '#16a34a';
const VERDE_CLARO = '#dcfce7';
const VERMELHO = '#dc2626';
const VERMELHO_CLARO = '#fee2e2';
const AMARELO = '#d97706';
const AMARELO_CLARO = '#fef3c7';
const CINZA = '#6b7280';
const LINHA = '#cbd5e1';

const ret = (x, y, w, h, fill, { rx = 0, stroke = null, sw = 1, extra = '' } = {}) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${extra}/>`;
const circ = (cx, cy, r, fill, stroke = null) => `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`;
const lin = (x1, y1, x2, y2, cor = LINHA, sw = 1, extra = '') => `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="${sw}"${extra}/>`;
const t = (x, y, s, o = {}) => texto(x, y, s, { tamanho: 11, ...o });
const titulo = (s) => texto(320, 32, s, { tamanho: 15, negrito: true, centro: true });
const cartao = (x, y, w, h, fill = '#ffffff', stroke = LINHA) => ret(x, y, w, h, fill, { rx: 12, stroke });
const check = (x, y, cor = VERDE) => `  <path d="M${x} ${y} l4 4 l8 -9" fill="none" stroke="${cor}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const xis = (x, y, cor = VERMELHO) => `  <path d="M${x} ${y - 6} l10 10 m0 -10 l-10 10" fill="none" stroke="${cor}" stroke-width="2.4" stroke-linecap="round"/>`;
const seta = (x1, y1, x2, y2, cor = '#94a3b8', sw = 2) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (d) => `${(x2 - 8 * Math.cos(a - d)).toFixed(1)},${(y2 - 8 * Math.sin(a - d)).toFixed(1)}`;
  return `${lin(x1, y1, x2, y2, cor, sw)}\n  <polygon points="${x2},${y2} ${p(0.45)} ${p(-0.45)}" fill="${cor}"/>`;
};
const balao = (x, y, w, h, linhas, { fill = '#ffffff', stroke = LINHA, cauda = 'esq', cor = '#1f2937' } = {}) => {
  const p = [ret(x, y, w, h, fill, { rx: 14, stroke })];
  const cx = cauda === 'esq' ? x + 18 : x + w - 18;
  p.push(`  <path d="M${cx - 8} ${y + h - 1} l${cauda === 'esq' ? -4 : 4} 12 l14 -12 z" fill="${fill}" stroke="${stroke}"/>`, `  <path d="M${cx - 7} ${y + h - 1.5} h13" stroke="${fill}" stroke-width="3"/>`);
  linhas.forEach((l, i) => p.push(t(x + 14, y + 22 + i * 16, l, { tamanho: 11, cor })));
  return p.join('\n');
};
/** Etapas numeradas lado a lado. */
const etapas = (lista, { y = 70, h = 150, larg = 104, cor = TEAL } = {}) => {
  const p = [];
  const passo = (640 - 2 * 26 - larg) / (lista.length - 1);
  lista.forEach(([nome, ...linhas], i) => {
    const x = 26 + i * passo;
    p.push(cartao(x, y, larg, h), circ(x + larg / 2, y + 30, 16, cor), texto(x + larg / 2, y + 36, String(i + 1), { tamanho: 15, cor: '#ffffff', negrito: true, centro: true }));
    const cabe = (s, max, peso) => Math.min(max, (larg - 12) / (s.length * peso));
    p.push(texto(x + larg / 2, y + 68, nome, { tamanho: cabe(nome, 12, 0.62), negrito: true, centro: true }));
    linhas.forEach((l, k) => p.push(texto(x + larg / 2, y + 88 + k * 14, l, { tamanho: cabe(l, 9.5, 0.54), cor: CINZA, centro: true })));
    if (i < lista.length - 1) p.push(seta(x + larg + 2, y + h / 2, x + passo - 2, y + h / 2));
  });
  return p;
};

export const telas = {};

// =================== Atividade 1 — Agendamentos de consulta ===================

telas['agenda-do-dia'] = (() => {
  const horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  const p = [titulo('Agenda do Dr. Paulo — quinta-feira')];
  p.push(cartao(30, 48, 410, 330));
  horas.forEach((h, i) => {
    const y = 62 + i * 39;
    p.push(t(44, y + 24, h, { cor: CINZA, tamanho: 10.5 }), lin(88, y + 38, 428, y + 38, '#e5e7eb'));
  });
  const bloco = (i, n, fill, borda, linhas, tracejado = false) => {
    const y = 62 + i * 39 + 3;
    const h = n * 39 - 6;
    p.push(ret(94, y, 328, h, fill, { rx: 8, stroke: borda, sw: 1.5, extra: tracejado ? ' stroke-dasharray="5 3"' : '' }));
    linhas.forEach((l, k) => p.push(t(106, y + 17 + k * 15, l, { tamanho: 10.5, negrito: k === 0, cor: '#1f2937' })));
  };
  bloco(0, 2, AZUL_CLARO, AZUL, ['Maria Souza — 1ª consulta', '60 min · Convênio Vida']);
  bloco(2, 1, VERDE_CLARO, VERDE, ['João Lima — retorno']);
  bloco(3, 1, '#ffffff', '#94a3b8', ['livre'], true);
  bloco(4, 1, '#e5e7eb', '#9ca3af', ['Bloqueado — reunião da equipe']);
  bloco(5, 1, AZUL_CLARO, AZUL, ['Ana Reis — consulta']);
  bloco(6, 1, '#ffffff', '#94a3b8', ['livre'], true);
  bloco(7, 1, VERDE_CLARO, VERDE, ['Pedro Nunes — retorno']);
  p.push(cartao(458, 48, 162, 190, '#ffffff'));
  p.push(t(472, 72, 'Como ler', { negrito: true, tamanho: 12 }));
  [[AZUL_CLARO, AZUL, 'Consulta'], [VERDE_CLARO, VERDE, 'Retorno'], ['#ffffff', '#94a3b8', 'Horário livre'], ['#e5e7eb', '#9ca3af', 'Bloqueado']].forEach(([f, b, n], i) => {
    p.push(ret(472, 88 + i * 28, 28, 18, f, { rx: 4, stroke: b, sw: 1.5, extra: n === 'Horário livre' ? ' stroke-dasharray="4 2"' : '' }), t(508, 101 + i * 28, n, { tamanho: 10.5 }));
  });
  p.push(cartao(458, 250, 162, 128, AMARELO_CLARO, '#fcd34d'));
  p.push(t(472, 274, 'Primeira consulta', { negrito: true, tamanho: 11, cor: '#78350f' }), t(472, 292, 'costuma ocupar mais', { tamanho: 10.5, cor: '#78350f' }), t(472, 308, 'tempo que o retorno.', { tamanho: 10.5, cor: '#78350f' }), t(472, 332, 'Siga a regra do', { tamanho: 10.5, cor: '#78350f' }), t(472, 348, 'consultório.', { tamanho: 10.5, cor: '#78350f' }));
  return svg(p, '#eef2f7');
})();

telas['ficha-de-agendamento'] = (() => {
  const campos = [['Nome completo', 'Maria Souza Lima', true], ['Data de nascimento', '14/03/1982', true], ['Telefone (WhatsApp)', '(11) 98888-0000', true], ['Convênio / carteirinha', 'Vida Saúde · 0012345678', false], ['Motivo (em poucas palavras)', 'Dor de cabeça frequente', false], ['Médico e horário', 'Dr. Paulo · qui 08:00', true]];
  const p = [titulo('Ficha de agendamento')];
  p.push(cartao(30, 48, 370, 330));
  campos.forEach(([r, v, obrig], i) => {
    const y = 66 + i * 50;
    p.push(t(46, y + 8, r + (obrig ? ' *' : ''), { tamanho: 10, cor: CINZA, negrito: true }));
    p.push(ret(46, y + 14, 338, 24, '#f8fafc', { rx: 6, stroke: LINHA }), t(56, y + 31, v, { tamanho: 11 }));
  });
  p.push(cartao(418, 48, 202, 330, TEAL_CLARO, '#5eead4'));
  p.push(t(432, 74, 'Confirme em voz alta', { negrito: true, tamanho: 12, cor: '#134e4a' }));
  ['Nome completo e idade', 'Telefone de contato', 'Convênio e carteirinha', 'Dia, hora e médico', 'Documentos que levar', 'Chegar 15 min antes'].forEach((s, i) => {
    p.push(check(434, 108 + i * 34, TEAL), t(456, 110 + i * 34, s, { tamanho: 10.5, cor: '#134e4a' }));
  });
  p.push(t(432, 350, '* dados obrigatórios', { tamanho: 9.5, cor: '#134e4a' }));
  return svg(p, '#eef2f7');
})();

telas['fluxo-agendar'] = (() => {
  const p = [titulo('Do pedido à reconfirmação')];
  p.push(...etapas([['Receber', 'cumprimente e', 'ouça o pedido'], ['Coletar', 'nome, nascimento,', 'telefone, convênio'], ['Verificar', 'veja a agenda', 'do médico'], ['Confirmar', 'repita dia, hora,', 'documentos'], ['Reconfirmar', '1 a 2 dias antes', 'por telefone']], { y: 62, h: 150 }));
  p.push(cartao(26, 236, 588, 130, AMARELO_CLARO, '#fcd34d'));
  p.push(t(44, 264, 'E se não houver horário?', { negrito: true, tamanho: 12.5, cor: '#78350f' }));
  p.push(t(44, 288, '1. Ofereça a próxima data livre ou outro horário/dia.', { tamanho: 11, cor: '#78350f' }));
  p.push(t(44, 308, '2. Se a pessoa preferir esperar, anote em lista de espera, com telefone.', { tamanho: 11, cor: '#78350f' }));
  p.push(t(44, 328, '3. Quando abrir uma vaga (cancelamento), avise na ordem da lista.', { tamanho: 11, cor: '#78350f' }));
  p.push(t(44, 352, 'Nunca prometa o que a agenda não permite: informe com clareza.', { tamanho: 11, negrito: true, cor: '#78350f' }));
  return svg(p, '#eef2f7');
})();

// =================== Atividade 2 — Atendimento ao cidadão ===================

const fila = [
  ['Idosa, 82 anos', '#a78bfa', 'prioridade especial (80+)', VERDE],
  ['Gestante', '#f472b6', 'prioridade legal', VERDE],
  ['Com deficiência', '#38bdf8', 'prioridade legal', VERDE],
  ['Adulto com bebê', '#fb923c', 'prioridade legal', VERDE],
  ['Idoso, 65 anos', '#34d399', 'prioridade legal', VERDE],
  ['Adulto, 34 anos', '#94a3b8', 'ordem de chegada', CINZA],
];
telas['prioridade-fila'] = (() => {
  const p = [titulo('Quem tem prioridade no atendimento')];
  p.push(cartao(26, 48, 588, 214, '#ffffff'));
  fila.forEach(([nome, cor, nota, selo], i) => {
    const x = 70 + i * 96;
    p.push(pessoa(x, 200, 100, cor));
    p.push(t(x, 222, nome, { tamanho: 9, centro: true, negrito: true }), t(x, 236, nota, { tamanho: 8, centro: true, cor: selo }));
    p.push(circ(x, 80, 11, selo === VERDE ? VERDE : '#94a3b8'), texto(x, 85, String(i + 1), { tamanho: 12, cor: '#ffffff', negrito: true, centro: true }));
  });
  p.push(cartao(26, 276, 288, 100, VERMELHO_CLARO, '#fca5a5'));
  p.push(t(42, 302, 'Urgência clínica passa na frente', { negrito: true, tamanho: 12, cor: '#7f1d1d' }), t(42, 322, 'de qualquer fila: falta de ar, dor forte', { tamanho: 10.5, cor: '#7f1d1d' }), t(42, 338, 'no peito, desmaio, sangramento. Avise', { tamanho: 10.5, cor: '#7f1d1d' }), t(42, 354, 'o médico ou a equipe na hora.', { tamanho: 10.5, cor: '#7f1d1d' }));
  p.push(cartao(326, 276, 288, 100, '#f8fafc'));
  p.push(t(342, 302, 'Dentro do grupo prioritário', { negrito: true, tamanho: 12 }), t(342, 322, 'vale a ordem de chegada.', { tamanho: 10.5 }), t(342, 342, 'Explique com educação a', { tamanho: 10.5, cor: CINZA }), t(342, 358, 'quem aguarda: é regra, não favor.', { tamanho: 10.5, cor: CINZA }));
  return svg(p, '#eef2f7');
})();

telas['escuta-ativa'] = (() => {
  const p = [titulo('Escuta ativa no balcão')];
  p.push(pessoa(74, 196, 110, '#fb923c'), pessoa(566, 196, 110, TEAL));
  p.push(balao(120, 58, 210, 78, ['"Estou com uma coisa', 'estranha desde ontem e', 'não sei explicar..."'], { fill: '#fff7ed', stroke: '#fdba74' }));
  p.push(balao(318, 124, 210, 78, ['"Entendi. Pode me contar', 'com calma o que sentiu', 'e desde quando?"'], { cauda: 'dir', fill: TEAL_CLARO, stroke: '#5eead4' }));
  p.push(...etapas([['Olhe e cumprimente', 'sorria, pare o que', 'estava fazendo'], ['Ouça até o fim', 'sem interromper', 'nem terminar a frase'], ['Repita com suas palavras', '"Entendi que...", para', 'conferir se entendeu'], ['Oriente o próximo passo', 'diga o que vai', 'acontecer agora']], { y: 226, h: 150, larg: 128 }));
  return svg(p, '#eef2f7');
})();

telas['sigilo-balcao'] = (() => {
  const p = [titulo('Sigilo: o que pode e o que não pode')];
  p.push(cartao(26, 48, 286, 326, VERDE_CLARO, '#86efac'), cartao(328, 48, 286, 326, VERMELHO_CLARO, '#fca5a5'));
  p.push(texto(169, 76, 'Pode', { tamanho: 15, negrito: true, centro: true, cor: '#14532d' }), texto(471, 76, 'Não pode', { tamanho: 15, negrito: true, centro: true, cor: '#7f1d1d' }));
  ['Confirmar horário com o próprio paciente', 'Dizer quais documentos levar', 'Falar em voz baixa e em local reservado', 'Fechar a tela e guardar o prontuário', 'Pedir autorização para falar com terceiros'].forEach((s, i) => {
    p.push(check(42, 108 + i * 52, VERDE), t(64, 110 + i * 52, s.length > 34 ? s.slice(0, s.lastIndexOf(' ', 34)) : s, { tamanho: 10.5, cor: '#14532d' }));
    if (s.length > 34) p.push(t(64, 124 + i * 52, s.slice(s.lastIndexOf(' ', 34) + 1), { tamanho: 10.5, cor: '#14532d' }));
  });
  ['Dizer o motivo da consulta em voz alta', 'Passar resultado a vizinho ou colega', 'Informar por telefone a quem não é o paciente', 'Deixar prontuário aberto no balcão', 'Comentar casos nas redes sociais'].forEach((s, i) => {
    p.push(xis(344, 108 + i * 52), t(366, 110 + i * 52, s.length > 34 ? s.slice(0, s.lastIndexOf(' ', 34)) : s, { tamanho: 10.5, cor: '#7f1d1d' }));
    if (s.length > 34) p.push(t(366, 124 + i * 52, s.slice(s.lastIndexOf(' ', 34) + 1), { tamanho: 10.5, cor: '#7f1d1d' }));
  });
  return svg(p, '#eef2f7');
})();

// =================== Atividade 3 — Secretariado médico ===================

telas['prontuario-secretaria'] = (() => {
  const p = [titulo('Quem preenche cada parte do prontuário')];
  p.push(cartao(60, 48, 520, 326, '#ffffff'));
  p.push(ret(60, 48, 520, 40, TEAL, { rx: 12 }), ret(60, 70, 520, 18, TEAL));
  p.push(texto(78, 74, 'PRONTUÁRIO Nº 04821 — Maria Souza Lima', { tamanho: 13, negrito: true, cor: '#ffffff' }));
  const secoes = [['Identificação', 'nome, nascimento, endereço, telefone, CPF', 'Secretaria', AZUL, AZUL_CLARO], ['Convênio', 'plano, carteirinha, validade', 'Secretaria', AZUL, AZUL_CLARO], ['Consentimento (LGPD)', 'termo de uso dos dados, assinado', 'Secretaria', AZUL, AZUL_CLARO], ['Queixa e histórico', 'o que o paciente relata, doenças prévias', 'Médico', TEAL, TEAL_CLARO], ['Evolução e conduta', 'exame, diagnóstico, prescrição', 'Médico', TEAL, TEAL_CLARO], ['Sinais vitais do dia', 'aferidos e registrados pelo auxiliar', 'Auxiliar', AMARELO, AMARELO_CLARO]];
  secoes.forEach(([n, d, quem, cor, claro], i) => {
    const y = 100 + i * 44;
    p.push(ret(76, y, 488, 36, '#f8fafc', { rx: 8, stroke: LINHA }));
    p.push(t(88, y + 16, n, { negrito: true, tamanho: 11 }), t(88, y + 30, d, { tamanho: 9.5, cor: CINZA }));
    p.push(ret(478, y + 8, 74, 20, claro, { rx: 10, stroke: cor }), texto(515, y + 22, quem, { tamanho: 10, cor, negrito: true, centro: true }));
  });
  return svg(p, '#eef2f7');
})();

telas['documentos-do-consultorio'] = (() => {
  const p = [titulo('Documentos: quem faz o quê')];
  p.push(cartao(26, 48, 288, 326, TEAL_CLARO, '#5eead4'), cartao(326, 48, 288, 326, AZUL_CLARO, '#93c5fd'));
  p.push(texto(170, 76, 'O médico', { tamanho: 15, negrito: true, centro: true, cor: '#134e4a' }), texto(470, 76, 'A secretária', { tamanho: 15, negrito: true, centro: true, cor: '#1e3a8a' }));
  ['Decide e assina o atestado', 'Prescreve e assina a receita', 'Pede os exames', 'Interpreta resultados', 'Orienta o tratamento'].forEach((s, i) => p.push(check(44, 112 + i * 44, TEAL), t(66, 115 + i * 44, s, { tamanho: 11, cor: '#134e4a' })));
  ['Organiza a agenda e os dados', 'Prepara o papel e as guias', 'Entrega o que o médico assinou', 'Arquiva em ordem e com sigilo', 'Confere convênio e protocolos'].forEach((s, i) => p.push(check(344, 112 + i * 44, AZUL), t(366, 115 + i * 44, s, { tamanho: 11, cor: '#1e3a8a' })));
  p.push(ret(344, 332, 252, 28, VERMELHO_CLARO, { rx: 8, stroke: '#fca5a5' }), t(356, 351, 'Nunca assina nem altera documento do médico.', { tamanho: 9.5, negrito: true, cor: '#7f1d1d' }));
  return svg(p, '#eef2f7');
})();

telas['rotina-do-dia'] = (() => {
  const cols = [['Antes de abrir', TEAL, ['Conferir a agenda do dia', 'Separar os prontuários', 'Ligar equipamentos', 'Repor impressos e canetas', 'Ver recados e faltas']], ['Durante o dia', AZUL, ['Receber e registrar a chegada', 'Avisar o médico', 'Chamar pelo nome completo', 'Atender telefone e e-mail', 'Agendar retornos']], ['Ao fechar', AMARELO, ['Completar os registros', 'Arquivar prontuários', 'Reconfirmar o dia seguinte', 'Fechar contas e caixa', 'Desligar e trancar']]];
  const p = [titulo('A rotina do secretariado médico')];
  cols.forEach(([n, cor, itens], i) => {
    const x = 26 + i * 200;
    p.push(cartao(x, 48, 188, 326), ret(x, 48, 188, 36, cor, { rx: 12 }), ret(x, 70, 188, 14, cor));
    p.push(texto(x + 94, 72, n, { tamanho: 13, negrito: true, centro: true, cor: '#ffffff' }));
    itens.forEach((s, k) => p.push(circ(x + 20, 112 + k * 50, 5, cor), t(x + 34, 116 + k * 50, s, { tamanho: 10.5 })));
    if (i < 2) p.push(seta(x + 190, 210, x + 198, 210));
  });
  return svg(p, '#eef2f7');
})();

// =================== Atividade 4 — Check-list ===================

telas['checklist-abertura'] = (() => {
  const grupos = [['Ambiente', [['Sala limpa e organizada', true], ['Maca com lençol descartável novo', true], ['Lixeiras forradas e separadas', true], ['Pia com sabão e papel toalha', true]]], ['Materiais', [['Termômetro, esfigmomanômetro, estetoscópio', true], ['Balança e fita métrica', true], ['Álcool 70% e luvas', false], ['Abaixadores e gaze', false]]], ['Documentos', [['Agenda do dia conferida', true], ['Prontuários separados', true], ['Receituário e atestados em estoque', false]]]];
  const p = [titulo('Check-list de abertura do consultório')];
  p.push(cartao(60, 46, 520, 322));
  let y = 60;
  grupos.forEach(([g, itens]) => {
    p.push(ret(76, y, 488, 20, TEAL_CLARO, { rx: 6 }), t(86, y + 14, g, { negrito: true, tamanho: 11.5, cor: '#134e4a' }));
    y += 25;
    itens.forEach(([s, ok]) => {
      p.push(ret(88, y - 2, 15, 15, ok ? VERDE_CLARO : '#ffffff', { rx: 3, stroke: ok ? VERDE : '#94a3b8', sw: 1.5 }));
      if (ok) p.push(check(91, y + 7, VERDE));
      p.push(t(112, y + 10, s, { tamanho: 11, cor: ok ? '#1f2937' : '#b45309', negrito: !ok }));
      if (!ok) p.push(t(500, y + 10, 'faltando', { tamanho: 10, negrito: true, cor: AMARELO }));
      y += 19;
    });
    y += 5;
  });
  return svg(p, '#eef2f7');
})();

telas['bancada-materiais'] = (() => {
  const p = [titulo('Materiais de apoio na bancada')];
  p.push(cartao(26, 48, 588, 326, '#ffffff'));
  const item = (cx, desenho, nome, uso) => [desenho, texto(cx, 262, nome, { tamanho: 11.5, negrito: true, centro: true }), texto(cx, 280, uso, { tamanho: 9.5, cor: CINZA, centro: true })].join('\n');
  // esfigmomanômetro
  p.push(item(100, `${ret(60, 130, 80, 22, '#94a3b8', { rx: 8 })}${circ(100, 100, 24, '#ffffff', '#1f2937')}  <path d="M100 100 L112 86" stroke="${VERMELHO}" stroke-width="2.5"/>${lin(100, 152, 100, 190, '#1f2937', 3)}${circ(100, 200, 10, '#1f2937')}`, 'Esfigmomanômetro', 'pressão arterial'));
  // estetoscópio
  p.push(item(240, `  <path d="M215 80 C215 140 265 140 265 80" fill="none" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><path d="M240 130 C240 180 215 200 215 210" fill="none" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/>${circ(215, 214, 13, '#94a3b8', '#1f2937')}${circ(215, 76, 5, '#1f2937')}${circ(265, 76, 5, '#1f2937')}`, 'Estetoscópio', 'ouvir pulso e pulmão'));
  // termômetro
  p.push(item(380, `${ret(335, 150, 90, 14, '#e5e7eb', { rx: 7, stroke: '#1f2937', sw: 2 })}${ret(335, 150, 36, 14, '#fca5a5', { rx: 7 })}${circ(430, 157, 7, VERMELHO)}${t(380, 130, '36,5 °C', { centro: true, tamanho: 12, negrito: true })}`, 'Termômetro', 'temperatura'));
  // balança
  p.push(item(520, `${ret(480, 150, 80, 50, '#94a3b8', { rx: 8, stroke: '#1f2937', sw: 2 })}${ret(492, 124, 56, 28, '#ffffff', { rx: 4, stroke: '#1f2937', sw: 2 })}${t(520, 144, '72,4', { centro: true, tamanho: 12, negrito: true })}${circ(520, 176, 9, '#ffffff', '#1f2937')}`, 'Balança e fita', 'peso e altura (IMC)'));
  p.push(ret(60, 306, 520, 52, AMARELO_CLARO, { rx: 10, stroke: '#fcd34d' }));
  p.push(texto(320, 328, 'Antes de usar: confira se funciona, se está limpo e se a bateria/escala está certa.', { tamanho: 11.5, negrito: true, centro: true, cor: '#78350f' }), texto(320, 346, 'Defeito se avisa e anota — nunca se "dá um jeito".', { tamanho: 11, centro: true, cor: '#78350f' }));
  return svg(p, '#eef2f7');
})();

telas['residuos-cores'] = (() => {
  const lixeira = (cx, fill, nome, linhas, extra = '') => [
    `  <path d="M${cx - 44} 100 h88 l-8 130 h-72 z" fill="${fill}" stroke="#1f2937" stroke-width="2"/>`, ret(cx - 50, 88, 100, 14, fill, { rx: 4, stroke: '#1f2937', sw: 2 }), extra,
    texto(cx, 262, nome, { tamanho: 12, negrito: true, centro: true }), ...linhas.map((l, i) => texto(cx, 282 + i * 15, l, { tamanho: 10, cor: CINZA, centro: true })),
  ].join('\n');
  const p = [titulo('Cada resíduo no seu recipiente')];
  p.push(cartao(26, 48, 588, 326));
  p.push(lixeira(130, '#4b5563', 'Lixo comum', ['papel toalha seco, embalagens,', 'copos, papel de escritório']));
  p.push(lixeira(320, '#f1f5f9', 'Infectante (saco branco)', ['gaze e algodão com sangue,', 'luvas usadas, curativos'], `  <path d="M320 150 l-14 24 h28 z" fill="none" stroke="#1f2937" stroke-width="2.5"/>${t(320, 170, '!', { centro: true, negrito: true, tamanho: 14 })}`));
  p.push(lixeira(510, '#facc15', 'Perfurocortante', ['agulhas, lâminas e vidro quebrado', 'em caixa rígida amarela']));
  p.push(ret(60, 318, 520, 40, VERMELHO_CLARO, { rx: 8, stroke: '#fca5a5' }), texto(320, 343, 'Perfurocortante: nunca recapar agulha e nunca encher a caixa além da linha indicada.', { tamanho: 11, negrito: true, centro: true, cor: '#7f1d1d' }));
  return svg(p, '#eef2f7');
})();

// =================== Atividade 5 — Simulado: paciente alterado ===================

telas['sinais-de-alerta'] = (() => {
  const p = [titulo('Sinais de alerta: chame ajuda na hora')];
  p.push(cartao(26, 48, 380, 326, VERMELHO_CLARO, '#fca5a5'));
  p.push(t(44, 76, 'Avise o médico ou a equipe imediatamente', { negrito: true, tamanho: 12.5, cor: '#7f1d1d' }));
  ['Dor forte no peito ou falta de ar', 'Desmaio ou confusão de repente', 'Fala enrolada, boca torta, fraqueza de um lado', 'Sangramento que não para', 'Convulsão ou engasgo', 'Pessoa que se machuca ou ameaça se machucar'].forEach((s, i) => p.push(circ(50, 108 + i * 42, 5, VERMELHO), t(64, 112 + i * 42, s, { tamanho: 11, cor: '#7f1d1d' })));
  p.push(cartao(424, 48, 190, 150, '#7f1d1d', '#7f1d1d'));
  p.push(texto(519, 96, 'SAMU', { tamanho: 24, negrito: true, centro: true, cor: '#ffffff' }), texto(519, 142, '192', { tamanho: 44, negrito: true, centro: true, cor: '#fef08a' }), texto(519, 172, 'ligue sem hesitar', { tamanho: 10.5, centro: true, cor: '#fecaca' }));
  p.push(cartao(424, 212, 190, 162, AMARELO_CLARO, '#fcd34d'));
  p.push(t(438, 238, 'Enquanto a ajuda não chega', { negrito: true, tamanho: 11, cor: '#78350f' }), t(438, 260, 'Fique com a pessoa.', { tamanho: 10.5, cor: '#78350f' }), t(438, 278, 'Mantenha a calma e o local', { tamanho: 10.5, cor: '#78350f' }), t(438, 294, 'livre.', { tamanho: 10.5, cor: '#78350f' }), t(438, 316, 'Faça só o que sabe e', { tamanho: 10.5, cor: '#78350f' }), t(438, 332, 'foi orientado a fazer.', { tamanho: 10.5, cor: '#78350f' }));
  return svg(p, '#eef2f7');
})();

telas['conduta-paciente-alterado'] = (() => {
  const p = [titulo('Paciente alterado ou que não sabe explicar')];
  p.push(pessoa(70, 190, 110, '#fb923c'), pessoa(570, 190, 110, TEAL));
  p.push(balao(116, 52, 210, 78, ['"Eu... não sei... tá', 'diferente aqui, ninguém', 'me explica nada!"'], { fill: '#fff7ed', stroke: '#fdba74' }));
  p.push(balao(314, 112, 214, 78, ['"Estou aqui com o senhor.', 'Vamos devagar. Vou chamar', 'quem pode ajudar agora."'], { cauda: 'dir', fill: TEAL_CLARO, stroke: '#5eead4' }));
  p.push(...etapas([['Calma e distância', 'voz baixa e lenta,', 'espaço para a pessoa'], ['Ouvir', 'sem discutir nem', 'dizer "calma!"'], ['Perguntas simples', 'uma de cada vez,', '"onde dói?"'], ['Chamar apoio', 'médico ou equipe,', 'sem deixar a pessoa só'], ['Registrar', 'o que foi dito e', 'visto, sem rótulos']], { y: 214, h: 162, larg: 108 }));
  return svg(p, '#eef2f7');
})();

telas['registro-fiel'] = (() => {
  const p = [titulo('Como registrar o que o paciente diz')];
  p.push(cartao(26, 48, 288, 326, VERMELHO_CLARO, '#fca5a5'), cartao(326, 48, 288, 326, VERDE_CLARO, '#86efac'));
  p.push(texto(170, 76, 'Registro ruim', { tamanho: 14, negrito: true, centro: true, cor: '#7f1d1d' }), texto(470, 76, 'Registro bom', { tamanho: 14, negrito: true, centro: true, cor: '#14532d' }));
  p.push(ret(42, 92, 256, 120, '#ffffff', { rx: 8, stroke: '#fca5a5' }), t(54, 114, '"Paciente nervoso, parece', { tamanho: 11 }), t(54, 130, 'infarto, está exagerando e', { tamanho: 11 }), t(54, 146, 'não colabora."', { tamanho: 11 }));
  p.push(ret(342, 92, 256, 120, '#ffffff', { rx: 8, stroke: '#86efac' }), t(354, 114, 'Chegou às 09:10, voz alta, mãos', { tamanho: 10.5 }), t(354, 130, 'trêmulas. Diz: "dor no peito há', { tamanho: 10.5 }), t(354, 146, 'duas horas, piora quando respiro".', { tamanho: 10.5 }), t(354, 162, 'Médico avisado às 09:12.', { tamanho: 10.5, negrito: true }));
  ['Diagnóstico por conta própria', 'Rótulo (nervoso, exagerado)', 'Julgamento'].forEach((s, i) => p.push(xis(46, 244 + i * 34), t(68, 247 + i * 34, s, { tamanho: 11, cor: '#7f1d1d' })));
  ['Fatos observados', 'Palavras do paciente entre aspas', 'Horário e quem foi avisado'].forEach((s, i) => p.push(check(346, 244 + i * 34), t(368, 247 + i * 34, s, { tamanho: 11, cor: '#14532d' })));
  return svg(p, '#eef2f7');
})();
