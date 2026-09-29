import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Apresentando com Confiança: Atalhos e Modo Apresentador",
  introducao: "Avaliação Prática de PowerPoint",
  itens: [
    {
      id: "apresentacao",
      titulo: "Apresentação",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "O desafio:",
        },
        {
          tipo: "lista",
          itens: [
            "Use uma apresentação já pronta (sua ou de outra atividade)",
            "Adicionar anotações do orador em pelo menos 3 slides",
            "Ensaiar a apresentação usando o cronômetro do PowerPoint",
            "Apresentar usando o Modo de Exibição do Apresentador",
          ],
        },
      ],
    },
    {
      id: "objetivo-indo-alem-de-so-montar-os-slides",
      titulo: "Objetivo — Indo além de só montar os slides",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "Aprender os recursos do PowerPoint voltados para o momento de apresentar ao vivo: atalhos de teclado, anotações que só você vê, e o modo apresentador.",
        },
        {
          tipo: "texto",
          texto: "Uma apresentação bem feita também depende de como ela é conduzida na hora de falar com a plateia. Esses recursos evitam que você fique perdido(a) no meio da apresentação.",
        },
      ],
    },
    {
      id: "atalhos-essenciais-para-nao-parar-a-apresentacao",
      titulo: "Atalhos Essenciais — Para não parar a apresentação procurando o mouse",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Atalho", "O que faz"],
          linhas: [
            ["F5", "Inicia a apresentação a partir do primeiro slide"],
            ["Shift + F5", "Inicia a apresentação a partir do slide atual"],
            ["Espaço ou seta para a direita", "Avança para o próximo slide ou animação"],
            ["Seta para a esquerda", "Volta para o slide ou animação anterior"],
            ["B", "Escurece a tela (útil para pausar sem distrair)"],
            ["W", "Deixa a tela branca (o oposto do B)"],
            ["Esc", "Sai do modo de apresentação"],
          ],
        },
      ],
    },
    {
      id: "anotacoes-do-orador-lembretes-que-so-voce-ve",
      titulo: "Anotações do Orador — Lembretes que só você vê",
      blocos: [
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "No modo normal, vá em Exibir → Anotações (ou use o campo \"Clique para adicionar notas\" embaixo do slide).",
            "Digite lembretes, dados que você não quer esquecer, ou o que precisa falar naquele slide.",
            "Repita em pelo menos 3 slides diferentes.",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "As anotações não aparecem para a plateia — só quem está no computador do apresentador consegue ver, seja no Modo Apresentador, seja imprimindo as notas antes.",
        },
      ],
    },
    {
      id: "passo-a-passo-ensaiando-a-apresentacao",
      titulo: "Passo a Passo: Ensaiando a Apresentação",
      blocos: [
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Vá na aba Apresentação de Slides → Ensaiar Apresentação.",
            "A apresentação roda em tela cheia e cronometra automaticamente o tempo de cada slide.",
            "Fale como se estivesse apresentando de verdade e avance os slides no seu ritmo normal.",
            "No final, o PowerPoint pergunta se você quer salvar os tempos — clique em Sim para poder revisar depois.",
          ],
        },
      ],
    },
    {
      id: "modo-apresentador-a-tela-que-so-voce-ve",
      titulo: "Modo Apresentador — A tela que só você vê",
      blocos: [
        {
          tipo: "texto",
          texto: "Ao apertar F5 com um segundo monitor ou projetor conectado, o PowerPoint já liga o Modo de Exibição do Apresentador automaticamente. Nele, você vê:",
        },
        {
          tipo: "lista",
          itens: [
            "O slide atual (o mesmo que a plateia está vendo)",
            "Uma prévia do próximo slide",
            "Suas anotações do orador",
            "Um cronômetro contando o tempo da apresentação",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Sem projetor conectado, dá para testar mesmo assim: Apresentação de Slides → marque \"Usar o Modo de Exibição do Apresentador\" antes de apertar F5.",
        },
      ],
    },
    {
      id: "pergunta-atalho-slide-atual",
      titulo: "Pergunta Rápida",
      instrucao: "Qual atalho inicia a apresentação a partir do slide ATUAL (e não do primeiro slide)?",
      campos: [
        {
          id: "atalho-atual",
          regra: {
            tipo: "multipla_escolha",
            opcoes: ["F5", "Shift + F5", "Ctrl + F5", "Esc"],
            correta: 1,
          },
          mensagemCerta: "Isso mesmo — F5 sozinho sempre recomeça do primeiro slide.",
          mensagemErrada: "F5 sozinho recomeça do primeiro slide; pense em qual tecla combinada muda esse comportamento.",
        },
      ],
    },
    {
      id: "pergunta-modo-apresentador",
      titulo: "Pergunta Rápida",
      instrucao: "Qual é a vantagem de usar o Modo de Exibição do Apresentador em vez de simplesmente apresentar a tela normal do slide?",
      campos: [
        {
          id: "vantagem-modo-apresentador",
          placeholder: "Ex: Você consegue ver suas anotações e o próximo slide sem a plateia ver...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /anota|nota|pr[oó]xim|plateia|p[uú]blico|cron[oô]metro|s[oó] voc|s[oó] você/i,
          },
          mensagemCerta: "Exatamente — você vê o que precisa (notas, próximo slide, tempo) sem a plateia ver.",
          mensagemErrada: "Pense no que aparece SÓ na sua tela e não na tela que a plateia vê.",
        },
      ],
    },
    {
      id: "checklist-antes-de-entregar",
      titulo: "Checklist Antes de Entregar",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "☐ Anotações do orador em pelo menos 3 slides",
            "☐ Apresentação ensaiada com o cronômetro do PowerPoint",
            "☐ Testou o Modo de Exibição do Apresentador",
            "☐ Sabe pelo menos 3 atalhos de apresentação de cabeça",
          ],
        },
        {
          tipo: "texto",
          texto: "Agora você apresenta sem depender só da memória!",
        },
      ],
    },
  ],
};

export default atividade;
