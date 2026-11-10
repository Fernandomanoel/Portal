import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../inteligenciaEmocionalComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Inteligência Emocional — Conhecendo a Si Mesmo",
  introducao:
    "Inteligência emocional começa por dentro (o lado intrapessoal): saber como você funciona, o que recarrega e o que esgota a sua energia, o que dispara as suas reações e como você costuma agir. Aqui você conhece três grandes jeitos de lidar com a energia social e monta o seu diário emocional. Lembre: extroversão e introversão são tendências, e não rótulos fixos nem melhor ou pior.",
  itens: [
    comFigura(
      associar({
        id: "perfis-de-energia",
        titulo: "Três jeitos de lidar com a energia social",
        blocos: [
          { tipo: "texto", texto: "Há pessoas que se recarregam com gente e movimento (extrovertidas), pessoas que se recarregam com silêncio e tempo sozinhas (introvertidas) e pessoas que ficam no meio do caminho e variam conforme o dia e o lugar (ambivertidas). Quase todo mundo tem um pouco dos três." },
          { tipo: "nota", variante: "aviso", texto: "Isso não é diagnóstico nem explica tudo sobre alguém. Serve para entender a si mesmo e respeitar a diferença nos outros." },
        ],
        instrucao: "Ligue cada característica ao perfil que mais combina.",
        opcoes: ["Extrovertido", "Ambivertido", "Introvertido"],
        linhas: [
          { id: "pensa-falando", rotulo: "Pensa melhor falando em voz alta e se anima em grupo", correta: 0 },
          { id: "depende", rotulo: "Conforme o dia, gosta de festa ou de ficar em casa", correta: 1 },
          { id: "pensa-antes", rotulo: "Prefere pensar antes de responder e se cansa depois de muita gente", correta: 2 },
          { id: "recarrega-so", rotulo: "Depois de um dia cheio de reuniões, precisa de um tempo só para recarregar", correta: 2 },
        ],
        explicacao: "A energia social varia de pessoa para pessoa; entender a sua ajuda a escolher quando se expor e quando se recolher.",
      }),
      figura("perfis-de-energia", "Três personagens com bateria de energia social diferente — extrovertido, ambivertido e introvertido — e os traços de cada um.", "Três jeitos de lidar com a energia social."),
    ),
    resposta({
      id: "meu-perfil",
      titulo: "Qual é o seu jeito",
      instrucao: "Em qual dos três perfis você mais se reconhece? Dê dois exemplos reais do seu dia a dia que mostrem isso e diga o que ajuda você a recarregar a energia.",
      rotulo: "Seu perfil",
      placeholder: "Eu me reconheço mais como... Por exemplo, quando... Para recarregar, eu...",
      minPalavras: 20,
      minCaracteres: 100,
    }),
    comFigura(
      escolha({
        id: "gatilhos",
        titulo: "Descobrindo os seus gatilhos",
        blocos: [
          { tipo: "texto", texto: "Gatilho é a situação que dispara uma reação forte em você: ser interrompido, ser comparado, ser ignorado, ouvir um \"você sempre...\". O diário emocional ajuda a achar o padrão: a cada situação intensa, anote o que aconteceu, o que sentiu (de 0 a 10), o que pensou, o que fez e o que faria diferente." },
          { tipo: "nota", variante: "dica", texto: "Duas semanas de registro bastam para ver os padrões. O objetivo não é se julgar, mas se conhecer." },
        ],
        instrucao: "Depois de duas semanas de diário, você nota que as suas maiores raivas (nota 8 ou mais) acontecem quando é interrompido em reunião. O que isso mostra?",
        opcoes: ["Que ser interrompido é um gatilho seu: dá para preparar uma reação melhor para essa situação.", "Que você é uma pessoa difícil e não tem jeito.", "Que as reuniões é que são o problema.", "Que o diário não funciona."],
        correta: 0,
        explicacao: "Reconhecer o gatilho é o primeiro passo para escolher a reação, em vez de ser levado por ela.",
      }),
      figura("diario-emocional", "Tabela de diário emocional com colunas de situação, emoção, intensidade de 0 a 10, o que pensei, o que fiz e o que faria diferente, com três exemplos.", "Um diário emocional com três registros de exemplo."),
    ),
    resposta({
      id: "meu-diario",
      titulo: "Seu primeiro registro no diário",
      instrucao: "Escolha uma situação recente em que você reagiu de um jeito de que não gostou. Preencha, em texto corrido: a situação, a emoção e a intensidade (de 0 a 10), o que você pensou, o que fez e o que faria diferente.",
      rotulo: "Seu registro",
      placeholder: "Situação:... Emoção (intensidade):... O que pensei:... O que fiz:... Faria diferente:...",
      minPalavras: 25,
      minCaracteres: 130,
    }),
    escolha({
      id: "valores",
      titulo: "Emoção forte, valor em jogo",
      instrucao: "Uma pessoa fica muito brava quando vê um colega levando crédito pelo trabalho dos outros. Que valor dela provavelmente está sendo ferido?",
      opcoes: ["Justiça e reconhecimento", "Pontualidade", "Economia de dinheiro", "Silêncio"],
      correta: 0,
      explicacao: "Por trás de uma emoção forte quase sempre existe um valor importante para a pessoa. Descobrir qual ajuda a falar do que importa, em vez de só gritar.",
    }),
  ],
};

export default atividade;
