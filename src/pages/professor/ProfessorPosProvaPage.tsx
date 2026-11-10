import { Fragment } from "react";

import { AnalisadorPlanilha } from "@/components/AnalisadorPlanilha";
import estilos from "@/components/AnalisadorPlanilha.module.css";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { relatorioPosProva, type ProvaExtraida } from "@/lib/posProva";

const SEM_PROVA: ProvaExtraida = { materia: null, nota: null, notaExibicao: null };

export function ProfessorPosProvaPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Notas de pós-prova"
        texto="Envie o Histórico de Contratos para reunir, por aluno, a matéria e a nota anotadas nas ocorrências de Pós prova."
      />

      <AnalisadorPlanilha rotulo="Escolher o Histórico de Contratos" analisar={relatorioPosProva}>
        {(relatorio) => (
          <>
            <p className={estilos.resumo}>
              <strong>{relatorio.alunos.length}</strong> aluno(s) · <strong>{relatorio.totalOcorrencias}</strong> ocorrência(s) de Pós prova
            </p>
            <div className={estilos.rolagem}>
              <table className={estilos.tabela}>
                <thead>
                  <tr>
                    <th scope="col">Aluno</th>
                    <th scope="col">Matéria</th>
                    <th scope="col" className={estilos.numero}>
                      Nota
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {relatorio.alunos.map((aluno) => {
                    const provas = aluno.provas.length > 0 ? aluno.provas : [SEM_PROVA];
                    return (
                      <Fragment key={aluno.nome}>
                        {provas.map((prova, indice) => (
                          <tr key={indice}>
                            {indice === 0 && (
                              <th scope="row" rowSpan={provas.length}>
                                {aluno.nome}
                              </th>
                            )}
                            <td>{prova.materia ?? "Não identificada"}</td>
                            <td className={estilos.numero}>{prova.notaExibicao ?? "—"}</td>
                          </tr>
                        ))}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </AnalisadorPlanilha>
    </>
  );
}
