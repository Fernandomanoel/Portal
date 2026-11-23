import type { AulaIngles } from "@/types/aulaIngles";

/**
 * FB11 · Dealing with everyday aches (Ache – Should – Which). Reescrita, no padrão do portal, da aula interativa em
 * HTML: o texto, os exercícios, as respostas e as regras de correção são os do original. Os bancos de frases, as
 * respostas e os desenhos foram lidos do próprio HTML por um conversor, não digitados.
 *
 * O áudio das práticas V e VI e as fotos das práticas VI e VII ficam hospedados em englishworksheets.net e
 * shutterstock.com, como no original (não confirmado que continuem no ar).
 */
const aula: AulaIngles = {
  id: "fb11-ache-should-which",
  codigo: "FB11",
  titulo: "DEALING WITH EVERYDAY ACHES",
  logo: {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoJWDab_PQdYMNPhSpjJ89nD2Dqi2MWla12i_JpR3rbom2qZJsbRo7h9IjyM2vQVW7tuggXGqwjGWV0U02tW7RQy5bPqyFg-cHVxTYxiFMmdfd9rlyzTwmbdYM-jqlkSxc_0b6YMcJhfv6qOwB6b9fcHWwl8mRiKGbv0F6zCJQrkkxL35unMGzg4_aAIQ/s1600/image.png",
    alt: "Institutional Logo",
    reserva: "ENGLISH STUDIO",
  },
  rotuloTopo: "Interactive Lesson",
  rotuloMenu: "Course Outline",
  rotuloProgresso: "Lesson Progress",
  rotulosNavegacao: { anterior: "Previous", proximo: "Next", passo: "Step {n} of {total} · {rotulo}" },
  passos: [
    {
      id: "warm-up",
      modulo: "1. Warm up",
      rotulo: "1. Warm up",
      blocos: [
        {
          tipo: "heroi",
          etiqueta: "Module 1 · Lead-In & Reflection",
          titulo: "DEALING WITH EVERYDAY ACHES",
          texto: "Modern routines—from long hours at a computer to intense workouts—often leave us with physical discomforts. Explore how to describe everyday aches accurately, give helpful advice, and connect ideas naturally in English.",
          objetivosTitulo: "In this class you will:",
          objetivos: ["Learn about aches", "Modal Verb “Should”", "Relative Pronoun “Which”"],
        },
        {
          tipo: "cabecalho",
          etiqueta: "Section 1",
          titulo: "1. Warm Up",
          texto: "Listen to each question and write your personal reflections below.",
        },
        {
          tipo: "perguntas-livres",
          perguntas: [
            {
              texto: "Our daily habits can sometimes cause body aches (for example, a backache from sitting too long or a headache from using screens). Which daily habit causes you the most discomfort?",
              fala: "Our daily habits can sometimes cause body aches, for example, a backache from sitting too long or a headache from using screens. Which daily habit causes you the most discomfort?",
            },
            {
              texto: "What are some daily things people could do to avoid getting sick or having aches?",
              fala: "What are some daily things people could do to avoid getting sick or having aches?",
            },
            {
              texto: "What do you think a person should do if they have any sort of ache?",
              fala: "What do you think a person should do if they have any sort of ache?",
            },
            {
              texto: "What is one simple habit or thing {dest:which} always helps you feel better when you have a body ache?",
              fala: "What is one simple habit or thing which always helps you feel better when you have a body ache?",
            },
            {
              texto: "Imagine a friend is studying or working all day without a break and has a bad backache. What advice {dest:should} you give them?",
              fala: "Imagine a friend is studying or working all day without a break and has a bad backache. What advice should you give them?",
            },
          ],
          rotuloOuvir: "Listen",
          placeholder: "TYPE YOUR ANSWER HERE...",
          botao: "Save My Notes",
          mensagem: "Notes saved! Ready for Ache Vocab.",
        },
      ],
    },
    {
      id: "mapa-corpo",
      modulo: "2. Ache Vocab",
      rotulo: "2.0 Body Map",
      blocos: [
        {
          tipo: "mapa-corpo",
          cabecalho: {
            etiqueta: "Module 2 · Ache Vocab",
            titulo: "Interactive Body Map",
            texto: "Click any pulsing hotspot on the silhouette to inspect the symptom and listen to its pronunciation.",
          },
          viewBox: "0 0 320 460",
          rotuloSvg: "Interactive human body map with 8 symptom hotspots",
          fundo: [
            { tag: "circle", attrs: { cx: 160, cy: 220, r: 145 } },
          ],
          silhueta: [
            {
              tag: "path",
              attrs: {
                d: "M160 44 C136 44 122 62 122 86 C122 108 135 125 147 130 L147 148 L173 148 L173 130 C185 125 198 108 198 86 C198 62 184 44 160 44 Z",
              },
            },
            { tag: "path", attrs: { d: "M122 78 C115 78 114 96 122 98" } },
            { tag: "path", attrs: { d: "M198 78 C205 78 206 96 198 98" } },
            {
              tag: "path",
              attrs: {
                d: "M147 148 L104 158 C88 162 80 176 76 198 L62 288 C60 298 72 302 77 292 L95 212 L102 212 L104 316 L112 430 C113 438 128 438 130 430 L152 322 L168 322 L190 430 C192 438 207 438 208 430 L216 316 L218 212 L225 212 L243 292 C248 302 260 298 258 288 L244 198 C240 176 232 162 216 158 L173 148 Z",
              },
            },
          ],
          sintomas: [
            {
              id: "headache",
              termo: "Headache",
              regiaoRotulo: "Forehead & Temples",
              descricao: "A continuous pain or throbbing sensation inside your head, often caused by stress, dehydration, or staring at bright screens for too long.",
              exemplo: "\"I have a terrible headache from looking at my laptop all morning.\"",
              regiao: [
                {
                  tag: "path",
                  attrs: { d: "M128 72 C130 53 144 47 160 47 C176 47 190 53 192 72 C178 76 142 76 128 72 Z" },
                },
              ],
              ponto: { x: 160, y: 62, cor: "perigo" },
            },
            {
              id: "earache",
              termo: "Earache",
              regiaoRotulo: "Inner / Outer Ear",
              descricao: "A sharp or dull pain inside the ear, frequently triggered by loud headphones, cold wind, or an ear infection.",
              exemplo: "\"You shouldn't listen to music so loud, or you'll get an earache.\"",
              regiao: [
                { tag: "ellipse", attrs: { cx: 118, cy: 88, rx: 11, ry: 15 } },
              ],
              ponto: { x: 116, y: 88, cor: "perigo" },
            },
            {
              id: "toothache",
              termo: "Toothache",
              regiaoRotulo: "Jaw & Cheek",
              descricao: "Pain in or around a tooth and jaw, usually a sign that you should visit a dentist soon.",
              exemplo: "\"This toothache kept me awake all night; I need to call the dentist.\"",
              regiao: [
                { tag: "path", attrs: { d: "M166 95 L193 93 C191 111 180 123 166 125 Z" } },
              ],
              ponto: { x: 181, y: 108, cor: "perigo" },
            },
            {
              id: "sore-throat",
              termo: "Sore throat",
              regiaoRotulo: "Front Neck & Throat",
              descricao: "Pain, scratchiness, or irritation in the throat that often feels worse when you swallow or talk.",
              exemplo: "\"She drank warm ginger tea which helped soothe her sore throat.\"",
              regiao: [
                { tag: "rect", attrs: { x: 147, y: 128, width: 26, height: 26, rx: 8 } },
              ],
              ponto: { x: 160, y: 141, cor: "perigo" },
            },
            {
              id: "fever",
              termo: "Fever",
              regiaoRotulo: "Full Face & Whole Body",
              descricao: "A higher-than-normal body temperature, often accompanied by chills, sweating, and general body fatigue.",
              exemplo: "\"My body temperature is high—I think I have a fever.\"",
              regiao: [
                { tag: "ellipse", attrs: { cx: 160, cy: 86, rx: 44, ry: 48 } },
              ],
              ponto: { x: 141, y: 86, cor: "alerta" },
            },
            {
              id: "dizziness",
              termo: "Dizziness",
              regiaoRotulo: "Top of Head / Balance",
              descricao: "A spinning, lightheaded, or unsteady feeling, as if you might lose your balance.",
              exemplo: "\"Skipping lunch and drinking too much coffee can cause dizziness.\"",
              regiao: [
                {
                  tag: "ellipse",
                  attrs: { cx: 160, cy: 34, rx: 34, ry: 9, fill: "none", strokeDasharray: "6 4" },
                },
                { tag: "ellipse", attrs: { cx: 160, cy: 27, rx: 22, ry: 6, fill: "none" } },
              ],
              ponto: { x: 160, y: 32, cor: "perigo" },
            },
            {
              id: "stomachache",
              termo: "Stomachache",
              regiaoRotulo: "Abdomen",
              descricao: "Pain or cramps in your stomach or belly, commonly caused by eating too much or eating heavy, spicy food.",
              exemplo: "\"Don't eat that greasy street food, or you'll get a stomachache.\"",
              regiao: [
                { tag: "ellipse", attrs: { cx: 160, cy: 246, rx: 34, ry: 30 } },
              ],
              ponto: { x: 160, y: 246, cor: "perigo" },
            },
            {
              id: "backache",
              termo: "Backache",
              regiaoRotulo: "Lower Lumbar & Side Back",
              descricao: "Pain in the upper or lower back, often caused by poor posture or lifting heavy objects.",
              exemplo: "\"Working in bed without a proper chair gave me a bad backache.\"",
              regiao: [
                {
                  tag: "path",
                  attrs: { d: "M106 254 L132 254 L132 304 L106 304 Z M188 254 L214 254 L214 304 L188 304 Z" },
                },
              ],
              ponto: { x: 114, y: 282, cor: "perigo" },
            },
          ],
          rotulos: {
            explorados: "Explored",
            badgeInicial: "Select a Hotspot",
            badgeSelecionado: "Selected Symptom",
            badgeExplorado: "Explored",
            tituloInicial: "Click a point on the body",
            regiaoInicial: "Anatomical Region: —",
            regiaoPrefixo: "Anatomical Region:",
            descricaoInicial: "Tap any of the 8 pulsing dots on the figure to inspect the English term, understand where it occurs, and hear native pronunciation.",
            exemploRotulo: "Example in context:",
            exemploInicial: "\"Select a symptom to see a practical example sentence.\"",
            pronuncia: "Pronunciation (Web Speech en-US)",
            normal: "Listen (Normal)",
            devagar: "Listen (Slow)",
          },
        },
      ],
    },
    {
      id: "flashcards",
      modulo: "2. Ache Vocab",
      rotulo: "2.1 Flashcards",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 2 · Ache Vocab",
          titulo: "2.1. Vocabulary Flashcards",
          texto: "Click a card to flip it, reveal its Portuguese translation, and hear the English pronunciation automatically. Click again to return.",
        },
        {
          tipo: "flashcards",
          cartas: [
            {
              en: "headache",
              pt: "dor de cabeça",
              icone: [
                { tag: "circle", attrs: { cx: 12, cy: 11, r: 6 } },
                {
                  tag: "path",
                  attrs: { strokeLinecap: "round", d: "M9 10l2 1m4-1l-2 1M4 7l2 1m14-1l-2 1M12 2v2" },
                },
              ],
            },
            {
              en: "toothache",
              pt: "dor de dente",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M7 4c-2 0-3 1.8-3 4 0 2.5 1.2 4.5 2 7 .6 1.8 1.2 5 2.5 5 1 0 1.5-2 2.5-3.5.5-.7 1.5-.7 2 0 1 1.5 1.5 3.5 2.5 3.5 1.3 0 1.9-3.2 2.5-5 .8-2.5 2-4.5 2-7 0-2.2-1-4-3-4-1.5 0-2.5.8-4 .8S8.5 4 7 4z",
                  },
                },
              ],
            },
            {
              en: "earache",
              pt: "dor de ouvido",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M14 15a3 3 0 11-6 0c0-3 2-4 2-7a4 4 0 118 0c0 4-3 6-4 9",
                  },
                },
                { tag: "path", attrs: { strokeLinecap: "round", d: "M13 8a1.5 1.5 0 012 1.5" } },
              ],
            },
            {
              en: "backache",
              pt: "dor nas costas",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 3v18M9 6h6M8 10h8M9 14h6M10 18h4",
                  },
                },
                {
                  tag: "path",
                  attrs: { strokeLinecap: "round", d: "M4 14l2-1m14 1l-2-1", stroke: "var(--danger)" },
                },
              ],
            },
            {
              en: "stomachache",
              pt: "dor de barriga",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9 5c0 3-3 4-3 8a6 6 0 0012 0c0-3.5-2.5-5.5-5-5.5-1.5 0-2 1-2 2s1 1.5 2 1.5",
                  },
                },
              ],
            },
            {
              en: "sore throat",
              pt: "garganta inflamada",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9 3v7c0 2-2 3-2 6v5h10v-5c0-3-2-4-2-6V3",
                  },
                },
                { tag: "circle", attrs: { cx: 12, cy: 11, r: 2, stroke: "var(--danger)" } },
              ],
            },
            {
              en: "fever",
              pt: "febre",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z",
                  },
                },
                { tag: "path", attrs: { strokeLinecap: "round", d: "M12 9v6", stroke: "var(--danger)" } },
              ],
            },
            {
              en: "dizziness",
              pt: "enjoo",
              icone: [
                {
                  tag: "path",
                  attrs: {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 12c0-1.1.9-2 2-2s2 .9 2 2-.9 3-3 3-4-1.8-4-4 .9-5 5-5 6 2.7 6 6-2.7 7-7 7-8-3.6-8-8",
                  },
                },
              ],
            },
          ],
          rotuloVirar: "Tap to flip",
          rotuloPortugues: "Português",
        },
        {
          tipo: "destaque-regra",
          ancora: "ache-grammar-rule",
          etiqueta: "PAY ATTENTION",
          titulo: "Why \"headache\" works, but \"legache\" doesn't?",
          texto: "In English, {b:-ache} only attaches to {wh:5 main body parts} to form one solid word: {chip:head}, {chip:tooth}, {chip:ear}, {chip:back}, and {chip:stomach} {i:(plus \"heartache\" for emotional pain!)}. When another part of your body bothers you, native speakers naturally change the structure:",
          grupos: [
            {
              titulo: "Other body parts (hurt / hurts):",
              itens: [
                { texto: "\"My {neg:leg} hurts.\"", fala: "My leg hurts." },
                { texto: "\"My {neg:eyes} hurt.\"", fala: "My eyes hurt." },
              ],
            },
            {
              titulo: "Throat & Muscles (sore):",
              itens: [
                { texto: "\"I have a {wh:sore throat}.\"", fala: "I have a sore throat." },
                { texto: "\"I have {wh:sore muscles}.\"", fala: "I have sore muscles." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "practice-1",
      modulo: "2. Ache Vocab",
      rotulo: "2.2 Practice I",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 2 · Ache Vocab",
          titulo: "2.2. Practice I",
          texto: "Read the statements below and match each cause to its corresponding ache (1 to 8).",
        },
        {
          tipo: "ligar-causas",
          legenda: [
            { n: 1, termo: "Headache" },
            { n: 2, termo: "Toothache" },
            { n: 3, termo: "Earache" },
            { n: 4, termo: "Backache" },
            { n: 5, termo: "Stomachache" },
            { n: 6, termo: "Sore throat" },
            { n: 7, termo: "Fever" },
            { n: 8, termo: "Dizziness" },
          ],
          itens: [
            {
              texto: "I worked on my laptop in bed for six hours without a proper chair or pillow.",
              resposta: "4",
              fala: "I worked on my laptop in bed for six hours without a proper chair or pillow.",
            },
            { texto: "I ate too much chocolate.", resposta: "5", fala: "I ate too much chocolate." },
            {
              texto: "I don’t usually go to the dentist.",
              resposta: "2",
              fala: "I don't usually go to the dentist.",
            },
            {
              texto: "It happens to me every time I get on the bus.",
              resposta: "8",
              fala: "It happens to me every time I get on the bus.",
            },
            {
              texto: "I drank cold orange juice with ice on a freezing morning, and now it hurts every time I swallow.",
              resposta: "6",
              fala: "I drank cold orange juice with ice on a freezing morning, and now it hurts every time I swallow.",
            },
            {
              texto: "My body temperature is high and my whole body is aching!",
              resposta: "7",
              fala: "My body temperature is high and my whole body is aching!",
            },
            {
              texto: "I use headphones longer than I should.",
              resposta: "3",
              fala: "I use headphones longer than I should.",
            },
            {
              texto: "I tried to read a book with very small letters without wearing my glasses.",
              resposta: "1",
              fala: "I tried to read a book with very small letters without wearing my glasses.",
            },
          ],
          rotuloOuvir: "Listen",
          mensagens: {
            ok: "Congratulations! You matched all {n} out of {total} causes accurately!",
            parcial: "You got {n} out of {total} right. Review the highlighted cards in red and try again!",
          },
        },
      ],
    },
    {
      id: "practice-2",
      modulo: "2. Ache Vocab",
      rotulo: "2.3 Practice II",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 2 · Ache Vocab",
          titulo: "2.3. Practice II",
          texto: "Select the natural English expression to complete each sentence.",
        },
        {
          tipo: "escolher-lacuna",
          itens: [
            {
              antes: "I went to the gym yesterday after six months, and today",
              opcoes: ["my legs hurt", "my legsache"],
              resposta: "my legs hurt",
              depois: ".",
              fala: "I went to the gym yesterday after six months, and today my legs hurt.",
            },
            {
              antes: "I slept in a weird position on the sofa, and now I have a strong",
              opcoes: ["neckache", "neck pain"],
              resposta: "neck pain",
              depois: ".",
              fala: "I slept in a weird position on the sofa, and now I have a strong neck pain.",
            },
            {
              antes: "Don't eat that spicy street food before our flight, or you'll get a",
              opcoes: ["stomachache", "sore stomach"],
              resposta: "stomachache",
              depois: ".",
              fala: "Don't eat that spicy street food before our flight, or you'll get a stomachache.",
            },
            {
              antes: "After playing tennis for three hours, the player couldn't lift his racket because of a severe",
              opcoes: ["arm pain", "armache"],
              resposta: "arm pain",
              depois: ".",
              fala: "After playing tennis for three hours, the player couldn't lift his racket because of a severe arm pain.",
            },
            {
              antes: "I need to call the dentist this morning! This",
              opcoes: ["toothache", "tooth pain"],
              resposta: "toothache",
              depois: "kept me awake all night.",
              fala: "I need to call the dentist this morning! This toothache kept me awake all night.",
            },
            {
              antes: "She walked around the city in uncomfortable shoes all day, so now she has a",
              opcoes: ["sore foot", "footache"],
              resposta: "sore foot",
              depois: ".",
              fala: "She walked around the city in uncomfortable shoes all day, so now she has a sore foot.",
            },
            {
              antes: "If you keep singing loudly at the karaoke, you're going to wake up with a",
              opcoes: ["sore throat", "throatache"],
              resposta: "sore throat",
              depois: "tomorrow.",
              fala: "If you keep singing loudly at the karaoke, you're going to wake up with a sore throat tomorrow.",
            },
            {
              antes: "Don’t sit like this! Or else, you’ll get a",
              opcoes: ["backache", "sore back"],
              resposta: "backache",
              depois: ".",
              fala: "Don't sit like this! Or else, you'll get a backache.",
            },
            {
              antes: "Prolonged usage of headphones may cause",
              opcoes: ["earache", "ear pain"],
              resposta: "earache",
              depois: ".",
              fala: "Prolonged usage of headphones may cause earache.",
            },
            {
              antes: "They broke up yesterday, so naturally she’s feeling a lot of",
              opcoes: ["heartache", "sore heart"],
              resposta: "heartache",
              depois: ".",
              fala: "They broke up yesterday, so naturally she's going through a heartache.",
            },
          ],
          aposLista: [
            {
              tipo: "link-passo",
              antes: "If you have any doubt when to use {b:“ache”}, {b:“sore”} or {b:“pain”} go back to",
              rotuloLink: "‘2.1. Vocabulary Flashcard’",
              depois: ".",
              passo: "flashcards",
              ancora: "ache-grammar-rule",
            },
          ],
          mensagens: {
            ok: "Awesome work! All {n} out of {total} expressions are spot on!",
            parcial: "You scored {n} out of {total}. Check the red items and try again!",
          },
        },
      ],
    },
    {
      id: "listen-repeat",
      modulo: "2. Ache Vocab",
      rotulo: "2.4 Listen & Repeat",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 2 · Ache Vocab",
          titulo: "2.4. Listen & Repeat",
          texto: "Click the speaker button on each sentence, listen carefully to the rhythm and stress, and repeat aloud.",
        },
        {
          tipo: "lista-ouvir",
          itens: [
            {
              texto: "I went to the gym yesterday after six months, and today my legs hurt.",
              fala: "I went to the gym yesterday after six months, and today my legs hurt.",
            },
            {
              texto: "I slept in a weird position on the sofa, and now I have a strong neck pain.",
              fala: "I slept in a weird position on the sofa, and now I have a strong neck pain.",
            },
            {
              texto: "Don't eat that spicy street food before our flight, or you'll get a stomachache.",
              fala: "Don't eat that spicy street food before our flight, or you'll get a stomachache.",
            },
            {
              texto: "After playing tennis for three hours, the player couldn't lift his racket because of a severe arm pain.",
              fala: "After playing tennis for three hours, the player couldn't lift his racket because of a severe arm pain.",
            },
            {
              texto: "I need to call the dentist this morning! This toothache kept me awake all night.",
              fala: "I need to call the dentist this morning! This toothache kept me awake all night.",
            },
            {
              texto: "She walked around the city in uncomfortable shoes all day, so now she has a sore foot.",
              fala: "She walked around the city in uncomfortable shoes all day, so now she has a sore foot.",
            },
            {
              texto: "If you keep singing loudly at the karaoke, you're going to wake up with a sore throat tomorrow.",
              fala: "If you keep singing loudly at the karaoke, you're going to wake up with a sore throat tomorrow.",
            },
            {
              texto: "Don't sit like this! Or else, you'll get a backache.",
              fala: "Don't sit like this! Or else, you'll get a backache.",
            },
            {
              texto: "Prolonged usage of headphones may cause earache.",
              fala: "Prolonged usage of headphones may cause earache.",
            },
            {
              texto: "They broke up yesterday, so naturally she's going through a heartache.",
              fala: "They broke up yesterday, so naturally she's going through a heartache.",
            },
          ],
          rotuloOuvir: "Listen",
        },
      ],
    },
    {
      id: "should",
      modulo: "3. Grammar",
      rotulo: "3.1 Should",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 3 · Grammar",
          titulo: "3.1. Should & Shouldn't",
          traducao: true,
        },
        {
          tipo: "caixa-regra",
          texto: {
            en: "We use {pos:should} and {neg:shouldn't} to give friendly advice, recommend a good idea, or warn someone against a bad habit. It's not a strict law, it's common sense!",
            pt: "Usamos {pos:should} (deveria) e {neg:shouldn't} (não deveria) para dar conselhos amigáveis, recomendar uma boa ideia ou alertar alguém contra um mau hábito. Não é uma lei rígida, é bom senso!",
          },
          fala: "We use should and shouldn't to give friendly advice, recommend a good idea, or warn someone against a bad habit. It's not a strict law, it's common sense!",
          rotuloOuvir: "Listen",
        },
        {
          tipo: "cartao-exemplos",
          titulo: "Affirmative Sentences",
          tom: "pos",
          formula: "Subject + should + base verb",
          exemplos: [
            {
              texto: "You {wh:should} drink plenty of water when you have a headache.",
              traducao: "Você deveria beber bastante água quando tiver uma dor de cabeça.",
              fala: "You should drink plenty of water when you have a headache.",
            },
            {
              texto: "People {wh:should} go to the dentist every six months.",
              traducao: "As pessoas deveriam ir ao dentista a cada seis meses.",
              fala: "People should go to the dentist every six months.",
            },
            {
              texto: "We’re running out of our medicine. We {wh:should} buy new ones.",
              traducao: "Nossos remédios estão acabando. Deveríamos comprar novos.",
              fala: "We're running out of our medicine. We should buy new ones.",
            },
          ],
          extras: [
            {
              tipo: "dica",
              rotulo: "TIP:",
              texto: {
                en: "{i:To run out of [something]} means to use up all of a supply until there is nothing left.",
                pt: "{i:To run out of [algo]} significa ficar sem estoque de algo, usar tudo até acabar.",
              },
            },
          ],
        },
        {
          tipo: "cartao-exemplos",
          titulo: "Negative Sentences",
          tom: "neg",
          formula: "Subject + shouldn't + base verb",
          exemplos: [
            {
              texto: "You {neg:shouldn’t listen} to music so loud! You’ll get an earache this way.",
              traducao: "Você não deveria ouvir música assim tão alto! Você vai ficar com dor de ouvido assim.",
              fala: "You shouldn't listen to music so loud! You'll get an earache this way.",
            },
            {
              texto: "She {neg:shouldn't carry} heavy boxes with that backache.",
              traducao: "Ela não deveria carregar caixas pesadas com essa dor nas costas.",
              fala: "She shouldn't carry heavy boxes with that backache.",
            },
            {
              texto: "Mark {neg:should not} go out in the rain. He will catch a cold.",
              traducao: "Mark não deveria sair na chuva. Ele vai pegar uma gripe.",
              fala: "Mark should not go out in the rain. He will catch a cold.",
            },
          ],
          extras: [
            {
              tipo: "dica-contraste",
              titulo: "TIP: Shouldn't vs Should not",
              intro: {
                en: "Both forms have the exact same meaning, and choosing one or the other is completely up to you! However, there is a small difference in tone:",
                pt: "Ambas as formas têm exatamente o mesmo significado, e escolher uma ou outra depende totalmente de você! Porém, há uma pequena diferença de tom:",
              },
              colunas: [
                {
                  texto: {
                    en: "{sim:Shouldn't (Casual & Everyday):} This is the most common form in daily conversations and texts. It sounds friendly and natural.",
                    pt: "{sim:Shouldn't (Casual e Cotidiano):} É a forma mais comum em conversas diárias e mensagens. Soa amigável e natural.",
                  },
                  exemplo: "\"You shouldn't look at your phone in the dark. It will give you a headache.\"",
                  fala: "You shouldn't look at your phone in the dark. It will give you a headache.",
                },
                {
                  texto: {
                    en: "{alerta:Should not (Stronger & Serious):} When you use the full form without the contraction—especially if you stress the word NOT—your advice sounds much stronger, more formal, or like a serious warning.",
                    pt: "{alerta:Should not (Mais Forte e Sério):} Quando você usa a forma completa sem contração — especialmente enfatizando a palavra NOT — seu conselho soa muito mais forte, formal ou como um alerta sério.",
                  },
                  exemplo: "\"You should NOT ignore a high fever. See a doctor right away!\"",
                  fala: "You should NOT ignore a high fever. See a doctor right away!",
                },
              ],
            },
          ],
        },
        {
          tipo: "cartao-exemplos",
          titulo: "Questions",
          tom: "perg",
          formula: "Should + subject + base verb + ?",
          exemplos: [
            {
              texto: "{wh:Should I go} to the doctor?",
              traducao: "Eu deveria ir ao médico?",
              fala: "Should I go to the doctor?",
            },
            {
              texto: "{wh:Should we take} headache medicine?",
              traducao: "Nós deveríamos tomar remédio para dor de cabeça?",
              fala: "Should we take headache medicine?",
            },
            {
              texto: "{wh:Should she rest} for an hour?",
              traducao: "Ela deve descansar por uma hora?",
              fala: "Should she rest for an hour?",
            },
          ],
        },
      ],
    },
    {
      id: "which",
      modulo: "3. Grammar",
      rotulo: "3.2 Which",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 3 · Grammar",
          titulo: "3.2. Relative Pronoun: Which",
          traducao: true,
        },
        {
          tipo: "caixa-regra",
          texto: {
            en: "Imagine you want to recommend a specific tea, pill, or habit to a friend. Instead of saying two short, robotic sentences, we use {wh:which} to connect them into one smooth idea. {wh:Which} works like a bridge that gives extra information about a {b:thing, object, or habit}.",
            pt: "Imagine que você quer recomendar um chá específico, um comprimido ou um hábito a um amigo. Em vez de dizer duas frases curtas e robóticas, usamos {wh:which} (que / o qual) para conectá-las em uma única ideia fluida. {wh:Which} funciona como uma ponte que dá informações extras sobre uma {b:coisa, objeto ou hábito}.",
          },
          fala: "Imagine you want to recommend a specific tea, pill, or habit to a friend. Instead of saying two short, robotic sentences, we use which to connect them into one smooth idea. Which works like a bridge that gives extra information about a thing, object, or habit.",
          rotuloOuvir: "Listen",
        },
        {
          tipo: "ponte",
          antes: {
            texto: "Drink the herbal tea. {dest:It} is on the kitchen table.",
            fala: "Drink the herbal tea. It is on the kitchen table.",
          },
          depois: {
            texto: "Drink the herbal tea {dest:which} is on the kitchen table.",
            fala: "Drink the herbal tea which is on the kitchen table.",
          },
        },
        {
          tipo: "aviso",
          texto: {
            en: "{neg:Attention!} Use {b:which} for objects, remedies, habits, and aches—{u:NEVER FOR PEOPLE} (for people, use {i:who} or {i:that}).",
            pt: "{neg:Atenção!} Use {b:which} para objetos, remédios, hábitos e dores — {u:NUNCA PARA PESSOAS} (para pessoas, use {i:who} ou {i:that}).",
          },
        },
        {
          tipo: "pares-transformacao",
          pares: [
            {
              antes: {
                texto: "Take the painkiller. The painkiller is inside the white box.",
                fala: "Take the painkiller. The painkiller is inside the white box.",
              },
              depois: {
                texto: "Take the painkiller {wh:which} is inside the white box.",
                fala: "Take the painkiller which is inside the white box.",
              },
            },
            {
              antes: {
                texto: "I bought a new bed. It completely cured my neck pain.",
                fala: "I bought a new bed. It completely cured my neck pain.",
              },
              depois: {
                texto: "I bought a new bed {wh:which} completely cured my neck pain.",
                fala: "I bought a new bed which completely cured my neck pain.",
              },
            },
            {
              antes: {
                texto: "Avoid eating heavy foods. Heavy foods cause a stomachache at night.",
                fala: "Avoid eating heavy foods. Heavy foods cause a stomachache at night.",
              },
              depois: {
                texto: "Avoid eating heavy foods {wh:which} cause a stomachache at night.",
                fala: "Avoid eating heavy foods which cause a stomachache at night.",
              },
            },
            {
              antes: {
                texto: "She drank warm ginger tea. It helped soothe her sore throat.",
                fala: "She drank warm ginger tea. It helped soothe her sore throat.",
              },
              depois: {
                texto: "She drank warm ginger tea {wh:which} helped {dica:soothe|aliviar} her sore throat.",
                fala: "She drank warm ginger tea which helped soothe her sore throat.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "practice-3",
      modulo: "3. Grammar",
      rotulo: "3.3 Practice III",
      blocos: [
        { tipo: "cabecalho", etiqueta: "Module 3 · Grammar", titulo: "3.3. Practice III" },
        {
          tipo: "cartao",
          titulo: "3.3.1. Fill in the blanks with {pos:SHOULD} or {neg:SHOULDN’T / SHOULD NOT}",
          descricao: "Type the appropriate modal form in each numbered gap (1–12).",
          blocos: [
            {
              tipo: "lacunas-texto",
              paragrafos: [
                [
                  "Many students and workers today believe they have to push their bodies to the limit to be successful. However, when your body starts sending pain signals, you ",
                  { lacuna: 1, largura: "m" },
                  " ignore them.",
                ],
                [
                  "Let’s look at a typical day. If you spend eight hours staring at a computer screen, you ",
                  { lacuna: 2, largura: "m" },
                  " take a five-minute break every hour to rest your eyes. You ",
                  { lacuna: 3, largura: "m" },
                  " sit in a terrible posture on your bed all afternoon, because that is a guaranteed way to get a bad backache. Instead, you ",
                  { lacuna: 4, largura: "m" },
                  " use a chair which supports your lower back properly.",
                ],
                [
                  "What about food and energy? When you are super busy, you ",
                  { lacuna: 5, largura: "m" },
                  " skip meals or replace lunch with four cups of strong coffee—that habit often causes a painful stomachache or dizziness! Even on busy days, you ",
                  { lacuna: 6, largura: "m" },
                  " drink plenty of water and eat light, healthy snacks.",
                ],
                [
                  "And when an ache finally hits, be smart. If you have a loud ringing in your ears or an earache, you ",
                  { lacuna: 7, largura: "m" },
                  " wear headphones at maximum volume. If you wake up with a sore throat and a mild fever, you ",
                  { lacuna: 8, largura: "m" },
                  " force yourself to go to the gym; your body needs energy to recover, so you ",
                  { lacuna: 9, largura: "m" },
                  " stay home and rest. Finally, if a toothache or a headache lasts for more than three days, you ",
                  { lacuna: 10, largura: "m" },
                  " just keep taking random painkillers—you ",
                  { lacuna: 11, largura: "m" },
                  " see a doctor or a dentist to find the real problem. Remember: good habits are the key, and you ",
                  { lacuna: 12, largura: "m" },
                  " wait until something hurts to start taking care of yourself!",
                ],
              ],
              lacunas: [
                { n: 1, aceitas: ["shouldn't", "should not"] },
                { n: 2, aceitas: ["should"] },
                { n: 3, aceitas: ["shouldn't", "should not"] },
                { n: 4, aceitas: ["should"] },
                { n: 5, aceitas: ["shouldn't", "should not"] },
                { n: 6, aceitas: ["should"] },
                { n: 7, aceitas: ["shouldn't", "should not"] },
                { n: 8, aceitas: ["shouldn't", "should not"] },
                { n: 9, aceitas: ["should"] },
                { n: 10, aceitas: ["shouldn't", "should not"] },
                { n: 11, aceitas: ["should"] },
                { n: 12, aceitas: ["shouldn't", "should not"] },
              ],
              mensagens: {
                ok: "Outstanding! All {total} blanks are completely correct!",
                parcial: "You got {n} out of {total} blanks right. Check the red gaps and try again!",
              },
            },
          ],
        },
        {
          tipo: "cartao",
          titulo: "3.3.2. True or False?",
          descricao: "Based on the text above, mark whether each statement is True or False.",
          blocos: [
            {
              tipo: "verdadeiro-falso",
              itens: [
                {
                  afirmacao: "According to the article, feeling physical pain is a positive sign that you are working hard enough to be successful.",
                  resposta: false,
                },
                {
                  afirmacao: "Taking a five-minute break every hour helps protect your eyes when you work on a computer for a long time.",
                  resposta: true,
                },
                {
                  afirmacao: "Working on your bed can cause a backache because of poor posture.",
                  resposta: true,
                },
                {
                  afirmacao: "Drinking four cups of coffee instead of eating lunch is a good way to stay energized without any side effects.",
                  resposta: false,
                },
                {
                  afirmacao: "If you have a sore throat and a mild fever, going to the gym will help your body recover faster.",
                  resposta: false,
                },
                {
                  afirmacao: "If a headache or toothache continues for more than three days, you should look for professional medical or dental help instead of just taking painkillers.",
                  resposta: true,
                },
                {
                  afirmacao: "The author believes you should only start healthy habits after you feel your first body ache.",
                  resposta: false,
                },
              ],
              mensagens: {
                ok: "Excellent comprehension! All {total} True/False statements are correct!",
                parcial: "You got {n} out of {total} right. Review the statements highlighted in red and try again!",
              },
            },
          ],
        },
      ],
    },
    {
      id: "practice-4",
      modulo: "3. Grammar",
      rotulo: "3.4 Practice IV",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 3 · Grammar",
          titulo: "3.4. Practice IV",
          texto: "Connect the two sentences into one smooth sentence using the relative pronoun {wh:‘WHICH’}.",
        },
        {
          tipo: "combinar-frases",
          itens: [
            {
              enunciado: "Drink the warm camomile tea. It is on the kitchen cabinet.",
              resposta: "Drink the warm camomile tea which is on the kitchen cabinet.",
            },
            {
              enunciado: "I bought a new chair. It completely cured my backache.",
              resposta: "I bought a new chair which completely cured my backache.",
            },
            {
              enunciado: "Avoid eating greasy foods. They cause a stomachache at night.",
              resposta: "Avoid eating greasy foods which cause a stomachache at night.",
            },
            {
              enunciado: "She put an ice pack on her cheek. It helped reduce her toothache.",
              resposta: "She put an ice pack on her cheek which helped reduce her toothache.",
            },
            {
              enunciado: "Turn down the bright laptop screen. It is giving you a terrible headache.",
              resposta: "Turn down the bright laptop screen which is giving you a terrible headache.",
            },
            {
              enunciado: "Stretching is a simple habit. It prevents muscle pain after work.",
              resposta: "Stretching is a simple habit which prevents muscle pain after work.",
            },
            {
              enunciado: "You shouldn't wear tight shoes. They make your feet hurt all day.",
              resposta: "You shouldn't wear tight shoes which make your feet hurt all day.",
            },
            {
              enunciado: "He took some strong medicine. It made him feel a little dizzy.",
              resposta: "He took some strong medicine which made him feel a little dizzy.",
            },
            {
              enunciado: "We should buy blue-light glasses. They protect our eyes from screens.",
              resposta: "We should buy blue-light glasses which protect our eyes from screens.",
            },
            {
              enunciado: "Don't drink iced water right now. It will make your sore throat worse.",
              resposta: "Don't drink iced water right now which will make your sore throat worse.",
            },
            {
              enunciado: "The pillow is too hard. I bought it yesterday.",
              dica: "Start with: The pillow which...",
              resposta: "The pillow which I bought yesterday is too hard.",
            },
            {
              enunciado: "The loud music gave me a headache. You were playing it earlier.",
              dica: "Start with: The loud music which...",
              resposta: "The loud music which you were playing earlier gave me a headache.",
            },
            {
              enunciado: "The chamomile tea helped my stomach. My mother made it for me.",
              dica: "Start with: The chamomile tea which...",
              resposta: "The chamomile tea which my mother made for me helped my stomach.",
            },
            {
              enunciado: "The painkillers are in my backpack. The doctor prescribed them.",
              dica: "Start with: The painkillers which...",
              resposta: "The painkillers which the doctor prescribed are in my backpack.",
            },
            {
              enunciado: "You shouldn't ignore a fever. It lasts for more than two days.",
              resposta: "You shouldn't ignore a fever which lasts for more than two days.",
            },
            {
              enunciado: "People should choose a mattress. It supports their spine properly.",
              resposta: "People should choose a mattress which supports their spine properly.",
            },
            {
              enunciado: "The heavy grocery bags caused my backache. I carried them up the stairs.",
              dica: "Start with: The heavy grocery bags which...",
              resposta: "The heavy grocery bags which I carried up the stairs caused my backache.",
            },
            {
              enunciado: "You should avoid habits. They ruin your posture during study hours.",
              resposta: "You should avoid habits which ruin your posture during study hours.",
            },
            {
              enunciado: "The cold compress is in the freezer. You need it for your forehead.",
              dica: "Start with: The cold compress which...",
              resposta: "The cold compress which you need for your forehead is in the freezer.",
            },
            {
              enunciado: "Reading in the dark is a bad habit. It causes severe eye strain and headaches.",
              resposta: "Reading in the dark is a bad habit which causes severe eye strain and headaches.",
            },
          ],
          placeholder: "TYPE YOUR ANSWER HERE...",
          mensagens: {
            ok: "Incredible! All {n} out of {total} relative clauses are perfectly connected!",
            parcial: "You got {n} out of {total} right. Check the red cards (watch spelling and word order) and try again!",
          },
        },
      ],
    },
    {
      id: "listening-3-5",
      modulo: "3. Grammar",
      rotulo: "3.5 Listening Practice",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 3 · Grammar",
          titulo: "3.5. Listening Practice",
          texto: "Listen to each sentence individually to practice natural intonation with {b:should}, {b:shouldn't}, and {b:which}.",
        },
        {
          tipo: "lista-ouvir",
          itens: [
            {
              texto: "Drink the warm camomile tea which is on the kitchen cabinet.",
              fala: "Drink the warm camomile tea which is on the kitchen cabinet.",
            },
            {
              texto: "I bought a new chair which completely cured my backache.",
              fala: "I bought a new chair which completely cured my backache.",
            },
            {
              texto: "Avoid eating greasy foods which cause a stomachache at night.",
              fala: "Avoid eating greasy foods which cause a stomachache at night.",
            },
            {
              texto: "If you spend eight hours staring at a computer screen, you should take a five-minute break every hour to rest your eyes.",
              fala: "If you spend eight hours staring at a computer screen, you should take a five-minute break every hour to rest your eyes.",
            },
            {
              texto: "She put an ice pack on her cheek which helped reduce her toothache.",
              fala: "She put an ice pack on her cheek which helped reduce her toothache.",
            },
            {
              texto: "Turn down the bright laptop screen which is giving you a terrible headache.",
              fala: "Turn down the bright laptop screen which is giving you a terrible headache.",
            },
            {
              texto: "Stretching is a simple habit which prevents muscle pain after work.",
              fala: "Stretching is a simple habit which prevents muscle pain after work.",
            },
            {
              texto: "You should drink plenty of water and eat light, healthy snacks.",
              fala: "You should drink plenty of water and eat light, healthy snacks.",
            },
            {
              texto: "You shouldn't wear headphones at maximum volume.",
              fala: "You shouldn't wear headphones at maximum volume.",
            },
            {
              texto: "You shouldn't wear tight shoes which make your feet hurt all day.",
              fala: "You shouldn't wear tight shoes which make your feet hurt all day.",
            },
            {
              texto: "He took some strong medicine which made him feel a little dizzy.",
              fala: "He took some strong medicine which made him feel a little dizzy.",
            },
            {
              texto: "We should buy blue-light glasses which protect our eyes from screens.",
              fala: "We should buy blue-light glasses which protect our eyes from screens.",
            },
            {
              texto: "Don't drink iced water right now which will make your sore throat worse.",
              fala: "Don't drink iced water right now which will make your sore throat worse.",
            },
            {
              texto: "The pillow which I bought yesterday is too hard.",
              fala: "The pillow which I bought yesterday is too hard.",
            },
            {
              texto: "The loud music which you were playing earlier gave me a headache.",
              fala: "The loud music which you were playing earlier gave me a headache.",
            },
            {
              texto: "The chamomile tea which my mother made for me helped my stomach.",
              fala: "The chamomile tea which my mother made for me helped my stomach.",
            },
            { texto: "You should see a doctor.", fala: "You should see a doctor." },
            { texto: "You should see a dentist.", fala: "You should see a dentist." },
            {
              texto: "The painkillers which the doctor prescribed are in my backpack.",
              fala: "The painkillers which the doctor prescribed are in my backpack.",
            },
            { texto: "You should stay home and rest.", fala: "You should stay home and rest." },
            {
              texto: "You shouldn't skip meals or replace lunch with four cups of strong coffee.",
              fala: "You shouldn't skip meals or replace lunch with four cups of strong coffee.",
            },
          ],
          rotuloOuvir: "Listen",
        },
      ],
    },
    {
      id: "writing",
      modulo: "3. Grammar",
      rotulo: "3.6 Writing Practice",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 3 · Grammar",
          titulo: "3.6. Writing Practice",
          texto: "Write the sentences in English according to the instructions. All sentences use {b:SHOULD} or {b:WHICH} (some use both). Submit to compare with suggested answers.",
        },
        {
          tipo: "escrita-guiada",
          itens: [
            { pt: "Diga que ela deveria ir ao dentista.", sugestao: "She should go to the dentist." },
            {
              pt: "Diga que ele deveria tomar o chá que está na mesa.",
              sugestao: "He should drink the tea which is on the table.",
            },
            {
              pt: "Diga que a cama que compramos ontem aliviou as nossas dores nas costas.",
              sugestao: "The bed which we bought yesterday helped soothe our backache.",
            },
            {
              pt: "Diga que elas não deveriam ouvir música tão alto.",
              sugestao: "They shouldn't listen to music so loudly.",
            },
            {
              pt: "Diga que você (you) não deveria comer comidas gordurosas que causam dor de barriga.",
              sugestao: "You shouldn't eat greasy foods which cause stomachache.",
            },
            {
              pt: "Diga que as pessoas não deveriam ignorar a febre que dura mais de 3 dias.",
              sugestao: "People shouldn't ignore a fever which lasts more than 3 days.",
            },
            {
              pt: "Diga que eu (I) tomei um remédio que me deixou tonto.",
              sugestao: "I took a medicine which made me dizzy.",
            },
            {
              pt: "Diga que ela não deveria tomar água gelada que vai piorar a garganta inflamada dela.",
              sugestao: "She shouldn't drink iced water which will make her sore throat worse.",
            },
            {
              pt: "Diga que o Henry deveria beber chá de camomila para ajudá-lo a se sentir melhor.",
              sugestao: "Henry should drink camomile tea to help him feel better.",
            },
            {
              pt: "Diga que o travesseiro que eu (I) comprei ontem é muito duro.",
              sugestao: "The pillow which I bought yesterday is too hard.",
            },
            {
              pt: "Diga que nós deveríamos ficar em casa e descansar.",
              sugestao: "We should stay home and rest.",
            },
          ],
          placeholder: "TYPE YOUR ANSWER HERE...",
          rotuloSugestao: "SUGESTÃO",
          mensagem: "Suggested answers unlocked below! Compare your sentences and listen to the native pronunciation.",
          rotulos: { enviar: "SUBMIT & COMPARE SUGGESTIONS", limpar: "RESET / CLEAR" },
        },
      ],
    },
    {
      id: "practice-5",
      modulo: "4. Listening",
      rotulo: "4.1 Practice V",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 4 · Listening",
          titulo: "4.1. Practice V",
          texto: "Listen to the 5 short conversations as many times as you need and complete the missing words.",
        },
        {
          tipo: "deck-audio",
          rotulo: "Audio Track · 5 Conversations",
          mp3: "https://englishworksheets.net/practice/a/v_td-8-04-1.mp3",
          rotuloTocar: "Play Simulated Dialogue (TTS)",
          rotuloParar: "Stop",
          rotuloInicio: "Playing simulated dialogue...",
          rotuloFalando: "Now speaking:",
          roteiro: [
            {
              falante: "A",
              rotulo: "Dialogue 1 · Speaker A",
              texto: "Hi, Julia. You don't look very well. Are you going to work today?",
            },
            {
              falante: "B",
              rotulo: "Dialogue 1 · Julia",
              texto: "No, I think I'm going to stay home. My tooth really hurts. The pain is just awful.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 2 · Speaker A",
              texto: "Henry, are you okay? You don't look so good.",
            },
            {
              falante: "B",
              rotulo: "Dialogue 2 · Henry",
              texto: "I have a stomachache. I ate too much at Dennis' party last night.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 2 · Speaker A",
              texto: "You should take something for it.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 3 · Speaker A",
              texto: "Hey, Regina. Is your cold any better?",
            },
            {
              falante: "B",
              rotulo: "Dialogue 3 · Regina",
              texto: "No, it's not. I feel terrible. I can't breathe very well. And I keep sneezing.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 3 · Speaker A",
              texto: "That's too bad. You should eat a lot of chicken noodle soup.",
            },
            {
              falante: "B",
              rotulo: "Dialogue 4 · Dale",
              texto: "Ouch! I think I just hurt my back.",
            },
            { falante: "A", rotulo: "Dialogue 4 · Speaker B", texto: "Oh, no! What happened, Dale?" },
            {
              falante: "B",
              rotulo: "Dialogue 4 · Dale",
              texto: "I was trying to lift the TV and... ouch!",
            },
            {
              falante: "A",
              rotulo: "Dialogue 5 · Speaker A",
              texto: "How are you feeling, Victoria?",
            },
            { falante: "B", rotulo: "Dialogue 5 · Victoria", texto: "My throat is really sore." },
            { falante: "A", rotulo: "Dialogue 5 · Speaker A", texto: "Really? What happened?" },
            {
              falante: "B",
              rotulo: "Dialogue 5 · Victoria",
              texto: "I went to a football game last night and yelled too much.",
            },
          ],
        },
        {
          tipo: "dialogos-lacunas",
          dialogos: [
            {
              titulo: "Dialogue 1 · Julia",
              falas: [
                {
                  quem: "A",
                  partes: ["Hi, Julia. You don't look very well. Are you going to ", { lacuna: 1, largura: "p" }, " today?"],
                },
                {
                  quem: "B",
                  partes: [
                    "No, I think I'm going to stay home. My ",
                    { lacuna: 2, largura: "p" },
                    " really hurts. The ",
                    { lacuna: 3, largura: "p" },
                    " is just awful.",
                  ],
                },
              ],
            },
            {
              titulo: "Dialogue 2 · Henry",
              falas: [
                { quem: "A", partes: ["Henry, are you okay? You don't look so good."] },
                {
                  quem: "B",
                  partes: ["I have a ", { lacuna: 4, largura: "g" }, ". I ate too much at Dennis' party last night."],
                },
                { quem: "A", partes: ["You should take something for it."] },
              ],
            },
            {
              titulo: "Dialogue 3 · Regina",
              falas: [
                {
                  quem: "A",
                  partes: ["Hey, Regina. Is your ", { lacuna: 5, largura: "p" }, " any better?"],
                },
                {
                  quem: "B",
                  partes: [
                    "No, it's not. I feel ",
                    { lacuna: 6, largura: "m" },
                    ". I can't breathe very well. And I keep sneezing.",
                  ],
                },
                { quem: "A", partes: ["That's too bad. You should eat a lot of chicken noodle soup."] },
              ],
            },
            {
              titulo: "Dialogue 4 · Dale",
              falas: [
                {
                  quem: "A",
                  partes: ["Ouch! I think I just ", { lacuna: 7, largura: "p" }, " my ", { lacuna: 8, largura: "p" }, "."],
                },
                { quem: "B", partes: ["Oh, no! What happened, Dale?"] },
                { quem: "A", partes: ["I was trying to lift the TV and… ouch!"] },
              ],
            },
            {
              titulo: "Dialogue 5 · Victoria",
              largo: true,
              falas: [
                { quem: "A", partes: ["How are you feeling, Victoria?"] },
                {
                  quem: "B",
                  partes: ["My ", { lacuna: 9, largura: "m" }, " is really ", { lacuna: 10, largura: "m" }, "."],
                },
                { quem: "A", partes: ["Really? What happened?"] },
                { quem: "B", partes: ["I went to a football game last night and yelled too much."] },
              ],
            },
          ],
          respostas: [
            { n: 1, aceita: "work" },
            { n: 2, aceita: "tooth" },
            { n: 3, aceita: "pain" },
            { n: 4, aceita: "stomachache" },
            { n: 5, aceita: "cold" },
            { n: 6, aceita: "terrible" },
            { n: 7, aceita: "hurt" },
            { n: 8, aceita: "back" },
            { n: 9, aceita: "throat" },
            { n: 10, aceita: "sore" },
          ],
          mensagens: {
            ok: "Spot on! You caught every single word across all 5 dialogues!",
            parcial: "You got {n} out of {total} blanks right. Listen again and fix the red inputs!",
          },
        },
      ],
    },
    {
      id: "practice-6",
      modulo: "4. Listening",
      rotulo: "4.2 Practice VI",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 4 · Listening",
          titulo: "4.2. Practice VI",
          texto: "Match each person from the audio to their symptom using the randomized word bank below.",
        },
        {
          tipo: "deck-audio",
          rotulo: "Audio Track · Who Has What?",
          mp3: "https://englishworksheets.net/practice/a/v_td-8-04-1.mp3",
          rotuloTocar: "Play Simulated Dialogue (TTS)",
          rotuloParar: "Stop",
          rotuloInicio: "Playing simulated dialogue...",
          rotuloFalando: "Now speaking:",
          roteiro: [
            {
              falante: "A",
              rotulo: "Dialogue 1 · Speaker A",
              texto: "Hi, Julia. You don't look very well. Are you going to work today?",
            },
            {
              falante: "B",
              rotulo: "Dialogue 1 · Julia",
              texto: "No, I think I'm going to stay home. My tooth really hurts. The pain is just awful.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 2 · Speaker A",
              texto: "Henry, are you okay? You don't look so good.",
            },
            {
              falante: "B",
              rotulo: "Dialogue 2 · Henry",
              texto: "I have a stomachache. I ate too much at Dennis' party last night.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 2 · Speaker A",
              texto: "You should take something for it.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 3 · Speaker A",
              texto: "Hey, Regina. Is your cold any better?",
            },
            {
              falante: "B",
              rotulo: "Dialogue 3 · Regina",
              texto: "No, it's not. I feel terrible. I can't breathe very well. And I keep sneezing.",
            },
            {
              falante: "A",
              rotulo: "Dialogue 3 · Speaker A",
              texto: "That's too bad. You should eat a lot of chicken noodle soup.",
            },
            {
              falante: "B",
              rotulo: "Dialogue 4 · Dale",
              texto: "Ouch! I think I just hurt my back.",
            },
            { falante: "A", rotulo: "Dialogue 4 · Speaker B", texto: "Oh, no! What happened, Dale?" },
            {
              falante: "B",
              rotulo: "Dialogue 4 · Dale",
              texto: "I was trying to lift the TV and... ouch!",
            },
            {
              falante: "A",
              rotulo: "Dialogue 5 · Speaker A",
              texto: "How are you feeling, Victoria?",
            },
            { falante: "B", rotulo: "Dialogue 5 · Victoria", texto: "My throat is really sore." },
            { falante: "A", rotulo: "Dialogue 5 · Speaker A", texto: "Really? What happened?" },
            {
              falante: "B",
              rotulo: "Dialogue 5 · Victoria",
              texto: "I went to a football game last night and yelled too much.",
            },
          ],
        },
        {
          tipo: "nuvem-e-cartas",
          rotuloNuvem: "Symptom Word Cloud (Shuffled)",
          palavras: ["sore throat", "stomachache", "cold", "toothache", "backache"],
          personagens: [
            {
              nome: "JULIA",
              imagem: "https://www.shutterstock.com/image-photo/indian-woman-freelancer-feeling-unwell-260nw-2664303717.jpg",
              resposta: "sore throat",
            },
            {
              nome: "HENRY",
              imagem: "https://www.shutterstock.com/image-photo/sick-young-man-sits-home-260nw-2734792395.jpg",
              resposta: "stomachache",
            },
            {
              nome: "REGINA",
              imagem: "https://www.shutterstock.com/image-photo/woman-cold-sick-person-sitting-260nw-2732301297.jpg",
              resposta: "cold",
            },
            {
              nome: "DALE",
              imagem: "https://www.shutterstock.com/image-photo/man-pressing-his-cheek-experiencing-260nw-2761237281.jpg",
              resposta: "toothache",
            },
            {
              nome: "VICTORIA",
              imagem: "https://www.shutterstock.com/image-photo/beautiful-young-asian-woman-suffering-260nw-2624510663.jpg",
              resposta: "backache",
            },
          ],
          rotuloSelecao: "Select symptom...",
          mensagens: {
            ok: "Perfect match! You correctly identified every person's symptom!",
            parcial: "You matched {n} out of {total} correctly. Listen carefully to the red cards and try again!",
          },
        },
      ],
    },
    {
      id: "flashback",
      modulo: "5. Flashback",
      rotulo: "5.1 Reading & Writing",
      blocos: [
        {
          tipo: "cabecalho",
          etiqueta: "Module 5 · Flashback",
          titulo: "5.1. Reading & Writing (Practice VII)",
          texto: "Read the messages below from people dealing with everyday discomforts. Analyze both cases and write a complete, helpful response answering all four diagnostic questions.",
        },
        {
          tipo: "casos-escrita",
          tituloPerguntas: "Answer all 4 diagnostic questions in your paragraph:",
          rotuloContagem: "{n} / {min} words",
          minimoPalavras: 45,
          termosSintoma: [
            "headache",
            "neck",
            "stomach",
            "stomachache",
            "legs hurt",
            "leg",
            "backache",
            "sore throat",
            "throat",
            "pain",
            "hurts",
            "hurt",
            "dizziness",
            "dizzy",
            "fever",
            "toothache",
            "earache",
            "cold",
            "ache",
            "aches",
          ],
          criterios: {
            comprimento: "1. Length: Min. 45 words",
            vocabulario: "2. Vocabulary: 2+ ache terms",
            modais: "3. Advice: should + shouldn't",
            conector: "4. Connector: uses \"which\"",
          },
          rotuloBotaoModelo: "CHECK & VIEW SAMPLE ANSWER",
          rotulosEstado: { pendente: "Pending", concluido: "Completed" },
          placeholder: "Write a complete, helpful response answering all 4 questions above...",
          casos: [
            {
              id: "sofia",
              rotulo: "Case 1: Sofia",
              etiqueta: "Case 1 · Sofia",
              imagem: "https://www.shutterstock.com/image-photo/tired-young-woman-headphones-working-600w-2644599879.jpg",
              alt: "Sofia studying late",
              rotuloOuvir: "Listen to Sofia",
              falaCaso: "Hey! I have final exams this week, so I've been studying on my laptop until 2 AM every night in a dark room. Now I have a terrible headache behind my eyes, and my neck hurts a lot from looking down at the screen. I've been drinking energy drinks to stay awake, which makes my stomach feel weird. What should I do?",
              citacao: "\"Hey! I have final exams this week, so I’ve been studying on my laptop until 2 AM every night in a dark room. Now I have a terrible headache behind my eyes, and my neck hurts a lot from looking down at the screen. I've been drinking energy drinks to stay awake, which makes my stomach feel weird. What should I do?\"",
              perguntas: [
                "What specific aches or physical discomforts is Sofia experiencing right now?",
                "What is one habit she {b:shouldn't} continue doing, and why?",
                "What are two practical things she {b:should} do today to feel better?",
                "Recommend one specific object, drink, or habit {b:which} can help her study without pain.",
              ],
              rotuloCampo: "Your Advice for Sofia:",
              modelo: {
                rotulo: "Model Response · Sofia",
                texto: "Hi Sofia! Right now, you are dealing with a bad headache behind your eyes, neck pain, and a stomachache. First, you shouldn't study in a dark room or drink energy drinks late at night, because both habits strain your eyes and irritate your stomach. Instead, you should turn on a good lamp and rest your eyes every hour. You should also drink warm chamomile tea, which helps relax your body and calm your stomach, and use a laptop stand which keeps your screen at eye level.",
                rotuloOuvir: "Listen to Model",
              },
            },
            {
              id: "lucas",
              rotulo: "Case 2: Lucas",
              etiqueta: "Case 2 · Lucas",
              imagem: "https://www.shutterstock.com/image-photo/asian-plussize-man-exercises-outdoors-260nw-2721969077.jpg",
              alt: "Lucas exercising",
              rotuloOuvir: "Listen to Lucas",
              falaCaso: "Hi there! I didn't exercise for six months, and yesterday I decided to run 10 kilometers and lift heavy weights. Today my legs hurt so much I can barely walk, and I have a sharp backache. Also, I drank ice-cold water right after running, and now I have a sore throat. I really want to go back to the gym tonight. Any advice?",
              citacao: "\"Hi there! I didn't exercise for six months, and yesterday I decided to run 10 kilometers and lift heavy weights. Today my legs hurt so much I can barely walk, and I have a sharp backache. Also, I drank ice-cold water right after running, and now I have a sore throat. I really want to go back to the gym tonight. Any advice?\"",
              perguntas: [
                "What specific aches or physical discomforts is Lucas experiencing right now?",
                "What is one thing he {b:shouldn't} do tonight?",
                "What are two practical things he {b:should} do to recover faster?",
                "What advice would you give Lucas using {b:which} to recommend a helpful item or habit?",
              ],
              rotuloCampo: "Your Advice for Lucas:",
              modelo: {
                rotulo: "Model Response · Lucas",
                texto: "Hi Lucas! Right now, your legs hurt badly, and you also have a sharp backache and a sore throat. Tonight, you definitely shouldn't go back to the gym or lift heavy weights because your body needs rest. Instead, you should stay home, drink warm tea with honey to soothe your throat, and do light stretching. You should also use a warm heating pad which relieves muscle pain and supports your lower back recovery.",
                rotuloOuvir: "Listen to Model",
              },
            },
          ],
        },
      ],
    },
  ],
  creditos: [
    "{b:© 2026 F1 COMÉRCIO E SERVIÇOS DE INFORMÁTICA LTDA. All rights reserved. · Instructional Design & Digital Content Development: Prof. João Rodrigo Nunes Pereira.}",
    "This interactive learning material is intended solely for educational use by enrolled students. Protected by Brazilian Copyright and Software Protection Laws (Laws 9.610/98 & 9.609/98). Any unauthorized copying, source code modification, reverse engineering, removal of author credits, redistribution, or commercial exploitation is strictly prohibited without prior written consent from the author.",
    "Additional open resource material from English Worksheets ({link:englishworksheets.net|https://englishworksheets.net/practice/a2_l2-health-problems.html}). Visual references sourced from Shutterstock.",
  ],
};

export default aula;
