import { useState } from "react";

import { Icone } from "@/components/Icone";
import { aprovada, mensagemResultado } from "@/lib/mensagemResultado";
import type { Envio } from "@/types/envio";
import estilos from "./MensagemResultado.module.css";

const ddmm = (iso: string) => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

/** Primeira pasta do id da prova ("Windows 11/avaliacao-completa" → "Windows 11"). */
const cursoDaProva = (provaId: string) => provaId.split("/")[0] ?? provaId;

export function MensagemResultado({ envio }: { envio: Envio }) {
  const [curso, definirCurso] = useState(cursoDaProva(envio.provaId));
  const [data, definirData] = useState(ddmm(envio.enviadaEm));
  const [genero, definirGenero] = useState<"aluna" | "aluno">("aluna");
  const [observacao, definirObservacao] = useState(envio.comentario ?? "");
  const [editada, definirEditada] = useState<string | null>(null);
  const [copiada, definirCopiada] = useState(false);

  // Ao mudar qualquer campo a mensagem é refeita; editar o texto à mão vale até o próximo campo mudar.
  const campo = <T,>(definir: (v: T) => void) => (valor: T) => {
    definir(valor);
    definirEditada(null);
    definirCopiada(false);
  };

  if (envio.nota === null) {
    return (
      <section className={estilos.caixa} aria-labelledby="titulo-mensagem">
        <h2 id="titulo-mensagem" className={estilos.titulo}>
          Mensagem para o responsável
        </h2>
        <p className={estilos.suave}>Lance a nota para gerar a mensagem pronta de aprovado ou reprovado.</p>
      </section>
    );
  }

  const texto = editada ?? mensagemResultado({ curso, data, nota: envio.nota, genero, observacao });
  const ok = aprovada(envio.nota);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Sem permissão da área de transferência (http, iframe): seleciona o texto para o Ctrl+C.
      document.querySelector<HTMLTextAreaElement>("#mensagem-texto")?.select();
      document.execCommand("copy");
    }
    definirCopiada(true);
  }

  return (
    <section className={estilos.caixa} aria-labelledby="titulo-mensagem">
      <h2 id="titulo-mensagem" className={estilos.titulo}>
        Mensagem para o responsável
      </h2>
      <p className={`${estilos.situacao} ${ok ? estilos.aprovado : estilos.reprovado}`}>
        <Icone nome={ok ? "check" : "alerta"} tamanho={15} />
        {ok ? "Aprovado" : "Reprovado"} — nota {envio.nota.toFixed(1)} (mínima 7,0)
      </p>

      <div className={estilos.grade}>
        <label className={estilos.campo}>
          <span>Curso/Módulo</span>
          <input value={curso} onChange={(e) => campo(definirCurso)(e.target.value)} maxLength={80} />
        </label>
        <label className={estilos.campo}>
          <span>Data</span>
          <input value={data} onChange={(e) => campo(definirData)(e.target.value)} maxLength={10} inputMode="numeric" />
        </label>
      </div>

      <div className={estilos.campo} role="group" aria-label="A pessoa avaliada é">
        <span>Quem fez a avaliação</span>
        <div className={estilos.segmentos}>
          {(["aluna", "aluno"] as const).map((g) => (
            <button key={g} type="button" className={genero === g ? `${estilos.segmento} ${estilos.segmentoAtivo}` : estilos.segmento} aria-pressed={genero === g} onClick={() => campo(definirGenero)(g)}>
              {g === "aluna" ? "Aluna" : "Aluno"}
            </button>
          ))}
        </div>
      </div>

      <label className={estilos.campo}>
        <span>
          Observação <span className={estilos.suave}>(opcional)</span>
        </span>
        <textarea
          rows={2}
          value={observacao}
          onChange={(e) => campo(definirObservacao)(e.target.value)}
          maxLength={300}
          placeholder={ok ? "com ótimo desempenho na prova prática" : "com dificuldade nas atividades práticas"}
        />
      </label>

      <label className={estilos.campo}>
        <span>Mensagem pronta (pode ajustar o texto)</span>
        <textarea id="mensagem-texto" className={estilos.mensagem} rows={11} value={texto} onChange={(e) => definirEditada(e.target.value)} />
      </label>

      <div className={estilos.acoes}>
        <button type="button" className={estilos.copiar} onClick={() => void copiar()}>
          <Icone nome={copiada ? "check" : "copiar"} tamanho={16} />
          {copiada ? "Copiada!" : "Copiar mensagem"}
        </button>
        <a className={estilos.whats} href={`https://wa.me/?text=${encodeURIComponent(texto)}`} target="_blank" rel="noreferrer">
          <Icone nome="conversa" tamanho={16} />
          Abrir no WhatsApp
        </a>
      </div>
      <span className="sr-only" role="status">
        {copiada ? "Mensagem copiada" : ""}
      </span>
    </section>
  );
}
