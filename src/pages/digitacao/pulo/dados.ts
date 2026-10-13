/**
 * Pulo das Palavras: o Bit, um robozinho, atravessa a placa de circuito
 * pulando de chip em chip. Digitar a palavra do próximo chip faz o Bit pular;
 * o chip onde ele está começa a falhar e cai se a pessoa demorar. Às vezes um
 * vírus ocupa o próximo chip, e é preciso digitar o nome dele antes.
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
  /** Segundos até o chip debaixo do Bit cair. */
  falha: number;
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
    falha: 7,
    chanceVirus: 0,
  },
  {
    nome: "Na placa",
    dica: "Palavras de quatro e cinco letras.",
    palavras: ["mouse", "tecla", "porta", "disco", "placa", "fonte", "cooler", "pasta", "senha", "nuvem", "dados", "menu", "botão"],
    chips: 10,
    falha: 6.5,
    chanceVirus: 0,
  },
  {
    nome: "Primeiro vírus",
    dica: "Vírus no caminho: digite o nome dele primeiro.",
    palavras: ["memória", "teclado", "monitor", "arquivo", "janela", "conexão", "sistema", "backup", "servidor", "imagem", "vídeo"],
    chips: 10,
    falha: 6.5,
    chanceVirus: 0.2,
  },
  {
    nome: "Circuito rápido",
    dica: "Os chips falham mais rápido.",
    palavras: ["processador", "impressora", "navegador", "planilha", "documento", "download", "instalar", "atualizar", "programa", "internet"],
    chips: 12,
    falha: 6,
    chanceVirus: 0.3,
  },
  {
    nome: "Maiúsculas",
    dica: "Nomes próprios: Shift com a outra mão.",
    palavras: ["Windows", "Linux", "Android", "Excel", "Word", "Python", "Google", "Chrome", "Canva", "Brasil", "Microlins"],
    chips: 12,
    falha: 6,
    chanceVirus: 0.3,
  },
  {
    nome: "Acentos",
    dica: "Acento primeiro, letra depois.",
    palavras: ["função", "código", "gráfico", "fórmula", "página", "usuário", "variável", "técnico", "lógica", "módulo", "parágrafo", "relatório"],
    chips: 12,
    falha: 6.5,
    chanceVirus: 0.35,
  },
  {
    nome: "Palavras longas",
    dica: "Respire: uma letra de cada vez.",
    palavras: ["configurações", "criptografia", "armazenamento", "computador", "programação", "privacidade", "apresentação", "antivírus", "dispositivo"],
    chips: 12,
    falha: 7.5,
    chanceVirus: 0.4,
  },
  {
    nome: "Fuga final",
    dica: "Tudo misturado, chips falhando rápido e muitos vírus.",
    palavras: [
      "processador", "memória", "Windows", "fórmula", "criptografia", "navegador", "Python", "relatório", "dispositivo",
      "armazenamento", "variável", "Microlins", "programação", "impressora", "teclado", "servidor",
    ],
    chips: 16,
    falha: 6,
    chanceVirus: 0.5,
  },
];
