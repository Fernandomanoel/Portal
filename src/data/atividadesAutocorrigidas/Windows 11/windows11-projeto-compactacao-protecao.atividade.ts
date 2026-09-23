import imagemNtfs from "@/assets/atividades/windows-11/compactacao-ntfs.svg";
import imagemZip from "@/assets/atividades/windows-11/compactar-zip.svg";
import imagemOcultar from "@/assets/atividades/windows-11/ocultar-pasta.svg";
import imagemPermissoes from "@/assets/atividades/windows-11/permissoes-seguranca.svg";
import imagemEstrutura from "@/assets/atividades/windows-11/projeto-final-estrutura.svg";
import imagemLote from "@/assets/atividades/windows-11/renomear-em-lote.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Windows 11 — Projeto, Compactação e Proteção de Pastas",
  introducao:
    "Objetivo geral: criar uma estrutura de pastas como em um projeto de verdade, compactar arquivos para economizar espaço e facilitar o envio, e aprender formas simples (e os limites) de proteger uma pasta de olhares curiosos.",
  itens: [
    {
      id: "estrutura-projeto",
      titulo: "Estrutura de Pastas de um Projeto",
      passos: [
        "Crie uma pasta \"Projeto Final\" dentro de Documentos.",
        "Dentro dela, crie 3 subpastas: \"Textos\", \"Imagens\" e \"Backup\".",
        "Em \"Textos\", crie 2 arquivos .txt com conteúdos diferentes.",
        "Em \"Imagens\", salve pelo menos 1 captura de tela (Windows + Shift + S).",
      ],
      imagem: {
        url: imagemEstrutura,
        alt: "Pasta Projeto Final aberta no Explorador com as subpastas Textos, Imagens e Backup e o esquema da estrutura",
        legenda: "Documentos → Projeto Final com as 3 subpastas.",
      },
      objetivo: "Organizar informação em hierarquia — do jeito que qualquer projeto real é organizado.",
    },
    {
      id: "renomeacao-em-lote",
      titulo: "Renomeação em Lote",
      passos: [
        "Dentro de \"Textos\", selecione os 2 arquivos ao mesmo tempo (clique no primeiro, segure Ctrl e clique no segundo).",
        "Pressione F2, digite um nome, como \"anotacao\", e pressione Enter.",
        "Observe o Explorador numerar os arquivos automaticamente — \"anotacao (1).txt\", \"anotacao (2).txt\".",
      ],
      imagem: {
        url: imagemLote,
        alt: "Dois arquivos selecionados na pasta Textos, renomeados como anotacao (1).txt e anotacao (2).txt",
        legenda: "Ctrl + clique para selecionar vários; F2 para renomear todos de uma vez.",
      },
      desafio:
        "crie mais 3 arquivos de texto vazios em \"Textos\" (total de 5), selecione todos e renomeie em lote de uma vez só.",
      objetivo: "Descobrir um atalho de produtividade real do Explorador de Arquivos.",
    },
    {
      id: "compactando-pasta",
      titulo: "Compactando a Pasta Inteira",
      passos: [
        "Clique com o botão direito na pasta \"Projeto Final\" → \"Compactar para arquivo ZIP\" (ou Mostrar mais opções → Enviar para → Pasta compactada).",
        "Compare o tamanho do arquivo .zip gerado com o tamanho da pasta original (botão direito → Propriedades em cada um).",
        "Copie o .zip para dentro da subpasta \"Backup\".",
        "Clique com o botão direito no .zip → Extrair tudo, escolha outra pasta e confirme que os arquivos saíram intactos.",
      ],
      imagem: {
        url: imagemZip,
        alt: "Menu do botão direito na pasta Projeto Final com a opção Compactar para arquivo ZIP em destaque e o arquivo Projeto Final.zip",
        legenda: "Botão direito → Compactar para arquivo ZIP; para abrir, Extrair tudo.",
      },
      objetivo: "Entender a compactação como forma de economizar espaço e de enviar vários arquivos como um só.",
    },
    {
      id: "compactacao-ntfs",
      titulo: "Compactação NTFS (Invisível)",
      passos: [
        "Clique com o botão direito na pasta \"Textos\" → Propriedades → Avançados.",
        "Marque \"Compactar conteúdo para economizar espaço em disco\" e confirme.",
        "Observe se o nome da pasta ou dos arquivos passa a aparecer diferente (em azul ou com um ícone de setas), indicando a compactação NTFS ativa.",
        "Ao final, desmarque a opção — deixe a pasta como estava.",
      ],
      imagem: {
        url: imagemNtfs,
        alt: "Janela Atributos Avançados com a opção Compactar conteúdo para economizar espaço em disco marcada",
        legenda: "Propriedades → Avançados → Compactar conteúdo para economizar espaço em disco.",
      },
      aviso:
        "essa compactação é diferente do ZIP: ela é \"invisível\" — os arquivos continuam abrindo normalmente, sem precisar extrair nada. Eles só ocupam menos espaço no disco.",
    },
    {
      id: "ocultando-pasta",
      titulo: "Ocultando uma Pasta",
      passos: [
        "Crie uma pasta chamada \"Particular\" dentro de \"Projeto Final\".",
        "Clique com o botão direito → Propriedades → marque o atributo \"Oculto\".",
        "Feche e reabra o Explorador de Arquivos — a pasta deve sumir da visualização.",
        "Na barra de comandos, ative Exibir → Mostrar → Itens ocultos para vê-la de novo e, depois, desative essa exibição.",
      ],
      imagem: {
        url: imagemOcultar,
        alt: "Explorador de Arquivos com o menu Exibir, Mostrar, Itens ocultos em destaque e a pasta Particular esmaecida",
        legenda: "Exibir → Mostrar → Itens ocultos: pastas ocultas aparecem esmaecidas.",
      },
      objetivo:
        "Perceber que \"ocultar\" é uma proteção simples contra olhares casuais — não é uma senha de verdade: qualquer um que saiba mostrar itens ocultos consegue ver.",
    },
    {
      id: "permissoes",
      titulo: "Verificando Permissões de uma Pasta",
      passos: [
        "Clique com o botão direito em \"Projeto Final\" → Propriedades → aba \"Segurança\".",
        "Veja a lista de \"Nomes de grupo ou de usuário\" e clique em cada um para ver o que ele pode fazer (Leitura, Gravação, Controle total).",
        "Anote no seu arquivo de anotações quem tem permissão de \"Controle total\" nesta pasta.",
      ],
      imagem: {
        url: imagemPermissoes,
        alt: "Janela de Propriedades de Projeto Final na aba Segurança, com a lista de usuários e as permissões",
        legenda: "Propriedades → Segurança: quem pode ler, gravar ou ter controle total.",
      },
      aviso:
        "não altere nada na aba Segurança. Mudar permissões por engano pode travar o acesso à própria pasta, até para você. Esta atividade é só de observação.",
    },
  ],
};

export default atividade;
