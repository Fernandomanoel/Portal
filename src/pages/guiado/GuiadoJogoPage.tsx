import type { ComponentType } from "react";
import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { rotas } from "@/lib/rotas";
import { OQueEOMouseJogo } from "./jogos/OQueEOMouseJogo";

/** Cada jogo tem mecânica própria, então é um componente por slug — como os jogos de Digitação. */
const JOGOS: Record<string, ComponentType> = {
  "o-que-e-o-mouse": OQueEOMouseJogo,
};

export function GuiadoJogoPage() {
  const { slug } = useParams();
  const Jogo = slug ? JOGOS[slug] : undefined;

  if (!Jogo) {
    return (
      <>
        <CabecalhoPagina titulo="Jogo não encontrado" voltarPara={rotas.guiado()} />
        <EstadoVazio
          icone="busca"
          titulo="Esse jogo não existe"
          texto="O endereço pode estar desatualizado, ou o jogo ainda não foi adicionado."
          origem="src/pages/guiado/GuiadoJogoPage.tsx"
        />
      </>
    );
  }

  return <Jogo />;
}
