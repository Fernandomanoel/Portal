import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import type { AulaIngles } from "@/types/aulaIngles";
import { BlocoAula } from "./BlocoAula";
import { ExplicacaoPtContexto, NavegacaoAulaContexto, useNarracaoAula } from "./contextoAula";
import { Rico } from "./Rico";
import estilos from "./PlayerAula.module.css";

/** Cada passo guarda a própria troca inglês/português. */
function PassoVisual({ passo, ativo }: { passo: AulaIngles["passos"][number]; ativo: boolean }) {
  const [pt, definirPt] = useState(false);
  const explicacao = useMemo(() => ({ pt, alternar: () => definirPt((v) => !v) }), [pt]);
  return (
    <ExplicacaoPtContexto.Provider value={explicacao}>
      {/* Os passos já visitados continuam montados, só escondidos: as respostas digitadas não se perdem ao voltar. */}
      <section id={`passo-${passo.id}`} className={estilos.passo} hidden={!ativo} aria-label={passo.rotulo}>
        {passo.blocos.map((bloco, i) => (
          <BlocoAula key={i} bloco={bloco} />
        ))}
      </section>
    </ExplicacaoPtContexto.Provider>
  );
}

export function PlayerAula({ aula }: { aula: AulaIngles }) {
  const { pararTudo } = useNarracaoAula();
  const total = aula.passos.length;
  const [indice, definirIndice] = useState(0);
  const [visitados, definirVisitados] = useState<ReadonlySet<number>>(new Set([0]));
  const [menuAberto, definirMenuAberto] = useState(false);

  const grupos = useMemo(() => {
    const lista: { modulo: string; passos: { i: number; rotulo: string }[] }[] = [];
    aula.passos.forEach((passo, i) => {
      let grupo = lista.find((g) => g.modulo === passo.modulo);
      if (!grupo) {
        grupo = { modulo: passo.modulo, passos: [] };
        lista.push(grupo);
      }
      grupo.passos.push({ i, rotulo: passo.rotulo });
    });
    return lista;
  }, [aula]);

  const irParaIndice = useCallback(
    (novo: number, ancora?: string) => {
      if (novo < 0 || novo >= total) return;
      pararTudo();
      definirIndice(novo);
      definirVisitados((antes) => new Set(antes).add(novo));
      definirMenuAberto(false);
      if (!ancora) {
        window.scrollTo(0, 0);
        return;
      }
      window.setTimeout(() => {
        const alvo = document.getElementById(ancora);
        if (!alvo) return;
        alvo.scrollIntoView({ behavior: "smooth", block: "center" });
        alvo.setAttribute("data-salto", "1");
        window.setTimeout(() => alvo.removeAttribute("data-salto"), 3200);
      }, 80);
    },
    [pararTudo, total],
  );

  const navegacao = useMemo(
    () => ({
      irPara: (passoId: string, ancora?: string) => {
        const destino = aula.passos.findIndex((p) => p.id === passoId);
        if (destino >= 0) irParaIndice(destino, ancora);
      },
    }),
    [aula, irParaIndice],
  );

  useEffect(() => {
    if (!menuAberto) return;
    const fechar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") definirMenuAberto(false);
    };
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [menuAberto]);

  const porcento = Math.round(((indice + 1) / total) * 100);
  const indicador = aula.rotulosNavegacao.passo.replace("{n}", String(indice + 1)).replace("{total}", String(total)).replace("{rotulo}", aula.passos[indice].rotulo);

  return (
    <NavegacaoAulaContexto.Provider value={navegacao}>
      <div className={estilos.pagina}>
        <header className={estilos.topo}>
          <Link to={rotas.cursoIngles()} className={estilos.voltar}>
            <Icone nome="seta-esquerda" tamanho={16} />
            Voltar
          </Link>
          <div className={estilos.titulos}>
            <span className={estilos.etiqueta}>{aula.rotuloTopo}</span>
            <h1 className={estilos.titulo}>{aula.titulo}</h1>
          </div>
          <div className={estilos.progresso}>
            <div className={estilos.progressoTexto}>
              <span>{aula.rotuloProgresso}</span>
              <span className={estilos.porcento}>{porcento}%</span>
            </div>
            <progress className={estilos.barra} value={indice + 1} max={total} aria-label={aula.rotuloProgresso} />
            <span className={estilos.contagem}>
              {indice + 1} / {total}
            </span>
          </div>
          <button type="button" className={estilos.abrirMenu} aria-expanded={menuAberto} aria-controls="menu-aula" onClick={() => definirMenuAberto(true)}>
            <Icone nome="menu" tamanho={18} />
            {aula.rotuloMenu}
          </button>
        </header>

        <div className={estilos.corpo}>
          {menuAberto && <button type="button" className={estilos.fundo} aria-label="Close" onClick={() => definirMenuAberto(false)} />}
          <aside id="menu-aula" className={estilos.menu} data-aberto={menuAberto ? "sim" : "nao"}>
            <div className={estilos.menuTopo}>
              <span className={estilos.menuTitulo}>{aula.rotuloMenu}</span>
              <button type="button" className={estilos.fecharMenu} aria-label="Close" onClick={() => definirMenuAberto(false)}>
                <Icone nome="x" tamanho={16} />
              </button>
            </div>
            <nav aria-label="Lesson subsections" className={estilos.menuLista}>
              {grupos.map((grupo) => (
                <div key={grupo.modulo} className={estilos.grupo}>
                  <span className={estilos.grupoTitulo}>{grupo.modulo}</span>
                  {grupo.passos.map((item) => (
                    <button key={item.i} type="button" className={estilos.item} aria-current={item.i === indice ? "step" : undefined} onClick={() => irParaIndice(item.i)}>
                      <span className={estilos.itemRotulo}>{item.rotulo}</span>
                      {item.i === indice ? <span className={estilos.ponto} aria-hidden="true" /> : visitados.has(item.i) ? <Icone nome="check" tamanho={13} /> : null}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </aside>

          <div className={estilos.conteudo}>
            {aula.passos.map((passo, i) => (
              <Fragment key={passo.id}>
                <PassoVisual passo={passo} ativo={i === indice} />
              </Fragment>
            ))}

            <div className={estilos.sequencia}>
              <button type="button" className={estilos.anterior} disabled={indice === 0} onClick={() => irParaIndice(indice - 1)}>
                <Icone nome="seta-esquerda" tamanho={16} />
                {aula.rotulosNavegacao.anterior}
              </button>
              <span className={estilos.indicador}>{indicador}</span>
              <button type="button" className={estilos.proximo} disabled={indice === total - 1} onClick={() => irParaIndice(indice + 1)}>
                {aula.rotulosNavegacao.proximo}
                <Icone nome="seta-direita" tamanho={16} />
              </button>
            </div>

            <footer className={estilos.creditos}>
              {aula.creditos.map((credito, i) => (
                <p key={i}>
                  <Rico texto={credito} />
                </p>
              ))}
            </footer>
          </div>
        </div>
      </div>
    </NavegacaoAulaContexto.Provider>
  );
}
