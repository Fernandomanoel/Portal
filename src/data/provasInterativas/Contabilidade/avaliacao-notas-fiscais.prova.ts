import type { CampoProva, ItemProva, ProvaInterativa } from "@/types/quiz";

/**
 * Contabilidade — leitura de notas fiscais e lançamentos. Duas notas
 * fictícias (empresas e CNPJ inventados): uma NF de compra de mercadorias e
 * uma NFS-e de serviços. O aluno lê os campos, confere totais e faz os
 * lançamentos de débito e crédito. Prova escrita para o portal; respostas
 * numéricas aceitam vírgula, ponto e "R$".
 */
const NF_COMPRA = {
  url: "/provas/contabilidade/nota-fiscal-compra.svg",
  alt: "Nota fiscal nº 000.123 da Distribuidora Alfa Ltda para o Mercado Bom Preço Ltda, emitida em 05/03/2026, com 3 itens, frete de R$ 25,00, totais dos produtos e da nota em branco para o aluno calcular, pagamento em 30 dias.",
  legenda: "Nota fiscal de compra de mercadorias (dados fictícios)",
};
const NF_SERVICO = {
  url: "/provas/contabilidade/nota-fiscal-servico.svg",
  alt: "NFS-e nº 458 da Oficina Mecânica Silva ME para a Transportadora Veloz Ltda, emitida em 12/03/2026, dois serviços, total em branco para o aluno calcular, ISS de 5%, pagamento à vista.",
  legenda: "Nota fiscal de serviços (dados fictícios)",
};

const num = (id: string, rotulo: string, esperado: number): CampoProva => ({
  id,
  rotulo,
  placeholder: "Digite apenas o número",
  regra: { tipo: "numero", esperado, tolerancia: 0.01 },
});
const mc = (id: string, opcoes: string[], correta: number): CampoProva => ({ id, regra: { tipo: "multipla_escolha", opcoes, correta } });
const sel = (id: string, rotulo: string, opcoes: [string, string][], esperado: string): CampoProva => ({
  id,
  rotulo,
  regra: { tipo: "selecao", opcoes: opcoes.map(([valor, texto]) => ({ valor, texto })), esperado },
});
const CONTAS: [string, string][] = [
  ["estoque", "Estoques (mercadorias)"],
  ["caixa", "Caixa"],
  ["fornecedores", "Fornecedores"],
  ["clientes", "Clientes (contas a receber)"],
  ["receita", "Receita de serviços"],
  ["despesa", "Despesa com serviços"],
];
const GRUPOS: [string, string][] = [
  ["ativo", "Ativo"],
  ["passivo", "Passivo"],
  ["pl", "Patrimônio Líquido"],
  ["resultado", "Conta de resultado"],
];

const itens: ItemProva[] = [
  {
    titulo: "Questão 1: Quem é quem na nota?",
    enunciado: "Observe a nota fiscal e identifique as partes.",
    imagem: NF_COMPRA,
    campos: [
      sel(
        "vendedor",
        "Quem vendeu as mercadorias (emitente)?",
        [
          ["alfa", "Distribuidora Alfa Ltda"],
          ["bompreco", "Mercado Bom Preço Ltda"],
        ],
        "alfa",
      ),
      sel(
        "comprador",
        "Quem comprou (destinatário)?",
        [
          ["alfa", "Distribuidora Alfa Ltda"],
          ["bompreco", "Mercado Bom Preço Ltda"],
        ],
        "bompreco",
      ),
    ],
    mensagemCerta: "O emitente é quem vende e emite a nota; o destinatário é quem compra.",
    mensagemErrada: "O emitente fica em cima, à esquerda; o destinatário, à direita.",
  },
  {
    titulo: "Questão 2: Conferindo os totais",
    enunciado: "Na mesma nota, os campos de total vieram em branco. Some os itens e preencha o valor final.",
    imagem: NF_COMPRA,
    referencia: "Valor total da nota = total dos produtos + frete",
    campos: [num("produtos", "Soma dos valores dos 3 produtos (R$):", 825), num("nota", "Valor total da nota, com o frete (R$):", 850)],
    mensagemCerta: "360 + 225 + 240 = R$ 825,00; com o frete de R$ 25,00, a nota vale R$ 850,00.",
    mensagemErrada: "Some os três valores totais da tabela e depois acrescente o frete.",
  },
  {
    titulo: "Questão 3: Valor dos itens e lucro bruto",
    enunciado:
      "O Mercado Bom Preço pretende vender cada pacote de arroz de 5 kg por R$ 24,00. Calcule o lucro bruto se vender os 20 pacotes da nota e diga qual item tem o maior valor total na nota.",
    imagem: NF_COMPRA,
    referencia: "Lucro bruto = receita de vendas − custo das mercadorias vendidas",
    campos: [
      num("lucro", "Lucro bruto com o arroz (R$):", 120),
      sel(
        "maior",
        "Qual item tem o maior valor total na nota?",
        [
          ["arroz", "Arroz tipo 1"],
          ["feijao", "Feijão carioca"],
          ["oleo", "Óleo de soja"],
        ],
        "arroz",
      ),
    ],
    mensagemCerta: "Vendas: 20 × 24 = R$ 480,00; custo: 20 × 18 = R$ 360,00; lucro bruto R$ 120,00. O arroz (R$ 360,00) é o maior item.",
    mensagemErrada: "Calcule a receita (20 × 24) e tire o custo (20 × 18, da nota). Depois compare os totais dos itens.",
  },
  {
    titulo: "Questão 4: Lançamento da compra",
    enunciado:
      "O Mercado Bom Preço comprou as mercadorias para revenda, a prazo. O frete faz parte do custo da compra. Faça o lançamento contábil da nota.",
    imagem: NF_COMPRA,
    campos: [
      sel("debito", "Débito (o que aumentou no Ativo):", CONTAS, "estoque"),
      sel("credito", "Crédito (a dívida assumida):", CONTAS, "fornecedores"),
      num("valor", "Valor do lançamento (R$):", 850),
    ],
    mensagemCerta: "D – Estoques / C – Fornecedores, R$ 850,00 (mercadorias + frete, a prazo).",
    mensagemErrada: "Entrou mercadoria (Ativo) e surgiu uma dívida com o fornecedor (Passivo). O frete entra no custo.",
  },
  {
    titulo: "Questão 5: Vencimento da duplicata",
    enunciado: "A nota foi emitida em 05/03/2026 e o pagamento é a prazo, 30 dias após a emissão (março tem 31 dias). Quando vence?",
    imagem: NF_COMPRA,
    campos: [mc("vencimento", ["a) 04/04/2026", "b) 05/04/2026", "c) 30/03/2026", "d) 31/03/2026"], 0)],
    mensagemCerta: "05/03 + 30 dias = 04/04/2026 (faltam 26 dias para fechar março e mais 4 em abril).",
    mensagemErrada: "Conte os 30 dias a partir de 05/03; março termina no dia 31.",
  },
  {
    titulo: "Questão 6: Nota de serviços e ISS",
    enunciado: "Agora observe a nota de serviços da oficina: o total veio em branco. Calcule o total e o imposto.",
    imagem: NF_SERVICO,
    referencia: "ISS = valor total dos serviços × alíquota",
    campos: [num("total", "Valor total dos serviços (R$):", 420), num("iss", "ISS de 5% sobre o total (R$):", 21)],
    mensagemCerta: "300 + 120 = R$ 420,00; 420 × 0,05 = R$ 21,00 de ISS.",
    mensagemErrada: "Some os dois serviços e multiplique o total por 0,05.",
  },
  {
    titulo: "Questão 7: Lançamento do prestador",
    enunciado: "A oficina emitiu a nota e o serviço será pago à vista, na entrega. Faça o lançamento da receita (sem considerar o ISS).",
    imagem: NF_SERVICO,
    campos: [
      sel("debito", "Débito (onde o dinheiro entra):", CONTAS, "caixa"),
      sel("credito", "Crédito (de onde vem a receita):", CONTAS, "receita"),
      num("valor", "Valor do lançamento (R$):", 420),
    ],
    mensagemCerta: "D – Caixa / C – Receita de serviços, R$ 420,00.",
    mensagemErrada: "Entrou dinheiro no caixa (Ativo) e a oficina ganhou uma receita pelo serviço.",
  },
  {
    titulo: "Questão 8: Em qual grupo cada conta fica?",
    enunciado: "Classifique as contas no Balanço Patrimonial e na Demonstração do Resultado:",
    campos: [
      sel("caixa", "Caixa", GRUPOS, "ativo"),
      sel("fornecedores", "Fornecedores (dívida com quem vendeu a prazo)", GRUPOS, "passivo"),
      sel("capital", "Capital social (dinheiro dos sócios)", GRUPOS, "pl"),
      sel("receita", "Receita de serviços", GRUPOS, "resultado"),
    ],
    mensagemCerta: "Isso mesmo: bens e direitos são Ativo; dívidas, Passivo; dinheiro dos sócios, PL; receitas e despesas, Resultado.",
    mensagemErrada: "Bens e direitos = Ativo; obrigações = Passivo; recursos dos sócios = PL; receitas e despesas = Resultado.",
  },
  {
    titulo: "Questão 9: Equação patrimonial",
    enunciado: "Uma empresa tem Ativo de R$ 50.000,00 e Passivo (dívidas) de R$ 20.000,00.",
    referencia: "Ativo = Passivo + Patrimônio Líquido",
    campos: [num("pl", "Patrimônio Líquido (R$):", 30000)],
    mensagemCerta: "50.000 − 20.000 = R$ 30.000,00.",
    mensagemErrada: "O PL é o que sobra do Ativo depois de descontar as dívidas.",
  },
  {
    titulo: "Questão 10: Para que serve a nota fiscal na contabilidade?",
    enunciado: "Escolha a melhor resposta:",
    campos: [
      mc(
        "uso",
        [
          "a) É só um enfeite: a contabilidade registra tudo de memória.",
          "b) É o documento que comprova a operação e dá base ao lançamento contábil, ao cálculo de impostos e à auditoria.",
          "c) Serve apenas para o cliente trocar o produto.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: sem documento fiscal, não há comprovação do lançamento.",
    mensagemErrada: "Pense em como o contador prova de onde veio cada número e cada imposto.",
  },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Contabilidade — Avaliação: Notas Fiscais e Lançamentos",
  introducao:
    "Duas notas fiscais fictícias (empresas e CNPJ inventados), com os campos de total em branco. Leia com atenção, calcule e faça os lançamentos de débito e crédito.",
  itens,
};

export default prova;
