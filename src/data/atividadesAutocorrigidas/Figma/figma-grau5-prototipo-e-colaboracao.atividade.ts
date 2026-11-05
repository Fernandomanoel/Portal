import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../figmaComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Figma — Grau 5: Protótipo, Teste e Colaboração",
  introducao:
    "Um desenho bonito não prova que a ideia funciona: só o uso prova. O protótipo liga as telas por interações e simula o aplicativo antes de uma linha de código existir. Neste grau você liga três telas, escolhe animações, apresenta o fluxo como se fosse o app de verdade e aprende a compartilhar e receber comentários — fechando o ciclo do processo de design.",
  itens: [
    comFigura(
      {
        id: "ligar-telas",
        titulo: "Ligando as telas",
        cenario: "No Figma, protótipo e desenho convivem no mesmo arquivo. Você alterna entre os dois pelas abas Design e Protótipo, no painel da direita. Antes de começar, prepare três quadros de celular: \"Login\", \"Início\" e \"Curso\", cada um com um botão de ação.",
        passos: [
          "Clique na aba Protótipo (Prototype), no painel da direita. As alças das conexões aparecem nos objetos selecionados.",
          "Selecione o botão \"Entrar\" da tela Login: uma bolinha azul aparece na borda direita do botão.",
          "Arraste a bolinha até o quadro Início. Uma seta azul liga o botão à tela.",
          "Faça o mesmo com o botão \"Ver curso\" (Início → Curso) e com o botão \"Voltar\" (Curso → Início).",
          "Confira, no painel, o resumo da interação criada e o fluxo (Flow) que aparece no alto do quadro Login: é o ponto de partida.",
        ],
        aviso: "A bolinha só aparece no objeto selecionado. Se ela não surgir, confirme que está na aba Protótipo e que o botão — e não o quadro inteiro — está selecionado.",
        objetivo: "Transformar três desenhos estáticos num fluxo navegável.",
      },
      figura("prototipo-ligacao", "Três telas de celular lado a lado (Login, Início e Curso), ligadas por setas azuis que partem dos botões, com a legenda ao clicar.", "Cada seta azul é uma interação: ao clicar no botão, vai para a tela."),
    ),
    comFigura(
      associar({
        id: "interacao",
        titulo: "Gatilho, ação e animação",
        blocos: [
          { tipo: "texto", texto: "Cada seta tem três partes, que você escolhe no painel Protótipo:" },
          { tipo: "lista", itens: ["Gatilho (trigger): o que dispara — Ao clicar, Ao passar o mouse (hover), Ao arrastar...", "Ação (action): o que acontece — Navegar para, Abrir sobreposição (modal), Voltar...", "Animação: como acontece — Instantâneo, Dissolver, Smart animate (move e transforma objetos iguais entre as telas), com duração e curva (300 ms é um bom ponto de partida)."] },
          { tipo: "nota", variante: "dica", texto: "Smart animate só anima objetos com o mesmo nome nas duas telas. Mais um motivo para nomear as camadas." },
        ],
        instrucao: "Ligue cada desejo à configuração correta.",
        opcoes: ["Gatilho: Ao clicar", "Ação: Voltar", "Ação: Navegar para", "Animação: Smart animate"],
        linhas: [
          { id: "clicar", rotulo: "O usuário toca no botão e a próxima tela aparece", correta: 0 },
          { id: "voltar", rotulo: "O botão da seta leva para a tela de onde o usuário veio", correta: 1 },
          { id: "destino", rotulo: "O botão leva a uma tela específica, escolhida no desenho", correta: 2 },
          { id: "mover", rotulo: "O botão desliza suavemente para o novo lugar entre as duas telas", correta: 3 },
        ],
        explicacao: "Todo protótipo é uma combinação de gatilho, ação e animação — três escolhas no mesmo painel.",
      }),
      figura("prototipo-interacao", "Aba Protótipo do Figma: duas telas ligadas por uma seta azul; no painel, gatilho Ao clicar, ação Navegar para, destino Início, animação Smart animate, 300 milissegundos.", "Painel de interação: gatilho, ação, destino e animação."),
    ),
    comFigura(
      {
        id: "apresentar",
        titulo: "Apresentar: usando como um usuário",
        passos: [
          "Clique no botão Apresentar (um triângulo, no canto superior direito) ou tecle Ctrl + Alt + Enter.",
          "Uma nova aba abre com o protótipo dentro de um celular. Clique nos botões como o usuário faria.",
          "Se algo não responder, é um botão sem conexão: volte ao arquivo (Esc) e ligue.",
          "Peça a um colega para usar o protótipo sem explicar nada. Anote onde ele hesitou, clicou no lugar errado ou perguntou \"e agora?\".",
          "Compare as anotações: cada hesitação é um problema de UX que se resolve na tela, antes de programar.",
        ],
        tabelaReferencia: {
          colunas: ["Tecla (na apresentação)", "O que faz"],
          linhas: [["R", "Reinicia o fluxo do começo"], ["Esc", "Volta ao arquivo"], ["Clique fora de um botão", "Mostra os pontos clicáveis (hotspots)"]],
        },
        aviso: "Quem testa nunca é você: já sabe onde clicar. Escolha alguém que nunca viu o desenho.",
        objetivo: "Fechar o ciclo do processo: desenhar → prototipar → testar → melhorar.",
      },
      figura("modo-apresentacao", "Fundo escuro com um celular exibindo a tela Início do protótipo; ao lado, o botão Apresentar e as dicas R reinicia e Esc volta ao arquivo.", "O modo Apresentar mostra o protótipo como o usuário o verá."),
    ),
    comFigura(
      escolha({
        id: "compartilhar",
        titulo: "Compartilhar e receber comentários",
        blocos: [
          { tipo: "texto", texto: "Design raramente é trabalho solitário. No botão Compartilhar você escolhe quem acessa e como:" },
          { tipo: "lista", itens: ["Pode ver (view): a pessoa abre, navega e comenta, mas não altera o arquivo. Ideal para cliente e gestor.", "Pode editar (edit): a pessoa muda o desenho. Reserve para a equipe.", "Link do protótipo: no botão Apresentar, ao lado do triângulo, copie o link só da apresentação."] },
          { tipo: "texto", texto: "Para comentar, tecle C e clique no ponto da tela: o comentário fica preso ali, com nome e hora, e quem recebe responde na própria conversa. Ao resolver, marque como concluído." },
        ],
        instrucao: "O cliente precisa olhar o protótipo e deixar sugestões, mas você não quer que ele altere o desenho. Qual permissão dar?",
        opcoes: ["Pode ver (e comentar)", "Pode editar", "Nenhuma: enviar prints por e-mail", "Pode editar, mas pedir que não mexa"],
        correta: 0,
        explicacao: "\"Pode ver\" já permite comentar, e o arquivo fica protegido de alterações acidentais.",
      }),
      figura("comentarios-e-compartilhar", "Figma com dois comentários presos à tela e o diálogo Compartilhar aberto, com o link, a permissão Ver (somente leitura) destacada e a opção Editar.", "Compartilhar com permissão de leitura e comentar direto na tela."),
    ),
    resposta({
      id: "projeto-final",
      titulo: "Projeto final: o fluxo completo",
      cenario: "Reúna tudo: monte um fluxo de três telas para um aplicativo à sua escolha (cursos, lanchonete, agenda). Use quadros de celular, Auto Layout, ao menos um componente com variantes, estilos de cor e texto, ligações de protótipo e peça a um colega que teste.",
      blocos: [
        { tipo: "lista", itens: ["Estrutura: 3 telas em quadros de 390 × 844, com camadas nomeadas.", "Layout: Auto Layout nas listas e nos botões, grade de 4 colunas, espaçamentos de 8 ou 16.", "Sistema: estilos de cor e de texto e um componente Botão com ao menos duas variantes.", "Protótipo: três telas ligadas, com animação Smart animate.", "Teste: um colega usa o protótipo sem explicações; você anota o que o confundiu."] },
      ],
      instrucao: "Relate o seu projeto: qual aplicativo escolheu, o que o colega que testou achou difícil e o que você mudou depois do teste.",
      rotulo: "Relato do projeto",
      placeholder: "Meu aplicativo é... O colega teve dificuldade em... Depois do teste eu mudei...",
      chave: /(teste|testou|testei)[\s\S]*(mud|ajust|corrig|melhor)|(mud|ajust|corrig|melhor)[\s\S]*(teste|testou|testei)/i,
      minPalavras: 35,
      minCaracteres: 200,
    }),
  ],
};

export default atividade;
