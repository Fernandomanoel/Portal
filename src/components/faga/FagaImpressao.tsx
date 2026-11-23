import { createPortal } from "react-dom";

import type { DadosFagaEnvio } from "@/lib/apiFagas";
import estilos from "./FagaImpressao.module.css";

function dataBr(iso: string) {
  const [a, m, d] = iso.split("-");
  return a && m && d ? `${d}/${m}/${a}` : "";
}

function Campo({ rotulo, valor, largo }: { rotulo: string; valor: string; largo?: boolean }) {
  return (
    <div className={largo ? `${estilos.campo} ${estilos.campoLargo}` : estilos.campo}>
      <span className={estilos.campoRotulo}>{rotulo}</span>
      <span className={estilos.campoValor}>{valor}</span>
    </div>
  );
}

const OPCOES_APRENDIZADO = ["Ótimo", "Bom", "Precisa melhorar"];

function Opcoes({ titulo, opcoes }: { titulo: string; opcoes: string[] }) {
  return (
    <div className={estilos.pergunta}>
      <p className={estilos.perguntaTitulo}>{titulo}</p>
      <ul className={estilos.opcoes}>
        {opcoes.map((o) => (
          <li key={o}>
            <span className={estilos.caixaMarcar} aria-hidden="true" />
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Folha de impressão da FAGA (A4 deitado). Fica fora da tela: o portal inteiro some no `@media print`
 * e só esta folha sai no papel. Vai para o `body` para não herdar o layout da página.
 */
export function FagaImpressao({ faga }: { faga: DadosFagaEnvio }) {
  return createPortal(
    <div className={estilos.folha} aria-hidden="true">
      <section className={estilos.pagina}>
        <header className={estilos.cabecalho}>
          <div>
            <p className={estilos.selo}>FAGA</p>
            <h1 className={estilos.titulo}>Ficha de acompanhamento do aluno</h1>
          </div>
          <p className={estilos.livro}>{faga.livro}</p>
        </header>

        <div className={estilos.campos}>
          <Campo rotulo="Aluno" valor={faga.aluno} largo />
          <Campo rotulo="Início da etapa" valor={dataBr(faga.etapaInicio)} />
          <Campo rotulo="Fim da etapa" valor={dataBr(faga.etapaFim)} />
          <Campo rotulo="Carga horária" valor={faga.horas} />
        </div>

        {faga.faixas.map((faixa) => (
          <article key={faixa.id} className={estilos.faixa}>
            <div className={estilos.faixaTopo}>
              <h2 className={estilos.faixaTitulo}>
                {faixa.titulo || "Aula"}
                {faixa.bloco && <small>{faixa.bloco}</small>}
              </h2>
              <Campo rotulo="Início" valor={dataBr(faixa.inicio)} />
              <Campo rotulo="Término" valor={dataBr(faixa.fim)} />
              <Campo rotulo="Professor" valor={faixa.professor} largo />
              <Campo rotulo="Aluno (visto)" valor="" largo />
            </div>
            <ol className={estilos.trilha}>
              {faixa.atividades.map((a) => (
                <li key={a.id} className={a.feita ? `${estilos.passo} ${estilos.passoFeito}` : estilos.passo}>
                  <span className={estilos.bolinha} />
                  <span className={estilos.passoRotulo}>{a.rotulo}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      {faga.autoavaliacao && (
        <section className={`${estilos.pagina} ${estilos.paginaNova}`}>
          <header className={estilos.cabecalho}>
            <div>
              <p className={estilos.selo}>Autoavaliação</p>
              <h1 className={estilos.titulo}>{faga.aluno}</h1>
            </div>
            <p className={estilos.livro}>{faga.livro}</p>
          </header>
          <Opcoes titulo="Do que vimos nas unidades anteriores, eu aprendi:" opcoes={["Tudo", "Mais de 75%", "Metade", "Menos da metade"]} />
          <div className={estilos.pergunta}>
            <p className={estilos.perguntaTitulo}>O que eu aprendi bem:</p>
            <div className={estilos.linhas}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <Opcoes titulo="Minha avaliação do meu aprendizado:" opcoes={OPCOES_APRENDIZADO} />
          <Opcoes titulo="Minha avaliação do meu esforço:" opcoes={OPCOES_APRENDIZADO} />
          <div className={estilos.pergunta}>
            <p className={estilos.perguntaTitulo}>Observações do professor:</p>
            <div className={estilos.linhas}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
      )}
    </div>,
    document.body,
  );
}
