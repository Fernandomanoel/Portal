import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Compras e estoque garantem que a empresa tenha o que precisa, na quantidade certa, no momento certo, pelo melhor custo. O curso cobre o ciclo de compras (requisição, cotação, pedido), compras públicas, controle e inventário, curva ABC, recebimento, armazenagem, separação e noções de qualidade.",
  topicos: [
    {
      titulo: "Conceitos de estoque",
      texto: [
        "Estoque é o conjunto de materiais guardados para uso ou venda. Existe por causa da diferença entre o tempo de reposição e o ritmo do consumo. Estoque demais prende dinheiro, ocupa espaço e pode vencer ou estragar; estoque de menos causa falta e perda de venda.",
        "Parâmetros: estoque mínimo (nível abaixo do qual há risco de falta), estoque de segurança (proteção contra atraso e variação), ponto de pedido (quando comprar) e lote de compra (quanto comprar). Ponto de pedido = consumo médio × prazo de reposição + estoque de segurança.",
      ],
      pontos: ["Calcular ponto de pedido.", "Explicar os riscos de estoque excessivo e de falta."],
      atividades: ["compras-conceitos-de-estoque"],
    },
    {
      titulo: "Ciclo de compras, cotação e fornecedores",
      texto: [
        "O ciclo começa com a requisição do setor que precisa; o comprador faz a cotação (pede preços a vários fornecedores) e monta o mapa de cotação comparando preço, prazo, frete, condições de pagamento e qualidade. O menor preço nem sempre é a melhor compra: frete e prazo contam. Depois vêm a aprovação, o pedido de compra e o acompanhamento até o recebimento.",
        "Avaliar fornecedores por cumprimento de prazo, qualidade e preço ajuda a decidir com quem comprar na próxima vez.",
      ],
      pontos: ["Montar um mapa de cotação.", "Somar frete ao preço antes de comparar."],
      atividades: ["compras-cotacao-profissional", "compras-gestao-setor-privado"],
    },
    {
      titulo: "Compras no setor público",
      texto: [
        "Órgãos públicos compram por licitação, para garantir igualdade entre os fornecedores e a escolha da proposta mais vantajosa. Existem modalidades (como o pregão, para bens e serviços comuns) e regras de publicidade, prazos e documentação. As regras mudam com a legislação: confira a norma vigente.",
      ],
      pontos: ["Explicar por que órgãos públicos usam licitação.", "Conferir o resultado de um pregão simples."],
      atividades: ["compras-gestao-setor-publico"],
    },
    {
      titulo: "Controle de estoque, inventário e acuracidade",
      texto: [
        "Controla-se o estoque com fichas ou sistema: entrada, saída e saldo de cada item. Inventário é a contagem física, comparada ao saldo do sistema. Acuracidade = itens corretos ÷ itens contados × 100. Diferenças pedem investigação (erro de lançamento, perda, furto, troca de código).",
        "Os métodos de saída mais comuns são PEPS (primeiro que entra, primeiro que sai, indicado para validade), UEPS (último que entra, primeiro que sai) e custo médio.",
      ],
      pontos: ["Calcular a acuracidade.", "Explicar o PEPS e quando é obrigatório na prática (validade)."],
      atividades: ["compras-controle-de-estoque"],
    },
    {
      titulo: "Curva ABC",
      texto: [
        "A curva ABC ordena os itens pelo valor movimentado no período (consumo × custo). Classe A: poucos itens (cerca de 20%) que concentram a maior parte do valor (cerca de 80%); classe B: intermediários; classe C: muitos itens de pouco valor. Os itens A recebem controle rigoroso, os C, controle simples.",
      ],
      pontos: ["Classificar itens em A, B e C pelo valor acumulado."],
      atividades: ["compras-curva-abc"],
    },
    {
      titulo: "Recebimento, armazenagem e separação",
      texto: [
        "No recebimento confere-se a nota fiscal com o pedido de compra e com a mercadoria física (quantidade, qualidade, prazo de validade); qualquer divergência é registrada e comunicada. A armazenagem organiza endereços para achar rápido, respeitando peso, validade e segurança. A separação (picking) monta o pedido; erros aqui viram devolução.",
        "Sistemas de informação (código de barras, sistema de gestão) reduzem erros. A gestão da qualidade (ciclo PDCA e o programa 5S) busca melhorar continuamente o processo.",
      ],
      pontos: ["Descrever a conferência tríplice: nota, pedido e mercadoria.", "Citar o que o PDCA significa."],
      atividades: ["compras-recebimento-e-armazenagem", "compras-separacao-informatica-e-qualidade"],
    },
    {
      titulo: "Planilha de controle de estoque",
      texto: [
        "A planilha de estoque registra cadastro de itens, movimentos (entradas e saídas) e saldo, com alertas de abaixo do mínimo. Funções como PROCV, SOMASES e SE, mais validação de dados, evitam erro de código e quantidade.",
      ],
      pontos: ["Explicar como o saldo é calculado a partir dos movimentos."],
      erros: ["Digitar o saldo à mão em vez de calcular a partir dos movimentos."],
      atividades: ["compras-planilha-estoque-configurar", "compras-planilha-estoque-preencher"],
    },
  ],
  glossario: [
    { termo: "Ponto de pedido", definicao: "Nível de estoque que dispara uma nova compra." },
    { termo: "Estoque de segurança", definicao: "Quantidade extra para cobrir atrasos e picos de consumo." },
    { termo: "Acuracidade", definicao: "Porcentagem de itens cujo saldo do sistema confere com a contagem física." },
    { termo: "PEPS", definicao: "Primeiro que entra, primeiro que sai." },
    { termo: "Curva ABC", definicao: "Classificação dos itens pela importância em valor." },
    { termo: "Mapa de cotação", definicao: "Quadro que compara propostas de fornecedores." },
  ],
  dicas: [
    "Monte um mini almoxarifado na sala (caixas de material) e faça um inventário de verdade.",
    "Peça sempre que o aluno cite o efeito do erro: «se o saldo está errado, o que acontece com a compra?».",
    "Nas simulações de setor público, lembre que a lei muda: ensine o raciocínio e consulte a regra vigente.",
  ],
};

export default conteudo;
