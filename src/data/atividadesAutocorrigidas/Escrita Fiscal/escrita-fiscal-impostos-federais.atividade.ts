import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { CLIENTES, FORNECEDORES, dataBR, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(2505);
const VENDAS = Array.from({ length: 20 }, (_, i) => [`NF saída ${901 + i}`, dataBR(inteiro(r, 1, 28), 6), sortear(r, CLIENTES), inteiro(r, 30, 260) * 100]);
const CREDITOS = Array.from({ length: 16 }, (_, i) => [`NF entrada ${411 + i}`, dataBR(inteiro(r, 1, 28), 6), sortear(r, FORNECEDORES), inteiro(r, 20, 150) * 100]);
const LINHAS = [...VENDAS.map((l) => [l[0], l[1], l[2], "Venda", l[3]]), ...CREDITOS.map((l) => [l[0], l[1], l[2], "Compra com crédito", l[3]])];
const rec = somar(VENDAS.map((l) => l[3] as number));
const com = somar(CREDITOS.map((l) => l[3] as number));
const PIS = 1.65;
const COFINS = 7.6;

const LUCRO_CONTABIL = 540000;
const ADICOES = 72000;
const EXCLUSOES = 31000;
const LUCRO_REAL = LUCRO_CONTABIL + ADICOES - EXCLUSOES;
const IRPJ = LUCRO_REAL * 0.15 + (LUCRO_REAL - 240000) * 0.1;
const CSLL = LUCRO_REAL * 0.09;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Impostos Federais (PIS, COFINS, IRPJ e CSLL)",
  introducao:
    "Um dia de trabalho com a apuração federal de uma empresa no Lucro Real: PIS e COFINS não cumulativos do mês, com débito e crédito, e o IRPJ e a CSLL do ano. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O fechamento federal da Metalúrgica Santa Clara",
      remetente: "Cláudia Ferraz, gerente de tributos",
      assunto: "PIS/COFINS de junho e IRPJ/CSLL do exercício",
      paragrafos: [
        "A Metalúrgica Santa Clara apura os tributos federais pelo Lucro Real, e por isso PIS e COFINS são não cumulativos: a empresa paga sobre as vendas (débito) e desconta o crédito das compras que dão direito. As alíquotas do regime são 1,65% para o PIS e 7,6% para a COFINS.",
        "O IRPJ tem alíquota de 15%, mais adicional de 10% sobre o lucro que passar de R$ 20.000 por mês (R$ 240.000 por ano), e a CSLL tem alíquota de 9% para este tipo de empresa. Os valores da atividade são fictícios e as regras do Lucro Real têm muitos detalhes que, no trabalho real, você confere na legislação e com a contadora responsável.",
      ],
      entregas: [
        "A apuração de PIS e COFINS de junho (etapa 2).",
        "O cálculo anual de IRPJ e CSLL a partir do lucro contábil e dos ajustes (etapa 3).",
        "Uma nota técnica por escrito para a diretoria (etapa 4).",
      ],
    }),
    planilha({
      id: "pis-cofins-junho",
      titulo: "Etapa 2 — Planilha: notas de junho (20 vendas e 16 compras com crédito)",
      cenario: "Cole a planilha no Excel. Débito = receita × alíquota; crédito = compras × alíquota (1,65% e 7,6%). Use SOMASE para separar Venda de Compra com crédito.",
      colunas: ["Documento", "Data", "Parceiro", "Tipo", "Valor (R$)"],
      linhas: LINHAS,
      instrucao: "Apure:",
      tarefas: [
        { id: "receita", rotulo: "Receita de vendas do mês (R$)", valor: rec, explicacao: "Soma das linhas de Venda." },
        { id: "compras", rotulo: "Compras que geram crédito (R$)", valor: com, explicacao: "Soma das linhas de Compra com crédito." },
        { id: "pis-debito", rotulo: "PIS a debitar sobre as vendas (R$)", valor: (rec * PIS) / 100, explicacao: "Receita × 1,65%." },
        { id: "pis-credito", rotulo: "PIS a creditar sobre as compras (R$)", valor: (com * PIS) / 100, explicacao: "Compras × 1,65%." },
        { id: "pis-saldo", rotulo: "PIS a recolher no mês (R$)", valor: ((rec - com) * PIS) / 100, explicacao: "Débito menos crédito." },
        { id: "cofins-saldo", rotulo: "COFINS a recolher no mês (R$)", valor: ((rec - com) * COFINS) / 100, explicacao: "(Receita − compras) × 7,6%." },
        { id: "total", rotulo: "Total de PIS + COFINS a recolher (R$)", valor: ((rec - com) * (PIS + COFINS)) / 100, explicacao: "PIS e COFINS somados: 9,25% sobre a diferença." },
      ],
    }),
    calculos({
      id: "lucro-real",
      titulo: "Etapa 3 — IRPJ e CSLL do ano pelo Lucro Real",
      cenario: "O lucro contábil antes dos tributos foi R$ 540.000,00. Houve adições de R$ 72.000,00 (despesas não dedutíveis) e exclusões de R$ 31.000,00 (receitas não tributáveis). O lucro real é o lucro contábil mais as adições menos as exclusões. Para este treino, a base da CSLL é o mesmo lucro real.",
      instrucao: "Calcule:",
      campos: [
        { id: "lucro-real", rotulo: "Lucro real do ano (R$)", esperado: LUCRO_REAL, explicacao: "540.000 + 72.000 − 31.000 = 581.000." },
        { id: "irpj-normal", rotulo: "IRPJ de 15% (R$)", esperado: LUCRO_REAL * 0.15, explicacao: "581.000 × 15% = 87.150." },
        { id: "adicional", rotulo: "Adicional de 10% sobre o que passa de R$ 240.000 (R$)", esperado: (LUCRO_REAL - 240000) * 0.1, explicacao: "(581.000 − 240.000) × 10% = 34.100." },
        { id: "irpj-total", rotulo: "IRPJ total do ano (R$)", esperado: IRPJ, explicacao: "87.150 + 34.100 = 121.250." },
        { id: "csll", rotulo: "CSLL de 9% (R$)", esperado: CSLL, explicacao: "581.000 × 9% = 52.290." },
        { id: "carga", rotulo: "IRPJ + CSLL como % do lucro contábil", esperado: ((IRPJ + CSLL) / LUCRO_CONTABIL) * 100, explicacao: "(121.250 + 52.290) ÷ 540.000 × 100." },
      ],
    }),
    dissertativa({
      id: "nota-tecnica",
      titulo: "Etapa 4 — Nota técnica para a diretoria",
      instrucao: "Escreva a nota técnica sobre a apuração federal.",
      deve: [
        "Explique a não cumulatividade do PIS e da COFINS e o resultado de junho (valor a recolher e o efeito dos créditos).",
        "Mostre como adições e exclusões levam do lucro contábil ao lucro real e por que ele é maior que o contábil neste caso.",
        "Explique o adicional do IRPJ e quanto ele representou no total.",
        "Indique um risco de glosa de crédito de PIS/COFINS e como a documentação reduz esse risco.",
      ],
      chave: /(n[aã]o cumulativ|cr[eé]dito|d[eé]bito|adi[cç][oõ]es|exclus[oõ]es|lucro real|adicional|glosa|irpj|csll)/i,
      minPalavras: 60,
    }),
    dissertativa({
      id: "planejamento",
      titulo: "Etapa 5 — Planejamento legítimo",
      instrucao: "A diretoria pergunta se existe forma de pagar menos tributo federal. Responda dentro da lei.",
      deve: [
        "Cite duas ações legítimas que podem reduzir a carga (aproveitar todos os créditos, revisar a escolha do regime, benefícios fiscais aplicáveis).",
        "Explique a diferença entre planejamento tributário e sonegação.",
        "Diga que cuidado documental protege a empresa em uma fiscalização.",
      ],
      chave: /(planejamento|sonega|lei|legal|cr[eé]dito|regime|benef[ií]cio|document|fiscaliza)/i,
    }),
  ],
};

export default atividade;
