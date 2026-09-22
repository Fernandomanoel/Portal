import { analisarNumero } from "@/lib/atividadeAutocorrigida";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const ESTADOS_SLA = [
  { valor: "conforme", texto: "Conforme (Manter)" },
  { valor: "alerta", texto: "Em Alerta (Notificar)" },
  { valor: "critico", texto: "Inconforme (Notificar / Multa)" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Simulação de Eficiência Operacional e Gestão de Rotinas",
  introducao:
    "Cenários de avaliação de fornecedores (SLA), onboarding de colaboradores, quadro Kanban, auditoria de caixa pequeno, ergonomia/segurança e etiqueta digital.",
  itens: [
    {
      id: "sla-empresa-a",
      titulo: "SLA — Empresa A (Suporte de TI/Redes)",
      cenario: "Contratado: atendimento inicial em até 30min em chamados críticos. Apurado: tempo médio real de 1h45min, com 3 atrasos graves.",
      campos: [
        {
          id: "sla-empresa-a",
          rotulo: "Parecer operacional",
          regra: { tipo: "selecao", esperado: "critico", opcoes: ESTADOS_SLA },
          mensagemCerta: "3 atrasos graves muito acima do SLA contratado é caso de notificação/multa.",
          mensagemErrada: "Releia o resultado apurado: 1h45min contra um SLA de 30min, com 3 atrasos graves, é inconformidade.",
        },
      ],
    },
    {
      id: "sla-empresa-b",
      titulo: "SLA — Empresa B (Manutenção de Ar-Condicionado)",
      cenario: "Contratado: visita preventiva mensal + emergencial em 24h. Apurado: 100% das visitas realizadas conforme agenda.",
      campos: [
        {
          id: "sla-empresa-b",
          rotulo: "Parecer operacional",
          regra: { tipo: "selecao", esperado: "conforme", opcoes: ESTADOS_SLA },
          mensagemCerta: "100% das visitas realizadas conforme o combinado.",
          mensagemErrada: "O resultado apurado (100% das visitas em dia) não indica problema — reveja.",
        },
      ],
    },
    {
      id: "sla-empresa-c",
      titulo: "SLA — Empresa C (Coleta e Destinação de Resíduos)",
      cenario: "Contratado: coleta quinzenal com certificado ambiental em 48h. Apurado: coleta feita, mas certificado atrasou 15 dias.",
      campos: [
        {
          id: "sla-empresa-c",
          rotulo: "Parecer operacional",
          regra: { tipo: "selecao", esperado: ["conforme", "alerta", "critico"], opcoes: ESTADOS_SLA },
        },
      ],
    },
    {
      id: "notificacao-fornecedor",
      titulo: "Minuta de Notificação Formal de Descumprimento",
      instrucao: "Elabore o e-mail de notificação para a Empresa A solicitando justificativa e plano de ação imediato sob pena de rescisão contratual.",
      campos: [{ id: "notificacao-fornecedor", regra: { tipo: "texto", minPalavras: 20 } }],
    },
    {
      id: "onboarding-preparo",
      titulo: "Matriz de Preparação Prévia do Posto de Trabalho",
      cenario: "Um novo profissional iniciará na próxima segunda-feira.",
      campos: [
        {
          id: "onboarding-ti",
          rotulo: "Recursos de Tecnologia e TI (hardware/acessos)",
          placeholder: "Criação de e-mail corporativo, notebook configurado, crachá, acessos...",
          regra: { tipo: "texto", minPalavras: 4 },
        },
        {
          id: "onboarding-infra",
          rotulo: "Infraestrutura e materiais de apoio",
          placeholder: "Mesa organizada, bloco de anotações, canetas, kit de boas-vindas...",
          regra: { tipo: "texto", minPalavras: 4 },
        },
      ],
    },
    {
      id: "onboarding-roteiro",
      titulo: "Roteiro do Primeiro Dia (Agenda de Boas-Vindas)",
      campos: [
        { id: "onboarding-resp-1", rotulo: "09:00–09:30 (recepção e crachá) — responsável", placeholder: "Ex: Equipe Operacional", regra: { tipo: "texto" } },
        { id: "onboarding-resp-2", rotulo: "09:30–11:00 (senhas e sistemas) — responsável", placeholder: "...", regra: { tipo: "texto" } },
        { id: "onboarding-resp-3", rotulo: "11:00–12:00 (apresentação à equipe) — responsável", placeholder: "...", regra: { tipo: "texto" } },
      ],
    },
    {
      id: "kanban-quadro",
      titulo: "Classificação das Demandas no Quadro Kanban",
      cenario:
        "1. Envio de notas fiscais para contabilidade externa (esperando motoboy). 2. Cotação de passagens aéreas. 3. Digitalização de contratos de julho (finalizado ontem). 4. Troca de toner no financeiro. 5. Organização do arquivo de prontuários. 6. Confirmação de pagamento com o banco (aguardando e-mail).",
      instrucao: "Classifique as seis demandas em A Fazer, Em Andamento, Aguardando Terceiros e Concluído.",
      campos: [
        { id: "kanban-a-fazer", rotulo: "A Fazer (pendente)", placeholder: "Liste os itens...", regra: { tipo: "texto" } },
        { id: "kanban-em-andamento", rotulo: "Em Andamento (em execução)", placeholder: "Liste os itens...", regra: { tipo: "texto" } },
        { id: "kanban-aguardando", rotulo: "Aguardando Terceiros", placeholder: "Liste os itens...", regra: { tipo: "texto" } },
        { id: "kanban-concluido", rotulo: "Concluído", placeholder: "Liste os itens...", regra: { tipo: "texto" } },
      ],
    },
    {
      id: "kanban-gargalos",
      titulo: "Análise de Gargalos e Solução Operacional",
      instrucao: "Qual tarefa em \"Aguardando Terceiros\" apresenta maior risco de atraso, e como você acompanhará o retorno?",
      campos: [{ id: "kanban-gargalos", regra: { tipo: "texto", minPalavras: 12 } }],
    },
    {
      id: "caixa-fechamento",
      titulo: "Fechamento do Caixa Pequeno (Fundo Fixo de R$ 600,00)",
      cenario:
        "Comprovantes do período: chaves extras (R$ 45,00, cupom fiscal OK), sedex urgente (R$ 38,50, comprovante OK), café/adoçante (R$ 27,90, cupom fiscal OK), estacionamento (R$ 25,00, recibo simples sem CNPJ impresso).",
      instrucao: "Some os comprovantes que você considera válidos, informe o dinheiro físico restante e o valor de recomposição.",
      campos: [
        {
          id: "caixa-soma-validos",
          rotulo: "Soma dos comprovantes válidos",
          placeholder: "R$ 0,00",
          regra: {
            tipo: "numero",
            esperado: (respostas) => {
              const restante = analisarNumero(respostas["caixa-dinheiro-restante"] ?? "");
              return restante === null ? Number.NaN : 600 - restante;
            },
            tolerancia: 5,
          },
          mensagemCerta: "Soma + dinheiro restante fecha com o fundo fixo de R$ 600,00.",
          mensagemErrada: "Soma dos comprovantes + dinheiro restante deveria fechar em R$ 600,00 (fundo fixo).",
        },
        {
          id: "caixa-dinheiro-restante",
          rotulo: "Dinheiro físico restante na caixa",
          placeholder: "R$ 0,00",
          regra: {
            tipo: "numero",
            esperado: (respostas) => {
              const soma = analisarNumero(respostas["caixa-soma-validos"] ?? "");
              return soma === null ? Number.NaN : 600 - soma;
            },
            tolerancia: 5,
          },
          mensagemCerta: "Confere com o fundo fixo.",
          mensagemErrada: "Não fecha com o fundo fixo de R$ 600,00 — reconfira a soma.",
        },
        {
          id: "caixa-recomposicao",
          rotulo: "Valor solicitado para recomposição",
          placeholder: "R$ 0,00",
          regra: {
            tipo: "numero",
            esperado: (respostas) => {
              const soma = analisarNumero(respostas["caixa-soma-validos"] ?? "");
              return soma === null ? Number.NaN : soma;
            },
            tolerancia: 5,
          },
          mensagemCerta: "Valor de recomposição bate com o total gasto.",
          mensagemErrada: "O valor a recompor deveria ser igual à soma dos comprovantes válidos.",
        },
      ],
    },
    {
      id: "caixa-observacao",
      titulo: "Observação do Auditor de Caixa",
      instrucao: "Informe a tratativa sobre o recibo sem CNPJ ou eventuais divergências encontradas.",
      campos: [{ id: "caixa-observacao", regra: { tipo: "texto", minPalavras: 10 } }],
    },
    {
      id: "ergonomia-fios",
      titulo: "Ação Corretiva — Fios soltos no chão em local de passagem",
      cenario: "Risco: tropeços, quedas e desligamento de equipamentos.",
      campos: [{ id: "ergonomia-fios", placeholder: "Ex: Organizar com calhas/organizadores de cabos", regra: { tipo: "texto" } }],
    },
    {
      id: "ergonomia-extintor",
      titulo: "Ação Corretiva — Caixas obstruindo extintor de incêndio",
      cenario: "Risco: bloqueio de acesso ao equipamento em emergências.",
      campos: [{ id: "ergonomia-extintor", regra: { tipo: "texto" } }],
    },
    {
      id: "ergonomia-monitores",
      titulo: "Ação Corretiva — Monitores abaixo da linha dos olhos",
      cenario: "Risco: fadiga muscular, dores na coluna e no pescoço.",
      campos: [{ id: "ergonomia-monitores", regra: { tipo: "texto" } }],
    },
    {
      id: "etiqueta-horarios",
      titulo: "Etiqueta Digital — Horários e Mensagens Urgentes",
      instrucao: "Defina limites sobre envios fora do expediente e canais adequados para emergências.",
      campos: [{ id: "etiqueta-horarios", regra: { tipo: "texto", minPalavras: 8 } }],
    },
    {
      id: "etiqueta-emails",
      titulo: "Etiqueta Digital — Clareza e Objetividade nos E-mails",
      instrucao: "Regras para campo \"Assunto\", uso de caixa alta e confirmação de leitura.",
      campos: [{ id: "etiqueta-emails", regra: { tipo: "texto", minPalavras: 8 } }],
    },
    {
      id: "etiqueta-confidencialidade",
      titulo: "Etiqueta Digital — Confidencialidade e Dados Sensíveis",
      instrucao: "Normas para não compartilhamento de senhas e proteção de informações internas.",
      campos: [{ id: "etiqueta-confidencialidade", regra: { tipo: "texto", minPalavras: 8 } }],
    },
  ],
};

export default atividade;
