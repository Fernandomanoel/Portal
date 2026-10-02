import imagemMolde from "@/assets/atividades/outlook/molde-estrutura.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
// Os moldes usam [colchetes] para os dados que você troca; todos os nomes,
// empresas e números são fictícios.
const atividade: AtividadeAutocorrigida = {
  titulo: "Moldes de E-mails Administrativos",
  introducao:
    "No setor administrativo, muitos e-mails se repetem: pedir orçamento, enviar documentos, cobrar com educação, avisar a equipe. Com um molde pronto, você escreve mais rápido e sem esquecer nada. Aprenda a estrutura e pratique 6 moldes.",
  itens: [
    {
      id: "estrutura",
      titulo: "A estrutura de 7 blocos",
      blocos: [
        {
          tipo: "texto",
          texto:
            "Todo e-mail administrativo bem escrito segue a mesma ordem: Assunto, Saudação, Contexto, Pedido, Prazo, Encerramento e Assinatura. Veja o molde na imagem.",
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "Troque tudo o que está entre [colchetes] pelos seus dados e apague os colchetes. Releia antes de enviar para ter certeza de que não sobrou nenhum.",
        },
      ],
      imagem: {
        url: imagemMolde,
        alt: "Esquema com os 7 blocos de um e-mail administrativo: assunto, saudação, contexto, pedido, prazo, encerramento e assinatura, cada um com um exemplo.",
        legenda: "O molde de 7 blocos para e-mails administrativos.",
      },
    },
    {
      id: "molde-orcamento",
      titulo: "Molde 1 — Solicitação de orçamento",
      blocos: [{ tipo: "texto", texto: "Quando usar: pedir preço e condições a um fornecedor." }],
      codigo: {
        conteudo:
          "Assunto: Solicitação de orçamento — [produto ou serviço]\n\nPrezado(a) [nome],\n\nEscrevo em nome do setor administrativo da [empresa].\nGostaríamos de receber um orçamento de [quantidade e descrição], com valor unitário, prazo de entrega e condições de pagamento.\nPedimos o retorno até [data], às [hora].\n\nAgradeço a atenção.\n\nAtenciosamente,\n[nome]\n[cargo] — [empresa]\n[telefone]",
      },
    },
    {
      id: "molde-documentos",
      titulo: "Molde 2 — Envio de documentos",
      blocos: [{ tipo: "texto", texto: "Quando usar: mandar planilhas, contratos, notas ou relatórios como anexo." }],
      codigo: {
        conteudo:
          "Assunto: [Nome do documento] — [período ou referência]\n\nBom dia, [nome].\n\nSegue em anexo [descrição do documento], referente a [período ou assunto].\nO arquivo está no formato [PDF/Excel/Word]. Caso não consiga abrir, avise-me que reenvio em outro formato.\nPeço a gentileza de confirmar o recebimento.\n\nAtenciosamente,\n[nome]\n[cargo] — [empresa]\n[telefone]",
      },
    },
    {
      id: "molde-cobranca",
      titulo: "Molde 3 — Cobrança cordial",
      blocos: [{ tipo: "texto", texto: "Quando usar: lembrar um pagamento ou uma entrega pendente, sem ser grosseiro." }],
      codigo: {
        conteudo:
          "Assunto: Lembrete — [documento ou pagamento] com vencimento em [data]\n\nPrezado(a) [nome],\n\nIdentificamos que [descrição: a nota fiscal nº ___ / o pagamento de R$ ___] com vencimento em [data] ainda consta como pendente em nosso controle.\nSe o pagamento já foi feito, desconsidere esta mensagem e, se possível, envie o comprovante.\nCaso contrário, pedimos que informe a previsão de pagamento.\n\nFicamos à disposição.\n\nAtenciosamente,\n[nome]\n[setor] — [empresa]",
      },
    },
    {
      id: "molde-comunicado",
      titulo: "Molde 4 — Comunicado interno",
      blocos: [{ tipo: "texto", texto: "Quando usar: avisar toda a equipe sobre horário, mudança ou evento. Coloque os destinatários em Cco quando forem muitas pessoas." }],
      codigo: {
        conteudo:
          "Assunto: Comunicado — [assunto] a partir de [data]\n\nPrezados colegas,\n\nInformamos que [descrição objetiva do aviso], a partir de [data].\n[Uma frase com o motivo, se necessário.]\nEm caso de dúvidas, procurar [nome ou setor] pelo ramal [número].\n\nContamos com a colaboração de todos.\n\nAtenciosamente,\n[nome]\n[cargo] — [empresa]",
      },
    },
    {
      id: "molde-confirmacao",
      titulo: "Molde 5 — Confirmação de recebimento",
      blocos: [{ tipo: "texto", texto: "Quando usar: responder que você recebeu um documento ou um pedido. É curto e evita dúvidas." }],
      codigo: {
        conteudo:
          "Assunto: Re: [assunto original] — recebido\n\nBom dia, [nome].\n\nConfirmo o recebimento de [documento/pedido] em [data].\nVou [o que será feito] e retorno até [data].\n\nAtenciosamente,\n[nome]\n[cargo] — [empresa]",
      },
    },
    {
      id: "molde-esclarecimento",
      titulo: "Molde 6 — Pedido de esclarecimento",
      blocos: [{ tipo: "texto", texto: "Quando usar: pedir uma informação que faltou ou que ficou confusa." }],
      codigo: {
        conteudo:
          "Assunto: Dúvida sobre [assunto] — [referência]\n\nPrezado(a) [nome],\n\nAo analisar [documento ou pedido], surgiu uma dúvida: [pergunta objetiva, em uma frase].\nPara concluirmos [a tarefa], precisamos dessa informação até [data].\n\nDesde já, agradeço.\n\nAtenciosamente,\n[nome]\n[cargo] — [empresa]",
      },
    },
    {
      id: "exercicio-moldes",
      titulo: "Exercício: preencha e envie 3 moldes",
      cenario: "Você trabalha no setor administrativo da Empresa Alfa Ltda (empresa fictícia). Use dados inventados, mas coerentes.",
      passos: [
        "Escolha 3 dos 6 moldes acima (um deles precisa ser o Molde 1 ou o Molde 2).",
        "No Outlook, abra um Novo e-mail para cada molde. Copie o texto do molde, cole no corpo do e-mail e o assunto no campo Assunto.",
        "Troque todos os [colchetes] por dados inventados (nomes, datas, valores, quantidades). Apague os colchetes. Não deixe nenhum [campo] sem trocar.",
        "No Molde 2, anexe um arquivo de verdade (o que você preferir) e confira se o nome dele aparece citado no texto.",
        "No campo Para, use o e-mail do professor nos três e-mails. No Molde 4, use o campo Cco para o professor e o seu próprio e-mail em Para.",
        "Releia os três e-mails: a assinatura está completa? O assunto está claro? Existe prazo?",
        "Envie os três e-mails e confira se as cópias estão em Itens Enviados.",
      ],
      aviso: "Nunca envie dados reais de clientes, senhas ou documentos pessoais em atividades de treino.",
      objetivo: "Adaptar moldes de e-mail administrativo a uma situação e enviar mensagens profissionais completas.",
      desafio: "Crie um modelo seu: escreva um e-mail para uma situação de rotina (por exemplo, agendar visita ou pedir 2ª via de boleto) e salve como rascunho na pasta Modelos.",
    },
    {
      id: "qual-molde",
      titulo: "Qual molde usar?",
      instrucao: "Escolha o molde mais adequado para cada situação:",
      campos: [
        {
          id: "situacao-1",
          rotulo: "O fornecedor não respondeu o pedido de preços e a data limite passou.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "orcamento", texto: "Solicitação de orçamento" },
              { valor: "cobranca", texto: "Cobrança cordial (lembrete)" },
              { valor: "comunicado", texto: "Comunicado interno" },
              { valor: "confirmacao", texto: "Confirmação de recebimento" },
            ],
            esperado: "cobranca",
          },
          mensagemCerta: "Isso mesmo: um lembrete educado cobra a resposta sem criar atrito.",
          mensagemErrada: "O pedido já foi feito; agora falta lembrar o fornecedor da resposta.",
        },
        {
          id: "situacao-2",
          rotulo: "Um colega mandou um contrato por e-mail e você quer avisar que chegou.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "orcamento", texto: "Solicitação de orçamento" },
              { valor: "cobranca", texto: "Cobrança cordial (lembrete)" },
              { valor: "comunicado", texto: "Comunicado interno" },
              { valor: "confirmacao", texto: "Confirmação de recebimento" },
            ],
            esperado: "confirmacao",
          },
          mensagemCerta: "Confirmar o recebimento deixa o colega tranquilo e deixa o registro.",
          mensagemErrada: "Você só precisa dizer que recebeu e quando dará retorno.",
        },
        {
          id: "situacao-3",
          rotulo: "A empresa vai fechar mais cedo na sexta-feira e precisa avisar todos os funcionários.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "orcamento", texto: "Solicitação de orçamento" },
              { valor: "cobranca", texto: "Cobrança cordial (lembrete)" },
              { valor: "comunicado", texto: "Comunicado interno" },
              { valor: "esclarecimento", texto: "Pedido de esclarecimento" },
            ],
            esperado: "comunicado",
          },
          mensagemCerta: "Aviso a toda a equipe é um comunicado interno.",
          mensagemErrada: "É um aviso geral, sem pedido de preço nem cobrança.",
        },
        {
          id: "situacao-4",
          rotulo: "Na nota fiscal faltou o CNPJ do destinatário e você precisa dessa informação para lançar a nota.",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "orcamento", texto: "Solicitação de orçamento" },
              { valor: "comunicado", texto: "Comunicado interno" },
              { valor: "confirmacao", texto: "Confirmação de recebimento" },
              { valor: "esclarecimento", texto: "Pedido de esclarecimento" },
            ],
            esperado: "esclarecimento",
          },
          mensagemCerta: "Quando falta uma informação, o certo é pedir esclarecimento.",
          mensagemErrada: "Você precisa fazer uma pergunta objetiva para completar a informação que falta.",
        },
      ],
    },
    {
      id: "complete-molde",
      titulo: "Complete o encerramento",
      instrucao: "Escreva uma frase de encerramento adequada para um e-mail formal, antes da assinatura (por exemplo, com um agradecimento e a despedida).",
      campos: [
        {
          id: "encerramento",
          placeholder: "Ex.: Agradeço a atenção. Atenciosamente,",
          regra: {
            tipo: "texto",
            minPalavras: 2,
            minCaracteres: 10,
            palavrasChave: /agrade|atenciosamente|cordialmente|grato|grata|obrigad/i,
          },
          mensagemCerta: "Encerramento educado e formal!",
          mensagemErrada: "Use um agradecimento ou uma despedida formal, como Atenciosamente ou Cordialmente.",
        },
      ],
    },
  ],
};

export default atividade;
