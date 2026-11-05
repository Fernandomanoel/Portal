import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso prepara o assistente que apoia a criação e a divulgação de campanhas: entender o briefing, pensar em ideias e peças, escolher onde veicular e medir o resultado.",
  topicos: [
    {
      titulo: "Publicidade e propaganda: o que é e como funciona uma agência",
      texto: [
        "Publicidade é a comunicação paga que busca divulgar produtos, serviços e marcas. Numa agência, o atendimento fala com o cliente, o planejamento define a estratégia, a criação (redator e diretor de arte) cria as peças, a mídia escolhe onde veicular e a produção executa.",
        "Tudo começa no briefing: o resumo do que o cliente precisa (produto, público, objetivo, prazo, verba). Sem briefing claro, a criação trabalha no escuro.",
      ],
      pontos: ["Descrever os setores de uma agência.", "Listar o que um briefing precisa conter."],
    },
    {
      titulo: "Conceito criativo, headline e peças",
      texto: [
        "O conceito criativo é a ideia central que atravessa todas as peças da campanha. A headline é o título que chama a atenção; o texto desenvolve; a chamada para ação diz o que fazer. As peças variam: post, anúncio, cartaz, folder, spot de rádio, vídeo.",
        "Uma boa peça tem uma única mensagem principal, hierarquia visual (o olho sabe por onde começar) e identidade da marca (cores, fonte, logo) reconhecível.",
      ],
      pontos: ["Distinguir conceito, headline e slogan.", "Aplicar hierarquia visual em um layout simples."],
      erros: ["Colocar muitas mensagens numa mesma peça.", "Texto pequeno e sem contraste."],
    },
    {
      titulo: "Mídia: onde e quando anunciar",
      texto: [
        "Mídia é a escolha dos veículos e do momento: TV, rádio, jornal, revista, outdoor (mídia offline) e redes sociais, buscadores e e-mail (mídia online). A escolha depende do público, da verba e do objetivo. Mídia offline alcança muita gente de uma vez; a online permite segmentar e medir.",
        "Alcance é quantas pessoas diferentes veem; frequência, quantas vezes cada uma vê. Para fixar uma mensagem é preciso frequência; para apresentar a marca, alcance.",
      ],
      pontos: ["Explicar alcance e frequência.", "Escolher mídia pelo público e pela verba."],
    },
    {
      titulo: "Ética e regras da publicidade",
      texto: [
        "A publicidade no Brasil deve ser identificada como tal, não pode enganar nem se aproveitar de crianças, e deve respeitar as regras do Código de Defesa do Consumidor e as normas do Conar (órgão de autorregulamentação). Influenciadores devem indicar claramente quando o conteúdo é publicidade.",
      ],
      pontos: ["Explicar o que é propaganda enganosa.", "Dizer por que o conteúdo patrocinado deve ser identificado."],
    },
  ],
  glossario: [
    { termo: "Briefing", definicao: "Resumo de informações que orienta o trabalho de criação." },
    { termo: "Headline", definicao: "Título principal de um anúncio." },
    { termo: "Slogan", definicao: "Frase curta e memorável associada à marca." },
    { termo: "Mídia", definicao: "Veículos e canais onde a mensagem é divulgada." },
    { termo: "Conar", definicao: "Conselho de Autorregulamentação Publicitária." },
  ],
  dicas: [
    "Peça que os alunos «desmontem» um anúncio real: qual a headline, o público, a mídia e o objetivo?",
    "Trabalhe com um briefing curto de um comércio da região e deixe cada dupla criar uma peça.",
    "Valorize a ideia simples: se não dá para explicar a campanha em uma frase, ela está confusa.",
  ],
};

export default conteudo;
