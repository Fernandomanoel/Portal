import imagemAplicativos from "@/assets/atividades/windows-11/aplicativos-instalados.svg";
import imagemAreaDeTrabalho from "@/assets/atividades/windows-11/area-de-trabalho-personalizar.svg";
import imagemBarraDeTarefas from "@/assets/atividades/windows-11/barra-de-tarefas-menu-iniciar.svg";
import imagemConfiguracoes from "@/assets/atividades/windows-11/configuracoes-sistema-tela.svg";
import imagemExplorador from "@/assets/atividades/windows-11/explorador-de-arquivos.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Explorando o Sistema",
  introducao:
    "Objetivo geral: desenvolver habilidades básicas no uso do Windows 11, explorando suas principais ferramentas e configurações. Faça cada tarefa no seu computador, na ordem indicada.",
  itens: [
    {
      id: "personalizando-area-de-trabalho",
      titulo: "Personalizando a Área de Trabalho",
      passos: [
        "Clique com o botão direito na área de trabalho e selecione \"Personalizar\".",
        "Altere o plano de fundo para uma imagem de sua escolha.",
        "Modifique o tema do sistema (claro ou escuro).",
        "Adicione ou remova ícones clássicos da área de trabalho (como \"Este Computador\" e \"Lixeira\").",
      ],
      imagem: {
        url: imagemAreaDeTrabalho,
        alt: "Área de trabalho do Windows 11 com o menu do botão direito aberto e a opção Personalizar em destaque",
        legenda: "Botão direito em um espaço vazio da área de trabalho → Personalizar.",
      },
      objetivo: "Compreender como personalizar a interface do usuário.",
    },
    {
      id: "explorando-explorador-de-arquivos",
      titulo: "Explorando o Explorador de Arquivos",
      passos: [
        "Abra o Explorador de Arquivos (atalho: tecla Windows + E).",
        "Navegue até a pasta Documentos.",
        "Crie uma nova pasta chamada \"Atividades Windows\".",
        "Dentro dela, crie um arquivo de texto chamado \"anotações.txt\" e escreva algo dentro.",
      ],
      imagem: {
        url: imagemExplorador,
        alt: "Explorador de Arquivos do Windows 11 aberto em Documentos, com a pasta Atividades Windows e o arquivo anotações.txt",
        legenda: "Use o botão Novo para criar a pasta e o documento de texto.",
      },
      objetivo: "Aprender a organizar arquivos e pastas.",
    },
    {
      id: "barra-de-tarefas-menu-iniciar",
      titulo: "Usando a Barra de Tarefas e o Menu Iniciar",
      passos: [
        "Fixe um aplicativo na barra de tarefas (ex.: Bloco de Notas).",
        "Remova um aplicativo fixado que você não usa.",
        "Abra o Menu Iniciar e explore os aplicativos instalados.",
        "Pesquise por \"Calculadora\" e abra o aplicativo.",
      ],
      imagem: {
        url: imagemBarraDeTarefas,
        alt: "Menu Iniciar do Windows 11 com a pesquisa Calculadora e o menu do botão direito de um ícone da barra de tarefas",
        legenda: "Para fixar ou desafixar, clique com o botão direito no ícone do aplicativo.",
      },
      objetivo: "Dominar o uso da barra de tarefas e do Menu Iniciar.",
    },
    {
      id: "configuracoes-do-sistema",
      titulo: "Configurações do Sistema",
      passos: [
        "Acesse as Configurações (tecla Windows + I).",
        "Vá até Sistema > Tela e ajuste o brilho da tela.",
        "Em Hora e idioma, verifique se o idioma está correto.",
        "Em Privacidade e segurança, veja quais permissões os aplicativos têm.",
      ],
      imagem: {
        url: imagemConfiguracoes,
        alt: "Configurações do Windows 11 em Sistema > Tela, com o controle de brilho em destaque",
        legenda: "Sistema > Tela: o controle de brilho fica no topo da página.",
      },
      objetivo: "Conhecer e ajustar configurações importantes do sistema.",
    },
    {
      id: "gerenciando-aplicativos",
      titulo: "Gerenciando Aplicativos",
      passos: [
        "Acesse Configurações > Aplicativos > Aplicativos instalados.",
        "Escolha um aplicativo que você não usa e desinstale-o (se permitido).",
        "Acesse a Microsoft Store, pesquise por um aplicativo gratuito (ex.: WhatsApp) e instale-o.",
      ],
      imagem: {
        url: imagemAplicativos,
        alt: "Lista de Aplicativos instalados nas Configurações do Windows 11, com o menu de três pontos e a opção Desinstalar",
        legenda: "Clique nos três pontos (···) ao lado do aplicativo → Desinstalar.",
      },
      objetivo: "Aprender a instalar e remover programas com segurança.",
    },
  ],
};

export default atividade;
