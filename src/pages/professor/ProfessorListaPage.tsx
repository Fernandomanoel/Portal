import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { GradeLista, MenuNovaColuna } from "@/components/listas/GradeLista";
import { MenuSuspenso } from "@/components/listas/MenuSuspenso";
import { useEntrarEmTelaImersiva } from "@/hooks/TelaImersiva";
import { gravarLista, obterLista } from "@/lib/apiListas";
import { ErroApi, listarUnidades } from "@/lib/apiProvas";
import { formatarLinha, inserirLinha, inserirTitulo, mesclar } from "@/lib/editarLista";
import { rotas } from "@/lib/rotas";
import { CORES_LINHA, LIMITES_LISTA, type Compartilhamento, type ListaAcompanhamento } from "@/types/lista";
import { TODAS_AS_UNIDADES, type Unidade } from "@/types/unidade";
import { dataHora, hora } from "./formato";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorListaPage.module.css";

type Situacao = "salvo" | "pendente" | "salvando" | "erro" | "conflito";

const ESPERA_SALVAR_MS = 800;
// Outro professor pode estar na mesma lista: sem edição pendente, a tela busca a versão nova.
const ATUALIZAR_A_CADA_MS = 20_000;
const chaveRascunho = (id: string) => `lista-rascunho:${id}`;

function lerRascunho(id: string): ListaAcompanhamento | null {
  try {
    const bruto = localStorage.getItem(chaveRascunho(id));
    return bruto ? (JSON.parse(bruto) as ListaAcompanhamento) : null;
  } catch {
    return null;
  }
}

function guardarRascunho(lista: ListaAcompanhamento) {
  try {
    localStorage.setItem(chaveRascunho(lista.id), JSON.stringify(lista));
  } catch {
    // Sem armazenamento local (aba anônima, cota cheia): o aviso de erro na tela continua valendo.
  }
}

function apagarRascunho(id: string) {
  try {
    localStorage.removeItem(chaveRascunho(id));
  } catch {
    // idem
  }
}

export function ProfessorListaPage() {
  // A lista é uma tela de trabalho: sem menu nem rodapé do portal, com a grade ocupando a janela.
  useEntrarEmTelaImersiva();
  const { id = "" } = useParams();
  const { sessaoVencida } = useProfessor();
  const [lista, definirLista] = useState<ListaAcompanhamento | null>(null);
  const [erroCarga, definirErroCarga] = useState<string | null>(null);
  const [situacao, definirSituacao] = useState<Situacao>("salvo");
  const [mensagem, definirMensagem] = useState<string | null>(null);
  const [conflito, definirConflito] = useState<ListaAcompanhamento | null>(null);
  const [rascunho, definirRascunho] = useState<ListaAcompanhamento | null>(null);
  const [linhaAtiva, definirLinhaAtiva] = useState<string | null>(null);
  const [aviso, definirAviso] = useState<string | null>(null);
  const [unidades, definirUnidades] = useState<Unidade[]>([]);

  const atual = useRef<ListaAcompanhamento | null>(null);
  const sujo = useRef(false);
  const emVoo = useRef(false);
  const relogio = useRef<number | undefined>(undefined);
  const salvarRef = useRef<() => Promise<void>>(async () => {});
  const conflitoAberto = useRef(false);
  /** Última versão que se sabe estar no servidor: é a base para juntar com as alterações de outro professor. */
  const base = useRef<ListaAcompanhamento | null>(null);

  useEffect(() => {
    void listarUnidades().then(definirUnidades).catch(() => {});
  }, []);

  const trocarLista = useCallback((nova: ListaAcompanhamento) => {
    atual.current = nova;
    definirLista(nova);
  }, []);

  useEffect(() => {
    let ativo = true;
    obterLista(id)
      .then((carregada) => {
        if (!ativo) return;
        base.current = carregada;
        trocarLista(carregada);
        const guardado = lerRascunho(id);
        if (guardado && guardado.versao === carregada.versao && JSON.stringify(guardado) !== JSON.stringify(carregada)) definirRascunho(guardado);
        else if (guardado) apagarRascunho(id);
      })
      .catch((falha) => {
        if (!ativo) return;
        if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
        else definirErroCarga(falha instanceof ErroApi ? falha.message : "Não foi possível abrir a lista.");
      });
    return () => {
      ativo = false;
    };
  }, [id, sessaoVencida, trocarLista]);

  const agendar = useCallback(() => {
    window.clearTimeout(relogio.current);
    definirSituacao("pendente");
    relogio.current = window.setTimeout(() => void salvarRef.current(), ESPERA_SALVAR_MS);
  }, []);

  const salvar = useCallback(async () => {
    window.clearTimeout(relogio.current);
    const enviar = atual.current;
    if (!enviar || emVoo.current) return;
    emVoo.current = true;
    sujo.current = false;
    let falhou = false;
    let refazer = false;
    definirSituacao("salvando");
    try {
      const gravada = await gravarLista(enviar);
      // O que foi editado enquanto a gravação viajava continua na tela; só a versão e a autoria vêm do servidor.
      base.current = gravada;
      const naTela = atual.current ?? gravada;
      trocarLista({ ...naTela, versao: gravada.versao, alteradaPor: gravada.alteradaPor, alteradaEm: gravada.alteradaEm, acesso: gravada.acesso });
      apagarRascunho(enviar.id);
      definirMensagem(null);
      definirSituacao(sujo.current ? "pendente" : "salvo");
    } catch (falha) {
      falhou = true;
      sujo.current = true;
      if (atual.current) guardarRascunho(atual.current);
      if (falha instanceof ErroApi && falha.status === 409) {
        const doServidor = (falha.corpo as { atual?: ListaAcompanhamento } | undefined)?.atual ?? null;
        const juntas = doServidor && base.current && atual.current ? mesclar(base.current, atual.current, doServidor) : null;
        if (doServidor && juntas) {
          // Mexemos em células diferentes: junta as duas e grava de novo, sem perguntar.
          base.current = doServidor;
          trocarLista({ ...juntas, versao: doServidor.versao });
          definirAviso(`Juntei as suas alterações com as de ${doServidor.alteradaPor}.`);
          refazer = true;
        } else {
          conflitoAberto.current = doServidor !== null;
          definirConflito(doServidor);
          definirMensagem(falha.message);
          definirSituacao("conflito");
        }
      } else if (falha instanceof ErroApi && falha.status === 401) {
        sessaoVencida();
      } else {
        definirMensagem(falha instanceof ErroApi ? falha.message : "Não foi possível salvar.");
        definirSituacao("erro");
      }
    } finally {
      emVoo.current = false;
    }
    if (refazer) void salvarRef.current();
    else if (sujo.current && !falhou) agendar();
  }, [agendar, sessaoVencida, trocarLista]);

  useEffect(() => {
    salvarRef.current = salvar;
  }, [salvar]);

  const alterar = useCallback(
    (mudar: (l: ListaAcompanhamento) => ListaAcompanhamento) => {
      // Quem só pode ver a lista não altera nada, nem por atalho.
      if (!atual.current || atual.current.acesso?.editar === false) return;
      trocarLista(mudar(atual.current));
      sujo.current = true;
      if (!conflitoAberto.current) agendar();
    },
    [agendar, trocarLista],
  );

  // Ctrl+S salva na hora; sair com edição pendente pede confirmação.
  useEffect(() => {
    const tecla = (evento: KeyboardEvent) => {
      if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === "s") {
        evento.preventDefault();
        if (!conflitoAberto.current) void salvarRef.current();
      }
    };
    const sair = (evento: BeforeUnloadEvent) => {
      if (sujo.current || emVoo.current) evento.preventDefault();
    };
    window.addEventListener("keydown", tecla);
    window.addEventListener("beforeunload", sair);
    return () => {
      window.removeEventListener("keydown", tecla);
      window.removeEventListener("beforeunload", sair);
      window.clearTimeout(relogio.current);
    };
  }, []);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      if (document.visibilityState !== "visible" || sujo.current || emVoo.current || conflitoAberto.current || !atual.current) return;
      obterLista(id)
        .then((nova) => {
          if (sujo.current || emVoo.current || !atual.current || nova.versao <= atual.current.versao) return;
          base.current = nova;
          trocarLista(nova);
          definirAviso(`Atualizada com as alterações de ${nova.alteradaPor}, às ${hora(nova.alteradaEm)}.`);
        })
        .catch(() => {});
    }, ATUALIZAR_A_CADA_MS);
    return () => window.clearInterval(intervalo);
  }, [id, trocarLista]);

  useEffect(() => {
    if (!aviso) return;
    const t = window.setTimeout(() => definirAviso(null), 6000);
    return () => window.clearTimeout(t);
  }, [aviso]);

  if (erroCarga) {
    return (
      <>
        <Link to={rotas.professorListas()} className={estilos.voltar}>
          <Icone nome="seta-esquerda" tamanho={16} />
          Listas
        </Link>
        <EstadoVazio icone="tabela" titulo="Lista não encontrada" texto={erroCarga} />
      </>
    );
  }

  if (!lista) return <p aria-live="polite">Abrindo a lista…</p>;

  const linhaSelecionada = lista.linhas.find((l) => l.id === linhaAtiva) ?? null;

  const nLinhas = lista.linhas.filter((l) => l.titulo === undefined).length;
  const somenteLeitura = lista.acesso?.editar === false;
  const podeCompartilhar = lista.acesso?.administrar === true;
  const nomeUnidade = (id: string) => (id === TODAS_AS_UNIDADES ? "todas as unidades" : (unidades.find((u) => u.id === id)?.nome ?? id));

  return (
    <div className={estilos.pagina}>
      <header className={estilos.barraTopo}>
        <Link to={rotas.professorListas()} className={estilos.voltarBotao}>
          <Icone nome="seta-esquerda" tamanho={18} />
          <span>Voltar às listas</span>
        </Link>
        <span className={estilos.folha} aria-hidden="true">
          <Icone nome="tabela" tamanho={22} />
        </span>
        <div className={estilos.tituloBloco}>
          <label htmlFor="titulo-lista" className="sr-only">
            Nome da lista
          </label>
          <input
            id="titulo-lista"
            className={estilos.titulo}
            value={lista.titulo}
            maxLength={LIMITES_LISTA.titulo}
            readOnly={somenteLeitura}
            onChange={(e) => alterar((l) => ({ ...l, titulo: e.target.value }))}
            onBlur={(e) => !e.target.value.trim() && alterar((l) => ({ ...l, titulo: "Sem título" }))}
          />
          <p className={estilos.meta}>
            {lista.unidade ? `Da ${lista.unidade === TODAS_AS_UNIDADES ? "rede (todas as unidades)" : `unidade ${nomeUnidade(lista.unidade)}`} · ` : ""}
            {lista.compartilhamento ? `compartilhada com ${lista.compartilhamento.com === "todas" ? "todas as unidades" : lista.compartilhamento.unidades.map(nomeUnidade).join(", ")} · ` : ""}
            alterada por {lista.alteradaPor}, <span className="tabular">{dataHora(lista.alteradaEm)}</span>
          </p>
        </div>
        <Situacao situacao={situacao} mensagem={mensagem} aoTentar={() => void salvar()} />
        <button
          type="button"
          className={`${estilos.botao} ${estilos.exportar}`}
          onClick={() => void import("@/lib/exportarLista").then(({ baixarXlsx }) => baixarXlsx(atual.current ?? lista))}
        >
          <Icone nome="baixar" tamanho={16} />
          Exportar .xlsx
        </button>
      </header>

      {somenteLeitura && (
        <p className={`${estilos.faixa} ${estilos.faixaInfo}`} role="status">
          <Icone nome="cadeado" tamanho={18} />
          Você pode ver esta lista, mas não editar. Se precisar mudar algo, fale com quem cuida dela.
        </p>
      )}

      <div className={estilos.ferramentas} role="toolbar" aria-label="Editar a lista">
        <div className={estilos.grupo} role="group" aria-label="Inserir">
          <button
            type="button"
            className={estilos.botao}
            disabled={somenteLeitura || lista.linhas.length >= LIMITES_LISTA.linhas}
            onClick={() => alterar((l) => inserirLinha(l))}
          >
            <Icone nome="mais" tamanho={16} />
            Linha
          </button>
          <button
            type="button"
            className={estilos.botao}
            disabled={somenteLeitura || lista.linhas.length >= LIMITES_LISTA.linhas}
            onClick={() => alterar((l) => inserirTitulo(l, l.linhas.length))}
          >
            <Icone nome="tabela" tamanho={16} />
            Título de bloco
          </button>
          {!somenteLeitura && (
          <MenuNovaColuna
            lista={lista}
            alterar={alterar}
            rotulo="Nova coluna"
            classeGatilho={estilos.botao}
            gatilho={
              <>
                <Icone nome="mais" tamanho={16} />
                Coluna
                <Icone nome="seta-baixo" tamanho={13} />
              </>
            }
          />
          )}
          {podeCompartilhar && (
            <MenuSuspenso
              rotulo="Compartilhar a lista"
              classeGatilho={estilos.botao}
              gatilho={
                <>
                  <Icone nome="pessoas" tamanho={16} />
                  Compartilhar
                  <Icone nome="seta-baixo" tamanho={13} />
                </>
              }
            >
              {() => <PainelCompartilhar lista={lista} unidades={unidades} aoMudar={(c) => alterar((l) => ({ ...l, compartilhamento: c }))} />}
            </MenuSuspenso>
          )}
        </div>

        <div className={estilos.grupo} role="group" aria-label={linhaSelecionada ? "Formatar a linha selecionada" : "Selecione uma linha para formatar"}>
          <span className={estilos.rotuloGrupo}>
            <Icone nome="pincel" tamanho={15} />
            {linhaSelecionada ? (linhaSelecionada.titulo !== undefined ? "Título" : "Linha selecionada") : "Formatar linha"}
          </span>
          <button
            type="button"
            className={`${estilos.amostra} ${estilos.semCor}`}
            aria-label="Sem cor"
            aria-pressed={!!linhaSelecionada && !linhaSelecionada.cor}
            disabled={somenteLeitura || !linhaSelecionada}
            onClick={() => linhaSelecionada && alterar((l) => formatarLinha(l, linhaSelecionada.id, { cor: null }))}
          />
          {CORES_LINHA.map(({ cor, rotulo }) => (
            <button
              key={cor}
              type="button"
              className={`${estilos.amostra} ${estilos[`amostra-${cor}`]}`}
              aria-label={rotulo}
              aria-pressed={linhaSelecionada?.cor === cor}
              disabled={somenteLeitura || !linhaSelecionada}
              onClick={() => linhaSelecionada && alterar((l) => formatarLinha(l, linhaSelecionada.id, { cor }))}
            />
          ))}
          <button
            type="button"
            className={`${estilos.botao} ${estilos.icone}`}
            aria-label="Negrito"
            aria-pressed={!!linhaSelecionada?.negrito}
            disabled={somenteLeitura || !linhaSelecionada}
            onClick={() => linhaSelecionada && alterar((l) => formatarLinha(l, linhaSelecionada.id, { negrito: !linhaSelecionada.negrito }))}
          >
            <Icone nome="negrito" tamanho={16} />
          </button>
        </div>
      </div>

      {rascunho && (
        <div className={`${estilos.faixa} ${estilos.faixaAviso}`} role="status">
          <Icone nome="alerta" tamanho={18} />
          <p>Este computador tem alterações desta lista que não chegaram ao servidor.</p>
          <div className={estilos.faixaAcoes}>
            <button
              type="button"
              className={estilos.faixaPrincipal}
              onClick={() => {
                const guardado = rascunho;
                definirRascunho(null);
                alterar(() => guardado);
              }}
            >
              Recuperar
            </button>
            <button
              type="button"
              className={estilos.faixaSecundario}
              onClick={() => {
                apagarRascunho(lista.id);
                definirRascunho(null);
              }}
            >
              Descartar
            </button>
          </div>
        </div>
      )}

      {conflito && (
        <div className={`${estilos.faixa} ${estilos.faixaPerigo}`} role="alert">
          <Icone nome="pessoas" tamanho={18} />
          <p>
            <strong>{conflito.alteradaPor}</strong> mudou as mesmas células que você, às {hora(conflito.alteradaEm)}. Escolha qual versão fica.
          </p>
          <div className={estilos.faixaAcoes}>
            <button
              type="button"
              className={estilos.faixaSecundario}
              onClick={() => {
                sujo.current = false;
                apagarRascunho(conflito.id);
                base.current = conflito;
                trocarLista(conflito);
                conflitoAberto.current = false;
                definirConflito(null);
                definirMensagem(null);
                definirSituacao("salvo");
              }}
            >
              Usar a de {conflito.alteradaPor.split(" ")[0]}
            </button>
            <button
              type="button"
              className={estilos.faixaPrincipal}
              onClick={() => {
                base.current = conflito;
                if (atual.current) trocarLista({ ...atual.current, versao: conflito.versao });
                conflitoAberto.current = false;
                definirConflito(null);
                void salvar();
              }}
            >
              Manter a minha
            </button>
          </div>
        </div>
      )}

      {aviso && (
        <p className={`${estilos.faixa} ${estilos.faixaInfo}`} role="status">
          <Icone nome="recomecar" tamanho={18} />
          {aviso}
        </p>
      )}

      {lista.colunas.length === 0 ? (
        <EstadoVazio icone="tabela" titulo="Nenhuma coluna" texto="Use o botão + no canto da grade para criar a primeira: texto, marca, Sim/Não ou lista de opções." />
      ) : (
        <>
          <fieldset className={estilos.areaGrade} disabled={somenteLeitura}>
            <GradeLista lista={lista} alterar={alterar} linhaAtiva={linhaAtiva} definirLinhaAtiva={definirLinhaAtiva} />
          </fieldset>
        </>
      )}

      <footer className={estilos.rodape}>
        <span className="tabular">
          {nLinhas} {nLinhas === 1 ? "linha" : "linhas"} · {lista.colunas.length} {lista.colunas.length === 1 ? "coluna" : "colunas"}
        </span>
        <span>Salva sozinho (ou Ctrl+S) · Setas e Enter andam entre as células · Clique no título da coluna para renomear, mudar o tipo ou apagar</span>
      </footer>
    </div>
  );
}

function Situacao({ situacao, mensagem, aoTentar }: { situacao: Situacao; mensagem: string | null; aoTentar: () => void }) {
  if (situacao === "erro") {
    return (
      <p className={`${estilos.situacao} ${estilos.situacaoErro}`} role="alert">
        <Icone nome="alerta" tamanho={15} />
        <span>{mensagem ?? "Não foi possível salvar."}</span>
        <button type="button" onClick={aoTentar}>
          Tentar de novo
        </button>
      </p>
    );
  }
  const texto = { salvo: "Salvo", pendente: "Alterações não salvas", salvando: "Salvando…", conflito: "Não salvo — escolha a versão" }[situacao];
  return (
    <p className={`${estilos.situacao} ${estilos[`situacao-${situacao}`]}`} aria-live="polite">
      {situacao === "salvo" ? <Icone nome="check" tamanho={15} /> : <span className={estilos.ponto} aria-hidden="true" />}
      {texto}
    </p>
  );
}

/** Com quem a lista é compartilhada, como num site do SharePoint: só a unidade dona, todas, ou as escolhidas. */
function PainelCompartilhar({ lista, unidades, aoMudar }: { lista: ListaAcompanhamento; unidades: Unidade[]; aoMudar: (c: Compartilhamento | undefined) => void }) {
  const atual = lista.compartilhamento;
  const modo = !atual ? "dona" : atual.com;
  const outras = unidades.filter((u) => u.id !== lista.unidade);
  const escolher = (m: "dona" | "todas" | "unidades") => {
    if (m === "dona") aoMudar(undefined);
    else if (m === "todas") aoMudar({ com: "todas", unidades: [], edicao: atual?.edicao ?? false });
    else aoMudar({ com: "unidades", unidades: atual?.unidades.length ? atual.unidades : outras.slice(0, 1).map((u) => u.id), edicao: atual?.edicao ?? false });
  };
  return (
    <div className={estilos.compartilhar}>
      <p className={estilos.compartilharTitulo}>Quem enxerga esta lista</p>
      {(
        [
          ["dona", lista.unidade === TODAS_AS_UNIDADES ? "Só quem acessa todas as unidades" : "Só a unidade dona"],
          ["todas", "Todas as unidades"],
          ["unidades", "Unidades escolhidas"],
        ] as const
      ).map(([valor, rotulo]) => (
        <label key={valor} className={estilos.compartilharOpcao}>
          <input type="radio" name="compartilhar" checked={modo === valor} onChange={() => escolher(valor)} />
          {rotulo}
        </label>
      ))}
      {modo === "unidades" && (
        <div className={estilos.compartilharUnidades} role="group" aria-label="Unidades que recebem">
          {outras.map((u) => (
            <label key={u.id} className={estilos.compartilharOpcao}>
              <input
                type="checkbox"
                checked={atual?.unidades.includes(u.id) ?? false}
                onChange={() => {
                  const ids = atual?.unidades ?? [];
                  const novas = ids.includes(u.id) ? ids.filter((x) => x !== u.id) : [...ids, u.id];
                  // Sem nenhuma unidade marcada, volta a ser só da dona.
                  aoMudar(novas.length ? { com: "unidades", unidades: novas, edicao: atual?.edicao ?? false } : undefined);
                }}
              />
              {u.nome}
            </label>
          ))}
        </div>
      )}
      {atual && (
        <label className={`${estilos.compartilharOpcao} ${estilos.compartilharEdicao}`}>
          <input type="checkbox" checked={atual.edicao} onChange={() => aoMudar({ ...atual, edicao: !atual.edicao })} />
          Quem recebe também pode editar
        </label>
      )}
      <p className={estilos.compartilharNota}>A unidade dona sempre edita, compartilha e apaga. Quem só recebe vê (ou edita, se marcado), mas não apaga.</p>
    </div>
  );
}
