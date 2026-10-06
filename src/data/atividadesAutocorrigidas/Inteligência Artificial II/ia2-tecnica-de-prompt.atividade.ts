import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";

const PROMPTS = [
  ["P1", "Faça um relatório de vendas.", 0, 0, 1, 0],
  ["P2", "Escreva um e-mail de cobrança para um cliente atrasado.", 0, 1, 2, 0],
  ["P3", "Atue como analista financeiro. Escreva um e-mail de cobrança educado para um cliente com 15 dias de atraso.", 2, 1, 2, 1],
  ["P4", "Atue como analista financeiro. Contexto: cliente com fatura de R$ 3.200 vencida há 15 dias, bom histórico. Escreva um e-mail de cobrança educado de até 120 palavras, com assunto e um prazo de 5 dias para pagamento.", 2, 2, 2, 1],
  ["P5", "Resuma o texto.", 0, 0, 1, 0],
  ["P6", "Você é gerente de RH. Contexto: vamos mudar o horário de trabalho da equipe administrativa de 8h-17h para 9h-18h a partir de 1º de março. Escreva um comunicado em tom acolhedor, em três parágrafos curtos, sem usar jargão, e termine com um canal para dúvidas.", 2, 2, 2, 2],
  ["P7", "Me ajude com planilha.", 0, 0, 0, 0],
  ["P8", "Atue como especialista em Excel. Contexto: tenho a coluna A com datas e a coluna B com valores de vendas. Explique, em passos numerados, como somar os valores de cada mês, usando tabela dinâmica. Responda com no máximo 6 passos.", 2, 2, 2, 1],
];
const nota = (l: (string | number)[]) => (l[2] as number) + (l[3] as number) + (l[4] as number) + (l[5] as number);
const TOTAIS = PROMPTS.map(nota);
const media = (col: number) => somar(PROMPTS.map((l) => l[col] as number)) / PROMPTS.length;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Dominando a Técnica de Prompt",
  introducao:
    "Um dia de trabalho de treinamento de equipe: avaliar 8 prompts com uma rubrica, entender o que separa um pedido vago de um bom prompt, e escrever e melhorar o seu próprio. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A oficina de prompts da empresa",
      remetente: "Rafaela Duarte, coordenadora de treinamento da Grupo Horizonte",
      assunto: "Avaliação dos prompts que a equipe usa hoje",
      paragrafos: [
        "A qualidade da resposta de uma IA depende muito da qualidade do pedido. Um bom prompt costuma ter quatro ingredientes: papel (quem a IA deve ser), contexto (a situação e os dados), tarefa clara (o que fazer) e formato (como entregar: tamanho, tom, estrutura). Chamamos isso de engenharia de prompt.",
        "Reunimos oito prompts reais da equipe e atribuímos nota de 0 a 2 para cada ingrediente: 0 (ausente), 1 (parcial) e 2 (completo). Os prompts são mostrados na tabela. Sua missão: calcular as notas, descobrir o melhor e o pior prompt e depois escrever e melhorar prompts.",
      ],
      entregas: [
        "A pontuação de cada prompt, o ranking e as médias por ingrediente (etapa 2).",
        "Um prompt novo completo, escrito por você, para uma tarefa real (etapa 3).",
        "A reescrita de um prompt fraco e a explicação do que mudou (etapa 4).",
      ],
    }),
    planilha({
      id: "avaliacao-de-prompts",
      titulo: "Etapa 2 — Planilha: 8 prompts avaliados por rubrica",
      cenario: "Cole a planilha no Excel e crie a coluna Total (=soma dos quatro ingredientes, de 0 a 8). Use MÁXIMO, PROCV e MÉDIA.",
      colunas: ["Prompt", "Texto do prompt", "Papel (0-2)", "Contexto (0-2)", "Tarefa clara (0-2)", "Formato (0-2)"],
      linhas: PROMPTS.map((l) => [l[0], l[1], l[2], l[3], l[4], l[5]]),
      instrucao: "Calcule:",
      tarefas: [
        { id: "total-p3", rotulo: "Total de pontos do prompt P3", valor: nota(PROMPTS[2]), explicacao: "Papel 2 + contexto 1 + tarefa clara 2 + formato 1 = 6.", tolerancia: 0 },
        { id: "total-p6", rotulo: "Total de pontos do prompt P6", valor: nota(PROMPTS[5]), explicacao: "Soma dos quatro ingredientes de P6.", tolerancia: 0 },
        { id: "melhor", rotulo: "Maior total entre os 8 prompts", valor: Math.max(...TOTAIS), explicacao: "O maior valor da coluna Total: o prompt que reúne todos os ingredientes.", tolerancia: 0 },
        { id: "zeros", rotulo: "Quantidade de prompts com total igual a zero", valor: TOTAIS.filter((t) => t === 0).length, explicacao: "Prompts sem nenhum ingrediente.", tolerancia: 0 },
        { id: "media-contexto", rotulo: "Média da nota de Contexto entre os 8 prompts", valor: media(3), explicacao: "Soma da coluna Contexto ÷ 8." },
        { id: "media-formato", rotulo: "Média da nota de Formato entre os 8 prompts", valor: media(5), explicacao: "Soma da coluna Formato ÷ 8." },
        { id: "media-total", rotulo: "Média do total de pontos dos 8 prompts", valor: somar(TOTAIS) / TOTAIS.length, explicacao: "Soma dos totais ÷ 8." },
      ],
    }),
    associar({
      id: "ingredientes",
      titulo: "Os ingredientes de um bom prompt",
      instrucao: "Associe cada trecho ao ingrediente que ele representa.",
      opcoes: ["Papel", "Contexto", "Tarefa", "Formato", "Exemplo"],
      linhas: [
        { id: "papel", rotulo: "«Atue como analista financeiro sênior.»", correta: 0 },
        { id: "contexto", rotulo: "«A empresa fatura R$ 2 milhões por mês e tem 40 clientes ativos.»", correta: 1 },
        { id: "tarefa", rotulo: "«Identifique os três clientes com maior risco de inadimplência.»", correta: 2 },
        { id: "formato", rotulo: "«Responda em uma tabela com as colunas cliente, motivo e ação sugerida.»", correta: 3 },
        { id: "exemplo", rotulo: "«Por exemplo: Cliente X — três atrasos seguidos — ligar esta semana.»", correta: 4 },
      ],
      explicacao: "Quanto mais cada ingrediente aparece no pedido, menos a IA precisa adivinhar.",
    }),
    dissertativa({
      id: "seu-prompt",
      titulo: "Etapa 3 — Escreva um prompt completo",
      cenario: "Você precisa preparar uma resposta para um cliente que reclamou de atraso na entrega de um pedido de R$ 1.800,00, feito há 12 dias, e a empresa quer oferecer 10% de desconto no próximo pedido.",
      instrucao: "Escreva o prompt que você daria à IA para produzir essa resposta.",
      deve: [
        "Defina o papel da IA.",
        "Traga o contexto com os dados do caso (valor, prazo, desconto).",
        "Peça a tarefa de forma clara e diga o tom desejado.",
        "Defina o formato da saída (extensão, estrutura, assunto) e uma restrição (por exemplo, não prometer nova data sem confirmação).",
      ],
      chave: /^(?=[\s\S]*(atue como|aja como|voc[eê] [eé]))(?=[\s\S]*(1\.?800|atraso|12 dias))(?=[\s\S]*(10 ?%|desconto))(?=[\s\S]*(formato|no m[aá]ximo|palavras|par[aá]grafos|assunto|tom))[\s\S]*$/i,
      minPalavras: 50,
    }),
    dissertativa({
      id: "melhorar-prompt-fraco",
      titulo: "Etapa 4 — Melhorando um prompt fraco e iterando",
      cenario: "O prompt P7 da tabela diz apenas «Me ajude com planilha.» e a IA devolveu uma resposta genérica.",
      instrucao: "Reescreva o P7 e explique o processo de melhorar um prompt por tentativas.",
      deve: [
        "Escreva a versão melhorada de P7 com papel, contexto, tarefa e formato.",
        "Compare a versão original e a nova, apontando quais ingredientes foram acrescentados e quanto a nota de rubrica subiria.",
        "Explique como você iteraria se a primeira resposta ainda não servisse (pedir ajuste de tom, mais detalhes, exemplos, ou dividir a tarefa em partes).",
        "Cite uma situação em que dar mais contexto não basta e a IA ainda pode errar (cálculo, dado atual, informação que ela não tem), e como você checaria.",
      ],
      chave: /(papel|contexto|tarefa|formato|itera|ajust|vers[aã]o|nota|rubrica|checar|verific|conferir)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
