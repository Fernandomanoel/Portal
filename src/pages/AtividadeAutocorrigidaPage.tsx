import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { AtividadeAutocorrigidaVisao } from "@/components/atividades/AtividadeAutocorrigida";
import { carregarAtividadeAutocorrigida } from "@/data/atividadesAutocorrigidas";
import { rotas } from "@/lib/rotas";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

type Estado =
  | { fase: "carregando" }
  | { fase: "pronta"; atividade: AtividadeAutocorrigida }
  | { fase: "ausente" };

export function AtividadeAutocorrigidaPage() {
  const { curso, atividade: caminho } = useParams();
  const [estado, definirEstado] = useState<Estado>({ fase: "carregando" });

  useEffect(() => {
    let ativo = true;
    if (!caminho) {
      definirEstado({ fase: "ausente" });
      return;
    }

    carregarAtividadeAutocorrigida(caminho)
      .then((atividade) => {
        if (!ativo) return;
        definirEstado(atividade ? { fase: "pronta", atividade } : { fase: "ausente" });
      })
      .catch(() => ativo && definirEstado({ fase: "ausente" }));

    return () => {
      ativo = false;
    };
  }, [caminho]);

  const voltarPara = curso ? rotas.curso(curso) : rotas.atividades();

  if (estado.fase === "carregando") {
    return <p aria-live="polite">Carregando a atividade…</p>;
  }

  if (estado.fase === "ausente") {
    return (
      <>
        <CabecalhoPagina titulo="Atividade não encontrada" voltarPara={voltarPara} />
        <EstadoVazio
          icone="busca"
          titulo="Essa atividade não existe"
          texto="O endereço pode estar desatualizado, ou a atividade ainda não foi adicionada ao portal."
          origem="src/data/atividadesAutocorrigidas/"
        />
      </>
    );
  }

  return (
    <>
      <CabecalhoPagina titulo={estado.atividade.titulo} voltarPara={voltarPara} />
      <AtividadeAutocorrigidaVisao atividade={estado.atividade} />
    </>
  );
}
