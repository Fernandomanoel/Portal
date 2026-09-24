import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/word-criando-formatando-documento.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Criando e Formatando um Documento no Word",
  introducao: "Ensinar ao aluno como criar um documento simples no Word, utilizando ferramentas básicas de formatação e organização de texto.",
  itens: [
    {
      id: "descricao-da-atividade",
      titulo: "Descrição da Atividade",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie um documento para simular um relatório de atividades escolares. A atividade envolverá o uso de títulos, parágrafos, listas, tabelas e imagens.",
        },
      ],
    },
    {
      id: "abra-um-novo-documento-no-word",
      titulo: "Abra um Novo Documento no Word",
      blocos: [
        {
          tipo: "lista",
          itens: ["Inicie o Word e crie um novo documento em branco."],
          numerada: true,
        },
      ],
    },
    {
      id: "digite-o-conteudo-base",
      titulo: "Digite o Conteúdo Base",
      blocos: [
        {
          tipo: "texto",
          texto: "Copie o seguinte texto no Word:",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Relatório de Atividades Escolares Nome do Aluno: ____________________________ Data: __/__/____ Introdução: Este relatório apresenta as atividades realizadas pelo aluno durante o período letivo, destacando as principais conquistas e áreas a melhorar. Atividades Realizadas: - Leitura de livros indicados. - Participação em projetos escolares. - Desenvolvimento de trabalhos em grupo. Observações: ___________________________________________________________ ___________________________________________________________",
        },
      ],
    },
    {
      id: "formate-o-texto",
      titulo: "Formate o Texto",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Título \"Relatório de Atividades Escolares\": altere para a fonte Arial, tamanho 16, estilo Negrito e alinhamento centralizado.",
            "Subtítulos (\"Nome do Aluno\", \"Data\", \"Introdução\", etc.): altere para a fonte Arial, tamanho 12, estilo Negrito.",
            "Texto Normal: altere para a fonte Arial, tamanho 11, alinhamento justificado.",
          ],
        },
      ],
    },
    {
      id: "insira-uma-tabela",
      titulo: "Insira uma Tabela",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Abaixo de \"Observações\", insira uma tabela com o título \"Desempenho\".",
            "3 Colunas: Atividade, Nota, Comentários.",
            "4 Linhas: Cabeçalho + 3 atividades.",
            "Preencha as colunas com informações fictícias.",
          ],
        },
        {
          tipo: "tabela",
          colunas: ["Atividade","Nota","Comentários"],
          linhas: [
            ["","",""],
            ["","",""],
            ["","",""],
          ],
        },
      ],
    },
    {
      id: "insira-uma-imagem",
      titulo: "Insira uma Imagem",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "No final do documento, insira uma imagem ilustrativa (ex.: logotipo da escola ou uma imagem genérica de educação).",
            "Redimensione e alinhe a imagem ao centro.",
          ],
        },
      ],
    },
    {
      id: "aplique-uma-bordas-a-pagina",
      titulo: "Aplique uma Bordas à Página",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Acesse Design > Bordas de Página.",
            "Escolha um estilo de borda simples e aplique ao documento.",
          ],
        },
      ],
    },
    {
      id: "tarefa-final",
      titulo: "Tarefa Final",
      blocos: [
        {
          tipo: "lista",
          itens: ["Salve o documento com o nome \"Relatório de Atividades\".","Envie o arquivo."],
          numerada: true,
        },
      ],
    },
  ],
};

export default atividade;
