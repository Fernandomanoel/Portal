import type { NomeIcone } from "@/components/Icone";
import type { AssuntoGuiado, JogoConceito, TutorialResumo } from "@/types/guiado";

/**
 * Catálogo da seção "Passo a Passo". Adicionar tutorial é criar o
 * `.atividade.ts` em `atividadesAutocorrigidas/PassoAPasso/` (com
 * `passosGuiados`) e acrescentar uma linha em TUTORIAIS — a vitrine monta a
 * prateleira do assunto sozinha. Capa de card e imagem de passo são
 * fornecidas pela equipe depois; sem elas, a tela usa a cor e o ícone do
 * assunto.
 */
export const ASSUNTOS: { id: AssuntoGuiado; nome: string; icone: NomeIcone; acento: string }[] = [
  { id: "windows", nome: "Windows 11", icone: "informatica", acento: "#2f6fdb" },
  { id: "word", nome: "Word", icone: "doc", acento: "#2b5cb8" },
  { id: "excel", nome: "Excel", icone: "planilha", acento: "#1d7a45" },
  { id: "powerpoint", nome: "PowerPoint", icone: "slides", acento: "#c4532a" },
  { id: "ia", nome: "Inteligência Artificial", icone: "robo", acento: "#7c4dd6" },
  { id: "seguranca", nome: "Segurança na Era Digital", icone: "escudo", acento: "#a0680f" },
];

export const TUTORIAIS: TutorialResumo[] = [
  {
    titulo: "Criar pastas e um arquivo",
    descricao: "Criar a pasta AULA WINDOWS, a pasta ARQUIVOS e o arquivo teste.",
    caminho: "PassoAPasso/windows-criar-pastas-e-arquivo",
    assunto: "windows",
  },
  {
    titulo: "Copiar, recortar e colar",
    descricao: "Fazer uma cópia do arquivo teste e depois mudar o arquivo de lugar.",
    caminho: "PassoAPasso/windows-copiar-recortar-colar",
    assunto: "windows",
  },
  {
    titulo: "Mudar o nome e desfazer",
    descricao: "Mudar o nome de um arquivo com F2 e voltar o nome antigo com Ctrl e Z.",
    caminho: "PassoAPasso/windows-mudar-nome-e-desfazer",
    assunto: "windows",
  },
  {
    titulo: "Usar a Lixeira",
    descricao: "Criar uma pasta, mandar para a Lixeira e trazer de volta.",
    caminho: "PassoAPasso/windows-usar-a-lixeira",
    assunto: "windows",
  },
  {
    titulo: "Abrir e fechar uma janela",
    descricao: "Abrir o Explorador de Arquivos, esconder a janela e fechar.",
    caminho: "PassoAPasso/windows-abrir-e-fechar-uma-janela",
    assunto: "windows",
  },
  {
    titulo: "Achar um arquivo com a pesquisa",
    descricao: "Escrever o nome do arquivo no menu Iniciar e abrir o arquivo.",
    caminho: "PassoAPasso/windows-achar-um-arquivo",
    assunto: "windows",
  },
  {
    titulo: "Escrever e salvar no Bloco de Notas",
    descricao: "Escrever uma frase no Bloco de Notas e salvar com Ctrl e S.",
    caminho: "PassoAPasso/windows-escrever-no-bloco-de-notas",
    assunto: "windows",
  },
  {
    titulo: "Aumentar e diminuir o som",
    descricao: "Abrir a barra do som e mudar o volume.",
    caminho: "PassoAPasso/windows-aumentar-e-diminuir-o-som",
    assunto: "windows",
  },
  {
    titulo: "Trocar a tela de fundo",
    descricao: "Escolher outra imagem para o fundo da área de trabalho.",
    caminho: "PassoAPasso/windows-trocar-a-tela-de-fundo",
    assunto: "windows",
  },
  {
    titulo: "Desligar o computador",
    descricao: "Desligar pelo menu Iniciar, do jeito certo.",
    caminho: "PassoAPasso/windows-desligar-o-computador",
    assunto: "windows",
  },
  {
    titulo: "Abrir o Word e escrever seu nome",
    descricao: "Achar o Word, abrir uma folha em branco e digitar seu nome.",
    caminho: "PassoAPasso/word-abrir-e-escrever-seu-nome",
    assunto: "word",
  },
  {
    titulo: "Deixar a letra maior",
    descricao: "Mudar o tamanho da letra do seu nome para 28.",
    caminho: "PassoAPasso/word-letra-maior",
    assunto: "word",
  },
  {
    titulo: "Letra grossa, deitada e com risco",
    descricao: "Usar os botões N, I e S no seu nome.",
    caminho: "PassoAPasso/word-negrito-italico-sublinhado",
    assunto: "word",
  },
  {
    titulo: "Mudar a cor da letra",
    descricao: "Pintar o seu nome de azul.",
    caminho: "PassoAPasso/word-cor-da-letra",
    assunto: "word",
  },
  {
    titulo: "Trocar o tipo de letra",
    descricao: "Escrever o seu nome com outro jeito de letra.",
    caminho: "PassoAPasso/word-tipo-de-letra",
    assunto: "word",
  },
  {
    titulo: "Colocar o nome no meio",
    descricao: "Mudar o nome para o meio e para o lado direito da folha.",
    caminho: "PassoAPasso/word-colocar-no-meio",
    assunto: "word",
  },
  {
    titulo: "Fazer uma lista com bolinhas",
    descricao: "Escrever uma lista de comidas com uma bolinha em cada linha.",
    caminho: "PassoAPasso/word-lista-com-bolinhas",
    assunto: "word",
  },
  {
    titulo: "Salvar o documento",
    descricao: "Guardar o documento com o nome meu-nome.",
    caminho: "PassoAPasso/word-salvar-o-documento",
    assunto: "word",
  },
  {
    titulo: "Abrir um documento salvo",
    descricao: "Abrir de novo o documento meu-nome.",
    caminho: "PassoAPasso/word-abrir-um-documento-salvo",
    assunto: "word",
  },
  {
    titulo: "Imprimir o documento",
    descricao: "Mandar o documento para a impressora.",
    caminho: "PassoAPasso/word-imprimir",
    assunto: "word",
  },
  {
    titulo: "Escrever um número no Excel",
    descricao: "Abrir o Excel, escolher um quadradinho e digitar um número.",
    caminho: "PassoAPasso/excel-escrever-um-numero",
    assunto: "excel",
  },
  {
    titulo: "Fazer uma tabela pequena",
    descricao: "Escrever frutas e quantidades usando Tab e Enter.",
    caminho: "PassoAPasso/excel-fazer-uma-tabela",
    assunto: "excel",
  },
  {
    titulo: "Deixar o título com letra grossa",
    descricao: "Usar o botão N nos títulos da tabela.",
    caminho: "PassoAPasso/excel-negrito-no-titulo",
    assunto: "excel",
  },
  {
    titulo: "Somar com o sinal de mais",
    descricao: "Fazer a conta 7 + 5 com o Excel.",
    caminho: "PassoAPasso/excel-somar",
    assunto: "excel",
  },
  {
    titulo: "Tirar com o sinal de menos",
    descricao: "Fazer a conta 10 − 3 com o Excel.",
    caminho: "PassoAPasso/excel-subtrair",
    assunto: "excel",
  },
  {
    titulo: "Multiplicar com o asterisco",
    descricao: "Fazer a conta 4 × 3 com o sinal *.",
    caminho: "PassoAPasso/excel-multiplicar",
    assunto: "excel",
  },
  {
    titulo: "Dividir com a barra",
    descricao: "Fazer a conta 20 ÷ 4 com o sinal /.",
    caminho: "PassoAPasso/excel-dividir",
    assunto: "excel",
  },
  {
    titulo: "Somar uma coluna com a AutoSoma",
    descricao: "Somar quatro números de uma vez com um botão.",
    caminho: "PassoAPasso/excel-autosoma",
    assunto: "excel",
  },
  {
    titulo: "Calcular a média",
    descricao: "Calcular a média de três notas com a fórmula MÉDIA.",
    caminho: "PassoAPasso/excel-media",
    assunto: "excel",
  },
  {
    titulo: "Usar a fórmula SE",
    descricao: "O Excel escreve Passou ou Estudar mais, conforme a nota.",
    caminho: "PassoAPasso/excel-formula-se",
    assunto: "excel",
  },
  {
    titulo: "Escrever o título do slide",
    descricao: "Abrir o PowerPoint e escrever o título do primeiro slide.",
    caminho: "PassoAPasso/powerpoint-escrever-o-titulo",
    assunto: "powerpoint",
  },
  {
    titulo: "Escrever o subtítulo",
    descricao: "Escrever o seu nome embaixo do título do slide.",
    caminho: "PassoAPasso/powerpoint-escrever-o-subtitulo",
    assunto: "powerpoint",
  },
  {
    titulo: "Criar um slide novo",
    descricao: "Criar o slide 2 e escrever o título dele.",
    caminho: "PassoAPasso/powerpoint-novo-slide",
    assunto: "powerpoint",
  },
  {
    titulo: "Escrever tópicos no slide",
    descricao: "Escrever três comidas, uma em cada linha com bolinha.",
    caminho: "PassoAPasso/powerpoint-escrever-topicos",
    assunto: "powerpoint",
  },
  {
    titulo: "Mudar as cores do slide",
    descricao: "Escolher um modelo de cores na aba Design.",
    caminho: "PassoAPasso/powerpoint-escolher-um-design",
    assunto: "powerpoint",
  },
  {
    titulo: "Colocar um retângulo",
    descricao: "Desenhar um retângulo no slide.",
    caminho: "PassoAPasso/powerpoint-colocar-uma-forma",
    assunto: "powerpoint",
  },
  {
    titulo: "Colocar uma transição",
    descricao: "Fazer o slide aparecer devagar com Esmaecer.",
    caminho: "PassoAPasso/powerpoint-transicao",
    assunto: "powerpoint",
  },
  {
    titulo: "Mudar a ordem dos slides",
    descricao: "Arrastar o último slide para o primeiro lugar.",
    caminho: "PassoAPasso/powerpoint-mudar-a-ordem",
    assunto: "powerpoint",
  },
  {
    titulo: "Apresentar os slides",
    descricao: "Mostrar os slides na tela inteira com F5 e sair com Esc.",
    caminho: "PassoAPasso/powerpoint-apresentar",
    assunto: "powerpoint",
  },
  {
    titulo: "Salvar a apresentação",
    descricao: "Guardar a apresentação com o nome minha-apresentacao.",
    caminho: "PassoAPasso/powerpoint-salvar",
    assunto: "powerpoint",
  },
  {
    titulo: "O que é um programa que conversa",
    descricao: "Quem responde é um programa, não uma pessoa — e ele pode errar.",
    caminho: "PassoAPasso/ia-programa-que-conversa",
    assunto: "ia",
  },
  {
    titulo: "Fazer uma boa pergunta",
    descricao: "Escrever perguntas que a IA entende melhor.",
    caminho: "PassoAPasso/ia-fazer-uma-boa-pergunta",
    assunto: "ia",
  },
  {
    titulo: "Imagens feitas pela IA",
    descricao: "Imagens da IA não são fotos de verdade e podem ter erros.",
    caminho: "PassoAPasso/ia-imagens-feitas-por-ia",
    assunto: "ia",
  },
  {
    titulo: "Fotos e notícias falsas",
    descricao: "O que fazer com uma imagem ou notícia estranha.",
    caminho: "PassoAPasso/ia-noticias-e-fotos-falsas",
    assunto: "ia",
  },
  {
    titulo: "Usar a IA para aprender",
    descricao: "Pedir ajuda para entender, sem copiar a resposta.",
    caminho: "PassoAPasso/ia-usar-para-aprender",
    assunto: "ia",
  },
  {
    titulo: "Posso clicar nesse link?",
    descricao: "Como reconhecer uma mensagem estranha e o que fazer com ela.",
    caminho: "PassoAPasso/seguranca-posso-clicar-nesse-link",
    assunto: "seguranca",
  },
  {
    titulo: "Cuidar da sua senha",
    descricao: "Senha boa, para quem contar e sair do computador.",
    caminho: "PassoAPasso/seguranca-senha",
    assunto: "seguranca",
  },
  {
    titulo: "O que não contar na internet",
    descricao: "Endereço, telefone, escola e foto são só seus.",
    caminho: "PassoAPasso/seguranca-informacoes-pessoais",
    assunto: "seguranca",
  },
  {
    titulo: "Conversar em jogos online",
    descricao: "O que fazer quando um desconhecido manda mensagem.",
    caminho: "PassoAPasso/seguranca-jogos-online",
    assunto: "seguranca",
  },
  {
    titulo: "Quando alguém trata você mal",
    descricao: "Não responder, mostrar para um adulto e bloquear.",
    caminho: "PassoAPasso/seguranca-quando-alguem-trata-mal",
    assunto: "seguranca",
  },
];

export const JOGOS_CONCEITO: JogoConceito[] = [
  {
    slug: "o-que-e-o-mouse",
    titulo: "O que é o Mouse?",
    descricao: "Clique em cada parte do mouse e descubra para que ela serve.",
  },
  {
    slug: "pecas-do-computador",
    titulo: "Peças do Computador",
    descricao: "Descubra o monitor, o gabinete, o teclado e o mouse.",
  },
  {
    slug: "cpu-e-hd",
    titulo: "CPU e HD",
    descricao: "Abra o gabinete e descubra a peça que faz as contas e a que guarda.",
  },
  {
    slug: "peca-ou-programa",
    titulo: "Peça ou Programa?",
    descricao: "Peça você pega com a mão. Programa você só vê na tela.",
  },
  {
    slug: "ligando-o-computador",
    titulo: "Ligando o Computador",
    descricao: "Clique nos passos na ordem certa para ligar o computador.",
  },
];

export function acharAssunto(id: AssuntoGuiado) {
  return ASSUNTOS.find((assunto) => assunto.id === id) ?? ASSUNTOS[0];
}

export function acharTutorial(caminho: string) {
  return TUTORIAIS.find((tutorial) => tutorial.caminho === caminho);
}
