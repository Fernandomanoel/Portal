import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone, type NomeIcone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import estilos from "./DigitacaoHubPage.module.css";

/**
 * Hub de Digitação. Diferente de Atividades/Provas, cada jogo aqui mantém a
 * própria forma — não existe um molde único imposto entre eles. O acento de
 * cor de cada linha é a cor que já identifica aquele jogo por dentro (o
 * dourado do Zodíaco, o roxo das letras, o laranja do Sonic), não uma cor
 * nova — é assim que a lista comunica "estes são mundos diferentes" sem
 * inventar uma paleta à parte.
 */
const JOGOS: {
  para: string;
  icone: NomeIcone;
  titulo: string;
  texto: string;
  etiqueta: string;
  acento: string;
}[] = [
  {
    para: rotas.digitacaoLivre(),
    icone: "digitacao",
    titulo: "Treino livre",
    texto: "Digite qualquer texto cadastrado e veja PPM, precisão e erros.",
    etiqueta: "Livre",
    acento: "var(--brand-deep)",
  },
  {
    para: rotas.digitacaoTextosClassicos(),
    icone: "livro",
    titulo: "Textos Clássicos",
    texto: "Níveis de texto livre, com teclado virtual e reações a cada tecla.",
    etiqueta: "5 níveis",
    acento: "#cf8718",
  },
  {
    para: rotas.digitacaoCavaleirosZodiaco(),
    icone: "escudo",
    titulo: "Batalha das 12 Casas",
    texto: "Digite em português, inglês e japonês para vencer os Cavaleiros de Ouro.",
    etiqueta: "12 casas",
    acento: "#c9971f",
  },
  {
    para: rotas.digitacaoLetrasIngles(),
    icone: "musica",
    titulo: "Inglês em Letras de Música",
    texto: "Digite a letra em inglês enquanto ela toca.",
    etiqueta: "8 ensaios",
    acento: "#7c3aed",
  },
  {
    para: rotas.digitacaoSonic(),
    icone: "raio",
    titulo: "Sonic Digital Pro",
    texto: "16 fases, do posicionamento das mãos até frases longas.",
    etiqueta: "16 fases",
    acento: "#e07a00",
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
        {JOGOS.map((jogo, indice) => (
          <li
            key={jogo.para}
            style={{ ["--acento" as string]: jogo.acento, ["--atraso" as string]: `${indice * 55}ms` }}
          >
            <Link to={jogo.para} className={estilos.item}>
              <span className={estilos.icone}>
                <Icone nome={jogo.icone} tamanho={24} />
              </span>
              <span className={estilos.texto}>
                <span className={estilos.linhaTitulo}>
                  <strong className={estilos.titulo}>{jogo.titulo}</strong>
                  <span className={estilos.etiqueta}>{jogo.etiqueta}</span>
                </span>
                <span className={estilos.descricao}>{jogo.texto}</span>
              </span>
              <span className={estilos.seta}>
                <Icone nome="seta-direita" tamanho={18} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link to={rotas.digitacaoRanking()} className={estilos.cartaoRanking}>
        <span className={estilos.iconeRanking}>
          <Icone nome="trofeu" tamanho={22} />
        </span>
        <span className={estilos.texto}>
          <strong className={estilos.titulo}>Ranking geral</strong>
          <span className={estilos.descricao}>O recorde de todos os jogos, num só lugar.</span>
        </span>
        <span className={estilos.seta}>
          <Icone nome="seta-direita" tamanho={18} />
        </span>
      </Link>
    </>
  );
}
