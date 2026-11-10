import { useId, useState, type ReactNode } from "react";

import { Icone } from "@/components/Icone";
import { lerXlsx, type Celula } from "@/lib/lerXlsx";
import estilos from "./AnalisadorPlanilha.module.css";

interface Props<Resultado> {
  /** O que pedir, ex.: "Planilha de agendamentos". */
  rotulo: string;
  /** Recebe a primeira aba como matriz; o que lançar com `message` aparece como erro na tela. */
  analisar: (matriz: Celula[][]) => Resultado;
  children: (resultado: Resultado) => ReactNode;
}

type Estado<Resultado> = { fase: "vazio" } | { fase: "lendo" } | { fase: "erro"; mensagem: string } | { fase: "pronto"; arquivo: string; resultado: Resultado };

/** Lê uma planilha no próprio navegador e mostra o resultado, pronto para imprimir. Nada é enviado nem guardado. */
export function AnalisadorPlanilha<Resultado>({ rotulo, analisar, children }: Props<Resultado>) {
  const id = useId();
  const [estado, definirEstado] = useState<Estado<Resultado>>({ fase: "vazio" });

  async function escolher(arquivo: File | undefined) {
    if (!arquivo) return;
    if (!arquivo.name.toLowerCase().endsWith(".xlsx")) {
      definirEstado({ fase: "erro", mensagem: "Envie um arquivo .xlsx. Se a planilha for .xls, abra no Excel e use Salvar como > Pasta de Trabalho do Excel (.xlsx)." });
      return;
    }
    definirEstado({ fase: "lendo" });
    try {
      definirEstado({ fase: "pronto", arquivo: arquivo.name, resultado: analisar(await lerXlsx(arquivo)) });
    } catch (falha) {
      definirEstado({ fase: "erro", mensagem: falha instanceof Error && falha.message ? falha.message : "Não foi possível ler a planilha." });
    }
  }

  if (estado.fase === "pronto") {
    return (
      <>
        <div className={estilos.barra}>
          <p className={estilos.arquivo}>
            <Icone nome="planilha" tamanho={16} />
            {estado.arquivo}
          </p>
          <button type="button" className={estilos.primario} onClick={() => window.print()}>
            <Icone nome="pdf" tamanho={16} />
            Imprimir ou salvar em PDF
          </button>
          <button type="button" className={estilos.secundario} onClick={() => definirEstado({ fase: "vazio" })}>
            <Icone nome="recomecar" tamanho={16} />
            Outra planilha
          </button>
        </div>
        <div className={estilos.relatorio}>{children(estado.resultado)}</div>
      </>
    );
  }

  return (
    <>
      <label htmlFor={id} className={estilos.entrada}>
        <Icone nome="planilha" tamanho={28} />
        <strong>{estado.fase === "lendo" ? "Lendo a planilha…" : rotulo}</strong>
        <span>Arquivo .xlsx. A planilha é lida neste computador e não é enviada nem guardada.</span>
        <input
          id={id}
          type="file"
          accept=".xlsx"
          disabled={estado.fase === "lendo"}
          onChange={(evento) => {
            void escolher(evento.target.files?.[0]);
            evento.target.value = "";
          }}
        />
      </label>
      {estado.fase === "erro" && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {estado.mensagem}
        </p>
      )}
    </>
  );
}
