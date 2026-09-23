import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Ionic — Projeto Final",
  introducao:
    "Desafios práticos, código de referência completo e a entrega. Seu app já faz tudo: adiciona, exclui, marca como feita, busca, ordena, salva no localStorage e roda no emulador. Hoje é resolver desafios que faltam, escolher pelo menos 4, e fechar o projeto com um código de referência completo. Pré-requisito: as 3 atividades anteriores.",
  itens: [
    {
      id: "estrutura-final-pasta",
      titulo: "Estrutura Final da Pasta",
      codigo: {
        conteudo: `meu-app/www/
├── index.html      # header, card, searchbar, input, botão, lista, footer
├── css/
│   └── index.css   # suas cores e ajustes visuais
└── js/
    └── index.js    # eventos, array, localStorage, filtro, ordenação`,
      },
    },
    {
      id: "desafio-tema-de-cores",
      titulo: "Desafio: Tema de Cores (fácil)",
      codigo: {
        conteudo: `ion-toolbar {
  --background: #ff6b9d; /* escolha a sua cor */
  --color: #ffffff;
}
ion-card {
  border-radius: 16px;
}`,
      },
    },
    {
      id: "desafio-renomeie-app",
      titulo: "Desafio: Renomeie o App (fácil)",
      instrucao: "Troque \"Minhas Missões\" por outro tema — os nomes de variável no JS podem continuar iguais por dentro:",
      tabelaReferencia: {
        colunas: ["Tema", "Ícone sugerido"],
        linhas: [
          ["\"Minha Lista de Leitura\"", "book"],
          ["\"Filmes Pra Assistir\"", "film"],
          ["\"Jogos Pra Zerar\"", "game-controller"],
        ],
      },
      objetivo: "Troque o <ion-title>, o name=\"add-circle\" do ícone do botão, e o placeholder do campo de texto para combinar com o novo tema.",
    },
    {
      id: "desafio-badge-contador-dinamico",
      titulo: "Desafio: Badge com Contador Dinâmico (médio)",
      instrucao: "No index.html, dentro do <ion-toolbar>, depois do <ion-title>; e no index.js, dentro de desenharLista():",
      codigo: {
        conteudo: `<!-- www/index.html -->
<ion-badge id="badge-pendentes" slot="end" color="danger">0</ion-badge>

// www/js/index.js — dentro de desenharLista()
const pendentes = missoes.filter(m => !m.feita).length;
document.getElementById('badge-pendentes').innerText = pendentes;`,
      },
    },
    {
      id: "desafio-editar-missao",
      titulo: "Desafio: Editar uma Missão Existente (médio)",
      instrucao: "Adicione um botão de edição antes do de excluir, no template de desenharLista(), e a nova função:",
      codigo: {
        conteudo: `<ion-button slot="end" color="primary" fill="clear" onclick="editarMissao(\${indice})">
  <ion-icon name="pencil" slot="icon-only"></ion-icon>
</ion-button>

function editarMissao(indice) {
  const novoTexto = prompt("Editar missão:", missoes[indice].texto);
  if (novoTexto !== null && novoTexto.trim() !== "") {
    missoes[indice].texto = novoTexto;
    desenharLista();
  }
}`,
      },
      objetivo:
        "prompt(mensagem, valorInicial) abre uma caixa de texto pronta do navegador, já preenchida com o texto atual. Se a pessoa cancelar, novoTexto vira null — por isso o if confere isso antes de salvar.",
    },
    {
      id: "desafio-ordenar-pendentes-primeiro",
      titulo: "Desafio: Ordenar Pendentes Primeiro (médio)",
      codigo: {
        conteudo: `function ordenarPorStatus() {
  missoes.sort((a, b) => a.feita - b.feita); // false (0) vem antes de true (1)
  desenharLista();
}`,
      },
      objetivo: "Truque de JavaScript: false - true vira 0 - 1 = -1, e sort usa esse número negativo/positivo para decidir a ordem. Pendentes (false) sobem para o topo.",
    },
    {
      id: "desafio-animacao-ao-adicionar",
      titulo: "Desafio: Animação ao Adicionar (difícil)",
      codigo: {
        conteudo: `@keyframes entrarSuave {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
ion-item {
  animation: entrarSuave 0.3s ease;
}`,
      },
      objetivo: "Todo <ion-item> novo (inclusive quando a lista inteira é redesenhada) entra com um pequeno deslize suave em vez de aparecer seco.",
    },
    {
      id: "desafio-limpar-concluidas",
      titulo: "Desafio: Limpar Todas as Concluídas (difícil)",
      instrucao: "Adicione um botão com id=\"btn-limpar\":",
      codigo: {
        conteudo: `document.getElementById('btn-limpar').addEventListener('click', () => {
  const confirmou = confirm("Remover todas as missões já concluídas?");
  if (confirmou) {
    missoes = missoes.filter(m => !m.feita); // mantém só as NÃO concluídas
    desenharLista();
  }
});`,
      },
      objetivo: "filter() aqui reconstrói o array inteiro, mantendo só quem passa no teste (!m.feita) — as concluídas simplesmente não entram no novo array.",
    },
    {
      id: "codigo-de-referencia-completo",
      titulo: "Código de Referência Completo",
      instrucao: "Se quiser conferir seu projeto contra uma versão de referência (com os desafios fáceis e médios já aplicados):",
      codigo: {
        conteudo: `const campoMissao = document.getElementById('campo-missao');
const botaoAdicionar = document.getElementById('btn-adicionar');
const listaNaTela = document.getElementById('lista-missoes');

let missoes = JSON.parse(localStorage.getItem('minhas_missoes')) || [];

function desenharLista() {
  localStorage.setItem('minhas_missoes', JSON.stringify(missoes));
  const pendentes = missoes.filter(m => !m.feita).length;
  document.getElementById('badge-pendentes').innerText = pendentes;
  listaNaTela.innerHTML = "";
  missoes.forEach((missao, indice) => {
    const estilo = missao.feita ? "text-decoration:line-through;color:#999" : "";
    listaNaTela.innerHTML += \`
      <ion-item>
        <ion-label style="\${estilo}" onclick="alternarFeita(\${indice})">\${missao.texto}</ion-label>
        <ion-button slot="end" color="primary" fill="clear" onclick="editarMissao(\${indice})">
          <ion-icon name="pencil" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button slot="end" color="danger" fill="clear" onclick="excluirMissao(\${indice})">
          <ion-icon name="trash" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-item>
    \`;
  });
}

botaoAdicionar.addEventListener('click', () => {
  const texto = campoMissao.value;
  if (texto.trim() !== "") {
    missoes.push({ texto: texto, feita: false });
    desenharLista();
    campoMissao.value = "";
  }
});

function alternarFeita(indice) {
  missoes[indice].feita = !missoes[indice].feita;
  desenharLista();
}

function editarMissao(indice) {
  const novoTexto = prompt("Editar missão:", missoes[indice].texto);
  if (novoTexto !== null && novoTexto.trim() !== "") {
    missoes[indice].texto = novoTexto;
    desenharLista();
  }
}

function excluirMissao(indice) {
  const confirmou = confirm("Excluir esta missão?");
  if (confirmou) {
    missoes.splice(indice, 1);
    desenharLista();
  }
}

desenharLista(); // desenha a lista salva assim que o app abre`,
      },
    },
    {
      id: "testando-tudo-junto",
      titulo: "Testando Tudo Junto",
      instrucao: "Rode cordova run browser e passe por todo o fluxo, do início ao fim:",
      passos: [
        "Adicione 5 missões diferentes.",
        "Marque 2 como concluídas.",
        "Edite o texto de 1.",
        "Exclua 1.",
        "Recarregue a página — as outras 3 devem continuar exatamente como estavam.",
        "Rode cordova run android e repita o teste dentro do celular virtual.",
      ],
    },
    {
      id: "preparando-apresentar",
      titulo: "Preparando para Apresentar",
      instrucao: "Separe, para mostrar seu projeto:",
      passos: [
        "O app aberto no navegador (cordova run browser).",
        "O app aberto no celular virtual (cordova run android), com pelo menos 3 missões cadastradas.",
        "Uma frase curta explicando o que cada parte faz — treine dizer em voz alta, é a melhor forma de fixar o que você aprendeu.",
      ],
    },
    {
      id: "checklist-final-do-curso",
      titulo: "Checklist Final do Curso",
      tabelaReferencia: {
        colunas: ["Checklist final"],
        linhas: [
          ["Cabeçalho, campo, botão, lista, busca e rodapé, todos personalizados"],
          ["Adicionar, excluir, editar e marcar como concluída funcionando"],
          ["Busca e ordenação funcionando"],
          ["Dados salvos com localStorage, sobrevivendo a fechar e abrir o app"],
          ["App rodando de verdade dentro do celular virtual Android"],
          ["Pelo menos 4 desafios desta atividade resolvidos"],
        ],
      },
      objetivo:
        "Você concluiu o curso! Em poucas aulas você foi de \"nunca abri o Ionic\" a um aplicativo funcional completo — com lógica própria, memória permanente, e rodando de verdade num Android simulado. Guarde este projeto: ele é a prova de que você consegue.",
    },
  ],
};

export default atividade;
