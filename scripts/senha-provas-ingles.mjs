// Gera o hash da senha da aba Provas de Inglês (uma senha para todas as unidades), para a variável SENHA_PROVAS_INGLES.
// Uso: npm run provas-ingles:senha -- 'a-senha-escolhida'
import { randomBytes, scryptSync } from "node:crypto";

const senha = process.argv[2];
if (!senha) {
  console.error("Uso: npm run provas-ingles:senha -- <senha>");
  process.exit(1);
}
if (senha.length < 8) {
  console.error("A senha das provas de Inglês precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}
const sal = randomBytes(16);
const hash = scryptSync(senha, sal, 32);
console.log("Valor da variável SENHA_PROVAS_INGLES (só o hash; a senha em si não fica guardada em lugar nenhum):");
console.log(`scrypt:${sal.toString("hex")}:${hash.toString("hex")}`);
