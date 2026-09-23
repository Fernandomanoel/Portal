import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação Prática de Marketing, Publicidade e Modelagem de Mídia",
  introducao:
    "Esta simulação cobre o planejamento de uma campanha digital sustentável: definição de persona e briefing, copywriting adaptado por canal (Instagram e LinkedIn), roteiro de um carrossel visual e diagnóstico de performance de um anúncio. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "persona-posicionamento",
      titulo: "Definição de Persona e Posicionamento",
      cenario:
        "Cenário da Campanha: A marca fictícia \"EcoEvolua\" (empresa focada em produtos sustentáveis e moda circular) lançará uma campanha digital para o Mês do Meio Ambiente.",
      campos: [
        {
          id: "persona-perfil",
          rotulo: "Perfil da Persona (Idade, Interesses, Dores e Hábitos)",
          placeholder: "Descreva o perfil do consumidor ideal...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 15 },
        },
        {
          id: "tom-de-voz",
          rotulo: "Tom de Voz (Tone of Voice) e Linguagem da Marca",
          placeholder: "Ex: Inspirador, educativo, acolhedor, sem termos burocráticos...",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "matriz-briefing",
      titulo: "Matriz do Briefing da Campanha",
      campos: [
        {
          id: "objetivo-smart",
          rotulo: "Objetivo SMART da Campanha",
          placeholder: "Ex: Aumentar engajamento em 30% e gerar 5 mil leads",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "proposta-key-message",
          rotulo: "Proposta Única de Valor (Key Message)",
          placeholder: "Ex: 'Pequenas atitudes diárias transformam o planeta'",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
        {
          id: "slogan-acao",
          rotulo: "Slogan da Ação",
          placeholder: "Ex: #DesafioEcoEvolua: Qual a sua pegada?",
          regra: { tipo: "texto", minPalavras: 2, minCaracteres: 8 },
        },
      ],
    },
    {
      id: "post-instagram",
      titulo: "Postagem 1: Instagram (Conscientização e Engajamento)",
      instrucao: "Corpo da legenda (legenda completa).",
      campos: [
        {
          id: "legenda-instagram",
          placeholder: "Escreva a legenda completa do Instagram com emojis, quebras de linha e CTA final...",
          regra: { tipo: "texto", minPalavras: 6, minCaracteres: 25 },
        },
      ],
    },
    {
      id: "post-linkedin",
      titulo: "Postagem 2: LinkedIn (Foco Corporativo / ESG)",
      campos: [
        {
          id: "texto-linkedin",
          placeholder: "Escreva um texto corporativo sobre práticas de ESG e responsabilidade socioambiental...",
          regra: { tipo: "texto", minPalavras: 6, minCaracteres: 25 },
        },
      ],
    },
    {
      id: "roteiro-carrossel",
      titulo: "Projeto Visual Extraclasse: Roteiro e Modelagem de Carrossel",
      cenario:
        "Roteirize e registre o link da arte criada externamente no Canva ou Photoshop. Crie as artes do carrossel no Canva ou Photoshop e cole o link no campo abaixo.",
      campos: [
        {
          id: "link-design",
          rotulo: "Link do Design Criado (Canva / Figma / Drive)",
          placeholder: "https://www.canva.com/design/...",
          regra: { tipo: "padrao", padrao: /^https?:\/\// },
          mensagemErrada: "Cole um link válido (começando com http:// ou https://) para a arte criada.",
        },
        {
          id: "descricao-identidade",
          rotulo: "Descrição da Identidade Visual Utilizada",
          placeholder: "Ex: Tons terrosos, tipografia sem serifa em negrito e ícones ilustrativos",
          regra: { tipo: "texto", minPalavras: 3, minCaracteres: 12 },
        },
      ],
    },
    {
      id: "diagnostico-anuncio",
      titulo: "Gestão de Mídia: Análise de Métricas e Performance",
      cenario: "Métricas do Anúncio (Investimento: R$ 500).",
      tabelaReferencia: {
        colunas: ["Métrica", "Valor"],
        linhas: [
          ["Impressões", "45.000"],
          ["Cliques no link (CTR)", "1.800 (4,0%)"],
          ["Vendas no site", "12"],
        ],
      },
      instrucao: "Diagnóstico e Otimização do Anúncio.",
      campos: [
        {
          id: "diagnostico-performance",
          rotulo: "Diagnóstico da Performance (Onde esteve o gargalo?)",
          placeholder: "Analise por que o anúncio atraiu muitos cliques (1.800) mas gerou poucas compras (12)...",
          regra: { tipo: "texto", minPalavras: 5, minCaracteres: 20 },
        },
        {
          id: "plano-melhoria",
          rotulo: "Plano de Melhoria para a Próxima Campanha",
          placeholder: "Proponha ajustes no site, na oferta ou na página de vendas...",
          regra: { tipo: "texto", minPalavras: 5, minCaracteres: 20 },
        },
      ],
    },
  ],
};

export default atividade;
