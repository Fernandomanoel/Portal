import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação de Growth Marketing, Estratégia de Mídia e Lançamentos",
  introducao:
    "Esta simulação cobre neuromarketing e aversão à perda, redação de anúncios de tráfego pago (Google Search Ads) e estratégia de rebranding para conquistar um novo público. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "aversao-perda",
      titulo: "Neuromarketing Aplicado e Aversão à Perda",
      cenario: "Reformulação de chamadas comerciais utilizando aversão à perda e prova social.",
      instrucao: "Análise do Viés de Aversão à Perda.",
      campos: [
        {
          id: "analise-aversao",
          placeholder: "Explique como a sensação de 'medo de perder uma oportunidade' pode ser aplicada eticamente em um e-commerce...",
          regra: { tipo: "texto", minPalavras: 5, minCaracteres: 20 },
        },
      ],
    },
    {
      id: "anuncio-google-ads",
      titulo: "Tráfego Pago: Redação de Anúncio no Google Search Ads",
      cenario: "Crie os títulos de anúncio patrocinado de pesquisa para o fone sem fio AuraTech.",
      campos: [
        {
          id: "titulo-anuncio-1",
          rotulo: "Título 1 (Máx 30 caracteres)",
          placeholder: "Ex: Fone Bluetooth AuraTech",
          regra: { tipo: "texto", minPalavras: 2, minCaracteres: 8 },
        },
        {
          id: "titulo-anuncio-2",
          rotulo: "Título 2 (Máx 30 caracteres)",
          placeholder: "Ex: Cancelamento de Ruído 99%",
          regra: { tipo: "texto", minPalavras: 2, minCaracteres: 8 },
        },
        {
          id: "titulo-anuncio-3",
          rotulo: "Título 3 (Máx 30 caracteres)",
          placeholder: "Ex: Frete Grátis Para Todo Brasil",
          regra: { tipo: "texto", minPalavras: 2, minCaracteres: 8 },
        },
        {
          id: "descricao-anuncio",
          rotulo: "Descrição do Anúncio do Google",
          placeholder: "Ex: Garanta som de alta fidelidade e bateria para 30 horas. Compre em até 10x sem juros no site!",
          regra: { tipo: "texto", minPalavras: 5, minCaracteres: 20 },
        },
      ],
    },
    {
      id: "rebranding",
      titulo: "Estratégia de Rebranding e Reposicionamento",
      cenario: "Proposta de rejuvenescimento de uma marca tradicional de calçados para atingir a Geração Z.",
      instrucao: "Resumo da Estratégia de Rebranding.",
      campos: [
        {
          id: "resumo-rebranding",
          placeholder: "Resuma como esse reposicionamento ajudará a rejuvenescer a marca sem perder os clientes antigos...",
          regra: { tipo: "texto", minPalavras: 5, minCaracteres: 20 },
        },
      ],
    },
  ],
};

export default atividade;
