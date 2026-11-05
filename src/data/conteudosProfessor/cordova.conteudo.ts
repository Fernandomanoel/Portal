import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso ensina a criar um aplicativo de celular com tecnologias da web: Ionic (componentes visuais) e Cordova (empacotamento para Android). Parte de HTML, CSS e JavaScript/TypeScript e chega ao aplicativo rodando no emulador. Versões de ferramentas mudam rápido: confira a documentação atual.",
  topicos: [
    {
      titulo: "Aplicativo híbrido: ideia geral",
      texto: [
        "Um aplicativo híbrido é feito com tecnologias da web (HTML, CSS, JavaScript) e empacotado como app instalável. Cordova coloca a página dentro de um «contêiner» nativo e dá acesso a recursos do aparelho (câmera, localização) por plugins. Ionic oferece componentes prontos com visual de aplicativo móvel. A vantagem é escrever uma vez e gerar para Android e iOS; a limitação é desempenho menor que o nativo em casos pesados.",
      ],
      pontos: ["Explicar a diferença entre app nativo e híbrido.", "Dizer o papel do Cordova e do Ionic."],
      atividades: ["cordova-primeiros-passos"],
    },
    {
      titulo: "Preparando o ambiente",
      texto: [
        "São necessários: Node.js (com o gerenciador npm), o editor de código, o Ionic CLI (npm install -g @ionic/cli), o Cordova, o Java JDK e o Android Studio com o SDK e um emulador (dispositivo virtual). Variáveis de ambiente apontam para o SDK. Falhas de ambiente são a maior fonte de dificuldade: reserve tempo para isso na primeira aula.",
      ],
      pontos: ["Listar as ferramentas necessárias.", "Criar um projeto de teste com ionic start."],
      erros: ["Variáveis de ambiente do Android não configuradas.", "Versões incompatíveis de Node, Java e Gradle."],
    },
    {
      titulo: "Componentes e páginas do Ionic",
      texto: [
        "O Ionic usa componentes como ion-header, ion-content, ion-list, ion-item, ion-button e ion-card. Um aplicativo é feito de páginas e navegação entre elas. Cada componente tem propriedades que mudam a aparência e o comportamento. Os estilos se adaptam ao sistema (visual Android ou iOS).",
      ],
      pontos: ["Montar uma página com cabeçalho e lista.", "Navegar de uma página a outra."],
      atividades: ["cordova-componentes-visuais"],
    },
    {
      titulo: "Lógica, dados e estado",
      texto: [
        "A lógica fica em TypeScript/JavaScript: variáveis ligadas ao visual, eventos de clique, listas de itens e formulários. Para guardar dados no aparelho, usa-se armazenamento local; para dados remotos, requisições HTTP a uma API.",
      ],
      pontos: ["Ligar um botão a uma função.", "Mostrar uma lista a partir de um array."],
      atividades: ["cordova-javascript-e-listas", "cordova-localstorage-e-emulador"],
    },
    {
      titulo: "Executar no emulador e gerar o app",
      texto: [
        "Com o comando de execução (ionic cordova run android ou o equivalente da versão em uso) o aplicativo é compilado e aberto no emulador ou em um celular conectado por USB com a depuração ativada. O resultado final é um arquivo .apk (instalável) ou .aab (para a loja). Para publicar na Play Store há assinatura e conta de desenvolvedor.",
      ],
      pontos: ["Rodar o app no emulador.", "Dizer o que é um APK."],
      atividades: ["cordova-localstorage-e-emulador", "cordova-projeto-final", "cordova-projeto-livre-rede-social"],
    },
  ],
  glossario: [
    { termo: "Cordova", definicao: "Ferramenta que empacota uma aplicação web como app de celular." },
    { termo: "Ionic", definicao: "Framework de componentes visuais para apps móveis com tecnologias web." },
    { termo: "Emulador", definicao: "Celular virtual que roda no computador." },
    { termo: "APK", definicao: "Arquivo de instalação de aplicativos Android." },
    { termo: "Plugin", definicao: "Extensão que dá acesso a um recurso do aparelho." },
    { termo: "SDK", definicao: "Kit de desenvolvimento com as ferramentas da plataforma." },
  ],
  dicas: [
    "Teste o ambiente em um computador antes da aula: emuladores exigem bastante memória.",
    "Tenha plano B: executar no navegador (ionic serve) para a parte visual quando o emulador falhar.",
    "Anote as versões que funcionaram na sua máquina: elas ajudam na próxima turma.",
  ],
};

export default conteudo;
