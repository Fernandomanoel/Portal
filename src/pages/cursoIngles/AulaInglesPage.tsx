import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { EstadoVazio } from "@/components/EstadoVazio";
import { NarracaoAulaProvider } from "@/components/cursoIngles/NarracaoAula";
import { PlayerAula } from "@/components/cursoIngles/PlayerAula";
import { obterAulaIngles } from "@/lib/apiCursoIngles";
import { ErroApi } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import type { AulaIngles } from "@/types/aulaIngles";

type Estado = { fase: "carregando" } | { fase: "senha" } | { fase: "erro"; mensagem: string } | { fase: "pronta"; aula: AulaIngles };

export function AulaInglesPage() {
  const { aula: id = "" } = useParams();
  const [estado, definirEstado] = useState<Estado>({ fase: "carregando" });

  useEffect(() => {
    let ativo = true;
    obterAulaIngles(id).then(
      (aula) => ativo && definirEstado({ fase: "pronta", aula }),
      (falha) => {
        if (!ativo) return;
        if (falha instanceof ErroApi && falha.status === 401) definirEstado({ fase: "senha" });
        else definirEstado({ fase: "erro", mensagem: falha instanceof ErroApi ? falha.message : "Não foi possível abrir a aula. Tente de novo." });
      },
    );
    return () => {
      ativo = false;
    };
  }, [id]);

  if (estado.fase === "carregando") return <p role="status">Carregando a aula…</p>;
  // Sem o acesso (ou com ele vencido), volta para a tela de senha.
  if (estado.fase === "senha") return <Navigate to={rotas.cursoIngles()} replace />;
  if (estado.fase === "erro") {
    return (
      <>
        <EstadoVazio icone="alerta" titulo="Não foi possível abrir a aula" texto={estado.mensagem} />
        <p>
          <Link to={rotas.cursoIngles()}>Voltar ao Curso de Inglês</Link>
        </p>
      </>
    );
  }
  return (
    <NarracaoAulaProvider>
      <PlayerAula aula={estado.aula} />
    </NarracaoAulaProvider>
  );
}
