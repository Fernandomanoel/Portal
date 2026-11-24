import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BotaoFala } from "./BotaoFala";
import estilos from "./ListaOuvir.module.css";

export function ListaOuvir({ bloco }: { bloco: BlocoDoTipo<"lista-ouvir"> }) {
  return (
    <ul className={estilos.lista}>
      {bloco.itens.map((item, i) => (
        <li key={i} className={estilos.item}>
          <p className={estilos.texto}>
            <span className={estilos.numero}>{i + 1}</span>
            {item.texto}
          </p>
          <BotaoFala texto={item.fala} rotulo={bloco.rotuloOuvir} />
        </li>
      ))}
    </ul>
  );
}
