import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O Figma é uma ferramenta de design de interfaces (telas de sites e aplicativos) e de protótipos, feita para o navegador e para o trabalho em equipe. O curso apresenta o processo de design de interface, a organização com quadros e componentes, layout, tipografia, cores e prototipação.",
  topicos: [
    {
      titulo: "Design de interface e experiência do usuário",
      texto: [
        "UX (experiência do usuário) é o quanto a pessoa consegue cumprir o objetivo com facilidade; UI (interface do usuário) é o visual e a interação das telas. O processo comum: entender o usuário, definir o problema, esboçar (wireframe, uma versão simples em preto e branco), desenhar a tela em alta fidelidade, prototipar e testar com pessoas reais.",
      ],
      pontos: ["Diferenciar UX e UI.", "Descrever as etapas do processo."],
      atividades: ["figma-grau1-conhecendo-o-figma"],
    },
    {
      titulo: "Quadros, formas e organização",
      texto: [
        "No Figma, o design vive em quadros (frames), que representam telas de tamanhos conhecidos (celular, tablet, computador). Dentro deles colocam-se formas, textos e imagens. Camadas nomeadas, grupos e páginas mantêm o arquivo organizado. Atalhos: R (retângulo), T (texto), F (quadro), Ctrl+D (duplicar).",
      ],
      pontos: ["Criar quadros para diferentes dispositivos.", "Nomear e organizar camadas."],
      atividades: ["figma-grau2-quadros-formas-e-camadas"],
    },
    {
      titulo: "Layout: auto layout, grades e alinhamento",
      texto: [
        "O Auto Layout organiza os elementos e ajusta o tamanho automaticamente quando o conteúdo muda (um botão cresce com o texto, uma lista cresce com os itens): é a base de designs responsivos. As grades de layout (colunas) e os espaçamentos consistentes (múltiplos de 4 ou 8 px) dão ordem visual.",
      ],
      pontos: ["Usar Auto Layout em um botão e em uma lista.", "Aplicar espaçamentos consistentes."],
      atividades: ["figma-grau3-auto-layout-e-grades"],
    },
    {
      titulo: "Componentes, estilos e sistema de design",
      texto: [
        "Componentes são elementos reutilizáveis (botões, cartões, campos): mudanças no componente principal se refletem nas cópias (instâncias). Variantes reúnem estados (normal, passando o mouse, desabilitado). Os estilos de cor e de texto padronizam a aparência. Um sistema de design reúne tudo isso para manter a consistência do produto.",
      ],
      pontos: ["Criar um componente e usar instâncias.", "Definir estilos de cor e texto."],
      atividades: ["figma-grau4-componentes-e-estilos"],
    },
    {
      titulo: "Prototipação e colaboração",
      texto: [
        "O protótipo liga telas por interações (clicar, arrastar) e transições, simulando o produto antes de ele ser programado. Pode ser testado no navegador ou no celular. Comentários e o compartilhamento por link permitem a colaboração com a equipe. Em geral o designer entrega o design para o desenvolvedor, que o inspeciona para pegar medidas e cores.",
      ],
      pontos: ["Ligar telas em um protótipo clicável.", "Compartilhar e comentar um design."],
      atividades: ["figma-grau5-prototipo-e-colaboracao"],
    },
  ],
  glossario: [
    { termo: "Frame (quadro)", definicao: "Área que representa uma tela no Figma." },
    { termo: "Wireframe", definicao: "Esboço simples da estrutura de uma tela." },
    { termo: "Auto Layout", definicao: "Recurso que organiza e ajusta o tamanho dos elementos." },
    { termo: "Componente", definicao: "Elemento reutilizável, cujas cópias acompanham o original." },
    { termo: "Protótipo", definicao: "Simulação interativa das telas." },
  ],
  dicas: [
    "Proponha redesenhar uma tela de um aplicativo conhecido, com problemas reais de usabilidade.",
    "Peça que os colegas testem o protótipo e relatem onde se perderam.",
    "A interface do Figma muda: concentre-se nos conceitos de design.",
  ],
};

export default conteudo;
