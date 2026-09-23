import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

function diasAte(dataBr: string): number {
  const [dia, mes, ano] = dataBr.split("/").map(Number);
  const vencimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return Math.round((vencimento.getTime() - hoje.getTime()) / 86_400_000);
}

const ESTADOS_CONFORMIDADE = { opcoes: [
  { valor: "ok", texto: "Jornada Conforme" },
  { valor: "he", texto: "Hora Extra" },
  { valor: "atraso", texto: "Atraso / Falta de Horas" },
  { valor: "incompleto", texto: "Marcação Incompleta" },
] };

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação de Operações Administrativas e Suporte de Gestão",
  introducao:
    "Este caderno simula cenários práticos de rotinas internas: ata de reunião, controle de ponto e escala, patrimônio, análise de minutas contratuais, KPIs e plano de ação 5W2H.",
  itens: [
    {
      id: "ata-texto",
      titulo: "Redação do Texto da Ata",
      cenario:
        "Anotações brutas da reunião: \"Início 09:05. Estavam lá: Carlos (Diretor), Juliana (Gerente de TI), Roberto (RH) e você. Discutiram sobre a mudança do sistema ERP. A Juliana falou que a implantação vai atrasar 2 semanas porque o servidor novo não chegou. O Carlos ficou irritado e pediu para cotar outro fornecedor de servidores urgente até sexta-feira (Roberto vai ver isso). Depois o Roberto comentou que 3 funcionários do administrativo precisam de treinamento de Excel avançado até o fim do mês. No fim, aprovaram o orçamento da reforma do refeitório de R$ 15.000,00. Encerrou 10:10.\"",
      instrucao: "Transforme essas anotações desestruturadas em uma Ata Oficial de Reunião com síntese das decisões.",
      campos: [
        {
          id: "ata-texto",
          placeholder: "ATA DE REUNIÃO ORDINÁRIA DO COMITÊ OPERACIONAL...",
          regra: { tipo: "texto", minPalavras: 30 },
        },
      ],
    },
    {
      id: "ata-encaminhamentos",
      titulo: "Matriz de Responsabilidade e Encaminhamentos (Quem / O quê / Prazo)",
      campos: [
        { id: "ata-acao-1", rotulo: "Ação/tarefa 1", placeholder: "Ação 1...", regra: { tipo: "texto" } },
        { id: "ata-responsavel-1", rotulo: "Responsável 1", placeholder: "Nome / Setor...", regra: { tipo: "texto" } },
        { id: "ata-prazo-1", rotulo: "Prazo 1", placeholder: "DD/MM/AAAA...", regra: { tipo: "texto" } },
        { id: "ata-acao-2", rotulo: "Ação/tarefa 2", placeholder: "Ação 2...", regra: { tipo: "texto" } },
        { id: "ata-responsavel-2", rotulo: "Responsável 2", placeholder: "Nome / Setor...", regra: { tipo: "texto" } },
        { id: "ata-prazo-2", rotulo: "Prazo 2", placeholder: "DD/MM/AAAA...", regra: { tipo: "texto" } },
        { id: "ata-acao-3", rotulo: "Ação/tarefa 3", placeholder: "Ação 3...", regra: { tipo: "texto" } },
        { id: "ata-responsavel-3", rotulo: "Responsável 3", placeholder: "Nome / Setor...", regra: { tipo: "texto" } },
        { id: "ata-prazo-3", rotulo: "Prazo 3", placeholder: "DD/MM/AAAA...", regra: { tipo: "texto" } },
      ],
    },
    {
      id: "ponto-seg",
      titulo: "Auditoria de Ponto — Segunda-feira",
      cenario: "Jornada contratual: 8h/dia (08:00–17:00, almoço 12:00–13:00). Entrada 08:00, saída almoço 12:00, retorno 13:00, saída 17:00.",
      campos: [
        {
          id: "ponto-seg",
          rotulo: "Classificação",
          regra: { tipo: "selecao", esperado: "ok", ...ESTADOS_CONFORMIDADE },
          mensagemCerta: "8h00–12h00 e 13h00–17h00 é jornada completa e conforme o contrato.",
          mensagemErrada: "Confira os horários — 08:00 às 17:00 com 1h de almoço bate exatamente com o contrato de 8h.",
        },
      ],
    },
    {
      id: "ponto-ter",
      titulo: "Auditoria de Ponto — Terça-feira",
      cenario: "Entrada 08:00, saída almoço 12:00, retorno 12:30 (intervalo reduzido em 30min), saída 17:00.",
      campos: [
        {
          id: "ponto-ter",
          rotulo: "Classificação",
          regra: { tipo: "selecao", esperado: ["ok", "incompleto"], ...ESTADOS_CONFORMIDADE },
        },
      ],
    },
    {
      id: "ponto-qua",
      titulo: "Auditoria de Ponto — Quarta-feira",
      cenario: "Entrada 08:35 (atrasada), saída almoço 12:00, retorno 13:00, saída 17:00.",
      campos: [
        {
          id: "ponto-qua",
          rotulo: "Classificação",
          regra: { tipo: "selecao", esperado: "atraso", ...ESTADOS_CONFORMIDADE },
          mensagemCerta: "Entrada às 08:35 é um atraso de 35 minutos.",
          mensagemErrada: "A entrada foi às 08:35 — 35 minutos depois do horário contratual (08:00). Isso é atraso.",
        },
      ],
    },
    {
      id: "ponto-qui",
      titulo: "Auditoria de Ponto — Quinta-feira",
      cenario: "Entrada 08:00, saída almoço 12:00, retorno almoço não registrado (---), saída 17:00.",
      campos: [
        {
          id: "ponto-qui",
          rotulo: "Classificação",
          regra: { tipo: "selecao", esperado: "incompleto", ...ESTADOS_CONFORMIDADE },
          mensagemCerta: "Falta a marcação de \"Retorno Almoço\" — o registro está incompleto.",
          mensagemErrada: "Repare que falta o horário de \"Retorno Almoço\" — isso é marcação incompleta, não dá pra calcular a jornada.",
        },
      ],
    },
    {
      id: "ponto-sex",
      titulo: "Auditoria de Ponto — Sexta-feira",
      cenario: "Entrada 08:00, saída almoço 12:00, retorno 13:00, saída 19:00 (2h além do previsto).",
      campos: [
        {
          id: "ponto-sex",
          rotulo: "Classificação",
          regra: { tipo: "selecao", esperado: "he", ...ESTADOS_CONFORMIDADE },
          mensagemCerta: "Saída às 19:00 em vez de 17:00 é 2 horas extras.",
          mensagemErrada: "A saída foi às 19:00, 2 horas depois do horário contratual (17:00) — isso é hora extra.",
        },
      ],
    },
    {
      id: "ponto-orientacao",
      titulo: "Orientação Administrativa para o Colaborador",
      instrucao: "Descreva quais providências o assistente deve tomar em relação às marcações irregulares.",
      campos: [{ id: "ponto-orientacao", regra: { tipo: "texto", minPalavras: 12 } }],
    },
    {
      id: "patrimonio",
      titulo: "Cadastramento na Planilha de Controle Patrimonial",
      cenario: "A empresa adquiriu novos equipamentos para o setor administrativo e transferiu alguns itens antigos entre filiais.",
      tabelaReferencia: {
        colunas: ["Código", "Descrição do item"],
        linhas: [
          ["PAT-2026-001", "Notebook Dell Vostro 15 (S/N: 884729)"],
          ["PAT-2026-002", "Cadeira Ergonômica Presidente Mesh Preta"],
          ["PAT-2026-003", "Projetor Epson PowerLite (Lâmpada fraca)"],
        ],
      },
      campos: [
        { id: "patrimonio-local-1", rotulo: "PAT-2026-001 — Localização/setor", placeholder: "Ex: Financeiro", regra: { tipo: "texto" } },
        { id: "patrimonio-responsavel-1", rotulo: "PAT-2026-001 — Responsável", placeholder: "Nome...", regra: { tipo: "texto" } },
        { id: "patrimonio-local-2", rotulo: "PAT-2026-002 — Localização/setor", placeholder: "...", regra: { tipo: "texto" } },
        { id: "patrimonio-responsavel-2", rotulo: "PAT-2026-002 — Responsável", placeholder: "Nome...", regra: { tipo: "texto" } },
        { id: "patrimonio-local-3", rotulo: "PAT-2026-003 — Localização/setor", placeholder: "...", regra: { tipo: "texto" } },
        { id: "patrimonio-responsavel-3", rotulo: "PAT-2026-003 — Responsável", placeholder: "Nome...", regra: { tipo: "texto" } },
      ],
    },
    {
      id: "termo-responsabilidade",
      titulo: "Redação de Termo de Responsabilidade e Guarda",
      instrucao:
        "Redija a cláusula principal de um Termo de Entrega de Equipamento, destacando deveres de conservação e regras em caso de dano culposo ou perda.",
      campos: [
        {
          id: "termo-responsabilidade",
          placeholder: "Declaramos para os devidos fins que o colaborador abaixo assinado recebe nesta data...",
          regra: { tipo: "texto", minPalavras: 15 },
        },
      ],
    },
    {
      id: "riscos-contratuais",
      titulo: "Análise de Cláusulas Contratuais Críticas",
      cenario:
        "\"Cláusula 8ª: O presente contrato terá vigência de 12 meses, renovando-se automaticamente por igual período caso não haja manifestação expressa em contrário com antecedência de 90 dias. Em caso de rescisão antecipada por iniciativa do CONTRATANTE, este pagará multa equivalente a 100% dos meses restantes do contrato.\"",
      instrucao: "Identifique dois pontos de risco para a sua empresa nesse trecho.",
      campos: [
        {
          id: "riscos-contratuais",
          placeholder: "Aponte os riscos identificados na renovação automática e no percentual da multa de rescisão...",
          regra: { tipo: "texto", minPalavras: 12 },
        },
      ],
    },
    {
      id: "venc-row1",
      titulo: "Controle de Vencimentos — Alvará de Funcionamento",
      instrucao: "Vencimento em 15/09/2026. Quantos dias faltam a partir de hoje?",
      campos: [
        {
          id: "venc-row1",
          placeholder: "Ex: 28 dias",
          regra: { tipo: "numero", esperado: () => diasAte("15/09/2026"), tolerancia: 2 },
        },
      ],
    },
    {
      id: "venc-row2",
      titulo: "Controle de Vencimentos — AVCB (Corpo de Bombeiros)",
      instrucao: "Vencimento em 30/08/2026. Quantos dias faltam a partir de hoje?",
      campos: [
        {
          id: "venc-row2",
          placeholder: "...",
          regra: { tipo: "numero", esperado: () => diasAte("30/08/2026"), tolerancia: 2 },
        },
      ],
    },
    {
      id: "venc-row3",
      titulo: "Controle de Vencimentos — Certidão Negativa de Débitos (CND)",
      instrucao: "Vencimento em 10/12/2026. Quantos dias faltam a partir de hoje?",
      campos: [
        {
          id: "venc-row3",
          placeholder: "...",
          regra: { tipo: "numero", esperado: () => diasAte("10/12/2026"), tolerancia: 2 },
        },
      ],
    },
    {
      id: "kpi-plano-acao",
      titulo: "Matriz do Plano de Ação 5W2H — Redução de Custos com Impressão",
      cenario: "Aumento de 35% nos custos com impressão e cópias. Setor com maior volume: Comercial/Vendas (48%). Meta: reduzir 20% em 60 dias.",
      instrucao: "Complete quem e quando para as ações 2 e 3 do plano.",
      campos: [
        { id: "kpi-quem-2", rotulo: "Ação 2 — Quem", placeholder: "Ex: Equipe de Comunicação", regra: { tipo: "texto" } },
        { id: "kpi-quando-2", rotulo: "Ação 2 — Quando", placeholder: "Ex: Até 15 dias", regra: { tipo: "texto" } },
        { id: "kpi-quem-3", rotulo: "Ação 3 — Quem", placeholder: "...", regra: { tipo: "texto" } },
        { id: "kpi-quando-3", rotulo: "Ação 3 — Quando", placeholder: "...", regra: { tipo: "texto" } },
        { id: "kpi-custo-3", rotulo: "Ação 3 — Custo estimado", placeholder: "R$ ...", regra: { tipo: "texto" } },
      ],
    },
    {
      id: "triagem-ligacoes",
      titulo: "Script de Atendimento e Triagem de Ligações",
      cenario: "Três chamadas simultâneas: fiscal da Receita Estadual, vendedor de telefonia insistente, fornecedor pedindo troca de chave PIX.",
      campos: [
        {
          id: "triagem-fiscal",
          rotulo: "Chamada 1 (Fiscal) — fraseologia",
          placeholder: "Fraseologia de atendimento profissional e cortês...",
          regra: { tipo: "texto", minPalavras: 6 },
        },
        {
          id: "triagem-vendedor",
          rotulo: "Chamada 2 (Vendedor) — como declinar",
          placeholder: "Como declinar com firmeza e educação...",
          regra: { tipo: "texto", minPalavras: 6 },
        },
        {
          id: "triagem-fornecedor",
          rotulo: "Chamada 3 (Fornecedor) — protocolo de segurança",
          placeholder: "Protocolo de segurança contra fraudes...",
          regra: { tipo: "texto", minPalavras: 6 },
        },
      ],
    },
    {
      id: "protocolo-antifraude",
      titulo: "Protocolo Anti-Fraude e Confidencialidade (LGPD)",
      instrucao:
        "No caso da troca de chave PIX de fornecedor em cima da hora, explique qual procedimento de verificação o assistente deve seguir antes de alterar qualquer dado no sistema financeiro.",
      campos: [
        {
          id: "protocolo-antifraude",
          placeholder: "Descreva os passos de confirmação de segurança...",
          regra: { tipo: "texto", minPalavras: 12 },
        },
      ],
    },
  ],
};

export default atividade;
