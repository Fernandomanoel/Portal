import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const APPS = [
  ["Vídeos curtos", 6.4],
  ["Mensagens", 1.1],
  ["Mapas e entregas", 0.9],
  ["Streaming de música", 2.8],
  ["Redes sociais", 4.6],
  ["Banco e pagamentos", 0.2],
];
const SEMANA = somar(APPS.map((l) => l[1] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Aplicativos para Dispositivos Móveis",
  introducao:
    "O celular virou ferramenta de trabalho. Veja como escolher aplicativos com segurança, controlar o consumo de dados e usar apps de produtividade. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
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
    resposta({
      id: "app-trabalho",
      titulo: "Aplicativos no trabalho",
      instrucao: "Cite dois tipos de aplicativo móvel úteis na rotina de trabalho e diga para que cada um serve.",
      rotulo: "Sua resposta",
      placeholder: "Ex.: Aplicativo de mensagens corporativas para falar com a equipe; aplicativo de agenda para...",
    }),
    planilha({
      id: "consumo-dados",
      titulo: "Planilha: consumo de dados móveis por aplicativo na semana",
      cenario: "A equipe de vendas externa usa o celular da empresa, que tem plano de 25 GB por mês. O consumo médio de uma semana está abaixo. Cole a planilha no Excel e resolva (considere 4 semanas por mês).",
      colunas: ["Aplicativo", "Consumo semanal (GB)"],
      linhas: APPS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "semana", rotulo: "Consumo total na semana (GB)", valor: SEMANA, explicacao: "Soma da coluna Consumo semanal." },
        { id: "mes", rotulo: "Projeção do consumo em 4 semanas (GB)", valor: SEMANA * 4, explicacao: "Consumo semanal × 4." },
        { id: "excesso", rotulo: "Quantos GB passam do plano de 25 GB no mês", valor: SEMANA * 4 - 25, explicacao: "Projeção mensal menos 25 GB." },
        { id: "peso-videos", rotulo: "Participação dos vídeos curtos no consumo (%)", valor: (6.4 / SEMANA) * 100, explicacao: "6,4 ÷ consumo semanal total × 100." },
      ],
    }),
    dissertativa({
      id: "politica-moveis",
      titulo: "Política de uso do celular corporativo",
      instrucao: "Escreva regras de uso do celular corporativo que resolvam o excesso de consumo e protejam a empresa.",
      deve: [
        "Proponha como reduzir o consumo sem prejudicar o trabalho (Wi-Fi, qualidade de vídeo, downloads).",
        "Inclua regras de segurança: loja oficial, permissões, atualizações, bloqueio de tela.",
        "Diga como acompanharia o consumo mês a mês.",
      ],
      chave: /(wi-?fi|dados|loja oficial|permiss|atualiz|bloqueio|senha|acompanh|consumo)/i,
    }),
  ],
};

export default atividade;
