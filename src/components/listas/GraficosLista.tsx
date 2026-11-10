import { useEffect, useMemo, useState } from "react";

import { Icone } from "@/components/Icone";
import { calculadora, formatarNumero } from "@/lib/formulas";
import { baixarArquivo, svgParaPng } from "@/lib/exportarGrafico";
import { dadosDoGrafico, graficoPadrao, svgDoGrafico, TEMA_CLARO, TIPOS_DE_GRAFICO } from "@/lib/graficoLista";
import { LIMITES_GRAFICO, type Agregacao, type Grafico, type ListaAcompanhamento, type SerieGrafico } from "@/types/lista";
import estilos from "./GraficosLista.module.css";

type Alterar = (mudar: (lista: ListaAcompanhamento) => ListaAcompanhamento) => void;

const AGREGACOES: { valor: Agregacao; rotulo: string }[] = [
  { valor: "soma", rotulo: "Soma" },
  { valor: "media", rotulo: "Média" },
  { valor: "contagem", rotulo: "Contagem" },
  { valor: "minimo", rotulo: "Mínimo" },
  { valor: "maximo", rotulo: "Máximo" },
];

const novoId = () => `g${crypto.randomUUID().replace(/-/g, "").slice(0, 8)}`;
const nomeArquivo = (titulo: string) => titulo.replace(/[\\/:*?"<>|]/g, "").trim() || "grafico";

interface Props {
  lista: ListaAcompanhamento;
  alterar: Alterar;
  somenteLeitura: boolean;
  /** Abre o editor de um gráfico novo assim que a aba aparece. */
  criarAoAbrir: boolean;
  aoConsumirCriar: () => void;
}

export function GraficosLista({ lista, alterar, somenteLeitura, criarAoAbrir, aoConsumirCriar }: Props) {
  const calc = useMemo(() => calculadora(lista), [lista]);
  const [editando, definirEditando] = useState<{ grafico: Grafico; novo: boolean } | null>(() => (criarAoAbrir && !somenteLeitura && lista.colunas.length ? { grafico: graficoPadrao(lista, novoId()), novo: true } : null));
  const [tabelas, definirTabelas] = useState<Record<string, boolean>>({});
  const [erro, definirErro] = useState<string | null>(null);
  const graficos = lista.graficos ?? [];

  // O pedido de «novo gráfico» vindo da barra de ferramentas vale uma vez só.
  useEffect(() => {
    if (criarAoAbrir) aoConsumirCriar();
  }, [criarAoAbrir, aoConsumirCriar]);

  async function baixar(g: Grafico) {
    definirErro(null);
    try {
      const png = await svgParaPng(svgDoGrafico(g, dadosDoGrafico(lista, calc, g), { tema: TEMA_CLARO }));
      baixarArquivo(png, `${nomeArquivo(g.titulo)}.png`);
    } catch (falha) {
      definirErro(falha instanceof Error ? falha.message : "Não foi possível gerar a imagem.");
    }
  }

  const salvar = (g: Grafico, novo: boolean) => {
    alterar((l) => ({ ...l, graficos: novo ? [...(l.graficos ?? []), g] : (l.graficos ?? []).map((x) => (x.id === g.id ? g : x)) }));
    definirEditando(null);
  };

  return (
    <div className={estilos.area}>
      <div className={estilos.topo}>
        <div>
          <h2 className={estilos.titulo}>Gráficos</h2>
          <p className={estilos.suave}>Feitos com os dados da lista: mudou uma célula, o gráfico acompanha. Baixe em PNG para colocar em slides e relatórios (a exportação em .xlsx leva os gráficos junto).</p>
        </div>
        {!somenteLeitura && (
          <button type="button" className={estilos.principal} disabled={!lista.colunas.length || graficos.length >= LIMITES_GRAFICO.graficos || editando !== null} onClick={() => definirEditando({ grafico: graficoPadrao(lista, novoId()), novo: true })}>
            <Icone nome="mais" tamanho={16} />
            Novo gráfico
          </button>
        )}
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          {erro}
        </p>
      )}

      {editando && <EditorGrafico lista={lista} calc={calc} inicial={editando.grafico} novo={editando.novo} aoSalvar={(g) => salvar(g, editando.novo)} aoCancelar={() => definirEditando(null)} />}

      {graficos.length === 0 && !editando ? (
        <div className={estilos.vazio}>
          <Icone nome="grafico" tamanho={28} />
          <p>
            <strong>Nenhum gráfico ainda.</strong> {somenteLeitura ? "Quem edita a lista pode criar." : "Clique em «Novo gráfico» e escolha o tipo, as categorias e os números."}
          </p>
        </div>
      ) : (
        <ul className={estilos.grade}>
          {graficos.map((g) => {
            const dados = dadosDoGrafico(lista, calc, g);
            const aberta = !!tabelas[g.id];
            return (
              <li key={g.id} className={estilos.cartao}>
                <div className={estilos.svg} dangerouslySetInnerHTML={{ __html: svgDoGrafico(g, dados) }} />
                {dados.semCategoria > 0 && <p className={estilos.nota}>{dados.semCategoria} {dados.semCategoria === 1 ? "linha ficou" : "linhas ficaram"} de fora por não ter a categoria preenchida.</p>}
                {aberta && (
                  <div className={estilos.tabelaCaixa}>
                    <table className={estilos.tabela}>
                      <thead>
                        <tr>
                          <th scope="col">Categoria</th>
                          {dados.series.map((s) => (
                            <th key={s.nome} scope="col">
                              {s.nome}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dados.categorias.map((c, i) => (
                          <tr key={c}>
                            <th scope="row">{c}</th>
                            {dados.series.map((s) => (
                              <td key={s.nome} className="tabular">
                                {s.valores[i] === null ? "—" : formatarNumero(s.valores[i]!, s.formato, s.casas)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className={estilos.acoes}>
                  <button type="button" className={estilos.acao} aria-pressed={aberta} onClick={() => definirTabelas({ ...tabelas, [g.id]: !aberta })}>
                    <Icone nome="tabela" tamanho={15} />
                    {aberta ? "Esconder dados" : "Ver dados"}
                  </button>
                  <button type="button" className={estilos.acao} onClick={() => void baixar(g)}>
                    <Icone nome="baixar" tamanho={15} />
                    Baixar PNG
                  </button>
                  {!somenteLeitura && (
                    <>
                      <button type="button" className={estilos.acao} disabled={editando !== null} onClick={() => definirEditando({ grafico: g, novo: false })}>
                        <Icone nome="lapis" tamanho={15} />
                        Editar
                      </button>
                      <button type="button" className={estilos.acao} disabled={graficos.length >= LIMITES_GRAFICO.graficos} onClick={() => alterar((l) => ({ ...l, graficos: [...(l.graficos ?? []), { ...g, id: novoId(), titulo: `${g.titulo} (cópia)`.slice(0, LIMITES_GRAFICO.titulo) }] }))}>
                        <Icone nome="copiar" tamanho={15} />
                        Duplicar
                      </button>
                      <button type="button" className={`${estilos.acao} ${estilos.apagar}`} aria-label={`Apagar ${g.titulo}`} onClick={() => alterar((l) => ({ ...l, graficos: (l.graficos ?? []).filter((x) => x.id !== g.id) }))}>
                        <Icone nome="lixeira" tamanho={15} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EditorGrafico({ lista, calc, inicial, novo, aoSalvar, aoCancelar }: { lista: ListaAcompanhamento; calc: ReturnType<typeof calculadora>; inicial: Grafico; novo: boolean; aoSalvar: (g: Grafico) => void; aoCancelar: () => void }) {
  const [g, definirG] = useState<Grafico>(inicial);
  const numericas = lista.colunas.filter((c) => c.tipo === "numero");
  const unica = g.tipo === "pizza" || g.tipo === "rosca";
  const dados = useMemo(() => dadosDoGrafico(lista, calc, g), [lista, calc, g]);
  const svg = useMemo(() => svgDoGrafico(g, dados), [g, dados]);
  const valido = !!lista.colunas.find((c) => c.id === g.categoria) && g.series.length > 0 && g.titulo.trim() !== "";

  const mudarSerie = (i: number, mudanca: Partial<SerieGrafico> & { coluna?: string | undefined }) =>
    definirG({ ...g, series: g.series.map((s, k) => (k === i ? ({ ...s, ...mudanca } as SerieGrafico) : s)) });

  return (
    <section className={estilos.editor} aria-label={novo ? "Novo gráfico" : "Editar gráfico"}>
      <div className={estilos.formulario}>
        <label className={estilos.campo}>
          <span>Título</span>
          <input value={g.titulo} maxLength={LIMITES_GRAFICO.titulo} onChange={(e) => definirG({ ...g, titulo: e.target.value })} />
        </label>

        <fieldset className={estilos.tipos}>
          <legend>Tipo de gráfico</legend>
          {TIPOS_DE_GRAFICO.map((t) => (
            <button key={t.tipo} type="button" title={t.dica} aria-pressed={g.tipo === t.tipo} onClick={() => definirG({ ...g, tipo: t.tipo, series: t.tipo === "pizza" || t.tipo === "rosca" ? g.series.slice(0, 1) : g.series })}>
              <Icone nome={t.tipo === "pizza" || t.tipo === "rosca" ? "grafico-pizza" : t.tipo === "linha" || t.tipo === "area" ? "grafico-linha" : "grafico"} tamanho={16} />
              {t.rotulo}
            </button>
          ))}
        </fieldset>

        <label className={estilos.campo}>
          <span>Categorias (eixo horizontal, fatias)</span>
          <select value={g.categoria} onChange={(e) => definirG({ ...g, categoria: e.target.value })}>
            {lista.colunas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.titulo}
              </option>
            ))}
          </select>
        </label>

        <fieldset className={estilos.series}>
          <legend>{unica ? "O que medir" : "Séries (o que medir)"}</legend>
          {g.series.map((s, i) => (
            <div key={i} className={estilos.serie}>
              <select aria-label={`Série ${i + 1}: coluna`} value={s.coluna ?? ""} onChange={(e) => mudarSerie(i, e.target.value ? { coluna: e.target.value, agregacao: s.agregacao === "contagem" ? "soma" : s.agregacao } : { coluna: undefined, agregacao: "contagem" })}>
                <option value="">Quantidade de linhas</option>
                {numericas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.titulo}
                  </option>
                ))}
              </select>
              <select aria-label={`Série ${i + 1}: como somar`} value={s.agregacao} disabled={!s.coluna} onChange={(e) => mudarSerie(i, { agregacao: e.target.value as Agregacao })}>
                {AGREGACOES.map((a) => (
                  <option key={a.valor} value={a.valor}>
                    {a.rotulo}
                  </option>
                ))}
              </select>
              {g.series.length > 1 && (
                <button type="button" className={estilos.acao} aria-label={`Tirar a série ${i + 1}`} onClick={() => definirG({ ...g, series: g.series.filter((_, k) => k !== i) })}>
                  <Icone nome="x" tamanho={14} />
                </button>
              )}
            </div>
          ))}
          {!unica && g.series.length < LIMITES_GRAFICO.series && numericas.length > 0 && (
            <button type="button" className={estilos.acao} onClick={() => definirG({ ...g, series: [...g.series, { coluna: (numericas.find((c) => !g.series.some((s) => s.coluna === c.id)) ?? numericas[0]).id, agregacao: "soma" }] })}>
              <Icone nome="mais" tamanho={14} />
              Outra série
            </button>
          )}
          {numericas.length === 0 && <p className={estilos.suave}>Para somar ou tirar a média, crie uma coluna do tipo «Número». Sem ela, o gráfico conta as linhas de cada categoria.</p>}
        </fieldset>

        <label className={estilos.opcao}>
          <input type="checkbox" checked={!!g.valores} onChange={(e) => definirG({ ...g, valores: e.target.checked })} />
          Mostrar os valores no gráfico
        </label>

        <div className={estilos.formAcoes}>
          <button type="button" className={estilos.principal} disabled={!valido} onClick={() => aoSalvar({ ...g, titulo: g.titulo.trim() })}>
            {novo ? "Criar gráfico" : "Salvar gráfico"}
          </button>
          <button type="button" className={estilos.acao} onClick={aoCancelar}>
            Cancelar
          </button>
        </div>
      </div>
      <div className={estilos.previa}>
        <p className={estilos.rotuloPrevia}>Prévia</p>
        <div className={estilos.svg} dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    </section>
  );
}
