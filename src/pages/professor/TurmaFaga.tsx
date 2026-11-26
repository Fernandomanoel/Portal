import { useEffect, useState, type FormEvent } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { MODELOS_FAGA } from "@/data/modelosFaga";
import { apagarTurma, criarFaga, criarTurma, salvarTurma, transferirTurma } from "@/lib/apiFagas";
import { ErroApi, listarUnidades } from "@/lib/apiProvas";
import { modeloDoLivro, novoIdFaga } from "@/lib/modeloFaga";
import { CONFIG_POR_TIPO, DIAS_DA_SEMANA, LIMITES_TURMA, TIPOS_TURMA, type AlunoTurma, type Faga, type TipoTurma, type Turma } from "@/types/faga";
import type { Unidade } from "@/types/unidade";
import estilos from "./TurmaFaga.module.css";

/** «Annual Book 4» -> «Book 4», a coleção de FB09–FB16; vazio se o nível não diz o livro. */
const colecaoDoNivel = (nivel?: string) => {
  const m = (nivel ?? "").match(/book\s*(\d)/i);
  return m ? `Book ${m[1]}` : "";
};

const numero = (texto: string) => Math.max(1, Math.round(Number(texto)) || 1);

interface Props {
  /** `null` = turma nova. */
  turma: Turma | null;
  /** Todas as FAGAs carregadas: a da turma aparecem na lista de alunos. */
  fagas: Faga[];
  semUnidade: boolean;
  tratar: (falha: unknown, padrao: string) => void;
  aoAbrirFaga: (faga: Faga) => void;
  aoVoltar: () => void;
}

/** Tela de uma turma: dados, dias e horário, alunos digitados à mão, FAGA de cada um e transferência de unidade. */
export function TurmaFaga({ turma, fagas, semUnidade, tratar, aoAbrirFaga, aoVoltar }: Props) {
  const [id, definirId] = useState(turma?.id ?? null);
  const [nome, definirNome] = useState(turma?.nome ?? "");
  const [tipo, definirTipo] = useState<TipoTurma>(turma?.tipo ?? "regular");
  const [meses, definirMeses] = useState(String(turma?.config?.mesesPorLivro ?? CONFIG_POR_TIPO[turma?.tipo ?? "regular"].mesesPorLivro));
  const [aulasBloco, definirAulasBloco] = useState(String(turma?.config?.aulasPorBloco ?? CONFIG_POR_TIPO[turma?.tipo ?? "regular"].aulasPorBloco));
  const [dias, definirDias] = useState<number[]>(turma?.dias ?? []);
  const [horario, definirHorario] = useState(turma?.horario ?? "");
  const [alunos, definirAlunos] = useState<AlunoTurma[]>((turma?.alunos ?? []).map((a) => ({ ...a, livro: a.livro ?? "" })));
  const [novoAluno, definirNovoAluno] = useState("");
  const [varios, definirVarios] = useState("");
  const [original, definirOriginal] = useState(() => JSON.stringify([turma?.nome ?? "", turma?.tipo ?? "regular", String(turma?.config?.mesesPorLivro ?? CONFIG_POR_TIPO[turma?.tipo ?? "regular"].mesesPorLivro), String(turma?.config?.aulasPorBloco ?? CONFIG_POR_TIPO[turma?.tipo ?? "regular"].aulasPorBloco), turma?.dias ?? [], turma?.horario ?? "", (turma?.alunos ?? []).map((a) => ({ ...a, livro: a.livro ?? "" }))]));
  const [salvando, definirSalvando] = useState(false);
  const [gerando, definirGerando] = useState(false);
  const [mensagem, definirMensagem] = useState<string | null>(null);
  const [confirmaApagar, definirConfirmaApagar] = useState(false);
  const [unidades, definirUnidades] = useState<Unidade[]>([]);
  const [destino, definirDestino] = useState("");
  const [fagasDaTurma, definirFagasDaTurma] = useState<Faga[]>(fagas.filter((f) => id && f.turmaId === id));

  const atual = JSON.stringify([nome, tipo, meses, aulasBloco, dias, horario, alunos]);
  const sujo = atual !== original;

  useEffect(() => {
    listarUnidades().then(definirUnidades).catch(() => definirUnidades([]));
  }, []);

  const faltam = alunos.filter((a) => !fagasDaTurma.some((f) => f.alunoId === a.id));

  function adicionar(nomes: string[]) {
    const novos = nomes.map((n) => n.replace(/\s+/g, " ").trim()).filter((n) => n.length >= 2).map((n) => ({ id: novoIdFaga(), nome: n.slice(0, LIMITES_TURMA.texto), livro: "" }));
    if (!novos.length) return;
    if (alunos.length + novos.length > LIMITES_TURMA.alunos) return definirMensagem(`A turma aceita até ${LIMITES_TURMA.alunos} alunos.`);
    definirAlunos([...alunos, ...novos]);
  }

  const mudarAluno = (alunoId: string, campos: Partial<AlunoTurma>) => definirAlunos(alunos.map((x) => (x.id === alunoId ? { ...x, ...campos } : x)));

  async function salvar(evento?: FormEvent) {
    evento?.preventDefault();
    definirSalvando(true);
    definirMensagem(null);
    try {
      const dados = { nome, tipo, config: { aulasPorBloco: numero(aulasBloco), mesesPorLivro: numero(meses) }, dias, horario, alunos };
      const salva = id ? await salvarTurma(id, dados) : await criarTurma(dados);
      definirId(salva.id);
      // Guarda como a tela mostra: o servidor ajusta os números, e aqui eles voltam ajustados.
      definirMeses(String(salva.config.mesesPorLivro));
      definirAulasBloco(String(salva.config.aulasPorBloco));
      definirOriginal(JSON.stringify([salva.nome, salva.tipo, String(salva.config.mesesPorLivro), String(salva.config.aulasPorBloco), salva.dias, salva.horario, salva.alunos]));
      definirMensagem("Turma salva.");
      return salva;
    } catch (falha) {
      tratar(falha, "Não foi possível salvar a turma.");
      definirMensagem(falha instanceof ErroApi ? falha.message : "Não foi possível salvar a turma.");
    } finally {
      definirSalvando(false);
    }
    return null;
  }

  async function gerarFagas() {
    definirGerando(true);
    definirMensagem(null);
    try {
      const salva = sujo || !id ? await salvar() : { id };
      if (!salva) return;
      const novas: Faga[] = [];
      for (const aluno of alunos.filter((a) => !fagasDaTurma.some((f) => f.alunoId === a.id))) {
        const modelo = modeloDoLivro(aluno.livro);
        const blocos = modelo?.config.blocosDoLivro ?? 8;
        novas.push(
          await criarFaga({
            aluno: aluno.nome,
            livro: modelo?.livro ?? (aluno.livro || aluno.nivel || ""),
            etapaInicio: aluno.inicio ?? "",
            etapaFim: aluno.fim ?? "",
            horas: "",
            faixas: modelo?.faixas ?? [],
            config: { blocosDoLivro: blocos, aulasPorBloco: numero(aulasBloco), mesesPorLivro: numero(meses) },
            autoavaliacao: true,
            topicos: modelo?.topicos ?? [],
            turmaId: salva.id,
            alunoId: aluno.id,
          }),
        );
      }
      definirFagasDaTurma((atuais) => [...atuais, ...novas]);
      definirMensagem(novas.length ? `${novas.length} FAGA(s) criada(s).` : "Todos os alunos já têm FAGA.");
    } catch (falha) {
      tratar(falha, "Não foi possível criar as FAGAs.");
      definirMensagem(falha instanceof ErroApi ? falha.message : "Não foi possível criar as FAGAs.");
    } finally {
      definirGerando(false);
    }
  }

  async function transferir() {
    if (!id || !destino) return;
    const alvo = unidades.find((u) => u.id === destino)?.nome ?? destino;
    if (!window.confirm(`Transferir a turma «${nome}» e as FAGAs dos alunos para ${alvo}? Ela deixa de aparecer nesta unidade.`)) return;
    try {
      await transferirTurma(id, destino);
      aoVoltar();
    } catch (falha) {
      tratar(falha, "Não foi possível transferir a turma.");
      definirMensagem(falha instanceof ErroApi ? falha.message : "Não foi possível transferir a turma.");
    }
  }

  async function excluir() {
    if (id) {
      try {
        await apagarTurma(id);
      } catch (falha) {
        tratar(falha, "Não foi possível excluir a turma.");
        definirConfirmaApagar(false);
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
      <CabecalhoPagina titulo={id ? "Turma" : "Nova turma"} texto="Defina os dias e o horário, digite os alunos e crie a FAGA de cada um. Salve antes de sair." />

      {semUnidade && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          Escolha a unidade da turma no alto da página antes de salvar uma turma nova.
        </p>
      )}

      <div className={estilos.barra}>
        <button type="button" className={estilos.secundario} onClick={voltar}>
          <Icone nome="seta-esquerda" tamanho={16} />
          Voltar
        </button>
        <button type="submit" className={estilos.primario} disabled={salvando || !sujo || nome.trim().length < 2 || semUnidade}>
          {salvando ? "Salvando…" : sujo ? "Salvar turma" : "Tudo salvo"}
        </button>
        {mensagem && (
          <span className={estilos.aviso} role="status">
            {mensagem}
          </span>
        )}
      </div>

      <fieldset className={estilos.dados}>
        <legend>Dados da turma</legend>
        <label className={estilos.largo}>
          Nome da turma
          <input value={nome} onChange={(e) => definirNome(e.target.value)} maxLength={LIMITES_TURMA.texto} required placeholder="Ex.: Terça e quinta, 19h" />
        </label>
        <fieldset className={`${estilos.largo} ${estilos.tipos}`}>
          <legend>Tipo da turma</legend>
          {TIPOS_TURMA.map((t) => (
            <label key={t.id} className={tipo === t.id ? `${estilos.tipo} ${estilos.tipoMarcado}` : estilos.tipo}>
              <input
                type="radio"
                name="tipo-turma"
                checked={tipo === t.id}
                onChange={() => {
                  definirTipo(t.id);
                  definirMeses(String(CONFIG_POR_TIPO[t.id].mesesPorLivro));
                  definirAulasBloco(String(CONFIG_POR_TIPO[t.id].aulasPorBloco));
                }}
              />
              <span>
                <strong>{t.rotulo}</strong>
                <small>{t.descricao}</small>
              </span>
            </label>
          ))}
        </fieldset>
        <label>
          Meses para terminar cada livro
          <input type="number" inputMode="numeric" min={1} max={60} value={meses} onChange={(e) => definirMeses(e.target.value)} />
        </label>
        <label>
          Aulas para ver cada bloco
          <input type="number" inputMode="numeric" min={1} max={40} value={aulasBloco} onChange={(e) => definirAulasBloco(e.target.value)} />
        </label>
        <label>
          Horário
          <input value={horario} onChange={(e) => definirHorario(e.target.value)} maxLength={20} placeholder="Ex.: 19h às 20h30" />
        </label>
        <div className={estilos.dias} role="group" aria-label="Dias das aulas">
          <span>Dias das aulas na semana</span>
          <div>
            {DIAS_DA_SEMANA.map((d) => (
              <label key={d.id} className={dias.includes(d.id) ? `${estilos.dia} ${estilos.diaMarcado}` : estilos.dia}>
                <input type="checkbox" checked={dias.includes(d.id)} onChange={() => definirDias(dias.includes(d.id) ? dias.filter((x) => x !== d.id) : [...dias, d.id])} />
                {d.curto}
              </label>
            ))}
          </div>
          <small>{dias.length} aula(s) por semana</small>
        </div>
      </fieldset>

      <h2 className={estilos.subtitulo}>Alunos ({alunos.length})</h2>
      {alunos.length === 0 && <p className={estilos.dica}>Nenhum aluno ainda. Digite o nome e tecle Enter, ou cole vários nomes (um por linha).</p>}
      <ul className={estilos.alunos}>
        {alunos.map((a) => {
          const faga = fagasDaTurma.find((f) => f.alunoId === a.id);
          const atividades = faga?.faixas.flatMap((x) => x.atividades) ?? [];
          const feitas = atividades.filter((x) => x.feita).length;
          return (
            <li key={a.id} className={estilos.aluno}>
              <input value={a.nome} onChange={(e) => definirAlunos(alunos.map((x) => (x.id === a.id ? { ...x, nome: e.target.value } : x)))} maxLength={LIMITES_TURMA.texto} aria-label={`Nome do aluno ${a.nome}`} />
              <select
                value={a.livro}
                onChange={(e) => mudarAluno(a.id, { livro: e.target.value })}
                aria-label={`Livro de ${a.nome}`}
                disabled={Boolean(faga)}
                title={faga ? "A FAGA já foi criada com este livro" : undefined}
              >
                <option value="">Livro…</option>
                {MODELOS_FAGA.map((m) => (
                  <option key={m.livro} value={m.livro}>
                    {m.livro}{colecaoDoNivel(a.nivel) === m.colecao ? " · sugerido" : ""}
                  </option>
                ))}
              </select>
              {faga ? (
                <>
                  <span className={estilos.progresso}>{atividades.length ? `${Math.round((feitas / atividades.length) * 100)}%` : "sem aulas"}</span>
                  <button type="button" className={estilos.mini} onClick={() => aoAbrirFaga(faga)}>
                    Abrir FAGA
                  </button>
                </>
              ) : (
                <span className={estilos.semFaga}>sem FAGA</span>
              )}
              <button type="button" className={estilos.mini} onClick={() => definirAlunos(alunos.filter((x) => x.id !== a.id))} aria-label={`Remover ${a.nome} da turma`}>
                <Icone nome="x" tamanho={12} />
              </button>
              <div className={estilos.detalhes}>
                <label>
                  Nível na planilha
                  <input value={a.nivel ?? ""} onChange={(e) => mudarAluno(a.id, { nivel: e.target.value })} maxLength={60} placeholder="Ex.: Annual Book 4" />
                </label>
                <label>
                  Início
                  <input type="date" value={a.inicio ?? ""} onChange={(e) => mudarAluno(a.id, { inicio: e.target.value })} disabled={Boolean(faga)} title={faga ? "Edite as datas na própria FAGA" : undefined} />
                </label>
                <label>
                  Fim previsto
                  <input type="date" value={a.fim ?? ""} onChange={(e) => mudarAluno(a.id, { fim: e.target.value })} disabled={Boolean(faga)} title={faga ? "Edite as datas na própria FAGA" : undefined} />
                </label>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={estilos.adicionar}>
        <input
          value={novoAluno}
          onChange={(e) => definirNovoAluno(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              adicionar([novoAluno]);
              definirNovoAluno("");
            }
          }}
          placeholder="Nome do aluno e Enter"
          aria-label="Nome do novo aluno"
          maxLength={LIMITES_TURMA.texto}
        />
        <button type="button" className={estilos.mini} onClick={() => { adicionar([novoAluno]); definirNovoAluno(""); }} disabled={novoAluno.trim().length < 2}>
          <Icone nome="mais" tamanho={14} />
          Adicionar aluno
        </button>
      </div>
      <details className={estilos.varios}>
        <summary>Colar vários nomes de uma vez</summary>
        <textarea value={varios} onChange={(e) => definirVarios(e.target.value)} rows={5} placeholder={"Um nome por linha"} />
        <button type="button" className={estilos.mini} onClick={() => { adicionar(varios.split("\n")); definirVarios(""); }} disabled={!varios.trim()}>
          Adicionar os nomes
        </button>
      </details>

      <div className={estilos.acoes}>
        <button type="button" className={estilos.primario} onClick={() => void gerarFagas()} disabled={gerando || semUnidade || (!id && nome.trim().length < 2) || (faltam.length === 0 && !sujo)}>
          {gerando ? "Criando…" : `Criar a FAGA de cada aluno${faltam.length ? ` (${faltam.length})` : ""}`}
        </button>
        <span className={estilos.dica}>Cada FAGA sai com as aulas do livro escolhido ao lado do aluno; sem livro, sai em branco.</span>
      </div>

      {id && (
        <fieldset className={estilos.transferir}>
          <legend>Mudar de unidade ou excluir</legend>
          <label>
            Transferir a turma e as FAGAs dos alunos para
            <select value={destino} onChange={(e) => definirDestino(e.target.value)}>
              <option value="">Escolher unidade…</option>
              {unidades
                .filter((u) => u.id !== turma?.unidade)
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
            </select>
          </label>
          <button type="button" className={estilos.secundario} onClick={() => void transferir()} disabled={!destino || sujo}>
            Transferir turma
          </button>
          {confirmaApagar ? (
            <span className={estilos.confirmar}>
              Excluir a turma? As FAGAs dos alunos ficam como avulsas.
              <button type="button" className={estilos.perigo} onClick={() => void excluir()}>
                Sim, excluir
              </button>
              <button type="button" className={estilos.secundario} onClick={() => definirConfirmaApagar(false)}>
                Cancelar
              </button>
            </span>
          ) : (
            <button type="button" className={estilos.secundario} onClick={() => definirConfirmaApagar(true)}>
              <Icone nome="lixeira" tamanho={16} />
              Excluir turma
            </button>
          )}
          {sujo && <small>Salve a turma antes de transferir.</small>}
        </fieldset>
      )}
    </form>
  );
}
