import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-privacidade-avancada-tor.html, sem cortes. As regras de
// correção (mínimo de palavras, palavras-chave, resposta certa) são as mesmas da página antiga.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Privacidade Avançada, Anonimato e Navegação Tor",
  introducao: "Aprenda os princípios da rede Tor (The Onion Router), criptografia em camadas, segurança operacional (OpSec) e mitos sobre a Dark Web. O sistema valida suas respostas em tempo real com algoritmo anti-spam.",
  itens: [
    {
      id: "arquitetura-e-roteamento-em-cebola-onion-routing",
      titulo: "Arquitetura e Roteamento em Cebola (Onion Routing)",
      cenario: "Questão 1: Como a rede Tor (The Onion Router) garante o anonimato do tráfego do usuário ao navegar entre nós (relays) distribuídos pelo mundo?",
      campos: [
        {
          id: "tor1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Conectando o computador do usuário diretamente ao servidor final por um único túnel simples.",
              "Criptografando os dados em múltiplas camadas e repassando por três nós aleatórios (Entrada, Intermediário e Saída), onde cada nó decodifica apenas a sua própria camada.",
              "Bloqueando fisicamente a placa de rede do computador.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O Tor utiliza criptografia em camadas repassando o tráfego por múltiplos nós.",
          mensagemErrada: "Incorreto. A opção B descreve o Onion Routing.",
        },
      ],
    },
    {
      id: "divisao-da-web-surface-web-deep-web-e-dark-web",
      titulo: "Divisão da Web: Surface Web, Deep Web e Dark Web",
      cenario: "Desafio de Conceituação: Explique a diferença entre Deep Web e Dark Web, e cite qual é a característica técnica dos domínios do tipo .onion acessados via Tor.",
      campos: [
        {
          id: "tor2-camadas",
          rotulo: "Diferença entre Deep Web e Dark Web:",
          placeholder: "Ex: Deep Web são páginas não indexadas (ex: e-mails); Dark Web exige softwares como o Tor...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
        {
          id: "tor2-onion",
          rotulo: "Características dos Serviços Ocultos (.onion):",
          placeholder: "Ex: Domínios criptográficos sem DNS tradicional, mantendo cliente e servidor anônimos...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
      ],
    },
    {
      id: "analise-comparativa-vpn-comercial-vs-navegador-t",
      titulo: "Análise Comparativa: VPN Comercial vs. Navegador Tor",
      cenario: "Associe o cenário à tecnologia mais adequada:",
      campos: [
        {
          id: "tor3-p1",
          rotulo: "Garantir anonimato descentralizado para evitar vigilância sem depender de uma única empresa comercial.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "tor",
                texto: "Rede Tor (Múltiplos nós descentralizados)",
              },
              {
                valor: "vpn",
                texto: "VPN Comercial (Servidor centralizado)",
              },
            ],
            esperado: "tor",
          },
          mensagemCerta: "Excelente! Tor é para anonimato descentralizado e VPN para velocidade/streaming.",
          mensagemErrada: "Incorreto. Tor = anonimato descentralizado; VPN = servidor de alta velocidade.",
        },
        {
          id: "tor3-p2",
          rotulo: "Criptografar todo o tráfego do computador para jogos online e streaming com alta velocidade.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "tor",
                texto: "Rede Tor (Múltiplos nós descentralizados)",
              },
              {
                valor: "vpn",
                texto: "VPN Comercial (Servidor centralizado)",
              },
            ],
            esperado: "vpn",
          },
          mensagemCerta: "Excelente! Tor é para anonimato descentralizado e VPN para velocidade/streaming.",
          mensagemErrada: "Incorreto. Tor = anonimato descentralizado; VPN = servidor de alta velocidade.",
        },
      ],
    },
    {
      id: "seguranca-operacional-opsec-e-erros-de-comportam",
      titulo: "Segurança Operacional (OpSec) e Erros de Comportamento",
      cenario: "Cenário de Análise: Um usuário navega pelo Tor Browser, mas faz login na sua conta pessoal do Google e baixa arquivos PDF abrindo-os fora do navegador. Por que esse comportamento compromete totalmente o anonimato?",
      campos: [
        {
          id: "tor4-opsec",
          placeholder: "Explique como fazer login em contas pessoais ou abrir arquivos expõe a identidade real do usuário...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /identid|login|conta|ip|vazam|pessoal|revela|rastre|quebra|seguranç/i,
          },
          mensagemErrada: "Explique como fazer login em contas pessoais ou abrir arquivos expõe o IP e identidade real.",
        },
      ],
    },
    {
      id: "casos-legitimos-de-uso-do-tor-e-direitos-humanos",
      titulo: "Casos Legítimos de Uso do Tor e Direitos Humanos",
      cenario: "Estudo de Caso Final: Descreva pelo menos dois usos legítimos e éticos da rede Tor (ex: jornalismo investigativo, proteção de ativistas sob censura, denúncia de corrupção/whistleblowing).",
      campos: [
        {
          id: "tor5-etica",
          placeholder: "Discorra sobre a importância do Tor para jornalistas, denunciantes de abusos e cidadãos sob regimes autoritários...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /jornal|denúnci|censura|liberdad|regime|whistleblower|direit|proteç|ativis/i,
          },
          mensagemErrada: "Mencione termos como jornalismo, denúncias, ativismo, censura ou direitos humanos.",
        },
      ],
    },
  ],
};

export default atividade;

