import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "WordPress é um sistema de gerenciamento de conteúdo (CMS) que permite criar e manter sites sem programar tudo do zero. O curso cobre instalação, painel, páginas e posts, temas, plugins, menus, mídia, usuários e segurança básica.",
  topicos: [
    {
      titulo: "CMS e as duas versões do WordPress",
      texto: [
        "Um CMS separa conteúdo (textos, imagens) de aparência (tema), o que permite alterar um sem refazer o outro. Existem o WordPress.com (serviço hospedado, mais simples, com limites no plano gratuito) e o WordPress.org (software livre, instalado em hospedagem própria, com liberdade total e mais responsabilidade). Para aprender é comum usar um ambiente local ou uma hospedagem de teste.",
      ],
      pontos: ["Diferenciar WordPress.com de WordPress.org.", "Explicar a vantagem de um CMS."],
    },
    {
      titulo: "Painel, páginas e posts",
      texto: [
        "O painel administrativo fica em /wp-admin. Páginas são conteúdo fixo (Sobre, Contato). Posts são conteúdo em ordem cronológica (blog), organizados em categorias e tags. O editor de blocos (Gutenberg) monta o conteúdo com blocos de parágrafo, imagem, título, lista, botão e outros. Rascunho, agendamento e publicação são estados do conteúdo.",
      ],
      pontos: ["Criar uma página e um post.", "Explicar a diferença entre página e post."],
    },
    {
      titulo: "Temas, personalização e menus",
      texto: [
        "O tema define a aparência: cores, fontes e layout. Pode ser personalizado no Personalizador ou no Editor do Site (temas de blocos). Os menus são montados em Aparência: ligam páginas, categorias e links. Um tema bem escolhido deve ser leve, responsivo (adaptar-se ao celular) e atualizado.",
      ],
      pontos: ["Instalar e ativar um tema.", "Montar o menu principal."],
    },
    {
      titulo: "Plugins",
      texto: [
        "Plugins acrescentam recursos: formulário de contato, SEO, loja virtual (WooCommerce), cópias de segurança, cache. Instale poucos, de fontes confiáveis e mantenha-os atualizados: plugins desatualizados são a principal porta de invasão de sites WordPress.",
      ],
      pontos: ["Instalar um plugin de formulário.", "Explicar o risco de plugins desatualizados."],
      erros: ["Instalar plugins piratas ou desnecessários."],
    },
    {
      titulo: "Segurança, manutenção e desempenho",
      texto: [
        "Boas práticas: senhas fortes e autenticação em dois fatores, usuários com a função mínima necessária (administrador, editor, autor, colaborador), atualizações de núcleo, tema e plugins, cópias de segurança regulares e certificado HTTPS. Imagens comprimidas e cache melhoram a velocidade.",
      ],
      pontos: ["Listar medidas básicas de segurança.", "Explicar as funções de usuário."],
    },
  ],
  glossario: [
    { termo: "CMS", definicao: "Sistema que gerencia o conteúdo de um site." },
    { termo: "Tema", definicao: "Conjunto de arquivos que define a aparência do site." },
    { termo: "Plugin", definicao: "Extensão que acrescenta funções ao site." },
    { termo: "Gutenberg", definicao: "Editor de blocos do WordPress." },
    { termo: "Hospedagem", definicao: "Serviço que mantém o site disponível na internet." },
    { termo: "HTTPS", definicao: "Conexão segura entre o navegador e o site." },
  ],
  dicas: [
    "Tenha um ambiente de teste pronto (local ou hospedagem) para cada aluno.",
    "Defina um tema para o site de cada aluno (uma loja, um portfólio) para manter o foco.",
    "Reforce que atualizar e fazer backup é rotina, não opção.",
  ],
};

export default conteudo;
