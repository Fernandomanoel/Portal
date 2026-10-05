import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Entrando no Mundo do AdWords: Estrutura e Planejamento",
  introducao:
    "O Google Ads (antigo AdWords) coloca anúncios diante de quem está procurando o que você vende. Conheça a estrutura de uma conta, os tipos de campanha e como planejar a divulgação antes de gastar um centavo.",
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
    escolha({
      id: "objetivo",
      titulo: "Planejar a divulgação",
      instrucao: "Qual é o primeiro passo para planejar uma campanha?",
      opcoes: [
        "Escolher a cor do botão do anúncio.",
        "Definir o objetivo (vendas, contatos, visitas ao site) e o público que se quer atingir.",
        "Gastar todo o orçamento no primeiro dia.",
        "Copiar o anúncio de um concorrente.",
      ],
      correta: 1,
      explicacao: "O objetivo define a rede, as palavras-chave e a forma de medir o sucesso.",
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
      minPalavras: 12,
    }),
  ],
};

export default atividade;
