/**
 * Balões de Letras: cada balão sobe com uma letra; apertar a tecla estoura o
 * balão antes que ele escape pelo alto. Os níveis seguem as fileiras do
 * teclado (do meio, de cima, de baixo, números), como numa aula de
 * digitação, e o céu muda de período a cada 4 níveis.
 *
 * Acrescentar um nível é acrescentar um objeto aqui.
 */

export interface NivelBaloes {
  nome: string;
  dica: string;
  /** Letras que podem vir nos balões. */
  letras: string;
  /** Balões estourados para passar de nível. */
  meta: number;
  /** Subida, em % da altura da cena por segundo. */
  velocidade: number;
  /** Segundos entre um balão e o próximo. */
  intervalo: number;
  /** Máximo de balões na tela ao mesmo tempo. */
  maximo: number;
}

export const VIDAS = 5;

export const NIVEIS: NivelBaloes[] = [
  { nome: "Fileira do meio: mão esquerda", dica: "Dedos em A S D F. O indicador fica no F, que tem um risquinho.", letras: "asdf", meta: 15, velocidade: 8, intervalo: 1.7, maximo: 3 },
  { nome: "Fileira do meio: mão direita", dica: "Dedos em J K L Ç. O indicador fica no J, que tem um risquinho.", letras: "jklç", meta: 15, velocidade: 8, intervalo: 1.6, maximo: 3 },
  { nome: "Fileira do meio: G e H", dica: "Os indicadores esticam para o centro e voltam para F e J.", letras: "asdfghjklç", meta: 18, velocidade: 9, intervalo: 1.5, maximo: 4 },
  { nome: "Fileira do meio completa", dica: "Toda a fileira do meio, mais rápido.", letras: "asdfghjklç", meta: 22, velocidade: 10.5, intervalo: 1.25, maximo: 4 },
  { nome: "Fileira de cima: mão esquerda", dica: "Q W E R T: cada dedo sobe da sua tecla do meio.", letras: "qwert", meta: 18, velocidade: 9, intervalo: 1.5, maximo: 4 },
  { nome: "Fileira de cima: mão direita", dica: "Y U I O P: o indicador direito cuida do Y e do U.", letras: "yuiop", meta: 18, velocidade: 9, intervalo: 1.5, maximo: 4 },
  { nome: "Fileiras do meio e de cima", dica: "Suba e volte para a fileira do meio depois de cada tecla.", letras: "asdfghjklçqwertyuiop", meta: 24, velocidade: 10.5, intervalo: 1.25, maximo: 5 },
  { nome: "Fileira de baixo", dica: "Z X C V B N M: os dedos descem e voltam para o meio.", letras: "zxcvbnm", meta: 20, velocidade: 10, intervalo: 1.4, maximo: 4 },
  { nome: "Todas as letras", dica: "O alfabeto inteiro. Olhe o balão mais alto primeiro.", letras: "abcdefghijklmnopqrstuvwxyzç", meta: 26, velocidade: 11, intervalo: 1.2, maximo: 5 },
  { nome: "Números de 1 a 5", dica: "Mão esquerda na fileira dos números.", letras: "12345", meta: 18, velocidade: 9.5, intervalo: 1.4, maximo: 4 },
  { nome: "Números de 6 a 0", dica: "Mão direita na fileira dos números.", letras: "67890", meta: 18, velocidade: 9.5, intervalo: 1.4, maximo: 4 },
  { nome: "Letras e números", dica: "Misturado: volte sempre para a posição de descanso.", letras: "asdfjklçqwertyuiop1234567890", meta: 26, velocidade: 11.5, intervalo: 1.15, maximo: 5 },
  { nome: "Maiúsculas", dica: "Segure Shift com a mão contrária à da letra.", letras: "ASDFGHJKLÇ", meta: 20, velocidade: 9, intervalo: 1.5, maximo: 4 },
  { nome: "Pontuação", dica: "Vírgula, ponto, ponto e vírgula e barra ficam na fileira de baixo.", letras: ",.;/", meta: 18, velocidade: 9, intervalo: 1.5, maximo: 4 },
  { nome: "Velocidade", dica: "Todas as letras, subindo mais rápido.", letras: "abcdefghijklmnopqrstuvwxyzç", meta: 30, velocidade: 13.5, intervalo: 0.95, maximo: 6 },
  { nome: "Desafio final", dica: "Letras, números e pontuação. Boa sorte!", letras: "abcdefghijklmnopqrstuvwxyzç1234567890,.", meta: 36, velocidade: 15, intervalo: 0.85, maximo: 7 },
];

/** O céu muda a cada 4 níveis. */
export const PERIODOS = ["manha", "tarde", "por-do-sol", "noite"] as const;
export type Periodo = (typeof PERIODOS)[number];
export const NOME_PERIODO: Record<Periodo, string> = { manha: "Manhã", tarde: "Tarde", "por-do-sol": "Pôr do sol", noite: "Noite" };

export const periodoDoNivel = (nivel: number): Periodo => PERIODOS[Math.min(PERIODOS.length - 1, Math.floor(nivel / 4))];

export const CORES_BALAO = ["#e63946", "#f4a261", "#2a9d8f", "#3a86ff", "#8338ec", "#ff006e", "#06a77d", "#fb8500"];
