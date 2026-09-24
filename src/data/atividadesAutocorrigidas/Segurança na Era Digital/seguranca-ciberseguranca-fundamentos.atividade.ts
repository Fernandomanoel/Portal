import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-ciberseguranca-fundamentos.html, sem cortes. As regras de
// correção (mínimo de palavras, palavras-chave, resposta certa) são as mesmas da página antiga.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Segurança na Era Digital e Cibersegurança",
  introducao: "Aprenda a identificar ameaças digitais, proteger credenciais e responder a incidentes de segurança corporativos e pessoais. Todas as respostas possuem validação em tempo real com bloqueio anti-spam.",
  itens: [
    {
      id: "engenharia-social-e-identificacao-de-phishing",
      titulo: "Engenharia Social e Identificação de Phishing",
      cenario: "Cenário: Você recebeu um e-mail urgente com o assunto \"Sua conta bancária será bloqueada em 2 horas! Atualize seus dados imediatamente\". O e-mail contém um link para recadastramento com o domínio http://bancoseguro-atualizacao-conta.com. Questão 1: Qual é o diagnóstico correto sobre esta mensagem?",
      campos: [
        {
          id: "s1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "É um comunicado legítimo, pois o banco tem obrigação de avisar antes de bloquear a conta.",
              "É um ataque de Phishing/Engenharia Social, caracterizado pelo tom de urgência alarmista e link suspeito fora do site oficial.",
              "É um vírus que se ativa automaticamente apenas abrindo a caixa de entrada, sem precisar clicar no link.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Alertas alarmistas com links externos não oficiais são sinais claros de Phishing.",
          mensagemErrada: "Incorreto. Trata-se de um ataque de Phishing (Engenharia Social).",
        },
      ],
    },
    {
      id: "gestao-de-credenciais-e-autenticacao-de-dois-fat",
      titulo: "Gestão de Credenciais e Autenticação de Dois Fatores (2FA/MFA)",
      cenario: "Desafio de Segurança: Explique quais são os critérios fundamentais para a criação de uma senha forte e segura e por que a ativação da Autenticação em Duas Etapas (2FA) é indispensável hoje em dia.",
      campos: [
        {
          id: "s2-senha",
          rotulo: "Critérios para uma Senha Forte:",
          placeholder: "Ex: Mínimo de 12 caracteres, combinação de maiúsculas, minúsculas, números e símbolos...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
        {
          id: "s2-mfa",
          rotulo: "Importância do 2FA / MFA (Duplo Fator):",
          placeholder: "Ex: Exige um código temporário no celular mesmo se a senha for vazada ou descoberta...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
      ],
    },
    {
      id: "classificacao-de-riscos-em-redes-e-dispositivos",
      titulo: "Classificação de Riscos em Redes e Dispositivos",
      cenario: "Associe o comportamento à sua respectiva classificação de risco para a segurança da informação:",
      campos: [
        {
          id: "s3-r1",
          rotulo: "Acessar o sistema financeiro da empresa usando Wi-Fi público de aeroporto sem VPN.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "alto",
                texto: "Alto Risco (Vulnerável à interceptação de dados / Man-in-the-Middle)",
              },
              {
                valor: "seguro",
                texto: "Prática Segura e Recomendada",
              },
            ],
            esperado: "alto",
          },
          mensagemCerta: "Excelente! Tanto Wi-Fi público sem VPN quanto pendrives desconhecidos representam alto risco de segurança.",
          mensagemErrada: "Incorreto. Ambas as condutas representam alto risco à infraestrutura corporativa.",
        },
        {
          id: "s3-r2",
          rotulo: "Conectar um pendrive desconhecido encontrado no estacionamento no computador da empresa.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "alto",
                texto: "Alto Risco (Possível infecção por Malware / BadUSB)",
              },
              {
                valor: "seguro",
                texto: "Prática Segura e Recomendada",
              },
            ],
            esperado: "alto",
          },
          mensagemCerta: "Excelente! Tanto Wi-Fi público sem VPN quanto pendrives desconhecidos representam alto risco de segurança.",
          mensagemErrada: "Incorreto. Ambas as condutas representam alto risco à infraestrutura corporativa.",
        },
      ],
    },
    {
      id: "resposta-a-incidentes-acao-imediata",
      titulo: "Resposta a Incidentes: Ação Imediata",
      cenario: "Estudo de Caso: Um funcionário percebeu que clicou em um anexo suspeito de e-mail e que arquivos no computador começaram a mudar de extensão sozinhos (suspeita de Ransomware). Escreva os passos de ação imediata que o funcionário deve tomar para conter o incidente.",
      campos: [
        {
          id: "s4-incidente",
          placeholder: "Descreva os passos imediatos (ex: desconectar a máquina da rede/Wi-Fi, avisar a equipe de TI, não desligar o computador abruptamente)...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /desconect|rede|internet|wi-fi|cab|ti|suporte|ransomware|comunic|avisa|isol/i,
          },
          mensagemErrada: "A resposta está legível, mas inclua ações como desconectar da rede/Wi-Fi ou avisar a equipe de TI.",
        },
      ],
    },
    {
      id: "privacidade-de-dados-pessoais-e-lgpd",
      titulo: "Privacidade de Dados Pessoais e LGPD",
      cenario: "Cenário Final: Por que as empresas devem aplicar o princípio do Acesso Mínimo Necessário (Least Privilege) e garantir o consentimento explicito ao coletar dados pessoais de clientes?",
      campos: [
        {
          id: "s5-lgpd",
          placeholder: "Explique como o controle de acesso reduz vazamentos e garante o cumprimento da Lei Geral de Proteção de Dados (LGPD)...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /dado|privacid|lgpd|acesso|vazament|proteç|seguranç|client|consent/i,
          },
          mensagemErrada: "Inclua conceitos como proteção de dados, vazamentos, controle de acesso ou LGPD na resposta.",
        },
      ],
    },
  ],
};

export default atividade;

