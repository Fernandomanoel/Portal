// Notas fiscais fictícias da prova de Contabilidade (empresas e CNPJ inventados).
// Saem em public/provas/ porque o .prova.ts é carregado pelo servidor e só
// pode apontar imagem por caminho.
import { svg, texto } from '../pecas.mjs';

export const destino = 'contabilidade-notas';
export const saida = 'public/provas/contabilidade';

const TRACO = '#374151';
const CINZA = '#6b7280';

const caixa = (x, y, l, a, titulo, linhas) => [
  `  <rect x="${x}" y="${y}" width="${l}" height="${a}" fill="#ffffff" stroke="${TRACO}" stroke-width="1"/>`,
  texto(x + 6, y + 13, titulo, { tamanho: 8.5, cor: CINZA }),
  ...linhas.map((linha, i) => texto(x + 6, y + 29 + i * 15, linha, { tamanho: 11, negrito: i === 0 })),
].join('\n');

function tabela(y, colunas, linhas, total) {
  const larguras = colunas.map((c) => c.l);
  const xs = larguras.reduce((acc, l, i) => [...acc, acc[i] + l], [24]);
  const saidaSvg = [];
  saidaSvg.push(`  <rect x="24" y="${y}" width="${xs[xs.length - 1] - 24}" height="20" fill="#e5e7eb" stroke="${TRACO}"/>`);
  colunas.forEach((c, i) => saidaSvg.push(texto(c.dir ? xs[i + 1] - 6 : xs[i] + 6, y + 14, c.t, { tamanho: 9.5, negrito: true, ...(c.dir ? {} : {}) }).replace('<text', c.dir ? '<text text-anchor="end"' : '<text')));
  linhas.forEach((linha, r) => {
    const yy = y + 20 + r * 22;
    saidaSvg.push(`  <rect x="24" y="${yy}" width="${xs[xs.length - 1] - 24}" height="22" fill="#ffffff" stroke="${TRACO}" stroke-width="0.8"/>`);
    linha.forEach((valor, i) => {
      const ancora = colunas[i].dir ? ' text-anchor="end"' : '';
      const px = colunas[i].dir ? xs[i + 1] - 6 : xs[i] + 6;
      saidaSvg.push(`  <text x="${px}" y="${yy + 15}" font-size="11" fill="#1f2937"${ancora}>${valor}</text>`);
    });
  });
  return saidaSvg.join('\n');
}

export const telas = {};

telas['nota-fiscal-compra'] = svg([
  '  <rect x="14" y="8" width="612" height="384" fill="#ffffff" stroke="#111827" stroke-width="1.6"/>',
  texto(24, 28, 'NOTA FISCAL (DANFE) — modelo ilustrativo', { tamanho: 12, negrito: true }),
  texto(616, 28, 'Nº 000.123  ·  Emissão: 05/03/2026', { tamanho: 10.5, cor: CINZA }).replace('<text', '<text text-anchor="end"'),
  caixa(24, 38, 296, 62, 'EMITENTE', ['Distribuidora Alfa Ltda', 'CNPJ 12.345.678/0001-90', 'Rua das Indústrias, 100 — Manaus/AM']),
  caixa(328, 38, 288, 62, 'DESTINATÁRIO', ['Mercado Bom Preço Ltda', 'CNPJ 98.765.432/0001-10', 'Av. Central, 500 — Manaus/AM']),
  texto(24, 118, 'DADOS DOS PRODUTOS', { tamanho: 9.5, cor: CINZA, negrito: true }),
  tabela(
    124,
    [
      { t: 'Cód.', l: 50 },
      { t: 'Descrição', l: 210 },
      { t: 'Un.', l: 50 },
      { t: 'Qtd.', l: 60, dir: true },
      { t: 'Valor unit. (R$)', l: 110, dir: true },
      { t: 'Valor total (R$)', l: 112, dir: true },
    ],
    [
      ['001', 'Arroz tipo 1 — pacote 5 kg', 'UN', '20', '18,00', '360,00'],
      ['002', 'Feijão carioca — pacote 1 kg', 'UN', '30', '7,50', '225,00'],
      ['003', 'Óleo de soja — garrafa 900 ml', 'UN', '40', '6,00', '240,00'],
    ],
  ),
  texto(24, 236, 'CÁLCULO DO TOTAL', { tamanho: 9.5, cor: CINZA, negrito: true }),
  caixa(24, 242, 190, 46, 'VALOR TOTAL DOS PRODUTOS (calcule)', ['R$ ________']),
  caixa(220, 242, 190, 46, 'VALOR DO FRETE', ['R$ 25,00']),
  caixa(416, 242, 200, 46, 'VALOR TOTAL DA NOTA (calcule)', ['R$ ________']),
  texto(24, 308, 'FATURA / PAGAMENTO', { tamanho: 9.5, cor: CINZA, negrito: true }),
  caixa(24, 314, 592, 62, 'CONDIÇÕES', ['Pagamento a prazo: 30 dias após a emissão', 'Compra de mercadorias para revenda']),
], '#e5e7eb');

telas['nota-fiscal-servico'] = svg([
  '  <rect x="14" y="8" width="612" height="384" fill="#ffffff" stroke="#111827" stroke-width="1.6"/>',
  texto(24, 28, 'NOTA FISCAL DE SERVIÇOS ELETRÔNICA (NFS-e) — modelo ilustrativo', { tamanho: 12, negrito: true }),
  texto(616, 46, 'Nº 458  ·  Emissão: 12/03/2026', { tamanho: 10.5, cor: CINZA }).replace('<text', '<text text-anchor="end"'),
  caixa(24, 54, 296, 62, 'PRESTADOR DE SERVIÇOS', ['Oficina Mecânica Silva ME', 'CNPJ 11.222.333/0001-44', 'Rua do Motor, 45 — Manaus/AM']),
  caixa(328, 54, 288, 62, 'TOMADOR DE SERVIÇOS', ['Transportadora Veloz Ltda', 'CNPJ 55.666.777/0001-88', 'Av. das Cargas, 900 — Manaus/AM']),
  texto(24, 134, 'DISCRIMINAÇÃO DOS SERVIÇOS', { tamanho: 9.5, cor: CINZA, negrito: true }),
  tabela(
    140,
    [
      { t: 'Item', l: 40 },
      { t: 'Descrição do serviço', l: 280 },
      { t: 'Qtd.', l: 60, dir: true },
      { t: 'Valor unit. (R$)', l: 110, dir: true },
      { t: 'Valor (R$)', l: 102, dir: true },
    ],
    [
      ['1', 'Troca de óleo e filtros — veículo', '2', '150,00', '300,00'],
      ['2', 'Alinhamento e balanceamento', '1', '120,00', '120,00'],
    ],
  ),
  texto(24, 236, 'TOTAIS E IMPOSTO', { tamanho: 9.5, cor: CINZA, negrito: true }),
  caixa(24, 242, 190, 46, 'VALOR TOTAL DOS SERVIÇOS (calcule)', ['R$ ________']),
  caixa(220, 242, 190, 46, 'ALÍQUOTA DO ISS', ['5%']),
  caixa(416, 242, 200, 46, 'CONDIÇÃO DE PAGAMENTO', ['À vista, na entrega']),
  texto(24, 308, 'OBSERVAÇÕES', { tamanho: 9.5, cor: CINZA, negrito: true }),
  caixa(24, 314, 592, 62, 'INFORMAÇÕES COMPLEMENTARES', ['O ISS (imposto sobre serviços) é calculado sobre o valor total dos serviços', 'Serviço prestado em 12/03/2026']),
], '#e5e7eb');
