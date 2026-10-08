import { useCallback, useEffect, useState, type FormEvent } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { ErroApi, entrar, sair, sessaoAtual } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import type { Professor } from "@/types/envio";
import estilos from "./ProfessorLayout.module.css";

type Estado = { fase: "conferindo" } | { fase: "fora"; aviso?: string } | { fase: "dentro"; professor: Professor };

export interface ContextoProfessor {
  professor: Professor;
  /** Chamada quando a API responde 401 no meio do uso: a sessão de 12 h venceu. */
  sessaoVencida: () => void;
}

export function useProfessor() {
  return useOutletContext<ContextoProfessor>();
}

/** Toda a área do professor passa por aqui: sem sessão, só o login aparece. */
export function ProfessorLayout() {
  const [estado, definirEstado] = useState<Estado>({ fase: "conferindo" });

  useEffect(() => {
    let ativo = true;
    sessaoAtual()
      .then((professor) => ativo && definirEstado({ fase: "dentro", professor }))
      .catch((falha) => {
        if (!ativo) return;
        const aviso = falha instanceof ErroApi && falha.status !== 401 ? falha.message : undefined;
        definirEstado({ fase: "fora", aviso });
      });
    return () => {
      ativo = false;
    };
  }, []);

  const sessaoVencida = useCallback(() => definirEstado({ fase: "fora", aviso: "Sua sessão terminou. Entre de novo." }), []);

  if (estado.fase === "conferindo") return <p aria-live="polite">Conferindo o acesso…</p>;

  if (estado.fase === "fora") {
    return <Login aviso={estado.aviso} aoEntrar={(professor) => definirEstado({ fase: "dentro", professor })} />;
  }

  const { professor } = estado;
  return (
    <>
      <div className={estilos.barra}>
        <p className={estilos.quem}>
          <Icone nome="pessoas" tamanho={18} />
          <span>
            Área do professor · <strong>{professor.nome}</strong>
          </span>
        </p>
        <nav className={estilos.abas} aria-label="Área do professor">
          <NavLink to={rotas.professor()} end className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
            <Icone nome="prova" tamanho={16} />
            Provas enviadas
          </NavLink>
          <NavLink to={rotas.professorListas()} className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
            <Icone nome="tabela" tamanho={16} />
            Listas
          </NavLink>
        </nav>
        <button
          type="button"
          className={estilos.sair}
          onClick={() => {
            void sair().finally(() => definirEstado({ fase: "fora" }));
          }}
        >
          <Icone nome="sair" tamanho={16} />
          Sair
        </button>
      </div>
      <Outlet context={{ professor, sessaoVencida } satisfies ContextoProfessor} />
    </>
  );
}

function Login({ aviso, aoEntrar }: { aviso?: string; aoEntrar: (professor: Professor) => void }) {
  const [usuario, definirUsuario] = useState("");
  const [senha, definirSenha] = useState("");
  const [erro, definirErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    definirEnviando(true);
    definirErro(null);
    try {
      aoEntrar(await entrar(usuario.trim(), senha));
    } catch (falha) {
      definirErro(falha instanceof ErroApi ? falha.message : "Não foi possível entrar. Tente de novo.");
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
      <h1 className={estilos.titulo}>Área do professor</h1>
      <p className={estilos.texto}>Provas enviadas pelos alunos, arquivos e notas, e as listas de acompanhamento da equipe.</p>

      {aviso && !erro && <p className={estilos.aviso}>{aviso}</p>}

      <div className={estilos.campo}>
        <label htmlFor="professor-usuario">Usuário</label>
        <input
          id="professor-usuario"
          value={usuario}
          onChange={(e) => definirUsuario(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          autoFocus
        />
      </div>
      <div className={estilos.campo}>
        <label htmlFor="professor-senha">Senha</label>
        <input id="professor-senha" type="password" value={senha} onChange={(e) => definirSenha(e.target.value)} autoComplete="current-password" />
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      <button type="submit" className={estilos.entrar} disabled={enviando || !usuario.trim() || !senha}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
