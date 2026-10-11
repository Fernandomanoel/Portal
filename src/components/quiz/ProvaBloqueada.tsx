import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { ErroApi, liberarProva } from "@/lib/apiProvas";
import { lerFicha } from "@/lib/unidade";
import type { SaidaProva } from "@/types/envio";
import estilos from "./ProvaAplicada.module.css";

const MOTIVO: Record<SaidaProva["motivo"], string> = {
  aba: "trocou de aba",
  janela: "abriu outra janela ou programa",
  "tela-cheia": "saiu da tela cheia",
};

interface Props {
  saida: SaidaProva;
  aoLiberar: (professor: string) => void;
}

/** A prova travou: só o professor, com o usuário e a senha dele, libera. */
export function ProvaBloqueada({ saida, aoLiberar }: Props) {
  const [usuario, definirUsuario] = useState("");
  const [senha, definirSenha] = useState("");
  const [erro, definirErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);
  const hora = new Date(saida.em).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  async function liberar(evento: FormEvent) {
    evento.preventDefault();
    definirEnviando(true);
    definirErro(null);
    try {
      const { nome } = await liberarProva(usuario, senha, lerFicha()?.ficha ?? "");
      aoLiberar(nome);
    } catch (falha) {
      definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível liberar. Tente de novo.");
      definirSenha("");
    } finally {
      definirEnviando(false);
    }
  }

  return (
    <div className={estilos.bloqueioFundo}>
      <form className={estilos.bloqueio} role="alertdialog" aria-modal="true" aria-labelledby="bloqueio-titulo" onSubmit={liberar}>
        <span className={estilos.bloqueioSelo}>
          <Icone nome="cadeado" tamanho={24} />
        </span>
        <h2 id="bloqueio-titulo" className={estilos.bloqueioTitulo}>
          Prova travada
        </h2>
        <p className={estilos.bloqueioTexto}>
          Às {hora} você {MOTIVO[saida.motivo]}. Suas respostas estão guardadas, mas a prova só continua depois que o professor liberar. Chame o
          professor.
        </p>

        <div className={estilos.campo}>
          <label htmlFor="liberar-usuario">Usuário do professor</label>
          <input id="liberar-usuario" value={usuario} onChange={(e) => definirUsuario(e.target.value)} autoComplete="off" autoFocus />
        </div>
        <div className={estilos.campo}>
          <label htmlFor="liberar-senha">Senha do professor</label>
          <input id="liberar-senha" type="password" value={senha} onChange={(e) => definirSenha(e.target.value)} autoComplete="off" />
        </div>
        {erro && (
          <p className={estilos.campoErro} role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className={estilos.principal} disabled={enviando || !usuario || !senha}>
          {enviando ? "Conferindo…" : "Liberar a prova"}
        </button>
      </form>
    </div>
  );
}
