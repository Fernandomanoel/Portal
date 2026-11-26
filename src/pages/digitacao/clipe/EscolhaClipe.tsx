import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { idDoYoutube, LIMITES_CLIPE, lerLetra } from "@/lib/clipeDigitacao";
import type { Clipe } from "@/types/digitacaoClipe";
import estilos from "./EscolhaClipe.module.css";

interface Props {
  fixos: Clipe[];
  montados: Clipe[];
  aoEscolher: (clipe: Clipe) => void;
  aoMontar: (clipe: Clipe) => void;
  aoApagar: (id: string) => void;
}

const novoId = () => crypto.randomUUID().replace(/-/g, "").slice(0, 12);

function ListaClipes({ titulo, clipes, aoEscolher, aoApagar }: { titulo: string; clipes: Clipe[]; aoEscolher: (c: Clipe) => void; aoApagar?: (id: string) => void }) {
  if (!clipes.length) return null;
  return (
    <section aria-label={titulo}>
      <h2 className={estilos.subtitulo}>{titulo}</h2>
      <ul className={estilos.lista}>
        {clipes.map((c) => (
          <li key={c.id} className={estilos.item}>
            <button type="button" className={estilos.escolher} onClick={() => aoEscolher(c)}>
              {c.youtubeId && <img src={`https://i.ytimg.com/vi/${c.youtubeId}/mqdefault.jpg`} alt="" loading="lazy" />}
              <span>
                <strong>{c.titulo}</strong>
                <small>{c.linhas.length} verso(s)</small>
              </span>
            </button>
            {aoApagar && (
              <button type="button" className={estilos.apagar} onClick={() => window.confirm(`Apagar «${c.titulo}» deste navegador?`) && aoApagar(c.id)} aria-label={`Apagar ${c.titulo}`}>
                <Icone nome="lixeira" tamanho={16} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EscolhaClipe({ fixos, montados, aoEscolher, aoMontar, aoApagar }: Props) {
  const [titulo, definirTitulo] = useState("");
  const [link, definirLink] = useState("");
  const [letra, definirLetra] = useState("");
  const [arquivo, definirArquivo] = useState<File | null>(null);
  const [erro, definirErro] = useState<string | null>(null);

  function montar(evento: FormEvent) {
    evento.preventDefault();
    const youtubeId = idDoYoutube(link);
    const linhas = lerLetra(letra);
    if (!arquivo && !youtubeId) return definirErro("Cole o link do YouTube (como https://www.youtube.com/watch?v=…) ou escolha um vídeo do computador.");
    if (linhas.length < 2) return definirErro("Cole a letra com pelo menos dois versos, um por linha.");
    definirErro(null);
    const base = { id: novoId(), titulo: titulo.trim().slice(0, LIMITES_CLIPE.titulo) || "Meu clipe", linhas };
    aoMontar(arquivo ? { ...base, arquivoUrl: URL.createObjectURL(arquivo) } : { ...base, youtubeId });
  }

  return (
    <>
      <ListaClipes titulo="Clipes do portal" clipes={fixos} aoEscolher={aoEscolher} />
      <ListaClipes titulo="Seus clipes (guardados neste navegador)" clipes={montados} aoEscolher={aoEscolher} aoApagar={aoApagar} />
      {!fixos.length && !montados.length && <p className={estilos.dica}>Ainda não há clipes. Monte o primeiro abaixo: cole o link do vídeo e a letra.</p>}

      <form className={estilos.montar} onSubmit={montar}>
        <h2 className={estilos.subtitulo}>Montar um clipe</h2>
        <label>
          Nome do clipe
          <input value={titulo} onChange={(e) => definirTitulo(e.target.value)} maxLength={LIMITES_CLIPE.titulo} placeholder="Ex.: Aula 5 — Present Perfect" />
        </label>
        <label>
          Link do vídeo no YouTube
          <input value={link} onChange={(e) => definirLink(e.target.value)} placeholder="https://www.youtube.com/watch?v=…" inputMode="url" />
        </label>
        <label>
          Ou um vídeo do computador (fica só nesta página, não é enviado)
          <input type="file" accept="video/*" onChange={(e) => definirArquivo(e.target.files?.[0] ?? null)} />
        </label>
        <label>
          Letra, um verso por linha
          <textarea value={letra} onChange={(e) => definirLetra(e.target.value)} rows={8} placeholder={"Texto em inglês | tradução (opcional)\n[0:42] Texto em inglês | tradução (o tempo é opcional)"} />
        </label>
        <p className={estilos.dica}>
          Depois do verso, escreva « | » e a tradução para ela aparecer embaixo. Se colocar o minuto no começo, como [0:42], os botões de anterior e próximo levam o vídeo para aquele ponto. Use só letras que você pode usar em aula.
        </p>
        {erro && (
          <p className={estilos.erro} role="alert">
            <Icone nome="alerta" tamanho={16} />
            {erro}
          </p>
        )}
        <button type="submit" className={estilos.primario}>
          <Icone nome="play" tamanho={16} />
          Montar e começar
        </button>
      </form>
    </>
  );
}
