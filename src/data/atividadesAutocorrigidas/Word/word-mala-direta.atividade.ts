import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/word-mala-direta.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Criando um Documento com Mala Direta no Word",
  introducao: "Ensinar ao aluno como utilizar a funcionalidade de mala direta no Word para personalizar cartas ou etiquetas com nomes e outras informações.",
  itens: [
    {
      id: "descricao-da-atividade",
      titulo: "Descrição da Atividade",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie uma mala direta para enviar uma carta personalizada a 15 pessoas. Cada carta terá o nome e o endereço específicos para cada destinatário.",
        },
      ],
    },
    {
      id: "criando-a-fonte-de-dados",
      titulo: "Criando a Fonte de Dados",
      blocos: [
        {
          tipo: "lista",
          itens: ["Abra o Excel."],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Crie uma planilha com as seguintes colunas:",
        },
        {
          tipo: "tabela",
          colunas: ["Nome","Endereço","Cidade","Estado","CEP"],
          linhas: [
            ["João Silva","Rua das Flores, 123","São Paulo","SP","01234-567"],
            ["Maria Lima","Av. Central, 456","Rio de Janeiro","RJ","22345-678"],
            ["Carlos Pereira","Rua da Esperança, 789","Belo Horizonte","MG","34567-890"],
            ["Ana Souza","Av. Paulista, 1010","São Paulo","SP","01111-222"],
            ["Pedro Oliveira","Rua das Palmeiras, 50","Salvador","BA","44567-123"],
            ["Beatriz Almeida","Av. Atlântica, 3000","Florianópolis","SC","55678-234"],
            ["Lucas Fernandes","Rua da Praia, 800","Recife","PE","66789-345"],
            ["Mariana Santos","Av. das Nações, 200","Brasília","DF","77890-456"],
            ["Rafael Costa","Rua do Sol, 150","Fortaleza","CE","88901-567"],
            ["Gabriela Castro","Av. dos Lagos, 500","Curitiba","PR","99012-678"],
            ["Tiago Ribeiro","Rua Verde, 70","Manaus","AM","11123-789"],
            ["Camila Freitas","Av. Azul, 600","Porto Alegre","RS","22234-890"],
            ["Felipe Cardoso","Rua Branca, 300","Vitória","ES","33345-901"],
            ["Isabela Mendes","Av. do Comércio, 120","Campo Grande","MS","44456-012"],
          ],
        },
        {
          tipo: "lista",
          itens: ["Salve o arquivo como \"Destinatários.xlsx\"."],
          numerada: true,
        },
      ],
    },
    {
      id: "criando-o-documento-base-no-word",
      titulo: "Criando o Documento Base no Word",
      blocos: [
        {
          tipo: "lista",
          itens: ["Abra o Word.","Crie um novo documento e insira o seguinte texto:"],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Prezado(a) [Nome], Estamos felizes em entrar em contato com você. Informamos que a entrega do material ocorrerá no endereço abaixo: Endereço: [Endereço] Cidade: [Cidade], [Estado] - CEP: [CEP] Agradecemos sua atenção e estamos à disposição para quaisquer dúvidas. Atenciosamente, [Seu Nome] [Sua Empresa]",
        },
      ],
    },
    {
      id: "configurando-a-mala-direta",
      titulo: "Configurando a Mala Direta",
      blocos: [
        {
          tipo: "lista",
          itens: ["Acesse a Guia Correspondências."],
          numerada: true,
        },
        {
          tipo: "texto",
          texto: "Clique em Iniciar Mala Direta > Cartas.",
        },
        {
          tipo: "subtitulo",
          texto: "Conecte à Fonte de Dados",
        },
        {
          tipo: "lista",
          itens: [
            "Clique em Selecionar Destinatários > Usar uma Lista Existente.",
            "Selecione o arquivo \"Destinatários.xlsx\".",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Insira os Campos da Mala Direta",
        },
        {
          tipo: "lista",
          itens: [
            "Substitua os textos entre colchetes ([Nome], [Endereço], etc.) pelos respectivos campos:",
            "— Clique em Inserir Campo de Mesclagem e selecione o campo apropriado.",
          ],
        },
      ],
    },
    {
      id: "finalizando-a-mala-direta",
      titulo: "Finalizando a Mala Direta",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Clique em Visualizar Resultados para verificar as cartas personalizadas.",
            "Se estiver tudo correto, clique em Concluir e Mesclar > Imprimir Documentos ou Concluir e Mesclar > Editar Documentos Individuais para revisar.",
          ],
          numerada: true,
        },
      ],
    },
    {
      id: "tarefa-final",
      titulo: "Tarefa Final",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Envie o arquivo final (15 cartas geradas) para avaliação.",
            "Opcional: Adicione um logotipo ou cabeçalho personalizado na carta.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "15 pessoas 14 destinatários",
        },
      ],
    },
  ],
};

export default atividade;
