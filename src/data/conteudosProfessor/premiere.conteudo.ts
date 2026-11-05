import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "A edição de vídeo conta uma história com imagens, som e ritmo. O curso apresenta o fluxo de trabalho de edição (importar, organizar, cortar, montar, ajustar áudio e cor, exportar), com os conceitos de linguagem audiovisual que valem em qualquer programa.",
  topicos: [
    {
      titulo: "Fluxo de trabalho da edição",
      texto: [
        "O fluxo geral é: planejar, importar os arquivos, organizá-los em pastas, criar a sequência (com o tamanho e a taxa de quadros do vídeo final), fazer a montagem com os cortes, acrescentar áudio, títulos e transições, ajustar a cor e exportar. Organizar o material desde o início economiza muito tempo. Faça cópias de segurança dos arquivos originais.",
      ],
      pontos: ["Descrever as etapas da edição.", "Criar uma sequência com as configurações certas."],
    },
    {
      titulo: "Interface e ferramentas de corte",
      texto: [
        "A interface tem o painel de projeto (arquivos), o monitor de origem e o de programa, e a linha do tempo, com faixas de vídeo (V1, V2...) e de áudio (A1, A2...). Ferramentas essenciais: seleção, lâmina (corta o clipe no ponto), corte e aparar (ripple) e deslizar. Atalhos agilizam, como a barra de espaço (reproduzir) e as teclas J, K e L.",
      ],
      pontos: ["Cortar e organizar clipes na linha do tempo.", "Usar atalhos básicos."],
    },
    {
      titulo: "Linguagem audiovisual e ritmo",
      texto: [
        "Planos: geral (mostra o ambiente), médio (a pessoa até a cintura), close (o rosto) e detalhe. Alternar planos mantém o interesse. O corte deve ter motivo (uma ação, uma fala, um ritmo). O ritmo se ajusta à música e à emoção do vídeo. Evite transições demais: o corte seco é o mais usado.",
      ],
      pontos: ["Identificar os tipos de plano.", "Justificar um corte."],
      erros: ["Excesso de transições e efeitos.", "Planos longos e sem variação."],
    },
    {
      titulo: "Áudio e trilha sonora",
      texto: [
        "O áudio é metade do vídeo: som ruim estraga a imagem. Cuide do volume (a fala deve ficar clara, com a música mais baixa por baixo), de ruídos e dos fades (entradas e saídas suaves). Use músicas livres de direitos autorais ou licenciadas: usar música comercial sem licença pode ser bloqueado ou gerar problemas.",
      ],
      pontos: ["Equilibrar a fala e a música.", "Escolher músicas com licença adequada."],
    },
    {
      titulo: "Títulos, cor e exportação",
      texto: [
        "Títulos e legendas devem ser legíveis, com bom contraste e tempo suficiente para a leitura. A correção de cor equilibra brilho, contraste e balanço de branco entre os clipes. Na exportação, o formato H.264 (MP4) é o mais compatível; escolha a resolução e o fps conforme o destino (YouTube, redes sociais, TV).",
      ],
      pontos: ["Criar um título legível.", "Exportar em MP4 na resolução adequada."],
    },
  ],
  glossario: [
    { termo: "Sequência", definicao: "Linha do tempo onde o vídeo é montado." },
    { termo: "Clipe", definicao: "Trecho de vídeo ou áudio." },
    { termo: "Plano", definicao: "Enquadramento de uma cena (geral, médio, close)." },
    { termo: "Fade", definicao: "Entrada ou saída gradual de imagem ou som." },
    { termo: "Renderizar", definicao: "Processar o vídeo para gerar o arquivo final." },
    { termo: "fps", definicao: "Quadros por segundo." },
  ],
  dicas: [
    "Grave material com o celular na turma: editar o próprio vídeo motiva.",
    "Edite primeiro um vídeo curto de 30 segundos: terminar um projeto vale mais do que começar vários.",
    "Peça para assistir ao vídeo sem som e depois só ouvindo: cada versão revela falhas diferentes.",
  ],
};

export default conteudo;
