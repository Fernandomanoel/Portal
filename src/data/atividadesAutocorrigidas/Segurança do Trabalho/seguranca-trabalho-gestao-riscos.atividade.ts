import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Riscos e Segurança do Trabalho",
  introducao: "Hierarquia de controle, equipamentos e sinalização, matriz de riscos e protocolo de primeiros socorros.",
  itens: [
    {
      id: "hierarquia-controle",
      titulo: "[Preenchimento de Lacunas] Gestão de Riscos e Hierarquia de Controle",
      instrucao:
        "Complete o relatório técnico: o documento principal para gerenciamento ocupacional; a classificação de ruído intenso e vibração; a medida de controle prioritária diante de um perigo detectado.",
      campos: [
        {
          id: "m1-l1",
          rotulo: "Documento principal de gerenciamento ocupacional na empresa",
          regra: {
            tipo: "selecao",
            esperado: "PGR",
            opcoes: [
              { valor: "PGR", texto: "PGR (Programa de Gerenciamento de Riscos)" },
              { valor: "CAT", texto: "CAT (Comunicação de Acidente)" },
            ],
          },
          mensagemCerta: "Perfeito! O PGR gere os riscos físicos (ruído) e prioriza medidas de Proteção Coletiva (EPC).",
          mensagemErrada: "Incorreto. Lembre-se: o programa é o PGR, ruído é risco físico, e a proteção prioritária é coletiva.",
        },
        {
          id: "m1-l2",
          rotulo: "Classificação de ruído intenso e vibração",
          regra: {
            tipo: "selecao",
            esperado: "fisicos",
            opcoes: [
              { valor: "quimicos", texto: "Químicos" },
              { valor: "fisicos", texto: "Físicos" },
            ],
          },
          mensagemCerta: "Perfeito! O PGR gere os riscos físicos (ruído) e prioriza medidas de Proteção Coletiva (EPC).",
          mensagemErrada: "Incorreto. Lembre-se: o programa é o PGR, ruído é risco físico, e a proteção prioritária é coletiva.",
        },
        {
          id: "m1-l3",
          rotulo: "Medida de controle prioritária diante de um perigo detectado",
          regra: {
            tipo: "selecao",
            esperado: "coletiva",
            opcoes: [
              { valor: "coletiva", texto: "Coletiva (EPC)" },
              { valor: "individual", texto: "Individual (EPI)" },
            ],
          },
          mensagemCerta: "Perfeito! O PGR gere os riscos físicos (ruído) e prioriza medidas de Proteção Coletiva (EPC).",
          mensagemErrada: "Incorreto. Lembre-se: o programa é o PGR, ruído é risco físico, e a proteção prioritária é coletiva.",
        },
      ],
    },
    {
      id: "equipamentos-sinalizacao",
      titulo: "[Matriz Verdadeiro ou Falso] Equipamentos e Sinalização",
      instrucao: "Com base nas Normas Regulamentadoras, avalie as afirmativas abaixo como Verdadeira (V) ou Falsa (F):",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica", "Classificação"],
        linhas: [
          [
            "1. O fornecimento do EPI é obrigação exclusiva da empresa (de forma gratuita), mas a guarda, conservação e uso correto são deveres do trabalhador.",
            "",
          ],
          [
            "2. Na sinalização de segurança, a cor vermelha é utilizada tanto para equipamentos de incêndio quanto para indicar rotas de fuga e saídas seguras.",
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
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! O dever de guarda do EPI é do empregado (V). A cor para rotas de fuga é Verde, e não Vermelha (F).",
          mensagemErrada: "Incorreto. Reveja as cores da sinalização (Vermelho é exclusivo para incêndio; Verde é rota de fuga).",
        },
        {
          id: "m2-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! O dever de guarda do EPI é do empregado (V). A cor para rotas de fuga é Verde, e não Vermelha (F).",
          mensagemErrada: "Incorreto. Reveja as cores da sinalização (Vermelho é exclusivo para incêndio; Verde é rota de fuga).",
        },
      ],
    },
    {
      id: "calculo-matriz-riscos",
      titulo: "[Simulação de Auditoria] Cálculo na Matriz de Riscos",
      cenario:
        "Como auditor de segurança, você identificou uma prensa mecânica operando sem a proteção frontal. Calcule o Nível de Risco final aplicando a fórmula padrão de avaliação (Probabilidade × Severidade).",
      instrucao: "Informe o NÍVEL DE RISCO (valor numérico resultante).",
      tabelaReferencia: {
        colunas: ["Indicador Avaliado", "Peso Atribuído"],
        linhas: [
          ["Índice de Probabilidade (Ocorrência Frequente)", "3"],
          ["Índice de Severidade (Risco de Amputação)", "4"],
        ],
      },
      campos: [
        {
          id: "m3-risco",
          placeholder: "Digite apenas o número (Ex: 8)...",
          regra: { tipo: "numero", esperado: 12 },
          mensagemCerta: "Cálculo exato! Nível de Risco = Probabilidade (3) × Severidade (4) = 12.",
          mensagemErrada: "Incorreto. Efetue a multiplicação direta dos índices na tabela (3 vezes 4).",
        },
      ],
    },
    {
      id: "protocolo-primeiros-socorros",
      titulo: "[Sequenciamento] Protocolo de Primeiros Socorros e Resgate",
      cenario: "Um operário sofreu um acidente envolvendo um painel elétrico na fábrica.",
      instrucao: "Ordene corretamente as ações do protocolo internacional de emergência (PAS - Proteger, Avisar, Socorrer):",
      tabelaReferencia: {
        colunas: ["Ação de Emergência", "Ordem Correta (1º ao 3º)"],
        linhas: [
          ["Desligar a chave geral para isolar o local e garantir a segurança de todos.", ""],
          ["Acionar imediatamente o resgate especializado (SAMU/Bombeiros).", ""],
          ["Prestar suporte básico à vítima apenas se possuir treinamento adequado.", ""],
        ],
      },
      campos: [
        {
          id: "m4-ord1",
          rotulo: "Desligar a chave geral de energia",
          regra: {
            tipo: "selecao",
            esperado: "1",
            opcoes: [
              { valor: "1", texto: "1º Passo (Prioridade Máxima)" },
              { valor: "2", texto: "2º Passo" },
              { valor: "3", texto: "3º Passo" },
            ],
          },
          mensagemCerta: "Excelente! Sequência P.A.S. correta: 1º Proteger a cena (energia), 2º Avisar o resgate, 3º Socorrer.",
          mensagemErrada: "Incorreto. A ordem vital é: 1º Proteger (desligar energia), 2º Avisar (chamar socorro), 3º Socorrer.",
        },
        {
          id: "m4-ord2",
          rotulo: "Acionar o resgate especializado (SAMU/Bombeiros)",
          regra: {
            tipo: "selecao",
            esperado: "2",
            opcoes: [
              { valor: "1", texto: "1º Passo (Prioridade Máxima)" },
              { valor: "2", texto: "2º Passo" },
              { valor: "3", texto: "3º Passo" },
            ],
          },
          mensagemCerta: "Excelente! Sequência P.A.S. correta: 1º Proteger a cena (energia), 2º Avisar o resgate, 3º Socorrer.",
          mensagemErrada: "Incorreto. A ordem vital é: 1º Proteger (desligar energia), 2º Avisar (chamar socorro), 3º Socorrer.",
        },
        {
          id: "m4-ord3",
          rotulo: "Prestar suporte básico à vítima, se capacitado",
          regra: {
            tipo: "selecao",
            esperado: "3",
            opcoes: [
              { valor: "1", texto: "1º Passo (Prioridade Máxima)" },
              { valor: "2", texto: "2º Passo" },
              { valor: "3", texto: "3º Passo" },
            ],
          },
          mensagemCerta: "Excelente! Sequência P.A.S. correta: 1º Proteger a cena (energia), 2º Avisar o resgate, 3º Socorrer.",
          mensagemErrada: "Incorreto. A ordem vital é: 1º Proteger (desligar energia), 2º Avisar (chamar socorro), 3º Socorrer.",
        },
      ],
    },
    {
      id: "etica-omissao-acidentes",
      titulo: "[Análise Crítica] Ética Profissional e Omissão de Acidentes",
      cenario:
        "Um trabalhador sofreu um corte profundo na mão durante o turno. O encarregado de produção exige que o Técnico de Segurança não registre a Comunicação de Acidente de Trabalho (CAT) para que o setor não perca o prêmio do placar \"Dias Sem Acidentes\".",
      instrucao: "Qual deve ser o posicionamento ético e legal do profissional de segurança diante dessa exigência?",
      campos: [
        {
          id: "m5-dissertativa",
          placeholder:
            "Justifique sua resposta mencionando a obrigatoriedade da lei, a emissão do documento adequado (CAT) e a não omissão de dados...",
          regra: { tipo: "texto", minPalavras: 6, minCaracteres: 25, palavrasChave: /cat|obrigat|lei|étic|ocult|fraude|registrar|notific|emit/i },
          mensagemCerta: "Diagnóstico ético perfeito. A emissão da CAT é uma obrigação legal inegociável, garantindo os direitos do trabalhador.",
          mensagemErrada:
            "Você precisa mencionar explicitamente a obrigação de \"emitir a CAT\", cumprir a \"lei\" ou manter a \"ética\", não ocultando dados.",
        },
      ],
    },
  ],
};

export default atividade;
