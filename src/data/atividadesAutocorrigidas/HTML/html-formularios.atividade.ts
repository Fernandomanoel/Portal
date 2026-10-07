import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Atividade escrita para o portal (sem página de origem no repositório antigo).
const atividade: AtividadeAutocorrigida = {
  titulo: "Formulários em HTML",
  introducao:
    "Cadastros, contatos, pesquisas e compras começam num formulário. Aprenda a montar campos de texto, e-mail, escolha e envio, sempre com os rótulos corretos.",
  itens: [
    {
      id: "partes-do-formulario",
      titulo: "As peças de um formulário",
      blocos: [
        {
          tipo: "texto",
          texto: "Um formulário é uma tag <form> que reúne campos. Cada campo tem um <label> (o rótulo que a pessoa lê) ligado a ele pelo atributo for, que repete o id do campo.",
        },
        {
          tipo: "codigo",
          rotulo: "Formulário de contato",
          conteudo:
            '<form action="#" method="post">\n    <label for="nome">Nome</label>\n    <input type="text" id="nome" name="nome" required>\n\n    <label for="email">E-mail</label>\n    <input type="email" id="email" name="email" required>\n\n    <label for="assunto">Assunto</label>\n    <select id="assunto" name="assunto">\n        <option value="duvida">Dúvida</option>\n        <option value="sugestao">Sugestão</option>\n    </select>\n\n    <label for="mensagem">Mensagem</label>\n    <textarea id="mensagem" name="mensagem" rows="4"></textarea>\n\n    <button type="submit">Enviar</button>\n</form>',
        },
        {
          tipo: "tabela",
          colunas: ["Tag / atributo", "Função"],
          linhas: [
            ["<form>", "Agrupa os campos. action diz para onde enviar; method, como enviar."],
            ["<label for=\"x\">", "Rótulo do campo. Ao clicar nele, o campo com id=\"x\" é selecionado."],
            ["<input type=\"text\">", "Campo de uma linha. Outros tipos: email, password, number, date, checkbox, radio."],
            ["<textarea>", "Campo de texto com várias linhas."],
            ["<select> e <option>", "Lista suspensa para escolher uma opção."],
            ["<button type=\"submit\">", "Botão que envia o formulário."],
            ["required", "Obriga o preenchimento antes de enviar."],
            ["name", "Nome com que o dado viaja ao servidor. Sem ele, o campo não é enviado."],
          ],
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Sem <label> ligado ao campo, quem usa leitor de tela não sabe o que preencher. Sempre use label com for e o mesmo id no campo.",
        },
      ],
    },
    {
      id: "escolhas",
      titulo: "Escolher entre opções",
      blocos: [
        {
          tipo: "codigo",
          rotulo: "Radio (uma opção) e checkbox (várias)",
          conteudo:
            '<p>Como você prefere ser contatado?</p>\n<input type="radio" id="por-email" name="contato" value="email">\n<label for="por-email">E-mail</label>\n<input type="radio" id="por-fone" name="contato" value="fone">\n<label for="por-fone">Telefone</label>\n\n<p>Interesses:</p>\n<input type="checkbox" id="html" name="interesse" value="html">\n<label for="html">HTML</label>\n<input type="checkbox" id="css" name="interesse" value="css">\n<label for="css">CSS</label>',
        },
        {
          tipo: "nota",
          variante: "dica",
          texto: "No radio, todos os botões do mesmo grupo têm o mesmo name (aqui, contato) — é isso que permite escolher só um. No checkbox, cada marcação é independente.",
        },
      ],
    },
    {
      id: "exercicio-inscricao",
      titulo: "Exercício: ficha de inscrição em um curso",
      cenario: "A escola quer uma página de inscrição para o curso de Informática Básica.",
      passos: [
        "Crie a pasta Formularios e o arquivo inscricao.html com a estrutura básica e o título Inscrição — Informática Básica.",
        "Dentro de um <form action=\"#\" method=\"post\">, crie os campos: Nome completo (text, obrigatório), E-mail (email, obrigatório), Data de nascimento (date) e Telefone (tel).",
        "Cada campo deve ter um <label for=\"…\"> ligado a ele por um id único.",
        "Acrescente uma lista suspensa Turno com as opções Manhã, Tarde e Noite.",
        "Acrescente os botões de rádio Já usei computador? com Sim e Não (mesmo name), e as caixas de marcação Quero receber informações por: E-mail e WhatsApp.",
        "Inclua uma caixa de texto (textarea) Por que quer fazer o curso? e o botão Enviar inscrição.",
        "Abra no navegador, tente enviar com o nome vazio (o navegador deve avisar) e clique em cada label para ver o campo ser selecionado.",
      ],
      aviso: "Não use o mesmo id em dois campos: o id precisa ser único na página, senão o label liga ao campo errado.",
      objetivo: "Montar um formulário completo e acessível, com labels, tipos de campo adequados e validação básica.",
      desafio: "Acrescente placeholder=\"Ex.: Maria da Silva\" no campo de nome e um minlength=\"3\" nele.",
    },
    {
      id: "tipos",
      titulo: "Que tipo de campo usar?",
      instrucao: "Escolha o tipo certo de campo para cada dado:",
      campos: [
        {
          id: "tipo-email",
          rotulo: "E-mail do usuário (o navegador confere se tem @).",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "text", texto: "type=\"text\"" },
              { valor: "email", texto: "type=\"email\"" },
              { valor: "number", texto: "type=\"number\"" },
              { valor: "password", texto: "type=\"password\"" },
            ],
            esperado: "email",
          },
          mensagemCerta: "type=\"email\" valida o formato e mostra o teclado certo no celular.",
          mensagemErrada: "Existe um tipo específico para e-mail.",
        },
        {
          id: "tipo-senha",
          rotulo: "Senha (as letras não podem aparecer na tela).",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "text", texto: "type=\"text\"" },
              { valor: "email", texto: "type=\"email\"" },
              { valor: "number", texto: "type=\"number\"" },
              { valor: "password", texto: "type=\"password\"" },
            ],
            esperado: "password",
          },
          mensagemCerta: "password esconde os caracteres com bolinhas.",
          mensagemErrada: "Procure o tipo que esconde o que é digitado.",
        },
        {
          id: "tipo-idade",
          rotulo: "Idade (só aceita números).",
          regra: {
            tipo: "selecao",
            opcoes: [
              { valor: "text", texto: "type=\"text\"" },
              { valor: "email", texto: "type=\"email\"" },
              { valor: "number", texto: "type=\"number\"" },
              { valor: "password", texto: "type=\"password\"" },
            ],
            esperado: "number",
          },
          mensagemCerta: "number só aceita números.",
          mensagemErrada: "Para valores numéricos, existe o tipo number.",
        },
      ],
    },
    {
      id: "pergunta-label",
      titulo: "Como ligar o label ao campo?",
      instrucao: "Qual código liga corretamente o rótulo ao campo?",
      campos: [
        {
          id: "label-certo",
          regra: {
            tipo: "multipla_escolha",
            opcoes: [
              "<label for=\"nome\">Nome</label>  <input type=\"text\" id=\"nome\">",
              "<label id=\"nome\">Nome</label>  <input type=\"text\" for=\"nome\">",
              "<label>Nome</label>  <input type=\"text\">",
              "<label for=\"nome\">Nome</label>  <input type=\"text\" id=\"sobrenome\">",
            ],
            correta: 0,
          },
          mensagemCerta: "O for do label é igual ao id do campo.",
          mensagemErrada: "O for (do label) precisa ser igual ao id (do campo).",
        },
      ],
    },
    {
      id: "escreva-campo",
      titulo: "Escreva um campo",
      instrucao: "Escreva o código de um campo de e-mail obrigatório, com id=\"email\" e name=\"email\".",
      campos: [
        {
          id: "meu-campo",
          placeholder: "<input …>",
          regra: {
            tipo: "padrao",
            padrao: /^(?=.*<input\s)(?=.*type\s*=\s*["']email["'])(?=.*id\s*=\s*["']email["'])(?=.*name\s*=\s*["']email["'])(?=.*\brequired\b).*$/is,
          },
          mensagemCerta: "Campo de e-mail completo!",
          mensagemErrada: "Faltou algo: <input type=\"email\" id=\"email\" name=\"email\" required>.",
        },
      ],
    },
  ],
};

export default atividade;
