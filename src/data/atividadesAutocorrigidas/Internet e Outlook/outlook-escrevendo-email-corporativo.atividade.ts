import imagemAnatomia from "@/assets/atividades/outlook/anatomia-email.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
const atividade: AtividadeAutocorrigida = {
  titulo: "Escrevendo e Enviando um E-mail Corporativo",
  introducao:
    "E-mail de trabalho não é mensagem de celular: ele é lido por chefes, colegas e clientes e fica registrado. Aprenda as partes de um e-mail profissional e envie o seu primeiro.",
  itens: [
    {
      id: "partes-do-email",
      titulo: "As partes de um e-mail",
      blocos: [
        {
          tipo: "texto",
          texto: "Observe o e-mail abaixo, já preenchido. Cada campo tem uma função e um jeito certo de usar.",
        },
        {
          tipo: "tabela",
          colunas: ["Campo", "Para que serve", "Como usar"],
          linhas: [
            ["Para", "Quem precisa agir ou responder.", "Um ou mais endereços, separados por ponto e vírgula. Confira cada letra do endereço."],
            ["Cc (com cópia)", "Quem só precisa ficar ciente.", "Todos os destinatários veem quem está em cópia. Use com moderação."],
            ["Cco (cópia oculta)", "Quem recebe sem que os outros vejam.", "Use para avisos a muitas pessoas, como clientes, para não expor os endereços."],
            ["Assunto", "Resume o e-mail em poucas palavras.", "Específico e com a ação esperada. Evite \"Oi\", \"Urgente!!!\" ou deixar em branco."],
            ["Corpo", "O texto da mensagem.", "Saudação, o que você precisa, prazo e despedida. Parágrafos curtos."],
            ["Assinatura", "Identifica quem enviou.", "Nome, cargo, empresa e telefone, sempre no mesmo padrão."],
            ["Anexo", "Arquivo enviado junto.", "Cite o anexo no texto e confira o arquivo antes de enviar."],
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "No campo Para, nunca coloque endereços de pessoas que não deveriam se conhecer. Quando o aviso vai para vários clientes, use o campo Cco.",
        },
      ],
      imagem: {
        url: imagemAnatomia,
        alt: "Janela de novo e-mail com os campos Para, Cc, Cco, Assunto, corpo do texto, assinatura e anexo, cada um explicado por uma legenda.",
        legenda: "Um e-mail corporativo completo, com cada parte explicada (dados fictícios).",
      },
    },
    {
      id: "tom-e-linguagem",
      titulo: "Tom e linguagem",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Evite", "Prefira"],
          linhas: [
            ["oi gente, preciso daquilo urgente!!!", "Bom dia, Joana. Preciso do relatório de vendas até sexta-feira, às 17h."],
            ["vc consegue ver isso pra mim?", "Você consegue verificar essa informação até amanhã?"],
            ["TUDO EM LETRAS MAIÚSCULAS", "Use maiúsculas só onde a regra pede (nomes e início de frase)."],
            ["Atenciosamente (sem nome embaixo)", "Atenciosamente, + assinatura completa."],
          ],
        },
        {
          tipo: "lista",
          itens: [
            "Cumprimente de acordo com o horário: Bom dia, Boa tarde ou Boa noite. Use o nome da pessoa.",
            "Escreva uma ideia por parágrafo e um assunto por e-mail.",
            "Releia antes de enviar: nomes, datas, valores, anexo e ortografia.",
            "Despeça-se com Atenciosamente, Cordialmente ou Grato(a).",
          ],
        },
      ],
    },
    {
      id: "exercicio-enviando",
      titulo: "Exercício: enviando seu primeiro e-mail corporativo",
      cenario: "Você é assistente administrativo(a) e precisa enviar um relatório ao seu gerente (use o e-mail do professor no lugar do gerente).",
      passos: [
        "No Outlook, clique em Novo e-mail.",
        "No campo Para, digite o e-mail indicado pelo professor. No campo Cc, coloque o seu próprio e-mail.",
        "No campo Assunto, escreva um assunto claro, por exemplo: Relatório de vendas de fevereiro — para aprovação.",
        "No corpo, escreva uma saudação com o nome do destinatário, uma frase dizendo o que está anexado, o prazo que você precisa e uma despedida formal.",
        "Clique em Anexar e escolha um arquivo qualquer (um documento do Word ou uma imagem). Confira se o nome do arquivo aparece embaixo do texto.",
        "Releia tudo, procurando erros. Só depois clique em Enviar.",
        "Abra Itens Enviados e confira se a cópia está lá. Depois, confirme com o professor se ele recebeu.",
      ],
      aviso: "Se o professor pedir para você enviar um e-mail a vários colegas, use o campo Cco para não mostrar os endereços de todos.",
      objetivo: "Montar e enviar um e-mail corporativo completo, com anexo, cópia e assunto claros.",
    },
    {
      id: "cc-ou-cco",
      titulo: "Cc ou Cco?",
      instrucao:
        "A empresa vai avisar 50 clientes sobre uma mudança de horário. Os clientes não se conhecem, e a empresa não pode mostrar os e-mails de uns para os outros. Onde colocar os endereços dos clientes?",
      campos: [
        {
          id: "cco",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "para", texto: "No campo Para, todos juntos" },
              { valor: "cc", texto: "No campo Cc (com cópia)" },
              { valor: "cco", texto: "No campo Cco (cópia oculta)" },
              { valor: "assunto", texto: "No campo Assunto" },
            ],
            esperado: "cco",
          },
          mensagemCerta: "Certo: em Cco ninguém vê os endereços dos outros, o que também protege os dados dos clientes.",
          mensagemErrada: "Em Para e em Cc todos os destinatários veem os endereços uns dos outros. Qual campo esconde?",
        },
      ],
    },
    {
      id: "assunto-bom",
      titulo: "Qual é o melhor assunto?",
      instrucao: "Você vai enviar ao gerente a planilha de vendas de março. Qual assunto é o mais adequado?",
      campos: [
        {
          id: "assunto",
          regra: {
            tipo: "multipla_escolha",
            opcoes: ["Oi", "URGENTE!!!", "Planilha de vendas de março — para conferência", "(sem assunto)"],
            correta: 2,
          },
          mensagemCerta: "Esse assunto diz o que é (planilha de vendas), o período (março) e o que se espera (conferência).",
          mensagemErrada: "Procure o assunto que diz o conteúdo, o período e o que se espera da pessoa.",
        },
      ],
    },
    {
      id: "escreva-assunto",
      titulo: "Escreva você mesmo(a)",
      instrucao:
        "Escreva um bom assunto para um e-mail que envia a ata da reunião de segunda-feira à equipe.",
      campos: [
        {
          id: "assunto-ata",
          placeholder: "Ex.: Ata da reunião de segunda-feira (09/03)",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
            palavrasChave: /ata|reuni/i,
          },
          mensagemCerta: "Assunto claro e específico!",
          mensagemErrada: "Cite o que é o e-mail (a ata) e a reunião a que ele se refere, em pelo menos 3 palavras.",
        },
      ],
    },
  ],
};

export default atividade;
