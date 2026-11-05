import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Notebooks têm peças menores, mais integradas e mais frágeis. O curso trata do diagnóstico, da desmontagem e da montagem com cuidado, da limpeza e da troca de componentes comuns (memória, armazenamento, tela, teclado, bateria e cooler).",
  topicos: [
    {
      titulo: "Particularidades dos notebooks",
      texto: [
        "Em notebooks, os componentes são compactos, muitas vezes soldados na placa-mãe (memória e processador, em muitos modelos), e a refrigeração é limitada. Cada modelo tem o seu manual de serviço (service manual), que mostra a ordem dos parafusos e os acessos. O ideal é fotografar e organizar os parafusos por etapa.",
      ],
      pontos: ["Explicar por que cada modelo tem particularidades.", "Organizar parafusos e fotografar a desmontagem."],
    },
    {
      titulo: "Diagnóstico: o que pode estar errado",
      texto: [
        "Sintomas e causas comuns: não liga (bateria, carregador, placa), liga sem vídeo (memória mal encaixada, tela ou cabo flat), superaquecimento e desligamentos (poeira, pasta térmica seca, cooler parado), lentidão (HD antigo, pouca memória, vírus), bateria que não segura carga (desgaste). Testar com outro carregador e retirar a bateria ajuda a isolar o problema.",
      ],
      pontos: ["Relacionar sintomas e causas prováveis.", "Isolar o defeito em etapas."],
    },
    {
      titulo: "Desmontagem e montagem seguras",
      texto: [
        "Antes de abrir, desligue, retire a bateria (ou desconecte-a internamente) e use proteção contra estática. Retire as tampas e peças na ordem do manual, sem forçar encaixes de plástico e cuidando dos cabos flat (flexíveis), que se rompem com facilidade. Na remontagem, confira a ordem e se sobrou parafuso.",
      ],
      pontos: ["Descrever a ordem segura de desmontagem.", "Manusear cabos flat."],
      erros: ["Forçar o encaixe e quebrar as travas.", "Misturar parafusos de tamanhos diferentes."],
    },
    {
      titulo: "Limpeza, pasta térmica e refrigeração",
      texto: [
        "Poeira acumulada nos dissipadores e no cooler reduz a ventilação. A limpeza inclui remover a poeira com pincel e ar comprimido, sem girar o cooler à força, e trocar a pasta térmica do processador (aplicar uma pequena quantidade, uniformemente). Em manutenção preventiva, repete-se a cada um ou dois anos conforme o uso.",
      ],
      pontos: ["Limpar o cooler e trocar a pasta térmica."],
    },
    {
      titulo: "Troca de peças e atualização",
      texto: [
        "Melhorias comuns: trocar o HD por SSD, aumentar a memória RAM (verificar o tipo e a capacidade máxima), trocar a bateria, a tela e o teclado. Depois da troca, reinstale o sistema ou clone o disco, atualize os drivers e teste o equipamento.",
      ],
      pontos: ["Escolher a memória compatível.", "Instalar um SSD e migrar o sistema."],
    },
  ],
  glossario: [
    { termo: "Service manual", definicao: "Manual técnico do fabricante, com a ordem de desmontagem." },
    { termo: "Cabo flat", definicao: "Cabo flexível e fino que liga tela, teclado e outros componentes." },
    { termo: "Dissipador", definicao: "Peça metálica que ajuda a tirar o calor do processador." },
    { termo: "Pasta térmica", definicao: "Material que melhora a passagem de calor." },
    { termo: "SSD", definicao: "Disco de estado sólido, mais rápido e resistente que o HD." },
  ],
  dicas: [
    "Use notebooks sucateados para treino e etiquete os parafusos por etapa.",
    "Peça que o aluno fotografe cada etapa da desmontagem: serve de guia na remontagem.",
    "Lembre que dados do cliente são confidenciais e devem ser preservados.",
  ],
};

export default conteudo;
