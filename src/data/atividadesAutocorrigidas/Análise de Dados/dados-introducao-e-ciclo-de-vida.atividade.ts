import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";
import { CIDADES, decimal, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(4101);
const NOMES = ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Rocha", "Elisa Prado", "Fábio Nunes", "Gabriela Melo", "Hugo Alves", "Isabela Cruz", "João Pedro", "Karen Vaz", "Lucas Moraes", "Marina Costa", "Nelson Reis", "Olívia Brito", "Paulo Neves", "Quésia Lopes", "Rafael Teles", "Sofia Duarte", "Tiago Mello", "Úrsula Pinto", "Vítor Gomes", "Wesley Cardoso", "Ximena Rangel", "Yuri Barros", "Zilda Freitas", "Alan Torres", "Bianca Leal", "Caio Matos", "Débora Silva", "Enzo Ramos", "Fernanda Luz", "Gustavo Reis", "Helena Dutra"];
const BASE = NOMES.map((nome, i) => {
  const nota = r() < 0.12 ? "" : decimal(r, 3, 10, 1);
  const idade = r() < 0.09 ? sortear(r, [-1, 0, 150, 212] as const) : inteiro(r, 18, 65);
  return [101 + i, nome, sortear(r, CIDADES), idade, nota];
});
const DUPLICADOS = [BASE[3], BASE[11], BASE[20], BASE[27], BASE[30], BASE[7]].map((l) => [...l]);
const LINHAS = [...BASE, ...DUPLICADOS];
// embaralha de forma determinística para os duplicados não ficarem todos no fim
for (let i = LINHAS.length - 1; i > 0; i--) {
  const j = Math.floor(r() * (i + 1));
  [LINHAS[i], LINHAS[j]] = [LINHAS[j], LINHAS[i]];
}
const UNICAS = BASE;
const sem = UNICAS.filter((l) => l[4] === "");
const idadeInvalida = UNICAS.filter((l) => (l[3] as number) < 16 || (l[3] as number) > 100);
const VALIDAS = UNICAS.filter((l) => l[4] !== "" && !((l[3] as number) < 16 || (l[3] as number) > 100));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Introdução, Estrutura e Ciclo de Vida da Análise de Dados",
  introducao:
    "Um dia de trabalho de analista júnior: receber uma base de pesquisa «suja», limpar, conferir e só então calcular. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A base de pesquisa que chegou do campo",
      remetente: "Dra. Camila Fontes, coordenadora de pesquisa do Instituto Dados & Cidade",
      assunto: "Satisfação com o transporte público — base bruta",
      paragrafos: [
        "O trabalho de análise de dados segue um ciclo: definir a pergunta, coletar, limpar e organizar, analisar, comunicar o resultado e agir. A maior parte do tempo, na prática, vai para a limpeza: dado duplicado, campo vazio e valor impossível mudam a média e levam a conclusões erradas.",
        "A base bruta tem 40 respostas: ID, nome, cidade, idade e nota de satisfação (de 3 a 10). Algumas pessoas responderam duas vezes (mesmo ID repetido), há notas em branco e idades impossíveis (negativas, zero ou acima de 100). Considere válidas as idades entre 16 e 100 anos.",
      ],
      entregas: [
        "O diagnóstico da qualidade da base: duplicados, notas em branco e idades inválidas (etapa 2).",
        "A média da nota na base bruta e na base limpa (etapa 2).",
        "O ciclo de vida aplicado a esta pesquisa e um aviso à coordenadora sobre o que mudou com a limpeza (etapas 3 e 4).",
      ],
    }),
    planilha({
      id: "base-bruta",
      titulo: "Etapa 2 — Planilha: a base bruta com 40 linhas",
      cenario: "Cole a planilha no Excel. Para achar duplicados use a formatação condicional ou =CONT.SE(A:A; A2) > 1; para remover, use Dados > Remover duplicatas pelo ID. Notas em branco aparecem como células vazias.",
      colunas: ["ID", "Nome", "Cidade", "Idade", "Nota (3 a 10)"],
      linhas: LINHAS,
      instrucao: "Faça o diagnóstico e responda:",
      tarefas: [
        { id: "linhas", rotulo: "Total de linhas da base bruta", valor: LINHAS.length, explicacao: "Conte todas as linhas.", tolerancia: 0 },
        { id: "duplicadas", rotulo: "Linhas duplicadas (a mais) que precisam ser removidas", valor: LINHAS.length - UNICAS.length, explicacao: "Linhas totais menos IDs únicos.", tolerancia: 0 },
        { id: "sem-nota", rotulo: "Respondentes únicos sem nota", valor: sem.length, explicacao: "IDs únicos com a nota em branco.", tolerancia: 0 },
        { id: "idade-invalida", rotulo: "Respondentes únicos com idade inválida (menor que 16 ou maior que 100)", valor: idadeInvalida.length, explicacao: "IDs únicos com idade fora do intervalo aceito.", tolerancia: 0 },
        { id: "validas", rotulo: "Respondentes que sobram válidos depois da limpeza completa", valor: VALIDAS.length, explicacao: "Únicos, com nota preenchida e idade válida.", tolerancia: 0 },
        { id: "media-limpa", rotulo: "Média da nota na base limpa", valor: somar(VALIDAS.map((l) => l[4] as number)) / VALIDAS.length, explicacao: "Média das notas dos respondentes válidos." },
        { id: "perda", rotulo: "Percentual da base bruta descartado na limpeza (%)", valor: ((LINHAS.length - VALIDAS.length) / LINHAS.length) * 100, explicacao: "(Linhas brutas − válidas) ÷ linhas brutas × 100." },
      ],
    }),
    associar({
      id: "ciclo-de-vida",
      titulo: "Etapa 3 — O ciclo de vida da análise de dados",
      instrucao: "Associe cada atividade da pesquisa à etapa do ciclo.",
      opcoes: ["Definir a pergunta de negócio", "Coletar os dados", "Limpar e preparar", "Analisar e modelar", "Comunicar resultados", "Agir e monitorar"],
      linhas: [
        { id: "pergunta", rotulo: "Decidir que o objetivo é descobrir quais linhas de ônibus têm pior satisfação.", correta: 0 },
        { id: "coleta", rotulo: "Aplicar o questionário nos terminais e registrar as respostas.", correta: 1 },
        { id: "limpar", rotulo: "Remover as respostas duplicadas e corrigir idades impossíveis.", correta: 2 },
        { id: "analise", rotulo: "Calcular a nota média por cidade e comparar os grupos.", correta: 3 },
        { id: "comunicar", rotulo: "Montar um painel e uma apresentação para a prefeitura.", correta: 4 },
        { id: "agir", rotulo: "Mudar horários das linhas e acompanhar a nota no mês seguinte.", correta: 5 },
      ],
      explicacao: "O ciclo é iterativo: o resultado de uma etapa pode mandar o analista voltar a anterior (novos dados, nova pergunta).",
    }),
    dissertativa({
      id: "aviso-coordenadora",
      titulo: "Etapa 4 — Aviso à coordenadora",
      instrucao: "Escreva a mensagem que explica o que foi feito na base e por que a limpeza importa.",
      deve: [
        "Informe quantas linhas existiam, quantas foram descartadas e por qual motivo (duplicadas, nota em branco, idade inválida).",
        "Explique, com a média calculada, o que a limpeza muda na conclusão e por que não basta «calcular a média de tudo».",
        "Diga como você documentaria cada regra de limpeza para que outra pessoa refaça o mesmo resultado.",
        "Cite uma pergunta que você faria à coordenadora antes de descartar as respostas sem nota (ex.: são todas de um mesmo local de coleta?).",
      ],
      chave: /(duplicad|em branco|nota|idade|limpeza|m[eé]dia|documenta|regra|base)/i,
      minPalavras: 65,
    }),
  ],
};

export default atividade;
