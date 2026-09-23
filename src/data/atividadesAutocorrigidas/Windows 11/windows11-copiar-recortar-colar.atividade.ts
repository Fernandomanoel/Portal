import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const IMAGEM_PASTAS = "https://support.microsoft.com/pt-br/windows/media/file-explorer-known-folders-png.png";
const IMAGEM_ACESSO_RAPIDO = "https://support.microsoft.com/pt-br/windows/media/quick-access-option-in-file-explorer.png";
const IMAGEM_MENU_CONTEXTO = "https://support.microsoft.com/pt-br/windows/media/file-explorer-context-menu-png.png";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Copiar, Recortar e Colar Arquivos",
  introducao:
    "Aprenda a organizar arquivos usando o Explorador de Arquivos e os atalhos Ctrl + C, Ctrl + X e Ctrl + V. Ao terminar, você deverá conseguir criar pastas, criar um arquivo de texto e mover ou duplicar esse arquivo entre pastas. Regra para lembrar: copiar faz uma duplicata; recortar muda o arquivo de lugar.",
  itens: [
    {
      id: "criar-pastas",
      titulo: "Criar as pastas",
      passos: [
        "Vá até a Área de Trabalho.",
        "Clique com o botão direito em um espaço vazio.",
        "Escolha Novo → Pasta.",
        "Digite AULA WINDOWS e pressione Enter.",
        "Abra a pasta AULA WINDOWS e crie outra pasta chamada ARQUIVOS.",
      ],
      imagem: {
        url: IMAGEM_PASTAS,
        alt: "Captura real do Explorador de Arquivos do Windows 11 mostrando pastas",
        legenda: "A interface pode variar um pouco conforme a versão e a configuração do Windows 11.",
      },
      objetivo: "Preparar o espaço de trabalho da atividade.",
    },
    {
      id: "criar-arquivo",
      titulo: "Criar um arquivo",
      passos: [
        "Abra a pasta AULA WINDOWS.",
        "Clique com o botão direito em uma área vazia.",
        "Selecione Novo → Documento de Texto.",
        "Renomeie o arquivo para teste.txt.",
        "Abra o arquivo e escreva: \"Atividade de Windows 11\". Salve e feche.",
      ],
      imagem: {
        url: IMAGEM_ACESSO_RAPIDO,
        alt: "Captura real do Acesso Rápido do Explorador de Arquivos",
        legenda: "Exemplo real do Acesso Rápido e do menu de contexto no Windows 11.",
      },
      objetivo: "Criar um arquivo simples dentro da pasta.",
    },
    {
      id: "copiar-arquivo",
      titulo: "Copiar o arquivo",
      passos: [
        "Selecione o arquivo teste.txt.",
        "Pressione Ctrl + C ou use Copiar no menu de contexto.",
        "Abra a pasta ARQUIVOS.",
        "Pressione Ctrl + V ou use Colar.",
      ],
      imagem: {
        url: IMAGEM_MENU_CONTEXTO,
        alt: "Menu de contexto real do Windows 11 com copiar e recortar",
        legenda: "No menu de contexto aparecem os comandos de recortar, copiar, renomear, compartilhar e excluir.",
      },
      objetivo: "Manter o original e criar uma cópia — depois de copiar, o arquivo original continua no local antigo.",
    },
    {
      id: "recortar-mover-arquivo",
      titulo: "Recortar e mover o arquivo",
      passos: [
        "Volte para a pasta AULA WINDOWS.",
        "Selecione teste.txt.",
        "Pressione Ctrl + X ou escolha Recortar.",
        "Abra a pasta ARQUIVOS.",
        "Pressione Ctrl + V para colar.",
      ],
      imagem: {
        url: IMAGEM_ACESSO_RAPIDO,
        alt: "Explorador de Arquivos real do Windows 11",
        legenda: "Recortar, navegar até o novo local e Colar: o arquivo muda de lugar.",
      },
      objetivo: "Perceber a diferença: recortar + colar move o arquivo para outro local.",
    },
    {
      id: "renomear-arquivo",
      titulo: "Renomear um arquivo",
      passos: [
        "Abra a pasta ARQUIVOS e selecione teste.txt.",
        "Pressione F2 (ou clique com o botão direito → Renomear).",
        "Digite o novo nome: atividade-concluida.txt.",
        "Pressione Enter para confirmar.",
      ],
      objetivo: "Renomear arquivos rapidamente pelo teclado.",
    },
    {
      id: "excluir-restaurar",
      titulo: "Excluir e restaurar da Lixeira",
      passos: [
        "Selecione o arquivo atividade-concluida.txt e pressione Delete.",
        "Abra a Lixeira pela área de trabalho.",
        "Clique com o botão direito no arquivo e escolha Restaurar.",
        "Volte à pasta ARQUIVOS e confira que o arquivo voltou.",
      ],
      objetivo: "Entender que Delete envia o arquivo para a Lixeira, de onde ele pode ser recuperado.",
    },
    {
      id: "desfazer-acao",
      titulo: "Desfazer uma ação",
      passos: [
        "Renomeie o arquivo para qualquer outro nome.",
        "Pressione Ctrl + Z e veja o nome anterior voltar.",
        "Recorte o arquivo para a pasta AULA WINDOWS e pressione Ctrl + Z para desfazer a mudança.",
      ],
      objetivo: "Usar Ctrl + Z para corrigir um engano no Explorador de Arquivos.",
    },
    {
      id: "atalhos-teclado",
      titulo: "Atalhos do teclado",
      passos: [
        "Selecione um arquivo e teste Ctrl + C para copiar.",
        "Teste Ctrl + X para recortar.",
        "Use Ctrl + V para colar.",
        "Use F2 para renomear e Ctrl + Z para desfazer.",
      ],
      objetivo:
        "Ctrl + C copia (cria uma cópia), Ctrl + X recorta (prepara para mover), Ctrl + V cola no novo local, F2 renomeia e Ctrl + Z desfaz.",
    },
    {
      id: "desafio-final",
      titulo: "Desafio final",
      instrucao: "Confira se você realizou cada etapa no computador:",
      passos: [
        "Criei a pasta AULA WINDOWS.",
        "Criei a pasta ARQUIVOS.",
        "Criei o arquivo teste.txt.",
        "Copiei o arquivo usando Ctrl + C.",
        "Recortei o arquivo usando Ctrl + X.",
        "Colei o arquivo usando Ctrl + V.",
      ],
    },
    {
      id: "pergunta-rapida",
      titulo: "Pergunta rápida",
      instrucao: "Qual opção mantém o arquivo original no local de origem?",
      campos: [
        {
          id: "win11-pergunta",
          regra: {
            tipo: "multipla_escolha",
            correta: 1,
            opcoes: ["Ctrl + X", "Ctrl + C", "Ctrl + V"],
          },
          mensagemCerta: "Correto! Ctrl + C copia o arquivo, mantendo o original no local de origem.",
          mensagemErrada: "Ainda não. Pense na diferença entre copiar (duplicar) e recortar (mover).",
        },
      ],
    },
  ],
  fonte: {
    texto:
      "As capturas de tela desta atividade são do Microsoft Support e mostram elementos reais do Explorador de Arquivos do Windows 11. Elas são carregadas do site da Microsoft, por isso precisam de conexão com a internet para aparecer.",
    url: "https://support.microsoft.com/pt-br/windows/experience/fileexplorer/file-explorer-in-windows",
  },
};

export default atividade;
