import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-defesa-cibernetica.html, sem cortes. As regras de
// correção (mínimo de palavras, palavras-chave, resposta certa) são as mesmas da página antiga.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Segurança na Era Digital e Defesa Cibernética",
  introducao: "Aprenda a se proteger contra clonagem de contas, aplicar a regra de backup 3-2-1, configurar autenticação de dois fatores e gerenciar vazamentos de dados na era digital. Validação automática das respostas.",
  itens: [
    {
      id: "engenharia-social-e-golpe-da-clonagem-de-mensage",
      titulo: "Engenharia Social e Golpe da Clonagem de Mensagens (SIM Swapping)",
      cenario: "Cenário: Um conhecido envia uma mensagem dizendo que precisa com urgência de um PIX para pagar uma conta e pede para você não ligar. A foto de perfil é dele, mas o número é diferente. Questão 1: Qual é a conduta mais segura antes de realizar qualquer transferência?",
      campos: [
        {
          id: "seg1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Fazer o PIX imediatamente para ajudar o amigo, pois a foto de perfil comprova a identidade.",
              "Realizar uma ligação direta (ou de vídeo) para o número antigo do amigo para confirmar verbalmente a veracidade do pedido.",
              "Enviar um comprovante falso de pagamento para testar a reação da pessoa.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Sempre confirme solicitações de dinheiro por ligação antes de fazer qualquer PIX.",
          mensagemErrada: "Incorreto. A conduta correta é verificar por chamada direta para evitar o golpe da clonagem.",
        },
      ],
    },
    {
      id: "estrategia-de-backup-e-mitigacao-de-ransomware",
      titulo: "Estratégia de Backup e Mitigação de Ransomware",
      cenario: "Desafio de Proteção: Explique o funcionamento da Regra de Backup 3-2-1 e por que ter uma cópia off-line (desconectada) garante a recuperação em caso de ataque por vírus sequestrador (Ransomware).",
      campos: [
        {
          id: "seg2-backup",
          rotulo: "O que significa a Regra 3-2-1 de Backup?",
          placeholder: "Ex: 3 cópias dos dados, 2 mídias diferentes, 1 cópia fora do local físico (nuvem/off-line)...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
        {
          id: "seg2-offline",
          rotulo: "Importância do Backup Off-line (Air-Gapped):",
          placeholder: "Ex: Impede que o ransomware criptografe o backup, pois a mídia está fisicamente desconectada da rede...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
      ],
    },
    {
      id: "niveis-de-seguranca-na-autenticacao-de-dois-fato",
      titulo: "Níveis de Segurança na Autenticação de Dois Fatores",
      cenario: "Associe o método de verificação ao seu respectivo nível de segurança cibernética:",
      campos: [
        {
          id: "seg3-m1",
          rotulo: "Código enviado via SMS por mensagem de celular.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "moderado",
                texto: "Segurança Moderada / Baixa (Vulnerável a SIM Swapping / Clonagem de CHIP)",
              },
              {
                valor: "alta",
                texto: "Segurança Altíssima (Resistente a ataques de rede)",
              },
            ],
            esperado: "moderado",
          },
          mensagemCerta: "Perfeito! SMS é vulnerável a trocas de chip (SIM Swapping), enquanto Apps TOTP/Chaves Físicas oferecem altíssima proteção.",
          mensagemErrada: "Incorreto. SMS é vulnerável a trocas de SIM e Apps Autenticadores/Chaves são muito mais seguros.",
        },
        {
          id: "seg3-m2",
          rotulo: "Aplicativo Autenticador (TOTP como Google/Microsoft Authenticator) ou Chave Física de Segurança (YubiKey).",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "moderado",
                texto: "Segurança Moderada / Baixa (Vulnerável a SIM Swapping / Clonagem de CHIP)",
              },
              {
                valor: "alta",
                texto: "Segurança Altíssima (Resistente a ataques de rede)",
              },
            ],
            esperado: "alta",
          },
          mensagemCerta: "Perfeito! SMS é vulnerável a trocas de chip (SIM Swapping), enquanto Apps TOTP/Chaves Físicas oferecem altíssima proteção.",
          mensagemErrada: "Incorreto. SMS é vulnerável a trocas de SIM e Apps Autenticadores/Chaves são muito mais seguros.",
        },
      ],
    },
    {
      id: "gestao-de-incidentes-resposta-a-vazamento-de-cre",
      titulo: "Gestão de Incidentes: Resposta a Vazamento de Credenciais",
      cenario: "Cenário de Análise: Você descobriu que o serviço de um site onde possui cadastro sofreu um mega vazamento de dados contendo senhas criptografadas. Se você reutilizava essa mesma senha em outros serviços (e-mail, redes sociais, bancos), quais passos imediatos devem ser tomados?",
      campos: [
        {
          id: "seg4-vazamento",
          placeholder: "Descreva os passos (ex: trocar a senha em todos os serviços onde era reutilizada, ativar 2FA via app e utilizar um gerenciador de senhas para criar senhas únicas)...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /trocar|senha|gerenciador|única|2fa|autenticaç|serviço|alterar|alteraç/i,
          },
          mensagemErrada: "Explique a necessidade de trocar senhas reutilizadas, ativar 2FA ou usar senhas únicas.",
        },
      ],
    },
    {
      id: "criptografia-na-web-https-tls-e-protecao-de-dado",
      titulo: "Criptografia na Web (HTTPS / TLS) e Proteção de Dados",
      cenario: "Estudo de Caso Final: Explique qual é a função do protocolo HTTPS / SSL-TLS ao navegar na web e por que inserir senhas ou dados bancários em um site que exibe apenas HTTP (sem o cadeado de segurança) coloca seus dados em risco extremo.",
      campos: [
        {
          id: "seg5-https",
          placeholder: "Explique como o HTTPS criptografa o tráfego entre o navegador e o servidor, impedindo que terceiros na rede interceptem as informações...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /criptograf|tráfego|intercept|seguranç|cadeado|servidor|dados|proteg|conexã/i,
          },
          mensagemErrada: "Mencione termos como criptografia, tráfego de dados, interceptação de senhas ou cadeado de segurança.",
        },
      ],
    },
  ],
};

export default atividade;

