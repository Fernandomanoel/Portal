import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, reais, somar } from "../ajudantes";
import { CARTEIRA_CONFIGURAR, DATA_CONFIGURAR, JUROS_MES, MULTA, diasAtraso, devido, faixa, paraData } from "../dadosCobranca";

const C = CARTEIRA_CONFIGURAR.map((t) => {
  const dias = diasAtraso(t, DATA_CONFIGURAR);
  const multa = dias > 0 ? (t.valor * MULTA) / 100 : 0;
  const juros = ((t.valor * JUROS_MES) / 100 / 30) * dias;
  return { t, dias, faixa: faixa(dias), multa, juros, atualizado: devido(t, DATA_CONFIGURAR) };
});
const vencidos = C.filter((c) => c.dias > 0);
const daFaixa = (f: string) => C.filter((c) => c.faixa === f);
const exemplo = vencidos.find((c) => c.dias > 20 && c.dias < 50) ?? vencidos[0];
const pergunta = vencidos.filter((c) => c !== exemplo && c.dias > 60)[0] ?? vencidos[1];
const totalCarteira = somar(C.map((c) => c.t.valor));
const porCliente = (nome: string) => C.filter((c) => c.t.cliente === nome);
const clientes = [...new Set(vencidos.map((c) => c.t.cliente))].sort((a, b) => porCliente(b).length - porCliente(a).length).slice(0, 2);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Crédito e Cobrança — Configurando a Planilha de Contas a Receber",
  introducao: `Situação de trabalho real: a carteira de contas a receber está numa lista solta e ninguém sabe quanto está vencido, há quanto tempo nem quanto cada cliente deve com multa e juros. Sua tarefa é CONFIGURAR a planilha de cobrança: dias de atraso, faixas de vencimento (aging), multa e juros pro rata, resumo por faixa, alerta de cobrança e consulta por cliente. A planilha com os ${C.length} títulos em aberto em ${paraData(DATA_CONFIGURAR)} é baixada aqui mesmo, na etapa 1.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido do gerente financeiro",
      remetente: "Ricardo Fontes, gerente financeiro da Distribuidora Horizonte",
      assunto: "Preciso enxergar a inadimplência antes da reunião de diretoria",
      paragrafos: [
        `Hoje a carteira é uma lista de notas com vencimento e valor. Quero saber, na data-base de ${paraData(DATA_CONFIGURAR)}: quanto está vencido, em que faixa de atraso (até 30, 31 a 60, 61 a 90 e acima de 90 dias) e quanto cada título vale hoje com os encargos do contrato.`,
        `Nossos contratos cobram multa de ${MULTA}% uma única vez e juros de ${JUROS_MES}% ao mês, proporcionais aos dias de atraso. Coloque essas taxas e a data-base na aba Parâmetros e faça todas as fórmulas apontarem para lá: no mês que vem eu só troco a data.`,
        "E quero uma consulta rápida: digito o nome do cliente e vejo quantos títulos e quanto ele deve, para usar no telefone com ele.",
      ],
      entregas: [
        "Dias de atraso, faixa, multa, juros e valor atualizado na Carteira (etapas 2 e 3).",
        "O resumo por faixa, o alerta de cobrança e a consulta por cliente (etapas 4 a 6).",
        "A proteção e o relatório para a diretoria (etapas 7 e 8).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Baixar a planilha e conhecer as abas",
      download: {
        url: "/atividades/credito-cobranca/cobranca-para-configurar.xlsx",
        nome: "cobranca-para-configurar.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Abas Leia-me, Parâmetros (data-base, multa e juros), Carteira (${C.length} títulos), Resumo e Consulta (em branco).`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Salve uma cópia como Contas a Receber.xlsx e trabalhe nela.",
        "Na aba Parâmetros: B1 = data-base, B2 = multa (2%), B3 = juros ao mês (1%). É daqui que todas as fórmulas vão ler.",
        "Na aba Carteira, clique numa célula dos dados, aperte Ctrl + T e confirme os cabeçalhos. Confira se Emissão e Vencimento estão como Data (Página Inicial > grupo Número).",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Para o Excel, data é um número (dias contados desde 1900). Por isso dá para subtrair uma data da outra e obter os dias de atraso. Se a data estiver como texto, a conta dá #VALOR!." },
      ],
    },
    consulta({
      id: "aging",
      titulo: "Etapa 2 — Dias de atraso e faixa (aging)",
      cenario: "Crie na Carteira: F = Dias de atraso = data-base − vencimento, nunca negativo (título que ainda não venceu fica com 0). G = Faixa: «A vencer» (0 dias), «1 a 30», «31 a 60», «61 a 90» ou «Acima de 90».",
      instrucao: "Escreva as fórmulas da linha 2, estenda e responda.",
      formato: "planilha",
      tabelas: [{ nome: `Carteira em ${paraData(DATA_CONFIGURAR)} (${C.length} títulos — a mesma da planilha)`, colunas: ["Nota fiscal", "Cliente", "Emissão", "Vencimento", "Valor (R$)"], linhas: C.map((c) => [c.t.nf, c.t.cliente, paraData(c.t.emissao), paraData(c.t.vencimento), c.t.valor]) }],
      comandos: [
        { id: "dias", rotulo: "Sua fórmula de Dias de atraso (F2)", padrao: /^=\s*(M[AÁ]XIMO|MAX)\s*\(\s*0\s*[;,][\s\S]*Par[aâ]metros/i, placeholder: "=MÁXIMO(0;Parâmetros!$B$1-D2)", dica: "MÁXIMO(0; data-base − vencimento), com a data-base da aba Parâmetros em referência absoluta." },
        { id: "faixa", rotulo: "Sua fórmula de Faixa (G2)", padrao: /^=\s*(SE|IF|SES|IFS)\s*\([\s\S]*30[\s\S]*60[\s\S]*90/i, placeholder: "=SE(F2=0;\"A vencer\";SE(F2<=30;\"1 a 30\";SE(F2<=60;\"31 a 60\";SE(F2<=90;\"61 a 90\";\"Acima de 90\"))))", dica: "SE aninhado (ou SES) testando 0, 30, 60 e 90 dias, na ordem." },
      ],
      resultados: [
        { id: "vencido", rotulo: "Valor original vencido na data-base (R$)", valor: somar(vencidos.map((c) => c.t.valor)), explicacao: "Soma do valor dos títulos com dias de atraso maior que zero.", tolerancia: 0.1 },
        { id: "a-vencer", rotulo: "Quantos títulos ainda estão a vencer?", valor: daFaixa("A vencer").length, explicacao: "CONT.SE(G:G;\"A vencer\").", tolerancia: 0 },
        { id: "acima-90", rotulo: "Quantos títulos estão acima de 90 dias?", valor: daFaixa("Acima de 90").length, explicacao: "CONT.SE(G:G;\"Acima de 90\").", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "encargos",
      titulo: "Etapa 3 — Multa, juros pro rata e valor atualizado",
      cenario: `Crie H = Multa (${MULTA}% do valor, só se houver atraso), I = Juros (valor × ${JUROS_MES}% ÷ 30 × dias) e J = Valor atualizado (valor + multa + juros). Exemplo resolvido: ${exemplo.t.nf}, ${reais(exemplo.t.valor)}, ${exemplo.dias} dias de atraso → multa ${reais(exemplo.multa)} + juros ${reais(exemplo.juros)} = ${reais(exemplo.atualizado)}.`,
      instrucao: "Escreva as fórmulas, estenda e responda.",
      tabelas: [],
      comandos: [
        { id: "formula-juros", rotulo: "Sua fórmula de Juros (I2)", padrao: /^=[\s\S]*Par[aâ]metros!\$?B\$?3[\s\S]*30|^=[\s\S]*30[\s\S]*Par[aâ]metros!\$?B\$?3/i, placeholder: "=E2*Parâmetros!$B$3/30*F2", dica: "Valor × taxa mensal (Parâmetros!$B$3) ÷ 30 × dias de atraso." },
      ],
      resultados: [
        { id: "atualizado", rotulo: "Valor atualizado de todos os títulos vencidos (R$)", valor: somar(vencidos.map((c) => c.atualizado)), explicacao: "Soma da coluna Valor atualizado só dos vencidos (SOMASE com F > 0).", tolerancia: 0.2 },
        { id: "juros", rotulo: "Total de juros acumulados na carteira (R$)", valor: somar(C.map((c) => c.juros)), explicacao: "Soma da coluna Juros.", tolerancia: 0.2 },
        { id: "um", rotulo: `Valor atualizado de ${pergunta.t.nf} (R$)`, valor: pergunta.atualizado, explicacao: `${pergunta.dias} dias de atraso sobre ${reais(pergunta.t.valor)}.`, tolerancia: 0.02 },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Juros «pro rata» crescem um pouco a cada dia. Cobrar o valor de face de um título com 70 dias de atraso é dar desconto sem perceber, e o cliente que paga em dia acaba financiando o que atrasa." }],
    }),
    consulta({
      id: "resumo",
      titulo: "Etapa 4 — Resumo por faixa (SOMASES e CONT.SES)",
      cenario: "Na aba Resumo, para cada faixa da coluna A, preencha B = quantidade (CONT.SES), C = valor original (SOMASES) e D = valor atualizado (SOMASES). A linha Total soma tudo.",
      instrucao: "Escreva a fórmula da faixa e responda.",
      tabelas: [],
      comandos: [{ id: "somases", rotulo: "Sua fórmula de valor original da faixa (C2)", padrao: /^=\s*(SOMASES?|SUMIFS?)\s*\([\s\S]*Carteira!/i, placeholder: "=SOMASES(Carteira!E:E;Carteira!G:G;A2)", dica: "SOMASES somando a coluna Valor da Carteira onde a Faixa é igual à célula A da linha." }],
      resultados: [
        { id: "f31", rotulo: "Valor original na faixa «31 a 60» (R$)", valor: somar(daFaixa("31 a 60").map((c) => c.t.valor)), explicacao: "SOMASES pela faixa.", tolerancia: 0.1 },
        { id: "f61", rotulo: "Valor atualizado na faixa «61 a 90» (R$)", valor: somar(daFaixa("61 a 90").map((c) => c.atualizado)), explicacao: "SOMASES da coluna Valor atualizado pela faixa.", tolerancia: 0.2 },
        { id: "inadimplencia", rotulo: "Índice de inadimplência: vencido ÷ carteira total (%)", valor: (somar(vencidos.map((c) => c.t.valor)) / totalCarteira) * 100, explicacao: "Valor original vencido dividido pelo valor original de toda a carteira, × 100.", tolerancia: 0.1 },
      ],
    }),
    {
      id: "alerta",
      titulo: "Etapa 5 — Alerta de cobrança em vermelho",
      passos: [
        "Selecione as linhas de dados da Carteira (A2 até J da última linha).",
        "Página Inicial > Formatação Condicional > Nova Regra > «Usar uma fórmula para determinar quais células devem ser formatadas».",
        "Digite =$F2>60 (o $ antes do F trava a coluna e deixa a linha inteira pintada). Formatar > Preenchimento vermelho claro. OK.",
        "Confira: os títulos com mais de 60 dias, que vão para a cobrança terceirizada, ficam com a linha toda em vermelho.",
      ],
      campos: [
        { id: "linhas", rotulo: "Quantas linhas ficaram vermelhas?", placeholder: "Número", regra: { tipo: "numero", esperado: C.filter((c) => c.dias > 60).length, tolerancia: 0 }, mensagemCerta: "Certo: os títulos com mais de 60 dias de atraso.", mensagemErrada: "A regra é =$F2>60 aplicada a partir da linha 2. Conte as faixas 61 a 90 e Acima de 90." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Na régua de cobrança, cada faixa tem uma ação: lembrete, ligação, carta, cobrança terceirizada, negativação. A cor mostra na hora quais títulos mudaram de ação desde a última vez que você abriu a planilha." }],
    },
    consulta({
      id: "consulta-cliente",
      titulo: "Etapa 6 — Consulta por cliente",
      cenario: "Na aba Consulta, B2 recebe o nome do cliente. Em B3 conte os títulos vencidos dele (CONT.SES com cliente e dias > 0), em B4 some o valor original e em B5 o valor atualizado desses títulos (SOMASES).",
      instrucao: "Escreva a fórmula do valor atualizado e teste com os clientes pedidos.",
      tabelas: [],
      comandos: [{ id: "cliente", rotulo: "Sua fórmula de valor atualizado do cliente (B5)", padrao: /^=\s*(SOMASES|SUMIFS)\s*\([\s\S]*\$?B\$?2[\s\S]*>\s*0/i, placeholder: "=SOMASES(Carteira!J:J;Carteira!B:B;$B$2;Carteira!F:F;\">0\")", dica: "SOMASES da coluna Valor atualizado, com dois critérios: cliente = $B$2 e dias de atraso \">0\"." }],
      resultados: clientes.flatMap((nome, i) => {
        const v = porCliente(nome).filter((c) => c.dias > 0);
        return [
          { id: `qtd-${i}`, rotulo: `Títulos vencidos de ${nome}`, valor: v.length, explicacao: "CONT.SES por cliente e dias > 0.", tolerancia: 0 },
          { id: `valor-${i}`, rotulo: `Valor atualizado devido por ${nome} (R$)`, valor: somar(v.map((c) => c.atualizado)), explicacao: "SOMASES por cliente e dias > 0.", tolerancia: 0.1 },
        ];
      }),
    }),
    {
      id: "protecao",
      titulo: "Etapa 7 — Proteger as fórmulas",
      passos: [
        "Desbloqueie o que a equipe vai editar: Carteira A até E (novos títulos), Parâmetros B1 a B3 e Consulta B2 (botão direito > Formatar Células > Proteção > desmarque «Bloqueada»).",
        "Em cada aba, Revisão > Proteger Planilha, com senha guardada pela gerência.",
        "Teste: mude a data-base em Parâmetros!B1 para o último dia do mês e veja dias, faixas e valores mudarem sozinhos. Volte a data original.",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Com a data-base num único lugar, a planilha serve para qualquer dia: é só trocar a data. E com as fórmulas protegidas, ninguém «arredonda» um juro na mão para agradar um cliente." }],
    },
    dissertativa({
      id: "relatorio",
      titulo: "Etapa 8 — Relatório de inadimplência para a diretoria",
      instrucao: "Escreva o relatório curto que o Ricardo vai levar para a reunião.",
      deve: [
        "Apresente o total da carteira, o total vencido e o índice de inadimplência, com os seus números.",
        "Mostre a distribuição por faixa e destaque o que está acima de 60 e de 90 dias.",
        "Cite os clientes com maior valor em atraso e proponha a ação de cobrança para cada faixa (régua de cobrança).",
        "Explique como a planilha deve ser atualizada a cada semana.",
      ],
      chave: /(inadimpl|vencid|faixa|juros|multa|cliente|cobran[cç]a|r[eé]gua|negativ)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
