import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { GradeLista } from "@/components/listas/GradeLista";
import { ICONE_TIPO } from "@/components/listas/iconesTipo";
import { MenuSuspenso } from "@/components/listas/MenuSuspenso";
import { gravarLista, obterLista } from "@/lib/apiListas";
import { ErroApi } from "@/lib/apiProvas";
import { formatarLinha, inserirColuna, inserirLinha, mesclar } from "@/lib/editarLista";
import { rotas } from "@/lib/rotas";
import { CORES_LINHA, LIMITES_LISTA, TIPOS_COLUNA, type ListaAcompanhamento } from "@/types/lista";
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

  const atual = useRef<ListaAcompanhamento | null>(null);
  const sujo = useRef(false);
  const emVoo = useRef(false);
  const relogio = useRef<number | undefined>(undefined);
  const salvarRef = useRef<() => Promise<void>>(async () => {});
  const conflitoAberto = useRef(false);
  /** Última versão que se sabe estar no servidor: é a base para juntar com as alterações de outro professor. */
  const base = useRef<ListaAcompanhamento | null>(null);

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
      trocarLista({ ...naTela, versao: gravada.versao, alteradaPor: gravada.alteradaPor, alteradaEm: gravada.alteradaEm });
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
      if (!atual.current) return;
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
  const cheiaDeColunas = lista.colunas.length >= LIMITES_LISTA.colunas;
  const cheiaDeLinhas = lista.linhas.length >= LIMITES_LISTA.linhas;

  return (
    <div className={estilos.pagina}>
      <Link to={rotas.professorListas()} className={estilos.voltar}>
        <Icone nome="seta-esquerda" tamanho={16} />
        Listas
      </Link>

      <header className={estilos.topo}>
        <div className={estilos.tituloBloco}>
          <label htmlFor="titulo-lista" className="sr-only">
            Nome da lista
          </label>
          <input
            id="titulo-lista"
            className={estilos.titulo}
            value={lista.titulo}
            maxLength={LIMITES_LISTA.titulo}
            onChange={(e) => alterar((l) => ({ ...l, titulo: e.target.value }))}
            onBlur={(e) => !e.target.value.trim() && alterar((l) => ({ ...l, titulo: "Sem título" }))}
          />
          <p className={estilos.meta}>
            <span className="tabular">
              {lista.linhas.length} {lista.linhas.length === 1 ? "linha" : "linhas"} · {lista.colunas.length} {lista.colunas.length === 1 ? "coluna" : "colunas"}
            </span>
            <span>
              Alterada por {lista.alteradaPor}, <span className="tabular">{dataHora(lista.alteradaEm)}</span>
            </span>
          </p>
        </div>
        <Situacao situacao={situacao} mensagem={mensagem} aoTentar={() => void salvar()} />
      </header>

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

      <div className={estilos.ferramentas} role="toolbar" aria-label="Editar a lista">
        <div className={estilos.grupo}>
          <button type="button" className={estilos.botao} disabled={cheiaDeLinhas} onClick={() => alterar((l) => inserirLinha(l))}>
            <Icone nome="mais" tamanho={16} />
            Linha
          </button>
          <MenuSuspenso
            rotulo="Adicionar coluna"
            classeGatilho={estilos.botao}
            gatilho={
              <>
                <Icone nome="mais" tamanho={16} />
                Coluna
                <Icone nome="seta-baixo" tamanho={14} className={estilos.seta} />
              </>
            }
          >
            {(fechar) => (
              <ul className={estilos.tipos}>
                {TIPOS_COLUNA.map((t) => (
                  <li key={t.tipo}>
                    <button
                      type="button"
                      className={estilos.tipo}
                      disabled={cheiaDeColunas}
                      onClick={() => {
                        fechar();
                        alterar((l) => inserirColuna(l, t.tipo, t.tipo === "texto" ? "Observação" : t.tipo === "opcoes" ? "Situação" : t.rotulo));
                      }}
                    >
                      <span className={estilos.tipoIcone}>
                        <Icone nome={ICONE_TIPO[t.tipo]} tamanho={16} />
                      </span>
                      <span>
                        <strong>{t.rotulo}</strong>
                        <span>{t.descricao}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </MenuSuspenso>
        </div>

        <div className={estilos.grupo} role="group" aria-label={linhaSelecionada ? "Formatar a linha selecionada" : "Selecione uma linha para formatar"}>
          <span className={estilos.rotuloGrupo}>
            <Icone nome="pincel" tamanho={15} />
            {linhaSelecionada ? `Linha ${lista.linhas.indexOf(linhaSelecionada) + 1}` : "Formatar linha"}
          </span>
          <button
            type="button"
            className={`${estilos.amostra} ${estilos.semCor}`}
            aria-label="Sem cor"
            aria-pressed={!!linhaSelecionada && !linhaSelecionada.cor}
            disabled={!linhaSelecionada}
            onClick={() => linhaSelecionada && alterar((l) => formatarLinha(l, linhaSelecionada.id, { cor: null }))}
          />
          {CORES_LINHA.map(({ cor, rotulo }) => (
            <button
              key={cor}
              type="button"
              className={`${estilos.amostra} ${estilos[`amostra-${cor}`]}`}
              aria-label={rotulo}
              aria-pressed={linhaSelecionada?.cor === cor}
              disabled={!linhaSelecionada}
              onClick={() => linhaSelecionada && alterar((l) => formatarLinha(l, linhaSelecionada.id, { cor }))}
            />
          ))}
          <button
            type="button"
            className={`${estilos.botao} ${estilos.icone}`}
            aria-label="Negrito"
            aria-pressed={!!linhaSelecionada?.negrito}
            disabled={!linhaSelecionada}
            onClick={() => linhaSelecionada && alterar((l) => formatarLinha(l, linhaSelecionada.id, { negrito: !linhaSelecionada.negrito }))}
          >
            <Icone nome="negrito" tamanho={16} />
          </button>
        </div>

        <button
          type="button"
          className={`${estilos.botao} ${estilos.exportar}`}
          onClick={() => void import("@/lib/exportarLista").then(({ baixarXlsx }) => baixarXlsx(atual.current ?? lista))}
        >
          <Icone nome="baixar" tamanho={16} />
          Exportar .xlsx
        </button>
      </div>

      {lista.colunas.length === 0 ? (
        <EstadoVazio icone="tabela" titulo="Nenhuma coluna" texto="Use «Coluna» acima para criar a primeira: texto, marca, Sim/Não ou lista de opções." />
      ) : (
        <>
          <GradeLista lista={lista} alterar={alterar} linhaAtiva={linhaAtiva} definirLinhaAtiva={definirLinhaAtiva} />
          {lista.linhas.length === 0 ? (
            <button type="button" className={estilos.novaLinha} onClick={() => alterar((l) => inserirLinha(l))}>
              <Icone nome="mais" tamanho={16} />
              Adicionar a primeira linha
            </button>
          ) : (
            <button type="button" className={estilos.novaLinha} disabled={cheiaDeLinhas} onClick={() => alterar((l) => inserirLinha(l))}>
              <Icone nome="mais" tamanho={16} />
              Nova linha
            </button>
          )}
        </>
      )}

      <p className={estilos.dica}>
        Salva sozinho a cada alteração (ou Ctrl+S). Setas e Enter andam entre as células; clique no título de uma coluna para renomear, mudar o tipo, mover ou apagar; arraste a borda dela para alargar.
      </p>
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
