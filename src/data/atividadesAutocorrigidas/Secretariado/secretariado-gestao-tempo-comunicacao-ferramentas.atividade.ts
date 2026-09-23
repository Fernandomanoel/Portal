import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const QUADRANTES = [
  { valor: "fazer", texto: "Fazer Imediatamente" },
  { valor: "agendar", texto: "Agendar / Planejar" },
  { valor: "delegar", texto: "Delegar para outra pessoa" },
];

const M1_OK = "Perfeito! Urgente e Importante = Fazer; Importante/Não Urgente = Agendar; Urgente/Não Importante = Delegar.";
const M1_ERRO =
  "Incorreto. Revise a matriz: Crises (Fazer agora), Planejamento (Agendar), e Rotinas menores/Cobranças (Delegar).";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Secretariado — Gestão de Tempo, Comunicação e Ferramentas",
  introducao:
    "Desenvolva sua inteligência administrativa dominando a Matriz de Eisenhower (Gestão do Tempo), organização de reuniões virtuais (Netiqueta), otimização de orçamentos, comunicação assertiva por e-mail e criação de controles em nuvem.",
  itens: [
    {
      id: "eisenhower",
      titulo: "Gestão do Tempo: Matriz de Eisenhower",
      cenario:
        "A Matriz de Eisenhower é uma ferramenta essencial para a secretária priorizar tarefas com base em Importância e Urgência.",
      instrucao: "Associe cada tarefa à ação correta na matriz.",
      campos: [
        {
          id: "sec4-m1-1",
          rotulo:
            "Uma crise de última hora com um cliente VIP que exige a atenção imediata da diretora agora. (Importante e Urgente)",
          regra: { tipo: "selecao", esperado: "fazer", opcoes: QUADRANTES },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec4-m1-2",
          rotulo:
            "Planejamento estratégico e organização da festa de fim de ano da empresa, que acontecerá daqui a 4 meses. (Importante, mas Não Urgente)",
          regra: { tipo: "selecao", esperado: "agendar", opcoes: QUADRANTES },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec4-m1-3",
          rotulo:
            "Um fornecedor ligando para confirmar um pedido de material de escritório rotineiro. (Urgente, mas Menos Importante)",
          regra: { tipo: "selecao", esperado: "delegar", opcoes: QUADRANTES },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
      ],
    },
    {
      id: "reunioes-virtuais",
      titulo: "Organização de Reuniões Virtuais",
      cenario:
        "Com o aumento do trabalho remoto, as secretárias são frequentemente responsáveis por configurar reuniões por videoconferência (Zoom, Teams, Meet).",
      instrucao: "Qual é a conduta profissional correta para organizar essas reuniões?",
      campos: [
        {
          id: "sec4-m2",
          regra: {
            tipo: "multipla_escolha",
            correta: 1,
            opcoes: [
              "Enviar o link de acesso apenas 5 minutos antes do início para garantir a segurança da sala e evitar que os participantes se percam.",
              "Enviar o convite antecipado com o link de acesso e a pauta, além de entrar na sala virtual 10 minutos antes para testar o áudio, o vídeo e as permissões de compartilhamento de tela.",
              "Deixar que os próprios diretores criem e enviem os links de suas reuniões, pois ferramentas tecnológicas não são de responsabilidade da assessoria executiva.",
            ],
          },
          mensagemCerta: "Correto! O planejamento antecipado e o teste técnico previnem falhas que atrasam a agenda da diretoria.",
          mensagemErrada:
            "Incorreto. A secretária deve ser proativa, testando a sala antes e enviando os links com antecedência para evitar imprevistos técnicos.",
        },
      ],
    },
    {
      id: "custos-viagem",
      titulo: "Análise de Custos e Viagens",
      cenario:
        "Parte do papel do secretariado é otimizar os recursos da empresa. A diretora precisa viajar e você deve escolher a cotação com o menor custo TOTAL.",
      tabelaReferencia: {
        colunas: ["Cotação", "Companhia A", "Companhia B"],
        linhas: [
          ["Valor da Passagem", "R$ 1.500,00", "R$ 1.680,00"],
          ["Franquia de Bagagem", "R$ 150,00 (Taxa extra)", "Inclusa (Grátis)"],
        ],
      },
      instrucao: "Calcule e digite o valor EXATO em Reais da opção mais barata.",
      campos: [
        {
          id: "sec4-m3",
          placeholder: "Apenas números, ex: 1500",
          regra: { tipo: "numero", esperado: 1650 },
          mensagemCerta:
            "Cálculo exato! A Companhia A custa R$ 1.500 + R$ 150 (bagagem), totalizando R$ 1.650, sendo R$ 30 mais barata que a Companhia B.",
          mensagemErrada:
            "Incorreto. A Companhia A (1500 + 150 = 1650) é mais barata que a Companhia B (1680). Digite o valor da Cotação A.",
        },
      ],
    },
    {
      id: "email-assertivo",
      titulo: "Comunicação Assertiva via E-mail",
      cenario:
        "Um fornecedor de serviços de TI enviou um e-mail cobrando o pagamento de uma nota fiscal. O setor financeiro informou a você que esse pagamento está dentro do prazo e já foi programado para a próxima sexta-feira.",
      instrucao:
        "Escreva o e-mail de resposta ao fornecedor de forma educada, formal e assertiva. Você deve obrigatoriamente utilizar termos como \"financeiro\", \"pagamento\", \"programado\" ou \"sexta-feira\".",
      campos: [
        {
          id: "sec4-m4",
          placeholder: "Mínimo de 10 palavras...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 30,
            palavrasChave: /financeiro|pagamento|programado|sexta|sexta-feira|agendado|quitado|prazo/i,
          },
          mensagemCerta:
            "Comunicação assertiva validada! Um e-mail objetivo e educado alinha as expectativas do fornecedor e evita novas cobranças indevidas.",
          mensagemErrada:
            "A mensagem precisa ser clara e informativa. Utilize termos como 'financeiro', informando que o 'pagamento' está 'programado' para 'sexta-feira'.",
        },
      ],
    },
    {
      id: "ferramentas-nuvem",
      titulo: "Criação de Ferramentas de Controle",
      cenario:
        "Profissionais modernos de secretariado utilizam a computação em nuvem. Acesse o Google Sheets (Planilhas) e crie um modelo básico de \"Controle de Entrada de Visitantes\" ou o Google Forms (Formulários) para criar uma \"Pesquisa de Satisfação de Reunião\".",
      instrucao: "Cole abaixo o link público de compartilhamento da sua planilha ou formulário criado.",
      campos: [
        {
          id: "sec4-m5",
          placeholder: "https://docs.google.com/...",
          regra: {
            tipo: "padrao",
            padrao: /^https?:\/\/(www\.)?(docs\.google\.com\/(spreadsheets|forms)|forms\.gle)\/.+/i,
          },
          mensagemCerta:
            "Link validado! Dominar ferramentas em nuvem é essencial para centralizar e compartilhar informações rapidamente com a equipe.",
          mensagemErrada:
            "URL inválida. Certifique-se de colar o link público de compartilhamento de uma Planilha (Google Sheets) ou Formulário (Google Forms).",
        },
      ],
    },
  ],
};

export default atividade;
