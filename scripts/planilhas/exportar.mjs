// Exporta os dados fictícios das atividades de planilha (src/data/atividadesAutocorrigidas/dados*.ts) em JSON,
// para os scripts Python montarem as planilhas .xlsx com exatamente os mesmos números que as atividades corrigem.
// Junto vão os valores esperados, que o conferir.py compara com a planilha recalculada pelo LibreOffice.
// Uso: npm run planilhas
import { build } from "vite";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const raiz = new URL("../../", import.meta.url).pathname;
const pasta = mkdtempSync(join(tmpdir(), "planilhas-"));
const entrada = join(pasta, "entrada.ts");
writeFileSync(entrada, `
import * as E from "@/data/atividadesAutocorrigidas/dadosEstoque";
import * as F from "@/data/atividadesAutocorrigidas/dadosFolha";
import * as C from "@/data/atividadesAutocorrigidas/dadosCobranca";
import * as X from "@/data/atividadesAutocorrigidas/dadosCaixa";
import * as V from "@/data/atividadesAutocorrigidas/dadosVendas";
import * as K from "@/data/atividadesAutocorrigidas/dadosContabilidade";

const data = (n: number) => C.paraData(n);

export default {
  estoque: {
    cadastro: E.CADASTRO,
    movimentos: E.MOVIMENTOS,
    amostra: E.RESULTADO.lancamentos.filter((l) => l.situacao === "OK").slice(0, 40),
    lancar: E.RESULTADO.lancamentos.filter((l) => l.situacao === "OK"),
    esperado: { saldo: Object.fromEntries(E.RESULTADO.saldoFinal) },
  },
  folha: {
    funcionarios: F.FUNCIONARIOS,
    ocorrencias: F.OCORRENCIAS,
    faixasInss: F.FAIXAS_INSS,
    faixasIrrf: F.FAIXAS_IRRF,
    parametros: { dependente: F.DEDUCAO_DEPENDENTE, simplificado: F.DESCONTO_SIMPLIFICADO, divisor: F.DIVISOR_HORAS, diasUteis: F.DIAS_UTEIS, domingos: F.DOMINGOS_FERIADOS, fgts: F.FGTS, vt: F.VT_PERCENTUAL, limite: F.LIMITE_HE_DIA },
    tipos: F.TIPOS_OCORRENCIA,
    lancar: F.FOLHA_SETEMBRO.processadas.filter((o) => o.situacao === "OK"),
    esperado: F.FOLHA_SETEMBRO.folha.map((l) => ({ matricula: l.funcionario.matricula, bruto: l.bruto, inss: l.inss, irrf: l.irrf, liquido: l.liquido, fgts: l.fgts })),
  },
  cobranca: {
    titulos: C.TITULOS.map((t) => ({ ...t, emissao: data(t.emissao), vencimento: data(t.vencimento) })),
    configurar: C.CARTEIRA_CONFIGURAR.map((t) => t.nf),
    dataConfigurar: data(C.DATA_CONFIGURAR),
    dataFechamento: data(C.DATA_FECHAMENTO),
    parametros: { multa: C.MULTA, juros: C.JUROS_MES, tolerancia: C.TOLERANCIA, negativar: C.DIAS_NEGATIVAR },
    pagamentos: C.PAGAMENTOS.map((p) => ({ ...p, data: data(p.data) })),
    esperado: {
      baixas: C.COBRANCA_SETEMBRO.baixas.map((b) => b.situacao),
      carteira: C.COBRANCA_SETEMBRO.carteira.map((c) => ({ nf: c.titulo.nf, situacao: c.situacao, emAberto: c.emAberto, negativar: c.negativar })),
    },
  },
  caixa: {
    categorias: X.CATEGORIAS,
    saldoOutubro: X.SALDO_INICIAL_OUTUBRO,
    fluxo: X.FLUXO_OUTUBRO.map((p) => ({ ...p, data: data(p.data) })),
    saldoSetembro: X.SALDO_INICIAL_SETEMBRO,
    razao: X.RAZAO.map((l) => ({ ...l, data: data(l.data) })),
    extrato: X.EXTRATO.map((l) => ({ ...l, data: data(l.data) })),
    esperado: {
      razao: X.CONCILIACAO.razao.map((l) => l.situacao),
      extrato: X.CONCILIACAO.extrato.map((l) => l.situacao),
      saldoExtrato: X.CONCILIACAO.saldoExtrato,
      saldoSistema: X.CONCILIACAO.saldoSistema,
      saldoAjustado: X.CONCILIACAO.saldoAjustado,
    },
  },
  contabilidade: {
    plano: K.PLANO,
    aula14: K.AULA_14,
    aula15: K.AULA_15,
    aula16: K.AULA_16,
    fechamento: { aula14: K.fechamento(K.AULA_14), aula15: K.fechamento(K.AULA_15_COMPLETA), aula16: K.fechamento(K.AULA_16) },
    totais15: K.totaisPorConta(K.AULA_15_COMPLETA),
    anexos: K.ANEXOS_SIMPLES,
    rbm: K.SIMPLES_RBM,
    rbt12: K.SIMPLES_RBT12,
    esperado: K.ESPERADO_SIMPLES,
  },
  vendas: {
    produtos: V.PRODUTOS,
    vendedores: V.VENDEDORES,
    agosto: V.PEDIDOS_AGOSTO,
    setembro: V.PEDIDOS_SETEMBRO,
    esperado: {
      alertas: V.VENDAS_SETEMBRO.processados.filter((i) => i.situacao !== "CANCELADO").map((i) => i.situacao),
      resumo: V.VENDAS_SETEMBRO.resumo.map((r) => ({ codigo: r.vendedor.codigo, faturamento: r.faturamento, percentual: r.percentual, comissao: r.comissao })),
    },
  },
};`);
await build({ root: raiz, configFile: false, logLevel: "error", resolve: { alias: { "@": join(raiz, "src") } }, build: { ssr: entrada, outDir: join(pasta, "saida"), emptyOutDir: true, rollupOptions: { output: { entryFileNames: "v.mjs" } } } });
const { default: dados } = await import(pathToFileURL(join(pasta, "saida", "v.mjs")).href);
const json = join(pasta, "dados.json");
writeFileSync(json, JSON.stringify(dados));
console.log(json);
