/**
 * Fases de "Sonic Digital Pro", portadas 1:1 de
 * Portal-Atividades/atividades/paginas/kids-sonic-digitacao.html.
 * Para acrescentar palavras/frases: só colar mais itens na fase desejada.
 */

export interface Fase {
  nome: string;
  nivel: string;
  dica: string;
  itens: string[];
}

export const FASES: Fase[] = [
  {
    nome: "Linha de base — ASDF JKLÇ",
    nivel: "Iniciante",
    dica: "Apoie os dedos em A-S-D-F (mão esquerda) e J-K-L-Ç (mão direita). Não olhe para o teclado!",
    itens: [
      "asdf", "jklç", "asdf jklç", "fdsa çlkj", "asd jkl", "aaa sss ddd fff",
      "jjj kkk lll ççç", "af js dk fl", "sala", "lada", "fada", "asa",
      "lasca", "falda", "jaca", "kajal", "dás", "lá", "já", "fá",
      "asdf asdf", "jklç jklç", "as ds fs js", "kl çl al sl",
    ],
  },
  {
    nome: "Linha de cima — QWERTY UIOP",
    nivel: "Iniciante",
    dica: "Suba os dedos uma linha e volte sempre para a posição de base depois de cada tecla.",
    itens: [
      "qwer", "tyui", "op", "qwerty", "uiop", "que", "peru", "tipo",
      "rio", "topo", "porta", "torre", "quero", "tempo", "rota",
      "prato", "poeira", "quieto", "roteiro", "outro",
      "quer", "teu", "riu", "pote", "erro", "trio", "puro",
    ],
  },
  {
    nome: "Linha de baixo — ZXCVBNM",
    nivel: "Iniciante",
    dica: "Desça os dedos com calma. O polegar continua na barra de espaço.",
    itens: [
      "zxcv", "bnm", "zxcvbnm", "vez", "bem", "com", "nunca", "banco",
      "cavalo", "menino", "nuvem", "bicicleta", "combinar", "vizinho",
      "zebra", "caixa", "vento", "banana", "cabana", "mexer", "nave",
    ],
  },
  {
    nome: "Números — 1234567890",
    nivel: "Iniciante",
    dica: "Use a linha de cima do teclado. Digite devagar e confira cada número.",
    itens: [
      "123", "456", "7890", "1234567890", "10 20 30", "2026", "100 200 300",
      "7 14 21 28", "1 2 3 4 5", "9876543210", "365 dias", "24 horas",
      "60 minutos", "12 meses", "1000", "50 50 50",
    ],
  },
  {
    nome: "Palavras curtas",
    nivel: "Fácil",
    dica: "Palavras de 3 a 5 letras. Tente não parar entre uma palavra e outra.",
    itens: [
      "casa", "bola", "gato", "rato", "sapo", "pato", "livro", "porta",
      "mesa", "flor", "sol", "lua", "mar", "céu", "pão", "leite",
      "bolo", "suco", "doce", "festa", "amigo", "verde", "azul", "preto",
      "carro", "trem", "moto", "barco", "peixe", "vaca", "urso", "lobo",
    ],
  },
  {
    nome: "Palavras médias",
    nivel: "Fácil",
    dica: "Agora as palavras têm mais letras. Mantenha o ritmo constante.",
    itens: [
      "computador", "teclado", "cadeira", "janela", "caderno", "mochila",
      "bicicleta", "borboleta", "elefante", "girafa", "pipoca", "sorvete",
      "chocolate", "melancia", "abacaxi", "morango", "escola", "professor",
      "estudante", "biblioteca", "brinquedo", "aventura", "floresta",
      "montanha", "cachoeira", "estrela", "planeta", "foguete",
    ],
  },
  {
    nome: "Palavras grandes",
    nivel: "Médio",
    dica: "Palavras compridas! Leia tudo antes de começar a digitar.",
    itens: [
      "extraordinário", "responsabilidade", "computadorizado",
      "desenvolvimento", "conhecimento", "possibilidade", "inteligência",
      "personalidade", "aproveitamento", "independência", "transformação",
      "acontecimento", "estabelecimento", "aproximadamente",
      "constantemente", "particularmente", "impressionante",
    ],
  },
  {
    nome: "Acentos e cedilha",
    nivel: "Médio",
    dica: "Para acentuar: aperte o acento e depois a vogal. O Ç fica ao lado do L.",
    itens: [
      "coração", "atenção", "canção", "informação", "português",
      "avó", "avô", "pêssego", "você", "café", "chapéu", "irmã",
      "amanhã", "maçã", "açúcar", "criança", "praça", "moça",
      "país", "saída", "herói", "ideia", "história", "família",
    ],
  },
  {
    nome: "Pontuação",
    nivel: "Médio",
    dica: "Vírgula, ponto, exclamação e interrogação. Use o Shift quando precisar.",
    itens: [
      "olá, tudo bem?", "sim! claro.", "que legal!", "onde? aqui.",
      "vamos: agora;", "certo, então...", "pare! espere.",
      "quem é? sou eu.", "ah, entendi!", "não, obrigado.",
      "hoje, amanhã e depois.", "1, 2, 3... já!",
    ],
  },
  {
    nome: "Símbolos especiais",
    nivel: "Difícil",
    dica: "Segure o Shift para os símbolos de cima dos números.",
    itens: [
      "@#$%", "&*()", "email@site.com", "100% certo", "R$ 25,90",
      "#sonic", "50% + 50%", "a & b", "(sim)", "[teste]", "{ok}",
      "1+1=2", "10-5=5", "3*4=12", "8/2=4", "x < y > z",
    ],
  },
  {
    nome: "Frases curtas",
    nivel: "Médio",
    dica: "Frases completas! Não esqueça o espaço entre as palavras.",
    itens: [
      "o gato dorme no sofá",
      "eu gosto de estudar",
      "a bola é azul e branca",
      "hoje o dia está bonito",
      "meu amigo joga futebol",
      "a escola abre às sete",
      "vamos brincar no parque",
      "o cachorro late alto",
      "minha mãe faz bolo",
      "o sol nasce no leste",
      "eu sei digitar rápido",
      "o livro está na mesa",
    ],
  },
  {
    nome: "Frases médias",
    nivel: "Difícil",
    dica: "Respire fundo e mantenha o ritmo. Precisão vale mais que pressa.",
    itens: [
      "a prática constante deixa a digitação muito mais rápida",
      "todos os dias eu treino um pouco no computador",
      "o segredo é não olhar para o teclado enquanto digita",
      "quando erramos, aprendemos e tentamos de novo",
      "a tecnologia ajuda muito nos estudos e no trabalho",
      "com paciência e treino qualquer pessoa consegue aprender",
      "escrever bem no computador é uma habilidade importante",
      "as mãos devem ficar sempre na posição correta do teclado",
    ],
  },
  {
    nome: "Frases longas",
    nivel: "Difícil",
    dica: "Desafio de resistência! Vá com calma até o final da frase.",
    itens: [
      "a digitação rápida e correta é uma habilidade que serve para a escola, para o trabalho e para a vida toda",
      "quando começamos a digitar sem olhar para o teclado, conseguimos pensar no texto e não nas teclas",
      "o computador é uma ferramenta poderosa, mas quem faz a diferença é a pessoa que sabe usá-lo muito bem",
      "estudar todos os dias um pouquinho funciona melhor do que estudar tudo de uma vez só no último dia",
    ],
  },
  {
    nome: "Mundo do Sonic",
    nivel: "Difícil",
    dica: "Palavras e frases do universo do Sonic. Corra como ele!",
    itens: [
      "sonic the hedgehog", "green hill zone", "anéis dourados",
      "velocidade máxima", "tails knuckles amy", "doutor eggman",
      "esmeraldas do caos", "sonic corre mais rápido que o som",
      "colete todos os anéis da fase", "o ouriço azul mais veloz do mundo",
      "chaos emerald", "super sonic", "loop de velocidade",
      "gotta go fast", "zona da colina verde",
    ],
  },
  {
    nome: "Trava-línguas",
    nivel: "Expert",
    dica: "Difícil de falar e de digitar! Vá devagar para não errar.",
    itens: [
      "o rato roeu a roupa do rei de roma",
      "três pratos de trigo para três tigres tristes",
      "a aranha arranha a jarra e a jarra arranha a aranha",
      "o peito do pé de pedro é preto",
      "num ninho de mafagafos havia sete mafagafinhos",
      "sabia que o sabiá sabia assobiar",
    ],
  },
  {
    nome: "Desafio final",
    nivel: "Expert",
    dica: "Tudo junto: letras, números, acentos e símbolos. Mostre o que aprendeu!",
    itens: [
      "Parabéns! Você digitou 100% das 16 fases.",
      "O Sonic coletou 1.000 anéis na Green Hill Zone!",
      "Treinar 15 minutos por dia = grande evolução.",
      "Meu e-mail é aluno@escola.com.br (turma 2026).",
      "A prática leva à perfeição — e à velocidade!",
      "Digitar rápido & sem erros: missão cumprida!",
    ],
  },
];

const BASE_ASSETS = `${import.meta.env.BASE_URL}digitacao/sonic`;

export const CONFIG = {
  itensPorFase: 8,
  errosParaSonicRealista: 5,
  faixasVelocidade: [
    { min: 0, nivel: 0, rotulo: "Parado" },
    { min: 8, nivel: 1, rotulo: "Andando" },
    { min: 20, nivel: 2, rotulo: "Correndo" },
    { min: 40, nivel: 3, rotulo: "Muito rápido!" },
    { min: 70, nivel: 4, rotulo: "SUPER SONIC!" },
  ],
  imagens: {
    normal: `${BASE_ASSETS}/sonic-idle.gif`,
    realista: `${BASE_ASSETS}/sonic-realista.gif`,
    feio: `${BASE_ASSETS}/sonic-feio.gif`,
  },
  emojiFallback: { normal: "🦔", realista: "🦔", feio: "😬" },
  anel: `${BASE_ASSETS}/ring.png`,
};

export type ModoSonic = "normal" | "realista" | "feio";

export function sortear<T>(lista: T[], quantidade: number): T[] {
  const copia = [...lista];
  const escolhidos: T[] = [];
  while (copia.length && escolhidos.length < quantidade) {
    escolhidos.push(copia.splice(Math.floor(Math.random() * copia.length), 1)[0]);
  }
  return escolhidos;
}

export function podeAcessar(conclusoes: Record<number, unknown>, indice: number): boolean {
  if (indice === 0) return true;
  if (conclusoes[indice]) return true;
  return !!conclusoes[indice - 1];
}
