import { useMemo, useState } from "react";

import { CampoPlanilha } from "@/components/ferramentas/CampoPlanilha";
import { Icone } from "@/components/Icone";
import { importarTurmas } from "@/lib/apiFagas";
import { ErroApi } from "@/lib/apiProvas";
import { chaveDeNome, lerPlanilhaDeAlunos, type ResultadoImportacao } from "@/lib/importarFaga";
import type { Turma } from "@/types/faga";
import estilos from "./ImportarFaga.module.css";

interface Props {
  turmasExistentes: Turma[];
  semUnidade: boolean;
  tratar: (falha: unknown, padrao: string) => void;
  aoConcluir: (mensagem: string) => void;
  aoVoltar: () => void;
}

/** Monta turmas e FAGAs a partir da planilha da escola. Nada é gravado até o professor conferir e confirmar. */
export function ImportarFaga({ turmasExistentes, semUnidade, tratar, aoConcluir, aoVoltar }: Props) {
  const [resultado, definirResultado] = useState<ResultadoImportacao | null>(null);
  const [nomes, definirNomes] = useState<Record<string, string>>({});
  const [fora, definirFora] = useState<Set<string>>(new Set());
  const [criarFagas, definirCriarFagas] = useState(true);
  const [erro, definirErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);

  const jaCadastrados = useMemo(() => new Set(turmasExistentes.flatMap((t) => t.alunos.map((a) => chaveDeNome(a.nome)))), [turmasExistentes]);

  function ler(tabela: string[][]) {
    try {
      const lido = lerPlanilhaDeAlunos(tabela);
      definirResultado(lido);
      definirNomes(Object.fromEntries(lido.turmas.map((t) => [t.chave, t.nome])));
      // Quem já está numa turma do portal começa desmarcado, para não duplicar a FAGA.
      definirFora(new Set(lido.turmas.flatMap((t) => t.alunos.filter((a) => jaCadastrados.has(chaveDeNome(a.nome))).map((a) => a.id))));
      definirErro(null);
    } catch (falha) {
      definirResultado(null);
      definirErro(falha instanceof Error ? falha.message : "Não foi possível ler a planilha.");
    }
  }

  const escolhidas = (resultado?.turmas ?? [])
    .map((t) => ({ turma: t, alunos: t.alunos.filter((a) => !fora.has(a.id)) }))
    .filter((x) => x.alunos.length > 0);
  const totalAlunos = escolhidas.reduce((s, x) => s + x.alunos.length, 0);

  async function importar() {
    definirEnviando(true);
    definirErro(null);
    try {
      const resposta = await importarTurmas(
        escolhidas.map(({ turma, alunos }) => ({
          nome: (nomes[turma.chave] ?? turma.nome).trim() || turma.nome,
          tipo: turma.tipo,
          config: turma.config,
          dias: turma.dias,
          horario: turma.horario,
          alunos,
        })),
        criarFagas,
      );
      aoConcluir(`${resposta.turmas} turma(s) importada(s)${resposta.fagas ? ` e ${resposta.fagas} FAGA(s) criada(s)` : ""}. Abra uma turma para ajustar o que precisar.`);
    } catch (falha) {
      tratar(falha, "Não foi possível importar.");
      definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível importar.");
    } finally {
      definirEnviando(false);
    }
  }

  function alternar(id: string) {
    const novo = new Set(fora);
    if (novo.has(id)) novo.delete(id);
    else novo.add(id);
    definirFora(novo);
  }

  return (
    <section aria-labelledby="titulo-importar">
      <h2 id="titulo-importar" className={estilos.titulo}>
        Importar da planilha
      </h2>
      <p className={estilos.texto}>
        Escolha a planilha de agendamentos da escola (Aluno, Matéria, Dias e Horas de agendamento). O portal junta os alunos que têm o mesmo tipo, dia e horário em uma turma, guarda o nível de cada um e as datas. Você confere antes de gravar e pode mudar tudo depois.
      </p>
      {semUnidade && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          Escolha a unidade no alto da página antes de importar.
        </p>
      )}

      <div className={estilos.barra}>
        <button type="button" className={estilos.secundario} onClick={aoVoltar}>
          <Icone nome="seta-esquerda" tamanho={16} />
          Voltar
        </button>
        <CampoPlanilha rotulo="Escolher a planilha" colunas="Aluno, Matéria, Dias Agendamento, Horas Agendamento, Data Início, Data Final Prevista" aoLer={ler} aoFalhar={(m) => definirErro(m)} />
      </div>
      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {resultado && (
        <>
          <p className={estilos.resumo}>
            {resultado.turmas.length} turma(s) · {resultado.turmas.reduce((s, t) => s + t.alunos.length, 0)} aluno(s) de Inglês em {resultado.totalLinhas} linhas.
          </p>

          {resultado.avisos.length > 0 && (
            <details className={estilos.avisos}>
              <summary>{resultado.avisos.length} aluno(s) para conferir</summary>
              <ul>
                {resultado.avisos.map((a, i) => (
                  <li key={i}>
                    <strong>{a.aluno}</strong>: {a.motivo}
                  </li>
                ))}
              </ul>
            </details>
          )}
          {resultado.ignoradas.length > 0 && (
            <p className={estilos.dica}>Ignorado por não ser Inglês: {resultado.ignoradas.map((i) => `${i.materia} (${i.linhas})`).join(", ")}.</p>
          )}
          {fora.size > 0 && <p className={estilos.dica}>Alunos já cadastrados em alguma turma começam desmarcados, para não duplicar.</p>}

          <ul className={estilos.turmas}>
            {resultado.turmas.map((t) => (
              <li key={t.chave} className={estilos.turma}>
                <div className={estilos.cabecalho}>
                  <input value={nomes[t.chave] ?? t.nome} onChange={(e) => definirNomes({ ...nomes, [t.chave]: e.target.value })} aria-label={`Nome da turma ${t.nome}`} maxLength={80} />
                  <small>{t.tipo === "speed" ? "Speed" : "Regular"}</small>
                </div>
                <ul className={estilos.alunos}>
                  {t.alunos.map((a) => (
                    <li key={a.id}>
                      <label>
                        <input type="checkbox" checked={!fora.has(a.id)} onChange={() => alternar(a.id)} />
                        <span>{a.nome}</span>
                      </label>
                      <small>
                        {a.nivel}
                        {a.proximoNivel ? ` → ${a.proximoNivel}` : ""}
                      </small>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <label className={estilos.opcao}>
            <input type="checkbox" checked={criarFagas} onChange={(e) => definirCriarFagas(e.target.checked)} />
            Criar também a FAGA em branco de cada aluno (você escolhe o livro depois)
          </label>
          <button type="button" className={estilos.primario} onClick={() => void importar()} disabled={enviando || semUnidade || totalAlunos === 0}>
            {enviando ? "Importando…" : `Importar ${escolhidas.length} turma(s) e ${totalAlunos} aluno(s)`}
          </button>
        </>
      )}
    </section>
  );
}
