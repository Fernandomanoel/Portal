import { useCallback, useEffect, useState, type FormEvent } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { ajustarFixo, apagarUsuario, atualizarUsuario, criarUsuario, listarUsuarios, voltarFixoAoPadrao, type ListaDeUsuarios } from "@/lib/apiUsuarios";
import { ErroApi } from "@/lib/apiProvas";
import { AREAS, PERMISSOES, type AreaId, type PermissaoId, type UsuarioCadastrado, type UsuarioFixo } from "@/types/acesso";
import { TODAS_AS_UNIDADES } from "@/types/unidade";
import { useProfessor } from "./ProfessorLayout";
import estilos from "./ProfessorUsuariosPage.module.css";

const ALFABETO = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function senhaAleatoria() {
  const bytes = crypto.getRandomValues(new Uint32Array(12));
  return Array.from(bytes, (n) => ALFABETO[n % ALFABETO.length]).join("");
}

interface Formulario {
  usuario: string;
  nome: string;
  senha: string;
  unidades: string[];
  permissoes: PermissaoId[];
  areas: AreaId[];
  ativo: boolean;
}

const vazio = (): Formulario => ({ usuario: "", nome: "", senha: "", unidades: [], permissoes: ["listas"], areas: ["informatica"], ativo: true });

export function ProfessorUsuariosPage() {
  const { professor, sessaoVencida } = useProfessor();
  const [dados, definirDados] = useState<ListaDeUsuarios | null>(null);
  const [erro, definirErro] = useState<string | null>(null);
  const [editando, definirEditando] = useState<{ modo: "novo" } | { modo: "editar"; usuario: string } | { modo: "fixo"; usuario: string } | null>(null);
  const [apagando, definirApagando] = useState<string | null>(null);

  const tratar = useCallback(
    (falha: unknown, padrao: string) => {
      if (falha instanceof ErroApi && falha.status === 401) sessaoVencida();
      else definirErro(falha instanceof ErroApi ? falha.message : padrao);
    },
    [sessaoVencida],
  );

  const carregar = useCallback(async () => {
    try {
      definirDados(await listarUsuarios());
      definirErro(null);
    } catch (falha) {
      tratar(falha, "Não foi possível carregar os usuários.");
    }
  }, [tratar]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const nomeUnidade = (id: string) => (id === TODAS_AS_UNIDADES ? "Todas as unidades" : (dados?.unidades.find((u) => u.id === id)?.nome ?? id));
  const rotuloPermissao = (id: PermissaoId) => PERMISSOES.find((p) => p.id === id)?.rotulo ?? id;

  async function alternarAtivo(u: UsuarioCadastrado) {
    try {
      await atualizarUsuario(u.usuario, { ativo: !u.ativo });
      await carregar();
    } catch (falha) {
      tratar(falha, "Não foi possível alterar o usuário.");
    }
  }

  async function mudarFixo(f: UsuarioFixo, acao: "alternar" | "padrao") {
    try {
      if (acao === "padrao") await voltarFixoAoPadrao(f.usuario);
      else await ajustarFixo(f.usuario, { ativo: !f.ativo });
      await carregar();
    } catch (falha) {
      tratar(falha, "Não foi possível alterar o usuário.");
    }
  }

  async function apagar(usuario: string) {
    try {
      await apagarUsuario(usuario);
      definirApagando(null);
      await carregar();
    } catch (falha) {
      tratar(falha, "Não foi possível apagar o usuário.");
    }
  }

  const aEditar = editando?.modo === "editar" ? dados?.dados.find((u) => u.usuario === editando.usuario) : undefined;
  const fixoAEditar = editando?.modo === "fixo" ? dados?.fixos.find((u) => u.usuario === editando.usuario) : undefined;

  return (
    <>
      <CabecalhoPagina
        titulo="Usuários"
        texto="Crie logins para quem não é de uma unidade só (diretoria, coordenação, apoio) e escolha o que cada um acessa e de quais unidades. As mudanças valem na hora."
        acoes={
          <button type="button" className={estilos.nova} onClick={() => definirEditando({ modo: "novo" })} disabled={editando !== null}>
            <Icone nome="mais" tamanho={17} />
            Novo usuário
          </button>
        }
      />

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {erro}
        </p>
      )}

      {editando && dados && (
        <FormularioUsuario
          key={editando.modo === "novo" ? "novo" : `${editando.modo}-${editando.usuario}`}
          dados={dados}
          existente={aEditar}
          fixo={fixoAEditar}
          todasAsUnidades={professor.todasAsUnidades}
          minhasUnidades={professor.coordenacao ? professor.unidades.map((u) => u.id) : [professor.unidade.id]}
          minhasPermissoes={professor.permissoes}
          minhasAreas={professor.areas ?? ["informatica"]}
          aoSalvar={async () => {
            definirEditando(null);
            await carregar();
          }}
          aoCancelar={() => definirEditando(null)}
          tratar={tratar}
        />
      )}

      {dados === null ? (
        !erro && <p aria-live="polite">Carregando os usuários…</p>
      ) : (
        <>
          <section aria-labelledby="titulo-cadastrados" className={estilos.secao}>
            <h2 id="titulo-cadastrados">Usuários cadastrados pela tela</h2>
            {dados.dados.length === 0 ? (
              <p className={estilos.suave}>Nenhum ainda. Clique em «Novo usuário» para criar o primeiro.</p>
            ) : (
              <ul className={estilos.lista}>
                {dados.dados.map((u) => (
                  <li key={u.usuario} className={`${estilos.item} ${u.ativo ? "" : estilos.inativo}`}>
                    <div className={estilos.quem}>
                      <p className={estilos.nome}>
                        {u.nome} {!u.ativo && <span className={estilos.etiquetaInativo}>desativado</span>}
                      </p>
                      <p className={estilos.usuario}>{u.usuario}</p>
                    </div>
                    <div className={estilos.acesso}>
                      <p className={estilos.rotulo}>Unidades</p>
                      <ul className={estilos.chips}>
                        {u.unidades.map((id) => (
                          <li key={id}>{nomeUnidade(id)}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={estilos.acesso}>
                      <p className={estilos.rotulo}>Acessa</p>
                      <ul className={estilos.chips}>
                        {(u.areas ?? ["informatica"]).map((a) => (
                          <li key={a}>Área: {AREAS.find((x) => x.id === a)?.rotulo}</li>
                        ))}
                        {u.permissoes.map((p) => (
                          <li key={p}>{rotuloPermissao(p)}</li>
                        ))}
                      </ul>
                    </div>
                    {apagando === u.usuario ? (
                      <div className={estilos.confirmar}>
                        <span>Apagar de vez?</span>
                        <button type="button" className={estilos.acao} onClick={() => definirApagando(null)}>
                          Cancelar
                        </button>
                        <button type="button" className={`${estilos.acao} ${estilos.perigo}`} onClick={() => void apagar(u.usuario)}>
                          Apagar
                        </button>
                      </div>
                    ) : (
                      <div className={estilos.acoes}>
                        <button type="button" className={estilos.acao} onClick={() => definirEditando({ modo: "editar", usuario: u.usuario })} disabled={editando !== null}>
                          Editar
                        </button>
                        <button type="button" className={estilos.acao} onClick={() => void alternarAtivo(u)} disabled={u.usuario === professor.usuario}>
                          {u.ativo ? "Desativar" : "Ativar"}
                        </button>
                        <button type="button" className={`${estilos.acao} ${estilos.apagar}`} onClick={() => definirApagando(u.usuario)} disabled={u.usuario === professor.usuario} aria-label={`Apagar ${u.nome}`}>
                          <Icone nome="lixeira" tamanho={16} />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {dados.fixos.length > 0 && (
            <section aria-labelledby="titulo-fixos" className={estilos.secao}>
              <h2 id="titulo-fixos">Professores da configuração do servidor</h2>
              <p className={estilos.suave}>
                O nome, o usuário e a senha destes só mudam pela variável PROFESSORES, na Vercel. Aqui você ajusta as unidades, o que cada um acessa e pode bloquear a entrada. As mudanças valem na hora.
              </p>
              <ul className={estilos.lista}>
                {dados.fixos.map((f) => (
                  <li key={f.usuario} className={`${estilos.item} ${f.ativo ? "" : estilos.inativo}`}>
                    <div className={estilos.quem}>
                      <p className={estilos.nome}>
                        {f.nome} {!f.ativo && <span className={estilos.etiquetaInativo}>bloqueado</span>}
                      </p>
                      <p className={estilos.usuario}>
                        {f.usuario}
                        {f.administrador ? " · administrador" : f.ajustado ? " · ajustado pela tela" : " · acesso padrão"}
                      </p>
                    </div>
                    <div className={estilos.acesso}>
                      <p className={estilos.rotulo}>Unidades</p>
                      <ul className={estilos.chips}>
                        {f.unidades.map((id) => (
                          <li key={id}>{nomeUnidade(id)}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={estilos.acesso}>
                      <p className={estilos.rotulo}>Acessa</p>
                      <ul className={estilos.chips}>
                        {(f.areas ?? ["informatica"]).map((a) => (
                          <li key={a}>Área: {AREAS.find((x) => x.id === a)?.rotulo}</li>
                        ))}
                        {f.permissoes.map((p) => (
                          <li key={p}>{rotuloPermissao(p)}</li>
                        ))}
                      </ul>
                    </div>
                    {f.ajustavel && f.usuario !== professor.usuario ? (
                      <div className={estilos.acoes}>
                        <button type="button" className={estilos.acao} onClick={() => definirEditando({ modo: "fixo", usuario: f.usuario })} disabled={editando !== null}>
                          Editar acesso
                        </button>
                        <button type="button" className={estilos.acao} onClick={() => void mudarFixo(f, "alternar")}>
                          {f.ativo ? "Bloquear" : "Desbloquear"}
                        </button>
                        {f.ajustado && (
                          <button type="button" className={estilos.acao} onClick={() => void mudarFixo(f, "padrao")}>
                            Voltar ao padrão
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className={estilos.suave}>{f.administrador ? "Administrador: só muda pela Vercel." : "Só muda pela Vercel."}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
}

function FormularioUsuario({
  dados,
  existente,
  fixo,
  todasAsUnidades,
  minhasUnidades,
  minhasPermissoes,
  minhasAreas,
  aoSalvar,
  aoCancelar,
  tratar,
}: {
  dados: ListaDeUsuarios;
  existente: UsuarioCadastrado | undefined;
  /** Professor da variável: só unidades e permissões são editáveis. */
  fixo?: UsuarioFixo;
  todasAsUnidades: boolean;
  minhasUnidades: string[];
  minhasPermissoes: PermissaoId[];
  minhasAreas: AreaId[];
  aoSalvar: () => Promise<void>;
  aoCancelar: () => void;
  tratar: (falha: unknown, padrao: string) => void;
}) {
  const [f, definirF] = useState<Formulario>(() => (fixo ? { usuario: fixo.usuario, nome: fixo.nome, senha: "", unidades: fixo.unidades, permissoes: fixo.permissoes, areas: fixo.areas ?? ["informatica"], ativo: fixo.ativo } : existente ? { usuario: existente.usuario, nome: existente.nome, senha: "", unidades: existente.unidades, permissoes: existente.permissoes, areas: existente.areas ?? ["informatica"], ativo: existente.ativo } : vazio()));
  const [salvando, definirSalvando] = useState(false);
  const [mensagem, definirMensagem] = useState<string | null>(null);
  const novo = !existente && !fixo;
  const todas = f.unidades.includes(TODAS_AS_UNIDADES);

  // Só se libera o que quem cria também tem: o servidor confere, aqui só se esconde o que seria recusado.
  const unidadesDisponiveis = dados.unidades.filter((u) => todasAsUnidades || minhasUnidades.includes(u.id));
  const permissoesDisponiveis = PERMISSOES.filter((p) => minhasPermissoes.includes(p.id));
  const areasDisponiveis = AREAS.filter((a) => minhasAreas.includes(a.id));

  const alternar = <T,>(lista: T[], valor: T) => (lista.includes(valor) ? lista.filter((x) => x !== valor) : [...lista, valor]);

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    definirSalvando(true);
    definirMensagem(null);
    try {
      if (fixo) {
        await ajustarFixo(fixo.usuario, { unidades: f.unidades, permissoes: f.permissoes, areas: f.areas });
      } else if (novo) {
        await criarUsuario({ usuario: f.usuario.trim(), nome: f.nome, senha: f.senha, unidades: f.unidades, permissoes: f.permissoes, areas: f.areas });
      } else if (existente) {
        await atualizarUsuario(existente.usuario, { nome: f.nome, unidades: f.unidades, permissoes: f.permissoes, areas: f.areas, ...(f.senha ? { senha: f.senha } : {}) });
      }
      await aoSalvar();
    } catch (falha) {
      if (falha instanceof ErroApi && falha.status !== 401) definirMensagem(falha.message);
      else tratar(falha, "Não foi possível salvar.");
      definirSalvando(false);
    }
  }

  return (
    <form className={estilos.formulario} onSubmit={(e) => void enviar(e)} aria-labelledby="titulo-form">
      <h2 id="titulo-form">{fixo ? `Acesso de ${fixo.nome}` : novo ? "Novo usuário" : `Editar ${existente?.nome ?? ""}`}</h2>
      {fixo && <p className={estilos.suave}>Nome, usuário e senha deste professor ficam na Vercel. Aqui você define de quais unidades ele é e o que pode acessar.</p>}

      <div className={estilos.grade} hidden={!!fixo}>
        <label className={estilos.campo}>
          <span>Nome</span>
          <input value={f.nome} onChange={(e) => definirF({ ...f, nome: e.target.value })} maxLength={80} required disabled={!!fixo} />
        </label>
        <label className={estilos.campo}>
          <span>Usuário (para entrar)</span>
          <input value={f.usuario} onChange={(e) => definirF({ ...f, usuario: e.target.value.toLowerCase() })} maxLength={30} disabled={!novo} required placeholder="ex.: diretoria.geral" autoCapitalize="none" autoComplete="off" />
        </label>
        <label className={estilos.campo}>
          <span>{novo ? "Senha" : "Nova senha (deixe vazio para manter)"}</span>
          <span className={estilos.linhaSenha}>
            <input value={f.senha} onChange={(e) => definirF({ ...f, senha: e.target.value })} minLength={8} maxLength={100} required={novo} disabled={!!fixo} autoComplete="off" />
            <button type="button" className={estilos.acao} onClick={() => definirF({ ...f, senha: senhaAleatoria() })}>
              Gerar
            </button>
          </span>
          <small>De 8 a 100 caracteres. Anote e passe à pessoa: depois de salva, ela não aparece mais.</small>
        </label>
      </div>

      <fieldset className={estilos.conjunto}>
        <legend>De quais unidades</legend>
        {todasAsUnidades && (
          <label className={estilos.opcao}>
            <input type="checkbox" checked={todas} onChange={() => definirF({ ...f, unidades: todas ? [] : [TODAS_AS_UNIDADES] })} />
            <span>
              <strong>Todas as unidades</strong>
              <small>Inclui as que forem criadas no futuro.</small>
            </span>
          </label>
        )}
        {unidadesDisponiveis.map((u) => (
          <label key={u.id} className={estilos.opcao}>
            <input type="checkbox" checked={todas || f.unidades.includes(u.id)} disabled={todas} onChange={() => definirF({ ...f, unidades: alternar(f.unidades, u.id) })} />
            <span>
              <strong>{u.nome}</strong>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className={estilos.conjunto}>
        <legend>Área do professor</legend>
        {areasDisponiveis.map((a) => (
          <label key={a.id} className={estilos.opcao}>
            <input
              type="checkbox"
              checked={f.areas.includes(a.id)}
              onChange={() => {
                const areas = alternar(f.areas, a.id);
                if (areas.length) definirF({ ...f, areas });
              }}
            />
            <span>
              <strong>{a.rotulo}</strong>
              <small>{a.descricao}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className={estilos.conjunto}>
        <legend>O que pode acessar</legend>
        {permissoesDisponiveis.map((p) => (
          <label key={p.id} className={estilos.opcao}>
            <input type="checkbox" checked={f.permissoes.includes(p.id)} onChange={() => definirF({ ...f, permissoes: alternar(f.permissoes, p.id) })} />
            <span>
              <strong>{p.rotulo}</strong>
              <small>{p.descricao}</small>
            </span>
          </label>
        ))}
      </fieldset>

      {mensagem && (
        <p className={estilos.erro} role="alert">
          <Icone nome="alerta" tamanho={16} />
          {mensagem}
        </p>
      )}

      <div className={estilos.formAcoes}>
        <button type="submit" className={estilos.nova} disabled={salvando}>
          {salvando ? "Salvando…" : novo ? "Criar usuário" : "Salvar alterações"}
        </button>
        <button type="button" className={estilos.acao} onClick={aoCancelar} disabled={salvando}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
