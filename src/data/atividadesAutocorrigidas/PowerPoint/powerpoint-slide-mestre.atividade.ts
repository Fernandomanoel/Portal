import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Slide Mestre e Consistência Visual",
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
            "Tema livre — pode reaproveitar uma apresentação já criada",
            "Editar o Slide Mestre para aplicar um estilo em todos os slides de uma vez",
            "Pelo menos 5 slides usando o mesmo mestre",
          ],
        },
      ],
    },
    {
      id: "objetivo-por-que-usar-o-slide-mestre",
      titulo: "Objetivo — Por que usar o Slide Mestre",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "Editar o Slide Mestre em vez de formatar cada slide um por um, para toda a apresentação ficar visualmente consistente automaticamente.",
        },
        {
          tipo: "texto",
          texto: "Quando você muda a fonte, a cor de fundo ou insere um logotipo no Slide Mestre, essa mudança aparece em todos os slides que usam aquele layout — sem precisar copiar e colar nada, slide por slide.",
        },
      ],
    },
    {
      id: "passo-a-passo-editando-o-slide-mestre",
      titulo: "Passo a Passo: Editando o Slide Mestre",
      blocos: [
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Vá em Exibir → Slide Mestre.",
            "Selecione o slide mestre principal (o maior, no topo da lista à esquerda) para editar todos os layouts de uma vez.",
            "Altere a fonte, a cor de fundo, ou insira um logotipo/elemento gráfico fixo (Inserir → Imagens, dentro do modo mestre).",
            "Clique em Fechar Modo Mestre de Slides para voltar à edição normal.",
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Tudo que você adicionar dentro do modo Slide Mestre não pode ser apagado clicando nele no modo normal — para tirar ou mudar algo, é preciso voltar ao modo Slide Mestre.",
        },
      ],
    },
    {
      id: "layouts-individuais-ajustes-so-para-um-tipo-de-slide",
      titulo: "Layouts Individuais — Ajustes só para um tipo de slide",
      blocos: [
        {
          tipo: "texto",
          texto: "Abaixo do slide mestre principal, na mesma lista lateral, ficam os layouts (Título e Conteúdo, Duas Colunas, Título Apenas...). Editar um layout individual muda só os slides que usam aquele layout específico — útil quando um tipo de slide precisa de algo diferente do restante.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Exemplo: manter o logotipo em todos os slides (editando o mestre principal), mas deixar o layout \"Título\" sem o rodapé de numeração, porque é a capa.",
        },
      ],
    },
    {
      id: "aplicando-a-apresentacao",
      titulo: "Aplicando à Apresentação",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Volte para o modo normal e crie ou revise pelo menos 5 slides.",
            "Confirme que todos usam o mesmo mestre (fonte, cores e logotipo iguais em todos).",
            "Se algum slide ficar diferente sem querer, use a aba Design → Reaplicar Layout, ou reaplique o layout correto (aba Página Inicial → Layout).",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "pergunta-slide-mestre",
      titulo: "Pergunta Rápida",
      instrucao: "Se você quer que um logotipo apareça em TODOS os slides automaticamente, sem precisar copiar e colar em cada um, o que você deve editar?",
      campos: [
        {
          id: "slide-mestre-logo",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Cada slide, individualmente",
              "O Slide Mestre principal",
              "Apenas o primeiro slide",
              "O Modo de Exibição do Apresentador",
            ],
            correta: 1,
          },
          mensagemCerta: "Isso mesmo — o mestre principal controla todos os layouts que dependem dele.",
          mensagemErrada: "Pense em qual edição você faria só uma vez para valer em toda a apresentação.",
        },
      ],
    },
    {
      id: "pergunta-por-que-consistencia",
      titulo: "Pergunta Rápida",
      instrucao: "Por que manter a apresentação visualmente consistente (mesma fonte, cores e logotipo) ajuda quem está assistindo?",
      campos: [
        {
          id: "consistencia-motivo",
          placeholder: "Ex: Porque passa profissionalismo e evita distrair quem está assistindo com mudanças de estilo...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /profiss|consist|distr|confus|marca|identidade|foco|atenc/i,
          },
          mensagemCerta: "Exatamente — consistência visual reduz a distração e passa mais profissionalismo.",
          mensagemErrada: "Pense no que acontece quando cada slide parece de uma apresentação diferente.",
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
            "☐ Slide Mestre editado (fonte, cor ou logotipo)",
            "☐ Pelo menos 5 slides usando o mesmo mestre",
            "☐ Nenhum slide com estilo fora do padrão dos outros",
            "☐ Logotipo ou elemento fixo aparece em todos os slides certos",
          ],
        },
        {
          tipo: "texto",
          texto: "Agora sua apresentação parece profissional em qualquer slide que alguém abrir!",
        },
      ],
    },
  ],
};

export default atividade;
