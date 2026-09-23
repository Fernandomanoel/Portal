import imagemHistograma from "@/assets/atividades/photoshop/histograma-niveis.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 3: Ajustes de Cor e Retoque",
  introducao:
    "Nos Graus 1 e 2 você mexeu na forma da imagem. Agora o foco é a cor e a luz: corrigir uma foto mal exposta, equilibrar tons e apagar imperfeições sem que ninguém perceba que houve edição.",
  itens: [
    {
      id: "por-que-ajustar-cor",
      titulo: "Por que Ajustar Cor é Importante",
      cenario:
        "Toda foto tirada por uma câmera real tem imperfeições de luz: um pouco escura, um pouco amarelada, sem contraste. Ajustar cor não é \"photoshopar a realidade\" — é aproximar a imagem do que o olho humano realmente viu na hora.",
      tabelaReferencia: {
        colunas: ["Problema comum", "Ferramenta deste grau"],
        linhas: [
          ["Foto sem contraste, \"lavada\"", "Níveis ou Curvas"],
          ["Cor com tom estranho (amarelado, azulado)", "Balanço de Cor"],
          ["Cores fracas, sem vida", "Vibração/Saturação"],
          ["Espinha, poeira, fio de cabelo solto", "Pincel de Recuperação / Carimbo"],
        ],
      },
    },
    {
      id: "camadas-de-ajuste-conceito",
      titulo: "Camadas de Ajuste — o Conceito",
      cenario:
        "Uma Camada de Ajuste aplica um efeito de cor (Níveis, Curvas...) para todas as camadas abaixo dela, sem alterar os pixels originais — como a máscara de camada do Grau 2, mas para cor em vez de forma.",
      passos: [
        "Painel de Camadas → ícone de círculo meio preto/meio branco no rodapé → escolha o tipo de ajuste (ou menu Camada → Nova Camada de Ajuste).",
      ],
      objetivo:
        "Camadas de ajuste já vêm com uma máscara de camada em branco por padrão — pinte de preto nela (do jeito que você aprendeu no Grau 2) para aplicar o ajuste só em uma parte da foto, não na imagem inteira.",
    },
    {
      id: "niveis",
      titulo: "Níveis (Levels)",
      instrucao:
        "O histograma mostra quantos pixels existem em cada tom, do preto (esquerda) ao branco (direita). A ferramenta Níveis usa três controles deslizantes sobre esse gráfico.",
      imagem: {
        url: imagemHistograma,
        alt: "Histograma de Níveis com os controles de ponto preto, gama e ponto branco marcados sobre o gráfico",
        legenda: "Arraste o ponto preto até onde o histograma começa a subir, e o ponto branco até onde termina de descer.",
      },
      tabelaReferencia: {
        colunas: ["Controle", "O que faz"],
        linhas: [
          ["Ponto preto", "Tudo à esquerda dele vira preto puro — aumenta o contraste nas sombras"],
          ["Ponto branco", "Tudo à direita dele vira branco puro — recupera realces \"lavados\""],
          ["Gama (meio-tom)", "Clareia ou escurece os tons médios sem afetar preto/branco"],
        ],
      },
      passos: ["Ctrl+L (ou camada de ajuste \"Níveis\")."],
    },
    {
      id: "curvas",
      titulo: "Curvas (Curves)",
      instrucao:
        "Curvas fazem a mesma coisa que Níveis, mas com controle total: qualquer ponto da curva pode ser puxado para cima (clareia) ou para baixo (escurece).",
      passos: [
        "Ctrl+M (ou camada de ajuste \"Curvas\").",
        "Clique no meio da linha reta para criar um ponto e arraste.",
        "Para o efeito clássico de contraste, crie um \"S\": puxe as sombras para baixo e os realces para cima.",
      ],
      aviso:
        "a diagonal pontilhada é a \"curva neutra\" — sem nenhuma mudança. Quanto mais a curva se afasta dela, mais forte é o efeito.",
    },
    {
      id: "matiz-saturacao",
      titulo: "Matiz/Saturação (Hue/Saturation)",
      tabelaReferencia: {
        colunas: ["Controle", "O que faz"],
        linhas: [
          ["Matiz (Hue)", "Gira todas as cores na roda de cores — vermelho pode virar laranja, azul pode virar roxo"],
          ["Saturação", "Intensidade da cor: 0 = preto e branco, valores altos = cores \"gritantes\""],
          ["Luminosidade", "Clareia ou escurece a imagem mantendo a cor"],
        ],
      },
      passos: ["Ctrl+U (ou camada de ajuste \"Matiz/Saturação\")."],
      aviso:
        "o menu \"Todas\" no topo do painel pode ser trocado para uma cor específica (ex.: \"Vermelhos\") — assim você ajusta só uma cor da foto sem afetar as outras.",
    },
    {
      id: "balanco-de-cor",
      titulo: "Balanço de Cor (Color Balance)",
      cenario:
        "Corrige um tom de cor indesejado separando o ajuste em três faixas: Sombras, Meios-tons e Realces — cada uma com seus próprios controles Ciano↔Vermelho, Magenta↔Verde, Amarelo↔Azul.",
      instrucao:
        "Exemplo prático: uma foto tirada sob luz de lâmpada incandescente costuma ficar amarelada. Na faixa de Meios-tons, arraste o controle Amarelo↔Azul um pouco em direção ao Azul para neutralizar.",
      objetivo:
        "Ajustar separadamente sombra/meio-tom/realce é o que diferencia uma correção de cor profissional de simplesmente \"jogar saturação\" na imagem inteira.",
    },
    {
      id: "vibracao-vs-saturacao",
      titulo: "Vibração vs. Saturação",
      instrucao: "Os dois controles ficam na mesma caixa de diálogo (Imagem → Ajustes → Vibração), mas se comportam de forma diferente.",
      tabelaReferencia: {
        colunas: ["Controle", "Comportamento"],
        linhas: [
          ["Saturação", "Aumenta todas as cores igualmente — fácil de exagerar e \"estourar\" a pele"],
          ["Vibração", "Aumenta mais as cores fracas e preserva tons de pele — mais seguro para retratos"],
        ],
      },
      objetivo: "Regra prática: em fotos com pessoas, prefira Vibração. Em paisagens ou ilustrações gráficas, Saturação direta costuma funcionar bem.",
    },
    {
      id: "carimbo",
      titulo: "Carimbo (Clone Stamp)",
      instrucao: "Copia pixels de um ponto de origem para onde você pintar — ótimo para remover objetos indesejados clonando uma área parecida por cima.",
      passos: [
        "Ferramenta Carimbo (tecla S).",
        "Segure Alt e clique no ponto de origem (área limpa e parecida).",
        "Solte Alt e pinte sobre a área que quer esconder.",
      ],
      aviso:
        "o ponto de origem se move junto com o pincel, na mesma direção e distância do primeiro clique — se aparecer um padrão repetido, escolha uma nova origem com Alt + clique de novo.",
    },
    {
      id: "correcao-pontual-vs-recuperacao",
      titulo: "Pincel de Recuperação vs. Correção Pontual",
      tabelaReferencia: {
        colunas: ["Ferramenta", "Como funciona", "Quando usar"],
        linhas: [
          ["Correção Pontual (J)", "Não pede origem — analisa a área ao redor sozinha", "Espinhas, poeira, pequenas manchas isoladas"],
          ["Pincel de Recuperação", "Pede uma origem (Alt+clique) e mistura a textura com o destino", "Manchas maiores, rugas, áreas com textura de pele"],
        ],
      },
      objetivo:
        "A diferença chave para o Carimbo: o Pincel de Recuperação funde a textura copiada com a luz e cor do destino. O Carimbo cola a cópia exatamente como está.",
    },
    {
      id: "subexposicao-superexposicao",
      titulo: "Subexposição e Superexposição (Dodge & Burn)",
      instrucao:
        "Essas ferramentas \"pintam\" luz e sombra diretamente, esculpindo o volume de um rosto ou objeto — a técnica clássica usada em capas de revista para dar profundidade.",
      tabelaReferencia: {
        colunas: ["Ferramenta", "Atalho", "Efeito"],
        linhas: [
          ["Subexposição (Dodge)", "O", "Clareia — realça onde a luz bateria mais forte"],
          ["Superexposição (Burn)", "O (variação)", "Escurece — aprofunda sombras e contornos"],
        ],
      },
      aviso:
        "na Barra de Opções, o menu Faixa deixa escolher Sombras, Meios-tons ou Realces — escurecer só as \"Sombras\" evita estourar o resto da foto.",
    },
    {
      id: "pratica-retocando-retrato",
      titulo: "Prática — Retocando um Retrato",
      instrucao: "Use uma foto de retrato (rosto visível) para esta prática.",
      passos: [
        "Duplique a camada da foto (Ctrl+J) — sempre retoque em uma cópia.",
        "Ferramenta Correção Pontual (tecla J) sobre pequenas manchas e espinhas.",
        "Ferramenta Pincel de Recuperação para rugas ou olheiras mais marcadas.",
        "Ferramenta Carimbo para qualquer objeto solto no fundo atrás da pessoa.",
      ],
      aviso:
        "retoque com moderação: o objetivo é uma pele saudável, não \"plástica\". Dê zoom (Ctrl+0) de vez em quando para ver o resultado no tamanho real, não só ampliado.",
    },
    {
      id: "pratica-ajuste-de-cor-completo",
      titulo: "Prática — Ajuste de Cor Completo",
      instrucao: "Na mesma foto, agora em camadas de ajuste (não destrutivas):",
      passos: [
        "Camada de ajuste Níveis — corrija ponto preto e branco pelo histograma.",
        "Camada de ajuste Curvas — leve \"S\" para contraste.",
        "Camada de ajuste Balanço de Cor — neutralize qualquer tom estranho nos meios-tons.",
        "Camada de ajuste Vibração — +10 a +20 para dar vida sem exagerar.",
      ],
      desafio:
        "agrupe as 4 camadas de ajuste (Ctrl+G, do Grau 2) e nomeie o grupo \"Ajuste de Cor Final\" — reduza a Opacidade do grupo para 80% e compare o antes/depois ligando e desligando o olho do grupo.",
    },
    {
      id: "atalhos-grau3",
      titulo: "Atalhos do Grau 3 — Cola Rápida",
      tabelaReferencia: {
        colunas: ["Atalho", "Ação"],
        linhas: [
          ["Ctrl + L", "Níveis"],
          ["Ctrl + M", "Curvas"],
          ["Ctrl + U", "Matiz/Saturação"],
          ["S", "Carimbo"],
          ["J", "Correção Pontual / Pincel de Recuperação"],
          ["O", "Subexposição / Superexposição"],
          ["Alt + clique", "Definir ponto de origem (Carimbo/Recuperação)"],
          ["Ctrl + J", "Duplicar camada"],
        ],
      },
    },
  ],
};

export default atividade;
