/**
 * Esquadrão Hiper: jogo de nave de rolagem vertical, frenético, de arcade. A
 * nave atira sozinha e o aluno pilota com as setas (ou o mouse).
 *
 * A digitação entra de dois jeitos:
 * - Códigos de trapaça: abater inimigos enche a barra de energia; com Enter
 *   abre-se o terminal e, digitando o código de um especial (laser, mísseis,
 *   escudo, turbo, bomba), ele dispara. Os códigos de cada fase ficam na tela.
 * - Alertas: de tempos em tempos a nave entra em pane e pede uma palavra; se o
 *   relógio zerar antes de digitá-la, perde-se uma vida.
 *
 * Acrescentar uma fase é acrescentar um objeto aqui.
 */

export type TipoInimigo =
  | "drone"
  | "zigue"
  | "atirador"
  | "rocha"
  | "kamikaze"
  | "torreta"
  | "minador"
  | "enxame"
  | "lanca"
  | "blindado";

export type AtaqueChefe = "leque" | "espiral" | "rajada" | "chuva" | "divisor" | "laser" | "ondas" | "perseguidor";

export type Especial = "turbo" | "misseis" | "escudo" | "laser" | "bomba";

export const ESPECIAIS: { id: Especial; nome: string; custo: number; descricao: string }[] = [
  { id: "turbo", nome: "Turbo", custo: 25, descricao: "tiro triplo e rápido por 8 s" },
  { id: "misseis", nome: "Mísseis", custo: 35, descricao: "12 mísseis que perseguem os inimigos" },
  { id: "escudo", nome: "Escudo", custo: 40, descricao: "6 s sem levar dano, desfazendo os tiros" },
  { id: "laser", nome: "Laser", custo: 55, descricao: "raio contínuo por 4 s" },
  { id: "bomba", nome: "Bomba", custo: 100, descricao: "limpa a tela e acerta o chefe" },
];

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
  /** Código de trapaça de cada especial nesta fase. */
  codigos: Record<Especial, string>;
  /** Segundos entre alertas, nas ondas e no chefe. */
  alertaOndas: number;
  alertaChefe: number;
  palavras: string[];
  palavrasChefe: string[];
  vidaChefe: number;
  /** Ataques do chefe, em ordem; troca a cada 4 segundos. */
  ataques: AtaqueChefe[];
}

export const VIDAS = 5;
export const ENERGIA_MAXIMA = 100;

export const FASES: FaseNave[] = [
  {
    nome: "Órbita baixa",
    chefe: "Sentinela",
    dica: "Abata inimigos para encher a energia. Enter abre o terminal: digite o código do especial.",
    ceu: ["#0b1a4a", "#04081f", "#a9c8ff"],
    duracao: 45,
    ritmo: 1.7,
    inimigos: ["drone", "drone", "zigue", "kamikaze", "enxame"],
    velocidadeTiro: 0.85,
    codigos: { turbo: "turbo", misseis: "missil", escudo: "escudo", laser: "laser", bomba: "bomba" },
    alertaOndas: 14,
    alertaChefe: 10,
    palavras: ["raio", "onda", "luz", "pulso", "fogo", "nave", "voar"],
    palavrasChefe: ["reator", "faísca", "cometa", "motor"],
    vidaChefe: 220,
    ataques: ["leque", "rajada", "ondas"],
  },
  {
    nome: "Cinturão de asteroides",
    chefe: "Devorador de Rochas",
    dica: "Rochas aguentam mais tiros; minadores deixam minas que explodem em estilhaços.",
    ceu: ["#2a1d12", "#0a0705", "#ffd9a8"],
    duracao: 50,
    ritmo: 1.5,
    inimigos: ["rocha", "rocha", "drone", "minador", "kamikaze", "zigue"],
    velocidadeTiro: 0.95,
    codigos: { turbo: "turbina", misseis: "foguetes", escudo: "barreira", laser: "plasma", bomba: "impacto" },
    alertaOndas: 13,
    alertaChefe: 9,
    palavras: ["rocha", "órbita", "cratera", "poeira", "meteoro"],
    palavrasChefe: ["gravidade", "explosão", "estilhaço", "colisão"],
    vidaChefe: 300,
    ataques: ["chuva", "divisor", "leque", "rajada"],
  },
  {
    nome: "Nebulosa vermelha",
    chefe: "Hidra Rubra",
    dica: "Torretas giram tiros em espiral; a linha vermelha avisa onde a lança vai cair.",
    ceu: ["#4a0b2a", "#12020c", "#ffb3d1"],
    duracao: 55,
    ritmo: 1.35,
    inimigos: ["zigue", "atirador", "torreta", "lanca", "enxame", "kamikaze"],
    velocidadeTiro: 1.05,
    codigos: { turbo: "aceleração", misseis: "teleguiado", escudo: "proteção", laser: "relâmpago", bomba: "supernova" },
    alertaOndas: 12,
    alertaChefe: 8.5,
    palavras: ["nebulosa", "energia", "trovão", "fóton", "radiação"],
    palavrasChefe: ["magnetismo", "turbilhão", "eletricidade"],
    vidaChefe: 380,
    ataques: ["espiral", "laser", "perseguidor", "leque"],
  },
  {
    nome: "Base inimiga",
    chefe: "Fortaleza",
    dica: "Blindados aguentam muito: guarde energia para o laser.",
    ceu: ["#10262f", "#03090c", "#9ff0ff"],
    duracao: 60,
    ritmo: 1.2,
    inimigos: ["blindado", "atirador", "torreta", "minador", "lanca", "drone", "kamikaze"],
    velocidadeTiro: 1.15,
    codigos: { turbo: "sobrecarga", misseis: "bombardeio", escudo: "blindagem", laser: "desintegrar", bomba: "hiperespaço" },
    alertaOndas: 11,
    alertaChefe: 8,
    palavras: ["propulsor", "canhão", "sinalizador", "radar", "comando"],
    palavrasChefe: ["contra-ataque", "sobrecarga", "evacuação"],
    vidaChefe: 460,
    ataques: ["rajada", "divisor", "laser", "chuva", "espiral"],
  },
  {
    nome: "Núcleo",
    chefe: "Núcleo Mestre",
    dica: "A última batalha: códigos com maiúscula e espaço. Shift com a outra mão!",
    ceu: ["#2a0b4a", "#05010d", "#e6c8ff"],
    duracao: 65,
    ritmo: 1.05,
    inimigos: ["blindado", "torreta", "lanca", "enxame", "minador", "kamikaze", "atirador", "zigue"],
    velocidadeTiro: 1.25,
    codigos: { turbo: "Turbo Máximo", misseis: "Chuva de Mísseis", escudo: "Escudo Total", laser: "Laser Final", bomba: "Ataque Supremo" },
    alertaOndas: 10,
    alertaChefe: 7.5,
    palavras: ["Hiper", "Esquadrão", "velocidade", "propulsão", "galáxia"],
    palavrasChefe: ["Hiperpropulsão", "Vitória", "Núcleo Mestre"],
    vidaChefe: 560,
    ataques: ["espiral", "perseguidor", "laser", "divisor", "ondas", "chuva"],
  },
];

/** Tempo do alerta: base mais um tanto por letra. */
export const tempoDoAlerta = (palavra: string, chefe: boolean) => (chefe ? 2.4 : 2.8) + palavra.length * 0.42;

/** Tempo do terminal de códigos: dá para digitar com calma, mas não para sempre. */
export const tempoDoTerminal = (codigo: string) => 3 + codigo.length * 0.45;
