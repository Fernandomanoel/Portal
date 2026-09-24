import imagemAura from "@/assets/atividades/photoshop/aura-e-luz-de-contorno.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const atividade: AtividadeAutocorrigida = {
  titulo: "Adobe Photoshop — Grau 8 (Bônus): Auras e Efeitos de Invocação",
  introducao:
    "Um extra além dos 7 graus do curso principal. Pega a técnica de Composição Avançada do Grau 6 e aplica em um estilo divertido: fazer parecer que um elemento gráfico — uma criatura, um \"poder\", uma aura — está sendo invocado atrás de uma pessoa, com brilho e efeitos de luz.",
  itens: [
    {
      id: "recorte-fundo-nao-uniforme",
      titulo: "Recorte com Fundo Não Uniforme",
      cenario:
        "No Grau 1, remover fundo era fácil porque o fundo era liso. Fotos reais (retratos, fotos de ambiente) têm fundo com várias cores e texturas diferentes — a Seleção Rápida sozinha não dá conta.",
      passos: [
        "Seleção Rápida (tecla W) sobre o sujeito, sem se preocupar com perfeição ainda.",
        "Selecionar e Máscara (Grau 6) → pincel Aperfeiçoar Borda nos contornos difíceis (cabelo, ombros).",
        "Ative Decontaminar Cores se sobrar qualquer resquício do fundo antigo.",
        "Saída para \"Nova Camada com Máscara\".",
      ],
      aviso:
        "fundos escuros com roupas escuras (uma pessoa de preto em uma sala escura, por exemplo) são o caso mais difícil — vale a pena aumentar bastante o zoom e refinar aos poucos, região por região.",
    },
    {
      id: "luz-de-contorno",
      titulo: "Luz de Contorno (Rim Light)",
      instrucao: "Um brilho fino na borda voltada para a fonte de luz da cena faz o elemento parecer parte dela, não colado por cima.",
      imagem: {
        url: imagemAura,
        alt: "Silhueta com um traço de luz de contorno na borda e uma aura roxa e dourada atrás dela",
        legenda: "A luz de contorno vai só no lado voltado para a fonte de luz; a aura é um brilho radial atrás do elemento.",
      },
      passos: [
        "Nova camada, presa (clipping mask, Grau 5) ao elemento recortado.",
        "Modo de mesclagem \"Linear Dodge (Add)\" ou \"Tela\" (Grau 2).",
        "Pincel macio, cor quente clara, pinte só na borda voltada para a luz da cena (topo, ombro).",
        "Reduza a Opacidade até ficar sutil.",
      ],
      aviso: "luz de contorno em volta do elemento inteiro não existe na realidade e entrega a montagem — pinte só no lado certo.",
      desafio:
        "experimente duas cores de luz de contorno diferentes nos dois lados do sujeito (ex.: quente de um lado, fria do outro) — a técnica de \"iluminação de duas cores\" usada em pôsteres de cinema e capas de álbum.",
    },
    {
      id: "auras-e-brilhos",
      titulo: "Auras e Brilhos Coloridos",
      instrucao: "Uma aura é só um gradiente radial colorido, numa camada abaixo do elemento, desfocado nas bordas.",
      passos: [
        "Nova camada, abaixo do elemento a \"iluminar\".",
        "Ferramenta Gradiente (Grau 2), radial, cor da aura no centro → transparente nas bordas.",
        "Desfoque Gaussiano leve (Grau 5) para suavizar.",
        "Modo de mesclagem \"Tela\" ou \"Linear Dodge\", opacidade a gosto.",
      ],
      objetivo:
        "Duas auras sobrepostas — uma mais larga e fraca, outra mais concentrada e forte — dão mais profundidade do que uma única aura grande.",
    },
    {
      id: "texto-de-efeito",
      titulo: "Texto de Efeito como Elemento Gráfico",
      instrucao: "Mesma lógica dos Estilos de Camada do Grau 4 (Contorno + Brilho), aplicada em texto de impacto/onomatopeia.",
      passos: [
        "Ferramenta Texto (Grau 4), fonte bem grossa/condensada.",
        "Estilo de Camada → Contorno grosso + Brilho Externo colorido (Grau 4).",
        "Posicione em um canto vazio da composição, sem cobrir o rosto do sujeito.",
      ],
      aviso: "um exagero comum: texto grande demais competindo com o elemento principal. Ele deve ser um tempero, não o centro da composição.",
    },
    {
      id: "unificando-tudo",
      titulo: "Unificando Tudo",
      instrucao: "Recapitulando o Grau 6, agora com foco neste estilo específico:",
      tabelaReferencia: {
        colunas: ["Técnica", "Onde já foi ensinada"],
        linhas: [
          ["Camada de cor global (gel quente/frio)", "Grau 6"],
          ["Ruído/grão por cima de tudo", "Grau 6"],
          ["Sombra de contato para o sujeito \"pisar\" na cena", "Grau 6"],
          ["Vinheta escurecendo as bordas", "Filtro → Correção de Lente → Personalizado, Quantidade negativa"],
        ],
      },
      aviso: "a vinheta direciona o olho para o centro da composição — sutil, quase imperceptível olhando direto, mas nota-se a falta dela ao comparar com/sem.",
    },
    {
      id: "pratica-sua-invocacao",
      titulo: "Prática — Sua Invocação",
      instrucao: "Combine uma foto sua (ou de qualquer pessoa) com um elemento gráfico de sua escolha, aplicando pelo menos 4 técnicas deste grau.",
      tabelaReferencia: {
        colunas: ["Checklist da prática"],
        linhas: [
          ["Sujeito recortado com fundo não uniforme"],
          ["Luz de contorno aplicada"],
          ["Aura/brilho atrás do elemento"],
          ["Texto de efeito (opcional, mas recomendado)"],
          ["Grão + vinheta + cor global unificando tudo"],
        ],
      },
      desafio: "use pelo menos 4 das técnicas deste grau na mesma composição.",
    },
    {
      id: "atalhos-grau8",
      titulo: "Atalhos do Grau 8 — Cola Rápida",
      tabelaReferencia: {
        colunas: ["Ação", "Caminho"],
        linhas: [
          ["Selecionar e Máscara", "Barra de Opções, com uma seleção ativa"],
          ["Clipping mask", "Alt + clique entre camadas"],
          ["Ferramenta Gradiente (radial)", "Tecla G"],
          ["Vinheta", "Filtro → Correção de Lente → Personalizado"],
        ],
      },
    },
  ],
};

export default atividade;
