import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Segurança do Trabalho previne acidentes e doenças ocupacionais. O curso apresenta riscos e a hierarquia de controle, EPI e EPC, higiene ocupacional, mapa de riscos, PGR e as normas regulamentadoras (NRs) de maior risco. As NRs são atualizadas com frequência: consulte a versão vigente.",
  topicos: [
    {
      titulo: "Acidente de trabalho, CAT e quem cuida da segurança",
      texto: [
        "Acidente de trabalho é o que ocorre pelo exercício do trabalho e causa lesão ou perturbação. Inclui o acidente de trajeto e as doenças ocupacionais. A CAT (Comunicação de Acidente de Trabalho) é emitida pela empresa. O SESMT (Serviço Especializado em Engenharia de Segurança e em Medicina do Trabalho) é composto por profissionais especializados (conforme o porte e o risco da empresa); a CIPA (Comissão Interna de Prevenção de Acidentes) reúne representantes do empregador e dos empregados.",
      ],
      pontos: ["Distinguir SESMT e CIPA.", "Dizer quando se emite a CAT."],
      atividades: ["seguranca-trabalho-laboratorios-praticos"],
    },
    {
      titulo: "Riscos ocupacionais e hierarquia de controles",
      texto: [
        "Perigo é a fonte de dano; risco é a combinação da probabilidade e da gravidade. Os riscos classificam-se em físicos (ruído, calor, radiação), químicos (poeiras, vapores), biológicos (vírus, bactérias), ergonômicos (postura, ritmo) e de acidentes (máquinas, quedas).",
        "A hierarquia de controles vai do mais eficaz ao menos: eliminar o perigo, substituir, usar controles de engenharia (proteção coletiva, EPC), controles administrativos (procedimentos, treinamento, sinalização) e, por último, o EPI. O EPI protege a pessoa, mas não elimina o risco.",
      ],
      pontos: ["Classificar um risco pelo tipo.", "Ordenar a hierarquia de controles.", "Explicar por que EPI é o último recurso."],
      erros: ["Começar pelo EPI sem tentar eliminar ou reduzir o risco na fonte."],
      atividades: ["seguranca-trabalho-gestao-riscos", "seguranca-trabalho-higiene-ocupacional-pgr"],
    },
    {
      titulo: "EPI e EPC",
      texto: [
        "EPC (equipamento de proteção coletiva) protege todos: corrimão, guarda-corpo, exaustor, proteção de máquina. EPI (equipamento de proteção individual) protege um trabalhador: capacete, óculos, luvas, protetor auricular, calçado. O EPI deve ter Certificado de Aprovação (CA) válido, ser entregue gratuitamente, com registro e treinamento, e ser usado e conservado corretamente.",
      ],
      pontos: ["Dar exemplos de EPC e EPI.", "Dizer o que é o CA."],
      atividades: ["seguranca-trabalho-laboratorios-praticos", "seguranca-trabalho-higiene-ocupacional-pgr"],
    },
    {
      titulo: "Mapa de riscos (NR-5) e PGR",
      texto: [
        "O mapa de riscos é uma representação gráfica dos riscos em cada setor, em círculos: o tamanho indica a gravidade (pequeno, médio, grande), e a cor, o tipo de risco: verde (físico), vermelho (químico), marrom (biológico), amarelo (ergonômico) e azul (acidentes, no modelo tradicional). A elaboração envolve a CIPA e os trabalhadores. A atualização da NR-1 trouxe o PGR (Programa de Gerenciamento de Riscos), que identifica perigos, avalia riscos e define ações de controle, com um plano de ação.",
        "As cores e os modelos devem ser conferidos nas normas atuais.",
      ],
      pontos: ["Ler um mapa de riscos.", "Explicar o que o PGR faz."],
      atividades: ["seguranca-trabalho-mapa-de-riscos", "seguranca-trabalho-higiene-ocupacional-pgr"],
    },
    {
      titulo: "Primeiros socorros e combate a incêndio (NR-23)",
      texto: [
        "Em primeiros socorros: garantir a segurança do local, avaliar a vítima, acionar o serviço de emergência (SAMU, 192; Bombeiros, 193) e prestar o auxílio possível sem agravar. O fogo precisa de combustível, comburente (oxigênio), calor e reação em cadeia (o tetraedro do fogo); retirar um deles apaga o fogo. Os extintores se classificam por classe de fogo (A: sólidos, B: líquidos inflamáveis, C: elétrico) e devem ser do tipo adequado.",
      ],
      pontos: ["Citar os elementos do fogo.", "Associar a classe de incêndio ao extintor."],
      atividades: ["seguranca-trabalho-gestao-riscos", "seguranca-trabalho-nrs-alto-risco"],
    },
    {
      titulo: "NRs de alto risco: altura, espaço confinado e ergonomia",
      texto: [
        "Trabalho em altura (NR-35) é acima de 2 metros do nível inferior, com risco de queda: exige análise de risco, treinamento, uso de cinto tipo paraquedista com ancoragem e supervisão. Espaço confinado (NR-33) tem entrada e saída limitadas e atmosfera potencialmente perigosa (falta de oxigênio, gases): exige permissão de entrada, vigia do lado de fora e monitoramento do ar. Ergonomia (NR-17) adapta o trabalho ao trabalhador: postura, mobiliário, pausas e organização do trabalho.",
      ],
      pontos: ["Dizer a partir de que altura vale a NR-35.", "Explicar o papel do vigia no espaço confinado.", "Dar exemplos de adaptação ergonômica."],
      atividades: ["seguranca-trabalho-nrs-alto-risco", "seguranca-trabalho-acidente-em-altura"],
    },
  ],
  glossario: [
    { termo: "EPI", definicao: "Equipamento de proteção individual." },
    { termo: "EPC", definicao: "Equipamento de proteção coletiva." },
    { termo: "CA", definicao: "Certificado de Aprovação do EPI." },
    { termo: "CIPA", definicao: "Comissão Interna de Prevenção de Acidentes." },
    { termo: "SESMT", definicao: "Serviço Especializado em Engenharia de Segurança e Medicina do Trabalho." },
    { termo: "PGR", definicao: "Programa de Gerenciamento de Riscos." },
    { termo: "Perigo e risco", definicao: "Perigo é a fonte do dano; risco é a chance e a gravidade de ele acontecer." },
  ],
  dicas: [
    "Faça um passeio pela escola identificando riscos e desenhe o mapa de riscos de uma sala.",
    "Traga EPIs reais para a aula: ver e tocar fixa mais do que a lista.",
    "Em cada norma, diga que o conteúdo muda: o aluno deve saber procurar a versão atual no site do governo.",
  ],
};

export default conteudo;
