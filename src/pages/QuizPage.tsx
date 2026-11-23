import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { ErroApi, obterProva } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import { lerFicha } from "@/lib/unidade";
import type { ProvaParaAluno } from "@/types/quiz";

type Estado =
  | { fase: "carregando" }
  | { fase: "pronta"; prova: ProvaParaAluno }
  | { fase: "ausente" }
  | { fase: "falhou"; mensagem: string };

export function QuizPage() {
  const { prova: caminho, categoria } = useParams();
  const volta = categoria === "ingles" ? rotas.inglesProvas() : rotas.provas();
  const provaId = (caminho ?? "").replace(/^\.?\//, "").replace(/\.prova\.ts$/, "");
  const [estado, definirEstado] = useState<Estado>({ fase: "carregando" });

  useEffect(() => {
    let ativo = true;
    if (!provaId) {
      definirEstado({ fase: "ausente" });
      return;
    }

    obterProva(provaId)
      .then((prova) => ativo && definirEstado({ fase: "pronta", prova }))
      .catch((falha) => {
        if (!ativo) return;
        if (falha instanceof ErroApi && falha.status === 404) definirEstado({ fase: "ausente" });
        else definirEstado({ fase: "falhou", mensagem: falha instanceof ErroApi ? falha.message : "Não foi possível abrir a prova." });
      });

    return () => {
      ativo = false;
    };
  }, [provaId]);

  // Sem a senha da unidade não há para onde enviar a prova: volta para a área de Provas.
  if (!lerFicha()) return <Navigate to={volta} replace />;

  if (estado.fase === "carregando") {
    return <p aria-live="polite">Carregando a prova…</p>;
  }

  if (estado.fase === "ausente" || estado.fase === "falhou") {
    return (
      <>
        <CabecalhoPagina titulo={estado.fase === "ausente" ? "Prova não encontrada" : "Prova indisponível"} voltarPara={volta} />
        {estado.fase === "ausente" ? (
          <EstadoVazio
            icone="prova"
            titulo="Essa prova não existe"
            texto="O endereço pode estar desatualizado, ou a prova ainda não foi adicionada ao portal."
            origem="src/data/provasInterativas/"
          />
        ) : (
          <EstadoVazio icone="alerta" titulo="Não deu para abrir a prova" texto={estado.mensagem} />
        )}
      </>
    );
  }

  return <QuizContainer prova={estado.prova} provaId={provaId} voltarPara={volta} />;
}
