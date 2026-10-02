import { Icone } from "@/components/Icone";
import type { CampoProvaAluno, ProvaAutocorrigidaAluno, ResultadoItem } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaAutocorrigidaAluno;
  valores: Record<string, string>[];
  resultados: (ResultadoItem | undefined)[];
  testando: number | null;
  aoMudar: (item: number, campo: string, valor: string) => void;
  aoTestar: (item: number) => void;
}

type ResultadoCampo = ResultadoItem["campos"][string];

function Entrada({ campo, valor, id, aoMudar }: { campo: CampoProvaAluno; valor: string; id: string; aoMudar: (valor: string) => void }) {
  const { entrada } = campo;

  if (entrada.tipo === "selecao") {
    return (
      <select id={id} className={estilos.selecao} value={valor} onChange={(e) => aoMudar(e.target.value)}>
        <option value="">Selecione…</option>
        {entrada.opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </select>
    );
  }

  if (entrada.tipo === "multipla_escolha") {
    return (
      <div className={estilos.opcoes} role="radiogroup" aria-labelledby={`${id}-rotulo`}>
        {entrada.opcoes.map((opcao, indice) => {
          const marcada = valor === String(indice);
          return (
            <label key={indice} className={marcada ? `${estilos.opcao} ${estilos.opcaoMarcada}` : estilos.opcao}>
              <input type="radio" name={id} checked={marcada} onChange={() => aoMudar(String(indice))} />
              <span>{opcao}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (entrada.tipo === "marcar") {
    const marcadas = valor.split(",").filter(Boolean);
    return (
      <div className={estilos.opcoes}>
        {entrada.opcoes.map((opcao, indice) => {
          const chave = String(indice);
          const marcada = marcadas.includes(chave);
          return (
            <label key={indice} className={marcada ? `${estilos.opcao} ${estilos.opcaoMarcada}` : estilos.opcao}>
              <input
                type="checkbox"
                checked={marcada}
                onChange={() => aoMudar((marcada ? marcadas.filter((m) => m !== chave) : [...marcadas, chave]).sort().join(","))}
              />
              <span>{opcao}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (entrada.tipo === "numero") {
    return (
      <input
        id={id}
        className={estilos.campoCurto}
        inputMode="decimal"
        autoComplete="off"
        placeholder={campo.placeholder}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
      />
    );
  }

  const codigo = entrada.tipo === "codigo";
  return (
    <textarea
      id={id}
      className={codigo ? `${estilos.resposta} ${estilos.respostaCodigo}` : estilos.resposta}
      spellCheck={codigo ? false : undefined}
      placeholder={campo.placeholder ?? (codigo ? "Escreva o seu código aqui" : undefined)}
      value={valor}
      onChange={(e) => aoMudar(e.target.value)}
    />
  );
}

function Retorno({ resultado }: { resultado: ResultadoCampo | undefined }) {
  if (!resultado) return null;
  return (
    <div className={resultado.certo ? estilos.retornoCerto : estilos.retornoErrado} role="status">
      {resultado.detalhes ? (
        <ul className={estilos.testes}>
          {resultado.detalhes.map((detalhe) => (
            <li key={detalhe.descricao} className={detalhe.ok ? estilos.testeOk : estilos.testeFalha}>
              <Icone nome={detalhe.ok ? "check" : "x"} tamanho={16} />
              <span>{detalhe.ok ? detalhe.descricao : `Faltou: ${detalhe.descricao}`}</span>
            </li>
          ))}
        </ul>
      ) : (
        resultado.mensagem && (
          <p className={estilos.retornoTexto}>
            <Icone nome={resultado.certo ? "check" : "x"} tamanho={16} />
            {resultado.mensagem}
          </p>
        )
      )}
    </div>
  );
}

export function QuizAutocorrigida({ prova, valores, resultados, testando, aoMudar, aoTestar }: Props) {
  return (
    <>
      {prova.introducao && <p className={estilos.introducao}>{prova.introducao}</p>}
      {prova.itens.map((item, indice) => {
        const resultado = resultados[indice];
        const classe = !resultado ? estilos.pergunta : resultado.certo ? `${estilos.pergunta} ${estilos.itemCerto}` : `${estilos.pergunta} ${estilos.itemErrado}`;
        return (
          <section key={indice} className={classe} aria-labelledby={`item-${indice}`}>
            <h2 id={`item-${indice}`} className={estilos.enunciado}>
              <span className={estilos.numero}>{indice + 1}.</span>
              <span>{item.titulo}</span>
            </h2>
            {item.enunciado && <p className={estilos.textoItem}>{item.enunciado}</p>}
            {item.referencia && <p className={estilos.referencia}>{item.referencia}</p>}
            {item.exemplo && (
              <div className={estilos.exemploCodigo}>
                <p className={estilos.exemploRotulo}>{item.exemplo.rotulo}</p>
                <pre>{item.exemplo.conteudo}</pre>
              </div>
            )}

            <div className={estilos.camposItem}>
              {item.campos.map((campo) => {
                const id = `campo-${indice}-${campo.id}`;
                const lista = campo.entrada.tipo === "multipla_escolha" || campo.entrada.tipo === "marcar";
                return (
                  <div key={campo.id} className={estilos.campoItem}>
                    {campo.rotulo && (
                      <label id={`${id}-rotulo`} htmlFor={lista ? undefined : id} className={estilos.rotuloCampo}>
                        {campo.rotulo}
                      </label>
                    )}
                    <Entrada campo={campo} id={id} valor={valores[indice]?.[campo.id] ?? ""} aoMudar={(valor) => aoMudar(indice, campo.id, valor)} />
                    <Retorno resultado={resultado?.campos[campo.id]} />
                  </div>
                );
              })}
            </div>

            <div className={estilos.testar}>
              <button type="button" className={estilos.botaoTestar} disabled={testando === indice} onClick={() => aoTestar(indice)}>
                {testando === indice ? "Testando…" : resultado ? "Testar de novo" : "Testar resposta"}
              </button>
              {resultado && (
                <p className={resultado.certo ? estilos.veredictoCerto : estilos.veredictoErrado} role="status">
                  <Icone nome={resultado.certo ? "check" : "x"} tamanho={16} />
                  {resultado.mensagem ?? (resultado.certo ? "Correto!" : "Ainda não está certo. Ajuste e teste de novo.")}
                </p>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
