import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O atendente de farmácia recebe o cliente, organiza e controla os produtos, cuida do estoque e da validade e apoia a dispensação sob a orientação do farmacêutico. O curso reúne atendimento, noções de medicamentos, organização, regras sanitárias e ética. O atendente não prescreve nem substitui o farmacêutico, e as normas da vigilância sanitária devem ser consultadas na versão vigente.",
  topicos: [
    {
      titulo: "O papel do atendente e do farmacêutico",
      texto: [
        "A farmácia é um estabelecimento de saúde, e o farmacêutico é o profissional responsável: orienta o uso correto dos medicamentos e responde tecnicamente pela dispensação. O atendente apoia: recebe o cliente, localiza o produto, registra a venda e chama o farmacêutico quando houver dúvida sobre uso, interação, dose ou sintomas. Indicar medicamento ou diagnosticar não é função do atendente.",
      ],
      pontos: ["Explicar o limite de atuação do atendente.", "Saber quando chamar o farmacêutico."],
      erros: ["Sugerir medicamento por conta própria."],
    },
    {
      titulo: "Tipos de medicamentos e receitas",
      texto: [
        "Medicamentos isentos de prescrição (MIP, vendidos sem receita) e os que exigem receita: com retenção da receita (como antibióticos e controlados) ou apenas apresentação. Existem os de referência, os genéricos (mesma substância, preço menor) e os similares. Para os controlados, há receituário próprio e registro obrigatório. As regras de cada categoria vêm da vigilância sanitária (Anvisa): consulte a norma vigente.",
      ],
      pontos: ["Diferenciar genérico, similar e de referência.", "Saber quais medicamentos exigem receita."],
    },
    {
      titulo: "Atendimento e comunicação com o cliente",
      texto: [
        "O cliente de farmácia muitas vezes está doente ou aflito. Atendimento cordial, escuta atenta, discrição (não exponha o problema de saúde em voz alta) e clareza são fundamentais. Confirme o pedido repetindo o nome do produto e a quantidade, e entregue as orientações recebidas do farmacêutico por escrito quando possível.",
      ],
      pontos: ["Atender com empatia e discrição.", "Confirmar o produto antes de registrar a venda."],
    },
    {
      titulo: "Organização, validade e armazenamento",
      texto: [
        "Os produtos são organizados por categoria e em ordem alfabética, com os medicamentos que exigem controle em local restrito. Siga o PVPS (primeiro que vence, primeiro que sai): confira sempre as datas de validade, e retire os vencidos para descarte correto. Alguns medicamentos exigem refrigeração (2 a 8 °C), e o ambiente deve ser limpo, seco e com temperatura controlada.",
      ],
      pontos: ["Aplicar o PVPS.", "Descrever as condições de armazenamento."],
      erros: ["Deixar medicamentos vencidos na prateleira."],
    },
    {
      titulo: "Estoque, vendas e boas práticas",
      texto: [
        "O controle de estoque acompanha entradas (notas fiscais) e saídas (vendas), com inventário periódico. O ponto de pedido indica quando comprar. Boas práticas de higiene, o descarte seguro de resíduos de medicamentos e o sigilo das informações do cliente fazem parte da rotina.",
      ],
      pontos: ["Conferir uma nota de entrada.", "Explicar por que o sigilo é obrigatório."],
    },
  ],
  glossario: [
    { termo: "Dispensação", definicao: "Entrega do medicamento ao paciente, com orientação do farmacêutico." },
    { termo: "Genérico", definicao: "Medicamento com a mesma substância do de referência, mais barato." },
    { termo: "MIP", definicao: "Medicamento isento de prescrição." },
    { termo: "PVPS", definicao: "Primeiro que vence, primeiro que sai." },
    { termo: "Anvisa", definicao: "Agência Nacional de Vigilância Sanitária." },
  ],
  dicas: [
    "Reforce em todas as aulas: o atendente não indica medicamento nem diagnostica.",
    "Simule atendimentos com situações de dúvida e treine o momento de chamar o farmacêutico.",
    "Convide um farmacêutico para falar das normas e do dia a dia.",
  ],
};

export default conteudo;
