import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/seguranca-emails-suspeitos.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Identificando E-mails Suspeitos",
  introducao: "Atividade Complementar — Segurança na Era Digital",
  itens: [
    {
      id: "objetivo",
      titulo: "Objetivo",
      blocos: [
        {
          tipo: "nota",
          variante: "dica",
          texto: "Leia com atenção os três e-mails abaixo e observe os sinais que indicam se cada um é seguro ou uma tentativa de golpe (phishing) — antes de clicar em qualquer link.",
        },
      ],
    },
    {
      id: "e-mail-1-atualizacao-bancaria",
      titulo: "E-mail 1 — Atualização Bancária",
      blocos: [
        {
          tipo: "texto",
          texto: "PHISHING",
        },
        {
          tipo: "texto",
          texto: "Remetente: atendimento@banco-seguro24.com Assunto: URGENTE: Atualização obrigatória de segurança",
        },
        {
          tipo: "texto",
          texto: "Mensagem:",
        },
        {
          tipo: "texto",
          texto: "Prezado cliente,",
        },
        {
          tipo: "texto",
          texto: "Identificamos uma atividade suspeita em sua conta. Para evitar o bloqueio imediato, é necessário atualizar seus dados agora.",
        },
        {
          tipo: "texto",
          texto: "Clique no link abaixo e confirme suas informações: www.banco-seguro24.atualizacao-conta.com",
        },
        {
          tipo: "texto",
          texto: "Caso não realize a atualização em até 2 horas, sua conta será suspensa.",
        },
        {
          tipo: "texto",
          texto: "Atenciosamente, Central de Segurança Bancária",
        },
      ],
    },
    {
      id: "e-mail-2-promocao-de-loja-online",
      titulo: "E-mail 2 — Promoção de Loja Online",
      blocos: [
        {
          tipo: "texto",
          texto: "PHISHING",
        },
        {
          tipo: "texto",
          texto: "Remetente: promoções@ofertas-imperdiveis.net Assunto: Parabéns! Você ganhou um smartphone grátis",
        },
        {
          tipo: "texto",
          texto: "Mensagem:",
        },
        {
          tipo: "texto",
          texto: "Parabéns!!!",
        },
        {
          tipo: "texto",
          texto: "Você foi selecionado(a) para receber um SMARTPHONE GRÁTIS em nossa promoção especial.",
        },
        {
          tipo: "texto",
          texto: "Para receber o prêmio, basta responder este e-mail com seus dados completos e clicar no link abaixo para confirmar o envio:",
        },
        {
          tipo: "texto",
          texto: "www.oferta-premio-agora.net",
        },
        {
          tipo: "texto",
          texto: "Atenção: oferta válida somente hoje!!!",
        },
        {
          tipo: "texto",
          texto: "Equipe Ofertas Imperdíveis",
        },
      ],
    },
    {
      id: "e-mail-3-aviso-de-plataforma-educacional",
      titulo: "E-mail 3 — Aviso de Plataforma Educacional",
      blocos: [
        {
          tipo: "texto",
          texto: "SEGURO — SIMULADO",
        },
        {
          tipo: "texto",
          texto: "Remetente: notificacoes@plataformaeducacional.com Assunto: Novo aviso disponível em sua conta",
        },
        {
          tipo: "texto",
          texto: "Mensagem:",
        },
        {
          tipo: "texto",
          texto: "Olá,",
        },
        {
          tipo: "texto",
          texto: "Um novo aviso foi publicado em sua plataforma educacional.",
        },
        {
          tipo: "texto",
          texto: "Para visualizar, acesse sua conta digitando o endereço oficial da plataforma diretamente no navegador.",
        },
        {
          tipo: "texto",
          texto: "Em caso de dúvidas, entre em contato pelos canais oficiais.",
        },
        {
          tipo: "texto",
          texto: "Atenciosamente, Equipe da Plataforma Educacional",
        },
        {
          tipo: "texto",
          texto: "Repare nos sinais",
        },
        {
          tipo: "texto",
          texto: "Urgência, ameaças, promessas de prêmio, links estranhos e remetentes desconhecidos são sinais clássicos de phishing. O e-mail 3 é seguro justamente por não pedir nenhum clique em link nem dados pessoais.",
        },
      ],
    },
  ],
};

export default atividade;
