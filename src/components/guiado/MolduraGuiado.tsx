import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Icone, type NomeIcone } from "@/components/Icone";
import estilos from "./MolduraGuiado.module.css";

export interface AcaoGuiado {
  rotulo: string;
  icone: NomeIcone;
  aoClicar?: () => void;
  para?: string;
}

interface Props {
  titulo: string;
  sairPara: string;
  acento: string;
  progresso: { texto: string; atual: number; total: number };
  /** Contador de recompensas: cada valor novo mostra "Muito bem!" de novo; 0 esconde. */
  recompensa: number;
  voltar?: AcaoGuiado;
  avancar: AcaoGuiado;
  children: ReactNode;
}

/**
 * A mesma moldura em todo tutorial e todo jogo da seção: "Sair" e progresso
 * em cima, a atividade no meio, "Voltar" sempre à esquerda e "Próximo"
 * sempre à direita embaixo, sempre com as mesmas cores. A pessoa aprende
 * onde fica cada botão uma vez, e isso não muda de uma atividade para outra.
 */
export function MolduraGuiado({ titulo, sairPara, acento, progresso, recompensa, voltar, avancar, children }: Props) {
  return (
    <div className={estilos.tela} style={{ "--acento": acento } as CSSProperties}>
      <header className={estilos.topo}>
        <Link to={sairPara} className={estilos.sair}>
          <Icone nome="seta-esquerda" tamanho={20} />
          Sair
        </Link>
        <p className={estilos.titulo}>{titulo}</p>
        <div className={estilos.progresso}>
          <p className={estilos.progressoTexto}>{progresso.texto}</p>
          <div
            className={estilos.barra}
            role="progressbar"
            aria-label="Progresso"
            aria-valuemin={0}
            aria-valuemax={progresso.total}
            aria-valuenow={progresso.atual}
          >
            <span style={{ transform: `scaleX(${progresso.total ? progresso.atual / progresso.total : 0})` }} />
          </div>
        </div>
      </header>

      <section className={estilos.palco}>
        <div className={estilos.recompensaLugar} aria-live="polite">
          {recompensa > 0 && (
            <p key={recompensa} className={estilos.recompensa}>
              Muito bem!
            </p>
          )}
        </div>
        {children}
      </section>

      <nav className={estilos.navegacao} aria-label="Navegação da atividade">
        {voltar && <Botao acao={voltar} classe={estilos.voltar} iconeAntes />}
        <Botao acao={avancar} classe={estilos.avancar} />
      </nav>
    </div>
  );
}

function Botao({ acao, classe, iconeAntes }: { acao: AcaoGuiado; classe: string; iconeAntes?: boolean }) {
  const conteudo = iconeAntes ? (
    <>
      <Icone nome={acao.icone} tamanho={24} />
      {acao.rotulo}
    </>
  ) : (
    <>
      {acao.rotulo}
      <Icone nome={acao.icone} tamanho={24} />
    </>
  );

  if (acao.para) {
    return (
      <Link to={acao.para} className={classe}>
        {conteudo}
      </Link>
    );
  }
  return (
    <button type="button" className={classe} onClick={acao.aoClicar}>
      {conteudo}
    </button>
  );
}
