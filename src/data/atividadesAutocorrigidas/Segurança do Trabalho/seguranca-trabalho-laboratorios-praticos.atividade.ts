import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Práticas em Segurança do Trabalho",
  introducao: "EPI x EPC, higiene ocupacional, primeiros socorros, combate a incêndio, CAT, SESMT x CIPA e mapeamento de riscos.",
  itens: [
    {
      id: "epi-vs-epc",
      titulo: "[Associação] EPI vs EPC",
      instrucao: "Na gestão de canteiros, você deve distinguir equipamentos individuais e coletivos. Associe corretamente:",
      tabelaReferencia: {
        colunas: ["Equipamento", "Classificação"],
        linhas: [
          ["Sistema de exaustão de gases e Guarda-corpo.", ""],
          ["Protetor auricular tipo concha e Luvas de raspa.", ""],
        ],
      },
      campos: [
        {
          id: "t1-m1-a1",
          rotulo: "Sistema de exaustão de gases e guarda-corpo",
          regra: {
            tipo: "selecao",
            esperado: "EPC",
            opcoes: [
              { valor: "EPI", texto: "EPI (Individual)" },
              { valor: "EPC", texto: "EPC (Coletivo)" },
            ],
          },
          mensagemCerta: "Correto! Exaustão e guarda-corpo protegem o grupo (EPC); luva e protetor são individuais (EPI).",
          mensagemErrada: "Incorreto. Guarda-corpo é EPC, Protetores e luvas são EPIs.",
        },
        {
          id: "t1-m1-a2",
          rotulo: "Protetor auricular tipo concha e luvas de raspa",
          regra: {
            tipo: "selecao",
            esperado: "EPI",
            opcoes: [
              { valor: "EPI", texto: "EPI (Individual)" },
              { valor: "EPC", texto: "EPC (Coletivo)" },
            ],
          },
          mensagemCerta: "Correto! Exaustão e guarda-corpo protegem o grupo (EPC); luva e protetor são individuais (EPI).",
          mensagemErrada: "Incorreto. Guarda-corpo é EPC, Protetores e luvas são EPIs.",
        },
      ],
    },
    {
      id: "higiene-ocupacional",
      titulo: "[Preenchimento] Higiene Ocupacional",
      instrucao:
        "O Técnico de Segurança precisa classificar os agentes de risco no mapa: ruído contínuo das máquinas e vibrações; inalação de vapores de solventes e poeiras minerais; bactérias e vírus em um laboratório.",
      campos: [
        {
          id: "t1-m2-l1",
          rotulo: "Ruído contínuo das máquinas e vibrações",
          regra: {
            tipo: "selecao",
            esperado: "fisicos",
            opcoes: [
              { valor: "fisicos", texto: "Físicos (Verde)" },
              { valor: "biologicos", texto: "Biológicos (Marrom)" },
            ],
          },
          mensagemCerta: "Perfeito! Ruído = Físico, Poeira/Gases = Químico, Vírus = Biológico.",
          mensagemErrada: "Revise a classificação: Ruído (Físico), Vapores (Químicos), Bactérias (Biológicos).",
        },
        {
          id: "t1-m2-l2",
          rotulo: "Inalação de vapores de solventes e poeiras minerais",
          regra: {
            tipo: "selecao",
            esperado: "quimicos",
            opcoes: [
              { valor: "quimicos", texto: "Químicos (Vermelho)" },
              { valor: "ergonomicos", texto: "Ergonômicos (Amarelo)" },
            ],
          },
          mensagemCerta: "Perfeito! Ruído = Físico, Poeira/Gases = Químico, Vírus = Biológico.",
          mensagemErrada: "Revise a classificação: Ruído (Físico), Vapores (Químicos), Bactérias (Biológicos).",
        },
        {
          id: "t1-m2-l3",
          rotulo: "Bactérias e vírus em um laboratório",
          regra: {
            tipo: "selecao",
            esperado: "biologicos",
            opcoes: [
              { valor: "biologicos", texto: "Biológicos (Marrom)" },
              { valor: "fisicos", texto: "Físicos (Verde)" },
            ],
          },
          mensagemCerta: "Perfeito! Ruído = Físico, Poeira/Gases = Químico, Vírus = Biológico.",
          mensagemErrada: "Revise a classificação: Ruído (Físico), Vapores (Químicos), Bactérias (Biológicos).",
        },
      ],
    },
    {
      id: "programa-prevencao",
      titulo: "[Matriz V/F] Programa de Prevenção",
      instrucao: "Julgue os conceitos fundamentais sobre os programas de prevenção de riscos:",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica", "Classificação"],
        linhas: [
          [
            "1. O PPRA (atualmente englobado pelo PGR) tem como objetivo antecipar, reconhecer, avaliar e controlar os riscos ambientais na empresa.",
            "",
          ],
          ["2. A elaboração do programa de riscos isenta automaticamente a empresa de fornecer EPIs aos seus trabalhadores.", ""],
        ],
      },
      campos: [
        {
          id: "t1-m3-vf1",
          rotulo: "Afirmação 1",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! O Programa avalia os riscos (V), mas os EPIs continuam obrigatórios caso haja risco residual (F).",
          mensagemErrada: "O PPRA reconhece riscos (V), mas NÃO isenta o fornecimento de EPI (F).",
        },
        {
          id: "t1-m3-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! O Programa avalia os riscos (V), mas os EPIs continuam obrigatórios caso haja risco residual (F).",
          mensagemErrada: "O PPRA reconhece riscos (V), mas NÃO isenta o fornecimento de EPI (F).",
        },
      ],
    },
    {
      id: "legislacao-epi",
      titulo: "[Input Exato] Legislação de Equipamentos",
      instrucao:
        "Todo Equipamento de Proteção Individual, seja de fabricação nacional ou importado, só pode ser comercializado com o Certificado de Aprovação (CA). Qual é o número exato da Norma Regulamentadora que trata exclusivamente de EPI?",
      campos: [
        {
          id: "t1-m4-calc",
          placeholder: "Digite apenas o número da NR (ex: 12)...",
          regra: { tipo: "padrao", padrao: /^0?6$/ },
          mensagemCerta: "Exato! A NR-06 é a norma que regulamenta a fabricação, CA e uso de EPIs.",
          mensagemErrada: "Incorreto. A Norma Regulamentadora exclusiva de EPI é a número 6.",
        },
      ],
    },
    {
      id: "recusa-uso-epi",
      titulo: "[Análise Situacional] Recusa do Uso de EPI",
      cenario: "Um operário experiente recusa-se a usar o capacete alegando que o equipamento é \"desconfortável e dá dor de cabeça\".",
      instrucao: "Como Técnico/Fiscal, qual deve ser o procedimento técnico e educativo imediato antes de aplicar punições?",
      campos: [
        {
          id: "t1-m5-diss",
          placeholder: "Explique a necessidade de orientar, treinar ou advertir o funcionário, além de verificar o conforto do equipamento...",
          regra: { tipo: "texto", minPalavras: 6, palavrasChave: /orientar|treinar|conscientizar|advertir|explicar|ensinar|dialogar|motivo/i },
          mensagemCerta: "Análise técnica excelente e fundamentada!",
          mensagemErrada: "Faltam ações educativas essenciais. Cite a importância de orientar, treinar, conscientizar ou advertir formalmente.",
        },
      ],
    },
    {
      id: "primeiros-socorros-resgate",
      titulo: "[Ordenação] Primeiros Socorros e Resgate",
      cenario: "Ocorreu um acidente grave com choque elétrico. Siga o protocolo internacional (PAS - Proteger, Avisar, Socorrer).",
      tabelaReferencia: {
        colunas: ["Ação de Emergência", "Ordem"],
        linhas: [
          ["Acionar o resgate especializado (SAMU/Bombeiros).", ""],
          ["Prestar o atendimento de suporte básico (massagem cardíaca), caso capacitado.", ""],
          ["Desligar a chave geral de energia para isolar o local e garantir a segurança do socorrista.", ""],
        ],
      },
      campos: [
        {
          id: "t2-m6-o1",
          rotulo: "Acionar o resgate especializado (SAMU/Bombeiros)",
          regra: {
            tipo: "selecao",
            esperado: "2",
            opcoes: [
              { valor: "1", texto: "1º (Proteger)" },
              { valor: "2", texto: "2º (Avisar)" },
              { valor: "3", texto: "3º (Socorrer)" },
            ],
          },
          mensagemCerta: "Protocolo PAS correto: 1º Proteger a cena (energia), 2º Avisar emergência, 3º Socorrer a vítima.",
          mensagemErrada: "A ordem salva vidas: 1º Proteger a cena; 2º Avisar o SAMU; 3º Socorrer a vítima.",
        },
        {
          id: "t2-m6-o2",
          rotulo: "Prestar atendimento de suporte básico, se capacitado",
          regra: {
            tipo: "selecao",
            esperado: "3",
            opcoes: [
              { valor: "1", texto: "1º (Proteger)" },
              { valor: "2", texto: "2º (Avisar)" },
              { valor: "3", texto: "3º (Socorrer)" },
            ],
          },
          mensagemCerta: "Protocolo PAS correto: 1º Proteger a cena (energia), 2º Avisar emergência, 3º Socorrer a vítima.",
          mensagemErrada: "A ordem salva vidas: 1º Proteger a cena; 2º Avisar o SAMU; 3º Socorrer a vítima.",
        },
        {
          id: "t2-m6-o3",
          rotulo: "Desligar a chave geral de energia",
          regra: {
            tipo: "selecao",
            esperado: "1",
            opcoes: [
              { valor: "1", texto: "1º (Proteger)" },
              { valor: "2", texto: "2º (Avisar)" },
              { valor: "3", texto: "3º (Socorrer)" },
            ],
          },
          mensagemCerta: "Protocolo PAS correto: 1º Proteger a cena (energia), 2º Avisar emergência, 3º Socorrer a vítima.",
          mensagemErrada: "A ordem salva vidas: 1º Proteger a cena; 2º Avisar o SAMU; 3º Socorrer a vítima.",
        },
      ],
    },
    {
      id: "combate-incendio",
      titulo: "[Associação] Proteção Contra Incêndio",
      instrucao: "A brigada de emergência precisa utilizar o extintor adequado. Relacione a classe do incêndio ao seu combustível:",
      tabelaReferencia: {
        colunas: ["Cenário de Incêndio", "Classe"],
        linhas: [
          ["Materiais sólidos (Papel, madeira, tecido).", ""],
          ["Líquidos inflamáveis (Gasolina, álcool, óleo).", ""],
        ],
      },
      campos: [
        {
          id: "t2-m7-a1",
          rotulo: "Materiais sólidos (papel, madeira, tecido)",
          regra: {
            tipo: "selecao",
            esperado: "A",
            opcoes: [
              { valor: "A", texto: "Classe A" },
              { valor: "B", texto: "Classe B" },
              { valor: "C", texto: "Classe C" },
            ],
          },
          mensagemCerta: "Correto! Classe A para sólidos e Classe B para líquidos inflamáveis.",
          mensagemErrada: "Sólidos combustíveis são Classe A; Líquidos Inflamáveis são Classe B.",
        },
        {
          id: "t2-m7-a2",
          rotulo: "Líquidos inflamáveis (gasolina, álcool, óleo)",
          regra: {
            tipo: "selecao",
            esperado: "B",
            opcoes: [
              { valor: "A", texto: "Classe A" },
              { valor: "B", texto: "Classe B" },
              { valor: "C", texto: "Classe C" },
            ],
          },
          mensagemCerta: "Correto! Classe A para sólidos e Classe B para líquidos inflamáveis.",
          mensagemErrada: "Sólidos combustíveis são Classe A; Líquidos Inflamáveis são Classe B.",
        },
      ],
    },
    {
      id: "comunicacao-acidente",
      titulo: "[Matriz V/F] Comunicação de Acidente",
      instrucao: "Avalie as diretrizes legais sobre a emissão da Comunicação de Acidente de Trabalho (CAT):",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica", "Classificação"],
        linhas: [
          ["1. Acidentes de trajeto (no percurso entre a casa e o trabalho) também exigem a emissão da CAT pela empresa.", ""],
          ["2. A CAT só deve ser emitida se o acidente causar lesões que afastem o trabalhador por mais de 15 dias.", ""],
        ],
      },
      campos: [
        {
          id: "t2-m8-vf1",
          rotulo: "Afirmação 1",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! Acidente de trajeto é acidente de trabalho (V). Qualquer acidente, mesmo sem afastamento, exige CAT (F).",
          mensagemErrada: "Trajeto exige CAT (Verdadeiro). CAT é exigida independentemente de dias de afastamento (Falso).",
        },
        {
          id: "t2-m8-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! Acidente de trajeto é acidente de trabalho (V). Qualquer acidente, mesmo sem afastamento, exige CAT (F).",
          mensagemErrada: "Trajeto exige CAT (Verdadeiro). CAT é exigida independentemente de dias de afastamento (Falso).",
        },
      ],
    },
    {
      id: "prazo-cat",
      titulo: "[Input Exato] Prazos de Emissão da CAT",
      instrucao:
        "Qual é o prazo máximo (em horas corridas ou equivalente no próximo dia útil) que a empresa possui para emitir a CAT após a ocorrência de um acidente sem óbito?",
      campos: [
        {
          id: "t2-m9-calc",
          placeholder: "Digite o número de horas (Ex: 48)...",
          regra: { tipo: "numero", esperado: 24 },
          mensagemCerta: "Exato! O prazo legal é de 24 horas (ou 1 dia útil) após o ocorrido.",
          mensagemErrada: "Incorreto. A legislação define o prazo de 24 horas úteis.",
        },
      ],
    },
    {
      id: "formulario-cat",
      titulo: "[Prática Externa] Formulário de CAT",
      instrucao:
        "Crie um modelo simplificado de formulário de ocorrência de acidentes no Google Docs ou Google Forms e cole o link abaixo para compor o portfólio de gestão de segurança.",
      campos: [
        {
          id: "t2-m10-link",
          placeholder: "https://docs.google.com/forms/d/exemplo...",
          regra: { tipo: "padrao", padrao: /https?:\/\/(docs|forms)\.google\.com/i },
          mensagemCerta: "Link validado! Formulário registrado com sucesso.",
          mensagemErrada: "Insira uma URL pública válida do Google Docs ou Forms.",
        },
      ],
    },
    {
      id: "sinalizacao-seguranca",
      titulo: "[Lacunas] Sinalização de Segurança",
      instrucao:
        "Na sinalização industrial: cor exclusiva para equipamentos de combate a incêndio; cor para \"Atenção\" e advertência sobre perigos (máquinas pesadas); cor para segurança, caixas de primeiros socorros e rotas de fuga.",
      campos: [
        {
          id: "t3-m11-l1",
          rotulo: "Cor exclusiva para equipamentos de combate a incêndio",
          regra: {
            tipo: "selecao",
            esperado: "vermelho",
            opcoes: [
              { valor: "vermelho", texto: "Vermelha" },
              { valor: "amarelo", texto: "Amarela" },
            ],
          },
          mensagemCerta: "Perfeito! Vermelho = Incêndio, Amarelo = Atenção/Perigo, Verde = Segurança/Rotas.",
          mensagemErrada: "Cores da norma: Incêndio (Vermelho), Atenção (Amarelo), Segurança (Verde).",
        },
        {
          id: "t3-m11-l2",
          rotulo: "Cor para \"Atenção\" e advertência sobre perigos (máquinas pesadas)",
          regra: {
            tipo: "selecao",
            esperado: "amarelo",
            opcoes: [
              { valor: "amarelo", texto: "Amarela" },
              { valor: "verde", texto: "Verde" },
            ],
          },
          mensagemCerta: "Perfeito! Vermelho = Incêndio, Amarelo = Atenção/Perigo, Verde = Segurança/Rotas.",
          mensagemErrada: "Cores da norma: Incêndio (Vermelho), Atenção (Amarelo), Segurança (Verde).",
        },
        {
          id: "t3-m11-l3",
          rotulo: "Cor para segurança, primeiros socorros e rotas de fuga",
          regra: {
            tipo: "selecao",
            esperado: "verde",
            opcoes: [
              { valor: "azul", texto: "Azul" },
              { valor: "verde", texto: "Verde" },
            ],
          },
          mensagemCerta: "Perfeito! Vermelho = Incêndio, Amarelo = Atenção/Perigo, Verde = Segurança/Rotas.",
          mensagemErrada: "Cores da norma: Incêndio (Vermelho), Atenção (Amarelo), Segurança (Verde).",
        },
      ],
    },
    {
      id: "sesmt-x-cipa",
      titulo: "[Associação] SESMT x CIPA",
      instrucao: "Identifique a diferença entre as duas principais frentes de segurança nas organizações:",
      tabelaReferencia: {
        colunas: ["Descrição", "Entidade"],
        linhas: [
          ["Composta por profissionais técnicos contratados (Engenheiros, Médicos, Técnicos de Segurança).", ""],
          ["Comissão formada por representantes eleitos pelos empregados e indicados pelo empregador.", ""],
        ],
      },
      campos: [
        {
          id: "t3-m12-a1",
          rotulo: "Profissionais técnicos contratados",
          regra: {
            tipo: "selecao",
            esperado: "SESMT",
            opcoes: [
              { valor: "SESMT", texto: "SESMT" },
              { valor: "CIPA", texto: "CIPA" },
            ],
          },
          mensagemCerta: "Exato! SESMT é técnico e contratado; CIPA é uma comissão mista e eleita.",
          mensagemErrada: "Profissionais técnicos contratados = SESMT. Comissão de trabalhadores = CIPA.",
        },
        {
          id: "t3-m12-a2",
          rotulo: "Comissão formada por representantes eleitos e indicados",
          regra: {
            tipo: "selecao",
            esperado: "CIPA",
            opcoes: [
              { valor: "SESMT", texto: "SESMT" },
              { valor: "CIPA", texto: "CIPA" },
            ],
          },
          mensagemCerta: "Exato! SESMT é técnico e contratado; CIPA é uma comissão mista e eleita.",
          mensagemErrada: "Profissionais técnicos contratados = SESMT. Comissão de trabalhadores = CIPA.",
        },
      ],
    },
    {
      id: "etica-sistemas-corporativos",
      titulo: "[Análise Situacional] Ética e Sistemas Corporativos",
      cenario:
        "Você está desenvolvendo e arquitetando a lógica de um dashboard web (usando React e um banco de dados PostgreSQL) para o SESMT de uma indústria. O gestor da planta pede para que você crie uma funcionalidade oculta no backend que permita \"apagar do histórico do sistema\" acidentes leves (que não geraram afastamento), com o objetivo de mascarar os dados antes de auditorias do Ministério do Trabalho.",
      instrucao: "Baseado na Ética Profissional, qual deve ser seu posicionamento técnico e ético como desenvolvedor frente a essa demanda?",
      campos: [
        {
          id: "t3-m13-diss",
          placeholder:
            "Justifique sua recusa citando os riscos legais (fraude, crime), a integridade dos dados, rastreabilidade e compromisso ético com a segurança real dos trabalhadores...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            palavrasChave: /fraude|crime|ética|antiético|recusar|negar|auditoria|rastreabilidade|integridade|lei|segurança/i,
          },
          mensagemCerta: "Análise técnica excelente e fundamentada!",
          mensagemErrada: "Faltou clareza na recusa ética. Cite termos como fraude, recusa da ação, integridade dos dados do banco ou violação da lei.",
        },
      ],
    },
    {
      id: "condicoes-sanitarias",
      titulo: "[Matriz V/F] Condições Sanitárias e Conforto",
      instrucao: "Sobre as exigências da NR-24 (Condições Sanitárias e de Conforto):",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica", "Classificação"],
        linhas: [
          ["1. A empresa é obrigada a fornecer água potável filtrada e instalações sanitárias limpas para os trabalhadores.", ""],
          ["2. Refeitórios não são obrigatórios, os operários podem fazer as refeições nos próprios postos de trabalho em meio às máquinas.", ""],
        ],
      },
      campos: [
        {
          id: "t3-m14-vf1",
          rotulo: "Afirmação 1",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! Água potável é básico (V). Refeições no posto de trabalho são proibidas por higiene e segurança (F).",
          mensagemErrada: "Instalações sanitárias são obrigatórias (Verdadeiro). Comer no posto de trabalho é infração à NR-24 (Falso).",
        },
        {
          id: "t3-m14-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! Água potável é básico (V). Refeições no posto de trabalho são proibidas por higiene e segurança (F).",
          mensagemErrada: "Instalações sanitárias são obrigatórias (Verdadeiro). Comer no posto de trabalho é infração à NR-24 (Falso).",
        },
      ],
    },
    {
      id: "mapeamento-visual-riscos",
      titulo: "[Prática Externa] Mapeamento Visual de Riscos",
      instrucao:
        "Acesse o Canva (ou similar) e crie um layout básico representando um \"Mapa de Riscos\" de um ambiente operacional usando os círculos coloridos (Verde, Vermelho, Marrom). Cole o link de visualização pública.",
      campos: [
        {
          id: "t3-m15-link",
          placeholder: "https://www.canva.com/design/exemplo...",
          regra: { tipo: "padrao", padrao: /https?:\/\/(www\.)?canva\.com/i },
          mensagemCerta: "Link do Canva validado com sucesso!",
          mensagemErrada: "Insira uma URL válida do Canva.",
        },
      ],
    },
  ],
};

export default atividade;
