/** Transforma o texto de um SVG em PNG (com fundo e em escala 2×, para ficar nítido em slides e documentos). */
export async function svgParaPng(svg: string, largura = 640, altura = 360, escala = 2): Promise<Blob> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const imagem = new Image();
    imagem.width = largura;
    imagem.height = altura;
    await new Promise<void>((ok, falhou) => {
      imagem.onload = () => ok();
      imagem.onerror = () => falhou(new Error("Não foi possível desenhar o gráfico."));
      imagem.src = url;
    });
    const tela = document.createElement("canvas");
    tela.width = largura * escala;
    tela.height = altura * escala;
    const contexto = tela.getContext("2d");
    if (!contexto) throw new Error("O navegador não permitiu gerar a imagem.");
    contexto.scale(escala, escala);
    contexto.drawImage(imagem, 0, 0, largura, altura);
    return await new Promise<Blob>((ok, falhou) => tela.toBlob((b) => (b ? ok(b) : falhou(new Error("Falha ao gerar o PNG."))), "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function baixarArquivo(blob: Blob, nome: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
