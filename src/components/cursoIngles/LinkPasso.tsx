import type { BlocoDoTipo } from "@/types/aulaIngles";
import { useNavegacaoAula } from "./contextoAula";
import { Rico } from "./Rico";
import estilos from "./LinkPasso.module.css";

export function LinkPasso({ bloco }: { bloco: BlocoDoTipo<"link-passo"> }) {
  const { irPara } = useNavegacaoAula();
  return (
    <div className={estilos.caixa}>
      <p className={estilos.texto}>
        <Rico texto={bloco.antes} />{" "}
        <button type="button" className={estilos.link} onClick={() => irPara(bloco.passo, bloco.ancora)}>
          {bloco.rotuloLink}
        </button>
        <Rico texto={bloco.depois} />
      </p>
    </div>
  );
}
