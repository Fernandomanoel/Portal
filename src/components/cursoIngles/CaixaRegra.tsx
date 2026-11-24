import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./CaixaRegra.module.css";

export function CaixaRegra({ bloco }: { bloco: BlocoDoTipo<"caixa-regra"> }) {
  return (
    <div className={estilos.caixa}>
      <p className={estilos.texto}>
        <Rico texto={bloco.texto} />
      </p>
      <BotaoFala texto={bloco.fala} rotulo={bloco.rotuloOuvir} />
    </div>
  );
}
