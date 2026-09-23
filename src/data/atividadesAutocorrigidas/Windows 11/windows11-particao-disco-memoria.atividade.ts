import imagemDiminuir from "@/assets/atividades/windows-11/diminuir-volume.svg";
import imagemExcluirVolume from "@/assets/atividades/windows-11/excluir-volume-estender.svg";
import imagemGerenciamento from "@/assets/atividades/windows-11/gerenciamento-de-disco.svg";
import imagemMemoria from "@/assets/atividades/windows-11/memoria-ram-virtual.svg";
import imagemNovoVolume from "@/assets/atividades/windows-11/novo-volume-simples.svg";
import imagemUnidade from "@/assets/atividades/windows-11/unidade-teste-z.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Partição de Disco e Memória",
  introducao:
    "Objetivo geral: criar e apagar uma partição de disco pequena e segura, e entender a diferença entre memória RAM e memória virtual. Esta é a atividade mais \"por baixo do capô\" do curso — mexe com o sistema, não só com aplicativos.",
  regras: {
    titulo: "Regras de segurança desta atividade — leia antes de começar",
    itens: [
      "A partição criada aqui deve ter no máximo 1 GB (1024 MB). Nunca reduza mais que isso.",
      "No final da atividade, é obrigatório apagar a partição e devolver o espaço — principalmente em computadores do laboratório.",
      "Se aparecer qualquer mensagem que você não entender, pare e chame o professor antes de clicar em \"OK\" ou \"Confirmar\".",
    ],
  },
  itens: [
    {
      id: "gerenciamento-de-disco",
      titulo: "Abrindo o Gerenciamento de Disco",
      passos: [
        "Pressione Windows + X e clique em \"Gerenciamento de Disco\" (ou pesquise pelo nome no Menu Iniciar).",
        "Identifique o disco principal (geralmente \"Disco 0\") e as partições existentes, como a \"Partição de Sistema EFI\" e a unidade C:.",
        "Anote em um arquivo de texto o espaço total da unidade C: (se preferir, veja em Propriedades pelo Explorador de Arquivos).",
      ],
      imagem: {
        url: imagemGerenciamento,
        alt: "Janela Gerenciamento de Disco com a lista de volumes e o Disco 0 dividido em EFI, C: e Recuperação",
        legenda: "Windows + X → Gerenciamento de Disco: lista de volumes em cima, mapa do disco embaixo.",
      },
      objetivo:
        "Reconhecer a ferramenta e o vocabulário — disco, partição, unidade — antes de mexer em qualquer coisa.",
    },
    {
      id: "criando-particao",
      titulo: "Criando uma Partição de Até 1 GB",
      passos: [
        "Clique com o botão direito na unidade C: e escolha \"Diminuir Volume\".",
        "No campo \"Digite o espaço a ser diminuído em MB\", digite 1024 (1 GB) — nunca mais que isso.",
        "Clique em \"Diminuir\" e aguarde terminar.",
        "Um bloco preto com o rótulo \"Não alocado\" deve aparecer ao lado da partição C:.",
      ],
      imagem: {
        url: imagemDiminuir,
        alt: "Janela Diminuir C: com 1024 digitado no espaço a ser diminuído e o bloco Não alocado de 1 GB no mapa do disco",
        legenda: "Digite 1024 MB e clique em Diminuir: surge 1 GB Não alocado.",
      },
      aviso:
        "se o Windows sugerir um valor máximo menor que 1024 MB, use o valor sugerido — nunca digite um número maior do que ele permite.",
    },
    {
      id: "formatando-particao",
      titulo: "Formatando a Nova Partição",
      passos: [
        "Clique com o botão direito no espaço \"Não alocado\" e escolha \"Novo Volume Simples\".",
        "Siga o assistente aceitando o tamanho máximo sugerido (ele já respeita o limite de 1 GB).",
        "Escolha uma letra de unidade, por exemplo Z:.",
        "Formate como NTFS e dê um rótulo, como \"TESTE\". Finalize o assistente.",
      ],
      imagem: {
        url: imagemNovoVolume,
        alt: "Menu do botão direito no espaço Não alocado com a opção Novo Volume Simples em destaque",
        legenda: "Botão direito em Não alocado → Novo Volume Simples.",
      },
      objetivo:
        "Entender que uma partição \"crua\" (não alocada) precisa ser formatada antes de guardar qualquer arquivo.",
    },
    {
      id: "usando-unidade",
      titulo: "Usando a Nova Unidade",
      passos: [
        "Abra o Explorador de Arquivos e confirme que \"TESTE (Z:)\" aparece em \"Este Computador\".",
        "Crie uma pasta e um arquivo de texto dentro dela.",
        "Clique com o botão direito na unidade → Propriedades e observe o espaço total (deve ser igual ou menor que 1 GB) e o espaço já usado.",
      ],
      imagem: {
        url: imagemUnidade,
        alt: "Este Computador mostrando Disco Local C: e a nova unidade TESTE Z: com 1 GB",
        legenda: "A nova unidade TESTE (Z:) aparece junto com o Disco Local (C:).",
      },
      desafio:
        "tente copiar um arquivo maior que 1 GB para a unidade Z: e veja o que o Windows faz. Dica: ele vai recusar, porque não cabe — é a prova de que o limite é real.",
    },
    {
      id: "desfazendo-particao",
      titulo: "Desfazendo a Partição (Etapa Obrigatória)",
      passos: [
        "Volte ao Gerenciamento de Disco.",
        "Clique com o botão direito na partição \"TESTE (Z:)\" → \"Excluir Volume\". Confirme o aviso de que os dados serão perdidos.",
        "O espaço volta a ficar \"Não alocado\".",
        "Clique com o botão direito na partição C: → \"Estender Volume\" e siga o assistente aceitando o tamanho máximo sugerido — isso devolve o espaço para C:.",
        "Confirme que só resta a partição C:, do mesmo jeito que no início da atividade.",
      ],
      imagem: {
        url: imagemExcluirVolume,
        alt: "Menu do botão direito na partição TESTE Z: com a opção Excluir Volume em destaque",
        legenda: "Primeiro Excluir Volume em TESTE (Z:), depois Estender Volume em C:.",
      },
      aviso:
        "esta etapa não é opcional. Deixar uma partição extra para trás em um computador compartilhado atrapalha a próxima pessoa que for usá-lo.",
    },
    {
      id: "memoria-ram-virtual",
      titulo: "Gerenciamento de Memória (RAM e Memória Virtual)",
      passos: [
        "Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc) → \"Desempenho\" → \"Memória\". Anote quanta RAM está instalada e quanto está em uso agora.",
        "Pesquise \"Exibir configurações avançadas do sistema\" no Menu Iniciar → aba \"Avançado\" → em \"Desempenho\", clique em \"Configurações\" → aba \"Avançado\" → em \"Memória virtual\", clique em \"Alterar\".",
        "Observe o \"Tamanho alocado atualmente\" do arquivo de paginação — é o espaço em disco que o Windows usa como \"RAM extra\" quando a memória física enche.",
        "Clique em \"Cancelar\" para sair sem alterar nada.",
      ],
      imagem: {
        url: imagemMemoria,
        alt: "Gerenciador de Tarefas mostrando a memória em uso e a janela Memória Virtual com o tamanho alocado atualmente",
        legenda: "RAM no Gerenciador de Tarefas; memória virtual (arquivo de paginação) nas configurações avançadas.",
      },
      aviso:
        "não desmarque a opção \"Gerenciar automaticamente o tamanho do arquivo de paginação de todas as unidades\". Esta etapa é só de observação.",
    },
  ],
};

export default atividade;
