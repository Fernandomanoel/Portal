import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const CONTAS = [
  ["E-mail corporativo", 420, "Não", "Sim"],
  ["Internet banking", 35, "Sim", "Não"],
  ["Sistema de vendas", 210, "Não", "Não"],
  ["Redes sociais da empresa", 600, "Não", "Sim"],
  ["Nuvem de arquivos", 90, "Sim", "Não"],
  ["Site de fornecedor", 365, "Não", "Sim"],
  ["Plataforma de anúncios", 150, "Sim", "Não"],
  ["Folha de pagamento", 28, "Sim", "Não"],
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — A Internet e a Segurança da Informação",
  introducao:
    "Golpes, senhas fracas e links falsos são as principais portas de entrada de problemas. Aprenda a reconhecer riscos e a se proteger. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "phishing",
      titulo: "Reconhecendo um golpe",
      cenario: "Você recebe um e-mail: «Sua conta será bloqueada em 2 horas. Clique aqui e confirme seus dados e senha agora.»",
      instrucao: "Qual é a atitude correta?",
      opcoes: [
        "Clicar rápido para não perder a conta.",
        "Não clicar, desconfiar da urgência e acessar o serviço digitando o endereço oficial no navegador.",
        "Encaminhar o e-mail para os colegas.",
        "Responder enviando a senha por segurança.",
      ],
      correta: 1,
      explicacao: "Urgência e pedido de senha por link são sinais clássicos de phishing. Entre sempre pelo endereço oficial.",
    }),
    associar({
      id: "ameacas",
      titulo: "Ameaças digitais",
      instrucao: "Associe cada descrição à ameaça.",
      opcoes: ["Phishing", "Malware (vírus, trojan)", "Ransomware"],
      linhas: [
        { id: "falsa-mensagem", rotulo: "Mensagem falsa que imita uma empresa para roubar dados.", correta: 0 },
        { id: "programa-malicioso", rotulo: "Programa criado para danificar ou espionar o computador.", correta: 1 },
        { id: "sequestro", rotulo: "Criptografa os arquivos e exige pagamento para devolvê-los.", correta: 2 },
      ],
      explicacao: "Conhecer o tipo da ameaça ajuda a escolher a defesa: atenção, antivírus atualizado e backup.",
    }),
    calculo({
      id: "combinacoes",
      titulo: "Por que senha curta é fraca",
      cenario: "Uma senha só com 4 dígitos numéricos (0 a 9) pode ser testada por um programa em instantes.",
      instrucao: "Quantas combinações diferentes existem para uma senha de 4 dígitos numéricos?",
      rotulo: "Combinações",
      esperado: 10000,
      tolerancia: 0,
      explicacao: "10 possibilidades para cada um dos 4 dígitos: 10⁴ = 10.000. Cada caractere a mais multiplica esse número.",
    }),
    resposta({
      id: "backup-lgpd",
      titulo: "Backup e proteção de dados",
      instrucao: "Explique por que fazer cópias de segurança (backup) e proteger dados pessoais de clientes é importante.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: O backup permite recuperar arquivos após falha ou sequestro, e a LGPD exige proteger dados pessoais...",
      chave: /(backup|c[oó]pia|recuper|perda|lgpd|dados pessoais|privacidade|vazamento|prote)/i,
    }),
    planilha({
      id: "auditoria-contas",
      titulo: "Planilha: auditoria das contas da empresa",
      cenario: "O responsável pela segurança levantou o estado das contas on-line da empresa. Cole a planilha no Excel e use CONT.SE e MÉDIA para resolver.",
      colunas: ["Conta", "Dias desde a última troca de senha", "Verificação em duas etapas", "Senha repetida em outro serviço"],
      linhas: CONTAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "sem-2fa", rotulo: "Quantidade de contas SEM verificação em duas etapas", valor: CONTAS.filter((l) => l[2] === "Não").length, explicacao: "Conte as linhas com Não na coluna de verificação em duas etapas.", tolerancia: 0 },
        { id: "media-dias", rotulo: "Média de dias desde a troca de senha", valor: somar(CONTAS.map((l) => l[1] as number)) / CONTAS.length, explicacao: "Soma dos dias ÷ 8 contas." },
        { id: "repetidas", rotulo: "Percentual de contas com senha repetida (%)", valor: (CONTAS.filter((l) => l[3] === "Sim").length / CONTAS.length) * 100, explicacao: "4 contas com senha repetida ÷ 8 × 100 = 50%." },
        { id: "criticas", rotulo: "Contas sem verificação em duas etapas E com senha repetida", valor: CONTAS.filter((l) => l[2] === "Não" && l[3] === "Sim").length, explicacao: "Essas são as mais expostas: nenhuma segunda barreira e uma senha que pode ter vazado em outro lugar.", tolerancia: 0 },
      ],
    }),
    dissertativa({
      id: "plano-de-correcao",
      titulo: "Plano de correção",
      instrucao: "Escreva o plano que você apresentaria à diretoria para corrigir os problemas encontrados na auditoria.",
      deve: [
        "Diga quais contas corrigiria primeiro e por quê.",
        "Explique as medidas: senhas únicas e fortes, gerenciador de senhas, verificação em duas etapas.",
        "Descreva como treinaria a equipe a reconhecer um e-mail de phishing.",
      ],
      chave: /(senha|duas etapas|2fa|phishing|treina|prioridade|banc|gerenciador)/i,
    }),
  ],
};

export default atividade;
