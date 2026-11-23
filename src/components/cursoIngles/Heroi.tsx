import type { BlocoDoTipo } from "@/types/aulaIngles";
import estilos from "./Heroi.module.css";

export function Heroi({ bloco }: { bloco: BlocoDoTipo<"heroi"> }) {
  return (
    <section className={estilos.heroi}>
      <span className={estilos.etiqueta}>
        <span className={estilos.ponto} aria-hidden="true" />
        {bloco.etiqueta}
      </span>
      <h2 className={estilos.titulo}>{bloco.titulo}</h2>
      <p className={estilos.texto}>{bloco.texto}</p>
      <div className={estilos.objetivos}>
        <p className={estilos.objetivosTitulo}>{bloco.objetivosTitulo}</p>
        <ul className={estilos.lista}>
          {bloco.objetivos.map((objetivo) => (
            <li key={objetivo}>
              <label className={estilos.objetivo}>
                <input type="checkbox" defaultChecked />
                <span>{objetivo}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
