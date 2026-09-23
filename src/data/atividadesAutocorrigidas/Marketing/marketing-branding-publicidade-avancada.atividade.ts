import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação Prática de Branding, Publicidade e Ativação de Marca",
  introducao:
    "Esta simulação cobre construção de marca com arquétipos, copywriting publicitário na estrutura AIDA e gestão de crise de relações públicas. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "arquetipo-marca",
      titulo: "Construção de Branding e Arquétipo da Marca",
      cenario: "Cenário: Posicionamento de marca para a nova startup de bebidas funcionais \"NéctarVibe\".",
      campos: [
        {
          id: "arquetipo",
          rotulo: "Arquétipo Principal Escolhido",
          regra: {
            tipo: "selecao",
            esperado: ["criador", "heroi", "mago", "explorador"],
            opcoes: [
              { valor: "criador", texto: "O Criador (Inovação e Expressão)" },
              { valor: "heroi", texto: "O Herói (Superação e Desafio)" },
              { valor: "mago", texto: "O Mago (Transformação e Magia)" },
              { valor: "explorador", texto: "O Explorador (Liberdade e Aventura)" },
            ],
          },
          mensagemCerta: "Arquétipo selecionado!",
          mensagemErrada: "Selecione uma opção da lista.",
        },
        {
          id: "justificativa-arquetipo",
          rotulo: "Justificativa do Posicionamento",
          placeholder: "Explique como o arquétipo conecta com o consumidor...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "estrutura-aida",
      titulo: "Copywriting Publicitário: Estrutura AIDA",
      cenario: "Crie a estrutura de vendas no método AIDA (Atenção, Interesse, Desejo e Ação).",
      campos: [
        {
          id: "aida-atencao",
          rotulo: "1. Atenção (Headline de Impacto)",
          placeholder: "Promessa principal ou pergunta chamativa...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "aida-interesse",
          rotulo: "2. Interesse (Aprofundamento da Dor)",
          placeholder: "Desenvolva o problema e gere retenção...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15 },
        },
        {
          id: "aida-desejo",
          rotulo: "3. Desejo (Solução e Benefícios)",
          placeholder: "Apresente os benefícios do produto...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15 },
        },
        {
          id: "aida-acao",
          rotulo: "4. Ação (Chamada Final / CTA)",
          placeholder: "Crie a chamada com oferta ou urgência...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "crise-pr",
      titulo: "Gestão de Crise de Relações Públicas (PR)",
      cenario: "Uma falha nas entregas gerou reclamações nas redes sociais. Redija o comunicado oficial de esclarecimento da empresa.",
      instrucao: "Nota Oficial de Esclarecimento.",
      campos: [
        {
          id: "nota-oficial",
          placeholder: "COMUNICADO OFICIAL: Assuma a responsabilidade com transparência, empatia e sem desculpas evasivas...",
          regra: { tipo: "texto", minPalavras: 6, minCaracteres: 25 },
        },
      ],
    },
  ],
};

export default atividade;
