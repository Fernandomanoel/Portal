import imagemConvite from "@/assets/atividades/outlook/convite-reuniao.svg";
import imagemPhishing from "@/assets/atividades/outlook/sinais-phishing.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
const atividade: AtividadeAutocorrigida = {
  titulo: "Convites de Reunião e Segurança no E-mail",
  introducao:
    "No trabalho, o Outlook também marca reuniões e é o principal caminho dos golpes. Nesta atividade você vai enviar um convite de reunião profissional e aprender a reconhecer um e-mail falso (phishing).",
  itens: [
    {
      id: "convite",
      titulo: "1. Convite de reunião",
      blocos: [
        {
          tipo: "texto",
          texto:
            "Marcar reunião por e-mail solto gera confusão de horário. O convite do calendário do Outlook reserva a agenda de todos, avisa quando algo mudar e permite aceitar, recusar ou propor outro horário.",
        },
        {
          tipo: "lista",
          numerada: true,
          itens: [
            "No alternador, abra o Calendário e clique em Novo evento (ou Nova reunião).",
            "Escreva um Título claro, por exemplo: Alinhamento do fechamento mensal.",
            "Em Participantes, coloque os e-mails. Marque como opcionais quem não precisa estar presente.",
            "Defina data, hora de início e término. Escolha o Local: uma sala ou Reunião do Teams (reunião online).",
            "No corpo, escreva a pauta: objetivo e 2 ou 3 itens, e peça a resposta ao convite.",
            "Clique em Enviar. Cada convidado recebe um e-mail com os botões Aceitar, Recusar e Propor novo horário.",
          ],
        },
      ],
      imagem: {
        url: imagemConvite,
        alt: "Janela de nova reunião do calendário do Outlook com título, participantes, data e hora, local, e pauta com três itens no corpo, cada parte explicada por uma legenda.",
        legenda: "Convite de reunião com título, participantes, horário, local e pauta (dados fictícios).",
      },
    },
    {
      id: "exercicio-convite",
      titulo: "Exercício: envie um convite",
      cenario: "Você é assistente administrativo(a) e vai marcar uma reunião de 30 minutos com o professor e um colega (use o e-mail do professor e o do colega).",
      passos: [
        "Abra o Calendário e crie um Novo evento com um título claro.",
        "Adicione o professor e um colega como participantes. Escolha um dia e um horário de 30 minutos.",
        "Escolha o local: uma sala fictícia ou a reunião online do Teams.",
        "No corpo, escreva: objetivo da reunião, a pauta em 3 itens numerados e um pedido para confirmarem presença.",
        "Clique em Enviar. Depois, abra o Calendário e confira o evento na data marcada.",
        "Peça ao colega que responda ao convite com Aceitar, Recusar ou Propor novo horário e veja a resposta chegar à sua caixa de entrada.",
      ],
      aviso: "Antes de enviar, confira data, horário e fuso: é o erro mais comum nos convites.",
      objetivo: "Criar e enviar um convite de reunião profissional, com pauta e horário claros.",
    },
    {
      id: "pauta",
      titulo: "O que não pode faltar no convite?",
      instrucao: "Qual convite está mais bem montado?",
      campos: [
        {
          id: "convite-certo",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Título: Reunião — Corpo: (vazio) — Horário: não informado",
              "Título: Alinhamento do fechamento mensal — Segunda, 09/03, 9h às 9h30 — Sala 2 — Pauta: 1) lançamentos, 2) notas pendentes, 3) responsáveis",
              "Título: URGENTE!!! — Corpo: venham todos — Horário: o quanto antes",
              "Título: oi — Corpo: vamos conversar? — Local: depois vemos",
            ],
            correta: 1,
          },
          mensagemCerta: "Título claro, dia e hora, local e pauta: assim todos sabem o que vão fazer ali.",
          mensagemErrada: "Procure o convite com título claro, horário, local e pauta.",
        },
      ],
    },
    {
      id: "phishing",
      titulo: "2. Segurança: e-mail falso (phishing)",
      blocos: [
        {
          tipo: "texto",
          texto:
            "Phishing é um e-mail falso que imita um banco, uma empresa ou um colega para roubar senhas, dados e dinheiro. Ele funciona porque causa pressa e medo. Antes de clicar, olhe os sinais da imagem.",
        },
        {
          tipo: "tabela",
          colunas: ["Sinal", "O que fazer"],
          linhas: [
            ["Remetente estranho (endereço com letras trocadas ou domínio esquisito)", "Confira o endereço completo, não só o nome que aparece."],
            ["Urgência e ameaça (\"sua conta será bloqueada\")", "Desconfie. Entre no site oficial digitando você mesmo o endereço."],
            ["Saudação genérica (\"Prezado cliente\")", "Empresas de verdade costumam usar o seu nome."],
            ["Erros de português e frases estranhas", "É sinal de golpe ou tradução automática. Não responda."],
            ["Link encurtado ou diferente do texto", "Passe o mouse (sem clicar) e leia o endereço real."],
            ["Anexo .exe, .zip ou macro que você não esperava", "Não abra. Pergunte a quem supostamente enviou, por outro canal."],
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Recebeu um e-mail suspeito no trabalho? Não clique, não responda e avise o setor de TI. Se já clicou ou digitou a senha, avise na hora e troque a senha.",
        },
      ],
      imagem: {
        url: imagemPhishing,
        alt: "E-mail falso de um banco com seis sinais de golpe numerados: remetente estranho, urgência e ameaça, saudação genérica, erros de português, link encurtado e anexo executável.",
        legenda: "Seis sinais de um e-mail de phishing (dados fictícios).",
      },
    },
    {
      id: "exercicio-phishing",
      titulo: "Exercício: detetive de e-mails",
      passos: [
        "Abra a pasta Lixo Eletrônico do seu Outlook (ou a pasta de spam do e-mail que você usa) e olhe 3 mensagens, sem clicar em links nem abrir anexos.",
        "Para cada mensagem, anote no caderno: quem é o remetente, qual é o assunto e quais sinais de phishing da imagem ela apresenta.",
        "Para um e-mail desconhecido, passe o mouse sobre o link (sem clicar) e leia o endereço que aparece embaixo da tela.",
        "No e-mail que você acha suspeito, clique com o botão direito → Denunciar → Denunciar como phishing.",
      ],
      aviso: "Nunca clique em links nem abra anexos de e-mails suspeitos, nem para \"ver o que é\".",
      objetivo: "Identificar sinais de phishing e saber o que fazer ao receber um e-mail suspeito.",
    },
    {
      id: "sinais",
      titulo: "É sinal de phishing?",
      instrucao: "Marque V (verdadeiro) ou F (falso) para cada afirmação:",
      campos: [
        {
          id: "vf-urgencia",
          rotulo: "1. Um e-mail que diz \"você tem 24 horas ou sua conta será cancelada\" usa pressa e ameaça para você agir sem pensar.",
          regra: { tipo: "selecao", opcoes: [{ valor: "V", texto: "Verdadeiro" }, { valor: "F", texto: "Falso" }], esperado: "V" },
          mensagemCerta: "Correto: pressa e medo são as principais armas do golpe.",
          mensagemErrada: "Pressa e ameaça são sinais clássicos de golpe.",
        },
        {
          id: "vf-nome",
          rotulo: "2. Se o nome do remetente aparece certinho (por exemplo, \"Banco do Brasil\"), o e-mail é seguro, mesmo que o endereço seja estranho.",
          regra: { tipo: "selecao", opcoes: [{ valor: "V", texto: "Verdadeiro" }, { valor: "F", texto: "Falso" }], esperado: "F" },
          mensagemCerta: "Correto: o nome pode ser falsificado; confira o endereço completo.",
          mensagemErrada: "O nome é fácil de imitar. O que vale é o endereço completo do remetente.",
        },
        {
          id: "vf-link",
          rotulo: "3. Passar o mouse sobre o link, sem clicar, mostra o endereço real de destino.",
          regra: { tipo: "selecao", opcoes: [{ valor: "V", texto: "Verdadeiro" }, { valor: "F", texto: "Falso" }], esperado: "V" },
          mensagemCerta: "Correto: o endereço real aparece no canto da tela.",
          mensagemErrada: "Sim, o endereço real aparece quando o mouse passa sobre o link.",
        },
        {
          id: "vf-anexo",
          rotulo: "4. Anexo com final .exe enviado por um desconhecido é seguro, desde que o antivírus esteja ligado.",
          regra: { tipo: "selecao", opcoes: [{ valor: "V", texto: "Verdadeiro" }, { valor: "F", texto: "Falso" }], esperado: "F" },
          mensagemCerta: "Correto: arquivo .exe de origem duvidosa nunca deve ser aberto.",
          mensagemErrada: "Arquivo executável de desconhecido é perigoso mesmo com antivírus.",
        },
      ],
    },
    {
      id: "conduta",
      titulo: "O que fazer com um e-mail suspeito?",
      instrucao: "Você recebeu um e-mail do suposto \"banco\" pedindo sua senha. Qual é a conduta correta?",
      campos: [
        {
          id: "conduta-certa",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Clicar no link para ver se é de verdade.",
              "Responder pedindo mais informações.",
              "Não clicar nem responder, denunciar como phishing e, no trabalho, avisar o setor de TI.",
              "Encaminhar a todos os colegas para alertá-los, com o link ativo.",
            ],
            correta: 2,
          },
          mensagemCerta: "Certo: não interagir, denunciar e avisar o responsável por segurança.",
          mensagemErrada: "Evite qualquer interação com o e-mail: não clique, não responda e não encaminhe o link.",
        },
        {
          id: "escreva-sinal",
          rotulo: "Escreva em uma frase um sinal que faria você desconfiar do e-mail:",
          placeholder: "Ex.: o endereço do remetente é diferente do site oficial do banco.",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /remetente|endere[cç]o|link|anexo|urg[eê]n|amea[cç]|erro|portugu[eê]s|gen[eé]ric|prezado|senha|dados/i,
          },
          mensagemCerta: "Boa observação!",
          mensagemErrada: "Cite um sinal: remetente, link, urgência, erros de português, saudação genérica ou anexo estranho.",
        },
      ],
    },
  ],
};

export default atividade;
