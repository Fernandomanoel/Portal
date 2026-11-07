// Gera o hash da senha da aba Provas de uma unidade, para a variável UNIDADES.
// Uso: npm run unidade:senha -- centro "Unidade Centro" 'senha-da-unidade' [--lembrete]
import { randomBytes, scryptSync } from "node:crypto";

const argumentos = process.argv.slice(2);
const lembrar = argumentos.includes("--lembrete");
const [id, nome, senha] = argumentos.filter((a) => a !== "--lembrete");
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
// Com --lembrete, a senha também vai em texto no objeto: a área do professor a mostra para quem esquecer.
const unidade = { id, nome, senha: `scrypt:${sal.toString("hex")}:${hash.toString("hex")}`, ...(lembrar ? { lembrete: senha } : {}) };
console.log("Acrescente este objeto à lista da variável UNIDADES (o id e o nome aparecem na lista de unidades da aba Provas):");
console.log(JSON.stringify(unidade));
