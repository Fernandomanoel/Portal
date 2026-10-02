import imagemJanela from "@/assets/atividades/outlook/janela-principal.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
const atividade: AtividadeAutocorrigida = {
  titulo: "Conhecendo o Outlook: Explorando a Ferramenta",
  introducao:
    "O Outlook é a ferramenta de e-mail, agenda e contatos mais usada nas empresas. Nesta atividade você vai abrir o Outlook, descobrir para que serve cada área da tela e aprender a achar qualquer mensagem sem perder tempo.",
  itens: [
    {
      id: "o-que-e",
      titulo: "O que é o Outlook",
      blocos: [
        {
          tipo: "texto",
          texto:
            "O Outlook reúne em um só lugar o e-mail, o calendário (agenda), os contatos e as tarefas. Ele pode ser aberto de duas formas: pelo navegador (versão web, no endereço outlook.office.com ou outlook.live.com) ou pelo aplicativo instalado no computador. As telas são parecidas; o que muda é só a aparência de alguns botões.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Nas empresas, cada pessoa tem um endereço profissional (por exemplo, nome.sobrenome@empresa.com.br). Use sempre esse endereço para assuntos de trabalho, e o pessoal só para assuntos pessoais.",
        },
      ],
    },
    {
      id: "as-areas-da-tela",
      titulo: "As áreas da tela",
      blocos: [
        {
          tipo: "texto",
          texto: "Olhe a imagem abaixo. Ela mostra a janela principal do Outlook com 6 áreas numeradas. Entenda cada uma antes de começar o exercício.",
        },
        {
          tipo: "tabela",
          colunas: ["Nº", "Área", "Para que serve"],
          linhas: [
            ["1", "Painel de pastas", "Lista as pastas do e-mail: Caixa de Entrada, Rascunhos, Itens Enviados, Itens Excluídos, Lixo Eletrônico, Arquivo e as pastas que você criar."],
            ["2", "Barra de pesquisa", "Encontra mensagens pelo nome do remetente, pelo assunto ou por uma palavra do texto."],
            ["3", "Novo e-mail", "Abre a janela para escrever uma mensagem nova."],
            ["4", "Lista de mensagens", "Mostra as mensagens da pasta aberta. Em negrito estão as não lidas; a bandeira marca as sinalizadas; o clipe indica anexo."],
            ["5", "Painel de leitura", "Mostra o conteúdo da mensagem selecionada, com remetente, data, texto e anexos."],
            ["6", "Alternador de aplicativos", "Troca entre E-mail, Calendário, Pessoas (contatos) e Tarefas."],
          ],
        },
      ],
      imagem: {
        url: imagemJanela,
        alt: "Janela principal do Outlook com seis áreas numeradas: painel de pastas, barra de pesquisa, botão novo e-mail, lista de mensagens, painel de leitura e alternador de aplicativos.",
        legenda: "As 6 áreas da janela principal do Outlook (dados fictícios).",
      },
    },
    {
      id: "exercicio-explorando",
      titulo: "Exercício: explorando a caixa de entrada",
      passos: [
        "Abra o Outlook: pelo navegador, entre em outlook.office.com (ou outlook.live.com) e faça o login com o e-mail e a senha fornecidos pelo professor; ou abra o aplicativo Outlook no computador.",
        "Descubra as áreas da imagem na sua tela: ache o painel de pastas, a barra de pesquisa, o botão Novo e-mail, a lista de mensagens e o painel de leitura.",
        "Clique, uma de cada vez, nas pastas Caixa de Entrada, Rascunhos, Itens Enviados, Itens Excluídos e Lixo Eletrônico, e observe o que aparece em cada uma. Não apague nada.",
        "Volte à Caixa de Entrada e clique em uma mensagem: leia o remetente, a data e o texto no painel de leitura. Se houver anexo, clique nele para ver as opções (abrir, baixar).",
        "Use a barra de pesquisa: digite o nome de um remetente ou uma palavra do assunto e veja a lista ser filtrada. Apague a pesquisa para voltar.",
        "Use os filtros acima da lista (Todas, Não lidas, Sinalizadas). Clique com o botão direito em uma mensagem e teste Marcar como não lida e Sinalizar.",
        "Clique no alternador (item 6) e abra o Calendário e depois Pessoas. Volte para o E-mail.",
      ],
      aviso: "No computador da escola ou do trabalho, nunca salve a senha no navegador e sempre saia (Sair) quando terminar.",
      objetivo: "Reconhecer as áreas do Outlook e saber navegar entre pastas, filtros e pesquisa.",
      desafio: "Crie uma pasta nova chamada Treino (botão direito em Pastas → Criar nova pasta) e arraste para ela uma mensagem de teste.",
    },
    {
      id: "onde-fica",
      titulo: "Onde fica cada coisa?",
      instrucao: "Escolha a pasta certa para cada situação:",
      campos: [
        {
          id: "rascunho",
          rotulo: "Você começou a escrever um e-mail, mas ainda não terminou. Onde ele fica salvo?",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "entrada", texto: "Caixa de Entrada" },
              { valor: "rascunhos", texto: "Rascunhos" },
              { valor: "enviados", texto: "Itens Enviados" },
              { valor: "lixo", texto: "Lixo Eletrônico" },
            ],
            esperado: "rascunhos",
          },
          mensagemCerta: "Rascunhos guarda o que ainda não foi enviado.",
          mensagemErrada: "Pense: o e-mail ainda não saiu, então não pode estar em Enviados.",
        },
        {
          id: "enviados",
          rotulo: "Você quer conferir a cópia de um e-mail que já mandou ao gerente.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "entrada", texto: "Caixa de Entrada" },
              { valor: "rascunhos", texto: "Rascunhos" },
              { valor: "enviados", texto: "Itens Enviados" },
              { valor: "excluidos", texto: "Itens Excluídos" },
            ],
            esperado: "enviados",
          },
          mensagemCerta: "Itens Enviados guarda uma cópia de tudo o que você mandou.",
          mensagemErrada: "A cópia do que você mandou fica na pasta de enviados.",
        },
        {
          id: "excluido",
          rotulo: "Você apagou um e-mail sem querer e precisa recuperá-lo.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "entrada", texto: "Caixa de Entrada" },
              { valor: "excluidos", texto: "Itens Excluídos" },
              { valor: "enviados", texto: "Itens Enviados" },
              { valor: "arquivo", texto: "Arquivo" },
            ],
            esperado: "excluidos",
          },
          mensagemCerta: "Itens Excluídos funciona como uma lixeira: dá para restaurar de lá.",
          mensagemErrada: "O que é apagado vai para uma pasta que funciona como lixeira.",
        },
        {
          id: "spam",
          rotulo: "Uma mensagem suspeita, de remetente desconhecido, caiu automaticamente numa pasta.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "lixo", texto: "Lixo Eletrônico" },
              { valor: "rascunhos", texto: "Rascunhos" },
              { valor: "arquivo", texto: "Arquivo" },
              { valor: "enviados", texto: "Itens Enviados" },
            ],
            esperado: "lixo",
          },
          mensagemCerta: "O Outlook separa possíveis spams e golpes no Lixo Eletrônico.",
          mensagemErrada: "Procure a pasta onde ficam as mensagens suspeitas.",
        },
      ],
    },
    {
      id: "achar-mensagem",
      titulo: "Achando uma mensagem antiga",
      instrucao:
        "Seu chefe pede o e-mail que a Ana, do RH, mandou semana passada com a escala de férias. Há mais de 800 mensagens na caixa de entrada. Qual é a melhor forma de achar?",
      campos: [
        {
          id: "pesquisa",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Rolar a lista inteira, mensagem por mensagem, até achar.",
              "Digitar na barra de pesquisa o nome da Ana ou a palavra \"férias\" e usar os filtros.",
              "Pedir para a Ana mandar de novo.",
              "Apagar as mensagens antigas para a lista ficar menor.",
            ],
            correta: 1,
          },
          mensagemCerta: "A pesquisa por remetente ou palavra-chave economiza tempo.",
          mensagemErrada: "A barra de pesquisa existe justamente para isso: nome do remetente ou palavra do assunto.",
        },
      ],
    },
  ],
};

export default atividade;
