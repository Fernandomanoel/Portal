import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Posso clicar nesse link?",
  introducao: "Você vai aprender a reconhecer uma mensagem estranha e o que fazer quando ela chegar.",
  itens: [
    {
      id: "mensagem-estranha",
      titulo: "Mensagem estranha",
      passosGuiados: [
        { texto: "Às vezes chega uma mensagem de uma pessoa que você não conhece." },
        { texto: "A mensagem pode dizer que você ganhou um prêmio." },
        { texto: "A mensagem pode ter um link. Link é um texto azul. Quando você clica nele, abre outra página." },
        { texto: "Não clique no link quando você não conhece a pessoa que mandou." },
        { texto: "Não clique no link quando a mensagem diz que você ganhou um prêmio e você não participou de nada." },
        { texto: "Não clique no link quando a mensagem pede para você fazer alguma coisa rápido." },
      ],
    },
    {
      id: "o-que-fazer",
      titulo: "O que fazer",
      passosGuiados: [
        { texto: "Não responda a mensagem." },
        { texto: "Chame um adulto ou o professor. Mostre a mensagem para ele." },
        { texto: "O adulto vai ajudar você a apagar a mensagem." },
        { texto: "Agora você sabe o que fazer com uma mensagem estranha. Pronto!" },
      ],
    },
  ],
};

export default atividade;
