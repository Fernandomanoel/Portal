import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { ErroApi, entrarNaUnidade } from "@/lib/apiProvas";
import type { FichaUnidade } from "@/types/unidade";
import estilos from "./ProvasLock.module.css";

export function ProvasLock({ aoEntrar }: { aoEntrar: (ficha: FichaUnidade) => void }) {
  const [senha, definirSenha] = useState("");
  const [erro, definirErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    definirEnviando(true);
    definirErro(null);
    try {
      aoEntrar(await entrarNaUnidade(senha));
    } catch (falha) {
      definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível conferir a senha. Tente de novo.");
      definirSenha("");
    } finally {
      definirEnviando(false);
    }
  }

  return (
    <form className={estilos.caixa} onSubmit={enviar}>
      <span className={estilos.selo}>
        <Icone nome="cadeado" tamanho={22} />
      </span>

      <h1 className={estilos.titulo}>Área de provas</h1>
      <p className={estilos.texto}>
        Digite a senha da sua unidade. Ela libera as provas e envia as respostas dos alunos para a sua unidade.
      </p>

      <div className={estilos.campo}>
        <label htmlFor="senha-provas">Senha da unidade</label>
        <input
          id="senha-provas"
          type="password"
          value={senha}
          autoComplete="current-password"
          autoFocus
          onChange={(evento) => {
            definirSenha(evento.target.value);
            definirErro(null);
          }}
        />
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="x" tamanho={16} />
          {erro}
        </p>
      )}

      <button type="submit" className={estilos.entrar} disabled={enviando || !senha}>
        {enviando ? "Conferindo…" : "Entrar"}
      </button>
    </form>
  );
}
