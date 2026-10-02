import type { ProvaInterativa } from "@/types/quiz";

/**
 * PowerPoint — Avaliação B (prática, nível simples): uma apresentação curta
 * "Sobre mim", só com capa, texto com marcadores, imagem, tema de design e
 * transição. O professor corrige pelo arquivo enviado. Prova escrita para o
 * portal.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "PowerPoint — Avaliação B: Apresentação Simples “Sobre Mim”",
  instrucoes: [
    "Situação: você vai criar uma apresentação curta de 4 slides para se apresentar à turma. Pode escrever coisas reais ou inventadas, o importante é praticar o PowerPoint. A prova vale 10 pontos e pode ser feita em outras abas e programas.",
    "Passo 1 (Capa · 2,0 pontos): Abra o PowerPoint e crie uma apresentação em branco. No slide 1, escreva o título \"Sobre mim\" e, no subtítulo, o seu nome completo.",
    "Passo 2 (Texto com marcadores · 2,0 pontos): Adicione o slide 2 (Página Inicial → Novo Slide) com o título \"Meus gostos\" e uma lista com pelo menos 3 itens (comida, música, esporte, filme…). Cada item deve ter uma frase curta.",
    "Passo 3 (Imagem · 2,0 pontos): Adicione o slide 3 com o título \"Minha imagem favorita\" e insira uma imagem (Inserir → Imagens). Diminua ou aumente puxando pelo canto para não ficar esticada, e coloque-a no centro do slide.",
    "Passo 4 (Tema de design · 1,5 ponto): Na aba Design, escolha um tema que combine com a sua apresentação. Todos os slides devem ficar com o mesmo tema, e o texto precisa estar fácil de ler.",
    "Passo 5 (Slide de encerramento e transição · 1,5 ponto): Adicione o slide 4 com o título \"Obrigado(a)!\" e uma frase de despedida. Depois, na aba Transições, escolha uma transição e clique em Aplicar a Todos.",
    "Passo 6 (Salvar e enviar · 1,0 ponto): Salve o arquivo (Ctrl + S) como Sobre_Mim_SeuNome.pptx e envie no campo abaixo.",
  ],
  exemploTabela: {
    rotulo: "Como ficam os 4 slides — os textos são livres",
    colunas: ["Slide", "Título", "O que vai nele"],
    linhas: [
      ["1", "Sobre mim", "Seu nome completo no subtítulo"],
      ["2", "Meus gostos", "Lista com 3 itens ou mais"],
      ["3", "Minha imagem favorita", "Uma imagem no centro"],
      ["4", "Obrigado(a)!", "Uma frase de despedida"],
    ],
  },
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".pptx"],
    rotulo: "Envie a apresentação (Sobre_Mim_SeuNome.pptx)",
  },
};

export default prova;
