import { useState } from "react";

import { Icone } from "@/components/Icone";
import { lerNotaLivro, mensagemHistorico, textoPadraoHistorico } from "@/lib/mensagemResultado";
import type { Envio } from "@/types/envio";
import estilos from "./MensagemResultado.module.css";

const cursoDaProva = (provaId: string) => provaId.split("/")[0] ?? provaId;

export function MensagemHistorico({ envio }: { envio: Envio }) {
  const [curso, definirCurso] = useState(cursoDaProva(envio.provaId));
  const [genero, definirGenero] = useState<"aluna" | "aluno">("aluna");
  const [livro, definirLivro] = useState("");
  const [descricao, definirDescricao] = useState<string | null>(null);
  const [editada, definirEditada] = useState<string | null>(null);
  const [copiada, definirCopiada] = useState(false);

  if (envio.nota === null) {
    return (
      <section className={estilos.caixa} aria-labelledby="titulo-historico">
        <h2 id="titulo-historico" className={estilos.titulo}>
          Mensagem para o histórico
        </h2>
        <p className={estilos.suave}>Lance a nota da prova para gerar o registro do histórico.</p>
      </section>
    );
  }

  const notaLivro = lerNotaLivro(livro);
  const livroInvalido = livro.trim() !== "" && notaLivro === null;
  // Sem texto digitado, vale o texto padrão do gênero escolhido; ao digitar, ele é do professor.
  const paragrafo = descricao ?? textoPadraoHistorico(envio.nota, genero);
  const texto = editada ?? mensagemHistorico({ curso, nota: envio.nota, livro: notaLivro, texto: paragrafo });

  const campo = <T,>(definir: (v: T) => void) => (valor: T) => {
    definir(valor);
    definirEditada(null);
    definirCopiada(false);
  };

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      document.querySelector<HTMLTextAreaElement>("#historico-texto")?.select();
      document.execCommand("copy");
    }
    definirCopiada(true);
  }

  return (
    <section className={estilos.caixa} aria-labelledby="titulo-historico">
      <h2 id="titulo-historico" className={estilos.titulo}>
        Mensagem para o histórico
      </h2>
      <p className={estilos.suave}>Registro para colar no outro sistema. Sem a nota do livro, sai como «Pendente».</p>

      <div className={estilos.grade}>
        <label className={estilos.campo}>
          <span>Módulo</span>
          <input value={curso} onChange={(e) => campo(definirCurso)(e.target.value)} maxLength={80} />
        </label>
        <label className={estilos.campo}>
          <span>
            Nota do livro <span className={estilos.suave}>(opcional)</span>
          </span>
          <input value={livro} onChange={(e) => campo(definirLivro)(e.target.value)} maxLength={5} inputMode="decimal" placeholder="Ex.: 10,0" aria-invalid={livroInvalido} />
        </label>
      </div>
      {livroInvalido && (
        <p role="alert" className={estilos.suave}>
          Use um número de 0 a 10. Enquanto isso, o livro sai como «Pendente».
        </p>
      )}

      <div className={estilos.campo} role="group" aria-label="A pessoa avaliada é">
        <span>Quem fez a prova</span>
        <div className={estilos.segmentos}>
          {(["aluna", "aluno"] as const).map((g) => (
            <button key={g} type="button" className={genero === g ? `${estilos.segmento} ${estilos.segmentoAtivo}` : estilos.segmento} aria-pressed={genero === g} onClick={() => campo(definirGenero)(g)}>
              {g === "aluna" ? "Aluna" : "Aluno"}
            </button>
          ))}
        </div>
      </div>

      <label className={estilos.campo}>
        <span>Texto do histórico</span>
        <textarea rows={3} value={paragrafo} onChange={(e) => campo(definirDescricao)(e.target.value)} maxLength={500} />
      </label>

      <label className={estilos.campo}>
        <span>Mensagem pronta (pode ajustar o texto)</span>
        <textarea id="historico-texto" className={estilos.mensagem} rows={8} value={texto} onChange={(e) => definirEditada(e.target.value)} />
      </label>

      <div className={estilos.acoes}>
        <button type="button" className={estilos.copiar} onClick={() => void copiar()}>
          <Icone nome={copiada ? "check" : "copiar"} tamanho={16} />
          {copiada ? "Copiada!" : "Copiar mensagem"}
        </button>
      </div>
      <span className="sr-only" role="status">
        {copiada ? "Mensagem copiada" : ""}
      </span>
    </section>
  );
}
