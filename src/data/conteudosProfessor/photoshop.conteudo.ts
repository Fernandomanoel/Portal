import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O Photoshop é o programa de edição de imagens por pixels. O curso parte da interface e dos conceitos de imagem digital, passa por seleção, camadas, ajustes de cor, texto, máscaras e retoque, e chega a efeitos e composições avançadas, incluindo Objetos Inteligentes e Filtros Inteligentes.",
  topicos: [
    {
      titulo: "Conceitos de imagem digital",
      texto: [
        "Imagens de pixels (bitmap) são formadas por quadradinhos de cor; ao ampliar demais, perdem qualidade. Imagens vetoriais usam formas matemáticas e ampliam sem perda (outro tipo de programa, como o Illustrator ou o CorelDRAW). Resolução é a quantidade de pixels: para tela, 72 ppi bastam; para impressão, cerca de 300 ppi. Modos de cor: RGB (luz, para telas) e CMYK (tinta, para impressão). Formatos: JPG (fotos, com perda), PNG (transparência), GIF, TIFF e PSD (arquivo do Photoshop, com camadas).",
      ],
      pontos: ["Diferenciar bitmap e vetor.", "Escolher resolução e modo de cor para tela e para impressão.", "Saber quando salvar em PSD, PNG e JPG."],
      erros: ["Aumentar uma imagem pequena e esperar mais qualidade.", "Salvar só em JPG e perder as camadas."],
      atividades: ["photoshop-grau1-conhecendo-a-ferramenta"],
    },
    {
      titulo: "Interface, ferramentas e seleções",
      texto: [
        "A área de trabalho tem a barra de ferramentas, o painel de propriedades, os painéis (camadas, histórico, cores) e a área do documento. Seleções isolam partes da imagem: seleção retangular e elíptica, laço, varinha mágica, seleção rápida e «selecionar assunto». O refinamento de borda suaviza o recorte. O histórico e o atalho Ctrl+Z permitem desfazer.",
      ],
      pontos: ["Selecionar um objeto e recortá-lo.", "Usar o desfazer e o histórico."],
      atividades: ["photoshop-grau2-selecoes-e-camadas"],
    },
    {
      titulo: "Camadas, máscaras e edição não destrutiva",
      texto: [
        "Camadas são como folhas transparentes empilhadas: cada elemento vive em uma camada, que pode ser movida, escondida e alterada sem afetar as outras. A máscara de camada esconde partes sem apagar (preto esconde, branco mostra), o que é edição não destrutiva: dá para voltar atrás. Camadas de ajuste (brilho, curvas, matiz) alteram a cor sem mexer nos pixels originais. Modos de mesclagem e opacidade combinam as camadas.",
      ],
      pontos: ["Organizar elementos em camadas.", "Esconder com uma máscara em vez de apagar.", "Usar uma camada de ajuste."],
      erros: ["Apagar pixels e não poder voltar."],
      atividades: ["photoshop-grau2-selecoes-e-camadas"],
    },
    {
      titulo: "Cor, retoque e texto",
      texto: [
        "Ajustes de brilho, contraste, saturação e níveis corrigem a foto. Ferramentas de retoque (pincel de recuperação, carimbo, remendo) tiram imperfeições. O texto é criado com a ferramenta de texto, em camada própria: escolha de fonte, tamanho e cor com atenção à legibilidade e ao contraste.",
      ],
      pontos: ["Corrigir uma foto escura.", "Aplicar texto legível em uma imagem."],
      atividades: ["photoshop-grau3-cor-e-retoque", "photoshop-grau4-texto-formas-e-composicao"],
    },
    {
      titulo: "Efeitos e filtros criativos",
      texto: [
        "Objetos Inteligentes (Smart Objects) guardam a imagem original dentro de uma camada: permitem redimensionar e aplicar filtros sem perder qualidade e podem ser editados depois. Filtros Inteligentes são filtros aplicados a um Objeto Inteligente, com máscara e configurações ajustáveis a qualquer momento. A dupla exposição mistura duas imagens por modo de mesclagem e máscara.",
      ],
      pontos: ["Converter uma camada em Objeto Inteligente.", "Aplicar um filtro inteligente editável."],
      atividades: ["photoshop-grau5-efeitos-e-filtros", "photoshop-grau6-composicao-avancada", "photoshop-grau7-projeto-final", "photoshop-grau8-auras-e-invocacao"],
    },
  ],
  glossario: [
    { termo: "Pixel", definicao: "Menor ponto de cor de uma imagem digital." },
    { termo: "Camada", definicao: "Folha transparente onde se coloca um elemento da imagem." },
    { termo: "Máscara de camada", definicao: "Recurso que esconde ou mostra partes da camada sem apagar." },
    { termo: "RGB / CMYK", definicao: "Modos de cor para telas / para impressão." },
    { termo: "PSD", definicao: "Formato nativo do Photoshop, que preserva as camadas." },
    { termo: "Objeto Inteligente", definicao: "Camada que preserva a imagem original e permite edição não destrutiva." },
  ],
  dicas: [
    "Trabalhe com fotos próprias ou de bancos livres, e fale de direitos de imagem.",
    "Reforce a regra de ouro: nunca trabalhar na única cópia do original.",
    "Peça que o aluno nomeie as camadas: projetos organizados são mais fáceis de editar.",
  ],
};

export default conteudo;
