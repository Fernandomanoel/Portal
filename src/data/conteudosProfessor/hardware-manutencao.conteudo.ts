import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso ensina a identificar as peças de um computador, montá-lo, instalar o sistema, diagnosticar defeitos e fazer a manutenção preventiva e corretiva, com segurança e cuidado com componentes e dados do cliente.",
  topicos: [
    {
      titulo: "Segurança e ferramentas",
      texto: [
        "A eletricidade estática pode queimar componentes: use pulseira antiestática ou toque no gabinete metálico antes de manusear peças. Desligue e desconecte o equipamento da tomada. Ferramentas básicas: chaves Philips e de fenda, alicate, pinça, pasta térmica, pincel e ar comprimido. Nunca abra fontes de energia sem saber o que está fazendo (guardam carga).",
      ],
      pontos: ["Listar os cuidados antes de abrir um computador.", "Reconhecer as ferramentas básicas."],
    },
    {
      titulo: "Componentes de um computador",
      texto: [
        "Placa-mãe é a placa que interliga tudo. O processador (CPU) executa as instruções e precisa de um cooler com pasta térmica. A memória RAM guarda temporariamente o que está em uso. O armazenamento (HD ou SSD, este mais rápido) guarda arquivos e o sistema. A fonte alimenta os componentes. A placa de vídeo (GPU) processa imagens; pode ser integrada ao processador. O gabinete abriga tudo e ajuda na ventilação.",
        "É essencial a compatibilidade: o soquete do processador deve ser o da placa-mãe, e o tipo de memória (DDR4, DDR5) também.",
      ],
      pontos: ["Dizer a função de cada peça.", "Checar a compatibilidade entre processador, placa-mãe e memória."],
    },
    {
      titulo: "Montagem passo a passo",
      texto: [
        "Sequência comum: instalar o processador e o cooler na placa-mãe, a memória, depois a placa-mãe no gabinete (com os espaçadores), a fonte, os discos, as placas adicionais e, por último, os cabos (alimentação da placa, do processador, dos discos e as ligações do painel frontal). Revisar tudo antes do primeiro boot.",
      ],
      pontos: ["Encaixar memória e processador sem forçar.", "Ligar os cabos de energia e do painel frontal."],
      erros: ["Esquecer a pasta térmica ou o cooler.", "Inverter os pinos do painel frontal."],
    },
    {
      titulo: "BIOS/UEFI, instalação do sistema e drivers",
      texto: [
        "A BIOS ou UEFI é o programa que inicia o computador e permite configurar a ordem de boot, a data, a hora e outros itens. Para instalar um sistema, prepara-se um pendrive de instalação, ajusta-se o boot por ele, particiona-se o disco, instala-se o sistema e depois os drivers (os programas que permitem usar o hardware).",
      ],
      pontos: ["Entrar na BIOS e mudar a ordem de boot.", "Instalar o sistema e os drivers."],
    },
    {
      titulo: "Diagnóstico e manutenção",
      texto: [
        "A manutenção preventiva é a limpeza, a troca de pasta térmica e a verificação periódica; a corretiva resolve um defeito. O diagnóstico segue do simples ao complexo: o cabo de energia está conectado? Há sinal sonoro (bips) da placa-mãe? A tela não dá vídeo? Teste a memória, o disco e a temperatura. Antes de qualquer reparo, proteja os dados do cliente e faça uma cópia, se possível.",
      ],
      pontos: ["Seguir um roteiro de diagnóstico.", "Explicar a diferença entre manutenção preventiva e corretiva."],
      erros: ["Trocar peças sem testar antes.", "Formatar o computador sem salvar os dados do cliente."],
    },
  ],
  glossario: [
    { termo: "CPU", definicao: "Processador do computador." },
    { termo: "RAM", definicao: "Memória temporária de trabalho." },
    { termo: "SSD / HD", definicao: "Dispositivos de armazenamento (SSD é mais rápido)." },
    { termo: "BIOS/UEFI", definicao: "Programa de inicialização do computador." },
    { termo: "Driver", definicao: "Programa que permite o sistema usar um hardware." },
    { termo: "Pasta térmica", definicao: "Material que ajuda a passar o calor do processador ao cooler." },
  ],
  dicas: [
    "Tenha peças sucateadas para os alunos montarem e desmontarem sem medo.",
    "Insista na segurança (estática, desligar da tomada) desde a primeira aula.",
    "Peça que o aluno descreva o problema e o plano de teste antes de mexer.",
  ],
};

export default conteudo;
