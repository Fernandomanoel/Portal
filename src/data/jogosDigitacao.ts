import { rotas } from "@/lib/rotas";
import type { NomeIcone } from "@/components/Icone";

/**
 * Hub de Digitação, no mesmo vocabulário de card com capa que o resto do
 * portal usa para curso (ver CursoCard) — grade, capa, sigla, metadados.
 * Diferente de Atividades/Provas, cada jogo aqui mantém a própria forma por
 * dentro; a capa usa a cor que já identifica aquele jogo (o dourado do
 * Zodíaco, o roxo das letras, o laranja do Sonic) em vez de uma foto, já que
 * não existe capa fotográfica para um jogo de digitação.
 */
export interface JogoDigitacao {
  para: string;
  icone: NomeIcone;
  sigla: string;
  titulo: string;
  texto: string;
  etiqueta: string;
  acento: string;
}

export const JOGOS: JogoDigitacao[] = [
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
