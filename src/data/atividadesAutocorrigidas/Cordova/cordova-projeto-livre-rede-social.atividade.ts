import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Ionic — Projeto Livre: Construa uma Rede Social",
  introducao:
    "Você já sabe as peças. Agora monta o sistema inteiro sozinho(a), a partir de uma especificação. Nas últimas atividades, cada capítulo te deu o código pronto para digitar. Esta é diferente: aqui você recebe a especificação — o que o sistema precisa fazer — e escreve a função sozinho(a). É assim que um programador de verdade trabalha: ninguém entrega o código pronto, entrega o que o sistema precisa fazer. Pré-requisito: as 4 atividades anteriores do curso.",
  regras: {
    titulo: "Como ler este guia",
    itens: [
      "Peça pronta — código de fundação, já dado. Copie e siga.",
      "Desafio — só a especificação. Você escreve a função. Cada desafio tem uma Dica se você travar, mas tente sozinho(a) primeiro — pelo menos 10 minutos antes de olhar.",
      "O último item é o Gabarito Comentado: o sistema inteiro, resolvido. É para comparar depois, não para copiar antes.",
      "Errar faz parte. Se uma função não funcionar de primeira, abra o Console (F12), leia a mensagem de erro, e tente de novo.",
    ],
  },
  itens: [
    {
      id: "o-sistema-conectaturma",
      titulo: "O Sistema que Você Vai Construir",
      cenario:
        "Você vai construir o ConectaTurma: uma rede social simples, só sua, rodando no seu app. Aqui está tudo que ele precisa fazer até o fim deste guia.",
      tabelaReferencia: {
        colunas: ["Requisitos obrigatórios"],
        linhas: [
          ["Um perfil: nome, avatar (emoji) e uma bio curta"],
          ["Um feed mostrando posts com autor, avatar, texto, curtidas e comentários"],
          ["Publicar um post novo, que aparece no feed"],
          ["Curtir e descurtir qualquer post"],
          ["Comentar em qualquer post"],
          ["Excluir — mas só os posts que você mesmo(a) publicou"],
          ["Buscar posts por texto ou por autor"],
          ["Seguir colegas fictícios e filtrar o feed por \"Todos\" ou \"Seguindo\""],
          ["Modo escuro que continua ligado mesmo depois de fechar o app"],
          ["Tudo isso salvo — fechar e abrir o app de novo não pode apagar nada"],
        ],
      },
      objetivo:
        "Bônus (opcional, não é cobrado no checklist): editar um post já publicado, contar quantos posts cada pessoa tem no perfil, animação ao curtir.",
    },
    {
      id: "planejando-os-dados",
      titulo: "Planejando os Dados",
      instrucao:
        "Antes de escrever qualquer tela, vale desenhar no papel (ou na cabeça) que formato cada informação vai ter. O ConectaTurma guarda três coisas separadas no localStorage:",
      codigo: {
        conteudo: `// o perfil — chave "ct_perfil"
{ nome: "Ana", avatar: "🐱", bio: "Aprendendo Ionic!" }

// um post — dentro do array na chave "ct_posts"
{
  id: 1723766400000,
  autor: "Ana",
  avatar: "🐱",
  texto: "Meu primeiro post!",
  curtidas: 0,
  curtiu: false,
  comentarios: []
}

// quem eu sigo — array na chave "ct_seguindo"
["Bruno", "Carla"]`,
      },
      objetivo: "Guarde esses três nomes de chave — ct_perfil, ct_posts, ct_seguindo — você vai usar exatamente eles em vários capítulos daqui para frente.",
    },
    {
      id: "tabs-de-navegacao",
      titulo: "Tabs de Navegação",
      instrucao:
        "Um sistema com feed, publicar, buscar e perfil precisa de 4 telas. Em vez do sistema de rotas do Ionic (que pede Angular), vamos usar uma barra de abas simples — ion-tab-bar sozinha, controlada por JavaScript puro.",
      codigo: {
        conteudo: `<!-- www/index.html, dentro do ion-content -->
<div id="tela-feed" class="tela"><!-- feed entra aqui --></div>
<div id="tela-publicar" class="tela" style="display:none"><!-- publicar entra aqui --></div>
<div id="tela-buscar" class="tela" style="display:none"><!-- buscar entra aqui --></div>
<div id="tela-perfil" class="tela" style="display:none"><!-- perfil entra aqui --></div>

<ion-tab-bar>
  <ion-tab-button onclick="mostrarTela('feed')">
    <ion-icon name="newspaper"></ion-icon>
    <ion-label>Feed</ion-label>
  </ion-tab-button>
  <ion-tab-button onclick="mostrarTela('publicar')">
    <ion-icon name="add-circle"></ion-icon>
    <ion-label>Publicar</ion-label>
  </ion-tab-button>
  <ion-tab-button onclick="mostrarTela('buscar')">
    <ion-icon name="search"></ion-icon>
    <ion-label>Buscar</ion-label>
  </ion-tab-button>
  <ion-tab-button onclick="mostrarTela('perfil')">
    <ion-icon name="person-circle"></ion-icon>
    <ion-label>Perfil</ion-label>
  </ion-tab-button>
</ion-tab-bar>

// www/js/index.js
function mostrarTela(nome) {
  document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
  document.getElementById(\`tela-\${nome}\`).style.display = 'block';
}`,
      },
      desafio: "rode o app e clique nas 4 abas. Cada uma deve trocar a tela — mesmo vazia por enquanto.",
    },
    {
      id: "tela-de-perfil-html",
      titulo: "Tela de Perfil (HTML)",
      instrucao: "Dentro de #tela-perfil, e o código que desenha os 8 emojis clicáveis:",
      codigo: {
        conteudo: `<!-- www/index.html -->
<ion-card>
  <ion-card-content>
    <ion-item>
      <ion-label position="floating">Seu nome</ion-label>
      <ion-input id="perfil-nome"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Bio</ion-label>
      <ion-textarea id="perfil-bio"></ion-textarea>
    </ion-item>
    <p style="margin: 16px 0 8px;">Escolha um avatar:</p>
    <div id="grade-avatares">
      <!-- os botões de emoji entram aqui, gerados por JS -->
    </div>
    <ion-button expand="block" onclick="salvarPerfil()">Salvar Perfil</ion-button>
  </ion-card-content>
</ion-card>

// www/js/index.js
const avatares = ["🦊", "🐱", "🐶", "🐼", "🦁", "🐸", "🦄", "🐧"];
let avatarEscolhido = avatares[0];

function desenharAvatares() {
  const grade = document.getElementById('grade-avatares');
  grade.innerHTML = "";
  avatares.forEach(emoji => {
    const selecionado = emoji === avatarEscolhido ? "3px solid #3880ff" : "3px solid transparent";
    grade.innerHTML += \`<button style="font-size:1.6em; border:\${selecionado}; border-radius:10px; background:#f5f5f5; margin:4px; padding:6px 10px;" onclick="escolherAvatar('\${emoji}')">\${emoji}</button>\`;
  });
}

function escolherAvatar(emoji) {
  avatarEscolhido = emoji;
  desenharAvatares();
}

desenharAvatares();`,
      },
      objetivo:
        "Cada botão de avatar chama escolherAvatar(), que redesenha a grade — o emoji clicado ganha uma borda azul. Guarde bem o nome da variável avatarEscolhido: o próximo item depende dela.",
    },
    {
      id: "desafio-salvar-perfil",
      titulo: "Desafio: Salvar o Perfil",
      instrucao: "Escreva a função salvarPerfil(). Ela precisa:",
      passos: [
        "Ler o valor de perfil-nome e de perfil-bio (ambos têm .value).",
        "Montar um objeto com nome, avatar (use a variável avatarEscolhido do item anterior) e bio.",
        "Guardar esse objeto no localStorage, na chave ct_perfil — lembrando que localStorage só guarda texto, então precisa de JSON.stringify().",
        "Mostrar um alert() confirmando que salvou.",
      ],
      aviso: "Dica: a assinatura da função é function salvarPerfil() { ... } — ela não recebe parâmetros, porque lê tudo direto dos campos da tela.",
      desafio:
        "preencha nome e bio, escolha um avatar, clique em salvar. Depois abra o Console e digite localStorage.getItem('ct_perfil') — deve aparecer o texto JSON do seu perfil.",
    },
    {
      id: "desafio-carregar-perfil",
      titulo: "Desafio: Carregar o Perfil ao Abrir o App",
      instrucao: "Escreva a função carregarPerfil(). Ela precisa:",
      passos: [
        "Buscar ct_perfil no localStorage e desfazer o JSON.stringify com JSON.parse.",
        "Se não existir nada ainda (primeira vez abrindo o app), usar um perfil padrão: { nome: \"Visitante\", avatar: \"🦊\", bio: \"\" } — lembre do truque valor || padrao.",
        "Guardar o resultado numa variável global perfilAtual (crie ela fora de qualquer função, como let perfilAtual;).",
        "Preencher os campos perfil-nome, perfil-bio e a variável avatarEscolhido com esses dados, e chamar desenharAvatares() de novo para mostrar a borda no avatar certo.",
      ],
      aviso:
        "Dica: essa função precisa rodar sozinha assim que o app abre — não espera clique de ninguém. Chame carregarPerfil(); na última linha do arquivo, fora de qualquer função.",
      objetivo:
        "A partir de agora, sempre que precisar do nome ou avatar de quem está usando o app, use perfilAtual.nome e perfilAtual.avatar — não leia os campos da tela de novo, porque a pessoa pode estar em outra aba.",
    },
    {
      id: "a-base-de-posts",
      titulo: "A Base de Posts",
      instrucao:
        "Uma rede social vazia é chata de testar. Este código semeia 3 posts fictícios de colegas — só na primeira vez que o app abre, sem apagar posts que você já criou depois.",
      codigo: {
        conteudo: `let posts = [];

function carregarOuSemearPosts() {
  const salvos = JSON.parse(localStorage.getItem('ct_posts'));
  if (salvos) { posts = salvos; return; }

  posts = [
    { id: 1, autor: "Ana", avatar: "🐱", texto: "Gente, terminei o app de missões ontem! Alguém mais travou no localStorage? 😅", curtidas: 3, curtiu: false, comentarios: [{ autor: "Bruno", texto: "Eu travei kkkk" }] },
    { id: 2, autor: "Bruno", avatar: "🐶", texto: "Rodando meu primeiro app no emulador agora. Muito irado ver funcionando de verdade!", curtidas: 5, curtiu: false, comentarios: [] },
    { id: 3, autor: "Carla", avatar: "🐼", texto: "Dica: se o botão não faz nada, confere se o id no HTML bate com o getElementById 👀", curtidas: 7, curtiu: false, comentarios: [{ autor: "Ana", texto: "Foi exatamente meu erro ontem!" }] },
  ];
  localStorage.setItem('ct_posts', JSON.stringify(posts));
}`,
      },
      objetivo:
        "O truque está no if (salvos) return;: se já existe algo salvo, a função para ali e usa o que tem. Só cai nos 3 posts de exemplo quando ct_posts ainda não existe.",
    },
    {
      id: "tela-de-publicar-html",
      titulo: "Tela de Publicar (HTML)",
      instrucao: "Dentro de #tela-publicar:",
      codigo: {
        conteudo: `<ion-card>
  <ion-card-content>
    <ion-item>
      <ion-label position="floating">O que você quer contar para a turma?</ion-label>
      <ion-textarea id="post-texto" rows="4"></ion-textarea>
    </ion-item>
    <ion-button expand="block" id="btn-publicar">Publicar</ion-button>
  </ion-card-content>
</ion-card>`,
      },
    },
    {
      id: "desafio-publicarpost",
      titulo: "Desafio: Função publicarPost()",
      instrucao: "Ligue o clique do botão #btn-publicar. A função precisa:",
      passos: [
        "Ler o texto de post-texto e usar .trim() — se ficar vazio, não publicar nada.",
        "Criar um objeto de post novo, no mesmo formato do item \"Planejando os Dados\" — use Date.now() como id (ele gera um número diferente a cada milissegundo, então nunca repete).",
        "autor e avatar vêm de perfilAtual — não da tela de perfil, da variável já carregada.",
        "curtidas: 0, curtiu: false, comentarios: [].",
        "Adicionar esse post no início do array posts (não no fim — post novo aparece no topo do feed). Existe um método para isso além do .push(): .unshift().",
        "Salvar posts no localStorage (chave ct_posts, com JSON.stringify).",
        "Limpar o campo de texto, redesenhar o feed (função do próximo item — pode deixar chamada mesmo antes dela existir) e voltar para a aba do feed com mostrarTela('feed').",
      ],
      aviso:
        "Dica: como isso é um clique de botão comum (não Ionic), o evento é 'click' mesmo — document.getElementById('btn-publicar').addEventListener('click', () => { ... });",
    },
    {
      id: "desenhando-o-feed",
      titulo: "Desenhando o Feed",
      instrucao: "Esta parte é repetição de um padrão que você já domina — gerar HTML com template literal a partir de um array. Por isso vem pronta.",
      codigo: {
        conteudo: `function desenharFeed(lista = posts) {
  const container = document.getElementById('feed-container');
  container.innerHTML = "";
  lista.forEach(post => {
    const souEu = post.autor === perfilAtual.nome;
    const botaoExcluir = souEu
      ? \`<ion-button fill="clear" color="danger" onclick="excluirPost(\${post.id})"><ion-icon name="trash" slot="icon-only"></ion-icon></ion-button>\`
      : "";
    const comentariosHtml = post.comentarios
      .map(c => \`<p style="font-size:0.85em; color:#666;"><strong>\${c.autor}:</strong> \${c.texto}</p>\`)
      .join("");
    container.innerHTML += \`
      <ion-card>
        <ion-card-header>
          <ion-card-title>\${post.avatar} \${post.autor}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>\${post.texto}</p>
          <ion-button fill="\${post.curtiu ? 'solid' : 'outline'}" onclick="alternarCurtida(\${post.id})">
            ❤️ \${post.curtidas}
          </ion-button>
          <ion-button fill="clear" onclick="comentarPost(\${post.id})">
            💬 \${post.comentarios.length}
          </ion-button>
          \${botaoExcluir}
          \${comentariosHtml}
        </ion-card-content>
      </ion-card>
    \`;
  });
}`,
      },
      objetivo:
        "Repare no parâmetro lista = posts: se você chamar desenharFeed() sem nada, ele desenha todo mundo; se chamar desenharFeed(algumaListaFiltrada), desenha só o que passar — útil na busca e no filtro de seguir. O souEu compara o autor do post com perfilAtual.nome — o botão de excluir só entra no HTML quando bate. Essa é a primeira camada de proteção; no desafio de excluir você adiciona a segunda, dentro da própria função.",
    },
    {
      id: "desafio-curtir-post",
      titulo: "Desafio: Curtir um Post",
      instrucao: "Escreva a função alternarCurtida(id). Ela precisa:",
      passos: [
        "Encontrar, dentro do array posts, o post cujo id bate com o parâmetro recebido — desta vez use .find() em vez de .splice(). find() devolve o objeto direto (não a posição): posts.find(p => p.id === id).",
        "Inverter post.curtiu (true vira false e vice-versa).",
        "Se ficou true, somar 1 em post.curtidas; se ficou false, subtrair 1.",
        "Salvar o array posts inteiro de novo no localStorage e redesenhar o feed.",
      ],
      aviso: "Dica: como find() devolve o objeto (não uma cópia), mudar post.curtiu já muda ele dentro do array posts também — não precisa recolocar na lista.",
      desafio: "curta um post duas vezes seguidas. O contador deve subir e depois voltar ao número original, e o botão deve mudar de contorno para preenchido e voltar.",
    },
    {
      id: "desafio-comentar-post",
      titulo: "Desafio: Comentar num Post",
      instrucao: "Escreva a função comentarPost(id). Ela precisa:",
      passos: [
        "Usar prompt(\"Seu comentário:\") para pedir o texto — se a pessoa clicar em cancelar, prompt() devolve null, então confira antes de continuar (if (texto) já resolve).",
        "Encontrar o post certo (de novo com .find()).",
        "Adicionar um objeto { autor: perfilAtual.nome, texto: texto } dentro do array post.comentarios, com .push().",
        "Salvar e redesenhar o feed.",
      ],
      aviso:
        "Dica: o feed já sabe desenhar os comentários existentes de cada post (variável comentariosHtml) — você só precisa colocar o comentário novo dentro do array antes de redesenhar.",
    },
    {
      id: "desafio-excluir-so-os-seus-posts",
      titulo: "Desafio: Excluir Só os Seus Posts",
      instrucao: "Escreva a função excluirPost(id). Ela precisa:",
      passos: [
        "Encontrar o post com .find().",
        "Conferir se post.autor é igual a perfilAtual.nome. Se não for, mostrar alert(\"Você só pode excluir seus próprios posts.\") e parar ali (return;).",
        "Se for, perguntar com confirm(\"Excluir este post?\").",
        "Se confirmar, remover o post do array — desta vez use .filter(): posts = posts.filter(p => p.id !== id) troca o array inteiro por uma cópia sem aquele post.",
        "Salvar e redesenhar.",
      ],
      aviso:
        "o botão de excluir já só aparece nos seus próprios posts (item \"Desenhando o Feed\") — mas alguém que souber programar poderia forçar a função pelo Console do navegador, passando o id de um post de outra pessoa. Por isso a função também confere o autor, e não confia só em esconder o botão. Essa ideia — nunca confiar só no que a tela esconde — vale para qualquer sistema.",
    },
    {
      id: "tela-de-buscar",
      titulo: "Tela de Buscar",
      instrucao: "Dentro de #tela-buscar:",
      codigo: {
        conteudo: `<ion-searchbar id="busca-posts" placeholder="Buscar por texto ou autor"></ion-searchbar>
<div id="resultado-busca"></div>
<div id="feed-container-busca"></div>`,
      },
      passos: [
        "Ligue um listener de 'ionInput' em busca-posts que pega o texto digitado (evento.target.value) e transforma em minúsculo.",
        "Filtre o array posts mantendo só quem tem o termo no texto OU no autor (dica: .includes() dentro de um ||).",
        "Chame desenharFeed(filtrados) — mas o feed é desenhado dentro de feed-container, que fica em outra aba. Adapte desenharFeed para receber também o id do container onde desenhar.",
      ],
      aviso:
        "Dica: a forma mais simples é dar um segundo parâmetro para desenharFeed: function desenharFeed(lista = posts, idContainer = 'feed-container') { const container = document.getElementById(idContainer); ... }. Aí a busca chama desenharFeed(filtrados, 'feed-container-busca').",
    },
    {
      id: "desafio-seguir-colegas-e-filtrar-feed",
      titulo: "Desafio: Seguir Colegas e Filtrar o Feed",
      instrucao: "Segmento de filtro, no topo de #tela-feed:",
      codigo: {
        conteudo: `<ion-segment id="filtro-feed" value="todos">
  <ion-segment-button value="todos"><ion-label>Todos</ion-label></ion-segment-button>
  <ion-segment-button value="seguindo"><ion-label>Seguindo</ion-label></ion-segment-button>
</ion-segment>
<div id="feed-container"></div>`,
      },
      passos: [
        "Crie let seguindo = []; carregada do localStorage (chave ct_seguindo) do mesmo jeito que o perfil — JSON.parse(...) || [].",
        "Escreva alternarSeguir(nome): se seguindo.includes(nome), tire com .filter(); senão, adicione com .push(). Salve e redesenhe.",
        "Adicione um botão de seguir em cada post do feed (edite o template do item \"Desenhando o Feed\"), que mostra \"Seguir\" ou \"Seguindo\" dependendo do .includes(), e chama alternarSeguir(post.autor) — mas só quando post.autor !== perfilAtual.nome.",
        "Ligue um listener 'ionChange' em filtro-feed que, quando o valor for \"seguindo\", chama desenharFeed(posts.filter(p => seguindo.includes(p.autor))); quando for \"todos\", chama desenharFeed() normal.",
      ],
      aviso: "Dica: teste seguindo a \"Ana\" e depois mude o segmento para \"Seguindo\" — só os posts dela devem sobrar no feed.",
    },
    {
      id: "desafio-modo-escuro-persistente",
      titulo: "Desafio: Modo Escuro Persistente",
      instrucao:
        "Sem código novo desta vez — só memória. Você já implementou exatamente isso na atividade de LocalStorage e Emulador: um toggle (ionChange) que muda o fundo e a cor do app, e salva o estado (true/false) numa chave do localStorage — lembrando que tudo que vem de lá é texto, então a comparação é === 'true', não === true.",
      passos: [
        "Coloque um ion-toggle id=\"toggle-tema\" na tela de Perfil.",
        "Salve o estado ao mudar o toggle (chave sugerida: ct_tema).",
        "Aplique o tema salvo assim que o app abre, junto da carregarPerfil().",
      ],
      aviso:
        "Dica: se travar, volte na atividade \"LocalStorage e Emulador\", no item sobre \"Salvando a Preferência de Tema\" — a lógica é idêntica, só muda o nome da chave.",
    },
    {
      id: "testando-no-emulador",
      titulo: "Testando Tudo no Emulador",
      instrucao:
        "Com as 4 telas funcionando no navegador, é hora de ver o ConectaTurma rodando dentro de um celular Android de verdade (simulado) — os mesmos passos da atividade anterior.",
      codigo: {
        conteudo: `cordova platform add android\ncordova run android`,
        terminal: true,
      },
      passos: [
        "Abra o Android Studio → Virtual Device Manager → confira que existe um dispositivo criado.",
        "Ligue o emulador antes de rodar o segundo comando, ou o Cordova não vai encontrar onde instalar.",
        "Teste as 4 abas, publique um post, curta, comente, siga alguém e busque — tudo precisa funcionar igual ao navegador.",
      ],
      aviso: "se o emulador estiver lento, é normal — ele está simulando um celular inteiro dentro do seu computador. Espere o boot terminar antes de rodar o comando.",
    },
    {
      id: "checklist-de-requisitos",
      titulo: "Checklist de Requisitos",
      instrucao: "Confira cada item com o app aberto, testando de verdade — não só lendo o código.",
      tabelaReferencia: {
        colunas: ["Checklist de requisitos"],
        linhas: [
          ["Salvar o perfil (nome, avatar, bio) e ele continua lá depois de fechar e abrir o app"],
          ["O feed mostra os 3 posts de exemplo na primeira vez, e não os recria depois"],
          ["Publicar um post novo, e ele aparece no topo do feed, com seu nome e avatar certos"],
          ["Curtir e descurtir qualquer post — o número muda certo"],
          ["Comentar em qualquer post — o comentário aparece embaixo do texto"],
          ["O botão de excluir só aparece nos seus próprios posts"],
          ["Tentar excluir um post de outra pessoa pelo Console (chamando excluirPost() direto com o id de outro autor) mostra o alerta de bloqueio"],
          ["A busca filtra por texto e por nome de autor, em tempo real"],
          ["Seguir/deixar de seguir funciona, e o filtro \"Seguindo\" mostra só quem você segue"],
          ["O modo escuro muda o app e continua ligado depois de fechar e abrir de novo"],
          ["O app roda sem erros no Console, no navegador e no emulador Android"],
        ],
      },
    },
    {
      id: "gabarito-comentado",
      titulo: "Gabarito Comentado — Só Depois de Tentar",
      instrucao:
        "Isto é o sistema inteiro, resolvido. Use para comparar com o que você escreveu — sua solução pode ser diferente e estar igualmente certa. Se você ainda não tentou os Desafios, volte lá primeiro: olhar a resposta antes tira o ponto principal do exercício.",
      codigo: {
        conteudo: `// ---------- PERFIL ----------
const avatares = ["🦊", "🐱", "🐶", "🐼", "🦁", "🐸", "🦄", "🐧"];
let avatarEscolhido = avatares[0];
let perfilAtual;

function desenharAvatares() {
  const grade = document.getElementById('grade-avatares');
  grade.innerHTML = "";
  avatares.forEach(emoji => {
    const sel = emoji === avatarEscolhido ? "3px solid #3880ff" : "3px solid transparent";
    grade.innerHTML += \`<button style="font-size:1.6em;border:\${sel};border-radius:10px;background:#f5f5f5;margin:4px;padding:6px 10px;" onclick="escolherAvatar('\${emoji}')">\${emoji}</button>\`;
  });
}
function escolherAvatar(emoji) { avatarEscolhido = emoji; desenharAvatares(); }

function salvarPerfil() {
  const nome = document.getElementById('perfil-nome').value;
  const bio = document.getElementById('perfil-bio').value;
  const perfil = { nome, avatar: avatarEscolhido, bio };
  localStorage.setItem('ct_perfil', JSON.stringify(perfil));
  perfilAtual = perfil;
  alert("Perfil salvo!");
}

function carregarPerfil() {
  const salvo = JSON.parse(localStorage.getItem('ct_perfil'));
  perfilAtual = salvo || { nome: "Visitante", avatar: "🦊", bio: "" };
  document.getElementById('perfil-nome').value = perfilAtual.nome;
  document.getElementById('perfil-bio').value = perfilAtual.bio;
  avatarEscolhido = perfilAtual.avatar;
  desenharAvatares();
}

// ---------- POSTS ----------
let posts = [];
let seguindo = [];

function carregarOuSemearPosts() {
  const salvos = JSON.parse(localStorage.getItem('ct_posts'));
  if (salvos) { posts = salvos; return; }
  posts = [
    { id: 1, autor: "Ana", avatar: "🐱", texto: "Gente, terminei o app de missões ontem! Alguém mais travou no localStorage? 😅", curtidas: 3, curtiu: false, comentarios: [{ autor: "Bruno", texto: "Eu travei kkkk" }] },
    { id: 2, autor: "Bruno", avatar: "🐶", texto: "Rodando meu primeiro app no emulador agora. Muito irado ver funcionando de verdade!", curtidas: 5, curtiu: false, comentarios: [] },
    { id: 3, autor: "Carla", avatar: "🐼", texto: "Dica: se o botão não faz nada, confere se o id no HTML bate com o getElementById 👀", curtidas: 7, curtiu: false, comentarios: [{ autor: "Ana", texto: "Foi exatamente meu erro ontem!" }] },
  ];
  localStorage.setItem('ct_posts', JSON.stringify(posts));
}

function desenharFeed(lista = posts, idContainer = 'feed-container') {
  const container = document.getElementById(idContainer);
  container.innerHTML = "";
  lista.forEach(post => {
    const souEu = post.autor === perfilAtual.nome;
    const botaoExcluir = souEu
      ? \`<ion-button fill="clear" color="danger" onclick="excluirPost(\${post.id})"><ion-icon name="trash" slot="icon-only"></ion-icon></ion-button>\`
      : "";
    const botaoSeguir = souEu
      ? ""
      : \`<ion-button fill="outline" size="small" onclick="alternarSeguir('\${post.autor}')">\${seguindo.includes(post.autor) ? 'Seguindo' : 'Seguir'}</ion-button>\`;
    const comentariosHtml = post.comentarios.map(c =>
      \`<p style="font-size:0.85em;color:#666;"><strong>\${c.autor}:</strong> \${c.texto}</p>\`
    ).join("");
    container.innerHTML += \`
      <ion-card>
        <ion-card-header><ion-card-title>\${post.avatar} \${post.autor}</ion-card-title>\${botaoSeguir}</ion-card-header>
        <ion-card-content>
          <p>\${post.texto}</p>
          <ion-button fill="\${post.curtiu ? 'solid' : 'outline'}" onclick="alternarCurtida(\${post.id})">❤️ \${post.curtidas}</ion-button>
          <ion-button fill="clear" onclick="comentarPost(\${post.id})">💬 \${post.comentarios.length}</ion-button>
          \${botaoExcluir}\${comentariosHtml}
        </ion-card-content>
      </ion-card>
    \`;
  });
}

function publicarPost() {
  const campo = document.getElementById('post-texto');
  const texto = campo.value.trim();
  if (texto === "") return;
  posts.unshift({ id: Date.now(), autor: perfilAtual.nome, avatar: perfilAtual.avatar, texto, curtidas: 0, curtiu: false, comentarios: [] });
  localStorage.setItem('ct_posts', JSON.stringify(posts));
  campo.value = "";
  desenharFeed();
  mostrarTela('feed');
}
document.getElementById('btn-publicar').addEventListener('click', publicarPost);

function alternarCurtida(id) {
  const post = posts.find(p => p.id === id);
  post.curtiu = !post.curtiu;
  post.curtidas += post.curtiu ? 1 : -1;
  localStorage.setItem('ct_posts', JSON.stringify(posts));
  desenharFeed();
}

function comentarPost(id) {
  const texto = prompt("Seu comentário:");
  if (!texto) return;
  const post = posts.find(p => p.id === id);
  post.comentarios.push({ autor: perfilAtual.nome, texto });
  localStorage.setItem('ct_posts', JSON.stringify(posts));
  desenharFeed();
}

function excluirPost(id) {
  const post = posts.find(p => p.id === id);
  if (post.autor !== perfilAtual.nome) { alert("Você só pode excluir seus próprios posts."); return; }
  if (!confirm("Excluir este post?")) return;
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem('ct_posts', JSON.stringify(posts));
  desenharFeed();
}

function alternarSeguir(nome) {
  seguindo = seguindo.includes(nome) ? seguindo.filter(n => n !== nome) : [...seguindo, nome];
  localStorage.setItem('ct_seguindo', JSON.stringify(seguindo));
  desenharFeed();
}

document.getElementById('busca-posts').addEventListener('ionInput', (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = posts.filter(p => p.texto.toLowerCase().includes(termo) || p.autor.toLowerCase().includes(termo));
  desenharFeed(filtrados, 'feed-container-busca');
});

document.getElementById('filtro-feed').addEventListener('ionChange', (e) => {
  if (e.target.value === 'seguindo') desenharFeed(posts.filter(p => seguindo.includes(p.autor)));
  else desenharFeed();
});

document.getElementById('toggle-tema').addEventListener('ionChange', (e) => {
  document.body.style.background = e.target.checked ? "#1a1a2e" : "#ffffff";
  document.body.style.color = e.target.checked ? "#eee" : "#333";
  localStorage.setItem('ct_tema', e.target.checked);
});

// ---------- TABS ----------
function mostrarTela(nome) {
  document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
  document.getElementById(\`tela-\${nome}\`).style.display = 'block';
}

// ---------- INÍCIO ----------
const seguindoSalvo = JSON.parse(localStorage.getItem('ct_seguindo'));
seguindo = seguindoSalvo || [];
const temaSalvo = localStorage.getItem('ct_tema') === 'true';
if (temaSalvo) {
  document.body.style.background = "#1a1a2e";
  document.body.style.color = "#eee";
  document.getElementById('toggle-tema').checked = true;
}
carregarPerfil();
carregarOuSemearPosts();
desenharFeed();`,
      },
      objetivo:
        "Ideias para ir além (bônus): editar um post já publicado; mostrar quantos posts cada autor tem no card de perfil; guardar uma foto de perfil de verdade com <input type=\"file\">; um botão de \"exportar meus posts\" que baixa um arquivo .json. Parabéns — você projetou e construiu um sistema completo a partir de uma especificação, não de um passo a passo. Isso é, literalmente, o trabalho de um(a) programador(a).",
    },
  ],
};

export default atividade;
