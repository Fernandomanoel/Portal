import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../figmaComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Figma — Grau 6: Animações, Botões e Ícones",
  introducao:
    "Pequenos detalhes fazem um aplicativo parecer vivo: o ícone que combina com os outros, o botão que reage ao mouse, a chave que desliza ao toque. Neste grau você desenha ícones do zero em um quadro padronizado, monta botões com estados, cria micro-animações com Smart animate e exporta tudo para o desenvolvedor. Pré-requisito: Graus 3 e 4 (Auto Layout e componentes) e o Grau 5 (protótipo).",
  itens: [
    comFigura(
      {
        id: "desenhar-icone",
        titulo: "Desenhando um ícone no quadro de 24 × 24",
        cenario: "Um conjunto de ícones parece profissional quando todos seguem as mesmas regras: mesmo tamanho de quadro, mesma margem, mesma espessura de traço, mesmas pontas. O padrão mais usado no celular é o quadro de 24 × 24 px com traço de 2 px.",
        passos: [
          "Tecle F e crie um quadro de 24 × 24. Nomeie-o \"icon/coracao\" (o nome com barra vai organizar o conjunto em pastas).",
          "Ligue a grade: selecione o quadro, em Grades de layout clique em + e escolha Grade com tamanho 1.",
          "Desenhe uma guia de margem: um retângulo 20 × 20 no centro, sem preenchimento, traço vermelho. Ela marca até onde o desenho pode ir.",
          "Tecle P (caneta) e clique nos pontos do contorno; para curvas, clique e arraste. Feche o desenho no ponto inicial.",
          "Apague o preenchimento da forma e aplique um traço roxo de 2 px; em Traço (Stroke) escolha pontas e cantos arredondados.",
          "Apague a guia vermelha. Dê Ctrl + Shift + O (Contornar traço) só se o desenvolvedor pedir o ícone sem traço; caso contrário, mantenha o traço editável.",
        ],
        aviso: "Se o traço sair \"torto\", confira se os pontos estão em posições inteiras (12, não 11,7). Ícones nítidos têm pontos alinhados à grade.",
        desafio: "Desenhe mais dois ícones do mesmo conjunto (casa e lupa) usando exatamente o mesmo traço. Coloque os três lado a lado: parecem uma família?",
        objetivo: "Produzir um ícone com padrão de mercado: quadro, margem e traço definidos e repetíveis.",
      },
      figura("icone-grade-24", "Um coração roxo desenhado sobre quadriculado de 24 por 24, com margem vermelha tracejada; ao lado, o mesmo ícone em 24, 32 e 48 pixels e uma lista de boas práticas.", "O mesmo ícone, em tamanhos reais, e as regras do conjunto."),
    ),
    comFigura(
      associar({
        id: "operacoes-booleanas",
        titulo: "Formas simples, ícones complexos",
        blocos: [
          { tipo: "texto", texto: "Nem todo ícone é feito com a caneta. Muitos nascem da combinação de círculos, quadrados e triângulos com as operações booleanas, no menu da barra superior (selecione duas ou mais formas):" },
          { tipo: "lista", itens: ["União: junta as formas numa só silhueta.", "Subtração: a forma de cima recorta um buraco na de baixo.", "Interseção: fica apenas a parte que as duas têm em comum.", "Exclusão: fica tudo, menos a parte comum."] },
          { tipo: "nota", variante: "dica", texto: "Depois de combinar, o resultado continua editável (você pode mover as formas originais). Use Flatten (Ctrl + E) para transformar em um único vetor quando estiver pronto." },
        ],
        instrucao: "Escolha a operação mais adequada para cada ícone.",
        opcoes: ["União", "Subtração", "Interseção", "Exclusão"],
        linhas: [
          { id: "casa", rotulo: "Casa: um quadrado com um triângulo em cima, formando uma silhueta só", correta: 0 },
          { id: "engrenagem", rotulo: "Engrenagem: um círculo com um furo redondo no meio", correta: 1 },
          { id: "lente", rotulo: "Formato de lente: apenas a região onde dois círculos se cruzam", correta: 2 },
          { id: "anel", rotulo: "Dois círculos sobrepostos em que a região comum fica vazada", correta: 3 },
        ],
        explicacao: "Pense no que sobra: tudo junto (união), buraco (subtração), só o comum (interseção) ou tudo menos o comum (exclusão).",
      }),
      figura("operacoes-booleanas", "Quatro cartões com dois círculos sobrepostos mostrando o resultado de união, subtração, interseção e exclusão.", "O resultado de cada operação booleana."),
    ),
    comFigura(
      {
        id: "botao-com-hover",
        titulo: "Exercício: botão que reage ao mouse",
        cenario: "Botão sem reação parece quebrado. O truque é usar variantes (Grau 4) e uma interação de protótipo (Grau 5): quando o mouse passa, o botão muda para a variante Hover — e o Smart animate cuida da transição.",
        passos: [
          "Use o componente \"Botão\" do Grau 4, com as variantes Estado = Padrão e Estado = Hover (mais escuro e com sombra).",
          "Dentro do componente, selecione a variante Padrão. Na aba Protótipo, clique na bolinha e arraste até a variante Hover.",
          "No painel de interação, defina Gatilho = Ao passar o mouse (While hovering) e Ação = Mudar para (Change to) → Estado = Hover.",
          "Em Animação, escolha Smart animate, curva Ease out e Duração = 200 ms.",
          "Arraste uma instância do botão para uma tela, tecle Ctrl + Alt + Enter e passe o mouse: o botão escurece com suavidade. Ao tirar o mouse, volta.",
          "Acrescente o estado Pressionado: gatilho Ao pressionar (While pressing), um tom ainda mais escuro e escala 98%.",
        ],
        aviso: "No celular não existe hover: o toque é o que vale. Por isso, o estado Pressionado (while pressing) é o que o usuário de celular realmente vê.",
        objetivo: "Criar um botão com três estados que respondem ao usuário: padrão, hover e pressionado.",
      },
      figura("botao-animado-hover", "Aba Protótipo com a variante Padrão do botão ligada por seta à variante Hover; no painel, gatilho Hover, ação Mudar para, destino Estado igual a Hover, Smart animate com 200 milissegundos.", "Interação do botão: ao passar o mouse, muda para a variante Hover."),
    ),
    comFigura(
      escolha({
        id: "smart-animate",
        titulo: "Como o Smart animate decide o que mover",
        blocos: [
          { tipo: "texto", texto: "Na chave liga/desliga da figura há duas variantes (Desligado e Ligado). Ao clicar, a bolinha desliza e a cor do fundo muda sem você desenhar nenhum quadro do meio — isso é o Smart animate: ele compara as duas variantes e anima o que mudou." },
          { tipo: "lista", itens: ["Ele liga os objetos pelo nome da camada: a bolinha precisa se chamar igual nas duas variantes.", "Anima posição, tamanho, cor, opacidade e rotação.", "Se o nome mudar, o objeto some de um lado e aparece do outro, sem deslizar."] },
        ],
        instrucao: "Na sua chave, a bolinha se chama \"Bolinha\" numa variante e \"Círculo\" na outra. O que acontece ao clicar?",
        opcoes: ["A bolinha some e reaparece, sem deslizar.", "A bolinha desliza normalmente.", "O Figma corrige o nome sozinho.", "A animação é cancelada e a tela não muda."],
        correta: 0,
        explicacao: "Smart animate liga objetos pelo nome. Nomes diferentes = objetos diferentes: um desaparece e o outro aparece.",
      }),
      figura("micro-interacao-toggle", "Dois cartões mostrando uma chave desligada (cinza, bolinha à esquerda) e ligada (verde, bolinha à direita), com setas ao clicar e um passo a passo embaixo.", "Chave liga/desliga: duas variantes e uma interação."),
    ),
    comFigura(
      associar({
        id: "curvas-e-tempos",
        titulo: "Curvas e tempos: o jeito certo de se mover",
        blocos: [
          { tipo: "texto", texto: "Movimento real começa e termina devagar. Por isso o Figma oferece curvas (easing) além do movimento reto. Escolha pela intenção:" },
          { tipo: "nota", variante: "dica", texto: "Na dúvida, Ease out com 200 ms funciona para quase tudo que entra na tela." },
        ],
        instrucao: "Ligue cada situação à melhor escolha.",
        opcoes: ["Ease out, 200 ms", "Ease in, 200 ms", "Spring (mola)", "Linear"],
        linhas: [
          { id: "entra", rotulo: "Um menu que entra na tela e precisa parecer ágil", correta: 0 },
          { id: "sai", rotulo: "Um aviso que sai da tela e acelera até sumir", correta: 1 },
          { id: "curtir", rotulo: "O coração de \"curtir\" que dá uma pulada divertida", correta: 2 },
          { id: "barra", rotulo: "Uma barra de carregamento que avança em ritmo constante", correta: 3 },
        ],
        explicacao: "Entrar = ease out; sair = ease in; brincadeira = spring; ritmo constante, como progresso, = linear.",
      }),
      figura("curvas-de-animacao", "Quatro gráficos de curva: Linear, Ease in, Ease out e Spring, com a duração recomendada para botão, menu e troca de tela.", "Quatro curvas de animação e quando usar cada uma."),
    ),
    comFigura(
      {
        id: "exportar-icones",
        titulo: "Exportando para o desenvolvedor",
        cenario: "O ícone só vira parte do aplicativo quando sai do Figma. Para telas e ícones, o formato SVG é o melhor: é vetorial, fica nítido em qualquer tamanho e pesa pouco.",
        passos: [
          "Organize os ícones num quadro \"Ícones\", todos com nome claro (icon/coracao, icon/casa, icon/lupa).",
          "Selecione o ícone no canvas ou no painel de camadas.",
          "No fim do painel Design, na seção Exportar (Export), clique em +.",
          "Escolha o formato SVG para ícones; PNG com 2x ou 3x só para imagens que não são vetoriais.",
          "Clique em Exportar \"icon/coracao\": o arquivo é baixado com o nome da camada.",
          "Selecione os três ícones juntos e exporte de uma vez para obter um arquivo por ícone.",
        ],
        tabelaReferencia: {
          colunas: ["Quando exportar", "Formato"],
          linhas: [["Ícone, logotipo, ilustração simples", "SVG"], ["Foto ou imagem com muitos detalhes", "PNG ou JPG, em 2x e 3x"], ["Documento para leitura", "PDF"]],
        },
        aviso: "Combine com quem programa: o nome do arquivo exportado é o nome da camada. Nomes como \"Vector 14\" viram arquivos impossíveis de achar.",
        objetivo: "Entregar ícones em SVG, com nomes claros, prontos para uso no aplicativo.",
      },
      figura("exportar-icone", "Figma com o ícone de coração selecionado; no painel Design, a seção Exportar com SVG destacado e o botão Exportar icon/coracao.", "Exportar em SVG: a seção Exportar do painel Design."),
    ),
    resposta({
      id: "mini-projeto-animacoes",
      titulo: "Mini-projeto: botão de curtir animado",
      cenario: "Crie um botão de curtir: um ícone de coração (seu, desenhado no quadro 24 × 24) que muda de contorno para preenchido e dá uma pulada ao clicar. Monte duas variantes (Curtido = Não e Sim), ligue com Ao clicar → Mudar para e escolha uma animação com Smart animate.",
      instrucao: "Descreva o que montou: como o coração foi desenhado, quais variantes criou e qual curva e duração escolheu — e por quê.",
      rotulo: "Descrição do projeto",
      placeholder: "Desenhei o coração em um quadro de 24 × 24... As variantes são... Usei a curva ... com ... ms porque...",
      chave: /(variante)[\s\S]*(smart animate|curva|ease|spring|ms)|(smart animate|curva|ease|spring|ms)[\s\S]*(variante)/i,
      minPalavras: 35,
      minCaracteres: 200,
    }),
  ],
};

export default atividade;
