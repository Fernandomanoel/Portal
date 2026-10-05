import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { calculos, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Locais, Palavras-chave e Investimento",
  introducao:
    "Melhorar o desempenho é mostrar o anúncio ao público certo, com as palavras certas, ajustando o dinheiro para onde ele dá mais resultado.",
  itens: [
    escolha({
      id: "programacao",
      titulo: "Horário dos anúncios",
      cenario: "Uma escola de idiomas recebe a maioria das ligações de segunda a sexta, das 8h às 20h.",
      instrucao: "Que ajuste evita desperdício de verba?",
      opcoes: [
        "Exibir anúncios 24 horas, todos os dias.",
        "Programar os anúncios para os dias e horários em que a escola atende.",
        "Desligar a campanha.",
        "Gastar mais de madrugada.",
      ],
      correta: 1,
      explicacao: "Anúncio com telefone aparecendo quando ninguém atende gera cliques perdidos.",
    }),
    escolha({
      id: "palavras-chave",
      titulo: "Escolhendo palavras-chave",
      cenario: "Uma loja vende tênis de corrida para homens.",
      instrucao: "Qual palavra-chave tende a atrair um cliente mais próximo da compra?",
      opcoes: ["tênis", "corrida", "comprar tênis de corrida masculino", "esporte"],
      correta: 2,
      explicacao: "Termos longos e específicos mostram intenção de compra e tendem a ter menos concorrência e cliques mais qualificados.",
    }),
    escolha({
      id: "negativas",
      titulo: "Palavras-chave negativas",
      cenario: "A loja não vende tênis usados nem faz conserto.",
      instrucao: "Para que servem as palavras-chave negativas, como «usado» e «conserto»?",
      opcoes: [
        "Para o anúncio aparecer mais vezes nessas buscas.",
        "Para impedir que o anúncio apareça em buscas que não têm a ver com o que se vende.",
        "Para reduzir o nome da empresa.",
        "Para apagar o histórico da campanha.",
      ],
      correta: 1,
      explicacao: "Negativar termos irrelevantes poupa cliques que nunca virariam venda.",
    }),
    calculos({
      id: "ajuste-lance",
      titulo: "Ajustando o lance",
      cenario: "O CPC máximo definido é R$ 1,50. Os usuários de celular convertem melhor, e o gestor decide aumentar o lance em 20% para esse público.",
      instrucao: "Qual é o novo CPC máximo para celulares? E quanto custaria 100 cliques, se todos fossem cobrados nesse valor?",
      campos: [
        { id: "novo-lance", rotulo: "Novo CPC máximo (R$)", esperado: 1.8, explicacao: "1,50 × 1,20 = 1,80." },
        { id: "cem-cliques", rotulo: "Custo de 100 cliques (R$)", esperado: 180, explicacao: "100 × 1,80 = 180 (no máximo: o valor cobrado costuma ser menor que o lance)." },
      ],
    }),
    escolha({
      id: "realocar",
      titulo: "Onde colocar o dinheiro",
      cenario: "O grupo A trouxe 40 vendas com R$ 400 e o grupo B trouxe 5 vendas com R$ 400.",
      instrucao: "O que o gestor deve fazer?",
      opcoes: [
        "Aumentar o investimento no grupo B.",
        "Mover parte da verba do grupo B para o grupo A e investigar por que o B rende pouco.",
        "Dividir o dinheiro igualmente, sempre.",
        "Pausar a campanha inteira.",
      ],
      correta: 1,
      explicacao: "Investir onde há retorno e corrigir o que não funciona é a essência da otimização.",
    }),
    resposta({
      id: "lista-palavras",
      titulo: "Monte uma lista",
      cenario: "Um escritório de contabilidade quer atrair micro e pequenas empresas da cidade.",
      instrucao: "Escreva 4 palavras-chave que você usaria e 2 palavras negativas.",
      rotulo: "Sua lista",
      placeholder: "Palavras: contador para mei, abrir empresa... Negativas: curso, gratuito...",
      minPalavras: 8,
    }),
  ],
};

export default atividade;
