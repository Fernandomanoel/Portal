import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { FagaImpressao } from "@/components/faga/FagaImpressao";
import { apagarFaga, criarFaga, dadosDaFaga, listarFagas, salvarFaga, type DadosFagaEnvio } from "@/lib/apiFagas";
import { ErroApi } from "@/lib/apiProvas";
import { normalizar } from "@/lib/busca";
import { CONFIG_MODULOS_INGLES, faixaConcluida, LIMITES_FAGA, type Faga, type FaixaFaga } from "@/types/faga";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorFagaPage.module.css";

const novoId = () => crypto.randomUUID().replace(/-/g, "").slice(0, 12);

const vazia = (): DadosFagaEnvio => ({
  aluno: "",
  livro: "",
  etapaInicio: "",
  etapaFim: "",
  horas: "",
  faixas: [],
  config: { ...CONFIG_MODULOS_INGLES },
  autoavaliacao: true,
});

const resumo = (f: Faga) => {
  const atividades = f.faixas.flatMap((x) => x.atividades);
  return { feitas: atividades.filter((a) => a.feita).length, total: atividades.length };
};

type Aberta = { id: string | null; dados: DadosFagaEnvio; original: string };

export function ProfessorFagaPage() {
  const { sessaoVencida, unidadeAtual } = useProfessor();
  const [fagas, definirFagas] = useState<Faga[] | null>(null);
  const [erro, definirErro] = useState<string | null>(null);
  const [aberta, definirAberta] = useState<Aberta | null>(null);
  const [busca, definirBusca] = useState("");

  const tratar = useCallback(
    (falha: unknown, padrao: string) => {
      if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : padrao);
    },
    [sessaoVencida],
  );

  const carregar = useCallback(async () => {
    try {
      definirFagas((await listarFagas()).dados);
      definirErro(null);
    } catch (falha) {
      tratar(falha, "Não foi possível carregar as FAGAs.");
    }
  }, [tratar]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const visiveis = useMemo(() => {
    const termo = normalizar(busca);
    return (fagas ?? []).filter((f) => !termo || normalizar(`${f.aluno} ${f.livro}`).includes(termo));
  }, [fagas, busca]);

  function abrir(f: Faga | null) {
    const dados = f ? dadosDaFaga(f) : vazia();
    definirAberta({ id: f?.id ?? null, dados, original: JSON.stringify(dados) });
  }

  if (aberta) {
    return (
      <Editor
        key={aberta.id ?? "nova"}
        aberta={aberta}
        semUnidade={aberta.id === null && unidadeAtual === null}
        tratar={tratar}
        aoVoltar={() => {
          definirAberta(null);
          void carregar();
        }}
      />
    );
  }

  return (
    <>
      <CabecalhoPagina titulo="FAGA" texto="Ficha de acompanhamento de cada aluno de Inglês: o professor monta as aulas, marca o que o aluno concluiu e imprime." />
      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}
      <div className={estilos.barra}>
        <button type="button" className={estilos.primario} onClick={() => abrir(null)}>
          <Icone nome="mais" tamanho={16} />
          Nova FAGA
        </button>
        <label className={estilos.busca}>
          <Icone nome="busca" tamanho={16} />
          <input type="search" value={busca} onChange={(e) => definirBusca(e.target.value)} placeholder="Buscar aluno ou livro" aria-label="Buscar aluno ou livro" />
        </label>
      </div>

      {fagas === null ? (
        <p aria-live="polite">Carregando…</p>
      ) : visiveis.length === 0 ? (
        <EstadoVazio icone="lapis" titulo={fagas.length ? "Nenhuma FAGA encontrada" : "Nenhuma FAGA ainda"} texto={fagas.length ? "Tente outro nome." : "Crie a primeira com o botão «Nova FAGA». Cada aluno tem a sua."} />
      ) : (
        <ul className={estilos.lista}>
          {visiveis.map((f) => {
            const { feitas, total } = resumo(f);
            const pct = total ? Math.round((feitas / total) * 100) : 0;
            return (
              <li key={f.id}>
                <button type="button" className={estilos.cartao} onClick={() => abrir(f)}>
                  <strong>{f.aluno}</strong>
                  <span>{f.livro || "Livro não informado"}</span>
                  <span className={estilos.progresso} aria-hidden="true">
                    <span style={{ width: `${pct}%` }} />
                  </span>
                  <small>
                    {f.faixas.length} aula(s) · {feitas} de {total} atividades ({pct}%)
                  </small>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function Editor({ aberta, semUnidade, tratar, aoVoltar }: { aberta: Aberta; semUnidade: boolean; tratar: (f: unknown, p: string) => void; aoVoltar: () => void }) {
  const [id, definirId] = useState(aberta.id);
  const [dados, definirDados] = useState<DadosFagaEnvio>(aberta.dados);
  const [original, definirOriginal] = useState(aberta.original);
  const [salvando, definirSalvando] = useState(false);
  const [mensagem, definirMensagem] = useState<string | null>(null);
  const [apagando, definirApagando] = useState(false);
  const [faixaApagando, definirFaixaApagando] = useState<string | null>(null);
  const sujo = JSON.stringify(dados) !== original;

  useEffect(() => {
    if (!sujo) return;
    const avisar = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [sujo]);

  const mudar = (parcial: Partial<DadosFagaEnvio>) => definirDados((d) => ({ ...d, ...parcial }));
  const mudarFaixa = (faixaId: string, parcial: Partial<FaixaFaga>) => mudar({ faixas: dados.faixas.map((f) => (f.id === faixaId ? { ...f, ...parcial } : f)) });

  function adicionarFaixa(base?: FaixaFaga) {
    const nova: FaixaFaga = base
      ? { ...base, id: novoId(), titulo: `${base.titulo} (cópia)`.trim(), inicio: "", fim: "", atividades: base.atividades.map((a) => ({ id: novoId(), rotulo: a.rotulo, feita: false })) }
      : { id: novoId(), titulo: "", bloco: dados.faixas.at(-1)?.bloco ?? "", inicio: "", fim: "", professor: dados.faixas.at(-1)?.professor ?? "", atividades: [] };
    if (dados.faixas.length >= LIMITES_FAGA.faixas) return definirMensagem(`A FAGA aceita até ${LIMITES_FAGA.faixas} faixas.`);
    mudar({ faixas: base ? [...dados.faixas.slice(0, dados.faixas.indexOf(base) + 1), nova, ...dados.faixas.slice(dados.faixas.indexOf(base) + 1)] : [...dados.faixas, nova] });
  }

  function mover(indice: number, delta: number) {
    const destino = indice + delta;
    if (destino < 0 || destino >= dados.faixas.length) return;
    const lista = [...dados.faixas];
    [lista[indice], lista[destino]] = [lista[destino], lista[indice]];
    mudar({ faixas: lista });
  }

  async function salvar(evento?: FormEvent) {
    evento?.preventDefault();
    definirSalvando(true);
    definirMensagem(null);
    try {
      const salva = id ? await salvarFaga(id, dados) : await criarFaga(dados);
      definirId(salva.id);
      definirOriginal(JSON.stringify(dadosDaFaga(salva)));
      definirMensagem("FAGA salva.");
    } catch (falha) {
      tratar(falha, "Não foi possível salvar a FAGA.");
      definirMensagem(falha instanceof ErroApi ? falha.message : "Não foi possível salvar a FAGA.");
    } finally {
      definirSalvando(false);
    }
  }

  async function excluir() {
    if (id) {
      try {
        await apagarFaga(id);
      } catch (falha) {
        tratar(falha, "Não foi possível excluir a FAGA.");
        definirApagando(false);
        return;
      }
    }
    aoVoltar();
  }

  const voltar = () => {
    if (sujo && !window.confirm("Há alterações sem salvar. Sair mesmo assim?")) return;
    aoVoltar();
  };

  return (
    <form onSubmit={salvar}>
      <CabecalhoPagina titulo={id ? "FAGA do aluno" : "Nova FAGA"} texto="Preencha os dados, monte as aulas e marque o que o aluno concluiu. Salve antes de sair." />

      {semUnidade && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          Escolha a unidade do aluno no alto da página antes de salvar uma FAGA nova.
        </p>
      )}

      <div className={estilos.barra}>
        <button type="button" className={estilos.secundario} onClick={voltar}>
          <Icone nome="seta-esquerda" tamanho={16} />
          Voltar à lista
        </button>
        <button type="submit" className={estilos.primario} disabled={salvando || !sujo || !dados.aluno.trim() || semUnidade}>
          {salvando ? "Salvando…" : sujo ? "Salvar alterações" : "Tudo salvo"}
        </button>
        <button type="button" className={estilos.secundario} onClick={() => window.print()} disabled={!dados.aluno.trim()}>
          <Icone nome="imprimir" tamanho={16} />
          Imprimir FAGA
        </button>
        {id &&
          (apagando ? (
            <span className={estilos.confirmar}>
              Excluir esta FAGA?
              <button type="button" className={estilos.perigo} onClick={() => void excluir()}>
                Sim, excluir
              </button>
              <button type="button" className={estilos.secundario} onClick={() => definirApagando(false)}>
                Cancelar
              </button>
            </span>
          ) : (
            <button type="button" className={estilos.secundario} onClick={() => definirApagando(true)}>
              <Icone nome="lixeira" tamanho={16} />
              Excluir FAGA
            </button>
          ))}
        {mensagem && (
          <span className={estilos.aviso} role="status">
            {mensagem}
          </span>
        )}
      </div>

      <fieldset className={estilos.dados}>
        <legend>Dados do aluno</legend>
        <label className={estilos.largo}>
          Aluno
          <input value={dados.aluno} onChange={(e) => mudar({ aluno: e.target.value })} maxLength={LIMITES_FAGA.texto} required />
        </label>
        <label>
          Livro
          <input value={dados.livro} onChange={(e) => mudar({ livro: e.target.value })} maxLength={LIMITES_FAGA.texto} placeholder="Ex.: FB25" />
        </label>
        <label>
          Início da etapa
          <input type="date" value={dados.etapaInicio} onChange={(e) => mudar({ etapaInicio: e.target.value })} />
        </label>
        <label>
          Fim da etapa
          <input type="date" value={dados.etapaFim} onChange={(e) => mudar({ etapaFim: e.target.value })} />
        </label>
        <label>
          Carga horária
          <input value={dados.horas} onChange={(e) => mudar({ horas: e.target.value })} maxLength={40} placeholder="Ex.: 40 h" />
        </label>
        <label className={estilos.marcar}>
          <input type="checkbox" checked={dados.autoavaliacao} onChange={(e) => mudar({ autoavaliacao: e.target.checked })} />
          Imprimir também a folha de autoavaliação
        </label>
      </fieldset>

      <h2 className={estilos.subtitulo}>Aulas</h2>
      {dados.faixas.length === 0 && <p className={estilos.dica}>Nenhuma aula ainda. Adicione a primeira: cada aula tem as suas atividades, que você marca quando o aluno concluir.</p>}

      <ol className={estilos.faixas}>
        {dados.faixas.map((faixa, i) => (
          <li key={faixa.id} className={faixaConcluida(faixa) ? `${estilos.faixa} ${estilos.faixaFeita}` : estilos.faixa}>
            <div className={estilos.faixaCampos}>
              <label className={estilos.largo}>
                Aula
                <input value={faixa.titulo} onChange={(e) => mudarFaixa(faixa.id, { titulo: e.target.value })} maxLength={LIMITES_FAGA.texto} placeholder="Ex.: Unit 73 – First Class" />
              </label>
              <label>
                Bloco
                <input value={faixa.bloco} onChange={(e) => mudarFaixa(faixa.id, { bloco: e.target.value })} maxLength={LIMITES_FAGA.texto} placeholder="Ex.: Unit 73" />
              </label>
              <label>
                Início
                <input type="date" value={faixa.inicio} onChange={(e) => mudarFaixa(faixa.id, { inicio: e.target.value })} />
              </label>
              <label>
                Término
                <input type="date" value={faixa.fim} onChange={(e) => mudarFaixa(faixa.id, { fim: e.target.value })} />
              </label>
              <label>
                Professor
                <input value={faixa.professor} onChange={(e) => mudarFaixa(faixa.id, { professor: e.target.value })} maxLength={LIMITES_FAGA.texto} />
              </label>
            </div>

            <ul className={estilos.atividades} aria-label={`Atividades de ${faixa.titulo || "aula"}`}>
              {faixa.atividades.map((a) => (
                <li key={a.id} className={a.feita ? `${estilos.atividade} ${estilos.atividadeFeita}` : estilos.atividade}>
                  <button type="button" aria-pressed={a.feita} onClick={() => mudarFaixa(faixa.id, { atividades: faixa.atividades.map((x) => (x.id === a.id ? { ...x, feita: !x.feita } : x)) })}>
                    <span className={estilos.bolinha} aria-hidden="true">
                      {a.feita && <Icone nome="check" tamanho={12} />}
                    </span>
                    {a.rotulo}
                  </button>
                  <button type="button" className={estilos.tirar} aria-label={`Remover ${a.rotulo}`} onClick={() => mudarFaixa(faixa.id, { atividades: faixa.atividades.filter((x) => x.id !== a.id) })}>
                    <Icone nome="x" tamanho={12} />
                  </button>
                </li>
              ))}
            </ul>
            <NovaAtividade
              aoAdicionar={(rotulo) => {
                if (faixa.atividades.length >= LIMITES_FAGA.atividades) return definirMensagem(`Cada aula aceita até ${LIMITES_FAGA.atividades} atividades.`);
                mudarFaixa(faixa.id, { atividades: [...faixa.atividades, { id: novoId(), rotulo, feita: false }] });
              }}
            />

            <div className={estilos.faixaAcoes}>
              <button type="button" className={estilos.mini} onClick={() => mover(i, -1)} disabled={i === 0} aria-label="Subir aula">
                <Icone nome="seta-cima" tamanho={14} />
              </button>
              <button type="button" className={estilos.mini} onClick={() => mover(i, 1)} disabled={i === dados.faixas.length - 1} aria-label="Descer aula">
                <Icone nome="seta-baixo" tamanho={14} />
              </button>
              <button type="button" className={estilos.mini} onClick={() => adicionarFaixa(faixa)}>
                <Icone nome="copiar" tamanho={14} />
                Duplicar aula
              </button>
              {faixaApagando === faixa.id ? (
                <span className={estilos.confirmar}>
                  Excluir esta aula?
                  <button type="button" className={estilos.perigo} onClick={() => { mudar({ faixas: dados.faixas.filter((x) => x.id !== faixa.id) }); definirFaixaApagando(null); }}>
                    Sim, excluir
                  </button>
                  <button type="button" className={estilos.mini} onClick={() => definirFaixaApagando(null)}>
                    Cancelar
                  </button>
                </span>
              ) : (
                <button type="button" className={estilos.mini} onClick={() => definirFaixaApagando(faixa.id)}>
                  <Icone nome="lixeira" tamanho={14} />
                  Excluir aula
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>

      <button type="button" className={estilos.secundario} onClick={() => adicionarFaixa()}>
        <Icone nome="mais" tamanho={16} />
        Adicionar aula
      </button>

      <FagaImpressao faga={dados} />
    </form>
  );
}

function NovaAtividade({ aoAdicionar }: { aoAdicionar: (rotulo: string) => void }) {
  const [texto, definirTexto] = useState("");
  const adicionar = () => {
    const limpo = texto.trim();
    if (!limpo) return;
    aoAdicionar(limpo.slice(0, 60));
    definirTexto("");
  };
  return (
    <div className={estilos.nova}>
      <input
        value={texto}
        onChange={(e) => definirTexto(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            adicionar();
          }
        }}
        placeholder="Nova atividade (ex.: Grammar) e Enter"
        maxLength={60}
        aria-label="Nova atividade"
      />
      <button type="button" className={estilos.mini} onClick={adicionar} disabled={!texto.trim()}>
        <Icone nome="mais" tamanho={14} />
        Adicionar atividade
      </button>
    </div>
  );
}
