import { useCallback, useEffect, useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { dadosDaFaga, listarFagas, salvarFaga } from "@/lib/apiFagas";
import { ErroApi } from "@/lib/apiProvas";
import { calcularCalculadoraIngles, calcularModulosIngles, blocosDaFaga, type ResultadoModulosIngles, type SituacaoBloco } from "@/lib/acompanhamentoIngles";
import { CONFIG_MODULOS_INGLES, LIMITES_FAGA, type ConfigModulosIngles, type Faga } from "@/types/faga";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorModulosInglesPage.module.css";

const ROTULO: Record<SituacaoBloco, string> = { concluido: "Concluído", em_dia: "Em dia", atrasado: "Atrasado", a_iniciar: "A iniciar" };
const CLASSE: Record<SituacaoBloco, string> = { concluido: estilos.concluido, em_dia: estilos.emDia, atrasado: estilos.atrasado, a_iniciar: estilos.aIniciar };

const dataBr = (iso: string | null) => (iso ? iso.split("-").reverse().join("/") : "—");
const um = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

const CAMPOS: { campo: keyof ConfigModulosIngles; rotulo: string; max: number }[] = [
  { campo: "blocosDoLivro", rotulo: "Blocos do livro", max: LIMITES_FAGA.blocosMax },
  { campo: "aulasPorBloco", rotulo: "Aulas por bloco", max: LIMITES_FAGA.aulasPorBlocoMax },
  { campo: "mesesPorLivro", rotulo: "Meses para terminar o livro", max: LIMITES_FAGA.mesesMax },
];

export function ProfessorModulosInglesPage() {
  const { sessaoVencida } = useProfessor();
  const [fagas, definirFagas] = useState<Faga[] | null>(null);
  const [erro, definirErro] = useState<string | null>(null);
  const [escolhida, definirEscolhida] = useState<string | null>(null);
  const [config, definirConfig] = useState<ConfigModulosIngles | null>(null);
  const [salvando, definirSalvando] = useState(false);
  const [aviso, definirAviso] = useState<string | null>(null);

  const tratar = useCallback(
    (falha: unknown, padrao: string) => {
      if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : padrao);
    },
    [sessaoVencida],
  );

  useEffect(() => {
    listarFagas()
      .then(({ dados }) => definirFagas(dados))
      .catch((falha) => tratar(falha, "Não foi possível carregar as FAGAs."));
  }, [tratar]);

  const resumos = useMemo(() => (fagas ?? []).map((f) => ({ faga: f, calculo: calcularModulosIngles(f) })), [fagas]);
  const atual = fagas?.find((f) => f.id === escolhida) ?? null;
  const calculo = useMemo(() => (atual && config ? calcularModulosIngles({ ...atual, config }) : null), [atual, config]);
  const alterada = atual && config ? JSON.stringify(config) !== JSON.stringify(atual.config) : false;

  function escolher(f: Faga) {
    definirEscolhida(f.id);
    definirConfig(f.config);
    definirAviso(null);
  }

  async function salvarValores() {
    if (!atual || !config) return;
    definirSalvando(true);
    try {
      const salva = await salvarFaga(atual.id, { ...dadosDaFaga(atual), config });
      definirFagas((lista) => (lista ?? []).map((f) => (f.id === salva.id ? salva : f)));
      definirAviso("Valores salvos para este aluno.");
    } catch (falha) {
      tratar(falha, "Não foi possível salvar os valores.");
    } finally {
      definirSalvando(false);
    }
  }

  return (
    <>
      <CabecalhoPagina titulo="Módulos de Inglês" texto="Compara a FAGA de cada aluno com o que o livro pede: cada bloco em poucas aulas e o livro terminado no prazo." />
      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      <Calculadora fagas={fagas ?? []} />

      {fagas === null ? (
        <p aria-live="polite">Carregando…</p>
      ) : fagas.length === 0 ? (
        <EstadoVazio icone="alvo" titulo="Nenhuma FAGA para calcular" texto="Crie a FAGA do aluno na aba FAGA, informando a data de início da etapa e marcando as aulas concluídas." />
      ) : (
        <>
          <section aria-labelledby="titulo-alunos">
            <h2 id="titulo-alunos" className={estilos.subtitulo}>
              Alunos
            </h2>
            <div className={estilos.tabelaRolavel}>
              <table className={estilos.tabela}>
                <thead>
                  <tr>
                    <th scope="col">Aluno</th>
                    <th scope="col">Livro</th>
                    <th scope="col">Aulas dadas</th>
                    <th scope="col">Previstas até hoje</th>
                    <th scope="col">Atraso</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {resumos.map(({ faga, calculo: c }) => (
                    <tr key={faga.id} className={faga.id === escolhida ? estilos.linhaAtiva : undefined}>
                      <th scope="row">{faga.aluno}</th>
                      <td>{faga.livro || "—"}</td>
                      <td>
                        {c.aulasDadas} de {c.totalAulas}
                      </td>
                      <td>{c.semInicio ? "—" : c.aulasPrevistasHoje}</td>
                      <td>{c.semInicio ? "Sem data de início" : c.atrasoAulas > 0 ? <strong className={estilos.textoAtraso}>{c.atrasoAulas} aula(s)</strong> : "Em dia"}</td>
                      <td>
                        <button type="button" className={estilos.ver} onClick={() => escolher(faga)}>
                          Ver cálculo
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {atual && config && calculo && (
            <section className={estilos.detalhe} aria-labelledby="titulo-detalhe">
              <h2 id="titulo-detalhe" className={estilos.subtitulo}>
                {atual.aluno}
                {atual.livro && <small> · {atual.livro}</small>}
              </h2>

              <fieldset className={estilos.regras}>
                <legend>Valores do livro (mude conforme o livro e a velocidade)</legend>
                {CAMPOS.map(({ campo, rotulo, max }) => (
                  <label key={campo}>
                    {rotulo}
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={max}
                      value={config[campo]}
                      onChange={(e) => {
                        const valor = Math.min(max, Math.max(1, Math.round(Number(e.target.value)) || 1));
                        definirConfig({ ...config, [campo]: valor });
                        definirAviso(null);
                      }}
                    />
                  </label>
                ))}
                <button type="button" className={estilos.salvar} onClick={() => void salvarValores()} disabled={!alterada || salvando}>
                  {salvando ? "Salvando…" : "Salvar para este aluno"}
                </button>
                {aviso && <span role="status">{aviso}</span>}
              </fieldset>

              <Resultado calculo={calculo} aulasPorBloco={config.aulasPorBloco} deFaga />
            </section>
          )}
        </>
      )}
    </>
  );
}

function Resultado({ calculo, aulasPorBloco, deFaga = false }: { calculo: ResultadoModulosIngles; aulasPorBloco: number; deFaga?: boolean }) {
  return (
    <>
    {calculo.semInicio ? (
      <p className={estilos.dica}>Esta FAGA ainda não tem a data de início da etapa (nem de uma aula). Preencha na aba FAGA para calcular o atraso.</p>
    ) : (
      <dl className={estilos.numeros}>
        <div>
          <dt>Ritmo previsto</dt>
          <dd>{um(calculo.ritmoPrevistoPorSemana)} aulas por semana</dd>
        </div>
        <div>
          <dt>Ritmo do aluno</dt>
          <dd>{calculo.ritmoRealPorSemana === null ? "Sem aulas concluídas" : `${um(calculo.ritmoRealPorSemana)} aulas por semana`}</dd>
        </div>
        <div>
          <dt>Atraso total</dt>
          <dd>{calculo.atrasoAulas > 0 ? `${calculo.atrasoAulas} aula(s)` : "Em dia"}</dd>
        </div>
        <div>
          <dt>Prazo do livro</dt>
          <dd>{dataBr(calculo.fimPrevisto)}</dd>
        </div>
        <div>
          <dt>Término no ritmo atual</dt>
          <dd>
            {dataBr(calculo.fimProjetado)}
            {calculo.diasDeAtraso !== null && calculo.diasDeAtraso > 0 && <small className={estilos.textoAtraso}> ({calculo.diasDeAtraso} dias depois do prazo)</small>}
            {calculo.diasDeAtraso !== null && calculo.diasDeAtraso <= 0 && <small> (dentro do prazo)</small>}
          </dd>
        </div>
      </dl>
    )}

    <h3 className={estilos.subtitulo}>Por bloco</h3>
    <div className={estilos.tabelaRolavel}>
      <table className={estilos.tabela}>
        <thead>
          <tr>
            <th scope="col">Bloco</th>
            <th scope="col">Aulas dadas</th>
            <th scope="col">Previstas até hoje</th>
            <th scope="col">Atraso</th>
            <th scope="col">Situação</th>
          </tr>
        </thead>
        <tbody>
          {calculo.blocos.map((b, i) => (
            <tr key={`${b.nome}-${i}`}>
              <th scope="row">
                {b.nome}
                {b.naoMontado && deFaga && <small> (falta montar na FAGA)</small>}
              </th>
              <td>
                {b.aulasDadas} de {aulasPorBloco}
              </td>
              <td>{calculo.semInicio ? "—" : b.aulasPrevistas}</td>
              <td>{b.atrasoAulas > 0 ? `${b.atrasoAulas} aula(s)` : "—"}</td>
              <td>
                <span className={`${estilos.selo} ${CLASSE[b.situacao]}`}>{ROTULO[b.situacao]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

const numero = (texto: string) => Math.max(0, Math.round(Number(texto.replace(",", "."))) || 0);

/** Calculadora: o professor digita onde o aluno está; ou puxa os dados de uma FAGA e depois ajusta à vontade. */
function Calculadora({ fagas }: { fagas: Faga[] }) {
  const [aluno, definirAluno] = useState("");
  const [inicio, definirInicio] = useState("");
  const [blocoAtual, definirBlocoAtual] = useState("1");
  const [aulasNoBloco, definirAulasNoBloco] = useState("0");
  const [config, definirConfig] = useState<ConfigModulosIngles>({ ...CONFIG_MODULOS_INGLES });

  const calculo = useMemo(
    () => calcularCalculadoraIngles({ inicio, blocoAtual: numero(blocoAtual) || 1, aulasNoBloco: numero(aulasNoBloco), config }),
    [inicio, blocoAtual, aulasNoBloco, config],
  );

  function preencher(id: string) {
    const faga = fagas.find((f) => f.id === id);
    if (!faga) return;
    const blocos = blocosDaFaga(faga);
    const ultimo = blocos.reduce((atual, b, i) => (b.dadas > 0 ? i : atual), 0);
    definirAluno(faga.aluno);
    definirInicio(faga.etapaInicio || faga.faixas.map((f) => f.inicio).filter(Boolean).sort()[0] || "");
    definirConfig(faga.config);
    definirBlocoAtual(String(ultimo + 1));
    definirAulasNoBloco(String(blocos[ultimo]?.dadas ?? 0));
  }

  return (
    <section className={estilos.calculadora} aria-labelledby="titulo-calculadora">
      <h2 id="titulo-calculadora" className={estilos.subtitulo}>
        Calculadora de atraso
      </h2>
      <p className={estilos.dica}>
        Informe quando o aluno começou o livro e em que bloco ele está. O cálculo diz quantas aulas deveriam ter sido dadas até hoje, o atraso de cada bloco e quando o livro termina no ritmo do aluno.
      </p>

      <div className={estilos.camposCalc}>
        <label>
          Aluno (opcional)
          <input value={aluno} onChange={(e) => definirAluno(e.target.value)} maxLength={80} />
        </label>
        <label>
          Início do livro
          <input type="date" value={inicio} onChange={(e) => definirInicio(e.target.value)} />
        </label>
        <label>
          Bloco atual
          <input type="number" inputMode="numeric" min={1} max={config.blocosDoLivro} value={blocoAtual} onChange={(e) => definirBlocoAtual(e.target.value)} />
        </label>
        <label>
          Aulas já dadas neste bloco
          <input type="number" inputMode="numeric" min={0} max={config.aulasPorBloco} value={aulasNoBloco} onChange={(e) => definirAulasNoBloco(e.target.value)} />
        </label>
        {CAMPOS.map(({ campo, rotulo, max }) => (
          <label key={campo}>
            {rotulo}
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={max}
              value={config[campo]}
              onChange={(e) => definirConfig({ ...config, [campo]: Math.min(max, Math.max(1, Math.round(Number(e.target.value)) || 1)) })}
            />
          </label>
        ))}
        {fagas.length > 0 && (
          <label className={estilos.preencher}>
            Preencher com os dados de uma FAGA
            <select value="" onChange={(e) => preencher(e.target.value)}>
              <option value="">Escolher aluno…</option>
              {fagas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.aluno}
                  {f.livro ? ` · ${f.livro}` : ""}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {aluno.trim() && <p className={estilos.dica}>Aluno: <strong>{aluno.trim()}</strong></p>}
      <Resultado calculo={calculo} aulasPorBloco={config.aulasPorBloco} />
    </section>
  );
}
