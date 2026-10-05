import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — A Evolução da Internet e os Tipos de Acesso",
  introducao:
    "De onde a internet veio, qual a diferença entre internet e web e como cada tipo de conexão chega até você. Responda e use \"Corrigir atividade\" para conferir.",
  itens: [
    escolha({
      id: "origem",
      titulo: "O começo de tudo",
      cenario: "A ARPANET, criada nos Estados Unidos em 1969, ligou os primeiros computadores de universidades e centros de pesquisa.",
      instrucao: "O que a ARPANET foi para a internet de hoje?",
      opcoes: [
        "Foi o primeiro navegador de internet.",
        "Foi a rede precursora, que mostrou que computadores distantes podiam trocar dados.",
        "Foi o primeiro site de compras.",
        "Foi uma rede social.",
      ],
      correta: 1,
      explicacao: "A ARPANET é a base histórica da internet: uma rede de pesquisa que provou a troca de dados entre máquinas distantes.",
    }),
    escolha({
      id: "internet-web",
      titulo: "Internet não é o mesmo que web",
      instrucao: "Qual afirmação é correta?",
      opcoes: [
        "Internet e web são exatamente a mesma coisa.",
        "A internet é a rede mundial de computadores; a web (WWW) é um serviço que roda nela, formado por páginas ligadas por links.",
        "A web é a rede física de cabos.",
        "A internet só existe depois que se abre um navegador.",
      ],
      correta: 1,
      explicacao: "E-mail, jogos e aplicativos também usam a internet sem ser «a web». A web foi proposta por Tim Berners-Lee em 1989 e o primeiro site é de 1991.",
    }),
    associar({
      id: "tipos-acesso",
      titulo: "Tipos de acesso à internet",
      instrucao: "Associe cada descrição ao tipo de conexão.",
      opcoes: ["Fibra óptica", "Rede móvel (4G/5G)", "Satélite"],
      linhas: [
        { id: "luz", rotulo: "Transmite dados por pulsos de luz em fios de vidro; muito rápida e estável.", correta: 0 },
        { id: "celular", rotulo: "Chega por antenas de telefonia ao celular ou ao roteador móvel.", correta: 1 },
        { id: "rural", rotulo: "Atende regiões remotas, sem cabo nem antena por perto, mas com maior atraso (latência).", correta: 2 },
      ],
      explicacao: "Cada tecnologia atende uma situação: fibra para velocidade e estabilidade, móvel para mobilidade, satélite para lugares isolados.",
    }),
    calculo({
      id: "tempo-download",
      titulo: "Quanto demora um download",
      cenario: "Um arquivo de 600 MB (megabytes) será baixado em uma conexão de 100 Mbps (megabits por segundo). Lembre: 1 byte tem 8 bits.",
      instrucao: "Em quantos segundos o download termina, em condições ideais?",
      rotulo: "Tempo (segundos)",
      esperado: 48,
      explicacao: "600 MB × 8 = 4.800 megabits; 4.800 ÷ 100 = 48 segundos.",
    }),
    escolha({
      id: "velocidade-qualidade",
      titulo: "Contratar velocidade",
      instrucao: "O que mais influencia a qualidade percebida em chamadas de vídeo, além da velocidade contratada?",
      opcoes: ["A cor do roteador.", "A estabilidade e a baixa latência da conexão.", "O tamanho do monitor.", "O nome da rede Wi-Fi."],
      correta: 1,
      explicacao: "Uma conexão rápida mas instável trava vídeo e voz. Estabilidade e latência pesam tanto quanto os Mbps.",
    }),
    resposta({
      id: "impacto",
      titulo: "A internet no trabalho",
      instrucao: "Explique com suas palavras uma mudança que a internet trouxe para o trabalho em escritório.",
      rotulo: "Sua resposta",
      placeholder: "Ex.: Reuniões por vídeo, e-mail e arquivos na nuvem permitem trabalhar de qualquer lugar...",
    }),
  ],
};

export default atividade;
