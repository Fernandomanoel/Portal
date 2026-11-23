import { useEffect } from "react";

import type { AreaId } from "@/types/acesso";

/** Marca a área na página (`body[data-area]`): a de Inglês troca o azul pelo verde-água em `tokens.css`. */
export function useAreaVisual(area: AreaId | null, ignorar = false) {
  useEffect(() => {
    if (ignorar) return;
    if (area) document.body.dataset.area = area;
    else delete document.body.dataset.area;
    return () => {
      delete document.body.dataset.area;
    };
  }, [area, ignorar]);
}
