import { useState } from "react";

import { EstadoVazio } from "@/components/EstadoVazio";
import { ListaProvas } from "@/components/provas/ListaProvas";
import { ProvasLock } from "@/components/provas/ProvasLock";
import { PROVAS_INGLES } from "@/data/ingles";
import { guardarFicha } from "@/lib/unidade";
import type { FichaUnidade } from "@/types/unidade";

export function IngresProvasPage() {
  // Mesma regra das provas de ADM: a senha da unidade vale só enquanto a aba está aberta.
  const [ficha, definirFicha] = useState<FichaUnidade | null>(null);

  if (!ficha) {
    return (
      <ProvasLock
        titulo="Provas de Inglês"
        texto="Escolha a sua unidade e digite a senha dela. As provas só abrem com a senha, e as respostas dos alunos vão para a unidade escolhida."
        aoEntrar={(nova) => {
          guardarFicha(nova);
          definirFicha(nova);
        }}
      />
    );
  }

  if (PROVAS_INGLES.length === 0) {
    return (
      <EstadoVazio
        icone="prova"
        titulo="Nenhuma prova de inglês ainda"
        texto="As provas de inglês aparecem aqui assim que forem adicionadas."
        origem="src/data/ingles.ts"
      />
    );
  }

  return <ListaProvas arquivos={PROVAS_INGLES} categoria="ingles" />;
}
