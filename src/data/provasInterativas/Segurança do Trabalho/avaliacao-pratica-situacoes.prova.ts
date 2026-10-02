import type { CampoProva, ItemProva, ProvaInterativa } from "@/types/quiz";

/**
 * Segurança do Trabalho — avaliação prática e situacional: cada questão é um
 * caso do dia a dia de uma empresa, com a decisão que o trabalhador, o
 * técnico ou o gestor deve tomar. Prova escrita para o portal.
 *
 * Vídeo: qualquer questão aceita `video` (ver `ItemProva` em src/types/quiz.ts),
 * com um arquivo em public/provas/seguranca-do-trabalho/ (`url`) ou um vídeo
 * do YouTube (`youtube`: o id). Quando houver o vídeo da situação, basta
 * acrescentar o campo `video` à questão correspondente.
 */
const mc = (id: string, opcoes: string[], correta: number): CampoProva => ({ id, regra: { tipo: "multipla_escolha", opcoes, correta } });
const sel = (id: string, rotulo: string, opcoes: [string, string][], esperado: string): CampoProva => ({
  id,
  rotulo,
  regra: { tipo: "selecao", opcoes: opcoes.map(([valor, texto]) => ({ valor, texto })), esperado },
});
const CORES_SINAL: [string, string][] = [
  ["vermelho", "Vermelho"],
  ["azul", "Azul"],
  ["amarelo", "Amarelo"],
  ["verde", "Verde"],
];
const CORES_RISCO: [string, string][] = [
  ["verde", "Verde"],
  ["vermelho", "Vermelho"],
  ["marrom", "Marrom"],
  ["amarelo", "Amarelo"],
  ["azul", "Azul"],
];

const itens: ItemProva[] = [
  {
    titulo: "Situação 1: A lâmpada do galpão",
    enunciado:
      "Um auxiliar vai trocar uma lâmpada a 3 metros de altura, subindo numa escada apoiada em uma prateleira de estoque. Ele não tem treinamento para trabalho em altura e diz que \"é rapidinho\". O que o responsável pelo setor deve fazer?",
    campos: [
      mc(
        "altura",
        [
          "a) Deixar, porque são só alguns minutos.",
          "b) Impedir a tarefa: acima de 2 metros é trabalho em altura (NR-35); só trabalhador capacitado e autorizado, com análise de risco, escada adequada e proteção contra queda.",
          "c) Mandar que ele segure firme na prateleira para se equilibrar.",
          "d) Pedir que ele use luvas, porque a lâmpada pode estar quente.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: acima de 2 metros é trabalho em altura, e exige capacitação, autorização e proteção contra queda.",
    mensagemErrada: "Lembre: a NR-35 vale a partir de 2 metros de altura, não importa se a tarefa é rápida.",
  },
  {
    titulo: "Situação 2: A serra barulhenta",
    enunciado:
      "Um operador usa uma serra circular o dia todo, sem protetor auricular. A medição no local mostrou 95 dB(A) de ruído, e o limite de tolerância para 8 horas de trabalho é 85 dB(A). Qual é a conduta correta?",
    campos: [
      mc(
        "ruido",
        [
          "a) Nenhuma: o ruído de máquina faz parte do trabalho.",
          "b) Fornecer protetor auricular adequado e treinar o uso, e procurar reduzir o ruído na fonte (manutenção, enclausuramento) e o tempo de exposição.",
          "c) Aumentar o volume do rádio para que ele ouça os colegas.",
          "d) Trocar o operador de máquina todo mês, sem outra medida.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: o EPI protege, mas o ideal é reduzir o ruído na fonte e o tempo de exposição.",
    mensagemErrada: "95 dB(A) passa do limite de 85. É preciso protetor auricular e medidas para reduzir o ruído.",
  },
  {
    titulo: "Situação 3: Fogo no quadro de força",
    enunciado: "Começou um princípio de incêndio em um quadro de energia elétrica ainda energizado. Qual extintor é o mais adequado?",
    campos: [
      mc(
        "extintor",
        [
          "a) Água, que apaga qualquer fogo.",
          "b) Gás carbônico (CO₂) ou pó químico, adequados a equipamentos elétricos energizados.",
          "c) Espuma, porque cobre o fogo.",
          "d) Nenhum: deve-se jogar um balde de areia molhada.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: em fogo elétrico (classe C) usa-se CO₂ ou pó químico; água conduz eletricidade.",
    mensagemErrada: "Água e espuma conduzem eletricidade. Pense no extintor para fogo em equipamento elétrico.",
  },
  {
    titulo: "Situação 4: Corte profundo",
    enunciado: "Um colega se cortou fundo na mão com uma chapa de metal e sangra bastante. Você está sozinho com ele. Qual é a melhor conduta imediata?",
    campos: [
      mc(
        "socorro",
        [
          "a) Lavar com álcool e esperar o sangramento parar sozinho.",
          "b) Comprimir o ferimento com pano limpo, manter a mão elevada e acionar socorro (SAMU 192 ou o serviço da empresa).",
          "c) Aplicar pó de café para estancar.",
          "d) Mandar ele voltar ao trabalho para a mão não inchar.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: pressão direta com pano limpo, elevar o membro e acionar o socorro.",
    mensagemErrada: "Evite produtos caseiros: comprima com pano limpo e chame o socorro.",
  },
  {
    titulo: "Situação 5: Qual medida vem primeiro?",
    enunciado:
      "Uma prensa fere um operador por ano. A empresa quer diminuir o risco. Segundo a hierarquia de controle, qual medida é a MELHOR?",
    referencia: "Ordem da hierarquia, da mais para a menos eficaz: eliminar → substituir → proteção coletiva (engenharia) → medidas administrativas → EPI.",
    campos: [
      mc(
        "hierarquia",
        [
          "a) Entregar luvas melhores (EPI).",
          "b) Fazer um treinamento por ano (medida administrativa).",
          "c) Instalar proteção fixa e cortina de luz que impeçam a mão de chegar à zona de prensagem (proteção coletiva).",
          "d) Colocar uma placa avisando: cuidado.",
        ],
        2,
      ),
    ],
    mensagemCerta: "Certo: a proteção coletiva age na máquina e protege todos; EPI e aviso ficam por último.",
    mensagemErrada: "Quanto mais perto da fonte do perigo, melhor: proteção coletiva vale mais que EPI, treinamento e placa.",
  },
  {
    titulo: "Situação 6: Acidente com afastamento",
    enunciado: "Um trabalhador sofreu um acidente de trabalho e ficou afastado. Qual documento a empresa deve emitir e em que prazo?",
    campos: [
      mc(
        "cat",
        [
          "a) CAT (Comunicação de Acidente de Trabalho), até o primeiro dia útil seguinte ao acidente.",
          "b) CAT, até 30 dias depois.",
          "c) Nenhum documento: basta avisar o chefe.",
          "d) Apenas um atestado médico, sem comunicação ao INSS.",
        ],
        0,
      ),
    ],
    mensagemCerta: "Certo: a CAT deve ser emitida até o primeiro dia útil seguinte ao acidente (no caso de morte, de imediato).",
    mensagemErrada: "O prazo da CAT é curto: o primeiro dia útil seguinte ao acidente.",
  },
  {
    titulo: "Situação 7: Cores da sinalização",
    enunciado: "Na sinalização de segurança, associe cada situação à cor da placa:",
    campos: [
      sel("proibicao", "Proibido fumar e equipamento de combate a incêndio (proibição / emergência)", CORES_SINAL, "vermelho"),
      sel("obrigacao", "Uso obrigatório de capacete (obrigação)", CORES_SINAL, "azul"),
      sel("atencao", "Cuidado: piso escorregadio (atenção)", CORES_SINAL, "amarelo"),
      sel("seguranca", "Saída de emergência (situação segura)", CORES_SINAL, "verde"),
    ],
    mensagemCerta: "Isso mesmo: vermelho proíbe/emergência, azul obriga, amarelo alerta e verde indica segurança.",
    mensagemErrada: "Lembre: vermelho = proibição e combate a incêndio; azul = obrigação; amarelo = atenção; verde = segurança.",
  },
  {
    titulo: "Situação 8: O que faz a CIPA?",
    enunciado: "Um funcionário pergunta a um colega o que é a CIPA. Qual explicação está correta?",
    campos: [
      mc(
        "cipa",
        [
          "a) É a comissão que fiscaliza o horário de almoço.",
          "b) É a Comissão Interna de Prevenção de Acidentes e de Assédio: reúne representantes dos trabalhadores e da empresa para identificar riscos e propor ações de prevenção.",
          "c) É o setor que paga o seguro de vida dos funcionários.",
          "d) É um órgão do governo que fecha empresas.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: a CIPA existe para prevenir acidentes e doenças do trabalho, com participação dos trabalhadores.",
    mensagemErrada: "Pense no papel preventivo: identificar riscos e propor ações com a participação dos trabalhadores.",
  },
  {
    titulo: "Situação 9: Mapa de riscos",
    enunciado: "Ao montar o mapa de riscos do setor, qual cor do círculo representa cada grupo de risco?",
    campos: [
      sel("fisicos", "Riscos físicos (ruído, calor, vibração)", CORES_RISCO, "verde"),
      sel("quimicos", "Riscos químicos (poeiras, gases, produtos de limpeza)", CORES_RISCO, "vermelho"),
      sel("biologicos", "Riscos biológicos (vírus, bactérias, fungos)", CORES_RISCO, "marrom"),
      sel("ergonomicos", "Riscos ergonômicos (postura, esforço repetitivo)", CORES_RISCO, "amarelo"),
      sel("acidentes", "Riscos de acidentes (máquina sem proteção, piso irregular)", CORES_RISCO, "azul"),
    ],
    mensagemCerta: "Isso mesmo: físico verde, químico vermelho, biológico marrom, ergonômico amarelo, acidente azul.",
    mensagemErrada: "Revise as cores tradicionais do mapa de riscos: verde, vermelho, marrom, amarelo e azul.",
  },
  {
    titulo: "Situação 10: Máquina sem proteção",
    enunciado:
      "Ao ligar a máquina de corte, você percebe que a proteção da lâmina foi retirada para facilitar a limpeza e não foi recolocada. O encarregado pede que você \"tire a produção do dia assim mesmo\". O que você faz?",
    campos: [
      mc(
        "recusa",
        [
          "a) Opera com cuidado para não se machucar e não fala nada.",
          "b) Não opera a máquina, avisa o encarregado e o técnico de segurança, sinaliza o equipamento como interditado e só volta quando a proteção for recolocada.",
          "c) Desliga o disjuntor geral da fábrica inteira e vai para casa.",
          "d) Pede para um colega operar no seu lugar.",
        ],
        1,
      ),
    ],
    mensagemCerta: "Certo: máquina sem proteção não se opera; comunique e sinalize até regularizar.",
    mensagemErrada: "Operar sem a proteção expõe você e os outros. O correto é não operar, comunicar e sinalizar.",
  },
];

const prova: ProvaInterativa = {
  tipo: "autocorrigida",
  titulo: "Segurança do Trabalho — Avaliação Prática: Situações do Dia a Dia",
  introducao:
    "Cada questão é uma situação real de uma empresa. Leia com atenção, pense no que um profissional de segurança faria e escolha a conduta correta.",
  itens,
};

export default prova;
