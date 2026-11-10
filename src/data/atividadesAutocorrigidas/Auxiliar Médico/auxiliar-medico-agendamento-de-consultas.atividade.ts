import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../auxiliarMedicoComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Auxiliar Médico — Agendamento de Consultas",
  introducao:
    "A agenda é o coração do consultório: quando bem cuidada, o médico atende no horário, o paciente não espera à toa e ninguém perde a consulta. Nesta atividade você percorre o caminho do agendamento, preenche a ficha com o paciente, lê uma agenda real do dia, encaixa pedidos em horários livres e treina o que fazer quando alguém cancela. As regras de tempo e de retorno variam de consultório para consultório e de convênio para convênio: siga sempre a orientação do local onde trabalha.",
  itens: [
    comFigura(
      escolha({
        id: "caminho-do-agendamento",
        titulo: "O caminho do agendamento",
        blocos: [
          { tipo: "texto", texto: "Marcar uma consulta não é só anotar um nome num horário. São cinco passos, e pular um deles costuma gerar falta, troca de paciente ou convênio recusado:" },
          { tipo: "lista", numerada: true, itens: ["Receber: cumprimente, identifique-se e ouça o pedido até o fim.", "Coletar os dados: nome completo, data de nascimento, telefone, convênio e carteirinha, motivo em poucas palavras.", "Verificar a agenda do médico pedido e oferecer opções.", "Confirmar em voz alta: dia, hora, médico e o que levar (documentos, exames anteriores, jejum, se o consultório pedir).", "Reconfirmar com a pessoa um ou dois dias antes."] },
          { tipo: "nota", variante: "dica", texto: "Repetir em voz alta é o passo mais barato e mais esquecido: \"Então, Maria, quinta-feira às 8 horas, com o Dr. Paulo, trazendo a carteirinha e o RG.\"" },
        ],
        instrucao: "Qual passo mais ajuda a reduzir as faltas (o paciente que simplesmente não aparece)?",
        opcoes: ["Reconfirmar a consulta um ou dois dias antes.", "Anotar o horário em letra bonita.", "Marcar sempre o último horário do dia.", "Não pedir telefone, para não incomodar."],
        correta: 0,
        explicacao: "A reconfirmação lembra o paciente e, se ele não vai poder vir, libera o horário a tempo de chamar alguém da lista de espera.",
      }),
      figura("fluxo-agendar", "Cinco etapas em sequência — receber, coletar, verificar, confirmar e reconfirmar — e uma caixa sobre o que fazer quando não há horário.", "Do pedido à reconfirmação."),
    ),
    comFigura(
      associar({
        id: "dados-da-ficha",
        titulo: "Para que serve cada dado da ficha",
        blocos: [
          { tipo: "texto", texto: "Cada campo da ficha existe por um motivo. Quando você sabe o motivo, explica ao paciente por que está perguntando — e ele colabora mais." },
        ],
        instrucao: "Ligue cada dado ao motivo de pedi-lo.",
        opcoes: ["Distinguir pacientes com o mesmo nome (homônimos)", "Avisar sobre remarcação e reconfirmar", "Conferir a cobertura e a autorização do plano", "Definir quanto tempo reservar na agenda"],
        linhas: [
          { id: "nascimento", rotulo: "Data de nascimento", correta: 0 },
          { id: "telefone", rotulo: "Telefone / WhatsApp", correta: 1 },
          { id: "convenio", rotulo: "Convênio e número da carteirinha", correta: 2 },
          { id: "tipo", rotulo: "Tipo: primeira consulta ou retorno", correta: 3 },
        ],
        explicacao: "Dado pedido sem motivo vira constrangimento; dado pedido com motivo vira confiança.",
      }),
      figura("ficha-de-agendamento", "Ficha de agendamento com seis campos preenchidos e, ao lado, a lista do que confirmar em voz alta.", "Ficha de agendamento e a conferência em voz alta."),
    ),
    comFigura(
      {
        id: "lendo-a-agenda",
        titulo: "Lendo a agenda do dia",
        cenario: "Esta é a agenda do Dr. Paulo na quinta-feira, em horários de 30 minutos, das 8h às 12h. Azul é consulta, verde é retorno, tracejado é horário livre e cinza é horário bloqueado. A primeira consulta da Maria dura 60 minutos.",
        campos: [
          {
            id: "livres",
            rotulo: "Quantos horários de 30 minutos estão livres?",
            placeholder: "Número",
            regra: { tipo: "numero", esperado: 2, tolerancia: 0 },
            mensagemCerta: "Isso: 09:30 e 11:00.",
            mensagemErrada: "Conte só os quadros tracejados (livres): os cinza são bloqueados e os coloridos já têm paciente.",
          },
          {
            id: "minutos-pacientes",
            rotulo: "Quantos minutos de atendimento a pacientes estão marcados (sem contar o bloqueio)?",
            placeholder: "Em minutos",
            regra: { tipo: "numero", esperado: 150, tolerancia: 0 },
            mensagemCerta: "Isso: Maria 60 + João 30 + Ana 30 + Pedro 30 = 150 minutos.",
            mensagemErrada: "Some: Maria (60) + João (30) + Ana (30) + Pedro (30). O bloqueio da reunião não é paciente.",
          },
          {
            id: "termina-maria",
            rotulo: "A que horas termina a primeira consulta da Maria? (formato hh:mm)",
            placeholder: "Ex.: 10:00",
            regra: { tipo: "padrao", padrao: /^\s*0?9\s*[:h]\s*00\s*$/i },
            mensagemCerta: "Isso: começa às 8h e dura 60 minutos, termina às 9h.",
            mensagemErrada: "Ela começa às 08:00 e a consulta dura 60 minutos.",
          },
        ],
        objetivo: "Ler a agenda como o médico a lê: cada quadro é tempo reservado e o tempo livre quase nunca é seguido.",
      },
      figura("agenda-do-dia", "Agenda do Dr. Paulo de 08:00 às 11:30 com consultas em azul, retornos em verde, horários livres tracejados e um bloqueio cinza, além da legenda.", "Agenda do dia com consultas, retornos, livres e bloqueados."),
    ),
    associar({
      id: "encaixar-pedidos",
      titulo: "Encaixando os pedidos",
      cenario: "Três pessoas ligam ao mesmo tempo pedindo horário com o Dr. Paulo na quinta-feira. Na agenda acima, só restam o horário das 09:30 e o das 11:00, ambos de 30 minutos e separados entre si.",
      instrucao: "Decida o que oferecer a cada uma.",
      opcoes: ["09:30", "11:00", "Oferecer outro dia (não cabe na quinta)"],
      linhas: [
        { id: "carla", rotulo: "Carla: retorno de 30 minutos, prefere o começo da manhã", correta: 0 },
        { id: "jorge", rotulo: "Sr. Jorge: primeira consulta, que precisa de 60 minutos", correta: 2 },
        { id: "lia", rotulo: "Lia: retorno de 30 minutos, só consegue mais tarde", correta: 1 },
      ],
      explicacao: "Os dois horários livres têm 30 minutos e não são seguidos: cabem os dois retornos, mas não uma primeira consulta de 60.",
    }),
    escolha({
      id: "cancelamento",
      titulo: "O paciente cancela em cima da hora",
      cenario: "Às 7h40, o Sr. Pedro liga e avisa que não conseguirá vir ao retorno das 11h30.",
      instrucao: "Qual é a atitude mais adequada?",
      opcoes: [
        "Registrar o cancelamento, oferecer remarcação, liberar o horário e, se houver lista de espera, avisar o próximo da lista.",
        "Não anotar nada para não dar trabalho.",
        "Dizer que não pode cancelar e que terá de vir.",
        "Apagar o nome da agenda e esquecer.",
      ],
      correta: 0,
      explicacao: "Horário liberado a tempo pode ser aproveitado por outra pessoa; o cancelamento anotado também ajuda o consultório a entender as faltas.",
    }),
    resposta({
      id: "roteiro-de-ligacao",
      titulo: "Seu roteiro de atendimento ao telefone",
      cenario: "Uma mulher liga para marcar a primeira consulta do filho de 8 anos com o pediatra.",
      instrucao: "Escreva, com as suas palavras, o que você diria e perguntaria nessa ligação, em ordem. Inclua pelo menos: o nome completo, um telefone de contato e o convênio, além de repetir o horário no fim.",
      rotulo: "Seu roteiro",
      placeholder: "Bom dia, Consultório... Qual o nome completo da criança?... Qual o telefone para contato?... Tem convênio?... Então fica marcado...",
      chave: /^(?=[\s\S]*nome)(?=[\s\S]*(telefone|contato))(?=[\s\S]*(conv[eê]nio|carteirinha))[\s\S]*$/i,
      minPalavras: 25,
      minCaracteres: 130,
    }),
  ],
};

export default atividade;
