import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useAreaVisual } from "@/hooks/useAreaVisual";
import { useProvaEmAndamento } from "@/hooks/ProvaEmAndamento";
import { useTelaImersiva } from "@/hooks/TelaImersiva";
import estilos from "./Layout.module.css";

export function Layout() {
  const { travada } = useProvaEmAndamento();
  const { imersiva } = useTelaImersiva();
  const escondido = travada || imersiva;
  const { pathname } = useLocation();
  const doIngles = /^\/(ingles|curso-ingles|provas\/quiz\/ingles)(\/|$)/.test(pathname);
  // A área do professor escolhe a própria cor (ProfessorLayout).
  useAreaVisual(doIngles ? "ingles" : null, pathname.startsWith("/professor"));

  return (
    <div className={estilos.pagina}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      {!escondido && <Navbar />}

      <main
        id="conteudo"
        className={imersiva ? `${estilos.conteudo} ${estilos.conteudoImersivo}` : estilos.conteudo}
      >
        <Outlet />
      </main>

      {!escondido && <Footer />}
    </div>
  );
}
