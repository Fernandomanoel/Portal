import { useState } from "react";
import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { CLIPES_DIGITACAO } from "@/data/clipesDigitacao";
import type { Clipe } from "@/types/digitacaoClipe";
import { TreinoClipe } from "./TreinoClipe";
import estilos from "./DigitacaoClipePage.module.css";

/** Digite o Clipe: o vídeo toca em cima e o aluno digita a letra, verso por verso. */
export function DigitacaoClipePage() {
  const [aberto, definirAberto] = useState<Clipe | null>(null);

  if (aberto) return <TreinoClipe key={aberto.id} clipe={aberto} aoSair={() => definirAberto(null)} />;

  return (
    <div className={estilos.pagina}>
      <CabecalhoPagina titulo="Digite o Clipe" texto="Escolha um clipe, assista e digite a letra verso por verso." />
      <ul className={estilos.lista}>
        {CLIPES_DIGITACAO.map((c) => (
          <li key={c.id}>
            <button type="button" className={estilos.cartao} onClick={() => definirAberto(c)}>
              <img src={c.capa} alt="" loading="lazy" />
              <span>
                <strong>{c.titulo}</strong>
                <small>
                  {c.artista} · {c.linhas.length} versos
                </small>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Link to="/digitacao" className={estilos.voltar}>
        <Icone nome="seta-esquerda" tamanho={16} />
        Voltar para Digitação
      </Link>
    </div>
  );
}
