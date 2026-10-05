import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Preço de Venda por Markup e Demonstração de Resultados",
  introducao:
    "Formar o preço de venda é cobrir o custo, os tributos, as comissões e ainda deixar o lucro desejado. Depois, a demonstração de resultados mostra se deu certo.",
  itens: [
    escolha({
      id: "markup",
      titulo: "O que é markup",
      instrucao: "O markup é...",
      opcoes: [
        "Um índice aplicado ao custo para formar o preço de venda, cobrindo despesas, tributos e lucro.",
        "O desconto dado ao cliente.",
        "O custo da matéria-prima.",
        "O lucro depois do imposto.",
      ],
      correta: 0,
      explicacao: "O markup embute no preço tudo o que não está no custo: despesas, tributos e a margem de lucro.",
    }),
    calculos({
      id: "markup-divisor",
      titulo: "Preço pelo markup divisor",
      cenario:
        "O custo de um produto é R$ 60,00. Sobre o preço de venda incidem 20% de despesas variáveis (impostos e comissão) e a empresa quer 15% de lucro.",
      instrucao: "Calcule a soma dos percentuais sobre o preço, o divisor (1 − soma) e o preço de venda (custo ÷ divisor).",
      campos: [
        { id: "soma", rotulo: "Soma dos percentuais (%)", esperado: 35, explicacao: "20% + 15% = 35% do preço." },
        { id: "divisor", rotulo: "Divisor", esperado: 0.65, explicacao: "1 − 0,35 = 0,65." },
        { id: "preco", rotulo: "Preço de venda (R$)", esperado: 92.31, explicacao: "60 ÷ 0,65 ≈ 92,31." },
      ],
    }),
    calculos({
      id: "conferir",
      titulo: "Conferindo o preço",
      cenario: "O preço calculado foi R$ 92,31 (use 92,31). As despesas variáveis são 20% do preço e o lucro desejado, 15% do preço.",
      instrucao: "Calcule o valor em reais das despesas variáveis, do lucro e verifique se, somados ao custo, fecham o preço.",
      campos: [
        { id: "despesas", rotulo: "Despesas variáveis (R$)", esperado: 18.46, tolerancia: 0.02, explicacao: "20% de 92,31 ≈ 18,46." },
        { id: "lucro", rotulo: "Lucro (R$)", esperado: 13.85, tolerancia: 0.02, explicacao: "15% de 92,31 ≈ 13,85." },
        { id: "soma", rotulo: "Custo + despesas + lucro (R$)", esperado: 92.31, tolerancia: 0.02, explicacao: "60 + 18,46 + 13,85 = 92,31: o preço fecha." },
      ],
    }),
    calculos({
      id: "dre",
      titulo: "Demonstração de resultados do mês",
      cenario:
        "Receita de vendas: R$ 100.000,00. Custos e despesas variáveis: R$ 40.000,00. Custos e despesas fixos: R$ 35.000,00.",
      instrucao: "Calcule a margem de contribuição, o resultado do mês e a margem do resultado sobre a receita.",
      campos: [
        { id: "mc", rotulo: "Margem de contribuição (R$)", esperado: 60000, explicacao: "100.000 − 40.000 = 60.000." },
        { id: "resultado", rotulo: "Resultado do mês (R$)", esperado: 25000, explicacao: "60.000 − 35.000 = 25.000." },
        { id: "margem", rotulo: "Margem do resultado (%)", esperado: 25, explicacao: "25.000 ÷ 100.000 = 25%." },
      ],
    }),
    escolha({
      id: "mercado",
      titulo: "O preço também depende do mercado",
      cenario: "O preço calculado pelo markup é maior que o preço que os concorrentes praticam.",
      instrucao: "O que a empresa deve fazer?",
      opcoes: [
        "Cobrar mesmo assim, sem olhar o mercado.",
        "Rever custos e despesas, o valor percebido e a margem, em vez de apenas copiar o preço do concorrente.",
        "Baixar o preço para abaixo do custo.",
        "Parar de vender.",
      ],
      correta: 1,
      explicacao: "O markup mostra o preço necessário; o mercado mostra o preço possível. A diferença é o espaço para melhorar custos ou valor percebido.",
    }),
    resposta({
      id: "ler-dre",
      titulo: "Interprete a DRE",
      instrucao: "Com a DRE da atividade (receita 100.000, resultado 25.000), escreva uma conclusão para o gestor sobre a saúde do negócio e uma ação para melhorar.",
      rotulo: "Sua conclusão",
      placeholder: "O negócio tem margem de 25%... Para melhorar, poderíamos...",
      chave: /(margem|lucro|resultado|custo|despesa|melhor|reduz|aument)/i,
      minPalavras: 12,
    }),
  ],
};

export default atividade;
