// Gera o hash da senha de um professor para a variável PROFESSORES.
// Uso: npm run professor:senha -- fernando "Fernando Manoel" 'senha-forte'
import { randomBytes, scryptSync } from "node:crypto";

const [usuario, nome, senha] = process.argv.slice(2);
if (!usuario || !nome || !senha) {
  console.error('Uso: npm run professor:senha -- <usuario> "<Nome>" <senha>');
  process.exit(1);
}
if (senha.length < 8) {
  console.error("A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}
const sal = randomBytes(16);
const hash = scryptSync(senha, sal, 32);
const professor = { usuario, nome, senha: `scrypt:${sal.toString("hex")}:${hash.toString("hex")}` };
console.log("Acrescente este objeto à lista da variável PROFESSORES:");
console.log(JSON.stringify(professor));
