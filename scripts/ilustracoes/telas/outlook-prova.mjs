// Exemplo de e-mail pronto (com assinatura) da prova de Internet e Outlook.
// Sai em public/provas/ porque o .prova.ts é carregado pelo servidor e só
// pode apontar imagem por caminho (ver `exemploImagem` em src/types/quiz.ts).
import { chamada, svg, texto } from '../pecas.mjs';

export const destino = 'outlook-prova';
export const saida = 'public/provas/internet-e-outlook';

const AZUL_OUTLOOK = '#0f6cbd';
const CINZA = '#6b7280';

export const telas = {};

function campo(y, rotulo, valor) {
  return [
    texto(36, y, rotulo, { tamanho: 11, cor: CINZA }),
    texto(86, y, valor, { tamanho: 11.5 }),
    `  <line x1="32" y1="${y + 7}" x2="424" y2="${y + 7}" stroke="#e5e7eb"/>`,
  ].join('\n');
}

telas['exemplo-mensagem-assinatura'] = svg([
  '  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
  `  <path d="M20 26 a10 10 0 0 1 10 -10 h580 a10 10 0 0 1 10 10 v26 h-600 z" fill="${AZUL_OUTLOOK}"/>`,
  texto(320, 34, 'Nova mensagem - Outlook', { tamanho: 12, cor: '#ffffff', centro: true }),
  '  <g fill="#ffffff" font-size="12"><text x="556" y="34">—</text><rect x="578" y="26" width="9" height="9" fill="none" stroke="#ffffff"/><text x="600" y="35">×</text></g>',
  '  <rect x="20" y="42" width="600" height="34" fill="#f3f4f6"/>',
  `  <rect x="32" y="48" width="66" height="22" rx="4" fill="${AZUL_OUTLOOK}"/>`,
  texto(65, 63, 'Enviar', { tamanho: 11.5, cor: '#ffffff', centro: true, negrito: true }),
  texto(112, 63, 'Anexar', { tamanho: 11, cor: '#374151' }),
  texto(164, 63, 'Assinatura', { tamanho: 11, cor: '#374151' }),
  campo(98, 'Para', 'professora@exemplo.com'),
  campo(122, 'Cc', 'coordenacao@exemplo.com'),
  campo(146, 'Assunto', 'Avaliação Internet e Outlook – Maria Silva'),
  texto(36, 176, 'Prezada professora,', { tamanho: 12 }),
  texto(36, 198, 'Segue em anexo a pesquisa sobre a história da internet', { tamanho: 12 }),
  texto(36, 214, 'no Brasil e a imagem solicitada na avaliação.', { tamanho: 12 }),
  texto(36, 238, 'Atenciosamente,', { tamanho: 12 }),
  `  <rect x="30" y="250" width="396" height="64" rx="4" fill="#f8fafc" stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="4 3"/>`,
  texto(40, 270, 'Maria Silva', { tamanho: 12.5, negrito: true }),
  texto(40, 285, 'Aluna do curso de Informática', { tamanho: 10.5, cor: CINZA }),
  texto(40, 300, 'Tel.: (00) 90000-0000  •  maria.silva@exemplo.com', { tamanho: 10.5, cor: CINZA }),
  '  <rect x="32" y="328" width="160" height="24" rx="4" fill="#eef2fb" stroke="#cbd5e1"/>',
  texto(42, 344, 'Internet_MariaSilva.docx', { tamanho: 10 }),
  '  <rect x="200" y="328" width="100" height="24" rx="4" fill="#eef2fb" stroke="#cbd5e1"/>',
  texto(210, 344, 'tecnologia.jpg', { tamanho: 10 }),
  chamada(440, 90, 168, 'Assunto claro', ['nome da prova', 'e o seu nome'], { escura: false }),
  chamada(440, 160, 168, 'Corpo formal', ['saudação, o que está', 'anexado, despedida'], { escura: false }),
  chamada(440, 240, 168, 'Assinatura', ['nome, curso e contato', 'já vem pronta'], { escura: true }),
  chamada(440, 314, 168, 'Anexos', ['os 2 arquivos juntos'], { escura: false }),
], '#dfe8f5');
