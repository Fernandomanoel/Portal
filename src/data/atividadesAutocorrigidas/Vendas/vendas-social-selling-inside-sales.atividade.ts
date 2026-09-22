import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];

const OPCOES_MQL_SQL = [
  { valor: "mql", texto: "MQL (Marketing Qualified Lead)" },
  { valor: "sql", texto: "SQL (Sales Qualified Lead)" },
];

const OPCOES_ORDEM = [
  { valor: "1", texto: "1º Passo" },
  { valor: "2", texto: "2º Passo" },
  { valor: "3", texto: "3º Passo" },
  { valor: "4", texto: "4º Passo" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Vendas — Social Selling, Inside Sales e Qualificação Avançada",
  introducao:
    "Aprofunde-se nas abordagens modernas de vendas: qualificação de leads entre Marketing e Vendas, estratégias de prospecção via redes sociais, cadência de follow-up e cálculo de Win Rate (Taxa de Ganho). Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "marketing-vendas-transicao",
      titulo: "A Transição de Marketing para Vendas",
      cenario:
        "O alinhamento (Smarketing) entre as equipes de Marketing e Vendas é crucial no Inside Sales. Complete o texto com as nomenclaturas corretas do funil:",
      instrucao:
        "Quando um contato demonstra interesse através de materiais educativos e atinge uma pontuação mínima no sistema, ele é repassado para vendas como um ___(1)___. Após o time de pré-vendas (SDR) ligar para este contato e confirmar que ele tem perfil ideal e momento de compra (qualificação), o contato avança no funil e se torna oficialmente um ___(2)___. As regras, métricas e o acordo formal entre o Marketing (entregar volume) e Vendas (trabalhar os leads rápido) são documentadas em um ___(3)___.",
      campos: [
        {
          id: "transicao-mql",
          rotulo: "Lacuna 1",
          regra: { tipo: "selecao", esperado: "mql", opcoes: OPCOES_MQL_SQL },
          mensagemCerta: "O Marketing entrega o MQL.",
          mensagemErrada: "A pontuação de marketing gera um MQL.",
        },
        {
          id: "transicao-sql",
          rotulo: "Lacuna 2",
          regra: { tipo: "selecao", esperado: "sql", opcoes: OPCOES_MQL_SQL },
          mensagemCerta: "O SDR qualifica e o transforma em SQL.",
          mensagemErrada: "A aprovação de vendas gera um SQL.",
        },
        {
          id: "transicao-sla",
          rotulo: "Lacuna 3",
          regra: {
            tipo: "selecao",
            esperado: "sla",
            opcoes: [
              { valor: "sla", texto: "SLA (Service Level Agreement)" },
              { valor: "roi", texto: "ROI (Retorno sobre Investimento)" },
            ],
          },
          mensagemCerta: "Tudo regido pelo SLA (Acordo de Nível de Serviço).",
          mensagemErrada: "O acordo entre as áreas é o SLA.",
        },
      ],
    },
    {
      id: "social-selling-condutas",
      titulo: "Prospecção B2B via Social Selling",
      cenario:
        "O \"Social Selling\" (Venda Social) transformou a maneira de abordar executivos em redes como o LinkedIn. Avalie as condutas abaixo:",
      campos: [
        {
          id: "social-selling-spam",
          rotulo:
            "1. Praticar Social Selling significa automatizar milhares de convites no LinkedIn e, assim que o cliente aceitar, imediatamente enviar um texto longo (pitch) com um link de compra direto para o produto.",
          regra: { tipo: "selecao", esperado: "F", opcoes: OPCOES_VF },
          mensagemCerta: "Disparar spam com links de compra imediata destrói a reputação (Falso).",
          mensagemErrada: "A primeira afirmação é Falsa, pois Social Selling foge do spam automatizado.",
        },
        {
          id: "social-selling-relacionamento",
          rotulo:
            "2. O verdadeiro Social Selling baseia-se na construção de relacionamento e autoridade: compartilhar artigos do setor, curtir posts do prospect e gerar valor consultivo antes de oferecer uma solução comercial.",
          regra: { tipo: "selecao", esperado: "V", opcoes: OPCOES_VF },
          mensagemCerta: "O verdadeiro Social Selling é consultivo e cria relacionamentos autênticos (Verdadeiro).",
          mensagemErrada: "A segunda é Verdadeira, foco total no relacionamento.",
        },
      ],
    },
    {
      id: "win-rate-aline",
      titulo: "Cálculo de Conversão: Win Rate (Taxa de Ganho)",
      cenario:
        "No Inside Sales, o Win Rate mede a eficiência final do vendedor: quantos negócios ele conseguiu fechar em relação ao total de oportunidades que ele negociou.",
      instrucao:
        "Fórmula Win Rate: (Ganhos ÷ Oportunidades Totais) × 100. Calcule e digite o Win Rate (Taxa de Ganho) da Aline (apenas o número, sem o sinal de %).",
      tabelaReferencia: {
        colunas: ["Indicador do Funil", "Volume (Unidades)"],
        linhas: [
          ["Oportunidades Recebidas e Negociadas no mês", "40 Oportunidades"],
          ["Negócios Perdidos (Lost)", "32 Negócios"],
          ["Negócios Fechados / Ganhos (Won)", "8 Negócios"],
        ],
      },
      campos: [
        {
          id: "win-rate-aline",
          placeholder: "Exemplo: 15",
          regra: { tipo: "numero", esperado: 20 },
          mensagemCerta:
            "Cálculo exato! Dividindo os 8 negócios ganhos por 40 oportunidades totais obtemos 0,20. Ou seja, um Win Rate de 20%.",
          mensagemErrada: "Incorreto. Aplique a fórmula: (8 Ganhos ÷ 40 Oportunidades Totais). Multiplique o resultado por 100.",
        },
      ],
    },
    {
      id: "cadencia-prospeccao",
      titulo: "Cadência de Prospecção (Fluxo de Toques)",
      cenario:
        "Para não ser ignorado, o vendedor Outbound cria uma \"Cadência\" estratégica: uma sequência lógica de tentativas de contato alternando canais. Ordene as etapas de uma cadência típica (do 1º ao 4º passo):",
      campos: [
        {
          id: "cadencia-email",
          rotulo: "Pesquisa prévia da empresa e envio do 1º E-mail de Apresentação focado na dor do cliente.",
          regra: { tipo: "selecao", esperado: "1", opcoes: OPCOES_ORDEM },
          mensagemCerta: "O E-mail abre portas (1º passo).",
          mensagemErrada: "1º passo: E-mail de pesquisa.",
        },
        {
          id: "cadencia-ligacao",
          rotulo: "Cold Call (Ligação Fria) para tentar uma conexão rápida e referenciar o e-mail enviado anteriormente.",
          regra: { tipo: "selecao", esperado: "2", opcoes: OPCOES_ORDEM },
          mensagemCerta: "A Ligação busca a resposta (2º passo).",
          mensagemErrada: "2º passo: Ligação referenciando o e-mail.",
        },
        {
          id: "cadencia-social",
          rotulo: "Interação via Social Selling (ex: pedido de conexão no LinkedIn com nota amigável e sem pitch de venda).",
          regra: { tipo: "selecao", esperado: "3", opcoes: OPCOES_ORDEM },
          mensagemCerta: "O Social apoia (3º passo).",
          mensagemErrada: "3º passo: Apoio Social (LinkedIn).",
        },
        {
          id: "cadencia-breakup",
          rotulo:
            "E-mail de Break-up (E-mail de despedida): \"Como não tive retorno, estou encerrando as tentativas por aqui. Deixo meu contato caso precise no futuro\".",
          regra: { tipo: "selecao", esperado: "4", opcoes: OPCOES_ORDEM },
          mensagemCerta: "O Break-up encerra o fluxo com classe (4º passo).",
          mensagemErrada: "4º passo: Break-up.",
        },
      ],
    },
    {
      id: "icebreaker-linkedin",
      titulo: "A Quebra de Gelo (Icebreaker) no LinkedIn",
      cenario:
        "Cenário: Você quer prospectar a Diretora de RH de uma multinacional via LinkedIn. Você leu um post recente dela sobre \"Os desafios do trabalho remoto\".",
      instrucao:
        "Escreva sua mensagem de conexão (máximo 300 caracteres). Não venda seu produto ainda! O objetivo é criar engajamento. (Mínimo de 10 palavras). Dica: utilize palavras como \"post\", \"artigo\", \"conteúdo\", \"visão\", \"concordo\" ou \"conexão\".",
      campos: [
        {
          id: "icebreaker-linkedin",
          placeholder:
            "Ex: Olá Fulana, li seu recente post sobre os desafios do trabalho remoto e concordo muito com a sua visão. Adoraria fazer essa conexão para acompanharmos nossos conteúdos...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /post|artigo|conteúdo|visão|concordo|conexão|relacionamento|insight|perspectiva|interessante/i,
          },
          mensagemCerta:
            "Abordagem excelente! Você usou um gatilho de afinidade (elogiar o conteúdo do prospect). Isso abaixa a guarda do cliente e eleva absurdamente a taxa de aceitação de conexões.",
          mensagemErrada:
            "Você deve personalizar a abordagem! Utilize o gancho sugerido mencionando o 'post/artigo', valorizando a 'visão' do cliente e pedindo a 'conexão'.",
        },
      ],
    },
  ],
};

export default atividade;
