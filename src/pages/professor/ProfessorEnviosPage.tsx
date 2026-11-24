import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { ErroApi, listarEnvios } from "@/lib/apiProvas";
import { areaDaProva } from "@/lib/area";
import { normalizar } from "@/lib/busca";
import { rotas } from "@/lib/rotas";
import { DIAS_GUARDADOS, type Envio } from "@/types/envio";
import { dataHora, nota, situacaoDaNota } from "./formato";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorEnviosPage.module.css";

type Filtro = "todos" | "corrigir" | "corrigidos";

const FILTROS: { id: Filtro; rotulo: string }[] = [
  { id: "todos", rotulo: "Todos" },
  { id: "corrigir", rotulo: "A corrigir" },
  { id: "corrigidos", rotulo: "Com nota" },
];

// Durante a aula as provas vão chegando: a lista se atualiza sozinha.
const ATUALIZAR_A_CADA_MS = 30_000;

export function ProfessorEnviosPage() {
  const { sessaoVencida, professor, unidadeAtual, area } = useProfessor();
  const nomeUnidade = (id?: string) => professor.unidades.find((u) => u.id === id)?.nome;
  const [envios, definirEnvios] = useState<Envio[] | null>(null);
  const [erro, definirErro] = useState<string | null>(null);
  const [atualizando, definirAtualizando] = useState(false);
  const [busca, definirBusca] = useState("");
  const [provaId, definirProvaId] = useState("");
  const [filtro, definirFiltro] = useState<Filtro>("todos");

  const carregar = useCallback(async () => {
    definirAtualizando(true);
    try {
      const { dados } = await listarEnvios();
      definirEnvios(dados.filter((e) => (e.area ?? areaDaProva(e.provaId)) === area));
      definirErro(null);
    } catch (falha) {
      if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível carregar os envios.");
    } finally {
      definirAtualizando(false);
    }
  }, [sessaoVencida, area]);

  useEffect(() => {
    void carregar();
    const intervalo = window.setInterval(() => {
      if (document.visibilityState === "visible") void carregar();
    }, ATUALIZAR_A_CADA_MS);
    return () => window.clearInterval(intervalo);
  }, [carregar]);

  const provas = useMemo(() => {
    const titulos = new Map<string, string>();
    for (const envio of envios ?? []) if (!titulos.has(envio.provaId)) titulos.set(envio.provaId, envio.provaTitulo);
    return [...titulos].sort((a, b) => a[1].localeCompare(b[1], "pt-BR"));
  }, [envios]);

  const aCorrigir = envios?.filter((envio) => envio.nota === null).length ?? 0;

  const visiveis = useMemo(() => {
    const termo = normalizar(busca);
    return (envios ?? []).filter(
      (envio) =>
        (!provaId || envio.provaId === provaId) &&
        (filtro === "todos" || (filtro === "corrigir") === (envio.nota === null)) &&
        (!termo || normalizar(`${envio.nomeAluno} ${envio.provaTitulo}`).includes(termo)),
    );
  }, [envios, busca, provaId, filtro]);

  return (
    <>
      <CabecalhoPagina
        titulo="Provas enviadas"
        texto={`Só aparecem os envios ${professor.coordenacao ? (unidadeAtual ? "da unidade escolhida" : "de todas as unidades") : `da ${professor.unidade.nome}`}. Cada envio fica guardado por ${DIAS_GUARDADOS} dias e depois é apagado sozinho, com o arquivo. Baixe o que precisar guardar.`}
      />

      <div className={estilos.ferramentas}>
        <form className={estilos.busca} role="search" onSubmit={(evento) => evento.preventDefault()}>
          <Icone nome="busca" tamanho={17} />
          <input
            type="search"
            value={busca}
            onChange={(evento) => definirBusca(evento.target.value)}
            placeholder="Buscar aluno"
            aria-label="Buscar aluno nas provas enviadas"
          />
        </form>

        <select className={estilos.prova} value={provaId} onChange={(evento) => definirProvaId(evento.target.value)} aria-label="Filtrar por prova">
          <option value="">Todas as provas</option>
          {provas.map(([id, titulo]) => (
            <option key={id} value={id}>
              {titulo}
            </option>
          ))}
        </select>

        <div className={estilos.filtros} role="group" aria-label="Filtrar por correção">
          {FILTROS.map(({ id, rotulo }) => (
            <button
              key={id}
              type="button"
              className={filtro === id ? `${estilos.filtro} ${estilos.filtroAtivo}` : estilos.filtro}
              aria-pressed={filtro === id}
              onClick={() => definirFiltro(id)}
            >
              {rotulo}
              {id === "corrigir" && aCorrigir > 0 && <span className={`${estilos.conta} tabular`}>{aCorrigir}</span>}
            </button>
          ))}
        </div>

        <button type="button" className={estilos.atualizar} onClick={() => void carregar()} disabled={atualizando}>
          <Icone nome="recomecar" tamanho={16} />
          {atualizando ? "Atualizando…" : "Atualizar"}
        </button>
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {envios === null ? (
        !erro && <p aria-live="polite">Carregando os envios…</p>
      ) : envios.length === 0 ? (
        <EstadoVazio
          icone="prova"
          titulo="Nenhuma prova enviada"
          texto={`Quando um aluno enviar uma prova, ela aparece aqui. Envios com mais de ${DIAS_GUARDADOS} dias já foram apagados.`}
        />
      ) : visiveis.length === 0 ? (
        <EstadoVazio icone="busca" titulo="Nenhum envio com esse filtro" texto="Tente outro nome, outra prova ou mostre todos." />
      ) : (
        <>
          <p className={`${estilos.total} tabular`}>
            {visiveis.length} {visiveis.length === 1 ? "envio" : "envios"}
          </p>
          <ul className={estilos.lista}>
            {visiveis.map((envio) => (
              <LinhaEnvio key={envio.id} envio={envio} unidade={professor.coordenacao && !unidadeAtual ? nomeUnidade(envio.unidade) : undefined} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function LinhaEnvio({ envio, unidade }: { envio: Envio; unidade?: string }) {
  const situacao = situacaoDaNota(envio.nota);
  const saidas = envio.saidas.length;

  return (
    <li className={estilos.item}>
      <div className={estilos.itemTexto}>
        <p className={estilos.aluno}>
          <Link to={rotas.professorEnvio(envio.id)}>{envio.nomeAluno}</Link>
        </p>
        <p className={estilos.provaTitulo}>{envio.provaTitulo}</p>
        <p className={estilos.meta}>
          {unidade && <span className={estilos.marca}>{unidade}</span>}
          <span className="tabular">{dataHora(envio.enviadaEm)}</span>
          {envio.arquivo && (
            <span className={estilos.marca}>
              <Icone nome="doc" tamanho={14} />
              Arquivo
            </span>
          )}
          {saidas > 0 && (
            <span className={`${estilos.marca} ${estilos.marcaAlerta}`}>
              <Icone nome="alerta" tamanho={14} />
              {saidas} {saidas === 1 ? "saída" : "saídas"} da prova
            </span>
          )}
        </p>
      </div>
      <span className={`${estilos.nota} ${estilos[situacao]} tabular`}>{envio.nota === null ? "A corrigir" : nota(envio.nota)}</span>
      <Icone nome="seta-direita" tamanho={18} className={estilos.seta} />
    </li>
  );
}
