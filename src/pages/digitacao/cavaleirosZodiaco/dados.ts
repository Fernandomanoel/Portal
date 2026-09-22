/**
 * Dados de "Batalha das 12 Casas", portados 1:1 de
 * Portal-Atividades/atividades/paginas/cavaleiros-zodiaco-digitacao.html.
 */

export const LETRAS: Record<"PT" | "EN" | "JP", string[]> = {
  PT: [
    "O cosmo desperta dentro de mim",
    "A armadura de bronze brilha na noite",
    "Doze casas separam o santuario da esperanca",
    "Levante-se, cavaleiro, a batalha comecou",
    "Cada estrela guarda um guerreiro",
    "A amizade e a forca que nao se quebra",
    "Nenhum golpe derruba quem ainda tem fe",
    "O meteoro de pegaso corta o ceu",
    "Avance sem medo pela primeira casa",
    "A esperanca nasce quando tudo parece perdido",
    "Erga o punho e queime o seu cosmo",
    "O caminho ate atena comeca agora",
  ],
  EN: [
    "The cosmo awakens deep inside me",
    "The bronze cloth shines under the night sky",
    "Twelve houses stand between us and the truth",
    "Rise up, knight, the battle has begun",
    "Every star protects a warrior",
    "Friendship is the strength that never breaks",
    "No blow can crush a heart that still hopes",
    "The pegasus meteor tears across the sky",
    "Move forward without fear",
    "Hope is born when everything seems lost",
    "Raise your fist and burn your cosmo",
    "The road to the goddess starts right here",
  ],
  JP: [
    "kosumo o moyase",
    "seiya wa akiramenai",
    "juuni kyuu o susumu",
    "ougon no seinto ga matteiru",
    "tomodachi no chikara wa tsuyoi",
    "hoshi ga michi o terasu",
    "tatakai wa ima hajimaru",
    "yume o wasurenai",
    "kibou wa kienai hikari",
    "pegasasu ryuuseiken",
    "tachiagare wakaki seinto",
    "sora no kanata e susume",
  ],
};

const BASE_ASSETS = `${import.meta.env.BASE_URL}digitacao/zodiaco`;

export interface DadosIdioma {
  rotulo: string;
  vidaMaxima: number;
  audio: string;
}

export const IDIOMAS: Record<"PT" | "EN" | "JP", DadosIdioma> = {
  PT: { rotulo: "Português", vidaMaxima: 3, audio: `${BASE_ASSETS}/audio/abertura-pt.mp3` },
  EN: { rotulo: "Inglês", vidaMaxima: 5, audio: `${BASE_ASSETS}/audio/abertura-en.mp3` },
  JP: { rotulo: "Japonês (romaji)", vidaMaxima: 5, audio: `${BASE_ASSETS}/audio/abertura-jp.mp3` },
};

export interface Casa {
  base: string;
  casa: string;
  cavaleiro: string;
  signo: string;
  idioma: "PT" | "EN" | "JP";
}

export const CASAS: Casa[] = [
  { base: "aries", casa: "Áries", cavaleiro: "Mu de Áries", signo: "♈", idioma: "PT" },
  { base: "touro", casa: "Touro", cavaleiro: "Aldebaran de Touro", signo: "♉", idioma: "PT" },
  { base: "gemeos", casa: "Gêmeos", cavaleiro: "Saga de Gêmeos", signo: "♊", idioma: "PT" },
  { base: "cancer", casa: "Câncer", cavaleiro: "Máscara da Morte de Câncer", signo: "♋", idioma: "PT" },
  { base: "leao", casa: "Leão", cavaleiro: "Aiolia de Leão", signo: "♌", idioma: "EN" },
  { base: "virgem", casa: "Virgem", cavaleiro: "Shaka de Virgem", signo: "♍", idioma: "EN" },
  { base: "libra", casa: "Libra", cavaleiro: "Dohko de Libra", signo: "♎", idioma: "EN" },
  { base: "escorpiao", casa: "Escorpião", cavaleiro: "Milo de Escorpião", signo: "♏", idioma: "EN" },
  { base: "sagitario", casa: "Sagitário", cavaleiro: "Aiolos de Sagitário", signo: "♐", idioma: "JP" },
  { base: "capricornio", casa: "Capricórnio", cavaleiro: "Shura de Capricórnio", signo: "♑", idioma: "JP" },
  { base: "aquario", casa: "Aquário", cavaleiro: "Camus de Aquário", signo: "♒", idioma: "JP" },
  { base: "peixes", casa: "Peixes", cavaleiro: "Afrodite de Peixes", signo: "♓", idioma: "JP" },
];

interface Cenario {
  ceu1: string;
  ceu2: string;
  pedra: string;
  estrelas: [number, number][];
  tracos: [number, number][];
}

export const CENARIOS: Record<string, Cenario> = {
  aries: { ceu1: "#3b1f2b", ceu2: "#120a12", pedra: "#c2705a", estrelas: [[62, 30], [82, 26], [98, 34], [114, 48]], tracos: [[0, 1], [1, 2], [2, 3]] },
  touro: { ceu1: "#1f3222", ceu2: "#0a1410", pedra: "#6fae7d", estrelas: [[58, 26], [74, 36], [88, 46], [102, 54], [118, 44], [134, 32], [88, 64], [104, 72]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7]] },
  gemeos: { ceu1: "#22224a", ceu2: "#0c0c22", pedra: "#7f8ce0", estrelas: [[64, 20], [64, 44], [64, 68], [80, 56], [100, 20], [100, 44], [100, 68], [86, 32]], tracos: [[0, 1], [1, 2], [1, 3], [4, 5], [5, 6], [5, 7]] },
  cancer: { ceu1: "#16303a", ceu2: "#08161c", pedra: "#58a0b0", estrelas: [[88, 18], [88, 38], [70, 56], [106, 54], [108, 74]], tracos: [[0, 1], [1, 2], [1, 3], [3, 4]] },
  leao: { ceu1: "#3a2a10", ceu2: "#160f04", pedra: "#e0a53a", estrelas: [[58, 54], [62, 40], [72, 30], [86, 26], [100, 32], [104, 46], [122, 52], [134, 38], [120, 64]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [6, 8], [5, 8]] },
  virgem: { ceu1: "#2b2038", ceu2: "#110c18", pedra: "#b58ad6", estrelas: [[54, 30], [72, 38], [88, 32], [106, 44], [124, 40], [114, 60], [96, 64]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6]] },
  libra: { ceu1: "#123030", ceu2: "#061616", pedra: "#56b8a4", estrelas: [[70, 52], [88, 32], [112, 34], [126, 54], [98, 66]], tracos: [[0, 1], [1, 2], [2, 3], [1, 4], [2, 4]] },
  escorpiao: { ceu1: "#3a1220", ceu2: "#160610", pedra: "#d2455f", estrelas: [[56, 24], [70, 32], [84, 30], [94, 44], [100, 58], [98, 74], [86, 82], [72, 82], [62, 74]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]] },
  sagitario: { ceu1: "#2a1836", ceu2: "#120a1a", pedra: "#a06fe0", estrelas: [[60, 58], [60, 40], [76, 28], [94, 38], [94, 58], [76, 68], [110, 44], [124, 54]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [3, 6], [6, 7]] },
  capricornio: { ceu1: "#23262c", ceu2: "#0c0e12", pedra: "#8f9aa8", estrelas: [[58, 34], [80, 26], [104, 38], [122, 54], [98, 66], [72, 54]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  aquario: { ceu1: "#10283f", ceu2: "#06121e", pedra: "#4fa3e0", estrelas: [[56, 32], [72, 42], [88, 32], [104, 42], [120, 32], [136, 42], [88, 58], [104, 68]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7]] },
  peixes: { ceu1: "#2c1836", ceu2: "#12081a", pedra: "#c86fb8", estrelas: [[56, 24], [72, 34], [88, 46], [104, 56], [120, 48], [136, 38], [104, 72], [118, 82]], tracos: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [3, 6], [6, 7]] },
};

export const PASTA_SPRITES = `${BASE_ASSETS}/`;
export const POSES = { neutro: "", ataque: "-ataque", dano: "-dano", caido: "-caido" } as const;
export type Pose = keyof typeof POSES;

export function caminhoSprite(base: string, pose: Pose): string {
  return `${PASTA_SPRITES}${base}${POSES[pose]}.png`;
}

/* Quanta vida o Cavaleiro tem, medida em caracteres da casa: sobe de 1,8 na
 * primeira casa para 3,2 na última, então a luta fica mais longa conforme o
 * aluno avança. */
const VIDA_VILAO_PRIMEIRA = 1.8;
const VIDA_VILAO_ULTIMA = 3.2;

export function proporcaoVidaVilao(indiceCasa: number): number {
  const passo = indiceCasa / (CASAS.length - 1);
  return VIDA_VILAO_PRIMEIRA + (VIDA_VILAO_ULTIMA - VIDA_VILAO_PRIMEIRA) * passo;
}

export type LetrasSalvas = Partial<Record<"PT" | "EN" | "JP", string[]>>;

/** Versos em uso para um idioma: os salvos pelo instrutor, se houver; senão os do arquivo. */
export function versosDoIdioma(letrasSalvas: LetrasSalvas, codigo: "PT" | "EN" | "JP"): string[] {
  const salvos = letrasSalvas[codigo];
  const escolhidos = Array.isArray(salvos) && salvos.length ? salvos : LETRAS[codigo];
  return (escolhidos || []).map((t) => String(t).trim()).filter(Boolean);
}

export function versosDaCasa(letrasSalvas: LetrasSalvas, indice: number): string[] {
  const casa = CASAS[indice];
  const doIdioma = CASAS.filter((c) => c.idioma === casa.idioma);
  const posicao = doIdioma.indexOf(casa);
  const total = doIdioma.length;

  const linhas = versosDoIdioma(letrasSalvas, casa.idioma);
  if (!linhas.length) return ["cosmo"];
  if (linhas.length <= total) return [linhas[posicao % linhas.length]];

  const porCasa = Math.floor(linhas.length / total);
  const sobra = linhas.length % total;
  const inicio = posicao * porCasa + Math.min(posicao, sobra);
  const quantidade = porCasa + (posicao < sobra ? 1 : 0);
  return linhas.slice(inicio, inicio + quantidade);
}
