import { NavLink, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { useTemaContexto } from "@/hooks/TemaContexto";
import { rotas } from "@/lib/rotas";
import marca from "@/assets/marca-portal.svg";
import estilos from "./Navbar.module.css";

const SECOES = [
  { para: rotas.atividades(), rotulo: "Atividades" },
  { para: rotas.ingles(), rotulo: "Inglês" },
  { para: rotas.cursoIngles(), rotulo: "Curso de Inglês" },
  { para: rotas.digitacao(), rotulo: "Digitação" },
  { para: rotas.guiado(), rotulo: "Passo a Passo" },
  { para: rotas.provas(), rotulo: "Provas" },
];

export function Navbar() {
  const { tema, alternar } = useTemaContexto();
  const navegar = useNavigate();
  const [termo, definirTermo] = useState("");

  function buscar(evento: FormEvent) {
    evento.preventDefault();
    const limpo = termo.trim();
    navegar(limpo ? `/atividades?busca=${encodeURIComponent(limpo)}` : "/atividades");
  }

  return (
    <header className={estilos.barra}>
      <nav className={estilos.interna} aria-label="Principal">
        <NavLink to={rotas.inicio()} className={estilos.marca}>
          <img src={marca} alt="" width={28} height={28} className={estilos.simbolo} />
          <span className={estilos.nome}>
            Portal<span>.</span>
          </span>
        </NavLink>

        <ul className={estilos.secoes}>
          {SECOES.map((secao) => (
            <li key={secao.para}>
              <NavLink
                to={secao.para}
                className={({ isActive }) =>
                  isActive ? `${estilos.secao} ${estilos.secaoAtiva}` : estilos.secao
                }
              >
                {secao.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={estilos.ferramentas}>
          <form className={estilos.busca} role="search" onSubmit={buscar}>
            <Icone nome="busca" tamanho={17} />
            <input
              id="busca-global"
              type="search"
              value={termo}
              onChange={(evento) => definirTermo(evento.target.value)}
              placeholder="Buscar curso"
              aria-label="Buscar curso"
            />
          </form>

          <button
            type="button"
            className={estilos.tema}
            onClick={alternar}
            aria-label={tema === "escuro" ? "Usar tema claro" : "Usar tema escuro"}
          >
            <Icone nome={tema === "escuro" ? "sol" : "lua"} tamanho={18} />
            <span>{tema === "escuro" ? "Claro" : "Escuro"}</span>
          </button>

          <NavLink
            to={rotas.professor()}
            className={({ isActive }) => (isActive ? `${estilos.professor} ${estilos.professorAtivo}` : estilos.professor)}
            aria-label="Área do professor"
            title="Área do professor"
          >
            <Icone nome="usuario" tamanho={18} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
