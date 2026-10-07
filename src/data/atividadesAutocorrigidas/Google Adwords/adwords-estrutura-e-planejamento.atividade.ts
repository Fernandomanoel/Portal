import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculo, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const PLANO = [
  ["Pesquisa — Serviços", "Rede de Pesquisa", 40],
  ["Pesquisa — Nome da loja", "Rede de Pesquisa", 15],
  ["Remarketing", "Rede de Display", 20],
  ["Institucional", "Vídeo", 25],
];
const DIARIO = somar(PLANO.map((l) => l[2] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Entrando no Mundo do AdWords: Estrutura e Planejamento",
  introducao:
    "O Google Ads (antigo AdWords) coloca anúncios diante de quem está procurando o que você vende. Conheça a estrutura de uma conta, os tipos de campanha e como planejar a divulgação antes de gastar um centavo. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    associar({
      id: "estrutura",
      titulo: "Hierarquia da conta",
      instrucao: "Associe cada nível da conta à sua função.",
      opcoes: ["Conta", "Campanha", "Grupo de anúncios"],
      linhas: [
        { id: "conta", rotulo: "Nível mais alto: reúne e-mail de acesso, forma de pagamento e todas as campanhas.", correta: 0 },
        { id: "campanha", rotulo: "Define orçamento, rede, localização e objetivo.", correta: 1 },
        { id: "grupo", rotulo: "Reúne anúncios e palavras-chave de um mesmo tema.", correta: 2 },
      ],
      explicacao: "Conta > campanhas > grupos de anúncios > anúncios e palavras-chave. Organizar bem essa estrutura facilita medir e otimizar.",
    }),
    associar({
      id: "tipos-campanha",
      titulo: "Tipos de campanha",
      instrucao: "Associe o tipo de campanha ao onde o anúncio aparece.",
      opcoes: ["Rede de Pesquisa", "Rede de Display", "Vídeo", "Shopping"],
      linhas: [
        { id: "pesquisa", rotulo: "Anúncios de texto nos resultados de uma busca no Google.", correta: 0 },
        { id: "display", rotulo: "Banners em sites, blogs e aplicativos parceiros.", correta: 1 },
        { id: "video", rotulo: "Anúncios em vídeo, como os do YouTube.", correta: 2 },
        { id: "shopping", rotulo: "Anúncios com foto, preço e loja de produtos.", correta: 3 },
      ],
      explicacao: "Cada tipo atinge o público em um momento diferente: quem busca (pesquisa), quem navega (display), quem assiste (vídeo) e quem compara produtos (shopping).",
    }),
    escolha({
      id: "pagamento",
      titulo: "Como se paga",
      instrucao: "Na Rede de Pesquisa, o anunciante paga principalmente...",
      opcoes: [
        "Uma mensalidade fixa ao Google, independente dos resultados.",
        "Cada vez que alguém clica no anúncio (custo por clique, CPC).",
        "Apenas quando o produto é entregue.",
        "Somente quando o anúncio aparece em primeiro lugar.",
      ],
      correta: 1,
      explicacao: "No modelo CPC, o anúncio pode aparecer muitas vezes sem custo; o gasto acontece quando há clique.",
    }),
    calculo({
      id: "orcamento",
      titulo: "Orçamento do mês",
      cenario: "Uma loja define um orçamento diário de R$ 20,00 para a campanha. Considere um mês de 30 dias.",
      instrucao: "Qual é o gasto máximo esperado no mês?",
      rotulo: "Gasto no mês (R$)",
      esperado: 600,
      explicacao: "20 × 30 = 600. O Google pode gastar até o dobro do orçamento diário em um dia, mas o total do mês respeita a média.",
    }),
    resposta({
      id: "planejar",
      titulo: "Planeje a sua campanha",
      cenario: "Uma clínica de estética quer atrair novos clientes na própria cidade.",
      instrucao: "Defina o objetivo, o público e o tipo de campanha que você usaria, e justifique.",
      rotulo: "Seu planejamento",
      placeholder: "Objetivo: ... Público: ... Tipo de campanha: ... Porque ...",
      chave: /(objetivo|p[uú]blico|pesquisa|display|campanha)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "orcamento-campanhas",
      titulo: "Planilha: orçamento das campanhas da conta",
      cenario: "Uma loja planeja quatro campanhas na conta do Google Ads, cada uma com orçamento diário. Cole a planilha no Excel e considere o mês de 30 dias.",
      colunas: ["Campanha", "Tipo", "Orçamento diário (R$)"],
      linhas: PLANO,
      instrucao: "Calcule:",
      tarefas: [
        { id: "diario", rotulo: "Orçamento diário total (R$)", valor: DIARIO, explicacao: "Soma da coluna Orçamento diário." },
        { id: "mensal", rotulo: "Gasto máximo esperado no mês (R$)", valor: DIARIO * 30, explicacao: "Orçamento diário total × 30." },
        { id: "peso-servicos", rotulo: "Participação da campanha Pesquisa — Serviços no orçamento (%)", valor: (40 / DIARIO) * 100, explicacao: "40 ÷ 100 × 100 = 40%." },
        { id: "corte", rotulo: "Quanto cortar por dia para a conta ficar em R$ 80,00 diários (R$)", valor: DIARIO - 80, explicacao: "Orçamento diário atual menos 80." },
      ],
    }),
    dissertativa({
      id: "planejar-conta",
      titulo: "Planejamento da conta",
      instrucao: "Defenda a divisão do orçamento entre as quatro campanhas e proponha o que mudaria.",
      deve: [
        "Explique o papel de cada tipo de campanha (pesquisa, display, vídeo) e para que público serve.",
        "Diga se mudaria a divisão do orçamento e justifique com o objetivo da loja.",
        "Defina como mediria o sucesso de cada campanha (métrica e meta).",
      ],
      chave: /(pesquisa|display|v[ií]deo|objetivo|p[uú]blico|meta|m[eé]trica|or[cç]amento)/i,
    }),
  ],
};

export default atividade;
