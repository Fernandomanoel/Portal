# Kit de ilustrações das atividades

Gera as imagens de demonstração (SVG, 640 × 400) no estilo das telas do
Windows 11 usadas nas atividades. É para **casos especiais**: destacar um
ponto específico ou mostrar uma tela difícil/arriscada de capturar. No caso
comum, um **print de tela** (Windows + Shift + S) é mais rápido — veja
`src/data/atividadesAutocorrigidas/COMO-CRIAR-ATIVIDADE.md`.

## Gerar

```bash
npm run ilustracoes              # todas as telas
npm run ilustracoes -- lixeira   # só as telas cujo nome contém "lixeira"
```

Os arquivos saem em `src/assets/atividades/<destino>/<nome>.svg`. Para ver o
resultado, abra o `.svg` no navegador.

## Criar uma tela nova

1. Abra `telas/windows-11.mjs` (ou crie `telas/<curso>.mjs` com
   `export const destino = '<pasta-em-src/assets/atividades>'` e
   `export const telas = {}`).
2. Copie a tela mais parecida com a que você quer, troque o nome da chave, os
   textos e as posições.
3. Rode `npm run ilustracoes -- <nome>` e abra o SVG no navegador. Ajuste as
   posições e rode de novo até ficar bom — normalmente 2 ou 3 rodadas.

## Peças (`pecas.mjs`)

| Peça | O que desenha |
| --- | --- |
| `janela(titulo, caminho, navSelecionado, opções)` | Explorador de Arquivos: abas, endereço, barra de comandos e painel lateral. |
| `janelaApp(titulo, corIcone, opções)` | Janela de aplicativo (Bloco de Notas, Paint, Gerenciamento de Disco...) com barra de menus. |
| `configuracoes(nav, trilha, cartoes)` | Tela de Configurações do Windows 11 com cartões e controles (lista, botão, alternar, caixa, controle deslizante). |
| `dialogo(x, y, largura, altura, titulo, opções)` | Janela de diálogo clássica, com abas opcionais. |
| `areaDeTrabalho()` | Área de trabalho azul com a Lixeira e a barra de tarefas. |
| `pasta` / `arquivo` | Ícones com o nome embaixo; selecionado, esmaecido, renomeando ou compactado (zip). |
| `menu(x, y, itens, largura)` | Menu do botão direito ou de janela, com item em destaque e atalhos. |
| `chamada(x, y, largura, titulo, linhas)` | Caixa explicativa (azul cheia ou branca). |
| `tecla`, `cursor`, `botao`, `caixaSelecao`, `texto` | Tecla do teclado, ponteiro do mouse, botão, caixa de seleção e texto solto. |
| `arvore`, `disco`, `unidade` | Esquema de pastas, faixa de disco (Gerenciamento de Disco) e unidade em Este Computador. |

Coordenadas: a janela padrão ocupa x 20–620 e y 16–384. Deixe pelo menos
10 px de folga no fim dos textos: nos computadores sem a fonte do Windows
(Segoe UI) o texto fica um pouco mais largo.
