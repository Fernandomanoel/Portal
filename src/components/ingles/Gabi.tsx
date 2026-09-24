import gabiAcertou from "@/assets/ingles/gabi-acertou.png";
import gabiErrou from "@/assets/ingles/gabi-errou.png";
import gabiExplicando from "@/assets/ingles/gabi-explicando.png";
import gabiNeutra from "@/assets/ingles/gabi-neutra.png";
import estilos from "./Gabi.module.css";

export type HumorGabi = "neutra" | "explicando" | "acertou" | "errou";

const IMAGEM: Record<HumorGabi, string> = {
  neutra: gabiNeutra,
  explicando: gabiExplicando,
  acertou: gabiAcertou,
  errou: gabiErrou,
};

const DESCRICAO: Record<HumorGabi, string> = {
  neutra: "Gabi sorrindo",
  explicando: "Gabi apontando para o exercício",
  acertou: "Gabi comemorando",
  errou: "Gabi fazendo cara de quem vai ajudar",
};

interface Props {
  humor: HumorGabi;
  /** `corpo`: em pé ao lado do exercício (computador). `busto`: recorte do rosto, ao lado do balão (celular). */
  variante?: "corpo" | "busto";
}

/** A Gabi ao lado do exercício, como a professora ao lado do quadro. A pose muda com a resposta. */
export function Gabi({ humor, variante = "corpo" }: Props) {
  return (
    <img
      key={humor}
      src={IMAGEM[humor]}
      alt={DESCRICAO[humor]}
      className={variante === "busto" ? `${estilos.gabi} ${estilos.busto}` : estilos.gabi}
      draggable={false}
    />
  );
}
