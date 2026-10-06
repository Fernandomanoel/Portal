import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa } from "../ajudantes";
import { sorteio } from "../dadosFicticios";

const r = sorteio(4404);
const PESSOAS = ["Maria Silva", "João Santos", "Ana Costa", "Pedro Lima", "Carla Dias", "Rui Matos", "Bruna Reis", "Tiago Melo", "Lívia Faria", "Otávio Nunes", "Paula Rocha", "Sérgio Cunha"];
const caixa = (s: string, modo: number) => (modo === 0 ? s : modo === 1 ? s.toUpperCase() : modo === 2 ? ` ${s.toLowerCase()} ` : `${s}  `);
const ID = (n: number) => String(n);
const LINHAS: (string | null)[][] = [];
let id = 1;
for (const pessoa of PESSOAS) {
  const email = `${pessoa.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\./, "")}@exemplo.com`;
  const repeticoes = r() < 0.5 ? 2 : 1;
  for (let k = 0; k < repeticoes; k++) {
    const nome = caixa(pessoa, Math.floor(r() * 4));
    const mail = r() < 0.18 ? null : k === 1 && r() < 0.5 ? email.toUpperCase() : email;
    LINHAS.push([ID(id++), nome, mail, r() < 0.3 ? null : `1199${String(Math.floor(r() * 9000000) + 1000000)}`]);
  }
}
const nulos = LINHAS.filter((l) => l[2] === null).length;
const emails = LINHAS.filter((l) => l[2] !== null).map((l) => l[2] as string);
const distintosBrutos = new Set(emails).size;
const distintosNormalizados = new Set(emails.map((e) => e.trim().toLowerCase())).size;
const nomesBrutos = new Set(LINHAS.map((l) => l[1] as string)).size;
const nomesNormalizados = new Set(LINHAS.map((l) => (l[1] as string).trim().toUpperCase())).size;
const grupos = new Map<string, number>();
for (const e of emails) grupos.set(e.trim().toLowerCase(), (grupos.get(e.trim().toLowerCase()) ?? 0) + 1);
const gruposDuplicados = [...grupos.values()].filter((n) => n > 1).length;
const exibe = LINHAS.map((l) => l.map((c) => (c === null ? "NULL" : c)));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Análise de Dados — Limpeza de Dados em SQL",
  introducao:
    "Um dia de trabalho de saneamento de base: usar SQL para contar nulos, achar duplicados e padronizar texto em uma tabela de cadastro de clientes bagunçada. A tabela vem dentro da atividade: copie para o seu banco, escreva os comandos e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O cadastro que ninguém confia",
      remetente: "Jéssica Albuquerque, gerente de CRM da Rede Bem Viver",
      assunto: "Limpeza do cadastro antes da campanha de aniversário",
      paragrafos: [
        "A campanha de aniversário vai disparar e-mails para os clientes, mas o cadastro tem problemas: e-mails em branco (NULL), mesma pessoa cadastrada duas vezes com o nome escrito de formas diferentes e e-mails em maiúsculas ou com espaços. Se disparar assim, a campanha manda mensagem em dobro e perde clientes.",
        "A tabela clientes_brutos tem id, nome, email e telefone. Os comandos úteis são IS NULL, COUNT, DISTINCT, GROUP BY com HAVING, TRIM, UPPER e LOWER. Os comandos são conferidos por padrão, então escreva em SQL padrão.",
      ],
      entregas: [
        "Quatro verificações: nulos, duplicados, e-mails distintos normalizados e nomes padronizados (etapas 2 a 5).",
        "Um plano de limpeza por escrito, com os riscos de apagar dados (etapa 6).",
      ],
    }),
    consulta({
      id: "nulos",
      titulo: "Etapa 2 — Verificação 1: e-mails em branco",
      cenario: "Quantos cadastros estão sem e-mail?",
      instrucao: "Use COUNT(*) com WHERE email IS NULL.",
      codigo: { rotulo: "Estrutura da tabela", conteudo: "CREATE TABLE clientes_brutos (id INT, nome VARCHAR(60), email VARCHAR(80), telefone VARCHAR(20));" },
      tabelas: [{ nome: `Tabela clientes_brutos (${LINHAS.length} linhas)`, colunas: ["id", "nome", "email", "telefone"], linhas: exibe }],
      comandos: [{ id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+count\s*\([\s\S]*\)[\s\S]+from\s+clientes_brutos[\s\S]+where\s+email\s+is\s+null/i, dica: "Falta o COUNT, o FROM clientes_brutos ou o filtro WHERE email IS NULL." }],
      resultados: [{ id: "valor", rotulo: "Resultado: cadastros sem e-mail", valor: nulos, explicacao: "Linhas com email NULL.", tolerancia: 0 }],
    }),
    consulta({
      id: "distintos",
      titulo: "Etapa 3 — Verificação 2: e-mails distintos, sem e com padronização",
      cenario: "Quantos e-mails diferentes existem? E quantos, se ignorarmos maiúsculas e espaços?",
      instrucao: "Use COUNT(DISTINCT email) e depois COUNT(DISTINCT LOWER(TRIM(email))).",
      tabelas: [],
      comandos: [
        { id: "sql-bruto", rotulo: "Comando dos e-mails distintos como estão", padrao: /select[\s\S]+count\s*\(\s*distinct\s+email\s*\)[\s\S]+from\s+clientes_brutos/i, dica: "Falta o COUNT(DISTINCT email) ou o FROM clientes_brutos." },
        { id: "sql-normalizado", rotulo: "Comando dos e-mails distintos padronizados", padrao: /select[\s\S]+count\s*\(\s*distinct\s+lower\s*\(\s*trim\s*\(\s*email\s*\)\s*\)\s*\)[\s\S]+from\s+clientes_brutos/i, dica: "Use COUNT(DISTINCT LOWER(TRIM(email))) na tabela clientes_brutos." },
      ],
      resultados: [
        { id: "bruto", rotulo: "Resultado: e-mails distintos como estão", valor: distintosBrutos, explicacao: "COUNT(DISTINCT email) ignora NULL e trata maiúsculas diferentes como e-mails diferentes.", tolerancia: 0 },
        { id: "normalizado", rotulo: "Resultado: e-mails distintos depois de padronizar", valor: distintosNormalizados, explicacao: "Depois de LOWER e TRIM, o mesmo e-mail escrito de formas diferentes conta uma vez só.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "duplicados",
      titulo: "Etapa 4 — Verificação 3: e-mails que aparecem mais de uma vez",
      cenario: "Quais e-mails (padronizados) estão em mais de um cadastro?",
      instrucao: "Use GROUP BY LOWER(TRIM(email)) e HAVING COUNT(*) > 1.",
      tabelas: [],
      comandos: [{ id: "sql", rotulo: "Seu comando SQL", padrao: /select[\s\S]+from\s+clientes_brutos[\s\S]+group\s+by[\s\S]+having\s+count\s*\(\s*\*\s*\)\s*>\s*1/i, dica: "Faltam o GROUP BY e o HAVING COUNT(*) > 1." }],
      resultados: [
        { id: "grupos", rotulo: "Resultado: quantidade de e-mails repetidos (linhas que o comando devolve)", valor: gruposDuplicados, explicacao: "Cada linha do resultado é um e-mail com mais de um cadastro.", tolerancia: 0 },
        { id: "a-mais", rotulo: "Cadastros a mais que seriam removidos mantendo um por e-mail", valor: emails.length - distintosNormalizados, explicacao: "E-mails preenchidos menos e-mails distintos padronizados.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "nomes",
      titulo: "Etapa 5 — Verificação 4: padronizando os nomes",
      cenario: "Os nomes aparecem em maiúsculas, minúsculas e com espaços sobrando. Quantos nomes distintos existem antes e depois de padronizar?",
      instrucao: "Compare COUNT(DISTINCT nome) com COUNT(DISTINCT UPPER(TRIM(nome))).",
      tabelas: [],
      comandos: [
        { id: "sql-bruto", rotulo: "Comando dos nomes distintos como estão", padrao: /select[\s\S]+count\s*\(\s*distinct\s+nome\s*\)[\s\S]+from\s+clientes_brutos/i, dica: "Falta o COUNT(DISTINCT nome) ou o FROM clientes_brutos." },
        { id: "sql-padrao", rotulo: "Comando dos nomes distintos padronizados", padrao: /select[\s\S]+count\s*\(\s*distinct\s+(upper\s*\(\s*trim\s*\(\s*nome\s*\)\s*\)|trim\s*\(\s*upper\s*\(\s*nome\s*\)\s*\))\s*\)[\s\S]+from\s+clientes_brutos/i, dica: "Use UPPER e TRIM juntos dentro do COUNT(DISTINCT ...)." },
      ],
      resultados: [
        { id: "bruto", rotulo: "Resultado: nomes distintos como estão", valor: nomesBrutos, explicacao: "Variações de caixa e espaços contam como nomes diferentes.", tolerancia: 0 },
        { id: "padrao", rotulo: "Resultado: nomes distintos padronizados", valor: nomesNormalizados, explicacao: "Depois de TRIM e UPPER, só restam as pessoas realmente diferentes.", tolerancia: 0 },
      ],
    }),
    dissertativa({
      id: "plano-de-limpeza",
      titulo: "Etapa 6 — Plano de limpeza e riscos",
      instrucao: "Escreva o plano de limpeza que você apresentaria à gerente.",
      deve: [
        "Resuma o diagnóstico com os números que o banco devolveu (nulos, duplicados, nomes e e-mails distintos).",
        "Descreva a ordem das operações: copiar a tabela antes (backup), padronizar, detectar duplicados, decidir qual cadastro manter e só então apagar.",
        "Explique o risco de apagar duplicados no automático (homônimos, cadastro com telefone diferente) e como reduzir esse risco.",
        "Proponha uma regra de validação na entrada do cadastro para que o problema não volte (formato do e-mail, restrição de unicidade).",
      ],
      chave: /(backup|duplicad|nulo|trim|lower|upper|padroniz|homônimo|hom[oô]nimo|valida|unicidade|apagar|delete)/i,
      minPalavras: 70,
    }),
  ],
};

export default atividade;
