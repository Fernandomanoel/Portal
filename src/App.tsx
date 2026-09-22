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
import { DigitacaoPage } from "@/pages/DigitacaoPage";
import { DigitacaoHubPage } from "@/pages/digitacao/DigitacaoHubPage";
import { RankingGeralPage } from "@/pages/digitacao/RankingGeralPage";
import { CavaleirosZodiacoPage } from "@/pages/digitacao/cavaleirosZodiaco/CavaleirosZodiacoPage";
import { LetrasInglesPage } from "@/pages/digitacao/letrasIngles/LetrasInglesPage";
import { SonicPage } from "@/pages/digitacao/sonic/SonicPage";
import { TextosClassicosPage } from "@/pages/digitacao/textosClassicos/TextosClassicosPage";
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
      { path: "digitacao/livre", element: <DigitacaoPage /> },
      { path: "digitacao/textos-classicos", element: <TextosClassicosPage /> },
      { path: "digitacao/cavaleiros-zodiaco", element: <CavaleirosZodiacoPage /> },
      { path: "digitacao/letras-ingles", element: <LetrasInglesPage /> },
      { path: "digitacao/sonic", element: <SonicPage /> },

      { path: "provas", element: <ProvasPage /> },
      { path: "provas/quiz/:categoria/:prova", element: <QuizPage /> },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={roteador} />;
}
