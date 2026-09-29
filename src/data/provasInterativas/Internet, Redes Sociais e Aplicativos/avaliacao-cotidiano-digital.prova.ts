import type { ProvaInterativa } from "@/types/quiz";

/** Formatada a partir de "Avaliação Prática – Internet, Redes Sociais e Aplicativos" (PDF do portal antigo, versão 2): mesmos 5 passos e pontuação. */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Internet, Redes Sociais e Aplicativos — Avaliação Prática: Cotidiano Digital",
  instrucoes: [
    "Reúna tudo em um único documento do Word chamado Cotidiano_SeuNome.docx, com uma seção para cada passo. Cada passo vale 2,0 pontos.",
    "Passo 1 (Pesquisa na internet · 2,0 pontos): Pesquise \"Benefícios da Internet no cotidiano\" e escreva um parágrafo de 4 a 5 linhas com o que encontrou.",
    "Passo 2 (YouTube · 2,0 pontos): Pesquise no YouTube o vídeo \"Dicas para usar o WhatsApp com segurança\". Copie o link do vídeo e escreva 2 dicas que você aprendeu com ele.",
    "Passo 3 (Canva · 2,0 pontos): No Canva, crie um cartaz motivacional e insira a imagem dele no documento.",
    "Passo 4 (Aplicativos do celular · 2,0 pontos): Liste 3 aplicativos do seu celular e escreva uma frase dizendo para que cada um serve.",
    "Passo 5 (Segurança digital · 2,0 pontos): Escreva um pequeno texto respondendo: por que usar senhas seguras? Quais cuidados ter com links recebidos no WhatsApp?",
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc"],
    rotulo: "Envie o documento do Word com os 5 passos",
  },
};

export default prova;
