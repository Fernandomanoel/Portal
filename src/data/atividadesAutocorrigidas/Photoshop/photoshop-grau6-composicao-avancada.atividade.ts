import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 6: Composição Avançada",
  introducao:
    "O grau mais avançado até aqui. Você já sabe selecionar (Grau 2), ajustar cor (Grau 3), compor com texto e regras visuais (Grau 4) e usar filtros não destrutivos (Grau 5). Agora tudo isso se junta em uma única habilidade: fazer duas imagens de origens completamente diferentes parecerem uma só cena real.",
  regras: {
    titulo: "5 fatores de uma composição que engana o olho — confira todos",
    itens: [
      "Perspectiva: os elementos estão no mesmo ângulo de câmera?",
      "Borda da seleção: sobrou fundo antigo colado, ou faltou pedaço do objeto?",
      "Cor: os tons de cor combinam entre si?",
      "Luz e sombra: a luz vem da mesma direção em todos os elementos?",
      "Textura/grão: uma imagem é nítida e a outra granulada?",
    ],
  },
  itens: [
    {
      id: "escolhendo-as-fontes",
      titulo: "Escolhendo as Fontes",
      instrucao:
        "Antes de abrir o Photoshop, escolha bem: quanto mais parecidas as fontes já forem, menos trabalho de harmonização depois. Bons sinais: resolução parecida, iluminação de intensidade parecida.",
      aviso:
        "isso não significa que fontes muito diferentes não funcionam — só que vão exigir mais dos passos de cor e luz para se encaixarem.",
    },
    {
      id: "correcao-de-perspectiva",
      titulo: "Correção de Perspectiva",
      instrucao: "Se a cena de fundo tem um ângulo de câmera, o elemento inserido precisa do mesmo ângulo para \"grudar\" nela.",
      passos: [
        "Selecione a camada do elemento a encaixar.",
        "Ctrl+T → botão direito → Distorcer ou Perspectiva.",
        "Arraste os cantos para acompanhar as linhas de perspectiva da cena de fundo (chão, paredes, horizonte).",
      ],
      objetivo:
        "Para casos mais precisos, existe o filtro Ponto de Fuga (Filtro → Ponto de Fuga) — ele deixa você marcar os planos de perspectiva da cena antes de colar o elemento.",
    },
    {
      id: "selecionando-cabelo-e-pelo",
      titulo: "Selecionando com Precisão — Cabelo e Pelo",
      instrucao:
        "Você já usou Selecionar e Máscara no Grau 2. Para composições fantásticas, o detalhe da borda é o que mais entrega uma edição malfeita — vale voltar a esse recurso com mais calma.",
      passos: [
        "Faça a seleção inicial (Seleção Rápida ou Laço).",
        "Selecionar e Máscara → pincel Aperfeiçoar Borda sobre fios de cabelo/pelo.",
        "Ative Decontaminar Cores para remover resquício da cor do fundo antigo nas pontas dos fios.",
        "Saída para \"Nova Camada com Máscara\".",
      ],
      aviso:
        "\"Decontaminar Cores\" cria uma nova camada (a original fica intacta) — isso é importante porque o processo altera levemente a cor dos pixels da borda.",
    },
    {
      id: "harmonizacao-de-cor",
      titulo: "Harmonização de Cor entre Elementos",
      instrucao:
        "Mesmo com a seleção perfeita, cores de temperatura diferente (uma imagem mais fria/azul, outra mais quente/amarela) denunciam a montagem instantaneamente.",
      passos: [
        "Camada de ajuste Balanço de Cor (Grau 3) presa (clipping mask) só no elemento inserido.",
        "Compare lado a lado com a cena de fundo e ajuste até os tons combinarem.",
        "Repita com Matiz/Saturação se a intensidade de cor também estiver diferente.",
      ],
      objetivo:
        "Truque rápido: use o Conta-gotas para comparar a cor de uma sombra da cena de fundo com a sombra do elemento inserido — se os valores de RGB forem muito diferentes, ainda há trabalho de harmonização a fazer.",
    },
    {
      id: "luz-e-sombra-consistentes",
      titulo: "Luz e Sombra Consistentes",
      instrucao: "O olho humano percebe inconsistência de luz mesmo sem conseguir explicar por quê.",
      passos: [
        "Identifique de onde vem a luz principal na cena de fundo.",
        "Use Subexposição/Superexposição (Grau 3) no elemento inserido, na mesma direção.",
        "Se necessário, pinte uma luz de contorno (rim light) sutil no lado do elemento voltado para a fonte de luz.",
      ],
    },
    {
      id: "sombras-de-contato",
      titulo: "Sombras de Contato",
      instrucao: "Uma sombra de contato suave e escura embaixo do elemento é o que \"prende\" ele na cena — sem ela, o elemento parece flutuando.",
      passos: [
        "Nova camada, abaixo do elemento inserido.",
        "Elipse preta (Grau 4), suavizada com Desfoque Gaussiano (Grau 5).",
        "Reduza a Opacidade da camada até parecer natural (raramente 100%).",
      ],
    },
    {
      id: "ruido-e-grao-unificados",
      titulo: "Ruído e Grão Unificados",
      instrucao:
        "Uma ilustração vetorial nítida colada em uma foto granulada de celular à noite sempre vai parecer \"colada\", porque tecnicamente é uma textura diferente da outra.",
      passos: [
        "Observe o grão da imagem de fundo (mais visível em fotos escuras/noturnas).",
        "Nova camada por cima de tudo, preenchida com 50% cinza (Editar → Preencher → 50% cinza).",
        "Filtro → Ruído → Adicionar Ruído (Grau 5), depois modo de mesclagem \"Sobrepor\".",
        "Ajuste a Opacidade até o grão cobrir a imagem inteira de forma pareja.",
      ],
      objetivo: "Esse passo sozinho já resolve boa parte da sensação de \"colagem\" — é rápido e o efeito é grande.",
    },
    {
      id: "escala-e-profundidade",
      titulo: "Escala e Profundidade",
      tabelaReferencia: {
        colunas: ["Sinal de profundidade", "Como aplicar"],
        linhas: [
          ["Tamanho relativo", "Elementos mais distantes da câmera devem ser menores"],
          ["Desfoque de profundidade", "Desfoque Gaussiano leve (Grau 5) em elementos de fundo, nitidez total no principal"],
          ["Saturação atmosférica", "Elementos muito distantes ficam levemente mais \"lavados\"/azulados — neblina natural do ar"],
        ],
      },
      aviso:
        "um elemento perfeitamente nítido \"colado\" em um fundo com profundidade de campo (fundo desfocado de propósito) sempre vai parecer artificial — combine os dois níveis de foco.",
    },
    {
      id: "pratica-composicao-fantastica",
      titulo: "Prática — Sua Composição Fantástica",
      instrucao:
        "Aqui não existe uma imagem-modelo para copiar. Escolha uma foto sua (ou de qualquer pessoa/objeto) e combine com um segundo elemento de fonte totalmente diferente — outra foto, uma ilustração, um efeito de luz.",
      passos: [
        "Crie uma camada com uma cor dominante da cena (quente para pôr do sol, azul para noite), modo de mesclagem \"Sobrepor\" ou \"Cor\", opacidade 10-20%, por cima de toda a composição — o mesmo truque usado em cinema para unificar a cor de cenas gravadas em locais diferentes.",
        "Confira o checklist da prática antes de considerar pronta.",
      ],
      tabelaReferencia: {
        colunas: ["Checklist da prática"],
        linhas: [
          ["Perspectiva corrigida entre os elementos"],
          ["Borda da seleção refinada (sem fundo antigo colado)"],
          ["Cor harmonizada (Balanço de Cor ou Matiz/Saturação)"],
          ["Luz e sombra na mesma direção em tudo"],
          ["Sombra de contato adicionada"],
          ["Ruído/grão unificado e camada de cor global"],
        ],
      },
      desafio: "use pelo menos 4 das técnicas deste grau na mesma composição.",
      objetivo:
        "Não existe \"resultado certo\" aqui — existe resultado que engana o olho. Se alguém que não viu as duas fotos originais achar que é uma foto só, a prática funcionou.",
    },
    {
      id: "atalhos-grau6",
      titulo: "Atalhos do Grau 6 — Cola Rápida",
      tabelaReferencia: {
        colunas: ["Ação", "Caminho"],
        linhas: [
          ["Distorcer/Perspectiva", "Ctrl + T → botão direito"],
          ["Ponto de Fuga", "Filtro → Ponto de Fuga"],
          ["Decontaminar Cores", "Selecionar e Máscara → opção na saída"],
          ["Clipping mask", "Alt + clique entre camadas"],
          ["Preencher com 50% cinza", "Editar → Preencher → 50% cinza"],
        ],
      },
    },
  ],
};

export default atividade;
