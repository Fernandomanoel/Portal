import { AnalisadorPlanilha } from "@/components/AnalisadorPlanilha";
import estilos from "@/components/AnalisadorPlanilha.module.css";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { calcularPacotes, lerLinhasPacotes, ROTULOS_GRUPO, type AlunoPacote, type Grupo } from "@/lib/analisadorPacotes";

const CLASSE_STATUS = { Atrasado: estilos.ruim, "Em dia": estilos.bom, Adiantado: estilos.neutro };

function rotuloStatus(aluno: AlunoPacote) {
  if (!aluno.status) return "Sem cálculo";
  if (aluno.status === "Atrasado") return `Atrasado · faltam ${aluno.diferenca}`;
  if (aluno.status === "Adiantado") return `Adiantado · ${Math.abs(aluno.diferenca ?? 0)} a mais`;
  return aluno.status;
}

function dataBr(iso: string) {
  return iso.split("-").reverse().join("/");
}

function TabelaAlunos({ titulo, alunos }: { titulo: string; alunos: AlunoPacote[] }) {
  if (alunos.length === 0) return null;
  return (
    <section className={estilos.secao}>
      <h2>
        {titulo} · {alunos.length}
      </h2>
      <div className={estilos.rolagem}>
        <table className={estilos.tabela}>
          <thead>
            <tr>
              <th scope="col">Aluno</th>
              <th scope="col">Educador</th>
              <th scope="col">Dias</th>
              <th scope="col" className={estilos.numero}>
                Realizadas
              </th>
              <th scope="col" className={estilos.numero}>
                Previsto no mês
              </th>
              <th scope="col" className={estilos.numero}>
                Previsto até hoje
              </th>
              <th scope="col">Situação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, indice) => (
              <tr key={`${aluno.nome}-${indice}`}>
                <td>{aluno.nome}</td>
                <td>{aluno.educador ?? "—"}</td>
                <td>{aluno.diasAgendamento ?? "—"}</td>
                <td className={estilos.numero}>{aluno.qtdRealizada}</td>
                <td className={estilos.numero}>{aluno.totalPrevistoMes ?? "—"}</td>
                <td className={estilos.numero}>{aluno.previstoAteHoje ?? "—"}</td>
                <td>
                  <span className={`${estilos.selo} ${aluno.status ? CLASSE_STATUS[aluno.status] : ""}`}>{rotuloStatus(aluno)}</span>
                  {aluno.aviso && <p className={estilos.observacao}>{aluno.aviso}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ProfessorPacotesPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Analisador de pacotes"
        texto="Envie a planilha de agendamentos para comparar as aulas previstas até hoje com as realizadas por aluno, já descontando os feriados do mês."
      />

      <AnalisadorPlanilha rotulo="Escolher a planilha de agendamentos" analisar={(matriz) => calcularPacotes(lerLinhasPacotes(matriz))}>
        {(relatorio) => (
          <>
            <p className={estilos.resumo}>
              <strong>{relatorio.totalAlunos}</strong> aluno(s) · referência{" "}
              <strong>
                {String(relatorio.diaAtual).padStart(2, "0")}/{String(relatorio.mes).padStart(2, "0")}/{relatorio.ano}
              </strong>
            </p>

            <div className={estilos.caixa}>
              <h2>Feriados descontados neste mês</h2>
              {relatorio.feriados.length === 0 ? (
                <p>Nenhum feriado neste mês.</p>
              ) : (
                <ul>
                  {relatorio.feriados.map((feriado) => (
                    <li key={feriado.data}>
                      {dataBr(feriado.data)} — {feriado.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {relatorio.avisos.length > 0 && (
              <div className={`${estilos.caixa} ${estilos.atencao}`}>
                <h2>{relatorio.avisos.length} aluno(s) com aviso, sem previsto calculado quando a regra não fecha</h2>
                <ul>
                  {relatorio.avisos.map((aviso, indice) => (
                    <li key={`${aviso.nome}-${indice}`}>
                      <strong>{aviso.nome}</strong>
                      {aviso.educador ? ` (${aviso.educador})` : ""}: {aviso.motivo}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(Object.keys(ROTULOS_GRUPO) as Grupo[]).map((grupo) => (
              <TabelaAlunos key={grupo} titulo={ROTULOS_GRUPO[grupo]} alunos={relatorio.grupos[grupo]} />
            ))}
            <TabelaAlunos titulo="Fora dos grupos" alunos={relatorio.naoAgrupados} />
          </>
        )}
      </AnalisadorPlanilha>
    </>
  );
}
