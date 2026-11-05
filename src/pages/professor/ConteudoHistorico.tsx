import { useMemo, useState } from "react";

import { compararConteudos, houveMudanca } from "@/lib/diffTexto";
import type { ConteudoCurso, RevisaoConteudo } from "@/types/conteudoProfessor";
import estilos from "./ConteudoEditor.module.css";

const quando = (iso: string) => new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

interface Versao {
  numero: number;
  titulo: string;
  detalhe: string;
  conteudo: ConteudoCurso;
  tipo: "original" | "edicao" | "restauracao";
}

interface Props {
  original: ConteudoCurso;
  revisoes: RevisaoConteudo[];
  salvando: boolean;
  aoRestaurar: (versao: Versao) => void;
}

export type VersaoHistorico = Versao;

export function ConteudoHistorico({ original, revisoes, salvando, aoRestaurar }: Props) {
  const versoes = useMemo<Versao[]>(
    () => [
      { numero: 0, titulo: "Texto original", detalhe: "Escrito junto com o portal", conteudo: original, tipo: "original" },
      ...revisoes.map((r) => ({
        numero: r.numero,
        titulo: r.tipo === "restauracao" ? `Versão ${r.numero} (restaurada)` : `Versão ${r.numero}`,
        detalhe: `${r.autor} · ${quando(r.em)}${r.comentario ? ` — ${r.comentario}` : ""}`,
        conteudo: r.conteudo,
        tipo: r.tipo,
      })),
    ],
    [original, revisoes],
  );
  const ultima = versoes.at(-1)!;
  const [escolhida, definirEscolhida] = useState(ultima.numero);
  const [contra, definirContra] = useState<number | null>(null);

  const versao = versoes.find((v) => v.numero === escolhida) ?? ultima;
  const anterior = contra !== null ? versoes.find((v) => v.numero === contra) : versoes[versoes.indexOf(versao) - 1];
  const linhas = anterior ? compararConteudos(anterior.conteudo, versao.conteudo) : [];
  const mudou = houveMudanca(linhas);

  return (
    <div className={estilos.historico}>
      <ol className={estilos.versoes} aria-label="Versões">
        {[...versoes].reverse().map((v) => (
          <li key={v.numero}>
            <button type="button" aria-pressed={v.numero === versao.numero} onClick={() => (definirEscolhida(v.numero), definirContra(null))}>
              <strong>{v.titulo}</strong>
              {v.numero === ultima.numero && <span className={estilos.atual}>atual</span>}
              <small>{v.detalhe}</small>
            </button>
          </li>
        ))}
      </ol>

      <div className={estilos.comparacao}>
        <div className={estilos.cabecaComparacao}>
          <h2>{versao.titulo}</h2>
          <label>
            Comparar com
            <select value={anterior?.numero ?? ""} onChange={(e) => definirContra(Number(e.target.value))} disabled={versao.numero === 0}>
              {versoes
                .filter((v) => v.numero !== versao.numero)
                .map((v) => (
                  <option key={v.numero} value={v.numero}>
                    {v.titulo}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <p className={estilos.legenda}>
          <span className={estilos.palavra_novo}>Acrescentado</span> <span className={estilos.palavra_removido}>Removido</span> Só as linhas alteradas e as vizinhas são mostradas.
        </p>

        {versao.numero === 0 ? (
          <p>Esta é a primeira versão: nada para comparar.</p>
        ) : !mudou ? (
          <p>Sem diferenças em relação a {anterior?.titulo.toLowerCase()}.</p>
        ) : (
          <ul className={estilos.previa}>
            {linhas
              .filter((l, i) => l.tipo !== "igual" || linhas.slice(Math.max(0, i - 1), i + 2).some((x) => x.tipo !== "igual"))
              .map((l, i) => (
                <li key={i} className={estilos[l.tipo]}>
                  <span className={estilos.marca} aria-hidden="true">
                    {l.tipo === "novo" ? "+" : l.tipo === "removido" ? "−" : l.tipo === "alterado" ? "~" : ""}
                  </span>
                  <span className={estilos.texto}>{l.partes ? l.partes.map((p, k) => (p.tipo === "igual" ? p.texto : <span key={k} className={estilos[`palavra_${p.tipo}`]}>{p.texto}</span>)) : l.texto}</span>
                </li>
              ))}
          </ul>
        )}

        {versao.numero !== ultima.numero && (
          <button type="button" className={estilos.botao} disabled={salvando} onClick={() => window.confirm(`Voltar o conteúdo para «${versao.titulo}»? As versões seguintes continuam no histórico.`) && aoRestaurar(versao)}>
            {salvando ? "Restaurando…" : "Restaurar esta versão"}
          </button>
        )}
      </div>
    </div>
  );
}
