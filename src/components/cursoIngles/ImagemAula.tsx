import { useState } from "react";

import estilos from "./ImagemAula.module.css";

/** Foto da aula; se o endereço falhar (as fotos são de outro site), mostra uma moldura com o nome em vez de quebrar. */
export function ImagemAula({ src, alt, reserva, alta = false }: { src: string; alt: string; reserva: string; alta?: boolean }) {
  const [falhou, definirFalhou] = useState(false);
  if (falhou) {
    return (
      <div className={`${estilos.reserva} ${alta ? estilos.alta : ""}`} role="img" aria-label={alt}>
        {reserva}
      </div>
    );
  }
  return <img className={`${estilos.imagem} ${alta ? estilos.alta : ""}`} src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => definirFalhou(true)} />;
}
