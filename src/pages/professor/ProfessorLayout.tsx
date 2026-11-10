import { Fragment, useCallback, useEffect, useState, type FormEvent } from "react";
import { Navigate, NavLink, Outlet, useMatch, useOutletContext } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { ErroApi, entrar, sair, sessaoAtual } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import { definirUnidadeAtiva, unidadeAtiva } from "@/lib/unidade";
import type { SessaoProfessor } from "@/types/unidade";
import estilos from "./ProfessorLayout.module.css";

type Estado = { fase: "conferindo" } | { fase: "fora"; aviso?: string } | { fase: "dentro"; professor: SessaoProfessor };

export interface ContextoProfessor {
  professor: SessaoProfessor;
  /** Coordenação: unidade que está sendo olhada (`null` = todas). Professor de unidade: a própria. */
  unidadeAtual: string | null;
  /** Chamada quando a API responde 401 no meio do uso: a sessão de 12 h venceu. */
  sessaoVencida: () => void;
}

export function useProfessor() {
  return useOutletContext<ContextoProfessor>();
}

/** Lembrete da senha da aba Provas: escondida até pedir, só para quem esqueceu. A coordenação vê a da unidade escolhida. */
function SenhaProvas({ professor, unidade }: { professor: SessaoProfessor; unidade: string | null }) {
  const [visivel, definirVisivel] = useState(false);
  const senha = unidade ? professor.senhasProvas?.[unidade] : undefined;
  if (!senha) return null;
  return (
    <p className={estilos.senhaProvas}>
      <Icone nome="cadeado" tamanho={16} />
      <span>Senha da aba Provas:</span>
      {visivel ? <code>{senha}</code> : <span aria-hidden="true">••••••••</span>}
      <button type="button" aria-pressed={visivel} onClick={() => definirVisivel(!visivel)}>
        {visivel ? "Esconder" : "Mostrar"}
      </button>
    </p>
  );
}

/** Toda a área do professor passa por aqui: sem sessão, só o login aparece. */
export function ProfessorLayout() {
  const [estado, definirEstado] = useState<Estado>({ fase: "conferindo" });
  const [escolhida, definirEscolhida] = useState<string | null>(() => unidadeAtiva());
  // O editor de listas é tela cheia, com o próprio «Voltar às listas»: a barra da área do professor sai.
  const noEditor = useMatch("/professor/listas/:id") !== null;
  const naRaiz = useMatch({ path: "/professor", end: true }) !== null;

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
  const permissoes = professor.permissoes ?? [];
  const pode = (id: string) => (permissoes as string[]).includes(id);
  // A página inicial é a das provas: quem não tem essa permissão vai para a primeira área que pode usar.
  if (naRaiz && !pode("provas")) {
    const destino = pode("conteudos") ? rotas.professorConteudos() : pode("listas") ? rotas.professorListas() : pode("usuarios") ? rotas.professorUsuarios() : null;
    if (destino) return <Navigate to={destino} replace />;
  }
  const unidadeAtual = professor.coordenacao ? escolhida : professor.unidade.id;
  return (
    <>
      {!noEditor && (
        <>
          <div className={estilos.barra}>
            <p className={estilos.quem}>
              <Icone nome="pessoas" tamanho={18} />
              <span>
                Área do professor · <strong>{professor.nome}</strong>
              </span>
              {professor.coordenacao ? (
                <label className={estilos.unidadeSeletor}>
                  <span className="sr-only">Unidade</span>
                  <select
                    value={escolhida ?? ""}
                    onChange={(e) => {
                      const id = e.target.value || null;
                      definirUnidadeAtiva(id);
                      definirEscolhida(id);
                    }}
                  >
                    <option value="">{professor.unidade.nome}</option>
                    {professor.unidades.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nome}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <span className={estilos.unidade}>{professor.unidade.nome}</span>
              )}
            </p>
            <nav className={estilos.abas} aria-label="Área do professor">
              {pode("provas") && (
                <NavLink to={rotas.professor()} end className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
                  <Icone nome="prova" tamanho={16} />
                  Provas enviadas
                </NavLink>
              )}
              {pode("conteudos") && (
                <NavLink to={rotas.professorConteudos()} className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
                  <Icone nome="livro" tamanho={16} />
                  Conteúdos
                </NavLink>
              )}
              {pode("listas") && (
                <NavLink to={rotas.professorListas()} className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
                  <Icone nome="tabela" tamanho={16} />
                  Listas
                </NavLink>
              )}
              <NavLink to={rotas.professorPacotes()} className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
                <Icone nome="relogio" tamanho={16} />
                Pacotes
              </NavLink>
              <NavLink to={rotas.professorMensagens()} className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
                <Icone nome="conversa" tamanho={16} />
                Mensagens
              </NavLink>
              {pode("usuarios") && (
                <NavLink to={rotas.professorUsuarios()} className={({ isActive }) => (isActive ? `${estilos.aba} ${estilos.abaAtiva}` : estilos.aba)}>
                  <Icone nome="pessoas" tamanho={16} />
                  Usuários
                </NavLink>
              )}
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
          <SenhaProvas professor={professor} unidade={unidadeAtual} />
        </>
      )}
      {/* Trocar de unidade remonta a página: tudo é buscado de novo, já filtrado. */}
      <Fragment key={unidadeAtual ?? "todas"}>
        <Outlet context={{ professor, unidadeAtual, sessaoVencida } satisfies ContextoProfessor} />
      </Fragment>
    </>
  );
}

function Login({ aviso, aoEntrar }: { aviso?: string; aoEntrar: (professor: SessaoProfessor) => void }) {
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
      <p className={estilos.texto}>Provas enviadas pelos alunos da sua unidade, arquivos e notas, e as listas de acompanhamento da equipe.</p>

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
