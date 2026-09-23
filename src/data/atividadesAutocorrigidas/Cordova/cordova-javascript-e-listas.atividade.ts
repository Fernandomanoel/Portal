import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Ionic — Prática de JavaScript",
  introducao:
    "Eventos, arrays e listas dinâmicas: seu app ganha vida de verdade. Sua tela já existe (campo, botão, lista vazia, busca, toggle). Hoje tudo isso ganha lógica: cliques que funcionam, uma lista que aparece e desaparece de verdade, busca que filtra, ordenação, marcar como concluída. Tudo em www/js/index.js. Pré-requisito: Ionic — Prática de Componentes.",
  itens: [
    {
      id: "pegando-elementos",
      titulo: "Pegando os Elementos da Tela",
      instrucao:
        "Crie (ou abra) o arquivo www/js/index.js e confira que ele está carregado no fim do <body> com <script src=\"js/index.js\"></script>. Cole no topo do arquivo:",
      codigo: {
        conteudo: `const campoMissao = document.getElementById('campo-missao');
const botaoAdicionar = document.getElementById('btn-adicionar');
const listaNaTela = document.getElementById('lista-missoes');
const campoBusca = document.getElementById('busca-missao');`,
      },
      aviso:
        "confira que os 4 id aqui batem exatamente com os do seu index.html. Se algum estiver diferente, o resto do código vai falhar em silêncio.",
    },
    {
      id: "array-de-missoes",
      titulo: "O Array de Missões",
      codigo: {
        conteudo: `let missoes = [];

// exemplo de item dentro do array
{ texto: "Arrumar o quarto", feita: false }`,
      },
      instrucao: "Cada missão vai ser um objeto com dois dados: o texto e se está concluída.",
    },
    {
      id: "clique-botao-adicionar",
      titulo: "Clique no Botão Adicionar",
      codigo: {
        conteudo: `botaoAdicionar.addEventListener('click', () => {
  const texto = campoMissao.value;
  if (texto.trim() !== "") {
    missoes.push({ texto: texto, feita: false });
    desenharLista();
    campoMissao.value = "";
  }
});`,
      },
      instrucao:
        ".trim() remove espaços em branco do início e fim — evita adicionar uma missão \"vazia\" só com espaços digitados. desenharLista() ainda não existe — próximo item.",
    },
    {
      id: "desenhando-lista",
      titulo: "Desenhando a Lista na Tela",
      codigo: {
        conteudo: `function desenharLista() {
  listaNaTela.innerHTML = "";
  missoes.forEach((missao, indice) => {
    const estilo = missao.feita ? "text-decoration:line-through;color:#999" : "";
    listaNaTela.innerHTML += \`
      <ion-item>
        <ion-label style="\${estilo}">\${missao.texto}</ion-label>
      </ion-item>
    \`;
  });
}`,
      },
      desafio: "salve, rode cordova run browser, digite 3 missões diferentes e clique em adicionar em cada uma. Elas devem aparecer na lista.",
    },
    {
      id: "botao-excluir",
      titulo: "Botão de Excluir",
      instrucao: "Atualize desenharLista() e adicione excluirMissao():",
      codigo: {
        conteudo: `function desenharLista() {
  listaNaTela.innerHTML = "";
  missoes.forEach((missao, indice) => {
    const estilo = missao.feita ? "text-decoration:line-through;color:#999" : "";
    listaNaTela.innerHTML += \`
      <ion-item>
        <ion-label style="\${estilo}">\${missao.texto}</ion-label>
        <ion-button slot="end" color="danger" fill="clear" onclick="excluirMissao(\${indice})">
          <ion-icon name="trash" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-item>
    \`;
  });
}

function excluirMissao(indice) {
  missoes.splice(indice, 1);
  desenharLista();
}`,
      },
      desafio: "adicione 4 missões e exclua a 2ª. Confira que sobraram as outras 3, na ordem certa.",
    },
    {
      id: "marcar-concluida",
      titulo: "Marcar como Concluída (clique no texto)",
      instrucao: "Adicione o onclick no ion-label e a função:",
      codigo: {
        conteudo: `<ion-label style="\${estilo}" onclick="alternarFeita(\${indice})">\${missao.texto}</ion-label>

function alternarFeita(indice) {
  missoes[indice].feita = !missoes[indice].feita;
  desenharLista();
}`,
      },
      objetivo:
        "!missoes[indice].feita inverte o valor: se era true vira false, e vice-versa. Clique no texto de uma missão — ela deve ficar riscada e cinza.",
    },
    {
      id: "adicionar-enter",
      titulo: "Adicionar Apertando Enter",
      codigo: {
        conteudo: `campoMissao.addEventListener('keyup', (evento) => {
  if (evento.key === 'Enter') {
    botaoAdicionar.click(); // simula um clique no botão
  }
});`,
      },
      instrucao:
        "keyup dispara toda vez que uma tecla é solta. evento.key diz qual tecla foi — comparando com 'Enter', a gente reage só a ela. botaoAdicionar.click() é um truque útil: em vez de repetir a lógica de adicionar, a gente só \"aperta o botão\" via código.",
    },
    {
      id: "contador-missoes",
      titulo: "Contador de Missões",
      instrucao: "Adicione um <p id=\"contador\"> no HTML, acima da lista, e dentro de desenharLista():",
      codigo: {
        conteudo: `const pendentes = missoes.filter(m => !m.feita).length;
document.getElementById('contador').innerText = \`\${pendentes} pendente(s) de \${missoes.length} no total\`;`,
      },
      objetivo: "filter() cria um novo array só com os itens que passam no teste — aqui, só as missões não concluídas (!m.feita). .length conta quantas sobraram.",
    },
    {
      id: "busca-tempo-real",
      titulo: "Busca em Tempo Real",
      codigo: {
        conteudo: `campoBusca.addEventListener('ionInput', (evento) => {
  const termo = evento.target.value.toLowerCase();
  const filtradas = missoes.filter(m => m.texto.toLowerCase().includes(termo));
  desenharListaFiltrada(filtradas);
});

function desenharListaFiltrada(lista) {
  listaNaTela.innerHTML = "";
  lista.forEach((missao) => {
    listaNaTela.innerHTML += \`<ion-item><ion-label>\${missao.texto}</ion-label></ion-item>\`;
  });
}`,
      },
      aviso:
        "componentes do Ionic disparam eventos com nomes próprios, começando com ion — ionInput em vez do input comum, ionChange em vez de change. É a única diferença de sintaxe ao lidar com eles.",
      objetivo: "toLowerCase() em ambos os lados (o termo buscado e o texto da missão) faz a busca não se importar com maiúsculas/minúsculas. includes() verifica se um texto está contido dentro do outro.",
    },
    {
      id: "ordenando-lista",
      titulo: "Ordenando a Lista",
      instrucao: "Adicione um botão \"Ordenar A-Z\" no HTML com id=\"btn-ordenar\":",
      codigo: {
        conteudo: `document.getElementById('btn-ordenar').addEventListener('click', () => {
  missoes.sort((a, b) => a.texto.localeCompare(b.texto));
  desenharLista();
});`,
      },
      objetivo:
        "sort() reordena o array no lugar. localeCompare() compara dois textos respeitando acentos e o alfabeto em português — melhor que uma comparação simples de </>, que trataria \"Á\" de forma estranha.",
    },
    {
      id: "toggle-modo-escuro",
      titulo: "Ligando o Toggle de Modo Escuro",
      codigo: {
        conteudo: `document.getElementById('toggle-tema').addEventListener('ionChange', (evento) => {
  document.body.style.background = evento.target.checked ? "#1a1a2e" : "#ffffff";
  document.body.style.color = evento.target.checked ? "#eee" : "#333";
});`,
      },
      objetivo: "evento.target.checked é true quando o toggle está ligado. Com uma linha, você troca o fundo e a cor do texto de todo o app — um mini modo escuro de verdade.",
    },
    {
      id: "confirmacao-excluir",
      titulo: "Confirmação Antes de Excluir",
      instrucao: "Atualize excluirMissao():",
      codigo: {
        conteudo: `function excluirMissao(indice) {
  const confirmou = confirm("Excluir esta missão?");
  if (confirmou) {
    missoes.splice(indice, 1);
    desenharLista();
  }
}`,
      },
      objetivo: "confirm() abre uma janelinha pronta do navegador com OK/Cancelar. O código só continua se a pessoa clicar em OK.",
    },
    {
      id: "modo-detetive-3-erros",
      titulo: "Modo Detetive: 3 Erros de Propósito",
      instrucao: "Provoque cada um destes 3 erros de propósito no seu código, veja o que acontece, e desfaça (Ctrl+Z):",
      tabelaReferencia: {
        colunas: ["Erro", "O que acontece"],
        linhas: [
          [
            "missoes.push(texto); // guardando só o texto, sem { texto, feita }",
            "O app não quebra, mas missao.feita vira undefined em todo lugar, e missao.texto também — porque missao agora É o texto, não um objeto. Na tela aparece undefined em vez do texto digitado.",
          ],
          [
            "missoes.splice(missoes.length, 1); // tenta remover uma posição que não existe",
            "Não dá erro no Console, mas também não remove nada — splice simplesmente não encontra nada para tirar naquela posição.",
          ],
          [
            "botaoAdicionar.addEventListener('click', desenharLista()); // chamou a função em vez de passar ela",
            "Os parênteses depois de desenharLista fazem ela rodar na hora, uma vez só, em vez de esperar o clique. O jeito certo é () => { desenharLista(); } ou só desenharLista sem parênteses.",
          ],
        ],
      },
    },
    {
      id: "checklist-final",
      titulo: "Checklist Final",
      tabelaReferencia: {
        colunas: ["Checklist final"],
        linhas: [
          ["Adicionar missão funciona pelo botão e pela tecla Enter"],
          ["Excluir missão pede confirmação antes de remover"],
          ["Clicar no texto de uma missão risca ela (marca como concluída)"],
          ["O contador mostra o número certo de pendentes"],
          ["A busca filtra a lista em tempo real"],
          ["O botão de ordenar organiza a lista em ordem alfabética"],
          ["O toggle de modo escuro muda o fundo do app"],
        ],
      },
      objetivo:
        "Seu app já reage a tudo — falta só uma coisa: ele esquece tudo quando você fecha a aba. A próxima atividade resolve isso com localStorage, e te leva para ver o app rodando dentro de um celular Android de verdade (simulado).",
    },
  ],
};

export default atividade;
