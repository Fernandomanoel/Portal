import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O secretariado apoia a rotina de quem decide: organiza a agenda, filtra contatos, prepara reuniões, viagens e eventos, cuida da informação e da comunicação. Valoriza discrição, organização e iniciativa.",
  topicos: [
    {
      titulo: "O papel do secretário e a postura profissional",
      texto: [
        "O profissional de secretariado é um assessor: antecipa necessidades do executivo, resolve o que está ao seu alcance e leva ao executivo só o que precisa da decisão dele. A postura combina discrição (sigilo das informações), ética, cordialidade e pontualidade.",
        "Atender bem inclui cuidar do ambiente (a recepção é o cartão de visitas), de quem espera e de quem liga. Comunicar com clareza, sem perder a educação, vale tanto com o diretor quanto com o entregador.",
      ],
      pontos: ["Explicar a diferença entre assessorar e apenas executar tarefas.", "Dar exemplos de situações que exigem sigilo."],
      atividades: ["secretariado-rotinas-assessoria-administrativa"],
    },
    {
      titulo: "Agenda, tempo e comunicação",
      texto: [
        "A agenda é a ferramenta central. Registra compromissos com data, hora, local, participantes, pauta e contato. Convém deixar margem entre os compromissos (deslocamento e atrasos) e confirmar um dia antes. Prioridades se organizam pelo que é urgente e importante.",
        "A comunicação por e-mail e telefone segue regras: assunto claro, resumo curto, tom adequado e confirmação de recebimento quando for importante.",
      ],
      pontos: ["Marcar um compromisso com todos os dados necessários.", "Resolver um conflito de agenda sem perder o relacionamento."],
      atividades: ["secretariado-gestao-tempo-comunicacao-ferramentas"],
    },
    {
      titulo: "Reuniões, viagens e eventos",
      texto: [
        "Reunião: antes, define-se o objetivo, a pauta, os participantes, o horário e o local, e enviam-se os convites. Durante, controla-se o tempo e registra-se a ata (data, participantes, decisões e responsáveis com prazo). Depois, circula-se a ata.",
        "Viagem: reserva de transporte e hospedagem, roteiro com horários e contatos, documentos e orçamento, e prestação de contas depois (comprovantes). Evento: planejamento de local, cronograma, convidados, alimentação, equipamentos e plano B.",
      ],
      pontos: ["Escrever uma pauta e uma ata simples.", "Montar um roteiro de viagem.", "Listar os itens de um checklist de evento."],
      atividades: ["secretariado-executivo-viagens-eventos-arquivo"],
    },
    {
      titulo: "Arquivo, gestão da informação e 5S",
      texto: [
        "Arquivar é guardar de forma que se ache rápido. Documentos têm ciclo de vida (corrente, intermediário e permanente) e prazos de guarda. Na parte digital, nomes padronizados e pastas por assunto ou data evitam perder arquivos; faz-se cópia de segurança.",
        "O programa 5S (utilização, ordenação, limpeza, padronização e disciplina) organiza o ambiente de trabalho e reduz o tempo perdido.",
      ],
      pontos: ["Escolher o método de arquivamento.", "Padronizar nomes de arquivos digitais.", "Citar os 5S."],
      atividades: ["secretariado-executivo-gestao-informacao-5s", "secretariado-executivo-viagens-eventos-arquivo"],
    },
  ],
  glossario: [
    { termo: "Assessoria", definicao: "Apoio que antecipa e resolve demandas de quem decide." },
    { termo: "Pauta", definicao: "Lista dos assuntos de uma reunião." },
    { termo: "Ata", definicao: "Registro escrito do que foi decidido em uma reunião." },
    { termo: "Protocolo", definicao: "Registro de entrada e saída de documentos." },
    { termo: "Roteiro", definicao: "Programação detalhada de uma viagem ou evento." },
    { termo: "Sigilo", definicao: "Dever de não divulgar informações confidenciais." },
  ],
  dicas: [
    "Simule situações: alguém liga pedindo informação do chefe, dois compromissos no mesmo horário, e deixe o aluno resolver em voz alta.",
    "Treine a ata com uma reunião curta feita na própria aula.",
    "Corrija sempre a escrita: erros de português em e-mail executivo custam credibilidade.",
  ],
};

export default conteudo;
