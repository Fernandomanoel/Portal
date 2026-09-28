import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import { ehPratica, totalDeQuestoes, type ProvaParaAluno } from "@/types/quiz";
import estilos from "./ProvaAplicada.module.css";

interface Props {
  prova: ProvaParaAluno;
  travada: boolean;
  aoComecar: (nome: string) => void;
  aoVoltar: () => void;
}

/** Antes da prova: o aluno se identifica e lê as regras. Só depois ela começa (e trava). */
export function ProvaIdentificacao({ prova, travada, aoComecar, aoVoltar }: Props) {
  const [nome, definirNome] = useState("");
  const [tocado, definirTocado] = useState(false);
  const limpo = nome.replace(/\s+/g, " ").trim();
  const valido = limpo.length >= 3 && limpo.length <= 80;
  const questoes = totalDeQuestoes(prova);

  function comecar(evento: FormEvent) {
    evento.preventDefault();
    definirTocado(true);
    if (valido) aoComecar(limpo);
  }

  return (
    <form className={estilos.identificacao} onSubmit={comecar} noValidate>
      <div className={estilos.identificacaoTopo}>
        <h1 className={estilos.identificacaoTitulo}>{prova.titulo}</h1>
        <ul className={estilos.regras}>
          <li>
            <Icone nome="prova" tamanho={18} />
            {ehPratica(prova) ? "Prova prática: siga as instruções e envie o arquivo" : `${questoes} ${questoes === 1 ? "questão" : "questões"}`}
          </li>
          {prova.envioArquivo && (
            <li>
              <Icone nome="doc" tamanho={18} />
              {prova.envioArquivo.obrigatorio ? "Envio de arquivo obrigatório" : "Envio de arquivo opcional"} (
              {prova.envioArquivo.extensoes.join(", ")})
            </li>
          )}
          <li>
            <Icone nome={travada ? "cadeado" : "link"} tamanho={18} />
            {travada
              ? "A prova abre em tela cheia. Se você sair dela, trocar de aba ou de janela, ela trava até o professor liberar."
              : "Nesta prova você pode usar outras abas e programas."}
          </li>
          <li>
            <Icone nome="check" tamanho={18} />
            O envio é único: depois de enviar não dá para refazer.
          </li>
        </ul>
      </div>

      <div className={estilos.campo}>
        <label htmlFor="nome-aluno">Seu nome completo</label>
        <input
          id="nome-aluno"
          value={nome}
          onChange={(evento) => definirNome(evento.target.value)}
          onBlur={() => definirTocado(true)}
          autoComplete="name"
          autoFocus
          maxLength={80}
          aria-invalid={tocado && !valido}
          aria-describedby="nome-ajuda"
        />
        <p id="nome-ajuda" className={tocado && !valido ? estilos.campoErro : estilos.campoAjuda}>
          {tocado && !valido ? "Escreva seu nome completo para o professor saber de quem é a prova." : "É assim que o professor vai encontrar a sua prova."}
        </p>
      </div>

      <div className={estilos.botoes}>
        <button type="submit" className={estilos.principal}>
          Começar a prova
          <Icone nome="seta-direita" tamanho={18} />
        </button>
        <button type="button" className={estilos.secundario} onClick={aoVoltar}>
          Voltar para as provas
        </button>
      </div>
    </form>
  );
}
