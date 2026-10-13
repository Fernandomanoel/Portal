/**
 * Constelação: cada estrela traz uma palavra e tem o seu próprio tempo. Digitar
 * a palavra acende a estrela, e as acesas vão se ligando numa constelação.
 * Estrela que apaga custa uma vida; o nível também tem um tempo total.
 *
 * As palavras são o vocabulário dos cursos (Windows, Word, Excel, internet,
 * programação). Acrescentar um nível é acrescentar um objeto aqui.
 */

export interface NivelConstelacao {
  nome: string;
  dica: string;
  palavras: string[];
  /** Estrelas acesas para passar de nível. */
  meta: number;
  /** Segundos que cada estrela dura no céu. */
  vidaEstrela: number;
  /** Segundos entre uma estrela e a próxima. */
  intervalo: number;
  maximo: number;
  /** Tempo total do nível, em segundos. */
  tempo: number;
}

export const VIDAS = 3;

export const NIVEIS: NivelConstelacao[] = [
  {
    nome: "Primeiras palavras",
    dica: "Palavras curtas do dia a dia no computador.",
    palavras: ["tela", "mouse", "tecla", "rede", "menu", "site", "aba", "link", "chip", "cabo", "foto", "som", "dado", "nota", "wifi", "app"],
    meta: 10,
    vidaEstrela: 11,
    intervalo: 2.2,
    maximo: 3,
    tempo: 90,
  },
  {
    nome: "Na área de trabalho",
    dica: "Atenção aos acentos: o acento vem antes da letra.",
    palavras: ["pasta", "janela", "ícone", "senha", "email", "vídeo", "áudio", "botão", "barra", "linha", "lixeira", "atalho", "arquivo", "texto"],
    meta: 12,
    vidaEstrela: 11,
    intervalo: 2,
    maximo: 4,
    tempo: 100,
  },
  {
    nome: "Word",
    dica: "As palavras de quem formata um documento.",
    palavras: ["negrito", "itálico", "margem", "parágrafo", "tabela", "página", "cabeçalho", "rodapé", "sublinhado", "alinhar", "fonte", "estilo", "recuo", "imprimir"],
    meta: 12,
    vidaEstrela: 12,
    intervalo: 2,
    maximo: 4,
    tempo: 110,
  },
  {
    nome: "Excel",
    dica: "O vocabulário da planilha.",
    palavras: ["planilha", "fórmula", "gráfico", "soma", "média", "filtro", "coluna", "célula", "intervalo", "função", "classificar", "total", "porcentagem", "pasta"],
    meta: 14,
    vidaEstrela: 11,
    intervalo: 1.9,
    maximo: 4,
    tempo: 110,
  },
  {
    nome: "Windows",
    dica: "Tudo o que aparece no sistema.",
    palavras: ["explorador", "configurações", "desktop", "sistema", "backup", "download", "instalar", "atualizar", "impressora", "usuário", "teclado", "monitor", "memória"],
    meta: 14,
    vidaEstrela: 11,
    intervalo: 1.8,
    maximo: 5,
    tempo: 110,
  },
  {
    nome: "Internet e segurança",
    dica: "Palavras para navegar sem cair em golpe.",
    palavras: ["navegador", "antivírus", "firewall", "phishing", "criptografia", "privacidade", "vírus", "golpe", "nuvem", "servidor", "conexão", "cookie", "perfil", "rede"],
    meta: 14,
    vidaEstrela: 11,
    intervalo: 1.8,
    maximo: 5,
    tempo: 110,
  },
  {
    nome: "Programação",
    dica: "Os primeiros termos de quem programa.",
    palavras: ["variável", "função", "laço", "condição", "algoritmo", "código", "string", "número", "lista", "objeto", "teste", "erro", "classe", "valor"],
    meta: 15,
    vidaEstrela: 10,
    intervalo: 1.7,
    maximo: 5,
    tempo: 110,
  },
  {
    nome: "Nomes próprios",
    dica: "Primeira letra maiúscula: Shift com a outra mão.",
    palavras: ["Windows", "Excel", "Word", "PowerPoint", "Canva", "Python", "Google", "Internet", "Microsoft", "Outlook", "Teams", "Chrome", "Brasil"],
    meta: 14,
    vidaEstrela: 11,
    intervalo: 1.8,
    maximo: 5,
    tempo: 110,
  },
  {
    nome: "Duas palavras",
    dica: "Agora com espaço no meio.",
    palavras: ["salvar arquivo", "nova pasta", "copiar texto", "abrir planilha", "enviar email", "fechar janela", "senha forte", "área de trabalho", "barra de tarefas", "colar imagem"],
    meta: 12,
    vidaEstrela: 13,
    intervalo: 2.2,
    maximo: 4,
    tempo: 120,
  },
  {
    nome: "Céu cheio",
    dica: "Tudo misturado, mais estrelas e menos tempo.",
    palavras: [
      "planilha", "fórmula", "negrito", "parágrafo", "navegador", "antivírus", "variável", "algoritmo", "explorador", "configurações",
      "Windows", "PowerPoint", "Microsoft", "criptografia", "porcentagem", "cabeçalho", "impressora", "atualizar", "condição", "privacidade",
    ],
    meta: 20,
    vidaEstrela: 9,
    intervalo: 1.4,
    maximo: 6,
    tempo: 120,
  },
];
