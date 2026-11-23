import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BlocoAula } from "./BlocoAula";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./CartaoExemplos.module.css";

export function CartaoExemplos({ bloco }: { bloco: BlocoDoTipo<"cartao-exemplos"> }) {
  return (
    <section className={estilos.cartao} data-tom={bloco.tom}>
      <div className={estilos.topo}>
        <h3 className={estilos.titulo}>{bloco.titulo}</h3>
        <span className={estilos.formula}>{bloco.formula}</span>
      </div>
      <ul className={estilos.lista}>
        {bloco.exemplos.map((exemplo) => (
          <li key={exemplo.fala} className={estilos.exemplo}>
            <div>
              <p className={estilos.ingles}>
                <Rico texto={exemplo.texto} />
              </p>
              <p className={estilos.traducao}>{exemplo.traducao}</p>
            </div>
            <BotaoFala texto={exemplo.fala} />
          </li>
        ))}
      </ul>
      {bloco.extras?.map((extra, i) => (
        <BlocoAula key={i} bloco={extra} />
      ))}
    </section>
  );
}
