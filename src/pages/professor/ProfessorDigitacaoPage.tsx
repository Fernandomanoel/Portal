import { useEffect, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { JOGOS_COM_PROGRESSO, limparProgresso, limparTodoProgresso, temProgresso } from "@/lib/progressoDigitacao";
import { EVENTO_RANKING, totalDeRegistros, zerarRanking, zerarTodosOsRankings } from "@/lib/rankingDigitacao";
import { ENSAIOS } from "@/pages/digitacao/letrasIngles/dados";
import estilos from "./ProfessorDigitacaoPage.module.css";

const JOGOS_DO_RANKING = [
  { id: "digitacao-textos-classicos", titulo: "Textos Clássicos" },
  { id: "digitacao-cavaleiros-zodiaco", titulo: "Batalha das 12 Casas" },
  { id: "digitacao-sonic", titulo: "Sonic Digital Pro" },
  { id: "digitacao-baloes", titulo: "Balões de Letras" },
  { id: "digitacao-constelacao", titulo: "Constelação" },
  { id: "digitacao-pulo", titulo: "Pulo das Palavras" },
  { id: "digitacao-nave", titulo: "Esquadrão Hiper" },
  ...ENSAIOS.map((ensaio, i) => ({ id: `digitacao-letras-ingles-${i}`, titulo: `Inglês em Letras de Música · ${ensaio.tema}` })),
];

type Pedido = { tipo: "ranking"; id: string; titulo: string } | { tipo: "progresso"; chave: string; titulo: string } | { tipo: "tudo" } | null;

/** O ranking e o progresso dos jogos ficam no navegador de cada computador: aqui o professor zera os deste computador. */
export function ProfessorDigitacaoPage() {
  const [, atualizar] = useState(0);
  const [pedido, definirPedido] = useState<Pedido>(null);
  const [feito, definirFeito] = useState("");

  useEffect(() => {
    const aoMudar = () => atualizar((n) => n + 1);
    window.addEventListener(EVENTO_RANKING, aoMudar);
    window.addEventListener("storage", aoMudar);
    return () => {
      window.removeEventListener(EVENTO_RANKING, aoMudar);
      window.removeEventListener("storage", aoMudar);
    };
  }, []);

  const confirmar = () => {
    if (!pedido) return;
    if (pedido.tipo === "ranking") {
      zerarRanking(pedido.id);
      definirFeito(`Ranking de «${pedido.titulo}» zerado.`);
    } else if (pedido.tipo === "progresso") {
      limparProgresso(pedido.chave);
      definirFeito(`Progresso de «${pedido.titulo}» apagado.`);
    } else {
      zerarTodosOsRankings();
      limparTodoProgresso();
      definirFeito("Todos os rankings e todo o progresso dos jogos foram apagados.");
    }
    definirPedido(null);
    atualizar((n) => n + 1);
  };

  const comRegistro = JOGOS_DO_RANKING.filter((j) => totalDeRegistros(j.id) > 0).length;
  const comProgresso = JOGOS_COM_PROGRESSO.filter((j) => temProgresso(j.chave)).length;

  return (
    <>
      <CabecalhoPagina
        titulo="Digitação"
        texto="O ranking e o progresso dos jogos de digitação ficam guardados no navegador de cada computador, não no portal. Aqui você zera os deste computador; nos outros, repita a operação."
      />

      <p className={estilos.aviso}>
        <Icone nome="alerta" tamanho={16} />
        Só apaga o que está neste navegador. Apagar não tem volta.
      </p>

      {feito && (
        <p className={estilos.feito} role="status">
          <Icone nome="check" tamanho={16} />
          {feito}
        </p>
      )}

      <div className={estilos.topo}>
        <button type="button" className={estilos.perigo} onClick={() => definirPedido({ tipo: "tudo" })} disabled={comRegistro + comProgresso === 0}>
          <Icone nome="lixeira" tamanho={16} />
          Zerar tudo deste computador
        </button>
      </div>

      {pedido && (
        <div className={estilos.confirmar} role="alertdialog" aria-label="Confirmar">
          <p>
            {pedido.tipo === "tudo"
              ? "Apagar todos os rankings e todo o progresso dos jogos neste computador?"
              : pedido.tipo === "ranking"
                ? `Zerar o ranking de «${pedido.titulo}» neste computador?`
                : `Apagar o progresso de «${pedido.titulo}» neste computador? O aluno volta ao nível 1.`}
          </p>
          <div className={estilos.acoes}>
            <button type="button" className={estilos.perigo} onClick={confirmar}>
              Apagar
            </button>
            <button type="button" className={estilos.acao} onClick={() => definirPedido(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <section className={estilos.secao} aria-labelledby="titulo-rankings">
        <h2 id="titulo-rankings">Rankings</h2>
        <ul className={estilos.lista}>
          {JOGOS_DO_RANKING.map((jogo) => {
            const total = totalDeRegistros(jogo.id);
            return (
              <li key={jogo.id} className={estilos.item}>
                <span className={estilos.nome}>{jogo.titulo}</span>
                <span className={estilos.suave}>{total === 0 ? "vazio" : `${total} registro(s)`}</span>
                <button type="button" className={estilos.acao} disabled={total === 0} onClick={() => definirPedido({ tipo: "ranking", id: jogo.id, titulo: jogo.titulo })}>
                  Zerar
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={estilos.secao} aria-labelledby="titulo-progresso">
        <h2 id="titulo-progresso">Progresso dos jogos</h2>
        <ul className={estilos.lista}>
          {JOGOS_COM_PROGRESSO.map((jogo) => {
            const tem = temProgresso(jogo.chave);
            return (
              <li key={jogo.chave} className={estilos.item}>
                <span className={estilos.nome}>{jogo.titulo}</span>
                <span className={estilos.suave}>{tem ? "com progresso guardado" : "sem progresso"}</span>
                <button type="button" className={estilos.acao} disabled={!tem} onClick={() => definirPedido({ tipo: "progresso", chave: jogo.chave, titulo: jogo.titulo })}>
                  Apagar
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
