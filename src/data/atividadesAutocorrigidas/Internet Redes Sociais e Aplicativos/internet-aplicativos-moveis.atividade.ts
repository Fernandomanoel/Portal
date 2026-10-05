import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Aplicativos para Dispositivos Móveis",
  introducao:
    "O celular virou ferramenta de trabalho. Veja como escolher aplicativos com segurança, controlar o consumo de dados e usar apps de produtividade.",
  itens: [
    escolha({
      id: "loja-oficial",
      titulo: "De onde instalar",
      instrucao: "Qual é a fonte mais segura para instalar um aplicativo?",
      opcoes: [
        "Um link recebido por mensagem.",
        "A loja oficial do sistema (Google Play ou App Store), conferindo o desenvolvedor.",
        "Um site desconhecido que oferece o app «de graça e sem limites».",
        "Um arquivo enviado por um desconhecido.",
      ],
      correta: 1,
      explicacao: "Lojas oficiais analisam os apps, o que reduz — mas não zera — o risco. Confira sempre o desenvolvedor e as avaliações.",
    }),
    associar({
      id: "permissoes",
      titulo: "Permissões que fazem sentido",
      instrucao: "Marque se a permissão pedida é coerente com o aplicativo.",
      opcoes: ["Faz sentido", "Suspeito"],
      linhas: [
        { id: "lanterna-contatos", rotulo: "Um aplicativo de lanterna pedindo acesso aos seus contatos e mensagens.", correta: 1 },
        { id: "mapa-localizacao", rotulo: "Um aplicativo de mapas pedindo sua localização.", correta: 0 },
        { id: "camera-foto", rotulo: "Um aplicativo de scanner de documentos pedindo acesso à câmera.", correta: 0 },
        { id: "calculadora-microfone", rotulo: "Uma calculadora pedindo acesso ao microfone.", correta: 1 },
      ],
      explicacao: "A permissão deve combinar com a função do app. Pedidos sem relação são sinal de alerta.",
    }),
    calculos({
      id: "plano-dados",
      titulo: "Consumo do pacote de dados",
      cenario: "O plano oferece 10 GB por mês. O consumo médio é de 2,5 GB por semana (considere o mês com 4 semanas).",
      instrucao: "Calcule o consumo mensal e quanto sobra, ou falta, no fim do mês.",
      campos: [
        { id: "consumo", rotulo: "Consumo no mês (GB)", esperado: 10, explicacao: "2,5 × 4 = 10 GB." },
        { id: "sobra", rotulo: "Sobra no mês (GB)", esperado: 0, tolerancia: 0, explicacao: "10 − 10 = 0: o pacote termina junto com o mês, sem folga." },
      ],
    }),
    escolha({
      id: "wifi",
      titulo: "Economizando dados",
      instrucao: "Qual hábito mais reduz o consumo do plano de dados móveis?",
      opcoes: [
        "Atualizar apps e baixar vídeos usando só a rede Wi-Fi.",
        "Deixar o vídeo em qualidade máxima o tempo todo.",
        "Manter a reprodução automática de vídeos ligada.",
        "Fazer backup de fotos pelo plano de dados.",
      ],
      correta: 0,
      explicacao: "Atualizações, downloads e backups pesados devem ocorrer no Wi-Fi.",
    }),
    escolha({
      id: "atualizar",
      titulo: "Manter tudo atualizado",
      instrucao: "Por que atualizar o sistema e os aplicativos do celular?",
      opcoes: [
        "Só para mudar a aparência.",
        "Para corrigir falhas de segurança e ganhar melhorias.",
        "Para gastar mais bateria.",
        "Não há motivo.",
      ],
      correta: 1,
      explicacao: "Muitas atualizações corrigem vulnerabilidades já exploradas por golpistas.",
    }),
    resposta({
      id: "app-trabalho",
      titulo: "Aplicativos no trabalho",
      instrucao: "Cite dois tipos de aplicativo móvel úteis na rotina de trabalho e diga para que cada um serve.",
      rotulo: "Sua resposta",
      placeholder: "Ex.: Aplicativo de mensagens corporativas para falar com a equipe; aplicativo de agenda para...",
    }),
  ],
};

export default atividade;
