import imagemAssinatura from "@/assets/atividades/outlook/assinatura-configuracoes.svg";
import imagemResposta from "@/assets/atividades/outlook/resposta-automatica.svg";
import imagemRegra from "@/assets/atividades/outlook/regra-e-pastas.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
// Caminhos dos menus conforme o Outlook na web / novo Outlook; no aplicativo
// instalado os nomes podem variar um pouco.
const atividade: AtividadeAutocorrigida = {
  titulo: "Assinatura, Resposta Automática e Regras no Outlook",
  introducao:
    "Três recursos fazem o Outlook trabalhar por você: a assinatura que se coloca sozinha, a resposta automática para quando você estiver ausente e as regras que organizam as mensagens que chegam.",
  itens: [
    {
      id: "assinatura",
      titulo: "1. Assinatura de e-mail",
      blocos: [
        {
          tipo: "texto",
          texto:
            "A assinatura é o bloco com seu nome e contatos no fim do e-mail. Cadastrada uma vez, ela é colocada automaticamente em cada mensagem, sempre no mesmo padrão.",
        },
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Clique na engrenagem (Configurações), no canto superior direito.",
            "Vá em Email → Redigir e responder.",
            "Em Assinatura de email, dê um nome à assinatura (por exemplo, Padrão) e digite: nome completo (em negrito), cargo, empresa, telefone e e-mail.",
            "Em Assinatura padrão, escolha a assinatura para Novas mensagens e para Respostas e encaminhamentos.",
            "Marque Incluir minha assinatura nas mensagens que eu enviar e clique em Salvar.",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Assinatura profissional é curta: nome, cargo, empresa e um telefone. Evite frases de efeito, fotos grandes e várias cores.",
        },
      ],
      imagem: {
        url: imagemAssinatura,
        alt: "Tela de Configurações do Outlook em Email, Redigir e responder, mostrando o editor de assinatura com nome, cargo, empresa, telefone e e-mail, as listas de assinatura padrão e a caixa de incluir assinatura marcada.",
        legenda: "Configurações → Email → Redigir e responder (dados fictícios).",
      },
    },
    {
      id: "exercicio-assinatura",
      titulo: "Exercício: crie a sua assinatura",
      passos: [
        "Abra Configurações → Email → Redigir e responder.",
        "Crie uma assinatura com o seu nome completo em negrito, o cargo Aluno(a) do curso de Informática, o nome da escola e o seu telefone fictício.",
        "Escolha essa assinatura como padrão para novas mensagens e para respostas e encaminhamentos, e marque a caixa para incluir nas mensagens enviadas. Clique em Salvar.",
        "Abra um Novo e-mail e confira se a assinatura aparece sozinha no final. Se não aparecer, volte e confira as caixas marcadas.",
        "Envie um e-mail de teste ao professor com o assunto Teste de assinatura — [seu nome].",
      ],
      objetivo: "Criar e ativar uma assinatura profissional que se insere sozinha nas mensagens.",
    },
    {
      id: "resposta-automatica",
      titulo: "2. Resposta automática",
      blocos: [
        {
          tipo: "texto",
          texto:
            "Quando você estiver de férias, afastado ou fora do escritório, a resposta automática avisa quem escreve que você não vai responder logo e diz quem pode ajudar. Assim ninguém fica sem resposta.",
        },
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Clique na engrenagem (Configurações) → Email → Respostas automáticas.",
            "Ative Ativar respostas automáticas.",
            "Marque Enviar respostas somente durante um período e informe início e término.",
            "Escreva a mensagem: até quando você está ausente, quando volta, e quem atende em caso de urgência (com e-mail).",
            "Escolha se a resposta vai só para pessoas da organização ou também para externos. Clique em Salvar.",
          ],
        },
      ],
      imagem: {
        url: imagemResposta,
        alt: "Tela de respostas automáticas do Outlook com o interruptor ligado, período de 16 a 27 de março, mensagem de férias com contato de urgência e opção de responder só a pessoas da organização.",
        legenda: "Respostas automáticas ligadas só durante o período de férias (dados fictícios).",
      },
      aviso: "Lembre de desligar a resposta automática quando voltar, ou marque um período com data de término.",
    },
    {
      id: "exercicio-resposta",
      titulo: "Exercício: escreva uma resposta automática",
      cenario: "Você vai passar uma semana fora (use datas inventadas). Seu colega de setor, Carlos Lima, atende as urgências.",
      passos: [
        "Abra o Word ou o Bloco de Notas.",
        "Escreva o assunto e o texto da resposta automática: diga o período de ausência, a data de retorno e o contato de urgência, em tom formal.",
        "No Outlook, abra Respostas automáticas e preencha o texto, com período definido. Não clique em Salvar neste computador se o professor pedir para só testar.",
        "Tire um print da tela das respostas automáticas preenchidas (Windows + Shift + S) e mostre ao professor.",
      ],
      objetivo: "Configurar uma resposta automática clara, com período, retorno e contato de urgência.",
    },
    {
      id: "regras",
      titulo: "3. Pastas e regras",
      blocos: [
        {
          tipo: "texto",
          texto:
            "Pastas organizam a caixa de entrada por assunto (Financeiro, RH, Clientes). Regras movem sozinhas as mensagens para a pasta certa assim que chegam, como se fosse um assistente.",
        },
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "Crie uma pasta: botão direito em Minhas pastas → Criar nova pasta → nome Financeiro.",
            "Abra Configurações → Email → Regras → Adicionar nova regra.",
            "Dê um nome (por exemplo, Notas fiscais do financeiro).",
            "Condição: Mensagem de [endereço de e-mail do remetente]. Ação: Mover para a pasta Financeiro.",
            "Marque Parar de processar mais regras e clique em Salvar.",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Para organizar mensagens que já estão na caixa, clique com o botão direito em uma delas → Regras → Criar regra, ou arraste para a pasta.",
        },
      ],
      imagem: {
        url: imagemRegra,
        alt: "Tela de criação de regra do Outlook com nome, condição de remetente, ação de mover para a pasta Financeiro e ao lado o resultado, com as novas mensagens dentro da pasta Financeiro.",
        legenda: "Uma regra que move as mensagens do financeiro para a pasta certa (dados fictícios).",
      },
    },
    {
      id: "perguntas-assinatura",
      titulo: "Teste rápido: assinatura",
      instrucao: "Qual das assinaturas abaixo é a mais profissional para uma mensagem de trabalho?",
      campos: [
        {
          id: "assinatura-certa",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Marcos :)  — \"Quem não arrisca não petisca\"",
              "Marcos Oliveira — Assistente Administrativo — Empresa Alfa Ltda — (92) 90000-0000",
              "enviado do meu celular",
              "Marcão da Alfa!!! Me liga!!!",
            ],
            correta: 1,
          },
          mensagemCerta: "Nome, cargo, empresa e telefone: é só isso que a assinatura precisa.",
          mensagemErrada: "A assinatura profissional é curta e traz nome, cargo, empresa e contato.",
        },
      ],
    },
    {
      id: "perguntas-resposta",
      titulo: "Teste rápido: resposta automática",
      instrucao: "O que NÃO pode faltar numa resposta automática de férias?",
      campos: [
        {
          id: "resposta-certa",
          rotulo: "Escolha o item que NÃO é essencial:",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "periodo", texto: "O período da ausência e a data de retorno" },
              { valor: "contato", texto: "Um contato para urgências" },
              { valor: "destino", texto: "O destino da viagem e o hotel onde você está" },
              { valor: "despedida", texto: "Uma saudação e uma despedida formais" },
            ],
            esperado: "destino",
          },
          mensagemCerta: "Isso mesmo: o destino da viagem é informação pessoal e não ajuda quem escreve.",
          mensagemErrada: "Procure a informação que é pessoal e não ajuda o remetente.",
        },
      ],
    },
    {
      id: "perguntas-regra",
      titulo: "Teste rápido: regras",
      instrucao: "A empresa recebe dezenas de notas fiscais por dia do mesmo fornecedor e elas se misturam na caixa de entrada. Qual é a melhor solução?",
      campos: [
        {
          id: "regra-certa",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Apagar todas as notas ao fim do dia.",
              "Criar uma pasta Financeiro e uma regra que mova automaticamente as mensagens desse fornecedor para ela.",
              "Responder a cada nota com uma resposta automática.",
              "Encaminhar tudo para o chefe.",
            ],
            correta: 1,
          },
          mensagemCerta: "Pasta + regra é o jeito de manter a caixa de entrada limpa sem perder nada.",
          mensagemErrada: "Pense em como o Outlook pode organizar sozinho o que chega todo dia do mesmo remetente.",
        },
      ],
    },
  ],
};

export default atividade;
