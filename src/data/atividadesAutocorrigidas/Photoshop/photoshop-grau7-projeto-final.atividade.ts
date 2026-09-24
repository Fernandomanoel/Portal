import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 7: Projeto Final Integrador",
  introducao:
    "A última etapa do curso principal. Nenhuma técnica nova aparece aqui — o objetivo é juntar tudo que você aprendeu nos 6 graus anteriores em um projeto só, do jeito que se trabalha no mercado: com um briefing, prazos e entrega organizada.",
  itens: [
    {
      id: "lendo-um-briefing",
      titulo: "Lendo um Briefing",
      instrucao:
        "Um \"briefing\" é o pedido do cliente, traduzido em instruções de design. Antes de abrir o Photoshop, leia com atenção e anote: formato final, mensagem principal, e qualquer restrição.",
      tabelaReferencia: {
        colunas: ["Item", "Pedido"],
        linhas: [
          ["Formato", "Uma peça principal 1080×1350 (post de feed) + 1 versão 1080×1920 (Stories)"],
          ["Tema", "Livre — use uma foto sua ou de algo que você goste"],
          ["Obrigatório", "1 título em texto, pelo menos 1 ajuste de cor, e 1 elemento composto (montagem)"],
          ["Estilo", "Livre — mas coerente do início ao fim (mesma paleta de cor)"],
          ["Entrega", ".PSD com camadas organizadas + .PNG/.JPG finais dos dois formatos"],
        ],
      },
      objetivo: "Interpretar um briefing errado é a causa nº 1 de retrabalho no mercado de design — releia antes de começar, não só no meio do projeto.",
    },
    {
      id: "planejando-antes-de-abrir",
      titulo: "Planejando Antes de Abrir o Photoshop",
      instrucao: "Vale rabiscar num papel (ou até mentalmente) antes de começar:",
      passos: [
        "Qual foto/elemento vai ser o principal?",
        "Onde o título vai ficar (lembre da Regra dos Terços, Grau 4)?",
        "Vai ter alguma montagem (Grau 2/6)? Quais elementos combinar?",
        "Qual a paleta de cor dominante (Grau 3/6)?",
      ],
      objetivo: "5 minutos de planejamento evitam horas de retrabalho — principalmente decidir a paleta de cor antes, não depois de já ter tudo montado.",
    },
    {
      id: "organizando-o-documento",
      titulo: "Organizando o Documento",
      cenario:
        "Em um projeto com muitas camadas, organização não é luxo — é o que permite editar depois sem se perder. Grupos (Grau 2) nomeados por função, não por \"Grupo 1\", \"Grupo 2\".",
      passos: ["Selecione as camadas relacionadas → Ctrl+G → duplo clique no nome do grupo para renomear."],
    },
    {
      id: "pratica-peca-principal",
      titulo: "Prática — Montando a Peça Principal (1080×1350)",
      instrucao: "Siga o briefing, aplicando o que já sabe:",
      passos: [
        "Novo documento 1080×1350 (Grau 1).",
        "Insira e ajuste a foto/elemento principal (Grau 1/2).",
        "Monte o elemento composto — sua montagem (Grau 2/6).",
        "Ajuste cor geral com camadas de ajuste agrupadas (Grau 3).",
        "Adicione o título com estilo de camada, posicionado pela Regra dos Terços (Grau 4).",
        "Toque final: ruído/grão ou filtro sutil (Grau 5).",
        "Organize tudo em grupos nomeados.",
      ],
      aviso: "salve o .PSD com frequência durante o processo (Ctrl+S) — em um projeto com muitas camadas, perder o progresso dói mais.",
    },
    {
      id: "pratica-adaptando-stories",
      titulo: "Prática — Adaptando para Stories (1080×1920)",
      instrucao: "Adaptar não é só esticar — é reorganizar a composição para o novo formato.",
      passos: [
        "Duplique o documento (Imagem → Duplicar).",
        "Imagem → Tamanho da Tela → 1080×1920, ancorado onde fizer mais sentido.",
        "Reposicione título e elementos para usar bem o espaço vertical extra.",
        "Se algum elemento ficar cortado, decida: mover, redimensionar, ou pintar mais fundo.",
      ],
      objetivo: "No mercado, isso se chama \"adaptação de formato\" — quase todo projeto real pede a mesma arte em pelo menos 2 ou 3 tamanhos diferentes.",
    },
    {
      id: "exportando-para-diferentes-usos",
      titulo: "Exportando para Diferentes Usos",
      tabelaReferencia: {
        colunas: ["Uso", "Formato", "Por quê"],
        linhas: [
          ["Post de rede social", "JPG", "Arquivo leve, sem necessidade de transparência"],
          ["Logotipo para usar em vários fundos", "PNG", "Mantém a transparência"],
          ["Material impresso (banner, panfleto)", "PDF ou TIFF, 300 DPI", "Qualidade de impressão exige resolução alta e CMYK"],
        ],
      },
      aviso:
        "diferença chave: telas usam RGB (luz), impressão usa CMYK (tinta) — as cores podem mudar visivelmente ao converter. Sempre confira antes de mandar para gráfica.",
    },
    {
      id: "desafio-auto-revisao",
      titulo: "Desafio Bônus — Auto-Revisão como Cliente",
      instrucao:
        "Profissionais de design fazem isso o tempo todo: \"descansar o olho\" antes da entrega final revela erros que a proximidade excessiva com o projeto esconde.",
      desafio:
        "feche os olhos, conte até 10, abra de novo e olhe sua peça pela primeira vez como se fosse o cliente vendo pela primeira vez. Anote os 3 primeiros problemas que notar.",
    },
    {
      id: "checklist-de-qualidade-final",
      titulo: "Checklist de Qualidade Final",
      instrucao: "Antes de considerar o projeto pronto, confirme cada item:",
      tabelaReferencia: {
        colunas: ["Checklist final"],
        linhas: [
          ["A peça atende a todos os itens do briefing?"],
          ["As camadas estão organizadas em grupos nomeados?"],
          ["A cor é coerente do início ao fim (Grau 3/6)?"],
          ["Não sobrou nenhuma borda \"colada\" nas montagens (Grau 2/6)?"],
          ["O texto está legível em qualquer fundo (contraste, Grau 4)?"],
          ["Os dois formatos (feed e Stories) foram exportados?"],
          ["O .PSD com camadas foi salvo, além dos arquivos finais?"],
        ],
      },
      objetivo:
        "Concluindo este grau você termina os 7 graus principais do curso — do primeiro clique na Caixa de Ferramentas até um projeto final completo, organizado e exportado como se fosse para um cliente de verdade.",
    },
  ],
};

export default atividade;
