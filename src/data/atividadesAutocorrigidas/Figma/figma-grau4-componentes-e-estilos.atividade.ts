import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, escolha, resposta } from "../ajudantes";
import { comFigura, figura } from "../figmaComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Figma — Grau 4: Componentes, Variantes e Estilos",
  introducao:
    "Um app tem dezenas de botões iguais. Se cada um é uma cópia solta, mudar a cor da marca vira uma maratona. Componentes e estilos resolvem isso: você desenha uma vez e reutiliza em todo lugar, e uma alteração no original chega a todas as cópias. É o coração de um sistema de design.",
  itens: [
    comFigura(
      {
        id: "criar-componente",
        titulo: "Criando o seu primeiro componente",
        cenario: "Componente é um elemento reutilizável. O original se chama componente principal (main component) e é marcado por um losango roxo cheio; as cópias são instâncias, com losango vazado.",
        passos: [
          "Use o botão que você criou no Grau 3 (\"Botão primário\", com Auto Layout).",
          "Selecione o botão no canvas ou no painel de camadas.",
          "Tecle Ctrl + Alt + K (ou use o botão de losango na barra superior: Criar componente).",
          "Observe: o ícone da camada vira um losango roxo e o quadro ganha uma moldura roxa.",
          "Renomeie o componente para \"Botão primário\" — o nome aparece na lista de componentes do arquivo.",
          "Mova o componente principal para uma área à parte do canvas, chamada \"Componentes\" (uma seção ou quadro grande): ele é a matriz, não a tela.",
        ],
        aviso: "O componente principal não deve ficar dentro de uma tela. Se ele for apagado ou mudado sem querer, todas as instâncias mudam junto.",
        objetivo: "Ter uma matriz para o botão, em vez de um botão avulso.",
      },
      figura("criar-componente", "Figma com um botão roxo selecionado; a camada tem o losango roxo e o quadro uma moldura roxa com a etiqueta Botão primário.", "Ctrl + Alt + K transforma o objeto em componente."),
    ),
    comFigura(
      escolha({
        id: "instancias",
        titulo: "Instâncias: cópias que obedecem",
        blocos: [
          { tipo: "texto", texto: "Para usar o componente, arraste-o do painel de recursos (Assets) para a tela, ou copie com Alt + arrastar. Cada cópia é uma instância ligada ao principal." },
          { tipo: "lista", itens: ["Mudou o principal (cor, raio, fonte)? Todas as instâncias acompanham.", "Mudou o texto de uma instância? Só ela muda — o vínculo continua.", "Mudou a cor de uma instância? Vira uma exceção só dela (aparece com ponto azul no painel). Use com moderação."] },
          { tipo: "nota", variante: "dica", texto: "Teste agora: coloque 3 instâncias do botão em telas diferentes, mude a cor do principal para verde e veja as três mudarem." },
        ],
        instrucao: "Você mudou o raio do canto do componente principal de 8 para 20. O que acontece com as instâncias nas telas?",
        opcoes: ["Todas passam a ter o canto arredondado em 20.", "Nada: instâncias são cópias independentes.", "Só a primeira instância muda.", "O Figma pergunta qual instância deve mudar."],
        correta: 0,
        explicacao: "A instância é ligada ao principal: mudou a matriz, mudaram todas — a grande economia de um sistema de design.",
      }),
      figura("instancias", "Dois painéis: à esquerda um botão principal roxo com três cópias roxas; à direita o principal verde e as três cópias também verdes.", "Alterar o principal altera todas as instâncias."),
    ),
    comFigura(
      {
        id: "variantes",
        titulo: "Variantes: um componente, várias versões",
        cenario: "Um botão tem estados (padrão, hover, desabilitado) e tamanhos (pequeno, grande). Em vez de criar seis componentes soltos, o Figma agrupa tudo num só componente com variantes.",
        passos: [
          "Duplique o componente do botão cinco vezes dentro da área de componentes (Ctrl + D).",
          "Em cada cópia, ajuste o que muda: um mais escuro (hover), um cinza com texto apagado (desabilitado), um maior (grande).",
          "Selecione todas as cópias e clique em Combinar como variantes (Combine as variants) no painel Design.",
          "Em Propriedades, renomeie as propriedades criadas: \"Estado\" (Padrão, Hover, Desabilitado) e \"Tamanho\" (Pequeno, Grande).",
          "Arraste uma instância para uma tela e, no painel Design, troque Estado e Tamanho pelo menu suspenso, sem desenhar nada de novo.",
        ],
        tabelaReferencia: {
          colunas: ["Propriedade", "Valores"],
          linhas: [["Estado", "Padrão, Hover, Desabilitado"], ["Tamanho", "Pequeno, Grande"]],
        },
        desafio: "Crie uma terceira propriedade, \"Ícone\" (Com ou Sem), e escolha qual combinação faz sentido para o botão de \"Adicionar ao carrinho\".",
        objetivo: "Ter um único componente \"Botão\" que cobre todos os casos — e menos coisas para manter.",
      },
      figura("variantes", "Moldura roxa tracejada com uma grade de botões: linhas Pequeno e Grande, colunas Padrão, Hover e Desabilitado.", "Cada combinação de propriedades é uma variante."),
    ),
    comFigura(
      associar({
        id: "estilos",
        titulo: "Estilos de cor e de texto",
        blocos: [
          { tipo: "texto", texto: "Estilos são cores e fontes com nome, guardadas no arquivo. Em vez de digitar 7C3AED toda vez, você aplica o estilo \"Marca / Primária\". Quando a marca mudar de tom, altera-se o estilo e o arquivo todo acompanha." },
          { tipo: "lista", numerada: true, itens: ["Selecione um objeto com a cor desejada.", "No painel Design, no campo Preenchimento, clique nos quatro pontinhos (Estilos) e depois em +.", "Dê um nome com hierarquia: \"Marca / Primária\", \"Texto / Principal\".", "Para texto, selecione-o, vá ao campo Texto, clique nos quatro pontinhos e em +: \"Título / Grande\", \"Corpo / Normal\".", "Aplique os estilos nos demais objetos pelo mesmo menu."] },
        ],
        instrucao: "Ligue cada necessidade ao recurso certo.",
        opcoes: ["Componente", "Estilo de cor", "Estilo de texto", "Variante"],
        linhas: [
          { id: "marca", rotulo: "Trocar o roxo da marca em todo o arquivo", correta: 1 },
          { id: "titulo", rotulo: "Garantir que todos os títulos tenham a mesma fonte e tamanho", correta: 2 },
          { id: "botao", rotulo: "Reutilizar um botão inteiro em várias telas", correta: 0 },
          { id: "estado", rotulo: "O mesmo botão em versões Padrão, Hover e Desabilitado", correta: 3 },
        ],
        explicacao: "Estilo guarda uma propriedade (cor, texto); componente guarda um elemento inteiro; variante guarda as versões desse elemento.",
      }),
      figura("estilos-cor-texto", "Cartão de curso selecionado; no painel à direita, estilos de cor (Primária, Sucesso, Texto) e de texto (Título Grande, Corpo Normal), com o estilo de título destacado.", "Estilos de cor e de texto no painel Design."),
    ),
    resposta({
      id: "mini-sistema",
      titulo: "Mini-projeto: seu mini sistema de design",
      cenario: "Monte uma página \"Sistema de design\" no arquivo com: 3 estilos de cor (primária, sucesso, texto), 2 estilos de texto (título e corpo) e o componente Botão com variantes de Estado.",
      instrucao: "Explique a diferença entre componente, estilo e variante com um exemplo seu e diga o que fica mais fácil quando o cliente pede para trocar a cor da marca.",
      rotulo: "Sua explicação",
      placeholder: "Componente é... Estilo é... Variante é... Se o cliente pedir para trocar a cor da marca, eu...",
      chave: /componente[\s\S]*(estilo)[\s\S]*(variante)/i,
      minPalavras: 30,
      minCaracteres: 160,
    }),
  ],
};

export default atividade;
