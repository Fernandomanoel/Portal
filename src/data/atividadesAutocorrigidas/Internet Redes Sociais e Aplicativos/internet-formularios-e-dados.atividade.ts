import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const NOTAS = [
  [1, 5, "Manhã"], [2, 4, "Manhã"], [3, 3, "Noite"], [4, 5, "Noite"], [5, 2, "Tarde"],
  [6, 4, "Tarde"], [7, 5, "Manhã"], [8, 4, "Noite"], [9, 1, "Noite"], [10, 5, "Tarde"],
  [11, 4, "Manhã"], [12, 3, "Tarde"], [13, 5, "Noite"], [14, 4, "Manhã"], [15, 2, "Noite"],
];
const todas = NOTAS.map((l) => l[1] as number);
const noite = NOTAS.filter((l) => l[2] === "Noite").map((l) => l[1] as number);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Criando Formulários e Gerenciando Dados",
  introducao:
    "Formulários on-line coletam informações de muita gente de uma vez e as organizam em planilha. Aprenda a escolher o tipo de pergunta e a ler os resultados.",
  itens: [
    associar({
      id: "tipos-pergunta",
      titulo: "O tipo certo de pergunta",
      instrucao: "Escolha o tipo de pergunta mais adequado para cada coleta.",
      opcoes: ["Resposta curta", "Parágrafo", "Múltipla escolha (uma opção)", "Caixas de seleção (várias opções)", "Escala linear"],
      linhas: [
        { id: "nome", rotulo: "Nome completo do participante.", correta: 0 },
        { id: "comentario", rotulo: "Sugestões e comentários livres.", correta: 1 },
        { id: "turno", rotulo: "Em qual turno você estuda? (só uma resposta)", correta: 2 },
        { id: "recursos", rotulo: "Quais recursos você usa? (pode marcar vários)", correta: 3 },
        { id: "nota", rotulo: "De 1 a 5, quanto você recomenda o curso?", correta: 4 },
      ],
      explicacao: "Quanto mais fechada a pergunta, mais fácil é tabular e comparar as respostas.",
    }),
    escolha({
      id: "obrigatoria",
      titulo: "Campos obrigatórios",
      instrucao: "Para que serve marcar uma pergunta como obrigatória?",
      opcoes: [
        "Para deixar o formulário mais bonito.",
        "Para impedir o envio sem resposta nessa pergunta, garantindo os dados essenciais.",
        "Para que a resposta fique pública.",
        "Para que só uma pessoa responda.",
      ],
      correta: 1,
      explicacao: "Use obrigatoriedade só no essencial (nome, e-mail), para não afastar quem responde.",
    }),
    calculos({
      id: "resultados",
      titulo: "Lendo os resultados",
      cenario: "Uma pesquisa de satisfação recebeu 40 respostas: 28 pessoas marcaram «Satisfeito», 8 marcaram «Neutro» e 4 marcaram «Insatisfeito».",
      instrucao: "Calcule o percentual de satisfeitos e de insatisfeitos.",
      campos: [
        { id: "satisfeitos", rotulo: "Satisfeitos (%)", esperado: 70, explicacao: "28 ÷ 40 = 0,70, ou 70%." },
        { id: "insatisfeitos", rotulo: "Insatisfeitos (%)", esperado: 10, explicacao: "4 ÷ 40 = 0,10, ou 10%." },
      ],
    }),
    resposta({
      id: "montar-pesquisa",
      titulo: "Monte uma pesquisa",
      instrucao: "Escreva três perguntas para uma pesquisa de satisfação com os clientes de uma loja e diga o tipo de cada uma.",
      rotulo: "Suas perguntas",
      placeholder: "1) De 1 a 5, como avalia o atendimento? (escala linear) 2) ...",
      minPalavras: 15,
    }),
    planilha({
      id: "respostas-pesquisa",
      titulo: "Planilha: respostas de uma pesquisa de satisfação",
      cenario: "O formulário da escola foi respondido por 15 alunos, e as respostas foram exportadas para uma planilha. A pergunta era: de 1 a 5, quanto você recomenda o curso? Cole a planilha no Excel e use MÉDIA, CONT.SE e CONT.SES.",
      colunas: ["Resposta nº", "Nota (1 a 5)", "Turno"],
      linhas: NOTAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "media", rotulo: "Nota média (2 casas decimais)", valor: somar(todas) / todas.length, explicacao: "Soma das notas ÷ 15 respostas." },
        { id: "satisfeitos", rotulo: "Percentual de notas 4 ou 5 (%)", valor: (todas.filter((n) => n >= 4).length / todas.length) * 100, explicacao: "Quantidade de notas 4 e 5 ÷ 15 × 100." },
        { id: "nota-cinco", rotulo: "Quantidade de notas 5", valor: todas.filter((n) => n === 5).length, explicacao: "Conte as notas iguais a 5.", tolerancia: 0 },
        { id: "media-noite", rotulo: "Nota média do turno da Noite", valor: somar(noite) / noite.length, explicacao: "Média apenas das respostas do turno Noite." },
      ],
    }),
    dissertativa({
      id: "melhorar-formulario",
      titulo: "Melhorando a pesquisa",
      instrucao: "Com os resultados da planilha, escreva um relatório curto para a coordenação e proponha como melhorar a própria pesquisa.",
      deve: [
        "Resuma a satisfação geral e compare o turno da Noite com a média.",
        "Aponte um limite desta pesquisa (só nota, sem pergunta aberta, poucos respondentes).",
        "Sugira duas novas perguntas e o tipo de cada uma (escala, múltipla escolha, parágrafo).",
      ],
      chave: /(m[eé]dia|satisfa|noite|pergunta|escala|aberta|respondente|amostra)/i,
    }),
  ],
};

export default atividade;
