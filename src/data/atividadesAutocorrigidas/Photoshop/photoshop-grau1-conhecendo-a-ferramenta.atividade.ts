import imagemCaixaFerramentas from "@/assets/atividades/photoshop/caixa-de-ferramentas.svg";
import imagemInserirImagem from "@/assets/atividades/photoshop/inserir-e-ajustar-imagem.svg";
import imagemPainelCamadas from "@/assets/atividades/photoshop/painel-de-camadas.svg";
import imagemPanorama from "@/assets/atividades/photoshop/panorama-da-tela.svg";
import imagemRecortar from "@/assets/atividades/photoshop/recortando-a-imagem.svg";
import imagemRemoverFundo from "@/assets/atividades/photoshop/remover-fundo-antes-depois.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 1: Conhecendo a Ferramenta",
  introducao:
    "Do zero até a sua primeira imagem editada: reconhecer a tela do Photoshop, inserir uma foto, recortar e remover o fundo. Use qualquer foto sua — o importante é praticar o caminho, não o resultado final.",
  itens: [
    {
      id: "para-que-serve",
      titulo: "O que é o Photoshop?",
      cenario:
        "O Adobe Photoshop é o programa de edição de imagens mais usado do mundo. Ele trabalha com imagens raster (formadas por pixels, como fotografias) e permite editar, retocar, montar e criar artes do zero.",
      tabelaReferencia: {
        colunas: ["Uso no dia a dia", "Exemplo"],
        linhas: [
          ["Tratamento de fotos", "Ajustar cor, brilho, remover imperfeições"],
          ["Design gráfico", "Artes para redes sociais, banners, cartazes"],
          ["Montagens", "Combinar várias imagens em uma só composição"],
          ["Remoção de fundo", "Preparar produtos para catálogos e e-commerce"],
        ],
      },
      objetivo:
        "Photoshop edita pixels (fotos). Illustrator e CorelDraw editam vetores (formas) — são ferramentas complementares, não concorrentes.",
    },
    {
      id: "documento-novo",
      titulo: "Um Documento Novo",
      passos: [
        "Para começar do zero: menu Arquivo → Novo... (ou o atalho Ctrl+N). Escolha um tamanho (ex.: 1000×1000 px) e clique em Criar.",
        "Para abrir uma foto existente: menu Arquivo → Abrir... (ou o atalho Ctrl+O). Selecione o arquivo e clique em Abrir.",
      ],
      aviso:
        "se a tela inicial mostrar só um botão \"Novo arquivo\" no meio, é a tela de boas-vindas — normal em versões recentes. Os atalhos acima funcionam do mesmo jeito.",
    },
    {
      id: "panorama-da-tela",
      titulo: "Panorama da Tela",
      instrucao:
        "Antes de clicar em qualquer coisa, vale reconhecer as 5 áreas fixas da tela do Photoshop. O diagrama abaixo é um mapa simplificado — não é uma captura real do programa, mas mostra onde cada área fica.",
      imagem: {
        url: imagemPanorama,
        alt: "Diagrama da tela do Photoshop com 5 áreas numeradas: barra de menus, barra de opções, caixa de ferramentas, área de trabalho e painéis",
        legenda: "As 5 áreas fixas da tela — o layout real varia por versão, mas a posição de cada uma é estável.",
      },
      tabelaReferencia: {
        colunas: ["Área", "O que é"],
        linhas: [
          ["1. Barra de Menus", "Onde ficam Arquivo, Editar, Imagem, Camada..."],
          ["2. Barra de Opções", "Opções da ferramenta selecionada no momento"],
          ["3. Caixa de Ferramentas", "Coluna vertical à esquerda, com os ícones das ferramentas"],
          ["4. Área de Trabalho", "Onde a imagem/documento aparece de verdade"],
          ["5. Painéis", "Coluna à direita — Camadas é o mais usado"],
        ],
      },
      objetivo: "Reconhecer as 5 áreas da tela antes de mexer em qualquer coisa.",
    },
    {
      id: "barra-de-menus",
      titulo: "A Barra de Menus",
      instrucao: "Fica na linha mais alta da janela. É onde ficam os comandos organizados por categoria.",
      tabelaReferencia: {
        colunas: ["Menu", "Para que serve"],
        linhas: [
          ["Arquivo", "Novo, Abrir, Salvar, Exportar, Colocar Incorporado"],
          ["Editar", "Desfazer, Copiar, Colar, Preferências"],
          ["Imagem", "Tamanho da imagem, Tamanho da tela, Ajustes de cor"],
          ["Camada", "Nova camada, Máscara de camada, Mesclar"],
          ["Selecionar", "Selecionar tudo, Inverter seleção, Desmarcar"],
          ["Janela", "Mostrar ou esconder qualquer painel (Camadas, Histórico...)"],
        ],
      },
      aviso:
        "o menu Janela é o \"resgate\" para quando um painel some sem querer — basta marcar o nome dele de novo na lista.",
    },
    {
      id: "caixa-de-ferramentas",
      titulo: "Caixa de Ferramentas",
      instrucao:
        "É a coluna de ícones à esquerda da tela. Passar o mouse sobre qualquer ícone mostra o nome da ferramenta e o atalho de teclado. Bem embaixo da caixa ficam dois quadradinhos sobrepostos: a cor de frente (o que o Pincel pinta) e a cor de fundo — a setinha pequena troca as duas de lugar (atalho X).",
      imagem: {
        url: imagemCaixaFerramentas,
        alt: "Caixa de ferramentas do Photoshop com a Seleção Rápida (W) em destaque e os quadrados de cor de frente/fundo",
        legenda: "Clique e arraste com a Seleção Rápida — o Photoshop detecta bordas e \"gruda\" na forma do objeto.",
      },
      tabelaReferencia: {
        colunas: ["Ferramenta", "Atalho"],
        linhas: [
          ["Mover", "V"],
          ["Seleção Retangular", "M"],
          ["Laço", "L"],
          ["Seleção Rápida", "W"],
          ["Corte (Crop)", "C"],
          ["Pincel", "B"],
          ["Borracha", "E"],
          ["Zoom", "Z"],
        ],
      },
      objetivo: "A Seleção Rápida é a base da remoção de fundo manual, praticada mais adiante.",
    },
    {
      id: "barra-de-opcoes",
      titulo: "A Barra de Opções",
      instrucao:
        "Fica logo abaixo da Barra de Menus, e é contextual: o conteúdo dela muda de acordo com a ferramenta selecionada na Caixa de Ferramentas.",
      tabelaReferencia: {
        colunas: ["Ferramenta ativa", "O que aparece na Barra de Opções"],
        linhas: [
          ["Seleção Retangular", "Modo de seleção, suavização de borda (feather)"],
          ["Corte", "Proporção (livre, quadrado, 16:9...), sobreposição de grade"],
          ["Pincel", "Tamanho, dureza, opacidade do traço"],
        ],
      },
      aviso:
        "erro comum de quem está começando: tentar mudar a proporção do corte em outro lugar da tela. Ela só aparece ali, na Barra de Opções, e apenas quando a ferramenta Corte está selecionada.",
    },
    {
      id: "painel-de-camadas",
      titulo: "O Painel de Camadas",
      instrucao:
        "Pense em camadas como folhas de papel vegetal empilhadas: cada imagem, texto ou forma fica em sua própria folha, e você pode mostrar, esconder ou reorganizar cada uma sem afetar as outras.",
      imagem: {
        url: imagemPainelCamadas,
        alt: "Painel de Camadas do Photoshop com as camadas Minha Foto e Fundo",
        legenda: "O círculo ao lado da camada mostra/esconde; \"+ nova\" cria uma camada; a lixeira apaga a selecionada.",
      },
      aviso:
        "se o painel de Camadas sumiu da tela, use Janela → Camadas (atalho F7). O Delete só afeta a camada ativa — confira qual está selecionada antes de apagar algo.",
    },
    {
      id: "zoom-e-navegacao",
      titulo: "Zoom e Navegação",
      tabelaReferencia: {
        colunas: ["Ação", "Atalho"],
        linhas: [
          ["Aumentar zoom", "Ctrl + +"],
          ["Diminuir zoom", "Ctrl + -"],
          ["Ajustar imagem à tela", "Ctrl + 0"],
          ["Mover a imagem na tela", "Segurar Espaço e arrastar"],
          ["Zoom rápido", "Rodar a roda do mouse com Alt pressionado"],
        ],
      },
    },
    {
      id: "pratica-inserir-imagem",
      titulo: "Prática 1 — Inserindo e Ajustando uma Imagem",
      passos: [
        "Menu Arquivo → Colocar Incorporado... e escolha a sua foto (ou arraste o arquivo direto para dentro da janela do Photoshop).",
        "Com a imagem selecionada, use o atalho Ctrl+T (Transformação Livre).",
        "Segure Shift e arraste um dos cantos para manter a proporção, e pressione Enter para confirmar.",
      ],
      imagem: {
        url: imagemInserirImagem,
        alt: "Imagem inserida no Photoshop com as alças de Transformação Livre (Ctrl+T) nos quatro cantos e no meio das bordas",
        legenda: "Ctrl+T mostra as alças de transformação; Shift + canto mantém a proporção.",
      },
      aviso: "arrastar pela lateral (não pelo canto) distorce a imagem. Sempre puxe pelos cantos.",
    },
    {
      id: "pratica-recortar",
      titulo: "Prática 2 — Recortando a Imagem",
      passos: [
        "Selecione a ferramenta Corte (tecla C).",
        "Arraste as bordas/cantos que aparecem sobre a imagem.",
        "Na Barra de Opções, escolha uma proporção fixa se quiser (ex.: 1:1, 16:9).",
        "Pressione Enter para aplicar o corte.",
      ],
      imagem: {
        url: imagemRecortar,
        alt: "Ferramenta Corte aplicada sobre a imagem, com a área fora do recorte escurecida",
        legenda: "A área escurecida some do resultado final; a área clara dentro das alças é o que fica.",
      },
      objetivo: "A ferramenta Corte (Crop) recorta a imagem para o tamanho que você quiser.",
    },
    {
      id: "pratica-remover-fundo",
      titulo: "Prática 3 — Removendo o Fundo",
      passos: [
        "Caminho rápido (versões recentes): selecione a camada da foto → Janela → Propriedades → botão Remover Plano de Fundo.",
        "Caminho manual (todas as versões): Seleção Rápida (W) sobre o objeto → menu Selecionar → Inverter → tecla Delete → Ctrl+D para desmarcar.",
      ],
      imagem: {
        url: imagemRemoverFundo,
        alt: "Comparação antes e depois: foto com fundo colorido à esquerda e a mesma foto sem fundo (quadriculado de transparência) à direita",
        legenda: "O quadriculado cinza/branco é o símbolo universal de transparência (fundo removido).",
      },
      desafio:
        "se o seu Photoshop tiver o botão \"Remover Plano de Fundo\", faça a remoção pelos dois caminhos e compare o resultado — o manual dá mais controle, o automático é mais rápido.",
    },
    {
      id: "salvando",
      titulo: "Salvando o Trabalho",
      passos: [
        "Para manter as camadas editáveis: Arquivo → Salvar como... → Photoshop (.psd).",
        "Para exportar a imagem final: Arquivo → Exportar → Exportar Como... → PNG ou JPG.",
      ],
      tabelaReferencia: {
        colunas: ["Formato", "Quando usar"],
        linhas: [
          [".PSD", "Arquivo de trabalho — mantém as camadas separadas e editáveis"],
          [".PNG", "Suporta transparência. Ideal para a foto sem fundo do exercício 3"],
          [".JPG", "Não suporta transparência, mas gera arquivos menores"],
        ],
      },
      aviso:
        "exportar em JPG faz o fundo transparente virar branco — isso é esperado, porque JPG não suporta transparência. Exporte em PNG quando precisar manter o fundo removido. Salve sempre um .PSD primeiro e só depois exporte o .PNG/.JPG final.",
    },
    {
      id: "atalhos-essenciais",
      titulo: "Atalhos Essenciais — Cola Rápida",
      instrucao: "Uma referência rápida com os atalhos usados neste guia, para consultar depois.",
      tabelaReferencia: {
        colunas: ["Atalho", "Ação"],
        linhas: [
          ["Ctrl + N", "Novo documento"],
          ["Ctrl + O", "Abrir arquivo"],
          ["Ctrl + T", "Transformação livre (redimensionar/girar)"],
          ["V / M / L / W", "Mover / Seleção Retangular / Laço / Seleção Rápida"],
          ["C / B / E / Z", "Corte / Pincel / Borracha / Zoom"],
          ["X", "Trocar cor de frente/fundo"],
          ["F7", "Mostrar/esconder painel de Camadas"],
          ["Ctrl + D", "Desmarcar seleção"],
          ["Ctrl + 0", "Ajustar imagem à tela"],
          ["Ctrl + Z", "Desfazer"],
        ],
      },
    },
  ],
};

export default atividade;
