import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, escolha, resposta } from "../ajudantes";

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — O Poder do seu E-mail",
  introducao:
    "O e-mail é a ferramenta de comunicação formal do trabalho. Aprenda a usar os campos corretos, anexar arquivos dentro do limite e escrever mensagens claras.",
  itens: [
    associar({
      id: "campos",
      titulo: "Para, Cc e Cco",
      instrucao: "Escolha em qual campo cada destinatário deve entrar.",
      opcoes: ["Para (destinatário principal)", "Cc (com cópia, todos veem)", "Cco (cópia oculta, ninguém vê)"],
      linhas: [
        { id: "responsavel", rotulo: "A pessoa que precisa tomar a ação pedida no e-mail.", correta: 0 },
        { id: "gestor", rotulo: "O gestor que só precisa ficar ciente da conversa.", correta: 1 },
        { id: "clientes", rotulo: "Uma lista de clientes que não devem ver os e-mails uns dos outros.", correta: 2 },
      ],
      explicacao: "Cco protege a privacidade de listas de contatos; Cc dá ciência; Para endereça quem deve agir.",
    }),
    escolha({
      id: "assunto",
      titulo: "O assunto do e-mail",
      instrucao: "Qual é o melhor assunto para um e-mail que pede a aprovação de um orçamento?",
      opcoes: ["Oi", "Urgente!!!", "Aprovação do orçamento nº 482 — resposta até sexta (15/03)", "Importante"],
      correta: 2,
      explicacao: "Um bom assunto diz o tema e o que se espera, de forma clara e curta, ajudando quem lê a priorizar.",
    }),
    calculo({
      id: "anexos",
      titulo: "Limite de anexos",
      cenario: "O serviço de e-mail aceita no máximo 25 MB por mensagem. Você quer anexar três arquivos de 9 MB cada.",
      instrucao: "Qual é o tamanho total dos anexos, em MB? (Ele cabe no limite?)",
      rotulo: "Total (MB)",
      esperado: 27,
      tolerancia: 0,
      explicacao: "3 × 9 = 27 MB, acima de 25 MB. Compacte os arquivos ou envie um link de pasta na nuvem.",
    }),
    escolha({
      id: "responder-todos",
      titulo: "Responder a todos",
      instrucao: "Quando é correto usar «Responder a todos»?",
      opcoes: [
        "Sempre, para ninguém ficar de fora.",
        "Só quando a resposta interessa a todos os destinatários da conversa.",
        "Nunca.",
        "Apenas em e-mails de chefes.",
      ],
      correta: 1,
      explicacao: "Respostas desnecessárias a todos lotam caixas de entrada e podem expor informações a quem não precisa vê-las.",
    }),
    escolha({
      id: "assinatura",
      titulo: "Assinatura profissional",
      instrucao: "O que deve constar em uma assinatura de e-mail corporativo?",
      opcoes: [
        "Frase de humor e foto pessoal.",
        "Nome, cargo, empresa e meios de contato.",
        "Somente o primeiro nome.",
        "A senha do e-mail.",
      ],
      correta: 1,
      explicacao: "A assinatura identifica quem escreve e como entrar em contato, de forma curta e padronizada.",
    }),
    resposta({
      id: "escrever",
      titulo: "Escreva a mensagem",
      cenario: "Você precisa pedir ao setor de compras uma cotação de 10 cadeiras de escritório até quinta-feira.",
      instrucao: "Escreva o corpo do e-mail: saudação, pedido claro com prazo e despedida.",
      rotulo: "Corpo do e-mail",
      placeholder: "Prezados, ... Solicito cotação de 10 cadeiras ... até quinta-feira. Atenciosamente, ...",
      chave: /(cota[cç][aã]o|cadeira)/i,
      minPalavras: 12,
    }),
  ],
};

export default atividade;
