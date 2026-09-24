import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-atividade-basica.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática — Identificando E-mails Falsos (Phishing)",
  introducao: "Atividade Complementar — Segurança na Era Digital",
  itens: [
    {
      id: "instrucoes",
      titulo: "Instruções",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "",
          itens: [
            "Leia os e-mails com atenção.",
            "Não clique em nenhum link.",
            "Abra um documento em branco no Word e responda.",
          ],
        },
      ],
    },
    {
      id: "e-mail-1",
      titulo: "E-mail 1",
      blocos: [
        {
          tipo: "texto",
          texto: "Assunto: URGENTE: Atualização de segurança Remetente: atendimento@banco-seguro24.com",
        },
        {
          tipo: "texto",
          texto: "1. Este e-mail é:",
        },
        {
          tipo: "lista",
          itens: ["( ) Seguro","( ) Phishing"],
        },
        {
          tipo: "texto",
          texto: "2. Marque os sinais de perigo que você encontrou:",
        },
        {
          tipo: "lista",
          itens: [
            "( ) Pedido de dados pessoais",
            "( ) Urgência/ameaça",
            "( ) Link estranho",
            "( ) Remetente suspeito",
          ],
        },
      ],
    },
    {
      id: "e-mail-2",
      titulo: "E-mail 2",
      blocos: [
        {
          tipo: "texto",
          texto: "Assunto: Você ganhou um prêmio Remetente: promoções@ofertas-imperdiveis.net",
        },
        {
          tipo: "texto",
          texto: "3. Este e-mail é:",
        },
        {
          tipo: "lista",
          itens: ["( ) Seguro","( ) Phishing"],
        },
        {
          tipo: "texto",
          texto: "4. Por que esse e-mail pode ser perigoso?",
        },
      ],
    },
    {
      id: "e-mail-3",
      titulo: "E-mail 3",
      blocos: [
        {
          tipo: "texto",
          texto: "Assunto: Novo aviso em sua conta Remetente: notificacoes@plataformaeducacional.com",
        },
        {
          tipo: "texto",
          texto: "5. Este e-mail é:",
        },
        {
          tipo: "lista",
          itens: ["( ) Seguro","( ) Phishing"],
        },
        {
          tipo: "texto",
          texto: "6. O que torna esse e-mail mais confiável?",
        },
      ],
    },
    {
      id: "pergunta-final",
      titulo: "Pergunta Final",
      blocos: [
        {
          tipo: "texto",
          texto: "7. Cite 1 cuidado importante ao receber e-mails desconhecidos:",
        },
        {
          tipo: "texto",
          texto: "Como responder",
        },
        {
          tipo: "texto",
          texto: "Abra um documento em branco no Word e escreva suas respostas para as 7 perguntas acima, sem clicar em nenhum dos links mostrados.",
        },
      ],
    },
  ],
};

export default atividade;
