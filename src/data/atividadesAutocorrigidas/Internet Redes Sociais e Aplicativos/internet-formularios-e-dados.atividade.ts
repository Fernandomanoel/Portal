import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

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
    escolha({
      id: "planilha-vinculada",
      titulo: "Respostas na planilha",
      instrucao: "Qual é a vantagem de vincular o formulário a uma planilha?",
      opcoes: [
        "As respostas chegam organizadas em linhas e colunas, prontas para filtros, fórmulas e gráficos.",
        "O formulário passa a funcionar sem internet.",
        "Os participantes veem as respostas dos outros.",
        "Não há vantagem.",
      ],
      correta: 0,
      explicacao: "Cada resposta vira uma linha na planilha, o que facilita análise e compartilhamento.",
    }),
    resposta({
      id: "montar-pesquisa",
      titulo: "Monte uma pesquisa",
      instrucao: "Escreva três perguntas para uma pesquisa de satisfação com os clientes de uma loja e diga o tipo de cada uma.",
      rotulo: "Suas perguntas",
      placeholder: "1) De 1 a 5, como avalia o atendimento? (escala linear) 2) ...",
      minPalavras: 12,
    }),
  ],
};

export default atividade;
