import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O auxiliar médico apoia consultas e a rotina do consultório: recebe e orienta o paciente, organiza a agenda e o prontuário, prepara a sala e os materiais, aferir sinais vitais sob supervisão e cuida da biossegurança. Atua sob orientação do médico e da equipe de saúde, dentro dos limites da sua função. Consulte as normas profissionais vigentes.",
  topicos: [
    {
      titulo: "A equipe e o limite de atuação",
      texto: [
        "O médico diagnostica, prescreve e conduz o tratamento. O auxiliar executa tarefas de apoio, e não pratica atos privativos da medicina (diagnosticar, prescrever, interpretar exames como conclusão). Postura ética: sigilo absoluto das informações do paciente, respeito, pontualidade e higiene pessoal.",
      ],
      pontos: ["Dizer o que não cabe ao auxiliar.", "Explicar por que o sigilo é obrigatório."],
      atividades: ["auxiliar-medico-secretariado-medico"],
    },
    {
      titulo: "Recepção, agenda e prontuário",
      texto: [
        "A recepção cuida do acolhimento, da conferência de documentos e do convênio, do agendamento de consultas e retornos e da organização das filas por horário e prioridade (idosos, gestantes, pessoas com deficiência e casos de urgência têm atendimento prioritário). O prontuário é o registro de todas as informações do paciente: guarde com segurança, com acesso restrito. A LGPD protege dados de saúde, que são sensíveis.",
      ],
      pontos: ["Organizar uma agenda de consultas.", "Explicar a importância do prontuário e da confidencialidade."],
      atividades: ["auxiliar-medico-agendamento-de-consultas", "auxiliar-medico-atendimento-ao-cidadao", "auxiliar-medico-secretariado-medico"],
    },
    {
      titulo: "Sinais vitais e medidas básicas",
      texto: [
        "Sinais vitais mostram o estado do paciente: temperatura (em geral 36 a 37,2 °C na axila), pulso (batimentos por minuto, normal em adultos em repouso em torno de 60 a 100), respiração (cerca de 12 a 20 por minuto) e pressão arterial (valores em torno de 120 por 80 mmHg são considerados normais para adultos). Também se medem peso e altura, e o IMC = peso (kg) ÷ altura² (m). Valores de referência variam: o resultado é sempre interpretado pelo médico.",
      ],
      pontos: ["Aferir e registrar sinais vitais.", "Calcular o IMC."],
      exemplo: "70 kg e 1,75 m: IMC = 70 ÷ 3,06 ≈ 22,9.",
      erros: ["Interpretar ou comentar o resultado com o paciente como se fosse diagnóstico."],
    },
    {
      titulo: "Biossegurança e preparo da sala",
      texto: [
        "Lavagem das mãos antes e depois de cada paciente, uso de EPIs quando necessário, limpeza e desinfecção de maca, instrumentos e superfícies e descarte correto do lixo (comum, infectante e perfurocortante) fazem parte da rotina. O consultório deve estar pronto antes da consulta: materiais, formulários e equipamentos testados.",
      ],
      pontos: ["Lavar as mãos na técnica correta.", "Separar os resíduos por tipo."],
      atividades: ["auxiliar-medico-check-list-do-consultorio"],
    },
    {
      titulo: "Primeiros socorros e comunicação com o paciente",
      texto: [
        "Em urgências (desmaio, queda, crise convulsiva, engasgo), a conduta é manter a calma, chamar imediatamente o médico ou a equipe e o serviço de emergência (SAMU, 192), e prestar apenas o auxílio básico que sabe. Na comunicação, use linguagem simples, escute com atenção, explique o procedimento e respeite o medo e o pudor do paciente.",
      ],
      pontos: ["Dizer a quem acionar em uma emergência.", "Explicar um procedimento ao paciente em linguagem simples."],
      atividades: ["auxiliar-medico-simulado-paciente-alterado", "auxiliar-medico-atendimento-ao-cidadao"],
    },
  ],
  glossario: [
    { termo: "Sinais vitais", definicao: "Temperatura, pulso, respiração e pressão arterial." },
    { termo: "Prontuário", definicao: "Registro do histórico e do atendimento do paciente." },
    { termo: "IMC", definicao: "Índice de massa corporal: peso ÷ altura ao quadrado." },
    { termo: "Biossegurança", definicao: "Medidas de proteção contra riscos biológicos." },
    { termo: "Perfurocortante", definicao: "Material que fura ou corta." },
  ],
  dicas: [
    "Treine a aferição de sinais vitais entre os próprios alunos, com supervisão.",
    "Deixe muito claro o limite: o auxiliar apoia e não diagnostica nem interpreta.",
    "Trate o sigilo como regra prática: simule uma pergunta de um familiar e a resposta correta.",
  ],
};

export default conteudo;
