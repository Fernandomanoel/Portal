import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão Logística e Operações II",
  introducao:
    "Modais de transporte, indicador OTIF, cálculo de cubagem e estratégia de Cross-Docking na Cadeia de Suprimentos.",
  itens: [
    {
      id: "modais-transporte",
      titulo: "Modais de Transporte de Cargas",
      cenario: "A escolha do modal afeta diretamente o custo e o prazo de entrega.",
      instrucao: "Associe a característica da operação logística ao seu respectivo Modal de Transporte.",
      campos: [
        {
          id: "modais-transporte-row1",
          rotulo:
            "Possui alta flexibilidade de rotas (entrega porta a porta). É o mais utilizado no Brasil, porém possui custo variável alto (combustível/pedágio).",
          regra: {
            tipo: "selecao",
            esperado: "rodoviario",
            opcoes: [
              { valor: "rodoviario", texto: "Rodoviário" },
              { valor: "ferroviario", texto: "Ferroviário" },
              { valor: "aereo", texto: "Aéreo" },
            ],
          },
          mensagemCerta: "Correto! Rodoviário (Porta a Porta), Ferroviário (Grãos/Baixo Custo) e Aéreo (Alto valor/Urgência).",
          mensagemErrada: "Incorreto. Revise as indicações: Porta a Porta = Rodoviário; Commodities = Ferroviário; Urgência = Aéreo.",
        },
        {
          id: "modais-transporte-row2",
          rotulo:
            "Ideal para transporte de grandes volumes de commodities (minério, soja) a longas distâncias terrestres, com baixo custo por tonelada.",
          regra: {
            tipo: "selecao",
            esperado: "ferroviario",
            opcoes: [
              { valor: "rodoviario", texto: "Rodoviário" },
              { valor: "ferroviario", texto: "Ferroviário" },
              { valor: "aereo", texto: "Aéreo" },
            ],
          },
          mensagemCerta: "Correto! Rodoviário (Porta a Porta), Ferroviário (Grãos/Baixo Custo) e Aéreo (Alto valor/Urgência).",
          mensagemErrada: "Incorreto. Revise as indicações: Porta a Porta = Rodoviário; Commodities = Ferroviário; Urgência = Aéreo.",
        },
        {
          id: "modais-transporte-row3",
          rotulo:
            "Utilizado para mercadorias de altíssimo valor agregado (eletrônicos, medicamentos vitais) que exigem urgência extrema, possuindo o frete mais caro.",
          regra: {
            tipo: "selecao",
            esperado: "aereo",
            opcoes: [
              { valor: "rodoviario", texto: "Rodoviário" },
              { valor: "ferroviario", texto: "Ferroviário" },
              { valor: "aereo", texto: "Aéreo" },
            ],
          },
          mensagemCerta: "Correto! Rodoviário (Porta a Porta), Ferroviário (Grãos/Baixo Custo) e Aéreo (Alto valor/Urgência).",
          mensagemErrada: "Incorreto. Revise as indicações: Porta a Porta = Rodoviário; Commodities = Ferroviário; Urgência = Aéreo.",
        },
      ],
    },
    {
      id: "otif",
      titulo: "Indicadores de Desempenho (OTIF)",
      cenario: "O OTIF (On Time, In Full) é o principal indicador de nível de serviço logístico.",
      instrucao: "Avalie as afirmações como Verdadeira (V) ou Falsa (F).",
      campos: [
        {
          id: "otif-row1",
          rotulo:
            "1. Para que um pedido seja considerado \"OTIF perfeito\" (100%), ele deve ser entregue na data e hora acordadas (On Time) E conter todos os itens na quantidade certa, sem avarias (In Full).",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Excelente! O pedido precisa ser 100% perfeito (Tempo + Condição). Avarias zeram a métrica 'In Full' (Falso).",
          mensagemErrada:
            "Atenção: A primeira afirmação define perfeitamente o OTIF (Verdadeiro). Avarias afetam o 'In Full', derrubando a métrica (A segunda é Falsa).",
        },
        {
          id: "otif-row2",
          rotulo:
            "2. Se uma transportadora entrega o pedido dentro do prazo estipulado, mas danifica metade dos produtos durante a viagem, o indicador OTIF continua sendo de 100% (pois o que importa é o tempo).",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Excelente! O pedido precisa ser 100% perfeito (Tempo + Condição). Avarias zeram a métrica 'In Full' (Falso).",
          mensagemErrada:
            "Atenção: A primeira afirmação define perfeitamente o OTIF (Verdadeiro). Avarias afetam o 'In Full', derrubando a métrica (A segunda é Falsa).",
        },
      ],
    },
    {
      id: "cubagem",
      titulo: "Volume e Cubagem (m³)",
      cenario:
        "O valor do frete muitas vezes é cobrado pelo espaço que a carga ocupa, e não apenas pelo seu peso. A fórmula do Volume Cúbico é: Comprimento × Largura × Altura.",
      instrucao: "Ficha de Expedição de Carga (Palete). Calcule e digite o Volume Cúbico exato da carga (apenas o número, em m³).",
      tabelaReferencia: {
        colunas: ["Dimensão", "Medida (Metros)"],
        linhas: [
          ["Comprimento", "2 metros"],
          ["Largura", "2 metros"],
          ["Altura", "2 metros"],
          ["Fórmula aplicada", "2 × 2 × 2"],
        ],
      },
      campos: [
        {
          id: "cubagem-volume",
          placeholder: "Exemplo: 5",
          regra: { tipo: "numero", esperado: 8 },
          mensagemCerta: "Cálculo exato! Multiplicando as 3 dimensões (2 x 2 x 2), temos 8 m³ de volume cúbico.",
          mensagemErrada: "Incorreto. Para achar o volume, multiplique: 2 vezes 2 vezes 2.",
        },
      ],
    },
    {
      id: "cross-docking",
      titulo: "Operação de Cross-Docking",
      cenario:
        "Um Centro de Distribuição (CD) de varejo adota uma estratégia onde os caminhões dos fornecedores descarregam as mercadorias de um lado do armazém e, em até 24 horas, essas mercadorias são separadas e carregadas diretamente nos veículos de entrega do outro lado do armazém, sem serem guardadas nas prateleiras.",
      instrucao:
        "Essa técnica é conhecida como Cross-Docking. Explique o principal benefício dessa estratégia (mínimo de 10 palavras). Você deve mencionar a redução de 'estoque', 'armazenagem' ou o aumento da 'agilidade/velocidade'.",
      campos: [
        {
          id: "cross-docking-beneficio",
          placeholder:
            "Ex: A vantagem do Cross-Docking é que a empresa elimina os custos de armazenagem, pois o produto não fica parado no estoque, ganhando agilidade na entrega...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /estoque|armazenagem|armazenar|tempo|rápido|rapidez|agilidade|custo|giro/i,
          },
          mensagemCerta:
            "Diagnóstico logístico perfeito! Evitar o estoque intermediário reduz drasticamente os custos de armazenagem e acelera a cadeia de distribuição.",
          mensagemErrada: "Mencione a economia gerada pela falta de 'estoque/armazenagem' ou o ganho de 'agilidade/tempo' na entrega.",
        },
      ],
    },
    {
      id: "roteirizacao",
      titulo: "Roteirização de Entregas",
      cenario:
        "A roteirização reduz os custos de combustível e otimiza o tempo da frota. Utilize o Google Maps (My Maps) ou uma aba do Google Sheets para criar uma rota simulada ou uma tabela de controle de entregas, com pelo menos 3 paradas em bairros diferentes da sua cidade.",
      instrucao: "Cole abaixo o link público da sua rota (Google Maps) ou planilha (Google Sheets).",
      campos: [
        {
          id: "roteirizacao-link",
          placeholder: "https://www.google.com/maps/d/u/0/... ou docs.google.com/spreadsheets/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(google\.com\/maps|docs\.google\.com\/spreadsheets)\/.+/i },
          mensagemCerta: "Link validado! O uso de ferramentas digitais é crucial para estruturar rotas eficientes e baratear o frete.",
          mensagemErrada: "URL inválida. Certifique-se de colar o link público do Google Maps (maps) ou Google Sheets (spreadsheets).",
        },
      ],
    },
  ],
};

export default atividade;
