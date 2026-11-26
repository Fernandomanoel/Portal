import { useState } from "react";
import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { CLIPES_DIGITACAO } from "@/data/clipesDigitacao";
import { guardarClipes, lerClipesGuardados } from "@/lib/clipeDigitacao";
import type { Clipe } from "@/types/digitacaoClipe";
import { EscolhaClipe } from "./EscolhaClipe";
import { TreinoClipe } from "./TreinoClipe";
import estilos from "./DigitacaoClipePage.module.css";

/** Digite o Clipe: o vídeo toca em cima e o aluno digita a letra, verso por verso, com a tradução embaixo. */
export function DigitacaoClipePage() {
  const [montados, definirMontados] = useState<Clipe[]>(() => lerClipesGuardados());
  const [aberto, definirAberto] = useState<Clipe | null>(null);

  const atualizar = (lista: Clipe[]) => {
    definirMontados(lista);
    guardarClipes(lista);
  };

  if (aberto) return <TreinoClipe key={aberto.id} clipe={aberto} aoSair={() => definirAberto(null)} />;

  return (
    <div className={estilos.pagina}>
      <CabecalhoPagina titulo="Digite o Clipe" texto="Assista ao vídeo e digite a letra verso por verso. A tradução fica embaixo de cada linha." />
      <EscolhaClipe
        fixos={CLIPES_DIGITACAO}
        montados={montados}
        aoEscolher={definirAberto}
        aoMontar={(clipe) => {
          if (clipe.youtubeId) atualizar([clipe, ...montados]);
          definirAberto(clipe);
        }}
        aoApagar={(id) => atualizar(montados.filter((c) => c.id !== id))}
      />
      <Link to="/digitacao" className={estilos.voltar}>
        <Icone nome="seta-esquerda" tamanho={16} />
        Voltar para Digitação
      </Link>
    </div>
  );
}
