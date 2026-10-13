/**
 * Esquadrão Hiper: jogo de nave de rolagem vertical. A nave atira sozinha e
 * o aluno a move com as setas (ou o mouse). De tempos em tempos aparece um
 * evento de tempo com uma palavra: digitá-la antes do relógio zerar solta o
 * especial (limpa os tiros da tela e acerta todos os inimigos e o chefe);
 * deixar o tempo acabar custa uma vida. Cada fase termina num chefe, que
 * pede eventos mais longos e mais seguidos.
 *
 * Acrescentar uma fase é acrescentar um objeto aqui.
 */

export type TipoInimigo = "drone" | "zigue" | "atirador" | "rocha";

export interface FaseNave {
  nome: string;
  chefe: string;
  dica: string;
  /** Cores do espaço: alto, baixo e brilho das estrelas. */
  ceu: [string, string, string];
  /** Segundos de ondas antes do chefe aparecer. */
  duracao: number;
  /** Segundos entre um grupo de inimigos e o próximo. */
  ritmo: number;
  inimigos: TipoInimigo[];
  /** Multiplica a velocidade dos tiros inimigos. */
  velocidadeTiro: number;
  /** Segundos entre eventos de tempo, nas ondas e no chefe. */
  eventoOndas: number;
  eventoChefe: number;
  palavras: string[];
  palavrasChefe: string[];
  vidaChefe: number;
  /** Ataques do chefe, em ordem. */
  ataques: ("leque" | "espiral" | "rajada" | "chuva")[];
}

export const VIDAS = 5;

export const FASES: FaseNave[] = [
  {
    nome: "Órbita baixa",
    chefe: "Sentinela",
    dica: "Os eventos pedem palavras curtas. Mova a nave com as setas e fuja dos tiros.",
    ceu: ["#0b1a4a", "#04081f", "#a9c8ff"],
    duracao: 45,
    ritmo: 2.2,
    inimigos: ["drone", "drone", "zigue"],
    velocidadeTiro: 0.8,
    eventoOndas: 8,
    eventoChefe: 6,
    palavras: ["raio", "onda", "luz", "pulso", "fogo", "nave", "voar", "tiro"],
    palavrasChefe: ["laser", "escudo", "turbo", "faísca", "cometa"],
    vidaChefe: 160,
    ataques: ["leque", "rajada"],
  },
  {
    nome: "Cinturão de asteroides",
    chefe: "Devorador de Rochas",
    dica: "Rochas não atiram, mas aguentam mais tiros. Desvie!",
    ceu: ["#2a1d12", "#0a0705", "#ffd9a8"],
    duracao: 50,
    ritmo: 1.9,
    inimigos: ["rocha", "rocha", "drone", "zigue"],
    velocidadeTiro: 1,
    eventoOndas: 7.5,
    eventoChefe: 5.5,
    palavras: ["rocha", "laser", "plasma", "órbita", "impacto", "cratera", "poeira"],
    palavrasChefe: ["meteoro", "gravidade", "explosão", "estilhaço"],
    vidaChefe: 220,
    ataques: ["chuva", "leque", "rajada"],
  },
  {
    nome: "Nebulosa vermelha",
    chefe: "Hidra Rubra",
    dica: "Atiradores param no meio da tela e soltam leques de tiros.",
    ceu: ["#4a0b2a", "#12020c", "#ffb3d1"],
    duracao: 55,
    ritmo: 1.7,
    inimigos: ["zigue", "atirador", "drone", "drone"],
    velocidadeTiro: 1.1,
    eventoOndas: 7,
    eventoChefe: 5,
    palavras: ["nebulosa", "energia", "relâmpago", "trovão", "fóton", "radiação"],
    palavrasChefe: ["supernova", "magnetismo", "turbilhão", "eletricidade"],
    vidaChefe: 280,
    ataques: ["espiral", "leque", "rajada"],
  },
  {
    nome: "Base inimiga",
    chefe: "Fortaleza",
    dica: "Muitos inimigos ao mesmo tempo. O especial é a sua melhor arma.",
    ceu: ["#10262f", "#03090c", "#9ff0ff"],
    duracao: 60,
    ritmo: 1.45,
    inimigos: ["atirador", "zigue", "drone", "rocha", "drone"],
    velocidadeTiro: 1.2,
    eventoOndas: 6.5,
    eventoChefe: 4.8,
    palavras: ["blindagem", "propulsor", "canhão", "reator", "sinalizador", "radar"],
    palavrasChefe: ["contra-ataque", "hiperespaço", "sobrecarga", "bombardeio"],
    vidaChefe: 340,
    ataques: ["rajada", "espiral", "chuva", "leque"],
  },
  {
    nome: "Núcleo",
    chefe: "Núcleo Mestre",
    dica: "A última batalha: tudo o que você treinou, mais rápido.",
    ceu: ["#2a0b4a", "#05010d", "#e6c8ff"],
    duracao: 65,
    ritmo: 1.2,
    inimigos: ["atirador", "zigue", "drone", "rocha", "atirador"],
    velocidadeTiro: 1.3,
    eventoOndas: 6,
    eventoChefe: 4.4,
    palavras: ["Hiper", "Esquadrão", "velocidade", "aceleração", "propulsão", "galáxia"],
    palavrasChefe: ["Ataque Final", "Supernova", "Hiperpropulsão", "Vitória"],
    vidaChefe: 420,
    ataques: ["espiral", "chuva", "rajada", "leque", "espiral"],
  },
];

/** Tempo para digitar o evento: base mais um tanto por letra. */
export const tempoDoEvento = (palavra: string, chefe: boolean) => (chefe ? 2.4 : 2.8) + palavra.length * 0.42;
