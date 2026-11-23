import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import { Rico } from "./Rico";
import estilos from "./DestaqueRegra.module.css";

export function DestaqueRegra({ bloco }: { bloco: BlocoDoTipo<"destaque-regra"> }) {
  return (
    <section id={bloco.ancora} className={estilos.painel}>
      <div className={estilos.topo}>
        <span className={estilos.etiqueta}>{bloco.etiqueta}</span>
        <h3 className={estilos.titulo}>{bloco.titulo}</h3>
      </div>
      <p className={estilos.texto}>
        <Rico texto={bloco.texto} />
      </p>
      <div className={estilos.grupos}>
        {bloco.grupos.map((grupo) => (
          <div key={grupo.titulo} className={estilos.grupo}>
            <span className={estilos.grupoTitulo}>{grupo.titulo}</span>
            <ul className={estilos.itens}>
              {grupo.itens.map((item) => (
                <li key={item.fala} className={estilos.item}>
                  <span>
                    <Rico texto={item.texto} />
                  </span>
                  <BotaoFala texto={item.fala} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
