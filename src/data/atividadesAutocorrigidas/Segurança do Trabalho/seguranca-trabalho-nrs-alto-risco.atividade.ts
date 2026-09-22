import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: NRs de Alto Risco na Segurança do Trabalho",
  introducao: "Combate a incêndio (NR-23), trabalho em altura (NR-35), ergonomia (NR-17) e espaço confinado (NR-33).",
  itens: [
    {
      id: "combate-incendio-nr23",
      titulo: "[Associação] Equipamentos de Combate a Incêndio (NR-23)",
      instrucao:
        "O uso do extintor incorreto pode agravar o acidente. Associe o tipo de fogo ao agente extintor mais adequado para apagá-lo com segurança:",
      tabelaReferencia: {
        colunas: ["Cenário de Incêndio", "Agente Extintor Ideal"],
        linhas: [
          ["Fogo em materiais sólidos que deixam cinzas (Ex: Madeira, papelão, tecidos - Classe A).", ""],
          ["Fogo em painéis elétricos energizados e servidores de TI (Classe C).", ""],
        ],
      },
      campos: [
        {
          id: "m1-a1",
          rotulo: "Materiais sólidos que deixam cinzas (Classe A)",
          regra: {
            tipo: "selecao",
            esperado: "agua",
            opcoes: [
              { valor: "agua", texto: "Água Pressurizada" },
              { valor: "co2", texto: "Gás Carbônico (CO2)" },
            ],
          },
          mensagemCerta:
            "Perfeito! Água apaga resfriando Classe A, enquanto o CO2 é seguro para eletricidade (Classe C) pois não conduz energia.",
          mensagemErrada:
            "Incorreto. Lembre-se que jogar água em painéis elétricos causa choques/curtos. Use Água na Classe A e CO2 na Classe C.",
        },
        {
          id: "m1-a2",
          rotulo: "Painéis elétricos energizados e servidores de TI (Classe C)",
          regra: {
            tipo: "selecao",
            esperado: "co2",
            opcoes: [
              { valor: "agua", texto: "Água Pressurizada" },
              { valor: "co2", texto: "Gás Carbônico (CO2)" },
            ],
          },
          mensagemCerta:
            "Perfeito! Água apaga resfriando Classe A, enquanto o CO2 é seguro para eletricidade (Classe C) pois não conduz energia.",
          mensagemErrada:
            "Incorreto. Lembre-se que jogar água em painéis elétricos causa choques/curtos. Use Água na Classe A e CO2 na Classe C.",
        },
      ],
    },
    {
      id: "protocolo-trabalho-altura-nr35",
      titulo: "[Preenchimento de Lacunas] Protocolo de Trabalho em Altura (NR-35)",
      instrucao:
        "Complete o procedimento de segurança obrigatório: altura mínima que exige uso de sistema de ancoragem e EPI; tipo de cinturão de segurança obrigatório; documento exigido antes do início do serviço.",
      campos: [
        {
          id: "m2-l1",
          rotulo: "Altura mínima que exige ancoragem e EPI",
          regra: {
            tipo: "selecao",
            esperado: "2m",
            opcoes: [
              { valor: "2m", texto: "2,0 metros" },
              { valor: "5m", texto: "5,0 metros" },
            ],
          },
          mensagemCerta: "Excelente! Altura > 2 metros exige Cinto Paraquedista e a prévia Permissão de Trabalho (PT).",
          mensagemErrada: "Incorreto. As regras da NR-35 são claras: Acima de 2 metros; cinto tipo paraquedista; exige PT.",
        },
        {
          id: "m2-l2",
          rotulo: "Tipo de cinturão de segurança obrigatório",
          regra: {
            tipo: "selecao",
            esperado: "paraquedista",
            opcoes: [
              { valor: "abdominal", texto: "Abdominal" },
              { valor: "paraquedista", texto: "Paraquedista" },
            ],
          },
          mensagemCerta: "Excelente! Altura > 2 metros exige Cinto Paraquedista e a prévia Permissão de Trabalho (PT).",
          mensagemErrada: "Incorreto. As regras da NR-35 são claras: Acima de 2 metros; cinto tipo paraquedista; exige PT.",
        },
        {
          id: "m2-l3",
          rotulo: "Documento exigido antes do início do serviço",
          regra: {
            tipo: "selecao",
            esperado: "pt",
            opcoes: [
              { valor: "pt", texto: "PT (Permissão de Trabalho)" },
              { valor: "cat", texto: "CAT (Comunicação de Acidente)" },
            ],
          },
          mensagemCerta: "Excelente! Altura > 2 metros exige Cinto Paraquedista e a prévia Permissão de Trabalho (PT).",
          mensagemErrada: "Incorreto. As regras da NR-35 são claras: Acima de 2 metros; cinto tipo paraquedista; exige PT.",
        },
      ],
    },
    {
      id: "posto-trabalho-ergonomia-nr17",
      titulo: "[Matriz Verdadeiro ou Falso] Posto de Trabalho e Ergonomia (NR-17)",
      instrucao: "Julgue as afirmações relacionadas à adaptação do trabalho ao homem (Ergonomia):",
      tabelaReferencia: {
        colunas: ["Afirmação Técnica (NR-17)", "Classificação"],
        linhas: [
          [
            "1. Em postos informatizados, o monitor deve estar na altura dos olhos e a cadeira deve possuir regulagem de altura e encosto lombar.",
            "",
          ],
          [
            "2. Para aumentar a produtividade, o trabalhador que faz levantamento manual de caixas não tem limite de peso estabelecido, dependendo apenas da sua força física.",
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
          mensagemCerta: "Correto! Ajustes ergonômicos na mesa são vitais (V). O peso máximo de cargas é estritamente limitado por lei (F).",
          mensagemErrada: "Incorreto. A CLT e a NR-17 estabelecem limites claros de peso para evitar lesões na coluna (Afirmação 2 é Falsa).",
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
          mensagemCerta: "Correto! Ajustes ergonômicos na mesa são vitais (V). O peso máximo de cargas é estritamente limitado por lei (F).",
          mensagemErrada: "Incorreto. A CLT e a NR-17 estabelecem limites claros de peso para evitar lesões na coluna (Afirmação 2 é Falsa).",
        },
      ],
    },
    {
      id: "identificacao-nr-eletricidade",
      titulo: "[Input Exato] Identificação de Norma Regulamentadora",
      instrucao:
        "O Ministério do Trabalho classifica e numera rigorosamente os temas de segurança (a NR-35 trata de Trabalho em Altura e a NR-06 trata de EPIs). Digite APENAS o NÚMERO exato da Norma Regulamentadora que trata especificamente sobre Segurança em \"Instalações e Serviços em Eletricidade\".",
      campos: [
        {
          id: "m4-input",
          placeholder: "Exemplo: 12",
          regra: { tipo: "padrao", padrao: /^(10|NR10|[Nn][Rr]-10)$/ },
          mensagemCerta: "Exato! A NR-10 é a norma que previne acidentes com eletricidade (choques, arcos elétricos).",
          mensagemErrada: "Incorreto. O número da norma exclusiva para serviços com eletricidade é 10.",
        },
      ],
    },
    {
      id: "liberacao-espaco-confinado-nr33",
      titulo: "[Análise Situacional] Liberação de Espaço Confinado (NR-33)",
      cenario:
        "Cenário Crítico: Um trabalhador foi escalado para entrar em um tanque subterrâneo (silo/cisterna) para realizar a limpeza profunda. Esse ambiente tem pouca ventilação natural e não foi projetado para ocupação humana contínua.",
      instrucao:
        "Atuando como Supervisor de Entrada, descreva quais procedimentos OBRIGATÓRIOS devem ser feitos antes da entrada (mencione termos como: medidor de gases/oxigênio, PET, ou Vigia externo).",
      campos: [
        {
          id: "m5-dissertativa",
          placeholder:
            "Ex: Antes de entrar, deve-se aferir o oxigênio com o medidor de gases, emitir a PET (Permissão de Entrada) e garantir que um Vigia fique do lado de fora...",
          regra: { tipo: "texto", minPalavras: 6, minCaracteres: 20, palavrasChave: /pet|permissão|vigia|gás|gases|oxigênio|atmosfera|medidor/i },
          mensagemCerta:
            "Diagnóstico preciso! Aferir a atmosfera e manter um vigia do lado de fora (via PET) salva vidas em espaços confinados (NR-33).",
          mensagemErrada:
            "Ação de risco letal. Mencione a obrigatoriedade de medir os gases/oxigênio, manter um \"Vigia\" e/ou emitir a PET.",
        },
      ],
    },
  ],
};

export default atividade;
