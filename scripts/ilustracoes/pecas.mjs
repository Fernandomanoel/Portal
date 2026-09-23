// Peças para montar ilustrações de atividades em SVG (640 × 400) — usadas por
// Windows 11 e por qualquer curso novo (ex.: Photoshop, CorelDraw).
// Cada função devolve um trecho de SVG; uma tela é `svg([...trechos])`.
// Coordenadas em pixels do viewBox; a janela padrão ocupa x 20–620, y 16–384.

export const AZUL_ESCURO = '#0b4a9e';
export const CINZA = '#6b7280';
export const TEXTO = '#1f2937';
const FONTE = 'font-family="Segoe UI, system-ui, -apple-system, sans-serif"';

export function esc(conteudo) {
  return String(conteudo).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function svg(trechos, fundo = '#dfe8f5') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" ${FONTE}>
  <defs>
    <filter id="sombra" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
    <linearGradient id="fundoDesktop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f2a6b"/><stop offset="0.55" stop-color="#1d4ed8"/><stop offset="1" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <rect width="640" height="400" fill="${fundo}"/>
${trechos.join('\n')}
</svg>
`;
}

export function texto(x, y, conteudo, { tamanho = 11, cor = TEXTO, negrito = false, centro = false } = {}) {
  const extra = (negrito ? ' font-weight="700"' : '') + (centro ? ' text-anchor="middle"' : '');
  return `  <text x="${x}" y="${y}" font-size="${tamanho}" fill="${cor}"${extra}>${esc(conteudo)}</text>`;
}

/** Janela do Explorador de Arquivos: abas, endereço, barra de comandos e painel de navegação. */
export function janela(titulo, caminho, navSelecionado, {
  comandoDestacado = null,
  comandos = ['Recortar', 'Copiar', 'Colar', 'Renomear', 'Excluir'],
  mostrarNovo = true,
} = {}) {
  const partes = [`  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>
  <path d="M20 26 a10 10 0 0 1 10 -10 h580 a10 10 0 0 1 10 10 v24 h-600 z" fill="#eef1f5"/>
  <rect x="32" y="22" width="170" height="28" rx="6" fill="#ffffff"/>
  <rect x="42" y="30" width="14" height="11" rx="2" fill="#f6c343"/>
  <text x="62" y="40" font-size="11.5" fill="#1f2937">${esc(titulo)}</text>
  <g fill="#4b5563" font-size="12"><text x="556" y="38">—</text><rect x="578" y="30" width="9" height="9" fill="none" stroke="#4b5563"/><text x="600" y="39">×</text></g>
  <g font-size="11">
    <text x="36" y="72" fill="#9ca3af">←</text><text x="54" y="72" fill="#9ca3af">→</text><text x="72" y="72" fill="#4b5563">↑</text>
    <rect x="92" y="58" width="366" height="22" rx="5" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="102" y="73" fill="#374151">${esc(caminho)}</text>
    <rect x="468" y="58" width="140" height="22" rx="5" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="478" y="73" fill="#9ca3af">Pesquisar</text>
  </g>
  <line x1="20" y1="90" x2="620" y2="90" stroke="#e5e7eb"/>`];

  let x = 30;
  partes.push('  <g font-size="11.5">');
  if (mostrarNovo) {
    partes.push(`    <text x="${x + 8}" y="112" fill="#6b7280">⊕ Novo</text>`);
    x += 76;
  } else {
    x += 10;
  }
  for (const comando of comandos) {
    const largura = 16 + comando.length * 7.8;
    if (comando === comandoDestacado) {
      partes.push(`    <rect x="${x - 8}" y="96" width="${largura}" height="24" rx="5" fill="#dbeafe" stroke="#60a5fa"/>`);
      partes.push(`    <text x="${x}" y="112" font-weight="700" fill="${AZUL_ESCURO}">${esc(comando)}</text>`);
    } else {
      partes.push(`    <text x="${x}" y="112" fill="#6b7280">${esc(comando)}</text>`);
    }
    x += largura + 10;
  }
  partes.push('  </g>\n  <line x1="20" y1="126" x2="620" y2="126" stroke="#e5e7eb"/>');

  const itens = [['Início', 150], ['Galeria', 172], [null, 182], ['Área de Trabalho', 200], ['Downloads', 222],
    ['Documentos', 244], ['Imagens', 266], [null, 276], ['Este Computador', 294], ['Lixeira', 316]];
  partes.push('  <g font-size="11.5" fill="#1f2937">');
  for (const [nome, y] of itens) {
    if (nome === null) {
      partes.push(`    <line x1="32" y1="${y}" x2="164" y2="${y}" stroke="#eef0f3"/>`);
    } else if (nome === navSelecionado) {
      partes.push(`    <rect x="30" y="${y - 15}" width="136" height="22" rx="5" fill="#e5edf8"/>`);
      partes.push(`    <rect x="30" y="${y - 11}" width="3" height="14" rx="1.5" fill="#0067c0"/>`);
      partes.push(`    <text x="42" y="${y}" font-weight="700">${nome}</text>`);
    } else {
      partes.push(`    <text x="42" y="${y}">${nome}</text>`);
    }
  }
  partes.push('  </g>\n  <line x1="176" y1="126" x2="176" y2="384" stroke="#e5e7eb"/>');
  return partes.join('\n');
}

function rotuloDoItem(cx, y, rotulo, { selecionado, editando }) {
  const fs = rotulo.length <= 16 ? 10.5 : 9.5;
  if (editando) {
    const largura = Math.max(90, rotulo.length * fs * 0.62 + 16);
    return `<rect x="${cx - largura / 2}" y="${y + 70}" width="${largura}" height="18" fill="#ffffff" stroke="#0067c0" stroke-width="1.5"/>
  <text x="${cx}" y="${y + 83}" font-size="${fs}" text-anchor="middle" fill="#1f2937">${esc(rotulo)}</text>`;
  }
  const peso = selecionado ? ' font-weight="700"' : '';
  return `<text x="${cx}" y="${y + 82}" font-size="${fs}" text-anchor="middle" fill="#1f2937"${peso}>${esc(rotulo)}</text>`;
}

function quadroSelecao(cx, y, rotulo) {
  const fs = rotulo.length <= 16 ? 10.5 : 9.5;
  const largura = Math.max(112, rotulo.length * fs * 0.64 + 20);
  return `<rect x="${cx - largura / 2}" y="${y}" width="${largura}" height="92" rx="8" fill="#e5f1fb" stroke="#60a5fa"/>`;
}

/** Ícone de pasta (amarela) com o nome embaixo. `zip` desenha o zíper de uma pasta compactada. */
export function pasta(cx, y, rotulo, { selecionada = false, esmaecida = false, editando = false, zip = false } = {}) {
  const fundo = selecionada ? quadroSelecao(cx, y, rotulo) : '';
  const opacidade = esmaecida ? ' opacity="0.45"' : '';
  const ziper = zip
    ? Array.from({ length: 5 }, (_, i) => `<rect x="${cx - 3}" y="${y + 32 + i * 6}" width="6" height="3" fill="#6b7280"/>`).join('')
    : '';
  return `  <g${opacidade}>${fundo}
  <path d="M${cx - 30} ${y + 20} h22 l6 6 h32 v40 h-60 z" fill="#f6c343"/>
  <path d="M${cx - 30} ${y + 32} h60 v34 h-60 z" fill="#fbd35f"/>
  ${ziper}
  ${rotuloDoItem(cx, y, rotulo, { selecionado: selecionada, editando })}</g>`;
}

/** Ícone de arquivo de texto com o nome embaixo; `editando` desenha a caixa de renomear. */
export function arquivo(cx, y, rotulo, { selecionado = false, editando = false, esmaecido = false } = {}) {
  const opacidade = esmaecido ? ' opacity="0.4"' : '';
  const fundo = selecionado ? quadroSelecao(cx, y, rotulo) : '';
  return `  <g${opacidade}>${fundo}
  <path d="M${cx - 17} ${y + 14} h24 l10 10 v40 h-34 z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M${cx + 7} ${y + 14} v10 h10" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <g stroke="#94a3b8" stroke-width="1.5"><line x1="${cx - 11}" y1="${y + 36}" x2="${cx + 11}" y2="${y + 36}"/><line x1="${cx - 11}" y1="${y + 44}" x2="${cx + 11}" y2="${y + 44}"/><line x1="${cx - 11}" y1="${y + 52}" x2="${cx + 5}" y2="${y + 52}"/></g>
  ${rotuloDoItem(cx, y, rotulo, { selecionado, editando })}</g>`;
}

/**
 * Menu (botão direito ou menu de janela). `itens`: [rótulo, atalho, destacado];
 * rótulo vazio ('') desenha um separador.
 */
export function menu(x, y, itens, largura = 210) {
  const altura = 12 + itens.reduce((soma, [rotulo]) => soma + (rotulo ? 26 : 10), 0);
  const partes = [
    `  <g filter="url(#sombra)"><rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="8" fill="#f9f9f9" stroke="#d4d4d8"/></g>`,
    '  <g font-size="11.5" fill="#1f2937">',
  ];
  let cy = y + 6;
  for (const [rotulo, atalho, destacado] of itens) {
    if (!rotulo) {
      partes.push(`    <line x1="${x + 8}" y1="${cy + 5}" x2="${x + largura - 8}" y2="${cy + 5}" stroke="#e4e4e7"/>`);
      cy += 10;
      continue;
    }
    if (destacado) {
      partes.push(`    <rect x="${x + 6}" y="${cy + 1}" width="${largura - 12}" height="24" rx="5" fill="#dbeafe" stroke="#60a5fa"/>`);
    }
    const cor = destacado ? AZUL_ESCURO : '#1f2937';
    const peso = destacado ? ' font-weight="700"' : '';
    partes.push(`    <text x="${x + 16}" y="${cy + 17}" fill="${cor}"${peso}>${esc(rotulo)}</text>`);
    if (atalho) {
      partes.push(`    <text x="${x + largura - 14}" y="${cy + 17}" fill="#6b7280" text-anchor="end" font-size="10.5">${esc(atalho)}</text>`);
    }
    cy += 26;
  }
  partes.push('  </g>');
  return partes.join('\n');
}

/** Caixa explicativa: título em negrito + linhas. `escura` = azul cheio; senão, branca com borda. */
export function chamada(x, y, largura, titulo, linhas, { escura = true } = {}) {
  const altura = 32 + 16 * linhas.length;
  const fundo = escura ? `fill="${AZUL_ESCURO}"` : 'fill="#ffffff" stroke="#bfdbfe"';
  const corTitulo = escura ? '#ffffff' : AZUL_ESCURO;
  const corTexto = escura ? '#dbeafe' : '#1f2937';
  const partes = [
    `  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="8" ${fundo}/>`,
    `  <text x="${x + 12}" y="${y + 20}" font-size="11.5" font-weight="700" fill="${corTitulo}">${esc(titulo)}</text>`,
  ];
  linhas.forEach((linha, i) => {
    partes.push(`  <text x="${x + 12}" y="${y + 38 + 16 * i}" font-size="11" fill="${corTexto}">${esc(linha)}</text>`);
  });
  return partes.join('\n');
}

/** Tecla do teclado (ex.: 'Ctrl', 'F2'). */
export function tecla(x, y, nome, largura = null) {
  const w = largura ?? Math.max(34, nome.length * 9 + 16);
  return `  <rect x="${x}" y="${y + 3}" width="${w}" height="30" rx="6" fill="#cbd5e1"/>
  <rect x="${x}" y="${y}" width="${w}" height="30" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="${x + w / 2}" y="${y + 20}" font-size="12" font-weight="700" fill="#1f2937" text-anchor="middle">${esc(nome)}</text>`;
}

export function cursor(x, y) {
  return `  <g transform="translate(${x} ${y})"><path d="M0 0 L0 17 L4.5 13 L8 20 L11 18.5 L7.6 11.6 L13 11.6 Z" fill="#fff" stroke="#111" stroke-width="1"/></g>`;
}

/** Área de trabalho azul com a Lixeira e a barra de tarefas. Use com `svg(trechos, '#1d4ed8')`. */
export function areaDeTrabalho() {
  return `  <rect width="640" height="400" fill="url(#fundoDesktop)"/>
  <g fill="#fff" font-size="10" text-anchor="middle" transform="translate(16 0)">
    <path d="M29 24 h22 l-2 30 h-18 z" fill="#e0ecff" stroke="#fff" stroke-width="1.5"/>
    <rect x="26" y="20" width="28" height="4" rx="2" fill="#e0ecff"/>
    <text x="40" y="70">Lixeira</text>
  </g>
  <rect x="0" y="366" width="640" height="34" fill="#eef2f7" opacity="0.92"/>
  <g transform="translate(256 373)">
    <rect x="0" y="0" width="20" height="20" rx="4" fill="#2563eb"/>
    <rect x="5" y="5" width="4" height="4" fill="#fff"/><rect x="11" y="5" width="4" height="4" fill="#fff"/>
    <rect x="5" y="11" width="4" height="4" fill="#fff"/><rect x="11" y="11" width="4" height="4" fill="#fff"/>
    <rect x="32" y="2" width="16" height="16" rx="8" fill="none" stroke="#374151" stroke-width="2"/>
    <rect x="60" y="3" width="18" height="14" rx="2" fill="#fbbf24"/>
    <rect x="90" y="2" width="16" height="16" rx="4" fill="#0ea5e9"/>
  </g>
  <text x="620" y="387" font-size="10.5" fill="#1f2937" text-anchor="end">10:30</text>`;
}

function barraTitulo(titulo, corIcone, x = 20, y = 16, largura = 600) {
  return `  <text x="${x + 34}" y="${y + 22}" font-size="11.5" fill="${TEXTO}">${esc(titulo)}</text>
  <rect x="${x + 14}" y="${y + 11}" width="13" height="13" rx="3" fill="${corIcone}"/>
  <g fill="#4b5563" font-size="12"><text x="${x + largura - 64}" y="${y + 22}">—</text><rect x="${x + largura - 42}" y="${y + 14}" width="9" height="9" fill="none" stroke="#4b5563"/><text x="${x + largura - 20}" y="${y + 23}">×</text></g>`;
}

/** Janela de aplicativo (Bloco de Notas, Paint, Gerenciamento de Disco...) com barra de menus opcional. */
export function janelaApp(titulo, corIcone, { fundo = '#ffffff', menus = null, menuAberto = null } = {}) {
  const partes = [
    `  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="${fundo}" stroke="#cbd5e1"/></g>`,
    '  <path d="M20 26 a10 10 0 0 1 10 -10 h580 a10 10 0 0 1 10 10 v24 h-600 z" fill="#eef1f5"/>',
    barraTitulo(titulo, corIcone),
  ];
  if (menus) {
    let x = 34;
    partes.push('  <g font-size="11.5">');
    for (const nome of menus) {
      const largura = 16 + nome.length * 7;
      if (nome === menuAberto) {
        partes.push(`    <rect x="${x - 8}" y="54" width="${largura}" height="22" rx="4" fill="#dbeafe"/>`);
      }
      partes.push(`    <text x="${x}" y="69" fill="${TEXTO}">${esc(nome)}</text>`);
      x += largura + 6;
    }
    partes.push('  </g>');
    partes.push('  <line x1="20" y1="80" x2="620" y2="80" stroke="#e5e7eb"/>');
  }
  return partes.join('\n');
}

const ESCURO_PAINEL = '#2b2b2b';
const ESCURO_CANVAS = '#3a3a3a';
const CLARO_SOBRE_ESCURO = '#e5e7eb';

/**
 * Janela de um app criativo (Photoshop, CorelDraw, Illustrator...): barra de
 * título clara (a janela roda na área de trabalho do Windows, igual às
 * outras) + barra de menus escura + faixa de opções contextual reservada
 * mesmo vazia, para o layout de `caixaFerramentas`/`painelCriativo` bater
 * sempre nas mesmas coordenadas. `menus`: lista de rótulos. `opcoes`: lista
 * de rótulos da faixa contextual, ou `null` para deixá-la vazia.
 */
export function janelaCriativa(titulo, corIcone, { menus = [], opcoes = null } = {}) {
  const partes = [
    `  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="${ESCURO_CANVAS}" stroke="#111827"/></g>`,
    '  <path d="M20 26 a10 10 0 0 1 10 -10 h580 a10 10 0 0 1 10 10 v24 h-600 z" fill="#eef1f5"/>',
    barraTitulo(titulo, corIcone),
    `  <rect x="20" y="40" width="600" height="20" fill="${ESCURO_PAINEL}"/>`,
    `  <rect x="20" y="60" width="600" height="22" fill="#333333"/>`,
  ];
  let x = 34;
  partes.push('  <g font-size="10.5">');
  for (const nome of menus) {
    partes.push(`    <text x="${x}" y="54" fill="${CLARO_SOBRE_ESCURO}">${esc(nome)}</text>`);
    x += 14 + nome.length * 6.4;
  }
  partes.push('  </g>');
  if (opcoes) {
    let ox = 30;
    partes.push('  <g font-size="10" fill="#cbd5e1">');
    for (const rotulo of opcoes) {
      partes.push(`    <text x="${ox}" y="75">${esc(rotulo)}</text>`);
      ox += 18 + rotulo.length * 6;
    }
    partes.push('  </g>');
  }
  return partes.join('\n');
}

/** Coluna de ferramentas à esquerda de `janelaCriativa`. `ferramentas`: rótulos curtos (1-2 letras). */
export function caixaFerramentas(ferramentas, { destaque = null } = {}) {
  const partes = [`  <rect x="20" y="82" width="26" height="302" fill="${ESCURO_PAINEL}"/>`];
  let y = 100;
  for (const nome of ferramentas) {
    const ativa = nome === destaque;
    if (ativa) partes.push(`  <rect x="21" y="${y - 13}" width="24" height="20" rx="3" fill="#0ea5e9"/>`);
    partes.push(`  <text x="33" y="${y}" font-size="10.5" text-anchor="middle" fill="${ativa ? '#ffffff' : '#cbd5e1'}">${esc(nome)}</text>`);
    y += 22;
  }
  return partes.join('\n');
}

/**
 * Painel lateral direito de `janelaCriativa` (Camadas, Objetos, Cor...).
 * `linhas`: { rotulo, ativa?, visivel? }.
 */
export function painelCriativo(titulo, linhas, { x = 514 } = {}) {
  const partes = [
    `  <rect x="${x}" y="82" width="106" height="302" fill="${ESCURO_PAINEL}"/>`,
    `  <text x="${x + 10}" y="98" font-size="10.5" fill="${CLARO_SOBRE_ESCURO}" font-weight="700">${esc(titulo)}</text>`,
    `  <line x1="${x}" y1="106" x2="${x + 106}" y2="106" stroke="#3f3f3f"/>`,
  ];
  let y = 124;
  for (const linha of linhas) {
    if (linha.ativa) partes.push(`  <rect x="${x + 4}" y="${y - 14}" width="98" height="22" fill="#3b3b3b"/>`);
    partes.push(`  <rect x="${x + 8}" y="${y - 11}" width="16" height="16" fill="#4b5563"/>`);
    if (linha.mascara) {
      partes.push(`  <rect x="${x + 26}" y="${y - 11}" width="16" height="16" fill="#ffffff" stroke="#9ca3af"/>`);
      if (linha.mascaraMetade) partes.push(`  <rect x="${x + 34}" y="${y - 11}" width="8" height="16" fill="#111827"/>`);
    }
    partes.push(`  <circle cx="${x + 94}" cy="${y - 3}" r="3" fill="${linha.visivel === false ? 'none' : '#94a3b8'}" stroke="#94a3b8"/>`);
    partes.push(`  <text x="${x + (linha.mascara ? 48 : 30)}" y="${y}" font-size="9.5" fill="${CLARO_SOBRE_ESCURO}">${esc(linha.rotulo)}</text>`);
    y += 26;
  }
  return partes.join('\n');
}

/** Histograma simples (Níveis) com os controles de ponto preto/gama/ponto branco. */
export function histograma(x, y, largura, altura, { pretoFrac = 0.08, brancoFrac = 0.9 } = {}) {
  const barras = 40;
  const partes = [`  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" fill="#ffffff" stroke="#cbd5e1"/>`];
  for (let i = 0; i < barras; i++) {
    const t = i / (barras - 1);
    const h = altura * 0.85 * Math.exp(-((t - 0.55) ** 2) / 0.05) + altura * 0.06;
    partes.push(`  <rect x="${x + (largura / barras) * i}" y="${y + altura - h}" width="${largura / barras - 1}" height="${h}" fill="#9ca3af"/>`);
  }
  const px = x + largura * pretoFrac;
  const bx = x + largura * brancoFrac;
  const gx = (px + bx) / 2;
  partes.push(`  <g stroke-width="2"><line x1="${px}" y1="${y}" x2="${px}" y2="${y + altura}" stroke="#111827"/>
    <line x1="${gx}" y1="${y}" x2="${gx}" y2="${y + altura}" stroke="#6b7280"/>
    <line x1="${bx}" y1="${y}" x2="${bx}" y2="${y + altura}" stroke="#e5e7eb"/></g>`);
  return partes.join('\n');
}

/** Sobrepõe a grade da Regra dos Terços em uma área (2 linhas verticais + 2 horizontais). */
export function gradeTercos(x, y, largura, altura) {
  const x1 = x + largura / 3;
  const x2 = x + (largura * 2) / 3;
  const y1 = y + altura / 3;
  const y2 = y + (altura * 2) / 3;
  return `  <g stroke="#ffffff" stroke-width="1.5" opacity="0.85">
    <line x1="${x1}" y1="${y}" x2="${x1}" y2="${y + altura}"/><line x1="${x2}" y1="${y}" x2="${x2}" y2="${y + altura}"/>
    <line x1="${x}" y1="${y1}" x2="${x + largura}" y2="${y1}"/><line x1="${x}" y1="${y2}" x2="${x + largura}" y2="${y2}"/>
  </g>
  <g fill="#facc15"><circle cx="${x1}" cy="${y1}" r="4"/><circle cx="${x2}" cy="${y1}" r="4"/><circle cx="${x1}" cy="${y2}" r="4"/><circle cx="${x2}" cy="${y2}" r="4"/></g>`;
}

/** Brilho radial colorido (aura) — gradiente do centro colorido até transparente. */
export function auraRadial(cx, cy, raio, cor) {
  const id = `aura-${Math.round(cx)}-${Math.round(cy)}`;
  return `  <defs><radialGradient id="${id}"><stop offset="0" stop-color="${cor}" stop-opacity="0.85"/><stop offset="1" stop-color="${cor}" stop-opacity="0"/></radialGradient></defs>
  <circle cx="${cx}" cy="${cy}" r="${raio}" fill="url(#${id})"/>`;
}

/** Área quadriculada cinza/branco — símbolo universal de transparência (fundo removido). */
export function quadriculado(x, y, largura, altura, tamanho = 12) {
  const id = `quad-${x}-${y}`;
  return `  <defs><pattern id="${id}" width="${tamanho * 2}" height="${tamanho * 2}" patternUnits="userSpaceOnUse">
    <rect width="${tamanho * 2}" height="${tamanho * 2}" fill="#f3f4f6"/>
    <rect width="${tamanho}" height="${tamanho}" fill="#d1d5db"/>
    <rect x="${tamanho}" y="${tamanho}" width="${tamanho}" height="${tamanho}" fill="#d1d5db"/>
  </pattern></defs>
  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" fill="url(#${id})"/>`;
}

/** Placeholder neutro de "uma foto qualquer" (sol + montanhas) — nunca uma foto real de terceiros. */
export function fotoPlaceholder(x, y, w, h, { comFundo = true } = {}) {
  const partes = [];
  if (comFundo) partes.push(`  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#93c5fd"/>`);
  partes.push(`  <circle cx="${x + w * 0.24}" cy="${y + h * 0.28}" r="${Math.min(w, h) * 0.11}" fill="#fde68a"/>`);
  partes.push(`  <path d="M${x} ${y + h} l${w * 0.32} -${h * 0.42} l${w * 0.22} ${h * 0.24} l${w * 0.18} -${h * 0.2} l${w * 0.28} ${h * 0.38} z" fill="#4ade80"/>`);
  return partes.join('\n');
}

/** Selo numerado (para diagramas "as N áreas da tela"). */
export function selo(x, y, n, cor = AZUL_ESCURO) {
  return `  <circle cx="${x}" cy="${y}" r="10" fill="${cor}"/>
  <text x="${x}" y="${y + 4}" font-size="11" text-anchor="middle" fill="#ffffff" font-weight="700">${n}</text>`;
}

const NAV_CONFIGURACOES = ['Sistema', 'Bluetooth e dispositivos', 'Rede e Internet', 'Personalização', 'Aplicativos',
  'Contas', 'Hora e idioma', 'Jogos', 'Acessibilidade', 'Privacidade e segurança', 'Windows Update'];

/**
 * Janela de Configurações do Windows 11. `cartoes`: lista de
 * { rotulo, sub?, controle?, destaque?, filho?, altura?, tamanho? }.
 * `controle`: ['toggle', ligado, mostrarRotulo?] | ['lista', texto] | ['botao', texto]
 * | ['seta'] | ['expandido'] | ['slider', fracao] | ['caixa', marcada].
 */
export function configuracoes(navSelecionado, trilha, cartoes, { tamanhoTrilha = 17 } = {}) {
  const partes = [
    '  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#f3f4f6" stroke="#cbd5e1"/></g>',
    barraTitulo('Configurações', '#64748b'),
    '  <rect x="34" y="50" width="164" height="22" rx="5" fill="#ffffff" stroke="#e2e8f0"/>',
    '  <text x="44" y="65" font-size="10.5" fill="#9ca3af">Pesquisar</text>',
    '  <g font-size="11" fill="#1f2937">',
  ];
  let y = 96;
  for (const nome of NAV_CONFIGURACOES) {
    if (nome === navSelecionado) {
      partes.push(`    <rect x="34" y="${y - 15}" width="164" height="22" rx="5" fill="#e5edf8"/>`);
      partes.push(`    <rect x="34" y="${y - 11}" width="3" height="14" rx="1.5" fill="#0067c0"/>`);
      partes.push(`    <text x="46" y="${y}" font-weight="700">${nome}</text>`);
    } else {
      partes.push(`    <text x="46" y="${y}">${nome}</text>`);
    }
    y += 25;
  }
  partes.push('  </g>');
  const trilhaSvg = trilha.map(esc).join(` <tspan fill="${CINZA}" font-weight="400">›</tspan> `);
  partes.push(`  <text x="210" y="70" font-size="${tamanhoTrilha}" font-weight="700" fill="${TEXTO}">${trilhaSvg}</text>`);

  y = 88;
  for (const cartao of cartoes) {
    const altura = cartao.altura ?? (cartao.sub ? 50 : 42);
    const destaque = cartao.destaque ?? false;
    const borda = destaque ? 'stroke="#60a5fa" stroke-width="1.5"' : 'stroke="#e5e7eb"';
    const recuo = cartao.filho ? 18 : 0;
    partes.push(`  <rect x="${210 + recuo}" y="${y}" width="${396 - recuo}" height="${altura}" rx="8" fill="#ffffff" ${borda}/>`);
    const ty = y + (cartao.sub || altura > 56 ? 20 : altura / 2 + 4);
    const peso = destaque ? ' font-weight="700"' : '';
    partes.push(`  <text x="${226 + recuo}" y="${ty}" font-size="${cartao.tamanho ?? 11.5}" fill="${TEXTO}"${peso}>${esc(cartao.rotulo)}</text>`);
    if (cartao.sub) {
      partes.push(`  <text x="${226 + recuo}" y="${y + 36}" font-size="10" fill="${CINZA}">${esc(cartao.sub)}</text>`);
    }
    partes.push(controle(cartao.controle, y, altura, destaque));
    y += altura + 6;
  }
  return partes.join('\n');
}

function controle(tipo, y, altura, destaque) {
  if (!tipo) return '';
  const meio = y + altura / 2;
  const [nome, valor] = tipo;
  if (nome === 'toggle') {
    const mostrarRotulo = tipo.length < 3 || tipo[2];
    const rotulo = mostrarRotulo ? (valor ? 'Ativado' : 'Desativado') : '';
    const botaoToggle = valor
      ? `<rect x="566" y="${meio - 8}" width="30" height="16" rx="8" fill="#0067c0"/><circle cx="587" cy="${meio}" r="4.5" fill="#fff"/>`
      : `<rect x="566" y="${meio - 8}" width="30" height="16" rx="8" fill="#fff" stroke="${CINZA}"/><circle cx="575" cy="${meio}" r="4" fill="${CINZA}"/>`;
    return `  <text x="556" y="${meio + 4}" font-size="10.5" fill="${CINZA}" text-anchor="end">${rotulo}</text>\n  ${botaoToggle}`;
  }
  if (nome === 'lista') {
    const largura = Math.max(110, valor.length * 6.8 + 34);
    const borda = destaque ? '#60a5fa' : '#d1d5db';
    return `  <rect x="${596 - largura}" y="${meio - 11}" width="${largura}" height="22" rx="5" fill="#f9fafb" stroke="${borda}"/>
  <text x="${606 - largura}" y="${meio + 4}" font-size="10.5" fill="${TEXTO}">${esc(valor)}</text>
  <text x="588" y="${meio + 4}" font-size="10" fill="${CINZA}" text-anchor="end">⌄</text>`;
  }
  if (nome === 'botao') {
    const largura = valor.length * 6.8 + 22;
    const cor = destaque ? 'fill="#0067c0"' : 'fill="#f9fafb" stroke="#d1d5db"';
    const corTexto = destaque ? '#ffffff' : TEXTO;
    return `  <rect x="${596 - largura}" y="${meio - 11}" width="${largura}" height="22" rx="5" ${cor}/>
  <text x="${596 - largura / 2}" y="${meio + 4}" font-size="10.5" fill="${corTexto}" text-anchor="middle">${esc(valor)}</text>`;
  }
  if (nome === 'seta') return `  <text x="592" y="${meio + 4}" font-size="12" fill="${CINZA}" text-anchor="end">›</text>`;
  if (nome === 'expandido') return `  <text x="592" y="${meio + 4}" font-size="12" fill="${CINZA}" text-anchor="end">⌃</text>`;
  if (nome === 'slider') {
    return `  <rect x="430" y="${meio - 2}" width="150" height="4" rx="2" fill="#e5e7eb"/>
  <rect x="430" y="${meio - 2}" width="${150 * valor}" height="4" rx="2" fill="#0067c0"/>
  <circle cx="${430 + 150 * valor}" cy="${meio}" r="7" fill="#fff" stroke="#0067c0" stroke-width="3"/>`;
  }
  if (nome === 'caixa') {
    const marca = valor ? `<path d="M570 ${meio} l4 4 l8 -8" fill="none" stroke="#fff" stroke-width="2"/>` : '';
    const fundo = valor ? 'fill="#0067c0"' : 'fill="#fff" stroke="#6b7280"';
    return `  <rect x="566" y="${meio - 8}" width="16" height="16" rx="3" ${fundo}/>${marca}`;
  }
  return '';
}

/** Janela de diálogo clássica (Propriedades, Som, Memória Virtual...), com abas opcionais. */
export function dialogo(x, y, largura, altura, titulo, { abas = null, abaSelecionada = null } = {}) {
  const partes = [
    `  <g filter="url(#sombra)"><rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="8" fill="#f9fafb" stroke="#cbd5e1"/></g>`,
    `  <text x="${x + 14}" y="${y + 20}" font-size="11.5" fill="${TEXTO}">${esc(titulo)}</text>`,
    `  <text x="${x + largura - 18}" y="${y + 21}" font-size="12" fill="#4b5563">×</text>`,
  ];
  if (abas) {
    let ax = x + 12;
    partes.push(`  <line x1="${x + 10}" y1="${y + 56}" x2="${x + largura - 10}" y2="${y + 56}" stroke="#d1d5db"/>`);
    for (const aba of abas) {
      const larguraAba = aba.length * 6.6 + 14;
      if (aba === abaSelecionada) {
        partes.push(`  <rect x="${ax}" y="${y + 36}" width="${larguraAba}" height="21" fill="#ffffff" stroke="#d1d5db"/>`);
        partes.push(`  <rect x="${ax + 1}" y="${y + 55}" width="${larguraAba - 2}" height="3" fill="#ffffff"/>`);
        partes.push(`  <text x="${ax + 7}" y="${y + 51}" font-size="10.5" font-weight="700" fill="${AZUL_ESCURO}">${esc(aba)}</text>`);
      } else {
        partes.push(`  <text x="${ax + 7}" y="${y + 51}" font-size="10.5" fill="${TEXTO}">${esc(aba)}</text>`);
      }
      ax += larguraAba + 2;
    }
  }
  return partes.join('\n');
}

export function caixaSelecao(x, y, rotulo, { marcada = false, destaque = false, largura = 0 } = {}) {
  const partes = [];
  if (destaque) {
    partes.push(`  <rect x="${x - 6}" y="${y - 13}" width="${largura || rotulo.length * 6.4 + 34}" height="22" rx="4" fill="#dbeafe" stroke="#60a5fa"/>`);
  }
  const fundo = marcada ? 'fill="#0067c0"' : 'fill="#fff" stroke="#6b7280"';
  partes.push(`  <rect x="${x}" y="${y - 9}" width="13" height="13" rx="2" ${fundo}/>`);
  if (marcada) partes.push(`  <path d="M${x + 3} ${y - 3} l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="1.8"/>`);
  const peso = destaque ? ' font-weight="700"' : '';
  const cor = destaque ? AZUL_ESCURO : TEXTO;
  partes.push(`  <text x="${x + 20}" y="${y + 2}" font-size="10.5" fill="${cor}"${peso}>${esc(rotulo)}</text>`);
  return partes.join('\n');
}

export function botao(x, y, rotulo, { primario = false, destaque = false, largura = 0 } = {}) {
  const w = largura || rotulo.length * 6.8 + 26;
  const [fundo, cor] = primario || destaque
    ? ['fill="#0067c0"', '#ffffff']
    : ['fill="#ffffff" stroke="#d1d5db"', TEXTO];
  const anel = destaque
    ? `<rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="30" rx="7" fill="none" stroke="#60a5fa" stroke-width="2"/>`
    : '';
  return `  ${anel}<rect x="${x}" y="${y}" width="${w}" height="24" rx="5" ${fundo}/>
  <text x="${x + w / 2}" y="${y + 16}" font-size="10.5" fill="${cor}" text-anchor="middle">${esc(rotulo)}</text>`;
}

/** Esquema de pastas em árvore. `linhas`: [nível, 'pasta' | 'arquivo', nome]. */
export function arvore(x, y, largura, titulo, linhas) {
  const altura = 34 + 20 * linhas.length;
  const partes = [
    `  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="8" fill="#ffffff" stroke="#bfdbfe"/>`,
    texto(x + 12, y + 20, titulo, { tamanho: 11.5, cor: AZUL_ESCURO, negrito: true }),
  ];
  linhas.forEach(([nivel, tipo, nome], i) => {
    const lx = x + 16 + nivel * 18;
    const ly = y + 42 + i * 20;
    if (nivel) partes.push(`  <path d="M${lx - 12} ${ly - 16} v12 h8" fill="none" stroke="#94a3b8"/>`);
    partes.push(tipo === 'pasta'
      ? `  <path d="M${lx} ${ly - 10} h6 l2 2 h8 v10 h-16 z" fill="#f6c343"/>`
      : `  <path d="M${lx + 2} ${ly - 11} h8 l4 4 v10 h-12 z" fill="#fff" stroke="#94a3b8"/>`);
    partes.push(texto(lx + 22, ly, nome, { tamanho: 10.5 }));
  });
  return partes.join('\n');
}

/**
 * Faixa de um disco no Gerenciamento de Disco. `blocos`:
 * { nome, linhas, fracao, cor?, destaque? } — as frações somam 1.
 */
export function disco(x, y, largura, blocos, { rotulo = 'Disco 0', legenda = ['Básico', '238 GB', 'Online'] } = {}) {
  const partes = [
    `  <rect x="${x}" y="${y}" width="${largura}" height="62" fill="#ffffff" stroke="#cbd5e1"/>`,
    `  <rect x="${x}" y="${y}" width="92" height="62" fill="#eef1f5" stroke="#cbd5e1"/>`,
    texto(x + 8, y + 16, rotulo, { tamanho: 10.5, negrito: true }),
  ];
  legenda.forEach((linha, i) => partes.push(texto(x + 8, y + 31 + i * 12, linha, { tamanho: 9.5, cor: CINZA })));
  let bx = x + 94;
  const total = largura - 96;
  for (const bloco of blocos) {
    const w = total * bloco.fracao;
    partes.push(`  <rect x="${bx}" y="${y + 2}" width="${w - 2}" height="8" fill="${bloco.cor ?? '#1d4ed8'}"/>`);
    if (bloco.destaque) {
      partes.push(`  <rect x="${bx}" y="${y + 10}" width="${w - 2}" height="50" fill="#dbeafe" stroke="#60a5fa" stroke-width="1.5"/>`);
    }
    partes.push(texto(bx + 6, y + 26, bloco.nome, { tamanho: 9.5, negrito: true }));
    (bloco.linhas ?? []).forEach((linha, i) => partes.push(texto(bx + 6, y + 39 + i * 11, linha, { tamanho: 9, cor: CINZA })));
    bx += w;
  }
  return partes.join('\n');
}

/** Unidade em "Este Computador", com barra de uso. */
export function unidade(x, y, nome, livre, fracao, { destaque = false } = {}) {
  const partes = [];
  if (destaque) partes.push(`  <rect x="${x - 8}" y="${y - 8}" width="196" height="58" rx="6" fill="#e5f1fb" stroke="#60a5fa"/>`);
  partes.push(`  <rect x="${x}" y="${y + 4}" width="34" height="24" rx="3" fill="#e5e7eb" stroke="#94a3b8"/>`);
  partes.push(`  <rect x="${x + 4}" y="${y + 20}" width="10" height="3" fill="#16a34a"/>`);
  partes.push(texto(x + 44, y + 12, nome, { negrito: destaque }));
  partes.push(`  <rect x="${x + 44}" y="${y + 18}" width="130" height="9" fill="#e5e7eb"/>`);
  partes.push(`  <rect x="${x + 44}" y="${y + 18}" width="${130 * fracao}" height="9" fill="#26a0da"/>`);
  partes.push(texto(x + 44, y + 40, livre, { tamanho: 9.5, cor: CINZA }));
  return partes.join('\n');
}
