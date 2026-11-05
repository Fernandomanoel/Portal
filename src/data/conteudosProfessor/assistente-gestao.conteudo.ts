import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso apresenta a visão de gestão de uma pequena e média empresa: vendas e atendimento, logística e cadeia de suprimentos, estoques e indicadores. A meta é que o aluno entenda como as áreas se conectam e tome decisões simples com números.",
  topicos: [
    {
      titulo: "Gestão empresarial e visão sistêmica",
      texto: [
        "Gestão é decidir com base em objetivos e informação. A empresa funciona como um sistema: a venda gera pedido, o pedido gera compra e separação de mercadoria, que gera entrega e cobrança. Se uma área falha, as outras sentem.",
        "O planejamento estratégico define aonde a empresa quer chegar (missão, visão, valores, metas) e os planos operacionais dizem como (quem faz, até quando, com qual recurso).",
      ],
      pontos: ["Explicar missão, visão e valores.", "Mostrar como uma falha de uma área afeta as outras."],
      atividades: ["assistente-gestao-tecnicas-vendas", "assistente-gestao-empresarial-estrategica"],
    },
    {
      titulo: "Vendas, metas e comissões",
      texto: [
        "O vendedor moderno trabalha de forma consultiva: pergunta, entende a necessidade e só depois oferece. O processo de venda passa por abordagem, descoberta, apresentação, tratamento de objeções, fechamento e pós-venda.",
        "A meta define quanto vender num período. A comissão é a parte da venda paga ao vendedor, normalmente um percentual (por exemplo 3% sobre o valor vendido). Comissão = valor vendido × percentual. Há metas escalonadas: o percentual aumenta ao passar de certos patamares.",
      ],
      pontos: ["Calcular comissão e atingimento de meta.", "Descrever as etapas da venda consultiva."],
      exemplo: "Vendas de R$ 40.000 com comissão de 2,5% rendem R$ 1.000. Meta de R$ 50.000: atingimento de 80%.",
      atividades: ["assistente-gestao-tecnicas-vendas"],
    },
    {
      titulo: "Logística e cadeia de suprimentos",
      texto: [
        "Logística cuida do fluxo de materiais e informações do fornecedor ao cliente. Inbound é o que entra (compras, recebimento); outbound, o que sai (separação, expedição, entrega). A cadeia de suprimentos (supply chain) é o conjunto de empresas envolvidas, do fornecedor da matéria-prima ao consumidor.",
        "Modais de transporte são rodoviário (flexível e o mais usado no Brasil), ferroviário, aquaviário e aéreo (rápido e caro). A escolha pesa custo, prazo, volume e tipo de carga. Cross-docking é a prática de receber a mercadoria e já direcioná-la à expedição, sem estocar.",
      ],
      pontos: ["Distinguir inbound e outbound.", "Escolher modal pelo custo e pelo prazo.", "Explicar cross-docking."],
      atividades: ["assistente-gestao-logistica-supply-chain", "assistente-gestao-logistica-operacoes-2", "assistente-gestao-desafios-logisticos"],
    },
    {
      titulo: "Estoques, reposição e logística reversa",
      texto: [
        "Estoque guarda o que atende à demanda, mas custa dinheiro. O ponto de pedido diz quando comprar de novo: ponto de pedido = consumo médio diário × prazo de entrega + estoque de segurança. O estoque de segurança protege de atrasos e picos de venda.",
        "Logística reversa é o caminho de volta: devoluções, trocas, recolhimento de embalagens e produtos usados para reaproveitamento ou descarte correto.",
      ],
      pontos: ["Calcular o ponto de pedido.", "Explicar o papel do estoque de segurança.", "Dar um exemplo de logística reversa."],
      exemplo: "Vende 20 unidades por dia, entrega em 5 dias, segurança de 30: ponto de pedido = 20 × 5 + 30 = 130 unidades.",
      atividades: ["assistente-gestao-logistica-supply-chain"],
    },
    {
      titulo: "Indicadores logísticos: OTIF e cubagem",
      texto: [
        "OTIF (On Time In Full) mede as entregas feitas no prazo e completas: entregas OTIF ÷ total de entregas × 100. Cubagem é o volume ocupado pela carga (comprimento × largura × altura), usada no cálculo do frete: muitas transportadoras cobram pelo maior entre o peso real e o peso cubado.",
      ],
      pontos: ["Calcular OTIF.", "Calcular o volume de uma caixa."],
      exemplo: "80 entregas completas e no prazo em 100: OTIF de 80%. Caixa 50 × 40 × 30 cm = 60.000 cm³ = 0,06 m³.",
      atividades: ["assistente-gestao-logistica-operacoes-2"],
    },
  ],
  glossario: [
    { termo: "Supply chain", definicao: "Cadeia de suprimentos: todas as etapas do fornecedor ao consumidor." },
    { termo: "Inbound / Outbound", definicao: "Logística de entrada (compras) e de saída (entrega)." },
    { termo: "Cross-docking", definicao: "Receber e expedir a mercadoria sem estocar." },
    { termo: "OTIF", definicao: "Entregas no prazo e completas, em porcentagem." },
    { termo: "Estoque de segurança", definicao: "Quantidade extra para cobrir atrasos e picos de demanda." },
    { termo: "Logística reversa", definicao: "Retorno de produtos e embalagens ao fabricante ou ao descarte correto." },
  ],
  dicas: [
    "Use a própria escola como exemplo de empresa: o que entra (material), o que sai (formados), o estoque (apostilas).",
    "Nos cálculos, peça que o aluno escreva a fórmula antes dos números.",
    "Lembre que as simulações logísticas são cenários: não há uma única resposta certa, e o aluno deve justificar a decisão.",
  ],
};

export default conteudo;
