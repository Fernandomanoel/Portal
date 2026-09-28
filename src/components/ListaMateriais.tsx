import { EstadoVazio } from "./EstadoVazio";
import { Icone, type NomeIcone } from "./Icone";
import type { Material, TipoMaterial } from "@/types/curso";
import estilos from "./ListaMateriais.module.css";

const ICONE: Record<TipoMaterial, NomeIcone> = {
  pdf: "pdf",
  doc: "doc",
  planilha: "planilha",
  slides: "slides",
  video: "video",
  imagem: "imagem",
  link: "link",
};

const ROTULO: Record<TipoMaterial, string> = {
  pdf: "PDF",
  doc: "Documento",
  planilha: "Planilha",
  slides: "Slides",
  video: "Vídeo",
  imagem: "Imagem",
  link: "Link",
};

/** Nome do arquivo para a caixa de download, tirado do fim do caminho. */
function nomeDoArquivo(caminho: string) {
  return caminho.split("/").pop() || caminho;
}

export function ListaMateriais({ materiais }: { materiais: Material[] }) {
  if (materiais.length === 0) {
    return (
      <EstadoVazio
        icone="pdf"
        titulo="Nenhum material neste curso ainda"
        texto="Os arquivos e exercícios aparecem aqui assim que forem adicionados ao catálogo."
        origem="src/data/atividades.ts"
      />
    );
  }

  return (
    <ul className={estilos.lista}>
      {materiais.map((material) => {
        // "link" é externo ou uma página HTML autocontida — abre em nova aba.
        // Todo o resto é arquivo do próprio portal: baixa na hora, sem sair
        // da tela da atividade.
        const ehLink = material.tipo === "link";
        const destino = ehLink ? material.url : material.arquivo;

        return (
          <li key={`${material.titulo}-${destino}`} className={estilos.item}>
            <span className={estilos.selo}>
              <Icone nome={ICONE[material.tipo]} />
            </span>

            <div className={estilos.texto}>
              <h3 className={estilos.titulo}>
                <a
                  href={destino}
                  target={ehLink ? "_blank" : undefined}
                  rel={ehLink ? "noreferrer" : undefined}
                  download={ehLink || !destino ? undefined : nomeDoArquivo(destino)}
                >
                  {material.titulo}
                </a>
              </h3>
              {material.descricao && (
                <p className={estilos.descricao}>{material.descricao}</p>
              )}
            </div>

            <span className={estilos.tipo}>
              {!ehLink && <Icone nome="baixar" tamanho={14} />}
              {ROTULO[material.tipo]}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
