import { useEffect, useRef } from "react";

import { Icone } from "@/components/Icone";
import { LIMITE_ARQUIVO_MB } from "@/types/envio";
import type { EnvioArquivo } from "@/types/quiz";
import estilos from "./ProvaAplicada.module.css";

interface Props {
  regra: EnvioArquivo;
  arquivo: File | null;
  aoEscolher: (arquivo: File | null) => void;
  /** A janela de escolher arquivo tira o foco da página; a trava precisa saber. */
  aoAbrirSeletor: () => void;
  aoFecharSeletor: () => void;
}

function tamanhoLegivel(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

export function problemaDoArquivo(arquivo: File, regra: EnvioArquivo): string | null {
  const extensao = arquivo.name.slice(arquivo.name.lastIndexOf(".")).toLowerCase();
  if (!regra.extensoes.map((e) => e.toLowerCase()).includes(extensao)) return `Esse tipo de arquivo não vale. Envie ${regra.extensoes.join(", ")}.`;
  if (arquivo.size > LIMITE_ARQUIVO_MB * 1024 * 1024) return `O arquivo passa de ${LIMITE_ARQUIVO_MB} MB.`;
  return null;
}

export function CampoArquivo({ regra, arquivo, aoEscolher, aoAbrirSeletor, aoFecharSeletor }: Props) {
  const entrada = useRef<HTMLInputElement>(null);
  const problema = arquivo ? problemaDoArquivo(arquivo, regra) : null;

  // O React ainda não tipa onCancel em <input type="file">; o evento nativo existe.
  useEffect(() => {
    const elemento = entrada.current;
    elemento?.addEventListener("cancel", aoFecharSeletor);
    return () => elemento?.removeEventListener("cancel", aoFecharSeletor);
  }, [aoFecharSeletor]);

  return (
    <section className={estilos.arquivo} aria-labelledby="arquivo-titulo">
      <h2 id="arquivo-titulo" className={estilos.arquivoTitulo}>
        {regra.rotulo ?? "Arquivo da prova"}
        {!regra.obrigatorio && <span className={estilos.opcional}> (opcional)</span>}
      </h2>
      <p className={estilos.campoAjuda}>
        Aceita {regra.extensoes.join(", ")}, até {LIMITE_ARQUIVO_MB} MB.
      </p>

      <input
        ref={entrada}
        id="arquivo-prova"
        type="file"
        className={estilos.arquivoEntrada}
        accept={regra.extensoes.join(",")}
        onClick={aoAbrirSeletor}
        onChange={(evento) => {
          aoEscolher(evento.target.files?.[0] ?? null);
          aoFecharSeletor();
        }}
      />

      {arquivo ? (
        <div className={problema ? `${estilos.arquivoEscolhido} ${estilos.arquivoProblema}` : estilos.arquivoEscolhido}>
          <Icone nome={problema ? "alerta" : "doc"} tamanho={22} />
          <div className={estilos.arquivoInfo}>
            <p className={estilos.arquivoNome}>{arquivo.name}</p>
            <p className={problema ? estilos.campoErro : estilos.campoAjuda}>{problema ?? tamanhoLegivel(arquivo.size)}</p>
          </div>
          <label htmlFor="arquivo-prova" className={estilos.secundario}>
            Trocar
          </label>
        </div>
      ) : (
        <label htmlFor="arquivo-prova" className={estilos.arquivoAlvo}>
          <Icone nome="doc" tamanho={22} />
          Escolher arquivo
        </label>
      )}
    </section>
  );
}
