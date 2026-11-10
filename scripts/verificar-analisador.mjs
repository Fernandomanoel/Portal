// Confere a calculadora do Analisador de contratos: node scripts/verificar-analisador.mjs
import assert from "node:assert/strict";

import { analisarContrato, mensagemParaResponsavel } from "../src/lib/analisadorContratos.ts";

const base = { nome: " Ana ", parcelasPagas: 0, moduloAtual: 0, totalModulos: 6, faltas: 0 };
const analisar = (mudancas) => {
  const resultado = analisarContrato({ ...base, ...mudancas });
  assert.equal(resultado.valido, true);
  return resultado.analise;
};

// 8 parcelas = 4 módulos; no módulo 2 com 5 faltas: atrasado e com faltas.
const pendente = analisar({ parcelasPagas: 8, moduloAtual: 2, faltas: 5 });
assert.equal(pendente.situacao, "PENDENTE");
assert.equal(pendente.modulosCorrespondentes, 4);
assert.equal(pendente.diferencaModulos, 2);
assert.equal(pendente.semanasReposicao, 3); // 5 ÷ 2 = 2,5, para cima
assert.equal(pendente.mensalidadesAdicionais, 1); // 2,5 ÷ 4 = 0,625, para cima
assert.equal(pendente.valorReposicoes, 100);
assert.equal(pendente.nome, "Ana");

assert.equal(analisar({ parcelasPagas: 4, moduloAtual: 2 }).situacao, "REGULAR");
assert.equal(analisar({ parcelasPagas: 4, moduloAtual: 3 }).diferencaModulos, 0);
assert.equal(analisar({ parcelasPagas: 4, moduloAtual: 2, faltas: 1 }).situacao, "ATENÇÃO");
assert.equal(analisar({ parcelasPagas: 6, moduloAtual: 2 }).situacao, "ATENÇÃO");
assert.equal(analisar({ faltas: 9 }).mensalidadesAdicionais, 2); // 4,5 semanas ÷ 4

const invalido = analisarContrato({ ...base, faltas: -1, parcelasPagas: -2 });
assert.equal(invalido.valido, false);
assert.equal(invalido.erros.length, 2);

const mensagem = mensagemParaResponsavel(pendente);
assert.match(mensagem, /^Olá, Ana\./);
assert.match(mensagem, /R\$\s100,00/);
assert.match(mensagemParaResponsavel(analisar({ nome: "" })), /^Olá, \[NOME\]\./);

console.log("Analisador de contratos: tudo certo.");

// ---------- Pós-prova: os mesmos casos dos testes do sistema original ----------
const { extrairProvas, relatorioPosProva } = await import("../src/lib/posProva.ts");
const prova = (materia, nota, notaExibicao) => ({ materia, nota, notaExibicao });

assert.deepEqual(extrairProvas("Módulo: Power BiProva: 10,0Aluno realizou a prova corretamente. Parabéns!"), [prova("Power Bi", 10, "10,0")]);
assert.deepEqual(extrairProvas("Módulo: Excel Avançado IIProva: 10                       Livro: PendenteA aluna conseguiu..."), [
  prova("Excel Avançado II", 10, "10"),
]);
assert.deepEqual(extrairProvas("Módulo: Excel avançado IProva:7,0Módulo: Excel Avançado IIProva: 7,5Aluna teve dificuldades..."), [
  prova("Excel avançado I", 7, "7,0"),
  prova("Excel Avançado II", 7.5, "7,5"),
]);
assert.deepEqual(extrairProvas("Prova Realizada!Módulo:Windows 11Nota: 8,0Livro: PendenteO aluno foi bem na prova..."), [prova("Windows 11", 8, "8,0")]);
assert.deepEqual(extrairProvas("Excel Avançado Inota: 8,5book: 10,0média:9,2APROVADOobs: Aluno e excelente..."), [prova("Excel Avançado I", 8.5, "8,5")]);
assert.deepEqual(extrairProvas("Windows 11nota: 9,0book: pendenteAPROVADO"), [prova("Windows 11", 9, "9,0")]);
assert.deepEqual(extrairProvas("Google ADSNota: 10,0APROVADAobs: Exímia de aluna, fez uma prova perfeita!"), [prova("Google ADS", 10, "10,0")]);
assert.deepEqual(extrairProvas(null), []);
assert.deepEqual(extrairProvas("   "), []);
assert.deepEqual(extrairProvas("Módulo: Power BiLivro: PendenteAluno fez a prova"), [prova("Power Bi", null, null)]);
assert.deepEqual(extrairProvas("nota: 7,0"), [prova(null, 7, "7,0")]);
assert.deepEqual(extrairProvas("MÓDULO: WordPROVA: 6"), [prova("Word", 6, "6")]);

const historico = relatorioPosProva([
  ["Histórico de Contratos"],
  [],
  ["Contrato", "Aluno", "OCORRÊNCIA", "Descrição"],
  [1, "Ana", "Pós prova", "Módulo: WordProva: 9,0"],
  [1, "Ana", "Falta", "Faltou"],
  [2, "Bia", "pos  prova", "nota: 7"],
  [1, "Ana", "Pós Prova", "Módulo: ExcelProva: 8"],
  [3, null, "Pós prova", "nota: 5"],
]);
assert.equal(historico.totalOcorrencias, 3);
assert.deepEqual(historico.alunos.map((a) => [a.nome, a.provas.length]), [["Ana", 2], ["Bia", 1]]);
assert.throws(() => relatorioPosProva([["Aluno", "Descrição"]]), /faltam as colunas "Ocorrência"/);
assert.throws(() => relatorioPosProva([["Aluno", "Ocorrência", "Descrição"], ["Ana", "Falta", "x"]]), /Nenhuma linha/);

// ---------- Pacotes ----------
const { calcularPacotes, classificarGrupo, feriadosSemAula, lerLinhasPacotes, normalizarDias, statusDoPacote } = await import("../src/lib/analisadorPacotes.ts");

assert.deepEqual(statusDoPacote(5, 5), { status: "Em dia", diferenca: 0 });
assert.deepEqual(statusDoPacote(4, 5), { status: "Em dia", diferenca: 1 });
assert.deepEqual(statusDoPacote(3, 5), { status: "Atrasado", diferenca: 2 });
assert.deepEqual(statusDoPacote(6, 5), { status: "Adiantado", diferenca: -1 });

assert.deepEqual(normalizarDias("Quarta-Feira,Segunda-Feira, quarta feira ,Domingo"), { dias: ["QUARTA", "SEGUNDA"], desconhecidos: ["Domingo"] });
assert.equal(classificarGrupo(["SEGUNDA"]), "seg_qua");
assert.equal(classificarGrupo(["TERCA", "QUINTA"]), "ter_qui");
assert.equal(classificarGrupo(["SEGUNDA", "TERCA"]), null);
assert.equal(classificarGrupo([]), null);

// Páscoa de 2026 é 5 de abril; de 2025, 20 de abril.
assert.ok(feriadosSemAula(2026).some((f) => f.data === "2026-04-03" && f.nome === "Sexta-feira Santa"));
assert.ok(feriadosSemAula(2025).some((f) => f.data === "2025-04-18"));
assert.equal(feriadosSemAula(2026).length, 11);

const linhas = lerLinhasPacotes([
  [" Educador", "ALUNO", "Qtd Aula Realizada", "Qtd Agendamento", "Dias Agendamento"],
  ["Rey", "Ana", 4, 4, "Segunda-Feira,Quarta-Feira"],
  ["Rey", "Bia", "2", "2", "Sábado"],
  ["Rey", "Caio", 0, 3, "Terça-Feira,Quinta-Feira"],
  ["Rey", "Davi", 1, 2, "Segunda-Feira,Terça-Feira"],
  ["Rey", "Eva", 1, null, "Domingo"],
  [null, null, 9, 9, "Sábado"],
]);
assert.equal(linhas.length, 5);

// Novembro de 2026: segundas 2 (Finados), 9, 16, 23, 30 = 4 úteis; quartas 4, 11, 18, 25 = 4; sábados 7, 14, 21, 28 = 4.
const relatorio = calcularPacotes(linhas, "2026-11-15");
assert.deepEqual(relatorio.feriados.map((f) => f.data), ["2026-11-02", "2026-11-15", "2026-11-20"]);
const [ana] = relatorio.grupos.seg_qua;
assert.equal(ana.totalPrevistoMes, 16); // 2 aulas por dia × 8 dias
assert.equal(ana.previstoAteHoje, 8); // 16 × 15/30
assert.equal(ana.status, "Atrasado");
assert.equal(ana.diferenca, 4);
const [bia] = relatorio.grupos.sabado;
assert.equal(bia.totalPrevistoMes, 8);
assert.equal(bia.previstoAteHoje, 4);
assert.equal(relatorio.grupos.ter_qui[0].status, null); // 3 não divide por 2 dias
assert.match(relatorio.grupos.ter_qui[0].aviso, /não é divisível/);
assert.deepEqual(relatorio.naoAgrupados.map((a) => a.nome), ["Davi", "Eva"]);
assert.match(relatorio.naoAgrupados[0].aviso, /Combinação de dias/);
assert.match(relatorio.naoAgrupados[1].aviso, /não reconhecido.*vazios.*ausente/);
assert.equal(relatorio.avisos.length, 3);
assert.equal(relatorio.totalAlunos, 5);
assert.throws(() => lerLinhasPacotes([["Aluno", "Educador"]]), /faltam as colunas "Qtd Aula Realizada", "Qtd Agendamento", "Dias Agendamento"/);

console.log("Pós-prova e Pacotes: tudo certo.");
