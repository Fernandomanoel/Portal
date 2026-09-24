import type { ReactNode, RefObject } from "react";

import { Icone, type NomeIcone } from "@/components/Icone";
import { BotaoOuvir } from "./BotaoOuvir";
import estilos from "./CartaoGuiado.module.css";

interface Props {
  visual: ReactNode;
  titulo: string;
  tituloRef?: RefObject<HTMLHeadingElement | null>;
  etiqueta?: string;
  numero?: number;
  texto?: string;
  /** O que o botão "Ouvir" fala; sem isso, fala o título e o texto. */
  narracao?: string;
}

/** Imagem de um lado, frase grande e botão "Ouvir" do outro: nenhuma instrução aparece só em texto. */
export function CartaoGuiado({ visual, titulo, tituloRef, etiqueta, numero, texto, narracao }: Props) {
  const falado = narracao ?? (texto ? `${titulo} ${texto}` : titulo);

  return (
    <article className={numero !== undefined ? `${estilos.cartao} ${estilos.comNumero}` : estilos.cartao}>
      {numero !== undefined && (
        <p className={estilos.numero} aria-hidden="true">
          <span className={estilos.numeroRotulo}>Passo</span>
          <span className={estilos.numeroValor}>{numero}</span>
        </p>
      )}
      <div className={estilos.visual}>{visual}</div>
      <div className={estilos.conteudo}>
        {etiqueta && <p className={estilos.etiqueta}>{etiqueta}</p>}
        <h1 ref={tituloRef} tabIndex={-1} className={estilos.titulo}>
          {titulo}
        </h1>
        {texto && <p className={estilos.texto}>{texto}</p>}
        <BotaoOuvir texto={falado} />
      </div>
    </article>
  );
}

/** Enquanto a imagem do passo não chega, o ícone do assunto ocupa o lugar dela. */
export function VisualIcone({ icone, destaque }: { icone: NomeIcone; destaque?: boolean }) {
  return (
    <div className={destaque ? `${estilos.visualIcone} ${estilos.visualDestaque}` : estilos.visualIcone}>
      <Icone nome={icone} tamanho={destaque ? 104 : 88} />
    </div>
  );
}

export function VisualImagem({ url, alt }: { url: string; alt: string }) {
  return (
    <figure className={estilos.imagem}>
      <img src={url} alt={alt} />
    </figure>
  );
}
