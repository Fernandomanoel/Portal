import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_LICENCAS = [
  { valor: "gala", texto: "Até 3 dias consecutivos de afastamento sem prejuízo do salário." },
  { valor: "maternidade", texto: "120 dias de afastamento pago (podendo ampliar em empresas do Programa Empresa Cidadã)." },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeira (V)" },
  { valor: "F", texto: "Falsa (F)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Departamento Pessoal III — Jornada Noturna, Horas Extras, Licenças e CAT",
  introducao:
    "Aprofunde seus conhecimentos em rotinas avançadas de DP com diferentes formatos de questões: Múltipla Escolha sobre Jornada e Adicional Noturno, Tabela de Associação de Licenças de Afastamento, Cálculo de Salário-Hora e Hora Extra (50%), Checkboxes de CAT e Estabilidade Acidentária, e Redação sobre Doenças Ocupacionais.",
  itens: [
    {
      id: "jornada-noturna",
      titulo: "Regras do Trabalho Noturno Urbano (Art. 73 da CLT)",
      cenario:
        "Um funcionário do setor logístico de uma empresa urbana trabalha no turno da madrugada. De acordo com a CLT, qual é o horário considerado Trabalho Noturno, qual a duração da hora noturna reduzida e a porcentagem mínima do adicional?",
      campos: [
        {
          id: "jornada-noturna",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Das 20h às 6h do dia seguinte; hora de 60 minutos; adicional noturno mínimo de 15%.",
              "Das 22h às 5h do dia seguinte; hora computada em 52 minutos e 30 segundos; adicional mínimo de 20% sobre a hora diurna.",
              "Das 00h às 6h; hora computada em 50 minutos; adicional fixo obrigatoriamente de 50%.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O trabalho noturno urbano é das 22h às 5h, com hora de 52m30s e adicional mínimo de 20%.",
          mensagemErrada: "Incorreto. O período noturno urbano é das 22h às 5h com hora reduzida de 52min30s e adicional de 20%.",
        },
      ],
    },
    {
      id: "licencas-remuneradas",
      titulo: "Licenças Trabalhistas Remuneradas (CLT)",
      instrucao:
        "Associe o motivo do afastamento do colaborador à respectiva quantidade de dias de licença remunerada garantidos pela legislação trabalhista:",
      campos: [
        {
          id: "licenca-gala",
          rotulo: "Licença Gala (Casamento do Empregado)",
          regra: { tipo: "selecao", esperado: "gala", opcoes: OPCOES_LICENCAS },
          mensagemCerta: "Correto — a Licença Gala garante até 3 dias consecutivos sem prejuízo do salário.",
          mensagemErrada: "Revise: a Licença Gala garante até 3 dias consecutivos de afastamento sem prejuízo do salário.",
        },
        {
          id: "licenca-maternidade",
          rotulo: "Licença Maternidade (Gestante / Adotante)",
          regra: { tipo: "selecao", esperado: "maternidade", opcoes: OPCOES_LICENCAS },
          mensagemCerta: "Correto — a Licença Maternidade garante 120 dias de afastamento pago.",
          mensagemErrada: "Revise: a Licença Maternidade garante 120 dias de afastamento pago (podendo ampliar via Empresa Cidadã).",
        },
      ],
    },
    {
      id: "salario-hora-horas-extras",
      titulo: "Cálculos de Folha: Salário-Hora e Horas Extras",
      cenario:
        "O colaborador Marcos possui salário base mensal de R$ 2.200,00 para uma jornada padrão de 220 horas mensais. No mês trabalhado, ele realizou exatamente 10 horas extras com adicional de 50%.",
      instrucao:
        "Fórmulas rápidas: Salário-Hora Normal = Salário Base / 220 horas. Valor da Hora Extra (50%) = Salário-Hora Normal × 1,5. Total de Horas Extras = Valor da Hora Extra × Quantidade de Horas Realizadas.",
      campos: [
        {
          id: "salario-hora-normal",
          rotulo: "Valor do Salário-Hora Normal em R$",
          placeholder: "Ex: 10",
          regra: { tipo: "numero", esperado: 10 },
          mensagemCerta: "Salário-Hora correto: R$ 2.200 / 220 = R$ 10,00.",
          mensagemErrada: "Incorreto. Divida R$ 2.200 por 220 horas (Resultado: 10).",
        },
        {
          id: "total-horas-extras",
          rotulo: "Valor TOTAL a receber pelas 10 Horas Extras (50%) em R$",
          placeholder: "Ex: 150",
          regra: { tipo: "numero", esperado: 150 },
          mensagemCerta: "Total de Horas Extras correto: (R$ 10 × 1,5) × 10 horas = R$ 150,00.",
          mensagemErrada: "Incorreto. A hora extra com 50% vale R$ 15,00. Multiplique por 10 (Resultado: 150).",
        },
      ],
    },
    {
      id: "cat-estabilidade",
      titulo: "CAT (Comunicação de Acidente) e Estabilidade Acidentária",
      instrucao:
        "Julgue cada afirmativa sobre a emissão de CAT e a estabilidade provisória do trabalhador acidentado como verdadeira ou falsa:",
      campos: [
        {
          id: "cat-prazo-emissao",
          rotulo: "A CAT deve ser emitida pela empresa até o primeiro dia útil seguinte ao do acidente (ou imediatamente em caso de morte).",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Correto — o prazo de emissão da CAT é o 1º dia útil seguinte ao acidente (ou imediato em caso de morte).",
        },
        {
          id: "cat-demissao-imediata",
          rotulo: "A empresa pode demitir sem justa causa o empregado acidentado no mesmo dia em que ele retorna do afastamento do INSS.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemErrada:
            "Falso — o empregado possui estabilidade provisória após o retorno do afastamento pelo INSS, a demissão imediata é vedada.",
        },
        {
          id: "cat-estabilidade-12-meses",
          rotulo:
            "O segurado que sofreu acidente de trabalho e recebeu auxílio-doença acidentário (B91) tem garantida a estabilidade no emprego por pelo menos 12 meses após a alta do INSS.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Correto — a estabilidade acidentária é de 12 meses após a alta do INSS.",
        },
      ],
    },
    {
      id: "doencas-ocupacionais-sst",
      titulo: "Doenças Ocupacionais e Função Estratégica do DP",
      cenario:
        "Doenças profissionais ou do trabalho (como LER/DORT decorrentes de esforço repetitivo) são equiparadas por lei a acidentes de trabalho. Explique a importância da atuação conjunta do Departamento Pessoal com a área de Segurança e Saúde no Trabalho (SST) para emissão da CAT e prevenção de doenças ocupacionais.",
      campos: [
        {
          id: "doencas-ocupacionais-sst",
          placeholder:
            "Explique a necessidade de manter o eSocial atualizado (eventos S-2210 e S-2240), gerenciar laudos de SST (PGR/PCMSO) e emitir a CAT para garantir os direitos do trabalhador e evitar penalidades...",
          regra: { tipo: "texto", minPalavras: 4, palavrasChave: /cat|esocial|sst|saúde|segurança|doença|laudo|pcmso|pgr|prevenç/i },
          mensagemErrada: "Mencione a emissão de CAT, integração com eSocial/SST ou laudos preventivos de saúde ocupacional.",
        },
      ],
    },
  ],
};

export default atividade;
