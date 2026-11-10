import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../auxiliarMedicoComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Auxiliar Médico — Atendimento ao Cidadão",
  introducao:
    "Quem procura um serviço de saúde geralmente está com dor, medo ou pressa. O primeiro rosto que encontra é o seu, e a forma como é recebido muda a experiência inteira. Aqui você treina quem atender primeiro, como ouvir de verdade, como falar em linguagem simples, o que o sigilo permite dizer e como responder a uma reclamação sem perder a calma.",
  itens: [
    comFigura(
      escolha({
        id: "ordem-de-atendimento",
        titulo: "Quem é atendido primeiro",
        blocos: [
          { tipo: "texto", texto: "A lei garante atendimento prioritário a pessoas idosas (60 anos ou mais, com prioridade especial para quem tem 80 ou mais), gestantes, lactantes, pessoas com deficiência e pessoas com criança de colo. Dentro desse grupo, vale a ordem de chegada. E existe uma exceção que passa na frente de todos: a urgência clínica." },
          { tipo: "nota", variante: "aviso", texto: "Urgência não é prioridade de fila: é situação de risco. Dor forte no peito, falta de ar, desmaio e sangramento exigem avisar o médico ou a equipe na hora, sem esperar a vez." },
        ],
        instrucao: "Na recepção aguardam: um idoso de 65 anos, uma gestante, um adulto sem prioridade, uma idosa de 83 anos e um homem que acabou de chegar com dor forte no peito e suor frio. A quem você dirige a atenção primeiro?",
        opcoes: ["Ao homem com dor no peito: avisa o médico ou a equipe imediatamente.", "À idosa de 83 anos, por ser a mais velha.", "À gestante, por estar esperando há mais tempo.", "Ao adulto sem prioridade, que chegou primeiro de todos."],
        correta: 0,
        explicacao: "Sinal de alerta vem antes de qualquer fila. Depois dele, atendem-se os prioritários por ordem de chegada e só então os demais.",
      }),
      figura("prioridade-fila", "Seis pessoas numeradas em fila — idosa de 82 anos, gestante, pessoa com deficiência, adulto com bebê, idoso de 65 anos e adulto — e uma caixa sobre urgência clínica.", "Quem tem prioridade e a exceção da urgência."),
    ),
    comFigura(
      escolha({
        id: "escuta-ativa",
        titulo: "Escutar de verdade",
        blocos: [
          { tipo: "texto", texto: "Escutar não é esperar a outra pessoa terminar para falar. A escuta ativa tem quatro gestos simples:" },
          { tipo: "lista", numerada: true, itens: ["Olhar e cumprimentar, deixando de lado o que estava fazendo.", "Ouvir até o fim, sem interromper nem completar a frase.", "Repetir com as suas palavras (\"Entendi que o senhor está sentindo...\") para conferir se entendeu.", "Orientar o próximo passo: dizer o que vai acontecer agora."] },
        ],
        instrucao: "Uma paciente fala sem parar sobre o que sentiu e você já entendeu o que ela quer. Qual é a melhor atitude?",
        opcoes: ["Ouvir até o fim e repetir com suas palavras para conferir se entendeu direito.", "Interromper e dizer \"já entendi\" para ganhar tempo.", "Olhar o computador enquanto ela fala, para adiantar o trabalho.", "Mudar de assunto para acabar a conversa."],
        correta: 0,
        explicacao: "Repetir com as próprias palavras mostra respeito e evita erro: às vezes o que você entendeu não era o que a pessoa queria dizer.",
      }),
      figura("escuta-ativa", "Um paciente pergunta com palavras vagas e a atendente responde com calma; embaixo, os quatro gestos da escuta ativa.", "Os quatro gestos da escuta ativa."),
    ),
    associar({
      id: "linguagem-simples",
      titulo: "Dizendo de um jeito que todos entendem",
      blocos: [
        { tipo: "texto", texto: "Palavra de consultório pode soar como outra língua. Troque o termo técnico por uma frase curta e confira se a pessoa entendeu: \"Ficou claro? Quer que eu repita?\"" },
      ],
      instrucao: "Ligue cada termo à explicação em linguagem simples.",
      opcoes: ["Ficar sem comer e sem beber (só água, se o consultório permitir) pelo tempo combinado", "Nova consulta, mais rápida, para o médico acompanhar como a pessoa está", "Papel que o convênio dá para liberar o exame ou o procedimento", "A primeira vez que a pessoa é atendida por aquele médico"],
      linhas: [
        { id: "jejum", rotulo: "Jejum", correta: 0 },
        { id: "retorno", rotulo: "Retorno", correta: 1 },
        { id: "guia", rotulo: "Guia de autorização", correta: 2 },
        { id: "primeira", rotulo: "Primeira consulta", correta: 3 },
      ],
      explicacao: "Quem entende a orientação cumpre a orientação: o preparo certo evita remarcar exame e consulta.",
    }),
    comFigura(
      associar({
        id: "pode-ou-nao-pode",
        titulo: "Sigilo no balcão e no telefone",
        blocos: [
          { tipo: "texto", texto: "Informação de saúde é dado pessoal sensível: a lei de proteção de dados (LGPD) e a ética da profissão exigem sigilo. Na prática, o balcão e o telefone são os lugares onde mais se quebra o sigilo sem perceber." },
        ],
        instrucao: "Marque se cada situação é permitida ou não.",
        opcoes: ["Pode", "Não pode"],
        linhas: [
          { id: "horario", rotulo: "Confirmar o horário da consulta com o próprio paciente", correta: 0 },
          { id: "marido", rotulo: "Um homem liga dizendo ser marido da paciente e pede o resultado do exame", correta: 1 },
          { id: "voz-alta", rotulo: "Perguntar em voz alta, na sala cheia, o motivo da consulta", correta: 1 },
          { id: "documentos", rotulo: "Dizer a qualquer pessoa quais documentos levar na consulta", correta: 0 },
        ],
        explicacao: "Resultado e motivo só se informam ao próprio paciente (ou a quem ele autorizou). Orientações gerais, como documentos, não revelam nada sobre a saúde de ninguém.",
      }),
      figura("sigilo-balcao", "Duas colunas, Pode em verde e Não pode em vermelho, com cinco exemplos de cada.", "O que pode e o que não pode no balcão."),
    ),
    escolha({
      id: "reclamacao",
      titulo: "A reclamação da espera",
      cenario: "Já passou meia hora do horário marcado e o médico está atrasado por uma urgência. Um paciente se aproxima do balcão aborrecido: \"É um absurdo, marquei para as 9 e já são 9h30!\"",
      instrucao: "Qual resposta acolhe sem piorar a situação?",
      opcoes: [
        "\"Entendo o seu aborrecimento e peço desculpas pela espera. O médico atendeu uma urgência; a previsão é de mais uns 15 minutos e eu aviso se mudar.\"",
        "\"Calma, o senhor não é o único esperando.\"",
        "\"A culpa é do médico, que sempre atrasa.\"",
        "\"Se não gosta, pode ir embora.\"",
      ],
      correta: 0,
      explicacao: "Reconhecer o sentimento, explicar sem culpar ninguém e dar uma previsão honesta reduz a tensão. \"Calma\" costuma irritar mais.",
    }),
    resposta({
      id: "sua-resposta",
      titulo: "Escreva a sua resposta",
      cenario: "Uma paciente idosa chega à recepção, diz que está perdida, que \"o papel que deram não é daqui\" e começa a chorar.",
      instrucao: "Descreva como você a receberia: o que diria em voz e tom, o que perguntaria (uma pergunta de cada vez) e o que faria para ajudá-la. Mencione que você a acolheria e a orientaria sobre o próximo passo.",
      rotulo: "Sua conduta",
      placeholder: "Eu me aproximaria com calma, me apresentaria, perguntaria o nome dela... depois...",
      chave: /^(?=[\s\S]*(calma|acolh|tranquil))(?=[\s\S]*(pergunt|nome))[\s\S]*$/i,
      minPalavras: 25,
      minCaracteres: 130,
    }),
  ],
};

export default atividade;
