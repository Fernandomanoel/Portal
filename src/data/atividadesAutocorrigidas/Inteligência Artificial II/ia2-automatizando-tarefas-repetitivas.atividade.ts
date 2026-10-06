import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha } from "../ajudantes";
import { sortear, sorteio } from "../dadosFicticios";

const CATEGORIAS = ["Dúvida", "Reclamação", "Elogio", "Cancelamento", "Segunda via"] as const;
const r = sorteio(5202);
const EMAILS = Array.from({ length: 30 }, (_, i) => {
  const certa = sortear(r, CATEGORIAS);
  const ia = r() < 0.8 ? certa : sortear(r, CATEGORIAS);
  return [`#${i + 1}`, certa, ia];
});
const acertos = EMAILS.filter((l) => l[1] === l[2]).length;
const erros = EMAILS.length - acertos;
const reais = (c: string) => EMAILS.filter((l) => l[1] === c).length;
const previstos = (c: string) => EMAILS.filter((l) => l[2] === c).length;
const acertoDe = (c: string) => EMAILS.filter((l) => l[1] === c && l[2] === c).length;
const precisao = (c: string) => (previstos(c) ? (acertoDe(c) / previstos(c)) * 100 : 0);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Automatizando Tarefas Repetitivas com IA e Realizando Tarefas Inéditas",
  introducao:
    "Um dia de trabalho de projeto de automação: medir quanto uma IA acerta ao classificar e-mails de atendimento, calcular o tempo e o custo economizados, e desenhar o fluxo de automação com revisão humana. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "Testando a triagem automática de e-mails",
      remetente: "Fernando Aguiar, gerente de atendimento da Telecom Conecta",
      assunto: "A IA classifica bem os e-mails? Vale automatizar?",
      paragrafos: [
        "A equipe de atendimento recebe cerca de 600 e-mails por semana e uma pessoa gasta em média 1 minuto e 30 segundos para ler e classificar cada um (dúvida, reclamação, elogio, cancelamento ou segunda via). Fizemos um teste: uma IA classificou 30 e-mails e um supervisor conferiu a categoria correta de cada um.",
        "Automatizar uma tarefa repetitiva significa ensinar um sistema a executar os passos sem alguém no teclado: um gatilho (chegou um e-mail), uma ação (classificar com IA, encaminhar para a fila certa) e uma conferência (humano revisa o que a IA não tem certeza). Quero saber se a precisão do teste justifica a automação.",
      ],
      entregas: [
        "A taxa de acerto geral e a precisão de cada categoria no teste (etapa 2).",
        "O tempo e o custo economizados por semana (etapa 3).",
        "O desenho do fluxo de automação, com regra de revisão humana, e um prompt de classificação (etapa 4).",
      ],
    }),
    planilha({
      id: "teste-de-classificacao",
      titulo: "Etapa 2 — Planilha: categoria correta x categoria da IA nos 30 e-mails",
      cenario: "Cole a planilha no Excel e crie a coluna Acertou? (=SE(B2=C2;1;0)). Para a precisão de uma categoria: acertos da IA naquela categoria ÷ vezes que a IA a escolheu.",
      colunas: ["E-mail", "Categoria correta (supervisor)", "Categoria escolhida pela IA"],
      linhas: EMAILS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "acertos", rotulo: "Quantidade de e-mails classificados corretamente pela IA", valor: acertos, explicacao: "Linhas em que as duas categorias são iguais.", tolerancia: 0 },
        { id: "taxa", rotulo: "Taxa de acerto geral (%)", valor: (acertos / EMAILS.length) * 100, explicacao: "Acertos ÷ 30 × 100." },
        { id: "erros", rotulo: "Quantidade de e-mails classificados errado", valor: erros, explicacao: "30 menos os acertos.", tolerancia: 0 },
        { id: "reclamacoes-reais", rotulo: "Quantidade de e-mails que realmente eram reclamações", valor: reais("Reclamação"), explicacao: "Linhas com Reclamação na categoria correta.", tolerancia: 0 },
        { id: "reclamacoes-ia", rotulo: "Quantidade de e-mails que a IA classificou como reclamação", valor: previstos("Reclamação"), explicacao: "Linhas com Reclamação na coluna da IA.", tolerancia: 0 },
        { id: "precisao", rotulo: "Precisão da IA na categoria Reclamação (%)", valor: precisao("Reclamação"), explicacao: "Reclamações que a IA acertou ÷ vezes em que a IA escolheu Reclamação × 100." },
        { id: "perdidas", rotulo: "Reclamações reais que a IA deixou escapar para outra categoria", valor: reais("Reclamação") - acertoDe("Reclamação"), explicacao: "Reclamações reais menos as que a IA acertou.", tolerancia: 0 },
      ],
    }),
    calculos({
      id: "economia",
      titulo: "Etapa 3 — Tempo e custo economizados por semana",
      cenario: "A equipe recebe 600 e-mails por semana e gasta 90 segundos para classificar cada um. Com a automação, a IA classifica todos e um humano revisa apenas os 20% de casos mais incertos, gastando 90 segundos em cada revisão. A hora da equipe custa R$ 32,00.",
      instrucao: "Calcule:",
      campos: [
        { id: "horas-antes", rotulo: "Horas por semana gastas hoje na classificação manual", esperado: 15, explicacao: "600 × 90 s = 54.000 s = 15 horas." },
        { id: "horas-depois", rotulo: "Horas por semana com a automação e a revisão de 20% dos e-mails", esperado: 3, explicacao: "120 e-mails revisados × 90 s = 10.800 s = 3 horas." },
        { id: "liberadas", rotulo: "Horas liberadas por semana", esperado: 12, explicacao: "15 − 3 = 12." },
        { id: "valor-mes", rotulo: "Valor mensal do tempo liberado, em 4 semanas (R$)", esperado: 1536, explicacao: "12 h × 4 semanas × R$ 32 = 1.536." },
      ],
    }),
    dissertativa({
      id: "fluxo-de-automacao",
      titulo: "Etapa 4 — Fluxo de automação com revisão humana",
      instrucao: "Escreva o desenho do fluxo e a recomendação ao gerente.",
      deve: [
        "Descreva o fluxo em passos: gatilho, ação da IA, regra de confiança, revisão humana e registro dos resultados.",
        "Diga qual regra você usaria para mandar um e-mail para revisão humana (por exemplo, baixa confiança da IA ou palavras de cancelamento e jurídico) e por que reclamações merecem atenção extra.",
        "Com a taxa de acerto do teste e a economia calculada, recomende se vale automatizar agora, em fase de teste ou não.",
        "Defina como acompanharia a qualidade depois de implantar (amostra semanal conferida por humanos).",
      ],
      chave: /(gatilho|a[cç][aã]o|confian[cç]a|revis[aã]o|humano|taxa de acerto|precis[aã]o|amostra|reclama[cç][aã]o|automa)/i,
      minPalavras: 75,
    }),
    dissertativa({
      id: "prompt-de-classificacao",
      titulo: "Etapa 5 — O prompt que faria a classificação",
      cenario: "Você vai pedir à IA que classifique cada e-mail recebido.",
      instrucao: "Escreva o prompt completo, do jeito que seria usado na automação.",
      deve: [
        "Dê um papel à IA (por exemplo, «atue como analista de atendimento»).",
        "Liste as cinco categorias permitidas e proíba respostas fora da lista.",
        "Peça o formato da resposta (por exemplo, uma única linha com a categoria e uma nota de confiança de 0 a 100).",
        "Inclua pelo menos um exemplo de e-mail e a categoria esperada, e uma instrução para quando o e-mail for ambíguo.",
      ],
      chave: /^(?=[\s\S]*(atue como|aja como|voc[eê] [eé]))(?=[\s\S]*(d[uú]vida))(?=[\s\S]*(reclama[cç][aã]o))(?=[\s\S]*(formato|responda|apenas|somente|uma linha))(?=[\s\S]*(exemplo|e-?mail:))[\s\S]*$/i,
      minPalavras: 50,
    }),
  ],
};

export default atividade;
