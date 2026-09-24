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

// ---------------- Passo a Passo (crianças e público com dificuldade de leitura) ----------------
// Convenção: o anel laranja (`alvo`/`alvoRet`) marca SEMPRE o lugar onde a pessoa
// clica, em todas as telas. O texto dentro da imagem é o mínimo: a instrução já
// está escrita, em letra grande, e narrada ao lado da imagem.

const LARANJA = '#ea580c';

/** Anel "clique aqui" em volta de um ponto. */
export function alvo(cx, cy, r = 24) {
  return `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffffff" stroke-width="10"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${LARANJA}" stroke-width="5"/>`;
}

/** Moldura "clique aqui" em volta de um retângulo (item de menu, célula, caixa). */
export function alvoRet(x, y, largura, altura, rx = 8) {
  return `  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="${rx}" fill="none" stroke="#ffffff" stroke-width="10"/>
  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="${rx}" fill="none" stroke="${LARANJA}" stroke-width="5"/>`;
}

/** Rótulo curto em letra grande (nome de uma parte da tela). */
export function etiqueta(x, y, conteudo, { centro = false } = {}) {
  const largura = conteudo.length * 9.8 + 30;
  const x0 = centro ? x - largura / 2 : x;
  return `  <rect x="${x0}" y="${y}" width="${largura}" height="34" rx="17" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="${x0 + largura / 2}" y="${y + 23}" font-size="16" font-weight="700" fill="#7c2d12" text-anchor="middle">${esc(conteudo)}</text>`;
}

/** Selo verde de "deu certo". */
export function certo(cx, cy, r = 30) {
  return `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#16a34a" stroke="#ffffff" stroke-width="4"/>
  <path d="M${cx - r * 0.45} ${cy + r * 0.02} l${r * 0.3} ${r * 0.3} l${r * 0.6} ${-r * 0.62}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Selo vermelho de "não faça". */
export function proibido(cx, cy, r = 30) {
  const d = r * 0.4;
  return `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#dc2626" stroke="#ffffff" stroke-width="4"/>
  <path d="M${cx - d} ${cy - d} L${cx + d} ${cy + d} M${cx + d} ${cy - d} L${cx - d} ${cy + d}" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round"/>`;
}

/** Tecla grande, para o passo "aperte a tecla ...". */
export function teclaGrande(cx, cy, nome, largura = 200) {
  const x = cx - largura / 2;
  const y = cy - 40;
  return `  <rect x="${x}" y="${y + 8}" width="${largura}" height="80" rx="14" fill="#94a3b8"/>
  <rect x="${x}" y="${y}" width="${largura}" height="80" rx="14" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
  <text x="${cx}" y="${y + 51}" font-size="30" font-weight="700" fill="#1f2937" text-anchor="middle">${esc(nome)}</text>`;
}

/** Mouse pequeno com o botão que a pessoa deve usar pintado de laranja (60 × 90). */
export function mouseBotao(x, y, lado) {
  const esquerdo = lado === 'esquerdo' ? LARANJA : '#ffffff';
  const direito = lado === 'direito' ? LARANJA : '#ffffff';
  return `  <g transform="translate(${x} ${y})" stroke="#1f2937" stroke-width="3" stroke-linejoin="round">
    <path d="M30 0 V36 H0 V30 A30 30 0 0 1 30 0 Z" fill="${esquerdo}"/>
    <path d="M30 0 V36 H60 V30 A30 30 0 0 0 30 0 Z" fill="${direito}"/>
    <path d="M0 36 V60 A30 30 0 0 0 60 60 V36 Z" fill="#ffffff"/>
    <rect x="25" y="10" width="10" height="18" rx="5" fill="#ffffff"/>
  </g>`;
}

/** Pasta na área de trabalho azul (nome em branco); `fantasma` = só o contorno do lugar vazio. */
export function pastaTela(cx, y, rotulo, { selecionada = false, editando = false, fantasma = false } = {}) {
  if (fantasma) {
    return `  <rect x="${cx - 42}" y="${y + 8}" width="84" height="92" rx="8" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="6 5" opacity="0.85"/>`;
  }
  const fundo = selecionada
    ? `<rect x="${cx - 46}" y="${y + 6}" width="92" height="96" rx="8" fill="#ffffff" fill-opacity="0.25" stroke="#ffffff" stroke-opacity="0.8"/>`
    : '';
  const nome = editando
    ? `<rect x="${cx - 54}" y="${y + 72}" width="108" height="22" fill="#ffffff" stroke="#0067c0" stroke-width="1.5"/>
  <text x="${cx}" y="${y + 88}" font-size="13" text-anchor="middle" fill="#1f2937">${esc(rotulo)}</text>`
    : `<text x="${cx}" y="${y + 88}" font-size="13" text-anchor="middle" fill="#ffffff" font-weight="600">${esc(rotulo)}</text>`;
  return `  <g>${fundo}
  <path d="M${cx - 30} ${y + 20} h22 l6 6 h32 v40 h-60 z" fill="#f6c343"/>
  <path d="M${cx - 30} ${y + 32} h60 v34 h-60 z" fill="#fbd35f"/>
  ${nome}</g>`;
}

/** Quadrado colorido com a letra do programa (W, X, P...). `app`: { nome, cor, letra }. */
export function iconeApp(x, y, tamanho, app) {
  return `  <rect x="${x}" y="${y}" width="${tamanho}" height="${tamanho}" rx="${tamanho * 0.22}" fill="${app.cor}"/>
  <text x="${x + tamanho / 2}" y="${y + tamanho * 0.72}" font-size="${tamanho * 0.58}" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(app.letra)}</text>`;
}

/** Botão de energia do Menu Iniciar (canto de baixo, à direita). */
export const POS_ENERGIA = { cx: 452, cy: 338 };

/** Menu Iniciar aberto sobre a área de trabalho: busca, resultado, fixados e botão de energia. */
export function menuIniciar({ busca = '', resultado = null, tipoResultado = 'Aplicativo', fixados = [], menuEnergia = null } = {}) {
  const partes = [
    '  <g filter="url(#sombra)"><rect x="160" y="40" width="320" height="316" rx="10" fill="#f3f4f6" stroke="#d4d4d8"/></g>',
    `  <rect x="176" y="56" width="288" height="32" rx="16" fill="#ffffff" stroke="${busca ? '#0067c0' : '#d4d4d8'}" stroke-width="${busca ? 2 : 1}"/>`,
    '  <circle cx="195" cy="71" r="6" fill="none" stroke="#6b7280" stroke-width="1.6"/><path d="M199.5 75.5 l4 4" stroke="#6b7280" stroke-width="1.6"/>',
    busca
      ? `${texto(212, 77, busca, { tamanho: 15 })}\n  <rect x="${214 + busca.length * 8.6}" y="63" width="1.6" height="17" fill="#1f2937"/>`
      : texto(212, 76, 'Pesquisar', { tamanho: 12, cor: '#9ca3af' }),
  ];
  if (resultado) {
    partes.push(texto(180, 116, 'Melhor correspondência', { tamanho: 12, negrito: true }));
    partes.push('  <rect x="176" y="126" width="288" height="60" rx="8" fill="#ffffff" stroke="#e5e7eb"/>');
    partes.push(iconeApp(188, 136, 40, resultado));
    partes.push(texto(240, 153, resultado.nome, { tamanho: 15, negrito: true }));
    partes.push(texto(240, 172, tipoResultado, { tamanho: 11.5, cor: CINZA }));
  } else {
    partes.push(texto(180, 116, 'Fixado', { tamanho: 12, negrito: true }));
    fixados.forEach((app, i) => {
      const x = 186 + (i % 4) * 72;
      const y = 130 + Math.floor(i / 4) * 78;
      partes.push(iconeApp(x + 14, y, 36, app));
      partes.push(texto(x + 32, y + 54, app.nome, { tamanho: 10.5, centro: true }));
    });
  }
  const { cx, cy } = POS_ENERGIA;
  partes.push(`  <line x1="160" y1="316" x2="480" y2="316" stroke="#e4e4e7"/>
  <circle cx="190" cy="338" r="12" fill="#cbd5e1"/>${texto(210, 343, 'Aluno', { tamanho: 12 })}
  <path d="M${cx - 6} ${cy - 5} a8 8 0 1 0 12 0" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy - 10}" x2="${cx}" y2="${cy}" stroke="#374151" stroke-width="2" stroke-linecap="round"/>`);
  if (menuEnergia) {
    partes.push(menu(360, 222, [['Suspender', '', menuEnergia === 'Suspender'], ['Desligar', '', menuEnergia === 'Desligar'],
      ['Reiniciar', '', menuEnergia === 'Reiniciar']], 140));
  }
  return partes.join('\n');
}

/** Tela de abertura do programa, na cor dele. Use com `svg(trechos, app.cor)`. */
export function carregandoApp(app) {
  return `  <rect x="272" y="118" width="96" height="96" rx="21" fill="#ffffff"/>
  <text x="320" y="187" font-size="56" font-weight="700" fill="${app.cor}" text-anchor="middle">${esc(app.letra)}</text>
  ${texto(320, 262, app.nome, { tamanho: 30, negrito: true, cor: '#ffffff', centro: true })}
  <g fill="#ffffff"><circle cx="302" cy="298" r="5"/><circle cx="320" cy="298" r="5" opacity="0.7"/><circle cx="338" cy="298" r="5" opacity="0.4"/></g>`;
}

/** Tela inicial do Word/Excel/PowerPoint com o cartão "em branco" (x 140–270, y 110–260). */
export function inicioOffice(app, linhasNovo) {
  const partes = [
    '  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
    `  <path d="M30 16 h88 v368 h-88 a10 10 0 0 1 -10 -10 v-348 a10 10 0 0 1 10 -10 z" fill="${app.cor}"/>`,
    texto(69, 48, app.nome, { tamanho: 14, negrito: true, cor: '#ffffff', centro: true }),
    '  <rect x="28" y="72" width="82" height="26" rx="5" fill="#ffffff" fill-opacity="0.22"/>',
    texto(40, 90, 'Início', { tamanho: 12.5, cor: '#ffffff', negrito: true }),
    texto(40, 122, 'Novo', { tamanho: 12.5, cor: '#ffffff' }),
    texto(40, 152, 'Abrir', { tamanho: 12.5, cor: '#ffffff' }),
    texto(140, 64, 'Boa tarde', { tamanho: 22, negrito: true }),
    texto(140, 98, 'Novo', { tamanho: 14, negrito: true }),
    '  <rect x="140" y="110" width="130" height="150" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>',
  ];
  linhasNovo.forEach((linha, i) => partes.push(texto(205, 282 + i * 17, linha, { tamanho: 13, centro: true })));
  for (const x of [292, 444]) {
    partes.push(`  <g opacity="0.45"><rect x="${x}" y="110" width="130" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <rect x="${x + 16}" y="128" width="98" height="14" rx="3" fill="${app.cor}"/>
  <rect x="${x + 16}" y="152" width="80" height="6" rx="3" fill="#cbd5e1"/><rect x="${x + 16}" y="166" width="90" height="6" rx="3" fill="#cbd5e1"/>
  ${texto(x + 65, 282, 'Modelo', { tamanho: 13, centro: true, cor: CINZA })}</g>`);
  }
  return partes.join('\n');
}

export const ABAS_OFFICE = ['Arquivo', 'Página Inicial', 'Inserir', 'Layout', 'Revisão', 'Exibir'];
const larguraAba = (aba) => aba.length * 6.6 + 18;

/** Retângulo de uma aba da janela do Office (para a moldura "clique aqui"). */
export function posicaoAba(nome, abas = ABAS_OFFICE) {
  let x = 34;
  for (const aba of abas) {
    const largura = larguraAba(aba);
    if (aba === nome) return { x: x - 8, y: 50, largura, altura: 20 };
    x += largura;
  }
  throw new Error(`Aba "${nome}" não existe`);
}

/**
 * Janela do Word/Excel/PowerPoint: barra de título e abas na cor do programa e
 * faixa de opções (`faixa`; por padrão, a de fonte). Conteúdo começa em y 122.
 */
export function janelaOffice(app, titulo, { abas = ABAS_OFFICE, aba = 'Página Inicial', faixa = null } = {}) {
  const partes = [
    '  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
    `  <path d="M20 26 a10 10 0 0 1 10 -10 h580 a10 10 0 0 1 10 10 v44 h-600 z" fill="${app.cor}"/>`,
    texto(320, 37, titulo, { tamanho: 12, cor: '#ffffff', centro: true }),
    '  <g fill="#ffffff" font-size="12"><text x="556" y="37">—</text><rect x="578" y="29" width="9" height="9" fill="none" stroke="#ffffff"/><text x="600" y="38">×</text></g>',
  ];
  let x = 34;
  for (const nome of abas) {
    const largura = larguraAba(nome);
    if (nome === aba) {
      partes.push(`  <path d="M${x - 8} 70 v-16 a4 4 0 0 1 4 -4 h${largura - 8} a4 4 0 0 1 4 4 v16 z" fill="#f3f4f6"/>`);
      partes.push(`  <text x="${x}" y="65" font-size="11.5" font-weight="700" fill="${app.cor}">${esc(nome)}</text>`);
    } else {
      partes.push(`  <text x="${x}" y="65" font-size="11.5" fill="#ffffff">${esc(nome)}</text>`);
    }
    x += largura;
  }
  partes.push('  <rect x="20" y="70" width="600" height="52" fill="#f3f4f6"/>');
  partes.push(faixa ?? faixaFonte());
  partes.push('  <line x1="20" y1="122" x2="620" y2="122" stroke="#e5e7eb"/>');
  return partes.join('\n');
}

/** Posição de cada botão da faixa de fonte (Página Inicial do Word/Excel). */
export const FAIXA = {
  fonte: { x: 34, y: 80, largura: 112, altura: 22 },
  tamanho: { x: 152, y: 80, largura: 40, altura: 22 },
  negrito: { x: 200, y: 80, largura: 24, altura: 22 },
  italico: { x: 226, y: 80, largura: 24, altura: 22 },
  sublinhado: { x: 252, y: 80, largura: 24, altura: 22 },
  cor: { x: 282, y: 80, largura: 30, altura: 22 },
  marcadores: { x: 318, y: 80, largura: 28, altura: 22 },
  esquerda: { x: 356, y: 80, largura: 24, altura: 22 },
  centro: { x: 382, y: 80, largura: 24, altura: 22 },
  direita: { x: 408, y: 80, largura: 24, altura: 22 },
  autoSoma: { x: 470, y: 78, largura: 110, altura: 26 },
};

/** Faixa "Página Inicial": fonte, tamanho, N I S, cor, marcadores, alinhamento e, no Excel, AutoSoma. */
export function faixaFonte({ fonte = 'Calibri', tamanho = '11', ativos = [], corLetra = '#dc2626', autoSoma = false } = {}) {
  const botao = (nome, conteudo) => {
    const { x, y, largura, altura } = FAIXA[nome];
    const ativo = ativos.includes(nome);
    return `  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="4" fill="${ativo ? '#dbeafe' : 'none'}" stroke="${ativo ? '#93c5fd' : 'none'}"/>\n${conteudo(x + largura / 2, y)}`;
  };
  const alinhar = (dx) => (cx, y) => `  <path d="M${cx - 8} ${y + 6} h16 M${cx - 8 + dx} ${y + 11} h${16 - Math.abs(dx) * 2} M${cx - 8} ${y + 16} h16" stroke="#374151" stroke-width="1.6"/>`;
  const partes = [
    `  <rect x="34" y="80" width="112" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>${texto(42, 95, fonte, { tamanho: 11 })}`,
    `  <rect x="152" y="80" width="40" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>${texto(160, 95, tamanho, { tamanho: 11 })}`,
    botao('negrito', (cx, y) => `  <text x="${cx}" y="${y + 16}" font-size="13" font-weight="700" fill="#1f2937" text-anchor="middle">N</text>`),
    botao('italico', (cx, y) => `  <text x="${cx}" y="${y + 16}" font-size="13" font-style="italic" fill="#1f2937" text-anchor="middle">I</text>`),
    botao('sublinhado', (cx, y) => `  <text x="${cx}" y="${y + 16}" font-size="13" text-decoration="underline" fill="#1f2937" text-anchor="middle">S</text>`),
    botao('cor', (cx, y) => `  <text x="${cx}" y="${y + 14}" font-size="13" font-weight="700" fill="#1f2937" text-anchor="middle">A</text>
  <rect x="${cx - 8}" y="${y + 17}" width="16" height="3" fill="${corLetra}"/>`),
    botao('marcadores', (cx, y) => `  <g fill="#374151"><circle cx="${cx - 7}" cy="${y + 7}" r="1.8"/><circle cx="${cx - 7}" cy="${y + 15}" r="1.8"/></g>
  <path d="M${cx - 2} ${y + 7} h10 M${cx - 2} ${y + 15} h10" stroke="#374151" stroke-width="1.6"/>`),
    botao('esquerda', alinhar(0)),
    botao('centro', alinhar(3)),
    botao('direita', alinhar(6)),
  ];
  if (autoSoma) {
    const { x, y, largura, altura } = FAIXA.autoSoma;
    partes.push(`  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="${x + 12}" y="${y + 18}" font-size="15" font-weight="700" fill="#1f2937">Σ</text>${texto(x + 30, y + 17, 'AutoSoma', { tamanho: 12 })}`);
  }
  return partes.join('\n');
}

/** Faixa de botões grandes com rótulo (Inserir, Design, Transições...). `destaque`: rótulo marcado como ativo. */
export function faixaBotoes(rotulos, { destaque = null, largura = 76, desenho = null } = {}) {
  return rotulos.map((rotulo, i) => {
    const x = 34 + i * (largura + 8);
    const ativo = rotulo === destaque;
    const figura = desenho ? desenho(i, x + largura / 2, 88) : `  <rect x="${x + largura / 2 - 9}" y="80" width="18" height="16" rx="3" fill="none" stroke="#374151" stroke-width="1.6"/>`;
    return `  <rect x="${x}" y="76" width="${largura}" height="42" rx="5" fill="${ativo ? '#dbeafe' : '#ffffff'}" stroke="${ativo ? '#93c5fd' : '#e5e7eb'}"/>
${figura}
  ${texto(x + largura / 2, 112, rotulo, { tamanho: 10.5, centro: true })}`;
  }).join('\n');
}

/** Retângulo do botão `i` de `faixaBotoes`. */
export function posicaoBotaoFaixa(i, largura = 76) {
  return { x: 34 + i * (largura + 8), y: 76, largura, altura: 42 };
}

const FUNDO_CONTEUDO = '  <path d="M20 122 h600 v252 a10 10 0 0 1 -10 10 h-580 a10 10 0 0 1 -10 -10 z" fill="#e5e7eb"/>';

/**
 * Folha do Word (x 170–470). `linhas`: texto simples ou { texto, negrito,
 * italico, sublinhado, tamanho, cor, fonte, alinhar: 'centro'|'direita',
 * marcador, selecionado }.
 */
export function paginaWord({ linhas = [], riscoEm = null } = {}) {
  const partes = [FUNDO_CONTEUDO, '  <rect x="170" y="136" width="300" height="248" fill="#ffffff" stroke="#d4d4d8"/>'];
  let y = 180;
  for (const linha of linhas) {
    const d = typeof linha === 'string' ? { texto: linha } : linha;
    const tamanho = d.tamanho ?? 18;
    const largura = d.texto.length * tamanho * (d.negrito ? 0.6 : 0.55);
    const x0 = d.alinhar === 'centro' ? 320 - largura / 2 : d.alinhar === 'direita' ? 444 - largura : d.marcador ? 222 : 196;
    if (d.selecionado) partes.push(`  <rect x="${x0 - 3}" y="${y - tamanho * 0.9}" width="${largura + 6}" height="${tamanho * 1.2}" fill="#bfdbfe"/>`);
    if (d.marcador) partes.push(`  <circle cx="206" cy="${y - tamanho * 0.32}" r="3.5" fill="#1f2937"/>`);
    const estilo = [
      d.negrito ? ' font-weight="700"' : '',
      d.italico ? ' font-style="italic"' : '',
      d.sublinhado ? ' text-decoration="underline"' : '',
      d.fonte ? ` font-family="${d.fonte}"` : '',
    ].join('');
    partes.push(`  <text x="${x0}" y="${y}" font-size="${tamanho}" fill="${d.cor ?? TEXTO}"${estilo}>${esc(d.texto)}</text>`);
    y += Math.max(28, tamanho * 1.45);
  }
  if (riscoEm) partes.push(`  <rect x="${riscoEm.x}" y="${riscoEm.y - 18}" width="2" height="22" fill="#1f2937"/>`);
  return partes.join('\n');
}

/** Retângulo da célula do Excel (ex.: 'A1') na `gradeExcel`. */
export function posicaoCelula(ref) {
  const coluna = ref.charCodeAt(0) - 65;
  const linha = Number(ref.slice(1));
  return { x: 50 + coluna * 80, y: 168 + (linha - 1) * 21, largura: 80, altura: 21 };
}

/**
 * Planilha do Excel. `valores`: o que aparece na célula; `formulas`: o que
 * aparece na barra de fórmulas (e dentro da célula, quando `editando`).
 * Número fica à direita e texto à esquerda, como no Excel.
 */
export function gradeExcel({ valores = {}, formulas = {}, selecionada = null, editando = false, negritos = [], fundos = {} } = {}) {
  const verde = '#217346';
  const conteudoSel = selecionada ? formulas[selecionada] ?? valores[selecionada] ?? '' : '';
  const partes = [FUNDO_CONTEUDO.replace('#e5e7eb', '#ffffff'),
    '  <rect x="26" y="126" width="62" height="18" rx="2" fill="#ffffff" stroke="#cbd5e1"/>',
    texto(34, 139, selecionada ?? '', { tamanho: 11 }),
    texto(100, 139, 'fx', { tamanho: 11, cor: CINZA }),
    texto(124, 139, conteudoSel, { tamanho: 12 }),
    '  <rect x="20" y="146" width="600" height="22" fill="#f3f4f6"/>',
    '  <rect x="20" y="168" width="30" height="210" fill="#f3f4f6"/>',
  ];
  for (const [ref, cor] of Object.entries(fundos)) {
    const c = posicaoCelula(ref);
    partes.push(`  <rect x="${c.x}" y="${c.y}" width="${c.largura}" height="${c.altura}" fill="${cor}"/>`);
  }
  const sel = selecionada ? posicaoCelula(selecionada) : null;
  for (let c = 0; c < 7; c++) {
    const letra = String.fromCharCode(65 + c);
    const ativa = sel && selecionada[0] === letra;
    if (ativa) partes.push(`  <rect x="${50 + c * 80}" y="146" width="80" height="22" fill="#d1fae5"/>`);
    partes.push(texto(90 + c * 80, 161, letra, { tamanho: 11.5, centro: true, cor: ativa ? verde : CINZA, negrito: ativa }));
  }
  for (let l = 1; l <= 10; l++) {
    const ativa = sel && Number(selecionada.slice(1)) === l;
    if (ativa) partes.push(`  <rect x="20" y="${168 + (l - 1) * 21}" width="30" height="21" fill="#d1fae5"/>`);
    partes.push(texto(35, 182 + (l - 1) * 21, String(l), { tamanho: 11, centro: true, cor: ativa ? verde : CINZA, negrito: ativa }));
  }
  partes.push('  <g stroke="#e5e7eb">');
  for (let c = 0; c <= 7; c++) partes.push(`    <line x1="${50 + c * 80}" y1="146" x2="${50 + c * 80}" y2="378"/>`);
  for (let l = 0; l <= 10; l++) partes.push(`    <line x1="20" y1="${168 + l * 21}" x2="610" y2="${168 + l * 21}"/>`);
  partes.push('  </g>');
  const exibidos = { ...valores };
  if (editando && selecionada) exibidos[selecionada] = conteudoSel;
  // A célula em edição leva o cursor de texto como um tspan no fim do próprio
  // texto: assim ele cai logo depois da última letra, sem estimar largura.
  const caret = '<tspan fill="#1f2937" font-weight="400">|</tspan>';
  for (const [ref, valor] of Object.entries(exibidos)) {
    const p = posicaoCelula(ref);
    const numero = valor !== '' && !Number.isNaN(Number(String(valor).replace(',', '.')));
    const peso = negritos.includes(ref) ? ' font-weight="700"' : '';
    const emEdicao = editando && ref === selecionada;
    const fim = emEdicao ? caret : '';
    if (emEdicao && !numero && String(valor).length * 7.4 > p.largura - 10) {
      partes.push(`  <rect x="${p.x + 1}" y="${p.y + 1}" width="${Math.min(String(valor).length * 7.6 + 16, 610 - p.x)}" height="${p.altura - 2}" fill="#ffffff"/>`);
    }
    partes.push(numero
      ? `  <text x="${p.x + p.largura - 8}" y="${p.y + 16}" font-size="14" fill="#1f2937" text-anchor="end"${peso}>${esc(valor)}${fim}</text>`
      : `  <text x="${p.x + 6}" y="${p.y + 16}" font-size="14" fill="#1f2937"${peso}>${esc(valor)}${fim}</text>`);
  }
  if (sel) {
    partes.push(`  <rect x="${sel.x}" y="${sel.y}" width="${sel.largura}" height="${sel.altura}" fill="none" stroke="${verde}" stroke-width="3"/>
  <rect x="${sel.x + sel.largura - 4}" y="${sel.y + sel.altura - 4}" width="7" height="7" fill="${verde}" stroke="#ffffff"/>`);
    if (editando && conteudoSel === '') partes.push(`  <rect x="${sel.x + 7}" y="${sel.y + 3}" width="1.6" height="15" fill="#1f2937"/>`);
  }
  return partes.join('\n');
}

/** Temas da aba Design do PowerPoint: fundo, cor de destaque e cor do texto. */
export const TEMAS_PPT = [
  { fundo: '#ffffff', cor: '#94a3b8', texto: '#1f2937' },
  { fundo: '#1e3a8a', cor: '#fbbf24', texto: '#ffffff' },
  { fundo: '#fef3c7', cor: '#d97706', texto: '#1f2937' },
  { fundo: '#ecfdf5', cor: '#059669', texto: '#064e3b' },
  { fundo: '#fdf2f8', cor: '#db2777', texto: '#1f2937' },
  { fundo: '#111827', cor: '#22d3ee', texto: '#ffffff' },
];

/** Faixa "Página Inicial" do PowerPoint: botão Novo Slide (x 30–100) e a fonte. */
export const POS_NOVO_SLIDE = { x: 30, y: 76, largura: 70, altura: 42 };
export function faixaSlides({ destaque = false } = {}) {
  const { x, y, largura, altura } = POS_NOVO_SLIDE;
  return `  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="5" fill="${destaque ? '#dbeafe' : '#ffffff'}" stroke="${destaque ? '#93c5fd' : '#e5e7eb'}"/>
  <rect x="${x + 25}" y="${y + 6}" width="20" height="14" rx="2" fill="none" stroke="#374151" stroke-width="1.6"/><path d="M${x + 42} ${y + 16} h8 M${x + 46} ${y + 12} v8" stroke="#b7472a" stroke-width="2"/>
  ${texto(x + largura / 2, y + 36, 'Novo Slide', { tamanho: 10.5, centro: true })}
  ${texto(112, 94, 'Layout ⌄', { tamanho: 11 })}
  <rect x="184" y="80" width="112" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>${texto(192, 95, 'Calibri', { tamanho: 11 })}
  <text x="316" y="96" font-size="13" font-weight="700" fill="#1f2937">N</text><text x="338" y="96" font-size="13" font-style="italic" fill="#1f2937">I</text>`;
}

/** Faixa da aba Design: miniaturas dos temas (60 × 40), a partir de x 34. */
export function faixaTemas(destaque = null) {
  return TEMAS_PPT.map((tema, i) => {
    const x = 34 + i * 68;
    const borda = i === destaque ? 'stroke="#2563eb" stroke-width="2.5"' : 'stroke="#cbd5e1"';
    return `  <rect x="${x}" y="77" width="60" height="40" rx="3" fill="${tema.fundo}" ${borda}/>
  <rect x="${x}" y="77" width="6" height="40" fill="${tema.cor}"/>
  <text x="${x + 33}" y="103" font-size="13" font-weight="700" fill="${tema.texto}" text-anchor="middle">Aa</text>`;
  }).join('\n');
}
export const posicaoTema = (i) => ({ x: 34 + i * 68, y: 77, largura: 60, altura: 40 });

/**
 * Slide do PowerPoint (x 140–600, y 134–374) com a coluna de miniaturas.
 * `layout`: 'titulo' (título + subtítulo) ou 'conteudo' (título + tópicos).
 * `estado`: 'vazio' | 'editando' | 'pronto' (vale para o título).
 */
export function slidePowerPoint(app, {
  titulo = null, subtitulo = null, estado = 'vazio', layout = 'titulo', topicos = null,
  miniaturas = 1, atual = 1, tema = null, forma = null, editandoSubtitulo = false, editandoTopicos = false,
} = {}) {
  const fundo = tema?.fundo ?? '#ffffff';
  const corTexto = tema?.texto ?? TEXTO;
  const partes = [FUNDO_CONTEUDO, '  <path d="M20 122 h92 v262 h-82 a10 10 0 0 1 -10 -10 z" fill="#f3f4f6"/>'];
  for (let i = 1; i <= miniaturas; i++) {
    const y = 136 + (i - 1) * 50;
    partes.push(texto(26, y + 14, String(i), { tamanho: 11, cor: CINZA }));
    partes.push(`  <rect x="36" y="${y}" width="66" height="38" rx="2" fill="${fundo}" stroke="${i === atual ? '#475569' : '#cbd5e1'}" stroke-width="${i === atual ? 2.5 : 1}"/>`);
    if (tema) partes.push(`  <rect x="36" y="${y}" width="4" height="38" fill="${tema.cor}"/>`);
  }
  partes.push(`  <g filter="url(#sombra)"><rect x="140" y="134" width="460" height="240" fill="${fundo}"/></g>`);
  if (tema) partes.push(`  <rect x="140" y="134" width="14" height="240" fill="${tema.cor}"/>`);
  const tracejado = 'stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="5 4" fill="none"';
  const continuo = 'stroke="#6b7280" stroke-width="1.5" fill="none"';
  if (layout === 'titulo') {
    if (estado !== 'pronto') partes.push(`  <rect x="180" y="182" width="380" height="68" ${estado === 'editando' ? continuo : tracejado}/>`);
    if (titulo) {
      partes.push(`  <text x="370" y="226" font-size="28" font-weight="700" fill="${corTexto}" text-anchor="middle">${esc(titulo)}</text>`);
      if (estado === 'editando') partes.push(`  <rect x="${370 + titulo.length * 7.8}" y="202" width="2" height="30" fill="${corTexto}"/>`);
    } else if (estado === 'editando') {
      partes.push('  <rect x="369" y="202" width="2" height="30" fill="#1f2937"/>');
    } else {
      partes.push(texto(370, 223, 'Clique para adicionar um título', { tamanho: 21, cor: '#6b7280', centro: true }));
    }
    if (subtitulo !== null || editandoSubtitulo) {
      if (editandoSubtitulo) partes.push(`  <rect x="220" y="268" width="300" height="40" ${continuo}/>`);
      if (subtitulo) partes.push(`  <text x="370" y="294" font-size="16" fill="${corTexto}" text-anchor="middle">${esc(subtitulo)}</text>`);
      if (editandoSubtitulo) partes.push(`  <rect x="${subtitulo ? 372 + subtitulo.length * 4.4 : 369}" y="278" width="2" height="20" fill="${corTexto}"/>`);
    } else {
      partes.push(`  <rect x="220" y="268" width="300" height="40" ${tracejado}/>`);
      partes.push(texto(370, 293, 'Clique para adicionar um subtítulo', { tamanho: 13, cor: '#9ca3af', centro: true }));
    }
  } else {
    if (titulo) {
      partes.push(`  <text x="176" y="180" font-size="24" font-weight="700" fill="${corTexto}">${esc(titulo)}</text>`);
    } else {
      partes.push(`  <rect x="166" y="148" width="408" height="44" ${estado === 'editando' ? continuo : tracejado}/>`);
      partes.push(texto(370, 177, 'Clique para adicionar um título', { tamanho: 18, cor: '#6b7280', centro: true }));
      if (estado === 'editando') partes.push('  <rect x="176" y="156" width="2" height="26" fill="#1f2937"/>');
    }
    partes.push(`  <rect x="166" y="202" width="408" height="156" ${editandoTopicos ? continuo : tracejado}/>`);
    if (topicos && topicos.length) {
      topicos.forEach((t, i) => {
        partes.push(`  <circle cx="186" cy="${234 + i * 30}" r="3.5" fill="${corTexto}"/>`);
        partes.push(`  <text x="198" y="${240 + i * 30}" font-size="17" fill="${corTexto}">${esc(t)}</text>`);
      });
      if (editandoTopicos) {
        const ultimo = topicos[topicos.length - 1];
        partes.push(`  <rect x="${200 + ultimo.length * 8.8}" y="${224 + (topicos.length - 1) * 30}" width="2" height="20" fill="${corTexto}"/>`);
      }
    } else {
      partes.push(`  <circle cx="186" cy="234" r="3.5" fill="#9ca3af"/>${texto(198, 240, 'Clique para adicionar texto', { tamanho: 16, cor: '#9ca3af' })}`);
      if (editandoTopicos) partes.push('  <rect x="198" y="224" width="2" height="20" fill="#1f2937"/>');
    }
  }
  if (forma) partes.push(`  <rect x="${forma.x}" y="${forma.y}" width="${forma.largura}" height="${forma.altura}" rx="10" fill="${forma.cor}"/>`);
  return partes.join('\n');
}

/** Apresentação em tela cheia (depois de F5). Use com `svg(trechos, '#000000')`. */
export function telaCheiaPowerPoint({ titulo, subtitulo = null, tema = null }) {
  const fundo = tema?.fundo ?? '#ffffff';
  const cor = tema?.texto ?? TEXTO;
  return `  <rect x="0" y="0" width="640" height="400" fill="${fundo}"/>
  ${tema ? `<rect x="0" y="0" width="24" height="400" fill="${tema.cor}"/>` : ''}
  <text x="320" y="196" font-size="42" font-weight="700" fill="${cor}" text-anchor="middle">${esc(titulo)}</text>
  ${subtitulo ? `<text x="320" y="248" font-size="24" fill="${cor}" text-anchor="middle">${esc(subtitulo)}</text>` : ''}`;
}

/** Menu "Arquivo" do Office (bastidores). `conteudo`: o que aparece à direita (x 170–620). */
export const ITENS_BASTIDORES = ['Início', 'Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir', 'Fechar'];
export const posicaoBastidores = (item) => ({ x: 26, y: 62 + ITENS_BASTIDORES.indexOf(item) * 32, largura: 128, altura: 28 });
export function bastidoresOffice(app, item, conteudo = '') {
  const partes = [
    '  <g filter="url(#sombra)"><rect x="20" y="16" width="600" height="368" rx="10" fill="#ffffff" stroke="#cbd5e1"/></g>',
    `  <path d="M30 16 h130 v368 h-130 a10 10 0 0 1 -10 -10 v-348 a10 10 0 0 1 10 -10 z" fill="${app.cor}"/>`,
    '  <circle cx="44" cy="38" r="12" fill="none" stroke="#ffffff" stroke-width="1.6"/>',
    texto(44, 43, '←', { tamanho: 13, cor: '#ffffff', centro: true }),
  ];
  ITENS_BASTIDORES.forEach((nome) => {
    const p = posicaoBastidores(nome);
    if (nome === item) partes.push(`  <rect x="${p.x}" y="${p.y}" width="${p.largura}" height="${p.altura}" rx="5" fill="#ffffff" fill-opacity="0.22"/>`);
    partes.push(texto(p.x + 12, p.y + 19, nome, { tamanho: 13, cor: '#ffffff', negrito: nome === item }));
  });
  partes.push(conteudo);
  return partes.join('\n');
}

/** Tela "Salvar como" dos bastidores, com o botão Procurar. */
export const POS_PROCURAR = { x: 180, y: 120, largura: 160, altura: 46 };
export function conteudoSalvarComo() {
  const { x, y, largura, altura } = POS_PROCURAR;
  return `${texto(180, 64, 'Salvar como', { tamanho: 22, negrito: true })}
  <rect x="180" y="84" width="160" height="26" rx="4" fill="#f3f4f6"/>${texto(192, 102, 'Este PC', { tamanho: 12.5 })}
  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="4" fill="#ffffff" stroke="#e5e7eb"/>
  <path d="M${x + 14} ${y + 14} h10 l4 4 h14 v16 h-28 z" fill="#f6c343"/>${texto(x + 54, y + 28, 'Procurar', { tamanho: 13 })}`;
}

/** Tela "Abrir" dos bastidores com a lista de arquivos recentes (linhas de 40 px a partir de y 110). */
export const posicaoRecente = (i) => ({ x: 176, y: 110 + i * 40, largura: 300, altura: 34 });
export function conteudoAbrir(app, arquivos) {
  return [texto(180, 64, 'Abrir', { tamanho: 22, negrito: true }), texto(180, 96, 'Recentes', { tamanho: 13, negrito: true }),
    ...arquivos.map((nome, i) => {
      const p = posicaoRecente(i);
      return `  <rect x="${p.x}" y="${p.y}" width="${p.largura}" height="${p.altura}" rx="4" fill="#ffffff" stroke="#e5e7eb"/>
${iconeApp(p.x + 8, p.y + 6, 22, app)}
  ${texto(p.x + 40, p.y + 22, nome, { tamanho: 13 })}`;
    })].join('\n');
}

/** Tela "Imprimir" dos bastidores: botão grande e a prévia da folha. */
export const POS_IMPRIMIR = { x: 180, y: 90, largura: 96, altura: 84 };
export function conteudoImprimir(linhasPrevia = []) {
  const { x, y, largura, altura } = POS_IMPRIMIR;
  return `${texto(180, 64, 'Imprimir', { tamanho: 22, negrito: true })}
  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="${x + 30}" y="${y + 14}" width="36" height="10" fill="#ffffff" stroke="#374151" stroke-width="1.6"/>
  <rect x="${x + 22}" y="${y + 24}" width="52" height="22" rx="3" fill="#e5e7eb" stroke="#374151" stroke-width="1.6"/>
  <rect x="${x + 30}" y="${y + 38}" width="36" height="14" fill="#ffffff" stroke="#374151" stroke-width="1.6"/>
  ${texto(x + largura / 2, y + 72, 'Imprimir', { tamanho: 13, negrito: true, centro: true })}
  ${texto(180, 204, 'Impressora', { tamanho: 12, negrito: true })}
  <rect x="180" y="212" width="150" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1"/>${texto(190, 230, 'Impressora da sala', { tamanho: 11.5 })}
  <g filter="url(#sombra)"><rect x="380" y="60" width="200" height="280" fill="#ffffff" stroke="#d4d4d8"/></g>
  ${linhasPrevia.map((l, i) => texto(400, 96 + i * 22, l, { tamanho: 12 })).join('\n  ')}`;
}

/** Janela "Salvar como" do Windows, com o campo do nome e o botão Salvar. */
export const POS_SALVAR = { nome: { x: 214, y: 280, largura: 300, altura: 24 }, salvar: { x: 416, y: 318, largura: 78, altura: 28 } };
export function dialogoSalvar(nome = '', { editando = true } = {}) {
  const { nome: campo, salvar } = POS_SALVAR;
  return `  <g filter="url(#sombra)"><rect x="70" y="40" width="500" height="320" rx="8" fill="#ffffff" stroke="#cbd5e1"/></g>
  <path d="M70 48 a8 8 0 0 1 8 -8 h484 a8 8 0 0 1 8 8 v22 h-500 z" fill="#f3f4f6"/>
  ${texto(84, 60, 'Salvar como', { tamanho: 12 })}${texto(552, 61, '×', { tamanho: 14 })}
  <rect x="84" y="78" width="472" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>${texto(94, 93, 'Este Computador   ›   Documentos', { tamanho: 11 })}
  <g font-size="12" fill="#1f2937"><text x="88" y="128">Área de Trabalho</text><rect x="82" y="138" width="110" height="22" rx="4" fill="#e5edf8"/><text x="88" y="153" font-weight="700">Documentos</text><text x="88" y="178">Imagens</text></g>
  <line x1="200" y1="108" x2="200" y2="262" stroke="#e5e7eb"/>
  ${texto(90, 297, 'Nome do arquivo:', { tamanho: 12.5 })}
  <rect x="${campo.x}" y="${campo.y}" width="${campo.largura}" height="${campo.altura}" rx="3" fill="#ffffff" stroke="${editando ? '#0067c0' : '#94a3b8'}" stroke-width="${editando ? 2 : 1}"/>
  ${texto(campo.x + 8, campo.y + 17, nome, { tamanho: 13 })}
  ${editando ? `<rect x="${campo.x + 10 + nome.length * 7.2}" y="${campo.y + 5}" width="1.6" height="15" fill="#1f2937"/>` : ''}
  <rect x="${salvar.x}" y="${salvar.y}" width="${salvar.largura}" height="${salvar.altura}" rx="4" fill="#0067c0"/>${texto(salvar.x + salvar.largura / 2, salvar.y + 19, 'Salvar', { tamanho: 13, cor: '#ffffff', negrito: true, centro: true })}
  <rect x="502" y="318" width="60" height="28" rx="4" fill="#ffffff" stroke="#cbd5e1"/>${texto(532, 337, 'Cancelar', { tamanho: 12, centro: true })}`;
}

/** Ícone do som na barra de tarefas (perto do relógio) e o painel que abre com o controle de volume. */
export const POS_SOM = { cx: 566, cy: 383 };
export function iconeSomBarra() {
  return `  <path d="M558 380 h4 l5 -4 v14 l-5 -4 h-4 z" fill="#374151"/><path d="M570 379 a5 5 0 0 1 0 8" fill="none" stroke="#374151" stroke-width="1.5"/>`;
}
export function painelSom(nivel = 0.5) {
  const x0 = 406;
  const x1 = x0 + 180 * nivel;
  return `  <g filter="url(#sombra)"><rect x="356" y="208" width="264" height="150" rx="10" fill="#f3f4f6" stroke="#d4d4d8"/></g>
  <rect x="372" y="224" width="110" height="44" rx="6" fill="#0067c0"/>${texto(384, 251, 'Wi-Fi', { tamanho: 12, cor: '#ffffff' })}
  <rect x="492" y="224" width="110" height="44" rx="6" fill="#ffffff" stroke="#d4d4d8"/>${texto(504, 251, 'Bluetooth', { tamanho: 12 })}
  <path d="M372 314 h5 l6 -5 v18 l-6 -5 h-5 z" fill="#374151"/>
  <rect x="${x0}" y="316" width="180" height="5" rx="2.5" fill="#cbd5e1"/>
  <rect x="${x0}" y="316" width="${x1 - x0}" height="5" rx="2.5" fill="#0067c0"/>
  <circle cx="${x1}" cy="318.5" r="9" fill="#ffffff" stroke="#0067c0" stroke-width="4"/>
  ${texto(600, 323, String(Math.round(nivel * 100)), { tamanho: 12 })}`;
}

/** Pessoa desenhada de forma simples (cabeça e corpo), em pé sobre `base`. */
export function pessoa(cx, base, altura = 150, cor = '#60a5fa') {
  const r = altura * 0.15;
  const cabeca = base - altura + r;
  const largura = altura * 0.5;
  const topo = base - altura * 0.62;
  return `  <circle cx="${cx}" cy="${cabeca}" r="${r}" fill="#fcd9b6" stroke="#1f2937" stroke-width="2.5"/>
  <path d="M${cx - largura / 2} ${base} V${topo + largura / 2} A${largura / 2} ${largura / 2} 0 0 1 ${cx + largura / 2} ${topo + largura / 2} V${base} Z" fill="${cor}" stroke="#1f2937" stroke-width="2.5"/>`;
}

/** Robô desenhado de forma simples, para representar um programa de computador. */
export function robo(cx, cy, escala = 1) {
  return `  <g transform="translate(${cx} ${cy}) scale(${escala})" stroke="#4c1d95" stroke-width="4" stroke-linejoin="round">
    <line x1="0" y1="-62" x2="0" y2="-44"/><circle cx="0" cy="-66" r="6" fill="#a78bfa"/>
    <rect x="-46" y="-44" width="92" height="70" rx="16" fill="#ede9fe"/>
    <circle cx="-18" cy="-12" r="8" fill="#4c1d95"/><circle cx="18" cy="-12" r="8" fill="#4c1d95"/>
    <path d="M-16 10 h32" stroke-linecap="round"/>
    <rect x="-34" y="32" width="68" height="44" rx="10" fill="#ddd6fe"/>
  </g>`;
}

/**
 * Janela de conversa com um programa de IA. `mensagens`: { de: 'pessoa' | 'ia', linhas, marca? }.
 * `marca`: 'certo' | 'erro' desenha um selo ao lado do balão.
 */
export function janelaConversa(mensagens, { entrada = '', entradaProibida = false } = {}) {
  const partes = [janelaApp('Assistente de IA', '#7c4dd6', { fundo: '#fafafa' })];
  let y = 66;
  for (const { de, linhas, marca } of mensagens) {
    const largura = Math.max(...linhas.map((l) => l.length)) * 8 + 30;
    const altura = linhas.length * 21 + 16;
    const x = de === 'pessoa' ? 600 - largura : 84;
    if (de === 'ia') partes.push(`  <circle cx="58" cy="${y + 18}" r="16" fill="#ede9fe" stroke="#7c4dd6" stroke-width="2"/>${texto(58, y + 23, 'IA', { tamanho: 12, negrito: true, cor: '#5b21b6', centro: true })}`);
    partes.push(`  <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="14" fill="${de === 'pessoa' ? '#dbeafe' : '#ffffff'}" stroke="${de === 'pessoa' ? '#93c5fd' : '#d4d4d8'}"/>`);
    linhas.forEach((linha, i) => partes.push(texto(x + 15, y + 27 + i * 21, linha, { tamanho: 15 })));
    const xMarca = de === 'pessoa' ? x - 26 : x + largura + 26;
    if (marca === 'certo') partes.push(certo(xMarca, y + altura / 2, 18));
    if (marca === 'erro') partes.push(proibido(xMarca, y + altura / 2, 18));
    y += altura + 18;
  }
  partes.push('  <rect x="40" y="326" width="520" height="40" rx="20" fill="#ffffff" stroke="#cbd5e1"/>');
  partes.push(entrada ? texto(60, 351, entrada, { tamanho: 14 }) : texto(60, 351, 'Escreva uma pergunta', { tamanho: 14, cor: '#9ca3af' }));
  partes.push('  <circle cx="584" cy="346" r="18" fill="#7c4dd6"/><path d="M576 346 h14 m-6 -6 l6 6 -6 6" stroke="#ffffff" stroke-width="2.5" fill="none"/>');
  if (entradaProibida) partes.push(proibido(584, 346, 22));
  return partes.join('\n');
}

/**
 * Celular com uma conversa de mensagens. `baloes`: listas de linhas; uma linha
 * `{ link: '...' }` sai azul e sublinhada. `marcaLink`: 'etiqueta' (mostra o que é um link)
 * | 'proibido' (não clique). Nunca anel laranja: link estranho não é para clicar.
 */
export const POS_PONTINHOS = { cx: 414, cy: 52 };
export function celular(contato, detalhe, baloes, { marcaLink = null, respostaProibida = false, menuApagar = false, menuOpcoes = null } = {}) {
  const partes = [
    '  <g filter="url(#sombra)"><rect x="196" y="6" width="248" height="390" rx="30" fill="#111827"/></g>',
    '  <rect x="208" y="24" width="224" height="356" rx="18" fill="#ffffff"/>',
    '  <path d="M208 42 a18 18 0 0 1 18 -18 h188 a18 18 0 0 1 18 18 v36 h-224 z" fill="#f3f4f6"/>',
    '  <circle cx="238" cy="52" r="15" fill="#9ca3af"/>',
    texto(238, 58, '?', { tamanho: 16, negrito: true, cor: '#ffffff', centro: true }),
    texto(262, 50, contato, { tamanho: 13.5, negrito: true }),
    texto(262, 68, detalhe, { tamanho: 11, cor: CINZA }),
    `  <g fill="#374151"><circle cx="${POS_PONTINHOS.cx}" cy="${POS_PONTINHOS.cy - 7}" r="2.2"/><circle cx="${POS_PONTINHOS.cx}" cy="${POS_PONTINHOS.cy}" r="2.2"/><circle cx="${POS_PONTINHOS.cx}" cy="${POS_PONTINHOS.cy + 7}" r="2.2"/></g>`,
  ];
  let y = 92;
  let caixaLink = null;
  for (const linhas of baloes) {
    const altura = linhas.length * 19 + 14;
    const largura = Math.min(196, Math.max(...linhas.map((l) => (typeof l === 'string' ? l : l.link).length)) * 7.6 + 26);
    partes.push(`  <rect x="218" y="${y}" width="${largura}" height="${altura}" rx="12" fill="#e5e7eb"/>`);
    linhas.forEach((linha, i) => {
      const ly = y + 24 + i * 19;
      if (typeof linha === 'string') {
        partes.push(texto(230, ly, linha, { tamanho: 13.5 }));
      } else {
        const w = linha.link.length * 7.4;
        partes.push(texto(230, ly, linha.link, { tamanho: 13.5, cor: '#1d4ed8' }));
        partes.push(`  <line x1="230" y1="${ly + 3}" x2="${230 + w}" y2="${ly + 3}" stroke="#1d4ed8" stroke-width="1.2"/>`);
        caixaLink = { x: 224, y: ly - 17, largura: w + 14, altura: 26 };
      }
    });
    y += altura + 10;
  }
  if (caixaLink && marcaLink === 'etiqueta') partes.push(etiqueta(caixaLink.x + 6, caixaLink.y + caixaLink.altura + 8, 'link'));
  if (caixaLink && marcaLink === 'proibido') partes.push(proibido(caixaLink.x + caixaLink.largura + 22, caixaLink.y + 13, 20));
  if (menuApagar) {
    partes.push(menu(250, 150, [['Responder', '', false], ['Copiar', '', false], ['Apagar', '', true]], 150));
    partes.push(alvoRet(256, 205, 138, 26, 6));
  }
  if (menuOpcoes) {
    const itens = menuOpcoes.itens.map((nome) => [nome, '', nome === menuOpcoes.alvo]);
    partes.push(menu(280, 64, itens, 140));
    let topo = 70;
    for (const [nome] of itens) {
      if (nome === menuOpcoes.alvo) partes.push(alvoRet(284, topo - 2, 132, 30, 7));
      topo += 26;
    }
  }
  partes.push('  <rect x="218" y="338" width="166" height="30" rx="15" fill="#f3f4f6" stroke="#d4d4d8"/>');
  partes.push(texto(232, 358, 'Mensagem', { tamanho: 12, cor: '#9ca3af' }));
  partes.push('  <circle cx="406" cy="353" r="15" fill="#16a34a"/><path d="M399 353 h13 m-5 -5 l5 5 -5 5" stroke="#ffffff" stroke-width="2.4" fill="none"/>');
  if (respostaProibida) partes.push(proibido(406, 353, 20));
  return partes.join('\n');
}
