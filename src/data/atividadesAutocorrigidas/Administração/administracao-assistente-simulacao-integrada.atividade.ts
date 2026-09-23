import { analisarNumero } from "@/lib/atividadeAutocorrigida";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const PADRAO_NOMENCLATURA = /\d{4}[-_].*\d{1,2}[-_].*\d{1,2}.*_.*_/;

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação Prática de Rotinas Administrativas",
  introducao:
    "Esta atividade simula situações cotidianas vivenciadas no suporte administrativo de empresas privadas e órgãos corporativos. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "estrutura-pastas",
      titulo: "Mapeamento de Estrutura de Pastas",
      cenario:
        "A empresa passou por um crescimento acelerado e os arquivos digitais na rede compartilhada estão desorganizados, com arquivos nomeados de forma inconsistente (ex: \"doc123.pdf\", \"relatorio_final_final_v2.xlsx\"). Você recebeu a missão de criar uma estrutura lógica de diretórios.",
      instrucao: "Desenhe a hierarquia de pastas para organizar o setor administrativo, prevendo divisões para Compras, RH, Financeiro e Contratos.",
      campos: [
        {
          id: "estrutura-pastas",
          placeholder: "1.0_ADMINISTRATIVO/ ├── 1.1_FINANCEIRO/ ...",
          regra: { tipo: "texto", minPalavras: 10 },
        },
      ],
    },
    {
      id: "nomenclatura",
      titulo: "Padronização de Nomenclatura de Arquivos",
      instrucao:
        "Renomeie os arquivos caóticos abaixo seguindo a lógica: [ANO-MÊS-DIA]_[CATEGORIA]_[NOME_DO_DOCUMENTO]_[VERSÃO/FORNECEDOR].",
      tabelaReferencia: {
        colunas: ["Nome original (caótico)", "Campo para o novo nome"],
        linhas: [["contrato_aluguel_novo_final.pdf", ""]],
      },
      campos: [
        {
          id: "nomenc-row1",
          rotulo: "contrato_aluguel_novo_final.pdf",
          placeholder: "Digite o novo nome padronizado...",
          regra: { tipo: "padrao", padrao: PADRAO_NOMENCLATURA },
          mensagemCerta: "Segue o padrão pedido: ano, categoria e nome separados.",
          mensagemErrada:
            "Use o padrão completo: [ANO-MÊS-DIA]_[CATEGORIA]_[NOME_DO_DOCUMENTO]_[VERSÃO/FORNECEDOR] — precisa ter o ano por extenso e pelo menos 3 partes separadas por \"_\".",
        },
        {
          id: "nomenc-row2",
          rotulo: "nf_5492_papelaria_hoje.pdf",
          placeholder: "Digite o novo nome padronizado...",
          regra: { tipo: "padrao", padrao: PADRAO_NOMENCLATURA },
          mensagemCerta: "Segue o padrão pedido: ano, categoria e nome separados.",
          mensagemErrada:
            "Use o padrão completo: [ANO-MÊS-DIA]_[CATEGORIA]_[NOME_DO_DOCUMENTO]_[VERSÃO/FORNECEDOR] — precisa ter o ano por extenso e pelo menos 3 partes separadas por \"_\".",
        },
        {
          id: "nomenc-row3",
          rotulo: "folha_pagamento_marco_corrigida.xlsx",
          placeholder: "Digite o novo nome padronizado...",
          regra: { tipo: "padrao", padrao: PADRAO_NOMENCLATURA },
          mensagemCerta: "Segue o padrão pedido: ano, categoria e nome separados.",
          mensagemErrada:
            "Use o padrão completo: [ANO-MÊS-DIA]_[CATEGORIA]_[NOME_DO_DOCUMENTO]_[VERSÃO/FORNECEDOR] — precisa ter o ano por extenso e pelo menos 3 partes separadas por \"_\".",
        },
        {
          id: "nomenc-row4",
          rotulo: "orcamento_limpeza_sp.docx",
          placeholder: "Digite o novo nome padronizado...",
          regra: { tipo: "padrao", padrao: PADRAO_NOMENCLATURA },
          mensagemCerta: "Segue o padrão pedido: ano, categoria e nome separados.",
          mensagemErrada:
            "Use o padrão completo: [ANO-MÊS-DIA]_[CATEGORIA]_[NOME_DO_DOCUMENTO]_[VERSÃO/FORNECEDOR] — precisa ter o ano por extenso e pelo menos 3 partes separadas por \"_\".",
        },
      ],
    },
    {
      id: "comunicado-interno",
      titulo: "Redação de Comunicado Interno (Circular / E-mail Geral)",
      cenario:
        "A diretoria decidiu implantar uma nova política de uso consciente dos recursos do escritório e uma nova regra para solicitação de reembolso de despesas (prazo de até 5 dias úteis).",
      instrucao: "Escreva um comunicado institucional em linguagem clara, profissional, objetiva e empática direcionado a todos os colaboradores.",
      campos: [
        {
          id: "comunicado-interno",
          placeholder: "Assunto: Comunicado Geral — Novas Diretrizes de Uso Sustentável e Reembolso...",
          regra: { tipo: "texto", minPalavras: 30 },
        },
      ],
    },
    {
      id: "resposta-cliente",
      titulo: "Atendimento e Resposta a Cliente (WhatsApp / E-mail Corporativo)",
      cenario:
        "Um cliente importante enviou uma mensagem ríspida reclamando que tentou contato telefônico duas vezes para pedir a segunda via de uma Nota Fiscal e não foi atendido. Ele precisa do documento em menos de 1 hora.",
      campos: [
        {
          id: "resposta-cliente",
          placeholder: "Escreva a resposta imediata contornando a insatisfação, mantendo a postura profissional...",
          regra: { tipo: "texto", minPalavras: 20 },
        },
      ],
    },
    {
      id: "rdv-row1",
      titulo: "Reembolso de Viagem — Uber Deslocamento (R$ 85,00)",
      instrucao: "10/08 · Centro de custo: Comercial / Viagens. Esse item está conforme?",
      campos: [
        {
          id: "rdv-row1",
          regra: {
            tipo: "selecao",
            esperado: "sim",
            opcoes: [
              { valor: "sim", texto: "Sim (Conforme)" },
              { valor: "nao", texto: "Não (Inconforme)" },
            ],
          },
          mensagemCerta: "Deslocamento de trabalho com valor razoável é despesa conforme.",
          mensagemErrada: "Um Uber de deslocamento a trabalho é uma despesa normalmente conforme.",
        },
      ],
    },
    {
      id: "rdv-row2",
      titulo: "Reembolso de Viagem — Almoço de Negócios (R$ 210,00)",
      instrucao: "10/08 · Nota sem descritivo de itens. Esse item está conforme?",
      campos: [
        {
          id: "rdv-row2",
          regra: {
            tipo: "selecao",
            esperado: ["sim", "nao"],
            opcoes: [
              { valor: "sim", texto: "Sim (Conforme)" },
              { valor: "nao", texto: "Não (Inconforme)" },
            ],
          },
        },
      ],
    },
    {
      id: "rdv-row3",
      titulo: "Reembolso de Viagem — Diária do Hotel (R$ 580,00)",
      instrucao: "11/08 · Com Nota Fiscal nominal à empresa. Esse item está conforme?",
      campos: [
        {
          id: "rdv-row3",
          regra: {
            tipo: "selecao",
            esperado: "sim",
            opcoes: [
              { valor: "sim", texto: "Sim (Conforme)" },
              { valor: "nao", texto: "Não (Inconforme)" },
            ],
          },
          mensagemCerta: "Hotel com Nota Fiscal nominal à empresa está documentado corretamente.",
          mensagemErrada: "A diária do hotel tem Nota Fiscal nominal à empresa — está documentada corretamente, é conforme.",
        },
      ],
    },
    {
      id: "rdv-row4",
      titulo: "Reembolso de Viagem — Item pessoal de higiene (R$ 45,00)",
      instrucao: "11/08 · Centro de custo: Não Reembolsável. Esse item está conforme?",
      campos: [
        {
          id: "rdv-row4",
          regra: {
            tipo: "selecao",
            esperado: "nao",
            opcoes: [
              { valor: "sim", texto: "Sim (Conforme)" },
              { valor: "nao", texto: "Não (Inconforme)" },
            ],
          },
          mensagemCerta: "A própria tabela já classifica esse item como \"Não Reembolsável\".",
          mensagemErrada: "Repare no Centro de Custo dessa linha: \"Não Reembolsável\" — é despesa pessoal, não deveria ser aprovada.",
        },
      ],
    },
    {
      id: "rdv-row5",
      titulo: "Reembolso de Viagem — Táxi de retorno (R$ 90,00)",
      instrucao: "12/08 · Centro de custo: Comercial / Viagens. Esse item está conforme?",
      campos: [
        {
          id: "rdv-row5",
          regra: {
            tipo: "selecao",
            esperado: "sim",
            opcoes: [
              { valor: "sim", texto: "Sim (Conforme)" },
              { valor: "nao", texto: "Não (Inconforme)" },
            ],
          },
          mensagemCerta: "Táxi de retorno ao aeroporto é despesa de viagem normal.",
          mensagemErrada: "O táxi de retorno ao aeroporto é uma despesa de viagem normal, conforme.",
        },
      ],
    },
    {
      id: "rdv-fechamento",
      titulo: "Fechamento do Adiantamento de Viagem (R$ 1.200,00)",
      instrucao: "Some as despesas que você considerou conformes e calcule o resultado.",
      campos: [
        {
          id: "rdv-total-validas",
          rotulo: "Total de despesas válidas",
          placeholder: "R$ 0,00",
          // Sem alvo fixo — o original só exige que seja um número (o cálculo depende de quais despesas o aluno julgou válidas).
          regra: { tipo: "numero", esperado: () => 0, tolerancia: Number.POSITIVE_INFINITY },
        },
        {
          id: "adiantamento-recebido",
          rotulo: "Adiantamento recebido",
          somenteLeitura: true,
          valorPadrao: "R$ 1.200,00",
        },
        {
          id: "rdv-resultado",
          rotulo: "Resultado (a devolver / a reembolsar)",
          placeholder: "R$ 0,00",
          regra: {
            tipo: "numero",
            esperado: (respostas) => {
              const total = analisarNumero(respostas["rdv-total-validas"] ?? "");
              return total === null ? Number.NaN : Math.abs(total - 1200);
            },
            tolerancia: 5,
          },
          mensagemCerta: "Bate com o adiantamento de R$ 1.200,00 menos o total de despesas válidas.",
          mensagemErrada: "O resultado deveria ser a diferença entre o adiantamento (R$ 1.200,00) e o total de despesas válidas que você calculou.",
        },
      ],
    },
    {
      id: "cotacao-fornecedores",
      titulo: "Análise Comparativa e Decisão de Compra",
      cenario: "O estoque de materiais de escritório está no nível crítico. Você coletou orçamentos de 3 fornecedores para papel A4, toners e canetas.",
      instrucao: "Qual fornecedor apresenta o melhor custo-benefício considerando o valor total com frete, urgência de estoque e fluxo de caixa da empresa? Justifique em detalhes.",
      tabelaReferencia: {
        colunas: ["Critério", "Fornecedor Alpha", "Fornecedor Beta", "Fornecedor Gama"],
        linhas: [
          ["Valor total dos itens", "R$ 1.450,00", "R$ 1.320,00", "R$ 1.380,00"],
          ["Frete / entrega", "Grátis", "R$ 120,00", "R$ 40,00"],
          ["Prazo de entrega", "2 dias úteis", "7 dias úteis", "3 dias úteis"],
          ["Condição de pagamento", "Faturado 30 dias", "À vista (PIX)", "Faturado 15/30 dias"],
        ],
      },
      campos: [
        {
          id: "cotacao-fornecedores",
          placeholder: "Apresente sua decisão detalhada analisando cada um dos critérios...",
          regra: { tipo: "texto", minPalavras: 25 },
        },
      ],
    },
    {
      id: "evento-infraestrutura",
      titulo: "Checklist de Preparação de Evento — Infraestrutura e Tecnologia",
      cenario: "Sua empresa receberá 12 diretores regionais para uma reunião de alinhamento estratégico durante um dia inteiro.",
      campos: [
        {
          id: "evento-infraestrutura",
          placeholder: "Liste equipamentos, testes de multimídia, conectividade...",
          regra: { tipo: "texto", minPalavras: 6 },
        },
      ],
    },
    {
      id: "evento-alimentacao",
      titulo: "Checklist de Preparação de Evento — Alimentação (Coffee Break / Almoço)",
      campos: [
        {
          id: "evento-alimentacao",
          placeholder: "Defina horários, restrições alimentares, logística dos serviços...",
          regra: { tipo: "texto", minPalavras: 6 },
        },
      ],
    },
    {
      id: "cronograma-recepcao",
      titulo: "Cronograma do Evento — Recepção (08:00–08:30)",
      instrucao: "Recepção dos participantes e Welcome Coffee — quem é o responsável e o que ele faz?",
      campos: [{ id: "cronograma-recepcao", placeholder: "...", regra: { tipo: "texto" } }],
    },
    {
      id: "cronograma-abertura",
      titulo: "Cronograma do Evento — Abertura (08:30–12:00)",
      instrucao: "Abertura e apresentação de resultados — quem é o responsável e o que ele faz?",
      campos: [{ id: "cronograma-abertura", placeholder: "...", regra: { tipo: "texto" } }],
    },
    {
      id: "cronograma-almoco",
      titulo: "Cronograma do Evento — Almoço (12:00–13:30)",
      instrucao: "Intervalo para almoço corporativo — quem é o responsável e o que ele faz?",
      campos: [{ id: "cronograma-almoco", placeholder: "...", regra: { tipo: "texto" } }],
    },
    {
      id: "cronograma-encerramento",
      titulo: "Cronograma do Evento — Encerramento (13:30–17:00)",
      instrucao: "Sessão de planejamento e encerramento — quem é o responsável e o que ele faz?",
      campos: [{ id: "cronograma-encerramento", placeholder: "...", regra: { tipo: "texto" } }],
    },
    {
      id: "pop-objetivo",
      titulo: "POP — Recebimento e Triagem de Encomendas e Correspondências",
      instrucao: "Defina o objetivo principal deste processo.",
      campos: [
        {
          id: "pop-nome",
          rotulo: "Nome do processo",
          somenteLeitura: true,
          valorPadrao: "Recebimento e Triagem de Encomendas e Correspondências",
        },
        {
          id: "pop-objetivo",
          rotulo: "Objetivo do procedimento",
          placeholder: "Defina o objetivo principal deste processo...",
          regra: { tipo: "texto" },
        },
      ],
    },
    {
      id: "pop-passo-a-passo",
      titulo: "POP — Passo a Passo Detalhado da Operação",
      instrucao: "Do recebimento à entrega final.",
      campos: [
        {
          id: "pop-passo-a-passo",
          placeholder: "Passo 1: Conferir a identificação do entregador e destinatário...",
          regra: { tipo: "texto", minPalavras: 20 },
        },
      ],
    },
  ],
};

export default atividade;
