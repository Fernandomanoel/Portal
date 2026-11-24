import { Outlet } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";

export function IngresHubPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Conversação"
        texto="Práticas organizadas por habilidade: vocabulário com imagens, frases, conversas com a Gabi, o inglês da vida real e textos para ouvir."
      />
      <Outlet />
    </>
  );
}
