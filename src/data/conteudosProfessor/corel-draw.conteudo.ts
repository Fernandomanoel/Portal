import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O CorelDRAW é um programa de ilustração vetorial e diagramação, muito usado em comunicação visual: logotipos, cartazes, cartões, rótulos e peças gráficas. O curso explica a diferença entre vetor e bitmap, as ferramentas de desenho e de texto, cores para impressão e a preparação de arquivos.",
  topicos: [
    {
      titulo: "Gráficos vetoriais e bitmap",
      texto: [
        "Um gráfico vetorial é descrito por pontos (nós) e curvas matemáticas: pode ser ampliado sem perder qualidade e tem arquivos leves, ideal para logotipos e impressão em grande formato. O bitmap é feito de pixels e perde qualidade ao ampliar. O CorelDRAW trabalha principalmente com vetores, mas aceita imagens bitmap.",
      ],
      pontos: ["Explicar por que logotipos devem ser vetoriais.", "Distinguir vetor de bitmap."],
    },
    {
      titulo: "Interface, formas e edição de nós",
      texto: [
        "Começa-se com o tamanho da página e a unidade. As ferramentas de forma desenham retângulos, elipses, polígonos e linhas. Os objetos podem ser agrupados, alinhados, distribuídos e organizados em ordem de empilhamento. Com a ferramenta de forma, editam-se os nós e as curvas (de Bézier) para dar o contorno desejado. Operações com formas (soldar, interseção, aparar) criam novas formas.",
      ],
      pontos: ["Desenhar e alinhar formas.", "Editar nós de uma curva.", "Usar soldar e aparar."],
    },
    {
      titulo: "Cores, preenchimentos e contornos",
      texto: [
        "Cada objeto tem preenchimento (cor, degradê, padrão) e contorno (cor e espessura). Para impressão, usa-se o modo CMYK; para telas, RGB. Cores sólidas especiais (como Pantone) reproduzem exatamente uma cor da marca. Cores muito saturadas no RGB podem mudar ao serem impressas em CMYK: confirme em uma prova.",
      ],
      pontos: ["Aplicar preenchimento e contorno.", "Escolher RGB ou CMYK conforme o destino."],
    },
    {
      titulo: "Texto, tipografia e curvas",
      texto: [
        "Há texto artístico (títulos curtos) e texto de parágrafo (blocos). Fontes e espaçamentos influenciam a legibilidade. Ao enviar o arquivo a uma gráfica sem as fontes instaladas, o texto muda: converter em curvas transforma as letras em desenhos, para que apareçam igual em qualquer computador (guarde também uma cópia editável).",
      ],
      pontos: ["Usar texto artístico e de parágrafo.", "Converter o texto em curvas antes de enviar para a gráfica."],
      erros: ["Enviar o arquivo sem converter as fontes e o texto sair diferente."],
    },
    {
      titulo: "Preparação e exportação de arquivos",
      texto: [
        "Para impressão: dimensões corretas, sangria (margem extra de 3 mm para o corte), marcas de corte, cores em CMYK e PDF com as especificações pedidas pela gráfica. Para a web: exporta-se em PNG, JPG ou SVG. O formato nativo é o CDR. Salve sempre a versão editável.",
      ],
      pontos: ["Explicar sangria e marcas de corte.", "Escolher o formato de exportação."],
    },
  ],
  glossario: [
    { termo: "Vetor", definicao: "Gráfico definido por curvas matemáticas, sem perda de qualidade ao ampliar." },
    { termo: "Nó", definicao: "Ponto que define a forma de uma curva." },
    { termo: "CMYK", definicao: "Modo de cor da impressão (ciano, magenta, amarelo e preto)." },
    { termo: "Sangria", definicao: "Margem extra além do corte, que evita bordas brancas." },
    { termo: "Curvas", definicao: "Conversão do texto em desenho, para não depender da fonte." },
  ],
  dicas: [
    "Proponha logotipos simples: aprendem as ferramentas e os conceitos de design juntos.",
    "Mostre um arquivo mal preparado e um bem preparado para a gráfica.",
    "Reforce a organização: nomes de camadas e grupos facilitam alterações.",
  ],
};

export default conteudo;
