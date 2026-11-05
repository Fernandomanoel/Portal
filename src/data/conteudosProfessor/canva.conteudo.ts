import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O Canva é uma ferramenta online de design que permite criar posts, apresentações e vídeos a partir de modelos. O curso trabalha princípios de design, formatos de redes sociais, carrosséis, edição de imagem e vídeo e recursos de IA. Os recursos e planos mudam com frequência.",
  topicos: [
    {
      titulo: "Interface e formatos",
      texto: [
        "Escolhe-se o formato do design (post de Instagram em 1080 × 1350 px, story em 1080 × 1920 px, apresentação, vídeo). A interface tem painéis laterais (modelos, elementos, textos, uploads, marca) e uma área central de edição. Cada formato tem uma proporção: errar o formato obriga a refazer a arte. Pode-se redimensionar designs em planos que oferecem esse recurso.",
      ],
      pontos: ["Escolher o formato certo para cada rede.", "Usar um modelo e adaptá-lo."],
    },
    {
      titulo: "Princípios básicos de design",
      texto: [
        "Hierarquia: o que é mais importante deve aparecer maior. Contraste: texto legível sobre o fundo. Alinhamento e espaço em branco: elementos organizados e respiro. Repetição: poucas fontes (no máximo duas ou três) e uma paleta de cores coerente com a marca. Evite texto demais e imagens de baixa qualidade.",
      ],
      pontos: ["Aplicar hierarquia em um post.", "Escolher uma paleta de cores e duas fontes."],
      erros: ["Muitas fontes e cores.", "Texto claro sobre fundo claro."],
    },
    {
      titulo: "Post carrossel",
      texto: [
        "O carrossel é uma sequência de imagens deslizantes: a primeira (capa) precisa prender a atenção com uma promessa clara; as seguintes desenvolvem uma ideia por página, e a última traz o fechamento e uma chamada para ação. Mantenha a identidade visual igual nas páginas.",
      ],
      pontos: ["Planejar um carrossel com capa, desenvolvimento e chamada para ação."],
      atividades: ["canva-avaliacao-carrossel"],
    },
    {
      titulo: "Imagem, vídeo e recursos de IA",
      texto: [
        "O Canva permite editar imagens (remover fundo, ajustar, efeitos), montar vídeos (cortes, transições, música, legendas) e usar recursos de IA para gerar imagens e textos. Verifique direitos: elementos e músicas têm licenças, e algumas exigem plano pago. O vídeo deve ter ritmo e legendas, porque muita gente assiste sem som.",
      ],
      pontos: ["Remover o fundo de uma imagem.", "Montar um vídeo curto com legendas."],
      atividades: ["canva-avaliacao-carrossel"],
    },
    {
      titulo: "Exportar, compartilhar e colaborar",
      texto: [
        "Exporta-se como PNG (imagens e transparência), JPG (arquivos menores), PDF (impressão e documentos) e MP4 (vídeos). Também é possível compartilhar um link, convidar pessoas para editar e guardar a identidade da marca (cores, fontes e logo) em um kit de marca, quando o plano oferece.",
      ],
      pontos: ["Escolher o formato de exportação.", "Compartilhar um design."],
    },
  ],
  glossario: [
    { termo: "Hierarquia visual", definicao: "Organização que mostra o que é mais importante." },
    { termo: "Paleta de cores", definicao: "Conjunto de cores usado em um projeto." },
    { termo: "Carrossel", definicao: "Post com várias páginas deslizantes." },
    { termo: "Kit de marca", definicao: "Cores, fontes e logo de uma marca guardados no Canva." },
    { termo: "CTA", definicao: "Chamada para ação." },
  ],
  dicas: [
    "Peça um post de uma empresa fictícia e avalie hierarquia, contraste e legibilidade no celular.",
    "Mostre o design no celular: muito texto pequeno some na tela.",
    "Respeite as licenças: use elementos permitidos no plano da escola.",
  ],
};

export default conteudo;
