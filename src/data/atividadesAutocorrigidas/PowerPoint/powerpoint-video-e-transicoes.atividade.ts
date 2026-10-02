import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerpoint-video-e-transicoes.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Vídeo, Edição e Transições",
  introducao: "Avaliação Prática de PowerPoint",
  itens: [
    {
      id: "apresentacao",
      titulo: "Apresentação",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "O desafio:",
        },
        {
          tipo: "lista",
          itens: [
            "Tema livre — use o vídeo de prática ou um seu",
            "Inserir um vídeo em pelo menos 1 slide",
            "Aplicar recursos de edição de vídeo",
            "Aplicar efeitos de transição entre os slides",
          ],
        },
      ],
    },
    {
      id: "objetivo-deixando-a-apresentacao-dinamica",
      titulo: "Objetivo — Deixando a apresentação dinâmica",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "Criar uma apresentação (tema livre) que tenha um VÍDEO inserido em um slide, com recursos de EDIÇÃO aplicados e TRANSIÇÕES entre os slides.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Sobre o vídeo",
          texto: "Você pode usar o vídeo de prática fornecido nesta atividade (uma tartaruga mexendo em um computador) ou gravar/baixar um vídeo próprio, curto (até 1 minuto).",
        },
      ],
    },
    {
      id: "video-de-pratica-baixe-e-use-na-sua-apresentacao",
      titulo: "Vídeo de Prática — Baixe e use na sua apresentação",
      blocos: [
        {
          tipo: "texto",
          texto: "O vídeo de prática está nos materiais do curso de PowerPoint: \"Vídeo de prática — tartaruga no computador\". Baixe e insira no slide.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Depois de baixar, salve o arquivo em uma pasta do seu computador — você vai precisar do caminho dele para inserir no PowerPoint.",
        },
      ],
    },
    {
      id: "passo-a-passo-inserindo-o-video-colocando-o-vide",
      titulo: "Passo a Passo: Inserindo o Vídeo — Colocando o vídeo dentro de um slide",
      blocos: [
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Selecione o slide onde o vídeo vai aparecer.",
            "Vá em Inserir → Vídeo → Este Dispositivo.",
            "Selecione o arquivo de vídeo que você baixou (ou o seu próprio).",
            "Arraste as bordas do vídeo no slide para ajustar o tamanho.",
          ],
        },
      ],
    },
    {
      id: "editando-o-video-recursos-da-aba-reproducao",
      titulo: "Editando o Vídeo — Recursos da aba \"Reprodução\"",
      blocos: [
        {
          tipo: "texto",
          texto: "Clique no vídeo para abrir a aba Reprodução (ou \"Reproduzir\") na faixa de opções.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Cortar Vídeo",
          texto: "Corta o início e/ou o fim do vídeo, sem precisar de outro programa. Arraste as marcações vermelha (início) e verde (fim).",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Opções de Início",
          texto: "Escolha se o vídeo toca Automaticamente ao entrar no slide, ou só Ao Clicar.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Esmaecer (Fade)",
          texto: "Defina uma Duração do Fade de entrada e saída, para o vídeo começar/terminar suavemente.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Quadro Cartaz",
          texto: "Escolha uma imagem de capa do vídeo (o quadro que aparece antes de tocar).",
        },
      ],
    },
    {
      id: "passo-a-passo-transicoes-o-efeito-ao-trocar-de-s",
      titulo: "Passo a Passo: Transições — O efeito ao trocar de slide",
      blocos: [
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Clique no slide desejado e vá na aba Transições.",
            "Escolha um efeito na galeria (ex: Desvanecer, Empurrar, Revelar).",
            "Ajuste a Duração do efeito (geralmente entre 0.5s e 1.5s fica bom).",
            "Clique em Aplicar a Tudo para usar a mesma transição em todos os slides.",
          ],
        },
      ],
    },
    {
      id: "use-com-moderacao-transicao-demais-tambem-e-prob",
      titulo: "Use com Moderação — Transição demais também é problema",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Evite misturar muitos efeitos diferentes",
          texto: "Usar uma transição diferente e chamativa em cada slide distrai quem está assistindo. O ideal é escolher 1 ou 2 tipos de transição e manter a apresentação inteira consistente.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Combinação profissional",
          texto: "Uma transição sutil, como Desvanecer, combinada com uma duração curta (0.5s a 1s), costuma funcionar bem em qualquer tipo de apresentação.",
        },
      ],
    },
    {
      id: "checklist-antes-de-entregar",
      titulo: "Checklist Antes de Entregar",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "☐ Vídeo inserido em pelo menos 1 slide",
            "☐ Vídeo cortado ou com opção de início configurada",
            "☐ Fade de entrada/saída aplicado ao vídeo",
            "☐ Transição aplicada entre os slides",
            "☐ Mesma transição usada em toda a apresentação",
          ],
        },
        {
          tipo: "texto",
          texto: "Bom trabalho, diretor(a)!",
        },
      ],
    },
  ],
};

export default atividade;

