import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../figmaComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Figma — Grau 1: Conhecendo o Figma e o Processo de Design",
  introducao:
    "Antes de desenhar a primeira tela, é preciso saber o que se está construindo e onde ficam as coisas. Neste grau você entende a diferença entre UX e UI, percorre o processo de design de uma interface, abre o Figma, reconhece cada parte da tela e decora os atalhos que mais vai usar. As figuras são ilustrações do Figma: o layout da sua versão pode estar um pouco diferente, mas as partes são as mesmas.",
  itens: [
    comFigura(
      escolha({
        id: "ux-e-ui",
        titulo: "UX e UI: duas metades do mesmo trabalho",
        blocos: [
          { tipo: "texto", texto: "Interface é tudo o que a pessoa vê e toca num site ou aplicativo: botões, textos, menus, formulários. Projetar interfaces envolve duas ideias que andam juntas:" },
          { tipo: "lista", itens: ["UX (User Experience, experiência do usuário): o quanto a pessoa consegue cumprir o que veio fazer, com facilidade e sem frustração.", "UI (User Interface, interface do usuário): a aparência e a interação — cores, tipografia, tamanhos, ícones, animações."] },
          { tipo: "texto", texto: "O processo na figura tem cinco etapas e volta ao começo: o que se descobre no teste alimenta a próxima rodada. O Figma atua principalmente nas etapas 2, 3 e 4 (esboçar, desenhar e prototipar)." },
          { tipo: "nota", variante: "dica", texto: "Um botão lindo (UI boa) escondido num lugar onde ninguém o encontra é UX ruim. Um botão no lugar certo mas ilegível é UI ruim. Bom design precisa das duas." },
        ],
        instrucao: "Um aplicativo de banco tem visual bonito, mas o cliente não encontra onde fazer um Pix. Qual metade do design falhou?",
        opcoes: ["A UX: a pessoa não consegue cumprir seu objetivo com facilidade.", "A UI: o aplicativo precisava de mais cores.", "Nenhuma: se está bonito, o design está bom.", "O Figma, que não deveria ter sido usado."],
        correta: 0,
        explicacao: "UX é sobre o objetivo da pessoa ser cumprido sem esforço; a aparência bonita (UI) não compensa uma jornada confusa.",
      }),
      figura("ux-ui-processo", "Cinco caixas em sequência: Entender, Esboçar, Desenhar, Prototipar e Testar, com uma seta de volta ao início.", "O processo de design é um ciclo: o teste gera novas descobertas."),
    ),
    comFigura(
      associar({
        id: "partes-da-interface",
        titulo: "Reconhecendo a tela do Figma",
        blocos: [
          { tipo: "texto", texto: "Abra o Figma e crie um arquivo (próximo item). A tela tem cinco regiões que você vai usar o tempo todo. Compare com a figura, onde cada uma tem um número azul:" },
          { tipo: "lista", numerada: true, itens: ["Barra de ferramentas (no alto): mover, quadro, formas, caneta, texto, mão.", "Camadas (Layers, à esquerda): a lista de tudo o que existe no arquivo, em ordem de empilhamento.", "Área de trabalho (canvas, no centro): onde o desenho acontece; é infinita.", "Propriedades (à direita): abas Design e Protótipo, com tamanho, cor, texto e efeitos do que está selecionado.", "Compartilhar (canto superior direito): convida pessoas e gera o link."] },
        ],
        instrucao: "Ligue o número da figura à parte da tela do Figma.",
        opcoes: ["Barra de ferramentas", "Painel de camadas", "Área de trabalho (canvas)", "Painel de propriedades (Design)", "Botão Compartilhar"],
        linhas: [
          { id: "n1", rotulo: "Número 1 (no alto, ao centro)", correta: 0 },
          { id: "n2", rotulo: "Número 2 (lista à esquerda)", correta: 1 },
          { id: "n3", rotulo: "Número 3 (espaço cinza, onde se desenha)", correta: 2 },
          { id: "n4", rotulo: "Número 4 (à direita: posição, tamanho, cor)", correta: 3 },
          { id: "n5", rotulo: "Número 5 (botão azul)", correta: 4 },
        ],
        explicacao: "Quando você seleciona um objeto, o painel de propriedades mostra exatamente o que dá para mudar nele.",
      }),
      figura("interface-panorama", "Tela do Figma com cinco números azuis: barra de ferramentas, camadas, canvas, propriedades e botão Compartilhar.", "As cinco regiões da tela do Figma."),
    ),
    {
      id: "criar-o-arquivo",
      titulo: "Criando o seu primeiro arquivo",
      passos: [
        "Acesse figma.com e entre com a sua conta (o plano gratuito basta para todo o curso).",
        "Na página inicial (Início ou Drafts), clique em Novo arquivo de design (Design file).",
        "Clique no nome \"Sem título\" no alto da tela, apague e escreva \"Meu primeiro app — Seu Nome\".",
        "Tecle Shift + 1 para ver tudo o que está no arquivo (agora, nada) e Espaço + arrastar para mover a área de trabalho.",
        "Passe o mouse sobre o painel de camadas e dê um duplo clique em \"Página 1\"; renomeie para \"Telas\".",
      ],
      aviso: "O Figma salva sozinho, a cada alteração. Não existe botão Salvar: o que você vê é o que está guardado na nuvem.",
      objetivo: "Ter um arquivo seu, com nome e página organizados, pronto para receber os próximos exercícios.",
    },
    comFigura(
      associar({
        id: "atalhos-de-ferramentas",
        titulo: "Os atalhos de uma letra",
        blocos: [
          { tipo: "texto", texto: "Quem desenha rápido quase não toca na barra de ferramentas: troca de ferramenta com uma tecla. Decore as seis da figura — são as mais usadas." },
          { tipo: "nota", variante: "dica", texto: "Duas combinações de ouro: Ctrl + D duplica o que está selecionado e Ctrl + Alt + K transforma em componente (você vai usar no Grau 4)." },
        ],
        instrucao: "Ligue cada tecla à ferramenta.",
        opcoes: ["Mover", "Quadro (frame)", "Retângulo", "Texto", "Mão (arrastar a tela)"],
        linhas: [
          { id: "v", rotulo: "V", correta: 0 },
          { id: "f", rotulo: "F", correta: 1 },
          { id: "r", rotulo: "R", correta: 2 },
          { id: "t", rotulo: "T", correta: 3 },
          { id: "h", rotulo: "H", correta: 4 },
        ],
        explicacao: "Repare: V de move, F de frame, R de rectangle, T de text, H de hand — as iniciais dos nomes em inglês.",
      }),
      figura("atalhos-teclado", "Seis cartões mostrando as teclas V, F, R, T, P e H com o ícone da ferramenta correspondente, e uma caixa com outros atalhos.", "Seis ferramentas, seis teclas."),
    ),
    comFigura(
      {
        id: "primeiro-wireframe",
        titulo: "Exercício: seu primeiro wireframe",
        cenario:
          "Wireframe é o esboço da estrutura de uma tela, sem cor nem imagem: só caixas e textos que dizem onde cada coisa fica. É barato de mudar — e é nele que se descobre se a tela faz sentido.",
        passos: [
          "Tecle F e, na lista à direita, escolha iPhone 14 (390 × 844). Arraste no canvas para criar o quadro.",
          "Tecle R e desenhe um retângulo no alto do quadro, de ponta a ponta, com uns 60 de altura: é o cabeçalho.",
          "Desenhe dois retângulos grandes para os cartões da lista e um retângulo menor, embaixo, para o botão.",
          "Tecle T, clique dentro de cada retângulo e escreva o que ele é: \"Cabeçalho\", \"Cartão 1\", \"Cartão 2\", \"Botão\".",
          "Selecione todos os retângulos e, no painel Design, deixe o preenchimento em cinza claro (D1D5DB). Sem cor de marca ainda: wireframe é estrutura.",
          "Nomeie o quadro \"Wireframe — Lista\" e apresente-o a um colega: ele entende o que é a tela sem você explicar?",
        ],
        desafio: "Duplique o quadro (Ctrl + D) e crie uma segunda versão com o botão no alto e um cartão a menos. Pergunte a um colega qual é mais clara.",
        objetivo: "Perceber que estrutura vem antes de beleza: um wireframe bom já responde onde cada coisa fica.",
      },
      figura("wireframe-vs-design", "À esquerda, um wireframe em cinza com caixas e um X no cabeçalho; à direita, a mesma tela pronta, com cores roxas e textos.", "Mesma estrutura, dois níveis de acabamento."),
    ),
    resposta({
      id: "fechamento",
      titulo: "Para fechar: com as suas palavras",
      instrucao: "Explique, em poucas frases, a diferença entre UX e UI e cite pelo menos três das cinco etapas do processo de design.",
      rotulo: "Sua explicação",
      placeholder: "UX é... UI é... As etapas que o Figma ajuda são...",
      chave: /\bUX\b[\s\S]*\bUI\b|\bUI\b[\s\S]*\bUX\b/i,
      minPalavras: 25,
      minCaracteres: 140,
    }),
  ],
};

export default atividade;
