import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/powerpoint-lista-atividades-basico.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Lista de Atividades",
  introducao: "PowerPoint",
  itens: [
    {
      id: "primeira-apresentacao-recursos-humanos",
      titulo: "Primeira apresentação — \"Recursos Humanos\"",
      blocos: [
        {
          tipo: "texto",
          texto: "Criar uma apresentação, cujo tema é \"Recursos Humanos\", com as seguintes características:",
        },
        {
          tipo: "subtitulo",
          texto: "Característica da apresentação:",
        },
        {
          tipo: "lista",
          itens: [
            "No mínimo 8 slides;",
            "No Máximo 10 slides;",
            "Todas as transições dos slides deverão estar animadas;",
            "Deverá conter pelo menos algumas animações;",
            "Adicionar figuras da Internet;",
            "Adicione gráfico",
            "Adicione organograma",
            "Insira o número de slide, criando um rodapé onde conste o seu nome e o número",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Detalhes da apresentação",
        },
        {
          tipo: "lista",
          itens: [
            "No primeiro slide deve aparecer o título \"CURIOSIDADES DO OFFICE\", com fonte Arial grande, em negrito, posicionado no centro. Abaixo inserir o texto \"Word, Excel e PowerPoint\", com fonte Times New Roman menor que o título, centralizado.",
            "O segundo e o terceiro slide deve conter \"curiosidades do Word\"",
            "Quarto e o quinto slide fale sobre curiosidades do Excel",
            "No sexto e o sétimo fale sobre curiosidades do PowerPoint",
            "Nos últimos slides, escreva no título A Internet, nas marcas, Introdução, O que a Internet oferece, como se transfere a informação e ligar-se à Internet. Insira uma imagem do ClipArt e fale sobre curiosidade da internet.",
          ],
        },
      ],
    },
    {
      id: "segunda-apresentacao-curiosidades",
      titulo: "Segunda apresentação — \"Curiosidades\"",
      blocos: [
        {
          tipo: "texto",
          texto: "Faça a segunda apresentação:",
        },
        {
          tipo: "lista",
          itens: [
            "Abra o Microsoft Office Power Point 2021 (Clique no botão Iniciar do Windows. Escolha a opção Todos os programas. Escolha a opção Microsoft Office; Escolha a opção Microsoft Office PowerPoint 2021)",
            "Defina um Tema para a sua apresentação. Na guia Design, no grupo Temas, escolha um dos temas disponíveis.",
            "Salve a sua apresentação com o nome Curiosidades (Clique no ícone do disquete no canto superior esquerdo da tela, na caixa Nome do Arquivo, digite Curiosidades. Clique no botão Salvar).",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Crie os slides de acordo com o modelo descrito abaixo:",
        },
        {
          tipo: "texto",
          texto: "a) No Slide 1, o título vai ser CURIOSIDADES e o subtítulo vai ser seu nome completo;",
        },
        {
          tipo: "texto",
          texto: "b) No Slide 2, escolha o layout Título e Conteúdo (Para inserir novos slides, clique na guia Início, grupo Slides, Opção Novo Slide). Para o título digite Curiosidades (parte 1) e para o conteúdo, digite:",
        },
        {
          tipo: "lista",
          itens: [
            "A Monalisa não tinha sobrancelhas",
            "Existem mais estrelas no espaço do que grãos de areia na Terra",
            "O cérebro tem a mesma consistência de tofu",
            "Hipopótamos matam mais humanos que qualquer animal africano.",
          ],
        },
        {
          tipo: "texto",
          texto: "c) No Slide 3, para o título, digite Curiosidades (parte 2) e para o conteúdo, digite:",
        },
        {
          tipo: "lista",
          itens: [
            "A luta mais longa de boxe durou 110 rounds",
            "Homens tem mais chances de ser atingidos por um raio do que mulheres",
            "Alexander Graham Bell, o inventor do telefone, não podia ligar para sua mulher. Ela era surda",
            "A torre Eiffel fica 15cm maior do que seu tamanho original no verão",
          ],
        },
        {
          tipo: "texto",
          texto: "d) No Slide 4, para título, digite Curiosidades (parte 3) e para conteúdo, digite:",
        },
        {
          tipo: "lista",
          itens: [
            "Mageirocofobia é o medo de cozinhar",
            "O io-io foi criado para ser usado como arma",
            "Porcos não suam",
            "Você enxerga melhor quando está assustado",
            "Vacas suam através do nariz",
            "O fusca foi ideia de Hitler",
          ],
        },
        {
          tipo: "texto",
          texto: "No Slide 5, para título, digite Curiosidades (parte 4) e para conteúdo, digite:",
        },
        {
          tipo: "lista",
          itens: [
            "Se os tubarões ficarem de cabeça para baixo, eles entram em coma",
            "As tartarugas podem respirar através dos seus rabos",
            "Um lápis pode escrever uma linha reta de até 56km",
            "Todos os cisnes da Inglaterra são propriedade da rainha",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Em cada slide, insira uma Imagem que tenha a ver com alguma das curiosidades.",
        },
      ],
    },
  ],
};

export default atividade;
