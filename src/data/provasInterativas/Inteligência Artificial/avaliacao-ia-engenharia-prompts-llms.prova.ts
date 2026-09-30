import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Inteligência Artificial/
 * avaliacao-ia-engenharia-prompts-llms.prova.html): os mesmos 10 módulos e o
 * mesmo gabarito. Módulos com várias lacunas/linhas viram uma pergunta por
 * item; o cálculo digitado (módulo 5) virou escolha, porque a dissertativa
 * aceita por "contém". Os módulos 3, 8 e 10 seguem abertos, com os termos-chave
 * da página antiga — sem correspondência, ficam para o professor. A prova
 * libera a saída da aba: as práticas são feitas numa IA gratuita em outra aba.
 */
const V_F = ["Verdadeiro", "Falso"];
const PASSOS = ["1º passo (preparação / indexação)", "2º passo (busca por similaridade)", "3º passo (geração aumentada pelo LLM)"];

const prova: ProvaInterativa = {
  tipo: "mista",
  titulo: "Inteligência Artificial, Engenharia de Prompts e LLMs — Avaliação",
  permiteSairDaAba: true,
  perguntas: [
    {
      pergunta:
        "Módulo 1 — Fundamentos de LLMs. O que diferencia fundamentalmente um modelo de linguagem generativo (LLM) de um software tradicional baseado em regras condicionais (if/else)?",
      opcoes: [
        "LLMs executam apenas comandos previamente programados linha por linha, sem capacidade de inferência.",
        "LLMs funcionam prevendo probabilisticamente a próxima palavra/token com base no contexto do treinamento massivo.",
        "LLMs realizam buscas exatas de trechos de texto em um banco de dados relacional e copiam a resposta idêntica.",
      ],
      correta: 1,
    },
    {
      pergunta: "Módulo 2 — Arquitetura Transformer. O texto de entrada é dividido em pequenas unidades chamadas:",
      opcoes: ["Tokens (pedaços de palavras/caracteres)", "Prompts diretos de comando"],
      correta: 0,
    },
    {
      pergunta: "Módulo 2 — Arquitetura Transformer. O limite máximo de texto que a IA consegue considerar em uma única interação é definido pela sua:",
      opcoes: ["Temperatura de amostragem", "Janela de contexto (context window)"],
      correta: 1,
    },
    {
      pergunta: "Módulo 2 — Arquitetura Transformer. O algoritmo calcula o peso das relações entre palavras usando o mecanismo de:",
      opcoes: ["Backpropagation estático", "Atenção (self-attention)"],
      correta: 1,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Módulo 3 — Prática em IA gratuita (construção de prompt estruturado). Abra em outra aba uma IA gratuita (ChatGPT, Gemini, Le Chat ou Claude) e envie um prompt com os 4 pilares: Persona (papel) + Contexto + Tarefa + Formato de saída. Cole aqui o prompt completo que você escreveu.",
      respostasAceitas: ["papel", "persona", "contexto", "tarefa", "formato", "escreva", "crie", "atue como", "aja como", "voce e um", "act as"],
    },
    {
      pergunta:
        "Módulo 4 — Ecossistema de IA. Pesquisa acadêmica e busca com citações diretas de fontes em tempo real da web. Qual plataforma gratuita é a mais indicada?",
      opcoes: ["Perplexity AI (busca conversacional com fontes)", "Hugging Face (hub open-source de modelos)"],
      correta: 0,
    },
    {
      pergunta:
        "Módulo 4 — Ecossistema de IA. Acesso e teste de modelos de código aberto (open-source) e de datasets da comunidade. Qual plataforma gratuita é a mais indicada?",
      opcoes: ["Perplexity AI (busca conversacional com fontes)", "Hugging Face (hub open-source de modelos)"],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 5 — Custo de API. Um sistema envia um prompt de 6.000 tokens de entrada e recebe 2.000 tokens de saída. Tabela: entrada custa R$ 0,01 a cada 1.000 tokens; saída custa R$ 0,03 a cada 1.000 tokens. Quanto custam os 6.000 tokens de entrada?",
      opcoes: ["R$ 0,006", "R$ 0,06", "R$ 0,60", "R$ 6,00"],
      correta: 1,
    },
    {
      pergunta: "Módulo 5 — Custo de API. Na mesma requisição, qual é o custo total (entrada + saída)?",
      opcoes: ["R$ 0,09", "R$ 0,12", "R$ 0,18", "R$ 0,24"],
      correta: 1,
    },
    {
      pergunta:
        "Módulo 6 — Riscos e limitações. \"Alucinação\" ocorre quando o LLM gera afirmações incorretas ou fatos inexistentes apresentados com tom de total certeza.",
      opcoes: V_F,
      correta: 0,
    },
    {
      pergunta:
        "Módulo 6 — Riscos e limitações. \"Modelos de linguagem atuais são completamente neutros e não possuem nenhum risco de viés de gênero, raça ou cultura.\"",
      opcoes: V_F,
      correta: 1,
    },
    {
      pergunta:
        "Módulo 7 — Técnicas de prompt. \"Few-Shot Prompting consiste em fornecer 2 a 3 exemplos práticos de entrada/saída dentro do prompt para guiar a IA.\"",
      opcoes: V_F,
      correta: 0,
    },
    {
      pergunta: "Módulo 7 — Técnicas de prompt. \"Quanto mais ambíguo e vago for o prompt, melhor e mais precisa será a resposta da IA.\"",
      opcoes: V_F,
      correta: 1,
    },
    {
      pergunta:
        "Módulo 7 — Técnicas de prompt. \"Chain-of-Thought (cadeia de pensamento) instrui a IA a pensar passo a passo antes de dar a resposta final, reduzindo erros em raciocínios complexos.\"",
      opcoes: V_F,
      correta: 0,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Módulo 8 — Prática em IA gratuita (Chain-of-Thought). Na sua IA gratuita, envie: \"Resolva o seguinte problema pensando passo a passo antes de dar a resposta final: se 3 gatos caçam 3 ratos em 3 minutos, quanto tempo 100 gatos levam para caçar 100 ratos?\". Cole aqui o trecho do raciocínio e a resposta final fornecida pela IA.",
      respostasAceitas: ["3 minutos", "tres minutos", "minuto", "tempo", "100", "gato", "rato", "raciocinio", "passo", "logica"],
    },
    {
      pergunta:
        "Módulo 9 — Arquitetura RAG. Conversão de documentos internos em vetores (embeddings) e armazenamento em banco vetorial. Em que ordem do fluxo isso acontece?",
      opcoes: PASSOS,
      correta: 0,
    },
    {
      pergunta: "Módulo 9 — Arquitetura RAG. Busca e recuperação dos trechos de documentos mais relevantes para a pergunta do usuário. Em que ordem do fluxo isso acontece?",
      opcoes: PASSOS,
      correta: 1,
    },
    {
      pergunta:
        "Módulo 9 — Arquitetura RAG. Envio dos trechos encontrados como contexto extra no prompt para o LLM gerar a resposta fundamentada. Em que ordem do fluxo isso acontece?",
      opcoes: PASSOS,
      correta: 2,
    },
    {
      tipo: "dissertativa",
      pergunta:
        "Módulo 10 — Governança e privacidade. Um colaborador colou o código-fonte proprietário de um software interno e relatórios financeiros confidenciais na versão gratuita de um chatbot de IA na web. Descreva os riscos de segurança/privacidade envolvidos e qual é a conduta correta.",
      respostasAceitas: ["dado", "vazam", "vazar", "treinament", "privacidade", "seguranca", "confidenc", "lgpd", "politica"],
    },
  ],
};

export default prova;
