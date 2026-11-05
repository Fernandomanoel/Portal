import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso apresenta como celulares e tablets são construídos e como se faz o reparo básico: identificar as peças, diagnosticar defeitos comuns, trocar tela, bateria e conectores, e cuidar do sistema e dos dados do cliente, com segurança e ferramentas adequadas.",
  topicos: [
    {
      titulo: "Anatomia de um celular",
      texto: [
        "Um celular tem a placa principal (com o processador, a memória e os circuitos), a tela (display e vidro de toque), a bateria, a câmera, os alto-falantes e microfones, o conector de carga e as antenas. Muitos modelos são colados e vedados, o que exige calor e cuidado para abrir. Cada marca e modelo tem seu desenho.",
      ],
      pontos: ["Nomear os componentes principais.", "Entender por que abrir um modelo vedado exige cuidado."],
    },
    {
      titulo: "Ferramentas e segurança",
      texto: [
        "Ferramentas: chaves de precisão (Phillips, Torx, pentalobe), espátulas plásticas e ventosa para abrir, pinças, estação de calor ou secador, multímetro e pulseira antiestática. Baterias de lítio podem inchar ou pegar fogo se perfuradas ou dobradas: nunca as fure e descarte-as em local apropriado. Tampe e organize os parafusos por etapa.",
      ],
      pontos: ["Listar as ferramentas básicas.", "Descrever os cuidados com baterias de lítio."],
      erros: ["Usar objeto metálico para abrir e rasgar cabos flat.", "Perfurar ou dobrar a bateria."],
    },
    {
      titulo: "Defeitos comuns e diagnóstico",
      texto: [
        "Defeitos frequentes: tela quebrada, não carrega (conector sujo ou danificado, cabo, bateria), bateria que dura pouco, falha de áudio e câmera, contato com água. Em caso de líquido, desligue e abra o quanto antes, sem ligar. O diagnóstico começa pelo mais simples (testar outro cabo e carregador, ver se há sujeira no conector) antes de abrir.",
      ],
      pontos: ["Seguir um roteiro de diagnóstico.", "Explicar o que fazer com um aparelho molhado."],
    },
    {
      titulo: "Trocas de peças básicas",
      texto: [
        "A troca de tela, bateria e conector de carga são os serviços mais comuns. A sequência: desligar, aquecer levemente para soltar a cola, abrir, desconectar primeiro a bateria, trocar a peça, reconectar com cuidado e fechar com nova vedação ou adesivo. Usar peças de boa procedência e testar tudo antes de fechar.",
      ],
      pontos: ["Descrever a sequência da troca de tela ou bateria.", "Testar antes de fechar."],
    },
    {
      titulo: "Sistema, dados e atendimento ao cliente",
      texto: [
        "O sistema do celular (Android ou iOS) pode ser restaurado ou atualizado. Antes de qualquer serviço, avise o cliente, faça cópia dos dados se possível e nunca acesse conteúdo pessoal sem autorização. Combine por escrito o serviço, o preço e o prazo, e entregue o aparelho testado.",
      ],
      pontos: ["Explicar por que a privacidade do cliente é um dever.", "Registrar o serviço combinado."],
    },
  ],
  glossario: [
    { termo: "Display", definicao: "Tela do aparelho, que mostra a imagem." },
    { termo: "Placa principal", definicao: "Placa com o processador, a memória e os circuitos." },
    { termo: "Cabo flat", definicao: "Cabo flexível que liga componentes internos." },
    { termo: "Bateria de lítio", definicao: "Bateria recarregável comum em celulares, que exige cuidados." },
    { termo: "Estação de calor", definicao: "Ferramenta que solta colas e componentes com calor controlado." },
  ],
  dicas: [
    "Treine em aparelhos sucateados antes de mexer em um equipamento de cliente.",
    "Reforce os cuidados com baterias desde o primeiro dia.",
    "Combine por escrito o que será feito: evita problemas com o cliente.",
  ],
};

export default conteudo;
