import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, briefing, dissertativa, planilha, somar } from "../ajudantes";
import { inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(5707);
const TIPOS = ["Gerada por IA", "Gravada", "Texto animado"] as const;
const CENAS = Array.from({ length: 12 }, (_, i) => {
  const tipo = i === 0 || i === 11 ? "Texto animado" : sortear(r, TIPOS);
  const duracao = inteiro(r, 4, 14);
  const creditos = tipo === "Gerada por IA" ? duracao * 3 : 0;
  return [`Cena ${i + 1}`, tipo, duracao, creditos];
});
const dur = (l: (string | number)[]) => l[2] as number;
const TOTAL_S = somar(CENAS.map(dur));
const IA_S = somar(CENAS.filter((l) => l[1] === "Gerada por IA").map(dur));
const CREDITOS = somar(CENAS.map((l) => l[3] as number));

const SLIDES = Array.from({ length: 14 }, (_, i) => [
  `Slide ${i + 1}`,
  i === 0 ? "Capa" : i === 13 ? "Contato" : sortear(r, ["Conteúdo", "Gráfico", "Depoimento", "Preços", "Equipe"] as const),
  inteiro(r, 0, 3),
  inteiro(r, 0, 2),
  r() < 0.6 ? "Sim" : "Não",
]);
const HIPERLINKS = somar(SLIDES.map((l) => l[2] as number));
const BOTOES = somar(SLIDES.map((l) => l[3] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Inteligência Artificial II — Vídeos com IA Generativa e Apresentações Interativas no Canva",
  introducao:
    "Um dia de trabalho de comunicação: planejar um vídeo curto com cenas geradas por IA, calcular duração e uso de créditos, montar uma apresentação no Canva com hiperlinks, botões e animações e conferir o que ficou pronto. As planilhas vêm dentro da atividade: use o botão para copiá-las, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "A campanha de lançamento do curso de Excel",
      remetente: "Bianca Cordeiro, gerente de marketing da Escola Talento Digital",
      assunto: "Vídeo de 12 cenas e apresentação interativa para o evento de sábado",
      paragrafos: [
        "Vamos lançar um curso e precisamos de dois materiais: um vídeo curto de 12 cenas, em que parte das cenas é gerada com IA generativa de vídeo (a ferramenta cobra créditos por segundo gerado: neste treino, 3 créditos por segundo) e a outra parte é gravada ou feita só com texto animado; e uma apresentação de 14 slides no Canva, navegável, com hiperlinks e botões que levam a outras partes da apresentação e ao site.",
        "Preciso saber a duração total do vídeo, quanto dele é gerado por IA e quantos créditos serão gastos, e também conferir se a apresentação tem os elementos interativos combinados (links, botões e animação). O Canva e as ferramentas de vídeo mudam de tela e de função com frequência: no trabalho real você segue o que a ferramenta mostra na hora. Esta atividade exercita o planejamento e a conferência.",
      ],
      entregas: [
        "A conta do vídeo: duração, parte gerada por IA e créditos (etapa 2).",
        "A conferência da apresentação: links, botões e animações (etapa 3).",
        "O roteiro, o prompt de uma cena e o passo a passo de montagem no Canva por escrito (etapa 4).",
      ],
    }),
    planilha({
      id: "roteiro-do-video",
      titulo: "Etapa 2 — Planilha: o roteiro de 12 cenas",
      cenario: "Cole a planilha no Excel. Duração total = soma da coluna Duração. Créditos = 3 por segundo de cena gerada por IA (já calculados na coluna).",
      colunas: ["Cena", "Tipo", "Duração (s)", "Créditos de IA (3 por segundo gerado)"],
      linhas: CENAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "duracao", rotulo: "Duração total do vídeo (segundos)", valor: TOTAL_S, explicacao: "Soma da coluna Duração.", tolerancia: 0 },
        { id: "duracao-min", rotulo: "Duração total em minutos", valor: TOTAL_S / 60, explicacao: "Segundos ÷ 60." },
        { id: "ia-segundos", rotulo: "Segundos de cenas geradas por IA", valor: IA_S, explicacao: "Soma da duração das cenas do tipo Gerada por IA.", tolerancia: 0 },
        { id: "ia-pct", rotulo: "Parte do vídeo gerada por IA (%)", valor: (IA_S / TOTAL_S) * 100, explicacao: "Segundos gerados ÷ duração total × 100." },
        { id: "creditos", rotulo: "Total de créditos de IA gastos", valor: CREDITOS, explicacao: "Soma da coluna Créditos.", tolerancia: 0 },
        { id: "mais-longa", rotulo: "Duração da cena mais longa (segundos)", valor: Math.max(...CENAS.map(dur)), explicacao: "Use MÁXIMO na coluna Duração.", tolerancia: 0 },
      ],
    }),
    planilha({
      id: "checklist-canva",
      titulo: "Etapa 3 — Planilha: conferência dos 14 slides da apresentação",
      cenario: "Cole a planilha no Excel. Ela traz, para cada slide, o tipo, quantos hiperlinks e botões ele tem e se tem animação.",
      colunas: ["Slide", "Tipo de conteúdo", "Hiperlinks", "Botões", "Tem animação"],
      linhas: SLIDES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "hiperlinks", rotulo: "Total de hiperlinks da apresentação", valor: HIPERLINKS, explicacao: "Soma da coluna Hiperlinks.", tolerancia: 0 },
        { id: "botoes", rotulo: "Total de botões da apresentação", valor: BOTOES, explicacao: "Soma da coluna Botões.", tolerancia: 0 },
        { id: "sem-animacao", rotulo: "Quantidade de slides SEM animação", valor: SLIDES.filter((l) => l[4] === "Não").length, explicacao: "Conte os slides com Não na coluna Tem animação.", tolerancia: 0 },
        { id: "sem-navegacao", rotulo: "Quantidade de slides sem nenhum hiperlink e sem nenhum botão", valor: SLIDES.filter((l) => l[2] === 0 && l[3] === 0).length, explicacao: "Slides em que os dois valores são zero: o usuário não consegue navegar a partir deles.", tolerancia: 0 },
        { id: "pct-animados", rotulo: "Percentual de slides com animação (%)", valor: (SLIDES.filter((l) => l[4] === "Sim").length / SLIDES.length) * 100, explicacao: "Slides com animação ÷ 14 × 100." },
      ],
    }),
    associar({
      id: "recursos",
      titulo: "Hiperlinks, botões e animações",
      instrucao: "Associe cada necessidade ao recurso adequado em uma apresentação interativa.",
      opcoes: ["Hiperlink em texto ou imagem", "Botão com link", "Animação de elemento ou de página"],
      linhas: [
        { id: "site", rotulo: "Levar o público ao site de inscrição ao clicar na frase «Inscreva-se aqui».", correta: 0 },
        { id: "menu", rotulo: "Criar um menu visível «Voltar ao sumário» que leva ao slide 2 em qualquer parte da apresentação.", correta: 1 },
        { id: "atencao", rotulo: "Fazer os números do gráfico entrarem na tela um de cada vez para guiar o olhar.", correta: 2 },
      ],
      explicacao: "Recursos de interação devem ter um propósito: navegar, chamar para a ação ou direcionar a atenção. Animação em excesso distrai.",
    }),
    dissertativa({
      id: "roteiro-e-passo-a-passo",
      titulo: "Etapa 4 — Roteiro, prompt de cena e passo a passo no Canva",
      instrucao: "Escreva o material que a gerente pediu.",
      deve: [
        "Resuma a conta do vídeo (duração, parte gerada por IA e créditos) e diga se acha que o uso de IA está bem dosado, com os números.",
        "Escreva o prompt que você daria à ferramenta de vídeo para gerar a cena 3 (descreva assunto, estilo visual, movimento de câmera, duração e o que não deve aparecer).",
        "Descreva, em passos, como você montaria no Canva a navegação da apresentação: inserir hiperlink em texto, criar um botão que leva a outro slide, aplicar animação a um elemento e conferir o resultado em modo de apresentação.",
        "Aponte cuidados com direitos de imagem, voz e música usados no vídeo e com a revisão humana do material gerado por IA antes de publicar.",
      ],
      chave: /(prompt|cena|estilo|dura[cç][aã]o|hiperlink|bot[aã]o|anima[cç][aã]o|canva|slide|revis[aã]o|direitos|cr[eé]ditos)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
