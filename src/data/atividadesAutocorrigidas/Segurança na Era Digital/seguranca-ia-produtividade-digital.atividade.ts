import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-ia-produtividade-digital.html, sem cortes. As regras de
// correção (mínimo de palavras, palavras-chave, resposta certa) são as mesmas da página antiga.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial e Produtividade Digital",
  introducao: "Aprenda a estruturar prompts eficazes, aplicar ferramentas de automação no trabalho e avaliar os aspectos éticos da IA. Todas as respostas contam com correção instantânea e validação anti-spam.",
  itens: [
    {
      id: "fundamentos-de-inteligencia-artificial-generativ",
      titulo: "Fundamentos de Inteligência Artificial Generativa",
      cenario: "Questão 1: O que define fundamentalmente um modelo de Inteligência Artificial Generativa (como LLMs de texto ou geradores de imagem) em comparação com sistemas tradicionais de busca?",
      campos: [
        {
          id: "ia1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Ele apenas copia e cola links de sites da internet sem processar o texto.",
              "Ele sintetiza informações e gera novos conteúdos (textos, códigos, imagens) com base no aprendizado de padrões de dados.",
              "É um programa de antivírus que limpa arquivos duplicados do computador.",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! A IA Generativa sintetiza dados e cria novos conteúdos com base em padrões.",
          mensagemErrada: "Incorreto. A alternativa B é a correta.",
        },
      ],
    },
    {
      id: "engenharia-de-prompt-estrutura-profissional",
      titulo: "Engenharia de Prompt: Estrutura Profissional",
      cenario: "Desafio de Criação: Escreva um Prompt Estruturado para solicitar que uma IA elabore um e-mail de cobrança amigável para um cliente com fatura em atraso. Seu prompt deve conter obrigatoriamente: Papel/Atuação (ex: \"Atue como gestor financeiro\"), Contexto, Tarefa principal e Tom de voz desejado.",
      campos: [
        {
          id: "ia2-prompt",
          placeholder: "Ex: Atue como um especialista em atendimento ao cliente. Escreva um e-mail lembrando um cliente sobre o vencimento de uma fatura há 3 dias. O tom deve ser respeitoso, profissional e oferecer opções de segunda via do boleto...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /atue|escreva|tom|e-mail|fatura|cobranç|respeit|profission|client|atras/i,
          },
          mensagemErrada: "O prompt está legível, mas deve conter instruções claras (papel, contexto, tarefa e tom de voz).",
        },
      ],
    },
    {
      id: "mapeamento-de-casos-de-uso-na-rotina-de-trabalho",
      titulo: "Mapeamento de Casos de Uso na Rotina de Trabalho",
      cenario: "Associe a tarefa do dia a dia à aplicação mais adequada da Inteligência Artificial:",
      campos: [
        {
          id: "ia3-u1",
          rotulo: "Resumir uma reunião gravada de 1 hora e extrair os pontos de ação (Action Items).",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "transcricao",
                texto: "Transcrição automática com IA e geração de ata sintética",
              },
              {
                valor: "imagem",
                texto: "Geração de imagem fidedigna da sala de reunião",
              },
            ],
            esperado: "transcricao",
          },
          mensagemCerta: "Excelente! Transcrição/Ata automática e Intérprete de Código são os casos de uso perfeitos.",
          mensagemErrada: "Incorreto. Selecione as ferramentas de IA adequadas para reuniões e planilhas.",
        },
        {
          id: "ia3-u2",
          rotulo: "Analisar uma planilha com milhares de linhas e identificar padrões de vendas.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "analise_dados",
                texto: "Análise de dados com intérprete de código/IA analítica",
              },
              {
                valor: "imagem",
                texto: "Tradução de áudio em tempo real sem suporte a números",
              },
            ],
            esperado: "analise_dados",
          },
          mensagemCerta: "Excelente! Transcrição/Ata automática e Intérprete de Código são os casos de uso perfeitos.",
          mensagemErrada: "Incorreto. Selecione as ferramentas de IA adequadas para reuniões e planilhas.",
        },
      ],
    },
    {
      id: "checagem-de-fatos-e-mitigacao-de-alucinacoes",
      titulo: "Checagem de Fatos e Mitigação de Alucinações",
      cenario: "Cenário: Ao gerar um relatório jurídico ou técnico usando IA, o modelo citou leis ou estatísticas que parecem muito convincentes, mas que você não conhece. O que significa o fenômeno da \"Alucinação de IA\" e quais cuidados de verificação devem ser tomados antes de enviar o documento?",
      campos: [
        {
          id: "ia4-def",
          rotulo: "O que é Alucinação de IA?",
          placeholder: "Ex: Quando a IA inventa informações falsas ou referências inexistentes com aparente certeza...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
        {
          id: "ia4-acao",
          rotulo: "Ação de Checagem / Verificação Humana (Human-in-the-loop):",
          placeholder: "Ex: Checar fontes primárias, consultar bases oficiais e nunca publicar dados sem revisão humana...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
      ],
    },
    {
      id: "seguranca-de-dados-corporativos-ao-usar-ia",
      titulo: "Segurança de Dados Corporativos ao Usar IA",
      cenario: "Estudo de Caso Final: Um funcionário colou o código-fonte confidencial de um software da empresa ou uma lista de CPF de clientes na versão pública de uma ferramenta de IA para pedir uma correção. Por que esse comportamento é considerado uma grave violação de privacidade e segurança?",
      campos: [
        {
          id: "ia5-etica",
          placeholder: "Explique os riscos de vazamento de segredo industrial, treinamento de modelos públicos com dados da empresa e LGPD...",
          regra: {
            tipo: "texto",
            minPalavras: 5,
            minCaracteres: 20,
            palavrasChave: /vazam|confidenc|privacid|lgpd|segred|dado|treinam|risco|exposiç/i,
          },
          mensagemErrada: "Mencione riscos de vazamento de dados confidenciais, segredo industrial ou LGPD na sua resposta.",
        },
      ],
    },
  ],
};

export default atividade;

