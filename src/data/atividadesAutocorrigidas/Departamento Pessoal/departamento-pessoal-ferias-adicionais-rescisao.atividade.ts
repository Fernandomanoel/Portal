import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_RESCISAO = [
  { valor: "justacausa", texto: "O empregado perde o direito ao aviso prévio, saque do FGTS, multa de 40% e seguro-desemprego." },
  {
    valor: "acordo",
    texto: "Rescisão por Acordo (Art. 484-A): Aviso prévio e multa do FGTS pagos pela metade (20%), e saque de até 80% do saldo.",
  },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeira (V)" },
  { valor: "F", texto: "Falsa (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Departamento Pessoal II — Férias, Adicionais e Rescisão Contratual",
  introducao:
    "Aprofunde suas competências em DP com diferentes tipos de questões: Múltipla Escolha sobre Adicional de Periculosidade, Tabela de Associação de Modalidades de Demissão, Cálculo de Terço de Férias e Vale-Transporte, Checkboxes de Regras Concessivas e Análise Dissertativa de Licença Médica e INSS.",
  itens: [
    {
      id: "adicional-periculosidade",
      titulo: "Remuneração e Adicional de Periculosidade (CLT)",
      cenario:
        "Um eletricista realiza suas atividades diárias em contato contínuo com sistema elétrico de potência sob alta tensão, configurando risco acentuado de vida. Qual é o percentual do Adicional de Periculosidade e qual a sua base de cálculo legal?",
      campos: [
        {
          id: "adicional-periculosidade",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "20% calculados exclusivamente sobre o valor do Salário Mínimo vigente.",
              "30% calculados sobre o Salário Base do empregado, sem os acréscimos resultantes de gratificações ou prêmios.",
              "Percentual variável entre 10%, 20% e 40%, dependendo do grau de risco apurado por laudo técnico.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Periculosidade é de 30% incidente sobre o salário base do trabalhador.",
          mensagemErrada: "Incorreto. O adicional de periculosidade é fixado em 30% sobre o salário base contratual.",
        },
      ],
    },
    {
      id: "modalidades-rescisao",
      titulo: "Modalidades de Rescisão: Justa Causa vs. Acordo Mútuo",
      instrucao: "Associe o tipo de rescisão do contrato de trabalho às suas respectivas regras de verbas e direitos rescisórios:",
      campos: [
        {
          id: "justa-causa-regra",
          rotulo: "Demissão por Justa Causa (Art. 482 da CLT)",
          regra: { tipo: "selecao", esperado: "justacausa", opcoes: OPCOES_RESCISAO },
          mensagemCerta: "Correto — na justa causa o empregado perde aviso prévio, saque do FGTS, multa de 40% e seguro-desemprego.",
          mensagemErrada:
            "Revise a Demissão por Justa Causa (Art. 482): o empregado perde aviso prévio, saque do FGTS, multa de 40% e seguro-desemprego.",
        },
        {
          id: "acordo-mutuo-regra",
          rotulo: "Rescisão por Acordo Mútuo (Art. 484-A da CLT)",
          regra: { tipo: "selecao", esperado: "acordo", opcoes: OPCOES_RESCISAO },
          mensagemCerta: "Correto — no acordo mútuo (Art. 484-A), aviso prévio e multa do FGTS são pagos pela metade, com saque de até 80%.",
          mensagemErrada:
            "Revise a Rescisão por Acordo Mútuo (Art. 484-A): aviso prévio e multa do FGTS são pagos pela metade (20%), com saque de até 80% do saldo.",
        },
      ],
    },
    {
      id: "terco-vale-transporte",
      titulo: "Cálculos Práticos: Terço de Férias e Desconto de VT",
      cenario:
        "A funcionária Camila recebe um salário fixo de R$ 3.000,00. Ela irá gozar 30 dias de férias regulamentares e optou por utilizar o benefício do Vale-Transporte.",
      instrucao:
        "Fórmulas rápidas: Adicional Constitucional de Férias (1/3) = Salário Bruto / 3. Desconto Máximo de Vale-Transporte (6%) = Salário Base × 0,06.",
      campos: [
        {
          id: "terco-ferias-valor",
          rotulo: "Valor do Terço Constitucional (1/3) de Férias em R$",
          placeholder: "Ex: 1000",
          regra: { tipo: "numero", esperado: 1000 },
          mensagemCerta: "Terço de férias correto: R$ 3.000 / 3 = R$ 1.000,00.",
          mensagemErrada: "Incorreto. Divida R$ 3.000 por 3 (Resultado: 1000).",
        },
        {
          id: "desconto-vt-valor",
          rotulo: "Valor limite do desconto de VT na folha (6%) em R$",
          placeholder: "Ex: 180",
          regra: { tipo: "numero", esperado: 180 },
          mensagemCerta: "Desconto de VT correto: R$ 3.000 × 0,06 = R$ 180,00.",
          mensagemErrada: "Incorreto. Calcule 6% sobre R$ 3.000 (Resultado: 180).",
        },
      ],
    },
    {
      id: "regras-ferias-vf",
      titulo: "Regulamentação de Férias Individuais após a Reforma Trabalhista",
      instrucao: "Julgue cada regra sobre a concessão e o pagamento de férias de acordo com a CLT como verdadeira ou falsa:",
      campos: [
        {
          id: "ferias-fracionamento",
          rotulo:
            "As férias podem ser fracionadas em até 3 períodos, desde que um deles não seja inferior a 14 dias e os demais não sejam inferiores a 5 dias cada.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Correto — o fracionamento em até 3 períodos (um de ao menos 14 dias, os demais de ao menos 5) é permitido pela CLT.",
        },
        {
          id: "ferias-inicio-feriado",
          rotulo:
            "É permitido ao empregador fixar o início das férias nos 2 dias que antecedem feriado ou dia de descanso semanal remunerado (DSR).",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta: "Correto — é vedado iniciar as férias nos 2 dias que antecedem feriado ou DSR.",
          mensagemErrada:
            "Atenção: é vedado ao empregador iniciar as férias nos 2 dias que antecedem feriado ou DSR — a afirmação é falsa.",
        },
        {
          id: "ferias-prazo-pagamento",
          rotulo: "O pagamento da remuneração das férias e do terço constitucional deve ser efetuado até 2 dias antes do início do período de gozo.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Correto — o pagamento deve ocorrer até 2 dias antes do início do gozo das férias.",
        },
      ],
    },
    {
      id: "licenca-medica-inss",
      titulo: "Gestão de Licença Médica e Afastamento Previdenciário",
      cenario:
        "Um colaborador apresentou atestado médico comprovando a necessidade de afastamento do trabalho por 30 dias seguidos devido a um problema de saúde. Explique a divisão de responsabilidade financeira entre a empresa e o INSS (Previdência Social) durante esse período.",
      campos: [
        {
          id: "licenca-medica-inss",
          placeholder:
            "Explique que a empresa é responsável pelo pagamento integral dos primeiros 15 dias de afastamento, e a partir do 16º dia o trabalhador é encaminhado à perícia médica do INSS para recebimento do Auxílio-Doença...",
          regra: { tipo: "texto", minPalavras: 4, palavrasChave: /15|quinze|empresa|inss|16|dezesseis|perícia|previdênc|auxílio|doença/i },
          mensagemErrada: "Mencione o pagamento dos primeiros 15 dias pela empresa e o encaminhamento ao INSS a partir do 16º dia.",
        },
      ],
    },
  ],
};

export default atividade;
