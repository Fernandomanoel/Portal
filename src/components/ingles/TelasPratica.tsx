import { Link } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import estilos from "./TelasPratica.module.css";

interface AberturaProps {
  titulo: string;
  texto: string;
  resumo: string[];
  aoComecar: () => void;
}

/** Primeira fala da Gabi: o que vai acontecer, e o botão para começar. */
export function TelaAbertura({ titulo, texto, resumo, aoComecar }: AberturaProps) {
  return (
    <div className={estilos.tela}>
      <h1 className={estilos.titulo}>{titulo}</h1>
      <p className={estilos.texto}>{texto}</p>
      <ul className={estilos.resumo}>
        {resumo.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button type="button" className={estilos.principal} onClick={aoComecar} autoFocus>
        Começar
        <Icone nome="seta-direita" tamanho={20} />
      </button>
    </div>
  );
}

interface ResultadoProps {
  titulo: string;
  acertos: number;
  total: number;
  pontos: number;
  aoRecomecar: () => void;
}

export function TelaResultado({ titulo, acertos, total, pontos, aoRecomecar }: ResultadoProps) {
  const precisao = Math.round((acertos / total) * 100);

  return (
    <div className={estilos.tela}>
      <h1 className={estilos.titulo}>{titulo}</h1>
      <dl className={estilos.placar}>
        <div>
          <dt>Acertos</dt>
          <dd>
            {acertos}/{total}
          </dd>
        </div>
        <div>
          <dt>Precisão</dt>
          <dd>{precisao}%</dd>
        </div>
        <div>
          <dt>Pontos</dt>
          <dd>{pontos}</dd>
        </div>
      </dl>
      <div className={estilos.acoes}>
        <button type="button" className={estilos.principal} onClick={aoRecomecar}>
          <Icone nome="recomecar" tamanho={20} />
          Fazer de novo
        </button>
        <Link to={rotas.inglesAtividades()} className={estilos.secundario}>
          Outras atividades
        </Link>
      </div>
    </div>
  );
}
