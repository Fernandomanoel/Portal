import { useState } from "react";

import { Icone } from "@/components/Icone";
import { limparProgresso } from "@/lib/progressoDigitacao";
import estilos from "./BotaoRecomecar.module.css";

/** Apaga o progresso do jogo neste navegador e volta ao início. Pede confirmação antes. */
export function BotaoRecomecar({ chave }: { chave: string }) {
  const [confirmando, definirConfirmando] = useState(false);

  if (confirmando) {
    return (
      <span className={estilos.confirmar} role="alertdialog" aria-label="Confirmar recomeço">
        <span>Apagar o progresso e recomeçar?</span>
        <button
          type="button"
          className={estilos.sim}
          onClick={(evento) => {
            evento.stopPropagation();
            limparProgresso(chave);
            // O jogo lê o progresso ao abrir: recarregar é o jeito certo de voltar ao nível 1.
            window.location.reload();
          }}
        >
          Apagar
        </button>
        <button type="button" className={estilos.botao} onClick={() => definirConfirmando(false)}>
          Cancelar
        </button>
      </span>
    );
  }
  return (
    <button type="button" className={estilos.botao} onClick={(evento) => { evento.stopPropagation(); definirConfirmando(true); }}>
      <Icone nome="recomecar" tamanho={15} />
      Recomeçar do zero
    </button>
  );
}
