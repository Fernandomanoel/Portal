import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/ia-generativa-engenharia-prompt-aplicacoes.html, sem cortes. As regras de
// correção (mínimo de palavras, palavras-chave, resposta certa) são as mesmas da página antiga.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: IA Generativa, Engenharia de Prompt e Aplicações",
  introducao: "Aprenda o funcionamento dos Grandes Modelos de Linguagem (LLMs), técnicas avançadas de prompt (Few-Shot e Chain-of-Thought), arquitetura RAG vs. Fine-Tuning e mitigação de alucinações. Validação automática.",
  itens: [
    {
      id: "fundamentos-dos-modelos-de-linguagem-llms",
      titulo: "Fundamentos dos Modelos de Linguagem (LLMs)",
      cenario: "Questão 1: Como um Grande Modelo de Linguagem (LLM) baseado na arquitetura Transformer gera respostas a partir do prompt de um usuário?",
      campos: [
        {
          id: "ia1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Consultando em tempo real um banco de dados relacional SQL pré-programado com respostas fixas para cada pergunta.",
              "Prevendo probabilisticamente a sequência do próximo token (palavra ou pedaço de palavra) com base nos padrões aprendidos durante o treinamento.",
              "Redirecionando a pergunta para uma central de atendimento humano que digita a resposta em tempo real.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! LLMs preveem estatisticamente o próximo token com base no contexto do prompt.",
          mensagemErrada: "Incorreto. A opção B descreve o funcionamento probabilístico baseado em tokens.",
        },
      ],
    },
    {
      id: "engenharia-de-prompt-tecnicas-few-shot-e-chain-o",
      titulo: "Engenharia de Prompt: Técnicas Few-Shot e Chain-of-Thought",
      cenario: "Desafio Tático: Explique brevemente o que caracteriza a técnica de Prompting Few-Shot e como a abordagem Chain-of-Thought (Cadeia de Pensamento) ajuda a IA a resolver problemas lógicos complexos.",
      campos: [
        {
          id: "ia2-fewshot",
          rotulo: "O que é a técnica Few-Shot Prompting?",
          placeholder: "Ex: Fornecer alguns exemplos práticos de entrada e saída no prompt para guiar o modelo...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
        {
          id: "ia2-cot",
          rotulo: "O que é a técnica Chain-of-Thought (CoT)?",
          placeholder: "Ex: Instruir o modelo a raciocinar passo a passo antes de apresentar o resultado final...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
      ],
    },
    {
      id: "estrategia-de-implementacao-rag-vs-fine-tuning",
      titulo: "Estratégia de Implementação: RAG vs. Fine-Tuning",
      cenario: "Associe a necessidade do projeto de IA à abordagem técnica mais eficiente e econômica:",
      campos: [
        {
          id: "ia3-p1",
          rotulo: "Conectar o modelo a uma base de conhecimento interna dinâmica (documentos e PDFs da empresa atualizados diariamente) sem precisar re-treinar a IA.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "rag",
                texto: "RAG (Retrieval-Augmented Generation / Geração Aumentada por Recuperação)",
              },
              {
                valor: "finetuning",
                texto: "Fine-Tuning (Ajuste fino de pesos do modelo)",
              },
            ],
            esperado: "rag",
          },
          mensagemCerta: "Perfeito! RAG conecta a IA a documentos em tempo real e Fine-Tuning ajusta o comportamento e tom do modelo.",
          mensagemErrada: "Incorreto. RAG = busca de documentos/base de dados; Fine-Tuning = re-treinamento de tom/estilo.",
        },
        {
          id: "ia3-p2",
          rotulo: "Especializar o modelo em um tom de voz médico ou jurídico ultra-específico ou formato de código muito particular, alterando seu comportamento estrutural.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "rag",
                texto: "RAG (Retrieval-Augmented Generation / Geração Aumentada por Recuperação)",
              },
              {
                valor: "finetuning",
                texto: "Fine-Tuning (Ajuste fino de pesos do modelo)",
              },
            ],
            esperado: "finetuning",
          },
          mensagemCerta: "Perfeito! RAG conecta a IA a documentos em tempo real e Fine-Tuning ajusta o comportamento e tom do modelo.",
          mensagemErrada: "Incorreto. RAG = busca de documentos/base de dados; Fine-Tuning = re-treinamento de tom/estilo.",
        },
      ],
    },
    {
      id: "qualidade-de-respostas-mitigacao-de-alucinacoes-",
      titulo: "Qualidade de Respostas: Mitigação de Alucinações de IA",
      cenario: "Cenário de Análise: Um modelo de linguagem inventou dados históricos estatísticos e citou jurisprudências falsas ao gerar um relatório profissional. Por que ocorrem as alucinações na IA generativa e quais boas práticas o profissional deve adotar para evitá-las?",
      campos: [
        {
          id: "ia4-alucinacao",
          placeholder: "Explique por que modelos estatísticos podem gerar informações inverossímeis plausíveis, e cite o uso de grounding, checagem humana e limites de temperatura...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /estatístic|probabil|fonte|verific|chec|context|temperatura|grounding|fatos/i,
          },
          mensagemErrada: "Explique que alucinações ocorrem pelo caráter probabilístico e mencione checagem humana ou fontes confiáveis.",
        },
      ],
    },
    {
      id: "seguranca-corporativa-lgpd-e-uso-responsavel-de-",
      titulo: "Segurança Corporativa, LGPD e Uso Responsável de IA",
      cenario: "Estudo de Caso Final: Um funcionário cola o código-fonte proprietário de um software da empresa ou dados financeiros confidenciais em uma ferramenta pública de IA sem contrato corporativo. Quais são os riscos de segurança e privacidade dessa conduta?",
      campos: [
        {
          id: "ia5-privacidade",
          placeholder: "Discorra sobre o risco de treinamento do modelo público com dados do cliente/empresa, vazamento de propriedade intelectual e descumprimento da LGPD...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /treina|vazament|propriedade|segred|lgpd|privacidade|confidencial|dados/i,
          },
          mensagemErrada: "Mencione riscos como o uso dos dados para re-treinamento de modelos públicos, vazamento de propriedade intelectual ou violação da LGPD.",
        },
      ],
    },
  ],
};

export default atividade;

