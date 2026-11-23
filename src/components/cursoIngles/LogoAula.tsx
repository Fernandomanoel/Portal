import { useState } from "react";

import type { AulaIngles } from "@/types/aulaIngles";
import estilos from "./LogoAula.module.css";

/** Logotipo da aula (o da F1, como no original). Se a imagem de outro site não carregar, mostra o selo de reserva. */
export function LogoAula({ logo }: { logo: NonNullable<AulaIngles["logo"]> }) {
  const [falhou, definirFalhou] = useState(false);
  if (falhou) {
    return (
      <span className={estilos.reserva}>
        <span className={estilos.ponto} aria-hidden="true" />
        {logo.reserva}
      </span>
    );
  }
  return <img className={estilos.logo} src={logo.src} alt={logo.alt} referrerPolicy="no-referrer" onError={() => definirFalhou(true)} />;
}
