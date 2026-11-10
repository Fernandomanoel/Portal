// Gera o hash da senha de um professor para a variável PROFESSORES.
// Uso: npm run professor:senha -- fernando "Fernando Manoel" 'senha-forte' centro [--admin]
// O último argumento é o id da unidade do professor (ou * para a coordenação, que vê todas).
import { randomBytes, scryptSync } from "node:crypto";

const argumentos = process.argv.slice(2);
const administrador = argumentos.includes("--admin");
const [usuario, nome, senha, unidade] = argumentos.filter((a) => a !== "--admin");
if (!usuario || !nome || !senha || !unidade) {
  console.error('Uso: npm run professor:senha -- <usuario> "<Nome>" <senha> <id-da-unidade | *>');
  process.exit(1);
}
if (senha.length < 8) {
  console.error("A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}
const sal = randomBytes(16);
const hash = scryptSync(senha, sal, 32);
// --admin: este professor pode criar usuários na tela «Usuários» (não muda mais nada no acesso dele).
const professor = { usuario, nome, unidade, senha: `scrypt:${sal.toString("hex")}:${hash.toString("hex")}`, ...(administrador ? { administrador: true } : {}) };
console.log("Acrescente este objeto à lista da variável PROFESSORES:");
console.log(JSON.stringify(professor));
