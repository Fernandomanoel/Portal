import imagemBarraDeTarefas from "@/assets/atividades/windows-11/barra-de-tarefas-comportamentos.svg";
import imagemCores from "@/assets/atividades/windows-11/cores-destaque.svg";
import imagemPlanoDeFundo from "@/assets/atividades/windows-11/plano-de-fundo-slides.svg";
import imagemPonteiro from "@/assets/atividades/windows-11/ponteiro-do-mouse.svg";
import imagemTema from "@/assets/atividades/windows-11/salvar-tema.svg";
import imagemSons from "@/assets/atividades/windows-11/sons-do-sistema.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Personalização Avançada",
  introducao:
    "Objetivo geral: ir além do plano de fundo e explorar tudo o que dá para personalizar no Windows 11 — ponteiro do mouse, cores, apresentação de slides, temas, sons e o comportamento da barra de tarefas.",
  itens: [
    {
      id: "cursor-do-mouse",
      titulo: "Personalizando o Cursor do Mouse",
      passos: [
        "Abra as Configurações (tecla Windows + I) → Acessibilidade → Ponteiro do mouse e toque.",
        "Troque o estilo do ponteiro (branco, preto, invertido ou personalizado) e escolha uma cor personalizada vibrante para ele.",
        "Aumente o tamanho do ponteiro até o máximo, observe a diferença e depois deixe em um tamanho confortável.",
      ],
      imagem: {
        url: imagemPonteiro,
        alt: "Configurações do Windows 11 em Acessibilidade, Ponteiro do mouse e toque, com o estilo personalizado em destaque",
        legenda: "Acessibilidade → Ponteiro do mouse e toque: estilo, cor e tamanho.",
      },
      desafio:
        "em Acessibilidade → Cursor de texto, ative o \"Indicador do cursor de texto\" e mude a espessura dele. Abra o Bloco de Notas e veja a diferença ao digitar.",
      objetivo:
        "Descobrir que o ponteiro do mouse também é personalizável — e que isso é, na verdade, um recurso de acessibilidade.",
    },
    {
      id: "cores-de-destaque",
      titulo: "Cores de Destaque e Modo de Cores",
      passos: [
        "Vá em Configurações → Personalização → Cores.",
        "Em \"Escolher seu modo\", selecione \"Personalizado\" e defina um modo diferente para o Windows e para os aplicativos (ex.: Windows escuro, aplicativos claros).",
        "Em \"Cor de destaque\", escolha \"Automático\" e ative \"Mostrar cor de destaque no Iniciar e na barra de tarefas\" — o Windows escolhe uma cor que combina com o seu plano de fundo.",
        "Depois, troque para \"Manual\" e escolha você mesmo uma cor de destaque diferente. Observe onde ela aparece (bordas de janela, botões, links).",
      ],
      imagem: {
        url: imagemCores,
        alt: "Configurações do Windows 11 em Personalização, Cores, com o modo Personalizado e a cor de destaque automática",
        legenda: "Personalização → Cores: modo do Windows, modo dos aplicativos e cor de destaque.",
      },
      objetivo:
        "Entender a diferença entre uma cor escolhida automaticamente (combinando com a imagem) e uma escolhida manualmente.",
    },
    {
      id: "plano-de-fundo-slides",
      titulo: "Plano de Fundo em Apresentação de Slides",
      passos: [
        "Crie uma pasta \"Meus Papéis de Parede\" dentro de Imagens e salve nela pelo menos 3 imagens diferentes (pode usar capturas de tela com Windows + Shift + S).",
        "Vá em Configurações → Personalização → Plano de fundo e escolha \"Apresentação de slides\".",
        "Aponte para a pasta que você criou e configure o intervalo de troca para 1 minuto.",
        "Ative também \"Embaralhar a ordem das imagens\" e espere a primeira troca acontecer.",
      ],
      imagem: {
        url: imagemPlanoDeFundo,
        alt: "Configurações do Windows 11 em Personalização, Plano de fundo, com Apresentação de slides, 1 minuto e embaralhar ativado",
        legenda: "Plano de fundo → Apresentação de slides, trocando a cada 1 minuto.",
      },
      objetivo: "Automatizar a personalização em vez de trocar a imagem manualmente toda vez.",
    },
    {
      id: "salvando-tema",
      titulo: "Salvando um Tema Completo",
      passos: [
        "Vá em Configurações → Personalização → Tela de bloqueio e escolha uma imagem diferente da sua área de trabalho.",
        "Volte para Personalização → Temas e clique em \"Salvar\". Dê ao tema um nome com o seu nome (ex.: \"Tema Ana\").",
        "Troque temporariamente para um tema pronto do Windows.",
        "Volte para o seu tema salvo e confirme que tudo — cores, plano de fundo, tela de bloqueio — voltou como você configurou.",
      ],
      imagem: {
        url: imagemTema,
        alt: "Configurações do Windows 11 em Personalização, Temas, com o botão Salvar e a janela Salvar tema com o nome Tema Ana",
        legenda: "Personalização → Temas → Salvar: o tema guarda todas as suas escolhas.",
      },
      objetivo:
        "Entender que um \"tema\" é um pacote que guarda várias personalizações juntas, prontas para reaplicar.",
    },
    {
      id: "sons-do-sistema",
      titulo: "Sons do Sistema",
      passos: [
        "Pesquise \"Alterar sons do sistema\" no Menu Iniciar e abra a janela Som.",
        "Na lista de \"Eventos de programa\", escolha \"Notificação\" e troque o som por um diferente do padrão (use o botão \"Testar\" para ouvir antes de escolher).",
        "Faça o mesmo para o evento \"Parada crítica\".",
        "Clique em \"Salvar como...\" e crie um novo esquema de sons com o seu nome.",
      ],
      imagem: {
        url: imagemSons,
        alt: "Janela Som na aba Sons, com o evento Notificação selecionado e os botões Testar e Salvar como em destaque",
        legenda: "Janela Som → aba Sons: escolha o evento, troque o som e teste.",
      },
      objetivo:
        "Descobrir que os sons também fazem parte da personalização — e que é possível trocar cada evento individualmente.",
    },
    {
      id: "barra-de-tarefas",
      titulo: "Comportamento da Barra de Tarefas",
      passos: [
        "Vá em Configurações → Personalização → Barra de tarefas → Comportamentos da barra de tarefas.",
        "Troque o alinhamento dos ícones de \"Centralizar\" para \"Esquerda\" (o visual clássico do Windows 10).",
        "Ative \"Ocultar automaticamente a barra de tarefas\". Teste: afaste o mouse da barra (ela some) e depois leve-o até a borda de baixo da tela (ela reaparece).",
        "Ao final, decida se prefere deixar essa opção ativada ou desativada e volte o alinhamento para o que você preferir.",
      ],
      imagem: {
        url: imagemBarraDeTarefas,
        alt: "Configurações do Windows 11 em Personalização, Barra de tarefas, com alinhamento à esquerda e ocultar automaticamente marcado",
        legenda: "Comportamentos da barra de tarefas: alinhamento e ocultar automaticamente.",
      },
      desafio:
        "em Barra de tarefas → \"Outros ícones da bandeja do sistema\", esconda um ícone que você nunca usa e mostre um que estava escondido.",
      objetivo:
        "Perceber que até o comportamento da barra de tarefas — não só a aparência — pode ser ajustado.",
    },
  ],
};

export default atividade;
