import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, associar, resposta, planilha, dissertativa } from "../ajudantes";

const TERMOS = [
  ["Violão", "[aulas de violão]", "Exata", 3200, 224, 201.6],
  ["Violão", "\"curso de violão\"", "Frase", 5400, 270, 270],
  ["Violão", "violão iniciante", "Ampla", 12000, 240, 312],
  ["Piano", "[aulas de piano]", "Exata", 2100, 126, 138.6],
  ["Piano", "piano barato", "Ampla", 9000, 90, 135],
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Grupos de Anúncios, Status e Tipos de Correspondência",
  introducao:
    "Grupos de anúncios bem organizados, anúncios aprovados e o tipo de correspondência certo definem quem vê o seu anúncio e quanto isso custa. A planilha vem dentro da própria atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    escolha({
      id: "grupos",
      titulo: "Como organizar grupos",
      cenario: "Uma loja de móveis vende sofás, mesas e camas.",
      instrucao: "Qual é a melhor organização?",
      opcoes: [
        "Um único grupo com todas as palavras e todos os anúncios.",
        "Um grupo para cada tema (sofás, mesas, camas), com palavras-chave e anúncios específicos.",
        "Um grupo para cada letra do alfabeto.",
        "Nenhum grupo.",
      ],
      correta: 1,
      explicacao: "Grupos temáticos permitem anúncios mais relevantes, que ganham mais cliques e custam menos.",
    }),
    associar({
      id: "status",
      titulo: "Status do anúncio",
      instrucao: "Associe cada status ao seu significado.",
      opcoes: [
        "Aprovado: pode ser exibido normalmente",
        "Aprovado (limitado): pode aparecer, mas com restrições, por exemplo em certos países ou públicos",
        "Reprovado: não pode ser exibido até ser corrigido",
      ],
      linhas: [
        { id: "aprovado", rotulo: "O anúncio cumpre as políticas.", correta: 0 },
        { id: "limitado", rotulo: "O conteúdo exige restrições de exibição, como produtos com venda limitada.", correta: 1 },
        { id: "reprovado", rotulo: "O anúncio infringe uma política e precisa ser editado.", correta: 2 },
      ],
      explicacao: "Acompanhe o status: anúncio reprovado ou limitado reduz alcance e pode parar a campanha.",
    }),
    associar({
      id: "correspondencia",
      titulo: "Tipos de correspondência",
      instrucao: "Associe a forma de escrever a palavra-chave ao tipo.",
      opcoes: ["Ampla", "Frase", "Exata"],
      linhas: [
        { id: "ampla", rotulo: "sapato social masculino (sem símbolos)", correta: 0 },
        { id: "frase", rotulo: "\"sapato social masculino\" (entre aspas)", correta: 1 },
        { id: "exata", rotulo: "[sapato social masculino] (entre colchetes)", correta: 2 },
      ],
      explicacao: "Ampla alcança mais variações e exige atenção; frase e exata dão mais controle sobre o significado da busca.",
    }),
    resposta({
      id: "estrutura",
      titulo: "Estruture um grupo",
      cenario: "Uma escola de música oferece aulas de violão, piano e bateria.",
      instrucao: "Escreva o nome de um grupo de anúncios, duas palavras-chave (com o tipo de correspondência) e um título de anúncio.",
      rotulo: "Seu grupo",
      placeholder: "Grupo: Aulas de violão. Palavras: [aulas de violão], \"curso de violão\". Título: Aulas de Violão...",
      chave: /(violão|piano|bateria|aula|curso)/i,
      minPalavras: 15,
    }),
    planilha({
      id: "termos-de-pesquisa",
      titulo: "Planilha: desempenho das palavras-chave por grupo",
      cenario: "Uma escola de música tem dois grupos de anúncios. O relatório mostra cada palavra-chave com seu tipo de correspondência, impressões, cliques e custo. Cole a planilha no Excel e resolva.",
      colunas: ["Grupo", "Palavra-chave", "Correspondência", "Impressões", "Cliques", "Custo (R$)"],
      linhas: TERMOS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "ctr-exata", rotulo: "CTR de [aulas de violão] (%)", valor: (224 / 3200) * 100, explicacao: "224 ÷ 3.200 × 100 = 7%." },
        { id: "ctr-ampla", rotulo: "CTR de violão iniciante (%)", valor: (240 / 12000) * 100, explicacao: "240 ÷ 12.000 × 100 = 2%." },
        { id: "cpc-ampla", rotulo: "CPC de violão iniciante (R$)", valor: 312 / 240, explicacao: "312 ÷ 240 = 1,30." },
        { id: "custo-grupo-violao", rotulo: "Custo total do grupo Violão (R$)", valor: 201.6 + 270 + 312, explicacao: "Soma do custo das três palavras do grupo Violão." },
      ],
    }),
    dissertativa({
      id: "correspondencia-decisao",
      titulo: "Controlando a correspondência",
      instrucao: "Escreva uma análise sobre o efeito do tipo de correspondência nos resultados e o que você mudaria.",
      deve: [
        "Compare o CTR e o CPC das palavras exatas, de frase e amplas.",
        "Explique por que a correspondência ampla trouxe mais impressões, mas menos cliques proporcionais.",
        "Proponha ao menos duas palavras negativas para o grupo Piano (por exemplo, termos de «barato» ou «grátis») e justifique.",
      ],
      chave: /(exata|frase|ampla|negativ|ctr|cpc|impress|grátis|gr[aá]tis|barato)/i,
    }),
  ],
};

export default atividade;
