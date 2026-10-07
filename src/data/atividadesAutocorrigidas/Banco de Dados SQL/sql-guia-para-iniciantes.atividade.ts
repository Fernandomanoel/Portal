import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa } from "../ajudantes";
import { guiaSql } from "../guiasLinguagens";

const ALUNOS = [
  [1, "Ana", 17, "Manaus"],
  [2, "Bruno", 19, "Parintins"],
  [3, "Carla", 18, "Manaus"],
  [4, "Diego", 22, "Itacoatiara"],
  [5, "Elisa", 17, "Manaus"],
  [6, "Fabio", 21, "Parintins"],
  [7, "Gabriela", 24, "Manaus"],
  [8, "Hugo", 20, "Itacoatiara"],
];
const manaus = ALUNOS.filter((l) => l[3] === "Manaus");

const atividade: AtividadeAutocorrigida = {
  titulo: "Guia para iniciantes: preparando o ambiente de SQL e fazendo a primeira consulta",
  introducao:
    "Passo a passo ilustrado de quem nunca usou um banco de dados: abrir o ambiente (Google Colab com SQLite, ou XAMPP e MySQL Workbench), criar as tabelas com um código pronto, escrever a primeira consulta e entender mensagens de erro. Cada passo mostra onde clicar e explica o porquê. No fim, uma prática curta com uma tabela de alunos.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O que você vai conseguir fazer no fim",
      remetente: "Equipe de ensino do curso de Banco de Dados",
      assunto: "Antes da primeira consulta: prepare o seu ambiente",
      paragrafos: [
        "Para fazer perguntas a um banco de dados é preciso ter um banco funcionando e dados dentro dele. Este guia mostra duas formas de chegar lá, ambas com imagens: uma sem instalar nada (Google Colab com SQLite) e outra com o programa do curso (XAMPP + MySQL Workbench).",
        "Escolha uma das duas e siga os passos. A tabela da prática é pequena de propósito: o foco é entender o ambiente e a forma de pensar de uma consulta.",
      ],
      entregas: [
        "O banco criado com a tabela alunos (passos do ambiente escolhido).",
        "A conferência de que os dados foram carregados.",
        "Três consultas simples respondidas e um texto explicando o que cada parte do comando faz.",
      ],
    }),
    ...guiaSql({
      tabelas: [{ nome: "alunos", colunas: [{ nome: "id", tipo: "inteiro" }, { nome: "nome", tipo: "texto" }, { nome: "idade", tipo: "inteiro" }, { nome: "cidade", tipo: "texto" }], linhas: ALUNOS }],
      consultaVerificacao: "SELECT COUNT(*) FROM alunos",
      verificacao: { rotulo: "Resultado da consulta de exemplo: linhas da tabela alunos", valor: ALUNOS.length },
    }),
    consulta({
      id: "pratica",
      titulo: "Prática — três perguntas sobre os alunos",
      cenario: "Com a tabela alunos criada, responda usando SQL.",
      instrucao: "Escreva cada comando e digite o resultado que o banco devolveu.",
      tabelas: [{ nome: "Tabela alunos (8 linhas)", colunas: ["id", "nome", "idade", "cidade"], linhas: ALUNOS }],
      comandos: [
        { id: "manaus", rotulo: "Comando: quantos alunos moram em Manaus?", padrao: /select[\s\S]+count\s*\([\s\S]*\)[\s\S]+from\s+alunos[\s\S]+where[\s\S]+cidade\s*=\s*['"]manaus['"]/i, dica: "Use SELECT COUNT(*) FROM alunos WHERE cidade = 'Manaus'." },
        { id: "media", rotulo: "Comando: qual a idade média dos alunos?", padrao: /select[\s\S]+avg\s*\(\s*idade\s*\)[\s\S]+from\s+alunos/i, dica: "Use SELECT AVG(idade) FROM alunos." },
        { id: "mais-velho", rotulo: "Comando: qual a idade do aluno mais velho?", padrao: /select[\s\S]+(max\s*\(\s*idade\s*\)[\s\S]+from\s+alunos|idade[\s\S]+from\s+alunos[\s\S]+order\s+by\s+idade\s+desc[\s\S]+limit\s+1)/i, dica: "Use SELECT MAX(idade) FROM alunos ou ORDER BY idade DESC LIMIT 1." },
      ],
      resultados: [
        { id: "r-manaus", rotulo: "Resultado: alunos de Manaus", valor: manaus.length, explicacao: "Linhas com cidade igual a Manaus.", tolerancia: 0 },
        { id: "r-media", rotulo: "Resultado: idade média", valor: ALUNOS.reduce((a, l) => a + (l[2] as number), 0) / ALUNOS.length, explicacao: "Soma das idades ÷ 8." },
        { id: "r-maior", rotulo: "Resultado: maior idade", valor: 24, explicacao: "A aluna mais velha tem 24 anos.", tolerancia: 0 },
      ],
    }),
    dissertativa({
      id: "o-que-aprendi",
      titulo: "O que você aprendeu",
      instrucao: "Explique, com as suas palavras, como uma consulta SQL funciona.",
      deve: [
        "Explique o que fazem SELECT, FROM e WHERE no comando da primeira pergunta.",
        "Diga por que é preciso criar o banco e as tabelas antes de consultar e o que muda entre o SQLite do Colab e o MySQL.",
        "Descreva um erro que viu ou que aprendeu a reconhecer (tabela inexistente, coluna errada, vírgula faltando) e como o resolveria.",
      ],
      chave: /(select|from|where|banco|tabela|erro|sqlite|mysql|consulta)/i,
      minPalavras: 45,
    }),
  ],
};

export default atividade;
