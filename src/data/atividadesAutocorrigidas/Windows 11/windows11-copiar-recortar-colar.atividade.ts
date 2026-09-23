import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const FONTE_KNOWN_FOLDERS = "https://support.microsoft.com/pt-br/windows/media/file-explorer-known-folders-png.png";
const FONTE_QUICK_ACCESS = "https://support.microsoft.com/pt-br/windows/media/quick-access-option-in-file-explorer.png";
const FONTE_CONTEXT_MENU = "https://support.microsoft.com/pt-br/windows/media/file-explorer-context-menu-png.png";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Copiar, Recortar e Colar Arquivos",
  introducao:
    "Aprenda a organizar arquivos no Explorador de Arquivos do Windows 11: criar pastas, copiar, recortar, renomear, excluir e desfazer ações, usando os atalhos Ctrl + C, Ctrl + X, Ctrl + V, Ctrl + Z e F2. O objetivo é sair sabendo criar uma estrutura de pastas e mover arquivos entre elas com segurança.",
  itens: [
    {
      id: "criar-pastas-arquivo",
      titulo: "Criar as pastas e o arquivo de texto",
      cenario:
        "Antes de praticar cópia e recorte, você precisa de um espaço de trabalho. Na Área de Trabalho, clique com o botão direito em um espaço vazio, escolha Novo → Pasta e digite AULA WINDOWS. Abra essa pasta e crie outra dentro dela chamada ARQUIVOS.",
      instrucao:
        "Dentro de AULA WINDOWS, clique com o botão direito em uma área vazia, escolha Novo → Documento de Texto, renomeie o arquivo para teste.txt, abra-o, escreva uma frase qualquer e salve.",
      imagem: {
        url: FONTE_KNOWN_FOLDERS,
        alt: "Captura real do Explorador de Arquivos do Windows 11",
        legenda: "Exemplo real do Explorador de Arquivos no Windows 11 (Microsoft Support).",
      },
      campos: [],
    },
    {
      id: "copiar-arquivo",
      titulo: "Copiar o arquivo (Ctrl + C)",
      instrucao:
        "Selecione teste.txt, pressione Ctrl + C (ou use Copiar no menu de contexto), abra a pasta ARQUIVOS e pressione Ctrl + V para colar.",
      imagem: {
        url: FONTE_CONTEXT_MENU,
        alt: "Menu de contexto real do Windows 11 com as opções copiar e recortar",
        legenda: "No menu de contexto aparecem os comandos recortar, copiar, renomear, compartilhar e excluir.",
      },
      campos: [
        {
          id: "win11-q1",
          rotulo: "O que acontece com o arquivo original depois de copiar (Ctrl + C) e colar em outro local?",
          regra: {
            tipo: "multipla_escolha",
            correta: 1,
            opcoes: [
              "Ele é apagado do local original e some.",
              "Ele continua no local original, e agora existe uma cópia também no novo local.",
              "Ele vira um atalho para o novo local.",
            ],
          },
          mensagemCerta: "Correto! Copiar duplica o arquivo — o original nunca é removido do lugar onde estava.",
          mensagemErrada: "Incorreto. Copiar cria uma duplicata: o arquivo original permanece intacto no local de origem.",
        },
      ],
    },
    {
      id: "recortar-mover-arquivo",
      titulo: "Recortar e mover o arquivo (Ctrl + X)",
      instrucao:
        "Volte para AULA WINDOWS, selecione teste.txt, pressione Ctrl + X (ou Recortar), abra a pasta ARQUIVOS e pressione Ctrl + V para colar.",
      imagem: {
        url: FONTE_QUICK_ACCESS,
        alt: "Explorador de Arquivos real do Windows 11 mostrando o Acesso Rápido",
        legenda: "Exemplo real do Acesso Rápido do Explorador de Arquivos no Windows 11.",
      },
      campos: [
        {
          id: "win11-q2",
          rotulo: "O que acontece com o arquivo original depois de recortar (Ctrl + X) e colar em outro local?",
          regra: {
            tipo: "multipla_escolha",
            correta: 0,
            opcoes: [
              "Ele deixa de existir no local original e passa a existir só no novo local.",
              "Ele continua duplicado nos dois locais.",
              "Nada muda até você reiniciar o computador.",
            ],
          },
          mensagemCerta: "Correto! Recortar move o arquivo — ele some do local original assim que você cola no destino.",
          mensagemErrada: "Incorreto. Recortar move (não duplica): o arquivo deixa de existir no local antigo depois de colado no novo.",
        },
      ],
    },
    {
      id: "renomear-arquivo",
      titulo: "Renomear um arquivo",
      instrucao:
        "Selecione o arquivo, pressione a tecla de atalho para renomear, digite o novo nome e pressione Enter para confirmar.",
      campos: [
        {
          id: "win11-q3",
          rotulo: "Qual tecla de atalho renomeia o arquivo selecionado no Explorador de Arquivos?",
          regra: {
            tipo: "selecao",
            esperado: "f2",
            opcoes: [
              { valor: "f2", texto: "F2" },
              { valor: "ctrlr", texto: "Ctrl + R" },
            ],
          },
          mensagemCerta: "Correto! F2 é o atalho padrão do Windows para renomear o item selecionado.",
          mensagemErrada: "Incorreto. O atalho para renomear é F2, não Ctrl + R.",
        },
      ],
    },
    {
      id: "excluir-restaurar",
      titulo: "Excluir e restaurar da Lixeira",
      instrucao:
        "Selecione um arquivo e pressione Delete para excluí-lo. Para recuperá-lo, abra a Lixeira, clique com o botão direito no arquivo e escolha Restaurar.",
      campos: [
        {
          id: "win11-q4",
          rotulo: "Ao pressionar Delete, o arquivo é apagado permanentemente do computador, sem chance de recuperação.",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro" },
              { valor: "F", texto: "Falso" },
            ],
          },
          mensagemCerta: "Correto! O arquivo vai para a Lixeira e pode ser restaurado até que ela seja esvaziada.",
          mensagemErrada: "Incorreto. Delete manda o arquivo para a Lixeira — ele só é apagado de vez quando a Lixeira é esvaziada.",
        },
      ],
    },
    {
      id: "desfazer-acao",
      titulo: "Desfazer uma ação (Ctrl + Z)",
      instrucao:
        "Errou uma exclusão, cópia ou renomeação? Pressione o atalho de desfazer para reverter a última ação no Explorador de Arquivos.",
      campos: [
        {
          id: "win11-q5",
          rotulo: "Qual atalho desfaz a última ação realizada no Explorador de Arquivos?",
          regra: {
            tipo: "selecao",
            esperado: "ctrlz",
            opcoes: [
              { valor: "ctrlz", texto: "Ctrl + Z" },
              { valor: "ctrly", texto: "Ctrl + Y" },
            ],
          },
          mensagemCerta: "Correto! Ctrl + Z desfaz a última ação — funciona para exclusão, cópia, recorte e renomeação.",
          mensagemErrada: "Incorreto. Ctrl + Z desfaz; Ctrl + Y é usado para refazer em outros programas, não para desfazer.",
        },
      ],
    },
    {
      id: "mapa-atalhos",
      titulo: "Mapa de atalhos",
      instrucao:
        "Resumo dos atalhos praticados: Ctrl + C copia, Ctrl + X recorta, Ctrl + V cola, F2 renomeia, Delete exclui (para a Lixeira) e Ctrl + Z desfaz a última ação.",
      campos: [],
    },
    {
      id: "pergunta-final",
      titulo: "Pergunta rápida",
      instrucao: "Qual opção mantém o arquivo original no local de origem?",
      campos: [
        {
          id: "win11-final",
          regra: {
            tipo: "multipla_escolha",
            correta: 1,
            opcoes: ["Ctrl + X", "Ctrl + C", "Ctrl + V"],
          },
          mensagemCerta: "Correto! Ctrl + C copia o arquivo, mantendo o original no local de origem.",
          mensagemErrada: "Incorreto. Pense na diferença entre copiar (duplicar) e recortar (mover).",
        },
      ],
    },
  ],
  fonte: {
    texto:
      "As capturas de tela usadas nesta atividade são do Microsoft Support e mostram elementos reais do Explorador de Arquivos do Windows 11. Elas são carregadas diretamente do site da Microsoft, por isso é necessária conexão com a internet para aparecerem.",
    url: "https://support.microsoft.com/pt-br/windows/experience/fileexplorer/file-explorer-in-windows",
  },
};

export default atividade;
