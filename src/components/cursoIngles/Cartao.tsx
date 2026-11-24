import type { BlocoDoTipo } from "@/types/aulaIngles";
import { BlocoAula } from "./BlocoAula";
import { Rico } from "./Rico";
import estilos from "./Cartao.module.css";

export function Cartao({ bloco }: { bloco: BlocoDoTipo<"cartao"> }) {
  return (
    <section className={estilos.cartao}>
      <h3 className={estilos.titulo}>
        <Rico texto={bloco.titulo} />
      </h3>
      {bloco.descricao && <p className={estilos.descricao}>{bloco.descricao}</p>}
      {bloco.blocos.map((filho, i) => (
        <BlocoAula key={i} bloco={filho} />
      ))}
    </section>
  );
}
