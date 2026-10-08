import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import estilos from "./MenuSuspenso.module.css";

interface Props {
  /** Conteúdo do botão que abre o menu. */
  gatilho: ReactNode;
  rotulo: string;
  classeGatilho?: string;
  alinhar?: "inicio" | "fim";
  /** Recebe `fechar` para as ações que encerram o menu. */
  children: (fechar: () => void) => ReactNode;
}

/** Painel que abre sob um botão; fecha com Esc, clique fora ou pela própria ação. */
export function MenuSuspenso({ gatilho, rotulo, classeGatilho, alinhar = "inicio", children }: Props) {
  const [aberto, definirAberto] = useState(false);
  const [posicao, definirPosicao] = useState<{ top: number; left: number } | null>(null);
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const id = useId();

  // O painel fica em posição fixa na tela: dentro da grade, que rola, ele seria cortado.
  useLayoutEffect(() => {
    if (!aberto || !botao.current || !painel.current) return;
    const caixa = botao.current.getBoundingClientRect();
    const largura = painel.current.offsetWidth;
    const altura = painel.current.offsetHeight;
    let left = alinhar === "fim" ? caixa.right - largura : caixa.left;
    left = Math.max(8, Math.min(left, window.innerWidth - largura - 8));
    let top = caixa.bottom + 6;
    if (top + altura > window.innerHeight - 8 && caixa.top - altura - 6 > 8) top = caixa.top - altura - 6;
    definirPosicao({ top, left });
  }, [aberto, alinhar]);

  useEffect(() => {
    if (posicao) painel.current?.querySelector<HTMLElement>("input, select, textarea, button:not(:disabled)")?.focus();
  }, [posicao]);

  useEffect(() => {
    if (!aberto) return;
    const rolou = (evento: Event) => {
      if (!painel.current?.contains(evento.target as Node)) definirAberto(false);
    };
    window.addEventListener("scroll", rolou, true);
    window.addEventListener("resize", rolou);
    const fora = (evento: PointerEvent) => {
      if (!raiz.current?.contains(evento.target as Node)) definirAberto(false);
    };
    const tecla = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        definirAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", tecla);
      window.removeEventListener("scroll", rolou, true);
      window.removeEventListener("resize", rolou);
    };
  }, [aberto]);

  const fechar = () => {
    definirAberto(false);
    botao.current?.focus();
  };

  return (
    <div className={estilos.raiz} ref={raiz}>
      <button
        ref={botao}
        type="button"
        className={classeGatilho}
        aria-label={rotulo}
        aria-expanded={aberto}
        aria-controls={aberto ? id : undefined}
        onClick={() => {
          definirPosicao(null);
          definirAberto((a) => !a);
        }}
      >
        {gatilho}
      </button>
      {aberto && (
        <div id={id} ref={painel} role="dialog" aria-label={rotulo} className={estilos.painel}
          style={posicao ? { top: posicao.top, left: posicao.left } : { visibility: "hidden" }}
        >
          {children(fechar)}
        </div>
      )}
    </div>
  );
}
