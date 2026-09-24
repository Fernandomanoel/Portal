import imagemMascara from "@/assets/atividades/photoshop/mascara-de-camada.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 2: Seleções e Camadas Avançadas",
  introducao:
    "No Grau 1 você aprendeu a apagar pedaços da imagem. Agora o foco muda: esconder e revelar partes dela sem perder nada — a base de qualquer montagem profissional, com máscaras de camada e modos de mesclagem.",
  itens: [
    {
      id: "por-que-selecionar-bem-importa",
      titulo: "Por que Selecionar Bem Importa",
      cenario:
        "Toda edição no Photoshop parte de uma pergunta: \"o que exatamente vou afetar?\" Uma seleção mal feita — com sobras de fundo ou pedaços cortados do objeto — aparece na hora em qualquer montagem.",
      aviso:
        "no Grau 1 você usou a Seleção Rápida (tecla W) para remover fundo. Ela é ótima para objetos com bordas nítidas, mas cabelo, pelo e transparências (vidro, fumaça) precisam de ferramentas mais finas — é isso que este grau ensina.",
    },
    {
      id: "selecao-por-cor",
      titulo: "Seleção por Cor (Faixa de Cor)",
      instrucao:
        "Em vez de arrastar o mouse sobre a forma do objeto, esta ferramenta seleciona todos os pixels de uma cor parecida na imagem inteira — ótima para fundos de cor sólida (fundo verde, azul ou branco de estúdio).",
      passos: [
        "Menu Selecionar → Faixa de Cor...",
        "Clique com o conta-gotas na cor que você quer selecionar (ex.: o fundo).",
        "Ajuste o controle Intervalo (Fuzziness) para pegar mais ou menos tons parecidos.",
        "Clique em OK.",
      ],
    },
    {
      id: "laco-poligonal-e-magnetico",
      titulo: "Laço Poligonal e Laço Magnético",
      instrucao:
        "A ferramenta Laço (tecla L) tem três variações escondidas atrás do mesmo ícone — clique e segure o ícone na Caixa de Ferramentas para ver as opções.",
      tabelaReferencia: {
        colunas: ["Variação", "Quando usar"],
        linhas: [
          ["Laço", "Desenho livre à mão, para formas orgânicas e imprecisas"],
          ["Laço Poligonal", "Cliques em linha reta — ideal para bordas retas (caixas, prédios, telas)"],
          ["Laço Magnético", "\"Gruda\" sozinho nas bordas de maior contraste — bom para contornos bem definidos"],
        ],
      },
      objetivo:
        "Segurar Alt enquanto usa qualquer Laço permite alternar temporariamente para o modo poligonal (cliques retos) mesmo estando no modo livre.",
    },
    {
      id: "aperfeicoar-borda",
      titulo: "Aperfeiçoar Borda (Selecionar e Máscara)",
      instrucao:
        "Depois de fazer qualquer seleção, a Barra de Opções mostra o botão Selecionar e Máscara. Ele abre um modo especial para refinar a borda — essencial em cabelo, pelo de animal e tecidos com textura.",
      passos: [
        "Faça uma seleção com qualquer ferramenta.",
        "Barra de Opções → botão Selecionar e Máscara.",
        "Use o pincel Aperfeiçoar Borda sobre as áreas de cabelo/pelo.",
        "Ajuste Suavizar, Pena e Contrair/Expandir conforme necessário.",
        "Em Saída Para, escolha \"Seleção\" ou \"Nova Camada com Máscara\".",
      ],
      objetivo:
        "Escolher \"Nova Camada com Máscara\" na saída já entrega o resultado pronto para o próximo passo — máscaras de camada.",
    },
    {
      id: "mascaras-de-camada-conceito",
      titulo: "Máscaras de Camada — o Conceito",
      cenario:
        "Uma máscara de camada é como um estêncil em preto e branco colado sobre a camada: onde a máscara é branca, a camada aparece; onde é preta, a camada fica escondida (mas continua lá, intacta).",
      objetivo:
        "A grande vantagem: se errar, é só pintar a máscara de volta para branco. Nada é apagado de verdade — diferente da Borracha, que você usou no Grau 1.",
    },
    {
      id: "criando-primeira-mascara",
      titulo: "Criando sua Primeira Máscara de Camada",
      passos: [
        "Selecione a camada no painel de Camadas.",
        "Botão Adicionar Máscara de Camada (ícone de retângulo com círculo, no rodapé do painel).",
        "Uma miniatura branca aparece ao lado da camada — isso é a máscara, totalmente visível por enquanto.",
      ],
      imagem: {
        url: imagemMascara,
        alt: "Painel de Camadas do Photoshop com a camada Foto 2 selecionada mostrando a miniatura da máscara ao lado da miniatura da imagem",
        legenda: "O segundo quadrado ao lado da miniatura da camada é a máscara — clicar nele a torna ativa para edição.",
      },
    },
    {
      id: "pintando-na-mascara",
      titulo: "Pintando na Máscara",
      instrucao: "Com a máscara selecionada (clique na miniatura dela), use o Pincel (tecla B) para pintar.",
      tabelaReferencia: {
        colunas: ["Cor do pincel", "Efeito na máscara"],
        linhas: [
          ["Preto", "Esconde aquela área da camada"],
          ["Branco", "Revela (mostra) aquela área da camada"],
          ["Cinza", "Mostra parcialmente — bom para transições suaves"],
        ],
      },
      aviso:
        "confira sempre se a miniatura da máscara (não a da imagem) está com uma borda de destaque antes de pintar — é fácil pintar sem querer direto na foto.",
    },
    {
      id: "modos-de-mesclagem",
      titulo: "Modos de Mesclagem — Visão Geral",
      cenario:
        "O menu de Modo de Mesclagem fica no topo do painel de Camadas (onde está escrito \"Normal\"). Ele muda matematicamente como os pixels da camada de cima se combinam com os de baixo.",
      tabelaReferencia: {
        colunas: ["Modo", "Efeito geral"],
        linhas: [
          ["Multiplicar", "Escurece — ótimo para sombras e texturas escuras"],
          ["Tela (Screen)", "Clareia — ótimo para brilhos, luzes e fumaça"],
          ["Sobrepor", "Aumenta o contraste, misturando os dois efeitos acima"],
        ],
      },
    },
    {
      id: "grupos-de-camadas",
      titulo: "Grupos de Camadas e Organização",
      instrucao: "Documentos com muitas camadas ficam confusos rápido. Grupos funcionam como pastas.",
      passos: [
        "Selecione várias camadas (Ctrl + clique em cada uma) e aperte Ctrl+G.",
        "Duplo clique no nome do grupo (ou da camada) para renomear.",
      ],
      objetivo:
        "Nomeie camadas e grupos com nomes que descrevem o conteúdo (\"Fundo\", \"Personagem\", \"Ajustes de Cor\") em vez de deixar \"Camada 1\", \"Camada 2\" — em projetos grandes isso economiza muito tempo.",
    },
    {
      id: "opacidade-vs-preenchimento",
      titulo: "Opacidade vs. Preenchimento",
      instrucao: "Os dois campos ficam lado a lado no topo do painel de Camadas e parecem fazer a mesma coisa, mas são diferentes.",
      tabelaReferencia: {
        colunas: ["Campo", "O que controla"],
        linhas: [
          ["Opacidade", "Transparência da camada inteira, incluindo estilos de camada (sombra, brilho...)"],
          ["Preenchimento", "Transparência só do conteúdo — estilos aplicados continuam 100% visíveis"],
        ],
      },
      aviso:
        "se você reduzir a Opacidade e uma sombra aplicada à camada sumir junto, era isso que você não queria — use Preenchimento para manter os estilos de camada intactos.",
    },
    {
      id: "pratica-montagem-com-mascara",
      titulo: "Prática — Montagem com Máscara",
      instrucao: "Use duas fotos diferentes para esta prática.",
      passos: [
        "Abra a Foto 1 (vai ser o fundo).",
        "Arraste a Foto 2 para dentro do mesmo documento (ela vira uma nova camada, por cima).",
        "Com a Foto 2 selecionada, clique em Adicionar Máscara de Camada.",
        "Pinte de preto na máscara, nas partes da Foto 2 que você quer esconder, revelando a Foto 1 por baixo.",
      ],
      objetivo:
        "Resultado esperado: as duas fotos se misturando em uma única composição, sem nenhuma borda \"colada\" — se aparecer uma borda dura, volte à máscara e suavize com um pincel de borda macia.",
    },
    {
      id: "pratica-transicao-gradiente",
      titulo: "Prática — Transição Suave com Gradiente",
      instrucao: "Para uma transição gradual entre as duas fotos (em vez de um recorte definido), use a ferramenta Gradiente direto na máscara.",
      passos: [
        "Clique na miniatura da máscara para selecioná-la.",
        "Ferramenta Gradiente (tecla G), predefinição preto-para-branco.",
        "Clique e arraste sobre a área de transição — quanto mais longo o arraste, mais suave a mistura.",
      ],
      desafio:
        "experimente o mesmo gradiente com o Modo de Mesclagem \"Tela\" na camada de cima e compare com o modo \"Normal\". A diferença mostra por que fotógrafos usam mesclagem para simular luz.",
    },
    {
      id: "atalhos-grau2",
      titulo: "Atalhos do Grau 2 — Cola Rápida",
      tabelaReferencia: {
        colunas: ["Atalho", "Ação"],
        linhas: [
          ["L", "Laço (segure para variações)"],
          ["Alt (com Laço ativo)", "Alternar para modo poligonal"],
          ["Ctrl + G", "Agrupar camadas selecionadas"],
          ["G", "Ferramenta Gradiente"],
          ["X", "Trocar cor de frente/fundo (preto ↔ branco na máscara)"],
          ["B", "Pincel (para pintar a máscara)"],
          ["Ctrl + clique na miniatura", "Carregar a máscara/camada como seleção"],
        ],
      },
    },
  ],
};

export default atividade;
