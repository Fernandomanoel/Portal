import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { ATIVIDADES } from "@/data/atividades";
import { carregarConteudo } from "@/data/conteudosProfessor";
import { gravarConteudo, obterHistoricoConteudo } from "@/lib/apiConteudos";
import { ErroApi } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import type { ConteudoCurso, HistoricoConteudo } from "@/types/conteudoProfessor";
import { ConteudoEditor } from "./ConteudoEditor";
import { ConteudoHistorico, type VersaoHistorico } from "./ConteudoHistorico";
import { ConteudoLeitura } from "./ConteudoLeitura";
import estilos from "./ProfessorConteudoPage.module.css";
import abas from "./ConteudoEditor.module.css";

type Modo = "ler" | "editar" | "historico";

interface Carregado {
  slug: string;
  original: ConteudoCurso | null;
  historico: HistoricoConteudo;
  aviso: string | null;
}

export function ProfessorConteudoPage() {
  const { curso: slug = "" } = useParams();
  const curso = ATIVIDADES.find((c) => c.slug === slug);
  const [carregado, definirCarregado] = useState<Carregado | null>(null);
  const [modo, definirModo] = useState<Modo>("ler");
  const [salvando, definirSalvando] = useState(false);
  const [erro, definirErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    definirModo("ler");
    definirErro(null);
    void Promise.all([carregarConteudo(slug), obterHistoricoConteudo(slug).catch(() => null)]).then(([original, historico]) => {
      if (!ativo) return;
      definirCarregado({
        slug,
        original,
        historico: historico ?? { slug, revisoes: [] },
        aviso: historico ? null : "Não foi possível carregar as edições dos professores; mostrando o texto original.",
      });
    });
    return () => {
      ativo = false;
    };
  }, [slug]);

  const gravar = useCallback(
    async (conteudo: ConteudoCurso, comentario: string, tipo: "edicao" | "restauracao") => {
      if (!carregado) return;
      definirSalvando(true);
      definirErro(null);
      try {
        const historico = await gravarConteudo(slug, conteudo, carregado.historico.revisoes.at(-1)?.numero ?? 0, comentario, tipo);
        definirCarregado({ ...carregado, historico, aviso: null });
        definirModo("ler");
      } catch (e) {
        if (e instanceof ErroApi && e.status === 409) {
          const atual = (e.corpo as { atual?: HistoricoConteudo } | undefined)?.atual;
          if (atual) definirCarregado({ ...carregado, historico: atual });
          definirErro(`${e.message} A versão dele já está no histórico: confira o que mudou e refaça a sua edição sobre ela.`);
          definirModo("historico");
        } else {
          definirErro(e instanceof Error ? e.message : "Não foi possível salvar.");
        }
      } finally {
        definirSalvando(false);
      }
    },
    [carregado, slug],
  );

  if (!curso) {
    return <EstadoVazio icone="livro" titulo="Curso não encontrado" texto="Volte à lista de conteúdos e escolha um curso." />;
  }
  if (!carregado || carregado.slug !== slug) return <p aria-live="polite">Carregando o conteúdo…</p>;
  const { original, historico } = carregado;
  if (!original) {
    return <EstadoVazio icone="livro" titulo="Conteúdo em preparação" texto="A teoria deste curso ainda não foi escrita." />;
  }
  const ultima = historico.revisoes.at(-1);
  const atual = ultima?.conteudo ?? original;
  const restaurar = (v: VersaoHistorico) => void gravar(v.conteudo, `Restaurou ${v.numero === 0 ? "o texto original" : `a versão ${v.numero}`}`, "restauracao");

  return (
    <>
      <CabecalhoPagina titulo={curso.titulo} texto={atual.resumo.replace(/\*\*|`|(?<!\*)\*(?!\*)/g, "")} voltarPara={rotas.professorConteudos()} />

      <div className={estilos.abas} role="group" aria-label="Modo">
        <button type="button" className={abas.botao} aria-pressed={modo === "ler"} onClick={() => definirModo("ler")}>
          Ler
        </button>
        <button type="button" className={abas.botao} aria-pressed={modo === "editar"} onClick={() => definirModo("editar")}>
          Editar
        </button>
        <button type="button" className={abas.botao} aria-pressed={modo === "historico"} onClick={() => definirModo("historico")}>
          Histórico ({historico.revisoes.length} {historico.revisoes.length === 1 ? "edição" : "edições"})
        </button>
        {ultima && (
          <span className={estilos.ultimaEdicao}>
            Última edição: {ultima.autor}, {new Date(ultima.em).toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>

      {carregado.aviso && <p role="status">{carregado.aviso}</p>}
      {erro && modo !== "editar" && (
        <p role="alert" className={abas.erro}>
          {erro}
        </p>
      )}

      {modo === "ler" && <ConteudoLeitura curso={curso} conteudo={atual} />}
      {modo === "editar" && <ConteudoEditor key={ultima?.numero ?? 0} original={original} inicial={atual} salvando={salvando} erro={erro} aoSalvar={(c, comentario) => void gravar(c, comentario, "edicao")} aoCancelar={() => definirModo("ler")} />}
      {modo === "historico" && <ConteudoHistorico original={original} revisoes={historico.revisoes} salvando={salvando} aoRestaurar={restaurar} />}
    </>
  );
}
