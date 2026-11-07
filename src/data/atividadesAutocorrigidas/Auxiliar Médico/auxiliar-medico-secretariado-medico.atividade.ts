import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculo, escolha } from "../ajudantes";
import { comFigura, figura } from "../auxiliarMedicoComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Auxiliar Médico — Secretariado Médico",
  introducao:
    "O secretariado médico mantém o consultório funcionando por trás da consulta: organiza a rotina, cuida do prontuário e dos documentos, guarda tudo com sigilo e deixa o médico livre para atender. Esta atividade mostra o dia de trabalho, quem preenche cada parte do prontuário, o limite entre o que a secretária faz e o que só o médico pode fazer, e como arquivar de modo que qualquer ficha seja achada em segundos.",
  itens: [
    comFigura(
      associar({
        id: "rotina-do-dia",
        titulo: "A rotina do dia de trabalho",
        blocos: [
          { tipo: "texto", texto: "O dia do secretariado tem três momentos: antes de abrir, durante o atendimento e ao fechar. Quem faz cada coisa no momento certo evita correria, esquecimento e erro." },
        ],
        instrucao: "Em que momento você faz cada tarefa?",
        opcoes: ["Antes de abrir", "Durante o dia", "Ao fechar"],
        linhas: [
          { id: "agenda", rotulo: "Conferir a agenda e separar os prontuários do dia", correta: 0 },
          { id: "chegada", rotulo: "Registrar a chegada do paciente e avisar o médico", correta: 1 },
          { id: "reconfirmar", rotulo: "Reconfirmar as consultas do dia seguinte", correta: 2 },
          { id: "arquivar", rotulo: "Arquivar os prontuários usados, completos e na ordem", correta: 2 },
        ],
        explicacao: "A preparação antes de abrir evita atraso, e o fechamento bem feito deixa o dia seguinte pronto.",
      }),
      figura("rotina-do-dia", "Três colunas — antes de abrir, durante o dia e ao fechar — com cinco tarefas em cada uma.", "O dia do secretariado em três momentos."),
    ),
    comFigura(
      associar({
        id: "quem-preenche",
        titulo: "Quem preenche o prontuário",
        blocos: [
          { tipo: "texto", texto: "O prontuário é o registro do histórico e do atendimento do paciente. É um documento do paciente, mas a parte clínica é escrita pelo médico. A secretaria cuida dos dados de identificação, do convênio e do consentimento; o auxiliar registra o que mediu (como os sinais vitais) quando o consultório pede." },
        ],
        instrucao: "Ligue cada seção a quem a preenche.",
        opcoes: ["Secretaria", "Médico", "Auxiliar"],
        linhas: [
          { id: "ident", rotulo: "Identificação: nome, nascimento, endereço, telefone", correta: 0 },
          { id: "historico", rotulo: "Queixa e histórico do paciente", correta: 1 },
          { id: "evolucao", rotulo: "Evolução, diagnóstico e prescrição", correta: 1 },
          { id: "vitais", rotulo: "Sinais vitais aferidos no dia", correta: 2 },
        ],
        explicacao: "A parte clínica é sempre do médico. Quem preenche o que não lhe cabe pode causar erro grave no cuidado do paciente.",
      }),
      figura("prontuario-secretaria", "Prontuário com seis seções, cada uma com a indicação de quem preenche: secretaria, médico ou auxiliar.", "Quem preenche cada parte do prontuário."),
    ),
    comFigura(
      escolha({
        id: "atestado-sem-medico",
        titulo: "Documentos: o limite da secretária",
        blocos: [
          { tipo: "texto", texto: "Atestado, receita e pedido de exame são atos do médico: só ele decide o conteúdo e assina. A secretária prepara o papel, imprime e entrega depois da assinatura, mas nunca assina nem altera." },
        ],
        instrucao: "Um paciente pede um atestado e o médico saiu para uma urgência. Ele insiste: \"A senhora só preenche, depois ele assina!\" O que você faz?",
        opcoes: [
          "Explica com educação que o atestado só pode ser feito pelo médico, anota o pedido e o recado e avisa o paciente quando o médico voltar.",
          "Preenche o atestado com o que o paciente pediu e deixa o médico assinar depois.",
          "Assina por ele, só desta vez.",
          "Manda o paciente embora sem anotar nada.",
        ],
        correta: 0,
        explicacao: "O conteúdo do atestado é decisão clínica. Preencher \"no escuro\" é assumir um ato que não é seu, mesmo com assinatura depois.",
      }),
      figura("documentos-do-consultorio", "Duas colunas comparando o que o médico faz e o que a secretária faz com os documentos, com o aviso de que a secretária nunca assina.", "Documentos: quem faz o quê."),
    ),
    calculo({
      id: "guarda-do-prontuario",
      titulo: "Por quanto tempo guardar",
      blocos: [
        { tipo: "texto", texto: "Pela lei, o prontuário em papel deve ser guardado por no mínimo 20 anos, contados a partir do último registro do paciente. Quem organiza o arquivo precisa saber até quando cada ficha deve ficar." },
        { tipo: "nota", variante: "aviso", texto: "Quando o consultório digitaliza os prontuários, existem regras específicas para eliminar o papel. Nunca descarte nada sem a autorização por escrito do médico responsável." },
      ],
      instrucao: "O último registro de um prontuário em papel foi feito em 2024. Até que ano, no mínimo, ele deve ser guardado?",
      rotulo: "Ano",
      esperado: 2044,
      tolerancia: 0,
      explicacao: "2024 + 20 anos = 2044. A contagem começa no último atendimento, e não na abertura da ficha.",
      placeholder: "Ex.: 2040",
    }),
    associar({
      id: "ordem-alfabetica",
      titulo: "Arquivo em ordem alfabética",
      blocos: [
        { tipo: "texto", texto: "Os prontuários do arquivo ficam em ordem alfabética pelo sobrenome (ou pelo nome do paciente, conforme a regra do consultório). Assim, qualquer ficha é encontrada em segundos. Compare letra por letra: se as primeiras letras forem iguais, olhe a segunda, e assim por diante." },
      ],
      cenario: "Quatro prontuários estão sobre a mesa: Silva, Santos, Souza e Sampaio.",
      instrucao: "Em que posição cada um fica no arquivo, do primeiro ao quarto?",
      opcoes: ["1º", "2º", "3º", "4º"],
      linhas: [
        { id: "sampaio", rotulo: "Sampaio", correta: 0 },
        { id: "santos", rotulo: "Santos", correta: 1 },
        { id: "silva", rotulo: "Silva", correta: 2 },
        { id: "souza", rotulo: "Souza", correta: 3 },
      ],
      explicacao: "Todos começam com S. A segunda letra decide: A (Sampaio e Santos), I (Silva), O (Souza). Entre Sampaio e Santos, a terceira letra: M vem antes de N.",
    }),
    escolha({
      id: "prontuario-aberto",
      titulo: "O prontuário em cima do balcão",
      cenario: "Durante o atendimento, você precisa atender o telefone e deixa o prontuário de um paciente aberto no balcão, de frente para a sala de espera.",
      instrucao: "Qual é o problema?",
      opcoes: [
        "Qualquer pessoa pode ler dados sensíveis do paciente: é quebra de sigilo, mesmo sem intenção.",
        "Nenhum: ninguém tem interesse em ler prontuário alheio.",
        "O único problema é a ficha amassar.",
        "Só importa se o paciente reclamar.",
      ],
      correta: 0,
      explicacao: "Sigilo não depende de má-fé: depende do cuidado. Feche o prontuário e guarde-o antes de se afastar.",
    }),
  ],
};

export default atividade;
