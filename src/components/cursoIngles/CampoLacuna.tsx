import type { EstadoLinha } from "@/lib/aulaIngles";
import type { TrechoLacuna } from "@/types/aulaIngles";
import estilos from "./CampoLacuna.module.css";

interface Props {
  trecho: Extract<TrechoLacuna, { lacuna: number }>;
  valor: string;
  estado: EstadoLinha;
  aoMudar: (valor: string) => void;
}

/** Lacuna numerada dentro de um texto: «(3) [______]». */
export function CampoLacuna({ trecho, valor, estado, aoMudar }: Props) {
  return (
    <span className={estilos.lacuna}>
      <strong className={estilos.numero}>({trecho.lacuna})</strong>
      <input
        type="text"
        className={estilos.campo}
        data-largura={trecho.largura ?? "m"}
        data-estado={estado}
        value={valor}
        aria-label={`Gap ${trecho.lacuna}`}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        onChange={(e) => aoMudar(e.target.value)}
      />
    </span>
  );
}
