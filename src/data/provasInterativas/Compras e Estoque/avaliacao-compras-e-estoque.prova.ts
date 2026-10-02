import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Compras e Estoque/
 * prova-compras-e-estoque.prova.html): mesmas 10 questões e o mesmo gabarito
 * do HTML original (`const gabarito`/`PRATICAS`). As três questões práticas
 * (8, 9, 10) já eram dissertativas por natureza no original — viraram
 * dissertativa autocorrigida aqui, com a decisão final (a única parte do
 * cálculo expressável como uma frase curta) como resposta aceita; o cálculo
 * em si o professor confere se a questão cair "a revisar". Mais duas das
 * perguntas objetivas também viraram dissertativa, para fechar a metade.
 */
const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Avaliação — Compras e Estoque",
  perguntas: [
    {
      pergunta: "Ao comparar propostas no mapa de cotação, é correto afirmar:",
      opcoes: [
        "Vence sempre o menor preço unitário, pois os demais custos são iguais para todos os fornecedores.",
        "Basta comparar preço e prazo de entrega; o frete é sempre absorvido pelo fornecedor da mercadoria.",
        "Vence o menor custo total: preço, frete, impostos, prazo de entrega e condição de pagamento juntos.",
        "O prazo de pagamento não deve pesar na decisão, já que ele não altera o valor final do que é pago.",
      ],
      correta: 2,
    },
    {
      pergunta: "Sobre a diferença entre requisição de compra e pedido de compra:",
      opcoes: [
        "A requisição é interna e nasce da necessidade da área; o pedido é o documento enviado ao fornecedor.",
        "A requisição é enviada ao fornecedor para cotar preços; o pedido é o documento que circula internamente.",
        "São o mesmo documento com nomes diferentes, um usado na indústria e o outro usado no comércio.",
        "A requisição só existe em compras de valor alto; abaixo do limite, o comprador dispensa o documento.",
      ],
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta: "Sobre a homologação e a avaliação de fornecedores, o que se avalia além do preço ofertado?",
      respostasAceitas: ["capacidade de entrega, regularidade fiscal, qualidade e histórico", "qualidade e histórico"],
    },
    {
      pergunta: "Sobre o lote econômico de compra (LEC), é correto afirmar:",
      opcoes: [
        "Indica sempre o maior lote possível, já que comprar em grande quantidade reduz o preço unitário.",
        "Busca o ponto em que o custo de pedir e o custo de manter o estoque somados ficam no menor valor.",
        "Considera apenas o custo de emissão do pedido, pois o custo de armazenagem é um gasto fixo da empresa.",
        "Aplica-se somente a itens importados, em que o custo de cada processo de compra é bem mais alto.",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Um item passou a girar 18 vezes ao ano (antes girava 9), mas o setor registrou rupturas em 4 dos 12 meses. Qual é a leitura correta desse cenário?",
      opcoes: [
        "O resultado é ótimo: giro alto é sempre sinal de eficiência na gestão do estoque e das compras.",
        "O giro e a ruptura são indicadores independentes, de modo que um não ajuda a explicar o outro.",
        "A ruptura só teria relação com o giro se o item pertencesse à classe A da curva ABC do estoque.",
        "O giro subiu porque o estoque médio caiu demais; a ruptura mostra reposição mal dimensionada.",
      ],
      correta: 3,
    },
    {
      tipo: "dissertativa",
      pergunta: "Sobre a mercadoria recebida em consignação, quando a propriedade passa a ser da empresa?",
      respostasAceitas: [
        "só quando a mercadoria é efetivamente vendida",
        "fica fisicamente na empresa, mas a propriedade só passa quando vendida",
      ],
    },
    {
      pergunta: "Sobre os controles internos do setor de compras, é correto afirmar:",
      opcoes: [
        "Concentrar cotação, recebimento e pagamento em um só comprador agiliza o processo e reduz o erro.",
        "Quem compra não deve ser quem recebe e aprova o pagamento: a segregação de funções reduz fraude.",
        "Aceitar brindes do fornecedor é aceitável desde que o valor seja baixo e a compra saia mais barata.",
        "A cotação com três fornecedores é dispensável quando o comprador já conhece o preço de mercado.",
      ],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Mapa de cotação — a empresa vai comprar 500 unidades de um mesmo item. Custo total = (preço unitário × 500) + frete. " +
        "Fornecedor Alfa: R$ 9,80/un, frete R$ 350,00, entrega 10 dias. Fornecedor Beta: R$ 9,40/un, frete R$ 600,00, entrega 15 dias. " +
        "Fornecedor Gama: R$ 10,10/un, frete grátis, entrega 7 dias. Condição de pagamento igual nos três (30 dias). " +
        "Calcule o custo total do Fornecedor Alfa, do Fornecedor Gama, e diga qual proposta deve ser aprovada.",
      respostasAceitas: ["gama", "5.250", "5250", "5.050", "5050"],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Ponto de pedido — cartucho de tinta preta, consumo médio de 40 unidades por dia, prazo de entrega do fornecedor de 12 dias, " +
        "estoque de segurança de 150 unidades, saldo em estoque hoje de 700 unidades. Consumo no prazo de entrega = consumo médio × prazo de entrega. " +
        "Ponto de pedido = consumo no prazo de entrega + estoque de segurança. Calcule o ponto de pedido e diga se deve emitir a requisição agora ou aguardar.",
      respostasAceitas: ["aguardar"],
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Inventário — resma de papel A4 75g, saldo no sistema de 1.250 unidades, contagem física de 1.198 unidades (primeira contagem). " +
        "Divergência = saldo do sistema − contagem física. Acuracidade = (contagem física ÷ saldo do sistema) × 100. " +
        "Calcule a divergência, a acuracidade, e diga qual é o encaminhamento correto para essa diferença.",
      respostasAceitas: [
        "recontar o item, apurar a causa da diferença",
        "recontar e só então ajustar, com documento e aprovação",
        "95,8",
      ],
    },
  ],
};

export default prova;
