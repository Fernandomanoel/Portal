import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso prepara o assistente administrativo: entender como uma empresa se organiza, cuidar das rotinas de escritório (documentos, arquivos, agenda, compras, contas), usar bem o tempo e os recursos e apoiar a gestão com informação confiável.",
  topicos: [
    {
      titulo: "O que é administração e como a empresa se organiza",
      texto: [
        "Administrar é planejar, organizar, dirigir e controlar os recursos de uma organização para atingir objetivos. Essas quatro funções se repetem em um ciclo: planeja-se, organiza-se a execução, conduz-se as pessoas e confere-se o resultado para corrigir o rumo.",
        "Uma empresa divide o trabalho em áreas (financeira, comercial, pessoal, produção ou operações, compras). O organograma mostra a hierarquia: quem responde a quem. O assistente administrativo costuma apoiar várias áreas e, por isso, precisa saber a quem cada assunto pertence.",
      ],
      pontos: ["Citar as quatro funções administrativas.", "Ler um organograma simples.", "Dizer a qual área cabe um assunto (admissão, cobrança, compra)."],
      erros: ["Achar que administração é só «burocracia»: ela existe para o trabalho render com menos esforço."],
      atividades: ["administracao-assistente-simulacao-integrada"],
    },
    {
      titulo: "Rotinas de escritório: documentos, arquivo e protocolo",
      texto: [
        "Documento é a prova de que algo aconteceu. O assistente recebe, registra, encaminha e arquiva. Protocolo é o registro de entrada e saída de documentos, com data e responsável. Arquivar bem é conseguir achar rápido: por ordem alfabética, numérica, por assunto ou cronológica.",
        "O arquivo tem fases: corrente (uso frequente), intermediário (consulta ocasional) e permanente (guarda histórica). Documentos têm prazos de guarda definidos em lei ou pela política da empresa, e só se descarta o que o prazo permite.",
      ],
      pontos: ["Escolher o método de arquivamento adequado.", "Explicar para que serve o protocolo.", "Dizer por que não se descarta documento sem conferir o prazo de guarda."],
      atividades: ["administracao-rotinas-avancadas", "administracao-rotinas-suporte-operacional"],
    },
    {
      titulo: "Comunicação e atendimento interno e externo",
      texto: [
        "A comunicação administrativa é escrita (e-mails, ofícios, memorandos, comunicados) e oral (telefone, atendimento). O texto deve ser claro, objetivo e educado. Um e-mail profissional tem assunto específico, saudação, corpo curto com a informação e o pedido, despedida e assinatura.",
        "No atendimento, escutar antes de responder, confirmar o que entendeu e registrar o pedido evita retrabalho. Informação confidencial só circula entre quem precisa dela.",
      ],
      pontos: ["Escrever um e-mail profissional curto.", "Registrar um recado de forma completa (quem, o quê, quando, retorno)."],
    },
    {
      titulo: "Organização do tempo e eficiência operacional",
      texto: [
        "Eficiência é fazer certo com o mínimo de recurso; eficácia é atingir o objetivo. Para organizar o dia, separa-se o urgente do importante, agrupa-se tarefas parecidas e usa-se agenda e lista de tarefas. O 5S (utilização, ordenação, limpeza, padronização e disciplina) ajuda a manter o ambiente organizado.",
        "Indicadores simples mostram se a rotina funciona: prazo cumprido, retrabalho, tempo de resposta. O que não se mede não se melhora.",
      ],
      pontos: ["Explicar a diferença entre urgente e importante.", "Citar os cinco sensos do 5S.", "Dar um indicador simples para uma rotina."],
      atividades: ["administracao-eficiencia-operacional"],
    },
    {
      titulo: "Controles financeiros básicos de escritório",
      texto: [
        "O assistente costuma acompanhar contas a pagar (o que a empresa deve), contas a receber (o que ela tem para receber), caixa pequeno (suprimento para despesas miúdas, com recibos) e compras de material. Cada saída precisa de comprovante e de autorização.",
        "Duas regras evitam problemas: conferir antes de pagar (valor, vencimento, quem autorizou) e registrar na hora, não depois.",
      ],
      pontos: ["Distinguir contas a pagar e a receber.", "Explicar por que todo gasto precisa de comprovante."],
    },
  ],
  glossario: [
    { termo: "Organograma", definicao: "Desenho da estrutura hierárquica da empresa." },
    { termo: "Protocolo", definicao: "Registro de entrada e saída de documentos." },
    { termo: "Eficiência", definicao: "Fazer certo gastando o mínimo de recursos." },
    { termo: "Eficácia", definicao: "Atingir o resultado desejado." },
    { termo: "5S", definicao: "Programa de organização: utilização, ordenação, limpeza, padronização e disciplina." },
    { termo: "Memorando", definicao: "Comunicação escrita interna e breve entre setores." },
  ],
  dicas: [
    "Leve documentos reais (modelos sem dados pessoais) para treinar protocolo e arquivo.",
    "Transforme as simulações em cenários de «segunda-feira de manhã»: tudo chega ao mesmo tempo e o aluno precisa priorizar.",
    "Dê o exemplo: aula começando e terminando no horário, materiais organizados.",
  ],
};

export default conteudo;
