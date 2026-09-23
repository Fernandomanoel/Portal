import imagemEstilos from "@/assets/atividades/photoshop/estilos-de-camada.svg";
import imagemTercos from "@/assets/atividades/photoshop/regra-dos-tercos.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 4: Texto, Formas e Composição",
  introducao:
    "Você já sabe montar imagens (Grau 2) e ajustar cor (Grau 3). Agora entra a peça que transforma uma foto editada em uma peça de design de verdade: texto, formas e as regras de composição que fazem o olho ir para onde você quer. A prática final é um post para redes sociais.",
  itens: [
    {
      id: "ferramenta-texto",
      titulo: "A Ferramenta Texto",
      instrucao: "A ferramenta Texto (tecla T) cria uma camada própria — de texto — que continua editável a qualquer momento, mesmo depois de salva em .PSD.",
      passos: [
        "Ferramenta Texto (tecla T).",
        "Clique no documento e digite — ou clique e arraste para criar uma caixa de texto com quebra automática de linha.",
        "Na Barra de Opções: escolha fonte, tamanho, cor e alinhamento.",
        "Esc ou clique em outra camada para confirmar.",
      ],
      tabelaReferencia: {
        colunas: ["Tipo de texto", "Quando usar"],
        linhas: [
          ["Ponto (clique simples)", "Títulos curtos, uma linha só"],
          ["Parágrafo (clique e arraste)", "Blocos de texto longos, com quebra automática"],
        ],
      },
      aviso:
        "duplo clique no ícone \"T\" da miniatura da camada seleciona todo o texto para editar — clique simples na camada só a move de lugar, não entra no modo de edição.",
    },
    {
      id: "estilos-de-camada",
      titulo: "Estilos de Camada",
      instrucao:
        "Estilos de camada aplicam efeitos (sombra, contorno, brilho...) de forma não destrutiva — ficam \"grudados\" na camada e podem ser editados ou removidos a qualquer momento.",
      imagem: {
        url: imagemEstilos,
        alt: "Título com estilo de camada aplicado: sombra e contorno sobre uma foto, garantindo legibilidade",
        legenda: "Sombra Projetada (Drop Shadow) e Contorno (Stroke) são os efeitos mais usados em títulos e logotipos.",
      },
      passos: [
        "Duplo clique na camada (fora da miniatura) → abre Estilo de Camada.",
        "Marque as caixas à esquerda (Sombra Projetada, Contorno, Brilho Externo...).",
        "Ajuste cor, tamanho e opacidade de cada efeito.",
      ],
      objetivo:
        "O ícone \"fx\" no rodapé do painel de Camadas também abre esse menu — e uma vez aplicado, um pequeno ícone de engrenagem aparece na camada, mostrando que ela tem estilos ativos.",
    },
    {
      id: "formas-vetoriais",
      titulo: "Formas Vetoriais",
      instrucao:
        "Diferente de uma foto (pixels), uma forma vetorial pode ser redimensionada infinitamente sem perder qualidade — ideal para botões, ícones e elementos gráficos de um post.",
      tabelaReferencia: {
        colunas: ["Ferramenta", "Atalho", "Uso"],
        linhas: [
          ["Retângulo", "U", "Faixas, botões, fundos de texto"],
          ["Elipse", "U (variação)", "Selos, badges, avatares"],
          ["Caneta (Pen)", "P", "Formas livres e contornos precisos"],
        ],
      },
      passos: ["Ferramenta Retângulo (tecla U).", "Clique e arraste no documento.", "Na Barra de Opções, defina o Raio para cantos arredondados."],
      objetivo:
        "Formas criam uma camada própria (com miniatura quadrada) e podem receber os mesmos estilos de camada do item anterior.",
    },
    {
      id: "caminhos-com-caneta",
      titulo: "Caminhos (Paths) com a Caneta",
      instrucao: "A ferramenta Caneta desenha contornos precisos ponto a ponto — a base de qualquer ilustração vetorial e de recortes de altíssima precisão.",
      passos: [
        "Ferramenta Caneta (tecla P).",
        "Clique para criar pontos de âncora em linha reta.",
        "Clique e arraste para criar uma curva suave no ponto.",
        "Feche o caminho clicando de volta no primeiro ponto.",
      ],
      aviso:
        "a Caneta tem fama de difícil porque exige prática de mão — não tem problema gastar alguns minutos só clicando e arrastando em uma folha em branco antes de usar em um projeto real.",
    },
    {
      id: "guias-e-grade",
      titulo: "Guias e Grade",
      instrucao: "Linhas de referência que não aparecem na imagem exportada — só ajudam a alinhar elementos enquanto você trabalha.",
      tabelaReferencia: {
        colunas: ["Recurso", "Caminho"],
        linhas: [
          ["Nova Guia", "Arraste a partir da régua (Ctrl+R mostra a régua) ou Visualizar → Nova Guia"],
          ["Grade", "Visualizar → Mostrar → Grade (Ctrl+')"],
          ["Encaixar (snap)", "Visualizar → Encaixar — faz elementos \"grudarem\" nas guias ao arrastar"],
        ],
      },
    },
    {
      id: "regra-dos-tercos",
      titulo: "Regra dos Terços",
      instrucao:
        "Divida a imagem em 3 partes iguais na horizontal e na vertical. Posicionar o elemento principal em uma das interseções das linhas costuma ficar mais equilibrado do que centralizar tudo.",
      imagem: {
        url: imagemTercos,
        alt: "Grade da Regra dos Terços sobre uma foto, com os 4 pontos de interseção marcados em amarelo",
        legenda: "Os 4 pontos amarelos são os locais de maior equilíbrio visual — bons lugares para o rosto ou o título principal.",
      },
      passos: [
        "Visualizar → Mostrar → Linhas de Grade Retangulares, ou crie 2 guias verticais e 2 horizontais a 33% e 66% do documento.",
      ],
    },
    {
      id: "alinhando-e-distribuindo",
      titulo: "Alinhando e Distribuindo Camadas",
      instrucao:
        "Com duas ou mais camadas selecionadas (Ctrl + clique em cada uma no painel), a Barra de Opções da ferramenta Mover mostra ícones de alinhamento.",
      tabelaReferencia: {
        colunas: ["Ícone", "Ação"],
        linhas: [
          ["Alinhar Esquerda/Centro/Direita", "Alinha na horizontal"],
          ["Alinhar Topo/Meio/Base", "Alinha na vertical"],
          ["Distribuir", "Espaça 3 ou mais camadas igualmente entre si"],
        ],
      },
    },
    {
      id: "pratica-montando-post",
      titulo: "Prática — Montando o Post",
      instrucao: "Formato sugerido: quadrado (1080×1080 px), o padrão de feed do Instagram.",
      passos: [
        "Novo documento 1080×1080 px (Ctrl+N).",
        "Insira sua foto como fundo e ajuste cor (Grau 3).",
        "Crie o título com a ferramenta Texto, posicionado em um dos pontos da Regra dos Terços.",
        "Aplique um estilo de camada no título (Sombra ou Contorno) para garantir legibilidade sobre a foto.",
        "Adicione uma forma retangular como faixa de destaque, se quiser.",
      ],
    },
    {
      id: "pratica-exportando",
      titulo: "Prática — Exportando para Redes Sociais",
      passos: [
        "Menu Arquivo → Exportar → Salvar para Web (Legado).",
        "Formato JPG, qualidade 80-90%.",
        "Confira o tamanho final do arquivo — poste com no máximo alguns MB para não perder qualidade na compressão da rede social.",
      ],
      desafio:
        "exporte a mesma arte também em formato de Stories (1080×1920) — redimensione o documento com Imagem → Tamanho da Tela e reorganize o texto para o novo formato vertical, sem esticar nada.",
    },
    {
      id: "atalhos-grau4",
      titulo: "Atalhos do Grau 4 — Cola Rápida",
      tabelaReferencia: {
        colunas: ["Atalho", "Ação"],
        linhas: [
          ["T", "Ferramenta Texto"],
          ["U", "Formas (Retângulo/Elipse)"],
          ["P", "Caneta"],
          ["Ctrl + R", "Mostrar/esconder réguas"],
          ["Ctrl + '", "Mostrar/esconder grade"],
          ["Esc", "Confirmar texto/forma em edição"],
          ["Ctrl + clique (várias camadas)", "Selecionar para alinhar/distribuir"],
        ],
      },
    },
  ],
};

export default atividade;
