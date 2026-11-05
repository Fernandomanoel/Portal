import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha } from "../ajudantes";
import { comFigura, figura } from "../figmaComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Figma — Grau 2: Quadros, Formas e Camadas",
  introducao:
    "Todo desenho no Figma nasce dentro de um quadro (frame), é feito de formas e textos e vive numa lista de camadas. Quem organiza isso desde o começo trabalha em minutos o que, desorganizado, leva horas. Neste grau você cria quadros para diferentes aparelhos, desenha com formas e texto, dá nome às camadas e alinha tudo com precisão.",
  itens: [
    comFigura(
      associar({
        id: "tamanhos-de-quadro",
        titulo: "Quadros: uma tela de cada aparelho",
        blocos: [
          { tipo: "texto", texto: "Um quadro (frame) representa uma tela: tem tamanho em pixels, fundo e guarda tudo o que pertence àquela tela. O Figma já traz os tamanhos dos aparelhos mais comuns — na ferramenta Quadro (F), a lista aparece no painel da direita." },
          { tipo: "nota", variante: "dica", texto: "Comece sempre pelo celular (390 × 844): é o espaço mais apertado. Se a tela cabe bem ali, ampliar para tablet e computador é mais fácil do que o caminho contrário." },
        ],
        instrucao: "Escolha o tamanho certo para cada aparelho.",
        opcoes: ["390 × 844", "744 × 1133", "1440 × 1024"],
        linhas: [
          { id: "iphone", rotulo: "iPhone 14 (celular)", correta: 0 },
          { id: "ipad", rotulo: "iPad mini (tablet)", correta: 1 },
          { id: "desktop", rotulo: "Desktop (computador)", correta: 2 },
        ],
        explicacao: "Os tamanhos são em pixels (largura × altura); as listas do Figma já trazem esses valores prontos.",
      }),
      figura("escolher-tamanho-quadro", "Figma com a ferramenta Quadro ativa e a lista de tamanhos à direita; iPhone 14, 390 por 844, está destacado.", "Ferramenta Quadro (F) e a lista de tamanhos."),
    ),
    comFigura(
      {
        id: "desenhar-com-formas",
        titulo: "Exercício: um cabeçalho de perfil",
        cenario: "Com retângulo, elipse e texto dá para desenhar quase qualquer interface. Vamos construir o cabeçalho de uma tela de perfil dentro do quadro do iPhone 14.",
        passos: [
          "Crie um quadro iPhone 14 (F) e nomeie-o \"Tela de perfil\".",
          "Tecle R e arraste dentro do quadro, no alto, de ponta a ponta. No painel Design, ponha A (altura) = 120 e preencha com roxo (7C3AED).",
          "Tecle O e, segurando Shift, arraste um círculo de 56 × 56 dentro do cabeçalho: é a foto do usuário. Preencha de branco.",
          "Tecle T, clique ao lado do círculo e escreva \"Meu perfil\". No painel, troque a cor do texto para branco e o peso para Bold.",
          "Abaixo do cabeçalho, desenhe um retângulo arredondado (Raio do canto = 12) para o cartão de informações.",
          "Observe o painel de camadas: tudo que você desenhou está recuado dentro de \"Tela de perfil\". Isso mostra que pertence ao quadro.",
        ],
        aviso: "Se uma forma aparecer fora do quadro na lista de camadas, ela não foi desenhada dentro dele: arraste-a para dentro do quadro no canvas (ou no painel de camadas).",
        desafio: "Duplique o círculo (Ctrl + D) duas vezes e crie uma fileira de três avatares sobrepostos, como numa lista de participantes.",
        objetivo: "Ver que quadro, formas e texto formam uma hierarquia — e que o painel de camadas a mostra.",
      },
      figura("formas-no-quadro", "Quadro iPhone 14 com cabeçalho roxo, um círculo branco e o texto Meu perfil; no painel de camadas, retângulo, elipse e texto aparecem dentro do quadro.", "Formas desenhadas dentro do quadro ficam na camada dele."),
    ),
    comFigura(
      escolha({
        id: "nomear-camadas",
        titulo: "Camadas com nome: o hábito que economiza horas",
        blocos: [
          { tipo: "texto", texto: "O Figma nomeia tudo automaticamente (\"Rectangle 12\", \"Frame 1\", \"Text\"). Com meia dúzia de objetos isso passa; com cinquenta, ninguém acha nada. Um nome claro diz o que o objeto é, não como ele parece." },
          { tipo: "lista", itens: ["Para renomear: duplo clique no nome da camada (ou selecione e tecle Ctrl + R).", "Bons nomes: \"Cabeçalho\", \"Foto do usuário\", \"Botão Entrar\".", "Maus nomes: \"Retângulo roxo\", \"Rectangle 13\", \"copia final 2\"."] },
          { tipo: "nota", variante: "aviso", texto: "Se você trabalhar com um desenvolvedor, os nomes das camadas viram os nomes que ele encontra no arquivo. Camada bem nomeada é meio caminho andado." },
        ],
        instrucao: "Qual nome de camada é o mais útil para quem abrir o arquivo depois?",
        opcoes: ["Rectangle 13", "Retângulo roxo grande", "Cabeçalho da tela de perfil", "Camada nova final"],
        correta: 2,
        explicacao: "O nome deve dizer a função do objeto. A cor ou a forma podem mudar amanhã; a função, não.",
      }),
      figura("camadas-nomeadas", "Duas listas de camadas lado a lado: à esquerda nomes padrão como Rectangle 12; à direita nomes claros como Cabeçalho e Foto do usuário.", "Antes e depois de nomear as camadas."),
    ),
    comFigura(
      {
        id: "alinhar-objetos",
        titulo: "Alinhar e distribuir: precisão sem régua",
        cenario: "Olho engana: dois botões \"quase alinhados\" quebram a aparência de qualquer tela. O Figma alinha por cálculo, não por olhômetro.",
        passos: [
          "Desenhe três retângulos de tamanhos iguais, soltos e desalinhados, dentro do quadro.",
          "Selecione os três (clique no primeiro e, segurando Shift, nos outros dois).",
          "No alto do painel Design, clique em Alinhar à esquerda: as bordas esquerdas passam a coincidir.",
          "Com os três ainda selecionados, use Distribuir espaçamento vertical para que o espaço entre eles fique igual.",
          "Experimente Alinhar ao centro horizontal e compare o resultado.",
          "Passe o mouse perto de outro objeto enquanto arrasta: aparecem linhas vermelhas guia (smart guides) e as distâncias em pixels.",
        ],
        objetivo: "Alinhar pela barra de alinhamento (e pelas guias rosa/vermelhas) em vez de acertar \"no olho\".",
      },
      figura("alinhar-e-distribuir", "Três retângulos roxos desalinhados à esquerda e os mesmos três alinhados e com espaçamento igual à direita, com a barra de alinhamento embaixo.", "Alinhar e distribuir deixam o conjunto limpo."),
    ),
    {
      id: "conferencia-do-quadro",
      titulo: "Conferência rápida do exercício",
      instrucao: "Olhe para o quadro que você criou no exercício do cabeçalho e responda:",
      campos: [
        {
          id: "altura-iphone",
          rotulo: "Quantos pixels de altura tem o quadro iPhone 14?",
          placeholder: "Ex.: 600",
          regra: { tipo: "numero", esperado: 844, tolerancia: 0 },
          mensagemCerta: "Isso: 390 × 844. É a altura do quadro iPhone 14.",
          mensagemErrada: "Confira o painel Design com o quadro selecionado: o campo A (altura) mostra o valor.",
        },
        {
          id: "atalho-retangulo",
          rotulo: "Qual tecla ativa a ferramenta Retângulo?",
          placeholder: "Uma letra",
          regra: { tipo: "padrao", padrao: /^\s*r\s*$/i },
          mensagemCerta: "R de Rectangle.",
          mensagemErrada: "É a inicial de Rectangle, em inglês.",
        },
      ],
      objetivo: "Confirmar que você leu os números do painel Design — é lá que o Figma fala a verdade sobre o objeto.",
    },
  ],
};

export default atividade;
