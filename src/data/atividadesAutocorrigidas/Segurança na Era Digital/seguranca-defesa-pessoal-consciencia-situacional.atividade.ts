import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-defesa-pessoal-consciencia-situacional.html, sem cortes. As regras de
// correção (mínimo de palavras, palavras-chave, resposta certa) são as mesmas da página antiga.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Defesa Pessoal, Consciência Situacional e Proteção Urbana",
  introducao: "Aprenda princípios essenciais de prevenção de riscos, identificação de ameaças, distância de reação, desescalada de conflitos e segurança em deslocamentos. Validação em tempo real.",
  itens: [
    {
      id: "consciencia-situacional-e-codigos-de-atencao-urb",
      titulo: "Consciência Situacional e Códigos de Atenção Urbana",
      cenario: "Cenário: Na doutrina de segurança pessoal, a consciência situacional é dividida em estados mentais de alerta. Ao caminhar em via pública ou utilizar transporte público, em qual estado de atenção um indivíduo deve se manter para prevenir abordagens surpresa?",
      campos: [
        {
          id: "def1",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "Estado Branco (Desatenção total, focado no smartphone ou usando fones de ouvido sem notar o entorno).",
              "Estado Amarelo (Alerta descontraído e constante, observando pessoas, rotas de fuga e comportamentos suspeitos à distância).",
              "Estado Preto (Paralisia de pânico total após a agressão ter iniciado).",
            ],
            correta: 1,
          },
          mensagemCerta: "Correto! O Estado Amarelo é o nível de alerta descontraído recomendado para ambientes públicos.",
          mensagemErrada: "Incorreto. O Estado Amarelo representa a atenção preventiva ideal em vias públicas.",
        },
      ],
    },
    {
      id: "distancia-de-seguranca-e-postura-defensiva-nao-v",
      titulo: "Distância de Segurança e Postura Defensiva Não Verbal",
      cenario: "Desafio Tático: Explique a importância da Distância de Reação (Regra dos 2 metros) e descreva como adotar uma postura defensiva passiva (mãos espalmadas na altura do peito) sem incitar violência.",
      campos: [
        {
          id: "def2-distancia",
          rotulo: "Importância da Distância de Reação:",
          placeholder: "Ex: Garante tempo de reação hábil para se esquivar, fugir ou sacar um equipamento de defesa...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
        {
          id: "def2-postura",
          rotulo: "Função da Postura Defensiva Passiva:",
          placeholder: "Ex: Protege a cabeça e o tronco, impõe limite espacial e demonstra ao agressor intenção de paz sem abaixar a guarda...",
          regra: {
            tipo: "texto",
            minPalavras: 3,
            minCaracteres: 12,
          },
        },
      ],
    },
    {
      id: "selecao-de-equipamentos-e-dispositivos-nao-letai",
      titulo: "Seleção de Equipamentos e Dispositivos Não Letais",
      cenario: "Associe a necessidade de defesa ao recurso não letal mais apropriado para criar oportunidade de fuga:",
      campos: [
        {
          id: "def3-e1",
          rotulo: "Causar incapacitação temporária visual e respiratória imediata no agressor a uma distância segura (2 a 3 metros).",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "spray",
                texto: "Spray de Pimenta / Gengibre (Incapacitante aerossol)",
              },
              {
                valor: "alarme",
                texto: "Alarme Pessoal Sonoro de Alta Voltagem/Decibéis",
              },
            ],
            esperado: "spray",
          },
          mensagemCerta: "Perfeito! Spray é ideal para incapacitação à distância e Alarme Sonoro para disrupção/chamar atenção.",
          mensagemErrada: "Incorreto. Incapacitação aerossol = Spray; Disrupção sonora = Alarme Pessoal.",
        },
        {
          id: "def3-e2",
          rotulo: "Atrair atenção de terceiros na vizinhança e desorientar o agressor em ambientes urbanos sem contato físico.",
          regra: {
            tipo: "selecao",
            opcoes: [
              {
                valor: "spray",
                texto: "Spray de Pimenta / Gengibre (Incapacitante aerossol)",
              },
              {
                valor: "alarme",
                texto: "Alarme Pessoal Sonoro de Alta Voltagem/Decibéis",
              },
            ],
            esperado: "alarme",
          },
          mensagemCerta: "Perfeito! Spray é ideal para incapacitação à distância e Alarme Sonoro para disrupção/chamar atenção.",
          mensagemErrada: "Incorreto. Incapacitação aerossol = Spray; Disrupção sonora = Alarme Pessoal.",
        },
      ],
    },
    {
      id: "procedimentos-de-emergencia-suspeita-de-rastream",
      titulo: "Procedimentos de Emergência: Suspeita de Rastreamento a Pé",
      cenario: "Cenário de Análise: Você está caminhando à noite e percebe uma pessoa com atitude suspeita mantendo o mesmo ritmo atrás de você por vários quarteirões. Quais ações corretas você deve tomar para quebrar o elemento surpresa e buscar abrigo seguro?",
      campos: [
        {
          id: "def4-seguido",
          placeholder: "Explique os passos: mudar de calçada/direção para confirmar a suspeita, entrar em estabelecimento comercial movimentado, não ir para casa e acionar as autoridades...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /mudar|calçada|comércio|loja|moviment|polícia|ajuda|atitude|quebrar/i,
          },
          mensagemErrada: "Explique a importância de mudar de calçada, entrar em locais movimentados ou acionar a polícia.",
        },
      ],
    },
    {
      id: "seguranca-em-deslocamento-transicao-veicular-e-r",
      titulo: "Segurança em Deslocamento: Transição Veicular e Residencial",
      cenario: "Estudo de Caso Final: A maioria dos assaltos a residências e veículos ocorre nos momentos de transição (embarque, desembarque e abertura de portão). Descreva as principais regras de prevenção que devem ser adotadas ao chegar de carro ou a pé em sua residência.",
      campos: [
        {
          id: "def5-transicao",
          placeholder: "Discorra sobre observar a rua antes de parar o carro, não ficar parado no veículo usando o celular, checar arredores e manter o portão fechado rapidamente...",
          regra: {
            tipo: "texto",
            minPalavras: 4,
            minCaracteres: 15,
            palavrasChave: /parar|celular|entrar|portão|observar|redor|arredor|veículo|carro|rápid/i,
          },
          mensagemErrada: "Mencione evitar distrações no celular, observar os arredores antes de parar e agilidade no portão.",
        },
      ],
    },
  ],
};

export default atividade;

