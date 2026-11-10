import { useId, useState } from "react";

import { Icone } from "@/components/Icone";
import { LIMITE_PLANILHA_MB, lerPlanilha, type Tabela } from "@/lib/lerPlanilha";
import estilos from "./CampoPlanilha.module.css";

interface Props {
  rotulo: string;
  /** Colunas que a planilha precisa ter, para quem vai exportar saber o que escolher. */
  colunas: string;
  aoLer: (tabela: Tabela, nomeDoArquivo: string) => void;
  aoFalhar: (mensagem: string) => void;
}

/** Escolha de planilha lida no próprio navegador: o arquivo não sai da máquina. */
export function CampoPlanilha({ rotulo, colunas, aoLer, aoFalhar }: Props) {
  const id = useId();
  const [lendo, definirLendo] = useState(false);
  const [nome, definirNome] = useState("");

  async function escolher(arquivo: File | undefined) {
    if (!arquivo) return;
    definirLendo(true);
    try {
      const tabela = await lerPlanilha(arquivo);
      definirNome(arquivo.name);
      aoLer(tabela, arquivo.name);
    } catch (falha) {
      definirNome("");
      aoFalhar(falha instanceof Error ? falha.message : "Não foi possível ler a planilha.");
    } finally {
      definirLendo(false);
    }
  }

  return (
    <div className={estilos.campo}>
      <label htmlFor={id} className={estilos.botao} aria-busy={lendo}>
        <Icone nome="planilha" tamanho={18} />
        {lendo ? "Lendo a planilha…" : rotulo}
      </label>
      <input
        id={id}
        className={estilos.entrada}
        type="file"
        accept=".xlsx,.xls,.csv,.txt"
        disabled={lendo}
        onChange={(e) => {
          void escolher(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <p className={estilos.ajuda}>
        {nome ? <strong>{nome}</strong> : `Arquivo .xlsx, .xls ou .csv de até ${LIMITE_PLANILHA_MB} MB.`} Colunas: {colunas}. A planilha é lida neste computador e não é enviada ao servidor.
      </p>
    </div>
  );
}
