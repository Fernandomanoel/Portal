import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Riscos e Segurança Ocupacional",
  introducao: "Classificação de agentes ambientais, hierarquia de controles e EPIs, e Programa de Gerenciamento de Riscos (PGR).",
  itens: [
    {
      id: "classificacao-agentes-ambientais",
      titulo: "[Associação] Classificação de Agentes Ambientais (Higiene Ocupacional)",
      instrucao: "O mapeamento de riscos exige a identificação correta dos perigos no ambiente. Associe cada cenário à sua classificação:",
      tabelaReferencia: {
        colunas: ["Cenário Observado no Ambiente de Trabalho", "Tipo de Risco"],
        linhas: [
          ["Operação próxima a geradores que emitem ruído contínuo e vibrações.", ""],
          ["Trabalho em laboratório de análises clínicas com manipulação de fluidos.", ""],
          ["Pintura industrial com inalação de névoas e vapores de solventes.", ""],
        ],
      },
      campos: [
        {
          id: "m1-a1",
          rotulo: "Geradores com ruído contínuo e vibrações",
          regra: {
            tipo: "selecao",
            esperado: "Fisico",
            opcoes: [
              { valor: "Fisico", texto: "Risco Físico" },
              { valor: "Quimico", texto: "Risco Químico" },
              { valor: "Biologico", texto: "Risco Biológico" },
            ],
          },
          mensagemCerta: "Correto! Ruído é físico, laboratório envolve risco biológico e vapores são riscos químicos.",
          mensagemErrada: "Incorreto. Revise os conceitos: Ruído (Físico), Vírus/Bactérias (Biológico) e Gases/Vapores (Químico).",
        },
        {
          id: "m1-a2",
          rotulo: "Laboratório de análises clínicas com manipulação de fluidos",
          regra: {
            tipo: "selecao",
            esperado: "Biologico",
            opcoes: [
              { valor: "Fisico", texto: "Risco Físico" },
              { valor: "Quimico", texto: "Risco Químico" },
              { valor: "Biologico", texto: "Risco Biológico" },
            ],
          },
          mensagemCerta: "Correto! Ruído é físico, laboratório envolve risco biológico e vapores são riscos químicos.",
          mensagemErrada: "Incorreto. Revise os conceitos: Ruído (Físico), Vírus/Bactérias (Biológico) e Gases/Vapores (Químico).",
        },
        {
          id: "m1-a3",
          rotulo: "Pintura industrial com névoas e vapores de solventes",
          regra: {
            tipo: "selecao",
            esperado: "Quimico",
            opcoes: [
              { valor: "Fisico", texto: "Risco Físico" },
              { valor: "Quimico", texto: "Risco Químico" },
              { valor: "Biologico", texto: "Risco Biológico" },
            ],
          },
          mensagemCerta: "Correto! Ruído é físico, laboratório envolve risco biológico e vapores são riscos químicos.",
          mensagemErrada: "Incorreto. Revise os conceitos: Ruído (Físico), Vírus/Bactérias (Biológico) e Gases/Vapores (Químico).",
        },
      ],
    },
    {
      id: "hierarquia-controles-epis",
      titulo: "[Matriz Verdadeiro ou Falso] Hierarquia de Controles e EPIs",
      instrucao: "Julgue as diretrizes normativas sobre Equipamentos de Proteção Individual e Coletiva:",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica", "Classificação"],
        linhas: [
          [
            "1. Na hierarquia de prevenção, o fornecimento de EPI deve ser a primeira medida adotada, sendo mais importante que a eliminação do perigo na fonte.",
            "",
          ],
          [
            "2. A empresa é obrigada a fornecer o EPI gratuitamente e em perfeito estado, enquanto o trabalhador é obrigado a usá-lo apenas para a finalidade a que se destina.",
            "",
          ],
        ],
      },
      campos: [
        {
          id: "m2-vf1",
          rotulo: "Afirmação 1",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Excelente! O EPI é o ÚLTIMO recurso na hierarquia (Falso). A empresa fornece e o empregado tem o dever de usar (Verdadeiro).",
          mensagemErrada:
            "Atenção: A eliminação do risco ou Proteção Coletiva (EPC) sempre vêm antes do EPI (Afirmativa 1 é Falsa). O uso do EPI é obrigatório (Afirmativa 2 é Verdadeira).",
        },
        {
          id: "m2-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Excelente! O EPI é o ÚLTIMO recurso na hierarquia (Falso). A empresa fornece e o empregado tem o dever de usar (Verdadeiro).",
          mensagemErrada:
            "Atenção: A eliminação do risco ou Proteção Coletiva (EPC) sempre vêm antes do EPI (Afirmativa 1 é Falsa). O uso do EPI é obrigatório (Afirmativa 2 é Verdadeira).",
        },
      ],
    },
    {
      id: "calculo-avaliacao-pgr",
      titulo: "[Cálculo Interativo] Avaliação na Matriz de Riscos (PGR)",
      cenario:
        "No Programa de Gerenciamento de Riscos, o Engenheiro de Segurança utiliza a fórmula matemática de priorização: Nível de Risco = Probabilidade × Severidade.",
      instrucao: "Avaliação: trabalho em altura sem ancoragem. Calcule e digite o NÍVEL DE RISCO final encontrado (número exato).",
      tabelaReferencia: {
        colunas: ["Critério Analisado", "Índice Atribuído"],
        linhas: [
          ["Probabilidade (Provável de ocorrer)", "4"],
          ["Severidade (Catastrófica / Fatal)", "5"],
        ],
      },
      campos: [
        {
          id: "m3-input",
          placeholder: "Digite apenas o número...",
          regra: { tipo: "numero", esperado: 20 },
          mensagemCerta: "Cálculo exato! Risco Intolerável gerado pela multiplicação de 4 (Probabilidade) por 5 (Severidade).",
          mensagemErrada: "Incorreto. Efetue a multiplicação exata apresentada na fórmula: 4 x 5.",
        },
      ],
    },
    {
      id: "conduta-disciplinar-educativa",
      titulo: "[Análise de Caso] Conduta Disciplinar e Educativa",
      cenario:
        "Um operador de motosserra experiente foi flagrado trabalhando sem o protetor auricular (EPI obrigatório). Ao ser questionado, ele alegou que o equipamento é \"desconfortável e atrapalha a escuta do motor\".",
      instrucao:
        "Como Técnico de Segurança, descreva a conduta imediata adotada com esse trabalhador (mínimo de 10 palavras). Mencione termos relacionados à reeducação (ex.: treinar, orientar, conscientizar, advertir).",
      campos: [
        {
          id: "m4-dissertativa",
          placeholder:
            "Ex: A conduta inicial é paralisar a atividade para orientar e treinar o funcionário sobre a importância do EPI. Caso a recusa persista, deve-se aplicar uma advertência formal...",
          regra: { tipo: "texto", minPalavras: 10, minCaracteres: 25, palavrasChave: /treinar|orientar|conscientizar|advertir|educar|diálogo/i },
          mensagemCerta:
            "Diagnóstico perfeito! A educação continuada (treinamento/orientação) e as medidas disciplinares (advertência) são os caminhos legais corretos.",
          mensagemErrada: "A conduta exige ação. Você deve citar termos como \"orientar\", \"treinar\", \"conscientizar\" ou \"advertir\" o trabalhador.",
        },
      ],
    },
    {
      id: "mapeamento-visual-riscos",
      titulo: "[Prática Externa] Mapeamento Visual de Riscos",
      instrucao:
        "Crie um layout simples de Mapa de Riscos utilizando a ferramenta Canva (inserindo os círculos verde, vermelho e marrom sobre uma planta baixa hipotética). Cole abaixo o link público de compartilhamento do seu design.",
      campos: [
        {
          id: "m5-link",
          placeholder: "https://www.canva.com/design/exemplo...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?canva\.com\/.+/i },
          mensagemCerta: "Link validado com sucesso! O domínio do Canva foi reconhecido.",
          mensagemErrada: "URL inválida. Certifique-se de colar o link público de compartilhamento do Canva (deve conter canva.com).",
        },
      ],
    },
  ],
};

export default atividade;
