import { useEffect, useRef, useState } from "react";

import { Icone } from "@/components/Icone";
import estilos from "./QuizAceitarResultado.module.css";

interface Props {
  notaProvisoria: number;
  aRevisar: number;
  enviando: boolean;
  erro: string | null;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

/**
 * Dois passos de propósito: aceitar aqui fecha a nota na hora, sem o
 * professor revisar depois — precisa ser bem difícil de clicar sem querer.
 */
export function QuizAceitarResultado({ notaProvisoria, aRevisar, enviando, erro, aoConfirmar, aoCancelar }: Props) {
  const [passo, definirPasso] = useState<"perguntar" | "confirmar">("perguntar");
  const botaoRef = useRef<HTMLButtonElement>(null);
  const plural = aRevisar === 1 ? "questão" : "questões";

  useEffect(() => {
    botaoRef.current?.focus();
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") aoCancelar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [passo, aoCancelar]);

  const notaTexto = notaProvisoria.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className={estilos.fundo}>
      <div className={estilos.caixa} role="alertdialog" aria-modal="true" aria-labelledby="aceitar-titulo" aria-describedby="aceitar-texto">
        {passo === "perguntar" ? (
          <>
            <h2 id="aceitar-titulo" className={estilos.titulo}>
              Aceitar a nota {notaTexto} agora?
            </h2>
            <p id="aceitar-texto" className={estilos.texto}>
              {aRevisar} {plural} sua{aRevisar === 1 ? "" : "s"} {aRevisar === 1 ? "ficaria" : "ficariam"} para o professor(a) conferir.
              Aceitando agora, essa{aRevisar === 1 ? "" : "s"} {plural} conta{aRevisar === 1 ? "" : "m"} como errada{aRevisar === 1 ? "" : "s"} de
              uma vez — o professor não vai mais revisar essa parte.
            </p>
            <div className={estilos.acoes}>
              <button type="button" ref={botaoRef} className={estilos.confirmar} onClick={() => definirPasso("confirmar")}>
                Sim, quero aceitar
              </button>
              <button type="button" className={estilos.cancelar} onClick={aoCancelar}>
                Prefiro esperar o professor
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="aceitar-titulo" className={estilos.titulo}>
              Tem certeza mesmo?
            </h2>
            <div className={estilos.aviso}>
              <Icone nome="alerta" tamanho={22} />
              <span>Depois de confirmar, essa nota não muda mais. Não tem como voltar atrás nem pedir revisão depois.</span>
            </div>
            {erro && (
              <p className={estilos.erro} role="alert">
                {erro}
              </p>
            )}
            <div className={estilos.acoes}>
              <button type="button" ref={botaoRef} className={estilos.confirmar} onClick={aoConfirmar} disabled={enviando}>
                {enviando ? "Confirmando…" : "Sim, tenho certeza"}
              </button>
              <button type="button" className={estilos.cancelar} onClick={aoCancelar} disabled={enviando}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
