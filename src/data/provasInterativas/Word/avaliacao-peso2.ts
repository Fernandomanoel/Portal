import type { ProvaInterativa } from "@/types/quiz";

const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Word — Prova Prática: Funcionalidades e Mala Direta",
  instrucoes: [
    "Passo 1 (Criação e Formatação): Crie um documento novo e digite o parágrafo: 'A tecnologia tem transformado a educação de diversas maneiras. Ela facilita o acesso a informações, promove a interatividade e personaliza o aprendizado. Com o uso de ferramentas tecnológicas, os alunos podem aprender de forma mais dinâmica e eficiente.'",
    "Passo 2: Aplique a seguinte formatação ao texto digitado: fonte Arial, tamanho 12, cor azul.",
    "Passo 3 (Imagens): Insira uma imagem sobre 'educação e tecnologia', redimensione-a para 5 cm de largura e aplique uma borda preta de 1 pt.",
    "Passo 4 (Tabelas): Insira uma tabela com 3 colunas e 4 linhas. O cabeçalho deve ser Nome, Nota 1 e Nota 2. Preencha com os dados: João Silva (8.5 e 9.0), Maria Lima (7.0 e 8.5), Pedro Souza (9.0 e 9.5) e Ana Costa (6.0 e 7.5).",
    "Passo 5: Formate a tabela aplicando uma cor de fundo cinza claro e bordas pretas nas células.",
    "Passo 6 (Estilos e Sumário): Crie três títulos no documento (Introdução, Desenvolvimento, Conclusão) usando os estilos de título nativos do Word. Aplique o estilo 'Normal' ao resto dos parágrafos.",
    "Passo 7: Insira um sumário automático baseado nos títulos criados no passo anterior.",
    "Passo 8 (Mala Direta - Excel): Crie uma lista de destinatários no Excel com as colunas Nome, Endereço, Cidade e CEP. Preencha com os dados dos alunos (ex: João Silva, Rua A, 123, São Paulo, 01000-000) e guarde a folha de cálculo.",
    "Passo 9 (Mala Direta - Word): Utilize a funcionalidade de mala direta no Word para criar cartas, inserindo os campos de mesclagem (Nome, Endereço, Cidade, CEP) no documento.",
    "Passo 10 (Envio): Guarde todas as alterações. Comprima o Word e o Excel num ficheiro .zip (ou envie apenas o Word finalizado) no campo abaixo."
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".docx", ".doc", ".zip"],
    rotulo: "Envie os seus ficheiros (Word e/ou ficheiro .zip)"
  }
};

export default prova;