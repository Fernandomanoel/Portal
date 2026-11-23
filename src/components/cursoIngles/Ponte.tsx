import { Icone } from "@/components/Icone";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./Ponte.module.css";

export function Ponte({ bloco }: { bloco: BlocoDoTipo<"ponte"> }) {
  return (
    <div className={estilos.ponte}>
      <div className={estilos.antes}>
        <span>
          <Rico texto={bloco.antes.texto} />
        </span>
        <BotaoFala texto={bloco.antes.fala} escuro />
      </div>
      <Icone nome="seta-baixo" tamanho={26} className={estilos.seta} />
      <div className={estilos.depois}>
        <span>
          <Rico texto={bloco.depois.texto} />
        </span>
        <BotaoFala texto={bloco.depois.fala} escuro />
      </div>
    </div>
  );
}
