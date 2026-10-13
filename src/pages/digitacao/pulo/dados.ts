/**
 * Pulo das Palavras: corrida infinita à la Banana Kong e Zombie Tsunami. O Bit,
 * um robozinho, foge de uma onda de erros pulando de chip em chip pela placa de
 * circuito. Digitar a palavra do próximo chip faz o Bit pular e afasta a onda
 * (palavras maiores dão mais folga); parado, a onda alcança o Bit e custa uma
 * vida. Às vezes um vírus ocupa o próximo chip, e é preciso digitar o nome dele
 * antes. Moedas no ar rendem pontos, e acertar em sequência aumenta o combo.
 *
 * O caminho é sorteado a cada partida. Acrescentar um nível é acrescentar um
 * objeto aqui.
 */

export interface NivelPulo {
  nome: string;
  dica: string;
  palavras: string[];
  /** Chips até a chegada. */
  chips: number;
  /** Folga máxima, em segundos, entre o Bit e a onda. */
  margem: number;
  /** Segundos de folga que a onda come por segundo: quanto maior, mais rápida. */
  onda: number;
  /** Chance (0 a 1) de um vírus aparecer num chip. */
  chanceVirus: number;
}

export const VIDAS = 3;

export const VIRUS = ["bug", "spam", "worm", "trojan", "malware", "spyware", "adware", "hacker", "golpe", "ransomware", "phishing"];

export const NIVEIS: NivelPulo[] = [
  {
    nome: "Primeiros pulos",
    dica: "Palavras curtas para pegar o jeito.",
    palavras: ["bit", "byte", "chip", "cabo", "rede", "tela", "som", "luz", "led", "fio", "ram", "cpu", "usb", "app", "web"],
    chips: 8,
    margem: 9,
    onda: 0.6,
    chanceVirus: 0,
  },
  {
    nome: "Na placa",
    dica: "Palavras de quatro e cinco letras.",
    palavras: ["mouse", "tecla", "porta", "disco", "placa", "fonte", "cooler", "pasta", "senha", "nuvem", "dados", "menu", "botão"],
    chips: 10,
    margem: 8,
    onda: 0.75,
    chanceVirus: 0,
  },
  {
    nome: "Primeiro vírus",
    dica: "Vírus no caminho: digite o nome dele primeiro.",
    palavras: ["memória", "teclado", "monitor", "arquivo", "janela", "conexão", "sistema", "backup", "servidor", "imagem", "vídeo"],
    chips: 10,
    margem: 8,
    onda: 0.85,
    chanceVirus: 0.2,
  },
  {
    nome: "Circuito rápido",
    dica: "A onda corre mais: não pare de digitar.",
    palavras: ["processador", "impressora", "navegador", "planilha", "documento", "download", "instalar", "atualizar", "programa", "internet"],
    chips: 12,
    margem: 7,
    onda: 1,
    chanceVirus: 0.3,
  },
  {
    nome: "Maiúsculas",
    dica: "Nomes próprios: Shift com a outra mão.",
    palavras: ["Windows", "Linux", "Android", "Excel", "Word", "Python", "Google", "Chrome", "Canva", "Brasil", "Microlins"],
    chips: 12,
    margem: 7,
    onda: 1.1,
    chanceVirus: 0.3,
  },
  {
    nome: "Acentos",
    dica: "Acento primeiro, letra depois.",
    palavras: ["função", "código", "gráfico", "fórmula", "página", "usuário", "variável", "técnico", "lógica", "módulo", "parágrafo", "relatório"],
    chips: 12,
    margem: 7,
    onda: 1.2,
    chanceVirus: 0.35,
  },
  {
    nome: "Palavras longas",
    dica: "Palavras longas dão mais folga, mas pedem ritmo.",
    palavras: ["configurações", "criptografia", "armazenamento", "computador", "programação", "privacidade", "apresentação", "antivírus", "dispositivo"],
    chips: 12,
    margem: 8,
    onda: 1.3,
    chanceVirus: 0.4,
  },
  {
    nome: "Fuga final",
    dica: "Tudo misturado, onda veloz e muitos vírus.",
    palavras: [
      "processador", "memória", "Windows", "fórmula", "criptografia", "navegador", "Python", "relatório", "dispositivo",
      "armazenamento", "variável", "Microlins", "programação", "impressora", "teclado", "servidor",
    ],
    chips: 16,
    margem: 6,
    onda: 1.6,
    chanceVirus: 0.5,
  },
];
