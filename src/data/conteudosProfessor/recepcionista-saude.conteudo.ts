import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "A recepcionista de serviços de saúde é a primeira pessoa que o paciente encontra: acolhe, orienta, organiza a agenda e os documentos e cuida do fluxo de atendimento em clínicas, consultórios e laboratórios, com empatia, sigilo e organização.",
  topicos: [
    {
      titulo: "Acolhimento e postura profissional",
      texto: [
        "Quem chega a um serviço de saúde está, muitas vezes, preocupado, com dor ou com pressa. O acolhimento é a primeira parte do cuidado: cumprimentar, olhar para o paciente, escutar e orientar com calma e clareza. Apresentação pessoal, linguagem educada e discrição fazem parte da imagem do serviço.",
      ],
      pontos: ["Acolher um paciente aflito.", "Evitar exposição de assuntos de saúde em voz alta."],
    },
    {
      titulo: "Agendamento, agenda e convênios",
      texto: [
        "A agenda organiza consultas, exames e retornos, com horário, profissional, tipo de atendimento e contato do paciente. Confirme os dados, avise sobre preparo de exames e jejum e confirme a presença na véspera para reduzir faltas. Atendimentos por convênio exigem conferência da carteirinha, da validade e da autorização; particulares, a forma de pagamento. Encaixes e remarcações devem ser registrados.",
      ],
      pontos: ["Marcar uma consulta com os dados completos.", "Conferir documentos de convênio."],
    },
    {
      titulo: "Atendimento prioritário e fluxo de atendimento",
      texto: [
        "A lei garante atendimento prioritário a idosos (a partir de 60 anos), gestantes, lactantes, pessoas com deficiência e crianças de colo, e há prioridade clínica em casos de urgência. Organize as filas e o fluxo do paciente (recepção, espera, consulta, pagamento, retorno), comunique os atrasos e peça desculpas quando houver espera longa.",
      ],
      pontos: ["Identificar quem tem prioridade.", "Comunicar um atraso com cordialidade."],
    },
    {
      titulo: "Prontuário, sigilo e LGPD",
      texto: [
        "Dados de saúde são sensíveis e protegidos por sigilo profissional e pela LGPD. Informações sobre um paciente só vão a ele, ou a quem ele autorizar. Não dê informações por telefone sem conferir a identidade, não deixe prontuários à vista e não converse sobre pacientes em locais públicos.",
      ],
      pontos: ["Dizer o que fazer ao receber um pedido de informações de um terceiro.", "Guardar documentos com segurança."],
      erros: ["Informar a um familiar o resultado de um exame sem autorização do paciente."],
    },
    {
      titulo: "Comunicação, telefone e situações difíceis",
      texto: [
        "No telefone: atenda rápido, identifique o serviço e a si mesma, escute, anote e confirme os dados. Com pacientes nervosos, escute sem interromper, não discuta, ofereça uma solução ou um caminho (chamar o responsável) e registre. Em emergências, acione imediatamente a equipe de saúde.",
      ],
      pontos: ["Atender uma ligação com um roteiro simples.", "Lidar com uma reclamação com calma."],
    },
  ],
  glossario: [
    { termo: "Acolhimento", definicao: "Receber o paciente com atenção e respeito, desde a chegada." },
    { termo: "Prontuário", definicao: "Registro do histórico e do atendimento do paciente." },
    { termo: "Convênio", definicao: "Plano de saúde que cobre o atendimento." },
    { termo: "Sigilo", definicao: "Dever de não divulgar informações do paciente." },
    { termo: "LGPD", definicao: "Lei Geral de Proteção de Dados Pessoais." },
  ],
  dicas: [
    "Simule atendimentos na recepção, com um aluno como paciente irritado e outro como recepcionista.",
    "Treine o preenchimento de uma agenda em papel ou planilha antes de usar um sistema.",
    "Reforce o sigilo com situações reais (ligação de familiar, pedido de resultado).",
  ],
};

export default conteudo;
