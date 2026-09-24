import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/word-importancia-celular-vida-escolar.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade de Word: \"A Importância do Celular na Vida Escolar\"",
  introducao: "Word",
  itens: [
    {
      id: "passo-1-criar-o-documento",
      titulo: "Passo 1: Criar o Documento",
      blocos: [
        {
          tipo: "lista",
          itens: ["Abra o Microsoft Word.","Crie um novo documento em branco."],
          numerada: true,
        },
      ],
    },
    {
      id: "passo-2-escrever-o-titulo",
      titulo: "Passo 2: Escrever o Título",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "No topo da página, escreva o título: \"A Importância do Celular na Vida Escolar\".",
            "Centralize o título e ajuste o tamanho da fonte para 18.",
            "Utilize a fonte Arial e aplique negrito ao título.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "passo-3-escrever-o-texto",
      titulo: "Passo 3: Escrever o Texto",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abaixo do título, escreva um parágrafo de 5 a 10 linhas explicando como o celular pode ajudar ou atrapalhar no dia a dia dos estudos.",
          ],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "\"O celular pode ser uma ferramenta valiosa para acessar informações rapidamente e colaborar com colegas através de aplicativos de mensagens. No entanto, ele também pode ser uma fonte de distração, desviando a atenção das tarefas escolares.\"",
        },
      ],
    },
    {
      id: "passo-4-inserir-graficos",
      titulo: "Passo 4: Inserir Gráficos",
      blocos: [
        {
          tipo: "lista",
          itens: ["Insira um gráfico que mostre a porcentagem de alunos usando o celular para estudos."],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Passos:",
        },
        {
          tipo: "lista",
          itens: [
            "Vá para a aba \"Inserir\".",
            "Clique em \"Gráfico\".",
            "Escolha o tipo de gráfico (por exemplo, gráfico de pizza ou gráfico de barras).",
            "Insira os dados relevantes no gráfico.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "passo-5-listar-beneficios-e-maleficios",
      titulo: "Passo 5: Listar Benefícios e Malefícios",
      blocos: [
        {
          tipo: "lista",
          itens: ["Crie uma lista com 5 benefícios e 5 malefícios de utilizar o celular em sala de aula."],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Exemplo:",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Benefícios",
          texto: "",
          itens: [
            "Acesso rápido a informações.",
            "Ferramenta de comunicação.",
            "Aplicativos educativos.",
            "Organização de tarefas.",
            "Aprendizado interativo.",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Malefícios",
          texto: "",
          itens: [
            "Distrações constantes.",
            "Dependência tecnológica.",
            "Dificuldade de concentração.",
            "Risco de cyberbullying.",
            "Uso inadequado durante as aulas.",
          ],
        },
      ],
    },
    {
      id: "passo-6-formatar-o-documento",
      titulo: "Passo 6: Formatar o Documento",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Selecione todo o texto e ajuste a fonte para Arial e o tamanho para 12.",
            "Alinhe o texto à esquerda.",
            "Utilize negrito para destacar pontos importantes.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "passo-7-salvar-o-documento",
      titulo: "Passo 7: Salvar o Documento",
      blocos: [
        {
          tipo: "lista",
          itens: ["Salve o arquivo com o nome: \"relatorio_celular_nome_do_aluno\"."],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Passos:",
        },
        {
          tipo: "lista",
          itens: [
            "Vá para a aba \"Arquivo\".",
            "Clique em \"Salvar como\".",
            "Escolha o local onde deseja salvar o arquivo.",
            "Digite o nome do arquivo: \"relatorio_celular_nome_do_aluno\".",
            "Clique em \"Salvar\".",
          ],
          numerada: true,
        },
      ],
    },
  ],
};

export default atividade;
