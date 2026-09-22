import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Logística e Supply Chain",
  introducao: "Logística Inbound/Outbound, gestão de estoques, cálculo de reposição e logística reversa.",
  itens: [
    {
      id: "fluxos-cadeia-suprimentos",
      titulo: "Fluxos da Cadeia de Suprimentos",
      cenario: "A logística atua em diferentes frentes de uma empresa.",
      instrucao: "Associe a atividade descrita ao seu respectivo fluxo logístico (Inbound, Outbound ou Reversa).",
      campos: [
        {
          id: "fluxos-cadeia-suprimentos-row1",
          rotulo: "Gerenciamento do transporte de matérias-primas dos fornecedores até a fábrica para a linha de produção.",
          regra: {
            tipo: "selecao",
            esperado: "inbound",
            opcoes: [
              { valor: "inbound", texto: "Logística Inbound (Suprimentos)" },
              { valor: "outbound", texto: "Logística Outbound (Distribuição)" },
              { valor: "reversa", texto: "Logística Reversa" },
            ],
          },
          mensagemCerta: "Correto! Inbound é a entrada de insumos, Outbound é a saída/distribuição, e Reversa é o retorno.",
          mensagemErrada: "Incorreto. Revise os conceitos: Recebimento = Inbound; Entrega ao cliente = Outbound; Retorno = Reversa.",
        },
        {
          id: "fluxos-cadeia-suprimentos-row2",
          rotulo: "Planejamento de rotas e entrega do produto final acabado aos centros de distribuição e clientes finais.",
          regra: {
            tipo: "selecao",
            esperado: "outbound",
            opcoes: [
              { valor: "inbound", texto: "Logística Inbound (Suprimentos)" },
              { valor: "outbound", texto: "Logística Outbound (Distribuição)" },
              { valor: "reversa", texto: "Logística Reversa" },
            ],
          },
          mensagemCerta: "Correto! Inbound é a entrada de insumos, Outbound é a saída/distribuição, e Reversa é o retorno.",
          mensagemErrada: "Incorreto. Revise os conceitos: Recebimento = Inbound; Entrega ao cliente = Outbound; Retorno = Reversa.",
        },
        {
          id: "fluxos-cadeia-suprimentos-row3",
          rotulo: "Retorno de produtos com defeito e recolhimento de embalagens vazias para reciclagem e descarte adequado.",
          regra: {
            tipo: "selecao",
            esperado: "reversa",
            opcoes: [
              { valor: "inbound", texto: "Logística Inbound (Suprimentos)" },
              { valor: "outbound", texto: "Logística Outbound (Distribuição)" },
              { valor: "reversa", texto: "Logística Reversa" },
            ],
          },
          mensagemCerta: "Correto! Inbound é a entrada de insumos, Outbound é a saída/distribuição, e Reversa é o retorno.",
          mensagemErrada: "Incorreto. Revise os conceitos: Recebimento = Inbound; Entrega ao cliente = Outbound; Retorno = Reversa.",
        },
      ],
    },
    {
      id: "metodos-armazenagem",
      titulo: "Métodos de Armazenagem",
      instrucao: "Avalie as metodologias de controle de estoque e produção como Verdadeira (V) ou Falsa (F).",
      campos: [
        {
          id: "metodos-armazenagem-row1",
          rotulo:
            "1. O método PEPS (Primeiro a Entrar, Primeiro a Sair / FIFO) é o mais recomendado para a armazenagem e venda de produtos perecíveis, como alimentos e medicamentos.",
          regra: {
            tipo: "selecao",
            esperado: "V",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Excelente! PEPS previne perdas por validade (V). Just-in-Time faz exatamente o oposto: busca o estoque mínimo/zero (F).",
          mensagemErrada:
            "Atenção: O PEPS é vital para perecíveis (Afirmação 1 é Verdadeira). O Just-in-Time foca em estoque MÍNIMO, e não estoques gigantescos (Afirmação 2 é Falsa).",
        },
        {
          id: "metodos-armazenagem-row2",
          rotulo:
            "2. No sistema \"Just-in-Time\" (JIT), o objetivo principal é manter estoques gigantescos e abarrotados para garantir que nunca falte produto, ignorando os custos de armazenagem.",
          regra: {
            tipo: "selecao",
            esperado: "F",
            opcoes: [
              { valor: "V", texto: "Verdadeiro (V)" },
              { valor: "F", texto: "Falso (F)" },
            ],
          },
          mensagemCerta: "Excelente! PEPS previne perdas por validade (V). Just-in-Time faz exatamente o oposto: busca o estoque mínimo/zero (F).",
          mensagemErrada:
            "Atenção: O PEPS é vital para perecíveis (Afirmação 1 é Verdadeira). O Just-in-Time foca em estoque MÍNIMO, e não estoques gigantescos (Afirmação 2 é Falsa).",
        },
      ],
    },
    {
      id: "ponto-de-pedido",
      titulo: "Ponto de Pedido (PP)",
      cenario:
        "O Ponto de Pedido indica o momento exato em que um novo lote de compras deve ser solicitado para que o estoque não zere. A fórmula é: PP = (Demanda Diária × Lead Time) + Estoque de Segurança.",
      instrucao: "Ficha de Controle de Estoque - Produto X. Calcule e digite o valor do Ponto de Pedido exato em unidades.",
      tabelaReferencia: {
        colunas: ["Variável", "Valor"],
        linhas: [
          ["Demanda Diária (vendas por dia)", "10 unidades"],
          ["Lead Time (Tempo de entrega do fornecedor)", "5 dias"],
          ["Estoque de Segurança (reserva técnica)", "20 unidades"],
          ["Fórmula aplicada", "(10 × 5) + 20"],
        ],
      },
      campos: [
        {
          id: "ponto-pedido",
          placeholder: "Digite apenas o número...",
          regra: { tipo: "numero", esperado: 70 },
          mensagemCerta: "Cálculo exato! (10 Demanda x 5 Lead Time) = 50. Somando ao Estoque de Segurança (20) = 70 unidades.",
          mensagemErrada: "Incorreto. Multiplique a demanda pelo Lead Time e DEPOIS some o estoque de segurança (10x5 + 20).",
        },
      ],
    },
    {
      id: "crise-ecommerce",
      titulo: "Gestão de Crise no E-commerce",
      cenario:
        "Um grande e-commerce de moda enfrentou um problema no mês de Black Friday: 15% das roupas vendidas foram devolvidas pelos clientes por problemas de tamanho ou defeitos de fabricação.",
      instrucao:
        "Como analista de logística, descreva qual processo deve ser estruturado para lidar com essa situação. (Dica: utilize termos como \"logística reversa\", \"devolução\", \"troca\" ou \"inspeção\").",
      campos: [
        {
          id: "crise-ecommerce-resposta",
          placeholder:
            "Ex: Para solucionar o problema, a empresa deve estruturar um processo eficiente de logística reversa para facilitar a devolução ou troca dos produtos...",
          regra: {
            tipo: "texto",
            minPalavras: 8,
            minCaracteres: 30,
            palavrasChave: /reversa|devolução|troca|inspeção|retorno|pós-venda|sustentabilidade/i,
          },
          mensagemCerta:
            "Diagnóstico perfeito! A Logística Reversa estruturada garante que a devolução/troca ocorra de forma rápida, mantendo a satisfação do cliente no pós-venda.",
          mensagemErrada: "Ação essencial faltando. Você deve citar processos de 'logística reversa', 'devolução', 'troca' ou 'inspeção' do material.",
        },
      ],
    },
    {
      id: "picking-packing",
      titulo: "Mapeamento de Processos (Picking e Packing)",
      cenario:
        "Organizar visualmente as etapas de Separação (Picking) e Embalagem (Packing) reduz erros operacionais. Utilize o Trello para criar um quadro Kanban simples com as etapas do pedido (ex: Recebido, Em Separação, Embalado, Despachado) ou o Canva para desenhar um fluxograma.",
      instrucao: "Cole abaixo o link público do seu Kanban ou Fluxograma gerado.",
      campos: [
        {
          id: "picking-packing-link",
          placeholder: "https://trello.com/b/... ou https://www.canva.com/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\/(www\.)?(trello\.com|canva\.com)\/.+/i },
          mensagemCerta: "Link validado! Mapear as etapas visualmente ajuda a eliminar gargalos operacionais no armazém.",
          mensagemErrada: "URL inválida. Certifique-se de colar o link público do Trello (trello.com) ou do Canva (canva.com).",
        },
      ],
    },
  ],
};

export default atividade;
