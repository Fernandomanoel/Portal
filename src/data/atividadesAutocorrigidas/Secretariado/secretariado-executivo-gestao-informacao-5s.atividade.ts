import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const VF = [
  { valor: "V", texto: "Verdadeiro (V)" },
  { valor: "F", texto: "Falso (F)" },
];
const PASSOS = [
  { valor: "1", texto: "1º Passo" },
  { valor: "2", texto: "2º Passo" },
  { valor: "3", texto: "3º Passo" },
  { valor: "4", texto: "4º Passo" },
];

const M1_OK =
  "Perfeito! A base do 5S envolve: Utilização (separar o inútil), Ordenação (cada coisa em seu lugar) e Limpeza (ambiente asseado).";
const M1_ERRO =
  "Incorreto. Revise a ordem: Descarte = Senso de Utilização; Lugares fixos = Ordenação; Tirar a sujeira = Limpeza.";
const M2_OK =
  "Correto! O protocolo garante a segurança da entrega (V). Correspondências confidenciais jamais devem ser abertas (violadas) pela secretária (F).";
const M2_ERRO =
  "Atenção: A primeira é Verdadeira. A segunda é rigorosamente Falsa, pois a quebra de correspondência confidencial é violação de privacidade.";
const M4_OK =
  "Excelente fluxo! O atendimento profissional inicia identificando-se, sonda o assunto, filtra com o diretor e resolve o encaminhamento.";
const M4_ERRO =
  "Incorreto. A triagem exige: 1º Saudação, 2º Sondagem (quem e o que), 3º Filtro interno e 4º Resolução/Recado.";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Secretariado Executivo — Gestão da Informação e 5S",
  introducao:
    "Metodologia 5S, rotinas de protocolo, orçamento de suprimentos, triagem telefônica avançada e LGPD na proteção de dados.",
  itens: [
    {
      id: "5s",
      titulo: "Metodologia 5S no Escritório",
      cenario:
        "A Metodologia 5S é um pilar da qualidade e produtividade no ambiente de trabalho. O primeiro passo para organizar a mesa e o computador da secretaria é separar o que é útil do que é inútil (descarte), aplicando o Senso de ___(1)___. Em seguida, cada objeto ou arquivo digital útil deve ter um local específico, facilitando sua localização rápida por meio do Senso de ___(2)___. Por fim, zelar para que o ambiente de trabalho, as gavetas e a recepção não acumulem sujeira e pó corresponde ao Senso de ___(3)___.",
      instrucao: "Identifique os princípios japoneses de organização completando as lacunas.",
      campos: [
        {
          id: "sec3-l1",
          rotulo: "Lacuna 1",
          regra: {
            tipo: "selecao",
            esperado: "utilizacao",
            opcoes: [
              { valor: "utilizacao", texto: "Utilização (Seiri)" },
              { valor: "limpeza", texto: "Limpeza (Seiso)" },
            ],
          },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec3-l2",
          rotulo: "Lacuna 2",
          regra: {
            tipo: "selecao",
            esperado: "ordenaçao",
            opcoes: [
              { valor: "ordenaçao", texto: "Ordenação (Seiton)" },
              { valor: "disciplina", texto: "Disciplina (Shitsuke)" },
            ],
          },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
        {
          id: "sec3-l3",
          rotulo: "Lacuna 3",
          regra: {
            tipo: "selecao",
            esperado: "limpeza",
            opcoes: [
              { valor: "saude", texto: "Saúde (Seiketsu)" },
              { valor: "limpeza", texto: "Limpeza (Seiso)" },
            ],
          },
          mensagemCerta: M1_OK,
          mensagemErrada: M1_ERRO,
        },
      ],
    },
    {
      id: "protocolo",
      titulo: "Protocolo de Correspondências",
      cenario:
        "A entrada, triagem e saída de malotes e documentos exige um rigoroso controle. Avalie as condutas de protocolo como Verdadeira (V) ou Falsa (F).",
      campos: [
        {
          id: "sec3-vf1",
          rotulo:
            "O Livro de Protocolo (ou sistema digital) serve para comprovar legal e administrativamente que um documento foi entregue ou recebido pelo destinatário correto.",
          regra: { tipo: "selecao", esperado: "V", opcoes: VF },
          mensagemCerta: M2_OK,
          mensagemErrada: M2_ERRO,
        },
        {
          id: "sec3-vf2",
          rotulo:
            "Caso chegue uma correspondência física marcada como \"Confidencial / Pessoal\" endereçada exclusivamente ao CEO, a secretária tem o dever de abri-la e ler o conteúdo para repassar um resumo a ele.",
          regra: { tipo: "selecao", esperado: "F", opcoes: VF },
          mensagemCerta: M2_OK,
          mensagemErrada: M2_ERRO,
        },
      ],
    },
    {
      id: "orcamento-suprimentos",
      titulo: "Orçamento de Material de Escritório",
      cenario:
        "Fazer a gestão do estoque do escritório evita a falta de materiais (ruptura). Calcule o valor da requisição semestral de suprimentos de impressão.",
      tabelaReferencia: {
        colunas: ["Item e Parâmetros", "Valores (R$)"],
        linhas: [
          ["Cartucho de Toner (Custo Unitário)", "R$ 85,00"],
          ["Quantidade Solicitada para o Semestre", "12 unidades"],
          ["Desconto Cedido pelo Fornecedor no Lote Total", "− R$ 100,00 (subtrair)"],
        ],
      },
      instrucao: "Cálculo: (Valor Unitário × Quantidade) − Desconto. Digite o valor FINANCEIRO TOTAL a ser aprovado para essa compra.",
      campos: [
        {
          id: "sec3-m3-input",
          placeholder: "Apenas números, ex: 900",
          regra: { tipo: "numero", esperado: 920 },
          mensagemCerta:
            "Cálculo exato! (12 unidades × R$ 85,00) = R$ 1.020,00. Subtraindo os R$ 100,00 de desconto, o custo final é de R$ 920,00.",
          mensagemErrada:
            "Incorreto. Multiplique o custo unitário (85) pela quantidade (12), e após isso, subtraia o desconto (100).",
        },
      ],
    },
    {
      id: "triagem-telefonica",
      titulo: "Triagem e Atendimento Telefônico",
      cenario:
        "Atender telefonemas de forma executiva protege o tempo da diretoria.",
      instrucao:
        "Ordene os passos corretos ao receber uma ligação de um fornecedor querendo falar com a diretora (do 1º ao 4º passo).",
      campos: [
        {
          id: "sec3-ord1",
          rotulo: "Atendimento inicial: Saudação corporativa, identificação da empresa e da secretária.",
          regra: { tipo: "selecao", esperado: "1", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
        {
          id: "sec3-ord2",
          rotulo: "Sondagem educada: Perguntar quem está falando e qual é o assunto/motivo da ligação.",
          regra: { tipo: "selecao", esperado: "2", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
        {
          id: "sec3-ord3",
          rotulo:
            "Filtro: Colocar em espera (mudo) e verificar com a diretora se ela pode ou deseja atender àquela pessoa.",
          regra: { tipo: "selecao", esperado: "3", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
        {
          id: "sec3-ord4",
          rotulo:
            "Resolução: Transferir a ligação (se autorizado) ou anotar o recado formalmente (se não puder atender).",
          regra: { tipo: "selecao", esperado: "4", opcoes: PASSOS },
          mensagemCerta: M4_OK,
          mensagemErrada: M4_ERRO,
        },
      ],
    },
    {
      id: "lgpd",
      titulo: "Gestão da Informação e LGPD",
      cenario:
        "Após uma série de entrevistas, você percebe que currículos impressos (contendo CPF, endereço, telefones e expectativa salarial) de candidatos foram deixados esquecidos sobre o balcão da recepção, onde qualquer visitante pode ler ou fotografar.",
      instrucao:
        "Sob a ótica do sigilo profissional e da Lei Geral de Proteção de Dados (LGPD), o que a secretária deve fazer imediatamente com esses documentos? Use termos como \"guardar\", \"gaveta\", \"fragmentar/triturar\", \"sigilo\", \"proteger\" ou \"LGPD\".",
      campos: [
        {
          id: "sec3-m5-dissertativa",
          placeholder: "Mínimo de 10 palavras...",
          regra: {
            tipo: "texto",
            minPalavras: 10,
            minCaracteres: 35,
            palavrasChave: /lgpd|privacidade|sigilo|triturar|fragmentar|guardar|gaveta|proteger|dados|segurança|arquivo/i,
          },
          mensagemCerta:
            "Excelente conduta ética! Dados sensíveis e pessoais exigem custódia adequada. Deixar documentos expostos gera riscos legais gravíssimos de quebra de LGPD.",
          mensagemErrada:
            "Aja em conformidade com as leis. Mencione que vai 'proteger' os dados devido à 'LGPD', devendo 'guardar' em local seguro ou 'triturar/fragmentar' se inútil.",
        },
      ],
    },
  ],
};

export default atividade;
