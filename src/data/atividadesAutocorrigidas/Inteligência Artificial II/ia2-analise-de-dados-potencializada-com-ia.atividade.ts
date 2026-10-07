import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, dissertativa, planilha, somar } from "../ajudantes";
import { decimal, inteiro, sorteio } from "../dadosFicticios";

const r = sorteio(5303);
const PRODUTOS = ["Fone Bluetooth", "Carregador turbo", "Capa antiqueda", "Película de vidro", "Smartwatch", "Caixa de som"];
const MESES = ["Jan", "Fev", "Mar", "Abr"];
const VENDAS = MESES.flatMap((mes) =>
  PRODUTOS.map((p) => [mes, p, inteiro(r, 20, 200), decimal(r, 25, 480)]),
);
const receita = (l: (string | number)[]) => (l[2] as number) * (l[3] as number);
const TOTAL = somar(VENDAS.map(receita));
const porProduto = new Map<string, number>();
for (const v of VENDAS) porProduto.set(v[1] as string, (porProduto.get(v[1] as string) ?? 0) + receita(v));
const lider = [...porProduto.entries()].sort((a, b) => b[1] - a[1])[0];
const porMes = (m: string) => somar(VENDAS.filter((v) => v[0] === m).map(receita));
const crescimento = ((porMes("Abr") - porMes("Jan")) / porMes("Jan")) * 100;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Análise de Dados Potencializada com IA",
  introducao:
    "Um dia de trabalho com o assistente de IA: pedir uma análise de dados, conferir cada afirmação dele contra os números reais e descobrir onde ele errou. Quem usa IA para analisar dados precisa saber verificar a resposta. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A resposta da IA que o diretor recebeu",
      remetente: "Cássio Brandão, diretor da Eletrônicos Brandão",
      assunto: "A IA disse que as vendas cresceram 40% — confere?",
      paragrafos: [
        "Pedi a um assistente de IA que analisasse a planilha de vendas de acessórios do primeiro quadrimestre (24 linhas: 6 produtos em 4 meses). Ele respondeu com um relatório bonito, mas eu desconfiei de alguns números. Quero que você refaça os cálculos na planilha e me diga o que está certo e o que está errado.",
        "As afirmações da IA foram: (1) o faturamento total do quadrimestre foi de R$ 640.000; (2) o produto que mais faturou foi a Caixa de som; (3) as vendas de abril cresceram 40% em relação a janeiro. Receita de cada linha = quantidade × preço unitário.",
      ],
      entregas: [
        "Os números reais de faturamento total, produto líder e crescimento (etapa 2).",
        "A conferência das três afirmações da IA, dizendo quais estão certas (etapa 3).",
        "Um procedimento por escrito para usar IA em análise de dados sem cair em erros (etapa 4).",
      ],
    }),
    planilha({
      id: "vendas-do-quadrimestre",
      titulo: "Etapa 2 — Planilha: vendas de acessórios de janeiro a abril",
      cenario: "Cole a planilha no Excel, crie a coluna Receita (=quantidade × preço), e use SOMASE por mês e por produto.",
      colunas: ["Mês", "Produto", "Quantidade vendida", "Preço unitário (R$)"],
      linhas: VENDAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "total", rotulo: "Faturamento total do quadrimestre (R$)", valor: TOTAL, explicacao: "Soma de quantidade × preço das 24 linhas." },
        { id: "janeiro", rotulo: "Faturamento de janeiro (R$)", valor: porMes("Jan"), explicacao: "Soma das receitas das linhas de janeiro." },
        { id: "abril", rotulo: "Faturamento de abril (R$)", valor: porMes("Abr"), explicacao: "Soma das receitas das linhas de abril." },
        { id: "crescimento", rotulo: "Crescimento de abril em relação a janeiro (%, negativo se caiu)", valor: crescimento, explicacao: "(Abril − janeiro) ÷ janeiro × 100.", tolerancia: 0.05 },
        { id: "lider-valor", rotulo: "Faturamento do produto que mais faturou (R$)", valor: lider[1], explicacao: `O produto líder foi ${lider[0]}.` },
        { id: "lider-peso", rotulo: "Participação do produto líder no total (%)", valor: (lider[1] / TOTAL) * 100, explicacao: "Faturamento do líder ÷ faturamento total × 100.", tolerancia: 0.05 },
        { id: "diferenca-ia", rotulo: "Diferença entre o total que a IA informou (R$ 640.000) e o total real (R$, positivo se a IA superestimou)", valor: 640000 - TOTAL, explicacao: "640.000 menos o faturamento total calculado." },
      ],
    }),
    dissertativa({
      id: "conferencia-da-ia",
      titulo: "Etapa 3 — Conferindo as três afirmações da IA",
      instrucao: "Escreva o parecer sobre cada afirmação.",
      deve: [
        "Para a afirmação 1 (faturamento total), diga se está certa e qual é o valor real.",
        "Para a afirmação 2 (produto líder), diga qual produto realmente lidera e por quanto.",
        "Para a afirmação 3 (crescimento de 40%), diga qual foi o crescimento real.",
        "Explique por que a IA pode apresentar números errados com tom confiante (alucinação, cálculo que não é feito de verdade, contexto incompleto).",
      ],
      chave: /(faturamento|total|afirma[cç][aã]o|produto|crescimento|alucina|erro|real|confer)/i,
      minPalavras: 65,
    }),
    dissertativa({
      id: "procedimento-seguro",
      titulo: "Etapa 4 — Como usar IA em análise de dados sem cair em erros",
      instrucao: "Escreva o procedimento que a equipe deve seguir antes de apresentar qualquer número gerado por IA.",
      deve: [
        "Liste ao menos cinco passos de verificação (recalcular totais na planilha, conferir amostras de linhas, pedir a fórmula usada, testar com um caso conhecido, registrar a versão dos dados).",
        "Explique quais dados nunca devem ser colados em uma IA pública (dados pessoais de clientes, informações sigilosas) e o que fazer em vez disso.",
        "Diga quando a IA ajuda mais (explicar uma fórmula, sugerir gráficos, resumir tendências) e quando deve ser só um apoio e não a fonte do número.",
      ],
      chave: /(recalcul|planilha|f[oó]rmula|confer|amostra|dados pessoais|sigilo|lgpd|apoio|verifica|vers[aã]o)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
