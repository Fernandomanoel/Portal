import { useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { CampoPlanilha } from "@/components/ferramentas/CampoPlanilha";
import { baixarArquivo } from "@/lib/exportarGrafico";
import { GRUPOS, calcularRelatorio, lerPlanilhaDePacotes, rotuloDoStatus, type AlunoPacote, type RelatorioPacotes, type StatusPacote } from "@/lib/pacotes";
import estilos from "./ProfessorPacotesPage.module.css";

type Filtro = "todos" | StatusPacote;
const FILTROS: { id: Filtro; rotulo: string }[] = [
  { id: "todos", rotulo: "Todos" },
  { id: "Atrasado", rotulo: "Atrasados" },
  { id: "Em dia", rotulo: "Em dia" },
  { id: "Adiantado", rotulo: "Adiantados" },
];

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataBr = (iso: string) => iso.split("-").reverse().join("/");
const ou = (valor: number | string | null) => (valor === null || valor === "" ? "—" : valor);

const CLASSE_STATUS: Record<StatusPacote, string> = { Atrasado: estilos.atrasado, "Em dia": estilos.emDia, Adiantado: estilos.adiantado };

function csvDoRelatorio(relatorio: RelatorioPacotes): string {
  const campo = (v: string | number | null) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const linhas = [["Grupo", "Aluno", "Educador", "Dias", "Horário", "Realizadas", "Agendadas", "Previsto no mês", "Previsto até hoje", "Situação", "Aviso"].map(campo).join(";")];
  const por = (grupo: string, alunos: AlunoPacote[]) =>
    alunos.forEach((a) =>
      linhas.push([grupo, a.nome, a.educador, a.diasAgendamento, a.horasAgendamento, a.qtdRealizada, a.qtdAgendamento, a.totalPrevistoMes, a.previstoAteHoje, rotuloDoStatus(a), a.aviso].map(campo).join(";")),
    );
  GRUPOS.forEach((g) => por(g.titulo, relatorio.grupos[g.id]));
  por("Fora dos grupos", relatorio.naoAgrupados);
  return `﻿${linhas.join("\r\n")}`;
}

function TabelaDeAlunos({ alunos }: { alunos: AlunoPacote[] }) {
  return (
    <div className={estilos.rolagem}>
      <table className={estilos.tabela}>
        <thead>
          <tr>
            <th scope="col">Aluno</th>
            <th scope="col">Educador</th>
            <th scope="col">Dias e horário</th>
            <th scope="col" className={estilos.numero}>
              Realizadas
            </th>
            <th scope="col" className={estilos.numero}>
              Previsto até hoje
            </th>
            <th scope="col" className={estilos.numero}>
              Previsto no mês
            </th>
            <th scope="col">Situação</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a, i) => (
            <tr key={`${a.nome}-${i}`}>
              <th scope="row">{a.nome}</th>
              <td>{ou(a.educador)}</td>
              <td>
                {ou(a.diasAgendamento)}
                {a.horasAgendamento && <span className={estilos.suave}> · {a.horasAgendamento}</span>}
              </td>
              <td className={estilos.numero}>{a.qtdRealizada}</td>
              <td className={estilos.numero}>{ou(a.previstoAteHoje)}</td>
              <td className={estilos.numero}>{ou(a.totalPrevistoMes)}</td>
              <td>
                <span className={`${estilos.status} ${a.status ? CLASSE_STATUS[a.status] : estilos.semCalculo}`}>{rotuloDoStatus(a)}</span>
                {a.aviso && <span className={estilos.aviso}>{a.aviso}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProfessorPacotesPage() {
  const [relatorio, definirRelatorio] = useState<RelatorioPacotes | null>(null);
  const [erro, definirErro] = useState("");
  const [filtro, definirFiltro] = useState<Filtro>("todos");

  const contagem = useMemo(() => {
    const todos = relatorio ? [...GRUPOS.flatMap((g) => relatorio.grupos[g.id]), ...relatorio.naoAgrupados] : [];
    const de = (s: StatusPacote) => todos.filter((a) => a.status === s).length;
    return { todos: todos.length, Atrasado: de("Atrasado"), "Em dia": de("Em dia"), Adiantado: de("Adiantado") };
  }, [relatorio]);

  const filtrar = (alunos: AlunoPacote[]) => (filtro === "todos" ? alunos : alunos.filter((a) => a.status === filtro));

  return (
    <>
      <CabecalhoPagina
        titulo="Analisador de pacotes"
        texto="Envie a planilha de agendamentos e veja quem está atrasado, em dia ou adiantado nas aulas do mês. A conta considera os dias de aula de cada aluno, os feriados e o dia de hoje; até 1 aula de diferença ainda conta como em dia."
      />

      <CampoPlanilha
        rotulo={relatorio ? "Trocar a planilha" : "Escolher a planilha de agendamentos"}
        colunas="Educador, Aluno, Qtd Aula Realizada, Qtd Agendamento e Dias Agendamento"
        aoLer={(tabela) => {
          try {
            definirRelatorio(calcularRelatorio(lerPlanilhaDePacotes(tabela)));
            definirErro("");
            definirFiltro("todos");
          } catch (falha) {
            definirRelatorio(null);
            definirErro(falha instanceof Error ? falha.message : "Não foi possível analisar a planilha.");
          }
        }}
        aoFalhar={(mensagem) => {
          definirRelatorio(null);
          definirErro(mensagem);
        }}
      />

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {relatorio && (
        <>
          <section className={estilos.resumo} aria-label="Resumo">
            <p>
              <strong>{relatorio.totalAlunos}</strong> aluno(s) · dia {relatorio.diaAtual} de {relatorio.diasTotaisMes}, {MESES[relatorio.mes - 1]} de {relatorio.ano}
            </p>
            <p className={estilos.suave}>
              {relatorio.feriadosAplicados.length
                ? `Sem aula no mês: ${relatorio.feriadosAplicados.map((f) => `${dataBr(f.data)} (${f.nome})`).join(", ")}.`
                : "Nenhum feriado descontado neste mês."}
            </p>
            <div className={estilos.barra}>
              <div className={estilos.filtros} role="group" aria-label="Filtrar por situação">
                {FILTROS.map((f) => (
                  <button key={f.id} type="button" className={estilos.filtro} aria-pressed={filtro === f.id} onClick={() => definirFiltro(f.id)}>
                    {f.rotulo} <span className={estilos.conta}>{contagem[f.id]}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={estilos.acao} onClick={() => baixarArquivo(new Blob([csvDoRelatorio(relatorio)], { type: "text/csv;charset=utf-8" }), `pacotes-${relatorio.ano}-${String(relatorio.mes).padStart(2, "0")}.csv`)}>
                <Icone nome="baixar" tamanho={16} />
                Baixar relatório (.csv)
              </button>
            </div>
          </section>

          {GRUPOS.map((grupo) => {
            const alunos = filtrar(relatorio.grupos[grupo.id]);
            return (
              <section key={grupo.id} className={estilos.grupo} aria-labelledby={`grupo-${grupo.id}`}>
                <h2 id={`grupo-${grupo.id}`}>
                  {grupo.titulo} <span className={estilos.conta}>{alunos.length}</span>
                </h2>
                {alunos.length ? <TabelaDeAlunos alunos={alunos} /> : <p className={estilos.suave}>Nenhum aluno neste grupo{filtro === "todos" ? "" : " com este filtro"}.</p>}
              </section>
            );
          })}

          {filtrar(relatorio.naoAgrupados).length > 0 && (
            <section className={estilos.grupo} aria-labelledby="grupo-fora">
              <h2 id="grupo-fora">
                Fora dos grupos <span className={estilos.conta}>{filtrar(relatorio.naoAgrupados).length}</span>
              </h2>
              <p className={estilos.suave}>Alunos com dias de aula que não se encaixam em Segunda/Quarta, Terça/Quinta ou Sábado. Confira o agendamento deles.</p>
              <TabelaDeAlunos alunos={filtrar(relatorio.naoAgrupados)} />
            </section>
          )}
        </>
      )}
    </>
  );
}
