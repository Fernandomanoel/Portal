import { GabineteAbertoDesenho, type PecaGabinete } from "./GabineteAbertoDesenho";
import { JogoDescobrir, type InfoParte } from "./JogoDescobrir";

const PECAS: Record<PecaGabinete, InfoParte> = {
  cpu: {
    nome: "CPU",
    comArtigo: "a CPU",
    funcao: "A CPU faz as contas e dá as ordens para o computador funcionar. Ela é uma peça pequena dentro do gabinete.",
  },
  hd: {
    nome: "HD",
    comArtigo: "o HD",
    funcao: "O HD guarda as suas fotos, os seus textos e os seus jogos. Quando você desliga o computador, tudo continua guardado nele.",
  },
};

export function CpuEHdJogo() {
  return (
    <JogoDescobrir
      titulo="CPU e HD"
      acento="#7c4dd6"
      abertura="Este é o gabinete aberto. Dentro dele ficam duas peças importantes: a CPU e o HD. O gabinete inteiro não se chama CPU: a CPU é só uma peça lá dentro."
      partes={PECAS}
      palavra={{ singular: "peça", plural: "peças" }}
      perguntas={[
        { pergunta: "Clique na peça que guarda as suas fotos e jogos.", resposta: "hd" },
        { pergunta: "Clique na peça que faz as contas.", resposta: "cpu" },
        { pergunta: "Você desligou o computador. Clique na peça onde o seu texto continua guardado.", resposta: "hd" },
      ]}
      fim="Muito bem! Você sabe a diferença entre CPU e HD."
      desenho={(estado) => <GabineteAbertoDesenho {...estado} />}
    />
  );
}
