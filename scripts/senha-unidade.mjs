// Gera o hash da senha da aba Provas de uma unidade, para a variável UNIDADES.
// Uso: npm run unidade:senha -- centro "Unidade Centro" 'senha-da-unidade'
import { randomBytes, scryptSync } from "node:crypto";

const [id, nome, senha] = process.argv.slice(2);
if (!id || !nome || !senha) {
  console.error('Uso: npm run unidade:senha -- <id> "<Nome da unidade>" <senha>');
  process.exit(1);
}
if (!/^[a-z0-9-]{2,30}$/.test(id)) {
  console.error("O id usa só letras minúsculas, números e hífen (2 a 30 caracteres). Ex.: centro, zona-norte.");
  process.exit(1);
}
if (senha.length < 6) {
  console.error("A senha da unidade precisa ter pelo menos 6 caracteres.");
  process.exit(1);
}
const sal = randomBytes(16);
const hash = scryptSync(senha, sal, 32);
const unidade = { id, nome, senha: `scrypt:${sal.toString("hex")}:${hash.toString("hex")}` };
console.log("Acrescente este objeto à lista da variável UNIDADES (cada unidade precisa de uma senha diferente):");
console.log(JSON.stringify(unidade));
