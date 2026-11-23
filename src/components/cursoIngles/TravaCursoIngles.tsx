import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { entrarCursoIngles } from "@/lib/apiCursoIngles";
import { ErroApi } from "@/lib/apiProvas";
import estilos from "./TravaCursoIngles.module.css";

/** Tela de senha do Inglês: só a senha, sem escolher unidade. */
export function TravaCursoIngles({ aoEntrar, aviso }: { aoEntrar: () => void; aviso?: string }) {
  const [senha, definirSenha] = useState("");
  const [erro, definirErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    definirEnviando(true);
    definirErro(null);
    try {
      await entrarCursoIngles(senha);
      aoEntrar();
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
      <h1 className={estilos.titulo}>Inglês</h1>
      <p className={estilos.texto}>Área com senha. Digite a senha do curso para abrir as aulas.</p>

      {aviso && !erro && <p className={estilos.erro}>{aviso}</p>}

      <div className={estilos.campo}>
        <label htmlFor="senha-curso-ingles">Senha do curso</label>
        <input id="senha-curso-ingles" type="password" value={senha} autoComplete="current-password" autoFocus onChange={(e) => definirSenha(e.target.value)} />
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
