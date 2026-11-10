import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { apagarLista, criarLista, listarListas } from "@/lib/apiListas";
import { ErroApi, listarUnidades } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import type { ResumoLista } from "@/types/lista";
import type { Unidade } from "@/types/unidade";
import { TODAS_AS_UNIDADES } from "@/types/unidade";
import { dataHora } from "./formato";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorListasPage.module.css";

export function ProfessorListasPage() {
  const { sessaoVencida, professor, unidadeAtual } = useProfessor();
  const semUnidade = professor.coordenacao && !unidadeAtual;
  const podeEditar = professor.permissoes.includes("listas_editar");
  const [unidades, definirUnidades] = useState<Unidade[]>([]);
  useEffect(() => {
    void listarUnidades().then(definirUnidades).catch(() => {});
  }, []);
  const nomeUnidade = (id: string) => unidades.find((u) => u.id === id)?.nome ?? id;
  /** «Da Alvorada» / «Da rede» e, se for o caso, com quem foi compartilhada. */
  const origem = (l: ResumoLista) => {
    const dona = l.unidade === TODAS_AS_UNIDADES ? "Da rede (todas as unidades)" : l.unidade ? `Da unidade ${nomeUnidade(l.unidade)}` : "Sem unidade definida";
    const c = l.compartilhamento;
    if (!c) return dona;
    return `${dona} · compartilhada com ${c.com === "todas" ? "todas as unidades" : c.unidades.map(nomeUnidade).join(", ")}${c.edicao ? " (podem editar)" : " (só leitura)"}`;
  };
  const navegar = useNavigate();
  const [listas, definirListas] = useState<ResumoLista[] | null>(null);
  const [erro, definirErro] = useState<string | null>(null);
  const [criando, definirCriando] = useState(false);
  const [apagando, definirApagando] = useState<string | null>(null);

  const tratar = useCallback(
    (falha: unknown, padrao: string) => {
      if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : padrao);
    },
    [sessaoVencida],
  );

  const carregar = useCallback(async () => {
    try {
      definirListas((await listarListas()).dados);
      definirErro(null);
    } catch (falha) {
      tratar(falha, "Não foi possível carregar as listas.");
    }
  }, [tratar]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function nova(duplicarDe?: string, paraTodas = false) {
    definirCriando(true);
    try {
      const lista = await criarLista(duplicarDe, paraTodas);
      navegar(rotas.professorLista(lista.id));
    } catch (falha) {
      tratar(falha, "Não foi possível criar a lista.");
      definirCriando(false);
    }
  }

  async function apagar(id: string) {
    try {
      await apagarLista(id);
      definirApagando(null);
      definirListas((atuais) => atuais?.filter((l) => l.id !== id) ?? null);
    } catch (falha) {
      tratar(falha, "Não foi possível apagar a lista.");
    }
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Listas de acompanhamento"
        texto={`Listas da equipe ${professor.coordenacao ? (unidadeAtual ? "da unidade escolhida" : "de todas as unidades") : `da ${professor.unidade.nome}`} para acompanhar alunos, entregas e reposições. Os professores da unidade veem e editam as mesmas listas, e cada lista pode ser compartilhada com outras unidades. Elas ficam guardadas até alguém apagar e podem ser exportadas em .xlsx.`}
        acoes={
          podeEditar ? (
            <div className={estilos.acoesTopo}>
              <button
                type="button"
                className={estilos.nova}
                onClick={() => void nova()}
                disabled={criando || semUnidade}
                title={semUnidade ? "Escolha uma unidade no topo da página para criar a lista" : undefined}
              >
                <Icone nome="mais" tamanho={17} />
                {criando ? "Criando…" : "Nova lista"}
              </button>
              {professor.todasAsUnidades && !unidadeAtual && (
                <button type="button" className={estilos.novaSecundaria} onClick={() => void nova(undefined, true)} disabled={criando} title="Uma lista da rede, que todas as unidades enxergam">
                  <Icone nome="pessoas" tamanho={17} />
                  Nova lista para todas as unidades
                </button>
              )}
            </div>
          ) : undefined
        }
      />

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {listas === null ? (
        !erro && <p aria-live="polite">Carregando as listas…</p>
      ) : listas.length === 0 ? (
        <EstadoVazio
          icone="tabela"
          titulo="Nenhuma lista ainda"
          texto="Crie a primeira com «Nova lista»: ela já vem com as colunas Aluno e Presente, e você acrescenta o que precisar — texto, marca, Sim/Não ou lista de opções."
        />
      ) : (
        <ul className={estilos.lista}>
          {listas.map((lista) => (
            <li key={lista.id} className={estilos.item}>
              <div className={estilos.capa} aria-hidden="true" />
              <div className={estilos.corpo}>
                <span className={estilos.selo} aria-hidden="true">
                  <Icone nome="tabela" tamanho={18} />
                </span>
                <div className={estilos.texto}>
                  <p className={estilos.titulo}>
                    <Link to={rotas.professorLista(lista.id)}>
                      {lista.titulo}
                    </Link>
                  </p>
                  <p className={estilos.origem}>{origem(lista)}</p>
                  <p className={estilos.meta}>
                    <span className="tabular">
                      {lista.linhas} {lista.linhas === 1 ? "linha" : "linhas"} ·{" "}
                      {lista.colunas}{" "}
                      {lista.colunas === 1 ? "coluna" : "colunas"}
                    </span>
                    <span>
                      Alterada por {lista.alteradaPor},{" "}
                      <span className="tabular">
                        {dataHora(lista.alteradaEm)}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              {apagando === lista.id ? (
                <div className={estilos.confirmar}>
                  <span>Apagar para todos?</span>
                  <button
                    type="button"
                    className={estilos.acao}
                    onClick={() => definirApagando(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className={`${estilos.acao} ${estilos.perigo}`}
                    onClick={() => void apagar(lista.id)}
                  >
                    Apagar
                  </button>
                </div>
              ) : podeEditar ? (
                <div className={estilos.acoes}>
                  <button
                    type="button"
                    className={estilos.acao}
                    onClick={() => void nova(lista.id)}
                    disabled={criando || semUnidade}
                    aria-label={`Duplicar ${lista.titulo}`}
                  >
                    <Icone nome="copiar" tamanho={16} />
                    <span>Duplicar</span>
                  </button>
                  {lista.acesso?.administrar && (
                    <button
                      type="button"
                      className={`${estilos.acao} ${estilos.apagar}`}
                      onClick={() => definirApagando(lista.id)}
                      aria-label={`Apagar ${lista.titulo}`}
                    >
                      <Icone nome="lixeira" tamanho={16} />
                    </button>
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
