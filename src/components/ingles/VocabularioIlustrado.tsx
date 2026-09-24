import { Icone } from "@/components/Icone";
import { useNarracao } from "@/hooks/useNarracao";
import type { ItemVocabulario } from "@/types/ingles";
import { FiguraIngles } from "./FiguraIngles";
import estilos from "./VocabularioIlustrado.module.css";

interface Props {
  itens: ItemVocabulario[];
  aoComecar: () => void;
}

/** Antes dos exercícios: cada desenho com a palavra e a tradução; tocar no cartão fala a palavra. */
export function VocabularioIlustrado({ itens, aoComecar }: Props) {
  const { suportado, falar } = useNarracao({ idioma: "en-US", velocidade: 0.85 });

  return (
    <div className={estilos.tela}>
      <div className={estilos.topo}>
        <h1 className={estilos.titulo}>Conheça as palavras</h1>
        <p className={estilos.texto}>
          {suportado ? "Toque em cada desenho para ouvir como se fala. " : ""}Depois, eu pergunto para ver se você lembra.
        </p>
      </div>

      <ul className={estilos.grade}>
        {itens.map((item) => (
          <li key={item.palavra}>
            <button type="button" className={estilos.cartao} onClick={() => falar(item.palavra)} disabled={!suportado}>
              <FiguraIngles nome={item.figura} descricao={item.traducao} className={estilos.figura} />
              <span className={estilos.palavra} lang="en">
                {item.palavra}
              </span>
              <span className={estilos.traducao}>{item.traducao}</span>
              {suportado && <Icone nome="som" tamanho={16} className={estilos.som} />}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className={estilos.comecar} onClick={aoComecar}>
        Começar os exercícios
        <Icone nome="seta-direita" tamanho={20} />
      </button>
    </div>
  );
}
