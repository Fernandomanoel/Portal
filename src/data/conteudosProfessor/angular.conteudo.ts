import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Angular é um framework do Google, em TypeScript, para criar aplicações web de página única (SPA). O curso apresenta o ambiente, componentes, ligação de dados, diretivas, serviços, rotas e formulários. As versões mudam com frequência: confira a documentação atual.",
  topicos: [
    {
      titulo: "O que é Angular e como criar um projeto",
      texto: [
        "Angular organiza a aplicação em componentes reutilizáveis. É escrito em TypeScript, um JavaScript com tipos, que o navegador não entende diretamente: o projeto é compilado. Para criar um projeto usa-se o Angular CLI: npm install -g @angular/cli, depois ng new nome-do-projeto e ng serve para abrir o servidor de desenvolvimento. Requer o Node.js.",
      ],
      pontos: ["Criar e rodar um projeto com o Angular CLI.", "Explicar o que é TypeScript."],
    },
    {
      titulo: "Componentes e templates",
      texto: [
        "Um componente tem uma classe (TypeScript, com os dados e a lógica), um template (HTML) e estilos (CSS). Criam-se com ng generate component nome. O componente raiz abriga outros, formando uma árvore. Os componentes se comunicam: o pai envia dados ao filho por @Input e o filho avisa o pai por @Output.",
      ],
      pontos: ["Criar um componente e usá-lo em outro.", "Passar um dado ao componente filho."],
    },
    {
      titulo: "Ligação de dados e diretivas",
      texto: [
        "A ligação de dados conecta classe e template: interpolação {{ valor }}, ligação de propriedade [propriedade]='valor', ligação de evento (click)='metodo()' e ligação bidirecional [(ngModel)]. As diretivas estruturais controlam o HTML: *ngIf (mostra se for verdadeiro) e *ngFor (repete para cada item). Nas versões mais novas há também a sintaxe de controle de fluxo @if e @for.",
      ],
      pontos: ["Mostrar uma lista com *ngFor ou @for.", "Tratar um evento de clique."],
    },
    {
      titulo: "Serviços, injeção de dependência e HTTP",
      texto: [
        "Serviço é uma classe com lógica compartilhada (acesso a dados, cálculos), injetada nos componentes que precisam dela (injeção de dependência). Para buscar dados de uma API usa-se o HttpClient, que devolve Observables: fluxos de dados que o componente assina para receber os valores quando chegam.",
      ],
      pontos: ["Criar um serviço e injetá-lo em um componente.", "Explicar para que serve o HttpClient."],
    },
    {
      titulo: "Rotas e formulários",
      texto: [
        "O roteador mostra um componente diferente conforme o endereço, sem recarregar a página (SPA). Cada rota liga um caminho a um componente, e routerLink cria os links. Os formulários podem ser orientados a template (ngModel) ou reativos (FormGroup e FormControl), com validações (obrigatório, e-mail, tamanho mínimo).",
      ],
      pontos: ["Configurar duas rotas.", "Validar um campo de formulário."],
    },
  ],
  glossario: [
    { termo: "SPA", definicao: "Aplicação de página única, que troca o conteúdo sem recarregar a página." },
    { termo: "Componente", definicao: "Bloco reutilizável com lógica, template e estilo." },
    { termo: "Diretiva", definicao: "Instrução que muda o comportamento ou o HTML." },
    { termo: "Serviço", definicao: "Classe com lógica compartilhada entre componentes." },
    { termo: "Observable", definicao: "Fluxo de dados que pode ser assinado." },
    { termo: "TypeScript", definicao: "JavaScript com tipos, compilado para JavaScript." },
  ],
  dicas: [
    "Revise o JavaScript e o TypeScript básicos antes de entrar no framework.",
    "Use o ng serve com o navegador ao lado: o aluno vê o resultado a cada salvamento.",
    "Peça que os alunos leiam os erros do terminal e do console: o Angular costuma ser bem descritivo.",
  ],
};

export default conteudo;
