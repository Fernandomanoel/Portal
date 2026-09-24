import { DesenhoInterativo, type ParteDesenho } from "./DesenhoInterativo";

export type ParteMouse = "esquerdo" | "direito" | "rodinha";

const PARTES: ParteDesenho<ParteMouse>[] = [
  { id: "esquerdo", rotulo: "Botão esquerdo", desenho: <path data-forma d="M120 150 H40 V120 A80 80 0 0 1 120 40 Z" /> },
  { id: "direito", rotulo: "Botão direito", desenho: <path data-forma d="M120 150 H200 V120 A80 80 0 0 0 120 40 Z" /> },
  { id: "rodinha", rotulo: "Rodinha", desenho: <rect data-forma x={106} y={62} width={28} height={52} rx={14} /> },
];

const FUNDO = (
  <>
    <path data-linha d="M120 40 C120 22 146 12 150 0" />
    <path data-fundo d="M40 150 V210 A80 80 0 0 0 200 210 V150 Z" />
  </>
);

interface Props {
  interativo: boolean;
  destacada?: ParteMouse | null;
  encontradas?: Set<ParteMouse>;
  aoEscolher?: (parte: ParteMouse) => void;
}

/** Mouse visto de cima. */
export function MouseDesenho(props: Props) {
  return <DesenhoInterativo viewBox="0 0 240 320" descricao="Desenho de um mouse" fundo={FUNDO} partes={PARTES} {...props} />;
}
