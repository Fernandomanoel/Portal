import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Ionic — LocalStorage e Emulador",
  introducao:
    "Faça o app lembrar de tudo e veja ele rodando num Android de verdade. Duas partes: primeiro, fazer o app lembrar das missões (hoje elas somem quando você fecha a aba). Depois, a parte mais empolgante do curso — instalar e rodar o app dentro de um celular Android simulado. Pré-requisito: Ionic — Prática de JavaScript.",
  itens: [
    {
      id: "localstorage-teste-rapido",
      titulo: "localStorage — Teste Rápido",
      instrucao: "Abra o Console (F12) em qualquer página e digite, uma linha de cada vez:",
      codigo: {
        conteudo: `localStorage.setItem('nome', 'Ana')
localStorage.getItem('nome')
// "Ana"`,
      },
      objetivo:
        "setItem(chave, valor) guarda algo; getItem(chave) busca de volta. Recarregue a página e rode localStorage.getItem('nome') de novo — o valor continua lá, porque o localStorage sobrevive a recarregamentos e até a fechar o navegador.",
    },
    {
      id: "json-stringify-parse",
      titulo: "JSON.stringify e JSON.parse",
      aviso: "o localStorage só guarda texto — nunca um array ou objeto direto.",
      instrucao: "Teste no console:",
      codigo: {
        conteudo: `const lista = ["item 1", "item 2"];
const textoParaSalvar = JSON.stringify(lista); // vira '["item 1","item 2"]'
localStorage.setItem('teste', textoParaSalvar);

const textoSalvo = localStorage.getItem('teste');
const listaDeVolta = JSON.parse(textoSalvo); // vira array de novo: ["item 1", "item 2"]`,
      },
      objetivo: "Regra simples: sempre que salvar, é stringify (array/objeto → texto); sempre que ler, é parse (texto → array/objeto de volta).",
    },
    {
      id: "carregando-missoes-salvas",
      titulo: "Carregando as Missões Salvas",
      instrucao: "Troque a linha do array no topo do index.js:",
      codigo: {
        conteudo: `let missoes = JSON.parse(localStorage.getItem('minhas_missoes')) || [];`,
      },
      objetivo:
        "Na primeira vez que o app roda, não existe nada salvo — getItem devolve null, e o || [] resolve isso começando com lista vazia em vez de quebrar.",
    },
    {
      id: "salvando-a-cada-mudanca",
      titulo: "Salvando a Cada Mudança",
      instrucao: "Adicione a primeira linha dentro de desenharLista():",
      codigo: {
        conteudo: `function desenharLista() {
  localStorage.setItem('minhas_missoes', JSON.stringify(missoes)); // salva sempre
  listaNaTela.innerHTML = "";
  // ... resto da função continua igual ...
}`,
      },
      objetivo: "Como desenharLista() já é chamada depois de adicionar, excluir e marcar como concluída, colocando o setItem no início dela, o app salva sozinho em toda mudança.",
    },
    {
      id: "testando-persistencia",
      titulo: "Testando a Persistência",
      passos: [
        "Adicione 3 missões, marque 1 como concluída, feche a aba completamente, abra de novo com cordova run browser.",
        "As 3 missões devem continuar lá, com a mesma marcada como concluída.",
      ],
      aviso:
        "se sumiu tudo, confira se o nome 'minhas_missoes' está idêntico nos dois lugares (no getItem do item anterior e no setItem do item de salvar) — um espaço ou letra diferente já quebra.",
    },
    {
      id: "salvando-preferencia-tema",
      titulo: "Salvando a Preferência de Tema",
      instrucao: "Atualize o listener do toggle-tema:",
      codigo: {
        conteudo: `const toggleTema = document.getElementById('toggle-tema');

// carrega a preferência salva ao iniciar
const temaEscuro = localStorage.getItem('tema_escuro') === 'true';
toggleTema.checked = temaEscuro;
if (temaEscuro) {
  document.body.style.background = "#1a1a2e";
  document.body.style.color = "#eee";
}

toggleTema.addEventListener('ionChange', (evento) => {
  const ligado = evento.target.checked;
  document.body.style.background = ligado ? "#1a1a2e" : "#ffffff";
  document.body.style.color = ligado ? "#eee" : "#333";
  localStorage.setItem('tema_escuro', ligado); // salva a escolha
});`,
      },
      objetivo:
        "localStorage.getItem('tema_escuro') === 'true' — o localStorage guarda tudo como texto, então mesmo um valor \"booleano\" (verdadeiro/falso) vira a string \"true\" ou \"false\", e por isso comparamos com === 'true' em vez de usar o valor direto.",
    },
    {
      id: "bonus-contando-visitas",
      titulo: "Bônus: Contando as Visitas",
      instrucao: "Cole em qualquer lugar do index.js:",
      codigo: {
        conteudo: `let visitas = parseInt(localStorage.getItem('visitas')) || 0;
visitas++;
localStorage.setItem('visitas', visitas);
console.log(\`Esta é a visita número \${visitas}\`);`,
      },
      objetivo: "parseInt() transforma um texto em número (lembra que tudo no localStorage vira texto). Recarregue a página várias vezes e observe o número aumentar no Console.",
    },
    {
      id: "abrindo-android-studio",
      titulo: "Abrindo o Android Studio",
      passos: [
        "Abra o Android Studio (já está instalado no computador).",
        "No menu, procure More Actions (ou o ícone de três pontinhos na tela inicial).",
        "Clique em Virtual Device Manager.",
      ],
    },
    {
      id: "criando-celular-virtual",
      titulo: "Criando o Celular Virtual",
      passos: [
        "Clique em Create Device.",
        "Escolha o modelo Pixel 2 (tamanho de tela comum) e clique em Next.",
        "Escolha uma imagem do sistema, por exemplo Q (Android 10). Se pedir download, clique em Download e espere.",
        "Abra Show Advanced Settings e mude a RAM para 1500-2000 MB — evita travar o computador.",
        "Clique em Finish.",
      ],
    },
    {
      id: "ligando-celular-virtual",
      titulo: "Ligando o Celular Virtual",
      passos: ["Na lista do Virtual Device Manager, clique no botão Play (▶) ao lado do dispositivo que você criou."],
      aviso: "a primeira inicialização demora um pouco — é normal, é como ligar um celular novo pela primeira vez. Aproveite essa espera para uma pausa rápida.",
    },
    {
      id: "rodando-app-emulador",
      titulo: "Rodando o App no Emulador",
      instrucao: "Com o celular virtual ligado, volte para o terminal, dentro da pasta meu-app:",
      codigo: {
        conteudo: `cordova platform add android\ncordova run android`,
        terminal: true,
      },
      objetivo:
        "O primeiro comando (só uma vez) ensina o Cordova a construir para Android. O segundo instala e abre o app dentro do celular virtual. Se tudo deu certo, o ícone \"Minhas Missões\" aparece no Android simulado, e o app abre igual ao que você viu no navegador — só que dentro de um celular.",
    },
    {
      id: "erros-comuns",
      titulo: "Erros Comuns Nesta Fase",
      tabelaReferencia: {
        colunas: ["O que aconteceu", "Causa provável"],
        linhas: [
          ["As missões continuam sumindo", "O nome da chave ('minhas_missoes') está escrito diferente entre getItem e setItem"],
          ["Erro \"Unexpected token\" ao carregar", "Alguma coisa não-JSON foi salva sem JSON.stringify antes"],
          [
            "App não abre no emulador",
            "O celular virtual não estava ligado quando rodou cordova run android, ou esqueceu o platform add android antes",
          ],
          ["Muito lento / travando", "RAM do celular virtual configurada alta demais para seu computador — volte no Virtual Device Manager e reduza"],
        ],
      },
    },
    {
      id: "checklist-final",
      titulo: "Checklist Final",
      tabelaReferencia: {
        colunas: ["Checklist final"],
        linhas: [
          ["As missões continuam salvas depois de fechar e abrir o navegador de novo"],
          ["A preferência de tema (claro/escuro) também é lembrada"],
          ["Criei um celular virtual no Android Studio com RAM ajustada"],
          ["Rodei cordova platform add android e cordova run android com sucesso"],
          ["Vi o app \"Minhas Missões\" abrindo de verdade no celular simulado"],
        ],
      },
      objetivo: "Última etapa do curso: na próxima atividade você revisa tudo, personaliza o app do seu jeito e encara desafios extras.",
    },
  ],
};

export default atividade;
