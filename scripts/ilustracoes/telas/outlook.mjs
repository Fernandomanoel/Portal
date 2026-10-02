// Ilustrações das atividades de Internet e Outlook (src/assets/atividades/outlook/).
// Telas ilustrativas do Outlook (web / novo Outlook) com dados fictícios: o
// foco é mostrar ONDE ficam as coisas e COMO um e-mail corporativo é montado,
// não reproduzir cada pixel da ferramenta.
import { botao, esc, selo, svg, texto } from '../pecas.mjs';

export const destino = 'outlook';

const AZUL = '#0f6cbd';
const AZUL_CLARO = '#e6f0fa';
const CINZA = '#6b7280';
const LINHA = '#e5e7eb';
const VERMELHO = '#dc2626';
const VERDE = '#16a34a';
const AMARELO = '#f59e0b';

const moldura = (titulo) => [
  '  <g filter="url(#sombra)"><rect x="14" y="10" width="612" height="380" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
  `  <path d="M14 20 a10 10 0 0 1 10 -10 h592 a10 10 0 0 1 10 10 v26 h-612 z" fill="${AZUL}"/>`,
  texto(32, 33, 'Outlook', { tamanho: 12.5, cor: '#ffffff', negrito: true }),
  texto(320, 33, titulo, { tamanho: 11, cor: '#dbeafe', centro: true }),
].join('\n');

const rect = (x, y, w, h, fill, stroke = null, rx = 0) =>
  `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}"` : ''}/>`;

const campoTexto = (x, y, w, valor, { altura = 24, cor = '#1f2937', cinza = false } = {}) => [
  rect(x, y, w, altura, '#ffffff', '#cbd5e1', 4),
  texto(x + 8, y + altura / 2 + 4, valor, { tamanho: 10.5, cor: cinza ? CINZA : cor }),
].join('\n');

const interruptor = (x, y, ligado) => [
  rect(x, y, 34, 18, ligado ? AZUL : '#9ca3af', null, 9),
  `  <circle cx="${ligado ? x + 25 : x + 9}" cy="${y + 9}" r="7" fill="#ffffff"/>`,
].join('\n');

const seta = (x1, y1, x2, y2, cor = AZUL) =>
  `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="1.6"/><circle cx="${x1}" cy="${y1}" r="3" fill="${cor}"/>`;

const etiquetaLado = (x, y, titulo, linhas, cor = AZUL) => [
  rect(x, y, 168, 10 + 14 * (linhas.length + 1), '#ffffff', cor, 6),
  texto(x + 9, y + 15, titulo, { tamanho: 10.5, cor, negrito: true }),
  ...linhas.map((l, i) => texto(x + 9, y + 29 + i * 13, l, { tamanho: 9.5 })),
].join('\n');

export const telas = {};

// ---------------------------------------------------------------- 1. janela principal
const mensagem = (y, remetente, assunto, previa, { lida = true, selecionada = false, bandeira = false, anexo = false } = {}) => [
  rect(166, y, 190, 50, selecionada ? AZUL_CLARO : '#ffffff'),
  selecionada ? rect(166, y, 3, 50, AZUL) : '',
  texto(178, y + 16, remetente, { tamanho: 10.5, negrito: !lida }),
  texto(178, y + 31, assunto, { tamanho: 10, negrito: !lida, cor: lida ? '#374151' : AZUL }),
  texto(178, y + 45, previa, { tamanho: 9, cor: CINZA }),
  bandeira ? `  <path d="M336 ${y + 8} v14 M336 ${y + 8} h10 l-3 4 l3 4 h-10" fill="${VERMELHO}" stroke="${VERMELHO}" stroke-width="1.2"/>` : '',
  anexo ? `  <path d="M344 ${y + 34} l-6 6 a3 3 0 0 0 4 4 l7 -7" fill="none" stroke="${CINZA}" stroke-width="1.2"/>` : '',
  `  <line x1="166" y1="${y + 50}" x2="356" y2="${y + 50}" stroke="${LINHA}"/>`,
].join('\n');

const pasta = (y, nome, { sel = false, n = null } = {}) => [
  sel ? rect(48, y - 13, 114, 20, AZUL_CLARO, null, 4) : '',
  rect(54, y - 8, 11, 9, sel ? AZUL : '#9ca3af', null, 2),
  texto(70, y + 1, nome, { tamanho: 9, negrito: sel }),
  n ? texto(158, y + 1, String(n), { tamanho: 9.5, cor: AZUL, negrito: true }).replace('<text', '<text text-anchor="end"') : '',
].join('\n');

telas['janela-principal'] = svg([
  moldura('Caixa de Entrada — Outlook'),
  // barra de ferramentas
  rect(44, 46, 582, 36, '#f8fafc', LINHA),
  rect(112, 54, 240, 22, '#ffffff', '#cbd5e1', 11),
  texto(130, 69, 'Pesquisar', { tamanho: 10, cor: CINZA }),
  `  <circle cx="123" cy="65" r="4" fill="none" stroke="${CINZA}" stroke-width="1.3"/>`,
  rect(398, 52, 108, 26, AZUL, null, 5),
  texto(452, 69, '+ Novo e-mail', { tamanho: 10.5, cor: '#ffffff', negrito: true, centro: true }),
  texto(520, 69, 'Responder   Excluir', { tamanho: 10, cor: '#374151' }),
  // trilho de aplicativos
  rect(14, 46, 30, 344, '#f3f4f6'),
  rect(20, 94, 18, 14, AZUL, null, 3),
  rect(20, 126, 18, 14, '#9ca3af', null, 3),
  rect(20, 158, 18, 14, '#9ca3af', null, 3),
  rect(20, 190, 18, 14, '#9ca3af', null, 3),
  // painel de pastas
  rect(44, 82, 122, 308, '#faf9f8'),
  texto(54, 102, 'Pastas', { tamanho: 9.5, cor: CINZA, negrito: true }),
  pasta(124, 'Caixa de Entrada', { sel: true, n: 3 }),
  pasta(146, 'Rascunhos', { n: 1 }),
  pasta(168, 'Itens Enviados'),
  pasta(190, 'Itens Excluídos'),
  pasta(212, 'Lixo Eletrônico', { n: 2 }),
  pasta(234, 'Arquivo'),
  texto(54, 262, 'Minhas pastas', { tamanho: 9.5, cor: CINZA, negrito: true }),
  pasta(282, 'Financeiro'),
  pasta(304, 'Recursos Humanos'),
  // lista de mensagens
  rect(166, 82, 192, 308, '#ffffff', LINHA),
  texto(178, 100, 'Todas   Não lidas   Sinalizadas', { tamanho: 9.5, cor: AZUL, negrito: true }),
  `  <line x1="166" y1="108" x2="356" y2="108" stroke="${LINHA}"/>`,
  mensagem(108, 'Ana Souza — RH', 'Escala de férias 2026', 'Prezados, segue a escala…', { lida: false, selecionada: true, anexo: true }),
  mensagem(158, 'Carlos Lima', 'Reunião de segunda', 'Confirmo presença às 9h…', { lida: false }),
  mensagem(208, 'Financeiro', 'Nota fiscal 000.123', 'Boa tarde, enviamos a nota…', { bandeira: true, anexo: true }),
  mensagem(258, 'Marina Costa', 'Orçamento aprovado', 'Pode seguir com o pedido…'),
  mensagem(308, 'TI — Suporte', 'Atualização do sistema', 'Na sexta haverá manutenção…'),
  // painel de leitura
  texto(378, 106, 'Escala de férias 2026', { tamanho: 13, negrito: true }),
  `  <circle cx="390" cy="130" r="12" fill="${AZUL}"/>`,
  texto(390, 134, 'AS', { tamanho: 9.5, cor: '#ffffff', negrito: true, centro: true }),
  texto(410, 127, 'Ana Souza — RH', { tamanho: 10.5, negrito: true }),
  texto(410, 141, 'Para: você  ·  Seg 05/03, 09:12', { tamanho: 9, cor: CINZA }),
  `  <line x1="372" y1="154" x2="614" y2="154" stroke="${LINHA}"/>`,
  texto(378, 174, 'Prezados,', { tamanho: 10.5 }),
  texto(378, 192, 'segue em anexo a escala de férias de 2026.', { tamanho: 10.5 }),
  texto(378, 208, 'Peço que confirmem as datas até sexta-feira.', { tamanho: 10.5 }),
  texto(378, 232, 'Atenciosamente,', { tamanho: 10.5 }),
  texto(378, 248, 'Ana Souza', { tamanho: 10.5, negrito: true }),
  rect(378, 268, 150, 26, '#f3f4f6', '#d1d5db', 4),
  texto(388, 285, 'Escala_Ferias_2026.xlsx', { tamanho: 9.5 }),
  // selos (cada um fica ao lado do que numera)
  selo(100, 102, 1, VERDE),
  selo(100, 65, 2, VERDE),
  selo(390, 65, 3, VERDE),
  selo(344, 100, 4, VERDE),
  selo(560, 232, 5, VERDE),
  selo(29, 72, 6, VERDE),
  // legenda
  rect(372, 312, 244, 68, '#ffffff', LINHA, 6),
  texto(382, 328, '1 Pastas      2 Pesquisa      3 Novo e-mail', { tamanho: 9 }),
  texto(382, 344, '4 Lista de mensagens   5 Painel de leitura', { tamanho: 9 }),
  texto(382, 360, '6 Alternador: E-mail, Calendário,', { tamanho: 9 }),
  texto(382, 373, '   Pessoas e Tarefas', { tamanho: 9 }),
], '#dfe8f5');

// ---------------------------------------------------------------- 2. anatomia
telas['anatomia-email'] = svg([
  moldura('Novo e-mail — Outlook'),
  rect(14, 46, 612, 32, '#f3f4f6'),
  rect(26, 52, 66, 22, AZUL, null, 4),
  texto(59, 67, 'Enviar', { tamanho: 10.5, cor: '#ffffff', negrito: true, centro: true }),
  texto(106, 67, 'Anexar     Assinatura     Opções', { tamanho: 10, cor: '#374151' }),
  texto(30, 100, 'Para', { tamanho: 10, cor: CINZA }),
  campoTexto(66, 86, 300, 'joana.mendes@empresa.com.br'),
  texto(30, 130, 'Cc', { tamanho: 10, cor: CINZA }),
  campoTexto(66, 116, 300, 'gerencia@empresa.com.br'),
  texto(30, 160, 'Cco', { tamanho: 10, cor: CINZA }),
  campoTexto(66, 146, 300, 'arquivo@empresa.com.br'),
  texto(30, 190, 'Assunto', { tamanho: 10, cor: CINZA }),
  campoTexto(66, 176, 300, 'Relatório de vendas de fevereiro — para aprovação'),
  rect(26, 210, 340, 130, '#ffffff', '#e5e7eb', 4),
  texto(36, 228, 'Prezada Joana,', { tamanho: 10.5 }),
  texto(36, 246, 'Segue em anexo o relatório de vendas de fevereiro.', { tamanho: 10.5 }),
  texto(36, 262, 'Peço sua aprovação até sexta-feira, dia 07.', { tamanho: 10.5 }),
  texto(36, 284, 'Atenciosamente,', { tamanho: 10.5 }),
  rect(30, 292, 200, 42, '#f8fafc', '#93c5fd', 3).replace('/>', ' stroke-dasharray="4 3"/>'),
  texto(38, 308, 'Marcos Oliveira', { tamanho: 10.5, negrito: true }),
  texto(38, 323, 'Assistente Administrativo  ·  (92) 90000-0000', { tamanho: 8.5, cor: CINZA }),
  rect(26, 346, 190, 26, AZUL_CLARO, '#93c5fd', 4),
  texto(36, 363, 'Relatorio_Vendas_Fev.xlsx  (48 KB)', { tamanho: 9.5 }),
  // setas
  seta(366, 98, 400, 76), etiquetaLado(404, 52, 'Para', ['Quem deve agir ou responder.', 'Um ou mais destinatários.']),
  seta(366, 128, 400, 134), etiquetaLado(404, 108, 'Cc (cópia)', ['Quem precisa estar ciente.', 'Todos veem o endereço.']),
  seta(366, 158, 400, 190), etiquetaLado(404, 164, 'Cco (cópia oculta)', ['Ninguém vê os endereços.', 'Use em listas e avisos.']),
  seta(366, 188, 400, 246), etiquetaLado(404, 220, 'Assunto', ['Curto e específico: diz o', 'que é e o que se espera.']),
  seta(230, 313, 400, 302, VERDE), etiquetaLado(404, 276, 'Assinatura', ['Nome, cargo e contato,', 'sempre no mesmo padrão.'], VERDE),
  seta(216, 359, 400, 358, VERDE), etiquetaLado(404, 332, 'Anexo', ['Cite no texto e confira', 'o arquivo certo.'], VERDE),
], '#dfe8f5');

// ---------------------------------------------------------------- 3. molde
const bloco = (y, tag, cor, titulo, exemplo) => [
  rect(26, y, 112, 38, cor, null, 6),
  texto(82, y + 24, tag, { tamanho: 11, cor: '#ffffff', negrito: true, centro: true }),
  rect(144, y, 466, 38, '#ffffff', '#d1d5db', 6),
  texto(156, y + 16, titulo, { tamanho: 10.5, negrito: true }),
  texto(156, y + 31, exemplo, { tamanho: 9.5, cor: CINZA }),
].join('\n');

telas['molde-estrutura'] = svg([
  rect(14, 10, 612, 380, '#ffffff', '#cbd5e1', 10),
  texto(320, 38, 'Estrutura de um e-mail administrativo (molde de 7 blocos)', { tamanho: 13.5, negrito: true, centro: true }),
  bloco(52, '1 Assunto', AZUL, 'Diz o assunto e a ação esperada', 'Solicitação de orçamento — material de escritório (resposta até 12/03)'),
  bloco(96, '2 Saudação', '#0891b2', 'Cumprimento + nome de quem recebe', 'Prezada Joana,   ·   Bom dia, Sr. Roberto,'),
  bloco(140, '3 Contexto', '#7c3aed', 'Uma frase: por que você escreve', 'Escrevo em nome do setor administrativo da Empresa Alfa.'),
  bloco(184, '4 Pedido', '#c2410c', 'O que você precisa, de forma direta', 'Gostaríamos de receber orçamento de 50 resmas de papel A4.'),
  bloco(228, '5 Prazo', '#b91c1c', 'Data ou prazo da resposta/ação', 'Pedimos o retorno até quinta-feira, dia 12, às 17h.'),
  bloco(272, '6 Encerramento', '#15803d', 'Agradecimento e despedida formal', 'Agradeço a atenção.   Atenciosamente,'),
  bloco(316, '7 Assinatura', '#374151', 'Nome, cargo, empresa e contato', 'Marcos Oliveira · Assistente Administrativo · (92) 90000-0000'),
  texto(320, 380, 'Um e-mail por assunto, em poucas linhas, sem letras maiúsculas o tempo todo e sem gírias.', { tamanho: 10, cor: CINZA, centro: true }),
], '#e5e7eb');

// ---------------------------------------------------------------- 4. assinatura
telas['assinatura-configuracoes'] = svg([
  moldura('Configurações — Outlook'),
  rect(14, 46, 150, 344, '#faf9f8'),
  texto(28, 70, 'Configurações', { tamanho: 11.5, negrito: true }),
  texto(28, 96, 'Geral', { tamanho: 10.5, cor: '#374151' }),
  rect(20, 110, 138, 22, AZUL_CLARO, null, 4),
  texto(28, 125, 'Email', { tamanho: 10.5, negrito: true, cor: AZUL }),
  texto(28, 152, 'Calendário', { tamanho: 10.5, cor: '#374151' }),
  texto(28, 176, 'Pessoas', { tamanho: 10.5, cor: '#374151' }),
  rect(164, 46, 150, 344, '#ffffff', LINHA),
  texto(176, 70, 'Redigir e responder', { tamanho: 10.5, negrito: true, cor: AZUL }),
  rect(168, 56, 142, 22, AZUL_CLARO, null, 4).replace('fill="#e6f0fa"', 'fill="#e6f0fa" opacity="0.6"'),
  texto(176, 98, 'Regras', { tamanho: 10.5, cor: '#374151' }),
  texto(176, 122, 'Respostas automáticas', { tamanho: 10.5, cor: '#374151' }),
  texto(176, 146, 'Layout', { tamanho: 10.5, cor: '#374151' }),
  texto(176, 170, 'Pastas', { tamanho: 10.5, cor: '#374151' }),
  texto(332, 70, 'Assinatura de email', { tamanho: 13, negrito: true }),
  texto(332, 90, 'Nome da assinatura', { tamanho: 9.5, cor: CINZA }),
  campoTexto(332, 96, 190, 'Padrão — Marcos'),
  rect(332, 124, 282, 100, '#ffffff', '#cbd5e1', 4),
  texto(344, 144, 'Marcos Oliveira', { tamanho: 11.5, negrito: true }),
  texto(344, 160, 'Assistente Administrativo', { tamanho: 10 }),
  texto(344, 175, 'Empresa Alfa Ltda', { tamanho: 10 }),
  texto(344, 190, 'Tel.: (92) 90000-0000', { tamanho: 10, cor: CINZA }),
  texto(344, 205, 'marcos.oliveira@empresaalfa.com.br', { tamanho: 10, cor: AZUL }),
  texto(332, 244, 'Assinatura padrão', { tamanho: 10.5, negrito: true }),
  texto(332, 262, 'Para novas mensagens:', { tamanho: 9.5, cor: '#374151' }),
  campoTexto(332, 267, 190, 'Padrão — Marcos', { altura: 22 }),
  texto(332, 306, 'Para respostas e encaminhamentos:', { tamanho: 9.5, cor: '#374151' }),
  campoTexto(332, 311, 190, 'Padrão — Marcos', { altura: 22 }),
  rect(332, 346, 13, 13, AZUL, null, 2),
  `  <path d="M335 352 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="1.8"/>`,
  texto(352, 357, 'Incluir nas mensagens que eu enviar', { tamanho: 9.5 }),
  botao(546, 340, 'Salvar', { primario: true }),
], '#dfe8f5');

// ---------------------------------------------------------------- 5. resposta automática
telas['resposta-automatica'] = svg([
  moldura('Respostas automáticas — Outlook'),
  texto(40, 74, 'Respostas automáticas', { tamanho: 14, negrito: true }),
  texto(40, 94, 'Avise quem escreve para você que você está ausente.', { tamanho: 10, cor: CINZA }),
  interruptor(40, 108, true),
  texto(84, 121, 'Ativar respostas automáticas', { tamanho: 10.5, negrito: true }),
  rect(40, 138, 13, 13, AZUL, null, 2),
  `  <path d="M43 144 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="1.8"/>`,
  texto(60, 149, 'Enviar respostas somente durante um período', { tamanho: 10 }),
  texto(40, 176, 'Início', { tamanho: 9.5, cor: CINZA }),
  campoTexto(40, 182, 120, '16/03/2026   08:00'),
  texto(180, 176, 'Término', { tamanho: 9.5, cor: CINZA }),
  campoTexto(180, 182, 120, '27/03/2026   18:00'),
  rect(320, 134, 290, 214, '#ffffff', '#cbd5e1', 4),
  texto(332, 156, 'Assunto: Ausência — retorno em 30/03', { tamanho: 10.5, negrito: true }),
  `  <line x1="326" y1="166" x2="604" y2="166" stroke="${LINHA}"/>`,
  texto(332, 186, 'Olá,', { tamanho: 10.5 }),
  texto(332, 204, 'Estou de férias de 16 a 27 de março e retorno', { tamanho: 10.5 }),
  texto(332, 220, 'no dia 30. Não terei acesso ao e-mail nesse período.', { tamanho: 10.5 }),
  texto(332, 242, 'Em caso de urgência, procure a Joana Mendes:', { tamanho: 10.5 }),
  texto(332, 258, 'joana.mendes@empresaalfa.com.br', { tamanho: 10.5, cor: AZUL }),
  texto(332, 284, 'Atenciosamente,', { tamanho: 10.5 }),
  texto(332, 300, 'Marcos Oliveira', { tamanho: 10.5, negrito: true }),
  rect(40, 222, 13, 13, AZUL, null, 2),
  `  <path d="M43 228 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="1.8"/>`,
  texto(60, 233, 'Responder só a pessoas da minha organização', { tamanho: 9.5 }),
  rect(40, 250, 13, 13, '#ffffff', '#6b7280', 2),
  texto(60, 261, 'Responder também a contatos externos', { tamanho: 9.5 }),
  botao(40, 300, 'Salvar', { primario: true }),
  botao(112, 300, 'Descartar'),
  rect(40, 336, 270, 38, '#fffbeb', '#fcd34d', 6),
  texto(50, 352, 'Boa prática: diga até quando, quem substitui', { tamanho: 9.5, cor: '#92400e' }),
  texto(50, 366, 'e dê um contato para urgências.', { tamanho: 9.5, cor: '#92400e' }),
], '#dfe8f5');

// ---------------------------------------------------------------- 6. regra
telas['regra-e-pastas'] = svg([
  moldura('Regras — Outlook'),
  texto(40, 74, 'Criar uma regra', { tamanho: 14, negrito: true }),
  texto(40, 94, 'Organize os e-mails automaticamente, assim que chegam.', { tamanho: 10, cor: CINZA }),
  texto(40, 118, '1. Nome da regra', { tamanho: 10.5, negrito: true }),
  campoTexto(40, 124, 270, 'Notas fiscais do financeiro'),
  texto(40, 166, '2. Condição: quando a mensagem chegar…', { tamanho: 10.5, negrito: true }),
  campoTexto(40, 172, 130, 'De'),
  campoTexto(176, 172, 190, 'financeiro@fornecedor.com.br'),
  texto(40, 220, '3. Ação: então…', { tamanho: 10.5, negrito: true }),
  campoTexto(40, 226, 130, 'Mover para'),
  campoTexto(176, 226, 190, 'Pasta  ›  Financeiro'),
  rect(40, 268, 13, 13, AZUL, null, 2),
  `  <path d="M43 274 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="1.8"/>`,
  texto(60, 279, 'Parar de processar mais regras', { tamanho: 9.5 }),
  botao(40, 300, 'Salvar', { primario: true }),
  botao(112, 300, 'Cancelar'),
  // resultado
  rect(400, 66, 210, 300, '#faf9f8', LINHA, 6),
  texto(412, 88, 'Resultado', { tamanho: 10.5, negrito: true, cor: AZUL }),
  texto(412, 112, 'Caixa de Entrada', { tamanho: 10 }),
  texto(412, 130, '  Escala de férias', { tamanho: 9.5, cor: CINZA }),
  texto(412, 146, '  Reunião de segunda', { tamanho: 9.5, cor: CINZA }),
  rect(406, 166, 198, 24, AZUL_CLARO, null, 4),
  rect(414, 173, 11, 9, AZUL, null, 2),
  texto(431, 182, 'Financeiro   (2 novas)', { tamanho: 10, negrito: true, cor: AZUL }),
  texto(412, 204, '  NF 000.123 — Distribuidora', { tamanho: 9.5, cor: CINZA }),
  texto(412, 220, '  Boleto de março — vence 10', { tamanho: 9.5, cor: CINZA }),
  texto(412, 246, 'Recursos Humanos', { tamanho: 10 }),
  rect(406, 268, 198, 82, '#fff', '#d1d5db', 6),
  texto(414, 286, 'Dica', { tamanho: 10, negrito: true }),
  texto(414, 302, 'Crie uma regra para cada remetente', { tamanho: 9.5 }),
  texto(414, 317, 'ou assunto que se repete. Revise a', { tamanho: 9.5 }),
  texto(414, 332, 'pasta uma vez por dia.', { tamanho: 9.5 }),
  `  <path d="M368 190 L392 190 L392 190" fill="none"/>`,
  seta(368, 184, 400, 178, VERDE),
], '#dfe8f5');

// ---------------------------------------------------------------- 7. convite
telas['convite-reuniao'] = svg([
  moldura('Nova reunião — Calendário do Outlook'),
  rect(14, 46, 612, 32, '#f3f4f6'),
  rect(26, 52, 66, 22, AZUL, null, 4),
  texto(59, 67, 'Enviar', { tamanho: 10.5, cor: '#ffffff', negrito: true, centro: true }),
  texto(106, 67, 'Reunião do Teams     Repetir     Lembrete', { tamanho: 10, cor: '#374151' }),
  texto(30, 104, 'Título', { tamanho: 10, cor: CINZA }),
  campoTexto(112, 90, 330, 'Alinhamento do fechamento mensal'),
  texto(30, 136, 'Participantes', { tamanho: 10, cor: CINZA }),
  campoTexto(112, 122, 330, 'joana.mendes@…; carlos.lima@…; financeiro@…'),
  texto(30, 168, 'Início', { tamanho: 10, cor: CINZA }),
  campoTexto(112, 154, 120, 'Seg 09/03/2026'),
  campoTexto(238, 154, 70, '09:00'),
  texto(318, 168, 'Término', { tamanho: 10, cor: CINZA }),
  campoTexto(370, 154, 72, '09:30'),
  texto(30, 200, 'Local', { tamanho: 10, cor: CINZA }),
  campoTexto(112, 186, 330, 'Sala 2 — ou — Reunião online do Teams'),
  rect(26, 222, 416, 120, '#ffffff', '#e5e7eb', 4),
  texto(36, 240, 'Pauta (3 itens):', { tamanho: 10.5, negrito: true }),
  texto(36, 258, '1. Conferir lançamentos do mês', { tamanho: 10 }),
  texto(36, 274, '2. Pendências de notas fiscais', { tamanho: 10 }),
  texto(36, 290, '3. Definir responsáveis pelas próximas entregas', { tamanho: 10 }),
  texto(36, 316, 'Peço que respondam ao convite até sexta-feira.', { tamanho: 10, cor: CINZA }),
  texto(36, 332, 'Aceitar, Recusar ou Propor novo horário.', { tamanho: 10, cor: CINZA }),
  etiquetaLado(456, 90, 'Título claro', ['Diz o assunto da reunião.']),
  etiquetaLado(456, 138, 'Participantes', ['Obrigatórios e opcionais.', 'Confira os endereços.']),
  etiquetaLado(456, 200, 'Data, hora e local', ['Presencial ou Teams.', 'Defina a duração.']),
  etiquetaLado(456, 262, 'Pauta no corpo', ['Objetivo e itens: evita', 'reunião sem rumo.'], VERDE),
  etiquetaLado(456, 326, 'Responder o convite', ['Aceitar, Recusar ou', 'Propor novo horário.'], VERDE),
], '#dfe8f5');

// ---------------------------------------------------------------- 8. phishing
const bandeiraSinal = (x, y, n, titulo, linha) => [
  selo(x, y, n, VERMELHO),
  texto(x + 16, y + 4, titulo, { tamanho: 10, negrito: true, cor: VERMELHO }),
  texto(x + 16, y + 18, linha, { tamanho: 9, cor: '#374151' }),
].join('\n');

telas['sinais-phishing'] = svg([
  moldura('E-mail suspeito — Outlook'),
  rect(30, 58, 340, 316, '#ffffff', '#e5e7eb', 6),
  texto(44, 80, 'URGENTE!!! Sua conta será bloqueada', { tamanho: 12, negrito: true }),
  texto(44, 100, 'De: Suporte Banco <atendimento@banc0-seguro.xyz>', { tamanho: 9.5, cor: CINZA }),
  texto(44, 114, 'Para: você', { tamanho: 9.5, cor: CINZA }),
  `  <line x1="36" y1="124" x2="364" y2="124" stroke="${LINHA}"/>`,
  texto(44, 146, 'Prezado cliente,', { tamanho: 10.5 }),
  texto(44, 164, 'Detectamos atividade estranha na sua conta. Voce', { tamanho: 10.5 }),
  texto(44, 180, 'tem 24 horas para confirmar seus dados ou ela', { tamanho: 10.5 }),
  texto(44, 196, 'sera cancelada para sempre.', { tamanho: 10.5 }),
  rect(44, 212, 210, 28, '#2563eb', null, 5),
  texto(149, 230, 'Confirmar meus dados agora', { tamanho: 10.5, cor: '#ffffff', negrito: true, centro: true }),
  texto(44, 260, 'bit.ly/confirma-conta-12x', { tamanho: 10, cor: '#2563eb' }),
  rect(44, 278, 200, 26, '#fee2e2', '#fca5a5', 4),
  texto(54, 295, 'Formulario_Cadastro.exe', { tamanho: 9.5 }),
  texto(44, 330, 'Equipe de Segurança', { tamanho: 10.5 }),
  // sinais
  bandeiraSinal(394, 74, 1, 'Remetente estranho', 'Endereço com "0" no lugar de "o".'),
  bandeiraSinal(394, 126, 2, 'Urgência e ameaça', 'Pressa e medo para você não pensar.'),
  bandeiraSinal(394, 178, 3, 'Saudação genérica', '"Prezado cliente", sem o seu nome.'),
  bandeiraSinal(394, 230, 4, 'Erros de português', 'Falta de acentos e frases estranhas.'),
  bandeiraSinal(394, 282, 5, 'Link encurtado', 'Passe o mouse e veja o destino real.'),
  bandeiraSinal(394, 334, 6, 'Anexo perigoso', 'Arquivo .exe nunca deve ser aberto.'),
], '#fde8e8');
