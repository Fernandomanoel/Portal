import imagemNovaPasta from "@/assets/atividades/windows-11/area-de-trabalho-nova-pasta.svg";
import imagemAtalhos from "@/assets/atividades/windows-11/atalhos-do-teclado.svg";
import imagemCopiar from "@/assets/atividades/windows-11/copiar-arquivo.svg";
import imagemDesfazer from "@/assets/atividades/windows-11/desfazer-ctrl-z.svg";
import imagemLixeira from "@/assets/atividades/windows-11/lixeira-restaurar.svg";
import imagemNovoDocumento from "@/assets/atividades/windows-11/novo-documento-de-texto.svg";
import imagemRecortar from "@/assets/atividades/windows-11/recortar-e-colar.svg";
import imagemRenomear from "@/assets/atividades/windows-11/renomear-arquivo.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

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
        url: imagemNovaPasta,
        alt: "Área de trabalho do Windows 11 com o menu do botão direito aberto em Novo, Pasta e a pasta AULA WINDOWS sendo nomeada",
        legenda: "Botão direito na área de trabalho → Novo → Pasta.",
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
        url: imagemNovoDocumento,
        alt: "Pasta AULA WINDOWS aberta no Explorador com o menu Novo, Documento de Texto e o arquivo teste.txt sendo nomeado",
        legenda: "Botão direito em uma área vazia da pasta → Novo → Documento de Texto.",
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
        url: imagemCopiar,
        alt: "Arquivo teste.txt selecionado com o menu do botão direito e a opção Copiar em destaque",
        legenda: "Copiar (Ctrl + C) no menu do botão direito ou na barra de comandos.",
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
        url: imagemRecortar,
        alt: "Pasta ARQUIVOS com o arquivo teste.txt colado e a opção Colar em destaque",
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
      imagem: {
        url: imagemRenomear,
        alt: "Arquivo selecionado com a caixa de nome em edição e a tecla F2 em destaque",
        legenda: "F2 abre o nome do arquivo para edição.",
      },
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
      imagem: {
        url: imagemLixeira,
        alt: "Janela da Lixeira com o arquivo selecionado e a opção Restaurar em destaque",
        legenda: "Na Lixeira: botão direito no arquivo → Restaurar.",
      },
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
      imagem: {
        url: imagemDesfazer,
        alt: "Arquivo com nome errado voltando ao nome anterior após pressionar Ctrl + Z",
        legenda: "Ctrl + Z desfaz a última ação no Explorador de Arquivos.",
      },
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
      imagem: {
        url: imagemAtalhos,
        alt: "Quadro com os atalhos Ctrl + C, Ctrl + X, Ctrl + V, F2, Delete e Ctrl + Z e o que cada um faz",
        legenda: "Resumo dos atalhos praticados nesta atividade.",
      },
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
      objetivo: "Lembre: copiar mantém o original no lugar; recortar tira o arquivo do local de origem.",
    },
  ],
};

export default atividade;
