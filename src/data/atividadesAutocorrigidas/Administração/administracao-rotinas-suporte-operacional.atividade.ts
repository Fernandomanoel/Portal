import { analisarNumero } from "@/lib/atividadeAutocorrigida";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const CATEGORIAS_CONTAS = [
  { valor: "ti", texto: "Tecnologia e Licenças" },
  { valor: "utilidades", texto: "Água / Luz / Internet" },
  { valor: "impostos", texto: "Tributos e Impostos" },
  { valor: "fornecedores", texto: "Insumos de Terceiros" },
];

const ESTADOS_ESTOQUE = [
  { valor: "ok", texto: "Estoque Normal" },
  { valor: "critico", texto: "Nível Crítico (Fazer Pedido)" },
  { valor: "excesso", texto: "Estoque em Excesso" },
];

function itemGut(prefixo: string, titulo: string, cenario: string) {
  return {
    id: prefixo,
    titulo,
    cenario,
    instrucao: "Dê notas de 1 a 5 para Gravidade, Urgência e Tendência, e calcule a pontuação (G × U × T).",
    campos: [
      { id: `${prefixo}-g`, rotulo: "Gravidade (1 a 5)", placeholder: "Ex: 2", regra: { tipo: "padrao" as const, padrao: /^[1-5]$/ } },
      { id: `${prefixo}-u`, rotulo: "Urgência (1 a 5)", placeholder: "Ex: 3", regra: { tipo: "padrao" as const, padrao: /^[1-5]$/ } },
      { id: `${prefixo}-t`, rotulo: "Tendência (1 a 5)", placeholder: "Ex: 2", regra: { tipo: "padrao" as const, padrao: /^[1-5]$/ } },
      {
        id: `${prefixo}-pontuacao`,
        rotulo: "Pontuação (G × U × T)",
        placeholder: "Ex: 12",
        regra: {
          tipo: "numero" as const,
          esperado: (respostas: Record<string, string>) => {
            const g = analisarNumero(respostas[`${prefixo}-g`] ?? "");
            const u = analisarNumero(respostas[`${prefixo}-u`] ?? "");
            const t = analisarNumero(respostas[`${prefixo}-t`] ?? "");
            return g === null || u === null || t === null ? Number.NaN : g * u * t;
          },
        },
        mensagemErrada: "G × U × T não bate — reconfira a multiplicação.",
      },
    ],
  };
}

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação de Rotinas de Escritório e Suporte Operacional",
  introducao:
    "Cenários práticos de contas a pagar e receber, itinerário de viagem corporativa, controle de estoque, priorização com Matriz GUT, e-mail de pós-venda e relatório gerencial.",
  itens: [
    {
      id: "cat-row1",
      titulo: "Categorização — Boleto de Licença de Software (R$ 890,00, vence hoje)",
      campos: [
        {
          id: "cat-row1",
          rotulo: "Categoria (plano de contas)",
          regra: { tipo: "selecao", esperado: "ti", opcoes: CATEGORIAS_CONTAS },
          mensagemCerta: "Licença de software é despesa de Tecnologia e Licenças.",
          mensagemErrada: "Uma licença de software de gestão entra em Tecnologia e Licenças.",
        },
      ],
    },
    {
      id: "cat-row2",
      titulo: "Categorização — PIX recebido do Cliente Beta (R$ 4.500,00)",
      campos: [
        {
          id: "cat-row2",
          rotulo: "Categoria",
          regra: {
            tipo: "selecao",
            esperado: "receita",
            opcoes: [
              { valor: "receita", texto: "Receita de Serviços" },
              { valor: "reembolso", texto: "Reembolso de Despesas" },
              { valor: "outros", texto: "Outras Entradas" },
            ],
          },
          mensagemCerta: "Recebimento de cliente por serviço prestado é Receita de Serviços.",
          mensagemErrada: "Um PIX recebido de cliente referente a contrato é Receita de Serviços.",
        },
      ],
    },
    {
      id: "cat-row3",
      titulo: "Categorização — Conta de Energia Elétrica (R$ 1.340,50)",
      campos: [
        {
          id: "cat-row3",
          rotulo: "Categoria",
          regra: { tipo: "selecao", esperado: "utilidades", opcoes: CATEGORIAS_CONTAS },
          mensagemCerta: "Energia elétrica é Água / Luz / Internet.",
          mensagemErrada: "Conta de energia elétrica entra em Água / Luz / Internet.",
        },
      ],
    },
    {
      id: "cat-row4",
      titulo: "Categorização — Copos Descartáveis e Produtos de Limpeza (R$ 320,00)",
      campos: [
        {
          id: "cat-row4",
          rotulo: "Categoria",
          regra: { tipo: "selecao", esperado: "fornecedores", opcoes: CATEGORIAS_CONTAS },
          mensagemCerta: "Copos e produtos de limpeza são insumos comprados de terceiros.",
          mensagemErrada: "Copos descartáveis e produtos de limpeza são Insumos de Terceiros.",
        },
      ],
    },
    {
      id: "parecer-financeiro",
      titulo: "Parecer do Controle Financeiro",
      instrucao: "Resuma o total de entradas, total de saídas e o saldo financeiro líquido apurado no dia.",
      campos: [{ id: "parecer-financeiro", regra: { tipo: "texto", minPalavras: 12 } }],
    },
    {
      id: "itinerario-viagem",
      titulo: "Minuta do Itinerário de Viagem Corporativa",
      cenario: "O diretor de operações participará de um congresso corporativo em outra cidade na próxima semana.",
      campos: [
        { id: "itinerario-congresso-voo", rotulo: "Abertura do congresso — detalhes", placeholder: "...", regra: { tipo: "texto" } },
        { id: "itinerario-congresso-doc", rotulo: "Abertura do congresso — documentação", placeholder: "...", regra: { tipo: "texto" } },
        { id: "itinerario-retorno-voo", rotulo: "Check-out e voo de retorno — detalhes", placeholder: "...", regra: { tipo: "texto" } },
        { id: "itinerario-retorno-doc", rotulo: "Check-out e voo de retorno — documentação", placeholder: "...", regra: { tipo: "texto" } },
      ],
    },
    {
      id: "checklist-viajante",
      titulo: "Checklist de Apoio ao Viajante",
      instrucao: "Mencione detalhes preventivos organizados (seguro viagem, adiantamento de táxi/Uber, envio da pasta de apresentação por e-mail...).",
      campos: [{ id: "checklist-viajante", regra: { tipo: "texto", minPalavras: 8 } }],
    },
    {
      id: "estoque-row1",
      titulo: "Estoque — Papel A4 Sulfite (2 caixas, mínimo 5)",
      campos: [
        {
          id: "estoque-row1",
          rotulo: "Status do estoque",
          placeholder: "Ex: 5 caixas",
          regra: { tipo: "selecao", esperado: "critico", opcoes: ESTADOS_ESTOQUE },
          mensagemCerta: "2 caixas está abaixo do mínimo de 5 — nível crítico.",
          mensagemErrada: "2 caixas contra um mínimo de 5 é nível crítico, não normal.",
        },
      ],
    },
    {
      id: "estoque-row2",
      titulo: "Estoque — Toner HP Preto (4 unidades, mínimo 2)",
      campos: [
        {
          id: "estoque-row2",
          rotulo: "Status do estoque",
          regra: { tipo: "selecao", esperado: "ok", opcoes: ESTADOS_ESTOQUE },
          mensagemCerta: "4 unidades está acima do mínimo de 2 — estoque normal.",
          mensagemErrada: "4 unidades contra um mínimo de 2 é estoque normal, não crítico nem excesso.",
        },
      ],
    },
    {
      id: "estoque-row3",
      titulo: "Estoque — Caneta Esferográfica Azul (0 caixas, mínimo 2)",
      campos: [
        {
          id: "estoque-row3",
          rotulo: "Status do estoque",
          regra: { tipo: "selecao", esperado: "critico", opcoes: ESTADOS_ESTOQUE },
          mensagemCerta: "0 caixas é nível crítico — não há nenhuma em estoque.",
          mensagemErrada: "0 caixas contra um mínimo de 2 é claramente nível crítico.",
        },
      ],
    },
    {
      id: "estoque-row4",
      titulo: "Estoque — Pasta Suspensa (15 unidades, mínimo 30)",
      campos: [
        {
          id: "estoque-row4",
          rotulo: "Status do estoque",
          regra: { tipo: "selecao", esperado: "critico", opcoes: ESTADOS_ESTOQUE },
          mensagemCerta: "15 unidades está abaixo do mínimo de 30 — nível crítico.",
          mensagemErrada: "15 unidades contra um mínimo de 30 é nível crítico.",
        },
      ],
    },
    {
      id: "justificativa-compras",
      titulo: "Justificativa da Solicitação de Compras",
      instrucao: "Explique o impacto operacional caso os itens críticos não sejam repostos no prazo.",
      campos: [{ id: "justificativa-compras", regra: { tipo: "texto", minPalavras: 12 } }],
    },
    itemGut(
      "gut-r1",
      "Matriz GUT — Ar-condicionado da recepção pingando água no piso",
      "Priorize os quatro problemas relatados simultaneamente usando a Matriz GUT (notas de 1 a 5).",
    ),
    itemGut(
      "gut-r2",
      "Matriz GUT — Sistema de emissão de Notas Fiscais fora do ar em dia de fechamento",
      "",
    ),
    itemGut("gut-r3", "Matriz GUT — Falta de papel de rascunho na sala de reuniões do 2º andar", ""),
    itemGut(
      "gut-r4",
      "Matriz GUT — Vazamento de água no banheiro dos clientes podendo alagar o corredor",
      "",
    ),
    {
      id: "plano-acao-problema1",
      titulo: "Plano de Ação Imediato para o Problema de Maior Pontuação",
      instrucao: "Descreva quais contatos, chamados ou avisos você fará imediatamente.",
      campos: [{ id: "plano-acao-problema1", regra: { tipo: "texto", minPalavras: 10 } }],
    },
    {
      id: "email-posvenda",
      titulo: "Redação de E-mail Profissional de Esclarecimento",
      cenario:
        "Um cliente antigo enviou um e-mail solicitando esclarecimentos sobre a cobrança de uma taxa adicional de serviço, alegando que não foi informado previamente e cogitando cancelar o contrato.",
      instrucao:
        "Elabore uma resposta cordial e técnica, explicando que a taxa refere-se ao aditivo solicitado pela própria equipe dele, oferecendo flexibilidade de parcelamento ou atendimento personalizado.",
      campos: [
        {
          id: "email-posvenda",
          placeholder: "Assunto: Esclarecimento referente à fatura mensal — Contrato #4029...",
          regra: { tipo: "texto", minPalavras: 25 },
        },
      ],
    },
    {
      id: "relatorio-gerencial",
      titulo: "Redação do Relatório Gerencial",
      cenario:
        "Indicadores do mês: 420 chamadas telefônicas (95% resolvidas no 1º contato); 18 cotações de compras (economia média de 8%); 150 pacotes processados sem extravio; despesa de R$ 4.200,00 (teto de R$ 4.500,00).",
      instrucao: "Redija um relatório executivo com resumo, principais resultados e conclusão/recomendações.",
      campos: [
        {
          id: "relatorio-gerencial",
          placeholder: "RELATÓRIO MENSAL DE DESEMPENHO OPERACIONAL...",
          regra: { tipo: "texto", minPalavras: 25 },
        },
      ],
    },
  ],
};

export default atividade;
