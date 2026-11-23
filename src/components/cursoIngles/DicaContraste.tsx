import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./DicaContraste.module.css";

export function DicaContraste({ bloco }: { bloco: BlocoDoTipo<"dica-contraste"> }) {
  return (
    <div className={estilos.caixa}>
      <p className={estilos.titulo}>{bloco.titulo}</p>
      <p className={estilos.intro}>
        <Rico texto={bloco.intro} />
      </p>
      <div className={estilos.colunas}>
        {bloco.colunas.map((coluna) => (
          <div key={coluna.fala} className={estilos.coluna}>
            <p className={estilos.explicacao}>
              <Rico texto={coluna.texto} />
            </p>
            <div className={estilos.exemplo}>
              <span className={estilos.frase}>{coluna.exemplo}</span>
              <BotaoFala texto={coluna.fala} escuro />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
