import type { BlocoDoTipo } from "@/types/aulaIngles";
import { Rico } from "./Rico";
import estilos from "./Aviso.module.css";

export function Aviso({ bloco }: { bloco: BlocoDoTipo<"aviso"> }) {
  return (
    <div className={estilos.aviso} role="note">
      <p className={estilos.texto}>
        <Rico texto={bloco.texto} />
      </p>
    </div>
  );
}
