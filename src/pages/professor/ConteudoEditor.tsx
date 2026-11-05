import { useRef, useState, type ReactNode } from "react";

import { Icone } from "@/components/Icone";
import { compararConteudos, houveMudanca } from "@/lib/diffTexto";
import { LIMITES_CONTEUDO as L, type ConteudoCurso, type TopicoTeoria } from "@/types/conteudoProfessor";
import estilos from "./ConteudoEditor.module.css";

interface CampoProps {
  rotulo: string;
  valor: string;
  aoMudar: (v: string) => void;
  limite: number;
  linhas?: number;
  dica?: string;
}

/** Caixa de texto com a barra de formatação: o texto selecionado ganha **negrito**, *itálico* ou `código`. */
function CampoFormatado({ rotulo, valor, aoMudar, limite, linhas = 3, dica }: CampoProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const aplicar = (marca: string) => {
    const campo = ref.current;
    if (!campo) return;
    const { selectionStart: de, selectionEnd: ate } = campo;
    const trecho = valor.slice(de, ate) || "texto";
    const novo = `${valor.slice(0, de)}${marca}${trecho}${marca}${valor.slice(ate)}`;
    if (novo.length > limite) return;
    aoMudar(novo);
    requestAnimationFrame(() => {
      campo.focus();
      campo.setSelectionRange(de + marca.length, de + marca.length + trecho.length);
    });
  };

  return (
    <div className={estilos.campo}>
      <div className={estilos.campoTopo}>
        <label>
          {rotulo}
          <textarea ref={ref} rows={linhas} value={valor} maxLength={limite} onChange={(e) => aoMudar(e.target.value)} />
        </label>
        <div className={estilos.formato} role="group" aria-label={`Formatar ${rotulo}`}>
          <button type="button" onClick={() => aplicar("**")} title="Negrito: **texto**">
            <strong>N</strong>
          </button>
          <button type="button" onClick={() => aplicar("*")} title="Itálico: *texto*">
            <em>I</em>
          </button>
          <button type="button" onClick={() => aplicar("`")} title="Código: `texto`">
            <code>{"</>"}</code>
          </button>
        </div>
      </div>
      {dica && <small>{dica}</small>}
    </div>
  );
}

function ListaEditavel({ rotulo, itens, aoMudar, maximo, limite, adicionar }: { rotulo: string; itens: string[]; aoMudar: (v: string[]) => void; maximo: number; limite: number; adicionar: string }) {
  return (
    <fieldset className={estilos.grupo}>
      <legend>{rotulo}</legend>
      {itens.map((item, i) => (
        <div key={i} className={estilos.linhaLista}>
          <CampoFormatado rotulo={`${rotulo} ${i + 1}`} valor={item} limite={limite} linhas={2} aoMudar={(v) => aoMudar(itens.map((x, k) => (k === i ? v : x)))} />
          <button type="button" className={estilos.icone} aria-label={`Remover ${rotulo} ${i + 1}`} onClick={() => aoMudar(itens.filter((_, k) => k !== i))}>
            <Icone nome="lixeira" tamanho={16} />
          </button>
        </div>
      ))}
      {itens.length < maximo && (
        <button type="button" className={estilos.adicionar} onClick={() => aoMudar([...itens, ""])}>
          <Icone nome="mais" tamanho={16} />
          {adicionar}
        </button>
      )}
    </fieldset>
  );
}

const topicoVazio = (): TopicoTeoria => ({ titulo: "", texto: [""] });

interface Props {
  original: ConteudoCurso;
  inicial: ConteudoCurso;
  salvando: boolean;
  erro: string | null;
  aoSalvar: (conteudo: ConteudoCurso, comentario: string) => void;
  aoCancelar: () => void;
}

export function ConteudoEditor({ original, inicial, salvando, erro, aoSalvar, aoCancelar }: Props) {
  const [rascunho, definirRascunho] = useState<ConteudoCurso>(() => structuredClone(inicial));
  const [comentario, definirComentario] = useState("");
  const [vendo, definirVendo] = useState(false);

  const mudancas = compararConteudos(inicial, rascunho);
  const alterado = houveMudanca(mudancas);
  const total = mudancas.filter((l) => l.tipo !== "igual").length;

  const mudarTopico = (i: number, parcial: Partial<TopicoTeoria>) => definirRascunho({ ...rascunho, topicos: rascunho.topicos.map((t, k) => (k === i ? { ...t, ...parcial } : t)) });
  const mover = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= rascunho.topicos.length) return;
    const topicos = [...rascunho.topicos];
    [topicos[i], topicos[j]] = [topicos[j], topicos[i]];
    definirRascunho({ ...rascunho, topicos });
  };

  const bloco = (titulo: string, filhos: ReactNode) => (
    <section className={estilos.bloco}>
      <h2>{titulo}</h2>
      {filhos}
    </section>
  );

  return (
    <form
      className={estilos.editor}
      onSubmit={(e) => {
        e.preventDefault();
        aoSalvar(rascunho, comentario.trim());
      }}
    >
      <p className={estilos.aviso}>
        Você está editando o conteúdo de todos os professores. Para dar destaque use <strong>**negrito**</strong>, <em>*itálico*</em> e <code>`código`</code>, ou os botões ao lado de cada caixa. Cada alteração fica no histórico e pode ser desfeita.
      </p>

      {bloco("Resumo do curso", <CampoFormatado rotulo="Resumo" valor={rascunho.resumo} limite={L.resumo} linhas={3} aoMudar={(resumo) => definirRascunho({ ...rascunho, resumo })} />)}

      {rascunho.topicos.map((t, i) => (
        <section key={i} className={estilos.bloco}>
          <div className={estilos.topoTopico}>
            <h2>Tópico {i + 1}</h2>
            <div className={estilos.acoesTopico}>
              <button type="button" className={estilos.icone} onClick={() => mover(i, -1)} disabled={i === 0} aria-label={`Subir o tópico ${i + 1}`}>
                <span className={estilos.subir}>
                  <Icone nome="seta-baixo" tamanho={16} />
                </span>
              </button>
              <button type="button" className={estilos.icone} onClick={() => mover(i, 1)} disabled={i === rascunho.topicos.length - 1} aria-label={`Descer o tópico ${i + 1}`}>
                <Icone nome="seta-baixo" tamanho={16} />
              </button>
              <button
                type="button"
                className={estilos.icone}
                disabled={rascunho.topicos.length === 1}
                aria-label={`Remover o tópico ${i + 1}`}
                onClick={() => window.confirm(`Remover o tópico «${t.titulo || i + 1}»? Dá para recuperar pelo histórico.`) && definirRascunho({ ...rascunho, topicos: rascunho.topicos.filter((_, k) => k !== i) })}
              >
                <Icone nome="lixeira" tamanho={16} />
              </button>
            </div>
          </div>
          <label className={estilos.titulo}>
            Título
            <input value={t.titulo} maxLength={L.tituloTopico} onChange={(e) => mudarTopico(i, { titulo: e.target.value })} />
          </label>
          <ListaEditavel rotulo="Parágrafo" itens={t.texto} maximo={L.paragrafos} limite={L.paragrafo} adicionar="Adicionar parágrafo" aoMudar={(texto) => mudarTopico(i, { texto })} />
          <CampoFormatado rotulo="Exemplo (opcional)" valor={t.exemplo ?? ""} limite={L.exemplo} aoMudar={(exemplo) => mudarTopico(i, { exemplo })} />
          <ListaEditavel rotulo="O aluno precisa sair sabendo" itens={t.pontos ?? []} maximo={L.itens} limite={L.item} adicionar="Adicionar ponto" aoMudar={(pontos) => mudarTopico(i, { pontos })} />
          <ListaEditavel rotulo="Erro comum" itens={t.erros ?? []} maximo={L.itens} limite={L.item} adicionar="Adicionar erro comum" aoMudar={(erros) => mudarTopico(i, { erros })} />
        </section>
      ))}
      {rascunho.topicos.length < L.topicos && (
        <button type="button" className={estilos.adicionar} onClick={() => definirRascunho({ ...rascunho, topicos: [...rascunho.topicos, topicoVazio()] })}>
          <Icone nome="mais" tamanho={16} />
          Adicionar tópico
        </button>
      )}

      {bloco(
        "Glossário",
        <>
          {rascunho.glossario.map((g, i) => (
            <div key={i} className={estilos.termo}>
              <label className={estilos.titulo}>
                Termo
                <input value={g.termo} maxLength={L.termo} onChange={(e) => definirRascunho({ ...rascunho, glossario: rascunho.glossario.map((x, k) => (k === i ? { ...x, termo: e.target.value } : x)) })} />
              </label>
              <CampoFormatado rotulo="Definição" valor={g.definicao} limite={L.definicao} linhas={2} aoMudar={(definicao) => definirRascunho({ ...rascunho, glossario: rascunho.glossario.map((x, k) => (k === i ? { ...x, definicao } : x)) })} />
              <button type="button" className={estilos.icone} aria-label={`Remover o termo ${g.termo || i + 1}`} onClick={() => definirRascunho({ ...rascunho, glossario: rascunho.glossario.filter((_, k) => k !== i) })}>
                <Icone nome="lixeira" tamanho={16} />
              </button>
            </div>
          ))}
          {rascunho.glossario.length < L.glossario && (
            <button type="button" className={estilos.adicionar} onClick={() => definirRascunho({ ...rascunho, glossario: [...rascunho.glossario, { termo: "", definicao: "" }] })}>
              <Icone nome="mais" tamanho={16} />
              Adicionar termo
            </button>
          )}
        </>,
      )}

      {bloco("Como conduzir a aula", <ListaEditavel rotulo="Dica" itens={rascunho.dicas} maximo={L.dicas} limite={L.dica} adicionar="Adicionar dica" aoMudar={(dicas) => definirRascunho({ ...rascunho, dicas })} />)}

      <section className={estilos.salvar}>
        <label className={estilos.titulo}>
          O que você mudou? (aparece no histórico)
          <input value={comentario} maxLength={L.comentario} placeholder="Ex.: corrigi a alíquota e acrescentei um exemplo" onChange={(e) => definirComentario(e.target.value)} />
        </label>

        <button type="button" className={estilos.botao} aria-expanded={vendo} onClick={() => definirVendo(!vendo)}>
          {alterado ? `Ver as ${total} ${total === 1 ? "alteração" : "alterações"} antes de salvar` : "Nenhuma alteração ainda"}
        </button>
        {vendo && alterado && (
          <ul className={estilos.previa}>
            {mudancas
              .filter((l) => l.tipo !== "igual")
              .map((l, i) => (
                <li key={i} className={estilos[l.tipo]}>
                  <span className={estilos.marca} aria-hidden="true">
                    {l.tipo === "novo" ? "+" : l.tipo === "removido" ? "−" : "~"}
                  </span>
                  <span className={estilos.texto}>{l.partes ? l.partes.map((p, k) => (p.tipo === "igual" ? p.texto : <span key={k} className={estilos[`palavra_${p.tipo}`]}>{p.texto}</span>)) : l.texto}</span>
                </li>
              ))}
          </ul>
        )}

        {erro && (
          <p role="alert" className={estilos.erro}>
            {erro}
          </p>
        )}
        <div className={estilos.botoes}>
          <button type="submit" className={`${estilos.botao} ${estilos.principal}`} disabled={!alterado || salvando}>
            {salvando ? "Salvando…" : "Salvar alterações"}
          </button>
          <button type="button" className={estilos.botao} onClick={aoCancelar} disabled={salvando}>
            Cancelar
          </button>
          {JSON.stringify(inicial) !== JSON.stringify(original) && <span className={estilos.nota}>Este texto já foi editado antes; o original continua no histórico.</span>}
        </div>
      </section>
    </form>
  );
}
