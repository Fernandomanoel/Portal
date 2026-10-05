import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — A Internet e a Segurança da Informação",
  introducao:
    "Golpes, senhas fracas e links falsos são as principais portas de entrada de problemas. Aprenda a reconhecer riscos e a se proteger.",
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
    escolha({
      id: "senha-forte",
      titulo: "Senha forte",
      instrucao: "Qual senha é a mais segura?",
      opcoes: ["123456", "maria1990", "Ceu#Azul!Cafe_47", "senha"],
      correta: 2,
      explicacao: "Senhas longas, com letras maiúsculas e minúsculas, números e símbolos, sem dados pessoais, são difíceis de adivinhar.",
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
    escolha({
      id: "https",
      titulo: "Site seguro",
      instrucao: "O que o cadeado e o «https://» no endereço indicam?",
      opcoes: [
        "Que o site é sempre confiável e livre de golpes.",
        "Que a conexão com o site é criptografada, mas o site ainda precisa ser conferido.",
        "Que o site é do governo.",
        "Que o site não usa cookies.",
      ],
      correta: 1,
      explicacao: "O https protege o trajeto dos dados. Um site falso também pode ter cadeado: confira sempre o endereço.",
    }),
    resposta({
      id: "backup-lgpd",
      titulo: "Backup e proteção de dados",
      instrucao: "Explique por que fazer cópias de segurança (backup) e proteger dados pessoais de clientes é importante.",
      rotulo: "Sua explicação",
      placeholder: "Ex.: O backup permite recuperar arquivos após falha ou sequestro, e a LGPD exige proteger dados pessoais...",
      chave: /(backup|c[oó]pia|recuper|perda|lgpd|dados pessoais|privacidade|vazamento|prote)/i,
    }),
  ],
};

export default atividade;
