import imagemDuplaExposicao from "@/assets/atividades/photoshop/dupla-exposicao.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 5: Efeitos e Filtros Criativos",
  introducao:
    "Você já domina forma, cor e composição. Este grau ensina a trabalhar de forma não destrutiva com filtros — para experimentar à vontade sem medo de estragar a imagem original — e fecha com um efeito artístico clássico: a dupla exposição.",
  itens: [
    {
      id: "objetos-inteligentes",
      titulo: "Objetos Inteligentes — o Conceito",
      cenario:
        "Um Objeto Inteligente guarda os dados originais da imagem \"dentro\" da camada, mesmo depois de redimensionar ou aplicar filtros. É o \"modo seguro\" de editar.",
      passos: ["Clique com o botão direito na camada → Converter para Objeto Inteligente."],
      objetivo:
        "Redimensionar um Objeto Inteligente várias vezes nunca perde qualidade — o Photoshop sempre recalcula a partir dos dados originais guardados.",
    },
    {
      id: "filtros-inteligentes",
      titulo: "Filtros Inteligentes",
      instrucao:
        "Aplicar um filtro em um Objeto Inteligente cria um Filtro Inteligente — aparece como uma linha própria abaixo da camada, com sua própria máscara, e pode ser reaberto e ajustado a qualquer momento.",
      passos: [
        "Converta a camada em Objeto Inteligente (item anterior).",
        "Menu Filtro → escolha qualquer filtro.",
        "O filtro aparece como uma linha extra na camada — duplo clique nele para reabrir e ajustar.",
      ],
      aviso:
        "a máscara do Filtro Inteligente funciona exatamente como a máscara de camada do Grau 2 — pinte de preto para remover o efeito só de uma área.",
    },
    {
      id: "desfoque-nitidez-ruido",
      titulo: "Desfoque, Nitidez e Ruído",
      tabelaReferencia: {
        colunas: ["Filtro", "Caminho", "Uso comum"],
        linhas: [
          ["Desfoque Gaussiano", "Filtro → Desfocar → Desfoque Gaussiano", "Suavizar fundo, simular profundidade de campo"],
          ["Máscara de Nitidez", "Filtro → Nitidez → Máscara de Nitidez", "Realçar detalhes antes de exportar"],
          ["Adicionar Ruído", "Filtro → Ruído → Adicionar Ruído", "Disfarçar transições de retoque, dar textura de filme"],
        ],
      },
    },
    {
      id: "galeria-de-filtros",
      titulo: "Galeria de Filtros",
      cenario:
        "Menu Filtro → Galeria de Filtros reúne dezenas de efeitos artísticos (aquarela, giz de cera, textura de tela) em uma janela de pré-visualização única, todos combináveis entre si.",
      aviso:
        "filtros artísticos datam facilmente uma peça gráfica (lembram o visual dos anos 2000). Use com moderação, geralmente em uma camada separada com opacidade reduzida — e sempre em um Objeto Inteligente, porque a Galeria de Filtros é pesada para desfazer e refazer sem essa proteção.",
    },
    {
      id: "dupla-exposicao-conceito",
      titulo: "Dupla Exposição — o Conceito",
      instrucao:
        "A técnica combina a silhueta de um retrato com uma segunda imagem (paisagem, textura, fumaça) usando um modo de mesclagem — o resultado parece uma exposição dupla de câmera analógica.",
      imagem: {
        url: imagemDuplaExposicao,
        alt: "Diagrama mostrando uma silhueta escura, uma paisagem e o resultado da mistura entre as duas no modo Tela",
        legenda: "O modo de mesclagem \"Tela\", visto no Grau 2, é a base desse efeito.",
      },
    },
    {
      id: "preparando-silhueta",
      titulo: "Preparando a Silhueta",
      passos: [
        "Abra o retrato e selecione a pessoa (Seleção Rápida do Grau 1, ou Selecionar e Máscara do Grau 2).",
        "Camada de ajuste Preto e Branco ou Níveis (Grau 3) para escurecer bastante a figura, quase silhueta.",
        "Adicione uma máscara de camada baseada na seleção (botão \"Adicionar Máscara\" com a seleção ativa).",
      ],
      aviso:
        "quanto mais escura e \"chapada\" a silhueta, mais nítido fica o efeito de dupla exposição depois. Uma silhueta cinza-clara deixa o resultado fraco.",
    },
    {
      id: "pratica-montando-dupla-exposicao",
      titulo: "Prática — Montando a Dupla Exposição",
      instrucao: "Use a silhueta preparada no item anterior e uma foto de paisagem/textura.",
      passos: [
        "Com a silhueta pronta, arraste a foto de paisagem para o mesmo documento, por cima.",
        "No painel de Camadas, defina o Modo de Mesclagem da paisagem para Tela (Grau 2).",
        "Alt + clique entre as duas camadas para \"cortar\" (clipping mask) a paisagem só dentro da silhueta.",
        "Ajuste posição e escala da paisagem (Ctrl+T) até a composição ficar interessante.",
      ],
      objetivo:
        "Clipping mask (máscara de recorte) é diferente de máscara de camada: em vez de pintar preto/branco, ela usa a forma da camada de baixo como limite automático.",
      desafio:
        "adicione uma terceira camada com uma textura (papel amassado, grão de filme, respingos de tinta) por cima de tudo, em modo de mesclagem \"Multiplicar\" ou \"Sobrepor\" (Grau 2), com opacidade baixa (15-25%) — o toque final que separa um efeito \"bom\" de um \"profissional\".",
    },
    {
      id: "atalhos-grau5",
      titulo: "Atalhos do Grau 5 — Cola Rápida",
      tabelaReferencia: {
        colunas: ["Ação", "Caminho"],
        linhas: [
          ["Converter em Objeto Inteligente", "Botão direito na camada → Converter para Objeto Inteligente"],
          ["Desfoque Gaussiano", "Filtro → Desfocar → Desfoque Gaussiano"],
          ["Adicionar Ruído", "Filtro → Ruído → Adicionar Ruído"],
          ["Criar clipping mask", "Alt + clique entre duas camadas"],
          ["Transformação livre", "Ctrl + T"],
        ],
      },
    },
  ],
};

export default atividade;
