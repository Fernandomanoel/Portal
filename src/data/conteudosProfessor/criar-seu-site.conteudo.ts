import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso une HTML, CSS, JavaScript e um pouco de Python para construir sites completos, e ensina a controlar versões com Git e GitHub. Parte do princípio de que o aluno já viu o básico e agora monta projetos de verdade.",
  topicos: [
    {
      titulo: "Controle de versão com Git e GitHub",
      texto: [
        "Git guarda o histórico de um projeto: cada commit é um ponto salvo, com uma mensagem. GitHub é um serviço online que hospeda repositórios Git e permite compartilhar o código. Comandos essenciais: git init (começar), git add (preparar arquivos), git commit -m 'mensagem' (salvar), git push (enviar ao GitHub) e git pull (trazer mudanças). Um .gitignore evita enviar arquivos que não devem ir.",
      ],
      pontos: ["Criar um repositório e fazer o primeiro commit.", "Enviar o projeto ao GitHub."],
      erros: ["Mensagens de commit vagas («mudanças»).", "Subir senhas ou chaves para o repositório."],
      atividades: ["site-git-repositorio"],
    },
    {
      titulo: "Estrutura de um site: landing page",
      texto: [
        "Uma landing page apresenta um produto em uma página só: cabeçalho com menu, seção de destaque (título forte e botão de chamada para ação), recursos, planos e preços, contato e rodapé. Cada seção é uma tag semântica. O layout se monta com Flexbox e Grid e se adapta às telas com media queries.",
      ],
      pontos: ["Planejar as seções antes de escrever o código.", "Organizar a página com tags semânticas."],
      atividades: ["site-atividade1-saas"],
    },
    {
      titulo: "Imagens, direitos autorais e desempenho",
      texto: [
        "Imagens devem ter licença de uso (bancos livres, como Unsplash ou Pexels, ou imagens próprias) e peso adequado (comprimidas) para a página carregar rápido. Texto alternativo (alt) é obrigatório para acessibilidade.",
      ],
      pontos: ["Escolher imagens com licença adequada.", "Reduzir o tamanho de uma imagem."],
    },
    {
      titulo: "Back-end simples com Python e Flask",
      texto: [
        "O front-end roda no navegador; o back-end roda no servidor. Flask é um framework Python que cria rotas: cada endereço executa uma função e devolve uma página. Os templates Jinja geram HTML com dados dinâmicos (como a lista de projetos). Formulários enviam dados por POST ao servidor.",
      ],
      pontos: ["Explicar a diferença entre front-end e back-end.", "Criar uma rota simples no Flask."],
      atividades: ["site-atividade2-portfolio-python"],
    },
    {
      titulo: "Publicação e boas práticas",
      texto: [
        "Publicar é colocar o site em um servidor acessível pela internet (GitHub Pages para sites estáticos, outros serviços para os que têm back-end). Antes de publicar: testar em outros navegadores e no celular, revisar textos, conferir links e acessibilidade.",
      ],
      pontos: ["Listar um checklist antes de publicar."],
    },
  ],
  glossario: [
    { termo: "Commit", definicao: "Ponto salvo no histórico do projeto." },
    { termo: "Repositório", definicao: "Pasta de projeto controlada pelo Git." },
    { termo: "Landing page", definicao: "Página única que apresenta uma oferta." },
    { termo: "Front-end / back-end", definicao: "Parte que roda no navegador / parte que roda no servidor." },
    { termo: "Flask", definicao: "Framework Python para criar aplicações web." },
    { termo: "Deploy", definicao: "Publicação do site em um servidor." },
  ],
  dicas: [
    "Peça commits pequenos e frequentes desde a primeira aula.",
    "Valorize o planejamento: um esboço no papel economiza horas.",
    "Mostre o histórico de commits de um projeto como se fosse o «diário» do trabalho.",
  ],
};

export default conteudo;
