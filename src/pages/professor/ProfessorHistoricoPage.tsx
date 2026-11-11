import { useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import {
  ESCOLHAS_INICIAIS,
  OPCOES,
  OPCOES_PRIMEIRO_DIA,
  PRIMEIRO_DIA_INICIAL,
  arrumarTexto,
  montarHistorico,
  montarPrimeiroDia,
  trocarGenero,
  type AtividadeDoDia,
  type CausaAtraso,
  type Escolhas,
  type EscolhasPrimeiroDia,
  type Genero,
} from "@/lib/historicoAluno";
import estilos from "./ProfessorHistoricoPage.module.css";

const TITULO = "Acompanhamento Educacional";
type Modo = "acompanhamento" | "primeiro-dia";

function Seletor<T extends string>({ rotulo, valor, opcoes, aoMudar }: { rotulo: string; valor: T; opcoes: readonly { id: string; rotulo: string }[]; aoMudar: (v: T) => void }) {
  return (
    <label className={estilos.campo}>
      <span>{rotulo}</span>
      <select value={valor} onChange={(e) => aoMudar(e.target.value as T)}>
        {opcoes.map((o) => (
          <option key={o.id} value={o.id}>
            {o.rotulo}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProfessorHistoricoPage() {
  const [modo, definirModo] = useState<Modo>("acompanhamento");
  const [c, definirC] = useState<Escolhas>(ESCOLHAS_INICIAIS);
  const [d, definirD] = useState<EscolhasPrimeiroDia>(PRIMEIRO_DIA_INICIAL);
  const [variante, definirVariante] = useState(0);
  /** Texto que a pessoa editou à mão; `null` enquanto vale o que as escolhas montam. */
  const [livre, definirLivre] = useState<string | null>(null);
  const [comTitulo, definirComTitulo] = useState(true);
  const [copiado, definirCopiado] = useState(false);

  const genero = modo === "acompanhamento" ? c.genero : d.genero;
  const gerado = useMemo(() => (modo === "acompanhamento" ? montarHistorico(c, variante) : montarPrimeiroDia(d, variante)), [modo, c, d, variante]);
  const texto = livre ?? gerado;
  const completo = comTitulo ? `${TITULO}\n\n${texto}` : texto;

  const mudarGenero = (g: Genero) => {
    if (g === genero) return;
    if (modo === "acompanhamento") definirC({ ...c, genero: g });
    else definirD({ ...d, genero: g });
    if (livre !== null) definirLivre(trocarGenero(livre, g));
  };
  const alterarC = (parte: Partial<Escolhas>) => {
    definirC({ ...c, ...parte });
    definirCopiado(false);
  };
  const alternarCausa = (id: CausaAtraso) => alterarC({ causas: c.causas.includes(id) ? c.causas.filter((x) => x !== id) : [...c.causas, id] });
  const alternarAtividade = (id: AtividadeDoDia) => definirD({ ...d, atividades: d.atividades.includes(id) ? d.atividades.filter((x) => x !== id) : [...d.atividades, id] });

  return (
    <>
      <CabecalhoPagina
        titulo="Histórico dos alunos"
        texto="Escolha como o aluno está e o portal monta o texto do acompanhamento educacional, no estilo dos históricos da escola. Depois é só ajustar, formatar e copiar para o sistema."
      />

      <div className={estilos.modos} role="radiogroup" aria-label="Tipo de histórico">
        {(
          [
            ["acompanhamento", "Acompanhamento educacional"],
            ["primeiro-dia", "Observação do primeiro dia"],
          ] as const
        ).map(([id, rotulo]) => (
          <label key={id} className={estilos.modo} data-ativo={modo === id}>
            <input type="radio" name="modo-historico" checked={modo === id} onChange={() => { definirModo(id); definirLivre(null); definirVariante(0); }} />
            {rotulo}
          </label>
        ))}
      </div>

      <div className={estilos.colunas}>
        <form className={estilos.painel} onSubmit={(e) => e.preventDefault()}>
          <h2>Como o aluno está</h2>
          <fieldset className={estilos.genero}>
            <legend>Gênero do texto</legend>
            {(
              [
                ["m", "Aluno"],
                ["f", "Aluna"],
              ] as const
            ).map(([id, rotulo]) => (
              <label key={id} className={estilos.opcaoLinha}>
                <input type="radio" name="genero" checked={genero === id} onChange={() => mudarGenero(id)} />
                {rotulo}
              </label>
            ))}
          </fieldset>

          {modo === "acompanhamento" ? (
            <div className={estilos.grade}>
              <Seletor rotulo="Desempenho" valor={c.desempenho} opcoes={OPCOES.desempenho} aoMudar={(v) => alterarC({ desempenho: v })} />
              <Seletor rotulo="Dificuldade no módulo" valor={c.dificuldade} opcoes={OPCOES.dificuldade} aoMudar={(v) => alterarC({ dificuldade: v })} />
              <label className={estilos.campo}>
                <span>Módulo atual (opcional)</span>
                <input value={c.modulo} maxLength={40} placeholder="Ex.: Excel" onChange={(e) => alterarC({ modulo: e.target.value })} />
              </label>
              <Seletor rotulo="Pedir ajuda" valor={c.ajuda} opcoes={OPCOES.ajuda} aoMudar={(v) => alterarC({ ajuda: v })} />
              <Seletor rotulo="Personalidade" valor={c.personalidade} opcoes={OPCOES.personalidade} aoMudar={(v) => alterarC({ personalidade: v })} />
              <Seletor rotulo="Frequência" valor={c.frequencia} opcoes={OPCOES.frequencia} aoMudar={(v) => alterarC({ frequencia: v })} />
              <Seletor rotulo="Comportamento" valor={c.comportamento} opcoes={OPCOES.comportamento} aoMudar={(v) => alterarC({ comportamento: v })} />
              <Seletor rotulo="Situação no contrato" valor={c.contrato} opcoes={OPCOES.contrato} aoMudar={(v) => alterarC({ contrato: v })} />
              {(c.contrato === "atraso" || c.contrato === "quitado") && (
                <>
                  <label className={estilos.campo}>
                    <span>Aulas em atraso (opcional)</span>
                    <input value={c.aulasEmAtraso} inputMode="numeric" maxLength={4} placeholder="Ex.: 8" onChange={(e) => alterarC({ aulasEmAtraso: e.target.value.replace(/\D/g, "") })} />
                  </label>
                  <fieldset className={estilos.causas}>
                    <legend>Causas</legend>
                    {OPCOES.causas.map((o) => (
                      <label key={o.id} className={estilos.opcaoLinha}>
                        <input type="checkbox" checked={c.causas.includes(o.id)} onChange={() => alternarCausa(o.id)} />
                        {o.rotulo}
                      </label>
                    ))}
                  </fieldset>
                </>
              )}
              <label className={`${estilos.campo} ${estilos.largo}`}>
                <span>Acrescentar uma observação (opcional)</span>
                <textarea rows={2} maxLength={500} value={c.extra} onChange={(e) => alterarC({ extra: e.target.value })} />
              </label>
            </div>
          ) : (
            <div className={estilos.grade}>
              <Seletor rotulo="Experiência com informática" valor={d.experiencia} opcoes={OPCOES_PRIMEIRO_DIA.experiencia} aoMudar={(v) => definirD({ ...d, experiencia: v })} />
              <Seletor rotulo="Personalidade" valor={d.personalidade} opcoes={OPCOES.personalidade} aoMudar={(v) => definirD({ ...d, personalidade: v })} />
              <label className={`${estilos.opcaoLinha} ${estilos.largo}`}>
                <input type="checkbox" checked={d.poucoControleDoMouse} onChange={(e) => definirD({ ...d, poucoControleDoMouse: e.target.checked })} />
                Pouco controle do mouse
              </label>
              <fieldset className={`${estilos.causas} ${estilos.largo}`}>
                <legend>O que executou</legend>
                {OPCOES_PRIMEIRO_DIA.atividades.map((a) => (
                  <label key={a} className={estilos.opcaoLinha}>
                    <input type="checkbox" checked={d.atividades.includes(a)} onChange={() => alternarAtividade(a)} />
                    {a}
                  </label>
                ))}
              </fieldset>
              <label className={`${estilos.campo} ${estilos.largo}`}>
                <span>Acrescentar uma observação (opcional)</span>
                <textarea rows={2} maxLength={500} value={d.extra} onChange={(e) => definirD({ ...d, extra: e.target.value })} />
              </label>
            </div>
          )}
        </form>

        <section className={estilos.painel} aria-labelledby="titulo-texto">
          <h2 id="titulo-texto">Texto do histórico</h2>
          {livre !== null && (
            <p className={estilos.editado}>
              Você editou o texto. Mudar as escolhas ao lado não o substitui.{" "}
              <button type="button" className={estilos.ligacao} onClick={() => definirLivre(null)}>
                Refazer a partir das escolhas
              </button>
            </p>
          )}
          <textarea
            className={estilos.texto}
            rows={14}
            value={texto}
            aria-labelledby="titulo-texto"
            onChange={(e) => {
              definirLivre(e.target.value);
              definirCopiado(false);
            }}
          />
          <p className={estilos.suave}>
            {texto.length} caracteres. Também dá para colar aqui um histórico que você já tem e usar os botões de formatar.
          </p>

          <div className={estilos.acoes}>
            <button type="button" className={estilos.principal} onClick={() => void navigator.clipboard.writeText(completo).then(() => definirCopiado(true), () => definirCopiado(false))}>
              <Icone nome="copiar" tamanho={16} />
              {copiado ? "Copiado" : "Copiar"}
            </button>
            <button type="button" className={estilos.acao} onClick={() => { definirLivre(null); definirVariante((v) => v + 1); definirCopiado(false); }}>
              <Icone nome="recomecar" tamanho={16} />
              Sugerir outra redação
            </button>
          </div>

          <fieldset className={estilos.formatar}>
            <legend>Formatar</legend>
            <label className={estilos.opcaoLinha}>
              <input type="checkbox" checked={comTitulo} onChange={(e) => definirComTitulo(e.target.checked)} />
              Incluir o título «{TITULO}» ao copiar
            </label>
            <div className={estilos.acoes}>
              <button type="button" className={estilos.acao} onClick={() => definirLivre(arrumarTexto(texto))}>
                Arrumar espaços e pontuação
              </button>
              <button type="button" className={estilos.acao} onClick={() => mudarGenero(genero === "m" ? "f" : "m")}>
                Trocar para {genero === "m" ? "aluna" : "aluno"}
              </button>
            </div>
            <p className={estilos.suave}>Trocar o gênero cobre as palavras mais comuns dos históricos (aluno, esforçado, o mesmo...). Releia o texto depois.</p>
          </fieldset>
        </section>
      </div>
    </>
  );
}
