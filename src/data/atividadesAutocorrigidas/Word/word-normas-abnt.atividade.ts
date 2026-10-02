import imagemCapa from "@/assets/atividades/word/abnt-capa.svg";
import imagemFolhaRosto from "@/assets/atividades/word/abnt-folha-rosto.svg";
import imagemMargens from "@/assets/atividades/word/abnt-margens.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/word-normas-abnt.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Criando e Formatando um Documento Acadêmico no Word com Normas ABNT",
  introducao: "Ensinar o aluno a criar e formatar um documento acadêmico no Word, utilizando as normas da ABNT (Associação Brasileira de Normas Técnicas) para elementos textuais e pré-textuais, como capa, folha de rosto, sumário, introdução, desenvolvimento, conclusão e referências bibliográficas.",
  itens: [
    {
      id: "descricao-da-atividade",
      titulo: "Descrição da Atividade",
      blocos: [
        {
          tipo: "texto",
          texto: "Você receberá um texto base sobre \"Análise do Comportamento Humano e Persuasão: Uma Perspectiva Baseada no Manual do FBI\". Sua tarefa é formatar este texto de acordo com as normas da ABNT, incluindo todos os elementos solicitados no passo-a-passo. O objetivo é simular a criação de um trabalho acadêmico completo.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Este guia ajudará você a configurar seu documento do zero, garantindo que ele esteja impecável e dentro das normas.",
        },
      ],
    },
    {
      id: "preparando-o-terreno",
      titulo: "Preparando o Terreno",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abra o Microsoft Word.",
            "Clique em Documento em Branco.",
            "Dica de ouro: Salve o arquivo imediatamente (Ctrl + B) com o nome \"Atividade_SeuNome\" para não perder nada.",
          ],
        },
      ],
    },
    {
      id: "configurando-as-margens-o-espaco-de-respiro",
      titulo: "Configurando as Margens (O \"espaço de respiro\")",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Clique na guia Layout no menu superior.",
            "Clique no botão Margens e escolha Margens Personalizadas (no final da lista).",
            "Na aba \"Margens\", preencha exatamente assim:",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "",
          itens: ["Superior: 3 cm  |  Esquerda: 3 cm","Inferior: 2 cm  |  Direita: 2 cm"],
        },
        {
          tipo: "lista",
          itens: ["Verifique se a orientação está em Retrato e clique em OK."],
          numerada: true,
        },
      ],
      imagem: {
        url: imagemMargens,
        alt: "Diagrama de uma folha com as margens marcadas: 3 cm em cima e à esquerda, 2 cm embaixo e à direita.",
        legenda: "É essa a régua de medidas que você vai preencher na caixa de Margens Personalizadas.",
      },
    },
    {
      id: "fonte-e-texto-principal",
      titulo: "Fonte e Texto Principal",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Pressione Ctrl + T para selecionar todo o documento (mesmo que ainda esteja vazio).",
            "Vá na guia Página Inicial.",
            "No campo de Fonte, digite ou procure por Arial ou Times New Roman.",
            "No tamanho, selecione 12.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "paragrafo-e-espacamento-sem-efeito-sanfona",
      titulo: "Parágrafo e Espaçamento (Sem \"efeito sanfona\")",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Com o texto selecionado (ou antes de começar), clique na setinha no canto inferior direito do grupo Parágrafo (na guia Página Inicial).",
            "Na janela que abrir, configure:",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "",
          itens: [
            "Alinhamento: Justificada.",
            "Recuo Especial: Na primeira linha em 1,25 cm (padrão para parágrafos).",
            "Espaçamento entre linhas: 1,5 linhas.",
            "Espaçamento Antes e Depois: Deixe ambos em 0 pt.",
          ],
        },
        {
          tipo: "lista",
          itens: ["Clique em OK."],
          numerada: true,
        },
      ],
    },
    {
      id: "estruturando-a-capa-a-vitrine-do-trabalho",
      titulo: "Estruturando a Capa (A vitrine do trabalho)",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Clique no botão Centralizar (Ctrl + E).",
            "Instituição: Digite o nome em MAIÚSCULAS e Negrito. Pressione Enter 2 vezes.",
            "Curso: Digite o nome do curso em MAIÚSCULAS. Pressione Enter até chegar no meio da página (aproximadamente 10-12 vezes).",
            "Nome do Aluno: Digite seu nome completo em MAIÚSCULAS. Pressione Enter mais umas 10 vezes.",
            "Título: Digite o título em MAIÚSCULAS e Negrito.",
            "Subtítulo: Se houver, digite abaixo em MAIÚSCULAS (sem negrito).",
            "Pressione Enter até chegar ao final da página.",
            "Cidade e Ano: Digite a CIDADE - ESTADO (em cima) e o ANO (embaixo).",
          ],
          numerada: true,
        },
      ],
      imagem: {
        url: imagemCapa,
        alt: "Capa de trabalho acadêmico no padrão ABNT: nome da instituição e curso no topo, nome do aluno no meio, título em negrito mais abaixo e cidade/ano no rodapé, tudo centralizado.",
        legenda: "É a este resultado que a sua capa precisa chegar — repare no espaço bem aberto entre os blocos.",
      },
    },
    {
      id: "folha-de-rosto-contracapa",
      titulo: "Folha de Rosto (Contracapa)",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Vá para a página 2 (use Ctrl + Enter para criar uma nova página rapidamente).",
            "Repita o Nome do Aluno (topo, centralizado, maiúsculas).",
            "Pressione Enter (umas 10 vezes) e repita o Título (centralizado, negrito).",
            "Natureza do Trabalho:",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "\"Trabalho acadêmico apresentado como requisito parcial para a disciplina de Comportamento Humano, sob orientação do Prof. Dr. Manoel.\"",
          itens: [
            "Clique em Alinhar à Esquerda.",
            "Na régua superior, arraste o marcador de recuo até o número 8.",
            "Mude a fonte para tamanho 10, espaçamento simples e digite:",
          ],
        },
        {
          tipo: "lista",
          itens: ["No final da página, coloque novamente Cidade e Ano (centralizado, tamanho 12)."],
          numerada: true,
        },
      ],
      imagem: {
        url: imagemFolhaRosto,
        alt: "Folha de rosto ABNT: nome do aluno e título repetidos no topo, e um parágrafo pequeno recuado à direita explicando a natureza do trabalho.",
        legenda: "Só esse parágrafo de natureza do trabalho fica recuado e menor — o resto da página segue igual à capa.",
      },
    },
    {
      id: "sumario-o-mapa",
      titulo: "Sumário (O mapa)",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Crie uma nova página (Ctrl + Enter).",
            "Escreva SUMÁRIO (Maiúsculas, Negrito, Centralizado).",
            "Pule duas linhas. Se não for usar o automático, liste seus títulos à esquerda e os números das páginas à direita.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "aviso",
          rotulo: "Dica",
          texto: "",
        },
      ],
    },
    {
      id: "formatacao-do-conteudo-desenvolvimento",
      titulo: "Formatação do Conteúdo (Desenvolvimento)",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Títulos de Seção (Ex: 1. INTRODUÇÃO): Negrito, Maiúsculas, Alinhado à esquerda.",
            "Subtítulos (Ex: 1.1 Histórico): Negrito, apenas a primeira letra maiúscula.",
            "Citações Longas (+ de 3 linhas):",
            "— Selecione o bloco da citação.",
            "— Mude o tamanho para 10.",
            "— Mude o espaçamento para simples.",
            "— Aumente o recuo esquerdo para 4 cm (use a régua ou as configurações de parágrafo).",
          ],
        },
      ],
    },
    {
      id: "referencias-bibliograficas",
      titulo: "Referências Bibliográficas",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Última página, título REFERÊNCIAS (Centralizado e Negrito).",
            "Alinhamento à Esquerda.",
            "Espaçamento Simples.",
            "Pule uma linha entre cada referência. Lembre-se: Ordem alfabética pelo sobrenome do autor.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "inserindo-numeros-de-pagina-o-toque-final",
      titulo: "Inserindo Números de Página (O toque final)",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Vá na guia Inserir > Número de Página.",
            "Escolha Início da Página e depois Número sem Formatação 3 (canto superior direito).",
            "Dê um duplo clique no número para abrir a edição e verifique se a fonte está Arial/Times tamanho 10.",
            "Atenção: A contagem começa na capa, mas o número só deve aparecer visualmente a partir da Introdução.",
            "Como fazer: Clique na página anterior à introdução, vá em Layout > Quebras > Próxima Página. Depois, no cabeçalho da introdução, desmarque \"Vincular ao Anterior\" e apague os números das páginas iniciais.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "conteudo-base-para-formatacao",
      titulo: "Conteúdo Base para Formatação",
      blocos: [
        {
          tipo: "texto",
          texto: "Este é o texto que você deve formatar seguindo todas as regras acima. Copie-o para o Word e aplique passo a passo a formatação ABNT descrita.",
        },
        {
          tipo: "subtitulo",
          texto: "ANÁLISE DO COMPORTAMENTO HUMANO E PERSUASÃO: UMA PERSPECTIVA BASEADA NO MANUAL DO FBI",
        },
        {
          tipo: "texto",
          texto: "Trabalho acadêmico apresentado como requisito parcial para a disciplina de Comportamento Humano, sob orientação do Prof. Dr. Manoel.",
        },
        {
          tipo: "texto",
          texto: "CIDADE - ESTADO",
        },
        {
          tipo: "texto",
          texto: "2026",
        },
        {
          tipo: "subtitulo",
          texto: "SUMÁRIO",
        },
        {
          tipo: "subtitulo",
          texto: "INTRODUÇÃO",
        },
        {
          tipo: "texto",
          texto: "O estudo do comportamento humano tem sido uma peça fundamental nas operações de inteligência e investigação criminal. O presente trabalho analisa as técnicas de persuasão e análise comportamental desenvolvidas por especialistas do Federal Bureau of Investigation (FBI), especificamente as metodologias descritas por Jack Schafer em sua obra \"Manual de Persuasão do FBI\". O objetivo é compreender como sinais sutis e estratégias psicológicas podem ser utilizados para construir relacionamentos, ganhar confiança e influenciar positivamente as interações sociais.",
        },
        {
          tipo: "texto",
          texto: "A compreensão desses mecanismos não se limita ao campo da espionagem ou investigação, mas estende-se a todas as áreas da vida humana onde a comunicação e a empatia são necessárias. Através da análise de elementos como a proximidade, a frequência e a intensidade das interações, é possível decifrar os códigos invisíveis que regem a atração e a cooperação entre indivíduos.",
        },
        {
          tipo: "subtitulo",
          texto: "A FÓRMULA DA AMIZADE",
        },
        {
          tipo: "texto",
          texto: "Um dos pilares centrais da metodologia do FBI para o recrutamento de fontes e construção de alianças é a chamada \"Fórmula da Amizade\". Segundo Schafer, a amizade e a confiança não são frutos do acaso, mas sim o resultado de uma equação matemática composta por quatro variáveis fundamentais: Proximidade, Frequência, Duração e Intensidade.",
        },
        {
          tipo: "tabela",
          colunas: ["Variável","Descrição","Impacto na Relação"],
          linhas: [
            [
              "Proximidade",
              "Estar no mesmo espaço físico que o alvo.",
              "Cria familiaridade sem a necessidade de interação direta inicial.",
            ],
            [
              "Frequência",
              "O número de contatos realizados ao longo do tempo.",
              "Reforça a presença e reduz a percepção de ameaça",
            ],
            [
              "Duração",
              "O tempo gasto em cada interação individual.",
              "Permite o aprofundamento da conexão e do compartilhamento de informações.",
            ],
            [
              "Intensidade",
              "A profundidade psicológica da interação.",
              "Define a força do vínculo emocional estabelecido.",
            ],
          ],
        },
        {
          tipo: "texto",
          texto: "A aplicação estratégica dessas variáveis permite que um agente se torne uma figura familiar e confiável na vida de outra pessoa, muitas vezes sem que esta perceba o esforço consciente por trás da aproximação.",
        },
        {
          tipo: "subtitulo",
          texto: "SINAIS NÃO-VERBAIS E COMUNICAÇÃO",
        },
        {
          tipo: "texto",
          texto: "A comunicação humana é composta majoritariamente por elementos não-verbais. O cérebro humano está constantemente escaneando o ambiente em busca de sinais de segurança ou perigo. O \"Manual do FBI\" destaca três sinais cruciais que indicam que uma pessoa é amigável e não representa uma ameaça:",
        },
        {
          tipo: "texto",
          texto: "\"O flash de sobrancelhas, a inclinação da cabeça e o sorriso verdadeiro são os três grandes sinais de amizade que o cérebro reconhece instantaneamente.\" (SCHAFER, 2015)",
        },
        {
          tipo: "texto",
          texto: "O flash de sobrancelhas é um movimento rápido de subida e descida das sobrancelhas que dura cerca de um sexto de segundo, sinalizando reconhecimento e abertura. A inclinação da cabeça para um dos lados expõe a artéria carótida, um sinal biológico de vulnerabilidade que demonstra confiança no interlocutor. Por fim, o sorriso de Duchenne, que envolve a musculatura ao redor dos olhos, é a marca da sinceridade, diferenciando-se de sorrisos sociais forçados.",
        },
        {
          tipo: "subtitulo",
          texto: "A REGRA DE OURO DA INTERAÇÃO HUMANA",
        },
        {
          tipo: "texto",
          texto: "A base de toda persuasão ética e eficaz reside no que Schafer denomina a \"Regra de Ouro da Amizade\". Esta regra estabelece que, para fazer com que as pessoas gostem de você, você deve fazê-las se sentirem bem consigo mesmas.",
        },
        {
          tipo: "texto",
          texto: "Diferente da manipulação comum, que foca no ego do persuasor, a técnica do FBI foca na validação do outro. Isso é alcançado através de:",
        },
        {
          tipo: "lista",
          itens: [
            "Escuta Ativa: Demonstrar interesse genuíno pelo que o outro diz.",
            "Declarações Empáticas: Refletir os sentimentos do interlocutor para criar conexão.",
            "Elogios Indiretos: Permitir que a pessoa se auto-elogie através de perguntas bem formuladas.",
          ],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Ao colocar o foco na satisfação das necessidades psicológicas do outro, o praticante desta técnica cria um ambiente de conforto e segurança que naturalmente leva à cooperação.",
        },
        {
          tipo: "subtitulo",
          texto: "CONCLUSÃO",
        },
        {
          tipo: "texto",
          texto: "A análise do comportamento humano sob a ótica do FBI revela que a influência é uma habilidade que pode ser desenvolvida através da observação e da prática deliberada. A \"Fórmula da Amizade\" e o domínio da linguagem não-verbal oferecem ferramentas poderosas para a construção de pontes entre indivíduos, independentemente do contexto.",
        },
        {
          tipo: "texto",
          texto: "Conclui-se que a eficácia dessas técnicas reside na sua fundamentação biológica e psicológica. Ao respeitar os sinais naturais de segurança do cérebro humano e priorizar o bem-estar do interlocutor, é possível estabelecer vínculos profundos e duradouros, transformando estranhos em aliados e conflitos em cooperação.",
        },
        {
          tipo: "subtitulo",
          texto: "REFERÊNCIAS",
        },
        {
          tipo: "texto",
          texto: "DREEKE, Robin. Como ler as pessoas: O guia de um agente do FBI para prever o comportamento humano. Rio de Janeiro: Sextante, 2019.",
        },
        {
          tipo: "texto",
          texto: "SCHAFER, Jack; KARLINS, Marvin. Manual de Persuasão do FBI: Um ex-agente ensina como influenciar, atrair e conquistar pessoas. São Paulo: Universo dos Livros, 2015.",
        },
        {
          tipo: "texto",
          texto: "FBI. Behavioral Analysis Unit. Disponível em: https://www.fbi.gov/how-we-investigate/behavioral-analysis. Acesso em: 27 abr. 2026.",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "No documento original, a lista de Referências aparece na ordem DREEKE, SCHAFER e FBI — não em ordem alfabética estrita (que seria DREEKE, FBI, SCHAFER) — mantivemos a ordem exata do PDF, mesmo contrariando a própria regra 9.4 acima (\"ordem alfabética pelo sobrenome do autor\").",
        },
      ],
    },
  ],
};

export default atividade;
