import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha } from "../ajudantes";
import { decimal, sorteio } from "../dadosFicticios";

const r = sorteio(4606);
const CENTROS: [number, number][] = [
  [3, 2],
  [10, 8],
  [20, 15],
];
const NOMES = ["Cliente 01", "Cliente 02", "Cliente 03", "Cliente 04", "Cliente 05", "Cliente 06", "Cliente 07", "Cliente 08", "Cliente 09", "Cliente 10", "Cliente 11", "Cliente 12", "Cliente 13", "Cliente 14"];
const CLIENTES = NOMES.map((nome, i) => {
  const [fx, gy] = CENTROS[i % 3];
  return [nome, Math.max(1, Math.round(fx + decimal(r, -3, 3, 1))), Math.max(0.3, decimal(r, gy - 2.5, gy + 2.5, 1))] as [string, number, number];
});
const dist = (c: [string, number, number], k: number) => Math.hypot(c[1] - CENTROS[k][0], c[2] - CENTROS[k][1]);
const atribuicao = CLIENTES.map((c) => [0, 1, 2].reduce((melhor, k) => (dist(c, k) < dist(c, melhor) ? k : melhor), 0));
const grupo = (k: number) => CLIENTES.filter((_, i) => atribuicao[i] === k);
const media = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
const novo = (k: number) => [media(grupo(k).map((c) => c[1])), media(grupo(k).map((c) => c[2]))];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Clusterização de Dados e Métodos de Clusterização",
  introducao:
    "Um dia de trabalho de segmentação de clientes: executar à mão uma rodada do algoritmo k-means em 14 clientes, calcular distâncias, atribuir grupos e recalcular centroides. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "Segmentando a carteira da Livraria Páginas",
      remetente: "Larissa Monteiro, analista de CRM da Livraria Páginas",
      assunto: "Três perfis de cliente para a campanha de fidelidade",
      paragrafos: [
        "Clusterização é agrupar objetos parecidos sem que alguém diga antes quais são os grupos (aprendizado não supervisionado). O k-means escolhe k centroides, atribui cada ponto ao centroide mais próximo (distância euclidiana), recalcula cada centroide como a média dos pontos do grupo e repete até estabilizar.",
        "Para a campanha de fidelidade, cada cliente tem duas medidas: frequência (compras por ano) e gasto anual (em milhares de reais). Os três centroides iniciais escolhidos foram C1 = (3; 2), C2 = (10; 8) e C3 = (20; 15). Faça uma rodada completa: distâncias, atribuição e novos centroides.",
      ],
      entregas: [
        "As distâncias de cada cliente aos três centroides e o grupo de cada um (etapa 2).",
        "Os novos centroides depois da primeira rodada (etapa 2).",
        "Uma interpretação de negócio dos três perfis (etapa 4).",
      ],
    }),
    planilha({
      id: "primeira-rodada",
      titulo: "Etapa 2 — Planilha: 14 clientes e uma rodada do k-means",
      cenario: "Cole a planilha no Excel. Distância ao centroide Ck = RAIZ((frequência − Cx)^2 + (gasto − Cy)^2). O cliente vai para o centroide de menor distância. Depois, o novo centroide é a MÉDIA de frequência e de gasto dos clientes do grupo.",
      colunas: ["Cliente", "Frequência (compras/ano)", "Gasto anual (R$ mil)"],
      linhas: CLIENTES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "dist-01-c1", rotulo: "Distância do Cliente 01 ao centroide C1", valor: dist(CLIENTES[0], 0), explicacao: "Raiz de (frequência − 3)² + (gasto − 2)².", tolerancia: 0.03 },
        { id: "dist-01-c2", rotulo: "Distância do Cliente 01 ao centroide C2", valor: dist(CLIENTES[0], 1), explicacao: "Raiz de (frequência − 10)² + (gasto − 8)².", tolerancia: 0.03 },
        { id: "grupo-1", rotulo: "Quantidade de clientes atribuídos ao grupo do C1", valor: grupo(0).length, explicacao: "Clientes mais próximos do C1.", tolerancia: 0 },
        { id: "grupo-2", rotulo: "Quantidade de clientes atribuídos ao grupo do C2", valor: grupo(1).length, explicacao: "Clientes mais próximos do C2.", tolerancia: 0 },
        { id: "grupo-3", rotulo: "Quantidade de clientes atribuídos ao grupo do C3", valor: grupo(2).length, explicacao: "Clientes mais próximos do C3.", tolerancia: 0 },
        { id: "novo-c1-x", rotulo: "Novo centroide do grupo 1 — frequência média", valor: novo(0)[0], explicacao: "Média da frequência dos clientes do grupo 1.", tolerancia: 0.03 },
        { id: "novo-c1-y", rotulo: "Novo centroide do grupo 1 — gasto médio (R$ mil)", valor: novo(0)[1], explicacao: "Média do gasto dos clientes do grupo 1.", tolerancia: 0.03 },
        { id: "novo-c3-y", rotulo: "Novo centroide do grupo 3 — gasto médio (R$ mil)", valor: novo(2)[1], explicacao: "Média do gasto dos clientes do grupo 3.", tolerancia: 0.03 },
      ],
    }),
    associar({
      id: "metodos",
      titulo: "Etapa 3 — Métodos de clusterização",
      instrucao: "Associe cada descrição ao método.",
      opcoes: ["K-means", "Clusterização hierárquica", "DBSCAN"],
      linhas: [
        { id: "kmeans", rotulo: "Exige escolher o número de grupos k antes e usa centroides recalculados a cada rodada.", correta: 0 },
        { id: "dendrograma", rotulo: "Constrói uma árvore de agrupamentos (dendrograma), juntando ou dividindo grupos passo a passo.", correta: 1 },
        { id: "densidade", rotulo: "Agrupa pontos em regiões densas, identifica ruído e não exige definir o número de grupos.", correta: 2 },
      ],
      explicacao: "A escolha do método depende do formato dos dados, do tamanho da base e de saber ou não quantos grupos se espera.",
    }),
    dissertativa({
      id: "perfis-de-cliente",
      titulo: "Etapa 4 — Interpretando os três perfis",
      instrucao: "Escreva a interpretação de negócio dos grupos para a campanha de fidelidade.",
      deve: [
        "Dê um nome e uma descrição a cada grupo a partir dos novos centroides (frequência e gasto), usando os números calculados.",
        "Proponha uma ação de marketing diferente para cada perfil.",
        "Explique por que a escolha de k e a escala das variáveis (compras por ano x R$ mil) podem mudar os grupos, e como você testaria outros valores de k.",
        "Diga como você validaria se os grupos fazem sentido para o negócio antes de gastar a verba da campanha.",
      ],
      chave: /(grupo|perfil|centroide|frequ[eê]ncia|gasto|k-?means|escala|valida|campanha|cliente)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
