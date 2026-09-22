/**
 * Textos do jogo "Textos Clássicos", portados 1:1 de
 * Portal-Atividades/atividades/paginas/digitacao-textos-classicos.html.
 * Para acrescentar um texto novo é só colar mais um item na lista do nível.
 */

export interface TextoDigitacao {
  titulo: string;
  autor?: string;
  corpo: string;
}

export interface NivelDigitacao {
  nome: string;
  resumo: string;
  cor: string;
  textos: TextoDigitacao[];
}

export const NIVEIS: NivelDigitacao[] = [
  {
    nome: "Nível 1 — Iniciante",
    resumo: "Letras e ritmo, quase sem acento e sem pontuação difícil.",
    cor: "#4b9b63",
    textos: [
      {
        titulo: "A Rotina Simples",
        corpo: "O sol nasce muito cedo e ilumina a casa de madeira perto do lago. As aves cantam alto nas copas das arvores grandes e verdes. O vento suave move as folhas secas que caem no gramado macio. Um gato malhado dorme no telhado e espera o tempo passar de forma lenta. As crianças correm pelo campo aberto com uma bola azul e vermelha. O cheiro de bolo quente sai pela janela da cozinha e chama todos para a mesa. A tarde chega devagar e o ceu muda de cor aos poucos. As nuvens brancas formam desenhos no alto e depois somem. O dia termina calmo e as luzes da rua acendem uma por uma.",
      },
      {
        titulo: "Passeio na Natureza",
        corpo: "Muitas pessoas caminham no parque todos os dias de manha. Elas buscam ar puro e um pouco de paz antes do trabalho. Os cachorros brincam felizes na grama e buscam os gravetos que seus donos jogam longe. Uma menina anda de bicicleta na pista de cimento enquanto o pai corre logo atras. Perto do lago pequeno os patos nadam em grupo e buscam comida na agua limpa. As flores do jardim mostram cores fortes como o amarelo o vermelho e o roxo. O barulho da cidade fica longe e apenas o som do vento nos galhos pode ser ouvido. Tudo parece estar no lugar certo e a vida flui de um jeito muito leve.",
      },
      {
        titulo: "Letras Variadas",
        corpo: "Hoje o jovem rapaz quer fazer um grande passeio de jipe verde pelas montanhas de terra seca. Ele levou na mochila um lanche simples com queijo presunto e um suco de caju bem doce. No meio do caminho ele viu uma zebra fugida do zoologico e ficou muito surpreso com as listras dela. O pneu do carro furou perto de um rio calmo e ele teve que usar o macaco para trocar a roda. Um homem chamado Xavier passou por la e ajudou com a chave de fenda. Eles riram muito da sorte daquele dia e comeram o lanche juntos sob uma arvore velha. O sol desceu no horizonte e o ceu noturno trouxe as estrelas brilhantes para guiar a volta.",
      },
    ],
  },
  {
    nome: "Nível 2 — Vírgulas e Acentuação",
    resumo: "Shift, acentos, crase e pontuação variada.",
    cor: "#2f7fb8",
    textos: [
      {
        titulo: "O Café da Manhã e as Opções",
        corpo: 'João, que é irmão de José e primo de Antônio, decidiu que não iria, sob hipótese alguma, tomar o café da manhã às pressas hoje. Ele foi à padaria, comprou pães franceses, três maçãs bem maduras, uma porção de mamão papaia e um pouco de chá de camomila. Ao chegar à sua residência, percebeu que havia esquecido o açúcar, além da manteiga, que estava na promoção. "Não é possível!", pensou ele, já um pouco impaciente com a situação. Mesmo assim, preparou a refeição, cortou o pão, passou a geleia de morango e aproveitou a manhã ensolarada. A xícara de porcelana, herança de sua bisavó, refletia a luz térmica que entrava pela janela do cômodo.',
      },
      {
        titulo: "Reunião de Negócios",
        corpo: 'A secretária informou, no último memorando distribuído à equipe, que a reunião de cúpula acontecerá no próximo sábado, às três horas da tarde. Será imprescindível que todos os gerentes, supervisores e líderes de projetos tragam seus relatórios, estatísticas, gráficos e análises financeiras. O diretor, um homem pragmático e um tanto austero, enfatizou: "Nós precisamos de números exatos, cálculos precisos e soluções rápidas; caso contrário, perderemos o contrato bilionário." Além disso, a crase e a pontuação nos documentos entregues serão avaliadas, pois a comunicação escrita é o cartão de visita da instituição. Conclui-se, portanto, que a excelência não é uma opção, mas uma exigência diária.',
      },
      {
        titulo: "Diálogo e Pontuação Expressiva",
        corpo:
          "— Como assim, você não encontrou os documentos? — indagou a avó, visivelmente perplexa e indignada com a desorganização do neto.\n" +
          "— Calma, vó! Eu procurei no armário, na cômoda, debaixo do colchão e até lá fora, no pátio, mas sumiu! — respondeu o menino, gesticulando freneticamente.\n" +
          "A mulher suspirou fundo, ajeitou os óculos na ponta do nariz e disse, num tom quase irônico:\n" +
          "— Se eu for até lá e encontrar, o que eu faço com você, mocinho? É óbvio que você olhou de qualquer jeito. Vai ver, deixou o papel jogado perto do sofá, ou talvez sobre o rádio antigo do seu avô!\n" +
          "E, de fato, lá estava ele: amassado, esquecido e coberto de poeira.",
      },
    ],
  },
  {
    nome: "Nível 3 — Palavras Difíceis",
    resumo: "Vocabulário complexo, dígrafos e armadilhas de ortografia.",
    cor: "#8b5cf6",
    textos: [
      {
        titulo: "O Discurso Jurídico",
        corpo: "A idiossincrasia do comportamento humano frequentemente nos leva a questionar a verossimilhança das teorias sociológicas e antropológicas contemporâneas. Sob um escrutínio minucioso, nota-se que a inconstitucionalidade de certas prerrogativas governamentais gera uma miscelânea de interpretações nos tribunais superiores. O advogado, com sua retórica prolixa e persuasiva, argumentou que o réu agiu por motivos de força maior, isentando-o de qualquer responsabilidade civil ou criminal subjacente. A jurisprudência, outrossim, demonstra uma inflexibilidade tácita quando se trata de crimes de colarinho branco, exigindo um arcabouço probatório irrefutável para que a absolvição seja minimamente cogitada pelas instâncias deliberativas.",
      },
      {
        titulo: "Relatório Médico e Científico",
        corpo: "O otorrinolaringologista e o oftalmologista estavam em uma acalorada discussão sobre as características do músculo esternocleidomastoideo e suas implicações em casos de cefaleia tensional crônica. O paciente, que apresentava um quadro de hipocondria e claustrofobia, foi submetido a uma ressonância magnética computadorizada para descartar qualquer patologia neurológica preexistente. O laudo multidisciplinar apontou que a idiossincrasia farmacológica causou uma reação anafilática leve, exigindo a administração imediata de corticosteroides e anti-histamínicos de última geração. Além disso, a profilaxia recomendada envolveu uma reestruturação dietética rigorosa para mitigar os efeitos de possíveis disfunções gastrointestinais e metabólicas.",
      },
      {
        titulo: "Armadilhas Ortográficas",
        corpo: "A exceção à regra gerou uma sucessão de equívocos na redação do texto sobre a escassez de recursos hídricos. O excesso de zelo daquele ascensorista perfeccionista fez com que a engrenagem do elevador sofresse um desgaste desnecessário. A pretensão do xamã era curar a enxaqueca crônica do cacique utilizando um xarope extraído de uma planta majestosa, cujo gosto lembrava jiló com berinjela. Enquanto isso, o carrasco ressabiado hesitou ao puxar a alavanca, sentindo uma pontada no maxilar que o obrigou a buscar auxílio de um quiroprático especializado. A justaposição de ideias desconexas na cabeça do rapaz o deixou estupefato e completamente paralisado diante da lousa.",
      },
    ],
  },
  {
    nome: "Nível 4 — Trava-línguas",
    resumo: "Agilidade, repetição e saltos de dedo. Leia palavra por palavra.",
    cor: "#d9594c",
    textos: [
      {
        titulo: "O Festival do P, T e R",
        corpo: "O peito do pé de Pedro é preto. Quem disser que o peito do pé de Pedro é preto, tem o peito do pé mais preto que o peito do pé de Pedro. O rato roeu a rica roupa do rei de Roma, e a rainha, com raiva, resolveu remendar os retalhos rasgados. Três pratos de trigo para três tigres tristes. Os três tigres tristes tragaram os três pratos de trigo no topo do telhado. Toco preto, porco fresco, corpo crespo. Atrás da porta torta tem uma porca morta, e quem rir da porca morta, vai ficar com a boca torta. A pia pinga, o pinto pia. Quanto mais a pia pinga, mais o pinto pia.",
      },
      {
        titulo: "A Sineta do S, C, X e Z",
        corpo: "Sabia que a mãe do sabiá não sabia que o sabiá sabia assobiar? O suco de caju que o sapo tomou o fez saltar sobre o saco de sal da sala. Se o bispo de Constantinopla a quisesse desconstantinopolitanizar, não haveria desconstantinopolitanizador que a desconstantinopolitanizasse desconstantinopolitanizadoramente. Um limão, mil limões, um milhão de limões para a limonada do lavrador. A aranha arranha a rã, a rã arranha a aranha. Nem a aranha arranha a rã, nem a rã arranha a aranha. O tempo perguntou ao tempo quanto tempo o tempo tem. O tempo respondeu ao tempo que o tempo tem tanto tempo quanto tempo o tempo tem.",
      },
      {
        titulo: "Mistura Caótica de Sílabas",
        corpo: "Num ninho de mafagafos, há sete mafagafinhos. Quando a mafagafa gafa, gafam os sete mafagafinhos. O desinquietador desinquietou as inquietações do rei que estava inquieto em seu trono de prata. Farofa feita com muita farinha fofa faz uma fofoca feia na família do farofeiro. O caju do Juca e a jaca do cajá, o jacaré no jardim da jiboia. O doce perguntou ao doce qual é o doce mais doce que o doce de batata-doce. O doce respondeu ao doce que o doce mais doce que o doce de batata-doce é o doce de doce de batata-doce. Casa suja, chão sujo. Chão sujo, casa suja.",
      },
    ],
  },
  {
    nome: "Bônus — Literatura",
    resumo: "Trecho clássico em domínio público.",
    cor: "#cf8718",
    textos: [
      {
        titulo: "Cinco Minutos",
        autor: "José de Alencar",
        corpo:
          "É uma história curiosa a que lhe vou contar, minha prima. " +
          "Mas é uma história e não um romance. " +
          "Há mais de dois anos, seriam seis horas da tarde, dirigi-me ao Rocio para tomar o ônibus de Andaraí.",
      },
    ],
  },
];

/** Alguns caracteres não têm tecla própria no ABNT2: o travessão dos diálogos
 *  é aceito também como hífen, que é o que dá para digitar. */
export const EQUIVALENTES: Record<string, string> = { "—": "-", "–": "-" };

export interface TeclaLayout {
  base?: string;
  cima?: string;
  rotulo?: string;
  largura?: number;
  id?: string;
  espaco?: boolean;
}

/** Teclado ABNT2 — o teclado brasileiro, com Ç e as teclas de acento. */
export const LINHAS_TECLADO: TeclaLayout[][] = [
  [
    { base: "'", cima: '"' }, { base: "1", cima: "!" }, { base: "2", cima: "@" },
    { base: "3", cima: "#" }, { base: "4", cima: "$" }, { base: "5", cima: "%" },
    { base: "6", cima: "¨" }, { base: "7", cima: "&" }, { base: "8", cima: "*" },
    { base: "9", cima: "(" }, { base: "0", cima: ")" }, { base: "-", cima: "_" },
    { base: "=", cima: "+" }, { rotulo: "backspace", largura: 2 },
  ],
  [
    { rotulo: "tab", largura: 1 },
    { base: "q" }, { base: "w" }, { base: "e" }, { base: "r" }, { base: "t" },
    { base: "y" }, { base: "u" }, { base: "i" }, { base: "o" }, { base: "p" },
    { base: "´", cima: "`" }, { base: "[", cima: "{" },
  ],
  [
    { rotulo: "caps", largura: 1 },
    { base: "a" }, { base: "s" }, { base: "d" }, { base: "f" }, { base: "g" },
    { base: "h" }, { base: "j" }, { base: "k" }, { base: "l" },
    { base: "ç" }, { base: "~", cima: "^" }, { base: "]", cima: "}" },
    { rotulo: "enter", largura: 2, id: "enter" },
  ],
  [
    { rotulo: "shift", largura: 2, id: "shift-esq" },
    { base: "\\", cima: "|" },
    { base: "z" }, { base: "x" }, { base: "c" }, { base: "v" }, { base: "b" },
    { base: "n" }, { base: "m" },
    { base: ",", cima: "<" }, { base: ".", cima: ">" }, { base: ";", cima: ":" },
    { base: "/", cima: "?" },
    { rotulo: "shift", largura: 2, id: "shift-dir" },
  ],
  [
    { rotulo: "ctrl", largura: 1 }, { rotulo: "win", largura: 1 }, { rotulo: "alt", largura: 1 },
    { base: " ", rotulo: "espaço", espaco: true },
    { rotulo: "alt gr", largura: 1 }, { rotulo: "ctrl", largura: 1 },
  ],
];

/** Letras com acento: primeiro a tecla do acento, depois a letra — é assim
 *  que se digita de verdade no teclado ABNT2. */
export const ACENTOS: Record<string, [string, string]> = {
  á: ["´", "a"], à: ["`", "a"], â: ["^", "a"], ã: ["~", "a"],
  é: ["´", "e"], ê: ["^", "e"],
  í: ["´", "i"],
  ó: ["´", "o"], ô: ["^", "o"], õ: ["~", "o"],
  ú: ["´", "u"], ü: ["¨", "u"],
};

/** Onde está cada símbolo que só sai com Shift (para acender o Shift junto). */
export const COM_SHIFT: Record<string, string> = {};
LINHAS_TECLADO.forEach((linha) =>
  linha.forEach((t) => {
    if (t.cima && t.base) COM_SHIFT[t.cima] = t.base;
  }),
);

/** Teclas da mão esquerda — serve para acender o Shift da mão contrária,
 *  que é como se faz no toque correto. */
export const TECLAS_ESQUERDA = new Set("'12345qwertasdfgzxcvb\\".split(""));

const BASE_ASSETS = `${import.meta.env.BASE_URL}digitacao/faces`;

export const FACES_CORRETO = [
  `${BASE_ASSETS}/correto-1.jpg`,
  `${BASE_ASSETS}/correto-2.jpg`,
  `${BASE_ASSETS}/correto-3.jpg`,
  `${BASE_ASSETS}/correto-4.jpg`,
];
export const FACES_ERRO = [
  `${BASE_ASSETS}/erro-1.jpg`,
  `${BASE_ASSETS}/erro-2.jpg`,
  `${BASE_ASSETS}/erro-3.jpg`,
  `${BASE_ASSETS}/erro-4.jpg`,
  `${BASE_ASSETS}/erro-5.jpg`,
  `${BASE_ASSETS}/erro-6.jpg`,
  `${BASE_ASSETS}/erro-7.jpg`,
];
export const GIF_BATEMAN = `${BASE_ASSETS}/acerto-bateman.gif`;
export const GIF_SABRINA = `${BASE_ASSETS}/acerto-sabrina.gif`;
export const COMBO_BATEMAN = 25;
export const COMBO_SABRINA = 50;

export const FRASES: Record<"correto" | "erro" | "bateman" | "sabrina", string[]> = {
  correto: ["boa!", "isso aí!", "mandou bem!", "no ritmo!"],
  erro: ["ops!", "quase…", "atenção!", "de novo!"],
  bateman: ["em chamas!", "combo alto!", "tá voando!"],
  sabrina: ["PERFEITO!", "lendário!", "imparável!"],
};

export function faceDeAcerto(combo: number): { src: string; nivel: keyof typeof FRASES } {
  if (combo >= COMBO_SABRINA) return { src: GIF_SABRINA, nivel: "sabrina" };
  if (combo >= COMBO_BATEMAN) return { src: GIF_BATEMAN, nivel: "bateman" };
  const i = Math.max(0, Math.min(combo, FACES_CORRETO.length) - 1);
  return { src: FACES_CORRETO[i], nivel: "correto" };
}

export function faceDeErro(seguidos: number): string {
  const i = Math.max(0, Math.min(seguidos, FACES_ERRO.length) - 1);
  return FACES_ERRO[i];
}
