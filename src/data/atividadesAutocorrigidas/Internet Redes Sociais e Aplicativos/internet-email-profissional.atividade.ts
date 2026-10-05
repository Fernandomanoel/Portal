import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const CAMPANHA = [
  ["Boas-vindas", 1200, 840, 252, 6],
  ["Promoção de março", 1500, 600, 180, 22],
  ["Pesquisa de satisfação", 900, 450, 90, 4],
  ["Lembrete de reunião", 300, 285, 40, 0],
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — O Poder do seu E-mail",
  introducao:
    "O e-mail é a ferramenta de comunicação formal do trabalho. Aprenda a usar os campos corretos, anexar arquivos dentro do limite e escrever mensagens claras. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    associar({
      id: "campos",
      titulo: "Para, Cc e Cco",
      instrucao: "Escolha em qual campo cada destinatário deve entrar.",
      opcoes: ["Para (destinatário principal)", "Cc (com cópia, todos veem)", "Cco (cópia oculta, ninguém vê)"],
      linhas: [
        { id: "responsavel", rotulo: "A pessoa que precisa tomar a ação pedida no e-mail.", correta: 0 },
        { id: "gestor", rotulo: "O gestor que só precisa ficar ciente da conversa.", correta: 1 },
        { id: "clientes", rotulo: "Uma lista de clientes que não devem ver os e-mails uns dos outros.", correta: 2 },
      ],
      explicacao: "Cco protege a privacidade de listas de contatos; Cc dá ciência; Para endereça quem deve agir.",
    }),
    escolha({
      id: "assunto",
      titulo: "O assunto do e-mail",
      instrucao: "Qual é o melhor assunto para um e-mail que pede a aprovação de um orçamento?",
      opcoes: ["Oi", "Urgente!!!", "Aprovação do orçamento nº 482 — resposta até sexta (15/03)", "Importante"],
      correta: 2,
      explicacao: "Um bom assunto diz o tema e o que se espera, de forma clara e curta, ajudando quem lê a priorizar.",
    }),
    calculo({
      id: "anexos",
      titulo: "Limite de anexos",
      cenario: "O serviço de e-mail aceita no máximo 25 MB por mensagem. Você quer anexar três arquivos de 9 MB cada.",
      instrucao: "Qual é o tamanho total dos anexos, em MB? (Ele cabe no limite?)",
      rotulo: "Total (MB)",
      esperado: 27,
      tolerancia: 0,
      explicacao: "3 × 9 = 27 MB, acima de 25 MB. Compacte os arquivos ou envie um link de pasta na nuvem.",
    }),
    resposta({
      id: "escrever",
      titulo: "Escreva a mensagem",
      cenario: "Você precisa pedir ao setor de compras uma cotação de 10 cadeiras de escritório até quinta-feira.",
      instrucao: "Escreva o corpo do e-mail: saudação, pedido claro com prazo e despedida.",
      rotulo: "Corpo do e-mail",
      placeholder: "Prezados, ... Solicito cotação de 10 cadeiras ... até quinta-feira. Atenciosamente, ...",
      chave: /(cota[cç][aã]o|cadeira)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "campanha-email",
      titulo: "Planilha: resultados de quatro e-mails enviados",
      cenario: "A empresa enviou quatro comunicados para a lista de clientes. Cole a planilha no Excel e calcule as taxas (abertura = abertos ÷ enviados).",
      colunas: ["Mensagem", "Enviados", "Abertos", "Cliques", "Descadastros"],
      linhas: CAMPANHA,
      instrucao: "Calcule:",
      tarefas: [
        { id: "abertura-boas-vindas", rotulo: "Taxa de abertura do e-mail de boas-vindas (%)", valor: (840 / 1200) * 100, explicacao: "840 ÷ 1.200 × 100 = 70%." },
        { id: "abertura-geral", rotulo: "Taxa de abertura geral dos quatro e-mails (%)", valor: (somar(CAMPANHA.map((l) => l[2] as number)) / somar(CAMPANHA.map((l) => l[1] as number))) * 100, explicacao: "Total de abertos ÷ total de enviados × 100." },
        { id: "cliques-abertos", rotulo: "Cliques ÷ abertos no e-mail de promoção (%)", valor: (180 / 600) * 100, explicacao: "180 ÷ 600 × 100 = 30%." },
        { id: "descadastro", rotulo: "Taxa de descadastro da promoção (% dos enviados)", valor: (22 / 1500) * 100, explicacao: "22 ÷ 1.500 × 100 ≈ 1,47%." },
      ],
    }),
    dissertativa({
      id: "analisar-envios",
      titulo: "O que os números dizem",
      instrucao: "Escreva uma análise dos quatro envios e proponha melhorias.",
      deve: [
        "Diga qual e-mail teve melhor e pior desempenho e uma hipótese para cada um (assunto, público, horário).",
        "Comente o número de descadastros da promoção.",
        "Proponha duas melhorias para o próximo envio (assunto, segmentação, chamada para ação).",
      ],
      chave: /(assunto|abertura|clique|descadastro|segment|hor[aá]rio|melhor|pior)/i,
    }),
  ],
};

export default atividade;
