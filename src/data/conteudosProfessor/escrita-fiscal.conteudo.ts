import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "A escrita fiscal registra e apura os tributos das operações da empresa: documentos fiscais (NF-e, NFS-e, CT-e), livros fiscais, impostos federais, estaduais e municipais e regimes de tributação. Valores e regras mudam com a lei: sempre confira a legislação vigente.",
  topicos: [
    {
      titulo: "Sistema tributário e Código Tributário Nacional",
      texto: [
        "Tributo é a prestação em dinheiro cobrada por lei, que não é multa. As espécies são impostos (sem contrapartida direta, como ICMS e IR), taxas (por serviço público ou poder de polícia) e contribuições de melhoria. Cada tributo tem fato gerador (a situação que faz nascer a obrigação), base de cálculo (o valor sobre o qual se calcula) e alíquota (a porcentagem). Imposto = base de cálculo × alíquota.",
        "Competência: a União cobra impostos federais (IR, IPI, PIS, COFINS), os estados, o ICMS e o IPVA, e os municípios, o ISS e o IPTU.",
      ],
      pontos: ["Identificar fato gerador, base de cálculo e alíquota.", "Dizer quem cobra cada imposto."],
      atividades: ["escrita-fiscal-sistema-tributario-e-cnt"],
    },
    {
      titulo: "Regimes de tributação e Simples Nacional",
      texto: [
        "Os regimes são Simples Nacional (para pequenas empresas, com guia única e alíquotas por faixa de receita dos últimos 12 meses), Lucro Presumido (a lei presume uma margem de lucro para calcular IRPJ e CSLL) e Lucro Real (o imposto parte do lucro apurado na contabilidade). Cada regime tem limites e regras próprias.",
        "No Simples, a alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12, e o imposto do mês = receita do mês × alíquota efetiva. As tabelas dos anexos mudam por lei: confira a vigente.",
      ],
      pontos: ["Explicar como se escolhe o regime.", "Calcular a alíquota efetiva do Simples."],
      atividades: ["escrita-fiscal-regimes-de-tributacao", "escrita-fiscal-simples-nacional-aliquota-efetiva"],
    },
    {
      titulo: "Impostos municipais e estaduais: ISS, IPTU, ICMS e IPVA",
      texto: [
        "O ISS incide sobre serviços e tem alíquota definida pelo município. Pode ser retido pelo cliente na fonte. O IPTU incide sobre o imóvel urbano.",
        "O ICMS é o imposto estadual sobre circulação de mercadorias, e funciona pelo princípio da não cumulatividade: apura-se na conta gráfica, debitando o imposto das vendas e creditando o das compras. Se débitos > créditos, paga-se a diferença; se créditos > débitos, fica saldo credor. O IPVA incide sobre veículos.",
      ],
      pontos: ["Fazer a apuração do ICMS pela conta gráfica.", "Explicar retenção de ISS."],
      exemplo: "ICMS das vendas: R$ 12.000; ICMS das compras: R$ 8.500. A pagar: R$ 3.500.",
      atividades: ["escrita-fiscal-impostos-municipais", "escrita-fiscal-impostos-estaduais"],
    },
    {
      titulo: "Impostos federais: PIS, COFINS, IRPJ e CSLL",
      texto: [
        "PIS e COFINS são contribuições sobre a receita. No regime não cumulativo (Lucro Real), há débitos sobre as vendas e créditos sobre certas compras e despesas. IRPJ e CSLL incidem sobre o lucro e, no Lucro Real, partem do resultado contábil com ajustes. As alíquotas e as regras de crédito mudam: confira a legislação.",
      ],
      pontos: ["Apurar PIS e COFINS com débito e crédito.", "Explicar a diferença entre cumulativo e não cumulativo."],
      atividades: ["escrita-fiscal-impostos-federais"],
    },
    {
      titulo: "Documentos fiscais eletrônicos e livros fiscais",
      texto: [
        "A NF-e acompanha a venda de mercadorias, a NFS-e documenta serviços e o CT-e, o transporte. Cada documento traz as partes, os itens, as bases de cálculo e os impostos. O CFOP é o código que classifica a operação (venda, compra, devolução, dentro ou fora do estado).",
        "Os livros fiscais (Registro de Entradas, de Saídas e de Apuração) organizam as operações do mês para a apuração e a prestação de informações ao fisco.",
      ],
      pontos: ["Ler os campos principais de uma NF-e.", "Totalizar o Livro de Saídas por CFOP."],
      atividades: ["escrita-fiscal-nfe-e-livros-fiscais", "escrita-fiscal-nfse-e-cte"],
    },
    {
      titulo: "Contabilidade, obrigações e parcelamento",
      texto: [
        "A escrituração contábil e fiscal alimenta as obrigações acessórias (declarações). Quando a empresa tem débito tributário, pode parcelar conforme as regras do programa vigente; o parcelamento acrescenta juros (em geral Selic) e multa conforme a legislação.",
        "Um balancete de verificação lista todas as contas com saldos e serve para achar diferença: soma dos débitos igual à dos créditos.",
      ],
      pontos: ["Conferir um balancete.", "Simular um parcelamento simples."],
      atividades: ["escrita-fiscal-contabilidade-e-parcelamento"],
    },
  ],
  glossario: [
    { termo: "Fato gerador", definicao: "Situação definida em lei que faz nascer a obrigação de pagar um tributo." },
    { termo: "Base de cálculo", definicao: "Valor sobre o qual se aplica a alíquota." },
    { termo: "Alíquota", definicao: "Porcentagem aplicada à base de cálculo." },
    { termo: "NF-e", definicao: "Nota fiscal eletrônica de mercadorias." },
    { termo: "CFOP", definicao: "Código que identifica a natureza da operação fiscal." },
    { termo: "Não cumulatividade", definicao: "Abater do imposto devido o imposto pago nas etapas anteriores." },
  ],
  dicas: [
    "Avise a turma desde o início: alíquotas e prazos mudam; o raciocínio é o que fica.",
    "Mostre uma nota fiscal real (sem dados sensíveis) e peça que o aluno localize base de cálculo e imposto.",
    "Faça a conta de um mês inteiro na planilha: apurar na prática ajuda a entender a conta gráfica.",
  ],
};

export default conteudo;
