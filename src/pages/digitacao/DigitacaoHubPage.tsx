import { Link } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone, type NomeIcone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import estilos from "./DigitacaoHubPage.module.css";

/**
 * Hub de Digitação, no mesmo vocabulário de card com capa que o resto do
 * portal usa para curso (ver CursoCard) — grade, capa, sigla, metadados.
 * Diferente de Atividades/Provas, cada jogo aqui mantém a própria forma por
 * dentro; a capa usa a cor que já identifica aquele jogo (o dourado do
 * Zodíaco, o roxo das letras, o laranja do Sonic) em vez de uma foto, já que
 * não existe capa fotográfica para um jogo de digitação.
 */
const JOGOS: {
  para: string;
  icone: NomeIcone;
  sigla: string;
  titulo: string;
  texto: string;
  etiqueta: string;
  acento: string;
}[] = [
  {
    para: rotas.digitacaoLivre(),
    icone: "digitacao",
    sigla: "TL",
    titulo: "Treino livre",
    texto: "Digite qualquer texto cadastrado e veja PPM, precisão e erros.",
    etiqueta: "Livre",
    acento: "var(--brand-deep)",
  },
  {
    para: rotas.digitacaoTextosClassicos(),
    icone: "livro",
    sigla: "TC",
    titulo: "Textos Clássicos",
    texto: "Níveis de texto livre, com teclado virtual e reações a cada tecla.",
    etiqueta: "5 níveis",
    acento: "#cf8718",
  },
  {
    para: rotas.digitacaoCavaleirosZodiaco(),
    icone: "escudo",
    sigla: "BZ",
    titulo: "Batalha das 12 Casas",
    texto: "Digite em português, inglês e japonês para vencer os Cavaleiros de Ouro.",
    etiqueta: "12 casas",
    acento: "#c9971f",
  },
  {
    para: rotas.digitacaoLetrasIngles(),
    icone: "musica",
    sigla: "IM",
    titulo: "Inglês em Letras de Música",
    texto: "Digite a letra em inglês enquanto ela toca.",
    etiqueta: "8 ensaios",
    acento: "#7c3aed",
  },
  {
    para: rotas.digitacaoSonic(),
    icone: "raio",
    sigla: "SD",
    titulo: "Sonic Digital Pro",
    texto: "16 fases com teclado na tela mostrando a tecla e o dedo certo. O Sonic corre conforme o seu ritmo.",
    etiqueta: "16 fases",
    acento: "#e07a00",
  },
  {
    para: rotas.digitacaoBaloes(),
    icone: "balao",
    sigla: "BL",
    titulo: "Balões de Letras",
    texto: "Estoure o balão apertando a letra dele. Os níveis seguem as fileiras do teclado.",
    etiqueta: "16 níveis",
    acento: "#e63946",
  },
  {
    para: rotas.digitacaoConstelacao(),
    icone: "estrela",
    sigla: "CT",
    titulo: "Constelação",
    texto: "Digite a palavra da estrela antes que ela caia. As acesas formam uma constelação.",
    etiqueta: "10 níveis",
    acento: "#4c3fb0",
  },
  {
    para: rotas.digitacaoPulo(),
    icone: "pulo",
    sigla: "PP",
    titulo: "Pulo das Palavras",
    texto: "Leve o robô Bit de chip em chip pela placa, digitando antes que o chip caia.",
    etiqueta: "8 níveis",
    acento: "#138a52",
  },
  {
    para: rotas.digitacaoNave(),
    icone: "raio",
    sigla: "EH",
    titulo: "Esquadrão Hiper",
    texto: "Pilote a nave com as setas e digite a palavra a tempo para soltar o especial contra os chefes.",
    etiqueta: "5 fases",
    acento: "#2b1d8f",
  },
];

export function DigitacaoHubPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Digitação"
        texto="Cada jogo tem seu próprio jeito de treinar — escolha um para começar."
      />

      <ul className={estilos.grade}>
        {JOGOS.map((jogo, indice) => (
          <li
            key={jogo.para}
            className={estilos.item}
            style={{ ["--acento" as string]: jogo.acento, ["--atraso" as string]: `${indice * 55}ms` }}
          >
            <article className={estilos.card}>
              <div className={estilos.capa}>
                <span className={estilos.sigla}>{jogo.sigla}</span>
                <Icone nome={jogo.icone} tamanho={40} />
              </div>
              <div className={estilos.corpo}>
                <h3 className={estilos.titulo}>
                  <Link to={jogo.para}>{jogo.titulo}</Link>
                </h3>
                <p className={estilos.descricao}>{jogo.texto}</p>
                <p className={estilos.rodape}>
                  <Icone nome="check" tamanho={13} />
                  {jogo.etiqueta}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Link to={rotas.digitacaoRanking()} className={estilos.cartaoRanking}>
        <span className={estilos.iconeRanking}>
          <Icone nome="trofeu" tamanho={26} />
        </span>
        <span className={estilos.textoRanking}>
          <strong className={estilos.tituloRanking}>Ranking geral</strong>
          <span className={estilos.descricaoRanking}>O recorde de todos os jogos, num só lugar.</span>
        </span>
        <span className={estilos.setaRanking}>
          <Icone nome="seta-direita" tamanho={18} />
        </span>
      </Link>
    </>
  );
}
