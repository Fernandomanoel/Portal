import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { TutorialGuiadoVisao } from "@/components/guiado/TutorialGuiadoVisao";
import { carregarAtividadeAutocorrigida } from "@/data/atividadesAutocorrigidas";
import { acharAssunto, acharTutorial } from "@/data/guiado";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { rotas } from "@/lib/rotas";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

type Estado =
  | { fase: "carregando" }
  | { fase: "pronta"; atividade: AtividadeAutocorrigida }
  | { fase: "ausente" };

export function GuiadoTutorialPage() {
  const { caminho } = useParams();
  const [estado, definirEstado] = useState<Estado>({ fase: "carregando" });
  const resumo = caminho ? acharTutorial(caminho) : undefined;

  useEffect(() => {
    if (!caminho || !resumo) return;
    let ativo = true;

    carregarAtividadeAutocorrigida(caminho)
      .then((atividade) => {
        if (!ativo) return;
        definirEstado(atividade ? { fase: "pronta", atividade } : { fase: "ausente" });
      })
      .catch(() => ativo && definirEstado({ fase: "ausente" }));

    return () => {
      ativo = false;
    };
  }, [caminho, resumo]);

  if (resumo && estado.fase === "carregando") {
    return <p aria-live="polite">Carregando…</p>;
  }

  if (!resumo || estado.fase !== "pronta") {
    return (
      <>
        <CabecalhoPagina titulo="Atividade não encontrada" voltarPara={rotas.guiado()} />
        <EstadoVazio
          icone="busca"
          titulo="Essa atividade não existe"
          texto="O endereço pode estar desatualizado, ou a atividade ainda não foi adicionada."
          origem="src/data/guiado.ts"
        />
      </>
    );
  }

  const assunto = acharAssunto(resumo.assunto);
  return (
    <TutorialImersivo key={caminho} atividade={estado.atividade} icone={assunto.icone} acento={assunto.acento} />
  );
}

function TutorialImersivo(props: Omit<Parameters<typeof TutorialGuiadoVisao>[0], "sairPara">) {
  useEntrarEmTelaImersiva();
  return <TutorialGuiadoVisao {...props} sairPara={rotas.guiado()} />;
}
