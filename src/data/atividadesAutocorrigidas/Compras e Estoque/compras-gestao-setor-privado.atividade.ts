import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, dissertativa, planilha, somar } from "../ajudantes";
import { inteiro, sortear, sorteio } from "../dadosFicticios";

const AREAS = ["Produção", "Manutenção", "Administrativo", "Comercial", "Logística", "TI"];
const ITENS = ["Notebook", "Empilhadeira (aluguel)", "Material de limpeza", "Cadeiras", "Licença de software", "Pallets", "Uniformes", "Material de escritório", "Manutenção de ar-condicionado", "Impressora", "Peças de reposição", "Treinamento externo"];
const r = sorteio(3202);
const REQS = Array.from({ length: 24 }, (_, i) => [
  `REQ-${2200 + i}`,
  sortear(r, AREAS),
  sortear(r, ITENS),
  r() < 0.25 ? "Sim" : "Não",
  inteiro(r, 3, 160) * 100,
]);
const valor = (l: (string | number)[]) => l[4] as number;
const nivel = (v: number) => (v <= 2000 ? "comprador" : v <= 10000 ? "gerente" : "diretor");
const soma = (n: string) => somar(REQS.filter((l) => nivel(valor(l)) === n).map(valor));
const conta = (n: string) => REQS.filter((l) => nivel(valor(l)) === n).length;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Gestão de Compras no Setor Privado",
  introducao:
    "Um dia de trabalho no setor de compras de uma empresa privada: organizar as requisições do mês pela política de alçadas e entender como o ciclo de compras funciona. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido do supervisor de compras",
      remetente: "Gustavo Ramalho, supervisor de compras",
      assunto: "Requisições da semana — Grupo Aurora Alimentos",
      paragrafos: [
        "O ciclo de compras do Grupo Aurora começa com a requisição de compra feita pela área, passa pela cotação com fornecedores, pela aprovação e pelo pedido, e termina com o recebimento e o pagamento. A aprovação depende do valor: até R$ 2.000,00 o próprio comprador aprova; de R$ 2.000,01 até R$ 10.000,00, o gerente; acima disso, a diretoria.",
        "Estas são as 24 requisições que chegaram na semana. Preciso saber quantas e quanto cada nível de aprovação vai analisar, e quais são urgentes, para organizar a agenda de aprovações.",
      ],
      entregas: [
        "O resumo das requisições por alçada de aprovação (etapa 2).",
        "O total e o peso das requisições urgentes (etapa 2).",
        "Um fluxo escrito do ciclo de compras com os riscos de cada etapa (etapa 3).",
      ],
    }),
    planilha({
      id: "requisicoes-da-semana",
      titulo: "Etapa 2 — Planilha: as 24 requisições da semana",
      cenario: "Cole a planilha no Excel e crie a coluna Alçada (=SE(valor<=2000;\"Comprador\";SE(valor<=10000;\"Gerente\";\"Diretor\"))). Depois use CONT.SE e SOMASE.",
      colunas: ["Requisição", "Área solicitante", "Item", "Urgente", "Valor estimado (R$)"],
      linhas: REQS,
      instrucao: "Resuma:",
      tarefas: [
        { id: "total", rotulo: "Valor total das requisições (R$)", valor: somar(REQS.map(valor)), explicacao: "Soma da coluna Valor estimado." },
        { id: "qtd-comprador", rotulo: "Requisições até R$ 2.000,00 (aprovadas pelo comprador)", valor: conta("comprador"), explicacao: "Conte os valores até 2.000.", tolerancia: 0 },
        { id: "qtd-gerente", rotulo: "Requisições entre R$ 2.000,01 e R$ 10.000,00 (gerente)", valor: conta("gerente"), explicacao: "Conte os valores nessa faixa.", tolerancia: 0 },
        { id: "qtd-diretor", rotulo: "Requisições acima de R$ 10.000,00 (diretoria)", valor: conta("diretor"), explicacao: "Conte os valores acima de 10.000.", tolerancia: 0 },
        { id: "valor-diretor", rotulo: "Valor das requisições da diretoria (R$)", valor: soma("diretor"), explicacao: "Soma das requisições acima de 10.000." },
        { id: "urgentes", rotulo: "Valor das requisições urgentes (R$)", valor: somar(REQS.filter((l) => l[3] === "Sim").map(valor)), explicacao: "Soma das linhas com Urgente = Sim." },
        { id: "peso-diretor", rotulo: "Participação da diretoria no valor total (%)", valor: (soma("diretor") / somar(REQS.map(valor))) * 100, explicacao: "Valor das requisições da diretoria ÷ total × 100." },
      ],
    }),
    dissertativa({
      id: "fluxo-de-compras",
      titulo: "Etapa 3 — O ciclo de compras e seus riscos",
      instrucao: "Descreva o ciclo de compras do Grupo Aurora, da requisição ao pagamento.",
      deve: [
        "Liste as etapas na ordem (requisição, cotação, aprovação, pedido, recebimento, conferência e pagamento).",
        "Para cada etapa, aponte um risco (compra sem necessidade, direcionamento de fornecedor, pagamento sem receber, divergência de preço).",
        "Explique por que a alçada de aprovação e a separação de funções (quem pede, quem compra, quem recebe, quem paga) reduzem fraudes.",
        "Diga o que você faria com uma requisição urgente que passa da alçada do comprador.",
      ],
      chave: /(requisi[cç][aã]o|cota[cç][aã]o|aprova|pedido|recebimento|pagamento|al[cç]ada|risco|fraude|urgente)/i,
      minPalavras: 70,
    }),
    dissertativa({
      id: "agenda-de-aprovacoes",
      titulo: "Etapa 4 — Organizando a agenda de aprovações",
      instrucao: "Proponha como o supervisor deve organizar a semana de aprovações usando o resumo da planilha.",
      deve: [
        "Diga qual nível de aprovação concentra mais valor e qual concentra mais requisições.",
        "Proponha uma ordem de análise que considere urgência e valor.",
        "Sugira um indicador para acompanhar o tempo médio de aprovação.",
      ],
      chave: /(urgente|valor|aprova|ordem|prazo|indicador|tempo|diretoria|gerente)/i,
    }),
  ],
};

export default atividade;
