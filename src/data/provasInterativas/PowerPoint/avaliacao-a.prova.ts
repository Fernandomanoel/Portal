import type { ProvaInterativa } from "@/types/quiz";

/**
 * PowerPoint — Avaliação A (prática, nível completo): o aluno escolhe o tema
 * da apresentação e usa os recursos do programa: design, WordArt, imagem,
 * tabela, gráfico ou SmartArt, animações, transições e hiperlinks. O
 * professor corrige pelo arquivo enviado. Prova escrita para o portal.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "PowerPoint — Avaliação A: Apresentação com Tema Livre",
  instrucoes: [
    "Situação: você vai criar uma apresentação de pelo menos 8 slides sobre um tema livre, de que você goste e conheça (um esporte, uma banda, um país, um animal, uma profissão, uma receita, um jogo). A prova vale 10 pontos: o que conta é usar bem os recursos do PowerPoint, com o conteúdo organizado e bonito. Pode pesquisar na internet, mas escreva os textos com as suas palavras. Pode usar outras abas e programas.",
    "Passo 1 (Planejar o tema · 0,5 ponto): Antes de abrir o PowerPoint, escolha o tema e anote num papel ou num bloco de notas: o título, 3 cores que combinam e o que vai em cada slide. Use o quadro abaixo como roteiro (os temas e os textos são livres).",
    "Passo 2 (Design e slide mestre · 1,5 ponto): Aplique um tema da aba Design e escolha uma variante de cores e fontes que combine com o seu assunto. No Slide Mestre (Exibir → Slide Mestre), coloque um pequeno elemento fixo (uma imagem, uma forma ou o nome do tema) e o número do slide, para aparecerem em todos os slides. Os textos devem ter bom contraste com o fundo.",
    "Passo 3 (Capa com WordArt · 1,0 ponto): No slide 1, escreva o título do tema em WordArt (Inserir → WordArt) e formate o preenchimento, o contorno ou o efeito. Abaixo, coloque o seu nome e a turma em um subtítulo.",
    "Passo 4 (Imagens · 1,0 ponto): Insira pelo menos 2 imagens relacionadas ao tema em slides diferentes. Use Formato da Imagem para cortar, aplicar um estilo ou uma borda, e preencha o texto alternativo (clique com o botão direito → Exibir Texto Alternativo). As imagens não podem ficar esticadas.",
    "Passo 5 (Tabela · 1,5 ponto): Crie um slide com uma tabela de no mínimo 3 colunas e 4 linhas (Inserir → Tabela) com dados do seu tema (por exemplo: nome, característica, curiosidade). Aplique um estilo de tabela com a linha de cabeçalho em destaque e alinhe o texto.",
    "Passo 6 (Gráfico ou SmartArt · 1,0 ponto): Crie um slide com um gráfico (Inserir → Gráfico) com dados do seu tema, ou com um SmartArt de processo, ciclo ou hierarquia (Inserir → SmartArt). Dê um título claro ao slide e deixe as informações legíveis.",
    "Passo 7 (Animações · 1,5 ponto): Anime pelo menos 3 elementos de slides diferentes, com efeitos diferentes: ao menos uma entrada, uma ênfase e uma saída. Abra o Painel de Animação e organize a ordem. Evite exagero: a animação deve ajudar a contar o assunto, não atrapalhar.",
    "Passo 8 (Transições · 0,5 ponto): Aplique uma transição a todos os slides (aba Transições). Ajuste a duração para que seja suave. Pode usar a mesma transição em todos ou combinar poucas.",
    "Passo 9 (Hiperlinks e botões · 0,5 ponto): Insira um hiperlink para um site que você usou na pesquisa (Inserir → Link) e um botão de ação no último slide, que volte ao primeiro slide (Inserir → Formas → Botões de Ação).",
    "Passo 10 (Revisão e entrega · 1,0 ponto): Rode a verificação de ortografia (Revisão), ensaie a apresentação (Apresentação de Slides → Do Início) e confira se tudo funciona. Salve o arquivo como Apresentacao_SeuNome.pptx e envie no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Roteiro sugerido do Passo 1 — o tema e os textos são livres",
    colunas: ["Slide", "O que vai nele", "Recurso a usar"],
    linhas: [
      ["1", "Capa com o título do tema, seu nome e turma", "WordArt"],
      ["2", "Introdução: o que é o tema e por que você escolheu", "Texto com marcadores"],
      ["3", "Imagem principal do tema", "Imagem formatada"],
      ["4", "Dados do tema em linhas e colunas", "Tabela"],
      ["5", "Os mesmos dados (ou um processo) de forma visual", "Gráfico ou SmartArt"],
      ["6", "Curiosidades", "Animações"],
      ["7", "Segunda imagem e fontes pesquisadas", "Imagem e hiperlink"],
      ["8", "Encerramento", "Botão de ação para voltar ao início"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".pptx"],
    rotulo: "Envie a apresentação (Apresentacao_SeuNome.pptx)",
  },
};

export default prova;
