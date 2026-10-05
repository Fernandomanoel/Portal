import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Google Ads — Grupos de Anúncios, Status e Tipos de Correspondência",
  introducao:
    "Grupos de anúncios bem organizados, anúncios aprovados e o tipo de correspondência certo definem quem vê o seu anúncio e quanto isso custa.",
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
    escolha({
      id: "controle",
      titulo: "Controle x alcance",
      instrucao: "Para ter o máximo de controle sobre quem vê o anúncio, qual correspondência usar?",
      opcoes: ["Ampla", "Exata", "Nenhuma", "Todas as palavras negativas"],
      correta: 1,
      explicacao: "A correspondência exata limita o anúncio a buscas muito próximas da palavra definida.",
    }),
    resposta({
      id: "estrutura",
      titulo: "Estruture um grupo",
      cenario: "Uma escola de música oferece aulas de violão, piano e bateria.",
      instrucao: "Escreva o nome de um grupo de anúncios, duas palavras-chave (com o tipo de correspondência) e um título de anúncio.",
      rotulo: "Seu grupo",
      placeholder: "Grupo: Aulas de violão. Palavras: [aulas de violão], \"curso de violão\". Título: Aulas de Violão...",
      chave: /(violão|piano|bateria|aula|curso)/i,
      minPalavras: 8,
    }),
  ],
};

export default atividade;
