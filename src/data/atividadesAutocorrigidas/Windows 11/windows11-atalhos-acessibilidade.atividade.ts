import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/windows11-atalhos-acessibilidade.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atalhos de Teclado e Acessibilidade",
  introducao: "Dominar atalhos de teclado que economizam tempo todos os dias, e explorar recursos de acessibilidade do Windows 11 — entendendo, na prática, como alguém que não pode (ou não quer) usar o mouse consegue operar o computador inteiro.",
  itens: [
    {
      id: "atividade-1-atalhos-essenciais-do-sistema",
      titulo: "Atividade 1: Atalhos Essenciais do Sistema",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Tarefa",
        },
        {
          tipo: "texto",
          texto: "Teste cada atalho abaixo, um de cada vez:",
        },
        {
          tipo: "tabela",
          colunas: ["Atalho","O que faz"],
          linhas: [
            ["Windows + D","Mostra a área de trabalho"],
            ["Windows + E","Abre o Explorador de Arquivos"],
            ["Windows + I","Abre as Configurações"],
            ["Windows + L","Bloqueia a tela (você vai precisar da senha para voltar!)"],
            ["Windows + Tab","Abre a Visão de Tarefas"],
          ],
        },
        {
          tipo: "lista",
          itens: [
            "Crie um arquivo \"atalhos.txt\" e anote, com suas próprias palavras, o que cada atalho da tabela faz.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "objetivo",
          texto: "Memorizar os 5 atalhos mais usados no dia a dia de qualquer pessoa que trabalha com Windows.",
        },
      ],
    },
    {
      id: "atividade-2-organizando-janelas-sem-o-mouse",
      titulo: "Atividade 2: Organizando Janelas sem o Mouse",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Tarefa",
        },
        {
          tipo: "lista",
          itens: [
            "Abra 3 aplicativos (ex: Bloco de Notas, Calculadora, Explorador de Arquivos).",
            "Use Windows + Seta Esquerda e Windows + Seta Direita para encaixar janelas nos dois lados da tela.",
            "Segure Alt e aperte Tab várias vezes para circular entre todas as janelas abertas.",
            "Use Windows + Ctrl + D para criar uma nova Área de Trabalho Virtual, e Windows + Ctrl + Seta para circular entre elas. Ao final, feche a área extra com Windows + Ctrl + F4.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "objetivo",
          texto: "Organizar o espaço de trabalho sem tirar as mãos do teclado.",
        },
      ],
    },
    {
      id: "atividade-3-desafio-sem-mouse",
      titulo: "Atividade 3: Desafio \"Sem Mouse\"",
      blocos: [
        {
          tipo: "nota",
          variante: "desafio",
          rotulo: "Desafio",
          texto: "Sem tocar no mouse (ou desconectando ele, se possível):",
          itens: [
            "Abra o Bloco de Notas pelo menu Iniciar: aperte a tecla Windows, digite \"bloco de notas\" e pressione Enter.",
            "Digite uma frase curta.",
            "Salve com Ctrl + S, e use Tab e Enter para navegar pela janela de salvar até confirmar.",
            "Feche o programa com Alt + F4.",
          ],
        },
        {
          tipo: "nota",
          variante: "objetivo",
          texto: "Sentir, na prática, como uma pessoa com dificuldade motora para usar o mouse opera um computador no dia a dia.",
        },
      ],
    },
    {
      id: "atividade-4-teclas-de-aderencia-e-de-filtragem",
      titulo: "Atividade 4: Teclas de Aderência e de Filtragem",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Tarefa",
        },
        {
          tipo: "lista",
          itens: [
            "Vá em Configurações → Acessibilidade → Teclado.",
            "Ative \"Teclas de Aderência\" e teste fazer Ctrl + C apertando as teclas uma de cada vez, em vez de juntas.",
            "Ative \"Teclas de Filtragem\" e observe a diferença ao digitar bem rápido (ela ignora toques repetidos acidentais).",
            "Desligue as duas ao final da atividade.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "objetivo",
          texto: "Conhecer recursos pensados para quem tem dificuldade em apertar mais de uma tecla ao mesmo tempo, ou em soltar uma tecla rápido o suficiente.",
        },
      ],
    },
    {
      id: "atividade-5-acesso-por-voz-e-narrador",
      titulo: "Atividade 5: Acesso por Voz e Narrador",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Tarefa",
        },
        {
          tipo: "lista",
          itens: [
            "Vá em Configurações → Acessibilidade → Fala e ative \"Acesso por Voz\".",
            "Teste um comando simples de voz, como \"abrir bloco de notas\", falando perto do microfone.",
            "Ative o Narrador com Windows + Ctrl + Enter, ouça a leitura de um texto na tela, e desative com o mesmo atalho.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Windows + Ctrl + Enter Ctrl + Alt + Esc",
        },
      ],
    },
    {
      id: "atividade-6-alto-contraste-e-tamanho-de-texto",
      titulo: "Atividade 6: Alto Contraste e Tamanho de Texto",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Tarefa",
        },
        {
          tipo: "lista",
          itens: [
            "Em Configurações → Acessibilidade → Contraste, ative um tema de \"Alto contraste\" e observe a mudança na interface inteira.",
            "Volte para o tema normal.",
            "Em Acessibilidade → Tamanho do texto, aumente o tamanho do texto do sistema e veja o efeito sem precisar mudar a resolução da tela.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Use Windows + \"+\" para abrir a Lupa e ampliar uma parte da tela, e Windows + Esc para fechá-la.",
        },
        {
          tipo: "nota",
          variante: "objetivo",
          texto: "Entender que acessibilidade não é \"um recurso a mais\" — é o que garante que o sistema funcione para todo mundo, incluindo pessoas com baixa visão.",
        },
      ],
    },
  ],
};

export default atividade;
