import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const ATIVIDADES = [
  ["Preparação de máquinas", 24000, "Nº de setups", 60, 10, 50],
  ["Inspeção de qualidade", 18000, "Nº de inspeções", 360, 240, 120],
  ["Compras de materiais", 9000, "Nº de pedidos", 90, 60, 30],
];
const TAXAS = ATIVIDADES.map((l) => (l[1] as number) / (l[3] as number));
const custoProduto = (col: number) => somar(ATIVIDADES.map((l, i) => (l[col] as number) * TAXAS[i]));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Custos — Sistemas por Centros de Custos e Custeio ABC",
  introducao:
    "Os centros de custos agrupam gastos por departamento. O custeio ABC vai além: distribui os custos pelas atividades realizadas, conforme o que realmente consome recursos. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "centro-custo",
      titulo: "O que é um centro de custos",
      instrucao: "O que é um centro de custos?",
      opcoes: [
        "Um departamento ou área da empresa para a qual se acumulam os custos, a fim de controlá-los.",
        "O prédio da diretoria.",
        "O lugar onde se guardam os produtos acabados.",
        "Um tipo de imposto.",
      ],
      correta: 0,
      explicacao: "Acumular custos por departamento permite responsabilizar gestores e achar onde o custo está crescendo.",
    }),
    associar({
      id: "produtivo-apoio",
      titulo: "Departamentos produtivos e de apoio",
      instrucao: "Classifique os centros de uma indústria.",
      opcoes: ["Produtivo (transforma o produto)", "De apoio (serve aos demais)"],
      linhas: [
        { id: "montagem", rotulo: "Montagem", correta: 0 },
        { id: "manutencao", rotulo: "Manutenção", correta: 1 },
        { id: "usinagem", rotulo: "Usinagem", correta: 0 },
        { id: "almoxarifado", rotulo: "Almoxarifado", correta: 1 },
      ],
      explicacao: "Os custos dos centros de apoio são depois distribuídos aos centros produtivos, que os levam aos produtos.",
    }),
    calculos({
      id: "inspecao",
      titulo: "Custo por atividade: inspeção de qualidade",
      cenario: "A atividade «inspeção» custou R$ 20.000,00 no mês e foram realizadas 400 inspeções. O produto A exigiu 100 inspeções e o produto B exigiu 300.",
      instrucao: "Calcule o custo por inspeção (direcionador de custo) e a parte de cada produto.",
      campos: [
        { id: "taxa", rotulo: "Custo por inspeção (R$)", esperado: 50, explicacao: "20.000 ÷ 400 = 50." },
        { id: "produto-a", rotulo: "Custo de inspeção do produto A (R$)", esperado: 5000, explicacao: "100 × 50 = 5.000." },
        { id: "produto-b", rotulo: "Custo de inspeção do produto B (R$)", esperado: 15000, explicacao: "300 × 50 = 15.000." },
      ],
    }),
    resposta({
      id: "direcionador",
      titulo: "Escolha o direcionador",
      instrucao: "Dê um exemplo de atividade (como compra de materiais ou preparação de máquinas) e o direcionador de custo que você usaria para distribuí-la.",
      rotulo: "Atividade e direcionador",
      placeholder: "Atividade: preparação de máquinas. Direcionador: número de preparações...",
      minPalavras: 15,
    }),
    planilha({
      id: "abc-dois-produtos",
      titulo: "Planilha: custeio ABC de dois produtos",
      cenario: "A fábrica produz os produtos A e B. Os custos indiretos estão divididos em três atividades, cada uma com seu direcionador de custo. Cole a planilha no Excel, calcule o custo por unidade do direcionador (custo ÷ total) e multiplique pelo uso de cada produto.",
      colunas: ["Atividade", "Custo no mês (R$)", "Direcionador", "Total do direcionador", "Uso do produto A", "Uso do produto B"],
      linhas: ATIVIDADES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "taxa-setup", rotulo: "Custo por setup (R$)", valor: TAXAS[0], explicacao: "24.000 ÷ 60 = 400." },
        { id: "taxa-pedido", rotulo: "Custo por pedido de compra (R$)", valor: TAXAS[2], explicacao: "9.000 ÷ 90 = 100." },
        { id: "custo-a", rotulo: "Custo indireto total do produto A (R$)", valor: custoProduto(4), explicacao: "10×400 + 240×50 + 60×100 = 22.000." },
        { id: "custo-b", rotulo: "Custo indireto total do produto B (R$)", valor: custoProduto(5), explicacao: "50×400 + 120×50 + 30×100 = 29.000." },
      ],
    }),
    dissertativa({
      id: "abc-versus-volume",
      titulo: "ABC x rateio por volume",
      instrucao: "Se A e B tivessem a mesma quantidade produzida e o rateio fosse por volume, cada um receberia metade dos R$ 51.000,00 de custos indiretos. Compare com o resultado do ABC.",
      deve: [
        "Diga quanto cada produto receberia pelo rateio por volume e quanto recebe pelo ABC.",
        "Explique qual produto estava sendo subcustado e o que isso faz com o preço de venda e o lucro real.",
        "Descreva uma situação em que o ABC compensa o trabalho extra e uma em que um rateio simples basta.",
      ],
      chave: /(abc|volume|rateio|subcust|atividade|direcionador|pre[cç]o|lucro)/i,
    }),
  ],
};

export default atividade;
