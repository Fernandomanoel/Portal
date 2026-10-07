import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { COBRANCA_SETEMBRO, DATA_FECHAMENTO, DIAS_NEGATIVAR, JUROS_MES, MULTA, PAGAMENTOS, TITULOS, TOLERANCIA, paraData } from "../dadosCobranca";

const { baixas: B, carteira: C } = COBRANCA_SETEMBRO;
const conta = (s: string) => B.filter((b) => b.situacao === s).length;
const quitados = C.filter((c) => c.situacao === "QUITADO");
const pagoDe = (nf: string) => somar(B.filter((b) => b.nf === nf && (b.situacao === "QUITADO" || b.situacao === "PARCIAL")).map((b) => b.valor));
const vencidos = C.filter((c) => c.situacao === "VENCIDO");

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Crédito e Cobrança — Dando Baixa nos Recebimentos na Planilha Já Configurada",
  introducao: `Situação de trabalho real: a planilha de contas a receber já está pronta e protegida, e o seu trabalho é PREENCHER as baixas de setembro: ${PAGAMENTOS.length} créditos do arquivo de retorno do banco, com nota digitada errado, crédito repetido no arquivo, cliente que pagou duas vezes, cliente que pagou atrasado sem os juros e acordo de pagamento parcial. Baixe a planilha pela própria atividade, lance tudo e feche a carteira em ${paraData(DATA_FECHAMENTO)}.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "Baixas do mês e fechamento da carteira",
      remetente: "Ricardo Fontes, gerente financeiro da Distribuidora Horizonte",
      assunto: "Dar baixa nos recebimentos de setembro e separar quem vai para negativação",
      paragrafos: [
        "A planilha está configurada. O banco mandou o arquivo de retorno com os créditos do mês, que está na aba «Retorno do banco». Você lança todas as linhas na aba Baixas e a planilha classifica cada uma.",
        `Regras da empresa: (1) pagamento depois do vencimento deve vir com multa de ${MULTA}% e juros de ${JUROS_MES}% ao mês pro rata; (2) diferença a menor de até R$ ${TOLERANCIA},00 é abonada e o título é quitado; (3) acima disso a baixa é PARCIAL e o saldo continua em aberto; (4) crédito com nota que não existe não é baixado: vai para identificação; (5) crédito repetido no arquivo conta uma vez só; (6) se o cliente pagar de novo uma nota já quitada, o valor vira crédito a devolver; (7) título vencido há mais de ${DIAS_NEGATIVAR} dias e sem nenhum pagamento vai para negativação.`,
        "Lance em ordem de data, como veio do banco: a planilha olha as linhas de cima para saber se a nota já estava quitada.",
      ],
      entregas: [
        "A conferência das baixas (etapa 2).",
        "Os valores recebidos e o que ficou pendente (etapa 3) e a posição da carteira no fechamento (etapa 4).",
        "A lista de ações de cobrança e devolução (etapa 5).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Conheça a planilha antes de lançar",
      download: {
        url: "/atividades/credito-cobranca/cobranca-configurada-setembro.xlsx",
        nome: "cobranca-configurada-setembro.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Planilha já configurada e protegida: Parâmetros, Carteira (${TITULOS.length} títulos), Retorno do banco (${PAGAMENTOS.length} créditos), Baixas (para preencher) e Resumo (livre).`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Na aba Baixas, lance cada linha do Retorno do banco nas colunas A a D: Data do pagamento, Nota fiscal, Valor pago e Documento.",
        "Digite a data no formato 05/09/2025 e a nota exatamente como veio no arquivo, mesmo que pareça errada: a planilha precisa ver o erro para avisar.",
        "A coluna I (Situação) classifica cada crédito. A coluna G mostra quanto era devido naquele dia, com multa e juros, e a H mostra o que faltou quando a baixa é parcial.",
        "Na Carteira, as colunas J (Situação), K (Em aberto) e L (Cobrança) se atualizam sozinhas. Use a aba Resumo para as suas somas.",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Cliente que paga atrasado e manda só o valor da nota está, na prática, pedindo desconto. Sem conferir o devido na data, o título é dado como quitado e os encargos se perdem sem ninguém decidir isso." },
      ],
    },
    consulta({
      id: "conferencia",
      titulo: "Etapa 2 — Conferência das baixas",
      cenario: "Depois de lançar os créditos, conte as situações da coluna I da aba Baixas. A tabela abaixo é a mesma da aba «Retorno do banco».",
      instrucao: "Use CONT.SE na coluna Situação para responder.",
      formato: "planilha",
      tabelas: [{ nome: `Retorno do banco — setembro (${PAGAMENTOS.length} créditos)`, colunas: ["Data do crédito", "Documento", "Nota fiscal informada", "Valor pago (R$)"], linhas: PAGAMENTOS.map((p) => [paraData(p.data), p.documento, p.nf, p.valor]) }],
      comandos: [],
      resultados: [
        { id: "quitados", rotulo: "Baixas QUITADO", valor: conta("QUITADO"), explicacao: "Pagou o devido na data (ou faltou até R$ 1,00).", tolerancia: 0 },
        { id: "parciais", rotulo: "Baixas PARCIAL", valor: conta("PARCIAL"), explicacao: "Pagou menos que o devido: valor de face depois do vencimento ou acordo parcial.", tolerancia: 0 },
        { id: "nf", rotulo: "Créditos com nota não encontrada", valor: conta("NF NÃO ENCONTRADA"), explicacao: "Letra no lugar do zero, espaço no lugar do hífen ou nota que não existe.", tolerancia: 0 },
        { id: "duplicados", rotulo: "Créditos repetidos no arquivo do banco", valor: conta("DUPLICADO"), explicacao: "Mesmo documento aparecendo duas vezes.", tolerancia: 0 },
        { id: "ja-quitado", rotulo: "Pagamentos de notas que já estavam quitadas", valor: conta("JÁ QUITADO"), explicacao: "O cliente pagou duas vezes: vira crédito a devolver.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "valores",
      titulo: "Etapa 3 — O que entrou e o que ficou pendente",
      cenario: "Monte na aba Resumo as somas com SOMASE sobre as abas Baixas e Carteira. Encargos recebidos = o que os títulos quitados pagaram acima do valor original.",
      instrucao: "Informe os valores em reais.",
      tabelas: [],
      comandos: [{ id: "somase", rotulo: "Sua fórmula do total baixado", padrao: /^=[\s\S]*(SOMASES?|SUMIFS?)\s*\([\s\S]*(QUITADO|PARCIAL)/i, placeholder: "=SOMASE(Baixas!I:I;\"QUITADO\";Baixas!C:C)+SOMASE(Baixas!I:I;\"PARCIAL\";Baixas!C:C)", dica: "Some a coluna Valor pago onde a Situação é QUITADO, mais onde é PARCIAL." }],
      resultados: [
        { id: "baixado", rotulo: "Total recebido e baixado (QUITADO + PARCIAL) (R$)", valor: somar(B.filter((b) => b.situacao === "QUITADO" || b.situacao === "PARCIAL").map((b) => b.valor)), explicacao: "Soma do valor pago nas baixas quitadas e parciais.", tolerancia: 0.1 },
        { id: "encargos", rotulo: "Encargos recebidos nos títulos quitados (R$)", valor: somar(quitados.map((c) => pagoDe(c.titulo.nf) - c.titulo.valor)), explicacao: "SOMASES do Pago menos SOMASES do Valor, na Carteira, com Situação QUITADO.", tolerancia: 0.2 },
        { id: "saldo-parcial", rotulo: "Saldo que faltou nos pagamentos parciais (R$)", valor: somar(B.filter((b) => b.situacao === "PARCIAL").map((b) => b.saldo)), explicacao: "Soma da coluna H das baixas parciais.", tolerancia: 0.1 },
        { id: "devolver", rotulo: "Créditos de clientes a devolver (R$)", valor: somar(B.filter((b) => b.situacao === "JÁ QUITADO").map((b) => b.valor)), explicacao: "Soma dos pagamentos classificados como JÁ QUITADO.", tolerancia: 0.05 },
        { id: "identificar", rotulo: "Valor creditado sem nota identificada (R$)", valor: somar(B.filter((b) => b.situacao === "NF NÃO ENCONTRADA").map((b) => b.valor)), explicacao: "Dinheiro que entrou no banco, mas não baixou nenhum título.", tolerancia: 0.05 },
      ],
    }),
    consulta({
      id: "carteira",
      titulo: `Etapa 4 — Posição da carteira em ${paraData(DATA_FECHAMENTO)}`,
      cenario: "Use as colunas J (Situação), K (Em aberto) e L (Cobrança) da Carteira. O valor em aberto do título vencido é atualizado com multa e juros até o fechamento; o do parcial é o saldo que faltou.",
      instrucao: "Informe os números.",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "vencidos", rotulo: "Títulos vencidos sem nenhum pagamento", valor: vencidos.length, explicacao: "CONT.SE(J:J;\"VENCIDO\").", tolerancia: 0 },
        { id: "valor-vencidos", rotulo: "Valor atualizado desses títulos vencidos (R$)", valor: somar(vencidos.map((c) => c.emAberto)), explicacao: "SOMASE da coluna Em aberto com Situação VENCIDO.", tolerancia: 0.2 },
        { id: "negativar", rotulo: `Títulos para negativação (mais de ${DIAS_NEGATIVAR} dias, sem pagamento)`, valor: C.filter((c) => c.negativar).length, explicacao: "CONT.SE(L:L;\"NEGATIVAR\").", tolerancia: 0 },
        { id: "a-vencer", rotulo: "Valor dos títulos ainda a vencer (R$)", valor: somar(C.filter((c) => c.situacao === "A VENCER").map((c) => c.emAberto)), explicacao: "SOMASE da coluna Em aberto com Situação A VENCER.", tolerancia: 0.1 },
        { id: "aberto", rotulo: "Total em aberto na carteira (R$)", valor: somar(C.map((c) => c.emAberto)), explicacao: "Soma da coluna Em aberto.", tolerancia: 0.3 },
      ],
    }),
    dissertativa({
      id: "acoes",
      titulo: "Etapa 5 — Plano de ação da cobrança",
      instrucao: "Escreva o plano que vai para o gerente aprovar.",
      deve: [
        "Diga o que fazer com os créditos sem nota identificada e com os repetidos no arquivo (com quem falar no banco e no comercial).",
        "Explique como devolver os pagamentos em duplicidade e por que não se pode simplesmente «abater da próxima nota» sem acordo com o cliente.",
        "Proponha a abordagem para quem pagou só o valor de face depois do vencimento (cobrar a diferença, abonar, negociar) e quem decide.",
        "Liste quantos títulos vão para negativação e o valor, e o que precisa ser feito antes (aviso prévio ao cliente).",
      ],
      chave: /(identific|duplic|devol|parcial|juros|multa|negativ|aviso|cliente)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
