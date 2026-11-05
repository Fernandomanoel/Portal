import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O operador de telemarketing se comunica pela voz para atender, vender, cobrar ou dar suporte. O curso trabalha a técnica de voz, o roteiro da ligação, a abordagem, o tratamento de objeções, a postura e o controle emocional, além das regras de contato com o consumidor.",
  topicos: [
    {
      titulo: "A voz como ferramenta",
      texto: [
        "Ao telefone o cliente só tem a voz. Importam o tom (amigável e seguro), o volume (nem baixo nem alto), a velocidade (pausada), a dicção (palavras completas) e o sorriso, que se ouve na voz. Postura reta e respiração calma ajudam. Evite gírias, gerundismo excessivo e vícios como «né», «tipo».",
      ],
      pontos: ["Fazer um exercício de respiração e dicção.", "Evitar vícios de linguagem."],
    },
    {
      titulo: "Roteiro e estrutura da ligação",
      texto: [
        "Uma ligação segue passos: saudação e identificação (nome, empresa), motivo do contato, perguntas para entender, oferta ou solução, tratamento de objeções, confirmação dos combinados e despedida cordial. O roteiro é um guia, não um texto para decorar: o operador escuta e adapta.",
      ],
      pontos: ["Descrever os passos de uma ligação.", "Adaptar o roteiro à resposta do cliente."],
    },
    {
      titulo: "Objeções, empatia e controle emocional",
      texto: [
        "Objeção é uma resistência («não tenho interesse», «está caro»). Em geral pede: ouvir, reconhecer, esclarecer e propor. Ouvir «não» faz parte do trabalho: não leve para o lado pessoal. Estratégias de controle emocional: respirar, fazer pausas, ter um pensamento neutro e lembrar que o cliente reage à situação, não à pessoa.",
      ],
      pontos: ["Responder a uma objeção de forma educada.", "Aplicar uma técnica para manter a calma."],
    },
    {
      titulo: "Regras, ética e dados do cliente",
      texto: [
        "A oferta por telefone segue regras de proteção ao consumidor: identifique-se, diga o motivo da ligação, não insista quando o cliente recusa, respeite horários permitidos e solicitações de não contato. Os dados do cliente são sigilosos e protegidos pela LGPD (Lei Geral de Proteção de Dados): só se usa o necessário e para a finalidade informada.",
      ],
      pontos: ["Dizer o que é a LGPD.", "Explicar por que não se deve insistir após a recusa."],
    },
    {
      titulo: "Metas e indicadores",
      texto: [
        "Indicadores comuns: tempo médio de atendimento, taxa de conversão (vendas ÷ contatos), taxa de resolução no primeiro contato e qualidade, avaliada com gravações. As metas devem ser realistas e acompanhadas com feedback.",
      ],
      pontos: ["Calcular a taxa de conversão."],
      exemplo: "40 vendas em 200 contatos: conversão de 20%.",
    },
  ],
  glossario: [
    { termo: "Script", definicao: "Roteiro de condução da ligação." },
    { termo: "Objeção", definicao: "Resistência do cliente à oferta." },
    { termo: "Conversão", definicao: "Proporção de contatos que viram venda." },
    { termo: "LGPD", definicao: "Lei Geral de Proteção de Dados Pessoais." },
    { termo: "TMA", definicao: "Tempo médio de atendimento." },
  ],
  dicas: [
    "Faça ligações simuladas em duplas, de costas um para o outro, para treinar a voz.",
    "Peça que o aluno ouça a própria gravação: é o melhor professor.",
    "Combine uma lista de expressões a evitar e outra de expressões positivas.",
  ],
};

export default conteudo;
