import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Empreender é identificar uma necessidade e organizar recursos para atendê-la com um negócio. O curso apresenta o perfil do empreendedor, a ideia e a validação, o plano de negócio (modelo Canvas), a formalização (MEI e outros portes) e a gestão básica das finanças.",
  topicos: [
    {
      titulo: "Perfil e mentalidade do empreendedor",
      texto: [
        "Empreender envolve iniciativa, disposição de aprender com erros, persistência, visão de oportunidade e planejamento. Há o empreendedor por oportunidade (viu uma chance) e por necessidade (precisou gerar renda). Risco faz parte, mas pode ser calculado.",
      ],
      pontos: ["Distinguir empreender por oportunidade e por necessidade."],
    },
    {
      titulo: "Da ideia à validação",
      texto: [
        "Uma boa ideia resolve um problema real de um grupo de pessoas disposto a pagar. Antes de investir, valida-se: conversar com possíveis clientes, testar uma versão simples do produto (MVP) e medir o interesse. Perguntar «você pagaria por isso?» é menos confiável do que ver alguém pagar.",
      ],
      pontos: ["Definir o problema e o cliente.", "Explicar o que é um MVP."],
      erros: ["Gastar meses construindo o produto sem conversar com nenhum cliente."],
    },
    {
      titulo: "Modelo de negócio e Canvas",
      texto: [
        "O Business Model Canvas descreve o negócio em nove blocos: segmentos de clientes, proposta de valor, canais, relacionamento com clientes, fontes de receita, recursos principais, atividades principais, parcerias principais e estrutura de custos. É uma folha de uma página que se revisa o tempo todo.",
      ],
      pontos: ["Preencher um Canvas simples para uma ideia dada."],
    },
    {
      titulo: "Plano de negócio e números",
      texto: [
        "O plano de negócio detalha mercado, concorrentes, marketing, operação e finanças. Os números básicos: investimento inicial, custos fixos e variáveis, preço, margem e ponto de equilíbrio (quantidade em que o lucro é zero). Separar o dinheiro da empresa do dinheiro pessoal é regra de ouro.",
      ],
      pontos: ["Estimar custos e preço.", "Calcular o ponto de equilíbrio simples."],
      exemplo: "Custos fixos de R$ 3.000 por mês, preço R$ 25 e custo variável R$ 10: margem R$ 15; equilíbrio = 3.000 ÷ 15 = 200 unidades.",
    },
    {
      titulo: "Formalização e obrigações",
      texto: [
        "O MEI (Microempreendedor Individual) é a forma mais simples de formalizar uma atividade pequena, com limite anual de faturamento, imposto fixo mensal e algumas restrições (limite de empregados e atividades permitidas). Acima do MEI há as microempresas e as empresas de pequeno porte. Limites e valores mudam: consulte o Portal do Empreendedor e o Sebrae.",
      ],
      pontos: ["Citar o que o MEI oferece.", "Dizer onde conferir regras atualizadas."],
    },
  ],
  glossario: [
    { termo: "MVP", definicao: "Produto mínimo viável, para testar a ideia com pouco investimento." },
    { termo: "Canvas", definicao: "Quadro de nove blocos que descreve o modelo de negócio." },
    { termo: "Proposta de valor", definicao: "O benefício que o cliente recebe e que o faz escolher o negócio." },
    { termo: "Ponto de equilíbrio", definicao: "Venda mínima para não ter prejuízo." },
    { termo: "MEI", definicao: "Microempreendedor Individual." },
  ],
  dicas: [
    "Convide um empreendedor local para contar a história, com erros incluídos.",
    "Peça que os alunos testem uma ideia com pelo menos cinco pessoas e relatem o que ouviram.",
    "Não prometa que todo negócio dá certo: ensine a testar pequeno.",
  ],
};

export default conteudo;
