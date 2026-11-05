import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O After Effects é o programa de motion graphics e efeitos visuais: dá movimento a textos, formas e imagens e compõe elementos sobre vídeo. O curso explica composições, camadas, quadros-chave (keyframes), animação de texto e formas, efeitos, máscaras e a renderização.",
  topicos: [
    {
      titulo: "Composições, camadas e linha do tempo",
      texto: [
        "O trabalho acontece em composições (comp), que têm tamanho, taxa de quadros (24, 30 ou 60 fps) e duração. Dentro dela, camadas empilhadas (vídeo, imagem, texto, forma, sólido) são organizadas na linha do tempo; a ordem das camadas define o que fica na frente. Cada camada tem propriedades de transformação: posição, escala, rotação e opacidade.",
      ],
      pontos: ["Criar uma composição com o tamanho e o fps certos.", "Organizar camadas na linha do tempo."],
    },
    {
      titulo: "Animação por keyframes",
      texto: [
        "Keyframe (quadro-chave) marca o valor de uma propriedade em um instante; o programa calcula o que está entre eles. Dois keyframes de posição fazem o objeto se mover. A suavização (easing, tecla F9) faz o movimento acelerar e frear de forma natural, em vez de mecânica. O gráfico de velocidade permite ajustar a curva.",
      ],
      pontos: ["Animar a posição e a opacidade.", "Aplicar suavização ao movimento."],
      erros: ["Animações lineares, com ar robótico.", "Esquecer de ativar o cronômetro da propriedade antes de mover."],
    },
    {
      titulo: "Texto, formas e motion graphics",
      texto: [
        "Camadas de texto e de forma são vetoriais e animáveis. Animadores de texto fazem letras aparecerem uma a uma; formas podem ter os traços animados (como um contorno que se desenha) e se combinar. Princípios do movimento (antecipação, aceleração, sobreposição) deixam as animações mais agradáveis. Tipografia legível e poucos elementos evitam poluição.",
      ],
      pontos: ["Animar um texto de entrada.", "Criar uma forma animada simples."],
    },
    {
      titulo: "Efeitos, máscaras e composição",
      texto: [
        "Efeitos alteram a aparência: correção de cor, desfoque, brilho. Máscaras recortam uma parte da camada. Modos de mesclagem combinam camadas. O chroma key remove um fundo de cor uniforme (como o verde) para colocar o personagem sobre outro cenário. O rastreamento de movimento (tracking) faz um elemento acompanhar algo que se move no vídeo.",
      ],
      pontos: ["Aplicar um efeito de cor.", "Entender como funciona o chroma key."],
    },
    {
      titulo: "Renderização e entrega",
      texto: [
        "Para gerar o vídeo final usa-se a fila de renderização (ou o Adobe Media Encoder), escolhendo o formato (H.264/MP4 para a web) e a qualidade. Renderizar demora e exige processamento. Salve o projeto com os arquivos usados na mesma pasta, para não perder as ligações.",
      ],
      pontos: ["Exportar uma animação em MP4.", "Organizar os arquivos do projeto."],
    },
  ],
  glossario: [
    { termo: "Composição", definicao: "Área de trabalho do After Effects, com camadas e linha do tempo." },
    { termo: "Keyframe", definicao: "Quadro-chave: valor de uma propriedade em um momento." },
    { termo: "fps", definicao: "Quadros por segundo de um vídeo." },
    { termo: "Easing", definicao: "Suavização do movimento." },
    { termo: "Chroma key", definicao: "Técnica que remove um fundo de cor uniforme." },
    { termo: "Renderizar", definicao: "Gerar o arquivo de vídeo final." },
  ],
  dicas: [
    "Comece com animações curtas (3 a 5 segundos) para o aluno ver o resultado rápido.",
    "Use referências: peça que o aluno reproduza uma vinheta simples que gostou.",
    "Avise que o programa exige computador potente: faça testes de desempenho antes da aula.",
  ],
};

export default conteudo;
