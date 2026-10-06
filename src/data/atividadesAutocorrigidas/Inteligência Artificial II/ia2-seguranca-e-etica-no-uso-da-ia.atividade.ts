import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha } from "../ajudantes";

const DADOS = [
  ["Texto do cardápio já publicado no site", "Público"],
  ["Lista de clientes com CPF e telefone", "Pessoal"],
  ["Prontuário de paciente com diagnóstico", "Sensível"],
  ["Minuta de contrato ainda não assinado", "Sigiloso"],
  ["Política de férias do manual do funcionário", "Interno"],
  ["Foto do crachá do funcionário com nome e matrícula", "Pessoal"],
  ["Código-fonte do sistema da empresa", "Sigiloso"],
  ["Comunicado de imprensa já divulgado", "Público"],
  ["Resultado de exame médico de um colaborador", "Sensível"],
  ["Planilha de salários da equipe", "Sigiloso"],
  ["Texto de blog que você mesmo escreveu para publicar", "Público"],
  ["Dados de cartão de crédito de clientes", "Sigiloso"],
  ["Ata da reunião de diretoria sobre aquisição", "Sigiloso"],
  ["Orientação geral de uso do Excel (sem dados da empresa)", "Público"],
  ["Lista de e-mails de clientes", "Pessoal"],
  ["Informação de religião de um funcionário", "Sensível"],
  ["Procedimento operacional padrão não confidencial", "Interno"],
  ["Rascunho de proposta comercial sem preços", "Interno"],
  ["Biometria (impressão digital) dos funcionários", "Sensível"],
  ["Pergunta genérica sobre como escrever um bom e-mail", "Público"],
];
const POLITICA = new Set(["Público"]);
const pode = (l: (string | number)[]) => (POLITICA.has(l[1] as string) ? "Sim" : "Não");
const LINHAS = DADOS.map((l) => [...l]);
const conta = (t: string) => DADOS.filter((l) => l[1] === t).length;
const podem = DADOS.filter((l) => pode(l) === "Sim").length;

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Otimizando sua Rotina com IA: Segurança e Ética no Uso da IA",
  introducao:
    "Um dia de trabalho de proteção de dados: classificar 20 informações do dia a dia pela sensibilidade, decidir o que pode e o que não pode ser colado em uma IA pública e escrever a política de uso responsável da empresa. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O incidente que quase aconteceu",
      remetente: "Dr. Leonardo Fraga, encarregado de proteção de dados (DPO) da Clínica Aurora",
      assunto: "Uma funcionária colou um prontuário em uma IA pública",
      paragrafos: [
        "Na semana passada, uma recepcionista colou em um chatbot público o texto de um prontuário para «pedir ajuda para resumir». O conteúdo tinha nome, diagnóstico e telefone de uma paciente. Ninguém teve má intenção, mas o dado saiu do controle da clínica. Dados de saúde são dados pessoais sensíveis pela Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018), com regras mais rígidas de tratamento.",
        "A política provisória da clínica diz que só informação classificada como pública pode ser colada em uma IA pública. Dados internos, pessoais, sensíveis e sigilosos só podem ser usados com ferramentas aprovadas pela empresa, com contrato e controle de acesso. Preciso que você classifique 20 exemplos e apresente a política de uso responsável.",
      ],
      entregas: [
        "A contagem por nível de sensibilidade e a quantidade de itens que podem ir a uma IA pública (etapa 2).",
        "A classificação dos tipos de risco e de viés (etapa 3).",
        "Uma política de uso responsável, em linguagem simples, para a equipe (etapa 4).",
      ],
    }),
    planilha({
      id: "classificacao-de-dados",
      titulo: "Etapa 2 — Planilha: 20 informações e seu nível de sensibilidade",
      cenario: "Cole a planilha no Excel e use CONT.SE para contar por nível. Crie a coluna Pode ir a IA pública? (=SE(nível=\"Público\";\"Sim\";\"Não\")).",
      colunas: ["Informação", "Nível de sensibilidade"],
      linhas: LINHAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "publicos", rotulo: "Quantidade de itens de nível Público", valor: conta("Público"), explicacao: "Itens que podem ser usados em IA pública.", tolerancia: 0 },
        { id: "pessoais", rotulo: "Quantidade de itens com dados pessoais (nível Pessoal)", valor: conta("Pessoal"), explicacao: "Dados que identificam uma pessoa.", tolerancia: 0 },
        { id: "sensiveis", rotulo: "Quantidade de itens com dados pessoais sensíveis (nível Sensível)", valor: conta("Sensível"), explicacao: "Saúde, religião e biometria são sensíveis pela LGPD.", tolerancia: 0 },
        { id: "sigilosos", rotulo: "Quantidade de itens sigilosos para o negócio", valor: conta("Sigiloso"), explicacao: "Segredos comerciais, código, contratos e dados de pagamento.", tolerancia: 0 },
        { id: "podem", rotulo: "Quantidade de itens que PODEM ser colados em uma IA pública", valor: podem, explicacao: "Só os itens de nível Público.", tolerancia: 0 },
        { id: "nao-podem-pct", rotulo: "Percentual de itens que NÃO podem ser colados em uma IA pública (%)", valor: ((DADOS.length - podem) / DADOS.length) * 100, explicacao: "Itens proibidos ÷ 20 × 100." },
      ],
    }),
    associar({
      id: "riscos-e-vieses",
      titulo: "Etapa 3 — Riscos e vieses no uso de IA",
      instrucao: "Associe cada situação ao problema ético ou de segurança.",
      opcoes: ["Vazamento de dados", "Viés algorítmico", "Alucinação", "Direitos autorais e plágio", "Falta de transparência"],
      linhas: [
        { id: "vazamento", rotulo: "Um funcionário cola uma lista de clientes com CPF em uma IA pública.", correta: 0 },
        { id: "vies", rotulo: "Uma IA de triagem de currículos aprende com o histórico e passa a preferir candidatos de um mesmo perfil.", correta: 1 },
        { id: "alucinacao", rotulo: "A IA cita com segurança uma lei que não existe.", correta: 2 },
        { id: "autoral", rotulo: "A equipe publica uma imagem gerada por IA sem checar se copia o estilo ou o material de um artista.", correta: 3 },
        { id: "transparencia", rotulo: "O cliente recebe a resposta de um robô sem saber que não é uma pessoa.", correta: 4 },
      ],
      explicacao: "Conhecer os riscos é o primeiro passo para criar regras: proteger dados, revisar o que a IA diz, evitar discriminação e ser transparente.",
    }),
    dissertativa({
      id: "politica-de-uso",
      titulo: "Etapa 4 — Política de uso responsável da IA",
      instrucao: "Escreva a política que o DPO enviaria a toda a equipe da clínica.",
      deve: [
        "Use os números da classificação para explicar que a maior parte das informações do dia a dia não pode ir a uma IA pública.",
        "Dê regras práticas: o que nunca colar, como anonimizar quando for possível, que ferramentas aprovadas usar e quem pedir autorização.",
        "Cite a LGPD e explique, em uma frase, o que são dados pessoais sensíveis e por que exigem mais cuidado.",
        "Inclua a regra da revisão humana: nenhuma resposta de IA vai para paciente ou cliente sem ser conferida por uma pessoa responsável.",
        "Diga o que fazer se alguém perceber que colou um dado indevido (avisar o DPO na hora, registrar o incidente).",
      ],
      chave: /(lgpd|dados pessoais|sens[ií]veis|an[oô]nim|revis[aã]o|humana|autoriza|aprovad|incidente|dpo|p[uú]blic)/i,
      minPalavras: 85,
    }),
  ],
};

export default atividade;
