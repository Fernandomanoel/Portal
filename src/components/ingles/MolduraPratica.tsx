import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Icone, type NomeIcone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import { Gabi, type HumorGabi } from "./Gabi";
import estilos from "./MolduraPratica.module.css";

interface Props {
  titulo: string;
  acento: string;
  humor: HumorGabi;
  /** Etiqueta do tipo de tarefa ("Audição", "Diálogo 2 de 5 · No hotel"). */
  etiqueta?: { icone: NomeIcone; texto: string };
  progresso?: { atual: number; total: number };
  pontos?: number;
  children: ReactNode;
  /** Barra de resposta presa embaixo do cartão. */
  rodape?: ReactNode;
}

/**
 * Tela de toda prática de inglês: a Gabi em pé à esquerda e o cartão do
 * exercício saindo dela como um balão de fala. O cabeçalho mostra só o
 * caminho de volta, o progresso e os pontos.
 */
export function MolduraPratica({ titulo, acento, humor, etiqueta, progresso, pontos, children, rodape }: Props) {
  const porcentagem = progresso ? Math.round((progresso.atual / progresso.total) * 100) : 0;

  return (
    <div className={estilos.tela} style={{ "--acento": acento } as CSSProperties}>
      <header className={estilos.topo}>
        <Link to={rotas.inglesAtividades()} className={estilos.voltar}>
          <Icone nome="seta-esquerda" tamanho={18} />
          Inglês
        </Link>
        <p className={estilos.titulo}>{titulo}</p>
        {progresso && (
          <div className={estilos.progresso}>
            <span className={estilos.progressoTexto}>
              {progresso.atual} de {progresso.total}
            </span>
            <div
              className={estilos.trilho}
              role="progressbar"
              aria-label="Progresso"
              aria-valuemin={0}
              aria-valuemax={progresso.total}
              aria-valuenow={progresso.atual}
            >
              <span style={{ transform: `scaleX(${porcentagem / 100})` }} />
            </div>
          </div>
        )}
        {pontos !== undefined && (
          <p className={estilos.pontos}>
            <Icone nome="trofeu" tamanho={18} />
            <strong>{pontos}</strong>
            <span>pontos</span>
          </p>
        )}
      </header>

      <div className={estilos.palco}>
        <div className={estilos.colunaGabi} aria-hidden={false}>
          <Gabi humor={humor} />
        </div>

        <section className={estilos.cartao} aria-live="polite">
          <div className={estilos.corpo}>
            {etiqueta && (
              <div className={estilos.cabecalhoCartao}>
                <span className={estilos.bustoGabi}>
                  <Gabi humor={humor} variante="busto" />
                </span>
                <span className={estilos.etiqueta}>
                  <Icone nome={etiqueta.icone} tamanho={16} />
                  {etiqueta.texto}
                </span>
              </div>
            )}
            {children}
          </div>
          {rodape}
        </section>
      </div>
    </div>
  );
}
