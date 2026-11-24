import { useEffect, useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { ErroApi, entrarNaUnidade, listarUnidades } from "@/lib/apiProvas";
import type { FichaUnidade, Unidade } from "@/types/unidade";
import estilos from "./ProvasLock.module.css";

const TEXTO_PROVAS = "Escolha a sua unidade e digite a senha dela. As provas só abrem com a senha, e as respostas dos alunos vão para a unidade escolhida.";

/** Pede a unidade e a senha dela. `titulo` e `texto` deixam outras áreas do instrutor reaproveitarem a mesma tela. */
export function ProvasLock({ aoEntrar, titulo = "Área de provas", texto = TEXTO_PROVAS, conferir = entrarNaUnidade, rotuloSenha = "Senha da unidade" }: { rotuloSenha?: string; aoEntrar: (ficha: FichaUnidade) => void; titulo?: string; texto?: string; conferir?: (unidade: string, senha: string) => Promise<FichaUnidade> }) {
  const [unidades, definirUnidades] = useState<Unidade[] | null>(null);
  const [falhaLista, definirFalhaLista] = useState<string | null>(null);
  const [tentativa, definirTentativa] = useState(0);
  const [unidade, definirUnidade] = useState("");
  const [senha, definirSenha] = useState("");
  const [erro, definirErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);

  useEffect(() => {
    let ativo = true;
    listarUnidades()
      .then((lista) => {
        if (!ativo) return;
        definirUnidades(lista);
        // Com uma unidade só não há o que escolher.
        if (lista.length === 1) definirUnidade(lista[0].id);
      })
      .catch((falha) => {
        if (ativo) definirFalhaLista(falha instanceof ErroApi ? falha.message : "Não foi possível carregar as unidades. Tente de novo.");
      });
    return () => {
      ativo = false;
    };
  }, [tentativa]);

  function carregarDeNovo() {
    definirFalhaLista(null);
    definirUnidades(null);
    definirTentativa((n) => n + 1);
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    definirEnviando(true);
    definirErro(null);
    try {
      aoEntrar(await conferir(unidade, senha));
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

      <h1 className={estilos.titulo}>{titulo}</h1>
      <p className={estilos.texto}>{texto}</p>

      {falhaLista ? (
        <>
          <p className={estilos.erro} role="alert">
            <Icone nome="x" tamanho={16} />
            {falhaLista}
          </p>
          <button type="button" className={estilos.tentarDeNovo} onClick={carregarDeNovo}>
            Tentar de novo
          </button>
        </>
      ) : unidades === null ? (
        <p className={estilos.carregando} role="status">
          Carregando as unidades…
        </p>
      ) : (
        <>
          <div className={estilos.campo}>
            <label htmlFor="unidade-provas">Unidade</label>
            <select
              id="unidade-provas"
              value={unidade}
              autoFocus={unidades.length > 1}
              onChange={(evento) => {
                definirUnidade(evento.target.value);
                definirErro(null);
              }}
            >
              <option value="" disabled>
                Escolha a unidade
              </option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={estilos.campo}>
            <label htmlFor="senha-provas">{rotuloSenha}</label>
            <input
              id="senha-provas"
              type="password"
              value={senha}
              autoComplete="current-password"
              autoFocus={unidades.length === 1}
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

          <button type="submit" className={estilos.entrar} disabled={enviando || !unidade || !senha}>
            {enviando ? "Conferindo…" : "Entrar"}
          </button>
        </>
      )}
    </form>
  );
}
