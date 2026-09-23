import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_EVENTOS_ESOCIAL = [
  { valor: "S-1000", texto: "S-1000 (Informações do Empregador)" },
  { valor: "S-1200", texto: "S-1200 (Remuneração do Trabalhador)" },
];

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const OPCOES_PASSOS_DISCIPLINARES = [
  { valor: "1", texto: "1º Passo (Inicial)" },
  { valor: "2", texto: "2º Passo (Intermediário)" },
  { valor: "3", texto: "3º Passo (Grave)" },
  { valor: "4", texto: "4º Passo (Extremo / Rescisão)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Departamento Pessoal IV — Novos Formatos de Interação",
  introducao:
    "Experimente uma dinâmica de questões totalmente renovada: Preenchimento de Lacunas no Texto (eSocial), Matriz de Verdadeiro ou Falso (Estabilidade), Simulação de Holerite Interativo, Ordenação de Processo Disciplinar e Análise Crítica com Diagnóstico de DP.",
  itens: [
    {
      id: "esocial-lacunas",
      titulo: "Ecossistema do eSocial e Eventos Periódicos",
      cenario:
        "No eSocial, o cadastro de dados da empresa e tabelas iniciais é enviado pelo evento (lacuna 1). Já as informações relativas ao pagamento mensal e fechamento da folha são transmitidas através do evento periódico (lacuna 2), sendo os valores de FGTS recolhidos diretamente via sistema do (lacuna 3).",
      instrucao: "Complete o texto selecionando o termo correto para cada lacuna.",
      campos: [
        {
          id: "lacuna-cadastro-inicial",
          rotulo: "Lacuna 1 — Cadastro de dados da empresa e tabelas iniciais",
          regra: { tipo: "selecao", esperado: "S-1000", opcoes: OPCOES_EVENTOS_ESOCIAL },
          mensagemCerta: "Correto — o cadastro inicial da empresa é enviado pelo evento S-1000.",
          mensagemErrada: "Revise: o cadastro de dados da empresa e tabelas iniciais é enviado pelo evento S-1000.",
        },
        {
          id: "lacuna-evento-periodico",
          rotulo: "Lacuna 2 — Pagamento mensal e fechamento da folha",
          regra: { tipo: "selecao", esperado: "S-1200", opcoes: OPCOES_EVENTOS_ESOCIAL },
          mensagemCerta: "Correto — a remuneração mensal é transmitida pelo evento periódico S-1200.",
          mensagemErrada: "Revise: o pagamento mensal e fechamento da folha são transmitidos pelo evento periódico S-1200.",
        },
        {
          id: "lacuna-recolhimento-fgts",
          rotulo: "Lacuna 3 — Sistema de recolhimento do FGTS",
          regra: {
            tipo: "selecao",
            esperado: "FGTS_Digital",
            opcoes: [
              { valor: "FGTS_Digital", texto: "FGTS Digital" },
              { valor: "GFIP_SEFIP", texto: "GFIP / SEFIP Antigo" },
            ],
          },
          mensagemCerta: "Correto — o FGTS é recolhido via sistema FGTS Digital.",
          mensagemErrada: "Revise: os valores de FGTS são recolhidos diretamente via sistema do FGTS Digital.",
        },
      ],
    },
    {
      id: "estabilidade-provisoria-vf",
      titulo: "Estabilidade Provisória no Emprego",
      instrucao: "Julgue as afirmações sobre estabilidade no emprego como Verdadeira (V) ou Falsa (F):",
      campos: [
        {
          id: "estabilidade-gestante",
          rotulo: "A empregada gestante possui estabilidade provisória desde a confirmação da gravidez até 5 meses após o parto.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "Correto — a gestante tem estabilidade até 5 meses após o parto.",
        },
        {
          id: "estabilidade-cipa",
          rotulo: "O membro eleito representante dos empregados na CIPA possui estabilidade até 2 anos após o fim do mandato.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemErrada: "Falso — a CIPA garante estabilidade até 1 ano após o fim do mandato, não 2 anos.",
        },
      ],
    },
    {
      id: "holerite-salario-liquido",
      titulo: "Apuração de Salário Líquido na Folha",
      instrucao: "Calcule o Salário Líquido do colaborador a partir do demonstrativo de pagamento abaixo:",
      tabelaReferencia: {
        colunas: ["Descrição da verba", "Proventos (R$)", "Descontos (R$)"],
        linhas: [
          ["Salário Base Contratual", "R$ 3.000,00", "—"],
          ["Desconto INSS (Tabela Progressiva)", "—", "R$ 280,00"],
          ["Desconto Vale-Transporte (6%)", "—", "R$ 180,00"],
          ["Total", "R$ 3.000,00", "R$ 460,00"],
        ],
      },
      campos: [
        {
          id: "salario-liquido",
          rotulo: "Salário líquido a ser depositado na conta do empregado (R$)",
          placeholder: "Digite apenas o número (Ex: 2540)",
          regra: { tipo: "numero", esperado: 2540 },
          mensagemCerta: "Salário Líquido correto: R$ 3.000 - (R$ 280 + R$ 180) = R$ 2.540,00.",
          mensagemErrada: "Incorreto. Subtraia os descontos (R$ 460) do salário de R$ 3.000 (Resultado: 2540).",
        },
      ],
    },
    {
      id: "gradacao-penalidades",
      titulo: "Gradação de Penalidades Disciplinares (CLT)",
      instrucao:
        "Ordene corretamente os passos do processo de aplicação de medidas disciplinares ao empregado faltoso (do 1º ao 4º nível de severidade):",
      campos: [
        {
          id: "ordem-advertencia",
          rotulo: "Advertência Verbal ou Escrita (orientação inicial formal)",
          regra: { tipo: "selecao", esperado: "1", opcoes: OPCOES_PASSOS_DISCIPLINARES },
        },
        {
          id: "ordem-suspensao",
          rotulo: "Suspensão Disciplinar (afastamento sem remuneração por até 30 dias)",
          regra: { tipo: "selecao", esperado: "3", opcoes: OPCOES_PASSOS_DISCIPLINARES },
        },
        {
          id: "ordem-justa-causa",
          rotulo: "Demissão por Justa Causa (quebra definitiva de confiança)",
          regra: { tipo: "selecao", esperado: "4", opcoes: OPCOES_PASSOS_DISCIPLINARES },
          mensagemCerta: "Excelente! Sequência disciplinar correta: Advertência (1º) -> Suspensão (3º) -> Justa Causa (4º).",
          mensagemErrada: "Incorreto. A ordem de severidade é: 1º Advertência, 3º Suspensão e 4º Justa Causa.",
        },
      ],
    },
    {
      id: "auditoria-banco-horas",
      titulo: "Auditoria Interna em Banco de Horas e Acordo Coletivo",
      cenario:
        "Durante a auditoria de folha, o assistente de DP identificou que o banco de horas individual firmado com os funcionários não é quitado há 1 ano e meio. De acordo com a CLT (Art. 59), o banco de horas por acordo individual escrito deve ser compensado no prazo máximo de 6 meses (ou até 1 ano via acordo coletivo). Descreva a medida corretiva imediata que o DP deve adotar.",
      campos: [
        {
          id: "auditoria-banco-horas",
          placeholder:
            "Explique que o DP deve efetuar o pagamento imediato das horas extras acumuladas não compensadas no prazo legal, acrescidas do adicional mínimo de 50%, regularizando a folha de pagamento...",
          regra: { tipo: "texto", minPalavras: 4, palavrasChave: /pagamento|paga|hora|extra|50%|compens|folha|quit|regulariz/i },
          mensagemErrada: "Mencione o pagamento das horas extras acumuladas com adicional de 50% na folha de pagamento.",
        },
      ],
    },
  ],
};

export default atividade;
