import type { ReactNode } from "react";

import type { EstadoLinha } from "@/lib/aulaIngles";
import estilos from "./LinhaPratica.module.css";

/** Cartão de uma questão: a borda e o fundo mostram, depois de conferir, se está certa ou errada. */
export function LinhaPratica({ estado, children, coluna = false }: { estado: EstadoLinha; children: ReactNode; coluna?: boolean }) {
  return (
    <div className={`${estilos.linha} ${coluna ? estilos.coluna : ""}`} data-estado={estado}>
      {children}
    </div>
  );
}
