import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/word-coisas-da-vida.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Exercício 2 — Coisas da Vida",
  introducao: "Word",
  itens: [
    {
      id: "instrucoes",
      titulo: "Instruções",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Cria um documento no Word com o nome Texto1 e guarda-o na pasta Exercicios_Word.",
            "Para o título utiliza o tipo de letra Times New Roman, tamanho 14.",
            "O corpo do texto na mesma fonte, tamanho 12 e justificado.",
          ],
          numerada: true,
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Texto 1",
        },
      ],
    },
    {
      id: "texto-para-digitar",
      titulo: "Texto para digitar",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "Coisas da Vida 1 A sabedoria não se encontra no topo de nenhuma montanha nem no último ano de um curso superior. É num pequeno monte de areia do recreio do jardim de infância que se pode aprender tudo o que é necessário na vida: Robert Fulghum 1 Excerto retirado do Livro \"Tudo o que eu devia saber na vida aprendi no Jardim de Infância\".",
          itens: [
            "partilhar",
            "respeitar as regras do jogo",
            "não bater em ninguém",
            "guardar as coisas nos sítios onde estavam",
            "manter tudo sempre limpo",
            "não mexer nas coisas dos outros",
            "pedir desculpa quando se magoa alguém",
            "viver uma vida equilibrada: estudar, pensar, desenhar, pintar, cantar, dançar, brincar, trabalhar, fazer de tudo um pouco, todos os dias.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
