import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../figmaComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Figma — Grau 3: Auto Layout, Grades e Espaçamento",
  introducao:
    "Redesenhar um botão cada vez que o texto muda é o tipo de trabalho que o Auto Layout elimina. Ele faz os elementos se organizarem sozinhos — em linha ou em coluna, com espaço e margem certos — e se ajustarem quando o conteúdo cresce. Junto com as grades de layout e uma régua de espaçamentos, é o que separa um desenho amador de um profissional.",
  itens: [
    comFigura(
      escolha({
        id: "por-que-auto-layout",
        titulo: "O que o Auto Layout faz por você",
        blocos: [
          { tipo: "texto", texto: "Com o Auto Layout, um quadro passa a organizar o que está dentro dele. Você diz três coisas e o Figma cuida do resto:" },
          { tipo: "lista", itens: ["Direção: horizontal (lado a lado) ou vertical (um embaixo do outro).", "Espaçamento (gap): a distância entre os itens.", "Preenchimento (padding): a folga entre o conteúdo e a borda do quadro."] },
          { tipo: "texto", texto: "Os tamanhos podem ser Hug contents (o quadro abraça o conteúdo e cresce junto com ele) ou Fill container (o item preenche o espaço do quadro pai). O botão da figura é Hug contents nos dois sentidos: por isso \"Criar minha conta\" é mais largo que \"OK\" sem ninguém arrastar nada." },
        ],
        instrucao: "Você digitou um texto mais longo no botão com Auto Layout (Hug contents). O que acontece?",
        opcoes: ["O botão se alarga sozinho, mantendo o preenchimento.", "O texto sai para fora do botão.", "O Figma apaga o texto que não couber.", "Você precisa arrastar as alças do botão para acomodar."],
        correta: 0,
        explicacao: "Hug contents faz o quadro acompanhar o conteúdo: o preenchimento (padding) fica sempre igual.",
      }),
      figura("botao-auto-layout", "Três botões roxos de larguras diferentes (OK, Entrar, Criar minha conta) com o preenchimento marcado em rosa tracejado e o painel Auto Layout ao lado.", "O botão se ajusta ao texto; o padding continua o mesmo."),
    ),
    {
      id: "botao-com-auto-layout",
      titulo: "Exercício: o botão que se ajusta",
      passos: [
        "Desenhe um retângulo arredondado (Raio 8) roxo e, por cima, um texto branco \"Entrar\". Não se preocupe com o tamanho.",
        "Selecione o texto e o retângulo juntos e tecle Shift + A (Adicionar Auto Layout). O Figma cria um quadro em volta.",
        "No painel Design, em Auto Layout, defina Preenchimento horizontal = 16 e vertical = 10.",
        "Apague o retângulo roxo solto e pinte o próprio quadro com o roxo (Preenchimento do quadro), com o Raio do canto = 8.",
        "Dê duplo clique no texto e escreva \"Criar minha conta\": o botão cresce. Volte para \"OK\": ele encolhe.",
        "Nomeie o quadro \"Botão primário\".",
      ],
      campos: [
        {
          id: "padding-horizontal",
          rotulo: "Qual preenchimento horizontal (lados) você definiu no botão?",
          placeholder: "Número",
          regra: { tipo: "numero", esperado: 16, tolerancia: 0 },
          mensagemCerta: "Isso: 16 nos lados e 10 em cima e embaixo dão um botão de aparência equilibrada.",
          mensagemErrada: "O exercício pede 16 nos lados (e 10 em cima/baixo).",
        },
      ],
      aviso: "Shift + A funciona com a seleção ativa. Se nada acontecer, confirme que o texto e o retângulo estão realmente selecionados no painel de camadas.",
      objetivo: "Criar o primeiro elemento \"vivo\" do arquivo: muda o texto, muda o tamanho — sem retrabalho.",
    },
    comFigura(
      {
        id: "lista-com-auto-layout",
        titulo: "Exercício: uma lista que se reorganiza",
        cenario: "Auto Layout vertical é perfeito para listas: itens empilhados com espaço igual entre eles. Acrescentou um item? A lista cresce, sem você empurrar nada.",
        passos: [
          "Faça um cartão de tarefa: retângulo claro com um círculo e o texto \"Tarefa 1\". Selecione os três e tecle Shift + A.",
          "Duplique o cartão duas vezes (Ctrl + D) e renomeie os textos para Tarefa 2 e Tarefa 3.",
          "Selecione os três cartões e tecle Shift + A de novo: agora o Auto Layout externo organiza a lista.",
          "No painel Design, deixe a direção em vertical, o Espaçamento (gap) em 12 e o Preenchimento em 16.",
          "Selecione um cartão e tecle Ctrl + D: o novo item entra na lista e o quadro cresce sozinho.",
          "Arraste um cartão para cima ou para baixo: os outros se reorganizam.",
        ],
        campos: [
          {
            id: "gap-lista",
            rotulo: "Qual espaçamento (gap) entre os itens você definiu na lista?",
            placeholder: "Número",
            regra: { tipo: "numero", esperado: 12, tolerancia: 0 },
            mensagemCerta: "Isso: gap 12 entre os cartões.",
            mensagemErrada: "O exercício pede espaçamento de 12 entre os itens.",
          },
        ],
        desafio: "Selecione a lista e inverta a direção para horizontal. Como a aparência muda? Para que tipo de tela essa versão serve?",
        objetivo: "Perceber que um quadro com Auto Layout pode conter outros quadros com Auto Layout — é assim que se montam telas inteiras.",
      },
      figura("auto-layout-painel", "Figma com uma lista de três cartões selecionada; no painel Auto Layout, direção vertical, gap 12 e preenchimento 16; faixas rosa entre os cartões mostram o espaçamento.", "Auto Layout vertical: direção, gap e padding no painel Design."),
    ),
    comFigura(
      {
        id: "grade-de-layout",
        titulo: "Grades de layout e a régua dos 8",
        cenario: "Grades de layout são guias: dividem o quadro em colunas para que os elementos se alinhem a um mesmo ritmo. Telas organizadas em grade parecem \"limpas\" mesmo sem você saber explicar por quê.",
        passos: [
          "Selecione o quadro do celular. No painel Design, ao lado de Grades de layout (Layout grid), clique em +.",
          "Mude o tipo para Colunas e defina: Quantidade = 4, Margem = 16 e Espaçamento (gutter) = 16.",
          "Posicione os cartões de modo que cada um ocupe duas colunas: as bordas devem encostar nas faixas vermelhas.",
          "Ligue e desligue a grade com Ctrl + Shift + 4 (no Windows) para conferir o resultado sem as faixas.",
          "Revise seus espaçamentos: use sempre múltiplos de 8 (8, 16, 24, 32...). É a \"régua dos 8\".",
        ],
        tabelaReferencia: {
          colunas: ["Para que serve", "Valor comum"],
          linhas: [["Espaço pequeno entre elementos", "8"], ["Margem lateral do celular", "16"], ["Espaço entre blocos", "24"], ["Espaço entre seções", "32 ou 48"]],
        },
        aviso: "Margens e espaços fora da régua (13, 17, 22...) são o primeiro sinal de desenho \"no olho\". Se você usa o Auto Layout, defina os valores uma vez, em múltiplos de 8, e o resto se acomoda.",
        objetivo: "Usar a grade como guia de alinhamento e a régua dos 8 como padrão de espaçamento.",
      },
      figura("grade-de-colunas", "Quadro de celular com quatro faixas vermelhas de coluna e quatro cartões lilás alinhados a elas; no painel, Grades de layout com Colunas, quantidade 4, margem 16 e espaçamento 16.", "Grade de 4 colunas com margem e espaçamento de 16."),
    ),
    {
      id: "conta-da-grade",
      titulo: "Fazendo a conta da grade",
      instrucao: "O quadro tem 390 de largura, 4 colunas, margem de 16 em cada lado e espaçamento (gutter) de 16 entre colunas (3 espaços).",
      blocos: [{ tipo: "nota", variante: "dica", texto: "Largura de cada coluna = (largura do quadro − 2 margens − 3 espaços) ÷ 4." }],
      campos: [
        {
          id: "largura-coluna",
          rotulo: "Largura de cada coluna (em pixels)",
          placeholder: "Ex.: 77,5",
          regra: { tipo: "numero", esperado: 77.5, tolerancia: 0.1 },
          mensagemCerta: "Isso: (390 − 32 − 48) ÷ 4 = 77,5 pixels por coluna.",
          mensagemErrada: "Faça: 390 − 32 (margens) − 48 (3 espaços de 16) = 310; depois divida por 4.",
        },
      ],
      objetivo: "Entender que a grade é matemática simples: o Figma calcula, mas você precisa saber ler o resultado.",
    },
    resposta({
      id: "projeto-cartao-produto",
      titulo: "Mini-projeto: cartão de produto",
      cenario: "Monte, com Auto Layout, um cartão de loja: imagem (retângulo cinza), nome do produto, preço e botão \"Comprar\". O cartão deve usar espaçamento 8 ou 16, padding 16 e o botão Hug contents.",
      instrucao: "Descreva as decisões que você tomou: qual direção usou no cartão, quais valores de gap e padding escolheu e o que acontece quando o nome do produto ganha uma linha a mais.",
      rotulo: "Suas decisões de layout",
      placeholder: "O cartão usa Auto Layout vertical, com gap de... e padding de... Quando o nome cresce...",
      chave: /(gap|espa[çc]amento)[\s\S]*(padding|preenchimento)|(padding|preenchimento)[\s\S]*(gap|espa[çc]amento)/i,
      minPalavras: 25,
      minCaracteres: 140,
    }),
  ],
};

export default atividade;
