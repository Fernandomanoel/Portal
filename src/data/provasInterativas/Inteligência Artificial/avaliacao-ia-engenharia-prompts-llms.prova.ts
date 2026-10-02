import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Inteligência Artificial/
 * avaliacao-ia-engenharia-prompts-llms.prova.html), sem mudar nada: os mesmos
 * 10 módulos, na mesma ordem, com os mesmos formatos (múltipla escolha,
 * lacunas, prática na IA, associação, cálculo, verdadeiro/falso, seleção
 * múltipla, sequência e diagnóstico), o mesmo gabarito, as mesmas mensagens e
 * as mesmas palavras-chave. Só o suporte mudou: em vez de página solta, é dado
 * tipado, e o servidor é quem corrige. A prova libera a troca de aba porque as
 * práticas são feitas numa IA gratuita em outra aba.
 */
const TOKENS = [
  { valor: "tokens", texto: "Tokens (pedaços de palavras/caracteres)" },
  { valor: "prompts", texto: "Prompts diretos de comando" },
];
const CONTEXTO = [
  { valor: "janela_contexto", texto: "Janela de Contexto (Context Window)" },
  { valor: "temperatura", texto: "Temperatura de amostragem" },
];
const ATENCAO = [
  { valor: "atencao", texto: "Mecanismo de Atenção (Self-Attention)" },
  { valor: "fundo", texto: "Backpropagation estático" },
];
const PLATAFORMAS = [
  { valor: "perplexity", texto: "Perplexity AI (Busca conversacional com fontes)" },
  { valor: "huggingface", texto: "Hugging Face (Hub open-source de modelos)" },
];
const V_F = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];
const ORDEM = [
  { valor: "1", texto: "1º Passo (Preparação / Indexação)" },
  { valor: "2", texto: "2º Passo (Busca por Similaridade)" },
  { valor: "3", texto: "3º Passo (Geração Aumentada pelo LLM)" },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Avaliação Prática: Inteligência Artificial, Engenharia de Prompts e LLMs",
  permiteSairDaAba: true,
  introducao:
    "Atividade completa em 10 módulos com múltiplos formatos de interação e exercícios práticos para serem executados diretamente em LLMs gratuitas (ChatGPT, Gemini, Claude ou Le Chat). Use “Testar resposta” em cada módulo e, no fim, envie a prova.",
  itens: [
    {
      titulo: "[Múltipla Escolha] Fundamentos de Large Language Models (LLMs)",
      enunciado:
        "Conceito teórico: o que diferencia fundamentalmente um modelo de linguagem generativo (LLM) de um sistema de software tradicional baseado em regras lógicas condicionais (if/else)?",
      campos: [
        {
          id: "ai1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "a) LLMs executam apenas comandos previamente programados linha por linha sem capacidade de inferência.",
              "b) LLMs funcionam prevendo probabilisticamente a próxima palavra/token com base no contexto do treinamento massivo.",
              "c) LLMs realizam buscas exatas de trechos de texto em um banco de dados relacional e copiam a resposta idêntica.",
            ],
            correta: 1,
          },
        },
      ],
      mensagemCerta: "Correto! LLMs preveem probabilisticamente o próximo token com base no treinamento.",
      mensagemErrada: "Incorreto. A essência do LLM é a previsão probabilística de palavras/tokens.",
    },
    {
      titulo: "[Preenchimento de Lacunas] Arquitetura e Processamento de Texto em IA",
      enunciado: "Selecione o termo técnico adequado para cada espaço no texto sobre o funcionamento de IAs generativas de texto:",
      campos: [
        {
          id: "ai2-l1",
          rotulo: "Na arquitetura Transformer, o texto de entrada é dividido em pequenas unidades chamadas ______.",
          regra: { tipo: "selecao", opcoes: TOKENS, esperado: "tokens" },
        },
        {
          id: "ai2-l2",
          rotulo: "O limite máximo de texto que a IA consegue considerar em uma única interação é definido pela sua ______,",
          regra: { tipo: "selecao", opcoes: CONTEXTO, esperado: "janela_contexto" },
        },
        {
          id: "ai2-l3",
          rotulo: "enquanto o algoritmo calcula o peso das relações entre palavras usando o mecanismo de ______.",
          regra: { tipo: "selecao", opcoes: ATENCAO, esperado: "atencao" },
        },
      ],
      mensagemCerta: "Excelente! As unidades são Tokens, o limite é a Janela de Contexto e o núcleo é a Atenção.",
      mensagemErrada: "Incorreto. Verifique a associação dos conceitos de Tokens, Janela de Contexto e Mecanismo de Atenção.",
    },
    {
      titulo: "[Prática na IA Gratuita 1] Construção de Prompt Estruturado (P-C-T-F)",
      enunciado:
        "Exercício prático em IA gratuita: 1. Abra em outra aba qualquer IA gratuita à sua escolha (ex.: ChatGPT, Gemini, Le Chat ou Claude Free). 2. Crie e envie um prompt utilizando o método de 4 pilares: Persona (Papel) + Contexto + Tarefa + Formato de Saída. 3. Cole no campo abaixo o prompt completo que você escreveu e enviou para a IA.",
      campos: [
        {
          id: "ai3-prompt",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: "act|como|atu|papel|persona|context|taref|format|escrev|crie",
            mensagemSemPalavraChave: "O prompt inserido deve conter elementos de instrução como Persona, Contexto ou Formato de Saída.",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
    {
      titulo: "[Associação em Tabela] Ecossistema de Ferramentas de IA para Produtividade",
      enunciado: "Associe cada necessidade prática do dia a dia à plataforma de IA gratuita mais indicada para o objetivo:",
      campos: [
        {
          id: "ai4-t1",
          rotulo: "Pesquisa acadêmica e busca com citações diretas de fontes em tempo real da Web.",
          regra: { tipo: "selecao", opcoes: PLATAFORMAS, esperado: "perplexity" },
        },
        {
          id: "ai4-t2",
          rotulo: "Acesso e teste de modelos de código aberto (Open-Source) e datasets comunitários.",
          regra: { tipo: "selecao", opcoes: PLATAFORMAS, esperado: "huggingface" },
        },
      ],
      mensagemCerta: "Perfeito! Perplexity é focado em pesquisas com fontes e Hugging Face em modelos open-source.",
      mensagemErrada: "Incorreto. Verifique a correspondência de Perplexity AI e Hugging Face.",
    },
    {
      titulo: "[Cálculo Numérico] Estimativa de Custo de Requisições via API de LLM",
      enunciado:
        "Cenário de integração: um sistema envia uma requisição contendo um prompt de 6.000 tokens de entrada e recebe uma resposta da IA de 2.000 tokens de saída.",
      referencia: "Tabela de custos da API: • Custo de entrada (input): R$ 0,01 por cada 1.000 tokens. • Custo de saída (output): R$ 0,03 por cada 1.000 tokens.",
      campos: [
        {
          id: "ai5-input-cost",
          rotulo: "Custo das 6.000 tokens de entrada em R$ [Ex: 0.06]:",
          placeholder: "Digite o valor numérico em R$",
          regra: { tipo: "numero", esperado: 0.06 },
          mensagemCerta: "Custo de entrada correto: (6.000 / 1.000) × R$ 0,01 = R$ 0,06.",
          mensagemErrada: "Incorreto. Calcule 6 × R$ 0,01 (Resultado: 0.06).",
        },
        {
          id: "ai5-total-cost",
          rotulo: "Custo TOTAL da requisição (entrada + saída) em R$ [Ex: 0.12]:",
          placeholder: "Digite o valor numérico em R$",
          regra: { tipo: "numero", esperado: 0.12 },
          mensagemCerta: "Custo total correto: R$ 0,06 (entrada) + R$ 0,06 (saída: 2 × 0,03) = R$ 0,12.",
          mensagemErrada: "Incorreto. Some entrada (R$ 0,06) com saída (2 × R$ 0,03 = R$ 0,06) → Total: 0.12.",
        },
      ],
    },
    {
      titulo: "[Matriz Verdadeiro ou Falso] Riscos, Alucinações e Limitações de LLMs",
      enunciado: "Classifique as afirmações sobre limitações dos modelos generativos em Verdadeira (V) ou Falsa (F):",
      campos: [
        {
          id: "ai6-vf1",
          rotulo: "1. \"Alucinação\" ocorre quando o LLM gera afirmações incorretas ou fatos inexistentes apresentados com tom de total certeza.",
          regra: { tipo: "selecao", opcoes: V_F, esperado: "V" },
        },
        {
          id: "ai6-vf2",
          rotulo: "2. Modelos de linguagem atuais são completamente neutros e não possuem nenhum risco de viés de gênero, raça ou cultura.",
          regra: { tipo: "selecao", opcoes: V_F, esperado: "F" },
        },
      ],
      mensagemCerta: "Correto! Alucinação é a geração com falsa certeza (V); IAs podem sim conter viés dos dados (F).",
      mensagemErrada: "Incorreto. Alucinação é verdadeira (V) e ausência total de viés é falsa (F).",
    },
    {
      titulo: "[Seleção Múltipla] Técnicas Eficazes de Engenharia de Prompts",
      enunciado: "Marque APENAS as afirmativas VERDADEIRAS sobre estratégias para otimizar respostas de modelos de linguagem:",
      campos: [
        {
          id: "ai7",
          regra: {
            tipo: "marcar",
            opcoes: [
              "a) Few-Shot Prompting consiste em fornecer 2 a 3 exemplos práticos de entrada/saída dentro do prompt para guiar a IA.",
              "b) Quanto mais ambíguo e vago for o prompt, melhor e mais precisa será a resposta da IA.",
              "c) Chain-of-Thought (Cadeia de Pensamento) instrui a IA a pensar passo a passo antes de dar a resposta final, reduzindo erros em raciocínios complexos.",
            ],
            corretas: [0, 2],
          },
        },
      ],
      mensagemCerta: "Excelente! Few-Shot e Chain-of-Thought são pilares para aumentar a precisão.",
      mensagemErrada: "Atenção: apenas (a) e (c) são corretas. Prompts ambíguos pioram os resultados.",
    },
    {
      titulo: "[Prática na IA Gratuita 2] Resolução de Problemas com Chain-of-Thought",
      enunciado:
        "Exercício prático em IA gratuita: 1. Vá na sua IA gratuita e envie o seguinte pedido: \"Resolva o seguinte problema pensando passo a passo antes de dar a resposta final: Se 3 gatos caçam 3 ratos em 3 minutos, quanto tempo 100 gatos levam para caçar 100 ratos?\" 2. Cole abaixo o trecho do raciocínio e a resposta final fornecida pela IA.",
      campos: [
        {
          id: "ai8-cot",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: "3|três|minuto|tempo|100|gato|rato|raciocí|passo|lógica",
            mensagemSemPalavraChave: "Cole o raciocínio gerado pela IA referente ao problema dos 100 gatos e 100 ratos.",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
    {
      titulo: "[Sequenciamento de Passos] Fluxo de Operação da Arquitetura RAG",
      enunciado: "Ordene cronologicamente os passos de funcionamento de um sistema RAG (Geração Aumentada por Recuperação):",
      campos: [
        {
          id: "ai9-ord1",
          rotulo: "Conversão de documentos internos em vetores (Embeddings) e armazenamento em banco vetorial.",
          regra: { tipo: "selecao", opcoes: ORDEM, esperado: "1" },
        },
        {
          id: "ai9-ord2",
          rotulo: "Busca e recuperação dos trechos de documentos mais relevantes para a pergunta do usuário.",
          regra: { tipo: "selecao", opcoes: ORDEM, esperado: "2" },
        },
        {
          id: "ai9-ord3",
          rotulo: "Envio dos trechos encontrados como contexto extra no prompt para o LLM gerar a resposta fundamentada.",
          regra: { tipo: "selecao", opcoes: ORDEM, esperado: "3" },
        },
      ],
      mensagemCerta: "Excelente! A ordem do RAG é: 1º Indexação/Embeddings → 2º Busca de Similaridade → 3º Geração com Contexto.",
      mensagemErrada: "Incorreto. A ordem correta é: 1º Indexação, 2º Busca e 3º Geração Aumentada.",
    },
    {
      titulo: "[Diagnóstico de Governança] Privacidade e Proteção de Dados em IAs Públicas",
      enunciado:
        "Estudo de caso de governança: um colaborador de uma empresa colou o código-fonte proprietário de um software interno e relatórios financeiros confidenciais na versão gratuita de um chatbot de IA na web. Descreva quais são os riscos de segurança/privacidade envolvidos e qual a conduta correta.",
      campos: [
        {
          id: "ai10-governance",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: "dado|vazam|treinament|privad|seguranç|confidenc|lgpd|vazar|polític",
            mensagemSemPalavraChave: "Discorra sobre riscos de vazamento de dados corporativos ou uso de informações para treinamento.",
          },
          mensagemCerta: "Resposta válida e compreensível!",
        },
      ],
    },
  ],
};

export default prova;
