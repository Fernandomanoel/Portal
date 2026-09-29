import { Fragment } from "react";

import { Icone } from "@/components/Icone";
import type { ProvaPratica } from "@/types/quiz";
import estilos from "./Quiz.module.css";

/** "Tarefa 3 — Sensor de Armazenamento: ..." e "Passo 2 (Dados): ..." são a
 *  mesma ideia (um passo numerado com título opcional) em dois formatos que
 *  já existem nas provas — o mesmo molde de card cobre os dois. */
const CABECALHO_PASSO = /^(Tarefa|Passo)\s+(\d+)\s*(?:\(([^)]+)\))?\s*(?:—\s*([^:]+))?:\s*(.*)$/su;

/** Nome de arquivo citado numa instrução ("salve como Print1_Sobre.png"):
 *  vira um destaque de código para ficar fácil de copiar o nome exato. */
const NOME_ARQUIVO = /\b[\w.-]+\.(?:png|jpe?g|zip|docx?|xlsx?|pptx?|pdf|txt)\b/giu;

interface PassoPratica {
  rotulo: string;
  titulo?: string;
  linhas: string[];
}

function destacarArquivos(texto: string) {
  const partes = texto.split(NOME_ARQUIVO);
  const nomes = texto.match(NOME_ARQUIVO) ?? [];
  if (nomes.length === 0) return texto;
  return partes.flatMap((parte, indice) => (
    <Fragment key={indice}>
      {parte}
      {nomes[indice] && <code className={estilos.nomeArquivo}>{nomes[indice]}</code>}
    </Fragment>
  ));
}

function agruparPassos(instrucoes: string[]): { intro: string[]; passos: PassoPratica[] } {
  const intro: string[] = [];
  const passos: PassoPratica[] = [];
  let atual: PassoPratica | null = null;

  for (const instrucao of instrucoes) {
    const cabecalho = CABECALHO_PASSO.exec(instrucao);
    if (cabecalho) {
      const [, rotulo, numero, tituloParenteses, tituloTraco, resto] = cabecalho;
      atual = { rotulo: `${rotulo} ${numero}`, titulo: tituloParenteses ?? tituloTraco, linhas: [resto] };
      passos.push(atual);
    } else if (atual) {
      atual.linhas.push(instrucao);
    } else {
      intro.push(instrucao);
    }
  }

  return { intro, passos };
}

export function QuizPratica({ prova }: { prova: ProvaPratica }) {
  const { intro, passos } = agruparPassos(prova.instrucoes);

  return (
    <section className={estilos.pergunta}>
      <h2 className={estilos.enunciado}>O que fazer</h2>

      {passos.length > 0 ? (
        <>
          {intro.map((linha, indice) => (
            <p key={indice} className={estilos.instrucaoIntro}>
              {destacarArquivos(linha)}
            </p>
          ))}
          <ol className={estilos.listaPassos}>
            {passos.map((passo, indice) => (
              <li key={indice} className={estilos.passo}>
                <p className={estilos.passoCabecalho}>
                  <span className={estilos.passoRotulo}>{passo.rotulo}</span>
                  {passo.titulo && <span className={estilos.passoTitulo}>{passo.titulo}</span>}
                </p>
                {passo.linhas.map((linha, indiceLinha) => (
                  <p key={indiceLinha} className={estilos.passoTexto}>
                    {destacarArquivos(linha)}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </>
      ) : (
        <ul className={estilos.instrucoes}>
          {prova.instrucoes.map((instrucao, indice) => (
            <li key={indice} className={estilos.instrucaoItem}>
              {destacarArquivos(instrucao)}
            </li>
          ))}
        </ul>
      )}

      {prova.exemploTabela && (
        <div className={estilos.exemplo}>
          <p className={estilos.exemploRotulo}>Exemplo ilustrativo — sua tabela não precisa ser igual</p>
          <div className={estilos.exemploTabelaCaixa}>
            <table className={estilos.exemploTabela}>
              <thead>
                <tr>
                  {prova.exemploTabela.colunas.map((coluna, indice) => (
                    <th key={indice}>{coluna}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prova.exemploTabela.linhas.map((linha, indice) => (
                  <tr key={indice}>
                    {linha.map((celula, indiceCelula) => (
                      <td key={indiceCelula}>{celula}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {prova.material && (
        <a href={prova.material.url} target="_blank" rel="noreferrer" className={estilos.material}>
          <Icone nome="pdf" tamanho={18} />
          {prova.material.rotulo}
        </a>
      )}
    </section>
  );
}
