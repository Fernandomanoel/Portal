import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { TravaCursoIngles } from "@/components/cursoIngles/TravaCursoIngles";
import { listarAulasIngles, sairCursoIngles } from "@/lib/apiCursoIngles";
import { ErroApi } from "@/lib/apiProvas";
import { rotas } from "@/lib/rotas";
import type { ResumoAulaIngles } from "@/types/aulaIngles";
import estilos from "./CursoInglesPage.module.css";

type Fase = { nome: "carregando" } | { nome: "senha"; aviso?: string } | { nome: "lista"; aulas: ResumoAulaIngles[]; comSenha: boolean } | { nome: "erro"; mensagem: string };

export function CursoInglesPage() {
  const [fase, definirFase] = useState<Fase>({ nome: "carregando" });

  const carregar = useCallback(async () => {
    try {
      const { dados, comSenha } = await listarAulasIngles();
      definirFase({ nome: "lista", aulas: dados, comSenha });
    } catch (falha) {
      if (falha instanceof ErroApi && falha.status === 401) definirFase({ nome: "senha" });
      else definirFase({ nome: "erro", mensagem: falha instanceof ErroApi ? falha.message : "Não foi possível abrir o Inglês. Tente de novo." });
    }
  }, []);

  useEffect(() => {
    // Só a conferência inicial do acesso (o cookie da senha); depois, quem recarrega é a própria tela.
    void carregar();
  }, [carregar]);

  if (fase.nome === "carregando") return <p role="status">Conferindo o acesso…</p>;
  if (fase.nome === "senha") return <TravaCursoIngles aviso={fase.aviso} aoEntrar={() => void carregar()} />;
  if (fase.nome === "erro") return <EstadoVazio icone="alerta" titulo="Inglês indisponível" texto={fase.mensagem} />;

  return (
    <>
      <CabecalhoPagina
        titulo="Inglês"
        texto={`Aulas interativas do curso, com explicação, prática e áudio. Esta área é separada da Conversação${fase.comSenha ? " e só abre com a senha" : ""}.`}
        acoes={
          fase.comSenha && (
            <button
              type="button"
              className={estilos.sair}
              onClick={() => {
                void sairCursoIngles().finally(() => definirFase({ nome: "senha" }));
              }}
            >
              <Icone nome="sair" tamanho={16} />
              Sair do Inglês
            </button>
          )
        }
      />
      {fase.aulas.length === 0 ? (
        <EstadoVazio icone="livro" titulo="Nenhuma aula ainda" texto="As aulas do curso aparecem aqui assim que forem cadastradas." />
      ) : (
        <ul className={estilos.lista}>
          {fase.aulas.map((aula) => (
            <li key={aula.id}>
              <Link to={rotas.cursoInglesAula(aula.id)} className={estilos.cartao}>
                <span className={estilos.codigo}>{aula.codigo}</span>
                <span className={estilos.titulo}>{aula.titulo}</span>
                <span className={estilos.meta}>
                  {aula.passos} {aula.passos === 1 ? "passo" : "passos"}
                </span>
                <Icone nome="seta-direita" tamanho={18} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
