import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Elaboração e Interpretação do Mapa de Riscos",
  introducao: "Conceito e elaboração do mapa de riscos (NR-5), padronização de cores e regras de representação.",
  itens: [
    {
      id: "conceito-elaboracao-mapa-nr5",
      titulo: "[Preenchimento de Lacunas] Conceito e Elaboração do Mapa (NR-5)",
      instrucao:
        "Complete o texto sobre o propósito e a responsabilidade da criação do Mapa de Riscos: o Mapa de Riscos é uma representação gráfica (planta baixa) que identifica os riscos ocupacionais em cada setor. A NR-5 estabelece que a elaboração é atribuição obrigatória de quem; o mapa deve ser afixado em local de fácil quê; e deve ser atualizado com que periodicidade (ou sempre que houver modificações significativas no layout ou processos produtivos).",
      campos: [
        {
          id: "m1-l1",
          rotulo: "Responsável pela elaboração do mapa (NR-5)",
          regra: {
            tipo: "selecao",
            esperado: "CIPA",
            opcoes: [
              { valor: "CIPA", texto: "CIPA" },
              { valor: "SESMT", texto: "SESMT" },
            ],
          },
          mensagemCerta: "Perfeito! A elaboração é responsabilidade da CIPA, deve ser exposto publicamente e atualizado a cada gestão (anualmente).",
          mensagemErrada: "Incorreto. A responsabilidade normativa é da CIPA, o acesso deve ser livre (visualização) e a renovação é anual.",
        },
        {
          id: "m1-l2",
          rotulo: "O mapa deve ser afixado em local de fácil...",
          regra: {
            tipo: "selecao",
            esperado: "visualizacao",
            opcoes: [
              { valor: "visualizacao", texto: "visualização" },
              { valor: "acesso_restrito", texto: "acesso restrito da chefia" },
            ],
          },
          mensagemCerta: "Perfeito! A elaboração é responsabilidade da CIPA, deve ser exposto publicamente e atualizado a cada gestão (anualmente).",
          mensagemErrada: "Incorreto. A responsabilidade normativa é da CIPA, o acesso deve ser livre (visualização) e a renovação é anual.",
        },
        {
          id: "m1-l3",
          rotulo: "Periodicidade obrigatória de atualização",
          regra: {
            tipo: "selecao",
            esperado: "anual",
            opcoes: [
              { valor: "anual", texto: "Anual (a cada nova gestão)" },
              { valor: "mensal", texto: "Mensal" },
            ],
          },
          mensagemCerta: "Perfeito! A elaboração é responsabilidade da CIPA, deve ser exposto publicamente e atualizado a cada gestão (anualmente).",
          mensagemErrada: "Incorreto. A responsabilidade normativa é da CIPA, o acesso deve ser livre (visualização) e a renovação é anual.",
        },
      ],
    },
    {
      id: "padronizacao-cores",
      titulo: "[Associação] Padronização de Cores por Natureza do Risco",
      instrucao:
        "No mapa, os perigos são representados por círculos coloridos. Associe a categoria do risco ambiental à cor correspondente estabelecida na legislação:",
      tabelaReferencia: {
        colunas: ["Categoria e Exemplos de Agentes", "Cor no Mapa"],
        linhas: [
          ["Riscos Químicos (Névoas, poeiras minerais, solventes, vapores tóxicos)", ""],
          ["Riscos Ergonômicos (Postura inadequada, esforço físico intenso, jornada excessiva)", ""],
          ["Riscos Mecânicos / Acidentes (Arranjo físico deficiente, máquinas sem proteção, incêndio)", ""],
          ["Riscos Físicos (Ruído, vibração, radiações, calor/frio extremo)", ""],
        ],
      },
      campos: [
        {
          id: "m2-a1",
          rotulo: "Riscos Químicos (névoas, poeiras, solventes, vapores tóxicos)",
          regra: {
            tipo: "selecao",
            esperado: "vermelho",
            opcoes: [
              { valor: "verde", texto: "Verde" },
              { valor: "vermelho", texto: "Vermelho" },
              { valor: "marrom", texto: "Marrom" },
              { valor: "amarelo", texto: "Amarelo" },
              { valor: "azul", texto: "Azul" },
            ],
          },
          mensagemCerta: "Excelente correspondência! Químico(Vermelho), Ergonômico(Amarelo), Acidente(Azul) e Físico(Verde).",
          mensagemErrada: "Incorreto. Revise o padrão legal: Químico=Vermelho; Ergonômico=Amarelo; Acidente=Azul; Físico=Verde.",
        },
        {
          id: "m2-a2",
          rotulo: "Riscos Ergonômicos (postura, esforço físico intenso, jornada excessiva)",
          regra: {
            tipo: "selecao",
            esperado: "amarelo",
            opcoes: [
              { valor: "verde", texto: "Verde" },
              { valor: "vermelho", texto: "Vermelho" },
              { valor: "marrom", texto: "Marrom" },
              { valor: "amarelo", texto: "Amarelo" },
              { valor: "azul", texto: "Azul" },
            ],
          },
          mensagemCerta: "Excelente correspondência! Químico(Vermelho), Ergonômico(Amarelo), Acidente(Azul) e Físico(Verde).",
          mensagemErrada: "Incorreto. Revise o padrão legal: Químico=Vermelho; Ergonômico=Amarelo; Acidente=Azul; Físico=Verde.",
        },
        {
          id: "m2-a3",
          rotulo: "Riscos Mecânicos / Acidentes (arranjo físico deficiente, máquinas sem proteção, incêndio)",
          regra: {
            tipo: "selecao",
            esperado: "azul",
            opcoes: [
              { valor: "verde", texto: "Verde" },
              { valor: "vermelho", texto: "Vermelho" },
              { valor: "marrom", texto: "Marrom" },
              { valor: "amarelo", texto: "Amarelo" },
              { valor: "azul", texto: "Azul" },
            ],
          },
          mensagemCerta: "Excelente correspondência! Químico(Vermelho), Ergonômico(Amarelo), Acidente(Azul) e Físico(Verde).",
          mensagemErrada: "Incorreto. Revise o padrão legal: Químico=Vermelho; Ergonômico=Amarelo; Acidente=Azul; Físico=Verde.",
        },
        {
          id: "m2-a4",
          rotulo: "Riscos Físicos (ruído, vibração, radiações, calor/frio extremo)",
          regra: {
            tipo: "selecao",
            esperado: "verde",
            opcoes: [
              { valor: "verde", texto: "Verde" },
              { valor: "vermelho", texto: "Vermelho" },
              { valor: "marrom", texto: "Marrom" },
              { valor: "amarelo", texto: "Amarelo" },
              { valor: "azul", texto: "Azul" },
            ],
          },
          mensagemCerta: "Excelente correspondência! Químico(Vermelho), Ergonômico(Amarelo), Acidente(Azul) e Físico(Verde).",
          mensagemErrada: "Incorreto. Revise o padrão legal: Químico=Vermelho; Ergonômico=Amarelo; Acidente=Azul; Físico=Verde.",
        },
      ],
    },
    {
      id: "regras-representacao-circulos",
      titulo: "[Matriz Verdadeiro ou Falso] Regras de Representação (Círculos)",
      instrucao:
        "O tamanho e a disposição dos círculos no layout transmitem informações cruciais sobre a severidade e sobreposição de perigos. Julgue as regras abaixo:",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica sobre o Mapa", "Classificação"],
        linhas: [
          [
            "1. O tamanho do círculo desenhado no mapa indica o grau de intensidade do risco (Pequeno = Leve; Médio = Médio; Grande = Elevado).",
            "",
          ],
          [
            "2. Se no mesmo local (ex: setor de usinagem) existirem riscos de naturezas diferentes e de intensidades diferentes, é obrigatório desenhar vários círculos separados, sendo proibido dividir um mesmo círculo em fatias coloridas.",
            "",
          ],
        ],
      },
      campos: [
        {
          id: "m3-vf1",
          rotulo: "Afirmação 1",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Correto! O tamanho dita a gravidade (V). É perfeitamente legal (e recomendado) dividir/fatiar um círculo para riscos de mesmo grau no mesmo local (F).",
          mensagemErrada:
            "Atenção à afirmativa 2: Quando há riscos diferentes com o MESMO grau no mesmo local, DEVE-SE fatiar o círculo (pizza) para não poluir o mapa (Afirmação 2 é Falsa).",
        },
        {
          id: "m3-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta:
            "Correto! O tamanho dita a gravidade (V). É perfeitamente legal (e recomendado) dividir/fatiar um círculo para riscos de mesmo grau no mesmo local (F).",
          mensagemErrada:
            "Atenção à afirmativa 2: Quando há riscos diferentes com o MESMO grau no mesmo local, DEVE-SE fatiar o círculo (pizza) para não poluir o mapa (Afirmação 2 é Falsa).",
        },
      ],
    },
    {
      id: "agrupamento-agentes-mesma-natureza",
      titulo: "[Cálculo Visual] Agrupamento de Agentes da Mesma Natureza",
      cenario:
        "Em um galpão industrial, o técnico de segurança identificou que os soldadores estão expostos a 3 agentes ergonômicos distintos (postura inadequada, repetitividade e peso excessivo), mas todos esses três agentes possuem exatamente o mesmo grau de risco (Risco Médio).",
      instrucao:
        "Para não poluir o mapa, a recomendação técnica dita que eles devem ser agrupados. Quantos círculos amarelos de tamanho médio você precisará desenhar neste setor específico da planta?",
      campos: [
        {
          id: "m4-input",
          placeholder: "Digite apenas o número (Ex: 5)...",
          regra: { tipo: "padrao", padrao: /^(1|um)$/i },
          mensagemCerta:
            "Cálculo preciso! Sendo todos do mesmo grupo (ergonômico) e mesma gradação (médio), você desenha apenas UM círculo e lista os 3 agentes dentro/ao lado dele.",
          mensagemErrada:
            "Incorreto. Se os riscos pertencem ao mesmo grupo (Amarelo) e possuem a mesma intensidade (Médio), eles são fundidos. O número correto é 1.",
        },
      ],
    },
    {
      id: "divisao-circulos-otimizacao-visual",
      titulo: "[Análise Situacional] Divisão de Círculos e Otimização Visual",
      cenario:
        "Cenário de Análise: Ao inspecionar a área de estamparia (prensas), a equipe da CIPA constatou a presença de Ruído excessivo (Risco Físico) e Risco de prensamento de membros (Risco de Acidente). Ambos os perigos foram classificados com o grau MÁXIMO (Elevado). Para representar isso na planta, o secretário da CIPA sugeriu desenhar apenas UM círculo grande dividido ao meio: metade verde e metade azul.",
      instrucao:
        "Como membro experiente da CIPA, avalie a proposta do secretário (mínimo de 10 palavras). Confirme se o procedimento de dividir (fatiar) o círculo para riscos de mesma gradação está correto para evitar poluição visual.",
      campos: [
        {
          id: "m5-dissertativa",
          placeholder:
            "Ex: O procedimento proposto está perfeitamente correto. Quando há mais de um risco com o mesmo grau no mesmo local, divide-se o círculo em partes iguais para não poluir visualmente a planta...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /correto|certo|dividi|fatia|polui|mesmo grau|mesma gradação|fração|frações/i,
          },
          mensagemCerta:
            "Avaliação perfeita! Dividir um único círculo grande (metade Verde/Físico e metade Azul/Acidente) é a prática correta e recomendada pelo MTE para otimizar a planta.",
          mensagemErrada:
            "Você deve avaliar se a atitude foi correta e mencionar a técnica de \"dividir\" o círculo para perigos de \"mesmo grau\" evitando \"poluir\" o mapa.",
        },
      ],
    },
  ],
};

export default atividade;
