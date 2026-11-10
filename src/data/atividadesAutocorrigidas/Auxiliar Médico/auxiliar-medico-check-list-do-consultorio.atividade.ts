import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, resposta } from "../ajudantes";
import { comFigura, figura } from "../auxiliarMedicoComum";

const atividade: AtividadeAutocorrigida = {
  titulo: "Auxiliar Médico — Check-list do Consultório",
  introducao:
    "Pilotos de avião, equipes de cirurgia e consultórios bem organizados têm algo em comum: não confiam na memória, confiam no check-list. Uma lista simples, conferida item por item, evita o esquecimento que atrasa a consulta, o material que acaba no meio do atendimento e o descuido com a biossegurança. Aqui você aprende a ler e a montar check-lists do dia a dia do consultório.",
  itens: [
    comFigura(
      {
        id: "lendo-o-checklist",
        titulo: "Lendo o check-list de abertura",
        cenario: "Esta é a lista de abertura do consultório, conferida às 7h30. Caixa verde com marca significa conferido; caixa vazia em laranja é item faltando e precisa de providência antes do primeiro paciente.",
        campos: [
          {
            id: "conferidos",
            rotulo: "Quantos itens já foram conferidos?",
            placeholder: "Número",
            regra: { tipo: "numero", esperado: 8, tolerancia: 0 },
            mensagemCerta: "Isso: 8 itens conferidos.",
            mensagemErrada: "Conte as caixas verdes com marca nos três grupos: Ambiente (4), Materiais (2) e Documentos (2).",
          },
          {
            id: "faltando",
            rotulo: "Quantos itens estão faltando?",
            placeholder: "Número",
            regra: { tipo: "numero", esperado: 3, tolerancia: 0 },
            mensagemCerta: "Isso: álcool 70% e luvas, abaixadores e gaze, e receituário e atestados em estoque.",
            mensagemErrada: "Conte os itens com a palavra \"faltando\", em laranja.",
          },
        ],
        aviso: "Item faltando não se anota para depois: avise o responsável e peça a reposição antes de abrir. Um item esquecido pode parar a consulta.",
        objetivo: "Ler o check-list num relance e saber o que ainda precisa ser resolvido.",
      },
      figura("checklist-abertura", "Check-list de abertura com três grupos — Ambiente, Materiais e Documentos — e itens marcados em verde ou sinalizados como faltando.", "Check-list de abertura: conferidos em verde, faltando em laranja."),
    ),
    comFigura(
      associar({
        id: "instrumentos",
        titulo: "Materiais da bancada",
        blocos: [
          { tipo: "texto", texto: "Antes de usar qualquer aparelho, confira três coisas: se funciona, se está limpo e se a escala ou bateria está correta. Defeito se avisa e se anota; ninguém \"dá um jeito\"." },
        ],
        instrucao: "Ligue cada instrumento ao que ele mede ou ao que serve.",
        opcoes: ["Pressão arterial", "Temperatura do corpo", "Ouvir batimentos e respiração", "Peso do paciente"],
        linhas: [
          { id: "esfigmo", rotulo: "Esfigmomanômetro", correta: 0 },
          { id: "termo", rotulo: "Termômetro", correta: 1 },
          { id: "estetoscopio", rotulo: "Estetoscópio", correta: 2 },
          { id: "balanca", rotulo: "Balança", correta: 3 },
        ],
        explicacao: "Quem monta a sala conhece cada instrumento. Quem interpreta o resultado é o médico: o auxiliar mede e registra.",
      }),
      figura("bancada-materiais", "Esfigmomanômetro, estetoscópio, termômetro e balança com fita métrica, cada um com seu nome e a medida a que serve.", "Materiais de apoio na bancada."),
    ),
    {
      id: "lavar-as-maos",
      titulo: "Higiene das mãos: o item que nunca pode faltar",
      cenario: "Lavar as mãos antes e depois de cada paciente é a medida mais simples e mais eficaz para evitar infecção. Vale também antes de calçar luvas e depois de tirá-las.",
      passos: [
        "Molhe as mãos e aplique sabão suficiente para cobrir toda a superfície.",
        "Esfregue as palmas uma na outra.",
        "Esfregue a palma de uma mão sobre o dorso da outra, com os dedos entrelaçados, e troque.",
        "Esfregue entre os dedos, palma com palma.",
        "Esfregue as costas dos dedos contra a palma da outra mão.",
        "Esfregue o polegar de cada mão, com movimento de rotação.",
        "Esfregue as pontas dos dedos de cada mão na palma da outra.",
        "Enxágue bem, seque com papel toalha e feche a torneira com o próprio papel.",
      ],
      campos: [
        {
          id: "tempo-com-agua",
          rotulo: "O procedimento com água e sabão deve durar, no mínimo, quantos segundos?",
          placeholder: "Em segundos",
          regra: { tipo: "numero", esperado: 40, tolerancia: 0 },
          mensagemCerta: "Isso: de 40 a 60 segundos com água e sabão.",
          mensagemErrada: "A recomendação é de 40 a 60 segundos com água e sabão (a fricção com álcool leva de 20 a 30).",
        },
        {
          id: "tempo-alcool",
          rotulo: "A higiene com álcool em gel leva, no mínimo, quantos segundos?",
          placeholder: "Em segundos",
          regra: { tipo: "numero", esperado: 20, tolerancia: 0 },
          mensagemCerta: "Isso: de 20 a 30 segundos, esfregando até secar.",
          mensagemErrada: "A fricção com álcool em gel leva de 20 a 30 segundos, até as mãos secarem.",
        },
      ],
      aviso: "Álcool em gel não substitui a água e o sabão quando as mãos estão visivelmente sujas: nesse caso, lave.",
      objetivo: "Fazer da lavagem das mãos um hábito automático, sempre na ordem certa.",
    },
    comFigura(
      associar({
        id: "residuos",
        titulo: "Cada resíduo no seu recipiente",
        blocos: [
          { tipo: "texto", texto: "Separar o lixo é segurança, e não capricho. O material contaminado ou cortante misturado ao lixo comum machuca e contamina quem o recolhe." },
        ],
        instrucao: "Em que recipiente vai cada item?",
        opcoes: ["Lixo comum", "Infectante (saco branco)", "Perfurocortante (caixa amarela)"],
        linhas: [
          { id: "papel", rotulo: "Papel toalha usado só para secar as mãos", correta: 0 },
          { id: "gaze", rotulo: "Gaze com sangue", correta: 1 },
          { id: "agulha", rotulo: "Agulha usada", correta: 2 },
          { id: "luva", rotulo: "Luvas usadas no atendimento", correta: 1 },
        ],
        explicacao: "Perfurocortante nunca se recapa e a caixa não se enche além da linha indicada; infectante vai em saco branco; comum, no lixo comum.",
      }),
      figura("residuos-cores", "Três recipientes: lixo comum, saco branco para infectante e caixa amarela para perfurocortante, cada um com exemplos.", "Cada resíduo no seu recipiente."),
    ),
    resposta({
      id: "monte-seu-checklist",
      titulo: "Monte o seu check-list de fechamento",
      cenario: "Ao final do expediente, o consultório precisa ficar seguro e pronto para o dia seguinte.",
      instrucao: "Escreva um check-list de fechamento com pelo menos seis itens, em frases curtas e na ordem em que você os executaria. Inclua o descarte do lixo, a limpeza da sala e o desligamento dos equipamentos.",
      rotulo: "Seu check-list",
      placeholder: "1. Recolher os prontuários e arquivar. 2. Esvaziar as lixeiras... 3. Limpar a maca... 4. Desligar os equipamentos...",
      chave: /^(?=[\s\S]*(lixo|res[ií]duo|lixeira))(?=[\s\S]*(limp|desinfet))(?=[\s\S]*(deslig|equipament))[\s\S]*$/i,
      minPalavras: 30,
      minCaracteres: 150,
    }),
  ],
};

export default atividade;
