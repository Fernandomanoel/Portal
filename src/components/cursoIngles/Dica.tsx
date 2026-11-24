import type { BlocoDoTipo } from "@/types/aulaIngles";
import { Rico } from "./Rico";
import estilos from "./Dica.module.css";

export function Dica({ bloco }: { bloco: BlocoDoTipo<"dica"> }) {
  return (
    <div className={estilos.dica}>
      <strong>{bloco.rotulo}</strong>{" "}
      <span>
        <Rico texto={bloco.texto} />
      </span>
    </div>
  );
}
