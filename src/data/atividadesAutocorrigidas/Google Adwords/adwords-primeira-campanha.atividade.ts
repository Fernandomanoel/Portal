import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Iniciando a Primeira Campanha",
  introducao:
    "Criar a primeira campanha é decidir o objetivo, a rede, o local, o orçamento e como o lance será feito. Pratique o raciocínio da criação e estime o resultado em números.",
  itens: [
    escolha({
      id: "passos",
      titulo: "O que se define ao criar a campanha",
      instrucao: "Qual conjunto de itens é definido na criação de uma campanha de pesquisa?",
      opcoes: [
        "Objetivo, rede, locais e idiomas, orçamento e estratégia de lances.",
        "Apenas o nome do dono da empresa.",
        "Somente a cor do anúncio.",
        "Nada: o Google decide tudo.",
      ],
      correta: 0,
      explicacao: "Esses cinco pontos determinam onde, para quem e a que custo o anúncio será exibido.",
    }),
    escolha({
      id: "leilao",
      titulo: "O leilão de anúncios",
      cenario: "Toda vez que alguém faz uma busca, o Google realiza um leilão para decidir quais anúncios aparecem e em qual posição.",
      instrucao: "O que decide a posição do anúncio no leilão?",
      opcoes: [
        "Só o valor do lance: quem paga mais sempre fica em primeiro.",
        "O lance combinado com a qualidade do anúncio (relevância, taxa de cliques esperada e experiência na página de destino).",
        "A ordem em que os anunciantes se cadastraram.",
        "Sorteio.",
      ],
      correta: 1,
      explicacao: "Anúncios relevantes e uma boa página podem superar quem apenas paga mais caro, e ainda reduzem o custo por clique.",
    }),
    calculos({
      id: "estimativa",
      titulo: "Estimando resultados",
      cenario: "O planejamento prevê 5.000 impressões na semana, uma taxa de cliques (CTR) de 3% e custo médio de R$ 1,20 por clique.",
      instrucao: "Calcule os cliques esperados e o custo total da semana.",
      campos: [
        { id: "cliques", rotulo: "Cliques esperados", esperado: 150, tolerancia: 0, explicacao: "5.000 × 0,03 = 150 cliques." },
        { id: "custo", rotulo: "Custo da semana (R$)", esperado: 180, explicacao: "150 × 1,20 = 180." },
      ],
    }),
    escolha({
      id: "local",
      titulo: "Escolhendo onde anunciar",
      cenario: "Uma pizzaria atende apenas em um bairro e arredores.",
      instrucao: "Como deve ser a segmentação geográfica da campanha?",
      opcoes: [
        "O país inteiro, para aparecer para todos.",
        "Um raio em torno do bairro, onde a entrega é possível.",
        "Somente outros países.",
        "Nenhuma segmentação.",
      ],
      correta: 1,
      explicacao: "Mostrar o anúncio a quem não pode ser atendido desperdiça cliques e orçamento.",
    }),
    resposta({
      id: "titulo-anuncio",
      titulo: "Escreva um anúncio de pesquisa",
      cenario: "Uma loja de bicicletas quer anunciar revisão completa com preço fixo.",
      instrucao: "Escreva um título curto (até 30 caracteres) e uma descrição que chamem o cliente para a ação.",
      rotulo: "Título e descrição",
      placeholder: "Título: Revisão de Bicicleta | Descrição: Agende hoje a revisão completa por preço fixo...",
      chave: /(revis[aã]o|bicicleta|agende|ligue|or[cç]amento|compre)/i,
      minPalavras: 8,
    }),
  ],
};

export default atividade;
