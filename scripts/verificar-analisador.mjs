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
