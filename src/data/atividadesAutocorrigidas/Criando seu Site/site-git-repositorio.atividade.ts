import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/site-git-repositorio.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Git e GitHub — Criando seu Repositório",
  introducao: "O primeiro passo de toda atividade de criação de sites: guardar e versionar seu código do jeito certo",
  itens: [
    {
      id: "1-o-que-e-git-e-o-que-e-github",
      titulo: "1. O que é Git e o que é GitHub",
      blocos: [
        {
          tipo: "texto",
          texto: "Antes de escrever a primeira linha de HTML, você vai aprender a guardar o seu trabalho do jeito que profissionais guardam: com Git.",
        },
        {
          tipo: "subtitulo",
          texto: "Git — o controle de versão",
        },
        {
          tipo: "texto",
          texto: "Git é um programa que roda no seu computador e tira \"fotografias\" do seu projeto sempre que você pedir. Cada fotografia é chamada de commit. Com isso você consegue:",
        },
        {
          tipo: "lista",
          itens: [
            "Ver exatamente o que mudou entre uma versão e outra do seu código;",
            "Voltar no tempo se alguma coisa quebrar (\"na terça-feira estava funcionando, o que eu mudei depois?\");",
            "Ter um histórico completo de tudo que você fez, com data e uma mensagem explicando cada passo;",
            "Trabalhar em equipe sem que uma pessoa apague o trabalho da outra.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "GitHub — a nuvem do seu Git",
        },
        {
          tipo: "texto",
          texto: "GitHub é um site (github.com) que guarda uma cópia do seu repositório Git na internet. Pense assim: o Git organiza o histórico no seu computador; o GitHub guarda uma cópia na nuvem, visível de qualquer lugar.",
        },
        {
          tipo: "texto",
          texto: "Isso serve pra três coisas no seu curso:",
        },
        {
          tipo: "lista",
          itens: [
            "Backup real — se seu computador tiver problema, seu trabalho está salvo online;",
            "Portfólio — seu professor (e, no futuro, empregadores) enxergam seu código e seu progresso;",
            "Entrega da atividade — como você vai ver a seguir, entregar a atividade aqui é justamente manter seu repositório atualizado.",
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Uma analogia simples",
          texto: "Pense no Git como o botão \"Salvar\" de um editor de texto — só que em vez de sobrescrever o arquivo, cada \"Salvar\" (commit) fica guardado para sempre, com uma etiqueta escrita por você dizendo o que mudou. O GitHub é o Google Drive onde essa pasta cheia de versões salvas fica hospedada.",
        },
        {
          tipo: "subtitulo",
          texto: "Por que isso importa nas suas atividades",
        },
        {
          tipo: "texto",
          texto: "As atividades desta aba são grandes e sem prazo fixo — você vai trabalhar nelas ao longo de várias aulas, não numa sentada só. Por isso, cada commit funciona como um checkpoint do seu progresso: se alguma coisa der errado numa aula, você não perde o que já tinha funcionando antes.",
        },
      ],
    },
    {
      id: "2-instalando-o-git",
      titulo: "2. Instalando o Git",
      blocos: [
        {
          tipo: "texto",
          texto: "O Git precisa ser instalado uma vez só no seu computador. Escolha o seu sistema operacional:",
        },
        {
          tipo: "subtitulo",
          texto: "Windows",
        },
        {
          tipo: "lista",
          itens: [
            "Acesse git-scm.com e baixe o instalador (o site detecta que você está no Windows sozinho);",
            "Execute o instalador e vá clicando em \"Next\" — as opções padrão servem perfeitamente para começar;",
            "Ao terminar, abra o programa \"Git Bash\" que foi instalado — é o terminal que você vai usar em todas as atividades.",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "macOS",
        },
        {
          tipo: "texto",
          texto: "Na maioria dos Macs o Git já vem instalado. Para confirmar (ou instalar, se faltar), abra o Terminal e digite:",
        },
        {
          tipo: "codigo",
          conteudo: "git --version",
        },
        {
          tipo: "texto",
          texto: "Se não estiver instalado, o próprio macOS vai oferecer para instalar as \"Ferramentas de Linha de Comando\" — aceite.",
        },
        {
          tipo: "subtitulo",
          texto: "Linux",
        },
        {
          tipo: "texto",
          texto: "Abra o terminal e use o gerenciador de pacotes da sua distribuição:",
        },
        {
          tipo: "codigo",
          conteudo: `# Ubuntu / Debian
sudo apt install git

# Fedora
sudo dnf install git`,
        },
        {
          tipo: "subtitulo",
          texto: "Conferindo se deu certo",
        },
        {
          tipo: "texto",
          texto: "Em qualquer sistema, digite no terminal:",
        },
        {
          tipo: "codigo",
          conteudo: "git --version",
        },
        {
          tipo: "texto",
          texto: "Se aparecer um número de versão (algo como git version 2.43.0), está tudo certo.",
        },
        {
          tipo: "subtitulo",
          texto: "Configurando sua identidade",
        },
        {
          tipo: "texto",
          texto: "Antes do primeiro commit, o Git precisa saber quem é você — essa informação fica gravada em todo commit que você fizer, pra mostrar quem fez cada mudança. Faça isso uma única vez:",
        },
        {
          tipo: "codigo",
          conteudo: `git config --global user.name "Seu Nome Completo"
git config --global user.email "seuemail@exemplo.com"`,
        },
        {
          tipo: "texto",
          texto: "Dica:",
        },
      ],
    },
    {
      id: "3-criando-sua-conta-e-seu-repositorio-no-github",
      titulo: "3. Criando sua conta e seu repositório no GitHub",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Criando a conta",
        },
        {
          tipo: "lista",
          itens: [
            "Acesse github.com;",
            "Clique em \"Sign up\";",
            "Informe seu e-mail (o mesmo que você configurou no capítulo anterior), crie uma senha e escolha um nome de usuário;",
            "Confirme seu e-mail quando o GitHub pedir.",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Criando um repositório novo",
        },
        {
          tipo: "texto",
          texto: "Um repositório (\"repo\") é a pasta do seu projeto dentro do GitHub — cada atividade sua vai morar em um repositório separado.",
        },
        {
          tipo: "lista",
          itens: [
            "Logado no GitHub, clique no \"+\" no canto superior direito e depois em \"New repository\";",
            "Em Repository name, dê um nome sem espaço (ex: meu-site-saas);",
            "Deixe marcado como Public (assim seu professor consegue ver e avaliar);",
            "Marque a opção \"Add a README file\" — ela cria um arquivo de descrição inicial;",
            "Clique em \"Create repository\".",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Pegando o endereço do repositório",
        },
        {
          tipo: "texto",
          texto: "Na página do repositório recém-criado, clique no botão verde \"Code\" e copie o endereço em HTTPS — algo como:",
        },
        {
          tipo: "codigo",
          conteudo: "https://github.com/seu-usuario/meu-site-saas.git",
        },
        {
          tipo: "texto",
          texto: "Você vai usar esse endereço no Capítulo 5, para ligar sua pasta local ao GitHub.",
        },
      ],
    },
    {
      id: "4-iniciando-um-repositorio-no-seu-computador",
      titulo: "4. Iniciando um repositório no seu computador",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Criando a pasta do projeto",
        },
        {
          tipo: "texto",
          texto: "Crie (ou entre) na pasta onde vai ficar a atividade, e abra o terminal (Git Bash, no Windows) dentro dela. Uma forma fácil: dentro da pasta, clique com o botão direito e procure a opção \"Git Bash Here\" (Windows) ou abra o Terminal e use cd para navegar até ela.",
        },
        {
          tipo: "subtitulo",
          texto: "git init",
        },
        {
          tipo: "texto",
          texto: "Dentro da pasta do projeto, rode:",
        },
        {
          tipo: "codigo",
          conteudo: "git init",
        },
        {
          tipo: "texto",
          texto: "Esse comando transforma uma pasta comum em um repositório Git. Ele cria uma pasta oculta chamada .git — é ali dentro que todo o histórico de commits vai ser guardado. Você nunca precisa mexer manualmente nessa pasta.",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "git init uma vez .git",
        },
        {
          tipo: "subtitulo",
          texto: "git status — o comando que você mais vai usar",
        },
        {
          tipo: "texto",
          texto: "A qualquer momento, rode:",
        },
        {
          tipo: "codigo",
          conteudo: "git status",
        },
        {
          tipo: "texto",
          texto: "Ele mostra o que mudou na sua pasta desde o último commit. Acostume-se a rodar git status o tempo todo — antes e depois de quase todo comando deste guia.",
        },
        {
          tipo: "subtitulo",
          texto: "Os três estados de um arquivo",
        },
        {
          tipo: "tabela",
          colunas: ["Estado","O que significa"],
          linhas: [
            ["Untracked (não rastreado)","Arquivo novo, que o Git ainda não conhece."],
            [
              "Staged (na área de preparação)",
              "Você marcou esse arquivo para entrar no próximo commit, com git add.",
            ],
            ["Committed (commitado)","Está salvo no histórico do repositório, com git commit."],
          ],
        },
      ],
    },
    {
      id: "5-seu-primeiro-commit",
      titulo: "5. Seu primeiro commit",
      blocos: [
        {
          tipo: "texto",
          texto: "Crie um arquivo simples para testar — pode ser o index.html que você vai usar na Atividade 1. Depois, siga os três passos abaixo.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 1 — git add",
        },
        {
          tipo: "texto",
          texto: "Coloca o(s) arquivo(s) na área de staging (preparação para o commit):",
        },
        {
          tipo: "codigo",
          conteudo: `# adiciona um arquivo específico
git add index.html

# adiciona TODOS os arquivos novos/modificados de uma vez
git add .`,
        },
        {
          tipo: "texto",
          texto: "O . significa \"aqui\" — ou seja, \"adicione tudo que mudou nesta pasta\". É o jeito mais comum de usar no dia a dia.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 2 — git commit",
        },
        {
          tipo: "texto",
          texto: "Agora sim, salva de verdade os arquivos que estão staged, junto com uma mensagem explicando o que foi feito:",
        },
        {
          tipo: "codigo",
          conteudo: "git commit -m \"cria estrutura inicial da página\"",
        },
        {
          tipo: "texto",
          texto: "A flag -m significa \"mensagem\" — tudo que vier entre aspas depois dela é a descrição do commit.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Como escrever uma boa mensagem de commit",
          texto: "",
          itens: [
            "Escreva no presente: \"adiciona seção de preços\", não \"adicionei\";",
            "Seja específico: \"corrige menu que não fechava no celular\" é melhor que \"correção\";",
            "Um commit, uma ideia — não junte \"cria header e footer e corrige bug do JS\" num commit só;",
            "Evite mensagens genéricas como \"mudanças\" ou \"update\".",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Passo 3 — conferindo o histórico",
        },
        {
          tipo: "codigo",
          conteudo: "git log",
        },
        {
          tipo: "texto",
          texto: "Mostra todos os commits já feitos, do mais recente para o mais antigo, com autor, data e mensagem. Para sair dessa tela, aperte a tecla q.",
        },
      ],
    },
    {
      id: "6-conectando-ao-github-e-enviando-pela-primeira-",
      titulo: "6. Conectando ao GitHub e enviando pela primeira vez",
      blocos: [
        {
          tipo: "texto",
          texto: "Até aqui, tudo que você fez existe só no seu computador. Agora vamos ligar essa pasta ao repositório que você criou no Capítulo 3.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 1 — git remote add",
        },
        {
          tipo: "texto",
          texto: "Use o endereço HTTPS que você copiou do GitHub:",
        },
        {
          tipo: "codigo",
          conteudo: "git remote add origin https://github.com/seu-usuario/meu-site-saas.git",
        },
        {
          tipo: "texto",
          texto: "Um remote é um \"apelido\" para um repositório que vive em outro lugar — nesse caso, no GitHub. origin é o nome padrão usado pela comunidade inteira para o remoto principal.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 2 — nomeando a branch principal",
        },
        {
          tipo: "codigo",
          conteudo: "git branch -M main",
        },
        {
          tipo: "texto",
          texto: "Garante que sua branch (linha do tempo de commits) principal se chama main, o padrão atual do GitHub.",
        },
        {
          tipo: "subtitulo",
          texto: "Passo 3 — git push",
        },
        {
          tipo: "codigo",
          conteudo: "git push -u origin main",
        },
        {
          tipo: "texto",
          texto: "Envia todos os seus commits para o GitHub. A flag -u (\"upstream\") faz o Git memorizar essa ligação entre sua branch local e a do GitHub — da próxima vez, basta digitar git push, sem precisar repetir tudo.",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Sobre login: git push Personal Access Token GitHub → Settings → Developer settings → Personal access tokens",
        },
        {
          tipo: "texto",
          texto: "Depois do push, atualize a página do seu repositório no GitHub — seus arquivos devem aparecer lá.",
        },
      ],
    },
    {
      id: "7-o-ciclo-do-dia-a-dia",
      titulo: "7. O ciclo do dia a dia",
      blocos: [
        {
          tipo: "texto",
          texto: "A partir de agora, toda vez que você for trabalhar na sua atividade, o fluxo é sempre o mesmo:",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "O ciclo",
          texto: "",
          itens: [
            "git status — o que eu mudei desde a última vez?",
            "git add . — prepara tudo que mudou;",
            "git commit -m \"mensagem\" — salva com uma descrição;",
            "git push — envia pro GitHub.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "git diff — vendo exatamente o que mudou",
        },
        {
          tipo: "texto",
          texto: "Antes de commitar, você pode conferir linha por linha o que foi alterado:",
        },
        {
          tipo: "codigo",
          conteudo: "git diff",
        },
        {
          tipo: "texto",
          texto: "Linhas em vermelho foram removidas, linhas em verde foram adicionadas. Aperte q para sair.",
        },
        {
          tipo: "subtitulo",
          texto: "Commits pequenos e frequentes",
        },
        {
          tipo: "texto",
          texto: "Prefira vários commits pequenos e lógicos a um único commit gigante no final:",
        },
        {
          tipo: "codigo",
          conteudo: `✅ bom
git commit -m "cria estrutura HTML da página inicial"
git commit -m "estiliza o cabeçalho e o menu"
git commit -m "adiciona menu responsivo com JavaScript"

❌ ruim
git commit -m "site pronto"`,
        },
        {
          tipo: "texto",
          texto: "Além de mais fácil de entender, se algo quebrar você consegue achar exatamente em qual commit o problema começou.",
        },
      ],
    },
    {
      id: "8-o-arquivo-gitignore",
      titulo: "8. O arquivo .gitignore",
      blocos: [
        {
          tipo: "texto",
          texto: "Nem tudo que existe na sua pasta deveria ir para o GitHub — arquivos temporários, configurações locais do seu editor, ou pastas geradas automaticamente. O .gitignore resolve isso.",
        },
        {
          tipo: "subtitulo",
          texto: "Como criar",
        },
        {
          tipo: "texto",
          texto: "Crie, na pasta raiz do seu projeto, um arquivo chamado exatamente .gitignore (com o ponto no início, sem extensão). Escreva uma regra por linha — cada linha é um arquivo, pasta ou padrão que o Git deve ignorar.",
        },
        {
          tipo: "codigo",
          conteudo: `# pasta de dependências (se você usar alguma ferramenta com Node.js)
node_modules/

# arquivos do sistema operacional
.DS_Store
Thumbs.db

# arquivos de configuração do seu editor
.vscode/`,
          rotulo: ".gitignore",
        },
        {
          tipo: "texto",
          texto: ".gitignore",
        },
        {
          tipo: "texto",
          texto: "git add .gitignore",
        },
        {
          tipo: "texto",
          texto: "git commit -m \"adiciona gitignore\"",
        },
      ],
    },
    {
      id: "9-salvando-suas-atividades-a-parte-mais-importan",
      titulo: "9. Salvando suas atividades (a parte mais importante)",
      blocos: [
        {
          tipo: "texto",
          texto: "As atividades desta aba não têm prazo de entrega fixo — elas são propositalmente grandes, para você desenvolver ao longo de várias aulas, no seu ritmo. Isso muda a forma como você deve pensar sobre commits.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "A regra de ouro",
          texto: "Cada commit é um checkpoint salvo do seu progresso. Como não existe uma data única de entrega, o commit substitui o \"entreguei a atividade\" — é o seu histórico de commits que mostra que você trabalhou nela ao longo do tempo.",
        },
        {
          tipo: "subtitulo",
          texto: "Rotina sugerida",
        },
        {
          tipo: "lista",
          itens: [
            "Terminou uma parte da atividade (uma seção da página, um efeito novo, uma correção)? Faça um commit;",
            "No fim de cada aula ou sessão de trabalho, sempre rode git push — garante que está salvo na nuvem, não só no seu computador;",
            "Se for testar algo arriscado (mudar bastante código de uma vez), commite antes de mexer — assim, se der errado, você sempre tem para onde voltar.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "O que o seu instrutor vai olhar",
        },
        {
          tipo: "texto",
          texto: "Seu instrutor vai acompanhar o histórico de commits no GitHub, não só o resultado final. Vários commits pequenos e bem descritos ao longo do tempo mostram seu processo de trabalho — é isso que comprova que a atividade foi feita por você, aos poucos, e não copiada de uma vez no último minuto.",
        },
        {
          tipo: "texto",
          texto: "Resumindo:",
        },
      ],
    },
    {
      id: "10-erros-comuns-e-como-resolver",
      titulo: "10. Erros comuns e como resolver",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "\"fatal: not a git repository\"",
        },
        {
          tipo: "texto",
          texto: "Você tentou rodar um comando do Git numa pasta que não é (ou ainda não é) um repositório.",
        },
        {
          tipo: "codigo",
          conteudo: `# confira em qual pasta você está
pwd

# se for a pasta certa e ainda faltar iniciar:
git init`,
        },
        {
          tipo: "subtitulo",
          texto: "\"Please tell me who you are\"",
        },
        {
          tipo: "texto",
          texto: "Você esqueceu de configurar seu nome e e-mail (Capítulo 2). Rode:",
        },
        {
          tipo: "codigo",
          conteudo: `git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"`,
        },
        {
          tipo: "subtitulo",
          texto: "\"failed to push some refs\"",
        },
        {
          tipo: "texto",
          texto: "O GitHub tem commits que você ainda não tem na sua cópia local (por exemplo, se você editou algo direto pelo site, ou trabalhou em outro computador). Antes de enviar de novo, traga essas mudanças:",
        },
        {
          tipo: "codigo",
          conteudo: "git pull origin main",
        },
        {
          tipo: "texto",
          texto: "Depois, tente o git push de novo.",
        },
        {
          tipo: "subtitulo",
          texto: "Commitei um arquivo por engano, antes do push",
        },
        {
          tipo: "texto",
          texto: "Se ainda não deu push, dá para desfazer o último commit mantendo as alterações nos arquivos (elas voltam para staging):",
        },
        {
          tipo: "codigo",
          conteudo: "git reset --soft HEAD~1",
        },
        {
          tipo: "subtitulo",
          texto: "Esqueci de dar um commit e a mensagem ficou errada",
        },
        {
          tipo: "texto",
          texto: "Se for o commit mais recente e você ainda não fez push, dá para corrigir a mensagem:",
        },
        {
          tipo: "codigo",
          conteudo: "git commit --amend -m \"mensagem correta\"",
        },
      ],
    },
    {
      id: "11-resumo-todos-os-comandos",
      titulo: "11. Resumo — todos os comandos",
      blocos: [
        {
          tipo: "texto",
          texto: "Guarde esta página como referência rápida para consultar durante qualquer atividade.",
        },
        {
          tipo: "tabela",
          colunas: ["Comando","Para que serve"],
          linhas: [
            ["git --version","Confirma que o Git está instalado."],
            ["git config --global user.name \"...\"","Define seu nome nos commits (uma vez só)."],
            ["git config --global user.email \"...\"","Define seu e-mail nos commits (uma vez só)."],
            ["git init","Transforma a pasta atual em um repositório Git."],
            ["git status","Mostra o que mudou desde o último commit."],
            ["git add .","Prepara todos os arquivos modificados para o commit."],
            ["git add nome-do-arquivo","Prepara só aquele arquivo específico."],
            ["git commit -m \"mensagem\"","Salva os arquivos preparados com uma descrição."],
            ["git log","Mostra o histórico de commits."],
            ["git diff","Mostra as mudanças linha por linha antes de commitar."],
            ["git remote add origin URL","Liga sua pasta local a um repositório no GitHub."],
            ["git branch -M main","Nomeia a branch principal como main."],
            ["git push -u origin main","Envia os commits para o GitHub (primeira vez)."],
            ["git push","Envia os commits para o GitHub (demais vezes)."],
            ["git pull origin main","Traz para o computador mudanças que estão só no GitHub."],
          ],
        },
        {
          tipo: "texto",
          texto: "Pronto!",
        },
        {
          tipo: "texto",
          texto: "Atividade 1 — Site SaaS",
        },
      ],
    },
  ],
};

export default atividade;
