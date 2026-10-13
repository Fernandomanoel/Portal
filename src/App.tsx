import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { ProvedorProvaEmAndamento } from "@/hooks/ProvaEmAndamento";
import { ProvedorTelaImersiva } from "@/hooks/TelaImersiva";
import { ProvedorTema } from "@/hooks/TemaContexto";
import { AtividadeAutocorrigidaPage } from "@/pages/AtividadeAutocorrigidaPage";
import { AtividadePage } from "@/pages/AtividadePage";
import { AtividadesPage } from "@/pages/AtividadesPage";
import { HomePage } from "@/pages/HomePage";
import { IngresAtividadePage } from "@/pages/IngresAtividadePage";
import { IngresAtividadesPage } from "@/pages/IngresAtividadesPage";
import { IngresHubPage } from "@/pages/IngresHubPage";
import { IngresProvasPage } from "@/pages/IngresProvasPage";
import { DigitacaoHubPage } from "@/pages/digitacao/DigitacaoHubPage";
import { RankingGeralPage } from "@/pages/digitacao/RankingGeralPage";
import { CavaleirosZodiacoPage } from "@/pages/digitacao/cavaleirosZodiaco/CavaleirosZodiacoPage";
import { LetrasInglesPage } from "@/pages/digitacao/letrasIngles/LetrasInglesPage";
import { SonicPage } from "@/pages/digitacao/sonic/SonicPage";
import { BaloesPage } from "@/pages/digitacao/baloes/BaloesPage";
import { ConstelacaoPage } from "@/pages/digitacao/constelacao/ConstelacaoPage";
import { PuloPage } from "@/pages/digitacao/pulo/PuloPage";
import { NavePage } from "@/pages/digitacao/nave/NavePage";
import { TextosClassicosPage } from "@/pages/digitacao/textosClassicos/TextosClassicosPage";
import { GuiadoJogoPage } from "@/pages/guiado/GuiadoJogoPage";
import { GuiadoTutorialPage } from "@/pages/guiado/GuiadoTutorialPage";
import { GuiadoVitrinePage } from "@/pages/guiado/GuiadoVitrinePage";
import { ProfessorEnvioPage } from "@/pages/professor/ProfessorEnvioPage";
import { ProfessorEnviosPage } from "@/pages/professor/ProfessorEnviosPage";
import { ProfessorLayout } from "@/pages/professor/ProfessorLayout";
import { ProfessorListaPage } from "@/pages/professor/ProfessorListaPage";
import { ProfessorListasPage } from "@/pages/professor/ProfessorListasPage";
import { ProvasPage } from "@/pages/ProvasPage";
import { QuizPage } from "@/pages/QuizPage";

/** Os provedores ficam dentro do roteador para que a prova em andamento possa
 *  usar o bloqueador de navegação, que só existe em data router. */
function Raiz() {
  return (
    <ProvedorTema>
      <ProvedorProvaEmAndamento>
        <ProvedorTelaImersiva>
          <Layout />
        </ProvedorTelaImersiva>
      </ProvedorProvaEmAndamento>
    </ProvedorTema>
  );
}

/** Build de preview roda em host estático sem rewrite de SPA, onde só o hash
 *  sobrevive ao recarregamento. Em produção continua sendo rota de caminho. */
const criarRoteador = import.meta.env.VITE_PREVIEW
  ? createHashRouter
  : createBrowserRouter;

const roteador = criarRoteador([
  {
    element: <Raiz />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "atividades", element: <AtividadesPage /> },
      { path: "atividades/:curso", element: <AtividadePage /> },
      { path: "atividades/:curso/atividade/:atividade", element: <AtividadeAutocorrigidaPage /> },

      {
        path: "ingles",
        element: <IngresHubPage />,
        children: [
          { index: true, element: <IngresAtividadesPage /> },
          { path: "atividades", element: <IngresAtividadesPage /> },
          { path: "provas", element: <IngresProvasPage /> },
        ],
      },
      { path: "ingles/atividades/:slug", element: <IngresAtividadePage /> },

      { path: "digitacao", element: <DigitacaoHubPage /> },
      { path: "digitacao/ranking", element: <RankingGeralPage /> },
      { path: "digitacao/textos-classicos", element: <TextosClassicosPage /> },
      { path: "digitacao/cavaleiros-zodiaco", element: <CavaleirosZodiacoPage /> },
      { path: "digitacao/letras-ingles", element: <LetrasInglesPage /> },
      { path: "digitacao/sonic", element: <SonicPage /> },
      { path: "digitacao/baloes", element: <BaloesPage /> },
      { path: "digitacao/constelacao", element: <ConstelacaoPage /> },
      { path: "digitacao/pulo", element: <PuloPage /> },
      { path: "digitacao/nave", element: <NavePage /> },

      { path: "passo-a-passo", element: <GuiadoVitrinePage /> },
      { path: "passo-a-passo/tutorial/:caminho", element: <GuiadoTutorialPage /> },
      { path: "passo-a-passo/jogo/:slug", element: <GuiadoJogoPage /> },

      { path: "provas", element: <ProvasPage /> },
      { path: "provas/quiz/:categoria/:prova", element: <QuizPage /> },

      {
        path: "professor",
        element: <ProfessorLayout />,
        children: [
          { index: true, element: <ProfessorEnviosPage /> },
          { path: "envios/:id", element: <ProfessorEnvioPage /> },
          { path: "listas", element: <ProfessorListasPage /> },
          { path: "listas/:id", element: <ProfessorListaPage /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={roteador} />;
}
