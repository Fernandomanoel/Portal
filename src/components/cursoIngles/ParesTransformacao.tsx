import { Icone } from "@/components/Icone";
import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./ParesTransformacao.module.css";

export function ParesTransformacao({ bloco }: { bloco: BlocoDoTipo<"pares-transformacao"> }) {
  return (
    <ul className={estilos.lista}>
      {bloco.pares.map((par) => (
        <li key={par.antes.fala} className={estilos.par}>
          <div className={estilos.antes}>
            <span>
              <Rico texto={par.antes.texto} />
            </span>
            <BotaoFala texto={par.antes.fala} />
          </div>
          <Icone nome="seta-direita" tamanho={22} className={estilos.seta} />
          <div className={estilos.depois}>
            <span>
              <Rico texto={par.depois.texto} />
            </span>
            <BotaoFala texto={par.depois.fala} />
          </div>
        </li>
      ))}
    </ul>
  );
}
