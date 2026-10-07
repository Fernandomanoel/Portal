import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, reais, somar } from "../ajudantes";
import { DIAS_UTEIS, DOMINGOS_FERIADOS, FOLHA_SETEMBRO, LIMITE_HE_DIA, OCORRENCIAS } from "../dadosFolha";

const { processadas: P, folha: F } = FOLHA_SETEMBRO;
const conta = (s: string) => P.filter((o) => o.situacao === s).length;
const comHoraExtra = F.filter((l) => l.he50 + l.he100 > 0).sort((a, b) => b.valorHoraExtra - a.valorHoraExtra);
const comFalta = F.filter((l) => l.faltas > 0 && l.he50 + l.he100 === 0);
const comAdiantamento = F.filter((l) => l.adiantamento > 0 && l.irrf > 0);
const perguntas = [comHoraExtra[0], comFalta[0], comAdiantamento[0] ?? comHoraExtra[2]];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Departamento Pessoal — Fechando a Folha na Planilha Já Configurada",
  introducao: `Situação de trabalho real: a planilha da folha já está pronta e protegida, e o seu trabalho é PREENCHER o mês de setembro: ${OCORRENCIAS.length} ocorrências vindas do cartão de ponto e do RH (horas extras, trabalho no domingo, faltas, atrasos e vales), com matrícula digitada errado, ocorrência repetida, falta com atestado e hora extra acima do limite. Baixe a planilha pela própria atividade, lance tudo e feche a folha.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "Fechamento da folha de setembro",
      remetente: "Sílvia Matos, coordenadora de Departamento Pessoal da Distribuidora Horizonte",
      assunto: "Lançar as ocorrências e fechar a folha até o 5º dia útil",
      paragrafos: [
        "A planilha está configurada: você só preenche as colunas brancas da aba Lançamentos, a partir da aba «Ocorrências de setembro», que reúne o cartão de ponto, as faltas e os vales pedidos.",
        `Regras da empresa: (1) matrícula que não existe não é lançada: devolva para o gestor conferir; (2) a mesma ocorrência (data, matrícula e tipo) só entra uma vez; (3) falta com atestado médico é abonada: não se lança nem se desconta; (4) hora extra acima de ${LIMITE_HE_DIA} h no dia é paga, mas o gestor precisa justificar por escrito (art. 59 da CLT); (5) HE 50% em dia útil, HE 100% no domingo; o DSR sobre as horas extras é calculado sobre ${DIAS_UTEIS} dias úteis e ${DOMINGOS_FERIADOS} domingos; (6) falta desconta 1/30 do salário por dia e atraso desconta o valor da hora.`,
        "Lance em ordem de data. A aba Folha recalcula tudo a cada linha: horas extras, DSR, descontos, INSS, IRRF, VT, líquido e FGTS.",
      ],
      entregas: [
        "A conferência das ocorrências com problema (etapa 2).",
        "Os valores variáveis do mês (etapa 3) e os totais da folha (etapa 4).",
        "O e-mail aos gestores com as pendências (etapa 5).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Conheça a planilha antes de lançar",
      download: {
        url: "/atividades/departamento-pessoal/folha-configurada-setembro.xlsx",
        nome: "folha-configurada-setembro.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Planilha já configurada e protegida: Cadastro, Tabelas, Ocorrências de setembro (${OCORRENCIAS.length} linhas), Lançamentos (para preencher), Folha e Holerite.`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Na aba Lançamentos, lance cada ocorrência nas colunas A a D: Data, Matrícula, Tipo (escolha na lista) e Quantidade.",
        "Quantidade: horas em decimal para HE e Atraso (1,5 = uma hora e meia; 0,25 = 15 minutos), dias para Falta, reais para Adiantamento.",
        "Olhe a coluna G (Alerta) a cada linha: CORRIGIR MATRÍCULA e DUPLICADO = apague a linha (Delete nas colunas A a D) e anote; LIMITE 2H = mantenha e anote para pedir justificativa; CONFERIR ATESTADO = volte à observação da ocorrência.",
        "No fim, abra a aba Folha (totais na última linha) e use a aba Holerite para conferir funcionário por funcionário.",
      ],
      blocos: [
        { tipo: "lista", itens: [
          "Cadastro e Tabelas: protegidos. Quem atualiza é a coordenação.",
          "Ocorrências de setembro: o que veio do ponto e do RH. Você lê daqui, inclusive a coluna Observação.",
          "Lançamentos: onde você digita. As colunas Nome, Valor e Alerta se preenchem sozinhas.",
          "Folha: uma linha por funcionário, somando os lançamentos com SOMASES.",
        ] },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "O alerta aparece na hora em que você digita, não no dia do pagamento. Uma hora extra lançada duas vezes vira dinheiro pago a mais e INSS recolhido a mais, e estorno de folha é muito mais trabalhoso do que apagar uma linha." },
      ],
    },
    consulta({
      id: "conferencia",
      titulo: "Etapa 2 — Ocorrências com problema",
      cenario: "Depois de passar pelas ocorrências seguindo as regras, conte o que aconteceu. A tabela abaixo é a mesma da aba «Ocorrências de setembro».",
      instrucao: "Use a coluna Alerta e as observações para responder.",
      formato: "planilha",
      tabelas: [{ nome: `Ocorrências de setembro (${OCORRENCIAS.length} linhas)`, colunas: ["Data", "Matrícula", "Tipo", "Quantidade", "Observação"], linhas: OCORRENCIAS.map((o) => [o.data, o.matricula, o.tipo, o.quantidade, o.obs]) }],
      comandos: [],
      resultados: [
        { id: "invalidas", rotulo: "Ocorrências com matrícula inexistente", valor: conta("MATRÍCULA INVÁLIDA"), explicacao: "Letra no lugar de número, espaço no lugar do hífen ou matrícula fora do cadastro.", tolerancia: 0 },
        { id: "duplicadas", rotulo: "Ocorrências repetidas (lançadas só uma vez)", valor: conta("DUPLICADA"), explicacao: "Mesma data, matrícula e tipo aparecendo de novo.", tolerancia: 0 },
        { id: "abonadas", rotulo: "Faltas abonadas por atestado (não lançadas)", valor: conta("ABONADA"), explicacao: "Observação «Atestado médico».", tolerancia: 0 },
        { id: "limite", rotulo: `Horas extras acima de ${LIMITE_HE_DIA} h no dia (pagas, com justificativa)`, valor: P.filter((o) => o.acimaDoLimite).length, explicacao: "Alerta LIMITE 2H.", tolerancia: 0 },
        { id: "lancadas", rotulo: "Total de linhas que ficaram na aba Lançamentos", valor: conta("OK"), explicacao: "Todas menos as inválidas, as repetidas e as abonadas.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "variaveis",
      titulo: "Etapa 3 — Valores variáveis do mês",
      cenario: `Na linha de TOTAL da aba Folha estão as somas de cada coluna. O DSR sobre horas extras é o valor das horas extras × ${DOMINGOS_FERIADOS} ÷ ${DIAS_UTEIS}: o funcionário que faz hora extra também recebe a parte do descanso remunerado sobre ela.`,
      instrucao: "Informe os valores em reais.",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "he", rotulo: "Total de horas extras, sem o DSR (R$)", valor: somar(F.map((l) => l.valorHoraExtra)), explicacao: "HE 50% = horas × salário ÷ 220 × 1,5; HE 100% = × 2.", tolerancia: 0.5 },
        { id: "dsr", rotulo: "Total de DSR sobre horas extras (R$)", valor: somar(F.map((l) => l.dsr)), explicacao: `Horas extras × ${DOMINGOS_FERIADOS} ÷ ${DIAS_UTEIS}.`, tolerancia: 0.5 },
        { id: "descontos", rotulo: "Total descontado por faltas e atrasos (R$)", valor: somar(F.map((l) => l.descontoFaltas)), explicacao: "Falta = salário ÷ 30 por dia; atraso = salário ÷ 220 por hora.", tolerancia: 0.5 },
        { id: "adiantamentos", rotulo: "Total de adiantamentos a descontar (R$)", valor: somar(F.map((l) => l.adiantamento)), explicacao: "Soma dos vales de 40% pagos no dia 15.", tolerancia: 0.1 },
      ],
    }),
    consulta({
      id: "folha",
      titulo: "Etapa 4 — Totais da folha e conferência por holerite",
      cenario: "Confira a linha de TOTAL da aba Folha e, no Holerite, os funcionários pedidos. Esses são os números que vão para o banco (líquido), para a DCTFWeb (INSS e IRRF) e para o FGTS Digital.",
      instrucao: "Informe os números.",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "bruto", rotulo: "Total de salários brutos (R$)", valor: somar(F.map((l) => l.bruto)), explicacao: "Salário + HE + DSR − faltas e atrasos.", tolerancia: 1 },
        { id: "inss", rotulo: "Total de INSS dos empregados (R$)", valor: somar(F.map((l) => l.inss)), explicacao: "Tabela progressiva sobre o bruto de cada um.", tolerancia: 0.5 },
        { id: "irrf", rotulo: "Total de IRRF retido (R$)", valor: somar(F.map((l) => l.irrf)), explicacao: "Sobre a base depois das deduções.", tolerancia: 0.5 },
        { id: "liquido", rotulo: "Total líquido a transferir aos funcionários (R$)", valor: somar(F.map((l) => l.liquido)), explicacao: "Bruto − INSS − IRRF − VT − adiantamento.", tolerancia: 1 },
        { id: "fgts", rotulo: "FGTS a depositar (R$)", valor: somar(F.map((l) => l.fgts)), explicacao: "8% do bruto de cada um.", tolerancia: 0.5 },
        ...perguntas.map((l, i) => ({ id: `holerite-${i}`, rotulo: `Líquido de ${l.funcionario.nome} (${l.funcionario.matricula}) no holerite (R$)`, valor: l.liquido, explicacao: `Bruto ${reais(l.bruto)}, INSS ${reais(l.inss)}, IRRF ${reais(l.irrf)}, VT ${reais(l.vt)}, adiantamento ${reais(l.adiantamento)}.`, tolerancia: 0.05 })),
      ],
    }),
    dissertativa({
      id: "pendencias",
      titulo: "Etapa 5 — E-mail aos gestores com as pendências",
      instrucao: "Escreva o e-mail que o DP manda aos gestores no fechamento.",
      deve: [
        "Liste as ocorrências que não entraram (matrícula errada, repetidas, abonadas) e o que cada gestor precisa conferir.",
        "Peça a justificativa das horas extras acima de 2 h no dia, citando quantas foram e lembrando o limite da CLT.",
        "Informe os totais da folha (bruto, líquido, horas extras com DSR) e o prazo do pagamento.",
        "Proponha uma regra para o mês seguinte que reduza esses erros (ex.: conferência do ponto pelo gestor antes de mandar ao DP).",
      ],
      chave: /(matr[ií]cula|repetid|duplicad|atestado|hora extra|justificativ|limite|l[ií]quido|dsr)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
