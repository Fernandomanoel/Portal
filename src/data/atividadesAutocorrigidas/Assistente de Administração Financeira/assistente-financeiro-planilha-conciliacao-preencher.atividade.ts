import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, reais, somar } from "../ajudantes";
import { CONCILIACAO, EXTRATO, RAZAO, SALDO_INICIAL_SETEMBRO, paraData } from "../dadosCaixa";

const K = CONCILIACAO;
const contaExtrato = (s: string) => K.extrato.filter((l) => l.situacao === s).length;
const saldos = EXTRATO.reduce<number[]>((acc, l) => [...acc, (acc.length ? acc[acc.length - 1] : SALDO_INICIAL_SETEMBRO) + l.valor], []);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Assistente Financeiro — Conciliação Bancária na Planilha Já Configurada",
  introducao: `Situação de trabalho real: fechamento de setembro. O saldo que o sistema mostra não é o mesmo do banco, e ninguém sabe por quê. A planilha de conciliação já está pronta e protegida; o seu trabalho é PREENCHER: lançar as ${EXTRATO.length} linhas do extrato e deixar a planilha comparar com os ${RAZAO.length} lançamentos do sistema, encontrando tarifa que ninguém lançou, cheque que não compensou, depósito em trânsito, valor digitado com os números trocados e lançamento em duplicidade. Baixe a planilha pela própria atividade.`,
  itens: [
    briefing({
      id: "briefing",
      titulo: "A conciliação de setembro",
      remetente: "Helena Prado, diretora administrativa e financeira da Distribuidora Horizonte",
      assunto: "O saldo do sistema não bate com o banco",
      paragrafos: [
        `O sistema diz que temos ${reais(K.saldoSistema)} na conta, mas o banco mostra outro número. A contabilidade só fecha o mês com a conciliação pronta e cada diferença explicada.`,
        "A planilha já está configurada. Lance todas as linhas do extrato na aba Conciliação, como estão no banco. A planilha compara documento por documento com o razão do sistema e classifica tudo.",
        "Regras: (1) o que está no extrato e não no sistema (tarifas, débitos automáticos, rendimentos, PIX sem identificação) precisa ser lançado no sistema; (2) diferença de valor é erro de digitação no sistema: corrige-se pelo valor do banco; (3) o que está no sistema e não no banco (cheque que o fornecedor ainda não depositou, depósito feito no último dia) é PENDENTE: não se mexe, só se acompanha; (4) lançamento repetido no sistema é estornado.",
      ],
      entregas: [
        "O lançamento do extrato e a conferência do saldo do banco (etapa 2).",
        "A classificação das diferenças (etapa 3) e a conciliação fechada (etapa 4).",
        "A lista de ajustes para o sistema (etapa 5).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Conheça a planilha antes de lançar",
      download: {
        url: "/atividades/assistente-administracao-financeira/conciliacao-configurada-setembro.xlsx",
        nome: "conciliacao-configurada-setembro.xlsx",
        rotulo: "Baixar planilha",
        descricao: `Planilha já configurada e protegida: Razão do sistema (${RAZAO.length} lançamentos), Extrato do banco (${EXTRATO.length} linhas), Conciliação (para preencher) e Resumo.`,
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Na aba Conciliação, lance cada linha do Extrato do banco nas colunas A a D: Data, Documento, Histórico e Valor. Crédito com valor positivo; débito com sinal de menos (ex.: -89,90).",
        "As colunas E (Valor no sistema), F (Diferença) e G (Situação) se preenchem sozinhas, procurando o documento no razão.",
        "Na aba Razão do sistema, a coluna E mostra o outro lado: PENDENTE (está no sistema e não passou no banco) e DUPLICADO NO SISTEMA.",
        "A aba Resumo monta a conciliação. Ela só fecha (diferença zero, em verde) quando todas as linhas do extrato estiverem lançadas corretamente.",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "A conciliação é a prova de que o dinheiro do sistema existe no banco. Sem ela, uma tarifa de R$ 46,80 por mês ou um débito automático esquecido passam o ano inteiro sem ninguém ver, e o saldo do sistema vira ficção." }],
    },
    consulta({
      id: "extrato",
      titulo: "Etapa 2 — Lançar o extrato e conferir o saldo do banco",
      cenario: "Lance as linhas abaixo (as mesmas da aba «Extrato do banco»). Depois confira: Resumo!B3 (saldo final pelo extrato) precisa ser igual ao saldo da última linha do extrato. Se não for, há linha faltando ou valor digitado errado.",
      instrucao: "Responda depois de lançar tudo.",
      formato: "planilha",
      tabelas: [{ nome: `Extrato do banco — setembro (${EXTRATO.length} linhas, saldo anterior ${reais(SALDO_INICIAL_SETEMBRO)})`, colunas: ["Data", "Documento", "Histórico", "Valor (R$)", "Saldo (R$)"], linhas: EXTRATO.map((l, i) => [paraData(l.data), l.documento, l.historico, l.valor, Math.round(saldos[i] * 100) / 100]) }],
      comandos: [],
      resultados: [
        { id: "saldo-banco", rotulo: "Saldo final pelo extrato em 30/09 (R$)", valor: K.saldoExtrato, explicacao: "Resumo!B3: saldo inicial + soma de tudo o que você lançou.", tolerancia: 0.01 },
        { id: "saldo-sistema", rotulo: "Saldo final pelo sistema em 30/09 (R$)", valor: K.saldoSistema, explicacao: "Resumo!B4: saldo inicial + soma do razão.", tolerancia: 0.01 },
        { id: "conciliados", rotulo: "Linhas do extrato CONCILIADAS de primeira", valor: contaExtrato("CONCILIADO"), explicacao: "CONT.SE na coluna G da Conciliação.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "diferencas",
      titulo: "Etapa 3 — Classificar as diferenças",
      cenario: "Use a coluna G da Conciliação e a coluna E do Razão do sistema.",
      instrucao: "Informe quantidades e valores (com o sinal: débito negativo, crédito positivo).",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "nao-lancados", rotulo: "Linhas do extrato NÃO LANÇADAS no sistema", valor: K.naoLancados.length, explicacao: "Tarifas, débito automático, IOF, rendimento e PIX sem identificação.", tolerancia: 0 },
        { id: "valor-nao-lancados", rotulo: "Soma dessas linhas, com o sinal (R$)", valor: somar(K.naoLancados.map((l) => l.valor)), explicacao: "SOMASE da coluna Valor onde a Situação é NÃO LANÇADO NO SISTEMA.", tolerancia: 0.01 },
        { id: "diferencas", rotulo: "Linhas com DIFERENÇA DE VALOR", valor: K.diferencas.length, explicacao: "O documento existe nos dois lados, mas o valor não bate.", tolerancia: 0 },
        { id: "valor-diferencas", rotulo: "Soma das diferenças, extrato − sistema (R$)", valor: somar(K.diferencas.map((l) => l.valor - l.valorSistema)), explicacao: "SOMASE da coluna F onde a Situação é DIFERENÇA DE VALOR.", tolerancia: 0.01 },
        { id: "pendentes", rotulo: "Lançamentos PENDENTES no razão", valor: K.pend.length, explicacao: "Cheques não compensados e depósito em trânsito.", tolerancia: 0 },
        { id: "valor-pendentes", rotulo: "Soma dos pendentes, com o sinal (R$)", valor: somar(K.pend.map((l) => l.valor)), explicacao: "Cheques negativos, depósito positivo.", tolerancia: 0.01 },
        { id: "duplicados", rotulo: "Lançamentos DUPLICADOS NO SISTEMA", valor: K.dup.length, explicacao: "Mesmo documento lançado duas vezes no razão.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "fechamento",
      titulo: "Etapa 4 — A conciliação fechada",
      cenario: "Na aba Resumo, o saldo ajustado do banco (extrato + pendentes) precisa ser igual ao saldo ajustado do sistema (razão + o que falta lançar + correções − duplicidades). Se B11 não estiver zerado e verde, volte à Conciliação e procure a linha errada.",
      instrucao: "Informe os números.",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "ajustado", rotulo: "Saldo ajustado (o saldo real da conta, depois de tudo acertado) (R$)", valor: K.saldoAjustado, explicacao: "Resumo!B9, que deve ser igual a B10.", tolerancia: 0.01 },
        { id: "diferenca", rotulo: "Diferença entre os dois saldos ajustados (R$)", valor: 0, explicacao: "Resumo!B11: conciliação fechada é diferença zero.", tolerancia: 0.009 },
        { id: "valor-duplicados", rotulo: "Valor a estornar dos duplicados, com o sinal do lançamento (R$)", valor: somar(K.dup.map((l) => l.valor)), explicacao: "Resumo!B7.", tolerancia: 0.01 },
      ],
    }),
    dissertativa({
      id: "ajustes",
      titulo: "Etapa 5 — Lista de ajustes para o sistema",
      instrucao: "Escreva a lista que vai para quem lança no sistema, com a justificativa de cada ajuste.",
      deve: [
        "Liste o que precisa ser lançado no sistema (tarifas, débito automático, IOF, rendimento) e o que fazer com o PIX sem identificação.",
        "Indique os documentos com diferença de valor, o valor certo (o do banco) e a provável causa.",
        "Indique os lançamentos duplicados a estornar.",
        "Explique por que os pendentes NÃO são ajustados e o que acompanhar no começo de outubro (cheques e depósito).",
      ],
      chave: /(tarifa|d[eé]bito|iof|rendimento|pix|diferen[cç]a|duplic|estorn|pendente|cheque|dep[oó]sito)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
