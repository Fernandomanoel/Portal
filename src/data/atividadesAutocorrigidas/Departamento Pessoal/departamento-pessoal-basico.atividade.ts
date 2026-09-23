import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_ENCARGO = [
  { valor: "desconto", texto: "Desconto progressivo retido em folha diretamente do salário do empregado" },
  { valor: "encargo", texto: "Encargo exclusivo do empregador (8%), sem qualquer desconto no salário do empregado" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Assistente de Departamento Pessoal (DP)",
  introducao:
    "Desenvolva competências práticas em Admissão e eSocial, Cálculos Trabalhistas de Horas Extras e DSR, Encargos de Folha (INSS/FGTS), Gestão de Férias e Rescisão Contratual segundo a CLT.",
  itens: [
    {
      id: "esocial-admissao",
      titulo: "Rotinas de Admissão e Transmissão do eSocial (Evento S-2200)",
      cenario:
        "Um novo colaborador foi contratado para iniciar suas atividades na próxima segunda-feira. De acordo com as regras do eSocial e da legislação trabalhista vigentes, qual é o prazo correto para o envio do evento de Cadastramento Inicial / Admissão de Trabalhador (S-2200 ou S-2190 preliminar)?",
      campos: [
        {
          id: "esocial-admissao",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Até 5 dias úteis após o início do trabalho do funcionário na empresa.",
              "Até o dia imediatamente anterior ao início da prestação de serviços do trabalhador.",
              "Até o dia 7 do mês subsequente ao da contratação, junto com o fechamento da folha.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O evento S-2200 deve ser transmitido até o dia útil imediatamente anterior ao início do trabalho.",
          mensagemErrada: "Incorreto. A legislação do eSocial exige a transmissão da admissão até o dia anterior ao início do trabalho.",
        },
      ],
    },
    {
      id: "horas-extras-dsr",
      titulo: "Jornada de Trabalho: Horas Extras (50%) e Descanso Semanal Remunerado (DSR)",
      cenario:
        "Um funcionário com salário mensal fixo recebe pelo valor por hora de R$ 20,00. No mês corrente, ele realizou 10 horas extras diurnas (com adicional de 50%). Explique como calcular o valor das horas extras e a incidência sobre o DSR (Descanso Semanal Remunerado).",
      campos: [
        {
          id: "horas-extras-calculo",
          rotulo: "Cálculo do Valor das 10 Horas Extras (R$ 20/h + 50%)",
          placeholder: "Ex: Hora com adicional = R$ 30,00. Total das 10 horas extras = R$ 300,00...",
          regra: { tipo: "texto", minPalavras: 3 },
        },
        {
          id: "dsr-logica",
          rotulo: "Lógica de Cálculo do DSR sobre Horas Extras",
          placeholder: "Ex: Divide-se o valor das HE pelos dias úteis e multiplica-se pelos domingos e feriados do mês...",
          regra: { tipo: "texto", minPalavras: 3 },
        },
      ],
    },
    {
      id: "inss-fgts",
      titulo: "Folha de Pagamento: Retenção de INSS e Depósito de FGTS",
      instrucao: "Associe os conceitos de encargos sociais e trabalhistas incidentes sobre o salário bruto:",
      campos: [
        {
          id: "inss-classificacao",
          rotulo: "INSS (Contribuição Previdenciária do Empregado)",
          regra: { tipo: "selecao", esperado: "desconto", opcoes: OPCOES_ENCARGO },
          mensagemCerta: "Perfeito! O INSS é descontado do empregado diretamente na folha.",
          mensagemErrada: "Incorreto. Lembre-se: o INSS é descontado do salário do empregado, não é encargo exclusivo do empregador.",
        },
        {
          id: "fgts-classificacao",
          rotulo: "FGTS (Fundo de Garantia do Tempo de Serviço)",
          regra: { tipo: "selecao", esperado: "encargo", opcoes: OPCOES_ENCARGO },
          mensagemCerta: "Perfeito! O FGTS é encargo suportado integralmente pelo empregador.",
          mensagemErrada: "Incorreto. Lembre-se: o FGTS é encargo da empresa, não é descontado do salário do empregado.",
        },
      ],
    },
    {
      id: "ferias-periodo-concessivo",
      titulo: "Gestão de Férias: Período Aquisitivo, Concessivo e Férias em Dobro",
      cenario:
        "A cada 12 meses de trabalho (Período Aquisitivo), o empregado adquire o direito a 30 dias de férias, que devem ser concedidas nos 12 meses subsequentes (Período Concessivo). Explique o que ocorre juridicamente e financeiramente caso a empresa não conceda as férias dentro do período concessivo.",
      campos: [
        {
          id: "ferias-periodo-concessivo",
          placeholder:
            "Explique que a empresa é obrigada a pagar a remuneração das férias em dobro (conforme Art. 137 da CLT), além do terço constitucional, mantendo a obrigação do gozo dos dias de descanso...",
          regra: { tipo: "texto", minPalavras: 4, palavrasChave: /dobro|137|clt|concessiv|multa|pagament|terço|penalidad/i },
          mensagemErrada: "Mencione a obrigação de pagamento em dobro (Art. 137 da CLT) das férias não concedidas no prazo.",
        },
      ],
    },
    {
      id: "rescisao-acordo-mutuo",
      titulo: "Rescisão do Contrato de Trabalho: Demissão por Acordo (Art. 484-A da CLT)",
      cenario:
        "Com a Reforma Trabalhista, criou-se a figura do Desligamento por Acordo Mutuo (Art. 484-A da CLT). Quais são os direitos do empregado nessa modalidade de rescisão em relação ao Aviso Prévio indenizado, à multa rescisória do FGTS e ao saque do FGTS?",
      campos: [
        {
          id: "rescisao-acordo-mutuo",
          placeholder:
            "Discorra sobre o pagamento de metade do aviso prévio indenizado (50%), metade da multa do FGTS (20%), movimentação de até 80% do saldo do FGTS e impossibilidade de recebimento do seguro-desemprego...",
          regra: { tipo: "texto", minPalavras: 4, palavrasChave: /50%|20%|80%|metade|acordo|multa|aviso|fgts|seguro|484/i },
          mensagemErrada: "Mencione a redução do aviso prévio (50%), multa do FGTS (20%) ou o saque limitado de 80% do FGTS.",
        },
      ],
    },
  ],
};

export default atividade;
