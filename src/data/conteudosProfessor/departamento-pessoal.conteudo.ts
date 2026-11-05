import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O Departamento Pessoal cuida da vida do empregado na empresa: admissão, documentos, jornada, folha de pagamento, férias, 13º salário, benefícios e rescisão. É uma área regida por leis (CLT) que mudam: valores e tabelas devem ser conferidos na legislação vigente.",
  topicos: [
    {
      titulo: "Admissão e documentação",
      texto: [
        "A admissão inclui a documentação do candidato (documento de identidade, CPF, carteira de trabalho digital, comprovante de residência, título de eleitor, dados de dependentes), o exame médico admissional e o registro do empregado no eSocial antes do início. O contrato de trabalho pode ser por prazo indeterminado ou determinado (como o contrato de experiência, de até 90 dias).",
      ],
      pontos: ["Listar os documentos de uma admissão.", "Explicar o contrato de experiência."],
      atividades: ["departamento-pessoal-basico"],
    },
    {
      titulo: "Jornada, horas extras e adicional noturno",
      texto: [
        "A jornada comum é de 8 horas por dia e 44 semanais. Hora extra é a que ultrapassa a jornada e paga-se com adicional mínimo de 50% (em geral; convenções coletivas podem prever mais), e 100% em domingos e feriados trabalhados sem folga compensatória. O trabalho noturno (de 22h às 5h, para trabalhadores urbanos) paga adicional de 20% e a hora noturna é reduzida (52 min e 30 s).",
        "Valor da hora = salário ÷ divisor de horas (por exemplo 220 para 44 horas semanais). Hora extra = valor da hora × (1 + adicional) × quantidade de horas.",
      ],
      pontos: ["Calcular o valor da hora e a hora extra.", "Calcular o adicional noturno."],
      exemplo: "Salário de R$ 2.200 e divisor 220: hora = R$ 10,00. Hora extra de 50%: R$ 15,00.",
      erros: ["Esquecer o reflexo das horas extras em outros cálculos, como descanso semanal, férias e 13º."],
      atividades: ["departamento-pessoal-jornada-horas-extras-licencas"],
    },
    {
      titulo: "Folha de pagamento: proventos e descontos",
      texto: [
        "Na folha somam-se os proventos (salário, horas extras, adicionais, comissões) e subtraem-se os descontos (INSS, imposto de renda retido na fonte, vale-transporte, faltas). Salário líquido = proventos − descontos. O FGTS (8% do salário) é depositado pela empresa e não é descontado do empregado.",
        "O INSS do empregado é progressivo: cada faixa de salário tem uma alíquota e só a parte dentro da faixa paga aquela alíquota; há um teto. O IRRF usa a base depois das deduções (INSS e dependentes, ou o desconto simplificado quando mais vantajoso) e a tabela vigente. O vale-transporte é descontado em até 6% do salário base. As tabelas mudam: confira a vigente.",
      ],
      pontos: ["Explicar o INSS progressivo.", "Calcular o líquido de uma folha simples.", "Dizer quem paga o FGTS."],
      erros: ["Aplicar a alíquota do INSS sobre todo o salário em vez de faixa por faixa."],
      atividades: ["departamento-pessoal-planilha-folha-configurar", "departamento-pessoal-planilha-folha-preencher"],
    },
    {
      titulo: "Férias e 13º salário",
      texto: [
        "Depois de 12 meses de trabalho o empregado tem direito a 30 dias de férias, com o adicional de 1/3 sobre o valor. Podem ser divididas em até três períodos (um com no mínimo 14 dias e os demais com no mínimo 5). O empregado pode vender até 10 dias (abono pecuniário). O 13º salário é pago em duas parcelas e equivale a 1/12 por mês trabalhado (mês com 15 ou mais dias).",
      ],
      pontos: ["Calcular o valor das férias com 1/3.", "Calcular o 13º proporcional."],
      exemplo: "Salário de R$ 3.000: férias = 3.000 + 1.000 (1/3) = R$ 4.000, antes dos descontos.",
      atividades: ["departamento-pessoal-ferias-adicionais-rescisao"],
    },
    {
      titulo: "Rescisão, licenças e acidente de trabalho",
      texto: [
        "A rescisão varia pelo tipo: pedido de demissão, dispensa sem justa causa, com justa causa, acordo e fim de contrato. As verbas podem incluir saldo de salário, aviso prévio, férias vencidas e proporcionais com 1/3, 13º proporcional e multa do FGTS, conforme o caso. Na dispensa por justa causa, algumas verbas não são devidas.",
        "Licenças: maternidade, paternidade e outras previstas em lei ou em acordo. Em acidente de trabalho, a empresa emite a CAT (Comunicação de Acidente de Trabalho) até o primeiro dia útil seguinte ao acidente (imediatamente em caso de morte).",
      ],
      pontos: ["Listar verbas da rescisão sem justa causa.", "Saber quando emitir a CAT."],
      atividades: ["departamento-pessoal-ferias-adicionais-rescisao", "departamento-pessoal-jornada-horas-extras-licencas", "departamento-pessoal-novos-formatos-interacao"],
    },
  ],
  glossario: [
    { termo: "CLT", definicao: "Consolidação das Leis do Trabalho." },
    { termo: "eSocial", definicao: "Sistema do governo que reúne informações trabalhistas e previdenciárias." },
    { termo: "FGTS", definicao: "Fundo de Garantia do Tempo de Serviço, depositado pela empresa." },
    { termo: "INSS", definicao: "Contribuição previdenciária do empregado." },
    { termo: "IRRF", definicao: "Imposto de renda retido na fonte." },
    { termo: "CAT", definicao: "Comunicação de Acidente de Trabalho." },
    { termo: "Provento", definicao: "Valor que o empregado recebe na folha." },
  ],
  dicas: [
    "Antes de qualquer cálculo, confira as tabelas e os valores vigentes: eles mudam todo ano.",
    "Monte um holerite no quadro e peça que a turma explique cada linha.",
    "Reforce que erro de folha é problema para o empregado e para a empresa: peça conferência em duplas.",
  ],
};

export default conteudo;
