import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Auto-Corretiva de Marketing e Propaganda",
  introducao:
    "Esta atividade explora os fundamentos de marketing e propaganda: você vai diferenciar os dois conceitos, criar uma headline publicitária, mapear a persona de uma campanha, classificar ações de mídia no funil de vendas e responder a um cliente insatisfeito. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "conceitos-marketing-propaganda",
      titulo: "Conceitos Fundamentais de Marketing e Propaganda",
      cenario: "Questão 1: Qual é a diferença fundamental entre o conceito de Marketing e o conceito de Propaganda?",
      campos: [
        {
          id: "q1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "São sinônimos perfeitos e significam exatamente a mesma coisa.",
              "Marketing é o processo amplo de estratégia e estudo do mercado (4 Ps); Propaganda é a etapa de divulgação persuasiva e comunicação de mídia.",
              "Propaganda cuida apenas de vendas diretas no balcão, enquanto o Marketing cuida das finanças da empresa.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! Marketing é a estratégia global e a Propaganda é o braço de comunicação persuasiva.",
          mensagemErrada:
            "Incorreto. A resposta correta é: Marketing é o processo amplo de estratégia e estudo do mercado (4 Ps); Propaganda é a etapa de divulgação persuasiva e comunicação de mídia.",
        },
      ],
    },
    {
      id: "headline",
      titulo: "Redação Publicitária: Criação de Headline e Chamada de Vendas",
      cenario:
        "Desafio de Redação: Crie uma Headline (Título de Impacto) para uma campanha publicitária cujo tema é: \"Lançamento de uma linha de garrafas térmicas sustentáveis para trabalhadores e estudantes\".",
      instrucao: "Digite sua Headline no campo abaixo (o sistema valida a coerência, tamanho e impede textos aleatórios).",
      campos: [
        {
          id: "headline",
          placeholder: "Ex: Mantenha sua bebida gelada por 24h e elimine o plástico do seu dia a dia...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 15 },
        },
      ],
    },
    {
      id: "persona",
      titulo: "Análise de Público-Alvo e Definição de Persona",
      cenario: "Para a mesma campanha de garrafas térmicas ecofriendly, descreva o perfil da Persona ideal para a divulgação no Instagram.",
      campos: [
        {
          id: "persona-habitos",
          rotulo: "Hábitos e Interesses da Persona",
          placeholder: "Descreva o que essa pessoa costuma fazer no dia a dia, seus gostos e rotina...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 15 },
        },
        {
          id: "persona-dor",
          rotulo: "Principal Dor / Problema do Cliente",
          placeholder: "Qual o problema que a garrafa térmica resolve para ela?",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 15 },
        },
      ],
    },
    {
      id: "funil-vendas",
      titulo: "Planejamento de Mídia e Funil de Conversão",
      cenario:
        "Classifique a ação de comunicação na etapa correspondente do Funil de Vendas (Topo / Atração, Meio / Nutrição, Fundo / Conversão).",
      campos: [
        {
          id: "funil-f1",
          rotulo: "Vídeo curto (Reels) com dica rápida de sustentabilidade para o grande público.",
          regra: {
            tipo: "selecao",
            esperado: "topo",
            opcoes: [
              { valor: "topo", texto: "Topo do Funil (Atração / Conscientização)" },
              { valor: "meio", texto: "Meio do Funil (Consideração / Nutrição)" },
              { valor: "fundo", texto: "Fundo do Funil (Decisão / Conversão)" },
            ],
          },
          mensagemCerta: "Reels de dica geral atrai público novo — isso é Topo de Funil.",
          mensagemErrada: "Incorreto — conteúdo educativo para o público geral é Topo do Funil (Atração).",
        },
        {
          id: "funil-f2",
          rotulo: "E-mail promocional oferecendo Cupom de 20% de Desconto válido por 24h.",
          regra: {
            tipo: "selecao",
            esperado: "fundo",
            opcoes: [
              { valor: "topo", texto: "Topo do Funil (Atração / Conscientização)" },
              { valor: "meio", texto: "Meio do Funil (Consideração / Nutrição)" },
              { valor: "fundo", texto: "Fundo do Funil (Decisão / Conversão)" },
            ],
          },
          mensagemCerta: "Cupom de desconto por tempo limitado converte — isso é Fundo de Funil.",
          mensagemErrada: "Incorreto — oferta com desconto e urgência é Fundo do Funil (Conversão).",
        },
      ],
    },
    {
      id: "resposta-cliente",
      titulo: "Estudo de Caso: Argumentação e Posicionamento de Marca",
      cenario:
        "Desafio Final: Um cliente comentou nas redes sociais que achou o preço da garrafa térmica elevado em comparação com garrafas plásticas simples. Escreva como a marca deve responder publicamente a esse comentário argumentando o Valor Agregado (durabilidade, sustentabilidade e economia no longo prazo).",
      campos: [
        {
          id: "resposta-cliente",
          placeholder: "Escreva a resposta da marca demonstrando empatia, profissionalismo e valor...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /qualidade|durabilidade|economia|sustent|investimento|saúde|planeta|longo prazo/i,
          },
          mensagemErrada: "A resposta está legível, mas falta argumentar sobre sustentabilidade, durabilidade ou economia de longo prazo.",
        },
      ],
    },
  ],
};

export default atividade;
