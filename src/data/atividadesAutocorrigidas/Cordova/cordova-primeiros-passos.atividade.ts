import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Ionic e Cordova — Primeiros Passos",
  introducao:
    "Do zero ao seu primeiro aplicativo de celular rodando no navegador. Você já sabe montar uma página com HTML, deixar ela bonita com CSS e fazer coisas acontecerem com JavaScript — agora vai usar exatamente esse conhecimento para construir um aplicativo chamado Minhas Missões, que lembra do que foi digitado e no final roda dentro de um celular Android simulado no computador.",
  regras: {
    titulo: "Como trabalhar bem durante a aula",
    itens: [
      "Técnica 50/10: a cada uns 50 minutos codando, vale 10 minutos de pausa longe da tela.",
      "Ciclo curto de salvar e testar: a cada 3-5 linhas novas, salve (Ctrl+S) e recarregue o app — assim, se algo quebrar, você sabe exatamente qual foi a última coisa que mudou.",
      "Erros são pistas, não fracasso: toda mensagem vermelha no Console é uma dica. Pergunte-se qual foi a última mudança, o que a mensagem diz, e onde (arquivo e linha) ela aponta.",
    ],
  },
  itens: [
    {
      id: "app-hibrido",
      titulo: "O que é um Aplicativo Híbrido?",
      instrucao: "Existem, basicamente, três formas de criar um aplicativo de celular.",
      tabelaReferencia: {
        colunas: ["Tipo", "Como é feito", "Exemplo"],
        linhas: [
          ["Nativo", "Escrito numa linguagem própria do sistema (Kotlin no Android, Swift no iPhone)", "Muitos jogos pesados"],
          ["Web", "É só um site que você acessa pelo navegador do celular", "Um site qualquer aberto no Chrome do celular"],
          ["Híbrido", "Escrito com HTML/CSS/JS, mas \"empacotado\" para virar um app de verdade, com ícone e tudo", "É isso que você vai fazer hoje"],
        ],
      },
      objetivo:
        "O caminho híbrido é ótimo para quem já sabe desenvolver para web porque aproveita 100% do que você já aprendeu, sem precisar decorar uma linguagem nova do zero.",
    },
    {
      id: "conhecendo-o-ionic",
      titulo: "Conhecendo o Ionic",
      cenario:
        "Ionic é uma biblioteca de componentes visuais prontos — botões, menus, cartões, listas, campos de texto — todos já desenhados com a cara de aplicativo de celular de verdade. Tecnicamente, os componentes do Ionic são feitos com Web Components: funcionam como tags HTML normais, só que com super poderes.",
      codigo: {
        conteudo: `<ion-button color="success">
  <ion-icon name="star"></ion-icon>
  Meu botão bonito
</ion-button>`,
      },
      objetivo: "Uma linha de HTML, e você já tem um botão verde, arredondado, com ícone, do jeito que apareceria num app de verdade — sem escrever nenhum CSS.",
    },
    {
      id: "conhecendo-o-cordova",
      titulo: "Conhecendo o Cordova",
      cenario:
        "Só ter componentes bonitos não basta — o navegador do computador não é um celular. É aqui que entra o Cordova: ele pega tudo o que você escreveu em HTML/CSS/JS e \"embrulha\" isso de um jeito que o sistema operacional do celular reconhece como um aplicativo de verdade, com ícone, permissão de instalar, e tudo mais.",
      objetivo:
        "O Cordova também dá acesso a coisas que só um app de verdade consegue usar — câmera, GPS, contatos — por meio de plugins. Você não vai usar plugins nesta atividade, mas é bom saber que eles existem.",
    },
    {
      id: "ionic-e-cordova-juntos",
      titulo: "Como Ionic e Cordova Trabalham Juntos",
      instrucao: "Veja o caminho completo do seu código até aparecer na tela de um celular:",
      tabelaReferencia: {
        colunas: ["Camada"],
        linhas: [
          ["Seu HTML + CSS + JS"],
          ["Componentes visuais do Ionic"],
          ["Cordova empacota tudo"],
          ["Roda no celular como um app de verdade"],
        ],
      },
    },
    {
      id: "o-terminal",
      titulo: "O Terminal — Seu Novo Melhor Amigo",
      cenario:
        "Diferente de um site, que você cria só clicando e salvando arquivos, projetos Cordova são criados e executados por comandos de texto, digitados numa janela chamada terminal (ou \"linha de comando\").",
      tabelaReferencia: {
        colunas: ["Comando", "O que faz"],
        linhas: [
          ["cd nome-da-pasta", "\"Entra\" dentro de uma pasta (cd = \"change directory\", trocar de pasta)"],
          ["cd ..", "Volta uma pasta para trás"],
          ["dir (Windows) ou ls (Mac/Linux)", "Lista o que existe dentro da pasta atual"],
        ],
      },
    },
    {
      id: "criando-primeiro-projeto",
      titulo: "Criando Seu Primeiro Projeto",
      instrucao:
        "O computador já tem tudo instalado — Node.js, Cordova e Ionic — então você não precisa instalar nada, só usar. Abra o terminal na pasta onde quer guardar seus projetos, e digite o comando:",
      codigo: {
        conteudo: `cordova create meu-app com.escola.meuapp "Minhas Missões"`,
        terminal: true,
      },
      passos: [
        "meu-app — o nome da pasta que vai ser criada no seu computador.",
        "com.escola.meuapp — um \"identificador único\" do aplicativo, parecido com um CPF: ninguém mais no mundo pode ter o mesmo (convenção: empresa.organização.nomedoapp).",
        "\"Minhas Missões\" — o nome que vai aparecer escrito embaixo do ícone, no celular.",
      ],
      aviso:
        "esse comando demora um pouquinho na primeira vez (ele está baixando e organizando vários arquivos por trás dos panos). Não feche o terminal, só espere aparecer o cursor piscando de novo.",
    },
    {
      id: "rodando-o-app",
      titulo: "Rodando o App pela Primeira Vez",
      instrucao: "Com o projeto criado, entre na pasta dele e prepare a pré-visualização no navegador:",
      codigo: {
        conteudo: `cd meu-app\ncordova platform add browser\ncordova run browser`,
        terminal: true,
      },
      objetivo:
        "Se uma aba abriu com uma tela simples de boas-vindas do Cordova, parabéns — você acabou de criar e rodar seu primeiro projeto de aplicativo de celular.",
    },
    {
      id: "explorando-pasta-www",
      titulo: "Explorando a Pasta www/",
      cenario:
        "A pasta meu-app tem bastante coisa dentro, mas 99% não importa para você agora — o Cordova usa isso por trás dos panos para funcionar. O que importa é uma única pasta: www.",
      codigo: {
        conteudo: `meu-app/
└── www/
    ├── index.html   # a tela do seu app
    ├── css/
    │   └── index.css   # o estilo visual
    └── js/
        └── index.js    # a lógica — o que acontece quando você toca em algo`,
      },
      objetivo:
        "É exatamente como um site comum: um arquivo HTML, uma pasta de CSS, uma pasta de JS. A diferença é só que, ao rodar cordova run, o Cordova faz esses arquivos virarem um app de verdade.",
    },
    {
      id: "primeiro-componente-cabecalho",
      titulo: "Seu Primeiro Componente — o Cabeçalho",
      instrucao: "Troque o conteúdo de dentro do <body> do www/index.html pelo primeiro componente de verdade: um cabeçalho fixo no topo.",
      codigo: {
        conteudo: `<ion-app>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Minhas Missões</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
  </ion-content>
</ion-app>`,
      },
      tabelaReferencia: {
        colunas: ["Tag", "O que faz"],
        linhas: [
          ["<ion-app>", "Envolve o app inteiro, é tipo o <body> de um app Ionic"],
          ["<ion-header>", "A área fixa do topo"],
          ["<ion-toolbar color=\"primary\">", "A barra dentro do cabeçalho; \"primary\" usa a cor principal do tema"],
          ["<ion-title>", "O texto que aparece na barra"],
          ["<ion-content class=\"ion-padding\">", "A área rolável onde o resto do conteúdo entra; ion-padding dá um respiro nas bordas"],
        ],
      },
      aviso:
        "salve o arquivo agora e recarregue a aba do navegador (ou rode cordova run browser de novo). Deve aparecer uma barra azul no topo com \"Minhas Missões\" escrito.",
    },
    {
      id: "cartao-de-boas-vindas",
      titulo: "Adicionando um Cartão de Boas-vindas",
      instrucao: "Preencha o <ion-content> vazio com um cartão — um dos componentes mais usados em qualquer app, para destacar um bloco de conteúdo.",
      codigo: {
        conteudo: `<ion-card>
  <ion-card-header>
    <ion-card-title>Bem-vinda!</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    Este é o meu primeiro aplicativo de celular, criado por mim!
  </ion-card-content>
</ion-card>`,
      },
      desafio:
        "antes de continuar, tente sozinha: duplique o cartão inteiro e escreva um segundo, com outro texto, e troque o texto do <ion-title> por outro nome de app.",
    },
    {
      id: "personalizando-cores",
      titulo: "Personalizando as Cores",
      instrucao: "O Ionic vem com um conjunto de cores prontas, pensadas para funcionar bem juntas.",
      tabelaReferencia: {
        colunas: ["Nome", "Uso comum"],
        linhas: [
          ["primary", "a cor principal do app (geralmente a marca)"],
          ["secondary", "uma cor de apoio"],
          ["tertiary", "outra cor de apoio, para variar"],
          ["success", "ações positivas — verde, geralmente"],
          ["warning", "atenção — amarelo"],
          ["danger", "ações que apagam/cancelam algo — vermelho"],
          ["medium", "elementos neutros, discretos"],
          ["dark", "fundo/texto escuro"],
        ],
      },
      passos: ["Troque color=\"primary\" por color=\"danger\" na sua <ion-toolbar> e recarregue — a barra inteira muda de cor sozinha."],
      codigo: {
        conteudo: `ion-toolbar {
  --background: #ff6b9d; /* rosa, por exemplo */
  --color: #ffffff;
}`,
      },
      objetivo:
        "É assim que apps profissionais mantêm um visual consistente: usando um conjunto pequeno de cores combinadas, em vez de cores soltas em cada lugar. Se as prontas não bastarem, dá para criar a sua no CSS com --background/--color.",
    },
    {
      id: "console-do-navegador",
      titulo: "Modo Detetive — o Console do Navegador",
      cenario:
        "Vez ou outra, o app vai \"quebrar\" — a tela fica em branco, ou algo não aparece como esperado. Isso é completamente normal. O segredo não é nunca errar — é saber onde procurar a pista.",
      passos: [
        "Aperte F12 no navegador (ou clique com o botão direito na página → Inspecionar).",
        "Clique na aba Console.",
        "Se algo deu errado, aparece uma linha em vermelho — geralmente com o nome do arquivo e o número da linha do problema.",
        "Para praticar: apague de propósito o > do fim de uma tag (ex.: troque <ion-title> por <ion-title sem fechar), salve, recarregue e olhe o Console.",
      ],
      codigo: {
        conteudo: `Uncaught SyntaxError: Unexpected token ...`,
      },
      aviso: "depois de ver a mensagem, desfaça o erro (Ctrl+Z) e confirme que ela some.",
      objetivo: "Você vai usar esse Console em toda atividade daqui para frente — vale o hábito de deixar o F12 aberto sempre que estiver codando.",
    },
    {
      id: "erros-comuns",
      titulo: "Erros Comuns Nesta Fase",
      instrucao: "Uma pequena lista do que mais costuma dar problema no início — guarde essa página para consultar depois.",
      tabelaReferencia: {
        colunas: ["O que aconteceu", "Causa provável"],
        linhas: [
          [
            "A aba não abriu depois de cordova run browser",
            "Esqueceu de rodar cordova platform add browser antes, ou não está dentro da pasta certa (confira com cd)",
          ],
          ["Tela em branco", "Alguma tag ficou sem fechar — abra o F12 e leia o Console"],
          [
            "O componente aparece sem estilo nenhum (parece HTML puro)",
            "As linhas do Ionic no <head> do index.html foram apagadas ou modificadas sem querer",
          ],
          ["Mudei o CSS mas nada mudou na tela", "Esqueceu de salvar o arquivo, ou recarregou a aba errada"],
        ],
      },
    },
    {
      id: "checklist-final",
      titulo: "Checklist Final e Próximos Passos",
      instrucao: "Antes de encerrar esta atividade, confirme:",
      tabelaReferencia: {
        colunas: ["Checklist final"],
        linhas: [
          ["Criei o projeto com cordova create e consegui rodar com cordova run browser"],
          ["Sei onde fica a pasta www/ e entendo o papel de cada arquivo dentro dela"],
          ["Meu app mostra um cabeçalho (ion-header) com título e um cartão (ion-card) de boas-vindas"],
          ["Já troquei a cor da barra e testei pelo menos 2 cores diferentes do Ionic"],
          ["Já abri o Console (F12) e vi como um erro aparece lá"],
          ["Entendi a diferença entre Ionic (as peças visuais) e Cordova (a ponte para o celular)"],
        ],
      },
      objetivo:
        "Você já tem um projeto de app rodando, com cabeçalho e cartão personalizados. A próxima atividade enche a tela com mais componentes — campo de texto, botões com ícone e uma lista.",
    },
  ],
};

export default atividade;
