import { createPortal } from "react-dom";

import type { DadosFagaEnvio } from "@/lib/apiFagas";
import { FagaTrilha } from "./FagaTrilha";
import estilos from "./FagaImpressao.module.css";

const dataBr = (iso: string) => {
  const [a, m, d] = iso.split("-");
  return a && m && d ? `${d} / ${m} / ${a}` : "";
};

function Faixa({ rotulo, valor, classe }: { rotulo: string; valor: string; classe?: string }) {
  return (
    <span className={classe ? `${estilos.campo} ${classe}` : estilos.campo}>
      <span className={estilos.campoRotulo}>{rotulo}</span>
      <span className={estilos.campoValor}>{valor}</span>
    </span>
  );
}

function Topo({ aluno, inicio, fim, horas }: { aluno: string; inicio: string; fim: string; horas: string }) {
  return (
    <header className={estilos.topo}>
      <div className={estilos.topoLinha}>
        <label className={estilos.topoCampo}>
          <span>Name:</span>
          <b className={estilos.caixa}>{aluno}</b>
        </label>
      </div>
      <div className={estilos.topoLinha}>
        <label className={estilos.topoCampo}>
          <span>Stage started on:</span>
          <b className={estilos.caixa}>{dataBr(inicio)}</b>
        </label>
        <label className={estilos.topoCampo}>
          <span>Stage finished on:</span>
          <b className={estilos.caixa}>{dataBr(fim)}</b>
        </label>
        <label className={estilos.topoCampo}>
          <span>Time:</span>
          <b className={estilos.caixa}>{horas}</b>
        </label>
      </div>
    </header>
  );
}

function Opcoes({ titulo, opcoes }: { titulo: string; opcoes: string[] }) {
  return (
    <div className={estilos.pergunta}>
      <p className={estilos.perguntaTitulo}>{titulo}</p>
      <ul className={estilos.opcoes}>
        {opcoes.map((o, i) => (
          <li key={`${o}-${i}`}>
            <span className={estilos.marcar} aria-hidden="true" />
            {o || <span className={estilos.linhaOpcao} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

const NIVEL = ["Great", "Good", "Needs improvement"];

/**
 * Folha de impressão da FAGA (A4 deitado). Fica fora da tela: o portal inteiro some no `@media print`
 * e só esta folha sai no papel. Vai para o `body` para não herdar o layout da página.
 */
export function FagaImpressao({ faga }: { faga: DadosFagaEnvio }) {
  return createPortal(
    <div className={estilos.folha} aria-hidden="true">
      <section className={estilos.pagina}>
        <Topo aluno={faga.aluno} inicio={faga.etapaInicio} fim={faga.etapaFim} horas={faga.horas} />
        {faga.livro && <p className={estilos.livro}>{faga.livro}</p>}

        {faga.faixas.map((faixa) => (
          <article key={faixa.id} className={estilos.faixa}>
            <div className={estilos.faixaCab}>
              <strong className={estilos.faixaTitulo}>
                {faixa.titulo || "Class"}
                {faixa.bloco && <small>{faixa.bloco}</small>}
              </strong>
              <Faixa rotulo="Beginning:" valor={dataBr(faixa.inicio) || "      /      /"} />
              <Faixa rotulo="End:" valor={dataBr(faixa.fim) || "      /      /"} />
              <Faixa rotulo="Student:" valor="" classe={estilos.campoLongo} />
              <Faixa rotulo="Teacher:" valor={faixa.professor} classe={estilos.campoLongo} />
            </div>
            <div className={estilos.faixaCorpo}>
              <FagaTrilha atividades={faixa.atividades} />
            </div>
          </article>
        ))}
      </section>

      {faga.autoavaliacao && (
        <section className={`${estilos.pagina} ${estilos.paginaNova}`}>
          <Topo aluno={faga.aluno} inicio={faga.etapaInicio} fim={faga.etapaFim} horas={faga.horas} />
          <div className={estilos.faixa}>
            <div className={estilos.faixaCab}>
              <strong className={estilos.faixaTitulo}>Self-evaluation</strong>
            </div>
            <div className={`${estilos.faixaCorpo} ${estilos.autoCorpo}`}>
              <Opcoes titulo="From the contents presented in the previous units, I have learned:" opcoes={["All of them", "More than 75%", "Half of them", "Less than half"]} />
              <Opcoes titulo="Check what you have learned thoroughly" opcoes={["", "", ""]} />
              <Opcoes titulo="My evaluation about my learning progress:" opcoes={NIVEL} />
              <Opcoes titulo="My evaluation about my effort:" opcoes={NIVEL} />
              <div className={estilos.pergunta}>
                <p className={estilos.perguntaTitulo}>Teacher&apos;s notes:</p>
                <div className={estilos.linhas}>
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>,
    document.body,
  );
}
