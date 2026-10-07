import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, reais, somar } from "../ajudantes";
import { DEDUCAO_DEPENDENTE, DESCONTO_SIMPLIFICADO, FAIXAS_INSS, FAIXAS_IRRF, FOLHA_BASE, FUNCIONARIOS } from "../dadosFolha";

const F = FOLHA_BASE;
const linha = (m: string) => F.find((l) => l.funcionario.matricula === m)!;
const maiorSalario = [...F].sort((a, b) => b.funcionario.salario - a.funcionario.salario)[0];
const exemplo = F.find((l) => l.funcionario.salario > 2900 && l.funcionario.salario < 4100 && l.irrf > 0) ?? F[0];
const piso = F.find((l) => l.funcionario.salario === 1518)!;
const comIr = F.filter((l) => l.irrf > 0 && l !== maiorSalario && l !== exemplo);
const perguntaIr = comIr[0] ?? maiorSalario;
const perguntaLiquido = F.filter((l) => l.funcionario.dependentes > 0 && l.vt > 0 && l !== exemplo)[1] ?? F[3];
const ISENTOS = F.filter((l) => l.irrf === 0).length;

const e = exemplo.funcionario;
const faixasTexto = FAIXAS_INSS.map((f, i) => `${reais(i === 0 ? 0 : FAIXAS_INSS[i - 1].ate)} a ${reais(f.ate)}: ${f.aliquota.toLocaleString("pt-BR")}%`);
const passoInss = FAIXAS_INSS.map((f, i) => {
  const de = i === 0 ? 0 : FAIXAS_INSS[i - 1].ate;
  const parte = Math.max(0, Math.min(e.salario, f.ate) - de);
  return parte > 0 ? `${reais(parte)} × ${f.aliquota.toLocaleString("pt-BR")}% = ${reais((parte * f.aliquota) / 100)}` : null;
}).filter(Boolean) as string[];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Departamento Pessoal — Configurando a Planilha da Folha de Pagamento",
  introducao:
    "Situação de trabalho real: o escritório que fazia a folha da empresa encerrou o contrato e o cálculo vem para dentro de casa. Sua tarefa é CONFIGURAR a planilha de folha que o DP vai usar todo mês: INSS progressivo faixa a faixa, IRRF com a tabela e o desconto simplificado, vale-transporte limitado a 6%, líquido, FGTS, validação dos dados e um holerite por matrícula. A planilha com os 40 funcionários e as tabelas oficiais de setembro/2025 é baixada aqui mesmo, na etapa 1.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido da coordenadora de DP",
      remetente: "Sílvia Matos, coordenadora de Departamento Pessoal da Distribuidora Horizonte",
      assunto: "A folha volta para dentro de casa a partir de setembro",
      paragrafos: [
        "A partir deste mês a folha é nossa. Preciso de uma planilha em que a gente só atualize o cadastro e as ocorrências, e todo o resto saia sozinho: INSS, IRRF, vale-transporte, líquido e FGTS de cada um dos 40 funcionários.",
        "Quero tudo puxando das tabelas da aba Tabelas, sem número digitado dentro das fórmulas: quando o governo mudar a tabela, a gente troca um valor e a folha inteira se ajusta. E nada de fórmula apagada sem querer: proteja o que for cálculo.",
        "Antes de virar oficial, vou conferir os totais que você me mandar com o último relatório do escritório.",
      ],
      entregas: [
        "As colunas de INSS, IRRF, VT, líquido e FGTS no Cadastro (etapas 2 a 4).",
        "A validação dos dados, o destaque de quem tem IR e o holerite por matrícula (etapas 5 a 7).",
        "A proteção e o memorando com os totais para a coordenação (etapas 8 e 9).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Baixar a planilha e conhecer as abas",
      download: {
        url: "/atividades/departamento-pessoal/folha-para-configurar.xlsx",
        nome: "folha-para-configurar.xlsx",
        rotulo: "Baixar planilha",
        descricao: "Abas Leia-me, Cadastro (40 funcionários: salário, dependentes e custo do VT), Tabelas (INSS, IRRF e parâmetros) e Holerite (em branco).",
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e, se aparecer a faixa amarela «Modo de Exibição Protegido», clique em Habilitar Edição.",
        "Salve uma cópia como Folha Setembro.xlsx (Arquivo > Salvar como) e trabalhe nela.",
        "Abra a aba Tabelas: à esquerda, as faixas do INSS (A3:B6) e do IRRF (A11:C15); à direita, os parâmetros (F3 = dedução por dependente, F4 = desconto simplificado, F8 = FGTS, F9 = VT).",
        "Na aba Cadastro, clique numa célula dos dados e aperte Ctrl + T > «Minha tabela tem cabeçalhos». Depois, Exibir > Congelar Painéis > Congelar Linha Superior.",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Separar os dados (Cadastro) das regras (Tabelas) é o que permite atualizar a folha sem reescrever fórmula: em janeiro, quando sai a tabela nova do INSS, você troca quatro números na aba Tabelas e pronto." },
      ],
    },
    consulta({
      id: "inss",
      titulo: "Etapa 2 — INSS progressivo, faixa por faixa",
      cenario: `Desde 2020 o INSS do empregado é progressivo: cada pedaço do salário paga a alíquota da sua faixa (${faixasTexto.join("; ")}), e o que passa do teto não paga nada. Exemplo resolvido com ${e.nome} (${e.matricula}), salário de ${reais(e.salario)}: ${passoInss.join(" + ")} = ${reais(exemplo.inss)}.`,
      instrucao: "Na coluna I do Cadastro (título «INSS»), escreva a fórmula da linha 2 somando faixa a faixa, com as faixas da aba Tabelas em referência absoluta ($) e arredondando em 2 casas. Arraste até o último funcionário e responda.",
      tabelas: [],
      comandos: [
        { id: "formula", rotulo: "Sua fórmula de INSS (linha 2)", padrao: /^=\s*(ARRED|ROUND)\s*\([\s\S]*(M[IÍ]NIMO|MIN)\s*\([\s\S]*Tabelas!\$?[A-Z]\$?\d/i, placeholder: "=ARRED(MÍNIMO(F2;Tabelas!$A$3)*Tabelas!$B$3+MÁXIMO(0;MÍNIMO(F2;Tabelas!$A$4)-Tabelas!$A$3)*Tabelas!$B$4+...;2)", dica: "Use ARRED( ... ;2) por fora, MÍNIMO para cortar o salário no limite de cada faixa e MÁXIMO(0; ...) para não dar negativo, sempre apontando para a aba Tabelas com $." },
      ],
      resultados: [
        { id: "total", rotulo: "Total de INSS descontado dos 40 funcionários (R$)", valor: somar(F.map((l) => l.inss)), explicacao: "Soma da coluna INSS.", tolerancia: 0.1 },
        { id: "teto", rotulo: `INSS de ${maiorSalario.funcionario.nome} (${maiorSalario.funcionario.matricula}), o maior salário (R$)`, valor: maiorSalario.inss, explicacao: "Salário acima do teto: paga o máximo, a soma das quatro faixas cheias." },
        { id: "piso", rotulo: `INSS de ${piso.funcionario.nome} (${piso.funcionario.matricula}), que ganha o salário mínimo (R$)`, valor: piso.inss, explicacao: "Só a primeira faixa: 1.518,00 × 7,5%." },
      ],
    }),
    consulta({
      id: "irrf",
      titulo: "Etapa 3 — Base do IR e IRRF com PROCV aproximado",
      cenario: `A base do IR é o salário menos as deduções. Desde maio/2025 a empresa usa a MAIOR entre: (a) INSS + ${reais(DEDUCAO_DEPENDENTE)} por dependente; (b) o desconto simplificado de ${reais(DESCONTO_SIMPLIFICADO)}. Com a base, o IRRF é base × alíquota − parcela a deduzir da faixa (tabela em Tabelas!A11:C15; isento até ${reais(FAIXAS_IRRF[1].de - 0.01)}). No exemplo de ${e.nome}: deduções = ${reais(exemplo.deducaoIr)}, base = ${reais(exemplo.baseIr)}, IRRF = ${reais(exemplo.irrf)}.`,
      instrucao: "Crie J = Dedução do IR, K = Base do IR e L = IRRF. Na L, use PROCV com o último argumento VERDADEIRO (correspondência aproximada) para achar a faixa. Responda.",
      tabelas: [],
      comandos: [
        { id: "deducao", rotulo: "Sua fórmula de Dedução do IR (J2)", padrao: /^=\s*(M[AÁ]XIMO|MAX)\s*\([\s\S]*Tabelas!/i, placeholder: "=MÁXIMO(I2+G2*Tabelas!$F$3;Tabelas!$F$4)", dica: "MÁXIMO entre (INSS + dependentes × dedução) e o desconto simplificado da aba Tabelas." },
        { id: "irrf", rotulo: "Sua fórmula de IRRF (L2)", padrao: /(PROCV|VLOOKUP)\s*\([\s\S]*(VERDADEIRO|TRUE|;\s*1\s*\)|,\s*1\s*\))/i, placeholder: "=ARRED(MÁXIMO(0;K2*PROCV(K2;Tabelas!$A$11:$C$15;2;VERDADEIRO)-PROCV(K2;Tabelas!$A$11:$C$15;3;VERDADEIRO));2)", dica: "PROCV(base; tabela do IR; 2; VERDADEIRO) traz a alíquota e com 3 traz a parcela a deduzir. Sem VERDADEIRO o Excel procura o valor exato e devolve #N/D." },
      ],
      resultados: [
        { id: "total", rotulo: "Total de IRRF retido no mês (R$)", valor: somar(F.map((l) => l.irrf)), explicacao: "Soma da coluna IRRF.", tolerancia: 0.1 },
        { id: "isentos", rotulo: "Quantos funcionários ficam isentos (IRRF = 0)?", valor: ISENTOS, explicacao: "Use =CONT.SE(L:L;0).", tolerancia: 0 },
        { id: "maior", rotulo: `IRRF de ${maiorSalario.funcionario.nome} (R$)`, valor: maiorSalario.irrf, explicacao: "Base na última faixa (27,5%, parcela a deduzir de R$ 908,73)." },
        { id: "outro", rotulo: `IRRF de ${perguntaIr.funcionario.nome} (${perguntaIr.funcionario.matricula}) (R$)`, valor: perguntaIr.irrf, explicacao: "Confira se a dedução usou a maior das duas opções." },
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "O PROCV aproximado procura o maior valor da primeira coluna que seja menor ou igual à base. Por isso a tabela começa em 0 e está em ordem crescente: é assim que ele «cai» na faixa certa sem nenhum SE aninhado." },
      ],
    }),
    consulta({
      id: "liquido",
      titulo: "Etapa 4 — Vale-transporte, líquido e FGTS",
      cenario: "Regras: o desconto de VT é 6% do salário-base, mas nunca maior que o custo das passagens (coluna H); quem tem custo 0 não optou e não desconta. Líquido = salário − INSS − IRRF − VT. O FGTS (8% do salário) não sai do bolso do funcionário: é depósito da empresa.",
      instrucao: "Crie M = VT, N = Salário líquido e O = FGTS, e responda.",
      tabelas: [],
      comandos: [
        { id: "formula-vt", rotulo: "Sua fórmula de VT (M2)", padrao: /^=\s*(SE|IF)\s*\([\s\S]*(M[IÍ]NIMO|MIN)\s*\(/i, placeholder: "=SE(H2>0;ARRED(MÍNIMO(F2*Tabelas!$F$9;H2);2);0)", dica: "SE o custo for maior que zero, o MÍNIMO entre 6% do salário e o custo; senão, 0." },
      ],
      resultados: [
        { id: "vt", rotulo: "Total descontado de vale-transporte (R$)", valor: somar(F.map((l) => l.vt)), explicacao: "Soma da coluna VT.", tolerancia: 0.1 },
        { id: "liquido", rotulo: "Total líquido a pagar aos 40 funcionários (R$)", valor: somar(F.map((l) => l.liquido)), explicacao: "Soma da coluna Líquido.", tolerancia: 0.2 },
        { id: "fgts", rotulo: "Total de FGTS a depositar (R$)", valor: somar(F.map((l) => l.fgts)), explicacao: "8% de cada salário, somado.", tolerancia: 0.1 },
        { id: "custo", rotulo: "Custo da folha para a empresa: salários + FGTS (R$)", valor: somar(F.map((l) => l.bruto + l.fgts)), explicacao: "Soma dos salários mais o FGTS (sem contar o INSS patronal, que fica fora deste treino).", tolerancia: 0.2 },
        { id: "um", rotulo: `Líquido de ${perguntaLiquido.funcionario.nome} (${perguntaLiquido.funcionario.matricula}) (R$)`, valor: perguntaLiquido.liquido, explicacao: "Salário − INSS − IRRF − VT dessa linha." },
      ],
    }),
    {
      id: "validacao",
      titulo: "Etapa 5 — Validação de dados no cadastro",
      passos: [
        "Selecione a coluna Dependentes (G2 até G41). Dados > Validação de Dados > Permitir: Número inteiro > Dados: está entre > Mínimo 0 e Máximo 10.",
        "Na aba Alerta de erro, escreva «Informe o número de dependentes declarados (0 a 10)». OK.",
        "Selecione a coluna Setor (D2 até D41). Dados > Validação de Dados > Permitir: Lista > Fonte: Administrativo;Financeiro;Comercial;Logística.",
        "Teste: digite 2,5 em Dependentes e «adm» em Setor. O Excel deve recusar os dois. Desfaça com Esc.",
      ],
      campos: [
        { id: "fonte", rotulo: "O que você digitou na Fonte da lista de Setor", placeholder: "Administrativo;...", regra: { tipo: "padrao", padrao: /administrativo\s*[;,]\s*financeiro\s*[;,]\s*comercial\s*[;,]\s*log[ií]stica/i }, mensagemCerta: "Isso: os quatro setores, separados por ponto e vírgula.", mensagemErrada: "Escreva os quatro setores separados por ponto e vírgula: Administrativo;Financeiro;Comercial;Logística." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Dependente errado muda o IRRF e vira problema na declaração do funcionário. Setor escrito de três jeitos quebra qualquer relatório por setor. A validação barra o erro na digitação, que é onde ele custa menos." }],
    },
    {
      id: "formatacao",
      titulo: "Etapa 6 — Destacar quem tem IR a recolher",
      passos: [
        "Selecione a coluna IRRF (L2 até L41).",
        "Página Inicial > Formatação Condicional > Realçar Regras das Células > É Maior do que... > digite 0 e escolha «Preenchimento verde claro». OK.",
        "Confira: as células com imposto ficam verdes; as isentas ficam brancas.",
      ],
      campos: [
        { id: "verdes", rotulo: "Quantas células da coluna IRRF ficaram destacadas?", placeholder: "Número", regra: { tipo: "numero", esperado: F.length - ISENTOS, tolerancia: 0 }, mensagemCerta: "Certo: uma por funcionário com IRRF maior que zero.", mensagemErrada: "Conte só as células com IRRF maior que zero (total de funcionários menos os isentos)." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "O IRRF retido vai para a DCTFWeb e precisa ser recolhido até o dia 20. Ver de relance quem tem retenção ajuda a conferir a guia antes de pagar." }],
    },
    consulta({
      id: "holerite",
      titulo: "Etapa 7 — Holerite por matrícula (PROCV)",
      cenario: "Na aba Holerite, B2 recebe a matrícula. Nas linhas de baixo, traga com PROCV os dados da aba Cadastro: nome (coluna 2), cargo (3), salário (6), INSS (9), IRRF (12), VT (13), líquido (14) e FGTS (15).",
      instrucao: "Escreva a fórmula do salário líquido e responda o que o holerite mostra para as matrículas pedidas.",
      tabelas: [],
      comandos: [{ id: "procv", rotulo: "Sua fórmula do salário líquido no holerite", padrao: /^=\s*(SEERRO\s*\(\s*)?(PROCV|VLOOKUP|PROCX|XLOOKUP)\s*\(\s*\$?B\$?2/i, placeholder: "=SEERRO(PROCV($B$2;Cadastro!$A:$O;14;FALSO);\"MATRÍCULA NÃO ENCONTRADA\")", dica: "PROCV com $B$2, o intervalo do Cadastro, o número da coluna do líquido e FALSO." }],
      resultados: [
        ...[FUNCIONARIOS[4], FUNCIONARIOS[22]].map((f, i) => ({ id: `liquido-${i}`, rotulo: `Salário líquido de ${f.matricula}`, valor: linha(f.matricula).liquido, explicacao: "Coluna Líquido do Cadastro, buscada pela matrícula." })),
        { id: "fgts", rotulo: `FGTS do mês de ${FUNCIONARIOS[9].matricula} (R$)`, valor: linha(FUNCIONARIOS[9].matricula).fgts, explicacao: "Coluna FGTS do Cadastro." },
      ],
    }),
    {
      id: "protecao",
      titulo: "Etapa 8 — Proteger as fórmulas",
      passos: [
        "No Cadastro, selecione as colunas que o DP VAI editar (A até H) > botão direito > Formatar Células > Proteção > desmarque «Bloqueada». Faça o mesmo com a célula B2 do Holerite.",
        "Em cada aba, Revisão > Proteger Planilha. Defina uma senha e entregue à coordenação.",
        "Teste: tente apagar uma fórmula de INSS. O Excel deve recusar. Tente mudar um salário: deve aceitar e recalcular a linha.",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Uma fórmula de IR apagada sem querer faz a folha sair com imposto errado, e o funcionário só descobre no informe de rendimentos. Proteger mantém o cálculo intacto e deixa o cadastro livre para atualização." }],
    },
    dissertativa({
      id: "memorando",
      titulo: "Etapa 9 — Memorando para a coordenação",
      instrucao: "Escreva o memorando que vai junto com a planilha para a Sílvia conferir.",
      deve: [
        "Informe os totais do mês: INSS, IRRF, VT, líquido a pagar e FGTS a depositar, com os seus números.",
        "Explique em linguagem simples por que a maioria está isenta de IR e como o desconto simplificado entra na conta.",
        "Diga onde fica cada tabela e o que precisa ser trocado quando o governo atualizar INSS ou IRRF.",
        "Liste os cuidados para o mês seguinte (cadastro de dependentes, opção de VT, proteção da planilha).",
      ],
      chave: /(inss|irrf|imposto|fgts|l[ií]quido|tabela|dependente|simplificado|vale)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
