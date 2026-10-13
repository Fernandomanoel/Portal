import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from "react";

import { Icone } from "@/components/Icone";
import estilos from "./PalcoDigitacao.module.css";

export interface PalcoRef {
  focar: () => void;
}

interface Props {
  children: ReactNode;
  /** Cada caractere digitado, já com acento e maiúscula resolvidos pelo teclado. */
  aoCaractere: (caractere: string) => void;
  /** Teclas de comando: Enter, Escape, Backspace. */
  aoComando?: (tecla: "Enter" | "Escape" | "Backspace") => void;
  /** Enquanto true, o aviso de "clique para jogar" não aparece (ex.: tela de nível concluído). */
  semAviso?: boolean;
  /** Fora de foco o jogo para: quem saiu da tela não perde vida sem ver. */
  aoMudarFoco?: (focado: boolean) => void;
  className?: string;
  rotulo: string;
}

/**
 * Cena do jogo com um campo invisível que recebe as teclas. O campo fica
 * sempre vazio: cada caractere é entregue ao jogo e some. Clicar em qualquer
 * ponto da cena devolve o foco ao campo.
 */
export const PalcoDigitacao = forwardRef<PalcoRef, Props>(function PalcoDigitacao(
  { children, aoCaractere, aoComando, semAviso, aoMudarFoco, className, rotulo },
  ref,
) {
  const campoRef = useRef<HTMLInputElement>(null);
  const [focado, definirFocado] = useState(false);

  useImperativeHandle(ref, () => ({ focar: () => campoRef.current?.focus() }), []);

  useEffect(() => {
    campoRef.current?.focus();
  }, []);

  function mudarFoco(valor: boolean) {
    definirFocado(valor);
    aoMudarFoco?.(valor);
  }

  function entregar(texto: string) {
    for (const caractere of texto) aoCaractere(caractere);
  }

  return (
    <div className={[estilos.palco, className].filter(Boolean).join(" ")} onClick={() => campoRef.current?.focus()}>
      {children}

      {!focado && !semAviso && (
        <button type="button" className={estilos.aviso} onClick={() => campoRef.current?.focus()}>
          <Icone nome="digitacao" tamanho={22} />
          Clique aqui para jogar
          <small>O jogo fica parado enquanto o teclado não está na cena.</small>
        </button>
      )}

      <input
        ref={campoRef}
        className={estilos.campo}
        aria-label={rotulo}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onFocus={() => mudarFoco(true)}
        onBlur={() => mudarFoco(false)}
        onPaste={(evento) => evento.preventDefault()}
        onChange={(evento) => {
          const campo = evento.currentTarget;
          // Acento no Linux/Mac chega em composição: espera a letra final.
          if ((evento.nativeEvent as InputEvent).isComposing) return;
          entregar(campo.value);
          campo.value = "";
        }}
        onCompositionEnd={(evento) => {
          entregar(evento.currentTarget.value);
          evento.currentTarget.value = "";
        }}
        onKeyDown={(evento) => {
          if (evento.key === "Enter" || evento.key === "Escape" || evento.key === "Backspace") {
            evento.preventDefault();
            aoComando?.(evento.key);
          }
          if (evento.key === "Tab") evento.preventDefault();
        }}
      />
    </div>
  );
});
