/**
 * Teclado ABNT2 da tela: onde fica cada tecla, que dedo aperta e quais
 * teclas formam cada caractere (maiúscula = Shift + letra; "é" = acento
 * agudo e depois a letra, como no teclado de verdade).
 */

export type Dedo =
  | "mindinho-esquerdo"
  | "anelar-esquerdo"
  | "medio-esquerdo"
  | "indicador-esquerdo"
  | "indicador-direito"
  | "medio-direito"
  | "anelar-direito"
  | "mindinho-direito"
  | "polegar";

export const NOME_DEDO: Record<Dedo, string> = {
  "mindinho-esquerdo": "mindinho esquerdo",
  "anelar-esquerdo": "anelar esquerdo",
  "medio-esquerdo": "dedo médio esquerdo",
  "indicador-esquerdo": "indicador esquerdo",
  "indicador-direito": "indicador direito",
  "medio-direito": "dedo médio direito",
  "anelar-direito": "anelar direito",
  "mindinho-direito": "mindinho direito",
  polegar: "polegar",
};

export interface Tecla {
  id: string;
  /** O que aparece na tecla: embaixo, e em cima quando tem Shift. */
  rotulo: string;
  rotuloShift?: string;
  dedo: Dedo;
  /** Largura em "unidades de tecla" (1 = tecla de letra). */
  largura?: number;
  /** Tecla de apoio (F e J têm um risquinho). */
  apoio?: boolean;
}

const t = (id: string, rotulo: string, dedo: Dedo, extra: Partial<Tecla> = {}): Tecla => ({ id, rotulo, dedo, ...extra });

export const LINHAS: Tecla[][] = [
  [
    t("'", "'", "mindinho-esquerdo", { rotuloShift: '"' }),
    t("1", "1", "mindinho-esquerdo", { rotuloShift: "!" }),
    t("2", "2", "anelar-esquerdo", { rotuloShift: "@" }),
    t("3", "3", "medio-esquerdo", { rotuloShift: "#" }),
    t("4", "4", "indicador-esquerdo", { rotuloShift: "$" }),
    t("5", "5", "indicador-esquerdo", { rotuloShift: "%" }),
    t("6", "6", "indicador-direito", { rotuloShift: "¨" }),
    t("7", "7", "indicador-direito", { rotuloShift: "&" }),
    t("8", "8", "medio-direito", { rotuloShift: "*" }),
    t("9", "9", "anelar-direito", { rotuloShift: "(" }),
    t("0", "0", "mindinho-direito", { rotuloShift: ")" }),
    t("-", "-", "mindinho-direito", { rotuloShift: "_" }),
    t("=", "=", "mindinho-direito", { rotuloShift: "+" }),
    t("backspace", "Apagar", "mindinho-direito", { largura: 2 }),
  ],
  [
    t("tab", "Tab", "mindinho-esquerdo", { largura: 1.5 }),
    ..."qwert".split("").map((l, i) =>
      t(l, l.toUpperCase(), (["mindinho-esquerdo", "anelar-esquerdo", "medio-esquerdo", "indicador-esquerdo", "indicador-esquerdo"] as Dedo[])[i]),
    ),
    ..."yuiop".split("").map((l, i) =>
      t(l, l.toUpperCase(), (["indicador-direito", "indicador-direito", "medio-direito", "anelar-direito", "mindinho-direito"] as Dedo[])[i]),
    ),
    t("´", "´", "mindinho-direito", { rotuloShift: "`" }),
    t("[", "[", "mindinho-direito", { rotuloShift: "{" }),
    t("enter", "Enter", "mindinho-direito", { largura: 1.5 }),
  ],
  [
    t("caps", "Caps", "mindinho-esquerdo", { largura: 1.75 }),
    ..."asdfg".split("").map((l, i) =>
      t(l, l.toUpperCase(), (["mindinho-esquerdo", "anelar-esquerdo", "medio-esquerdo", "indicador-esquerdo", "indicador-esquerdo"] as Dedo[])[i], {
        apoio: l === "f",
      }),
    ),
    ..."hjklç".split("").map((l, i) =>
      t(l, l.toUpperCase(), (["indicador-direito", "indicador-direito", "medio-direito", "anelar-direito", "mindinho-direito"] as Dedo[])[i], {
        apoio: l === "j",
      }),
    ),
    t("~", "~", "mindinho-direito", { rotuloShift: "^" }),
    t("]", "]", "mindinho-direito", { rotuloShift: "}" }),
    t("enter2", "", "mindinho-direito", { largura: 1.25 }),
  ],
  [
    t("shift-esquerdo", "Shift", "mindinho-esquerdo", { largura: 1.25 }),
    t("\\", "\\", "mindinho-esquerdo", { rotuloShift: "|" }),
    ..."zxcvb".split("").map((l, i) =>
      t(l, l.toUpperCase(), (["mindinho-esquerdo", "anelar-esquerdo", "medio-esquerdo", "indicador-esquerdo", "indicador-esquerdo"] as Dedo[])[i]),
    ),
    t("n", "N", "indicador-direito"),
    t("m", "M", "indicador-direito"),
    t(",", ",", "medio-direito", { rotuloShift: "<" }),
    t(".", ".", "anelar-direito", { rotuloShift: ">" }),
    t(";", ";", "mindinho-direito", { rotuloShift: ":" }),
    t("/", "/", "mindinho-direito", { rotuloShift: "?" }),
    t("shift-direito", "Shift", "mindinho-direito", { largura: 2.25 }),
  ],
  [t("espaco", "Espaço", "polegar", { largura: 7 })],
];

const POR_ID = new Map(LINHAS.flat().map((tecla) => [tecla.id, tecla]));

export function acharTecla(id: string) {
  return POR_ID.get(id);
}

/** Caractere com Shift → tecla. */
const SHIFT: Record<string, string> = {};
for (const tecla of LINHAS.flat()) if (tecla.rotuloShift) SHIFT[tecla.rotuloShift] = tecla.id;

/** Acento "morto": aperta a tecla do acento, depois a vogal. */
const ACENTOS: Record<string, { tecla: string; shift: boolean }> = {
  "´": { tecla: "´", shift: false },
  "`": { tecla: "´", shift: true },
  "~": { tecla: "~", shift: false },
  "^": { tecla: "~", shift: true },
};
const COM_ACENTO: Record<string, [string, string]> = {};
for (const [acento, vogais] of [
  ["´", "aeiou"],
  ["`", "a"],
  ["~", "ao"],
  ["^", "aeo"],
] as const) {
  for (const vogal of vogais) {
    const composta = (vogal + { "´": "́", "`": "̀", "~": "̃", "^": "̂" }[acento]).normalize("NFC");
    COM_ACENTO[composta] = [acento, vogal];
  }
}

export interface Pressionar {
  /** Teclas apertadas ao mesmo tempo, na ordem em que aparecem. */
  teclas: string[];
  shift?: "shift-esquerdo" | "shift-direito";
}

const LADO_ESQUERDO = new Set<Dedo>(["mindinho-esquerdo", "anelar-esquerdo", "medio-esquerdo", "indicador-esquerdo"]);

/** Shift do lado oposto ao da tecla, como se ensina no curso. */
function comShift(id: string): Pressionar {
  const tecla = POR_ID.get(id);
  return { teclas: [id], shift: tecla && LADO_ESQUERDO.has(tecla.dedo) ? "shift-direito" : "shift-esquerdo" };
}

/** O que apertar para digitar `caractere` — um ou dois toques (acento + vogal). */
export function comoDigitar(caractere: string): Pressionar[] {
  if (caractere === " ") return [{ teclas: ["espaco"] }];
  const minuscula = caractere.toLowerCase();
  const maiuscula = caractere !== minuscula;

  if (COM_ACENTO[minuscula]) {
    const [acento, vogal] = COM_ACENTO[minuscula];
    const { tecla, shift } = ACENTOS[acento];
    return [shift ? comShift(tecla) : { teclas: [tecla] }, maiuscula ? comShift(vogal) : { teclas: [vogal] }];
  }
  if (POR_ID.has(minuscula) && minuscula.length === 1) return [maiuscula ? comShift(minuscula) : { teclas: [minuscula] }];
  if (SHIFT[caractere]) return [comShift(SHIFT[caractere])];
  if (ACENTOS[caractere]) {
    const { tecla, shift } = ACENTOS[caractere];
    return [shift ? comShift(tecla) : { teclas: [tecla] }];
  }
  return [];
}
