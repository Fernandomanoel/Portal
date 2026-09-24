import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Ionic — Prática de Componentes",
  introducao:
    "Só código e mão na massa: seu app já tem cabeçalho e um cartão. Hoje é só prática: 14 componentes do Ionic, um atrás do outro, cada um com código pronto para copiar dentro do seu <ion-content> e um mini-desafio para fazer sozinha. No final, você monta tudo junto na tela completa do \"Minhas Missões\". Pré-requisito: Ionic e Cordova — Primeiros Passos.",
  itens: [
    {
      id: "lembrete-cores",
      titulo: "O Plano de Hoje",
      cenario: "Lembrete rápido das cores do Ionic, usadas em quase todo componente de hoje:",
      tabelaReferencia: {
        colunas: ["Cor"],
        linhas: [["primary"], ["secondary"], ["tertiary"], ["success"], ["warning"], ["danger"], ["medium"], ["dark"]],
      },
    },
    {
      id: "ion-input",
      titulo: "ion-input — Campo de Texto",
      codigo: {
        conteudo: `<ion-item>
  <ion-label position="floating">Nova missão</ion-label>
  <ion-input id="campo-missao" placeholder="Ex: Arrumar o quarto"></ion-input>
</ion-item>`,
      },
      desafio: "cole dentro do <ion-content>, salve, recarregue. Clique no campo e veja o rótulo \"flutuar\" para cima.",
    },
    {
      id: "ion-button-icon",
      titulo: "ion-button + ion-icon — 4 Variações",
      instrucao: "Código — teste as 4:",
      codigo: {
        conteudo: `<ion-button expand="block" color="success">
  <ion-icon slot="start" name="add-circle"></ion-icon>
  Botão largo
</ion-button>
<ion-button fill="outline" color="primary">Contorno</ion-button>
<ion-button fill="clear" color="danger">Transparente</ion-button>
<ion-button shape="round" color="tertiary">
  <ion-icon slot="icon-only" name="heart"></ion-icon>
</ion-button>`,
      },
      tabelaReferencia: {
        colunas: ["Atributo", "Efeito"],
        linhas: [
          ["expand=\"block\"", "ocupa a largura toda"],
          ["fill=\"outline\"", "só a borda colorida"],
          ["fill=\"clear\"", "sem fundo nenhum"],
          ["shape=\"round\"", "cantos totalmente arredondados"],
          ["slot=\"icon-only\"", "ícone sozinho, sem texto"],
        ],
      },
      desafio: "combine 2 atributos no mesmo botão (ex: fill=\"outline\" + shape=\"round\") e veja o resultado.",
    },
    {
      id: "ion-list-item",
      titulo: "ion-list + ion-item — Organizando Linhas",
      codigo: {
        conteudo: `<ion-list>
  <ion-item><ion-label>Arrumar o quarto</ion-label></ion-item>
  <ion-item><ion-label>Estudar Ionic</ion-label></ion-item>
  <ion-item><ion-label>Passear com o cachorro</ion-label></ion-item>
</ion-list>`,
      },
      desafio:
        "adicione um 4º item com uma missão sua. Na próxima atividade, essa lista vira dinâmica (gerada por JavaScript) — hoje é só para você conhecer a estrutura.",
    },
    {
      id: "ion-badge",
      titulo: "ion-badge — Contador Visual",
      codigo: {
        conteudo: `<ion-item>
  <ion-label>Missões pendentes</ion-label>
  <ion-badge slot="end" color="danger">3</ion-badge>
</ion-item>`,
      },
      instrucao: "Um ion-badge é aquela \"bolinha com número\" que você já viu em ícones de apps de mensagem. slot=\"end\" empurra ele para a ponta direita do item.",
      desafio: "troque a cor para success e o número para 0 — imagine que é o estado \"tudo concluído\".",
    },
    {
      id: "ion-chip",
      titulo: "ion-chip — Etiquetas",
      codigo: {
        conteudo: `<ion-chip color="tertiary">
  <ion-icon name="pricetag"></ion-icon>
  <ion-label>Escola</ion-label>
</ion-chip>
<ion-chip color="success">
  <ion-label>Casa</ion-label>
</ion-chip>`,
      },
      desafio: "crie um 3º chip com a categoria \"Lazer\" e uma cor diferente das outras duas.",
    },
    {
      id: "ion-toggle",
      titulo: "ion-toggle — Interruptor Liga/Desliga",
      codigo: {
        conteudo: `<ion-item>
  <ion-label>Modo escuro</ion-label>
  <ion-toggle id="toggle-tema" slot="end"></ion-toggle>
</ion-item>`,
      },
      instrucao:
        "Um ion-toggle já responde a clique sozinho (liga/desliga visualmente) — mas não faz nada além disso ainda. Isso muda na próxima atividade, quando ligamos ele a uma função JavaScript.",
    },
    {
      id: "ion-searchbar",
      titulo: "ion-searchbar — Campo de Busca",
      codigo: {
        conteudo: `<ion-searchbar id="busca-missao" placeholder="Buscar missão..."></ion-searchbar>`,
      },
      desafio:
        "coloque a barra de busca logo acima da ion-list do item anterior. Visualmente ela já parece pronta para filtrar — a lógica de filtro de verdade vem na próxima atividade.",
    },
    {
      id: "ion-fab",
      titulo: "ion-fab — Botão Flutuante",
      codigo: {
        conteudo: `<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button color="success">
    <ion-icon name="add"></ion-icon>
  </ion-fab-button>
</ion-fab>`,
      },
      instrucao:
        "Um FAB (Floating Action Button) é aquele botão redondo que fica \"flutuando\" sobre o conteúdo, geralmente no canto inferior direito — comum em apps de e-mail (botão de escrever) e redes sociais (botão de postar).",
      desafio: "troque horizontal=\"end\" por horizontal=\"start\" e veja o botão pular para o canto esquerdo.",
    },
    {
      id: "ion-avatar-thumbnail",
      titulo: "ion-avatar e ion-thumbnail — Imagens",
      codigo: {
        conteudo: `<ion-item>
  <ion-avatar slot="start">
    <img src="https://ionicframework.com/docs/img/demos/avatar.svg">
  </ion-avatar>
  <ion-label>Meu perfil</ion-label>
</ion-item>`,
      },
      instrucao:
        "ion-avatar deixa a imagem redonda (perfil); ion-thumbnail deixa quadrada (miniatura, tipo capa de música ou produto) — mesma ideia, formato diferente. Troque a tag e compare.",
    },
    {
      id: "ion-grid",
      titulo: "ion-grid, ion-row, ion-col — Colunas",
      codigo: {
        conteudo: `<ion-grid>
  <ion-row>
    <ion-col size="4"><ion-button expand="block">Todas</ion-button></ion-col>
    <ion-col size="4"><ion-button expand="block" color="success">Feitas</ion-button></ion-col>
    <ion-col size="4"><ion-button expand="block" color="warning">Pendentes</ion-button></ion-col>
  </ion-row>
</ion-grid>`,
      },
      instrucao: "A grade do Ionic vai de 1 a 12 por linha. Três colunas de size=\"4\" dividem a linha em três partes iguais (4+4+4=12).",
      desafio: "mude para 2 colunas de size=\"6\" cada, e depois experimente 1 coluna de size=\"8\" + outra de size=\"4\".",
    },
    {
      id: "ion-progress-spinner",
      titulo: "ion-progress-bar e ion-spinner",
      codigo: {
        conteudo: `<ion-progress-bar value="0.6" color="success"></ion-progress-bar>
<ion-spinner name="crescent" color="primary"></ion-spinner>`,
      },
      instrucao:
        "value=\"0.6\" preenche 60% da barra — é assim que se mostraria, por exemplo, \"6 de 10 missões concluídas\". O ion-spinner é aquele círculo girando, usado enquanto algo carrega.",
    },
    {
      id: "ion-footer",
      titulo: "ion-footer — Rodapé Fixo",
      codigo: {
        conteudo: `<ion-footer>
  <ion-toolbar>
    <ion-title size="small">Feito por [seu nome]</ion-title>
  </ion-toolbar>
</ion-footer>`,
      },
      aviso: "o <ion-footer> fica fora do <ion-content>, irmão dele — não dentro.",
    },
    {
      id: "desafio-montando-tela-completa",
      titulo: "Desafio: Montando a Tela Completa",
      instrucao:
        "Agora junte tudo que praticou hoje num index.html só. Não existe uma resposta única \"certa\" — o importante é usar pelo menos 6 dos componentes vistos hoje. Um exemplo de estrutura completa:",
      codigo: {
        conteudo: `<ion-app>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Minhas Missões</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-searchbar id="busca-missao" placeholder="Buscar missão..."></ion-searchbar>

    <ion-item>
      <ion-label position="floating">Nova missão</ion-label>
      <ion-input id="campo-missao"></ion-input>
    </ion-item>

    <ion-button id="btn-adicionar" expand="block" color="success">
      <ion-icon slot="start" name="add-circle"></ion-icon>
      Adicionar Missão
    </ion-button>

    <ion-list id="lista-missoes"></ion-list>
  </ion-content>

  <ion-footer>
    <ion-toolbar>
      <ion-title size="small">Feito por [seu nome]</ion-title>
    </ion-toolbar>
  </ion-footer>
</ion-app>`,
      },
      objetivo:
        "Note os id: campo-missao, btn-adicionar, lista-missoes — guarde esses nomes exatos, é por eles que o JavaScript da próxima atividade vai encontrar cada elemento.",
    },
    {
      id: "checklist-final",
      titulo: "Checklist Final",
      tabelaReferencia: {
        colunas: ["Checklist final"],
        linhas: [
          ["Testei pelo menos 8 dos 13 componentes desta atividade"],
          ["Meu index.html tem campo (campo-missao), botão (btn-adicionar) e lista (lista-missoes) com esses id exatos"],
          ["Testei a grade (ion-grid) com pelo menos 2 combinações de size diferentes"],
          ["A tela roda sem erros no cordova run browser"],
        ],
      },
      objetivo: "Sua tela está pronta. A próxima atividade é só JavaScript: cliques, arrays e a lista ganhando vida de verdade.",
    },
  ],
};

export default atividade;
