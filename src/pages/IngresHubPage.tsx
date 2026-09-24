import { NavLink, Outlet, useLocation } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { rotas } from "@/lib/rotas";
import estilos from "./IngresHubPage.module.css";

const SUB = [
  { para: rotas.inglesAtividades(), rotulo: "Atividades" },
  { para: rotas.inglesProvas(), rotulo: "Provas" },
];

export function IngresHubPage() {
  const { pathname } = useLocation();
  const naRaiz = pathname === rotas.ingles();

  return (
    <>
      <CabecalhoPagina
        titulo="Inglês"
        texto="Práticas organizadas por habilidade: vocabulário com imagens, frases, conversas com a Gabi, o inglês da vida real e textos para ouvir."
      />

      <nav className={estilos.abas} aria-label="Seções de Inglês">
        {SUB.map((item) => (
          <NavLink
            key={item.para}
            to={item.para}
            className={({ isActive }) =>
              isActive || (naRaiz && item.para === rotas.inglesAtividades())
                ? `${estilos.aba} ${estilos.abaAtiva}`
                : estilos.aba
            }
          >
            {item.rotulo}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </>
  );
}
