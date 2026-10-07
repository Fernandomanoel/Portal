import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa } from "../ajudantes";
import { codigoDataFrame, guiaPython } from "../guiasLinguagens";

const ALUNOS = [
  [1, "Ana", 17, 8.5],
  [2, "Bruno", 19, 6.0],
  [3, "Carla", 18, 9.0],
  [4, "Diego", 20, 7.5],
  [5, "Elisa", 17, 5.5],
  [6, "Fábio", 21, 8.0],
];
const notas = ALUNOS.map((l) => l[3] as number);
const media = notas.reduce((a, b) => a + b, 0) / notas.length;

const atividade: AtividadeAutocorrigida = {
  titulo: "Guia para iniciantes: preparando o ambiente do Python e rodando o primeiro código",
  introducao:
    "Passo a passo ilustrado de quem nunca usou Python: abrir o Google Colab, entender a tela, executar uma célula, carregar dados, ler mensagens de erro e conferir que o ambiente está funcionando. Cada passo mostra onde clicar e explica o porquê. No fim, uma prática curta com os dados de seis alunos.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O que você vai conseguir fazer no fim",
      remetente: "Equipe de ensino do curso de Python",
      assunto: "Antes do primeiro código: prepare o seu ambiente",
      paragrafos: [
        "Muita gente trava no começo não por causa do Python, mas por causa do ambiente: onde digitar, como executar, o que significa aquela mensagem vermelha. Este guia resolve isso com calma, uma imagem por passo, e termina com uma prática curta que confirma que tudo funciona.",
        "Você não precisa saber programar para começar. Se algo não funcionar, leia o passo sobre erros: quase todo problema de iniciante está lá.",
      ],
      entregas: [
        "Um notebook do Colab aberto e funcionando (passos 1 a 3).",
        "Os dados da prática carregados e conferidos (passo 4 e conferência).",
        "Duas consultas simples respondidas com Python e um texto explicando o que você aprendeu.",
      ],
    }),
    ...guiaPython({
      codigo: { rotulo: "Código pronto: cria o DataFrame df com seis alunos", conteudo: codigoDataFrame(["id", "nome", "idade", "nota"], ALUNOS) },
      comandoVerificacao: "df.shape",
      verificacao: { rotulo: "Número de linhas do df (primeiro número de df.shape)", valor: ALUNOS.length },
    }),
    consulta({
      id: "pratica",
      titulo: "Prática — duas perguntas sobre os alunos",
      cenario: "Com o df carregado, responda usando Python.",
      instrucao: "Use df['nota'].mean() para a média e df['idade'].max() para a maior idade. Escreva o comando e digite o resultado.",
      tabelas: [{ nome: "Os dados que você carregou", colunas: ["id", "nome", "idade", "nota"], linhas: ALUNOS }],
      comandos: [
        { id: "media", rotulo: "Comando da média das notas", padrao: /df\s*\[\s*['"]nota['"]\s*\]\s*\.\s*mean\s*\(\s*\)/, dica: "Use df['nota'].mean()." },
        { id: "maior", rotulo: "Comando da maior idade", padrao: /df\s*\[\s*['"]idade['"]\s*\]\s*\.\s*max\s*\(\s*\)/, dica: "Use df['idade'].max()." },
      ],
      resultados: [
        { id: "r-media", rotulo: "Resultado: média das notas", valor: media, explicacao: "Soma das notas ÷ 6." },
        { id: "r-maior", rotulo: "Resultado: maior idade", valor: 21, explicacao: "O aluno mais velho tem 21 anos.", tolerancia: 0 },
      ],
    }),
    dissertativa({
      id: "o-que-aprendi",
      titulo: "O que você aprendeu",
      instrucao: "Escreva com as suas palavras o que descobriu sobre o ambiente de Python.",
      deve: [
        "Explique o que é uma célula e por que executamos o código por células.",
        "Diga por que o código do Colab roda no computador do Google e o que acontece com os dados quando a sessão fecha.",
        "Descreva como você lê uma mensagem de erro e dê um exemplo de erro que viu ou que aprendeu a reconhecer.",
      ],
      chave: /(c[eé]lula|colab|google|sess[aã]o|erro|[uú]ltima linha|executar|mem[oó]ria)/i,
      minPalavras: 45,
    }),
  ],
};

export default atividade;
