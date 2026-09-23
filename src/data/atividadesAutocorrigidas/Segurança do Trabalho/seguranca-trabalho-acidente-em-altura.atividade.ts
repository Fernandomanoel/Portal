import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const NR_ALTURA = /cinto|epi|nr-?35|nr-?18|andaime|ancoragem|queda|altura|segurança|improvis/i;

const atividade: AtividadeAutocorrigida = {
  titulo: "Segurança do Trabalho: Análise de Acidente em Altura",
  introducao:
    "Relato de irregularidades, normas regulamentadoras aplicáveis, responsabilidades e protocolo de emergência pós-acidente.",
  itens: [
    {
      id: "relato-irregularidades",
      titulo: "[Parecer Técnico] Relato de Irregularidades e Fiscalização",
      cenario:
        "Baseado em um vídeo que mostra um acidente na instalação de um ar-condicionado, você atuará como Técnico/Fiscal de Segurança.",
      instrucao:
        "Descreva detalhadamente quais erros graves causaram a queda (ex.: falta de EPI, equipamento improvisado). Cite qual Norma Regulamentadora (ex.: NR-35) foi violada.",
      campos: [
        {
          id: "m1-dissertativa",
          placeholder:
            "Ex: O acidente ocorreu porque o andaime estava instável e improvisado. Houve grave violação da NR-35, pois o trabalhador não utilizava cinto de segurança (EPI) nem linha de vida para ancoragem...",
          regra: { tipo: "texto", minPalavras: 6, minCaracteres: 25, palavrasChave: NR_ALTURA },
          mensagemCerta:
            "Excelente fiscalização! Você identificou as falhas graves nos equipamentos (andaime/EPI) e as normas desrespeitadas (NR-35).",
          mensagemErrada:
            "Incorreto. Você precisa mencionar a ausência de \"EPI\", \"cinto\", a violação da \"NR-35\" ou o problema com o \"andaime\".",
        },
      ],
    },
    {
      id: "legislacao-normas",
      titulo: "[Legislação Aplicada] Relacionamento de Normas Regulamentadoras",
      instrucao:
        "Com base na situação do vídeo — atividade a mais de 2 metros do nível inferior, ausência total de cinturão de segurança tipo paraquedista e estrutura tubular improvisada e solta — selecione a Norma Regulamentadora correspondente a cada infração.",
      campos: [
        {
          id: "m2-l1",
          rotulo: "Norma sobre atividade a mais de 2 metros do nível inferior",
          regra: {
            tipo: "selecao",
            esperado: "NR-35",
            opcoes: [
              { valor: "NR-10", texto: "NR-10 (Elétrica)" },
              { valor: "NR-33", texto: "NR-33 (Espaço Confinado)" },
              { valor: "NR-35", texto: "NR-35 (Trabalho em Altura)" },
            ],
          },
          mensagemCerta: "Perfeito! Altura é NR-35, EPIs são exigidos pela NR-06, e os Andaimes/Construção pela NR-18.",
          mensagemErrada: "Incorreto. Revise: Altura = NR-35 | Fornecimento de EPI = NR-06 | Condições e Andaimes = NR-18.",
        },
        {
          id: "m2-l2",
          rotulo: "Norma sobre fornecimento de EPI (ausência de cinturão tipo paraquedista)",
          regra: {
            tipo: "selecao",
            esperado: "NR-06",
            opcoes: [
              { valor: "NR-06", texto: "NR-06 (EPI)" },
              { valor: "NR-12", texto: "NR-12 (Máquinas)" },
            ],
          },
          mensagemCerta: "Perfeito! Altura é NR-35, EPIs são exigidos pela NR-06, e os Andaimes/Construção pela NR-18.",
          mensagemErrada: "Incorreto. Revise: Altura = NR-35 | Fornecimento de EPI = NR-06 | Condições e Andaimes = NR-18.",
        },
        {
          id: "m2-l3",
          rotulo: "Norma sobre estrutura tubular improvisada e solta (canteiro de obras)",
          regra: {
            tipo: "selecao",
            esperado: "NR-18",
            opcoes: [
              { valor: "NR-17", texto: "NR-17 (Ergonomia)" },
              { valor: "NR-18", texto: "NR-18 (Condições na Construção)" },
            ],
          },
          mensagemCerta: "Perfeito! Altura é NR-35, EPIs são exigidos pela NR-06, e os Andaimes/Construção pela NR-18.",
          mensagemErrada: "Incorreto. Revise: Altura = NR-35 | Fornecimento de EPI = NR-06 | Condições e Andaimes = NR-18.",
        },
      ],
    },
    {
      id: "matriz-responsabilidade",
      titulo: "[Matriz de Responsabilidade] Direitos do Trabalhador e Empresa",
      instrucao: "Diante do risco iminente, julgue as afirmações trabalhistas e previdenciárias como Verdadeira (V) ou Falsa (F).",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica", "Classificação"],
        linhas: [
          [
            "1. O trabalhador possui o \"Direito de Recusa\", podendo interromper suas atividades sempre que constatar risco grave e iminente para sua vida e saúde (como subir no andaime solto sem cinto).",
            "",
          ],
          [
            "2. Apenas a imprudência do trabalhador causou o acidente, portanto, a empresa fica desobrigada de emitir a Comunicação de Acidente de Trabalho (CAT).",
            "",
          ],
        ],
      },
      campos: [
        {
          id: "m3-vf1",
          rotulo: "Afirmação 1",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! O Direito de Recusa (V) protege a vida do trabalhador. A emissão da CAT é obrigatória independente de culpa (F).",
          mensagemErrada: "Incorreto. O trabalhador TEM o Direito de Recusa (V). A CAT DEVE ser emitida mesmo havendo imprudência (F).",
        },
        {
          id: "m3-vf2",
          rotulo: "Afirmação 2",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Correto! O Direito de Recusa (V) protege a vida do trabalhador. A emissão da CAT é obrigatória independente de culpa (F).",
          mensagemErrada: "Incorreto. O trabalhador TEM o Direito de Recusa (V). A CAT DEVE ser emitida mesmo havendo imprudência (F).",
        },
      ],
    },
    {
      id: "protocolo-emergencia",
      titulo: "[Plano de Resposta] Protocolo de Emergência Pós-Acidente",
      instrucao:
        "Após a queda, as pessoas ao redor devem seguir um protocolo de emergência estrito. Ordene as ações do 1º passo (imediato) ao 4º passo (administrativo).",
      tabelaReferencia: {
        colunas: ["Ação a ser Tomada", "Ordem (1º ao 4º)"],
        linhas: [
          ["Isolar o local e NÃO movimentar a vítima (para evitar agravamento de possível lesão na coluna).", ""],
          ["Acionar imediatamente o serviço médico de emergência (SAMU / Corpo de Bombeiros) relatando queda de altura.", ""],
          ["Emitir a CAT (Comunicação de Acidente de Trabalho) até o primeiro dia útil seguinte ao da ocorrência.", ""],
        ],
      },
      campos: [
        {
          id: "m4-ord1",
          rotulo: "Isolar o local e não movimentar a vítima",
          regra: {
            tipo: "selecao",
            esperado: "1",
            opcoes: [
              { valor: "1", texto: "1º (Prioridade Máxima)" },
              { valor: "2", texto: "2º Passo" },
              { valor: "3", texto: "3º Passo" },
              { valor: "4", texto: "4º Passo (Fase Burocrática)" },
            ],
          },
          mensagemCerta: "Muito bem! 1º Protege-se a vítima in loco, 2º Chama-se socorro especializado, e 4º (fase burocrática) emite-se a CAT.",
          mensagemErrada: "Incorreto. A prioridade de vida é: 1º Isolar e não mover a vítima; 2º Chamar o resgate. A CAT é o último passo (4º).",
        },
        {
          id: "m4-ord2",
          rotulo: "Acionar o serviço médico de emergência (SAMU/Bombeiros)",
          regra: {
            tipo: "selecao",
            esperado: "2",
            opcoes: [
              { valor: "1", texto: "1º (Prioridade Máxima)" },
              { valor: "2", texto: "2º Passo" },
              { valor: "3", texto: "3º Passo" },
              { valor: "4", texto: "4º Passo (Fase Burocrática)" },
            ],
          },
          mensagemCerta: "Muito bem! 1º Protege-se a vítima in loco, 2º Chama-se socorro especializado, e 4º (fase burocrática) emite-se a CAT.",
          mensagemErrada: "Incorreto. A prioridade de vida é: 1º Isolar e não mover a vítima; 2º Chamar o resgate. A CAT é o último passo (4º).",
        },
        {
          id: "m4-ord3",
          rotulo: "Emitir a CAT",
          regra: {
            tipo: "selecao",
            esperado: "4",
            opcoes: [
              { valor: "1", texto: "1º (Prioridade Máxima)" },
              { valor: "2", texto: "2º Passo" },
              { valor: "3", texto: "3º Passo" },
              { valor: "4", texto: "4º Passo (Fase Burocrática)" },
            ],
          },
          mensagemCerta: "Muito bem! 1º Protege-se a vítima in loco, 2º Chama-se socorro especializado, e 4º (fase burocrática) emite-se a CAT.",
          mensagemErrada: "Incorreto. A prioridade de vida é: 1º Isolar e não mover a vítima; 2º Chamar o resgate. A CAT é o último passo (4º).",
        },
      ],
    },
    {
      id: "calculo-nivel-risco",
      titulo: "[Cálculo Interativo] Apuração do Nível de Risco",
      cenario:
        "Auditoria Pós-Acidente: o Engenheiro de Segurança precisa registrar o perigo na documentação da empresa (PGR). O cálculo básico define que Risco = Probabilidade × Severidade.",
      instrucao: "Calcule e digite o valor final do Nível de Risco a ser registrado (número exato).",
      tabelaReferencia: {
        colunas: ["Indicador", "Valor"],
        linhas: [
          ["Índice de Probabilidade (P)", "5 (Frequente / Quase Certo devido à instabilidade)"],
          ["Índice de Severidade (S)", "4 (Crítico / Morte ou Invalidez permanente)"],
        ],
      },
      campos: [
        {
          id: "m5-calculo",
          placeholder: "Digite apenas o número resultante (Ex: 15)...",
          regra: { tipo: "numero", esperado: 20 },
          mensagemCerta: "Cálculo Exato! Nível de Risco = 5 (Frequente) × 4 (Crítico) = 20 (Risco Intolerável).",
          mensagemErrada: "Incorreto. Multiplique Probabilidade (5) por Severidade (4). O resultado exato é 20.",
        },
      ],
    },
  ],
};

export default atividade;
