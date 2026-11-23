import { useCallback, useMemo, useState, type ReactNode } from "react";

import { useDialogoSimulado } from "@/hooks/useDialogoSimulado";
import { useNarracao } from "@/hooks/useNarracao";
import { NarracaoContexto, type NarracaoAula } from "./contextoAula";

/** Uma voz só para a aula inteira: falar de um botão interrompe o outro, e o diálogo simulado também. */
export function NarracaoAulaProvider({ children }: { children: ReactNode }) {
  const { suportado, estado, falar: falarBase, parar: pararBase } = useNarracao({ idioma: "en-US", velocidade: 0.9 });
  const dialogo = useDialogoSimulado();
  const [chave, definirChave] = useState<string | null>(null);
  const pararDialogo = dialogo.parar;

  const falar = useCallback(
    (nova: string, texto: string, velocidade?: number) => {
      pararDialogo(false);
      definirChave(nova);
      falarBase(texto, velocidade);
    },
    [falarBase, pararDialogo],
  );

  const pararTudo = useCallback(() => {
    pararDialogo(false);
    pararBase();
  }, [pararBase, pararDialogo]);

  const valor = useMemo<NarracaoAula>(
    () => ({
      suportado,
      falandoChave: estado === "falando" ? chave : null,
      falar,
      pararTudo,
      dialogo: {
        tocando: dialogo.tocando,
        rotuloAtual: dialogo.rotuloAtual,
        tocar: (roteiro) => {
          pararBase();
          dialogo.tocar(roteiro);
        },
        parar: () => dialogo.parar(true),
      },
    }),
    [suportado, estado, chave, falar, pararTudo, pararBase, dialogo],
  );

  return <NarracaoContexto.Provider value={valor}>{children}</NarracaoContexto.Provider>;
}
