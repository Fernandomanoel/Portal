import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import estilos from "./DigitacaoHubPage.module.css";

/**
 * Hub de Digitação. Diferente de Atividades/Provas, cada jogo aqui mantém a
 * própria forma — não existe um molde único imposto entre eles.
 */
const JOGOS = [
  {
    para: rotas.digitacaoLivre(),
    titulo: "Treino livre",
    texto: "Digite qualquer texto cadastrado e veja PPM, precisão e erros.",
  },
  {
    para: rotas.digitacaoTextosClassicos(),
    titulo: "Textos Clássicos",
    texto: "Níveis de texto livre, com teclado virtual e reações a cada tecla.",
  },
  {
    para: rotas.digitacaoCavaleirosZodiaco(),
    titulo: "Batalha das 12 Casas",
    texto: "Digite em português, inglês e japonês para vencer os Cavaleiros de Ouro.",
  },
  {
    para: rotas.digitacaoLetrasIngles(),
    titulo: "Inglês em Letras de Música",
    texto: "Digite a letra em inglês enquanto ela toca.",
  },
  {
    para: rotas.digitacaoSonic(),
    titulo: "Sonic Digital Pro",
    texto: "16 fases, do posicionamento das mãos até frases longas.",
  },
];

export function DigitacaoHubPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Digitação"
        texto="Cada jogo tem seu próprio jeito de treinar — escolha um para começar."
      />

      <ul className={estilos.lista}>
        {JOGOS.map((jogo) => (
          <li key={jogo.para}>
            <Link to={jogo.para} className={estilos.item}>
              <span className={estilos.icone}>
                <Icone nome="digitacao" tamanho={22} />
              </span>
              <span className={estilos.texto}>
                <strong className={estilos.titulo}>{jogo.titulo}</strong>
                <span className={estilos.descricao}>{jogo.texto}</span>
              </span>
              <Icone nome="seta-direita" tamanho={18} />
            </Link>
          </li>
        ))}
      </ul>

      <Link to={rotas.digitacaoRanking()} className={estilos.linkRanking}>
        Ver ranking geral de todos os jogos →
      </Link>
    </>
  );
}
