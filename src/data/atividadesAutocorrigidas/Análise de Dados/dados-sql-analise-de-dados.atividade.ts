import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { CIDADES, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(4303);
const NOMES = ["Mercado Boa Compra", "Clínica Vida Plena", "Construtora Horizonte", "Escola Novo Saber", "Restaurante Sabor Caseiro", "Oficina Ponto Certo", "Farmácia Bem Estar", "Hotel Recanto", "Padaria Pão Quente", "Loja Estilo Urbano"];
const CLIENTES = NOMES.map((nome, i) => [String(i + 1), nome, sortear(r, CIDADES.slice(0, 4))]);
const STATUS = ["pago", "pago", "pago", "pendente", "cancelado"] as const;
const PEDIDOS = Array.from({ length: 30 }, (_, i) => {
  const mes = inteiro(r, 1, 3);
  return [String(i + 1), String(inteiro(r, 1, 10)), `2025-0${mes}-${String(inteiro(r, 1, 28)).padStart(2, "0")}`, inteiro(r, 12, 160) * 25, sortear(r, STATUS)];
});
const pagos = PEDIDOS.filter((p) => p[4] === "pago");
const cidade = (clienteId: string) => CLIENTES.find((c) => c[0] === clienteId)![2] as string;
const porCidade = new Map<string, number>();
for (const p of pagos) porCidade.set(cidade(p[1] as string), (porCidade.get(cidade(p[1] as string)) ?? 0) + (p[3] as number));
const ranking = [...porCidade.entries()].sort((a, b) => b[1] - a[1]);
const porCliente = new Map<string, number>();
for (const p of pagos) porCliente.set(p[1] as string, (porCliente.get(p[1] as string) ?? 0) + (p[3] as number));
const topCliente = [...porCliente.entries()].sort((a, b) => b[1] - a[1])[0];

const ESQUEMA = `CREATE TABLE clientes (id INT, nome VARCHAR(60), cidade VARCHAR(40));
CREATE TABLE pedidos (id INT, cliente_id INT, data DATE, valor DECIMAL(10,2), status VARCHAR(12));`;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Análise de Dados em SQL",
  introducao:
    "Um dia de trabalho com banco de dados: responder perguntas do negócio com SELECT, WHERE, GROUP BY, JOIN e ORDER BY em duas tabelas, e informar o resultado que o banco devolveu. As tabelas vêm dentro da atividade: copie para o seu banco (SQLite, MySQL, PostgreSQL ou um editor on-line), escreva o comando e digite o resultado. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "As perguntas do diretor comercial",
      remetente: "Alexandre Ribeiro, diretor comercial da Distribuidora Meridional",
      assunto: "Quatro perguntas sobre os pedidos do primeiro trimestre",
      paragrafos: [
        "O banco de dados da distribuidora tem duas tabelas: clientes (id, nome, cidade) e pedidos (id, cliente_id, data, valor, status). O status pode ser pago, pendente ou cancelado, e só os pedidos pagos contam como faturamento.",
        "Escreva cada consulta no seu banco de testes (você pode criar as tabelas com o código abaixo e inserir os dados das tabelas mostradas) e informe o resultado que o banco devolveu. Os comandos são conferidos por padrão, então escreva em SQL padrão, sem comentários.",
      ],
      entregas: [
        "Quatro consultas SQL e o resultado de cada uma (etapas 2 a 5).",
        "Uma interpretação por escrito dos resultados para o diretor (etapa 6).",
      ],
    }),
    consulta({
      id: "faturamento-total",
      titulo: "Etapa 2 — Consulta 1: faturamento do trimestre",
      cenario: "Quanto a distribuidora faturou (somente pedidos pagos) no trimestre?",
      instrucao: "Use SELECT SUM(valor) com WHERE para filtrar o status.",
      codigo: { rotulo: "Estrutura das tabelas", conteudo: ESQUEMA },
      tabelas: [
        { nome: "Tabela clientes (10 linhas)", colunas: ["id", "nome", "cidade"], linhas: CLIENTES },
        { nome: "Tabela pedidos (30 linhas)", colunas: ["id", "cliente_id", "data", "valor", "status"], linhas: PEDIDOS },
      ],
      comandos: [
        { id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+sum\s*\(\s*valor\s*\)[\s\S]+from\s+pedidos[\s\S]+where[\s\S]+status\s*=\s*['"]pago['"]/i, dica: "Falta o SUM(valor), o FROM pedidos ou o filtro WHERE status = 'pago'." },
      ],
      resultados: [
        { id: "total", rotulo: "Resultado: faturamento (R$)", valor: somar(pagos.map((p) => p[3] as number)), explicacao: "Soma do valor dos pedidos com status pago." },
        { id: "qtd", rotulo: "Quantidade de pedidos pagos (rode também SELECT COUNT(*) ...)", valor: pagos.length, explicacao: "Pedidos com status pago.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "por-cidade",
      titulo: "Etapa 3 — Consulta 2: faturamento por cidade",
      cenario: "O diretor quer saber a cidade que mais fatura. É preciso juntar pedidos e clientes.",
      instrucao: "Use JOIN entre pedidos e clientes, WHERE status = 'pago', GROUP BY cidade e ORDER BY a soma em ordem decrescente.",
      tabelas: [],
      comandos: [
        { id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+join[\s\S]+on[\s\S]+group\s+by[\s\S]+cidade[\s\S]*order\s+by[\s\S]+desc/i, dica: "Faltam o JOIN com ON, o GROUP BY cidade ou o ORDER BY ... DESC." },
      ],
      resultados: [
        { id: "cidade-topo", rotulo: "Resultado: faturamento da cidade que mais fatura (R$)", valor: ranking[0][1], explicacao: `A cidade líder é ${ranking[0][0]}.` },
        { id: "cidades", rotulo: "Quantidade de cidades que aparecem no resultado", valor: ranking.length, explicacao: "Cidades com ao menos um pedido pago.", tolerancia: 0 },
        { id: "segunda", rotulo: "Faturamento da segunda cidade do ranking (R$)", valor: ranking[1][1], explicacao: `A segunda colocada é ${ranking[1][0]}.` },
      ],
    }),
    consulta({
      id: "melhor-cliente",
      titulo: "Etapa 4 — Consulta 3: o melhor cliente",
      cenario: "Qual cliente mais comprou, entre os pedidos pagos?",
      instrucao: "Agrupe por cliente (nome), some o valor e use ORDER BY ... DESC com LIMIT 1.",
      tabelas: [],
      comandos: [
        { id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+group\s+by[\s\S]+order\s+by[\s\S]+desc[\s\S]+limit\s+1/i, dica: "Faltam GROUP BY, ORDER BY ... DESC ou LIMIT 1." },
      ],
      resultados: [
        { id: "valor", rotulo: "Resultado: valor comprado pelo melhor cliente (R$)", valor: topCliente[1], explicacao: `O cliente de id ${topCliente[0]} (${CLIENTES.find((c) => c[0] === topCliente[0])![1]}) lidera.` },
      ],
    }),
    consulta({
      id: "ticket-medio",
      titulo: "Etapa 5 — Consulta 4: ticket médio e pedidos grandes",
      cenario: "Qual o ticket médio dos pedidos pagos e quantos pedidos pagos passam de R$ 2.000,00?",
      instrucao: "Use AVG(valor) em uma consulta e COUNT(*) com WHERE valor > 2000 em outra.",
      tabelas: [],
      comandos: [
        { id: "sql-media", rotulo: "Comando do ticket médio", padrao: /select[\s\S]+avg\s*\(\s*valor\s*\)[\s\S]+from\s+pedidos[\s\S]+where/i, dica: "Falta o AVG(valor), o FROM pedidos ou o filtro WHERE." },
        { id: "sql-grandes", rotulo: "Comando da contagem de pedidos acima de R$ 2.000,00", padrao: /select[\s\S]+count\s*\([\s\S]*\)[\s\S]+from\s+pedidos[\s\S]+where[\s\S]+valor\s*>\s*2000/i, dica: "Falta o COUNT, o FROM pedidos ou o filtro valor > 2000." },
      ],
      resultados: [
        { id: "ticket", rotulo: "Resultado: ticket médio dos pedidos pagos (R$)", valor: somar(pagos.map((p) => p[3] as number)) / pagos.length, explicacao: "Soma dos pedidos pagos ÷ quantidade de pedidos pagos." },
        { id: "grandes", rotulo: "Resultado: pedidos pagos acima de R$ 2.000,00", valor: pagos.filter((p) => (p[3] as number) > 2000).length, explicacao: "Pedidos pagos com valor maior que 2.000.", tolerancia: 0 },
      ],
    }),
    dissertativa({
      id: "interpretacao",
      titulo: "Etapa 6 — Interpretação para o diretor",
      instrucao: "Escreva a resposta que o diretor receberia.",
      deve: [
        "Informe o faturamento, a cidade líder, o melhor cliente e o ticket médio, com os resultados que o banco devolveu para você.",
        "Explique por que o filtro status = 'pago' é indispensável e o que aconteceria com o número se ele fosse esquecido.",
        "Aponte uma limitação da análise (poucos pedidos, só um trimestre, um cliente concentrando muito) e uma consulta adicional que você faria para aprofundar.",
      ],
      chave: /(faturamento|cidade|cliente|ticket|status|pago|join|group by|consulta|limita)/i,
      minPalavras: 55,
    }),
  ],
};

export default atividade;
